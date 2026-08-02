import React, { useState } from 'react';
import { CITIES_DATA, KNOWLEDGE_TRAILS_DATA } from '../../data/atlasData';
import { KnowledgeCity, KnowledgeTrail } from '../../types';
import { Bookmark, MapPin, Compass, Trash2, Download, Share2, Sparkles } from 'lucide-react';

interface SavedViewProps {
  onSelectCity: (city: KnowledgeCity) => void;
  onSelectTrail: (trail: KnowledgeTrail) => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  onSelectCity,
  onSelectTrail,
}) => {
  const [savedCities, setSavedCities] = useState<KnowledgeCity[]>([
    CITIES_DATA[0], // Artificial Intelligence City
    CITIES_DATA[1], // Bitcoin City
    CITIES_DATA[3], // Design Harbor
  ]);

  const [savedTrails, setSavedTrails] = useState<KnowledgeTrail[]>([
    KNOWLEDGE_TRAILS_DATA[0],
    KNOWLEDGE_TRAILS_DATA[1],
  ]);

  const handleRemoveCity = (cityId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedCities((prev) => prev.filter((c) => c.id !== cityId));
  };

  const handleRemoveTrail = (trailId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedTrails((prev) => prev.filter((t) => t.id !== trailId));
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest">
            <Bookmark className="w-4 h-4 text-blue-400" />
            <span>PERSONAL CARTOGRAPHY ARCHIVE</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Saved Expeditions & Locations</h1>
          <p className="text-xs text-white/60">
            {savedCities.length} Pinned Cities • {savedTrails.length} Saved Knowledge Trails
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Atlas Cartography Map exported as spatial GeoJSON!')}
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Export GeoJSON Map</span>
          </button>
        </div>
      </div>

      {/* Pinned Knowledge Cities */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span>Pinned Cities & Regions</span>
        </h2>

        {savedCities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCities.map((city) => (
              <div
                key={city.id}
                onClick={() => onSelectCity(city)}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/50 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className="w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: city.glowColor }}
                    />
                    <button
                      onClick={(e) => handleRemoveCity(city.id, e)}
                      title="Unpin City"
                      className="text-white/30 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {city.name}
                  </h3>
                  <div className="text-xs font-mono text-white/50">
                    {city.continent} • {city.country}
                  </div>
                  <p className="text-xs text-white/70 line-clamp-2">{city.description}</p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs font-mono text-blue-400">
                  <span>{city.population.toLocaleString()} Explorers</span>
                  <span>Fly To Location →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-white/40 text-xs font-mono">
            No pinned cities yet. Explore the map and click "Pin City" to bookmark.
          </div>
        )}
      </div>

      {/* Saved Knowledge Trails */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Compass className="w-4 h-4 text-amber-400" />
          <span>Saved Knowledge Trails</span>
        </h2>

        {savedTrails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedTrails.map((trail) => (
              <div
                key={trail.id}
                onClick={() => onSelectTrail(trail)}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-amber-500/40 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 font-bold text-amber-300 border border-amber-500/30">
                      {trail.durationMinutes} min
                    </span>
                    <button
                      onClick={(e) => handleRemoveTrail(trail.id, e)}
                      title="Remove Trail"
                      className="text-white/30 hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {trail.title}
                  </h3>
                  <p className="text-xs text-white/70">{trail.subtitle}</p>
                </div>

                <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs font-mono text-amber-400">
                  <span>{trail.steps.length} Nodes</span>
                  <span>Resume Expedition →</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-white/40 text-xs font-mono">
            No saved knowledge trails yet.
          </div>
        )}
      </div>
    </div>
  );
};
