import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import playIcon from '../images/playIcon.png';
import loveIcon from '../images/loveIcon.png';
import bookmarkIcon from '../images/bookmarkIcon.png';
import shareIcon from '../images/shareIcon.png';
import voteIcon from '../images/voteIcon.png';
import simiImg from '../images/simiMusic.png';
import asakeMusic from '../images/asakeMusic.png';
import brentMusicIcon from '../images/brentMusic.png';
import tiwaImg from '../images/tiwamusic.png';
import zaImg from '../images/zaMusic.png';
import topVote from '../images/topVoteIcon.png';
import { useNavigate } from 'react-router-dom';

const songs = [
  { votes: 46, img: simiImg, title: 'Lovin', duration: '2:55', artist: 'Simi' },
  { votes: 4, img: zaImg, title: 'ZA', duration: '2:58', artist: 'AEO' },
  { votes: 1, img: brentMusicIcon, title: 'Piece of my Heart', duration: '3:07', artist: 'Wizkid ft Brent Faiyaz' },
  { votes: 17, img: asakeMusic, title: 'Lonely at the Top', duration: '2:25', artist: 'Asake' },
  { votes: 9, img: tiwaImg, title: 'Ife wa Gbona', duration: '3:11', artist: 'Tiwa Savage ft Leo Wonder' },
];

const MusicVote = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleRoute = () => {
    navigate('/musicvotescreen');
  };

  return (
    <div className="bg-[#0B0A1F] p-6">
      {loading ? (
        <Skeleton
          height={40}
          width={180}
          baseColor="#A259FF"
          highlightColor="#E2CCFF"
          className="mb-6 px-4"
          style={{ opacity: 0.2 }}
        />
      ) : (
        <h2
          className={`text-white text-[32px] font-bold mb-6 px-4 transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Music Vote
        </h2>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-white table-auto">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-[#1E1C3A]">
              <th className="px-4 py-2"> </th>
              <th className="py-2">
                {loading ? (
                  <Skeleton
                    circle
                    height={16}
                    width={16}
                    baseColor="#A259FF"
                    highlightColor="#E2CCFF"
                    style={{ opacity: 0.2 }}
                  />
                ) : (
                  <img
                    src={topVote}
                    alt="Top Vote"
                    className={`w-4 h-4 transition-opacity duration-700 ${
                      loaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                )}
              </th>
              <th className="py-2">Title</th>
              <th className="py-2">Duration</th>
              <th className="py-2">Artist</th>
              <th className="py-2">Vote/Share</th>
            </tr>
          </thead>

          <tbody>
            {loading
              ? Array(5)
                  .fill()
                  .map((_, index) => (
                    <tr key={index} className="border-b border-[#1E1C3A]">
                      <td className="px-4 py-4">
                        <Skeleton
                          height={60}
                          width={60}
                          baseColor="#A259FF"
                          highlightColor="#E2CCFF"
                          style={{ opacity: 0.2 }}
                        />
                      </td>
                      <td className="py-4 text-sm">
                        <Skeleton
                          width={24}
                          height={16}
                          baseColor="#A259FF"
                          highlightColor="#E2CCFF"
                          style={{ opacity: 0.2 }}
                        />
                      </td>
                      <td className="py-4">
                        <Skeleton
                          width={100}
                          height={16}
                          baseColor="#A259FF"
                          highlightColor="#E2CCFF"
                          style={{ opacity: 0.2 }}
                        />
                      </td>
                      <td className="py-4">
                        <Skeleton
                          width={60}
                          height={16}
                          baseColor="#A259FF"
                          highlightColor="#E2CCFF"
                          style={{ opacity: 0.2 }}
                        />
                      </td>
                      <td className="py-4">
                        <Skeleton
                          width={120}
                          height={16}
                          baseColor="#A259FF"
                          highlightColor="#E2CCFF"
                          style={{ opacity: 0.2 }}
                        />
                      </td>
                      <td className="py-4">
                        <div className="flex gap-4">
                          {Array(4)
                            .fill()
                            .map((_, i) => (
                              <Skeleton
                                key={i}
                                circle
                                width={16}
                                height={16}
                                baseColor="#A259FF"
                                highlightColor="#E2CCFF"
                                style={{ opacity: 0.2 }}
                              />
                            ))}
                        </div>
                      </td>
                    </tr>
                  ))
              : songs.map((song, index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#1E1C3A] hover:bg-[#1C1B3A]  duration-200 transition-opacity ${
                      loaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <td className="px-4 py-4">
                      <img src={song.img} alt={song.title} className="w-15 h-15 object-cover" />
                    </td>
                    <td className="py-4 text-sm">
                      <span>{song.votes < 10 ? `0${song.votes}` : song.votes}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <img src={playIcon} alt="Play" className="w-4 h-4" />
                        <span>{song.title}</span>
                      </div>
                    </td>
                    <td className="py-4 text-sm">{song.duration}</td>
                    <td className="py-4 text-sm">{song.artist}</td>
                    <td className="py-4 text-sm">
                      <div className="flex items-center gap-4">
                        <img src={voteIcon} alt="Vote" className="w-4 h-4 cursor-pointer" />
                        <img src={shareIcon} alt="Share" className="w-4 h-4 cursor-pointer" />
                        <img src={loveIcon} alt="Love" className="w-4 h-4 cursor-pointer" />
                        <img src={bookmarkIcon} alt="Bookmark" className="w-4 h-4 cursor-pointer" />
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        <div className="text-center mt-6">
          {loading ? (
            <Skeleton
              width={100}
              height={20}
              baseColor="#A259FF"
              highlightColor="#E2CCFF"
              style={{ opacity: 0.2 }}
            />
          ) : (
            <button
              className={`text-[#A259FF] text-sm hover:underline transition-opacity duration-700 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={handleRoute}
            >
              See More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicVote;
