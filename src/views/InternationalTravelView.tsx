import React from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig, buildGeneralWhatsAppMessage, buildWhatsAppUrl } from '../config/site';
import {
  Globe,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Plane,
  Car,
  ExternalLink,
  MessageSquare,
  Sparkles,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';

export const InternationalTravelView: React.FC = () => {
  const { navigate } = useRouter();

  const internationalWhatsAppUrl = buildWhatsAppUrl(
    `Hello Sikkim Tour Co.,\n\nI am an international traveller planning a trip to Sikkim.\nNationality: [Specify country]\nPreferred dates: [Specify dates]\nNumber of persons: [Min 2 required for protected sectors]\n\nPlease advise on visa / permit prerequisites and share custom private itinerary options.`
  );

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568] mb-2">
            <Globe className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>Official Foreign Visitor Guidance</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#173D35] mb-4">
            International Travellers to Sikkim
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Planning a journey to Sikkim from abroad is an extraordinary experience. Because Sikkim shares sovereign international borders with Tibet/China, Bhutan, and Nepal, international visitors must comply with specific Indian immigration and permit protocols.
          </p>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-5 bg-amber-50/70 border border-amber-200/90 rounded-md mb-10 text-xs text-amber-950 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-sm text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-700" />
            <span>Important Regulatory & Legal Notice</span>
          </div>
          <p className="leading-relaxed">
            Travel permissions and permit issuances are subject to individual nationality, destination sector, current border regulations, and approval by the Ministry of External Affairs, Ministry of Home Affairs, and Government of Sikkim. Sikkim Tour Co. provides itinerary planning and administrative assistance, but <strong>does not provide legal guarantees regarding visa eligibility, entry permission, or restricted-area approvals.</strong>
          </p>
          <div>
            <a
              href={siteConfig.officialTourismLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#173D35] hover:underline"
            >
              <span>Verify Official Regulations on the Sikkim Tourism Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 4 Pillars of International Travel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Pillar 1: Inner Line Permit (ILP) */}
          <div className="bg-white p-7 rounded-md border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#173D35]/5 flex items-center justify-center text-[#173D35] mb-1">
              <FileText className="w-5 h-5 text-[#527568]" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#173D35]">
              1. Inner Line Permit (ILP / RAP)
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Foreign passport holders require an Inner Line Permit (also known as a Restricted Area Permit) to enter Sikkim. The initial permit is issued for 30 days and is granted free of statutory charge.
            </p>
            <div className="text-xs text-stone-700 space-y-1 bg-[#F8F6F0] p-3 rounded-xs">
              <div><strong>Where to obtain:</strong> Rangpo or Melli border checkposts upon arrival.</div>
              <div><strong>Prerequisites:</strong> Valid Indian Tourist Visa (or e-Visa), valid Passport, photocopies, and 2 passport-size photographs.</div>
            </div>
          </div>

          {/* Pillar 2: Protected Area Permits (PAP) */}
          <div className="bg-white p-7 rounded-md border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#173D35]/5 flex items-center justify-center text-[#173D35] mb-1">
              <ShieldCheck className="w-5 h-5 text-[#527568]" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#173D35]">
              2. Protected Areas & Special Sectors
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              While Gangtok, Pelling, Ravangla, Namchi, and Yuksom are open with the basic ILP, sensitive high-altitude sectors (such as Lachung, Yumthang Valley, and Tsomgo Lake) require Protected Area Permits.
            </p>
            <div className="text-xs text-stone-700 space-y-1 bg-[#F8F6F0] p-3 rounded-xs">
              <div><strong>Mandatory Group Rule:</strong> Foreign nationals must travel in a minimum group of 2 persons through a registered travel agency.</div>
              <div><strong>Strictly Restricted:</strong> Gurudongmar Lake and Nathu La Pass are closed to foreign nationals under Indian military border regulations.</div>
            </div>
          </div>

          {/* Pillar 3: Airport & Ground Transport Coordination */}
          <div className="bg-white p-7 rounded-md border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#173D35]/5 flex items-center justify-center text-[#173D35] mb-1">
              <Plane className="w-5 h-5 text-[#527568]" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#173D35]">
              3. Arrival Hubs & Scenic Road Logistics
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Most international guests fly to Kolkata (CCU) or New Delhi (DEL), then take a domestic connecting flight to Bagdogra International Airport (IXB).
            </p>
            <div className="text-xs text-stone-700 space-y-1 bg-[#F8F6F0] p-3 rounded-xs">
              <div><strong>Airport Meet & Assist:</strong> Our dedicated English-speaking chauffeur meets you at Bagdogra or Pakyong Airport with a private high-clearance SUV.</div>
              <div><strong>Inter-state transit:</strong> Seamless transit across West Bengal (Darjeeling) and Sikkim without vehicle switching.</div>
            </div>
          </div>

          {/* Pillar 4: Custom Hospitality & Dietary Curation */}
          <div className="bg-white p-7 rounded-md border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#173D35]/5 flex items-center justify-center text-[#173D35] mb-1">
              <Sparkles className="w-5 h-5 text-[#527568]" />
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#173D35]">
              4. Tailored Stays & Currency Transparency
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              We arrange premier heritage manors, boutique tea estate bungalows, and high-standard hygienic mountain accommodations suited to international travel standards.
            </p>
            <div className="text-xs text-stone-700 space-y-1 bg-[#F8F6F0] p-3 rounded-xs">
              <div><strong>Currency:</strong> Indicative quotations available in USD; final billing processed transparently in INR.</div>
              <div><strong>Dietary Care:</strong> Pre-arranged vegetarian, vegan, and mild continental culinary options at partner hotels.</div>
            </div>
          </div>
        </div>

        {/* Nationality Specific Guidance */}
        <div className="bg-white p-8 rounded-md border border-stone-200/90 shadow-xs mb-12">
          <h3 className="font-editorial text-2xl font-bold text-[#173D35] mb-3">
            Special Nationality Categories
          </h3>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-4">
            Under Indian Ministry of Home Affairs circulars, passport holders from <strong>Bangladesh, Pakistan, China, and Myanmar</strong> are subject to prior written approval from the Ministry of Home Affairs, Government of India, New Delhi, before Sikkim entry permits can be granted.
          </p>
          <p className="text-xs text-stone-600 leading-relaxed">
            Travellers from the United States, United Kingdom, Canada, European Union nations, Australia, Japan, Singapore, and other eligible countries can routinely acquire standard ILPs upon arrival at Rangpo/Melli checkposts.
          </p>
        </div>

        {/* CTA Card */}
        <div className="bg-[#173D35] text-white p-8 sm:p-12 rounded-md shadow-lg text-center max-w-3xl mx-auto space-y-5">
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F8F6F0]">
            Plan Your Himalayan Journey
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
            Tell us your nationality, group size, and intended travel dates. Our Gangtok travel desk will structure a compliant private itinerary with dedicated mountain coordination.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigate('/customise-trip')}
              className="w-full sm:w-auto px-7 py-3 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] font-semibold text-xs sm:text-sm rounded-sm transition-colors shadow-xs"
            >
              Customise International Trip
            </button>
            <a
              href={internationalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm rounded-sm transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>International Travel Desk WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
