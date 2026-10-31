import React, { useState } from 'react';
import { siteConfig, buildGeneralWhatsAppMessage, buildWhatsAppUrl } from '../config/site';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle, Send, Sparkles } from 'lucide-react';

export const ContactView: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          preferredContact: 'WhatsApp',
          travellerCategory: 'domestic',
          arrivalDate: '2026-11-01',
          departureDate: '2026-11-06',
          adultCount: 2,
          childCount: 0,
          destinations: ['Gangtok'],
          startingCity: 'Bagdogra',
          budget: 'Not decided',
          hotelCategory: 'Standard (3-Star equivalent)',
          transportPreference: 'Private Dedicated Vehicle (Innova/Scorpio)',
          travelStyle: 'Custom Tour',
          specialRequests: `General Contact Message: ${message}`,
          sourcePage: '/contact',
        }),
      }).catch(() => null);
    } catch {
      // Ignore network errors on contact form
    }
    setFormSent(true);
  };

  const generalWhatsAppUrl = buildWhatsAppUrl(buildGeneralWhatsAppMessage());

  return (
    <div className="pt-24 pb-20 bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#527568] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C4A36A]" />
            <span>Connect with our Travel Desk</span>
          </div>
          <h1 className="font-editorial text-4xl sm:text-5xl font-bold text-[#173D35] mb-4">
            Contact Sikkim Tour Co.
          </h1>
          <p className="text-sm text-stone-600 leading-relaxed">
            Have questions about seasonal road conditions in North Sikkim, permit requirements for foreign visitors, or bespoke family itineraries? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-7 rounded-md border border-stone-200/90 shadow-xs space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35] border-b border-stone-100 pb-3">
                Office & Direct Channels
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C4A36A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">
                      Gangtok Office (Registered Placeholder)
                    </strong>
                    <span className="text-stone-600 text-xs leading-relaxed">
                      {siteConfig.location.officeAddress}
                    </span>
                    <div className="text-[11px] text-stone-400 mt-1">
                      Coordinates: {siteConfig.location.coordinatesText}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">
                      WhatsApp Travel Desk (Primary)
                    </strong>
                    <a
                      href={generalWhatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#173D35] font-semibold hover:underline"
                    >
                      {siteConfig.contact.whatsappDisplay}
                    </a>
                    <span className="block text-stone-500 text-[11px] mt-0.5">
                      Fastest response for dates, permit queries & quotations
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#C4A36A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">
                      Telephone Helpline
                    </strong>
                    <span className="text-stone-800">{siteConfig.contact.phonePrimary}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#C4A36A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">
                      Email Correspondence
                    </strong>
                    <a
                      href={`mailto:${siteConfig.contact.emailGeneral}`}
                      className="text-stone-800 hover:underline"
                    >
                      {siteConfig.contact.emailGeneral}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#C4A36A] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-stone-900 font-semibold mb-0.5">
                      Planning Desk Hours
                    </strong>
                    <span className="text-stone-600 text-xs">
                      {siteConfig.contact.workingHours}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100">
                <a
                  href={generalWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs sm:text-sm rounded-sm transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Start Direct WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-7 sm:p-9 rounded-md border border-stone-200/90 shadow-xs">
              <h2 className="font-editorial text-2xl font-bold text-[#173D35] mb-2">
                Send Us a Message
              </h2>
              <p className="text-xs text-stone-600 mb-6">
                Fill in your details below and we will get back to you promptly.
              </p>

              {formSent ? (
                <div className="p-8 text-center bg-[#F8F6F0] rounded-sm border border-stone-200">
                  <CheckCircle className="w-10 h-10 text-emerald-700 mx-auto mb-3" />
                  <h3 className="font-editorial text-xl font-bold text-[#173D35] mb-2">
                    Message Dispatched
                  </h3>
                  <p className="text-xs text-stone-600 mb-4">
                    Thank you, {name}. Our travel team will review your message and reply via your preferred contact channel.
                  </p>
                  <button
                    onClick={() => {
                      setFormSent(false);
                      setMessage('');
                    }}
                    className="text-xs text-[#173D35] font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanshu Das / Emily Thorne"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98000 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Message or Questions *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us what you'd like to ask regarding Sikkim/Darjeeling travel, specific dates, or custom group requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-sm py-2 px-3 text-xs sm:text-sm text-stone-800 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-[#173D35]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 py-2.5 px-6 bg-[#173D35] hover:bg-[#0F2A24] text-white text-xs sm:text-sm font-semibold rounded-sm transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
