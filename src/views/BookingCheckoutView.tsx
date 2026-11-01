import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { tourPackagesData } from '../data/packages';
import { accommodationsData } from '../data/accommodations';
import { calculatePricingBreakdown, validateCoupon, activeCoupons } from '../utils/booking';
import {
  ShieldCheck,
  Calendar,
  Users,
  Car,
  Hotel,
  Sparkles,
  CreditCard,
  FileText,
  Tag,
  CheckCircle2,
  Lock,
  ChevronLeft,
  ArrowRight,
  AlertCircle,
  Clock,
  Compass,
  Check,
} from 'lucide-react';

export const BookingCheckoutView: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const { user } = useAuth();
  const query = currentRoute.queryParams;

  // Derive initial values from query or default to flagship package
  const itemType = (query.type as any) || 'package';
  const itemSlug = query.slug || 'grand-sikkim-odyssey-2-weeks';
  const fallbackPkg = tourPackagesData.find((p) => p.slug === itemSlug) || tourPackagesData[0];
  const fallbackStay = accommodationsData.find((s) => s.slug === itemSlug) || accommodationsData[0];

  const itemId = query.id || (itemType === 'package' ? fallbackPkg.id : fallbackStay.id);
  const itemTitle = query.title || (itemType === 'package' ? fallbackPkg.name : fallbackStay.name);
  const basePriceInr = query.basePrice ? Number(query.basePrice) : (itemType === 'package' ? fallbackPkg.startingPriceInr : fallbackStay.startingPriceInr);
  const durationDays = query.durationDays ? Number(query.durationDays) : (itemType === 'package' ? fallbackPkg.daysCount : 4);

  // Dates
  const defaultStart = query.startDate || new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0];
  const defaultEnd = query.endDate || new Date(Date.now() + 86400000 * (14 + durationDays)).toISOString().split('T')[0];

  const [travelStartDate, setTravelStartDate] = useState(defaultStart);
  const [travelEndDate, setTravelEndDate] = useState(defaultEnd);
  const [adultCount, setAdultCount] = useState(query.adults ? Number(query.adults) : 2);
  const [childCount, setChildCount] = useState(query.children ? Number(query.children) : 0);
  const [accommodationCategory, setAccommodationCategory] = useState<'Standard' | 'Deluxe' | 'Luxury Boutique'>('Deluxe');
  const [vehicleType, setVehicleType] = useState<'Shared Mountain 4x4' | 'Dedicated SUV (Innova/Scorpio)' | 'Luxury Toyota Crysta'>('Dedicated SUV (Innova/Scorpio)');

  // Add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<Array<{ id: string; name: string; priceInr: number }>>([]);

  // Traveler Details Form
  const [fullName, setFullName] = useState(user?.name || 'Rohan Mukherjee');
  const [email, setEmail] = useState(user?.email || 'rohan.mukherjee@example.com');
  const [phone, setPhone] = useState(user?.phone || '+91 98301 23456');
  const [nationality, setNationality] = useState('India');
  const [idType, setIdType] = useState('Voter ID');
  const [idNumber, setIdNumber] = useState('WB/14/092/189201');
  const [pickupLocation, setPickupLocation] = useState('Bagdogra Airport (IXB)');
  const [emergencyContact, setEmergencyContact] = useState('Debashis Mukherjee (+91 98300 55443)');
  const [specialDietOrNotes, setSpecialDietOrNotes] = useState('Kanchenjunga view rooms requested.');
  const [agreeToTerms, setAgreeToTerms] = useState(true);

  // Coupon
  const [couponCode, setCouponCode] = useState('HIMALAYA10');
  const [appliedCoupon, setAppliedCoupon] = useState<string>('HIMALAYA10');
  const [couponFeedback, setCouponFeedback] = useState<string>('10% Himalayan discount applied');

  // Booking Confirmation Method (Zero Online Payment)
  const [paymentMethod] = useState<'bank_transfer_proforma'>('bank_transfer_proforma');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Available add-ons
  const availableAddOns = [
    { id: 'oxygen-support', name: 'High-Altitude Portable Oxygen Cylinder Kit', priceInr: 2500 },
    { id: 'temi-tea-tasting', name: 'Temi Organic Tea Plucking & Master Tasting Pass', priceInr: 1500 },
    { id: 'heritage-walk-guide', name: 'Private Royal Monastery & Rabdentse Guide', priceInr: 2200 },
  ];

  const toggleAddOn = (addOn: { id: string; name: string; priceInr: number }) => {
    if (selectedAddOns.some((a) => a.id === addOn.id)) {
      setSelectedAddOns(selectedAddOns.filter((a) => a.id !== addOn.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addOn]);
    }
  };

  // Pricing calculation
  const pricing = calculatePricingBreakdown({
    basePriceInr,
    adultCount,
    childCount,
    accommodationCategory,
    vehicleType,
    addOns: selectedAddOns,
    couponCode: appliedCoupon,
  });

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setAppliedCoupon('');
      setCouponFeedback('');
      return;
    }
    const res = validateCoupon(couponCode, pricing.baseAmountInr);
    if (res.valid) {
      setAppliedCoupon(couponCode.trim().toUpperCase());
      setCouponFeedback(res.message);
    } else {
      setAppliedCoupon('');
      setCouponFeedback(res.message);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!agreeToTerms) {
      setErrorMessage('You must accept the booking terms and cancellation policy.');
      return;
    }

    if (!fullName || !email || !phone || !idNumber) {
      setErrorMessage('Please fill in all mandatory traveler identification fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        itemType,
        itemId,
        itemSlug,
        itemTitle,
        travelStartDate,
        travelEndDate,
        durationDays,
        adultCount,
        childCount,
        accommodationCategory,
        vehicleType,
        basePriceInr,
        addOns: selectedAddOns,
        couponCode: appliedCoupon || undefined,
        primaryTraveler: {
          fullName,
          email,
          phone,
          nationality,
          idType,
          idNumber,
          pickupLocation,
          emergencyContact,
          specialDietOrNotes,
        },
        coTravelers: adultCount > 1 ? [{ fullName: 'Shreya Mukherjee', age: 31, gender: 'Female' }] : [],
        paymentMethod,
        agreeToTerms: true,
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (!response.ok || !resData.success) {
        setErrorMessage(resData.message || 'Booking submission failed. Please verify your details.');
        setIsSubmitting(false);
        return;
      }

      // Navigate to confirmed page
      navigate(`/booking-confirmation/${resData.bookingId}`);
    } catch (err) {
      console.error('Error submitting booking:', err);
      setErrorMessage('Network error during booking confirmation. Please retry.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1 as any)}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#173D35] mb-4 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        {/* Page Title & Trust Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D35]/10 text-xs font-semibold text-[#173D35] uppercase tracking-wider mb-2">
              <Lock className="w-3.5 h-3.5 text-[#527568]" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#173D35] tracking-tight">
              Confirm Your Himalayan Journey
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Direct verification with the Gangtok travel desk · Protected Area Permits & vehicle clearances included.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-md border border-stone-200 text-xs text-stone-600 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Guaranteed Price & Vehicle Allocation</span>
          </div>
        </div>

        {/* Error message banner */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmitBooking}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Form Sections */}
            <div className="lg:col-span-2 space-y-8">
              {/* SECTION 1: Trip Item & Date Preferences */}
              <div className="bg-white p-6 sm:p-7 rounded-lg border border-stone-200 shadow-xs">
                <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-stone-100">
                  <div className="w-7 h-7 rounded-full bg-[#173D35] text-white flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h2 className="font-editorial text-xl font-bold text-[#173D35]">
                    Selected Itinerary & Travel Preferences
                  </h2>
                </div>

                {/* Selected Item banner */}
                <div className="p-4 rounded-md bg-[#F4F1EA] border border-[#DFC89E]/40 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#527568] block">
                      {itemType === 'package' ? 'Tour Package' : 'Mountain Property'}
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#173D35]">
                      {itemTitle}
                    </h3>
                    <span className="text-xs text-stone-600">
                      Duration: {durationDays} Days / {Math.max(1, durationDays - 1)} Nights
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-stone-500 block">Starting From</span>
                    <span className="font-editorial text-xl font-bold text-[#173D35]">
                      ₹{basePriceInr.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-stone-500"> / person</span>
                  </div>
                </div>

                {/* Travel Dates & Travelers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Departure Date (Sikkim Arrival)
                    </label>
                    <input
                      type="date"
                      required
                      value={travelStartDate}
                      onChange={(e) => setTravelStartDate(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Return Date (Sikkim Departure)
                    </label>
                    <input
                      type="date"
                      required
                      value={travelEndDate}
                      onChange={(e) => setTravelEndDate(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Adult Travelers (12+ years)
                    </label>
                    <select
                      value={adultCount}
                      onChange={(e) => setAdultCount(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Children (5 to 11 years, 60% tariff)
                    </label>
                    <select
                      value={childCount}
                      onChange={(e) => setChildCount(Number(e.target.value))}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                    >
                      {[0, 1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Child' : 'Children'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Accommodation Category */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-stone-700 block mb-2">
                    Accommodation Tier Preference
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'Standard', label: 'Standard Comfort', desc: 'Verified 3-star equivalent hotels & homestays' },
                      { id: 'Deluxe', label: 'Deluxe Category (+15%)', desc: 'Scenic 4-star properties with Kanchenjunga view' },
                      { id: 'Luxury Boutique', label: 'Luxury Boutique (+45%)', desc: 'Elgin Nor-Khill, Chumbi Retreat & heritage resorts' },
                    ].map((tier) => (
                      <div
                        key={tier.id}
                        onClick={() => setAccommodationCategory(tier.id as any)}
                        className={`p-3 rounded-md border text-left cursor-pointer transition-all ${
                          accommodationCategory === tier.id
                            ? 'border-[#C4A36A] ring-2 ring-[#C4A36A]/20 bg-[#FBF9F4]'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#173D35] block mb-0.5">
                          {tier.label}
                        </span>
                        <span className="text-[11px] text-stone-500 leading-snug block">
                          {tier.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mountain Vehicle Type */}
                <div className="mb-5">
                  <label className="text-xs font-semibold text-stone-700 block mb-2">
                    Mountain Transport Selection
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'Shared Mountain 4x4', label: 'Shared Mountain 4x4', desc: 'Point to point transfer', surcharge: 'Included' },
                      { id: 'Dedicated SUV (Innova/Scorpio)', label: 'Dedicated SUV (+₹4,500)', desc: 'Exclusive vehicle & mountain driver', surcharge: '+₹4,500' },
                      { id: 'Luxury Toyota Crysta', label: 'Luxury Crysta 4x4 (+₹8,500)', desc: 'High ground clearance & captain seats', surcharge: '+₹8,500' },
                    ].map((v) => (
                      <div
                        key={v.id}
                        onClick={() => setVehicleType(v.id as any)}
                        className={`p-3 rounded-md border text-left cursor-pointer transition-all ${
                          vehicleType === v.id
                            ? 'border-[#C4A36A] ring-2 ring-[#C4A36A]/20 bg-[#FBF9F4]'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <span className="text-xs font-bold text-[#173D35] block mb-0.5">
                          {v.label}
                        </span>
                        <span className="text-[11px] text-stone-500 leading-snug block">
                          {v.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Optional Add-ons */}
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-2">
                    Curated Journey Add-ons
                  </label>
                  <div className="space-y-2">
                    {availableAddOns.map((addOn) => {
                      const isChecked = selectedAddOns.some((a) => a.id === addOn.id);
                      return (
                        <label
                          key={addOn.id}
                          className="flex items-center justify-between p-3 rounded-md border border-stone-200 hover:bg-stone-50 cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleAddOn(addOn)}
                              className="rounded text-[#173D35] focus:ring-[#173D35]"
                            />
                            <span className="text-stone-800 font-medium">{addOn.name}</span>
                          </div>
                          <span className="font-semibold text-[#173D35] shrink-0">
                            +₹{addOn.priceInr.toLocaleString('en-IN')}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* SECTION 2: Primary Traveler Identification */}
              <div className="bg-white p-6 sm:p-7 rounded-lg border border-stone-200 shadow-xs">
                <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-stone-100">
                  <div className="w-7 h-7 rounded-full bg-[#173D35] text-white flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <h2 className="font-editorial text-xl font-bold text-[#173D35]">
                      Primary Traveler & Sikkim Permit Information
                    </h2>
                    <p className="text-[11px] text-stone-500">
                      Required for issuing military checkpost Protected Area Permits (PAP) & Inner Line Permits.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Full Legal Name (as on Identity Card) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Mukherjee"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Email Address (for official voucher & invoice) *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rohan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Contact WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98301 23456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Nationality *
                    </label>
                    <select
                      value={nationality}
                      onChange={(e) => setNationality(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                    >
                      <option value="India">India (Voter ID / Passport required)</option>
                      <option value="United States">United States (Passport + Indian Visa)</option>
                      <option value="United Kingdom">United Kingdom (Passport + Indian Visa)</option>
                      <option value="Australia">Australia (Passport + Indian Visa)</option>
                      <option value="Germany">Germany (Passport + Indian Visa)</option>
                      <option value="Singapore">Singapore (Passport + Indian Visa)</option>
                      <option value="Other">Other Nationality</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Identity Document Type for Permits *
                    </label>
                    <select
                      value={idType}
                      onChange={(e) => setIdType(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                    >
                      <option value="Voter ID">Voter ID (Election Card - Recommended)</option>
                      <option value="Passport">Passport</option>
                      <option value="Driving License">Driving License</option>
                      <option value="Aadhaar Card">Aadhaar Card (Only East/South, not accepted at Nathula/North)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Document Identification Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. WB/14/092/189201"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Arrival Pickup Location *
                    </label>
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 bg-white"
                    >
                      <option value="Bagdogra Airport (IXB)">Bagdogra Airport (IXB)</option>
                      <option value="Pakyong Airport (PYG)">Pakyong Airport (PYG - East Sikkim)</option>
                      <option value="New Jalpaiguri Railway (NJP)">New Jalpaiguri Railway Station (NJP)</option>
                      <option value="Siliguri City Hub">Siliguri City Hub</option>
                      <option value="Gangtok Hotel Pickup">Direct Pickup in Gangtok</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-700 block mb-1">
                      Emergency Contact (Name & Phone) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Debashis Mukherjee (+91 98300 55443)"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Special Requests or Dietary Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Vegetarian meals only, room on lower floor for senior travelers, Kanchenjunga sunrise view..."
                    value={specialDietOrNotes}
                    onChange={(e) => setSpecialDietOrNotes(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                  />
                </div>
              </div>

              {/* SECTION 3: Zero Online Payment Policy & Desk Verification */}
              <div className="bg-white p-6 sm:p-7 rounded-lg border border-stone-200 shadow-xs">
                <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-stone-100">
                  <div className="w-7 h-7 rounded-full bg-[#173D35] text-white flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <h2 className="font-editorial text-xl font-bold text-[#173D35]">
                      Travel Desk Verification & Direct Booking (Zero Online Payment)
                    </h2>
                    <p className="text-[11px] text-stone-500">
                      No payment is collected directly on this website. All bookings are verified by our Gangtok desk.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-md bg-[#F8F6F0] border border-[#173D35]/20 space-y-3 mb-5">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                      <span className="text-xs font-bold text-[#173D35] block">
                        Official Direct Reservation & Military Permit Clearance Protocol
                      </span>
                      <p className="text-[11px] text-stone-600 leading-relaxed">
                        To protect travelers from high-altitude weather closures, seasonal road status, and permit rejections, <strong>we do not accept or process direct payments on this website</strong>. Once you submit your itinerary request, our local Gangtok travel desk manually verifies:
                      </p>
                      <ul className="text-[11px] text-stone-600 space-y-1 pt-0.5 list-disc list-inside">
                        <li>Indian Army checkpost permit eligibility (RAP / PAP) for Nathu La & North Sikkim</li>
                        <li>High-altitude resort room inventory across Lachen, Lachung, Pelling & Gangtok</li>
                        <li>Dedicated 4WD mountain vehicle (Innova Crysta / Scorpio) allocation</li>
                      </ul>
                      <p className="text-[11px] text-emerald-800 font-semibold pt-1">
                        ✓ Free Reservation Request: You pay zero rupees online today. Our concierge will review your travel dates and dispatch an official verified itinerary directly via WhatsApp or email.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    required
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="mt-0.5 text-[#173D35] focus:ring-[#173D35] rounded"
                  />
                  <span>
                    I accept the{' '}
                    <a href="/terms-and-conditions" target="_blank" className="text-[#173D35] underline font-medium">
                      Terms of Service
                    </a>
                    , the{' '}
                    <a href="/cancellation-policy" target="_blank" className="text-[#173D35] underline font-medium">
                      Cancellation & Refund Policy (80% refund up to 15 days prior)
                    </a>
                    , and confirm that all travelers carry valid photo identification for Sikkim army checkposts.
                  </span>
                </label>
              </div>
            </div>

            {/* Right Column: Sticky Summary & Pricing Breakdown */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white p-6 rounded-lg border border-stone-200 shadow-md">
                <h3 className="font-editorial text-xl font-bold text-[#173D35] pb-3 mb-4 border-b border-stone-100">
                  Fare Summary & Inclusions
                </h3>

                {/* Promo Code Input */}
                <div className="mb-5">
                  <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block mb-1">
                    Promotional Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. HIMALAYA10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 text-xs p-2 rounded-sm border border-stone-300 font-mono focus:outline-hidden focus:border-[#173D35]"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      className="px-3 py-2 bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponFeedback && (
                    <p
                      className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                        appliedCoupon ? 'text-emerald-700 font-medium' : 'text-amber-700'
                      }`}
                    >
                      <Tag className="w-3 h-3" />
                      <span>{couponFeedback}</span>
                    </p>
                  )}
                </div>

                {/* Itemized Calculation */}
                <div className="space-y-2 text-xs text-stone-600 pb-4 mb-4 border-b border-stone-100">
                  <div className="flex justify-between">
                    <span>
                      Base Fare ({adultCount} Adults{childCount > 0 ? `, ${childCount} Children` : ''}):
                    </span>
                    <span className="font-mono">
                      ₹{pricing.baseAmountInr.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {pricing.vehicleUpgradeInr > 0 && (
                    <div className="flex justify-between">
                      <span>Vehicle Surcharge ({vehicleType}):</span>
                      <span className="font-mono">+₹{pricing.vehicleUpgradeInr.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {pricing.addOnsInr > 0 && (
                    <div className="flex justify-between">
                      <span>Curated Add-ons ({selectedAddOns.length}):</span>
                      <span className="font-mono">+₹{pricing.addOnsInr.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  {pricing.discountInr > 0 && (
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Promotional Discount ({appliedCoupon}):</span>
                      <span className="font-mono">-₹{pricing.discountInr.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-500 pt-1">
                    <span>Sikkim Tourism GST (5%):</span>
                    <span className="font-mono">+₹{pricing.taxGstInr.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="pb-5 mb-5 border-b border-stone-100">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase font-mono text-stone-500 font-bold">
                      Total Payable
                    </span>
                    <div className="text-right">
                      <span className="font-editorial text-3xl font-bold text-[#173D35]">
                        ₹{pricing.totalAmountInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-stone-400 block font-mono">
                        Approx. ${pricing.indicativeUsd.toLocaleString()} USD
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#C4A36A] hover:bg-[#DFC89E] disabled:bg-stone-300 text-[#173D35] font-semibold text-sm rounded-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-[#173D35] border-t-transparent rounded-full animate-spin" />
                      <span>Submitting Free Reservation Request...</span>
                    </div>
                  ) : (
                    <>
                      <span>Submit Booking Request (No Payment Required)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Trust guarantee bullets */}
                <div className="mt-5 space-y-2 text-[11px] text-stone-500">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Zero payment taken online today: 100% free booking request</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Protected Area Permits verified by local Gangtok desk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Direct concierge assistance on WhatsApp (+91 70018 46727)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
