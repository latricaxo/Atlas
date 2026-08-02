import React from 'react';
import { CURRENT_CREATOR } from '../../data/atlasData';
import { ShieldCheck, MapPin, Award, Compass, Zap, Globe, Calendar, ArrowUpRight } from 'lucide-react';

export const ProfileView: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      {/* Creator Profile Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-r from-blue-950/40 via-black to-purple-950/30 p-6 md:p-8 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar & Info */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={CURRENT_CREATOR.avatar}
                alt={CURRENT_CREATOR.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover border-2 border-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.5)]"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {CURRENT_CREATOR.name}
                </h1>
                <span className="text-xs font-mono text-blue-300 bg-blue-500/20 border border-blue-500/30 rounded-full px-2.5 py-0.5">
                  {CURRENT_CREATOR.handle}
                </span>
              </div>
              <div className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{CURRENT_CREATOR.rank}</span>
              </div>
              <p className="text-xs text-white/70 max-w-md pt-1">{CURRENT_CREATOR.bio}</p>
            </div>
          </div>

          {/* Owned Location Badge */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-1 md:text-right">
            <div className="text-[10px] font-mono text-white/50 uppercase">OWNED LOCATION DISTRICT</div>
            <div className="text-sm font-bold text-white flex items-center md:justify-end gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{CURRENT_CREATOR.ownedCity}</span>
            </div>
            <div className="text-[11px] text-emerald-300 font-mono">Territory Sovereign • Level 5</div>
          </div>
        </div>

        {/* Instead of Followers: Atlas Explorer Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-4 border-t border-white/10">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-0.5">
            <div className="text-[10px] font-mono text-white/50 uppercase flex items-center gap-1">
              <Globe className="w-3 h-3 text-blue-400" />
              <span>Regions Discovered</span>
            </div>
            <div className="text-xl font-black text-white font-mono">
              {CURRENT_CREATOR.regionsDiscovered}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-0.5">
            <div className="text-[10px] font-mono text-white/50 uppercase flex items-center gap-1">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>Ideas Connected</span>
            </div>
            <div className="text-xl font-black text-white font-mono">
              {CURRENT_CREATOR.ideasConnected}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-0.5">
            <div className="text-[10px] font-mono text-white/50 uppercase flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Influence Radius</span>
            </div>
            <div className="text-xl font-black text-white font-mono">
              {CURRENT_CREATOR.influenceRadiusKm.toLocaleString()} km
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-0.5">
            <div className="text-[10px] font-mono text-white/50 uppercase flex items-center gap-1">
              <Award className="w-3 h-3 text-purple-400" />
              <span>Knowledge Score</span>
            </div>
            <div className="text-xl font-black text-amber-400 font-mono">
              {CURRENT_CREATOR.knowledgeScore.toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-0.5 col-span-2 sm:col-span-1">
            <div className="text-[10px] font-mono text-white/50 uppercase flex items-center gap-1">
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>Communities Built</span>
            </div>
            <div className="text-xl font-black text-cyan-300 font-mono">
              {CURRENT_CREATOR.communitiesBuilt}
            </div>
          </div>
        </div>
      </div>

      {/* Contribution Timeline */}
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-4 backdrop-blur-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          <span>Cartography Contribution Timeline</span>
        </h2>

        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-white/10">
          {CURRENT_CREATOR.timeline.map((item, idx) => (
            <div key={idx} className="relative flex items-start gap-4 pl-8">
              <div className="absolute left-2 top-1.5 h-3 w-3 rounded-full border-2 border-blue-400 bg-black" />
              <div className="flex-1 rounded-2xl border border-white/10 bg-black/40 p-4 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-blue-400">{item.year}</span>
                  <span className="text-emerald-400 font-semibold">{item.impact}</span>
                </div>
                <div className="text-sm font-bold text-white">{item.event}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
