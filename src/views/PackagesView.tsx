import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { tourPackagesData, TourPackage } from '../data/packages';
import { PackageCard } from '../components/PackageCard';
import { Sparkles, ShieldAlert, Send, Mail, AlertTriangle, Layers } from 'lucide-react';

export const PackagesView: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: `All Packages (${tourPackagesData.length})` },
    { id: 'High Altitude', label: 'High Altitude & Alpine' },
    { id: 'Honeymoon & Luxury', label: 'Honeymoon & Luxury' },
    { id: 'Silk Route', label: 'Old Silk Route & Zuluk' },
    { id: 'Heritage & Monasteries', label: 'Royal Monasteries' },
    { id: 'Family & Soft Adventure', label: 'Family & Leisure' },
    { id: 'Offbeat & Homestays', label: 'Offbeat & Homestays' },
    { id: 'Wildlife & Eco', label: 'Wildlife & Eco' },
    { id: 'Short Trips', label: 'Weekend Escapes' },
    { id: 'Motorbiking', label: 'Motorbike Touring' },
  ];

  const filteredPackages = tourPackagesData.filter((pkg) => {
    if (selectedCategory === 'all') return true;
    return pkg.travelStyleCategory === selectedCategory;
  });

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#173D35]/10 text-xs font-semibold uppercase tracking-wider text-[#173D35] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
            <span>Sikkim Tour Co. · 15 Curated Package Categories</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#173D35] tracking-tight mb-3">
            Himalayan Tour Packages & Expeditions
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            From the flagship 14-day four-district expedition to high-altitude lakes at 17,800 ft,
            heritage tea estates, and motorcycle tours. Every package is customized directly to your dates and preferences.
          </p>
        </div>

        {/* PRICING & PERMITS MANDATORY DISCLOSURE BAR */}
        <div className="mb-8 p-5 rounded-2xl bg-stone-900 text-white border border-[#EBA94B]/40 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-[#EBA94B] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="text-xs uppercase font-mono tracking-wider text-[#EBA94B] font-bold">
                Transparent Pricing on Request · Zero Hidden Charges
              </div>
              <p className="text-xs text-stone-300 leading-relaxed max-w-2xl">
                We do not publish fixed or generic prices because Himalayan vehicle permits, hotel room tiers,
                and seasonal driver rates vary dynamically. Click <strong>"Get Quote on WhatsApp"</strong> for an
                instant, verified itemized quotation tailored to your exact party size within 15 minutes.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => navigate('/disclosures')}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-1.5"
            >
              <span>View Permit Rules</span>
            </button>
          </div>
        </div>

        {/* FILTER CATEGORY PILLS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#173D35] text-white shadow-md ring-2 ring-[#EBA94B]/40'
                  : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* PACKAGE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredPackages.map((pkg) => (
            <PackageCard key={pkg.id} tourPackage={pkg} />
          ))}
        </div>

        {/* BOTTOM DIRECT CONTACT CALLOUT */}
        <div className="p-8 rounded-2xl bg-[#103D35] text-white border border-[#EBA94B]/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Looking for a Customized Himalayan Itinerary?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Tell our local mountain travel specialists your preferred travel window, group size, and interests.
              We will craft an exclusive private route with dedicated chauffeurs and permits.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20customize%20a%20private%20tour%20package."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Chat on WhatsApp (+91 70018 46727)</span>
            </a>
            <a
              href="mailto:info@sikkimtourcompany.com?subject=Custom Package Request - Sikkim Tour Co."
              className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/25 flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4 text-[#EBA94B]" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
