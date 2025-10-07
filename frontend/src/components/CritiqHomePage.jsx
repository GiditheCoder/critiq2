import React, { useState, useEffect} from 'react';
import { Search, TrendingUp, Calendar, Music, Home, Heart, BarChart3, User, LogOut, ArrowUp } from 'lucide-react';
import barLogo from '../images/bar-graph.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useClerk, useUser } from "@clerk/clerk-react";
import FeaturedCards from "./FeaturedCards";
import Concerts from "./Concerts";
import Top10 from "./Top10";
import { useNavigate, useLocation } from "react-router-dom";


const CritiqHomePage = () => {
  const [activeTab, setActiveTab] = useState('Trending');
  const [loadingSongs, setLoadingSongs] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const { signOut } = useClerk();
  const [error, setError] = useState(null);
  const { user } = useUser();

  const [songs, setSongs] = useState([]); // Already initialized as array
  const [userVotes, setUserVotes] = useState([]);
  const [votes, setVotes] = useState({});
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [activeNav, setActiveNav] = useState("Browse");
  const navigate = useNavigate();
  const location = useLocation();
    const [logoutLoading, setLogoutLoading] = useState(false); // NEW STATE

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // role
  const role = user?.unsafeMetadata?.chosenRole;

  const handleLogout = async () => {
    try {
       setLogoutLoading(true); 
      await signOut({ redirectUrl: '/' });
    } catch (err) {
      console.error('Sign out failed:', err);
       setLogoutLoading(false);
    }
  };

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

  // --- Fetch songs (FIXED)
  // useEffect(() => {
  //   const fetchSongs = async () => {
  //     try {
  //       const res = await fetch("https://critiq-backend-6v3f.onrender.com/api/song_details");
  //       if (!res.ok) throw new Error("Failed to fetch songs");
  //       const response = await res.json();
        
  //       // Backend returns { success: true, data: [...] }
  //       // Extract the data array from the response
  //       const songsData = response.data || response;
  //        console.log("Fetched songs data:", songsData);
  //       if (Array.isArray(songsData)) {
  //         setSongs(songsData);
  //       } else {
  //         console.error("API returned non-array data:", response);
  //         setSongs([]); // Fallback to empty array
  //         setError("Unexpected data format from server");
  //       }
  //     } catch (err) {
  //       console.error("Fetch error:", err);
  //       setError(err.message);
  //       setSongs([]); // Ensure songs remains an array even on error
  //     } finally {
  //       setLoadingSongs(false);
  //     }
  //   };
  //   fetchSongs();
  // }, []);

  useEffect(() => {
  const fetchSongs = async () => {
    try {
      const res = await fetch("https://critiq-backend-6v3f.onrender.com/api/song_details");
      if (!res.ok) throw new Error("Failed to fetch songs");

      const response = await res.json();

      // Backend returns { success: true, data: [...] }
      const songsData = response.data || response;

      console.log("🎵 Full backend response:", response);
      console.log("🎶 Extracted songs data:", songsData);

      // ✅ Log each song's URL individually
      if (Array.isArray(songsData)) {
        songsData.forEach((song, index) => {
          console.log(`Song ${index + 1}:`, {
            title: song.title,
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
        const res = await fetch("https://critiq-backend-6v3f.onrender.com/api/votes");
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
          `https://critiq-backend-6v3f.onrender.com/api/user_votes?userId=${encodeURIComponent(user.id)}`
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

  // --- Optimistic voting
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

  const handleVote = (songId) => {
    console.log(`Voted for song ${songId}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // --- filter songs by search + genre (SAFE WITH ADDITIONAL CHECK)
  const filteredSongs = Array.isArray(songs) ? songs.filter(song => {
    const searchLower = searchQuery.trim().toLowerCase();
    const matchesSearch = !searchLower ||
      (song.title && song.title.toLowerCase().includes(searchLower)) ||
      (song.artist && song.artist.toLowerCase().includes(searchLower));

    const matchesGenre =
      selectedGenre === "All" ||
      (song.genre && song.genre.toLowerCase() === selectedGenre.toLowerCase());

    return matchesSearch && matchesGenre;
  }) : [];

  return (
    <div className="min-h-screen bg-[#0B0A1F] text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        {loading ? (
          <div className="flex items-baseline gap-2 sm:gap-3">
            <Skeleton height={32} width={64} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="sm:!h-10 sm:!w-20 lg:!h-12 lg:!w-24" />
            <Skeleton height={32} width={80} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="sm:!h-10 sm:!w-24 lg:!h-12 lg:!w-28" />
          </div>
        ) : (
          <div className="flex items-baseline gap-2 sm:gap-3">
            <img src={barLogo} alt="Critiq Logo" className={`w-5 h-auto object-contain transition-opacity duration-700 ease-in-out filter brightness-0 invert sm:w-5 lg:w-6 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
            <h1 className={`text-white text-xl font-bold transition-opacity duration-700 ease-in-out sm:text-2xl lg:text-2xl ${loaded ? 'opacity-100' : 'opacity-0'}`}>critiq</h1>
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

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={handleSearch}
            placeholder="            Search Songs, Artists..."
            className="w-full bg-[#1E1B30] border border-[#3c3c51] rounded-lg px-4 py-3 text-gray-300 focus:outline-none"
          />
          <div className="absolute left-4 top-3.5 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
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

      {/* Song List */}
      <div className="flex-1 px-4 pb-20">
        <section className="mt-8 p-4">
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

          {!loadingSongs && !error && filteredSongs.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Music size={48} className="mb-4 text-[#A259FF]" />
              <h2 className="text-lg font-semibold text-white">
                {selectedGenre === "All" ? "No songs available" : `No songs in ${selectedGenre}`}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                {selectedGenre === "All"
                  ? "Check back later for new releases!"
                  : "Try another genre or search for something else."}
              </p>
            </div>
          )}

          {!loadingSongs && !error && filteredSongs.length > 0 && (
            <ul className="space-y-4">
              {filteredSongs.map((song) => {
                const voted = userVotes.includes(song.id);
                const count = votes[song.id] ?? 0;

                return (
                  <li key={song.id} className="p-4 bg-[#1c1c27] rounded-lg flex items-center justify-between hover:bg-[#232333] hover:shadow-lg hover:scale-[1.02] transition duration-300 ease-in-out">
                    {/* <div className="flex items-center gap-4">
                      {song.image ? (
                        <img src={song.image} alt={song.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-600 rounded" />
                      )}
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{song.title}</h3>
                        <p className="text-sm text-gray-400">{song.artist}</p>
                      </div>
                    </div> */}
                     <div className="flex items-center gap-4">
                      {song.imageUrl ? (
                        <img src={song.imageUrl} alt={song.title} className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <div className="w-16 h-16 bg-gray-600 rounded" />
                      )}
                      <div className="text-left">
                        <h3 className="font-semibold text-white">{song.title}</h3>
                        <p className="text-sm text-white">{song.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-300">{count}</span>
                      <Heart
                        size={28}
                        className={`cursor-pointer transition-transform duration-200 hover:scale-110 ${voted ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                        onClick={() => handleVoteToggle(song.id)}
                      />
                      <button
                        onClick={() => handleVote(song.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          voted ? "bg-green-600 scale-110" : "bg-[#A259FF] hover:bg-[#8F45E3]"
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
        </section>

        <FeaturedCards />
        <Top10 />
 

        <div className="flex flex-wrap justify-center mt-4 mb-20 gap-2">
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

        {!loadingSongs && !error && filteredSongs.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Music size={48} className="mb-4 text-[#A259FF]" />
            <h2 className="text-lg font-semibold text-white">
              {selectedGenre === "All" ? "No songs available" : `No songs in ${selectedGenre}`}
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              {selectedGenre === "All"
                ? "Check back later for new releases!"
                : "Try another genre or search for something else."}
            </p>
          </div>
        )}

        <Concerts />
      </div>

   
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0B0A1F] border-t border-gray-800">
        <div className="flex items-center justify-around py-3">
          {/* Browse */}
          <button
            onClick={() => navigate("/homePage")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("/homePage") ? "bg-[#A259FF]" : ""
              }`}
            >
              <Home
                className={`w-4 h-4 ${isActive("/homePage") ? "text-white" : "text-gray-400"}`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/homePage") ? "text-[#A259FF]" : "text-gray-400"
              }`}
            >
              Browse
            </span>
          </button>

          {/* My Votes */}
          <button
            onClick={() => navigate("/myvotes-page")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("/myvotes-page") ? "bg-[#A259FF]" : ""
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isActive("/myvotes-page") ? "text-white" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/myvotes-page") ? "text-[#A259FF]" : "text-gray-400"
              }`}
            >
              My Votes
            </span>
          </button>

          {/* Leaderboard */}
          <button
            onClick={() => navigate("/leaderboard-page")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("/leaderboard-page") ? "bg-[#A259FF]" : ""
              }`}
            >
              <BarChart3
                className={`w-4 h-4 ${
                  isActive("/leaderboard-page") ? "text-white" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/leaderboard") ? "text-[#A259FF]" : "text-gray-400"
              }`}
            >
              Leaderboard
            </span>
          </button>

          {/* Profile */}
          <button
            onClick={() => navigate("/profile-page")}
            className="flex flex-col items-center gap-1 p-2"
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isActive("/profile-page") ? "bg-[#A259FF]" : ""
              }`}
            >
              <User
                className={`w-4 h-4 ${
                  isActive("/profile-page") ? "text-white" : "text-gray-400"
                }`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                isActive("/profile-page") ? "text-[#A259FF]" : "text-gray-400"
              }`}
            >
              Profile
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CritiqHomePage;