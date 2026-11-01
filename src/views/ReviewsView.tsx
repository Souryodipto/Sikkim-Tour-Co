import React, { useState, useMemo } from 'react';
import { useRouter } from '../context/RouterContext';
import { getAllReviews, Review } from '../data/reviews';
import { ReviewCard } from '../components/ReviewCard';
import { WriteReviewModal } from '../components/WriteReviewModal';
import {
  Star,
  Search,
  Filter,
  Sparkles,
  ShieldCheck,
  Compass,
  MessageSquare,
  Globe,
  Users,
  ChevronLeft,
  ChevronRight,
  PenTool,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const { navigate } = useRouter();
  const [reviewsList, setReviewsList] = useState<Review[]>(() => getAllReviews());
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // Filters & State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'indian' | 'international' | '5-star' | '4-star' | '3-star' | 'family' | 'couple' | 'adventure' | '14-day'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'helpful'>('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Handle new review added
  const handleReviewSubmitted = (newReview: Review) => {
    setReviewsList((prev) => [newReview, ...prev]);
    setActiveTab('all');
    setCurrentPage(1);
  };

  // Filtered and sorted reviews
  const filteredReviews = useMemo(() => {
    return reviewsList
      .filter((rev) => {
        // Tab filter
        if (activeTab === 'indian' && rev.originType !== 'indian') return false;
        if (activeTab === 'international' && rev.originType !== 'international') return false;
        if (activeTab === '5-star' && rev.rating !== 5) return false;
        if (activeTab === '4-star' && rev.rating !== 4) return false;
        if (activeTab === '3-star' && rev.rating !== 3) return false;
        if (activeTab === 'family' && rev.tripStyle !== 'Family Tour' && rev.travellerType !== 'Family with Kids') return false;
        if (activeTab === 'couple' && rev.tripStyle !== 'Honeymoon' && rev.travellerType !== 'Couple') return false;
        if (activeTab === 'adventure' && rev.tripStyle !== 'Adventure' && rev.tripStyle !== 'Group Expedition') return false;
        if (activeTab === '14-day' && !rev.packageVisited.toLowerCase().includes('14') && !rev.reviewText.toLowerCase().includes('14')) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = rev.reviewTitle.toLowerCase().includes(q);
          const matchText = rev.reviewText.toLowerCase().includes(q);
          const matchAuthor = rev.authorName.toLowerCase().includes(q);
          const matchOrigin = rev.origin.toLowerCase().includes(q);
          const matchNationality = rev.nationality.toLowerCase().includes(q);
          const matchPkg = rev.packageVisited.toLowerCase().includes(q);
          return matchTitle || matchText || matchAuthor || matchOrigin || matchNationality || matchPkg;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'helpful') {
          return b.helpfulVotes - a.helpfulVotes;
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        // default recent
        return 0; // keeps original order with latest user created first
      });
  }, [reviewsList, activeTab, searchQuery, sortBy]);

  // Statistics calculation
  const totalReviews = reviewsList.length;
  const averageRating = (
    reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews
  ).toFixed(1);
  const fiveStarCount = reviewsList.filter((r) => r.rating === 5).length;
  const fourStarCount = reviewsList.filter((r) => r.rating === 4).length;
  const threeStarCount = reviewsList.filter((r) => r.rating === 3).length;
  const indianCount = reviewsList.filter((r) => r.originType === 'indian').length;
  const internationalCount = reviewsList.filter((r) => r.originType === 'international').length;

  // Pagination
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-6" aria-label="Breadcrumb">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            className="hover:text-stone-800"
          >
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#173D35] font-semibold">Traveller Reviews</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-white rounded-md border border-stone-200/90 p-8 sm:p-10 mb-10 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568]">
                <ShieldCheck className="w-4 h-4 text-[#C4A36A]" />
                <span>Verified Himalayan Traveler Registry</span>
              </div>
              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#173D35] leading-tight">
                Guest Reviews & Testimonials
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                Read authentic feedback from over {totalReviews} domestic Indian travelers and international guests who explored North, East, West, and South Sikkim with Sikkim Tour Co. Unedited, genuine ratings averaging {averageRating} / 5.0 reflecting real Himalayan adventures.
              </p>
            </div>

            {/* Scorecard Widget */}
            <div className="bg-[#173D35] text-white p-6 rounded-md border border-[#527568]/40 flex flex-col sm:flex-row items-center gap-6 shrink-0 shadow-sm">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="font-editorial text-5xl font-bold text-[#DFC89E]">
                    {averageRating}
                  </span>
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-0.5 text-[#C4A36A]">
                      {[1, 2, 3, 4].map((s) => (
                        <Star key={s} className="w-4 h-4 fill-[#C4A36A]" />
                      ))}
                      <div className="relative w-4 h-4">
                        <Star className="w-4 h-4 text-white/40" />
                        <div className="absolute inset-0 overflow-hidden w-[40%]">
                          <Star className="w-4 h-4 fill-[#C4A36A] text-[#C4A36A]" />
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] text-white/80 block font-medium">
                      out of 5.0 genuine rating
                    </span>
                  </div>
                </div>
                <p className="text-xs text-white/90 mt-2 font-medium">
                  {totalReviews}+ verified guest reviews ({indianCount} Indian · {internationalCount} International)
                </p>
              </div>

              <div className="border-t sm:border-t-0 sm:border-l border-white/20 pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto text-center sm:text-left space-y-2.5">
                <button
                  onClick={() => setIsWriteModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] font-semibold text-xs rounded-sm transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Write a Review</span>
                </button>

                <div className="flex flex-col gap-1.5 pt-1">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Sikkim+Tour+Co+Paljor+Stadium+Road+Gangtok"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#DFC89E] hover:underline flex items-center justify-center sm:justify-start gap-1"
                  >
                    <span>Check on Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar: 5-Star, 4-Star, 3-Star breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8 pt-8 border-t border-stone-100 text-center sm:text-left">
            <div>
              <span className="text-xs text-stone-400 block uppercase tracking-wider font-semibold">Average Rating</span>
              <span className="font-editorial text-2xl font-bold text-[#173D35]">{averageRating} / 5.0</span>
              <span className="text-[11px] text-stone-500 block">Genuine & Credible</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block uppercase tracking-wider font-semibold">5-Star Reviews</span>
              <span className="font-editorial text-2xl font-bold text-[#173D35]">{fiveStarCount}</span>
              <span className="text-[11px] text-stone-500 block">{Math.round((fiveStarCount / totalReviews) * 100)}% of guests</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block uppercase tracking-wider font-semibold">4-Star Reviews</span>
              <span className="font-editorial text-2xl font-bold text-[#173D35]">{fourStarCount}</span>
              <span className="text-[11px] text-stone-500 block">{Math.round((fourStarCount / totalReviews) * 100)}% of guests</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block uppercase tracking-wider font-semibold">3-Star Feedback</span>
              <span className="font-editorial text-2xl font-bold text-[#173D35]">{threeStarCount}</span>
              <span className="text-[11px] text-stone-500 block">{Math.round((threeStarCount / totalReviews) * 100)}% constructive</span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block uppercase tracking-wider font-semibold">Origin Mix</span>
              <span className="font-editorial text-2xl font-bold text-[#173D35]">{indianCount} / {internationalCount}</span>
              <span className="text-[11px] text-stone-500 block">Domestic · Foreign</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white rounded-md border border-stone-200/90 p-4 mb-8 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search reviews by name, city, country, destination (e.g. Gurudongmar, Pelling, driver, food)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 text-xs border border-stone-200 rounded-sm focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden bg-[#F8F6F0]/40"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0 text-xs">
              <span className="text-stone-500 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-xs border border-stone-200 rounded-sm bg-white focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden font-medium"
              >
                <option value="recent">Most Recent Reviews</option>
                <option value="helpful">Most Helpful First</option>
                <option value="rating">Highest Rating First</option>
              </select>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
            {[
              { id: 'all', label: `All Reviews (${totalReviews})` },
              { id: '5-star', label: `5-Star (${fiveStarCount})` },
              { id: '4-star', label: `4-Star (${fourStarCount})` },
              { id: '3-star', label: `3-Star (${threeStarCount})` },
              { id: 'indian', label: `Indian Guests (${indianCount})` },
              { id: 'international', label: `Foreign Guests (${internationalCount})` },
              { id: 'family', label: 'Family Trips' },
              { id: 'couple', label: 'Couples & Honeymoon' },
              { id: 'adventure', label: 'Adventure' },
              { id: '14-day', label: '14-Day Grand Expedition' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#173D35] text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6">
          <span>
            Showing <strong className="text-stone-800">{paginatedReviews.length}</strong> of{' '}
            <strong className="text-stone-800">{filteredReviews.length}</strong> reviews
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {filteredReviews.length > 0 && (
            <span>
              Page {currentPage} of {totalPages}
            </span>
          )}
        </div>

        {/* Reviews Grid */}
        {paginatedReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                onVoteChange={() => setReviewsList(getAllReviews())}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-md border border-stone-200/90 p-12 text-center max-w-md mx-auto">
            <h3 className="font-editorial text-xl font-bold text-[#173D35] mb-2">
              No matching reviews found
            </h3>
            <p className="text-xs text-stone-600 mb-6">
              Try adjusting your search terms or clearing your current filter tab.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="px-4 py-2 bg-[#173D35] text-white text-xs font-semibold rounded-sm hover:bg-[#0F2A24]"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-stone-200 rounded-sm bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                // Show first, last, and pages around current
                if (
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 rounded-sm text-xs font-semibold transition-all ${
                        currentPage === pageNum
                          ? 'bg-[#173D35] text-white shadow-xs'
                          : 'bg-white border border-stone-200 text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                } else if (
                  pageNum === currentPage - 3 ||
                  pageNum === currentPage + 3
                ) {
                  return (
                    <span key={pageNum} className="text-xs text-stone-400 px-1">
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-stone-200 rounded-sm bg-white text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold flex items-center gap-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Banner for Custom Trip Inquiry */}
        <div className="mt-16 bg-[#173D35] text-white rounded-md p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F8F6F0]">
              Ready to Experience Sikkim Firsthand?
            </h2>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              Join more than 100+ satisfied domestic and international travelers. Let our Gangtok-based team design your personalized Himalayan journey.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => navigate('/customise-trip')}
                className="px-6 py-2.5 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] font-semibold text-xs rounded-sm transition-all shadow-xs"
              >
                Plan Your Sikkim Trip
              </button>
              <button
                onClick={() => setIsWriteModalOpen(true)}
                className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs rounded-sm transition-all"
              >
                Add Your Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
};
