import Image from 'next/image';

interface Card {
  name: string;
  id: number;
  elixirCost: number;
  iconUrls: {
    medium: string;
  };
}

interface DeckViewerProps {
  cards: Card[];
}

export default function DeckViewer({ cards }: DeckViewerProps) {
  const averageElixir = (cards.reduce((acc, card) => acc + card.elixirCost, 0) / cards.length).toFixed(1);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Current Deck</h3>
        <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
          Avg Elixir: {averageElixir}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {cards.map((card) => (
          <div key={card.id} className="relative aspect-[3/4] group">
            <div className="absolute inset-0 bg-secondary rounded-lg animate-pulse" />
            <Image
              src={card.iconUrls.medium}
              alt={card.name}
              fill
              className="object-contain transition-transform group-hover:scale-105 group-hover:-translate-y-1"
              sizes="(max-width: 768px) 25vw, 150px"
            />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-background z-10">
                {card.elixirCost}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
