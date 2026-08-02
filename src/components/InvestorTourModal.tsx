import React, { useState } from 'react';
import { INVESTOR_SLIDES } from '../data/atlasData';
import { X, ChevronLeft, ChevronRight, Play, Pause, Sparkles, Award, Globe, Navigation, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InvestorTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFlyToCoordinates?: (lat: number, lng: number) => void;
}

export const InvestorTourModal: React.FC<InvestorTourModalProps> = ({
  isOpen,
  onClose,
  onFlyToCoordinates,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const currentSlide = INVESTOR_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < INVESTOR_SLIDES.length - 1) {
      const nextIndex = currentSlideIndex + 1;
      setCurrentSlideIndex(nextIndex);
      const target = INVESTOR_SLIDES[nextIndex].cameraFocus;
      onFlyToCoordinates?.(target.lat, target.lng);

      if (nextIndex === INVESTOR_SLIDES.length - 1) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      const prevIndex = currentSlideIndex - 1;
      setCurrentSlideIndex(prevIndex);
      const target = INVESTOR_SLIDES[prevIndex].cameraFocus;
      onFlyToCoordinates?.(target.lat, target.lng);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-amber-500/30 bg-[#080b12] shadow-[0_0_80px_rgba(245,158,11,0.25)] flex flex-col max-h-[90vh]">
        {/* Top Keynote Banner Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-gradient-to-r from-amber-500/10 via-black to-blue-500/10">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
                {currentSlide.badge}
              </div>
              <h2 className="text-sm font-bold text-white tracking-wide">
                ATLAS SEED INVESTMENT PRESENTATION
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Main Slide Title & Subtitle */}
          <div className="space-y-2 border-b border-white/10 pb-6">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-amber-200">
              {currentSlide.title}
            </h1>
            <p className="text-lg text-white/80 font-light">{currentSlide.subtitle}</p>
          </div>

          {/* Key Metrics Banner */}
          {currentSlide.metrics && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentSlide.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md space-y-1"
                >
                  <div className="text-2xl font-black text-amber-400 font-mono">{m.value}</div>
                  <div className="text-xs font-bold text-white">{m.label}</div>
                  <div className="text-[11px] text-white/50">{m.detail}</div>
                </div>
              ))}
            </div>
          )}

          {/* Key Points Bullet List */}
          <div className="space-y-3 bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Executive Highlights</span>
            </h3>
            <ul className="space-y-3">
              {currentSlide.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white/90 leading-relaxed">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/20 text-[11px] font-bold text-amber-400 font-mono shrink-0">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quote block if available */}
          {currentSlide.quote && (
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent p-5 text-center">
              <p className="text-base font-serif italic text-amber-200">{currentSlide.quote}</p>
            </div>
          )}
        </div>

        {/* Keynote Navigation Controls Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-black/60 px-6 py-4 backdrop-blur-md">
          {/* Progress Indicator Dots */}
          <div className="flex items-center gap-2">
            {INVESTOR_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentSlideIndex(idx);
                  onFlyToCoordinates?.(s.cameraFocus.lat, s.cameraFocus.lng);
                }}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === currentSlideIndex
                    ? 'w-8 bg-amber-400'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          {/* Next / Prev Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white disabled:opacity-30 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === INVESTOR_SLIDES.length - 1}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 text-xs font-bold text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] disabled:opacity-40 hover:from-amber-400 hover:to-orange-400 transition-all cursor-pointer"
            >
              <span>{currentSlideIndex === INVESTOR_SLIDES.length - 1 ? 'Finish Tour' : 'Next Slide'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
