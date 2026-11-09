'use strict';

/* Circuits · Electricity basics. Two lessons. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';

  const WATER = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Water analogy: a tall tank pushes water through a pipe. The tank height is voltage, the flow is current, and a narrow section of pipe is resistance.">
    <rect x="20" y="24" width="64" height="120" rx="6" fill="#FFFFFF" stroke="#3E63DD" stroke-width="3"/>
    <rect class="a-bob" x="23" y="52" width="58" height="89" fill="#9DB4F5"/>
    <text x="52" y="16" text-anchor="middle" ${T} font-size="12" fill="#2A44A8">V = pressure</text>
    <path d="M84 122 H170 L182 128 H214 L226 122 H304 M84 142 H170 L182 136 H214 L226 142 H304" fill="none" stroke="#3E63DD" stroke-width="3" stroke-linejoin="round"/>
    <path class="a-flow" d="M86 132 H302" stroke="#3E63DD" stroke-width="5" stroke-dasharray="8 10" stroke-linecap="round"/>
    <text x="262" y="112" text-anchor="middle" ${T} font-size="12" fill="#2A44A8">I = flow</text>
    <text x="198" y="166" text-anchor="middle" ${T} font-size="12" fill="#7A5000">R = narrow pipe</text>
    <path d="M198 152 V140" stroke="#D18A00" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  const LOOP = 'M60 40 H260 V160 H60 Z';
  const CIRCUIT = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A circuit with a battery, a bulb and a resistor. Electrons flow around it; the bulb brightness and the flow speed follow the current.">
    <path d="${LOOP}" fill="none" stroke="#1E1A3C" stroke-width="4" stroke-linejoin="round"/>
    <path class="electrons a-electrons" d="${LOOP}" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    <rect x="48" y="80" width="24" height="40" fill="#FFFBF2"/>
    <path d="M44 94 H76" stroke="#1E1A3C" stroke-width="3" stroke-linecap="round"/>
    <path d="M52 106 H68" stroke="#1E1A3C" stroke-width="6" stroke-linecap="round"/>
    <text class="v-label" x="34" y="104" text-anchor="end" ${T} font-size="14" fill="#1E1A3C">6 V</text>
    <circle class="glow" cx="160" cy="40" r="30" fill="#FFD25A" opacity="0.4"/>
    <circle cx="160" cy="40" r="15" fill="#FFF3C4" stroke="#1E1A3C" stroke-width="3"/>
    <path d="M154 44 Q157 34 160 44 Q163 34 166 44" fill="none" stroke="#B9770E" stroke-width="2"/>
    <rect x="250" y="70" width="20" height="60" fill="#FFFBF2"/>
    <path d="M260 70 l-9 5 l18 8 l-18 8 l18 8 l-18 8 l18 8 l-9 5" fill="none" stroke="#1E1A3C" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <text class="r-label" x="280" y="104" ${T} font-size="14" fill="#1E1A3C">3 Ω</text>
    <text class="i-label" x="160" y="186" text-anchor="middle" ${T} font-size="15" fill="#2A44A8">I = 2.00 A</text>
  </svg>`;

  const TRIANGLE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="The Ohm's law triangle: V on top, I and R side by side underneath.">
    <path d="M160 18 L282 182 H38 Z" fill="#FEF3DD" stroke="#D18A00" stroke-width="3" stroke-linejoin="round"/>
    <path d="M94 104 H226 M160 104 V182" stroke="#D18A00" stroke-width="3"/>
    <circle class="a-cycle" cx="160" cy="74" r="24" fill="#F5A524" opacity="0"/>
    <circle class="a-cycle" style="animation-delay: 1.5s" cx="118" cy="146" r="24" fill="#F5A524" opacity="0"/>
    <circle class="a-cycle" style="animation-delay: 3s" cx="202" cy="146" r="24" fill="#F5A524" opacity="0"/>
    <text x="160" y="86" text-anchor="middle" ${T} font-size="34" fill="#1E1A3C">V</text>
    <text x="118" y="158" text-anchor="middle" ${T} font-size="34" fill="#1E1A3C">I</text>
    <text x="202" y="158" text-anchor="middle" ${T} font-size="34" fill="#1E1A3C">R</text>
    <text x="160" y="156" text-anchor="middle" ${T} font-size="16" fill="#7A5000">×</text>
  </svg>`;

  const bulb = (x, y, cls) => `
    <g class="bulb ${cls}">
      <circle class="glow" cx="${x}" cy="${y}" r="26" fill="#FFD25A" opacity="0.45"/>
      <circle class="glass" cx="${x}" cy="${y}" r="14" fill="#FFF3C4" stroke="#1E1A3C" stroke-width="3"/>
      <path class="filament" d="M${x - 6} ${y + 4} Q${x - 3} ${y - 6} ${x} ${y + 4} Q${x + 3} ${y - 6} ${x + 6} ${y + 4}" fill="none" stroke="#B9770E" stroke-width="2"/>
    </g>`;
  const battery = (x, y) => `
    <rect x="${x - 12}" y="${y - 20}" width="24" height="40" fill="#FFFBF2"/>
    <path d="M${x - 16} ${y - 6} H${x + 16}" stroke="#1E1A3C" stroke-width="3" stroke-linecap="round"/>
    <path d="M${x - 8} ${y + 6} H${x + 8}" stroke="#1E1A3C" stroke-width="6" stroke-linecap="round"/>`;

  const SERIES = `
  <svg class="series-svg" viewBox="0 0 320 200" role="img" aria-label="Series circuit: one loop with a battery and two bulbs one after the other.">
    <path d="M40 40 H280 V160 H40 Z" fill="none" stroke="#1E1A3C" stroke-width="4" stroke-linejoin="round"/>
    <path class="flow-path a-electrons" d="M40 40 H280 V160 H40 Z" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    ${battery(40, 100)}
    ${bulb(120, 40, 'b1')}${bulb(200, 40, 'b2')}
    <text x="160" y="190" text-anchor="middle" ${T} font-size="12" fill="#4A4566">one path for the current</text>
  </svg>`;

  const PARALLEL = `
  <svg class="parallel-svg" viewBox="0 0 320 200" role="img" aria-label="Parallel circuit: two branches, each with its own bulb, both connected to the same battery.">
    <path d="M40 160 V40 H280 V160 Z M40 100 H280" fill="none" stroke="#1E1A3C" stroke-width="4" stroke-linejoin="round"/>
    <path class="flow-path branch1 a-electrons" d="M40 100 V40 H280 V100" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    <path class="flow-path branch2 a-electrons" d="M40 100 H280" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    <path class="flow-path a-electrons" d="M280 100 V160 H40 V100" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    ${battery(160, 160)}
    ${bulb(160, 40, 'b1')}${bulb(160, 100, 'b2')}
    <text x="160" y="194" text-anchor="middle" ${T} font-size="12" fill="#4A4566">each bulb has its own path</text>
  </svg>`;

  // Toggle "unscrew bulb 1" on a series/parallel slide.
  const breakable = (kind) => (root) => {
    const btn = root.querySelector('.break-btn');
    const svg = root.querySelector('.art svg');
    const out = root.querySelector('.readout');
    const update = () => {
      const broken = btn.getAttribute('aria-pressed') === 'true';
      svg.classList.toggle('broken', broken);
      btn.textContent = broken ? 'Screw bulb 1 back in' : 'Unscrew bulb 1';
      out.innerHTML = !broken ? 'Both bulbs are lit.'
        : kind === 'series' ? '<b>Both bulbs went out.</b> The only path for the current is broken.'
        : '<b class="ok">Bulb 2 stays lit!</b> Its branch is still a complete loop.';
    };
    btn.addEventListener('click', () => { btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true')); update(); });
    update();
  };
  const breakControls = '<div class="control"><button type="button" class="btn-chip break-btn" aria-pressed="false">Unscrew bulb 1</button><output class="readout"></output></div>';

  window.Octavo.addCourse({
    id: 'electricity',
    subject: 'Circuits',
    title: 'Electricity basics',
    blurb: 'Voltage, current and resistance, and how real circuits are wired.',
    artBg: '#FFFBF2',
    units: [
      {
        title: 'Current flow',
        lessons: [
          {
            id: 'el-ohm',
            title: "Ohm's law",
            minutes: 4,
            slides: [
              {
                title: 'Think of water in a pipe',
                art: WATER,
                text: '<p><b>Voltage (V)</b> is the push, like water pressure from a tall tank.<br><b>Current (I)</b> is how much charge flows, like litres per second.<br><b>Resistance (R)</b> slows the flow, like a narrow pipe.</p>',
              },
              {
                title: 'Try it yourself',
                art: CIRCUIT,
                controls: `
                <div class="control">
                  <label for="volt">Voltage <output class="v-out">6 V</output></label>
                  <input id="volt" type="range" min="1" max="12" value="6" step="1">
                  <label for="res">Resistance <output class="r-out">3 Ω</output></label>
                  <input id="res" type="range" min="1" max="10" value="3" step="1">
                  <output class="readout"></output>
                </div>`,
                text: '<p>More voltage pushes more current. More resistance lets less through. Watch the electrons and the bulb.</p>',
                setup(root) {
                  const v = root.querySelector('#volt');
                  const r = root.querySelector('#res');
                  const electrons = root.querySelector('.electrons');
                  const glow = root.querySelector('.glow');
                  const update = () => {
                    const V = Number(v.value);
                    const R = Number(r.value);
                    const I = V / R;
                    root.querySelector('.v-out').textContent = `${V} V`;
                    root.querySelector('.r-out').textContent = `${R} Ω`;
                    root.querySelector('.v-label').textContent = `${V} V`;
                    root.querySelector('.r-label').textContent = `${R} Ω`;
                    root.querySelector('.i-label').textContent = `I = ${I.toFixed(2)} A`;
                    electrons.style.animationDuration = `${Math.min(20, Math.max(0.35, 6 / I)).toFixed(2)}s`;
                    glow.setAttribute('opacity', String(Math.min(1, 0.08 + I / 8).toFixed(2)));
                    glow.setAttribute('r', String(18 + Math.min(16, I * 2)));
                    root.querySelector('.readout').innerHTML = `I = V ÷ R = ${V} ÷ ${R} = <b>${I.toFixed(2)} A</b>`;
                  };
                  v.addEventListener('input', update);
                  r.addEventListener('input', update);
                  update();
                },
              },
              {
                title: 'The formula',
                art: TRIANGLE,
                text: '<p><b>V = I × R</b>. Cover the one you want to find in the triangle:</p><p>I = V ÷ R &nbsp;·&nbsp; R = V ÷ I &nbsp;·&nbsp; V = I × R</p><p>Units: volts (V), amperes (A) and ohms (Ω).</p>',
              },
              {
                title: 'Recap',
                points: [
                  'Voltage pushes, current flows, resistance resists.',
                  '<b>V = I × R</b>, so <b>I = V ÷ R</b>.',
                  'Double the resistance and the current halves.',
                  'Resistance is measured in <b>ohms (Ω)</b>.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: '12 V is applied across a 4 Ω resistor. What is the current?',
                options: ['3 A', '48 A', '0.33 A', '16 A'], answer: '3 A',
                explain: 'I = V ÷ R = 12 ÷ 4 = <b>3 A</b>.', hint: 'divide the voltage by the resistance.' },
              { type: 'choice', prompt: 'The voltage stays the same but the resistance doubles. The current…',
                options: ['halves', 'doubles', 'stays the same', 'drops to zero'], answer: 'halves',
                explain: 'Current is inversely proportional to resistance, so it <b>halves</b>.', hint: 'try it on the slider slide: R up, I…?' },
              { type: 'tf', prompt: 'True or false?', statement: 'In the water analogy, voltage is like the water pressure.', answer: true,
                explain: '<b>True.</b> Voltage is the push that drives the current.', hint: 'what does the tall tank represent?' },
              { type: 'choice', prompt: 'Which unit measures resistance?',
                options: ['Ohm (Ω)', 'Ampere (A)', 'Volt (V)', 'Watt (W)'], answer: 'Ohm (Ω)',
                explain: 'Resistance is measured in <b>ohms</b>.', hint: 'its symbol is the Greek letter omega.' },
            ],
          },
          {
            id: 'el-series',
            title: 'Series and parallel',
            minutes: 3,
            slides: [
              {
                title: 'Series: one single path',
                art: SERIES,
                controls: breakControls,
                setup: breakable('series'),
                text: '<p>In a <b>series</b> circuit everything sits on one loop, so the same current flows through every bulb. Try unscrewing a bulb.</p>',
              },
              {
                title: 'Parallel: separate branches',
                art: PARALLEL,
                controls: breakControls,
                setup: breakable('parallel'),
                text: '<p>In a <b>parallel</b> circuit each bulb gets its own branch. If one fails, the others keep working. That’s how the sockets in your home are wired.</p>',
              },
              {
                title: 'Recap',
                points: [
                  '<b>Series:</b> one path. Break it anywhere and everything stops.',
                  'Bulbs in series share the voltage, so each is <b>dimmer</b>.',
                  '<b>Parallel:</b> separate branches that work independently.',
                  'Homes use <b>parallel</b> wiring.',
                ],
              },
            ],
            quiz: [
              { type: 'tf', prompt: 'True or false?', statement: 'In a series circuit, if one bulb breaks the others stay lit.', answer: false,
                explain: '<b>False.</b> In series there is only one path, so every bulb goes out.', hint: 'how many paths does a series circuit have?' },
              { type: 'choice', prompt: 'How are the sockets in your home wired?',
                options: ['In parallel', 'In series', 'Not connected', 'Only to the light switch'], answer: 'In parallel',
                explain: '<b>In parallel</b>, so each appliance works on its own.', hint: 'unplugging the TV doesn’t switch off the fridge.' },
              { type: 'choice', prompt: 'Two identical bulbs in series on one battery, compared with one bulb alone, are…',
                options: ['dimmer', 'brighter', 'exactly the same', 'off'], answer: 'dimmer',
                explain: 'They share the voltage, so each bulb is <b>dimmer</b>.', hint: 'the push is shared between them.' },
            ],
          },
        ],
        soon: ['Power and energy'],
      },
    ],
    soonUnits: ['Capacitors and timing'],
  });
})();
