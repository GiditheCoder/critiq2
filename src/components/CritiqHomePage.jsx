import React, { useState, useEffect } from 'react';
import { useClerk } from "@clerk/clerk-react";   // ✅ import Clerk
import critiqLogo from '../images/critiq-logo.png';
import musicLogo from '../images/musicIcon.png';
import redloveIcon from '../images/love.png';
import trophyLogo from '../images/trophy.png';
import starIcon from '../images/starIcon.png';
import loveIcon from '../images/loveIcon.png';
import { tracks, featured, charts } from './songData';

const CritiqHomePage = () => {
  const { signOut } = useClerk();   // ✅ Clerk hook
  const [activeTab, setActiveTab] = useState('Featured');
  const [loading, setLoading] = useState(false);
  const [votesCount, setVotesCount] = useState({});
  const [userVotes, setUserVotes] = useState({});
  const [leaderboard, setLeaderboard] = useState([]);
  const [trending, setTrending] = useState([]);
  const [activeCommentTrack, setActiveCommentTrack] = useState(null);
  const [comments, setComments] = useState({});

  const genres = [
    'All','Afrobeats','Dancehall','Rap','Pop','Drill','R&B',
    'Hip-Hop','Indie','Pop Rock','Folk','Electronic','Jazz',
    'Country','Classical','Reggae','Punk','Blues','Metal'
  ];

  const colorClasses = [
    'bg-red-400','bg-orange-400','bg-yellow-400','bg-green-400',
    'bg-emerald-400','bg-teal-400','bg-cyan-400','bg-blue-400',
    'bg-indigo-400','bg-violet-400','bg-purple-500','bg-pink-500',
    'bg-rose-500','bg-lime-500','bg-amber-500'
  ];

  const allTracks = [...tracks, ...featured, ...charts];

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/votes');
        const data = await res.json();

        const votes = {};
        const userVoted = {};
        allTracks.forEach(track => {
          const voteData = data.find(v => v.songId === track.songId);
          votes[track.songId] = voteData ? voteData.voteCount : 0;
          userVoted[track.songId] = false;
        });

        setVotesCount(votes);
        setUserVotes(userVoted);
      } catch (err) {
        console.error('Error fetching votes:', err);
      }
    };

    fetchVotes();
  }, []);

  // Update leaderboard & trending whenever votesCount changes
  useEffect(() => {
    const sorted = [...allTracks]
      .map(track => ({ ...track, voteCount: votesCount[track.songId] || 0 }))
      .sort((a, b) => b.voteCount - a.voteCount);

    setLeaderboard(sorted.slice(0, 5));
    setTrending(sorted.slice(0, 3));
  }, [votesCount]);

  const handleTabClick = (tab) => {
    if (tab !== activeTab) {
      setLoading(true);
      setTimeout(() => {
        setActiveTab(tab);
        setLoading(false);
      }, 500);
    }
  };

  const handleVote = async (track) => {
    const songId = track.songId;
    const hasVoted = userVotes[songId];

    setVotesCount(prev => ({ ...prev, [songId]: prev[songId] + (hasVoted ? -1 : 1) }));
    setUserVotes(prev => ({ ...prev, [songId]: !hasVoted }));

    try {
      if (hasVoted) {
        await fetch('http://localhost:5001/api/votes', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ songId })
        });
      } else {
        await fetch('http://localhost:5001/api/votes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ songId })
        });
      }
    } catch (err) {
      console.error('Error updating vote:', err);
      setVotesCount(prev => ({ ...prev, [songId]: prev[songId] + (hasVoted ? 1 : -1) }));
      setUserVotes(prev => ({ ...prev, [songId]: hasVoted }));
    }
  };

  const handleAddComment = (trackId, text) => {
    if (!text.trim()) return;
    setComments(prev => ({ ...prev, [trackId]: [...(prev[trackId] || []), text] }));
  };

  const handleLogout = () => {
    signOut();   // ✅ Clerk logout
  };

  const renderTrackList = (data) => (
    <div className="mt-6 space-y-4">
      {data.map(track => (
        <div
          key={track.songId}
          className="flex flex-col p-4 bg-gray-900 hover:bg-gray-700 transition duration-200 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{track.title}</h2>
              <p className="text-sm text-gray-400">{track.artist} - {track.album}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span>{votesCount[track.songId]} VOTES</span>
              <div
                className="p-2 bg-[#595975] rounded-full cursor-pointer"
                onClick={() => handleVote(track)}
              >
                <img src={userVotes[track.songId] ? redloveIcon : loveIcon} alt="Vote" className="h-6 w-6" />
              </div>
              <button
                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500 transition text-sm"
                onClick={() =>
                  setActiveCommentTrack(activeCommentTrack === track.songId ? null : track.songId)
                }
              >
                Yap
              </button>
            </div>
          </div>

          {activeCommentTrack === track.songId && (
            <div className="mt-3">
              <input
                type="text"
                placeholder="Write a comment..."
                className="w-full p-2 rounded bg-gray-800 border border-gray-700 text-white"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddComment(track.songId, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <div className="mt-2 space-y-1 text-left">
                {(comments[track.songId] || []).map((c, i) => (
                  <p key={i} className="text-sm text-gray-300">• {c}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      <div className="mb-2 flex justify-center relative">
        <img src={critiqLogo} alt="Critiq Logo" className="h-40 w-40" />

        {/* ✅ Logout button in top-right */}
        <button
          onClick={handleLogout}
          className="absolute top-2 right-2 p-2 rounded-full bg-[#595975] hover:bg-[#595975] transition ml-4 "
        >
          {/* Simple logout icon (SVG) */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-white "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m-6 6h6"
            />
          </svg>
        </button>
      </div>

      <h1 className="text-center font-semibold mb-3">Community-driven music rankings</h1>

      <header className="w-full px-4">
        <div className="w-full backdrop-blur-md py-1 rounded-xl flex justify-between items-center">
          {['Tracks', 'Featured', 'Charts'].map(tab => {
            const icons = { Tracks: musicLogo, Featured: starIcon, Charts: trophyLogo };
            return (
              <div
                key={tab}
                className={`flex-1 flex justify-center ${
                  activeTab === tab ? 'bg-[#595975]' : 'bg-white/10'
                } hover:bg-[#595975] transition duration-200`}
              >
                <button
                  onClick={() => handleTabClick(tab)}
                  className="flex items-center gap-2 text-sm text-white px-4 py-2 rounded"
                >
                  <img src={icons[tab]} alt={tab} className="h-5" />
                  {tab}
                </button>
              </div>
            );
          })}
        </div>
      </header>

      <main className="text-center p-4">
        <h1 className="text-xl font-semibold">Vote for Your Favorites</h1>
        <p className="text-sm mt-2">
          Tap the heart to vote for tracks you love! Tap again to remove your vote.
        </p>

        <h1 className="text-left font-semibold mt-6">Browse by Genres</h1>
        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {genres.map((genre, index) => (
            <button
              key={genre}
              className={`text-sm px-4 py-1 ${colorClasses[index % colorClasses.length]} text-white rounded-full hover:brightness-110 transition`}
            >
              {genre}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="mt-10 text-center animate-pulse text-gray-400">
            Loading {activeTab}...
          </p>
        ) : activeTab === 'Tracks' ? (
          renderTrackList(tracks)
        ) : activeTab === 'Featured' ? (
          renderTrackList(featured)
        ) : (
          renderTrackList(charts)
        )}

        {/* 🔥 Trending Section */}
        <section className="mt-10 px-6">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            🔥 Trending Now
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-86">
            {trending.map((track) => (
              <div key={track.songId} className="flex flex-col items-center">
                <div className="w-48 h-48 bg-gray-800 rounded-lg hover:bg-gray-700 transition"></div>
                <p className="mt-3 text-base font-semibold text-center">{track.title}</p>
                <p className="text-sm text-gray-400 text-center">{track.artist}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 🏆 Leaderboard Section */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <img src={trophyLogo} alt="Leaderboard" className="h-6" />
            Top Voted Leaderboard
          </h2>
          <div className="mt-6 space-y-3">
            {leaderboard.map((track, index) => (
              <div
                key={track.songId}
                className="flex items-center justify-between bg-gray-800 p-3 rounded-lg"
              >
                <span className="font-semibold">
                  #{index + 1} {track.title} – {track.artist}
                </span>
                <span className="text-sm text-gray-300">
                  {track.voteCount} votes
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CritiqHomePage;
