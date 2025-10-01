import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { useSignUp , useClerk } from "@clerk/clerk-react";
import critiqLogo from '../images/critiq-logo.png';
import SignupImg from '../images/signup.png';
import GoogleImg from '../images/google.png';
import lockIcon from '../images/lock.png';
import inquiryImg from '../images/inquiry.png';
import eyeIcon from '../images/eyeIcon.png';
import VerifyEmailScreen from './VerifyEmailScreen';
import barLogo from '../images/bar-graph.png';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signUp, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const { openSignUp } = useClerk();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location]);

  const handleSigninScreen = () => {
     setIsLoading(true);
    setTimeout(() => {
      navigate('/signin');
    }, 1000);
  };

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      alert("Error: Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      alert("Error: Password must be at least 6 characters");
      return;
    }
    if (!isLoaded) return;

    setSigningUp(true);

    try {
      const chosenRole = "listener";
      await signUp.create({
        emailAddress: email,
        password,
        username,
        unsafeMetadata: { chosenRole },
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      console.error("Signup error:", JSON.stringify(err, null, 2));
      
      const errorCode = err.errors?.[0]?.code;
      
      switch (errorCode) {
        case 'form_identifier_exists':
          navigate('/failed-signup', { 
            state: { 
              error: 'Email Already Exists',
              message: 'The email address you entered is already associated with an account.'
            }
          });
          break;
          
        case 'form_username_exists':
          navigate('/failed-signup', { 
            state: { 
              error: 'Username Taken',
              message: 'This username is already taken. Please try a different one.'
            }
          });
          break;
          
        case 'form_password_pwned':
          navigate('/failed-signup', { 
            state: { 
              error: 'Weak Password',
              message: 'This password has been found in a data breach. Please choose a stronger password.'
            }
          });
          break;
          
        case 'form_password_too_common':
          navigate('/failed-signup', { 
            state: { 
              error: 'Password Too Common',
              message: 'This password is too common. Please choose a more unique password.'
            }
          });
          break;
          
        case 'form_password_length_too_short':
          navigate('/failed-signup', { 
            state: { 
              error: 'Password Too Short',
              message: 'Password must be at least 8 characters long.'
            }
          });
          break;
          
        case 'form_identifier_invalid':
          navigate('/failed-signup', { 
            state: { 
              error: 'Invalid Email',
              message: 'Please enter a valid email address.'
            }
          });
          break;
          
        default:
          navigate('/failed-signup', { 
            state: { 
              error: 'Sign Up Failed',
              message: err.errors?.[0]?.message || 'Failed to create account. Please try again.'
            }
          });
      }
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await openSignUp({
        afterSignUpUrl: "/verifiedPage",
        afterSignInUrl: "/",
        signInFallbackRedirectUrl: "/",
        strategy: "oauth_google",
      });
    } catch (err) {
      console.error("Google signup failed:", err);
      navigate('/failed-signup', { 
        state: { 
          error: 'Google sign up failed',
          message: 'Unable to sign up with Google. Please try again or use email signup.'
        }
      });
    }
  };

  if (pendingVerification) return <VerifyEmailScreen email={email} />;

  return (
    <div className="min-h-screen bg-[#0B0A1F] flex items-center justify-center px-4 py-8 font-sans">
      <div className="w-full max-w-[280px] sm:max-w-md">
        {/* Logo */}
        <div className="mb-2 flex justify-center">
          <div className="pt-4 sm:pt-6 lg:pt-8 pb-6 sm:pb-12 lg:pb-16">
            {loading ? (
              <div className="flex items-baseline gap-2 sm:gap-3">
                <Skeleton
                  height={24}
                  width={48}
                  baseColor="#A259FF"
                  highlightColor="#E2CCFF"
                  style={{ opacity: 0.2 }}
                  className="sm:!h-10 sm:!w-20 lg:!h-12 lg:!w-24"
                />
                <Skeleton
                  height={24}
                  width={60}
                  baseColor="#A259FF"
                  highlightColor="#E2CCFF"
                  style={{ opacity: 0.2 }}
                  className="sm:!h-10 sm:!w-24 lg:!h-12 lg:!w-28"
                />
              </div>
            ) : (
              <div className="flex items-baseline gap-2 sm:gap-3">
                <img
                  src={barLogo}
                  alt="Critiq Logo"
                  className={`w-6 h-auto object-contain transition-opacity duration-700 ease-in-out filter brightness-0 invert sm:w-5 lg:w-10 ${
                    loaded ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <h1 className={`text-white text-lg font-bold transition-opacity duration-700 ease-in-out sm:text-2xl lg:text-4xl ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}>
                  critiq
                </h1>
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        {loading ? (
          <Skeleton height={24} width={200} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto sm:!h-8 sm:!w-64" />
        ) : (
          <h2 className={`text-lg font-semibold text-white text-center transition-opacity duration-700 ease-in-out sm:text-2xl ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Create an account
          </h2>
        )}

        {loading ? (
          <Skeleton height={16} width={240} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto my-3 sm:!h-5 sm:!w-80 sm:!my-4" />
        ) : (
          <p className={`text-sm text-gray-400 text-center mb-4 transition-opacity duration-700 ease-in-out sm:text-base sm:mb-6 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Enter your details to create an account
          </p>
        )}

        {/* Email */}
        {loading ? (
          <Skeleton height={36} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-3 sm:!h-11 sm:!mb-4" />
        ) : (
          <div className={`mb-3 sm:mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <label className="block text-xs sm:text-sm text-white mb-1">Email Address <span className="text-red-500">*</span></label>
            <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2">
              <img src={inquiryImg} alt="inquiry" className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 opacity-70" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent w-full text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Username */}
        {loading ? (
          <Skeleton height={36} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-3 sm:!h-11 sm:!mb-4" />
        ) : (
          <div className={`mb-3 sm:mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <label className="block text-xs sm:text-sm text-white mb-1">Username <span className="text-red-500">*</span></label>
            <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2">
              <input
                type="text"
                placeholder="Enter your username"
                className="bg-transparent w-full text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Password */}
        {loading ? (
          <Skeleton height={36} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-3 sm:!h-11 sm:!mb-4" />
        ) : (
          <div className={`mb-3 sm:mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <label className="block text-xs sm:text-sm text-white mb-1">Password <span className="text-red-500">*</span></label>
            <div className="flex items-center bg-transparent border border-[#a7a7a7] rounded-md px-2.5 py-1.5 sm:px-3 sm:py-2">
              <img src={lockIcon} alt="lock" className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 opacity-70" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                className="bg-transparent w-full text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={eyeIcon}
                alt="Toggle Password"
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-2 opacity-70 cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>
          </div>
        )}

        {/* Sign Up Button */}
        {loading ? (
          <Skeleton height={36} width="100%" baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="sm:!h-12" />
        ) : (
          <button
            onClick={handleSignUp}
            disabled={signingUp || !isLoaded}
            className={`w-full bg-[#A259FF] text-white py-2.5 sm:py-3 rounded-3xl text-sm sm:text-base font-semibold hover:bg-[#9446f5] transition disabled:opacity-50 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          >
            {signingUp ? "Signing up..." : "Sign up"}
          </button>
        )}

        {/* Sign In Link */}
        {!loading && (
          <p className="text-xs sm:text-sm text-gray-400 text-center mt-4 sm:mt-6">
            Already have an account?{' '}
            <span className="text-white cursor-pointer font-medium" onClick={handleSigninScreen}>
              Sign in
            </span>
          </p>
        )}

        {/* Fullscreen Loading Overlay for navigation */}
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <svg
              className="animate-spin h-10 w-10 text-[#A259FF] sm:h-16 sm:w-16"
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

        {/* Fullscreen Loader */}
        {signingUp && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <svg className="animate-spin h-16 w-16 text-[#A259FF]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;