import { Check, Mail, Phone, Sparkles } from 'lucide-react';
import { SnowflakeDivider } from '../OrnamentDividers';
import { InteractiveLamp } from '../InteractiveLamp';
import type { RsvpSubmission } from '../RsvpModal';
import type { LampLightMode } from '../../utils/lampLight';

interface RsvpSignpostProps {
  savedRsvp: RsvpSubmission | null;
  onOpenRsvp: () => void;
  lampLight: LampLightMode;
  onToggleLamp: () => void;
}

/**
 * SCENE 3 — RSVP Signpost: three-tier rustic wooden sign with Santa hat & snowman.
 */
export function RsvpSignpost({
  savedRsvp,
  onOpenRsvp,
  lampLight,
  onToggleLamp,
}: RsvpSignpostProps) {
  return (
    <section
      id="rsvp"
      className="relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size]"
    >
      <img
        src="/images/rsvp-signpost.jpg"
        alt="Three-tier snow-dusted wooden RSVP signpost with a red velvet Santa hat and cheerful snowman peeking around the side"
        className="h-full w-full object-cover select-none"
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

      {/* Interactive background pine tree lantern on the left */}
      <InteractiveLamp
        mode={lampLight}
        onToggle={onToggleLamp}
        className="left-[6.5%] top-[50.5%] w-[14%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap tree lantern to change lights"
      />

      {/* Hanging golden bauble ornament near the Santa hat */}
      <div className="pointer-events-none absolute top-[5%] left-[12%] animate-bauble-swing">
        <div className="mx-auto h-[38px] w-px bg-[#f4cd6d]/45" />
        <div className="h-7 w-7 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#fff3c4,_#e3b04b_45%,_#9c6a14_85%)] shadow-[0_0_18px_rgba(240,200,100,0.5)]" />
      </div>
      <div className="pointer-events-none absolute top-[3%] right-[14%] animate-bauble-swing" style={{ animationDelay: '1.2s' }}>
        <div className="mx-auto h-[46px] w-px bg-[#f4cd6d]/45" />
        <div className="h-8 w-8 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#ffb3b3,_#c0282c_45%,_#7d1216_85%)] shadow-[0_0_18px_rgba(220,60,60,0.5)]" />
      </div>

      {/* PLANK 1 — RSVP Header & Deadline */}
      <button
        type="button"
        onClick={onOpenRsvp}
        className="group absolute top-[18.8%] left-[15.5%] flex h-[11.2%] w-[56%] flex-col items-center justify-center px-[2.5cqw] text-center transition active:scale-[0.98]"
        aria-label="Open RSVP form"
      >
        <h2 className="font-cinzel text-[6.8cqw] font-extrabold leading-none tracking-[0.16em] gold-text-carved transition group-hover:brightness-110">
          RSVP
        </h2>
        <p className="font-lora mt-[0.8cqw] text-[2.55cqw] font-medium leading-[1.22] wood-cream-text">
          Kindly confirm your presence
          <br />
          by December 15, 2025.
        </p>
      </button>

      {/* Snowflake ornament perched gracefully between Plank 1 & Plank 2 */}
      <div className="pointer-events-none absolute top-[31.1%] left-[16%] flex w-[56%] justify-center opacity-85">
        <SnowflakeDivider color="#f8e3b0" className="w-[62%]" />
      </div>

      {/* PLANK 2 — Interactive Phone & Email Contact Links */}
      <div className="absolute top-[34.6%] left-[16%] flex h-[11.2%] w-[61%] flex-col items-center justify-center gap-[1.3cqw] px-[2.5cqw]">
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
          href="mailto:party@yourmail.com?subject=Christmas%20Party%202025%20RSVP"
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
      <div className="pointer-events-none absolute top-[52.4%] left-[17%] flex h-[10.2%] w-[41.5%] items-center justify-center px-[1.5cqw] text-center">
        <p className="font-garamond text-[4.1cqw] font-semibold italic leading-[1.12] wood-cream-text">
          We can’t wait to
          <br />
          celebrate with you!
        </p>
      </div>

      {/* Primary Mobile Interactive RSVP CTA tucked gracefully at foot of scene */}
      <div className="absolute inset-x-0 bottom-[2.6%] flex justify-center px-5">
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
