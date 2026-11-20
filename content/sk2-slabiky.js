'use strict';

/* Slovenčina · 2. ročník · Slabiky a slová (iŠVP 2015: analytické činnosti). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BLUE = '#4C6A92';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  // A word split into syllable blocks, with a clap above each.
  function syllables(parts, y = 96) {
    const widths = parts.map((p) => 22 + p.length * 15);
    const total = widths.reduce((a, b) => a + b, 0) + (parts.length - 1) * 10;
    let x = 160 - total / 2;
    return parts.map((p, i) => {
      const w = widths[i];
      const out = `<g ${pop((0.3 + i * 0.6).toFixed(1))}>
        <rect x="${x.toFixed(1)}" y="${y}" width="${w}" height="50" rx="12" fill="${i % 2 ? '#FFE9E2' : '#E6EDF5'}" stroke="${i % 2 ? CORAL : BLUE}" stroke-width="2.5"/>
        <text x="${(x + w / 2).toFixed(1)}" y="${y + 33}" text-anchor="middle" ${T} font-size="24" fill="${INK}">${p}</text>
        <text x="${(x + w / 2).toFixed(1)}" y="${y - 14}" text-anchor="middle" ${T} font-size="15" fill="#C2412A">tlesk!</text>
      </g>`;
      x += w + 10;
      return out;
    }).join('');
  }

  const CLAP = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Slovo jahoda rozdelené na tri slabiky ja, ho, da. Nad každou slabikou tlesknutie.">
    ${syllables(['ja', 'ho', 'da'])}
    <text x="160" y="186" text-anchor="middle" ${T} font-size="16" fill="${KELP}" ${pop(2.2)}>3 tlesknutia = 3 slabiky</text>
  </svg>`;

  const LINE_END = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Riadky v zošite. Na konci prvého riadka je napísané ko- so spojovníkom a na ďalšom riadku pokračuje lobežka.">
    <rect x="20" y="20" width="280" height="160" rx="10" fill="#FFFFFF" stroke="${BLUE}" stroke-width="2"/>
    <path d="M36 70 H284 M36 120 H284 M36 170 H284" stroke="#C9C4E0" stroke-width="1.5"/>
    <text x="40" y="64" ${T} font-size="20" fill="#4A4566">Na dvore stojí ko<tspan fill="#C2412A">-</tspan></text>
    <text x="40" y="114" ${T} font-size="20" fill="#4A4566">lobežka a bicykel.</text>
    <path class="a-bob" d="M262 40 l8 10 l8 -10" fill="none" stroke="${CORAL}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="160" y="160" text-anchor="middle" ${T} font-size="14" fill="${KELP}">delíme podľa slabík a píšeme spojovník</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'sk2-slabiky',
    subject: 'Slovenčina',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Slabiky a slová',
    blurb: 'Tlieskame slabiky, delíme slová a učíme sa ich rozdeliť na konci riadka.',
    artBg: '#F3F6FA',
    units: [
      {
        title: 'Slabika',
        lessons: [
          {
            id: 'sk2-slabiky-slabika',
            title: 'Slabika a delenie slov',
            minutes: 8,
            slides: [
              {
                title: 'Tlieskame slabiky',
                art: CLAP,
                text: '<p>Keď slovo pomaly vytlieskaš, každé tlesknutie je jedna <b>slabika</b>. Jahoda má 3 slabiky: <b>ja-ho-da</b>. V každej slabike je samohláska alebo dvojhláska.</p>',
              },
              {
                title: 'Vytlieskaj so mnou',
                phrases: [
                  { es: 'pes', en: '1 slabika: pes', lang: SK },
                  { es: 'mama', en: '2 slabiky: ma-ma', lang: SK },
                  { es: 'jahoda', en: '3 slabiky: ja-ho-da', lang: SK },
                  { es: 'kolobežka', en: '4 slabiky: ko-lo-bež-ka', lang: SK },
                ],
                text: '<p>Slová s jednou slabikou sú <b>jednoslabičné</b> (pes, dom). Slová s viacerými slabikami sú <b>viacslabičné</b> (mama, jahoda).</p>',
              },
              {
                title: 'Dvojhláska sa nedelí',
                cards: [
                  { front: 'mlieko', back: 'mlie-ko', lang: SK },
                  { front: 'piatok', back: 'pia-tok', lang: SK },
                  { front: 'kôň', back: 'jedna slabika: kôň', lang: SK },
                  { front: 'vlk', back: 'jedna slabika aj bez samohlásky', lang: SK },
                ],
                text: '<p><b>Dvojhláska</b> ostáva vždy v jednej slabike: mlie-ko, nie mli-e-ko. Niekedy slabiku tvorí aj <b>r</b> alebo <b>l</b>: vlk, krk.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Slabiku spoznáš podľa <b>tlesknutia</b>.',
                  '<b>Jednoslabičné</b> slová: pes, dom. <b>Viacslabičné</b>: ma-ma, ja-ho-da.',
                  'Dvojhlásku <b>nedelíme</b>: mlie-ko.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko slabík má slovo lopta?',
                options: ['1', '3', '2', '4'], answer: '2',
                explain: '<b>lop-ta</b>: 2 slabiky.', hint: 'vytlieskaj si ho.' },
              { type: 'choice', prompt: 'Ako rozdelíš slovo mlieko na slabiky?',
                options: ['ml-ie-ko', 'mli-e-ko', 'mlie-ko', 'm-lieko'], answer: 'mlie-ko',
                explain: '<b>mlie-ko</b>: dvojhláska ie ostáva spolu.', hint: 'dvojhlásku nedelíme.' },
              { type: 'order', prompt: 'Zoraď slabiky slova kolobežka.',
                items: ['ko', 'lo', 'bež', 'ka'],
                explain: '<b>ko-lo-bež-ka</b>: 4 slabiky.', hint: 'vytlieskaj si ho.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Slovo dom je jednoslabičné.', answer: true,
                explain: '<b>Pravda.</b> dom má jednu slabiku.', hint: 'koľkokrát tlesneš?' },
            ],
          },
          {
            id: 'sk2-slabiky-riadok',
            title: 'Rozdeľovanie slov na konci riadka',
            minutes: 7,
            slides: [
              {
                title: 'Slovo sa nezmestí',
                art: LINE_END,
                text: '<p>Keď sa slovo nezmestí na koniec riadka, <b>rozdelíme ho podľa slabík</b>. Na koniec riadka napíšeme <b>spojovník</b> (-) a slovo dokončíme na ďalšom riadku.</p>',
              },
              {
                title: 'Pravidlá delenia',
                cards: [
                  { front: 'ja-hoda', back: 'správne: delím za slabikou', lang: SK },
                  { front: 'pes', back: 'jednoslabičné slovo nedelím', lang: SK },
                  { front: 'o-blok', back: 'nesprávne: jedno písmeno nenechám samé', lang: SK },
                  { front: 'mli-eko', back: 'nesprávne: dvojhlásku nedelím', lang: SK },
                ],
                text: '<p>Otoč kartičky. Na riadku nikdy nenecháme samotné písmeno a nikdy nedelíme jednoslabičné slová.</p>',
              },
              {
                title: 'Vypočuj si a rozdeľ',
                phrases: [
                  { es: 'škola', en: 'ško-la', lang: SK },
                  { es: 'ceruzka', en: 'ce-ruz-ka', lang: SK },
                  { es: 'okno', en: 'ok-no', lang: SK },
                  { es: 'lienka', en: 'lien-ka', lang: SK },
                ],
                text: '<p>Najprv si slovo vytlieskaj, potom ho rozdeľ.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Na konci riadka delíme <b>podľa slabík</b> a píšeme <b>spojovník</b>.',
                  '<b>Jednoslabičné</b> slová nedelíme.',
                  'Nenecháme na riadku <b>jedno písmeno</b> a nedelíme <b>dvojhlásku</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako môžeš rozdeliť slovo škola na konci riadka?',
                options: ['šk-ola', 'ško-la', 'š-kola', 'škol-a'], answer: 'ško-la',
                explain: '<b>ško-la</b>: delíme podľa slabík.', hint: 'vytlieskaj ho.' },
              { type: 'choice', prompt: 'Ktoré slovo na konci riadka nerozdelíš?',
                options: ['mama', 'dom', 'lopta', 'auto'], answer: 'dom',
                explain: '<b>dom</b> má jednu slabiku, nedelíme ho.', hint: 'hľadaj jednoslabičné slovo.' },
              { type: 'choice', prompt: 'Aké znamienko píšeš na koniec riadka pri delení slova?',
                options: ['bodku', 'spojovník', 'čiarku', 'otáznik'], answer: 'spojovník',
                explain: 'Píšeme <b>spojovník</b> (-).', hint: 'je to krátka vodorovná čiarka.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Slovo okno môžem rozdeliť o-kno.', answer: false,
                explain: '<b>Nepravda.</b> Nenecháme samé písmeno, správne je ok-no.', hint: 'jedno písmeno nenecháme samé.' },
            ],
          },
        ],
      },
    ],
  });
})();
