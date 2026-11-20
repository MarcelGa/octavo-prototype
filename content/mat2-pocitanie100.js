'use strict';

/* Matematika · 2. ročník · Sčítanie a odčítanie do 100 (iŠVP 2015). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const MAG = '#A43CB4';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  // Base-ten blocks: rods of ten and single cubes. color2 marks the part being added.
  function blocks(tens, ones, { x = 20, y = 40, addTens = 0, addOnes = 0 } = {}) {
    let out = '';
    for (let t = 0; t < tens + addTens; t++) {
      const added = t >= tens;
      const rx = x + t * 20 + (added ? 12 : 0);
      out += `<g ${pop((0.2 + t * 0.2).toFixed(2))}>`;
      for (let i = 0; i < 10; i++) out += `<rect x="${rx}" y="${y + i * 10}" width="15" height="9" rx="2" fill="${added ? CORAL : MAG}"/>`;
      out += '</g>';
    }
    const ox = x + (tens + addTens) * 20 + (addTens ? 24 : 12);
    for (let o = 0; o < ones + addOnes; o++) {
      const added = o >= ones;
      out += `<rect ${pop((0.4 + (tens + addTens) * 0.2 + o * 0.15).toFixed(2))} x="${ox + (o % 3) * 14}" y="${y + 90 - Math.floor(o / 3) * 12}" width="11" height="10" rx="2" fill="${added ? CORAL : MAG}"/>`;
    }
    return out;
  }

  const RODS_30_40 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri fialové desiatky a štyri oranžové desiatky. Spolu 7 desiatok, teda 70.">
    <text x="160" y="28" text-anchor="middle" ${T} font-size="20" fill="${INK}">30 + 40 = 70</text>
    ${blocks(3, 0, { x: 70, y: 46, addTens: 4 })}
    <text x="160" y="180" text-anchor="middle" ${T} font-size="17" fill="${KELP}" ${pop(1.8)}>3 desiatky + 4 desiatky = 7 desiatok</text>
  </svg>`;

  const BLOCKS_34_5 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri desiatky a štyri jednotky a k nim päť oranžových jednotiek. Desiatky ostanú 3, jednotiek je 9. Spolu 39.">
    <text x="160" y="28" text-anchor="middle" ${T} font-size="20" fill="${INK}">34 + 5 = 39</text>
    ${blocks(3, 4, { x: 90, y: 46, addOnes: 5 })}
    <text x="160" y="180" text-anchor="middle" ${T} font-size="17" fill="${KELP}" ${pop(2)}>desiatky ostanú, jednotky: 4 + 5 = 9</text>
  </svg>`;

  // A number line from `from` to `to` with jumps [[a, b, label], …] drawn on replay.
  function numberLine(from, to, jumps, y = 140) {
    const x0 = 24; const x1 = 296;
    const px = (n) => x0 + ((n - from) / (to - from)) * (x1 - x0);
    let out = `<path d="M${x0 - 8} ${y} H${x1 + 8}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    for (let n = from; n <= to; n++) {
      const big = n % 10 === 0;
      out += `<path d="M${px(n).toFixed(1)} ${y - (big ? 8 : 5)} V${y + (big ? 8 : 5)}" stroke="${INK}" stroke-width="${big ? 3 : 2}"/>`;
      out += `<text x="${px(n).toFixed(1)}" y="${y + 28}" text-anchor="middle" ${T} font-size="${big ? 14 : 11}" fill="${big ? MAG : '#4A4566'}">${n}</text>`;
    }
    jumps.forEach(([a, b, label], i) => {
      const xa = px(a); const xb = px(b); const h = 20 + Math.abs(b - a) * 5; const d = b > a ? 1 : -1;
      const c = i ? CORAL : MAG;
      out += `<g class="ap-note" style="--d: ${(0.2 + i * 1.1).toFixed(1)}s">
        <path d="M${xa.toFixed(1)} ${y - 6} Q ${((xa + xb) / 2).toFixed(1)} ${y - 6 - h * 2} ${xb.toFixed(1)} ${y - 6}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>
        <path d="M${(xb - 7 * d).toFixed(1)} ${y - 16} L${xb.toFixed(1)} ${y - 6} L${(xb + 3 * d).toFixed(1)} ${y - 18}" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <text x="${((xa + xb) / 2).toFixed(1)}" y="${(y - 14 - h).toFixed(1)}" text-anchor="middle" ${T} font-size="15" fill="${i ? '#C2412A' : '#74237F'}">${label}</text>
      </g>`;
    });
    return out;
  }

  const LINE_38_5 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Číselná os od 35 do 45. Skok z 38 na 40 o 2 a potom z 40 na 43 o 3.">
    <text x="160" y="30" text-anchor="middle" ${T} font-size="20" fill="${INK}">38 + 5 = 38 + 2 + 3 = 43</text>
    ${numberLine(35, 45, [[38, 40, '+ 2'], [40, 43, '+ 3']])}
  </svg>`;

  const LINE_42_7 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Číselná os od 34 do 44. Skok späť z 42 na 40 o 2 a potom z 40 na 35 o 5.">
    <text x="160" y="30" text-anchor="middle" ${T} font-size="20" fill="${INK}">42 − 7 = 42 − 2 − 5 = 35</text>
    ${numberLine(34, 44, [[42, 40, '− 2'], [40, 35, '− 5']])}
  </svg>`;

  // Written (column) arithmetic: digits right-aligned under D (desiatky) and J (jednotky).
  function column(top, bottom, op, result, { carry = '' } = {}) {
    const xD = 130; const xJ = 170;
    const digits = (n, y, color, delay) => {
      const s = String(n).padStart(2, ' ');
      return `<g ${delay != null ? pop(delay) : ''}><text x="${xD}" y="${y}" text-anchor="middle" ${T} font-size="34" fill="${color}">${s[0].trim()}</text><text x="${xJ}" y="${y}" text-anchor="middle" ${T} font-size="34" fill="${color}">${s[1]}</text></g>`;
    };
    const r = String(result);
    return `
    <text x="${xD}" y="30" text-anchor="middle" ${T} font-size="15" fill="#74237F">D</text>
    <text x="${xJ}" y="30" text-anchor="middle" ${T} font-size="15" fill="#C2412A">J</text>
    <rect x="${xJ - 20}" y="38" width="40" height="132" rx="10" fill="#FFE9E2" opacity="0.6"/>
    ${digits(top, 72, INK)}
    <text x="${xD - 44}" y="112" text-anchor="middle" ${T} font-size="32" fill="${INK}">${op}</text>
    ${digits(bottom, 112, INK)}
    <path d="M${xD - 56} 124 H${xJ + 24}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    ${carry ? `<text ${pop(0.6)} x="${xD}" y="48" text-anchor="middle" ${T} font-size="15" fill="${CORAL}">+${carry}</text>` : ''}
    <text ${pop(0.9)} x="${xJ}" y="160" text-anchor="middle" ${T} font-size="34" fill="${KELP}">${r[r.length - 1]}</text>
    ${r.length > 1 ? `<text ${pop(1.6)} x="${xD}" y="160" text-anchor="middle" ${T} font-size="34" fill="${KELP}">${r[0]}</text>` : ''}`;
  }

  const COL_34_25 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Písomné sčítanie 34 plus 25 pod sebou. Jednotky sú pod jednotkami, desiatky pod desiatkami. Výsledok 59.">
    ${column(34, 25, '+', 59)}
    <text x="250" y="80" text-anchor="middle" ${T} font-size="13" fill="#C2412A">4 + 5 = 9</text>
    <text x="250" y="104" text-anchor="middle" ${T} font-size="13" fill="#74237F">3 + 2 = 5</text>
  </svg>`;

  const COL_47_28 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Písomné sčítanie 47 plus 28. Jednotky: 7 plus 8 je 15, píšem 5 a 1 si pamätám. Desiatky: 4 plus 2 plus 1 je 7. Výsledok 75.">
    ${column(47, 28, '+', 75, { carry: '1' })}
    <text x="256" y="72" text-anchor="middle" ${T} font-size="12" fill="#C2412A">7 + 8 = 15</text>
    <text x="256" y="90" text-anchor="middle" ${T} font-size="12" fill="#C2412A">píšem 5,</text>
    <text x="256" y="106" text-anchor="middle" ${T} font-size="12" fill="#C2412A">1 si pamätám</text>
    <text x="256" y="134" text-anchor="middle" ${T} font-size="12" fill="#74237F">4 + 2 + 1 = 7</text>
  </svg>`;

  const COL_63_27 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Písomné odčítanie 63 mínus 27. Jednotky: 7 a koľko je 13? 6, píšem 6 a 1 si pamätám. Desiatky: 2 plus 1 je 3, 3 a koľko je 6? 3. Výsledok 36.">
    ${column(63, 27, '−', 36, { carry: '1' })}
    <text x="256" y="72" text-anchor="middle" ${T} font-size="12" fill="#C2412A">7 a koľko je 13?</text>
    <text x="256" y="90" text-anchor="middle" ${T} font-size="12" fill="#C2412A">6, píšem 6,</text>
    <text x="256" y="106" text-anchor="middle" ${T} font-size="12" fill="#C2412A">1 si pamätám</text>
    <text x="256" y="134" text-anchor="middle" ${T} font-size="12" fill="#74237F">2 + 1 = 3,</text>
    <text x="256" y="150" text-anchor="middle" ${T} font-size="12" fill="#74237F">3 a koľko je 6? 3</text>
  </svg>`;

  const SWAP = `
  <svg viewBox="0 0 320 200" role="img" aria-label="25 plus 8 aj 8 plus 25 dávajú 33. Sčítance si vymenia miesto a výsledok sa nezmení.">
    <text x="160" y="70" text-anchor="middle" ${T} font-size="32" fill="${INK}"><tspan fill="${MAG}">25</tspan> + <tspan fill="${CORAL}">8</tspan> = 33</text>
    <g class="a-bob"><path d="M118 88 C 130 112, 190 112, 202 88" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><path d="M196 92 L202 86 L206 94" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>
    <text x="160" y="150" text-anchor="middle" ${T} font-size="32" fill="${INK}" ${pop(0.8)}><tspan fill="${CORAL}">8</tspan> + <tspan fill="${MAG}">25</tspan> = 33</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'mat2-pocitanie100',
    subject: 'Matematika',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Sčítanie a odčítanie do 100',
    blurb: 'Od celých desiatok po písomné sčítanie a odčítanie pod sebou, so skúškou správnosti.',
    artBg: '#FBF5FC',
    units: [
      {
        title: 'Počítame spamäti',
        lessons: [
          {
            id: 'mat2-pocitanie100-desiatky',
            title: 'Počítame s celými desiatkami',
            minutes: 8,
            slides: [
              {
                title: 'Desiatky ako jednotky',
                art: RODS_30_40,
                text: '<p>30 sú 3 desiatky a 40 sú 4 desiatky. Spolu je to <b>7 desiatok = 70</b>. S desiatkami počítame rovnako ako s jednotkami: 3 + 4 = 7.</p>',
              },
              {
                title: 'Menia sa iba desiatky',
                phrases: [
                  { es: '30 + 40 = 70', en: '3 + 4 = 7, ale s desiatkami', lang: SK },
                  { es: '90 − 60 = 30', en: '9 − 6 = 3, ale s desiatkami', lang: SK },
                  { es: '56 + 20 = 76', en: 'jednotky ostanú, desiatky: 5 + 2', lang: SK },
                  { es: '74 − 30 = 44', en: 'jednotky ostanú, desiatky: 7 − 3', lang: SK },
                ],
                text: '<p>Keď pridávaš alebo uberáš <b>celé desiatky</b>, číslica jednotiek sa nemení: 5<b>6</b> + 20 = 7<b>6</b>.</p>',
              },
              {
                title: 'Spamäti',
                cards: [
                  { front: '20 + 50', back: '70', lang: SK },
                  { front: '80 − 30', back: '50', lang: SK },
                  { front: '43 + 30', back: '73', lang: SK },
                  { front: '65 − 40', back: '25', lang: SK },
                ],
                text: '<p>Najprv vypočítaj v hlave, potom otoč kartičku a skontroluj sa.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'S desiatkami počítam ako s jednotkami: 3 + 4 = 7, teda <b>30 + 40 = 70</b>.',
                  'Pri pridávaní celých desiatok sa <b>jednotky nemenia</b>: 56 + 20 = 76.',
                  'Rovnako pri uberaní: 74 − 30 = 44.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko je 50 + 30?',
                options: ['53', '8', '80', '20'], answer: '80',
                explain: '5 desiatok + 3 desiatky = <b>8 desiatok = 80</b>.', hint: 'počítaj 5 + 3, ale s desiatkami.' },
              { type: 'choice', prompt: 'Koľko je 67 + 20?',
                options: ['69', '47', '86', '87'], answer: '87',
                explain: 'Jednotky ostanú 7, desiatky 6 + 2 = 8: <b>87</b>.', hint: 'jednotky sa nemenia.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: '90 − 40 = 50', answer: true,
                explain: '<b>Pravda.</b> 9 − 4 = 5, takže 90 − 40 = 50.', hint: 'počítaj 9 − 4.' },
              { type: 'order', prompt: 'Zoraď príklady podľa výsledku, od najmenšieho.',
                items: ['10 + 10', '30 + 30', '20 + 50', '40 + 50'],
                explain: 'Výsledky sú 20, 60, 70 a <b>90</b>.', hint: 'najprv každý príklad vypočítaj.' },
            ],
          },
          {
            id: 'mat2-pocitanie100-bez',
            title: 'Bez prechodu cez desiatku',
            minutes: 9,
            slides: [
              {
                title: 'Jednotky k jednotkám',
                art: BLOCKS_34_5,
                text: '<p>K 34 pridáme 5 jednotiek. Desiatky sa nemenia, sčítame len jednotky: 4 + 5 = 9. Výsledok je <b>39</b>. Hovoríme <b>bez prechodu</b>, lebo jednotiek je menej ako 10.</p>',
              },
              {
                title: 'Dve dvojciferné čísla',
                text: '<p><b>34 + 25</b>: desiatky sčítame s desiatkami a jednotky s jednotkami.</p><p>30 + 20 = <b>50</b><br>4 + 5 = <b>9</b><br>50 + 9 = <b>59</b></p><p>Pri odčítaní je to rovnaké: <b>68 − 23</b>: 60 − 20 = 40, 8 − 3 = 5, spolu <b>45</b>.</p>',
              },
              {
                title: 'Vypočuj si príklady',
                phrases: [
                  { es: '43 + 5 = 48', en: 'jednotky: 3 + 5 = 8', lang: SK },
                  { es: '76 − 4 = 72', en: 'jednotky: 6 − 4 = 2', lang: SK },
                  { es: '34 + 25 = 59', en: '30 + 20 = 50 a 4 + 5 = 9', lang: SK },
                  { es: '68 − 23 = 45', en: '60 − 20 = 40 a 8 − 3 = 5', lang: SK },
                ],
                text: '<p>Ťukni na reproduktor a sleduj, čo sa deje s desiatkami a čo s jednotkami.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Desiatky</b> počítam s desiatkami, <b>jednotky</b> s jednotkami.',
                  '34 + 25: 50 a 9, spolu <b>59</b>.',
                  'Bez prechodu: jednotky spolu neprekročia 10.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko je 43 + 5?',
                options: ['48', '93', '47', '38'], answer: '48',
                explain: 'Desiatky ostanú 4, jednotky 3 + 5 = 8: <b>48</b>.', hint: 'pridávaš iba jednotky.' },
              { type: 'choice', prompt: 'Koľko je 76 − 4?',
                options: ['36', '80', '72', '73'], answer: '72',
                explain: 'Jednotky 6 − 4 = 2, desiatky ostanú: <b>72</b>.', hint: 'uberáš iba jednotky.' },
              { type: 'choice', prompt: 'Koľko je 52 + 36?',
                options: ['98', '88', '87', '16'], answer: '88',
                explain: '50 + 30 = 80 a 2 + 6 = 8, spolu <b>88</b>.', hint: 'desiatky s desiatkami, jednotky s jednotkami.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pri 34 + 25 sčítam 30 + 20 a 4 + 5.', answer: true,
                explain: '<b>Pravda.</b> 50 + 9 = 59.', hint: 'čo patrí k čomu?' },
            ],
          },
          {
            id: 'mat2-pocitanie100-s-prechodom',
            title: 'S prechodom cez desiatku',
            minutes: 10,
            slides: [
              {
                title: 'Doplň do celej desiatky',
                art: LINE_38_5,
                replay: 'Skákať znova',
                autoplay: true,
                text: '<p>Pri <b>38 + 5</b> najprv doskočíme na celú desiatku: 38 + 2 = <b>40</b>. Potom pridáme zvyšok: 40 + 3 = <b>43</b>. Je to ten istý trik ako pri počítaní do 20.</p>',
              },
              {
                title: 'Odčítanie cez desiatku',
                art: LINE_42_7,
                replay: 'Skákať znova',
                autoplay: true,
                text: '<p>Pri <b>42 − 7</b> najprv zoberieme 2, aby sme boli na <b>40</b>. Potom zoberieme zvyšok: 40 − 5 = <b>35</b>.</p>',
              },
              {
                title: 'Vypočuj si postup',
                phrases: [
                  { es: '38 + 5 = 43', en: '38 + 2 = 40, potom 40 + 3 = 43', lang: SK },
                  { es: '56 + 7 = 63', en: '56 + 4 = 60, potom 60 + 3 = 63', lang: SK },
                  { es: '42 − 7 = 35', en: '42 − 2 = 40, potom 40 − 5 = 35', lang: SK },
                  { es: '71 − 4 = 67', en: '71 − 1 = 70, potom 70 − 3 = 67', lang: SK },
                ],
                text: '<p>Vždy sa najprv pýtaj: <b>koľko mi chýba do celej desiatky</b> (alebo koľko zobrať, aby som bol na desiatke)?</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Najprv doplň alebo uber <b>po celú desiatku</b>.',
                  'Druhé číslo si <b>rozlož</b>: 5 = 2 + 3.',
                  'Potom pridaj alebo uber <b>zvyšok</b>.',
                  '38 + 5 = 43, 42 − 7 = 35.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko je 47 + 6?',
                options: ['43', '413', '53', '52'], answer: '53',
                explain: '47 + 3 = 50, potom 50 + 3 = <b>53</b>.', hint: 'koľko chýba číslu 47 do 50?' },
              { type: 'choice', prompt: 'Koľko je 61 − 4?',
                options: ['57', '65', '67', '56'], answer: '57',
                explain: '61 − 1 = 60, potom 60 − 3 = <b>57</b>.', hint: 'najprv uber 1, aby si bol na 60.' },
              { type: 'order', prompt: 'Zoraď kroky pre príklad 56 + 7.',
                items: ['Rozložím 7 na 4 a 3', '56 + 4 = 60', '60 + 3 = 63'],
                explain: 'Rozložím 7 = 4 + 3, doplním do 60 a pridám zvyšok: <b>63</b>.', hint: 'najprv rozkladáme.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: '73 − 5 = 68', answer: true,
                explain: '<b>Pravda.</b> 73 − 3 = 70 a 70 − 2 = 68.', hint: 'najprv uber 3.' },
            ],
          },
        ],
      },
      {
        title: 'Písomne a so skúškou',
        lessons: [
          {
            id: 'mat2-pocitanie100-pisomne',
            title: 'Písomné sčítanie a odčítanie',
            minutes: 10,
            slides: [
              {
                title: 'Pod seba',
                art: COL_34_25,
                text: '<p>Pri písomnom počítaní píšeme čísla <b>presne pod seba</b>: jednotky (J) pod jednotky a desiatky (D) pod desiatky. Počítame <b>sprava</b>, od jednotiek.</p>',
              },
              {
                title: 'Jedna si pamätám',
                art: COL_47_28,
                text: '<p><b>47 + 28</b>: 7 + 8 = 15. Píšem <b>5</b> a <b>1 si pamätám</b>. Pri desiatkach ju pripočítam: 4 + 2 + 1 = <b>7</b>. Výsledok je <b>75</b>.</p>',
              },
              {
                title: 'Písomné odčítanie',
                art: COL_63_27,
                text: '<p><b>63 − 27</b>: odčítame <b>dopočítavaním</b>. 7 a koľko je 13? <b>6</b>, píšem 6 a 1 si pamätám. 2 + 1 = 3. 3 a koľko je 6? <b>3</b>. Výsledok je <b>36</b>.</p>',
              },
              {
                title: 'Pravidlá písomného počítania',
                phrases: [
                  { es: 'jednotky pod jednotky', en: 'píšeme presne pod seba', lang: SK },
                  { es: 'začínam jednotkami', en: 'počítam sprava doľava', lang: SK },
                  { es: '1 si pamätám', en: 'pripočítam ju k desiatkam', lang: SK },
                  { es: '7 a koľko je 13?', en: 'pri odčítaní dopočítavam', lang: SK },
                ],
                text: '<p>Tieto vety si hovor nahlas, keď počítaš v zošite.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Jednotky pod jednotky, desiatky pod desiatky.',
                  'Začínam <b>jednotkami</b>, sprava.',
                  'Keď je jednotiek 10 a viac, píšem jednotky a <b>1 si pamätám</b>.',
                  'Pri odčítaní <b>dopočítavam</b>: 7 a koľko je 13?',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko je 47 + 28?',
                options: ['65', '615', '75', '85'], answer: '75',
                explain: '7 + 8 = 15, píšem 5, 1 si pamätám. 4 + 2 + 1 = 7. Výsledok <b>75</b>.', hint: 'nezabudni na jednotku, ktorú si pamätáš.' },
              { type: 'choice', prompt: 'Čím začínaš pri písomnom sčítaní?',
                options: ['desiatkami', 'jednotkami', 'väčším číslom', 'výsledkom'], answer: 'jednotkami',
                explain: 'Začíname <b>jednotkami</b>, teda sprava.', hint: 'počítame sprava doľava.' },
              { type: 'order', prompt: 'Zoraď kroky pre 36 + 45 písomne.',
                items: ['6 + 5 = 11, píšem 1, 1 si pamätám', '3 + 4 + 1 = 8', 'Výsledok je 81'],
                explain: 'Najprv jednotky, potom desiatky aj s jednotkou, ktorú si pamätám: <b>81</b>.', hint: 'začni jednotkami.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pri písomnom sčítaní píšeme desiatky pod jednotky.', answer: false,
                explain: '<b>Nepravda.</b> Desiatky píšeme pod desiatky a jednotky pod jednotky.', hint: 'čo patrí pod čo?' },
            ],
          },
          {
            id: 'mat2-pocitanie100-skuska',
            title: 'Skúška, okienka a zložené úlohy',
            minutes: 10,
            slides: [
              {
                title: 'Sčítance si môžu vymeniť miesto',
                art: SWAP,
                text: '<p>25 + 8 je to isté ako 8 + 25. Keď sčítance <b>vymeníme</b>, výsledok sa nezmení. Často je ľahšie začať väčším číslom.</p>',
              },
              {
                title: 'Skúška správnosti',
                cards: [
                  { front: '54 − 26 = 28', back: 'skúška: 28 + 26 = 54', lang: SK },
                  { front: '39 + 45 = 84', back: 'skúška: 84 − 45 = 39', lang: SK },
                  { front: '70 − 33 = 37', back: 'skúška: 37 + 33 = 70', lang: SK },
                  { front: '18 + 64 = 82', back: 'skúška: 82 − 64 = 18', lang: SK },
                ],
                text: '<p>Odčítanie overíme <b>sčítaním</b> a sčítanie <b>odčítaním</b>. Keď skúška vyjde, príklad je správne. Otoč kartičky.</p>',
              },
              {
                title: 'Čo je v okienku?',
                phrases: [
                  { es: '□ + 7 = 15', say: 'okienko plus 7 je 15', en: 'v okienku je 8, lebo 15 − 7 = 8', lang: SK },
                  { es: '20 − □ = 12', say: '20 mínus okienko je 12', en: 'v okienku je 8, lebo 20 − 8 = 12', lang: SK },
                  { es: '□ − 10 = 35', say: 'okienko mínus 10 je 35', en: 'v okienku je 45, lebo 35 + 10 = 45', lang: SK },
                  { es: '30 + □ = 90', say: '30 plus okienko je 90', en: 'v okienku je 60, lebo 90 − 30 = 60', lang: SK },
                ],
                text: '<p>Okienko je číslo, ktoré nepoznáme. Nájdeš ho opačným počítaním a potom si ho over dosadením.</p>',
              },
              {
                title: 'Zložená úloha',
                text: '<p><b>V triede bolo 24 detí. Prišlo 5 a potom 8 odišlo. Koľko detí je v triede?</b></p><p>Počítame po krokoch: 24 + 5 = 29, potom 29 − 8 = <b>21</b>. Zápis: 24 + 5 − 8 = 21.</p><p><i>Odpoveď: V triede je 21 detí.</i></p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Sčítance môžem <b>vymeniť</b>: 25 + 8 = 8 + 25.',
                  'Odčítanie overím <b>sčítaním</b>, sčítanie <b>odčítaním</b>.',
                  'Okienko nájdem <b>opačným</b> počítaním.',
                  'Zloženú úlohu počítam <b>po krokoch</b>, zľava doprava.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Aké číslo je v okienku? □ + 6 = 14',
                options: ['20', '6', '8', '9'], answer: '8',
                explain: '14 − 6 = <b>8</b>. Over: 8 + 6 = 14.', hint: 'počítaj opačne: 14 − 6.' },
              { type: 'choice', prompt: 'Ktorá je skúška príkladu 62 − 18 = 44?',
                options: ['62 + 18 = 80', '44 − 18 = 26', '44 + 18 = 62', '18 + 18 = 36'], answer: '44 + 18 = 62',
                explain: 'K výsledku pripočítam to, čo som odčítal: <b>44 + 18 = 62</b>.', hint: 'odčítanie overujeme sčítaním.' },
              { type: 'choice', prompt: 'V autobuse bolo 30 ľudí. 6 vystúpilo a 9 nastúpilo. Koľko ich je teraz?',
                options: ['45', '27', '15', '33'], answer: '33',
                explain: '30 − 6 = 24, potom 24 + 9 = <b>33</b>.', hint: 'počítaj po krokoch: najprv vystúpili.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: '45 + 9 je to isté ako 9 + 45.', answer: true,
                explain: '<b>Pravda.</b> Sčítance si môžu vymeniť miesto, oboje je 54.', hint: 'záleží pri sčítaní na poradí?' },
            ],
          },
        ],
      },
    ],
  });
})();
