import React, { useState, useEffect } from "react";
import {
  Search,
  TrendingUp,
  TrendingDown,
  Calendar,
  Music,
  Home,
  Heart,
  BarChart3,
  User,

  LogOut,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import barLogo from "../images/bar-graph.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useClerk, useUser } from "@clerk/clerk-react";
import FeaturedCards from "./FeaturedCards";
import Concerts from "./Concerts";
import Top10 from "./Top10";
import { useNavigate, useLocation } from "react-router-dom";

const CritiqHomePage = () => {
  // this is the active tab section
  const [activeTab, setActiveTab] = useState("Trending");
  // this is the section for loading songs
  const [loadingSongs, setLoadingSongs] = useState(true);
  // this is the searhc query aspect 
  const [searchQuery, setSearchQuery] = useState("");
  // this is the loading section
  const [loading, setLoading] = useState(true);
  // this is the loaded , it is for animation
  const [loaded, setLoaded] = useState(false);
  // sign out function from clerk
  const { signOut } = useClerk();
  // this is the error state 
  const [error, setError] = useState(null);
  // get the user 
  const { user } = useUser();
// state to track the songs
  const [songs, setSongs] = useState([]);
  // state to track the user Votes
  const [userVotes, setUserVotes] = useState([]);
  // state to track the votes 
  const [votes, setVotes] = useState({});
  // state to track the selected Genre
  const [selectedGenre, setSelectedGenre] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  // logoutLoading
  const [logoutLoading, setLogoutLoading] = useState(false);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const role = user?.unsafeMetadata?.chosenRole;

  // handle the logout
  const handleLogout = async () => {
    try {
      setLogoutLoading(true);
      await signOut({ redirectUrl: "/" });
    } catch (err) {
      console.error("Sign out failed:", err);
      setLogoutLoading(false);
    }
  };

  const genres = [
    "All",
    "Afrobeats",
    "Dancehall",
    "Rap",
    "Pop",
    "Drill",
    "R&B",
    "Hip-Hop",
    "Indie",
    "Pop Rock",
    "Folk",
    "Electronic",
    "Jazz",
    "Country",
    "Classical",
    "Reggae",
    "Punk",
    "Blues",
    "Metal",
  ];

  const colorClasses = [
    "bg-red-400",
    "bg-orange-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-emerald-400",
    "bg-teal-400",
    "bg-cyan-400",
    "bg-blue-400",
    "bg-indigo-400",
    "bg-violet-400",
    "bg-purple-500",
    "bg-pink-500",
    "bg-rose-500",
    "bg-lime-500",
    "bg-amber-500",
  ];

  // --- Fetch songs
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await fetch(
          "https://critiq-backend-6v3f.onrender.com/api/song_details"
        );
        if (!res.ok) throw new Error("Failed to fetch songs");

        const response = await res.json();
        const songsData = response.data || response;

        console.log("🎵 Full backend response:", response);
        console.log("🎶 Extracted songs data:", songsData);

        if (Array.isArray(songsData)) {
          songsData.forEach((song, index) => {
            console.log(`Song ${index + 1}:`, {
              title: song.title,
              genre: song.genre,
              imageUrl: song.imageUrl,
            });
          });
          setSongs(songsData);
        } else {
          console.error("API returned non-array data:", response);
          setSongs([]);
          setError("Unexpected data format from server");
        }
      } catch (err) {
        console.error("🚨 Fetch error:", err);
        setError(err.message);
        setSongs([]);
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
        const res = await fetch(
          "https://critiq-backend-6v3f.onrender.com/api/votes"
        );
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
          `https://critiq-backend-6v3f.onrender.com/api/user_votes?userId=${encodeURIComponent(
            user.id
          )}`
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

  const handleVoteToggle = async (songId) => {
    if (!user?.id) return alert("Please log in to vote");

    const hasVoted = userVotes.includes(songId);
    setUserVotes((prev) =>
      hasVoted ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
    setVotes((prev) => ({
      ...prev,
      [songId]: (prev[songId] ?? 0) + (hasVoted ? -1 : 1),
    }));

    try {
      await fetch("https://critiq-backend-6v3f.onrender.com/api/user_votes", {
        method: hasVoted ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, songId }),
      });
    } catch (e) {
      console.error("Vote error:", e);
      setUserVotes((prev) =>
        hasVoted ? [...prev, songId] : prev.filter((id) => id !== songId)
      );
      setVotes((prev) => ({
        ...prev,
        [songId]: (prev[songId] ?? 0) + (hasVoted ? 1 : -1),
      }));
    }
  };

  const handleSearch = (e) => setSearchQuery(e.target.value);

  // --- Filter songs by search only (for Trending/New Releases tabs)
  const searchFilteredSongs = Array.isArray(songs)
    ? songs.filter((song) => {
      // make it lower case 
        const searchLower = searchQuery.trim().toLowerCase();
        return (
          !searchLower ||
          (song.title && song.title.toLowerCase().includes(searchLower)) ||
          (song.name && song.name.toLowerCase().includes(searchLower))
        );
      })
    : [];

  // --- Sort based on active tab (Trending/New Releases)
  const tabDisplayedSongs = [...searchFilteredSongs].sort((a, b) => {
    if (activeTab === "Trending") {
      const votesA = votes[a.id] ?? 0;
      const votesB = votes[b.id] ?? 0;
      return votesB - votesA;
    }
    else if (activeTab === "New Releases") {
    // Sort by newest songs first, assuming song.createdAt or song.id reflects order
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB - dateA; // newest first
  }
    return 0;
  });

  // --- Filter by genre (for the genre section below)
  const genreFilteredSongs = Array.isArray(songs)
    ? songs.filter((song) => {
       const matchesGenre =
          selectedGenre === "All" ||
          (song.genre &&
            song.genre.toLowerCase().trim() ===
              selectedGenre.toLowerCase().trim());
  
        return  matchesGenre;
      })
    : [];



  return (
    <div className="min-h-screen bg-[#0B0A1F] text-white flex flex-col">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {loading ? (
          <div className="flex items-baseline gap-2 sm:gap-3">
            <Skeleton
              height={32}
              width={64}
              baseColor="#A259FF"
              highlightColor="#E2CCFF"
              style={{ opacity: 0.2 }}
              className="sm:!h-10 sm:!w-20 lg:!h-12 lg:!w-24"
            />
            <Skeleton
              height={32}
              width={80}
              baseColor="#A259FF"
              highlightColor="#E2CCFF"
              style={{ opacity: 0.2 }}
              className="sm:!h-10 sm:!w-24 lg:!h-12 lg:!w-28"
            />
          </div>
        ) : (
          <div className="flex items-baseline gap-2 sm:gap-3">
          
            <img
  src={barLogo}
  alt="Critiq Logo"
  style={{ filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)' }}
  className={`w-5 h-auto object-contain transition-opacity duration-700 ease-in-out ${
    loaded ? 'opacity-100' : 'opacity-0'
  }`}
/>
            <h1
              className={`text-white text-xl font-bold transition-opacity duration-700 ease-in-out sm:text-2xl lg:text-2xl ${
                loaded ? "opacity-100" : "opacity-0"
              }`}
            >
              critiq
            </h1>
          </div>
        )}

        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1E1B30] hover:bg-[#2a2d47] transition-colors relative"
        >
          {logoutLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <LogOut className="w-5 h-5 text-white" />
          )}
        </button>
      </div>

      {/* SEARCH */}
     <div className="relative mb-4">
  {/* Only show icon when search box is empty */}
  {searchQuery === "" && (
    <div className="absolute left-4 top-3.5 pointer-events-none transition-opacity duration-300">
      <Search className="w-5 h-5 text-gray-400" />
    </div>
  )}

  <input
    value={searchQuery}
    onChange={handleSearch}
    placeholder="Search Songs, Artists..."
    className="w-full bg-[#1E1B30] border border-[#3c3c51] rounded-lg px-10 py-3 text-gray-300 focus:outline-none transition-all duration-300"
  />
</div>


      {/* TABS (Trending/New Releases) */}
      <div className="flex gap-2 px-4 mb-4">
        {['Trending', 'New Releases'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab ? 'bg-[#A259FF] text-white' : 'bg-[#1E1B30] text-gray-300 hover:bg-[#2a2d47]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div> 
      
      {/* SONG LIST FOR TRENDING/NEW RELEASES */}
      <div className="flex-1 px-4 pb-8">
        {loadingSongs && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <p>Loading songs...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16 text-red-400">
            <p>{error}</p>
          </div>
        )}

        {!loadingSongs && !error && tabDisplayedSongs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Music size={48} className="mb-4 text-[#A259FF]" />
            <h2 className="text-lg font-semibold text-white">
              No songs available
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Check back later for new releases!
            </p>
          </div>
        )}

        {/* {!loadingSongs && !error && tabDisplayedSongs.length > 0 && (
          <ul className="space-y-4">
            {tabDisplayedSongs.map((song) => {
              const voted = userVotes.includes(song.id);
              const count = votes[song.id] ?? 0;

              return (
                <li
                  key={song.id}
                  className="p-4 bg-[#1c1c27] rounded-lg flex items-center justify-between hover:bg-[#232333] hover:shadow-lg hover:scale-[1.02] transition duration-300 ease-in-out"
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
                      <h3 className="font-semibold text-white">
                        {song.title}
                      </h3>
                      <p className="text-sm text-white">{song.name}</p>
                      <p className="text-xs text-gray-400">
                        {song.genre || "Unknown Genre"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-300">{count}</span>
                    <TrendingUp
                      size={28}
                      className={`cursor-pointer transition-transform duration-200 hover:scale-110 ${
                        voted
                          ? "fill-green-500 text-green-500"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleVoteToggle(song.id)}
                    />
                    <button
                      onClick={() => console.log(`Voted for ${song.id}`)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        voted
                          ? "bg-green-600 scale-110"
                          : "bg-[#A259FF] hover:bg-[#8F45E3]"
                      }`}
                    >
                      <ArrowUp className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )} */}
        
        {/* {!loadingSongs && !error && tabDisplayedSongs.length > 0 && (
          <ul className="space-y-4">
            {tabDisplayedSongs.map((song, index) => {
              const voted = userVotes.includes(song.id);
              const count = votes[song.id] ?? 0;
              const isLastPlace = index === tabDisplayedSongs.length - 1 && tabDisplayedSongs.length > 1;

              return (
                <li
                  key={song.id}
                  className="p-4 bg-[#1c1c27] rounded-lg flex items-center justify-between hover:bg-[#232333] hover:shadow-lg hover:scale-[1.02] transition duration-300 ease-in-out"
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
                      <h3 className="font-semibold text-white">
                        {song.title}
                      </h3>
                      <p className="text-sm text-white">{song.name}</p>
                      <p className="text-xs text-gray-400">
                        {song.genre || "Unknown Genre"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-sm ${isLastPlace ? 'text-red-400' : 'text-gray-300'}`}>{count}</span>
                    {isLastPlace ? (
                      <TrendingDown
                        size={28}
                        className="text-red-500 cursor-pointer transition-transform duration-200 hover:scale-110"
                        onClick={() => handleVoteToggle(song.id)}
                      />
                    ) : (
                      <TrendingUp
                        size={28}
                        className={`cursor-pointer transition-transform duration-200 hover:scale-110 ${
                          voted
                            ? "fill-green-500 text-green-500"
                            : "text-gray-400"
                        }`}
                        onClick={() => handleVoteToggle(song.id)}
                      />
                    )}
                    <button
                      onClick={() => console.log(`Voted for ${song.id}`)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isLastPlace
                          ? "bg-transparent border-2 border-red-500 hover:bg-red-500/10"
                          : voted
                          ? "bg-green-600 scale-110"
                          : "bg-[#A259FF] hover:bg-[#8F45E3]"
                      }`}
                    >
                      {isLastPlace ? (
                        <ArrowDown className="w-5 h-5 text-red-500" />
                      ) : (
                        <ArrowUp className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )} */}


{!loadingSongs && !error && tabDisplayedSongs.length > 0 && (
  <ul className="space-y-4">
    {tabDisplayedSongs.map((song, index) => {
      const voted = userVotes.includes(song.id);
      const count = votes[song.id] ?? 0;
      const isLastPlace = index === tabDisplayedSongs.length - 1 && tabDisplayedSongs.length > 1;

      return (
        <li
          key={song.id}
          className="p-4 bg-[#1c1c27] rounded-lg flex items-center justify-between hover:bg-[#232333] hover:shadow-lg hover:scale-[1.02] transition duration-300 ease-in-out"
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
              <h3 className="font-semibold text-white">
                {song.title}
              </h3>
              <p className="text-sm text-white">{song.name}</p>
              <p className="text-xs text-gray-400">
                {song.genre || "Unknown Genre"}
              </p>
            </div>
          </div>

          {/* Conditional rendering based on active tab */}
          {activeTab === 'New Releases' ? (
            // New Releases View - Just show NEW badge
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                NEW
              </div>
            </div>
          ) : (
            // Trending View - Show votes and trending icons
            <div className="flex items-center gap-3">
              <span className={`text-sm ${isLastPlace ? 'text-red-400' : 'text-gray-300'}`}>
                {count}
              </span>
              {isLastPlace ? (
                <TrendingDown
                  size={28}
                  className="text-red-500 cursor-pointer transition-transform duration-200 hover:scale-110"
                  onClick={() => handleVoteToggle(song.id)}
                />
              ) : (
                <TrendingUp
                  size={28}
                  className={`cursor-pointer transition-transform duration-200 hover:scale-110 ${
                    voted
                      ? "fill-green-500 text-green-500"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleVoteToggle(song.id)}
                />
              )}
              <button
                onClick={() => console.log(`Voted for ${song.id}`)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isLastPlace
                    ? "bg-transparent border-2 border-red-500 hover:bg-red-500/10"
                    : voted
                    ? "bg-green-600 scale-110"
                    : "bg-[#A259FF] hover:bg-[#8F45E3]"
                }`}
              >
                {isLastPlace ? (
                  <ArrowDown className="w-5 h-5 text-red-500" />
                ) : (
                  <ArrowUp className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          )}
        </li>
      );
    })}
  </ul>
)}

               <h1 className="text-center mt-2 opacity-75 p-5">See more</h1>
      </div>

      <FeaturedCards /> 
      <Top10 />
       
      {/* GENRE BUTTONS */}
      <div className="flex flex-wrap justify-center mt-4 mb-6 gap-2 px-4">
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

      {/* SONG LIST FOR GENRE FILTERING */}
      <div className="flex-1 px-4 pb-20">
        {loadingSongs && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <p>Loading songs...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16 text-red-400">
            <p>{error}</p>
          </div>
        )}

        {!loadingSongs && !error && genreFilteredSongs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Music size={48} className="mb-4 text-[#A259FF]" />
            <h2 className="text-lg font-semibold text-white">
              {selectedGenre === "All"
                ? "No songs available"
                : `No songs in ${selectedGenre}`}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {selectedGenre === "All"
                ? "Check back later for new releases!"
                : "Try another genre or search for something else."}
            </p>
          </div>
        )}

        {!loadingSongs && !error && genreFilteredSongs.length > 0 && (
          <ul className="space-y-4">
            {genreFilteredSongs.map((song) => {
              const voted = userVotes.includes(song.id);
              const count = votes[song.id] ?? 0;

              return (
                <li
                  key={song.id}
                  className="p-4 bg-[#1c1c27] rounded-lg flex items-center justify-between hover:bg-[#232333] hover:shadow-lg hover:scale-[1.02] transition duration-300 ease-in-out"
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
                      <h3 className="font-semibold text-white">
                        {song.title}
                      </h3>
                      <p className="text-sm text-white">{song.name}</p>
                      <p className="text-xs text-gray-400">
                        {song.genre || "Unknown Genre"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-300">{count}</span>
                    <Heart
                      size={28}
                      className={`cursor-pointer transition-transform duration-200 hover:scale-110 ${
                        voted
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                      onClick={() => handleVoteToggle(song.id)}
                    />
                    <button
                      onClick={() => console.log(`Voted for ${song.id}`)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        voted
                          ? "bg-green-600 scale-110"
                          : "bg-[#A259FF] hover:bg-[#8F45E3]"
                      }`}
                    >
                      <ArrowUp className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <Concerts />
      </div>
    </div>
  );
};

export default CritiqHomePage;


