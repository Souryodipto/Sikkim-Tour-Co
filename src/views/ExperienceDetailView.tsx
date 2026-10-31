import React from 'react';
import { useRouter } from '../context/RouterContext';
import { experiencesData } from '../data/experiences';
import { tourPackagesData } from '../data/packages';
import { PackageCard } from '../components/PackageCard';
import { ChevronRight, ArrowLeft, Mountain, CheckCircle2 } from 'lucide-react';

interface ExperienceDetailViewProps {
  slug: string;
}

export const ExperienceDetailView: React.FC<ExperienceDetailViewProps> = ({ slug }) => {
  const { navigate } = useRouter();

  const experience = experiencesData.find((e) => e.slug === slug || e.id === slug);

  if (!experience) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 text-center">
        <h1 className="font-editorial text-3xl font-bold text-[#173D35] mb-4">
          Experience Category Not Found
        </h1>
        <p className="text-sm text-stone-600 mb-6">
          The requested experience category is unavailable.
        </p>
        <button
          onClick={() => navigate('/experiences')}
          className="px-5 py-2.5 bg-[#173D35] text-white text-xs font-semibold rounded-sm"
        >
          View All Experiences
        </button>
      </div>
    );
  }

  // Filter tour packages matching this experience
  const matchedPackages = tourPackagesData.filter((pkg) =>
    experience.curatedPackageSlugs.includes(pkg.slug) ||
    experience.curatedPackageSlugs.includes(pkg.id) ||
    pkg.travelStyle.toLowerCase().includes(experience.title.toLowerCase().split(' ')[0])
  );

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
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
          <a
            href="/experiences"
            onClick={(e) => {
              e.preventDefault();
              navigate('/experiences');
            }}
            className="hover:text-stone-800"
          >
            Experiences
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[#173D35] font-semibold">{experience.title}</span>
        </nav>

        {/* Experience Header */}
        <div className="bg-white p-8 sm:p-10 rounded-md border border-stone-200/90 shadow-xs mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568] mb-2">
            <Mountain className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>Curated Travel Experience</span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#173D35] mb-2">
            {experience.title}
          </h1>
          <p className="text-sm text-[#527568] font-medium italic mb-4">
            {experience.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-stone-700 max-w-3xl leading-relaxed mb-6">
            {experience.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-stone-100 pt-6">
            <div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                What Makes This Unique
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {experience.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#527568] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider mb-2">
                Recommended For & Key Hubs
              </div>
              <div className="space-y-2 text-xs text-stone-700">
                <p>
                  <strong>Ideal For:</strong> {experience.suitableFor}
                </p>
                <p>
                  <strong>Key Destinations:</strong> {experience.destinations.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Suitable Packages Section */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-[#173D35]">
              Curated Packages for {experience.title}
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Select an itinerary below to view full day-by-day details or customise with our planners.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {matchedPackages.map((pkg) => (
            <PackageCard key={pkg.id} tourPackage={pkg} />
          ))}
        </div>

        <button
          onClick={() => navigate('/experiences')}
          className="inline-flex items-center gap-1.5 py-2 px-4 bg-white border border-stone-200 text-stone-700 text-xs font-semibold rounded-sm hover:bg-stone-50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Experiences</span>
        </button>
      </div>
    </div>
  );
};
