import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import homeIcon from '../images/homeIcon.png';
import profileIcon from '../images/profileIcon.png';
import loveIcon from '../images/loveIcon.png';
import headsetIcon from '../images/headsetIcon.png';
import artisteIcon from '../images/artisteIcon.png';
import downloadIcon from '../images/downloadIcon.png';
import topVote from '../images/topVoteIcon.png';
import musicIcon from '../images/musicIcon.png';
import settingsIcon from '../images/settingsIcon.png';
import voteIcon from '../images/voteIcon.png';
import { useNavigate } from 'react-router-dom';

const Modal = ({ className = '' }) => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

const icons = [
  { alt: 'Home', src: homeIcon, name: 'Home', path: '/secondhome' },
  { alt: 'Profile', src: profileIcon, name: 'Profile', path: '/profile' },
  { alt: 'Love', src: loveIcon, name: 'Favourite', path: '/favourite' },
  { alt: 'Headset', src: headsetIcon, name: 'Stream', path: '/stream' },
  { alt: 'Artiste', src: artisteIcon, name: 'Artiste', path: '/artiste' },
  { alt: 'Download', src: downloadIcon, name: 'Download', path: '/download' },
  { alt: 'Top Vote', src: topVote, name: 'Vote', path: '/vote' },
  { alt: 'Vote', src: voteIcon, name: 'Chart', path: '/chart' },
  { alt: 'Music', src: musicIcon, name: 'Music', path: '/music' },
  { alt: 'Settings', src: settingsIcon, name: 'Settings', path: '/settings' },
];


  return (
    <div className={`h-screen w-20 bg-[#151530] flex flex-col justify-between py-9 items-center fixed top-18 left-0 z-50 ${className}`}>
      <div className="flex flex-col space-y-4">
        {loading
          ? Array(10)
              .fill()
              .map((_, index) => (
                <Skeleton
                  key={index}
                  width={48}
                  height={48}
                  baseColor="#A259FF"
                  highlightColor="#E2CCFF"
                  style={{ borderRadius: '8px', opacity: 0.2 }}
                />
              ))
          : 
          icons.map((icon, index) => (
              <div
                key={index}
                 onClick={() => navigate(icon.path)}
                className={`w-17 h-17  flex flex-col items-center justify-center space-y-2 rounded-md hover:bg-[#A259FF]  duration-200 cursor-pointer transition-opacity ${
                  loaded ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img src={icon.src} alt={icon.alt} className="w-6 h-6" />
                <h1 className='text-white '> {icon.name} </h1>
              </div>
            ))}


      </div>
    </div>
  );
};

export default Modal;
