'use strict';

/* Hudobná výchova · 2. ročník · Rytmus a takt (iŠVP 2015: rytmické hodnoty, takt 2/4 a 3/4, rytmizácia). */
(() => {
  const { NOTE } = window.Octavo;
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const WINE = '#9E2B4F';   // subject colour
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  // Rhythm syllables to tone sequences. ta = one beat, ti-ti = two half beats, ta-a = two beats, pauza = one silent beat.
  const BEAT = 0.42;
  function rhythm(pattern, { hi = NOTE.G4, lo = NOTE.G4 } = {}) {
    const seq = [];
    pattern.split(' ').forEach((tok, i) => {
      const f = i === 0 ? hi : lo;
      if (tok === 'ta') seq.push([f, BEAT]);
      else if (tok === 'ti-ti') seq.push([f, BEAT / 2 - 0.025], [f, BEAT / 2 - 0.025]);
      else if (tok === 'ta-a') seq.push([f, BEAT * 2 + 0.05]);
      else if (tok === 'pauza') seq.push([0, BEAT]);
    });
    return seq;
  }
  // Bars with an accent (higher note) on the first beat.
  const meter = (beats, bars) => Array.from({ length: beats * bars }, (_, i) => [i % beats === 0 ? NOTE.C5 : NOTE.G4, BEAT]);

  // Notation drawing helpers.
  const head = (x, y, filled = true) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="7" transform="rotate(-20 ${x} ${y})" fill="${filled ? INK : '#FFFFFF'}" stroke="${INK}" stroke-width="2.5"/>`;
  const quarter = (x, y = 120) => `${head(x, y)}<path d="M${x + 8} ${y - 2} V${y - 52}" stroke="${INK}" stroke-width="2.5"/>`;
  const half = (x, y = 120) => `${head(x, y, false)}<path d="M${x + 8} ${y - 2} V${y - 52}" stroke="${INK}" stroke-width="2.5"/>`;
  const eighths = (x, y = 120, gap = 34) => `${head(x, y)}${head(x + gap, y)}<path d="M${x + 8} ${y - 2} V${y - 52} M${x + gap + 8} ${y - 2} V${y - 52}" stroke="${INK}" stroke-width="2.5"/><path d="M${x + 7} ${y - 52} H${x + gap + 9}" stroke="${INK}" stroke-width="7"/>`;
  const rest = (x, y = 100) => `<path d="M${x - 4} ${y - 26} l10 12 l-8 10 l10 12 q-12 -4 -8 8" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const label = (x, text, color = WINE) => `<text x="${x}" y="160" text-anchor="middle" ${T} font-size="16" fill="${color}">${text}</text>`;

  const TA_TITI = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štvrťová nota s pomocnou slabikou ta a dve spojené osminové noty s pomocnými slabikami ti-ti.">
    <g ${pop(0.2)}>${quarter(80)}${label(84, 'ta')}<text x="84" y="186" text-anchor="middle" ${T} font-size="12" fill="#4A4566">štvrťová nota</text></g>
    <g ${pop(0.8)}>${eighths(190)}${label(211, 'ti - ti')}<text x="211" y="186" text-anchor="middle" ${T} font-size="12" fill="#4A4566">dve osminové noty</text></g>
  </svg>`;

  const QUIZ_NOTES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Dve noty s číslami. Číslo 1: dve spojené osminové noty. Číslo 2: jedna štvrťová nota.">
    ${eighths(70)}${quarter(220)}
    <g ${T} font-size="20" fill="${WINE}" text-anchor="middle"><text x="91" y="166">1</text><text x="224" y="166">2</text></g>
  </svg>`;

  const HALF_REST = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Polová nota s prázdnou hlavičkou, ta-a, trvá dve doby. Štvrťová pomlčka znamená ticho na jednu dobu.">
    <g ${pop(0.2)}>${half(90)}${label(94, 'ta - a')}<text x="94" y="186" text-anchor="middle" ${T} font-size="12" fill="#4A4566">polová nota: 2 doby</text></g>
    <g ${pop(0.8)}>${rest(226)}${label(226, 'pauza', '#4A4566')}<text x="226" y="186" text-anchor="middle" ${T} font-size="12" fill="#4A4566">pomlčka: ticho</text></g>
  </svg>`;

  // Two bars of 2/4 and one bar of 3/4 with bar lines and accent marks.
  const METER = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Hore takt dve štvrtiny: dva takty po dvoch štvrťových notách, prvá v takte je dôrazná. Dole takt tri štvrtiny: tri štvrťové noty v takte.">
    <text x="16" y="70" ${T} font-size="18" fill="${WINE}">2/4</text>
    ${[0, 1, 2, 3].map((i) => quarter(76 + i * 52 + (i > 1 ? 16 : 0), 76).replace(/stroke-width="2.5"/g, 'stroke-width="2.2"')).join('')}
    <path d="M178 26 V84 M290 26 V84" stroke="${INK}" stroke-width="2"/>
    <g ${T} font-size="12" fill="${CORAL}"><text x="70" y="98">raz</text><text x="124" y="98">dva</text><text x="190" y="98">raz</text><text x="242" y="98">dva</text></g>
    <text x="16" y="160" ${T} font-size="18" fill="${WINE}">3/4</text>
    ${[0, 1, 2].map((i) => quarter(76 + i * 62, 166)).join('')}
    <path d="M232 116 V174" stroke="${INK}" stroke-width="2"/>
    <g ${T} font-size="12" fill="${CORAL}"><text x="70" y="190">raz</text><text x="132" y="190">dva</text><text x="194" y="190">tri</text></g>
  </svg>`;

  const STOMP = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Riekanka s rytmom. Dup, dup, dup: tri štvrťové noty a pomlčka. I-de mac-ko: dvakrát ti-ti.">
    <g ${T} font-size="15" fill="${INK}"><text x="16" y="40">Dup, dup, dup,</text><text x="16" y="86">i-de mac-ko,</text><text x="16" y="132">tlesk, tlesk, tlesk,</text><text x="16" y="178">tlies-ka zaj-ko.</text></g>
    <g ${T} font-size="14" fill="${WINE}"><text x="170" y="40">ta ta ta pauza</text><text x="170" y="86">ti-ti ti-ti</text><text x="170" y="132">ta ta ta pauza</text><text x="170" y="178">ti-ti ti-ti</text></g>
  </svg>`;

  // Buttons that play rhythms; data-rh holds the pattern or a meter id.
  const buttons = (items) => `<div class="control">${items.map(([lbl, rh]) => `<button type="button" class="btn-chip" data-rh="${rh}">▶ ${lbl}</button>`).join('')}</div>`;
  function wire(root, api) {
    root.querySelectorAll('[data-rh]').forEach((b) => b.addEventListener('click', () => {
      const rh = b.dataset.rh;
      const seq = rh === 'm2' ? meter(2, 3) : rh === 'm3' ? meter(3, 3) : rhythm(rh);
      if (!api.tone(seq)) api.toast('Zvuk na tomto zariadení nefunguje');
    }));
  }

  window.Octavo.addCourse({
    id: 'huv2-rytmus',
    subject: 'Hudobná výchova',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Rytmus a takt',
    blurb: 'Ta a ti-ti, polová nota a pomlčka, takt na dve a na tri a riekanky do rytmu.',
    artBg: '#FBF3F6',
    units: [
      {
        title: 'Rytmus',
        lessons: [
          {
            id: 'huv2-rytmus-tatiti',
            title: 'Ta a ti-ti',
            minutes: 8,
            slides: [
              {
                title: 'Štvrťová a osminové noty',
                art: TA_TITI,
                text: '<p><b>Štvrťová nota</b> trvá jednu dobu, ako jeden krok. Hovoríme jej <b>ta</b>. Dve <b>osminové noty</b> sú spolu rovnako dlhé ako jedna štvrťová, ako dva rýchle kroky: <b>ti-ti</b>.</p>',
              },
              {
                title: 'Vypočuj si rytmy',
                controls: buttons([['ta', 'ta ta ta ta'], ['ti-ti', 'ti-ti ti-ti ti-ti ti-ti'], ['ta ta ti-ti ta', 'ta ta ti-ti ta'], ['ti-ti ti-ti ta ta', 'ti-ti ti-ti ta ta']]),
                text: '<p>Ťukni na rytmus a tlieskaj spolu s ním. Pri <b>ta</b> tlesni raz, pri <b>ti-ti</b> dvakrát rýchlo.</p>',
                setup: wire,
              },
              {
                title: 'Ta a ti-ti v pohybe',
                cards: [
                  { front: 'ta', back: 'štvrťová nota: jeden krok', lang: SK },
                  { front: 'ti-ti', back: 'dve osminové noty: dva rýchle kroky', lang: SK },
                  { front: 'chôdza', back: 'ta, ta, ta, ta', lang: SK },
                  { front: 'beh', back: 'ti-ti, ti-ti, ti-ti', lang: SK },
                ],
                text: '<p>Choď po izbe: každý krok je <b>ta</b>. Rozbehni sa: kroky sú <b>ti-ti</b>. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Štvrťová nota</b> = <b>ta</b>, jedna doba.',
                  'Dve <b>osminové noty</b> = <b>ti-ti</b>, spolu jedna doba.',
                  'Chôdza je ta, beh je ti-ti.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Vypočuj si. Je to ta, alebo ti-ti?', tones: rhythm('ti-ti'),
                options: ['ta', 'ti-ti'], answer: 'ti-ti',
                explain: 'Počuli sme dva rýchle tóny: <b>ti-ti</b>.', hint: 'koľko tónov si počul?' },
              { type: 'choice', prompt: 'Vypočuj si rytmus. Ktorý to je?', tones: rhythm('ta ta ti-ti ta'),
                options: ['ti-ti ti-ti ta ta', 'ta ta ti-ti ta', 'ta ti-ti ta ta', 'ta ta ta ta'], answer: 'ta ta ti-ti ta',
                explain: 'Dva pomalé, dva rýchle a jeden pomalý: <b>ta ta ti-ti ta</b>.', hint: 'kde sú rýchle tóny?' },
              { type: 'choice', prompt: 'Ktorá nota je štvrťová?', art: QUIZ_NOTES,
                options: ['1', '2'], answer: '2',
                explain: 'Číslo <b>2</b> je štvrťová nota, ta. Číslo 1 sú dve osminové, ti-ti.', hint: 'štvrťová je samotná.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Dve osminové noty trvajú spolu rovnako dlho ako jedna štvrťová.', answer: true,
                explain: '<b>Pravda.</b> ti-ti trvá rovnako ako ta.', hint: 'dva rýchle kroky alebo jeden pomalý.' },
            ],
          },
          {
            id: 'huv2-rytmus-takt',
            title: 'Polová nota, pomlčka a takt',
            minutes: 9,
            slides: [
              {
                title: 'Dlhý tón a ticho',
                art: HALF_REST,
                text: '<p><b>Polová nota</b> má prázdnu hlavičku a trvá <b>dve doby</b>: ta-a. <b>Pomlčka</b> znamená <b>ticho</b>: na jej dobu nehráme ani nespievame, ale v duchu počítame ďalej.</p>',
              },
              {
                title: 'Takt na dve a na tri',
                art: METER,
                controls: buttons([['takt 2/4: raz, dva', 'm2'], ['takt 3/4: raz, dva, tri', 'm3']]),
                text: '<p>Doby sa spájajú do <b>taktov</b>, oddeľuje ich <b>taktová čiara</b>. Prvá doba v takte je <b>dôrazná</b>. V takte <b>2/4</b> počítame raz-dva, ako pri pochode. V takte <b>3/4</b> raz-dva-tri, ako pri valčíku. Vypočuj si ich.</p>',
                setup: wire,
              },
              {
                title: 'Zapamätaj si',
                cards: [
                  { front: 'polová nota', back: 'ta-a: trvá dve doby', lang: SK },
                  { front: 'pomlčka', back: 'ticho, nehráme', lang: SK },
                  { front: 'takt 2/4', back: 'raz-dva, napríklad pochod', lang: SK },
                  { front: 'takt 3/4', back: 'raz-dva-tri, napríklad valčík', lang: SK },
                  { front: 'taktová čiara', back: 'oddeľuje takty', lang: SK },
                ],
                text: '<p>Pri speve <b>taktujeme</b> rukou: na dôraznú dobu ruka ide dole. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Polová nota</b> = ta-a, dve doby.',
                  '<b>Pomlčka</b> = ticho.',
                  'Takt <b>2/4</b>: raz-dva. Takt <b>3/4</b>: raz-dva-tri.',
                  'Prvá doba v takte je <b>dôrazná</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Vypočuj si. Počítame na dve, alebo na tri?', tones: meter(3, 3),
                options: ['na dve (2/4)', 'na tri (3/4)'], answer: 'na tri (3/4)',
                explain: 'Vysoký dôrazný tón prichádza po každých troch: takt <b>3/4</b>.', hint: 'počítaj od vysokého tónu.' },
              { type: 'choice', prompt: 'Ako dlho trvá polová nota?',
                options: ['ako jedna štvrťová', 'ako dve štvrťové', 'ako jedna osminová', 'vôbec neznie'], answer: 'ako dve štvrťové',
                explain: 'Polová nota trvá <b>dve doby</b>, ako dve štvrťové.', hint: 'ta-a.' },
              { type: 'choice', prompt: 'Čo znamená pomlčka?',
                options: ['hráme silno', 'spievame vysoko', 'ticho, nehráme', 'zrýchlime'], answer: 'ticho, nehráme',
                explain: 'Pomlčka je <b>ticho</b>.', hint: 'pauza.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pochod má takt na dve: raz-dva.', answer: true,
                explain: '<b>Pravda.</b> Ľavá, pravá: raz-dva.', hint: 'ako kráčame?' },
            ],
          },
          {
            id: 'huv2-rytmus-riekanky',
            title: 'Rytmizácia riekaniek',
            minutes: 8,
            slides: [
              {
                title: 'Slová majú rytmus',
                phrases: [
                  { es: 'pes', en: 'ta: jedna slabika, jeden úder', lang: SK },
                  { es: 'mama', en: 'ti-ti: dve rýchle slabiky', lang: SK },
                  { es: 'jahoda', en: 'ti-ti ta: ja-ho rýchlo, da pomaly', lang: SK },
                  { es: 'kolobežka', en: 'ti-ti ti-ti', lang: SK },
                ],
                text: '<p>Keď slovo rytmicky vyslovíme, môžeme ho <b>vytlieskať</b>. Jedna slabika na celú dobu je <b>ta</b>, dve rýchle slabiky na jednu dobu sú <b>ti-ti</b>.</p>',
              },
              {
                title: 'Riekanka do rytmu',
                art: STOMP,
                controls: buttons([['Dup, dup, dup', 'ta ta ta pauza'], ['i-de mac-ko', 'ti-ti ti-ti'], ['celá riekanka', 'ta ta ta pauza ti-ti ti-ti ta ta ta pauza ti-ti ti-ti']]),
                text: '<p>Pri <b>dup</b> dupni nohou, pri <b>tlesk</b> tlesni. Rýchle riadky hovor <b>ti-ti</b>. Po troch dupnutiach je <b>pauza</b>.</p>',
                setup: wire,
              },
              {
                title: 'Hra na tele',
                cards: [
                  { front: 'tlieskanie', back: 'dlane o seba', lang: SK },
                  { front: 'plieskanie', back: 'dlaňami po stehnách', lang: SK },
                  { front: 'dupanie', back: 'nohami o zem', lang: SK },
                  { front: 'lúskanie', back: 'prstami', lang: SK },
                ],
                text: '<p>Naše telo je tiež hudobný nástroj. Vymysli si vlastný rytmus a zahraj ho na tele. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Slová a riekanky majú <b>rytmus</b>.',
                  'Jedna slabika na dobu: <b>ta</b>. Dve rýchle: <b>ti-ti</b>.',
                  'Rytmus hráme aj <b>na tele</b>: tlieskame, plieskame, dupeme, lúskame.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako vytlieskaš slovo mama?',
                options: ['ta', 'ta ta ta', 'ti-ti', 'pauza'], answer: 'ti-ti',
                explain: 'Ma-ma: dve rýchle slabiky, <b>ti-ti</b>.', hint: 'koľko slabík má mama?' },
              { type: 'choice', prompt: 'Vypočuj si. Ktorý riadok riekanky to je?', tones: rhythm('ta ta ta pauza'),
                options: ['i-de mac-ko', 'Dup, dup, dup', 'tlies-ka zaj-ko'], answer: 'Dup, dup, dup',
                explain: 'Tri pomalé tóny a ticho: <b>Dup, dup, dup</b>.', hint: 'pomalé alebo rýchle tóny?' },
              { type: 'choice', prompt: 'Čo je plieskanie?',
                options: ['dlane o seba', 'dlaňami po stehnách', 'nohami o zem', 'prstami'], answer: 'dlaňami po stehnách',
                explain: 'Plieskame <b>dlaňami po stehnách</b>.', hint: 'pozri kartičky.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Slovo pes vytlieskame jedným úderom, ta.', answer: true,
                explain: '<b>Pravda.</b> Pes má jednu slabiku.', hint: 'koľko slabík má pes?' },
            ],
          },
        ],
      },
    ],
  });
})();
