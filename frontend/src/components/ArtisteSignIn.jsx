import React, { useState, useEffect } from 'react';
import { useSignIn, useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import GoogleImg from '../images/google.png';
import lockIcon from '../images/lock.png';
import inquiryImg from '../images/inquiry.png';
import eyeIcon from '../images/eyeIcon.png';
import barLogo from '../images/bar-graph.png';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ArtisteSignIn = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  const { signIn, setActive, isLoaded: signInLoaded } = useSignIn();
  const { signOut } = useClerk();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const { user } = useUser();

   // ✅ Auto-redirect if already signed in
    useEffect(() => {
      if (isSignedIn) {
        // you can also fetch their role here if needed
        navigate('/homePage', { replace: true });
      }
    }, [isSignedIn, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectScreen = () => {
    navigate('/artiste-signup');
  };

  console.log("Signed in?", isSignedIn);

  const handleSignIn = async () => {
    if (!email || !password) {
      navigate('/failed-signin', {
        state: {
          error: 'Missing Fields',
          message: 'Please enter both your email and password.',
        },
      });
      return;
    }
    if (!signInLoaded) return;

    setSigningIn(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
        strategy: 'password',
      });

      let finalAttempt = signInAttempt;
      if (finalAttempt.status === 'needs_first_factor') {
        finalAttempt = await signIn.attemptFirstFactor({
          strategy: 'password',
          password,
        });
      }

      if (finalAttempt.status === 'complete' && finalAttempt.createdSessionId) {
        const res = await fetch(
          'https://critiq-backend-6v3f.onrender.com/api/check-role',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sessionId: finalAttempt.createdSessionId }),
          }
        );

        const data = await res.json();
        const role = data?.role;

        if (role !== 'artiste') {
          navigate('/failed-signin', {
            state: {
              error: 'Not an Artiste Account',
              message:
                'This account does not have artiste access. Please use the correct account.',
            },
          });
          return;
        }

        await setActive({ session: finalAttempt.createdSessionId });
        navigate('/homePage', { replace: true });
      } else {
        navigate('/failed-signin', {
          state: {
            error: 'Invalid Credentials',
            message: 'Wrong email or password. Please try again.',
          },
        });
      }
    } catch (err) {
      console.error('❌ Clerk sign-in error:', err);
      navigate('/failed-signin', {
        state: {
          error: 'Login Failed',
          message: err?.errors?.[0]?.message || 'Wrong details provided.',
        },
      });
    } finally {
      setSigningIn(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (isSignedIn) {
      navigate('/works', { replace: true });
      return;
    }

    if (!signInLoaded) {
      navigate('/failed-signin', {
        state: {
          error: 'System Not Ready',
          message: 'The sign-in system is not ready. Please try again shortly.',
        },
      });
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
      });
    } catch (error) {
      console.error('OAuth error:', error);
      navigate('/failed-signin', {
        state: {
          error: 'Google Sign-In Failed',
          message:
            'Unable to sign in with Google. Please try again or use email.',
        },
      });
    }
  };

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

        {/* Heading */}
        {loading ? (
          <div className="text-center mb-4 sm:mb-6">
            <Skeleton height={24} width={180} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto mb-2 sm:!h-8 sm:!w-52" />
            <Skeleton height={16} width={160} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mx-auto sm:!h-5 sm:!w-56" />
          </div>
        ) : (
          <div className={`text-center mb-4 sm:mb-6 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-lg sm:text-2xl font-semibold text-white mb-1">
              Artiste Sign In
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Welcome back artiste! Enter your details
            </p>
          </div>
        )}

        {/* Email */}
        {loading ? (
          <Skeleton height={36} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-3 sm:!h-11 sm:!mb-4" />
        ) : (
          <div className={`mb-3 sm:mb-4 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <label className="block text-xs sm:text-sm text-white mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-[#A259FF] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md">
              <img src={inquiryImg} alt="email icon" className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 opacity-70" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="bg-transparent w-full text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Password */}
        {loading ? (
          <Skeleton height={36} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-3 sm:!h-11 sm:!mb-4" />
        ) : (
          <div className={`mb-2 sm:mb-2 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <label className="block text-xs sm:text-sm text-white mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-[#A259FF] px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md">
              <img src={lockIcon} alt="lock" className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 opacity-70" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="bg-transparent w-full text-white text-sm sm:text-base placeholder-gray-400 focus:outline-none"
              />
              <img
                src={eyeIcon}
                alt="eye"
                onClick={() => setShowPassword((prev) => !prev)}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-70 cursor-pointer"
              />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
              12 characters min. Use upper case, lower case, number and symbol
            </p>
          </div>
        )}

        {/* Remember Me / Forgot Password */}
        {!loading && (
          <div className={`flex justify-between items-center text-xs sm:text-sm text-gray-400 mb-4 sm:mb-6 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <label className="flex items-center gap-1.5 sm:gap-2">
              <input type="checkbox" className="accent-[#A259FF] w-3 h-3 sm:w-4 sm:h-4" />
              Remember me
            </label>
            <span className="cursor-pointer hover:underline text-white">Forgot Password</span>
          </div>
        )}

        {/* Sign In Button */}
        {loading ? (
          <Skeleton height={36} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} className="mb-3 sm:!h-12 sm:!mb-4" />
        ) : (
          <button
            onClick={handleSignIn}
            disabled={signingIn}
            className={`w-full bg-[#A259FF] text-white py-2.5 sm:py-3 rounded-md text-sm sm:text-base font-semibold hover:bg-[#9446f5] disabled:opacity-60 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
          >
            {signingIn ? 'Signing in...' : 'Sign in'}
          </button>
        )}

        {/* Sign Up Link */}
        {!loading && (
          <p className={`text-xs sm:text-sm text-gray-400 text-center mt-4 sm:mt-6 transition-opacity duration-700 ease-in-out ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Don't have an artiste account?{' '}
            <span
              onClick={handleSelectScreen}
              className="text-white font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        )}

        {/* Fullscreen Loader for Sign In Process */}
        {signingIn && (
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

export default ArtisteSignIn;