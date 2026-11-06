/**
 * Web Audio API Sound Synthesizer for Buddhist Sacred Places
 * 100% procedural audio: Tibetan singing bowls, temple bells, meditation drone, chimes.
 * Zero external 404 dependencies.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private isMuted: boolean = false;
  private ambientVolume: number = 0.4;
  private sfxVolume: number = 0.6;
  private isDroneRunning: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1.0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(this.sfxVolume, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);

      this.droneGain = this.ctx.createGain();
      this.droneGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.droneGain.connect(this.masterGain);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolumes(ambient: number, sfx: number, muted: boolean) {
    this.ambientVolume = ambient;
    this.sfxVolume = sfx;
    this.isMuted = muted;

    if (this.masterGain && this.ctx) {
      const targetGain = muted ? 0 : 1;
      this.masterGain.gain.linearRampToValueAtTime(targetGain, this.ctx.currentTime + 0.1);
    }
    if (this.droneGain && this.ctx && this.isDroneRunning) {
      this.droneGain.gain.linearRampToValueAtTime(muted ? 0 : this.ambientVolume * 0.25, this.ctx.currentTime + 0.1);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.linearRampToValueAtTime(muted ? 0 : this.sfxVolume, this.ctx.currentTime + 0.1);
    }
  }

  /**
   * Resonant Tibetan Singing Bowl chime
   */
  public playSingingBowl(freq = 261.63) { // Middle C or D#
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const harmonics = [
      { f: freq, gain: 0.6, decay: 4.5 },
      { f: freq * 2.76, gain: 0.35, decay: 3.2 },
      { f: freq * 5.4, gain: 0.15, decay: 2.1 },
      { f: freq * 8.9, gain: 0.05, decay: 1.2 }
    ];

    harmonics.forEach(h => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(h.f, t);

      // Subtle pitch bend mimics physical singing bowl strike
      osc.frequency.exponentialRampToValueAtTime(h.f * 0.998, t + h.decay);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.exponentialRampToValueAtTime(h.gain * this.sfxVolume, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + h.decay);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(t);
      osc.stop(t + h.decay + 0.1);
    });
  }

  /**
   * High-pitch Bronze Temple Bell
   */
  public playTempleBell() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const baseFreq = 880; // A5 note

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, t);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(baseFreq * 1.5, t);

    gain.gain.setValueAtTime(0.3 * this.sfxVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.5);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.sfxGain);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 2.6);
    osc2.stop(t + 2.6);
  }

  /**
   * Ambient Peaceful Temple Drone (Gentle continuous tone)
   */
  public startMeditationDrone() {
    this.initContext();
    if (!this.ctx || !this.droneGain || this.isDroneRunning) return;

    const t = this.ctx.currentTime;
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc2 = this.ctx.createOscillator();

    // 136.1 Hz = Om frequency / cosmic octave (C#3)
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(136.1, t);

    // Warm fifth overtone
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(204.15, t);

    // Gentle low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, t);

    this.droneOsc1.connect(filter);
    this.droneOsc2.connect(filter);
    filter.connect(this.droneGain);

    this.droneGain.gain.setValueAtTime(0.001, t);
    this.droneGain.gain.exponentialRampToValueAtTime(this.isMuted ? 0 : this.ambientVolume * 0.2, t + 3.0);

    this.droneOsc1.start();
    this.droneOsc2.start();
    this.isDroneRunning = true;
  }

  public stopMeditationDrone() {
    if (!this.isDroneRunning || !this.ctx || !this.droneGain) return;
    const t = this.ctx.currentTime;
    this.droneGain.gain.linearRampToValueAtTime(0.0001, t + 1.5);
    setTimeout(() => {
      try {
        this.droneOsc1?.stop();
        this.droneOsc2?.stop();
        this.droneOsc1?.disconnect();
        this.droneOsc2?.disconnect();
      } catch {
        // already stopped
      }
      this.isDroneRunning = false;
    }, 1600);
  }

  /**
   * Footstep on flagstone / dirt
   */
  public playFootstep() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90 + Math.random() * 20, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.08);

    gain.gain.setValueAtTime(0.08 * this.sfxVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.09);
  }

  /**
   * Discovery / Lamp lighting chime
   */
  public playDiscoveryChime() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C - E - G - C arpeggio

    notes.forEach((freq, idx) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + idx * 0.09);

      gain.gain.setValueAtTime(0.001, t + idx * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.2 * this.sfxVolume, t + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + idx * 0.09 + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(t + idx * 0.09);
      osc.stop(t + idx * 0.09 + 0.85);
    });
  }

  /**
   * Quest completion fanfare
   */
  public playQuestCompleteFanfare() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    // Pentatonic triumph
    const sequence = [
      { f: 440, delay: 0 },
      { f: 554.37, delay: 0.12 },
      { f: 659.25, delay: 0.24 },
      { f: 880, delay: 0.4 },
      { f: 1108.73, delay: 0.6 }
    ];

    sequence.forEach(s => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(s.f, t + s.delay);

      gain.gain.setValueAtTime(0.01, t + s.delay);
      gain.gain.exponentialRampToValueAtTime(0.25 * this.sfxVolume, t + s.delay + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + s.delay + 0.9);

      osc.connect(gain);
      gain.connect(this.sfxGain!);

      osc.start(t + s.delay);
      osc.stop(t + s.delay + 0.95);
    });
  }

  /**
   * UI Click
   */
  public playClick() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(200, t + 0.03);

    gain.gain.setValueAtTime(0.12 * this.sfxVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(t);
    osc.stop(t + 0.035);
  }

  public playQuizCorrect() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const t = this.ctx.currentTime;
    [587.33, 880].forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.12);
      gain.gain.setValueAtTime(0.18 * this.sfxVolume, t + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.5);
      osc.connect(gain);
      gain.connect(this.sfxGain!);
      osc.start(t + i * 0.12);
      osc.stop(t + i * 0.12 + 0.55);
    });
  }

  public playQuizIncorrect() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(160, t + 0.25);
    gain.gain.setValueAtTime(0.12 * this.sfxVolume, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(t);
    osc.stop(t + 0.26);
  }
}

export const soundManager = new SoundEngine();
