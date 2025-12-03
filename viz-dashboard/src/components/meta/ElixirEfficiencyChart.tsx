'use client';

import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface ElixirData {
  elixir: number;
  win_rate: number;
  count: number;
}

interface ElixirEfficiencyChartProps {
  data: ElixirData[];
}

export default function ElixirEfficiencyChart({ data }: ElixirEfficiencyChartProps) {
  // Data is already pre-processed and sorted by fetch_meta.py
  
  return (
    <div className="w-full h-[400px] bg-[#0a0a0a] rounded-xl border border-[#262626] p-4">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        ⚡ Tempo Analysis
        <span className="text-xs font-normal text-gray-500 bg-[#262626] px-2 py-1 rounded">
          Win Rate by Avg Deck Elixir
        </span>
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
          <XAxis 
            dataKey="elixir" 
            stroke="#666" 
            type="number"
            domain={['dataMin', 'dataMax']}
            tickCount={10}
            label={{ value: 'Avg Elixir Cost', position: 'bottom', offset: 0, fill: '#666' }}
          />
          <YAxis 
            yAxisId="left"
            stroke="#fbbf24" 
            domain={['auto', 'auto']} 
            label={{ value: 'Win Rate (%)', angle: -90, position: 'insideLeft', fill: '#fbbf24' }}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#3b82f6" 
            label={{ value: 'Usage Count', angle: 90, position: 'insideRight', fill: '#3b82f6' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#171717', border: '1px solid #333' }}
            labelStyle={{ color: '#fff', fontWeight: 'bold' }}
            formatter={(value: number, name: string) => [
              name === 'win_rate' ? `${value}%` : value, 
              name === 'win_rate' ? 'Win Rate' : 'Decks'
            ]}
          />
          {/* Usage Volume */}
          <Bar yAxisId="right" dataKey="count" barSize={20} fill="#3b82f6" opacity={0.3} radius={[4, 4, 0, 0]} />
          
          {/* Win Rate Trend */}
          <Line 
            yAxisId="left"
            type="monotone" 
            dataKey="win_rate" 
            stroke="#fbbf24" 
            strokeWidth={3} 
            dot={{ r: 4, fill: '#fbbf24' }}
            activeDot={{ r: 6, fill: '#fff' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
