import Image from 'next/image';

interface Card {
  name: string;
  icon: string;
  usage_rate: number;
  win_rate?: number;
  elixir: number;
}

export default function CardTable({ cards }: { cards: Card[] }) {
  return (
    <div className="bg-[#171717] border border-[#262626] rounded-lg overflow-hidden">
      <div className="px-3 py-2 border-b border-[#262626] bg-[#1a1a1a] flex justify-between items-center">
        <h2 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Meta Snapshot</h2>
        <span className="text-[10px] text-gray-500 font-mono">Live Data</span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1a1a1a] text-[10px] text-gray-500 uppercase tracking-wider border-b border-[#262626]">
              <th className="px-3 py-2 font-medium">Card</th>
              <th className="px-3 py-2 font-medium text-right">Win %</th>
              <th className="px-3 py-2 font-medium text-right">Use %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#262626]">
            {cards.slice(0, 20).map((card, index) => (
              <tr key={index} className="hover:bg-[#1f1f1f] transition-colors group">
                <td className="px-3 py-1.5">
                  <div className="flex items-center gap-3">
                    <div className="relative w-6 h-8">
                      <Image
                        src={card.icon}
                        alt={card.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">
                      {card.name}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-1.5 text-right">
                  <span className="text-sm font-bold text-gray-200 font-mono">
                    {card.win_rate || 50}%
                  </span>
                </td>
                <td className="px-3 py-1.5 text-right">
                  <span className="text-sm font-bold text-gray-200 font-mono">
                    {card.usage_rate}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
