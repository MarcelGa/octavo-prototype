'use strict';

/* Circuits · Electricity basics. Two lessons. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const pick = (lang, en, sk) => (lang === 'sk' ? sk : en);

  const WATER = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${pick(lang, 'Water analogy: a tall tank pushes water through a pipe. The tank height is voltage, the flow is current, and a narrow section of pipe is resistance.', 'Prirovnanie k vode: vysoká nádrž tlačí vodu cez rúru. Výška nádrže je napätie, prietok je prúd a zúžená časť rúry je odpor.')}">
    <rect x="20" y="24" width="64" height="120" rx="6" fill="#FFFFFF" stroke="#3E63DD" stroke-width="3"/>
    <rect class="a-bob" x="23" y="52" width="58" height="89" fill="#9DB4F5"/>
    <text x="52" y="16" text-anchor="middle" ${T} font-size="12" fill="#2A44A8">${pick(lang, 'V = pressure', 'U = tlak')}</text>
    <path d="M84 122 H170 L182 128 H214 L226 122 H304 M84 142 H170 L182 136 H214 L226 142 H304" fill="none" stroke="#3E63DD" stroke-width="3" stroke-linejoin="round"/>
    <path class="a-flow" d="M86 132 H302" stroke="#3E63DD" stroke-width="5" stroke-dasharray="8 10" stroke-linecap="round"/>
    <text x="262" y="112" text-anchor="middle" ${T} font-size="12" fill="#2A44A8">${pick(lang, 'I = flow', 'I = prietok')}</text>
    <text x="198" y="166" text-anchor="middle" ${T} font-size="12" fill="#7A5000">${pick(lang, 'R = narrow pipe', 'R = úzka rúra')}</text>
    <path d="M198 152 V140" stroke="#D18A00" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  const LOOP = 'M60 40 H260 V160 H60 Z';
  const CIRCUIT = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${pick(lang, 'A circuit with a battery, a bulb and a resistor. Electrons flow around it; the bulb brightness and the flow speed follow the current.', 'Obvod s batériou, žiarovkou a rezistorom. Elektróny ním obiehajú; jas žiarovky a rýchlosť toku závisia od prúdu.')}">
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
    <text class="i-label" x="160" y="186" text-anchor="middle" ${T} font-size="15" fill="#2A44A8">I = ${pick(lang, '2.00', '2,00')} A</text>
  </svg>`;

  const TRIANGLE = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${pick(lang, 'The Ohm\'s law triangle: V on top, I and R side by side underneath.', 'Trojuholník Ohmovho zákona: U hore, I a R vedľa seba pod ním.')}">
    <path d="M160 18 L282 182 H38 Z" fill="#FEF3DD" stroke="#D18A00" stroke-width="3" stroke-linejoin="round"/>
    <path d="M94 104 H226 M160 104 V182" stroke="#D18A00" stroke-width="3"/>
    <circle class="a-cycle" cx="160" cy="74" r="24" fill="#F5A524" opacity="0"/>
    <circle class="a-cycle" style="animation-delay: 1.5s" cx="118" cy="146" r="24" fill="#F5A524" opacity="0"/>
    <circle class="a-cycle" style="animation-delay: 3s" cx="202" cy="146" r="24" fill="#F5A524" opacity="0"/>
    <text x="160" y="86" text-anchor="middle" ${T} font-size="34" fill="#1E1A3C">${pick(lang, 'V', 'U')}</text>
    <text x="118" y="158" text-anchor="middle" ${T} font-size="34" fill="#1E1A3C">I</text>
    <text x="202" y="158" text-anchor="middle" ${T} font-size="34" fill="#1E1A3C">R</text>
    <text x="160" y="156" text-anchor="middle" ${T} font-size="16" fill="#7A5000">${pick(lang, '×', '·')}</text>
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

  const SERIES = (lang) => `
  <svg class="series-svg" viewBox="0 0 320 200" role="img" aria-label="${pick(lang, 'Series circuit: one loop with a battery and two bulbs one after the other.', 'Sériové zapojenie: jedna slučka s batériou a dvoma žiarovkami za sebou.')}">
    <path d="M40 40 H280 V160 H40 Z" fill="none" stroke="#1E1A3C" stroke-width="4" stroke-linejoin="round"/>
    <path class="flow-path a-electrons" d="M40 40 H280 V160 H40 Z" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    ${battery(40, 100)}
    ${bulb(120, 40, 'b1')}${bulb(200, 40, 'b2')}
    <text x="160" y="190" text-anchor="middle" ${T} font-size="12" fill="#4A4566">${pick(lang, 'one path for the current', 'jediná cesta pre prúd')}</text>
  </svg>`;

  const PARALLEL = (lang) => `
  <svg class="parallel-svg" viewBox="0 0 320 200" role="img" aria-label="${pick(lang, 'Parallel circuit: two branches, each with its own bulb, both connected to the same battery.', 'Paralelné zapojenie: dve vetvy, každá s vlastnou žiarovkou, obe pripojené k tej istej batérii.')}">
    <path d="M40 160 V40 H280 V160 Z M40 100 H280" fill="none" stroke="#1E1A3C" stroke-width="4" stroke-linejoin="round"/>
    <path class="flow-path branch1 a-electrons" d="M40 100 V40 H280 V100" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    <path class="flow-path branch2 a-electrons" d="M40 100 H280" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    <path class="flow-path a-electrons" d="M280 100 V160 H40 V100" fill="none" stroke="#3E63DD" stroke-width="7" stroke-linecap="round" stroke-dasharray="0.01 16"/>
    ${battery(160, 160)}
    ${bulb(160, 40, 'b1')}${bulb(160, 100, 'b2')}
    <text x="160" y="194" text-anchor="middle" ${T} font-size="12" fill="#4A4566">${pick(lang, 'each bulb has its own path', 'každá žiarovka má vlastnú cestu')}</text>
  </svg>`;

  // Toggle "unscrew bulb 1" on a series/parallel slide.
  const breakable = (kind) => (root, api) => {
    const L = (o) => (api && api.loc ? api.loc(o) : window.Octavo.loc(o));
    const btn = root.querySelector('.break-btn');
    const svg = root.querySelector('.art svg');
    const out = root.querySelector('.readout');
    const update = () => {
      const broken = btn.getAttribute('aria-pressed') === 'true';
      svg.classList.toggle('broken', broken);
      btn.textContent = broken
        ? L({ en: 'Screw bulb 1 back in', sk: 'Zaskrutkuj žiarovku 1 späť' })
        : L({ en: 'Unscrew bulb 1', sk: 'Vyskrutkuj žiarovku 1' });
      out.innerHTML = !broken ? L({ en: 'Both bulbs are lit.', sk: 'Obe žiarovky svietia.' })
        : kind === 'series' ? L({ en: '<b>Both bulbs went out.</b> The only path for the current is broken.', sk: '<b>Obe žiarovky zhasli.</b> Jediná cesta pre prúd je prerušená.' })
        : L({ en: '<b class="ok">Bulb 2 stays lit!</b> Its branch is still a complete loop.', sk: '<b class="ok">Žiarovka 2 svieti ďalej!</b> Jej vetva je stále uzavretá slučka.' });
    };
    btn.addEventListener('click', () => { btn.setAttribute('aria-pressed', String(btn.getAttribute('aria-pressed') !== 'true')); update(); });
    update();
  };
  const breakControls = {
    en: '<div class="control"><button type="button" class="btn-chip break-btn" aria-pressed="false">Unscrew bulb 1</button><output class="readout"></output></div>',
    sk: '<div class="control"><button type="button" class="btn-chip break-btn" aria-pressed="false">Vyskrutkuj žiarovku 1</button><output class="readout"></output></div>',
  };

  window.Octavo.addCourse({
    id: 'electricity',
    subject: 'Circuits',
    audience: 'adult',
    lecturer: 'kai',
    title: { en: 'Electricity basics', sk: 'Základy elektriny' },
    blurb: { en: 'Voltage, current and resistance, and how real circuits are wired.', sk: 'Napätie, prúd a odpor a ako sa zapájajú skutočné obvody.' },
    artBg: '#FFFBF2',
    units: [
      {
        title: { en: 'Current flow', sk: 'Elektrický prúd' },
        lessons: [
          {
            id: 'el-ohm',
            title: { en: "Ohm's law", sk: 'Ohmov zákon' },
            minutes: 4,
            slides: [
              {
                title: { en: 'Think of water in a pipe', sk: 'Predstav si vodu v rúre' },
                art: { en: WATER('en'), sk: WATER('sk') },
                text: {
                  en: '<p><b>Voltage (V)</b> is the push, like water pressure from a tall tank.<br><b>Current (I)</b> is how much charge flows, like litres per second.<br><b>Resistance (R)</b> slows the flow, like a narrow pipe.</p>',
                  sk: '<p><b>Napätie (U)</b> je to, čo tlačí, ako tlak vody z vysokej nádrže.<br><b>Prúd (I)</b> je množstvo náboja, ktoré pretečie, ako litre za sekundu.<br><b>Odpor (R)</b> tok brzdí, ako úzka rúra.</p>',
                },
              },
              {
                title: { en: 'Try it yourself', sk: 'Vyskúšaj si to' },
                art: { en: CIRCUIT('en'), sk: CIRCUIT('sk') },
                controls: {
                  en: `
                <div class="control">
                  <label for="volt">Voltage <output class="v-out">6 V</output></label>
                  <input id="volt" type="range" min="1" max="12" value="6" step="1">
                  <label for="res">Resistance <output class="r-out">3 Ω</output></label>
                  <input id="res" type="range" min="1" max="10" value="3" step="1">
                  <output class="readout"></output>
                </div>`,
                  sk: `
                <div class="control">
                  <label for="volt">Napätie <output class="v-out">6 V</output></label>
                  <input id="volt" type="range" min="1" max="12" value="6" step="1">
                  <label for="res">Odpor <output class="r-out">3 Ω</output></label>
                  <input id="res" type="range" min="1" max="10" value="3" step="1">
                  <output class="readout"></output>
                </div>`,
                },
                text: {
                  en: '<p>More voltage pushes more current. More resistance lets less through. Watch the electrons and the bulb.</p>',
                  sk: '<p>Väčšie napätie potlačí väčší prúd. Väčší odpor prepustí menej. Sleduj elektróny a žiarovku.</p>',
                },
                setup(root, api) {
                  const sk = !!api && api.lang === 'sk';
                  const num = (s) => (sk ? s.replace('.', ',') : s);
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
                    root.querySelector('.i-label').textContent = `I = ${num(I.toFixed(2))} A`;
                    electrons.style.animationDuration = `${Math.min(20, Math.max(0.35, 6 / I)).toFixed(2)}s`;
                    glow.setAttribute('opacity', String(Math.min(1, 0.08 + I / 8).toFixed(2)));
                    glow.setAttribute('r', String(18 + Math.min(16, I * 2)));
                    root.querySelector('.readout').innerHTML = `I = ${sk ? 'U' : 'V'} ÷ R = ${V} ÷ ${R} = <b>${num(I.toFixed(2))} A</b>`;
                  };
                  v.addEventListener('input', update);
                  r.addEventListener('input', update);
                  update();
                },
              },
              {
                title: { en: 'The formula', sk: 'Vzorec' },
                art: { en: TRIANGLE('en'), sk: TRIANGLE('sk') },
                text: {
                  en: '<p><b>V = I × R</b>. Cover the one you want to find in the triangle:</p><p>I = V ÷ R &nbsp;·&nbsp; R = V ÷ I &nbsp;·&nbsp; V = I × R</p><p>Units: volts (V), amperes (A) and ohms (Ω).</p>',
                  sk: '<p><b>U = I · R</b>. V trojuholníku zakry veličinu, ktorú hľadáš:</p><p>I = U ÷ R &nbsp;·&nbsp; R = U ÷ I &nbsp;·&nbsp; U = I · R</p><p>Jednotky: volty (V), ampéry (A) a ohmy (Ω).</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: [
                  { en: 'Voltage pushes, current flows, resistance resists.', sk: 'Napätie tlačí, prúd tečie, odpor bráni.' },
                  { en: '<b>V = I × R</b>, so <b>I = V ÷ R</b>.', sk: '<b>U = I · R</b>, teda <b>I = U ÷ R</b>.' },
                  { en: 'Double the resistance and the current halves.', sk: 'Zdvojnásob odpor a prúd klesne na polovicu.' },
                  { en: 'Resistance is measured in <b>ohms (Ω)</b>.', sk: 'Odpor meriame v <b>ohmoch (Ω)</b>.' },
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: '12 V is applied across a 4 Ω resistor. What is the current?', sk: 'Na rezistor 4 Ω pripojíme napätie 12 V. Aký prúd ním tečie?' },
                options: { en: ['3 A', '48 A', '0.33 A', '16 A'], sk: ['3 A', '48 A', '0,33 A', '16 A'] }, answer: { en: '3 A', sk: '3 A' },
                explain: { en: 'I = V ÷ R = 12 ÷ 4 = <b>3 A</b>.', sk: 'I = U ÷ R = 12 ÷ 4 = <b>3 A</b>.' },
                hint: { en: 'divide the voltage by the resistance.', sk: 'vydeľ napätie odporom.' } },
              { type: 'choice', prompt: { en: 'The voltage stays the same but the resistance doubles. The current…', sk: 'Napätie sa nemení, ale odpor sa zdvojnásobí. Prúd…' },
                options: { en: ['halves', 'doubles', 'stays the same', 'drops to zero'], sk: ['klesne na polovicu', 'sa zdvojnásobí', 'sa nezmení', 'klesne na nulu'] },
                answer: { en: 'halves', sk: 'klesne na polovicu' },
                explain: { en: 'Current is inversely proportional to resistance, so it <b>halves</b>.', sk: 'Prúd je nepriamo úmerný odporu, takže <b>klesne na polovicu</b>.' },
                hint: { en: 'try it on the slider slide: R up, I…?', sk: 'skús to na snímke s posuvníkmi: R hore, I…?' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, či nepravda?' },
                statement: { en: 'In the water analogy, voltage is like the water pressure.', sk: 'V prirovnaní k vode je napätie ako tlak vody.' }, answer: true,
                explain: { en: '<b>True.</b> Voltage is the push that drives the current.', sk: '<b>Pravda.</b> Napätie je tlak, ktorý poháňa prúd.' },
                hint: { en: 'what does the tall tank represent?', sk: 'čo predstavuje vysoká nádrž?' } },
              { type: 'choice', prompt: { en: 'Which unit measures resistance?', sk: 'V akej jednotke meriame odpor?' },
                options: { en: ['Ohm (Ω)', 'Ampere (A)', 'Volt (V)', 'Watt (W)'], sk: ['Ohm (Ω)', 'Ampér (A)', 'Volt (V)', 'Watt (W)'] },
                answer: { en: 'Ohm (Ω)', sk: 'Ohm (Ω)' },
                explain: { en: 'Resistance is measured in <b>ohms</b>.', sk: 'Odpor meriame v <b>ohmoch</b>.' },
                hint: { en: 'its symbol is the Greek letter omega.', sk: 'jeho značka je grécke písmeno omega.' } },
            ],
          },
          {
            id: 'el-series',
            title: { en: 'Series and parallel', sk: 'Sériové a paralelné zapojenie' },
            minutes: 3,
            slides: [
              {
                title: { en: 'Series: one single path', sk: 'Sériovo: jediná cesta' },
                art: { en: SERIES('en'), sk: SERIES('sk') },
                controls: breakControls,
                setup: breakable('series'),
                text: {
                  en: '<p>In a <b>series</b> circuit everything sits on one loop, so the same current flows through every bulb. Try unscrewing a bulb.</p>',
                  sk: '<p>Pri <b>sériovom</b> zapojení je všetko na jednej slučke, takže každou žiarovkou tečie rovnaký prúd. Skús jednu žiarovku vyskrutkovať.</p>',
                },
              },
              {
                title: { en: 'Parallel: separate branches', sk: 'Paralelne: samostatné vetvy' },
                art: { en: PARALLEL('en'), sk: PARALLEL('sk') },
                controls: breakControls,
                setup: breakable('parallel'),
                text: {
                  en: '<p>In a <b>parallel</b> circuit each bulb gets its own branch. If one fails, the others keep working. That’s how the sockets in your home are wired.</p>',
                  sk: '<p>Pri <b>paralelnom</b> zapojení má každá žiarovka vlastnú vetvu. Keď jedna zlyhá, ostatné fungujú ďalej. Presne tak sú zapojené zásuvky u teba doma.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: [
                  { en: '<b>Series:</b> one path. Break it anywhere and everything stops.', sk: '<b>Sériovo:</b> jedna cesta. Preruš ju kdekoľvek a všetko sa zastaví.' },
                  { en: 'Bulbs in series share the voltage, so each is <b>dimmer</b>.', sk: 'Žiarovky v sérii si delia napätie, takže každá svieti <b>slabšie</b>.' },
                  { en: '<b>Parallel:</b> separate branches that work independently.', sk: '<b>Paralelne:</b> samostatné vetvy, ktoré fungujú nezávisle od seba.' },
                  { en: 'Homes use <b>parallel</b> wiring.', sk: 'V domácnostiach sa používa <b>paralelné</b> zapojenie.' },
                ],
              },
            ],
            quiz: [
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, či nepravda?' },
                statement: { en: 'In a series circuit, if one bulb breaks the others stay lit.', sk: 'Keď v sériovom zapojení jedna žiarovka praskne, ostatné svietia ďalej.' }, answer: false,
                explain: { en: '<b>False.</b> In series there is only one path, so every bulb goes out.', sk: '<b>Nepravda.</b> V sérii je len jedna cesta, takže zhasnú všetky žiarovky.' },
                hint: { en: 'how many paths does a series circuit have?', sk: 'koľko ciest má sériový obvod?' } },
              { type: 'choice', prompt: { en: 'How are the sockets in your home wired?', sk: 'Ako sú zapojené zásuvky u teba doma?' },
                options: { en: ['In parallel', 'In series', 'Not connected', 'Only to the light switch'], sk: ['Paralelne', 'Sériovo', 'Nie sú prepojené', 'Iba k vypínaču svetla'] },
                answer: { en: 'In parallel', sk: 'Paralelne' },
                explain: { en: '<b>In parallel</b>, so each appliance works on its own.', sk: '<b>Paralelne</b>, takže každý spotrebič funguje samostatne.' },
                hint: { en: 'unplugging the TV doesn’t switch off the fridge.', sk: 'keď vytiahneš televízor zo zásuvky, chladnička sa nevypne.' } },
              { type: 'choice', prompt: { en: 'Two identical bulbs in series on one battery, compared with one bulb alone, are…', sk: 'Dve rovnaké žiarovky v sérii na jednej batérii svietia v porovnaní s jedinou žiarovkou…' },
                options: { en: ['dimmer', 'brighter', 'exactly the same', 'off'], sk: ['slabšie', 'jasnejšie', 'úplne rovnako', 'vôbec'] },
                answer: { en: 'dimmer', sk: 'slabšie' },
                explain: { en: 'They share the voltage, so each bulb is <b>dimmer</b>.', sk: 'Delia si napätie, takže každá žiarovka svieti <b>slabšie</b>.' },
                hint: { en: 'the push is shared between them.', sk: 'napätie si medzi sebou delia.' } },
            ],
          },
        ],
        soon: [{ en: 'Power and energy', sk: 'Výkon a energia' }],
      },
    ],
    soonUnits: [{ en: 'Capacitors and timing', sk: 'Kondenzátory a časovanie' }],
  });
})();
