import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { LAMP_LIGHT_CONFIGS, LAMP_LIGHT_MODES, LampLightMode } from '../utils/lampLight';
import { cn } from '../utils/cn';

interface InteractiveLampProps {
  initialMode?: LampLightMode;
  lampName?: string;
  onModeChange?: (mode: LampLightMode, message: string) => void;
  className?: string;
  label?: string;
  pulseAnimation?: boolean;
  showHint?: boolean;
}

export function InteractiveLamp({
  initialMode = 'warm',
  lampName = 'Lamp',
  onModeChange,
  className = '',
  label = 'Tap to change this lamp light',
  pulseAnimation = true,
  showHint = false,
}: InteractiveLampProps) {
  const [mode, setMode] = useState<LampLightMode>(initialMode);
  const [burstKey, setBurstKey] = useState(0);
  const config = LAMP_LIGHT_CONFIGS[mode];
  const isOff = mode === 'off';

  const handleClick = () => {
    const nextIndex = (LAMP_LIGHT_MODES.indexOf(mode) + 1) % LAMP_LIGHT_MODES.length;
    const nextMode = LAMP_LIGHT_MODES[nextIndex];
    const nextConfig = LAMP_LIGHT_CONFIGS[nextMode];
    setMode(nextMode);
    setBurstKey((k) => k + 1);
    onModeChange?.(nextMode, `${nextConfig.emoji} ${lampName}: ${nextConfig.name}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
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

      {/* Expanding light burst ripple on tap */}
      {burstKey > 0 && (
        <span
          key={burstKey}
          aria-hidden="true"
          className="pointer-events-none absolute inset-[12%] rounded-full border-2 animate-lamp-burst"
          style={{
            borderColor: config.accentColor,
            boxShadow: `0 0 18px 2px ${config.accentColor}`,
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Discoverability ping ring & tap cue before first interaction */}
      {showHint && (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-[14%] rounded-full border border-[#ffe49e]/70 animate-gentle-ping"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 whitespace-nowrap rounded-full border border-[#f5d27a]/65 bg-[#071226]/90 px-2.5 py-0.5 text-[9px] font-semibold tracking-wide text-[#fff1c7] shadow-lg backdrop-blur-md animate-bob"
          >
            <Sparkles className="h-2.5 w-2.5 text-[#f4cd6d]" />
            <span>Tap lamp</span>
          </span>
        </>
      )}

      {/* Subtle touch feedback ring on hover/active */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[16%] rounded-full border border-white/25 opacity-0 transition-all duration-200 group-hover:opacity-100 group-active:scale-90 group-active:opacity-100"
      />

      {/* Floating helpful micro-badge pill on hover */}
      {!showHint && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 whitespace-nowrap rounded-full border border-[#f5d27a]/60 bg-[#071226]/95 px-2.5 py-0.5 text-[9px] font-semibold tracking-wide text-[#fce8b5] opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1"
        >
          <Sparkles className="h-2.5 w-2.5 text-[#f4cd6d]" />
          <span>{config.emoji} {config.name} (Tap)</span>
        </span>
      )}
    </button>
  );
}
