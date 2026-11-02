import React, { useState, useMemo } from 'react';
import {
  Train,
  Plane,
  Clock,
  MapPin,
  Calendar,
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  Copy,
  Check,
  Send,
  Info,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import {
  IRCTC_TRAIN_SCHEDULES,
  KOLKATA_BAGDOGRA_FLIGHTS,
  IrctcTrainSchedule,
} from '../data/trainSchedules';

interface WestBengalTrainMatrixProps {
  initialOrigin?: 'all' | 'SDAH' | 'HWH' | 'KOAA' | 'kalyani';
  compact?: boolean;
}

export const WestBengalTrainMatrix: React.FC<WestBengalTrainMatrixProps> = ({
  initialOrigin = 'all',
  compact = false,
}) => {
  const [activeTab, setActiveTab] = useState<'trains' | 'flights'>('trains');
  const [stationFilter, setStationFilter] = useState<'all' | 'SDAH' | 'HWH' | 'KOAA' | 'kalyani'>(
    initialOrigin
  );
  const [timeFilter, setTimeFilter] = useState<'all' | 'Overnight' | 'Day'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedTrainNumber, setCopiedTrainNumber] = useState<string | null>(null);

  const filteredTrains = useMemo(() => {
    return IRCTC_TRAIN_SCHEDULES.filter((train) => {
      // Station filter
      if (stationFilter === 'SDAH' && train.originStationCode !== 'SDAH') return false;
      if (stationFilter === 'HWH' && train.originStationCode !== 'HWH') return false;
      if (stationFilter === 'KOAA' && train.originStationCode !== 'KOAA') return false;
      if (stationFilter === 'kalyani' && !train.kalyaniSuburbanStop) return false;

      // Time filter
      if (timeFilter === 'Overnight' && train.timingCategory !== 'Overnight' && train.timingCategory !== 'Evening') {
        return false;
      }
      if (timeFilter === 'Day' && train.timingCategory !== 'Morning' && train.timingCategory !== 'Afternoon') {
        return false;
      }

      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchNumber = train.trainNumber.toLowerCase().includes(q);
        const matchName = train.trainName.toLowerCase().includes(q);
        const matchStation = train.originStationName.toLowerCase().includes(q);
        const matchSuburban = train.kalyaniSuburbanStop?.stationName.toLowerCase().includes(q) || false;
        if (!matchNumber && !matchName && !matchStation && !matchSuburban) {
          return false;
        }
      }

      return true;
    });
  }, [stationFilter, timeFilter, searchQuery]);

  const handleCopy = (train: IrctcTrainSchedule) => {
    const text = `${train.trainName} (${train.trainNumber}) | ${train.originStationCode} ${train.departureTime} -> NJP ${train.arrivalTime} (${train.duration}) | Runs: ${train.runsOn.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedTrainNumber(train.trainNumber);
    setTimeout(() => setCopiedTrainNumber(null), 2500);
  };

  const getWhatsAppBookingUrl = (train: IrctcTrainSchedule) => {
    const msg = `Hi Sikkim Tour Co., I am planning to arrive at NJP on ${train.trainName} (${train.trainNumber}) arriving at ${train.arrivalTime}. Please arrange a dedicated 4x4 mountain vehicle (Innova/Scorpio) pickup from Platform 1 portico for my Sikkim tour.`;
    return `https://wa.me/917001846727?text=${encodeURIComponent(msg)}`;
  };

  const getFlightWhatsAppUrl = (flightNumber: string, arrivalTime: string) => {
    const msg = `Hi Sikkim Tour Co., I am arriving at Bagdogra Airport (IXB) on Flight ${flightNumber} at ${arrivalTime}. Please coordinate curbside mountain chauffeur pickup for our Sikkim journey.`;
    return `https://wa.me/917001846727?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="w-full bg-[#08221D] text-white rounded-3xl border border-[#EBA94B]/40 shadow-2xl overflow-hidden my-8">
      {/* HEADER BAR */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#0A2E26] via-[#103D35] to-[#0A2E26] border-b border-[#EBA94B]/30 relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBA94B]/20 text-[#EBA94B] text-[11px] font-mono uppercase tracking-wider border border-[#EBA94B]/40">
              <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
              Official 2026 IRCTC &amp; Airline Schedule Matrix
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Kolkata, Kalyani &amp; Suburban Stations to NJP Train Directory
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Every major train from Sealdah (SDAH), Howrah (HWH), Kolkata Chitpur (KOAA), and Naihati/Bandel
              junctions arriving at New Jalpaiguri (NJP) with live platform-side 4x4 pickup protocols.
            </p>
          </div>

          {/* MODE TOGGLE: TRAINS VS FLIGHTS */}
          <div className="flex items-center gap-1.5 p-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('trains')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'trains'
                  ? 'bg-[#EBA94B] text-[#103D35] shadow-md font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Train className="w-4 h-4" />
              <span>IRCTC Trains ({IRCTC_TRAIN_SCHEDULES.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('flights')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'flights'
                  ? 'bg-[#EBA94B] text-[#103D35] shadow-md font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Plane className="w-4 h-4" />
              <span>Flights (CCU &rarr; IXB) ({KOLKATA_BAGDOGRA_FLIGHTS.length})</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'trains' ? (
        <div className="p-6 sm:p-8 space-y-6">
          {/* SEARCH & FILTERS CONTROLS */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#EBA94B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search train name (e.g. Darjeeling Mail, Padatik, 12343)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-stone-400 text-xs focus:outline-hidden focus:border-[#EBA94B]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Station Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mr-1">
                Departure Station:
              </span>
              {[
                { id: 'all', label: 'All (14)' },
                { id: 'SDAH', label: 'Sealdah (SDAH)' },
                { id: 'HWH', label: 'Howrah (HWH)' },
                { id: 'KOAA', label: 'Kolkata Chitpur' },
                { id: 'kalyani', label: '⭐ Kalyani / Naihati Stop' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setStationFilter(btn.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    stationFilter === btn.id
                      ? 'bg-[#EBA94B] text-[#103D35] font-bold shadow-sm'
                      : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Timing Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-wider mr-1">
                Departure:
              </span>
              {[
                { id: 'all', label: 'All Times' },
                { id: 'Overnight', label: '🌙 Overnight (Sleep & Wake Up)' },
                { id: 'Day', label: '☀️ Daytime Express' },
              ].map((btn) => (
                <button
                  key={btn.id}
                  onClick={() => setTimeFilter(btn.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                    timeFilter === btn.id
                      ? 'bg-emerald-500 text-white font-bold shadow-sm'
                      : 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* TRAIN CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTrains.map((train) => {
              const isCopied = copiedTrainNumber === train.trainNumber;
              return (
                <div
                  key={train.trainNumber}
                  className="rounded-2xl p-5 bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-[#EBA94B]/50 transition-all shadow-lg flex flex-col justify-between group"
                >
                  <div className="space-y-3.5">
                    {/* TOP BADGE LINE */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-[#EBA94B]/20 text-[#EBA94B] font-mono text-xs font-bold border border-[#EBA94B]/40">
                          {train.trainNumber}
                        </span>
                        <span className="font-serif text-lg font-bold text-white group-hover:text-[#EBA94B] transition-colors">
                          {train.trainName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-stone-300 border border-white/15">
                          {train.trainType}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {train.runsOn.join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* TIME & ROUTE JOURNEY BAR */}
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                      <div className="text-left">
                        <div className="text-xl sm:text-2xl font-mono font-bold text-white">
                          {train.departureTime}
                        </div>
                        <div className="text-[11px] text-stone-300 font-medium">
                          {train.originStationCode} ({train.originStationCode === 'SDAH' ? 'Sealdah' : train.originStationCode === 'HWH' ? 'Howrah' : train.originStationCode === 'KOAA' ? 'Kolkata Chitpur' : 'Dankuni'})
                        </div>
                      </div>

                      <div className="flex-1 px-4 flex flex-col items-center">
                        <span className="text-[10px] font-mono text-stone-400 mb-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#EBA94B]" />
                          {train.duration}
                        </span>
                        <div className="w-full flex items-center">
                          <div className="h-0.5 flex-1 bg-white/20" />
                          <div className="w-2 h-2 rounded-full bg-[#EBA94B] mx-1" />
                          <div className="h-0.5 flex-1 bg-white/20" />
                        </div>
                        <span className="text-[9px] text-[#EBA94B] font-mono mt-1">
                          Non-Stop Mountain Transit
                        </span>
                      </div>

                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">
                          {train.arrivalTime}
                        </div>
                        <div className="text-[11px] text-stone-300 font-medium">
                          NJP Junction
                        </div>
                      </div>
                    </div>

                    {/* SUBURBAN BOARDING HIGHLIGHT FOR KALYANI / NADIA */}
                    {train.kalyaniSuburbanStop && (
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                        <MapPin className="w-4 h-4 text-[#EBA94B] shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="font-bold text-white">
                            Kalyani / Nadia Commuter Boarding: {train.kalyaniSuburbanStop.stationName}
                          </span>
                          <p className="text-[11px] text-amber-200/90 leading-tight">
                            Halt Time: {train.kalyaniSuburbanStop.scheduledHaltTime} ({train.kalyaniSuburbanStop.distanceFromKalyani}). {train.kalyaniSuburbanStop.commuterTip}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* CLASSES & PANTRY BADGES */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-1">
                        <span className="text-[10px] font-mono text-stone-400 mr-1">Classes:</span>
                        {train.classes.map((cls) => (
                          <span
                            key={cls}
                            className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white font-semibold"
                          >
                            {cls}
                          </span>
                        ))}
                      </div>
                      <div className="text-[10px] font-mono text-stone-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{train.pantryAvailable ? 'Pantry Onboard' : 'Station Food Available'}</span>
                      </div>
                    </div>

                    {/* NJP PICKUP PROTOCOL */}
                    <p className="text-xs text-stone-300 italic border-l-2 border-[#EBA94B] pl-2.5 py-0.5">
                      {train.njpPickupPortico}
                    </p>
                  </div>

                  {/* BOTTOM ACTION BUTTONS */}
                  <div className="pt-4 mt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => handleCopy(train)}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-stone-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
                      title="Copy train schedule to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Schedule</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getWhatsAppBookingUrl(train)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5 fill-white" />
                      <span>Book NJP Platform 1 Pickup</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredTrains.length === 0 && (
            <div className="text-center py-12 text-stone-400">
              <p className="text-sm">No trains match your current filter criteria.</p>
              <button
                onClick={() => {
                  setStationFilter('all');
                  setTimeFilter('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-[#EBA94B] underline"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* IRCTC BOOKING ADVISORY BAR */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#EBA94B] shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="font-bold text-white">IRCTC Booking Window &amp; Advance Planning</span>
                <p className="text-stone-300 text-[11px] leading-relaxed">
                  IRCTC opens ticket bookings 120 days in advance at 08:00 AM IST. For Durga Puja, Diwali, and Summer peaks,
                  book Darjeeling Mail (12343) or Padatik (12377) well in advance. Our Gangtok concierge tracks your train on NTES
                  and guarantees vehicle availability even if your train runs late.
                </p>
              </div>
            </div>
            <a
              href="https://www.irctc.co.in"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs flex items-center gap-1 shrink-0"
            >
              <span>IRCTC Official</span>
              <ExternalLink className="w-3 h-3 text-[#EBA94B]" />
            </a>
          </div>
        </div>
      ) : (
        /* FLIGHTS TAB (CCU -> IXB) */
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200">
            <Plane className="w-5 h-5 text-[#EBA94B] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">
                50-Minute Non-Stop Flights from Netaji Subhash Chandra Bose International (CCU)
              </span>
              <p className="text-stone-300 text-[11px] leading-relaxed mt-0.5">
                Bagdogra Airport (IXB) is only 124 km from Gangtok. Our dedicated 4x4 Innova Crystas wait at the terminal curb
                with name placards. We recommend choosing morning flights landing before 2:00 PM for scenic daytime hill driving.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {KOLKATA_BAGDOGRA_FLIGHTS.map((flight) => (
              <div
                key={flight.flightNumber}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#EBA94B]/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#EBA94B]/20 text-[#EBA94B] border border-[#EBA94B]/30">
                    {flight.flightNumber}
                  </span>
                  <span className="text-xs text-white font-semibold">{flight.airline}</span>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-white/10">
                  <div>
                    <div className="text-sm font-mono font-bold text-white">{flight.departureTime}</div>
                    <div className="text-[10px] text-stone-400">Kolkata (CCU)</div>
                  </div>
                  <div className="text-center px-2">
                    <span className="text-[10px] font-mono text-[#EBA94B]">{flight.duration}</span>
                    <div className="w-12 h-0.5 bg-white/20 mx-auto" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-emerald-400">{flight.arrivalTime}</div>
                    <div className="text-[10px] text-stone-400">Bagdogra (IXB)</div>
                  </div>
                </div>

                <p className="text-[11px] text-stone-300 leading-snug">
                  {flight.bagdograPickupNote}
                </p>

                <a
                  href={getFlightWhatsAppUrl(flight.flightNumber, flight.arrivalTime)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 px-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all mt-2"
                >
                  <Send className="w-3.5 h-3.5 fill-white" />
                  <span>Book Bagdogra Curbside Pickup</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
