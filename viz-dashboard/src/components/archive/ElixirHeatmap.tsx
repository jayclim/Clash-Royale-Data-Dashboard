'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface HeatmapData {
  type: string;
  elixir: number;
  value: number; // Win Rate
  cards: string[]; // Top cards in this bucket
}

interface ElixirHeatmapProps {
  data: HeatmapData[];
}

export default function ElixirHeatmap({ data }: ElixirHeatmapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; content: React.ReactNode } | null>(null);

  useEffect(() => {
    if (!data || !svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const margin = { top: 30, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Scales
    const x = d3.scaleBand()
      .range([0, chartWidth])
      .domain(["1", "2", "3", "4", "5", "6", "7", "8", "9"])
      .padding(0.05);

    const y = d3.scaleBand()
      .range([chartHeight, 0])
      .domain(["Troop", "Spell", "Building"])
      .padding(0.05);

    const colorScale = d3.scaleSequential()
      .interpolator(d3.interpolateRdYlGn)
      .domain([45, 55]); // Win rate range (45% - 55%)

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // X Axis
    g.append("g")
      .attr("transform", `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("fill", "#9ca3af")
      .style("font-size", "12px");

    g.append("text")
      .attr("x", chartWidth / 2)
      .attr("y", chartHeight + 35)
      .attr("text-anchor", "middle")
      .attr("fill", "#6b7280")
      .style("font-size", "10px")
      .style("text-transform", "uppercase")
      .style("letter-spacing", "1px")
      .text("Elixir Cost");

    // Y Axis
    g.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("fill", "#9ca3af")
      .style("font-size", "12px");

    g.select(".domain").remove();
    g.selectAll(".tick line").remove();

    // Cells
    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(String(d.elixir)) || 0)
      .attr("y", d => y(d.type) || 0)
      .attr("width", x.bandwidth())
      .attr("height", y.bandwidth())
      .style("fill", d => colorScale(d.value))
      .style("rx", 4)
      .style("ry", 4)
      .style("cursor", "pointer")
      .on("mouseover", (event, d) => {
        const rect = event.target.getBoundingClientRect();
        setTooltip({
          x: rect.left + rect.width / 2,
          y: rect.top,
          content: (
            <div className="text-center">
              <div className="font-bold text-white mb-1">{d.type} ({d.elixir} Elixir)</div>
              <div className="text-sm text-gray-300 mb-2">Win Rate: <span className={d.value >= 50 ? "text-green-400" : "text-red-400"}>{d.value}%</span></div>
              <div className="text-xs text-gray-400 border-t border-gray-700 pt-1">
                Top Cards:
                <div className="flex gap-1 justify-center mt-1">
                  {d.cards.map(card => (
                    <span key={card} className="bg-gray-800 px-1 rounded">{card}</span>
                  ))}
                </div>
              </div>
            </div>
          )
        });
        d3.select(event.target).style("stroke", "white").style("stroke-width", 2);
      })
      .on("mouseout", (event) => {
        setTooltip(null);
        d3.select(event.target).style("stroke", "none");
      });

    // Add values inside cells
    g.selectAll(".cell-text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => (x(String(d.elixir)) || 0) + x.bandwidth() / 2)
      .attr("y", d => (y(d.type) || 0) + y.bandwidth() / 2)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .text(d => `${d.value}%`)
      .style("fill", "black")
      .style("font-size", "10px")
      .style("font-weight", "bold")
      .style("pointer-events", "none")
      .style("opacity", 0.7);

  }, [data]);

  return (
    <div className="w-full h-full relative flex flex-col bg-[#171717] rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-[#262626] bg-[#1a1a1a] flex justify-between items-center">
        <h2 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <span className="text-purple-500">⚡</span> Elixir Efficiency
        </h2>
        <span className="text-xs text-gray-500 font-mono">
          Win Rate by Cost & Type
        </span>
      </div>
      
      <div ref={containerRef} className="flex-1 w-full min-h-[200px]">
        <svg ref={svgRef} width="100%" height="100%" />
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div 
          className="fixed z-50 bg-black/90 border border-gray-700 p-2 rounded shadow-xl pointer-events-none transform -translate-x-1/2 -translate-y-full mt-[-8px]"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
}
