import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import critiqLogo from '../images/critiq-logo.png';
import musicicon from '../images/musicnote.png';
import swipeicon from '../images/swipeicon.png';
import topcharticon from '../images/topchart.png';
import { useNavigate } from 'react-router-dom';

const Works = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // for fullscreen overlay

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectScreen = () => {
    setIsLoading(true);
    // simulate a small delay before navigating to show loader effect
    setTimeout(() => {
      setIsLoading(false);
      navigate('/homePage');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0D0C1D] text-white flex flex-col items-center justify-center px-4 sm:px-6 py-8 overflow-hidden relative">
      {/* Logo */}
      <div className="mb-4 sm:mb-6">
        {loading ? (
          <Skeleton 
            height={60} 
            width={60} 
            baseColor="#A259FF" 
            highlightColor="#E2CCFF" 
            style={{ opacity: 0.2 }} 
            className="sm:hidden"
          />
        ) : null}
        {loading ? (
          <Skeleton 
            height={100} 
            width={100} 
            baseColor="#A259FF" 
            highlightColor="#E2CCFF" 
            style={{ opacity: 0.2 }} 
            className="hidden sm:block"
          />
        ) : (
          <img
            src={critiqLogo}
            alt="CritiQ Logo"
            className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 object-contain transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Header */}
      <div className="mb-6 sm:mb-8 md:mb-10 text-center">
        {loading ? (
          <Skeleton 
            height={30} 
            width={180} 
            baseColor="#A259FF" 
            highlightColor="#E2CCFF" 
            style={{ opacity: 0.2 }} 
            className="sm:hidden"
          />
        ) : null}
        {loading ? (
          <Skeleton 
            height={40} 
            width={220} 
            baseColor="#A259FF" 
            highlightColor="#E2CCFF" 
            style={{ opacity: 0.2 }} 
            className="hidden sm:block"
          />
        ) : (
          <h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            How it works
          </h2>
        )}
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-4 sm:gap-6 mb-6 sm:mb-8 w-full max-w-6xl">
        {loading ? (
          // Show 3 skeleton cards
          [1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-[#1E1B30] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-6 sm:py-8 md:py-12 text-center w-full md:w-1/3 max-w-sm mx-auto md:max-w-none"
            >
              <Skeleton
                height={60}
                width={60}
                baseColor="#A259FF"
                style={{ opacity: 0.2 }}
                highlightColor="#E2CCFF"
                className="mx-auto mb-4 sm:hidden"
              />
              <Skeleton
                height={96}
                width={96}
                baseColor="#A259FF"
                style={{ opacity: 0.2 }}
                highlightColor="#E2CCFF"
                className="mx-auto mb-4 hidden sm:block"
              />
              <Skeleton
                height={20}
                width={120}
                baseColor="#A259FF"
                style={{ opacity: 0.2 }}
                highlightColor="#E2CCFF"
                className="mx-auto mb-2"
              />
              <Skeleton
                height={16}
                width={160}
                style={{ opacity: 0.2 }}
                baseColor="#A259FF"
                highlightColor="#E2CCFF"
                className="mx-auto"
              />
            </div>
          ))
        ) : (
          // Render actual cards
          [
            {
              icon: swipeicon,
              title: 'Swipe or Tap',
              description: 'Listen to vote on tracks with swipe or tap',
            },
            {
              icon: topcharticon,
              title: 'Climb the Charts',
              description: 'Top songs hit the leadership in real time',
            },
            {
              icon: musicicon,
              title: 'Support New Artists',
              description: 'Discover underground gems and future stars',
            },
          ].map((card, index) => (
            <div
              key={index}
              className={`bg-[#1E1B30] rounded-xl sm:rounded-2xl px-4 sm:px-6 py-6 sm:py-8 md:py-12 lg:py-16 text-center w-full md:w-1/3 max-w-sm mx-auto md:max-w-none transition-opacity duration-700 ease-in-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={card.icon} 
                alt={card.title} 
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4" 
              />
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">{card.title}</h3>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-white leading-relaxed">{card.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Button */}
      <div>
        {loading ? (
          <Skeleton
            height={44}
            width={140}
            baseColor="#A259FF"
            highlightColor="#E2CCFF"
            style={{ opacity: 0.2 }}
            borderRadius={9999}
            className="sm:hidden"
          />
        ) : null}
        {loading ? (
          <Skeleton
            height={50}
            width={180}
            baseColor="#A259FF"
            highlightColor="#E2CCFF"
            style={{ opacity: 0.2 }}
            borderRadius={9999}
            className="hidden sm:block"
          />
        ) : (
          <button
            onClick={handleSelectScreen}
            className={`bg-[#A259FF] text-white text-base sm:text-lg md:text-xl px-8 sm:px-12 md:px-14 py-3 sm:py-4 rounded-full font-semibold shadow-md hover:bg-[#E2CCFF] hover:text-[#A259FF] transition transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Let's Go!
          </button>
        )}
      </div>

      {/* Fullscreen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-12 w-12 sm:h-16 sm:w-16 text-[#A259FF]"
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

export default Works;