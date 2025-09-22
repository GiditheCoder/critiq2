import React, { useState } from "react";

const WeeklyTracks = () => {
  const [likedTracks, setLikedTracks] = useState(new Set());

  const weeklyTracks = [
    { id: 1, title: "Stay Forever", artist: "Poets of the Fall", plays: "124k" },
    { id: 2, title: "Turn Around", artist: "Lady Wistum", plays: "98k" },
    { id: 3, title: "Colour Me In", artist: "Damien Rice", plays: "156k" },
    { id: 4, title: "Hypnotic", artist: "Zella Day", plays: "87k" },
  ];

  const toggleLike = (trackId) => {
    const next = new Set(likedTracks);
    next.has(trackId) ? next.delete(trackId) : next.add(trackId);
    setLikedTracks(next);
  };

  return (
    <div className=" text-white p-6 rounded-lg m-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Tracks Of The Week
        </h2>
      </div>

      {/* Tracks container */}
      <div
        className="
          flex flex-col gap-3
          sm:flex-row sm:flex-wrap sm:gap-4
          sm:overflow-x-auto sm:scrollbar-hide
        "
      >
        {weeklyTracks.map((track) => (
          <div
            key={track.id}
            className="
              flex items-center gap-4
              p-3 rounded-lg
              bg-[#1c1c27]
              hover:bg-[#2a2a2a]
              transition-all duration-200
              group cursor-pointer
              flex-shrink-0
              w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33%-0.75rem)]
            "
          >
            {/* Album art */}
            <div className="w-12 h-12 rounded-lg bg-gray-600 flex-shrink-0" />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="truncate">
                <span className="font-semibold group-hover:text-green-400 transition-colors">
                  {track.artist}
                </span>
                <span className="text-gray-400 mx-1">-</span>
                <span className="text-gray-300 group-hover:text-green-300 transition-colors">
                  {track.title}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Like */}
              <button
                onClick={() => toggleLike(track.id)}
                className="p-2 hover:bg-gray-700 rounded-full transition"
              >
                <svg
                  className={`w-5 h-5 transition-colors ${
                    likedTracks.has(track.id)
                      ? "text-red-500 fill-current"
                      : "text-gray-400 hover:text-red-400"
                  }`}
                  fill={likedTracks.has(track.id) ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Plays */}
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 11l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                <span>{track.plays}</span>
              </div>

              {/* More */}
              <button className="p-2 hover:bg-gray-700 rounded-full opacity-0 group-hover:opacity-100 transition">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default WeeklyTracks;
