import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { accommodationsData, Accommodation, RoomType } from '../data/accommodations';
import {
  Hotel,
  MapPin,
  Star,
  ShieldCheck,
  Calendar,
  Sparkles,
  Wifi,
  Flame,
  UtensilsCrossed,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Users,
  Bed,
  Check,
  Share2,
} from 'lucide-react';

interface AccommodationDetailViewProps {
  slug: string;
}

export const AccommodationDetailView: React.FC<AccommodationDetailViewProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const stay = accommodationsData.find((s) => s.slug === slug) || accommodationsData[0];

  const [selectedRoom, setSelectedRoom] = useState<RoomType>(stay.roomTypes[0] || stay.roomTypes[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Booking sidebar state
  const tomorrow = new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0];
  const departureDate = new Date(Date.now() + 86400000 * 17).toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(departureDate);
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(d2.getTime() - d1.getTime(), 86400000);
  const nightsCount = Math.round(diffTime / (1000 * 60 * 60 * 24));

  const roomSubtotal = selectedRoom.pricePerNightInr * nightsCount;
  const gstTax = Math.round(roomSubtotal * 0.05);
  const grandTotal = roomSubtotal + gstTax;

  const handleBookNow = () => {
    // Navigate to checkout with query params prefilled
    const params = new URLSearchParams({
      type: 'accommodation',
      id: stay.id,
      slug: stay.slug,
      title: `${stay.name} (${selectedRoom.name})`,
      startDate: checkIn,
      endDate: checkOut,
      adults: adultCount.toString(),
      children: childCount.toString(),
      basePrice: selectedRoom.pricePerNightInr.toString(),
      durationDays: nightsCount.toString(),
    });
    navigate(`/checkout?${params.toString()}`);
  };

  const allImages = [stay.heroImage, ...stay.galleryImages];

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button
          onClick={() => navigate('/stays')}
          className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-[#173D35] mb-4 font-medium transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Accommodations</span>
        </button>

        {/* Title & Location Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold uppercase bg-[#173D35]/10 text-[#173D35]">
                {stay.district}
              </span>
              <span className="px-2.5 py-0.5 rounded-sm text-xs font-mono uppercase bg-stone-200 text-stone-700">
                {stay.propertyType}
              </span>
              <span className="flex items-center gap-1 text-xs text-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Heritage Stay
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#173D35] tracking-tight">
              {stay.name}
            </h1>
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-600 mt-1 font-mono">
              <MapPin className="w-4 h-4 text-[#C4A36A]" />
              <span>{stay.location}</span>
              <span>· Elevation: {stay.elevationFt.toLocaleString()} ft</span>
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-sm font-semibold text-stone-900">
                <Star className="w-4 h-4 fill-[#C4A36A] text-[#C4A36A]" />
                <span className="text-base">{stay.rating}</span>
                <span className="text-stone-400 font-normal">({stay.reviewCount} verified reviews)</span>
              </div>
              <span className="text-[11px] text-stone-500 font-mono">Audited Himalayan Partner</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-3 rounded-lg overflow-hidden border border-stone-200 shadow-sm bg-stone-100">
          <div className="md:col-span-2 h-[340px] sm:h-[420px] relative">
            <img
              src={allImages[activeImageIndex] || stay.heroImage}
              alt={stay.name}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="flex md:flex-col gap-3 p-3 overflow-x-auto md:overflow-visible">
            {allImages.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative flex-1 min-w-[120px] h-24 md:h-auto rounded-sm overflow-hidden border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#C4A36A] ring-2 ring-[#C4A36A]/30' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Layout: Details + Sticky Booking Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column: Story, Highlights, Amenities, Rooms */}
          <div className="lg:col-span-2 space-y-10">
            {/* Overview & Backstory */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35] mb-3">
                About the Sanctuary
              </h2>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light mb-6">
                {stay.overview}
              </p>

              {/* Highlights */}
              <h3 className="text-xs uppercase font-mono tracking-wider font-semibold text-stone-500 mb-3">
                Signature Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stay.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                    <Sparkles className="w-3.5 h-3.5 text-[#C4A36A] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Categories */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35] mb-4">
                Available Room Categories
              </h2>

              <div className="space-y-4">
                {stay.roomTypes.map((room) => {
                  const isSelected = selectedRoom.id === room.id;
                  return (
                    <div
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`p-5 rounded-md border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C4A36A] ring-2 ring-[#C4A36A]/20 bg-[#FBF9F4]'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="roomSelection"
                            checked={isSelected}
                            onChange={() => setSelectedRoom(room)}
                            className="text-[#173D35] focus:ring-[#173D35]"
                          />
                          <h3 className="font-editorial text-xl font-bold text-[#173D35]">
                            {room.name}
                          </h3>
                        </div>
                        <div className="flex items-baseline gap-1 text-right">
                          <span className="font-editorial text-xl font-bold text-[#173D35]">
                            ₹{room.pricePerNightInr.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-stone-500">/ night</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 mb-3 pl-6">
                        {room.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pl-6 mb-3">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          <span>{room.capacity}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5 text-stone-400" />
                          <span>{room.bedType}</span>
                        </span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap items-center gap-1.5 pl-6">
                        {room.features.map((f, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] bg-stone-100 text-stone-600 border border-stone-200"
                          >
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comprehensive Amenities */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35] mb-4">
                Property Amenities & Services
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stay.amenities.map((am, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-sm bg-stone-50 border border-stone-150 flex items-center gap-2 text-xs text-stone-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#527568] shrink-0" />
                    <span>{am}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35] mb-4">
                Verified Policies & Check-in Rules
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
                <div>
                  <span className="font-semibold text-[#173D35] block mb-1">Check-in / Check-out</span>
                  <p>Check-in: {stay.policies.checkIn} · Check-out: {stay.policies.checkOut}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#173D35] block mb-1">Cancellation Policy</span>
                  <p>{stay.policies.cancellation}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#173D35] block mb-1">Child Policy</span>
                  <p>{stay.policies.childPolicy}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#173D35] block mb-1">Pets</span>
                  <p>{stay.policies.pets}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white p-6 rounded-lg border border-stone-200 shadow-md">
              <div className="flex items-baseline justify-between pb-4 mb-4 border-b border-stone-100">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase font-mono block">Selected Room</span>
                  <span className="font-editorial text-lg font-bold text-[#173D35]">
                    {selectedRoom.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-editorial text-2xl font-bold text-[#173D35]">
                    ₹{selectedRoom.pricePerNightInr.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-stone-500 block">/ night</span>
                </div>
              </div>

              {/* Date pickers */}
              <div className="space-y-3 mb-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full text-xs p-2 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full text-xs p-2 rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block mb-1">
                      Adults
                    </label>
                    <select
                      value={adultCount}
                      onChange={(e) => setAdultCount(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-sm border border-stone-300 bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Adult' : 'Adults'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-mono text-stone-500 font-semibold block mb-1">
                      Children
                    </label>
                    <select
                      value={childCount}
                      onChange={(e) => setChildCount(Number(e.target.value))}
                      className="w-full text-xs p-2 rounded-sm border border-stone-300 bg-white"
                    >
                      {[0, 1, 2, 3].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Child' : 'Children'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="p-3 bg-stone-50 rounded-sm space-y-1.5 text-xs text-stone-600 mb-5 border border-stone-150">
                <div className="flex justify-between">
                  <span>
                    ₹{selectedRoom.pricePerNightInr.toLocaleString('en-IN')} × {nightsCount} nights:
                  </span>
                  <span>₹{roomSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Sikkim Tourism GST (5%):</span>
                  <span>₹{gstTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex justify-between font-bold text-sm text-[#173D35]">
                  <span>Total Payable:</span>
                  <span>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleBookNow}
                className="w-full py-3 bg-[#173D35] hover:bg-[#0F2A24] text-white font-semibold text-xs sm:text-sm rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xs mb-2.5 cursor-pointer"
              >
                <span>Reserve Room Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const message = `Hello Sikkim Tour Co. team, I would like to inquire about booking ${stay.name} (${selectedRoom.name}) from ${checkIn} to ${checkOut} for ${adultCount} adults.`;
                  window.open(`https://wa.me/919733022334?text=${encodeURIComponent(message)}`, '_blank');
                }}
                className="w-full py-2.5 bg-white hover:bg-stone-50 text-[#173D35] font-semibold text-xs rounded-sm border border-stone-300 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Inquire via WhatsApp Desk</span>
              </button>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-center gap-2 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant reservation voucher & secure processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
