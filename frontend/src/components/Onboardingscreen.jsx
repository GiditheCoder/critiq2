import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import critiqLogo from '../images/critiq-logo.png';
import barLogo from '../images/bar-graph.png';
import { useNavigate } from 'react-router-dom';

const OnboardingScreen = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // the useEffect 
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // handle the role 
  const handleRoleScreen = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/role');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0F0F1C] flex flex-col items-center justify-center px-4 sm:px-8 relative">
      {/* Logo Section */}
<div className="mb-12 sm:mb-16 lg:mb-20">
  {loading ? (
    <div className="flex items-baseline gap-3">
      <Skeleton
        height={50}
        width={96}
        baseColor="#A259FF"
        highlightColor="#E2CCFF"
        style={{ opacity: 0.2 }}
      />
      <Skeleton
        height={50}
        width={120}
        baseColor="#A259FF"
        highlightColor="#E2CCFF"
        style={{ opacity: 0.2 }}
      />
    </div>
  ) : (
    <div className="flex items-baseline gap-3">
    <img
  src={barLogo}
  alt="Critiq Logo"
  style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' }}
  className={`w-8 sm:w-12 lg:w-12 h-auto object-contain transition-opacity duration-700 ease-in-out ${
    loaded ? 'opacity-100' : 'opacity-0'
  }`}
/>
      <h1 className={`text-white text-2xl sm:text-3xl lg:text-5xl font-bold transition-opacity duration-700 ease-in-out ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}>
        critiq
      </h1>
    </div>
  )}
</div>

      {/* Welcome Content */}
      <div className="text-center mb-8 sm:mb-16">
        {loading ? (
          <Skeleton
            height={40}
            width={450}
            baseColor="#A259FF"
            highlightColor="#E2CCFF"
            style={{ opacity: 0.2 }}
          />
        ) : (
          <h2
            className={`text-white text-3xl sm:text-5xl lg:text-6xl font-bold mb-0 sm:mb-6 transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Welcome to Critiq!
          </h2>
        )}

        {loading ? (
          <Skeleton
            height={60}
            width={300}
            baseColor="#A259FF"
            highlightColor="#E2CCFF"
            style={{ opacity: 0.2 }}
            className="mt-4"
          />
        ) : (
          <p
            className={`text-gray-400 hover:text-white text-base sm:text-lg border border-transparent hover:border-[#E2CCFF] rounded-lg px-6 sm:px-8 py-3 max-w-xl mx-auto duration-200 transition-opacity ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Discover, vote, and help shape tomorrow's top tracks.
          </p>
        )}
      </div>

      {/* Button */}
      {loading ? (
        <Skeleton
          height={50}
          width={180}
          baseColor="#A259FF"
          highlightColor="#E2CCFF"
          style={{ opacity: 0.2 }}
          borderRadius={9999}
        />
      ) : (
        <button
          className={`bg-[#A259FF] hover:bg-[#E2CCFF] text-white hover:text-[#A259FF] font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full text-base sm:text-lg duration-300 ease-in-out shadow-lg mt-4 mb-3 cursor-pointer transition-opacity flex items-center justify-center ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={handleRoleScreen}
          disabled={isLoading}
        >
          Get Started
        </button>
      )}

      {/* Fullscreen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-16 w-16 text-[#A259FF]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default OnboardingScreen;
