import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { destinationsData, allSikkimSpots, TouristSpot } from '../data/destinations';
import { tourPackagesData } from '../data/packages';
import { experiencesData } from '../data/experiences';
import { travelGuidesData } from '../data/guides';
import { VisualMedia } from '../components/VisualMedia';
import { SearchPanel } from '../components/SearchPanel';
import { PackageCard } from '../components/PackageCard';
import { DestinationCard } from '../components/DestinationCard';
import { TouristSpotCard } from '../components/TouristSpotCard';
import { TouristSpotModal } from '../components/TouristSpotModal';
import { CustomiseTripForm } from '../components/CustomiseTripForm';
import { WhatToExpect } from '../components/WhatToExpect';
import { getAllReviews, Review } from '../data/reviews';
import { ReviewCard } from '../components/ReviewCard';
import { WriteReviewModal } from '../components/WriteReviewModal';
import { Himalayan3DExplorer } from '../components/explorer3d/Himalayan3DExplorer';
import { accommodationsData } from '../data/accommodations';
import { siteConfig, buildGeneralWhatsAppMessage, buildWhatsAppUrl } from '../config/site';
import {
  Compass,
  Sparkles,
  MapPin,
  Calendar,
  Shield,
  FileCheck2,
  Globe,
  ArrowRight,
  MessageSquare,
  ChevronRight,
  Mountain,
  HeartHandshake,
  Check,
  ExternalLink,
  Crown,
  BookOpen,
  Star,
  ShieldCheck,
  Hotel,
  Layers,
  Send,
  Clock,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD'>('INR');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);
  const [reviewsList, setReviewsList] = useState<Review[]>(() => getAllReviews());
  const [reviewsTab, setReviewsTab] = useState<'all' | 'indian' | 'international' | 'family' | 'couple'>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const generalWhatsAppUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  // Statistics calculation for reviews showcase
  const averageRating = (
    reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length
  ).toFixed(1);

  // Filtered reviews for Homepage showcase
  const displayedReviews = reviewsList
    .filter((r) => {
      if (reviewsTab === 'indian') return r.originType === 'indian';
      if (reviewsTab === 'international') return r.originType === 'international';
      if (reviewsTab === 'family') return r.tripStyle === 'Family Tour' || r.travellerType === 'Family with Kids';
      if (reviewsTab === 'couple') return r.tripStyle === 'Honeymoon' || r.travellerType === 'Couple';
      return true;
    })
    .slice(0, 6);

  // Featured tourist spots for the home gallery (curated across all 4 districts)
  const featuredSpots = allSikkimSpots.filter((s) =>
    [
      'gurudongmar-lake',
      'yumthang-valley',
      'rabdentse-ruins',
      'yuksom-norbugang',
      'samdruptse-hill',
      'temi-tea-estate',
    ].includes(s.id)
  );

  return (
    <div className="flex flex-col min-h-screen font-sans bg-[#F8F6F0] text-[#263238]">
      {/* SECTION B: 3D CINEMATIC HERO WITH MOUNTAIN BACKGROUND */}
      <section className="relative min-h-[94vh] flex flex-col justify-between pt-24 pb-12 sm:pb-16 text-white overflow-hidden bg-[#103D35] perspective-1200">
        {/* Hero Background Layer: Majestic Kanchenjunga Sunrise */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85"
            alt="Mount Kanchenjunga Sunrise over Sikkim Eastern Himalayas"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-subtle"
          />
          {/* Layered Gradient Overlays in Official Brand Palette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#103D35]/85 via-[#103D35]/70 to-[#0A2621]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EBA94B]/15 via-transparent to-transparent" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center items-center text-center my-auto">
          {/* 3D Floating Official Brand Badge with Logo */}
          <div className="inline-flex items-center gap-3 px-5 py-2 bg-black/60 backdrop-blur-md rounded-full border border-[#EBA94B]/60 text-xs text-[#EBA94B] tracking-wider uppercase mb-6 shadow-2xl card-3d-interactive animate-in fade-in duration-300">
            <img src="/logo.png" alt="Sikkim Tour Co." className="w-6 h-6 rounded-full object-cover border border-[#EBA94B]" />
            <span className="font-extrabold tracking-widest text-[#FFFFFF]">
              Sikkim Tour Co. <span className="text-[#EBA94B]">·</span> Your Journey. Our Mountains.
            </span>
          </div>

          {/* 3D Floating Mountain Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6 max-w-3xl">
            <div className="px-3 py-1 rounded-full bg-[#103D35]/80 backdrop-blur-md border border-[#3B7FA3]/50 text-[11px] font-semibold text-white shadow-lg flex items-center gap-1.5 card-3d-interactive">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>🏔️ Mt. Kanchenjunga: 28,169 ft</span>
              <span className="text-[#EBA94B]">• Sacred Peak</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#103D35]/80 backdrop-blur-md border border-[#3B7FA3]/50 text-[11px] font-semibold text-white shadow-lg flex items-center gap-1.5 card-3d-interactive">
              <span>🗺️ 16 Verified GIS Satellite Checkpoints</span>
              <span className="text-emerald-300">• 3D Elevation</span>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#103D35]/80 backdrop-blur-md border border-[#3B7FA3]/50 text-[11px] font-semibold text-white shadow-lg flex items-center gap-1.5 card-3d-interactive">
              <span>🛡️ Indian Army Permit Rules Disclosed</span>
              <span className="text-[#EBA94B]">• Direct Concierge</span>
            </div>
          </div>

          {/* Headline with 3D Depth */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FFFFFF] max-w-4xl leading-[1.08] mb-6 drop-shadow-2xl">
            Find Your Way Into the Himalayas.
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-lg text-white/95 max-w-2xl font-normal leading-relaxed mb-8 drop-shadow-md">
            Discover extraordinary landscapes, sacred royal monasteries, real satellite terrain cartography, and authentic heritage retreats across Sikkim. Direct WhatsApp & Email concierge. Zero login required.
          </p>

          {/* Primary & Secondary 3D CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href="https://wa.me/919733022334?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20plan%20a%20custom%20Sikkim%20journey."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 card-3d-interactive"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp (+91 97330 22334)</span>
            </a>
            <button
              onClick={() => navigate('/3d-explorer')}
              className="px-6 py-3.5 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-extrabold text-sm rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 card-3d-interactive border border-white/40"
            >
              <Mountain className="w-4 h-4 text-[#103D35]" />
              <span>Real Satellite Mountain Map</span>
            </button>
            <button
              onClick={() => navigate('/packages')}
              className="px-6 py-3.5 bg-[#3B7FA3]/80 hover:bg-[#3B7FA3] backdrop-blur-md text-white border border-white/40 font-bold text-sm rounded-xl transition-all shadow-lg card-3d-interactive"
            >
              Explore 15 Tour Packages
            </button>
          </div>
        </div>

        {/* Hero Search Panel in 3D Card Style */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-auto">
          <SearchPanel />
        </div>
      </section>

      {/* SECTION C: 3D TRUST & SERVICE COMMITMENTS WITH PINE FOREST BACKGROUND */}
      <section className="relative py-12 text-[#263238] overflow-hidden border-b border-[#EBA94B]/20">
        {/* Background Image: Misty Himalayan Pine Ridge */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-15">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80"
            alt="Himalayan Pine Forest"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EBA94B]/30 shadow-md card-3d-interactive flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#103D35] flex items-center justify-center text-[#EBA94B] shrink-0 shadow-sm">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#103D35]">
                  Personalised Itineraries
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mt-1">
                  Flexible plans built around your travel pace, interests, and family requirements across Sikkim.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EBA94B]/30 shadow-md card-3d-interactive flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#103D35] flex items-center justify-center text-[#EBA94B] shrink-0 shadow-sm">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#103D35]">
                  Local Mountain Chauffeurs
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mt-1">
                  Dedicated high-clearance 4x4 vehicles and experienced Sikkim mountain drivers for rough passes.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EBA94B]/30 shadow-md card-3d-interactive flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#103D35] flex items-center justify-center text-[#EBA94B] shrink-0 shadow-sm">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#103D35]">
                  Custom Quotes on Request
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mt-1">
                  Clear itemised inclusions with no hidden charges, unexpected driver fees, or misleading fixed rates.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EBA94B]/30 shadow-md card-3d-interactive flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#103D35] flex items-center justify-center text-[#EBA94B] shrink-0 shadow-sm">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-[#103D35]">
                  Permits Handled Pre-Trip
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mt-1">
                  Full coordination of Inner Line Permits (ILP) and North/East Sikkim Protected Area Permits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLAGSHIP 14-DAY / 2-WEEK EXPEDITION SPOTLIGHT BANNER WITH MOUNTAIN BACKGROUND */}
      <section className="relative py-14 text-white overflow-hidden border-b border-[#EBA94B]/40 bg-[#103D35]">
        {/* Background Ridge Image with Gradient */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=80"
            alt="Himalayan Mountain Range"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#EBA94B]/20 border border-[#EBA94B]/60 rounded-full text-[#EBA94B] text-xs font-bold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-[#EBA94B]" />
                <span>Featured Flagship Journey</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
                Grand Sikkim Odyssey: Complete 2-Week Expedition
              </h2>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-3xl">
                14 Days & 13 Nights covering all four districts of Sikkim: East Sikkim (Gangtok & 32-hairpin Silk Route), North Sikkim (Gurudongmar Lake 17,800 ft & Yumthang Valley), South Sikkim (Samdruptse 135-ft Colossus & Temi Tea Estate), and West Sikkim (Yuksom 1642 Coronation Throne & Rabdentse Royal Ruins).
              </p>
              <div className="flex flex-wrap gap-2 pt-1 text-xs text-[#EBA94B]">
                <span className="bg-black/40 px-3 py-1 rounded-full border border-white/20 font-medium">14 Days / 13 Nights</span>
                <span className="bg-black/40 px-3 py-1 rounded-full border border-white/20 font-medium">All 4 Sikkim Districts</span>
                <span className="bg-[#EBA94B] text-[#103D35] px-3 py-1 rounded-full font-bold">Custom Quote on Request</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => navigate('/packages/grand-sikkim-odyssey-2-weeks')}
                className="w-full py-3.5 px-6 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-extrabold text-xs sm:text-sm rounded-xl transition-all shadow-lg text-center card-3d-interactive border border-white/30"
              >
                View Full 14-Day Itinerary
              </button>
              <button
                onClick={() => navigate('/customise-trip')}
                className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/40 font-bold text-xs sm:text-sm rounded-xl transition-all text-center card-3d-interactive"
              >
                Customise 2-Week Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: REAL SIKKIM SATELLITE & MOUNTAIN MAP WITH LIVE WEATHER & PASSES */}
      <section className="relative py-16 sm:py-20 bg-[#0A2621] text-white border-b border-[#EBA94B]/30 overflow-hidden">
        {/* Subtle Celestial Mountain Landscape Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=80"
            alt="Snow Peaks Night"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#EBA94B] mb-1.5 flex items-center gap-1.5">
                <Mountain className="w-3.5 h-3.5" />
                <span>Authentic GIS Satellite Cartography · Real Pass Telemetry</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FFFFFF]">
                Real Sikkim Satellite & Mountain Map
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-2xl leading-relaxed">
                Authentic satellite photography, verified GPS coordinates, elevation profiles, and real-time pass condition telemetry across North, East, West, and South Sikkim. Click any mountain pass to inspect altitudes, road clearance, windchill, and mandatory Indian Army permit requirements.
              </p>
            </div>

            <button
              onClick={() => navigate('/3d-explorer')}
              className="inline-flex items-center gap-1.5 px-5 py-3 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-extrabold text-xs rounded-xl transition-all shadow-lg card-3d-interactive shrink-0"
            >
              <span>Full-Screen Map Observatory</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Embedded Real Satellite Map Component */}
          <div className="rounded-2xl overflow-hidden border border-[#EBA94B]/40 shadow-2xl card-3d-interactive">
            <Himalayan3DExplorer />
          </div>
        </div>
      </section>

      {/* SECTION E: 15 CURATED SIKKIM TOUR PACKAGES (QUOTES ON REQUEST) WITH LANDSCAPE BACKGROUND */}
      <section className="relative py-16 sm:py-20 bg-[#F8F6F0] overflow-hidden border-b border-stone-200">
        {/* Subtle Mountain Valley Texture */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
          <img
            src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=80"
            alt="Valley of Flowers"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#103D35] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
                <span>Sikkim Tour Co. · 15 Distinct Authentic Package Types</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103D35]">
                Curated Himalayan Tour Packages
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Every journey is customized to your exact travel dates, vehicle preference, and hotel tier. All packages are quoted transparently on request.
              </p>
            </div>

            <button
              onClick={() => navigate('/packages')}
              className="px-5 py-2.5 bg-[#103D35] hover:bg-[#0A2621] text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 self-start md:self-auto card-3d-interactive"
            >
              <span>View All 15 Packages</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EBA94B]" />
            </button>
          </div>

          {/* MANDATORY TRAVEL PERMIT DISCLOSURE BANNER */}
          <div className="mb-8 p-4 rounded-xl bg-red-950 text-white border border-red-500/60 shadow-lg flex items-start gap-3 card-3d-interactive">
            <ShieldCheck className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <strong className="text-amber-200 block font-bold">
                Official Indian Army Permit Advisory:
              </strong>
              <span>
                Protected Area Permits for North Sikkim (Gurudongmar, Yumthang) and East Sikkim (Nathula, Tsomgo)
                mandate original Voter ID card or Passport. <u>Aadhaar and PAN cards are strictly not accepted</u> at military checkposts.
              </span>
            </div>
          </div>

          {/* Package Cards Grid (First 6 Packages in 3D Card Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tourPackagesData.slice(0, 6).map((pkg) => (
              <div key={pkg.id} className="card-3d-interactive">
                <PackageCard tourPackage={pkg} />
              </div>
            ))}
          </div>

          {/* Pricing Notice */}
          <div className="p-4 bg-white/95 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5 shadow-sm card-3d-interactive">
            <Shield className="w-4 h-4 text-[#EBA94B] shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#103D35]">Transparent Pricing Policy:</strong> {siteConfig.pricingNotice}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION D: FEATURED SIKKIM DISTRICTS WITH MOUNTAIN BACKGROUND */}
      <section className="relative py-16 sm:py-20 bg-white border-b border-stone-200 overflow-hidden">
        {/* Subtle Hill Silhouette Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=80"
            alt="Mountain Silhouette"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#3B7FA3] mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#EBA94B]" />
                <span>The 4 Sovereign Districts of Sikkim</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103D35]">
                Featured Sikkim Districts
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-xl">
                Explore legendary mountain passes, sacred high-altitude lakes, living monasteries, and royal ruins across Sikkim’s four districts.
              </p>
            </div>
            <button
              onClick={() => navigate('/destinations')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#103D35] hover:text-[#3B7FA3] transition-colors"
            >
              <span>View All 44 Tourist Spots</span>
              <ArrowRight className="w-4 h-4 text-[#EBA94B]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinationsData.map((destination) => (
              <div key={destination.id} className="card-3d-interactive">
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR TOURIST SPOTS & HISTORICAL SANCTUARIES GALLERY */}
      <section className="relative py-16 sm:py-20 bg-[#F8F6F0] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#3B7FA3] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
                <span>Sacred & Historical Landmarks</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103D35]">
                Iconic Tourist Spots of Sikkim
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Every spot in Sikkim tells a story of royal Chogyal dynasties, Buddhist miracles, or Himalayan biodiversity. Click any spot to read its full history and lore.
              </p>
            </div>
            <button
              onClick={() => navigate('/destinations')}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#103D35] hover:text-[#3B7FA3] transition-colors"
            >
              <span>Explore All Tourist Spots</span>
              <ArrowRight className="w-4 h-4 text-[#EBA94B]" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpots.map((spot) => (
              <div key={spot.id} className="card-3d-interactive">
                <TouristSpotCard
                  spot={spot}
                  onSelect={(s) => setSelectedSpot(s)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION: HANDPICKED HIMALAYAN STAYS MARKETPLACE WITH TEA ESTATE BACKGROUND */}
      <section className="relative py-16 sm:py-20 bg-white border-b border-stone-200 overflow-hidden">
        {/* Subtle Tea Estate Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
          <img
            src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80"
            alt="Tea Estate"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#3B7FA3] mb-1.5 flex items-center gap-1.5">
                <Hotel className="w-3.5 h-3.5 text-[#EBA94B]" />
                <span>Audited Himalayan Hospitality</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103D35]">
                Heritage Sanctuaries, Boutique Retreats & Homestays
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl">
                Independently audited for mountain radiator heating, pure Himalayan spring water, authentic Sikkimese hosts, and unobstructed Kanchenjunga sunrise vistas.
              </p>
            </div>

            <button
              onClick={() => navigate('/stays')}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#103D35] hover:text-[#3B7FA3] transition-colors"
            >
              <span>View All Verified Properties</span>
              <ArrowRight className="w-4 h-4 text-[#EBA94B]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accommodationsData.slice(0, 3).map((stay) => (
              <div
                key={stay.id}
                onClick={() => navigate(`/stays/${stay.slug}`)}
                className="bg-[#F8F6F0] rounded-2xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col group card-3d-interactive"
              >
                <div className="relative h-48 w-full overflow-hidden bg-stone-200">
                  <img
                    src={stay.heroImage}
                    alt={stay.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded bg-[#103D35]/90 backdrop-blur-md text-[#EBA94B] text-[10px] font-bold uppercase tracking-wider">
                    {stay.propertyType}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-[#3B7FA3] font-semibold mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#EBA94B]" />
                      <span>{stay.location} · {stay.district}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[#103D35] group-hover:text-[#3B7FA3] transition-colors">
                      {stay.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
                      {stay.tagline}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#103D35] font-bold">Custom Quote on Request</span>
                    <span className="text-[#3B7FA3] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                      Inspect Rooms <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION I: WHY CHOOSE US WITH VALLEY BACKGROUND & 3D FROSTED GLASS CARDS */}
      <section className="relative py-16 sm:py-20 bg-[#F8F6F0] overflow-hidden border-b border-stone-200">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80"
            alt="Himalayan Mountain Range"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#3B7FA3] mb-1.5 flex items-center justify-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>Our Core Principles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103D35] mb-3">
              Why Plan With Sikkim Tour Co.
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Our proposed service philosophy is rooted in authenticity, unhurried pacing, and transparent operations in Sikkim.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-stone-200/90 shadow-sm card-3d-interactive">
              <h3 className="font-serif text-lg font-bold text-[#103D35] mb-2">
                Thoughtfully Planned Journeys
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We craft routes with realistic mountain driving durations. Sikkim topography takes longer than flat highways, so we prioritise relaxed enjoyment over rushed checkpoints.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-stone-200/90 shadow-sm card-3d-interactive">
              <h3 className="font-serif text-lg font-bold text-[#103D35] mb-2">
                Flexible Travel Options
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Whether you prefer boutique mountain hotels in Gangtok, luxury heritage resorts in Pelling, or authentic wooden homestays in Lachen and Lachung, accommodation matches your comfort.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-stone-200/90 shadow-sm card-3d-interactive">
              <h3 className="font-serif text-lg font-bold text-[#103D35] mb-2">
                Transparent Package Quotations
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                No surprise permit costs or undisclosed driver night allowances. All inclusions, exclusions, and vehicle details are documented in writing before confirmation.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-stone-200/90 shadow-sm card-3d-interactive">
              <h3 className="font-serif text-lg font-bold text-[#103D35] mb-2">
                Personalised Customer Support
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Direct phone and WhatsApp communication with dedicated trip planners in Gangtok who know local road conditions, weather patterns, and seasonal access.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-stone-200/90 shadow-sm card-3d-interactive">
              <h3 className="font-serif text-lg font-bold text-[#103D35] mb-2">
                Deep Royal & Local Knowledge
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                From morning sunrise angles over Kanchenjunga at Pelling to royal chronicles of the 1642 Norbugang throne at Yuksom, our itineraries reflect intimate on-ground expertise.
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md p-6 rounded-2xl border border-stone-200/90 shadow-sm card-3d-interactive">
              <h3 className="font-serif text-lg font-bold text-[#103D35] mb-2">
                Respect for Culture & Nature
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We advocate for plastic-free travel in Sikkim, respectful monastery etiquette, and equitable support for local drivers, homestay hosts, and mountain communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION J2: HIMALAYAN MOUNTAIN CHRONICLES & TRAVEL BLOG */}
      <section className="relative py-16 sm:py-20 bg-[#F4F1EA] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#3B7FA3] mb-1.5 flex items-center gap-1.5 font-mono">
                <BookOpen className="w-4 h-4 text-[#EBA94B]" />
                <span>Sikkim Mountain Chronicles & Local Editorial</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103D35]">
                Authoritative Sikkim Travel Blog & Guides
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl font-light">
                Written by local Gangtok mountaineers, certified expedition leaders, and cultural researchers. Real road realities, army checkpost rules, monastery trails, and authentic Himalayan cuisine.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/travel-guides')}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#103D35] hover:bg-[#0A2621] text-white text-xs font-bold rounded-xl transition-all shadow-md card-3d-interactive"
              >
                <span>Explore All 12 Travel Guides</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#EBA94B]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelGuidesData.slice(1, 4).map((guide) => (
              <article
                key={guide.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group card-3d-interactive"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={guide.heroImage}
                      alt={guide.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.8 bg-[#103D35]/90 backdrop-blur-md text-[#EBA94B] text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                        {guide.category}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium rounded-md flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-[#EBA94B]" />
                        <span>{guide.readTime}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                      <Calendar className="w-3 h-3 text-[#3B7FA3]" />
                      <span>{guide.publishedDate}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-[#103D35] group-hover:text-[#3B7FA3] transition-colors mb-2.5 line-clamp-2 leading-snug">
                      <a
                        href={`/travel-guides/${guide.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(`/travel-guides/${guide.slug}`);
                        }}
                      >
                        {guide.title}
                      </a>
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4 font-light">
                      {guide.intro}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={guide.author.avatar}
                      alt={guide.author.name}
                      className="w-6 h-6 rounded-full object-cover border border-stone-300"
                    />
                    <span className="text-[11px] font-medium text-stone-700 truncate max-w-[120px]">
                      {guide.author.name.split(' ')[0]}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/travel-guides/${guide.slug}`)}
                    className="inline-flex items-center gap-1 font-bold text-[#103D35] group-hover:text-[#EBA94B] transition-colors text-xs"
                  >
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION K: WHAT TO EXPECT (Authentic Reality of Mountain Travel) */}
      <WhatToExpect />

      {/* SECTION K2: REVIEWS & TESTIMONIALS (100+ Verified Domestic & International Reviews) */}
      <section className="relative py-16 sm:py-20 bg-[#F8F6F0] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#3B7FA3] mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#EBA94B]" />
                <span>Verified Himalayan Traveller Stories</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#103D35]">
                What 100+ Travellers Say About Us
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-stone-600">
                <div className="flex items-center gap-1 text-[#EBA94B]">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-[#EBA94B]" />
                  ))}
                  <div className="relative w-4 h-4">
                    <Star className="w-4 h-4 text-stone-300" />
                    <div className="absolute inset-0 overflow-hidden w-[40%]">
                      <Star className="w-4 h-4 fill-[#EBA94B] text-[#EBA94B]" />
                    </div>
                  </div>
                </div>
                <span className="font-bold text-stone-800">{averageRating} / 5.0 Rating</span>
                <span className="text-stone-300">·</span>
                <span>Based on {reviewsList.length}+ verified reviews from Indian & International Guests</span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsReviewModalOpen(true)}
                className="px-4 py-2.5 bg-white border border-stone-200 hover:border-[#103D35] text-stone-700 hover:text-[#103D35] text-xs font-bold rounded-xl transition-all shadow-xs card-3d-interactive"
              >
                Write a Review
              </button>
              <button
                onClick={() => navigate('/reviews')}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#103D35] hover:bg-[#0A2621] text-white text-xs font-bold rounded-xl transition-all shadow-md card-3d-interactive"
              >
                <span>Read All 100+ Reviews</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#EBA94B]" />
              </button>
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 text-xs scrollbar-thin">
            {[
              { id: 'all', label: 'All Featured Stories' },
              { id: 'indian', label: 'Domestic (Indian) Travellers' },
              { id: 'international', label: 'International Travellers' },
              { id: 'family', label: 'Family Holidays' },
              { id: 'couple', label: 'Couples & Honeymoon' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setReviewsTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                  reviewsTab === tab.id
                    ? 'bg-[#103D35] text-white shadow-xs ring-1 ring-[#EBA94B]'
                    : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedReviews.map((review) => (
              <div key={review.id} className="card-3d-interactive">
                <ReviewCard
                  review={review}
                  onVoteChange={() => setReviewsList(getAllReviews())}
                />
              </div>
            ))}
          </div>

          {/* View More Reviews CTA */}
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/reviews')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-extrabold text-xs rounded-xl transition-all shadow-md card-3d-interactive"
            >
              <span>Explore All 118+ Himalayan Reviews & Testimonials</span>
              <ArrowRight className="w-4 h-4 text-[#103D35]" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION L: FINAL 3D CTA WITH MAJESTIC KANCHENJUNGA SUNRISE PANORAMA */}
      <section className="relative py-24 bg-[#103D35] text-white overflow-hidden perspective-1000">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-25">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=85"
            alt="Kanchenjunga Massif Sunrise"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/50 backdrop-blur-md rounded-full text-xs text-[#EBA94B] tracking-wider uppercase mb-5 border border-[#EBA94B]/50 card-3d-interactive">
            <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
            <span className="font-bold">Begin Your Himalayan Journey</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFFFFF] mb-5 drop-shadow-md">
            Your Sikkim Story Starts Here.
          </h2>

          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto leading-relaxed mb-8 font-light">
            Tell us where you want to go across North, East, West, or South Sikkim. We’ll help you plan the journey around your travel dates, preferred pace, and group requirements. Direct WhatsApp and Email desk. Zero login required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/customise-trip')}
              className="w-full sm:w-auto px-8 py-4 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-extrabold text-sm rounded-xl transition-all shadow-xl card-3d-interactive"
            >
              Plan Your Trip
            </button>
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm rounded-xl transition-all shadow-xl card-3d-interactive"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp (+91 97330 22334)</span>
            </a>
          </div>
        </div>
      </section>

      {/* Tourist Spot Detail Modal */}
      <TouristSpotModal
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onReviewSubmitted={(newRev) => setReviewsList([newRev, ...reviewsList])}
      />
    </div>
  );
};
