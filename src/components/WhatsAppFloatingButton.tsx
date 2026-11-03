import React, { useState } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/site';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import {
  MessageSquare,
  X,
  ArrowUpRight,
  Send,
  Mail,
  Phone,
  Sparkles,
  Compass,
} from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const isPackageDetail = currentRoute.view === 'package-detail';

  const defaultMsg = encodeURIComponent(
    'Hi Sikkim Tour Co., I am interested in planning a Sikkim trip. Could you please share quotation and permit details?'
  );

  const handleWhatsAppAction = (location: string) => {
    trackWhatsAppClick({
      cta_location: location,
    });
  };

  const handlePhoneAction = (location: string) => {
    trackPhoneClick({
      click_location: location,
    });
  };

  return (
    <>
      {/* 1. DESKTOP & TABLET FLOATING CONCIERGE (sm and up) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-50 flex-col items-end max-w-sm">
        {/* Popover Card */}
        {isOpen && (
          <div className="mb-3 w-84 bg-white rounded-2xl shadow-2xl border border-[#DFC89E]/60 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200 text-[#202724]">
            <div className="bg-[#103D35] p-4 text-white flex items-center justify-between border-b border-[#DFC89E]/30">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Sikkim Tour Co."
                  className="w-10 h-10 rounded-full bg-white border border-[#DFC89E] object-cover"
                />
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-[#DFC89E] font-bold font-mono">
                    Direct Mountain Desk
                  </div>
                  <h4 className="font-serif text-base font-bold text-white">Sikkim Tour Co.</h4>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-white/70 hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
                aria-label="Close chat card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-[#F8F6F0] text-xs text-[#202724]/80 space-y-2">
              <p>
                Connect directly with our Gangtok mountain travel desk on WhatsApp. We provide customized quotations, dedicated vehicles, and Indian Army permit coordination.
              </p>
              <div className="p-2.5 bg-white rounded-xl border border-stone-200 text-[11px] text-stone-700 space-y-1">
                <div>
                  <span className="font-bold text-[#173D35]">WhatsApp:</span>{' '}
                  {siteConfig.contact.whatsappDisplay}
                </div>
                <div>
                  <span className="font-bold text-[#173D35]">Email:</span>{' '}
                  {siteConfig.contact.emailGeneral}
                </div>
              </div>
            </div>

            <div className="p-3 bg-white border-t border-stone-100 flex flex-col gap-2">
              <a
                href={`https://wa.me/917001846727?text=${defaultMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleWhatsAppAction('floating_button_popover')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-white bg-[#25D366] hover:bg-[#20ba59] rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp (+91 70018 46727)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="tel:+917001846727"
                onClick={() => handlePhoneAction('floating_button_popover')}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-[#103D35] bg-[#EBA94B] hover:bg-[#F4C47A] rounded-xl transition-all shadow-sm cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 fill-[#103D35]" />
                <span>Call Desk: +91 70018 46727</span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.emailGeneral}?subject=Trip Inquiry - Sikkim Tour Co.`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-stone-700 hover:text-black bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors border border-stone-200 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-[#173D35]" />
                <span>Send Email Inquiry</span>
              </a>

              <div className="text-[10px] text-center text-stone-500 font-mono">
                ⚡ Typical response within 15 minutes during desk hours
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Buttons (Desktop) */}
        <div className="flex items-center gap-2.5">
          {/* Direct Call Us Floating Button */}
          <a
            href="tel:+917001846727"
            onClick={() => handlePhoneAction('floating_button')}
            className="flex items-center gap-2 py-3 px-4 rounded-full bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xs border-2 border-white/60 cursor-pointer whitespace-nowrap"
            title="Call Sikkim Tour Co. directly at +91 70018 46727"
            aria-label="Call Sikkim Tour Co. at +91 70018 46727"
          >
            <Phone className="w-4 h-4 fill-[#103D35]" />
            <span>Call Us</span>
          </a>

          {/* WhatsApp Concierge Floating Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-2xl hover:scale-105 transition-all duration-300 font-bold text-xs border-2 border-white/40 cursor-pointer whitespace-nowrap"
            aria-label="Contact Sikkim Tour Co. on WhatsApp"
          >
            <MessageSquare className="w-5 h-5 fill-white" />
            <span>WhatsApp Concierge</span>
          </button>
        </div>
      </div>

      {/* 2. MOBILE PERSISTENT STICKY CONVERSION BAR (Mobile Only - Not on Package Detail) */}
      {!isPackageDetail && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3.5 py-2.5 shadow-[0_-4px_25px_rgba(0,0,0,0.12)] flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Direct Phone Call Button */}
            <a
              href="tel:+917001846727"
              onClick={() => handlePhoneAction('mobile_sticky_bar')}
              className="p-2.5 rounded-xl border border-stone-300 bg-stone-50 text-[#173D35] hover:bg-stone-100 transition-colors cursor-pointer"
              title="Call Gangtok Desk"
              aria-label="Call Gangtok Desk"
            >
              <Phone className="w-4 h-4 text-[#173D35]" />
            </a>

            {/* Custom Tour Enquiry Button */}
            <button
              onClick={() => navigate('/customise-trip')}
              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#173D35] text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Custom Quote</span>
            </button>
          </div>

          {/* Primary Mobile WhatsApp CTA Button */}
          <a
            href={`https://wa.me/917001846727?text=${defaultMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleWhatsAppAction('mobile_sticky_bar')}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer text-center"
          >
            <MessageSquare className="w-4 h-4 fill-white shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}
    </>
  );
};
