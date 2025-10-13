import React, { useState , useEffect} from 'react';
import { useUser } from '@clerk/clerk-react';
import { Settings, Edit, Plus, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosClient from "../api/axiosClient";



const ArtisteProfile = () => {
   const navigate = useNavigate();
  const { user, isLoaded} = useUser();
  const [songs, setSongs] = useState([]);
const [loading, setLoading] = useState(true);
  const role = user?.unsafeMetadata?.chosenRole;
  const [activeSection, setActiveSection] = useState('songs');

  const handleSettingsClick = () => { 
    navigate('/settings-page');
  }
   const handleUpload = () => { 
    navigate('/uploadhub');
  }

  
useEffect(() => {
  if (!isLoaded || !user) return;

  const fetchSongsAndVotes = async () => {
    try {
      // 1️⃣ Fetch all songs
      const { data: songRes } = await axiosClient.get(`/api/song_details`);
      const songs = songRes?.data || [];

      // 2️⃣ Fetch all votes
      const { data: votesRes } = await axiosClient.get(`/api/votes`);
      const votes = votesRes || [];

      // 3️⃣ Merge votes into songs by songId
      const mergedSongs = songs.map((song) => {
        const voteRecord = votes.find((v) => v.songId === song.id);
        return {
          ...song,
          votes: voteRecord ? voteRecord.voteCount : 0,
        };
      });

      // 4️⃣ Filter songs uploaded by this user
      const userSongs = mergedSongs.filter((song) => song.userId === user.id);

      setSongs(userSongs);
    } catch (error) {
      console.error("Error fetching songs or votes:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchSongsAndVotes();
}, [user, isLoaded]);


  
  return (
    <div className="min-h-screen bg-[#0B0A1F] text-white pb-20">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="w-10"></div>
        <h1 className="text-xl font-semibold">Artiste Profile</h1>
        <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <Settings className="w-6 h-6 text-white" onClick={handleSettingsClick} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-4 px-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center overflow-hidden">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl font-bold text-gray-700">
                {user?.firstName?.charAt(0) || 'A'}
              </span>
            )}
          </div>
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border-2 border-[#1a1d2e]">
            <Edit className="w-4 h-4 text-white" />
          </div>
        </div>

       
        <p className="text-gray-400 mt-1">@{user?.username || 'aria_music'}</p>

        <div className="mt-3">
          <span className="bg-purple-600 text-white px-6 py-1.5 rounded-full text-sm font-semibold capitalize">
            {role || 'Artist'}
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-around mt-8 px-4 border-b border-gray-700">
        {['bio', 'songs', 'merch', 'concerts'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`pb-3 px-4 text-sm font-medium capitalize transition-colors relative ${
              activeSection === section ? 'text-white' : 'text-gray-400'
            }`}
          >
            {section}
            {activeSection === section && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
            )}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="px-4 mt-6">
        {/* Bio Section */}
        {activeSection === 'bio' && (
          <div className="bg-[#252938] rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-400 uppercase">Bio</h3>
              <button className="text-purple-500 text-sm flex items-center gap-1">
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Aria is a synth-pop artist known for blending dreamy soundscapes with introspective lyrics. 
              Crafting music since the age of 15, her sound is a unique fusion of 80s nostalgia and modern electronic production.
            </p>
          </div>
        )}

        {/* Songs Section */}
        {activeSection === 'songs' && (
  <div>
    <div className="flex items-center justify-between mb-4" onClick={handleUpload}>
      <h3 className="text-sm font-semibold text-gray-400 uppercase">My Songs</h3>
      <button className="text-purple-500 text-sm flex items-center gap-1">
        <Plus className="w-4 h-4" />
        Upload New
      </button>
    </div>

    {loading ? (
      <p className="text-gray-400 text-center">Loading songs...</p>
    ) : songs.length === 0 ? (
      <p className="text-gray-400 text-center">No songs uploaded yet.</p>
    ) : (
      <div className="space-y-3">
        {songs.map((song) => (
          <div key={song.id} className="bg-[#252938] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={song.imageUrl || "https://via.placeholder.com/60"}
                alt={song.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-semibold text-white">{song.title}</h4>
                <p className="text-gray-400 text-sm">
                  {song.votes ? `${song.votes} votes` : "0 votes"}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
)}


        {/* Merch Section */}
        {activeSection === 'merch' && (
          <div className="text-center py-12">
            <div className="bg-[#252938] rounded-xl p-8">
              <p className="text-gray-400 mb-4">No merchandise available yet</p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Add Merch
              </button>
            </div>
          </div>
        )}

        {/* Concerts Section */}
        {activeSection === 'concerts' && (
          <div className="text-center py-12">
            <div className="bg-[#252938] rounded-xl p-8">
              <p className="text-gray-400 mb-4">No upcoming concerts</p>
              <button className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
                Schedule Concert
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisteProfile;
