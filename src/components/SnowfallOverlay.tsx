import React, { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

export const SnowfallOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const count = 55;
    const flakes: Snowflake[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.1 + 0.8,
      speedY: Math.random() * 0.65 + 0.3,
      speedX: (Math.random() - 0.5) * 0.25,
      opacity: Math.random() * 0.55 + 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.015 + 0.006,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        flake.wobble += flake.wobbleSpeed;
        flake.y += flake.speedY;
        flake.x += flake.speedX + Math.sin(flake.wobble) * 0.28;

        if (flake.y > height + 8) {
          flake.y = -8;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 8) flake.x = -8;
        if (flake.x < -8) flake.x = width + 8;

        const gradient = ctx.createRadialGradient(
          flake.x,
          flake.y,
          0,
          flake.x,
          flake.y,
          flake.radius * 2.2
        );
        gradient.addColorStop(0, `rgba(255, 250, 240, ${flake.opacity})`);
        gradient.addColorStop(0.5, `rgba(235, 245, 255, ${flake.opacity * 0.65})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] h-full w-full"
    />
  );
};
