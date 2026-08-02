import React, { useState } from 'react';
import { AtlasLogo } from './AtlasLogo';
import { Search, Sparkles, Globe, Compass } from 'lucide-react';
import { AppMode } from '../types';

interface HeaderProps {
  appMode: AppMode;
  setAppMode: (mode: AppMode) => void;
  onSearch: (query: string) => void;
  onOpenInvestorTour?: () => void;
  onOpenAiGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  appMode,
  setAppMode,
  onSearch,
  onOpenAiGuide,
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050505]/90 backdrop-blur-xl px-3 sm:px-4 py-2.5 transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo */}
        <button
          onClick={() => setAppMode('app')}
          className="flex items-center text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-xl shrink-0"
        >
          <AtlasLogo size={26} showText={true} />
        </button>

        {/* Center: Search Bar (Desktop / Tablet) */}
        <form
          onSubmit={handleSubmit}
          className="relative flex-1 max-w-md hidden md:flex items-center mx-2"
        >
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, cities, or questions..."
              className="w-full rounded-full border border-white/15 bg-white/5 py-2 pl-10 pr-12 text-xs text-white placeholder-white/40 focus:border-blue-500/80 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all shadow-inner"
            />
            {query && (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-semibold text-white hover:bg-blue-500 transition-colors"
              >
                Go
              </button>
            )}
          </div>
        </form>

        {/* Right: Action Buttons (Fits screens properly) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiGuide}
            title="AI Assistant"
            className="flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-blue-200 shadow-[0_0_12px_rgba(59,130,246,0.2)] hover:border-blue-400 hover:bg-blue-500/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse shrink-0" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* View Mode Switcher: App vs Vision Page */}
          <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1 text-xs">
            <button
              onClick={() => setAppMode('app')}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-all ${
                appMode === 'app'
                  ? 'bg-blue-600 font-semibold text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Map</span>
            </button>

            <button
              onClick={() => setAppMode('landing')}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-all ${
                appMode === 'landing'
                  ? 'bg-blue-600 font-semibold text-white shadow-md'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Vision</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Input */}
      <div className="mt-2 block md:hidden">
        <form onSubmit={handleSubmit} className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, cities, or questions..."
            className="w-full rounded-full border border-white/15 bg-white/5 py-1.5 pl-10 pr-4 text-xs text-white placeholder-white/40 focus:border-blue-500/80 focus:bg-white/10 focus:outline-none"
          />
        </form>
      </div>
    </header>
  );
};
