import React, { useEffect, useRef } from 'react';

interface SnowfallOverlayProps {
  enableCursorTrail?: boolean;
}

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
}

interface CursorSnowflake {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  maxLife: number;
}

/**
 * Pre-renders a crisp 6-pointed crystalline snowflake sprite once offscreen
 * so each animation frame only needs a fast drawImage() call with zero lag.
 */
function createSnowflakeSprite(dpr: number): HTMLCanvasElement {
  const logicalSize = 36;
  const sprite = document.createElement('canvas');
  sprite.width = logicalSize * dpr;
  sprite.height = logicalSize * dpr;
  const sctx = sprite.getContext('2d');
  if (!sctx) return sprite;

  sctx.scale(dpr, dpr);
  sctx.translate(logicalSize / 2, logicalSize / 2);
  sctx.lineCap = 'round';

  const r = 13;
  const branchOffset = r * 0.56;
  const branchLen = r * 0.34;

  const strokeCrystal = (color: string, lineWidth: number) => {
    sctx.strokeStyle = color;
    sctx.lineWidth = lineWidth;
    for (let i = 0; i < 6; i++) {
      sctx.beginPath();
      sctx.moveTo(0, 0);
      sctx.lineTo(0, -r);
      sctx.moveTo(0, -branchOffset);
      sctx.lineTo(-branchLen * 0.72, -(branchOffset + branchLen * 0.72));
      sctx.moveTo(0, -branchOffset);
      sctx.lineTo(branchLen * 0.72, -(branchOffset + branchLen * 0.72));
      sctx.stroke();
      sctx.rotate(Math.PI / 3);
    }
  };

  // Soft icy halo baked into the sprite + sharp crystal foreground
  strokeCrystal('rgba(190, 228, 255, 0.36)', 3.2);
  strokeCrystal('rgba(246, 251, 255, 0.96)', 1.45);

  sctx.beginPath();
  sctx.arc(0, 0, 1.5, 0, Math.PI * 2);
  sctx.fillStyle = '#ffffff';
  sctx.fill();

  return sprite;
}

export const SnowfallOverlay: React.FC<SnowfallOverlayProps> = ({
  enableCursorTrail = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const trailEnabledRef = useRef(enableCursorTrail);

  useEffect(() => {
    trailEnabledRef.current = enableCursorTrail;
  }, [enableCursorTrail]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let lastMoveTime = 0;
    let lastX = -999;
    let lastY = -999;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const flakeSprite = createSnowflakeSprite(dpr);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Calm, light snowflake-only density (no dense snow dots / heavy blizzard)
    const count = Math.max(22, Math.min(36, Math.round(width / 32)));
    const flakes: Snowflake[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 10 + 11, // crisp 11–21px crystalline snowflakes
      speedY: Math.random() * 0.55 + 0.45,
      speedX: Math.random() * 0.25 + 0.08,
      opacity: Math.random() * 0.35 + 0.45,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.016 + 0.008,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.015,
    }));

    const trailFlakes: CursorSnowflake[] = [];

    const spawnTrailFlake = (x: number, y: number, spread: number, amount: number) => {
      for (let i = 0; i < amount; i++) {
        if (trailFlakes.length >= 16) {
          trailFlakes.shift();
        }
        trailFlakes.push({
          x: x + (Math.random() - 0.5) * spread,
          y: y + (Math.random() - 0.5) * spread * 0.5,
          size: Math.random() * 7 + 11,
          vx: (Math.random() - 0.5) * 0.55,
          vy: Math.random() * 0.9 + 0.75,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.04,
          life: 0,
          maxLife: 56,
        });
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!trailEnabledRef.current) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      if (now - lastMoveTime < 110 || dx * dx + dy * dy < 324) return;
      lastMoveTime = now;
      lastX = e.clientX;
      lastY = e.clientY;
      spawnTrailFlake(e.clientX, e.clientY, 8, 1);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (!trailEnabledRef.current) return;
      spawnTrailFlake(e.clientX, e.clientY, 20, 3);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });

    const drawSprite = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.drawImage(flakeSprite, -size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const draw = () => {
      if (!document.hidden) {
        ctx.clearRect(0, 0, width, height);

        for (const flake of flakes) {
          flake.wobble += flake.wobbleSpeed;
          flake.rotation += flake.rotationSpeed;
          flake.y += flake.speedY;
          flake.x += flake.speedX + Math.sin(flake.wobble) * 0.35;

          if (flake.y > height + 18) {
            flake.y = -18;
            flake.x = Math.random() * width;
          }
          if (flake.x > width + 18) flake.x = -18;
          if (flake.x < -18) flake.x = width + 18;

          drawSprite(flake.x, flake.y, flake.size, flake.rotation, flake.opacity);
        }

        for (let i = trailFlakes.length - 1; i >= 0; i--) {
          const tf = trailFlakes[i];
          tf.life += 1;
          if (tf.life >= tf.maxLife) {
            trailFlakes.splice(i, 1);
            continue;
          }
          tf.rotation += tf.rotationSpeed;
          tf.x += tf.vx;
          tf.y += tf.vy;

          const progress = tf.life / tf.maxLife;
          const alpha = (1 - progress) * 0.85;
          drawSprite(tf.x, tf.y, tf.size * (1 - progress * 0.25), tf.rotation, alpha);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
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
