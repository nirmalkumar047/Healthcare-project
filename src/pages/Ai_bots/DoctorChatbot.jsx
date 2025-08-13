import React, { useState } from 'react';

const DoctorChatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [doctorReply, setDoctorReply] = useState(null);
  const apikey = import.meta.env.VITE_DOCTOR_API_KEY2;

  const handleChat = async () => {
    if (!userMessage.trim()) return;

    const url =
      'https://ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com/chat?noqueue=1';

    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': apikey,
        'x-rapidapi-host':
          'ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        specialization: 'general',
        language: 'en',
      }),
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();

      const reply = data?.result?.response || null;

      setDoctorReply(reply);
    } catch (error) {
      console.error('❌ API Error:', error);
      setDoctorReply({
        message:
          'Something went wrong while contacting the AI doctor. Please try again.',
      });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">AI Doctor Assistant</h2>
      <textarea
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Describe your symptoms..."
        className="w-full border p-2 mb-2 rounded"
        rows="4"
      />
      <button
        onClick={handleChat}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Ask Doctor
      </button>

      {doctorReply && (
        <div className="mt-4 p-3 border rounded ">
          {doctorReply.message && (
            <p>
              <strong>Doctor Says:</strong> {doctorReply.message}
            </p>
          )}

          {doctorReply.recommendations?.length > 0 && (
            <div className="mt-3">
              <strong>💡 Recommendations:</strong>
              <ul className="list-disc ml-5">
                {doctorReply.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          {doctorReply.warnings?.length > 0 && (
            <div className="mt-3 text-red-600">
              <strong>⚠ Warnings:</strong>
              <ul className="list-disc ml-5">
                {doctorReply.warnings.map((warn, idx) => (
                  <li key={idx}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorChatbot;
