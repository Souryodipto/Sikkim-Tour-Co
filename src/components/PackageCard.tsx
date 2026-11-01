import React from 'react';
import { TourPackage } from '../data/packages';
import { useRouter } from '../context/RouterContext';
import { Clock, MapPin, CheckCircle, ArrowRight, Sparkles, Send, Mail, ShieldAlert, Camera } from 'lucide-react';

interface PackageCardProps {
  tourPackage: TourPackage;
}

export const PackageCard: React.FC<PackageCardProps> = ({ tourPackage }) => {
  const { navigate } = useRouter();

  const isFlagship = tourPackage.isFlagship || tourPackage.daysCount === 14;
  const photoCount = tourPackage.galleryImages?.length || 5;

  const whatsappMessage = encodeURIComponent(
    `Hi Sikkim Tour Co., I am interested in booking the "${tourPackage.name}" (${tourPackage.duration}). Could you please send me a tailored quote and available dates for our group?`
  );

  const emailSubject = encodeURIComponent(`Inquiry for ${tourPackage.name} - Sikkim Tour Co.`);
  const emailBody = encodeURIComponent(
    `Hi Sikkim Tour Co.,\n\nI would like to request a customized quote for "${tourPackage.name}" (${tourPackage.duration}).\n\nOur Details:\n- Estimated Travel Dates:\n- Number of Travelers:\n- Preferred Hotel Tier (Deluxe / Heritage / Homestay):\n- Vehicle Preference (Private Innova / Scorpio):\n\nThank you!`
  );

  return (
    <article
      className={`group bg-white rounded-xl border overflow-hidden flex flex-col shadow-sm hover:shadow-xl transition-all duration-300 ${
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
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
          {isFlagship ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#103D35] text-[#EBA94B] border border-[#EBA94B]/60 rounded-full text-[10px] font-bold tracking-wider uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
              Flagship 2-Week
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
              <Camera className="w-3 h-3 text-[#EBA94B]" />
              <span>{photoCount} Photos</span>
            </span>
          )}
        </div>

        {/* Travel Style Category Chip */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/20">
            {tourPackage.travelStyleCategory || tourPackage.travelStyle}
          </span>
        </div>

        {/* Duration & Altitude Badge */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-medium">
          <span className="flex items-center gap-1.5 drop-shadow-sm bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <Clock className="w-3.5 h-3.5 text-[#EBA94B]" />
            {tourPackage.duration}
          </span>
          <span className="text-[11px] font-mono drop-shadow-sm bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 text-white/90">
            {tourPackage.altitudeRange || 'Eastern Himalayas'}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Districts Covered */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#EBA94B] shrink-0" />
            <span className="truncate">
              {tourPackage.districtsCovered ? tourPackage.districtsCovered.join(' · ') : tourPackage.destinationsCovered.slice(0, 3).join(' · ')}
            </span>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#173D35] group-hover:text-[#EBA94B] transition-colors line-clamp-1 mb-1">
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

          <p className="text-xs text-stone-600 line-clamp-2 mb-4 leading-relaxed">
            {tourPackage.tagline}
          </p>

          {/* Key Inclusions Bullet List */}
          <div className="space-y-1.5 mb-4 border-t border-stone-100 pt-3">
            <div className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider mb-1">
              Included Highlights
            </div>
            {tourPackage.mainInclusions.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                <CheckCircle className="w-3.5 h-3.5 text-[#173D35] shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
          </div>

          {/* Disclosures Snippet */}
          {tourPackage.disclosures && tourPackage.disclosures.length > 0 && (
            <div className="mb-4 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-tight flex items-start gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{tourPackage.disclosures[0]}</span>
            </div>
          )}
        </div>

        {/* Pricing Notice & Direct Contact Actions (NO FIXED PRICE SHOWN) */}
        <div className="pt-3 border-t border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[10px] uppercase font-mono tracking-wider text-[#EBA94B] font-bold">
                Transparent Pricing
              </div>
              <div className="text-base font-bold text-[#173D35]">
                Custom Quote on Request
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium border border-stone-200">
              Personalized
            </span>
          </div>

          {/* Actions: View Itinerary + Direct WhatsApp + Email */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => navigate(`/packages/${tourPackage.slug}`)}
              className="w-full inline-flex items-center justify-center gap-1 py-2 px-2.5 bg-stone-100 hover:bg-stone-200 text-[#173D35] text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Itinerary</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <a
              href={`mailto:info@sikkimtourco.com?subject=${emailSubject}&body=${emailBody}`}
              className="w-full inline-flex items-center justify-center gap-1 py-2 px-2.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap"
              title="Email Inquiry"
            >
              <Mail className="w-3.5 h-3.5 text-[#173D35]" />
              <span>Email Us</span>
            </a>
          </div>

          <a
            href={`https://wa.me/917001846727?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-all whitespace-nowrap shadow-sm"
          >
            <Send className="w-3.5 h-3.5 fill-white" />
            <span>Get Quote on WhatsApp</span>
          </a>
        </div>
      </div>
    </article>
  );
};
