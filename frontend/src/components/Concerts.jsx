// // import React from 'react'

// // const Concerts = () => {
// //   const concertEvents = [
// //     {
// //       id: 1,
// //       type: "LIVE CONCERT",
// //       date: "March 20 2025",
// //       title: "Summer Music Festival",
// //       description: "Join us for an unforgettable night featuring top artists from around the world, with stunning light shows and incredible performances.",
// //       image: "bg-gradient-to-br from-cyan-400 via-teal-500 to-green-600",
// //       color: "from-purple-600 to-blue-600"
// //     },
// //     {
// //       id: 2,
// //       type: "FESTIVAL",
// //       date: "April 15 2025",
// //       title: "Electronic Dance Experience",
// //       description: "Dance the night away with world-class DJs and electronic music artists in an immersive audio-visual experience.",
// //       image: "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600",
// //       color: "from-pink-600 to-purple-600"
// //     },
// //     {
// //       id: 3,
// //       type: "ACOUSTIC NIGHT",
// //       date: "May 08 2025",
// //       title: "Intimate Jazz Evening",
// //       description: "Experience the smooth sounds of jazz in an intimate setting with renowned musicians and a cozy atmosphere.",
// //       image: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-600",
// //       color: "from-orange-600 to-red-600"
// //     },
// //     {
// //       id: 4,
// //       type: "ROCK CONCERT",
// //       date: "June 22 2025",
// //       title: "Heavy Metal Madness",
// //       description: "Get ready to rock with the biggest names in heavy metal, featuring explosive performances and incredible energy.",
// //       image: "bg-gradient-to-br from-gray-600 via-gray-800 to-black",
// //       color: "from-gray-600 to-black"
// //     }
// //   ]

// //   return (
// //     <div className="min-h-screen  p-6">
// //       <div className="max-w-6xl mx-auto">
// //         {/* Header */}
// //         <div className="text-center mb-12">
// //           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
// //             Upcoming <span className="">Concerts</span>
// //           </h1>
// //           <p className="text-gray-300 text-lg">Discover amazing live music experiences</p>
// //         </div>

// //         {/* Concert Cards Horizontal Scroll */}
// //         <div className="relative">
// //           <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{
// //             scrollbarWidth: 'none',
// //             msOverflowStyle: 'none',
// //             WebkitScrollbar: { display: 'none' }
// //           }}>
// //             {concertEvents.map((concert) => (
// //               <div key={concert.id} className="group flex-none w-80">
// //                 <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-full">
// //                   {/* Image Section */}
// //                   <div className="relative h-48 overflow-hidden">
// //                     <div className={`absolute inset-0 ${concert.image} opacity-90`}>
// //                       {/* Overlay pattern */}
// //                       <div className="absolute inset-0 bg-black/20"></div>
                      
// //                       {/* Concert type badge */}
// //                       <div className="absolute top-4 left-4">
// //                         <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
// //                           {concert.type}
// //                         </span>
// //                       </div>

// //                       {/* Decorative musical elements */}
// //                       <div className="absolute top-6 right-6">
// //                         <svg className="w-8 h-8 text-white/60" fill="currentColor" viewBox="0 0 20 20">
// //                           <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
// //                         </svg>
// //                       </div>

// //                       {/* Floating music notes */}
// //                       <div className="absolute bottom-4 right-8">
// //                         <div className="flex space-x-2">
// //                           <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
// //                           <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
// //                           <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Content Section */}
// //                   <div className="p-6">
// //                     {/* Date */}
// //                     <div className="text-gray-500 text-sm font-medium mb-3 uppercase tracking-wider">
// //                       {concert.date}
// //                     </div>

// //                     {/* Title */}
// //                     <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors">
// //                       {concert.title}
// //                     </h3>

// //                     {/* Description */}
// //                     <p className="text-gray-600 leading-relaxed mb-4 text-sm line-clamp-3">
// //                       {concert.description}
// //                     </p>

// //                     {/* Call to Action Button */}
// //                     <button className={`group/btn relative overflow-hidden bg-gradient-to-r ${concert.color} text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2 w-full justify-center`}>
// //                       <span className="relative z-10 text-sm">Find out more</span>
// //                       <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
// //                       </svg>
                      
// //                       {/* Button hover effect */}
// //                       <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
          
// //           {/* Gradient fade effect on the right */}
// //           <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-indigo-900 to-transparent pointer-events-none"></div>
// //         </div>

// //         {/* Add custom scrollbar styles */}
// //         <style jsx>{`
// //           .scrollbar-hide {
// //             scrollbar-width: none;
// //             -ms-overflow-style: none;
// //           }
// //           .scrollbar-hide::-webkit-scrollbar {
// //             display: none;
// //           }
// //         `}</style>

// //         {/* Bottom CTA Section */}
// //         <div className="text-center mt-16">
// //           <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 border border-white/20">
// //             <h2 className="text-2xl font-bold text-white mb-4">Don't Miss Out!</h2>
// //             <p className="text-gray-300 mb-6">Subscribe to get notified about upcoming concerts and exclusive presale access.</p>
// //             <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg">
// //               Subscribe Now
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Concerts


// import React from "react";

// const Concerts = () => {
//   const concertEvents = [
//     {
//       id: 1,
//       type: "LIVE CONCERT",
//       date: "March 20 2025",
//       title: "Summer Music Festival",
//       description:
//         "Join us for an unforgettable night featuring top artists from around the world, with stunning light shows and incredible performances.",
//       image: "bg-gradient-to-br from-cyan-400 via-teal-500 to-green-600",
//       color: "from-purple-600 to-blue-600",
//     },
//     {
//       id: 2,
//       type: "FESTIVAL",
//       date: "April 15 2025",
//       title: "Electronic Dance Experience",
//       description:
//         "Dance the night away with world-class DJs and electronic music artists in an immersive audio-visual experience.",
//       image: "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600",
//       color: "from-pink-600 to-purple-600",
//     },
//     {
//       id: 3,
//       type: "ACOUSTIC NIGHT",
//       date: "May 08 2025",
//       title: "Intimate Jazz Evening",
//       description:
//         "Experience the smooth sounds of jazz in an intimate setting with renowned musicians and a cozy atmosphere.",
//       image: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-600",
//       color: "from-orange-600 to-red-600",
//     },
//     {
//       id: 4,
//       type: "ROCK CONCERT",
//       date: "June 22 2025",
//       title: "Heavy Metal Madness",
//       description:
//         "Get ready to rock with the biggest names in heavy metal, featuring explosive performances and incredible energy.",
//       image: "bg-gradient-to-br from-gray-600 via-gray-800 to-black",
//       color: "from-gray-600 to-black",
//     },
//   ];

//   return (
//     <div className="min-h-screen p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10 sm:mb-12">
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
//             Upcoming <span className="">Concerts</span>
//           </h1>
//           <p className="text-gray-300 text-base sm:text-lg">
//             Discover amazing live music experiences
//           </p>
//         </div>

//         {/* Concert Cards */}
//         <div className="relative">
//           <div
//             className="flex flex-col sm:flex-row gap-6 overflow-x-auto sm:overflow-x-auto scrollbar-hide pb-4"
//             style={{
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//             }}
//           >
//             {concertEvents.map((concert) => (
//               <div
//                 key={concert.id}
//                 className="group flex-none w-full sm:w-80 md:w-96"
//               >
//                 <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-full flex flex-col">
//                   {/* Image Section */}
//                   <div className="relative h-40 sm:h-48 overflow-hidden">
//                     <div
//                       className={`absolute inset-0 ${concert.image} opacity-90`}
//                     >
//                       <div className="absolute inset-0 bg-black/20"></div>

//                       {/* Badge */}
//                       <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
//                         <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
//                           {concert.type}
//                         </span>
//                       </div>

//                       {/* Decorative icon */}
//                       <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
//                         <svg
//                           className="w-6 h-6 sm:w-8 sm:h-8 text-white/60"
//                           fill="currentColor"
//                           viewBox="0 0 20 20"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-4 sm:p-6 flex flex-col flex-grow">
//                     <div className="text-gray-500 text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-wider">
//                       {concert.date}
//                     </div>
//                     <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-purple-700 transition-colors">
//                       {concert.title}
//                     </h3>
//                     <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base line-clamp-3 flex-grow">
//                       {concert.description}
//                     </p>
//                     <button
//                       className={`group/btn relative overflow-hidden bg-gradient-to-r ${concert.color} text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center text-sm sm:text-base`}
//                     >
//                       <span className="relative z-10">Find out more</span>
//                       <svg
//                         className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 7l5 5m0 0l-5 5m5-5H6"
//                         />
//                       </svg>
//                       <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Gradient fade (hidden on mobile) */}
//           <div className="hidden sm:block absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-indigo-900 to-transparent pointer-events-none"></div>
//         </div>

//         {/* CTA */}
//         <div className="text-center mt-12 sm:mt-16">
//           <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20">
//             <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
//               Don't Miss Out!
//             </h2>
//             <p className="text-gray-300 text-sm sm:text-base mb-5 sm:mb-6">
//               Subscribe to get notified about upcoming concerts and exclusive
//               presale access.
//             </p>
//             <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base">
//               Subscribe Now
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Concerts;


import React from "react";

const Concerts = () => {
  const concertEvents = [
    {
      id: 1,
      type: "LIVE CONCERT",
      date: "March 20 2025",
      title: "Summer Music Festival",
      description:
        "Join us for an unforgettable night featuring top artists from around the world, with stunning light shows and incredible performances.",
      image: "bg-gradient-to-br from-cyan-400 via-teal-500 to-green-600",
      color: "from-purple-600 to-blue-600",
    },
    {
      id: 2,
      type: "FESTIVAL",
      date: "April 15 2025",
      title: "Electronic Dance Experience",
      description:
        "Dance the night away with world-class DJs and electronic music artists in an immersive audio-visual experience.",
      image: "bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600",
      color: "from-pink-600 to-purple-600",
    },
    {
      id: 3,
      type: "ACOUSTIC NIGHT",
      date: "May 08 2025",
      title: "Intimate Jazz Evening",
      description:
        "Experience the smooth sounds of jazz in an intimate setting with renowned musicians and a cozy atmosphere.",
      image: "bg-gradient-to-br from-amber-400 via-orange-500 to-red-600",
      color: "from-orange-600 to-red-600",
    },
    {
      id: 4,
      type: "ROCK CONCERT",
      date: "June 22 2025",
      title: "Heavy Metal Madness",
      description:
        "Get ready to rock with the biggest names in heavy metal, featuring explosive performances and incredible energy.",
      image: "bg-gradient-to-br from-gray-600 via-gray-800 to-black",
      color: "from-gray-600 to-black",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Upcoming <span className="">Concerts</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg">
            Discover amazing live music experiences
          </p>
        </div>

        {/* Concert Cards */}
        <div className="relative">
          <div
            className="flex flex-row gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {concertEvents.map((concert) => (
              <div
                key={concert.id}
                className="group flex-none w-72 sm:w-80 md:w-96 snap-start"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-full flex flex-col">
                  {/* Image Section */}
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <div
                      className={`absolute inset-0 ${concert.image} opacity-90`}
                    >
                      <div className="absolute inset-0 bg-black/20"></div>

                      {/* Badge */}
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                          {concert.type}
                        </span>
                      </div>

                      {/* Decorative icon */}
                      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                        <svg
                          className="w-6 h-6 sm:w-8 sm:h-8 text-white/60"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6 flex flex-col flex-grow">
                    <div className="text-gray-500 text-xs sm:text-sm font-medium mb-2 sm:mb-3 uppercase tracking-wider">
                      {concert.date}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 group-hover:text-purple-700 transition-colors">
                      {concert.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base line-clamp-3 flex-grow">
                      {concert.description}
                    </p>
                    <button
                      className={`group/btn relative overflow-hidden bg-gradient-to-r ${concert.color} text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 justify-center text-sm sm:text-base`}
                    >
                      <span className="relative z-10">Find out more</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                      <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Gradient fade (hidden on mobile) */}
          <div className="hidden sm:block absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-indigo-900 to-transparent pointer-events-none"></div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 sm:p-8 border border-white/20">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              Don't Miss Out!
            </h2>
            <p className="text-gray-300 text-sm sm:text-base mb-5 sm:mb-6">
              Subscribe to get notified about upcoming concerts and exclusive
              presale access.
            </p>
            <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concerts;
