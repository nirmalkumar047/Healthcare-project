import React, { useRef, useState } from "react";
import Tesseract from "tesseract.js";

export default function PrescriptionUploader() {
  const [file, setFile] = useState(null);
  const [ocrText, setOcrText] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [targetLang, setTargetLang] = useState("en");
  const canvasRef = useRef();

  // Basic image preprocessing using canvas (grayscale + contrast)
  const preprocessImage = (img) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // fit image into canvas
    const maxW = 1000;
    const scale = Math.min(1, maxW / img.width);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0, w, h);

    // get pixels
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    // grayscale + simple contrast boost
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i+1], b = data[i+2];
      // luminosity
      let v = 0.21*r + 0.72*g + 0.07*b;
      // increase contrast: simple linear transform
      v = (v - 128) * 1.2 + 128; // contrast factor 1.2
      data[i] = data[i+1] = data[i+2] = v;
    }
    ctx.putImageData(imgData, 0, 0);
    // optionally apply threshold for sharper text
    // (commented out; Tesseract often works well without)
    // const imgData2 = ctx.getImageData(0, 0, w, h);
    // ... apply threshold ...
    return canvas.toDataURL("image/png");
  };

  const handleFile = (e) => {
    setAnalysis(null);
    setOcrText("");
    setMedicines([]);
    const f = e.target.files[0];
    if (f) setFile(URL.createObjectURL(f));
  };

  const runOcr = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const img = new Image();
      img.src = file;
      await new Promise((res) => img.onload = res);
      const processed = preprocessImage(img);

      // Run Tesseract on processed image
      const { data } = await Tesseract.recognize(processed, "eng", {
        logger: m => {
          // console.log(m);
        }
      });

      const text = data.text;
      setOcrText(text);

      // basic medicine line extractor (look for mg, tablet, syrup, inhaler, drops, ml)
      const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      const medLines = [];
      const medRegex = /\b(\d+(\.\d+)?\s*(mg|g|mcg|µg|ml|units|IU)|tablet|tab|cap|syrup|drops|inhaler|cream|ointment)\b/i;

      for (let line of lines) {
        if (medRegex.test(line) || /(^[A-Z][a-z]{1,}\s?[A-Za-z]*)/.test(line)) {
          // Heuristic: if contains common dose words OR looks like "MedName ..."
          medLines.push(line);
        }
      }

      // Reduce duplicates and keep probable medicine lines
      const unique = [...new Set(medLines)].slice(0, 30);
      setMedicines(unique);

    } catch (err) {
      console.error(err);
      alert("OCR failed. Try a clearer photo (good lighting, flat, not blurry).");
    } finally {
      setLoading(false);
    }
  };

  const analyzePrescription = async () => {
    if (!ocrText) {
      alert("Run OCR first.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/prescription/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText: ocrText,
          medicines: medicines,
          patientInfo: {}, // optional: pass age/gender if you have it
          targetLang: targetLang
        })
      });
      const json = await res.json();
      setAnalysis(json);
    } catch (err) {
      console.error(err);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-3">Prescription Scanner & Analyzer</h2>

      <input type="file" accept="image/*" onChange={handleFile} />
      <div className="mt-3 flex gap-2">
        <button disabled={!file || loading} onClick={runOcr} className="px-3 py-1 bg-blue-600 text-white rounded">Enhance & OCR</button>
        <select value={targetLang} onChange={(e)=>setTargetLang(e.target.value)} className="border p-1 rounded">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ta">Tamil</option>
          <option value="te">Telugu</option>
          <option value="mr">Marathi</option>
          <option value="bn">Bengali</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
        <button disabled={!ocrText || loading} onClick={analyzePrescription} className="px-3 py-1 bg-green-600 text-white rounded">Analyze & Translate</button>
      </div>

      <div className="mt-4">
        <canvas ref={canvasRef} style={{width: "100%", border: "1px solid #eee"}} />
      </div>

      {loading && <p className="mt-2">Processing…</p>}

      {ocrText && (
        <div className="mt-4">
          <h3 className="font-semibold">OCR Text</h3>
          <pre className="whitespace-pre-wrap bg-gray-50 p-2 rounded">{ocrText}</pre>

          <h4 className="mt-2 font-semibold">Parsed medicine lines</h4>
          <ul className="list-disc ml-5">
            {medicines.map((m,i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
      )}

      {analysis && (
        <div className="mt-4 p-3 border rounded bg-white">
          <h3 className="font-semibold">AI Analysis (translated to {targetLang})</h3>
          <div>
            {analysis.items?.map((it, idx) => (
              <div key={idx} className="mb-3">
                <strong>{it.name}</strong>
                <p className="text-sm">{it.explanation}</p>
                <p className="text-xs text-gray-500">Why used: {it.reason}</p>
                <p className="text-xs text-gray-600">Cautions: {it.cautions}</p>
              </div>
            ))}
          </div>
          <div className="mt-2">
            <strong>Full AI notes:</strong>
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-2 rounded">{analysis.fullText}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
