'use strict';

/* Matematika · 2. ročník · Čísla do 100 (iŠVP 2015). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const MAG = '#A43CB4';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  // Base-ten blocks: `tens` rods of 10 squares and `ones` single squares, starting at x.
  function blocks(tens, ones, x = 30, y = 40) {
    let out = '';
    for (let t = 0; t < tens; t++) {
      const rx = x + t * 22;
      out += `<g ${pop((0.2 + t * 0.25).toFixed(2))}>`;
      for (let i = 0; i < 10; i++) out += `<rect x="${rx}" y="${y + i * 11}" width="16" height="10" rx="2" fill="${MAG}" stroke="#74237F" stroke-width="1"/>`;
      out += '</g>';
    }
    const ox = x + tens * 22 + 16;
    for (let o = 0; o < ones; o++) {
      out += `<rect ${pop((0.3 + tens * 0.25 + o * 0.2).toFixed(2))} x="${ox + (o % 3) * 16}" y="${y + 99 - Math.floor(o / 3) * 13}" width="12" height="11" rx="2" fill="${CORAL}" stroke="#C2412A" stroke-width="1"/>`;
    }
    return out;
  }

  const TENS_34 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri fialové tyčky po desiatich kockách a štyri samostatné oranžové kocky. Spolu 3 desiatky a 4 jednotky, číslo 34.">
    ${blocks(3, 4, 24, 36)}
    <g ${pop(1.8)}>
      <text x="226" y="70" text-anchor="middle" ${T} font-size="16" fill="#74237F">3 desiatky</text>
      <text x="226" y="100" text-anchor="middle" ${T} font-size="16" fill="#C2412A">4 jednotky</text>
      <text x="226" y="150" text-anchor="middle" ${T} font-size="40" fill="${INK}"><tspan fill="#74237F">3</tspan><tspan fill="#C2412A">4</tspan></text>
    </g>
  </svg>`;

  const QUIZ_27 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Dve tyčky po desiatich kockách a sedem samostatných kociek.">
    ${blocks(2, 7, 90, 36)}
  </svg>`;

  // Equally spaced ticks with labels; `mark` gets a highlight, `gap` is shown as an empty box.
  function axis(values, { mark = null, gap = null, y = 110 } = {}) {
    const x0 = 28; const step = (292 - x0) / (values.length - 1);
    let out = `<path d="M${x0 - 14} ${y} H${292 + 14}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M${292 + 6} ${y - 6} L${292 + 14} ${y} L${292 + 6} ${y + 6}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    values.forEach((v, i) => {
      const x = (x0 + i * step).toFixed(1);
      out += `<path d="M${x} ${y - 7} V${y + 7}" stroke="${INK}" stroke-width="2.5"/>`;
      if (v === gap) out += `<rect x="${x - 15}" y="${y + 14}" width="30" height="24" rx="6" fill="#FFFFFF" stroke="${CORAL}" stroke-width="2.5"/><text x="${x}" y="${y + 32}" text-anchor="middle" ${T} font-size="15" fill="#C2412A">?</text>`;
      else if (v === mark) out += `<circle ${pop(0.3)} cx="${x}" cy="${y}" r="9" fill="${MAG}"/><text x="${x}" y="${y + 32}" text-anchor="middle" ${T} font-size="17" fill="#74237F">${v}</text>`;
      else out += `<text x="${x}" y="${y + 32}" text-anchor="middle" ${T} font-size="13" fill="#4A4566">${v}</text>`;
    });
    return out;
  }
  const xAt = (values, v) => 28 + values.indexOf(v) * ((292 - 28) / (values.length - 1));

  const R40 = [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];
  const ROW_45 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Číselná os od 40 do 50. Vyznačené je číslo 45. Hneď pred ním je 44, hneď za ním 46.">
    ${axis(R40, { mark: 45 })}
    <g ${pop(0.8)}>
      <path d="M${xAt(R40, 44).toFixed(1)} 98 V64" stroke="${CORAL}" stroke-width="2.5" stroke-dasharray="4 4"/>
      <text x="${xAt(R40, 44).toFixed(1)}" y="54" text-anchor="end" ${T} font-size="14" fill="#C2412A">hneď pred: 44</text>
    </g>
    <g ${pop(1.3)}>
      <path d="M${xAt(R40, 46).toFixed(1)} 98 V84" stroke="${KELP}" stroke-width="2.5" stroke-dasharray="4 4"/>
      <text x="${xAt(R40, 46).toFixed(1)}" y="78" ${T} font-size="14" fill="${KELP}">hneď za: 46</text>
    </g>
  </svg>`;

  const TENS_ROW = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const BY_TENS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Číselná os od 0 do 100 po desiatkach. Oblúčiky skáču vždy o 10.">
    <text x="160" y="40" text-anchor="middle" ${T} font-size="18" fill="${INK}">Po desiatich: + 10, + 10, …</text>
    ${TENS_ROW.slice(0, -1).map((v, i) => {
      const a = xAt(TENS_ROW, v); const b = xAt(TENS_ROW, v + 10);
      return `<path class="ap-note" style="--d: ${(0.15 + i * 0.25).toFixed(2)}s" d="M${a.toFixed(1)} 104 Q ${((a + b) / 2).toFixed(1)} 72 ${b.toFixed(1)} 104" fill="none" stroke="${i % 2 ? CORAL : MAG}" stroke-width="3" stroke-linecap="round"/>`;
    }).join('')}
    ${axis(TENS_ROW)}
  </svg>`;

  const QUIZ_GAP = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Číselná os s číslami 20, 30, 40, prázdne okienko, 60 a 70.">
    ${axis([20, 30, 40, 50, 60, 70], { gap: 50 })}
  </svg>`;

  // A hungry crocodile mouth: it always opens towards the bigger number.
  const CROC = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Čísla 47 a 39. Medzi nimi je znak väčší ako, nakreslený ako otvorená krokodília papuľa, ktorá sa otvára k väčšiemu číslu 47.">
    <text x="70" y="120" text-anchor="middle" ${T} font-size="52" fill="${INK}">47</text>
    <text x="250" y="120" text-anchor="middle" ${T} font-size="52" fill="${INK}">39</text>
    <g class="a-bob">
      <path d="M130 62 L190 102 L130 142" fill="none" stroke="${KELP}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M140 72 l6 10 l6 -4 l6 10 l6 -4 M140 132 l6 -10 l6 4 l6 -10 l6 4" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="176" cy="84" r="4" fill="${INK}"/>
    </g>
    <text x="160" y="180" text-anchor="middle" ${T} font-size="20" fill="${KELP}">47 > 39</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'mat2-cisla100',
    subject: 'Matematika',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Čísla do 100',
    blurb: 'Desiatky a jednotky, číselná os a porovnávanie čísel so znakmi <, > a =.',
    artBg: '#FBF5FC',
    units: [
      {
        title: 'Poznáme čísla do 100',
        lessons: [
          {
            id: 'mat2-cisla100-desiatky',
            title: 'Desiatky a jednotky',
            minutes: 9,
            slides: [
              {
                title: 'Desiatky a jednotky',
                art: TENS_34,
                text: '<p>Desať kociek spojíme do jednej tyčky: to je <b>desiatka</b>. Samostatné kocky sú <b>jednotky</b>. 3 desiatky a 4 jednotky sú číslo <b>34</b>. Prvá číslica hovorí, koľko je desiatok, druhá, koľko jednotiek.</p>',
              },
              {
                title: 'Číslo a číslica',
                cards: [
                  { front: 'číslica', back: 'jeden znak: 0, 1, 2 … 9', lang: SK },
                  { front: 'jednociferné číslo', back: 'má 1 číslicu, napríklad 7', lang: SK },
                  { front: 'dvojciferné číslo', back: 'má 2 číslice, napríklad 34', lang: SK },
                  { front: 'trojciferné číslo', back: 'má 3 číslice, napríklad 100', lang: SK },
                ],
                text: '<p>Číslice sú ako písmená a čísla sú ako slová. Číslo <b>34</b> napíšeme dvoma číslicami: <b>3</b> a <b>4</b>. Otoč kartičky.</p>',
              },
              {
                title: 'Čítame čísla',
                phrases: [
                  { es: '34', en: '3 desiatky a 4 jednotky', lang: SK },
                  { es: '58', en: '5 desiatok a 8 jednotiek', lang: SK },
                  { es: '70', en: '7 desiatok a 0 jednotiek', lang: SK },
                  { es: '19', en: '1 desiatka a 9 jednotiek', lang: SK },
                  { es: '100', en: '10 desiatok: sto', lang: SK },
                ],
                text: '<p>Vypočuj si, ako čísla čítame. <b>Sto</b> je 10 desiatok a je to prvé <b>trojciferné</b> číslo.</p>',
              },
              {
                title: 'Rozklad čísla',
                text: '<p>Každé dvojciferné číslo vieme <b>rozložiť</b> na desiatky a jednotky:</p><p><b>46 = 40 + 6</b><br><b>82 = 80 + 2</b><br><b>5 desiatok a 3 jednotky = 53</b></p><p>A naopak: 60 + 9 <b>zložíme</b> na 69.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Desiatka</b> je 10 jednotiek.',
                  'V čísle 34 sú <b>3 desiatky</b> a <b>4 jednotky</b>.',
                  'Číslo rozložíme: 46 = <b>40 + 6</b>.',
                  '<b>Číslica</b> je jeden znak, číslo môže mať viac číslic.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Aké číslo je na obrázku?', art: QUIZ_27,
                options: ['72', '27', '9', '207'], answer: '27',
                explain: '2 desiatky a 7 jednotiek je <b>27</b>.', hint: 'najprv spočítaj tyčky (desiatky), potom kocky.' },
              { type: 'choice', prompt: 'Koľko desiatok má číslo 60?',
                options: ['0', '60', '10', '6'], answer: '6',
                explain: '60 je <b>6 desiatok</b> a 0 jednotiek.', hint: 'pozri sa na prvú číslicu.' },
              { type: 'choice', prompt: 'Ako rozložíš číslo 83?',
                options: ['8 + 3', '30 + 8', '80 + 3', '800 + 3'], answer: '80 + 3',
                explain: '83 sú 8 desiatok a 3 jednotky: <b>80 + 3</b>.', hint: '8 desiatok je 80.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Číslo 45 je dvojciferné a má 4 desiatky.', answer: true,
                explain: '<b>Pravda.</b> 45 má dve číslice a prvá z nich, 4, hovorí o desiatkach.', hint: 'koľko číslic má 45?' },
            ],
          },
          {
            id: 'mat2-cisla100-os',
            title: 'Číselný rad a číselná os',
            minutes: 9,
            slides: [
              {
                title: 'Kde býva číslo',
                art: ROW_45,
                text: '<p>Na <b>číselnej osi</b> idú čísla za sebou od najmenšieho. Číslo <b>hneď pred</b> 45 je o 1 menšie (44), číslo <b>hneď za</b> 45 je o 1 väčšie (46).</p>',
              },
              {
                title: 'Pred, za, vzostupne, zostupne',
                cards: [
                  { front: 'hneď pred 50', back: '49', lang: SK },
                  { front: 'hneď za 69', back: '70', lang: SK },
                  { front: 'vzostupne', back: 'od najmenšieho: 12, 25, 31, 47', lang: SK },
                  { front: 'zostupne', back: 'od najväčšieho: 47, 31, 25, 12', lang: SK },
                ],
                text: '<p><b>Vzostupne</b> znamená ísť hore, od najmenšieho po najväčšie. <b>Zostupne</b> ideme dole, od najväčšieho. Otoč kartičky.</p>',
              },
              {
                title: 'Skáčeme po desiatich',
                art: BY_TENS,
                replay: 'Skákať znova',
                autoplay: true,
                phrases: [
                  { es: '10, 20, 30, 40, 50', en: 'po desiatich', lang: SK },
                  { es: '2, 4, 6, 8, 10, 12', en: 'po dvoch', lang: SK },
                  { es: '35, 45, 55, 65', en: 'po desiatich od 35', lang: SK },
                  { es: 'prvý, druhý, tretí', en: 'poradie: kto je kde v rade', lang: SK },
                ],
                text: '<p>Keď skáčeš <b>po desiatich</b>, mení sa len číslica desiatok: 35, 45, 55. V rade pomáhajú slová <b>prvý, druhý, tretí … posledný</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Hneď pred</b> je o 1 menej, <b>hneď za</b> je o 1 viac.',
                  '<b>Vzostupne</b>: od najmenšieho. <b>Zostupne</b>: od najväčšieho.',
                  'Po desiatich: 10, 20, 30 … 100.',
                  'Poradie: prvý, druhý, tretí … posledný.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktoré číslo je hneď za číslom 59?',
                options: ['58', '50', '69', '60'], answer: '60',
                explain: 'Hneď za 59 je o 1 viac: <b>60</b>.', hint: 'pridaj 1.' },
              { type: 'choice', prompt: 'Ktoré číslo chýba v okienku?', art: QUIZ_GAP,
                options: ['45', '50', '41', '55'], answer: '50',
                explain: 'Os ide po desiatich: 40, <b>50</b>, 60.', hint: 'o koľko sa čísla zväčšujú?' },
              { type: 'order', prompt: 'Zoraď čísla vzostupne.',
                items: ['18', '36', '63', '81'],
                explain: 'Od najmenšieho: 18, 36, 63, <b>81</b>.', hint: 'vzostupne znamená od najmenšieho.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Na číselnej osi je 72 pred číslom 27.', answer: false,
                explain: '<b>Nepravda.</b> 27 je menšie, takže na osi je skôr: 27 je pred 72.', hint: 'menšie čísla sú na osi vľavo, skôr.' },
            ],
          },
          {
            id: 'mat2-cisla100-porovnavanie',
            title: 'Porovnávanie čísel',
            minutes: 9,
            slides: [
              {
                title: 'Hladný krokodíl',
                art: CROC,
                text: '<p>Znak <b>&gt;</b> čítame „je väčšie ako“, znak <b>&lt;</b> „je menšie ako“ a <b>=</b> „sa rovná“. Pomôcka: znak je ako papuľa krokodíla. Vždy sa otvára k <b>väčšiemu</b> číslu.</p>',
              },
              {
                title: 'Najprv desiatky, potom jednotky',
                cards: [
                  { front: '47 a 39', back: '47 > 39 (4 desiatky > 3 desiatky)', lang: SK },
                  { front: '52 a 58', back: '52 < 58 (desiatky rovnaké, 2 < 8)', lang: SK },
                  { front: '60 a 60', back: '60 = 60', lang: SK },
                  { front: '91 a 19', back: '91 > 19', lang: SK },
                ],
                text: '<p>Porovnaj najprv <b>desiatky</b>. Keď sú rovnaké, rozhodnú <b>jednotky</b>. Otoč kartičky.</p>',
              },
              {
                title: 'Vypočuj si porovnania',
                phrases: [
                  { es: '47 > 39', say: '47 je väčšie ako 39', en: 'je väčšie ako', lang: SK },
                  { es: '25 < 52', say: '25 je menšie ako 52', en: 'je menšie ako', lang: SK },
                  { es: '80 = 80', say: '80 sa rovná 80', en: 'sa rovná', lang: SK },
                  { es: '98', say: 'Najväčšie z čísel 89, 98 a 79 je 98', en: 'najväčšie z čísel 89, 98, 79', lang: SK },
                ],
                text: '<p>Ťukni na reproduktor a opakuj nahlas.</p>',
              },
              {
                title: 'Kto má viac?',
                text: '<p><b>Ema prečítala 28 strán, Lukáš 35 strán. Kto prečítal viac?</b> 35 &gt; 28, takže <b>Lukáš</b>.</p><p><b>Ktoré čísla môžu byť v okienku: 4□ &lt; 43?</b> Desiatky sú rovnaké, jednotky musia byť menšie ako 3: <b>40, 41, 42</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>&gt;</b> je väčšie, <b>&lt;</b> je menšie, <b>=</b> sa rovná.',
                  'Krokodíl otvára papuľu k <b>väčšiemu</b> číslu.',
                  'Najprv porovnaj <b>desiatky</b>, potom <b>jednotky</b>.',
                  'Pri „kto má viac“ hľadáš väčšie číslo.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorý znak patrí medzi 56 a 65?',
                options: ['>', '<', '='], answer: '<',
                explain: '56 má 5 desiatok, 65 má 6 desiatok, takže <b>56 &lt; 65</b>.', hint: 'porovnaj najprv desiatky.' },
              { type: 'choice', prompt: 'Ktoré číslo je najväčšie?',
                options: ['89', '79', '98', '97'], answer: '98',
                explain: '9 desiatok majú 98 a 97, a z nich má viac jednotiek <b>98</b>.', hint: 'hľadaj najviac desiatok, potom jednotky.' },
              { type: 'choice', prompt: 'Ktoré číslo je menšie ako 25?',
                options: ['52', '25', '19', '30'], answer: '19',
                explain: '<b>19</b> má len 1 desiatku, 25 má 2.', hint: '25 nie je menšie samo od seba, je rovnaké.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Platí 38 > 83.', answer: false,
                explain: '<b>Nepravda.</b> 38 má 3 desiatky, 83 má 8 desiatok, takže 38 &lt; 83.', hint: 'porovnaj prvé číslice.' },
            ],
          },
        ],
      },
    ],
  });
})();
