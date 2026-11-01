import React from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/site';
import { Compass, Sparkles, MapPin, Shield, HeartHandshake, Mountain, ArrowRight } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568] mb-2">
            <Compass className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>Our Service Philosophy</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#173D35] mb-4">
            About Sikkim Tour Company (Sikkim Tour Co.)
          </h1>
          <p className="text-base text-[#173D35] font-editorial italic mb-4">
            “{siteConfig.tagline}”
          </p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Sikkim Tour Company (Sikkim Tour Co.) is Gangtok&apos;s premier local mountain tour operator headquartered on Paljor Stadium Road, East Sikkim (737101). We believe the Eastern Himalayas and North India mountain circuits are best experienced with authentic local stewardship—combining private 4x4 mountain vehicles, dedicated military permit clearance handling, handpicked mountain retreats, and respectful engagement with local Himalayan communities.
          </p>
        </div>

        {/* Narrative & Positioning */}
        <div className="bg-white p-8 sm:p-10 rounded-md border border-stone-200/90 shadow-xs space-y-8 mb-12">
          <section className="space-y-3">
            <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
              Our Brand Positioning
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              We position ourselves as a premium travel company specialising in personalised holidays across all four districts of Sikkim: North, East, West, and South. Our journeys cater to domestic Indian travellers as well as international guests from across the globe who appreciate thoughtful coordination, dependable mountain vehicles, and respectful cultural engagement.
            </p>
          </section>

          <section className="space-y-4 border-t border-stone-100 pt-6">
            <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
              Core Service Commitments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <h3 className="font-editorial text-lg font-bold text-[#173D35]">
                  Thoughtfully Planned Journeys
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Mountain journeys demand realistic pacing. We structure routes so you arrive refreshed, with ample daytime hours to explore monasteries, stroll tea plantations, or rest by the fire.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-lg font-bold text-[#173D35]">
                  Transparent Package Quotations
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Every proposal clearly details accommodation tiers, vehicle types, meal inclusions, and statutory permit expenses. No surprise surcharges or forced shopping stops.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-lg font-bold text-[#173D35]">
                  Local Destination Knowledge
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Based in Gangtok, we monitor day-to-day weather shifts along the Teesta valley, Army road clearances for high passes, and seasonal wildflowers in Yumthang and Varsey.
                </p>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-editorial text-lg font-bold text-[#173D35]">
                  Responsible Himalayan Tourism
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  We advocate strict compliance with Sikkim’s single-use plastic ban, fair wages for mountain chauffeurs and village homestay hosts, and respectful conduct inside Buddhist monasteries.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3 border-t border-stone-100 pt-6">
            <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
              Looking Ahead: Regional Expansion
            </h2>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
              While our core expertise is rooted throughout Sikkim, the Sikkim Tour Co. platform is architected to support future curated journeys into the neighboring Himalayan corridors of Bhutan, Arunachal Pradesh, and Nepal.
            </p>
          </section>
        </div>

        {/* Action Card */}
        <div className="bg-[#173D35] text-white p-8 rounded-md shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="font-editorial text-2xl font-bold">
              Ready to Discuss Your Journey?
            </h3>
            <p className="text-xs text-white/80 max-w-md">
              Share your thoughts with our Gangtok team and receive an honest itinerary consultation.
            </p>
          </div>
          <button
            onClick={() => navigate('/customise-trip')}
            className="px-6 py-3 bg-[#C4A36A] hover:bg-[#DFC89E] text-[#173D35] font-semibold text-xs sm:text-sm rounded-sm whitespace-nowrap transition-colors"
          >
            Plan Your Trip
          </button>
        </div>
      </div>
    </div>
  );
};
