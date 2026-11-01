import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { tourPackagesData, TourPackage } from '../data/packages';
import { PackageCard } from '../components/PackageCard';
import {
  Compass,
  Mountain,
  MapPin,
  Landmark,
  Sprout,
  Sparkles,
  ShieldAlert,
  Send,
  Mail,
  Phone,
  Search,
  Filter,
  RotateCcw,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export interface PackagesViewProps {
  categoryFilter?: string;
  districtFilter?: string;
  destinationTag?: string;
  customH1?: string;
  customSubtitle?: string;
  customBadge?: string;
}

type RegionId = 'all' | 'North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim';

interface RegionMeta {
  id: RegionId;
  name: string;
  badge: string;
  tagline: string;
  keyPlaces: string;
  altitudeNote: string;
  permitNote: string;
  icon: React.FC<{ className?: string }>;
  accentColor: string;
}

const REGIONS: RegionMeta[] = [
  {
    id: 'all',
    name: 'All Sikkim',
    badge: '40 Packages',
    tagline: 'Comprehensive circuits & four-district traverses across the state',
    keyPlaces: 'All regions covered: North, East, West & South Sikkim',
    altitudeNote: '4,500 ft to 17,800 ft (Valley to Tibetan plateau)',
    permitNote: 'State entry & Protected Area Permits handled as required per sector',
    icon: Compass,
    accentColor: '#EBA94B',
  },
  {
    id: 'North Sikkim',
    name: 'North Sikkim',
    badge: '10 Packages',
    tagline: 'High-altitude cold deserts, glacial lakes & rhododendron meadows',
    keyPlaces: 'Gurudongmar Lake, Yumthang Valley, Zero Point, Lachen, Lachung, Kala Patthar',
    altitudeNote: 'Up to 17,800 ft · Medical acclimatization advised',
    permitNote: 'Protected Area Permit (PAP) mandatory · Voter ID / Passport required · We handle paperwork',
    icon: Mountain,
    accentColor: '#38BDF8',
  },
  {
    id: 'East Sikkim',
    name: 'East Sikkim',
    badge: '10 Packages',
    tagline: 'Vibrant capital Gangtok, high border passes & historic 32 hairpin loops',
    keyPlaces: 'Gangtok, Tsomgo Lake, Baba Mandir, Nathu La, Old Silk Route Zuluk, Aritar',
    altitudeNote: '5,410 ft to 14,140 ft · Scenic military corridors',
    permitNote: 'Border passes for Tsomgo & Silk Route handled with local checkpost authorities',
    icon: MapPin,
    accentColor: '#F59E0B',
  },
  {
    id: 'West Sikkim',
    name: 'West Sikkim',
    badge: '10 Packages',
    tagline: 'Royal capitals, 300-year-old monasteries & front-row Kanchenjunga panoramas',
    keyPlaces: 'Pelling, Pemayangtse, Rabdentse Ruins, Khecheopalri Lake, Yuksom, Singshore Bridge',
    altitudeNote: '5,500 ft to 7,500 ft · Gentle pine ridges',
    permitNote: 'Standard state registration · No high-altitude restricted permits required',
    icon: Landmark,
    accentColor: '#10B981',
  },
  {
    id: 'South Sikkim',
    name: 'South Sikkim',
    badge: '10 Packages',
    tagline: 'Monumental spiritual statues, serene pine hills & organic tea gardens',
    keyPlaces: 'Ravangla, 130-ft Buddha Park, Namchi Char Dham, Samdruptse, Temi Tea Estate, Borong',
    altitudeNote: '4,500 ft to 7,000 ft · Ideal for seniors & families',
    permitNote: 'Standard state registration · Open year-round for all Indian travellers',
    icon: Sprout,
    accentColor: '#84CC16',
  },
];

export const PackagesView: React.FC<PackagesViewProps> = ({
  categoryFilter,
  districtFilter,
  destinationTag,
  customH1,
  customSubtitle,
  customBadge,
}) => {
  const { currentRoute, navigate } = useRouter();

  // Parse region from query params or props
  const initialRegion: RegionId = useMemo(() => {
    if (districtFilter) {
      if (districtFilter.toLowerCase().includes('north')) return 'North Sikkim';
      if (districtFilter.toLowerCase().includes('east')) return 'East Sikkim';
      if (districtFilter.toLowerCase().includes('west')) return 'West Sikkim';
      if (districtFilter.toLowerCase().includes('south')) return 'South Sikkim';
    }
    const qRegion = currentRoute.queryParams?.region || currentRoute.queryParams?.district || currentRoute.queryParams?.dest;
    if (qRegion) {
      const lower = qRegion.toLowerCase();
      if (lower.includes('north')) return 'North Sikkim';
      if (lower.includes('east')) return 'East Sikkim';
      if (lower.includes('west') || lower.includes('pelling')) return 'West Sikkim';
      if (lower.includes('south') || lower.includes('namchi') || lower.includes('ravangla')) return 'South Sikkim';
    }
    return 'all';
  }, [districtFilter, currentRoute.queryParams]);

  const [selectedRegion, setSelectedRegion] = useState<RegionId>(initialRegion);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || 'all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    if (districtFilter && districtFilter !== selectedRegion) {
      setSelectedRegion(initialRegion);
    }
  }, [districtFilter, initialRegion]);

  const categories = [
    { id: 'all', label: 'All Travel Styles' },
    { id: 'High Altitude', label: 'High Altitude & Alpine' },
    { id: 'Honeymoon & Luxury', label: 'Honeymoon & Luxury' },
    { id: 'Silk Route', label: 'Old Silk Route & Zuluk' },
    { id: 'Heritage & Monasteries', label: 'Royal Monasteries' },
    { id: 'Family & Soft Adventure', label: 'Family & Leisure' },
    { id: 'Offbeat & Homestays', label: 'Offbeat & Homestays' },
    { id: 'Wildlife & Eco', label: 'Wildlife & Eco' },
    { id: 'Short Trips', label: 'Weekend Escapes (2N-3N)' },
  ];

  const durationOptions = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: 'Short (2N – 3N)' },
    { id: 'standard', label: 'Standard (4N – 5N)' },
    { id: 'extended', label: 'Grand (6N+)' },
  ];

  // Calculate counts per region
  const regionCounts = useMemo(() => {
    return {
      all: tourPackagesData.length,
      'North Sikkim': tourPackagesData.filter((p) => p.region === 'North Sikkim' || p.districtsCovered.includes('North Sikkim')).length,
      'East Sikkim': tourPackagesData.filter((p) => p.region === 'East Sikkim' || p.districtsCovered.includes('East Sikkim')).length,
      'West Sikkim': tourPackagesData.filter((p) => p.region === 'West Sikkim' || p.districtsCovered.includes('West Sikkim')).length,
      'South Sikkim': tourPackagesData.filter((p) => p.region === 'South Sikkim' || p.districtsCovered.includes('South Sikkim')).length,
    };
  }, []);

  // Calculate live count per travel style / category within active region
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: selectedRegion === 'all'
        ? tourPackagesData.length
        : tourPackagesData.filter(
            (p) => p.region === selectedRegion || p.districtsCovered.includes(selectedRegion as any)
          ).length,
    };

    categories.forEach((cat) => {
      if (cat.id === 'all') return;
      counts[cat.id] = tourPackagesData.filter((p) => {
        if (selectedRegion !== 'all') {
          const matchesRegion =
            p.region === selectedRegion || p.districtsCovered.includes(selectedRegion as any);
          if (!matchesRegion) return false;
        }
        return p.travelStyleCategory === cat.id;
      }).length;
    });

    return counts;
  }, [selectedRegion]);

  const handleRegionSelect = (region: RegionId) => {
    setSelectedRegion(region);
    // If active travel style category has 0 packages in the new region, auto-reset category to 'all'
    if (selectedCategory !== 'all') {
      const countInNewRegion = tourPackagesData.filter((p) => {
        if (region !== 'all') {
          const matchesRegion =
            p.region === region || p.districtsCovered.includes(region as any);
          if (!matchesRegion) return false;
        }
        return p.travelStyleCategory === selectedCategory;
      }).length;
      if (countInNewRegion === 0) {
        setSelectedCategory('all');
      }
    }
  };

  // Filter packages based on active selections
  const filteredPackages = useMemo(() => {
    return tourPackagesData.filter((pkg) => {
      // 1. Region / District filter
      if (selectedRegion !== 'all') {
        const matchesRegion =
          pkg.region === selectedRegion ||
          pkg.districtsCovered.includes(selectedRegion as any);
        if (!matchesRegion) return false;
      }

      // 2. Category / Travel Style filter
      if (selectedCategory !== 'all' && pkg.travelStyleCategory !== selectedCategory) {
        return false;
      }

      // 3. Duration filter
      if (selectedDuration === 'short' && pkg.nightsCount > 3) return false;
      if (selectedDuration === 'standard' && (pkg.nightsCount < 4 || pkg.nightsCount > 5)) return false;
      if (selectedDuration === 'extended' && pkg.nightsCount < 6) return false;

      // 4. Destination tag filter (from props)
      if (
        destinationTag &&
        !pkg.destinationsCovered.some((d) => d.toLowerCase().includes(destinationTag.toLowerCase()))
      ) {
        return false;
      }

      // 5. Keyword search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = pkg.name.toLowerCase().includes(query);
        const matchesTagline = pkg.tagline.toLowerCase().includes(query);
        const matchesDest = pkg.destinationsCovered.some((d) => d.toLowerCase().includes(query));
        const matchesOverview = pkg.overview.toLowerCase().includes(query);
        if (!matchesName && !matchesTagline && !matchesDest && !matchesOverview) {
          return false;
        }
      }

      return true;
    });
  }, [selectedRegion, selectedCategory, selectedDuration, destinationTag, searchQuery]);

  const activeRegionMeta = useMemo(() => {
    return REGIONS.find((r) => r.id === selectedRegion) || REGIONS[0];
  }, [selectedRegion]);

  const hasActiveFilters =
    selectedRegion !== 'all' ||
    selectedCategory !== 'all' ||
    selectedDuration !== 'all' ||
    searchQuery.trim().length > 0;

  const handleResetFilters = () => {
    setSelectedRegion('all');
    setSelectedCategory('all');
    setSelectedDuration('all');
    setSearchQuery('');
  };

  const displayH1 = customH1 || (selectedRegion !== 'all'
    ? `${selectedRegion} Tour Packages (${regionCounts[selectedRegion]} Handcrafted Itineraries)`
    : 'Himalayan Tour Packages & Expeditions (40 Curated Packages)');

  const displaySubtitle = customSubtitle || (selectedRegion !== 'all'
    ? `Explore our 10 official ${selectedRegion} packages: from weekend breaks to multi-day alpine explorations. Every route features dedicated commercial hill vehicles, handpicked lodging, and local permits paperwork handling.`
    : 'Browse all 40 official Sikkim tour packages categorized across North, East, West, and South Sikkim. Filter by district or travel style to find your ideal Himalayan journey.');

  const displayBadge = customBadge || (selectedRegion !== 'all'
    ? `${selectedRegion} · 10 Verified Packages`
    : 'Sikkim Tour Co. · Exactly 10 Packages per Region');

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D35]/10 text-xs font-semibold uppercase tracking-wider text-[#173D35] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
            <span>{displayBadge}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173D35] tracking-tight mb-3">
            {displayH1}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {displaySubtitle}
          </p>
        </div>

        {/* PRICING & PERMITS MANDATORY DISCLOSURE BAR */}
        <div className="mb-8 p-5 rounded-2xl bg-stone-900 text-white border border-[#EBA94B]/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-[#EBA94B] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs uppercase font-mono tracking-wider text-[#EBA94B] font-bold">
                Transparent Pricing on Request · Zero Hidden Charges
              </div>
              <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
                We provide custom quotations based on your travel dates, group size, and vehicle preference.
                Protected Area Permit paperwork is handled directly by our Gangtok operations desk.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/disclosures')}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Permit &amp; Road Rules</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* PRIMARY FILTER: REGION / DISTRICT SELECTOR (NORTH/EAST/WEST/SOUTH) */}
        {/* ============================================================== */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#173D35]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#173D35]">
                Filter by Sikkim Region / District
              </h2>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Click a region to see its dedicated 10 packages
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {REGIONS.map((reg) => {
              const Icon = reg.icon;
              const isSelected = selectedRegion === reg.id;
              const count = regionCounts[reg.id];

              return (
                <button
                  key={reg.id}
                  onClick={() => handleRegionSelect(reg.id)}
                  className={`relative p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#103D35] via-[#174A40] to-[#103D35] text-white shadow-xl border-[#EBA94B] ring-2 ring-[#EBA94B]/50 scale-[1.02]'
                      : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200/90 hover:border-stone-300 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-white/15 text-[#EBA94B]'
                          : 'bg-stone-100 text-[#173D35]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        isSelected
                          ? 'bg-[#EBA94B] text-[#103D35]'
                          : 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {count} Pkgs
                    </span>
                  </div>

                  <div>
                    <div className="font-bold text-sm tracking-tight mb-0.5 flex items-center gap-1.5">
                      <span>{reg.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#EBA94B]" />}
                    </div>
                    <div
                      className={`text-[11px] line-clamp-1 leading-tight ${
                        isSelected ? 'text-stone-300' : 'text-stone-500'
                      }`}
                    >
                      {reg.id === 'all'
                        ? 'All 4 Districts'
                        : reg.id === 'North Sikkim'
                        ? 'Gurudongmar & Yumthang'
                        : reg.id === 'East Sikkim'
                        ? 'Gangtok & Old Silk Route'
                        : reg.id === 'West Sikkim'
                        ? 'Pelling & Kanchenjunga'
                        : 'Ravangla, Temi & Char Dham'}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTEXTUAL REGION HIGHLIGHT CARD (WHEN A REGION IS ACTIVE) */}
        {selectedRegion !== 'all' && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[#173D35]/5 via-[#173D35]/10 to-transparent border border-[#173D35]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 animate-fadeIn">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-base text-[#173D35]">
                  {activeRegionMeta.name} Explorer Overview
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#173D35] text-[#EBA94B] font-bold font-mono">
                  {regionCounts[selectedRegion]} Packages
                </span>
              </div>
              <div className="text-xs text-stone-700 flex flex-wrap gap-x-4 gap-y-1">
                <span>
                  <strong>Key Places:</strong> {activeRegionMeta.keyPlaces}
                </span>
                <span>
                  <strong>Altitude:</strong> {activeRegionMeta.altitudeNote}
                </span>
              </div>
              <div className="text-[11px] text-stone-600 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#173D35]" />
                <span>{activeRegionMeta.permitNote}</span>
              </div>
            </div>

            <button
              onClick={() => handleRegionSelect('all')}
              className="text-xs font-semibold text-[#173D35] hover:text-[#0c231e] flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-stone-300 shadow-xs transition-all shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>View All 40 Packages</span>
            </button>
          </div>
        )}

        {/* ============================================================== */}
        {/* SECONDARY CONTROLS: SEARCH, DURATION & TRAVEL STYLE */}
        {/* ============================================================== */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search packages by destination (e.g. Gurudongmar, Pelling, Zuluk, Temi, Rumtek)..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#173D35] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Duration Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-stone-400 hidden sm:block" />
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-xl py-2 px-3 text-xs sm:text-sm font-semibold text-stone-700 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#173D35] cursor-pointer"
              >
                {durationOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Travel Style Pills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                <Filter className="w-3 h-3 text-stone-400" />
                <span>Travel Style / Theme</span>
                {selectedCategory !== 'all' && (
                  <span className="text-[10px] normal-case font-semibold bg-[#173D35]/10 text-[#173D35] px-2 py-0.5 rounded-full">
                    Active: {categories.find((c) => c.id === selectedCategory)?.label || selectedCategory}
                  </span>
                )}
              </div>
              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs text-[#173D35] hover:text-amber-700 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Show all styles</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const count = categoryCounts[cat.id] ?? 0;
                const isSelected = selectedCategory === cat.id;
                const isDisabled = count === 0 && cat.id !== 'all';

                return (
                  <button
                    key={cat.id}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => setSelectedCategory(isSelected && cat.id !== 'all' ? 'all' : cat.id)}
                    title={
                      isDisabled
                        ? `No ${cat.label} packages available in ${selectedRegion !== 'all' ? selectedRegion : 'this selection'}`
                        : `Filter by ${cat.label} (${count} packages)`
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-[#173D35] text-white shadow-sm ring-2 ring-[#EBA94B]/50'
                        : isDisabled
                        ? 'bg-stone-100/60 text-stone-400 border border-stone-200/50 cursor-not-allowed opacity-50'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200 hover:text-stone-900 border border-stone-200/70'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                        isSelected
                          ? 'bg-[#EBA94B] text-[#103D35]'
                          : isDisabled
                          ? 'bg-stone-200/60 text-stone-400'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filter Status & Quick Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
            <div className="flex items-center gap-2 text-stone-600 font-medium">
              <span>
                Showing <strong>{filteredPackages.length}</strong> of{' '}
                <strong>
                  {selectedRegion === 'all'
                    ? tourPackagesData.length
                    : regionCounts[selectedRegion]}
                </strong>{' '}
                {selectedRegion !== 'all' ? selectedRegion : 'Sikkim'} Packages
              </span>

              {hasActiveFilters && (
                <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/70">
                  Filters applied
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-[#173D35] hover:text-[#0b241e] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>
        </div>

        {/* ============================================================== */}
        {/* PACKAGE CARDS GRID */}
        {/* ============================================================== */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="transition-transform duration-300 hover:-translate-y-1">
                <PackageCard tourPackage={pkg} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-stone-200 shadow-sm mb-16 max-w-xl mx-auto">
            <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">
              No Packages Match This Exact Filter
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
              We couldn't find packages combining <strong>"{selectedRegion}"</strong> with the selected travel style or search keyword.
              Try resetting your filters or exploring all {regionCounts[selectedRegion]} packages in this region.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-[#173D35] hover:bg-[#103D35] text-white text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear All Filters</span>
              </button>
              {selectedRegion !== 'all' && (
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedDuration('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Show All {selectedRegion} Packages
                </button>
              )}
            </div>
          </div>
        )}

        {/* BOTTOM DIRECT CONTACT CALLOUT */}
        <div className="p-8 rounded-2xl bg-[#103D35] text-white border border-[#EBA94B]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Looking for a Customized Himalayan Itinerary?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Tell our local mountain travel specialists your preferred travel window, group size, and interests.
              We will craft an exclusive private route across North, East, West, or South Sikkim with dedicated chauffeurs and permits.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20customize%20a%20private%20tour%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 70018 46727)</span>
            </a>
            <a
              href="mailto:info@sikkimtourco.com?subject=Custom Package Request - Sikkim Tour Co."
              className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/25 flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4 text-[#EBA94B]" />
              <span>Email Us</span>
            </a>
            <a
              href="tel:+917001846727"
              className="px-5 py-3 rounded-lg bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 fill-[#103D35]" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
