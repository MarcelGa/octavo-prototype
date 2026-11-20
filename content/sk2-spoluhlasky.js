'use strict';

/* Slovenčina · 2. ročník · Tvrdé, mäkké a obojaké spoluhlásky (iŠVP 2015). Vybrané slová sú až v 3. ročníku. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const BLUE = '#4C6A92';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const SOFT = { fill: '#E0F4E8', stroke: KELP };   // mäkké: zelené
  const HARD = { fill: '#FFE9E2', stroke: CORAL };  // tvrdé: oranžové
  const BOTH = { fill: '#E6EDF5', stroke: BLUE };   // obojaké: modré
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const tile = (x, y, text, { w = 32, h = 36, fill = '#FFFFFF', stroke = BLUE, size = 20, delay = null } = {}) =>
    `<g ${delay != null ? pop(delay) : ''}><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/><text x="${x + w / 2}" y="${y + h / 2 + size * 0.36}" text-anchor="middle" ${T} font-size="${size}" fill="${INK}">${text}</text></g>`;
  const row = (letters, y, style, x0 = 12, step = 38, w = 32) => letters.map((l, i) => tile(x0 + i * step, y, l, { ...style, w: l.length > 1 ? w + 6 : w, delay: (0.1 + i * 0.1).toFixed(1) })).join('');

  const SOFT_ART = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Mäkké spoluhlásky v zelených kartičkách: ď, ť, ň, ľ, c, dz, č, dž, š, ž, j. Pod nimi pravidlo: po mäkkej spoluhláske píšeme i, í.">
    ${row(['ď', 'ť', 'ň', 'ľ', 'c', 'dz'], 26, SOFT, 26, 46)}
    ${row(['č', 'dž', 'š', 'ž', 'j'], 74, SOFT, 49, 46)}
    <g ${pop(1.3)}><rect x="40" y="132" width="240" height="44" rx="14" fill="#FFFFFF" stroke="${KELP}" stroke-width="3"/>
    <text x="160" y="161" text-anchor="middle" ${T} font-size="17" fill="${KELP}">mäkká + mäkké i, í</text></g>
  </svg>`;

  const HARD_ART = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tvrdé spoluhlásky v oranžových kartičkách: h, ch, k, g, d, t, n, l. Pod nimi pravidlo: po tvrdej spoluhláske píšeme y, ý.">
    ${row(['h', 'ch', 'k', 'g', 'd', 't', 'n', 'l'], 40, HARD, 14, 38)}
    <g ${pop(1.2)}><rect x="40" y="120" width="240" height="44" rx="14" fill="#FFFFFF" stroke="${CORAL}" stroke-width="3"/>
    <text x="160" y="149" text-anchor="middle" ${T} font-size="17" fill="#C2412A">tvrdá + tvrdé y, ý</text></g>
  </svg>`;

  const EXCEPT_ART = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Vľavo vstupenka do kina s nápisom kino: cudzie slová majú po tvrdej spoluhláske i. Vpravo slová lyko, mlyn, plyn, lyžica: po l píšeme y.">
    <g ${pop(0.2)}><rect x="20" y="40" width="130" height="70" rx="10" fill="#FFE9E2" stroke="${CORAL}" stroke-width="3" stroke-dasharray="0"/>
      <circle cx="20" cy="75" r="9" fill="#F3F6FA"/><circle cx="150" cy="75" r="9" fill="#F3F6FA"/>
      <text x="85" y="84" text-anchor="middle" ${T} font-size="26" fill="${INK}">k<tspan fill="#C2412A">i</tspan>no</text></g>
    <text x="85" y="140" text-anchor="middle" ${T} font-size="13" fill="#4A4566">cudzie slová:</text>
    <text x="85" y="160" text-anchor="middle" ${T} font-size="13" fill="#4A4566">kino, kilo, gitara</text>
    <g ${pop(0.8)} ${T} font-size="19" fill="${INK}">
      <text x="186" y="56">l<tspan fill="#C2412A">y</tspan>ko</text><text x="186" y="88">ml<tspan fill="#C2412A">y</tspan>n</text>
      <text x="186" y="120">pl<tspan fill="#C2412A">y</tspan>n</text><text x="186" y="152">l<tspan fill="#C2412A">y</tspan>žica</text>
    </g>
  </svg>`;

  const DETI_ART = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Napísané slovo deti a pod ním, ako ho vyslovíme: ďeťi. Pred e a i čítame d, t, n, l mäkko, hoci mäkčeň nepíšeme.">
    <text x="20" y="40" ${T} font-size="14" fill="${BLUE}">píšem</text>
    <text x="160" y="80" text-anchor="middle" ${T} font-size="48" fill="${INK}">deti</text>
    <path d="M160 96 v20 m-8 -8 l8 8 l8 -8" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="20" y="130" ${T} font-size="14" fill="${KELP}">čítam</text>
    <text x="160" y="172" text-anchor="middle" ${T} font-size="48" fill="${KELP}" ${pop(0.6)}>[ďeťi]</text>
  </svg>`;

  const GROUPS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri skupiny spoluhlások. Tvrdé: h, ch, k, g, d, t, n, l. Mäkké: ď, ť, ň, ľ, c, dz, č, dž, š, ž, j. Obojaké: b, m, p, r, s, v, z, f.">
    ${[['tvrdé', 'h ch k g d t n l', HARD, '#C2412A'], ['mäkké', 'ď ť ň ľ c dz č dž š ž j', SOFT, KELP], ['obojaké', 'b m p r s v z f', BOTH, BLUE]].map(([n, l, st, c], i) => `
    <g ${pop((0.2 + i * 0.5).toFixed(1))}><rect x="12" y="${16 + i * 60}" width="296" height="50" rx="12" fill="${st.fill}" stroke="${st.stroke}" stroke-width="2.5"/>
    <text x="26" y="${46 + i * 60}" ${T} font-size="15" fill="${c}">${n}</text>
    <text x="104" y="${47 + i * 60}" ${T} font-size="17" fill="${INK}">${l}</text></g>`).join('')}
  </svg>`;

  window.Octavo.addCourse({
    id: 'sk2-spoluhlasky',
    subject: 'Slovenčina',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Tvrdé, mäkké a obojaké spoluhlásky',
    blurb: 'Kedy píšeme i a kedy y: mäkké a tvrdé spoluhlásky, výnimky, de-te-ne-le a obojaké spoluhlásky.',
    artBg: '#F3F6FA',
    units: [
      {
        title: 'Mäkké a tvrdé',
        lessons: [
          {
            id: 'sk2-spoluhlasky-makke',
            title: 'Mäkké spoluhlásky',
            minutes: 8,
            slides: [
              {
                title: 'Mäkké spoluhlásky',
                art: SOFT_ART,
                text: '<p><b>Mäkké spoluhlásky</b> sú ď, ť, ň, ľ, c, dz, č, dž, š, ž, j. Po mäkkej spoluhláske píšeme vždy <b>mäkké i, í</b>.</p>',
              },
              {
                title: 'Slová s mäkkým i',
                phrases: [
                  { es: 'číslo', en: 'č + í', lang: SK },
                  { es: 'šípka', en: 'š + í', lang: SK },
                  { es: 'cibuľa', en: 'c + i', lang: SK },
                  { es: 'žito', en: 'ž + i', lang: SK },
                  { es: 'čiapka', en: 'č + ia', lang: SK },
                ],
                text: '<p>Vypočuj si slová. Po č, š, c, ž je vždy <b>i</b> alebo <b>í</b>.</p>',
              },
              {
                title: 'Ako si ich zapamätať',
                cards: [
                  { front: 'ď, ť, ň, ľ', back: 'mäkké s mäkčeňom', lang: SK },
                  { front: 'c, dz', back: 'mäkké bez mäkčeňa', lang: SK },
                  { front: 'č, dž, š, ž', back: 'tiež s mäkčeňom', lang: SK },
                  { front: 'j', back: 'mäkká, hoci nemá mäkčeň', lang: SK },
                ],
                text: '<p>Zapamätaj si ich po skupinkách. Najľahšie: <b>takmer všetky s mäkčeňom sú mäkké</b>, k nim pridaj c, dz a j.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Mäkké: <b>ď, ť, ň, ľ, c, dz, č, dž, š, ž, j</b>.',
                  'Po mäkkej spoluhláske píšeme <b>i, í</b>.',
                  'číslo, šípka, cibuľa, žito.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorá spoluhláska je mäkká?',
                options: ['k', 'h', 'c', 'r'], answer: 'c',
                explain: '<b>c</b> je mäkká, aj keď nemá mäkčeň.', hint: 'c, dz a j sú mäkké bez mäkčeňa.' },
              { type: 'choice', prompt: 'Doplň písmeno: č_slo',
                options: ['y', 'ý', 'í'], answer: 'í',
                explain: '<b>číslo</b>: po č píšeme mäkké í.', hint: 'č je mäkká.' },
              { type: 'choice', prompt: 'Ktoré slovo je napísané správne?',
                options: ['cybuľa', 'cibúľa', 'cybula', 'cibuľa'], answer: 'cibuľa',
                explain: '<b>cibuľa</b>: po c píšeme i.', hint: 'c je mäkká.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Po mäkkej spoluhláske píšeme y.', answer: false,
                explain: '<b>Nepravda.</b> Po mäkkej spoluhláske píšeme i, í.', hint: 'mäkká k mäkkému.' },
            ],
          },
          {
            id: 'sk2-spoluhlasky-tvrde',
            title: 'Tvrdé spoluhlásky',
            minutes: 8,
            slides: [
              {
                title: 'Tvrdé spoluhlásky',
                art: HARD_ART,
                text: '<p><b>Tvrdé spoluhlásky</b> sú h, ch, k, g, d, t, n, l. Po tvrdej spoluhláske píšeme v našich, domácich slovách <b>tvrdé y, ý</b>.</p>',
              },
              {
                title: 'Slová s tvrdým y',
                phrases: [
                  { es: 'chyba', en: 'ch + y', lang: SK },
                  { es: 'kytica', en: 'k + y', lang: SK },
                  { es: 'dyňa', en: 'd + y', lang: SK },
                  { es: 'tykva', en: 't + y', lang: SK },
                  { es: 'hýbať', en: 'h + ý', lang: SK },
                ],
                text: '<p>Počúvaj: po <b>d</b> a <b>t</b> s tvrdým y znie hláska tvrdo: <b>dy</b>ňa, <b>ty</b>kva.</p>',
              },
              {
                title: 'Zapamätaj si',
                cards: [
                  { front: 'h, ch', back: 'chyba, hýbať', lang: SK },
                  { front: 'k, g', back: 'kytica, kyslý', lang: SK },
                  { front: 'd, t', back: 'dyňa, tykva, ty', lang: SK },
                  { front: 'tvrdé spoluhlásky', back: 'h, ch, k, g, d, t, n, l', lang: SK },
                ],
                text: '<p>Pomôcka: <b>h, ch, k, g</b> sa vyslovujú vzadu v hrdle, <b>d, t, n, l</b> vpredu pri zuboch.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Tvrdé: <b>h, ch, k, g, d, t, n, l</b>.',
                  'Po tvrdej spoluhláske píšeme v domácich slovách <b>y, ý</b>.',
                  'chyba, kytica, dyňa, tykva.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorá spoluhláska je tvrdá?',
                options: ['š', 'ž', 'j', 'k'], answer: 'k',
                explain: '<b>k</b> je tvrdá.', hint: 'h, ch, k, g, d, t, n, l.' },
              { type: 'choice', prompt: 'Doplň písmeno: ch_ba',
                options: ['i', 'y', 'í'], answer: 'y',
                explain: '<b>chyba</b>: po ch píšeme y.', hint: 'ch je tvrdá.' },
              { type: 'choice', prompt: 'Ktoré slovo je napísané správne?',
                options: ['kitica', 'kytica', 'kytíca', 'kitíca'], answer: 'kytica',
                explain: '<b>kytica</b>: po k píšeme y.', hint: 'k je tvrdá.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Po tvrdej spoluhláske v domácich slovách píšeme y.', answer: true,
                explain: '<b>Pravda.</b> Tvrdá k tvrdému.', hint: 'tvrdá k tvrdému.' },
            ],
          },
          {
            id: 'sk2-spoluhlasky-vynimky',
            title: 'Kino, kikirikí a lyžica',
            minutes: 8,
            slides: [
              {
                title: 'Výnimky',
                art: EXCEPT_ART,
                text: '<p>V <b>cudzích slovách</b>, ktoré k nám prišli z iných jazykov, píšeme aj po tvrdej spoluhláske <b>i</b>: kino, kilo, gitara. Tiež v slovách, ktoré <b>napodobňujú zvuky</b>: kikirikí, hihihi.</p>',
              },
              {
                title: 'Cudzie a zvukomalebné slová',
                phrases: [
                  { es: 'kino', en: 'tam sa premietajú filmy', lang: SK },
                  { es: 'kimono', en: 'japonský odev', lang: SK },
                  { es: 'gitara', en: 'hudobný nástroj so strunami', lang: SK },
                  { es: 'kikirikí', en: 'tak volá kohút', lang: SK },
                  { es: 'hihihi', en: 'tak sa smejeme', lang: SK },
                ],
                text: '<p>Tieto slová sa oplatí <b>naučiť naspamäť</b>.</p>',
              },
              {
                title: 'Po l píšeme y',
                cards: [
                  { front: 'lyko', back: 'kôra z lipy, pletú sa z nej košíky', lang: SK },
                  { front: 'mlyn', back: 'melie sa v ňom obilie na múku', lang: SK },
                  { front: 'plyn', back: 'varíme na ňom', lang: SK },
                  { front: 'lyžica', back: 'jeme ňou polievku', lang: SK },
                  { front: 'lyže', back: 'jazdíme na nich po snehu', lang: SK },
                ],
                text: '<p>Po tvrdej <b>l</b> píšeme v týchto slovách <b>y</b> a čítame ich tvrdo. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'V <b>cudzích</b> slovách píšeme po tvrdej spoluhláske aj i: kino, gitara.',
                  'V <b>zvukomalebných</b> slovách tiež: kikirikí, hihihi.',
                  'Po l píšeme y: <b>lyko, mlyn, plyn, lyžica, lyže</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Prečo píšeme v slove kino po k mäkké i?',
                options: ['k je mäkká', 'je to cudzie slovo', 'je to chyba', 'je to meno'], answer: 'je to cudzie slovo',
                explain: '<b>Kino</b> je cudzie slovo, preto v ňom píšeme i.', hint: 'k je tvrdá, tak prečo i?' },
              { type: 'choice', prompt: 'Ktoré slovo je napísané správne?',
                options: ['lizica', 'lížica', 'lyžica', 'lyžyca'], answer: 'lyžica',
                explain: '<b>lyžica</b>: po l y, po ž i.', hint: 'pozri kartičky.' },
              { type: 'choice', prompt: 'Doplň písmeno: ml_n',
                options: ['i', 'í', 'y'], answer: 'y',
                explain: '<b>mlyn</b> píšeme s y.', hint: 'je to jedno zo slov s ly.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'V slove kikirikí píšeme i, lebo napodobňuje zvuk.', answer: true,
                explain: '<b>Pravda.</b> Je to zvukomalebné slovo.', hint: 'kto robí kikirikí?' },
            ],
          },
          {
            id: 'sk2-spoluhlasky-detenele',
            title: 'de, te, ne, le čítame mäkko',
            minutes: 8,
            slides: [
              {
                title: 'Píšem inak, ako čítam',
                art: DETI_ART,
                text: '<p>V domácich slovách čítame <b>d, t, n, l</b> pred <b>e, i, í, ia, ie, iu</b> <b>mäkko</b>, hoci mäkčeň nepíšeme. Píšeme <b>deti</b>, čítame <b>ďeťi</b>.</p>',
              },
              {
                title: 'Vypočuj si',
                phrases: [
                  { es: 'deti', en: 'čítame ďeťi', lang: SK },
                  { es: 'ticho', en: 'čítame ťicho', lang: SK },
                  { es: 'nesiem', en: 'čítame ňesiem', lang: SK },
                  { es: 'lienka', en: 'čítame ľienka', lang: SK },
                ],
                text: '<p>Počúvaj pozorne: na začiatku každého slova počuješ mäkkú hlásku.</p>',
              },
              {
                title: 'Kedy píšeme mäkčeň',
                cards: [
                  { front: 'pred a, o, u', back: 'píšem mäkčeň: ďakujem, ťava, ľad', lang: SK },
                  { front: 'na konci slova', back: 'píšem mäkčeň: deň, kôň, soľ', lang: SK },
                  { front: 'pred e, i', back: 'mäkčeň nepíšem: deti, nesiem, lipa', lang: SK },
                  { front: 'ten, jeden, teraz', back: 'výnimky: čítame tvrdo', lang: SK },
                ],
                text: '<p>Pozor na pár slov, ktoré čítame <b>tvrdo</b>, hoci je v nich te alebo de: <b>ten, jeden, teraz, vtedy</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>de, te, ne, le, di, ti, ni, li</b> čítame mäkko, mäkčeň nepíšeme.',
                  'Pred a, o, u a na konci slova mäkčeň <b>píšeme</b>: ďakujem, deň.',
                  'Výnimky čítame tvrdo: <b>ten, jeden, teraz</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako vyslovíme slovo deti?',
                options: ['dety', 'ďeťi', 'deťy', 'ďety'], answer: 'ďeťi',
                explain: 'Pred e a i čítame d a t mäkko: <b>ďeťi</b>.', hint: 'de a ti čítame mäkko.' },
              { type: 'choice', prompt: 'V ktorom slove píšeme mäkčeň?',
                options: ['deti', 'ďakujem', 'nesiem', 'lipa'], answer: 'ďakujem',
                explain: 'Pred a píšeme mäkčeň: <b>ďakujem</b>.', hint: 'mäkčeň píšeme pred a, o, u.' },
              { type: 'choice', prompt: 'Ktoré slovo čítame tvrdo?',
                options: ['deti', 'nesiem', 'ten', 'lienka'], answer: 'ten',
                explain: '<b>ten</b> je výnimka, čítame ho tvrdo.', hint: 'spomeň si na výnimky.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'V slove ticho píšeme mäkčeň nad t.', answer: false,
                explain: '<b>Nepravda.</b> Píšeme ticho, mäkko ho len čítame.', hint: 'ti čítame mäkko, mäkčeň nepíšeme.' },
            ],
          },
          {
            id: 'sk2-spoluhlasky-obojake',
            title: 'Obojaké spoluhlásky',
            minutes: 7,
            slides: [
              {
                title: 'Tri skupiny spoluhlások',
                art: GROUPS,
                text: '<p>Okrem tvrdých a mäkkých máme aj <b>obojaké</b> spoluhlásky: <b>b, m, p, r, s, v, z, f</b>. Po nich môžeme písať <b>i</b> aj <b>y</b>.</p>',
              },
              {
                title: 'Raz i, raz y',
                phrases: [
                  { es: 'ryba', en: 'po r je tu y', lang: SK },
                  { es: 'riad', en: 'po r je tu i', lang: SK },
                  { es: 'myš', en: 'po m je tu y', lang: SK },
                  { es: 'misa', en: 'po m je tu i', lang: SK },
                ],
                text: '<p>Po obojakej spoluhláske nerozhodne pravidlo o tvrdosti. Kedy píšeme y, sa naučíš v <b>3. ročníku</b> pomocou <b>vybraných slov</b>. Teraz si zapamätaj, ktoré spoluhlásky sú obojaké.</p>',
              },
              {
                title: 'Ako si ich zapamätať',
                cards: [
                  { front: 'b, m, p', back: 'obojaké: pery sa zatvárajú', lang: SK },
                  { front: 'r, s, v, z, f', back: 'obojaké: zvyšok skupiny', lang: SK },
                  { front: 'obojaké spoluhlásky', back: 'b, m, p, r, s, v, z, f', lang: SK },
                ],
                text: '<p>Hovor si ich ako riekanku: <b>b, m, p, r, s, v, z, f</b>. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Tvrdé: h, ch, k, g, d, t, n, l → <b>y</b>.',
                  'Mäkké: ď, ť, ň, ľ, c, dz, č, dž, š, ž, j → <b>i</b>.',
                  'Obojaké: <b>b, m, p, r, s, v, z, f</b> → raz i, raz y.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorá spoluhláska je obojaká?',
                options: ['k', 'č', 'b', 'ň'], answer: 'b',
                explain: '<b>b</b> je obojaká.', hint: 'b, m, p, r, s, v, z, f.' },
              { type: 'choice', prompt: 'Do ktorej skupiny patrí r?',
                options: ['tvrdé', 'mäkké', 'obojaké'], answer: 'obojaké',
                explain: '<b>r</b> je obojaká: ryba, riad.', hint: 'ryba aj riad.' },
              { type: 'choice', prompt: 'Ktorá skupina sú obojaké spoluhlásky?',
                options: ['h, ch, k, g', 'b, m, p, r, s, v, z, f', 'č, š, ž, c', 'd, t, n, l'], answer: 'b, m, p, r, s, v, z, f',
                explain: 'Obojaké sú <b>b, m, p, r, s, v, z, f</b>.', hint: 'zopakuj si riekanku.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Po obojakej spoluhláske píšeme vždy y.', answer: false,
                explain: '<b>Nepravda.</b> Raz i (misa), raz y (myš).', hint: 'myš aj misa.' },
            ],
          },
        ],
      },
    ],
  });
})();
