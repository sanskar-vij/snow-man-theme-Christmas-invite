import { ChevronDown } from 'lucide-react';
import { FairyLights } from '../FairyLights';
import { InteractiveLamp } from '../InteractiveLamp';
import type { LampLightMode } from '../../utils/lampLight';

interface HeroCoverProps {
  onScrollToDetails: () => void;
  lampLight: LampLightMode;
  onToggleLamp: () => void;
}

/**
 * SCENE 1 — Hero Cover: snowman leaning over the carved wooden "Christmas PARTY" sign.
 */
export function HeroCover({
  onScrollToDetails,
  lampLight,
  onToggleLamp,
}: HeroCoverProps) {
  return (
    <section
      id="cover"
      className="relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size]"
    >
      <img
        src="/images/hero-snowman.jpg"
        alt="Cheerful snowman leaning over a festive wooden Christmas Party sign in a snowy winter village"
        className="h-full w-full object-cover select-none"
      />

      {/* Interactive Hanging Brass Street Lamp (top-left) */}
      <InteractiveLamp
        mode={lampLight}
        onToggle={onToggleLamp}
        className="left-[22.8%] top-[19.8%] w-[24%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap hanging street lamp to change lights"
      />

      {/* Interactive Standing Brass Lantern (bottom-right) */}
      <InteractiveLamp
        mode={lampLight}
        onToggle={onToggleLamp}
        className="left-[78.2%] top-[89.2%] w-[21%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap snow lantern to change lights"
      />

      {/* Twinkling fairy light strand across the snowy night sky */}
      <FairyLights
        count={13}
        mode={lampLight}
        className="absolute top-[2.5%] left-[6%] right-[6%] h-[4.5%] opacity-90"
      />

      {/* Carved Wooden Board Typography Overlay */}
      <div className="absolute top-[47%] left-[10%] right-[10%] flex h-[24.5%] flex-col items-center justify-center px-[2cqw] text-center">
        <p className="font-garamond text-[4.6cqw] font-semibold tracking-[0.03em] wood-cream-text">
          You’re Invited to our
        </p>
        <h1 className="font-script -mt-[0.5cqw] text-[17.5cqw] leading-[0.86] gold-text-carved select-text">
          Christmas
        </h1>
        <p className="font-cinzel mt-[0.8cqw] text-[8.3cqw] font-extrabold tracking-[0.15em] leading-none gold-text-carved">
          PARTY
        </p>
      </div>

      {/* Bottom gradient blend into Scene 2 + Scroll Cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-[#060f1f] via-[#060f1f]/40 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-[2.2%] flex justify-center">
        <button
          type="button"
          onClick={onScrollToDetails}
          className="flex items-center gap-1.5 rounded-full border border-[#f5d27a]/45 bg-[#0a162c]/75 px-4 py-1.5 text-[11px] font-medium tracking-[0.1em] text-[#fce7b2] uppercase backdrop-blur-md shadow-lg transition hover:bg-[#132647]/90 active:scale-95"
        >
          <span>Event Details</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bob text-[#f6d070]" />
        </button>
      </div>
    </section>
  );
}
