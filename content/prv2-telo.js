'use strict';

/* Prvouka · 2. ročník · Kosti a svaly (iŠVP 2015: Človek). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BONE = '#F1E8D0';
  const BROWN = '#8B5E34';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const bone = (d, w = 7) => `<path d="${d}" fill="none" stroke="${BROWN}" stroke-width="${w + 3}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${BONE}" stroke-width="${w}" stroke-linecap="round"/>`;
  const SKELETON = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Jednoduchá kostra človeka: lebka, chrbtica, rebrá, panva, kosti rúk a nôh so stehennou kosťou.">
    <ellipse cx="160" cy="28" rx="18" ry="20" fill="${BONE}" stroke="${BROWN}" stroke-width="2.5"/>
    <circle cx="153" cy="26" r="4" fill="${BROWN}"/><circle cx="167" cy="26" r="4" fill="${BROWN}"/>
    ${bone('M160 50 V118', 5)}
    ${[0, 1, 2, 3].map((i) => `<path d="M160 ${62 + i * 11} q-24 2 -26 12 M160 ${62 + i * 11} q24 2 26 12" fill="none" stroke="${BROWN}" stroke-width="3.5" stroke-linecap="round"/>`).join('')}
    ${bone('M138 56 H182', 5)}
    ${bone('M138 58 L122 96 L116 132')}${bone('M182 58 L198 96 L204 132')}
    <path d="M140 116 q20 18 40 0 l-4 14 h-32z" fill="${BONE}" stroke="${BROWN}" stroke-width="2.5"/>
    ${bone('M148 130 L144 162 L144 192', 8)}${bone('M172 130 L176 162 L176 192', 8)}
  </svg>`;

  const BROKEN = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Vľavo zlomená kosť s prasklinou. Vpravo ruka v sadre, v ktorej kosť zrastie.">
    <g ${pop(0.2)}>
      ${bone('M40 100 L100 84', 12)}${bone('M108 82 L150 70', 12)}
      <path d="M102 74 l4 8 l-6 4 l6 8" fill="none" stroke="#E5484D" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="96" y="130" text-anchor="middle" ${T} font-size="14" fill="#C2412A">zlomenina</text>
    </g>
    <path d="M168 92 h22 m-7 -7 l7 7 l-7 7" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g ${pop(0.9)}>
      <path d="M200 110 L290 82" stroke="#FFD9C9" stroke-width="22" stroke-linecap="round"/>
      <path d="M216 106 L274 88" stroke="#FFFFFF" stroke-width="30" stroke-linecap="round"/>
      <path d="M216 106 L274 88" stroke="#C9C4E0" stroke-width="30" stroke-linecap="round" opacity="0.35"/>
      <text x="246" y="140" text-anchor="middle" ${T} font-size="14" fill="${KELP}">sadra</text>
    </g>
  </svg>`;

  // Arm: the biceps tightens (gets thicker) and the forearm lifts.
  const ARM = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Ruka ohnutá v lakti. Sval na ramene sa stiahne a zhrubne, a tak zdvihne predlaktie.">
    ${bone('M80 60 L160 120', 10)}
    <g class="a-bob" style="transform-origin: 160px 120px">${bone('M160 120 L250 70', 9)}<circle cx="258" cy="64" r="12" fill="#FFD9C9" stroke="${BROWN}" stroke-width="2"/></g>
    <ellipse class="a-glow" cx="116" cy="80" rx="34" ry="14" transform="rotate(37 116 80)" fill="${CORAL}" opacity="0.75"/>
    <text x="80" y="140" text-anchor="middle" ${T} font-size="14" fill="#C2412A">sval sa sťahuje</text>
    <text x="232" y="140" text-anchor="middle" ${T} font-size="14" fill="${INK}">kosť sa zdvihne</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'prv2-telo',
    subject: 'Prvouka',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Kosti a svaly',
    blurb: 'Kostra ľudského tela, ako kosti rastú a čo robiť pri zlomenine, svaly, pohyb a cvičenie.',
    artBg: '#FAF5EF',
    units: [
      {
        title: 'Pohyb ako prejav života',
        lessons: [
          {
            id: 'prv2-telo-kostra',
            title: 'Kostra ľudského tela',
            minutes: 9,
            slides: [
              {
                title: 'Kostra nás drží',
                art: SKELETON,
                spots: [
                  { x: 68, y: 10, label: 'lebka', info: 'Chráni mozog.' },
                  { x: 66, y: 36, label: 'rebrá', info: 'Tvoria hrudník a chránia srdce a pľúca.' },
                  { x: 40, y: 50, label: 'chrbtica', info: 'Drží telo vzpriamene. Skladá sa z mnohých stavcov.' },
                  { x: 56, y: 64, label: 'panva', info: 'Spája chrbticu s nohami.' },
                  { x: 62, y: 84, label: 'stehenná kosť', info: 'Najdlhšia kosť v tele.' },
                ],
                text: '<p><b>Kostra</b> drží naše telo, <b>chráni</b> dôležité orgány a spolu so svalmi nám umožňuje <b>pohyb</b>. Dospelý človek má asi <b>206 kostí</b>. Ťukni na čísla.</p>',
              },
              {
                title: 'Hlavné kosti',
                cards: [
                  { front: 'lebka', back: 'chráni mozog', lang: SK },
                  { front: 'rebrá', back: 'chránia srdce a pľúca', lang: SK },
                  { front: 'chrbtica', back: 'drží telo rovno', lang: SK },
                  { front: 'stehenná kosť', back: 'najdlhšia kosť v tele', lang: SK },
                ],
                text: '<p>Otoč kartičky a ukáž si každú kosť na sebe.</p>',
              },
              {
                title: 'Nakresli si kostru',
                text: '<p>Kostru si nakreslíš jednoducho: <b>krúžok</b> na lebku, <b>zvislú čiaru</b> na chrbticu, niekoľko <b>oblúčikov</b> na rebrá, <b>misku</b> na panvu a <b>čiary</b> na ruky a nohy. Kde sa kosti spájajú, sú <b>kĺby</b>: v lakti, v kolene, v ramene.</p>',
                phrases: [
                  { es: 'kĺb', en: 'spojenie kostí, napríklad lakeť a koleno', lang: SK },
                  { es: 'kostra', en: 'všetky kosti tela', lang: SK },
                ],
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Kostra <b>drží</b> telo, <b>chráni</b> orgány a umožňuje <b>pohyb</b>.',
                  '<b>Lebka</b> chráni mozog, <b>rebrá</b> srdce a pľúca.',
                  '<b>Stehenná kosť</b> je najdlhšia.',
                  'Kosti sa spájajú v <b>kĺboch</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Čo chráni lebka?',
                options: ['srdce', 'mozog', 'žalúdok', 'pľúca'], answer: 'mozog',
                explain: '<b>Lebka</b> chráni mozog.', hint: 'kde je lebka?' },
              { type: 'choice', prompt: 'Ktorá kosť je v tele najdlhšia?',
                options: ['lebka', 'rebro', 'stehenná kosť', 'chrbtica'], answer: 'stehenná kosť',
                explain: 'Najdlhšia je <b>stehenná kosť</b>.', hint: 'je v nohe.' },
              { type: 'choice', prompt: 'Ako sa volá miesto, kde sa spájajú kosti?',
                options: ['sval', 'kĺb', 'lebka', 'koža'], answer: 'kĺb',
                explain: 'Kosti sa spájajú v <b>kĺboch</b>, napríklad v kolene.', hint: 'koleno, lakeť…' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Rebrá chránia srdce a pľúca.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'čo je v hrudníku?' },
            ],
          },
          {
            id: 'prv2-telo-zlomenina',
            title: 'Rast kostí a zlomenina',
            minutes: 8,
            slides: [
              {
                title: 'Kosti rastú',
                text: '<p>Kosti <b>rastú</b> spolu s nami, až kým nie sme dospelí. Silné kosti potrebujú <b>vápnik</b> (je v mlieku, syre a jogurte), <b>pohyb</b> a dostatok <b>spánku</b>.</p>',
                phrases: [
                  { es: 'mlieko, syr, jogurt', en: 'vápnik pre kosti', lang: SK },
                  { es: 'pohyb', en: 'kosti sú pevnejšie', lang: SK },
                  { es: 'spánok', en: 'telo počas neho rastie', lang: SK },
                ],
              },
              {
                title: 'Zlomená kosť',
                art: BROKEN,
                text: '<p>Pri páde sa kosť môže <b>zlomiť</b>. Bolí to, miesto opuchne a končatinou nevieme pohnúť. Lekár dá kosť do <b>sadry</b>, aby sa nehýbala, a za pár týždňov kosť <b>zrastie</b>.</p>',
              },
              {
                title: 'Čo robiť pri zlomenine',
                cards: [
                  { front: '1. nehýb', back: 'zlomenou končatinou nehýbeme', lang: SK },
                  { front: '2. zavolaj dospelého', back: 'povedz, čo sa stalo', lang: SK },
                  { front: '3. záchranka', back: 'dospelý volá 155 alebo 112', lang: SK },
                  { front: '4. lekár', back: 'dá kosť do sadry', lang: SK },
                ],
                text: '<p>Pri úraze zostaň pokojný. Otoč kartičky po poradí.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Kosti rastú až do dospelosti.',
                  'Kostiam pomáha <b>vápnik</b>, <b>pohyb</b> a <b>spánok</b>.',
                  'Pri zlomenine končatinou <b>nehýbeme</b> a voláme <b>dospelého</b>.',
                  'Zlomená kosť zrastie v <b>sadre</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'V čom je veľa vápnika pre kosti?',
                options: ['v cukríkoch', 'v mlieku a syre', 'v limonáde', 'v čipsoch'], answer: 'v mlieku a syre',
                explain: 'Vápnik je v <b>mlieku, syre a jogurte</b>.', hint: 'mliečne výrobky.' },
              { type: 'order', prompt: 'Zoraď, čo robiť pri zlomenine.',
                items: ['nehýbem končatinou', 'zavolám dospelého', 'dospelý volá záchranku', 'lekár dá sadru'],
                explain: 'Nehýbať, zavolať dospelého, záchranka, <b>lekár</b>.', hint: 'najprv nehýbeme.' },
              { type: 'choice', prompt: 'Na aké číslo voláme záchrannú službu?',
                options: ['150', '155', '158', '100'], answer: '155',
                explain: 'Záchranná služba má číslo <b>155</b>. Funguje aj 112.', hint: 'pozri kartičky.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Kosti rastú, až kým nie sme dospelí.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'rastieš ešte?' },
            ],
          },
          {
            id: 'prv2-telo-svaly',
            title: 'Svaly a pohyb',
            minutes: 8,
            slides: [
              {
                title: 'Svaly hýbu kosťami',
                art: ARM,
                text: '<p><b>Svaly</b> sú pripojené ku kostiam. Keď sa sval <b>stiahne</b>, potiahne kosť a my sa pohneme. Skús ohnúť ruku v lakti a chyť si sval na ramene: cítiš, ako stvrdne?</p>',
              },
              {
                title: 'Pohyby s vôľou a bez nej',
                cards: [
                  { front: 'chôdza, písanie, skok', back: 'pohyby ovládané vôľou: rozhodnem sa', lang: SK },
                  { front: 'tlkot srdca', back: 'deje sa sám, bez našej vôle', lang: SK },
                  { front: 'dýchanie v spánku', back: 'tiež bez našej vôle', lang: SK },
                  { front: 'trasenie od zimy', back: 'svaly sa trasú samy a hrejú nás', lang: SK },
                ],
                text: '<p>Niektoré pohyby robíme, keď <b>chceme</b>. Iné robia svaly samy, aj keď spíme. Aj <b>srdce</b> je sval. Otoč kartičky.</p>',
              },
              {
                title: 'Únava a cvičenie',
                phrases: [
                  { es: 'únava svalov', en: 'po dlhej námahe svaly bolia', lang: SK },
                  { es: 'odpočinok', en: 'svaly sa zotavia', lang: SK },
                  { es: 'pravidelné cvičenie', en: 'svaly sú silnejšie', lang: SK },
                  { es: 'rozcvička', en: 'pripraví svaly na pohyb', lang: SK },
                ],
                text: '<p>Keď svaly dlho pracujú, <b>unavia sa</b> a potrebujú <b>odpočinok</b>. Kto pravidelne cvičí, má svaly silnejšie.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Svaly</b> sa sťahujú a hýbu kosťami.',
                  'Pohyby ovládané <b>vôľou</b>: chôdza. <b>Bez vôle</b>: tlkot srdca.',
                  'Unavené svaly potrebujú <b>odpočinok</b>.',
                  '<b>Pravidelné cvičenie</b> posilňuje svaly.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorý pohyb sa deje bez našej vôle?',
                options: ['písanie', 'skákanie', 'tlkot srdca', 'kopanie do lopty'], answer: 'tlkot srdca',
                explain: '<b>Srdce</b> bije samo, aj keď spíme.', hint: 'čo robí telo, aj keď spíme?' },
              { type: 'choice', prompt: 'Čo potrebujú unavené svaly?',
                options: ['ešte viac behu', 'odpočinok', 'sladkosti', 'zimu'], answer: 'odpočinok',
                explain: 'Unavené svaly sa zotavia pri <b>odpočinku</b>.', hint: 'čo robíš, keď si unavený?' },
              { type: 'choice', prompt: 'Čo robí sval, keď ohneš ruku?',
                options: ['zlomí sa', 'stiahne sa', 'zmizne', 'zmäkne'], answer: 'stiahne sa',
                explain: 'Sval sa <b>stiahne</b> a potiahne kosť.', hint: 'chyť si sval na ramene.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Srdce je tiež sval.', answer: true,
                explain: '<b>Pravda.</b> Srdce je sval, ktorý pracuje stále.', hint: 'pozri kartičky.' },
            ],
          },
        ],
      },
    ],
  });
})();
