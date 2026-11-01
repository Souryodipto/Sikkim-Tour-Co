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
} from 'lucide-react';

interface PackageDetailViewProps {
  slug: string;
}

export const PackageDetailView: React.FC<PackageDetailViewProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [activeTab, setActiveTab] = useState<'itinerary' | 'gallery' | 'details' | 'enquire'>('itinerary');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
        highlights: d.highlights,
        meals: d.mealsIncluded,
        stay: d.overnightStay,
        image: galleryImages[index % galleryImages.length] || pkg.heroImage,
      }));
    }

    const days = [];
    if (pkg.slug === 'gangtok-escape') {
      days.push({
        day: 1,
        title: 'Arrival at Bagdogra/Pakyong & Scenic Transfer to Gangtok',
        desc: 'Meet your dedicated mountain chauffeur upon arrival. Ascend through the lush Teesta River valley into the misty heights of Gangtok. Check into your hotel and spend a relaxed evening exploring the vehicle-free pedestrian promenade of MG Marg.',
        meals: 'Dinner at hotel or own arrangements on MG Marg',
        stay: 'Gangtok Hotel / Boutique Stay',
        image: galleryImages[0] || pkg.heroImage,
      });
      days.push({
        day: 2,
        title: 'Excursion to Sacred Tsomgo Lake & Baba Mandir (12,313 ft)',
        desc: 'Depart after breakfast for the high-altitude pilgrimage route toward the Indo-China border. Gaze upon the sacred turquoise glacial waters of Tsomgo Lake. Continue to the historic Baba Harbhajan Singh Memorial shrine. Return to Gangtok by late afternoon with sunset views.',
        meals: 'Breakfast at hotel',
        stay: 'Gangtok Hotel / Boutique Stay',
        image: galleryImages[1] || pkg.heroImage,
      });
      days.push({
        day: 3,
        title: 'Gangtok Monasteries, Viewpoints & Departure',
        desc: 'Morning visit to Enchey Monastery, Do-Drul Chorten Stupa, and Namgyal Institute of Tibetology. Depart Gangtok for your return transfer to Bagdogra Airport (IXB) or NJP Railway Station with unforgettable memories of the Himalayas.',
        meals: 'Breakfast at hotel',
        stay: 'Departure',
        image: galleryImages[2] || pkg.heroImage,
      });
    } else if (pkg.slug === 'north-sikkim-adventure') {
      days.push({
        day: 1,
        title: 'Arrival in Gangtok & Acclimatisation',
        desc: 'Arrive in Gangtok, meet our representative, and settle in. Evening briefing on high-altitude clothing and road conditions for North Sikkim.',
        meals: 'Breakfast next morning',
        stay: 'Gangtok Deluxe Hotel',
        image: galleryImages[0] || pkg.heroImage,
      });
      days.push({
        day: 2,
        title: 'Scenic Drive to Lachen via Chungthang Confluence',
        desc: 'Board your commercial mountain 4x4 / SUV. Journey through dramatic mountain gorges, stopping at Singhik Viewpoint and the Seven Sisters Waterfall. Reach the high-altitude village of Lachen (8,800 ft) by early evening.',
        meals: 'Breakfast in Gangtok, Lunch on way, Dinner in Lachen',
        stay: 'Lachen Mountain Lodge / Homestay',
        image: galleryImages[1] || pkg.heroImage,
      });
      days.push({
        day: 3,
        title: 'Sacred Gurudongmar Lake (17,800 ft) & Transfer to Lachung',
        desc: 'Pre-dawn departure (4:30 AM) across cold desert plateaus to the revered Gurudongmar Lake, nestled beneath sheer snow peaks. After prayer and photography, return to Lachen for hot lunch, then transfer to the picturesque village of Lachung.',
        meals: 'Breakfast, Lunch & Dinner included',
        stay: 'Lachung Mountain Lodge / Homestay',
        image: galleryImages[2] || pkg.heroImage,
      });
      days.push({
        day: 4,
        title: 'Yumthang Valley of Flowers & Return to Gangtok',
        desc: 'Ascend to the breathtaking alpine meadows of Yumthang Valley (11,690 ft) and natural hot springs. Optional extension to Zero Point (15,300 ft). After lunch, descend back along the Teesta valley to Gangtok.',
        meals: 'Breakfast in Lachung, Lunch on route',
        stay: 'Gangtok Deluxe Hotel',
        image: galleryImages[3] || pkg.heroImage,
      });
      days.push({
        day: 5,
        title: 'Departure Transfer to Bagdogra / NJP',
        desc: 'Morning checkout and scenic downhill drive to Bagdogra Airport (IXB) or NJP Railway Station for your onward journey.',
        meals: 'Breakfast included',
        stay: 'Departure',
        image: galleryImages[4] || pkg.heroImage,
      });
    } else {
      // General dynamic generator for other itineraries
      for (let i = 1; i <= pkg.daysCount; i++) {
        if (i === 1) {
          days.push({
            day: 1,
            title: `Arrival & Scenic Mountain Drive to ${pkg.destinationsCovered[0]}`,
            desc: `Warm welcome by our dedicated chauffeur. Scenic drive up the Himalayan foothills along the roaring Teesta river to ${pkg.destinationsCovered[0]}. Relax and acclimatize with evening valley views.`,
            meals: 'Welcome refreshment & breakfast next day',
            stay: `${pkg.destinationsCovered[0]} Hotel`,
            image: galleryImages[0] || pkg.heroImage,
          });
        } else if (i === pkg.daysCount) {
          days.push({
            day: i,
            title: 'Farewell Himalayas & Return Transfer',
            desc: 'Final morning views of Kanchenjunga. Private transfer to Bagdogra Airport or NJP Railway Station for your scheduled return flight or train.',
            meals: 'Breakfast included',
            stay: 'Departure',
            image: galleryImages[(i - 1) % galleryImages.length] || pkg.heroImage,
          });
        } else {
          const dest = pkg.destinationsCovered[i % pkg.destinationsCovered.length] || pkg.destinationsCovered[0];
          days.push({
            day: i,
            title: `Exploration of ${dest} & Cultural Landmarks`,
            desc: `Full day of private curated sightseeing in ${dest}. Discover venerable Buddhist monasteries, panoramic sunrise viewpoints, tea gardens, and authentic artisan hamlets.`,
            meals: 'Breakfast included',
            stay: `${dest} Hotel`,
            image: galleryImages[(i - 1) % galleryImages.length] || pkg.heroImage,
          });
        }
      }
    }
    return days;
  };

  const itineraryDays = generateItineraryDays(tourPackage);

  return (
    <div className="pt-20 bg-[#F8F6F0] min-h-screen">
      {/* Hero Header with Authentic Photograph */}
      <div className="relative h-[52vh] min-h-[420px] text-white overflow-hidden">
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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-md text-[#DFC89E] border border-white/20">
                  <Clock className="w-3.5 h-3.5 text-[#EBA94B]" />
                  <span>{tourPackage.duration} · {tourPackage.travelStyle}</span>
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
              <p className="text-xs sm:text-sm text-white/90 max-w-2xl font-light">
                {tourPackage.tagline}
              </p>
            </div>

            <div className="bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/20 self-start md:self-auto text-right shadow-xl">
              <div className="text-[11px] text-white/70 uppercase tracking-wider font-semibold">
                Starting from (Indicative)
              </div>
              <div className="text-2xl sm:text-3xl font-bold font-editorial text-[#DFC89E] tabular-nums">
                {formattedPrice}
              </div>
              <div className="text-[11px] text-white/70">/ {tourPackage.pricingBasis}</div>
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
              Inclusions & Details
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
              className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp Enquiry</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Left Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* TAB 1: Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                {/* Journey Overview & Photo Strip */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
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

                {/* Day by Day Plan with Illustrated Photos */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-xl font-bold text-[#173D35]">
                      Day-by-Day Route & Activities
                    </h3>
                    <span className="text-xs font-mono text-stone-500">
                      {itineraryDays.length} Days Itinerary
                    </span>
                  </div>

                  {itineraryDays.map((item, idx) => (
                    <div
                      key={item.day}
                      className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4 hover:border-[#EBA94B]/40 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        {/* Day Photo Thumbnail */}
                        <div
                          className="w-full sm:w-44 h-32 rounded-xl overflow-hidden shrink-0 border border-stone-200 relative group cursor-pointer shadow-xs"
                          onClick={() => setLightboxIndex(idx % galleryImages.length)}
                        >
                          <img
                            src={item.image}
                            alt={`Day ${item.day}: ${item.title}`}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute top-2 left-2">
                            <span className="w-6 h-6 rounded-full bg-[#173D35] text-white text-xs font-bold flex items-center justify-center shadow-md">
                              {item.day}
                            </span>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white text-[10px]">
                            <span className="truncate font-semibold text-white/90">
                              {tourPackage.destinationsCovered[idx % tourPackage.destinationsCovered.length]}
                            </span>
                            <Eye className="w-3.5 h-3.5 text-[#EBA94B] shrink-0" />
                          </div>
                        </div>

                        {/* Day Content */}
                        <div className="flex-1 space-y-2">
                          <h4 className="font-editorial text-lg font-bold text-[#173D35]">
                            Day {item.day}: {item.title}
                          </h4>
                          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                            {item.desc}
                          </p>

                          <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-x-6 gap-y-1 text-xs text-stone-500">
                            <div className="flex items-center gap-1.5">
                              <Utensils className="w-3.5 h-3.5 text-[#527568]" />
                              <span>Meals: {item.meals}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Building className="w-3.5 h-3.5 text-[#527568]" />
                              <span>Overnight: {item.stay}</span>
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
                <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-3">
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
                          className="group relative h-64 rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all cursor-pointer"
                          onClick={() => setLightboxIndex(idx)}
                        >
                          <img
                            src={img}
                            alt={`${tourPackage.name} - ${spotName}`}
                            loading="lazy"
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
                              {tourPackage.region} · Authentic Destination
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Details & Inclusions */}
            {activeTab === 'details' && (
              <div className="space-y-8">
                {/* Inclusions & Exclusions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
                    <h3 className="font-editorial text-lg font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span>What is Included</span>
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

                  <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
                    <h3 className="font-editorial text-lg font-bold text-stone-800 flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-stone-400" />
                      <span>What is Excluded</span>
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

                {/* Accommodation & Transport Details */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
                  <h3 className="font-editorial text-xl font-bold text-[#173D35]">
                    Accommodation & Mountain Transport
                  </h3>
                  <div className="space-y-3 text-xs sm:text-sm text-stone-700">
                    <div className="flex items-start gap-3">
                      <Building className="w-4 h-4 text-[#527568] shrink-0 mt-1" />
                      <div>
                        <strong>Accommodation Standard:</strong> {tourPackage.accommodationCategory}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Car className="w-4 h-4 text-[#527568] shrink-0 mt-1" />
                      <div>
                        <strong>Transport Logistics:</strong> {tourPackage.transportDetails}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Utensils className="w-4 h-4 text-[#527568] shrink-0 mt-1" />
                      <div>
                        <strong>Meal Arrangement:</strong> {tourPackage.mealsSummary}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travel Requirements & Permit Notices */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
                  <h3 className="font-editorial text-xl font-bold text-[#173D35] flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#527568]" />
                    <span>Travel Requirements & Seasonal Notes</span>
                  </h3>
                  <div className="space-y-2 text-xs text-stone-700">
                    <div className="font-semibold text-stone-800">Documentation Required:</div>
                    {tourPackage.travelRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-stone-600">
                        <span className="text-[#C4A36A]">•</span>
                        <span>{req}</span>
                      </div>
                    ))}
                    <div className="pt-2 font-semibold text-stone-800">Seasonal Availability:</div>
                    <p className="text-stone-600">{tourPackage.seasonalAvailability}</p>
                    <div className="pt-2 font-semibold text-stone-800">Cancellation Terms:</div>
                    <p className="text-stone-600">{tourPackage.cancellationPolicy}</p>
                  </div>
                </div>

                {/* FAQs */}
                <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs space-y-4">
                  <h3 className="font-editorial text-xl font-bold text-[#173D35] flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#527568]" />
                    <span>Frequently Asked Questions</span>
                  </h3>
                  <div className="space-y-4">
                    {tourPackage.faqs.map((faq, idx) => (
                      <div key={idx} className="border-b border-stone-100 pb-3 last:border-b-0">
                        <div className="text-xs sm:text-sm font-semibold text-stone-900 mb-1">
                          {faq.question}
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Customise & Enquire */}
            {activeTab === 'enquire' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs">
                  <h3 className="font-editorial text-2xl font-bold text-[#173D35] mb-2">
                    Customise This {tourPackage.name}
                  </h3>
                  <p className="text-xs text-stone-600 mb-6">
                    Adjust dates, group size, vehicle tier, or combine with other destinations. Our Gangtok team will prepare a formal proposal.
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

          {/* Right Column: Quotes on Request & Direct Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-[#EBA94B]/30 shadow-xl space-y-4">
              <div className="text-[10px] uppercase tracking-wider text-[#EBA94B] font-bold font-mono">
                Transparent Himalayan Pricing
              </div>
              <div className="pb-3 border-b border-stone-100">
                <div className="text-2xl font-bold font-serif text-[#173D35]">
                  Custom Quote on Request
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                  Prices tailored directly to your travel month, vehicle preference (Innova Crysta / Scorpio), and hotel selection.
                </p>
              </div>

              {/* Direct Booking CTA Buttons */}
              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/917001846727?text=${encodeURIComponent(
                    `Hi Sikkim Tour Co., I want a quote for "${tourPackage.name}" (${tourPackage.duration}). Please send details.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md text-center"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Get Quote on WhatsApp</span>
                </a>

                <a
                  href="tel:+917001846727"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm text-center"
                >
                  <Phone className="w-4 h-4 fill-[#103D35]" />
                  <span>Call Us (+91 70018 46727)</span>
                </a>

                <a
                  href={`mailto:info@sikkimtourco.com?subject=Inquiry for ${encodeURIComponent(tourPackage.name)}&body=Hi Sikkim Tour Co.,\n\nI would like to request a quote for ${encodeURIComponent(tourPackage.name)}.`}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 font-semibold text-xs rounded-xl transition-colors text-center"
                >
                  <Mail className="w-4 h-4 text-[#173D35]" />
                  <span>Email Us Inquiry</span>
                </a>

                <button
                  onClick={() => setActiveTab('enquire')}
                  className="w-full py-2 px-4 bg-[#173D35] hover:bg-[#0F2A24] text-white font-semibold text-xs rounded-xl transition-colors text-center cursor-pointer"
                >
                  Customise Dates & Details Online
                </button>
              </div>

              <div className="text-[11px] text-stone-500 leading-relaxed border-t border-stone-100 pt-2.5">
                <Info className="w-3.5 h-3.5 text-stone-400 inline mr-1" />
                No login or account creation needed. You receive immediate personalized responses.
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
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
