'use client';

import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ZAxis
} from 'recharts';
import { Users } from 'lucide-react';

interface Member {
  tag: string;
  name: string;
  role: string;
  trophies: number;
  donations: number;
}

interface ClanScatterPlotProps {
  members: Member[];
}

export default function ClanScatterPlot({ members }: ClanScatterPlotProps) {
  if (!members || members.length === 0) return null;

  // Filter out members with 0 trophies/donations to avoid clutter if needed, 
  // but showing them is also useful.
  const data = members.map(m => ({
    x: m.donations,
    y: m.trophies,
    name: m.name,
    role: m.role,
    z: 1 // Size
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 border border-gray-700 p-2 rounded shadow-xl text-xs">
          <p className="font-bold text-white mb-1">{data.name}</p>
          <p className="text-gray-400">{data.role}</p>
          <div className="mt-2 space-y-1">
            <p className="text-yellow-500">🏆 {data.y.toLocaleString()}</p>
            <p className="text-green-500">📦 {data.x.toLocaleString()} Donations</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl p-6 h-[400px] flex flex-col">
      <h3 className="text-gray-400 text-sm font-bold uppercase flex items-center gap-2 mb-4">
        <Users className="w-4 h-4" /> Activity vs. Skill (Moneyball)
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Donations" 
              stroke="#666" 
              label={{ value: 'Donations (Activity)', position: 'bottom', fill: '#666', fontSize: 12 }} 
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Trophies" 
              stroke="#666" 
              domain={['auto', 'auto']}
              label={{ value: 'Trophies (Skill)', angle: -90, position: 'left', fill: '#666', fontSize: 12 }}
            />
            <ZAxis type="number" dataKey="z" range={[50, 50]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Members" data={data} fill="#3b82f6" fillOpacity={0.6} stroke="#60a5fa" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
