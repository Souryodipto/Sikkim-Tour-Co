import React, { useState, useEffect } from 'react';
import { Compass, Mountain, ChevronDown, ChevronUp, MapPin, Eye, EyeOff } from 'lucide-react';

interface ExpeditionHUDProps {
  scrollProgress: number; // 0.0 to 1.0
  activeZoneName: string;
  activeElevation: string;
  elevationFt: number;
  isSnowActive: boolean;
  onToggleSnow: () => void;
  onJumpToSection?: (sectionId: string) => void;
}

export const ExpeditionHUD: React.FC<ExpeditionHUDProps> = ({
  scrollProgress,
  activeZoneName,
  activeElevation,
  elevationFt,
  isSnowActive,
  onToggleSnow,
  onJumpToSection,
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const percentScrolled = Math.min(Math.round(scrollProgress * 100), 100);

  // Determine altitude zone color
  const getZoneColor = () => {
    if (scrollProgress < 0.25) return 'text-emerald-300';
    if (scrollProgress < 0.5) return 'text-sky-200';
    if (scrollProgress < 0.75) return 'text-cyan-300';
    return 'text-[#EBA94B]';
  };

  const checkpoints = [
    { label: 'Basecamp', targetPercent: 0, id: 'hero-section', elevation: '5,500 ft' },
    { label: 'Dzongri', targetPercent: 25, id: 'packages-section', elevation: '12,500 ft' },
    { label: 'Goecha La', targetPercent: 55, id: 'destinations-section', elevation: '16,200 ft' },
    { label: 'High Pass', targetPercent: 80, id: 'reviews-section', elevation: '22,000 ft' },
    { label: 'Summit', targetPercent: 100, id: 'footer-section', elevation: '28,169 ft' },
  ];

  return (
    <aside
      aria-label="Expedition Altimeter and Navigation HUD"
      className="fixed bottom-6 right-4 sm:right-6 z-40 select-none transition-all duration-300 pointer-events-auto"
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0A2621]/90 hover:bg-[#103D35] backdrop-blur-xl border border-[#EBA94B]/50 text-white shadow-2xl hover:scale-105 transition-all cursor-pointer"
          title="Expand Himalayan Expedition Altimeter"
          aria-label="Expand Altimeter"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Mountain className="w-4 h-4 text-[#EBA94B]" />
          <span className="font-mono text-xs font-bold tracking-wider text-white">
            {elevationFt.toLocaleString()} ft
          </span>
          <span className="text-[10px] text-white/60">({percentScrolled}%)</span>
          <ChevronUp className="w-3.5 h-3.5 text-[#EBA94B]" />
        </button>
      ) : (
        <div className="w-72 sm:w-80 rounded-2xl bg-[#0A2621]/92 backdrop-blur-xl border border-[#EBA94B]/40 shadow-[0_20px_50px_rgba(0,0,0,0.65)] p-4 text-white text-xs transition-all">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/15">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <Compass className="w-4 h-4 text-[#EBA94B]" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#EBA94B]">
                Himalayan Altimeter
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Snow Toggle Button */}
              <button
                onClick={onToggleSnow}
                className={`p-1.5 rounded-lg border text-[10px] transition-all cursor-pointer ${
                  isSnowActive
                    ? 'bg-white/15 border-white/30 text-white hover:bg-white/25'
                    : 'bg-black/40 border-white/10 text-white/40 hover:text-white/70'
                }`}
                title={isSnowActive ? 'Pause Alpine Snowfall' : 'Enable Alpine Snowfall'}
                aria-label="Toggle Snowfall"
              >
                ❄️
              </button>

              {/* Minimize Button */}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white/15 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Minimize Altimeter"
                aria-label="Minimize Altimeter"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Live Dynamic Elevation Display */}
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-white/60">
                Current Elevation
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className={`font-mono text-2xl font-black tracking-tight ${getZoneColor()}`}>
                  {elevationFt.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-white/70">ft</span>
                <span className="text-[10px] text-white/50 font-mono">
                  ({Math.round(elevationFt * 0.3048).toLocaleString()}m)
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2 py-0.5 rounded-full bg-black/50 border border-white/20 font-mono text-[10px] font-bold text-[#EBA94B]">
                {percentScrolled}% to Summit
              </span>
            </div>
          </div>

          {/* Active Vista Tag */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/45 border border-white/15 mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#EBA94B] shrink-0" />
            <span className="font-serif font-bold text-white tracking-wide truncate">
              {activeZoneName}
            </span>
          </div>

          {/* Continuous Scroll Ascent Progress Meter */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-white/60">
              <span>Basecamp (5,500 ft)</span>
              <span>Summit (28,169 ft)</span>
            </div>

            <div className="relative w-full h-2 rounded-full bg-black/60 overflow-hidden border border-white/20">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-[#EBA94B] transition-all duration-150 ease-out"
                style={{ width: `${percentScrolled}%` }}
              />
            </div>
          </div>

          {/* Checkpoint Jump Links */}
          <div className="grid grid-cols-5 gap-1 mt-3 pt-2.5 border-t border-white/15 text-center">
            {checkpoints.map((cp) => {
              const isPassed = percentScrolled >= cp.targetPercent;
              return (
                <button
                  key={cp.label}
                  onClick={() => onJumpToSection && onJumpToSection(cp.id)}
                  className={`py-1 rounded text-[9px] font-mono transition-all cursor-pointer ${
                    isPassed
                      ? 'bg-white/15 text-[#EBA94B] font-bold border border-[#EBA94B]/40'
                      : 'text-white/50 hover:text-white hover:bg-white/10'
                  }`}
                  title={`Jump to ${cp.label} (${cp.elevation})`}
                >
                  {cp.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
};
