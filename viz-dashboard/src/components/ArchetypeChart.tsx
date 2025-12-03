interface Archetype {
  name: string;
  count: number;
  share: number;
}

export default function ArchetypeChart({ archetypes }: { archetypes: Archetype[] }) {
  // Find max share for scaling
  const maxShare = Math.max(...archetypes.map(a => a.share));

  return (
    <div className="bg-[#171717] border border-[#262626] rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <span className="text-amber-500">🛡️</span> Archetypes
      </h2>
      <div className="space-y-3">
        {archetypes.slice(0, 6).map((arch) => (
          <div key={arch.name} className="group">
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-300">{arch.name}</span>
              <span className="text-amber-500 font-mono text-[10px]">{arch.share}%</span>
            </div>
            <div className="h-1.5 w-full bg-[#262626] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full transition-all duration-500 group-hover:brightness-110"
                style={{ width: `${(arch.share / maxShare) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-[10px] text-gray-500 text-center">
        Win condition analysis
      </div>
    </div>
  );
}
