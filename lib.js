'use strict';

/* Shared helpers and the course registry. Content files (content/*.js) call
   Octavo.addCourse(...) and app.js reads Octavo.courses. */

window.Octavo = (() => {
  const courses = [];
  let audioCtx = null;

  function addCourse(course) {
    courses.push(course);
  }

  // Text-to-speech for language lessons. Returns false when the device can't speak.
  function speak(text, lang = 'es-ES') {
    if (!('speechSynthesis' in window)) return false;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.85;
    const prefix = lang.slice(0, 2).toLowerCase();
    const voice = synth.getVoices().find((v) => (v.lang || '').toLowerCase().startsWith(prefix));
    if (voice) u.voice = voice;
    synth.speak(u);
    return true;
  }

  // Plays a sequence of [frequencyHz, seconds] pairs. A frequency of 0 is a rest.
  // opts: type (oscillator shape), gain (volume 0..1), gap (seconds between notes).
  function tone(sequence, opts = {}) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    const { type = 'triangle', gain: volume = 0.3, gap = 0.05 } = opts;
    audioCtx = audioCtx || new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    let t = audioCtx.currentTime + 0.03;
    for (const [freq, dur] of sequence) {
      if (freq) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(volume, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + dur + 0.05);
      }
      t += dur + gap;
    }
    return true;
  }

  const NOTE = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, C6: 1046.5,
  };

  // Short game-style sound effects for the quiz.
  const SFX = {
    tap: { seq: [[880, 0.05]], type: 'sine', gain: 0.07, gap: 0 },
    correct: { seq: [[NOTE.C5, 0.08], [NOTE.E5, 0.08], [NOTE.G5, 0.08], [NOTE.C6, 0.26]], type: 'triangle', gain: 0.22, gap: 0.01 },
    combo: { seq: [[NOTE.E5, 0.07], [NOTE.G5, 0.07], [NOTE.C6, 0.07], [1318.5, 0.28]], type: 'triangle', gain: 0.2, gap: 0.01 },
    wrong: { seq: [[196, 0.13], [146.83, 0.32]], type: 'square', gain: 0.06, gap: 0.02 },
    complete: {
      seq: [[NOTE.C5, 0.1], [NOTE.E5, 0.1], [NOTE.G5, 0.1], [NOTE.C6, 0.14], [0, 0.04], [NOTE.G5, 0.1], [NOTE.C6, 0.45]],
      type: 'triangle', gain: 0.22, gap: 0.02,
    },
  };
  function sfx(name) {
    const s = SFX[name];
    return s ? tone(s.seq, s) : false;
  }

  return { courses, addCourse, speak, tone, sfx, NOTE };
})();
