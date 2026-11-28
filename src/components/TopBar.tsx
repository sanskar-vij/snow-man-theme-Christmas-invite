import { Check, Music, Share2, Sparkles, VolumeX } from 'lucide-react';
import type { RsvpSubmission } from './RsvpModal';

interface TopBarProps {
  savedRsvp: RsvpSubmission | null;
  onOpenRsvp: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onShare: () => void;
}

/**
 * Floating minimal top bar: event date / RSVP status, music-box toggle, share.
 */
export function TopBar({
  savedRsvp,
  onOpenRsvp,
  isMusicPlaying,
  onToggleMusic,
  onShare,
}: TopBarProps) {
  return (
    <header className="pointer-events-none fixed top-0 left-1/2 z-40 flex w-full max-w-[430px] -translate-x-1/2 items-center justify-between px-3.5 pt-3 sm:top-4">
      <button
        type="button"
        onClick={onOpenRsvp}
        className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-[#f5d27a]/35 bg-[#09152b]/70 px-3 py-1.5 text-[11px] font-medium tracking-wide text-[#fce8b5] backdrop-blur-md transition hover:bg-[#0f2140]/85 active:scale-95"
      >
        {savedRsvp ? (
          <>
            <Check className="h-3.5 w-3.5 text-[#7ee2a8]" />
            <span>
              {savedRsvp.attending === 'yes'
                ? `Going (${savedRsvp.guests})`
                : 'Responded'}
            </span>
          </>
        ) : (
          <>
            <Sparkles className="h-3 w-3 text-[#f5ce70]" />
            <span>Dec 20, 2026</span>
          </>
        )}
      </button>

      <div className="pointer-events-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={isMusicPlaying ? 'Mute holiday music' : 'Play holiday music'}
          title={isMusicPlaying ? 'Mute holiday music' : 'Play holiday music'}
          className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition active:scale-95 ${
            isMusicPlaying
              ? 'border-[#f7d47c]/80 bg-[#9b2024]/85 text-[#fff1c7] shadow-[0_0_16px_rgba(247,212,124,0.45)]'
              : 'border-[#f5d27a]/35 bg-[#09152b]/70 text-[#fce8b5] hover:bg-[#102344]/85'
          }`}
        >
          {isMusicPlaying ? <Music className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
        </button>

        <button
          type="button"
          onClick={onShare}
          aria-label="Share invitation"
          title="Share invitation"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#f5d27a]/35 bg-[#09152b]/70 text-[#fce8b5] backdrop-blur-md transition hover:bg-[#102344]/85 active:scale-95"
        >
          <Share2 className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
