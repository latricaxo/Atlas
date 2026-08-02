import React, { useState } from 'react';
import { KNOWLEDGE_TRAILS_DATA, CITIES_DATA } from '../../data/atlasData';
import { KnowledgeTrail, KnowledgeTrailStep, KnowledgeCity } from '../../types';
import { Compass, Sparkles, ArrowRight, BookOpen, CheckCircle, Play, Share2, Plus } from 'lucide-react';

interface DiscoverViewProps {
  onSelectTrail?: (trail: KnowledgeTrail) => void;
  onNavigateToCity?: (city: KnowledgeCity) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  onNavigateToCity,
}) => {
  const [activeTrail, setActiveTrail] = useState<KnowledgeTrail>(KNOWLEDGE_TRAILS_DATA[0]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep: KnowledgeTrailStep = activeTrail.steps[activeStepIndex] || activeTrail.steps[0];

  const handleStepClick = (index: number) => {
    setActiveStepIndex(index);
    const step = activeTrail.steps[index];
    if (step.cityName) {
      const city = CITIES_DATA.find((c) => c.name === step.cityName);
      if (city && onNavigateToCity) {
        onNavigateToCity(city);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>SIGNATURE DISCOVERY ENGINE</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Knowledge Trails
        </h1>
        <p className="text-sm text-white/70 max-w-xl font-light">
          Effortlessly learn through glowing spatial pathways that connect distant ideas across mathematics, history, and artificial intelligence.
        </p>
      </div>

      {/* Trail Selector Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        {KNOWLEDGE_TRAILS_DATA.map((trail) => {
          const isSelected = activeTrail.id === trail.id;
          return (
            <button
              key={trail.id}
              onClick={() => {
                setActiveTrail(trail);
                setActiveStepIndex(0);
              }}
              className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'border-amber-400 bg-amber-500/20 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                  : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: trail.color }}
              />
              <span>{trail.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Trail Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Glowing Vector Pathway */}
        <div className="lg:col-span-2 rounded-3xl border border-white/15 bg-gradient-to-br from-[#0c0f17] via-black to-[#090b12] p-6 md:p-8 space-y-8 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                ACTIVE EXPEDITION PATHWAY
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">{activeTrail.title}</h2>
            </div>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-mono font-bold text-amber-300 border border-amber-500/30">
              {activeStepIndex + 1} / {activeTrail.steps.length} Steps
            </span>
          </div>

          {/* Connected Step Nodes Chain */}
          <div className="space-y-4">
            {activeTrail.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`relative flex items-center gap-4 rounded-2xl border p-4 transition-all cursor-pointer ${
                    isActive
                      ? 'border-amber-400 bg-gradient-to-r from-amber-500/20 via-black/60 to-transparent text-white shadow-[0_0_25px_rgba(245,158,11,0.25)] scale-[1.01]'
                      : 'border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Step Number Badge */}
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl font-mono text-sm font-black shrink-0 ${
                      isActive
                        ? 'bg-amber-400 text-black shadow-lg'
                        : 'bg-white/10 text-white/60'
                    }`}
                  >
                    {idx + 1}
                  </div>

                  {/* Step Info */}
                  <div className="flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                        {step.category}
                      </span>
                      {step.cityName && (
                        <span className="text-[10px] font-mono text-white/40">
                          • {step.cityName}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                    <p className="text-xs text-white/70 line-clamp-1">{step.description}</p>
                  </div>

                  {/* Arrow or Active Check */}
                  {isActive ? (
                    <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-white/30 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Active Step Detail Card & AI Docent Notes */}
        <div className="rounded-3xl border border-white/15 bg-[#090c14] p-6 space-y-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>NODE EXPLORATION INSPECTOR</span>
            </div>

            <div className="space-y-2 border-b border-white/10 pb-4">
              <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-[10px] font-mono font-bold text-amber-300 border border-amber-500/30">
                Step {activeStepIndex + 1}: {activeStep.category}
              </span>
              <h3 className="text-2xl font-bold text-white">{activeStep.title}</h3>
              <p className="text-xs text-white/80 leading-relaxed">{activeStep.description}</p>
            </div>

            {/* AI Contextual Docent Note */}
            <div className="rounded-2xl border border-blue-500/30 bg-blue-950/20 p-4 space-y-2">
              <div className="text-[10px] font-mono font-bold text-blue-400 uppercase flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>AI DOCENT INSIGHT</span>
              </div>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                This node anchors the conceptual bridge between sovereign cryptography and fundamental mathematical logic. Exploring adjacent nodes reveals historical connections dating back to Bletchley Park.
              </p>
            </div>
          </div>

          {/* Navigation Action Buttons */}
          <div className="space-y-2 pt-4">
            {activeStepIndex < activeTrail.steps.length - 1 ? (
              <button
                onClick={() => handleStepClick(activeStepIndex + 1)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-bold text-black shadow-lg hover:bg-amber-400 transition-colors cursor-pointer"
              >
                <span>Proceed to Step {activeStepIndex + 2}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => handleStepClick(0)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-lg hover:bg-emerald-500 transition-colors cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Expedition Completed • Restart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
