import React, { useState, useEffect, useRef } from 'react';
import { HimalayanSnowCanvas } from './HimalayanSnowCanvas';
import { Camera, Mountain, Play, Pause, Compass } from 'lucide-react';

interface MountainScene {
  id: string;
  name: string;
  elevation: string;
  district: string;
  imageUrl: string;
  credit: string;
  description: string;
}

const HIMALAYAN_SCENES: MountainScene[] = [
  {
    id: 'kanchenjunga',
    name: 'Mt. Kanchenjunga Sunrise',
    elevation: '28,169 ft (8,586 m)',
    district: 'West Sikkim / Gangtok Horizon',
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2560&q=85',
    credit: 'Sacred Himalayan Crest',
    description: 'First light striking the world’s 3rd highest peak',
  },
  {
    id: 'gurudongmar',
    name: 'Gurudongmar Sacred Lake',
    elevation: '17,800 ft (5,425 m)',
    district: 'North Sikkim Frontier',
    imageUrl:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2560&q=85',
    credit: 'High Glacial Wonder',
    description: 'Turquoise glacial waters blessed by Guru Padmasambhava',
  },
  {
    id: 'yumthang',
    name: 'Yumthang & Zero Point Snow',
    elevation: '15,300 ft (4,663 m)',
    district: 'Lachung Valley',
    imageUrl:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2560&q=85',
    credit: 'Alpine Snow Sanctuary',
    description: 'Pristine winter snow slopes and frozen riverbeds',
  },
  {
    id: 'zuluk',
    name: 'Old Silk Route & Zuluk Pass',
    elevation: '11,200 ft (3,413 m)',
    district: 'East Sikkim Hairpins',
    imageUrl:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2560&q=85',
    credit: 'Historic 32 Loops',
    description: 'The ancient trans-Himalayan trade route under morning mist',
  },
];

interface CinematicHeroBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export const CinematicHeroBackground: React.FC<CinematicHeroBackgroundProps> = ({
  children,
  className = '',
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [scrollY, setScrollY] = useState<number>(0);
  const [, setIsLoaded] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeScene = HIMALAYAN_SCENES[currentSceneIndex];

  // Scroll listener for dynamic 3D zoom & parallax
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-cycle through scenes like a cinematic video reel
  useEffect(() => {
    if (!isAutoPlaying) return;

    timerRef.current = setInterval(() => {
      setCurrentSceneIndex((prev) => (prev + 1) % HIMALAYAN_SCENES.length);
    }, 9000); // 9 seconds per vista

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying]);

  // Preload images
  useEffect(() => {
    HIMALAYAN_SCENES.forEach((scene) => {
      const img = new Image();
      img.src = scene.imageUrl;
    });
    setIsLoaded(true);
  }, []);

  // Compute scroll-driven dynamic zoom & parallax
  // When scrolling down, the mountains scale up smoothly (1.0 -> 1.15) and translate downward
  const parallaxOffsetY = Math.min(scrollY * 0.28, 260);
  const scrollZoom = 1 + Math.min(scrollY * 0.0004, 0.16);

  return (
    <section className={`relative w-full overflow-hidden bg-[#0A2621] ${className}`}>
      {/* 1. CINEMATIC VIDEO-LIKE MOUNTAIN BACKGROUND LAYERS */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {HIMALAYAN_SCENES.map((scene, index) => {
          const isCurrent = index === currentSceneIndex;

          return (
            <div
              key={scene.id}
              className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
                isCurrent ? 'opacity-100 z-[1]' : 'opacity-0 z-0'
              }`}
              style={{
                transform: `scale(${scrollZoom}) translateY(${parallaxOffsetY}px)`,
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
            >
              {/* Image with subtle continuous Ken Burns drone drift animation */}
              <img
                src={scene.imageUrl}
                alt={scene.name}
                className={`w-full h-full object-cover object-center ${
                  isCurrent ? 'animate-ken-burns' : ''
                }`}
                style={{
                  filter: 'contrast(1.05) brightness(0.92) saturate(1.08)',
                }}
              />
            </div>
          );
        })}

        {/* 2. CRYSTAL-CLEAR NATURAL CINEMATIC GRADIENT APERTURE */}
        {/* Preserves mountain clarity and snow peaks while guaranteeing 100% white text readability */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#103D35] via-[#103D35]/35 to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#103D35]/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_40%,_transparent_40%,_rgba(10,38,33,0.5)_100%)] pointer-events-none" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#EBA94B]/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* 3. AESTHETIC ALPINE SNOWFALL CANVAS */}
      <HimalayanSnowCanvas className="z-[10]" density={65} interactive={true} />

      {/* 4. SCENE INFO BADGE & CONTROLS (Floats gracefully in the Hero) */}
      <div className="absolute top-24 right-4 sm:right-8 z-[25] hidden md:flex items-center gap-2.5 bg-black/50 hover:bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs text-white shadow-xl transition-all">
        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <Camera className="w-3.5 h-3.5 text-[#EBA94B]" />
        <span className="font-serif font-bold text-white tracking-wide">
          {activeScene.name}
        </span>
        <span className="text-[#EBA94B] font-mono text-[10px]">
          {activeScene.elevation}
        </span>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsAutoPlaying((prev) => !prev)}
          className="ml-1 p-1 hover:bg-white/20 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
          title={isAutoPlaying ? 'Pause Vista Rotation' : 'Play Vista Rotation'}
          aria-label="Toggle Vista Rotation"
        >
          {isAutoPlaying ? (
            <Pause className="w-3 h-3 text-[#EBA94B]" />
          ) : (
            <Play className="w-3 h-3 text-[#EBA94B]" />
          )}
        </button>
      </div>

      {/* 5. INTERACTIVE SCENE SWITCHER PILLS (Bottom-Left Depth Bar) */}
      <div className="absolute bottom-6 left-4 sm:left-8 z-[25] hidden lg:flex items-center gap-2 bg-black/45 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 shadow-2xl">
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#EBA94B] px-2 font-bold flex items-center gap-1">
          <Compass className="w-3 h-3" />
          <span>Vistas:</span>
        </span>
        {HIMALAYAN_SCENES.map((scene, idx) => {
          const isSelected = idx === currentSceneIndex;
          return (
            <button
              key={scene.id}
              onClick={() => {
                setCurrentSceneIndex(idx);
                setIsAutoPlaying(false);
              }}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-medium transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#103D35] text-[#EBA94B] font-bold border border-[#EBA94B]/60 shadow-lg scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
            >
              {scene.name.split(' ')[0]} {scene.id === 'gurudongmar' ? '17,800ft' : ''}
            </button>
          );
        })}
      </div>

      {/* 6. HERO CONTENT CONTAINER (Passed as children) */}
      <div className="relative z-[20] w-full flex-1 flex flex-col justify-between">
        {children}
      </div>
    </section>
  );
};
