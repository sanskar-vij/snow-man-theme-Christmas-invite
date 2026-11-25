import { Sparkles } from 'lucide-react';
import { LAMP_LIGHT_CONFIGS, LampLightMode } from '../utils/lampLight';
import { cn } from '../utils/cn';

interface InteractiveLampProps {
  mode: LampLightMode;
  onToggle: () => void;
  className?: string;
  label?: string;
  pulseAnimation?: boolean;
}

export function InteractiveLamp({
  mode,
  onToggle,
  className = '',
  label = 'Tap to change light on all lamps',
  pulseAnimation = true,
}: InteractiveLampProps) {
  const config = LAMP_LIGHT_CONFIGS[mode];
  const isOff = mode === 'off';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${label} (Currently ${config.name})`}
      title={`${label} — Currently ${config.name}`}
      className={cn(
        'group pointer-events-auto absolute cursor-pointer select-none rounded-full focus:outline-none z-30',
        className
      )}
    >
      {/* Outer luminous breathing lamp glow (additive screen blend when lit, soft dim when off) */}
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-full transition-all duration-500 ease-out',
          !isOff && pulseAnimation && 'animate-lantern'
        )}
        style={{
          background: config.radialGlow,
          mixBlendMode: isOff ? 'multiply' : 'screen',
        }}
      />

      {/* Soft inner flame shimmer */}
      {!isOff && pulseAnimation && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[26%] rounded-full transition-all duration-500 animate-lantern"
          style={{
            background: config.coreGlow,
            mixBlendMode: 'screen',
            animationDelay: '-1.4s',
          }}
        />
      )}

      {/* Subtle touch feedback ring on hover/active */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[16%] rounded-full border border-white/25 opacity-0 transition-all duration-200 group-hover:opacity-100 group-active:scale-90 group-active:opacity-100"
      />

      {/* Floating helpful micro-badge pill on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 whitespace-nowrap rounded-full border border-[#f5d27a]/60 bg-[#071226]/95 px-2.5 py-0.5 text-[9px] font-semibold tracking-wide text-[#fce8b5] opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1"
      >
        <Sparkles className="h-2.5 w-2.5 text-[#f4cd6d]" />
        <span>{config.emoji} {config.name} (Tap)</span>
      </span>
    </button>
  );
}
