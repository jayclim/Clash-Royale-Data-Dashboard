import Image from 'next/image';
import DeckList from './DeckList';
import LeaderboardList from './LeaderboardList';
import CardTable from './CardTable';
import MetaNetworkGraph from './MetaNetworkGraph';
import metaData from '../data/meta_snapshot.json';

export default function MetaSnapshot() {
  const { top_cards, top_decks, top_synergies, leaderboards, total_players, total_decks, timestamp } = metaData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-[#262626] pb-3">
        <div>
          <h1 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
            <img 
              src="/assets/crown.png" 
              alt="Crown" 
              className="w-8 h-8 object-contain"
            />
            Clash Royale Meta
          </h1>
          <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-wide font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>Live Analysis: {total_players} Top Players • {total_decks} Battles</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-500 font-mono">
          Updated: {timestamp}
        </div>
      </div>

      {/* Section 1: Popular Decks */}
      <DeckList decks={top_decks || []} />

      {/* Section 2: Meta Network Graph (New) */}
      <MetaNetworkGraph synergies={top_synergies || []} />

      {/* Section 3: Leaderboards */}
      <LeaderboardList 
        players={leaderboards?.players || []} 
        clans={leaderboards?.clans || []} 
      />

      {/* Section 3: Card Stats Table */}
      <CardTable cards={top_cards} />
    </div>
  );
}
