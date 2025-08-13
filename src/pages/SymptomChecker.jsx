import React, { useState } from 'react';

const SymptomChecker = () => {
  const [step, setStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
  });
  const [symptoms, setSymptoms] = useState('');
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = import.meta.env.VITE_DIAGNOSIS_API_KEY; // store in .env

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const fetchConditions = async () => {
    setLoading(true);

    const url = 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose?noqueue=1';

    const body = {
      symptoms: symptoms.split(',').map(s => s.trim()),
      patientInfo: {
        age: Number(patientInfo.age),
        gender: patientInfo.gender,
        height: Number(patientInfo.height),
        weight: Number(patientInfo.weight),
        medicalHistory: [],
        currentMedications: [],
        allergies: [],
        lifestyle: {
          smoking: false,
          alcohol: 'none',
          exercise: 'moderate',
          diet: 'balanced'
        }
      },
      lang: 'en'
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();
      setConditions(data.result?.analysis?.possibleConditions || []);
      setStep(3);
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Symptom Checker</h1>

      {/* Step 1: Patient Info */}
      {step === 1 && (
        <div>
          <input
            type="number"
            placeholder="Age"
            value={patientInfo.age}
            onChange={(e) => setPatientInfo({ ...patientInfo, age: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <select
            value={patientInfo.gender}
            onChange={(e) => setPatientInfo({ ...patientInfo, gender: e.target.value })}
            className="border p-2 w-full mb-2"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="number"
            placeholder="Height (cm)"
            value={patientInfo.height}
            onChange={(e) => setPatientInfo({ ...patientInfo, height: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={patientInfo.weight}
            onChange={(e) => setPatientInfo({ ...patientInfo, weight: e.target.value })}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleNextStep}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Symptoms */}
      {step === 2 && (
        <div>
          <textarea
            placeholder="Enter symptoms separated by commas..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            className="border p-2 w-full mb-4"
            rows="4"
          />
          <div className="flex justify-between">
            <button
              onClick={handlePrevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={fetchConditions}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? 'Checking...' : 'Check Conditions'}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Show Conditions */}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Possible Conditions</h2>
          {conditions.length === 0 ? (
            <p>No conditions found for the given symptoms.</p>
          ) : (
            conditions.map((c, idx) => (
              <div
                key={idx}
                className="border p-3 mb-2 rounded hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCondition(c);
                  setStep(4);
                }}
              >
                <strong>{c.condition}</strong> — {c.riskLevel}
              </div>
            ))
          )}
          <button
            onClick={handlePrevStep}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-3"
          >
            Back
          </button>
        </div>
      )}

      {/* Step 4: Condition Details */}
      {step === 4 && selectedCondition && (
        <div>
          <h2 className="text-xl font-bold mb-2">{selectedCondition.condition}</h2>
          <p className="mb-2">{selectedCondition.description}</p>
          <p><strong>Common Symptoms:</strong> {selectedCondition.commonSymptoms.join(', ')}</p>
          <p><strong>Matching Symptoms:</strong> {selectedCondition.matchingSymptoms.join(', ')}</p>
          <p className="mt-2">{selectedCondition.additionalInfo}</p>

          <button
            onClick={() => setStep(3)}
            className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
          >
            Back to List
          </button>
        </div>
      )}
    </div>
  );
};

export default SymptomChecker;
