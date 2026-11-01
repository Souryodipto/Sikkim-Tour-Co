import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  layer: number; // 0: far, 1: mid, 2: near
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
}

interface HimalayanSnowCanvasProps {
  className?: string;
  density?: number; // total snowflakes (default ~65)
  interactive?: boolean;
}

export const HimalayanSnowCanvas: React.FC<HimalayanSnowCanvasProps> = ({
  className = '',
  density = 65,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState<boolean>(true);
  const animationFrameRef = useRef<number | null>(null);
  const mousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isVisibleRef = useRef<boolean>(true);

  // Initialize snowflake population
  const createSnowflakes = useCallback(
    (width: number, height: number): Snowflake[] => {
      const flakes: Snowflake[] = [];
      for (let i = 0; i < density; i++) {
        // Distribute into 3 depth layers
        const layerRand = Math.random();
        const layer = layerRand < 0.5 ? 0 : layerRand < 0.85 ? 1 : 2;

        let radius = 1.2;
        let speedY = 0.5;
        let opacity = 0.4;

        if (layer === 0) {
          // Far / background snow dust
          radius = 0.8 + Math.random() * 0.8;
          speedY = 0.4 + Math.random() * 0.5;
          opacity = 0.3 + Math.random() * 0.3;
        } else if (layer === 1) {
          // Midground crisp flakes
          radius = 1.8 + Math.random() * 1.4;
          speedY = 0.9 + Math.random() * 0.8;
          opacity = 0.6 + Math.random() * 0.3;
        } else {
          // Foreground soft drifting flakes
          radius = 3.2 + Math.random() * 2.2;
          speedY = 1.4 + Math.random() * 1.0;
          opacity = 0.75 + Math.random() * 0.25;
        }

        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          layer,
          speedY,
          speedX: (Math.random() - 0.5) * 0.4,
          swaySpeed: 0.008 + Math.random() * 0.015,
          swayOffset: Math.random() * Math.PI * 2,
          opacity,
        });
      }
      return flakes;
    },
    [density]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    let snowflakes = createSnowflakes(width, height);
    let time = 0;

    // Handle window resize with DPR scaling
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = canvas.parentElement?.clientWidth || window.innerWidth;
      const displayHeight = canvas.parentElement?.clientHeight || window.innerHeight;

      width = displayWidth;
      height = displayHeight;
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      ctx.scale(dpr, dpr);

      snowflakes = createSnowflakes(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse movement interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      mousePosRef.current = {
        x: (e.clientX - width / 2) / (width / 2), // -1 to 1
        y: (e.clientY - height / 2) / (height / 2),
      };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Intersection observer to pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Render loop
    const render = () => {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      const windInfluence = mousePosRef.current.x * 0.6;

      for (let i = 0; i < snowflakes.length; i++) {
        const flake = snowflakes[i];

        // Horizontal sinusoidal sway + wind
        flake.swayOffset += flake.swaySpeed;
        const sway = Math.sin(flake.swayOffset) * (flake.layer === 2 ? 1.4 : 0.8);
        flake.x += flake.speedX + sway + windInfluence;
        flake.y += flake.speedY;

        // Wrap around edges
        if (flake.y > height + 10) {
          flake.y = -10;
          flake.x = Math.random() * width;
        }
        if (flake.x < -20) {
          flake.x = width + 10;
        } else if (flake.x > width + 20) {
          flake.x = -10;
        }

        // Draw snowflake with subtle gradient for depth
        ctx.beginPath();
        if (flake.layer === 2) {
          // Foreground soft glow flake
          const gradient = ctx.createRadialGradient(
            flake.x,
            flake.y,
            0,
            flake.x,
            flake.y,
            flake.radius * 1.5
          );
          gradient.addColorStop(0, `rgba(255, 255, 255, ${flake.opacity})`);
          gradient.addColorStop(0.6, `rgba(240, 248, 255, ${flake.opacity * 0.6})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(flake.x, flake.y, flake.radius * 1.5, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
          ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      observer.disconnect();
    };
  }, [isActive, density, interactive, createSnowflakes]);

  return (
    <div className={`absolute inset-0 pointer-events-none z-15 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ willChange: 'transform' }}
      />

      {/* Subtle, aesthetic Snowfall Toggle Button */}
      <button
        onClick={() => setIsActive((prev) => !prev)}
        className="pointer-events-auto absolute bottom-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-[10px] text-white/80 hover:text-white transition-all flex items-center gap-1.5 shadow-md group"
        title={isActive ? 'Pause Alpine Snowfall' : 'Enable Alpine Snowfall'}
        aria-label="Toggle Alpine Snowfall"
      >
        <span className={`text-xs transition-transform duration-300 ${isActive ? 'rotate-12 scale-110' : 'opacity-50'}`}>
          ❄️
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider">
          Snow: {isActive ? 'On' : 'Off'}
        </span>
      </button>
    </div>
  );
};
