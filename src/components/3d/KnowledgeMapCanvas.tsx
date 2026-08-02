import React, { useState, useRef } from 'react';
import { KnowledgeCity, ContinentName } from '../../types';
import { ZoomIn, ZoomOut, Maximize2, Compass, Sparkles, Filter } from 'lucide-react';

interface KnowledgeMapCanvasProps {
  cities: KnowledgeCity[];
  selectedCity: KnowledgeCity | null;
  onSelectCity: (city: KnowledgeCity) => void;
  activeContinent: ContinentName | 'All';
  setActiveContinent: (continent: ContinentName | 'All') => void;
}

const CONTINENTS_LIST: (ContinentName | 'All')[] = [
  'All',
  'Technology',
  'Humanity',
  'Science',
  'Business',
  'Art',
  'Health',
  'Economics',
  'Philosophy',
  'Nature',
];

export const KnowledgeMapCanvas: React.FC<KnowledgeMapCanvasProps> = ({
  cities,
  selectedCity,
  onSelectCity,
  activeContinent,
  setActiveContinent,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const startPanRef = useRef({ x: 0, y: 0 });

  const filteredCities = activeContinent === 'All'
    ? cities
    : cities.filter((c) => c.continent === activeContinent);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsPanning(true);
    startPanRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPanning) return;
    setPanOffset({
      x: e.clientX - startPanRef.current.x,
      y: e.clientY - startPanRef.current.y,
    });
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 0.6));
  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#050505] overflow-hidden flex flex-col rounded-3xl border border-white/10 shadow-2xl">
      {/* Top Bar: Continent Filter Pills */}
      <div className="z-20 flex items-center gap-2 overflow-x-auto p-3 bg-black/60 backdrop-blur-md border-b border-white/10 scrollbar-none">
        <div className="flex items-center gap-1.5 text-xs text-white/50 pl-2 pr-1 font-mono">
          <Filter className="w-3.5 h-3.5 text-blue-400" />
          <span>Continents:</span>
        </div>
        {CONTINENTS_LIST.map((cont) => {
          const isActive = activeContinent === cont;
          return (
            <button
              key={cont}
              onClick={() => setActiveContinent(cont)}
              className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.5)] border border-blue-400'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {cont}
            </button>
          );
        })}
      </div>

      {/* Main Interactive Spatial Grid Stage */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {/* Background Grid Lines & Constellation Network */}
        <div
          className="absolute inset-0 transition-transform duration-75 ease-out"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Subtle Grid Lines Pattern */}
          <div
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
              width: '200%',
              height: '200%',
              left: '-50%',
              top: '-50%',
            }}
          />

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
            {filteredCities.map((city) => {
              // Convert lat/lng coordinates to relative screen % coordinates
              const x1 = ((city.coordinates.lng + 180) / 360) * 100;
              const y1 = ((90 - city.coordinates.lat) / 180) * 100;

              return city.connectedCities.map((connId) => {
                const connCity = cities.find((c) => c.id === connId);
                if (!connCity) return null;

                const x2 = ((connCity.coordinates.lng + 180) / 360) * 100;
                const y2 = ((90 - connCity.coordinates.lat) / 180) * 100;

                return (
                  <g key={`${city.id}-${connId}`}>
                    <line
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke={city.glowColor}
                      strokeOpacity="0.4"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  </g>
                );
              });
            })}
          </svg>

          {/* City Nodes */}
          {filteredCities.map((city) => {
            const isSelected = selectedCity?.id === city.id;
            const xPercent = ((city.coordinates.lng + 180) / 360) * 100;
            const yPercent = ((90 - city.coordinates.lat) / 180) * 100;

            return (
              <div
                key={city.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectCity(city);
                }}
                style={{
                  left: `${xPercent}%`,
                  top: `${yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 transition-transform duration-300 hover:scale-125"
              >
                {/* Pulsing Aura Halo */}
                <div
                  className="absolute -inset-4 rounded-full opacity-40 animate-ping pointer-events-none"
                  style={{ backgroundColor: city.glowColor }}
                />

                {/* City Node Core Pill */}
                <div
                  className={`relative flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-xl backdrop-blur-md transition-all ${
                    isSelected
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-black scale-110 z-30'
                      : 'border-white/20 bg-black/80 hover:border-white/50'
                  }`}
                  style={{
                    boxShadow: `0 0 20px ${city.glowColor}40`,
                  }}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: city.glowColor }}
                  />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white whitespace-nowrap">
                      {city.name}
                    </span>
                    <span className="text-[9px] text-white/60 font-mono -mt-0.5">
                      {city.population.toLocaleString()} explorers
                    </span>
                  </div>
                </div>

                {/* Hover Tooltip Card */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover:flex flex-col w-52 rounded-xl border border-white/20 bg-black/95 p-3 shadow-2xl z-40 backdrop-blur-xl pointer-events-none">
                  <div className="text-[10px] font-mono tracking-wider text-blue-400 uppercase">
                    {city.continent} • {city.growthRate}
                  </div>
                  <div className="text-xs font-bold text-white mt-0.5">{city.name}</div>
                  <div className="text-[11px] text-white/70 mt-1 line-clamp-2">
                    {city.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 p-1.5 backdrop-blur-xl shadow-xl">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          title="Reset View"
          className="rounded-full p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Map Legend & Status */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-3 py-1.5 backdrop-blur-md text-xs font-mono text-white/70">
        <Compass className="w-3.5 h-3.5 text-blue-400" />
        <span>Spatial Knowledge Grid • {filteredCities.length} Regions Active</span>
      </div>
    </div>
  );
};
