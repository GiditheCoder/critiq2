import React, { useState, useEffect} from 'react';
import { useUser } from '@clerk/clerk-react';

const Profile = () => {
    const { user } = useUser();
   const role = user?.unsafeMetadata?.chosenRole;

   
  return (
   <div className="min-h-screen bg-[#0B0A1F] flex items-center justify-center">
      <p className="text-gray-400 text-lg font-medium">
       User Profile
      </p>
    </div>
  )
}

export default Profile
