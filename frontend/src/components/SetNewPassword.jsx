// import React, { useState } from "react";
// import { useSignIn } from "@clerk/clerk-react";

// const SetNewPassword = () => {
//   const { signIn, setActive } = useSignIn();
//   const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleInputChange = (e, index) => {
//     const value = e.target.value.slice(-1); // only 1 digit
//     const newCode = [...codeArray];
//     newCode[index] = value;
//     setCodeArray(newCode);

//     // Auto-focus next input
//     if (value && index < 5) {
//       const nextInput = document.getElementById(`code-input-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleSetPassword = async () => {
//     const code = codeArray.join(""); // join digits into one string
//     if (!code.trim() || !newPassword.trim()) {
//       alert("Please enter the code and new password");
//       return;
//     }

//     setLoading(true);
//     try {
//       const result = await signIn.attemptFirstFactor({
//         strategy: "reset_password_email_code",
//         code,
//         password: newPassword,
//       });

//       if (result.status === "complete") {
//         await setActive({ session: result.createdSessionId });
//         alert("Password reset successful! You are now signed in.");
//       } else {
//         alert("Something went wrong. Try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Failed to reset password. Check your code and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0B0A1F] flex flex-col items-center justify-center px-6 py-8">
//       <div className="w-full max-w-sm space-y-6">
//         <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-6">
//           Set a New Password
//         </h1>

//         {/* Code input (OTP style) */}
//         <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mb-6 justify-center">
//           {codeArray.map((char, index) => (
//             <input
//               key={index}
//               id={`code-input-${index}`}
//               type="tel"
//               inputMode="numeric"
//               pattern="[0-9]*"
//               value={char}
//               onChange={(e) => handleInputChange(e, index)}
//               maxLength={1}
//               className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white text-lg sm:text-xl text-center rounded-md bg-transparent border border-[#3c3c51] focus:outline-none focus:border-[#A259FF] transition flex-shrink-0"
//             />
//           ))}
//         </div>

//         {/* New password input */}
//         <input
//           type="password"
//           placeholder="New password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           className="w-full px-4 py-4 bg-[#2a2d47] border border-[#3c3c51] rounded-lg text-white placeholder-gray-400"
//         />

//         <button
//           onClick={handleSetPassword}
//           disabled={loading}
//           className="w-full bg-[#A259FF] text-white py-4 rounded-lg"
//         >
//           {loading ? "Setting Password..." : "Set New Password"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SetNewPassword;


import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";

const SetNewPassword = () => {
  const { signIn, setActive } = useSignIn();
  const [codeArray, setCodeArray] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e, index) => {
    const value = e.target.value.slice(-1); // only 1 digit
    const newCode = [...codeArray];
    newCode[index] = value;
    setCodeArray(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (codeArray[index] === "" && index > 0) {
        const prevInput = document.getElementById(`code-input-${index - 1}`);
        if (prevInput) prevInput.focus();
      }

      const newCode = [...codeArray];
      newCode[index] = "";
      setCodeArray(newCode);
    }
  };

  const handleSetPassword = async () => {
    const code = codeArray.join(""); // join digits into one string
    if (!code.trim() || !newPassword.trim()) {
      alert("Please enter the code and new password");
      return;
    }

    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        alert("Password reset successful! You are now signed in.");
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to reset password. Check your code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A1F] flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center mb-6">
          Set a New Password
        </h1>

        {/* Code input (OTP style) */}
        <div className="flex space-x-2 sm:space-x-3 md:space-x-4 mb-6 justify-center">
          {codeArray.map((char, index) => (
            <input
              key={index}
              id={`code-input-${index}`}
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={char}
              onChange={(e) => handleInputChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              maxLength={1}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white text-lg sm:text-xl text-center rounded-md bg-transparent border border-[#3c3c51] focus:outline-none focus:border-[#A259FF] transition flex-shrink-0"
            />
          ))}
        </div>

        {/* New password input */}
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-4 bg-[#2a2d47] border border-[#3c3c51] rounded-lg text-white placeholder-gray-400"
        />

        <button
          onClick={handleSetPassword}
          disabled={loading}
          className="w-full bg-[#A259FF] text-white py-4 rounded-lg"
        >
          {loading ? "Setting Password..." : "Set New Password"}
        </button>
      </div>
    </div>
  );
};

export default SetNewPassword;
