import React, { useState, useEffect, useRef } from 'react';
import { Music, Trophy, ChevronLeft, ChevronDown } from 'lucide-react';

const LeaderBoardNew = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('world');
  const [selectedGenre, setSelectedGenre] = useState('All Genres');
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const genres = [
    'All Genres',
    'Afrobeats',
    'Afrodance',
    'Hip Hop',
    'Pop',
    'Rap',
    'Dancehall',
    'R&B',
    'Reggae'
  ];

  // Simulated leaderboard data
  const leaderboardData = [
    { id: 1, title: 'Song Title 1', artist: 'Artist Name', votes: 1234, image: '🎵', rank: 1 },
    { id: 2, title: 'Song Title 2', artist: 'Artist Name', votes: 1122, image: '🎵', rank: 2 },
    { id: 3, title: 'Song Title 3', artist: 'Artist Name', votes: 1000, image: '🎵', rank: 3 },
    { id: 4, title: 'Song Title 4', artist: 'Artist Name', votes: 987, image: '🎵', rank: 4 },
    { id: 5, title: 'Song Title 5', artist: 'Artist Name', votes: 876, image: '🎵', rank: 5 },
    { id: 6, title: 'Song Title 6', artist: 'Artist Name', votes: 765, image: '🎵', rank: 6 },
  ];

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsGenreDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setIsGenreDropdownOpen(false);
    setActiveTab('genres');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0A1F] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Trophy className="w-10 h-10 text-purple-500" />
          </div>
        </div>
        <p className="text-gray-400 text-lg font-medium mt-6 animate-pulse">
          Loading leaderboard...
        </p>
      </div>
    );
  }

  const topThree = leaderboardData.slice(0, 3);
  const remaining = leaderboardData.slice(3);

  return (
    <div className="min-h-screen bg-[#0B0A1F] text-white">
      {/* Header */}
      <div className="relative px-4 py-6">
        <button className="absolute left-4 top-6 p-2 hover:bg-white/5 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-center">Leaderboard</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 px-4 mb-8">
        <button
          onClick={() => setActiveTab('world')}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === 'world'
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
              : 'bg-white/10 text-gray-400 hover:bg-white/15'
          }`}
        >
          World Leaderboard
        </button>
        
        {/* Genres Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsGenreDropdownOpen(!isGenreDropdownOpen)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'genres'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-gray-400 hover:bg-white/15'
            }`}
          >
            {selectedGenre}
            <ChevronDown className={`w-4 h-4 transition-transform ${isGenreDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isGenreDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-[#1A1930] rounded-2xl shadow-xl border border-white/10 overflow-hidden z-50 animate-[dropdownSlide_0.2s_ease-out]">
              <div className="py-2 max-h-80 overflow-y-auto">
                {genres.map((genre) => (
                  <button
                    key={genre}
                    onClick={() => handleGenreSelect(genre)}
                    className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                      selectedGenre === genre
                        ? 'bg-purple-500/20 text-purple-400 font-medium'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="flex items-end justify-center gap-4 px-8 mb-12">
        {/* 2nd Place */}
        <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out_0.2s_both]">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 p-1">
              <div className="w-full h-full rounded-full bg-[#1A1930] flex items-center justify-center text-3xl overflow-hidden">
                {topThree[1]?.image}
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center font-bold text-[#0B0A1F] text-sm">
              2
            </div>
          </div>
          <p className="text-white font-semibold mt-4 text-sm">{topThree[1]?.title}</p>
          <p className="text-gray-400 text-xs">{topThree[1]?.votes} votes</p>
        </div>

        {/* 1st Place */}
        <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
          <div className="relative -mt-6">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 p-1 shadow-lg shadow-yellow-500/50">
              <div className="w-full h-full rounded-full bg-[#1A1930] flex items-center justify-center text-4xl overflow-hidden">
                {topThree[0]?.image}
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center font-bold text-[#0B0A1F] shadow-lg shadow-yellow-500/50">
              1
            </div>
          </div>
          <p className="text-white font-semibold mt-4">{topThree[0]?.title}</p>
          <p className="text-gray-400 text-sm">{topThree[0]?.votes} votes</p>
        </div>

        {/* 3rd Place */}
        <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out_0.4s_both]">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 p-1">
              <div className="w-full h-full rounded-full bg-[#1A1930] flex items-center justify-center text-3xl overflow-hidden">
                {topThree[2]?.image}
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center font-bold text-[#0B0A1F] text-sm">
              3
            </div>
          </div>
          <p className="text-white font-semibold mt-4 text-sm">{topThree[2]?.title}</p>
          <p className="text-gray-400 text-xs">{topThree[2]?.votes} votes</p>
        </div>
      </div>

      {/* Remaining Rankings */}
      <div className="px-4 pb-8 space-y-3">
        {remaining.map((song, index) => (
          <div
            key={song.id}
            className="bg-[#1A1930] rounded-2xl p-4 flex items-center gap-4 hover:bg-[#222138] transition-all animate-[slideUp_0.5s_ease-out_both]"
            style={{ animationDelay: `${0.6 + index * 0.1}s` }}
          >
            <span className="text-gray-400 font-medium w-6 text-center">{song.rank}</span>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center text-2xl overflow-hidden">
              {song.image}
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold">{song.title}</p>
              <p className="text-gray-400 text-sm">by {song.artist}</p>
            </div>
            <div className="text-right">
              <p className="text-white font-bold">{song.votes}</p>
              <p className="text-gray-400 text-xs">votes</p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LeaderBoardNew;