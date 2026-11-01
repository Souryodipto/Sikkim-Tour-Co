import React, { useEffect, useState, useRef } from 'react';
import { HimalayanSnowCanvas } from './HimalayanSnowCanvas';

export interface MountainElevationZone {
  id: string;
  name: string;
  elevation: string;
  elevationFt: number;
  district: string;
  imageUrl: string;
  centerProgress: number; // 0.0 to 1.0 where this vista is fully opaque
  description: string;
}

export const HIMALAYAN_EXPEDITION_ZONES: MountainElevationZone[] = [
  {
    id: 'kanchenjunga',
    name: 'Mt. Kanchenjunga Sunrise',
    elevation: '28,169 ft (8,586 m)',
    elevationFt: 28169,
    district: 'West Sikkim / Gangtok Horizon',
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85',
    centerProgress: 0.05,
    description: 'First light striking the sacred summit of the world’s 3rd highest peak',
  },
  {
    id: 'gurudongmar',
    name: 'Gurudongmar Sacred Lake',
    elevation: '17,800 ft (5,425 m)',
    elevationFt: 17800,
    district: 'North Sikkim Frontier',
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85',
    centerProgress: 0.38,
    description: 'Turquoise glacial waters blessed by Guru Padmasambhava at the roof of Sikkim',
  },
  {
    id: 'yumthang',
    name: 'Yumthang Valley & Zero Point Snow',
    elevation: '15,300 ft (4,663 m)',
    elevationFt: 15300,
    district: 'Lachung Alpine Valley',
    imageUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=85',
    centerProgress: 0.70,
    description: 'Pristine winter snowfields, frosted rhododendron sanctuaries and frozen streams',
  },
  {
    id: 'zuluk',
    name: 'Old Silk Route & Zuluk Mist',
    elevation: '11,200 ft (3,413 m)',
    elevationFt: 11200,
    district: 'East Sikkim Hairpins to Gangtok Valley',
    imageUrl:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2560&q=85',
    centerProgress: 0.98,
    description: 'Historic trans-Himalayan trade loops descending into lush pine valleys at twilight',
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

  // Track page scroll with smooth RAF lerp
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

    // Inertial smooth lerp loop for cinematic motion
    const updateLoop = () => {
      const diff = targetProgressRef.current - currentProgressRef.current;
      if (Math.abs(diff) > 0.0005) {
        currentProgressRef.current += diff * 0.12; // Smooth 12% spring step
      } else {
        currentProgressRef.current = targetProgressRef.current;
      }

      setScrollProgress(currentProgressRef.current);

      // Compute active zone and dynamic altitude
      const progress = currentProgressRef.current;
      const currentElevationFt = Math.round(28169 - progress * (28169 - 5500));

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

  // Compute full-journey zoom transform
  // Zooms smoothly from 1.0x at top to 1.50x at the footer!
  const zoomScale = 1.0 + scrollProgress * 0.48;
  const translateY = -scrollProgress * 120; // Smooth downward parallax counter-drift

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A2621]"
    >
      {/* 1. LAYERED 3D MOUNTAIN VISTAS WITH CONTINUOUS DESCENT ZOOM */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
        style={{
          transform: `scale(${zoomScale}) translateY(${translateY}px)`,
          transformOrigin: '50% 45%',
          willChange: 'transform',
        }}
      >
        {HIMALAYAN_EXPEDITION_ZONES.map((zone, idx) => {
          // Calculate continuous bell-curve opacity
          let opacity = 0;
          if (idx === 0) {
            // First zone: 1.0 at 0.0, fading to 0 by 0.35
            opacity = Math.max(0, 1 - scrollProgress * 3.2);
          } else if (idx === HIMALAYAN_EXPEDITION_ZONES.length - 1) {
            // Last zone (footer): fades in starting at 0.65, 1.0 at 1.0
            opacity = Math.max(0, (scrollProgress - 0.65) * 2.85);
          } else {
            // Middle zones: bell curve around centerProgress
            const distance = Math.abs(scrollProgress - zone.centerProgress);
            opacity = Math.max(0, 1 - distance * 3.6);
          }

          // Clamp opacity between 0 and 1
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
                  filter: 'contrast(1.08) brightness(0.92) saturate(1.1)',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. CRYSTAL-CLEAR NATURAL CINEMATIC GRADIENT APERTURE */}
      {/* Keeps mountain crests crisp and exposed while guaranteeing white & dark text readability */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0A2621]/95 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#103D35]/80 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_35%,_transparent_45%,_rgba(10,38,33,0.45)_100%)] pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EBA94B]/12 via-transparent to-transparent pointer-events-none" />

      {/* 3. AESTHETIC ALPINE SNOWFALL PARTICLES (Flows through the entire site) */}
      {isSnowActive && (
        <HimalayanSnowCanvas
          className="fixed inset-0 pointer-events-none z-[3]"
          density={80}
          interactive={true}
        />
      )}
    </div>
  );
};
