// Web Audio API Sound Synthesizer - SILENT / MOOTED version
// Sound effects have been completely removed as requested.

class SoundEngine {
  private isMuted: boolean = true;

  setMuted(mute: boolean) {
    // Intentionally left blank as sounds are retired
  }

  getMuted(): boolean {
    return true;
  }

  playWhistle() {
    // Intentionally left blank
  }

  playFlip() {
    // Intentionally left blank
  }

  playGlue() {
    // Intentionally left blank
  }

  playPackOpen() {
    // Intentionally left blank
  }

  playCelebration() {
    // Intentionally left blank
  }

  startSambaDrumBeat() {
    // Intentionally left blank
  }

  stopSambaDrumBeat() {
    // Intentionally left blank
  }
}

export const SoundFX = new SoundEngine();
export default SoundFX;
