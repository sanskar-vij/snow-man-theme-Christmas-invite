import { useEffect, useRef, useState } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { SnowflakeDivider } from './OrnamentDividers';
import { FairyLights } from './FairyLights';
import { AmbientSparkles } from './AmbientSparkles';

interface EntryGateProps {
  onUnwrapStart?: () => void;
  onEnter: () => void;
}

const GIFT_IDLE_SPARKLES = [
  { top: '38%', left: '19%', size: 4, delay: '0s', duration: '3.2s' },
  { top: '44%', left: '34%', size: 4, delay: '0.5s', duration: '3.4s' },
  { top: '45%', left: '66%', size: 4, delay: '0.9s', duration: '3.6s' },
  { top: '42%', left: '80%', size: 3.5, delay: '1.4s', duration: '3.9s' },
  { top: '53%', left: '24%', size: 3.5, delay: '1.3s', duration: '3.8s' },
  { top: '56%', left: '78%', size: 3.5, delay: '0.4s', duration: '3.5s' },
  { top: '70%', left: '18%', size: 3, delay: '1.8s', duration: '4.1s' },
  { top: '72%', left: '84%', size: 3.5, delay: '1.1s', duration: '3.9s' },
];

const FOUNTAIN_PARTICLES = [
  { tx: '-145px', ty: '-140px', rot: '-260deg', delay: '180ms', color: '#ffe28a', size: 9, kind: 'star' },
  { tx: '-115px', ty: '-190px', rot: '220deg', delay: '210ms', color: '#ff5d64', size: 8, kind: 'circle' },
  { tx: '-88px', ty: '-225px', rot: '-180deg', delay: '240ms', color: '#fff8db', size: 10, kind: 'star' },
  { tx: '-54px', ty: '-250px', rot: '280deg', delay: '190ms', color: '#f7c95c', size: 8, kind: 'rect' },
  { tx: '-24px', ty: '-265px', rot: '-210deg', delay: '220ms', color: '#7ee2a8', size: 9, kind: 'circle' },
  { tx: '0px', ty: '-280px', rot: '300deg', delay: '170ms', color: '#ffe89c', size: 11, kind: 'star' },
  { tx: '28px', ty: '-262px', rot: '-240deg', delay: '200ms', color: '#ff5d64', size: 8, kind: 'rect' },
  { tx: '58px', ty: '-245px', rot: '210deg', delay: '235ms', color: '#fff8db', size: 9, kind: 'star' },
  { tx: '92px', ty: '-215px', rot: '-290deg', delay: '195ms', color: '#7ee2a8', size: 8, kind: 'circle' },
  { tx: '122px', ty: '-180px', rot: '250deg', delay: '225ms', color: '#f7c95c', size: 10, kind: 'star' },
  { tx: '150px', ty: '-135px', rot: '-220deg', delay: '250ms', color: '#ffe28a', size: 8, kind: 'rect' },
  { tx: '-130px', ty: '-95px', rot: '320deg', delay: '280ms', color: '#f7c95c', size: 7, kind: 'circle' },
  { tx: '-68px', ty: '-155px', rot: '-310deg', delay: '300ms', color: '#ffe89c', size: 9, kind: 'star' },
  { tx: '-14px', ty: '-195px', rot: '270deg', delay: '270ms', color: '#ff5d64', size: 8, kind: 'circle' },
  { tx: '40px', ty: '-185px', rot: '-260deg', delay: '290ms', color: '#fff8db', size: 9, kind: 'star' },
  { tx: '82px', ty: '-145px', rot: '295deg', delay: '310ms', color: '#7ee2a8', size: 7, kind: 'rect' },
  { tx: '134px', ty: '-92px', rot: '-245deg', delay: '285ms', color: '#ffe28a', size: 8, kind: 'circle' },
] as const;

/**
 * Entry / landing page: living Christmas gift scene with twinkling bokeh lights,
 * shimmering gold satin ribbon, and a ribbon-tap unwrap animation that unties the bow,
 * peels the ribbon, lifts the velvet lid, and enters the invitation.
 */
export function EntryGate({ onUnwrapStart, onEnter }: EntryGateProps) {
  const [phase, setPhase] = useState<'idle' | 'opening' | 'fading'>('idle');
  const timersRef = useRef<number[]>([]);

  // Lock body scroll while the entry gate is visible
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleTapRibbon = () => {
    if (phase !== 'idle') return;
    onUnwrapStart?.();
    setPhase('opening');

    const fadeTimer = window.setTimeout(() => setPhase('fading'), 1350);
    const enterTimer = window.setTimeout(onEnter, 1850);
    timersRef.current.push(fadeTimer, enterTimer);
  };

  const isOpening = phase !== 'idle';
  const isFading = phase === 'fading';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Christmas Party gift — tap the ribbon to unwrap your invitation"
      className={`fixed inset-0 z-[70] flex items-center justify-center overflow-hidden bg-[#040a17] transition-all duration-500 ease-in-out ${
        isFading ? 'pointer-events-none scale-105 opacity-0' : 'opacity-100'
      }`}
    >
      {/* Centered 9:16 living photographic gift stage */}
      <div
        className={`relative flex h-full w-full max-w-[430px] items-center justify-center overflow-hidden bg-[#050c1d] shadow-[0_0_90px_rgba(0,0,0,0.95)] transition-transform duration-700 ease-out sm:h-auto sm:aspect-[9/16] sm:max-h-[95dvh] sm:rounded-[32px] sm:border sm:border-[#e9c46a]/25 ${
          isFading ? 'scale-110' : isOpening ? 'animate-gift-stage-pop' : ''
        }`}
      >
        {/* Base opened gift layer (glowing interior + untied ribbons on snow) */}
        <img
          src="/images/gift-open.webp"
          alt="Opened crimson velvet Christmas gift glowing with golden light"
          className="absolute inset-0 h-full w-full object-cover select-none"
        />

        {/* Clean ribbonless closed crimson velvet gift box (fades out once ribbons peel & lid lifts) */}
        <img
          src="/images/gift-closed-velvet.webp"
          alt="Crimson velvet Christmas gift box in falling snow"
          className={`absolute inset-0 h-full w-full object-cover select-none transition-opacity duration-500 ease-out ${
            isOpening ? 'opacity-0 delay-300' : 'opacity-100'
          }`}
        />

        {/* Real extracted crimson velvet lid (rests on box when idle, lifts & tilts when opened) */}
        <img
          src="/images/gift-lid.webp"
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 h-full w-full object-cover select-none ${
            isOpening ? 'animate-lid-lift' : ''
          }`}
          style={{ transformOrigin: '78% 58%' }}
        />

        {/* Real extracted left gold satin ribbon strip (peels outward left when tapped) */}
        <img
          src="/images/gift-ribbon-left.webp"
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 h-full w-full object-cover select-none ${
            isOpening ? 'animate-ribbon-peel-left' : ''
          }`}
          style={{ transformOrigin: '34% 54%' }}
        />

        {/* Real extracted right gold satin ribbon strip (peels outward right when tapped) */}
        <img
          src="/images/gift-ribbon-right.webp"
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 h-full w-full object-cover select-none ${
            isOpening ? 'animate-ribbon-peel-right' : ''
          }`}
          style={{ transformOrigin: '69% 54%' }}
        />

        {/* Real extracted gold satin bow (unties upward when tapped) */}
        <img
          src="/images/gift-bow.webp"
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-20 h-full w-full object-cover select-none ${
            isOpening ? 'animate-bow-untie' : ''
          }`}
          style={{ transformOrigin: '50% 50%' }}
        />

        {/* Live twinkling bokeh lights on the background trees & village */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[18%] top-[37%] w-[24%] aspect-square rounded-full animate-bokeh-twinkle"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 224, 130, 0.55) 0%, rgba(255, 175, 65, 0.15) 45%, transparent 72%)',
            mixBlendMode: 'screen',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[43%] top-[43%] w-[20%] aspect-square rounded-full animate-bokeh-twinkle"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 215, 115, 0.45) 0%, rgba(255, 165, 55, 0.12) 45%, transparent 72%)',
            mixBlendMode: 'screen',
            animationDelay: '1.1s',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[76%] top-[44%] w-[20%] aspect-square rounded-full animate-bokeh-twinkle"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 215, 115, 0.48) 0%, rgba(255, 165, 55, 0.12) 45%, transparent 72%)',
            mixBlendMode: 'screen',
            animationDelay: '0.6s',
          }}
        />

        {/* Live diagonal satin sheen gliding over the real gold ribbon & bow */}
        {!isOpening && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[24%] top-[43%] h-[36%] w-[52%] overflow-hidden rounded-2xl"
          >
            <span
              className="animate-ribbon-sheen block h-full w-1/3 bg-gradient-to-r from-transparent via-[#fff8db]/35 to-transparent"
              style={{ mixBlendMode: 'screen' }}
            />
          </div>
        )}

        {/* Subtle top & bottom gradient scrims for crisp text readability */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[36%] bg-gradient-to-b from-[#030814]/85 via-[#030814]/40 to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#030814]/85 via-[#030814]/40 to-transparent"
        />

        {/* Ambient golden sparkles around the gift & bow */}
        <AmbientSparkles points={GIFT_IDLE_SPARKLES} />

        {/* Dedicated interactive tap zone over the Gold Satin Bow & Ribbon */}
        <button
          type="button"
          onClick={handleTapRibbon}
          aria-label="Tap the gold ribbon to unwrap the gift"
          className={`group absolute left-[24%] top-[43%] z-30 h-[36%] w-[52%] cursor-pointer rounded-3xl focus:outline-none ${
            isOpening ? 'pointer-events-none' : ''
          }`}
        >
          {!isOpening && (
            <>
              {/* Pulsing golden bow highlight ring */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-[18%] w-[54%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ffe49e]/65 animate-gentle-ping"
              />
              {/* Floating tap prompt on the bow */}
              <span
                aria-hidden="true"
                className="animate-bob pointer-events-none absolute left-1/2 top-[-12px] -translate-x-1/2 inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[#fae094]/80 bg-[#071226]/90 px-3 py-1 text-[10px] font-semibold tracking-[0.12em] text-[#fff2cf] uppercase shadow-lg backdrop-blur-md transition group-hover:scale-105 group-hover:border-[#ffe28a]"
              >
                <Sparkles className="h-3 w-3 text-[#f7d070]" />
                Tap Ribbon
              </span>
            </>
          )}
        </button>

        {/* Unwrap Celebration Effects: Expanding Starburst + Magic Light Beam + Sparkle Fountain */}
        {isOpening && (
          <>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[51%] z-20 w-[34%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#ffe28a] animate-lamp-burst"
              style={{
                boxShadow: '0 0 24px 6px rgba(255, 224, 130, 0.75)',
                mixBlendMode: 'screen',
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[16%] z-20 h-[44%] w-[64%] animate-gift-beam"
              style={{
                background:
                  'radial-gradient(ellipse at bottom, rgba(255, 246, 204, 0.85) 0%, rgba(255, 210, 105, 0.45) 38%, rgba(255, 170, 50, 0.1) 68%, transparent 85%)',
                mixBlendMode: 'screen',
              }}
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[52%] z-20 w-[62%] aspect-square rounded-full animate-gift-flare"
              style={{
                background:
                  'radial-gradient(circle, rgba(255, 252, 232, 0.92) 0%, rgba(255, 218, 120, 0.55) 36%, rgba(255, 170, 50, 0.15) 62%, transparent 75%)',
                mixBlendMode: 'screen',
              }}
            />

            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[53%] z-30 h-0 w-0">
              {FOUNTAIN_PARTICLES.map((p, idx) => (
                <span
                  key={idx}
                  className="animate-gift-fountain absolute left-0 top-0"
                  style={
                    {
                      '--tx': p.tx,
                      '--ty': p.ty,
                      '--rot': p.rot,
                      animationDelay: p.delay,
                      width: `${p.size}px`,
                      height: p.kind === 'rect' ? `${p.size + 4}px` : `${p.size}px`,
                      borderRadius: p.kind === 'circle' ? '9999px' : '2px',
                      clipPath:
                        p.kind === 'star'
                          ? 'polygon(50% 0%, 63% 35%, 100% 38%, 71% 61%, 81% 96%, 50% 75%, 19% 96%, 29% 61%, 0% 38%, 37% 35%)'
                          : undefined,
                      backgroundColor: p.color,
                      boxShadow: `0 0 10px 2px ${p.color}`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </>
        )}

        {/* Festive fairy light strand across the top sky */}
        <FairyLights count={13} className="absolute top-3 left-2 right-2 h-8 opacity-90" />

        {/* Header Typography in the Starry Midnight Sky */}
        <div
          className={`pointer-events-none absolute inset-x-0 top-[9%] z-10 flex flex-col items-center px-6 text-center transition-all duration-500 ${
            isOpening ? '-translate-y-4 opacity-0' : 'animate-fade-up opacity-100'
          }`}
        >
          <SnowflakeDivider color="#f6d684" className="mb-3 w-[44%]" />

          <p className="font-cinzel text-[10px] font-bold uppercase tracking-[0.38em] text-[#f4d488]">
            You are cordially invited to
          </p>

          <h1 className="font-script mt-1.5 text-[clamp(44px,13vw,64px)] leading-[0.98] gold-text-midnight">
            Christmas Party
          </h1>

          <p className="font-cinzel mt-1 text-xs font-bold tracking-[0.32em] text-[#f8e6b8]/90">
            2026
          </p>
        </div>

        {/* Bottom Unwrap Button (also triggers ribbon unwrap) */}
        <div
          className={`absolute inset-x-0 bottom-[6%] z-30 flex flex-col items-center px-6 text-center transition-all duration-400 ${
            isOpening ? 'pointer-events-none translate-y-3 opacity-0' : 'opacity-100'
          }`}
        >
          <button
            type="button"
            onClick={handleTapRibbon}
            className="animate-gold-glow flex items-center gap-2.5 rounded-full border border-[#fae094]/85 bg-gradient-to-r from-[#8b181c] via-[#b42327] to-[#8b181c] px-7 py-3 font-cinzel text-xs font-bold tracking-[0.16em] text-[#fff4d2] uppercase shadow-[0_10px_32px_rgba(0,0,0,0.85)] transition hover:brightness-110 active:scale-95"
          >
            <Gift className="h-4 w-4" />
            Tap Ribbon to Open
          </button>
        </div>
      </div>
    </div>
  );
}
