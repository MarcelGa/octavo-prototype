'use strict';

/* Math · Fractions with pizza. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';

  // A pizza cut into n slices with the first k shaded. pop = animate shaded slices in one by one.
  function pizza(n, k, cx, cy, r, pop = false) {
    const crust = `<circle cx="${cx}" cy="${cy}" r="${r + 5}" fill="#E8B04A"/>`;
    if (n === 1) {
      return `${crust}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${k ? '#F5A524' : '#FFF1D6'}" stroke="#B9770E" stroke-width="2"/>`;
    }
    let out = crust;
    for (let i = 0; i < n; i++) {
      const a1 = -Math.PI / 2 + (i / n) * 2 * Math.PI;
      const a2 = -Math.PI / 2 + ((i + 1) / n) * 2 * Math.PI;
      const x1 = cx + r * Math.cos(a1); const y1 = cy + r * Math.sin(a1);
      const x2 = cx + r * Math.cos(a2); const y2 = cy + r * Math.sin(a2);
      const large = a2 - a1 > Math.PI ? 1 : 0;
      const shaded = i < k;
      const cls = shaded && pop ? ` class="a-pop" style="animation-delay: ${0.3 + i * 0.35}s; transform-box: view-box; transform-origin: ${cx}px ${cy}px"` : '';
      out += `<path${cls} d="M${cx} ${cy} L${x1.toFixed(2)} ${y1.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="${shaded ? '#F5A524' : '#FFF1D6'}" stroke="#B9770E" stroke-width="2" stroke-linejoin="round"/>`;
      if (shaded) {
        const mx = cx + r * 0.55 * Math.cos((a1 + a2) / 2); const my = cy + r * 0.55 * Math.sin((a1 + a2) / 2);
        out += `<circle${cls} cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${Math.max(2.5, r / 12)}" fill="#E5484D"/>`;
      }
    }
    return out;
  }

  const fraction = (x, num, den, color = '#1E1A3C') => `
    <text x="${x}" y="88" text-anchor="middle" ${T} font-size="34" fill="${color}">${num}</text>
    <path d="M${x - 22} 100 H${x + 22}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
    <text x="${x}" y="136" text-anchor="middle" ${T} font-size="34" fill="${color}">${den}</text>`;

  const INTRO_TXT = {
    en: { aria: 'A pizza cut into 8 slices; 3 slices are coloured in. Next to it, the fraction 3 over 8 with labels numerator and denominator.', taken: 'slices taken', all: 'slices in all' },
    sk: { aria: 'Pizza rozkrojená na 8 kúskov, 3 kúsky sú vyfarbené. Vedľa nej zlomok 3 osminy s popisom čitateľ a menovateľ.', taken: 'vzaté kúsky', all: 'všetky kúsky' },
  };
  const intro = (lang) => {
    const L = INTRO_TXT[lang];
    return `
  <svg viewBox="0 0 320 200" role="img" aria-label="${L.aria}">
    ${pizza(8, 3, 96, 100, 74, true)}
    ${fraction(214, 3, 8, '#2A44A8')}
    <text x="244" y="80" ${T} font-size="11" fill="#4A4566">${L.taken}</text>
    <text x="244" y="128" ${T} font-size="11" fill="#4A4566">${L.all}</text>
  </svg>`;
  };

  const builder = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Nastaviteľná pizza a k nej zodpovedajúci zlomok.' : 'An adjustable pizza and the matching fraction.'}">
    <g class="pizza"></g>
    <g class="frac"></g>
  </svg>`;

  const equiv = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Tri pizze: 1 z 2 kúskov, 2 zo 4 kúskov a 4 z 8 kúskov. Každá ukazuje presne polovicu.' : 'Three pizzas: 1 of 2 slices, 2 of 4 slices and 4 of 8 slices. Each shows exactly half.'}">
    ${pizza(2, 1, 52, 92, 40)}${pizza(4, 2, 160, 92, 40)}${pizza(8, 4, 268, 92, 40)}
    <g ${T} font-size="26" fill="#2A44A8" text-anchor="middle"><text x="106" y="102">=</text><text x="214" y="102">=</text></g>
    <g ${T} font-size="18" fill="#1E1A3C" text-anchor="middle"><text x="52" y="168">1/2</text><text x="160" y="168">2/4</text><text x="268" y="168">4/8</text></g>
    <rect class="a-sweep" x="4" y="44" width="104" height="100" rx="12" fill="none" stroke="#3E63DD" stroke-width="3"/>
  </svg>`;

  const quizPizza = (lang) => `<svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Pizza rozkrojená na 6 kúskov, 4 kúsky sú vyfarbené.' : 'A pizza cut into 6 slices with 4 slices coloured in.'}">${pizza(6, 4, 160, 100, 80)}</svg>`;

  window.Octavo.addCourse({
    id: 'fractions',
    subject: 'Math',
    audience: 'adult',
    lecturer: 'kai',
    title: { en: 'Fractions', sk: 'Zlomky' },
    blurb: { en: 'Parts of a whole, explained with pizza: reading, building and comparing fractions.', sk: 'Časti celku vysvetlené na pizzi: čítanie, skladanie a porovnávanie zlomkov.' },
    artBg: '#F6F8FF',
    units: [
      {
        title: { en: 'Parts of a whole', sk: 'Časti celku' },
        lessons: [
          {
            id: 'ma-fractions',
            title: { en: 'Fractions with pizza', sk: 'Zlomky s pizzou' },
            minutes: 4,
            slides: [
              {
                title: { en: 'What is a fraction?', sk: 'Čo je zlomok?' },
                art: { en: intro('en'), sk: intro('sk') },
                text: {
                  en: '<p>A fraction describes part of a whole. The bottom number, the <b>denominator</b>, says how many equal slices the whole is cut into. The top number, the <b>numerator</b>, says how many slices you have.</p>',
                  sk: '<p>Zlomok opisuje časť celku. Dolné číslo, <b>menovateľ</b>, hovorí, na koľko rovnakých kúskov je celok rozdelený. Horné číslo, <b>čitateľ</b>, hovorí, koľko kúskov máš.</p>',
                },
              },
              {
                title: { en: 'Build a fraction', sk: 'Poskladaj zlomok' },
                art: { en: builder('en'), sk: builder('sk') },
                controls: {
                  en: `
                <div class="control">
                  <label for="den">Slices in all <output class="den-out">6</output></label>
                  <input id="den" type="range" min="2" max="12" value="6" step="1">
                  <label for="num">Slices taken <output class="num-out">2</output></label>
                  <input id="num" type="range" min="0" max="6" value="2" step="1">
                  <output class="readout"></output>
                </div>`,
                  sk: `
                <div class="control">
                  <label for="den">Všetky kúsky <output class="den-out">6</output></label>
                  <input id="den" type="range" min="2" max="12" value="6" step="1">
                  <label for="num">Vzaté kúsky <output class="num-out">2</output></label>
                  <input id="num" type="range" min="0" max="6" value="2" step="1">
                  <output class="readout"></output>
                </div>`,
                },
                text: {
                  en: '<p>Change the sliders and watch the pizza and the fraction change together.</p>',
                  sk: '<p>Posúvaj jazdce a sleduj, ako sa pizza aj zlomok menia spolu.</p>',
                },
                setup(root, api) {
                  const sk = !!api && api.lang === 'sk';
                  const den = root.querySelector('#den');
                  const num = root.querySelector('#num');
                  const update = () => {
                    const d = Number(den.value);
                    num.max = String(d);
                    const k = Math.min(Number(num.value), d);
                    num.value = String(k);
                    root.querySelector('.den-out').textContent = d;
                    root.querySelector('.num-out').textContent = k;
                    root.querySelector('.pizza').innerHTML = pizza(d, k, 100, 100, 76);
                    root.querySelector('.frac').innerHTML = fraction(240, k, d, '#2A44A8');
                    const pct = Math.round((k / d) * 100);
                    root.querySelector('.readout').innerHTML = sk
                      ? `${k}/${d} pizze = <b>${pct} %</b>${k === d ? ' · celá pizza!' : k * 2 === d ? ' · presne polovica!' : ''}`
                      : `${k}/${d} of the pizza = <b>${pct}%</b>${k === d ? ' · the whole pizza!' : k * 2 === d ? ' · exactly half!' : ''}`;
                  };
                  den.addEventListener('input', update);
                  num.addEventListener('input', update);
                  update();
                },
              },
              {
                title: { en: 'Same amount, different names', sk: 'Rovnaké množstvo, iné mená' },
                art: { en: equiv('en'), sk: equiv('sk') },
                text: {
                  en: '<p>1/2, 2/4 and 4/8 are <b>equivalent fractions</b>: the same amount of pizza. Multiply (or divide) the top and bottom by the same number and the value doesn’t change.</p>',
                  sk: '<p>1/2, 2/4 a 4/8 sú <b>zlomky s rovnakou hodnotou</b>: rovnaké množstvo pizze. Keď čitateľa aj menovateľa vynásobíš (alebo vydelíš) rovnakým číslom, hodnota sa nezmení.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: {
                  en: [
                    'The <b>denominator</b> (bottom) is how many equal parts.',
                    'The <b>numerator</b> (top) is how many parts you have.',
                    '1/2 = 2/4 = 4/8: these are <b>equivalent</b>.',
                    'To compare fractions, give them the same denominator.',
                  ],
                  sk: [
                    '<b>Menovateľ</b> (dole) hovorí, koľko je rovnakých častí.',
                    '<b>Čitateľ</b> (hore) hovorí, koľko častí máš.',
                    '1/2 = 2/4 = 4/8: tieto zlomky majú <b>rovnakú hodnotu</b>.',
                    'Ak chceš zlomky porovnať, uprav ich na rovnakého menovateľa.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'What fraction of the pizza is coloured in?', sk: 'Aká časť pizze je vyfarbená?' }, art: { en: quizPizza('en'), sk: quizPizza('sk') },
                options: ['4/6', '2/6', '6/4', '4/10'], answer: '4/6',
                explain: { en: '<b>4</b> slices out of <b>6</b>: 4/6 (which is also 2/3).', sk: '<b>4</b> kúsky zo <b>6</b>: 4/6 (čo je aj 2/3).' },
                hint: { en: 'count the coloured slices, then all the slices.', sk: 'spočítaj vyfarbené kúsky a potom všetky kúsky.' } },
              { type: 'choice', prompt: { en: 'Which fraction is equivalent to 1/2?', sk: 'Ktorý zlomok sa rovná 1/2?' },
                options: ['3/6', '2/3', '1/3', '3/4'], answer: '3/6',
                explain: { en: '<b>3/6</b>: multiply the top and bottom of 1/2 by 3.', sk: '<b>3/6</b>: vynásob čitateľa aj menovateľa v 1/2 číslom 3.' },
                hint: { en: 'the top should be exactly half of the bottom.', sk: 'čitateľ má byť presne polovica menovateľa.' } },
              { type: 'choice', prompt: { en: 'Which is bigger: 3/4 or 2/3?', sk: 'Čo je väčšie: 3/4, alebo 2/3?' },
                options: { en: ['3/4', '2/3', 'They are equal'], sk: ['3/4', '2/3', 'Sú rovnaké'] }, answer: { en: '3/4', sk: '3/4' },
                explain: { en: 'In twelfths: 3/4 = 9/12 and 2/3 = 8/12, so <b>3/4</b> is bigger.', sk: 'V dvanástinách: 3/4 = 9/12 a 2/3 = 8/12, takže <b>3/4</b> je viac.' },
                hint: { en: 'rewrite both with 12 as the denominator.', sk: 'prepíš oba zlomky s menovateľom 12.' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'In the fraction 5/8, the 8 is the denominator.', sk: 'V zlomku 5/8 je 8 menovateľ.' }, answer: true,
                explain: { en: '<b>True.</b> The bottom number is the denominator.', sk: '<b>Pravda.</b> Dolné číslo je menovateľ.' },
                hint: { en: 'denominator: down at the bottom.', sk: 'menovateľ je dole.' } },
            ],
          },
        ],
        soon: { en: ['Adding fractions', 'Decimals and percentages'], sk: ['Sčítanie zlomkov', 'Desatinné čísla a percentá'] },
      },
    ],
    soonUnits: { en: ['Ratios'], sk: ['Pomery'] },
  });
})();
