import DeckList from '@/components/DeckList';
import LeaderboardList from '@/components/LeaderboardList';
import CardTable from '@/components/CardTable';
import metaData from '@/data/meta_snapshot.json';

export default function DataPage() {
  const { top_cards, top_decks, leaderboards, total_players, total_decks, timestamp } = metaData;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end border-b border-[#262626] pb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Meta Data</h1>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Live Analysis: {total_players} Top Players • {total_decks} Battles</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 font-mono">
          Updated: {timestamp}
        </div>
      </div>

      {/* Section 1: Popular Decks */}
      <DeckList decks={top_decks || []} />

      {/* Section 2: Leaderboards */}
      <LeaderboardList 
        players={leaderboards?.players || []} 
        clans={leaderboards?.clans || []} 
      />

      {/* Section 3: Card Stats Table */}
      <CardTable cards={top_cards} />
    </div>
  );
}
