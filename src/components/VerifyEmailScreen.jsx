// import React from 'react';
// import critiqLogo from '../images/critiq-logo.png';
// import { useSignUp } from "@clerk/clerk-react";
// import { useState } from 'react';

// const VerifyEmailScreen = ({email}) => {

//    const { isLoaded, signUp, setActive } = useSignUp();
//   const [code, setCode] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleVerification = async () => { 
//     if (!isLoaded) return;
//     setLoading(true);


//     try {
//           const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });
    
//           if (signUpAttempt.status === "complete") {
//             await setActive({ session: signUpAttempt.createdSessionId });
//           } else {
//             window.alert("Verification failed. Please try again.");
//             console.error(JSON.stringify(signUpAttempt, null, 2));

//           }
//         } catch (err) {
//           window.alert(err.errors?.[0]?.message || "Verification failed");
//            console.error(JSON.stringify(err, null, 2));
//         } finally {
//           setLoading(false);
//         }

//   }


//   return (
//     <div className="min-h-screen bg-[#0b0b12] flex flex-col items-center justify-center px-4">
//        <div className="mb-2 flex justify-center">
//                   <img src={critiqLogo} alt="Critiq Logo" className="h-40 w-40" />
//                 </div>

//       <h2 className="text-white text-2xl font-semibold mb-2">Confirm Password </h2>
//       <p className="text-gray-400 text-sm mb-6">
//        We&apos;ve sent a verification code to {email}
//       </p>

//       <div className="flex space-x-4 mb-6">
//         {[...Array(6)].map((_, index) => (
//           <input
//             key={index}
//             type="text"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             maxLength={1}
//             className="w-22 h-22 text-white text-xl text-center rounded-md bg-transparent border border-[#3c3c51] focus:outline-none focus:border-[#A259FF] transition"
//           />
//         ))}
//       </div>

//       <p className="text-gray-400 text-sm mb-4">
//         Didn’t receive OTP code?{' '}
//         <button className="text-white font-semibold underline hover:text-[#A259FF] transition">
//           Resend Code
//         </button>
//       </p>

//       <button 
//        onPress={handleVerification}
//        disabled={loading}
//       className="bg-[#A259FF] text-white py-5 px-10 rounded-full text-[20px] font-semibold transition hover:bg-[#8F45E3] mb-10">
//         {loading ? "Verifying" : "  Verify and Continue"}
//       </button>

//       {/* Step indicator */}
      
//     </div>
//   );
// };

// export default VerifyEmailScreen;



// import React, { useState } from 'react';
// import critiqLogo from '../images/critiq-logo.png';
// import { useSignUp } from "@clerk/clerk-react";

// const VerifyEmailScreen = ({ email }) => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);

//   const handleVerification = async () => {
//     if (!isLoaded) return;
//     setLoading(true);

//     const code = codeArray.join("");

//     try {
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

//       if (signUpAttempt.status === "complete") {
//         await setActive({ session: signUpAttempt.createdSessionId });
//       } else {
//         window.alert("Verification failed. Please try again.");
//         console.error(JSON.stringify(signUpAttempt, null, 2));
//       }
//     } catch (err) {
//       window.alert(err.errors?.[0]?.message || "Verification failed");
//       console.error(JSON.stringify(err, null, 2));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleInputChange = (e, index) => {
//     const value = e.target.value.slice(-1); // Only allow 1 character
//     const newCode = [...codeArray];
//     newCode[index] = value;
//     setCodeArray(newCode);

//     // Move focus to next input if value is entered
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`code-input-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0b0b12] flex flex-col items-center justify-center px-4">
//       <div className="mb-2 flex justify-center">
//         <img src={critiqLogo} alt="Critiq Logo" className="h-40 w-40" />
//       </div>

//       <h2 className="text-white text-2xl font-semibold mb-2">Confirm Password</h2>
//       <p className="text-gray-400 text-sm mb-6">
//         We've sent a verification code to {email}
//       </p>

//       <div className="flex space-x-4 mb-6">
//         {codeArray.map((char, index) => (
//           <input
//             key={index}
//             id={`code-input-${index}`}
//             type="text"
//             value={char}
//             onChange={(e) => handleInputChange(e, index)}
//             maxLength={1}
//             className="w-14 h-14 text-white text-xl text-center rounded-md bg-transparent border border-[#3c3c51] focus:outline-none focus:border-[#A259FF] transition"
//           />
//         ))}
//       </div>

//       <p className="text-gray-400 text-sm mb-4">
//         Didn’t receive OTP code?{' '}
//         <button className="text-white font-semibold underline hover:text-[#A259FF] transition">
//           Resend Code
//         </button>
//       </p>

//       <button
//         onClick={handleVerification}
//         disabled={loading}
//         className="bg-[#A259FF] text-white py-5 px-10 rounded-full text-[20px] font-semibold transition hover:bg-[#8F45E3] mb-10"
//       >
//         {loading ? "Verifying..." : "Verify and Continue"}
//       </button>
//     </div>
//   );
// };

// export default VerifyEmailScreen;
import React, { useState, useEffect } from 'react';
import critiqLogo from '../images/critiq-logo.png';
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const VerifyEmailScreen = ({ email }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For full screen loader

  const navigate = useNavigate();

  // Navigate when verification is complete
  useEffect(() => {
    if (pendingVerification) {
      navigate('/verifiedPage');
    }
  }, [pendingVerification, navigate]);

  const handleVerification = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setIsLoading(true);

    const code = codeArray.join("");

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setPendingVerification(true); // Trigger navigation
      } else {
        window.alert("Verification failed. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      window.alert(err.errors?.[0]?.message || "Verification failed");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value.slice(-1); // Only allow 1 character
    const newCode = [...codeArray];
    newCode[index] = value;
    setCodeArray(newCode);

    // Move focus to next input if value is entered
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] flex flex-col items-center justify-center px-4 relative">
      <div className="mb-2 flex justify-center">
        <img src={critiqLogo} alt="Critiq Logo" className="h-40 w-40" />
      </div>

      <h2 className="text-white text-2xl font-semibold mb-2">Confirm Password</h2>
      <p className="text-gray-400 text-sm mb-6">
        We've sent a verification code to {email}
      </p>

      <div className="flex space-x-4 mb-6">
        {codeArray.map((char, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            value={char}
            onChange={(e) => handleInputChange(e, index)}
            maxLength={1}
            className="w-14 h-14 text-white text-xl text-center rounded-md bg-transparent border border-[#3c3c51] focus:outline-none focus:border-[#A259FF] transition"
          />
        ))}
      </div>

      <p className="text-gray-400 text-sm mb-4">
        Didn’t receive OTP code?{' '}
        <button className="text-white font-semibold underline hover:text-[#A259FF] transition">
          Resend Code
        </button>
      </p>

      <button
        onClick={handleVerification}
        disabled={loading}
        className="bg-[#A259FF] text-white py-5 px-10 rounded-full text-[20px] font-semibold transition hover:bg-[#8F45E3] mb-10"
      >
        {loading ? "Verifying..." : "Verify and Continue"}
      </button>

      {/* Fullscreen Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-16 w-16 text-[#A259FF]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailScreen;
