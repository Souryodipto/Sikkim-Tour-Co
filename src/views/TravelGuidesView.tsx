import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { travelGuidesData, TravelGuide } from '../data/guides';
import {
  BookOpen,
  Calendar,
  Clock,
  ChevronRight,
  Search,
  Sparkles,
  Mountain,
  ShieldCheck,
  Send,
  MessageCircle,
  Tag,
  Compass,
} from 'lucide-react';
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from '../config/site';

export const TravelGuidesView: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract all unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(travelGuidesData.map((g) => g.category)));
    return ['All', ...cats];
  }, []);

  // Filtered guides based on category and search
  const filteredGuides = useMemo(() => {
    return travelGuidesData.filter((guide) => {
      const matchesCategory =
        selectedCategory === 'All' || guide.category === selectedCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.intro.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Featured Lead Story (e.g. 14-Day Circuit or Gurudongmar)
  const featuredGuide = travelGuidesData[0];

  return (
    <div className="pt-24 pb-24 bg-[#F8F6F0] min-h-screen">
      {/* Hero Header */}
      <div className="bg-[#103D35] text-white py-14 sm:py-20 border-b border-[#3B7FA3]/30 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#EBA94B]/15 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-[#EBA94B]/50 text-xs font-semibold text-[#EBA94B] uppercase tracking-wider mb-4">
                <BookOpen className="w-3.5 h-3.5 text-[#EBA94B]" />
                <span>Sikkim Mountain Chronicles & Local Editorial</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-4">
                Sikkim Travel Blog & Guides
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light max-w-2xl">
                Written by local Gangtok mountaineers, cultural stewards, and expedition leaders. Authoritative advice on high-altitude passes, army permit compliance, monastery rituals, road trip routes, and authentic mountain cuisine.
              </p>
            </div>

            {/* Direct WhatsApp Concierge Help Badge */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-xs text-white max-w-sm flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Have a specific route question?</p>
                <p className="text-white/80 text-[11px] mt-0.5">
                  Chat directly with our Gangtok operations desk for real-time permit checks and custom itineraries.
                </p>
                <a
                  href={buildWhatsAppUrl(
                    buildGeneralWhatsAppMessage('Hi Sikkim Tour Co., I was reading your travel blog and need route guidance.')
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 font-bold text-[#EBA94B] hover:text-white transition-colors"
                >
                  <span>Ask a Local Guide</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-stone-200 mb-10 card-3d-interactive">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, permits, passes..."
                className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#103D35]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                const count =
                  cat === 'All'
                    ? travelGuidesData.length
                    : travelGuidesData.filter((g) => g.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#103D35] text-white shadow-sm'
                        : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isSelected
                          ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Lead Story (Only displayed when on 'All' and no search query) */}
        {selectedCategory === 'All' && !searchQuery && featuredGuide && (
          <div className="mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-[#3B7FA3] mb-3 flex items-center gap-1.5 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>Editor&apos;s Featured Story</span>
            </div>

            <article className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all grid grid-cols-1 lg:grid-cols-12 group card-3d-interactive">
              {/* Photo Container */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden">
                <img
                  src={featuredGuide.heroImage}
                  alt={featuredGuide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#103D35] text-[#EBA94B] text-xs font-bold rounded-full shadow-md uppercase tracking-wider">
                    {featuredGuide.category}
                  </span>
                </div>
              </div>

              {/* Text Container */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-stone-500 mb-3">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-[#3B7FA3]" />
                      <span>{featuredGuide.publishedDate}</span>
                    </span>
                    <span aria-hidden="true">•</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-[#EBA94B]" />
                      <span>{featuredGuide.readTime}</span>
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103D35] leading-tight mb-4 group-hover:text-[#3B7FA3] transition-colors">
                    <a
                      href={`/travel-guides/${featuredGuide.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/travel-guides/${featuredGuide.slug}`);
                      }}
                    >
                      {featuredGuide.title}
                    </a>
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light mb-6 line-clamp-3">
                    {featuredGuide.intro}
                  </p>

                  {/* Key Takeaways Highlight */}
                  <div className="bg-[#F8F6F0] p-4 rounded-xl border-l-3 border-[#EBA94B] text-xs space-y-1.5 mb-6">
                    <p className="font-bold text-[#103D35] uppercase tracking-wider text-[10px]">
                      Why This Guide Matters:
                    </p>
                    <p className="text-stone-700 text-[11px] leading-relaxed">
                      {featuredGuide.keyTakeaways[0]}
                    </p>
                  </div>
                </div>

                {/* Author & Action */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={featuredGuide.author.avatar}
                      alt={featuredGuide.author.name}
                      className="w-8 h-8 rounded-full object-cover border border-[#EBA94B]"
                    />
                    <div>
                      <p className="text-xs font-bold text-[#103D35] leading-none">
                        {featuredGuide.author.name}
                      </p>
                      <p className="text-[10px] text-stone-500 mt-0.5">
                        Local Mountain Steward
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/travel-guides/${featuredGuide.slug}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#103D35] hover:bg-[#0A2621] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  >
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#EBA94B]" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Guides Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103D35]">
              {selectedCategory === 'All' ? 'Latest Mountain Stories & Guides' : `${selectedCategory} (${filteredGuides.length})`}
            </h2>
            <span className="text-xs text-stone-500 font-mono">
              Showing {filteredGuides.length} {filteredGuides.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredGuides.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
              <Compass className="w-10 h-10 text-stone-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-stone-800">No guides found</h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                No articles matched your search query &quot;{searchQuery}&quot;. Try adjusting your search term or select &quot;All&quot;.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-[#103D35] text-white text-xs font-semibold rounded-lg"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide) => (
                <article
                  key={guide.id}
                  className="bg-white rounded-2xl border border-stone-200 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group card-3d-interactive"
                >
                  <div>
                    {/* Hero Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-stone-100">
                      <img
                        src={guide.heroImage}
                        alt={guide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.8 bg-[#103D35]/90 backdrop-blur-md text-[#EBA94B] text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                          {guide.category}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-medium rounded-md flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5 text-[#EBA94B]" />
                          <span>{guide.readTime}</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-2">
                        <Calendar className="w-3 h-3 text-[#3B7FA3]" />
                        <span>{guide.publishedDate}</span>
                      </div>

                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#103D35] group-hover:text-[#3B7FA3] transition-colors mb-3 line-clamp-2 leading-snug">
                        <a
                          href={`/travel-guides/${guide.slug}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/travel-guides/${guide.slug}`);
                          }}
                        >
                          {guide.title}
                        </a>
                      </h3>

                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-4 font-light">
                        {guide.intro}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {guide.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-stone-50/80 border-t border-stone-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={guide.author.avatar}
                        alt={guide.author.name}
                        className="w-6 h-6 rounded-full object-cover border border-stone-300"
                      />
                      <span className="text-[11px] font-medium text-stone-700 truncate max-w-[110px]">
                        {guide.author.name.split(' ')[0]}
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/travel-guides/${guide.slug}`)}
                      className="inline-flex items-center gap-1 font-bold text-[#103D35] group-hover:text-[#EBA94B] transition-colors text-xs"
                    >
                      <span>Read Story</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Local Stewards & Author Trust Banner */}
        <div className="mt-16 bg-[#103D35] rounded-3xl p-8 sm:p-12 text-white border border-[#3B7FA3]/30 shadow-xl card-3d-interactive">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#EBA94B] mb-2 font-mono">
                <ShieldCheck className="w-4 h-4 text-[#EBA94B]" />
                <span>Locally Sourced Himalayan Insights</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-3">
                Why Sikkim Tour Co. Guides Lead In Authenticity
              </h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light max-w-2xl">
                Unlike mass-market content scrapers, our articles are authored on-site in Gangtok by local certified mountain guides who traverse these high border passes every week. We disclose real road realities, exact Army checkpost mandates, and seasonal weather micro-climates so you never face unpleasant surprises.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col gap-3 justify-center items-start md:items-end">
              <a
                href={buildWhatsAppUrl(
                  buildGeneralWhatsAppMessage('Hi Sikkim Tour Co., I want advice on planning an authentic Sikkim trip based on your travel guides.')
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Discuss Routes on WhatsApp</span>
              </a>
              <p className="text-[10px] text-white/60">
                Average reply time: under 15 minutes · Zero login
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
