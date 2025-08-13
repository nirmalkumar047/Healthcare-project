import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import DoctorAssistant from './DoctorAssistant';
import DoctorChatbot from './Ai_bots/DoctorChatbot';
// import InstagramFollowers from './InstagramFollowers';

const Doctor = () => {
  const [specialization, setSpecialization] = useState('');
  const [location, setLocation] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    setSearched(true);
    const querySnapshot = await getDocs(collection(db, 'doctors'));
    const allDoctors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const filtered = allDoctors.filter(doc => {
      const matchSpecialization = specialization
        ? doc.specialization?.toLowerCase().includes(specialization.toLowerCase())
        : true;
      const matchLocation = location
        ? doc.location?.toLowerCase().includes(location.toLowerCase())
        : true;
      return matchSpecialization && matchLocation;
    });

    setFilteredDoctors(filtered);
  };

  return (
    <>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🩺 Find a Doctor</h1>

      <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Specialization (e.g., Cardiologist)"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-1/3"
        />
        <input
          type="text"
          placeholder="Location (e.g., Chennai)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-lg w-full md:w-1/3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full md:w-auto"
        >
           Search
        </button>
      </div>

      {searched && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <div key={doc.id} className="border rounded-xl p-4 shadow-md bg-brown-400 hover:shadow-lg transition">
                <h2 className="text-xl font-bold text-blue-700">{doc.name}</h2>
                <p><strong>Specialization:</strong> {doc.specialization}</p>
                <p><strong>Hospital:</strong> {doc.hospital}</p>
                <p><strong>Location:</strong> {doc.location} </p>
                <p><strong>PIN-code :</strong> {doc.Pincode}</p>
                
              </div>
            ))
          ) : (
            <p className="text-center col-span-2 text-gray-500">No matching doctors found.</p>
          )}
        </div>
      )}
    </div>
      <DoctorChatbot/>
    
    </>
  );
};

export default Doctor;
