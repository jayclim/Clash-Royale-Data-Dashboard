import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import MetaScatterPlot from '@/components/meta/MetaScatterPlot';
import ElixirEfficiencyChart from '@/components/meta/ElixirEfficiencyChart';
import RegionalMetaMap from '@/components/meta/RegionalMetaMap';
import metaData from '@/data/meta_snapshot.json';

export default function MetaDeepDive() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
            Meta Deep Dive
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Going beyond simple win rates. We analyzed {metaData.total_decks} decks from the world's top players to answer three critical questions about the current state of Clash Royale.
          </p>
        </div>

        {/* Story 1: The Sleeper Hunt */}
        <section className="space-y-4">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-purple-500">1.</span> The Sleeper Hunt
              </h2>
              <p className="text-gray-400 mb-4">
                Everyone knows the meta cards, but where are the hidden gems? We plotted every card's 
                <span className="text-white font-bold"> Win Rate</span> against its <span className="text-white font-bold">Usage Rate</span>.
                Cards in the top-left quadrant (High Win, Low Usage) are your "Sleeper Picks" — statistically strong but underplayed.
              </p>
              <ul className="space-y-2 text-sm text-gray-500 list-disc list-inside mb-6">
                <li><span className="text-green-500 font-bold">Top Right:</span> Meta Staples (Safe picks)</li>
                <li><span className="text-purple-500 font-bold">Top Left:</span> Sleepers (High skill ceiling / Surprise factor)</li>
                <li><span className="text-red-500 font-bold">Bottom Right:</span> Overrated (Popular but losing)</li>
              </ul>
            </div>
            <div className="w-full lg:w-2/3">
              <MetaScatterPlot cards={metaData.top_cards} />
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#262626]" />

        {/* Story 2: Tempo Analysis */}
        <section className="space-y-4">
          <div className="flex flex-col lg:flex-row-reverse gap-8 items-start">
            <div className="w-full lg:w-1/3">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="text-yellow-500">2.</span> The Tempo Analysis
              </h2>
              <p className="text-gray-400 mb-4">
                Does playing faster decks actually lead to more wins? We analyzed the average win rate for decks at different 
                <span className="text-white font-bold"> Elixir Costs</span>.
              </p>
              <p className="text-gray-400 text-sm">
                In the current meta, we often see a "sweet spot" where cycle decks (low elixir) outperform heavier beatdown decks due to their ability to out-cycle counters.
              </p>
            </div>
            <div className="w-full lg:w-2/3">
              <ElixirEfficiencyChart data={metaData.deck_elixir_stats} />
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-[#262626]" />

        {/* Story 3: Regional Playstyles */}
        <section className="space-y-6">
          <RegionalMetaMap data={metaData.regional_archetypes}>
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-blue-500">3.</span> Regional Playstyles
              </h2>
              <p className="text-gray-400 mb-4 text-lg">
                Do players from different regions favor different strategies? We aggregated deck archetypes by the clan location of top players.
              </p>
              <p className="text-gray-500 text-sm italic">
                This data reveals cultural meta differences. For example, some regions might heavily favor "Bridge Spam" aggression, while others prefer calculated "Control" decks.
              </p>
            </div>
          </RegionalMetaMap>
        </section>
      </div>
    </main>
  );
}
