'use strict';

/* Italian · Italian: first steps (3 lessons). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const OLIVE = '#6E8B1E';
  const INK = '#1E1A3C';
  const IT = 'it-IT';

  // Otto the octopus, centred on (x, y).
  function otto(x, y) {
    return `
    <ellipse cx="${x}" cy="${y}" rx="30" ry="28" fill="#6C4CF1"/>
    <path d="M${x - 22} ${y + 20} q-4 14 -12 18 M${x - 8} ${y + 26} q0 12 -4 18 M${x + 8} ${y + 26} q0 12 4 18 M${x + 22} ${y + 20} q4 14 12 18" stroke="#6C4CF1" stroke-width="7" stroke-linecap="round" fill="none"/>
    <circle cx="${x - 10}" cy="${y - 2}" r="8" fill="#fff"/><circle cx="${x + 10}" cy="${y - 2}" r="8" fill="#fff"/>
    <circle cx="${x - 8}" cy="${y - 1}" r="4" fill="${INK}"/><circle cx="${x + 12}" cy="${y - 1}" r="4" fill="${INK}"/>`;
  }

  // A simple person; hat: true adds a hat (used for the older, formal stranger).
  function person(x, y, color, hat = false) {
    return `
    <circle cx="${x}" cy="${y}" r="15" fill="${color}"/>
    <path d="M${x - 20} ${y + 64} V${y + 36} a20 18 0 0 1 40 0 V${y + 64} Z" fill="${color}"/>
    ${hat ? `<path d="M${x - 22} ${y - 10} h44 M${x - 13} ${y - 10} v-14 h26 v14" fill="${INK}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>` : ''}`;
  }

  function bubble(cls, x, y, w, lines, stroke) {
    const h = 18 + lines.length * 18;
    return `<g class="${cls}">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#FFFFFF" stroke="${stroke}" stroke-width="2"/>
      ${lines.map((l, i) => `<text x="${x + w / 2}" y="${y + 24 + i * 18}" text-anchor="middle" ${T} font-size="13" fill="${l.color || INK}" lang="it">${l.text}</text>`).join('')}
    </g>`;
  }

  const SKY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="The sun travels across the sky from morning to night. Under each part of the day is its Italian greeting: buongiorno, buonasera, buonanotte.">
    <rect width="320" height="200" fill="#EEF4DC"/>
    <path d="M20 160 Q160 -10 300 160" fill="none" stroke="#D3E0AE" stroke-width="2" stroke-dasharray="4 6"/>
    <circle r="18" fill="#F5A524">
      <animateMotion dur="7s" repeatCount="indefinite" path="M20 160 Q160 -10 300 160"/>
    </circle>
    <rect y="160" width="320" height="40" fill="#C9DB9A"/>
    <text x="48" y="186" text-anchor="middle" ${T} font-size="13" fill="#4A5E12" lang="it">Buongiorno</text>
    <text x="160" y="186" text-anchor="middle" ${T} font-size="13" fill="#4A5E12" lang="it">Buonasera</text>
    <text x="272" y="186" text-anchor="middle" ${T} font-size="13" fill="#4A5E12" lang="it">Buonanotte</text>
  </svg>`;

  const TU_LEI = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Two scenes. On the left, Otto greets a friend: Ciao, come stai? On the right, Otto greets an older stranger in a hat: Buongiorno, come sta?">
    <rect width="320" height="200" fill="#F7FAEE"/>
    <path d="M160 16 V188" stroke="#D3E0AE" stroke-width="3" stroke-dasharray="6 6"/>
    <g class="a-bob">${otto(40, 126)}</g>
    ${person(118, 106, '#FF7A59')}
    <g class="a-bob" style="animation-delay: 0.8s">${otto(200, 126)}</g>
    ${person(278, 106, '#8C87A8', true)}
    ${bubble('a-say1', 10, 20, 140, [{ text: 'Ciao, come stai?' }], '#C9BCFF')}
    ${bubble('a-say2', 170, 20, 140, [{ text: 'Buongiorno,' }, { text: 'come sta?', color: OLIVE }], '#C9DB9A')}
    <text x="80" y="196" text-anchor="middle" ${T} font-size="12" fill="#4A4566">tu · friends</text>
    <text x="240" y="196" text-anchor="middle" ${T} font-size="12" fill="#4A4566">Lei · strangers</text>
  </svg>`;

  const CHAT = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Otto and a woman called Giulia introduce themselves in speech bubbles: Ciao! Mi chiamo Otto. Come ti chiami? Mi chiamo Giulia. Piacere!">
    <rect width="320" height="200" fill="#F7FAEE"/>
    <g class="a-bob">${otto(62, 150)}</g>
    ${person(262, 118, '#FF7A59')}
    ${bubble('a-say1', 14, 18, 168, [{ text: 'Ciao! Mi chiamo Otto.' }, { text: 'Come ti chiami?', color: '#4B2FC9' }], '#C9BCFF')}
    ${bubble('a-say2', 146, 62, 164, [{ text: 'Mi chiamo Giulia.' }, { text: 'Piacere!', color: '#C2412A' }], '#FFB4A0')}
  </svg>`;

  const CAFE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Otto at a café counter with a steaming cup of coffee, saying: Vorrei un caffè, per favore.">
    <rect width="320" height="200" fill="#F7FAEE"/>
    <rect x="0" y="150" width="320" height="50" fill="#8A5A3B"/>
    <rect x="0" y="146" width="320" height="8" fill="#6B4129"/>
    <g class="a-bob">${otto(70, 112)}</g>
    <g>
      <path d="M200 112 h44 v18 a16 16 0 0 1 -16 16 h-12 a16 16 0 0 1 -16 -16 Z" fill="#FFFFFF" stroke="${INK}" stroke-width="3"/>
      <path d="M244 118 h6 a7 7 0 0 1 0 14 h-6" fill="none" stroke="${INK}" stroke-width="3"/>
      <ellipse cx="222" cy="146" rx="32" ry="5" fill="#E8E2D6"/>
      <g fill="#D3E0AE"><circle class="a-bubble" cx="214" cy="104" r="4"/><circle class="a-bubble" style="animation-delay: 0.9s" cx="226" cy="104" r="3"/><circle class="a-bubble" style="animation-delay: 1.7s" cx="232" cy="104" r="4"/></g>
    </g>
    ${bubble('a-say1', 20, 16, 200, [{ text: 'Vorrei un caffè,' }, { text: 'per favore.', color: OLIVE }], '#C9DB9A')}
  </svg>`;

  const PAY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="At the till: a receipt for one coffee, 1 euro 20, and two coins. Otto asks: Quant'è?">
    <rect width="320" height="200" fill="#F7FAEE"/>
    <g class="a-pop">
      <path d="M170 30 h130 v130 ${'l-5 -8 l-5 8 '.repeat(13)}Z" fill="#FFFFFF" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <text x="235" y="56" text-anchor="middle" ${T} font-size="12" fill="${INK}">BAR OTTO</text>
      <path d="M182 66 h106" stroke="#D3E0AE" stroke-width="2"/>
      <text x="182" y="88" ${T} font-size="12" fill="${INK}" lang="it">1 caffè</text>
      <text x="288" y="88" text-anchor="end" ${T} font-size="12" fill="${INK}">€1,20</text>
      <text x="182" y="128" ${T} font-size="13" fill="${OLIVE}" lang="it">Totale</text>
      <text x="288" y="128" text-anchor="end" ${T} font-size="13" fill="${OLIVE}">€1,20</text>
    </g>
    <g class="a-pop" style="animation-delay: 0.5s"><circle cx="120" cy="168" r="16" fill="#F5C542" stroke="#B8860B" stroke-width="3"/><text x="120" y="173" text-anchor="middle" ${T} font-size="13" fill="#7A5000">1</text></g>
    <g class="a-pop" style="animation-delay: 0.8s"><circle cx="152" cy="174" r="12" fill="#E0B44A" stroke="#B8860B" stroke-width="3"/><text x="152" y="178" text-anchor="middle" ${T} font-size="10" fill="#7A5000">20</text></g>
    <g class="a-bob">${otto(60, 110)}</g>
    ${bubble('a-say1', 14, 20, 110, [{ text: 'Quant’è?' }], '#C9BCFF')}
  </svg>`;

  window.Octavo.addCourse({
    id: 'italian',
    subject: 'Italian',
    audience: 'adult',
    lecturer: 'mara',
    title: 'Italian: first steps',
    blurb: 'Greet people, introduce yourself and order at a café, with spoken Italian.',
    artBg: '#F7FAEE',
    units: [
      {
        title: 'Ciao, Italia!',
        lessons: [
          {
            id: 'it-greetings',
            title: 'Greetings and goodbyes',
            minutes: 12,
            slides: [
              {
                title: 'Greetings through the day',
                art: SKY,
                phrases: [
                  { es: 'Buongiorno', en: 'Good morning / good day (until mid-afternoon)', lang: IT },
                  { es: 'Buonasera', en: 'Good evening (from late afternoon)', lang: IT },
                  { es: 'Buonanotte', en: 'Good night (when someone goes to bed)', lang: IT },
                ],
                text: '<p>Tap the speaker to hear each greeting. <b lang="it">Buonanotte</b> is only for saying goodnight. When you arrive somewhere in the evening, say <b lang="it">buonasera</b>.</p>',
              },
              {
                title: 'Hello and goodbye',
                cards: [
                  { front: 'ciao', back: 'hi · bye (friends)', lang: IT },
                  { front: 'arrivederci', back: 'goodbye', lang: IT },
                  { front: 'a presto', back: 'see you soon', lang: IT },
                  { front: 'a domani', back: 'see you tomorrow', lang: IT },
                ],
                text: '<p>Guess each one, then tap the card to flip it and hear it. <b lang="it">Ciao</b> works both ways, hello <i>and</i> goodbye, but only with people you know well.</p>',
              },
              {
                title: 'Tu or Lei?',
                art: TU_LEI,
                phrases: [
                  { es: 'Ciao, come stai?', en: 'Hi, how are you? (tu: friends, family, children)', lang: IT },
                  { es: 'Buongiorno, come sta?', en: 'Good morning, how are you? (Lei: strangers, older people, shops)', lang: IT },
                  { es: 'Bene, grazie. E tu?', en: 'Fine, thanks. And you? (tu)', lang: IT },
                  { es: 'Bene, grazie. E Lei?', en: 'Fine, thanks. And you? (Lei)', lang: IT },
                ],
                text: '<p>Italian has two ways to say “you”. <b lang="it">Tu</b> is informal. <b lang="it">Lei</b> is polite, and it changes the verb: <i lang="it">come stai</i> becomes <i lang="it">come sta</i>. When in doubt with an adult you don’t know, use <b lang="it">Lei</b>.</p>',
              },
              {
                title: 'Recap',
                points: [
                  '<b lang="it">Buongiorno</b> by day, <b lang="it">buonasera</b> in the evening, <b lang="it">buonanotte</b> at bedtime.',
                  '<b lang="it">Ciao</b> means hi <i>and</i> bye, with friends.',
                  '<b lang="it">Arrivederci</b> is the safe goodbye with anyone.',
                  'Friends get <b lang="it">come stai?</b> (tu); strangers get <b lang="it">come sta?</b> (Lei).',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Listen. What does it mean?', say: { text: 'Buonasera', lang: IT },
                options: ['Good evening', 'Good morning', 'Good night', 'See you soon'], answer: 'Good evening',
                explain: '<i lang="it">Buonasera</i> means <b>good evening</b>.', hint: 'sera is the evening, when the sun goes down.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Ciao can mean both hello and goodbye.', answer: true,
                explain: '<b>True.</b> <i lang="it">Ciao</i> works both ways, with people you know well.', hint: 'look at the flip cards again.' },
              { type: 'choice', prompt: 'You meet your colleague’s grandmother for the first time. What do you say?',
                options: ['Buongiorno, come sta?', 'Ciao, come stai?', 'Buonanotte!', 'A domani!'], answer: 'Buongiorno, come sta?',
                explain: 'Someone older you don’t know gets the polite <b>Lei</b> form: <b lang="it">Buongiorno, come sta?</b>', hint: 'strangers and older people get Lei.' },
              { type: 'order', prompt: 'Build the reply to a friend: “Fine, thanks. And you?”',
                items: ['Bene,', 'grazie.', 'E', 'tu?'],
                explain: '<b lang="it">Bene, grazie. E tu?</b> With a stranger you’d end with <i lang="it">E Lei?</i>', hint: 'it starts with “fine”.' },
            ],
          },
          {
            id: 'it-introductions',
            title: 'Introducing yourself',
            minutes: 12,
            slides: [
              {
                title: 'What’s your name?',
                art: CHAT,
                phrases: [
                  { es: 'Mi chiamo Otto.', en: 'My name is Otto.', lang: IT },
                  { es: 'Come ti chiami?', en: 'What’s your name? (tu)', lang: IT },
                  { es: 'Come si chiama?', en: 'What’s your name? (Lei)', lang: IT },
                  { es: 'Piacere!', en: 'Nice to meet you!', lang: IT },
                ],
                text: '<p><b lang="it">Mi chiamo</b> literally means “I call myself”. Ask a friend <i lang="it">come ti chiami?</i> and a stranger <i lang="it">come si chiama?</i></p>',
              },
              {
                title: 'Where are you from?',
                phrases: [
                  { es: 'Di dove sei?', en: 'Where are you from? (tu)', lang: IT },
                  { es: 'Di dov’è?', en: 'Where are you from? (Lei)', lang: IT },
                  { es: 'Sono di Roma.', en: 'I’m from Rome. (di + a city)', lang: IT },
                  { es: 'Sono inglese.', en: 'I’m English.', lang: IT },
                ],
                text: '<p><b lang="it">Sono</b> means “I am”. Use <b lang="it">sono di…</b> with a city, and <b lang="it">sono…</b> with a nationality.</p>',
              },
              {
                title: 'Nationalities: -o or -a?',
                cards: [
                  { front: 'italiano', back: 'Italian (man)', lang: IT },
                  { front: 'italiana', back: 'Italian (woman)', lang: IT },
                  { front: 'americano', back: 'American (man)', lang: IT },
                  { front: 'inglese', back: 'English (man or woman)', lang: IT },
                ],
                text: '<p>Many nationalities end in <b>-o</b> for a man and <b>-a</b> for a woman. Words that end in <b>-e</b>, like <i lang="it">inglese</i> or <i lang="it">francese</i>, stay the same for both.</p>',
              },
              {
                title: 'Recap',
                points: [
                  '<b lang="it">Mi chiamo…</b>: my name is…',
                  '<b lang="it">Come ti chiami?</b> to a friend, <b lang="it">Come si chiama?</b> to a stranger.',
                  '<b lang="it">Piacere!</b>: nice to meet you.',
                  '<b lang="it">Sono di</b> + city, <b lang="it">sono</b> + nationality: <i lang="it">italiano</i> (man), <i lang="it">italiana</i> (woman).',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'How do you politely ask a stranger their name?',
                options: ['Come si chiama?', 'Come ti chiami?', 'Di dove sei?', 'Mi chiamo?'], answer: 'Come si chiama?',
                explain: '<b lang="it">Come si chiama?</b> is the polite Lei form. <i lang="it">Come ti chiami?</i> is for friends.', hint: 'strangers get the Lei form.' },
              { type: 'choice', prompt: 'Listen. What does it mean?', say: { text: 'Piacere!', lang: IT },
                options: ['Nice to meet you!', 'Please!', 'See you soon!', 'Thank you!'], answer: 'Nice to meet you!',
                explain: '<i lang="it">Piacere</i> means <b>nice to meet you</b>. It’s what Giulia said.', hint: 'it’s what you say right after hearing someone’s name.' },
              { type: 'tf', prompt: 'True or false?', statement: 'A woman from Italy says: “Sono italiano.”', answer: false,
                explain: '<b>False.</b> A woman says <b lang="it">sono italiana</b>, with <b>-a</b>.', hint: '-o for a man, -a for a woman.' },
              { type: 'order', prompt: 'Build the sentence: “My name is Anna, I’m from Rome.”',
                items: ['Mi', 'chiamo', 'Anna,', 'sono', 'di', 'Roma.'],
                explain: '<b lang="it">Mi chiamo Anna, sono di Roma.</b>', hint: 'name first, then the city with “di”.' },
            ],
          },
          {
            id: 'it-cafe',
            title: 'At the café',
            minutes: 15,
            slides: [
              {
                title: 'Ordering',
                art: CAFE,
                phrases: [
                  { es: 'Vorrei un caffè, per favore.', en: 'I’d like a coffee, please.', lang: IT },
                  { es: 'Un cappuccino, per favore.', en: 'A cappuccino, please.', lang: IT },
                  { es: 'Grazie!', en: 'Thank you!', lang: IT },
                  { es: 'Prego.', en: 'You’re welcome.', lang: IT },
                ],
                text: '<p><b lang="it">Vorrei</b> (“I would like”) is the polite way to order anything. Add <b lang="it">per favore</b> (“please”). When you say <i lang="it">grazie</i>, the reply is <i lang="it">prego</i>.</p>',
              },
              {
                title: 'On the menu',
                cards: [
                  { front: 'un caffè', back: 'an espresso', lang: IT },
                  { front: 'un cappuccino', back: 'a milky coffee (mornings!)', lang: IT },
                  { front: 'un cornetto', back: 'a croissant', lang: IT },
                  { front: 'un’acqua', back: 'a bottle of water', lang: IT },
                ],
                text: '<p>In Italy, <b lang="it">un caffè</b> means a small espresso. Most Italians drink cappuccino only in the morning.</p>',
              },
              {
                title: 'Numbers 1 to 10',
                phrases: [
                  { es: 'uno, due, tre', en: '1, 2, 3', lang: IT },
                  { es: 'quattro, cinque, sei', en: '4, 5, 6', lang: IT },
                  { es: 'sette, otto', en: '7, 8 (otto: like Otto’s eight arms!)', lang: IT },
                  { es: 'nove, dieci', en: '9, 10', lang: IT },
                ],
                text: '<p>Tap each group to hear it, then say it out loud. You’ll need these to understand prices.</p>',
              },
              {
                title: 'Paying',
                art: PAY,
                phrases: [
                  { es: 'Quanto costa?', en: 'How much does it cost?', lang: IT },
                  { es: 'Quant’è?', en: 'How much is it? (the total)', lang: IT },
                  { es: 'Un euro e venti.', en: 'One euro twenty.', lang: IT },
                ],
                text: '<p>In many Italian bars you pay at the till (<b lang="it">la cassa</b>) first, then show your receipt at the counter to get your coffee.</p>',
              },
              {
                title: 'Recap',
                points: [
                  '<b lang="it">Vorrei…, per favore</b>: I’d like…, please.',
                  '<b lang="it">Grazie</b> means thank you; the answer is <b lang="it">prego</b>.',
                  '<b lang="it">Un caffè</b> is an espresso.',
                  '<b lang="it">Uno, due, tre… otto… dieci</b>: 1 to 10.',
                  '<b lang="it">Quant’è?</b> asks how much you owe.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Listen. What does it mean?', say: { text: 'Vorrei un cappuccino, per favore.', lang: IT },
                options: ['I’d like a cappuccino, please.', 'How much is a cappuccino?', 'A cappuccino, thank you.', 'Do you have a cappuccino?'], answer: 'I’d like a cappuccino, please.',
                explain: '<i lang="it">Vorrei</i> = I’d like, <i lang="it">per favore</i> = please.', hint: 'vorrei is the polite way to order.' },
              { type: 'choice', prompt: 'What number is <i lang="it">otto</i>?',
                options: ['8', '6', '7', '9'], answer: '8',
                explain: '<b lang="it">Otto</b> is 8, one for each of Otto’s arms.', hint: 'count Otto’s arms.' },
              { type: 'tf', prompt: 'True or false?', statement: '“Prego” means “please”.', answer: false,
                explain: '<b>False.</b> “Please” is <b lang="it">per favore</b>. <b lang="it">Prego</b> is “you’re welcome”, the reply to <i lang="it">grazie</i>.', hint: 'what does the barista say after you say grazie?' },
              { type: 'order', prompt: 'Build the order: “I’d like a coffee, please.”',
                items: ['Vorrei', 'un', 'caffè,', 'per', 'favore.'],
                explain: '<b lang="it">Vorrei un caffè, per favore.</b>', hint: 'start with “I’d like”.' },
            ],
          },
        ],
        soon: ['Numbers and prices', 'Getting around town'],
      },
    ],
    soonUnits: ['Food and the market'],
  });
})();
