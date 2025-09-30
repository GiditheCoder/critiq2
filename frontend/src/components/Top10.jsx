import React from 'react'

const Top10 = () => {
  const top10Artists = [
    {
      id: 1,
      name: "Drake",
      genre: "Hip-Hop"
    },
    {
      id: 2,
      name: "Taylor Swift",
      genre: "Pop"
    },
    {
      id: 3,
      name: "The Weeknd",
      genre: "R&B"
    },
    {
      id: 4,
      name: "Billie Eilish",
      genre: "Alternative"
    },
    {
      id: 5,
      name: "Ed Sheeran",
      genre: "Pop"
    },
    {
      id: 6,
      name: "Ariana Grande",
      genre: "Pop"
    },
    {
      id: 7,
      name: "Post Malone",
      genre: "Hip-Hop"
    },
    {
      id: 8,
      name: "Dua Lipa",
      genre: "Pop"
    },
    {
      id: 9,
      name: "Bad Bunny",
      genre: "Reggaeton"
    },
    {
      id: 10,
      name: "Olivia Rodrigo",
      genre: "Pop"
    }
  ]

  return (
    <div className="text-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2  text-[white] ">Top 10</h2>
        <p className="text-gray-400 text-sm">Most popular artists this week</p>
      </div>
      
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitScrollbar: { display: 'none' }
        }}>
          {top10Artists.map((artist) => (
            <div
              key={artist.id}
              className="flex-none h-55 w-50 bg-[#1c1c27] rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 cursor-pointer group transform hover:scale-105"
            >
              <div className="relative mb-4">
                <div className="w-full h-32 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg shadow-lg flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
                
                {/* Play button overlay */}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-400 hover:scale-110 transition-all duration-200">
                    <svg className="w-5 h-5 text-black ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-white mb-1 truncate group-hover:text-green-400 transition-colors duration-200">
                  {artist.name}
                </h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  {artist.genre}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient fade effect on the right */}
        <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
      </div>
      
      <style jsx>{`
        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default Top10