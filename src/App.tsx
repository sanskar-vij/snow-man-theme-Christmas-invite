import { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { SnowfallOverlay } from './components/SnowfallOverlay';
import { RsvpModal, RsvpSubmission } from './components/RsvpModal';
import { ChapterDots, ChapterSection } from './components/ChapterDots';
import { Toast } from './components/Toast';
import { EntryGate } from './components/EntryGate';
import { HeroCover } from './components/sections/HeroCover';
import { DetailsScroll } from './components/sections/DetailsScroll';
import { RsvpSignpost } from './components/sections/RsvpSignpost';
import { ClosingVillage } from './components/sections/ClosingVillage';
import { useScrollSpy } from './hooks/useScrollSpy';
import { holidayMusicBox } from './components/HolidayAudio';
import { LAMP_LIGHT_CONFIGS, LAMP_LIGHT_MODES, type LampLightMode } from './utils/lampLight';

const SECTIONS: readonly ChapterSection[] = [
  { id: 'cover', label: 'Invite' },
  { id: 'details', label: 'Details' },
  { id: 'rsvp', label: 'RSVP' },
  { id: 'cheer', label: 'Cheer' },
];

const SECTION_IDS = SECTIONS.map((s) => s.id);
const STORAGE_KEY = 'christmas-party-2025-rsvp';

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
  const [lampLight, setLampLight] = useState<LampLightMode>('warm');
  const [hasTappedLamp, setHasTappedLamp] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [savedRsvp, setSavedRsvp] = useState<RsvpSubmission | null>(loadSavedRsvp);

  const toastTimerRef = useRef<number | null>(null);
  const activeSection = useScrollSpy(SECTION_IDS);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToastMessage(null), 3200);
  };

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

  const handleEnter = () => {
    setEntered(true);
    // The entry tap is a user gesture, so we can start the music box right away
    holidayMusicBox.start();
    setIsMusicPlaying(true);
  };

  const handleToggleMusic = () => {
    const playing = holidayMusicBox.toggle();
    setIsMusicPlaying(playing);
    showToast(playing ? 'Holiday music box playing' : 'Music paused');
  };

  const handleToggleLamp = () => {
    setHasTappedLamp(true);
    const nextIndex = (LAMP_LIGHT_MODES.indexOf(lampLight) + 1) % LAMP_LIGHT_MODES.length;
    const nextMode = LAMP_LIGHT_MODES[nextIndex];
    setLampLight(nextMode);
    const config = LAMP_LIGHT_CONFIGS[nextMode];
    showToast(`${config.emoji} Lamp Light: ${config.name}`);
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

      {/* Ambient gentle falling snow across the full website */}
      <SnowfallOverlay />

      {/* Entry / landing page shown before the invitation */}
      {!entered && <EntryGate onEnter={handleEnter} />}

      {/* Chapter navigation dots */}
      <ChapterDots sections={SECTIONS} activeSection={activeSection} onNavigate={scrollToSection} />

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
          lampLight={lampLight}
          onToggleLamp={handleToggleLamp}
          showLampHint={!hasTappedLamp}
          onShowToast={showToast}
        />
        <DetailsScroll
          onShowToast={showToast}
          lampLight={lampLight}
          onToggleLamp={handleToggleLamp}
        />
        <RsvpSignpost
          savedRsvp={savedRsvp}
          onOpenRsvp={() => setIsRsvpOpen(true)}
          lampLight={lampLight}
          onToggleLamp={handleToggleLamp}
          onShowToast={showToast}
        />
        <ClosingVillage
          lampLight={lampLight}
          onToggleLamp={handleToggleLamp}
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
