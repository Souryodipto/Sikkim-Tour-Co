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
  onScrollUpdate?: (progress: number) => void;
}

export const HimalayanExpeditionCanvas: React.FC<HimalayanExpeditionCanvasProps> = ({
  isSnowActive = true,
  onScrollUpdate,
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);

  // Preload mountain vistas after loading animation completes to preserve mobile network bandwidth
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const timer = setTimeout(() => {
      HIMALAYAN_EXPEDITION_ZONES.forEach((zone) => {
        const img = new Image();
        img.src = isMobile
          ? zone.imageUrl.replace('w=2560&q=85', 'w=1280&q=75')
          : zone.imageUrl;
      });
    }, 2800);

    return () => clearTimeout(timer);
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

    // Inertial smooth lerp loop with mobile-calibrated threshold to prevent unnecessary React re-renders
    const updateLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      const isMobile = window.innerWidth < 768;
      const threshold = isMobile ? 0.008 : 0.0008;

      if (Math.abs(diff) > threshold) {
        currentProgressRef.current += diff * (isMobile ? 0.2 : 0.12);
        const progress = currentProgressRef.current;
        setScrollProgress(progress);
        if (onScrollUpdate) {
          onScrollUpdate(progress);
        }
      } else if (Math.abs(diff) > 0.0001) {
        currentProgressRef.current = targetProgressRef.current;
        setScrollProgress(targetProgressRef.current);
        if (onScrollUpdate) {
          onScrollUpdate(targetProgressRef.current);
        }
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
                src={
                  typeof window !== 'undefined' && window.innerWidth < 768
                    ? zone.imageUrl.replace('w=2560&q=85', 'w=1280&q=75')
                    : zone.imageUrl
                }
                alt={zone.name}
                loading={idx === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover object-center animate-ken-burns"
                style={{
                  filter: 'contrast(1.06) brightness(0.96) saturate(1.15)',
                }}
              />
            </div>
          );
        })}
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
          density={typeof window !== 'undefined' && window.innerWidth < 768 ? 14 : 75}
          interactive={true}
          showToggleButton={false}
        />
      )}
    </div>
  );
};
