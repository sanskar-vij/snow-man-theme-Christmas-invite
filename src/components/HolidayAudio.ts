// Synthesized gentle Christmas music-box player using Web Audio API
// Plays a warm, twinkling celesta arrangement of "We Wish You a Merry Christmas"

const NOTE_FREQS: Record<string, number> = {
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  'F#5': 739.99,
  G5: 783.99,
  A5: 880.0,
};

// [note, duration in beats]
const MELODY: Array<[string | null, number]> = [
  ['D5', 1],
  ['G5', 1],
  ['G5', 0.5],
  ['A5', 0.5],
  ['G5', 0.5],
  ['F#5', 0.5],
  ['E5', 1],
  ['E5', 1],
  ['E5', 1],
  ['A5', 1],
  ['A5', 0.5],
  ['B4', 0.5],
  ['A5', 0.5],
  ['G5', 0.5],
  ['F#5', 1],
  ['D5', 1],
  ['D5', 1],
  ['G5', 1],
  ['G5', 0.5],
  ['A5', 0.5],
  ['G5', 0.5],
  ['F#5', 0.5],
  ['E5', 1],
  ['C5', 1],
  ['D5', 0.5],
  ['D5', 0.5],
  ['E5', 1],
  ['A5', 1],
  ['F#5', 1],
  ['G5', 2],
  [null, 1],
];

class HolidayMusicBox {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private stepIndex = 0;

  private playChime(freq: number, durationSec: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const harmonic = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const harmonicGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    harmonic.type = 'triangle';
    harmonic.frequency.setValueAtTime(freq * 2, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.075, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(durationSec * 1.4, 0.7));

    harmonicGain.gain.setValueAtTime(0.0001, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.018, now + 0.015);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(gain);
    harmonic.connect(harmonicGain);
    gain.connect(this.ctx.destination);
    harmonicGain.connect(this.ctx.destination);

    osc.start(now);
    harmonic.start(now);
    osc.stop(now + Math.max(durationSec * 1.5, 0.8));
    harmonic.stop(now + 0.35);
  }

  private scheduleNext() {
    if (!this.isPlaying) return;
    const [note, beats] = MELODY[this.stepIndex % MELODY.length];
    const beatMs = 460;
    const durMs = beats * beatMs;

    if (note && NOTE_FREQS[note]) {
      this.playChime(NOTE_FREQS[note], durMs / 1000);
    }

    this.stepIndex = (this.stepIndex + 1) % MELODY.length;
    this.timerId = window.setTimeout(() => this.scheduleNext(), durMs);
  }

  public start() {
    if (this.isPlaying) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.scheduleNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.ctx && this.ctx.state === 'running') {
      void this.ctx.suspend();
    }
  }

  public dispose() {
    this.stop();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const holidayMusicBox = new HolidayMusicBox();
