import React, { useState, useEffect } from 'react';
import { Compass, Mountain, Sparkles, MapPin, Snowflake } from 'lucide-react';
import { MountainSnowBurstCanvas } from './MountainSnowBurstCanvas';

interface HimalayanLoadingScreenProps {
  /** Total animation duration in milliseconds before exit begins (default: 4000ms = 4s) */
  durationMs?: number;
  /** Callback fired when the loading animation is completely dismissed */
  onComplete?: () => void;
  /** Allow manual dismissal via Skip button (default: true) */
  allowSkip?: boolean;
}

export const HimalayanLoadingScreen: React.FC<HimalayanLoadingScreenProps> = ({
  durationMs = 4000,
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

  // Mobile-adaptive duration: 1.4s on mobile for rapid startup, full duration on desktop
  const effectiveDuration = React.useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return Math.min(durationMs, 1400);
    }
    return durationMs;
  }, [durationMs]);

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 16; // 60 updates per second

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.round((elapsed / effectiveDuration) * 100));

      setProgress(rawProgress);

      // Smoothly ascend elevation from 413 ft (Bagdogra) up to 5,410 ft (Gangtok Operations Desk)
      const currentElevation = Math.round(413 + (5410 - 413) * (rawProgress / 100));
      setElevation(currentElevation);

      // Progressive typewriter character reveal starting at 10% progress through 60% progress
      if (rawProgress < 10) {
        setRevealedChars(0);
      } else {
        const typingRatio = Math.min(1, (rawProgress - 10) / 50);
        const charCount = Math.min(mainTitle.length, Math.floor(typingRatio * mainTitle.length));
        setRevealedChars(charCount);
      }

      if (elapsed >= effectiveDuration) {
        clearInterval(timer);
        setProgress(100);
        setElevation(5410);
        setRevealedChars(mainTitle.length);

        // Begin smooth exit fade transition
        setIsExiting(true);

        const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
        const dismissTimeout = setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, isMobile ? 350 : 550);

        return () => clearTimeout(dismissTimeout);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [effectiveDuration, onComplete]);

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
    }, 200);
  };

  const handleTapScreen = () => {
    // On mobile tap, fast-forward directly to the snow burst sequence
    if (progress < 65) {
      setProgress(68);
      setRevealedChars(mainTitle.length);
      setElevation(5410);
    }
  };

  const isSnowBurstTriggered = progress >= 65;

  return (
    <div
      onClick={handleTapScreen}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#061B17] text-white select-none overflow-hidden w-full h-screen h-[100dvh] cursor-pointer transition-all duration-700 ease-out ${
        isSnowBurstTriggered && !isExiting ? 'animate-snow-shudder' : ''
      } ${
        isExiting
          ? 'opacity-0 -translate-y-4 scale-[1.02] pointer-events-none'
          : 'opacity-100 translate-y-0 scale-100'
      }`}
      aria-live="polite"
      aria-label="Loading Sikkim Tour Co. experience"
    >
      {/* 3D HIMALAYAN ALPINE MOUNTAIN & SNOW BURST EXPLOSION CANVAS */}
      <MountainSnowBurstCanvas
        triggerBurst={isSnowBurstTriggered}
        progress={progress}
      />

      {/* 1. ATMOSPHERIC AMBIENT BACKGROUND GLOWS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Golden Sunrise Gradient at the Horizon */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#EBA94B]/15 rounded-full blur-[140px]" />
        {/* Pine Forest Ambient Glow */}
        <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#103D35]/60 rounded-full blur-[160px]" />

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
      <header className="relative z-10 w-full max-w-5xl px-4 sm:px-6 pt-4 sm:pt-6 flex items-center justify-between text-xs text-white/60 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto shrink min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#EBA94B] animate-ping shrink-0" />
          <span className="font-mono tracking-wider text-[10px] sm:text-[11px] uppercase text-[#DFC89E] truncate">
            <span className="hidden sm:inline">Gangtok Operations Desk · 27.3389° N, 88.6065° E</span>
            <span className="sm:hidden">Gangtok Desk · 5,410 ft</span>
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto shrink-0">
          <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/70 font-mono">
            <Snowflake className="w-3 h-3 text-cyan-300 animate-spin" />
            <span>Tap screen to blast snow</span>
          </span>
          {allowSkip && (
            <button
              onClick={handleSkip}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white/80 hover:text-white text-[10px] sm:text-[11px] font-mono tracking-wider transition-all border border-white/10 cursor-pointer touch-manipulation"
            >
              Skip Intro →
            </button>
          )}
        </div>
      </header>

      {/* 3. CENTRAL HERO: LOGO + KINETIC MOUNTAIN VECTOR + CREATIVE TEXT */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-2xl mx-auto my-auto space-y-3 sm:space-y-6 py-2">
        {/* LOGO WITH GLOWING CONCENTRIC AURA */}
        <div className="relative group flex items-center justify-center">
          {/* Pulsing golden sunrise aura */}
          <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#EBA94B]/35 via-[#F4C47A]/20 to-transparent blur-xl sm:blur-2xl animate-pulse" />
          
          {/* Arched Crest Badge Framing */}
          <div className="relative w-32 sm:w-48 md:w-56 p-1.5 sm:p-2 rounded-2xl bg-gradient-to-b from-white/10 via-black/25 to-black/45 border border-[#EBA94B]/40 shadow-2xl backdrop-blur-md flex items-center justify-center transition-transform duration-700 hover:scale-105">
            {!logoError ? (
              <img
                src="/logo.png"
                alt="Sikkim Tour Co. Emblem"
                referrerPolicy="no-referrer"
                onError={() => setLogoError(true)}
                className="w-full h-auto max-h-24 sm:max-h-36 object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_0_15px_rgba(235,169,75,0.4)]"
              />
            ) : (
              <Mountain className="w-12 h-12 sm:w-16 sm:h-16 text-[#EBA94B]" />
            )}
          </div>
        </div>

        {/* CREATIVE HIMALAYAN MOUNTAIN VECTOR DRAWING IN GOLD */}
        <div className="w-52 sm:w-80 h-9 sm:h-12 flex items-center justify-center">
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
        <div className="space-y-1 sm:space-y-2">
          {/* Main Title: "Bespoke Sikkim Tours" with Gold Gradient Shimmer */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            <span className="bg-gradient-to-r from-white via-[#DFC89E] to-[#EBA94B] bg-clip-text text-transparent drop-shadow-sm">
              {mainTitle.slice(0, revealedChars)}
            </span>
            {revealedChars < mainTitle.length && (
              <span className="inline-block w-0.5 h-6 sm:h-9 bg-[#EBA94B] ml-1 animate-pulse align-middle" />
            )}
          </h1>

          {/* Subtitle: "by Gangtok's Local Mountain Desk" */}
          <div
            className={`transition-all duration-700 delay-150 ${
              progress > 25 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <p className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[#DFC89E] font-medium flex items-center justify-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3 h-3 text-[#EBA94B]" />
              <span>{subtitle}</span>
              <Sparkles className="w-3 h-3 text-[#EBA94B]" />
            </p>
          </div>
        </div>

        {/* CREATIVE ASCENT TICKER & BADGES */}
        <div
          className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1 sm:pt-2 text-[10px] sm:text-xs text-white/70 transition-all duration-500 ${
            progress > 40 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1 font-mono text-[10px] sm:text-[11px]">
            <Mountain className="w-3 h-3 text-[#EBA94B]" />
            <span>Ascent: <strong className="text-white">{elevation.toLocaleString()} ft</strong></span>
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1 font-mono text-[10px] sm:text-[11px]">
            <MapPin className="w-3 h-3 text-[#38BDF8]" />
            <span>HQ: <strong className="text-white">MG Marg, Gangtok</strong></span>
          </span>
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1 font-mono text-[10px] sm:text-[11px]">
            <Compass className="w-3 h-3 text-emerald-400" />
            <span>4 Districts Ready</span>
          </span>
        </div>
      </main>

      {/* 4. BOTTOM FOOTER: PROGRESS THREAD & STATUS */}
      <footer className="relative z-10 w-full max-w-lg px-4 sm:px-6 pb-6 sm:pb-8 space-y-2 sm:space-y-3">
        {/* Dynamic Status Text */}
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/60">
          <span className={`truncate max-w-[240px] sm:max-w-none ${isSnowBurstTriggered ? 'text-[#EBA94B] font-bold drop-shadow-[0_0_8px_rgba(235,169,75,0.6)]' : ''}`}>
            {progress < 25
              ? 'Awakening Mount Kanchenjunga & Gangtok Dawn...'
              : progress < 55
              ? 'Bespoke Itineraries by Gangtok Mountain Desk...'
              : progress < 78
              ? 'Calibrating Glacial Snow & High-Altitude Permits...'
              : '❄️ HIMALAYAN SNOW BURST EXPLOSION! Opening Portal...'}
          </span>
          <span className="font-bold text-[#EBA94B] shrink-0 ml-2">{progress}%</span>
        </div>

        {/* Golden Progress Thread */}
        <div className="relative w-full h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#103D35] via-[#EBA94B] to-[#F4C47A] rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(235,169,75,0.6)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[9px] sm:text-[10px] text-center text-white/40 tracking-wider font-mono">
          © 2026 Sikkim Tour Company · Licensed Himalayan Tour Operator
        </p>
      </footer>
    </div>
  );
};
