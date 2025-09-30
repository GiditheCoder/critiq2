import React from 'react'

const PasswordUpdated = () => {
  const handleGoToLogin = () => {
    // Add navigation logic here
    console.log('Redirecting to login');
  };

  return (
    <div className="min-h-screen bg-[#0B0A1F] flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 bg-[#A259FF] rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-8">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4">
            Password Updated Successfully!
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Your password has been changed. You can now log in with your new credentials.
          </p>
        </div>

        {/* Go to Login Button */}
        <button
          onClick={handleGoToLogin}
          className="w-full bg-[#A259FF] text-white py-4 px-6 rounded-lg font-semibold text-base sm:text-lg transition-all hover:bg-[#8F45E3] mt-16"
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}

export default PasswordUpdated