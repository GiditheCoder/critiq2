import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FailedSignInScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { error, message } = location.state || {
    error: 'Login Failed',
    message: 'Incorrect email or password.',
  };

  const handleTryAgain = () => {
    navigate('/signin');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="min-h-screen bg-[#0B0A1F] text-white flex flex-col items-center justify-center px-6">
      {/* Error Icon */}
      <div className="mb-8">
        <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-2">{error}</h2>
        <p className="text-gray-400 text-lg">{message}</p>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={handleTryAgain}
          className="w-full bg-[#A259FF] hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-colors duration-200 shadow-lg"
        >
          Try Again
        </button>

        <button
          onClick={handleForgotPassword}
          className="w-full bg-transparent text-[#A259FF] font-semibold py-4 px-8 text-lg hover:text-purple-400 transition-colors duration-200"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default FailedSignInScreen;
