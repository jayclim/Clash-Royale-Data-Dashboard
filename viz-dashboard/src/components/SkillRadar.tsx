'use client';

import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';

interface SkillRadarProps {
  title?: string;
  color?: string;
  playerStats: {
    wins: number;
    threeCrownWins: number;
    bestTrophies: number;
    warDayWins: number;
    challengeCardsWon: number;
  };
  globalAverages: {
    wins: number;
    threeCrownWins: number;
    bestTrophies: number;
    warDayWins: number;
    challengeCardsWon: number;
  };
  globalQ3?: {
    wins: number;
    threeCrownWins: number;
    bestTrophies: number;
    warDayWins: number;
    challengeCardsWon: number;
  };
}

export default function SkillRadar({ 
  playerStats, 
  globalAverages, 
  globalQ3,
  title = "Skill Radar", 
  color = "#8884d8" 
}: SkillRadarProps) {
  
  // Normalize data relative to the Q3 value (100%)
  // If globalQ3 is provided, use it. Otherwise fallback to average * 2 heuristic.
  const normalize = (val: number, subject: keyof typeof playerStats) => {
    let max = globalQ3 ? globalQ3[subject] : (globalAverages[subject] * 2);
    
    // If player exceeds global Q3, adjust scale to fit player
    if (val > max) max = val;
    
    if (!max) return 0;
    return (val / max) * 100;
  };

  const data = [
    {
      subject: 'Wins',
      A: normalize(playerStats.wins, 'wins'),
      B: normalize(globalAverages.wins, 'wins'),
      fullMark: 100,
      actual: playerStats.wins,
      avg: globalAverages.wins,
      max: globalQ3?.wins
    },
    {
      subject: '3-Crowns',
      A: normalize(playerStats.threeCrownWins, 'threeCrownWins'),
      B: normalize(globalAverages.threeCrownWins, 'threeCrownWins'),
      fullMark: 100,
      actual: playerStats.threeCrownWins,
      avg: globalAverages.threeCrownWins,
      max: globalQ3?.threeCrownWins
    },
    {
      subject: 'Trophies',
      A: normalize(playerStats.bestTrophies, 'bestTrophies'),
      B: normalize(globalAverages.bestTrophies, 'bestTrophies'),
      fullMark: 100,
      actual: playerStats.bestTrophies,
      avg: globalAverages.bestTrophies,
      max: globalQ3?.bestTrophies
    },
    {
      subject: 'War Wins',
      A: normalize(playerStats.warDayWins, 'warDayWins'),
      B: normalize(globalAverages.warDayWins, 'warDayWins'),
      fullMark: 100,
      actual: playerStats.warDayWins,
      avg: globalAverages.warDayWins,
      max: globalQ3?.warDayWins
    },
    {
      subject: 'Cards Won',
      A: normalize(playerStats.challengeCardsWon, 'challengeCardsWon'),
      B: normalize(globalAverages.challengeCardsWon, 'challengeCardsWon'),
      fullMark: 100,
      actual: playerStats.challengeCardsWon,
      avg: globalAverages.challengeCardsWon,
      max: globalQ3?.challengeCardsWon
    },
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-black/90 border border-gray-700 p-2 rounded shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{dataPoint.subject}</p>
          <p className="text-blue-400">Player: {dataPoint.actual.toLocaleString()}</p>
          <p className="text-gray-400">Top 500 Avg: {dataPoint.avg.toLocaleString()}</p>
          {dataPoint.max && <p className="text-gray-600">Top 500 Q3: {dataPoint.max.toLocaleString()}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full min-h-[300px] bg-[#171717] rounded-lg p-4 flex flex-col">
      <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="text-purple-500">🕸️</span> {title}
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
            <PolarGrid stroke="#404040" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            
            <Radar
              name="Stats"
              dataKey="A"
              stroke={color}
              strokeWidth={3}
              fill={color}
              fillOpacity={0.5}
            />
            <Radar
              name="Top 500 Avg"
              dataKey="B"
              stroke="#fbbf24" // Brighter Amber
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="transparent"
              fillOpacity={0.1}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
