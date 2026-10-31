import React from 'react';
import { useRouter } from '../context/RouterContext';
import { CustomiseTripForm } from '../components/CustomiseTripForm';
import { WhatToExpect } from '../components/WhatToExpect';
import { Compass, Sparkles, ShieldCheck, MessageSquare } from 'lucide-react';

export const CustomiseTripView: React.FC = () => {
  const { currentRoute } = useRouter();

  const destParam = currentRoute.queryParams.dest;
  const styleParam = currentRoute.queryParams.style;

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>Tailor-Made Himalayan Journeys</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#173D35] mb-4">
            Customise Your Himalayan Trip
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Tell us your travel dates, group size, and interests. Our Gangtok planners will prepare a realistic, day-by-day itinerary with verified hotels, private transport, and transparent pricing.
          </p>
        </div>

        {/* Multi-step Form */}
        <div className="mb-16">
          <CustomiseTripForm
            initialDestination={destParam}
            initialTravelStyle={styleParam}
            sourcePage="/customise-trip"
          />
        </div>

        {/* What to expect section */}
        <WhatToExpect />
      </div>
    </div>
  );
};
