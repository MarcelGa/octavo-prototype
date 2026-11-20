'use strict';

/* Matematika · 2. ročník · Logika, čas a peniaze (iŠVP 2015: aplikačné úlohy, údaje, čas, platidlá). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const MAG = '#A43CB4';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  // Shapes for patterns.
  const SHAPE = {
    kruh: (x, y, c = MAG) => `<circle cx="${x}" cy="${y}" r="16" fill="${c}"/>`,
    trojuholník: (x, y, c = CORAL) => `<path d="M${x} ${y - 17} L${x + 17} ${y + 14} H${x - 17} Z" fill="${c}"/>`,
    štvorec: (x, y, c = KELP) => `<rect x="${x - 15}" y="${y - 15}" width="30" height="30" rx="3" fill="${c}"/>`,
  };
  function pattern(names, y = 100) {
    const step = 300 / names.length;
    return names.map((n, i) => {
      const x = 10 + step * i + step / 2;
      if (n === '?') return `<rect x="${x - 18}" y="${y - 18}" width="36" height="36" rx="8" fill="#FFFFFF" stroke="${INK}" stroke-width="2.5" stroke-dasharray="5 4"/><text x="${x}" y="${y + 8}" text-anchor="middle" ${T} font-size="22" fill="${INK}">?</text>`;
      return `<g ${pop((0.15 + i * 0.15).toFixed(2))}>${SHAPE[n](x, y)}</g>`;
    }).join('');
  }

  const PATTERN = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Postupnosť tvarov: kruh, trojuholník, štvorec, kruh, trojuholník, štvorec, kruh a otáznik. Tvary sa opakujú stále v rovnakom poradí.">
    ${pattern(['kruh', 'trojuholník', 'štvorec', 'kruh', 'trojuholník', 'štvorec', 'kruh', '?'], 90)}
    <text x="160" y="160" text-anchor="middle" ${T} font-size="15" fill="#4A4566">opakuje sa: kruh, trojuholník, štvorec</text>
  </svg>`;

  const QUIZ_PATTERN = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Postupnosť tvarov: štvorec, kruh, kruh, štvorec, kruh, kruh, štvorec a otáznik.">
    ${pattern(['štvorec', 'kruh', 'kruh', 'štvorec', 'kruh', 'kruh', 'štvorec', '?'])}
  </svg>`;

  // All arrangements of three coloured blocks, grouped by the first colour.
  const COLORS = { Č: '#E5484D', M: '#3E63DD', Ž: '#F5C518' };
  const ORDERS = [['Č', 'M', 'Ž'], ['Č', 'Ž', 'M'], ['M', 'Č', 'Ž'], ['M', 'Ž', 'Č'], ['Ž', 'Č', 'M'], ['Ž', 'M', 'Č']];
  const ARRANGE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Šesť spôsobov, ako uložiť vedľa seba červenú, modrú a žltú kocku. Vždy dva spôsoby začínajú červenou, dva modrou a dva žltou.">
    ${ORDERS.map((o, i) => {
      const gx = 18 + Math.floor(i / 2) * 102; const gy = 40 + (i % 2) * 56;
      return `<g ${pop((0.2 + i * 0.3).toFixed(1))}>${o.map((c, k) => `<rect x="${gx + k * 28}" y="${gy}" width="24" height="24" rx="4" fill="${COLORS[c]}" stroke="${INK}" stroke-width="1.5"/>`).join('')}</g>`;
    }).join('')}
    <g ${T} font-size="13" fill="#4A4566" text-anchor="middle"><text x="56" y="150">červená prvá</text><text x="158" y="150">modrá prvá</text><text x="260" y="150">žltá prvá</text></g>
    <text x="160" y="184" text-anchor="middle" ${T} font-size="18" fill="${KELP}" ${pop(2.2)}>spolu 6 možností</text>
  </svg>`;

  const TABLE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tabuľka obľúbeného ovocia v triede. Jablko: 7 detí. Hruška: 4 deti. Banán: 6 detí. Slivka: 3 deti.">
    <rect x="40" y="20" width="240" height="160" rx="10" fill="#FFFFFF" stroke="${INK}" stroke-width="2.5"/>
    <rect x="40" y="20" width="240" height="32" rx="10" fill="#F6E6F8"/>
    <path d="M160 20 V180 M40 52 H280 M40 84 H280 M40 116 H280 M40 148 H280" stroke="${INK}" stroke-width="1.5"/>
    <g ${T} font-size="14" fill="${INK}">
      <text x="100" y="42" text-anchor="middle">ovocie</text><text x="220" y="42" text-anchor="middle">počet detí</text>
      ${[['jablko', 7], ['hruška', 4], ['banán', 6], ['slivka', 3]].map(([f, n], i) => `<text x="100" y="${74 + i * 32}" text-anchor="middle">${f}</text><text x="220" y="${74 + i * 32}" text-anchor="middle" fill="${MAG}">${n}</text>`).join('')}
    </g>
  </svg>`;

  // An analogue clock face at (cx, cy) showing h:m.
  function clock(cx, cy, r, h, m, { label = '', small = false } = {}) {
    let out = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFFFFF" stroke="${INK}" stroke-width="${small ? 2.5 : 4}"/>`;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * 2 * Math.PI;
      const big = i % 3 === 0;
      out += `<path d="M${(cx + Math.sin(a) * r * (big ? 0.78 : 0.85)).toFixed(1)} ${(cy - Math.cos(a) * r * (big ? 0.78 : 0.85)).toFixed(1)} L${(cx + Math.sin(a) * r * 0.93).toFixed(1)} ${(cy - Math.cos(a) * r * 0.93).toFixed(1)}" stroke="${INK}" stroke-width="${big ? 3 : 1.5}" stroke-linecap="round"/>`;
      if (!small && big) out += `<text x="${(cx + Math.sin(a) * r * 0.62).toFixed(1)}" y="${(cy - Math.cos(a) * r * 0.62 + 5).toFixed(1)}" text-anchor="middle" ${T} font-size="13" fill="#4A4566">${i || 12}</text>`;
    }
    const ma = (m / 60) * 2 * Math.PI; const ha = (((h % 12) + m / 60) / 12) * 2 * Math.PI;
    out += `<path d="M${cx} ${cy} L${(cx + Math.sin(ha) * r * 0.5).toFixed(1)} ${(cy - Math.cos(ha) * r * 0.5).toFixed(1)}" stroke="${MAG}" stroke-width="${small ? 4 : 6}" stroke-linecap="round"/>`;
    out += `<path d="M${cx} ${cy} L${(cx + Math.sin(ma) * r * 0.8).toFixed(1)} ${(cy - Math.cos(ma) * r * 0.8).toFixed(1)}" stroke="${CORAL}" stroke-width="${small ? 2.5 : 4}" stroke-linecap="round"/>`;
    out += `<circle cx="${cx}" cy="${cy}" r="${small ? 3 : 5}" fill="${INK}"/>`;
    if (label) out += `<text x="${cx}" y="${cy + r + 20}" text-anchor="middle" ${T} font-size="13" fill="${INK}">${label}</text>`;
    return out;
  }

  const CLOCK_3 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Ručičkové hodiny ukazujú tri hodiny: krátka fialová ručička na trojke, dlhá oranžová na dvanástke. Vedľa digitálne hodiny 3:00.">
    ${clock(100, 100, 76, 3, 0)}
    <rect x="200" y="74" width="100" height="52" rx="10" fill="${INK}"/>
    <text x="250" y="110" text-anchor="middle" font-family="ui-monospace, monospace" font-weight="700" font-size="28" fill="#7CF5B0">3:00</text>
    <text x="250" y="150" text-anchor="middle" ${T} font-size="13" fill="#4A4566">digitálne</text>
  </svg>`;

  const FOUR_CLOCKS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štvoro hodín: tri hodiny, štvrť na štyri, pol štvrtej a trištvrte na štyri.">
    ${[[3, 0, 'tri hodiny'], [3, 15, 'štvrť na štyri'], [3, 30, 'pol štvrtej'], [3, 45, 'trištvrte na 4']].map(([h, m, l], i) => `<g ${pop((0.2 + i * 0.4).toFixed(1))}>${clock(42 + i * 78, 86, 32, h, m, { label: l, small: true })}<text x="${42 + i * 78}" y="166" text-anchor="middle" ${T} font-size="13" fill="${MAG}">3:${String(m).padStart(2, '0')}</text></g>`).join('')}
  </svg>`;

  const QUIZ_CLOCK = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Ručičkové hodiny: dlhá ručička na šestke, krátka ručička medzi osmičkou a deviatkou.">
    ${clock(160, 100, 80, 8, 30)}
  </svg>`;

  // Euro coins as simple discs.
  function coin(x, y, value, r = 20) {
    const euro = value.endsWith('€');
    const two = value === '2 €';
    const fill = euro ? (two ? '#C9CCD6' : '#E8C25A') : ['1 c', '2 c', '5 c'].includes(value) ? '#C7774A' : '#E2B84A';
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${INK}" stroke-width="2"/>${euro ? `<circle cx="${x}" cy="${y}" r="${r * 0.62}" fill="${two ? '#E8C25A' : '#C9CCD6'}"/>` : ''}<text x="${x}" y="${y + 5}" text-anchor="middle" ${T} font-size="${r * 0.62}" fill="${INK}">${value.replace(' ', '')}</text>`;
  }

  const COINS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Euromince: 1, 2, 5, 10, 20 a 50 centov, 1 euro a 2 eurá. Pod nimi bankovky 5, 10 a 20 eur.">
    ${['1 c', '2 c', '5 c', '10 c', '20 c', '50 c', '1 €', '2 €'].map((v, i) => `<g ${pop((0.1 + i * 0.12).toFixed(2))}>${coin(26 + i * 38, 56, v, 16 + (i > 5 ? 3 : i * 0.4))}</g>`).join('')}
    ${[['5 €', '#B5B5B5'], ['10 €', '#E5484D'], ['20 €', '#3E63DD']].map(([v, c], i) => `<g ${pop((1.2 + i * 0.25).toFixed(2))}><rect x="${24 + i * 98}" y="110" width="80" height="44" rx="5" fill="${c}" opacity="0.85" stroke="${INK}" stroke-width="2"/><text x="${64 + i * 98}" y="139" text-anchor="middle" ${T} font-size="18" fill="#FFFFFF">${v}</text></g>`).join('')}
    <text x="160" y="186" text-anchor="middle" ${T} font-size="15" fill="${KELP}">1 € = 100 centov</text>
  </svg>`;

  const QUIZ_COINS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Dve dvojeurové mince a jedna jednoeurová minca.">
    ${coin(90, 100, '2 €', 34)}${coin(170, 100, '2 €', 34)}${coin(244, 100, '1 €', 30)}
  </svg>`;

  window.Octavo.addCourse({
    id: 'mat2-logika',
    subject: 'Matematika',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Logika, čas a peniaze',
    blurb: 'Postupnosti, možnosti a tabuľky, hodiny so štvrťou a polovicou aj počítanie s eurami.',
    artBg: '#FBF5FC',
    units: [
      {
        title: 'Rozmýšľame',
        lessons: [
          {
            id: 'mat2-logika-postupnosti',
            title: 'Pravda, nepravda a postupnosti',
            minutes: 8,
            slides: [
              {
                title: 'Pravda alebo nepravda?',
                phrases: [
                  { es: 'Pes má štyri nohy.', en: 'pravda', lang: SK },
                  { es: 'Mačka je vták.', en: 'nepravda: mačka nie je vták', lang: SK },
                  { es: '7 je viac ako 9.', en: 'nepravda: 7 je menej ako 9', lang: SK },
                  { es: '30 + 30 = 60', en: 'pravda: 3 + 3 = 6 desiatok', lang: SK },
                ],
                text: '<p>O každej vete rozhodni, či je <b>pravdivá</b>, alebo <b>nepravdivá</b>. Pri čísle si ju najprv over výpočtom.</p>',
              },
              {
                title: 'Nájdi pravidlo',
                art: PATTERN,
                text: '<p>Tvary sa opakujú stále v rovnakom poradí: kruh, trojuholník, štvorec. To je <b>pravidlo</b> postupnosti. Na miesto otáznika patrí <b>trojuholník</b>.</p>',
              },
              {
                title: 'Číselné postupnosti',
                cards: [
                  { front: '2, 4, 6, 8, ?', back: '10, pravidlo: + 2', lang: SK },
                  { front: '50, 45, 40, ?', back: '35, pravidlo: − 5', lang: SK },
                  { front: '1, 3, 5, 7, ?', back: '9, pravidlo: + 2 od jednotky', lang: SK },
                  { front: '10, 20, 30, ?', back: '40, pravidlo: + 10', lang: SK },
                ],
                text: '<p>Pozri sa, <b>o koľko</b> sa čísla menia. Potom pokračuj podľa toho istého pravidla. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Tvrdenie je <b>pravdivé</b>, alebo <b>nepravdivé</b>.',
                  'Postupnosť má <b>pravidlo</b>: čo sa opakuje alebo o koľko sa číslo mení.',
                  'Keď poznám pravidlo, viem <b>doplniť</b> ďalšie členy.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Čo patrí na miesto otáznika?', art: QUIZ_PATTERN,
                options: ['štvorec', 'kruh', 'trojuholník'], answer: 'kruh',
                explain: 'Opakuje sa štvorec, kruh, kruh. Po štvorci ide <b>kruh</b>.', hint: 'čo nasleduje vždy po štvorci?' },
              { type: 'choice', prompt: 'Doplň: 3, 6, 9, 12, ?',
                options: ['13', '14', '18', '15'], answer: '15',
                explain: 'Pravidlo je + 3: 12 + 3 = <b>15</b>.', hint: 'o koľko sa čísla zväčšujú?' },
              { type: 'choice', prompt: 'Aké je pravidlo: 70, 60, 50, 40?',
                options: ['+ 10', '− 10', '− 1', '+ 1'], answer: '− 10',
                explain: 'Každé ďalšie číslo je o 10 menšie: <b>− 10</b>.', hint: 'čísla sa zmenšujú.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Číslo 40 je väčšie ako 4.', answer: true,
                explain: '<b>Pravda.</b> 40 sú 4 desiatky, 4 sú len 4 jednotky.', hint: 'porovnaj desiatky.' },
            ],
          },
          {
            id: 'mat2-logika-moznosti',
            title: 'Koľko je možností? Tabuľky',
            minutes: 9,
            slides: [
              {
                title: 'Všetky možnosti',
                art: ARRANGE,
                text: '<p>Červenú, modrú a žltú kocku vieme uložiť vedľa seba <b>6</b> spôsobmi. Aby sme na žiadny nezabudli, postupujeme <b>systematicky</b>: najprv dáme na prvé miesto červenú, potom modrú, potom žltú.</p>',
              },
              {
                title: 'Hľadáme so systémom',
                cards: [
                  { front: 'dve veci: A a B', back: '2 možnosti: AB, BA', lang: SK },
                  { front: 'tri veci', back: '6 možností', lang: SK },
                  { front: 'systém', back: 'každá vec raz na prvom mieste', lang: SK },
                  { front: 'zápis', back: 'možnosti píšem pod seba, aby som nič nevynechal', lang: SK },
                ],
                text: '<p>Keď hľadáš všetky možnosti, <b>zapisuj si ich</b>. Ľahko potom zistíš, či ti nejaká chýba.</p>',
              },
              {
                title: 'Tabuľka',
                art: TABLE,
                phrases: [
                  { es: 'riadok', en: 'ide zľava doprava', lang: SK },
                  { es: 'stĺpec', en: 'ide zhora nadol', lang: SK },
                  { es: 'údaj', en: 'číslo alebo slovo v tabuľke', lang: SK },
                  { es: 'hlasovanie', en: 'zbieram údaje: koho sa pýtam, čo odpovedá', lang: SK },
                ],
                text: '<p>Deti v triede povedali, aké ovocie majú najradšej. Údaje sme zapísali do <b>tabuľky</b>. V každom <b>riadku</b> je jedno ovocie, v <b>stĺpci</b> vpravo počet detí. Najviac detí má rado <b>jablko</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Dve veci uložím <b>2</b> spôsobmi, tri veci <b>6</b> spôsobmi.',
                  'Možnosti hľadám <b>systematicky</b> a zapisujem ich.',
                  '<b>Riadok</b> ide zľava doprava, <b>stĺpec</b> zhora nadol.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľkými spôsobmi sa môžu postaviť do radu 2 deti, Ema a Jano?',
                options: ['1', '3', '2', '4'], answer: '2',
                explain: 'Ema a Jano, alebo Jano a Ema: <b>2</b> spôsoby.', hint: 'kto môže stáť prvý?' },
              { type: 'choice', prompt: 'Koľkými spôsobmi uložíš vedľa seba 3 rôzne kocky?',
                options: ['3', '9', '5', '6'], answer: '6',
                explain: 'Každá kocka môže byť prvá a za ňou sú 2 možnosti: <b>6</b>.', hint: 'spomeň si na červenú, modrú a žltú kocku.' },
              { type: 'choice', prompt: 'Koľko detí má rado banány?', art: TABLE,
                options: ['7', '6', '4', '3'], answer: '6',
                explain: 'V riadku „banán“ je číslo <b>6</b>.', hint: 'nájdi riadok s banánom.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Stĺpec v tabuľke ide zľava doprava.', answer: false,
                explain: '<b>Nepravda.</b> Stĺpec ide zhora nadol. Zľava doprava ide riadok.', hint: 'stĺpy domu stoja zvislo.' },
            ],
          },
        ],
      },
      {
        title: 'Čas a peniaze',
        lessons: [
          {
            id: 'mat2-logika-hodiny',
            title: 'Koľko je hodín?',
            minutes: 10,
            slides: [
              {
                title: 'Dve ručičky',
                art: CLOCK_3,
                text: '<p><b>Krátka</b> ručička ukazuje <b>hodiny</b>, <b>dlhá</b> ručička ukazuje <b>minúty</b>. Keď je dlhá ručička na 12, je <b>celá hodina</b>: tu sú 3 hodiny. Digitálne hodiny ukážu 3:00.</p>',
              },
              {
                title: 'Štvrť, pol, trištvrte',
                art: FOUR_CLOCKS,
                text: '<p>Dlhá ručička na <b>3</b>: štvrť hodiny prešla, hovoríme <b>štvrť na štyri</b>. Na <b>6</b>: <b>pol štvrtej</b>. Na <b>9</b>: <b>trištvrte na štyri</b>. Vždy hovoríme o hodine, ktorá <b>príde</b>.</p>',
              },
              {
                title: 'Vypočuj si čas',
                phrases: [
                  { es: '7:00', say: 'sedem hodín', en: 'sedem hodín', lang: SK },
                  { es: '7:15', say: 'štvrť na osem', en: 'štvrť na osem', lang: SK },
                  { es: '7:30', say: 'pol ôsmej', en: 'pol ôsmej', lang: SK },
                  { es: '7:45', say: 'trištvrte na osem', en: 'trištvrte na osem', lang: SK },
                ],
                text: '<p>Hore je čas na digitálnych hodinách, dole ako ho povieme.</p>',
              },
              {
                title: 'Koľko je to minút?',
                cards: [
                  { front: 'hodina', back: '60 minút', lang: SK },
                  { front: 'pol hodiny', back: '30 minút', lang: SK },
                  { front: 'štvrť hodiny', back: '15 minút', lang: SK },
                  { front: 'trištvrte hodiny', back: '45 minút', lang: SK },
                ],
                text: '<p>Otoč kartičky. Prestávka v škole má často <b>10</b> alebo <b>15 minút</b>, vyučovacia hodina <b>45 minút</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Krátka ručička: <b>hodiny</b>. Dlhá ručička: <b>minúty</b>.',
                  '1 hodina = <b>60 minút</b>, pol hodiny = 30, štvrť hodiny = 15.',
                  '7:15 je <b>štvrť na osem</b>, 7:30 <b>pol ôsmej</b>, 7:45 <b>trištvrte na osem</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko je hodín?', art: QUIZ_CLOCK,
                options: ['pol ôsmej', 'osem hodín', 'pol deviatej', 'štvrť na deväť'], answer: 'pol deviatej',
                explain: 'Dlhá ručička je na 6 a krátka medzi 8 a 9: je <b>pol deviatej</b> (8:30).', hint: 'pri „pol“ hovoríme o hodine, ktorá príde.' },
              { type: 'choice', prompt: 'Koľko minút má hodina?',
                options: ['100', '30', '24', '60'], answer: '60',
                explain: 'Hodina má <b>60 minút</b>.', hint: 'dlhá ručička prejde celý ciferník.' },
              { type: 'choice', prompt: 'Ako zapíšeš štvrť na päť digitálne?',
                options: ['5:15', '4:15', '4:45', '5:45'], answer: '4:15',
                explain: 'Štvrť na päť: zo štvrtej hodiny prešlo 15 minút, <b>4:15</b>.', hint: 'štvrť na päť je ešte pred piatou.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Štvrť hodiny je 15 minút.', answer: true,
                explain: '<b>Pravda.</b> 60 minút rozdelíme na 4 štvrtiny po 15.', hint: 'pozri kartičky.' },
            ],
          },
          {
            id: 'mat2-logika-peniaze',
            title: 'Eurá a centy',
            minutes: 9,
            slides: [
              {
                title: 'Naše peniaze',
                art: COINS,
                text: '<p>Na Slovensku platíme <b>eurom</b> (€). Menšie mince sú <b>centy</b> (c). <b>1 euro = 100 centov.</b> Väčšie sumy platíme <b>bankovkami</b>.</p>',
              },
              {
                title: 'Jednu sumu zaplatím rôzne',
                text: '<p><b>5 €</b> zaplatím napríklad:</p><p>bankovkou 5 €<br>2 € + 2 € + 1 €<br>2 € + 1 € + 1 € + 1 €</p><p>Keď platíš viac, dostaneš <b>vydávku</b>: kniha stojí 7 €, zaplatíš 10 €, dostaneš späť 10 − 7 = <b>3 €</b>.</p>',
              },
              {
                title: 'Počítame peniaze',
                cards: [
                  { front: '1 euro', back: '100 centov', lang: SK },
                  { front: '50 c + 50 c', back: '1 €', lang: SK },
                  { front: '2 € + 2 € + 1 €', back: '5 €', lang: SK },
                  { front: 'platím 10 €, stojí 7 €', back: 'vydávka 3 €', lang: SK },
                ],
                text: '<p>Otoč kartičky a skús to povedať skôr, ako ich otočíš.</p>',
              },
              {
                title: 'V obchode',
                phrases: [
                  { es: 'Koľko to stojí?', en: 'pýtam sa na cenu', lang: SK },
                  { es: 'Platím 10 eur.', en: 'dávam peniaze', lang: SK },
                  { es: 'Tu máš 3 eurá späť.', en: 'vydávka', lang: SK },
                  { es: 'Ďakujem, dovidenia.', en: 'zdvorilo sa rozlúčim', lang: SK },
                ],
                text: '<p>Zahrajte sa doma na obchod. Ceny si napíšte na papieriky a platte skutočnými mincami.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>1 € = 100 centov.</b>',
                  'Jednu sumu môžem zaplatiť <b>rôznymi</b> mincami.',
                  '<b>Vydávka</b> = čo som dal − koľko to stojí.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko centov je 1 euro?',
                options: ['10', '1000', '100', '50'], answer: '100',
                explain: '1 euro je <b>100 centov</b>.', hint: 'je to celá stovka.' },
              { type: 'choice', prompt: 'Koľko je spolu?', art: QUIZ_COINS,
                options: ['4 €', '6 €', '3 €', '5 €'], answer: '5 €',
                explain: '2 € + 2 € + 1 € = <b>5 €</b>.', hint: 'spočítaj hodnoty mincí.' },
              { type: 'choice', prompt: 'Rožok stojí 20 centov. Koľko stoja 3 rožky?',
                options: ['23 c', '50 c', '60 c', '80 c'], answer: '60 c',
                explain: '20 + 20 + 20 = <b>60 centov</b>.', hint: 'rovnaké sčítance: 3-krát po 20.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Zaplatíš 10 €, kniha stojí 7 €. Dostaneš späť 3 €.', answer: true,
                explain: '<b>Pravda.</b> 10 − 7 = 3.', hint: 'vydávka je rozdiel.' },
            ],
          },
        ],
      },
    ],
  });
})();
