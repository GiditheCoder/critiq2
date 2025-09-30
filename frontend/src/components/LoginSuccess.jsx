import React from 'react'

const LoginSuccess = () => {
  const handleGoToHome = () => {
    // Add navigation logic here
    console.log('Redirecting to home');
    redirect('/');
  };

  return (
    <div className="min-h-screen bg-[#0B0A1F] flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 border-2 border-[#A259FF] rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-[#A259FF]" 
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
        <div className="mb-12">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-4">
            Login Successful!
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Welcome back to critiq. You're all set.
          </p>
        </div>

        {/* Go to Home Button */}
        <button
          onClick={handleGoToHome}
          className="w-full bg-[#A259FF] text-white py-4 px-6 rounded-lg font-semibold text-base sm:text-lg transition-all hover:bg-[#8F45E3]"
        >
          Go to Home
        </button>
      </div>
    </div>
  )
}

export default LoginSuccess