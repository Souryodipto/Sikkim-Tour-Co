import React, { useState } from 'react';
import { saveUserReview, Review } from '../data/reviews';
import { tourPackagesData } from '../data/packages';
import { Star, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: (newReview: Review) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  isOpen,
  onClose,
  onReviewSubmitted,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [origin, setOrigin] = useState('');
  const [nationality, setNationality] = useState('');
  const [originType, setOriginType] = useState<'indian' | 'international'>('indian');
  const [tripStyle, setTripStyle] = useState<Review['tripStyle']>('Family Tour');
  const [travellerType, setTravellerType] = useState<Review['travellerType']>('Family with Kids');
  const [packageVisited, setPackageVisited] = useState('Grand Sikkim Odyssey (14 Days)');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !origin.trim() || !reviewTitle.trim() || !reviewText.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    const created = saveUserReview({
      authorName: authorName.trim(),
      origin: origin.trim(),
      nationality: nationality.trim() || (originType === 'indian' ? 'Indian' : 'International'),
      originType,
      rating,
      tripStyle,
      travellerType,
      packageVisited,
      reviewTitle: reviewTitle.trim(),
      reviewText: reviewText.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      onReviewSubmitted(created);
      onClose();
      setSubmitted(false);
      // Reset form
      setAuthorName('');
      setOrigin('');
      setNationality('');
      setReviewTitle('');
      setReviewText('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-md border border-stone-200 shadow-xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-labelledby="write-review-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-[#173D35] text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C4A36A]" />
            <h2 id="write-review-title" className="font-editorial text-lg font-bold">
              Write a Himalayan Travel Review
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#173D35]">
              Thank You for Sharing Your Experience!
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-sm mx-auto">
              Your review has been verified and added to our Himalayan review registry. It will now be visible to travelers worldwide.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                {errorMsg}
              </div>
            )}

            {/* Star Rating Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Overall Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="p-1 text-stone-300 hover:scale-110 transition-transform focus:outline-hidden"
                      aria-label={`Rate ${star} stars`}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'fill-[#C4A36A] text-[#C4A36A]'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <span className="text-xs font-bold text-[#173D35] ml-2">
                  {rating} of 5 Stars ({rating === 5 ? '5/5 Exceptional' : rating === 4 ? '4/5 Very Good' : rating === 3 ? '3/5 Average / Good' : rating === 2 ? '2/5 Fair' : '1/5 Disappointing'})
                </span>
              </div>
            </div>

            {/* Full Name & Origin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra / Sarah Jenkins"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Origin (City, State / Country) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai, India or London, UK"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden"
                />
              </div>
            </div>

            {/* Origin Type & Nationality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Traveler Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOriginType('indian');
                      if (!nationality) setNationality('Indian');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-sm border transition-all text-center ${
                      originType === 'indian'
                        ? 'bg-[#173D35] text-white border-[#173D35]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    Domestic (Indian)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOriginType('international');
                      if (nationality === 'Indian') setNationality('');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-sm border transition-all text-center ${
                      originType === 'international'
                        ? 'bg-[#173D35] text-white border-[#173D35]'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    International
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  placeholder="e.g. Indian, British, American, French, German"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden"
                />
              </div>
            </div>

            {/* Trip Style & Traveler Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Trip Style
                </label>
                <select
                  value={tripStyle}
                  onChange={(e) => setTripStyle(e.target.value as Review['tripStyle'])}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-white focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden"
                >
                  <option value="Family Tour">Family Tour</option>
                  <option value="Honeymoon">Honeymoon</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Luxury">Luxury</option>
                  <option value="Solo Explorer">Solo Explorer</option>
                  <option value="Cultural & Heritage">Cultural & Heritage</option>
                  <option value="Group Expedition">Group Expedition</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Traveler Group Type
                </label>
                <select
                  value={travellerType}
                  onChange={(e) => setTravellerType(e.target.value as Review['travellerType'])}
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-white focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden"
                >
                  <option value="Couple">Couple</option>
                  <option value="Family with Kids">Family with Kids</option>
                  <option value="Friends Group">Friends Group</option>
                  <option value="Solo">Solo Traveler</option>
                  <option value="Senior Travellers">Senior Travelers</option>
                </select>
              </div>
            </div>

            {/* Package / Places Visited */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Tour Package / Places Explored
              </label>
              <select
                value={packageVisited}
                onChange={(e) => setPackageVisited(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm bg-white focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden"
              >
                <option value="Grand Sikkim Odyssey (14 Days)">Grand Sikkim Odyssey (14 Days - All 4 Districts)</option>
                {tourPackagesData.map((pkg) => (
                  <option key={pkg.id} value={`${pkg.name} (${pkg.duration})`}>
                    {pkg.name} ({pkg.duration})
                  </option>
                ))}
                <option value="North Sikkim Alpine Expedition (6D/5N)">North Sikkim Alpine Expedition (Lachen, Lachung, Gurudongmar)</option>
                <option value="West Sikkim Heritage & Dzongri Foothills (7D/6N)">West Sikkim Heritage & Dzongri Foothills (Yuksom, Pelling)</option>
                <option value="South Sikkim Monasteries & Temi Tea Estate (5D/4N)">South Sikkim Monasteries & Temi Tea Estate</option>
                <option value="Custom Bespoke Itinerary">Custom Bespoke Itinerary</option>
              </select>
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Review Headline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Unforgettable sunrise in Pelling & impeccable drivers"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden"
              />
            </div>

            {/* Detailed Review Text */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Your Detailed Review Story <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Describe your journey across North, East, West, or South Sikkim: vehicle comfort, mountain roads, hotel stays, permit handling, scenic sights..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-stone-300 rounded-sm focus:border-[#173D35] focus:ring-1 focus:ring-[#173D35] outline-hidden resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Himalayan Review System</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-stone-200 text-stone-700 text-xs font-semibold rounded-sm hover:bg-stone-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs font-semibold rounded-sm transition-colors shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
