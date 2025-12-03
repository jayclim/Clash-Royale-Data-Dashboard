import BentoGrid from "@/components/BentoGrid";
import metaData from "@/data/meta_snapshot.json";

export default function Home() {
  const { top_synergies, player_locations, total_players, total_decks, archetypes } = metaData;
  
  // Find top archetype
  const topArchetype = archetypes && archetypes.length > 0 ? archetypes[0].name : "Unknown";

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
              Clash Royale
            </span>{" "}
            <span className="text-white">Meta Web</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            An interactive visualization of the current Clash Royale meta. 
            Explore card synergies, identify archetypes, and analyze the relationships between the top cards in the game.
          </p>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 uppercase tracking-wide font-bold pt-4">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Live Analysis: {total_players} Top Players • {total_decks} Battles</span>
          </div>
        </div>

        {/* Bento Grid Dashboard */}
        <BentoGrid 
          synergies={top_synergies || []} 
          playerLocations={player_locations || []}
          stats={{
            totalPlayers: total_players,
            totalDecks: total_decks,
            topArchetype: topArchetype
          }}
        />
      </div>
    </main>
  );
}
