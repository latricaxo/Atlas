import React from 'react';
import { CITIES_DATA } from '../data/atlasData';
import { AtlasLogo } from './AtlasLogo';
import { Compass, Sparkles, Presentation, ArrowRight, Layers, Globe, ShieldCheck, Zap, Award } from 'lucide-react';

interface LandingPageProps {
  onExploreClick: () => void;
  onOpenInvestorTour: () => void;
}

const CONTINENTS_FEATURED = [
  { name: 'Technology', desc: 'AI, Open Source, Quantum, Robotics', color: '#3B82F6' },
  { name: 'Economics', desc: 'Bitcoin, Sovereign Finance, ZK Proofs', color: '#F59E0B' },
  { name: 'Science', desc: 'Space Exploration, Fusion, Physics', color: '#06B6D4' },
  { name: 'Art', desc: 'Spatial UI, Typography, Cinema, Design', color: '#EC4899' },
  { name: 'Philosophy', desc: 'Consciousness, Epistemology, AI Ethics', color: '#A855F7' },
  { name: 'Nature', desc: 'Clean Tech, Rewilding, Biosphere', color: '#84CC16' },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  onExploreClick,
  onOpenInvestorTour,
}) => {
  return (
    <div className="w-full bg-[#050505] text-white selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20 text-center overflow-hidden">
        {/* Glow Sphere Background Ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-blue-600/20 via-indigo-600/10 to-amber-500/15 blur-3xl pointer-events-none animate-pulse" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-mono text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Sparkles className="w-4 h-4 text-amber-400 animate-bounce" />
            <span>INTRODUCING THE SPATIAL INTERNET</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-blue-100 to-blue-300">
            ATLAS
          </h1>

          <p className="text-xl md:text-3xl font-light text-white/80 max-w-2xl mx-auto leading-tight">
            Explore the world's knowledge like you explore the world itself.
          </p>

          <p className="text-sm text-white/50 max-w-lg mx-auto font-mono">
            Ideas become continents. Topics become cities. Conversations become landmarks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:scale-105 transition-all cursor-pointer"
            >
              <Compass className="w-5 h-5" />
              <span>Explore Atlas Now</span>
            </button>

            <button
              onClick={onOpenInvestorTour}
              className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-8 py-4 text-sm font-bold text-amber-200 hover:bg-amber-500/30 transition-all cursor-pointer shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              <Presentation className="w-5 h-5 text-amber-400" />
              <span>Watch Investor Keynote</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: FEEDS VS MAPS */}
      <section className="py-24 px-4 border-t border-white/10 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-widest">
            THE PARADIGM SHIFT
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            THE INTERNET WAS NEVER DESIGNED TO BE UNDERSTOOD.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Internet Card */}
          <div className="rounded-3xl border border-red-500/20 bg-red-950/10 p-8 space-y-4 backdrop-blur-xl">
            <h3 className="text-xl font-bold text-red-300">Traditional Web (Feeds)</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">❌ Infinite vertical scrolling feeds</li>
              <li className="flex items-center gap-2">❌ Information overload & short memory retention</li>
              <li className="flex items-center gap-2">❌ Algorithmic outrage loops</li>
              <li className="flex items-center gap-2">❌ Fragmented 1D chat lists</li>
            </ul>
          </div>

          {/* Atlas Spatial Card */}
          <div className="rounded-3xl border border-blue-500/40 bg-gradient-to-br from-blue-900/20 via-black to-blue-950/30 p-8 space-y-4 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.2)]">
            <h3 className="text-xl font-bold text-blue-300">Atlas (Spatial Knowledge Map)</h3>
            <ul className="space-y-3 text-sm text-white/90">
              <li className="flex items-center gap-2">✨ Infinite 3D spatial exploration</li>
              <li className="flex items-center gap-2">✨ 3.4x higher memory recall via spatial cartography</li>
              <li className="flex items-center gap-2">✨ Knowledge Trails connecting distant ideas</li>
              <li className="flex items-center gap-2">✨ AI Docent guiding every expedition</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: HOW IT WORKS */}
      <section className="py-24 px-4 border-t border-white/10 bg-black/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              THREE SIMPLE STEPS
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">HOW ATLAS WORKS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3 backdrop-blur-xl">
              <div className="text-2xl font-black text-blue-400 font-mono">01. EXPLORE</div>
              <h3 className="text-lg font-bold text-white">Navigate Knowledge Cities</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Pinch and fly around 10,000+ knowledge cities across Artificial Intelligence, Bitcoin, and Open Source.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3 backdrop-blur-xl">
              <div className="text-2xl font-black text-amber-400 font-mono">02. DISCOVER</div>
              <h3 className="text-lg font-bold text-white">Follow Glowing Trails</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Travel across Knowledge Trails connecting sovereign cryptography directly down to ancient historical breakthroughs.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 space-y-3 backdrop-blur-xl">
              <div className="text-2xl font-black text-emerald-400 font-mono">03. UNDERSTAND</div>
              <h3 className="text-lg font-bold text-white">AI Museum Docent</h3>
              <p className="text-xs text-white/70 leading-relaxed">
                Ask your AI Guide to summarize regions, find top experts, and synthesize opposing viewpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: KNOWLEDGE CONTINENTS */}
      <section className="py-24 px-4 border-t border-white/10 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
            SPATIAL TAXONOMY
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">KNOWLEDGE CONTINENTS</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONTINENTS_FEATURED.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-2 hover:border-blue-500/40 transition-all backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                <h3 className="text-lg font-bold text-white">{c.name}</h3>
              </div>
              <p className="text-xs text-white/60">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: CTA */}
      <section className="py-28 px-4 border-t border-white/10 text-center bg-gradient-to-b from-black via-blue-950/30 to-black">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            "The future isn't another feed. It's a world waiting to be explored."
          </h2>
          <button
            onClick={onExploreClick}
            className="rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:bg-blue-500 transition-all cursor-pointer"
          >
            Request Early Access • Launch Atlas
          </button>
        </div>
      </section>
    </div>
  );
};
