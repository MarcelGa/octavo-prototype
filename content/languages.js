'use strict';

/* Languages · Spanish: first conversations. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';

  const SKY = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk' ? 'Slniečko putuje po oblohe od rána do noci. Pod každou časťou dňa je jej španielsky pozdrav.' : 'The sun travels across the sky from morning to night, with the matching Spanish greeting under each part of the day.'}">
    <rect width="320" height="200" fill="#E6ECFC"/>
    <path d="M20 160 Q160 -10 300 160" fill="none" stroke="#C9D6FA" stroke-width="2" stroke-dasharray="4 6"/>
    <circle r="18" fill="#F5A524">
      <animateMotion dur="7s" repeatCount="indefinite" path="M20 160 Q160 -10 300 160"/>
    </circle>
    <rect y="160" width="320" height="40" fill="#BFE6CF"/>
    <text x="40" y="186" text-anchor="middle" ${T} font-size="12" fill="#1C6B45" lang="es">Buenos días</text>
    <text x="160" y="186" text-anchor="middle" ${T} font-size="12" fill="#1C6B45" lang="es">Buenas tardes</text>
    <text x="276" y="186" text-anchor="middle" ${T} font-size="12" fill="#1C6B45" lang="es">Buenas noches</text>
  </svg>`;

  const CHAT = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk' ? 'Chobotnička Otto a rybka sa predstavujú v bublinách.' : 'Otto the octopus and a fish introduce themselves in speech bubbles.'}">
    <rect width="320" height="200" fill="#E6F4FF"/>
    <g fill="#B5DCF7"><circle class="a-bubble" cx="150" cy="190" r="4"/><circle class="a-bubble" style="animation-delay: 1.2s" cx="176" cy="190" r="3"/><circle class="a-bubble" style="animation-delay: 2.1s" cx="162" cy="190" r="5"/></g>
    <g class="a-bob">
      <ellipse cx="62" cy="150" rx="30" ry="28" fill="#6C4CF1"/>
      <path d="M40 170 q-4 14 -12 18 M54 176 q0 12 -4 18 M70 176 q0 12 4 18 M84 170 q4 14 12 18" stroke="#6C4CF1" stroke-width="7" stroke-linecap="round" fill="none"/>
      <circle cx="52" cy="148" r="8" fill="#fff"/><circle cx="72" cy="148" r="8" fill="#fff"/>
      <circle cx="54" cy="149" r="4" fill="#1E1A3C"/><circle cx="74" cy="149" r="4" fill="#1E1A3C"/>
    </g>
    <g class="a-bob" style="animation-delay: 1s">
      <path d="M232 150 C 248 128, 286 128, 296 150 C 286 172, 248 172, 232 150 Z" fill="#FF7A59"/>
      <path d="M296 150 L314 136 V164 Z" fill="#FF7A59"/>
      <circle cx="250" cy="146" r="5" fill="#fff"/><circle cx="251" cy="146" r="2.5" fill="#1E1A3C"/>
    </g>
    <g class="a-say1">
      <rect x="16" y="20" width="168" height="50" rx="16" fill="#FFFFFF" stroke="#C9BCFF" stroke-width="2"/>
      <path d="M50 70 L58 86 L66 70" fill="#FFFFFF" stroke="#C9BCFF" stroke-width="2"/>
      <text x="100" y="42" text-anchor="middle" ${T} font-size="13" fill="#1E1A3C" lang="es">¡Hola! Me llamo Otto.</text>
      <text x="100" y="60" text-anchor="middle" ${T} font-size="13" fill="#4B2FC9" lang="es">¿Cómo te llamas?</text>
    </g>
    <g class="a-say2">
      <rect x="150" y="62" width="160" height="50" rx="16" fill="#FFFFFF" stroke="#FFB4A0" stroke-width="2"/>
      <path d="M254 112 L262 126 L270 112" fill="#FFFFFF" stroke="#FFB4A0" stroke-width="2"/>
      <text x="230" y="84" text-anchor="middle" ${T} font-size="13" fill="#1E1A3C" lang="es">Me llamo Nemo.</text>
      <text x="230" y="102" text-anchor="middle" ${T} font-size="13" fill="#C2412A" lang="es">¡Mucho gusto!</text>
    </g>
  </svg>`;

  window.Octavo.addCourse({
    id: 'spanish',
    subject: 'Languages',
    audience: 'kids',
    lecturer: 'lucia',
    title: { en: 'Spanish: first conversations', sk: 'Španielčina: prvé rozhovory' },
    blurb: {
      en: 'Greet people, introduce yourself and learn your first sea creatures, with audio.',
      sk: 'Pozdrav, predstav sa a spoznaj prvé morské zvieratká. Všetko si aj vypočuješ.',
    },
    artBg: '#FFF8F5',
    units: [
      {
        title: { en: 'Hello, world', sk: 'Ahoj, svet' },
        lessons: [
          {
            id: 'es-hello',
            title: { en: 'Saying hello', sk: 'Pozdravy' },
            minutes: 4,
            slides: [
              {
                title: { en: 'Greetings through the day', sk: 'Pozdravy počas dňa' },
                art: { en: SKY('en'), sk: SKY('sk') },
                phrases: [
                  { es: '¡Hola!', en: { en: 'Hello! (any time of day)', sk: 'Ahoj! (kedykoľvek)' } },
                  { es: 'Buenos días', en: { en: 'Good morning', sk: 'Dobré ráno' } },
                  { es: 'Buenas tardes', en: { en: 'Good afternoon', sk: 'Dobrý deň (poobede)' } },
                  { es: 'Buenas noches', en: { en: 'Good evening / good night', sk: 'Dobrý večer / dobrú noc' } },
                ],
                text: {
                  en: '<p>Tap the speaker to hear each greeting. Notice: <i>día</i> takes <b>buenos</b>, but <i>tardes</i> and <i>noches</i> take <b>buenas</b>.</p>',
                  sk: '<p>Ťukni na reproduktor a vypočuj si každý pozdrav. Pozor: povieme <b lang="es">buenos</b> <i lang="es">días</i>, ale <b lang="es">buenas</b> <i lang="es">tardes</i> a <b lang="es">buenas</b> <i lang="es">noches</i>. Aj my hovoríme dobr<b>é</b> ráno, ale dobr<b>ý</b> večer!</p>',
                },
              },
              {
                title: { en: 'Introducing yourself', sk: 'Ako sa predstaviť' },
                art: { en: CHAT('en'), sk: CHAT('sk') },
                phrases: [
                  { es: 'Me llamo Otto.', en: { en: 'My name is Otto.', sk: 'Volám sa Otto.' } },
                  { es: '¿Cómo te llamas?', en: { en: 'What’s your name?', sk: 'Ako sa voláš?' } },
                  { es: 'Mucho gusto.', en: { en: 'Nice to meet you.', sk: 'Teší ma.' } },
                ],
                text: {
                  en: '<p>Spanish questions start with an upside-down question mark: <b>¿</b>…<b>?</b></p>',
                  sk: '<p>V španielčine má otázka otáznik aj na začiatku, a ten je hore nohami: <b>¿</b>…<b>?</b></p>',
                },
              },
              {
                title: { en: 'Sea creatures', sk: 'Morské zvieratká' },
                cards: [
                  { front: 'el pulpo', back: { en: 'the octopus', sk: 'chobotnica' } },
                  { front: 'el pez', back: { en: 'the fish', sk: 'ryba' } },
                  { front: 'la ballena', back: { en: 'the whale', sk: 'veľryba' } },
                  { front: 'el cangrejo', back: { en: 'the crab', sk: 'krab' } },
                ],
                text: {
                  en: '<p>Guess each word, then tap the card to flip it and hear it. <b>El</b> and <b>la</b> both mean “the”: el for masculine words, la for feminine ones.</p>',
                  sk: '<p>Hádaj, čo je to za zvieratko. Potom ťukni na kartičku, otoč ju a vypočuj si ju. Malé slovíčka <b lang="es">el</b> a <b lang="es">la</b> idú pred slovo. My ich nemáme, preto sa ich uč spolu so slovom: <i lang="es">el pulpo</i>, <i lang="es">la ballena</i>.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: [
                  { en: '<b>¡Hola!</b> works any time; <b>buenos días</b>, <b>buenas tardes</b> and <b>buenas noches</b> follow the clock.',
                    sk: '<b lang="es">¡Hola!</b> môžeš povedať vždy. <b lang="es">Buenos días</b>, <b lang="es">buenas tardes</b> a <b lang="es">buenas noches</b> sa menia podľa času.' },
                  { en: '<b>Me llamo…</b> means “my name is…”.', sk: '<b lang="es">Me llamo…</b> znamená „volám sa…“.' },
                  { en: '<b>¿Cómo te llamas?</b> asks someone’s name.', sk: '<b lang="es">¿Cómo te llamas?</b> znamená „ako sa voláš?“.' },
                  { en: '<b>Mucho gusto</b>: nice to meet you.', sk: '<b lang="es">Mucho gusto</b>: teší ma.' },
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'Listen. What does it mean?', sk: 'Počúvaj. Čo to znamená?' }, say: { text: 'Buenas noches', lang: 'es-ES' },
                options: { en: ['Good night', 'Good morning', 'Hello', 'Thank you'], sk: ['Dobrú noc', 'Dobré ráno', 'Ahoj', 'Ďakujem'] },
                answer: { en: 'Good night', sk: 'Dobrú noc' },
                explain: { en: '<i lang="es">Buenas noches</i> means <b>good evening / good night</b>.', sk: '<i lang="es">Buenas noches</i> znamená <b>dobrý večer</b> aj <b>dobrú noc</b>.' },
                hint: { en: 'noche is the time when the sun has gone down.', sk: 'noche je čas, keď už slniečko zapadlo.' } },
              { type: 'choice', prompt: { en: 'How do you say “Nice to meet you”?', sk: 'Ako sa povie „Teší ma“?' },
                options: ['Mucho gusto', 'Me llamo', 'Buenos días', 'Muchas gracias'], answer: 'Mucho gusto',
                explain: { en: '<b lang="es">Mucho gusto</b>. (<i lang="es">Muchas gracias</i> is “thank you very much”.)', sk: '<b lang="es">Mucho gusto</b>. (<i lang="es">Muchas gracias</i> je „ďakujem pekne“.)' },
                hint: { en: 'it’s what the fish said.', sk: 'toto povedala rybka.' } },
              { type: 'order', prompt: { en: 'Build the question: “What’s your name?”', sk: 'Poskladaj otázku: „Ako sa voláš?“' },
                items: ['¿Cómo', 'te', 'llamas?'],
                explain: { en: '<b lang="es">¿Cómo te llamas?</b> Literally “how do you call yourself?”', sk: '<b lang="es">¿Cómo te llamas?</b> Je to skoro ako po slovensky: <i lang="es">cómo</i> = ako, <i lang="es">te llamas</i> = sa voláš.' },
                hint: { en: 'it starts with the upside-down question mark.', sk: 'začína sa otáznikom hore nohami.' } },
              { type: 'choice', prompt: { en: 'What is <i lang="es">el cangrejo</i>?', sk: 'Čo je <i lang="es">el cangrejo</i>?' },
                options: { en: ['the crab', 'the whale', 'the fish', 'the octopus'], sk: ['krab', 'veľryba', 'ryba', 'chobotnica'] },
                answer: { en: 'the crab', sk: 'krab' },
                explain: { en: '<b lang="es">El cangrejo</b> is the crab.', sk: '<b lang="es">El cangrejo</b> je krab.' },
                hint: { en: 'flip the cards on the sea creatures slide again.', sk: 'otoč znova kartičky s morskými zvieratkami.' } },
            ],
          },
        ],
        soon: { en: ['Numbers 1 to 20', 'At the café'], sk: ['Čísla od 1 do 20', 'V kaviarni'] },
      },
    ],
    soonUnits: { en: ['Talking about your day'], sk: ['Rozprávame o svojom dni'] },
  });
})();
