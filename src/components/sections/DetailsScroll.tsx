import { useState } from 'react';
import { Calendar, CalendarPlus, Clock, Copy, ExternalLink, MapPin, ScrollText } from 'lucide-react';
import { ParchmentFlourish, SnowflakeDivider } from '../OrnamentDividers';
import { FairyLights } from '../FairyLights';
import { InteractiveLamp } from '../InteractiveLamp';
import { AmbientSparkles } from '../AmbientSparkles';
import { downloadChristmasCalendarEvent } from '../../utils/calendar';

interface DetailsScrollProps {
  onShowToast: (msg: string) => void;
  onLampChange: (message: string) => void;
}

const SCROLL_SPARKLES = [
  { top: '12%', left: '10%', size: 3.5, delay: '0.2s', duration: '4s' },
  { top: '16%', left: '84%', size: 3, delay: '1.1s', duration: '3.7s' },
  { top: '44%', left: '8%', size: 3, delay: '1.8s', duration: '4.3s' },
  { top: '58%', left: '92%', size: 3.5, delay: '0.7s', duration: '4.1s' },
  { top: '90%', left: '62%', size: 3, delay: '1.5s', duration: '3.8s' },
];

/**
 * SCENE 2 — Event Details: rolled parchment scroll that unrolls on tap
 * to reveal the Sunday, December 20, 2026 date, time, and venue.
 */
export function DetailsScroll({
  onShowToast,
  onLampChange,
}: DetailsScrollProps) {
  const [isScrollOpen, setIsScrollOpen] = useState(false);

  const handleOpenScroll = () => {
    if (isScrollOpen) return;
    setIsScrollOpen(true);
  };

  return (
    <section
      id="details"
      className={`relative aspect-[9/16] w-full overflow-hidden [container-type:inline-size] ${
        isScrollOpen ? 'reveal-visible' : ''
      }`}
    >
      {/* Winter backdrop with scroll removed cleanly behind the closed scroll state */}
      <img
        src="/images/details-scroll-empty.webp"
        alt="Snowy holly boughs, glowing winter lanterns, and carved wooden Christmas tree"
        className="h-full w-full object-cover select-none"
      />

      {/* Full unrolled parchment layer (unfolds smoothly from center/top when tapped open) */}
      <img
        src="/images/details-scroll-bg.webp"
        alt="Unrolled aged parchment scroll framed by holly pine boughs and lanterns"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover select-none transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          clipPath: isScrollOpen ? 'inset(0% 0% 0% 0%)' : 'inset(38% 15% 62% 14%)',
          opacity: isScrollOpen ? 1 : 0,
        }}
      />

      {/* Real rolled parchment cylinder resting in the snowy pines before tap, rising cleanly to the top curl when opened */}
      <div
        aria-hidden={isScrollOpen}
        className="pointer-events-none absolute inset-0 z-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transform: isScrollOpen ? 'translateY(0%)' : 'translateY(21%)',
          opacity: isScrollOpen ? 0 : 1,
        }}
      >
        <img
          src="/images/scroll-top-roll.webp"
          alt=""
          className="h-full w-full object-cover select-none drop-shadow-[0_14px_24px_rgba(0,0,0,0.65)]"
        />

        {/* Crimson velvet scroll ribbon + stamped wax seal centered on the closed roll */}
        <div
          className={`absolute left-[48.2%] top-[14.2%] flex h-[8.6%] w-[7.2%] -translate-x-1/2 items-center justify-center rounded-sm border-x border-[#f7d47c]/65 bg-gradient-to-b from-[#7a1417] via-[#aa2226] to-[#631012] shadow-md transition-all duration-300 ${
            isScrollOpen ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <span className="flex h-[5.2cqw] w-[5.2cqw] items-center justify-center rounded-full border border-[#ffe28a]/75 bg-gradient-to-br from-[#c92b30] to-[#741114] text-[#fff1c7] shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            <ScrollText className="h-[2.7cqw] w-[2.7cqw]" />
          </span>
        </div>
      </div>

      {/* Tap-to-Open interactive target over the rolled scroll when closed */}
      {!isScrollOpen && (
        <button
          type="button"
          onClick={handleOpenScroll}
          aria-label="Tap scroll to open event details"
          className="group absolute left-[15%] top-[33%] z-30 flex h-[17%] w-[67%] cursor-pointer flex-col items-center justify-end pb-[0.5cqw] focus:outline-none"
        >
          <span className="animate-bob inline-flex items-center gap-1.5 rounded-full border border-[#fae094]/80 bg-[#071226]/90 px-4 py-1.5 font-cinzel text-[2.8cqw] font-bold tracking-[0.16em] text-[#fff2cf] uppercase shadow-[0_10px_28px_rgba(0,0,0,0.85)] backdrop-blur-md transition group-hover:scale-105 group-hover:border-[#ffe28a] active:scale-95">
            <ScrollText className="h-[3.2cqw] w-[3.2cqw] text-[#f7d070]" />
            Tap Scroll to Open
          </span>
        </button>
      )}

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
      <AmbientSparkles points={SCROLL_SPARKLES} />

      {/* Twinkling fairy lights draped through the snowy pine boughs overhead */}
      <FairyLights
        count={12}
        className="pointer-events-none absolute top-[3.5%] left-[4%] right-[14%] h-[5%] opacity-90"
      />

      {/* Interactive Red Snow Lantern on the lower-left */}
      <InteractiveLamp
        lampName="Red Lantern"
        onModeChange={(_mode, msg) => onLampChange(msg)}
        className="left-[14.2%] top-[80.5%] w-[26%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap red snow lantern to change its light"
      />

      {/* Interactive Hanging Brass Lantern on the upper-right */}
      <InteractiveLamp
        lampName="Brass Lantern"
        onModeChange={(_mode, msg) => onLampChange(msg)}
        className="left-[89.5%] top-[24.5%] w-[22%] aspect-square -translate-x-1/2 -translate-y-1/2"
        label="Tap hanging lantern to change its light"
      />

      {/* Printed Parchment Scroll Content (revealed smoothly once the scroll unrolls on tap) */}
      <div
        className={`absolute top-[22.5%] bottom-[21.5%] left-[21.5%] right-[21.5%] flex flex-col items-center justify-between py-[2.5cqw] text-center parchment-ink transition-opacity duration-500 ${
          isScrollOpen ? 'pointer-events-auto opacity-100 delay-200' : 'pointer-events-none opacity-0'
        }`}
      >
        {/* Opening Invitation Verse */}
        <h2
          className="reveal-item font-garamond text-[5.1cqw] font-bold italic leading-[1.15] tracking-[-0.01em] px-[1cqw]"
          style={{ transitionDelay: '220ms' }}
        >
          Join us to celebrate
          <br />
          the season of joy,
          <br />
          love and togetherness!
        </h2>

        <div className="reveal-item w-full" style={{ transitionDelay: '300ms' }}>
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
            style={{ transitionDelay: '360ms' }}
            title="Add to your calendar"
          >
            <div className="flex h-[7.2cqw] w-[7.2cqw] shrink-0 items-center justify-center rounded-md border border-[#3a200e]/30 bg-[#3a200e]/5 text-[#241309] transition group-hover:scale-105 group-hover:bg-[#8c1d20] group-hover:text-[#fff3cf]">
              <Calendar className="h-[4.6cqw] w-[4.6cqw]" strokeWidth={2} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-lora text-[3.4cqw] font-semibold leading-[1.24] text-[#221208]">
                Sunday,
                <br />
                December 20, 2026
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
            style={{ transitionDelay: '440ms' }}
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
            style={{ transitionDelay: '520ms' }}
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

        <div className="reveal-item w-full" style={{ transitionDelay: '600ms' }}>
          <ParchmentFlourish className="my-[0.3cqw] w-[58%]" />
        </div>

        {/* Closing Parchment Sentiment */}
        <p
          className="reveal-item font-garamond px-[3cqw] text-[4.15cqw] font-bold italic leading-[1.18] text-[#241309]"
          style={{ transitionDelay: '660ms' }}
        >
          Let’s make this Christmas
          <br />
          truly special together!
        </p>
      </div>
    </section>
  );
}
