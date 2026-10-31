import React from 'react';
import { Destination } from '../data/destinations';
import { useRouter } from '../context/RouterContext';
import { VisualMedia, VisualPreset } from './VisualMedia';
import { Clock, AlertCircle, Check, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { navigate } = useRouter();

  const getPreset = (): VisualPreset => {
    switch (destination.district) {
      case 'North Sikkim':
        return 'north-sikkim';
      case 'East Sikkim':
        return 'east-sikkim';
      case 'West Sikkim':
        return 'west-sikkim';
      case 'South Sikkim':
        return 'south-sikkim';
      default:
        return 'kanchenjunga-sunrise';
    }
  };

  const firstSpotImage = destination.spots?.[0]?.imageUrl;

  return (
    <article className="group bg-white rounded-md border border-stone-200/90 overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-shadow duration-300">
      {/* Visual Header */}
      <div
        className="relative cursor-pointer overflow-hidden"
        onClick={() => navigate(`/destinations/${destination.slug}`)}
      >
        <VisualMedia
          src={firstSpotImage}
          preset={getPreset()}
          alt={destination.name}
          aspectRatio="4/3"
          overlayOpacity="light"
          className="group-hover:scale-103 transition-transform duration-500 ease-out"
        >
          {/* Seasonal / Accessibility Banner */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
            {destination.yearRoundAccess ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#173D35]/90 backdrop-blur-xs text-white text-[11px] font-medium rounded-xs border border-white/10">
                <Check className="w-3 h-3 text-[#C4A36A]" />
                Year-Round Access
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#4A3222]/90 backdrop-blur-xs text-[#DFC89E] text-[11px] font-medium rounded-xs border border-[#C4A36A]/20">
                <AlertCircle className="w-3 h-3" />
                Seasonal & High Passes
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-medium flex items-center justify-between drop-shadow-sm">
            <span className="bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/15">
              {destination.district}
            </span>
            <span className="text-[11px] text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-xs border border-white/15">
              {destination.spots?.length || 0} Historical Spots
            </span>
          </div>
        </VisualMedia>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <Clock className="w-3.5 h-3.5 text-[#527568]" />
            <span>Recommended: {destination.recommendedDuration}</span>
          </div>

          <h3 className="font-editorial text-xl font-bold text-[#173D35] group-hover:text-[#527568] transition-colors mb-2">
            <a
              href={`/destinations/${destination.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/destinations/${destination.slug}`);
              }}
            >
              {destination.name}
            </a>
          </h3>

          <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed mb-4">
            {destination.shortDescription}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[11px] text-stone-500 italic truncate max-w-[170px]">
            {destination.elevation}
          </span>
          <button
            onClick={() => navigate(`/destinations/${destination.slug}`)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#173D35] group-hover:text-[#C4A36A] transition-colors"
          >
            <span>Explore District</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
