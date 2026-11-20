'use strict';

/* Slovenčina · 2. ročník · Hlásky a písmená (iŠVP 2015: jazyková zložka). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BLUE = '#4C6A92';   // subject colour
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  // A letter tile. w grows for two-letter tiles like "ch".
  const tile = (x, y, text, { fill = '#FFFFFF', stroke = BLUE, color = INK, size = 22, w = 34, h = 38, delay = null } = {}) =>
    `<g ${delay != null ? pop(delay) : ''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + h / 2 + size * 0.36}" text-anchor="middle" ${T} font-size="${size}" fill="${color}">${text}</text></g>`;

  const HEAR_SEE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Slovo chata. Hore ucho a štyri hlásky ch, a, t, a. Dole ceruzka a päť písmen c, h, a, t, a. Hlásku ch počujeme raz, ale píšeme ju dvoma písmenami.">
    <g fill="none" stroke="${BLUE}" stroke-width="3" stroke-linecap="round"><path d="M26 44 C 26 24, 54 22, 56 42 C 57 52, 46 54, 46 64 C 46 72, 36 74, 34 66"/><path d="M36 44 C 36 36, 46 36, 46 44"/></g>
    ${['ch', 'a', 't', 'a'].map((l, i) => tile(76 + i * 54, 24, l, { w: 46, fill: i ? '#FFFFFF' : '#FFE9E2', stroke: i ? BLUE : CORAL, delay: (0.2 + i * 0.3).toFixed(1) })).join('')}    <g fill="none" stroke="${BLUE}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M28 140 l22 -22 l6 6 l-22 22 h-6z"/></g>
    ${['c', 'h', 'a', 't', 'a'].map((l, i) => tile(76 + i * 43, 112, l, { w: 36, fill: i < 2 ? '#FFE9E2' : '#FFFFFF', stroke: i < 2 ? CORAL : BLUE, delay: (1.5 + i * 0.2).toFixed(1) })).join('')}
    <g ${pop(2.6)} ${T} font-size="14" text-anchor="middle"><text x="182" y="88" fill="${BLUE}">počujem 4 hlásky</text><text x="182" y="178" fill="${BLUE}">píšem 5 písmen</text></g>
  </svg>`;

  // The Slovak alphabet, 46 letters, in a grid; ch is highlighted after h.
  const ABC = ['a', 'á', 'ä', 'b', 'c', 'č', 'd', 'ď', 'dz', 'dž', 'e', 'é', 'f', 'g', 'h', 'ch', 'i', 'í', 'j', 'k', 'l', 'ĺ', 'ľ', 'm', 'n', 'ň', 'o', 'ó', 'ô', 'p', 'q', 'r', 'ŕ', 's', 'š', 't', 'ť', 'u', 'ú', 'v', 'w', 'x', 'y', 'ý', 'z', 'ž'];
  const ALPHABET = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Slovenská abeceda v mriežke: 46 písmen od a po ž. Zvýraznené je písmeno ch, ktoré nasleduje hneď po h.">
    ${ABC.map((l, i) => {
      const x = 8 + (i % 8) * 38.5; const y = 8 + Math.floor(i / 8) * 31.5;
      const hl = l === 'ch' || l === 'h';
      return `<g ${pop((0.05 + i * 0.03).toFixed(2))}><rect x="${x}" y="${y}" width="34" height="27" rx="6" fill="${l === 'ch' ? '#FFE9E2' : hl ? '#E6EDF5' : '#FFFFFF'}" stroke="${l === 'ch' ? CORAL : BLUE}" stroke-width="${hl ? 2.5 : 1.5}"/><text x="${x + 17}" y="${y + 19}" text-anchor="middle" ${T} font-size="15" fill="${INK}">${l}</text></g>`;
    }).join('')}
  </svg>`;

  const MARKS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štyri rozlišovacie znamienka: dĺžeň nad á, mäkčeň nad č, vokáň nad ô a dve bodky nad ä.">
    ${[['á', 'dĺžeň'], ['č', 'mäkčeň'], ['ô', 'vokáň'], ['ä', 'dve bodky']].map(([l, n], i) => {
      const x = 42 + i * 78;
      return `<g ${pop((0.2 + i * 0.4).toFixed(1))}><rect x="${x - 32}" y="34" width="64" height="84" rx="14" fill="#FFFFFF" stroke="${BLUE}" stroke-width="3"/><text x="${x}" y="100" text-anchor="middle" ${T} font-size="54" fill="${INK}">${l}</text><text x="${x}" y="146" text-anchor="middle" ${T} font-size="14" fill="${BLUE}">${n}</text></g>`;
    }).join('')}
    <text x="160" y="182" text-anchor="middle" ${T} font-size="14" fill="#4A4566">koza alebo koža? Znamienko mení význam!</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'sk2-hlasky',
    subject: 'Slovenčina',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Hlásky a písmená',
    blurb: 'Čo počujeme a čo píšeme: hlásky, písmená, abeceda a rozlišovacie znamienka.',
    artBg: '#F3F6FA',
    units: [
      {
        title: 'Počujeme a píšeme',
        lessons: [
          {
            id: 'sk2-hlasky-hlaska',
            title: 'Hláska a písmeno',
            minutes: 8,
            slides: [
              {
                title: 'Hlásku počujem, písmeno vidím',
                art: HEAR_SEE,
                text: '<p><b>Hláska</b> je zvuk, ktorý počujeme a vyslovíme. <b>Písmeno</b> je znak, ktorým hlásku napíšeme. V slove <b>chata</b> počujeme 4 hlásky: ch, a, t, a. Napíšeme ho však 5 písmenami.</p>',
              },
              {
                title: 'Dve písmená, jedna hláska',
                cards: [
                  { front: 'ch', back: 'chata, hrach, chlapec', lang: SK },
                  { front: 'dz', back: 'medzi, hádzať, cudzí', lang: SK },
                  { front: 'dž', back: 'džús, džem, džungľa', lang: SK },
                ],
                text: '<p>Hlásky <b>ch</b>, <b>dz</b> a <b>dž</b> vyslovíme naraz, ako jeden zvuk. Napíšeme ich však <b>dvoma písmenami</b>. Otoč kartičky a vypočuj si ich.</p>',
              },
              {
                title: 'Počítame hlásky',
                phrases: [
                  { es: 'chata', en: 'ch, a, t, a: 4 hlásky, 5 písmen', lang: SK },
                  { es: 'hrach', en: 'h, r, a, ch: 4 hlásky', lang: SK },
                  { es: 'džús', en: 'dž, ú, s: 3 hlásky, 4 písmená', lang: SK },
                  { es: 'medzi', en: 'm, e, dz, i: 4 hlásky, 5 písmen', lang: SK },
                ],
                text: '<p>Vypočuj si slovo a ťukaj prstom pri každej hláske, ktorú počuješ.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Hlásku</b> počujeme a vyslovíme, <b>písmeno</b> vidíme a píšeme.',
                  'Hlásky <b>ch, dz, dž</b> píšeme dvoma písmenami.',
                  'Preto má slovo <b>chata</b> 4 hlásky, ale 5 písmen.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko hlások má slovo chata?',
                options: ['5', '4', '3', '6'], answer: '4',
                explain: 'ch, a, t, a: <b>4 hlásky</b>. Písmen je 5, lebo ch má dve písmená.', hint: 'ch je jedna hláska.' },
              { type: 'choice', prompt: 'Ktorá hláska sa píše dvoma písmenami?',
                options: ['k', 'h', 'ch', 'c'], answer: 'ch',
                explain: '<b>ch</b> je jedna hláska, ale dve písmená: c a h.', hint: 'spomeň si na slovo chata.' },
              { type: 'order', prompt: 'Zoraď hlásky slova džús.',
                items: ['dž', 'ú', 's'],
                explain: 'dž, ú, s: slovo <b>džús</b> má 3 hlásky.', hint: 'dž je jedna hláska.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Hlásku počujeme, písmeno vidíme napísané.', answer: true,
                explain: '<b>Pravda.</b> Hláska je zvuk, písmeno je znak.', hint: 'čo robí ucho a čo oko?' },
            ],
          },
          {
            id: 'sk2-hlasky-abeceda',
            title: 'Abeceda',
            minutes: 9,
            slides: [
              {
                title: 'Slovenská abeceda',
                art: ALPHABET,
                text: '<p>Slovenská abeceda má <b>46 písmen</b> v pevnom poradí, od <b>a</b> po <b>ž</b>. Pozor: <b>ch</b> nie je hneď za c, ale až <b>za h</b>.</p>',
              },
              {
                title: 'Vypočuj si abecedu',
                phrases: [
                  { es: 'a, á, ä, b, c, č, d, ď', en: 'začiatok abecedy', lang: SK },
                  { es: 'g, h, ch, i, í, j, k', en: 'ch je hneď za h', lang: SK },
                  { es: 'r, ŕ, s, š, t, ť, u, ú', en: 'písmená s mäkčeňom idú hneď za svojím kamarátom', lang: SK },
                  { es: 'v, w, x, y, ý, z, ž', en: 'koniec abecedy', lang: SK },
                ],
                text: '<p>Písmená s <b>dĺžňom</b> alebo <b>mäkčeňom</b> stoja hneď za písmenom bez znamienka: c, č · s, š · z, ž.</p>',
              },
              {
                title: 'Abecedné poradie slov',
                cards: [
                  { front: 'auto, mačka', back: 'a je v abecede pred m', lang: SK },
                  { front: 'hrad, chata', back: 'h je pred ch', lang: SK },
                  { front: 'cesta, čaj', back: 'c je pred č', lang: SK },
                  { front: 'zebra, žaba', back: 'z je pred ž', lang: SK },
                ],
                text: '<p>Slová zoradíme podľa <b>prvého písmena</b>: ktoré je v abecede skôr, to slovo ide prvé. Tak sú zoradené mená v triednej knihe aj slová v slovníku.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Abeceda má <b>46 písmen</b>, od a po ž.',
                  '<b>ch</b> je za <b>h</b>.',
                  'Slová zoraďujeme podľa <b>prvého písmena</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Zoraď slová podľa abecedy.',
                items: ['jahoda', 'kolobežka', 'ruža', 'slon'],
                explain: 'j, k, r, s: <b>jahoda, kolobežka, ruža, slon</b>.', hint: 'pozri sa na prvé písmeno.' },
              { type: 'choice', prompt: 'Ktoré písmeno je v abecede hneď za h?',
                options: ['i', 'g', 'j', 'ch'], answer: 'ch',
                explain: 'Hneď za h je <b>ch</b>, až potom i.', hint: 'pozri si abecedu, zvýraznené písmeno.' },
              { type: 'choice', prompt: 'Ktoré slovo bude v abecede prvé?',
                options: ['pes', 'dom', 'auto', 'ryba'], answer: 'auto',
                explain: '<b>auto</b> sa začína na a, a to je v abecede úplne prvé.', hint: 'ktoré prvé písmeno je najskôr v abecede?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Písmeno č je v abecede pred písmenom c.', answer: false,
                explain: '<b>Nepravda.</b> Najprv je c, potom č.', hint: 'písmeno s mäkčeňom ide za písmenom bez neho.' },
            ],
          },
          {
            id: 'sk2-hlasky-znamienka',
            title: 'Dĺžeň, mäkčeň, vokáň, dve bodky',
            minutes: 9,
            slides: [
              {
                title: 'Rozlišovacie znamienka',
                art: MARKS,
                text: '<p>Nad niektoré písmená píšeme <b>rozlišovacie znamienka</b>: <b>dĺžeň</b> (á), <b>mäkčeň</b> (č), <b>vokáň</b> (ô) a <b>dve bodky</b> (ä). Mení sa nimi výslovnosť aj význam slova.</p>',
              },
              {
                title: 'Kde ktoré znamienko býva',
                cards: [
                  { front: 'dĺžeň', back: 'á, é, í, ó, ú, ý, ĺ, ŕ', lang: SK },
                  { front: 'mäkčeň', back: 'č, ď, ľ, ň, š, ť, ž, dž', lang: SK },
                  { front: 'vokáň', back: 'len nad ô', lang: SK },
                  { front: 'dve bodky', back: 'len nad ä', lang: SK },
                ],
                text: '<p>Pozor: pri písaných písmenách ď, ť, ľ vyzerá mäkčeň ako <b>čiarka</b> vedľa písmena.</p>',
              },
              {
                title: 'Znamienko mení význam',
                phrases: [
                  { es: 'koza', en: 'zviera, ktoré mečí', lang: SK },
                  { es: 'koža', en: 'pokrýva naše telo', lang: SK },
                  { es: 'sud', en: 'veľká drevená nádoba', lang: SK },
                  { es: 'súd', en: 'tam rozhoduje sudca', lang: SK },
                  { es: 'rad', en: 'ľudia stoja jeden za druhým', lang: SK },
                  { es: 'rád', en: 'mám niečo rád', lang: SK },
                ],
                text: '<p>Jedno znamienko a slovo znamená niečo úplne iné. Preto na znamienka pri písaní <b>nikdy nezabúdaj</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Dĺžeň</b>: á, é, í, ó, ú, ý, ĺ, ŕ.',
                  '<b>Mäkčeň</b>: č, ď, ľ, ň, š, ť, ž, dž.',
                  '<b>Vokáň</b> je len nad ô, <b>dve bodky</b> len nad ä.',
                  'Znamienko mení význam: <b>koza – koža</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako sa volá znamienko nad ô?',
                options: ['dĺžeň', 'mäkčeň', 'vokáň', 'dve bodky'], answer: 'vokáň',
                explain: 'Nad ô píšeme <b>vokáň</b>.', hint: 'je len nad jedným písmenom.' },
              { type: 'choice', prompt: 'Ktoré slovo znamená to, čo pokrýva naše telo?',
                options: ['koza', 'kosa', 'koža', 'kozy'], answer: 'koža',
                explain: '<b>Koža</b> s mäkčeňom. Koza je zviera.', hint: 'hľadaj slovo so znamienkom.' },
              { type: 'choice', prompt: 'V ktorom slove je dĺžeň?',
                options: ['koza', 'pes', 'koža', 'látka'], answer: 'látka',
                explain: 'V slove <b>látka</b> je á s dĺžňom.', hint: 'dĺžeň je čiarka nad samohláskou.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Nad písmenom š je mäkčeň.', answer: true,
                explain: '<b>Pravda.</b> š, č, ž majú mäkčeň.', hint: 'pozri kartičku s mäkčeňom.' },
            ],
          },
        ],
      },
    ],
  });
})();
