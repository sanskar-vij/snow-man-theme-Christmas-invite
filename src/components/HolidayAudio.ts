// Plays the holiday background song from /audio/holiday-song.wav
// with clean start, pause/stop, toggle, and tab-visibility/exit cleanup.

const SONG_SRC = '/audio/holiday-song.wav';

class HolidayMusicPlayer {
  private audio: HTMLAudioElement | null = null;
  private isPlaying = false;

  private ensureAudio(): HTMLAudioElement | null {
    if (typeof Audio === 'undefined') return null;
    if (!this.audio) {
      const audio = new Audio(SONG_SRC);
      audio.loop = true;
      audio.preload = 'auto';
      audio.volume = 0.75;
      this.audio = audio;
    }
    return this.audio;
  }

  public start() {
    if (this.isPlaying) return;
    const audio = this.ensureAudio();
    if (!audio) return;

    this.isPlaying = true;
    void audio.play().catch(() => {
      this.isPlaying = false;
    });
  }

  public stop() {
    this.isPlaying = false;
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  public dispose() {
    this.stop();
    if (this.audio) {
      this.audio.currentTime = 0;
      this.audio = null;
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

export const holidayMusicBox = new HolidayMusicPlayer();
