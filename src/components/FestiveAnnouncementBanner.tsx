import React, { useState } from 'react';
import { ArrowRight, X, MapPin } from 'lucide-react';
import { FESTIVE_ANNOUNCEMENT_DATA } from '../data/festiveAnnouncement';

export const FestiveAnnouncementBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('sikkim_festive_banner_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  if (isDismissed) return null;

  const handleOpenAnnouncement = () => {
    window.dispatchEvent(new CustomEvent('open-festive-announcement'));
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDismissed(true);
    try {
      sessionStorage.setItem('sikkim_festive_banner_dismissed', 'true');
    } catch {
      // Ignore in restricted storage mode
    }
  };

  const placesList = FESTIVE_ANNOUNCEMENT_DATA.attractions.map((a) => a.name).join(' · ');

  return (
    <div
      onClick={handleOpenAnnouncement}
      className="relative z-40 bg-white text-[#0c3127] border-b border-stone-200 shadow-xs cursor-pointer group select-none transition-colors hover:bg-stone-50"
      role="banner"
      aria-label="Christmas & December Special Offer Announcement with Places Covering"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-3 text-xs">
        {/* Left: Festive tag & price */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-sm">🎄</span>
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#b45309]">
            December Special:
          </span>
          <span className="line-through text-stone-400 text-[11px] hidden sm:inline">
            {FESTIVE_ANNOUNCEMENT_DATA.originalPrice}
          </span>
          <span className="font-black text-[#0c3127] text-xs sm:text-sm">
            {FESTIVE_ANNOUNCEMENT_DATA.specialPrice}
          </span>
        </div>

        {/* Center: PLACES NAME COVERING (Explicitly requested by user) */}
        <div className="flex-1 overflow-hidden min-w-0 flex items-center gap-1.5 text-[11px] text-stone-700">
          <span className="font-mono text-[10px] uppercase font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
            Places Covering:
          </span>
          <span className="truncate font-medium text-stone-800">
            {placesList}
          </span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenAnnouncement}
            className="px-2.5 py-1 rounded-full bg-[#0c3127] hover:bg-[#154a3b] text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
          >
            <span>View 11 Places</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss festive announcement banner"
            className="p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
