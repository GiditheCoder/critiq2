// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const FailedSignUpScreen = () => {
//   const navigate = useNavigate();

//   const handleTryAgain = () => {
//     navigate('/signup');
//   };

//   const handleContactSupport = () => {
//     // You can implement contact support logic here
//     // For now, just navigate to a support page or show contact info
//     window.open('mailto:support@critiq.com', '_blank');
//   };

//   return (
//     <div className="min-h-screen bg-[#0B0A1F] flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-md text-center">
//         {/* Error Icon */}
//         <div className="mb-8 flex justify-center">
//           <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
//             <svg
//               className="w-8 h-8 text-red-500"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 18.5c-.77.833.192 2.5 1.732 2.5z"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Title */}
//         <h1 className="text-2xl font-bold text-white mb-4">
//           Sign Up Failed
//         </h1>

//         {/* Message */}
//         <p className="text-gray-400 text-base mb-8 leading-relaxed">
//           The email address you entered is already associated with an account.
//         </p>

//         {/* Try Again Button */}
//         <button
//           onClick={handleTryAgain}
//           className="w-full bg-[#A259FF] text-white py-4 px-6 rounded-full font-semibold text-base hover:bg-[#9446f5] transition-colors duration-200 mb-6"
//         >
//           Try Again
//         </button>

//         {/* Contact Support Link */}
//         <p className="text-sm text-gray-500">
//           Having trouble?{' '}
//           <button
//             onClick={handleContactSupport}
//             className="text-[#A259FF] hover:text-[#9446f5] transition-colors duration-200 underline"
//           >
//             Contact Support
//           </button>
//         </p>

//         {/* Terms and Privacy */}
//         <div className="mt-12 pt-8 border-t border-gray-800">
//           <p className="text-xs text-gray-500 leading-relaxed">
//             By continuing, you agree to our{' '}
//             <span className="text-[#A259FF] cursor-pointer hover:underline">
//               Terms of Service
//             </span>{' '}
//             and{' '}
//             <span className="text-[#A259FF] cursor-pointer hover:underline">
//               Privacy Policy
//             </span>
//             .
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FailedSignUpScreen;



import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const FailedSignUpScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get error data from navigation state
  const errorData = location.state || {};
  const errorTitle = errorData.error || 'Sign Up Failed';
  const errorMessage = errorData.message || 'The email address you entered is already associated with an account.';

  const handleTryAgain = () => {
    navigate('/signup');
  };

  const handleContactSupport = () => {
    // You can implement contact support logic here
    // For now, just navigate to a support page or show contact info
    window.open('mailto:support@critiq.com', '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0B0A1F] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.348 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-4">
          {errorTitle}
        </h1>

        {/* Message */}
        <p className="text-gray-400 text-base mb-8 leading-relaxed">
          {errorMessage}
        </p>

        {/* Try Again Button */}
        <button
          onClick={handleTryAgain}
          className="w-full bg-[#A259FF] text-white py-4 px-6 rounded-full font-semibold text-base hover:bg-[#9446f5] transition-colors duration-200 mb-6"
        >
          Try Again
        </button>

        {/* Contact Support Link */}
        <p className="text-sm text-gray-500">
          Having trouble?{' '}
          <button
            onClick={handleContactSupport}
            className="text-[#A259FF] hover:text-[#9446f5] transition-colors duration-200 underline"
          >
            Contact Support
          </button>
        </p>

        {/* Terms and Privacy */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-xs text-gray-500 leading-relaxed">
            By continuing, you agree to our{' '}
            <span className="text-[#A259FF] cursor-pointer hover:underline">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-[#A259FF] cursor-pointer hover:underline">
              Privacy Policy
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default FailedSignUpScreen;