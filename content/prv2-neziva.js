'use strict';

/* Prvouka · 2. ročník · Pôda, voda a vzduch (iŠVP 2015: Neživá príroda a skúmanie prírodných javov). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BROWN = '#8B5E34';
  const WATER = '#3E63DD';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const SOIL = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Rez pôdou: hore tráva, pod ňou tmavá vrstva humusu s dážďovkou, potom hnedá zemina a dole piesok a kamene.">
    <path d="M0 40 H320" stroke="${KELP}" stroke-width="8"/>
    ${Array.from({ length: 16 }, (_, i) => `<path d="M${10 + i * 20} 40 l-4 -14 M${10 + i * 20} 40 l4 -12" stroke="${KELP}" stroke-width="2.5" stroke-linecap="round"/>`).join('')}
    <rect x="0" y="44" width="320" height="44" fill="#4A3221"/>
    <rect x="0" y="88" width="320" height="50" fill="#8B5E34"/>
    <rect x="0" y="138" width="320" height="62" fill="#D9B48F"/>
    ${[[30, 160], [90, 176], [150, 158], [230, 172], [290, 156]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="8" fill="#8C87A8"/>`).join('')}
    <path class="a-bob" d="M80 70 q12 -10 24 0 t24 0 t24 0" fill="none" stroke="#E58C8A" stroke-width="7" stroke-linecap="round"/>
    <g ${T} font-size="13" fill="#FFFFFF"><text x="200" y="72">humus</text><text x="200" y="118">zemina</text></g>
    <text x="200" y="192" ${T} font-size="13" fill="${INK}">piesok a kamene</text>
  </svg>`;

  // Two glasses: sugar disappears in one, sand stays at the bottom of the other.
  const DISSOLVE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Dva poháre vody. Do prvého sypeme cukor a ten zmizne, rozpustí sa. Do druhého piesok, ktorý zostane na dne.">
    ${[70, 230].map((x) => `<path d="M${x - 44} 50 L${x - 36} 170 H${x + 36} L${x + 44} 50" fill="#E6EDF5" stroke="${INK}" stroke-width="3"/><rect x="${x - 40}" y="80" width="80" height="88" fill="${WATER}" opacity="0.18"/>`).join('')}
    ${[0, 1, 2, 3, 4, 5].map((i) => `<rect class="a-dropin" style="animation-delay: ${(i * 0.35).toFixed(2)}s" x="${58 + (i % 3) * 10}" y="40" width="5" height="5" fill="#FFFFFF" stroke="#C9C4E0"/>`).join('')}
    <path d="M196 164 q34 -12 68 0 v4 h-68z" fill="#D9B48F"/>
    ${[0, 1, 2, 3].map((i) => `<circle class="a-dropin" style="animation-delay: ${(i * 0.4).toFixed(1)}s" cx="${218 + i * 10}" cy="44" r="3" fill="#B9770E"/>`).join('')}
    <g ${T} font-size="13" text-anchor="middle"><text x="70" y="192" fill="${KELP}">cukor sa rozpustí</text><text x="230" y="192" fill="#C2412A">piesok nie</text></g>
  </svg>`;

  const FILTER = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Lievik s filtrom z papiera nad pohárom. Kalná voda s pieskom prechádza filtrom, piesok zostane vo filtri a do pohára kvapká čistá voda.">
    <path d="M110 30 H210 L170 90 V110 H150 V90 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M122 34 H198 L164 84 H156 Z" fill="#D9B48F" opacity="0.8"/>
    ${[0, 1, 2].map((i) => `<path class="a-drop" style="animation-delay: ${(i * 0.5).toFixed(1)}s" d="M160 116 q-4 7 0 10 q4 -3 0 -10z" fill="${WATER}"/>`).join('')}
    <path d="M118 140 L124 190 H196 L202 140" fill="#E6EDF5" stroke="${INK}" stroke-width="3"/><rect x="121" y="164" width="78" height="24" fill="${WATER}" opacity="0.25"/>
    <g ${T} font-size="12" fill="${INK}"><text x="214" y="50">piesok zostane</text><text x="214" y="66">vo filtri</text><text x="214" y="176" fill="${KELP}">čistá voda</text></g>
  </svg>`;

  const EVAPORATE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Miska slanej vody na slnku. Voda sa mení na paru a stúpa hore, na dne zostanú biele kryštáliky soli.">
    <g class="a-spin" style="transform-origin: 270px 40px"><circle cx="270" cy="40" r="18" fill="#F5C518"/>${Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * 2 * Math.PI; return `<path d="M${(270 + Math.cos(a) * 24).toFixed(1)} ${(40 + Math.sin(a) * 24).toFixed(1)} L${(270 + Math.cos(a) * 31).toFixed(1)} ${(40 + Math.sin(a) * 31).toFixed(1)}" stroke="#F5C518" stroke-width="3" stroke-linecap="round"/>`; }).join('')}</g>
    ${[0, 1, 2].map((i) => `<path class="a-bubble" style="animation-delay: ${(i * 1.1).toFixed(1)}s" d="M${120 + i * 30} 140 q-6 -10 0 -20 q6 -10 0 -20" fill="none" stroke="#C9C4E0" stroke-width="3" stroke-linecap="round"/>`).join('')}
    <path d="M70 150 q90 40 180 0 z" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/>
    ${Array.from({ length: 9 }, (_, i) => `<rect x="${110 + i * 11}" y="${156 + (i % 2) * 4}" width="6" height="6" fill="#FFFFFF" stroke="#8C87A8" stroke-width="1.2" transform="rotate(${i * 20} ${113 + i * 11} ${159 + (i % 2) * 4})"/>`).join('')}
    <g ${T} font-size="12" fill="${INK}"><text x="40" y="60">voda sa mení na paru</text><text x="110" y="194">soľ zostane</text></g>
  </svg>`;

  window.Octavo.addCourse({
    id: 'prv2-neziva',
    subject: 'Prvouka',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Pôda, voda a vzduch',
    blurb: 'Z čoho je pôda a kto v nej žije, čo sa vo vode rozpúšťa, filtrácia a odparovanie s pokusmi.',
    artBg: '#FAF5EF',
    units: [
      {
        title: 'Neživá príroda',
        lessons: [
          {
            id: 'prv2-neziva-poda',
            title: 'Pôda',
            minutes: 9,
            slides: [
              {
                title: 'Z čoho je pôda',
                art: SOIL,
                text: '<p>Pôda je z <b>piesku</b>, <b>ílu</b>, <b>kamienkov</b> a <b>humusu</b>. Humus je tmavá vrstva zo zhnitých listov a zvyškov rastlín a živočíchov. Čím viac humusu, tým je pôda <b>úrodnejšia</b>. V pôde je aj <b>voda</b> a <b>vzduch</b>.</p>',
              },
              {
                title: 'Kto žije v pôde',
                cards: [
                  { front: 'dážďovka', back: 'kyprí pôdu a robí z listov humus', lang: SK },
                  { front: 'krt', back: 'hrabe chodbičky, loví hmyz', lang: SK },
                  { front: 'chrobáky a larvy', back: 'rozkladajú zvyšky rastlín', lang: SK },
                  { front: 'mravce', back: 'stavajú v nej chodbičky', lang: SK },
                ],
                text: '<p>Živočíchy v pôde ju <b>kypria</b> a pomáhajú jej byť úrodnou. Otoč kartičky.</p>',
              },
              {
                title: 'Rôzne pôdy a čo im škodí',
                phrases: [
                  { es: 'piesočnatá pôda', en: 'voda ňou rýchlo pretečie', lang: SK },
                  { es: 'ílovitá pôda', en: 'drží vodu, je lepkavá', lang: SK },
                  { es: 'pokus', en: 'zemina v pohári s vodou sa usadí do vrstiev', lang: SK },
                  { es: 'znečistenie pôdy', en: 'odpadky, olej, chemikálie', lang: SK },
                ],
                text: '<p>Pôdu chránime: <b>neodhadzujeme odpadky</b>, triedime odpad a nevylievame olej ani farby na zem.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Pôda je z <b>piesku, ílu, kamienkov a humusu</b>, je v nej aj voda a vzduch.',
                  'Veľa humusu = <b>úrodná</b> pôda.',
                  '<b>Dážďovky</b> pôdu kypria.',
                  'Pôdu <b>chránime</b> pred odpadkami a chemikáliami.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Vďaka čomu je pôda úrodná?',
                options: ['vďaka kameňom', 'vďaka humusu', 'vďaka plastom', 'vďaka soli'], answer: 'vďaka humusu',
                explain: '<b>Humus</b> je plný živín pre rastliny.', hint: 'tmavá vrstva zo zhnitých listov.' },
              { type: 'choice', prompt: 'Ktorý živočích kyprí pôdu?',
                options: ['vrabec', 'dážďovka', 'ryba', 'motýľ'], answer: 'dážďovka',
                explain: '<b>Dážďovka</b> robí v pôde chodbičky a kyprí ju.', hint: 'žije v zemi a vylieza po daždi.' },
              { type: 'choice', prompt: 'Ktorou pôdou voda pretečie najrýchlejšie?',
                options: ['ílovitou', 'piesočnatou', 'humusovou', 'každou rovnako'], answer: 'piesočnatou',
                explain: '<b>Piesočnatá</b> pôda vodu nedrží.', hint: 'čo sa deje s vodou na pláži?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'V pôde je aj voda a vzduch.', answer: true,
                explain: '<b>Pravda.</b> Inak by v nej nemohli žiť korene ani dážďovky.', hint: 'čo potrebujú korene?' },
            ],
          },
          {
            id: 'prv2-neziva-rozpustanie',
            title: 'Čo sa rozpúšťa vo vode',
            minutes: 9,
            slides: [
              {
                title: 'Pokus s cukrom a pieskom',
                art: DISSOLVE,
                text: '<p>Cukor vo vode <b>zmizne</b>, ale je tam: voda je sladká. Hovoríme, že sa <b>rozpustil</b>. Piesok sa nerozpustí, zostane na dne.</p>',
              },
              {
                title: 'Rozpustí sa, či nie?',
                cards: [
                  { front: 'cukor', back: 'rozpustí sa', lang: SK },
                  { front: 'soľ', back: 'tiež sa rozpustí', lang: SK },
                  { front: 'piesok', back: 'nerozpustí sa, klesne na dno', lang: SK },
                  { front: 'olej', back: 'nerozpustí sa, pláva na hladine', lang: SK },
                ],
                text: '<p>Vyskúšaj to doma s dospelým. Otoč kartičky.</p>',
              },
              {
                title: 'Ako to urýchliť',
                phrases: [
                  { es: 'teplá voda', en: 'v teplej sa rozpúšťa rýchlejšie', lang: SK },
                  { es: 'miešanie', en: 'lyžičkou to ide rýchlejšie', lang: SK },
                  { es: 'rozdrvenie', en: 'kryštálový cukor rýchlejšie ako kocka', lang: SK },
                  { es: 'ochutnanie', en: 'ako zistím, či je v čaji cukor', lang: SK },
                ],
                text: '<p>Či je látka vo vode, zistíme <b>ochutnaním</b> (iba pri bezpečných veciach ako cukor či soľ!) alebo <b>odparením</b> vody.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Cukor a soľ</b> sa vo vode rozpustia.',
                  '<b>Piesok a olej</b> sa nerozpustia.',
                  'Rozpúšťanie urýchli <b>teplá voda, miešanie a rozdrvenie</b>.',
                  'Rozpustená látka vo vode <b>je</b>, len ju nevidíme.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Čo sa vo vode rozpustí?',
                options: ['piesok', 'kamienok', 'soľ', 'olej'], answer: 'soľ',
                explain: '<b>Soľ</b> sa vo vode rozpustí.', hint: 'more je slané.' },
              { type: 'choice', prompt: 'Ako urýchliš rozpúšťanie cukru v čaji?',
                options: ['dám ho do mrazničky', 'zamiešam lyžičkou', 'počkám do zajtra', 'pridám piesok'], answer: 'zamiešam lyžičkou',
                explain: '<b>Miešanie</b> rozpúšťanie urýchli. Pomôže aj teplá voda.', hint: 'čo robíš lyžičkou?' },
              { type: 'choice', prompt: 'Čo urobí olej vo vode?',
                options: ['rozpustí sa', 'zmizne', 'pláva na hladine', 'zmení sa na soľ'], answer: 'pláva na hladine',
                explain: 'Olej sa nerozpustí a <b>pláva na hladine</b>.', hint: 'pozri kartičky.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Rozpustený cukor z vody zmizol a už v nej nie je.', answer: false,
                explain: '<b>Nepravda.</b> Cukor je vo vode, len ho nevidíme. Voda je sladká.', hint: 'aká je voda na chuť?' },
            ],
          },
          {
            id: 'prv2-neziva-filtracia',
            title: 'Filtrácia a odparovanie',
            minutes: 9,
            slides: [
              {
                title: 'Filtrácia',
                art: FILTER,
                text: '<p>Kalnú vodu s pieskom vyčistíme <b>filtráciou</b>: prelejeme ju cez filter z papiera alebo vaty. <b>Piesok</b> zostane vo filtri, voda pretečie. Rozpustenú soľ však filter <b>nezachytí</b>.</p>',
              },
              {
                title: 'Odparovanie',
                art: EVAPORATE,
                text: '<p>Na slnku alebo pri teple sa voda mení na <b>paru</b> a stratí sa vo vzduchu. Tomu hovoríme <b>odparovanie</b>. Keď necháme odpariť slanú vodu, na dne zostanú <b>kryštáliky soli</b>.</p>',
              },
              {
                title: 'Odparovanie okolo nás',
                phrases: [
                  { es: 'Kaluž po daždi vyschne.', en: 'voda sa odparí', lang: SK },
                  { es: 'Bielizeň na šnúre uschne.', en: 'voda z nej sa odparí', lang: SK },
                  { es: 'Z hrnca stúpa para.', en: 'horúca voda sa odparuje rýchlo', lang: SK },
                  { es: 'Z morskej vody sa robí soľ.', en: 'vodu nechajú odpariť', lang: SK },
                ],
                text: '<p>Odparovanie vidíš každý deň. Čím je <b>teplejšie</b>, tým je rýchlejšie.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Filtrácia</b> oddelí piesok od vody, rozpustenú soľ nie.',
                  '<b>Odparovanie</b>: voda sa mení na paru.',
                  'Po odparení slanej vody zostane <b>soľ</b>.',
                  'Teplo odparovanie <b>urýchli</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Čo zostane vo filtri, keď cez neho prelejeme vodu s pieskom?',
                options: ['voda', 'piesok', 'soľ', 'nič'], answer: 'piesok',
                explain: 'Vo filtri zostane <b>piesok</b>, voda pretečie.', hint: 'čo neprejde cez papier?' },
              { type: 'choice', prompt: 'Čo zostane v miske, keď sa slaná voda odparí?',
                options: ['piesok', 'cukor', 'soľ', 'para'], answer: 'soľ',
                explain: 'Voda sa odparí, <b>soľ</b> zostane.', hint: 'čo bolo vo vode rozpustené?' },
              { type: 'order', prompt: 'Zoraď pokus s odparovaním.',
                items: ['rozpustím soľ vo vode', 'nalejem vodu do misky', 'dám misku na slnko', 'na dne zostane soľ'],
                explain: 'Rozpustím, nalejem, nechám odpariť a <b>soľ zostane</b>.', hint: 'čo musím urobiť najprv?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Filter zachytí aj rozpustenú soľ.', answer: false,
                explain: '<b>Nepravda.</b> Rozpustená soľ prejde filtrom s vodou.', hint: 'soľ vo vode nevidno.' },
            ],
          },
        ],
      },
    ],
  });
})();
