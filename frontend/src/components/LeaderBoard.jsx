import React, { useState } from 'react'

const LeaderBoard = () => {
  const [selectedRegion, setSelectedRegion] = useState("Worldwide")
  
  const regions = ["Worldwide", "United States", "Florida", "Zim"]
  
  const leaderboardData = [
    { id: 1, rank: 1, name: "isyonekw...", score: 146, avatar: "bg-gradient-to-br from-yellow-400 to-orange-500" },
    { id: 2, rank: 2, name: "josheleve...", score: 105, avatar: "bg-gradient-to-br from-gray-400 to-gray-600" },
    { id: 3, rank: 3, name: "herolayle...", score: 90, avatar: "bg-gradient-to-br from-amber-600 to-yellow-700" },
    { id: 4, rank: 4, name: "whitefin6664", score: 80, avatar: "bg-gradient-to-br from-blue-400 to-blue-600" },
    { id: 5, rank: 5, name: "sadpanda176", score: 65, avatar: "bg-gradient-to-br from-green-400 to-green-600" },
    { id: 6, rank: 6, name: "silverduck204", score: 47, avatar: "bg-gradient-to-br from-purple-400 to-purple-600" },
    { id: 7, rank: 7, name: "beautifulmouse112", score: 35, avatar: "bg-gradient-to-br from-pink-400 to-pink-600" }
  ]

  const topThree = leaderboardData.slice(0, 3)
  const restOfLeaders = leaderboardData.slice(3)

  const getPodiumHeight = (rank) => {
    switch(rank) {
      case 1: return "h-24"
      case 2: return "h-16" 
      case 3: return "h-12"
      default: return "h-16"
    }
  }

  const getPodiumOrder = () => {
    return [topThree[1], topThree[0], topThree[2]] // 2nd, 1st, 3rd
  }

  return (
    <div className="min-h-screen  text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
       
        
        <h1 className="text-2xl font-bold">Leaderboard</h1>
        
        <div className="w-6"></div> {/* Spacer for center alignment */}
      </div>

      {/* Region Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              selectedRegion === region
                ? "bg-white text-gray-900"
                : "bg-gray-600 text-gray-200 hover:bg-gray-500"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* Podium Section */}
      <div className="relative mb-12">
        {/* Top 3 Users Above Podium */}
        <div className="flex justify-center items-end gap-8 mb-4">
          {getPodiumOrder().map((user, index) => {
            const actualRank = user.rank
            const isFirst = actualRank === 1
            
            return (
              <div key={user.id} className="flex flex-col items-center">
                {/* Trophy/Crown for first place */}
                {isFirst && (
                  <div className="mb-2">
                    <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732L14.146 12.8l-1.179 4.456a1 1 0 01-1.856.048L10 14l-1.111 3.304a1 1 0 01-1.856-.048L5.854 12.8 2.5 10.866a1 1 0 010-1.732L5.854 7.2l1.179-4.456A1 1 0 018 2h4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {/* User Avatar */}
                <div className={`w-16 h-16 ${user.avatar} rounded-full flex items-center justify-center text-white font-bold text-lg mb-2 ${
                  isFirst ? 'ring-4 ring-yellow-400 shadow-lg' : ''
                }`}>
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                
                {/* User Name */}
                <p className="text-sm font-medium mb-1 text-center">{user.name}</p>
                
                {/* Score */}
                <div className="flex items-center gap-1 bg-purple-600 rounded-full px-3 py-1">
                  <svg className="w-4 h-4 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm font-bold text-white">{user.score}</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Podium Bases */}
        <div className="flex justify-center items-end gap-2">
          {getPodiumOrder().map((user) => (
            <div
              key={`podium-${user.id}`}
              className={`bg-gray-600 rounded-t-lg flex items-center justify-center ${getPodiumHeight(user.rank)} w-20`}
            >
              <span className="text-4xl font-bold text-gray-400">{user.rank}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rest of Leaderboard */}
      <div className="space-y-3">
        {restOfLeaders.map((user) => (
          <div key={user.id} className="flex items-center gap-4 bg-gray-700/50 rounded-xl p-4 hover:bg-gray-700/70 transition-colors">
            {/* Rank */}
            <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center font-bold text-gray-300">
              {user.rank}
            </div>
            
            {/* Avatar */}
            <div className={`w-12 h-12 ${user.avatar} rounded-full flex items-center justify-center`}>
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Name and Score */}
            <div className="flex-1">
              <p className="font-medium text-white">{user.name}</p>
            </div>
            
            <div className="flex items-center gap-1 bg-purple-600 rounded-full px-3 py-1">
              <svg className="w-4 h-4 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-bold text-white">{user.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderBoard