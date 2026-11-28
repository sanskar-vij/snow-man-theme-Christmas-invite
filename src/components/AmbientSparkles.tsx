import { LAMP_LIGHT_CONFIGS, type LampLightMode } from '../utils/lampLight';

interface SparklePoint {
  top: string;
  left: string;
  size: number;
  delay: string;
  duration: string;
}

const DEFAULT_SPARKLES: readonly SparklePoint[] = [
  { top: '14%', left: '72%', size: 4, delay: '0s', duration: '3.8s' },
  { top: '26%', left: '86%', size: 3, delay: '0.9s', duration: '4.4s' },
  { top: '34%', left: '14%', size: 3.5, delay: '1.6s', duration: '4.1s' },
  { top: '64%', left: '8%', size: 3, delay: '0.5s', duration: '3.6s' },
  { top: '76%', left: '91%', size: 4, delay: '1.3s', duration: '4.5s' },
  { top: '88%', left: '22%', size: 3, delay: '2.1s', duration: '3.9s' },
];

interface AmbientSparklesProps {
  mode?: LampLightMode;
  points?: readonly SparklePoint[];
  className?: string;
}

/**
 * Delicate floating and twinkling holiday light motes that harmonize with the active lamp mode.
 */
export function AmbientSparkles({
  mode = 'warm',
  points = DEFAULT_SPARKLES,
  className = '',
}: AmbientSparklesProps) {
  if (mode === 'off') return null;

  const accent = LAMP_LIGHT_CONFIGS[mode].accentColor;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {points.map((pt, idx) => (
        <span
          key={idx}
          className="animate-sparkle-float absolute rounded-full transition-colors duration-500"
          style={{
            top: pt.top,
            left: pt.left,
            width: `${pt.size}px`,
            height: `${pt.size}px`,
            backgroundColor: '#fffdf2',
            boxShadow: `0 0 ${pt.size * 2.5}px ${pt.size * 0.7}px ${accent}`,
            animationDelay: pt.delay,
            animationDuration: pt.duration,
          }}
        />
      ))}
    </div>
  );
}
