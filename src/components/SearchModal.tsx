import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { searchSite, SearchCategory, SearchItem, getSearchIndex } from '../utils/searchIndex';
import {
  Search,
  X,
  MapPin,
  Package,
  BookOpen,
  Sparkles,
  Compass,
  ArrowRight,
  CornerDownLeft,
  Calendar,
  Mountain,
  Tag,
  Star,
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { navigate } = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<SearchCategory>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Perform search
  const results = useMemo(() => {
    return searchSite(query, selectedCategory);
  }, [query, selectedCategory]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results, selectedCategory]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
      } else if (e.key === 'Enter') {
        if (results.length > 0 && results[selectedIndex]) {
          e.preventDefault();
          handleSelect(results[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex]);

  // Auto-scroll highlighted item into view
  useEffect(() => {
    if (listRef.current && results.length > 0) {
      const activeElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (activeElement) {
        activeElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [selectedIndex, results]);

  const handleSelect = (item: SearchItem) => {
    onClose();
    navigate(item.url);
  };

  const popularSearches = [
    { label: 'Gurudongmar Lake (17,800 ft)', q: 'Gurudongmar' },
    { label: 'Grand Sikkim Odyssey (14 Days)', q: '14 Days' },
    { label: 'Pelling Kanchenjunga Sunrise', q: 'Pelling' },
    { label: 'North Sikkim Permits & Visas', q: 'Permits' },
    { label: 'Ravangla Buddha Park', q: 'Buddha Park' },
    { label: 'Tsomgo Lake & Nathula Pass', q: 'Tsomgo' },
    { label: 'Temi Organic Tea Estate', q: 'Temi' },
    { label: 'Best Time to Visit', q: 'Weather' },
  ];

  if (!isOpen) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'destinations':
        return <Compass className="w-4 h-4 text-emerald-700" />;
      case 'spots':
        return <Mountain className="w-4 h-4 text-[#527568]" />;
      case 'packages':
        return <Package className="w-4 h-4 text-[#C4A36A]" />;
      case 'guides':
        return <BookOpen className="w-4 h-4 text-sky-700" />;
      case 'experiences':
        return <Sparkles className="w-4 h-4 text-amber-600" />;
      default:
        return <MapPin className="w-4 h-4 text-stone-500" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'destinations':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'spots':
        return 'bg-[#527568]/10 text-[#173D35] border-[#527568]/20';
      case 'packages':
        return 'bg-[#C4A36A]/15 text-[#173D35] border-[#C4A36A]/30 font-semibold';
      case 'guides':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'experiences':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Quick Search Destinations, Packages, and Guides"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-2xl border border-stone-200 overflow-hidden my-6 sm:my-10 transition-all flex flex-col max-h-[85vh]">
        {/* Top Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 sm:px-6 sm:py-4 border-b border-stone-200 bg-[#F8F6F0]/60">
          <Search className="w-5 h-5 text-[#527568] shrink-0 mr-3" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Sikkim destinations, 14-day packages, permits, spots..."
            className="w-full bg-transparent text-sm sm:text-base text-stone-900 placeholder:text-stone-400 focus:outline-hidden"
            aria-label="Search Sikkim destinations, tour packages, tourist spots, and travel guides"
          />
          {query ? (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 text-stone-400 hover:text-stone-700 transition-colors mr-2 rounded-full hover:bg-stone-200/60"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono text-stone-500 bg-stone-200/70 border border-stone-300 rounded mr-2">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 rounded-md transition-colors"
            aria-label="Close search modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 border-b border-stone-200/80 bg-white overflow-x-auto scrollbar-thin text-xs">
          <span className="text-stone-400 font-medium shrink-0 mr-1 hidden sm:inline">Filter:</span>
          {[
            { id: 'all', label: 'All Results' },
            { id: 'destinations', label: 'Districts' },
            { id: 'spots', label: 'Tourist Spots' },
            { id: 'packages', label: 'Tour Packages' },
            { id: 'guides', label: 'Travel Guides' },
            { id: 'experiences', label: 'Experiences' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as SearchCategory)}
              className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-medium ${
                selectedCategory === cat.id
                  ? 'bg-[#173D35] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results List / Suggested Queries */}
        <div ref={listRef} className="overflow-y-auto p-4 sm:p-6 space-y-2 flex-1 scrollbar-thin">
          {query.trim().length === 0 ? (
            /* Empty State: Popular searches & Quick shortcuts */
            <div className="space-y-6 py-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#C4A36A]" />
                  <span>Popular Searches in Sikkim</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(s.q)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#F8F6F0] hover:bg-[#173D35] hover:text-white text-stone-700 text-xs font-medium border border-stone-200/80 transition-all text-left"
                    >
                      <Search className="w-3 h-3 text-[#527568]" />
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#C4A36A]" />
                  <span>Explore Direct Sections</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => {
                      onClose();
                      navigate('/packages');
                    }}
                    className="p-3 rounded-md bg-stone-50 hover:bg-[#173D35]/5 border border-stone-200/70 text-left flex items-start gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-sm bg-[#173D35] text-white flex items-center justify-center shrink-0">
                      <Package className="w-4 h-4 text-[#DFC89E]" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800 group-hover:text-[#173D35]">
                        All Tour Packages
                      </div>
                      <div className="text-[11px] text-stone-500">
                        14-day grand circuit, North Sikkim 6D, Honeymoon
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      navigate('/destinations');
                    }}
                    className="p-3 rounded-md bg-stone-50 hover:bg-[#173D35]/5 border border-stone-200/70 text-left flex items-start gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-sm bg-[#527568] text-white flex items-center justify-center shrink-0">
                      <Mountain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800 group-hover:text-[#173D35]">
                        All 4 Sikkim Districts
                      </div>
                      <div className="text-[11px] text-stone-500">
                        North, East, West & South tourist spots with history
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      navigate('/travel-guides');
                    }}
                    className="p-3 rounded-md bg-stone-50 hover:bg-[#173D35]/5 border border-stone-200/70 text-left flex items-start gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-sm bg-[#202724] text-white flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4 text-[#DFC89E]" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800 group-hover:text-[#173D35]">
                        Travel Guides & Permits
                      </div>
                      <div className="text-[11px] text-stone-500">
                        Seasonality, packing, acclimatisation, permit protocols
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onClose();
                      navigate('/reviews');
                    }}
                    className="p-3 rounded-md bg-stone-50 hover:bg-[#173D35]/5 border border-stone-200/70 text-left flex items-start gap-3 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-sm bg-[#C4A36A] text-[#173D35] flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 fill-[#173D35]" />
                    </div>
                    <div>
                      <div className="font-semibold text-stone-800 group-hover:text-[#173D35]">
                        Guest Reviews (4.4 Rating)
                      </div>
                      <div className="text-[11px] text-stone-500">
                        118+ verified domestic Indian and international reviews
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            /* No Results Found */
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-editorial text-lg font-bold text-stone-800">
                No results found for “{query}”
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching with a district name (e.g. North Sikkim), attraction (e.g. Gurudongmar, Pelling, Tsomgo), or travel topic (e.g. 14 Days, Permits, Honeymoon).
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setQuery('')}
                  className="px-4 py-2 text-xs font-semibold text-[#173D35] bg-[#F8F6F0] hover:bg-stone-200 rounded-sm transition-colors"
                >
                  Clear search query
                </button>
              </div>
            </div>
          ) : (
            /* Results List */
            <div className="space-y-2">
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider px-1 pb-1 flex items-center justify-between">
                <span>{results.length} Matches Found</span>
                <span className="text-[10px] lowercase text-stone-400 font-normal">
                  Use ↑ ↓ to navigate · Enter to select
                </span>
              </div>

              {results.map((item, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    data-index={index}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`group relative p-3 sm:p-3.5 rounded-md border transition-all cursor-pointer flex items-start gap-3 sm:gap-4 ${
                      isSelected
                        ? 'bg-[#173D35]/5 border-[#173D35]/40 shadow-xs'
                        : 'bg-white hover:bg-stone-50/80 border-stone-200/70'
                    }`}
                  >
                    {/* Thumbnail or Icon */}
                    {item.imageUrl ? (
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden shrink-0 bg-stone-200 relative border border-stone-200">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#F8F6F0] border border-stone-200/80 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors">
                        {getCategoryIcon(item.category)}
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs border ${getCategoryBadgeClass(
                            item.category
                          )}`}
                        >
                          {item.categoryLabel}
                        </span>

                        {item.badge && (
                          <span className="text-[11px] text-stone-500 font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h4
                        className={`font-editorial text-base sm:text-lg font-bold truncate transition-colors ${
                          isSelected ? 'text-[#173D35]' : 'text-stone-900 group-hover:text-[#173D35]'
                        }`}
                      >
                        {item.title}
                      </h4>

                      <p className="text-xs text-stone-600 line-clamp-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Jump Arrow */}
                    <div className="shrink-0 self-center pl-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#173D35] text-white shadow-xs'
                            : 'text-stone-300 group-hover:text-stone-700'
                        }`}
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts hint */}
        <div className="px-4 sm:px-6 py-2.5 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">
                ↓
              </kbd>
              <span>to navigate</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">
                ↵
              </kbd>
              <span>to select</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-stone-300 rounded font-mono text-[10px]">
                esc
              </kbd>
              <span>to close</span>
            </span>
          </div>
          <div className="text-[10px] text-[#527568] font-semibold">
            Sikkim Tour Co. · "Your Journey. Our Mountains."
          </div>
        </div>
      </div>
    </div>
  );
};
