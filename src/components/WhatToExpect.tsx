import React from 'react';
import { useRouter } from '../context/RouterContext';
import { MessageSquare, FileText, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export const WhatToExpect: React.FC = () => {
  const { navigate } = useRouter();

  const steps = [
    {
      step: '01',
      title: 'Initial Consultation',
      description:
        'Share your intended travel dates, group size, and travel style via WhatsApp or our enquiry form. We listen to your preferences without automated pushiness.',
      icon: MessageSquare,
    },
    {
      step: '02',
      title: 'Curated Itinerary & Transparent Quotation',
      description:
        'We draft an honest day-by-day itinerary tailored to actual seasonal road conditions, vehicle availability, and handpicked mountain hotels with clear pricing.',
      icon: FileText,
    },
    {
      step: '03',
      title: 'Permit & Logistics Coordination',
      description:
        'We process your Sikkim Inner Line Permits (ILP), Protected Area clearances for North Sikkim and Tsomgo Lake, and dedicated vehicle allocations.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'Himalayan Journey with On-Ground Support',
      description:
        'Your dedicated driver meets you at Bagdogra or Pakyong. Our Gangtok coordination team stays reachable throughout your tour to ensure smooth travels.',
      icon: CheckCircle2,
    },
  ];

  return (
    <section className="relative z-10 py-16 sm:py-20 bg-[#F8F6F0]/88 backdrop-blur-md border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#527568] mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>Our Service Process</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#173D35] mb-3">
            What to Expect When You Plan With Us
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Rather than relying on unverified claims, we stand by transparent communication, honest local knowledge, and reliable on-ground coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white rounded-md border border-stone-200/90 p-6 flex flex-col justify-between shadow-xs hover:border-[#527568] transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-editorial text-2xl font-bold text-[#C4A36A]">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#173D35]/5 flex items-center justify-center text-[#173D35]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-editorial text-lg font-bold text-[#173D35] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('/customise-trip')}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#173D35] text-white text-xs sm:text-sm font-semibold rounded-sm hover:bg-[#0F2A24] transition-colors shadow-xs"
          >
            <span>Start Your Planning Consultation</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
