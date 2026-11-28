import { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { SnowfallOverlay } from './components/SnowfallOverlay';
import { RsvpModal, RsvpSubmission } from './components/RsvpModal';
import { Toast } from './components/Toast';
import { EntryGate } from './components/EntryGate';
import { HeroCover } from './components/sections/HeroCover';
import { DetailsScroll } from './components/sections/DetailsScroll';
import { RsvpSignpost } from './components/sections/RsvpSignpost';
import { ClosingVillage } from './components/sections/ClosingVillage';
import { holidayMusicBox } from './components/HolidayAudio';

const STORAGE_KEY = 'christmas-party-2026-rsvp';

function loadSavedRsvp(): RsvpSubmission | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as RsvpSubmission) : null;
  } catch {
    return null;
  }
}

export function App() {
  const [entered, setEntered] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasTappedLamp, setHasTappedLamp] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [savedRsvp, setSavedRsvp] = useState<RsvpSubmission | null>(loadSavedRsvp);

  const toastTimerRef = useRef<number | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 3200);
  };

  useEffect(() => {
    document.body.classList.toggle('snowflake-cursor-active', entered);
    return () => {
      document.body.classList.remove('snowflake-cursor-active');
    };
  }, [entered]);

  useEffect(() => {
    const stopAudio = () => {
      holidayMusicBox.stop();
      setIsMusicPlaying(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAudio();
      }
    };

    const handlePageExit = () => {
      holidayMusicBox.dispose();
      setIsMusicPlaying(false);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageExit);
    window.addEventListener('beforeunload', handlePageExit);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageExit);
      window.removeEventListener('beforeunload', handlePageExit);
      holidayMusicBox.dispose();
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleUnwrapStart = () => {
    // Start music synchronously on the user tap so mobile browsers never block playback
    holidayMusicBox.start();
    setIsMusicPlaying(true);
  };

  const handleEnter = () => {
    setEntered(true);
  };

  const handleToggleMusic = () => {
    const playing = holidayMusicBox.toggle();
    setIsMusicPlaying(playing);
    showToast(playing ? 'Holiday music box playing' : 'Music paused');
  };

  const handleLampChange = (message: string) => {
    setHasTappedLamp(true);
    showToast(message);
  };

  const handleSaveRsvp = (submission: RsvpSubmission) => {
    setSavedRsvp(submission);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submission));
    } catch {
      // ignore storage errors
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050b18] text-[#fff8eb] selection:bg-[#d89e3c]/40">
      {/* Soft festive ambient backdrop glow on wider desktop screens */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(26,56,108,0.45)_0%,_rgba(5,11,24,0.96)_62%,_#030711_100%)]"
      />

      {/* Ambient gentle falling snow + post-entry snowflake cursor fall */}
      <SnowfallOverlay enableCursorTrail={entered} />

      {/* Entry / landing page shown before the invitation */}
      {!entered && <EntryGate onUnwrapStart={handleUnwrapStart} onEnter={handleEnter} />}

      {/* Floating corner button to pause / play music from any scene */}
      {entered && (
        <button
          type="button"
          onClick={handleToggleMusic}
          aria-label={isMusicPlaying ? 'Pause holiday music' : 'Play holiday music'}
          title={isMusicPlaying ? 'Pause holiday music' : 'Play holiday music'}
          className={`pointer-events-auto fixed top-3.5 right-3.5 z-40 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md shadow-lg transition active:scale-95 sm:top-5 sm:right-[max(14px,calc(50%-200px))] ${
            isMusicPlaying
              ? 'border-[#f7d47c]/70 bg-[#8c1d20]/85 text-[#fff1c7] shadow-[0_0_14px_rgba(247,212,124,0.35)] hover:bg-[#a62428]'
              : 'border-[#f5d27a]/40 bg-[#09152b]/80 text-[#fce8b5]/75 hover:bg-[#102344] hover:text-[#fce8b5]'
          }`}
        >
          {isMusicPlaying ? (
            <Music className="h-4 w-4 animate-pulse text-[#fff1c7]" />
          ) : (
            <VolumeX className="h-4 w-4 text-[#fce8b5]" />
          )}
        </button>
      )}

      {/* Centered Mobile Invitation Viewport Shell */}
      <main className="relative z-10 mx-auto w-full max-w-[430px] bg-[#071124] shadow-[0_0_90px_rgba(0,0,0,0.9)] sm:my-4 sm:overflow-hidden sm:rounded-[32px] sm:border sm:border-[#e9c46a]/25">
        <HeroCover
          onScrollToDetails={() => scrollToSection('details')}
          showLampHint={!hasTappedLamp}
          onLampChange={handleLampChange}
          onShowToast={showToast}
        />
        <DetailsScroll
          onShowToast={showToast}
          onLampChange={handleLampChange}
        />
        <RsvpSignpost
          savedRsvp={savedRsvp}
          onOpenRsvp={() => setIsRsvpOpen(true)}
          onLampChange={handleLampChange}
          onShowToast={showToast}
        />
        <ClosingVillage
          onLampChange={handleLampChange}
          onShowToast={showToast}
        />
      </main>

      {/* Interactive Parchment RSVP Bottom-Sheet Modal */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
        savedRsvp={savedRsvp}
        onSaveRsvp={handleSaveRsvp}
        onShowToast={showToast}
      />

      {/* Festive Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}

export default App;
