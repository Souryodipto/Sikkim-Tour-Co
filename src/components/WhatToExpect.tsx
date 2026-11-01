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
    <section className="relative z-10 py-16 sm:py-20 bg-black/30 backdrop-blur-xs border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#EBA94B] mb-2 flex items-center justify-center gap-1.5 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
            <span>Our Service Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            What to Expect When You Plan With Us
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed drop-shadow">
            Rather than relying on unverified claims, we stand by transparent communication, honest local knowledge, and reliable on-ground coordination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-white/95 backdrop-blur-md rounded-2xl border border-white/40 p-6 flex flex-col justify-between shadow-xl hover:border-[#EBA94B] transition-all card-3d-interactive"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[#EBA94B]">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-[#103D35]/10 flex items-center justify-center text-[#103D35]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#103D35] mb-2">
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
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] text-xs sm:text-sm font-extrabold rounded-xl transition-all shadow-md card-3d-interactive cursor-pointer"
          >
            <span>Start Your Planning Consultation</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
