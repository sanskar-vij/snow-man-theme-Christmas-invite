import { ExternalLink, Sparkles } from 'lucide-react';
import { GoldCalligraphyFlourish, SnowflakeDivider } from '../OrnamentDividers';
import { InteractiveLamp } from '../InteractiveLamp';
import { FestiveTapZone } from '../FestiveTapZone';
import { useInView } from '../../hooks/useInView';
import type { LampLightMode } from '../../utils/lampLight';

interface ClosingVillageProps {
  lampLight: LampLightMode;
  onToggleLamp: () => void;
  onShowToast: (msg: string) => void;
}

/**
 * SCENE 4 — Closing Village: midnight snowy village with golden calligraphic cheer.
 */
export function ClosingVillage({
  lampLight,
  onToggleLamp,
  onShowToast,
}: ClosingVillageProps) {
  const { ref, isVisible } = useInView<HTMLElement>(0.15);

  return (
    <section
      ref={ref}
      id="cheer"
      className={`relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size] ${
        isVisible ? 'reveal-visible' : ''
      }`}
    >
      {/* Dynamic midnight village video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/images/closing-village.webp"
        className="h-full w-full object-cover select-none pointer-events-none"
      >
        <source src="/videos/closing-village.webm" type="video/webm" />
      </video>

      {/* Soft atmospheric top transition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[7%] bg-gradient-to-b from-[#060f20]/85 to-transparent"
      />

      {/* Interactive Snow Lantern on the lower-left */}
      <InteractiveLamp
        mode={lampLight}
        onToggle={onToggleLamp}
        className="left-[13.8%] top-[86%] w-[24%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap snow lantern to change lights"
      />

      {/* Interactive illuminated Christmas tree in the village */}
      <FestiveTapZone
        onTrigger={() => onShowToast('🎄 Wishing you warmth, joy, and holiday cheer!')}
        emojis={['🎄', '⭐', '✨']}
        ariaLabel="Tap the Christmas tree"
        className="left-[36%] top-[22%] h-[26%] w-[28%] z-20"
      />

      {/* Atmospheric backing vignette to guarantee crisp text contrast against the midnight village */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[49%] left-[5%] right-[5%] h-[38%] rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(4,10,24,0.82)_0%,_rgba(4,10,24,0.5)_58%,_transparent_82%)]"
      />

      {/* High-visibility golden festive closing typography with scroll reveal */}
      <div className="z-10 absolute top-[51%] left-[6%] right-[6%] flex h-[34%] flex-col items-center justify-center text-center">
        <p
          className="reveal-item font-garamond text-[5.4cqw] font-semibold tracking-[0.03em] text-[#faecc8] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
          style={{ transitionDelay: '100ms' }}
        >
          Let’s spread the
        </p>

        <p
          className="reveal-item font-script -mt-[0.6cqw] text-[13.8cqw] leading-[0.92] gold-text-midnight select-text"
          style={{ transitionDelay: '220ms' }}
        >
          Christmas cheer together!
        </p>

        <div className="reveal-item w-full" style={{ transitionDelay: '340ms' }}>
          <SnowflakeDivider color="#f6d684" className="my-[1.8cqw] w-[52%] mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]" />
        </div>

        <p
          className="reveal-item font-cinzel text-[7.4cqw] font-bold tracking-[0.09em] text-[#fff4d0] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] drop-shadow-[0_0_14px_rgba(246,206,109,0.4)]"
          style={{ transitionDelay: '460ms' }}
        >
          See you at the Party!
        </p>

        <div className="reveal-item w-full" style={{ transitionDelay: '580ms' }}>
          <GoldCalligraphyFlourish className="mt-[1.2cqw] w-[40%] text-[#f6d684] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]" />
        </div>
      </div>

      {/* Noticeable studio credit hyperlink */}
      <div
        className="reveal-item absolute inset-x-0 bottom-[2.4%] z-20 flex justify-center px-4"
        style={{ transitionDelay: '650ms' }}
      >
        <a
          href="https://patrikastudio.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="animate-gold-glow group inline-flex items-center gap-1.5 rounded-full border border-[#f5d27a]/70 bg-[#060f22]/90 px-4 py-1.5 font-lora text-xs tracking-[0.05em] text-[#fff6dc] shadow-[0_6px_22px_rgba(0,0,0,0.85)] backdrop-blur-md transition hover:scale-[1.03] hover:border-[#ffe28a] hover:bg-[#0b1a36] active:scale-95"
        >
          <Sparkles className="h-3 w-3 text-[#f9d97e]" />
          <span>Designed by</span>
          <span className="font-cinzel font-bold tracking-[0.06em] text-[#ffe082] underline decoration-[#ffe082]/75 underline-offset-2 group-hover:text-[#fff3be]">
            Patrika Studio
          </span>
          <ExternalLink className="h-3 w-3 text-[#f9d97e]/90 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
