'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PlayerSearchPage() {
  const [tag, setTag] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tag) return;
    
    // Clean tag
    const cleanTag = tag.replace('#', '').toUpperCase();
    router.push(`/player/${cleanTag}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 -mt-20">
        {/* Header */}
        <div className="text-center space-y-4 flex flex-col items-center">
          <img 
            src="/assets/crown.png" 
            alt="Crown" 
            className="w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]"
          />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Player Analytics
          </h1>
          <p className="text-gray-400 text-lg">
            Deep dive into your Clash Royale stats.
            <br />
            <span className="text-sm text-gray-500">Battle Log • Chest Cycle • Skill Radar</span>
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter Player Tag"
            className="w-full bg-[#171717] border border-[#262626] rounded-full py-4 px-12 text-white text-lg focus:outline-none focus:border-purple-500 transition-colors shadow-lg"
            autoFocus
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors shadow-md"
          >
            Analyze
          </button>
        </form>

        <div className="text-center">
           <p className="text-xs text-gray-600">
             Try searching for <span className="text-gray-400 font-mono cursor-pointer hover:text-white transition-colors" onClick={() => setTag('#2J8J2PLLP')}>#2J8J2PLLP</span>
           </p>
        </div>
      </div>
    </main>
  );
}
