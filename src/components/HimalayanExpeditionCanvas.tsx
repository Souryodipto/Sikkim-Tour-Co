import React, { useEffect, useState, useRef } from 'react';
import { HimalayanSnowCanvas } from './HimalayanSnowCanvas';

export interface MountainElevationZone {
  id: string;
  name: string;
  elevation: string;
  elevationFt: number;
  district: string;
  imageUrl: string;
  centerProgress: number; // 0.0 to 1.0 where this vista is fully focused
  description: string;
}

// Ascending Journey: Starting at Himalayan Valley Basecamp (5,500 ft)
// and deeply zooming in all the way to Mt. Kanchenjunga Sacred Summit (28,169 ft) at the footer!
export const HIMALAYAN_EXPEDITION_ZONES: MountainElevationZone[] = [
  {
    id: 'basecamp-foothills',
    name: 'Sikkim Himalayan Valley & Basecamp',
    elevation: '5,500 ft (1,676 m)',
    elevationFt: 5500,
    district: 'Gangtok Valley & Mountain Ridge',
    imageUrl:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2560&q=85',
    centerProgress: 0.05,
    description: 'Looking out from the basecamp foothills across emerald pine ridges towards the distant peaks',
  },
  {
    id: 'dzongri-ridge',
    name: 'Dzongri Alpine Ridge & Sacred Pass',
    elevation: '12,500 ft (3,810 m)',
    elevationFt: 12500,
    district: 'West Sikkim High Trail',
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85',
    centerProgress: 0.35,
    description: 'Glacial torrents and alpine rhododendron valleys approaching the high Himalayan crest',
  },
  {
    id: 'kanchenjunga-basecamp',
    name: 'Kanchenjunga Base Camp & Goecha La',
    elevation: '16,200 ft (4,938 m)',
    elevationFt: 16200,
    district: 'Goecha La / Kanchenjunga Glacier Basin',
    imageUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=85',
    centerProgress: 0.68,
    description: 'Standing at the foot of colossal hanging glaciers beneath jagged snow amphitheaters',
  },
  {
    id: 'kanchenjunga-summit',
    name: 'Mt. Kanchenjunga Sacred Summit',
    elevation: '28,169 ft (8,586 m)',
    elevationFt: 28169,
    district: 'Sacred Himalayan Crest · 3rd Highest Peak on Earth',
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85',
    centerProgress: 0.98,
    description: 'Deep colossal zoom into the golden sunrise alpenglow on the sacred crown of Mount Kanchenjunga',
  },
];

interface HimalayanExpeditionCanvasProps {
  isSnowActive?: boolean;
  onScrollUpdate?: (progress: number, activeZone: MountainElevationZone, currentElevationFt: number) => void;
}

export const HimalayanExpeditionCanvas: React.FC<HimalayanExpeditionCanvasProps> = ({
  isSnowActive = true,
  onScrollUpdate,
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Preload all high-res vistas into memory
  useEffect(() => {
    HIMALAYAN_EXPEDITION_ZONES.forEach((zone) => {
      const img = new Image();
      img.src = zone.imageUrl;
    });
  }, []);

  // Track page scroll with smooth inertial spring physics
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const raw = window.scrollY / docHeight;
        targetProgressRef.current = Math.min(Math.max(raw, 0), 1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // Inertial smooth lerp loop for cinema-quality camera glide
    const updateLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.12; // Smooth 12% inertia
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      const progress = currentProgressRef.current;
      setScrollProgress(progress);

      // Ascending Altitude calculation:
      // Starts at Basecamp 5,500 ft at line 0, ascends to 28,169 ft at the footer!
      const currentElevationFt = Math.round(5500 + progress * (28169 - 5500));

      let closestZone = HIMALAYAN_EXPEDITION_ZONES[0];
      let minDistance = 999;
      HIMALAYAN_EXPEDITION_ZONES.forEach((z) => {
        const dist = Math.abs(progress - z.centerProgress);
        if (dist < minDistance) {
          minDistance = dist;
          closestZone = z;
        }
      });

      if (onScrollUpdate) {
        onScrollUpdate(progress, closestZone, currentElevationFt);
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [onScrollUpdate]);

  // Deep continuous zoom towards Kanchenjunga:
  // Starts wide (1.0x) at Basecamp, and zooms deeply (up to 2.0x) directly into Kanchenjunga at the footer!
  const zoomScale = 1.0 + Math.pow(scrollProgress, 0.9) * 0.95;
  const translateY = -scrollProgress * 140; // Upward camera ascension parallax

  const currentElevationFt = Math.round(5500 + scrollProgress * (28169 - 5500));
  const currentElevationM = Math.round(currentElevationFt * 0.3048);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A2621]"
    >
      {/* 1. LAYERED 3D MOUNTAIN VISTAS WITH CONTINUOUS ZOOM TOWARDS KANCHENJUNGA */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${zoomScale}) translateY(${translateY}px)`,
          transformOrigin: '50% 35%',
          willChange: 'transform',
        }}
      >
        {HIMALAYAN_EXPEDITION_ZONES.map((zone, idx) => {
          // Calculate continuous bell-curve crossfade opacity
          let opacity = 0;
          if (idx === 0) {
            // First zone (Basecamp): 1.0 at top, fades out by 0.35
            opacity = Math.max(0, 1 - scrollProgress * 3.0);
          } else if (idx === HIMALAYAN_EXPEDITION_ZONES.length - 1) {
            // Last zone (Kanchenjunga Summit at footer): fades in from 0.58, 1.0 at footer
            opacity = Math.max(0, (scrollProgress - 0.58) * 2.3);
          } else {
            // Middle zones: smooth bell curve centered at centerProgress
            const distance = Math.abs(scrollProgress - zone.centerProgress);
            opacity = Math.max(0, 1 - distance * 3.2);
          }

          opacity = Math.min(Math.max(opacity, 0), 1);

          return (
            <div
              key={zone.id}
              className="absolute inset-0 transition-opacity duration-300 ease-out"
              style={{
                opacity,
                willChange: 'opacity',
              }}
            >
              <img
                src={zone.imageUrl}
                alt={zone.name}
                className="w-full h-full object-cover object-center animate-ken-burns"
                style={{
                  filter: 'contrast(1.06) brightness(0.96) saturate(1.15)',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. AMBIENT BACKGROUND ALTIMETER & TOPOGRAPHIC CONTOUR SCALE */}
      {/* Subtle, luxury typography & elevation rail visible directly in the background! */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden select-none">
        {/* A. Left-side Altitude Rail with climbing beacon */}
        <div className="hidden lg:flex absolute left-8 top-28 bottom-28 flex-col justify-between items-start text-[10px] font-mono text-white/55 tracking-wider">
          {/* Summit mark */}
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-[1.5px] bg-[#EBA94B]" />
            <span className="text-[#EBA94B] font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              28,169 FT · KANCHENJUNGA SUMMIT
            </span>
          </div>

          {/* High Pass mark */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-[1px] bg-white/50" />
            <span className="text-white/70 drop-shadow">22,000 FT · HIGH GLACIAL PASS</span>
          </div>

          {/* Goecha La / Base Camp mark */}
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-[1px] bg-white/60" />
            <span className="text-white/80 drop-shadow">16,200 FT · BASE CAMP (GOECHA LA)</span>
          </div>

          {/* Dzongri mark */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-[1px] bg-white/50" />
            <span className="text-white/70 drop-shadow">12,500 FT · DZONGRI SACRED RIDGE</span>
          </div>

          {/* Basecamp Valley mark */}
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-[1.5px] bg-emerald-400" />
            <span className="text-emerald-300 font-bold tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              5,500 FT · SIKKIM BASECAMP VALLEY
            </span>
          </div>

          {/* Vertical axis line */}
          <div className="absolute left-[7px] top-1.5 bottom-1.5 w-[1.5px] bg-gradient-to-b from-[#EBA94B]/90 via-white/40 to-emerald-400/90" />

          {/* Dynamic climbing beacon */}
          <div
            className="absolute left-[4px] w-2.5 h-2.5 rounded-full bg-[#EBA94B] shadow-[0_0_16px_#EBA94B] transition-all duration-75 border border-white"
            style={{
              bottom: `${scrollProgress * 100}%`,
              transform: 'translateY(50%)',
            }}
          />
        </div>

        {/* B. Ambient Background Altimeter Watermark (Right edge) */}
        <div className="absolute top-28 right-6 sm:right-12 z-[2] text-right pointer-events-none opacity-40 hover:opacity-60 transition-opacity font-mono">
          <div className="text-[10px] tracking-widest text-[#EBA94B] uppercase font-bold drop-shadow">
            HIMALAYAN EXPEDITION ALTIMETER
          </div>
          <div className="text-4xl sm:text-6xl font-black text-white tracking-tighter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            {currentElevationFt.toLocaleString()}{' '}
            <span className="text-sm sm:text-base font-bold text-[#EBA94B]">FT</span>
          </div>
          <div className="text-[11px] tracking-wider text-white/80 drop-shadow">
            {currentElevationM.toLocaleString()} M · ASCENT TO MT. KANCHENJUNGA
          </div>
          <div className="text-[9px] text-[#EBA94B]/80 tracking-widest mt-1 drop-shadow">
            ZOOM: {zoomScale.toFixed(2)}x · {Math.round(scrollProgress * 100)}% ASCENT
          </div>
        </div>
      </div>

      {/* 3. CRYSTAL-CLEAR NATURAL CINEMATIC GRADIENT APERTURE */}
      {/* Keeps mountains crisp and clearly visible across entire page down to footer */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(circle_at_50%_38%,_transparent_60%,_rgba(0,0,0,0.25)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[3] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EBA94B]/10 via-transparent to-transparent pointer-events-none" />

      {/* 4. AESTHETIC ALPINE SNOWFALL PARTICLES (Across entire website) */}
      {isSnowActive && (
        <HimalayanSnowCanvas
          className="fixed inset-0 pointer-events-none z-[4]"
          density={85}
          interactive={true}
          showToggleButton={false}
        />
      )}
    </div>
  );
};
