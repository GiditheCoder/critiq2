import React, { useState } from 'react';
import { User, Upload, ShoppingBag, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import critiqLogo from "../images/critiq-logo.png";
import userIcon from "../images/user12.png";
import {  useUser } from "@clerk/clerk-react";

const ArtisteHub = () => {
  const [activeTab, setActiveTab] = useState('Bio');
  const navigate = useNavigate();
 const { user} = useUser();
    const handleRoute = () => navigate("/uploadhub");

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Bio':
        return (
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-gray-500 text-lg mb-2">No bio available</div>
                <p className="text-gray-600 text-sm">Add your bio to let people know about you</p>
              </div>
            </div>
          </div>
        );
      case 'Upload':
        return (
          <div className="p-6">
            <div className="flex items-center justify-center">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                  <div 
                  onClick={handleRoute}
                  className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-300 text-lg">Upload File</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Merch':
        return (
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-gray-500 text-lg mb-2">No merch available</div>
                <p className="text-gray-600 text-sm">Upload your merchandise to start selling</p>
              </div>
            </div>
          </div>
        );
      case 'Socials':
        return (
          <div className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-gray-500 text-lg mb-2">No social links added</div>
                <p className="text-gray-600 text-sm">Connect your social media accounts</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0C1D] text-white">
      {/* Top Navigation */}
      <div className="flex items-center justify-between p-6">
         <img src={critiqLogo} alt="Critiq Logo" className="h-20 w-20" />
        <div className="flex items-center space-x-4">
         <img
                       src={userIcon}
                       alt="User"
                       className="h-14 w-14 rounded-full border border-gray-600"
                     />
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 pb-8">
        <div className="flex items-start space-x-6">
          {/* Profile Image Placeholder */}
          <div className="w-48 h-48 bg-gray-700/50 rounded-3xl border-2 border-gray-600 flex items-center justify-center backdrop-blur-sm">
            <User className="w-16 h-16 text-gray-400" />
          </div>

          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl font-bold">Artist Name</h1>
            </div>
            <p className="text-gray-300 text-lg mb-4">{user.username}</p>
           

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-200 transition">
                Follow
              </button>
              <button className="border border-gray-500 px-6 py-2 rounded-full font-medium hover:border-white transition">
                Get in touch
              </button>
            </div>

            {/* Stats */}
            <div className="flex space-x-12">
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Followers</div>
                <div className="text-3xl font-bold">2,985</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Following</div>
                <div className="text-3xl font-bold">132</div>
              </div>
              <div className="text-center">
                <div className="text-gray-400 text-sm mb-1">Likes</div>
                <div className="text-3xl font-bold">548</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-700 px-6">
        <div className="flex space-x-8">
          {['Bio', 'Upload', 'Merch', 'Socials'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 font-medium transition ${
                activeTab === tab
                  ? 'border-b-2 border-white text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content Based on Active Tab */}
      {renderTabContent()}
    </div>
  );
};

export default ArtisteHub;