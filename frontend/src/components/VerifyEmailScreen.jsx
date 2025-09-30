// import React, { useState } from 'react';
// import critiqLogo from '../images/critiq-logo.png';
// import { useSignUp } from "@clerk/clerk-react";
// import { useNavigate } from 'react-router-dom';

// const VerifyEmailScreen = ({ email }) => {
//   const { isLoaded, signUp, setActive } = useSignUp();
//   const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
//   const [loading, setLoading] = useState(false);
//   const [isLoading, setIsLoading] = useState(false); // For full screen loader

//   const navigate = useNavigate();

//   const handleVerification = async () => {
//     if (!isLoaded) return;
//     setLoading(true);
//     setIsLoading(true);

//     const code = codeArray.join("");

//     try {
//       const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

//       if (signUpAttempt.status === "complete") {
//         await setActive({ session: signUpAttempt.createdSessionId });

//         // ✅ get role from metadata and navigate
//         const userRole = signUpAttempt.unsafeMetadata?.chosenRole || "listener";
//         navigate("/verifiedPage", { state: { role: userRole } });
//       } else {
//         window.alert("Verification failed. Please try again.");
//         console.error(JSON.stringify(signUpAttempt, null, 2));
//       }
//     } catch (err) {
//       window.alert(err.errors?.[0]?.message || "Verification failed");
//       console.error(JSON.stringify(err, null, 2));
//     } finally {
//       setLoading(false);
//       setIsLoading(false);
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
//     <div className="min-h-screen bg-[#0b0b12] flex flex-col items-center justify-center px-4 py-8 relative">
//       <div className="mb-4 sm:mb-6 flex justify-center">
//         <img 
//           src={critiqLogo} 
//           alt="Critiq Logo" 
//           className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40" 
//         />
//       </div>

//       <h2 className="text-white text-xl sm:text-2xl font-semibold mb-2 text-center">
//         Confirm Password
//       </h2>
//       <p className="text-gray-400 text-sm mb-6 text-center max-w-sm">
//         We've sent a verification code to {email}
//       </p>

//       <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mb-6 w-full max-w-sm justify-center">
//         {codeArray.map((char, index) => (
//           <input
//             key={index}
//             id={`code-input-${index}`}
//             type="tel"
//              inputMode="numeric" 
//             pattern="[0-9]*" 
//             value={char}
//             onChange={(e) => handleInputChange(e, index)}
//             maxLength={1}
//             className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white text-lg sm:text-xl text-center rounded-md bg-transparent border border-[#3c3c51] focus:outline-none focus:border-[#A259FF] transition flex-shrink-0"
//           />
//         ))}
//       </div>

//       <p className="text-gray-400 text-sm mb-4 text-center max-w-sm px-2">
//         Didn't receive OTP code?{' '}
//         <button className="text-white font-semibold underline hover:text-[#A259FF] transition">
//           Resend Code
//         </button>
//       </p>
// <button
//         onClick={handleVerification}
//         disabled={loading}
//         className="bg-[#A259FF] text-white py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 rounded-full text-base sm:text-lg md:text-[20px] font-semibold transition hover:bg-[#8F45E3] mb-6 sm:mb-8 md:mb-10 w-full max-w-xs sm:max-w-sm"
//       >
//         {loading ? "Verifying..." : "Verify and Continue"}
//       </button>

//       {/* Fullscreen Loading Overlay */}
//       {isLoading && (
//         <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
//           <svg
//             className="animate-spin h-12 w-12 sm:h-16 sm:w-16 text-[#A259FF]"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             ></circle>
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//             ></path>
//           </svg>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VerifyEmailScreen;


import React, { useState } from 'react';
import critiqLogo from '../images/critiq-logo.png';
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';

const VerifyEmailScreen = ({ email }) => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleVerification = async () => {
    if (!isLoaded) return;
    const code = codeArray.join("");
    if (code.length < 6) {
      window.alert("Please enter the full 6-digit code");
      return;
    }

    setLoading(true);
    setIsLoading(true);
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({ code });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        const userRole = signUpAttempt.unsafeMetadata?.chosenRole || "listener";
        navigate("/verifiedPage", { state: { role: userRole } });
      } else {
        window.alert("Verification failed. Please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      window.alert(err?.errors?.[0]?.message || "Verification failed");
      console.error(err);
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, index) => {
    const raw = e.target.value || "";
    // keep only digits and take last char (in case of paste)
    const digit = raw.replace(/\D/g, "").slice(-1);
    const newCode = [...codeArray];
    newCode[index] = digit || "";
    setCodeArray(newCode);

    if (digit && index < codeArray.length - 1) {
      const next = document.getElementById(`code-input-${index + 1}`);
      next?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    const key = e.key;

    if (key === "Backspace") {
      e.preventDefault();
      const newCode = [...codeArray];
      if (newCode[index]) {
        // if current has value, clear it
        newCode[index] = "";
        setCodeArray(newCode);
        // keep focus on current
        const cur = document.getElementById(`code-input-${index}`);
        cur?.focus();
      } else if (index > 0) {
        // move back and clear previous
        const prevIndex = index - 1;
        const prev = document.getElementById(`code-input-${prevIndex}`);
        if (prev) {
          const prevCode = [...newCode];
          prevCode[prevIndex] = "";
          setCodeArray(prevCode);
          prev.focus();
        }
      }
    } else if (key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      document.getElementById(`code-input-${index - 1}`)?.focus();
    } else if (key === "ArrowRight" && index < codeArray.length - 1) {
      e.preventDefault();
      document.getElementById(`code-input-${index + 1}`)?.focus();
    }
  };

  const handlePaste = (e, index) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text") || "";
    const digits = paste.replace(/\D/g, "").split("");
    if (!digits.length) return;

    const newCode = [...codeArray];
    for (let i = 0; i < digits.length && index + i < newCode.length; i++) {
      newCode[index + i] = digits[i];
    }
    setCodeArray(newCode);

    // focus last filled digit
    const lastFilled = Math.min(index + digits.length - 1, newCode.length - 1);
    document.getElementById(`code-input-${lastFilled}`)?.focus();
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] flex flex-col items-center justify-center px-4 py-8 relative">
      <div className="mb-4 sm:mb-6 flex justify-center">
        <img src={critiqLogo} alt="Critiq Logo" className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40" />
      </div>

      <h2 className="text-white text-xl sm:text-2xl font-semibold mb-2 text-center">Confirm Password</h2>
      <p className="text-gray-400 text-sm mb-6 text-center max-w-sm">We've sent a verification code to {email}</p>

      <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mb-6 w-full max-w-sm justify-center">
        {codeArray.map((char, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            value={char}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            maxLength={1}
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white text-lg sm:text-xl text-center rounded-md bg-transparent border border-[#3c3c51] focus:outline-none focus:border-[#A259FF] transition flex-shrink-0"
            aria-label={`verification-code-${index + 1}`}
          />
        ))}
      </div>

      <p className="text-gray-400 text-sm mb-4 text-center max-w-sm px-2">
        Didn't receive OTP code?{' '}
        <button className="text-white font-semibold underline hover:text-[#A259FF] transition">
          Resend Code
        </button>
      </p>

      <button
        onClick={handleVerification}
        disabled={loading}
        className="bg-[#A259FF] text-white py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 rounded-full text-base sm:text-lg md:text-[20px] font-semibold transition hover:bg-[#8F45E3] mb-6 sm:mb-8 md:mb-10 w-full max-w-xs sm:max-w-sm"
      >
        {loading ? "Verifying..." : "Verify and Continue"}
      </button>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <svg className="animate-spin h-12 w-12 sm:h-16 sm:w-16 text-[#A259FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default VerifyEmailScreen;
