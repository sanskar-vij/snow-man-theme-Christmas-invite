import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FairyLights } from '../FairyLights';
import { InteractiveLamp } from '../InteractiveLamp';
import { AmbientSparkles } from '../AmbientSparkles';
import { FestiveTapZone } from '../FestiveTapZone';
import { useInView } from '../../hooks/useInView';
import type { LampLightMode } from '../../utils/lampLight';

interface HeroCoverProps {
  onScrollToDetails: () => void;
  lampLight: LampLightMode;
  onToggleLamp: () => void;
  showLampHint?: boolean;
  onShowToast: (msg: string) => void;
}

const SNOWMAN_WISHES = [
  '⛄ Ho ho ho! Glad you are invited!',
  '❄️ Tap any lamp to change the festive glow!',
  '🎄 See you at The Grand Hall!',
];

/**
 * SCENE 1 — Hero Cover: snowman leaning over the carved wooden "Christmas PARTY" sign.
 */
export function HeroCover({
  onScrollToDetails,
  lampLight,
  onToggleLamp,
  showLampHint = false,
  onShowToast,
}: HeroCoverProps) {
  const { ref, isVisible } = useInView<HTMLElement>(0.15);
  const [wishIndex, setWishIndex] = useState(0);

  const handleSnowmanTap = () => {
    onShowToast(SNOWMAN_WISHES[wishIndex % SNOWMAN_WISHES.length]);
    setWishIndex((i) => i + 1);
  };

  return (
    <section
      ref={ref}
      id="cover"
      className={`relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size] ${
        isVisible ? 'reveal-visible' : ''
      }`}
    >
      <img
        src="/images/hero-snowman.webp"
        alt="Cheerful snowman leaning over a festive wooden Christmas Party sign in a snowy winter village"
        className="h-full w-full object-cover select-none"
      />

      {/* Warm cozy window glow on the background snowy cottage */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[80%] top-[40.5%] w-[22%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full animate-cottage-glow"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 200, 100, 0.52) 0%, rgba(255, 140, 40, 0.18) 45%, transparent 72%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Ambient twinkling holiday sparkles */}
      <AmbientSparkles mode={lampLight} />

      {/* Interactive Snowman tap zone */}
      <FestiveTapZone
        onTrigger={handleSnowmanTap}
        emojis={['⛄', '❄️', '🎄', '✨']}
        ariaLabel="Tap snowman for a holiday greeting"
        className="left-[28%] top-[19%] h-[26%] w-[44%] z-20"
      />

      {/* Interactive Hanging Brass Street Lamp (top-left) */}
      <InteractiveLamp
        mode={lampLight}
        onToggle={onToggleLamp}
        showHint={showLampHint}
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
        <p
          className="reveal-item font-garamond text-[4.6cqw] font-semibold tracking-[0.03em] wood-cream-text"
          style={{ transitionDelay: '80ms' }}
        >
          You’re Invited to our
        </p>
        <h1
          className="reveal-item animate-gold-shimmer font-script -mt-[0.5cqw] text-[17.5cqw] leading-[0.86] gold-text-carved select-text"
          style={{ transitionDelay: '200ms' }}
        >
          Christmas
        </h1>
        <p
          className="reveal-item animate-gold-shimmer font-cinzel mt-[0.8cqw] text-[8.3cqw] font-extrabold tracking-[0.15em] leading-none gold-text-carved"
          style={{ transitionDelay: '320ms' }}
        >
          PARTY
        </p>
      </div>

      {/* Bottom gradient blend into Scene 2 + Scroll Cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-[#060f1f] via-[#060f1f]/40 to-transparent"
      />
      <div
        className="reveal-item absolute inset-x-0 bottom-[2.2%] flex justify-center"
        style={{ transitionDelay: '440ms' }}
      >
        <button
          type="button"
          onClick={onScrollToDetails}
          className="animate-gold-glow flex items-center gap-1.5 rounded-full border border-[#f5d27a]/45 bg-[#0a162c]/75 px-4 py-1.5 text-[11px] font-medium tracking-[0.1em] text-[#fce7b2] uppercase backdrop-blur-md shadow-lg transition hover:bg-[#132647]/90 active:scale-95"
        >
          <span>Event Details</span>
          <ChevronDown className="h-3.5 w-3.5 animate-bob text-[#f6d070]" />
        </button>
      </div>
    </section>
  );
}
