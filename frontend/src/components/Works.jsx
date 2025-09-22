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
    <div className="min-h-screen bg-[#0D0C1D] text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Logo */}
      <div className="mb-4">
        {loading ? (
          <Skeleton height={100} width={100} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
        ) : (
          <img
            src={critiqLogo}
            alt="CritiQ Logo"
            className={`w-50 h-50 object-contain transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Header */}
      <div className="mb-10 text-center">
        {loading ? (
          <Skeleton height={40} width={220} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
        ) : (
          <h2
            className={`text-[32px] font-bold transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            How it works
          </h2>
        )}
      </div>

      {/* Feature Cards */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        {loading ? (
          // Show 3 skeleton cards
          [1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-[#1E1B30] rounded-2xl px-6 py-12 text-center w-[300px] sm:w-[340px] md:w-[380px]"
            >
              <Skeleton
                height={96}
                width={96}
                baseColor="#A259FF"
                style={{ opacity: 0.2 }}
                highlightColor="#E2CCFF"
                className="mx-auto mb-4"
              />
              <Skeleton
                height={24}
                width={140}
                baseColor="#A259FF"
                style={{ opacity: 0.2 }}
                highlightColor="#E2CCFF"
                className="mx-auto mb-2"
              />
              <Skeleton
                height={20}
                width={200}
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
              className={`bg-[#1E1B30] rounded-2xl px-6 py-20 text-center w-[300px] h-[350px] sm:w-[340px] md:w-[380px] transition-opacity duration-700 ease-in-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img src={card.icon} alt={card.title} className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-[20px] font-bold mb-2">{card.title}</h3>
              <p className="text-[16px] text-white">{card.description}</p>
            </div>
          ))
        )}
      </div>

      {/* Button */}
      <div>
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
            onClick={handleSelectScreen}
            className={`bg-[#A259FF] text-white text-[18px] px-14 py-4 rounded-full font-semibold shadow-md hover:bg-[#E2CCFF] hover:text-[#A259FF] transition transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Let’s Go!
          </button>
        )}
      </div>

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

export default Works;
