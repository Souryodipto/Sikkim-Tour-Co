import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { tourPackagesData, TourPackage } from '../data/packages';
import { VisualMedia, VisualPreset } from '../components/VisualMedia';
import { CustomiseTripForm } from '../components/CustomiseTripForm';
import { formatPrice } from '../utils/enquiry';
import { siteConfig, buildPackageWhatsAppMessage, buildWhatsAppUrl } from '../config/site';
import {
  Clock,
  MapPin,
  CheckCircle,
  XCircle,
  HelpCircle,
  ShieldCheck,
  Calendar,
  Car,
  Building,
  Utensils,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowLeft,
  MessageSquare,
  Sparkles,
  Info,
  Mail,
  Phone,
  Camera,
  Eye,
  Maximize2,
  X,
  Compass,
  AlertTriangle,
  Award,
} from 'lucide-react';

interface PackageDetailViewProps {
  slug: string;
}

export const PackageDetailView: React.FC<PackageDetailViewProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [activeTab, setActiveTab] = useState<'itinerary' | 'gallery' | 'details' | 'enquire'>('itinerary');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const tourPackage = tourPackagesData.find((p) => p.slug === slug || p.id === slug);

  const galleryImages = tourPackage?.galleryImages && tourPackage.galleryImages.length > 0
    ? tourPackage.galleryImages
    : (tourPackage?.heroImage ? [tourPackage.heroImage] : []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, galleryImages.length]);

  if (!tourPackage) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-editorial text-3xl font-bold text-[#173D35] mb-4">
          Tour Package Not Found
        </h1>
        <p className="text-sm text-stone-600 mb-6">
          The requested tour package does not exist or may have been updated.
        </p>
        <button
          onClick={() => navigate('/packages')}
          className="px-5 py-2.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm cursor-pointer"
        >
          View All Tour Packages
        </button>
      </div>
    );
  }

  const getPreset = (): VisualPreset => {
    switch (tourPackage.slug) {
      case 'grand-sikkim-odyssey-2-weeks':
        return 'kanchenjunga-sunrise';
      case 'north-sikkim-adventure':
        return 'north-sikkim';
      case 'west-south-sikkim-royal-heritage':
        return 'west-sikkim';
      case 'sikkim-highlights':
        return 'pelling';
      case 'gangtok-silk-route-escape':
        return 'east-sikkim';
      case 'sikkim-honeymoon-retreat':
        return 'honeymoon';
      case 'sikkim-royal-luxury-sanctuary':
        return 'luxury';
      default:
        return 'kanchenjunga-sunrise';
    }
  };

  const formattedPrice = formatPrice(tourPackage.startingPriceInr, currency);
  const whatsappUrl = buildWhatsAppUrl(
    buildPackageWhatsAppMessage(
      tourPackage.name,
      `${formattedPrice} ${tourPackage.pricingBasis}`,
      tourPackage.duration
    )
  );

  // Generate day-by-day plan based on package characteristics
  const generateItineraryDays = (pkg: TourPackage) => {
    if (pkg.detailedItinerary && pkg.detailedItinerary.length > 0) {
      return pkg.detailedItinerary.map((d, index) => ({
        day: d.day,
        title: d.title,
        desc: d.description,
        highlights: d.highlights || [],
        meals: d.mealsIncluded,
        stay: d.overnightStay,
        route: d.route,
        driveTime: d.driveTime,
        sightseeing: d.sightseeing || [],
        image: galleryImages[index % galleryImages.length] || pkg.heroImage,
      }));
    }

    const days = [];
    if (pkg.slug === 'gangtok-escape') {
      days.push({
        day: 1,
        title: 'Arrival at Bagdogra/Pakyong & Scenic Transfer to Gangtok',
        desc: 'Meet your dedicated mountain chauffeur upon arrival. Ascend through the lush Teesta River valley into the misty heights of Gangtok. Check into your hotel and spend a relaxed evening exploring the vehicle-free pedestrian promenade of MG Marg.',
        highlights: ['Teesta Valley drive', 'MG Marg walk'],
        meals: 'Dinner at hotel or own arrangements on MG Marg',
        stay: 'Gangtok Hotel / Boutique Stay',
        route: 'Bagdogra / NJP -> Gangtok',
        driveTime: '4.5 to 5 hours (125 km)',
        sightseeing: ['Sevoke Kali Mandir', 'Coronation Bridge', 'MG Marg'],
        image: galleryImages[0] || pkg.heroImage,
      });
      days.push({
        day: 2,
        title: 'Excursion to Sacred Tsomgo Lake & Baba Mandir (12,313 ft)',
        desc: 'Depart after breakfast for the high-altitude pilgrimage route toward the Indo-China border. Gaze upon the sacred turquoise glacial waters of Tsomgo Lake. Continue to the historic Baba Harbhajan Singh Memorial shrine. Return to Gangtok by late afternoon with sunset views.',
        highlights: ['Tsomgo Glacial Lake', 'Baba Mandir', 'Yak ride viewpoint'],
        meals: 'Breakfast at hotel',
        stay: 'Gangtok Hotel / Boutique Stay',
        route: 'Gangtok -> Tsomgo Lake -> Baba Mandir -> Gangtok',
        driveTime: '2.5 to 3 hours each way (40 km mountain road)',
        sightseeing: ['Tsomgo Lake', 'Baba Harbhajan Singh Mandir', 'Kyongnosla Alpine Sanctuary'],
        image: galleryImages[1] || pkg.heroImage,
      });
      days.push({
        day: 3,
        title: 'Gangtok Monasteries, Viewpoints & Departure',
        desc: 'Morning visit to Enchey Monastery, Do-Drul Chorten Stupa, and Namgyal Institute of Tibetology. Depart Gangtok for your return transfer to Bagdogra Airport (IXB) or NJP Railway Station with unforgettable memories of the Himalayas.',
        highlights: ['Enchey Monastery', 'Do-Drul Chorten', 'Tibetology Institute'],
        meals: 'Breakfast at hotel',
        stay: 'Departure',
        route: 'Gangtok -> Bagdogra / NJP',
        driveTime: '4.5 to 5 hours',
        sightseeing: ['Do-Drul Chorten', 'Namgyal Institute of Tibetology', 'Enchey Monastery'],
        image: galleryImages[2] || pkg.heroImage,
      });
    } else {
      // General dynamic generator for other itineraries
      for (let i = 1; i <= pkg.daysCount; i++) {
        if (i === 1) {
          days.push({
            day: 1,
            title: `Arrival & Scenic Mountain Drive to ${pkg.destinationsCovered[0]}`,
            desc: `Warm welcome by our dedicated chauffeur. Scenic drive up the Himalayan foothills along the roaring Teesta river to ${pkg.destinationsCovered[0]}. Relax and acclimatize with evening valley views.`,
            highlights: ['Arrival welcome', 'Teesta River scenic drive'],
            meals: 'Welcome refreshment & breakfast next day',
            stay: `${pkg.destinationsCovered[0]} Hotel / Homestay`,
            route: `Arrival Point -> ${pkg.destinationsCovered[0]}`,
            driveTime: '4 to 5 hours',
            sightseeing: [pkg.destinationsCovered[0]],
            image: galleryImages[0] || pkg.heroImage,
          });
        } else if (i === pkg.daysCount) {
          days.push({
            day: i,
            title: 'Farewell Himalayas & Return Transfer',
            desc: 'Final morning views of Kanchenjunga. Private transfer to Bagdogra Airport or NJP Railway Station for your scheduled return flight or train.',
            highlights: ['Morning mountain panorama', 'Downhill transfer'],
            meals: 'Breakfast included',
            stay: 'Departure',
            route: `${pkg.destinationsCovered[pkg.destinationsCovered.length - 1] || 'Sikkim'} -> Bagdogra / NJP`,
            driveTime: '4 to 5 hours',
            sightseeing: ['Scenic stops along Teesta valley'],
            image: galleryImages[(i - 1) % galleryImages.length] || pkg.heroImage,
          });
        } else {
          const dest = pkg.destinationsCovered[i % pkg.destinationsCovered.length] || pkg.destinationsCovered[0];
          days.push({
            day: i,
            title: `Exploration of ${dest} & High-Altitude Sights`,
            desc: `Full day of private curated sightseeing in ${dest}. Discover venerable Buddhist monasteries, panoramic sunrise viewpoints, tea gardens, and authentic artisan hamlets.`,
            highlights: [`${dest} landmarks`, 'Local Himalayan viewpoints'],
            meals: 'Breakfast included',
            stay: `${dest} Hotel`,
            route: `Local ${dest} circuit`,
            driveTime: '2 to 4 hours local transit',
            sightseeing: [dest],
            image: galleryImages[(i - 1) % galleryImages.length] || pkg.heroImage,
          });
        }
      }
    }
    return days;
  };

  const itineraryDays = generateItineraryDays(tourPackage);

  return (
    <div className="pt-20 bg-[#F8F6F0] min-h-screen pb-28 md:pb-16">
      {/* Hero Header with Authentic Photograph */}
      <div className="relative h-[55vh] min-h-[440px] text-white overflow-hidden">
        <VisualMedia
          src={tourPackage.heroImage}
          preset={getPreset()}
          alt={tourPackage.name}
          aspectRatio="auto"
          overlayOpacity="medium"
          className="w-full h-full"
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-white/80" aria-label="Breadcrumb">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
              className="hover:text-white"
            >
              Home
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <a
              href="/packages"
              onClick={(e) => {
                e.preventDefault();
                navigate('/packages');
              }}
              className="hover:text-white"
            >
              Tour Packages
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[#DFC89E] font-medium truncate max-w-[200px]">
              {tourPackage.name}
            </span>
          </nav>

          {/* Title & Price Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-[#DFC89E] border border-white/20">
                  <Clock className="w-3.5 h-3.5 text-[#EBA94B]" />
                  <span>{tourPackage.duration} · {tourPackage.travelStyle}</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-900/60 backdrop-blur-md text-emerald-200 border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Army PAP Permit Handled</span>
                </span>
                
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('gallery');
                    setLightboxIndex(0);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#EBA94B] text-[#103D35] hover:bg-[#f3be70] shadow-md transition-all cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5 text-[#103D35]" />
                  <span>📸 View {galleryImages.length} Photos</span>
                </button>
              </div>

              <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white leading-tight">
                {tourPackage.name}
              </h1>
              <p className="text-xs sm:text-sm text-white/90 max-w-2xl font-light leading-relaxed">
                {tourPackage.tagline}
              </p>

              {/* Destination Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] text-white/70 font-semibold mr-1">Covering:</span>
                {tourPackage.destinationsCovered.map((dest, dIdx) => (
                  <span
                    key={dIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-white/20 backdrop-blur-sm text-white border border-white/20"
                  >
                    <MapPin className="w-2.5 h-2.5 text-[#DFC89E]" />
                    <span>{dest}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/20 self-start md:self-auto text-right shadow-2xl">
              <div className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">
                Verified Direct Tariff
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#DFC89E] tabular-nums">
                {formattedPrice}
              </div>
              <div className="text-[11px] text-white/80">/ {tourPackage.pricingBasis}</div>
              <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center justify-end gap-1">
                <CheckCircle className="w-3 h-3" />
                <span>Zero Platform Markups</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-white border-b border-stone-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('itinerary')}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'itinerary'
                  ? 'border-[#173D35] text-[#173D35]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Day-by-Day Itinerary
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-4 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === 'gallery'
                  ? 'border-[#173D35] text-[#173D35]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <Camera className="w-4 h-4 text-[#EBA94B]" />
              <span>Photo Gallery ({galleryImages.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'details'
                  ? 'border-[#173D35] text-[#173D35]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Hotels, Transport & Inclusions
            </button>
            <button
              onClick={() => setActiveTab('enquire')}
              className={`py-4 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'enquire'
                  ? 'border-[#173D35] text-[#173D35]'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              Customise & Enquire
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>Book on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* TAB 1: Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                
                {/* 4-Pillar Quick Spec Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
                      <Building className="w-4 h-4 text-emerald-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-stone-400">Hotel Standard</div>
                      <div className="text-xs font-bold text-stone-900 truncate" title={tourPackage.accommodationCategory}>
                        {tourPackage.accommodationCategory.split(' ')[0]} Deluxe / Boutique
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                      <Car className="w-4 h-4 text-amber-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-stone-400">Mountain Fleet</div>
                      <div className="text-xs font-bold text-stone-900 truncate" title={tourPackage.transportDetails}>
                        Private High-Ground SUV
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-teal-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-stone-400">Permit Clearance</div>
                      <div className="text-xs font-bold text-stone-900 truncate">
                        100% Arranged (Army PAP)
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-stone-200 shadow-xs flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                      <Compass className="w-4 h-4 text-stone-700" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-bold text-stone-400">Max Elevation</div>
                      <div className="text-xs font-bold text-stone-900 truncate">
                        {tourPackage.maxAltitude || tourPackage.altitudeRange}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Journey Overview & Photo Strip */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
                      Journey Overview
                    </h2>
                    <button
                      type="button"
                      onClick={() => setActiveTab('gallery')}
                      className="text-xs font-bold text-[#173D35] hover:text-[#EBA94B] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>See All {galleryImages.length} Photos →</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {tourPackage.overview}
                  </p>

                  {/* 4-Photo Showcase Collage */}
                  <div className="pt-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#EBA94B]" />
                      <span>Package Visual Highlights</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {galleryImages.slice(0, 4).map((img, idx) => (
                        <div
                          key={idx}
                          className="relative h-28 rounded-xl overflow-hidden group cursor-pointer border border-stone-200 shadow-xs"
                          onClick={() => setLightboxIndex(idx)}
                        >
                          <img
                            src={img}
                            alt={`${tourPackage.name} highlight ${idx + 1}`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                          {idx === 3 && galleryImages.length > 4 && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold">
                              +{galleryImages.length - 3} More
                            </div>
                          )}
                          <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-[10px] text-white drop-shadow-md">
                            <span className="truncate bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded">
                              {tourPackage.destinationsCovered[idx] || `Spot ${idx + 1}`}
                            </span>
                            <Maximize2 className="w-3 h-3 text-[#EBA94B] opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Day by Day Plan with Illustrated Photos & Specs */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-editorial text-xl font-bold text-[#173D35]">
                        Day-by-Day Route & Activities
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Complete mountain itinerary including routes, travel durations, and sightseeing spots
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-stone-100 text-stone-700 rounded-full shrink-0">
                      {itineraryDays.length} Days Plan
                    </span>
                  </div>

                  {itineraryDays.map((item, idx) => (
                    <div
                      key={item.day}
                      className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 hover:border-[#DFC89E] transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-5">
                        {/* Day Photo Thumbnail */}
                        <div
                          className="w-full sm:w-48 h-36 rounded-xl overflow-hidden shrink-0 border border-stone-200 relative group cursor-pointer shadow-xs"
                          onClick={() => setLightboxIndex(idx % galleryImages.length)}
                        >
                          <img
                            src={item.image}
                            alt={`Day ${item.day}: ${item.title}`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                          <div className="absolute top-2.5 left-2.5">
                            <span className="w-7 h-7 rounded-full bg-[#173D35] text-white text-xs font-bold flex items-center justify-center shadow-md">
                              {item.day}
                            </span>
                          </div>
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px]">
                            <span className="truncate font-semibold text-white/95">
                              {tourPackage.destinationsCovered[idx % tourPackage.destinationsCovered.length] || `Spot ${item.day}`}
                            </span>
                            <Eye className="w-3.5 h-3.5 text-[#DFC89E] shrink-0" />
                          </div>
                        </div>

                        {/* Day Content */}
                        <div className="flex-1 space-y-2.5">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#173D35]/10 text-[#173D35]">
                              Day {item.day}
                            </span>
                            {item.driveTime && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-stone-100 text-stone-600">
                                <Clock className="w-3 h-3 text-stone-400" />
                                <span>{item.driveTime}</span>
                              </span>
                            )}
                          </div>

                          <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#173D35]">
                            {item.title}
                          </h4>

                          {item.route && (
                            <div className="text-xs font-medium text-stone-500 flex items-center gap-1.5">
                              <Car className="w-3.5 h-3.5 text-[#527568]" />
                              <span><strong>Route:</strong> {item.route}</span>
                            </div>
                          )}

                          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                            {item.desc}
                          </p>

                          {/* Sightseeing Chips */}
                          {item.sightseeing && item.sightseeing.length > 0 && (
                            <div className="pt-1 flex flex-wrap items-center gap-1.5">
                              <span className="text-[11px] font-semibold text-stone-400">Key Spots:</span>
                              {item.sightseeing.map((spot, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-[#F8F6F0] text-stone-700 border border-stone-200"
                                >
                                  <MapPin className="w-3 h-3 text-[#173D35]" />
                                  <span>{spot}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Highlights */}
                          {item.highlights && item.highlights.length > 0 && (
                            <div className="pt-1 flex flex-wrap items-center gap-1.5">
                              {item.highlights.map((h, hIdx) => (
                                <span
                                  key={hIdx}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-900 border border-amber-200"
                                >
                                  <Sparkles className="w-2.5 h-2.5 text-amber-600" />
                                  <span>{h}</span>
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Meals & Overnight Stay */}
                          <div className="pt-2.5 border-t border-stone-100 flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-stone-600">
                            <div className="flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-[#527568]" />
                              <span><strong>Meals:</strong> {item.meals}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Building className="w-3.5 h-3.5 text-[#527568]" />
                              <span><strong>Stay:</strong> {item.stay}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Photo Gallery */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-editorial text-2xl font-bold text-[#173D35] flex items-center gap-2">
                        <Camera className="w-6 h-6 text-[#EBA94B]" />
                        <span>{tourPackage.name} Photo Gallery</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-stone-600 mt-1">
                        High-resolution photographs of authentic landmarks, alpine viewpoints, and heritage sanctuaries covered in this package. Click any photo to view full size.
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 bg-[#173D35] text-[#EBA94B] rounded-full shrink-0">
                      {galleryImages.length} Photos
                    </span>
                  </div>

                  {/* Gallery Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                    {galleryImages.map((img, idx) => {
                      const spotName = tourPackage.destinationsCovered[idx % tourPackage.destinationsCovered.length] || `Scenic Landmark ${idx + 1}`;
                      return (
                        <div
                          key={idx}
                          className="group relative h-64 rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                          onClick={() => setLightboxIndex(idx)}
                        >
                          <img
                            src={img}
                            alt={`${tourPackage.name} - ${spotName}`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-colors" />

                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                              Photo {idx + 1} of {galleryImages.length}
                            </span>
                          </div>

                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                              <Maximize2 className="w-3.5 h-3.5" />
                            </div>
                          </div>

                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <div className="text-xs font-bold flex items-center gap-1.5 text-[#DFC89E]">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{spotName}</span>
                            </div>
                            <div className="text-[11px] text-white/80 line-clamp-1 mt-0.5">
                              {tourPackage.region} · Authentic Himalayan Landmark
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Hotels, Transport, Inclusions & Travel Info */}
            {activeTab === 'details' && (
              <div className="space-y-8">
                
                {/* Accommodation & Transportation Standards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Hotel Standard */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                    <h3 className="font-editorial text-lg font-bold text-[#173D35] flex items-center gap-2">
                      <Building className="w-5 h-5 text-emerald-700" />
                      <span>Hotel & Homestay Standards</span>
                    </h3>
                    <div className="space-y-2 text-xs sm:text-sm text-stone-700">
                      <div>
                        <strong>Standard Category:</strong> {tourPackage.accommodationCategory}
                      </div>
                      <div className="pt-1 text-xs text-stone-600 leading-relaxed">
                        <strong>Room Amenities:</strong> Heated blankets or room heaters provided at high-altitude stays (Lachung / Lachen). 24/7 running hot water geysers guaranteed across all properties.
                      </div>
                      <div className="pt-1 text-xs text-stone-600 leading-relaxed">
                        <strong>Meal Plan:</strong> {tourPackage.mealsSummary}
                      </div>
                    </div>
                  </div>

                  {/* Transport Standard */}
                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                    <h3 className="font-editorial text-lg font-bold text-[#173D35] flex items-center gap-2">
                      <Car className="w-5 h-5 text-amber-700" />
                      <span>Dedicated Mountain Transport</span>
                    </h3>
                    <div className="space-y-2 text-xs sm:text-sm text-stone-700">
                      <div>
                        <strong>Vehicle Logistics:</strong> {tourPackage.transportDetails}
                      </div>
                      <div className="pt-1 text-xs text-stone-600 leading-relaxed">
                        <strong>Mountain Fleet:</strong> High-clearance 4x4 / SUVs (Innova Crysta, Mahindra Scorpio, Bolero, Xylo) specifically licensed for Eastern Himalayan terrain.
                      </div>
                      <div className="pt-1 text-xs text-stone-600 leading-relaxed">
                        <strong>Chauffeur & Charges:</strong> Experienced local mountain driver with verified hill permit. Vehicle fuel, interstate toll taxes, driver night allowances, and parking fees are 100% included.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inclusions & Exclusions Side-by-Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-xs space-y-4">
                    <h3 className="font-editorial text-lg font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span>Package Inclusions</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs text-stone-700">
                      {tourPackage.inclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                    <h3 className="font-editorial text-lg font-bold text-stone-800 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-stone-400" />
                      <span>Package Exclusions</span>
                    </h3>
                    <ul className="space-y-2.5 text-xs text-stone-600">
                      {tourPackage.exclusions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-stone-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Protected Area Permits (PAP) & ID Card Requirements */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <h3 className="font-editorial text-xl font-bold text-[#173D35] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <span>Protected Area Permits (PAP) & Document Regulations</span>
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                    <p className="leading-relaxed">
                      <strong>Permit Process:</strong> {tourPackage.permitRequirements}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed bg-[#F8F6F0] p-3.5 rounded-xl border border-stone-200">
                      <strong>Operator Paperwork Assistance:</strong> {tourPackage.permitNotes}
                    </p>
                    <div>
                      <div className="font-semibold text-stone-800 mb-1.5">Mandatory Travel Documentation:</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {tourPackage.travelRequirements.map((req, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-stone-600">
                            <span className="text-[#DFC89E] font-bold">•</span>
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Travel Information, Altitude & Disclosures */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
                  <h3 className="font-editorial text-xl font-bold text-[#173D35] flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#527568]" />
                    <span>Important Travel Information & Mountain Disclosures</span>
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                    {/* Altitude and Health */}
                    <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 space-y-1.5">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-700" />
                        <span>Altitude & Health Guidelines (Max: {tourPackage.maxAltitude || tourPackage.altitudeRange})</span>
                      </div>
                      <p className="text-xs text-amber-950/80 leading-relaxed">
                        {tourPackage.altitudeAndHealthNote}
                      </p>
                    </div>

                    {/* Road and Weather */}
                    <div className="space-y-1">
                      <div className="font-bold text-stone-800">Mountain Roads & Himalayan Weather Conditions:</div>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {tourPackage.roadAndWeatherNote}
                      </p>
                    </div>

                    {/* Suitability */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 space-y-1.5">
                        <div className="font-bold text-emerald-900 text-xs">Recommended For:</div>
                        <ul className="space-y-1 text-xs text-emerald-950/80">
                          {tourPackage.whoItSuits.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1.5">
                        <div className="font-bold text-stone-800 text-xs">Not Recommended For:</div>
                        <ul className="space-y-1 text-xs text-stone-600">
                          {tourPackage.whoItDoesNotSuit.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-stone-400">✗</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Disclosures list */}
                    {tourPackage.disclosures && tourPackage.disclosures.length > 0 && (
                      <div className="pt-2">
                        <div className="font-bold text-stone-800 mb-1.5">Mandatory Operational Disclosures:</div>
                        <ul className="space-y-1.5 text-xs text-stone-600">
                          {tourPackage.disclosures.map((disc, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-stone-400 font-bold">•</span>
                              <span>{disc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Seasonality and Cancellation */}
                    <div className="pt-3 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="font-bold text-stone-800">Best Season to Visit:</div>
                        <p className="text-stone-600 mt-0.5">{tourPackage.bestMonths}</p>
                      </div>
                      <div>
                        <div className="font-bold text-stone-800">Cancellation & Refund Policy:</div>
                        <p className="text-stone-600 mt-0.5">{tourPackage.cancellationPolicy}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Frequently Asked Questions (Interactive Accordion) */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-xl font-bold text-[#173D35] flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-emerald-700" />
                      <span>Frequently Asked Questions</span>
                    </h3>
                    <span className="text-xs text-stone-500 font-medium">
                      {tourPackage.faqs.length} Questions Answered
                    </span>
                  </div>

                  <div className="space-y-3 pt-1">
                    {tourPackage.faqs.map((faq, idx) => {
                      const isOpen = openFaqIndex === idx;
                      return (
                        <div
                          key={idx}
                          className="border border-stone-200 rounded-xl overflow-hidden bg-[#FAFAF8] transition-all"
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                            className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer hover:bg-stone-50 transition-colors"
                          >
                            <span className="text-xs sm:text-sm font-bold text-stone-900">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-stone-500 shrink-0 transition-transform duration-200 ${
                                isOpen ? 'transform rotate-180 text-[#173D35]' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-4 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-white">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Customise & Enquire */}
            {activeTab === 'enquire' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
                  <h3 className="font-editorial text-2xl font-bold text-[#173D35] mb-2">
                    Customise This {tourPackage.name}
                  </h3>
                  <p className="text-xs text-stone-600 mb-6">
                    Adjust dates, group size, vehicle tier, or combine with other destinations. Our Gangtok team will prepare a formal customized proposal within 2 hours.
                  </p>
                  <CustomiseTripForm
                    initialDestination={tourPackage.destinationsCovered[0]}
                    initialTravelStyle={tourPackage.travelStyle}
                    sourcePage={`/packages/${tourPackage.slug}`}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Verified Pricing & Direct Mountain Desk CTAs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#DFC89E]/60 shadow-xl space-y-5 sticky top-28">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#173D35] font-bold font-mono">
                    Verified Mountain Tariff
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Best Price Guarantee
                  </span>
                </div>

                {tourPackage.startingPriceInr > 0 ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold font-editorial text-[#173D35]">
                        ₹{tourPackage.startingPriceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-stone-500 font-medium">/ {tourPackage.pricingBasis}</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-2 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Direct Local Operator Tariff · No Agent Margin</span>
                    </div>
                    {tourPackage.startingPriceNote && (
                      <p className="text-xs text-stone-500 mt-2.5 leading-relaxed">
                        {tourPackage.startingPriceNote}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="text-2xl font-bold font-editorial text-[#173D35]">
                      Custom Quote on Request
                    </div>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      Prices tailored to your travel month, vehicle preference, and hotel selection.
                    </p>
                  </div>
                )}
              </div>

              {/* Key Package Quick Facts */}
              <div className="grid grid-cols-2 gap-2.5 py-3 border-y border-stone-100 text-xs text-stone-600">
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">Duration</div>
                  <div className="font-semibold text-stone-800">{tourPackage.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">Region</div>
                  <div className="font-semibold text-stone-800">{tourPackage.region}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">Ideal For</div>
                  <div className="font-semibold text-stone-800 truncate" title={tourPackage.travelStyle}>{tourPackage.travelStyle}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-stone-400">Best Season</div>
                  <div className="font-semibold text-stone-800 truncate" title={tourPackage.bestMonths}>{tourPackage.bestMonths.split('(')[0]}</div>
                </div>
              </div>

              {/* Direct Booking CTA Buttons */}
              <div className="space-y-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md text-center cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Book on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveTab('enquire')}
                  className="w-full py-2.5 px-4 bg-[#173D35] hover:bg-[#0F2A24] text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors text-center cursor-pointer shadow-xs"
                >
                  Get a Free Tour Quote
                </button>

                <a
                  href="tel:+917001846727"
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-[#F8F6F0] hover:bg-[#eae6db] text-[#173D35] border border-stone-300 font-bold text-xs rounded-xl transition-all text-center cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#173D35]" />
                  <span>Call Desk: +91 70018 46727</span>
                </a>

                <a
                  href={`mailto:info@sikkimtourco.com?subject=Enquiry for ${encodeURIComponent(tourPackage.name)}&body=Hi Sikkim Tour Co.,\n\nI would like to enquire about ${encodeURIComponent(tourPackage.name)}.`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 font-medium text-xs rounded-xl transition-colors text-center cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-stone-500" />
                  <span>Email Enquiry</span>
                </a>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                <div className="flex items-center gap-2 text-stone-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Indian Army PAP & ILP paperwork handled</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Car className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dedicated mountain vehicles with local drivers</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <Info className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant WhatsApp response from Gangtok desk</span>
                </div>
              </div>
            </div>

            {/* Back button */}
            <button
              onClick={() => navigate('/packages')}
              className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Packages</span>
            </button>
          </div>
        </div>
      </div>

      {/* STICKY MOBILE CONVERSION BAR (Mobile Only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-3 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[10px] text-stone-500 uppercase font-semibold">Starting from</div>
          <div className="text-base sm:text-lg font-bold text-[#173D35] leading-none truncate">
            {tourPackage.startingPriceInr > 0 ? `₹${tourPackage.startingPriceInr.toLocaleString('en-IN')}` : 'Custom'}
            <span className="text-[10px] text-stone-500 font-normal"> / person</span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="tel:+917001846727"
            className="p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-stone-700 hover:bg-stone-100 transition-colors"
            aria-label="Call mountain desk"
          >
            <Phone className="w-4 h-4 text-[#173D35]" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Book on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="font-serif font-bold text-sm sm:text-base text-[#DFC89E]">
                {tourPackage.name}
              </span>
              <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-mono">
                {lightboxIndex + 1} / {galleryImages.length}
              </span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Centered Image with Next/Prev Buttons */}
          <div className="relative flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full">
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev > 0 ? prev - 1 : galleryImages.length - 1
                )
              }
              className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={galleryImages[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null && prev < galleryImages.length - 1 ? prev + 1 : 0
                )
              }
              className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white border border-white/20 transition-all cursor-pointer"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption & Thumbnails */}
          <div className="max-w-4xl mx-auto w-full text-center space-y-3">
            <div className="text-xs sm:text-sm text-white/90 font-medium">
              📍 {tourPackage.destinationsCovered[lightboxIndex % tourPackage.destinationsCovered.length] || tourPackage.name} · {tourPackage.region}
            </div>

            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setLightboxIndex(idx)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    lightboxIndex === idx
                      ? 'border-[#EBA94B] scale-110 shadow-lg'
                      : 'border-white/20 opacity-50 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
