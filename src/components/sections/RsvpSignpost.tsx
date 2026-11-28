import { useState } from 'react';
import { Check, Mail, Phone, Sparkles } from 'lucide-react';
import { SnowflakeDivider } from '../OrnamentDividers';
import { InteractiveLamp } from '../InteractiveLamp';
import { AmbientSparkles } from '../AmbientSparkles';
import { FestiveTapZone } from '../FestiveTapZone';
import { useInView } from '../../hooks/useInView';
import type { RsvpSubmission } from '../RsvpModal';

interface RsvpSignpostProps {
  savedRsvp: RsvpSubmission | null;
  onOpenRsvp: () => void;
  onLampChange: (message: string) => void;
  onShowToast: (msg: string) => void;
}

const RSVP_SPARKLES = [
  { top: '10%', left: '84%', size: 3.5, delay: '0.4s', duration: '4.2s' },
  { top: '28%', left: '88%', size: 3, delay: '1.2s', duration: '3.6s' },
  { top: '64%', left: '12%', size: 3.5, delay: '0.8s', duration: '4.4s' },
  { top: '82%', left: '42%', size: 3, delay: '1.7s', duration: '3.9s' },
  { top: '76%', left: '92%', size: 3.5, delay: '2.2s', duration: '4.1s' },
];

/**
 * SCENE 3 — RSVP Signpost: three-tier rustic wooden sign with Santa hat & snowman.
 */
export function RsvpSignpost({
  savedRsvp,
  onOpenRsvp,
  onLampChange,
  onShowToast,
}: RsvpSignpostProps) {
  const { ref, isVisible } = useInView<HTMLElement>(0.2);
  const [snowmanBounceKey, setSnowmanBounceKey] = useState(0);
  const [isSnowmanBouncing, setIsSnowmanBouncing] = useState(false);
  const [santaHatKey, setSantaHatKey] = useState(0);
  const [isHatSwinging, setIsHatSwinging] = useState(false);

  const handleSnowmanTap = () => {
    setSnowmanBounceKey((k) => k + 1);
    setIsSnowmanBouncing(true);
    onShowToast('⛄ Confirm your RSVP below — we cannot wait!');
  };

  const handleSantaHatTap = () => {
    setSantaHatKey((k) => k + 1);
    setIsHatSwinging(true);
    onShowToast("🎅 Ho ho ho! Santa's hat is ready for the party!");
  };

  return (
    <section
      ref={ref}
      id="rsvp"
      className={`relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size] ${
        isVisible ? 'reveal-visible' : ''
      }`}
    >
      <img
        src="/images/rsvp-signpost.webp"
        alt="Three-tier snow-dusted wooden RSVP signpost with a red velvet Santa hat and cheerful snowman peeking around the side"
        className="h-full w-full object-cover select-none"
      />

      {/* Animated swaying & tap-swinging Santa hat overlay */}
      <div
        key={isHatSwinging ? `hat-${santaHatKey}` : 'hat-sway'}
        aria-hidden="true"
        onAnimationEnd={() => {
          if (isHatSwinging) setIsHatSwinging(false);
        }}
        className={`pointer-events-none absolute inset-0 ${
          isHatSwinging ? 'animate-santa-hat-swing' : 'animate-santa-hat-sway'
        }`}
        style={{
          transformOrigin: '60% 21%',
          maskImage: 'radial-gradient(21% 14% at 74% 24%, #000 62%, transparent 94%)',
          WebkitMaskImage: 'radial-gradient(21% 14% at 74% 24%, #000 62%, transparent 94%)',
        }}
      >
        <img
          src="/images/rsvp-signpost.webp"
          alt=""
          className="h-full w-full object-cover select-none"
        />
      </div>

      {/* Animated breathing & bouncing peeking Snowman overlay */}
      <div
        key={isSnowmanBouncing ? `snow-${snowmanBounceKey}` : 'snow-breathe'}
        aria-hidden="true"
        onAnimationEnd={() => {
          if (isSnowmanBouncing) setIsSnowmanBouncing(false);
        }}
        className={`pointer-events-none absolute inset-0 ${
          isSnowmanBouncing ? 'animate-snowman-bounce' : 'animate-snowman-breathe'
        }`}
        style={{
          transformOrigin: '72% 88%',
          maskImage: 'radial-gradient(26% 22% at 71% 67%, #000 60%, transparent 94%)',
          WebkitMaskImage: 'radial-gradient(26% 22% at 71% 67%, #000 60%, transparent 94%)',
        }}
      >
        <img
          src="/images/rsvp-signpost.webp"
          alt=""
          className="h-full w-full object-cover select-none"
        />
      </div>

      {/* Pulsing rosy-cheek warmth on the peeking snowman */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[64.2%] top-[58.8%] w-[5.5%] aspect-square rounded-full animate-cheek-blush"
        style={{
          background: 'radial-gradient(circle, rgba(255, 115, 115, 0.5) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[81.7%] top-[64.8%] w-[5.5%] aspect-square rounded-full animate-cheek-blush"
        style={{
          background: 'radial-gradient(circle, rgba(255, 115, 115, 0.5) 0%, transparent 70%)',
          mixBlendMode: 'screen',
          animationDelay: '0.5s',
        }}
      />

      {/* Soft atmospheric edge transitions */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[7%] bg-gradient-to-b from-[#071124]/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-[#060f20] via-[#060f20]/35 to-transparent"
      />

      {/* Ambient twinkling sparkles */}
      <AmbientSparkles points={RSVP_SPARKLES} />

      {/* Interactive background pine tree lantern on the left */}
      <InteractiveLamp
        lampName="Tree Lantern"
        onModeChange={(_mode, msg) => onLampChange(msg)}
        className="left-[6.5%] top-[50.5%] w-[14%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap tree lantern to change its light"
      />

      {/* Interactive hanging baubles near the Santa hat */}
      <FestiveTapZone
        onTrigger={() => onShowToast('✨ Wishing you golden holiday magic!')}
        emojis={['✨', '🌟', '🔔']}
        ariaLabel="Tap golden ornament"
        className="top-[5%] left-[12%] animate-bauble-swing"
      >
        <div className="mx-auto h-[38px] w-px bg-[#f4cd6d]/45" />
        <div className="h-7 w-7 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#fff3c4,_#e3b04b_45%,_#9c6a14_85%)] shadow-[0_0_18px_rgba(240,200,100,0.5)] transition group-hover:scale-110" />
      </FestiveTapZone>
      <FestiveTapZone
        onTrigger={() => onShowToast('🎄 Spreading festive cheer!')}
        emojis={['🎄', '❤️', '✨']}
        ariaLabel="Tap red ornament"
        className="top-[3%] right-[14%] animate-bauble-swing"
      >
        <div className="mx-auto h-[46px] w-px bg-[#f4cd6d]/45" />
        <div className="h-8 w-8 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#ffb3b3,_#c0282c_45%,_#7d1216_85%)] shadow-[0_0_18px_rgba(220,60,60,0.5)] transition group-hover:scale-110" />
      </FestiveTapZone>

      {/* Interactive Santa hat tap zone */}
      <FestiveTapZone
        onTrigger={handleSantaHatTap}
        emojis={['🎅', '🎄', '✨']}
        ariaLabel="Tap Santa hat to swing it"
        className="left-[66%] top-[12%] h-[26%] w-[26%] z-30"
      />

      {/* Interactive peeking snowman on the right */}
      <FestiveTapZone
        onTrigger={handleSnowmanTap}
        emojis={['⛄', '🎁', '❄️']}
        ariaLabel="Tap peeking snowman"
        className="left-[57%] top-[46%] h-[40%] w-[36%] z-20"
      />

      {/* PLANK 1 — RSVP Header & Deadline */}
      <button
        type="button"
        onClick={onOpenRsvp}
        className="reveal-item group absolute top-[18.8%] left-[15.5%] flex h-[11.2%] w-[56%] flex-col items-center justify-center px-[2.5cqw] text-center transition active:scale-[0.98]"
        style={{ transitionDelay: '80ms' }}
        aria-label="Open RSVP form"
      >
        <h2 className="animate-gold-shimmer font-cinzel text-[6.8cqw] font-extrabold leading-none tracking-[0.16em] gold-text-carved transition group-hover:brightness-110">
          RSVP
        </h2>
        <p className="font-lora mt-[0.8cqw] text-[2.55cqw] font-medium leading-[1.22] wood-cream-text">
          Kindly confirm your presence
          <br />
          by December 15, 2026.
        </p>
      </button>

      {/* Snowflake ornament perched gracefully between Plank 1 & Plank 2 */}
      <div
        className="reveal-item pointer-events-none absolute top-[31.1%] left-[16%] flex w-[56%] justify-center opacity-85"
        style={{ transitionDelay: '180ms' }}
      >
        <SnowflakeDivider color="#f8e3b0" className="w-[62%]" />
      </div>

      {/* PLANK 2 — Interactive Phone & Email Contact Links */}
      <div
        className="reveal-item absolute top-[34.6%] left-[16%] flex h-[11.2%] w-[61%] flex-col items-center justify-center gap-[1.3cqw] px-[2.5cqw]"
        style={{ transitionDelay: '280ms' }}
      >
        <a
          href="tel:+15551234567"
          className="flex items-center gap-[2.2cqw] rounded-md px-[2cqw] py-[0.4cqw] transition hover:bg-white/10 active:scale-95"
        >
          <span className="flex h-[4.8cqw] w-[4.8cqw] shrink-0 items-center justify-center rounded-sm bg-[#210f05]/75 text-[#f9de96] ring-1 ring-[#f6d074]/45">
            <Phone className="h-[3cqw] w-[3cqw]" />
          </span>
          <span className="font-lora text-[3.35cqw] font-semibold tracking-[0.02em] wood-cream-text">
            +1 (555) 123-4567
          </span>
        </a>

        <a
          href="mailto:party@yourmail.com?subject=Christmas%20Party%202026%20RSVP"
          className="flex items-center gap-[2.2cqw] rounded-md px-[2cqw] py-[0.4cqw] transition hover:bg-white/10 active:scale-95"
        >
          <span className="flex h-[4.8cqw] w-[4.8cqw] shrink-0 items-center justify-center rounded-sm bg-[#210f05]/75 text-[#f9de96] ring-1 ring-[#f6d074]/45">
            <Mail className="h-[3cqw] w-[3cqw]" />
          </span>
          <span className="font-lora text-[3.25cqw] font-medium wood-cream-text">
            party@yourmail.com
          </span>
        </a>
      </div>

      {/* PLANK 3 — Warm Closing Note (Left of Snowman) */}
      <div
        className="reveal-item pointer-events-none absolute top-[52.4%] left-[17%] flex h-[10.2%] w-[41.5%] items-center justify-center px-[1.5cqw] text-center"
        style={{ transitionDelay: '380ms' }}
      >
        <p className="font-garamond text-[4.1cqw] font-semibold italic leading-[1.12] wood-cream-text">
          We can’t wait to
          <br />
          celebrate with you!
        </p>
      </div>

      {/* Primary Mobile Interactive RSVP CTA tucked gracefully at foot of scene */}
      <div
        className="reveal-item absolute inset-x-0 bottom-[2.6%] flex justify-center px-5"
        style={{ transitionDelay: '480ms' }}
      >
        <button
          type="button"
          onClick={onOpenRsvp}
          className="animate-gold-glow flex items-center gap-2 rounded-full border border-[#fae094]/80 bg-gradient-to-r from-[#8b181c] via-[#b42327] to-[#8b181c] px-6 py-2.5 font-cinzel text-[12px] font-bold tracking-[0.14em] text-[#fff4d2] uppercase shadow-[0_8px_24px_rgba(0,0,0,0.65)] transition hover:brightness-110 active:scale-95"
        >
          {savedRsvp ? (
            <>
              <Check className="h-4 w-4 text-[#ffe79c]" />
              <span>View My RSVP Pass</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-[#ffe79c]" />
              <span>Confirm Your RSVP</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
