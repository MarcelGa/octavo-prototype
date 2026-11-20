'use strict';

/* Hudobná výchova · 2. ročník · Nástroje a druhy skladieb (iŠVP 2015: inštrumentálne, percepčné a hudobno-pohybové činnosti). */
(() => {
  const { NOTE } = window.Octavo;
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const INK = '#1E1A3C';
  const WINE = '#9E2B4F';
  const CORAL = '#FF7A59';
  const KELP = '#1F8A4C';
  const SK = 'sk-SK';
  const pop = (delay) => `class="a-pop" style="animation-delay: ${delay}s; transform-box: fill-box; transform-origin: center"`;

  const ORFF = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Orffove nástroje: bubon, triangel, tamburína a xylofón s farebnými kameňmi.">
    <g ${pop(0.2)}><ellipse cx="50" cy="60" rx="30" ry="10" fill="#F8E4EA" stroke="${INK}" stroke-width="2.5"/><path d="M20 60 v34 q30 14 60 0 v-34" fill="${CORAL}" stroke="${INK}" stroke-width="2.5"/><path d="M84 30 l-30 26" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><text x="50" y="126" text-anchor="middle" ${T} font-size="13" fill="${INK}">bubon</text></g>
    <g ${pop(0.5)}><path d="M130 94 L152 40 L174 94 H138" fill="none" stroke="#8C87A8" stroke-width="4" stroke-linejoin="round"/><path d="M182 50 l-16 24" stroke="${INK}" stroke-width="2.5"/><text x="152" y="126" text-anchor="middle" ${T} font-size="13" fill="${INK}">triangel</text></g>
    <g ${pop(0.8)}><circle cx="252" cy="66" r="30" fill="#FEF3DD" stroke="#B9770E" stroke-width="5"/>${[0, 1, 2, 3, 4, 5].map((k) => { const a = (k / 6) * 2 * Math.PI; return `<circle cx="${(252 + Math.cos(a) * 30).toFixed(1)}" cy="${(66 + Math.sin(a) * 30).toFixed(1)}" r="5" fill="#C9C4E0" stroke="${INK}" stroke-width="1"/>`; }).join('')}<text x="252" y="126" text-anchor="middle" ${T} font-size="13" fill="${INK}">tamburína</text></g>
    <g ${pop(1.1)}>${['#E5484D', '#FF7A59', '#F5C518', '#30A46C', '#3E63DD', '#8E4EC6', '#D6409F', '#E5484D'].map((c, i) => `<rect x="${60 + i * 26}" y="${142 + i * 1.5}" width="22" height="${46 - i * 3}" rx="3" fill="${c}"/>`).join('')}</g>
    <text x="160" y="198" text-anchor="middle" ${T} font-size="12" fill="#4A4566">xylofón</text>
  </svg>`;

  const SONG_PARTS = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Časti piesne za sebou: predohra, prvá sloha, medzihra, druhá sloha, dohra.">
    ${[['predohra', '#F8E4EA'], ['1. sloha', '#FFE9E2'], ['medzihra', '#F8E4EA'], ['2. sloha', '#FFE9E2'], ['dohra', '#F8E4EA']].map(([l, c], i) => `<g class="ap-note" style="--d: ${(0.2 + i * 0.4).toFixed(1)}s"><rect x="${8 + i * 62}" y="70" width="56" height="56" rx="10" fill="${c}" stroke="${i % 2 ? CORAL : WINE}" stroke-width="2.5"/><text x="${36 + i * 62}" y="103" text-anchor="middle" ${T} font-size="11" fill="${INK}">${l}</text></g>`).join('')}
    <g ${T} font-size="10" text-anchor="middle">${[0, 1, 2, 3, 4].map((i) => `<text x="${36 + i * 62}" y="146" fill="${i % 2 ? CORAL : WINE}">${i % 2 ? 'spievame' : 'nástroje'}</text>`).join('')}</g>
  </svg>`;

  const MOVES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Postavičky: jedna kráča, druhá beží a tretia poskakuje. Pod nimi rytmy ta, ti-ti a poskok.">
    ${[[56, 'chôdza', 'ta ta ta'], [160, 'beh', 'ti-ti ti-ti'], [264, 'poskoky', 'hop, hop']].map(([x, l, r], i) => `<g class="a-bob" style="animation-delay: ${(i * 0.4).toFixed(1)}s"><circle cx="${x}" cy="44" r="12" fill="#FFD9C9"/><path d="M${x} 56 v34 M${x} 66 l-14 ${10 + i * 4} M${x} 66 l14 ${8 - i * 4} M${x} 90 l-${8 + i * 4} 26 M${x} 90 l${10 + i * 3} 24" stroke="${[WINE, CORAL, KELP][i]}" stroke-width="6" stroke-linecap="round"/></g>
      <text x="${x}" y="150" text-anchor="middle" ${T} font-size="14" fill="${INK}">${l}</text><text x="${x}" y="172" text-anchor="middle" ${T} font-size="13" fill="${WINE}">${r}</text>`).join('')}
  </svg>`;

  const SCALE = [['do', 'C4'], ['re', 'D4'], ['mi', 'E4'], ['fa', 'F4'], ['so', 'G4'], ['la', 'A4'], ['ti', 'B4'], ['do', 'C5']];
  const BEAT = 0.42;
  const SOUNDS = {
    drum: () => [[[110, 0.12], [0, 0.3], [110, 0.12], [0, 0.3], [110, 0.12], [110, 0.12], [110, 0.12]], { type: 'square', gain: 0.25 }],
    triangle: () => [[[NOTE.C6, 1.2]], { type: 'sine', gain: 0.2 }],
    march: () => [[...Array.from({ length: 8 }, (_, i) => [i % 2 ? NOTE.G4 : NOTE.C5, BEAT])], {}],
    waltz: () => [[...Array.from({ length: 9 }, (_, i) => [i % 3 ? NOTE.E4 : NOTE.C4, BEAT])], {}],
    walk: () => [[...Array.from({ length: 6 }, () => [NOTE.G4, BEAT])], {}],
    run: () => [[...Array.from({ length: 12 }, () => [NOTE.G4, BEAT / 2 - 0.025])], {}],
    hop: () => [[...Array.from({ length: 4 }, () => [[NOTE.C5, 0.28], [NOTE.G4, 0.12]]).flat()], {}],
  };
  const buttons = (items) => `<div class="control">${items.map(([lbl, id]) => `<button type="button" class="btn-chip" data-play="${id}">▶ ${lbl}</button>`).join('')}</div>`;
  function wire(root, api) {
    root.querySelectorAll('[data-play]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.play;
      let ok;
      if (id.startsWith('x:')) ok = api.tone([[NOTE[id.slice(2)], 0.5]], { type: 'sine', gain: 0.35 });
      else { const [seq, opts] = SOUNDS[id](); ok = api.tone(seq, opts); }
      if (!ok) api.toast('Zvuk na tomto zariadení nefunguje');
    }));
  }

  window.Octavo.addCourse({
    id: 'huv2-nastroje',
    subject: 'Hudobná výchova',
    lang: 'sk',                  // written in Slovak (Slovak school curriculum); shown as is in the English UI, with an SK badge
    audience: 'kids',
    lecturer: 'zuzana',
    title: 'Nástroje a druhy skladieb',
    blurb: 'Orffove nástroje, pieseň, pochod a tanec, predohra a dohra a pohyb s hudbou.',
    artBg: '#FBF3F6',
    units: [
      {
        title: 'Hráme a počúvame',
        lessons: [
          {
            id: 'huv2-nastroje-orff',
            title: 'Orffove nástroje',
            minutes: 8,
            slides: [
              {
                title: 'Nástroje v triede',
                art: ORFF,
                controls: buttons([['bubon', 'drum'], ['triangel', 'triangle']]),
                text: '<p><b>Orffove nástroje</b> sú jednoduché nástroje, na ktorých hrajú aj deti. <b>Rytmické</b> nástroje (bubon, triangel, tamburína, paličky, činely, chrastidlá) nehrajú melódiu, iba rytmus. Vypočuj si ich.</p>',
                setup: wire,
              },
              {
                title: 'Zahraj na xylofóne',
                controls: `<div class="control">${SCALE.map(([s, n]) => `<button type="button" class="btn-chip" data-play="x:${n}">${s}</button>`).join('')}</div>`,
                text: '<p><b>Melodické</b> nástroje (xylofón, zvonkohra, metalofón) hrajú rôzne vysoké tóny, a tak na nich zahráme <b>melódiu</b>. Čím kratší kameň, tým vyšší tón. Skús zahrať so-mi, so-mi.</p>',
                setup: wire,
              },
              {
                title: 'Rytmické či melodické?',
                cards: [
                  { front: 'bubon', back: 'rytmický', lang: SK },
                  { front: 'xylofón', back: 'melodický', lang: SK },
                  { front: 'triangel', back: 'rytmický, kovový', lang: SK },
                  { front: 'zvonkohra', back: 'melodická, kovová', lang: SK },
                  { front: 'paličky', back: 'rytmické, drevené', lang: SK },
                ],
                text: '<p>Otoč kartičky. Aj <b>telo</b> je nástroj: tlieskame, plieskame, dupeme.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Rytmické</b> nástroje: bubon, triangel, tamburína, paličky, činely.',
                  '<b>Melodické</b> nástroje: xylofón, zvonkohra, metalofón.',
                  'Na melodickom nástroji zahráme <b>melódiu</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Ktorý nástroj je melodický?',
                options: ['bubon', 'tamburína', 'xylofón', 'paličky'], answer: 'xylofón',
                explain: 'Na <b>xylofóne</b> zahráme rôzne vysoké tóny, melódiu.', hint: 'má kamienky rôznej dĺžky.' },
              { type: 'choice', prompt: 'Vypočuj si. Je to bubon, alebo triangel?', tones: [[NOTE.C6, 1.2]],
                options: ['bubon', 'triangel'], answer: 'triangel',
                explain: 'Vysoký, dlho zvoniaci tón má <b>triangel</b>.', hint: 'je tón vysoký a zvoní?' },
              { type: 'choice', prompt: 'Ktorý nástroj je rytmický?',
                options: ['zvonkohra', 'metalofón', 'triangel', 'xylofón'], answer: 'triangel',
                explain: '<b>Triangel</b> hrá iba rytmus.', hint: 'nemá rôzne vysoké tóny.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Na bubne zahráme melódiu piesne.', answer: false,
                explain: '<b>Nepravda.</b> Bubon je rytmický, hrá len rytmus.', hint: 'má bubon rôzne vysoké tóny?' },
            ],
          },
          {
            id: 'huv2-nastroje-skladby',
            title: 'Pieseň, pochod, tanec',
            minutes: 8,
            slides: [
              {
                title: 'Tri druhy skladieb',
                controls: buttons([['pochod: raz-dva', 'march'], ['valčík: raz-dva-tri', 'waltz']]),
                cards: [
                  { front: 'pieseň', back: 'spievame ju, má slová', lang: SK },
                  { front: 'pochod', back: 'kráčame, raz-dva', lang: SK },
                  { front: 'tanec', back: 'tancujeme, napríklad valčík raz-dva-tri', lang: SK },
                ],
                text: '<p><b>Pieseň</b> spievame. Pri <b>pochode</b> kráčame v takte na dve. Pri <b>tanci</b> sa pohybujeme, valčík má takt na tri. Vypočuj si pochod a valčík.</p>',
                setup: wire,
              },
              {
                title: 'Časti piesne',
                art: SONG_PARTS,
                replay: 'Ukázať znova',
                autoplay: true,
                text: '<p>Pred spevom hrajú nástroje <b>predohru</b>. Medzi slohami je <b>medzihra</b> a na konci <b>dohra</b>. Slohy piesne spievame.</p>',
              },
              {
                title: 'Ľudové a detské piesne',
                phrases: [
                  { es: 'ľudová pieseň', en: 'jej autora nepoznáme', lang: SK },
                  { es: 'detská pieseň', en: 'pre deti, často o zvieratkách', lang: SK },
                  { es: 'sloha', en: 'časť piesne s vlastným textom', lang: SK },
                  { es: 'refrén', en: 'časť, ktorá sa opakuje', lang: SK },
                ],
                text: '<p>Pri počúvaní sa pýtaj: Je to pieseň, pochod, alebo tanec? Je rýchla, či pomalá? Aká je jej nálada?</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  '<b>Pieseň</b> spievame, <b>pochod</b> kráčame, <b>tanec</b> tancujeme.',
                  'Pochod má takt <b>2/4</b>, valčík <b>3/4</b>.',
                  'Časti: <b>predohra</b>, slohy, <b>medzihra</b>, <b>dohra</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Zoraď časti piesne.',
                items: ['predohra', '1. sloha', 'medzihra', '2. sloha', 'dohra'],
                explain: 'Predohra, sloha, medzihra, sloha, <b>dohra</b>.', hint: 'začína sa predohrou.' },
              { type: 'choice', prompt: 'Vypočuj si. Je to pochod, alebo valčík?', tones: Array.from({ length: 9 }, (_, i) => [i % 3 ? NOTE.E4 : NOTE.C4, BEAT]),
                options: ['pochod', 'valčík'], answer: 'valčík',
                explain: 'Počítame raz-dva-tri: <b>valčík</b>.', hint: 'počítaj od dôrazného tónu.' },
              { type: 'choice', prompt: 'Čo hrajú nástroje na konci piesne?',
                options: ['predohru', 'medzihru', 'dohru', 'refrén'], answer: 'dohru',
                explain: 'Na konci je <b>dohra</b>.', hint: 'do-hra na konci.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Pri pochode kráčame raz-dva.', answer: true,
                explain: '<b>Pravda.</b> Pochod má takt na dve.', hint: 'ľavá, pravá.' },
            ],
          },
          {
            id: 'huv2-nastroje-pohyb',
            title: 'Pohyb s hudbou',
            minutes: 7,
            slides: [
              {
                title: 'Hýbeme sa podľa hudby',
                art: MOVES,
                controls: buttons([['chôdza', 'walk'], ['beh', 'run'], ['poskoky', 'hop']]),
                text: '<p>Hudba nám povie, ako sa hýbať. Na pomalé <b>ta</b> kráčame, na rýchle <b>ti-ti</b> bežíme a na skákavú hudbu <b>poskakujeme</b>. Pusti si hudbu a hýb sa s ňou.</p>',
                setup: wire,
              },
              {
                title: 'Pohyby v priestore a na mieste',
                cards: [
                  { front: 'chôdza', back: 'v priestore, na ta', lang: SK },
                  { front: 'beh', back: 'v priestore, na ti-ti', lang: SK },
                  { front: 'drep a výskok', back: 'na mieste', lang: SK },
                  { front: 'otočka', back: 'na mieste dookola', lang: SK },
                ],
                text: '<p>Niektoré pohyby robíme <b>v priestore</b> (chôdza, beh, cval), iné <b>na mieste</b> (drep, výskok, otočka, tlieskanie). Otoč kartičky.</p>',
              },
              {
                title: 'Vymysli tanec',
                phrases: [
                  { es: 'pomalá hudba', en: 'pomalé, plynulé pohyby', lang: SK },
                  { es: 'rýchla hudba', en: 'rýchle, veselé pohyby', lang: SK },
                  { es: 'silná hudba', en: 'veľké pohyby, dupanie', lang: SK },
                  { es: 'tichá hudba', en: 'malé pohyby, po špičkách', lang: SK },
                ],
                text: '<p>Keď sa hýbeš podľa hudby po svojom, je to <b>pohybová improvizácia</b>.</p>',
              },
              {
                title: 'Zhrnutie',
                points: [
                  'Na <b>ta</b> kráčame, na <b>ti-ti</b> bežíme.',
                  'Pohyby <b>v priestore</b> a <b>na mieste</b>.',
                  'Pohyb sa mení s <b>tempom</b> a <b>silou</b> hudby.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Vypočuj si. Kráčaš, alebo bežíš?', tones: Array.from({ length: 12 }, () => [NOTE.G4, BEAT / 2 - 0.025]),
                options: ['kráčam', 'bežím'], answer: 'bežím',
                explain: 'Rýchle tóny ti-ti: <b>bežíme</b>.', hint: 'sú tóny rýchle?' },
              { type: 'choice', prompt: 'Ktorý pohyb robíme na mieste?',
                options: ['beh', 'chôdza', 'drep', 'cval'], answer: 'drep',
                explain: '<b>Drep</b> robíme na mieste.', hint: 'nepohneš sa z miesta.' },
              { type: 'choice', prompt: 'Ako sa hýbeš na tichú hudbu?',
                options: ['dupem', 'malé pohyby po špičkách', 'skáčem vysoko', 'kričím'], answer: 'malé pohyby po špičkách',
                explain: 'Na tichú hudbu robíme <b>malé, tiché pohyby</b>.', hint: 'potichu.' },
              { type: 'tf', prompt: 'Pravda alebo nepravda?', statement: 'Na pomalé ta kráčame.', answer: true,
                explain: '<b>Pravda.</b>', hint: 'ta je jeden krok.' },
            ],
          },
        ],
      },
    ],
  });
})();
