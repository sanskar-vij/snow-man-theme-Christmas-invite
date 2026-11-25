import { GoldCalligraphyFlourish, SnowflakeDivider } from '../OrnamentDividers';
import { InteractiveLamp } from '../InteractiveLamp';
import type { LampLightMode } from '../../utils/lampLight';

interface ClosingVillageProps {
  lampLight: LampLightMode;
  onToggleLamp: () => void;
}

/**
 * SCENE 4 — Closing Village: midnight snowy village with golden calligraphic cheer.
 */
export function ClosingVillage({
  lampLight,
  onToggleLamp,
}: ClosingVillageProps) {
  return (
    <section
      id="cheer"
      className="relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size]"
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

      {/* Atmospheric backing vignette to guarantee crisp text contrast against the midnight village */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[49%] left-[5%] right-[5%] h-[38%] rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(4,10,24,0.82)_0%,_rgba(4,10,24,0.5)_58%,_transparent_82%)]"
      />

      {/* High-visibility golden festive closing typography */}
      <div className="z-10 absolute top-[51%] left-[6%] right-[6%] flex h-[34%] flex-col items-center justify-center text-center">
        <p className="font-garamond text-[5.4cqw] font-semibold tracking-[0.03em] text-[#faecc8] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
          Let’s spread the
        </p>

        <p className="font-script -mt-[0.6cqw] text-[13.8cqw] leading-[0.92] gold-text-midnight select-text">
          Christmas cheer together!
        </p>

        <SnowflakeDivider color="#f6d684" className="my-[1.8cqw] w-[52%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]" />

        <p className="font-cinzel text-[7.4cqw] font-bold tracking-[0.09em] text-[#fff4d0] drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] drop-shadow-[0_0_14px_rgba(246,206,109,0.4)]">
          See you at the Party!
        </p>

        <GoldCalligraphyFlourish className="mt-[1.2cqw] w-[40%] text-[#f6d684] drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]" />
      </div>
    </section>
  );
}
