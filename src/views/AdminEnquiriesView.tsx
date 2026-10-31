import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { EnquiryRecord, EnquiryStatus, enquiryStatusList } from '../utils/enquiry';
import { siteConfig } from '../config/site';
import {
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  ArrowLeft,
  Eye,
} from 'lucide-react';

export const AdminEnquiriesView: React.FC = () => {
  const { navigate } = useRouter();
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const [backendType, setBackendType] = useState<string>('local');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/enquiries');
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
        setBackendType(data.storageType || 'local');
      }
    } catch (e) {
      console.error('Failed to fetch enquiries:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    setUpdatingId(enquiryId);
    try {
      const res = await fetch(`/api/enquiries/${enquiryId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((item) =>
            item.id === enquiryId ? { ...item, enquiryStatus: newStatus } : item
          )
        );
        if (selectedEnquiry?.id === enquiryId) {
          setSelectedEnquiry((prev) => (prev ? { ...prev, enquiryStatus: newStatus } : null));
        }
      }
    } catch (e) {
      console.error('Failed to update enquiry status:', e);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredEnquiries = enquiries.filter((item) => {
    if (statusFilter !== 'all' && item.enquiryStatus !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.fullName.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.destinations.join(' ').toLowerCase().includes(q) ||
        item.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568] mb-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C4A36A]" />
              <span>Internal Operations Desk</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#173D35]">
              Lead & Enquiry Management
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Active enquiries received from website and WhatsApp channels. Storage:{' '}
              <span className="font-mono font-semibold text-[#173D35]">
                {backendType === 'supabase' ? 'Supabase Database' : 'Server Persistent Storage (.data/enquiries.json)'}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchEnquiries}
              disabled={loading}
              className="inline-flex items-center gap-1.5 py-2 px-3.5 bg-white border border-stone-200 text-stone-700 text-xs font-semibold rounded-sm hover:bg-stone-50 transition-colors shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1 py-2 px-3 bg-[#173D35] text-white text-xs font-semibold rounded-sm hover:bg-[#0F2A24] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to App</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-md border border-stone-200/90 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              placeholder="Search by name, email, phone, destination..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-stone-800 focus:outline-hidden"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-stone-400 font-semibold uppercase tracking-wider">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-stone-50 border border-stone-300 rounded-sm py-1.5 px-3 text-xs text-stone-800 focus:outline-hidden"
            >
              <option value="all">All Statuses ({enquiries.length})</option>
              {enquiryStatusList.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Grid: Enquiries Table + Detail Modal/Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className={`${selectedEnquiry ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
            <div className="bg-white rounded-md border border-stone-200/90 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#173D35] text-white text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Lead ID / Created</th>
                      <th className="py-3 px-4">Traveller Details</th>
                      <th className="py-3 px-4">Destinations & Dates</th>
                      <th className="py-3 px-4">Party / Budget</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 text-stone-700">
                    {loading && enquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-400">
                          Loading enquiries...
                        </td>
                      </tr>
                    ) : filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-400">
                          No enquiries found matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((item) => (
                        <tr
                          key={item.id}
                          className={`hover:bg-stone-50/80 transition-colors ${
                            selectedEnquiry?.id === item.id ? 'bg-[#173D35]/5 font-medium' : ''
                          }`}
                        >
                          <td className="py-3 px-4 align-top">
                            <span className="font-mono font-semibold text-[#173D35] block">
                              {item.id}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </span>
                          </td>

                          <td className="py-3 px-4 align-top">
                            <div className="font-semibold text-stone-900">{item.fullName}</div>
                            <div className="text-[11px] text-stone-500">{item.email}</div>
                            <div className="text-[11px] text-stone-500">{item.phone}</div>
                            <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 bg-stone-100 rounded-xs text-stone-600">
                              {item.travellerCategory === 'domestic' ? 'Domestic' : `Intl (${item.nationality || 'Foreign'})`}
                            </span>
                          </td>

                          <td className="py-3 px-4 align-top">
                            <div className="line-clamp-2 max-w-[180px] font-medium text-stone-800">
                              {item.destinations.join(', ')}
                            </div>
                            <div className="text-[11px] text-stone-500">
                              {item.arrivalDate} to {item.departureDate}
                            </div>
                            <div className="text-[10px] text-stone-400">Hub: {item.startingCity}</div>
                          </td>

                          <td className="py-3 px-4 align-top">
                            <div className="text-stone-800">
                              {item.adultCount} Adults{item.childCount > 0 ? `, ${item.childCount} Child` : ''}
                            </div>
                            <div className="text-[11px] text-stone-500 line-clamp-1">{item.budget}</div>
                            <div className="text-[10px] text-stone-400">{item.hotelCategory}</div>
                          </td>

                          <td className="py-3 px-4 align-top">
                            <select
                              value={item.enquiryStatus}
                              disabled={updatingId === item.id}
                              onChange={(e) =>
                                handleStatusChange(item.id, e.target.value as EnquiryStatus)
                              }
                              className={`py-1 px-2 rounded-xs text-[11px] font-semibold border ${
                                item.enquiryStatus === 'New'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : item.enquiryStatus === 'Quotation Sent'
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : item.enquiryStatus === 'Confirmed'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : item.enquiryStatus === 'Follow-up Required'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-stone-50 text-stone-700 border-stone-200'
                              }`}
                            >
                              {enquiryStatusList.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td className="py-3 px-4 align-top text-right">
                            <button
                              onClick={() => setSelectedEnquiry(item)}
                              className="p-1.5 text-stone-500 hover:text-[#173D35] hover:bg-stone-100 rounded-sm"
                              title="Inspect Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column: Selected Enquiry Detail Card */}
          {selectedEnquiry && (
            <div className="lg:col-span-5">
              <div className="bg-white rounded-md border border-stone-200/90 shadow-md p-6 sticky top-20 space-y-4">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider">
                      Lead Dossier
                    </span>
                    <h3 className="font-editorial text-xl font-bold text-[#173D35]">
                      {selectedEnquiry.fullName}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="text-stone-400 hover:text-stone-800 text-sm font-semibold"
                  >
                    ✕ Close
                  </button>
                </div>

                <div className="space-y-3 text-xs text-stone-700">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Reference ID</span>
                      <span className="font-mono font-semibold">{selectedEnquiry.id}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[11px] block">Received Date</span>
                      <span>{new Date(selectedEnquiry.createdAt).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-100 pt-2 grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Email</span>
                      <a href={`mailto:${selectedEnquiry.email}`} className="text-[#173D35] underline">
                        {selectedEnquiry.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[11px] block">Phone / WhatsApp</span>
                      <span>{selectedEnquiry.phone}</span>
                    </div>
                  </div>

                  <div className="border-t border-stone-100 pt-2">
                    <span className="text-stone-400 text-[11px] block">Destinations Requested</span>
                    <strong className="text-stone-900">{selectedEnquiry.destinations.join(', ')}</strong>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Travel Period</span>
                      <span>{selectedEnquiry.arrivalDate} to {selectedEnquiry.departureDate}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[11px] block">Arrival Hub</span>
                      <span>{selectedEnquiry.startingCity}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Hotel Preference</span>
                      <span>{selectedEnquiry.hotelCategory}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[11px] block">Transport</span>
                      <span>{selectedEnquiry.transportPreference}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-stone-400 text-[11px] block">Budget</span>
                      <span className="font-semibold text-stone-900">{selectedEnquiry.budget}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 text-[11px] block">Travel Style</span>
                      <span>{selectedEnquiry.travelStyle}</span>
                    </div>
                  </div>

                  {selectedEnquiry.specialRequests && (
                    <div className="border-t border-stone-100 pt-2">
                      <span className="text-stone-400 text-[11px] block">Special Requests</span>
                      <p className="p-2.5 bg-stone-50 rounded-xs text-stone-800 italic">
                        {selectedEnquiry.specialRequests}
                      </p>
                    </div>
                  )}

                  <div className="border-t border-stone-100 pt-4 flex gap-2">
                    <a
                      href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-[#25D366] text-white text-xs font-semibold rounded-sm text-center"
                    >
                      WhatsApp Traveller
                    </a>
                    <a
                      href={`mailto:${selectedEnquiry.email}?subject=Your Sikkim Tour Co. Travel Proposal (${selectedEnquiry.id})`}
                      className="flex-1 py-2 px-3 bg-[#173D35] text-white text-xs font-semibold rounded-sm text-center"
                    >
                      Email Quotation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
