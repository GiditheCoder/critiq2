import React, { useState, useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react"; // 💚 lucide heart icon
import critiqLogo from "../images/critiq-logo.png";
import userIcon from "../images/user12.png";
import MenuIcon from "../images/menuIcon.png";
import FeaturedCards from "./FeaturedCards";
import WeeklyTracks from "./WeeklyTracks";
import Top10 from "./Top10";
import LeaderBoard from "./LeaderBoard";
import Concerts from "./Concerts";

const CritiqHomePage = () => {
  const { signOut } = useClerk();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const [songs, setSongs] = useState([]);
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [error, setError] = useState(null);

  const [userVotes, setUserVotes] = useState([]);
  const [votes, setVotes] = useState({});
  const [selectedGenre, setSelectedGenre] = useState("All");

  const role = user?.unsafeMetadata?.chosenRole;

  const genres = [
    "All","Afrobeats","Dancehall","Rap","Pop","Drill","R&B",
    "Hip-Hop","Indie","Pop Rock","Folk","Electronic","Jazz",
    "Country","Classical","Reggae","Punk","Blues","Metal"
  ];

  const colorClasses = [
    "bg-red-400","bg-orange-400","bg-yellow-400","bg-green-400",
    "bg-emerald-400","bg-teal-400","bg-cyan-400","bg-blue-400",
    "bg-indigo-400","bg-violet-400","bg-purple-500","bg-pink-500",
    "bg-rose-500","bg-lime-500","bg-amber-500"
  ];

  // --- Fetch songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch("https://critiq-backend-oqye.onrender.com/api/song_details");
        if (!res.ok) throw new Error("Failed to fetch songs");
        setSongs(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingSongs(false);
      }
    };
    fetchSongs();
  }, []);

  // --- Fetch votes
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch("https://critiq-backend-oqye.onrender.com/api/votes");
        if (!res.ok) throw new Error("Failed to fetch votes");
        const data = await res.json();
        const map = data.reduce((acc, v) => {
          acc[v.songId] = v.voteCount;
          return acc;
        }, {});
        setVotes(map);
      } catch (e) {
        console.error(e);
      }
    };
    fetchVotes();
  }, []);

  // --- Fetch user votes
  useEffect(() => {
    if (!user?.id) return;
    const fetchUserVotes = async () => {
      try {
        const res = await fetch(
          `https://critiq-backend-oqye.onrender.com/api/user_votes?userId=${encodeURIComponent(user.id)}`
        );
        if (!res.ok) throw new Error("Failed to fetch user votes");
        const data = await res.json();
        setUserVotes(data.map((v) => v.songId));
      } catch (e) {
        console.error(e);
      }
    };
    fetchUserVotes();
  }, [user?.id]);

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  const handleRoute = () => navigate("/artistehub");

  // --- Optimistic voting
  const handleVoteToggle = async (songId) => {
    if (!user?.id) return alert("Please log in to vote");

    const hasVoted = userVotes.includes(songId);
    // optimistic update
    setUserVotes((prev) =>
      hasVoted ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
    setVotes((prev) => ({
      ...prev,
      [songId]:
        (prev[songId] ?? 0) + (hasVoted ? -1 : 1),
    }));

    try {
      await fetch("https://critiq-backend-oqye.onrender.com/api/user_votes", {
        method: hasVoted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, songId }),
      });
    } catch (e) {
      console.error("Vote error:", e);
      // rollback if failed
      setUserVotes((prev) =>
        hasVoted ? [...prev, songId] : prev.filter((id) => id !== songId)
      );
      setVotes((prev) => ({
        ...prev,
        [songId]:
          (prev[songId] ?? 0) + (hasVoted ? 1 : -1),
      }));
    }
  };

  const filteredSongs =
    selectedGenre === "All"
      ? songs
      : songs.filter(
          (s) => s.genre?.toLowerCase() === selectedGenre.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white">
      {/* Header */}
      <div className="mb-2 flex items-center justify-between px-4">
        {isLoaded && role && (
          <div
            onClick={handleRoute}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={userIcon}
              alt="User"
              className="h-14 w-14 rounded-full border border-gray-600"
            />
            {/* <span className="text-sm text-gray-300">
              {role === "artiste"
                ? "Artiste"
                : role === "listener"
                ? "Listener"
                : role}
            </span> */}
            {user.username}
          </div>
        )}
        <img src={critiqLogo} alt="logo" className="h-40 w-40" />
        <button
          onClick={handleLogout}
          className="p-2 rounded-full bg-[#595975] hover:bg-[#4e4e6a] transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9 text-white"
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

      <h1 className="text-center font-semibold mb-3">
        Community-driven music rankings
      </h1>

      <main className="text-center p-4">
        <h1 className="text-xl font-semibold">Vote for Your Favorites</h1>
        <p className="text-sm mt-2">
          Tap the heart to vote for tracks you love! Tap again to remove your vote.
        </p>

        <h1 className="text-left font-semibold mt-6">Browse by Genres</h1>
        <div className="flex flex-wrap justify-center mt-4 gap-2">
          {genres.map((g, i) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`text-sm font-bold px-4 py-1 ${
                colorClasses[i % colorClasses.length]
              } text-white rounded-full hover:brightness-110 transition ${
                selectedGenre === g ? "ring-2 ring-white" : ""
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* SONG LIST */}
        <section className="mt-8">
          {loadingSongs && <p>Loading songs...</p>}
          {error && <p className="text-red-400">{error}</p>}

          {!loadingSongs && !error && (
            <ul className="space-y-4">
              {filteredSongs.map((song) => {
                const voted = userVotes.includes(song.id);
                const count = votes[song.id] ?? 0;

                return (
                  <li
                    key={song.id}
                    className="
                      p-4 bg-[#1c1c27] rounded-lg flex items-center justify-between
                      transition duration-300 ease-in-out
                      hover:bg-[#232333] hover:shadow-lg hover:scale-[1.02]
                    "
                  >
                    <div className="flex items-center gap-4">
                      {song.imageUrl ? (
                        <img
                          src={song.imageUrl}
                          alt={song.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gray-600 rounded" />
                      )}
                      <div className="text-left">
                        <p className="font-semibold">{song.title}</p>
                        <p className="text-gray-400 text-sm">{song.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-300">{count}</span>

                      {voted && (
                        <svg
                          className="w-5 h-5 text-green-400"
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
                      )}

                      <Heart
                        size={28}
                        className={`cursor-pointer transition-transform duration-200 hover:scale-110 ${
                          voted ? "fill-red-500 text-red-500" : "text-gray-400"
                        }`}
                        onClick={() => handleVoteToggle(song.id)}
                      />

                      <img
                        src={MenuIcon}
                        alt="menu"
                        className="cursor-pointer opacity-80 hover:opacity-100 "
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <h2 className="mt-4 text-red-100">See more</h2>
      </main>

      <FeaturedCards />
      <WeeklyTracks />
      <Top10 />
      <LeaderBoard />
      <Concerts />
    </div>
  );
};

export default CritiqHomePage;
