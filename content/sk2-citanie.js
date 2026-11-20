'use strict';

/* Slovenčina · 2. ročník · Čítanie a literatúra (iŠVP 2015: literárna zložka). Básne a texty sú pôvodné. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const P = 'font-family="Nunito, sans-serif" font-weight="700"';
  const INK = '#1E1A3C';
  const BLUE = '#4C6A92';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  // An original poem: two stanzas of four lines. Rhyming endings are coloured.
  const POEM = [
    ['Po lúke sa zajko <tspan fill="#C2412A">hrá</tspan>,', 'ušká dlhé, chvostík <tspan fill="#C2412A">má</tspan>.', 'Skáče, skáče do <tspan fill="#3E63DD">kola</tspan>,', 'kým ho mama <tspan fill="#3E63DD">nezvolá</tspan>.'],
    ['Večer, keď už slnko <tspan fill="#C2412A">spí</tspan>,', 'zajko očká <tspan fill="#C2412A">zatvorí</tspan>.', 'Sníva sa mu o <tspan fill="#3E63DD">mrkve</tspan>,', 'o kapuste, o <tspan fill="#3E63DD">tráve</tspan>.'],
  ];
  const POEM_ART = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Báseň Zajko v dvoch strofách po štyri verše. Rýmujúce sa slová sú farebné: hrá a má, kola a nezvolá, spí a zatvorí, mrkve a tráve.">
    <text x="160" y="22" text-anchor="middle" ${T} font-size="15" fill="${INK}">Zajko</text>
    ${POEM.map((st, s) => `<g ${pop((0.2 + s * 0.8).toFixed(1))}><rect x="${8 + s * 156}" y="34" width="148" height="104" rx="10" fill="#FFFFFF" stroke="${BLUE}" stroke-width="2"/>
      ${st.map((v, i) => `<text x="${16 + s * 156}" y="${58 + i * 22}" ${P} font-size="11.5" fill="${INK}">${v}</text>`).join('')}</g>`).join('')}
    <g ${T} font-size="12" text-anchor="middle" fill="${BLUE}"><text x="82" y="156">1. strofa</text><text x="238" y="156">2. strofa</text></g>
    <text x="160" y="186" text-anchor="middle" ${T} font-size="13" fill="#4A4566">každý riadok je verš</text>
  </svg>`;

  const FOLK = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Deti stoja v kruhu a jedno z nich ukazuje prstom pri vyčítanke. Nad nimi bublina s otáznikom ako pri hádanke.">
    ${Array.from({ length: 6 }, (_, i) => { const a = (i / 6) * 2 * Math.PI - Math.PI / 2; const x = 160 + Math.cos(a) * 70; const y = 120 + Math.sin(a) * 44; return `<g ${pop((0.1 + i * 0.15).toFixed(2))}><circle cx="${x.toFixed(1)}" cy="${(y - 14).toFixed(1)}" r="9" fill="#FFD9C9"/><path d="M${(x - 11).toFixed(1)} ${(y + 16).toFixed(1)} v-10 a11 10 0 0 1 22 0 v10z" fill="${[CORAL, BLUE, KELP, '#F5C518', '#A43CB4', '#E5484D'][i]}"/></g>`; }).join('')}
    <path d="M168 120 L210 104" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
    <g class="a-say1"><rect x="196" y="12" width="110" height="40" rx="14" fill="#FFFFFF" stroke="${BLUE}" stroke-width="2"/><text x="251" y="38" text-anchor="middle" ${T} font-size="14" fill="${INK}">Čo je to?</text></g>
  </svg>`;

  const BOOK = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Otvorená kniha. Na obálke je meno autora a ilustrátora. Vedľa bábka na ruke.">
    <g ${pop(0.2)}><rect x="30" y="30" width="130" height="150" rx="8" fill="${BLUE}"/><rect x="40" y="40" width="110" height="70" rx="6" fill="#E6EDF5"/>
      <circle cx="95" cy="72" r="18" fill="#F5C518"/><path d="M60 104 l20 -18 l16 12 l14 -10 l30 16z" fill="${KELP}"/>
      <text x="95" y="134" text-anchor="middle" ${T} font-size="14" fill="#FFFFFF">Názov knihy</text>
      <text x="95" y="154" text-anchor="middle" ${P} font-size="11" fill="#E6EDF5">autor</text>
      <text x="95" y="170" text-anchor="middle" ${P} font-size="11" fill="#E6EDF5">ilustrátor</text></g>
    <g class="a-bob"><path d="M210 180 v-60 q0 -10 10 -10 h40 q10 0 10 10 v60" fill="${CORAL}"/><circle cx="240" cy="78" r="30" fill="#FFD9C9"/><circle cx="230" cy="74" r="4" fill="${INK}"/><circle cx="250" cy="74" r="4" fill="${INK}"/><path d="M230 90 q10 8 20 0" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/><path d="M212 62 q28 -30 56 0" fill="#E5484D"/></g>
    <text x="240" y="196" text-anchor="middle" ${T} font-size="12" fill="#4A4566">bábka</text>
  </svg>`;

  const READING = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Dievča s novým červeným bicyklom v parku pod stromom.">
    <path d="M0 170 H320" stroke="${KELP}" stroke-width="6"/>
    <g ${pop(0.2)}><path d="M266 170 V110" stroke="#8B5E34" stroke-width="10"/><circle cx="266" cy="90" r="34" fill="${KELP}" opacity="0.85"/></g>
    <g class="a-bob">
      <circle cx="96" cy="146" r="22" fill="none" stroke="${INK}" stroke-width="4"/><circle cx="176" cy="146" r="22" fill="none" stroke="${INK}" stroke-width="4"/>
      <path d="M96 146 L124 110 H160 L176 146 M124 110 L140 146 L160 110 M120 102 h12 M160 110 l-4 -12 h12" fill="none" stroke="#E5484D" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="132" cy="54" r="12" fill="#FFD9C9"/><path d="M132 66 l-4 30 M128 96 l12 14 M130 76 l26 14" stroke="${CORAL}" stroke-width="6" stroke-linecap="round"/>
    </g>
  </svg>`;

  window.Octavo.addCourse({
    id: 'sk2-citanie',
    subject: 'Slovenčina',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Čítanie a literatúra',
    blurb: 'Básne a rýmy, riekanky a hádanky, ľudová rozprávka, knihy a časopisy a čítanie s porozumením.',
    artBg: '#F3F6FA',
    units: [
      {
        title: 'Poézia a ľudová slovesnosť',
        lessons: [
          {
            id: 'sk2-citanie-basen',
            title: 'Báseň: verš, strofa, rým',
            minutes: 8,
            slides: [
              {
                title: 'Báseň Zajko',
                art: POEM_ART,
                text: '<p>Každý riadok básne je <b>verš</b>. Niekoľko veršov spolu tvorí <b>strofu</b>. Táto báseň má 2 strofy po 4 verše. Slová na konci veršov, ktoré znejú podobne, sú <b>rým</b>: hrá – má.</p>',
              },
              {
                title: 'Vypočuj si báseň',
                phrases: [
                  { es: 'Po lúke sa zajko hrá, ušká dlhé, chvostík má.', en: '1. a 2. verš: rým hrá – má', lang: SK },
                  { es: 'Skáče, skáče do kola, kým ho mama nezvolá.', en: '3. a 4. verš: rým kola – nezvolá', lang: SK },
                  { es: 'Večer, keď už slnko spí, zajko očká zatvorí.', en: 'rým spí – zatvorí', lang: SK },
                  { es: 'Sníva sa mu o mrkve, o kapuste, o tráve.', en: 'rým mrkve – tráve', lang: SK },
                ],
                text: '<p>Báseň čítame <b>pomaly</b> a s <b>prestávkou</b> na konci verša. Skús ju zarecitovať.</p>',
              },
              {
                title: 'Nájdi rým',
                cards: [
                  { front: 'mačka', back: 'hračka, kačka', lang: SK },
                  { front: 'dom', back: 'strom, hrom', lang: SK },
                  { front: 'les', back: 'pes, dnes', lang: SK },
                  { front: 'more', back: 'hore, dvore', lang: SK },
                ],
                text: '<p>Rýmujú sa slová, ktoré majú <b>podobný koniec</b>. Vymysli k slovu rým, potom otoč kartičku.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Verš</b> je riadok básne.',
                  '<b>Strofa</b> je skupina veršov.',
                  '<b>Rým</b> sú slová s podobným koncom: hrá – má.',
                  'Báseň má nadpis a autora, prednášame ju <b>recitovaním</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako sa volá jeden riadok básne?',
                options: ['strofa', 'verš', 'rým', 'nadpis'], answer: 'verš',
                explain: 'Riadok básne je <b>verš</b>.', hint: 'strofa je ich viac.' },
              { type: 'choice', prompt: 'Koľko strof má báseň Zajko?',
                options: ['1', '4', '2', '8'], answer: '2',
                explain: 'Báseň má <b>2 strofy</b> po 4 verše.', hint: 'pozri obrázok s básňou.' },
              { type: 'choice', prompt: 'Ktoré slovo sa rýmuje so slovom dom?',
                options: ['strom', 'stôl', 'domov', 'mačka'], answer: 'strom',
                explain: 'dom – <b>strom</b>: podobný koniec -om.', hint: 'hľadaj rovnaký koniec.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Slová hrá a má sa rýmujú.', answer: true,
                explain: '<b>Pravda.</b> Obe končia na -á.', hint: 'povedz ich nahlas.' },
            ],
          },
          {
            id: 'sk2-citanie-ludove',
            title: 'Riekanky, vyčítanky, hádanky',
            minutes: 8,
            slides: [
              {
                title: 'Ľudová slovesnosť',
                art: FOLK,
                text: '<p>Riekanky, vyčítanky, hádanky a ľudové piesne vymysleli ľudia dávno. Nikto nevie, kto ich zložil, a podávali sa <b>ústne</b> z generácie na generáciu. Hovoríme im <b>ľudová slovesnosť</b>.</p>',
              },
              {
                title: 'Čo je čo',
                cards: [
                  { front: 'riekanka', back: 'krátky veršík s rytmom na hranie', lang: SK },
                  { front: 'vyčítanka', back: 'pri nej vyberáme, kto bude pykať', lang: SK },
                  { front: 'hádanka', back: 'opis veci, ktorú treba uhádnuť', lang: SK },
                  { front: 'ľudová pieseň', back: 'pieseň, ktorej autora nepoznáme', lang: SK },
                ],
                text: '<p>Otoč kartičky. Ktorú riekanku alebo vyčítanku poznáš ty?</p>',
              },
              {
                title: 'Uhádni',
                phrases: [
                  { es: 'Domček nosí na chrbáte, rožky má, a nie je koza.', en: 'slimák', lang: SK },
                  { es: 'Zelené je, kyslé je, na strome sa hojdá.', en: 'jablko', lang: SK },
                  { es: 'V zime padá, biely je, v teplej dlani roztopí sa.', en: 'sneh', lang: SK },
                  { es: 'Raz, dva, tri, von ideš ty!', en: 'vyčítanka', lang: SK },
                ],
                text: '<p>Vypočuj si hádanku a skús ju uhádnuť skôr, ako si prečítaš odpoveď.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Ľudovú slovesnosť</b> vymysleli ľudia dávno, autora nepoznáme.',
                  '<b>Riekanka</b> je veršík na hranie, <b>vyčítanka</b> vyberá hráča.',
                  '<b>Hádanka</b> opisuje vec, ktorú treba uhádnuť.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Čo použijeme, keď vyberáme, kto bude pri hre pykať?',
                options: ['hádanku', 'list', 'vyčítanku', 'nadpis'], answer: 'vyčítanku',
                explain: 'Na to slúži <b>vyčítanka</b>.', hint: 'Raz, dva, tri, von ideš ty!' },
              { type: 'choice', prompt: 'Domček nosí na chrbáte, rožky má, a nie je koza. Čo je to?',
                options: ['mravec', 'slimák', 'korytnačka', 'jež'], answer: 'slimák',
                explain: 'Je to <b>slimák</b>: má ulitu a rožky.', hint: 'je pomalý a má ulitu.' },
              { type: 'choice', prompt: 'Kto je autorom ľudovej riekanky?',
                options: ['pani učiteľka', 'nepoznáme ho', 'spisovateľ z knihy', 'moja mama'], answer: 'nepoznáme ho',
                explain: 'Ľudovú slovesnosť šírili ľudia ústne, <b>autora nepoznáme</b>.', hint: 'je veľmi stará.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Hádanka opisuje vec, ktorú treba uhádnuť.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'pozri kartičky.' },
            ],
          },
          {
            id: 'sk2-citanie-rozpravka',
            title: 'Ľudová rozprávka',
            minutes: 9,
            slides: [
              {
                title: 'Kde bolo, tam bolo',
                text: '<p><b>Ľudová rozprávka</b> sa často začína slovami <i>Kde bolo, tam bolo</i> a končí <i>a žili šťastne, kým nepomreli</i>. Bojuje v nej <b>dobro so zlom</b> a dobro vždy zvíťazí. Dejú sa v nej čary, zvieratá hovoria a čísla 3, 7 a 12 sa opakujú.</p><p>Slovenské ľudové rozprávky zbieral a zapísal <b>Pavol Dobšinský</b>.</p>',
                cards: [
                  { front: 'Kde bolo, tam bolo…', back: 'tak sa rozprávka začína', lang: SK },
                  { front: '…a žili šťastne, kým nepomreli.', back: 'tak sa rozprávka končí', lang: SK },
                ],
              },
              {
                title: 'Postavy a dej',
                phrases: [
                  { es: 'dobré postavy', en: 'princ, Popoluška, múdra dievčina', lang: SK },
                  { es: 'zlé postavy', en: 'drak, ježibaba, zlá macocha', lang: SK },
                  { es: 'dej', en: 'čo sa v rozprávke stalo, po poradí', lang: SK },
                  { es: 'ponaučenie', en: 'čo sa z rozprávky naučíme', lang: SK },
                ],
                text: '<p>Keď rozprávame <b>dej</b>, hovoríme, čo sa stalo na začiatku, potom a na konci.</p>',
              },
              {
                title: 'Krátka rozprávka',
                text: '<p><b>O lakomom mlynárovi</b></p><p>Kde bolo, tam bolo, žil raz lakomý mlynár. Raz k nemu prišla stará žena a prosila o hrsť múky. Mlynár ju vyhnal. Žena bola dobrá víla a jeho mlyn sa zastavil. Až keď mlynár rozdal múku chudobným, kolesá sa znova roztočili. Odvtedy sa delil s každým.</p>',
                cards: [
                  { front: 'Ponaučenie', back: 'Kto sa delí, tomu sa darí.', lang: SK },
                ],
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Rozprávka sa začína <b>Kde bolo, tam bolo</b>.',
                  '<b>Dobro</b> zvíťazí nad <b>zlom</b>.',
                  'Rozprávka má <b>postavy</b>, <b>dej</b> a <b>ponaučenie</b>.',
                  'Slovenské rozprávky zbieral <b>Pavol Dobšinský</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako sa často začína ľudová rozprávka?',
                options: ['Milá babka,', 'Kde bolo, tam bolo', 'Vonku prší.', 'Ahoj, ako sa máš?'], answer: 'Kde bolo, tam bolo',
                explain: '<b>Kde bolo, tam bolo</b>…', hint: 'pozri prvý slide.' },
              { type: 'choice', prompt: 'Aké je ponaučenie z rozprávky O lakomom mlynárovi?',
                options: ['Kto sa delí, tomu sa darí.', 'Mlyn je veľký.', 'Víly neexistujú.', 'Múka je biela.'], answer: 'Kto sa delí, tomu sa darí.',
                explain: 'Mlynárovi sa darilo, až keď sa začal deliť: <b>Kto sa delí, tomu sa darí.</b>', hint: 'čo musel mlynár urobiť?' },
              { type: 'order', prompt: 'Zoraď dej rozprávky O lakomom mlynárovi.',
                items: ['Mlynár vyhnal starú ženu.', 'Mlyn sa zastavil.', 'Mlynár rozdal múku chudobným.', 'Kolesá sa znova roztočili.'],
                explain: 'Takto išiel <b>dej</b> po poradí.', hint: 'čo sa stalo najskôr?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'V ľudovej rozprávke na konci zvíťazí zlo.', answer: false,
                explain: '<b>Nepravda.</b> Dobro zvíťazí nad zlom.', hint: 'kto vyhrá v rozprávke?' },
            ],
          },
        ],
      },
      {
        title: 'Knihy a čítanie',
        lessons: [
          {
            id: 'sk2-citanie-kniha',
            title: 'Kniha, knižnica a divadlo',
            minutes: 8,
            slides: [
              {
                title: 'Kto robí knihu',
                art: BOOK,
                text: '<p>Knihu napísal <b>autor</b> (spisovateľ alebo spisovateľka). Obrázky nakreslil <b>ilustrátor</b>. Knihy si môžeme požičať v <b>knižnici</b>. Kto číta, je <b>čitateľ</b>.</p>',
              },
              {
                title: 'Slová o knihách a divadle',
                cards: [
                  { front: 'autor', back: 'napísal knihu', lang: SK },
                  { front: 'ilustrátor', back: 'nakreslil obrázky do knihy', lang: SK },
                  { front: 'knižnica', back: 'tam si požičiavame knihy', lang: SK },
                  { front: 'bábkové divadlo', back: 'hrajú v ňom bábky, vedie ich bábkoherec', lang: SK },
                  { front: 'detský časopis', back: 'vychádza často, napríklad Včielka alebo Slniečko', lang: SK },
                ],
                text: '<p>Pre deti písali napríklad <b>Mária Ďuríčková</b> či <b>Krista Bendová</b>. Otoč kartičky.</p>',
              },
              {
                title: 'Zdrobneniny',
                phrases: [
                  { es: 'dom – domček', en: 'malý dom', lang: SK },
                  { es: 'pes – psík', en: 'malý pes', lang: SK },
                  { es: 'ruka – rúčka', en: 'malá ruka', lang: SK },
                  { es: 'mačka – mačička', en: 'malá mačka', lang: SK },
                ],
                text: '<p><b>Zdrobnenina</b> je slovo, ktoré hovorí, že niečo je malé alebo milé. V rozprávkach a básňach ich nájdeš veľa.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Autor</b> knihu napísal, <b>ilustrátor</b> nakreslil obrázky.',
                  'Knihy si požičiavame v <b>knižnici</b>.',
                  'V <b>bábkovom divadle</b> hrajú bábky, vedú ich bábkoherci.',
                  '<b>Zdrobnenina</b>: dom – domček.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Kto nakreslil obrázky do knihy?',
                options: ['autor', 'čitateľ', 'ilustrátor', 'knihovník'], answer: 'ilustrátor',
                explain: 'Obrázky kreslí <b>ilustrátor</b>.', hint: 'ilustrácia je obrázok.' },
              { type: 'choice', prompt: 'Aká je zdrobnenina slova ruka?',
                options: ['ručiak', 'rúčka', 'ruky', 'rukáv'], answer: 'rúčka',
                explain: '<b>rúčka</b> je malá ruka.', hint: 'malá ruka.' },
              { type: 'choice', prompt: 'Kde si môžeš požičať knihu?',
                options: ['v knižnici', 'na pošte', 'v divadle', 'v obchode s potravinami'], answer: 'v knižnici',
                explain: 'Knihy požičiava <b>knižnica</b>.', hint: 'kniha – knižnica.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Bábky v bábkovom divadle vedie bábkoherec.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'pozri kartičky.' },
            ],
          },
          {
            id: 'sk2-citanie-porozumenie',
            title: 'Čítanie s porozumením',
            minutes: 10,
            slides: [
              {
                title: 'Prečítaj si text',
                art: READING,
                text: '<p><b>Nový bicykel</b></p><p>Ema dostala na narodeniny červený bicykel. V sobotu ráno išla s ockom do parku. Najprv sa bála, že spadne. Ocko ju držal za sedadlo a bežal vedľa nej. Pri veľkom dube ju potichu pustil. Ema išla sama až k fontáne a vôbec o tom nevedela! Keď sa obzrela, zasmiala sa: „Ocko, ja už viem jazdiť!“</p>',
              },
              {
                title: 'Vypočuj si text',
                phrases: [
                  { es: 'Ema dostala na narodeniny červený bicykel.', en: '1. veta: čo dostala?', lang: SK },
                  { es: 'V sobotu ráno išla s ockom do parku.', en: '2. veta: kedy a kam?', lang: SK },
                  { es: 'Pri veľkom dube ju potichu pustil.', en: 'kde ju ocko pustil?', lang: SK },
                  { es: 'Ocko, ja už viem jazdiť!', en: 'čo zvolala Ema na konci', lang: SK },
                ],
                text: '<p>Čítaj <b>plynule</b> a <b>s porozumením</b>: po každej vete si povedz, o čom bola.</p>',
              },
              {
                title: 'Ako čítať s porozumením',
                cards: [
                  { front: 'Kto?', back: 'Ema a ocko', lang: SK },
                  { front: 'Kde?', back: 'v parku', lang: SK },
                  { front: 'Kedy?', back: 'v sobotu ráno', lang: SK },
                  { front: 'Čo sa stalo?', back: 'Ema sa naučila jazdiť sama', lang: SK },
                ],
                text: '<p>Po prečítaní si polož otázky <b>Kto? Kde? Kedy? Čo sa stalo?</b> Niektoré odpovede sú v texte priamo, iné si musíš <b>domyslieť</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Čítaj pomaly a po každej vete si povedz, o čom bola.',
                  'Pýtaj sa: <b>Kto? Kde? Kedy? Čo sa stalo?</b>',
                  'Niektoré odpovede si treba <b>domyslieť</b>: Ema nevedela, že ide sama.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Akej farby bol Emin bicykel?',
                options: ['modrý', 'zelený', 'červený', 'žltý'], answer: 'červený',
                explain: 'V texte je: Ema dostala <b>červený</b> bicykel.', hint: 'pozri prvú vetu.' },
              { type: 'choice', prompt: 'Kde ocko pustil Emu?',
                options: ['pri fontáne', 'pri veľkom dube', 'pred domom', 'v škole'], answer: 'pri veľkom dube',
                explain: 'Ocko ju pustil <b>pri veľkom dube</b>. K fontáne už išla sama.', hint: 'pri akom strome?' },
              { type: 'choice', prompt: 'Prečo sa Ema na konci zasmiala?',
                options: ['spadla', 'zistila, že jazdí sama', 'ocko spadol', 'videla psa'], answer: 'zistila, že jazdí sama',
                explain: 'Keď sa obzrela, zistila, že <b>jazdí sama</b>. Toto v texte priamo nie je, treba si to domyslieť.', hint: 'čo zvolala?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Ema išla do parku v nedeľu.', answer: false,
                explain: '<b>Nepravda.</b> Išla v sobotu ráno.', hint: 'kedy išla do parku?' },
            ],
          },
        ],
      },
    ],
  });
})();
