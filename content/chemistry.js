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
  // Slovak element names, same order as ELEMENTS.
  const ELEMENTS_SK = [null, 'Vodík', 'Hélium', 'Lítium', 'Berýlium', 'Bór', 'Uhlík', 'Dusík', 'Kyslík', 'Fluór', 'Neón'];
  // Slovak plural: 1 protón, 2–4 protóny, 0 / 5+ protónov.
  const skPl = (n, one, few, many) => (n === 1 ? one : n >= 2 && n <= 4 ? few : many);

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

  const CARBON_TXT = {
    en: { aria: 'A carbon atom: a nucleus of 6 protons and 6 neutrons, with 2 electrons on the inner shell and 4 on the outer shell, orbiting.', name: 'Carbon', p: 'proton', n: 'neutron', e: 'electron' },
    sk: { aria: 'Atóm uhlíka: jadro so 6 protónmi a 6 neutrónmi, okolo krúžia 2 elektróny na vnútornej vrstve a 4 na vonkajšej.', name: 'Uhlík', p: 'protón', n: 'neutrón', e: 'elektrón' },
  };
  const carbon = (lang) => {
    const L = CARBON_TXT[lang];
    return `
  <svg viewBox="0 0 320 200" role="img" aria-label="${L.aria}">
    ${shells(6)}${nucleus(6, 6)}
    <text x="252" y="40" ${T} font-size="12" fill="#1C6B45">${L.name}</text>
    <g ${T} font-size="11">
      <circle cx="258" cy="128" r="6" fill="#FF7A59"/><text x="270" y="132" fill="#1E1A3C">${L.p}</text>
      <circle cx="258" cy="148" r="6" fill="#B8B4CC"/><text x="270" y="152" fill="#1E1A3C">${L.n}</text>
      <circle cx="258" cy="168" r="6" fill="#3E63DD"/><text x="270" y="172" fill="#1E1A3C">${L.e}</text>
    </g>
  </svg>`;
  };

  const build = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Atóm, ktorý si môžeš poskladať: tlačidlami pridávaš alebo uberáš protóny a elektróny.' : 'An atom you can build: protons and electrons are added or removed with the buttons.'}">
    <g class="atom"></g>
    <rect x="236" y="54" width="72" height="84" rx="10" fill="#FFFFFF" stroke="#30A46C" stroke-width="3"/>
    <text class="el-num" x="246" y="72" ${T} font-size="12" fill="#1C6B45">6</text>
    <text class="el-sym" x="272" y="110" text-anchor="middle" ${T} font-size="32" fill="#1E1A3C">C</text>
    <text class="el-name" x="272" y="130" text-anchor="middle" ${T} font-size="10" fill="#4A4566">${lang === 'sk' ? 'Uhlík' : 'Carbon'}</text>
  </svg>`;

  const CHARGES_TXT = {
    en: { aria: 'The three particles: a proton with a plus charge, a neutron with no charge and an electron with a minus charge.', p: 'proton', n: 'neutron', e: 'electron', inNuc: 'in the nucleus', tiny: 'tiny, whizzing around' },
    sk: { aria: 'Tri častice: protón s kladným nábojom, neutrón bez náboja a elektrón so záporným nábojom.', p: 'protón', n: 'neutrón', e: 'elektrón', inNuc: 'v jadre', tiny: 'drobný, krúži okolo' },
  };
  const charges = (lang) => {
    const L = CHARGES_TXT[lang];
    return `
  <svg viewBox="0 0 320 200" role="img" aria-label="${L.aria}">
    <g class="a-bob"><circle cx="60" cy="90" r="34" fill="#FF7A59"/><text x="60" y="102" text-anchor="middle" ${T} font-size="34" fill="#fff">+</text></g>
    <g class="a-bob" style="animation-delay: 0.6s"><circle cx="160" cy="90" r="34" fill="#B8B4CC"/><text x="160" y="102" text-anchor="middle" ${T} font-size="30" fill="#fff">0</text></g>
    <g class="a-bob" style="animation-delay: 1.2s"><circle cx="260" cy="90" r="22" fill="#3E63DD"/><text x="260" y="100" text-anchor="middle" ${T} font-size="28" fill="#fff">−</text></g>
    <g ${T} font-size="13" fill="#1E1A3C" text-anchor="middle"><text x="60" y="156">${L.p}</text><text x="160" y="156">${L.n}</text><text x="260" y="156">${L.e}</text></g>
    <g font-family="Nunito, sans-serif" font-size="11" fill="#4A4566" text-anchor="middle"><text x="60" y="174">${L.inNuc}</text><text x="160" y="174">${L.inNuc}</text><text x="260" y="174">${L.tiny}</text></g>
  </svg>`;
  };

  window.Octavo.addCourse({
    id: 'atoms',
    subject: 'Chemistry',
    audience: 'adult',
    lecturer: 'novak',
    title: { en: 'Atoms and elements', sk: 'Atómy a prvky' },
    blurb: { en: 'What everything is made of: protons, neutrons, electrons and the periodic table.', sk: 'Z čoho je všetko zložené: protóny, neutróny, elektróny a periodická tabuľka.' },
    artBg: '#F3FBF6',
    units: [
      {
        title: { en: 'Building blocks of matter', sk: 'Stavebné kamene hmoty' },
        lessons: [
          {
            id: 'ch-atom',
            title: { en: 'Inside the atom', sk: 'Vnútri atómu' },
            minutes: 4,
            slides: [
              {
                title: { en: 'Tiny, and mostly empty', sk: 'Drobný a skoro prázdny' },
                art: { en: carbon('en'), sk: carbon('sk') },
                text: {
                  en: '<p>An atom has a dense <b>nucleus</b> of protons and neutrons in the middle, with <b>electrons</b> moving around it in shells. If the nucleus were a marble, the atom would be the size of a football stadium.</p>',
                  sk: '<p>Atóm má v strede husté <b>jadro</b> z protónov a neutrónov a okolo neho sa vo vrstvách pohybujú <b>elektróny</b>. Keby bolo jadro veľké ako guľôčka, celý atóm by bol veľký ako futbalový štadión.</p>',
                },
              },
              {
                title: { en: 'Build an atom', sk: 'Poskladaj atóm' },
                art: { en: build('en'), sk: build('sk') },
                controls: {
                  en: `
                <div class="control">
                  <div class="stepper">
                    <button type="button" class="btn-chip p-minus" aria-label="Remove a proton">− proton</button>
                    <output class="p-out">6 protons</output>
                    <button type="button" class="btn-chip p-plus" aria-label="Add a proton">+ proton</button>
                  </div>
                  <output class="readout"></output>
                </div>`,
                  sk: `
                <div class="control">
                  <div class="stepper">
                    <button type="button" class="btn-chip p-minus" aria-label="Uber protón">− protón</button>
                    <output class="p-out">6 protónov</output>
                    <button type="button" class="btn-chip p-plus" aria-label="Pridaj protón">+ protón</button>
                  </div>
                  <output class="readout"></output>
                </div>`,
                },
                text: {
                  en: '<p>The number of <b>protons</b> decides which element an atom is. Add or remove protons and watch the element change. (A neutral atom has as many electrons as protons.)</p>',
                  sk: '<p>Počet <b>protónov</b> určuje, o aký prvok ide. Pridávaj alebo uberaj protóny a sleduj, ako sa prvok mení. (Neutrálny atóm má rovnako veľa elektrónov ako protónov.)</p>',
                },
                setup(root, api) {
                  const sk = !!api && api.lang === 'sk';
                  let p = 6;
                  const update = () => {
                    const [enName, sym] = ELEMENTS[p];
                    const name = sk ? ELEMENTS_SK[p] : enName;
                    const n = p === 1 ? 0 : p === 3 ? 4 : p === 4 ? 5 : p === 5 ? 6 : p === 9 ? 10 : p;
                    root.querySelector('.atom').innerHTML = shells(p) + nucleus(p, n);
                    root.querySelector('.el-num').textContent = p;
                    root.querySelector('.el-sym').textContent = sym;
                    root.querySelector('.el-name').textContent = name;
                    root.querySelector('.p-minus').disabled = p === 1;
                    root.querySelector('.p-plus').disabled = p === 10;
                    if (sk) {
                      root.querySelector('.p-out').textContent = `${p} ${skPl(p, 'protón', 'protóny', 'protónov')}`;
                      root.querySelector('.readout').innerHTML = `<b>${name} (${sym})</b>: ${p} ${skPl(p, 'protón', 'protóny', 'protónov')}, ${n} ${skPl(n, 'neutrón', 'neutróny', 'neutrónov')}, ${p} ${skPl(p, 'elektrón', 'elektróny', 'elektrónov')}`;
                    } else {
                      root.querySelector('.p-out').textContent = `${p} proton${p === 1 ? '' : 's'}`;
                      root.querySelector('.readout').innerHTML = `<b>${name} (${sym})</b>: ${p} proton${p === 1 ? '' : 's'}, ${n} neutron${n === 1 ? '' : 's'}, ${p} electron${p === 1 ? '' : 's'}`;
                    }
                  };
                  root.querySelector('.p-minus').addEventListener('click', () => { p = Math.max(1, p - 1); update(); });
                  root.querySelector('.p-plus').addEventListener('click', () => { p = Math.min(10, p + 1); update(); });
                  update();
                },
              },
              {
                title: { en: 'Three particles, three charges', sk: 'Tri častice, tri náboje' },
                art: { en: charges('en'), sk: charges('sk') },
                text: {
                  en: '<p><b>Protons</b> are positive (+), <b>neutrons</b> have no charge, and <b>electrons</b> are negative (−). Opposite charges attract, which keeps the electrons around the nucleus.</p>',
                  sk: '<p><b>Protóny</b> sú kladné (+), <b>neutróny</b> nemajú náboj a <b>elektróny</b> sú záporné (−). Opačné náboje sa priťahujú, a preto elektróny zostávajú okolo jadra.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: {
                  en: [
                    'Atoms have a <b>nucleus</b> (protons + neutrons) and <b>electrons</b> around it.',
                    'The number of protons is the <b>atomic number</b>, and it decides the element.',
                    'Protons +, neutrons 0, electrons −.',
                    'The first electron shell holds 2 electrons, the next one holds 8.',
                  ],
                  sk: [
                    'Atóm má <b>jadro</b> (protóny + neutróny) a okolo neho <b>elektróny</b>.',
                    'Počet protónov je <b>protónové číslo</b> a určuje prvok.',
                    'Protóny +, neutróny 0, elektróny −.',
                    'Do prvej elektrónovej vrstvy sa zmestia 2 elektróny, do ďalšej 8.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'The number of protons in an atom decides…', sk: 'Počet protónov v atóme určuje…' },
                options: { en: ['which element it is', 'how big the atom is', 'its colour', 'whether it is a liquid'], sk: ['o aký prvok ide', 'aký veľký je atóm', 'jeho farbu', 'či je kvapalný'] },
                answer: { en: 'which element it is', sk: 'o aký prvok ide' },
                explain: { en: 'The proton count (atomic number) decides <b>which element</b> it is.', sk: 'Počet protónov (protónové číslo) určuje, <b>o aký prvok</b> ide.' },
                hint: { en: 'what changed when you added protons?', sk: 'čo sa zmenilo, keď pribudli protóny?' } },
              { type: 'choice', prompt: { en: 'Which particle has a negative charge?', sk: 'Ktorá častica má záporný náboj?' },
                options: { en: ['Electron', 'Proton', 'Neutron', 'Nucleus'], sk: ['Elektrón', 'Protón', 'Neutrón', 'Jadro'] },
                answer: { en: 'Electron', sk: 'Elektrón' },
                explain: { en: '<b>Electrons</b> are negative; protons are positive; neutrons are neutral.', sk: '<b>Elektróny</b> sú záporné, protóny kladné a neutróny neutrálne.' },
                hint: { en: 'it’s the small blue one whizzing around.', sk: 'je to tá malá modrá, čo krúži dookola.' } },
              { type: 'choice', prompt: { en: 'An atom has 6 protons. Which element is it?', sk: 'Atóm má 6 protónov. Aký je to prvok?' },
                options: { en: ['Carbon', 'Oxygen', 'Helium', 'Neon'], sk: ['Uhlík', 'Kyslík', 'Hélium', 'Neón'] },
                answer: { en: 'Carbon', sk: 'Uhlík' },
                explain: { en: 'Atomic number 6 is <b>carbon</b>.', sk: 'Protónové číslo 6 má <b>uhlík</b>.' },
                hint: { en: 'it was the first atom in this lesson.', sk: 'bol to prvý atóm v tejto lekcii.' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'The nucleus contains protons and electrons.', sk: 'Jadro obsahuje protóny a elektróny.' }, answer: false,
                explain: { en: '<b>False.</b> The nucleus holds protons and <b>neutrons</b>; electrons are outside it.', sk: '<b>Nepravda.</b> V jadre sú protóny a <b>neutróny</b>, elektróny sú mimo neho.' },
                hint: { en: 'where were the blue dots?', sk: 'kde boli modré bodky?' } },
            ],
          },
        ],
        soon: { en: ['The periodic table', 'Chemical bonds'], sk: ['Periodická tabuľka', 'Chemické väzby'] },
      },
    ],
    soonUnits: { en: ['Reactions'], sk: ['Reakcie'] },
  });
})();
