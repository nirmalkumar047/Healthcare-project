import React from 'react';
import { PhoneCall } from 'lucide-react'; // Optional: for phone icons

const ambulanceContacts = [
  { name: 'Government Emergency', number: '108', type: '24×7 Free Service' },
  { name: 'Maternal & Child (JSSK)', number: '102', type: 'Free Transport Service' },
  { name: 'Universal Emergency', number: '112', type: 'All Emergency Services' },
  { name: 'Apollo Hospitals', number: '1066', type: '24×7 Hospital Ambulance' },
  { name: 'RED Ambulance', number: '1800 121 911 911', type: 'Private Ambulance (RED Health)' },
  { name: 'VMEDO', number: '93431 80000', type: 'Private Ambulance Provider' },
  { name: 'Ambulance On Call', number: '98846 39400', type: 'Private BLS/ACLS Ambulance' },
  { name: 'Medulance', number: '88829 78888', type: 'On-Demand Ambulance' },
];

const Ambulance = () => {
  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl font-bold text-red-700 mb-6 text-center">
        🚑 Ambulance Contact List – Chennai
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {ambulanceContacts.map((contact, index) => (
          <div
            key={index}
            className="bg-pink-400 shadow-md rounded-2xl p-4 border border-red-200 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold text-red-800">{contact.name}</h2>
              <PhoneCall className="text-red-500" />
            </div>
            <p className="text-sm text-gray-600 mb-1">{contact.type}</p>
            <a
              href={`tel:${contact.number.replace(/\s+/g, '')}`}
              className="inline-block mt-2 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl text-sm transition"
            >
              📞 Call {contact.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ambulance;
