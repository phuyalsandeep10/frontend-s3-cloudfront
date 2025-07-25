
import React from 'react';

interface RiskScoreBarProps {
  score: number;
}

const RiskScoreBar: React.FC<RiskScoreBarProps> = ({ score }) => {
  // Get appropriate color based on score
  const getBarColor = (score: number) => {
    if (score >= 70) return 'bg-red-600';
    if (score >= 50) return 'bg-amber-500';
    if (score >= 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Get background color for the track
  const getTrackColor = (score: number) => {
    if (score >= 70) return 'bg-red-100';
    if (score >= 50) return 'bg-amber-100';
    if (score >= 30) return 'bg-yellow-100';
    return 'bg-green-100';
  };
  
  // Get text color for the score
  const getTextColor = (score: number) => {
    if (score >= 70) return 'text-red-700';
    if (score >= 50) return 'text-amber-700';
    if (score >= 30) return 'text-yellow-700';
    return 'text-green-700';
  };

  return (
    <div className="w-full">
      <div className={`w-full ${getTrackColor(score)} rounded-full h-2.5`}>
        <div 
          className={`h-2.5 rounded-full ${getBarColor(score)}`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <span className={`text-xs ${getTextColor(score)} font-medium`}>{score}/100</span>
        {score >= 70 ? (
          <span className="text-xs text-red-600 font-medium">Critical</span>
        ) : score >= 50 ? (
          <span className="text-xs text-amber-600 font-medium">High</span>
        ) : score >= 30 ? (
          <span className="text-xs text-yellow-600 font-medium">Medium</span>
        ) : (
          <span className="text-xs text-green-600 font-medium">Low</span>
        )}
      </div>
    </div>
  );
};

export default RiskScoreBar;
