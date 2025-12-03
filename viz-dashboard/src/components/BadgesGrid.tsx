import Image from 'next/image';

interface Badge {
  name: string;
  iconUrls: {
    large: string;
  };
  level?: number;
  progress?: number;
  target?: number;
}

interface BadgesGridProps {
  badges: Badge[];
}

export default function BadgesGrid({ badges }: BadgesGridProps) {
  // Filter out badges that might clutter or aren't interesting (optional logic)
  // For now, show top 8 badges to keep it clean
  const displayBadges = badges.slice(0, 8);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Top Badges</h3>
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-4">
        {displayBadges.map((badge, index) => (
          <div key={index} className="flex flex-col items-center space-y-2 group" title={badge.name}>
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <Image
                src={badge.iconUrls.large}
                alt={badge.name}
                fill
                className="object-contain drop-shadow-md transition-all group-hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
