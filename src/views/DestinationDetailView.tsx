import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { destinationsData, destinationAliases, TouristSpot } from '../data/destinations';
import { tourPackagesData } from '../data/packages';
import { VisualMedia, VisualPreset } from '../components/VisualMedia';
import { PackageCard } from '../components/PackageCard';
import { TouristSpotCard } from '../components/TouristSpotCard';
import { TouristSpotModal } from '../components/TouristSpotModal';
import { siteConfig, buildWhatsAppUrl } from '../config/site';
import {
  MapPin,
  Clock,
  Compass,
  CheckCircle,
  AlertCircle,
  Calendar,
  ShieldAlert,
  ChevronRight,
  MessageSquare,
  Sparkles,
  Crown,
  BookOpen,
} from 'lucide-react';

interface DestinationDetailViewProps {
  slug: string;
}

export const DestinationDetailView: React.FC<DestinationDetailViewProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  // Check direct slug or mapped alias
  const resolvedSlug = destinationAliases[slug] || slug;
  const destination = destinationsData.find(
    (d) => d.slug === resolvedSlug || d.id === resolvedSlug
  );

  if (!destination) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-editorial text-3xl font-bold text-[#173D35] mb-4">
          Sikkim Destination Not Found
        </h1>
        <p className="text-sm text-stone-600 mb-6">
          The requested district or destination page does not exist or may have been updated.
        </p>
        <button
          onClick={() => navigate('/destinations')}
          className="px-5 py-2.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm"
        >
          View All Sikkim Destinations
        </button>
      </div>
    );
  }

  const getPreset = (): VisualPreset => {
    switch (destination.district) {
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

  // Find tour packages covering this district
  const relatedPackages = tourPackagesData.filter(
    (pkg) =>
      pkg.districtsCovered?.includes(destination.district) ||
      pkg.destinationsCovered.some((d) => d.toLowerCase().includes(destination.name.toLowerCase()))
  );

  const destinationWhatsAppUrl = buildWhatsAppUrl(
    `Hello Sikkim Tour Co.,\n\nI am planning a visit to ${destination.name} (${destination.district}).\nPlease share information on suitable itineraries, historical spots, current road conditions, and private transport options.`
  );

  const heroImage = destination.spots?.[0]?.imageUrl;

  return (
    <div className="pt-20 bg-[#F8F6F0] min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[50vh] min-h-[380px] text-white overflow-hidden bg-[#173D35]">
        <VisualMedia
          src={heroImage}
          preset={getPreset()}
          alt={destination.name}
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
              href="/destinations"
              onClick={(e) => {
                e.preventDefault();
                navigate('/destinations');
              }}
              className="hover:text-white"
            >
              Sikkim Districts
            </a>
            <ChevronRight className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[#DFC89E] font-medium">{destination.name}</span>
          </nav>

          {/* Title Area */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#DFC89E] mb-2">
              <MapPin className="w-4 h-4" />
              <span>{destination.district} · Elevation: {destination.elevation}</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-white mb-2 drop-shadow-md">
              {destination.name}
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-2xl font-light drop-shadow-xs">
              {destination.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Full Editorial, History & Tourist Spots */}
          <div className="lg:col-span-8 space-y-10">
            {/* Accessibility & Season Alert */}
            <div
              className={`p-4 rounded-md border flex items-start gap-3 ${
                destination.yearRoundAccess
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/70 border-amber-200 text-amber-950'
              }`}
            >
              {destination.yearRoundAccess ? (
                <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              )}
              <div className="text-xs space-y-1">
                <div className="font-semibold text-sm">
                  {destination.yearRoundAccess
                    ? 'Year-Round Destination Access'
                    : 'Seasonal & High-Altitude Pass Advisory'}
                </div>
                <p className="leading-relaxed">{destination.seasonalAdvisory}</p>
              </div>
            </div>

            {/* Overview */}
            <section className="bg-white p-6 sm:p-8 rounded-md border border-stone-200/90 shadow-xs space-y-4">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
                About {destination.name}
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {destination.fullOverview}
              </p>
            </section>

            {/* History & Royal Dynasty Chronicle */}
            <section className="bg-white p-6 sm:p-8 rounded-md border border-stone-200/90 shadow-xs space-y-5">
              <div className="flex items-center gap-2 text-[#173D35]">
                <Crown className="w-5 h-5 text-[#C4A36A]" />
                <h2 className="font-editorial text-2xl font-bold">
                  History, Royal Heritage & Cultural Lore
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed text-justify">
                {destination.historyOverview}
              </p>

              <div className="p-4 bg-[#F8F6F0] rounded-sm border border-stone-200/90 text-xs text-stone-700 space-y-1">
                <div className="font-semibold uppercase tracking-wider text-[11px] text-[#527568] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#C4A36A]" />
                  <span>Royal Namgyal Dynasty Legacy:</span>
                </div>
                <p className="leading-relaxed">{destination.royalHeritage}</p>
              </div>
            </section>

            {/* TOURIST SPOTS IN THIS DISTRICT (ALL WITH PHOTOS & HISTORICAL SUMMARY) */}
            <section className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#527568] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C4A36A]" />
                    <span>Complete District Sightseeing</span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173D35]">
                    Tourist Spots in {destination.district} ({destination.spots.length})
                  </h2>
                </div>
                <div className="text-xs text-stone-500">
                  Click any spot to view full photo & historical lore
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {destination.spots.map((spot) => (
                  <TouristSpotCard
                    key={spot.id}
                    spot={spot}
                    onSelect={(s) => setSelectedSpot(s)}
                  />
                ))}
              </div>
            </section>

            {/* Key Highlights */}
            <section className="bg-white p-6 sm:p-8 rounded-md border border-stone-200/90 shadow-xs space-y-4">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
                Key Highlights & Regional Features
              </h2>
              <div className="space-y-3 pt-1">
                {destination.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-stone-700">
                    <CheckCircle className="w-4 h-4 text-[#527568] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Permits & Documentation Advisory */}
            <section className="bg-white p-6 sm:p-8 rounded-md border border-stone-200/90 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-stone-800">
                <ShieldAlert className="w-5 h-5 text-[#527568]" />
                <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
                  Permits & Border Regulations
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 space-y-3 leading-relaxed">
                <p>
                  {destination.permitDetails ||
                    (destination.permitRequired
                      ? 'This region requires Protected Area Permits (PAP) from the Sikkim Tourism and Civil Aviation Department with Army checkpost clearance.'
                      : 'This district is accessible to all Indian and international visitors with standard travel documentation.')}
                </p>
                <div className="p-3 bg-stone-50 rounded-sm border border-stone-200 text-xs text-stone-600">
                  <strong>Permit Coordination:</strong> When you book with Sikkim Tour Co., all permit formalities, checkpost registers, and driver allowances are handled seamlessly.
                </div>
              </div>
            </section>

            {/* Practical Travel Tips */}
            <section className="bg-white p-6 sm:p-8 rounded-md border border-stone-200/90 shadow-xs space-y-4">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
                Travel Tips & Essential Advice
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {destination.travelTips.map((tip, idx) => (
                  <div key={idx} className="p-3 bg-[#F8F6F0] rounded-sm text-xs text-stone-700 flex items-start gap-2">
                    <span className="text-[#C4A36A] font-bold">•</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Quick Facts & Direct Enquiries */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Facts Card */}
            <div className="bg-white p-6 rounded-md border border-stone-200/90 shadow-xs space-y-4 sticky top-24">
              <h3 className="font-editorial text-xl font-bold text-[#173D35] pb-3 border-b border-stone-100">
                District Summary
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-stone-400 font-semibold uppercase tracking-wider block text-[10px]">
                    District Territory
                  </span>
                  <span className="font-medium text-stone-800">{destination.district}</span>
                </div>

                <div>
                  <span className="text-stone-400 font-semibold uppercase tracking-wider block text-[10px]">
                    Altitude Range
                  </span>
                  <span className="font-medium text-stone-800">{destination.elevation}</span>
                </div>

                <div>
                  <span className="text-stone-400 font-semibold uppercase tracking-wider block text-[10px]">
                    Recommended Duration
                  </span>
                  <span className="font-medium text-stone-800">{destination.recommendedDuration}</span>
                </div>

                <div>
                  <span className="text-stone-400 font-semibold uppercase tracking-wider block text-[10px]">
                    Best Travel Season
                  </span>
                  <span className="font-medium text-stone-800">{destination.bestSeason}</span>
                </div>

                <div>
                  <span className="text-stone-400 font-semibold uppercase tracking-wider block text-[10px]">
                    Transit Access Hub
                  </span>
                  <span className="font-medium text-stone-800">{destination.nearestHub}</span>
                </div>

                <div>
                  <span className="text-stone-400 font-semibold uppercase tracking-wider block text-[10px]">
                    Ideal For
                  </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {destination.suitableFor.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-xs text-[11px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-4 border-t border-stone-100 space-y-2.5">
                <a
                  href={destinationWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Enquire for {destination.name}</span>
                </a>

                <button
                  onClick={() => navigate('/customise-trip')}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs"
                >
                  <span>Customise District Itinerary</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tourist Spot Modal */}
        <TouristSpotModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />

        {/* Related Tour Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-16 pt-12 border-t border-stone-200">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#527568] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C4A36A]" />
                  <span>Curated Sikkim Itineraries</span>
                </div>
                <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#173D35]">
                  Tour Packages Featuring {destination.name}
                </h2>
              </div>
              <button
                onClick={() => navigate('/packages')}
                className="text-xs font-semibold text-[#173D35] hover:text-[#C4A36A] transition-colors"
              >
                View All Sikkim Packages →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPackages.slice(0, 3).map((pkg) => (
                <PackageCard key={pkg.id} tourPackage={pkg} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
