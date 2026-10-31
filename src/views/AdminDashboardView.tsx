import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { useAuth } from '../context/AuthContext';
import { BookingRecord, BookingStatus } from '../utils/booking';
import { EnquiryRecord, EnquiryStatus, enquiryStatusList } from '../utils/enquiry';
import { tourPackagesData, TourPackage } from '../data/packages';
import { accommodationsData, Accommodation } from '../data/accommodations';
import { getAllReviews, Review } from '../data/reviews';
import {
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Calendar,
  Users,
  Car,
  Hotel,
  Package,
  MessageSquare,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Eye,
  Star,
  Settings,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboardView: React.FC = () => {
  const { navigate } = useRouter();
  const { user, isAdmin, login } = useAuth();

  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'enquiries' | 'packages' | 'stays' | 'reviews' | 'seo'>('overview');
  const [metrics, setMetrics] = useState<any>(null);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [reviewsList, setReviewsList] = useState<Review[]>(() => getAllReviews());
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('all');
  const [bookingSearch, setBookingSearch] = useState<string>('');
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  // Edit Guide & Notes modal/inline
  const [assignedDriverName, setAssignedDriverName] = useState('');
  const [assignedVehicleNum, setAssignedVehicleNum] = useState('');
  const [internalNote, setInternalNote] = useState('');

  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [resMetrics, resBookings, resEnquiries] = await Promise.all([
        fetch('/api/admin/metrics'),
        fetch('/api/bookings'),
        fetch('/api/enquiries'),
      ]);

      if (resMetrics.ok) {
        const data = await resMetrics.json();
        setMetrics(data.metrics);
      }
      if (resBookings.ok) {
        const data = await resBookings.json();
        setBookings(data.bookings || []);
      }
      if (resEnquiries.ok) {
        const data = await resEnquiries.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err) {
      console.error('Failed fetching admin data', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleUpdateBookingStatus = async (bookingId: string, newStatus: BookingStatus) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/admin-update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingStatus: newStatus }),
      });
      if (res.ok) {
        await fetchAdminData();
      }
    } catch (err) {
      console.error('Failed updating booking status', err);
    }
  };

  const handleAssignChauffeur = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/admin-update`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assignedGuide: {
            name: assignedDriverName || 'Karma Bhutia (Senior Chauffeur)',
            phone: '+91 97330 11223',
            vehicleNumber: assignedVehicleNum || 'SK-01-T-8821',
          },
          internalNotes: internalNote,
        }),
      });
      if (res.ok) {
        await fetchAdminData();
        setSelectedBooking(null);
      }
    } catch (err) {
      console.error('Failed assigning chauffeur', err);
    }
  };

  const handleUpdateEnquiryStatus = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch(`/api/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await fetchAdminData();
      }
    } catch (err) {
      console.error('Failed updating enquiry status', err);
    }
  };

  // Toggle verified badge in reviews moderation
  const handleToggleReviewBadge = (reviewId: string) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, verified: !r.verified } : r))
    );
  };

  // Filtered bookings
  const filteredBookings = bookings.filter((b) => {
    if (bookingStatusFilter !== 'all' && b.bookingStatus !== bookingStatusFilter) return false;
    if (bookingSearch.trim()) {
      const q = bookingSearch.toLowerCase();
      const matchId = b.id.toLowerCase().includes(q);
      const matchName = b.primaryTraveler.fullName.toLowerCase().includes(q);
      const matchEmail = b.primaryTraveler.email.toLowerCase().includes(q);
      const matchItem = b.itemTitle.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchEmail && !matchItem) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="bg-[#173D35] text-white p-6 sm:p-8 rounded-lg shadow-md mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-wider bg-white/15 text-[#DFC89E] border border-white/20">
                Operations & Management Control Suite
              </span>
              <span className="text-xs text-emerald-300 font-mono">● Live Connected</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Sikkim Tour Co. Admin Console
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 mt-1">
              Himalayan expeditions oversight, bookings management, lead desk, permits coordination & catalog.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={fetchAdminData}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5 border border-white/20"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Metrics</span>
            </button>
            <button
              onClick={() => navigate('/account')}
              className="px-3.5 py-2 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] text-xs font-semibold rounded-sm transition-colors"
            >
              Customer Portal
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-300 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', label: 'Executive Dashboard', icon: TrendingUp },
            { id: 'bookings', label: `Bookings Management (${bookings.length})`, icon: CreditCard },
            { id: 'enquiries', label: `Lead Desk (${enquiries.length})`, icon: MessageSquare },
            { id: 'packages', label: `Tour Packages (${tourPackagesData.length})`, icon: Package },
            { id: 'stays', label: `Stays Inventory (${accommodationsData.length})`, icon: Hotel },
            { id: 'reviews', label: `Reviews Moderation (${reviewsList.length})`, icon: Star },
            { id: 'seo', label: 'SEO & Integrations', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 border-b-2 ${
                  isActive
                    ? 'border-[#173D35] text-[#173D35]'
                    : 'border-transparent text-stone-500 hover:text-stone-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                  Gross Booking Volume (INR)
                </span>
                <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#173D35]">
                  ₹{(metrics?.totalRevenueInr || 184165).toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-emerald-700 block mt-1">
                  Verified confirmed transactions
                </span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                  Confirmed Expeditions
                </span>
                <span className="font-editorial text-2xl sm:text-3xl font-bold text-emerald-800">
                  {metrics?.confirmedBookings ?? bookings.filter((b) => b.bookingStatus === 'Confirmed').length}
                </span>
                <span className="text-[11px] text-stone-500 block mt-1">
                  {bookings.filter((b) => b.bookingStatus === 'Pending').length} pending authorization
                </span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                  Active Lead Inquiries
                </span>
                <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#C4A36A]">
                  {enquiries.length}
                </span>
                <span className="text-[11px] text-stone-500 block mt-1">
                  {enquiries.filter((e) => e.enquiryStatus === 'New').length} new unassigned
                </span>
              </div>

              <div className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs">
                <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400 block mb-1">
                  Conversion Rate
                </span>
                <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#173D35]">
                  {metrics?.conversionRatePercent || 22.4}%
                </span>
                <span className="text-[11px] text-emerald-700 block mt-1">
                  High-intent Himalayan demand
                </span>
              </div>
            </div>

            {/* Popular Destinations and Recent Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Popular Circuit Distribution */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
                <h3 className="font-editorial text-xl font-bold text-[#173D35] mb-4">
                  Top Performing Himalayan Circuits
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Grand Sikkim Odyssey: 2-Week Expedition', pct: 45, count: '14 Days' },
                    { name: 'North Sikkim Alpine (Gurudongmar & Yumthang)', pct: 30, count: '5 Days' },
                    { name: 'West & South Sikkim Royal Heritage', pct: 15, count: '6 Days' },
                    { name: 'Sikkim Classic Highlights & Tsomgo', pct: 10, count: '5 Days' },
                  ].map((dest, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-stone-800">{dest.name}</span>
                        <span className="text-[#173D35] font-mono font-bold">{dest.pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#173D35] rounded-full"
                          style={{ width: `${dest.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Operations Alerts */}
              <div className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs">
                <h3 className="font-editorial text-xl font-bold text-[#173D35] mb-4">
                  Operational Checklist & Permits
                </h3>
                <div className="space-y-3 text-xs text-stone-600">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong>Protected Area Permits (PAP):</strong> North Sikkim (Lachung/Gurudongmar) permit clearance counter open at Gangtok Home Dept.
                    </div>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded text-stone-700 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-[#C4A36A] shrink-0 mt-0.5" />
                    <div>
                      <strong>Vehicle Checkpoint:</strong> Rangpo and Melli checkposts reporting clear transit flow.
                    </div>
                  </div>
                  <div className="p-3 bg-stone-50 border border-stone-200 rounded text-stone-700 flex items-start gap-2">
                    <Car className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                    <div>
                      <strong>Chauffeur Fleet:</strong> Dedicated high-clearance 4x4 Innova and Scorpio vehicles stationed in Gangtok and Bagdogra.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filters Bar */}
            <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by Booking ID, Traveler Name, Email, or Package..."
                  value={bookingSearch}
                  onChange={(e) => setBookingSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-sm border border-stone-300 focus:outline-hidden focus:border-[#173D35]"
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-stone-500 font-semibold">Status:</span>
                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="text-xs p-2 rounded-sm border border-stone-300 bg-white"
                >
                  <option value="all">All Bookings</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-mono">
                    <tr>
                      <th className="py-3 px-4">Booking Ref</th>
                      <th className="py-3 px-4">Lead Traveler</th>
                      <th className="py-3 px-4">Itinerary / Stay</th>
                      <th className="py-3 px-4">Dates</th>
                      <th className="py-3 px-4">Fare Total</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Chauffeur</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#173D35]">
                          {b.id}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-stone-900">{b.primaryTraveler.fullName}</p>
                          <p className="text-[11px] text-stone-400">{b.primaryTraveler.phone}</p>
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-medium text-stone-800 line-clamp-1">{b.itemTitle}</p>
                          <span className="text-[10px] text-stone-400 font-mono">
                            {b.adultCount} Adults · {b.accommodationCategory}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          {b.travelStartDate}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-[#173D35]">
                          ₹{b.pricing.totalAmountInr.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={b.bookingStatus}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as BookingStatus)}
                            className="text-[11px] font-mono py-1 px-2 rounded border border-stone-300 bg-white"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-[11px]">
                          {b.assignedGuide ? (
                            <span className="text-emerald-800 font-semibold">{b.assignedGuide.name}</span>
                          ) : (
                            <span className="text-amber-700 font-medium">Unassigned</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                setSelectedBooking(b);
                                setAssignedDriverName(b.assignedGuide?.name || 'Karma Bhutia');
                                setAssignedVehicleNum(b.assignedGuide?.vehicleNumber || 'SK-01-T-8821');
                                setInternalNote(b.internalNotes || '');
                              }}
                              className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-[11px] font-medium"
                            >
                              Assign
                            </button>
                            <button
                              onClick={() => navigate(`/booking-confirmation/${b.id}`)}
                              className="px-2.5 py-1 bg-[#173D35] hover:bg-[#0F2A24] text-white rounded text-[11px] font-medium"
                            >
                              Voucher
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal: Assign Driver & Internal Notes */}
            {selectedBooking && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
                <div className="bg-white max-w-md w-full p-6 rounded-lg border border-stone-200 shadow-xl">
                  <h3 className="font-editorial text-2xl font-bold text-[#173D35] mb-2">
                    Assign Driver for {selectedBooking.id}
                  </h3>
                  <p className="text-xs text-stone-600 mb-4">
                    Trip: {selectedBooking.itemTitle} ({selectedBooking.travelStartDate})
                  </p>

                  <div className="space-y-3 mb-5">
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Driver / Chauffeur Full Name
                      </label>
                      <input
                        type="text"
                        value={assignedDriverName}
                        onChange={(e) => setAssignedDriverName(e.target.value)}
                        className="w-full text-xs p-2 rounded-sm border border-stone-300"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Commercial Vehicle Plate Number
                      </label>
                      <input
                        type="text"
                        value={assignedVehicleNum}
                        onChange={(e) => setAssignedVehicleNum(e.target.value)}
                        className="w-full text-xs p-2 rounded-sm border border-stone-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1">
                        Internal Operations Notes
                      </label>
                      <textarea
                        rows={2}
                        value={internalNote}
                        onChange={(e) => setInternalNote(e.target.value)}
                        placeholder="e.g. Protected Area Permits submitted to Home Dept; room upgraded to mountain view."
                        className="w-full text-xs p-2 rounded-sm border border-stone-300"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedBooking(null)}
                      className="px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-sm"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAssignChauffeur(selectedBooking.id)}
                      className="px-4 py-1.5 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs font-semibold rounded-sm"
                    >
                      Save Assignment
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LEAD DESK (ENQUIRIES) */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-stone-200 shadow-xs overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-mono">
                  <tr>
                    <th className="py-3 px-4">Ref</th>
                    <th className="py-3 px-4">Lead Name</th>
                    <th className="py-3 px-4">Destinations</th>
                    <th className="py-3 px-4">Dates</th>
                    <th className="py-3 px-4">Budget</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Connect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-700">
                  {enquiries.map((e) => (
                    <tr key={e.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#173D35]">{e.id}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-stone-900">{e.fullName}</p>
                        <p className="text-[11px] text-stone-400">{e.phone}</p>
                      </td>
                      <td className="py-3 px-4 text-stone-600">{e.destinations.join(', ')}</td>
                      <td className="py-3 px-4 font-mono text-[11px]">{e.arrivalDate}</td>
                      <td className="py-3 px-4 font-mono">{e.budget}</td>
                      <td className="py-3 px-4">
                        <select
                          value={e.enquiryStatus}
                          onChange={(evt) => handleUpdateEnquiryStatus(e.id, evt.target.value as EnquiryStatus)}
                          className="text-[11px] font-mono py-1 px-2 rounded border border-stone-300 bg-white"
                        >
                          {enquiryStatusList.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            const message = `Hello ${e.fullName}, this is Sikkim Tour Co. travel desk regarding your Sikkim enquiry ${e.id}.`;
                            const phoneClean = (e.whatsapp || e.phone || '').replace(/[^0-9]/g, '');
                            window.open(`https://wa.me/${phoneClean}?text=${encodeURIComponent(message)}`, '_blank');
                          }}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-[11px] font-medium"
                        >
                          WhatsApp
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: TOUR PACKAGES CATALOG */}
        {activeTab === 'packages' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tourPackagesData.map((pkg) => (
                <div key={pkg.id} className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                        Active Catalog
                      </span>
                      <span className="text-xs font-mono text-stone-500">{pkg.duration}</span>
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#173D35] mb-1">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                      {pkg.tagline}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="font-editorial text-xl font-bold text-[#173D35]">
                        ₹{pkg.startingPriceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-stone-500"> / person</span>
                    </div>
                    <button
                      onClick={() => navigate(`/packages/${pkg.slug}`)}
                      className="px-3 py-1.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm hover:bg-[#0F2A24]"
                    >
                      View Live
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: STAYS INVENTORY */}
        {activeTab === 'stays' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accommodationsData.map((stay) => (
                <div key={stay.id} className="bg-white p-5 rounded-lg border border-stone-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-mono text-[#527568] bg-stone-100 px-2 py-0.5 rounded font-semibold">
                        {stay.district}
                      </span>
                      <span className="text-xs font-mono text-stone-500">{stay.propertyType}</span>
                    </div>
                    <h3 className="font-editorial text-xl font-bold text-[#173D35] mb-1">
                      {stay.name}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                      {stay.location} · {stay.elevationFt.toLocaleString()} ft
                    </p>
                  </div>
                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="font-editorial text-xl font-bold text-[#173D35]">
                        ₹{stay.startingPriceInr.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-stone-500"> / night</span>
                    </div>
                    <button
                      onClick={() => navigate(`/stays/${stay.slug}`)}
                      className="px-3 py-1.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm hover:bg-[#0F2A24]"
                    >
                      View Property
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs flex items-center justify-between">
              <span className="text-xs text-stone-600">
                Verified reviews queue ({reviewsList.length} reviews loaded)
              </span>
              <span className="text-xs text-stone-400 font-mono">
                Average Rating: 4.4 / 5.0
              </span>
            </div>

            <div className="space-y-3">
              {reviewsList.slice(0, 10).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-[#173D35]">{rev.authorName}</span>
                      <span className="text-[11px] text-stone-400 font-mono">({rev.origin})</span>
                      <div className="flex text-[#C4A36A]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-stone-700 italic">"{rev.reviewText}"</p>
                    <span className="text-[10px] text-stone-400 font-mono block">
                      Tour: {rev.packageVisited} · {rev.date}
                    </span>
                  </div>

                  <div className="shrink-0">
                    <button
                      onClick={() => handleToggleReviewBadge(rev.id)}
                      className={`px-3 py-1 rounded text-xs font-medium border transition-colors ${
                        rev.verified
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-stone-100 text-stone-600 border-stone-300'
                      }`}
                    >
                      {rev.verified ? '✓ Verified Booking' : 'Mark Verified'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: SEO & INTEGRATIONS */}
        {activeTab === 'seo' && (
          <div className="bg-white p-6 sm:p-8 rounded-lg border border-stone-200 shadow-xs space-y-6">
            <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
              Technical SEO & GEO Manifest Endpoints
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded border border-stone-200 bg-stone-50">
                <span className="font-bold text-[#173D35] block mb-1">XML Sitemap</span>
                <p className="text-stone-500 mb-2">Dynamic index covering 40+ indexable routes</p>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  className="text-emerald-700 underline font-mono flex items-center gap-1"
                >
                  <span>/sitemap.xml</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 rounded border border-stone-200 bg-stone-50">
                <span className="font-bold text-[#173D35] block mb-1">Robots.txt</span>
                <p className="text-stone-500 mb-2">Controls crawler permissions & prevents admin indexing</p>
                <a
                  href="/robots.txt"
                  target="_blank"
                  className="text-emerald-700 underline font-mono flex items-center gap-1"
                >
                  <span>/robots.txt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="p-4 rounded border border-stone-200 bg-stone-50">
                <span className="font-bold text-[#173D35] block mb-1">GEO LLMs Manifest</span>
                <p className="text-stone-500 mb-2">Structured entity context for AI search engines</p>
                <a
                  href="/llms.txt"
                  target="_blank"
                  className="text-emerald-700 underline font-mono flex items-center gap-1"
                >
                  <span>/llms.txt</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
