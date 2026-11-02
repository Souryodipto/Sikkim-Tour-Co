import React, { useState, useEffect, useCallback } from 'react';
import { X, Phone, MessageSquare, Sparkles, Calendar, ShieldCheck, ChevronRight } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl } from '../config/site';
import { useRouter } from '../context/RouterContext';

export const FESTIVE_OFFER_DETAILS = {
  title: 'Christmas & December Special',
  subtitle: 'Your Winter Escape to the Himalayas!',
  originalPrice: '₹18,999/-',
  specialPrice: '₹9,999/-',
  priceUnit: 'per person',
  destinations: [
    { name: 'Tsomgo Lake', tag: 'A Himalayan winter wonder' },
    { name: 'Nathula Pass', tag: 'Experience the mountain frontier' },
    { name: 'Baba Mandir', tag: 'A memorable spiritual landmark' },
  ],
  tagline: 'Snow-Capped Peaks. Festive Moments. Unforgettable Memories. Your Christmas Adventure Starts Here!',
  contactPhone: '+91 7001846727',
  posterImage: '/christmas-december-special.jpg',
};

export const FestiveOfferModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
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
      // Fallback for private browsing where sessionStorage might be restricted
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setHasInteracted(true);
    try {
      sessionStorage.setItem('sikkim_december_offer_dismissed', 'true');
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Keyboard Escape listener & scroll lock
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

  const bookingMessage = `Hi Sikkim Tour Co., I want to book the Christmas & December Special Limited-Period Offer for ₹9,999/- per person (Tsomgo Lake, Nathula Pass, Baba Mandir). Please share available December/Christmas dates and permit requirements!`;

  const whatsappUrl = buildWhatsAppUrl(bookingMessage);

  return (
    <>
      {/* Floating launcher trigger on bottom-left so visitors can re-open the offer anytime */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="View Christmas & December Special Offer (₹9,999/- per person)"
        className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-40 group flex items-center gap-2.5 px-3.5 py-2.5 sm:px-4 sm:py-2.5 rounded-full bg-gradient-to-r from-[#991b1b] via-[#b45309] to-[#15803d] text-white font-medium text-xs sm:text-sm shadow-xl shadow-black/40 border border-amber-300/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer backdrop-blur-sm"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-300"></span>
        </span>
        <span className="text-sm">🎄</span>
        <span className="font-semibold tracking-wide">
          December Offer: <span className="text-amber-200 font-bold">₹9,999/-</span>
        </span>
        <span className="hidden md:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-black/30 text-amber-200">
          Limited
        </span>
      </button>

      {/* Main Modal Popup */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="festive-offer-heading"
          className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <div className="relative w-full max-w-lg bg-[#071914] text-white rounded-2xl border border-amber-500/50 shadow-[0_0_60px_rgba(217,119,6,0.35)] overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200">
            {/* Modal Top Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-[#8b1515] via-[#a16207] to-[#14532d] text-white border-b border-amber-500/30">
              <div className="flex items-center gap-2">
                <span className="text-base">🎄</span>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-200 font-mono">
                  Limited-Period Announcement
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close Christmas offer popup"
                className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="overflow-y-auto flex-1 p-3 sm:p-4 space-y-3.5 scrollbar-thin scrollbar-thumb-amber-500/30">
              {/* Exact user-provided poster image - strictly no recreation */}
              <div className="relative rounded-xl overflow-hidden border border-amber-500/30 bg-black shadow-inner flex items-center justify-center">
                <img
                  src={FESTIVE_OFFER_DETAILS.posterImage}
                  alt="Christmas & December Special Offer - ₹9,999/- per person (Tsomgo Lake, Nathula Pass, Baba Mandir)"
                  className="w-full h-auto object-contain max-h-[50vh] sm:max-h-[54vh] select-none"
                  loading="eager"
                />
              </div>

              {/* Offer Highlight Pill */}
              <div className="bg-[#0b2921] rounded-xl p-3 border border-amber-500/30 text-center space-y-1">
                <div className="text-[11px] uppercase tracking-widest font-mono text-amber-400 font-bold">
                  Exclusive Festive Package Rate
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="line-through text-stone-400 text-sm font-semibold">
                    {FESTIVE_OFFER_DETAILS.originalPrice}
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-amber-300 drop-shadow">
                    {FESTIVE_OFFER_DETAILS.specialPrice}
                  </span>
                  <span className="text-xs text-stone-300 uppercase tracking-wide">
                    / person
                  </span>
                </div>
                <p className="text-xs text-stone-300 font-medium">
                  Covering <strong className="text-amber-200">Tsomgo Lake</strong>,{' '}
                  <strong className="text-amber-200">Nathula Pass</strong> &amp;{' '}
                  <strong className="text-amber-200">Baba Mandir</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* Primary WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-150 text-center"
                >
                  <MessageSquare className="w-5 h-5 fill-current" />
                  <span>Book for ₹9,999/- on WhatsApp</span>
                </a>

                {/* Secondary Row: Direct Phone Call & Itinerary Customizer */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${siteConfig.contact.whatsappNumber}`}
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-white/20 transition-all text-center"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-300" />
                    <span>Call Concierge</span>
                  </a>

                  <button
                    onClick={() => {
                      handleClose();
                      navigate('/customise-trip');
                    }}
                    className="py-2.5 px-3 bg-[#c59b27]/20 hover:bg-[#c59b27]/30 text-amber-200 font-semibold text-xs rounded-xl flex items-center justify-center gap-1 border border-[#c59b27]/40 transition-all text-center"
                  >
                    <span>Custom Dates</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Trust & Inclusions Disclaimer */}
              <div className="pt-1 border-t border-white/10 text-[10px] text-stone-400 flex items-center justify-between">
                <div className="flex items-center gap-1 text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Indian Army Permit Desk Included</span>
                </div>
                <span>Helpline: +91 70018 46727</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
