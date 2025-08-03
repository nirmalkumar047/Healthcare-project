import React from 'react';
import emailjs from 'emailjs-com';

const Sos = () => {
  const handleSOSClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const templateParams = {
          to_email: 'akkinapallikumar@gmail.com', // ✅ MUST match your template
          message: '🚨 Emergency! Please help!',
          lat: latitude.toFixed(4),
          lng: longitude.toFixed(4),
        };

        console.log("📤 Email Params:", templateParams);
        console.log("📤 Env Vars:", {
          service: import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          template: import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          user: import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        });

        emailjs.send(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
        )
        .then(() => {
          alert('✅ SOS email sent!');
        })
        .catch((err) => {
          console.error('❌ Email failed:', err);
          alert('❌ Failed to send SOS. Check console for details.');
        });
      },
      () => {
        alert('📍 Location access denied');
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen  ">
      <button
        onClick={handleSOSClick}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-xl transition duration-200 relative overflow-hidden group"
        style={{ position: 'relative' }}
      >
        <span
          className="absolute inset-0 flex items-center justify-center text-6xl font-extrabold text-white opacity-0 group-hover:opacity-30 pointer-events-none select-none transition-opacity duration-200"
          style={{
            letterSpacing: '0.2em',
            zIndex: 1,
            userSelect: 'none',
          }}
        >
          HELP
        </span>
        <span className="relative z-10">🚨 Send SOS</span>
      </button>
    </div>
  );
};

export default Sos;
