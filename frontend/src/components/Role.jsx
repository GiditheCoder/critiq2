import React, { useState, useEffect } from 'react';
import critiqLogo from '../images/critiq-logo.png';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import barLogo from '../images/bar-graph.png';

const Role = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleListenerSelect = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/signup');
    }, 1000);
  };

  const handleArtistSelect = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/artiste-signup');
    }, 1000);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-[#0B0A1F] text-white px-4 sm:px-6 lg:px-8">
      {/* Main Content - Centered */}
      <div className="flex flex-1 justify-center items-center py-8">
        <div className="text-center flex flex-col items-center w-full max-w-sm sm:max-w-md lg:max-w-lg">
          {loading ? (
            <div className="w-full space-y-6">
              <Skeleton
                height={32}
                className="mb-8 sm:mb-10"
                style={{ opacity: 0.2 }}
                baseColor="#A259FF"
                highlightColor="#E2CCFF"
              />
              <Skeleton
                height={20}
                width={60}
                className="mb-6"
                baseColor="#A259FF"
                style={{ opacity: 0.2 }}
                highlightColor="#E2CCFF"
              />
              <div className="space-y-3 sm:space-y-4">
                <Skeleton
                  height={40} // smaller default
                  className="sm:!h-12 lg:!h-14"
                  style={{ opacity: 0.2, borderRadius: 999 }}
                  baseColor="#A259FF"
                  highlightColor="#E2CCFF"
                />
                <Skeleton
                  height={40} // smaller default
                  className="sm:!h-12 lg:!h-14"
                  style={{ opacity: 0.2, borderRadius: 999 }}
                  baseColor="#A259FF"
                  highlightColor="#E2CCFF"
                />
              </div>
            </div>
          ) : (
            <div
              className={`transition-opacity duration-700 ease-in-out w-full ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <h2 className="text-lg font-bold mb-6 text-white sm:text-2xl sm:mb-10 lg:text-3xl lg:mb-12">
                Choose which applies to you
              </h2>
              <p className="text-sm font-semibold mb-4 sm:text-lg sm:mb-8 lg:text-xl">
                I am
              </p>
              <div className="flex flex-col space-y-3 w-full sm:space-y-4">
                <button
                  onClick={handleArtistSelect}
                  disabled={isLoading}
                  className="border border-purple-500 text-white 
                             text-xs px-4 py-2   /* smaller default */
                             rounded-full w-full transition-colors duration-300 ease-in-out 
                             disabled:opacity-60 hover:bg-purple-500/10 
                             sm:text-sm sm:px-6 sm:py-3   
                             lg:text-base lg:px-8 lg:py-4"
                >
                  an artist
                </button>
                <button
                  onClick={handleListenerSelect}
                  disabled={isLoading}
                  className="bg-purple-500 text-white font-bold 
                             text-xs px-4 py-2   /* smaller default */
                             rounded-full w-full 
                             hover:bg-[#E2CCFF] hover:text-[#A259FF] 
                             transition-colors duration-300 ease-in-out 
                             disabled:opacity-60 
                             sm:text-sm sm:px-6 sm:py-3   
                             lg:text-base lg:px-8 lg:py-4"
                >
                  a critiq
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-10 w-10 text-[#A259FF] sm:h-16 sm:w-16"
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

export default Role;
