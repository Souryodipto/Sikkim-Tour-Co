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
  Camera,
  MapPin,
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

        {/* RESTRICTED PERMIT SECTORS PHOTO SHOWCASE */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-[#173D35]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#173D35]">
                Key Border Permit Checkpost Sectors of Sikkim
              </h2>
            </div>
            <span className="text-[11px] text-stone-500 font-medium">
              Voter ID or Passport Required · 4 Passport Photos per Sector
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Gurudongmar Lake',
                elevation: '17,800 ft',
                district: 'North Sikkim',
                checkpost: 'Thangu Military Post',
                permit: 'PAP Mandatory (Indians Only)',
                image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Nathu La Pass',
                elevation: '14,140 ft',
                district: 'East Sikkim',
                checkpost: 'Sherathang Checkpost',
                permit: 'Army Border Pass (Wed–Sun)',
                image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Yumthang & Zero Point',
                elevation: '15,300 ft',
                district: 'North Sikkim',
                checkpost: 'Lachung / Yumesamdong',
                permit: 'Protected Area Permit',
                image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Old Silk Route Zuluk',
                elevation: '12,500 ft',
                district: 'East Sikkim',
                checkpost: 'Rongli Sub-Division',
                permit: 'SDO Silk Route Permit',
                image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
              },
            ].map((sector, idx) => (
              <div
                key={idx}
                className="group relative h-52 rounded-xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between p-3.5"
              >
                <img
                  src={sector.image}
                  alt={sector.title}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30" />

                <div className="relative z-10 flex items-start justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#EBA94B] border border-[#EBA94B]/40">
                    {sector.elevation}
                  </span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {sector.district}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3 className="font-serif text-base font-bold text-white mb-0.5 leading-snug drop-shadow-sm">
                    {sector.title}
                  </h3>
                  <div className="text-[11px] text-stone-300 flex items-center gap-1 drop-shadow-xs mb-1">
                    <MapPin className="w-3 h-3 text-[#EBA94B] shrink-0" />
                    <span>{sector.checkpost}</span>
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-300 drop-shadow-xs">
                    {sector.permit}
                  </div>
                </div>
              </div>
            ))}
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
              href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20have%20questions%20regarding%20Sikkim%20travel%20permits%20and%20documents."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Ask on WhatsApp (+91 70018 46727)</span>
            </a>
            <a
              href="mailto:info@sikkimtourco.com?subject=Permit Inquiry - Sikkim Tour Co."
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
