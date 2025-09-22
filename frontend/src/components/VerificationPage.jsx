import React, { useEffect, useState } from 'react';
import critiqLogo from '../images/critiq-logo.png';
import success from '../images/success.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const VerificationPage = () => {
  const navigate = useNavigate();
  const [successfulVerification, setSuccessfulVerification] = useState(false);
  const [loading, setLoading] = useState(false);
   const location = useLocation();
  const role = location.state?.role || "listener"; 
  

  useEffect(() => {
    // Simulate verification success after mount
    setLoading(true);

    // Simulate delay (e.g., email confirmation, etc.)
    const timer = setTimeout(() => {
      setSuccessfulVerification(true);
      setLoading(false);

      // Redirect to homePage after short delay
     
    setTimeout(() => {
        if (role === "artiste") {
          navigate("/artist-route");
        } else {
          navigate("/user-details");
        }
      }, 2000);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate,role]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0B0B0F] text-white px-4">
      <div className="flex flex-col items-center space-y-6">
        <div className="mb-2 flex justify-center">
          <img src={critiqLogo} alt="Critiq Logo" className="h-40 w-40" />
        </div>

        <h1 className="text-2xl font-semibold">Create a new Account</h1>

        <div className="bg-[#15151E] border border-gray-700 rounded-lg px-16 py-10 flex flex-col items-center text-center w-full h-full">
          {loading ? (
            <p className="text-gray-400 animate-pulse">Verifying your account...</p>
          ) : successfulVerification ? (
            <>
              <img src={success} alt="Success" className="w-14 h-14 mb-4" />
              <h2 className="text-green-500 font-semibold text-lg mb-2">
                Account created successfully
              </h2>
              <p className="text-gray-400 text-sm">
                Redirecting you to your dashboard...
              </p>
            </>
          ) : null}
        </div>

        <button
          onClick={() => navigate('/')}
          className="text-[#A259FF] text-sm hover:underline mt-6"
        >
          ← Back to Login
        </button>
      </div>
    </div>
  );
};

export default VerificationPage;

