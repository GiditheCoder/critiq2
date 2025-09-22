import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import asa2Icon from '../images/asa2Icon.png';

const VoteSection = () => {
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
    <div className="bg-[#0b0b12] text-white p-4 sm:p-6 rounded-md">
      {loading ? (
        <>
          <Skeleton height={30} width={200} baseColor="#A259FF" highlightColor="#E2CCFF" style={{ opacity: 0.2 }} />
          <Skeleton height={30} width={300} baseColor="#A259FF" highlightColor="#E2CCFF" className="mt-2" style={{ opacity: 0.2 }} />
          <Skeleton height={20} width={250} baseColor="#A259FF" highlightColor="#E2CCFF" className="mt-4" style={{ opacity: 0.2 }} />
          <Skeleton height={300} width={'100%'} baseColor="#A259FF" highlightColor="#E2CCFF" className="mt-6" style={{ opacity: 0.2 }} />
        </>
      ) : (
        <>
          <h2 className={`text-[24px] sm:text-[28px] md:text-[32px] font-bold transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Ongoing Vote
          </h2>
          <h1 className={`text-[24px] sm:text-[28px] md:text-[32px] font-bold mt-1 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Top Choice Music Awards
          </h1>
          <p className={`text-[16px] sm:text-[18px] md:text-[20px] mt-2 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            Vote your favourite <span className="font-medium">R&B music choice</span>. Make your fav win.
          </p>

          <div
            className={`mt-4 relative rounded-md overflow-hidden transition-opacity duration-700 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
           <img
  src={asa2Icon}
  alt="Artist Performing"
  className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover "
/>

            <div className="absolute inset-x-0 bottom-[20%] flex justify-center">
              <button className="bg-[#A259FF] text-white font-bold text-lg sm:text-2xl md:text-4xl px-6 sm:px-12 md:px-24 py-3 sm:py-4 md:py-6 rounded-full w-[35%] sm:w-auto text-center">
                Vote
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VoteSection;
