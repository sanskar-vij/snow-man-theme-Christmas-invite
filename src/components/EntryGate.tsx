import { useEffect, useState } from 'react';
import { Calendar, Clock, MailOpen, MapPin } from 'lucide-react';
import { SnowflakeDivider } from './OrnamentDividers';
import { FairyLights } from './FairyLights';
import { AmbientSparkles } from './AmbientSparkles';

interface EntryGateProps {
  onEnter: () => void;
}

/**
 * Entry / landing page: full-screen festive gate shown before the invitation.
 * Tapping anywhere (or the button) plays a reveal animation and enters the app.
 */
export function EntryGate({ onEnter }: EntryGateProps) {
  const [closing, setClosing] = useState(false);

  // Lock body scroll while the entry gate is visible
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const handleOpen = () => {
    if (closing) return;
    setClosing(true);
    window.setTimeout(onEnter, 700);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Christmas Party entry page — tap to open the invitation"
      onClick={handleOpen}
      className={`fixed inset-0 z-[70] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-[#050b18] transition-all duration-700 ease-in-out ${
        closing ? 'pointer-events-none scale-110 opacity-0' : 'opacity-100'
      }`}
    >
      {/* Festive storybook backdrop with deep navy vignette for legible gold text */}
      <img
        src="/images/hero-snowman.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(7,17,36,0.2)_0%,_rgba(4,9,21,0.94)_80%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#030711] to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#030711] to-transparent"
      />

      {/* Festive fairy light strands across the top of the gate */}
      <FairyLights count={13} className="absolute top-4 left-0 right-0 h-10 opacity-90" />
      <FairyLights count={11} className="absolute top-14 left-0 right-0 h-8 opacity-60 scale-x-[-1]" />
      <AmbientSparkles />

      {/* Hanging Christmas baubles on the left & right edges */}
      <div className="absolute top-24 left-[8%] animate-bauble-swing">
        <div className="mx-auto h-10 w-px bg-[#f4cd6d]/50" />
        <div className="h-9 w-9 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#ffb3b3,_#c0282c_45%,_#7d1216_85%)] shadow-[0_0_20px_rgba(220,60,60,0.5)]" />
      </div>
      <div className="absolute top-32 right-[9%] animate-bauble-swing" style={{ animationDelay: '1.4s' }}>
        <div className="mx-auto h-8 w-px bg-[#f4cd6d]/50" />
        <div className="h-7 w-7 rounded-full bg-[radial-gradient(circle_at_32%_28%,_#fff3c4,_#e3b04b_45%,_#9c6a14_85%)] shadow-[0_0_20px_rgba(240,200,100,0.55)]" />
      </div>

      {/* Centered entry content */}
      <div
        className={`relative z-10 flex w-full max-w-[430px] flex-col items-center px-8 text-center ${
          closing ? '' : 'animate-fade-up'
        }`}
      >
        <SnowflakeDivider color="#f6d684" className="w-[46%] mb-5" />

        <p className="font-cinzel text-[11px] font-bold uppercase tracking-[0.42em] text-[#f4d488]">
          You are cordially invited to
        </p>

        <h1 className="font-script mt-3 text-[clamp(54px,17vw,84px)] leading-[0.95] gold-text-midnight">
          Christmas Party
        </h1>

        <p className="font-script mt-1 text-[clamp(22px,6.5vw,30px)] leading-none text-[#f8e6b8]/90">
          2025
        </p>

        {/* Quick event facts */}
        <div className="mt-6 flex flex-col items-center gap-2 text-[#fdf3d8]">
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
            <Calendar className="h-3.5 w-3.5 text-[#f4cd6d]" />
            Saturday, December 20, 2025
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
            <Clock className="h-3.5 w-3.5 text-[#f4cd6d]" />
            7:00 PM – 10:00 PM
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase">
            <MapPin className="h-3.5 w-3.5 text-[#f4cd6d]" />
            The Grand Hall, New York
          </span>
        </div>

        {/* Primary entry button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
          className="animate-gold-glow mt-9 flex items-center gap-2.5 rounded-full border border-[#fae094]/80 bg-gradient-to-r from-[#8b181c] via-[#b42327] to-[#8b181c] px-7 py-3.5 font-cinzel text-[13px] font-bold tracking-[0.16em] text-[#fff4d2] uppercase shadow-[0_10px_32px_rgba(0,0,0,0.75)] transition hover:brightness-110 active:scale-95"
        >
          <MailOpen className="h-4 w-4" />
          Open the Invitation
        </button>

        <p className="animate-bob mt-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#f8e4b5]/65">
          ✨ tap anywhere to begin ✨
        </p>
      </div>
    </div>
  );
}
