'use strict';

/* Medicine · The nervous system. Three lessons across two units. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  // Picks the English or Slovak wording for SVG art built per language.
  const w = (L, en, sk) => (L === 'sk' ? sk : en);
  const both = (f) => ({ en: f('en'), sk: f('sk') });

  // A neuron drawn left (dendrites) to right (axon terminals). Reused by several slides.
  const NEURON = `
  <g fill="none" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M54 90 L32 72 L18 76 M32 72 L28 54 M52 112 L30 128 L16 124 M30 128 L32 146 M66 78 L60 52 M66 122 L62 150"/>
    <path d="M92 100 H262" stroke-width="5"/>
    <path d="M262 100 L284 84 M262 100 H286 M262 100 L284 116"/>
  </g>
  <g class="myelin" fill="#FFD6CC" stroke="#FF7A59" stroke-width="2">
    <rect x="100" y="92" width="34" height="16" rx="8"/><rect x="140" y="92" width="34" height="16" rx="8"/>
    <rect x="180" y="92" width="34" height="16" rx="8"/><rect x="220" y="92" width="34" height="16" rx="8"/>
  </g>
  <circle cx="70" cy="100" r="24" fill="#E6E0FF" stroke="#6C4CF1" stroke-width="4"/>
  <circle cx="70" cy="100" r="9" fill="#6C4CF1"/>
  <g fill="#6C4CF1"><circle cx="288" cy="82" r="5"/><circle cx="291" cy="100" r="5"/><circle cx="288" cy="118" r="5"/></g>`;

  const BODY = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'A body outline. The brain and spinal cord (central nervous system) are violet; nerves to the arms and legs (peripheral nervous system) are red, with signals travelling along them.', 'Obrys tela. Mozog a miecha (centrálna nervová sústava) sú fialové, nervy do rúk a nôh (periférna nervová sústava) sú červené a putujú po nich signály.')}">
    <g fill="#FBD9DB">
      <circle cx="160" cy="34" r="22"/><rect x="136" y="60" width="48" height="80" rx="20"/>
    </g>
    <g fill="none" stroke="#FBD9DB" stroke-width="18" stroke-linecap="round">
      <path d="M142 74 L106 130"/><path d="M178 74 L214 130"/><path d="M150 136 L140 190"/><path d="M170 136 L180 190"/>
    </g>
    <g fill="none" stroke="#E5484D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M160 76 H144 L106 132"/><path d="M160 76 H176 L214 132"/>
      <path d="M160 132 L150 140 L140 192"/><path d="M160 132 L170 140 L180 192"/>
      <path d="M160 100 L144 104 M160 100 L176 104"/>
    </g>
    <ellipse cx="160" cy="32" rx="14" ry="11" fill="#6C4CF1"/>
    <path d="M160 42 V134" stroke="#6C4CF1" stroke-width="6" stroke-linecap="round"/>
    <g fill="#FF7A59">
      <circle r="4.5"><animateMotion dur="2.6s" repeatCount="indefinite" path="M160 40 V76 H144 L106 132"/></circle>
      <circle r="4.5"><animateMotion dur="2.6s" begin="0.9s" repeatCount="indefinite" path="M160 40 V132 L170 140 L180 192"/></circle>
      <circle r="4.5"><animateMotion dur="2.6s" begin="1.7s" repeatCount="indefinite" path="M214 132 L176 76 H160 V40"/></circle>
    </g>
    <text x="186" y="30" ${T} font-size="14" fill="#4B2FC9">${w(L, 'CNS', 'CNS')}</text>
    <text x="186" y="44" font-family="Nunito, sans-serif" font-size="10" fill="#4A4566">${w(L, 'brain + spinal cord', 'mozog + miecha')}</text>
    <text x="222" y="126" ${T} font-size="14" fill="#B4232A">${w(L, 'PNS', 'PNS')}</text>
    <text x="222" y="140" font-family="Nunito, sans-serif" font-size="10" fill="#4A4566">${w(L, 'all other nerves', 'ostatné nervy')}</text>
  </svg>`;

  const NEURON_SPOTS = (L) => `<svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'A neuron: branching dendrites on the left, a round cell body, a long axon wrapped in myelin, and axon terminals on the right.', 'Neurón: vľavo rozvetvené dendrity, okrúhle telo bunky, dlhý axón obalený myelínom a vpravo zakončenia axónu.')}">${NEURON}</svg>`;

  const NEURON_FLOW = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'A glowing signal enters the dendrites, passes the cell body and travels along the axon to the terminals.', 'Žiariaci signál vstúpi do dendritov, prejde telom bunky a putuje po axóne k zakončeniam.')}">
    ${NEURON}
    <g>
      <circle r="11" fill="#FF7A59" opacity="0.3"><animateMotion dur="2.4s" repeatCount="indefinite" path="M18 76 L32 72 L54 90 L70 100 L262 100 L286 100"/></circle>
      <circle r="6" fill="#FF7A59"><animateMotion dur="2.4s" repeatCount="indefinite" path="M18 76 L32 72 L54 90 L70 100 L262 100 L286 100"/></circle>
    </g>
    <text x="8" y="44" ${T} font-size="13" fill="#4B2FC9">${w(L, 'IN', 'DNU')}</text>
    <path d="M20 48 L24 60" stroke="#4B2FC9" stroke-width="2.5" stroke-linecap="round"/>
    <text x="266" y="156" ${T} font-size="13" fill="#4B2FC9">${w(L, 'OUT', 'VON')}</text>
    <path d="M280 144 L286 130" stroke="#4B2FC9" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M120 140 H220" stroke="#C9BCFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M212 134 L222 140 L212 146" fill="none" stroke="#C9BCFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="126" y="164" font-family="Nunito, sans-serif" font-size="12" fill="#4A4566">${w(L, 'one direction only', 'len jedným smerom')}</text>
  </svg>`;

  const RACE = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'Two axons race. The myelinated one passes the signal in jumps and finishes much sooner than the bare axon.', 'Preteky dvoch axónov. Axón s myelínom posúva signál skokmi a je v cieli oveľa skôr ako holý axón.')}">
    <text x="24" y="34" ${T} font-size="13" fill="#1E1A3C">${w(L, 'With myelin · up to 120 m/s', 'S myelínom · až 120 m/s')}</text>
    <path d="M30 64 H292" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round"/>
    <g fill="#FFD6CC" stroke="#FF7A59" stroke-width="2">
      <rect x="38" y="56" width="44" height="16" rx="8"/><rect x="90" y="56" width="44" height="16" rx="8"/>
      <rect x="142" y="56" width="44" height="16" rx="8"/><rect x="194" y="56" width="44" height="16" rx="8"/>
      <rect x="246" y="56" width="40" height="16" rx="8"/>
    </g>
    <circle r="7" fill="#FF7A59"><animateMotion dur="1.6s" repeatCount="indefinite" calcMode="discrete" keyPoints="0;0.21;0.41;0.61;0.81;1" keyTimes="0;0.2;0.4;0.6;0.8;1" path="M30 64 H292"/></circle>
    <text x="24" y="124" ${T} font-size="13" fill="#1E1A3C">${w(L, 'Without myelin · about 1 m/s', 'Bez myelínu · asi 1 m/s')}</text>
    <path d="M30 152 H292" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round"/>
    <circle r="7" fill="#FF7A59"><animateMotion dur="6s" repeatCount="indefinite" path="M30 152 H292"/></circle>
    <path d="M300 48 V80 M300 136 V168" stroke="#1E1A3C" stroke-width="2" stroke-dasharray="3 3"/>
  </svg>`;

  // -------- lesson 2 art

  const ion = (x, y, sign, color, delay) =>
    `<g class="a-bob" style="animation-delay: ${delay}s"><circle cx="${x}" cy="${y}" r="10" fill="${color}"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" ${T} font-size="14" fill="#fff">${sign}</text></g>`;

  const MEMBRANE = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'A cell membrane. Outside there are many positive ions; inside it is negative. A meter reads minus 70 millivolts.', 'Bunková membrána. Vonku je veľa kladných iónov, vnútri je náboj záporný. Merač ukazuje mínus 70 milivoltov.')}">
    <text x="14" y="22" ${T} font-size="12" fill="#4A4566">${w(L, 'OUTSIDE the neuron', 'MIMO neurónu')}</text>
    ${ion(40, 52, '+', '#FF7A59', 0)}${ion(92, 40, '+', '#FF7A59', 0.6)}${ion(140, 60, '+', '#FF7A59', 1.1)}
    ${ion(190, 42, '+', '#FF7A59', 0.3)}${ion(236, 58, '+', '#FF7A59', 0.9)}${ion(284, 40, '+', '#FF7A59', 1.4)}
    <rect x="0" y="86" width="320" height="24" fill="#FFE3DB"/>
    <g fill="#FF7A59">${Array.from({ length: 20 }, (_, i) => `<circle cx="${8 + i * 16}" cy="88" r="4"/><circle cx="${8 + i * 16}" cy="108" r="4"/>`).join('')}</g>
    ${ion(50, 140, '−', '#6C4CF1', 0.4)}${ion(110, 156, '−', '#6C4CF1', 1.2)}${ion(170, 138, '−', '#6C4CF1', 0.2)}
    <text x="14" y="190" ${T} font-size="12" fill="#4A4566">${w(L, 'INSIDE the neuron', 'VNÚTRI neurónu')}</text>
    <rect x="214" y="128" width="92" height="52" rx="12" fill="#1E1A3C"/>
    <text x="260" y="150" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" fill="#C9BCFF">${w(L, 'voltage', 'napätie')}</text>
    <text x="260" y="170" text-anchor="middle" ${T} font-size="18" fill="#FFFFFF">−70 mV</text>
  </svg>`;

  // Voltage graph: y = 30 + (40 − mV) × 1.1667
  const SPIKE = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'Graph of voltage over time. After Fire is pressed, the voltage rises from minus 70 past the threshold to plus 40, falls below minus 70, then recovers.', 'Graf napätia v čase. Po spustení napätie stúpne z mínus 70 cez prah až na plus 40, klesne pod mínus 70 a potom sa vráti späť.')}">
    <path d="M40 20 V180 H306" fill="none" stroke="#1E1A3C" stroke-width="2"/>
    <g font-family="Nunito, sans-serif" font-size="10" fill="#4A4566" text-anchor="end">
      <text x="34" y="34">+40</text><text x="34" y="80">0</text><text x="34" y="162">−70</text>
    </g>
    <path d="M40 77 H306" stroke="#E4E0F5" stroke-width="1.5"/>
    <path d="M40 141 H306" stroke="#FF7A59" stroke-width="2" stroke-dasharray="5 5"/>
    <text x="300" y="136" text-anchor="end" ${T} font-size="10" fill="#C2412A">${w(L, 'threshold −55 mV', 'prah −55 mV')}</text>
    <path d="M40 158 H306" stroke="#C9BCFF" stroke-width="1.5" stroke-dasharray="2 4"/>
    <path class="ap-curve" pathLength="100" d="M40 158 H110 L128 141 L148 30 L172 170 C 188 174, 204 160, 228 158 H306" fill="none" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="ap-note" style="--d: 0.9s"><rect x="72" y="48" width="66" height="22" rx="11" fill="#FF7A59"/><text x="105" y="63" text-anchor="middle" ${T} font-size="11" fill="#fff">${w(L, 'Na⁺ rushes in', 'Na⁺ vteká dnu')}</text></g>
    <g class="ap-note" style="--d: 1.5s"><rect x="180" y="96" width="66" height="22" rx="11" fill="#12A594"/><text x="213" y="111" text-anchor="middle" ${T} font-size="11" fill="#fff">${w(L, 'K⁺ flows out', 'K⁺ vyteká von')}</text></g>
    <text x="173" y="196" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" fill="#4A4566">${w(L, 'time (about 2 milliseconds)', 'čas (asi 2 milisekundy)')}</text>
  </svg>`;

  const GAUGE = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'A voltage gauge with a threshold line at minus 55 millivolts.', 'Merač napätia s čiarou prahu pri mínus 55 milivoltoch.')}">
    <rect x="130" y="16" width="60" height="168" rx="30" fill="#FFFFFF" stroke="#E4E0F5" stroke-width="3"/>
    <rect class="gauge-fill" x="136" y="178" width="48" height="0" rx="24" fill="#C9BCFF"/>
    <path d="M118 100 H202" stroke="#FF7A59" stroke-width="3" stroke-dasharray="6 5"/>
    <text x="210" y="96" ${T} font-size="12" fill="#C2412A">${w(L, 'threshold', 'prah')}</text>
    <text x="210" y="110" font-family="Nunito, sans-serif" font-size="11" fill="#4A4566">−55 mV</text>
    <text x="114" y="182" text-anchor="end" font-family="Nunito, sans-serif" font-size="11" fill="#4A4566">−70 mV</text>
    <g class="bolt" opacity="0"><path d="M60 40 L36 92 H56 L46 140 L84 78 H62 L74 40 Z" fill="#F5A524" stroke="#B9770E" stroke-width="2" stroke-linejoin="round"/></g>
    <text class="gauge-mv" x="160" y="10" text-anchor="middle" ${T} font-size="0"> </text>
  </svg>`;

  const SYNAPSE = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'A synapse. Vesicles in the axon terminal release neurotransmitter molecules that cross a small gap and reach receptors on the next neuron.', 'Synapsia. Vezikuly v zakončení axónu uvoľnia molekuly neurotransmitera, ktoré prejdú cez úzku štrbinu k receptorom na ďalšom neuróne.')}">
    <path d="M100 0 V36 C 64 46, 64 96, 120 98 H200 C 256 96, 256 46, 220 36 V0 Z" fill="#E6E0FF" stroke="#6C4CF1" stroke-width="3"/>
    <g fill="#FFFFFF" stroke="#FF7A59" stroke-width="2.5">
      <circle cx="128" cy="62" r="12"/><circle cx="160" cy="72" r="12"/><circle cx="192" cy="62" r="12"/>
    </g>
    <g fill="#FF7A59"><circle cx="124" cy="60" r="2.5"/><circle cx="131" cy="65" r="2.5"/><circle cx="157" cy="70" r="2.5"/><circle cx="164" cy="75" r="2.5"/><circle cx="189" cy="60" r="2.5"/><circle cx="196" cy="65" r="2.5"/></g>
    <g fill="#FF7A59">
      <circle class="a-drop" cx="136" cy="104" r="4"/><circle class="a-drop" style="animation-delay: 0.5s" cx="160" cy="104" r="4"/>
      <circle class="a-drop" style="animation-delay: 1s" cx="184" cy="104" r="4"/><circle class="a-drop" style="animation-delay: 0.25s" cx="148" cy="104" r="4"/>
      <circle class="a-drop" style="animation-delay: 0.75s" cx="172" cy="104" r="4"/>
    </g>
    <path d="M56 200 V156 C 100 140, 220 140, 264 156 V200 Z" fill="#FFE3DB" stroke="#FF7A59" stroke-width="3"/>
    <g fill="#12A594"><rect x="128" y="138" width="14" height="8" rx="3"/><rect x="153" y="136" width="14" height="8" rx="3"/><rect x="178" y="138" width="14" height="8" rx="3"/></g>
    <text x="236" y="22" ${T} font-size="11" fill="#4B2FC9">${w(L, 'axon terminal', 'koniec axónu')}</text>
    <text x="232" y="122" ${T} font-size="11" fill="#1E1A3C">${w(L, 'synaptic gap', 'štrbina')}</text>
    <text x="8" y="122" ${T} font-size="11" fill="#C2412A">${w(L, 'neurotransmitters', 'neurotransmitery')}</text>
    <text x="198" y="190" ${T} font-size="11" fill="#0B6B60">${w(L, 'receptors', 'receptory')}</text>
  </svg>`;

  // -------- lesson 3 art

  const REFLEX = (animated) => (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'Reflex arc: a hand near a flame. A signal runs from a receptor in the hand along a sensory neuron into the spinal cord, crosses an interneuron and returns along a motor neuron to the arm muscle, which pulls the hand away.', 'Reflexný oblúk: ruka pri plameni. Signál beží z receptora v ruke po senzorickom neuróne do miechy, prejde cez interneurón a vráti sa po motorickom neuróne do svalu ruky, ktorý ruku odtiahne.')}">
    <g class="a-flicker">
      <path d="M44 194 C 22 184, 28 160, 42 146 C 46 162, 60 164, 58 178 C 58 188, 52 196, 44 194 Z" fill="#FF7A59"/>
      <path d="M44 192 C 36 186, 38 176, 44 168 C 48 176, 52 182, 50 186 C 49 190, 47 192, 44 192 Z" fill="#F5A524"/>
    </g>
    <g class="arm-jerk">
      <path d="M58 120 L178 104" stroke="#FBD9DB" stroke-width="22" stroke-linecap="round"/>
      <ellipse cx="44" cy="124" rx="20" ry="12" fill="#FBD9DB" stroke="#E5A3A6" stroke-width="2"/>
      <ellipse cx="122" cy="111" rx="24" ry="9" fill="#FFB4A0" stroke="#E5484D" stroke-width="2"/>
    </g>
    <circle cx="250" cy="96" r="44" fill="#F3F0FF" stroke="#6C4CF1" stroke-width="3"/>
    <path d="M238 70 C 230 84, 230 108, 238 122 H262 C 270 108, 270 84, 262 70 Z" fill="#D9D1FF"/>
    <text x="250" y="160" text-anchor="middle" ${T} font-size="12" fill="#4B2FC9">${w(L, 'spinal cord', 'miecha')}</text>
    <path d="M44 120 C 90 92, 170 80, 240 72" fill="none" stroke="#E5484D" stroke-width="3" stroke-linecap="round"/>
    <circle cx="214" cy="74" r="6" fill="#E5484D"/>
    <path d="M240 72 L254 98" stroke="#6C4CF1" stroke-width="3" stroke-linecap="round"/>
    <path d="M254 98 C 210 128, 160 124, 122 112" fill="none" stroke="#12A594" stroke-width="3" stroke-linecap="round"/>
    ${animated ? `
    <circle r="7" fill="#FF7A59" opacity="0">
      <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.95;1" dur="2s" begin="indefinite" fill="freeze"/>
      <animateMotion dur="2s" begin="indefinite" fill="freeze" path="M44 120 C 90 92, 170 80, 240 72 L254 98 C 210 128, 160 124, 122 112"/>
    </circle>` : ''}
    <text x="68" y="74" ${T} font-size="11" fill="#B4232A">${w(L, 'sensory', 'senzorický')}</text>
    <text x="150" y="146" ${T} font-size="11" fill="#0B6B60">${w(L, 'motor', 'motorický')}</text>
  </svg>`;

  const BRAIN = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'Side view of the brain: the large cerebrum on top, the cerebellum at the back underneath, and the brainstem connecting to the spinal cord.', 'Mozog z boku: hore veľký mozog, vzadu pod ním mozoček a mozgový kmeň, ktorý sa napája na miechu.')}">
    <path d="M166 132 C 168 156, 170 176, 174 200 H196 C 192 176, 192 156, 196 132 Z" fill="#8FE0D2" stroke="#12A594" stroke-width="3"/>
    <ellipse cx="222" cy="146" rx="38" ry="22" fill="#FFB4A0" stroke="#FF7A59" stroke-width="3"/>
    <g fill="none" stroke="#FF7A59" stroke-width="2" opacity="0.7"><path d="M192 140 Q222 132 252 142"/><path d="M194 152 Q222 146 254 154"/></g>
    <path d="M60 116 C 50 64, 104 26, 168 30 C 232 32, 274 70, 266 112 C 262 132, 240 140, 214 136 L118 138 C 92 138, 64 132, 60 116 Z" fill="#C9BCFF" stroke="#6C4CF1" stroke-width="3"/>
    <g fill="none" stroke="#6C4CF1" stroke-width="2.5" stroke-linecap="round" opacity="0.55">
      <path d="M98 60 C 110 74, 92 86, 106 100"/><path d="M140 40 C 150 60, 132 72, 148 92 C 156 104, 146 116, 154 128"/>
      <path d="M190 40 C 182 60, 202 70, 192 92"/><path d="M230 62 C 220 78, 240 90, 232 108"/><path d="M80 110 C 100 104, 120 116, 140 110"/>
    </g>
    <g fill="#FF7A59">
      <circle class="a-glow" cx="118" cy="70" r="5"/><circle class="a-glow" style="animation-delay: 0.6s" cx="176" cy="60" r="5"/>
      <circle class="a-glow" style="animation-delay: 1.2s" cx="214" cy="96" r="5"/><circle class="a-glow" style="animation-delay: 0.3s" cx="222" cy="148" r="4"/>
    </g>
    <text x="16" y="34" ${T} font-size="11" fill="#4A4566">${w(L, 'FRONT', 'VPREDU')}</text>
    <text x="270" y="190" ${T} font-size="11" fill="#4A4566">${w(L, 'BACK', 'VZADU')}</text>
  </svg>`;

  // -------- quiz art

  const NEURON_HIGHLIGHT = (L) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${w(L, 'A neuron with one part circled: the coral sleeve wrapped around the axon.', 'Neurón s jednou zakrúžkovanou časťou: koralovým obalom okolo axónu.')}">
    ${NEURON}
    <ellipse class="a-blink" cx="157" cy="100" rx="26" ry="20" fill="none" stroke="#1E1A3C" stroke-width="3" stroke-dasharray="6 4"/>
  </svg>`;

  window.Octavo.addCourse({
    id: 'nervous-system',
    subject: 'Medicine',
    audience: 'adult',
    lecturer: 'novak',
    title: { en: 'The nervous system', sk: 'Nervová sústava' },
    blurb: {
      en: 'How your body sends signals in milliseconds: neurons, nerve impulses, reflexes and the brain.',
      sk: 'Ako tvoje telo posiela signály za milisekundy: neuróny, nervové vzruchy, reflexy a mozog.',
    },
    artBg: '#FFF5F5',
    units: [
      {
        title: { en: 'Building blocks', sk: 'Stavebné kamene' },
        lessons: [
          {
            id: 'ns-neuron',
            title: { en: 'Meet the neuron', sk: 'Zoznám sa s neurónom' },
            minutes: 4,
            slides: [
              {
                title: { en: 'Your body’s messaging network', sk: 'Komunikačná sieť tvojho tela' },
                art: both(BODY),
                text: {
                  en: '<p>The nervous system carries signals around your body in milliseconds. It has two parts:</p><p><b>Central nervous system (CNS):</b> the brain and spinal cord, which make decisions.<br><b>Peripheral nervous system (PNS):</b> every nerve that branches out to your skin, muscles and organs.</p>',
                  sk: '<p>Nervová sústava roznáša signály po tvojom tele za milisekundy. Má dve časti:</p><p><b>Centrálna nervová sústava (CNS):</b> mozog a miecha, ktoré rozhodujú.<br><b>Periférna nervová sústava (PNS):</b> všetky nervy, ktoré sa rozvetvujú do kože, svalov a orgánov.</p>',
                },
              },
              {
                title: { en: 'Anatomy of a neuron', sk: 'Stavba neurónu' },
                art: both(NEURON_SPOTS),
                spots: [
                  { x: 9, y: 31,
                    label: { en: 'Dendrites', sk: 'Dendrity' },
                    info: { en: 'Branches that <b>receive</b> signals from other neurons. One neuron can have thousands of them.', sk: 'Výbežky, ktoré <b>prijímajú</b> signály od iných neurónov. Jeden neurón ich môže mať tisíce.' } },
                  { x: 22, y: 50,
                    label: { en: 'Cell body (soma)', sk: 'Telo bunky (soma)' },
                    info: { en: 'Holds the nucleus and keeps the cell alive. It adds up incoming signals and decides whether to fire.', sk: 'Obsahuje jadro a udržiava bunku pri živote. Sčítava prichádzajúce signály a rozhoduje, či neurón vyšle vzruch.' } },
                  { x: 61, y: 36,
                    label: { en: 'Axon', sk: 'Axón' },
                    info: { en: 'A long cable that carries the signal <b>away</b> from the cell body. Some axons are over a metre long.', sk: 'Dlhý „kábel“, ktorý vedie signál <b>preč</b> od tela bunky. Niektoré axóny merajú viac ako meter.' } },
                  { x: 37, y: 50,
                    label: { en: 'Myelin sheath', sk: 'Myelínová pošva' },
                    info: { en: 'Fatty insulation wrapped around the axon. It makes signals travel much faster.', sk: 'Tuková izolácia obalená okolo axónu. Vďaka nej sa signály šíria oveľa rýchlejšie.' } },
                  { x: 91, y: 50,
                    label: { en: 'Axon terminals', sk: 'Zakončenia axónu' },
                    info: { en: 'The endings that pass the signal on to the next neuron, a muscle or a gland.', sk: 'Konce, ktoré odovzdajú signál ďalšiemu neurónu, svalu alebo žľaze.' } },
                ],
                text: {
                  en: '<p>Neurons are the cells that carry signals. Your brain alone has about <b>86 billion</b> of them.</p>',
                  sk: '<p>Neuróny sú bunky, ktoré prenášajú signály. Len tvoj mozog ich má asi <b>86 miliárd</b>.</p>',
                },
              },
              {
                title: { en: 'Signals travel one way', sk: 'Signál ide jedným smerom' },
                art: both(NEURON_FLOW),
                text: {
                  en: '<p>A signal always follows the same route: in through the <b>dendrites</b>, through the <b>cell body</b>, down the <b>axon</b> and out at the <b>axon terminals</b>.</p>',
                  sk: '<p>Signál ide vždy rovnakou cestou: dnu cez <b>dendrity</b>, ďalej <b>telom bunky</b>, po <b>axóne</b> a von cez <b>zakončenia axónu</b>.</p>',
                },
              },
              {
                title: { en: 'Myelin is the express lane', sk: 'Myelín je rýchly pruh' },
                art: both(RACE),
                text: {
                  en: '<p>On a myelinated axon the signal <b>jumps</b> from one gap in the myelin to the next (the gaps are called <i>nodes of Ranvier</i>). That makes it up to about 100 times faster than on a bare axon.</p><p>In multiple sclerosis (MS), myelin is damaged, which slows or blocks signals.</p>',
                  sk: '<p>Na axóne s myelínom signál <b>preskakuje</b> z jednej medzery v myelíne na ďalšiu (tieto medzery sa volajú <i>Ranvierove zárezy</i>). Vďaka tomu je až asi 100-krát rýchlejší ako na holom axóne.</p><p>Pri skleróze multiplex (SM) je myelín poškodený, a preto sa signály spomaľujú alebo úplne zastavia.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: {
                  en: [
                    'The <b>CNS</b> is the brain and spinal cord; the <b>PNS</b> is all the other nerves.',
                    'Neurons receive with <b>dendrites</b> and send along the <b>axon</b>.',
                    'Signals go one way: dendrites → cell body → axon → terminals.',
                    '<b>Myelin</b> insulates the axon so signals jump and travel faster.',
                  ],
                  sk: [
                    '<b>CNS</b> tvorí mozog a miecha, <b>PNS</b> sú všetky ostatné nervy.',
                    'Neuróny prijímajú signál <b>dendritmi</b> a posielajú ho po <b>axóne</b>.',
                    'Signál ide jedným smerom: dendrity → telo bunky → axón → zakončenia.',
                    '<b>Myelín</b> izoluje axón, takže signál preskakuje a šíri sa rýchlejšie.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'What is the circled part of this neuron?', sk: 'Čo je zakrúžkovaná časť tohto neurónu?' },
                art: both(NEURON_HIGHLIGHT),
                options: { en: ['Myelin sheath', 'Dendrite', 'Cell body', 'Axon terminal'], sk: ['Myelínová pošva', 'Dendrit', 'Telo bunky', 'Zakončenie axónu'] },
                answer: { en: 'Myelin sheath', sk: 'Myelínová pošva' },
                explain: { en: 'That coral sleeve is the <b>myelin sheath</b>, the insulation around the axon.', sk: 'Ten koralový obal je <b>myelínová pošva</b>, izolácia okolo axónu.' },
                hint: { en: 'it’s the insulation wrapped around the axon.', sk: 'je to izolácia obalená okolo axónu.' } },
              { type: 'order',
                prompt: { en: 'Put the signal’s path through a neuron in order.', sk: 'Zoraď cestu signálu neurónom.' },
                items: { en: ['Dendrites', 'Cell body', 'Axon', 'Axon terminals'], sk: ['Dendrity', 'Telo bunky', 'Axón', 'Zakončenia axónu'] },
                explain: { en: 'In through the dendrites, through the cell body, along the axon, out at the terminals.', sk: 'Dnu cez dendrity, cez telo bunky, po axóne a von cez zakončenia.' },
                hint: { en: 'signals come IN through the branches and leave at the far end.', sk: 'signál vstupuje DNU cez výbežky a odchádza na opačnom konci.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, či nepravda?' },
                statement: { en: 'Myelin makes nerve signals travel more slowly.', sk: 'Myelín spomaľuje nervové signály.' },
                answer: false,
                explain: { en: '<b>False.</b> Myelin speeds signals up: they jump between the gaps in the myelin.', sk: '<b>Nepravda.</b> Myelín signály zrýchľuje: preskakujú medzi medzerami v myelíne.' },
                hint: { en: 'remember the race between the two axons.', sk: 'spomeň si na preteky dvoch axónov.' } },
              { type: 'choice',
                prompt: { en: 'Which of these is part of the central nervous system?', sk: 'Čo z tohto patrí do centrálnej nervovej sústavy?' },
                options: { en: ['Spinal cord', 'Sciatic nerve', 'Nerves in your fingers', 'Muscle fibres'], sk: ['Miecha', 'Sedací nerv', 'Nervy v prstoch', 'Svalové vlákna'] },
                answer: { en: 'Spinal cord', sk: 'Miecha' },
                explain: { en: 'The CNS is the <b>brain and spinal cord</b>. Everything else is peripheral.', sk: 'CNS tvorí <b>mozog a miecha</b>. Všetko ostatné je periférne.' },
                hint: { en: 'the CNS has just two parts.', sk: 'CNS má len dve časti.' } },
            ],
          },
          {
            id: 'ns-signal',
            title: { en: 'Firing a signal', sk: 'Vyslanie signálu' },
            minutes: 5,
            slides: [
              {
                title: { en: 'At rest: a charged battery', sk: 'V pokoji: nabitá batéria' },
                art: both(MEMBRANE),
                text: {
                  en: '<p>At rest, the inside of a neuron is about <b>−70 millivolts</b> compared with the outside. Pumps in the membrane keep it charged, like a tiny battery waiting to be used.</p>',
                  sk: '<p>V pokoji má vnútro neurónu oproti okoliu asi <b>−70 milivoltov</b>. Pumpy v membráne ho udržiavajú nabitý, ako malú batériu, ktorá čaká na použitie.</p>',
                },
              },
              {
                title: { en: 'The action potential', sk: 'Akčný potenciál' },
                art: both(SPIKE),
                replay: { en: 'Fire the neuron', sk: 'Spusti neurón' },
                autoplay: true,
                text: {
                  en: '<p>When the voltage reaches the <b>threshold</b> (about −55 mV), channels open and <b>sodium (Na⁺)</b> rushes in: the inside shoots up to +40 mV. Then <b>potassium (K⁺)</b> flows out and the voltage drops back. This spike is the nerve signal.</p>',
                  sk: '<p>Keď napätie dosiahne <b>prah</b> (asi −55 mV), otvoria sa kanály a dnu sa vrhne <b>sodík (Na⁺)</b>: napätie vnútri vyskočí na +40 mV. Potom <b>draslík (K⁺)</b> vytečie von a napätie znova klesne. Tento hrot je nervový vzruch.</p>',
                },
              },
              {
                title: { en: 'All or nothing', sk: 'Všetko alebo nič' },
                art: both(GAUGE),
                controls: {
                  en: `
                <div class="control">
                  <label for="stim">Stimulus strength</label>
                  <input id="stim" type="range" min="0" max="30" value="6" step="1">
                  <output class="readout" for="stim"></output>
                </div>`,
                  sk: `
                <div class="control">
                  <label for="stim">Sila podnetu</label>
                  <input id="stim" type="range" min="0" max="30" value="6" step="1">
                  <output class="readout" for="stim"></output>
                </div>`,
                },
                text: {
                  en: '<p>Drag the slider. Below the threshold nothing happens. Above it, the neuron fires a <b>full-size</b> spike every time. A stronger stimulus doesn’t make a bigger spike; it makes spikes come <b>more often</b>.</p>',
                  sk: '<p>Posuň jazdec. Pod prahom sa nič nedeje. Nad ním neurón zakaždým vyšle vzruch v <b>plnej veľkosti</b>. Silnejší podnet nevytvorí väčší hrot, ale hroty prídu <b>častejšie</b>.</p>',
                },
                setup(root, api) {
                  const input = root.querySelector('#stim');
                  const out = root.querySelector('.readout');
                  const fill = root.querySelector('.gauge-fill');
                  const bolt = root.querySelector('.bolt');
                  const update = () => {
                    const s = Number(input.value);
                    const mv = -70 + s;
                    const h = (Math.min(s, 30) / 30) * 156 + 6;
                    fill.setAttribute('y', String(178 - h + 6));
                    fill.setAttribute('height', String(h));
                    const fires = mv >= -55;
                    fill.setAttribute('fill', fires ? '#FF7A59' : '#C9BCFF');
                    bolt.setAttribute('opacity', fires ? '1' : '0');
                    bolt.classList.toggle('a-glow', fires);
                    out.innerHTML = fires
                      ? api.loc({
                        en: `<b class="ok">${mv} mV · it fires!</b> A full spike, every time.`,
                        sk: `<b class="ok">${mv} mV · vzruch!</b> Zakaždým celý hrot.`,
                      })
                      : api.loc({
                        en: `<b>${mv} mV · no signal.</b> Still below the threshold.`,
                        sk: `<b>${mv} mV · žiadny signál.</b> Stále pod prahom.`,
                      });
                  };
                  input.addEventListener('input', update);
                  update();
                },
              },
              {
                title: { en: 'Crossing the synapse', sk: 'Cez synapsiu' },
                art: both(SYNAPSE),
                text: {
                  en: '<p>Neurons don’t actually touch. At a <b>synapse</b> the signal is handed over by chemicals called <b>neurotransmitters</b>. They’re released from the axon terminal, cross a tiny gap and attach to <b>receptors</b> on the next cell.</p><p>Examples: dopamine, serotonin and acetylcholine.</p>',
                  sk: '<p>Neuróny sa v skutočnosti nedotýkajú. V <b>synapsii</b> signál odovzdajú chemické látky nazývané <b>neurotransmitery</b>. Uvoľnia sa zo zakončenia axónu, prejdú cez úzku štrbinu a naviažu sa na <b>receptory</b> ďalšej bunky.</p><p>Príklady: dopamín, serotonín a acetylcholín.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: {
                  en: [
                    'A resting neuron sits at about <b>−70 mV</b>.',
                    'At the <b>threshold (−55 mV)</b> Na⁺ rushes in and the neuron fires.',
                    'K⁺ flowing out brings the voltage back down.',
                    'Firing is <b>all or nothing</b>; a stronger stimulus means more spikes, not bigger ones.',
                    '<b>Neurotransmitters</b> carry the signal across the synapse.',
                  ],
                  sk: [
                    'Neurón v pokoji má asi <b>−70 mV</b>.',
                    'Pri <b>prahu (−55 mV)</b> sa dnu vrhne Na⁺ a neurón vyšle vzruch.',
                    'K⁺ vytekajúci von vráti napätie späť dole.',
                    'Vzruch platí <b>všetko alebo nič</b>: silnejší podnet znamená viac hrotov, nie väčšie.',
                    '<b>Neurotransmitery</b> prenesú signál cez synapsiu.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice',
                prompt: { en: 'What is the resting voltage inside a typical neuron?', sk: 'Aké je pokojové napätie vnútri bežného neurónu?' },
                options: { en: ['−70 mV', '0 mV', '+40 mV', '−55 mV'], sk: ['−70 mV', '0 mV', '+40 mV', '−55 mV'] },
                answer: { en: '−70 mV', sk: '−70 mV' },
                explain: { en: 'About <b>−70 mV</b>. −55 mV is the threshold and +40 mV is the top of a spike.', sk: 'Asi <b>−70 mV</b>. −55 mV je prah a +40 mV je vrchol hrotu.' },
                hint: { en: 'it’s the value on the voltmeter in the first slide.', sk: 'je to hodnota na voltmetri na prvej snímke.' } },
              { type: 'order',
                prompt: { en: 'Put the stages of an action potential in order.', sk: 'Zoraď fázy akčného potenciálu.' },
                items: {
                  en: ['Resting at −70 mV', 'Threshold reached at −55 mV', 'Na⁺ rushes in', 'K⁺ flows out'],
                  sk: ['Pokoj pri −70 mV', 'Dosiahnutý prah −55 mV', 'Na⁺ vteká dnu', 'K⁺ vyteká von'],
                },
                explain: { en: 'Rest → threshold → sodium in (voltage up) → potassium out (voltage down).', sk: 'Pokoj → prah → sodík dnu (napätie hore) → draslík von (napätie dole).' },
                hint: { en: 'sodium makes the voltage go UP, potassium brings it back DOWN.', sk: 'sodík napätie ZVÝŠI, draslík ho vráti DOLE.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, či nepravda?' },
                statement: { en: 'A stronger stimulus makes a bigger action potential.', sk: 'Silnejší podnet vyvolá väčší akčný potenciál.' },
                answer: false,
                explain: { en: '<b>False.</b> Firing is all or nothing. A stronger stimulus makes the neuron fire <b>more often</b>.', sk: '<b>Nepravda.</b> Vzruch platí všetko alebo nič. Pri silnejšom podnete neurón vysiela vzruchy <b>častejšie</b>.' },
                hint: { en: 'think about the slider slide.', sk: 'spomeň si na snímku s jazdcom.' } },
              { type: 'choice',
                prompt: { en: 'What carries the signal across a synapse?', sk: 'Čo prenáša signál cez synapsiu?' },
                options: { en: ['Neurotransmitters', 'Electrons', 'Red blood cells', 'Myelin'], sk: ['Neurotransmitery', 'Elektróny', 'Červené krvinky', 'Myelín'] },
                answer: { en: 'Neurotransmitters', sk: 'Neurotransmitery' },
                explain: { en: '<b>Neurotransmitters</b> are released, cross the gap and bind to receptors.', sk: '<b>Neurotransmitery</b> sa uvoľnia, prejdú cez štrbinu a naviažu sa na receptory.' },
                hint: { en: 'they are chemical messengers.', sk: 'sú to chemickí poslovia.' } },
            ],
          },
        ],
      },
      {
        title: { en: 'Brain & spinal cord', sk: 'Mozog a miecha' },
        lessons: [
          {
            id: 'ns-reflex',
            title: { en: 'Reflexes and the brain', sk: 'Reflexy a mozog' },
            minutes: 4,
            slides: [
              {
                title: { en: 'The reflex arc', sk: 'Reflexný oblúk' },
                art: both(REFLEX(true)),
                replay: { en: 'Touch the flame', sk: 'Dotkni sa plameňa' },
                autoplay: true,
                text: {
                  en: '<p>Touch something hot and your hand jerks away <b>before</b> you feel pain. The signal takes a shortcut through the <b>spinal cord</b>, so it doesn’t have to wait for the brain.</p>',
                  sk: '<p>Keď sa dotkneš niečoho horúceho, ruka ucukne ešte <b>predtým</b>, ako pocítiš bolesť. Signál ide skratkou cez <b>miechu</b>, takže nemusí čakať na mozog.</p>',
                },
              },
              {
                title: { en: 'Five steps, one blink', sk: 'Päť krokov za mihnutie oka' },
                art: both(REFLEX(false)),
                spots: [
                  { x: 14, y: 54,
                    label: { en: '1 · Receptor', sk: '1 · Receptor' },
                    info: { en: 'Heat sensors in the skin detect the flame.', sk: 'Tepelné receptory v koži zachytia plameň.' } },
                  { x: 46, y: 36,
                    label: { en: '2 · Sensory neuron', sk: '2 · Senzorický neurón' },
                    info: { en: 'Carries the alarm signal to the spinal cord.', sk: 'Vedie poplašný signál do miechy.' } },
                  { x: 79, y: 42,
                    label: { en: '3 · Interneuron', sk: '3 · Interneurón' },
                    info: { en: 'Inside the spinal cord, it passes the signal straight across. No brain needed.', sk: 'V mieche odovzdá signál priamo ďalej. Mozog netreba.' } },
                  { x: 52, y: 64,
                    label: { en: '4 · Motor neuron', sk: '4 · Motorický neurón' },
                    info: { en: 'Carries the command back out to the arm.', sk: 'Vedie povel späť von do ruky.' } },
                  { x: 36, y: 56,
                    label: { en: '5 · Effector (muscle)', sk: '5 · Efektor (sval)' },
                    info: { en: 'The arm muscle contracts and pulls the hand away.', sk: 'Sval ruky sa stiahne a odtiahne ruku.' } },
                ],
                text: {
                  en: '<p>The whole loop takes only a few hundredths of a second. The brain is told afterwards, which is when you feel the ouch.</p>',
                  sk: '<p>Celý okruh trvá len niekoľko stotín sekundy. Mozog sa to dozvie až potom, a vtedy pocítiš „au“.</p>',
                },
              },
              {
                title: { en: 'Three main parts of the brain', sk: 'Tri hlavné časti mozgu' },
                art: both(BRAIN),
                spots: [
                  { x: 44, y: 38,
                    label: { en: 'Cerebrum', sk: 'Veľký mozog' },
                    info: { en: 'The biggest part. Thinking, memory, language, the senses and voluntary movement.', sk: 'Najväčšia časť. Myslenie, pamäť, reč, zmysly a vôľou ovládaný pohyb.' } },
                  { x: 69, y: 73,
                    label: { en: 'Cerebellum', sk: 'Mozoček' },
                    info: { en: 'Balance, posture and smooth, coordinated movement.', sk: 'Rovnováha, držanie tela a plynulý, koordinovaný pohyb.' } },
                  { x: 57, y: 86,
                    label: { en: 'Brainstem', sk: 'Mozgový kmeň' },
                    info: { en: 'Automatic life support: breathing, heart rate, swallowing. It connects to the spinal cord.', sk: 'Automatické udržiavanie života: dýchanie, tep srdca, prehĺtanie. Napája sa na miechu.' } },
                ],
                text: {
                  en: '<p>Tap each region to find out what it does.</p>',
                  sk: '<p>Ťukni na každú časť a zisti, čo robí.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: {
                  en: [
                    'A reflex is fast because the <b>spinal cord</b> handles it.',
                    'Reflex arc: receptor → sensory neuron → interneuron → motor neuron → muscle.',
                    'The <b>cerebrum</b> thinks, the <b>cerebellum</b> balances, the <b>brainstem</b> keeps you alive automatically.',
                  ],
                  sk: [
                    'Reflex je rýchly, lebo ho vybaví <b>miecha</b>.',
                    'Reflexný oblúk: receptor → senzorický neurón → interneurón → motorický neurón → sval.',
                    '<b>Veľký mozog</b> myslí, <b>mozoček</b> drží rovnováhu, <b>mozgový kmeň</b> ťa automaticky udržiava nažive.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'order',
                prompt: { en: 'Put the reflex arc in order.', sk: 'Zoraď reflexný oblúk.' },
                items: {
                  en: ['Receptor in the skin', 'Sensory neuron', 'Interneuron in the spinal cord', 'Motor neuron', 'Muscle contracts'],
                  sk: ['Receptor v koži', 'Senzorický neurón', 'Interneurón v mieche', 'Motorický neurón', 'Sval sa stiahne'],
                },
                explain: { en: 'Sense it, send it in, cross the spinal cord, send it out, move.', sk: 'Zachytiť, poslať dnu, prejsť miechou, poslať von, pohnúť sa.' },
                hint: { en: 'the signal goes IN to the spinal cord, then back OUT to the arm.', sk: 'signál ide DNU do miechy a potom späť VON do ruky.' } },
              { type: 'choice',
                prompt: { en: 'Which part of the brain keeps your balance?', sk: 'Ktorá časť mozgu udržiava rovnováhu?' },
                options: { en: ['Cerebellum', 'Cerebrum', 'Brainstem', 'Spinal cord'], sk: ['Mozoček', 'Veľký mozog', 'Mozgový kmeň', 'Miecha'] },
                answer: { en: 'Cerebellum', sk: 'Mozoček' },
                explain: { en: 'The <b>cerebellum</b> coordinates balance and smooth movement.', sk: '<b>Mozoček</b> koordinuje rovnováhu a plynulý pohyb.' },
                hint: { en: 'it’s the small striped part at the back.', sk: 'je to malá pruhovaná časť vzadu.' } },
              { type: 'choice',
                prompt: { en: 'Why is a reflex so fast?', sk: 'Prečo je reflex taký rýchly?' },
                options: {
                  en: ['The spinal cord handles it without the brain', 'The signal skips the neurons', 'Muscles decide on their own', 'The brain predicts it'],
                  sk: ['Miecha ho vybaví bez mozgu', 'Signál vynechá neuróny', 'Svaly rozhodnú samy', 'Mozog ho predpovie'],
                },
                answer: { en: 'The spinal cord handles it without the brain', sk: 'Miecha ho vybaví bez mozgu' },
                explain: { en: 'The <b>spinal cord</b> turns the signal around, so there’s no trip to the brain first.', sk: '<b>Miecha</b> signál hneď obráti späť, takže nemusí najprv putovať do mozgu.' },
                hint: { en: 'think about where the shortcut happens.', sk: 'zamysli sa, kde vedie skratka.' } },
              { type: 'tf',
                prompt: { en: 'True or false?', sk: 'Pravda, či nepravda?' },
                statement: { en: 'The brainstem controls breathing and heart rate.', sk: 'Mozgový kmeň riadi dýchanie a tep srdca.' },
                answer: true,
                explain: { en: '<b>True.</b> The brainstem runs automatic, life-support functions.', sk: '<b>Pravda.</b> Mozgový kmeň riadi automatické životné funkcie.' },
                hint: { en: 'which part handles the things you never think about?', sk: 'ktorá časť sa stará o veci, na ktoré nikdy nemyslíš?' } },
            ],
          },
        ],
        soon: { en: ['The five senses', 'Sleep and the brain'], sk: ['Päť zmyslov', 'Spánok a mozog'] },
      },
    ],
    soonUnits: { en: ['Hormones and the endocrine system'], sk: ['Hormóny a endokrinná sústava'] },
  });
})();
