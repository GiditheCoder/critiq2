import React, { useState, useEffect } from "react";
import { Vote } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const MyVotes = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState([]);
  const navigate = useNavigate();

  const handleTHomeRedirect = () => {
    navigate("/homePage");
  };

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchVotes = async () => {
      try {
        // 1️⃣ Fetch user votes
        const { data: votesData } = await axiosClient.get(
          `/api/user_votes?userId=${user.id}`
        );

        // 2️⃣ Fetch all songs
        const { data: songsData } = await axiosClient.get(`/api/song_details`);

        // 3️⃣ Match songs that the user voted for
        const votedSongs = songsData.data.filter((song) =>
          votesData.some((vote) => vote.songId === song.id)
        );

        setUserVotes(votedSongs);
      } catch (error) {
        console.error("Error fetching votes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVotes();
  }, [user, isLoaded]);

  // ⏳ LOADING ANIMATION (Same as your original)
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B0A1F] to-[#1A1535] flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Vote className="w-10 h-10 text-purple-500" />
          </div>
        </div>
        <p className="text-gray-400 text-lg font-medium mt-6 animate-pulse">
          Loading your votes...
        </p>
      </div>
    );
  }

  // 🟣 NO VOTES → Your original empty state UI
  if (userVotes.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0B0A1F] to-[#1A1535] flex flex-col">
        <div className="px-4 py-6">
          <h1 className="text-2xl font-bold text-white text-center">My Votes</h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 pb-24">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-purple-900/30 rounded-full animate-[scalePulse_2s_ease-in-out_infinite]"></div>
              <Vote className="w-20 h-20 text-purple-500 animate-[voteBounce_3s_ease-in-out_infinite]" />
            </div>
          </div>

          <h2 className="text-white text-2xl font-bold mb-3 text-center animate-[fadeIn_0.8s_ease-out]">
            Your Voice is Waiting
          </h2>
          <p className="text-gray-400 text-center max-w-sm mb-8 leading-relaxed animate-[fadeIn_0.8s_ease-out_0.2s_both]">
            You haven't voted yet. Dive in, discover new tracks, and let the world know what you think!
          </p>

          <button
            onClick={handleTHomeRedirect}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 animate-[fadeIn_0.8s_ease-out_0.4s_both]"
          >
            <span className="relative z-10">Browse Songs</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
          </button>

          {/* Floating dots */}
          <div className="absolute top-1/4 left-10 w-2 h-2 bg-purple-500 rounded-full animate-[float_4s_ease-in-out_infinite]"></div>
          <div className="absolute top-1/3 right-16 w-3 h-3 bg-pink-500 rounded-full animate-[float_5s_ease-in-out_infinite_1s]"></div>
          <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-purple-400 rounded-full animate-[float_6s_ease-in-out_infinite_2s]"></div>
          <div className="absolute bottom-1/4 right-12 w-2 h-2 bg-pink-400 rounded-full animate-[float_5s_ease-in-out_infinite_1.5s]"></div>
        </div>

        {/* Bottom Navigation */}
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
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
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
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes voteBounce { 0%,100%{transform:translateY(0)rotate(0deg);}25%{transform:translateY(-10px)rotate(-5deg);}50%{transform:translateY(0)rotate(0deg);}75%{transform:translateY(-5px)rotate(5deg);} }
          @keyframes scalePulse { 0%,100%{transform:scale(1);opacity:0.5;}50%{transform:scale(1.1);opacity:0.3;} }
          @keyframes float { 0%,100%{transform:translateY(0px);opacity:0.6;}50%{transform:translateY(-20px);opacity:1;} }
        `}</style>
      </div>
    );
  }

  // 🟢 USER HAS VOTES → Show cards
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0A1F] to-[#1A1535] text-white px-6 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">My Votes</h1>

      {/* <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userVotes.map((song) => (
          <div
            key={song.id}
            className="bg-[#1C1835] rounded-2xl overflow-hidden shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-[1.02]"
          >
            {song.imageUrl && (
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-lg font-semibold">{song.title}</h3>
              <p className="text-gray-400 text-sm mt-1">By {song.name}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-sm text-purple-400 font-medium">
                  {song.genre}
                </span>
                <span className="text-sm text-gray-500">
                  {song.nationality}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div> */}
      <div className="space-y-4">
  {userVotes.map((song) => (
    <div
      key={song.id}
      className="flex items-center justify-between bg-[#1C1835] rounded-2xl p-3 hover:bg-[#2A2450] transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        {/* Song Image */}
        {song.imageUrl ? (
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-14 h-14 rounded-lg object-cover"
          />
        ) : (
          <div className="w-14 h-14 rounded-lg bg-gray-700" />
        )}

        {/* Song Info */}
        <div>
          <h3 className="text-base font-semibold text-white">{song.title}</h3>
          <p className="text-sm text-gray-400">{song.name}</p>
        </div>
      </div>

      {/* Right Side — “Voted” Tag */}
      <div className="flex items-center gap-1 text-purple-400 text-sm font-medium">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>Voted</span>
      </div>
    </div>
  ))}
</div>







      <div className="flex justify-center mt-10">
        <button
          onClick={handleTHomeRedirect}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium transition"
        >
          Back to Browse
        </button>
      </div>
    </div>
  );
};

export default MyVotes;

