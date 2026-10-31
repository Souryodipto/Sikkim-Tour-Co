import React from 'react';
import { useRouter } from '../context/RouterContext';
import { experiencesData } from '../data/experiences';
import { Mountain, ArrowRight, Sparkles } from 'lucide-react';

export const ExperiencesView: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>Curated Himalayan Perspectives</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#173D35] mb-4">
            Travel by Experience
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Every journey in the Eastern Himalayas carries a distinct rhythm. Whether your journey is an intimate celebration, a multi-generational family holiday, or a high-altitude expedition, find itineraries built around what moves you.
          </p>
        </div>

        {/* 6 Editorial Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiencesData.map((exp, idx) => (
            <article
              key={exp.id}
              onClick={() => navigate(`/experiences/${exp.slug}`)}
              className="group cursor-pointer bg-white rounded-md border border-stone-200/90 p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#173D35] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#C4A36A] font-semibold tracking-wider uppercase mb-3">
                  <span>Theme {String(idx + 1).padStart(2, '0')}</span>
                  <span className="text-stone-400 group-hover:text-[#173D35] transition-colors">
                    {exp.curatedPackageSlugs.length} Packages
                  </span>
                </div>

                <h2 className="font-editorial text-2xl font-bold text-[#173D35] group-hover:text-[#527568] transition-colors mb-2">
                  {exp.title}
                </h2>

                <p className="text-xs text-[#527568] font-medium mb-3 italic">
                  {exp.subtitle}
                </p>

                <p className="text-xs text-stone-600 leading-relaxed mb-6">
                  {exp.description}
                </p>

                <div className="space-y-2 mb-6 border-t border-stone-100 pt-4">
                  <div className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider">
                    Experience Highlights
                  </div>
                  {exp.keyFeatures.slice(0, 3).map((feat, fIdx) => (
                    <div key={fIdx} className="text-xs text-stone-700 flex items-start gap-2">
                      <span className="text-[#C4A36A]">•</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-500 truncate max-w-[170px]">
                  {exp.destinations.join(' · ')}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#173D35] group-hover:text-[#C4A36A] transition-colors">
                  <span>View Packages</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
