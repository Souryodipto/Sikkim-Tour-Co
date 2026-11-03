import React from 'react';
import { TourPackage } from '../data/packages';
import { useRouter } from '../context/RouterContext';
import { trackWhatsAppClick } from '../utils/analytics';
import {
  Clock,
  MapPin,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Send,
  Building,
  Car,
  ShieldCheck,
  Camera,
} from 'lucide-react';

interface PackageCardProps {
  tourPackage: TourPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ tourPackage }) => {
  const { navigate } = useRouter();

  const isFlagship = tourPackage.isFlagship || tourPackage.daysCount === 14;
  const photoCount = tourPackage.galleryImages?.length || 5;
  const hasVerifiedPrice = Boolean(tourPackage.startingPriceInr && tourPackage.startingPriceInr > 0);

  const whatsappMessage = encodeURIComponent(
    hasVerifiedPrice
      ? `Hi Sikkim Tour Co., I am interested in booking "${tourPackage.name}" (${tourPackage.duration}, starting ₹${tourPackage.startingPriceInr.toLocaleString('en-IN')}/${tourPackage.pricingBasis || 'person'}). Please share availability and customized itinerary for my dates.`
      : `Hi Sikkim Tour Co., I am interested in booking "${tourPackage.name}" (${tourPackage.duration}). Could you please send me a tailored quote and available dates for our group?`
  );

  return (
    <article
      className={`group bg-white rounded-2xl border overflow-hidden flex flex-col shadow-xs hover:shadow-xl transition-all duration-300 ${
        isFlagship ? 'border-[#EBA94B] ring-1 ring-[#EBA94B]/60' : 'border-stone-200/90'
      }`}
    >
      {/* Visual Image Header */}
      <div
        className="relative h-56 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/packages/${tourPackage.slug}`)}
      >
        <img
          src={tourPackage.heroImage || 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80'}
          alt={tourPackage.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          {isFlagship ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#103D35] text-[#EBA94B] border border-[#EBA94B]/60 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
              Flagship 2-Week
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
              <Camera className="w-3 h-3 text-[#EBA94B]" />
              <span>{photoCount} Photos</span>
            </span>
          )}
        </div>

        {/* Travel Style Category Chip */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
            {tourPackage.travelStyleCategory || tourPackage.travelStyle}
          </span>
        </div>

        {/* Duration & Altitude Badge */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1.5 drop-shadow-sm bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 font-semibold">
            <Clock className="w-3.5 h-3.5 text-[#EBA94B]" />
            {tourPackage.duration}
          </span>
          <span className="text-[11px] font-mono drop-shadow-sm bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 text-white/90">
            {tourPackage.altitudeRange || 'Eastern Himalayas'}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Destination & Region */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#EBA94B] shrink-0" />
            <span className="truncate font-medium">
              {tourPackage.destinationsCovered ? tourPackage.destinationsCovered.slice(0, 4).join(' · ') : tourPackage.region}
            </span>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#103D35] group-hover:text-[#EBA94B] transition-colors line-clamp-1 mb-1.5">
            <a
              href={`/packages/${tourPackage.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/packages/${tourPackage.slug}`);
              }}
            >
              {tourPackage.name}
            </a>
          </h3>

          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3.5">
            {tourPackage.tagline}
          </p>

          {/* Hotel & Transport Key Badges */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-stone-600 mb-3.5 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
            <div className="flex items-center gap-1.5 truncate" title={tourPackage.accommodationCategory}>
              <Building className="w-3.5 h-3.5 text-[#103D35] shrink-0" />
              <span className="truncate">{tourPackage.accommodationCategory.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 truncate" title={tourPackage.transportDetails}>
              <Car className="w-3.5 h-3.5 text-[#103D35] shrink-0" />
              <span className="truncate">{tourPackage.transportDetails.split('with')[0]}</span>
            </div>
          </div>

          {/* Key Inclusions Bullet List */}
          <div className="space-y-1.5 mb-3 border-t border-stone-100 pt-3">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1">
              Key Inclusions
            </div>
            {tourPackage.mainInclusions.slice(0, 2).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
            <div className="flex items-center gap-2 text-xs text-[#103D35] font-medium pt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#103D35] shrink-0" />
              <span className="line-clamp-1">100% Army & State PAP Permits Managed</span>
            </div>
          </div>
        </div>

        {/* Pricing Notice & Direct Contact Actions */}
        <div className="pt-3 border-t border-stone-200/90">
          <div className="flex items-baseline justify-between mb-3">
            {hasVerifiedPrice ? (
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-emerald-700 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Verified Starting Tariff
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-xl font-bold font-serif text-[#103D35] tabular-nums">
                    ₹{tourPackage.startingPriceInr.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-500 font-normal">
                    / {tourPackage.pricingBasis || 'person'}
                  </span>
                </div>
              </div>
            ) : (
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-[#EBA94B] font-bold">
                  Transparent Pricing
                </div>
                <div className="text-base font-bold text-[#103D35]">
                  Custom Quote on Request
                </div>
              </div>
            )}
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold border border-stone-200">
              Private 4x4 Fleet
            </span>
          </div>

          {/* Action CTAs: View Details + WhatsApp Booking */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigate(`/packages/${tourPackage.slug}`)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-[#103D35] text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              <span>View Itinerary</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={`https://wa.me/917001846727?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  cta_location: 'package_card',
                  package_name: tourPackage.name,
                  tariff: tourPackage.startingPriceInr,
                })
              }
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl transition-all whitespace-nowrap shadow-sm"
            >
              <Send className="w-3.5 h-3.5 fill-white" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
