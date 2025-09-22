import React from 'react';
import StreamSecImg from '../images/brentMusic.png';
import critiqLogo from '../images/critiq-logo.png';
import lyrics from "../images/lyrics.png";
import downloadIcon from '../images/downloadIcon.png';
import voteIcon from '../images/voteIcon.png';
import menuIcon from '../images/menuIcon.png';
import speakerIcon from '../images/Group.png';
import shuffleIcon from '../images/shuffle.png';
import backwardIcon from '../images/backward.png';
import pauseIcon from '../images/pause.png';
import fowardIcon from '../images/forward.png';
import repeatIcon from '../images/repeat.png';

const StreamSection = () => {
  return (
    <div className="bg-[#0F0F1C] min-h-screen text-white px-6 py-8 sm:px-12">
      {/* Header */}
        <img src={critiqLogo} alt="Logo" className="w-30" />

      <div className="flex items-center justify-between mb-6">
      
        <h2 className="text-3xl font-bold">Song Details</h2>
     
      </div>


      {/* Song Details */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 mb-10">
        {/* Image and controls */}
        <div className="flex flex-col items-center gap-4">
          <img src={StreamSecImg} alt="Track" className="w-200 h-180 object-cover rounded-md" />
          <div className="text-center">
            <h3 className="text-lg font-semibold">Piece of My Heart</h3>
            <p className="text-sm text-gray-400">Wizkid ft Brent Faiyaz</p>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-4">
            <img src={shuffleIcon} alt="Shuffle" className="w-5 h-5 cursor-pointer" />
            <img src={backwardIcon} alt="Back" className="w-5 h-5 cursor-pointer" />
            <img src={pauseIcon} alt="Pause" className="w-8 h-8 cursor-pointer" />
            <img src={fowardIcon} alt="Forward" className="w-5 h-5 cursor-pointer" />
            <img src={repeatIcon} alt="Repeat" className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Lyrics & Interaction */}
        <div className="flex-1">

          <img src={lyrics} alt="" className='w-200 ' />
          
    <div className="flex items-center gap-6 mb-6">
            <button className="bg-[#A259FF] hover:bg-[#E2CCFF] text-white text-2xl font-bold hover:text-[#A259FF] px-36 py-6 rounded-full flex items-center gap-2 transition duration-200">
           
               Vote
             </button>
            <button className="bg-[#0F0F1C] border border-amber-50 hover:bg-[#E2CCFF] text-white text-2xl font-bold hover:text-[#A259FF] px-36 py-6 rounded-full flex items-center gap-2 transition duration-200">
             
              Stream
            </button>
          </div>
          
        </div>
      </div>

     
    {/* Songs Description */}

    <div>
      
   <p className="text-[24px] text-gray-300 mb-2"> 
            The Nigerian singer and songwriter Ayodeji Ibrahim Balogun, better known by his stage name Wizkid, teams up with the melodic R&B artist Brent Faiyaz to deliver “Piece of My Heart.”
           This amazing song, which you should definitely add to your playlist, showcases Wizkid’s melodic versatility and talent to the fullest.
           <br />
             The unmistakable production of award-winning American music producer Brent Faiyaz, who contributes a remarkable section, adds to the beauty of this melody. Together, they create a remarkable musical experience that will leave listeners wanting more.
             <br />
Wizkid has repeatedly demonstrated that he is capable of creating hits that are adored by people all over the world and reach the top of the charts. While staying true to the mark sound that has established him as a family name, the soundtrack aims to highlight his development as a craftsman._
          </p>
    </div>

      {/* Comments */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <div className="bg-[#1C1C2E] p-4 rounded-md">
          <p className="text-sm text-gray-500 mb-4">No comments yet. Be the first to comment</p>
          <textarea
            className="w-full p-3 rounded-md bg-[#0F0F1C] text-white text-sm border border-gray-700 resize-none mb-4"
            placeholder="Write your comment here..."
            rows={3}
          ></textarea>
          <button className="bg-[#A259FF] hover:bg-[#E2CCFF] text-white hover:text-[#A259FF] px-6 py-2 rounded-full transition duration-200">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default StreamSection;




