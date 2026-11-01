import React, { useEffect, useRef, useCallback } from 'react';

export interface MountainSnowBurstCanvasProps {
  className?: string;
  /** Trigger state to fire the climactic snow burst */
  triggerBurst?: boolean;
  /** Normalized progress from 0 to 100 of the 4-second sequence */
  progress?: number;
  /** Callback when the snow burst explosion completes */
  onBurstComplete?: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  decay: number;
  drag: number;
  gravity: number;
  rotation: number;
  vRot: number;
  type: 'powder' | 'crystal' | 'gold_spark' | 'puff';
}

interface AmbientFlake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  swaySpeed: number;
  swayOffset: number;
  opacity: number;
  color: string;
}

export const MountainSnowBurstCanvas: React.FC<MountainSnowBurstCanvasProps> = ({
  className = '',
  triggerBurst = false,
  progress = 0,
  onBurstComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Particle systems
  const ambientFlakesRef = useRef<AmbientFlake[]>([]);
  const burstParticlesRef = useRef<Particle[]>([]);
  const shockwaveRef = useRef<{
    active: boolean;
    x: number;
    y: number;
    radius: number;
    maxRadius: number;
    alpha: number;
  }>({
    active: false,
    x: 0,
    y: 0,
    radius: 0,
    maxRadius: 800,
    alpha: 0,
  });

  const burstHasFiredRef = useRef<boolean>(false);

  // Initialize ambient drifting snow
  const initAmbientFlakes = useCallback((width: number, height: number) => {
    const flakes: AmbientFlake[] = [];
    const count = 90;
    for (let i = 0; i < count; i++) {
      const isGold = Math.random() < 0.25;
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.8,
        speedY: Math.random() * 0.9 + 0.4,
        speedX: (Math.random() - 0.5) * 0.6,
        swaySpeed: Math.random() * 0.015 + 0.008,
        swayOffset: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.6 + 0.2,
        color: isGold ? '#EBA94B' : '#FFFFFF',
      });
    }
    ambientFlakesRef.current = flakes;
  }, []);

  // Fire the grand snow burst explosion!
  const fireSnowBurst = useCallback((originX: number, originY: number) => {
    const particles: Particle[] = [];
    const count = 320; // Massive powder and crystal burst

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      // High velocity blast spreading radially outward
      const speed = Math.pow(Math.random(), 0.5) * 18 + 3;
      const typeRand = Math.random();

      let type: 'powder' | 'crystal' | 'gold_spark' | 'puff' = 'powder';
      let color = '#FFFFFF';
      let radius = Math.random() * 4 + 2;

      if (typeRand < 0.45) {
        // Soft fluffy white powder chunks
        type = 'powder';
        color = '#FFFFFF';
        radius = Math.random() * 5.5 + 2.5;
      } else if (typeRand < 0.75) {
        // Shimmering ice crystal diamonds
        type = 'crystal';
        color = Math.random() < 0.5 ? '#E0F2FE' : '#BAE6FD';
        radius = Math.random() * 4 + 2;
      } else if (typeRand < 0.92) {
        // Golden Himalayan sunburst sparks
        type = 'gold_spark';
        color = Math.random() < 0.6 ? '#EBA94B' : '#FDE047';
        radius = Math.random() * 3 + 1.5;
      } else {
        // Expanding cloud puffs
        type = 'puff';
        color = 'rgba(255, 255, 255, 0.4)';
        radius = Math.random() * 14 + 8;
      }

      particles.push({
        x: originX + (Math.random() - 0.5) * 20,
        y: originY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 2,
        vy: Math.sin(angle) * speed - Math.random() * 4, // Upward initial bias
        radius,
        color,
        alpha: Math.random() * 0.3 + 0.7,
        decay: Math.random() * 0.015 + 0.008,
        drag: Math.random() * 0.03 + 0.94, // Air resistance creates realistic powder plume
        gravity: Math.random() * 0.12 + 0.05,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.2,
        type,
      });
    }

    burstParticlesRef.current.push(...particles);

    // Trigger Expanding Shockwave Ring
    shockwaveRef.current = {
      active: true,
      x: originX,
      y: originY,
      radius: 10,
      maxRadius: Math.max(window.innerWidth, window.innerHeight) * 1.2,
      alpha: 0.9,
    };
  }, []);

  // Watch for external trigger
  useEffect(() => {
    if (triggerBurst && !burstHasFiredRef.current) {
      burstHasFiredRef.current = true;
      const canvas = canvasRef.current;
      if (canvas) {
        // Burst originates behind the central logo / mountain peak
        const centerX = canvas.width / 2;
        const centerY = canvas.height * 0.42;
        fireSnowBurst(centerX, centerY);

        if (onBurstComplete) {
          setTimeout(onBurstComplete, 1200);
        }
      }
    }
  }, [triggerBurst, fireSnowBurst, onBurstComplete]);

  // Main Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.scale(dpr, dpr);

      if (ambientFlakesRef.current.length === 0) {
        initAmbientFlakes(w, h);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    let time = 0;

    const render = () => {
      time += 0.016;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      // =====================================================================
      // 1. PROCEDURAL 3D HIMALAYAN ALPINE MOUNTAIN SILHOUETTES
      // =====================================================================
      const horizonY = h * 0.68;

      // SUNRISE AURA BEHIND THE PEAKS
      const sunX = w * 0.5;
      const sunY = h * 0.38;
      const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, w * 0.45);
      sunGlow.addColorStop(0, 'rgba(235, 169, 75, 0.45)');
      sunGlow.addColorStop(0.35, 'rgba(235, 169, 75, 0.15)');
      sunGlow.addColorStop(1, 'rgba(10, 38, 33, 0)');
      ctx.fillStyle = sunGlow;
      ctx.fillRect(0, 0, w, h);

      // LAYER 1: Distant Majestic Kanchenjunga Massif (Snow & Ice Peak)
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, horizonY + 60);

      // Far peaks geometry
      const farPeaks = [
        { x: 0, y: horizonY - 40 },
        { x: w * 0.15, y: horizonY - 90 },
        { x: w * 0.28, y: horizonY - 60 },
        { x: w * 0.42, y: horizonY - 140 }, // North ridge
        { x: w * 0.50, y: horizonY - 190 }, // MOUNT KANCHENJUNGA MAIN SUMMIT
        { x: w * 0.58, y: horizonY - 130 },
        { x: w * 0.72, y: horizonY - 170 }, // Siniolchu Needle
        { x: w * 0.86, y: horizonY - 80 },
        { x: w, y: horizonY - 50 },
      ];

      for (let i = 0; i < farPeaks.length; i++) {
        if (i === 0) ctx.lineTo(farPeaks[i].x, farPeaks[i].y);
        else ctx.lineTo(farPeaks[i].x, farPeaks[i].y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();

      const peakGrad = ctx.createLinearGradient(0, horizonY - 190, 0, h);
      peakGrad.addColorStop(0, '#0F3830');
      peakGrad.addColorStop(0.5, '#0A2621');
      peakGrad.addColorStop(1, '#061814');
      ctx.fillStyle = peakGrad;
      ctx.fill();

      // Gleaming Snowcap Crests on Main Summit
      ctx.beginPath();
      ctx.moveTo(w * 0.46, horizonY - 120);
      ctx.lineTo(w * 0.50, horizonY - 190); // Summit
      ctx.lineTo(w * 0.54, horizonY - 120);
      ctx.lineTo(w * 0.50, horizonY - 140);
      ctx.closePath();
      const snowGrad = ctx.createLinearGradient(0, horizonY - 190, 0, horizonY - 120);
      snowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      snowGrad.addColorStop(1, 'rgba(235, 169, 75, 0.2)');
      ctx.fillStyle = snowGrad;
      ctx.fill();
      ctx.restore();

      // LAYER 2: Midground Alpine Ridge & Pine Slopes
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, horizonY);
      const midPeaks = [
        { x: 0, y: horizonY + 20 },
        { x: w * 0.22, y: horizonY - 40 },
        { x: w * 0.38, y: horizonY + 10 },
        { x: w * 0.62, y: horizonY - 30 },
        { x: w * 0.82, y: horizonY + 25 },
        { x: w, y: horizonY },
      ];
      for (const pt of midPeaks) ctx.lineTo(pt.x, pt.y);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();

      const midGrad = ctx.createLinearGradient(0, horizonY - 40, 0, h);
      midGrad.addColorStop(0, '#0C2B24');
      midGrad.addColorStop(1, '#051411');
      ctx.fillStyle = midGrad;
      ctx.fill();
      ctx.restore();

      // LAYER 3: Drifting Glacial Ridge Mist
      const mistGrad = ctx.createLinearGradient(0, horizonY - 50, 0, horizonY + 70);
      mistGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      mistGrad.addColorStop(0.5, 'rgba(224, 242, 254, 0.08)');
      mistGrad.addColorStop(1, 'rgba(10, 38, 33, 0.4)');
      ctx.fillStyle = mistGrad;
      ctx.fillRect(0, horizonY - 50, w, 120);

      // =====================================================================
      // 2. AMBIENT DRIFTING SNOW & GOLD DUST
      // =====================================================================
      for (const flake of ambientFlakesRef.current) {
        flake.y += flake.speedY;
        flake.x += Math.sin(time * flake.swaySpeed + flake.swayOffset) * 0.5 + flake.speedX;

        if (flake.y > h) {
          flake.y = -5;
          flake.x = Math.random() * w;
        }
        if (flake.x < -10) flake.x = w + 10;
        if (flake.x > w + 10) flake.x = -10;

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = flake.color;
        ctx.globalAlpha = flake.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // =====================================================================
      // 3. SHOCKWAVE EXPANDING RING (FROM EXPLOSION)
      // =====================================================================
      const sw = shockwaveRef.current;
      if (sw.active && sw.alpha > 0.01) {
        sw.radius += 18;
        sw.alpha *= 0.94;

        ctx.save();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        const waveGrad = ctx.createRadialGradient(
          sw.x,
          sw.y,
          Math.max(0, sw.radius - 30),
          sw.x,
          sw.y,
          sw.radius + 15
        );
        waveGrad.addColorStop(0, `rgba(235, 169, 75, 0)`);
        waveGrad.addColorStop(0.7, `rgba(255, 255, 255, ${sw.alpha * 0.8})`);
        waveGrad.addColorStop(1, `rgba(235, 169, 75, ${sw.alpha * 0.4})`);
        ctx.strokeStyle = waveGrad;
        ctx.lineWidth = Math.max(2, 8 * (sw.alpha));
        ctx.stroke();

        // Ambient flash around origin
        if (sw.radius < 300) {
          const flash = ctx.createRadialGradient(sw.x, sw.y, 0, sw.x, sw.y, 250);
          flash.addColorStop(0, `rgba(255, 255, 255, ${sw.alpha * 0.5})`);
          flash.addColorStop(0.6, `rgba(235, 169, 75, ${sw.alpha * 0.25})`);
          flash.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = flash;
          ctx.fillRect(0, 0, w, h);
        }
        ctx.restore();
      }

      // =====================================================================
      // 4. CLIMACTIC SNOW BURST PARTICLES SIMULATION & RENDER
      // =====================================================================
      const particles = burstParticlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics integration
        p.vx *= p.drag;
        p.vy = p.vy * p.drag + p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0 || p.y > h + 50) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'crystal') {
          // 4-Pointed / 6-Pointed Shimmering Ice Crystal
          ctx.fillStyle = p.color;
          const r = p.radius;
          ctx.beginPath();
          ctx.moveTo(0, -r * 1.5);
          ctx.lineTo(r * 0.4, -r * 0.4);
          ctx.lineTo(r * 1.5, 0);
          ctx.lineTo(r * 0.4, r * 0.4);
          ctx.lineTo(0, r * 1.5);
          ctx.lineTo(-r * 0.4, r * 0.4);
          ctx.lineTo(-r * 1.5, 0);
          ctx.lineTo(-r * 0.4, -r * 0.4);
          ctx.closePath();
          ctx.fill();

          // Ice Crystal Core Sparkle
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(-0.5, -0.5, 1, 1);
        } else if (p.type === 'puff') {
          // Soft radial powder plume cloud
          const puffGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, p.radius);
          puffGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
          puffGrad.addColorStop(0.5, 'rgba(224, 242, 254, 0.25)');
          puffGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = puffGrad;
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'gold_spark') {
          // Golden Himalayan sunburst diamond
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#EBA94B';
          ctx.shadowBlur = 8;
          ctx.fillRect(-p.radius, -p.radius, p.radius * 2, p.radius * 2);
        } else {
          // Fluffy white snow powder sphere with soft edge
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Interactive Click: Click anywhere to blast snow at cursor!
    const handleClick = (e: MouseEvent) => {
      fireSnowBurst(e.clientX, e.clientY);
    };
    canvas.addEventListener('click', handleClick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('click', handleClick);
    };
  }, [initAmbientFlakes, fireSnowBurst]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-auto cursor-crosshair z-0 ${className}`}
      title="Click anywhere for an interactive Himalayan Snow Burst!"
    />
  );
};
