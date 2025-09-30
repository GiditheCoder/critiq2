import React, { useState, useEffect } from 'react';
import card1 from '../images/Card1.png';
import card2 from '../images/Card2.png';
import card3 from '../images/Card3.png';
import card4 from '../images/Card4.png';
import card5 from '../images/Card5.png';
import card6 from '../images/Card6.png';
import card7 from '../images/Card7.png';
import card8 from '../images/Card8.png';
import { useNavigate } from 'react-router-dom';
import critiqLogo from '../images/critiq-logo.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const genres = [
  { id: 1, name: 'Afrobeat', image: card1 },
  { id: 2, name: 'Hip-hop', image: card2 },
  { id: 3, name: 'Reggae', image: card3 },
  { id: 4, name: 'Pop', image: card4 },
  { id: 5, name: 'Jazz', image: card5 },
  { id: 6, name: 'R&B', image: card6 },
  { id: 7, name: 'Drill', image: card7 },
  { id: 8, name: 'EDM', image: card8 },
];

const SelectVibe = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleGenreSelection = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((genreId) => genreId !== id) : [...prev, id]
    );
  };

  const handleSelectScreen = () => {
    navigate('/works');
  };

  return (
    <div className="bg-[#0B0A1F] min-h-screen text-white flex flex-col items-center px-4 sm:px-6 py-6">
      {/* Logo */}
      <div className="mb-3 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
        {loading ? (
          <Skeleton
            height="100%"
            width="100%"
            baseColor="#A259FF"
            highlightColor="#E2CCFF"
            style={{ opacity: 0.2 }}
          />
        ) : (
          <img
            src={critiqLogo}
            alt="logo"
            className={`w-full h-full object-contain transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Header */}
      <div className="text-center mb-4 sm:mb-6">
        {loading ? (
          <>
            <Skeleton height={30} width={250} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
            <Skeleton height={20} width={200} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2, marginTop: '0.5rem' }} />
          </>
        ) : (
          <>
            <h1
              className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 transition-opacity duration-700 ease-in-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              What's your vibe?
            </h1>
            <p
              className={`text-xs sm:text-sm md:text-base transition-opacity duration-700 ease-in-out ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Choose 3 or more genres to personalize your feed.
            </p>
          </>
        )}
      </div>

      {/* Genre Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-10 w-full max-w-4xl">
        {loading
          ? Array(8)
              .fill(0)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  height={120}
                  width="100%"
                  baseColor="#A259FF"
                  highlightColor="#E2CCFF"
                  style={{ opacity: 0.2 }}
                  className="rounded-xl"
                />
              ))
          : genres.map((genre) => {
              const isSelected = selectedGenres.includes(genre.id);
              return (
                <div
                  key={genre.id}
                  onClick={() => toggleGenreSelection(genre.id)}
                  className={`relative rounded-xl overflow-hidden cursor-pointer transition-colors duration-300 ${
                    isSelected ? 'border-2 border-[#A259FF] bg-[#A259FF]' : 'border-transparent hover:bg-[#727b83]'
                  } transition-opacity duration-700 ease-in-out ${
                    loaded ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={genre.image}
                    alt={genre.name}
                    className={`w-full h-24 sm:h-32 md:h-40 lg:h-48 object-cover transition-opacity duration-300 ${
                      isSelected ? 'opacity-50' : 'hover:opacity-80'
                    }`}
                  />
                </div>
              );
            })}
      </div>

      {/* Continue Button */}
      {loading ? (
        <Skeleton
          height={48}
          width={150}
          baseColor="#A259FF"
          highlightColor="#E2CCFF"
          style={{ opacity: 0.2 }}
          borderRadius={8}
        />
      ) : (
        <button
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-white font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 ${
            selectedGenres.length >= 3
              ? 'bg-[#A259FF] hover:bg-[#E2CCFF] hover:text-[#A259FF]'
              : 'bg-gray-600 cursor-not-allowed'
          } transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
          disabled={selectedGenres.length < 3}
          onClick={handleSelectScreen}
        >
          Continue
        </button>
      )}
    </div>
  );
};

export default SelectVibe;