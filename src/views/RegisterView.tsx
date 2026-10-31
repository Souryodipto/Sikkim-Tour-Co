import React from 'react';
import { useRouter } from '../context/RouterContext';
import { CheckCircle2, Send, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterView: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#202724] pt-28 pb-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border border-stone-200 shadow-xl space-y-6 text-center">
        {/* Brand Header */}
        <div>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#0b1e17] text-[#c59b27] mb-3 border border-[#c59b27]/40 shadow-sm">
            <img src="/logo.png" alt="Sikkim Tour Co." className="w-12 h-12 rounded-full object-cover" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#173D35]">
            Sikkim Tour Co.
          </h1>
          <p className="text-xs text-stone-500 mt-1 font-mono uppercase tracking-wider">
            Your Journey. Our Mountains.
          </p>
        </div>

        {/* NO REGISTRATION NEEDED NOTICE */}
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-3 text-left">
          <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>No Account Registration Needed!</span>
          </div>
          <p className="text-emerald-800/90 leading-relaxed">
            We value your time. You never need to fill out registration forms or verify passwords to explore Sikkim, customize itineraries, or request quotations.
          </p>
          <div className="space-y-1 pt-1 text-[11px] text-emerald-950 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Browse all 15 tour package categories freely</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Explore the Real Satellite Himalayan Map</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              <span>Generate personalized AI itineraries in seconds</span>
            </div>
          </div>
        </div>

        {/* DIRECT WHATSAPP & EMAIL */}
        <div className="space-y-2 pt-2">
          <a
            href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20plan%20a%20journey."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>Connect on WhatsApp (+91 70018 46727)</span>
          </a>

          <a
            href="mailto:info@sikkimtourcompany.com?subject=Trip Request - Sikkim Tour Co."
            className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium text-xs flex items-center justify-center gap-2 border border-stone-200 transition-colors"
          >
            <Mail className="w-4 h-4 text-[#173D35]" />
            <span>Email info@sikkimtourcompany.com</span>
          </a>

          <button
            onClick={() => navigate('/packages')}
            className="w-full py-2.5 px-4 rounded-xl bg-[#173D35] hover:bg-[#0b1e17] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors mt-2"
          >
            <span>Explore Tour Packages (Quotes on Request)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
