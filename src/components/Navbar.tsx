import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/site';
import {
  Menu,
  X,
  Compass,
  Sparkles,
  Search,
  Hotel,
  Mountain,
  Send,
  Mail,
  ShieldAlert,
  FileText,
  MessageCircle,
  ChevronRight,
  BookOpen,
  Phone,
} from 'lucide-react';
import { SearchModal } from './SearchModal';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate } = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const isHome = currentRoute.view === 'home';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener: Cmd+K / Ctrl+K or / to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '/' && !isTyping) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const headerBgClass =
    !isHome || isScrolled
      ? 'bg-[#103D35]/95 backdrop-blur-md shadow-md border-b border-[#EBA94B]/30 py-2.5 text-white'
      : 'bg-transparent py-3.5 text-white';

  const defaultWaText = encodeURIComponent(
    'Hi Sikkim Tour Co., I am planning a journey to Sikkim and would like a personalized quote.'
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* ZONE 1: BRAND LOGO & WORDMARK */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="flex items-center gap-3 shrink-0 group focus:outline-hidden"
            aria-label="Sikkim Tour Co. Homepage"
          >
            <img
              src="/logo.png"
              alt="Sikkim Tour Co."
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-[#EBA94B]/60 object-cover shadow-md group-hover:scale-105 transition-transform"
            />
            <div>
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-[#EBA94B] transition-colors block leading-tight">
                SIKKIM TOUR CO.
              </span>
              <span className="text-[10px] tracking-wider uppercase text-[#EBA94B] font-mono block -mt-0.5">
                Your Journey. Our Mountains.
              </span>
            </div>
          </a>

          {/* ZONE 2: PRIMARY NAVIGATION LINKS */}
          <nav
            className="hidden xl:flex items-center gap-5 text-xs font-medium tracking-wide"
            aria-label="Main Navigation"
          >
            <a
              href="/destinations"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/destinations');
              }}
              className={`whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'destinations' ? 'text-[#EBA94B] font-semibold' : 'text-white/90'
              }`}
            >
              Destinations
            </a>

            <a
              href="/packages"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/packages');
              }}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'packages' || currentRoute.view === 'package-detail'
                  ? 'text-[#EBA94B] font-semibold'
                  : 'text-white/90'
              }`}
            >
              <span>Tour Packages</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#EBA94B] text-[#103D35] font-bold">
                15 Types
              </span>
            </a>

            <a
              href="/3d-explorer"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/3d-explorer');
              }}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'explorer-3d' ? 'text-[#EBA94B] font-semibold' : 'text-white/90'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>Real Satellite Map</span>
            </a>

            <a
              href="/stays"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/stays');
              }}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'stays' || currentRoute.view === 'stay-detail'
                  ? 'text-[#EBA94B] font-semibold'
                  : 'text-white/90'
              }`}
            >
              <Hotel className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>Heritage Stays</span>
            </a>

            <a
              href="/disclosures"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/disclosures');
              }}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'disclosures' ? 'text-[#EBA94B] font-semibold' : 'text-white/90'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              <span>Permits & Info</span>
            </a>

            <a
              href="/ai-planner"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/ai-planner');
              }}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'ai-planner' ? 'text-[#EBA94B] font-semibold' : 'text-white/90'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>AI Planner</span>
            </a>

            <a
              href="/travel-guides"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/travel-guides');
              }}
              className={`flex items-center gap-1 whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'travel-guides' || currentRoute.view === 'travel-guide-detail' ? 'text-[#EBA94B] font-semibold' : 'text-white/90'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>Blog & Guides</span>
            </a>

            <a
              href="/reviews"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/reviews');
              }}
              className={`whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'reviews' ? 'text-[#EBA94B] font-semibold' : 'text-white/90'
              }`}
            >
              Reviews
            </a>
          </nav>

          {/* ZONE 3: ACTIONS & INSTANT CONTACT (NO ACCOUNT NEEDED) */}
          <div className="flex items-center gap-2.5 shrink-0">

            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs border border-white/20 transition-all cursor-pointer"
              aria-label="Search destinations, packages, or guides (⌘K)"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-[#EBA94B]" aria-hidden="true" />
              <kbd className="hidden md:inline-flex items-center text-[10px] bg-white/15 px-1 py-0.5 rounded text-white/80 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Direct WhatsApp Button (Green Highlight) */}
            <a
              href={`https://wa.me/917001846727?text=${defaultWaText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0"
              title="Chat directly with Sikkim Tour Co. on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden sm:inline">WhatsApp Us</span>
            </a>

            {/* Email Us Button */}
            <a
              href="mailto:info@sikkimtourco.com?subject=Travel Inquiry - Sikkim Tour Co."
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 transition-all rounded-lg border border-white/25 whitespace-nowrap shrink-0"
              title="Send email inquiry to info@sikkimtourco.com"
            >
              <Mail className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>Email Us</span>
            </a>

            {/* Direct Phone Call Button */}
            <a
              href="tel:+917001846727"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-bold text-[#103D35] bg-[#EBA94B] hover:bg-[#F4C47A] transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0"
              title="Call Sikkim Tour Co. directly at +91 70018 46727"
            >
              <Phone className="w-3.5 h-3.5 fill-[#103D35]" />
              <span>Call Us</span>
            </a>



            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-white hover:text-[#EBA94B] focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-full bg-[#103D35] border-b border-[#EBA94B]/30 shadow-2xl px-6 py-6 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto text-white">
          {/* Brand header */}
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/10">
            <img
              src="/logo.png"
              alt="Sikkim Tour Co."
              className="w-12 h-12 rounded-full border border-[#EBA94B]/60 object-cover"
            />
            <div>
              <div className="font-serif text-lg font-bold text-white">SIKKIM TOUR CO.</div>
              <div className="text-[11px] text-[#EBA94B] font-mono">Your Journey. Our Mountains.</div>
            </div>
          </div>

          {/* Quick Search */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full mb-4 px-3.5 py-2.5 bg-white/10 hover:bg-white/15 text-white/90 rounded-lg text-xs font-medium border border-white/20 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#EBA94B]" />
              <span>Search destinations, stays, packages...</span>
            </div>
            <kbd className="text-[10px] bg-white/20 text-white/80 px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Direct Phone Call to Action */}
          <a
            href="tel:+917001846727"
            className="w-full mb-3 py-3 px-4 rounded-lg bg-[#EBA94B] hover:bg-[#F4C47A] text-[#103D35] font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <Phone className="w-4 h-4 fill-[#103D35]" />
            <span>Call Us (+91 70018 46727)</span>
          </a>

          {/* Direct WhatsApp Call to Action */}
          <a
            href={`https://wa.me/917001846727?text=${defaultWaText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mb-4 py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp (+91 70018 46727)</span>
          </a>

          {/* Direct Email Call to Action */}
          <a
            href="mailto:info@sikkimtourco.com?subject=Travel Inquiry - Sikkim Tour Co."
            className="w-full mb-4 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/20"
          >
            <Mail className="w-4 h-4 text-[#EBA94B]" />
            <span>Email Us (info@sikkimtourco.com)</span>
          </a>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2 pt-2 border-t border-white/10 text-sm">
            <button
              onClick={() => handleNavClick('/destinations')}
              className="text-left py-2 px-3 rounded hover:bg-white/10 text-white flex items-center justify-between"
            >
              <span>Destinations & Tourist Spots</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            <button
              onClick={() => handleNavClick('/packages')}
              className="text-left py-2 px-3 rounded hover:bg-white/10 text-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>Tour Packages</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#EBA94B] text-[#103D35] font-bold">
                  15 Types
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            <button
              onClick={() => handleNavClick('/3d-explorer')}
              className="text-left py-2 px-3 rounded hover:bg-white/10 text-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Mountain className="w-4 h-4 text-[#EBA94B]" />
                <span>Real Satellite Map</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            <button
              onClick={() => handleNavClick('/stays')}
              className="text-left py-2 px-3 rounded hover:bg-white/10 text-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-[#EBA94B]" />
                <span>Heritage Stays</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            <button
              onClick={() => handleNavClick('/disclosures')}
              className="text-left py-2 px-3 rounded hover:bg-white/10 text-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-300" />
                <span>Mandatory Permits & Disclosures</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            <button
              onClick={() => handleNavClick('/ai-planner')}
              className="text-left py-2 px-3 rounded hover:bg-white/10 text-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EBA94B]" />
                <span>AI Travel Planner</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            <button
              onClick={() => handleNavClick('/travel-guides')}
              className="text-left py-2 px-3 rounded hover:bg-white/10 text-white flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#EBA94B]" />
                <span>Blog & Travel Guides</span>
              </div>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>

            <button
              onClick={() => handleNavClick('/reviews')}
              className="text-left py-2 px-3 rounded hover:bg-white/10 text-white flex items-center justify-between"
            >
              <span>Traveler Reviews (118 Verified)</span>
              <ChevronRight className="w-4 h-4 text-white/40" />
            </button>


          </nav>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
