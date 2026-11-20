'use strict';

/* Prvouka · 2. ročník · Ja a svet okolo mňa (iŠVP 2015: Človek a spoločnosť). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BROWN = '#8B5E34';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const BLUE = '#3E63DD';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const CROSSING = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Cesta s priechodom pre chodcov, bielymi pruhmi zebry. Pri nej semafor pre chodcov: červený panáčik stojí, zelený ide.">
    <rect x="0" y="70" width="320" height="90" fill="#6E6990"/>
    ${Array.from({ length: 6 }, (_, i) => `<rect x="${96 + i * 22}" y="74" width="14" height="82" fill="#FFFFFF"/>`).join('')}
    <rect x="0" y="50" width="320" height="20" fill="#C9C4E0"/><rect x="0" y="160" width="320" height="20" fill="#C9C4E0"/>
    <rect x="268" y="10" width="30" height="60" rx="6" fill="${INK}"/>
    <g class="a-cycle"><circle cx="283" cy="26" r="10" fill="#E5484D"/></g>
    <g class="a-cycle" style="animation-delay: 2.25s"><circle cx="283" cy="54" r="10" fill="${KELP}"/></g>
    <circle cx="283" cy="26" r="10" fill="#E5484D" opacity="0.25"/><circle cx="283" cy="54" r="10" fill="${KELP}" opacity="0.25"/>
    <path d="M283 70 V100" stroke="${INK}" stroke-width="4"/>
    <g ${T} font-size="13" fill="${INK}"><text x="12" y="44">chodník</text><text x="12" y="196">chodník</text></g>
  </svg>`;

  const SEASONS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Kruh roka rozdelený na štyri ročné obdobia, každé s tromi mesiacmi: jar marec, apríl, máj; leto jún, júl, august; jeseň september, október, november; zima december, január, február.">
    ${[['jar', 'marec, apríl, máj', '#9ED3A8'], ['leto', 'jún, júl, august', '#F5C518'], ['jeseň', 'september, október, november', '#E8A365'], ['zima', 'december, január, február', '#C9D3E4']].map(([n, m, c], i) => {
      const a0 = -Math.PI / 2 + (i / 4) * 2 * Math.PI; const a1 = a0 + Math.PI / 2;
      const p = (a, r) => `${(78 + Math.cos(a) * r).toFixed(1)} ${(100 + Math.sin(a) * r).toFixed(1)}`;
      const am = (a0 + a1) / 2;
      return `<g ${pop((0.2 + i * 0.3).toFixed(1))}><path d="M78 100 L${p(a0, 68)} A68 68 0 0 1 ${p(a1, 68)} Z" fill="${c}" stroke="#FFFFFF" stroke-width="3"/><text x="${(78 + Math.cos(am) * 38).toFixed(1)}" y="${(105 + Math.sin(am) * 38).toFixed(1)}" text-anchor="middle" ${T} font-size="14" fill="${INK}">${n}</text></g>
        <text x="160" y="${44 + i * 40}" ${T} font-size="14" fill="${INK}">${n}:</text><text x="160" y="${60 + i * 40}" font-family="Nunito, sans-serif" font-weight="700" font-size="10.5" fill="#4A4566">${m}</text>`;
    }).join('')}
  </svg>`;

  // Slovak flag: white, blue, red stripes with the coat of arms (double cross on three blue hills).
  const FLAG = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Slovenská štátna vlajka: biely, modrý a červený pruh, vľavo štátny znak. Štátny znak je biely dvojkríž na troch modrých vrchoch v červenom štíte.">
    <g class="a-bob">
      <path d="M40 20 V190" stroke="${BROWN}" stroke-width="5" stroke-linecap="round"/>
      <rect x="42" y="24" width="240" height="40" fill="#FFFFFF" stroke="#C9C4E0"/><rect x="42" y="64" width="240" height="40" fill="#0B4EA2"/><rect x="42" y="104" width="240" height="40" fill="#EE1C25"/>
      <path d="M86 40 H146 V96 q0 26 -30 38 q-30 -12 -30 -38 Z" fill="#EE1C25" stroke="#FFFFFF" stroke-width="3"/>
      <path d="M92 116 q8 -12 16 -4 q8 -14 16 0 q8 -8 16 4 q-6 10 -24 18 q-18 -8 -24 -18z" fill="#0B4EA2"/>
      <path d="M116 112 V56 M106 70 H126 M102 84 H130" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round"/>
    </g>
    <text x="160" y="176" text-anchor="middle" ${T} font-size="14" fill="${INK}">štátna vlajka so štátnym znakom</text>
  </svg>`;

  const LANDSCAPE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Krajina: vrchy, les, lúka, pole, rieka, jazero a obec s kostolíkom.">
    <rect x="0" y="0" width="320" height="200" fill="#EAF4FB"/>
    <path d="M0 110 L60 40 L110 100 L170 30 L240 110 Z" fill="#8C87A8"/><path d="M160 42 l10 -12 l10 14z" fill="#FFFFFF"/>
    <rect x="0" y="100" width="320" height="100" fill="#9ED3A8"/>
    ${Array.from({ length: 7 }, (_, i) => `<path d="M${200 + i * 16} 118 l8 -20 l8 20z" fill="#2E6E44"/>`).join('')}
    <path d="M0 150 C 60 130, 120 170, 180 150 S 280 140, 320 160" fill="none" stroke="${BLUE}" stroke-width="10" opacity="0.7"/>
    <ellipse cx="270" cy="180" rx="36" ry="12" fill="${BLUE}" opacity="0.6"/>
    ${Array.from({ length: 5 }, (_, i) => `<path d="M${16 + i * 22} 180 h18" stroke="#E8C25A" stroke-width="5"/>`).join('')}
    <g><rect x="120" y="104" width="20" height="16" fill="#FFFFFF" stroke="${INK}" stroke-width="1.5"/><path d="M118 104 l12 -10 l12 10z" fill="#E5484D"/><rect x="146" y="98" width="10" height="22" fill="#FFFFFF" stroke="${INK}" stroke-width="1.5"/><path d="M146 98 l5 -12 l5 12z" fill="#E5484D"/></g>
  </svg>`;

  const SOS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Telefón s číslom 112 a tri čísla záchranárov: hasiči 150, záchranná služba 155, polícia 158.">
    <g class="a-bob"><rect x="30" y="30" width="80" height="140" rx="14" fill="${INK}"/><rect x="38" y="44" width="64" height="104" rx="6" fill="#E6EDF5"/>
      <text x="70" y="104" text-anchor="middle" ${T} font-size="26" fill="#E5484D">112</text></g>
    ${[['150', 'hasiči', '#E5484D'], ['155', 'záchranka', KELP], ['158', 'polícia', BLUE]].map(([n, l, c], i) => `<g ${pop((0.4 + i * 0.35).toFixed(2))}><rect x="140" y="${30 + i * 50}" width="150" height="40" rx="12" fill="#FFFFFF" stroke="${c}" stroke-width="3"/><text x="160" y="${57 + i * 50}" ${T} font-size="20" fill="${c}">${n}</text><text x="210" y="${56 + i * 50}" ${T} font-size="14" fill="${INK}">${l}</text></g>`).join('')}
  </svg>`;

  window.Octavo.addCourse({
    id: 'prv2-spolocnost',
    subject: 'Prvouka',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'peter',
    title: 'Ja a svet okolo mňa',
    blurb: 'Bezpečná cesta do školy, kalendár, rodina a Slovensko, krajina a doprava, povolania a pomoc v núdzi.',
    artBg: '#FAF5EF',
    units: [
      {
        title: 'Človek a spoločnosť',
        lessons: [
          {
            id: 'prv2-spolocnost-cesta',
            title: 'Bezpečne do školy',
            minutes: 8,
            slides: [
              {
                title: 'Priechod a semafor',
                art: CROSSING,
                text: '<p>Cestu prechádzame po <b>priechode pre chodcov</b> (zebre). Pri <b>semafore</b> čakáme na <b>zelenú</b>. Na <b>červenú</b> stojíme, aj keď nič nejde.</p>',
              },
              {
                title: 'Pravidlá chodca',
                cards: [
                  { front: 'pred prechodom', back: 'pozri vľavo, vpravo a znova vľavo', lang: SK },
                  { front: 'kde chodím', back: 'po chodníku, ďalej od cesty', lang: SK },
                  { front: 'keď nie je chodník', back: 'po ľavom okraji cesty, oproti autám', lang: SK },
                  { front: 'v tme', back: 'nosím reflexné prvky', lang: SK },
                ],
                text: '<p>Cez cestu <b>nebežíme</b> a nevybiehame spoza zaparkovaných áut. Otoč kartičky.</p>',
              },
              {
                title: 'Semafor hovorí',
                phrases: [
                  { es: 'Červená: stoj!', en: 'čakám na chodníku', lang: SK },
                  { es: 'Zelená: choď!', en: 'ešte sa rozhliadnem a idem', lang: SK },
                  { es: 'Pozriem vľavo, vpravo, vľavo.', en: 'skôr než vkročím na cestu', lang: SK },
                  { es: 'Prechádzam po zebre.', en: 'priechod pre chodcov', lang: SK },
                ],
                text: '<p>Povedz si tieto vety nahlas cestou do školy.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Cestu prechádzam po <b>priechode pre chodcov</b>.',
                  '<b>Červená</b> stoj, <b>zelená</b> choď.',
                  'Pred prechodom sa pozriem <b>vľavo, vpravo, vľavo</b>.',
                  'Kde nie je chodník, idem <b>vľavo, oproti autám</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Čo urobíš, keď na semafore svieti červená?',
                options: ['bežím', 'stojím a čakám', 'idem pomaly', 'prejdem, keď nič nejde'], answer: 'stojím a čakám',
                explain: 'Na červenú <b>stojíme</b>, vždy.', hint: 'červená znamená stoj.' },
              { type: 'order', prompt: 'Zoraď, ako sa pozrieš pred prechodom cez cestu.',
                items: ['vľavo', 'vpravo', 'znova vľavo'],
                explain: '<b>Vľavo, vpravo, vľavo</b>, potom idem.', hint: 'začni ľavou stranou.' },
              { type: 'choice', prompt: 'Kde ideš, keď pri ceste nie je chodník?',
                options: ['stredom cesty', 'po pravom okraji', 'po ľavom okraji, oproti autám', 'kde chcem'], answer: 'po ľavom okraji, oproti autám',
                explain: 'Ideme <b>vľavo</b>, aby sme videli autá, ktoré idú oproti.', hint: 'chcem autá vidieť.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Reflexné prvky ma v tme robia viditeľným.', answer: true,
                explain: '<b>Pravda.</b> Vodič ma uvidí zďaleka.', hint: 'čo svieti v tme?' },
            ],
          },
          {
            id: 'prv2-spolocnost-kalendar',
            title: 'Kalendár a ročné obdobia',
            minutes: 9,
            slides: [
              {
                title: 'Rok má 12 mesiacov',
                art: SEASONS,
                text: '<p>Rok má <b>12 mesiacov</b> a <b>4 ročné obdobia</b>: jar, leto, jeseň a zimu. Každé obdobie má asi tri mesiace.</p>',
              },
              {
                title: 'Dni v týždni',
                phrases: [
                  { es: 'pondelok, utorok, streda', en: 'prvé tri dni týždňa', lang: SK },
                  { es: 'štvrtok, piatok', en: 'piatok je posledný deň v škole', lang: SK },
                  { es: 'sobota, nedeľa', en: 'víkend', lang: SK },
                  { es: 'Dnes je 20. novembra.', en: 'dátum: deň a mesiac', lang: SK },
                ],
                text: '<p>Týždeň má <b>7 dní</b>. Deň má 24 hodín. <b>Dátum</b> píšeme napríklad 20. 11. 2026: deň, mesiac a rok.</p>',
              },
              {
                title: 'Sviatky v roku',
                cards: [
                  { front: '1. január', back: 'Nový rok a Deň vzniku Slovenskej republiky', lang: SK },
                  { front: 'Veľká noc', back: 'na jar', lang: SK },
                  { front: 'Deň matiek', back: 'druhá nedeľa v máji', lang: SK },
                  { front: 'Vianoce', back: 'v decembri', lang: SK },
                  { front: 'narodeniny a meniny', back: 'osobné sviatky', lang: SK },
                ],
                text: '<p>V kalendári nájdeš aj <b>štátne sviatky</b>, keď sa nechodí do školy. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Rok má <b>12 mesiacov</b> a <b>4 ročné obdobia</b>.',
                  'Týždeň má <b>7 dní</b>, od pondelka po nedeľu.',
                  '<b>Dátum</b>: deň, mesiac, rok.',
                  'Vianoce sú v decembri, Veľká noc na jar.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Koľko mesiacov má rok?',
                options: ['10', '7', '12', '4'], answer: '12',
                explain: 'Rok má <b>12 mesiacov</b>.', hint: 'od januára po december.' },
              { type: 'choice', prompt: 'Do ktorého ročného obdobia patrí júl?',
                options: ['jar', 'leto', 'jeseň', 'zima'], answer: 'leto',
                explain: 'Jún, júl a august sú <b>leto</b>.', hint: 'kedy sú prázdniny?' },
              { type: 'order', prompt: 'Zoraď dni v týždni.',
                items: ['pondelok', 'utorok', 'streda', 'štvrtok', 'piatok'],
                explain: 'Pondelok, utorok, streda, štvrtok, <b>piatok</b>.', hint: 'začína sa pondelkom.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Vianoce sú v decembri.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'kedy je Štedrý deň?' },
            ],
          },
          {
            id: 'prv2-spolocnost-slovensko',
            title: 'Rodina, obec a Slovensko',
            minutes: 9,
            slides: [
              {
                title: 'Moja rodina a obec',
                cards: [
                  { front: 'rodina', back: 'rodičia, súrodenci, starí rodičia', lang: SK },
                  { front: 'obec', back: 'dedina alebo mesto, kde bývam', lang: SK },
                  { front: 'starosta', back: 'vedie obec', lang: SK },
                  { front: 'primátor', back: 'vedie mesto', lang: SK },
                ],
                text: '<p>Bývam v <b>obci</b>, ktorá je časťou <b>Slovenska</b>. O obec sa staráme všetci: neničíme lavičky a ihriská, sú <b>spoločný majetok</b>.</p>',
              },
              {
                title: 'Štátne symboly',
                art: FLAG,
                text: '<p>Naše <b>štátne symboly</b> sú štátna <b>vlajka</b>, štátny <b>znak</b>, štátna <b>pečať</b> a štátna <b>hymna</b>. Vlajka je biela, modrá a červená. Štátny znak je biely <b>dvojkríž</b> na troch modrých vrchoch v červenom štíte.</p>',
              },
              {
                title: 'Slovensko',
                phrases: [
                  { es: 'Bratislava', en: 'hlavné mesto Slovenska', lang: SK },
                  { es: 'Nad Tatrou sa blýska', en: 'štátna hymna', lang: SK },
                  { es: 'Pri hymne stojíme.', en: 'nerozprávame a nehráme sa', lang: SK },
                  { es: 'Slovenská republika', en: 'náš štát', lang: SK },
                ],
                text: '<p>Keď znie <b>hymna</b> alebo sa vztyčuje <b>zástava</b>, stojíme rovno a ticho.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Bývam v <b>obci</b>: v dedine alebo v meste.',
                  'Hlavné mesto Slovenska je <b>Bratislava</b>.',
                  'Štátne symboly: <b>vlajka, znak, pečať, hymna</b>.',
                  'Pri hymne <b>stojíme ticho</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktoré je hlavné mesto Slovenska?',
                options: ['Košice', 'Žilina', 'Bratislava', 'Nitra'], answer: 'Bratislava',
                explain: 'Hlavné mesto je <b>Bratislava</b>.', hint: 'leží pri Dunaji.' },
              { type: 'choice', prompt: 'Aké farby má slovenská vlajka?',
                options: ['červená, biela, zelená', 'biela, modrá, červená', 'modrá, žltá', 'čierna, červená, žltá'], answer: 'biela, modrá, červená',
                explain: 'Vlajka je <b>biela, modrá a červená</b>.', hint: 'pozri obrázok vlajky.' },
              { type: 'choice', prompt: 'Ako sa správaš, keď znie štátna hymna?',
                options: ['tlieskam', 'stojím ticho', 'sedím a rozprávam', 'odídem'], answer: 'stojím ticho',
                explain: 'Pri hymne <b>stojíme ticho</b>.', hint: 'prejavujeme úctu.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Na štátnom znaku je dvojkríž na troch vrchoch.', answer: true,
                explain: '<b>Pravda.</b> Biely dvojkríž na troch modrých vrchoch.', hint: 'pozri štít na zástave.' },
            ],
          },
          {
            id: 'prv2-spolocnost-krajina',
            title: 'Krajina a doprava',
            minutes: 8,
            slides: [
              {
                title: 'Čo vidíme v krajine',
                art: LANDSCAPE,
                spots: [
                  { x: 50, y: 20, label: 'vrchy', info: 'Vysoké hory. Najvyššie na Slovensku sú Tatry.' },
                  { x: 74, y: 52, label: 'les', info: 'Veľa stromov spolu.' },
                  { x: 14, y: 92, label: 'pole', info: 'Človek na ňom pestuje obilie a zeleninu.' },
                  { x: 50, y: 78, label: 'rieka', info: 'Tečúca voda, napríklad Váh alebo Dunaj.' },
                  { x: 84, y: 88, label: 'jazero', info: 'Stojatá voda.' },
                  { x: 54, y: 58, label: 'obec', info: 'Dedina alebo mesto, kde bývajú ľudia.' },
                ],
                text: '<p>V krajine sú <b>vrchy</b> aj <b>roviny</b>, <b>lesy</b>, <b>lúky</b>, <b>polia</b>, <b>rieky</b> a <b>jazerá</b>. Krajina sa mení s ročnými obdobiami. Ťukni na čísla.</p>',
              },
              {
                title: 'Prečo cestujeme',
                phrases: [
                  { es: 'do práce', en: 'rodičia cestujú za prácou', lang: SK },
                  { es: 'do školy', en: 'deti cestujú za vzdelaním', lang: SK },
                  { es: 'na dovolenku', en: 'za oddychom a poznaním', lang: SK },
                  { es: 'na návštevu', en: 'za rodinou a priateľmi', lang: SK },
                ],
                text: '<p>Ľudia cestujú z rôznych dôvodov. Vypočuj si ich.</p>',
              },
              {
                title: 'Druhy dopravy',
                cards: [
                  { front: 'cestná', back: 'auto, autobus, bicykel', lang: SK },
                  { front: 'železničná', back: 'vlak', lang: SK },
                  { front: 'vodná', back: 'loď', lang: SK },
                  { front: 'letecká', back: 'lietadlo', lang: SK },
                ],
                text: '<p><b>Verejnou dopravou</b> (autobus, vlak, električka) cestuje veľa ľudí naraz a menej sa znečistí vzduch. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Krajina: <b>vrchy, roviny, lesy, lúky, polia, rieky, jazerá</b>.',
                  'Cestujeme do práce, do školy, na dovolenku, na návštevu.',
                  'Doprava: <b>cestná, železničná, vodná, letecká</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorý dopravný prostriedok patrí do železničnej dopravy?',
                options: ['autobus', 'vlak', 'loď', 'lietadlo'], answer: 'vlak',
                explain: '<b>Vlak</b> jazdí po železnici.', hint: 'jazdí po koľajniciach.' },
              { type: 'choice', prompt: 'Čo pestuje človek na poli?',
                options: ['stromy v lese', 'obilie', 'ryby', 'skaly'], answer: 'obilie',
                explain: 'Na poli rastie <b>obilie</b> a zelenina.', hint: 'z čoho je múka?' },
              { type: 'choice', prompt: 'Ako sa volajú najvyššie hory na Slovensku?',
                options: ['Alpy', 'Tatry', 'Pieniny', 'Dunaj'], answer: 'Tatry',
                explain: 'Najvyššie sú <b>Tatry</b>.', hint: 'pozri bod vrchy.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Lietadlo patrí do leteckej dopravy.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'lieta.' },
            ],
          },
          {
            id: 'prv2-spolocnost-pomoc',
            title: 'Povolania a pomoc v núdzi',
            minutes: 9,
            slides: [
              {
                title: 'Kto pomáha',
                art: SOS,
                text: '<p><b>Hasiči</b> hasia požiare a pomáhajú pri nehodách. <b>Záchranári</b> ošetrujú chorých a zranených. <b>Policajti</b> dbajú na poriadok a bezpečnosť. Číslo <b>112</b> platí pre všetky a v celej Európe.</p>',
              },
              {
                title: 'Povolania',
                cards: [
                  { front: 'lekár', back: 'lieči chorých', lang: SK },
                  { front: 'učiteľka', back: 'učí deti v škole', lang: SK },
                  { front: 'poľnohospodár', back: 'pestuje plodiny a chová zvieratá', lang: SK },
                  { front: 'predavač', back: 'predáva v obchode', lang: SK },
                  { front: 'kuchár', back: 'varí jedlo', lang: SK },
                ],
                text: '<p>Ľudia robia rôzne <b>povolania</b> a navzájom si pomáhajú. Čím chceš byť ty? Otoč kartičky.</p>',
              },
              {
                title: 'Ako privolať pomoc',
                phrases: [
                  { es: 'Volám sa Ema Nová.', en: '1. kto som', lang: SK },
                  { es: 'Babka spadla a nevie vstať.', en: '2. čo sa stalo', lang: SK },
                  { es: 'Sme na Lipovej ulici 12 v Žiline.', en: '3. kde to je', lang: SK },
                  { es: 'Nezložím, kým mi nepovedia.', en: '4. počkám na pokyny', lang: SK },
                ],
                text: '<p>Pri volaní hovor <b>pokojne a zreteľne</b>. Na tiesňové čísla <b>nikdy nevoláme</b> zo žartu.</p>',
              },
              {
                title: 'Pozor, nebezpečenstvo',
                cards: [
                  { front: 'oheň a zápalky', back: 'nehráme sa s nimi', lang: SK },
                  { front: 'elektrina', back: 'nestrkáme nič do zásuvky', lang: SK },
                  { front: 'slnko', back: 'v lete pokrývka hlavy, krém a voda', lang: SK },
                  { front: 'lieky a čistiace prostriedky', back: 'nikdy ich neochutnávame', lang: SK },
                ],
                text: '<p>Doma aj vonku sú veci, ktoré môžu ublížiť. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>112</b> je tiesňové číslo pre všetko.',
                  '<b>150</b> hasiči, <b>155</b> záchranná služba, <b>158</b> polícia.',
                  'Pri volaní povedz <b>kto si, čo sa stalo a kde</b>.',
                  'S ohňom, elektrinou a liekmi sa <b>nehráme</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Na aké číslo zavoláš hasičov?',
                options: ['158', '155', '150', '100'], answer: '150',
                explain: 'Hasiči majú číslo <b>150</b>. Platí aj 112.', hint: 'pozri obrázok s číslami.' },
              { type: 'order', prompt: 'Zoraď, čo povieš, keď voláš pomoc.',
                items: ['kto som', 'čo sa stalo', 'kde to je'],
                explain: 'Kto som, čo sa stalo a <b>kde</b>.', hint: 'najprv sa predstav.' },
              { type: 'choice', prompt: 'Ktoré číslo platí pre všetky záchranné zložky v celej Európe?',
                options: ['112', '155', '150', '158'], answer: '112',
                explain: '<b>112</b> je jednotné európske číslo tiesňového volania.', hint: 'začína sa jednotkou a jednotkou.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Na tiesňové číslo môžem zavolať zo žartu.', answer: false,
                explain: '<b>Nepravda.</b> Zaťažil by si linku, ktorú niekto práve potrebuje.', hint: 'kto by sa nedovolal?' },
            ],
          },
        ],
      },
    ],
  });
})();
