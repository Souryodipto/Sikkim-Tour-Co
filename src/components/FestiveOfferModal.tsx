import React, { useState, useEffect, useCallback } from 'react';
import {
  X,
  Phone,
  MessageSquare,
  Sparkles,
  Calendar,
  ShieldCheck,
  ChevronRight,
  Copy,
  Check,
  MapPin,
  Heart,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../config/site';
import { useRouter } from '../context/RouterContext';
import { FESTIVE_ANNOUNCEMENT_DATA } from '../data/festiveAnnouncement';
import { CleanAnnouncementPoster } from './CleanAnnouncementPoster';

export const FESTIVE_OFFER_DETAILS = {
  title: 'Christmas & December Special',
  subtitle: FESTIVE_ANNOUNCEMENT_DATA.subtitle,
  originalPrice: FESTIVE_ANNOUNCEMENT_DATA.originalPrice,
  specialPrice: FESTIVE_ANNOUNCEMENT_DATA.specialPrice,
  priceUnit: 'per person',
  destinations: FESTIVE_ANNOUNCEMENT_DATA.attractions.slice(0, 3).map((a) => ({
    name: a.name,
    tag: a.highlightNote || '',
  })),
  tagline: FESTIVE_ANNOUNCEMENT_DATA.closingTagline,
  contactPhone: '+91 7001846727',
};

export const FestiveOfferModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'poster' | 'attractions' | 'why' | 'notes'>('poster');
  const [copied, setCopied] = useState(false);
  const { navigate } = useRouter();

  // Auto-trigger announcement popup after initial delay unless dismissed this session
  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('sikkim_december_offer_dismissed');
      if (!dismissed) {
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 1800);
        return () => clearTimeout(timer);
      }
    } catch {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Custom global event listener so any button on the site can open this announcement modal
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-festive-announcement', handleOpen);
    return () => window.removeEventListener('open-festive-announcement', handleOpen);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('sikkim_december_offer_dismissed', 'true');
    } catch {
      // Ignore in restricted storage mode
    }
  }, []);

  // Keyboard Escape listener & body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, handleClose]);

  const handleCopyAnnouncement = async () => {
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
    <>
      {/* Floating launcher trigger on bottom-left in Clean White */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="View Christmas & December Special Offer (₹9,999/- per person)"
        className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 group flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-white text-[#0c3127] font-semibold text-xs sm:text-sm shadow-2xl border-2 border-stone-300 hover:border-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
        </span>
        <span className="text-sm">🎄</span>
        <span className="font-bold tracking-wide">
          December Offer: <span className="text-emerald-800 font-black">₹9,999/-</span>
        </span>
        <span className="hidden md:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-stone-100 text-[#0c3127] font-bold border border-stone-200">
          11 Places
        </span>
      </button>

      {/* Main Full Announcement Modal Popup in Clean White */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="festive-offer-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="relative w-full max-w-2xl bg-white text-[#0c3127] rounded-3xl border border-stone-300 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200">
            {/* Modal Top Header Bar in Clean White */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-stone-200 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl">🎄</span>
                <div>
                  <h3
                    id="festive-offer-heading"
                    className="text-xs sm:text-sm font-extrabold tracking-wide uppercase text-[#0c3127] font-mono truncate"
                  >
                    Christmas &amp; December Special
                  </h3>
                  <p className="text-[10px] text-stone-500 hidden sm:block">
                    Your Winter Escape to the Himalayas!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAnnouncement}
                  aria-label="Copy entire announcement text"
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-[#0c3127] flex items-center gap-1.5 text-[11px] font-mono border border-stone-300 transition-all cursor-pointer"
                  title="Copy full announcement to share on WhatsApp"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-600" />
                      <span className="hidden sm:inline">Copy Text</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleClose}
                  aria-label="Close Christmas offer popup"
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sprinkled Offer Status Strip */}
            <div className="bg-stone-50 px-3 sm:px-6 py-2 border-b border-stone-200 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-1.5 flex-wrap text-xs">
                <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200 text-[10px] font-mono font-bold uppercase shadow-2xs">
                  🔥 SPECIAL OFFER
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-[10px] font-mono font-bold uppercase shadow-2xs">
                  ⚡ 47% OFF
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold uppercase shadow-2xs">
                  ₹9,999/- ALL-INCLUSIVE
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-white text-stone-700 border border-stone-300 text-[10px] font-mono font-bold uppercase">
                  11 PLACES COVERED
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs flex items-center gap-1 shrink-0 transition-transform active:scale-95 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3 h-3 fill-black" />
                <span>Book Now</span>
              </a>
            </div>

            {/* Modal Navigation Tabs in Clean White */}
            <div className="flex border-b border-stone-200 bg-stone-50 px-3 sm:px-5 pt-1.5 gap-1 shrink-0 overflow-x-auto text-xs font-medium">
              <button
                onClick={() => setActiveTab('poster')}
                className={`px-3 py-2 border-b-2 rounded-t transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'poster'
                    ? 'border-[#0c3127] text-[#0c3127] bg-white font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-black'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Clean White Poster</span>
              </button>

              <button
                onClick={() => setActiveTab('attractions')}
                className={`px-3 py-2 border-b-2 rounded-t transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'attractions'
                    ? 'border-[#0c3127] text-[#0c3127] bg-white font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-black'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>11 Places Covered</span>
              </button>

              <button
                onClick={() => setActiveTab('why')}
                className={`px-3 py-2 border-b-2 rounded-t transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'why'
                    ? 'border-[#0c3127] text-[#0c3127] bg-white font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-black'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Why December?</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`px-3 py-2 border-b-2 rounded-t transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'notes'
                    ? 'border-[#0c3127] text-[#0c3127] bg-white font-extrabold'
                    : 'border-transparent text-stone-500 hover:text-black'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Important Info</span>
              </button>
            </div>

            {/* Scrollable Tab Content Area in Clean White */}
            <div className="overflow-y-auto flex-1 p-3 sm:p-5 space-y-4 bg-white text-[#0c3127] scrollbar-thin scrollbar-thumb-stone-300">
              {/* TAB 1: CLEAN WHITE POSTER */}
              {activeTab === 'poster' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <CleanAnnouncementPoster />

                  {/* Intro Pitch */}
                  <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <p className="font-serif italic text-[#0c3127] font-bold text-sm mb-1">
                      &quot;Dreaming of snow-covered mountains, breathtaking Himalayan valleys, beautiful waterfalls, peaceful monasteries, and unforgettable winter memories?&quot;
                    </p>
                    <p>
                      This December, escape to the magical mountains of Sikkim and experience an incredible holiday filled with adventure, natural beauty, and festive vibes!
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 2: 11 SIGHTSEEING ATTRACTIONS */}
              {activeTab === 'attractions' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-1 border-b border-stone-200">
                    <h4 className="text-xs uppercase font-mono tracking-wider text-[#0c3127] font-bold">
                      11 Places Name Covering:
                    </h4>
                    <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-bold">
                      All Included in Itinerary
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {FESTIVE_ANNOUNCEMENT_DATA.attractions.map((spot) => (
                      <div
                        key={spot.id}
                        className="p-3 bg-stone-50 rounded-xl border border-stone-200 hover:border-[#0c3127] transition-all flex flex-col justify-between space-y-1.5"
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-lg shrink-0 mt-0.5">{spot.icon}</span>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-mono text-amber-700 font-bold">
                                {spot.id}.
                              </span>
                              <h5 className="font-serif font-bold text-[#0c3127] text-xs sm:text-sm truncate">
                                {spot.name}
                              </h5>
                            </div>
                            {spot.highlightNote && (
                              <p className="text-[10px] text-emerald-800 font-mono font-medium mt-0.5">
                                {spot.highlightNote}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          {spot.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: WHY CHOOSE SIKKIM THIS DECEMBER? */}
              {activeTab === 'why' && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                    <h4 className="font-serif font-bold text-[#0c3127] text-sm sm:text-base flex items-center gap-2">
                      <span>❄️</span>
                      <span>Why Choose Sikkim This December?</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {FESTIVE_ANNOUNCEMENT_DATA.whyChoosePoints.map((point, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 p-2 bg-white rounded-lg text-xs text-stone-700 border border-stone-200"
                        >
                          <span className="text-emerald-700 font-bold mt-0.5">✓</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-stone-600 pt-2 border-t border-stone-200 leading-relaxed">
                      Whether you&apos;re travelling with friends, planning a family vacation, or looking for a refreshing getaway with your loved ones, Sikkim offers a wonderful combination of mountain adventure, natural beauty, and cultural experiences.
                    </p>
                  </div>

                  <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-center space-y-1">
                    <p className="font-serif font-bold text-[#0c3127] text-sm">
                      {FESTIVE_ANNOUNCEMENT_DATA.closingTagline}
                    </p>
                    <p className="text-xs text-stone-600">
                      Helpline: +91 7001846727 · Gangtok Mountain Desk
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: IMPORTANT TRAVEL & PERMIT NOTES */}
              {activeTab === 'notes' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-3">
                    <h4 className="font-serif font-bold text-[#0c3127] text-sm flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>Important Travel &amp; Booking Guidelines</span>
                    </h4>

                    <ul className="space-y-2 text-xs text-stone-600">
                      {FESTIVE_ANNOUNCEMENT_DATA.importantNotes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-amber-700 font-bold">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-between text-xs text-stone-700">
                    <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Army Permit Liaison &amp; Verified 4x4 Fleet</span>
                    </div>
                    <span className="font-mono text-[11px] text-stone-600">
                      Paljor Stadium Road, Gangtok
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Modal Action Footer in Clean White */}
            <div className="p-3 sm:p-4 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-black font-extrabold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all text-center cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Book for ₹9,999/- on WhatsApp</span>
              </a>

              <a
                href={`tel:${FESTIVE_ANNOUNCEMENT_DATA.contactNumber}`}
                className="w-full sm:w-auto py-3 px-4 bg-white hover:bg-stone-100 text-[#0c3127] font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 border border-stone-300 transition-all text-center cursor-pointer shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Concierge</span>
              </a>

              <button
                onClick={() => {
                  handleClose();
                  navigate('/customise-trip');
                }}
                className="w-full sm:w-auto py-3 px-4 bg-stone-200 hover:bg-stone-300 text-[#0c3127] font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1 border border-stone-300 transition-all text-center cursor-pointer"
              >
                <span>Custom Dates</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
