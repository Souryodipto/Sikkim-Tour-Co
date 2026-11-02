import React, { useState, useEffect, useRef, useCallback } from 'react';

interface SnowWhiteIntroAnimationProps {
  /** Target duration in milliseconds before curtain parting (default: 3200ms, mobile: 2400ms) */
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
  layer: 'bg' | 'mid' | 'fg';
  vx: number;
  vy: number;
}

export const SnowWhiteIntroAnimation: React.FC<SnowWhiteIntroAnimationProps> = ({
  durationMs = 3200,
  onComplete,
  allowSkip = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isParting, setIsParting] = useState(false);
  const [progress, setProgress] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isPartingRef = useRef(false);

  // Lengthy yet graceful timing: 2400ms on mobile, 3200ms on desktop
  const effectiveDuration = React.useMemo(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return Math.min(durationMs, 2400);
    }
    return durationMs;
  }, [durationMs]);

  const handleDismiss = useCallback(() => {
    if (isPartingRef.current) return;
    isPartingRef.current = true;
    setIsParting(true);

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 600);
    return () => clearTimeout(exitTimer);
  }, [onComplete]);

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

  // Multi-layered 60FPS Pure Snow-White Canvas with Radial Dispersal Burst
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

    // Multi-depth snowflake population (70 on desktop, 42 on mobile)
    const particleCount = window.innerWidth < 768 ? 42 : 72;
    const flakes: SnowflakeParticle[] = Array.from({ length: particleCount }, (_, i) => {
      const layerType: 'bg' | 'mid' | 'fg' = i % 3 === 0 ? 'fg' : i % 3 === 1 ? 'mid' : 'bg';
      const radius =
        layerType === 'fg'
          ? Math.random() * 2.2 + 2.0
          : layerType === 'mid'
          ? Math.random() * 1.5 + 1.2
          : Math.random() * 1.0 + 0.6;
      const speedY =
        layerType === 'fg'
          ? Math.random() * 1.8 + 1.4
          : layerType === 'mid'
          ? Math.random() * 1.2 + 0.8
          : Math.random() * 0.8 + 0.5;

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius,
        speedY,
        speedX: (Math.random() - 0.5) * 0.7,
        opacity: layerType === 'fg' ? 0.95 : layerType === 'mid' ? 0.75 : 0.45,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.04,
        layer: layerType,
        vx: 0,
        vy: 0,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const parting = isPartingRef.current;

      ctx.fillStyle = '#FFFFFF';

      for (let i = 0; i < flakes.length; i++) {
        const flake = flakes[i];

        if (parting) {
          // Radial explosive snow burst outward from center on dismissal
          if (flake.vx === 0 && flake.vy === 0) {
            const dx = flake.x - centerX;
            const dy = flake.y - centerY;
            const dist = Math.max(20, Math.sqrt(dx * dx + dy * dy));
            const burstForce = Math.random() * 9 + 6;
            flake.vx = (dx / dist) * burstForce;
            flake.vy = (dy / dist) * burstForce;
          }
          flake.x += flake.vx;
          flake.y += flake.vy;
          flake.opacity = Math.max(0, flake.opacity - 0.025);
        } else {
          // Natural undulating Himalayan snowfall with sinusoidal breeze
          flake.y += flake.speedY;
          flake.x += flake.speedX + Math.sin(flake.angle) * 0.75;
          flake.angle += flake.angularSpeed;

          if (flake.y > height + 8) {
            flake.y = -8;
            flake.x = Math.random() * width;
          }
          if (flake.x > width + 8) flake.x = -8;
          if (flake.x < -8) flake.x = width + 8;
        }

        ctx.globalAlpha = Math.max(0, flake.opacity);
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra crystalline frost glow for foreground flakes
        if (flake.layer === 'fg' && flake.opacity > 0.5) {
          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.radius * 2.2, 0, Math.PI * 2);
          ctx.globalAlpha = flake.opacity * 0.25;
          ctx.fill();
        }
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

  // Phase narration based on animation progress
  const getPhaseNarrative = () => {
    if (progress < 25) return 'I. Gathering Himalayan Snow Mist';
    if (progress < 55) return 'II. Tracing Kanchenjunga Alpine Crest';
    if (progress < 85) return 'III. Awakening Sikkim Winter Trails';
    return 'IV. Unveiling Pure Himalayan Sanctuary';
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to Sikkim Tour Co. - Pure Snow White Winter Entrance"
      onClick={allowSkip ? handleDismiss : undefined}
      className={`fixed inset-0 z-[9999] select-none overflow-hidden transition-all duration-700 ease-out ${
        allowSkip ? 'cursor-pointer' : ''
      } ${isParting ? 'pointer-events-none' : ''}`}
    >
      {/* TOP SNOW-CURTAIN PANEL (Deep Alpine Mist with Frosted Sheen) */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-[#030d0a] border-b border-white/25 transition-all duration-700 ease-in-out ${
          isParting ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-white/5 pointer-events-none" />
      </div>

      {/* BOTTOM SNOW-CURTAIN PANEL */}
      <div
        className={`absolute inset-x-0 bottom-0 h-1/2 bg-[#030d0a] border-t border-white/25 transition-all duration-700 ease-in-out ${
          isParting ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/12 via-transparent to-white/5 pointer-events-none" />
      </div>

      {/* MULTI-LAYER SNOW CANVAS */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isParting ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* TOP HUD: COORDINATES & SKIP ACTION */}
      <div
        className={`absolute top-4 sm:top-6 inset-x-0 max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between text-white/80 transition-all duration-500 ${
          isParting ? 'opacity-0 -translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] text-white uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
            MT. KANCHENJUNGA · 8,586 M
          </span>
        </div>

        {allowSkip && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            aria-label="Skip entrance animation"
            className="px-3.5 py-1.5 rounded-full border border-white/50 hover:border-white bg-white/10 hover:bg-white/20 text-white text-[10px] sm:text-xs font-mono tracking-widest transition-all duration-200 shadow-[0_0_12px_rgba(255,255,255,0.2)]"
          >
            Enter Website →
          </button>
        )}
      </div>

      {/* CENTRAL HERO: KINETIC SNOW-WHITE MANDALA, KANCHENJUNGA SILHOUETTE & TYPOGRAPHY */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center transition-all duration-600 ease-out ${
          isParting ? 'opacity-0 scale-110 filter blur-md' : 'opacity-100 scale-100'
        }`}
      >
        <div className="relative flex flex-col items-center space-y-4 sm:space-y-6 max-w-xl mx-auto">
          {/* 1. DUAL-CONCENTRIC ROTATING SNOWFLAKE MANDALA */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            {/* Soft breathing snow halo */}
            <div className="absolute inset-0 rounded-full bg-white/20 blur-2xl animate-pulse" />

            {/* Outer Ring: 12-Point Crystal Halo rotating clockwise */}
            <svg
              viewBox="0 0 120 120"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
              className="absolute inset-0 w-full h-full text-white drop-shadow-[0_0_14px_rgba(255,255,255,0.9)] animate-[spin_32s_linear_infinite]"
            >
              <circle cx="60" cy="60" r="54" strokeDasharray="3 6" opacity="0.6" />
              {/* 12 Outer Crystal Prisms */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <g key={deg} transform={`rotate(${deg} 60 60)`}>
                  <line x1="60" y1="6" x2="60" y2="16" />
                  <circle cx="60" cy="6" r="1.5" fill="#FFFFFF" />
                  <path d="M57 11 L60 8 L63 11" />
                </g>
              ))}
            </svg>

            {/* Inner Ring: 6-Point Fractal Snowflake counter-rotating */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-20 h-20 sm:w-24 sm:h-24 text-white drop-shadow-[0_0_16px_rgba(255,255,255,1)] animate-[spin_20s_linear_infinite_reverse]"
            >
              {/* Central Hexagonal Star */}
              <polygon points="50,40 58,45 58,55 50,60 42,55 42,45" strokeWidth="1.5" />
              <line x1="50" y1="40" x2="50" y2="8" />
              <line x1="50" y1="60" x2="50" y2="92" />
              <line x1="42" y1="45" x2="14" y2="29" />
              <line x1="58" y1="55" x2="86" y2="71" />
              <line x1="42" y1="55" x2="14" y2="71" />
              <line x1="58" y1="45" x2="86" y2="29" />

              {/* Frost Chevron Needles */}
              <path d="M50 20 L44 25 M50 20 L56 25" />
              <path d="M50 14 L42 20 M50 14 L58 20" />
              <path d="M50 80 L44 75 M50 80 L56 75" />
              <path d="M50 86 L42 80 M50 86 L58 80" />

              <path d="M24 35 L22 42 M24 35 L29 31" />
              <path d="M76 65 L78 58 M76 65 L71 69" />
              <path d="M24 65 L22 58 M24 65 L29 69" />
              <path d="M76 35 L78 42 M76 35 L71 31" />
            </svg>

            {/* Inner Sacred Mountain Icon in Pure White */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8 text-white drop-shadow-[0_0_10px_#FFFFFF]"
              >
                <path d="M3 26 L12 11 L16 17 L21 8 L29 26 Z" fill="white" fillOpacity="0.3" />
                <path d="M12 11 L16 17 L21 8" />
              </svg>
            </div>
          </div>

          {/* 2. PURE SNOW-WHITE TYPOGRAPHY & SHIMMER */}
          <div className="space-y-2">
            <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-[0.28em] sm:tracking-[0.32em] text-white uppercase drop-shadow-[0_4px_20px_rgba(255,255,255,0.8)]">
              Sikkim Tour Co.
            </h1>
            <p className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-white/90 uppercase drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
              Your Winter Escape to the Himalayas
            </p>
          </div>

          {/* 3. DETAILED 5-PEAK KANCHENJUNGA VECTOR ANIMATION */}
          <div className="w-64 sm:w-84 h-10 flex items-center justify-center">
            <svg
              viewBox="0 0 320 50"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full text-white"
            >
              {/* Outer Lower Foothills & Valleys */}
              <path
                d="M5 45 L40 32 L80 38 L120 22 L160 8 L200 22 L240 38 L280 32 L315 45"
                strokeOpacity="0.45"
                strokeDasharray="400"
                strokeDashoffset={400 - (progress / 100) * 400}
              />
              {/* Sacred 5 Peaks Ridge Line */}
              <path
                d="M30 45 L75 25 L115 15 L160 5 L205 15 L245 25 L290 45"
                strokeWidth="2.2"
                strokeDasharray="360"
                strokeDashoffset={360 - (progress / 100) * 360}
              />
              {/* Snow Peak Crest Shimmer Nodes */}
              <circle cx="160" cy="5" r="3" fill="#FFFFFF" className="drop-shadow-[0_0_10px_#FFFFFF]" />
              <circle cx="115" cy="15" r="2" fill="#FFFFFF" opacity="0.8" />
              <circle cx="205" cy="15" r="2" fill="#FFFFFF" opacity="0.8" />
            </svg>
          </div>

          {/* 4. PROGRESS BAR & DYNAMIC PHASE NARRATIVE */}
          <div className="w-52 sm:w-68 flex flex-col items-center space-y-2.5">
            {/* Luminous Pure White Progress Track */}
            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden p-0.5 border border-white/30">
              <div
                className="h-full bg-white shadow-[0_0_12px_#FFFFFF] transition-all duration-100 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic Stage Narrative Text */}
            <div className="flex flex-col items-center space-y-1">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/90 uppercase drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
                {getPhaseNarrative()}
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.2em] text-white/60 uppercase">
                {isParting ? 'Entering Mountain World...' : 'Tap anywhere to enter immediately'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
