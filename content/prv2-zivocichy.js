'use strict';

/* Prvouka · 2. ročník · Živočíchy (iŠVP 2015: Človek a príroda). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BROWN = '#8B5E34';
  const LEAF = '#30A46C';
  const HONEY = '#F5C518';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  // Frog life cycle in a circle: egg, tadpole, tadpole with legs, frog.
  const FROG = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Kruh vývinu žaby: vajíčka, žubrienka, žubrienka s nožičkami a dospelá žaba. Žubrienka sa na žabu vôbec nepodobá.">
    <circle class="ap-curve" pathLength="100" cx="160" cy="100" r="66" fill="none" stroke="#C9C4E0" stroke-width="3" stroke-dasharray="100"/>
    <g class="ap-note" style="--d: 0.2s">${[0, 1, 2, 3, 4].map((i) => `<circle cx="${148 + (i % 3) * 12}" cy="${26 + Math.floor(i / 3) * 10}" r="6" fill="#DDF5F1" stroke="${LEAF}" stroke-width="1.5"/><circle cx="${148 + (i % 3) * 12}" cy="${26 + Math.floor(i / 3) * 10}" r="2" fill="${INK}"/>`).join('')}<text x="160" y="58" text-anchor="middle" ${T} font-size="12" fill="${INK}">vajíčka</text></g>
    <g class="ap-note" style="--d: 0.8s"><ellipse cx="250" cy="98" rx="10" ry="8" fill="#4A4566"/><path d="M240 98 q-14 -6 -20 4" fill="none" stroke="#4A4566" stroke-width="3"/><text x="252" y="124" text-anchor="middle" ${T} font-size="12" fill="${INK}">žubrienka</text></g>
    <g class="ap-note" style="--d: 1.4s"><ellipse cx="160" cy="166" rx="12" ry="9" fill="#4A6E3A"/><path d="M148 166 q-12 -4 -16 4 M164 174 l6 8 M156 174 l-6 8" fill="none" stroke="#4A6E3A" stroke-width="3"/><text x="160" y="196" text-anchor="middle" ${T} font-size="12" fill="${INK}">s nožičkami</text></g>
    <g class="ap-note" style="--d: 2s"><ellipse cx="70" cy="100" rx="20" ry="14" fill="${LEAF}"/><circle cx="62" cy="86" r="6" fill="${LEAF}"/><circle cx="78" cy="86" r="6" fill="${LEAF}"/><circle cx="62" cy="86" r="2.5" fill="${INK}"/><circle cx="78" cy="86" r="2.5" fill="${INK}"/><path d="M52 110 l-10 8 M88 110 l10 8" stroke="${LEAF}" stroke-width="4" stroke-linecap="round"/><text x="70" y="134" text-anchor="middle" ${T} font-size="12" fill="${INK}">žaba</text></g>
  </svg>`;

  const FARM = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Štyri hospodárske zvieratá a čo nám dávajú: krava mlieko, ovca vlnu, sliepka vajcia, včela med.">
    ${[['krava', 'mlieko', '#FFFFFF'], ['ovca', 'vlna', '#F1F1F1'], ['sliepka', 'vajcia', '#FFE9E2'], ['včela', 'med', '#FEF3DD']].map(([a, p, c], i) => {
      const x = 42 + i * 78;
      return `<g ${pop((0.2 + i * 0.4).toFixed(1))}><circle cx="${x}" cy="70" r="32" fill="${c}" stroke="${BROWN}" stroke-width="2.5"/><text x="${x}" y="76" text-anchor="middle" ${T} font-size="14" fill="${INK}">${a}</text>
        <path d="M${x} 108 v18 m-6 -6 l6 6 l6 -6" fill="none" stroke="${BROWN}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="${x - 32}" y="134" width="64" height="32" rx="10" fill="#FFFFFF" stroke="${LEAF}" stroke-width="2"/><text x="${x}" y="155" text-anchor="middle" ${T} font-size="13" fill="${LEAF}">${p}</text></g>`;
    }).join('')}
  </svg>`;

  // A honeycomb with a bee.
  function hex(cx, cy, r, fill) {
    const pts = Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * 2 * Math.PI + Math.PI / 6; return `${(cx + Math.cos(a) * r).toFixed(1)},${(cy + Math.sin(a) * r).toFixed(1)}`; }).join(' ');
    return `<polygon points="${pts}" fill="${fill}" stroke="#B9770E" stroke-width="2"/>`;
  }
  const COMB = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Plást zo šesťuholníkových buniek naplnených medom a nad ním lietajúca včela.">
    ${[[0, 0], [1, 0], [2, 0], [0.5, 1], [1.5, 1], [2.5, 1], [0, 2], [1, 2], [2, 2]].map(([c, r], i) => hex(70 + c * 36, 60 + r * 32, 20, i % 3 === 1 ? '#FEF3DD' : HONEY)).join('')}
    <g class="a-bob"><ellipse cx="240" cy="80" rx="22" ry="14" fill="${HONEY}"/><path d="M228 70 v20 M240 67 v26 M252 70 v20" stroke="${INK}" stroke-width="4"/><circle cx="264" cy="78" r="8" fill="${INK}"/><ellipse cx="232" cy="62" rx="12" ry="8" fill="#E6EDF5" opacity="0.9"/><ellipse cx="248" cy="60" rx="12" ry="8" fill="#E6EDF5" opacity="0.9"/></g>
    <g ${T} font-size="13" fill="${INK}" text-anchor="middle"><text x="106" y="176">plást s medom</text><text x="240" y="130">robotnica</text></g>
  </svg>`;

  window.Octavo.addCourse({
    id: 'prv2-zivocichy',
    subject: 'Prvouka',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Živočíchy',
    blurb: 'Ako živočíchy žijú a rastú, čo nám dávajú hospodárske zvieratá a ako žijú včely a mravce.',
    artBg: '#FAF5EF',
    units: [
      {
        title: 'Život živočíchov',
        lessons: [
          {
            id: 'prv2-zivocichy-rast',
            title: 'Rast a mláďatá',
            minutes: 8,
            slides: [
              {
                title: 'Mláďa sa nemusí podobať rodičom',
                art: FROG,
                replay: 'Ukázať znova',
                autoplay: true,
                text: '<p>Živočíchy <b>rastú, vyvíjajú sa, dospievajú</b> a <b>starnú</b>. Niektoré mláďatá vyzerajú ako malí rodičia (mačiatko), iné sa im vôbec nepodobajú: zo <b>žubrienky</b> vyrastie <b>žaba</b>, z húsenice motýľ.</p>',
              },
              {
                title: 'Kto je čie mláďa?',
                cards: [
                  { front: 'krava', back: 'teľa', lang: SK },
                  { front: 'ovca', back: 'jahňa', lang: SK },
                  { front: 'kôň', back: 'žriebä', lang: SK },
                  { front: 'sliepka', back: 'kuriatko', lang: SK },
                  { front: 'koza', back: 'kozľa', lang: SK },
                ],
                text: '<p>Otoč kartičky a vypočuj si, ako sa volajú mláďatá.</p>',
              },
              {
                title: 'Živočíchy a rastliny žijú',
                phrases: [
                  { es: 'Živočíchy dýchajú.', en: 'aj rastliny dýchajú', lang: SK },
                  { es: 'Živočíchy prijímajú potravu.', en: 'rastliny prijímajú vodu a živiny', lang: SK },
                  { es: 'Živočíchy sa pohybujú.', en: 'rastliny sa z miesta nepohnú', lang: SK },
                  { es: 'Živočíchy majú mláďatá.', en: 'rastliny majú semená', lang: SK },
                ],
                text: '<p>Životné prejavy živočíchov sú <b>podobné</b> ako u rastlín, ale ich spôsob života je iný. Aj <b>dĺžka života</b> je rôzna: mucha žije pár týždňov, korytnačka aj vyše sto rokov.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Živočíchy <b>rastú, vyvíjajú sa, dospievajú a starnú</b>.',
                  'Niektoré mláďatá sa rodičom nepodobajú: <b>žubrienka – žaba</b>.',
                  'Mláďatá: teľa, jahňa, žriebä, kuriatko, kozľa.',
                  'Živočíchy dýchajú, prijímajú potravu a <b>pohybujú sa</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako sa volá mláďa koňa?',
                options: ['teľa', 'žriebä', 'jahňa', 'kozľa'], answer: 'žriebä',
                explain: 'Mláďa koňa je <b>žriebä</b>.', hint: 'pozri kartičky.' },
              { type: 'order', prompt: 'Zoraď, ako sa vyvíja žaba.',
                items: ['vajíčka', 'žubrienka', 'žubrienka s nožičkami', 'žaba'],
                explain: 'Vajíčka, žubrienka, nožičky a nakoniec <b>žaba</b>.', hint: 'začína sa vajíčkom.' },
              { type: 'choice', prompt: 'Čo robia živočíchy, ale rastliny nie?',
                options: ['dýchajú', 'rastú', 'pohybujú sa z miesta', 'potrebujú vodu'], answer: 'pohybujú sa z miesta',
                explain: 'Živočíchy sa <b>pohybujú z miesta</b>, rastliny nie.', hint: 'môže strom odísť?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Všetky mláďatá vyzerajú ako ich rodičia.', answer: false,
                explain: '<b>Nepravda.</b> Žubrienka sa na žabu nepodobá.', hint: 'spomeň si na žabu.' },
            ],
          },
          {
            id: 'prv2-zivocichy-chov',
            title: 'Chov zvierat a potrava',
            minutes: 8,
            slides: [
              {
                title: 'Čo nám zvieratá dávajú',
                art: FARM,
                text: '<p>Človek chová <b>hospodárske zvieratá</b>, lebo mu dávajú potravu a suroviny. Krava dáva mlieko, ovca vlnu aj mlieko na bryndzu, sliepka vajcia, včela med.</p>',
              },
              {
                title: 'Úžitok z chovu',
                cards: [
                  { front: 'krava', back: 'mlieko, mäso, koža', lang: SK },
                  { front: 'ovca', back: 'vlna, mlieko, bryndza', lang: SK },
                  { front: 'sliepka', back: 'vajcia, mäso, perie', lang: SK },
                  { front: 'včela', back: 'med a vosk', lang: SK },
                  { front: 'kôň', back: 'práca na poli, jazda', lang: SK },
                ],
                text: '<p>O hospodárske zvieratá sa treba starať: kŕmiť ich, napájať a čistiť im maštaľ. Otoč kartičky.</p>',
              },
              {
                title: 'Kto čo je',
                phrases: [
                  { es: 'bylinožravec', en: 'je rastliny: krava, zajac', lang: SK },
                  { es: 'mäsožravec', en: 'je iné živočíchy: vlk, líška', lang: SK },
                  { es: 'všežravec', en: 'je rastliny aj mäso: medveď, prasa', lang: SK },
                  { es: 'človek', en: 'jeme rastlinnú aj živočíšnu potravu', lang: SK },
                ],
                text: '<p>Živočíchy získavajú potravu <b>rôzne</b>. Aj človek je <b>všežravec</b>: jeme zeleninu, ovocie, chlieb, ale aj mlieko, vajcia a mäso.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Hospodárske zvieratá</b> nám dávajú potravu a suroviny.',
                  'Krava mlieko, ovca vlnu, sliepka vajcia, včela med.',
                  '<b>Bylinožravce</b> jedia rastliny, <b>mäsožravce</b> mäso, <b>všežravce</b> oboje.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktoré zviera nám dáva vlnu?',
                options: ['krava', 'sliepka', 'ovca', 'kôň'], answer: 'ovca',
                explain: 'Vlnu dáva <b>ovca</b>.', hint: 'z čoho je sveter?' },
              { type: 'choice', prompt: 'Čo je vlk?',
                options: ['bylinožravec', 'mäsožravec', 'všežravec'], answer: 'mäsožravec',
                explain: 'Vlk loví iné živočíchy, je <b>mäsožravec</b>.', hint: 'čo vlk je?' },
              { type: 'choice', prompt: 'Čo nám dáva včela?',
                options: ['mlieko', 'vajcia', 'vlnu', 'med a vosk'], answer: 'med a vosk',
                explain: 'Včela nám dáva <b>med a vosk</b>.', hint: 'z čoho sú sviečky?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Krava je bylinožravec.', answer: true,
                explain: '<b>Pravda.</b> Krava je trávu a seno.', hint: 'čo krava je?' },
            ],
          },
          {
            id: 'prv2-zivocichy-vcely',
            title: 'Včely a mravce',
            minutes: 9,
            slides: [
              {
                title: 'Spoločenský hmyz',
                art: COMB,
                text: '<p>Včely a mravce žijú spolu vo veľkom <b>spoločenstve</b>. Každý má svoju úlohu a spolu sa im darí lepšie ako osamote. Hovoríme im <b>spoločenský hmyz</b>.</p>',
              },
              {
                title: 'Včelia rodina',
                cards: [
                  { front: 'matka', back: 'jediná v úli, kladie vajíčka', lang: SK },
                  { front: 'trúd', back: 'samček, nezbiera nektár', lang: SK },
                  { front: 'robotnica', back: 'zbiera nektár a peľ, stavia plásty, stráži úľ', lang: SK },
                  { front: 'úľ', back: 'domček včiel, postaví ho včelár', lang: SK },
                ],
                text: '<p>Včely bývajú v <b>úli</b>. Z vosku stavajú <b>plásty</b> so šesťuholníkovými bunkami a ukladajú do nich med. Otoč kartičky.</p>',
              },
              {
                title: 'Mravenisko',
                phrases: [
                  { es: 'mravenisko', en: 'dom mravcov z ihličia a hliny', lang: SK },
                  { es: 'kráľovná', en: 'kladie vajíčka', lang: SK },
                  { es: 'mravce robotníky', en: 'nosia potravu a stavajú', lang: SK },
                  { es: 'opeľovanie', en: 'včely prenášajú peľ z kvetu na kvet', lang: SK },
                ],
                text: '<p>Mravce čistia les od zvyškov a rozširujú semená. Včely pri zbere nektáru <b>opeľujú</b> kvety, preto máme ovocie. Mravenisko ani úľ nikdy neničíme.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Včely a mravce sú <b>spoločenský hmyz</b>.',
                  'Včelia rodina: <b>matka, trúdy, robotnice</b>.',
                  'Včely <b>opeľujú</b> kvety a dávajú nám med.',
                  'Mravce žijú v <b>mravenisku</b> a čistia les.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Kto vo včelej rodine kladie vajíčka?',
                options: ['robotnica', 'trúd', 'matka', 'včelár'], answer: 'matka',
                explain: 'Vajíčka kladie <b>matka</b>.', hint: 'je v úli jediná.' },
              { type: 'choice', prompt: 'Aký tvar majú bunky v pláste?',
                options: ['kruh', 'šesťuholník', 'štvorec', 'trojuholník'], answer: 'šesťuholník',
                explain: 'Bunky plástu sú <b>šesťuholníky</b>.', hint: 'pozri obrázok plástu.' },
              { type: 'choice', prompt: 'Prečo sú včely dôležité pre ovocie?',
                options: ['jedia ho', 'opeľujú kvety', 'strážia sad', 'polievajú stromy'], answer: 'opeľujú kvety',
                explain: 'Včely <b>opeľujú</b> kvety, z opelených kvetov sa urodí ovocie.', hint: 'čo prenášajú z kvetu na kvet?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Mravce žijú v spoločenstve v mravenisku.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'sú spoločenský hmyz.' },
            ],
          },
        ],
      },
    ],
  });
})();
