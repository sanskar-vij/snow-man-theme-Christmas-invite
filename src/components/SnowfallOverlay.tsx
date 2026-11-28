import React, { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  rotation: number;
  rotationSpeed: number;
  isCrystal: boolean;
}

/**
 * Draws a crisp 6-pointed crystalline snowflake centered at (0, 0).
 */
function drawCrystalFlake(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  opacity: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.strokeStyle = `rgba(242, 249, 255, ${opacity})`;
  ctx.lineWidth = Math.max(0.9, size * 0.12);
  ctx.lineCap = 'round';
  ctx.shadowColor = `rgba(210, 235, 255, ${opacity * 0.7})`;
  ctx.shadowBlur = size * 0.7;

  const branchOffset = size * 0.56;
  const branchLen = size * 0.3;

  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -size);
    // Tiny V-branches near the tip of each arm
    ctx.moveTo(0, -branchOffset);
    ctx.lineTo(-branchLen * 0.7, -(branchOffset + branchLen * 0.7));
    ctx.moveTo(0, -branchOffset);
    ctx.lineTo(branchLen * 0.7, -(branchOffset + branchLen * 0.7));
    ctx.stroke();
    ctx.rotate(Math.PI / 3);
  }

  ctx.restore();
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

    const count = Math.max(55, Math.min(110, Math.round(width / 14)));
    const flakes: Snowflake[] = Array.from({ length: count }, (_, i) => {
      const isCrystal = i % 5 < 2; // 40% crystalline snowflakes, 60% soft snow dots
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: isCrystal ? Math.random() * 5.5 + 4.5 : Math.random() * 2.2 + 1.2,
        speedY: isCrystal ? Math.random() * 0.75 + 0.55 : Math.random() * 0.7 + 0.35,
        speedX: Math.random() * 0.35 + 0.12, // gentle flowing breeze across the screen
        opacity: isCrystal ? Math.random() * 0.4 + 0.48 : Math.random() * 0.45 + 0.35,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.008,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.018,
        isCrystal,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const flake of flakes) {
        flake.wobble += flake.wobbleSpeed;
        flake.rotation += flake.rotationSpeed;
        flake.y += flake.speedY;
        flake.x += flake.speedX + Math.sin(flake.wobble) * 0.45;

        if (flake.y > height + 14) {
          flake.y = -14;
          flake.x = Math.random() * width;
        }
        if (flake.x > width + 14) flake.x = -14;
        if (flake.x < -14) flake.x = width + 14;

        if (flake.isCrystal) {
          drawCrystalFlake(ctx, flake.x, flake.y, flake.size, flake.rotation, flake.opacity);
        } else {
          const gradient = ctx.createRadialGradient(
            flake.x,
            flake.y,
            0,
            flake.x,
            flake.y,
            flake.size * 2.1
          );
          gradient.addColorStop(0, `rgba(255, 252, 245, ${flake.opacity})`);
          gradient.addColorStop(0.5, `rgba(230, 244, 255, ${flake.opacity * 0.65})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

          ctx.beginPath();
          ctx.arc(flake.x, flake.y, flake.size * 2.1, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
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
