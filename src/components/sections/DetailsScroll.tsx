import { Calendar, CalendarPlus, Clock, ExternalLink, MapPin } from 'lucide-react';
import { ParchmentFlourish, SnowflakeDivider } from '../OrnamentDividers';
import { FairyLights } from '../FairyLights';
import { InteractiveLamp } from '../InteractiveLamp';
import { downloadChristmasCalendarEvent } from '../../utils/calendar';
import type { LampLightMode } from '../../utils/lampLight';

interface DetailsScrollProps {
  onShowToast: (msg: string) => void;
  lampLight: LampLightMode;
  onToggleLamp: () => void;
}

/**
 * SCENE 2 — Event Details: aged parchment scroll with date, time and venue.
 */
export function DetailsScroll({
  onShowToast,
  lampLight,
  onToggleLamp,
}: DetailsScrollProps) {
  return (
    <section
      id="details"
      className="relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size]"
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
        <h2 className="font-garamond text-[5.1cqw] font-bold italic leading-[1.15] tracking-[-0.01em] px-[1cqw]">
          Join us to celebrate
          <br />
          the season of joy,
          <br />
          love and togetherness!
        </h2>

        <SnowflakeDivider color="#2b180c" className="w-[82%] my-[0.5cqw]" />

        {/* Event Details List (Date, Time, Venue) */}
        <div className="flex w-full flex-col gap-[3.2cqw] px-[2.5cqw] text-left">
          {/* Date — Tap to Download Calendar Invite */}
          <button
            type="button"
            onClick={() => {
              downloadChristmasCalendarEvent();
              onShowToast('Saved Christmas Party (.ics) to calendar!');
            }}
            className="group flex items-center gap-[3.2cqw] rounded-lg px-[1.2cqw] py-[0.8cqw] -mx-[1.2cqw] text-left transition hover:bg-[#5c3615]/10 active:scale-[0.98]"
            title="Add to your calendar"
          >
            <div className="flex h-[7.2cqw] w-[7.2cqw] shrink-0 items-center justify-center rounded-md border border-[#3a200e]/30 bg-[#3a200e]/5 text-[#241309] transition group-hover:bg-[#8c1d20] group-hover:text-[#fff3cf]">
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

          {/* Time */}
          <div className="flex items-center gap-[3.2cqw]">
            <div className="flex h-[7.2cqw] w-[7.2cqw] shrink-0 items-center justify-center rounded-md border border-[#3a200e]/30 bg-[#3a200e]/5 text-[#241309]">
              <Clock className="h-[4.6cqw] w-[4.6cqw]" strokeWidth={2} />
            </div>
            <p className="font-lora text-[3.45cqw] font-semibold leading-tight text-[#221208]">
              7:00 PM – 10:00 PM
            </p>
          </div>

          {/* Location — Tap for Directions */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=The+Grand+Hall+123+Celebration+Way+New+York"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-[3.2cqw] rounded-lg px-[1.2cqw] py-[0.8cqw] -mx-[1.2cqw] transition hover:bg-[#5c3615]/10 active:scale-[0.98]"
          >
            <div className="mt-[0.4cqw] flex h-[7.2cqw] w-[7.2cqw] shrink-0 items-center justify-center rounded-md border border-[#3a200e]/30 bg-[#3a200e]/5 text-[#241309] transition group-hover:bg-[#8c1d20] group-hover:text-[#fff3cf]">
              <MapPin className="h-[4.6cqw] w-[4.6cqw]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-lora text-[3.45cqw] font-bold leading-[1.2] text-[#221208]">
                The Grand Hall
              </p>
              <p className="font-lora text-[3.05cqw] font-medium leading-[1.25] text-[#351e0f]">
                123 Celebration Way,
                <br />
                New York
              </p>
              <span className="mt-[0.3cqw] inline-flex items-center gap-1 text-[2.4cqw] font-semibold text-[#8c1d20] underline decoration-[#8c1d20]/45 underline-offset-2">
                Open in Maps
                <ExternalLink className="h-[2.4cqw] w-[2.4cqw]" />
              </span>
            </div>
          </a>
        </div>

        <ParchmentFlourish className="my-[0.3cqw] w-[58%]" />

        {/* Closing Parchment Sentiment */}
        <p className="font-garamond px-[3cqw] text-[4.15cqw] font-bold italic leading-[1.18] text-[#241309]">
          Let’s make this Christmas
          <br />
          truly special together!
        </p>
      </div>
    </section>
  );
}
