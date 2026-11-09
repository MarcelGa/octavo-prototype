'use strict';

/* Chemistry · Inside the atom. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const CX = 150;
  const CY = 100;

  const ELEMENTS = [
    null,
    ['Hydrogen', 'H'], ['Helium', 'He'], ['Lithium', 'Li'], ['Beryllium', 'Be'], ['Boron', 'B'],
    ['Carbon', 'C'], ['Nitrogen', 'N'], ['Oxygen', 'O'], ['Fluorine', 'F'], ['Neon', 'Ne'],
  ];

  // Nucleus: protons (coral) and neutrons (grey) packed in a small cluster.
  function nucleus(p, n) {
    const total = p + n;
    let out = '';
    for (let i = 0; i < total; i++) {
      const ring = i === 0 ? 0 : i < 7 ? 1 : 2;
      const idx = i === 0 ? 0 : i < 7 ? i - 1 : i - 7;
      const count = ring === 1 ? 6 : 12;
      const rad = ring * 9;
      const ang = (idx / count) * Math.PI * 2 + ring;
      const x = CX + rad * Math.cos(ang);
      const y = CY + rad * Math.sin(ang);
      const isProton = i % 2 === 0 ? Math.floor(i / 2) < p : Math.floor(i / 2) >= n;
      out += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="${isProton ? '#FF7A59' : '#B8B4CC'}" stroke="#fff" stroke-width="1.5"/>`;
    }
    return out;
  }

  // Electrons on shells (2, then 8), each shell spinning.
  function shells(e, spin = true) {
    const inner = Math.min(e, 2);
    const outer = Math.max(0, e - 2);
    const shell = (count, r, dur, cls) => {
      let dots = '';
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        dots += `<circle cx="${(CX + r * Math.cos(a)).toFixed(1)}" cy="${(CY + r * Math.sin(a)).toFixed(1)}" r="6" fill="#3E63DD"/>`;
      }
      return `<circle cx="${CX}" cy="${CY}" r="${r}" fill="none" stroke="#30A46C" stroke-width="2" stroke-dasharray="4 5"/>
        <g class="${spin ? cls : ''}" style="transform-box: view-box; transform-origin: ${CX}px ${CY}px; animation-duration: ${dur}s">${dots}</g>`;
    };
    return shell(inner, 46, 5, 'a-spin') + (e > 2 ? shell(outer, 78, 9, 'a-spin-rev') : '');
  }

  const CARBON = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A carbon atom: a nucleus of 6 protons and 6 neutrons, with 2 electrons on the inner shell and 4 on the outer shell, orbiting.">
    ${shells(6)}${nucleus(6, 6)}
    <text x="252" y="40" ${T} font-size="12" fill="#1C6B45">Carbon</text>
    <g ${T} font-size="11">
      <circle cx="258" cy="128" r="6" fill="#FF7A59"/><text x="270" y="132" fill="#1E1A3C">proton</text>
      <circle cx="258" cy="148" r="6" fill="#B8B4CC"/><text x="270" y="152" fill="#1E1A3C">neutron</text>
      <circle cx="258" cy="168" r="6" fill="#3E63DD"/><text x="270" y="172" fill="#1E1A3C">electron</text>
    </g>
  </svg>`;

  const BUILD = `
  <svg viewBox="0 0 320 200" role="img" aria-label="An atom you can build: protons and electrons are added or removed with the buttons.">
    <g class="atom"></g>
    <rect x="236" y="54" width="72" height="84" rx="10" fill="#FFFFFF" stroke="#30A46C" stroke-width="3"/>
    <text class="el-num" x="246" y="72" ${T} font-size="12" fill="#1C6B45">6</text>
    <text class="el-sym" x="272" y="110" text-anchor="middle" ${T} font-size="32" fill="#1E1A3C">C</text>
    <text class="el-name" x="272" y="130" text-anchor="middle" ${T} font-size="10" fill="#4A4566">Carbon</text>
  </svg>`;

  const CHARGES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="The three particles: a proton with a plus charge, a neutron with no charge and an electron with a minus charge.">
    <g class="a-bob"><circle cx="60" cy="90" r="34" fill="#FF7A59"/><text x="60" y="102" text-anchor="middle" ${T} font-size="34" fill="#fff">+</text></g>
    <g class="a-bob" style="animation-delay: 0.6s"><circle cx="160" cy="90" r="34" fill="#B8B4CC"/><text x="160" y="102" text-anchor="middle" ${T} font-size="30" fill="#fff">0</text></g>
    <g class="a-bob" style="animation-delay: 1.2s"><circle cx="260" cy="90" r="22" fill="#3E63DD"/><text x="260" y="100" text-anchor="middle" ${T} font-size="28" fill="#fff">−</text></g>
    <g ${T} font-size="13" fill="#1E1A3C" text-anchor="middle"><text x="60" y="156">proton</text><text x="160" y="156">neutron</text><text x="260" y="156">electron</text></g>
    <g font-family="Nunito, sans-serif" font-size="11" fill="#4A4566" text-anchor="middle"><text x="60" y="174">in the nucleus</text><text x="160" y="174">in the nucleus</text><text x="260" y="174">tiny, whizzing around</text></g>
  </svg>`;

  window.Octavo.addCourse({
    id: 'atoms',
    subject: 'Chemistry',
    title: 'Atoms and elements',
    blurb: 'What everything is made of: protons, neutrons, electrons and the periodic table.',
    artBg: '#F3FBF6',
    units: [
      {
        title: 'Building blocks of matter',
        lessons: [
          {
            id: 'ch-atom',
            title: 'Inside the atom',
            minutes: 4,
            slides: [
              {
                title: 'Tiny, and mostly empty',
                art: CARBON,
                text: '<p>An atom has a dense <b>nucleus</b> of protons and neutrons in the middle, with <b>electrons</b> moving around it in shells. If the nucleus were a marble, the atom would be the size of a football stadium.</p>',
              },
              {
                title: 'Build an atom',
                art: BUILD,
                controls: `
                <div class="control">
                  <div class="stepper">
                    <button type="button" class="btn-chip p-minus" aria-label="Remove a proton">− proton</button>
                    <output class="p-out">6 protons</output>
                    <button type="button" class="btn-chip p-plus" aria-label="Add a proton">+ proton</button>
                  </div>
                  <output class="readout"></output>
                </div>`,
                text: '<p>The number of <b>protons</b> decides which element an atom is. Add or remove protons and watch the element change. (A neutral atom has as many electrons as protons.)</p>',
                setup(root) {
                  let p = 6;
                  const update = () => {
                    const [name, sym] = ELEMENTS[p];
                    const n = p === 1 ? 0 : p === 3 ? 4 : p === 4 ? 5 : p === 5 ? 6 : p === 9 ? 10 : p;
                    root.querySelector('.atom').innerHTML = shells(p) + nucleus(p, n);
                    root.querySelector('.el-num').textContent = p;
                    root.querySelector('.el-sym').textContent = sym;
                    root.querySelector('.el-name').textContent = name;
                    root.querySelector('.p-out').textContent = `${p} proton${p === 1 ? '' : 's'}`;
                    root.querySelector('.p-minus').disabled = p === 1;
                    root.querySelector('.p-plus').disabled = p === 10;
                    root.querySelector('.readout').innerHTML = `<b>${name} (${sym})</b>: ${p} proton${p === 1 ? '' : 's'}, ${n} neutron${n === 1 ? '' : 's'}, ${p} electron${p === 1 ? '' : 's'}`;
                  };
                  root.querySelector('.p-minus').addEventListener('click', () => { p = Math.max(1, p - 1); update(); });
                  root.querySelector('.p-plus').addEventListener('click', () => { p = Math.min(10, p + 1); update(); });
                  update();
                },
              },
              {
                title: 'Three particles, three charges',
                art: CHARGES,
                text: '<p><b>Protons</b> are positive (+), <b>neutrons</b> have no charge, and <b>electrons</b> are negative (−). Opposite charges attract, which keeps the electrons around the nucleus.</p>',
              },
              {
                title: 'Recap',
                points: [
                  'Atoms have a <b>nucleus</b> (protons + neutrons) and <b>electrons</b> around it.',
                  'The number of protons is the <b>atomic number</b>, and it decides the element.',
                  'Protons +, neutrons 0, electrons −.',
                  'The first electron shell holds 2 electrons, the next one holds 8.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'The number of protons in an atom decides…',
                options: ['which element it is', 'how big the atom is', 'its colour', 'whether it is a liquid'], answer: 'which element it is',
                explain: 'The proton count (atomic number) decides <b>which element</b> it is.', hint: 'what changed when you added protons?' },
              { type: 'choice', prompt: 'Which particle has a negative charge?',
                options: ['Electron', 'Proton', 'Neutron', 'Nucleus'], answer: 'Electron',
                explain: '<b>Electrons</b> are negative; protons are positive; neutrons are neutral.', hint: 'it’s the small blue one whizzing around.' },
              { type: 'choice', prompt: 'An atom has 6 protons. Which element is it?',
                options: ['Carbon', 'Oxygen', 'Helium', 'Neon'], answer: 'Carbon',
                explain: 'Atomic number 6 is <b>carbon</b>.', hint: 'it was the first atom in this lesson.' },
              { type: 'tf', prompt: 'True or false?', statement: 'The nucleus contains protons and electrons.', answer: false,
                explain: '<b>False.</b> The nucleus holds protons and <b>neutrons</b>; electrons are outside it.', hint: 'where were the blue dots?' },
            ],
          },
        ],
        soon: ['The periodic table', 'Chemical bonds'],
      },
    ],
    soonUnits: ['Reactions'],
  });
})();
