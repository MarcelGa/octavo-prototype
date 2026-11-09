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
  function tone(sequence) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    audioCtx = audioCtx || new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    let t = audioCtx.currentTime + 0.05;
    for (const [freq, dur] of sequence) {
      if (freq) {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.3, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(t);
        osc.stop(t + dur + 0.05);
      }
      t += dur + 0.05;
    }
    return true;
  }

  const NOTE = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46,
  };

  return { courses, addCourse, speak, tone, NOTE };
})();
