'use strict';

/* Prvouka · 2. ročník · Rastliny (iŠVP 2015: Človek a príroda). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BROWN = '#8B5E34';   // subject colour
  const LEAF = '#30A46C';
  const SUN = '#F5C518';
  const WATER = '#3E63DD';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const NEEDS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Rastlina v pôde. Okolo nej slnko pre svetlo a teplo, oblak s kvapkami vody a vietor so vzduchom. Pod zemou korene v pôde.">
    <rect x="0" y="150" width="320" height="50" fill="#C9A27A"/>
    <path d="M160 150 v28 M160 166 l-14 14 M160 160 l16 16" stroke="${BROWN}" stroke-width="3" stroke-linecap="round"/>
    <path d="M160 150 V84" stroke="${LEAF}" stroke-width="5" stroke-linecap="round"/>
    <path d="M160 122 c -26 -2 -34 -18 -34 -28 c 18 0 30 10 34 28 M160 108 c 26 -2 34 -18 34 -28 c -18 0 -30 10 -34 28" fill="${LEAF}"/>
    ${Array.from({ length: 6 }, (_, k) => { const a = (k / 6) * 2 * Math.PI; return `<ellipse cx="${(160 + Math.cos(a) * 11).toFixed(1)}" cy="${(72 + Math.sin(a) * 11).toFixed(1)}" rx="8" ry="6" fill="#FF7A59"/>`; }).join('')}
    <circle cx="160" cy="72" r="6" fill="${SUN}"/>
    <g class="a-spin" style="transform-origin: 52px 46px"><circle cx="52" cy="46" r="16" fill="${SUN}"/>${Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * 2 * Math.PI; return `<path d="M${(52 + Math.cos(a) * 21).toFixed(1)} ${(46 + Math.sin(a) * 21).toFixed(1)} L${(52 + Math.cos(a) * 28).toFixed(1)} ${(46 + Math.sin(a) * 28).toFixed(1)}" stroke="${SUN}" stroke-width="3" stroke-linecap="round"/>`; }).join('')}</g>
    <g><path d="M232 40 a14 14 0 0 1 26 -6 a12 12 0 0 1 20 10 a10 10 0 0 1 -4 18 h-40 a11 11 0 0 1 -2 -22z" fill="#C9D3E4"/>
      ${[0, 1, 2].map((i) => `<path class="a-drop" style="animation-delay: ${(i * 0.5).toFixed(1)}s" d="M${244 + i * 12} 70 q-3 6 0 8 q3 -2 0 -8z" fill="${WATER}"/>`).join('')}</g>
    <path class="a-flow" d="M228 112 q14 -8 28 0 t28 0 M236 126 q14 -8 28 0 t28 0" fill="none" stroke="#8C87A8" stroke-width="2.5" stroke-dasharray="6 6" stroke-linecap="round"/>
  </svg>`;

  const SEEDS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Vľavo odkvitnutá púpava a jej semienka s páperím odlietajú vo vetre. Vpravo krídlaté semeno javora padá a točí sa.">
    <path d="M70 190 V100" stroke="${LEAF}" stroke-width="4"/>
    ${Array.from({ length: 12 }, (_, k) => { const a = (k / 12) * 2 * Math.PI; return `<path d="M70 92 L${(70 + Math.cos(a) * 22).toFixed(1)} ${(92 + Math.sin(a) * 22).toFixed(1)}" stroke="#C9C4E0" stroke-width="1.5"/><circle cx="${(70 + Math.cos(a) * 22).toFixed(1)}" cy="${(92 + Math.sin(a) * 22).toFixed(1)}" r="3" fill="#FFFFFF" stroke="#C9C4E0"/>`; }).join('')}
    ${[0, 1, 2].map((i) => `<g class="a-bob" style="animation-delay: ${(i * 0.7).toFixed(1)}s"><path d="M${118 + i * 30} ${70 - i * 18} v14" stroke="#8C87A8" stroke-width="1.5"/><path d="M${110 + i * 30} ${70 - i * 18} q8 -10 16 0" fill="none" stroke="#8C87A8" stroke-width="1.5"/><circle cx="${118 + i * 30}" cy="${86 - i * 18}" r="2" fill="${BROWN}"/></g>`).join('')}
    <g class="a-spin" style="transform-origin: 252px 104px"><ellipse cx="252" cy="104" rx="6" ry="5" fill="${BROWN}"/><path d="M256 102 c 20 -10 36 -6 40 4 c -14 6 -28 6 -40 -2z" fill="#E8C25A" stroke="${BROWN}" stroke-width="1.5"/></g>
    <g ${T} font-size="13" fill="#4A4566" text-anchor="middle"><text x="110" y="180">púpava</text><text x="262" y="180">javor</text></g>
  </svg>`;

  const SPROUT = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Klíčenie fazule v troch krokoch: semeno napučí vodou, vyrastie korienok, potom stonka s prvými lístkami.">
    <rect x="0" y="120" width="320" height="80" fill="#C9A27A"/>
    <g class="ap-note" style="--d: 0.2s"><ellipse cx="60" cy="130" rx="20" ry="13" fill="#D9B48F" stroke="${BROWN}" stroke-width="2"/><text x="60" y="186" text-anchor="middle" ${T} font-size="12" fill="${INK}">1. napučí</text>${[0, 1].map((i) => `<path d="M${46 + i * 22} 104 q-3 6 0 8 q3 -2 0 -8z" fill="${WATER}"/>`).join('')}</g>
    <g class="ap-note" style="--d: 1.1s"><ellipse cx="160" cy="128" rx="20" ry="13" fill="#D9B48F" stroke="${BROWN}" stroke-width="2"/><path d="M160 140 q6 14 -2 28 M158 156 l-8 6" fill="none" stroke="#F1E8D0" stroke-width="4" stroke-linecap="round"/><text x="160" y="186" text-anchor="middle" ${T} font-size="12" fill="${INK}">2. korienok</text></g>
    <g class="ap-note" style="--d: 2s"><path d="M260 168 q4 -14 0 -26" fill="none" stroke="#F1E8D0" stroke-width="4" stroke-linecap="round"/><path d="M260 132 V80" stroke="${LEAF}" stroke-width="5" stroke-linecap="round"/><path d="M260 86 c -20 -2 -26 -14 -26 -22 c 14 0 22 8 26 22 M260 86 c 20 -2 26 -14 26 -22 c -14 0 -22 8 -26 22" fill="${LEAF}"/><ellipse cx="248" cy="124" rx="10" ry="6" fill="#D9B48F" opacity="0.7"/><text x="260" y="186" text-anchor="middle" ${T} font-size="12" fill="${INK}">3. stonka a lístky</text></g>
  </svg>`;

  const GARDEN = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Vľavo záhrada s hriadkami mrkvy a rajčinami, ktoré pestuje človek. Vpravo lúka s púpavami a sedmokráskami, ktoré rastú samy.">
    <rect x="0" y="130" width="155" height="70" fill="#C9A27A"/><rect x="165" y="130" width="155" height="70" fill="#9ED3A8"/>
    ${[0, 1, 2, 3].map((i) => `<g ${pop((0.2 + i * 0.2).toFixed(1))}><path d="M${22 + i * 34} 130 l-6 -16 M${22 + i * 34} 130 l0 -18 M${22 + i * 34} 130 l6 -16" stroke="${LEAF}" stroke-width="3" stroke-linecap="round"/><path d="M${16 + i * 34} 132 l6 22 l6 -22z" fill="#FF7A59"/></g>`).join('')}
    <g ${pop(1)}><path d="M120 130 V70" stroke="${LEAF}" stroke-width="3"/><circle cx="112" cy="90" r="8" fill="#E5484D"/><circle cx="128" cy="104" r="8" fill="#E5484D"/></g>
    ${[[190, 112], [230, 100], [270, 116], [298, 104]].map(([x, y], i) => `<g ${pop((0.4 + i * 0.25).toFixed(2))}><path d="M${x} 130 V${y}" stroke="${LEAF}" stroke-width="2.5"/>${i % 2 ? `<circle cx="${x}" cy="${y}" r="9" fill="${SUN}"/>` : `${Array.from({ length: 8 }, (_, k) => { const a = (k / 8) * 2 * Math.PI; return `<ellipse cx="${(x + Math.cos(a) * 7).toFixed(1)}" cy="${(y + Math.sin(a) * 7).toFixed(1)}" rx="4" ry="2.5" transform="rotate(${k * 45} ${(x + Math.cos(a) * 7).toFixed(1)} ${(y + Math.sin(a) * 7).toFixed(1)})" fill="#FFFFFF" stroke="#C9C4E0" stroke-width="0.8"/>`; }).join('')}<circle cx="${x}" cy="${y}" r="4" fill="${SUN}"/>`}</g>`).join('')}
    <g ${T} font-size="13" fill="${INK}" text-anchor="middle"><text x="78" y="30">pestované</text><text x="242" y="30">divorastúce</text></g>
    <path d="M160 16 V130" stroke="#C9C4E0" stroke-width="2" stroke-dasharray="4 4"/>
  </svg>`;

  window.Octavo.addCourse({
    id: 'prv2-rastliny',
    subject: 'Prvouka',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Rastliny',
    blurb: 'Čo rastliny potrebujú, kde rastú, ako sa šíria a klíčia ich semená a ktoré pestujeme.',
    artBg: '#FAF5EF',
    units: [
      {
        title: 'Život rastlín',
        lessons: [
          {
            id: 'prv2-rastliny-podmienky',
            title: 'Čo rastliny potrebujú',
            minutes: 9,
            slides: [
              {
                title: 'Päť vecí na život',
                art: NEEDS,
                spots: [
                  { x: 16, y: 23, label: 'svetlo a teplo', info: 'Slnko dáva rastline svetlo a teplo. Bez svetla rastlina zbledne a uschne.' },
                  { x: 80, y: 20, label: 'voda', info: 'Vodu rastlina prijíma koreňmi z pôdy.' },
                  { x: 80, y: 60, label: 'vzduch', info: 'Rastlina dýcha listami, potrebuje vzduch.' },
                  { x: 42, y: 88, label: 'pôda', info: 'V pôde sú živiny. Korene rastlinu v pôde aj držia.' },
                ],
                text: '<p>Rastlina potrebuje <b>svetlo, teplo, vzduch, vodu</b> a <b>pôdu</b>. Ťukni na čísla na obrázku.</p>',
              },
              {
                title: 'Rastliny v rôznych prostrediach',
                cards: [
                  { front: 'les', back: 'buk, smrek, papraď', lang: SK },
                  { front: 'lúka', back: 'púpava, ďatelina, margaréta', lang: SK },
                  { front: 'rybník', back: 'leknín, trstina', lang: SK },
                  { front: 'hory a skaly', back: 'kosodrevina, horec', lang: SK },
                  { front: 'púšť', back: 'kaktus si v hrubej stonke drží vodu', lang: SK },
                ],
                text: '<p>Rastliny sa <b>prispôsobia</b> miestu, kde rastú. Kaktus si v púšti šetrí vodu, leknín má široké listy, ktoré plávajú na vode. Otoč kartičky.</p>',
              },
              {
                title: 'Rastlina žije',
                phrases: [
                  { es: 'Rastlina rastie.', en: 'zo semienka je veľká rastlina', lang: SK },
                  { es: 'Rastlina prijíma vodu a živiny.', en: 'koreňmi z pôdy', lang: SK },
                  { es: 'Rastlina dýcha.', en: 'listami', lang: SK },
                  { es: 'Rastlina sa rozmnožuje.', en: 'semenami, z ktorých rastú nové rastliny', lang: SK },
                  { es: 'Rastlina sa otáča za svetlom.', en: 'napríklad slnečnica', lang: SK },
                ],
                text: '<p>Toto sú <b>životné prejavy</b> rastlín. Podľa nich spoznáme, že rastlina je živá.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Rastlina potrebuje <b>svetlo, teplo, vzduch, vodu a pôdu</b>.',
                  'Rastliny žijú v lese, na lúke, vo vode, v horách aj v púšti a <b>prispôsobia sa</b>.',
                  'Rastliny <b>rastú, dýchajú, prijímajú vodu</b> a <b>rozmnožujú sa</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Čo rastlina na život nepotrebuje?',
                options: ['svetlo', 'vodu', 'hluk', 'vzduch'], answer: 'hluk',
                explain: 'Rastlina potrebuje svetlo, teplo, vzduch, vodu a pôdu. <b>Hluk</b> nie.', hint: 'spomeň si na päť vecí na život.' },
              { type: 'choice', prompt: 'Prečo má kaktus hrubú stonku?',
                options: ['aby bol pekný', 'aby si v nej držal vodu', 'aby rástol rýchlo', 'aby ho videli zvieratá'], answer: 'aby si v nej držal vodu',
                explain: 'V púšti je málo vody, kaktus si ju <b>drží v stonke</b>.', hint: 'kde kaktus rastie?' },
              { type: 'choice', prompt: 'Ktorá rastlina rastie vo vode?',
                options: ['smrek', 'kaktus', 'púpava', 'leknín'], answer: 'leknín',
                explain: '<b>Leknín</b> má listy, ktoré plávajú na hladine.', hint: 'pozri kartičku rybník.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Rastliny sa otáčajú za svetlom.', answer: true,
                explain: '<b>Pravda.</b> Napríklad slnečnica.', hint: 'čo robí slnečnica?' },
            ],
          },
          {
            id: 'prv2-rastliny-semena',
            title: 'Semená: ako sa šíria a klíčia',
            minutes: 10,
            slides: [
              {
                title: 'Semená cestujú',
                art: SEEDS,
                text: '<p>V <b>semene</b> je ukrytá budúca rastlina a zásoba potravy na začiatok. Rastlina chce, aby jej semená odcestovali čo najďalej. Púpava má semienka s <b>páperím</b> a javor s <b>krídelkom</b>, preto ich nesie vietor.</p>',
              },
              {
                title: 'Kto semená prenáša',
                cards: [
                  { front: 'vietor', back: 'púpava, javor, lipa', lang: SK },
                  { front: 'zvieratá', back: 'lopúch sa prichytí na srsť, vtáky zjedia čerešne', lang: SK },
                  { front: 'voda', back: 'kokosový orech dopláva po mori, jelšu odnesie potok', lang: SK },
                  { front: 'samy vystrelia', back: 'netýkavka', lang: SK },
                ],
                text: '<p>Semená cestujú rôzne. Otoč kartičky.</p>',
              },
              {
                title: 'Ako semeno klíči',
                art: SPROUT,
                replay: 'Klíčiť znova',
                autoplay: true,
                text: '<p>Semeno potrebuje na klíčenie <b>vodu, vzduch</b> a <b>teplo</b>. Najprv napučí, potom vyrastie <b>korienok</b> a až potom <b>stonka</b> s lístkami. Zásobu v semene mladá rastlinka spotrebuje. Vyskúšaj to s fazuľou na mokrej vate.</p>',
              },
              {
                title: 'Semená pre človeka',
                phrases: [
                  { es: 'pšenica a raž', en: 'múka na chlieb a rožky', lang: SK },
                  { es: 'fazuľa a hrach', en: 'polievky a prívarky', lang: SK },
                  { es: 'slnečnica', en: 'olej a semiačka', lang: SK },
                  { es: 'orechy', en: 'do koláčov', lang: SK },
                ],
                text: '<p>Mnohé semená jeme. Semená aj <b>sadíme</b> a <b>sejeme</b>, aby nám vyrástli nové rastliny.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'V semene je <b>budúca rastlina</b> a zásoba potravy.',
                  'Semená roznáša <b>vietor, voda, zvieratá</b> alebo samy vystrelia.',
                  'Na klíčenie treba <b>vodu, vzduch a teplo</b>.',
                  'Najprv rastie <b>korienok</b>, potom stonka.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako sa šíria semená púpavy?',
                options: ['vodou', 'vetrom', 'samy vystrelia', 'zvieratá ich zjedia'], answer: 'vetrom',
                explain: 'Semienka s páperím nesie <b>vietor</b>.', hint: 'fúkol si niekedy do odkvitnutej púpavy?' },
              { type: 'choice', prompt: 'Čo potrebuje semeno na klíčenie?',
                options: ['iba tmu', 'soľ', 'vodu, vzduch a teplo', 'hluk'], answer: 'vodu, vzduch a teplo',
                explain: 'Semeno klíči, keď má <b>vodu, vzduch a teplo</b>.', hint: 'fazuľa na mokrej vate v teplej izbe.' },
              { type: 'order', prompt: 'Zoraď, ako klíči fazuľa.',
                items: ['semeno napučí vodou', 'vyrastie korienok', 'vyrastie stonka a lístky'],
                explain: 'Napučí, <b>korienok</b>, potom <b>stonka</b>.', hint: 'čo rastie ako prvé?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Z obilných semien sa robí múka na chlieb.', answer: true,
                explain: '<b>Pravda.</b> Pšenica a raž sa melú na múku.', hint: 'z čoho je múka?' },
            ],
          },
          {
            id: 'prv2-rastliny-pestovane',
            title: 'Pestované a divorastúce rastliny',
            minutes: 8,
            slides: [
              {
                title: 'Kto ich sadí?',
                art: GARDEN,
                text: '<p><b>Pestované</b> (úžitkové) rastliny sadí a o ne sa stará človek: zelenina, ovocie, obilie, kvety v záhrade. <b>Divorastúce</b> rastliny rastú samy: na lúke, v lese, pri ceste.</p>',
              },
              {
                title: 'Pestujeme',
                cards: [
                  { front: 'zelenina', back: 'mrkva, rajčina, zemiaky, kapusta', lang: SK },
                  { front: 'ovocie', back: 'jablone, čerešne, jahody', lang: SK },
                  { front: 'obilie', back: 'pšenica, kukurica, jačmeň', lang: SK },
                  { front: 'okrasné rastliny', back: 'tulipán, ruža, muškát', lang: SK },
                ],
                text: '<p>Pestované rastliny treba <b>siať, polievať, okopávať</b> a <b>zbierať</b>. Otoč kartičky.</p>',
              },
              {
                title: 'Rastú samy',
                phrases: [
                  { es: 'púpava', en: 'žltý kvet na lúke', lang: SK },
                  { es: 'harmanček', en: 'liečivá rastlina na čaj', lang: SK },
                  { es: 'čučoriedky', en: 'lesné plody', lang: SK },
                  { es: 'šípky', en: 'z nich je čaj s vitamínmi', lang: SK },
                ],
                text: '<p>Niektoré divorastúce rastliny sú <b>liečivé</b>, iné <b>jedovaté</b>. Zbieraj len tie, ktoré dobre poznáš, a vždy s dospelým.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Pestované</b> rastliny sadí a ošetruje človek.',
                  '<b>Divorastúce</b> rastliny rastú samy v prírode.',
                  'Niektoré sú <b>liečivé</b> (harmanček), iné <b>jedovaté</b>.',
                  'Neznáme plody <b>nezbierame a nejeme</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorá rastlina je pestovaná?',
                options: ['púpava', 'mrkva', 'šípka', 'papraď'], answer: 'mrkva',
                explain: '<b>Mrkvu</b> sadíme v záhrade.', hint: 'čo rastie na hriadke?' },
              { type: 'choice', prompt: 'Z ktorej rastliny je liečivý čaj?',
                options: ['zemiak', 'tulipán', 'harmanček', 'kukurica'], answer: 'harmanček',
                explain: '<b>Harmanček</b> je liečivá rastlina.', hint: 'pozri slide Rastú samy.' },
              { type: 'choice', prompt: 'Čo urobíš s plodom, ktorý nepoznáš?',
                options: ['ochutnám ho', 'nezbieram ho a nejem', 'dám ho kamarátovi', 'zjem ho doma'], answer: 'nezbieram ho a nejem',
                explain: 'Neznámy plod môže byť <b>jedovatý</b>.', hint: 'môže byť nebezpečný.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Púpava je divorastúca rastlina.', answer: true,
                explain: '<b>Pravda.</b> Rastie sama na lúke.', hint: 'sadí ju niekto?' },
            ],
          },
        ],
      },
    ],
  });
})();
