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

  // Note letter for display: Slovak names B as H (C D E F G A H).
  const nm = (n, lang) => (lang === 'sk' && n[0] === 'B' ? 'H' : n[0]);

  const lineNotes = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Notová osnova s husľovým kľúčom. Na piatich líniách sa postupne zdola nahor objavujú noty E, G, H, D, F.' : 'A treble staff. Notes appear one by one on the five lines, bottom to top: E, G, B, D, F.'}">
    ${LINES}${CLEF}
    ${['E4', 'G4', 'B4', 'D5', 'F5'].map((n, i) => note(110 + i * 42, n, { cls: 'a-reveal', delay: 0.3 + i * 0.5, label: nm(n, lang) })).join('')}
  </svg>`;

  const keysArt = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Notová osnova s husľovým kľúčom, ktorá ukazuje tón zahraný na klávesoch pod ňou.' : 'A treble staff showing the note you play on the keyboard below.'}">
    ${LINES}${CLEF}
    <g class="played"></g>
  </svg>`;

  const SCALE = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  const scaleArt = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Stupnica C dur: osem nôt stúpa krok za krokom nahor po osnove.' : 'The C major scale: eight notes climbing step by step up the staff.'}">
    ${LINES}${CLEF}
    <g class="scale-notes">${SCALE.map((n, i) => note(102 + i * 27, n, { cls: 'a-reveal', delay: 0.2 + i * 0.3 })).join('')}</g>
  </svg>`;

  const keysHtml = (lang) => `<div class="keys" role="group" aria-label="${lang === 'sk' ? 'Klávesy klavíra' : 'Piano keys'}">${SCALE.map((n) => `<button type="button" class="key" data-note="${n}">${nm(n, lang)}</button>`).join('')}</div>`;

  const quizNote = (lang) => `<svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Jedna nota na strednej línii notovej osnovy s husľovým kľúčom.' : 'A single note sitting on the middle line of the treble staff.'}">${LINES}${CLEF}${note(190, 'B4', { color: '#D6409F' })}</svg>`;

  window.Octavo.addCourse({
    id: 'notes',
    subject: 'Music',
    audience: 'adult',
    lecturer: 'mara',
    title: { en: 'Reading music', sk: 'Čítanie nôt' },
    blurb: { en: 'Learn the treble staff, hear every note and train your ear.', sk: 'Spoznaj notovú osnovu s husľovým kľúčom, vypočuj si každú notu a trénuj sluch.' },
    artBg: '#FFF7FB',
    units: [
      {
        title: { en: 'The staff', sk: 'Notová osnova' },
        lessons: [
          {
            id: 'mu-notes',
            title: { en: 'Notes on the staff', sk: 'Noty v notovej osnove' },
            minutes: 4,
            slides: [
              {
                title: { en: 'Five lines, many notes', sk: 'Päť línií, veľa nôt' },
                art: { en: lineNotes('en'), sk: lineNotes('sk') },
                text: {
                  en: '<p>Music is written on a <b>staff</b> of five lines. The swirly <b>treble clef</b> tells you which notes they are. From the bottom, the lines are <b>E, G, B, D, F</b>: “<b>E</b>very <b>G</b>ood <b>B</b>oy <b>D</b>oes <b>F</b>ine”.</p>',
                  sk: '<p>Hudba sa zapisuje do <b>notovej osnovy</b> s piatimi líniami. Zatočený <b>husľový kľúč</b> ti prezradí, ktoré tóny na nich ležia. Odspodu sú to línie <b>E, G, H, D, F</b>.</p>',
                },
              },
              {
                title: { en: 'Play and see', sk: 'Zahraj a pozri' },
                art: { en: keysArt('en'), sk: keysArt('sk') },
                controls: { en: keysHtml('en'), sk: keysHtml('sk') },
                text: {
                  en: '<p>Tap a key: you’ll hear the note and see where it sits on the staff. Middle C needs its own little extra line, called a ledger line.</p>',
                  sk: '<p>Ťukni na kláves: začuješ tón a uvidíš, kde leží v osnove. Jednočiarkované C potrebuje vlastnú malú líniu navyše, ktorá sa volá pomocná línia.</p>',
                },
                setup(root, api) {
                  const lang = api && api.lang === 'sk' ? 'sk' : 'en';
                  const played = root.querySelector('.played');
                  root.querySelectorAll('.key').forEach((k) => k.addEventListener('click', () => {
                    const n = k.dataset.note;
                    if (!api.tone([[NOTE[n], 0.6]])) api.toast(lang === 'sk' ? 'Zvuk nie je na tomto zariadení dostupný' : 'Audio isn’t available on this device');
                    played.innerHTML = note(190, n, { color: '#D6409F', label: n === 'C4' ? (lang === 'sk' ? 'c1' : 'middle C') : nm(n, lang), cls: 'a-reveal', delay: 0 });
                    root.querySelectorAll('.key').forEach((b) => b.classList.toggle('active', b === k));
                  }));
                },
              },
              {
                title: { en: 'Higher on the staff, higher in pitch', sk: 'Vyššie v osnove, vyšší tón' },
                art: { en: scaleArt('en'), sk: scaleArt('sk') },
                controls: {
                  en: '<div class="control"><button type="button" class="btn-chip scale-btn">Play the scale</button></div>',
                  sk: '<div class="control"><button type="button" class="btn-chip scale-btn">Zahraj stupnicu</button></div>',
                },
                text: {
                  en: '<p>Each step up the staff, from a line to the next space or from a space to the next line, is the next note up. These eight notes are the <b>C major scale</b>: C D E F G A B C.</p>',
                  sk: '<p>Každý krok nahor v osnove, z línie do najbližšej medzery alebo z medzery na najbližšiu líniu, je ďalší vyšší tón. Týchto osem nôt tvorí <b>stupnicu C dur</b>: C D E F G A H C.</p>',
                },
                setup(root, api) {
                  root.querySelector('.scale-btn').addEventListener('click', () => {
                    if (!api.tone(SCALE.map((n) => [NOTE[n], 0.32]))) { api.toast(api.lang === 'sk' ? 'Zvuk nie je na tomto zariadení dostupný' : 'Audio isn’t available on this device'); return; }
                    const g = root.querySelector('.scale-notes');
                    g.innerHTML = SCALE.map((n, i) => note(102 + i * 27, n, { cls: 'a-reveal', delay: i * 0.37 })).join('');
                  });
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: {
                  en: [
                    'The treble staff has five lines: <b>E G B D F</b> from the bottom.',
                    'The spaces spell <b>F A C E</b>.',
                    'Higher on the staff means a <b>higher</b> sound.',
                    'Middle C sits on a ledger line below the staff.',
                  ],
                  sk: [
                    'V husľovom kľúči má osnova päť línií: odspodu <b>E G H D F</b>.',
                    'V medzerách sú odspodu <b>F A C E</b>.',
                    'Vyššie v osnove znamená <b>vyšší</b> tón.',
                    'Jednočiarkované C (c1) leží na pomocnej línii pod osnovou.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'Listen. Is the second note higher or lower than the first?', sk: 'Počúvaj. Je druhý tón vyšší, alebo nižší ako prvý?' }, tones: [[NOTE.E4, 0.6], [0, 0.15], [NOTE.C5, 0.6]],
                options: { en: ['Higher', 'Lower', 'The same'], sk: ['Vyšší', 'Nižší', 'Rovnaký'] }, answer: { en: 'Higher', sk: 'Vyšší' },
                explain: { en: 'It jumped up from E to a <b>higher</b> C.', sk: 'Skočil z E nahor na <b>vyššie</b> C.' },
                hint: { en: 'play it again and hum along.', sk: 'pusti si to znova a pobruč si.' } },
              { type: 'choice', prompt: { en: 'The treble staff lines from the bottom are E, G, B, D, …', sk: 'Línie v husľovom kľúči sú odspodu E, G, H, D, …' },
                options: ['F', 'A', 'C', 'E'], answer: 'F',
                explain: { en: '<b>E</b>very <b>G</b>ood <b>B</b>oy <b>D</b>oes <b>F</b>ine.', sk: 'Odspodu: E, G, H, D, <b>F</b>.' },
                hint: { en: 'Every Good Boy Does…', sk: 'línie idú ob jeden tón: E, G, H, D, …' } },
              { type: 'choice', prompt: { en: 'Which note is this?', sk: 'Ktorá je to nota?' }, art: { en: quizNote('en'), sk: quizNote('sk') },
                options: { en: ['B', 'G', 'D', 'C'], sk: ['H', 'G', 'D', 'C'] }, answer: { en: 'B', sk: 'H' },
                explain: { en: 'It’s on the middle line: E, G, <b>B</b>.', sk: 'Leží na strednej línii: E, G, <b>H</b>.' },
                hint: { en: 'count the lines up from the bottom: E, G, …', sk: 'počítaj línie odspodu: E, G, …' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Notes written higher on the staff sound higher.', sk: 'Noty zapísané vyššie v osnove znejú vyššie.' }, answer: true,
                explain: { en: '<b>True.</b> Up the staff means up in pitch.', sk: '<b>Pravda.</b> Vyššie v osnove znamená vyšší tón.' },
                hint: { en: 'remember the scale climbing.', sk: 'spomeň si, ako stúpala stupnica.' } },
            ],
          },
        ],
        soon: { en: ['Rhythm and beats', 'Sharps and flats'], sk: ['Rytmus a doby', 'Krížiky a béčka'] },
      },
    ],
    soonUnits: { en: ['Chords'], sk: ['Akordy'] },
  });
})();
