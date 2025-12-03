'use client';

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Trophy, Swords, Crown } from 'lucide-react';

interface Battle {
  type: string;
  battleTime: string;
  team: { tag: string; crowns: number; trophyChange?: number }[];
  opponent: { tag: string; crowns: number }[];
  gameMode: { name: string };
}

interface BattleLogAnalyticsProps {
  battles: Battle[];
  playerTag: string;
}

export default function BattleLogAnalytics({ battles, playerTag }: BattleLogAnalyticsProps) {
  if (!battles || battles.length === 0) return null;

  // Process data for charts
  let cumulativeTrophies = 0;
  
  // Filter for Ladder matches only for the Tilt Tracker
  const trophyData = battles
    .filter(b => b.type === 'PvP' && b.gameMode.name === 'Ladder' && b.team[0].trophyChange !== undefined)
    .reverse() // Oldest first
    .map((b, i) => {
      const change = b.team[0].trophyChange || 0;
      cumulativeTrophies += change;
      return {
        index: i + 1,
        change: change,
        cumulative: cumulativeTrophies,
        mode: b.gameMode.name,
        result: change > 0 ? 'Win' : change < 0 ? 'Loss' : 'Draw'
      };
    });

  // Calculate Win/Loss stats (All battles)
  const stats = battles.reduce(
    (acc, b) => {
      const crownsWon = b.team[0].crowns;
      const crownsLost = b.opponent[0].crowns;
      const won = crownsWon > crownsLost;
      
      acc.total++;
      if (won) acc.wins++;
      else if (crownsWon < crownsLost) acc.losses++;
      
      acc.crownsWon += crownsWon;
      acc.crownsLost += crownsLost;
      return acc;
    },
    { wins: 0, losses: 0, total: 0, crownsWon: 0, crownsLost: 0 }
  );

  // Helper to get result color
  const getResultColor = (battle: Battle) => {
    const crownsWon = battle.team[0].crowns;
    const crownsLost = battle.opponent[0].crowns;
    if (crownsWon > crownsLost) return 'bg-green-500/20 border-green-500 text-green-500';
    if (crownsWon < crownsLost) return 'bg-red-500/20 border-red-500 text-red-500';
    return 'bg-gray-500/20 border-gray-500 text-gray-500';
  };

  const formatChange = (val: number) => (val > 0 ? `+${val}` : val);

  return (
    <div className="space-y-6">
      {/* Recent Battles Grid */}
      <div className="bg-[#171717] border border-[#262626] rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-400 text-sm font-bold uppercase flex items-center gap-2">
            <Swords className="w-4 h-4" /> Recent Battles
          </h3>
          <div className="flex items-center gap-4 text-sm font-bold">
            <span className="text-green-500">W{stats.wins}</span>
            <span className="text-gray-600">•</span>
            <span className="text-red-500">L{stats.losses}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          {battles.slice(0, 20).map((battle, i) => {
             const crownsWon = battle.team[0].crowns;
             const crownsLost = battle.opponent[0].crowns;
             const isWin = crownsWon > crownsLost;
             const isLoss = crownsWon < crownsLost;
             const isLadder = battle.gameMode.name === 'Ladder';
             
             return (
              <div 
                key={i} 
                className={`w-12 h-12 rounded-lg border-b-4 flex items-center justify-center transition-transform hover:scale-105 ${getResultColor(battle)}`}
                title={`${battle.gameMode.name} • ${isWin ? 'Win' : isLoss ? 'Loss' : 'Draw'} (${crownsWon}-${crownsLost})`}
              >
                {isLadder ? <Trophy className="w-5 h-5" /> : <Swords className="w-5 h-5" />}
              </div>
             );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crown Ratio */}
        <div className="bg-[#171717] border border-[#262626] rounded-xl p-6 flex flex-col justify-between min-h-[200px]">
          <h3 className="text-gray-400 text-sm font-bold uppercase flex items-center gap-2">
            <Crown className="w-5 h-5 text-yellow-500" />
            Crown Ratio
          </h3>
          <div className="flex items-end gap-3 mt-4">
             <div className="flex flex-col">
                <span className="text-4xl font-bold text-white">{stats.crownsWon}</span>
                <span className="text-xs text-green-500 font-bold uppercase">Won</span>
             </div>
             <span className="text-gray-600 text-2xl mb-2">/</span>
             <div className="flex flex-col">
                <span className="text-4xl font-bold text-gray-400">{stats.crownsLost}</span>
                <span className="text-xs text-red-500 font-bold uppercase">Lost</span>
             </div>
          </div>
          <div className="w-full bg-[#262626] h-2 rounded-full mt-6 overflow-hidden">
            <div 
              className="bg-yellow-500 h-full" 
              style={{ width: `${(stats.crownsWon / (stats.crownsWon + stats.crownsLost || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Tilt Tracker Card */}
        <div className="bg-[#171717] border border-[#262626] rounded-xl p-6">
           <h3 className="text-gray-400 text-sm font-bold uppercase flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4" /> Tilt Tracker (Ladder Only)
           </h3>
           <div className="h-[150px]">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={trophyData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                 <XAxis 
                    dataKey="index" 
                    stroke="#666" 
                    tick={{ fontSize: 10 }} 
                    tickFormatter={(val) => `#${val}`}
                 />
                 <YAxis 
                    stroke="#666" 
                    tick={{ fontSize: 10 }}
                    domain={['auto', 'auto']}
                 />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
                    cursor={{ stroke: '#666', strokeWidth: 1 }}
                    formatter={(value: any, name: string) => [formatChange(value), name === 'cumulative' ? 'Net Change' : name]}
                    labelFormatter={(label) => `Match #${label}`}
                 />
                 <Line 
                   type="monotone" 
                   dataKey="cumulative" 
                   stroke="#8884d8" 
                   strokeWidth={3} 
                   dot={{ r: 2, fill: '#8884d8' }}
                   activeDot={{ r: 6, fill: '#fff' }}
                 />
               </LineChart>
             </ResponsiveContainer>
           </div>
           <div className="text-xs text-center text-gray-500 mt-2">
             Net Trophy Change (Last {trophyData.length} Ladder Matches)
           </div>
        </div>
      </div>
    </div>
  );
}
