import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
  const { user } = useUser();
  const role = user?.unsafeMetadata?.chosenRole;

    const handleSettingsClick = () => { 
    navigate('/settings-page');
  }

  return (
    <div className="min-h-screen bg-[#0B0A1F] text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-xl font-semibold flex-1 text-center">Profile</h1>
        <button className=" hover:bg-gray-800 rounded-lg transition-colors">
          <Settings className="w-6 h-6 text-white" onClick={handleSettingsClick} />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-8 px-4">
        {/* Profile Image */}
        <div className="relative">
          <div className="w-34 h-34 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center overflow-hidden">
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-gray-700">
                {user?.firstName?.charAt(0) || 'U'}
              </span>
            )}
          </div>
          {/* Edit Badge */}
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center border-2 border-[#0B0A1F]">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>
        </div>

        {/* User Info */}
        <h2 className="text-2xl font-bold mt-4">
          {user?.firstName || 'User'} {user?.lastName || ''}
        </h2>
        <p className="text-gray-400 mt-1">
          @{user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || 'username'}
        </p>

        {/* Role Badge */}
        <div className="mt-4">
          <span className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold capitalize">
            {role || 'Listener'}
          </span>
        </div>
      </div>

     
    </div>
  );
};

export default Profile;