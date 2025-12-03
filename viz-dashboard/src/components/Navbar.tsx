'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import metaData from '@/data/meta_snapshot.json';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="border-b border-[#262626] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
              {/* <img 
                src="https://fankit.supercell.com/d/BmehSDJrZNff/game-assets-1/show/eyJpZCI6NjA5NTYsInNjb3BlIjoiYXNzZXQ6dmlldyIsInRpbWVzdGFtcCI6IjE3NjQ3ODkzMzgifQ:supercell:i4zZmdC7AgxEhPxO6Y3mhPXor7dWimmCnvhlFA8GM8E" 
                alt="CR" 
                className="w-8 h-8"
              /> */}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">CR Meta</span>
            </Link>
            
            <div className="flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === '/' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Visualizations
            </Link>
            <Link 
              href="/data" 
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === '/data' ? 'text-white' : 'text-gray-400'
              }`}
            >
              Data Tables
            </Link>
            <Link 
              href="/meta/deep-dive" 
              className={`text-sm font-medium transition-colors ${pathname.startsWith('/meta') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Meta Deep Dive
            </Link>
            <Link 
              href="/player" 
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname.startsWith('/player') ? 'text-white' : 'text-gray-400'
              }`}
            >
              Player Search
            </Link>
            <Link 
              href="/clan" 
              className={`text-sm font-medium transition-colors ${pathname.startsWith('/clan') ? 'text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Clan Search
            </Link>
          </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-xs text-gray-500 font-mono hidden sm:block">
              v1.0.0
            </div>
            <div className="text-[10px] text-gray-600 font-mono hidden sm:block">
              Updated: {metaData.timestamp}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
