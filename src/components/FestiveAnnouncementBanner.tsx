import React, { useState } from 'react';
import { Sparkles, ArrowRight, X, MessageSquare } from 'lucide-react';
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

  return (
    <div
      onClick={handleOpenAnnouncement}
      className="relative z-40 bg-gradient-to-r from-[#7f1d1d] via-[#92400e] to-[#14532d] text-white border-b border-amber-400/40 cursor-pointer group shadow-md"
      role="banner"
      aria-label="Christmas & December Special Offer Announcement"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="text-sm shrink-0">🎄</span>
          <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-200 shrink-0">
            Christmas &amp; December Special:
          </span>
          <span className="line-through text-stone-300 text-[11px] hidden md:inline">
            {FESTIVE_ANNOUNCEMENT_DATA.originalPrice}
          </span>
          <span className="font-bold text-amber-300 text-xs sm:text-sm drop-shadow shrink-0">
            {FESTIVE_ANNOUNCEMENT_DATA.specialPrice}
          </span>
          <span className="text-[10px] sm:text-[11px] text-white/90 truncate hidden sm:inline">
            · Tsomgo Lake, Nathula Pass, Baba Mandir &amp; 8 More Attractions
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleOpenAnnouncement}
            className="px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 transition-all border border-white/20 group-hover:border-amber-300 cursor-pointer"
          >
            <span>View 11 Spots &amp; Details</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleDismiss}
            aria-label="Dismiss festive announcement banner"
            className="p-1 text-white/70 hover:text-white rounded-full hover:bg-black/20 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
