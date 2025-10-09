import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import Profile from './Profile';
import ArtisteProfile from './ArtisteProfile';

const ProfileRouter = () => {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      // Small delay to ensure metadata is loaded
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Loading state while Clerk is initializing
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-[#0B0A1F] flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="w-24 h-24 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-purple-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>
        <p className="text-gray-400 text-lg font-medium mt-6 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  // Get the role from Clerk user metadata
  const role = user?.unsafeMetadata?.chosenRole;

  // Route to appropriate profile based on role
  if (role === 'artiste' || role === 'artist') {
    return <ArtisteProfile />;
  }

  // Default to regular user profile (listener)
  return <Profile />;
};

export default ProfileRouter;