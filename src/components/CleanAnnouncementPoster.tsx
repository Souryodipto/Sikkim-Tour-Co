import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Calendar,
  MapPin,
  Car,
  Phone,
  MessageSquare,
  ArrowRight,
  Flame,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react';
import { FESTIVE_ANNOUNCEMENT_DATA } from '../data/festiveAnnouncement';
import { buildWhatsAppUrl } from '../config/site';

interface CleanAnnouncementPosterProps {
  interactive?: boolean;
  onOpenDetails?: () => void;
  className?: string;
}

export const CleanAnnouncementPoster: React.FC<CleanAnnouncementPosterProps> = ({
  interactive = false,
  onOpenDetails,
  className = '',
}) => {
  const bookingMessage = `Hi Sikkim Tour Co., I want to book the Christmas & December Special Limited-Period Offer for ₹9,999/- per person covering the 11 attractions (Tsomgo Lake, Nathula Pass, Baba Mandir, etc.). Please share available dates and booking details!`;
  const whatsappUrl = buildWhatsAppUrl(bookingMessage);

  return (
    <div
      onClick={interactive && onOpenDetails ? onOpenDetails : undefined}
      className={`group relative w-full max-w-lg mx-auto bg-white text-[#102b23] rounded-3xl p-5 sm:p-7 border-2 border-[#d97706]/40 shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_30px_rgba(255,255,255,0.15)] ring-1 ring-amber-400/30 overflow-hidden select-none flex flex-col justify-between transition-all duration-300 ${
        interactive
          ? 'cursor-pointer hover:shadow-[0_25px_70px_rgba(217,119,6,0.25)] hover:scale-[1.01] hover:border-[#b45309]'
          : ''
      } ${className}`}
    >
      {/* Editorial Decorative Corner Brackets in Gold */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-500/70 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-500/70 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-500/70 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-500/70 pointer-events-none" />

      {/* Subtle Alpine Frost Vignette Background */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-amber-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP BRAND HEADER & URGENCY CLICK-MAGNET TAG */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2.5 pb-3.5 border-b border-stone-200">
        {/* Brand Bar */}
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Sikkim Tour Co."
            className="w-10 h-10 rounded-full bg-white object-cover border-2 border-amber-500/70 shadow-sm"
          />
          <div className="text-left">
            <span className="font-serif text-base sm:text-lg font-extrabold tracking-wider text-[#0c3127] block leading-tight">
              SIKKIM TOUR CO.
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-[#b45309] font-bold uppercase block">
              Official Gangtok Mountain Desk
            </span>
          </div>
        </div>

        {/* Pulsing Click-Attracting Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-red-50 via-amber-50 to-emerald-50 border border-red-300/80 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-red-700 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          <span>🎄 Christmas &amp; December Special · Save 47%</span>
        </div>
      </div>

      {/* 2. MAIN EDITORIAL HEADLINE */}
      <div className="relative z-10 text-center my-3 sm:my-4 space-y-1">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#b45309] font-bold block">
          Your Winter Escape to the Himalayas
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0c3127] tracking-tight leading-tight">
          Snowy Peaks, Alpine Lakes &amp; Festive Wonders
        </h3>
        <p className="text-[11px] sm:text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
          Escape to magical Gangtok, Nathula Pass, and Tsomgo Lake with verified 4x4 mountain vehicles and full permit paperwork.
        </p>
      </div>

      {/* 3. HERO PRICE CALLOUT (THE PRIMARY CLICK MAGNET) */}
      <div className="relative z-10 my-2.5 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0c392c] via-[#082a20] to-[#041711] text-white border-2 border-amber-400 shadow-xl text-center space-y-1 group-hover:border-amber-300 transition-all">
        <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
          <span>Exclusive Limited-Period Offer</span>
          <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-pulse" />
        </div>

        <div className="flex items-baseline justify-center gap-3 pt-0.5">
          <span className="line-through text-stone-400 text-sm sm:text-base font-semibold">
            {FESTIVE_ANNOUNCEMENT_DATA.originalPrice}
          </span>
          <span className="text-3xl sm:text-5xl font-serif font-black text-amber-300 drop-shadow-[0_2px_15px_rgba(251,191,36,0.6)]">
            {FESTIVE_ANNOUNCEMENT_DATA.specialPrice}
          </span>
          <span className="text-xs text-stone-200 uppercase font-mono tracking-wider font-bold">
            / person
          </span>
        </div>

        <div className="pt-1 flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-emerald-300 font-medium">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>11 Curated Attractions Included · Dedicated 4x4 Vehicle</span>
        </div>
      </div>

      {/* 4. DESTINATION HIGHLIGHTS IN CLEAN CRISP TILES */}
      <div className="relative z-10 my-2.5 space-y-2">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-stone-600 font-bold px-1">
          <span>Top Frontier Sightseeing:</span>
          <span className="text-amber-700 font-bold">All 11 Spots Included</span>
        </div>

        {/* 3 Top Alpine Frontiers */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-500/50 transition-colors flex flex-col items-center">
            <span className="text-base sm:text-lg">💙</span>
            <span className="text-[11px] sm:text-xs font-bold text-[#0c3127] mt-0.5 truncate w-full">
              Tsomgo Lake
            </span>
            <span className="text-[9px] font-mono text-emerald-700 font-bold">12,310 ft</span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-500/50 transition-colors flex flex-col items-center">
            <span className="text-base sm:text-lg">🏔️</span>
            <span className="text-[11px] sm:text-xs font-bold text-[#0c3127] mt-0.5 truncate w-full">
              Nathula Pass
            </span>
            <span className="text-[9px] font-mono text-emerald-700 font-bold">14,140 ft</span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-amber-500/50 transition-colors flex flex-col items-center">
            <span className="text-base sm:text-lg">🙏</span>
            <span className="text-[11px] sm:text-xs font-bold text-[#0c3127] mt-0.5 truncate w-full">
              Baba Mandir
            </span>
            <span className="text-[9px] font-mono text-emerald-700 font-bold">Spiritual</span>
          </div>
        </div>

        {/* + 8 Sights Banner */}
        <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[10px] sm:text-[11px] text-stone-700 text-center leading-relaxed">
          <strong className="text-amber-900">+ 8 More Gangtok Sights: </strong>
          Tashi View Point · Hanuman Tok · Banjhakri Falls · Bakthang Falls · Orchid Show · Ganesh Tok · MG Marg · Lal Bazaar
        </div>
      </div>

      {/* 5. TRUST BADGES */}
      <div className="relative z-10 pt-2 pb-2.5 border-t border-stone-200 grid grid-cols-2 gap-2 text-[10px] text-stone-600 font-medium">
        <div className="flex items-center gap-1.5 text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Indian Army Permits Handled</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-800">
          <Car className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>High-Ground 4x4 Mountain Fleet</span>
        </div>
      </div>

      {/* 6. HIGH-CONVERTING CALL TO ACTION BUTTON (CLICK MAGNET) */}
      <div className="relative z-10 pt-1 space-y-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_25px_rgba(37,211,102,0.6)] transition-all cursor-pointer text-center"
        >
          <MessageSquare className="w-4 h-4 fill-black shrink-0" />
          <span>Book for ₹9,999/- on WhatsApp</span>
          <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="flex items-center justify-between gap-2 text-xs">
          <a
            href={`tel:${FESTIVE_ANNOUNCEMENT_DATA.contactNumber}`}
            className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#0c3127] font-bold text-[11px] flex items-center justify-center gap-1.5 border border-stone-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-amber-600" />
            <span>Call: +91 7001846727</span>
          </a>

          {onOpenDetails && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetails();
              }}
              className="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-[11px] flex items-center gap-1 border border-amber-300 transition-colors cursor-pointer"
            >
              <span>11 Spots Details</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Footer Assurance Tag */}
      <div className="relative z-10 text-[9px] text-stone-500 text-center pt-2 font-mono">
        ⚡ High-season departures filling fast · Direct Gangtok Concierge
      </div>
    </div>
  );
};
