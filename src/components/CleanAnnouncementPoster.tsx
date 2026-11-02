import React from 'react';
import {
  Compass,
  Mountain,
  Sparkles,
  ShieldCheck,
  Calendar,
  MapPin,
  Car,
  Phone,
  MessageSquare,
  Award,
  CheckCircle2,
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
      className={`relative w-full max-w-lg mx-auto bg-gradient-to-b from-[#061c16] via-[#092920] to-[#04110d] text-white rounded-3xl p-5 sm:p-7 border-2 border-amber-400/40 shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden select-none flex flex-col justify-between ${
        interactive ? 'cursor-pointer hover:border-amber-400 hover:shadow-[0_20px_60px_rgba(217,119,6,0.3)] transition-all duration-300' : ''
      } ${className}`}
    >
      {/* Editorial Decorative Corner Accents */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber-400/60 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-amber-400/60 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-amber-400/60 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber-400/60 pointer-events-none" />

      {/* Atmospheric Ambient Snow Glow */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP BRAND & FESTIVE BADGE */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-2.5 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo.png"
            alt="Sikkim Tour Co."
            className="w-10 h-10 rounded-full bg-white object-cover border border-amber-400/70 shadow-md"
          />
          <div className="text-left">
            <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-white block leading-tight">
              SIKKIM TOUR CO.
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-amber-300 uppercase block">
              Gangtok Mountain Operations Desk
            </span>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-950/80 via-amber-900/60 to-emerald-950/80 border border-amber-400/50 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-amber-200 shadow-inner">
          <span>🎄</span>
          <span>Christmas &amp; December Limited Special</span>
          <span>❄️</span>
        </div>
      </div>

      {/* 2. HERO CAMPAIGN TITLE */}
      <div className="relative z-10 text-center my-4 space-y-1.5">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-amber-300 font-semibold block">
          Winter Escape to the Himalayas
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
          Snowy Peaks, Alpine Lakes &amp; Festive Wonders
        </h3>
        <p className="text-[11px] sm:text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
          Experience Gangtok and the high Himalayan frontier in peak winter beauty with dedicated mountain chauffeurs and permits handled.
        </p>
      </div>

      {/* 3. CENTERPIECE: CLEAN LUXURY PRICE BADGE */}
      <div className="relative z-10 my-3 p-4 rounded-2xl bg-gradient-to-r from-black/50 via-[#0b2921] to-black/50 border-2 border-amber-400/60 shadow-xl text-center space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400 font-bold block">
          Exclusive Limited-Period Offer
        </span>
        <div className="flex items-baseline justify-center gap-3">
          <span className="line-through text-stone-400 text-sm sm:text-base font-semibold">
            {FESTIVE_ANNOUNCEMENT_DATA.originalPrice}
          </span>
          <span className="text-3xl sm:text-4xl font-serif font-black text-amber-300 drop-shadow-[0_2px_12px_rgba(251,191,36,0.4)]">
            {FESTIVE_ANNOUNCEMENT_DATA.specialPrice}
          </span>
          <span className="text-xs text-stone-300 uppercase font-mono tracking-wider">
            / person
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-emerald-300 font-mono tracking-wide">
          ★ Handcrafted 11-Destination Itinerary · No Hidden Driver Surcharges
        </p>
      </div>

      {/* 4. THREE HERO SIGHTS + SIGHTSEEING CIRCUIT TAGS */}
      <div className="relative z-10 my-3 space-y-2.5">
        <div className="text-[10px] font-mono tracking-wider uppercase text-amber-300 text-center font-bold">
          Key Destinations &amp; Sights Included
        </div>

        {/* 3 Iconic Frontiers */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
            <span className="text-base">💙</span>
            <span className="text-[11px] font-bold text-white mt-0.5 truncate w-full">Tsomgo Lake</span>
            <span className="text-[9px] font-mono text-emerald-300">12,310 ft</span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
            <span className="text-base">🏔️</span>
            <span className="text-[11px] font-bold text-white mt-0.5 truncate w-full">Nathula Pass</span>
            <span className="text-[9px] font-mono text-emerald-300">14,140 ft</span>
          </div>

          <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center">
            <span className="text-base">🙏</span>
            <span className="text-[11px] font-bold text-white mt-0.5 truncate w-full">Baba Mandir</span>
            <span className="text-[9px] font-mono text-emerald-300">Spiritual</span>
          </div>
        </div>

        {/* + 8 Sightseeing Highlights Pill */}
        <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-[10px] text-stone-300 text-center leading-relaxed">
          <span className="text-amber-200 font-semibold">+ 8 More Attractions: </span>
          Tashi View Point • Hanuman Tok • Banjhakri Falls • Bakthang Falls • Orchid Show • Ganesh Tok • MG Marg • Lal Bazaar
        </div>
      </div>

      {/* 5. VERIFIED INCLUSIONS PILLS */}
      <div className="relative z-10 pt-2 pb-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[10px] text-stone-300">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>Army Permit Pre-Coordination</span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400">
          <Car className="w-3.5 h-3.5 shrink-0" />
          <span>Dedicated 4x4 Mountain Fleet</span>
        </div>
      </div>

      {/* 6. BOTTOM ACTION BAR */}
      <div className="relative z-10 pt-2 flex items-center justify-between gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-black" />
          <span>Book for ₹9,999/-</span>
        </a>

        <a
          href={`tel:${FESTIVE_ANNOUNCEMENT_DATA.contactNumber}`}
          className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-1 border border-white/20 transition-all"
        >
          <Phone className="w-3.5 h-3.5 text-amber-300" />
          <span>+91 7001846727</span>
        </a>
      </div>

      {/* Micro Disclaimer */}
      <div className="relative z-10 text-[9px] text-stone-400 text-center pt-2 font-mono">
        *Permits &amp; high passes subject to weather and official Army clearances.
      </div>
    </div>
  );
};
