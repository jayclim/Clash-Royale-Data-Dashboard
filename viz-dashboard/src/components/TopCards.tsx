import Image from 'next/image';

interface Card {
  name: string;
  key: string;
  count: number;
  usage_rate: number;
  elixir: number;
  rarity: string;
  icon: string;
}

export default function TopCards({ cards }: { cards: Card[] }) {
  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-blue-500">🔥</span> Top Cards
      </h2>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {cards.slice(0, 20).map((card, index) => (
          <div key={card.key} className="relative group">
            <div className="aspect-[3/4] relative overflow-hidden rounded border border-[#262626] bg-[#0a0a0a]">
              <Image
                src={card.icon}
                alt={card.name}
                fill
                className="object-contain p-0.5"
                sizes="(max-width: 768px) 16vw, 8vw"
              />
              <div className="absolute top-0.5 right-0.5 bg-black/80 backdrop-blur-sm text-[8px] font-mono px-0.5 rounded text-blue-400 border border-blue-500/30 z-10 leading-none">
                {card.elixir}
              </div>
            </div>
            <div className="mt-1 text-center">
              <div className="text-[9px] text-gray-400 leading-none">{card.usage_rate}%</div>
            </div>
            <div className="absolute -top-1 -left-1 w-3.5 h-3.5 bg-[#262626] rounded-full flex items-center justify-center text-[8px] font-bold border border-[#404040] z-20 shadow-sm">
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
