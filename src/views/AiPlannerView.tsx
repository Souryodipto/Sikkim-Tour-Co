import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import {
  AiPlannerRequest,
  AiItineraryResult,
  generateAlgorithmicHimalayanItinerary,
} from '../utils/aiPlanner';
import {
  Sparkles,
  Compass,
  Calendar,
  Clock,
  MapPin,
  Car,
  Hotel,
  ShieldCheck,
  Printer,
  Bookmark,
  ArrowRight,
  ChevronRight,
  AlertTriangle,
  Heart,
  Check,
  Send,
  Mountain,
} from 'lucide-react';

export const AiPlannerView: React.FC = () => {
  const { navigate } = useRouter();
  const { user } = useAuth();

  // Wizard input state
  const [startingCity, setStartingCity] = useState('Bagdogra Airport (IXB)');
  const [daysCount, setDaysCount] = useState(5);
  const [travelMonth, setTravelMonth] = useState('October');
  const [travelerType, setTravelerType] = useState<'couple' | 'family' | 'solo' | 'friends' | 'corporate'>('couple');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [budgetTier, setBudgetTier] = useState<'budget' | 'moderate' | 'luxury'>('moderate');
  const [pace, setPace] = useState<'relaxed' | 'moderate' | 'packed'>('moderate');
  const [accommodationTier, setAccommodationTier] = useState<'Standard' | 'Deluxe' | 'Luxury Boutique'>('Deluxe');
  const [vehicleType, setVehicleType] = useState<'Shared Mountain 4x4' | 'Dedicated SUV (Innova/Scorpio)' | 'Luxury Toyota Crysta'>('Dedicated SUV (Innova/Scorpio)');
  const [interests, setInterests] = useState<string[]>([
    'High Altitude Lakes',
    'Monasteries & Royal Heritage',
    'Kanchenjunga Sunrise',
  ]);
  const [specialRequests, setSpecialRequests] = useState('');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState<AiItineraryResult | null>(() => {
    // Generate initial sensible sample so visitor sees immediate value
    return generateAlgorithmicHimalayanItinerary({
      startingCity: 'Bagdogra Airport (IXB)',
      daysCount: 5,
      travelMonth: 'October',
      travelerType: 'couple',
      adultCount: 2,
      childCount: 0,
      budgetTier: 'moderate',
      pace: 'moderate',
      accommodationTier: 'Deluxe',
      vehicleType: 'Dedicated SUV (Innova/Scorpio)',
      interests: ['High Altitude Lakes', 'Monasteries & Royal Heritage', 'Kanchenjunga Sunrise'],
      fitnessLevel: 'moderate',
    });
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const interestOptions = [
    'High Altitude Lakes',
    'Monasteries & Royal Heritage',
    'Kanchenjunga Sunrise',
    'Rhododendron Bloom',
    'Organic Tea Gardens',
    'Ancient Silk Route',
    'Scenic Mountain Hiking',
    'Local Sikkimese Food & Momos',
    'Photography & Starry Skies',
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      setInterests(interests.filter((i) => i !== item));
    } else {
      setInterests([...interests, item]);
    }
  };

  const applyPreset = (preset: {
    days: number;
    type: 'couple' | 'family' | 'solo';
    tier: 'Standard' | 'Deluxe' | 'Luxury Boutique';
    interests: string[];
  }) => {
    setDaysCount(preset.days);
    setTravelerType(preset.type);
    setAccommodationTier(preset.tier);
    setInterests(preset.interests);
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSavedSuccess(false);

    try {
      const payload: AiPlannerRequest = {
        startingCity,
        daysCount,
        travelMonth,
        travelerType,
        adultCount,
        childCount,
        budgetTier,
        pace,
        accommodationTier,
        vehicleType,
        interests,
        fitnessLevel: 'moderate',
        specialRequests,
      };

      const res = await fetch('/api/planner/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.itinerary) {
        setItinerary(data.itinerary);
      } else {
        // Fallback to local verified generator
        const local = generateAlgorithmicHimalayanItinerary(payload);
        setItinerary(local);
      }
    } catch {
      // Fallback
      const local = generateAlgorithmicHimalayanItinerary({
        startingCity,
        daysCount,
        travelMonth,
        travelerType,
        adultCount,
        childCount,
        budgetTier,
        pace,
        accommodationTier,
        vehicleType,
        interests,
        fitnessLevel: 'moderate',
        specialRequests,
      });
      setItinerary(local);
    } finally {
      setIsGenerating(false);
      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById('itinerary-results');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSaveItinerary = () => {
    if (!itinerary) return;
    try {
      const stored = localStorage.getItem('bk_saved_itineraries');
      const list = stored ? JSON.parse(stored) : [];
      list.unshift(itinerary);
      localStorage.setItem('bk_saved_itineraries', JSON.stringify(list));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving itinerary', err);
    }
  };

  const handleBookItinerary = () => {
    if (!itinerary) return;
    const params = new URLSearchParams({
      type: 'custom_itinerary',
      id: itinerary.id,
      slug: itinerary.matchingPackageSlug || 'grand-sikkim-odyssey-2-weeks',
      title: itinerary.tripTitle,
      basePrice: Math.round(itinerary.totalEstimatedCostInr / adultCount).toString(),
      durationDays: itinerary.days.length.toString(),
      adults: adultCount.toString(),
      children: childCount.toString(),
    });
    navigate(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Introduction */}
        <div className="mb-8 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D35]/10 text-xs font-semibold text-[#173D35] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>AI-Assisted Himalayan Itinerary Architecture</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#173D35] tracking-tight">
            Design Your Personalized Sikkim Journey
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
            Constructed with verified mountain driving transit times, high-altitude acclimatization windows, Inner Line Permit requirements, and transparent itemized cost projections.
          </p>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <span className="text-xs font-medium text-stone-500 mr-1">Inspirations:</span>
            <button
              onClick={() =>
                applyPreset({
                  days: 5,
                  type: 'couple',
                  tier: 'Deluxe',
                  interests: ['Kanchenjunga Sunrise', 'Monasteries & Royal Heritage'],
                })
              }
              className="px-3 py-1 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-full text-xs transition-colors"
            >
              5-Day Classic Couple
            </button>
            <button
              onClick={() =>
                applyPreset({
                  days: 7,
                  type: 'couple',
                  tier: 'Deluxe',
                  interests: ['High Altitude Lakes', 'Rhododendron Bloom'],
                })
              }
              className="px-3 py-1 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-full text-xs transition-colors"
            >
              7-Day North Sikkim Lakes
            </button>
            <button
              onClick={() =>
                applyPreset({
                  days: 14,
                  type: 'family',
                  tier: 'Luxury Boutique',
                  interests: ['High Altitude Lakes', 'Monasteries & Royal Heritage', 'Organic Tea Gardens'],
                })
              }
              className="px-3 py-1 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 rounded-full text-xs transition-colors"
            >
              14-Day 4-District Odyssey
            </button>
          </div>
        </div>

        {/* Wizard Form Card */}
        <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-sm mb-12">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Starting Gateway *
                </label>
                <select
                  value={startingCity}
                  onChange={(e) => setStartingCity(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                >
                  <option value="Bagdogra Airport (IXB)">Bagdogra Airport (IXB)</option>
                  <option value="Pakyong Airport (PYG)">Pakyong Airport (PYG - East Sikkim)</option>
                  <option value="New Jalpaiguri Railway (NJP)">New Jalpaiguri Railway (NJP)</option>
                  <option value="Kolkata (CCU)">Kolkata (CCU Connect)</option>
                  <option value="New Delhi (DEL)">New Delhi (DEL Connect)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Duration (3 to 14 Days)
                </label>
                <select
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                >
                  {[3, 4, 5, 6, 7, 8, 10, 12, 14].map((d) => (
                    <option key={d} value={d}>
                      {d} Days / {d - 1} Nights
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Travel Month
                </label>
                <select
                  value={travelMonth}
                  onChange={(e) => setTravelMonth(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                >
                  {[
                    'January',
                    'February',
                    'March (Spring Bloom)',
                    'April (Rhododendron Season)',
                    'May',
                    'June',
                    'September',
                    'October (Clear Peaks)',
                    'November (Crisp Panoramas)',
                    'December (Snow)',
                  ].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Traveler Group Style
                </label>
                <select
                  value={travelerType}
                  onChange={(e) => setTravelerType(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                >
                  <option value="couple">Couple / Honeymoon</option>
                  <option value="family">Family with Children</option>
                  <option value="solo">Solo Himalayan Seeker</option>
                  <option value="friends">Group of Friends</option>
                  <option value="corporate">Corporate Retreat</option>
                </select>
              </div>
            </div>

            {/* Travel Pace & Tiers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Accommodation Tier
                </label>
                <select
                  value={accommodationTier}
                  onChange={(e) => setAccommodationTier(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                >
                  <option value="Standard">Standard (Verified 3-Star / Mountain Homestays)</option>
                  <option value="Deluxe">Deluxe (4-Star Scenic Properties)</option>
                  <option value="Luxury Boutique">Luxury Boutique (Heritage Resorts)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Vehicle Preference
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                >
                  <option value="Dedicated SUV (Innova/Scorpio)">Dedicated SUV (Innova/Scorpio)</option>
                  <option value="Luxury Toyota Crysta">Luxury Toyota Crysta 4x4</option>
                  <option value="Shared Mountain 4x4">Shared Mountain 4x4 (Economical)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Travel Pace
                </label>
                <select
                  value={pace}
                  onChange={(e) => setPace(e.target.value as any)}
                  className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                >
                  <option value="relaxed">Relaxed (Gentle starts & leisurely tea)</option>
                  <option value="moderate">Moderate (Standard sightseeing balance)</option>
                  <option value="packed">Intensive (Maximum summits & passes)</option>
                </select>
              </div>
            </div>

            {/* Interests Chips Selection */}
            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-2">
                What Matters Most on Your Journey? (Select multiple)
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {interestOptions.map((item) => {
                  const isSelected = interests.includes(item);
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => toggleInterest(item)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                        isSelected
                          ? 'bg-[#173D35] text-white border-[#173D35] shadow-xs'
                          : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Generation Button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={isGenerating}
                className="px-8 py-3.5 bg-[#C4A36A] hover:bg-[#DFC89E] disabled:bg-stone-300 text-[#173D35] font-semibold text-sm rounded-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#173D35] border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Himalayan Mountain Logistics...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Structured Himalayan Itinerary</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Generated Itinerary Section */}
        {itinerary && (
          <div id="itinerary-results" className="space-y-8 animate-in fade-in duration-300">
            {/* Overview Banner Card */}
            <div className="bg-[#173D35] text-white p-6 sm:p-8 rounded-lg shadow-xl relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider bg-white/15 text-[#DFC89E] border border-white/20">
                      Itinerary Reference: {itinerary.id}
                    </span>
                    <span className="text-xs text-emerald-300 flex items-center gap-1 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Geographically Validated
                    </span>
                  </div>
                  <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-white mb-2">
                    {itinerary.tripTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-200 max-w-xl font-light leading-relaxed">
                    {itinerary.tagline}
                  </p>
                </div>

                {/* Estimated Budget Summary */}
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-md border border-white/15 shrink-0 text-right">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#DFC89E] block">
                    Estimated Expedition Budget
                  </span>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="font-editorial text-3xl font-bold text-white">
                      ₹{itinerary.totalEstimatedCostInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-300">Total ({adultCount} Adults)</span>
                  </div>
                  <span className="text-[11px] text-stone-300 block font-mono">
                    Approx. ₹{Math.round(itinerary.totalEstimatedCostInr / adultCount).toLocaleString('en-IN')} / person
                  </span>
                </div>
              </div>

              {/* Action Buttons: Save, Print, Book */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-white/15 relative z-10 no-print">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveItinerary}
                    className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Bookmark className="w-3.5 h-3.5 text-[#DFC89E]" />
                    <span>{savedSuccess ? 'Saved to Account!' : 'Save Itinerary'}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3.5 py-2 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#DFC89E]" />
                    <span>Print Plan</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const message = `Hello Sikkim Tour Co. team, I designed a ${daysCount}-day Sikkim plan (${itinerary.tripTitle}) and would like to review it with a specialist.`;
                      window.open(`https://wa.me/919733022334?text=${encodeURIComponent(message)}`, '_blank');
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1"
                  >
                    <span>Discuss on WhatsApp</span>
                  </button>
                  <button
                    onClick={handleBookItinerary}
                    className="px-4 py-2 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] text-xs font-semibold rounded-sm transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <span>Book This Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cost Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-md border border-stone-200 text-xs">
                <span className="text-stone-500 block mb-1">Stays ({accommodationTier})</span>
                <span className="font-editorial text-xl font-bold text-[#173D35] font-mono">
                  ₹{itinerary.costBreakdown.staysInr.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-white p-4 rounded-md border border-stone-200 text-xs">
                <span className="text-stone-500 block mb-1">Dedicated Transport & Driver</span>
                <span className="font-editorial text-xl font-bold text-[#173D35] font-mono">
                  ₹{itinerary.costBreakdown.transportInr.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-white p-4 rounded-md border border-stone-200 text-xs">
                <span className="text-stone-500 block mb-1">PAP Permits & Entry Clearances</span>
                <span className="font-editorial text-xl font-bold text-[#173D35] font-mono">
                  ₹{itinerary.costBreakdown.permitsAndEntryInr.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="bg-white p-4 rounded-md border border-stone-200 text-xs">
                <span className="text-stone-500 block mb-1">Estimated Meals & 5% GST</span>
                <span className="font-editorial text-xl font-bold text-[#173D35] font-mono">
                  ₹{(itinerary.costBreakdown.foodAndMiscInr + itinerary.costBreakdown.gstTaxInr).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Day-by-Day Detailed Timeline */}
            <div className="space-y-4">
              <h3 className="font-editorial text-2xl font-bold text-[#173D35]">
                Day-by-Day Expedition Timeline
              </h3>

              {itinerary.days.map((day) => (
                <div
                  key={day.dayNumber}
                  className="bg-white rounded-lg border border-stone-200/90 p-5 sm:p-6 shadow-xs hover:border-stone-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#173D35] text-white flex items-center justify-center text-xs font-bold font-mono">
                        D{day.dayNumber}
                      </span>
                      <div>
                        <h4 className="font-editorial text-xl font-bold text-[#173D35]">
                          {day.title}
                        </h4>
                        <span className="text-xs text-stone-500 font-mono">
                          Route: {day.route}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-stone-500 shrink-0 font-mono">
                      <span>Drive: {day.drivingTimeHours} ({day.drivingDistanceKm} km)</span>
                      <span>· Elevation: {day.altitudeFt.toLocaleString()} ft</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light mb-4">
                    {day.description}
                  </p>

                  {/* Highlights checklist */}
                  <div className="space-y-1 mb-4">
                    {day.activities.map((act, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-600">
                        <Check className="w-3 h-3 text-[#527568]" />
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>

                  {/* Badges / Logistics Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
                    <div className="flex items-center gap-4 text-stone-600">
                      <span>Stay: <strong className="text-[#173D35]">{day.overnightStay}</strong></span>
                      <span>Meals: <strong className="text-[#173D35]">{day.meals}</strong></span>
                    </div>

                    {day.permitNotice && (
                      <span className="text-[11px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200">
                        ⚠ {day.permitNotice}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Travel Advisories & Permits Checklist */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-2">
                <h4 className="font-editorial text-lg font-bold text-[#173D35] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C4A36A]" />
                  Mandatory Permits for This Route
                </h4>
                {itinerary.permitRequirements.map((req, i) => (
                  <p key={i}>• {req}</p>
                ))}
              </div>

              <div className="bg-white p-6 rounded-lg border border-stone-200 text-xs text-stone-600 space-y-2">
                <h4 className="font-editorial text-lg font-bold text-[#173D35] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Altitude & Packing Guidance
                </h4>
                {itinerary.weatherAndPackingTips.map((tip, i) => (
                  <p key={i}>• {tip}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
