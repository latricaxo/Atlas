import React from 'react';
import { KnowledgeCity } from '../types';
import { X, Navigation, Users, Sparkles, MessageSquare, ArrowUpRight, Share2, Compass, ShieldCheck } from 'lucide-react';

interface CityDetailDrawerProps {
  city: KnowledgeCity | null;
  onClose: () => void;
  onFlyTo: (lat: number, lng: number) => void;
  onAskAi: (cityName: string) => void;
  onSelectTrail?: (trailId: string) => void;
}

export const CityDetailDrawer: React.FC<CityDetailDrawerProps> = ({
  city,
  onClose,
  onFlyTo,
  onAskAi,
  onSelectTrail,
}) => {
  if (!city) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/15 bg-[#0a0d14]/95 backdrop-blur-2xl shadow-2xl transition-all duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_12px_currentColor]"
            style={{ backgroundColor: city.glowColor, color: city.glowColor }}
          />
          <span className="text-xs font-mono uppercase tracking-widest text-white/60">
            {city.continent} • {city.country}
          </span>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* City Title Banner */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">{city.name}</h2>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-semibold text-white/90 border border-white/20"
              style={{ backgroundColor: `${city.glowColor}30` }}
            >
              {city.growthRate}
            </span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">{city.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => onFlyTo(city.coordinates.lat, city.coordinates.lng)}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white shadow-lg hover:bg-blue-500 transition-colors cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Fly To Topic</span>
          </button>

          <button
            onClick={() => onAskAi(city.name)}
            className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>Ask AI Assistant</span>
          </button>
        </div>

        {/* AI Summary Card */}
        <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 via-black/40 to-blue-950/30 p-4 space-y-2 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI TOPIC SUMMARY</span>
          </div>
          <p className="text-xs text-blue-100/90 leading-relaxed">{city.aiSummary}</p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Explorers</span>
            </div>
            <div className="text-lg font-bold text-white mt-1">
              {city.population.toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center gap-1.5 text-xs text-white/50 font-mono">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Coordinates</span>
            </div>
            <div className="text-xs font-bold text-white mt-1 font-mono">
              {city.coordinates.lat.toFixed(2)}°, {city.coordinates.lng.toFixed(2)}°
            </div>
          </div>
        </div>

        {/* Key Contributors & Experts */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-white/50">
            Key Contributors & Experts
          </h3>
          <div className="space-y-2">
            {city.experts.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-2.5 hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={exp.avatar}
                    alt={exp.name}
                    className="w-9 h-9 rounded-full object-cover border border-white/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      {exp.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-[11px] text-white/60">{exp.role}</div>
                  </div>
                </div>

                <div className="text-right font-mono text-[10px] text-white/50">
                  <div className="text-amber-400 font-semibold">
                    {exp.knowledgeScore.toLocaleString()} pts
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Discussions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white/50">
              Popular Discussions
            </h3>
            <span className="text-[10px] font-mono text-blue-400">{city.conversations.length} Active</span>
          </div>

          <div className="space-y-3">
            {city.conversations.map((conv) => (
              <div
                key={conv.id}
                className="rounded-xl border border-white/10 bg-white/5 p-3.5 space-y-2 hover:border-blue-500/40 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={conv.avatar}
                      alt={conv.author}
                      className="w-5 h-5 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="font-medium text-white/80">{conv.author}</span>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">{conv.timestamp}</span>
                </div>

                <h4 className="text-xs font-bold text-white leading-snug">{conv.title}</h4>
                <p className="text-[11px] text-white/70 line-clamp-3 leading-relaxed">
                  {conv.snippet}
                </p>

                <div className="flex items-center justify-between pt-1 text-[11px] text-white/50 font-mono">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      {conv.upvotes}
                    </span>
                    <span className="flex items-center gap-1 text-white/60">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {conv.repliesCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Share Action */}
      <div className="border-t border-white/10 p-4 bg-black/40">
        <button
          onClick={() => {
            navigator.clipboard?.writeText(window.location.href);
            alert(`Location link for ${city.name} copied!`);
          }}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Link</span>
        </button>
      </div>
    </div>
  );
};
