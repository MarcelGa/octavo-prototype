'use strict';

/* Hudobná výchova · 2. ročník · Tempo, sila a výška tónu (iŠVP 2015: tempo, dynamika, melodizácia so-mi, hlas). */
(() => {
  const { NOTE } = window.Octavo;
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const WINE = '#9E2B4F';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const TUNE = ['G4', 'E4', 'G4', 'E4', 'G4', 'G4', 'E4'];   // so-mi so-mi so-so-mi
  const play = (notes, beat) => notes.map((n) => [n ? NOTE[n] : 0, beat]);
  const SOLFA = { do: 'C4', mi: 'E4', so: 'G4', la: 'A4' };
  const sing = (syll, beat = 0.42) => syll.split('-').map((s) => [NOTE[SOLFA[s]], beat]);

  const TEMPO = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Vľavo korytnačka: pomaly. Vpravo zajac: rýchlo. Dole malý reproduktor pre slabo a veľký pre silno.">
    <g class="a-bob"><ellipse cx="80" cy="64" rx="34" ry="20" fill="#30A46C"/><circle cx="120" cy="62" r="10" fill="#9ED3A8"/><path d="M58 82 v8 M100 82 v8" stroke="#9ED3A8" stroke-width="6" stroke-linecap="round"/></g>
    <g class="a-bob" style="animation-delay: 0.3s"><ellipse cx="232" cy="66" rx="26" ry="16" fill="#C9C4E0"/><circle cx="258" cy="52" r="11" fill="#C9C4E0"/><path d="M256 42 l-4 -24 M264 42 l4 -24" stroke="#C9C4E0" stroke-width="6" stroke-linecap="round"/></g>
    <g ${T} font-size="15" text-anchor="middle"><text x="84" y="112" fill="${KELP}">pomaly</text><text x="240" y="112" fill="#C2412A">rýchlo</text></g>
    <g><path d="M60 146 h10 l12 -10 v32 l-12 -10 h-10z" fill="${INK}"/><path d="M90 146 q4 6 0 12" fill="none" stroke="${INK}" stroke-width="2"/><text x="78" y="190" text-anchor="middle" ${T} font-size="14" fill="${INK}">slabo · p</text></g>
    <g><path d="M206 140 h16 l20 -16 v52 l-20 -16 h-16z" fill="${INK}"/><path d="M252 138 q10 14 0 28 M262 130 q18 22 0 44" fill="none" stroke="${INK}" stroke-width="3"/><text x="232" y="194" text-anchor="middle" ${T} font-size="14" fill="${INK}">silno · f</text></g>
  </svg>`;

  // A staircase: do, mi, so, la from low to high.
  const STAIRS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Schody s tónmi od najnižšieho po najvyšší: do, mi, so, la. So je vyššie ako mi.">
    ${[['do', 0], ['mi', 2], ['so', 4], ['la', 5]].map(([n, h], i) => `<g ${pop((0.2 + i * 0.3).toFixed(1))}><rect x="${30 + i * 66}" y="${170 - (h + 1) * 22}" width="60" height="${(h + 1) * 22}" rx="6" fill="${['#F8E4EA', '#F1C6D3', '#E29BB2', '#C9567A'][i]}"/><text x="${60 + i * 66}" y="${160 - (h + 1) * 22}" text-anchor="middle" ${T} font-size="20" fill="${WINE}">${n}</text></g>`).join('')}
    <path d="M30 172 H296" stroke="${INK}" stroke-width="3"/>
  </svg>`;

  const VOICES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Tri skupiny spevákov: jeden spevák spieva sólo, skupina spieva jednohlasne rovnakú melódiu a dve skupiny spievajú dvojhlas, každá inú melódiu.">
    ${[[60, 1, 'sólo'], [160, 3, 'jednohlas'], [262, 4, 'dvojhlas']].map(([cx, n, l], g) => `<g ${pop((0.2 + g * 0.5).toFixed(1))}>${Array.from({ length: n }, (_, i) => { const x = cx + (i - (n - 1) / 2) * 22; const c = g === 2 && i >= 2 ? CORAL : WINE; return `<circle cx="${x}" cy="96" r="9" fill="#FFD9C9"/><path d="M${x - 10} 128 v-12 a10 9 0 0 1 20 0 v12z" fill="${c}"/>`; }).join('')}
      <text x="${cx}" y="158" text-anchor="middle" ${T} font-size="14" fill="${INK}">${l}</text>
      <path class="a-flow" d="M${cx - 20} 70 q10 -14 20 0 t20 0" fill="none" stroke="${WINE}" stroke-width="2.5" stroke-dasharray="5 5"/>
      ${g === 2 ? `<path class="a-flow" d="M${cx - 20} 56 q10 -10 20 0 t20 0" fill="none" stroke="${CORAL}" stroke-width="2.5" stroke-dasharray="5 5"/>` : ''}</g>`).join('')}
  </svg>`;

  const buttons = (items) => `<div class="control">${items.map(([lbl, id]) => `<button type="button" class="btn-chip" data-play="${id}">▶ ${lbl}</button>`).join('')}</div>`;
  const SOUNDS = {
    slow: () => [play(TUNE, 0.7)],
    fast: () => [play(TUNE, 0.2)],
    soft: () => [play(TUNE, 0.4), { gain: 0.06 }],
    loud: () => [play(TUNE, 0.4), { gain: 0.45 }],
    'so-mi': () => [sing('so-mi')],
    'la-so-mi': () => [sing('la-so-mi')],
    'so-mi-do': () => [sing('so-mi-do')],
    up: () => [sing('do-mi-so-la')],
  };
  function wire(root, api) {
    root.querySelectorAll('[data-play]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.play;
      let ok;
      if (id === 'duet') {
        ok = api.tone(play(['G4', 'A4', 'G4', 'E4', 'G4', 'A4', 'G4'], 0.42));
        api.tone(play(['E4', 'F4', 'E4', 'C4', 'E4', 'F4', 'E4'], 0.42), { gain: 0.2 });
      } else {
        const [seq, opts] = SOUNDS[id]();
        ok = api.tone(seq, opts);
      }
      if (!ok) api.toast('Zvuk na tomto zariadení nefunguje');
    }));
  }

  window.Octavo.addCourse({
    id: 'huv2-zvuk',
    subject: 'Hudobná výchova',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Tempo, sila a výška tónu',
    blurb: 'Rýchlo a pomaly, silno a slabo, vysoko a nízko so solmizáciou so-mi a ako spievame.',
    artBg: '#FBF3F6',
    units: [
      {
        title: 'Vlastnosti tónu',
        lessons: [
          {
            id: 'huv2-zvuk-tempo',
            title: 'Rýchlo, pomaly, silno, slabo',
            minutes: 8,
            slides: [
              {
                title: 'Tempo a dynamika',
                art: TEMPO,
                text: '<p><b>Tempo</b> je to, ako rýchlo hudba plynie: <b>pomaly</b> ako korytnačka alebo <b>rýchlo</b> ako zajac. <b>Dynamika</b> je to, ako silno hudba znie: <b>silno</b> (forte, f) alebo <b>slabo</b> (piano, p).</p>',
              },
              {
                title: 'Vypočuj si rozdiel',
                controls: buttons([['pomaly', 'slow'], ['rýchlo', 'fast'], ['slabo (p)', 'soft'], ['silno (f)', 'loud']]),
                text: '<p>Je to stále tá istá melódia so-mi. Mení sa iba <b>tempo</b> alebo <b>sila</b>. Hudba môže aj <b>zrýchľovať</b>, <b>spomaľovať</b>, <b>zosilňovať</b> a <b>zoslabovať</b>.</p>',
                setup: wire,
              },
              {
                title: 'Kedy ako',
                cards: [
                  { front: 'pomaly a slabo', back: 'uspávanka', lang: SK },
                  { front: 'rýchlo a silno', back: 'veselý tanec, pochod', lang: SK },
                  { front: 'forte', back: 'f: silno', lang: SK },
                  { front: 'piano', back: 'p: slabo', lang: SK },
                ],
                text: '<p>Tempo a sila menia <b>náladu</b> hudby. Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Tempo</b>: rýchlo alebo pomaly.',
                  '<b>Dynamika</b>: silno (<b>f</b>, forte) alebo slabo (<b>p</b>, piano).',
                  'Uspávanka je pomalá a tichá, pochod rýchly a silný.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Vypočuj si. Je melódia rýchla, alebo pomalá?', tones: play(TUNE, 0.2),
                options: ['rýchla', 'pomalá'], answer: 'rýchla',
                explain: 'Tóny išli rýchlo za sebou: <b>rýchle</b> tempo.', hint: 'ako zajac, alebo ako korytnačka?' },
              { type: 'choice', prompt: 'Čo znamená značka f (forte)?',
                options: ['slabo', 'pomaly', 'silno', 'vysoko'], answer: 'silno',
                explain: '<b>f</b>, forte, znamená <b>silno</b>.', hint: 'p je slabo, f je…' },
              { type: 'choice', prompt: 'Aká býva uspávanka?',
                options: ['rýchla a silná', 'pomalá a tichá', 'rýchla a tichá', 'hlasná ako pochod'], answer: 'pomalá a tichá',
                explain: 'Uspávanka je <b>pomalá a tichá</b>, aby sme zaspali.', hint: 'pri nej zaspávame.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Tempo hovorí, ako rýchlo hudba plynie.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'korytnačka a zajac.' },
            ],
          },
          {
            id: 'huv2-zvuk-somi',
            title: 'Vysoko a nízko: so-mi',
            minutes: 8,
            slides: [
              {
                title: 'Tóny na schodoch',
                art: STAIRS,
                controls: buttons([['do-mi-so-la (hore)', 'up'], ['so-mi', 'so-mi'], ['la-so-mi', 'la-so-mi'], ['so-mi-do', 'so-mi-do']]),
                text: '<p>Tóny môžu byť <b>vysoké</b> alebo <b>nízke</b>. Pomenúvame ich slabikami: <b>do, mi, so, la</b>. Tomu hovoríme <b>solmizácia</b>. So je vyššie ako mi. Vypočuj si a spievaj s nimi.</p>',
                setup: wire,
              },
              {
                title: 'Ruka ukazuje výšku',
                cards: [
                  { front: 'so', back: 'ruka vo výške očí', lang: SK },
                  { front: 'mi', back: 'ruka vo výške brady', lang: SK },
                  { front: 'la', back: 'ruka nad hlavou', lang: SK },
                  { front: 'do', back: 'ruka pri páse', lang: SK },
                ],
                text: '<p>Pri speve ukazujeme výšku tónu <b>rukou</b>: čím vyšší tón, tým vyššie ruka. Otoč kartičky.</p>',
              },
              {
                title: 'Kukučka spieva so-mi',
                phrases: [
                  { es: 'ku-kuk', en: 'so-mi: kukučka', lang: SK },
                  { es: 'ma-ma', en: 'so-mi: tak voláme mamu', lang: SK },
                  { es: 'vysoký tón', en: 'piskot vtáčika', lang: SK },
                  { es: 'nízky tón', en: 'bručanie medveďa', lang: SK },
                ],
                text: '<p>Keď voláme na niekoho z diaľky, často spievame <b>so-mi</b>. Skús to: „Ma-ma!“</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Tóny sú <b>vysoké</b> a <b>nízke</b>.',
                  'Solmizačné slabiky: <b>do, mi, so, la</b>.',
                  '<b>So</b> je vyššie ako <b>mi</b>, <b>la</b> je ešte vyššie.',
                  'Výšku tónu ukazujeme <b>rukou</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Vypočuj si. Ide melódia hore, alebo dole?', tones: sing('so-mi-do'),
                options: ['hore', 'dole'], answer: 'dole',
                explain: 'So-mi-do: tóny klesajú, melódia ide <b>dole</b>.', hint: 'je posledný tón vyšší alebo nižší?' },
              { type: 'choice', prompt: 'Ktorý tón je vyšší?',
                options: ['mi', 'so', 'do'], answer: 'so',
                explain: '<b>So</b> je vyššie ako mi aj do.', hint: 'pozri schody.' },
              { type: 'order', prompt: 'Zoraď tóny od najnižšieho.',
                items: ['do', 'mi', 'so', 'la'],
                explain: 'do, mi, so, <b>la</b>.', hint: 'do je najnižšie.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Kukučka spieva so-mi.', answer: true,
                explain: '<b>Pravda.</b> Ku-kuk: vyšší a nižší tón.', hint: 'ku je vyššie, kuk nižšie.' },
            ],
          },
          {
            id: 'huv2-zvuk-hlas',
            title: 'Hlas a spev',
            minutes: 8,
            slides: [
              {
                title: 'Hovoríme a spievame',
                phrases: [
                  { es: 'Dobrý deň!', en: 'hovorený prejav', lang: SK },
                  { es: 'nádych', en: 'pred spevom sa pokojne nadýchnem', lang: SK },
                  { es: 'rovný postoj', en: 'pri speve stojím rovno', lang: SK },
                  { es: 'zreteľná výslovnosť', en: 'slovám pri speve rozumieť', lang: SK },
                ],
                text: '<p>Hlasom môžeme <b>hovoriť</b> aj <b>spievať</b>. Pri speve tóny <b>držíme</b> a menia sa ich výšky. Spievame <b>rovno</b>, s pokojným <b>nádychom</b> a zreteľne.</p>',
              },
              {
                title: 'Sólo, jednohlas, dvojhlas',
                art: VOICES,
                controls: buttons([['jednohlas', 'so-mi'], ['dvojhlas', 'duet']]),
                text: '<p><b>Sólo</b> spieva jeden spevák. <b>Jednohlas</b>: všetci spievajú tú istú melódiu. <b>Dvojhlas</b>: dve skupiny spievajú naraz dve rôzne melódie. Veľa spevákov spolu je <b>zbor</b>.</p>',
                setup: wire,
              },
              {
                title: 'Zapamätaj si',
                cards: [
                  { front: 'sólo', back: 'spieva jeden', lang: SK },
                  { front: 'jednohlas', back: 'všetci tú istú melódiu', lang: SK },
                  { front: 'dvojhlas', back: 'dve melódie naraz', lang: SK },
                  { front: 'zbor', back: 'veľa spevákov spolu', lang: SK },
                ],
                text: '<p>Otoč kartičky.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Hlasom <b>hovoríme</b> aj <b>spievame</b>.',
                  'Pri speve stojíme rovno a pokojne dýchame.',
                  '<b>Sólo</b>, <b>jednohlas</b>, <b>dvojhlas</b>, <b>zbor</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ako sa volá, keď všetci spievajú tú istú melódiu?',
                options: ['dvojhlas', 'sólo', 'jednohlas', 'pomlčka'], answer: 'jednohlas',
                explain: 'Je to <b>jednohlas</b>.', hint: 'jeden hlas pre všetkých.' },
              { type: 'choice', prompt: 'Čo je zbor?',
                options: ['jeden spevák', 'veľa spevákov spolu', 'hudobný nástroj', 'rýchle tempo'], answer: 'veľa spevákov spolu',
                explain: '<b>Zbor</b> je veľa spevákov spolu.', hint: 'školský spevácky…' },
              { type: 'choice', prompt: 'Ako stojíme pri speve?',
                options: ['zhrbene', 'rovno', 'na jednej nohe', 'v sede s hlavou dole'], answer: 'rovno',
                explain: 'Spievame v <b>rovnom</b> postoji, aby sme mohli dobre dýchať.', hint: 'potrebujeme dobre dýchať.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pri dvojhlase znejú naraz dve rôzne melódie.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'dvoj-hlas.' },
            ],
          },
        ],
      },
    ],
  });
})();
