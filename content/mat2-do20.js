'use strict';

/* Matematika · 2. ročník · Sčítanie a odčítanie do 20 s prechodom cez 10 (iŠVP 2015). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const MAG = '#A43CB4';   // subject colour: what we already have
  const CORAL = '#FF7A59'; // what we add or take away
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';

  // A ten frame (2 rows of 5) at x, y. `have` dots in MAG, then `add` dots in CORAL that pop in one by one.
  function tenFrame(x, y, have, add = 0, delay = 0.4) {
    let out = `<rect x="${x}" y="${y}" width="136" height="58" rx="8" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/>`;
    for (let i = 1; i < 5; i++) out += `<path d="M${x + i * 27.2} ${y} V${y + 58}" stroke="${INK}" stroke-width="1.5" opacity="0.35"/>`;
    out += `<path d="M${x} ${y + 29} H${x + 136}" stroke="${INK}" stroke-width="1.5" opacity="0.35"/>`;
    for (let i = 0; i < Math.min(10, have + add); i++) {
      const cx = x + 13.6 + (i % 5) * 27.2;
      const cy = y + 14.5 + Math.floor(i / 5) * 29;
      const extra = i >= have;
      const anim = extra ? ` class="a-pop" style="animation-delay: ${(delay + (i - have) * 0.35).toFixed(2)}s; transform-box: fill-box; transform-origin: center"` : '';
      out += `<circle${anim} cx="${cx.toFixed(1)}" cy="${cy}" r="10" fill="${extra ? CORAL : MAG}"/>`;
    }
    return out;
  }

  // A number line from `from` to `to` at height y, with jumps [[a, b, label], …] drawn on replay.
  function numberLine(from, to, jumps, y = 140) {
    const x0 = 24; const x1 = 296;
    const px = (n) => x0 + ((n - from) / (to - from)) * (x1 - x0);
    let out = `<path d="M${x0 - 8} ${y} H${x1 + 8}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    for (let n = from; n <= to; n++) {
      const big = n % 5 === 0;
      out += `<path d="M${px(n).toFixed(1)} ${y - (big ? 8 : 5)} V${y + (big ? 8 : 5)}" stroke="${INK}" stroke-width="${big ? 3 : 2}"/>`;
      out += `<text x="${px(n).toFixed(1)}" y="${y + 28}" text-anchor="middle" ${T} font-size="${n === 10 ? 15 : 12}" fill="${n === 10 ? MAG : '#4A4566'}">${n}</text>`;
    }
    jumps.forEach(([a, b, label], i) => {
      const xa = px(a); const xb = px(b); const h = 26 + Math.abs(b - a) * 8; const d = b > a ? 1 : -1;
      out += `<g class="ap-note" style="--d: ${(0.2 + i * 1.1).toFixed(1)}s">
        <path d="M${xa.toFixed(1)} ${y - 6} Q ${((xa + xb) / 2).toFixed(1)} ${y - 6 - h * 2} ${xb.toFixed(1)} ${y - 6}" fill="none" stroke="${i ? CORAL : MAG}" stroke-width="4" stroke-linecap="round"/>
        <path d="M${(xb - 7 * d).toFixed(1)} ${y - 16} L${xb.toFixed(1)} ${y - 6} L${(xb + 3 * d).toFixed(1)} ${y - 18}" fill="none" stroke="${i ? CORAL : MAG}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="${((xa + xb) / 2).toFixed(1)}" y="${(y - 14 - h).toFixed(1)}" text-anchor="middle" ${T} font-size="15" fill="${i ? '#C2412A' : '#74237F'}">${label}</text>
      </g>`;
    });
    return out;
  }

  const FRAMES_8_5 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Dve desiatkové krabičky. V prvej je 8 fialových guličiek a doplnia sa 2 oranžové, takže je plná. Zvyšné 3 oranžové guličky idú do druhej krabičky. 8 plus 5 je 13.">
    <text x="160" y="30" text-anchor="middle" ${T} font-size="22" fill="${INK}">8 + 5 = ?</text>
    ${tenFrame(16, 56, 8, 2)}
    ${tenFrame(168, 56, 0, 3, 1.2)}
    <g class="a-pop" style="animation-delay: 2.4s; transform-box: fill-box; transform-origin: center">
      <text x="84" y="146" text-anchor="middle" ${T} font-size="18" fill="#74237F">plná desiatka</text>
      <text x="236" y="146" text-anchor="middle" ${T} font-size="18" fill="#C2412A">+ 3</text>
      <text x="160" y="184" text-anchor="middle" ${T} font-size="24" fill="${KELP}">10 + 3 = 13</text>
    </g>
  </svg>`;

  const LINE_8_5 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Číselná os od 5 do 15. Prvý skok ide z 8 na 10 o 2, druhý skok z 10 na 13 o 3.">
    <text x="160" y="30" text-anchor="middle" ${T} font-size="20" fill="${INK}">8 + 5 = 8 + 2 + 3</text>
    ${numberLine(5, 15, [[8, 10, '+ 2'], [10, 13, '+ 3']])}
  </svg>`;

  const QUIZ_9_4 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Desiatková krabička s 9 fialovými guličkami a vedľa nej 4 oranžové guličky, ktoré treba pridať.">
    <text x="160" y="34" text-anchor="middle" ${T} font-size="24" fill="${INK}">9 + 4 = ?</text>
    ${tenFrame(30, 70, 9)}
    ${[0, 1, 2, 3].map((i) => `<circle cx="${206 + (i % 2) * 28}" cy="${84 + Math.floor(i / 2) * 29}" r="10" fill="${CORAL}"/>`).join('')}
  </svg>`;

  // A crossed-out dot: what we take away.
  const cross = (cx, cy, delay) => `<g class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"><circle cx="${cx}" cy="${cy}" r="12" fill="#FFFFFF" opacity="0.6"/><path d="M${cx - 8} ${cy - 8} L${cx + 8} ${cy + 8} M${cx + 8} ${cy - 8} L${cx - 8} ${cy + 8}" stroke="${CORAL}" stroke-width="4" stroke-linecap="round"/></g>`;
  const cell = (x, y, i) => [x + 13.6 + (i % 5) * 27.2, y + 14.5 + Math.floor(i / 5) * 29];

  const FRAMES_13_5 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Plná desiatková krabička a vedľa nej 3 guličky. Najprv sa prečiarknu 3 guličky v druhej krabičke, potom 2 v plnej desiatke. Zostane 8.">
    <text x="160" y="30" text-anchor="middle" ${T} font-size="22" fill="${INK}">13 − 5 = ?</text>
    ${tenFrame(16, 56, 10)}
    ${tenFrame(168, 56, 3)}
    ${[2, 1, 0].map((i, k) => { const [cx, cy] = cell(168, 56, i); return cross(+cx.toFixed(1), cy, (0.4 + k * 0.35).toFixed(2)); }).join('')}
    ${[9, 8].map((i, k) => { const [cx, cy] = cell(16, 56, i); return cross(+cx.toFixed(1), cy, (1.6 + k * 0.35).toFixed(2)); }).join('')}
    <g class="a-pop" style="animation-delay: 2.5s; transform-box: fill-box; transform-origin: center">
      <text x="236" y="146" text-anchor="middle" ${T} font-size="18" fill="#C2412A">− 3</text>
      <text x="84" y="146" text-anchor="middle" ${T} font-size="18" fill="#C2412A">− 2</text>
      <text x="160" y="184" text-anchor="middle" ${T} font-size="24" fill="${KELP}">13 − 5 = 8</text>
    </g>
  </svg>`;

  const LINE_13_5 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Číselná os od 5 do 15. Prvý skok ide späť z 13 na 10 o 3, druhý skok z 10 na 8 o 2.">
    <text x="160" y="30" text-anchor="middle" ${T} font-size="20" fill="${INK}">13 − 5 = 13 − 3 − 2</text>
    ${numberLine(5, 15, [[13, 10, '− 3'], [10, 8, '− 2']])}
  </svg>`;

  // n plates in a row, each with k apples.
  function plates(n, k, label = '') {
    const w = 300 / n;
    let out = '';
    for (let p = 0; p < n; p++) {
      const cx = 10 + w * p + w / 2;
      out += `<g class="a-pop" style="animation-delay: ${(0.2 + p * 0.4).toFixed(1)}s; transform-box: fill-box; transform-origin: center">
        <ellipse cx="${cx.toFixed(1)}" cy="120" rx="${Math.min(34, w / 2 - 4).toFixed(1)}" ry="16" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/>`;
      for (let a = 0; a < k; a++) {
        const ax = cx + (a - (k - 1) / 2) * 15;
        const ay = 104 - (a % 2) * 10;
        out += `<circle cx="${ax.toFixed(1)}" cy="${ay}" r="9" fill="#E5484D"/><path d="M${ax.toFixed(1)} ${ay - 9} l2 -5" stroke="#1F8A4C" stroke-width="3" stroke-linecap="round"/>`;
      }
      out += '</g>';
    }
    if (label) out += `<text x="160" y="176" text-anchor="middle" ${T} font-size="22" fill="${KELP}" class="a-pop" style="animation-delay: ${(0.4 + n * 0.4).toFixed(1)}s; transform-box: fill-box; transform-origin: center">${label}</text>`;
    return out;
  }

  const PLATES_3_2 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri taniere, na každom 2 jablká. 2 plus 2 plus 2 je 6.">
    <text x="160" y="34" text-anchor="middle" ${T} font-size="18" fill="${INK}">3 taniere, na každom 2 jablká</text>
    ${plates(3, 2, '2 + 2 + 2 = 6')}
  </svg>`;

  const QUIZ_PLATES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štyri taniere, na každom 3 jablká.">
    ${plates(4, 3)}
  </svg>`;

  const STEP_ICONS = [
    ['Čítam', 'M-11 -8 h8 a3 3 0 0 1 3 3 v14 a3 3 0 0 0 -3 -2 h-8z M11 -8 h-8 a3 3 0 0 0 -3 3 v14 a3 3 0 0 1 3 -2 h8z'],
    ['Zapíšem', 'M-8 8 l12 -12 l4 4 l-12 12 h-4z'],
    ['Vypočítam', 'M-9 -4 h8 M-5 -8 v8 M2 -4 h8 M-9 7 h8 M2 5 h8 M2 9 h8'],
    ['Odpovedám', 'M-11 -9 h22 v13 h-11 l-6 6 v-6 h-5z'],
  ];
  const STEPS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štyri kroky slovnej úlohy za sebou: čítam, zapíšem, vypočítam, odpovedám.">
    ${STEP_ICONS.map(([label, icon], i) => {
      const x = 42 + i * 79;
      const c = i === 3 ? KELP : MAG;
      return `<g class="ap-note" style="--d: ${(0.2 + i * 0.6).toFixed(1)}s">
        <circle cx="${x}" cy="96" r="30" fill="${i === 3 ? '#E0F4E8' : '#F6E6F8'}" stroke="${c}" stroke-width="3"/>
        <g transform="translate(${x} 96)" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="${icon}"/></g>
        <text x="${x}" y="56" text-anchor="middle" ${T} font-size="15" fill="#4A4566">${i + 1}.</text>
        <text x="${x}" y="150" text-anchor="middle" ${T} font-size="13" fill="${INK}">${label}</text>
      </g>`;
    }).join('')}
  </svg>`;

  // Two rows of apples to compare: 12 red and 7 green; the 5 without a pair are circled.
  const COMPARE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Rad 12 červených jabĺk a pod ním rad 7 zelených. Päť červených jabĺk nemá dvojicu: červených je o 5 viac.">
    <text x="16" y="30" ${T} font-size="14" fill="${INK}">12 červených</text>
    ${Array.from({ length: 12 }, (_, i) => `<circle cx="${28 + i * 24}" cy="58" r="10" fill="#E5484D"/>`).join('')}
    ${Array.from({ length: 7 }, (_, i) => `<circle cx="${28 + i * 24}" cy="98" r="10" fill="#30A46C"/>`).join('')}
    <text x="16" y="132" ${T} font-size="14" fill="${INK}">7 zelených</text>
    <rect class="a-pop" style="animation-delay: 0.6s; transform-box: fill-box; transform-origin: center" x="182" y="42" width="124" height="32" rx="16" fill="none" stroke="${CORAL}" stroke-width="3"/>
    <text x="160" y="180" text-anchor="middle" ${T} font-size="22" fill="${KELP}" class="a-pop" style="animation-delay: 1.2s; transform-box: fill-box; transform-origin: center">12 − 7 = 5, o 5 viac</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'mat2-do20',
    subject: 'Matematika',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Sčítanie a odčítanie do 20 s prechodom',
    blurb: 'Doplň do desiatky a pokračuj ďalej: príklady ako 8 + 5 a 13 − 5 aj slovné úlohy.',
    artBg: '#FBF5FC',
    units: [
      {
        title: 'Prechod cez desiatku',
        lessons: [
          {
            id: 'mat2-do20-scitanie',
            title: 'Prechod cez desiatku pri sčítaní',
            minutes: 9,
            slides: [
              {
                title: 'Najprv naplň desiatku',
                art: FRAMES_8_5,
                text: '<p>Máme <b>8</b> guličiek a pridáme <b>5</b>. Najprv dáme do krabičky toľko, aby bola <b>plná desiatka</b>: stačia 2. Zvyšné <b>3</b> idú do novej krabičky. Spolu je to <b>13</b>.</p>',
              },
              {
                title: 'Kamaráti čísla 10',
                cards: [
                  { front: '9 a 1', back: '9 + 1 = 10', lang: SK },
                  { front: '8 a 2', back: '8 + 2 = 10', lang: SK },
                  { front: '7 a 3', back: '7 + 3 = 10', lang: SK },
                  { front: '6 a 4', back: '6 + 4 = 10', lang: SK },
                  { front: '5 a 5', back: '5 + 5 = 10', lang: SK },
                ],
                text: '<p>Tieto dvojice spolu dajú <b>10</b>. Keď ich vieš naspamäť, prechod cez desiatku je hračka. Ťukni na kartičku a vypočuj si ju.</p>',
              },
              {
                title: 'Krok za krokom',
                art: LINE_8_5,
                replay: 'Skákať znova',
                autoplay: true,
                text: '<p>Číslo <b>5</b> si rozložíme na <b>2</b> a <b>3</b>. Najprv skočíme o 2 na <b>10</b>, potom o 3 na <b>13</b>.</p>',
              },
              {
                title: 'Vypočuj si postup',
                phrases: [
                  { es: '8 + 5 = 13', en: '8 + 2 = 10, potom 10 + 3 = 13', lang: SK },
                  { es: '7 + 6 = 13', en: '7 + 3 = 10, potom 10 + 3 = 13', lang: SK },
                  { es: '9 + 4 = 13', en: '9 + 1 = 10, potom 10 + 3 = 13', lang: SK },
                  { es: '6 + 8 = 14', en: '6 + 4 = 10, potom 10 + 4 = 14', lang: SK },
                ],
                text: '<p>Vždy sa najprv opýtaj: <b>koľko chýba do desiatky?</b> Potom pridaj zvyšok.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Najprv <b>doplň do 10</b>: pri 8 chýbajú 2, pri 7 chýbajú 3.',
                  'Druhé číslo si <b>rozlož</b>: 5 = 2 + 3.',
                  'Potom pridaj <b>zvyšok</b> k desiatke: 10 + 3 = 13.',
                  'Kamaráti čísla 10: 9 + 1, 8 + 2, 7 + 3, 6 + 4, 5 + 5.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko chýba číslu 7 do desiatky?',
                options: ['2', '4', '3', '7'], answer: '3',
                explain: '<b>7 + 3 = 10</b>, takže chýbajú 3.', hint: 'spomeň si na kamarátov čísla 10.' },
              { type: 'choice', prompt: 'Koľko je 9 + 4?', art: QUIZ_9_4,
                options: ['12', '14', '5', '13'], answer: '13',
                explain: '9 + 1 = 10 a potom 10 + 3 = <b>13</b>.', hint: 'jedna gulička doplní krabičku, koľko ich zostane?' },
              { type: 'order', prompt: 'Zoraď kroky pre príklad 8 + 6.',
                items: ['Rozložím 6 na 2 a 4', '8 + 2 = 10', '10 + 4 = 14'],
                explain: 'Najprv rozložím 6 = 2 + 4, doplním do desiatky (8 + 2 = 10) a pridám zvyšok: <b>10 + 4 = 14</b>.', hint: 'najprv rozkladáme, až potom počítame.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pri príklade 6 + 7 rozložím 7 na 4 a 3.', answer: true,
                explain: '<b>Pravda.</b> Číslu 6 chýbajú do desiatky 4, takže 7 = 4 + 3 a 6 + 7 = 13.', hint: 'koľko chýba číslu 6 do desiatky?' },
            ],
          },
          {
            id: 'mat2-do20-odcitanie',
            title: 'Prechod cez desiatku pri odčítaní',
            minutes: 9,
            slides: [
              {
                title: 'Najprv uber po desiatku',
                art: FRAMES_13_5,
                text: '<p>Máme <b>13</b> guličiek a <b>5</b> zoberieme. Najprv zoberieme <b>3</b> z druhej krabičky, aby zostala presne <b>desiatka</b>. Potom zoberieme ešte <b>2</b> z plnej krabičky. Zostane <b>8</b>.</p>',
              },
              {
                title: 'Krok za krokom',
                art: LINE_13_5,
                replay: 'Skákať znova',
                autoplay: true,
                text: '<p>Číslo <b>5</b> si rozložíme na <b>3</b> a <b>2</b>. Najprv skočíme späť o 3 na <b>10</b>, potom o 2 na <b>8</b>.</p>',
              },
              {
                title: 'Vypočuj si postup',
                phrases: [
                  { es: '12 − 4 = 8', en: '12 − 2 = 10, potom 10 − 2 = 8', lang: SK },
                  { es: '15 − 7 = 8', en: '15 − 5 = 10, potom 10 − 2 = 8', lang: SK },
                  { es: '11 − 3 = 8', en: '11 − 1 = 10, potom 10 − 2 = 8', lang: SK },
                  { es: '16 − 9 = 7', en: '16 − 6 = 10, potom 10 − 3 = 7', lang: SK },
                ],
                text: '<p>Vždy sa najprv opýtaj: <b>koľko musím zobrať, aby zostala desiatka?</b> Potom zober zvyšok.</p>',
              },
              {
                title: 'Odčítanie a sčítanie sú kamaráti',
                cards: [
                  { front: '13 − 5 = 8', back: 'skúška: 8 + 5 = 13', lang: SK },
                  { front: '14 − 6 = 8', back: 'skúška: 8 + 6 = 14', lang: SK },
                  { front: '12 − 9 = 3', back: 'skúška: 3 + 9 = 12', lang: SK },
                  { front: '17 − 8 = 9', back: 'skúška: 9 + 8 = 17', lang: SK },
                ],
                text: '<p>Výsledok si overíš <b>skúškou</b>: k výsledku pripočítaj to, čo si zobral. Musí ti vyjsť číslo, z ktorého si začínal. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Najprv uber <b>po desiatku</b>: z 13 zober 3.',
                  'Druhé číslo si <b>rozlož</b>: 5 = 3 + 2.',
                  'Od desiatky zober <b>zvyšok</b>: 10 − 2 = 8.',
                  '<b>Skúška</b>: 8 + 5 = 13, takže 13 − 5 = 8 je správne.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko je 14 − 6?',
                options: ['9', '7', '8', '10'], answer: '8',
                explain: '14 − 4 = 10 a potom 10 − 2 = <b>8</b>.', hint: 'najprv zober 4, aby zostala desiatka.' },
              { type: 'choice', prompt: 'Ako rozložíš číslo 5 pri príklade 12 − 5?',
                options: ['3 a 2', '2 a 3', '4 a 1', '5 a 0'], answer: '2 a 3',
                explain: 'Najprv zoberieme <b>2</b> (12 − 2 = 10), potom <b>3</b> (10 − 3 = 7).', hint: 'koľko musíš zobrať z 12, aby zostala desiatka?' },
              { type: 'order', prompt: 'Zoraď kroky pre príklad 15 − 8.',
                items: ['Rozložím 8 na 5 a 3', '15 − 5 = 10', '10 − 3 = 7'],
                explain: 'Najprv rozložím 8 = 5 + 3, uberiem po desiatku (15 − 5 = 10) a potom zvyšok: <b>10 − 3 = 7</b>.', hint: 'najprv rozkladáme, až potom počítame.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Skúška príkladu 13 − 5 = 8 je 8 + 5 = 13.', answer: true,
                explain: '<b>Pravda.</b> K výsledku 8 pripočítame 5 a vyjde 13, číslo, z ktorého sme začínali.', hint: 'pri skúške k výsledku pripočítaš to, čo si zobral.' },
            ],
          },
          {
            id: 'mat2-do20-rovnake',
            title: 'Rovnaké sčítance',
            minutes: 8,
            slides: [
              {
                title: 'Rovnaké skupinky',
                art: PLATES_3_2,
                text: '<p>Na každom tanieri sú <b>2</b> jablká. Tanierov sú <b>3</b>. Spolu je to <b>2 + 2 + 2 = 6</b>. Keď sčítavame stále to isté číslo, hovoríme, že sú to <b>rovnaké sčítance</b>.</p>',
              },
              {
                title: 'Koľkokrát po koľko?',
                phrases: [
                  { es: '2 + 2 + 2 = 6', en: '3-krát po 2', lang: SK },
                  { es: '5 + 5 = 10', en: '2-krát po 5', lang: SK },
                  { es: '3 + 3 + 3 = 9', en: '3-krát po 3', lang: SK },
                  { es: '4 + 4 + 4 + 4 = 16', en: '4-krát po 4', lang: SK },
                  { es: '2 + 2 + 2 + 2 + 2 = 10', en: '5-krát po 2', lang: SK },
                ],
                text: '<p>Spočítaj, <b>koľkokrát</b> sa číslo opakuje. 2 + 2 + 2 je <b>3-krát po 2</b>.</p>',
              },
              {
                title: 'Počítame po skupinkách',
                cards: [
                  { front: 'po 2', back: '2, 4, 6, 8, 10', lang: SK },
                  { front: 'po 3', back: '3, 6, 9, 12, 15', lang: SK },
                  { front: 'po 5', back: '5, 10, 15, 20', lang: SK },
                  { front: 'po 10', back: '10, 20, 30, 40', lang: SK },
                ],
                text: '<p>Rýchlejšie ako po jednom spočítaš veci <b>po dvoch</b>, <b>po troch</b> alebo <b>po piatich</b>. Otoč kartičky a pokračuj nahlas.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Rovnaké sčítance</b>: stále pripočítavam to isté číslo, napríklad 2 + 2 + 2.',
                  '2 + 2 + 2 = 6 je <b>3-krát po 2</b>.',
                  'Po dvoch počítam: 2, 4, 6, 8, 10.',
                  'V 3. ročníku z toho bude <b>násobenie</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorý príklad patrí k obrázku?', art: QUIZ_PLATES,
                options: ['4 + 4 + 4', '3 + 3 + 3 + 3', '3 + 4', '4 + 3 + 3'], answer: '3 + 3 + 3 + 3',
                explain: 'Sú tu <b>4 taniere</b> a na každom <b>3 jablká</b>: 3 + 3 + 3 + 3 = 12.', hint: 'koľko jabĺk je na jednom tanieri? Toľko sčítavaš.' },
              { type: 'choice', prompt: 'Koľko je 5 + 5 + 5?',
                options: ['10', '20', '55', '15'], answer: '15',
                explain: 'Po piatich: 5, 10, <b>15</b>.', hint: 'počítaj po piatich: 5, 10, …' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: '2 + 2 + 2 + 2 je 4-krát po 2.', answer: true,
                explain: '<b>Pravda.</b> Dvojka sa opakuje 4-krát, spolu je to 8.', hint: 'spočítaj, koľko dvojok tam je.' },
              { type: 'order', prompt: 'Počítaj po troch. Zoraď čísla.',
                items: ['3', '6', '9', '12'],
                explain: 'Po troch: 3, 6, 9, <b>12</b>. Vždy pridáme 3.', hint: 'začni trojkou a vždy pridaj 3.' },
            ],
          },
          {
            id: 'mat2-do20-ulohy',
            title: 'Slovné úlohy do 20',
            minutes: 10,
            slides: [
              {
                title: 'Ako riešime slovnú úlohu',
                art: STEPS,
                replay: 'Ukázať znova',
                autoplay: true,
                text: '<p>Úlohu si pozorne <b>prečítaj</b>. Potom <b>zapíš príklad</b>, <b>vypočítaj</b> ho a napíš celú <b>odpoveď</b> vetou.</p>',
              },
              {
                title: 'Dôležité slová',
                phrases: [
                  { es: 'o 5 viac', en: 'pripočítam: + 5', lang: SK },
                  { es: 'o 4 menej', en: 'odpočítam: − 4', lang: SK },
                  { es: 'spolu', en: 'sčítam všetko', lang: SK },
                  { es: 'o koľko viac?', en: 'od väčšieho čísla odčítam menšie', lang: SK },
                ],
                text: '<p><b>Miško má 8 guliek, Janka o 5 viac.</b> „O 5 viac“ znamená pripočítať: 8 + 5 = 13. <i>Odpoveď: Janka má 13 guliek.</i></p>',
              },
              {
                title: 'O koľko viac?',
                art: COMPARE,
                text: '<p><b>Na strome je 12 červených a 7 zelených jabĺk. O koľko viac je červených?</b> Spravíme dvojice. Päť červených zostane bez dvojice. Počítame <b>12 − 7 = 5</b>.</p>',
              },
              {
                title: 'Tri čísla a chýbajúce číslo',
                text: '<p><b>V autobuse sedí 6 detí. Nastúpi 5 a potom ešte 3.</b> Sčítame všetko: 6 + 5 + 3 = <b>14</b>.</p><p><b>Mám 9 nálepiek. Koľko mi chýba do 15?</b> Pýtame sa, čo treba pridať k 9: 15 − 9 = <b>6</b>. Skúška: 9 + 6 = 15.</p>',
                cards: [
                  { front: '6 + 5 + 3', back: '14 detí v autobuse', lang: SK },
                  { front: '15 − 9', back: 'chýba 6 nálepiek', lang: SK },
                ],
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Čítam, zapíšem, vypočítam, <b>odpovedám vetou</b>.',
                  '„O … viac“ je <b>+</b>, „o … menej“ je <b>−</b>.',
                  '„O koľko viac?“: od <b>väčšieho</b> odčítam <b>menšie</b>.',
                  'Keď chýba číslo, pýtam sa, čo treba pridať, a overím to skúškou.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Peter má 7 nálepiek, Eva o 6 viac. Koľko nálepiek má Eva?',
                options: ['1', '13', '12', '76'], answer: '13',
                explain: '„O 6 viac“ znamená pripočítať: 7 + 6 = <b>13</b>.', hint: 'o viac znamená plus.' },
              { type: 'choice', prompt: 'V košíku je 15 jabĺk a 8 hrušiek. O koľko viac je jabĺk?',
                options: ['23', '8', '6', '7'], answer: '7',
                explain: 'Od väčšieho odčítam menšie: 15 − 8 = <b>7</b>.', hint: 'pri „o koľko viac“ odčítavaš.' },
              { type: 'order', prompt: 'Zoraď kroky riešenia slovnej úlohy.',
                items: ['Prečítam úlohu', 'Zapíšem príklad', 'Vypočítam', 'Napíšem odpoveď'],
                explain: 'Najprv <b>čítam</b>, potom <b>zapíšem</b>, <b>vypočítam</b> a nakoniec <b>odpovedám</b> vetou.', hint: 'odpoveď píšeš až úplne na konci.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Slová „o 4 menej“ znamenajú, že odčítam 4.', answer: true,
                explain: '<b>Pravda.</b> O menej znamená mínus.', hint: 'menej je mínus.' },
            ],
          },
        ],
      },
    ],
  });
})();
