'use strict';

/* Matematika · 2. ročník · Geometria a meranie (iŠVP 2015). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const MAG = '#A43CB4';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const dot = (x, y, name, color = INK, dx = 0, dy = -12) => `<circle cx="${x}" cy="${y}" r="5" fill="${color}"/><text x="${x + dx}" y="${y + dy}" text-anchor="middle" ${T} font-size="15" fill="${color}">${name}</text>`;
  const arrow = (x, y, dir, color) => `<path d="M${x - 9 * dir} ${y - 7} L${x} ${y} L${x - 9 * dir} ${y + 7}" fill="none" stroke="${color}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`;

  const SHAPES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štyri útvary: bod A; priamka p so šípkami na oboch koncoch; polpriamka so začiatkom v bode B a šípkou na druhom konci; úsečka CD s dvoma krajnými bodmi.">
    <g ${pop(0.2)}>${dot(40, 50, 'A')}</g>
    <g ${pop(0.6)}><path d="M100 50 H296" stroke="${MAG}" stroke-width="3.5"/>${arrow(100, 50, -1, MAG)}${arrow(296, 50, 1, MAG)}<text x="198" y="40" text-anchor="middle" ${T} font-size="15" fill="${MAG}">p</text></g>
    <g ${pop(1)}><path d="M30 120 H170" stroke="${CORAL}" stroke-width="3.5"/>${arrow(170, 120, 1, CORAL)}${dot(30, 120, 'B', '#C2412A')}</g>
    <g ${pop(1.4)}><path d="M200 120 H296" stroke="${KELP}" stroke-width="3.5"/>${dot(200, 120, 'C', KELP)}${dot(296, 120, 'D', KELP)}</g>
    <g ${T} font-size="13" fill="#4A4566" text-anchor="middle"><text x="40" y="80">bod</text><text x="198" y="80">priamka</text><text x="100" y="152">polpriamka</text><text x="248" y="152">úsečka</text></g>
  </svg>`;

  const BELONGS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Úsečka AB. Bod C leží na úsečke, bod D leží mimo nej.">
    <path d="M40 110 H280" stroke="${MAG}" stroke-width="4"/>
    ${dot(40, 110, 'A', MAG, 0, 28)}${dot(280, 110, 'B', MAG, 0, 28)}
    <g ${pop(0.5)}>${dot(150, 110, 'C', KELP, 0, 28)}<text x="150" y="88" text-anchor="middle" ${T} font-size="13" fill="${KELP}">leží na úsečke</text></g>
    <g ${pop(1.1)}>${dot(220, 50, 'D', '#C2412A')}<text x="220" y="76" text-anchor="middle" ${T} font-size="13" fill="#C2412A">neleží na nej</text></g>
  </svg>`;

  const QUIZ_RAY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Čiara, ktorá začína v bode K a na druhom konci má šípku.">
    <path d="M50 100 H270" stroke="${MAG}" stroke-width="4"/>${arrow(270, 100, 1, MAG)}${dot(50, 100, 'K', MAG)}
  </svg>`;

  // A ruler in cm from x0; `len` cm segment drawn above it from 0.
  function ruler(len, { label = true, cm = 10 } = {}) {
    const x0 = 30; const u = 26;
    let out = `<rect x="${x0 - 14}" y="110" width="${cm * u + 28}" height="54" rx="6" fill="#FEF3DD" stroke="#B9770E" stroke-width="2"/>`;
    for (let i = 0; i <= cm * 10; i++) {
      const x = x0 + (i * u) / 10;
      const h = i % 10 === 0 ? 18 : i % 5 === 0 ? 12 : 7;
      out += `<path d="M${x.toFixed(1)} 110 V${110 + h}" stroke="#7A5000" stroke-width="${i % 10 === 0 ? 2 : 1}"/>`;
      if (i % 10 === 0) out += `<text x="${x.toFixed(1)}" y="148" text-anchor="middle" ${T} font-size="12" fill="#7A5000">${i / 10}</text>`;
    }
    out += `<path class="ap-curve" pathLength="100" d="M${x0} 86 H${x0 + len * u}" stroke="${MAG}" stroke-width="6" stroke-linecap="round"/>`;
    out += `<g class="ap-note" style="--d: 0.1s"><path d="M${x0} 76 V104" stroke="${KELP}" stroke-width="2" stroke-dasharray="3 3"/></g>`;
    out += `<g class="ap-note" style="--d: 2.2s"><path d="M${x0 + len * u} 76 V104" stroke="${KELP}" stroke-width="2" stroke-dasharray="3 3"/>${label ? `<text x="${x0 + (len * u) / 2}" y="64" text-anchor="middle" ${T} font-size="18" fill="${KELP}">${len} cm</text>` : ''}</g>`;
    return out;
  }

  const RULER_7 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Pravítko s centimetrami od 0 do 10. Nad ním úsečka, ktorá začína pri nule a končí pri 7. Má 7 centimetrov.">
    ${ruler(7)}
    <text x="30" y="186" ${T} font-size="13" fill="#4A4566">začínam pri 0</text>
  </svg>`;

  const QUIZ_RULER = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Pravítko a nad ním úsečka, ktorá začína pri 0 a končí pri čísle 5.">
    ${ruler(5, { label: false })}
  </svg>`;

  const BODY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri staré jednotky dĺžky: palec je šírka palca, stopa je dĺžka chodidla a lakeť je dĺžka od lakťa po končeky prstov.">
    <g ${pop(0.2)}>
      <rect x="44" y="70" width="22" height="50" rx="11" fill="#FFD9C9" stroke="${INK}" stroke-width="2.5"/>
      <path d="M40 132 H70" stroke="${CORAL}" stroke-width="3"/><text x="55" y="160" text-anchor="middle" ${T} font-size="14" fill="${INK}">palec</text>
    </g>
    <g ${pop(0.7)}>
      <path d="M120 112 C 120 92, 132 84, 150 90 L196 100 C 208 104, 208 118, 196 120 H128 C 122 120, 120 116, 120 112 Z" fill="#FFD9C9" stroke="${INK}" stroke-width="2.5"/>
      <path d="M120 132 H204" stroke="${CORAL}" stroke-width="3"/><text x="162" y="160" text-anchor="middle" ${T} font-size="14" fill="${INK}">stopa</text>
    </g>
    <g ${pop(1.2)}>
      <path d="M232 112 L290 82" stroke="#FFD9C9" stroke-width="16" stroke-linecap="round"/><path d="M232 112 L290 82" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity="0.3"/>
      <circle cx="232" cy="112" r="9" fill="#8C87A8"/>
      <path d="M228 132 H298" stroke="${CORAL}" stroke-width="3"/><text x="262" y="160" text-anchor="middle" ${T} font-size="14" fill="${INK}">lakeť</text>
    </g>
  </svg>`;

  const LINES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Vľavo otvorená čiara, ktorej konce sa nestretnú. Vpravo uzavretá čiara, ktorá sa vráti na začiatok.">
    <path class="ap-curve" pathLength="100" d="M30 140 C 40 60, 90 50, 110 90 S 140 150, 150 70" fill="none" stroke="${CORAL}" stroke-width="5" stroke-linecap="round"/>
    <path class="ap-curve" pathLength="100" d="M230 50 C 290 50, 300 120, 260 150 S 170 140, 190 90 S 210 50, 230 50 Z" fill="none" stroke="${KELP}" stroke-width="5" stroke-linecap="round"/>
    <g class="ap-note" style="--d: 2.2s" ${T} font-size="15" text-anchor="middle"><text x="90" y="180" fill="#C2412A">otvorená</text><text x="240" y="180" fill="${KELP}">uzavretá</text></g>
  </svg>`;

  const POLYGONS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Trojuholník ABC s tromi stranami a tromi vrcholmi a štvoruholník KLMN so štyrmi stranami a štyrmi vrcholmi.">
    <path class="ap-curve" pathLength="100" d="M30 160 L140 160 L80 50 Z" fill="#F6E6F8" stroke="${MAG}" stroke-width="4" stroke-linejoin="round"/>
    <path class="ap-curve" pathLength="100" d="M180 160 L300 160 L290 60 L190 70 Z" fill="#FFE9E2" stroke="${CORAL}" stroke-width="4" stroke-linejoin="round"/>
    <g class="ap-note" style="--d: 2.2s">
      ${dot(30, 160, 'A', INK, -8, 20)}${dot(140, 160, 'B', INK, 8, 20)}${dot(80, 50, 'C')}
      ${dot(180, 160, 'K', INK, -8, 20)}${dot(300, 160, 'L', INK, 8, 20)}${dot(290, 60, 'M')}${dot(190, 70, 'N')}
    </g>
  </svg>`;

  const QUIZ_LINES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri čiary s číslami 1, 2 a 3. Čiara 1 je otvorená vlnovka, čiara 2 je uzavretý ovál, čiara 3 je otvorená cikcak čiara.">
    <path d="M20 120 C 40 60, 70 160, 90 90" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <ellipse cx="160" cy="110" rx="40" ry="30" fill="none" stroke="${INK}" stroke-width="4"/>
    <path d="M230 140 L250 80 L270 140 L290 80" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <g ${T} font-size="18" fill="${MAG}" text-anchor="middle"><text x="55" y="180">1</text><text x="160" y="180">2</text><text x="260" y="180">3</text></g>
  </svg>`;

  const QUIZ_TRIANGLE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Trojuholník s vrcholmi D, E a F.">
    <path d="M80 160 L250 150 L150 40 Z" fill="#F6E6F8" stroke="${MAG}" stroke-width="4" stroke-linejoin="round"/>
    ${dot(80, 160, 'D', INK, -10, 18)}${dot(250, 150, 'E', INK, 10, 18)}${dot(150, 40, 'F')}
  </svg>`;

  // Front view of a cube building: columns of squares.
  function stairs(cols, x0 = 80) {
    let out = ''; let n = 0;
    cols.forEach((h, c) => {
      for (let r = 0; r < h; r++) {
        out += `<rect ${pop((0.2 + n * 0.15).toFixed(2))} x="${x0 + c * 34}" y="${150 - (r + 1) * 34}" width="32" height="32" rx="4" fill="${(c + r) % 2 ? MAG : CORAL}" stroke="${INK}" stroke-width="2"/>`;
        n += 1;
      }
    });
    return `${out}<path d="M${x0 - 20} 152 H${x0 + cols.length * 34 + 20}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
  }

  const STAIRS_321 = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Schody z kociek: stĺpce s tromi, dvoma a jednou kockou. Spolu 6 kociek.">
    ${stairs([3, 2, 1], 110)}
    <text x="160" y="186" text-anchor="middle" ${T} font-size="18" fill="${KELP}" ${pop(1.4)}>3 + 2 + 1 = 6 kociek</text>
  </svg>`;

  const QUIZ_STAIRS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Schody z kociek: stĺpce so štyrmi, tromi, dvoma a jednou kockou.">
    ${stairs([4, 3, 2, 1], 92)}
  </svg>`;

  // A square grid with a shape (vzor) and the same shape moved 5 squares right (obraz).
  function grid() {
    const s = 22; const x0 = 28; const y0 = 30;
    let out = '';
    for (let i = 0; i <= 12; i++) out += `<path d="M${x0 + i * s} ${y0} V${y0 + 6 * s}" stroke="#C9C4E0" stroke-width="1"/>`;
    for (let j = 0; j <= 6; j++) out += `<path d="M${x0} ${y0 + j * s} H${x0 + 12 * s}" stroke="#C9C4E0" stroke-width="1"/>`;
    const shape = [[1, 1], [1, 2], [1, 3], [2, 3], [3, 3], [2, 2]];
    shape.forEach(([cx, cy]) => { out += `<rect x="${x0 + cx * s}" y="${y0 + cy * s}" width="${s}" height="${s}" fill="${MAG}" opacity="0.85"/>`; });
    shape.forEach(([cx, cy], i) => { out += `<rect ${pop((0.6 + i * 0.2).toFixed(2))} x="${x0 + (cx + 6) * s}" y="${y0 + cy * s}" width="${s}" height="${s}" fill="${CORAL}" opacity="0.9"/>`; });
    out += `<path class="a-bob" d="M${x0 + 4.6 * s} ${y0 + 0.5 * s} H${x0 + 7.4 * s} m-7 -6 l7 6 l-7 6" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`;
    out += `<text x="${x0 + 2.5 * s}" y="${y0 + 6 * s + 22}" text-anchor="middle" ${T} font-size="14" fill="#74237F">vzor</text><text x="${x0 + 8.5 * s}" y="${y0 + 6 * s + 22}" text-anchor="middle" ${T} font-size="14" fill="#C2412A">obraz</text>`;
    return out;
  }
  const GRID = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štvorcová sieť. Vľavo fialový tvar zo 6 štvorčekov, vzor. Vpravo ten istý tvar posunutý o 6 štvorčekov doprava, obraz.">
    ${grid()}
  </svg>`;

  window.Octavo.addCourse({
    id: 'mat2-geometria',
    subject: 'Matematika',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Geometria a meranie',
    blurb: 'Bod, priamka, úsečka, meranie pravítkom, trojuholníky a štvoruholníky aj stavby z kociek.',
    artBg: '#FBF5FC',
    units: [
      {
        title: 'Čiary a body',
        lessons: [
          {
            id: 'mat2-geometria-ciary',
            title: 'Bod, priamka, polpriamka, úsečka',
            minutes: 8,
            slides: [
              {
                title: 'Štyri základné útvary',
                art: SHAPES,
                spots: [
                  { x: 21, y: 38, label: 'bod', info: 'Malá bodka. Označujeme ho veľkým tlačeným písmenom, napríklad A.' },
                  { x: 77, y: 38, label: 'priamka', info: 'Rovná čiara bez začiatku a bez konca. Pokračuje na obe strany donekonečna.' },
                  { x: 48, y: 74, label: 'polpriamka', info: 'Má začiatok v bode, ale nemá koniec.' },
                  { x: 90, y: 74, label: 'úsečka', info: 'Má dva krajné body, napríklad C a D. Píšeme úsečka CD.' },
                ],
                text: '<p>Ťukni na čísla na obrázku. <b>Šípka</b> znamená, že čiara pokračuje ďalej a nikde nekončí.</p>',
              },
              {
                title: 'Bod leží, bod neleží',
                art: BELONGS,
                text: '<p>Bod <b>C</b> leží na úsečke AB, <b>patrí</b> jej. Bod <b>D</b> je mimo nej, úsečke AB <b>nepatrí</b>.</p>',
              },
              {
                title: 'Zapamätaj si',
                cards: [
                  { front: 'bod', back: 'označujeme veľkým písmenom: A', lang: SK },
                  { front: 'priamka', back: 'nemá začiatok ani koniec', lang: SK },
                  { front: 'polpriamka', back: 'má začiatok, ale nemá koniec', lang: SK },
                  { front: 'úsečka', back: 'má dva krajné body: AB', lang: SK },
                ],
                text: '<p>Rysujeme <b>pravítkom</b> a ostrou ceruzkou. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Bod</b> označujeme veľkým tlačeným písmenom.',
                  '<b>Priamka</b> nemá začiatok ani koniec.',
                  '<b>Polpriamka</b> má začiatok, ale nemá koniec.',
                  '<b>Úsečka</b> má dva krajné body.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Čo je na obrázku?', art: QUIZ_RAY,
                options: ['priamka', 'úsečka', 'polpriamka', 'bod'], answer: 'polpriamka',
                explain: 'Začína v bode K a šípka ukazuje, že nekončí: je to <b>polpriamka</b>.', hint: 'má začiatok? Má koniec?' },
              { type: 'choice', prompt: 'Koľko krajných bodov má úsečka?',
                options: ['1', '2', '0', '3'], answer: '2',
                explain: 'Úsečka má <b>2</b> krajné body, napríklad A a B.', hint: 'úsečka AB: koľko písmen?' },
              { type: 'choice', prompt: 'Ako označujeme body?',
                options: ['malým písmenom', 'číslom', 'veľkým tlačeným písmenom', 'farbou'], answer: 'veľkým tlačeným písmenom',
                explain: 'Body označujeme <b>veľkými tlačenými písmenami</b>: A, B, C.', hint: 'pozri sa na bod A.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Priamka má začiatok aj koniec.', answer: false,
                explain: '<b>Nepravda.</b> Priamka nemá začiatok ani koniec.', hint: 'čo znamenajú šípky na oboch koncoch?' },
            ],
          },
          {
            id: 'mat2-geometria-meranie',
            title: 'Meriame dĺžku',
            minutes: 9,
            slides: [
              {
                title: 'Meriame pravítkom',
                art: RULER_7,
                replay: 'Merať znova',
                autoplay: true,
                text: '<p>Pravítko priložíme tak, aby začiatok úsečky bol pri <b>nule</b>. Koniec ukáže dĺžku: táto úsečka má <b>7 cm</b> (centimetrov).</p>',
              },
              {
                title: 'Ktorá jednotka sa hodí?',
                cards: [
                  { front: 'milimeter', back: 'hrúbka mince: asi 2 mm', lang: SK },
                  { front: 'centimeter', back: 'guma, ceruzka, zošit', lang: SK },
                  { front: 'decimeter', back: 'šírka dlane: asi 1 dm = 10 cm', lang: SK },
                  { front: 'meter', back: 'trieda, dvere, ihrisko', lang: SK },
                ],
                text: '<p>Malé veci meriame v <b>centimetroch</b> alebo <b>milimetroch</b>, veľké v <b>metroch</b>. Na dlhé vzdialenosti použijeme <b>meter</b> alebo <b>meracie pásmo</b>.</p>',
              },
              {
                title: 'Palec, stopa, lakeť',
                art: BODY,
                phrases: [
                  { es: 'palec', en: 'šírka palca na ruke', lang: SK },
                  { es: 'stopa', en: 'dĺžka chodidla', lang: SK },
                  { es: 'lakeť', en: 'od lakťa po končeky prstov', lang: SK },
                  { es: 'meter', en: 'rovnako dlhý pre všetkých', lang: SK },
                ],
                text: '<p>Kedysi ľudia merali telom. Lenže každý má inak veľkú nohu aj ruku, a tak im vychádzali rôzne čísla. Preto dnes používame <b>meter</b> a <b>centimeter</b>.</p>',
              },
              {
                title: 'Odhadni a porovnaj',
                text: '<p>Najprv <b>odhadni</b>, aká dlhá je vec, potom ju <b>zmeraj</b>. Čím viac meriaš, tým lepšie odhaduješ.</p><p>Dve úsečky porovnáš aj bez čísel: prilož k nim <b>pásik papiera</b> a označ si dĺžku.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Meriam od <b>nuly</b> na pravítku.',
                  'Jednotky od najmenšej: <b>mm, cm, dm, m</b>.',
                  'Palec, stopa a lakeť sú <b>staré</b> jednotky, každému vyjdú inak.',
                  'Najprv odhadnem, potom zmeriam.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Aká dlhá je úsečka?', art: QUIZ_RULER,
                options: ['6 cm', '4 cm', '5 m', '5 cm'], answer: '5 cm',
                explain: 'Začína pri 0 a končí pri 5: má <b>5 cm</b>.', hint: 'pozri, pri akom čísle úsečka končí.' },
              { type: 'choice', prompt: 'Akou jednotkou zmeriaš dĺžku triedy?',
                options: ['milimeter', 'centimeter', 'meter', 'palec'], answer: 'meter',
                explain: 'Trieda je veľká, meriame ju v <b>metroch</b>.', hint: 'pre veľké veci sa hodí väčšia jednotka.' },
              { type: 'order', prompt: 'Zoraď jednotky od najmenšej.',
                items: ['milimeter', 'centimeter', 'decimeter', 'meter'],
                explain: 'mm, cm, dm a najväčší je <b>meter</b>.', hint: 'milimeter je najmenší.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pri meraní pravítkom začínam pri čísle 1.', answer: false,
                explain: '<b>Nepravda.</b> Začíname pri <b>nule</b>.', hint: 'kde je na pravítku začiatok?' },
            ],
          },
        ],
      },
      {
        title: 'Útvary a stavby',
        lessons: [
          {
            id: 'mat2-geometria-utvary',
            title: 'Trojuholník a štvoruholník',
            minutes: 8,
            slides: [
              {
                title: 'Otvorená a uzavretá čiara',
                art: LINES,
                replay: 'Nakresliť znova',
                autoplay: true,
                text: '<p><b>Uzavretá</b> čiara sa vráti tam, kde začala, a ohraničí kus plochy. <b>Otvorená</b> čiara má dva konce, ktoré sa nestretnú.</p>',
              },
              {
                title: 'Mnohouholníky',
                art: POLYGONS,
                replay: 'Nakresliť znova',
                autoplay: true,
                text: '<p>Keď uzavretú čiaru poskladáme z úsečiek, vznikne <b>mnohouholník</b>. <b>Trojuholník</b> ABC má 3 strany a 3 vrcholy. <b>Štvoruholník</b> KLMN má 4 strany a 4 vrcholy. Aj štvorec a obdĺžnik sú štvoruholníky.</p>',
              },
              {
                title: 'Strany a vrcholy',
                cards: [
                  { front: 'trojuholník', back: '3 strany, 3 vrcholy', lang: SK },
                  { front: 'štvoruholník', back: '4 strany, 4 vrcholy', lang: SK },
                  { front: 'vrchol', back: 'bod, kde sa stretnú dve strany', lang: SK },
                  { front: 'strana', back: 'úsečka medzi dvoma vrcholmi, napríklad AB', lang: SK },
                ],
                text: '<p>Vrcholy označujeme veľkými písmenami <b>proti smeru hodinových ručičiek</b>. Strana medzi vrcholmi A a B sa volá <b>AB</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Uzavretá</b> čiara sa vráti na začiatok.',
                  '<b>Trojuholník</b>: 3 strany a 3 vrcholy.',
                  '<b>Štvoruholník</b>: 4 strany a 4 vrcholy. Štvorec aj obdĺžnik sú štvoruholníky.',
                  'Stranu pomenujeme podľa jej vrcholov: <b>AB</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorá čiara je uzavretá?', art: QUIZ_LINES,
                options: ['1', '2', '3'], answer: '2',
                explain: 'Ovál číslo <b>2</b> sa vracia na začiatok. Čiary 1 a 3 majú voľné konce.', hint: 'hľadaj čiaru bez koncov.' },
              { type: 'choice', prompt: 'Koľko vrcholov má tento útvar?', art: QUIZ_TRIANGLE,
                options: ['4', '2', '3', '6'], answer: '3',
                explain: 'Je to trojuholník DEF, má <b>3 vrcholy</b>: D, E a F.', hint: 'spočítaj písmená.' },
              { type: 'choice', prompt: 'Ako sa volá strana medzi vrcholmi B a C?',
                options: ['B', 'BC', 'C', 'ABC'], answer: 'BC',
                explain: 'Stranu pomenujeme podľa jej vrcholov: <b>BC</b>.', hint: 'použi obe písmená.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Štvorec je štvoruholník.', answer: true,
                explain: '<b>Pravda.</b> Štvorec má 4 strany a 4 vrcholy.', hint: 'koľko strán má štvorec?' },
            ],
          },
          {
            id: 'mat2-geometria-kocky',
            title: 'Stavby z kociek a štvorcová sieť',
            minutes: 8,
            slides: [
              {
                title: 'Staviame podľa vzoru',
                art: STAIRS_321,
                text: '<p>Tieto schody sú z <b>kociek</b>. Postav si ich podľa obrázka: v prvom stĺpci sú 3 kocky, v druhom 2 a v treťom 1. Spolu <b>6 kociek</b>.</p>',
              },
              {
                title: 'Kreslíme v štvorcovej sieti',
                art: GRID,
                text: '<p>V sieti máme <b>vzor</b>. Nakreslíme ho ešte raz o kus ďalej, štvorček po štvorčeku. Vznikne <b>obraz</b>. Tvar ani veľkosť sa nezmenia, obrázok sa len <b>posunul</b>.</p>',
              },
              {
                title: 'Slová, ktoré potrebuješ',
                cards: [
                  { front: 'vzor', back: 'obrázok, podľa ktorého staviam alebo kreslím', lang: SK },
                  { front: 'obraz', back: 'to, čo nakreslím podľa vzoru', lang: SK },
                  { front: 'posunutie', back: 'tvar ani veľkosť sa nezmenia', lang: SK },
                  { front: 'kocka', back: 'teleso so 6 rovnakými štvorcovými stenami', lang: SK },
                ],
                text: '<p>Pri kreslení podľa vzoru si <b>počítaj štvorčeky</b>, nie odhaduj.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Stavbu postavím <b>podľa vzoru</b> a spočítam kocky.',
                  'V štvorcovej sieti kreslím štvorček po štvorčeku.',
                  'Pri <b>posunutí</b> sa tvar ani veľkosť nezmení.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko kociek je v stavbe?', art: QUIZ_STAIRS,
                options: ['9', '8', '10', '4'], answer: '10',
                explain: '4 + 3 + 2 + 1 = <b>10</b> kociek.', hint: 'spočítaj kocky v každom stĺpci.' },
              { type: 'choice', prompt: 'Vzor má 5 štvorčekov. Koľko štvorčekov má jeho obraz po posunutí?',
                options: ['4', '5', '10', '6'], answer: '5',
                explain: 'Pri posunutí sa nič nepridá ani neuberie: <b>5</b> štvorčekov.', hint: 'mení sa pri posunutí veľkosť?' },
              { type: 'order', prompt: 'Zoraď, ako postupuješ pri kreslení podľa vzoru.',
                items: ['Pozriem sa na vzor', 'Spočítam štvorčeky', 'Nakreslím obraz', 'Porovnám obraz so vzorom'],
                explain: 'Pozriem, spočítam, nakreslím a nakoniec <b>skontrolujem</b>.', hint: 'kontrola je na konci.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pri posunutí sa obrázok zväčší.', answer: false,
                explain: '<b>Nepravda.</b> Pri posunutí sa tvar ani veľkosť nezmenia.', hint: 'obrázok sa iba presunie.' },
            ],
          },
        ],
      },
    ],
  });
})();
