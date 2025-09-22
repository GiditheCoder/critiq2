import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import faveImg from '../images/fave.png';
import folaImg from '../images/fola.png';
import ruger from '../images/ruger.png';
import asaIcon from '../images/asa.png';
import chikeImg from '../images/chike.png';
import olamideIcon from '../images/olamide.png';
import forwardIcon from '../images/forwadIcon.png';
import backwarIcon from '../images/backIcon.png';

const FeaturedArtiste = () => {
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const artists = [
    { name: 'Fave', image: faveImg },
    { name: 'Fola', image: folaImg },
    { name: 'Ruger', image: ruger },
    { name: 'Asa', image: asaIcon },
    { name: 'Chike', image: chikeImg },
    { name: 'Olamide', image: olamideIcon },
    { name: 'Olamide', image: olamideIcon },
  ];

  return (
    <div className="bg-[#0F0F1A] py-6 px-4 w-full">
      {/* Heading */}
      {loading ? (
        <div className="px-4 sm:px-10 mb-4">
          <Skeleton
            height={40}
            width={240}
            baseColor="#A259FF"
            highlightColor="#E2CCFF"
            style={{ opacity: 0.2 }}
          />
        </div>
      ) : (
        <div
          className={`flex items-center justify-between px-4 sm:px-10 mb-4 transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-white text-[22px] sm:text-[26px] md:text-[32px] font-bold">
            Featured Artists
          </h2>

          <div className="hidden sm:flex items-center gap-2">
            <div className="bg-[#1A1A2E] p-2 rounded-full hover:bg-[#292942] cursor-pointer">
              <img src={backwarIcon} alt="Back" className="w-5 h-5" />
            </div>
            <div className="bg-[#1A1A2E] p-2 rounded-full hover:bg-[#292942] cursor-pointer">
              <img src={forwardIcon} alt="Forward" className="w-5 h-5" />
            </div>
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="relative flex items-center">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4 sm:px-10">
          {(loading ? 
          Array(7).
          fill({}) : artists)
          .map((artist, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-between transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              } 
              min-w-[calc(100%/3)] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[200px]`}
            >
              <div className="overflow-hidden rounded-lg w-[90%] sm:w-[180px] md:w-[200px] lg:w-[200px]">
                {loading ? (
                  <Skeleton
                    height={150}
                    width={250}
                    baseColor="#A259FF"
                    highlightColor="#E2CCFF"
                    style={{ borderRadius: '12px', opacity: 0.2 }}
                  />
                ) : (
                  <img
                    src={artist.image}
                    alt={artist.name}
                    // w-full removed 
                    className=" h-[150px] sm:h-[200px] md:h-[250px] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                )}
              </div>
          
                <p className="text-white mt-2 text-[16px] sm:text-[20px] md:text-[24px] font-bold">
                  {artist.name}
                </p>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedArtiste;
