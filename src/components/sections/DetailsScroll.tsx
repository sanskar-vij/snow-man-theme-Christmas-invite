import { Calendar, CalendarPlus, Clock, Copy, ExternalLink, MapPin } from 'lucide-react';
import { ParchmentFlourish, SnowflakeDivider } from '../OrnamentDividers';
import { FairyLights } from '../FairyLights';
import { InteractiveLamp } from '../InteractiveLamp';
import { AmbientSparkles } from '../AmbientSparkles';
import { useInView } from '../../hooks/useInView';
import { downloadChristmasCalendarEvent } from '../../utils/calendar';
import type { LampLightMode } from '../../utils/lampLight';

interface DetailsScrollProps {
  onShowToast: (msg: string) => void;
  lampLight: LampLightMode;
  onToggleLamp: () => void;
}

const SCROLL_SPARKLES = [
  { top: '12%', left: '10%', size: 3.5, delay: '0.2s', duration: '4s' },
  { top: '16%', left: '84%', size: 3, delay: '1.1s', duration: '3.7s' },
  { top: '44%', left: '8%', size: 3, delay: '1.8s', duration: '4.3s' },
  { top: '58%', left: '92%', size: 3.5, delay: '0.7s', duration: '4.1s' },
  { top: '90%', left: '62%', size: 3, delay: '1.5s', duration: '3.8s' },
];

/**
 * SCENE 2 — Event Details: aged parchment scroll with date, time and venue.
 */
export function DetailsScroll({
  onShowToast,
  lampLight,
  onToggleLamp,
}: DetailsScrollProps) {
  const { ref, isVisible } = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      id="details"
      className={`relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size] ${
        isVisible ? 'reveal-visible' : ''
      }`}
    >
      <img
        src="/images/details-scroll-bg.webp"
        alt="Festive aged parchment scroll framed by holly pine boughs, glowing lanterns, and a carved wooden Christmas tree"
        className="h-full w-full object-cover select-none"
      />

      {/* Soft atmospheric edge transitions */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[7%] bg-gradient-to-b from-[#060f1f]/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[8%] bg-gradient-to-t from-[#071124]/80 to-transparent"
      />

      {/* Ambient twinkling sparkles around the scroll */}
      <AmbientSparkles mode={lampLight} points={SCROLL_SPARKLES} />

      {/* Twinkling fairy lights draped through the snowy pine boughs overhead */}
      <FairyLights
        count={12}
        mode={lampLight}
        className="absolute top-[3.5%] left-[4%] right-[14%] h-[5%] opacity-90"
      />

      {/* Interactive Red Snow Lantern on the lower-left */}
      <InteractiveLamp
        mode={lampLight}
        onToggle={onToggleLamp}
        className="left-[14.2%] top-[80.5%] w-[26%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap red snow lantern to change lights"
      />

      {/* Interactive Hanging Brass Lantern on the upper-right */}
      <InteractiveLamp
        mode={lampLight}
        onToggle={onToggleLamp}
        className="left-[89.5%] top-[24.5%] w-[22%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap hanging lantern to change lights"
      />

      {/* Printed Parchment Scroll Content */}
      <div className="absolute top-[22.5%] bottom-[21.5%] left-[21.5%] right-[21.5%] flex flex-col items-center justify-between py-[2.5cqw] text-center parchment-ink">
        {/* Opening Invitation Verse */}
        <h2
          className="reveal-item font-garamond text-[5.1cqw] font-bold italic leading-[1.15] tracking-[-0.01em] px-[1cqw]"
          style={{ transitionDelay: '80ms' }}
        >
          Join us to celebrate
          <br />
          the season of joy,
          <br />
          love and togetherness!
        </h2>

        <div className="reveal-item w-full" style={{ transitionDelay: '180ms' }}>
          <SnowflakeDivider color="#2b180c" className="w-[82%] mx-auto my-[0.5cqw]" />
        </div>

        {/* Event Details List (Date, Time, Venue) */}
        <div className="flex w-full flex-col gap-[3.2cqw] px-[2.5cqw] text-left">
          {/* Date — Tap to Download Calendar Invite */}
          <button
            type="button"
            onClick={() => {
              downloadChristmasCalendarEvent();
              onShowToast('Saved Christmas Party (.ics) to calendar!');
            }}
            className="reveal-item group flex items-center gap-[3.2cqw] rounded-lg px-[1.2cqw] py-[0.8cqw] -mx-[1.2cqw] text-left transition hover:bg-[#5c3615]/10 active:scale-[0.98]"
            style={{ transitionDelay: '260ms' }}
            title="Add to your calendar"
          >
            <div className="flex h-[7.2cqw] w-[7.2cqw] shrink-0 items-center justify-center rounded-md border border-[#3a200e]/30 bg-[#3a200e]/5 text-[#241309] transition group-hover:scale-105 group-hover:bg-[#8c1d20] group-hover:text-[#fff3cf]">
              <Calendar className="h-[4.6cqw] w-[4.6cqw]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-lora text-[3.4cqw] font-semibold leading-[1.24] text-[#221208]">
                Saturday,
                <br />
                December 20, 2025
              </p>
              <span className="mt-[0.3cqw] inline-flex items-center gap-1 text-[2.4cqw] font-semibold text-[#8c1d20] underline decoration-[#8c1d20]/45 underline-offset-2">
                <CalendarPlus className="h-[2.6cqw] w-[2.6cqw]" />
                Tap to save date
              </span>
            </div>
          </button>

          {/* Time — Tap for schedule reminder */}
          <button
            type="button"
            onClick={() => onShowToast('⏰ Doors open at 7:00 PM — Celebrations run until 10:00 PM!')}
            className="reveal-item group flex items-center gap-[3.2cqw] rounded-lg px-[1.2cqw] py-[0.8cqw] -mx-[1.2cqw] text-left transition hover:bg-[#5c3615]/10 active:scale-[0.98]"
            style={{ transitionDelay: '350ms' }}
            title="View evening schedule"
          >
            <div className="flex h-[7.2cqw] w-[7.2cqw] shrink-0 items-center justify-center rounded-md border border-[#3a200e]/30 bg-[#3a200e]/5 text-[#241309] transition group-hover:scale-105 group-hover:bg-[#8c1d20] group-hover:text-[#fff3cf]">
              <Clock className="h-[4.6cqw] w-[4.6cqw]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-lora text-[3.45cqw] font-semibold leading-tight text-[#221208]">
                7:00 PM – 10:00 PM
              </p>
              <span className="mt-[0.2cqw] inline-block text-[2.25cqw] font-medium text-[#5a351b]">
                Evening festive celebration
              </span>
            </div>
          </button>

          {/* Location — Directions & Copy Address */}
          <div
            className="reveal-item flex items-start gap-[3.2cqw] rounded-lg px-[1.2cqw] py-[0.8cqw] -mx-[1.2cqw]"
            style={{ transitionDelay: '440ms' }}
          >
            <a
              href="https://www.google.com/maps/search/?api=1&query=The+Grand+Hall+123+Celebration+Way+New+York"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open The Grand Hall in Google Maps"
              className="mt-[0.4cqw] flex h-[7.2cqw] w-[7.2cqw] shrink-0 items-center justify-center rounded-md border border-[#3a200e]/30 bg-[#3a200e]/5 text-[#241309] transition hover:scale-105 hover:bg-[#8c1d20] hover:text-[#fff3cf] active:scale-95"
            >
              <MapPin className="h-[4.6cqw] w-[4.6cqw]" strokeWidth={2} />
            </a>
            <div className="min-w-0 flex-1">
              <p className="font-lora text-[3.45cqw] font-bold leading-[1.2] text-[#221208]">
                The Grand Hall
              </p>
              <p className="font-lora text-[3.05cqw] font-medium leading-[1.25] text-[#351e0f]">
                123 Celebration Way,
                <br />
                New York
              </p>
              <div className="mt-[0.4cqw] flex flex-wrap items-center gap-x-[2.5cqw] gap-y-1">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=The+Grand+Hall+123+Celebration+Way+New+York"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[2.4cqw] font-semibold text-[#8c1d20] underline decoration-[#8c1d20]/45 underline-offset-2 hover:brightness-110"
                >
                  Open in Maps
                  <ExternalLink className="h-[2.4cqw] w-[2.4cqw]" />
                </a>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard?.writeText('The Grand Hall, 123 Celebration Way, New York');
                      onShowToast('📍 Venue address copied!');
                    } catch {
                      onShowToast('📍 The Grand Hall, 123 Celebration Way, New York');
                    }
                  }}
                  className="inline-flex items-center gap-1 text-[2.4cqw] font-semibold text-[#5e2a10] underline decoration-[#5e2a10]/45 underline-offset-2 transition hover:text-[#8c1d20] active:scale-95"
                >
                  <Copy className="h-[2.3cqw] w-[2.3cqw]" />
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="reveal-item w-full" style={{ transitionDelay: '520ms' }}>
          <ParchmentFlourish className="my-[0.3cqw] w-[58%]" />
        </div>

        {/* Closing Parchment Sentiment */}
        <p
          className="reveal-item font-garamond px-[3cqw] text-[4.15cqw] font-bold italic leading-[1.18] text-[#241309]"
          style={{ transitionDelay: '600ms' }}
        >
          Let’s make this Christmas
          <br />
          truly special together!
        </p>
      </div>
    </section>
  );
}
