'use strict';

/* Languages · Spanish: first conversations. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';

  const SKY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="The sun travels across the sky from morning to night, with the matching Spanish greeting under each part of the day.">
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

  const CHAT = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Otto the octopus and a fish introduce themselves in speech bubbles.">
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
    title: 'Spanish: first conversations',
    blurb: 'Greet people, introduce yourself and learn your first sea creatures, with audio.',
    artBg: '#FFF8F5',
    units: [
      {
        title: 'Hello, world',
        lessons: [
          {
            id: 'es-hello',
            title: 'Saying hello',
            minutes: 4,
            slides: [
              {
                title: 'Greetings through the day',
                art: SKY,
                phrases: [
                  { es: '¡Hola!', en: 'Hello! (any time of day)' },
                  { es: 'Buenos días', en: 'Good morning' },
                  { es: 'Buenas tardes', en: 'Good afternoon' },
                  { es: 'Buenas noches', en: 'Good evening / good night' },
                ],
                text: '<p>Tap the speaker to hear each greeting. Notice: <i>día</i> takes <b>buenos</b>, but <i>tardes</i> and <i>noches</i> take <b>buenas</b>.</p>',
              },
              {
                title: 'Introducing yourself',
                art: CHAT,
                phrases: [
                  { es: 'Me llamo Otto.', en: 'My name is Otto.' },
                  { es: '¿Cómo te llamas?', en: 'What’s your name?' },
                  { es: 'Mucho gusto.', en: 'Nice to meet you.' },
                ],
                text: '<p>Spanish questions start with an upside-down question mark: <b>¿</b>…<b>?</b></p>',
              },
              {
                title: 'Sea creatures',
                cards: [
                  { front: 'el pulpo', back: 'the octopus' },
                  { front: 'el pez', back: 'the fish' },
                  { front: 'la ballena', back: 'the whale' },
                  { front: 'el cangrejo', back: 'the crab' },
                ],
                text: '<p>Guess each word, then tap the card to flip it and hear it. <b>El</b> and <b>la</b> both mean “the”: el for masculine words, la for feminine ones.</p>',
              },
              {
                title: 'Recap',
                points: [
                  '<b>¡Hola!</b> works any time; <b>buenos días</b>, <b>buenas tardes</b> and <b>buenas noches</b> follow the clock.',
                  '<b>Me llamo…</b> means “my name is…”.',
                  '<b>¿Cómo te llamas?</b> asks someone’s name.',
                  '<b>Mucho gusto</b>: nice to meet you.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Listen. What does it mean?', say: { text: 'Buenas noches', lang: 'es-ES' },
                options: ['Good night', 'Good morning', 'Hello', 'Thank you'], answer: 'Good night',
                explain: '<i lang="es">Buenas noches</i> means <b>good evening / good night</b>.', hint: 'noche is the time when the sun has gone down.' },
              { type: 'choice', prompt: 'How do you say “Nice to meet you”?',
                options: ['Mucho gusto', 'Me llamo', 'Buenos días', 'Muchas gracias'], answer: 'Mucho gusto',
                explain: '<b lang="es">Mucho gusto</b>. (<i lang="es">Muchas gracias</i> is “thank you very much”.)', hint: 'it’s what the fish said.' },
              { type: 'order', prompt: 'Build the question: “What’s your name?”',
                items: ['¿Cómo', 'te', 'llamas?'],
                explain: '<b lang="es">¿Cómo te llamas?</b> Literally “how do you call yourself?”', hint: 'it starts with the upside-down question mark.' },
              { type: 'choice', prompt: 'What is <i lang="es">el cangrejo</i>?',
                options: ['the crab', 'the whale', 'the fish', 'the octopus'], answer: 'the crab',
                explain: '<b lang="es">El cangrejo</b> is the crab.', hint: 'flip the cards on the sea creatures slide again.' },
            ],
          },
        ],
        soon: ['Numbers 1 to 20', 'At the café'],
      },
    ],
    soonUnits: ['Talking about your day'],
  });
})();
