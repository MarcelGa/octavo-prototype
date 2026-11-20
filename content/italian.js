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

  const SKY = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk' ? 'Slnko putuje po oblohe od rána do noci. Pod každou časťou dňa je jej taliansky pozdrav: buongiorno, buonasera, buonanotte.' : 'The sun travels across the sky from morning to night. Under each part of the day is its Italian greeting: buongiorno, buonasera, buonanotte.'}">
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

  const TU_LEI = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk' ? 'Dve scénky. Vľavo Otto zdraví kamarátku: Ciao, come stai? Vpravo Otto zdraví staršieho neznámeho pána v klobúku: Buongiorno, come sta?' : 'Two scenes. On the left, Otto greets a friend: Ciao, come stai? On the right, Otto greets an older stranger in a hat: Buongiorno, come sta?'}">
    <rect width="320" height="200" fill="#F7FAEE"/>
    <path d="M160 16 V188" stroke="#D3E0AE" stroke-width="3" stroke-dasharray="6 6"/>
    <g class="a-bob">${otto(40, 126)}</g>
    ${person(118, 106, '#FF7A59')}
    <g class="a-bob" style="animation-delay: 0.8s">${otto(200, 126)}</g>
    ${person(278, 106, '#8C87A8', true)}
    ${bubble('a-say1', 10, 20, 140, [{ text: 'Ciao, come stai?' }], '#C9BCFF')}
    ${bubble('a-say2', 170, 20, 140, [{ text: 'Buongiorno,' }, { text: 'come sta?', color: OLIVE }], '#C9DB9A')}
    <text x="80" y="196" text-anchor="middle" ${T} font-size="12" fill="#4A4566">${l === 'sk' ? 'tu · kamaráti' : 'tu · friends'}</text>
    <text x="240" y="196" text-anchor="middle" ${T} font-size="12" fill="#4A4566">${l === 'sk' ? 'Lei · cudzí ľudia' : 'Lei · strangers'}</text>
  </svg>`;

  const CHAT = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk' ? 'Otto a žena menom Giulia sa predstavujú v bublinách: Ciao! Mi chiamo Otto. Come ti chiami? Mi chiamo Giulia. Piacere!' : 'Otto and a woman called Giulia introduce themselves in speech bubbles: Ciao! Mi chiamo Otto. Come ti chiami? Mi chiamo Giulia. Piacere!'}">
    <rect width="320" height="200" fill="#F7FAEE"/>
    <g class="a-bob">${otto(62, 150)}</g>
    ${person(262, 118, '#FF7A59')}
    ${bubble('a-say1', 14, 18, 168, [{ text: 'Ciao! Mi chiamo Otto.' }, { text: 'Come ti chiami?', color: '#4B2FC9' }], '#C9BCFF')}
    ${bubble('a-say2', 146, 62, 164, [{ text: 'Mi chiamo Giulia.' }, { text: 'Piacere!', color: '#C2412A' }], '#FFB4A0')}
  </svg>`;

  const CAFE = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk' ? 'Otto pri pulte v kaviarni s parujúcou šálkou kávy hovorí: Vorrei un caffè, per favore.' : 'Otto at a café counter with a steaming cup of coffee, saying: Vorrei un caffè, per favore.'}">
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

  const PAY = (l) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${l === 'sk' ? 'Pri pokladni: bloček za jednu kávu, 1 euro 20, a dve mince. Otto sa pýta: Quant’è?' : "At the till: a receipt for one coffee, 1 euro 20, and two coins. Otto asks: Quant'è?"}">
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
    title: { en: 'Italian: first steps', sk: 'Taliančina: prvé kroky' },
    blurb: {
      en: 'Greet people, introduce yourself and order at a café, with spoken Italian.',
      sk: 'Pozdrav ľudí, predstav sa a objednaj si v kaviarni, s hovorenou taliančinou.',
    },
    artBg: '#F7FAEE',
    units: [
      {
        title: { en: 'Ciao, Italia!', sk: 'Ciao, Italia!' },
        lessons: [
          {
            id: 'it-greetings',
            title: { en: 'Greetings and goodbyes', sk: 'Pozdravy a lúčenie' },
            minutes: 12,
            slides: [
              {
                title: { en: 'Greetings through the day', sk: 'Pozdravy počas dňa' },
                art: { en: SKY('en'), sk: SKY('sk') },
                phrases: [
                  { es: 'Buongiorno', en: { en: 'Good morning / good day (until mid-afternoon)', sk: 'Dobré ráno / dobrý deň (do popoludnia)' }, lang: IT },
                  { es: 'Buonasera', en: { en: 'Good evening (from late afternoon)', sk: 'Dobrý večer (od neskorého popoludnia)' }, lang: IT },
                  { es: 'Buonanotte', en: { en: 'Good night (when someone goes to bed)', sk: 'Dobrú noc (keď niekto ide spať)' }, lang: IT },
                ],
                text: {
                  en: '<p>Tap the speaker to hear each greeting. <b lang="it">Buonanotte</b> is only for saying goodnight. When you arrive somewhere in the evening, say <b lang="it">buonasera</b>.</p>',
                  sk: '<p>Ťukni na reproduktor a vypočuj si každý pozdrav. <b lang="it">Buongiorno</b> je naše „dobré ráno“ aj „dobrý deň“ v jednom. <b lang="it">Buonanotte</b> je, rovnako ako naše „dobrú noc“, len na rozlúčku pred spaním. Keď večer niekam prídeš, povedz <b lang="it">buonasera</b>.</p>',
                },
              },
              {
                title: { en: 'Hello and goodbye', sk: 'Ahoj a dovidenia' },
                cards: [
                  { front: 'ciao', back: { en: 'hi · bye (friends)', sk: 'ahoj · čau (s kamarátmi)' }, lang: IT },
                  { front: 'arrivederci', back: { en: 'goodbye', sk: 'dovidenia' }, lang: IT },
                  { front: 'a presto', back: { en: 'see you soon', sk: 'čoskoro sa uvidíme' }, lang: IT },
                  { front: 'a domani', back: { en: 'see you tomorrow', sk: 'uvidíme sa zajtra' }, lang: IT },
                ],
                text: {
                  en: '<p>Guess each one, then tap the card to flip it and hear it. <b lang="it">Ciao</b> works both ways, hello <i>and</i> goodbye, but only with people you know well.</p>',
                  sk: '<p>Najprv hádaj, potom ťukni na kartičku, otoč ju a vypočuj si ju. <b lang="it">Ciao</b> funguje ako naše „ahoj“: na privítanie <i>aj</i> na rozlúčku, ale len s ľuďmi, ktorých dobre poznáš.</p>',
                },
              },
              {
                title: { en: 'Tu or Lei?', sk: 'Tu, alebo Lei?' },
                art: { en: TU_LEI('en'), sk: TU_LEI('sk') },
                phrases: [
                  { es: 'Ciao, come stai?', en: { en: 'Hi, how are you? (tu: friends, family, children)', sk: 'Ahoj, ako sa máš? (tu: kamaráti, rodina, deti)' }, lang: IT },
                  { es: 'Buongiorno, come sta?', en: { en: 'Good morning, how are you? (Lei: strangers, older people, shops)', sk: 'Dobrý deň, ako sa máte? (Lei: cudzí, starší ľudia, obchody)' }, lang: IT },
                  { es: 'Bene, grazie. E tu?', en: { en: 'Fine, thanks. And you? (tu)', sk: 'Dobre, ďakujem. A ty? (tu)' }, lang: IT },
                  { es: 'Bene, grazie. E Lei?', en: { en: 'Fine, thanks. And you? (Lei)', sk: 'Dobre, ďakujem. A vy? (Lei)' }, lang: IT },
                ],
                text: {
                  en: '<p>Italian has two ways to say “you”. <b lang="it">Tu</b> is informal. <b lang="it">Lei</b> is polite, and it changes the verb: <i lang="it">come stai</i> becomes <i lang="it">come sta</i>. When in doubt with an adult you don’t know, use <b lang="it">Lei</b>.</p>',
                  sk: '<p>Toto už poznáš: taliančina tyká a vyká ako naše <b>ty</b> a <b>vy</b>. <b lang="it">Tu</b> je ty. Na vykanie však Taliani nepoužívajú „vy“, ale <b lang="it">Lei</b> (doslova „ona“), a sloveso dajú do tretej osoby: <i lang="it">come stai</i> (ako sa máš) sa zmení na <i lang="it">come sta</i> (ako sa máte). Komu doma vykáš, tomu povedz <b lang="it">Lei</b>.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: [
                  { en: '<b lang="it">Buongiorno</b> by day, <b lang="it">buonasera</b> in the evening, <b lang="it">buonanotte</b> at bedtime.',
                    sk: '<b lang="it">Buongiorno</b> cez deň, <b lang="it">buonasera</b> večer, <b lang="it">buonanotte</b> pred spaním.' },
                  { en: '<b lang="it">Ciao</b> means hi <i>and</i> bye, with friends.',
                    sk: '<b lang="it">Ciao</b> je ahoj na privítanie <i>aj</i> na rozlúčku, s kamarátmi.' },
                  { en: '<b lang="it">Arrivederci</b> is the safe goodbye with anyone.',
                    sk: '<b lang="it">Arrivederci</b> (dovidenia) je bezpečná rozlúčka s kýmkoľvek.' },
                  { en: 'Friends get <b lang="it">come stai?</b> (tu); strangers get <b lang="it">come sta?</b> (Lei).',
                    sk: 'Kamarátom <b lang="it">come stai?</b> (tu = ty), cudzím <b lang="it">come sta?</b> (Lei = vy).' },
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'Listen. What does it mean?', sk: 'Počúvaj. Čo to znamená?' }, say: { text: 'Buonasera', lang: IT },
                options: { en: ['Good evening', 'Good morning', 'Good night', 'See you soon'], sk: ['Dobrý večer', 'Dobré ráno', 'Dobrú noc', 'Čoskoro sa uvidíme'] },
                answer: { en: 'Good evening', sk: 'Dobrý večer' },
                explain: { en: '<i lang="it">Buonasera</i> means <b>good evening</b>.', sk: '<i lang="it">Buonasera</i> znamená <b>dobrý večer</b>.' },
                hint: { en: 'sera is the evening, when the sun goes down.', sk: 'sera je večer, keď slnko zapadá.' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'Ciao can mean both hello and goodbye.', sk: 'Ciao sa dá použiť na privítanie aj na rozlúčku.' }, answer: true,
                explain: { en: '<b>True.</b> <i lang="it">Ciao</i> works both ways, with people you know well.', sk: '<b>Pravda.</b> <i lang="it">Ciao</i> funguje ako naše ahoj, s ľuďmi, ktorých dobre poznáš.' },
                hint: { en: 'look at the flip cards again.', sk: 'pozri sa znova na kartičky.' } },
              { type: 'choice', prompt: { en: 'You meet your colleague’s grandmother for the first time. What do you say?', sk: 'Prvýkrát stretneš starú mamu kolegu. Čo povieš?' },
                options: ['Buongiorno, come sta?', 'Ciao, come stai?', 'Buonanotte!', 'A domani!'], answer: 'Buongiorno, come sta?',
                explain: { en: 'Someone older you don’t know gets the polite <b>Lei</b> form: <b lang="it">Buongiorno, come sta?</b>', sk: 'Staršiemu človeku, ktorého nepoznáš, vykáš, teda <b>Lei</b>: <b lang="it">Buongiorno, come sta?</b>' },
                hint: { en: 'strangers and older people get Lei.', sk: 'cudzím a starším ľuďom vykáš: Lei.' } },
              { type: 'order', prompt: { en: 'Build the reply to a friend: “Fine, thanks. And you?”', sk: 'Zostav odpoveď kamarátovi: „Dobre, ďakujem. A ty?“' },
                items: ['Bene,', 'grazie.', 'E', 'tu?'],
                explain: { en: '<b lang="it">Bene, grazie. E tu?</b> With a stranger you’d end with <i lang="it">E Lei?</i>', sk: '<b lang="it">Bene, grazie. E tu?</b> Cudziemu človeku povieš na konci <i lang="it">E Lei?</i> (A vy?)' },
                hint: { en: 'it starts with “fine”.', sk: 'začína sa slovom „dobre“.' } },
            ],
          },
          {
            id: 'it-introductions',
            title: { en: 'Introducing yourself', sk: 'Predstavenie' },
            minutes: 12,
            slides: [
              {
                title: { en: 'What’s your name?', sk: 'Ako sa voláš?' },
                art: { en: CHAT('en'), sk: CHAT('sk') },
                phrases: [
                  { es: 'Mi chiamo Otto.', en: { en: 'My name is Otto.', sk: 'Volám sa Otto.' }, lang: IT },
                  { es: 'Come ti chiami?', en: { en: 'What’s your name? (tu)', sk: 'Ako sa voláš? (tu)' }, lang: IT },
                  { es: 'Come si chiama?', en: { en: 'What’s your name? (Lei)', sk: 'Ako sa voláte? (Lei)' }, lang: IT },
                  { es: 'Piacere!', en: { en: 'Nice to meet you!', sk: 'Teší ma!' }, lang: IT },
                ],
                text: {
                  en: '<p><b lang="it">Mi chiamo</b> literally means “I call myself”. Ask a friend <i lang="it">come ti chiami?</i> and a stranger <i lang="it">come si chiama?</i></p>',
                  sk: '<p><b lang="it">Mi chiamo</b> je presne ako naše „volám sa“: aj tu je zvratné „sa“ (<i lang="it">mi</i>). Kamaráta sa opýtaš <i lang="it">come ti chiami?</i> (ako sa voláš?) a cudzieho človeka <i lang="it">come si chiama?</i> (ako sa voláte?).</p>',
                },
              },
              {
                title: { en: 'Where are you from?', sk: 'Odkiaľ si?' },
                phrases: {
                  en: [
                    { es: 'Di dove sei?', en: 'Where are you from? (tu)', lang: IT },
                    { es: 'Di dov’è?', en: 'Where are you from? (Lei)', lang: IT },
                    { es: 'Sono di Roma.', en: 'I’m from Rome. (di + a city)', lang: IT },
                    { es: 'Sono inglese.', en: 'I’m English.', lang: IT },
                  ],
                  sk: [
                    { es: 'Di dove sei?', en: 'Odkiaľ si? (tu)', lang: IT },
                    { es: 'Di dov’è?', en: 'Odkiaľ ste? (Lei)', lang: IT },
                    { es: 'Sono di Roma.', en: 'Som z Ríma. (di + mesto)', lang: IT },
                    { es: 'Sono slovacco. Sono slovacca.', en: 'Som Slovák. Som Slovenka.', lang: IT },
                  ],
                },
                text: {
                  en: '<p><b lang="it">Sono</b> means “I am”. Use <b lang="it">sono di…</b> with a city, and <b lang="it">sono…</b> with a nationality.</p>',
                  sk: '<p><b lang="it">Sono</b> znamená „som“. S mestom použi <b lang="it">sono di…</b> (som z…), s národnosťou len <b lang="it">sono…</b>. Taliansky názov mesta sa pritom nemení: <i lang="it">Roma</i>, <i lang="it">di Roma</i> (u nás Rím, z Ríma).</p>',
                },
              },
              {
                title: { en: 'Nationalities: -o or -a?', sk: 'Národnosti: -o, alebo -a?' },
                cards: [
                  { front: 'italiano', back: { en: 'Italian (man)', sk: 'Talian (muž)' }, lang: IT },
                  { front: 'italiana', back: { en: 'Italian (woman)', sk: 'Talianka (žena)' }, lang: IT },
                  { front: 'americano', back: { en: 'American (man)', sk: 'Američan (muž)' }, lang: IT },
                  { front: 'inglese', back: { en: 'English (man or woman)', sk: 'Angličan aj Angličanka' }, lang: IT },
                ],
                text: {
                  en: '<p>Many nationalities end in <b>-o</b> for a man and <b>-a</b> for a woman. Words that end in <b>-e</b>, like <i lang="it">inglese</i> or <i lang="it">francese</i>, stay the same for both.</p>',
                  sk: '<p>Mnohé národnosti majú pre muža koncovku <b>-o</b> a pre ženu <b>-a</b>. Aj my máme Slovák a Slovenka, po taliansky <i lang="it">slovacco</i> a <i lang="it">slovacca</i>. Slová na <b>-e</b>, ako <i lang="it">inglese</i> alebo <i lang="it">francese</i>, sú pre oboch rovnaké.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: [
                  { en: '<b lang="it">Mi chiamo…</b>: my name is…', sk: '<b lang="it">Mi chiamo…</b>: volám sa…' },
                  { en: '<b lang="it">Come ti chiami?</b> to a friend, <b lang="it">Come si chiama?</b> to a stranger.',
                    sk: '<b lang="it">Come ti chiami?</b> kamarátovi, <b lang="it">Come si chiama?</b> cudziemu človeku.' },
                  { en: '<b lang="it">Piacere!</b>: nice to meet you.', sk: '<b lang="it">Piacere!</b>: teší ma.' },
                  { en: '<b lang="it">Sono di</b> + city, <b lang="it">sono</b> + nationality: <i lang="it">italiano</i> (man), <i lang="it">italiana</i> (woman).',
                    sk: '<b lang="it">Sono di</b> + mesto, <b lang="it">sono</b> + národnosť: <i lang="it">italiano</i> (muž), <i lang="it">italiana</i> (žena).' },
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'How do you politely ask a stranger their name?', sk: 'Ako sa slušne opýtaš cudzieho človeka na meno?' },
                options: ['Come si chiama?', 'Come ti chiami?', 'Di dove sei?', 'Mi chiamo?'], answer: 'Come si chiama?',
                explain: { en: '<b lang="it">Come si chiama?</b> is the polite Lei form. <i lang="it">Come ti chiami?</i> is for friends.', sk: '<b lang="it">Come si chiama?</b> je vykanie (Lei). <i lang="it">Come ti chiami?</i> je pre kamarátov.' },
                hint: { en: 'strangers get the Lei form.', sk: 'cudzím vykáš: Lei.' } },
              { type: 'choice', prompt: { en: 'Listen. What does it mean?', sk: 'Počúvaj. Čo to znamená?' }, say: { text: 'Piacere!', lang: IT },
                options: { en: ['Nice to meet you!', 'Please!', 'See you soon!', 'Thank you!'], sk: ['Teší ma!', 'Prosím!', 'Čoskoro sa uvidíme!', 'Ďakujem!'] },
                answer: { en: 'Nice to meet you!', sk: 'Teší ma!' },
                explain: { en: '<i lang="it">Piacere</i> means <b>nice to meet you</b>. It’s what Giulia said.', sk: '<i lang="it">Piacere</i> znamená <b>teší ma</b>. Presne to povedala Giulia.' },
                hint: { en: 'it’s what you say right after hearing someone’s name.', sk: 'toto povieš hneď, ako sa dozvieš niečie meno.' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'A woman from Italy says: “Sono italiano.”', sk: 'Žena z Talianska povie: „Sono italiano.“' }, answer: false,
                explain: { en: '<b>False.</b> A woman says <b lang="it">sono italiana</b>, with <b>-a</b>.', sk: '<b>Nepravda.</b> Žena povie <b lang="it">sono italiana</b>, s <b>-a</b>.' },
                hint: { en: '-o for a man, -a for a woman.', sk: '-o pre muža, -a pre ženu.' } },
              { type: 'order', prompt: { en: 'Build the sentence: “My name is Anna, I’m from Rome.”', sk: 'Zostav vetu: „Volám sa Anna, som z Ríma.“' },
                items: ['Mi', 'chiamo', 'Anna,', 'sono', 'di', 'Roma.'],
                explain: { en: '<b lang="it">Mi chiamo Anna, sono di Roma.</b>', sk: '<b lang="it">Mi chiamo Anna, sono di Roma.</b> Doslova „volám sa Anna, som z Ríma“.' },
                hint: { en: 'name first, then the city with “di”.', sk: 'najprv meno, potom mesto s „di“.' } },
            ],
          },
          {
            id: 'it-cafe',
            title: { en: 'At the café', sk: 'V kaviarni' },
            minutes: 15,
            slides: [
              {
                title: { en: 'Ordering', sk: 'Objednávanie' },
                art: { en: CAFE('en'), sk: CAFE('sk') },
                phrases: [
                  { es: 'Vorrei un caffè, per favore.', en: { en: 'I’d like a coffee, please.', sk: 'Prosím si kávu.' }, lang: IT },
                  { es: 'Un cappuccino, per favore.', en: { en: 'A cappuccino, please.', sk: 'Jedno cappuccino, prosím.' }, lang: IT },
                  { es: 'Grazie!', en: { en: 'Thank you!', sk: 'Ďakujem!' }, lang: IT },
                  { es: 'Prego.', en: { en: 'You’re welcome.', sk: 'Prosím. / Nie je za čo.' }, lang: IT },
                ],
                text: {
                  en: '<p><b lang="it">Vorrei</b> (“I would like”) is the polite way to order anything. Add <b lang="it">per favore</b> (“please”). When you say <i lang="it">grazie</i>, the reply is <i lang="it">prego</i>.</p>',
                  sk: '<p><b lang="it">Vorrei</b> (doslova „chcel by som“ aj „chcela by som“, pre oboch rovnako) je zdvorilý spôsob, ako si objednať čokoľvek. Pozor na naše „prosím“: taliančina naň má dve slová. Keď o niečo žiadaš, povieš <b lang="it">per favore</b>. Keď ti niekto povie <i lang="it">grazie</i>, odpovieš <i lang="it">prego</i> (prosím, nie je za čo).</p>',
                },
              },
              {
                title: { en: 'On the menu', sk: 'Na jedálnom lístku' },
                cards: [
                  { front: 'un caffè', back: { en: 'an espresso', sk: 'espresso' }, lang: IT },
                  { front: 'un cappuccino', back: { en: 'a milky coffee (mornings!)', sk: 'káva s mliekom (len ráno!)' }, lang: IT },
                  { front: 'un cornetto', back: { en: 'a croissant', sk: 'croissant' }, lang: IT },
                  { front: 'un’acqua', back: { en: 'a bottle of water', sk: 'fľaša vody' }, lang: IT },
                ],
                text: {
                  en: '<p>In Italy, <b lang="it">un caffè</b> means a small espresso. Most Italians drink cappuccino only in the morning.</p>',
                  sk: '<p>V Taliansku je <b lang="it">un caffè</b> vždy malé espresso. Väčšina Talianov pije cappuccino len ráno.</p>',
                },
              },
              {
                title: { en: 'Numbers 1 to 10', sk: 'Čísla od 1 do 10' },
                phrases: [
                  { es: 'uno, due, tre', en: '1, 2, 3', lang: IT },
                  { es: 'quattro, cinque, sei', en: '4, 5, 6', lang: IT },
                  { es: 'sette, otto', en: { en: '7, 8 (otto: like Otto’s eight arms!)', sk: '7, 8 (otto: ako osem ramien chobotnice Otta!)' }, lang: IT },
                  { es: 'nove, dieci', en: '9, 10', lang: IT },
                ],
                text: {
                  en: '<p>Tap each group to hear it, then say it out loud. You’ll need these to understand prices.</p>',
                  sk: '<p>Ťukni na každú skupinu, vypočuj si ju a zopakuj nahlas. Budeš ich potrebovať pri cenách.</p>',
                },
              },
              {
                title: { en: 'Paying', sk: 'Platenie' },
                art: { en: PAY('en'), sk: PAY('sk') },
                phrases: [
                  { es: 'Quanto costa?', en: { en: 'How much does it cost?', sk: 'Koľko to stojí?' }, lang: IT },
                  { es: 'Quant’è?', en: { en: 'How much is it? (the total)', sk: 'Koľko platím? (spolu)' }, lang: IT },
                  { es: 'Un euro e venti.', en: { en: 'One euro twenty.', sk: 'Jedno euro dvadsať.' }, lang: IT },
                ],
                text: {
                  en: '<p>In many Italian bars you pay at the till (<b lang="it">la cassa</b>) first, then show your receipt at the counter to get your coffee.</p>',
                  sk: '<p>V mnohých talianskych baroch najprv zaplatíš pri pokladni (<b lang="it">la cassa</b>), potom ukážeš bloček pri pulte a dostaneš kávu.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: [
                  { en: '<b lang="it">Vorrei…, per favore</b>: I’d like…, please.', sk: '<b lang="it">Vorrei…, per favore</b>: prosím si…' },
                  { en: '<b lang="it">Grazie</b> means thank you; the answer is <b lang="it">prego</b>.', sk: '<b lang="it">Grazie</b> je ďakujem, odpoveď je <b lang="it">prego</b> (nie je za čo).' },
                  { en: '<b lang="it">Un caffè</b> is an espresso.', sk: '<b lang="it">Un caffè</b> je espresso.' },
                  { en: '<b lang="it">Uno, due, tre… otto… dieci</b>: 1 to 10.', sk: '<b lang="it">Uno, due, tre… otto… dieci</b>: od 1 do 10.' },
                  { en: '<b lang="it">Quant’è?</b> asks how much you owe.', sk: '<b lang="it">Quant’è?</b> sa pýta, koľko máš zaplatiť.' },
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'Listen. What does it mean?', sk: 'Počúvaj. Čo to znamená?' }, say: { text: 'Vorrei un cappuccino, per favore.', lang: IT },
                options: {
                  en: ['I’d like a cappuccino, please.', 'How much is a cappuccino?', 'A cappuccino, thank you.', 'Do you have a cappuccino?'],
                  sk: ['Prosím si cappuccino.', 'Koľko stojí cappuccino?', 'Cappuccino, ďakujem.', 'Máte cappuccino?'],
                },
                answer: { en: 'I’d like a cappuccino, please.', sk: 'Prosím si cappuccino.' },
                explain: { en: '<i lang="it">Vorrei</i> = I’d like, <i lang="it">per favore</i> = please.', sk: '<i lang="it">Vorrei</i> = chcel(a) by som, <i lang="it">per favore</i> = prosím.' },
                hint: { en: 'vorrei is the polite way to order.', sk: 'vorrei je zdvorilý spôsob, ako si objednať.' } },
              { type: 'choice', prompt: { en: 'What number is <i lang="it">otto</i>?', sk: 'Aké číslo je <i lang="it">otto</i>?' },
                options: ['8', '6', '7', '9'], answer: '8',
                explain: { en: '<b lang="it">Otto</b> is 8, one for each of Otto’s arms.', sk: '<b lang="it">Otto</b> je 8, ako osem ramien chobotnice Otta.' },
                hint: { en: 'count Otto’s arms.', sk: 'spočítaj Ottove ramená.' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: '“Prego” means “please”.', sk: 'Keď si objednávaš, „prosím“ je „prego“.' }, answer: false,
                explain: {
                  en: '<b>False.</b> “Please” is <b lang="it">per favore</b>. <b lang="it">Prego</b> is “you’re welcome”, the reply to <i lang="it">grazie</i>.',
                  sk: '<b>Nepravda.</b> Pri objednávaní je „prosím“ <b lang="it">per favore</b>. <b lang="it">Prego</b> je „prosím, nie je za čo“, odpoveď na <i lang="it">grazie</i>.',
                },
                hint: { en: 'what does the barista say after you say grazie?', sk: 'čo povie barista, keď mu povieš grazie?' } },
              { type: 'order', prompt: { en: 'Build the order: “I’d like a coffee, please.”', sk: 'Zostav objednávku: „Prosím si kávu.“' },
                items: ['Vorrei', 'un', 'caffè,', 'per', 'favore.'],
                explain: { en: '<b lang="it">Vorrei un caffè, per favore.</b>', sk: '<b lang="it">Vorrei un caffè, per favore.</b> Zdvorilé <i lang="it">vorrei</i>, potom káva a <i lang="it">per favore</i>.' },
                hint: { en: 'start with “I’d like”.', sk: 'začni zdvorilým „chcel(a) by som“.' } },
            ],
          },
        ],
        soon: { en: ['Numbers and prices', 'Getting around town'], sk: ['Čísla a ceny', 'Po meste'] },
      },
    ],
    soonUnits: { en: ['Food and the market'], sk: ['Jedlo a trh'] },
  });
})();
