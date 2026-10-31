import React, { useEffect, useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { BookingRecord } from '../utils/booking';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  Car,
  Hotel,
  ShieldCheck,
  Printer,
  Download,
  Share2,
  ExternalLink,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  ChevronRight,
  FileText,
} from 'lucide-react';

interface BookingConfirmationViewProps {
  bookingId: string;
}

export const BookingConfirmationView: React.FC<BookingConfirmationViewProps> = ({ bookingId }) => {
  const { navigate } = useRouter();
  const [booking, setBooking] = useState<BookingRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}`);
        const data = await res.json();
        if (data.success && data.booking) {
          setBooking(data.booking);
        }
      } catch (err) {
        console.error('Failed fetching booking details:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center pt-24 pb-20">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#173D35] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-editorial text-lg text-[#173D35]">Loading official booking voucher...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F8F6F0] pt-32 pb-20 px-4 text-center">
        <h2 className="font-editorial text-3xl font-bold text-[#173D35] mb-2">
          Booking Record Not Found
        </h2>
        <p className="text-xs text-stone-600 mb-6">
          Unable to locate booking reference <span className="font-mono font-bold">{bookingId}</span>.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  const isPaid = booking.paymentStatus === 'Paid';

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Status Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 mb-3 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-800 font-semibold block mb-1">
            {isPaid ? 'Payment Confirmed & Reservation Registered' : 'Proforma Reservation Registered'}
          </span>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#173D35] tracking-tight">
            Your Himalayan Journey is Booked!
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mt-1 leading-relaxed">
            Booking Reference:{' '}
            <span className="font-mono font-bold text-[#173D35] bg-stone-200/80 px-2 py-0.5 rounded">
              {booking.id}
            </span>
          </p>
        </div>

        {/* Action bar: Print / Share */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 no-print">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-semibold bg-[#173D35] text-white">
              Status: {booking.bookingStatus}
            </span>
            <span
              className={`px-2.5 py-1 rounded text-xs font-mono font-semibold ${
                isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}
            >
              Payment: {booking.paymentStatus}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#173D35]" />
              <span>Print Official Voucher / Invoice</span>
            </button>
            <button
              onClick={() => navigate('/packages')}
              className="px-3.5 py-2 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Tour Packages</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Printable Official Travel Voucher & Tax Invoice Card */}
        <div className="bg-white rounded-lg border border-stone-200/90 shadow-sm p-6 sm:p-10 mb-8 print:shadow-none print:border-none">
          {/* Voucher Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 mb-6 border-b border-stone-200">
            <div>
              <div className="flex items-center gap-2 text-xl font-editorial font-bold text-[#173D35] mb-1">
                <span>Sikkim Tour Co.</span>
              </div>
              <p className="text-[11px] text-stone-500 font-mono">
                Govt. of Sikkim Registered Himalayan Tour Operator & Mountain Specialists · Tagline: "Your Journey. Our Mountains."
              </p>
              <p className="text-[11px] text-stone-500">
                Paljor Stadium Road, Gangtok, Sikkim 737101 · GSTIN: 11AAACB8912C1ZZ
              </p>
              <p className="text-[11px] text-stone-500">
                Email: info@sikkimtourco.com · 24/7 Operations / WhatsApp: +91 70018 46727
              </p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block">
                Official Travel Voucher
              </span>
              <span className="font-editorial text-2xl font-bold text-[#173D35] block font-mono">
                {booking.id}
              </span>
              <span className="text-xs text-stone-500 block font-mono">
                Issued: {new Date(booking.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
              {booking.paymentDetails?.transactionId && (
                <span className="text-[11px] text-emerald-700 block font-mono">
                  Txn: {booking.paymentDetails.transactionId}
                </span>
              )}
            </div>
          </div>

          {/* Traveler & Logistics Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 mb-6 border-b border-stone-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono text-stone-400 font-semibold block mb-1">
                Lead Traveler Details
              </span>
              <p className="font-bold text-sm text-[#173D35] mb-0.5">
                {booking.primaryTraveler.fullName}
              </p>
              <p className="text-stone-600">Email: {booking.primaryTraveler.email}</p>
              <p className="text-stone-600">Phone: {booking.primaryTraveler.phone}</p>
              <p className="text-stone-600">
                Permit ID: {booking.primaryTraveler.idType} ({booking.primaryTraveler.idNumber})
              </p>
              <p className="text-stone-600">Pickup: {booking.primaryTraveler.pickupLocation}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-mono text-stone-400 font-semibold block mb-1">
                Expedition Itinerary Schedule
              </span>
              <p className="font-bold text-sm text-[#173D35] mb-0.5">
                {booking.itemTitle}
              </p>
              <p className="text-stone-600">
                Dates: {booking.travelStartDate} to {booking.travelEndDate} ({booking.durationDays} Days)
              </p>
              <p className="text-stone-600">
                Travelers: {booking.adultCount} Adults{booking.childCount > 0 ? `, ${booking.childCount} Children` : ''}
              </p>
              <p className="text-stone-600">Accommodation: {booking.accommodationCategory} Category</p>
              <p className="text-stone-600">Vehicle: {booking.vehicleType}</p>
            </div>
          </div>

          {/* Assigned Driver & Mountain Guide */}
          {booking.assignedGuide && (
            <div className="p-4 rounded-md bg-stone-50 border border-stone-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-stone-400 font-bold block mb-0.5">
                  Assigned Mountain Chauffeur & Vehicle Clearance
                </span>
                <p className="font-bold text-[#173D35]">{booking.assignedGuide.name}</p>
                <p className="text-stone-600">Contact: {booking.assignedGuide.phone}</p>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] uppercase font-mono text-stone-400 font-bold block mb-0.5">
                  Permitted Commercial Vehicle
                </span>
                <span className="font-mono font-bold text-xs bg-stone-200 px-2 py-1 rounded">
                  {booking.assignedGuide.vehicleNumber}
                </span>
              </div>
            </div>
          )}

          {/* Financial Breakdown Table */}
          <div className="mb-6">
            <span className="text-[10px] uppercase font-mono text-stone-400 font-semibold block mb-2">
              Fare Breakdown (Proforma Tax Invoice)
            </span>
            <div className="border border-stone-200 rounded-sm overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-mono">
                  <tr>
                    <th className="py-2.5 px-3">Service Description</th>
                    <th className="py-2.5 px-3 text-right">Tariff (INR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  <tr>
                    <td className="py-2 px-3">
                      {booking.itemTitle} ({booking.adultCount} Adults, {booking.accommodationCategory} Stay)
                    </td>
                    <td className="py-2 px-3 text-right font-mono">
                      ₹{booking.pricing.baseAmountInr.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  {booking.pricing.vehicleUpgradeInr > 0 && (
                    <tr>
                      <td className="py-2 px-3">
                        Vehicle Upgrade Surcharge ({booking.vehicleType})
                      </td>
                      <td className="py-2 px-3 text-right font-mono">
                        +₹{booking.pricing.vehicleUpgradeInr.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  )}
                  {booking.pricing.addOnsInr > 0 && (
                    <tr>
                      <td className="py-2 px-3">
                        Expedition Add-ons ({booking.addOns.map((a) => a.name).join(', ')})
                      </td>
                      <td className="py-2 px-3 text-right font-mono">
                        +₹{booking.pricing.addOnsInr.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  )}
                  {booking.pricing.discountInr > 0 && (
                    <tr className="text-emerald-700 font-medium">
                      <td className="py-2 px-3">
                        Promotional Code Discount ({booking.couponCode})
                      </td>
                      <td className="py-2 px-3 text-right font-mono">
                        -₹{booking.pricing.discountInr.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-stone-50/60 text-stone-500">
                    <td className="py-2 px-3">Subtotal Before Taxes</td>
                    <td className="py-2 px-3 text-right font-mono">
                      ₹{booking.pricing.subtotalInr.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="text-stone-500">
                    <td className="py-2 px-3">Sikkim Tourism GST (5%)</td>
                    <td className="py-2 px-3 text-right font-mono">
                      +₹{booking.pricing.taxGstInr.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-[#173D35]/5 font-bold text-sm text-[#173D35]">
                    <td className="py-2.5 px-3">Total Amount</td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      ₹{booking.pricing.totalAmountInr.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Traveler Advisories Checklist */}
          <div className="p-4 rounded-md bg-[#FBF9F4] border border-[#DFC89E]/40 text-xs text-stone-700 space-y-1.5 leading-relaxed">
            <span className="font-bold text-[#173D35] flex items-center gap-1.5 mb-1 text-sm font-editorial">
              <ShieldCheck className="w-4 h-4 text-[#C4A36A]" />
              Essential Sikkim Travel Checkpoints
            </span>
            <p>
              1. <strong>Inner Line Permits (ILP):</strong> Automatically initiated with the Gangtok Tourism Desk. Please carry 4 physical passport-sized photographs and your original identity card (Voter ID / Passport) for army checkpoints.
            </p>
            <p>
              2. <strong>High Elevation Acclimatization:</strong> If ascending to Gurudongmar (17,800 ft) or Nathu La (14,140 ft), maintain high hydration and avoid excessive alcohol on Day 1.
            </p>
            <p>
              3. <strong>Mountain Concierge:</strong> Your assigned driver will establish WhatsApp contact 24 hours prior to arrival for flight tracking and airport meeting.
            </p>
          </div>
        </div>

        {/* Next Steps Card */}
        <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-editorial text-lg font-bold text-[#173D35] mb-1">
              Have Questions or Need to Adjust Your Dates?
            </h3>
            <p className="text-xs text-stone-600">
              Our Gangtok travel concierge desk is available 24/7 on WhatsApp for custom requests.
            </p>
          </div>
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => {
                const message = `Hello Sikkim Tour Co. team, I have confirmed booking ${booking.id} (${booking.itemTitle}) and would like to connect with my travel coordinator.`;
                window.open(`https://wa.me/917001846727?text=${encodeURIComponent(message)}`, '_blank');
              }}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </button>
            <a
              href="tel:+917001846727"
              className="px-4 py-2 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] text-xs font-bold rounded-sm transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 fill-[#103D35]" />
              <span>Call Us</span>
            </a>
            <button
              onClick={() => navigate('/destinations')}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-sm transition-colors"
            >
              Explore Sikkim Guides
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
