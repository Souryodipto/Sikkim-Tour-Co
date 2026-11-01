import React, { useEffect, useRef } from 'react';

interface TrailSnowflake {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  color: string;
  type: 'snowflake6' | 'star4' | 'gold_spark';
}

export const CursorSnowTrail: React.FC = () => {
  // Mobile / touch devices do not have a cursor; disable completely to preserve 60fps touch scrolling
  const isTouchDevice = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
  if (isTouchDevice) {
    return null;
  }

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<TrailSnowflake[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isLoopRunningRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number; time: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Handle high DPI display scaling
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);

    // Draw an authentic 6-pointed Himalayan crystalline snowflake
    const drawSnowflake6 = (
      context: CanvasRenderingContext2D,
      r: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.strokeStyle = color;
      context.fillStyle = color;
      context.lineWidth = 1;
      context.globalAlpha = alpha;

      // 6 arms radiating from center
      for (let i = 0; i < 6; i++) {
        context.save();
        context.rotate((i * Math.PI) / 3);

        // Main spine
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(0, -r);
        context.stroke();

        // Little branch v-shapes along the arm
        if (r > 3) {
          const branchY = -r * 0.6;
          context.beginPath();
          context.moveTo(0, branchY);
          context.lineTo(-r * 0.35, branchY - r * 0.25);
          context.moveTo(0, branchY);
          context.lineTo(r * 0.35, branchY - r * 0.25);
          context.stroke();
        }

        context.restore();
      }

      // Center crystalline core dot
      context.beginPath();
      context.arc(0, 0, Math.max(0.7, r * 0.22), 0, Math.PI * 2);
      context.fill();

      context.restore();
    };

    // Draw a 4-pointed shimmering diamond star
    const drawStar4 = (
      context: CanvasRenderingContext2D,
      r: number,
      color: string,
      alpha: number
    ) => {
      context.save();
      context.fillStyle = color;
      context.globalAlpha = alpha;
      context.beginPath();
      context.moveTo(0, -r * 1.3);
      context.lineTo(r * 0.3, -r * 0.3);
      context.lineTo(r * 1.3, 0);
      context.lineTo(r * 0.3, r * 0.3);
      context.lineTo(0, r * 1.3);
      context.lineTo(-r * 0.3, r * 0.3);
      context.lineTo(-r * 1.3, 0);
      context.lineTo(-r * 0.3, -r * 0.3);
      context.closePath();
      context.fill();
      context.restore();
    };

    // Animation Loop
    const loop = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Physics: air drag + gentle downward drift + sway
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 + 0.04; // Gentle gravity
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0.01 || p.y > h + 20) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'snowflake6') {
          drawSnowflake6(ctx, p.radius, p.color, p.alpha);
        } else if (p.type === 'star4') {
          drawStar4(ctx, p.radius, p.color, p.alpha);
        } else {
          // Golden sparkle diamond
          ctx.save();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowColor = '#EBA94B';
          ctx.shadowBlur = 6;
          ctx.fillRect(-p.radius * 0.7, -p.radius * 0.7, p.radius * 1.4, p.radius * 1.4);
          ctx.restore();
        }

        ctx.restore();
      }

      // If particles remain, keep loop running; otherwise sleep to save CPU/GPU
      if (particles.length > 0) {
        animFrameRef.current = requestAnimationFrame(loop);
      } else {
        isLoopRunningRef.current = false;
      }
    };

    const startLoopIfNeeded = () => {
      if (!isLoopRunningRef.current) {
        isLoopRunningRef.current = true;
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    // Spawn snowflakes at cursor position
    const spawnSnowAt = (clientX: number, clientY: number, speedMultiplier: number = 1) => {
      const particles = particlesRef.current;
      // Cap max particles to keep performance ultra-high
      if (particles.length >= 75) {
        particles.splice(0, 3);
      }

      // Number of flakes spawned per movement tick (1 to 3 depending on velocity)
      const count = Math.min(3, Math.max(1, Math.floor(speedMultiplier * 1.2)));

      for (let k = 0; k < count; k++) {
        const typeRand = Math.random();
        let type: 'snowflake6' | 'star4' | 'gold_spark' = 'snowflake6';
        let color = '#FFFFFF';
        let radius = Math.random() * 3 + 2.5;

        if (typeRand < 0.55) {
          // 6-pointed crystalline snowflake (White with hint of sky blue)
          type = 'snowflake6';
          color = Math.random() < 0.4 ? '#F0F9FF' : '#FFFFFF';
          radius = Math.random() * 3.5 + 3.2;
        } else if (typeRand < 0.85) {
          // 4-pointed shimmering ice diamond
          type = 'star4';
          color = Math.random() < 0.5 ? '#BAE6FD' : '#FFFFFF';
          radius = Math.random() * 2.8 + 2;
        } else {
          // Golden Himalayan sunburst spark
          type = 'gold_spark';
          color = '#EBA94B';
          radius = Math.random() * 2.2 + 1.2;
        }

        // Random dispersion spray
        const spreadAngle = Math.random() * Math.PI * 2;
        const spreadSpeed = Math.random() * 1.8 + 0.4;

        particles.push({
          x: clientX + (Math.random() - 0.5) * 12,
          y: clientY + (Math.random() - 0.5) * 12,
          vx: Math.cos(spreadAngle) * spreadSpeed,
          vy: Math.sin(spreadAngle) * spreadSpeed + 0.3,
          radius,
          alpha: Math.random() * 0.25 + 0.75,
          decay: Math.random() * 0.018 + 0.014, // Lives for ~45 to 70 frames (~0.7s - 1.1s)
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.12,
          color,
          type,
        });
      }

      startLoopIfNeeded();
    };

    // Mouse Movement Listener
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const last = lastMousePosRef.current;

      let speedMultiplier = 1;
      if (last) {
        const dx = e.clientX - last.x;
        const dy = e.clientY - last.y;
        const dt = Math.max(1, now - last.time);
        const dist = Math.hypot(dx, dy);

        // Minimum movement threshold so stationary cursor doesn't flood particles
        if (dist < 3) return;

        const velocity = dist / dt; // pixels per ms
        speedMultiplier = Math.min(2.5, velocity * 2);
      }

      lastMousePosRef.current = { x: e.clientX, y: e.clientY, time: now };
      spawnSnowAt(e.clientX, e.clientY, speedMultiplier);
    };

    // Touch Movement Listener for Mobile / Tablets
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        lastMousePosRef.current = { x: touch.clientX, y: touch.clientY, time: performance.now() };
        spawnSnowAt(touch.clientX, touch.clientY, 1.2);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const now = performance.now();
        const last = lastMousePosRef.current;
        let speedMultiplier = 1;

        if (last) {
          const dx = touch.clientX - last.x;
          const dy = touch.clientY - last.y;
          const dt = Math.max(1, now - last.time);
          const dist = Math.hypot(dx, dy);

          if (dist < 3) return;
          const velocity = dist / dt;
          speedMultiplier = Math.min(2.5, velocity * 2);
        }

        lastMousePosRef.current = { x: touch.clientX, y: touch.clientY, time: now };
        spawnSnowAt(touch.clientX, touch.clientY, speedMultiplier);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('orientationchange', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[10000]"
      aria-hidden="true"
    />
  );
};
