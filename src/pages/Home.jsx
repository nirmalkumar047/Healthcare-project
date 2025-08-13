import React from "react";
import { FaHeartbeat, FaStethoscope, FaPills, FaLanguage } from "react-icons/fa";
import PrescriptionUploader from "../components/PrescriptionUploader";

const Home = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your AI-Powered Healthcare Assistant
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Check symptoms, analyze prescriptions, and understand your health — anytime, anywhere.
        </p>
        <button className=" text-blue-700 px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-200 transition">
          Start Symptom Checker
        </button>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">About Our Platform</h2>
        <p className="text-lg text-gray-600">
          We combine AI, medical expertise, and modern technology to make healthcare accessible to everyone.
          Our tools help you understand your symptoms, prescriptions, and treatment options — all in one place.
        </p>
      </section>

      {/* Features */}
      <section className=" py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Our Key Features</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className=" p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaStethoscope className="text-blue-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Symptom Checker</h3>
            <p className="text-gray-600">Find possible conditions based on your symptoms in minutes.</p>
          </div>
          <div className=" p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaPills className="text-green-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Prescription Analysis</h3>
            <p className="text-gray-600">Upload a prescription to learn about medicines and usage.</p>
          </div>
          <div className=" p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaHeartbeat className="text-red-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Health Education</h3>
            <p className="text-gray-600">Understand diseases, prevention, and treatments easily.</p>
          </div>
          <div className=" p-6 rounded-lg shadow hover:shadow-lg transition">
            <FaLanguage className="text-purple-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Language Translation</h3>
            <p className="text-gray-600">Translate medical info into any language you prefer.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto py-12 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
        <p className="text-lg text-gray-600 mb-6">
          We put your health first — with accurate analysis, secure data handling, and easy-to-use tools.
        </p>
        <ul className="text-gray-700 space-y-2">
          <li>✅ AI-powered medical insights</li>
          <li>✅ Multilingual support</li>
          <li>✅ Privacy and security guaranteed</li>
          <li>✅ Free and accessible anywhere</li>
        </ul>
      </section>
      <PrescriptionUploader/>

      {/* Footer */}
      <footer className="bg-blue-800 text-white py-6 text-center">
        <p>© 2025 HealthMate. All Rights Reserved.</p>
        <p className="text-sm mt-1">Contact: support@healthmate.com</p>
      </footer>
    </div>
  );
};

export default Home;
