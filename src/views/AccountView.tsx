import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { BookingRecord } from '../utils/booking';
import { tourPackagesData } from '../data/packages';
import { destinationsData } from '../data/destinations';
import { AiItineraryResult } from '../utils/aiPlanner';
import {
  User,
  Users,
  Calendar,
  MapPin,
  Car,
  Hotel,
  ShieldCheck,
  FileText,
  LogOut,
  Sparkles,
  Bookmark,
  ChevronRight,
  ExternalLink,
  CreditCard,
  AlertCircle,
  Clock,
  Compass,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export const AccountView: React.FC = () => {
  const { navigate } = useRouter();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved' | 'itineraries' | 'profile'>('bookings');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [savedItineraries, setSavedItineraries] = useState<AiItineraryResult[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [cancelModalBooking, setCancelModalBooking] = useState<BookingRecord | null>(null);
  const [cancelReason, setCancelReason] = useState('Change of travel dates');
  const [isCancelling, setIsCancelling] = useState(false);

  // Fetch bookings
  const loadBookings = async () => {
    try {
      setIsLoadingBookings(true);
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (data.success && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed fetching user bookings:', err);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  useEffect(() => {
    loadBookings();

    // Load saved itineraries
    try {
      const stored = localStorage.getItem('bk_saved_itineraries');
      if (stored) {
        setSavedItineraries(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed reading saved itineraries', e);
    }
  }, []);

  const handleCancelBooking = async () => {
    if (!cancelModalBooking) return;
    setIsCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${cancelModalBooking.id}/cancel`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: cancelReason }),
      });
      const data = await res.json();
      if (data.success) {
        await loadBookings();
        setCancelModalBooking(null);
      }
    } catch (err) {
      console.error('Failed cancelling booking', err);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleSimulatePayment = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod: 'card' }),
      });
      const data = await res.json();
      if (data.success) {
        await loadBookings();
      }
    } catch (err) {
      console.error('Failed processing payment', err);
    }
  };

  // Saved packages (if user logged in, or fallback to flagship)
  const savedPackages = user ? tourPackagesData.filter((p) => user.savedPackageSlugs.includes(p.slug)) : tourPackagesData.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Traveler Profile Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#0b1e17] text-[#c59b27] flex items-center justify-center font-serif text-2xl font-bold border-2 border-[#c59b27]/60">
              {user ? user.name.charAt(0) : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D35]">
                  {user ? user.name : 'Sikkim Tour Co. Traveler Desk'}
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider font-semibold bg-emerald-100 text-emerald-800">
                  {user ? (user.role === 'admin' ? 'Operations Admin' : 'Verified Traveler') : 'No Login Needed'}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-mono">
                {user ? `${user.email} · ${user.phone}` : 'Track your official travel vouchers, invoices, and guide assignments directly.'}
              </p>
            </div>
          </div>

          {/* Quick Direct Actions on Traveler Card */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://wa.me/919733022334?text=Hi%20Sikkim%20Tour%20Co.,%20I%20have%20an%20inquiry%20regarding%20my%20booking."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-sm"
            >
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href="mailto:info@sikkimtourcompany.com?subject=Booking Inquiry - Sikkim Tour Co."
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg border border-stone-300 flex items-center gap-1.5"
            >
              <span>Email Support</span>
            </a>
            {isAdmin && (
              <button
                onClick={() => navigate('/admin')}
                className="px-3.5 py-2 bg-[#173D35] hover:bg-[#0F2A24] text-[#c59b27] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Operations Desk</span>
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-stone-200"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-300 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'bookings'
                ? 'border-[#173D35] text-[#173D35]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            My Expeditions & Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'saved'
                ? 'border-[#173D35] text-[#173D35]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Saved Tours & Wishlist ({savedPackages.length})
          </button>
          <button
            onClick={() => setActiveTab('itineraries')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'itineraries'
                ? 'border-[#173D35] text-[#173D35]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Saved Custom AI Itineraries ({savedItineraries.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
              activeTab === 'profile'
                ? 'border-[#173D35] text-[#173D35]'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            Permit Identification & Profile
          </button>
        </div>

        {/* TAB 1: Bookings */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {isLoadingBookings ? (
              <div className="p-12 text-center bg-white rounded-lg border border-stone-200">
                <div className="w-8 h-8 border-2 border-[#173D35] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                <p className="text-xs text-stone-500 font-mono">Syncing confirmed bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-stone-200">
                <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-editorial text-2xl font-bold text-stone-700 mb-1">
                  No Active Bookings Yet
                </h3>
                <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
                  Explore our curated Himalayan expeditions or design a bespoke custom itinerary with our travel desk.
                </p>
                <button
                  onClick={() => navigate('/packages')}
                  className="px-5 py-2.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm"
                >
                  Explore Tour Packages
                </button>
              </div>
            ) : (
              bookings.map((b) => {
                const isPaid = b.paymentStatus === 'Paid';
                const isCancelled = b.bookingStatus === 'Cancelled';
                return (
                  <div
                    key={b.id}
                    className="bg-white rounded-lg border border-stone-200/90 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#173D35] bg-stone-100 px-2 py-0.5 rounded">
                          {b.id}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                            b.bookingStatus === 'Confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : b.bookingStatus === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          Status: {b.bookingStatus}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
                            isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          Payment: {b.paymentStatus}
                        </span>
                      </div>

                      <h3 className="font-editorial text-xl font-bold text-[#173D35]">
                        {b.itemTitle}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          <span>
                            {b.travelStartDate} to {b.travelEndDate} ({b.durationDays} Days)
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-stone-400" />
                          <span>{b.adultCount} Adults{b.childCount > 0 ? `, ${b.childCount} Children` : ''}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Car className="w-3.5 h-3.5 text-stone-400" />
                          <span>{b.vehicleType}</span>
                        </span>
                      </div>

                      {/* Chauffeur assignment note */}
                      {b.assignedGuide && (
                        <div className="text-[11px] text-[#527568] bg-stone-50 p-2 rounded border border-stone-200 inline-block">
                          Assigned Chauffeur: <strong>{b.assignedGuide.name}</strong> ({b.assignedGuide.vehicleNumber})
                        </div>
                      )}
                    </div>

                    {/* Financial summary & Action buttons */}
                    <div className="flex flex-col sm:items-end justify-between gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
                      <div className="sm:text-right">
                        <span className="text-[10px] uppercase font-mono text-stone-400 block">Total Fare</span>
                        <span className="font-editorial text-2xl font-bold text-[#173D35]">
                          ₹{b.pricing.totalAmountInr.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => navigate(`/booking-confirmation/${b.id}`)}
                          className="px-3.5 py-1.5 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Voucher / Invoice</span>
                        </button>

                        {!isPaid && !isCancelled && (
                          <button
                            onClick={() => handleSimulatePayment(b.id)}
                            className="px-3.5 py-1.5 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                          >
                            Pay Online
                          </button>
                        )}

                        {!isCancelled && (
                          <button
                            onClick={() => setCancelModalBooking(b)}
                            className="px-3 py-1.5 bg-stone-100 hover:bg-red-50 hover:text-red-700 text-stone-600 text-xs font-medium rounded-sm transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: Saved Tours */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            {savedPackages.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-stone-200">
                <Bookmark className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-editorial text-2xl font-bold text-stone-700 mb-1">
                  Your Wishlist is Empty
                </h3>
                <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
                  Save tour packages by clicking the bookmark icon on any expedition page.
                </p>
                <button
                  onClick={() => navigate('/packages')}
                  className="px-5 py-2.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm"
                >
                  Browse Tour Packages
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedPackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 block mb-1">
                        {pkg.duration} · {pkg.districtsCovered.join(', ')}
                      </span>
                      <h3 className="font-editorial text-xl font-bold text-[#173D35] mb-2">
                        {pkg.name}
                      </h3>
                      <p className="text-xs text-stone-600 line-clamp-2 mb-4">
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                      <div>
                        <span className="font-editorial text-xl font-bold text-[#173D35]">
                          ₹{pkg.startingPriceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-stone-500"> / person</span>
                      </div>
                      <button
                        onClick={() => navigate(`/packages/${pkg.slug}`)}
                        className="px-3.5 py-1.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm hover:bg-[#0F2A24]"
                      >
                        View Itinerary
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Saved AI Itineraries */}
        {activeTab === 'itineraries' && (
          <div className="space-y-6">
            {savedItineraries.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-lg border border-stone-200">
                <Sparkles className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-editorial text-2xl font-bold text-stone-700 mb-1">
                  No Saved AI Plans Yet
                </h3>
                <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
                  Use our AI Travel Planner to generate and save custom day-by-day itineraries.
                </p>
                <button
                  onClick={() => navigate('/ai-planner')}
                  className="px-5 py-2.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm"
                >
                  Open AI Travel Planner
                </button>
              </div>
            ) : (
              savedItineraries.map((itn) => (
                <div
                  key={itn.id}
                  className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-[#527568]">{itn.id}</span>
                      <span className="text-xs text-stone-400 font-mono">
                        Saved: {new Date(itn.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#173D35]">
                      {itn.tripTitle}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5">
                      {itn.days.length} Days · {itn.destinationsCovered.join(' → ')}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono text-stone-400 block">Est. Budget</span>
                      <span className="font-editorial text-xl font-bold text-[#173D35]">
                        ₹{itn.totalEstimatedCostInr.toLocaleString('en-IN')}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        const params = new URLSearchParams({
                          type: 'custom_itinerary',
                          id: itn.id,
                          slug: itn.matchingPackageSlug || 'grand-sikkim-odyssey-2-weeks',
                          title: itn.tripTitle,
                          basePrice: Math.round(itn.totalEstimatedCostInr / 2).toString(),
                          durationDays: itn.days.length.toString(),
                        });
                        navigate(`/checkout?${params.toString()}`);
                      }}
                      className="px-4 py-2 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] text-xs font-semibold rounded-sm"
                    >
                      Book Plan
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 4: Profile & Identification */}
        {activeTab === 'profile' && (
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs max-w-2xl">
            <h2 className="font-editorial text-2xl font-bold text-[#173D35] mb-4">
              Sikkim Permit Profile & Security Verification
            </h2>
            <div className="space-y-4 text-xs text-stone-700">
              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="text-stone-400 uppercase font-mono text-[10px] block">Full Legal Name</span>
                  <p className="font-semibold text-sm text-[#173D35]">{user?.name || 'Guest Traveler'}</p>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-mono text-[10px] block">Account Role</span>
                  <p className="font-semibold text-sm text-emerald-800 capitalize">{user?.role || 'Guest (No Login Required)'}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pb-4 border-b border-stone-100">
                <div>
                  <span className="text-stone-400 uppercase font-mono text-[10px] block">Email</span>
                  <p className="font-semibold">{user?.email || 'N/A (WhatsApp / Direct Booking)'}</p>
                </div>
                <div>
                  <span className="text-stone-400 uppercase font-mono text-[10px] block">Phone / WhatsApp</span>
                  <p className="font-semibold">{user?.phone || '+91 97330 22334 (Concierge)'}</p>
                </div>
              </div>

              <div className="p-4 rounded-md bg-stone-50 border border-stone-200 text-stone-600 text-[11px] leading-relaxed">
                <span className="font-bold text-[#173D35] block mb-1">Inner Line Permit Document Guidelines:</span>
                Indian citizens visiting Nathula Pass, Tsomgo Lake, Lachung, and Gurudongmar require physical Voter IDs or Passports. Military checkposts do not accept digital Aadhaar or PAN cards.
              </div>
            </div>
          </div>
        )}

        {/* Cancellation Modal */}
        {cancelModalBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white max-w-md w-full p-6 rounded-lg border border-stone-200 shadow-xl">
              <h3 className="font-editorial text-2xl font-bold text-[#173D35] mb-2">
                Cancel Booking {cancelModalBooking.id}?
              </h3>
              <p className="text-xs text-stone-600 mb-4 leading-relaxed">
                According to our transparent cancellation policy, cancellations requested up to 15 days prior are eligible for an <strong>80% refund</strong> (₹{Math.round(cancelModalBooking.pricing.totalAmountInr * 0.8).toLocaleString('en-IN')}).
              </p>

              <div className="mb-4">
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Reason for Cancellation
                </label>
                <select
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full text-xs p-2 rounded-sm border border-stone-300 bg-white"
                >
                  <option value="Change of travel dates">Change of travel dates</option>
                  <option value="Medical emergency">Medical emergency</option>
                  <option value="Flight rescheduling">Flight rescheduling</option>
                  <option value="Other">Other personal reason</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setCancelModalBooking(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-sm"
                >
                  Keep Booking
                </button>
                <button
                  type="button"
                  disabled={isCancelling}
                  onClick={handleCancelBooking}
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white text-xs font-semibold rounded-sm flex items-center gap-1.5"
                >
                  {isCancelling ? 'Processing...' : 'Confirm Cancellation'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
