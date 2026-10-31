import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { destinationsData } from '../data/destinations';
import { Search, Calendar, Users, Mountain } from 'lucide-react';

export const SearchPanel: React.FC = () => {
  const { navigate } = useRouter();

  const [destination, setDestination] = useState<string>('all');
  const [travelMonth, setTravelMonth] = useState<string>('2026-11');
  const [travellers, setTravellers] = useState<number>(2);
  const [travelStyle, setTravelStyle] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (travelStyle === '2-Week Grand Expedition') {
      navigate('/packages/grand-sikkim-odyssey-2-weeks');
      return;
    }

    const query = new URLSearchParams({
      dest: destination,
      date: travelMonth,
      pax: travellers.toString(),
      style: travelStyle,
    }).toString();

    navigate(`/packages?${query}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-md shadow-xl border border-stone-200/80 p-4 sm:p-5 text-[#202724]">
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
        {/* Destination Dropdown */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Sikkim District
          </label>
          <div className="relative">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
            >
              <option value="all">All 4 Sikkim Districts</option>
              {destinationsData.map((d) => (
                <option key={d.id} value={d.slug}>
                  {d.name} {d.yearRoundAccess ? '(Year-Round)' : '(Seasonal)'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Travel Date / Estimated Period */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Travel Period
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-stone-400">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <select
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-8 pr-3 text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
            >
              <option value="2026-10">October 2026 (Autumn Clear Peak)</option>
              <option value="2026-11">November 2026 (Crystal Panoramas)</option>
              <option value="2026-12">December 2026 (Crisp Winter Snow)</option>
              <option value="2027-01">January 2027 (Winter Snowscapes)</option>
              <option value="2027-03">March 2027 (Early Spring Blooms)</option>
              <option value="2027-04">April 2027 (Rhododendron Season)</option>
              <option value="2027-05">May 2027 (Valley Flora & Pleasant)</option>
              <option value="custom">Other / Flexible Dates</option>
            </select>
          </div>
        </div>

        {/* Number of Travellers */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Travellers
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-stone-400">
              <Users className="w-3.5 h-3.5" />
            </div>
            <select
              value={travellers}
              onChange={(e) => setTravellers(Number(e.target.value))}
              className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-8 pr-3 text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
            >
              <option value={1}>1 Solo Traveller</option>
              <option value={2}>2 Travellers (Couple / Friends)</option>
              <option value={3}>3 Travellers</option>
              <option value={4}>4 Travellers (Small Family / SUV)</option>
              <option value={5}>5 – 6 Travellers (Family / Group)</option>
              <option value={8}>7+ Travellers (Group / Dedicated Mini-Coach)</option>
            </select>
          </div>
        </div>

        {/* Travel Style */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Travel Style
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-stone-400">
              <Mountain className="w-3.5 h-3.5" />
            </div>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 pl-8 pr-3 text-xs sm:text-sm font-medium text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
            >
              <option value="all">Any Travel Style</option>
              <option value="2-Week Grand Expedition">14-Day / 2-Week Grand Expedition</option>
              <option value="Royal Heritage & Culture">Royal Heritage & Monasteries</option>
              <option value="Adventure & High Altitude">North Sikkim Adventure (17,800 ft)</option>
              <option value="Family & Culture">Family Holidays</option>
              <option value="Romantic / Couples">Honeymoon & Couples</option>
              <option value="Bespoke Luxury">Royal Luxury Sanctuaries</option>
            </select>
          </div>
        </div>

        {/* Search CTA */}
        <div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 bg-[#173D35] hover:bg-[#0F2A24] text-white font-semibold text-xs sm:text-sm rounded-sm transition-colors shadow-sm focus:outline-hidden focus:ring-2 focus:ring-[#C4A36A]"
          >
            <Search className="w-4 h-4 text-[#C4A36A]" />
            <span>Search Sikkim Trips</span>
          </button>
        </div>
      </form>
    </div>
  );
};
