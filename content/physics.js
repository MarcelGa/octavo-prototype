'use strict';

/* Physics · Forces and motion (Newton's laws). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const pick = (lang, en, sk) => (lang === 'sk' ? sk : en);

  const INERTIA = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${pick(lang, 'Two pucks are pushed. On ice the puck keeps sliding at the same speed; on grass a ball slows down and stops.', 'Dve postrčené telesá. Puk na ľade kĺže ďalej rovnakou rýchlosťou; lopta na tráve spomalí a zastaví sa.')}">
    <rect x="0" y="40" width="320" height="56" fill="#E6F4FF"/>
    <text x="12" y="30" ${T} font-size="12" fill="#2A44A8">${pick(lang, 'On ice: almost no friction', 'Na ľade: takmer žiadne trenie')}</text>
    <g class="a-glide"><ellipse cx="30" cy="70" rx="16" ry="8" fill="#1E1A3C"/><path d="M8 62 H-6 M8 70 H-10 M8 78 H-6" stroke="#9DB4F5" stroke-width="2" stroke-linecap="round"/></g>
    <rect x="0" y="130" width="320" height="56" fill="#E0F4E8"/>
    <g stroke="#30A46C" stroke-width="2" stroke-linecap="round">${Array.from({ length: 22 }, (_, i) => `<path d="M${8 + i * 15} 186 l3 -8 l3 8"/>`).join('')}</g>
    <text x="12" y="122" ${T} font-size="12" fill="#1C6B45">${pick(lang, 'On grass: friction slows it down', 'Na tráve: trenie ju spomaľuje')}</text>
    <g class="a-roll"><circle cx="30" cy="158" r="12" fill="#FF7A59"/><path d="M22 154 Q30 148 38 154" stroke="#fff" stroke-width="2" fill="none"/></g>
  </svg>`;

  const CART = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${pick(lang, 'A cart on a track. A hand pushes it with the chosen force and it accelerates to the right.', 'Vozík na dráhe. Ruka ho tlačí zvolenou silou a vozík zrýchľuje doprava.')}">
    <path d="M10 160 H310" stroke="#1E1A3C" stroke-width="3"/>
    <g stroke="#C9BCFF" stroke-width="2">${Array.from({ length: 11 }, (_, i) => `<path d="M${20 + i * 28} 160 v8"/>`).join('')}</g>
    <path d="M300 120 V160" stroke="#E5484D" stroke-width="3" stroke-dasharray="4 4"/>
    <text x="298" y="114" text-anchor="end" ${T} font-size="11" fill="#B4232A">${pick(lang, 'finish', 'cieľ')}</text>
    <g class="cart">
      <rect class="cart-body" x="30" y="112" width="60" height="34" rx="6" fill="#8E4EC6"/>
      <text class="cart-mass" x="60" y="134" text-anchor="middle" ${T} font-size="13" fill="#fff">2 kg</text>
      <circle cx="44" cy="150" r="8" fill="#1E1A3C"/><circle cx="76" cy="150" r="8" fill="#1E1A3C"/>
      <g class="push-arrow"><path d="M-2 129 H22" stroke="#FF7A59" stroke-width="5" stroke-linecap="round"/><path d="M14 120 L26 129 L14 138" fill="none" stroke="#FF7A59" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
    </g>
    <text class="a-label" x="160" y="40" text-anchor="middle" ${T} font-size="16" fill="#6A2E9E">a = ${pick(lang, '5.0', '5,0')} m/s²</text>
  </svg>`;

  const JET = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${pick(lang, 'Otto squirts water backwards out of his siphon and shoots forwards.', 'Otto vystrekne vodu zo sifónu dozadu a vystrelí dopredu.')}">
    <rect width="320" height="200" fill="#E6F4FF"/>
    <g class="a-jet">
      <g fill="#9DB4F5">
        <circle class="a-squirt" cx="120" cy="112" r="6"/><circle class="a-squirt" style="animation-delay: 0.25s" cx="120" cy="104" r="4"/>
        <circle class="a-squirt" style="animation-delay: 0.5s" cx="120" cy="118" r="5"/><circle class="a-squirt" style="animation-delay: 0.75s" cx="120" cy="110" r="3"/>
      </g>
      <path d="M126 108 C 140 96, 150 116, 168 108 M126 120 C 144 118, 150 134, 170 124 M130 96 C 146 84, 160 98, 174 92" stroke="#6C4CF1" stroke-width="9" stroke-linecap="round" fill="none"/>
      <ellipse cx="206" cy="100" rx="44" ry="34" fill="#6C4CF1"/>
      <circle cx="222" cy="92" r="10" fill="#fff"/><circle cx="244" cy="96" r="9" fill="#fff"/>
      <circle cx="225" cy="93" r="5" fill="#1E1A3C"/><circle cx="246" cy="97" r="4.5" fill="#1E1A3C"/>
      <path d="M232 116 Q240 120 248 114" stroke="#1E1A3C" stroke-width="3" fill="none" stroke-linecap="round"/>
    </g>
    <g ${T} font-size="12">
      <path d="M100 160 H40" stroke="#3E63DD" stroke-width="4" stroke-linecap="round"/><path d="M50 152 L40 160 L50 168" fill="none" stroke="#3E63DD" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="70" y="186" text-anchor="middle" fill="#2A44A8">${pick(lang, 'water pushed back', 'voda letí dozadu')}</text>
      <path d="M200 160 H270" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round"/><path d="M260 152 L270 160 L260 168" fill="none" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="236" y="186" text-anchor="middle" fill="#4B2FC9">${pick(lang, 'Otto pushed forward', 'Otto letí dopredu')}</text>
    </g>
  </svg>`;

  window.Octavo.addCourse({
    id: 'motion',
    subject: 'Physics',
    audience: 'adult',
    lecturer: 'novak',
    title: { en: 'Forces and motion', sk: 'Sily a pohyb' },
    blurb: { en: 'Newton’s three laws, from sliding pucks to jet-powered octopuses.', sk: 'Tri Newtonove pohybové zákony, od kĺzajúcich pukov po chobotnice na prúdový pohon.' },
    artBg: '#FAF5FF',
    units: [
      {
        title: { en: 'Newton’s laws', sk: 'Newtonove zákony' },
        lessons: [
          {
            id: 'ph-newton',
            title: { en: 'Newton’s three laws', sk: 'Tri Newtonove zákony' },
            minutes: 5,
            slides: [
              {
                title: { en: '1st law: inertia', sk: '1. zákon: zákon zotrvačnosti' },
                art: { en: INERTIA('en'), sk: INERTIA('sk') },
                text: {
                  en: '<p>An object keeps doing what it’s doing, staying still or moving at the same speed in a straight line, <b>unless a force acts on it</b>. Things slow down on Earth only because of forces like friction.</p>',
                  sk: '<p>Teleso robí ďalej to, čo robí: stojí na mieste alebo sa pohybuje rovnakou rýchlosťou po priamke, <b>kým naň nezačne pôsobiť sila</b>. Veci na Zemi spomaľujú len preto, že na ne pôsobia sily, napríklad trenie.</p>',
                },
              },
              {
                title: { en: '2nd law: F = m × a', sk: '2. zákon: F = m · a' },
                art: { en: CART('en'), sk: CART('sk') },
                controls: {
                  en: `
                <div class="control">
                  <label for="force">Force <output class="f-out">10 N</output></label>
                  <input id="force" type="range" min="2" max="20" value="10" step="1">
                  <label for="mass">Mass <output class="m-out">2 kg</output></label>
                  <input id="mass" type="range" min="1" max="10" value="2" step="1">
                  <button type="button" class="btn-chip push-btn">Push the cart</button>
                  <output class="readout"></output>
                </div>`,
                  sk: `
                <div class="control">
                  <label for="force">Sila <output class="f-out">10 N</output></label>
                  <input id="force" type="range" min="2" max="20" value="10" step="1">
                  <label for="mass">Hmotnosť <output class="m-out">2 kg</output></label>
                  <input id="mass" type="range" min="1" max="10" value="2" step="1">
                  <button type="button" class="btn-chip push-btn">Potlač vozík</button>
                  <output class="readout"></output>
                </div>`,
                },
                text: {
                  en: '<p>Acceleration = force ÷ mass. Push harder and it speeds up faster; add mass and it speeds up more slowly.</p>',
                  sk: '<p>Zrýchlenie = sila ÷ hmotnosť. Potlač silnejšie a vozík zrýchli rýchlejšie; pridaj hmotnosť a bude zrýchľovať pomalšie.</p>',
                },
                setup(root, api) {
                  const sk = !!api && api.lang === 'sk';
                  const num = (s) => (sk ? s.replace('.', ',') : s);
                  const f = root.querySelector('#force');
                  const m = root.querySelector('#mass');
                  const cart = root.querySelector('.cart');
                  const body = root.querySelector('.cart-body');
                  const readout = root.querySelector('.readout');
                  let running = false;
                  const update = () => {
                    const F = Number(f.value);
                    const M = Number(m.value);
                    const a = F / M;
                    root.querySelector('.f-out').textContent = `${F} N`;
                    root.querySelector('.m-out').textContent = `${M} kg`;
                    root.querySelector('.cart-mass').textContent = `${M} kg`;
                    root.querySelector('.a-label').textContent = `a = ${num(a.toFixed(1))} m/s²`;
                    body.setAttribute('width', String(44 + M * 4));
                    body.setAttribute('x', String(60 - (44 + M * 4) / 2));
                    readout.innerHTML = `a = F ÷ m = ${F} ÷ ${M} = <b>${num(a.toFixed(1))} m/s²</b>`;
                    return a;
                  };
                  const push = () => {
                    if (running) return;
                    running = true;
                    const a = update();
                    const t = Math.sqrt((2 * 4) / a); // time to cover a 4 m track from rest
                    cart.style.transition = 'none';
                    cart.style.transform = 'translateX(0)';
                    void cart.getBoundingClientRect();
                    cart.style.transition = `transform ${t.toFixed(2)}s cubic-bezier(0.55, 0, 1, 0.45)`;
                    cart.style.transform = 'translateX(200px)';
                    readout.innerHTML += sk
                      ? ` · v cieli za <b>${num(t.toFixed(1))} s</b>`
                      : ` · reached the finish in <b>${t.toFixed(1)} s</b>`;
                    setTimeout(() => { running = false; }, t * 1000 + 300);
                  };
                  f.addEventListener('input', () => { cart.style.transition = 'none'; cart.style.transform = 'translateX(0)'; update(); });
                  m.addEventListener('input', () => { cart.style.transition = 'none'; cart.style.transform = 'translateX(0)'; update(); });
                  root.querySelector('.push-btn').addEventListener('click', push);
                  update();
                },
              },
              {
                title: { en: '3rd law: action and reaction', sk: '3. zákon: zákon akcie a reakcie' },
                art: { en: JET('en'), sk: JET('sk') },
                text: {
                  en: '<p>For every action there is an <b>equal and opposite reaction</b>. Octopuses swim by jet propulsion: they squirt water backwards out of a tube called a siphon, and the water pushes them forwards. Rockets work the same way.</p>',
                  sk: '<p>Každá akcia vyvolá <b>rovnako veľkú reakciu opačného smeru</b>. Chobotnice plávajú prúdovým pohonom: vystreknú vodu dozadu cez trubicu zvanú sifón a voda ich odtlačí dopredu. Rakety fungujú rovnako.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: [
                  { en: '<b>1st law:</b> without a force, motion doesn’t change.', sk: '<b>1. zákon:</b> bez pôsobenia sily sa pohyb nemení.' },
                  { en: '<b>2nd law:</b> F = m × a, so a = F ÷ m.', sk: '<b>2. zákon:</b> F = m · a, teda a = F ÷ m.' },
                  { en: '<b>3rd law:</b> every push has an equal push back.', sk: '<b>3. zákon:</b> každé zatlačenie vyvolá rovnako veľký protitlak.' },
                  { en: 'Force is measured in <b>newtons (N)</b>.', sk: 'Silu meriame v <b>newtonoch (N)</b>.' },
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'A 2 kg cart is pushed with a force of 10 N. What is its acceleration?', sk: 'Vozík s hmotnosťou 2 kg tlačíme silou 10 N. Aké má zrýchlenie?' },
                options: { en: ['5 m/s²', '20 m/s²', '12 m/s²', '0.2 m/s²'], sk: ['5 m/s²', '20 m/s²', '12 m/s²', '0,2 m/s²'] },
                answer: { en: '5 m/s²', sk: '5 m/s²' },
                explain: { en: 'a = F ÷ m = 10 ÷ 2 = <b>5 m/s²</b>.', sk: 'a = F ÷ m = 10 ÷ 2 = <b>5 m/s²</b>.' },
                hint: { en: 'divide the force by the mass.', sk: 'vydeľ silu hmotnosťou.' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, či nepravda?' },
                statement: { en: 'A moving object slows down and stops by itself even when no force acts on it.', sk: 'Pohybujúce sa teleso samo spomalí a zastaví sa, aj keď naň nepôsobí žiadna sila.' }, answer: false,
                explain: { en: '<b>False.</b> Without a force it keeps moving. Friction is the force that usually stops things.', sk: '<b>Nepravda.</b> Bez sily sa pohybuje ďalej. Veci zvyčajne zastaví sila trenia.' },
                hint: { en: 'remember the puck on ice.', sk: 'spomeň si na puk na ľade.' } },
              { type: 'choice', prompt: { en: 'An octopus squirts water backwards. What happens to the octopus?', sk: 'Chobotnica vystrekne vodu dozadu. Čo sa stane s chobotnicou?' },
                options: { en: ['It moves forwards', 'It moves backwards', 'It stays still', 'It sinks'], sk: ['Pohne sa dopredu', 'Pohne sa dozadu', 'Zostane na mieste', 'Klesne ku dnu'] },
                answer: { en: 'It moves forwards', sk: 'Pohne sa dopredu' },
                explain: { en: 'Action and reaction: water goes back, so the octopus goes <b>forwards</b>.', sk: 'Akcia a reakcia: voda ide dozadu, takže chobotnica ide <b>dopredu</b>.' },
                hint: { en: 'every action has an opposite reaction.', sk: 'každá akcia má opačnú reakciu.' } },
              { type: 'choice', prompt: { en: 'The same force pushes a cart with double the mass. Its acceleration is…', sk: 'Rovnaká sila tlačí vozík s dvojnásobnou hmotnosťou. Jeho zrýchlenie je…' },
                options: { en: ['halved', 'doubled', 'the same', 'four times bigger'], sk: ['polovičné', 'dvojnásobné', 'rovnaké', 'štvornásobné'] },
                answer: { en: 'halved', sk: 'polovičné' },
                explain: { en: 'a = F ÷ m, so doubling m <b>halves</b> a.', sk: 'a = F ÷ m, takže dvojnásobná m znamená <b>polovičné</b> a.' },
                hint: { en: 'try heavier masses with the slider.', sk: 'skús posuvníkom nastaviť väčšiu hmotnosť.' } },
            ],
          },
        ],
        soon: [{ en: 'Gravity and weight', sk: 'Gravitácia a tiaž' }, { en: 'Momentum', sk: 'Hybnosť' }],
      },
    ],
    soonUnits: [{ en: 'Energy and work', sk: 'Energia a práca' }],
  });
})();
