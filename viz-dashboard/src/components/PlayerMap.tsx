'use client';

import React, { useMemo, useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

// Register locale for country name translation
countries.registerLocale(enLocale);

// Use the reliable world-atlas source (Numeric IDs)
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface PlayerLocation {
  id: string; // Country Code (e.g., "US", "FR")
  value: number; // Count of players
}

interface PlayerMapProps {
  locations: PlayerLocation[];
}

export default function PlayerMap({ locations }: PlayerMapProps) {
  const [tooltipContent, setTooltipContent] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Create a map of Numeric IDs to values
  const dataMap = useMemo(() => {
    const map = new Map<string, number>();
    locations.forEach(loc => {
      // Convert Alpha-2 (e.g., "US") to Numeric (e.g., "840")
      const numericId = countries.alpha2ToNumeric(loc.id);
      if (numericId) {
        map.set(numericId, loc.value);
        // Also set the integer version just in case
        map.set(String(parseInt(numericId, 10)), loc.value);
      }
    });
    return map;
  }, [locations]);

  // Color Scale
  // Calculate max value ONLY from locations that actually map to a country
  // This prevents "International" (which has high count but no map shape) from skewing the scale
  const mappedValues = Array.from(dataMap.values());
  const maxValue = Math.max(...mappedValues, 1);
  
  const colorScale = scaleLinear<string>()
    .domain([0, maxValue])
    .range(["#262626", "#60a5fa"]); // Dark gray to Lighter Blue (Tailwind blue-400)

  return (
    <div className="relative w-full h-full bg-[#171717] rounded-lg overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-[#262626] bg-[#1a1a1a] flex justify-between items-center">
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <span className="text-green-500">🌍</span> Global Player Base
        </h2>
        <span className="text-xs text-gray-500 font-mono">
          Top Player Count
        </span>
      </div>

      <div className="flex-1 relative">
        <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
          <ZoomableGroup center={[0, 20]} zoom={1}>
            <Geographies geography={GEO_URL}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo) => {
                  // world-atlas uses "id" (numeric string) or "ISO_N3"
                  // Let's check geo.id first
                  const geoId = geo.id;
                  const value = dataMap.get(String(geoId)) || 0;
                  
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(event: React.MouseEvent) => {
                        const { name } = geo.properties;
                        setTooltipContent(`${name}: ${value} Players`);
                        setMousePosition({ x: event.clientX, y: event.clientY });
                      }}
                      onMouseMove={(event: React.MouseEvent) => {
                         setMousePosition({ x: event.clientX, y: event.clientY });
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: value > 0 ? colorScale(value) : "#262626",
                          outline: "none",
                          stroke: "#404040",
                          strokeWidth: 0.5,
                        },
                        hover: {
                          fill: "#60a5fa",
                          outline: "none",
                          stroke: "#fff",
                          strokeWidth: 1,
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#2563eb",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>

        {/* Tooltip */}
        {tooltipContent && (
          <div 
            className="fixed z-50 bg-black/90 text-white text-xs px-2 py-1 rounded pointer-events-none border border-gray-700"
            style={{ left: mousePosition.x + 10, top: mousePosition.y + 10 }}
          >
            {tooltipContent}
          </div>
        )}
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 flex flex-col gap-1 bg-black/50 p-2 rounded backdrop-blur-sm">
           <div className="text-[10px] text-gray-400 uppercase font-bold">Density</div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#262626] border border-gray-600"></div>
             <span className="text-[10px] text-gray-500">0</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#3b82f6] border border-blue-400"></div>
             <span className="text-[10px] text-gray-500">Max ({maxValue})</span>
           </div>
        </div>
      </div>
    </div>
  );
}
