import React from 'react';

interface AtlasLogoProps {
  size?: number;
  animated?: boolean;
  showText?: boolean;
  className?: string;
}

export const AtlasLogo: React.FC<AtlasLogoProps> = ({
  size = 32,
  animated = true,
  showText = true,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div 
        className="relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/20 via-indigo-600/30 to-amber-500/20 p-1.5 shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-white/15 backdrop-blur-md overflow-hidden group"
        style={{ width: size + 12, height: size + 12 }}
      >
        {/* Glow ambient background animation */}
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-amber-500/20 ${animated ? 'animate-pulse' : ''}`} />

        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-6"
        >
          {/* Outer Ring / Compass scale */}
          <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
          
          {/* Orbit Rings */}
          <ellipse cx="32" cy="32" rx="26" ry="10" stroke="url(#atlas-blue-grad)" strokeWidth="1.75" transform="rotate(-25 32 32)" opacity="0.85" />
          <ellipse cx="32" cy="32" rx="26" ry="10" stroke="url(#atlas-amber-grad)" strokeWidth="1.75" transform="rotate(35 32 32)" opacity="0.85" />
          
          {/* Center Globe Lat/Lng Grid lines */}
          <circle cx="32" cy="32" r="16" stroke="white" strokeOpacity="0.3" strokeWidth="1.2" />
          <line x1="16" y1="32" x2="48" y2="32" stroke="white" strokeOpacity="0.4" strokeWidth="1" />
          <line x1="32" y1="16" x2="32" y2="48" stroke="white" strokeOpacity="0.4" strokeWidth="1" />

          {/* Compass Pointer North Star / Knowledge Nexus */}
          <path d="M32 6 L35 25 L54 32 L35 39 L32 58 L29 39 L10 32 L29 25 Z" fill="url(#atlas-star-grad)" />

          {/* Glowing Constellation Nodes */}
          <circle cx="32" cy="32" r="3.5" fill="#60A5FA" />
          <circle cx="32" cy="32" r="6" stroke="#93C5FD" strokeOpacity="0.6" strokeWidth="1" className={animated ? 'animate-ping' : ''} />
          <circle cx="18" cy="20" r="2" fill="#F59E0B" />
          <circle cx="46" cy="44" r="2" fill="#10B981" />
          <circle cx="48" cy="20" r="1.8" fill="#EC4899" />
          <circle cx="16" cy="44" r="1.8" fill="#3B82F6" />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="atlas-blue-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60A5FA" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="atlas-amber-grad" x1="64" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="atlas-star-grad" x1="10" y1="6" x2="54" y2="58" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.5" stopColor="#93C5FD" />
              <stop offset="1" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-[0.2em] text-white font-mono bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-blue-300">
            ATLAS
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-blue-300/80 font-mono -mt-0.5">
            Knowledge Map
          </span>
        </div>
      )}
    </div>
  );
};
