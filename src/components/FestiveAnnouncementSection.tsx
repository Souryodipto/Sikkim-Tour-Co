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
import { CleanAnnouncementPoster } from './CleanAnnouncementPoster';

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

  const placesList = FESTIVE_ANNOUNCEMENT_DATA.attractions.map((a) => a.name).join(' · ');

  return (
    <section
      id="festive-offer-announcement"
      className="relative z-10 py-12 sm:py-16 text-[#0c3127] bg-white border-y border-stone-200 shadow-sm"
      aria-label="Christmas & December Special Offer Announcement"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Badges & Heading */}
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-100 border border-stone-300 text-xs text-[#0c3127] font-mono tracking-wider uppercase shadow-xs">
            <span>🎄</span>
            <span className="font-bold">December &amp; Christmas Special Announcement</span>
            <span>❄️</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0c3127] tracking-tight">
            Christmas &amp; December Special: Winter Escape
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {FESTIVE_ANNOUNCEMENT_DATA.heroPitch}
          </p>

          {/* Explicit Header Bar: PLACES NAME COVERING */}
          <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center space-y-1">
            <span className="font-mono text-[11px] uppercase tracking-wider font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full inline-block">
              Places Name Covering:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-[#0c3127] leading-relaxed">
              {placesList}
            </p>
          </div>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Column 1: Clean White Digital Announcement Poster */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <CleanAnnouncementPoster interactive={true} onOpenDetails={handleOpenModal} />
            <span className="font-mono text-[10px] text-stone-500 mt-2 text-center">
              Tap poster to view full 11-sightseeing breakdown &amp; permit details
            </span>
          </div>

          {/* Column 2: Offer Pitch, 11 Sights & Quick CTAs */}
          <div className="lg:col-span-7 space-y-5">
            {/* Price Ribbon Card in Clean White & Slate */}
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#b45309] font-bold block">
                  Limited-Period Winter Special
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="line-through text-stone-400 text-sm sm:text-base font-semibold">
                    {FESTIVE_ANNOUNCEMENT_DATA.originalPrice}
                  </span>
                  <span className="text-3xl sm:text-4xl font-serif font-black text-[#0c3127]">
                    {FESTIVE_ANNOUNCEMENT_DATA.specialPrice}
                  </span>
                  <span className="text-xs text-stone-600 uppercase font-mono font-bold">
                    / person
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>Book for ₹9,999/-</span>
                </a>

                <button
                  onClick={handleCopyText}
                  title="Copy full announcement text to clipboard"
                  className="p-3 rounded-xl bg-white hover:bg-stone-100 text-[#0c3127] border border-stone-300 transition-all cursor-pointer shrink-0 shadow-xs"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-[#0c3127]" />
                  )}
                </button>
              </div>
            </div>

            {/* 11 Sightseeing Attractions Grid Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#0c3127]">
                <span className="font-bold uppercase tracking-wider">
                  11 Curated Himalayan Places Covering:
                </span>
                <button
                  onClick={handleOpenModal}
                  className="hover:underline flex items-center gap-1 text-[11px] text-[#b45309] font-bold cursor-pointer"
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
                    className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-[#0c3127] transition-all cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="text-base shrink-0">{spot.icon}</span>
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-[#0c3127] group-hover:text-emerald-800 transition-colors block truncate">
                        {spot.name}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500 block truncate">
                        {spot.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why December Highlights & Action Buttons */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-stone-700">
                <span className="text-emerald-800 font-bold">❄️ Inclusions:</span>
                <span>Snow-covered peaks</span>
                <span>•</span>
                <span>Scenic waterfalls</span>
                <span>•</span>
                <span>Peaceful monasteries</span>
                <span>•</span>
                <span>Festive MG Marg walk</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2.5 rounded-xl bg-[#0c3127] hover:bg-[#154a3b] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <span>Read Full Announcement &amp; 11 Sights</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`tel:${FESTIVE_ANNOUNCEMENT_DATA.contactNumber}`}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-[#0c3127] font-bold text-xs flex items-center gap-1.5 border border-stone-300 transition-all shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
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
