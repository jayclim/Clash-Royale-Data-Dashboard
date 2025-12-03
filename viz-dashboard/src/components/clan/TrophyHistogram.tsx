'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Trophy } from 'lucide-react';

interface Member {
  trophies: number;
}

interface TrophyHistogramProps {
  members: Member[];
}

export default function TrophyHistogram({ members }: TrophyHistogramProps) {
  if (!members || members.length === 0) return null;

  // Define bins
  const bins = [
    { label: '<4k', min: 0, max: 4000, count: 0 },
    { label: '4k-5k', min: 4000, max: 5000, count: 0 },
    { label: '5k-6k', min: 5000, max: 6000, count: 0 },
    { label: '6k-7k', min: 6000, max: 7000, count: 0 },
    { label: '7k-8k', min: 7000, max: 8000, count: 0 },
    { label: '8k-9k', min: 8000, max: 9000, count: 0 },
    { label: '9k+', min: 9000, max: 99999, count: 0 },
  ];

  members.forEach(m => {
    const bin = bins.find(b => m.trophies >= b.min && m.trophies < b.max);
    if (bin) bin.count++;
  });

  // Filter out empty bins from the start/end to keep chart clean? 
  // Or keep them for scale context. Let's keep them but maybe filter completely empty chart if no data.

  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl p-6 h-[400px] flex flex-col">
      <h3 className="text-gray-400 text-sm font-bold uppercase flex items-center gap-2 mb-4">
        <Trophy className="w-4 h-4" /> Trophy Distribution
      </h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bins} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis dataKey="label" stroke="#666" fontSize={12} />
            <YAxis stroke="#666" fontSize={12} allowDecimals={false} />
            <Tooltip 
              cursor={{ fill: '#333', opacity: 0.2 }}
              contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
            />
            <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]}>
              {bins.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`hsl(${260 + (index * 10)}, 70%, 60%)`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
