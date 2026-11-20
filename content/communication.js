'use strict';

/* Communication · Communicate with confidence (13 lessons). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const BLUE = '#0090C1';
  const INK = '#1E1A3C';

  // A simple standing person. pose: 'open' (arms out, palms visible) or 'closed' (arms crossed).
  function person(x, y, color, pose = 'open') {
    const head = `<circle cx="${x}" cy="${y}" r="15" fill="${color}"/>`;
    const body = `<path d="M${x - 20} ${y + 82} V${y + 38} a20 18 0 0 1 40 0 V${y + 82} Z" fill="${color}"/>`;
    const arms = pose === 'open'
      ? `<g fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"><path d="M${x - 18} ${y + 32} L${x - 44} ${y + 54}"/><path d="M${x + 18} ${y + 32} L${x + 44} ${y + 54}"/></g>
         <circle cx="${x - 46}" cy="${y + 57}" r="6" fill="#FFD9C9"/><circle cx="${x + 46}" cy="${y + 57}" r="6" fill="#FFD9C9"/>`
      : `<g fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="9" stroke-linecap="round"><path d="M${x - 22} ${y + 44} L${x + 22} ${y + 56}"/><path d="M${x + 22} ${y + 44} L${x - 22} ${y + 56}"/></g>`;
    return head + body + arms;
  }

  // Art with words: a function of the UI language ('en' | 'sk').
  const FIRST = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk'
    ? 'Stretnú sa dvaja ľudia. Stopky medzi nimi ukazujú 0,1 sekundy a nad jedným z nich vyskočí bublina s fajkou.'
    : 'Two people meet. A stopwatch between them shows 0.1 seconds, and a thought bubble with a tick pops up above one of them.'}">
    ${person(70, 60, BLUE)}
    ${person(250, 60, '#FF7A59')}
    <circle cx="160" cy="110" r="34" fill="#FFFFFF" stroke="${INK}" stroke-width="4"/>
    <path d="M152 72 h16" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path class="a-spin" style="transform-origin: 160px 110px" d="M160 110 V86" stroke="#FF7A59" stroke-width="4" stroke-linecap="round"/>
    <text x="160" y="168" text-anchor="middle" ${T} font-size="16" fill="${INK}">${l === 'sk' ? '0,1 s' : '0.1 s'}</text>
    <g class="a-pop" style="animation-delay: 0.6s; transform-box: fill-box; transform-origin: center">
      <circle cx="250" cy="22" r="16" fill="#E0F4E8" stroke="#1F8A4C" stroke-width="2"/>
      <path d="M243 22 l5 5 l9 -10" fill="none" stroke="#1F8A4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`;

  const VOICE = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk'
    ? 'Dve krivky výšky hlasu. Oznámenie, ktorého melódia na konci klesá, znie isto. Oznámenie, ktorého melódia na konci stúpa, znie ako otázka.'
    : 'Two pitch lines. A statement whose pitch falls at the end sounds sure. A statement whose pitch rises at the end sounds like a question.'}">
    <text x="16" y="34" ${T} font-size="13" fill="#1F8A4C">${l === 'sk' ? 'Klesajúca: znie isto' : 'Falling: sounds sure'}</text>
    <path d="M16 70 C 60 50, 100 80, 150 62 S 240 70, 300 92" fill="none" stroke="#1F8A4C" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 6" class="a-flow"/>
    <path d="M292 82 L302 94 L288 98" fill="none" stroke="#1F8A4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="16" y="128" ${T} font-size="13" fill="#C2412A">${l === 'sk' ? 'Stúpajúca: znie ako otázka?' : 'Rising: sounds like a question?'}</text>
    <path d="M16 176 C 60 160, 100 184, 150 168 S 240 170, 300 138" fill="none" stroke="#C2412A" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 6" class="a-flow"/>
    <path d="M288 136 L302 136 L298 150" fill="none" stroke="#C2412A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const SPEAK = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk'
    ? 'Časová os porady od 0 do 60 minút. V prvých piatich minútach vyskočí bublina reči, označená ako najľahší čas ozvať sa.'
    : 'A meeting timeline from 0 to 60 minutes. A speech bubble pops up in the first five minutes, marked as the easiest time to speak.'}">
    <path d="M30 150 H290" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <rect x="30" y="140" width="34" height="20" rx="4" fill="#1F8A4C" opacity="0.25"/>
    <g ${T} font-size="12" fill="#4A4566" text-anchor="middle"><text x="30" y="182">0</text><text x="64" y="182">5</text><text x="160" y="182">30</text><text x="290" y="182">60 min</text></g>
    <g class="a-say1">
      <path d="M30 60 h120 a12 12 0 0 1 12 12 v24 a12 12 0 0 1 -12 12 h-90 l-14 22 l-2 -22 h-14 a12 12 0 0 1 -12 -12 v-24 a12 12 0 0 1 12 -12 z" fill="${BLUE}"/>
      <text x="90" y="91" text-anchor="middle" ${T} font-size="14" fill="#FFFFFF">${l === 'sk' ? 'Môžem niečo dodať?' : 'Can I add one thing?'}</text>
    </g>
    <text x="236" y="96" text-anchor="middle" ${T} font-size="12" fill="#C2412A">${l === 'sk' ? 'čím dlhšie čakáš, tým ťažšie' : 'harder the longer you wait'}</text>
    <path d="M190 136 Q 240 132 280 112" fill="none" stroke="#C2412A" stroke-width="3" stroke-linecap="round"/>
  </svg>`;

  const STORY = (l) => {
    const w = l === 'sk'
      ? ['Situácia', 'Problém', 'Akcia', 'Výsledok']
      : ['Situation', 'Challenge', 'Action', 'Result'];
    return `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk'
    ? 'Oblúk príbehu. Začína rovno pri situácii, cez problém stúpa k vrcholu a potom klesá k výsledku.'
    : 'A story arc. It starts flat at the situation, climbs through the challenge to a peak, then comes down to the result.'}">
    <path class="ap-curve" pathLength="100" d="M20 160 C 70 160, 90 150, 120 120 S 180 40, 210 40 S 260 120, 300 140" fill="none" stroke="${BLUE}" stroke-width="5" stroke-linecap="round"/>
    <g ${T} font-size="12" text-anchor="middle">
      <g class="ap-note" style="--d: 0.3s"><circle cx="40" cy="160" r="7" fill="#FF7A59"/><text x="44" y="186" fill="${INK}">${w[0]}</text></g>
      <g class="ap-note" style="--d: 1s"><circle cx="128" cy="112" r="7" fill="#FF7A59"/><text x="110" y="100" fill="${INK}">${w[1]}</text></g>
      <g class="ap-note" style="--d: 1.6s"><circle cx="210" cy="40" r="7" fill="#FF7A59"/><text x="210" y="26" fill="${INK}">${w[2]}</text></g>
      <g class="ap-note" style="--d: 2.2s"><circle cx="296" cy="139" r="7" fill="#FF7A59"/><text x="280" y="170" fill="${INK}">${w[3]}</text></g>
    </g>
  </svg>`;
  };

  const BODY = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk'
    ? 'Dvaja ľudia vedľa seba. Vľavo so skríženými rukami: pôsobí uzavreto. Vpravo s otvorenými rukami a viditeľnými dlaňami: pôsobí otvorene.'
    : 'Two people side by side. On the left, arms crossed: reads as closed. On the right, arms open with palms visible: reads as open.'}">
    ${person(90, 40, '#8C87A8', 'closed')}
    ${person(230, 40, BLUE, 'open')}
    <text x="90" y="160" text-anchor="middle" ${T} font-size="14" fill="#C2412A">${l === 'sk' ? 'Uzavretý' : 'Closed'}</text>
    <text x="230" y="160" text-anchor="middle" ${T} font-size="14" fill="#1F8A4C">${l === 'sk' ? 'Otvorený' : 'Open'}</text>
    <text x="90" y="180" text-anchor="middle" ${T} font-size="11" fill="#4A4566">${l === 'sk' ? 'pôsobí obranne' : 'reads as defensive'}</text>
    <text x="230" y="180" text-anchor="middle" ${T} font-size="11" fill="#4A4566">${l === 'sk' ? 'pôsobí prístupne' : 'reads as approachable'}</text>
  </svg>`;

  const LISTEN = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk'
    ? 'Jeden človek rozpráva, druhý počúva a potom odpovie zhrnutím: Takže ide hlavne o čas?'
    : 'One person talks while the other listens, then the listener replies with a summary: So the main issue is the deadline?'}">
    ${person(70, 76, '#FF7A59')}
    ${person(250, 76, BLUE)}
    <g class="a-say1">
      <rect x="20" y="12" width="140" height="40" rx="14" fill="#FFE9E2"/>
      <text x="90" y="37" text-anchor="middle" ${T} font-size="12" fill="#9A3A1F">${l === 'sk' ? '…a potom posunuli termín' : '…and then the deadline moved'}</text>
    </g>
    <g class="a-say2">
      <rect x="160" y="12" width="150" height="40" rx="14" fill="#E1F3FA"/>
      <text x="235" y="37" text-anchor="middle" ${T} font-size="12" fill="#00668A">${l === 'sk' ? 'Takže ide hlavne o čas?' : 'So the main issue is time?'}</text>
    </g>
  </svg>`;

  const art = (fn) => ({ en: fn('en'), sk: fn('sk') });
  const en = (text, note) => ({ es: text, en: note, lang: 'en-US' });
  // Slovak version of a spoken example: Slovak phrase, Slovak note, Slovak voice.
  const sk = (text, note) => ({ es: text, en: note, lang: 'sk-SK' });

  window.Octavo.addCourse({
    id: 'communication',
    subject: 'Communication',
    audience: 'adult',
    lecturer: 'mara',
    title: { en: 'Communicate with confidence', sk: 'Komunikuj s istotou' },
    blurb: {
      en: 'Make great first impressions, speak up, tell stories and handle tough conversations.',
      sk: 'Urob skvelý prvý dojem, ozvi sa, rozprávaj príbehy a zvládni ťažké rozhovory.',
    },
    artBg: '#F1F9FC',
    units: [
      {
        title: { en: 'Make a strong start', sk: 'Silný začiatok' },
        lessons: [
          {
            id: 'comm-first-impression',
            title: { en: 'First impression hacks', sk: 'Triky na prvý dojem' },
            minutes: 15,
            slides: [
              {
                title: { en: 'A tenth of a second', sk: 'Desatina sekundy' },
                art: art(FIRST),
                text: {
                  en: '<p>People start judging whether you seem trustworthy and capable within about <b>a tenth of a second</b> of seeing your face. More time mostly makes them more sure of that first guess.</p><p>You can’t skip the snap judgement, but you can shape it.</p>',
                  sk: '<p>Ľudia začnú posudzovať, či pôsobíš dôveryhodne a schopne, približne do <b>desatiny sekundy</b> od chvíle, keď ti uvidia tvár. Viac času ich väčšinou len utvrdí v tom prvom odhade.</p><p>Bleskovému úsudku sa nevyhneš, ale môžeš ho ovplyvniť.</p>',
                },
              },
              {
                title: { en: 'Warmth first, then competence', sk: 'Najprv vľúdnosť, potom schopnosti' },
                text: {
                  en: '<p>When we meet someone, we quietly ask two questions: <b>Are they friendly?</b> and <b>Are they capable?</b></p><p>Warmth is judged first and counts for more. Lead with warmth (a smile, their name, real interest), then let your competence show.</p>',
                  sk: '<p>Keď niekoho stretneme, potichu si kladieme dve otázky: <b>Je priateľský?</b> a <b>Je schopný?</b></p><p>Vľúdnosť posudzujeme ako prvú a váži viac. Začni vľúdnosťou (úsmev, jeho meno, skutočný záujem) a až potom ukáž, čo vieš.</p>',
                },
              },
              {
                title: { en: 'The first few seconds', sk: 'Prvých pár sekúnd' },
                points: {
                  en: [
                    'Arrive a little early, so you aren’t rushed and flustered.',
                    'Make eye contact and smile <b>as</b> you say hello, not after.',
                    'Say your name clearly, and use theirs.',
                    'Stand or sit tall with your hands visible.',
                  ],
                  sk: [
                    'Príď o chvíľu skôr, nech ťa nič nenaháňa a nestresuje.',
                    'Pozri sa do očí a usmej sa <b>už pri</b> pozdrave, nie až po ňom.',
                    'Povedz jasne svoje meno a používaj to jeho.',
                    'Stoj alebo seď vzpriamene a ruky maj na očiach.',
                  ],
                },
              },
              {
                title: { en: 'The name trick', sk: 'Trik s menom' },
                text: {
                  en: '<p>Forgetting a name is the fastest way to undo a good start. Try this:</p>',
                  sk: '<p>Zabudnúť meno je najrýchlejší spôsob, ako pokaziť dobrý začiatok. Skús toto:</p>',
                },
                points: {
                  en: [
                    'Repeat it as you greet them: “Nice to meet you, <b>Ana</b>.”',
                    'Link it to something: Ana from Accounting.',
                    'Use it once more when you say goodbye.',
                  ],
                  sk: [
                    'Zopakuj ho pri pozdrave: „Teší ma, <b>Ana</b>.“',
                    'Spoj ho s niečím: Ana z účtovníctva.',
                    'Použi ho ešte raz pri lúčení.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'Which quality do people judge first when they meet you?', sk: 'Ktorú vlastnosť ľudia posudzujú ako prvú, keď ťa stretnú?' },
                options: { en: ['Warmth', 'Competence', 'Status', 'Intelligence'], sk: ['Vľúdnosť', 'Schopnosti', 'Postavenie', 'Inteligenciu'] },
                answer: { en: 'Warmth', sk: 'Vľúdnosť' },
                explain: { en: '<b>Warmth</b> is judged first and weighs the most. Competence comes second.', sk: '<b>Vľúdnosť</b> sa posudzuje ako prvá a váži najviac. Schopnosti prídu na rad až potom.' },
                hint: { en: 'think “are they friendly?” before “are they capable?”.', sk: 'najprv „je priateľský?“, až potom „je schopný?“.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'If people look at your face for longer, their first impression usually changes completely.', sk: 'Keď sa ti ľudia pozerajú do tváre dlhšie, ich prvý dojem sa zvyčajne úplne zmení.' },
                answer: false,
                explain: { en: '<b>False.</b> Extra time mostly makes people more confident in the snap judgement they already made.', sk: '<b>Nepravda.</b> Viac času ľudí väčšinou len utvrdí v bleskovom úsudku, ktorý si už urobili.' },
                hint: { en: 'remember what more time does to the first guess.', sk: 'spomeň si, čo urobí viac času s prvým odhadom.' } },
              { type: 'order',
                prompt: { en: 'Put the name trick in order.', sk: 'Zoraď kroky triku s menom.' },
                items: { en: ['Hear their name', 'Repeat it as you greet them', 'Link it to something', 'Use it again when you say goodbye'], sk: ['Počuješ meno', 'Zopakuješ ho pri pozdrave', 'Spojíš ho s niečím', 'Použiješ ho znova pri lúčení'] },
                explain: { en: 'Hear it, repeat it, link it, then use it again at the end.', sk: 'Počuť, zopakovať, spojiť a na konci znova použiť.' },
                hint: { en: 'it starts with hearing the name and ends with goodbye.', sk: 'začína sa tým, že meno počuješ, a končí sa lúčením.' } },
              { type: 'choice',
                prompt: { en: 'When should you smile and make eye contact?', sk: 'Kedy sa máš usmiať a pozrieť do očí?' },
                options: { en: ['As you say hello', 'After you’ve finished talking', 'Only if they smile first', 'When you leave'], sk: ['Už pri pozdrave', 'Keď dohovoríš', 'Len ak sa ten druhý usmeje prvý', 'Pri odchode'] },
                answer: { en: 'As you say hello', sk: 'Už pri pozdrave' },
                explain: { en: 'Smile and make eye contact <b>as you say hello</b>, so the warmth lands in the first seconds.', sk: 'Usmej sa a pozri do očí <b>už pri pozdrave</b>, aby vľúdnosť zapôsobila hneď v prvých sekundách.' },
                hint: { en: 'the first few seconds matter most.', sk: 'najviac záleží na prvých pár sekundách.' } },
            ],
          },
          {
            id: 'comm-voice',
            title: { en: 'Build trust with your voice', sk: 'Buduj dôveru hlasom' },
            minutes: 11,
            slides: [
              {
                title: { en: 'How it ends matters', sk: 'Záleží na konci vety' },
                art: art(VOICE),
                text: {
                  en: '<p>Listeners judge how sure you are from <b>how</b> you sound. When pitch <b>rises</b> at the end of a statement, it sounds like a question. Let your statements <b>fall</b> at the end.</p>',
                  sk: '<p>Poslucháči odhadujú, ako si si istý, podľa toho, <b>ako</b> znieš. Keď melódia na konci oznamovacej vety <b>stúpa</b>, znie to ako otázka. Nechaj hlas na konci vety <b>klesnúť</b>.</p>',
                },
              },
              {
                title: { en: 'Hear the difference', sk: 'Počuj ten rozdiel' },
                phrases: {
                  en: [
                    en('I think we could maybe launch on Friday?', 'Hedged and rising: sounds unsure'),
                    en('We can launch on Friday.', 'Direct and falling: sounds sure'),
                  ],
                  sk: [
                    sk('Myslím, že by sme to možno mohli spustiť v piatok?', 'Opatrne a so stúpajúcou melódiou: znie neisto'),
                    sk('V piatok to spustíme.', 'Priamo a s klesajúcou melódiou: znie isto'),
                  ],
                },
                text: {
                  en: '<p>Tap the speaker to hear each line. The second one says the same thing with half the words and twice the trust.</p>',
                  sk: '<p>Ťukni na reproduktor a vypočuj si obe vety. Druhá hovorí to isté polovicou slov a s dvojnásobnou dôverou.</p>',
                },
              },
              {
                title: { en: 'Pace and pause', sk: 'Tempo a pauza' },
                text: {
                  en: '<p>Nerves speed us up. Slow down a little, and use a <b>one-second pause</b> before your key point: it grabs attention and makes you sound certain.</p><p>When you feel an “um” coming, pause instead. Silence sounds more confident than filler.</p>',
                  sk: '<p>Nervozita nás zrýchľuje. Trochu spomaľ a pred hlavnou myšlienkou urob <b>sekundovú pauzu</b>: pritiahne pozornosť a znieš vďaka nej isto.</p><p>Keď cítiš, že sa blíži „ehm“, radšej sa odmlč. Ticho znie sebavedomejšie ako vatové slová.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: {
                  en: [
                    'End statements with falling pitch.',
                    'Cut hedges like “maybe” and “I just think”.',
                    'Slow down and pause before key points.',
                    'Replace “um” with a short silence.',
                  ],
                  sk: [
                    'Na konci oznamovacej vety nechaj hlas klesnúť.',
                    'Vynechaj zmierňovače ako „možno“ a „ja si len myslím“.',
                    'Spomaľ a pred hlavnými myšlienkami sa odmlč.',
                    'Namiesto „ehm“ urob krátku pauzu.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'Which pitch at the end of a statement sounds most confident?', sk: 'Aká melódia na konci oznamovacej vety znie najsebavedomejšie?' },
                options: { en: ['Falling', 'Rising', 'Whispering', 'Speeding up'], sk: ['Klesajúca', 'Stúpajúca', 'Šepot', 'Zrýchľovanie'] },
                answer: { en: 'Falling', sk: 'Klesajúca' },
                explain: { en: '<b>Falling</b> pitch marks a statement. Rising pitch makes it sound like a question.', sk: '<b>Klesajúca</b> melódia označuje oznámenie. Stúpajúca melódia z neho robí otázku.' },
                hint: { en: 'which line sounded sure?', sk: 'ktorá veta znela isto?' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'A short pause before a key point makes you sound less sure.', sk: 'Krátka pauza pred hlavnou myšlienkou spôsobí, že znieš menej isto.' },
                answer: false,
                explain: { en: '<b>False.</b> A pause grabs attention and makes you sound certain.', sk: '<b>Nepravda.</b> Pauza pritiahne pozornosť a znieš vďaka nej isto.' },
                hint: { en: 'think about what silence does to a key point.', sk: 'zamysli sa, čo urobí ticho s hlavnou myšlienkou.' } },
              { type: 'choice',
                prompt: { en: 'Which version builds the most trust?', sk: 'Ktorá verzia buduje najväčšiu dôveru?' },
                options: {
                  en: ['We can launch on Friday.', 'I mean, we could maybe launch Friday?', 'Um, so, like, Friday?', 'Friday, I guess, if that’s okay?'],
                  sk: ['V piatok to spustíme.', 'Teda, možno by sme to mohli spustiť v piatok?', 'Ehm, takže, akože, piatok?', 'Asi v piatok, ak to nevadí?'],
                },
                answer: { en: 'We can launch on Friday.', sk: 'V piatok to spustíme.' },
                explain: { en: '<b>“We can launch on Friday.”</b> is direct, with no hedges or filler.', sk: '<b>„V piatok to spustíme.“</b> je priame, bez zmierňovačov a vaty.' },
                hint: { en: 'pick the one with no hedges at all.', sk: 'vyber tú bez akýchkoľvek zmierňovačov.' } },
              { type: 'choice',
                prompt: { en: 'What should you use instead of filler words like “um”?', sk: 'Čo použiť namiesto vatových slov ako „ehm“?' },
                options: { en: ['A short silence', 'A cough', 'The word “basically”', 'Talking faster'], sk: ['Krátku pauzu', 'Zakašľanie', 'Slovo „v podstate“', 'Rýchlejšie rozprávanie'] },
                answer: { en: 'A short silence', sk: 'Krátku pauzu' },
                explain: { en: 'A <b>short silence</b> sounds calm and confident.', sk: '<b>Krátka pauza</b> znie pokojne a sebavedomo.' },
                hint: { en: 'the answer is saying nothing at all.', sk: 'odpoveďou je nepovedať vôbec nič.' } },
            ],
          },
          {
            id: 'comm-confidence',
            title: { en: 'Confidence wins', sk: 'Sebavedomie vyhráva' },
            minutes: 10,
            slides: [
              {
                title: { en: 'Confidence is a skill', sk: 'Sebavedomie je zručnosť' },
                text: {
                  en: '<p>Confidence isn’t a personality type you’re born with. It grows each time you do something a little outside your comfort zone and find you can handle it.</p><p>Do the thing, survive it, repeat. Confidence follows.</p>',
                  sk: '<p>Sebavedomie nie je povahová črta, s ktorou sa narodíš. Rastie zakaždým, keď urobíš niečo trochu mimo svojej komfortnej zóny a zistíš, že to zvládneš.</p><p>Urob to, prežiješ to, zopakuj. Sebavedomie príde samo.</p>',
                },
              },
              {
                title: { en: 'Call it excitement', sk: 'Nazvi to tešením' },
                text: {
                  en: '<p>A racing heart and butterflies feel the same whether you’re nervous or excited. Trying to “calm down” rarely works.</p><p>Telling yourself <b>“I’m excited”</b> instead has been shown to help people perform better in talks and tests.</p>',
                  sk: '<p>Búšiace srdce a motýle v bruchu sa cítia rovnako, či už máš trému, alebo sa na niečo tešíš. Snaha „upokojiť sa“ funguje málokedy.</p><p>Ak si namiesto toho povieš <b>„Teším sa na to“</b>, podľa výskumov podáš lepší výkon pri prezentácii aj na skúške.</p>',
                },
              },
              {
                title: { en: 'Drop the shrinking words', sk: 'Zbav sa zmenšujúcich slov' },
                phrases: {
                  en: [
                    en('Quick question:', 'Instead of “Sorry, this might be a dumb question, but…”'),
                    en('I recommend we test it first.', 'Instead of “I just maybe think we could…”'),
                    en('What questions do you have?', 'Instead of “Does that make sense?”'),
                  ],
                  sk: [
                    sk('Rýchla otázka:', 'Namiesto „Prepáčte, možno je to hlúpa otázka, ale…“'),
                    sk('Odporúčam to najprv otestovať.', 'Namiesto „Ja si len tak možno myslím, že by sme mohli…“'),
                    sk('Aké máte otázky?', 'Namiesto „Dáva to vôbec zmysel?“'),
                  ],
                },
              },
              {
                title: { en: 'Prepare to feel ready', sk: 'Príprava dodá istotu' },
                points: {
                  en: [
                    'Know your first sentence by heart.',
                    'Rehearse out loud, not just in your head.',
                    'Picture the first minute going well.',
                    'Focus on helping your audience, not on how you look.',
                  ],
                  sk: [
                    'Prvú vetu ovládaj naspamäť.',
                    'Nacvičuj nahlas, nielen v duchu.',
                    'Predstav si, ako prvá minúta dopadne dobre.',
                    'Sústreď sa na to, ako pomôcť publiku, nie na to, ako vyzeráš.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'Your heart is racing before a big talk. What helps most?', sk: 'Pred dôležitou prezentáciou ti búši srdce. Čo pomôže najviac?' },
                options: {
                  en: ['Tell yourself “I’m excited”', 'Tell yourself to calm down', 'Skip rehearsing', 'Apologise to the audience first'],
                  sk: ['Povedať si „Teším sa na to“', 'Prikázať si upokojiť sa', 'Vynechať nácvik', 'Najprv sa publiku ospravedlniť'],
                },
                answer: { en: 'Tell yourself “I’m excited”', sk: 'Povedať si „Teším sa na to“' },
                explain: { en: 'Reframing nerves as <b>excitement</b> helps people perform better than trying to calm down.', sk: 'Keď trému vnímaš ako <b>tešenie sa</b>, podáš lepší výkon, ako keď sa snažíš upokojiť.' },
                hint: { en: 'nerves and excitement feel the same in your body.', sk: 'tréma a tešenie sa sa v tele cítia rovnako.' } },
              { type: 'choice',
                prompt: { en: 'Which opener sounds most confident?', sk: 'Ktorý úvod znie najsebavedomejšie?' },
                options: {
                  en: ['I recommend we test it first.', 'Sorry, this is probably dumb, but…', 'I just maybe think…', 'I’m not an expert, but…'],
                  sk: ['Odporúčam to najprv otestovať.', 'Prepáčte, asi je to hlúposť, ale…', 'Ja si len tak možno myslím…', 'Nie som na to expert, ale…'],
                },
                answer: { en: 'I recommend we test it first.', sk: 'Odporúčam to najprv otestovať.' },
                explain: { en: '<b>“I recommend…”</b> states your view without shrinking it.', sk: '<b>„Odporúčam…“</b> vyjadrí tvoj názor a nijako ho nezmenšuje.' },
                hint: { en: 'avoid apologies and “just”.', sk: 'vyhni sa ospravedlňovaniu a slovku „len“.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Confidence is a fixed trait: you either have it or you don’t.', sk: 'Sebavedomie je pevná vlastnosť: buď ho máš, alebo nie.' },
                answer: false,
                explain: { en: '<b>False.</b> Confidence is a skill that grows with practice.', sk: '<b>Nepravda.</b> Sebavedomie je zručnosť, ktorá rastie cvičením.' },
                hint: { en: 'look at the first slide’s title.', sk: 'pozri sa na nadpis prvej snímky.' } },
              { type: 'order',
                prompt: { en: 'Put the preparation steps in order.', sk: 'Zoraď kroky prípravy.' },
                items: {
                  en: ['Write your key message', 'Learn your first sentence by heart', 'Rehearse out loud', 'Deliver it'],
                  sk: ['Napíš si hlavnú myšlienku', 'Nauč sa prvú vetu naspamäť', 'Nacvič to nahlas', 'Predveď to'],
                },
                explain: { en: 'Decide the message, nail the opening, rehearse out loud, then deliver.', sk: 'Ujasni si myšlienku, vyladi úvod, nacvič nahlas a potom vystúp.' },
                hint: { en: 'you can’t learn the first sentence before you know the message.', sk: 'prvú vetu sa nenaučíš skôr, ako vieš, čo chceš povedať.' } },
            ],
          },
          {
            id: 'comm-speak-up',
            title: { en: 'Speak up in any room', sk: 'Ozvi sa kdekoľvek' },
            minutes: 10,
            slides: [
              {
                title: { en: 'Speak early', sk: 'Ozvi sa včas' },
                art: art(SPEAK),
                text: {
                  en: '<p>The longer you stay quiet, the harder it gets to start. Aim to say something in the <b>first five minutes</b>: a question, or building on someone else’s point. After that, speaking again feels easy.</p>',
                  sk: '<p>Čím dlhšie mlčíš, tým ťažšie sa začína. Snaž sa niečo povedať počas <b>prvých piatich minút</b>: otázku alebo nadviazať na niekoho iného. Potom už ďalšie slovo príde ľahko.</p>',
                },
              },
              {
                title: { en: 'Easy ways in', sk: 'Ľahké spôsoby, ako sa zapojiť' },
                phrases: {
                  en: [
                    en('Building on what Sam said…', 'Connects your idea to the conversation'),
                    en('Can I add one thing?', 'A polite way to take the floor'),
                    en('One question before we move on:', 'Gets in before the topic closes'),
                  ],
                  sk: [
                    sk('Nadviažem na to, čo povedal Samo…', 'Prepojí tvoj nápad s rozhovorom'),
                    sk('Môžem k tomu niečo dodať?', 'Zdvorilý spôsob, ako si vziať slovo'),
                    sk('Ešte jedna otázka, kým pôjdeme ďalej:', 'Stihneš to, kým sa téma uzavrie'),
                  ],
                },
              },
              {
                title: { en: 'Make your point land: PREP', sk: 'Nech tvoja myšlienka zaberie: PREP' },
                points: {
                  en: [
                    '<b>Point:</b> say your idea in one sentence.',
                    '<b>Reason:</b> why it matters.',
                    '<b>Example:</b> one concrete case or number.',
                    '<b>Point:</b> repeat your idea to close.',
                  ],
                  sk: [
                    '<b>Point – myšlienka:</b> povedz svoj nápad jednou vetou.',
                    '<b>Reason – dôvod:</b> prečo je dôležitý.',
                    '<b>Example – príklad:</b> jeden konkrétny prípad alebo číslo.',
                    '<b>Point – myšlienka:</b> na záver svoj nápad zopakuj.',
                  ],
                },
              },
              {
                title: { en: 'If someone talks over you', sk: 'Keď ti niekto skáče do reči' },
                text: {
                  en: '<p>Stay calm and keep your volume steady. Say <b>“I’d like to finish my thought”</b>, then finish it. Most people stop, and everyone notices you held your ground politely.</p>',
                  sk: '<p>Zostaň pokojný a nemeň hlasitosť. Povedz <b>„Ešte dokončím svoju myšlienku“</b> a dokonči ju. Väčšina ľudí prestane a všetci si všimnú, že zdvorilo, no pevne trváš na svojom.</p>',
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'What does PREP stand for?', sk: 'Čo znamená PREP?' },
                options: {
                  en: ['Point, Reason, Example, Point', 'Plan, Rehearse, Explain, Present', 'Pause, Reflect, Engage, Proceed', 'Prepare, Repeat, Explain, Pitch'],
                  sk: ['Myšlienka, dôvod, príklad, myšlienka', 'Plán, nácvik, vysvetlenie, prezentácia', 'Pauza, úvaha, zapojenie, pokračovanie', 'Príprava, opakovanie, vysvetlenie, ponuka'],
                },
                answer: { en: 'Point, Reason, Example, Point', sk: 'Myšlienka, dôvod, príklad, myšlienka' },
                explain: { en: '<b>Point, Reason, Example, Point.</b> Start and finish with your idea.', sk: '<b>Myšlienka, dôvod, príklad, myšlienka.</b> Začni aj skonči svojím nápadom.' },
                hint: { en: 'it starts and ends with the same word.', sk: 'začína aj končí rovnakým slovom.' } },
              { type: 'order',
                prompt: { en: 'Put a PREP answer in order.', sk: 'Zoraď odpoveď podľa PREP.' },
                items: { en: ['Point', 'Reason', 'Example', 'Point again'], sk: ['Myšlienka', 'Dôvod', 'Príklad', 'Znova myšlienka'] },
                explain: { en: 'Point, reason, example, then the point again.', sk: 'Myšlienka, dôvod, príklad a potom znova myšlienka.' },
                hint: { en: 'the reason comes before the example.', sk: 'dôvod ide pred príkladom.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Waiting until the end of a meeting usually makes it easier to speak up.', sk: 'Keď počkáš do konca porady, zvyčajne sa ti ozve ľahšie.' },
                answer: false,
                explain: { en: '<b>False.</b> It gets harder the longer you wait. Speak in the first five minutes.', sk: '<b>Nepravda.</b> Čím dlhšie čakáš, tým je to ťažšie. Ozvi sa v prvých piatich minútach.' },
                hint: { en: 'look at the meeting timeline again.', sk: 'pozri sa znova na časovú os porady.' } },
              { type: 'choice',
                prompt: { en: 'Someone talks over you mid-point. What’s the best response?', sk: 'Niekto ti skočí do reči uprostred myšlienky. Ako najlepšie zareagovať?' },
                options: {
                  en: ['“I’d like to finish my thought.”', 'Stop and stay quiet', 'Talk louder over them', 'Leave the meeting'],
                  sk: ['„Ešte dokončím svoju myšlienku.“', 'Prestať a mlčať', 'Prekričať ho', 'Odísť z porady'],
                },
                answer: { en: '“I’d like to finish my thought.”', sk: '„Ešte dokončím svoju myšlienku.“' },
                explain: { en: 'Calmly say <b>“I’d like to finish my thought”</b> and carry on.', sk: 'Pokojne povedz <b>„Ešte dokončím svoju myšlienku“</b> a pokračuj.' },
                hint: { en: 'stay calm, polite and firm.', sk: 'zostaň pokojný, zdvorilý a pevný.' } },
            ],
          },
        ],
      },
      {
        title: { en: 'Connect and persuade', sk: 'Získaj si ľudí a presvedč ich' },
        lessons: [
          {
            id: 'comm-storytelling',
            title: { en: 'Storytelling secrets', sk: 'Tajomstvá rozprávania príbehov' },
            minutes: 13,
            slides: [
              {
                title: { en: 'Stories stick', sk: 'Príbehy sa pamätajú' },
                art: art(STORY),
                replay: { en: 'Replay', sk: 'Prehrať znova' },
                autoplay: true,
                text: {
                  en: '<p>People forget lists of facts but remember stories, because stories give facts a reason to matter. Most good stories follow the same shape.</p>',
                  sk: '<p>Zoznamy faktov ľudia zabúdajú, ale príbehy si pamätajú, lebo príbeh dáva faktom dôvod, prečo na nich záleží. Väčšina dobrých príbehov má rovnaký tvar.</p>',
                },
              },
              {
                title: { en: 'The story shape', sk: 'Tvar príbehu' },
                points: {
                  en: [
                    '<b>Situation:</b> where, when and who.',
                    '<b>Challenge:</b> what went wrong or what was at stake.',
                    '<b>Action:</b> what you (or the hero) did.',
                    '<b>Result:</b> what changed, and what you learned.',
                  ],
                  sk: [
                    '<b>Situácia:</b> kde, kedy a kto.',
                    '<b>Problém:</b> čo sa pokazilo alebo o čo išlo.',
                    '<b>Akcia:</b> čo ty (alebo hrdina) urobíš.',
                    '<b>Výsledok:</b> čo sa zmenilo a čo sa z toho dá naučiť.',
                  ],
                },
              },
              {
                title: { en: 'Start in the action', sk: 'Začni priamo v deji' },
                phrases: {
                  en: [
                    en('Two hours before launch, our server died.', 'Strong: drops us straight into the challenge'),
                    en('So, I work at a company that makes software, and…', 'Weak: background nobody asked for'),
                  ],
                  sk: [
                    sk('Dve hodiny pred spustením nám spadol server.', 'Silné: hodí nás rovno do problému'),
                    sk('Takže, pracujem vo firme, ktorá robí softvér, a…', 'Slabé: pozadie, o ktoré nikto nežiadal'),
                  ],
                },
                text: {
                  en: '<p>Skip the long warm-up. Open close to the challenge and fill in background only if it’s needed.</p>',
                  sk: '<p>Vynechaj dlhý úvod. Začni blízko problému a pozadie doplň, len ak je to potrebné.</p>',
                },
              },
              {
                title: { en: 'Make it vivid', sk: 'Rozprávaj živo' },
                points: {
                  en: [
                    'Add one specific detail people can see or hear.',
                    'Use a real line of dialogue.',
                    'Pause just before the twist.',
                    'Keep it under two minutes.',
                  ],
                  sk: [
                    'Pridaj jeden konkrétny detail, ktorý ľudia uvidia alebo počujú.',
                    'Použi skutočnú repliku z rozhovoru.',
                    'Tesne pred zvratom sa odmlč.',
                    'Zmesti sa do dvoch minút.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'order',
                prompt: { en: 'Put the story shape in order.', sk: 'Zoraď tvar príbehu.' },
                items: { en: ['Situation', 'Challenge', 'Action', 'Result'], sk: ['Situácia', 'Problém', 'Akcia', 'Výsledok'] },
                explain: { en: 'Situation, challenge, action, result.', sk: 'Situácia, problém, akcia, výsledok.' },
                hint: { en: 'the problem comes before what you did about it.', sk: 'problém prichádza skôr ako to, čo s ním urobíš.' } },
              { type: 'choice',
                prompt: { en: 'Which is the strongest opening line?', sk: 'Ktorá úvodná veta je najsilnejšia?' },
                options: {
                  en: ['Two hours before launch, our server died.', 'So, let me give you some background on our company…', 'This story isn’t very interesting, but…', 'Here are ten facts about servers.'],
                  sk: ['Dve hodiny pred spustením nám spadol server.', 'Takže, najprv vám poviem niečo o našej firme…', 'Tento príbeh nie je veľmi zaujímavý, ale…', 'Tu je desať faktov o serveroch.'],
                },
                answer: { en: 'Two hours before launch, our server died.', sk: 'Dve hodiny pred spustením nám spadol server.' },
                explain: { en: 'It starts <b>in the action</b>, right at the challenge.', sk: 'Začína <b>priamo v deji</b>, rovno pri probléme.' },
                hint: { en: 'start close to the problem.', sk: 'začni blízko problému.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'A good story usually needs a challenge or problem.', sk: 'Dobrý príbeh zvyčajne potrebuje nejakú prekážku alebo problém.' },
                answer: true,
                explain: { en: '<b>True.</b> The challenge is what makes people care how it ends.', sk: '<b>Pravda.</b> Práve vďaka problému ľudí zaujíma, ako to dopadne.' },
                hint: { en: 'look at the peak of the story arc.', sk: 'pozri sa na vrchol oblúka príbehu.' } },
              { type: 'choice',
                prompt: { en: 'Which detail makes a story most vivid?', sk: 'Ktorý detail urobí príbeh najživším?' },
                options: {
                  en: ['The coffee was still steaming when the alarm went off.', 'It was a normal day.', 'Things happened.', 'Some stuff went wrong.'],
                  sk: ['Káva sa ešte parila, keď sa rozoznel alarm.', 'Bol to obyčajný deň.', 'Dialo sa všeličo.', 'Niečo sa pokazilo.'],
                },
                answer: { en: 'The coffee was still steaming when the alarm went off.', sk: 'Káva sa ešte parila, keď sa rozoznel alarm.' },
                explain: { en: 'A <b>specific detail</b> people can picture pulls them into the scene.', sk: '<b>Konkrétny detail</b>, ktorý si ľudia vedia predstaviť, ich vtiahne do deja.' },
                hint: { en: 'pick the one you can actually picture.', sk: 'vyber ten, ktorý si naozaj vieš predstaviť.' } },
            ],
          },
          {
            id: 'comm-body-language',
            title: { en: 'Body language', sk: 'Reč tela' },
            minutes: 15,
            slides: [
              {
                title: { en: 'Open or closed?', sk: 'Otvorený, alebo uzavretý?' },
                art: art(BODY),
                text: {
                  en: '<p>Crossed arms, a body turned away or a hidden face read as defensive, even if you’re only cold. An open posture with visible hands reads as approachable.</p>',
                  sk: '<p>Prekrížené ruky, telo otočené preč alebo skrytá tvár pôsobia obranne, aj keď ti je len zima. Otvorený postoj s viditeľnými rukami pôsobí prístupne.</p>',
                },
              },
              {
                title: { en: 'The 7% myth', sk: 'Mýtus o 7 %' },
                text: {
                  en: '<p>You may have heard that words are only 7% of a message. That number came from small lab studies of <b>single words</b> said in a mismatched tone, not everyday conversation.</p><p>Your words matter a lot. Body language matters most when it <b>contradicts</b> them.</p>',
                  sk: '<p>Možno poznáš tvrdenie, že slová tvoria len 7 % správy. To číslo pochádza z malých laboratórnych štúdií <b>jednotlivých slov</b> vyslovených nesúladným tónom, nie z bežného rozhovoru.</p><p>Na tvojich slovách veľmi záleží. Reč tela je najdôležitejšia vtedy, keď im <b>odporuje</b>.</p>',
                },
              },
              {
                title: { en: 'Signals that build trust', sk: 'Signály, ktoré budujú dôveru' },
                points: {
                  en: [
                    'Hold eye contact while listening; a little less while talking is fine.',
                    'Nod to show you’re following.',
                    'Keep gestures between waist and chest, hands visible.',
                    'Point your face and feet towards the person.',
                  ],
                  sk: [
                    'Pri počúvaní udržuj očný kontakt; keď hovoríš, môže ho byť trochu menej.',
                    'Prikyvuj, aby bolo vidno, že sleduješ.',
                    'Gestikuluj medzi pásom a hrudníkom, ruky maj na očiach.',
                    'Tvár aj špičky nôh smeruj k tomu človeku.',
                  ],
                },
              },
              {
                title: { en: 'Match your message', sk: 'Nech telo hovorí to isté' },
                text: {
                  en: '<p>When body and words disagree, like “I’m fine” said with a frown and crossed arms, people believe the body. Make them tell the same story.</p>',
                  sk: '<p>Keď si telo a slová protirečia, napríklad „Som v pohode“ so zamračenou tvárou a prekríženými rukami, ľudia uveria telu. Nech obe hovoria to isté.</p>',
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'Which posture reads as most approachable?', sk: 'Ktorý postoj pôsobí najprístupnejšie?' },
                options: {
                  en: ['Open arms with visible palms', 'Arms crossed', 'Hands in pockets, body turned away', 'Looking at your phone'],
                  sk: ['Otvorené ruky s viditeľnými dlaňami', 'Prekrížené ruky', 'Ruky vo vreckách, telo otočené preč', 'Pozeranie do mobilu'],
                },
                answer: { en: 'Open arms with visible palms', sk: 'Otvorené ruky s viditeľnými dlaňami' },
                explain: { en: '<b>Open arms and visible palms</b> read as approachable.', sk: '<b>Otvorené ruky a viditeľné dlane</b> pôsobia prístupne.' },
                hint: { en: 'look at the person on the right of the picture.', sk: 'pozri sa na postavu vpravo na obrázku.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Research shows only 7% of every message comes from your words.', sk: 'Výskum ukazuje, že len 7 % každej správy tvoria tvoje slová.' },
                answer: false,
                explain: { en: '<b>False.</b> That figure came from studies of single words in a mismatched tone, not everyday conversation.', sk: '<b>Nepravda.</b> To číslo pochádza zo štúdií jednotlivých slov vyslovených nesúladným tónom, nie z bežného rozhovoru.' },
                hint: { en: 'it’s called the 7% myth for a reason.', sk: 'nie nadarmo sa tomu hovorí mýtus o 7 %.' } },
              { type: 'choice',
                prompt: { en: 'Someone says “I’m fine” with a frown and crossed arms. What do people tend to believe?', sk: 'Niekto povie „Som v pohode“ so zamračenou tvárou a prekríženými rukami. Čomu ľudia skôr uveria?' },
                options: { en: ['The body language', 'The words', 'Neither', 'Both equally'], sk: ['Reči tela', 'Slovám', 'Ničomu', 'Obom rovnako'] },
                answer: { en: 'The body language', sk: 'Reči tela' },
                explain: { en: 'When they disagree, people trust <b>the body</b> over the words.', sk: 'Keď si protirečia, ľudia veria viac <b>telu</b> ako slovám.' },
                hint: { en: 'what wins when body and words don’t match?', sk: 'čo vyhrá, keď telo a slová nesedia?' } },
              { type: 'choice',
                prompt: { en: 'Where should your gestures mostly stay?', sk: 'Kde by sa mali tvoje gestá väčšinou odohrávať?' },
                options: { en: ['Between waist and chest', 'Above your head', 'Behind your back', 'In your pockets'], sk: ['Medzi pásom a hrudníkom', 'Nad hlavou', 'Za chrbtom', 'Vo vreckách'] },
                answer: { en: 'Between waist and chest', sk: 'Medzi pásom a hrudníkom' },
                explain: { en: 'Gestures <b>between waist and chest</b> look natural and keep your hands visible.', sk: 'Gestá <b>medzi pásom a hrudníkom</b> pôsobia prirodzene a ruky máš na očiach.' },
                hint: { en: 'keep your hands where people can see them.', sk: 'maj ruky tam, kde ich ľudia vidia.' } },
            ],
          },
          {
            id: 'comm-read-people',
            title: { en: 'Read people like a pro', sk: 'Čítaj ľudí ako profík' },
            minutes: 15,
            slides: [
              {
                title: { en: 'Look for clusters', sk: 'Hľadaj zhluky signálov' },
                text: {
                  en: '<p>One signal on its own means little: crossed arms might just mean the room is cold. Look for <b>three or more signals</b> pointing the same way before you read anything into them.</p>',
                  sk: '<p>Jeden signál sám osebe znamená málo: prekrížené ruky môžu znamenať len to, že je v miestnosti zima. Kým z nich niečo vyvodíš, hľadaj <b>tri a viac signálov</b>, ktoré ukazujú rovnakým smerom.</p>',
                },
              },
              {
                title: { en: 'Know their baseline', sk: 'Poznaj jeho východiskový stav' },
                points: {
                  en: [
                    'Notice how someone acts when they’re relaxed: that’s their <b>baseline</b>.',
                    'Watch for <b>changes</b> from it when a topic comes up.',
                    'Read in context: the room, the moment, the culture.',
                    'Treat what you see as a question, not a verdict.',
                  ],
                  sk: [
                    'Všimni si, ako sa človek správa, keď je uvoľnený: to je jeho <b>východiskový stav</b>.',
                    'Sleduj, či sa od neho niečo <b>zmení</b>, keď príde reč na nejakú tému.',
                    'Čítaj v kontexte: miestnosť, chvíľa, kultúra.',
                    'Ber to, čo vidíš, ako otázku, nie ako rozsudok.',
                  ],
                },
              },
              {
                title: { en: 'Common clusters', sk: 'Bežné zhluky signálov' },
                points: {
                  en: [
                    '<b>Engaged:</b> leaning in, nodding, eyes on you, feet towards you.',
                    '<b>Disengaged:</b> leaning back, glancing away or at the door, short answers.',
                    '<b>Stressed:</b> touching the neck or face, fidgeting, tight lips.',
                  ],
                  sk: [
                    '<b>Zaujatý:</b> nakláňa sa k tebe, prikyvuje, pozerá na teba, nohy smerujú k tebe.',
                    '<b>Nezaujatý:</b> opiera sa dozadu, pozerá inam alebo na dvere, odpovedá stručne.',
                    '<b>V strese:</b> dotýka sa krku alebo tváre, vrtí sa, má stisnuté pery.',
                  ],
                },
              },
              {
                title: { en: 'Check, don’t assume', sk: 'Over si to, nedomýšľaj' },
                phrases: {
                  en: [
                    en('You seem unsure. What’s on your mind?', 'Names what you see and invites them in'),
                    en('You went quiet there. Anything you’d like to add?', 'Gives a quiet person an easy opening'),
                  ],
                  sk: [
                    sk('Vyzeráš neisto. Čo ti behá hlavou?', 'Pomenuje, čo vidíš, a pozve ho do rozhovoru'),
                    sk('Zrazu je od teba ticho. Chceš k tomu niečo dodať?', 'Dá tichšiemu človeku ľahkú príležitosť ozvať sa'),
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'What is someone’s “baseline”?', sk: 'Čo je niečí „východiskový stav“?' },
                options: {
                  en: ['How they normally act when relaxed', 'Their first impression of you', 'The lowest note of their voice', 'A rule of etiquette'],
                  sk: ['Ako sa bežne správa, keď je uvoľnený', 'Jeho prvý dojem z teba', 'Najhlbší tón jeho hlasu', 'Pravidlo etikety'],
                },
                answer: { en: 'How they normally act when relaxed', sk: 'Ako sa bežne správa, keď je uvoľnený' },
                explain: { en: 'Their <b>baseline</b> is how they act when relaxed, so you can spot changes.', sk: '<b>Východiskový stav</b> je to, ako sa správa uvoľnený: podľa neho spoznáš zmeny.' },
                hint: { en: 'it’s what you compare changes against.', sk: 'je to to, s čím porovnávaš zmeny.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Crossed arms always mean someone is defensive.', sk: 'Prekrížené ruky vždy znamenajú, že sa niekto bráni.' },
                answer: false,
                explain: { en: '<b>False.</b> One signal means little. Look for clusters and changes from their baseline.', sk: '<b>Nepravda.</b> Jeden signál znamená málo. Hľadaj zhluky signálov a zmeny oproti východiskovému stavu.' },
                hint: { en: 'they might just be cold.', sk: 'možno je mu len zima.' } },
              { type: 'choice',
                prompt: { en: 'A colleague leans back, glances at the door and gives short answers. What’s most likely?', sk: 'Kolega sa opiera dozadu, pozerá na dvere a odpovedá stručne. Čo je najpravdepodobnejšie?' },
                options: {
                  en: ['They’re disengaged', 'They’re very excited', 'They agree completely', 'They’re ready to sign'],
                  sk: ['Nezaujíma ho to', 'Je z toho nadšený', 'Úplne súhlasí', 'Je pripravený podpísať'],
                },
                answer: { en: 'They’re disengaged', sk: 'Nezaujíma ho to' },
                explain: { en: 'That cluster usually means <b>disengaged</b>. Check by asking them.', sk: 'Takýto zhluk zvyčajne znamená, že je <b>nezaujatý</b>. Over si to otázkou.' },
                hint: { en: 'three signals all pointing away from you.', sk: 'tri signály, ktoré všetky smerujú preč od teba.' } },
              { type: 'choice',
                prompt: { en: 'You think someone is unsure. What’s the best next step?', sk: 'Myslíš si, že si niekto nie je istý. Aký je najlepší ďalší krok?' },
                options: {
                  en: ['Ask an open question', 'Tell them they look nervous', 'Ignore it', 'Talk faster'],
                  sk: ['Položiť otvorenú otázku', 'Povedať mu, že vyzerá nervózne', 'Nevšímať si to', 'Hovoriť rýchlejšie'],
                },
                answer: { en: 'Ask an open question', sk: 'Položiť otvorenú otázku' },
                explain: { en: '<b>Ask</b>, for example “What’s on your mind?”, instead of assuming.', sk: 'Namiesto domnievania sa <b>sa opýtaj</b>, napríklad „Čo ti behá hlavou?“.' },
                hint: { en: 'check, don’t assume.', sk: 'over si to, nedomýšľaj.' } },
            ],
          },
        ],
      },
      {
        title: { en: 'Handle tough conversations', sk: 'Zvládni ťažké rozhovory' },
        lessons: [
          {
            id: 'comm-feedback',
            title: { en: 'Give tough feedback fast', sk: 'Daj nepríjemnú spätnú väzbu rýchlo' },
            minutes: 17,
            slides: [
              {
                title: { en: 'Use SBI', sk: 'Použi SBI' },
                points: {
                  en: [
                    '<b>Situation:</b> when and where it happened.',
                    '<b>Behaviour:</b> what they did, as a camera would see it.',
                    '<b>Impact:</b> the effect it had on you, the team or the work.',
                  ],
                  sk: [
                    '<b>Situácia (Situation):</b> kedy a kde sa to stalo.',
                    '<b>Správanie (Behaviour):</b> čo urobil, tak, ako by to zachytila kamera.',
                    '<b>Dopad (Impact):</b> aký to malo vplyv na teba, tím alebo prácu.',
                  ],
                },
                text: {
                  en: '<p>SBI keeps feedback short, specific and fair.</p>',
                  sk: '<p>Vďaka SBI je spätná väzba krátka, konkrétna a férová.</p>',
                },
              },
              {
                title: { en: 'Behaviour, not character', sk: 'Správanie, nie povaha' },
                phrases: {
                  en: [
                    en('You’re careless.', 'A label: they’ll defend themselves'),
                    en('In today’s report, three of the numbers were wrong.', 'Behaviour: specific and fixable'),
                  ],
                  sk: [
                    sk('Nedá sa na teba spoľahnúť.', 'Nálepka: bude sa brániť'),
                    sk('V dnešnej správe boli tri čísla zle.', 'Správanie: konkrétne a dá sa napraviť'),
                  ],
                },
              },
              {
                title: { en: 'Then ask, and agree', sk: 'Potom sa opýtaj a dohodnite sa' },
                text: {
                  en: '<p>After SBI, stop talking and ask for their side: <b>“What happened from your point of view?”</b></p><p>Agree on one next step and when you’ll check in.</p>',
                  sk: '<p>Po SBI prestaň hovoriť a opýtaj sa na jeho pohľad: <b>„Ako to vyzeralo z tvojej strany?“</b></p><p>Dohodnite sa na jednom ďalšom kroku a na tom, kedy sa k tomu vrátite.</p>',
                },
              },
              {
                title: { en: 'Keep it fast', sk: 'Nečakaj s tým' },
                points: {
                  en: [
                    'Give it within a day or two, while it’s fresh.',
                    'Always in private.',
                    'One issue at a time.',
                    'Skip the “compliment sandwich”: it buries the message.',
                  ],
                  sk: [
                    'Daj ju do jedného či dvoch dní, kým je to čerstvé.',
                    'Vždy medzi štyrmi očami.',
                    'Vždy len jedna vec naraz.',
                    'Vynechaj „sendvič s pochvalou“: správa sa v ňom stratí.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'order',
                prompt: { en: 'Put the feedback conversation in order.', sk: 'Zoraď rozhovor so spätnou väzbou.' },
                items: { en: ['Situation', 'Behaviour', 'Impact', 'Ask for their view'], sk: ['Situácia', 'Správanie', 'Dopad', 'Opýtať sa na jeho pohľad'] },
                explain: { en: 'Situation, behaviour, impact, then ask for their side.', sk: 'Situácia, správanie, dopad a potom sa opýtaj na jeho pohľad.' },
                hint: { en: 'SBI first, then listen.', sk: 'najprv SBI, potom počúvaj.' } },
              { type: 'choice',
                prompt: { en: 'Which describes behaviour rather than a label?', sk: 'Ktorá veta opisuje správanie, a nie nálepku?' },
                options: {
                  en: ['You arrived 20 minutes late to today’s meeting.', 'You’re lazy.', 'You don’t care about the team.', 'You’re always late.'],
                  sk: ['Dnešná porada začala o 9:00 a teba sme tam videli až o 9:20.', 'Nechce sa ti nič robiť.', 'Na tíme ti nezáleží.', 'Stále meškáš.'],
                },
                answer: { en: 'You arrived 20 minutes late to today’s meeting.', sk: 'Dnešná porada začala o 9:00 a teba sme tam videli až o 9:20.' },
                explain: { en: 'It’s specific and observable, <b>as a camera would see it</b>.', sk: 'Je konkrétna a pozorovateľná, <b>tak, ako by to zachytila kamera</b>.' },
                hint: { en: 'which one could a camera record?', sk: 'ktorú by dokázala zaznamenať kamera?' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'The compliment sandwich is the best way to make tough feedback clear.', sk: 'Sendvič s pochvalou je najlepší spôsob, ako dať jasnú nepríjemnú spätnú väzbu.' },
                answer: false,
                explain: { en: '<b>False.</b> Wrapping it in praise buries the message.', sk: '<b>Nepravda.</b> Keď ju zabalíš do pochvál, správa sa stratí.' },
                hint: { en: 'what happens to the filling?', sk: 'čo sa stane s náplňou?' } },
              { type: 'choice',
                prompt: { en: 'When and where should you give tough feedback?', sk: 'Kedy a kde dať nepríjemnú spätnú väzbu?' },
                options: {
                  en: ['Soon, in private', 'In front of the team', 'Months later, at the annual review', 'Only by email'],
                  sk: ['Čoskoro, medzi štyrmi očami', 'Pred celým tímom', 'O pár mesiacov, na ročnom hodnotení', 'Iba e-mailom'],
                },
                answer: { en: 'Soon, in private', sk: 'Čoskoro, medzi štyrmi očami' },
                explain: { en: '<b>Soon and in private</b>, while it’s fresh and without an audience.', sk: '<b>Čoskoro a medzi štyrmi očami</b>, kým je to čerstvé a bez publika.' },
                hint: { en: 'fast, and without an audience.', sk: 'rýchlo a bez publika.' } },
            ],
          },
          {
            id: 'comm-difficult-people',
            title: { en: 'Handle difficult people smartly', sk: 'Zvládni ťažkých ľudí s rozumom' },
            minutes: 13,
            slides: [
              {
                title: { en: 'Don’t take the bait', sk: 'Nenechaj sa vyprovokovať' },
                text: {
                  en: '<p>Difficult behaviour usually comes from <b>stress, fear or unmet needs</b>. Your goal isn’t to win the exchange; it’s to steer the conversation back to the problem.</p>',
                  sk: '<p>Za ťažkým správaním je zvyčajne <b>stres, strach alebo nenaplnené potreby</b>. Tvojím cieľom nie je vyhrať výmenu názorov, ale vrátiť rozhovor k problému.</p>',
                },
              },
              {
                title: { en: 'Pause, breathe, respond', sk: 'Zastav sa, nadýchni sa, odpovedz' },
                points: {
                  en: [
                    'Notice your own reaction.',
                    'Take one slow breath before you answer.',
                    'Lower your voice and slow down.',
                    'Respond to the issue, not the tone.',
                  ],
                  sk: [
                    'Všimni si vlastnú reakciu.',
                    'Pred odpoveďou sa raz pomaly nadýchni.',
                    'Stíš hlas a spomaľ.',
                    'Reaguj na vec, nie na tón.',
                  ],
                },
              },
              {
                title: { en: 'Lines that calm things down', sk: 'Vety, ktoré upokoja situáciu' },
                phrases: {
                  en: [
                    en('I want to sort this out. Can you walk me through what happened?', 'Shifts from blame to facts'),
                    en('I can hear you’re frustrated. Let’s look at what we can do.', 'Acknowledges the feeling, then moves on'),
                  ],
                  sk: [
                    sk('Chcem to vyriešiť. Môžeš mi povedať, čo sa presne stalo?', 'Presunie rozhovor od obviňovania k faktom'),
                    sk('Chápem, že ťa to frustruje. Poďme sa pozrieť, čo s tým urobíme.', 'Uzná pocit a potom sa pohne ďalej'),
                  ],
                },
              },
              {
                title: { en: 'Set a boundary', sk: 'Stanov hranicu' },
                text: {
                  en: '<p>If someone becomes abusive, you can stop. Name the behaviour, say what you’ll do, and follow through:</p><p><b>“If the shouting continues, I’ll end the call and we can pick this up tomorrow.”</b></p>',
                  sk: '<p>Ak sa niekto začne správať urážlivo, môžeš rozhovor zastaviť. Pomenuj správanie, povedz, čo urobíš, a dodrž to:</p><p><b>„Ak bude krik pokračovať, hovor ukončím a vrátime sa k tomu zajtra.“</b></p>',
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'Someone snaps at you in a meeting. What’s your first move?', sk: 'Niekto na teba na porade vyštekne. Aký je tvoj prvý krok?' },
                options: {
                  en: ['Pause and take a breath', 'Snap back', 'Walk out without a word', 'Complain to everyone afterwards'],
                  sk: ['Zastaviť sa a nadýchnuť', 'Vyšteknúť naspäť', 'Bez slova odísť', 'Potom sa všetkým sťažovať'],
                },
                answer: { en: 'Pause and take a breath', sk: 'Zastaviť sa a nadýchnuť' },
                explain: { en: '<b>Pause and breathe</b> first, so you respond instead of react.', sk: 'Najprv <b>sa zastav a nadýchni</b>, aby tvoja odpoveď bola rozvážna, a nie zbrklá.' },
                hint: { en: 'the first step is about you, not them.', sk: 'prvý krok je o tebe, nie o ňom.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Difficult behaviour often comes from stress, fear or unmet needs.', sk: 'Za ťažkým správaním je často stres, strach alebo nenaplnené potreby.' },
                answer: true,
                explain: { en: '<b>True.</b> Knowing that makes it easier not to take it personally.', sk: '<b>Pravda.</b> Keď to vieš, ľahšie si to neberieš osobne.' },
                hint: { en: 'look at the first slide.', sk: 'pozri sa na prvú snímku.' } },
              { type: 'choice',
                prompt: { en: 'Which is the best boundary?', sk: 'Ktorá hranica je najlepšia?' },
                options: {
                  en: ['“If the shouting continues, I’ll end the call.”', '“You’re impossible!”', 'Say nothing and put up with it', '“Whatever.”'],
                  sk: ['„Ak bude krik pokračovať, hovor ukončím.“', '„S tebou sa nedá!“', 'Mlčať a znášať to', '„Hm, je mi to jedno.“'],
                },
                answer: { en: '“If the shouting continues, I’ll end the call.”', sk: '„Ak bude krik pokračovať, hovor ukončím.“' },
                explain: { en: 'It names the behaviour and says what <b>you</b> will do.', sk: 'Pomenuje správanie a povie, čo urobíš <b>ty</b>.' },
                hint: { en: 'name the behaviour and your action.', sk: 'pomenuj správanie a svoj krok.' } },
              { type: 'order',
                prompt: { en: 'Put the steps for a tense moment in order.', sk: 'Zoraď kroky pre napätú chvíľu.' },
                items: {
                  en: ['Pause and breathe', 'Acknowledge their feeling', 'Focus on the problem', 'Agree a next step'],
                  sk: ['Zastaviť sa a nadýchnuť', 'Uznať jeho pocit', 'Sústrediť sa na problém', 'Dohodnúť ďalší krok'],
                },
                explain: { en: 'Calm yourself, acknowledge them, focus on the problem, agree what’s next.', sk: 'Upokoj sa, uznaj jeho pocit, sústreď sa na problém a dohodnite sa, čo ďalej.' },
                hint: { en: 'start with yourself, end with a plan.', sk: 'začni sebou, skonči plánom.' } },
            ],
          },
          {
            id: 'comm-say-no',
            title: { en: 'Say “no” and be likable', sk: 'Povedz „nie“ a zostaň sympatický' },
            minutes: 10,
            slides: [
              {
                title: { en: 'Every yes has a cost', sk: 'Každé áno niečo stojí' },
                text: {
                  en: '<p>Every yes spends time you can’t spend on something else. A kind, clear no protects your priorities, and people respect it more than a yes you can’t deliver.</p>',
                  sk: '<p>Každé áno minie čas, ktorý už nevenuješ ničomu inému. Láskavé, jasné nie chráni tvoje priority a ľudia si ho vážia viac ako áno, ktoré nedokážeš splniť.</p>',
                },
              },
              {
                title: { en: 'The positive no', sk: 'Pozitívne nie' },
                points: {
                  en: [
                    '<b>Yes</b> to the person: show you care.',
                    '<b>No</b> to the request: say it clearly.',
                    '<b>Offer</b> an alternative, if you have one.',
                    'Skip the long list of excuses.',
                  ],
                  sk: [
                    '<b>Áno</b> človeku: ukáž, že ti na ňom záleží.',
                    '<b>Nie</b> požiadavke: povedz to jasne.',
                    '<b>Ponúkni</b> alternatívu, ak nejakú máš.',
                    'Vynechaj dlhý zoznam výhovoriek.',
                  ],
                },
              },
              {
                title: { en: 'Ways to say it', sk: 'Ako to povedať' },
                phrases: {
                  en: [
                    en('I’d love to help, but I can’t take this on this week.', 'Warm and clear'),
                    en('I can’t do the full report, but I can review the summary.', 'No, plus an alternative'),
                    en('Let me check my priorities and get back to you by three.', 'Buys time without a soft yes'),
                  ],
                  sk: [
                    sk('Chcem ti pomôcť, ale tento týždeň to už nestihnem.', 'Vľúdne a jasne'),
                    sk('Celú správu nestihnem, ale zhrnutie ti môžem skontrolovať.', 'Nie, plus alternatíva'),
                    sk('Pozriem sa na svoje priority a do tretej ti dám vedieť.', 'Získa čas bez mäkkého áno'),
                  ],
                },
              },
              {
                title: { en: 'Avoid the soft yes', sk: 'Vyhni sa mäkkému áno' },
                text: {
                  en: '<p>“Maybe” and “I’ll try” usually turn into a late no, which hurts more than an early one. Being clear early is the kind option.</p>',
                  sk: '<p>„Možno“ a „Skúsim to“ sa zvyčajne zmenia na neskoré nie, ktoré bolí viac ako to včasné. Byť jasný hneď je tá láskavejšia možnosť.</p>',
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'Which is the clearest, kindest no?', sk: 'Ktoré nie je najjasnejšie a zároveň najláskavejšie?' },
                options: {
                  en: ['I’d love to help, but I can’t take this on this week.', 'Maybe, I’ll try.', 'I’m way too busy for that.', 'Ignore the message'],
                  sk: ['Chcem ti pomôcť, ale tento týždeň to už nestihnem.', 'Možno, skúsim to.', 'Na toto fakt nemám čas.', 'Ignorovať správu'],
                },
                answer: { en: 'I’d love to help, but I can’t take this on this week.', sk: 'Chcem ti pomôcť, ale tento týždeň to už nestihnem.' },
                explain: { en: 'It’s warm <b>and</b> clear.', sk: 'Je vľúdne <b>a zároveň</b> jasné.' },
                hint: { en: 'it shows you care and still says no.', sk: 'ukáže, že ti záleží, a aj tak povie nie.' } },
              { type: 'order',
                prompt: { en: 'Put the positive no in order.', sk: 'Zoraď kroky pozitívneho nie.' },
                items: { en: ['Show you care', 'Say no clearly', 'Offer an alternative'], sk: ['Ukázať, že ti záleží', 'Jasne povedať nie', 'Ponúknuť alternatívu'] },
                explain: { en: 'Yes to the person, no to the request, then an alternative.', sk: 'Áno človeku, nie požiadavke a potom alternatíva.' },
                hint: { en: 'the relationship comes first.', sk: 'vzťah je na prvom mieste.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'A long list of excuses makes a no more convincing.', sk: 'Dlhý zoznam výhovoriek urobí nie presvedčivejším.' },
                answer: false,
                explain: { en: '<b>False.</b> Long excuses invite debate. Keep it short.', sk: '<b>Nepravda.</b> Dlhé výhovorky vyvolávajú debatu. Buď stručný.' },
                hint: { en: 'more reasons give more to argue with.', sk: 'viac dôvodov znamená viac toho, s čím sa dá hádať.' } },
              { type: 'choice',
                prompt: { en: 'Why avoid answering “I’ll try”?', sk: 'Prečo sa vyhnúť odpovedi „Skúsim to“?' },
                options: {
                  en: ['It often turns into a late no', 'It sounds too confident', 'It’s rude', 'It’s too short'],
                  sk: ['Často sa z nej stane neskoré nie', 'Znie príliš sebavedomo', 'Je nezdvorilá', 'Je príliš krátka'],
                },
                answer: { en: 'It often turns into a late no', sk: 'Často sa z nej stane neskoré nie' },
                explain: { en: 'A soft yes usually becomes <b>a late no</b>, which hurts more.', sk: 'Z mäkkého áno sa zvyčajne stane <b>neskoré nie</b>, ktoré bolí viac.' },
                hint: { en: 'think about what happens a week later.', sk: 'zamysli sa, čo sa stane o týždeň.' } },
            ],
          },
          {
            id: 'comm-interrupt',
            title: { en: 'Interrupt smoothly', sk: 'Skoč do reči elegantne' },
            minutes: 10,
            slides: [
              {
                title: { en: 'Sometimes you have to', sk: 'Niekedy to inak nejde' },
                text: {
                  en: '<p>The meeting is running over, the discussion has drifted, or a wrong number is about to become a decision. A smooth interruption saves everyone’s time.</p>',
                  sk: '<p>Porada sa naťahuje, diskusia odbočila alebo sa z chybného čísla má stať rozhodnutie. Elegantné prerušenie ušetrí čas všetkým.</p>',
                },
              },
              {
                title: { en: 'The smooth interrupt', sk: 'Elegantné prerušenie' },
                points: {
                  en: [
                    'Say their <b>name</b> to get attention.',
                    '<b>Acknowledge</b> their point.',
                    '<b>Bridge</b> to yours, briefly.',
                    '<b>Hand back</b> the floor.',
                  ],
                  sk: [
                    'Povedz jeho <b>meno</b> a získaš pozornosť.',
                    '<b>Uznaj</b> jeho myšlienku.',
                    'Stručne <b>prejdi</b> k tej svojej.',
                    '<b>Vráť</b> mu slovo.',
                  ],
                },
              },
              {
                title: { en: 'Lines that work', sk: 'Vety, ktoré fungujú' },
                phrases: {
                  en: [
                    en('Sorry to jump in, Tom: great point. Can I add one thing?', 'Name, acknowledge, bridge'),
                    en('Before we go on, a quick correction:', 'For facts that matter'),
                    en('I want to make sure we finish on time. Can we come back to this?', 'For meetings that drift'),
                  ],
                  sk: [
                    sk('Prepáč, že skočím do reči, Tomáš: výborný postreh. Môžem niečo dodať?', 'Meno, uznanie, prechod'),
                    sk('Kým pôjdeme ďalej, rýchla oprava:', 'Pre fakty, na ktorých záleží'),
                    sk('Chcem, aby sme skončili načas. Môžeme sa k tomu vrátiť neskôr?', 'Pre porady, ktoré odbočujú'),
                  ],
                },
              },
              {
                title: { en: 'Timing', sk: 'Načasovanie' },
                text: {
                  en: '<p>Wait for a breath or the end of a sentence. Lean in or raise a hand first so they see you coming, and keep your voice calm.</p>',
                  sk: '<p>Počkaj, kým sa nadýchne alebo dokončí vetu. Najprv sa nakloň dopredu alebo zdvihni ruku, nech vidí, že sa chystáš hovoriť, a hovor pokojným hlasom.</p>',
                },
              },
            ],
            quiz: [
              { type: 'order',
                prompt: { en: 'Put the smooth interrupt in order.', sk: 'Zoraď kroky elegantného prerušenia.' },
                items: {
                  en: ['Say their name', 'Acknowledge their point', 'Bridge to yours', 'Hand the floor back'],
                  sk: ['Povedať jeho meno', 'Uznať jeho myšlienku', 'Prejsť k svojej', 'Vrátiť mu slovo'],
                },
                explain: { en: 'Name, acknowledge, bridge, hand back.', sk: 'Meno, uznanie, prechod, vrátenie slova.' },
                hint: { en: 'get their attention first.', sk: 'najprv získaj jeho pozornosť.' } },
              { type: 'choice',
                prompt: { en: 'When is the best moment to interrupt?', sk: 'Kedy je najlepšia chvíľa skočiť do reči?' },
                options: {
                  en: ['At a natural pause', 'In the middle of a word', 'While they read out a number', 'Right as they reach the key point'],
                  sk: ['Pri prirodzenej pauze', 'Uprostred slova', 'Keď práve číta číslo', 'Presne vo chvíli, keď sa dostáva k pointe'],
                },
                answer: { en: 'At a natural pause', sk: 'Pri prirodzenej pauze' },
                explain: { en: 'Wait for <b>a breath or the end of a sentence</b>.', sk: 'Počkaj, <b>kým sa nadýchne alebo dokončí vetu</b>.' },
                hint: { en: 'wait for a gap.', sk: 'počkaj na medzeru.' } },
              { type: 'choice',
                prompt: { en: 'Which is the smoothest interruption?', sk: 'Ktoré prerušenie je najelegantnejšie?' },
                options: {
                  en: ['Sorry to jump in, Tom: great point. Can I add one thing?', 'No, that’s wrong.', 'Stop talking.', 'Just start talking louder'],
                  sk: ['Prepáč, že skočím do reči, Tomáš: výborný postreh. Môžem niečo dodať?', 'Nie, to je zle.', 'Prestaň rozprávať.', 'Jednoducho začať hovoriť hlasnejšie'],
                },
                answer: { en: 'Sorry to jump in, Tom: great point. Can I add one thing?', sk: 'Prepáč, že skočím do reči, Tomáš: výborný postreh. Môžem niečo dodať?' },
                explain: { en: 'It uses their name, acknowledges them and asks to add a point.', sk: 'Použije meno, uzná jeho myšlienku a spýta sa, či môže niečo dodať.' },
                hint: { en: 'look for the name and the acknowledgement.', sk: 'hľadaj meno a uznanie.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Saying someone’s name is a polite way to get their attention before you interrupt.', sk: 'Povedať niečie meno je zdvorilý spôsob, ako získať jeho pozornosť, skôr než mu skočíš do reči.' },
                answer: true,
                explain: { en: '<b>True.</b> It’s the first step of the smooth interrupt.', sk: '<b>Pravda.</b> Je to prvý krok elegantného prerušenia.' },
                hint: { en: 'it’s step one.', sk: 'je to krok číslo jeden.' } },
            ],
          },
          {
            id: 'comm-conflict',
            title: { en: 'Defuse any conflict', sk: 'Upokoj akýkoľvek konflikt' },
            minutes: 15,
            slides: [
              {
                title: { en: 'Calm first, then solve', sk: 'Najprv upokojiť, potom riešiť' },
                text: {
                  en: '<p>In a conflict, people react before they think. Trying to solve the problem while emotions run high rarely works. <b>Lower the temperature first</b>, then work on the issue.</p>',
                  sk: '<p>V konflikte ľudia reagujú skôr, ako premýšľajú. Riešiť problém, kým emócie vrú, sa málokedy podarí. <b>Najprv zníž teplotu</b> a až potom sa pusti do veci.</p>',
                },
              },
              {
                title: { en: 'Name the feeling', sk: 'Pomenuj pocit' },
                phrases: {
                  en: [
                    en('It sounds like you’re frustrated about the delay.', 'Labels the emotion without judging it'),
                  ],
                  sk: [
                    sk('Znie to tak, že ťa to meškanie frustruje.', 'Pomenuje emóciu bez hodnotenia'),
                  ],
                },
                text: {
                  en: '<p>Putting a feeling into words tends to make it less intense. People calm down when they feel understood.</p>',
                  sk: '<p>Keď pocit vyjadríš slovami, zvyčajne zoslabne. Ľudia sa upokoja, keď sa cítia pochopení.</p>',
                },
              },
              {
                title: { en: 'Interests, not positions', sk: 'Záujmy, nie pozície' },
                text: {
                  en: '<p>A <b>position</b> is what someone demands: “I need it on Monday.” An <b>interest</b> is why: “My client meeting is on Tuesday.”</p><p>Ask <b>“Why does that matter to you?”</b> Interests open up options that work for both sides.</p>',
                  sk: '<p><b>Pozícia</b> je to, čo niekto požaduje: „Potrebujem to v pondelok.“ <b>Záujem</b> je dôvod: „V utorok mám stretnutie s klientom.“</p><p>Opýtaj sa: <b>„Prečo je to pre teba dôležité?“</b> Záujmy otvárajú možnosti, ktoré vyhovujú obom stranám.</p>',
                },
              },
              {
                title: { en: 'Use I-statements', sk: 'Hovor v prvej osobe' },
                phrases: {
                  en: [
                    en('You never tell me anything!', 'Blames: invites a counter-attack'),
                    en('I felt left out when I heard about the change last.', 'Describes your experience: invites a conversation'),
                  ],
                  sk: [
                    sk('Ty mi nikdy nič nepovieš!', 'Obviňuje: vyzýva na protiútok'),
                    sk('Mrzí ma, keď sa o zmenách dozviem až nakoniec.', 'Opisuje tvoj zážitok: pozýva na rozhovor'),
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: '“I need it on Monday” is a position. Which is the interest behind it?', sk: '„Potrebujem to v pondelok“ je pozícia. Aký záujem sa za ňou skrýva?' },
                options: {
                  en: ['My client meeting is on Tuesday.', 'I need it on Monday.', 'Because I said so.', 'I don’t trust you.'],
                  sk: ['V utorok mám stretnutie s klientom.', 'Potrebujem to v pondelok.', 'Lebo to tak chcem.', 'Neverím ti.'],
                },
                answer: { en: 'My client meeting is on Tuesday.', sk: 'V utorok mám stretnutie s klientom.' },
                explain: { en: 'The interest is the <b>why</b>: the client meeting on Tuesday.', sk: 'Záujem je ten <b>dôvod</b>: stretnutie s klientom v utorok.' },
                hint: { en: 'ask “why does that matter?”.', sk: 'opýtaj sa „prečo je to dôležité?“.' } },
              { type: 'choice',
                prompt: { en: 'Which is an I-statement?', sk: 'Ktorá veta je v prvej osobe?' },
                options: {
                  en: ['I felt left out when I heard about the change last.', 'You never tell me anything!', 'You’re so secretive.', 'Everyone thinks you’re rude.'],
                  sk: ['Mrzí ma, keď sa o zmenách dozviem až nakoniec.', 'Ty mi nikdy nič nepovieš!', 'Všetko predo mnou tajíš.', 'Všetci hovoria, že sa správaš hrubo.'],
                },
                answer: { en: 'I felt left out when I heard about the change last.', sk: 'Mrzí ma, keď sa o zmenách dozviem až nakoniec.' },
                explain: { en: 'It describes <b>your</b> experience instead of blaming them.', sk: 'Opisuje <b>tvoj</b> zážitok namiesto obviňovania druhého.' },
                hint: { en: 'it starts with how you felt.', sk: 'začína tým, ako sa cítiš.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Naming someone’s emotion usually makes them angrier.', sk: 'Keď niekomu pomenuješ emóciu, zvyčajne sa nahnevá ešte viac.' },
                answer: false,
                explain: { en: '<b>False.</b> Labelling a feeling tends to make it less intense.', sk: '<b>Nepravda.</b> Pomenovaný pocit zvyčajne zoslabne.' },
                hint: { en: 'people calm down when they feel understood.', sk: 'ľudia sa upokoja, keď sa cítia pochopení.' } },
              { type: 'order',
                prompt: { en: 'Put the steps to defuse a conflict in order.', sk: 'Zoraď kroky na upokojenie konfliktu.' },
                items: {
                  en: ['Calm the emotion', 'Find the interests', 'Explore options', 'Agree a next step'],
                  sk: ['Upokojiť emócie', 'Nájsť záujmy', 'Preskúmať možnosti', 'Dohodnúť ďalší krok'],
                },
                explain: { en: 'Calm first, then find interests, explore options and agree what’s next.', sk: 'Najprv upokojiť, potom nájsť záujmy, preskúmať možnosti a dohodnúť sa, čo ďalej.' },
                hint: { en: 'calm first, then solve.', sk: 'najprv upokojiť, potom riešiť.' } },
            ],
          },
          {
            id: 'comm-listen',
            title: { en: 'Listen like a leader', sk: 'Počúvaj ako líder' },
            minutes: 11,
            slides: [
              {
                title: { en: 'Listen to understand', sk: 'Počúvaj s cieľom pochopiť' },
                art: art(LISTEN),
                text: {
                  en: '<p>Most people listen to reply: they’re planning their answer while the other person talks. Leaders listen to <b>understand</b>, then check they got it right.</p>',
                  sk: '<p>Väčšina ľudí počúva, aby mohla odpovedať: kým ten druhý hovorí, už si chystajú odpoveď. Lídri počúvajú, aby <b>pochopili</b>, a potom si overia, či to pochopili správne.</p>',
                },
              },
              {
                title: { en: 'Active listening', sk: 'Aktívne počúvanie' },
                points: {
                  en: [
                    'Put your phone away and face them.',
                    'Let them finish, then pause a beat.',
                    'Paraphrase: “So the main issue is…”',
                    'Ask open questions that start with what or how.',
                  ],
                  sk: [
                    'Odlož mobil a otoč sa k nemu.',
                    'Nechaj ho dohovoriť a chvíľku počkaj.',
                    'Parafrázuj: „Takže hlavný problém je…“',
                    'Klaď otvorené otázky, ktoré začínajú slovami čo alebo ako.',
                  ],
                },
              },
              {
                title: { en: 'Questions that open people up', sk: 'Otázky, ktoré ľudí otvoria' },
                phrases: {
                  en: [
                    en('What’s the biggest challenge here?', 'Gets to the real issue'),
                    en('How did that affect you?', 'Invites feelings, not just facts'),
                    en('And what else?', 'Often surfaces the thing that matters most'),
                  ],
                  sk: [
                    sk('Čo je tu najväčšia výzva?', 'Dostane sa k skutočnému problému'),
                    sk('Ako to ovplyvnilo teba?', 'Pozve aj pocity, nielen fakty'),
                    sk('A čo ešte?', 'Často vynesie na povrch to najdôležitejšie'),
                  ],
                },
              },
              {
                title: { en: 'Close the loop', sk: 'Uzavri to' },
                text: {
                  en: '<p>End by summarising what you heard and what happens next. People who feel heard are far more willing to follow your lead.</p>',
                  sk: '<p>Na záver zhrň, čo zaznelo a čo bude ďalej. Ľudia, ktorí sa cítia vypočutí, ťa oveľa ochotnejšie nasledujú.</p>',
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'Which is an open question?', sk: 'Ktorá otázka je otvorená?' },
                options: {
                  en: ['What’s the biggest challenge here?', 'Did you finish it?', 'Is it bad?', 'Are you okay with that?'],
                  sk: ['Čo je tu najväčšia výzva?', 'Máš to hotové?', 'Je to zlé?', 'Vyhovuje ti to?'],
                },
                answer: { en: 'What’s the biggest challenge here?', sk: 'Čo je tu najväčšia výzva?' },
                explain: { en: 'It can’t be answered with yes or no, so it <b>opens</b> the conversation.', sk: 'Nedá sa na ňu odpovedať áno alebo nie, a tak rozhovor <b>otvára</b>.' },
                hint: { en: 'it can’t be answered with yes or no.', sk: 'nedá sa na ňu odpovedať áno alebo nie.' } },
              { type: 'choice',
                prompt: { en: 'What does paraphrasing mean?', sk: 'Čo znamená parafrázovať?' },
                options: {
                  en: ['Repeating their main point in your own words', 'Changing the topic', 'Finishing their sentences', 'Giving advice straight away'],
                  sk: ['Zopakovať jeho hlavnú myšlienku vlastnými slovami', 'Zmeniť tému', 'Dokončovať mu vety', 'Hneď dávať rady'],
                },
                answer: { en: 'Repeating their main point in your own words', sk: 'Zopakovať jeho hlavnú myšlienku vlastnými slovami' },
                explain: { en: 'Paraphrasing is saying their point <b>back in your own words</b> to check you understood.', sk: 'Parafrázovať znamená zopakovať jeho myšlienku <b>vlastnými slovami</b> a overiť si, či mu rozumieš.' },
                hint: { en: '“So the main issue is…”', sk: '„Takže hlavný problém je…“' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Planning your reply while they talk is part of active listening.', sk: 'Chystať si odpoveď, kým ten druhý hovorí, patrí k aktívnemu počúvaniu.' },
                answer: false,
                explain: { en: '<b>False.</b> That’s listening to reply. Listen to understand.', sk: '<b>Nepravda.</b> To je počúvanie s cieľom odpovedať. Počúvaj s cieľom pochopiť.' },
                hint: { en: 'leaders listen to understand, not to reply.', sk: 'lídri počúvajú, aby pochopili, nie aby odpovedali.' } },
              { type: 'order',
                prompt: { en: 'Put active listening in order.', sk: 'Zoraď kroky aktívneho počúvania.' },
                items: {
                  en: ['Give full attention', 'Let them finish', 'Paraphrase', 'Ask an open question'],
                  sk: ['Venovať plnú pozornosť', 'Nechať ho dohovoriť', 'Parafrázovať', 'Položiť otvorenú otázku'],
                },
                explain: { en: 'Attention, let them finish, paraphrase, then ask.', sk: 'Pozornosť, nechať dohovoriť, parafrázovať a potom sa opýtať.' },
                hint: { en: 'you can’t paraphrase before they finish.', sk: 'nemôžeš parafrázovať, kým nedohovorí.' } },
            ],
          },
        ],
      },
    ],
  });
})();
