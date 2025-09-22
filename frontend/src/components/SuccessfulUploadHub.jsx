import React from 'react';
import Arena from '../images/arena.jpg'; // fixed extension typo (.jpg not .jng)

const SuccessfulUploadHub = () => {
  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col items-center justify-center text-center px-4">
      {/* Top Image */}
      <img 
        src={Arena} 
        alt="Arena Celebration" 
        className="w-full max-w-md rounded-lg shadow-lg mb-6"
      />

      {/* Heading */}
      <h1 className="text-white text-3xl font-extrabold mb-2">ARENA READY!</h1>

      {/* Subtext */}
      <p className="text-gray-300 mb-6">
        Your track <span className="font-semibold text-white">"Neon Dreams"</span> is now live on Critiq!
      </p>

      {/* Primary Button */}
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full mb-4 transition">
        View My Track
      </button>

      {/* Secondary Button */}
      <button className="border border-purple-500 text-purple-400 hover:bg-purple-600/20 font-semibold py-3 px-8 rounded-full mb-6 transition">
        Share My Track
      </button>

      {/* Links */}
      <div className="flex flex-col gap-2 text-sm">
        <a href="#" className="text-gray-300 hover:text-white underline">Upload Another Song</a>
        <a href="#" className="text-gray-300 hover:text-white underline">Go to My Profile</a>
      </div>
    </div>
  );
};

export default SuccessfulUploadHub;
