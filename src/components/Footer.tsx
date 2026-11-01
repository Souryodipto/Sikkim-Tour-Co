import React from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/site';
import { destinationsData } from '../data/destinations';
import { tourPackagesData } from '../data/packages';
import { Phone, Mail, MapPin, Send, ShieldAlert, ExternalLink, Mountain } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useRouter();

  const handleLink = (path: string) => {
    navigate(path);
  };

  const defaultWaText = encodeURIComponent(
    'Hi Sikkim Tour Co., I am interested in planning a trip to Sikkim.'
  );

  return (
    <footer className="bg-[#0A2621] text-[#F8F6F0]/85 border-t border-[#EBA94B]/30 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MANDATORY ARMY PERMIT DISCLOSURE NOTICE BOX */}
        <div className="mb-12 p-6 rounded-2xl bg-red-950/70 text-white border border-red-500/50 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-300 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <strong className="text-amber-200 block font-serif text-sm">
                Mandatory Indian Army Checkpoint Notice:
              </strong>
              <p className="text-red-100/90 leading-relaxed max-w-3xl">
                Protected Area Permits (PAP) for North Sikkim (Gurudongmar Lake, Yumthang Valley, Zero Point)
                and East Sikkim (Tsomgo Lake, Nathula Pass) strictly require original Voter ID card or Passport
                with 4 to 8 passport photos. <u>Aadhaar cards and PAN cards are strictly not accepted</u> by military checkposts.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleLink('/disclosures')}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 whitespace-nowrap shrink-0 transition-all"
          >
            Read All Disclosures
          </button>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Sikkim Tour Co."
                className="w-12 h-12 rounded-full border border-[#EBA94B]/60 object-cover shadow-md"
              />
              <div>
                <span className="text-2xl font-serif font-bold tracking-tight text-white block">
                  SIKKIM TOUR CO.
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#EBA94B] font-mono block">
                  Your Journey. Our Mountains.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F8F6F0]/70 leading-relaxed max-w-md">
              Licensed premier Himalayan tour operator headquartered on Paljor Stadium Road, Gangtok.
              We craft authentic, private, and customizable travel itineraries across North, East, West,
              and South Sikkim with verified mountain chauffeurs and comprehensive permit coordination.
            </p>

            {/* Verified Tourism License & Review Signals with Live External Verification Links */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
              <a
                href="https://www.sikkimtourism.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded bg-[#EBA94B]/15 border border-[#EBA94B]/40 text-[#EBA94B] font-mono font-medium hover:underline inline-flex items-center gap-1"
                title="Department of Tourism &amp; Civil Aviation, Government of Sikkim"
              >
                <span>Govt. Reg.: SKM/DOT/TA-2024/718</span>
                <ExternalLink className="w-3 h-3 text-[#EBA94B]" />
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Sikkim+Tour+Co+Paljor+Stadium+Road+Gangtok"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-medium hover:underline inline-flex items-center gap-1"
                title="View Sikkim Tour Co. on Google Maps"
              >
                <span>★ 4.4/5 Rating (Google Reviews)</span>
                <ExternalLink className="w-3 h-3 text-emerald-300" />
              </a>
              <a
                href="https://www.tripadvisor.com/Search?q=Sikkim+Tour+Co+Gangtok"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-0.5 rounded bg-white/10 border border-white/20 text-white/90 font-medium hover:underline inline-flex items-center gap-1"
                title="View Sikkim Tour Co. on TripAdvisor"
              >
                <span>TripAdvisor Profile</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>
            </div>

            {/* Direct Instant Contact Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/917001846727?text=${defaultWaText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-lg shadow-sm transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>WhatsApp: +91 70018 46727</span>
              </a>

              <a
                href="mailto:info@sikkimtourco.com?subject=Travel Inquiry - Sikkim Tour Co."
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg border border-white/20 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#EBA94B]" />
                <span>info@sikkimtourco.com</span>
              </a>

              <a
                href="tel:+917001846727"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-bold text-xs rounded-lg shadow-sm transition-all"
              >
                <Phone className="w-3.5 h-3.5 fill-[#103D35]" />
                <span>Call: +91 70018 46727</span>
              </a>
            </div>

            <div className="text-xs text-white/50 flex items-center gap-2 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>Paljor Stadium Road, Gangtok, Sikkim 737101, India</span>
            </div>
          </div>

          {/* Column 2: Featured Destinations */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white/90 mb-4 font-mono">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F6F0]/70">
              {destinationsData.map((dest) => (
                <li key={dest.id}>
                  <a
                    href={`/destinations/${dest.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLink(`/destinations/${dest.slug}`);
                    }}
                    className="hover:text-[#EBA94B] transition-colors"
                  >
                    {dest.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/3d-explorer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/3d-explorer');
                  }}
                  className="hover:text-[#EBA94B] transition-colors flex items-center gap-1 font-semibold text-[#EBA94B]"
                >
                  <Mountain className="w-3 h-3" />
                  <span>Real Satellite Map</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tour Package Categories (SEO Hub) */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white/90 mb-4 font-mono">
              Tour Packages
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F6F0]/70">
              <li>
                <a
                  href="/north-sikkim-tour-packages"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/north-sikkim-tour-packages');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  North Sikkim Packages
                </a>
              </li>
              <li>
                <a
                  href="/gurudongmar-lake-tour"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/gurudongmar-lake-tour');
                  }}
                  className="hover:text-[#EBA94B] transition-colors font-medium text-amber-200"
                >
                  Gurudongmar Lake Tour (17,800 ft)
                </a>
              </li>
              <li>
                <a
                  href="/nathula-pass-tour"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/nathula-pass-tour');
                  }}
                  className="hover:text-[#EBA94B] transition-colors font-medium text-amber-200"
                >
                  Nathula Pass Permit &amp; Tour
                </a>
              </li>
              <li>
                <a
                  href="/pelling-tour-packages"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/pelling-tour-packages');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Pelling &amp; West Sikkim
                </a>
              </li>
              <li>
                <a
                  href="/sikkim-darjeeling-tour-packages"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/sikkim-darjeeling-tour-packages');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Sikkim &amp; Darjeeling
                </a>
              </li>
              <li>
                <a
                  href="/silk-route-tour-packages"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/silk-route-tour-packages');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Old Silk Route &amp; Zuluk
                </a>
              </li>
              <li>
                <a
                  href="/sikkim-packages-from-kolkata"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/sikkim-packages-from-kolkata');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Sikkim Packages from Kolkata
                </a>
              </li>
              <li>
                <a
                  href="/sikkim-packages-from-bagdogra-njp"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/sikkim-packages-from-bagdogra-njp');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Sikkim from Bagdogra / NJP
                </a>
              </li>
              <li>
                <a
                  href="/sikkim-packages-from-delhi"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/sikkim-packages-from-delhi');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Sikkim Packages from Delhi
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/packages');
                  }}
                  className="hover:text-[#EBA94B] transition-colors font-semibold text-[#EBA94B] block pt-1"
                >
                  View All Tour Packages →
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Traveler Support & No Login Policy */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-white/90 mb-4 font-mono">
              Help &amp; Policies
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F6F0]/70">
              <li>
                <a
                  href="/faqs"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/faqs');
                  }}
                  className="hover:text-[#EBA94B] transition-colors font-bold text-[#EBA94B]"
                >
                  Travel FAQs &amp; Help
                </a>
              </li>
              <li>
                <a
                  href="/disclosures"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/disclosures');
                  }}
                  className="hover:text-white transition-colors text-amber-300 font-semibold"
                >
                  Permit &amp; Travel Disclosures
                </a>
              </li>
              <li>
                <a
                  href="/stays"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/stays');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Heritage Accommodations
                </a>
              </li>
              <li>
                <a
                  href="/ai-planner"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/ai-planner');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  AI Itinerary Planner
                </a>
              </li>
              <li>
                <a
                  href="/travel-guides/nh10-sikkim-road-conditions-alternate-routes-guide"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/travel-guides/nh10-sikkim-road-conditions-alternate-routes-guide');
                  }}
                  className="hover:text-white transition-colors text-emerald-300 font-semibold"
                >
                  NH-10 Road Status &amp; Bypass Guide
                </a>
              </li>
              <li>
                <a
                  href="/travel-guides"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/travel-guides');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Sikkim Travel Guides &amp; Blog (18)
                </a>
              </li>
              <li>
                <a
                  href="/reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/reviews');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Traveler Reviews (118)
                </a>
              </li>
              <li>
                <a
                  href="/weather"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/weather');
                  }}
                  className="hover:text-[#EBA94B] transition-colors"
                >
                  Microclimate Weather &amp; Road Status
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Legal Links Bar */}
        <div className="pt-8 pb-4 flex flex-wrap items-center justify-between gap-4 text-xs text-[#F8F6F0]/60 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/privacy-policy"
              onClick={(e) => {
                e.preventDefault();
                handleLink('/privacy-policy');
              }}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/terms-and-conditions"
              onClick={(e) => {
                e.preventDefault();
                handleLink('/terms-and-conditions');
              }}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/cancellation-policy"
              onClick={(e) => {
                e.preventDefault();
                handleLink('/cancellation-policy');
              }}
              className="hover:text-white transition-colors"
            >
              Cancellation & Refund Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/disclosures"
              onClick={(e) => {
                e.preventDefault();
                handleLink('/disclosures');
              }}
              className="hover:text-white transition-colors text-amber-300"
            >
              Army Permits & Foreign Nationals Notice
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-white/60 text-xs">
            <span>No Account Needed · Direct WhatsApp & Email Concierge</span>
            <span aria-hidden="true" className="text-white/30">|</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[#EBA94B] text-[11px] underline">
              Sitemap.xml
            </a>
            <span aria-hidden="true" className="text-white/30">·</span>
            <a href="/llms.txt" target="_blank" rel="noopener noreferrer" className="hover:text-[#EBA94B] text-[11px] underline">
              llms.txt (AI GEO)
            </a>
          </div>
        </div>

        {/* Local GEO & Search Grounding Strip */}
        <div className="mt-8 pt-6 border-t border-white/10 text-[11px] text-[#F8F6F0]/65 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <strong className="text-white">Geographic Footprint:</strong> Gangtok (5,410 ft) · North Sikkim (Gurudongmar 17,800 ft, Lachung, Lachen) · East Sikkim (Nathu La 14,140 ft, Tsomgo, Zuluk Silk Route) · West Sikkim (Pelling, Yuksom) · South Sikkim (Namchi, Temi Tea).
            </div>
            <div className="font-mono text-[10px] text-[#EBA94B] bg-black/30 px-2.5 py-1 rounded-md border border-[#EBA94B]/30">
              GEO: 27.3389° N, 88.6065° E · Gangtok, Sikkim, India
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 text-[11px] text-[#F8F6F0]/50 space-y-2 leading-relaxed">
          <p>
            <strong>Transparent Quotations &amp; Permit Notice:</strong> All tour packages are priced dynamically on request based on group size, chosen travel dates, vehicle selection (dedicated Toyota Innova Crysta vs Mahindra Scorpio), and accommodation tier. All permits for protected frontier zones (Nathu La Pass, Tsomgo, Gurudongmar Lake, Yumthang Valley) are issued under the exclusive authority of the Indian Army and the Government of Sikkim; we handle and submit all paperwork on your behalf, subject to official checkpost protocols and weather safety.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[#F8F6F0]/40">
            <p>© {new Date().getFullYear()} Sikkim Tour Co. (Sikkim Tour Company). All rights reserved.</p>
            <p>Paljor Stadium Road, Gangtok, Sikkim 737101, India</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
