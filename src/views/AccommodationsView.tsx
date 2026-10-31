import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { accommodationsData, Accommodation } from '../data/accommodations';
import {
  Hotel,
  MapPin,
  Star,
  ShieldCheck,
  Sparkles,
  Wifi,
  Flame,
  UtensilsCrossed,
  Eye,
  Check,
  SlidersHorizontal,
  ChevronRight,
  ArrowUpDown,
  Search,
} from 'lucide-react';

export const AccommodationsView: React.FC = () => {
  const { navigate } = useRouter();
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('All');
  const [amenityFilter, setAmenityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');

  const districts = ['All', 'East Sikkim', 'West Sikkim', 'North Sikkim', 'South Sikkim'];
  const propertyTypes = [
    'All',
    'Luxury Heritage',
    'Boutique Resort',
    'Mountain Homestay',
    'Eco Lodge',
    'Tea Estate Retreat',
  ];
  const popularAmenities = ['All', 'Mountain View', 'Central Heating', 'Open Fireplace', 'Spa & Wellness', 'Organic Farm Dining'];

  // Filter and sort listings
  const filteredListings = accommodationsData
    .filter((stay) => {
      if (districtFilter !== 'All' && stay.district !== districtFilter) return false;
      if (propertyTypeFilter !== 'All' && stay.propertyType !== propertyTypeFilter) return false;
      if (
        amenityFilter !== 'All' &&
        !stay.amenities.some((a) => a.toLowerCase().includes(amenityFilter.toLowerCase()))
      ) {
        return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = stay.name.toLowerCase().includes(query);
        const matchesLocation = stay.location.toLowerCase().includes(query);
        const matchesTagline = stay.tagline.toLowerCase().includes(query);
        if (!matchesName && !matchesLocation && !matchesTagline) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.startingPriceInr - b.startingPriceInr;
      if (sortBy === 'price-desc') return b.startingPriceInr - a.startingPriceInr;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // recommended order
    });

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Introduction */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D35]/10 text-xs font-semibold text-[#173D35] uppercase tracking-wider mb-2">
            <Hotel className="w-3.5 h-3.5 text-[#527568]" />
            <span>Handpicked Mountain Accommodations</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#173D35] tracking-tight">
            Hotels, Heritage Sanctuaries & Authentic Homestays in Sikkim
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-3xl mt-2 leading-relaxed">
            Every property is personally audited for high-altitude heating, clean mountain water, authentic Sikkimese hospitality, and panoramic views of Mount Kanchenjunga.
          </p>
        </div>

        {/* Search & Multi-facet Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-stone-200/90 shadow-xs mb-8">
          {/* Top row: search + sort */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-stone-100">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search stays by name, location (e.g. Gangtok, Pelling, Lachung)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35]"
              />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ArrowUpDown className="w-4 h-4 text-stone-500" />
              <span className="text-xs text-stone-600">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs sm:text-sm py-1.5 px-3 rounded-sm border border-stone-300 bg-white focus:outline-hidden focus:border-[#173D35]"
              >
                <option value="recommended">Curated Recommendation</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* District Filter Chips */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 mr-1">District:</span>
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => setDistrictFilter(d)}
                  className={`px-3 py-1 rounded-sm text-xs transition-all ${
                    districtFilter === d
                      ? 'bg-[#173D35] text-white font-semibold shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Property Type Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 mr-1">Property Type:</span>
              {propertyTypes.map((pt) => (
                <button
                  key={pt}
                  onClick={() => setPropertyTypeFilter(pt)}
                  className={`px-3 py-1 rounded-sm text-xs transition-all ${
                    propertyTypeFilter === pt
                      ? 'bg-[#C4A36A] text-[#173D35] font-semibold shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {pt}
                </button>
              ))}
            </div>

            {/* Amenities Filter Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 mr-1">Key Feature:</span>
              {popularAmenities.map((am) => (
                <button
                  key={am}
                  onClick={() => setAmenityFilter(am)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] transition-all border ${
                    amenityFilter === am
                      ? 'bg-[#173D35]/10 border-[#173D35] text-[#173D35] font-semibold'
                      : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {am}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings Count Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs sm:text-sm text-stone-600">
            Showing <span className="font-semibold text-[#173D35]">{filteredListings.length}</span> verified properties in Sikkim
          </p>
          {(districtFilter !== 'All' || propertyTypeFilter !== 'All' || amenityFilter !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setDistrictFilter('All');
                setPropertyTypeFilter('All');
                setAmenityFilter('All');
                setSearchQuery('');
              }}
              className="text-xs text-[#C4A36A] hover:underline font-medium"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Accommodations Grid */}
        {filteredListings.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-lg border border-stone-200 my-8">
            <Hotel className="w-10 h-10 text-stone-300 mx-auto mb-3" />
            <h3 className="font-editorial text-2xl font-bold text-stone-700 mb-1">
              No matching properties found
            </h3>
            <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
              Try adjusting your filter options or search terms to explore available Himalayan properties.
            </p>
            <button
              onClick={() => {
                setDistrictFilter('All');
                setPropertyTypeFilter('All');
                setAmenityFilter('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#173D35] text-white text-xs font-semibold rounded-sm hover:bg-[#0F2A24]"
            >
              View All Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((stay) => (
              <div
                key={stay.id}
                className="bg-white rounded-lg border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col group"
              >
                {/* Property Hero Image with Badges */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-200">
                  <img
                    src={stay.heroImage}
                    alt={stay.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
                  
                  {/* Verified Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#173D35]/85 backdrop-blur-xs text-white text-[11px] font-medium border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C4A36A]" />
                    <span>Verified Property</span>
                  </div>

                  {/* Property Type Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-sm bg-black/60 backdrop-blur-xs text-white text-[10px] uppercase font-mono tracking-wider">
                    {stay.propertyType}
                  </div>

                  {/* Elevation & District Pill */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-[11px] font-mono opacity-90 block">
                      {stay.location} · {stay.elevationFt.toLocaleString()} ft
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Rating row */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono uppercase text-[#527568] tracking-wider font-semibold">
                        {stay.district}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-semibold text-stone-800">
                        <Star className="w-3.5 h-3.5 fill-[#C4A36A] text-[#C4A36A]" />
                        <span>{stay.rating}</span>
                        <span className="text-stone-400 font-normal">({stay.reviewCount})</span>
                      </div>
                    </div>

                    <h3 className="font-editorial text-xl font-bold text-[#173D35] group-hover:text-[#C4A36A] transition-colors leading-snug mb-2">
                      {stay.name}
                    </h3>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-4">
                      {stay.tagline}
                    </p>

                    {/* Amenities chips */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-5">
                      {stay.amenities.slice(0, 3).map((am, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-600 border border-stone-200"
                        >
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Tariff & CTA */}
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase font-mono block">From</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-editorial text-xl font-bold text-[#173D35]">
                          ₹{stay.startingPriceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-stone-500">/ night</span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/stays/${stay.slug}`)}
                      className="px-4 py-2 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1"
                    >
                      <span>View Rooms</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Informative Guidance Section: Sikkim Accommodation FAQ & Altitude Logistics */}
        <div className="mt-16 bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs">
          <h2 className="font-editorial text-2xl font-bold text-[#173D35] mb-4">
            Understanding High-Altitude Stays in Sikkim
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 leading-relaxed">
            <div>
              <h4 className="font-semibold text-[#173D35] text-sm mb-1.5 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#C4A36A]" />
                Heating in North Sikkim
              </h4>
              <p>
                Remote mountain hamlets like Lachen (9,020 ft) and Lachung (8,610 ft) do not have regular power grids during sub-zero winter nights. We select properties equipped with generator backups, traditional woodstoves (Bukharis), and heated electric blankets.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#173D35] text-sm mb-1.5 flex items-center gap-1.5">
                <UtensilsCrossed className="w-4 h-4 text-[#C4A36A]" />
                Full Board Mountain Dining
              </h4>
              <p>
                In North Sikkim, restaurants do not exist outside village lodges. All stays booked through our North Sikkim packages include Full Board (Breakfast, Lunch, Dinner) featuring warm freshly cooked Sikkimese and Indian meals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-[#173D35] text-sm mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#C4A36A]" />
                Permit & Police Verification
              </h4>
              <p>
                All hotels in Sikkim require valid government identification (Voter ID or Passport) upon check-in. PAN cards are not recognized for Inner Line Permits by state security desks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
