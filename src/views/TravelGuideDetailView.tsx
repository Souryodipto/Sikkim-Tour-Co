import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { travelGuidesData } from '../data/guides';
import { tourPackagesData } from '../data/packages';
import { destinationsData } from '../data/destinations';
import { PackageCard } from '../components/PackageCard';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  Share2,
  Sparkles,
  CheckCircle2,
  Send,
  MessageCircle,
  MapPin,
  ShieldAlert,
  List,
  Check,
  HelpCircle,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from '../config/site';

interface TravelGuideDetailViewProps {
  slug: string;
}

export const TravelGuideDetailView: React.FC<TravelGuideDetailViewProps> = ({ slug }) => {
  const { navigate } = useRouter();
  const [copied, setCopied] = useState(false);

  const guide = travelGuidesData.find((g) => g.slug === slug || g.id === slug);

  if (!guide) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-serif text-3xl font-bold text-[#103D35] mb-4">
          Guide Article Not Found
        </h1>
        <p className="text-sm text-stone-600 mb-6">
          The requested travel guide or blog article is currently unavailable.
        </p>
        <button
          onClick={() => navigate('/travel-guides')}
          className="px-5 py-2.5 bg-[#103D35] text-white text-xs font-semibold rounded-xl"
        >
          View All Travel Guides
        </button>
      </div>
    );
  }

  // Related destinations & packages
  const relatedDestinations = destinationsData.filter((d) =>
    guide.relatedDestinationSlugs.includes(d.slug) || guide.relatedDestinationSlugs.includes(d.id)
  );

  const relatedPackages = tourPackagesData.filter((p) =>
    guide.relatedPackageSlugs.includes(p.slug) || guide.relatedPackageSlugs.includes(p.id)
  );

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappInquiryUrl = buildWhatsAppUrl(
    buildGeneralWhatsAppMessage(`Hi Sikkim Tour Co., I was reading your article "${guide.title}" and would like assistance planning this route.`)
  );

  return (
    <div className="pt-24 pb-24 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6 flex-wrap" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="hover:text-stone-800 transition-colors"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <a
            href="/travel-guides"
            onClick={(e) => {
              e.preventDefault();
              navigate('/travel-guides');
            }}
            className="hover:text-stone-800 transition-colors"
          >
            Blog & Guides
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#3B7FA3] font-medium">{guide.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#103D35] font-semibold truncate max-w-[200px]">
            {guide.title}
          </span>
        </nav>

        {/* Main Article Container */}
        <article className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xl card-3d-interactive">
          {/* Hero Banner Image */}
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-stone-900">
            <img
              src={guide.heroImage}
              alt={guide.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-[#103D35] text-[#EBA94B] text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                {guide.category}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-3 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#EBA94B]" />
                  <span>{guide.publishedDate}</span>
                </span>
                <span aria-hidden="true">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#EBA94B]" />
                  <span>{guide.readTime}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-12 space-y-8">
            {/* Header Title & Intro */}
            <header className="border-b border-stone-200 pb-8 space-y-4">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#103D35] leading-[1.15]">
                {guide.title}
              </h1>

              {/* Author & Share Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={guide.author.avatar}
                    alt={guide.author.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#EBA94B]"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#103D35]">
                      {guide.author.name}
                    </p>
                    <p className="text-[11px] text-stone-500 font-light">
                      {guide.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-all"
                    title="Copy Article Link"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-stone-500" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Lead Intro Quote */}
              <p className="text-sm sm:text-base text-stone-700 font-light leading-relaxed pt-2 italic border-l-4 border-[#EBA94B] pl-4 bg-stone-50/70 py-3 rounded-r-xl">
                {guide.intro}
              </p>
            </header>

            {/* Key Takeaways & GEO Quick Summary Callout */}
            {guide.keyTakeaways && guide.keyTakeaways.length > 0 && (
              <div className="bg-[#103D35]/5 border border-[#103D35]/20 rounded-2xl p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[#103D35] uppercase tracking-wider font-mono">
                  <Sparkles className="w-4 h-4 text-[#EBA94B]" />
                  <span>Key Takeaways & Quick Insights</span>
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-stone-800">
                  {guide.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Table of Contents */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 text-xs">
              <p className="font-bold text-[#103D35] uppercase tracking-wider text-[11px] mb-2.5 flex items-center gap-1.5 font-mono">
                <List className="w-3.5 h-3.5 text-[#3B7FA3]" />
                <span>In This Article</span>
              </p>
              <ul className="space-y-1.5 text-stone-700 font-medium">
                {guide.contentSections.map((sec, idx) => (
                  <li key={idx}>
                    <a
                      href={`#section-${idx}`}
                      className="hover:text-[#3B7FA3] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#EBA94B]">→</span>
                      <span>{sec.heading}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content Sections */}
            <div className="space-y-10 text-xs sm:text-sm text-stone-800 leading-relaxed font-light">
              {guide.contentSections.map((sec, idx) => (
                <section key={idx} id={`section-${idx}`} className="space-y-3.5 scroll-mt-28">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103D35] pt-2">
                    {sec.heading}
                  </h2>
                  {sec.body.map((para, pIdx) => (
                    <p key={pIdx} className="leading-relaxed text-stone-700">
                      {para}
                    </p>
                  ))}
                  {sec.callout && (
                    <div className="p-4 sm:p-5 bg-[#F4F1EA] border-l-4 border-[#103D35] text-xs sm:text-sm text-stone-800 rounded-r-xl my-4 font-normal">
                      {sec.callout}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* In-Article Booking & Route Consultation Banner */}
            <div className="my-8 p-6 sm:p-7 bg-gradient-to-r from-[#103D35] to-[#1a4a40] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg border border-[#EBA94B]/30">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#DFC89E] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#EBA94B]" />
                  <span>Direct Gangtok Mountain Operations</span>
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                  Planning this Sikkim route or circuit?
                </h4>
                <p className="text-xs text-white/85 max-w-lg leading-relaxed font-light">
                  Get personalized day-by-day itineraries, verified 4x4 mountain vehicles (Innova Crysta / Scorpio), and 100% Indian Army permit clearances handled by our Gangtok desk.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2.5 shrink-0 w-full sm:w-auto">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enquire on WhatsApp</span>
                </a>
                <button
                  onClick={() => navigate('/customise-trip')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                >
                  <span>Get Custom Quote</span>
                </button>
              </div>
            </div>

            {/* Interactive FAQs Accordion (If Present) */}
            {guide.faqs && guide.faqs.length > 0 && (
              <div className="pt-8 border-t border-stone-100 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#103D35] uppercase tracking-wider font-mono">
                  <HelpCircle className="w-4 h-4 text-[#EBA94B]" />
                  <span>Frequently Asked Questions</span>
                </div>
                <div className="space-y-3">
                  {guide.faqs.map((faq, fIdx) => (
                    <details
                      key={fIdx}
                      className="group border border-stone-200 rounded-xl bg-stone-50/60 p-4 open:bg-white open:shadow-xs transition-all"
                    >
                      <summary className="font-bold text-xs sm:text-sm text-stone-900 cursor-pointer list-none flex items-center justify-between gap-3">
                        <span>{faq.question}</span>
                        <span className="text-stone-400 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="pt-2.5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 mt-2.5">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}

            {/* Tags Cloud */}
            <div className="pt-6 border-t border-stone-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-stone-500 mr-1">Related Tags:</span>
              {guide.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Bio Box */}
            <div className="p-6 sm:p-8 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center sm:items-start gap-5">
              <img
                src={guide.author.avatar}
                alt={guide.author.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#EBA94B] shrink-0"
              />
              <div className="space-y-2 text-center sm:text-left">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#103D35]">
                    About {guide.author.name}
                  </h3>
                  <p className="text-xs text-[#3B7FA3] font-medium">
                    {guide.author.role}
                  </p>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  A lifelong resident of Sikkim, {guide.author.name.split(' ')[0]} works with our Gangtok operations desk coordinating alpine expeditions, monastery clearances, and army checkpost compliance.
                </p>
                <div className="pt-1">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#103D35] hover:text-[#EBA94B] transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Ask {guide.author.name.split(' ')[0]} a Question on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Related Destinations */}
            {relatedDestinations.length > 0 && (
              <div className="pt-8 border-t border-stone-100 space-y-3">
                <h3 className="font-serif text-xl font-bold text-[#103D35]">
                  Destinations Covered in This Guide
                </h3>
                <div className="flex flex-wrap gap-2">
                  {relatedDestinations.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => navigate(`/destinations/${d.id}`)}
                      className="px-3.5 py-2 bg-stone-100 hover:bg-[#103D35] hover:text-white text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#EBA94B]" />
                      <span>{d.name} ({d.district})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Tour Packages */}
        {relatedPackages.length > 0 && (
          <div className="mt-14 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#3B7FA3] font-mono mb-1">
                  Turn This Guide Into Your Next Journey
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#103D35]">
                  Recommended Tour Packages
                </h3>
              </div>
              <button
                onClick={() => navigate('/packages')}
                className="text-xs font-bold text-[#103D35] hover:text-[#EBA94B] transition-colors flex items-center gap-1"
              >
                <span>View All 15 Packages</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPackages.map((pkg) => (
                <PackageCard key={pkg.id} tourPackage={pkg} />
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/travel-guides')}
            className="inline-flex items-center gap-2 py-3 px-6 bg-white border border-stone-200 text-stone-800 text-xs font-bold rounded-xl hover:bg-stone-50 transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#103D35]" />
            <span>Back to All Mountain Guides & Stories</span>
          </button>
        </div>
      </div>
    </div>
  );
};
