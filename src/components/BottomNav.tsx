import React from 'react';
import { NavTab } from '../types';
import { Globe, Compass, Sparkles, Bookmark, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'world', label: 'World', icon: <Globe className="w-5 h-5" /> },
    { id: 'explore', label: 'Explore', icon: <Compass className="w-5 h-5" /> },
    { id: 'discover', label: 'Discover', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'saved', label: 'Saved', icon: <Bookmark className="w-5 h-5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pt-2 pointer-events-none">
      <div className="mx-auto max-w-lg pointer-events-auto rounded-full border border-white/15 bg-[#080b12]/90 p-1.5 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-white scale-105'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {/* Glowing background pill for active tab */}
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-blue-600/35 border border-blue-400/60 shadow-[0_0_15px_rgba(59,130,246,0.5)] -z-10" />
              )}
              {tab.icon}
              <span className="text-[10px] font-mono tracking-wider">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
