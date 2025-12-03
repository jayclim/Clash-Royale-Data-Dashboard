interface Player {
  tag: string;
  name: string;
  expLevel: number;
  trophies?: number;
  eloRating?: number; // Path of Legends uses eloRating
  clan?: {
    name: string;
  };
}

interface Clan {
  tag: string;
  name: string;
  score?: number;
  clanScore?: number; // API uses clanScore
  members: number;
  badgeId: number;
}

import Link from 'next/link';

export default function LeaderboardList({ players, clans }: { players: Player[], clans: Clan[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Top Royales */}
      <div className="bg-[#171717] border border-[#262626] rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-[#262626] bg-[#1a1a1a]">
          <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-500">🏆</span> Top Royales
          </h2>
        </div>
        <div className="divide-y divide-[#262626]">
          {players.map((player, index) => (
            <Link href={`/player/${player.tag.replace('#', '')}`} key={player.tag} className="px-3 py-2 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                  index === 1 ? 'bg-gray-400/20 text-gray-400' :
                  index === 2 ? 'bg-orange-600/20 text-orange-600' :
                  'bg-[#262626] text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200 flex items-center gap-1 group-hover:text-white transition-colors">
                    {player.name}
                    <span className="text-[9px] bg-[#262626] px-1 rounded text-gray-400 border border-[#333]">Lvl {player.expLevel}</span>
                  </div>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                    {player.clan ? (
                      <span className="text-gray-400">{player.clan.name}</span>
                    ) : (
                      <span className="italic opacity-50">No Clan</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-purple-400 font-mono">
                  {(player.eloRating || player.trophies || 0).toLocaleString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Clan Leaderboard */}
      <div className="bg-[#171717] border border-[#262626] rounded-lg overflow-hidden">
        <div className="px-3 py-2 border-b border-[#262626] bg-[#1a1a1a]">
          <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <span className="text-red-500">🛡️</span> Clan Leaderboard
          </h2>
        </div>
        <div className="divide-y divide-[#262626]">
          {clans.map((clan, index) => (
            <Link href={`/clan/${clan.tag.replace('#', '')}`} key={clan.tag} className="px-3 py-2 flex items-center justify-between hover:bg-[#1f1f1f] transition-colors group cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                  index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                  index === 1 ? 'bg-gray-400/20 text-gray-400' :
                  index === 2 ? 'bg-orange-600/20 text-orange-600' :
                  'bg-[#262626] text-gray-500'
                }`}>
                  {index + 1}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-200 group-hover:text-white transition-colors">{clan.name}</div>
                  <div className="text-[10px] text-gray-500">{clan.members}/50 Members</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-purple-400 font-mono">
                  {(clan.clanScore || clan.score || 0).toLocaleString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
