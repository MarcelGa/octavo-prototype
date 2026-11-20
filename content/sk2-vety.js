'use strict';

/* Slovenčina · 2. ročník · Veta (iŠVP 2015: druhy viet, interpunkcia, veľké písmeno, neúplná veta). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BLUE = '#4C6A92';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const MARKS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri znamienka na konci vety: bodka, otáznik a výkričník, každé s príkladom vety.">
    ${[['.', 'Prší.', BLUE], ['?', 'Prší?', CORAL], ['!', 'Prší!', KELP]].map(([m, s, c], i) => `
    <g ${pop((0.2 + i * 0.5).toFixed(1))}>
      <circle cx="${56 + i * 104}" cy="80" r="40" fill="#FFFFFF" stroke="${c}" stroke-width="4"/>
      <text x="${56 + i * 104}" y="${m === '.' ? 92 : 100}" text-anchor="middle" ${T} font-size="${m === '.' ? 60 : 52}" fill="${c}">${m}</text>
      <text x="${56 + i * 104}" y="150" text-anchor="middle" ${T} font-size="20" fill="${INK}">${s}</text>
    </g>`).join('')}
    <text x="160" y="186" text-anchor="middle" ${T} font-size="13" fill="#4A4566">to isté slovo, iná veta</text>
  </svg>`;

  const CAPITALS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Veta: Janka a pes Dunčo bývajú v Žiline. Veľké písmená J, D a Ž sú zvýraznené.">
    <text x="160" y="84" text-anchor="middle" ${T} font-size="24" fill="${INK}"><tspan fill="#C2412A">J</tspan>anka a pes <tspan fill="#C2412A">D</tspan>unčo</text>
    <text x="160" y="120" text-anchor="middle" ${T} font-size="24" fill="${INK}">bývajú v <tspan fill="#C2412A">Ž</tspan>iline.</text>
    <g ${T} font-size="12" fill="${BLUE}" text-anchor="middle">
      <g ${pop(0.5)}><path d="M60 50 v14" stroke="${BLUE}" stroke-width="2"/><text x="60" y="44">začiatok vety, meno</text></g>
      <g ${pop(1)}><text x="214" y="44">meno zvieraťa</text><path d="M200 50 v14" stroke="${BLUE}" stroke-width="2"/></g>
      <g ${pop(1.5)}><path d="M176 128 v14" stroke="${BLUE}" stroke-width="2"/><text x="176" y="160">názov mesta</text></g>
    </g>
  </svg>`;

  const ORDER = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Rozhádzané slová mlieko, pije, Mačka. Pod nimi poskladaná veta: Mačka pije mlieko.">
    ${[['mlieko.', 40, 40], ['pije', 150, 26], ['Mačka', 236, 48]].map(([w, x, y], i) => `<g ${pop((0.1 + i * 0.2).toFixed(1))}><rect x="${x - 6}" y="${y}" width="${w.length * 12 + 14}" height="34" rx="8" fill="#E6EDF5" stroke="${BLUE}" stroke-width="2" transform="rotate(${[-6, 4, -3][i]} ${x} ${y})"/><text x="${x + 1}" y="${y + 23}" ${T} font-size="18" fill="${INK}" transform="rotate(${[-6, 4, -3][i]} ${x} ${y})">${w}</text></g>`).join('')}
    <path d="M160 96 v24 m-8 -8 l8 8 l8 -8" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g ${pop(1.2)}><rect x="54" y="132" width="212" height="44" rx="12" fill="#E0F4E8" stroke="${KELP}" stroke-width="2.5"/>
    <text x="160" y="161" text-anchor="middle" ${T} font-size="21" fill="${INK}">Mačka pije mlieko.</text></g>
  </svg>`;

  window.Octavo.addCourse({
    id: 'sk2-vety',
    subject: 'Slovenčina',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Veta',
    blurb: 'Päť druhov viet, bodka, otáznik a výkričník, veľké písmená a správne poradie slov.',
    artBg: '#F3F6FA',
    units: [
      {
        title: 'Druhy viet a písanie',
        lessons: [
          {
            id: 'sk2-vety-druhy',
            title: 'Druhy viet',
            minutes: 9,
            slides: [
              {
                title: 'Znamienka na konci vety',
                art: MARKS,
                text: '<p>Na konci vety píšeme <b>bodku</b>, <b>otáznik</b> alebo <b>výkričník</b>. Znamienko prezradí, či niečo oznamujeme, pýtame sa, alebo voláme.</p>',
              },
              {
                title: 'Päť druhov viet',
                phrases: [
                  { es: 'Vonku prší.', en: 'oznamovacia veta: niečo oznamujem, bodka', lang: SK },
                  { es: 'Prší vonku?', en: 'opytovacia veta: pýtam sa, otáznik', lang: SK },
                  { es: 'Zatvor okno!', en: 'rozkazovacia veta: rozkazujem, výkričník alebo bodka', lang: SK },
                  { es: 'Kiežby už nepršalo!', en: 'želacia veta: niečo si želám', lang: SK },
                  { es: 'To je ale lejak!', en: 'zvolacia veta: niečo zvolám, výkričník', lang: SK },
                ],
                text: '<p>Vypočuj si vety a všimni si <b>melódiu</b>: pri otázke hlas na konci stúpa, pri oznámení klesá.</p>',
              },
              {
                title: 'Ktorá je ktorá?',
                cards: [
                  { front: 'oznamovacia', back: 'niečo oznamuje: .', lang: SK },
                  { front: 'opytovacia', back: 'pýta sa: ?', lang: SK },
                  { front: 'rozkazovacia', back: 'rozkazuje alebo prosí: ! alebo .', lang: SK },
                  { front: 'želacia', back: 'vyjadruje želanie: ! alebo .', lang: SK },
                  { front: 'zvolacia', back: 'vyjadruje city, údiv: !', lang: SK },
                ],
                text: '<p>Otoč kartičky a zopakuj si, aké znamienko patrí na koniec.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Oznamovacia</b> veta: bodka. <b>Opytovacia</b>: otáznik.',
                  '<b>Rozkazovacia</b> a <b>želacia</b>: výkričník alebo bodka.',
                  '<b>Zvolacia</b>: výkričník.',
                  'Pri otázke hlas na konci <b>stúpa</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Aké znamienko patrí na koniec vety: Kedy ideme domov',
                options: ['.', '!', '?'], answer: '?',
                explain: 'Je to <b>opytovacia</b> veta, patrí za ňu otáznik.', hint: 'pýtame sa.' },
              { type: 'choice', prompt: 'Aký je to druh vety: Podaj mi pero!',
                options: ['oznamovacia', 'rozkazovacia', 'opytovacia', 'želacia'], answer: 'rozkazovacia',
                explain: 'Niekomu rozkazujeme: <b>rozkazovacia</b> veta.', hint: 'čo má druhý urobiť?' },
              { type: 'choice', prompt: 'Ktorá veta je želacia?',
                options: ['Kiežby bolo leto!', 'Je leto.', 'Je leto?', 'Choď von!'], answer: 'Kiežby bolo leto!',
                explain: '<b>Kiežby bolo leto!</b> vyjadruje želanie.', hint: 'hľadaj slovo kiežby.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Na konci oznamovacej vety píšeme bodku.', answer: true,
                explain: '<b>Pravda.</b> Napríklad: Vonku prší.', hint: 'oznamujeme niečo pokojne.' },
            ],
          },
          {
            id: 'sk2-vety-velke',
            title: 'Veľké písmeno',
            minutes: 7,
            slides: [
              {
                title: 'Kde píšeme veľké písmeno',
                art: CAPITALS,
                text: '<p>Veľké písmeno píšeme na <b>začiatku vety</b>, v <b>menách a priezviskách</b> ľudí (Janka Nová), v <b>menách zvierat</b> (Dunčo) a v <b>názvoch miest a obcí</b> (Žilina).</p>',
              },
              {
                title: 'Mená a názvy',
                phrases: [
                  { es: 'Peter Malý', en: 'meno a priezvisko', lang: SK },
                  { es: 'Micka', en: 'meno mačky', lang: SK },
                  { es: 'Bratislava', en: 'hlavné mesto', lang: SK },
                  { es: 'Slovensko', en: 'názov štátu', lang: SK },
                ],
                text: '<p>Všetky tieto slová sa začínajú <b>veľkým písmenom</b>. Malým píšeme obyčajné slová: mačka, mesto, chlapec.</p>',
              },
              {
                title: 'Veľké alebo malé?',
                cards: [
                  { front: 'pes / Bobík', back: 'pes malým, Bobík veľkým', lang: SK },
                  { front: 'mesto / Košice', back: 'mesto malým, Košice veľkým', lang: SK },
                  { front: 'dievča / Ema', back: 'dievča malým, Ema veľkým', lang: SK },
                  { front: 'rieka / Váh', back: 'rieka malým, Váh veľkým', lang: SK },
                ],
                text: '<p>Obyčajné pomenovanie píšeme malým, <b>meno</b> veľkým. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Veľké písmeno: <b>začiatok vety</b>.',
                  '<b>Mená a priezviská</b>, <b>mená zvierat</b>.',
                  '<b>Názvy</b> miest, obcí, riek a štátov.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktoré slovo píšeme veľkým písmenom?',
                options: ['pes', 'mesto', 'trnava', 'stôl'], answer: 'trnava',
                explain: '<b>Trnava</b> je názov mesta, píšeme ju veľkým T.', hint: 'hľadaj názov.' },
              { type: 'choice', prompt: 'Ktorá veta je napísaná správne?',
                options: ['môj pes sa volá Rex.', 'Môj pes sa volá rex.', 'Môj pes sa volá Rex.', 'môj Pes sa volá rex.'], answer: 'Môj pes sa volá Rex.',
                explain: 'Veľké M na začiatku vety a veľké R v mene psa.', hint: 'začiatok vety a meno.' },
              { type: 'choice', prompt: 'Prečo píšeme Ema s veľkým E?',
                options: ['je to meno', 'je to dlhé slovo', 'je to zviera', 'je na konci vety'], answer: 'je to meno',
                explain: '<b>Ema</b> je meno, preto veľké písmeno.', hint: 'kto je Ema?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Slovo mačka píšeme vždy veľkým písmenom.', answer: false,
                explain: '<b>Nepravda.</b> Mačka je obyčajné slovo. Veľkým ho píšeme len na začiatku vety.', hint: 'je to meno?' },
            ],
          },
          {
            id: 'sk2-vety-poradie',
            title: 'Neúplná veta a poradie slov',
            minutes: 8,
            slides: [
              {
                title: 'Poskladaj vetu',
                art: ORDER,
                text: '<p>Slová vo vete musia byť v <b>správnom poradí</b>, aby veta dávala zmysel. Z rozhádzaných slov sme poskladali vetu <b>Mačka pije mlieko.</b></p>',
              },
              {
                title: 'Celá alebo neúplná?',
                cards: [
                  { front: 'Ocko číta noviny.', back: 'celá veta', lang: SK },
                  { front: 'Ocko číta', back: 'neúplná: čo číta? Chýba bodka.', lang: SK },
                  { front: 'Na stole leží', back: 'neúplná: čo leží?', lang: SK },
                  { front: 'Na stole leží kniha.', back: 'celá veta s bodkou', lang: SK },
                ],
                text: '<p><b>Neúplnej vete</b> niečo chýba, nevieme, čo nám chce povedať. Celá veta sa začína veľkým písmenom a končí znamienkom.</p>',
              },
              {
                title: 'Vypočuj si celé vety',
                phrases: [
                  { es: 'Babka pečie koláč.', en: 'kto? babka, čo robí? pečie', lang: SK },
                  { es: 'Deti sa hrajú na ihrisku.', en: 'kto? deti, kde? na ihrisku', lang: SK },
                  { es: 'Vtáky odlietajú na juh.', en: 'kto? vtáky, kam? na juh', lang: SK },
                  { es: 'Jano si obul topánky.', en: 'kto? Jano, čo urobil? obul si', lang: SK },
                ],
                text: '<p>V celej vete zvyčajne vieme, <b>kto</b> to je a <b>čo robí</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Slová vo vete majú <b>správne poradie</b>.',
                  '<b>Neúplnej vete</b> chýba časť, nedáva zmysel.',
                  'Veta sa začína <b>veľkým písmenom</b> a končí <b>znamienkom</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Poskladaj vetu zo slov.',
                items: ['Deti', 'sa', 'hrajú', 'na', 'ihrisku.'],
                explain: '<b>Deti sa hrajú na ihrisku.</b>', hint: 'začni slovom s veľkým písmenom.' },
              { type: 'choice', prompt: 'Ktorá veta je neúplná?',
                options: ['Babka pečie koláč.', 'Na stole leží', 'Pes šteká.', 'Ide vlak.'], answer: 'Na stole leží',
                explain: '<b>Na stole leží</b>: nevieme čo, chýba aj bodka.', hint: 'hľadaj vetu, ktorej niečo chýba.' },
              { type: 'choice', prompt: 'Čo patrí na koniec celej oznamovacej vety?',
                options: ['nič', 'čiarka', 'bodka', 'spojovník'], answer: 'bodka',
                explain: 'Na koniec oznamovacej vety patrí <b>bodka</b>.', hint: 'spomeň si na druhy viet.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Veta „mlieko Mačka pije.“ má správne poradie slov.', answer: false,
                explain: '<b>Nepravda.</b> Správne je: Mačka pije mlieko.', hint: 'čím sa veta začína?' },
            ],
          },
        ],
      },
    ],
  });
})();
