'use client';

import React from 'react';
import FireBallIcon from './FireBallIcon';

const ScoreDisplay = ({ score }) => {
  if (!score) return <span className="text-gray-500 text-sm font-medium">Yet to bat</span>;
  if (score.overs) {
    return (
      <span className="font-bold text-gray-900">
        {score.runs}/{score.wickets} <span className="text-xs text-gray-500 font-normal">({score.overs} ov)</span>
      </span>
    );
  }
  return <span className="font-bold text-gray-900">{score.runs}/{score.wickets}</span>;
};

// Simple pseudo-random color based on team string
const getTeamColor = (teamName) => {
  const colors = ['bg-blue-600', 'bg-red-600', 'bg-green-600', 'bg-yellow-400', 'bg-purple-600', 'bg-orange-500', 'bg-teal-500'];
  let hash = 0;
  for (let i = 0; i < teamName.length; i++) {
    hash = teamName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function LiveCricket({ matches }) {
  const renderBadge = (state) => {
    if (state === 'Live' || state === 'In Progress') {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 text-red-600 rounded-full">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-bold tracking-wider">LIVE</span>
        </div>
      );
    } else if (state === 'Preview' || state === 'Upcoming') {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
          <span className="text-[10px] font-bold tracking-wider text-center w-full">UPCOMING</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full">
          <span className="text-[10px] font-bold tracking-wider text-center w-full">RESULT</span>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-50 p-2.5 rounded-xl text-blue-600">
          <FireBallIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 leading-tight">Live Cricket</h2>
          <p className="text-xs text-gray-500 font-medium">Real-time Data & Analytics</p>
        </div>
      </div>

      {/* Match Cards Container */}
      <div className="flex-1 space-y-4 mb-6">
        {matches.length === 0 ? (
          <div className="bg-white rounded-3xl p-6 border border-gray-100 text-center shadow-sm">
            <p className="text-gray-500 text-sm">No live matches right now.</p>
          </div>
        ) : (
          matches.map((match) => (
            <div key={match.matchId} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:border-blue-100 transition-colors group">
              {/* Card Header */}
              <div className="flex justify-between items-center mb-5">
                {renderBadge(match.state)}
                <span className="text-xs text-gray-500 font-medium text-right ml-2">{match.matchDesc || match.matchFormat}</span>
              </div>

              {/* Teams & Scores */}
              <div className="space-y-3.5 mb-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-3.5 rounded-sm ${getTeamColor(match.team1.name)}`}></div>
                    <span className="font-bold text-gray-800 tracking-wide text-sm">{match.team1.shortName}</span>
                  </div>
                  <ScoreDisplay score={match.team1.score} />
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-5 h-3.5 rounded-sm ${getTeamColor(match.team2.name)}`}></div>
                    <span className="font-bold text-gray-800 tracking-wide text-sm">{match.team2.shortName}</span>
                  </div>
                  <ScoreDisplay score={match.team2.score} />
                </div>
              </div>

              {/* Footer text (Status/Info) */}
              <div className="pt-4 border-t border-gray-50">
                <p className="text-xs font-semibold text-gray-500 mt-1">{match.status || 'Match in progress...'}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Navigation Links */}
      <div className="bg-white rounded-3xl p-2 border border-blue-50/50 shadow-sm mb-4">
        <nav className="space-y-1 p-2">
          {['Live Scores', 'Match Center', 'Player Stats', 'Rankings', 'Archives'].map((item, idx) => (
            <button 
              key={item} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                idx === 0 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              {idx === 0 && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20v-6M6 20V10M18 20V4" />
                </svg>
              )}
              {idx === 1 && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <path d="M3 9h18M9 21V9" />
                </svg>
              )}
              {idx === 2 && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              )}
              {idx === 3 && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              )}
              {idx === 4 && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              )}
              {item}
            </button>
          ))}
        </nav>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-4 rounded-2xl shadow-blue-500/30 shadow-lg focus:ring-4 focus:ring-blue-100 transition-all flex justify-center items-center gap-2">
        View All Series
      </button>

    </div>
  );
}
