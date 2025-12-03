'use client';

import React, { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ClanSearchPage() {
  const [tag, setTag] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tag) return;
    
    // Clean tag
    const cleanTag = tag.replace('#', '').toUpperCase();
    router.push(`/clan/${cleanTag}`);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-8 flex flex-col items-center justify-center">
      <div className="max-w-md w-full space-y-8 -mt-20">
        {/* Header */}
        <div className="text-center space-y-4">
          <img src="/assets/clan.png" alt="Clan" className="w-24 h-24 mb-4 mx-auto object-contain" />
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
            Clan Analytics
          </h1>
          <p className="text-gray-400 text-lg">
            Analyze clan health and member performance.
            <br />
            <span className="text-sm text-gray-500">Activity vs. Skill • Trophy Distribution</span>
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Enter Clan Tag"
            className="w-full bg-[#171717] border border-[#262626] rounded-full py-4 px-12 text-white text-lg focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
            autoFocus
          />
          <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-500 w-6 h-6" />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors shadow-md"
          >
            Analyze
          </button>
        </form>

        <div className="text-center">
           <p className="text-xs text-gray-600">
             Try searching for <span className="text-gray-400 font-mono cursor-pointer hover:text-white transition-colors" onClick={() => setTag('#QLUPVQCJ')}>#QLUPVQCJ</span>
           </p>
        </div>
      </div>
    </main>
  );
}
