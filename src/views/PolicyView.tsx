import React from 'react';
import { useRouter } from '../context/RouterContext';
import { policiesData, PolicySection } from '../data/policies';
import { ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';

interface PolicyViewProps {
  type: 'privacy' | 'terms' | 'cancellation' | 'refund' | 'disclaimer';
}

export const PolicyView: React.FC<PolicyViewProps> = ({ type }) => {
  const { navigate } = useRouter();

  const policy: PolicySection = policiesData[type] || policiesData.privacy;

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <span className="text-[#173D35] font-semibold">{policy.title}</span>
        </nav>

        {/* Policy Document Container */}
        <article className="bg-white p-8 sm:p-12 rounded-md border border-stone-200/90 shadow-xs space-y-8">
          <header className="border-b border-stone-100 pb-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C4A36A]" />
              <span>Legal & Operational Policy</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#173D35]">
              {policy.title}
            </h1>
            <div className="text-xs text-stone-400">
              Last Updated: {policy.lastUpdated}
            </div>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-2">
              {policy.intro}
            </p>
          </header>

          <div className="space-y-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
            {policy.sections.map((sec, idx) => (
              <section key={idx} className="space-y-2">
                <h2 className="font-editorial text-xl font-bold text-[#173D35] pt-2">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <div className="pt-8 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap gap-4 text-stone-600">
              <a
                href="/privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/privacy-policy');
                }}
                className={`hover:underline ${type === 'privacy' ? 'font-bold text-[#173D35]' : ''}`}
              >
                Privacy
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/terms-and-conditions"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/terms-and-conditions');
                }}
                className={`hover:underline ${type === 'terms' ? 'font-bold text-[#173D35]' : ''}`}
              >
                Terms
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/cancellation-policy"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/cancellation-policy');
                }}
                className={`hover:underline ${type === 'cancellation' ? 'font-bold text-[#173D35]' : ''}`}
              >
                Cancellation
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/refund-policy"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/refund-policy');
                }}
                className={`hover:underline ${type === 'refund' ? 'font-bold text-[#173D35]' : ''}`}
              >
                Refund
              </a>
            </div>

            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-[#173D35] font-semibold hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
