import { useId } from 'react';
import { LAMP_LIGHT_CONFIGS, LampLightMode } from '../utils/lampLight';

const DEFAULT_BULB_COLORS = ['#ffe9a6', '#ffd166', '#ff6b6b', '#8ce99a', '#74c0fc', '#ffe9a6'];

interface FairyLightsProps {
  count?: number;
  className?: string;
  mode?: LampLightMode;
}

/**
 * Festive strand of gently drooping warm fairy lights with twinkling bulbs.
 * Pure SVG + CSS animations — no extra dependencies.
 */
export function FairyLights({ count = 11, className = '', mode }: FairyLightsProps) {
  const gradientId = `fairy-wire-${useId().replace(/:/g, '')}`;
  const bulbColors = mode ? LAMP_LIGHT_CONFIGS[mode].fairyColors : DEFAULT_BULB_COLORS;
  const isOff = mode === 'off';

  const points = Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    return {
      x: t * 100,
      // gentle droop arc across the wire
      y: Math.sin(t * Math.PI) * 9 + 2.5,
      color: bulbColors[i % bulbColors.length],
      delay: `${(i * 0.33) % 2.1}s`,
      duration: `${2 + (i % 3) * 0.5}s`,
    };
  });

  const wirePath = points
    .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
    .join(' ');

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none transition-opacity duration-500 ${className} ${isOff ? 'opacity-25' : ''
        }`}
    >
      <svg viewBox="-2 -2 104 20" className="h-full w-full overflow-visible" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#5b3d1e" />
            <stop offset="50%" stopColor="#3a2a14" />
            <stop offset="100%" stopColor="#5b3d1e" />
          </linearGradient>
        </defs>

        {/* Wire */}
        <path d={wirePath} fill="none" stroke={`url(#${gradientId})`} strokeWidth="0.45" />

        {points.map((p, i) => (
          <g key={i} className={isOff ? '' : 'fairy-bulb'} style={{ animationDelay: p.delay, animationDuration: p.duration }}>
            {/* Bulb halo */}
            <circle cx={p.x} cy={p.y + 2.1} r="3.6" fill={p.color} opacity={isOff ? 0.05 : 0.32} className="fairy-halo" />
            {/* Bulb socket */}
            <rect x={p.x - 0.55} y={p.y} width="1.1" height="1.1" rx="0.3" fill="#2e1e0e" />
            {/* Glowing bulb */}
            <ellipse cx={p.x} cy={p.y + 2.1} rx="1.15" ry="1.6" fill={p.color} opacity={isOff ? 0.3 : 1} />
            <ellipse cx={p.x - 0.3} cy={p.y + 1.7} rx="0.35" ry="0.5" fill="#fffbe8" opacity={isOff ? 0.2 : 0.85} />
          </g>
        ))}
      </svg>
    </div>
  );
}
