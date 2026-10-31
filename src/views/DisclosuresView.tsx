import React from 'react';
import { useRouter } from '../context/RouterContext';
import {
  ShieldAlert,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  XCircle,
  Clock,
  HeartPulse,
  Leaf,
  Car,
  Send,
  Mail,
  Info,
} from 'lucide-react';

export const DisclosuresView: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-semibold uppercase tracking-wider mb-3 border border-red-200">
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" />
            <span>Official Sikkim Tourism & Indian Army Regulations</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#173D35] tracking-tight">
            Essential Travel Disclosures & Permit Regulations
          </h1>
          <p className="text-sm sm:text-base text-stone-600 mt-3 leading-relaxed">
            Sikkim is a sensitive international border state bordering Tibet (China), Bhutan, and Nepal.
            To ensure your journey is smooth and compliant with Indian Army directives, please review the
            mandatory documentation and health advisories below.
          </p>
        </div>

        {/* 1. CRITICAL ARMY CHECKPOST WARNING */}
        <div className="p-6 sm:p-8 rounded-2xl bg-red-950 text-white border-2 border-red-500 shadow-xl mb-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-800/80 border border-red-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-7 h-7 text-amber-300" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                CRITICAL WARNING: Indian Army Permit Identity Document Rules
              </h2>
              <p className="text-sm text-red-100 leading-relaxed">
                For all high border sectors—including <strong>Gurudongmar Lake (17,800 ft)</strong>,{' '}
                <strong>Yumthang Valley</strong>, <strong>Zero Point</strong>,{' '}
                <strong>Tsomgo Lake</strong>, <strong>Nathu La Pass</strong>, and the{' '}
                <strong>Old Silk Route (Zuluk)</strong>:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-200 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">
                      ONLY ACCEPTED DOCUMENTS:
                    </strong>
                    Original Voter ID Card or Valid Passport + 4 to 8 physical passport-size color photographs.
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-red-900/80 border border-red-400 text-xs text-red-200 flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block font-semibold mb-0.5">
                      STRICTLY REJECTED BY ARMY:
                    </strong>
                    Aadhaar Cards and PAN Cards are <u>NOT accepted</u> by military checkposts under any circumstances.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. THREE-COLUMN POLICY DETAILS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* FOREIGN NATIONAL REGULATIONS */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#173D35]/10 flex items-center justify-center text-[#173D35]">
                <FileCheck className="w-5 h-5 text-[#c59b27]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#173D35]">
                Foreign Nationals (RAP Rules)
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Foreign passport holders can obtain free Restricted Area Permits (RAP) upon arrival at Rangpo,
              Melli, or Bagdogra.
            </p>
            <ul className="space-y-2 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Permitted Areas:</strong> Gangtok, Rumtek, Pelling, Yuksom, Ravangla, Namchi,
                  Lachung, and Yumthang Valley (in groups of 2+ traveling with a registered Sikkim operator).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Restricted Areas:</strong> Under Ministry of Home Affairs defense policies, foreign
                  nationals are <u>strictly not permitted</u> at Nathu La Pass or Gurudongmar Lake.
                </span>
              </li>
            </ul>
          </div>

          {/* HIGH ALTITUDE & ACCLIMATIZATION */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#173D35]/10 flex items-center justify-center text-[#173D35]">
                <HeartPulse className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#173D35]">
                High-Altitude Acclimatization (AMS)
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Gurudongmar Lake sits at 17,800 ft (5,430 m) and Zero Point sits at 15,300 ft (4,663 m), where
              atmospheric oxygen is approximately 50% of sea level.
            </p>
            <ul className="space-y-2 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Mandatory Acclimatization:</strong> Our itineraries enforce overnight stays at
                  Lachen (9,020 ft) and Lachung (8,610 ft) before ascending to high elevations.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Medical Precaution:</strong> Infants under 4 years and individuals with severe asthma or
                  cardiac complications should consult a physician before visiting Gurudongmar.
                </span>
              </li>
            </ul>
          </div>

          {/* DRIVING TRANSIT TIMES */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#173D35]/10 flex items-center justify-center text-[#173D35]">
                <Clock className="w-5 h-5 text-[#c59b27]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#173D35]">
                Mountain Driving Times Reality
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              In the Himalayas, journey duration is calculated in hours rather than distance:
            </p>
            <ul className="space-y-1.5 text-xs text-stone-700">
              <li>
                <strong>Bagdogra to Gangtok:</strong> 120 km · ~4.5 to 5 hours
              </li>
              <li>
                <strong>Gangtok to Lachen:</strong> 115 km · ~5.5 to 6 hours
              </li>
              <li>
                <strong>Lachen to Gurudongmar:</strong> 65 km · ~3.5 hours (Trans-Himalayan plateau)
              </li>
              <li>
                <strong>Gangtok to Pelling:</strong> 115 km · ~4.5 hours
              </li>
            </ul>
          </div>

          {/* VEHICLE & PLASTIC POLICIES */}
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#173D35]/10 flex items-center justify-center text-[#173D35]">
                <Leaf className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#173D35]">
                Eco-State & Plastic Ban Policy
              </h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Sikkim is India's first 100% certified organic state:
            </p>
            <ul className="space-y-2 text-xs text-stone-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Plastic Bottles in North Sikkim:</strong> Single-use plastic water bottles are
                  strictly illegal in Lachen and Lachung. Reusable thermal bottles are encouraged.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Car className="w-4 h-4 text-stone-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Commercial Mountain Vehicles:</strong> Only vehicles registered with Sikkim (SK)
                  commercial mountain permits are authorized for North Sikkim and Nathula Pass.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. DIRECT HELP & CONCIERGE DESK (NO ACCOUNT NEEDED) */}
        <div className="p-8 rounded-2xl bg-[#0b1e17] text-white border border-[#c59b27]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Have Questions About Your Permits or Group Documents?
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
              Our Gangtok concierge desk handles all paperwork directly with Sikkim Tourism and the Indian Army.
              Send your questions directly via WhatsApp or Email. No account or login is required.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="https://wa.me/919733022334?text=Hi%20Sikkim%20Tour%20Co.,%20I%20have%20questions%20regarding%20Sikkim%20travel%20permits%20and%20documents."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Ask on WhatsApp (+91 97330 22334)</span>
            </a>
            <a
              href="mailto:info@sikkimtourcompany.com?subject=Permit Inquiry - Sikkim Tour Co."
              className="px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/25 flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4 text-[#c59b27]" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
