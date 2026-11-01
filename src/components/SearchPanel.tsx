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
      region: destination,
      dest: destination,
      date: travelMonth,
      pax: travellers.toString(),
      style: travelStyle,
    }).toString();

    navigate(`/packages?${query}`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel-3d rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-4 sm:p-6 text-[#202724] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
      <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        {/* Destination Dropdown */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#103D35] mb-1.5 flex items-center gap-1">
            <span>🗺️</span>
            <span>Sikkim Region / District</span>
          </label>
          <div className="relative">
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white/90 border border-stone-300 hover:border-[#EBA94B] rounded-xl py-2.5 px-3 text-xs sm:text-sm font-semibold text-stone-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#103D35] shadow-xs transition-all cursor-pointer"
            >
              <option value="all">All 4 Sikkim Regions (40 Packages)</option>
              <optgroup label="Sikkim Regions">
                <option value="North Sikkim">North Sikkim (Gurudongmar &amp; Yumthang)</option>
                <option value="East Sikkim">East Sikkim (Gangtok &amp; Silk Route)</option>
                <option value="West Sikkim">West Sikkim (Pelling &amp; Yuksom)</option>
                <option value="South Sikkim">South Sikkim (Ravangla, Buddha Park &amp; Temi)</option>
              </optgroup>
              <optgroup label="Key Destinations">
                {destinationsData.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} ({d.district})
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Travel Date / Estimated Period */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#103D35] mb-1.5 flex items-center gap-1">
            <span>📅</span>
            <span>Travel Period</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#103D35]">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <select
              value={travelMonth}
              onChange={(e) => setTravelMonth(e.target.value)}
              className="w-full bg-white/90 border border-stone-300 hover:border-[#EBA94B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold text-stone-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#103D35] shadow-xs transition-all cursor-pointer"
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
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#103D35] mb-1.5 flex items-center gap-1">
            <span>👥</span>
            <span>Travellers</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#103D35]">
              <Users className="w-3.5 h-3.5" />
            </div>
            <select
              value={travellers}
              onChange={(e) => setTravellers(Number(e.target.value))}
              className="w-full bg-white/90 border border-stone-300 hover:border-[#EBA94B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold text-stone-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#103D35] shadow-xs transition-all cursor-pointer"
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
          <label className="block text-[11px] font-bold uppercase tracking-wider text-[#103D35] mb-1.5 flex items-center gap-1">
            <span>🏔️</span>
            <span>Travel Style</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#103D35]">
              <Mountain className="w-3.5 h-3.5" />
            </div>
            <select
              value={travelStyle}
              onChange={(e) => setTravelStyle(e.target.value)}
              className="w-full bg-white/90 border border-stone-300 hover:border-[#EBA94B] rounded-xl py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold text-stone-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-[#103D35] shadow-xs transition-all cursor-pointer"
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

        {/* Search CTA with 3D Depth */}
        <div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-[#103D35] via-[#185247] to-[#103D35] hover:brightness-110 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer border border-[#EBA94B]/30"
          >
            <Search className="w-4 h-4 text-[#EBA94B]" />
            <span>Search Sikkim Trips</span>
          </button>
        </div>
      </form>
    </div>
  );
};
