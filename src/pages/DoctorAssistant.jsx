import React, { useState } from 'react';
import axios from 'axios';

const DoctorAssistant = () => {
  const [userInput, setUserInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  const handleChat = async () => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful medical assistant.' },
            { role: 'user', content: userInput }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          }
        }
      );

      const message = response?.data?.choices?.[0]?.message?.content;
      setChatResponse(message || "No response from assistant.");
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      setChatResponse("Assistant is currently unavailable.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto  rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">AI Doctor Assistant 🤖</h2>
      <textarea
        className="w-full border p-2 mb-4"
        rows={4}
        placeholder="Ask your health-related question..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleChat}
      >
        Ask
      </button>
      {chatResponse && (
        <div className="mt-4 p-4  rounded">
          <p><strong>Assistant:</strong> {chatResponse}</p>
        </div>
      )}
    </div>
  );
};

export default DoctorAssistant;
