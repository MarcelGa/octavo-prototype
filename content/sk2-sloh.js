'use strict';

/* Slovenčina · 2. ročník · Píšeme a rozprávame (iŠVP 2015: slohová zložka). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const H = 'font-family="Nunito, sans-serif" font-weight="700" font-style="italic"';
  const INK = '#1E1A3C';
  const BLUE = '#4C6A92';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const CARD = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Blahoželanie s balónmi: Milá babka, všetko najlepšie k narodeninám, veľa zdravia a šťastia! Tvoja Ema. Šípky ukazujú oslovenie, želanie a podpis.">
    <rect x="58" y="14" width="250" height="172" rx="12" fill="#FFFFFF" stroke="${BLUE}" stroke-width="2.5"/>
    <g class="a-bob"><ellipse cx="276" cy="44" rx="14" ry="17" fill="${CORAL}"/><ellipse cx="254" cy="52" rx="12" ry="15" fill="#F5C518"/><path d="M276 61 q-6 20 -10 34 M254 67 q4 14 6 28" fill="none" stroke="${INK}" stroke-width="1.5"/></g>
    <g ${H} font-size="17" fill="${INK}">
      <text x="74" y="50" ${pop(0.2)}>Milá babka,</text>
      <text x="74" y="88" ${pop(0.7)}>všetko najlepšie</text>
      <text x="74" y="110" ${pop(0.7)}>k narodeninám, veľa</text>
      <text x="74" y="132" ${pop(0.7)}>zdravia a šťastia!</text>
      <text x="292" y="170" text-anchor="end" ${pop(1.2)}>Tvoja Ema</text>
    </g>
    <g ${T} font-size="10" fill="${BLUE}"><text x="6" y="46" ${pop(0.4)}>oslovenie</text><text x="6" y="112" ${pop(0.9)}>želanie</text><text x="6" y="168" ${pop(1.4)}>podpis</text></g>
  </svg>`;

  const ENVELOPE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Obálka. Vľavo hore adresa odosielateľa, vpravo hore známka a vpravo dole adresa toho, komu list posielame: Ema Nová, Lipová 12, 010 01 Žilina.">
    <rect x="12" y="20" width="296" height="164" rx="8" fill="#FFFFFF" stroke="${BLUE}" stroke-width="2.5"/>
    <rect x="252" y="30" width="44" height="52" rx="3" fill="#FFE9E2" stroke="${CORAL}" stroke-width="2" stroke-dasharray="3 2"/>
    <path d="M262 64 l8 -14 l8 10 l6 -6 l6 10" fill="none" stroke="${CORAL}" stroke-width="2"/>
    <g font-family="Nunito, sans-serif" font-weight="700" font-size="11" fill="#4A4566"><text x="26" y="42">Jano Malý</text><text x="26" y="56">Školská 3</text><text x="26" y="70">960 01 Zvolen</text></g>
    <g ${pop(0.5)} ${T} font-size="16" fill="${INK}"><text x="150" y="122">Ema Nová</text><text x="150" y="144">Lipová 12</text><text x="150" y="166">010 01 Žilina</text></g>
    <g ${T} font-size="11" fill="${BLUE}"><text x="26" y="88">odosielateľ</text><text x="150" y="104" fill="#C2412A">adresát</text></g>
  </svg>`;

  // Three story panels: plant a seed, water it, a sunflower.
  const STORY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri obrázky za sebou. Prvý: dievča zasadí semienko. Druhý: polieva ho z krhly. Tretí: vyrástla veľká slnečnica.">
    ${[0, 1, 2].map((i) => `<rect x="${10 + i * 102}" y="20" width="96" height="120" rx="10" fill="#FFFFFF" stroke="${BLUE}" stroke-width="2"/><text x="${22 + i * 102}" y="40" ${T} font-size="14" fill="${BLUE}">${i + 1}.</text><path d="M${14 + i * 102} 120 H${102 + i * 102}" stroke="#8B5E34" stroke-width="6" stroke-linecap="round"/>`).join('')}
    <g ${pop(0.3)}><ellipse cx="58" cy="114" rx="6" ry="4" fill="#5E3D1E"/><path d="M58 96 v-6" stroke="${INK}" stroke-width="2"/><circle cx="40" cy="70" r="12" fill="#FFD9C9"/><path d="M40 82 v20 M40 90 l14 10" stroke="${CORAL}" stroke-width="5" stroke-linecap="round"/></g>
    <g ${pop(0.9)}><path d="M130 72 h22 l10 -8 M130 72 v16 h22 v-16" fill="#8C87A8" stroke="${INK}" stroke-width="2"/><path class="a-flow" d="M162 64 q8 10 4 30" fill="none" stroke="#3E63DD" stroke-width="2.5" stroke-dasharray="4 5"/><path d="M164 116 v-14 M164 108 q-6 -4 -8 -10 M164 106 q6 -4 8 -8" fill="none" stroke="${KELP}" stroke-width="3" stroke-linecap="round"/></g>
    <g ${pop(1.5)}><path d="M262 118 V62" stroke="${KELP}" stroke-width="4"/><path d="M262 92 q-14 -4 -18 -14 M262 84 q14 -4 18 -14" fill="none" stroke="${KELP}" stroke-width="3"/>${Array.from({ length: 10 }, (_, k) => { const a = (k / 10) * 2 * Math.PI; return `<ellipse cx="${(262 + Math.cos(a) * 16).toFixed(1)}" cy="${(52 + Math.sin(a) * 16).toFixed(1)}" rx="7" ry="4" transform="rotate(${(k * 36).toFixed(0)} ${(262 + Math.cos(a) * 16).toFixed(1)} ${(52 + Math.sin(a) * 16).toFixed(1)})" fill="#F5C518"/>`; }).join('')}<circle cx="262" cy="52" r="10" fill="#8B5E34"/></g>
    <g ${T} font-size="12" fill="#4A4566" text-anchor="middle"><text x="58" y="160">úvod</text><text x="160" y="160">jadro</text><text x="262" y="160">záver</text></g>
    <text x="160" y="188" text-anchor="middle" ${T} font-size="15" fill="${INK}">Nadpis: Emina slnečnica</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'sk2-sloh',
    subject: 'Slovenčina',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Píšeme a rozprávame',
    blurb: 'Blahoželanie, tykanie a vykanie, adresa a list, rozprávanie podľa obrázkov a opis predmetu.',
    artBg: '#F3F6FA',
    units: [
      {
        title: 'Sloh',
        lessons: [
          {
            id: 'sk2-sloh-blahozelanie',
            title: 'Blahoželanie, tykanie a vykanie',
            minutes: 8,
            slides: [
              {
                title: 'Píšeme blahoželanie',
                art: CARD,
                text: '<p>Blahoželanie má tri časti: <b>oslovenie</b> (Milá babka,), <b>želanie</b> (všetko najlepšie…) a <b>podpis</b> (Tvoja Ema). Po oslovení píšeme <b>čiarku</b>.</p>',
              },
              {
                title: 'Tykanie a vykanie',
                cards: [
                  { front: 'kamarát, brat, mama', back: 'tykám: Ahoj, ako sa máš?', lang: SK },
                  { front: 'pani učiteľka, sused, lekár', back: 'vykám: Dobrý deň, ako sa máte?', lang: SK },
                  { front: 'Ďakujem ti.', back: 'tykanie', lang: SK },
                  { front: 'Ďakujem vám.', back: 'vykanie', lang: SK },
                ],
                text: '<p>Kamarátom a rodine <b>tykáme</b>. Dospelým, ktorých dobre nepoznáme, a pani učiteľke <b>vykáme</b>. Je to prejav úcty.</p>',
              },
              {
                title: 'Vypočuj si želania',
                phrases: [
                  { es: 'Všetko najlepšie k narodeninám!', en: 'k narodeninám', lang: SK },
                  { es: 'Veľa zdravia a šťastia!', en: 'k sviatku alebo meninám', lang: SK },
                  { es: 'Ahoj, ako sa máš?', en: 'tykám kamarátovi', lang: SK },
                  { es: 'Dobrý deň, ako sa máte?', en: 'vykám dospelému', lang: SK },
                ],
                text: '<p>Blahoželať môžeme <b>ústne</b> aj <b>písomne</b>, napríklad na pohľadnici.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Blahoželanie: <b>oslovenie, želanie, podpis</b>.',
                  'Kamarátom a rodine <b>tykáme</b>.',
                  'Dospelým a pani učiteľke <b>vykáme</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Komu vykáš?',
                options: ['spolužiakovi', 'bratovi', 'pani riaditeľke', 'mladšej sestre'], answer: 'pani riaditeľke',
                explain: '<b>Pani riaditeľke</b> vykáme, je to dospelá osoba.', hint: 'komu prejavujeme úctu vykaním?' },
              { type: 'choice', prompt: 'Čo napíšeš na začiatok blahoželania?',
                options: ['podpis', 'adresu', 'oslovenie', 'dátum narodenia'], answer: 'oslovenie',
                explain: 'Na začiatok patrí <b>oslovenie</b>, napríklad Milá babka,', hint: 'koho zdravím?' },
              { type: 'order', prompt: 'Zoraď časti blahoželania.',
                items: ['Milá babka,', 'všetko najlepšie k narodeninám!', 'Tvoja Ema'],
                explain: 'Oslovenie, želanie, <b>podpis</b>.', hint: 'podpis je na konci.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pani učiteľke povieme: Ahoj, ako sa máš?', answer: false,
                explain: '<b>Nepravda.</b> Pani učiteľke vykáme: Dobrý deň, ako sa máte?', hint: 'tykáme, či vykáme?' },
            ],
          },
          {
            id: 'sk2-sloh-list',
            title: 'Adresa a list',
            minutes: 8,
            slides: [
              {
                title: 'Adresa na obálke',
                art: ENVELOPE,
                text: '<p>Adresu toho, komu list posielame (<b>adresáta</b>), píšeme <b>vpravo dole</b>: meno a priezvisko, ulica a číslo domu, <b>PSČ</b> a obec. Svoju adresu (<b>odosielateľa</b>) píšeme vľavo hore. Známka patrí vpravo hore.</p>',
              },
              {
                title: 'Časti listu',
                cards: [
                  { front: 'miesto a dátum', back: 'vpravo hore: V Žiline 3. 5.', lang: SK },
                  { front: 'oslovenie', back: 'Milý Paľko,', lang: SK },
                  { front: 'text listu', back: 'čo chcem povedať', lang: SK },
                  { front: 'pozdrav a podpis', back: 'Ahoj, tvoja Ema', lang: SK },
                ],
                text: '<p>List má päť častí. Otoč kartičky a zapamätaj si ich poradie.</p>',
              },
              {
                title: 'Krátky list',
                phrases: [
                  { es: 'V Žiline 3. mája', en: 'miesto a dátum', lang: SK },
                  { es: 'Milý Paľko,', en: 'oslovenie', lang: SK },
                  { es: 'včera sme boli v zoo a videli sme slona.', en: 'text listu', lang: SK },
                  { es: 'Ahoj, tvoja Ema', en: 'pozdrav a podpis', lang: SK },
                ],
                text: '<p>Vypočuj si, ako znie krátky <b>súkromný list</b> kamarátovi.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Adresa: <b>meno, ulica a číslo, PSČ a obec</b>.',
                  'Adresát vpravo dole, odosielateľ vľavo hore.',
                  'List: <b>miesto a dátum, oslovenie, text, pozdrav, podpis</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Zoraď riadky adresy.',
                items: ['Ema Nová', 'Lipová 12', '010 01 Žilina'],
                explain: 'Meno, ulica s číslom, <b>PSČ a obec</b>.', hint: 'meno je prvé.' },
              { type: 'choice', prompt: 'Kde na obálke píšeš adresu toho, komu list posielaš?',
                options: ['vľavo hore', 'na zadnú stranu', 'vpravo dole', 'na známku'], answer: 'vpravo dole',
                explain: 'Adresu adresáta píšeme <b>vpravo dole</b>.', hint: 'pozri obálku.' },
              { type: 'choice', prompt: 'Čo je PSČ?',
                options: ['číslo domu', 'poštové smerovacie číslo', 'telefónne číslo', 'dátum'], answer: 'poštové smerovacie číslo',
                explain: '<b>PSČ</b> je poštové smerovacie číslo, napríklad 010 01.', hint: 'pomáha pošte nájsť obec.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Na konci listu je pozdrav a podpis.', answer: true,
                explain: '<b>Pravda.</b> Napríklad: Ahoj, tvoja Ema.', hint: 'čím list končí?' },
            ],
          },
          {
            id: 'sk2-sloh-rozpravanie',
            title: 'Rozprávanie a opis',
            minutes: 9,
            slides: [
              {
                title: 'Rozprávanie podľa obrázkov',
                art: STORY,
                text: '<p>Príbeh má <b>úvod</b> (kto a kde), <b>jadro</b> (čo sa stalo) a <b>záver</b> (ako to skončilo). Obrázky si najprv dáme do správneho <b>poradia</b>. Príbeh potrebuje aj <b>nadpis</b>, krátky názov.</p>',
              },
              {
                title: 'Vypočuj si príbeh',
                phrases: [
                  { es: 'Ema zasadila na jar do záhrady semienko.', en: 'úvod', lang: SK },
                  { es: 'Každý deň ho polievala a čakala.', en: 'jadro', lang: SK },
                  { es: 'V lete vyrástla slnečnica vyššia ako Ema.', en: 'záver', lang: SK },
                  { es: 'Emina slnečnica', en: 'nadpis', lang: SK },
                ],
                text: '<p>Každá veta hovorí o jednom obrázku. Skús príbeh vyrozprávať vlastnými slovami.</p>',
              },
              {
                title: 'Opis predmetu',
                cards: [
                  { front: 'aká je veľká?', back: 'moja peračnica je dlhá ako pravítko', lang: SK },
                  { front: 'akú má farbu a tvar?', back: 'je modrá, má tvar kvádra', lang: SK },
                  { front: 'z čoho je?', back: 'je z látky, má zips', lang: SK },
                  { front: 'na čo slúži?', back: 'nosím v nej perá a ceruzky', lang: SK },
                ],
                text: '<p>Keď <b>opisujeme</b> predmet, hovoríme, aký je: veľkosť, farba, tvar, materiál a na čo slúži. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Príbeh: <b>úvod, jadro, záver</b>.',
                  '<b>Nadpis</b> je krátky názov príbehu.',
                  'Opis: <b>veľkosť, farba, tvar, materiál, na čo slúži</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Zoraď vety príbehu.',
                items: ['Ema zasadila semienko.', 'Každý deň ho polievala.', 'Vyrástla veľká slnečnica.'],
                explain: 'Úvod, jadro, <b>záver</b>.', hint: 'čo sa stalo najskôr?' },
              { type: 'choice', prompt: 'Čo je nadpis?',
                options: ['posledná veta', 'názov príbehu', 'meno autora', 'obrázok'], answer: 'názov príbehu',
                explain: '<b>Nadpis</b> je krátky názov príbehu.', hint: 'píše sa nad príbeh.' },
              { type: 'choice', prompt: 'Čo patrí do opisu predmetu?',
                options: ['čo som jedol na obed', 'farba a tvar', 'meno kamaráta', 'dnešný dátum'], answer: 'farba a tvar',
                explain: 'Pri opise hovoríme, aký predmet je: <b>farba, tvar</b>, veľkosť…', hint: 'aký je predmet?' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Príbeh má úvod, jadro a záver.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'začiatok, stred a koniec.' },
            ],
          },
        ],
      },
    ],
  });
})();
