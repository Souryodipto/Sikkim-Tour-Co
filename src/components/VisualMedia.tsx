import React, { useState } from 'react';

export type VisualPreset =
  | 'kanchenjunga-sunrise'
  | 'north-sikkim'
  | 'east-sikkim'
  | 'west-sikkim'
  | 'south-sikkim'
  | 'gangtok'
  | 'pelling'
  | 'namchi'
  | 'yumthang'
  | 'tsomgo'
  | 'gurudongmar'
  | 'yuksom'
  | 'temi'
  | 'honeymoon'
  | 'luxury'
  | 'general';

interface VisualMediaProps {
  src?: string;
  alt: string;
  preset?: VisualPreset;
  aspectRatio?: '16/9' | '4/3' | '3/2' | '1/1' | 'auto';
  className?: string;
  overlayOpacity?: 'none' | 'light' | 'medium' | 'dark';
  children?: React.ReactNode;
}

export const VisualMedia: React.FC<VisualMediaProps> = ({
  src,
  alt,
  preset = 'general',
  aspectRatio = '4/3',
  className = '',
  overlayOpacity = 'light',
  children,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // If no src or error loading, we render the bespoke Himalayan SVG illustration
  const showIllustration = !src || imageError;

  const overlayClass = {
    none: '',
    light: 'bg-gradient-to-t from-black/60 via-black/20 to-transparent',
    medium: 'bg-gradient-to-t from-black/80 via-black/35 to-black/10',
    dark: 'bg-gradient-to-t from-black/90 via-black/50 to-black/30',
  }[overlayOpacity];

  const aspectClass = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    auto: 'h-full w-full',
  }[aspectRatio];

  return (
    <div className={`relative overflow-hidden bg-[#173D35] ${aspectClass} ${className}`}>
      {/* Background Layer: Real Image if loaded and valid */}
      {src && !imageError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Styled Authentic Himalayan Vector Illustration Fallback */}
      {showIllustration && <HimalayanVectorIllustration preset={preset} alt={alt} />}

      {/* Scrim Overlay for Legibility */}
      {overlayOpacity !== 'none' && (
        <div className={`absolute inset-0 pointer-events-none ${overlayClass}`} aria-hidden="true" />
      )}

      {/* Optional Inset Content */}
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
};

interface IllustrationProps {
  preset: VisualPreset;
  alt: string;
}

const HimalayanVectorIllustration: React.FC<IllustrationProps> = ({ preset, alt }) => {
  const getTheme = () => {
    switch (preset) {
      case 'kanchenjunga-sunrise':
        return {
          sky: 'from-[#0D1F1A] via-[#1B3B32] to-[#4A3222]',
          sunGlow: '#DFC89E',
          peaks: '#F8F6F0',
          peakShade: '#A3B8B0',
          ridges: '#23443B',
          foreRidge: '#132822',
        };
      case 'north-sikkim':
      case 'gurudongmar':
        return {
          sky: 'from-[#0A1714] via-[#16332B] to-[#2B4B41]',
          sunGlow: '#EBF1EE',
          peaks: '#FFFFFF',
          peakShade: '#8FAAA0',
          ridges: '#1E3C33',
          foreRidge: '#0F211C',
        };
      case 'yumthang':
        return {
          sky: 'from-[#173D35] via-[#2F584C] to-[#5C4535]',
          sunGlow: '#E0CFA7',
          peaks: '#F4EFEB',
          peakShade: '#7E9C92',
          ridges: '#264B40',
          foreRidge: '#162C25',
        };
      case 'west-sikkim':
      case 'pelling':
      case 'yuksom':
        return {
          sky: 'from-[#0E201B] via-[#1C3D34] to-[#3B483B]',
          sunGlow: '#DFC89E',
          peaks: '#FFFFFF',
          peakShade: '#8BA59B',
          ridges: '#23443B',
          foreRidge: '#11221D',
        };
      case 'south-sikkim':
      case 'namchi':
      case 'temi':
        return {
          sky: 'from-[#11241F] via-[#234A3E] to-[#3A4E38]',
          sunGlow: '#C4A36A',
          peaks: '#FAF7F2',
          peakShade: '#78958A',
          ridges: '#27473C',
          foreRidge: '#152922',
        };
      case 'east-sikkim':
      case 'gangtok':
      case 'tsomgo':
        return {
          sky: 'from-[#102620] via-[#1E4338] to-[#35493F]',
          sunGlow: '#C4A36A',
          peaks: '#FAF8F5',
          peakShade: '#7F9E93',
          ridges: '#224339',
          foreRidge: '#122620',
        };
      case 'honeymoon':
      case 'luxury':
        return {
          sky: 'from-[#0B1A16] via-[#18312B] to-[#3E2B25]',
          sunGlow: '#C4A36A',
          peaks: '#F5EBE1',
          peakShade: '#93A49E',
          ridges: '#213C34',
          foreRidge: '#12231E',
        };
      default:
        return {
          sky: 'from-[#102620] via-[#1E4338] to-[#35493F]',
          sunGlow: '#C4A36A',
          peaks: '#FAF8F5',
          peakShade: '#7F9E93',
          ridges: '#224339',
          foreRidge: '#122620',
        };
    }
  };

  const theme = getTheme();

  return (
    <div className={`relative w-full h-full bg-gradient-to-b ${theme.sky} flex items-center justify-center select-none`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={alt}
      >
        <defs>
          <radialGradient id={`sun-${preset}`} cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor={theme.sunGlow} stopOpacity="0.65" />
            <stop offset="60%" stopColor={theme.sunGlow} stopOpacity="0.15" />
            <stop offset="100%" stopColor={theme.sunGlow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`peakGrad-${preset}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.peaks} />
            <stop offset="65%" stopColor={theme.peakShade} />
            <stop offset="100%" stopColor={theme.ridges} />
          </linearGradient>
          <linearGradient id={`ridgeGrad-${preset}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.ridges} />
            <stop offset="100%" stopColor={theme.foreRidge} />
          </linearGradient>
        </defs>

        {/* Ambient Sun / Light Aura */}
        <circle cx="480" cy="180" r="220" fill={`url(#sun-${preset})`} />

        {/* Distant Highest Peaks (Kanchenjunga massif geometry) */}
        <polygon points="400,95 490,260 310,260" fill={`url(#peakGrad-${preset})`} opacity="0.95" />
        <polygon points="400,95 490,260 400,260" fill="#000000" opacity="0.16" />
        <polygon points="480,135 570,280 390,280" fill={`url(#peakGrad-${preset})`} opacity="0.88" />
        <polygon points="480,135 570,280 480,280" fill="#000000" opacity="0.18" />
        <polygon points="290,140 375,280 205,280" fill={`url(#peakGrad-${preset})`} opacity="0.9" />
        <polygon points="290,140 375,280 290,280" fill="#000000" opacity="0.14" />
        <polygon points="180,185 270,300 90,300" fill={`url(#peakGrad-${preset})`} opacity="0.8" />
        <polygon points="610,175 700,300 520,300" fill={`url(#peakGrad-${preset})`} opacity="0.82" />

        {/* Mid-ground Mountain Ridges */}
        <path
          d="M0 290 Q 150 240 320 280 T 580 260 T 800 300 L 800 500 L 0 500 Z"
          fill={theme.ridges}
          opacity="0.92"
        />

        {/* Prayer Flag Cable line across ridge */}
        <path
          d="M 60 340 Q 200 380 420 350 T 740 370"
          stroke="#C4A36A"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.5"
        />

        {/* Foreground Alpine Pine Ridge */}
        <path
          d="M -20 370 Q 180 320 380 390 T 720 350 Q 770 370 820 400 L 820 500 L -20 500 Z"
          fill={`url(#ridgeGrad-${preset})`}
        />

        {/* Pine Silhouettes */}
        <g fill="#0A1814" opacity="0.85">
          <polygon points="120,360 128,390 112,390" />
          <polygon points="120,350 126,375 114,375" />
          <polygon points="135,370 142,395 128,395" />
          <polygon points="240,380 248,410 232,410" />
          <polygon points="255,375 262,402 248,402" />
          <polygon points="680,365 688,395 672,395" />
          <polygon points="695,355 703,390 687,390" />
        </g>
      </svg>
    </div>
  );
};
