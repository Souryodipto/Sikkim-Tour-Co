import React, { useState } from 'react';
import {
  Sparkles,
  MessageSquare,
  Phone,
  Copy,
  Check,
  ShieldCheck,
  ChevronRight,
  Car,
  Flame,
  Award,
  Compass,
  FileCheck,
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

  return (
    <section
      id="festive-offer-announcement"
      className="relative z-10 py-10 sm:py-16 text-[#0c3127] bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200 shadow-xs"
      aria-label="Christmas & December Special Offer Announcement"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header: Clean Editorial Title with Sprinkled Offer Tags */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-3">
          {/* Sprinkled Offer Badges Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
              </span>
              🔥 LIMITED OFFER
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              ⚡ SPECIAL OFFER: FLAT 47% OFF
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              ❄️ WINTER ESCAPE OFFER
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-stone-100 text-[#0c3127] border border-stone-300 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              🎁 ALL-INCLUSIVE: ₹9,999/-
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase shadow-xs">
              🏔️ 11 SPOTS INCLUDED
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#0c3127] tracking-tight leading-tight">
            Christmas &amp; December Special: Winter Escape
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Experience snow-capped peaks, high-altitude alpine lakes, and festive Gangtok with verified 4x4 mountain vehicles and Army permit paperwork.
          </p>
        </div>

        {/* Content Showcase Grid: Clean & Non-Repetitive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Clean White Digital Announcement Hero Poster */}
          <div className="lg:col-span-5 flex flex-col items-center w-full">
            <CleanAnnouncementPoster interactive={true} onOpenDetails={handleOpenModal} />
            <span className="font-mono text-[10px] text-stone-500 mt-2.5 text-center">
              ✨ Tap poster or details button to open full 11-sight itinerary breakdown
            </span>
          </div>

          {/* Column 2: Complementary Offer Inclusions & Route (NO DUPLICATE REWRITE) */}
          <div className="lg:col-span-7 space-y-5">
            {/* 6 Curated Offer Perk Cards with Sprinkle Tags */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">🎁</span>
                  <h3 className="font-serif font-bold text-[#0c3127] text-sm sm:text-base">
                    Exclusive Promotional Inclusions
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Fixed ₹9,999/- Package
                </span>
              </div>

              {/* Grid of 6 Unique Offer Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Perk 1 */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/60 transition-all space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                      🏷️ OFFER: SAVE ₹9,000
                    </span>
                    <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  </div>
                  <h4 className="font-serif font-bold text-[#0c3127] text-xs pt-0.5">
                    Flat 47% Discount Locked
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Standard peak December rate is ₹18,999/-. Secured at ₹9,999/- per person with zero festival surges.
                  </p>
                </div>

                {/* Perk 2 */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-500/60 transition-all space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      🚙 OFFER: DEDICATED 4×4
                    </span>
                    <Car className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <h4 className="font-serif font-bold text-[#0c3127] text-xs pt-0.5">
                    High-Ground SUV Fleet
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Private Bolero/Scorpio suited for mountain snow, icy curves, and steep Himalayan hairpin passes.
                  </p>
                </div>

                {/* Perk 3 */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-500/60 transition-all space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      🛡️ OFFER: ARMY PERMITS
                    </span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <h4 className="font-serif font-bold text-[#0c3127] text-xs pt-0.5">
                    100% Paperwork Handled
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Indian Army clearance and state permits for Nathula Pass and Tsomgo Lake processed smoothly.
                  </p>
                </div>

                {/* Perk 4 */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/60 transition-all space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                      🏔️ OFFER: 11 SIGHTS
                    </span>
                    <Compass className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h4 className="font-serif font-bold text-[#0c3127] text-xs pt-0.5">
                    Complete Circuit Covered
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Tsomgo, Nathula, Baba Mandir, scenic waterfalls, sunrise viewpoints, and festive MG Marg walk.
                  </p>
                </div>

                {/* Perk 5 */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-emerald-500/60 transition-all space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                      ✨ OFFER: LOCAL DRIVER
                    </span>
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <h4 className="font-serif font-bold text-[#0c3127] text-xs pt-0.5">
                    Verified Mountain Pilot
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Courteous, verified Sikkimese chauffeur expert in winter road safety and scenic pit stops.
                  </p>
                </div>

                {/* Perk 6 */}
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80 hover:border-amber-400/60 transition-all space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                      🏷️ OFFER: ZERO SURCHARGES
                    </span>
                    <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <h4 className="font-serif font-bold text-[#0c3127] text-xs pt-0.5">
                    100% Transparent Billing
                  </h4>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    Fuel charges, vehicle parking, driver allowances, and permit processing all fully included.
                  </p>
                </div>
              </div>
            </div>

            {/* Expedition Route Circuit Overview: Clean & Minimal (NO 11-CARD REPETITION) */}
            <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🗺️</span>
                  <h3 className="font-serif font-bold text-[#0c3127] text-sm">
                    Festive 11-Spot Itinerary Circuit
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-stone-500 font-bold uppercase">
                  3 Curated Stages
                </span>
              </div>

              {/* 3 Circuit Stages */}
              <div className="space-y-2.5 text-xs text-stone-700">
                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
                  <span className="text-base shrink-0">🏔️</span>
                  <div>
                    <span className="font-bold text-[#0c3127] block text-[11px]">
                      Stage 1: High Alpine Frontiers (12,300+ ft)
                    </span>
                    <span className="text-[11px] text-stone-600">
                      Tsomgo Glacial Lake (12,310 ft) · Nathula Pass Indo-China Border (14,140 ft) · Baba Harbhajan Mandir
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
                  <span className="text-base shrink-0">🌊</span>
                  <div>
                    <span className="font-bold text-[#0c3127] block text-[11px]">
                      Stage 2: Waterfalls &amp; Hilltop Vistas
                    </span>
                    <span className="text-[11px] text-stone-600">
                      Banjhakri Falls &amp; Energy Park · Bakthang Waterfalls · Tashi Sunrise Point · Hanuman Tok · Ganesh Tok
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5">
                  <span className="text-base shrink-0">🏮</span>
                  <div>
                    <span className="font-bold text-[#0c3127] block text-[11px]">
                      Stage 3: Alpine City Promenade &amp; Culture
                    </span>
                    <span className="text-[11px] text-stone-600">
                      Festive MG Marg Christmas Walk · Lal Bazaar Cultural Market · Orchid Flower Sanctuary
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons to View Details / Call */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={handleOpenModal}
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#0c3127] hover:bg-[#154a3b] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Full 11 Places Guide &amp; Schedule</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={`tel:${FESTIVE_ANNOUNCEMENT_DATA.contactNumber}`}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#0c3127] font-bold text-xs flex items-center justify-center gap-1.5 border border-stone-300 transition-all shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Call {FESTIVE_ANNOUNCEMENT_DATA.contactDisplay}</span>
                </a>

                <button
                  onClick={handleCopyText}
                  title="Copy full announcement to clipboard"
                  className="p-3 rounded-xl bg-white hover:bg-stone-100 text-[#0c3127] border border-stone-300 transition-all cursor-pointer shrink-0 shadow-xs hidden sm:flex items-center justify-center"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-stone-600" />
                  )}
                </button>
              </div>

              <p className="text-[10px] text-stone-500 font-mono text-center pt-1">
                ⚡ Limited December Army permit quotas issued daily · Direct local Gangtok mountain concierge
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
