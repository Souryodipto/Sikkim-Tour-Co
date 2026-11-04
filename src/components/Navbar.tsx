import React, { useState, useEffect } from 'react';
import { useRouter } from '../context/RouterContext';
import { siteConfig } from '../config/site';
import {
  Menu,
  X,
  MoreVertical,
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
  Train,
  Instagram,
} from 'lucide-react';
import { SearchModal } from './SearchModal';
import { FestiveAnnouncementBanner } from './FestiveAnnouncementBanner';
import { trackWhatsAppClick } from '../utils/analytics';

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
      {/* Christmas & December Special Top Announcement Ribbon */}
      <FestiveAnnouncementBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* ZONE 1: BRAND LOGO & WORDMARK */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/');
            }}
            className="flex items-center gap-2 sm:gap-3 shrink-0 group focus:outline-hidden min-w-0"
            aria-label="Sikkim Tour Co. Homepage"
          >
            <img
              src="/logo.png"
              alt="Sikkim Tour Co."
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white border border-[#EBA94B]/60 object-cover shadow-md group-hover:scale-105 transition-transform shrink-0"
            />
            <div className="min-w-0">
              <span className="font-serif text-base sm:text-xl font-bold tracking-wider text-white group-hover:text-[#EBA94B] transition-colors block leading-tight truncate">
                SIKKIM TOUR CO.
              </span>
              <span className="text-[10px] sm:text-xs tracking-wider uppercase text-[#EBA94B] font-mono block -mt-0.5 font-medium truncate">
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
                40 Packages
              </span>
            </a>

            <a
              href="/sikkim-packages-from-kolkata"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/sikkim-packages-from-kolkata');
              }}
              className={`flex items-center gap-1.5 whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'kolkata-packages' || currentRoute.view === 'kalyani-packages' || currentRoute.view === 'njp-packages'
                  ? 'text-[#EBA94B] font-semibold'
                  : 'text-white/90'
              }`}
            >
              <Train className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>Kolkata &amp; NJP Hub</span>
              <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/90 text-white font-bold">
                Trains
              </span>
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

            <a
              href="/faqs"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/faqs');
              }}
              className={`whitespace-nowrap transition-colors hover:text-[#EBA94B] ${
                currentRoute.view === 'faqs' ? 'text-[#EBA94B] font-semibold' : 'text-white/90'
              }`}
            >
              FAQs
            </a>
          </nav>

          {/* ZONE 3: ACTIONS & INSTANT CONTACT (NO ACCOUNT NEEDED) */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

            {/* Quick Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs border border-white/20 transition-all cursor-pointer"
              aria-label="Search destinations, packages, or guides (⌘K)"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-[#EBA94B]" aria-hidden="true" />
              <kbd className="hidden md:inline-flex items-center text-[10px] bg-white/15 px-1 py-0.5 rounded text-white/80 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Primary CTA: Get a Free Tour Quote (Visible on sm and up to prevent mobile navbar overflow) */}
            <button
              onClick={() => handleNavClick('/customise-trip')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-extrabold text-[#103D35] bg-gradient-to-r from-[#EBA94B] to-[#F4C47A] hover:brightness-110 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer border border-[#EBA94B]/50"
              title="Request a free customized tour quote"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#103D35]" />
              <span>Get a Free Tour Quote</span>
            </button>

            {/* Direct WhatsApp Button (Green Highlight) */}
            <a
              href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20book%20a%20Sikkim%20tour%20package."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick({ cta_location: 'navbar' })}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0"
              title="Book directly with Sikkim Tour Co. on WhatsApp (+91 70018 46727)"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span className="hidden md:inline">Book on WhatsApp</span>
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

            {/* Instagram Profile Button */}
            <a
              href="https://www.instagram.com/sikkimtourco"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-500/80 via-pink-500/80 to-amber-500/80 hover:from-purple-500 hover:via-pink-500 hover:to-amber-500 transition-all rounded-lg shadow-xs border border-white/20 whitespace-nowrap shrink-0 group"
              title="Follow @sikkimtourco on Instagram"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="text-[11px]">Instagram</span>
            </a>

            {/* Mobile Three-Dot Menu Option Toggle (Square/Iconic - Never Cuts Off) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-[#EBA94B] hover:text-white border border-white/25 transition-all focus:outline-hidden cursor-pointer shrink-0 shadow-xs"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu options'}
              aria-expanded={mobileMenuOpen}
              title={mobileMenuOpen ? 'Close menu' : 'Menu options'}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#EBA94B]" />
              ) : (
                <MoreVertical className="w-5 h-5 text-[#EBA94B]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE QUICK-NAV BAR: Horizontally scrollable pill strip for mobile & tablet (< xl) */}
      <div className="xl:hidden border-t border-[#EBA94B]/20 bg-[#0d332c]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex items-center gap-2">
          {/* 1. Destinations */}
          <a
            href="/destinations"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/destinations');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              currentRoute.view === 'destinations'
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Compass className="w-3 h-3 text-[#EBA94B]" />
            <span>Destinations</span>
          </a>

          {/* 2. Tour Packages */}
          <a
            href="/packages"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/packages');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              currentRoute.view === 'packages' || currentRoute.view === 'package-detail'
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Mountain className="w-3 h-3 text-[#EBA94B]" />
            <span>Tour Packages</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-[#EBA94B] text-[#103D35] font-bold">
              40 Packages
            </span>
          </a>

          {/* 3. Kolkata & NJP Hub */}
          <a
            href="/sikkim-packages-from-kolkata"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/sikkim-packages-from-kolkata');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              currentRoute.view === 'kolkata-packages' || currentRoute.view === 'kalyani-packages' || currentRoute.view === 'njp-packages'
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Train className="w-3 h-3 text-[#EBA94B]" />
            <span>Kolkata &amp; NJP Hub</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500 text-white font-bold">
              Trains
            </span>
          </a>

          {/* 4. Heritage Stays */}
          <a
            href="/stays"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/stays');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              currentRoute.view === 'stays' || currentRoute.view === 'stay-detail'
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Hotel className="w-3 h-3 text-[#EBA94B]" />
            <span>Heritage Stays</span>
          </a>

          {/* 5. Permits & Info */}
          <a
            href="/disclosures"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/disclosures');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              currentRoute.view === 'disclosures'
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3 h-3 text-amber-300" />
            <span>Permits &amp; Info</span>
          </a>

          {/* 6. Blog & Guides */}
          <a
            href="/travel-guides"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/travel-guides');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              currentRoute.view === 'travel-guides' || currentRoute.view === 'travel-guide-detail'
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white'
            }`}
          >
            <BookOpen className="w-3 h-3 text-[#EBA94B]" />
            <span>Blog &amp; Guides</span>
          </a>

          {/* 7. Reviews */}
          <a
            href="/reviews"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/reviews');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              currentRoute.view === 'reviews'
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#EBA94B]" />
            <span>Reviews</span>
          </a>

          {/* 8. FAQs */}
          <a
            href="/faqs"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('/faqs');
            }}
            className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
              currentRoute.view === 'faqs'
                ? 'bg-[#EBA94B] text-[#103D35] border-[#EBA94B] font-bold shadow-xs'
                : 'bg-white/10 text-white/90 border-white/15 hover:bg-white/20 hover:text-white'
            }`}
          >
            <FileText className="w-3 h-3 text-[#EBA94B]" />
            <span>FAQs</span>
          </a>
        </div>
      </div>

      {/* MOBILE DRAWER NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-full bg-[#103D35] border-b border-[#EBA94B]/30 shadow-2xl px-5 sm:px-6 py-5 animate-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto text-white">
          {/* Clean Drawer Header: Quick close & clean section title (No redundant company name) */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#EBA94B]"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#EBA94B] font-bold">
                Menu &amp; Quick Links
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white hover:text-[#EBA94B] text-xs font-semibold border border-white/20 transition-all cursor-pointer"
              aria-label="Close menu drawer"
            >
              <X className="w-4 h-4 text-[#EBA94B]" />
              <span>Close</span>
            </button>
          </div>

          {/* PRIMARY NAVIGATION LINKS (Immediately Visible Above The Fold) */}
          <nav className="flex flex-col gap-1.5 mb-5 text-sm" aria-label="Mobile Drawer Navigation">
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#EBA94B] font-bold px-1 py-1">
              Main Menu Options
            </div>

            <button
              onClick={() => handleNavClick('/destinations')}
              className={`text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                currentRoute.view === 'destinations'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-[#EBA94B]" />
                <span>Destinations</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('/packages')}
              className={`text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                currentRoute.view === 'packages' || currentRoute.view === 'package-detail'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mountain className="w-4 h-4 text-[#EBA94B]" />
                <span>Tour Packages</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#EBA94B] text-[#103D35] font-bold">
                  40 Packages
                </span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('/sikkim-packages-from-kolkata')}
              className={`text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                currentRoute.view === 'kolkata-packages' || currentRoute.view === 'kalyani-packages' || currentRoute.view === 'njp-packages'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Train className="w-4 h-4 text-[#EBA94B]" />
                <span>Kolkata &amp; NJP Hub (Trains)</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500 text-white font-bold">
                  Trains
                </span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('/stays')}
              className={`text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                currentRoute.view === 'stays' || currentRoute.view === 'stay-detail'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Hotel className="w-4 h-4 text-[#EBA94B]" />
                <span>Heritage Stays</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('/disclosures')}
              className={`text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                currentRoute.view === 'disclosures'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-300" />
                <span>Permits &amp; Info</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('/travel-guides')}
              className={`text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                currentRoute.view === 'travel-guides' || currentRoute.view === 'travel-guide-detail'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#EBA94B]" />
                <span>Blog &amp; Guides</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('/reviews')}
              className={`text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                currentRoute.view === 'reviews'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-[#EBA94B]" />
                <span>Reviews (118 Verified)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            <button
              onClick={() => handleNavClick('/faqs')}
              className={`text-left py-2.5 px-3 rounded-xl flex items-center justify-between transition-colors ${
                currentRoute.view === 'faqs'
                  ? 'bg-[#EBA94B] text-[#103D35] font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-[#EBA94B]" />
                <span>FAQs</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>
          </nav>

          {/* Quick Search */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            className="w-full mb-3 px-3.5 py-2.5 bg-white/10 hover:bg-white/15 text-white/90 rounded-xl text-xs font-medium border border-white/20 flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-[#EBA94B]" />
              <span>Search destinations, stays, packages...</span>
            </div>
            <kbd className="text-[10px] bg-white/20 text-white/80 px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Primary CTA: Get a Free Tour Quote */}
          <button
            onClick={() => handleNavClick('/customise-trip')}
            className="w-full mb-2.5 py-3 px-4 rounded-xl bg-gradient-to-r from-[#EBA94B] to-[#F4C47A] text-[#103D35] font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#103D35]" />
            <span>Get a Free Tour Quote</span>
          </button>

          {/* Secondary CTA: Direct WhatsApp Call to Action */}
          <a
            href="https://wa.me/917001846727?text=Hi%20Sikkim%20Tour%20Co.,%20I%20would%20like%20to%20book%20a%20Sikkim%20tour%20package."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick({ cta_location: 'mobile_drawer' })}
            className="w-full mb-2.5 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Book on WhatsApp (+91 70018 46727)</span>
          </a>

          {/* Direct Email Call to Action */}
          <a
            href="mailto:info@sikkimtourco.com?subject=Travel Inquiry - Sikkim Tour Co."
            className="w-full mb-2.5 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#EBA94B]" />
            <span>Email Us (info@sikkimtourco.com)</span>
          </a>

          {/* Direct Instagram Profile Link */}
          <a
            href="https://www.instagram.com/sikkimtourco"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-600 hover:opacity-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md border border-white/20 transition-opacity cursor-pointer"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow @sikkimtourco on Instagram</span>
          </a>
        </div>
      )}

      {/* Global Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};
