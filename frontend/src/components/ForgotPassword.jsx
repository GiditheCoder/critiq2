import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { signIn } = useSignIn();
  const navigate = useNavigate(); // 👈 for navigation
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!email.trim()) {
      alert("Please enter your email address");
      return;
    }

    setLoading(true);
    try {
      await signIn.create({
        identifier: email,
        strategy: "reset_password_email_code",
      });

      // ✅ On success, go to SetNewPassword screen
      navigate("/set-new-password", { state: { email } });
    } catch (err) {
      console.error(err);
      alert("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A1F] flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl sm:text-3xl font-bold mb-3">
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Enter your email address to receive a password reset code
          </p>
        </div>
        <div className="space-y-6">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-4 bg-transparent border border-gray-600 rounded-lg text-white placeholder-gray-400"
          />
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full bg-[#A259FF] text-white py-4 rounded-lg"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
