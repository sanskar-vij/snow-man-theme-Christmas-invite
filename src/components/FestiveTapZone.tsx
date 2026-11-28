import { useState } from 'react';
import { cn } from '../utils/cn';

interface FestiveTapZoneProps {
  onTrigger?: () => void;
  emojis?: readonly string[];
  ariaLabel: string;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Accessible interactive hit-zone that spawns a cheerful floating emoji burst on tap.
 */
export function FestiveTapZone({
  onTrigger,
  emojis = ['❄️', '✨', '⛄'],
  ariaLabel,
  className = '',
  children,
}: FestiveTapZoneProps) {
  const [popId, setPopId] = useState(0);

  const handleTap = () => {
    setPopId((n) => n + 1);
    onTrigger?.();
  };

  const emoji = emojis[popId % emojis.length];

  return (
    <button
      type="button"
      onClick={handleTap}
      aria-label={ariaLabel}
      className={cn(
        'group pointer-events-auto absolute cursor-pointer select-none focus:outline-none active:scale-95 transition-transform',
        className
      )}
    >
      {children}
      {popId > 0 && (
        <span
          key={popId}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/4 z-40 text-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] animate-float-pop"
        >
          {emoji}
        </span>
      )}
    </button>
  );
}
