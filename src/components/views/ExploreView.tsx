import React from 'react';
import { CITIES_DATA, KNOWLEDGE_TRAILS_DATA, CURRENT_CREATOR } from '../../data/atlasData';
import { KnowledgeCity, KnowledgeTrail } from '../../types';
import { Sparkles, TrendingUp, Compass, MapPin, ArrowRight, ShieldCheck, Users, Flame } from 'lucide-react';

interface ExploreViewProps {
  onSelectCity: (city: KnowledgeCity) => void;
  onSelectTrail: (trail: KnowledgeTrail) => void;
  onOpenAiGuide: (region?: string) => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  onSelectCity,
  onSelectTrail,
  onOpenAiGuide,
}) => {
  const trendingCities = CITIES_DATA.slice(0, 4);
  const hiddenGemCities = CITIES_DATA.slice(4, 8);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="space-y-2 border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 uppercase tracking-widest">
          <Compass className="w-4 h-4 text-blue-400" />
          <span>Explore Knowledge</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Trending Topics & Recommended Expeditions
        </h1>
        <p className="text-sm text-white/70 max-w-2xl font-light">
          Discover active topics, recommended paths, hidden gems, and community contributors from across the globe.
        </p>
      </div>

      {/* Recommended Guided Learning Paths */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-amber-400" />
            <span>Recommended Learning Paths</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {KNOWLEDGE_TRAILS_DATA.map((trail) => (
            <div
              key={trail.id}
              onClick={() => onSelectTrail(trail)}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-amber-500/40 hover:bg-white/10 transition-all cursor-pointer shadow-xl backdrop-blur-md"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span
                    className="rounded-full px-2.5 py-0.5 font-semibold text-white text-[10px]"
                    style={{ backgroundColor: `${trail.color}30`, borderColor: trail.color }}
                  >
                    {trail.durationMinutes} min read
                  </span>
                  <span className="text-amber-400 font-bold">{trail.popularity}% match</span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                  {trail.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2">{trail.subtitle}</p>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-xs text-white/70 font-mono">
                <span>{trail.steps.length} Steps</span>
                <span className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform">
                  Start Path <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending Knowledge Topics */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span>Trending Knowledge Cities</span>
          </h2>
          <span className="text-xs text-white/50 font-mono">Ranked by Recent Activity</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingCities.map((city) => (
            <div
              key={city.id}
              onClick={() => onSelectCity(city)}
              className="group rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3 hover:border-blue-500/50 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-3 h-3 rounded-full animate-pulse shadow-md"
                  style={{ backgroundColor: city.glowColor }}
                />
                <span className="text-[10px] font-mono rounded-full bg-blue-500/20 px-2 py-0.5 text-blue-300">
                  {city.growthRate}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {city.name}
                </h3>
                <div className="text-xs text-white/50 font-mono">{city.continent}</div>
              </div>

              <p className="text-xs text-white/70 line-clamp-2">{city.description}</p>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] font-mono text-white/60">
                <span>{city.population.toLocaleString()} Explorers</span>
                <MapPin className="w-3.5 h-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hidden Discoveries & Community Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hidden Discoveries */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <span>Hidden Gem Topics</span>
          </h2>

          <div className="space-y-3">
            {hiddenGemCities.map((city) => (
              <div
                key={city.id}
                onClick={() => onSelectCity(city)}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: city.glowColor }}
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{city.name}</div>
                    <div className="text-[10px] text-white/50">{city.country}</div>
                  </div>
                </div>
                <div className="text-right text-[10px] font-mono text-amber-400">
                  {city.population.toLocaleString()} explorers
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Leaders & Experts */}
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 backdrop-blur-xl">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-400" />
            <span>Community Leaders & Experts</span>
          </h2>

          <div className="space-y-3">
            {CITIES_DATA[0].experts.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between rounded-xl border border-white/5 bg-black/40 p-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={exp.avatar}
                    alt={exp.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      {exp.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-[10px] text-white/50">{exp.role}</div>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-emerald-400">
                  {exp.knowledgeScore.toLocaleString()} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
