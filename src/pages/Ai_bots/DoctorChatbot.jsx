import React, { useState } from 'react';

const DoctorChatbot = () => {
  const [userMessage, setUserMessage] = useState('');
  const [response, setResponse] = useState('');
  const apikey = import.meta.env.VITE_DOCTOR_API_KEY;

  const handleChat = async () => {
    const url = 'https://ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com/chat?noqueue=1';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': apikey,
        'x-rapidapi-host': 'ai-doctor-api-ai-medical-chatbot-healthcare-ai-assistant.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        
        specialization: 'general',
        language: 'en'
      })
    };

    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data.message || 'No response from AI doctor.');
    } catch (error) {
      console.error('❌ API Error:', error);
      setResponse('Something went wrong while contacting the AI doctor.');
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
      {response && (
        <div className="mt-4 p-3 border rounded ">
          <strong>Doctor Says:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default DoctorChatbot;
