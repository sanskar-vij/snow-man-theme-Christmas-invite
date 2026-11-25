interface SleighFlybyProps {
  className?: string;
}

/**
 * Animated silhouette of Santa's sleigh pulled by reindeer drifting across
 * the midnight sky of the closing village scene.
 */
export function SleighFlyby({ className = '' }: SleighFlybyProps) {
  return (
    <div aria-hidden="true" className={`sleigh-flyby pointer-events-none ${className}`}>
      <svg viewBox="0 0 140 46" className="h-full w-full" fill="currentColor">
        {/* Reindeer 1 */}
        <g transform="translate(6 14) scale(0.9)">
          <ellipse cx="8" cy="10" rx="7" ry="3.4" />
          <rect x="13" y="3" width="2.6" height="8" rx="1" transform="rotate(-18 14 7)" />
          <ellipse cx="16" cy="3" rx="3.2" ry="2" />
          <path d="M17 2 L20 -4 M18 1 L22 -2 M15 2 L15 -4" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M3 12 L1 20 M7 13 L6 21 M11 13 L12 21 M14 12 L17 19" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
        {/* Reindeer 2 */}
        <g transform="translate(34 11) scale(0.95)">
          <ellipse cx="8" cy="10" rx="7" ry="3.4" />
          <rect x="13" y="3" width="2.6" height="8" rx="1" transform="rotate(-18 14 7)" />
          <ellipse cx="16" cy="3" rx="3.2" ry="2" />
          <path d="M17 2 L20 -4 M18 1 L22 -2 M15 2 L15 -4" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M3 12 L1 20 M7 13 L6 21 M11 13 L12 21 M14 12 L17 19" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </g>
        {/* Reindeer 3 (Rudolph with a glowing nose) */}
        <g transform="translate(62 8)">
          <ellipse cx="8" cy="10" rx="7" ry="3.4" />
          <rect x="13" y="3" width="2.6" height="8" rx="1" transform="rotate(-18 14 7)" />
          <ellipse cx="16" cy="3" rx="3.2" ry="2" />
          <path d="M17 2 L20 -4 M18 1 L22 -2 M15 2 L15 -4" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M3 12 L1 20 M7 13 L6 21 M11 13 L12 21 M14 12 L17 19" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="19" cy="3.4" r="1.4" fill="#ff5252" className="rudolph-nose" />
        </g>
        {/* Harness lines */}
        <path d="M22 20 L34 17 M50 18 L62 14 M80 16 L100 18" stroke="currentColor" strokeWidth="0.9" fill="none" />
        {/* Sleigh */}
        <g transform="translate(100 8)">
          <path d="M0 10 Q-2 20 6 22 L26 22 Q32 22 32 14 L30 8 L26 8 L26 16 L4 16 Z" />
          <path d="M-4 24 Q2 28 12 27 L30 27 Q36 27 36 22" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          {/* Santa */}
          <circle cx="12" cy="4" r="3.4" />
          <path d="M9 1 Q12 -5 17 0 L14 1 Z" />
          <circle cx="17.6" cy="0.6" r="1.2" />
          <path d="M8 8 Q4 12 8 16 L18 16 L18 8 Z" />
        </g>
      </svg>
    </div>
  );
}
