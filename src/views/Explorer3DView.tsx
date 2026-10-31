import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import {
  Himalayan3DExplorer,
  REAL_SIKKIM_POINTS,
  RealMapPoint,
} from '../components/explorer3d/Himalayan3DExplorer';
import {
  Compass,
  MapPin,
  Sparkles,
  ShieldAlert,
  ChevronRight,
  Send,
  Mail,
  AlertTriangle,
  Phone,
} from 'lucide-react';

export const Explorer3DView: React.FC = () => {
  const { navigate } = useRouter();
  const [activeDistrict, setActiveDistrict] = useState<
    'All' | 'North Sikkim' | 'East Sikkim' | 'West Sikkim' | 'South Sikkim'
  >('All');
  const [selectedPoint, setSelectedPoint] = useState<RealMapPoint>(REAL_SIKKIM_POINTS[0]);

  const filteredPoints =
    activeDistrict === 'All'
      ? REAL_SIKKIM_POINTS
      : REAL_SIKKIM_POINTS.filter((p) => p.district === activeDistrict);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#263238] pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumb & Introduction */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#103D35]/10 text-xs font-semibold text-[#103D35] uppercase tracking-wider mb-2 border border-[#103D35]/20">
            <Compass className="w-3.5 h-3.5 text-[#EBA94B]" />
            <span>Sikkim Tour Co. · Authentic GIS Mountain Observatory</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#103D35] tracking-tight">
            Real Sikkim Satellite & Mountain Map
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-3xl mt-2 leading-relaxed">
            Real satellite imagery, verified GPS coordinates, and true Himalayan elevation profiles.
            Explore sacred Gurudongmar Lake (17,800 ft), Yumthang Valley, the 32 hairpin loops of Zuluk,
            and Mount Kanchenjunga (28,169 ft) with real roads and mandatory military permit guidelines.
          </p>
        </div>

        {/* Primary Real Satellite Explorer Map Container */}
        <div className="mb-10">
          <Himalayan3DExplorer />
        </div>

        {/* Elevation Grid Cards across all verified checkpoints */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#103D35]">
                Verified Mountain Checkpoints & Permit Guidelines
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Accurate coordinates, driving transit times, and Indian Army checkpoint regulations
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {(['All', 'North Sikkim', 'East Sikkim', 'West Sikkim', 'South Sikkim'] as const).map(
                (district) => (
                  <button
                    key={district}
                    onClick={() => setActiveDistrict(district)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeDistrict === district
                        ? 'bg-[#103D35] text-white shadow-xs font-semibold ring-1 ring-[#EBA94B]'
                        : 'bg-white hover:bg-stone-200 text-stone-700 border border-stone-300'
                    }`}
                  >
                    {district}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPoints.map((pt) => {
              const isSelected = selectedPoint.id === pt.id;
              const waText = encodeURIComponent(
                `Hi Sikkim Tour Co., I want to visit ${pt.name} (${pt.elevationFt} ft) in ${pt.district}. Please send quote and permit details.`
              );
              return (
                <div
                  key={pt.id}
                  onClick={() => setSelectedPoint(pt)}
                  className={`p-4 rounded-xl bg-white border transition-all cursor-pointer flex flex-col justify-between card-3d-interactive ${
                    isSelected
                      ? 'border-[#EBA94B] ring-2 ring-[#EBA94B]/40 shadow-lg'
                      : 'border-stone-200 hover:border-[#3B7FA3]/40 shadow-xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 block">
                          {pt.district}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#103D35] flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#EBA94B] shrink-0" />
                          {pt.name}
                        </h3>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                          pt.elevationFt >= 14000
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : pt.elevationFt >= 9000
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {pt.elevationFt.toLocaleString('en-IN')} ft
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                      {pt.tagline}
                    </p>

                    <div className="text-[11px] space-y-1 py-2 border-t border-stone-100 text-stone-600">
                      <div>
                        <strong>Driving Time:</strong> {pt.drivingFromGangtok}
                      </div>
                      <div>
                        <strong>Permit:</strong> {pt.permitRequirement}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-stone-100 mt-2">
                    <a
                      href={`https://wa.me/917001846727?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-all"
                    >
                      <Send className="w-3 h-3" /> WhatsApp
                    </a>

                    {pt.destinationSlug && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/destinations/${pt.destinationSlug}`);
                        }}
                        className="text-[#103D35] hover:text-[#EBA94B] text-xs font-semibold flex items-center gap-0.5 transition-colors"
                      >
                        <span>Full Guide</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Banner: Connect Directly on WhatsApp & Email (No Account Needed) */}
        <div className="p-8 rounded-2xl bg-[#103D35] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-[#EBA94B]/30">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#EBA94B]/20 text-[#EBA94B] text-xs font-semibold uppercase tracking-wider mb-2 border border-[#EBA94B]/40">
              Sikkim Tour Co. · Your Journey. Our Mountains.
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Plan Your High-Altitude Himalayan Expedition
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              No account or login required. Reach out directly on WhatsApp or Email for immediate assistance with Army permits, dedicated mountain SUVs, and authentic heritage stays.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20plan%20a%20Sikkim%20mountain%20journey."
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>WhatsApp Concierge</span>
            </a>
            <a
              href="tel:+917001846727"
              className="px-5 py-3 rounded-xl bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 fill-[#103D35]" />
              <span>Call Us</span>
            </a>
            <a
              href="mailto:info@sikkimtourco.com?subject=Custom Tour Inquiry - Sikkim Tour Co."
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 border border-white/30 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Email Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
