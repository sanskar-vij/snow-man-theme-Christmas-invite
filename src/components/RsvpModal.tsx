import React, { useState } from 'react';
import { CalendarPlus, Check, Mail, Phone, Sparkles, Users, X } from 'lucide-react';
import { SnowflakeDivider } from './OrnamentDividers';
import { downloadChristmasCalendarEvent } from '../utils/calendar';

export interface RsvpSubmission {
  name: string;
  attending: 'yes' | 'no';
  guests: number;
  treat: string;
  note: string;
  submittedAt: string;
}

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedRsvp: RsvpSubmission | null;
  onSaveRsvp: (data: RsvpSubmission) => void;
  onShowToast: (msg: string) => void;
}

const HOLIDAY_TREATS = [
  'Hot Cocoa Bar',
  'Gingerbread & Cookies',
  'Spiced Mulled Cider',
  'Classic Eggnog',
  'Vegetarian Platter',
];

export const RsvpModal: React.FC<RsvpModalProps> = ({
  isOpen,
  onClose,
  savedRsvp,
  onSaveRsvp,
  onShowToast,
}) => {
  const [isEditing, setIsEditing] = useState(!savedRsvp);
  const [name, setName] = useState(savedRsvp?.name || '');
  const [attending, setAttending] = useState<'yes' | 'no'>(savedRsvp?.attending || 'yes');
  const [guests, setGuests] = useState(savedRsvp?.guests || 2);
  const [treat, setTreat] = useState(savedRsvp?.treat || HOLIDAY_TREATS[0]);
  const [note, setNote] = useState(savedRsvp?.note || '');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name so we can add you to the guest list.');
      return;
    }
    setError('');
    const submission: RsvpSubmission = {
      name: name.trim(),
      attending,
      guests: attending === 'yes' ? guests : 0,
      treat,
      note: note.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    onSaveRsvp(submission);
    setIsEditing(false);
    onShowToast(
      attending === 'yes'
        ? `See you at The Grand Hall, ${submission.name}!`
        : 'Thank you for letting us know — Merry Christmas!'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#040915]/80 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-[430px] max-h-[92dvh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] border border-[#e8c26d]/45 bg-gradient-to-b from-[#f9ebd0] via-[#f4dfb7] to-[#e9cca0] text-[#28160b] shadow-[0_-10px_45px_rgba(0,0,0,0.75)] animate-fade-up">
        {/* Decorative top gilded trim */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#8e632b]/25 bg-[#f7e7c8]/95 px-5 py-3.5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[#a82323]" />
            <span
              id="rsvp-modal-title"
              className="font-cinzel text-sm font-bold tracking-[0.14em] text-[#5e2a10] uppercase"
            >
              Christmas Party RSVP
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close RSVP sheet"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3a200e]/10 text-[#3a200e] transition hover:bg-[#3a200e]/20 active:scale-95"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="px-5 py-5">
          {!isEditing && savedRsvp ? (
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d49a3a] bg-gradient-to-br from-[#9e1d20] to-[#6a1014] text-[#fff2c6] shadow-lg">
                <Check className="h-7 w-7" strokeWidth={2.5} />
              </div>

              <div>
                <p className="font-script text-4xl text-[#8d1d1f]">
                  {savedRsvp.attending === 'yes' ? 'You’re on the List!' : 'Warmest Wishes!'}
                </p>
                <p className="mt-1 font-garamond text-lg italic text-[#4a2b16]">
                  {savedRsvp.attending === 'yes'
                    ? 'We can’t wait to celebrate this magical evening with you.'
                    : 'You will be dearly missed — wishing you a joyful holiday season!'}
                </p>
              </div>

              <SnowflakeDivider color="#6e4720" />

              {/* Golden Keepsake Guest Pass */}
              <div className="rounded-2xl border border-[#b48136]/45 bg-[#fff8ea]/80 p-4 text-left shadow-inner">
                <div className="flex items-center justify-between border-b border-[#b48136]/25 pb-2.5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8b5c25]">
                      Guest Name
                    </p>
                    <p className="font-cinzel text-base font-bold text-[#2b170b]">
                      {savedRsvp.name}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      savedRsvp.attending === 'yes'
                        ? 'bg-[#194a2d] text-[#f9e7b2]'
                        : 'bg-[#7b2525]/15 text-[#7b2525]'
                    }`}
                  >
                    {savedRsvp.attending === 'yes'
                      ? `${savedRsvp.guests} ${savedRsvp.guests === 1 ? 'Guest' : 'Guests'}`
                      : 'Declined'}
                  </span>
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-[#4b2d18]">
                  <p>
                    <span className="font-semibold">Event:</span> Saturday, December 20, 2025 • 7:00 PM
                  </p>
                  <p>
                    <span className="font-semibold">Venue:</span> The Grand Hall, 123 Celebration Way, NY
                  </p>
                  {savedRsvp.attending === 'yes' && (
                    <p>
                      <span className="font-semibold">Festive Treat:</span> {savedRsvp.treat}
                    </p>
                  )}
                  {savedRsvp.note && (
                    <p className="mt-2 rounded-lg bg-[#f3dfbb]/70 px-3 py-2 italic text-[#3a200e]">
                      “{savedRsvp.note}”
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-1">
                {savedRsvp.attending === 'yes' && (
                  <button
                    type="button"
                    onClick={() => {
                      downloadChristmasCalendarEvent();
                      onShowToast('Calendar invite downloaded!');
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#8f1a1d] via-[#b12327] to-[#8f1a1d] px-4 py-3 font-cinzel text-xs font-bold tracking-[0.14em] text-[#fff2cc] uppercase shadow-md transition active:scale-[0.98]"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Add to My Calendar (.ics)
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full rounded-xl border border-[#7c5324]/40 bg-transparent px-4 py-2.5 text-xs font-semibold tracking-wider text-[#5a3518] uppercase transition hover:bg-[#7c5324]/10"
                >
                  Update My Response
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center">
                <p className="font-garamond text-lg italic leading-snug text-[#3d2110]">
                  Kindly confirm your presence by{' '}
                  <span className="font-semibold not-italic text-[#8d1d1f]">December 15, 2025</span>
                </p>
              </div>

              {/* Attending toggle */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`rounded-xl border px-3 py-3 text-center text-xs font-semibold transition active:scale-[0.98] ${
                    attending === 'yes'
                      ? 'border-[#164a2c] bg-[#164a2c] text-[#fce8b2] shadow-md'
                      : 'border-[#8f6632]/35 bg-[#fff8eb]/65 text-[#4a2b16]'
                  }`}
                >
                  🎄 Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`rounded-xl border px-3 py-3 text-center text-xs font-semibold transition active:scale-[0.98] ${
                    attending === 'no'
                      ? 'border-[#8a1e22] bg-[#8a1e22] text-[#fce8b2] shadow-md'
                      : 'border-[#8f6632]/35 bg-[#fff8eb]/65 text-[#4a2b16]'
                  }`}
                >
                  ❄️ Regretfully Declines
                </button>
              </div>

              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#5d3719]">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g., Clara & Daniel Brooks"
                  className="w-full rounded-xl border border-[#8f6632]/40 bg-[#fffaf0] px-3.5 py-2.5 text-sm text-[#28160b] placeholder:text-[#987752] focus:border-[#9e1d20] focus:outline-none focus:ring-2 focus:ring-[#9e1d20]/20"
                />
                {error && <p className="mt-1 text-xs font-medium text-[#9e1d20]">{error}</p>}
              </div>

              {attending === 'yes' && (
                <>
                  {/* Guest Count */}
                  <div>
                    <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#5d3719]">
                      <Users className="h-3.5 w-3.5" />
                      Number of Guests
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={`rounded-lg border py-2 text-sm font-bold transition ${
                            guests === num
                              ? 'border-[#9e1d20] bg-[#9e1d20] text-[#fff0c4] shadow'
                              : 'border-[#8f6632]/35 bg-[#fff8eb]/70 text-[#4b2d18]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Favorite Holiday Treat */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[#5d3719]">
                      Festive Treat Preference
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {HOLIDAY_TREATS.map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setTreat(item)}
                          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                            treat === item
                              ? 'border-[#8d5d1a] bg-[#d6a043]/30 text-[#3c1f09] font-semibold'
                              : 'border-[#8f6632]/30 bg-[#fff9ee]/65 text-[#5c3a20]'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Message */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#5d3719]">
                  Holiday Wish or Dietary Note (Optional)
                </label>
                <textarea
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Can't wait to celebrate under the lights!"
                  className="w-full resize-none rounded-xl border border-[#8f6632]/40 bg-[#fffaf0] px-3.5 py-2 text-sm text-[#28160b] placeholder:text-[#987752] focus:border-[#9e1d20] focus:outline-none focus:ring-2 focus:ring-[#9e1d20]/20"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-[#8c181b] via-[#b52226] to-[#8c181b] px-5 py-3.5 font-cinzel text-xs font-bold tracking-[0.16em] text-[#fff2c8] uppercase shadow-[0_6px_18px_rgba(138,24,27,0.38)] transition hover:brightness-105 active:scale-[0.98]"
              >
                Confirm My RSVP
              </button>

              {/* Direct contact fallback */}
              <div className="flex items-center justify-center gap-4 border-t border-[#8e632b]/25 pt-3 text-[11px] text-[#5c391e]">
                <a href="tel:+15551234567" className="flex items-center gap-1 hover:underline">
                  <Phone className="h-3 w-3" />
                  +1 (555) 123-4567
                </a>
                <span>•</span>
                <a href="mailto:party@yourmail.com" className="flex items-center gap-1 hover:underline">
                  <Mail className="h-3 w-3" />
                  party@yourmail.com
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
