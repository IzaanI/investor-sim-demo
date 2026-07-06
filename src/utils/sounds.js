/**
 * sounds.js — Centralized Web Audio API Sound Synthesizer
 * All sounds are synthesized programmatically. No audio files or external deps needed.
 */

let audioCtx = null;

// Global volume multiplier — adjust this to scale all sounds at once (0.0 – 1.0)
const MASTER_VOLUME = 0.5;

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Browsers suspend AudioContext until a user gesture — resume if needed
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Plays a single synthesized tone.
 * @param {number} frequency - Hz
 * @param {number} duration  - seconds
 * @param {OscillatorType} type - "sine" | "square" | "sawtooth" | "triangle"
 * @param {number} volume    - 0.0 – 1.0 peak gain
 * @param {number} startTime - seconds offset from now
 */
function playTone(frequency, duration, type = "sine", volume = 0.2, startTime = 0) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

    // Smooth attack → exponential decay
    gain.gain.setValueAtTime(0.001, ctx.currentTime + startTime);
    gain.gain.linearRampToValueAtTime(volume * MASTER_VOLUME, ctx.currentTime + startTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration + 0.02);
  } catch {
    // Silently fail — audio is non-critical
  }
}

// ─── Sound Definitions ───────────────────────────────────────────────────────

const sounds = {

  // Investing in a pitch — ascending chime (C4 → E4 → G4)
  invest() {
    playTone(261.63, 0.15, "sine", 0.22, 0.00);
    playTone(329.63, 0.15, "sine", 0.22, 0.10);
    playTone(392.00, 0.35, "sine", 0.28, 0.20);
  },

  // Passing on a pitch — soft descending drop
  pass() {
    playTone(392.00, 0.10, "sine", 0.16, 0.00);
    playTone(261.63, 0.22, "sine", 0.10, 0.10);
  },

  // End Turn — tight mechanical click then a neutral mid tone
  endTurn() {
    playTone(440, 0.04, "square", 0.06, 0.00);
    playTone(550, 0.22, "sine",   0.16, 0.05);
  },

  // Background check — scanning blip trio then confirmation
  backgroundCheck() {
    playTone(800,  0.05, "square", 0.10, 0.00);
    playTone(900,  0.05, "square", 0.10, 0.09);
    playTone(1000, 0.05, "square", 0.10, 0.18);
    playTone(800,  0.18, "sine",   0.16, 0.28);
  },

  // COI Check — similar to background check but slightly different cadence
  coiCheck() {
    playTone(700,  0.05, "square", 0.10, 0.00);
    playTone(850,  0.05, "square", 0.10, 0.09);
    playTone(950,  0.05, "square", 0.10, 0.18);
    playTone(700,  0.18, "sine",   0.14, 0.28);
  },

  // Queue exit on a holding — mechanical latch
  queueExit() {
    playTone(220, 0.05, "sawtooth", 0.10, 0.00);
    playTone(180, 0.14, "sine",     0.10, 0.06);
  },

  // Event modal appearing — notification ping
  eventModal() {
    playTone(660, 0.10, "sine", 0.20, 0.00);
    playTone(880, 0.22, "sine", 0.16, 0.12);
  },

  // Accepting a follow-on round
  acceptFollowOn() {
    playTone(329.63, 0.12, "sine", 0.20, 0.00);
    playTone(392.00, 0.12, "sine", 0.20, 0.12);
    playTone(523.25, 0.35, "sine", 0.26, 0.24);
  },

  // Declining a follow-on round — neutral, slightly downward
  declineFollowOn() {
    playTone(440, 0.12, "sine", 0.14, 0.00);
    playTone(350, 0.22, "sine", 0.10, 0.12);
  },

  // Buyout accepted — big ascending fanfare
  buyout() {
    playTone(261.63, 0.10, "sine", 0.20, 0.00);
    playTone(329.63, 0.10, "sine", 0.20, 0.09);
    playTone(392.00, 0.10, "sine", 0.20, 0.18);
    playTone(523.25, 0.10, "sine", 0.20, 0.27);
    playTone(659.25, 0.45, "sine", 0.30, 0.37);
  },

  // Opening the portfolio details modal
  modalOpen() {
    playTone(350, 0.10, "sine", 0.10, 0.00);
    playTone(600, 0.18, "sine", 0.14, 0.07);
  },

  // Closing the portfolio details modal
  modalClose() {
    playTone(600, 0.06, "sine", 0.10, 0.00);
    playTone(350, 0.14, "sine", 0.08, 0.06);
  },

  // Pinning a news card — crisp double-tap
  pinNews() {
    playTone(880,  0.05, "sine", 0.10, 0.00);
    playTone(1100, 0.10, "sine", 0.10, 0.07);
  },

  // Tutorial step advancing — soft ascending chime
  tutorialAdvance() {
    playTone(523.25, 0.12, "sine", 0.14, 0.00);
    playTone(659.25, 0.22, "sine", 0.14, 0.12);
  },

  // Liquidity crisis first detected — low warning drone
  liquidityCrisis() {
    playTone(100, 0.35, "sawtooth", 0.14, 0.00);
    playTone(80,  0.35, "sawtooth", 0.10, 0.38);
  },

  // Game Over / Bankruptcy — somber descending tones
  gameOver() {
    playTone(392.00, 0.32, "sine", 0.18, 0.00);
    playTone(329.63, 0.32, "sine", 0.18, 0.35);
    playTone(261.63, 0.32, "sine", 0.18, 0.70);
    playTone(196.00, 0.80, "sine", 0.18, 1.05);
  },

  // Demo Complete / Victory — short uplifting arpeggio
  victory() {
    playTone(261.63, 0.14, "sine", 0.20, 0.00);
    playTone(329.63, 0.14, "sine", 0.20, 0.12);
    playTone(392.00, 0.14, "sine", 0.20, 0.24);
    playTone(523.25, 0.14, "sine", 0.20, 0.36);
    playTone(659.25, 0.45, "sine", 0.26, 0.50);
  },

  // Company written off / failed
  companyFailed() {
    playTone(300, 0.22, "sine", 0.14, 0.00);
    playTone(200, 0.28, "sine", 0.12, 0.24);
    playTone(150, 0.55, "sine", 0.10, 0.55);
  },

  // Generic light UI click (used for misc buttons if needed)
  click() {
    playTone(700, 0.06, "sine", 0.10, 0.00);
  },

  // Typewriter speech tick — soft, randomized pitch so each tick feels
  // like a different syllable rather than a mechanical repeat
  tick() {
    // Randomize frequency in the 220–380 Hz range (low vocal register)
    const freq = 150 + Math.random() * 130;
    playTone(freq, 0.04, "triangle", 0.09, 0.00);
  },
};

export default sounds;
