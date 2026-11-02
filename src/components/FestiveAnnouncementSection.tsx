import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  Phone,
  Copy,
  Check,
  MapPin,
  Calendar,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { FESTIVE_ANNOUNCEMENT_DATA } from '../data/festiveAnnouncement';
import { buildWhatsAppUrl } from '../config/site';

export const FestiveAnnouncementSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleOpenModal = () => {
    window.dispatchEvent(new CustomEvent('open-festive-announcement'));
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(FESTIVE_ANNOUNCEMENT_DATA.fullFormattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const bookingMessage = `Hi Sikkim Tour Co., I want to book the Christmas & December Special Limited-Period Offer for ₹9,999/- per person covering the 11 attractions (Tsomgo Lake, Nathula Pass, Baba Mandir, Tashi View Point, etc.). Please share available dates and booking details!`;
  const whatsappUrl = buildWhatsAppUrl(bookingMessage);

  return (
    <section
      id="festive-offer-announcement"
      className="relative z-10 py-12 sm:py-16 text-white overflow-hidden border-y-2 border-amber-500/40 bg-gradient-to-r from-[#170505] via-[#0b241c] to-[#04120e] shadow-2xl"
      aria-label="Christmas & December Special Offer Announcement"
    >
      {/* Festive ambient background aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-900/60 via-amber-800/50 to-emerald-900/60 border border-amber-400/50 text-xs text-amber-200 font-mono tracking-wider uppercase shadow-lg">
            <span>🎄</span>
            <span className="font-bold">Exclusive December &amp; Christmas Announcement</span>
            <span>❄️</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight drop-shadow-md">
            Christmas &amp; December Special: Winter Escape
          </h2>

          <p className="text-xs sm:text-sm text-stone-200 max-w-2xl mx-auto leading-relaxed">
            {FESTIVE_ANNOUNCEMENT_DATA.heroPitch}
          </p>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Column 1: Original Promotional Poster (Click to expand announcement) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onClick={handleOpenModal}
              className="group relative rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-black shadow-[0_10px_35px_rgba(0,0,0,0.8)] cursor-pointer hover:border-amber-400 hover:scale-[1.01] transition-all duration-300 max-w-md w-full"
            >
              <img
                src="/christmas-december-special.jpg"
                alt="Christmas & December Special Offer - ₹9,999/- per person (Tsomgo Lake, Nathula Pass, Baba Mandir)"
                className="w-full h-auto object-cover select-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                <span className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-2 shadow-xl">
                  <span>Open Full Announcement &amp; 11 Spots</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-stone-400 mt-2">
              Official Sikkim Tour Co. Festive Promotional Poster
            </span>
          </div>

          {/* Column 2: Offer Pitch, 11 Sights & Quick CTAs */}
          <div className="lg:col-span-7 space-y-5">
            {/* Price Ribbon Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-[#0b2921] to-emerald-950/60 border border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold block">
                  Limited-Period Winter Special
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="line-through text-stone-400 text-sm sm:text-base font-semibold">
                    {FESTIVE_ANNOUNCEMENT_DATA.originalPrice}
                  </span>
                  <span className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-300 drop-shadow">
                    {FESTIVE_ANNOUNCEMENT_DATA.specialPrice}
                  </span>
                  <span className="text-xs text-stone-300 uppercase font-mono">
                    / person
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Book for ₹9,999/-</span>
                </a>

                <button
                  onClick={handleCopyText}
                  title="Copy full announcement text to clipboard"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-amber-200" />
                  )}
                </button>
              </div>
            </div>

            {/* 11 Sightseeing Attractions Grid Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                <span className="font-bold uppercase tracking-wider">
                  11 Curated Himalayan Sights Included:
                </span>
                <button
                  onClick={handleOpenModal}
                  className="hover:underline flex items-center gap-1 text-[11px] text-amber-200 cursor-pointer"
                >
                  <span>View All Descriptions</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {FESTIVE_ANNOUNCEMENT_DATA.attractions.map((spot) => (
                  <div
                    key={spot.id}
                    onClick={handleOpenModal}
                    className="p-2 sm:p-2.5 rounded-xl bg-[#09221b] border border-white/10 hover:border-amber-400/50 transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="text-base shrink-0">{spot.icon}</span>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-white group-hover:text-amber-200 transition-colors block truncate">
                        {spot.name}
                      </span>
                      <span className="text-[9px] font-mono text-stone-400 block truncate">
                        {spot.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why December Highlights & Action Buttons */}
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300">
                <span className="text-emerald-400 font-bold">❄️ Highlights:</span>
                <span>Snow-covered peaks</span>
                <span>•</span>
                <span>Scenic waterfalls</span>
                <span>•</span>
                <span>Peaceful monasteries</span>
                <span>•</span>
                <span>Festive MG Marg decor</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Read Full Announcement &amp; Sightseeing Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`tel:${FESTIVE_ANNOUNCEMENT_DATA.contactNumber}`}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Call {FESTIVE_ANNOUNCEMENT_DATA.contactDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
