'use strict';

/* Slovenčina · 2. ročník · Samohlásky a dvojhlásky (iŠVP 2015). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BLUE = '#4C6A92';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const tile = (x, y, text, { w = 34, h = 38, fill = '#FFFFFF', stroke = BLUE, size = 22, delay = null } = {}) =>
    `<g ${delay != null ? pop(delay) : ''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + h / 2 + size * 0.36}" text-anchor="middle" ${T} font-size="${size}" fill="${INK}">${text}</text></g>`;

  const SHORT_LONG = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Hore sedem krátkych samohlások a, ä, e, i, o, u, y v úzkych kartičkách. Dole šesť dlhých samohlások á, é, í, ó, ú, ý v dlhších kartičkách.">
    <text x="12" y="28" ${T} font-size="14" fill="${BLUE}">krátke</text>
    ${['a', 'ä', 'e', 'i', 'o', 'u', 'y'].map((l, i) => tile(12 + i * 43, 38, l, { delay: (0.1 + i * 0.12).toFixed(2) })).join('')}
    <text x="12" y="118" ${T} font-size="14" fill="${CORAL}">dlhé</text>
    ${['á', 'é', 'í', 'ó', 'ú', 'ý'].map((l, i) => tile(12 + i * 50, 128, l, { w: 44, fill: '#FFE9E2', stroke: CORAL, delay: (1 + i * 0.12).toFixed(2) })).join('')}
  </svg>`;

  const LIPS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Spoluhlásky b, m, p, v a za nimi písmeno ä. Pod tým slová mäso, päť, väčší a bábätko.">
    ${['b', 'm', 'p', 'v'].map((l, i) => tile(28 + i * 46, 30, l, { delay: (0.1 + i * 0.2).toFixed(1) })).join('')}
    <path d="M220 49 h26 m-8 -8 l8 8 l-8 8" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    ${tile(256, 26, 'ä', { w: 46, h: 46, size: 30, fill: '#FFE9E2', stroke: CORAL, delay: 1 })}
    <g ${pop(1.4)} ${T} font-size="20" fill="${INK}" text-anchor="middle">
      <text x="80" y="122"><tspan fill="${BLUE}">m</tspan><tspan fill="#C2412A">ä</tspan>so</text>
      <text x="240" y="122"><tspan fill="${BLUE}">p</tspan><tspan fill="#C2412A">ä</tspan>ť</text>
      <text x="80" y="168"><tspan fill="${BLUE}">v</tspan><tspan fill="#C2412A">ä</tspan>čší</text>
      <text x="240" y="168">bá<tspan fill="${BLUE}">b</tspan><tspan fill="#C2412A">ä</tspan>tko</text>
    </g>
  </svg>`;

  const DIPH = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štyri dvojhlásky ia, ie, iu a ô. Pod každou slovo: piatok, mlieko, cudziu, kôň.">
    ${[['ia', 'p<tspan fill="#C2412A">ia</tspan>tok'], ['ie', 'ml<tspan fill="#C2412A">ie</tspan>ko'], ['iu', 'cudz<tspan fill="#C2412A">iu</tspan>'], ['ô', 'k<tspan fill="#C2412A">ô</tspan>ň']].map(([d, w], i) => {
      const x = 40 + i * 80;
      return `<g ${pop((0.2 + i * 0.35).toFixed(2))}><rect x="${x - 30}" y="40" width="60" height="60" rx="14" fill="#FFE9E2" stroke="${CORAL}" stroke-width="3"/><text x="${x}" y="82" text-anchor="middle" ${T} font-size="30" fill="${INK}">${d}</text><text x="${x}" y="140" text-anchor="middle" ${T} font-size="17" fill="${INK}">${w}</text></g>`;
    }).join('')}
    <text x="160" y="182" text-anchor="middle" ${T} font-size="14" fill="${BLUE}">dve samohlásky vyslovené naraz</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'sk2-samohlasky',
    subject: 'Slovenčina',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Samohlásky a dvojhlásky',
    blurb: 'Krátke a dlhé samohlásky, kedy píšeme ä a ako sa píšu dvojhlásky ia, ie, iu, ô.',
    artBg: '#F3F6FA',
    units: [
      {
        title: 'Samohlásky',
        lessons: [
          {
            id: 'sk2-samohlasky-dlzka',
            title: 'Krátke a dlhé samohlásky',
            minutes: 8,
            slides: [
              {
                title: 'Krátke a dlhé',
                art: SHORT_LONG,
                text: '<p><b>Krátke samohlásky</b> sú a, ä, e, i, o, u, y. <b>Dlhé samohlásky</b> majú dĺžeň: á, é, í, ó, ú, ý. Dlhú samohlásku vyslovujeme <b>dlhšie</b>.</p>',
              },
              {
                title: 'Dĺžka mení význam',
                phrases: [
                  { es: 'latka', en: 'drevená tyčka v plote', lang: SK },
                  { es: 'látka', en: 'z nej šijeme šaty', lang: SK },
                  { es: 'vila', en: 'veľký dom so záhradou', lang: SK },
                  { es: 'víla', en: 'bytosť z rozprávky', lang: SK },
                  { es: 'pas', en: 'doklad na cestu do zahraničia', lang: SK },
                  { es: 'pás', en: 'tam nosíme opasok', lang: SK },
                ],
                text: '<p>Vypočuj si dvojice slov. Líšia sa len <b>dĺžkou</b> jednej samohlásky, a predsa znamenajú niečo iné.</p>',
              },
              {
                title: 'Zapamätaj si',
                cards: [
                  { front: 'krátke samohlásky', back: 'a, ä, e, i, o, u, y', lang: SK },
                  { front: 'dlhé samohlásky', back: 'á, é, í, ó, ú, ý', lang: SK },
                  { front: 'dĺžeň', back: 'znamienko, ktoré samohlásku predĺži', lang: SK },
                ],
                text: '<p>Keď si nie si istý, povedz slovo nahlas a pomaly. Počuješ, či je samohláska dlhá?</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Krátke: <b>a, ä, e, i, o, u, y</b>.',
                  'Dlhé: <b>á, é, í, ó, ú, ý</b>.',
                  'Dĺžka mení význam: <b>latka – látka</b>, <b>vila – víla</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorá samohláska je dlhá?',
                options: ['a', 'o', 'ú', 'e'], answer: 'ú',
                explain: '<b>ú</b> má dĺžeň, je dlhá.', hint: 'hľadaj dĺžeň.' },
              { type: 'choice', prompt: 'Vypočuj si slovo. Čo znamená?', say: { text: 'víla', lang: SK },
                options: ['veľký dom', 'bytosť z rozprávky', 'zviera', 'farba'], answer: 'bytosť z rozprávky',
                explain: '<b>Víla</b> s dlhým í je bytosť z rozprávky. Vila s krátkym i je dom.', hint: 'počuješ dlhé í?' },
              { type: 'choice', prompt: 'Koľko je krátkych samohlások?',
                options: ['5', '6', '7', '8'], answer: '7',
                explain: 'a, ä, e, i, o, u, y: <b>7</b>.', hint: 'nezabudni na ä a y.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Slová latka a látka znamenajú to isté.', answer: false,
                explain: '<b>Nepravda.</b> Latka je tyčka v plote, látka je na šaty.', hint: 'dĺžka mení význam.' },
            ],
          },
          {
            id: 'sk2-samohlasky-a',
            title: 'Samohláska ä',
            minutes: 7,
            slides: [
              {
                title: 'Kde píšeme ä',
                art: LIPS,
                text: '<p>Samohlásku <b>ä</b> píšeme len po spoluhláskach <b>b, m, p, v</b>. Pri nich sa zatvárajú pery: vyskúšaj si to. Najčastejšie ju vyslovujeme ako <b>e</b>, preto si treba zapamätať, v ktorých slovách ju píšeme.</p>',
              },
              {
                title: 'Slová s ä',
                phrases: [
                  { es: 'mäso', en: 'jedlo zo zvierat', lang: SK },
                  { es: 'päť', en: 'číslo 5', lang: SK },
                  { es: 'deväť', en: 'číslo 9', lang: SK },
                  { es: 'mäkký', en: 'opak tvrdého', lang: SK },
                  { es: 'väčší', en: 'opak menšieho', lang: SK },
                  { es: 'bábätko', en: 'malé dieťa', lang: SK },
                ],
                text: '<p>Vypočuj si slová a všimni si, ktorá spoluhláska je pred ä.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>ä</b> píšeme len po <b>b, m, p, v</b>.',
                  'Slová s ä: mäso, päť, deväť, mäkký, väčší, bábätko.',
                  'Vyslovujeme ho najčastejšie ako <b>e</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Po ktorých spoluhláskach píšeme ä?',
                options: ['k, l, s, t', 'b, m, p, v', 'h, ch, k', 'd, t, n'], answer: 'b, m, p, v',
                explain: 'ä píšeme po <b>b, m, p, v</b>.', hint: 'pri nich sa zatvárajú pery.' },
              { type: 'choice', prompt: 'Ktoré slovo je napísané správne?',
                options: ['meso', 'mäsó', 'mäso', 'mesó'], answer: 'mäso',
                explain: 'Správne je <b>mäso</b>.', hint: 'po m môže byť ä.' },
              { type: 'choice', prompt: 'Doplň písmeno: dev_ť',
                options: ['e', 'á', 'é', 'ä'], answer: 'ä',
                explain: '<b>deväť</b>: po v píšeme ä.', hint: 'je to číslo ako päť.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Slovo päť píšeme s ä.', answer: true,
                explain: '<b>Pravda.</b> p-ä-ť.', hint: 'pozri zoznam slov s ä.' },
            ],
          },
          {
            id: 'sk2-samohlasky-dvojhlasky',
            title: 'Dvojhlásky ia, ie, iu, ô',
            minutes: 8,
            slides: [
              {
                title: 'Dve samohlásky naraz',
                art: DIPH,
                text: '<p><b>Dvojhláska</b> sú dve samohlásky, ktoré vyslovíme naraz, v jednej slabike. Slovenské dvojhlásky sú <b>ia, ie, iu</b> a <b>ô</b>.</p>',
              },
              {
                title: 'Vypočuj si dvojhlásky',
                phrases: [
                  { es: 'piatok', en: 'deň pred sobotou', lang: SK },
                  { es: 'mlieko', en: 'dáva nám ho krava', lang: SK },
                  { es: 'kôň', en: 'zviera, na ktorom sa jazdí', lang: SK },
                  { es: 'stôl', en: 'sedíme pri ňom pri jedle', lang: SK },
                  { es: 'vietor', en: 'fúka a hýbe stromami', lang: SK },
                ],
                text: '<p>Počúvaj: dvojhlásku vyslovíme jedným dychom, nerozdeľujeme ju.</p>',
              },
              {
                title: 'ja, je, ju alebo ia, ie, iu?',
                cards: [
                  { front: 'na začiatku slova', back: 'ja, je, ju: jablko, jeseň, jún', lang: SK },
                  { front: 'po samohláske', back: 'ja, je, ju: moja, tvoje, kraju', lang: SK },
                  { front: 'po spoluhláske', back: 'ia, ie, iu: piatok, mlieko, cudziu', lang: SK },
                  { front: 'ô', back: 'kôň, stôl, vôl, môj', lang: SK },
                ],
                text: '<p>Na <b>začiatku slova</b> a <b>po samohláske</b> píšeme <b>j</b>. Po <b>spoluhláske</b> píšeme dvojhlásku <b>ia, ie, iu</b>. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Dvojhlásky: <b>ia, ie, iu, ô</b>.',
                  'Na začiatku slova píšeme <b>ja, je, ju</b>: jablko, jeseň.',
                  'Po spoluhláske píšeme <b>ia, ie, iu</b>: piatok, mlieko.',
                  'Dvojhláska je vždy v <b>jednej slabike</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktoré slovo má dvojhlásku?',
                options: ['mačka', 'pero', 'mlieko', 'lopta'], answer: 'mlieko',
                explain: 'V slove <b>mlieko</b> je dvojhláska ie.', hint: 'hľadaj ia, ie, iu alebo ô.' },
              { type: 'choice', prompt: 'Ktoré slovo je napísané správne?',
                options: ['iahoda', 'jahoda', 'jahóda', 'yahoda'], answer: 'jahoda',
                explain: 'Na začiatku slova píšeme <b>ja</b>: jahoda.', hint: 'čo píšeme na začiatku slova?' },
              { type: 'choice', prompt: 'Ktoré písmeno je tiež dvojhláska?',
                options: ['ó', 'ä', 'ô', 'ú'], answer: 'ô',
                explain: '<b>ô</b> s vokáňom je dvojhláska, ako v slove kôň.', hint: 'hľadaj vokáň.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Po spoluhláske píšeme ie, napríklad v slove mlieko.', answer: true,
                explain: '<b>Pravda.</b> Po spoluhláske l píšeme dvojhlásku ie.', hint: 'pozri kartičky.' },
            ],
          },
        ],
      },
    ],
  });
})();
