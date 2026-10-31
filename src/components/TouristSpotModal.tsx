import React, { useEffect } from 'react';
import { TouristSpot } from '../data/destinations';
import { VisualMedia, VisualPreset } from './VisualMedia';
import { useRouter } from '../context/RouterContext';
import { buildWhatsAppUrl } from '../config/site';
import {
  X,
  MapPin,
  Clock,
  BookOpen,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Sparkles,
  ChevronRight,
} from 'lucide-react';

interface TouristSpotModalProps {
  spot: TouristSpot | null;
  onClose: () => void;
}

export const TouristSpotModal: React.FC<TouristSpotModalProps> = ({ spot, onClose }) => {
  const { navigate } = useRouter();

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (spot) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [spot, onClose]);

  if (!spot) return null;

  const getPreset = (): VisualPreset => {
    switch (spot.district) {
      case 'North Sikkim':
        return 'north-sikkim';
      case 'East Sikkim':
        return 'east-sikkim';
      case 'West Sikkim':
        return 'west-sikkim';
      case 'South Sikkim':
        return 'south-sikkim';
      default:
        return 'kanchenjunga-sunrise';
    }
  };

  const whatsappUrl = buildWhatsAppUrl(
    `Hello Sikkim Tour Co.,\n\nI am interested in visiting "${spot.name}" (${spot.district}, Elevation: ${spot.elevation}).\nHistorical background: ${spot.historicalPeriod}.\n\nPlease share suitable itineraries, seasonal access advice, and private transport options.`
  );

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="spot-title"
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-md overflow-hidden shadow-2xl border border-stone-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Photo */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0 bg-[#173D35]">
          <VisualMedia
            src={spot.imageUrl}
            alt={spot.name}
            preset={getPreset()}
            aspectRatio="auto"
            overlayOpacity="medium"
            className="w-full h-full"
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Title & Badges Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 text-white z-10 bg-gradient-to-t from-black/85 via-black/40 to-transparent">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5">
              <span className="px-2 py-0.5 rounded-xs bg-[#C4A36A] text-[#173D35]">
                {spot.district}
              </span>
              <span className="px-2 py-0.5 rounded-xs bg-black/50 text-white/90 border border-white/20 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#C4A36A]" />
                <span>{spot.elevation}</span>
              </span>
            </div>

            <h2 id="spot-title" className="font-editorial text-2xl sm:text-3xl font-bold text-white drop-shadow-sm">
              {spot.name}
            </h2>

            {spot.altNames && spot.altNames.length > 0 && (
              <p className="text-xs text-white/80 italic mt-0.5">
                Also known as: {spot.altNames.join(' · ')}
              </p>
            )}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-6 space-y-6 text-[#202724]">
          {/* Historical Period Banner */}
          <div className="p-3.5 bg-[#F8F6F0] rounded-sm border border-stone-200/90 flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-[#C4A36A] shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <span className="font-semibold text-stone-800 uppercase tracking-wider text-[11px]">
                Historical Period & Origins:
              </span>
              <div className="text-stone-700 font-medium">
                {spot.historicalPeriod}
              </div>
            </div>
          </div>

          {/* Full Deep Historical Chronicle */}
          <section className="space-y-2">
            <h3 className="font-editorial text-xl font-bold text-[#173D35] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C4A36A]" />
              <span>History, Lore & Spiritual Significance</span>
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
              {spot.history}
            </p>
          </section>

          {/* Practical Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Best Time to Visit */}
            <div className="p-3.5 rounded-sm bg-stone-50 border border-stone-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                <Calendar className="w-3.5 h-3.5 text-[#527568]" />
                <span>Best Season to Visit</span>
              </div>
              <p className="text-stone-600">{spot.bestTime}</p>
            </div>

            {/* Permit Status */}
            <div className="p-3.5 rounded-sm bg-stone-50 border border-stone-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-semibold text-stone-800">
                {spot.permitRequired ? (
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                )}
                <span>Permit Protocol</span>
              </div>
              <p className="text-stone-600">
                {spot.permitNotes || (spot.permitRequired ? 'Protected Area Permit required prior to ascent.' : 'Standard civilian access without special permits.')}
              </p>
            </div>
          </div>

          {/* Visiting Tips */}
          {spot.visitingTips && spot.visitingTips.length > 0 && (
            <section className="space-y-2 pt-1">
              <h4 className="font-editorial text-base font-bold text-[#173D35]">
                Visitor Recommendations & Etiquette
              </h4>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {spot.visitingTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#C4A36A] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Image caption credit */}
          <div className="text-[11px] text-stone-400 italic pt-2 border-t border-stone-100">
            {spot.imageCaption}
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              onClose();
              navigate('/customise-trip');
            }}
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-[#173D35] hover:text-[#0F2A24] transition-colors"
          >
            Customise Itinerary with this Spot
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>Enquire on WhatsApp</span>
            </a>

            <button
              onClick={() => {
                onClose();
                navigate('/packages/grand-sikkim-odyssey-2-weeks');
              }}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 px-4 py-2 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs"
            >
              <span>View 2-Week Tour</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
