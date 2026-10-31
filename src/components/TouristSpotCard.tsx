import React from 'react';
import { TouristSpot } from '../data/destinations';
import { VisualMedia, VisualPreset } from './VisualMedia';
import { MapPin, Clock, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';

interface TouristSpotCardProps {
  spot: TouristSpot;
  onSelect: (spot: TouristSpot) => void;
}

export const TouristSpotCard: React.FC<TouristSpotCardProps> = ({ spot, onSelect }) => {
  const getPreset = (): VisualPreset => {
    switch (spot.district) {
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

  const districtColor = {
    'North Sikkim': 'bg-blue-900/90 text-blue-100 border-blue-400/30',
    'East Sikkim': 'bg-emerald-900/90 text-emerald-100 border-emerald-400/30',
    'West Sikkim': 'bg-purple-900/90 text-purple-100 border-purple-400/30',
    'South Sikkim': 'bg-amber-900/90 text-amber-100 border-amber-400/30',
  }[spot.district];

  return (
    <article
      onClick={() => onSelect(spot)}
      className="group bg-white rounded-md border border-stone-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-[#173D35]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Photo Container */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <VisualMedia
            src={spot.imageUrl}
            alt={spot.name}
            preset={getPreset()}
            aspectRatio="auto"
            overlayOpacity="light"
            className="w-full h-full group-hover:scale-105 transition-transform duration-700"
          />

          {/* District Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className={`px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-xs border backdrop-blur-xs ${districtColor}`}>
              {spot.district}
            </span>
          </div>

          {/* Elevation Tag */}
          <div className="absolute bottom-2.5 right-2.5 z-10 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded-xs flex items-center gap-1 border border-white/20">
            <MapPin className="w-3 h-3 text-[#C4A36A]" />
            <span>{spot.elevation}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5">
          {/* Historical Period Badge */}
          <div className="text-[11px] font-semibold text-[#527568] flex items-center gap-1.5 mb-1.5 line-clamp-1">
            <BookOpen className="w-3 h-3 text-[#C4A36A] shrink-0" />
            <span>{spot.historicalPeriod}</span>
          </div>

          {/* Spot Name */}
          <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#173D35] group-hover:text-[#527568] transition-colors line-clamp-1 mb-2">
            {spot.name}
          </h3>

          {/* Short historical snippet */}
          <p className="text-xs text-stone-600 leading-relaxed line-clamp-3 mb-3">
            {spot.history}
          </p>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="px-4 pb-4 pt-2 border-t border-stone-100 flex items-center justify-between">
        <div className="text-[11px] text-stone-500 flex items-center gap-1">
          {spot.permitRequired ? (
            <span className="text-amber-700 font-medium">Permit Required</span>
          ) : (
            <span className="text-emerald-700 font-medium">Open Access</span>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#173D35] group-hover:text-[#C4A36A] transition-colors"
        >
          <span>Read History</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
};
