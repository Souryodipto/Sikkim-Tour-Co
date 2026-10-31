import React, { useState } from 'react';
import { Review, getHelpfulVoteIds, toggleHelpfulVote } from '../data/reviews';
import { Star, ThumbsUp, CheckCircle, Globe, MapPin, Compass, ShieldCheck } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
  onVoteChange?: () => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, onVoteChange }) => {
  const [hasVoted, setHasVoted] = useState(() => getHelpfulVoteIds().includes(review.id));
  const [votesCount, setVotesCount] = useState(review.helpfulVotes + (getHelpfulVoteIds().includes(review.id) ? 1 : 0));

  const handleVote = () => {
    const isAdded = toggleHelpfulVote(review.id);
    setHasVoted(isAdded);
    setVotesCount((prev) => (isAdded ? prev + 1 : Math.max(0, prev - 1)));
    if (onVoteChange) {
      onVoteChange();
    }
  };

  // Avatar initial
  const initials = review.authorName
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('');

  return (
    <article className="bg-white rounded-md border border-stone-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#527568]/60 transition-all">
      <div className="space-y-4">
        {/* Header: Author info, origin, nationality badge */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#173D35] text-[#DFC89E] font-editorial font-bold flex items-center justify-center text-sm shrink-0 border border-[#C4A36A]/40 shadow-xs">
              {initials || 'BK'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-editorial text-base font-bold text-[#173D35]">
                  {review.authorName}
                </h3>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-semibold rounded-xs border border-emerald-200" title="Verified Himalayan Traveler">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified</span>
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5 flex-wrap">
                <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                <span>{review.origin}</span>
                <span className="text-stone-300">·</span>
                <span className={`text-[11px] font-medium px-1.5 py-0.2 rounded-xs ${
                  review.originType === 'international' ? 'bg-sky-50 text-sky-800' : 'bg-amber-50 text-amber-800'
                }`}>
                  {review.nationality}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-stone-400 block">{review.date}</span>
          </div>
        </div>

        {/* Rating and Meta tags */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-100">
          <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < review.rating ? 'fill-[#C4A36A] text-[#C4A36A]' : 'text-stone-300'
                }`}
              />
            ))}
            <span className="text-xs font-bold text-stone-700 ml-1">{review.rating}.0</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2 py-0.5 bg-[#F8F6F0] text-[#173D35] text-[11px] font-medium rounded-xs border border-stone-200">
              {review.tripStyle}
            </span>
            <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[11px] rounded-xs">
              {review.travellerType}
            </span>
          </div>
        </div>

        {/* Package / Visited Place */}
        <div className="text-xs text-[#527568] font-semibold flex items-center gap-1.5 bg-[#F8F6F0]/60 p-2 rounded-xs border border-stone-100">
          <Compass className="w-3.5 h-3.5 text-[#C4A36A] shrink-0" />
          <span className="truncate">Experience: {review.packageVisited}</span>
        </div>

        {/* Review Title & Text */}
        <div>
          <h4 className="font-editorial text-base font-bold text-[#173D35] leading-snug mb-2">
            "{review.reviewTitle}"
          </h4>
          <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-light">
            {review.reviewText}
          </p>
        </div>
      </div>

      {/* Footer: Helpful Vote */}
      <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
        <span className="text-stone-400 text-[11px]">
          Sikkim Journey Review
        </span>
        <button
          onClick={handleVote}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-xs font-medium transition-all ${
            hasVoted
              ? 'bg-[#173D35] text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title="Mark review as helpful"
        >
          <ThumbsUp className={`w-3 h-3 ${hasVoted ? 'fill-white' : ''}`} />
          <span>Helpful ({votesCount})</span>
        </button>
      </div>
    </article>
  );
};
