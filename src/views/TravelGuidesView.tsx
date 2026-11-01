import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { travelGuidesData, TravelGuide } from '../data/guides';
import {
  STARTER_100_BLOGS,
  BLOG_DESTINATIONS,
  DEPARTURE_CITIES,
  TRAVELLER_TYPES,
  BlogTopic,
} from '../data/blogTopics';
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
  Filter,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Layers,
  SlidersHorizontal,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { buildGeneralWhatsAppMessage, buildWhatsAppUrl } from '../config/site';

const MATRIX_CATEGORIES = [
  'All',
  'Permits and Rules',
  'Costs and Planning',
  'Best Time and Weather',
  'Roads and Getting There',
  'Places and Experiences',
  'Stays and Food',
  'Health and Safety',
  'Comparisons and Decisions',
  'Culture and Seasonal',
  'Photography and Offbeat',
  'Practical Q&A',
  'From Your Own Operation',
];

const INTENT_OPTIONS = [
  'All Intents',
  'cost',
  'itinerary',
  'permits',
  'best time',
  'road conditions',
  'safety',
  'where to stay',
  'food',
  'things to do',
  'comparison',
  'culture',
];

export const TravelGuidesView: React.FC = () => {
  const { navigate } = useRouter();

  // Active top-level tab
  const [activeTab, setActiveTab] = useState<'published' | 'matrix'>('published');

  // Tab 1 (Published Guides) state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Tab 2 (100 Starter Topics & Combination Matrix) state
  const [matrixCategory, setMatrixCategory] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedTraveller, setSelectedTraveller] = useState<string>('All');
  const [selectedIntent, setSelectedIntent] = useState<string>('All Intents');
  const [selectedDestination, setSelectedDestination] = useState<string>('All');
  const [matrixSearch, setMatrixSearch] = useState<string>('');

  // Extract unique categories for Tab 1
  const publishedCategories = useMemo(() => {
    const cats = Array.from(new Set(travelGuidesData.map((g) => g.category)));
    return ['All', ...cats];
  }, []);

  // Filtered published guides
  const filteredPublishedGuides = useMemo(() => {
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

  // Featured Lead Story
  const featuredGuide = travelGuidesData[0];

  // Filtered 100 Topics for Matrix
  const filteredMatrixTopics = useMemo(() => {
    return STARTER_100_BLOGS.filter((topic) => {
      const matchesCat =
        matrixCategory === 'All' || topic.category === matrixCategory;

      const matchesIntent =
        selectedIntent === 'All Intents' || topic.intent === selectedIntent;

      const matchesCity =
        selectedCity === 'All' ||
        !topic.departureHub ||
        topic.departureHub.toLowerCase().includes(selectedCity.toLowerCase()) ||
        topic.summary.toLowerCase().includes(selectedCity.toLowerCase());

      const matchesTraveller =
        selectedTraveller === 'All' ||
        topic.targetAudience === 'All Travelers' ||
        topic.targetAudience.toLowerCase().includes(selectedTraveller.toLowerCase());

      const matchesDest =
        selectedDestination === 'All' ||
        topic.destinationsCovered.some((d) =>
          d.toLowerCase().includes(selectedDestination.toLowerCase())
        );

      const q = matrixSearch.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        topic.title.toLowerCase().includes(q) ||
        topic.targetKeyword.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.keyInsight.toLowerCase().includes(q) ||
        topic.destinationsCovered.some((d) => d.toLowerCase().includes(q));

      return (
        matchesCat &&
        matchesIntent &&
        matchesCity &&
        matchesTraveller &&
        matchesDest &&
        matchesSearch
      );
    });
  }, [
    matrixCategory,
    selectedIntent,
    selectedCity,
    selectedTraveller,
    selectedDestination,
    matrixSearch,
  ]);

  // Reset matrix filters
  const resetMatrixFilters = () => {
    setMatrixCategory('All');
    setSelectedCity('All');
    setSelectedTraveller('All');
    setSelectedIntent('All Intents');
    setSelectedDestination('All');
    setMatrixSearch('');
  };

  // Helper for generating custom combination query string
  const customCombinationTitle = useMemo(() => {
    const parts: string[] = [];
    if (selectedDestination !== 'All') {
      parts.push(selectedDestination);
    } else {
      parts.push('Sikkim');
    }

    if (selectedIntent !== 'All Intents') {
      parts.push(selectedIntent);
    }

    if (selectedCity !== 'All') {
      parts.push(`from ${selectedCity}`);
    }

    if (selectedTraveller !== 'All') {
      parts.push(`for ${selectedTraveller}`);
    }

    if (parts.length === 1 && parts[0] === 'Sikkim') {
      return 'Sikkim Expedition Planner & Combination Matrix';
    }
    return parts.join(' • ');
  }, [selectedDestination, selectedIntent, selectedCity, selectedTraveller]);

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
                Sikkim Travel Blog & Knowledge Matrix
              </h1>
              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light max-w-2xl">
                Authored by local Gangtok mountaineers, certified high-altitude chauffeurs, and cultural stewards. Covering 40 destinations, 15 departure cities, and 100 starter authority guides with zero automated fluff and real INR prices.
              </p>
            </div>

            {/* Direct WhatsApp Concierge Help Badge */}
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-xs text-white max-w-sm flex items-start gap-3">
              <MessageCircle className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Need immediate route advice?</p>
                <p className="text-white/80 text-[11px] mt-0.5">
                  Chat directly with our Gangtok operations desk for live permit clearances, road status, and bespoke quotes.
                </p>
                <a
                  href={buildWhatsAppUrl(
                    buildGeneralWhatsAppMessage('Hi Sikkim Tour Co., I was reading your travel blog and need route guidance.')
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-2 font-bold text-[#EBA94B] hover:text-white transition-colors"
                >
                  <span>Ask Local Operations Desk</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Metrics Counter */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 pt-8 border-t border-white/15 text-xs text-white/80 font-mono">
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[#EBA94B] font-bold text-base block font-sans">40 Destinations</span>
              <span>Gangtok to Gurudongmar & Dzongu</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[#EBA94B] font-bold text-base block font-sans">15 Departure Hubs</span>
              <span>Kolkata, Delhi, Mumbai, Bangalore...</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[#EBA94B] font-bold text-base block font-sans">8 Traveller Types</span>
              <span>Honeymoon, Families, Seniors, Solo...</span>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-lg border border-white/10">
              <span className="text-[#EBA94B] font-bold text-base block font-sans">100 Authority Topics</span>
              <span>Permits, Costs, Weather, Roads & Safety</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Navigation Switcher Bar (Tabs) */}
        <div className="bg-white rounded-2xl p-2 sm:p-3 shadow-lg border border-stone-200 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 card-3d-interactive">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('published')}
              className={`flex-1 sm:flex-none px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'published'
                  ? 'bg-[#103D35] text-white shadow-md'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#EBA94B]" />
              <span>Published Deep-Dive Guides ({travelGuidesData.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex-1 sm:flex-none px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === 'matrix'
                  ? 'bg-[#103D35] text-white shadow-md'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              <Layers className="w-4 h-4 text-[#EBA94B]" />
              <span>100-Topic Editorial Knowledge Matrix</span>
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#EBA94B] text-[#103D35] font-extrabold">
                100
              </span>
            </button>
          </div>

          <div className="text-[11px] text-stone-500 flex items-center gap-2 px-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Updated weekly from local Gangtok operations logbooks</span>
          </div>
        </div>

        {/* TAB 1: PUBLISHED DEEP-DIVE GUIDES */}
        {activeTab === 'published' && (
          <div>
            {/* Search & Category Filter Bar */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-stone-200 mb-10 card-3d-interactive">
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
                  {publishedCategories.map((cat) => {
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
                  {selectedCategory === 'All'
                    ? 'Latest Mountain Stories & Deep-Dive Guides'
                    : `${selectedCategory} (${filteredPublishedGuides.length})`}
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  Showing {filteredPublishedGuides.length}{' '}
                  {filteredPublishedGuides.length === 1 ? 'article' : 'articles'}
                </span>
              </div>

              {filteredPublishedGuides.length === 0 ? (
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
                  {filteredPublishedGuides.map((guide) => (
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
          </div>
        )}

        {/* TAB 2: 100 STARTER TOPICS & TRAVEL COMBINATION MATRIX */}
        {activeTab === 'matrix' && (
          <div className="space-y-8">
            {/* Interactive Combination Builder Box */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md card-3d-interactive">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3B7FA3] font-mono mb-1">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#EBA94B]" />
                    <span>Interactive Combination Matrix</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#103D35]">
                    Explore 100 Starter Topics by City, Audience & Intent
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 mt-1">
                    Combine your departure city with traveller profiles to find tailored route recommendations, honest costs, and permit rules.
                  </p>
                </div>

                <button
                  onClick={resetMatrixFilters}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-xl transition-all shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                  <span>Reset All Filters</span>
                </button>
              </div>

              {/* 4 Multi-Select Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* 1. Departure Hub */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    Departure City (15 Hubs)
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#103D35]"
                  >
                    <option value="All">All Departure Cities</option>
                    {DEPARTURE_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Traveller Type */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    Traveller Type (8 Profiles)
                  </label>
                  <select
                    value={selectedTraveller}
                    onChange={(e) => setSelectedTraveller(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#103D35]"
                  >
                    <option value="All">All Traveller Profiles</option>
                    {TRAVELLER_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Primary Intent */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    Travel Intent
                  </label>
                  <select
                    value={selectedIntent}
                    onChange={(e) => setSelectedIntent(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#103D35]"
                  >
                    {INTENT_OPTIONS.map((i) => (
                      <option key={i} value={i}>
                        {i === 'All Intents' ? 'All Travel Intents' : i.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Target Destination */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                    Destination Spot (~40)
                  </label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-800 font-medium focus:outline-none focus:ring-2 focus:ring-[#103D35]"
                  >
                    <option value="All">All 40 Destinations</option>
                    {BLOG_DESTINATIONS.slice(0, 20).map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Dynamic Combination Banner with WhatsApp Direct Inquiry */}
              <div className="bg-[#103D35] text-white rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#EBA94B] font-bold">
                    Custom Route Search Combination
                  </span>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-0.5">
                    &ldquo;{customCombinationTitle}&rdquo;
                  </h3>
                  <p className="text-xs text-white/80 mt-1 max-w-2xl font-light">
                    Looking for a specific trip combination like &ldquo;Sikkim trip cost from Mumbai for 6 days&rdquo; or &ldquo;North Sikkim for senior citizens: is it safe?&rdquo; We customize every route with local vehicles.
                  </p>
                </div>

                <a
                  href={buildWhatsAppUrl(
                    buildGeneralWhatsAppMessage(
                      `Hi Sikkim Tour Co., I am inquiring about planning a trip based on this topic combination: "${customCombinationTitle}". Please share permit rules, vehicle options, and realistic costs.`
                    )
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-xl transition-all shadow-md shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Request Custom Quote on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Category Filter Pills & Search for the 100 Topics */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-sm">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <div className="relative w-full md:w-96 shrink-0">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={matrixSearch}
                    onChange={(e) => setMatrixSearch(e.target.value)}
                    placeholder="Search 100 starter titles, keywords, rules..."
                    className="w-full pl-9 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#103D35]"
                  />
                  {matrixSearch && (
                    <button
                      onClick={() => setMatrixSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="text-xs text-stone-500 font-mono ml-auto">
                  Showing {filteredMatrixTopics.length} of {STARTER_100_BLOGS.length} Starter Topics
                </div>
              </div>

              {/* Category Pills (12 Categories) */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {MATRIX_CATEGORIES.map((cat) => {
                  const isSelected = matrixCategory === cat;
                  const count =
                    cat === 'All'
                      ? STARTER_100_BLOGS.length
                      : STARTER_100_BLOGS.filter((t) => t.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setMatrixCategory(cat)}
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

            {/* 100 Topics Grid */}
            {filteredMatrixTopics.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
                <Compass className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-stone-800">No topics match your filters</h3>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Try broadening your search term or reset destination and departure city filters.
                </p>
                <button
                  onClick={resetMatrixFilters}
                  className="mt-4 px-4 py-2 bg-[#103D35] text-white text-xs font-semibold rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMatrixTopics.map((topic) => {
                  const hasPublishedGuide = Boolean(topic.publishedGuideSlug);

                  return (
                    <div
                      key={topic.id}
                      className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all card-3d-interactive group"
                    >
                      <div>
                        {/* Header: Number, Category & Publication Status */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-[11px] font-mono font-bold text-[#EBA94B] bg-[#103D35] px-2.5 py-0.5 rounded-full">
                            #{topic.id}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-600 text-[10px] font-semibold">
                              {topic.category}
                            </span>
                            {hasPublishedGuide ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>Published</span>
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium">
                                Scheduled / In Desk
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-lg font-bold text-[#103D35] leading-snug mb-2 group-hover:text-[#3B7FA3] transition-colors">
                          {hasPublishedGuide ? (
                            <a
                              href={`/travel-guides/${topic.publishedGuideSlug}`}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(`/travel-guides/${topic.publishedGuideSlug}`);
                              }}
                            >
                              {topic.title}
                            </a>
                          ) : (
                            topic.title
                          )}
                        </h3>

                        {/* Keyword & Target Audience */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-3 text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-[#F8F6F0] text-stone-600 border border-stone-200">
                            Audience: <strong>{topic.targetAudience}</strong>
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[#F8F6F0] text-stone-600 border border-stone-200 uppercase">
                            Intent: <strong>{topic.intent}</strong>
                          </span>
                          {topic.departureHub && (
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                              Hub: {topic.departureHub}
                            </span>
                          )}
                        </div>

                        {/* Summary */}
                        <p className="text-xs text-stone-600 leading-relaxed font-light mb-4">
                          {topic.summary}
                        </p>

                        {/* Local Gangtok Desk Insight */}
                        <div className="bg-[#F8F6F0] rounded-xl p-3 border-l-2 border-[#EBA94B] text-[11px] text-stone-700 mb-4 space-y-1">
                          <span className="font-bold text-[#103D35] block text-[10px] uppercase font-mono tracking-wider">
                            Local Chauffeur & Desk Note:
                          </span>
                          <p className="leading-relaxed">{topic.keyInsight}</p>
                        </div>

                        {/* Destinations Covered */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {topic.destinationsCovered.map((dest, dIdx) => (
                            <span
                              key={dIdx}
                              className="px-1.5 py-0.5 bg-stone-100 text-stone-500 rounded text-[9px]"
                            >
                              📍 {dest}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                        {hasPublishedGuide ? (
                          <button
                            onClick={() => navigate(`/travel-guides/${topic.publishedGuideSlug}`)}
                            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#103D35] hover:bg-[#0A2621] text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                          >
                            <span>Read Full 1,500+ Word Guide</span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#EBA94B]" />
                          </button>
                        ) : (
                          <a
                            href={buildWhatsAppUrl(
                              buildGeneralWhatsAppMessage(
                                `Hi Sikkim Tour Co., I saw Starter Topic #${topic.id}: "${topic.title}". Could you provide advice on this specific route and booking requirements?`
                              )
                            )}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-stone-100 hover:bg-[#25D366] hover:text-white text-stone-700 text-xs font-semibold rounded-xl transition-all group/wa"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover/wa:text-white" />
                            <span>Ask Route Desk on WhatsApp</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Editorial Standard & Rankability Guarantee */}
            <div className="bg-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-200 text-stone-800 text-xs">
              <div className="flex items-center gap-2 mb-2 font-mono text-[#103D35] font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Our Editorial & Publishing Protocol</span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#103D35] mb-2">
                Why We Never Bulk-Dump Unedited Content
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-stone-600 leading-relaxed font-light mt-3">
                <div className="bg-white p-4 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block font-serif font-bold mb-1">
                    1. One Dedicated Keyword Per Post
                  </strong>
                  No auto-generated duplicate city spam. Every article targets one clean search term with distinct driving routes and regional constraints.
                </div>
                <div className="bg-white p-4 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block font-serif font-bold mb-1">
                    2. 100% Fact-Checked Fares & Permits
                  </strong>
                  Real rupee quotes (e.g. ₹18,000 to ₹25,000 per person), exact Army permit document mandates (original Voter ID / Passport), and road checkpost timings.
                </div>
                <div className="bg-white p-4 rounded-xl border border-stone-200">
                  <strong className="text-stone-900 block font-serif font-bold mb-1">
                    3. Steady Weekly Releases
                  </strong>
                  Published steadily at 2 to 3 guides per week directly from driver logbooks and guest route reviews, maintaining high search engine trust.
                </div>
              </div>
            </div>
          </div>
        )}

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
