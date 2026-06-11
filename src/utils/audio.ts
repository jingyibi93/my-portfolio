/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * High-Fidelity Physics-Based Wood & Drawer Synthesis Engine.
 * Synthesizes organic wood sliding, creaking, and friction grain in real-time,
 * without transient impact hits or end drums/thuds.
 */

// Helper to create Brownian (Red) noise which contains much more low-end energy than white noise,
// providing an organic, heavy, earthy texture perfect for wood friction.
const createBrownianNoiseBuffer = (ctx: AudioContext, duration: number) => {
  const sampleRate = ctx.sampleRate;
  const bufferSize = sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Walk-based integration to yield Red/Brown noise (1/f^2)
    data[i] = (lastOut + (0.025 * white)) / 1.025;
    lastOut = data[i];
    data[i] *= 3.5; // Compensate for the low-pass attenuation
  }
  return buffer;
};

export const playDrawerSound = (type: 'pull' | 'push' | 'peek') => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    // Create and resume context securely
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const now = ctx.currentTime;

    if (type === 'pull') {
      // --- PULLING OPEN THE DRAWER (~0.85s action) ---
      const duration = 0.85;

      // 1. Organic Sliding Friction (Brownian Noise Filtered for wood rumbles)
      const brownBuffer = createBrownianNoiseBuffer(ctx, duration);
      const slideSource = ctx.createBufferSource();
      slideSource.buffer = brownBuffer;

      // Slide Resonance Filter (woody low-mid frequencies)
      const slideFilter = ctx.createBiquadFilter();
      slideFilter.type = 'bandpass';
      slideFilter.frequency.setValueAtTime(220, now);
      // As the pull starts, wood pitch is higher due to speed, then glides down as it slows
      slideFilter.frequency.exponentialRampToValueAtTime(140, now + duration - 0.05);
      slideFilter.Q.setValueAtTime(1.8, now);

      // Slide Gain with wood-grain uneven texture (micro-chatter)
      const slideGain = ctx.createGain();
      slideGain.gain.setValueAtTime(0, now);
      // Fast pull acceleration surge
      slideGain.gain.linearRampToValueAtTime(0.35, now + 0.15);
      // Gentle decay as speed steady-out
      slideGain.gain.linearRampToValueAtTime(0.18, now + 0.5);
      // Fade out completely without any impact
      slideGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Texture Modulator (LFO) to simulate wood-grain bumps and uneven friction
      const grainLFO = ctx.createOscillator();
      grainLFO.type = 'triangle';
      grainLFO.frequency.setValueAtTime(11, now); // 11Hz friction rumble bumps

      const grainLFOGain = ctx.createGain();
      grainLFOGain.gain.setValueAtTime(0.08, now); // modulation depth

      // Connect LFO to modulate slide gain
      grainLFO.connect(grainLFOGain);
      grainLFOGain.connect(slideGain.gain);

      slideSource.connect(slideFilter);
      slideFilter.connect(slideGain);
      slideGain.connect(ctx.destination);

      // 2. Resonant Wood "Creak" / Stiction
      // Simulates the natural binding sound of physical drawer sliders
      const creakOsc = ctx.createOscillator();
      creakOsc.type = 'triangle';
      creakOsc.frequency.setValueAtTime(290, now + 0.1);
      // Rapid pitch squeak glide
      creakOsc.frequency.exponentialRampToValueAtTime(210, now + 0.35);

      const creakFilter = ctx.createBiquadFilter();
      creakFilter.type = 'bandpass';
      creakFilter.frequency.setValueAtTime(250, now);
      creakFilter.Q.setValueAtTime(4.0, now); // highly resonant

      const creakGain = ctx.createGain();
      creakGain.gain.setValueAtTime(0, now);
      creakGain.gain.linearRampToValueAtTime(0.07, now + 0.18);
      creakGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      // Vibrato/tremolo for wood creak texture
      const creakVibrato = ctx.createOscillator();
      creakVibrato.type = 'sine';
      creakVibrato.frequency.setValueAtTime(22, now); // fast shutter
      const creakVibratoGain = ctx.createGain();
      creakVibratoGain.gain.setValueAtTime(40, now); // frequency offset depth

      creakVibrato.connect(creakVibratoGain);
      creakVibratoGain.connect(creakOsc.frequency);

      creakOsc.connect(creakFilter);
      creakFilter.connect(creakGain);
      creakGain.connect(ctx.destination);

      // Sequencer controls
      slideSource.start(now);
      grainLFO.start(now);
      creakOsc.start(now);
      creakVibrato.start(now);

      slideSource.stop(now + duration);
      grainLFO.stop(now + duration);
      creakOsc.stop(now + 0.4);
      creakVibrato.stop(now + 0.4);

    } else if (type === 'push') {
      // --- PUSHING CLOSED THE DRAWER (~0.6s action) ---
      const duration = 0.62;

      // 1. Friction slide (fades out gently toward the end instead of slamming)
      const brownBuffer = createBrownianNoiseBuffer(ctx, duration);
      const slideSource = ctx.createBufferSource();
      slideSource.buffer = brownBuffer;

      const slideFilter = ctx.createBiquadFilter();
      slideFilter.type = 'bandpass';
      slideFilter.frequency.setValueAtTime(150, now);
      slideFilter.frequency.exponentialRampToValueAtTime(240, now + duration);
      slideFilter.Q.setValueAtTime(1.5, now);

      const slideGain = ctx.createGain();
      slideGain.gain.setValueAtTime(0, now);
      slideGain.gain.linearRampToValueAtTime(0.28, now + 0.15);
      slideGain.gain.linearRampToValueAtTime(0.18, now + 0.45);
      slideGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      // Slide Wood-grain LFO
      const grainLFO = ctx.createOscillator();
      grainLFO.type = 'triangle';
      grainLFO.frequency.setValueAtTime(14, now);
      const grainLFOGain = ctx.createGain();
      grainLFOGain.gain.setValueAtTime(0.06, now);
      grainLFO.connect(grainLFOGain);
      grainLFOGain.connect(slideGain.gain);

      slideSource.connect(slideFilter);
      slideFilter.connect(slideGain);
      slideGain.connect(ctx.destination);

      // Sequencer controls
      slideSource.start(now);
      grainLFO.start(now);

      slideSource.stop(now + duration);
      grainLFO.stop(now + duration);

    } else if (type === 'peek') {
      // --- GENTLE MICRO HOVER TICK (~0.12s) ---
      const duration = 0.12;

      // Soft scraping brush
      const brownBuffer = createBrownianNoiseBuffer(ctx, duration);
      const brushSource = ctx.createBufferSource();
      brushSource.buffer = brownBuffer;

      const brushFilter = ctx.createBiquadFilter();
      brushFilter.type = 'bandpass';
      brushFilter.frequency.setValueAtTime(310, now);
      brushFilter.Q.setValueAtTime(2.2, now);

      const brushGain = ctx.createGain();
      brushGain.gain.setValueAtTime(0, now);
      brushGain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      brushGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      brushSource.connect(brushFilter);
      brushFilter.connect(brushGain);
      brushGain.connect(ctx.destination);

      // Warm tick oscillator
      const tick = ctx.createOscillator();
      tick.type = 'sine';
      tick.frequency.setValueAtTime(140, now);
      tick.frequency.exponentialRampToValueAtTime(65, now + duration);

      const tickGain = ctx.createGain();
      tickGain.gain.setValueAtTime(0, now);
      tickGain.gain.linearRampToValueAtTime(0.12, now + 0.02);
      tickGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      tick.connect(tickGain);
      tickGain.connect(ctx.destination);

      brushSource.start(now);
      tick.start(now);

      brushSource.stop(now + duration + 0.05);
      tick.stop(now + duration + 0.05);
    }
  } catch (error) {
    console.warn("Web Audio Context play back was blocked or not supported:", error);
  }
};

// ----------------- RETRO LO-FI PROCEDURAL SYNTHESIZER FOR GRAMOPHONE -----------------

// Soothing, cozy vintage lo-fi jazz chords
const LOFI_CHORDS = [
  [174.61, 261.63, 329.63, 440.00], // Fmaj7 (F3, C4, E4, A4)
  [261.63, 329.63, 392.00, 493.88], // Cmaj7 (C4, E4, G4, B4)
  [164.81, 246.94, 311.13, 392.00], // Em7 (E3, B3, D#4, G4)
  [220.00, 329.63, 392.00, 523.25]  // Am7 (A3, E4, G4, C5)
];

// Helper to create crackling mechanical vinyl pops and dusty micro-noise
const createVinylCrackleBuffer = (ctx: AudioContext) => {
  const sampleRate = ctx.sampleRate;
  const bufferSize = sampleRate * 3.5; // Loop every 3.5s to sound irregular
  const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
  const data = buffer.getChannelData(0);
  
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Walk integration to yield Red/Brownish hum noise
    data[i] = (lastOut + (0.015 * white)) / 1.015;
    lastOut = data[i];
    data[i] *= 0.12; // Base warm atmospheric hum level
    
    // Add distinct dust/scuffs (ticks and pops)
    if (Math.random() < 0.00028) {
      const impulse = (Math.random() * 2 - 1) * 0.42;
      data[i] += impulse;
      // Soft-ring resonant tail simulation for dust contact
      if (i < bufferSize - 12) {
        data[i + 1] -= impulse * 0.45;
        data[i + 2] += impulse * 0.22;
        data[i + 4] -= impulse * 0.1;
      }
    }
  }
  return buffer;
};

// Synthesize a lush nostalgic E-Piano chord with warm lowpass & wow-flutter tape vibrato
const triggerLofiChord = (ctx: AudioContext, frequencies: number[], time: number) => {
  // Master mix level for chords to be soft background support
  const chordVol = ctx.createGain();
  chordVol.gain.setValueAtTime(0.18, time);
  chordVol.connect(ctx.destination);

  frequencies.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    osc.type = 'triangle'; // Smooth base waveform

    // Humanize chord arpeggiation stagger
    const noteStart = time + (idx * 0.05);

    // Warm vintage lowpass filter to shave off digital bite
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(480, noteStart);
    lowpass.frequency.exponentialRampToValueAtTime(320, noteStart + 3.0);

    // Dynamic ADSR-like gain envelope (soft swelling attack, slow decay)
    const ampEnv = ctx.createGain();
    ampEnv.gain.setValueAtTime(0, noteStart);
    ampEnv.gain.linearRampToValueAtTime(0.08, noteStart + 0.16);
    ampEnv.gain.linearRampToValueAtTime(0.04, noteStart + 0.85);
    ampEnv.gain.exponentialRampToValueAtTime(0.0001, noteStart + 3.4);

    // LFO to modulate oscillator frequency (pitch) to simulate a rotating vintage vinyl / warbling tape cassette
    const lfo = ctx.createOscillator();
    lfo.frequency.setValueAtTime(4.2, noteStart); // HZ rate of wow-flutter wobble
    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(3.8, noteStart);  // Detune variance depth
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    // Base pitch offset with micro-human tuning detune offset
    osc.frequency.setValueAtTime(freq + (Math.random() * 0.6 - 0.3), noteStart);

    osc.connect(lowpass);
    lowpass.connect(ampEnv);
    ampEnv.connect(chordVol);

    lfo.start(noteStart);
    osc.start(noteStart);

    lfo.stop(noteStart + 3.6);
    osc.stop(noteStart + 3.6);
  });
};

// Procedural plucked melodic droplets with soft high-Q frequency resonances and stereo echoes
const triggerMelodyPluck = (ctx: AudioContext, freq: number, time: number, amplitude = 0.055) => {
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(freq, time);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, time);
  gain.gain.linearRampToValueAtTime(amplitude, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

  // Creative delay/echo module
  const delay = ctx.createDelay();
  delay.delayTime.setValueAtTime(0.25, time); // 250ms interval echo
  
  const delayGain = ctx.createGain();
  delayGain.gain.setValueAtTime(0.24, time); // decay feedback multiplier

  osc.connect(gain);
  gain.connect(ctx.destination);

  // Cross-feedback bridge
  gain.connect(delay);
  delay.connect(delayGain);
  delayGain.connect(delay);
  delayGain.connect(ctx.destination);

  osc.start(time);
  osc.stop(time + 2.0);
};

class GramophoneMusicEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: any = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private noiseGain: GainNode | null = null;
  private currentChordIdx = 0;

  start() {
    if (this.isPlaying) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.isPlaying = true;
      const now = this.ctx.currentTime;

      // 1. Ignite warm Vinyl Crackle background Hiss loops
      const crackleBuffer = createVinylCrackleBuffer(this.ctx);
      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = crackleBuffer;
      this.noiseNode.loop = true;

      this.noiseGain = this.ctx.createGain();
      // Extremely subtle, cozy lounge room texture
      this.noiseGain.gain.setValueAtTime(0.05, now);

      this.noiseNode.connect(this.noiseGain);
      this.noiseGain.connect(this.ctx.destination);
      this.noiseNode.start(now);

      // Trigger chord progression and melody immediately
      this.playBeatAndSchedule();
      
      // 2. Schedule procedural cycles every 4.0 seconds (4 bars / 4 beats phrase rhythm)
      this.intervalId = setInterval(() => {
        this.playBeatAndSchedule();
      }, 4000);

    } catch (err) {
      console.warn("Unable to start procedural gramophone synthesiser:", err);
    }
  }

  private playBeatAndSchedule() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    // A. Trigger current warm Rhodes/Vibes chord
    const chordFrequencies = LOFI_CHORDS[this.currentChordIdx];
    triggerLofiChord(this.ctx, chordFrequencies, now);

    // B. Schedule delicate cascading melody plucks based on Pentatonic scales (A minor pentatonic: C-D-E-G-A)
    const scale1 = [523.25, 587.33, 659.25, 783.99, 880.00]; // C5, D5, E5, G5, A5
    const scale2 = [392.00, 440.00, 523.25, 587.33, 659.25]; // G4, A4, C5, D5, E5

    // Note 1: Played at 1.25s offset
    const n1 = scale1[Math.floor(Math.random() * scale1.length)];
    triggerMelodyPluck(this.ctx, n1, now + 1.25, 0.055);

    // Note 2: 70% chance of a lingering note at 2.1s offset
    if (Math.random() < 0.7) {
      const n2 = scale2[Math.floor(Math.random() * scale2.length)];
      triggerMelodyPluck(this.ctx, n2, now + 2.10, 0.045);
    }

    // Note 3: 45% chance of a high resolution chime droplet at 2.9s offset
    if (Math.random() < 0.45) {
      const n3 = scale1[Math.floor(Math.random() * scale1.length)];
      triggerMelodyPluck(this.ctx, n3 * 1.5, now + 2.90, 0.035);
    }

    // Move to next chord in the lo-fi loop
    this.currentChordIdx = (this.currentChordIdx + 1) % LOFI_CHORDS.length;
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
      } catch (e) {}
      this.noiseNode = null;
    }
    if (this.ctx) {
      try {
        this.ctx.close();
      } catch (e) {}
      this.ctx = null;
    }
  }

  getActiveState() {
    return this.isPlaying;
  }
}

let activeMusicEngine: GramophoneMusicEngine | null = null;

export const startGramophone = () => {
  if (typeof window === 'undefined') return;
  if (!activeMusicEngine) {
    activeMusicEngine = new GramophoneMusicEngine();
  }
  activeMusicEngine.start();
};

export const stopGramophone = () => {
  if (activeMusicEngine) {
    activeMusicEngine.stop();
  }
};

export const isGramophoneActive = () => {
  if (activeMusicEngine) {
    return activeMusicEngine.getActiveState();
  }
  return false;
};

