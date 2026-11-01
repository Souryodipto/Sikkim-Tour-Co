import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { destinationsData, allSikkimSpots, TouristSpot } from '../data/destinations';
import { DestinationCard } from '../components/DestinationCard';
import { TouristSpotCard } from '../components/TouristSpotCard';
import { TouristSpotModal } from '../components/TouristSpotModal';
import { MapPin, Compass, Search, Sparkles, ArrowRight, ShieldCheck, Camera } from 'lucide-react';

export const DestinationsView: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState<'All' | 'North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim'>('All');
  const [activeTab, setActiveTab] = useState<'spots' | 'districts'>('spots');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpot, setSelectedSpot] = useState<TouristSpot | null>(null);

  // Filter spots by district and search query
  const filteredSpots = allSikkimSpots.filter((spot) => {
    const matchesDistrict = selectedDistrict === 'All' || spot.district === selectedDistrict;
    const matchesSearch =
      searchQuery === '' ||
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (spot.altNames && spot.altNames.some((alt) => alt.toLowerCase().includes(searchQuery.toLowerCase()))) ||
      spot.historicalPeriod.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const filteredDistricts = destinationsData.filter((dest) => {
    if (selectedDistrict === 'All') return true;
    return dest.district === selectedDistrict;
  });

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Photographic Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 shadow-xl min-h-[280px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-10 text-white">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Himalayan Kingdom of Sikkim"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35" />

          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#103D35]/90 text-[#EBA94B] border border-[#EBA94B]/50 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Compass className="w-3.5 h-3.5 text-[#EBA94B]" />
                The Himalayan Kingdom of Sikkim
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-mono border border-white/20">
                <Camera className="w-3 h-3 text-[#EBA94B]" />
                All 4 Districts · 40 Sacred Sanctuaries &amp; Historical Spots
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight drop-shadow-md">
              Tourist Spots &amp; Historical Sanctuaries of Sikkim
            </h1>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed drop-shadow-sm max-w-2xl">
              Discover all four iconic districts of Sikkim—North, East, West, and South. Explore every sacred glacial lake, ancient royal palace ruin, Living Buddhist gompa, and high mountain pass with verified photography, historical chronicles, and travel guidance.
            </p>
          </div>
        </div>

        {/* 14-Day 2-Week Expedition Promo Strip */}
        <div className="mb-8 p-4 sm:p-5 bg-[#173D35] text-white rounded-md border border-[#C4A36A]/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C4A36A]/20 flex items-center justify-center shrink-0 text-[#C4A36A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider text-[#C4A36A] font-bold">
                Flagship 2-Week Expedition
              </div>
              <div className="font-editorial text-lg sm:text-xl font-bold text-[#F8F6F0]">
                Grand Sikkim Odyssey: 14 Days Across All 4 Districts
              </div>
              <p className="text-xs text-white/80 line-clamp-1">
                From Gurudongmar (17,800 ft) and Yumthang to the 1642 coronation throne of Yuksom and Temi Tea Estate.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/packages/grand-sikkim-odyssey-2-weeks')}
            className="px-5 py-2.5 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] text-xs font-bold rounded-sm transition-colors whitespace-nowrap shadow-xs self-stretch md:self-auto flex items-center justify-center gap-1"
          >
            <span>Explore 14-Day Odyssey</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Bar: District Tabs & Search */}
        <div className="space-y-4 mb-8 pb-4 border-b border-stone-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* District Selector Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/70 rounded-md">
              {(['All', 'North Sikkim', 'East Sikkim', 'West Sikkim', 'South Sikkim'] as const).map((district) => (
                <button
                  key={district}
                  onClick={() => setSelectedDistrict(district)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap ${
                    selectedDistrict === district
                      ? 'bg-white text-[#173D35] shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {district === 'All' ? 'All 4 Districts' : district}
                </button>
              ))}
            </div>

            {/* View Mode Switcher (Spots vs Districts) */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/50 rounded-md self-start sm:self-auto">
              <button
                onClick={() => setActiveTab('spots')}
                className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'spots' ? 'bg-[#173D35] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Tourist Spots ({allSikkimSpots.length})
              </button>
              <button
                onClick={() => setActiveTab('districts')}
                className={`px-3 py-1 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'districts' ? 'bg-[#173D35] text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                District Overviews (4)
              </button>
            </div>
          </div>

          {/* Search Box for spots */}
          {activeTab === 'spots' && (
            <div className="relative max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tourist spots in Sikkim (e.g., Gurudongmar, Rabdentse, Temi, Yumthang)..."
                className="w-full bg-white border border-stone-300 rounded-sm py-2 pl-9 pr-3 text-xs sm:text-sm text-stone-800 placeholder:text-stone-400 focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          <div className="text-xs text-stone-500">
            {activeTab === 'spots' ? (
              <span>
                Showing <strong className="text-stone-800">{filteredSpots.length}</strong> historical tourist spots
                {selectedDistrict !== 'All' && ` in ${selectedDistrict}`}
              </span>
            ) : (
              <span>Showing 4 District Regions of Sikkim</span>
            )}
          </div>
        </div>

        {/* SPOTS VIEW */}
        {activeTab === 'spots' && (
          <div>
            {filteredSpots.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-md border border-stone-200">
                <p className="text-stone-600 text-sm">No tourist spots matched your search query.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedDistrict('All');
                  }}
                  className="mt-3 text-xs font-semibold text-[#173D35] underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpots.map((spot) => (
                  <TouristSpotCard
                    key={spot.id}
                    spot={spot}
                    onSelect={(s) => setSelectedSpot(s)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* DISTRICTS OVERVIEW */}
        {activeTab === 'districts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDistricts.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}

        {/* Tourist Spot Detail Modal */}
        <TouristSpotModal
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />

        {/* Bottom Custom Trip Advisory */}
        <div className="mt-14 p-6 bg-white rounded-md border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-editorial text-lg font-bold text-[#173D35]">
              Want to visit specific tourist spots across Sikkim?
            </h4>
            <p className="text-xs text-stone-600 max-w-2xl leading-relaxed">
              We create custom private itineraries linking North, East, West, and South Sikkim with dedicated mountain SUVs, vetted chauffeurs, and pre-arranged Inner Line and Protected Area permits.
            </p>
          </div>
          <button
            onClick={() => navigate('/customise-trip')}
            className="px-5 py-2.5 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs font-semibold rounded-sm whitespace-nowrap transition-colors shadow-xs"
          >
            Customise Sikkim Trip
          </button>
        </div>
      </div>
    </div>
  );
};
