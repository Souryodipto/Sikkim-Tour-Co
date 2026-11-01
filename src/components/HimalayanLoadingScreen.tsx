import React, { useState, useEffect } from 'react';
import { Compass, Mountain, Sparkles, MapPin } from 'lucide-react';

interface HimalayanLoadingScreenProps {
  /** Total animation duration in milliseconds before exit begins (default: 2000ms = 2s) */
  durationMs?: number;
  /** Callback fired when the loading animation is completely dismissed */
  onComplete?: () => void;
  /** Allow manual dismissal via Skip button (default: true) */
  allowSkip?: boolean;
}

export const HimalayanLoadingScreen: React.FC<HimalayanLoadingScreenProps> = ({
  durationMs = 2000,
  onComplete,
  allowSkip = true,
}) => {
  const [progress, setProgress] = useState(0);
  const [elevation, setElevation] = useState(413); // Starts at Bagdogra/Teesta Valley (413 ft)
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [logoError, setLogoError] = useState(false);

  // Text animation sequence state
  const [revealedChars, setRevealedChars] = useState(0);
  const mainTitle = "Bespoke Sikkim Tours";
  const subtitle = "by Gangtok's Local Mountain Desk";

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 25; // 40 updates per second for butter-smooth animation

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.round((elapsed / durationMs) * 100));

      setProgress(rawProgress);

      // Smoothly ascend elevation from 413 ft (Bagdogra) up to 5,410 ft (Gangtok Operations Desk)
      const currentElevation = Math.round(413 + (5410 - 413) * (rawProgress / 100));
      setElevation(currentElevation);

      // Progressive typewriter character reveal across the 2 seconds
      const charCount = Math.min(
        mainTitle.length,
        Math.floor((rawProgress / 75) * mainTitle.length)
      );
      setRevealedChars(charCount);

      if (elapsed >= durationMs) {
        clearInterval(timer);
        setProgress(100);
        setElevation(5410);
        setRevealedChars(mainTitle.length);

        // Begin smooth exit fade transition
        setIsExiting(true);

        const dismissTimeout = setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 650);

        return () => clearTimeout(dismissTimeout);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [durationMs, onComplete]);

  // Listen for custom trigger event to replay
  useEffect(() => {
    const handleReplay = () => {
      setIsVisible(true);
      setIsExiting(false);
      setProgress(0);
      setElevation(413);
      setRevealedChars(0);
    };
    window.addEventListener('replay-himalayan-loader', handleReplay);
    return () => window.removeEventListener('replay-himalayan-loader', handleReplay);
  }, []);

  if (!isVisible) return null;

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#061B17] text-white select-none overflow-hidden transition-all duration-700 ease-out ${
        isExiting
          ? 'opacity-0 -translate-y-4 scale-[1.02] pointer-events-none'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
      aria-live="polite"
      aria-label="Loading Sikkim Tour Co. experience"
    >
      {/* 1. ATMOSPHERIC AMBIENT BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Golden Sunrise Gradient at the Horizon */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#EBA94B]/15 rounded-full blur-[140px]" />
        {/* Pine Forest Ambient Glow */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#103D35]/60 rounded-full blur-[160px]" />

        {/* Floating Himalayan Stardust / Snow Particles */}
        <div className="absolute inset-0 opacity-40">
          {[
            { top: '15%', left: '20%', size: 'w-1 h-1', delay: '0s' },
            { top: '35%', left: '75%', size: 'w-1.5 h-1.5', delay: '0.4s' },
            { top: '65%', left: '15%', size: 'w-1 h-1', delay: '0.8s' },
            { top: '25%', left: '85%', size: 'w-1 h-1', delay: '1.2s' },
            { top: '75%', left: '80%', size: 'w-2 h-2', delay: '0.6s' },
            { top: '50%', left: '30%', size: 'w-1.5 h-1.5', delay: '1.0s' },
          ].map((dot, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-[#EBA94B] animate-pulse ${dot.size}`}
              style={{ top: dot.top, left: dot.left, animationDelay: dot.delay }}
            />
          ))}
        </div>

        {/* 5 Sacred Buddhist Prayer Flag Color Accents Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-[#2563EB]" title="Blue: Sky & Space" />
          <div className="flex-1 bg-white" title="White: Air & Wind" />
          <div className="flex-1 bg-[#DC2626]" title="Red: Fire" />
          <div className="flex-1 bg-[#16A34A]" title="Green: Water" />
          <div className="flex-1 bg-[#EAB308]" title="Yellow: Earth" />
        </div>
      </div>

      {/* 2. TOP HEADER STRIP: COORDINATES & OPTIONAL SKIP */}
      <header className="relative z-10 w-full max-w-5xl px-6 pt-6 flex items-center justify-between text-xs text-white/60">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#EBA94B] animate-ping" />
          <span className="font-mono tracking-wider text-[11px] uppercase text-[#DFC89E]">
            Gangtok Operations Desk · 27.3389° N, 88.6065° E
          </span>
        </div>

        {allowSkip && (
          <button
            onClick={handleSkip}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white text-[11px] font-mono tracking-wider transition-all border border-white/10 cursor-pointer"
          >
            Skip Intro →
          </button>
        )}
      </header>

      {/* 3. CENTRAL HERO: LOGO + KINETIC MOUNTAIN VECTOR + CREATIVE TEXT */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto my-auto space-y-6">
        {/* LOGO WITH GLOWING CONCENTRIC AURA */}
        <div className="relative group">
          {/* Pulsing golden halo ring */}
          <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#EBA94B]/30 via-[#F4C47A]/20 to-transparent blur-md animate-pulse" />
          
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0A2621] border-2 border-[#EBA94B] p-2.5 shadow-2xl flex items-center justify-center overflow-hidden">
            {!logoError ? (
              <img
                src="/logo.png"
                alt="Sikkim Tour Co. Emblem"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="w-full h-full object-contain filter drop-shadow-md"
              />
            ) : (
              <Mountain className="w-10 h-10 text-[#EBA94B]" />
            )}
          </div>
        </div>

        {/* CREATIVE HIMALAYAN MOUNTAIN VECTOR DRAWING IN GOLD */}
        <div className="w-64 sm:w-80 h-12 flex items-center justify-center">
          <svg
            viewBox="0 0 320 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-[#EBA94B]"
          >
            {/* Background Ridge Silhouette */}
            <path
              d="M10 50 L70 24 L110 38 L160 10 L210 38 L250 24 L310 50"
              stroke="rgba(235, 169, 75, 0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="400"
              strokeDashoffset={400 - (progress / 100) * 400}
            />
            {/* Mount Kanchenjunga Main Peak Ridge */}
            <path
              d="M40 50 L100 20 L160 5 L220 20 L280 50"
              stroke="#EBA94B"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="350"
              strokeDashoffset={350 - (progress / 100) * 350}
            />
            {/* Golden Sun & Sunburst Rays */}
            <circle cx="160" cy="18" r="4" fill="#EBA94B" className="animate-pulse" />
            <path
              d="M160 7 L160 3 M170 12 L174 9 M150 12 L146 9"
              stroke="#EBA94B"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* KINETIC TYPOGRAPHY REQUESTED BY USER */}
        <div className="space-y-2">
          {/* Main Title: "Bespoke Sikkim Tours" with Gold Gradient Shimmer */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            <span className="bg-gradient-to-r from-white via-[#DFC89E] to-[#EBA94B] bg-clip-text text-transparent drop-shadow-sm">
              {mainTitle.slice(0, revealedChars)}
            </span>
            {revealedChars < mainTitle.length && (
              <span className="inline-block w-0.5 h-7 sm:h-9 bg-[#EBA94B] ml-1 animate-pulse align-middle" />
            )}
          </h1>

          {/* Subtitle: "by Gangtok's Local Mountain Desk" */}
          <div
            className={`transition-all duration-700 delay-150 ${
              progress > 25 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <p className="font-sans text-xs sm:text-sm uppercase tracking-[0.22em] text-[#DFC89E] font-medium flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
              <span>{subtitle}</span>
              <Sparkles className="w-3.5 h-3.5 text-[#EBA94B]" />
            </p>
          </div>
        </div>

        {/* CREATIVE ASCENT TICKER & BADGES */}
        <div
          className={`flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-white/70 transition-all duration-500 ${
            progress > 40 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 font-mono text-[11px]">
            <Mountain className="w-3.5 h-3.5 text-[#EBA94B]" />
            <span>Ascent: <strong className="text-white">{elevation.toLocaleString()} ft</strong></span>
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 font-mono text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>HQ: <strong className="text-white">MG Marg, Gangtok</strong></span>
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 font-mono text-[11px]">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>4 Districts Ready</span>
          </span>
        </div>
      </main>

      {/* 4. BOTTOM FOOTER: PROGRESS THREAD & STATUS */}
      <footer className="relative z-10 w-full max-w-lg px-6 pb-8 space-y-3">
        {/* Dynamic Status Text */}
        <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
          <span>
            {progress < 35
              ? 'Connecting to Gangtok Operations Desk...'
              : progress < 70
              ? 'Loading 40 Curated Himalayan Circuits...'
              : progress < 95
              ? 'Calibrating High-Altitude Permits & Fleet...'
              : 'Welcome to Sikkim Tour Co.'}
          </span>
          <span className="font-bold text-[#EBA94B]">{progress}%</span>
        </div>

        {/* Golden Progress Thread */}
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#103D35] via-[#EBA94B] to-[#F4C47A] rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(235,169,75,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[10px] text-center text-white/40 tracking-wider font-mono">
          © 2026 Sikkim Tour Company · Licensed Himalayan Tour Operator
        </p>
      </footer>
    </div>
  );
};
