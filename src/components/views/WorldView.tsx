import React, { useState } from 'react';
import { KnowledgeCity, ContinentName } from '../../types';
import { CITIES_DATA } from '../../data/atlasData';
import { InteractiveGlobe } from '../3d/InteractiveGlobe';
import { KnowledgeMapCanvas } from '../3d/KnowledgeMapCanvas';
import { Globe, Layers, Sparkles, Compass, Navigation, ArrowRight, ShieldCheck } from 'lucide-react';

interface WorldViewProps {
  selectedCity: KnowledgeCity | null;
  onSelectCity: (city: KnowledgeCity) => void;
  targetFocus: { lat: number; lng: number; altitude?: number } | null;
  onOpenAiGuide: (region?: string) => void;
  onNavigateTab: (tab: 'explore' | 'discover') => void;
}

export const WorldView: React.FC<WorldViewProps> = ({
  selectedCity,
  onSelectCity,
  targetFocus,
  onOpenAiGuide,
  onNavigateTab,
}) => {
  const [mapMode, setMapMode] = useState<'3d' | '2d'>('3d');
  const [activeContinent, setActiveContinent] = useState<ContinentName | 'All'>('All');

  const filteredCities = activeContinent === 'All'
    ? CITIES_DATA
    : CITIES_DATA.filter((c) => c.continent === activeContinent);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6 animate-fade-in">
      {/* 1. Welcome Alex Greeting Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-950/40 via-purple-950/20 to-black p-6 md:p-8 shadow-2xl backdrop-blur-xl">
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>Interactive Knowledge Map</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Welcome back, Alex.
            </h1>

            <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">
              Explore the world's knowledge interactively.{' '}
              <span className="text-blue-300 font-semibold">23 new topics and discussions</span> were added across Artificial Intelligence, Bitcoin, and Open Source today.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              <button
                onClick={() => onOpenAiGuide('Global Knowledge Map')}
                className="flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-blue-500 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Ask AI Guide</span>
              </button>

              <button
                onClick={() => onNavigateTab('explore')}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <Compass className="w-4 h-4 text-blue-400" />
                <span>View Trending Topics</span>
              </button>
            </div>
          </div>

          {/* Quick Active Stat Badge */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2 shrink-0 md:min-w-[200px]">
            <div className="text-[10px] font-mono text-white/50 uppercase">Illuminated Topics</div>
            <div className="text-2xl font-black text-blue-400 font-mono">10,000+ Cities</div>
            <div className="text-[11px] text-white/60">Live interactive 3D view</div>
          </div>
        </div>
      </div>

      {/* 2. Interactive World Globe Section (Positioned directly under Welcome Alex card) */}
      <div className="relative rounded-3xl border border-white/15 bg-[#05070c] overflow-hidden shadow-2xl flex flex-col">
        {/* Globe Top Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-black/60 p-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#10B981]" />
            <span className="text-xs font-bold text-white tracking-wide">3D Knowledge World</span>
            <span className="text-[10px] font-mono text-white/40 hidden sm:inline">• Drag to spin globe</span>
          </div>

          {/* 3D vs 2D Toggle */}
          <div className="flex items-center rounded-full border border-white/15 bg-black/80 p-1">
            <button
              onClick={() => setMapMode('3d')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                mapMode === '3d'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>3D Globe</span>
            </button>

            <button
              onClick={() => setMapMode('2d')}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                mapMode === '2d'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2D Canvas</span>
            </button>
          </div>
        </div>

        {/* Globe Stage Container */}
        <div className="relative w-full h-[450px] md:h-[520px]">
          {mapMode === '3d' ? (
            <InteractiveGlobe
              cities={filteredCities}
              selectedCity={selectedCity}
              onSelectCity={onSelectCity}
              targetFocus={targetFocus}
            />
          ) : (
            <KnowledgeMapCanvas
              cities={filteredCities}
              selectedCity={selectedCity}
              onSelectCity={onSelectCity}
              activeContinent={activeContinent}
              setActiveContinent={setActiveContinent}
            />
          )}
        </div>

        {/* Quick City Navigation Bar at bottom of globe container */}
        <div className="border-t border-white/10 bg-black/80 p-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-white/40 uppercase whitespace-nowrap pl-2">
            Jump to City:
          </span>
          {CITIES_DATA.slice(0, 6).map((city) => (
            <button
              key={city.id}
              onClick={() => onSelectCity(city)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 whitespace-nowrap hover:border-blue-400 hover:bg-blue-600/20 hover:text-white transition-all cursor-pointer"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: city.glowColor }}
              />
              <span>{city.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
