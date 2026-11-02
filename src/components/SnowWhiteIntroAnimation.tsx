import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SnowWhiteIntroAnimationProps {
  /** Target duration in milliseconds before curtain parting (default: 1400ms, mobile: 1000ms) */
  durationMs?: number;
  /** Callback fired when the intro animation has completely faded out */
  onComplete?: () => void;
  /** Allow tap/click anywhere to skip immediately (default: true) */
  allowSkip?: boolean;
}

interface SnowflakeParticle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  angle: number;
  angularSpeed: number;
}

export const SnowWhiteIntroAnimation: React.FC<SnowWhiteIntroAnimationProps> = ({
  durationMs = 1400,
  onComplete,
  allowSkip = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isParting, setIsParting] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Rapid mobile timing: 1000ms on mobile for instantaneous feel, 1400ms on desktop
  const effectiveDuration = React.useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return Math.min(durationMs, 1000);
    }
    return durationMs;
  }, [durationMs]);

  const handleDismiss = useCallback(() => {
    if (isParting) return;
    setIsParting(true);
    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 450);
    return () => clearTimeout(exitTimer);
  }, [isParting, onComplete]);

  // Main timer and progress tracking
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, (elapsed / effectiveDuration) * 100);
      setProgress(currentProgress);

      if (elapsed >= effectiveDuration) {
        clearInterval(interval);
        handleDismiss();
      }
    }, 16);

    return () => clearInterval(interval);
  }, [effectiveDuration, handleDismiss]);

  // Keyboard shortcut (Escape or Space to dismiss immediately)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDismiss]);

  // Lightweight 60FPS 2D Pure Snow-White Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 45 pristine pure-white snowflakes
    const particleCount = window.innerWidth < 768 ? 32 : 55;
    const flakes: SnowflakeParticle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.8,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.7 + 0.3,
      angle: Math.random() * Math.PI * 2,
      angularSpeed: (Math.random() - 0.5) * 0.03,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw each snow particle in pure snow white (#FFFFFF)
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];
        flake.y += flake.speedY;
        flake.x += flake.speedX + Math.sin(flake.angle) * 0.5;
        flake.angle += flake.angularSpeed;

        if (flake.y > height + 5) {
          flake.y = -5;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 5) flake.x = -5;
        if (flake.x < -5) flake.x = width + 5;

        ctx.globalAlpha = flake.opacity;
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Sikkim Tour Co. - Pure Snow White Winter Entrance"
      onClick={allowSkip ? handleDismiss : undefined}
      className={`fixed inset-0 z-[9999] select-none overflow-hidden transition-all duration-500 ease-out ${
        allowSkip ? 'cursor-pointer' : ''
      } ${isParting ? 'pointer-events-none' : ''}`}
    >
      {/* TOP SNOW-CURTAIN PANEL (Pure White Frosted Veil) */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#04100c] border-b border-white/20 transition-transform duration-500 ease-in-out ${
          isParting ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Soft frosted snow sheen */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5 pointer-events-none" />
      </div>

      {/* BOTTOM SNOW-CURTAIN PANEL (Pure White Frosted Veil) */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#04100c] border-t border-white/20 transition-transform duration-500 ease-in-out ${
          isParting ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        {/* Soft frosted snow sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/5 pointer-events-none" />
      </div>

      {/* LIGHTWEIGHT PURE WHITE DRIFTING SNOWFLAKES CANVAS */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isParting ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* TOP HEADER CONTROLS (STRICTLY PURE SNOW WHITE) */}
      <div
        className={`absolute top-4 sm:top-6 inset-x-0 max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between text-white/70 transition-all duration-300 ${
          isParting ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Mountain coordinate badge in pure white */}
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-white uppercase">
            Himalayan Alpine Frontier · 5,410 ft
          </span>
        </div>

        {/* Skip button in pure white border */}
        {allowSkip && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            aria-label="Skip entrance animation"
            className="px-3 py-1 rounded-full border border-white/40 hover:border-white bg-white/5 hover:bg-white/15 text-white text-[10px] sm:text-xs font-mono tracking-wider transition-colors duration-150"
          >
            Enter Website →
          </button>
        )}
      </div>

      {/* CENTER HERO: CREATIVE PURE SNOW-WHITE MANDALA & MOUNTAIN EMBLEM */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-all duration-500 ease-out ${
          isParting ? 'opacity-0 scale-105 filter blur-sm' : 'opacity-100 scale-100'
        }`}
      >
        <div className="relative flex flex-col items-center space-y-4 sm:space-y-6 max-w-lg">
          {/* 1. CREATIVE SNOW-WHITE GEOMETRIC SNOWFLAKE EMBLEM */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            {/* Soft snow glow aura */}
            <div className="absolute inset-0 rounded-full bg-white/15 blur-xl animate-pulse" />

            {/* Rotating intricate pure white snowflake crystal */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.85)] animate-[spin_24s_linear_infinite]"
            >
              {/* Central pure snow hexagon */}
              <polygon points="50,42 57,46 57,54 50,58 43,54 43,46" strokeWidth="1.5" />

              {/* 6 Radiant Snow Arms */}
              <line x1="50" y1="42" x2="50" y2="10" />
              <line x1="50" y1="58" x2="50" y2="90" />
              <line x1="43" y1="46" x2="16" y2="30" />
              <line x1="57" y1="54" x2="84" y2="70" />
              <line x1="43" y1="54" x2="16" y2="70" />
              <line x1="57" y1="46" x2="84" y2="30" />

              {/* Crystal Needles / Frost Barbs on each arm */}
              <path d="M50 22 L44 26 M50 22 L56 26" />
              <path d="M50 16 L42 21 M50 16 L58 21" />

              <path d="M50 78 L44 74 M50 78 L56 74" />
              <path d="M50 84 L42 79 M50 84 L58 79" />

              <path d="M26 36 L24 43 M26 36 L31 32" />
              <path d="M74 64 L76 57 M74 64 L69 68" />

              <path d="M26 64 L24 57 M26 64 L31 68" />
              <path d="M74 36 L76 43 M74 36 L69 32" />

              {/* Surrounding snow dots */}
              <circle cx="50" cy="10" r="1.5" fill="#FFFFFF" />
              <circle cx="50" cy="90" r="1.5" fill="#FFFFFF" />
              <circle cx="16" cy="30" r="1.5" fill="#FFFFFF" />
              <circle cx="84" cy="70" r="1.5" fill="#FFFFFF" />
              <circle cx="16" cy="70" r="1.5" fill="#FFFFFF" />
              <circle cx="84" cy="30" r="1.5" fill="#FFFFFF" />
            </svg>

            {/* Inner Mount Kanchenjunga Peak in pure white */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
              >
                <path d="M3 26 L12 12 L16 17 L21 9 L29 26 Z" fill="white" fillOpacity="0.2" />
                <path d="M12 12 L16 17 L21 9" />
              </svg>
            </div>
          </div>

          {/* 2. PURE SNOW-WHITE TYPOGRAPHY */}
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-[0.25em] text-white uppercase drop-shadow-[0_2px_12px_rgba(255,255,255,0.6)]">
              Sikkim Tour Co.
            </h1>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.35em] text-white/90 uppercase">
              Bespoke Himalayan Expeditions
            </p>
          </div>

          {/* 3. PURE SNOW-WHITE MOUNTAIN RIDGE SILHOUETTE LINE */}
          <div className="w-56 sm:w-72 h-8 flex items-center justify-center">
            <svg
              viewBox="0 0 280 40"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-white"
            >
              {/* Outer foothills in pure snow white */}
              <path
                d="M10 35 L50 20 L90 28 L140 10 L190 28 L230 20 L270 35"
                strokeOpacity="0.5"
                strokeDasharray="300"
                strokeDashoffset={300 - (progress / 100) * 300}
              />
              {/* Kanchenjunga Main Summit in pure snow white */}
              <path
                d="M40 35 L90 18 L140 5 L190 18 L240 35"
                strokeWidth="2"
                strokeDasharray="250"
                strokeDashoffset={250 - (progress / 100) * 250}
              />
              {/* Summit Star */}
              <circle
                cx="140"
                cy="5"
                r="2.5"
                fill="#FFFFFF"
                className="drop-shadow-[0_0_8px_#ffffff]"
              />
            </svg>
          </div>

          {/* 4. PURE WHITE PROGRESS LINE & TAP ADVISORY */}
          <div className="w-48 sm:w-60 flex flex-col items-center space-y-2">
            <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white shadow-[0_0_8px_#ffffff] transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/70 uppercase">
              {isParting ? 'Unveiling Himalayas...' : 'Tap anywhere to enter'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
