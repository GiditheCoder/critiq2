import React, { useState, useEffect } from "react";
import { Vote } from "lucide-react";

const MyVotes = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B0A1F] to-[#1A1535] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Vote className="w-10 h-10 text-purple-500" />
          </div>
        </div>
        <p className="text-gray-400 text-lg font-medium mt-6 animate-pulse">
          Loading your votes...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0A1F] to-[#1A1535] flex flex-col">
      {/* Header */}
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-white text-center">My Votes</h1>
      </div>

      {/* Empty State Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
        {/* Animated Vote Icon */}
        <div className="relative mb-8">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
          
          {/* Icon Container */}
          <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-purple-900/30 rounded-full animate-[scalePulse_2s_ease-in-out_infinite]"></div>
            
            {/* Vote Icon with Animation */}
            <svg
              className="w-20 h-20 text-purple-500 animate-[voteBounce_3s_ease-in-out_infinite]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-white text-2xl font-bold mb-3 text-center animate-[fadeIn_0.8s_ease-out]">
          Your Voice is Waiting
        </h2>
        
        <p className="text-gray-400 text-center max-w-sm mb-8 leading-relaxed animate-[fadeIn_0.8s_ease-out_0.2s_both]">
          You haven't voted yet. Dive in, discover new tracks, and let the world know what you think!
        </p>

        {/* Browse Songs Button */}
        <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 animate-[fadeIn_0.8s_ease-out_0.4s_both]">
          <span className="relative z-10">Browse Songs</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
        </button>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-purple-500 rounded-full animate-[float_4s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 right-16 w-3 h-3 bg-pink-500 rounded-full animate-[float_5s_ease-in-out_infinite_1s]"></div>
        <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-purple-400 rounded-full animate-[float_6s_ease-in-out_infinite_2s]"></div>
        <div className="absolute bottom-1/4 right-12 w-2 h-2 bg-pink-400 rounded-full animate-[float_5s_ease-in-out_infinite_1.5s]"></div>
      </div>

      {/* Bottom Navigation (Optional placeholder) */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B0A1F]/95 backdrop-blur-lg border-t border-white/5 px-8 py-4">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Home</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Leaderboard</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 text-purple-500">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs text-purple-500 font-medium">My Votes</span>
          </div>
          
          <div className="flex flex-col items-center gap-1">
            <div className="w-6 h-6 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <span className="text-xs text-gray-400">Profile</span>
          </div>
        </div>
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

        @keyframes voteBounce {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(-5deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(-5px) rotate(5deg);
          }
        }

        @keyframes scalePulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default MyVotes;