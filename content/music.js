'use strict';

/* Music · Reading notes on the treble staff. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const { NOTE } = window.Octavo;

  // Treble staff: bottom line E4 at y=140, each step (line or space) is 10px.
  const STEPS = { C4: 0, D4: 1, E4: 2, F4: 3, G4: 4, A4: 5, B4: 6, C5: 7, D5: 8, E5: 9, F5: 10 };
  const yOf = (name) => 160 - STEPS[name] * 10;
  const LINES = `<g stroke="#1E1A3C" stroke-width="2">${[60, 80, 100, 120, 140].map((y) => `<path d="M20 ${y} H300"/>`).join('')}</g>`;
  // Hand-drawn treble clef (a font glyph isn't available on every phone).
  const CLEF = `<path d="M50 172 C 42 178 32 170 38 162 C 42 156 50 160 48 166 M48 168 C 52 120 56 70 58 40 C 59 22 74 24 70 40 C 66 58 30 76 30 108 C 30 136 72 138 72 114 C 72 94 44 94 44 112 C 44 122 56 124 58 116" fill="none" stroke="#962A6E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;

  function note(x, name, opts = {}) {
    const y = yOf(name);
    const up = STEPS[name] < 6;
    const ledger = name === 'C4' ? `<path d="M${x - 16} ${y} H${x + 16}" stroke="#1E1A3C" stroke-width="2"/>` : '';
    const cls = opts.cls ? ` class="${opts.cls}"` : '';
    const style = opts.delay !== undefined ? ` style="animation-delay: ${opts.delay}s"` : '';
    return `<g${cls}${style}>${ledger}
      <ellipse cx="${x}" cy="${y}" rx="10" ry="7.5" transform="rotate(-20 ${x} ${y})" fill="${opts.color || '#1E1A3C'}"/>
      <path d="M${up ? x + 9 : x - 9} ${y} V${up ? y - 46 : y + 46}" stroke="${opts.color || '#1E1A3C'}" stroke-width="2.5"/>
      ${opts.label ? `<text x="${x}" y="190" text-anchor="middle" ${T} font-size="14" fill="${opts.color || '#962A6E'}">${opts.label}</text>` : ''}
    </g>`;
  }

  const LINE_NOTES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A treble staff. Notes appear one by one on the five lines, bottom to top: E, G, B, D, F.">
    ${LINES}${CLEF}
    ${['E4', 'G4', 'B4', 'D5', 'F5'].map((n, i) => note(110 + i * 42, n, { cls: 'a-reveal', delay: 0.3 + i * 0.5, label: n[0] })).join('')}
  </svg>`;

  const KEYS_ART = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A treble staff showing the note you play on the keyboard below.">
    ${LINES}${CLEF}
    <g class="played"></g>
  </svg>`;

  const SCALE = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  const SCALE_ART = `
  <svg viewBox="0 0 320 200" role="img" aria-label="The C major scale: eight notes climbing step by step up the staff.">
    ${LINES}${CLEF}
    <g class="scale-notes">${SCALE.map((n, i) => note(102 + i * 27, n, { cls: 'a-reveal', delay: 0.2 + i * 0.3 })).join('')}</g>
  </svg>`;

  const QUIZ_NOTE = `<svg viewBox="0 0 320 200" role="img" aria-label="A single note sitting on the middle line of the treble staff.">${LINES}${CLEF}${note(190, 'B4', { color: '#D6409F' })}</svg>`;

  window.Octavo.addCourse({
    id: 'notes',
    subject: 'Music',
    title: 'Reading music',
    blurb: 'Learn the treble staff, hear every note and train your ear.',
    artBg: '#FFF7FB',
    units: [
      {
        title: 'The staff',
        lessons: [
          {
            id: 'mu-notes',
            title: 'Notes on the staff',
            minutes: 4,
            slides: [
              {
                title: 'Five lines, many notes',
                art: LINE_NOTES,
                text: '<p>Music is written on a <b>staff</b> of five lines. The swirly <b>treble clef</b> tells you which notes they are. From the bottom, the lines are <b>E, G, B, D, F</b>: “<b>E</b>very <b>G</b>ood <b>B</b>oy <b>D</b>oes <b>F</b>ine”.</p>',
              },
              {
                title: 'Play and see',
                art: KEYS_ART,
                controls: `<div class="keys" role="group" aria-label="Piano keys">${SCALE.map((n) => `<button type="button" class="key" data-note="${n}">${n[0]}</button>`).join('')}</div>`,
                text: '<p>Tap a key: you’ll hear the note and see where it sits on the staff. Middle C needs its own little extra line, called a ledger line.</p>',
                setup(root, api) {
                  const played = root.querySelector('.played');
                  root.querySelectorAll('.key').forEach((k) => k.addEventListener('click', () => {
                    const n = k.dataset.note;
                    if (!api.tone([[NOTE[n], 0.6]])) api.toast('Audio isn’t available on this device');
                    played.innerHTML = note(190, n, { color: '#D6409F', label: n === 'C4' ? 'middle C' : n[0], cls: 'a-reveal', delay: 0 });
                    root.querySelectorAll('.key').forEach((b) => b.classList.toggle('active', b === k));
                  }));
                },
              },
              {
                title: 'Higher on the staff, higher in pitch',
                art: SCALE_ART,
                controls: '<div class="control"><button type="button" class="btn-chip scale-btn">Play the scale</button></div>',
                text: '<p>Each step up the staff, from a line to the next space or from a space to the next line, is the next note up. These eight notes are the <b>C major scale</b>: C D E F G A B C.</p>',
                setup(root, api) {
                  root.querySelector('.scale-btn').addEventListener('click', () => {
                    if (!api.tone(SCALE.map((n) => [NOTE[n], 0.32]))) { api.toast('Audio isn’t available on this device'); return; }
                    const g = root.querySelector('.scale-notes');
                    g.innerHTML = SCALE.map((n, i) => note(102 + i * 27, n, { cls: 'a-reveal', delay: i * 0.37 })).join('');
                  });
                },
              },
              {
                title: 'Recap',
                points: [
                  'The treble staff has five lines: <b>E G B D F</b> from the bottom.',
                  'The spaces spell <b>F A C E</b>.',
                  'Higher on the staff means a <b>higher</b> sound.',
                  'Middle C sits on a ledger line below the staff.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Listen. Is the second note higher or lower than the first?', tones: [[NOTE.E4, 0.6], [0, 0.15], [NOTE.C5, 0.6]],
                options: ['Higher', 'Lower', 'The same'], answer: 'Higher',
                explain: 'It jumped up from E to a <b>higher</b> C.', hint: 'play it again and hum along.' },
              { type: 'choice', prompt: 'The treble staff lines from the bottom are E, G, B, D, …',
                options: ['F', 'A', 'C', 'E'], answer: 'F',
                explain: '<b>E</b>very <b>G</b>ood <b>B</b>oy <b>D</b>oes <b>F</b>ine.', hint: 'Every Good Boy Does…' },
              { type: 'choice', prompt: 'Which note is this?', art: QUIZ_NOTE,
                options: ['B', 'G', 'D', 'C'], answer: 'B',
                explain: 'It’s on the middle line: E, G, <b>B</b>.', hint: 'count the lines up from the bottom: E, G, …' },
              { type: 'tf', prompt: 'True or false?', statement: 'Notes written higher on the staff sound higher.', answer: true,
                explain: '<b>True.</b> Up the staff means up in pitch.', hint: 'remember the scale climbing.' },
            ],
          },
        ],
        soon: ['Rhythm and beats', 'Sharps and flats'],
      },
    ],
    soonUnits: ['Chords'],
  });
})();
