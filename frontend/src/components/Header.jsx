import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import critiqLogo from '../images/critiq-logo.png';
import notificationIcon from '../images/notificationIcon.png';
import searchIcon from '../images/searchIcon.png';
import menuIcon from '../images/menuIcon2.png';

const Header = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="w-full bg-[#0B0A1F] text-white fixed top-0 left-0 z-40 h-[72px] flex items-center justify-between px-6 md:px-14 py-4">
      
      {/* Mobile Menu Icon */}
      <div className="md:hidden flex items-center">
        <img src={menuIcon} alt="Menu" className="w-6 h-6" />
      </div>

      {/* Logo */}
      <div className="flex items-center gap-2">
        {loading ? (
          <Skeleton
            height={40}
            width={100}
            baseColor="#A259FF"
            highlightColor="#E2CCFF"
            style={{ opacity: 0.2, borderRadius: '8px' }}
          />
        ) : (
          <img
            src={critiqLogo}
            alt="Critiq Logo"
            className={`w-[100px] h-auto object-contain transition-opacity duration-700 ease-in-out ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center justify-center gap-8 text-[16px] font-normal">
        {loading ? (
          <>
            <Skeleton width={80} height={20} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
            <Skeleton width={100} height={20} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
            <Skeleton width={120} height={20} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
            <Skeleton width={100} height={20} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
          </>
        ) : (
          ['TRENDING', 'RECOMMENDED', 'NEW RELEASED', 'TOP CHARTS'].map((item) => (
            <button
              key={item}
              className={`hover:text-purple-400 transition duration-200 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {item}
            </button>
          ))
        )}
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-4 md:gap-6">
        {loading ? (
          <>
            <Skeleton circle width={32} height={32} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
            <Skeleton circle width={32} height={32} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
          </>
        ) : (
          <>
            <img
              src={searchIcon}
              alt="Search"
              className={`w-6 h-6 md:w-8 md:h-8 cursor-pointer transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <img
              src={notificationIcon}
              alt="Notifications"
              className={`w-6 h-6 md:w-8 md:h-8 cursor-pointer transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
