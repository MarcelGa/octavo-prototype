'use strict';

/* Physics · Forces and motion (Newton's laws). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';

  const INERTIA = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Two pucks are pushed. On ice the puck keeps sliding at the same speed; on grass a ball slows down and stops.">
    <rect x="0" y="40" width="320" height="56" fill="#E6F4FF"/>
    <text x="12" y="30" ${T} font-size="12" fill="#2A44A8">On ice: almost no friction</text>
    <g class="a-glide"><ellipse cx="30" cy="70" rx="16" ry="8" fill="#1E1A3C"/><path d="M8 62 H-6 M8 70 H-10 M8 78 H-6" stroke="#9DB4F5" stroke-width="2" stroke-linecap="round"/></g>
    <rect x="0" y="130" width="320" height="56" fill="#E0F4E8"/>
    <g stroke="#30A46C" stroke-width="2" stroke-linecap="round">${Array.from({ length: 22 }, (_, i) => `<path d="M${8 + i * 15} 186 l3 -8 l3 8"/>`).join('')}</g>
    <text x="12" y="122" ${T} font-size="12" fill="#1C6B45">On grass: friction slows it down</text>
    <g class="a-roll"><circle cx="30" cy="158" r="12" fill="#FF7A59"/><path d="M22 154 Q30 148 38 154" stroke="#fff" stroke-width="2" fill="none"/></g>
  </svg>`;

  const CART = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A cart on a track. A hand pushes it with the chosen force and it accelerates to the right.">
    <path d="M10 160 H310" stroke="#1E1A3C" stroke-width="3"/>
    <g stroke="#C9BCFF" stroke-width="2">${Array.from({ length: 11 }, (_, i) => `<path d="M${20 + i * 28} 160 v8"/>`).join('')}</g>
    <path d="M300 120 V160" stroke="#E5484D" stroke-width="3" stroke-dasharray="4 4"/>
    <text x="298" y="114" text-anchor="end" ${T} font-size="11" fill="#B4232A">finish</text>
    <g class="cart">
      <rect class="cart-body" x="30" y="112" width="60" height="34" rx="6" fill="#8E4EC6"/>
      <text class="cart-mass" x="60" y="134" text-anchor="middle" ${T} font-size="13" fill="#fff">2 kg</text>
      <circle cx="44" cy="150" r="8" fill="#1E1A3C"/><circle cx="76" cy="150" r="8" fill="#1E1A3C"/>
      <g class="push-arrow"><path d="M-2 129 H22" stroke="#FF7A59" stroke-width="5" stroke-linecap="round"/><path d="M14 120 L26 129 L14 138" fill="none" stroke="#FF7A59" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>
    </g>
    <text class="a-label" x="160" y="40" text-anchor="middle" ${T} font-size="16" fill="#6A2E9E">a = 5.0 m/s²</text>
  </svg>`;

  const JET = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Otto squirts water backwards out of his siphon and shoots forwards.">
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
      <text x="70" y="186" text-anchor="middle" fill="#2A44A8">water pushed back</text>
      <path d="M200 160 H270" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round"/><path d="M260 152 L270 160 L260 168" fill="none" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="236" y="186" text-anchor="middle" fill="#4B2FC9">Otto pushed forward</text>
    </g>
  </svg>`;

  window.Octavo.addCourse({
    id: 'motion',
    subject: 'Physics',
    title: 'Forces and motion',
    blurb: 'Newton’s three laws, from sliding pucks to jet-powered octopuses.',
    artBg: '#FAF5FF',
    units: [
      {
        title: 'Newton’s laws',
        lessons: [
          {
            id: 'ph-newton',
            title: 'Newton’s three laws',
            minutes: 5,
            slides: [
              {
                title: '1st law: inertia',
                art: INERTIA,
                text: '<p>An object keeps doing what it’s doing, staying still or moving at the same speed in a straight line, <b>unless a force acts on it</b>. Things slow down on Earth only because of forces like friction.</p>',
              },
              {
                title: '2nd law: F = m × a',
                art: CART,
                controls: `
                <div class="control">
                  <label for="force">Force <output class="f-out">10 N</output></label>
                  <input id="force" type="range" min="2" max="20" value="10" step="1">
                  <label for="mass">Mass <output class="m-out">2 kg</output></label>
                  <input id="mass" type="range" min="1" max="10" value="2" step="1">
                  <button type="button" class="btn-chip push-btn">Push the cart</button>
                  <output class="readout"></output>
                </div>`,
                text: '<p>Acceleration = force ÷ mass. Push harder and it speeds up faster; add mass and it speeds up more slowly.</p>',
                setup(root) {
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
                    root.querySelector('.a-label').textContent = `a = ${a.toFixed(1)} m/s²`;
                    body.setAttribute('width', String(44 + M * 4));
                    body.setAttribute('x', String(60 - (44 + M * 4) / 2));
                    readout.innerHTML = `a = F ÷ m = ${F} ÷ ${M} = <b>${a.toFixed(1)} m/s²</b>`;
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
                    readout.innerHTML += ` · reached the finish in <b>${t.toFixed(1)} s</b>`;
                    setTimeout(() => { running = false; }, t * 1000 + 300);
                  };
                  f.addEventListener('input', () => { cart.style.transition = 'none'; cart.style.transform = 'translateX(0)'; update(); });
                  m.addEventListener('input', () => { cart.style.transition = 'none'; cart.style.transform = 'translateX(0)'; update(); });
                  root.querySelector('.push-btn').addEventListener('click', push);
                  update();
                },
              },
              {
                title: '3rd law: action and reaction',
                art: JET,
                text: '<p>For every action there is an <b>equal and opposite reaction</b>. Octopuses swim by jet propulsion: they squirt water backwards out of a tube called a siphon, and the water pushes them forwards. Rockets work the same way.</p>',
              },
              {
                title: 'Recap',
                points: [
                  '<b>1st law:</b> without a force, motion doesn’t change.',
                  '<b>2nd law:</b> F = m × a, so a = F ÷ m.',
                  '<b>3rd law:</b> every push has an equal push back.',
                  'Force is measured in <b>newtons (N)</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'A 2 kg cart is pushed with a force of 10 N. What is its acceleration?',
                options: ['5 m/s²', '20 m/s²', '12 m/s²', '0.2 m/s²'], answer: '5 m/s²',
                explain: 'a = F ÷ m = 10 ÷ 2 = <b>5 m/s²</b>.', hint: 'divide the force by the mass.' },
              { type: 'tf', prompt: 'True or false?', statement: 'A moving object slows down and stops by itself even when no force acts on it.', answer: false,
                explain: '<b>False.</b> Without a force it keeps moving. Friction is the force that usually stops things.', hint: 'remember the puck on ice.' },
              { type: 'choice', prompt: 'An octopus squirts water backwards. What happens to the octopus?',
                options: ['It moves forwards', 'It moves backwards', 'It stays still', 'It sinks'], answer: 'It moves forwards',
                explain: 'Action and reaction: water goes back, so the octopus goes <b>forwards</b>.', hint: 'every action has an opposite reaction.' },
              { type: 'choice', prompt: 'The same force pushes a cart with double the mass. Its acceleration is…',
                options: ['halved', 'doubled', 'the same', 'four times bigger'], answer: 'halved',
                explain: 'a = F ÷ m, so doubling m <b>halves</b> a.', hint: 'try heavier masses with the slider.' },
            ],
          },
        ],
        soon: ['Gravity and weight', 'Momentum'],
      },
    ],
    soonUnits: ['Energy and work'],
  });
})();
