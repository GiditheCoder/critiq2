import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import davidoImg from '../images/davidoImg.png';

const TopVote = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {loading ? (
          <>
            <Skeleton
              height={30}
              width={140}
              baseColor="#A259FF"
              highlightColor="#E2CCFF"
              style={{ opacity: 0.2 }}
            />
            <Skeleton
              height={24}
              width={90}
              baseColor="#A259FF"
              highlightColor="#E2CCFF"
              style={{ opacity: 0.2 }}
            />
          </>
        ) : (
          <>
            <h1 className={`text-2xl font-bold transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              Top Vote
            </h1>
            <div className={`flex items-center gap-2 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <span className="text-white">Afrobeats</span>
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </>
        )}
      </div>

      {/* Featured Artist Card */}
      {loading ? (
        <Skeleton
          height={500}
          width="100%"
          baseColor="#A259FF"
          highlightColor="#E2CCFF"
          style={{ borderRadius: '1rem', opacity: 0.2 }}
        />
      ) : (
        <div
          className={`relative rounded-2xl overflow-hidden bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          {/* Background Image */}
          <div
  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center relative"
  style={{
    backgroundImage: `url(${davidoImg})`,
  }}
>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {/* Artist Name */}
                <h2 className="text-6xl md:text-8xl font-black text-white mb-2 tracking-wider drop-shadow-2xl">
                  WITH YOU
                </h2>

                {/* Song Info */}
                <p className="text-xl md:text-2xl text-white font-semibold drop-shadow-lg">
                  DAVIDO EMARLEY
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopVote;
