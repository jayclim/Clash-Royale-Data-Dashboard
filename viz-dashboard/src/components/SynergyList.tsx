import Image from 'next/image';

interface Card {
  name: string;
  icon: string;
}

interface Synergy {
  cards: Card[];
  count: number;
  synergy_rate: number;
}

export default function SynergyList({ synergies }: { synergies: Synergy[] }) {
  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-purple-500">⚡</span> Top Synergies
      </h2>
      <div className="space-y-2">
        {synergies.slice(0, 6).map((synergy, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-[#0a0a0a] rounded border border-[#262626] hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                {synergy.cards.map((card, i) => (
                  <div key={i} className="relative w-8 h-10 rounded border border-[#262626] bg-[#171717] overflow-hidden z-10 first:z-0 shadow-sm">
                    <Image
                      src={card.icon}
                      alt={card.name}
                      fill
                      className="object-contain p-0.5"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs font-medium text-gray-300 flex flex-col leading-tight">
                <span className="truncate max-w-[80px]">{synergy.cards[0].name}</span>
                <span className="text-[10px] text-gray-500 truncate max-w-[80px]">+ {synergy.cards[1].name}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-purple-400">{synergy.synergy_rate}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
