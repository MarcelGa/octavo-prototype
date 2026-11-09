'use strict';

/* Medicine · The nervous system. Three lessons across two units. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';

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

  const BODY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A body outline. The brain and spinal cord (central nervous system) are violet; nerves to the arms and legs (peripheral nervous system) are red, with signals travelling along them.">
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
    <text x="186" y="30" ${T} font-size="14" fill="#4B2FC9">CNS</text>
    <text x="186" y="44" font-family="Nunito, sans-serif" font-size="10" fill="#4A4566">brain + spinal cord</text>
    <text x="222" y="126" ${T} font-size="14" fill="#B4232A">PNS</text>
    <text x="222" y="140" font-family="Nunito, sans-serif" font-size="10" fill="#4A4566">all other nerves</text>
  </svg>`;

  const NEURON_SPOTS = `<svg viewBox="0 0 320 200" role="img" aria-label="A neuron: branching dendrites on the left, a round cell body, a long axon wrapped in myelin, and axon terminals on the right.">${NEURON}</svg>`;

  const NEURON_FLOW = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A glowing signal enters the dendrites, passes the cell body and travels along the axon to the terminals.">
    ${NEURON}
    <g>
      <circle r="11" fill="#FF7A59" opacity="0.3"><animateMotion dur="2.4s" repeatCount="indefinite" path="M18 76 L32 72 L54 90 L70 100 L262 100 L286 100"/></circle>
      <circle r="6" fill="#FF7A59"><animateMotion dur="2.4s" repeatCount="indefinite" path="M18 76 L32 72 L54 90 L70 100 L262 100 L286 100"/></circle>
    </g>
    <text x="8" y="44" ${T} font-size="13" fill="#4B2FC9">IN</text>
    <path d="M20 48 L24 60" stroke="#4B2FC9" stroke-width="2.5" stroke-linecap="round"/>
    <text x="266" y="156" ${T} font-size="13" fill="#4B2FC9">OUT</text>
    <path d="M280 144 L286 130" stroke="#4B2FC9" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M120 140 H220" stroke="#C9BCFF" stroke-width="3" stroke-linecap="round"/>
    <path d="M212 134 L222 140 L212 146" fill="none" stroke="#C9BCFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="126" y="164" font-family="Nunito, sans-serif" font-size="12" fill="#4A4566">one direction only</text>
  </svg>`;

  const RACE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Two axons race. The myelinated one passes the signal in jumps and finishes much sooner than the bare axon.">
    <text x="24" y="34" ${T} font-size="13" fill="#1E1A3C">With myelin · up to 120 m/s</text>
    <path d="M30 64 H292" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round"/>
    <g fill="#FFD6CC" stroke="#FF7A59" stroke-width="2">
      <rect x="38" y="56" width="44" height="16" rx="8"/><rect x="90" y="56" width="44" height="16" rx="8"/>
      <rect x="142" y="56" width="44" height="16" rx="8"/><rect x="194" y="56" width="44" height="16" rx="8"/>
      <rect x="246" y="56" width="40" height="16" rx="8"/>
    </g>
    <circle r="7" fill="#FF7A59"><animateMotion dur="1.6s" repeatCount="indefinite" calcMode="discrete" keyPoints="0;0.21;0.41;0.61;0.81;1" keyTimes="0;0.2;0.4;0.6;0.8;1" path="M30 64 H292"/></circle>
    <text x="24" y="124" ${T} font-size="13" fill="#1E1A3C">Without myelin · about 1 m/s</text>
    <path d="M30 152 H292" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round"/>
    <circle r="7" fill="#FF7A59"><animateMotion dur="6s" repeatCount="indefinite" path="M30 152 H292"/></circle>
    <path d="M300 48 V80 M300 136 V168" stroke="#1E1A3C" stroke-width="2" stroke-dasharray="3 3"/>
  </svg>`;

  // -------- lesson 2 art

  const ion = (x, y, sign, color, delay) =>
    `<g class="a-bob" style="animation-delay: ${delay}s"><circle cx="${x}" cy="${y}" r="10" fill="${color}"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" ${T} font-size="14" fill="#fff">${sign}</text></g>`;

  const MEMBRANE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A cell membrane. Outside there are many positive ions; inside it is negative. A meter reads minus 70 millivolts.">
    <text x="14" y="22" ${T} font-size="12" fill="#4A4566">OUTSIDE the neuron</text>
    ${ion(40, 52, '+', '#FF7A59', 0)}${ion(92, 40, '+', '#FF7A59', 0.6)}${ion(140, 60, '+', '#FF7A59', 1.1)}
    ${ion(190, 42, '+', '#FF7A59', 0.3)}${ion(236, 58, '+', '#FF7A59', 0.9)}${ion(284, 40, '+', '#FF7A59', 1.4)}
    <rect x="0" y="86" width="320" height="24" fill="#FFE3DB"/>
    <g fill="#FF7A59">${Array.from({ length: 20 }, (_, i) => `<circle cx="${8 + i * 16}" cy="88" r="4"/><circle cx="${8 + i * 16}" cy="108" r="4"/>`).join('')}</g>
    ${ion(50, 140, '−', '#6C4CF1', 0.4)}${ion(110, 156, '−', '#6C4CF1', 1.2)}${ion(170, 138, '−', '#6C4CF1', 0.2)}
    <text x="14" y="190" ${T} font-size="12" fill="#4A4566">INSIDE the neuron</text>
    <rect x="214" y="128" width="92" height="52" rx="12" fill="#1E1A3C"/>
    <text x="260" y="150" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" fill="#C9BCFF">voltage</text>
    <text x="260" y="170" text-anchor="middle" ${T} font-size="18" fill="#FFFFFF">−70 mV</text>
  </svg>`;

  // Voltage graph: y = 30 + (40 − mV) × 1.1667
  const SPIKE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Graph of voltage over time. After Fire is pressed, the voltage rises from minus 70 past the threshold to plus 40, falls below minus 70, then recovers.">
    <path d="M40 20 V180 H306" fill="none" stroke="#1E1A3C" stroke-width="2"/>
    <g font-family="Nunito, sans-serif" font-size="10" fill="#4A4566" text-anchor="end">
      <text x="34" y="34">+40</text><text x="34" y="80">0</text><text x="34" y="162">−70</text>
    </g>
    <path d="M40 77 H306" stroke="#E4E0F5" stroke-width="1.5"/>
    <path d="M40 141 H306" stroke="#FF7A59" stroke-width="2" stroke-dasharray="5 5"/>
    <text x="300" y="136" text-anchor="end" ${T} font-size="10" fill="#C2412A">threshold −55 mV</text>
    <path d="M40 158 H306" stroke="#C9BCFF" stroke-width="1.5" stroke-dasharray="2 4"/>
    <path class="ap-curve" pathLength="100" d="M40 158 H110 L128 141 L148 30 L172 170 C 188 174, 204 160, 228 158 H306" fill="none" stroke="#6C4CF1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <g class="ap-note" style="--d: 0.9s"><rect x="72" y="48" width="66" height="22" rx="11" fill="#FF7A59"/><text x="105" y="63" text-anchor="middle" ${T} font-size="11" fill="#fff">Na⁺ rushes in</text></g>
    <g class="ap-note" style="--d: 1.5s"><rect x="180" y="96" width="66" height="22" rx="11" fill="#12A594"/><text x="213" y="111" text-anchor="middle" ${T} font-size="11" fill="#fff">K⁺ flows out</text></g>
    <text x="173" y="196" text-anchor="middle" font-family="Nunito, sans-serif" font-size="10" fill="#4A4566">time (about 2 milliseconds)</text>
  </svg>`;

  const GAUGE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A voltage gauge with a threshold line at minus 55 millivolts.">
    <rect x="130" y="16" width="60" height="168" rx="30" fill="#FFFFFF" stroke="#E4E0F5" stroke-width="3"/>
    <rect class="gauge-fill" x="136" y="178" width="48" height="0" rx="24" fill="#C9BCFF"/>
    <path d="M118 100 H202" stroke="#FF7A59" stroke-width="3" stroke-dasharray="6 5"/>
    <text x="210" y="96" ${T} font-size="12" fill="#C2412A">threshold</text>
    <text x="210" y="110" font-family="Nunito, sans-serif" font-size="11" fill="#4A4566">−55 mV</text>
    <text x="114" y="182" text-anchor="end" font-family="Nunito, sans-serif" font-size="11" fill="#4A4566">−70 mV</text>
    <g class="bolt" opacity="0"><path d="M60 40 L36 92 H56 L46 140 L84 78 H62 L74 40 Z" fill="#F5A524" stroke="#B9770E" stroke-width="2" stroke-linejoin="round"/></g>
    <text class="gauge-mv" x="160" y="10" text-anchor="middle" ${T} font-size="0"> </text>
  </svg>`;

  const SYNAPSE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A synapse. Vesicles in the axon terminal release neurotransmitter molecules that cross a small gap and reach receptors on the next neuron.">
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
    <text x="236" y="22" ${T} font-size="11" fill="#4B2FC9">axon terminal</text>
    <text x="232" y="122" ${T} font-size="11" fill="#1E1A3C">synaptic gap</text>
    <text x="8" y="122" ${T} font-size="11" fill="#C2412A">neurotransmitters</text>
    <text x="198" y="190" ${T} font-size="11" fill="#0B6B60">receptors</text>
  </svg>`;

  // -------- lesson 3 art

  const REFLEX = (animated) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="Reflex arc: a hand near a flame. A signal runs from a receptor in the hand along a sensory neuron into the spinal cord, crosses an interneuron and returns along a motor neuron to the arm muscle, which pulls the hand away.">
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
    <text x="250" y="160" text-anchor="middle" ${T} font-size="12" fill="#4B2FC9">spinal cord</text>
    <path d="M44 120 C 90 92, 170 80, 240 72" fill="none" stroke="#E5484D" stroke-width="3" stroke-linecap="round"/>
    <circle cx="214" cy="74" r="6" fill="#E5484D"/>
    <path d="M240 72 L254 98" stroke="#6C4CF1" stroke-width="3" stroke-linecap="round"/>
    <path d="M254 98 C 210 128, 160 124, 122 112" fill="none" stroke="#12A594" stroke-width="3" stroke-linecap="round"/>
    ${animated ? `
    <circle r="7" fill="#FF7A59" opacity="0">
      <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.95;1" dur="2s" begin="indefinite" fill="freeze"/>
      <animateMotion dur="2s" begin="indefinite" fill="freeze" path="M44 120 C 90 92, 170 80, 240 72 L254 98 C 210 128, 160 124, 122 112"/>
    </circle>` : ''}
    <text x="68" y="74" ${T} font-size="11" fill="#B4232A">sensory</text>
    <text x="150" y="146" ${T} font-size="11" fill="#0B6B60">motor</text>
  </svg>`;

  const BRAIN = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Side view of the brain: the large cerebrum on top, the cerebellum at the back underneath, and the brainstem connecting to the spinal cord.">
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
    <text x="16" y="34" ${T} font-size="11" fill="#4A4566">FRONT</text>
    <text x="270" y="190" ${T} font-size="11" fill="#4A4566">BACK</text>
  </svg>`;

  // -------- quiz art

  const NEURON_HIGHLIGHT = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A neuron with one part circled: the coral sleeve wrapped around the axon.">
    ${NEURON}
    <ellipse class="a-blink" cx="157" cy="100" rx="26" ry="20" fill="none" stroke="#1E1A3C" stroke-width="3" stroke-dasharray="6 4"/>
  </svg>`;

  window.Octavo.addCourse({
    id: 'nervous-system',
    subject: 'Medicine',
    title: 'The nervous system',
    blurb: 'How your body sends signals in milliseconds: neurons, nerve impulses, reflexes and the brain.',
    artBg: '#FFF5F5',
    units: [
      {
        title: 'Building blocks',
        lessons: [
          {
            id: 'ns-neuron',
            title: 'Meet the neuron',
            minutes: 4,
            slides: [
              {
                title: 'Your body’s messaging network',
                art: BODY,
                text: '<p>The nervous system carries signals around your body in milliseconds. It has two parts:</p><p><b>Central nervous system (CNS):</b> the brain and spinal cord, which make decisions.<br><b>Peripheral nervous system (PNS):</b> every nerve that branches out to your skin, muscles and organs.</p>',
              },
              {
                title: 'Anatomy of a neuron',
                art: NEURON_SPOTS,
                spots: [
                  { x: 9, y: 31, label: 'Dendrites', info: 'Branches that <b>receive</b> signals from other neurons. One neuron can have thousands of them.' },
                  { x: 22, y: 50, label: 'Cell body (soma)', info: 'Holds the nucleus and keeps the cell alive. It adds up incoming signals and decides whether to fire.' },
                  { x: 61, y: 36, label: 'Axon', info: 'A long cable that carries the signal <b>away</b> from the cell body. Some axons are over a metre long.' },
                  { x: 37, y: 50, label: 'Myelin sheath', info: 'Fatty insulation wrapped around the axon. It makes signals travel much faster.' },
                  { x: 91, y: 50, label: 'Axon terminals', info: 'The endings that pass the signal on to the next neuron, a muscle or a gland.' },
                ],
                text: '<p>Neurons are the cells that carry signals. Your brain alone has about <b>86 billion</b> of them.</p>',
              },
              {
                title: 'Signals travel one way',
                art: NEURON_FLOW,
                text: '<p>A signal always follows the same route: in through the <b>dendrites</b>, through the <b>cell body</b>, down the <b>axon</b> and out at the <b>axon terminals</b>.</p>',
              },
              {
                title: 'Myelin is the express lane',
                art: RACE,
                text: '<p>On a myelinated axon the signal <b>jumps</b> from one gap in the myelin to the next (the gaps are called <i>nodes of Ranvier</i>). That makes it up to about 100 times faster than on a bare axon.</p><p>In multiple sclerosis (MS), myelin is damaged, which slows or blocks signals.</p>',
              },
              {
                title: 'Recap',
                points: [
                  'The <b>CNS</b> is the brain and spinal cord; the <b>PNS</b> is all the other nerves.',
                  'Neurons receive with <b>dendrites</b> and send along the <b>axon</b>.',
                  'Signals go one way: dendrites → cell body → axon → terminals.',
                  '<b>Myelin</b> insulates the axon so signals jump and travel faster.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'What is the circled part of this neuron?', art: NEURON_HIGHLIGHT,
                options: ['Myelin sheath', 'Dendrite', 'Cell body', 'Axon terminal'], answer: 'Myelin sheath',
                explain: 'That coral sleeve is the <b>myelin sheath</b>, the insulation around the axon.', hint: 'it’s the insulation wrapped around the axon.' },
              { type: 'order', prompt: 'Put the signal’s path through a neuron in order.',
                items: ['Dendrites', 'Cell body', 'Axon', 'Axon terminals'],
                explain: 'In through the dendrites, through the cell body, along the axon, out at the terminals.', hint: 'signals come IN through the branches and leave at the far end.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Myelin makes nerve signals travel more slowly.', answer: false,
                explain: '<b>False.</b> Myelin speeds signals up: they jump between the gaps in the myelin.', hint: 'remember the race between the two axons.' },
              { type: 'choice', prompt: 'Which of these is part of the central nervous system?',
                options: ['Spinal cord', 'Sciatic nerve', 'Nerves in your fingers', 'Muscle fibres'], answer: 'Spinal cord',
                explain: 'The CNS is the <b>brain and spinal cord</b>. Everything else is peripheral.', hint: 'the CNS has just two parts.' },
            ],
          },
          {
            id: 'ns-signal',
            title: 'Firing a signal',
            minutes: 5,
            slides: [
              {
                title: 'At rest: a charged battery',
                art: MEMBRANE,
                text: '<p>At rest, the inside of a neuron is about <b>−70 millivolts</b> compared with the outside. Pumps in the membrane keep it charged, like a tiny battery waiting to be used.</p>',
              },
              {
                title: 'The action potential',
                art: SPIKE,
                replay: 'Fire the neuron',
                autoplay: true,
                text: '<p>When the voltage reaches the <b>threshold</b> (about −55 mV), channels open and <b>sodium (Na⁺)</b> rushes in: the inside shoots up to +40 mV. Then <b>potassium (K⁺)</b> flows out and the voltage drops back. This spike is the nerve signal.</p>',
              },
              {
                title: 'All or nothing',
                art: GAUGE,
                controls: `
                <div class="control">
                  <label for="stim">Stimulus strength</label>
                  <input id="stim" type="range" min="0" max="30" value="6" step="1">
                  <output class="readout" for="stim"></output>
                </div>`,
                text: '<p>Drag the slider. Below the threshold nothing happens. Above it, the neuron fires a <b>full-size</b> spike every time. A stronger stimulus doesn’t make a bigger spike; it makes spikes come <b>more often</b>.</p>',
                setup(root) {
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
                      ? `<b class="ok">${mv} mV · it fires!</b> A full spike, every time.`
                      : `<b>${mv} mV · no signal.</b> Still below the threshold.`;
                  };
                  input.addEventListener('input', update);
                  update();
                },
              },
              {
                title: 'Crossing the synapse',
                art: SYNAPSE,
                text: '<p>Neurons don’t actually touch. At a <b>synapse</b> the signal is handed over by chemicals called <b>neurotransmitters</b>. They’re released from the axon terminal, cross a tiny gap and attach to <b>receptors</b> on the next cell.</p><p>Examples: dopamine, serotonin and acetylcholine.</p>',
              },
              {
                title: 'Recap',
                points: [
                  'A resting neuron sits at about <b>−70 mV</b>.',
                  'At the <b>threshold (−55 mV)</b> Na⁺ rushes in and the neuron fires.',
                  'K⁺ flowing out brings the voltage back down.',
                  'Firing is <b>all or nothing</b>; a stronger stimulus means more spikes, not bigger ones.',
                  '<b>Neurotransmitters</b> carry the signal across the synapse.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'What is the resting voltage inside a typical neuron?',
                options: ['−70 mV', '0 mV', '+40 mV', '−55 mV'], answer: '−70 mV',
                explain: 'About <b>−70 mV</b>. −55 mV is the threshold and +40 mV is the top of a spike.', hint: 'it’s the value on the voltmeter in the first slide.' },
              { type: 'order', prompt: 'Put the stages of an action potential in order.',
                items: ['Resting at −70 mV', 'Threshold reached at −55 mV', 'Na⁺ rushes in', 'K⁺ flows out'],
                explain: 'Rest → threshold → sodium in (voltage up) → potassium out (voltage down).', hint: 'sodium makes the voltage go UP, potassium brings it back DOWN.' },
              { type: 'tf', prompt: 'True or false?', statement: 'A stronger stimulus makes a bigger action potential.', answer: false,
                explain: '<b>False.</b> Firing is all or nothing. A stronger stimulus makes the neuron fire <b>more often</b>.', hint: 'think about the slider slide.' },
              { type: 'choice', prompt: 'What carries the signal across a synapse?',
                options: ['Neurotransmitters', 'Electrons', 'Red blood cells', 'Myelin'], answer: 'Neurotransmitters',
                explain: '<b>Neurotransmitters</b> are released, cross the gap and bind to receptors.', hint: 'they are chemical messengers.' },
            ],
          },
        ],
      },
      {
        title: 'Brain & spinal cord',
        lessons: [
          {
            id: 'ns-reflex',
            title: 'Reflexes and the brain',
            minutes: 4,
            slides: [
              {
                title: 'The reflex arc',
                art: REFLEX(true),
                replay: 'Touch the flame',
                autoplay: true,
                text: '<p>Touch something hot and your hand jerks away <b>before</b> you feel pain. The signal takes a shortcut through the <b>spinal cord</b>, so it doesn’t have to wait for the brain.</p>',
              },
              {
                title: 'Five steps, one blink',
                art: REFLEX(false),
                spots: [
                  { x: 14, y: 54, label: '1 · Receptor', info: 'Heat sensors in the skin detect the flame.' },
                  { x: 46, y: 36, label: '2 · Sensory neuron', info: 'Carries the alarm signal to the spinal cord.' },
                  { x: 79, y: 42, label: '3 · Interneuron', info: 'Inside the spinal cord, it passes the signal straight across. No brain needed.' },
                  { x: 52, y: 64, label: '4 · Motor neuron', info: 'Carries the command back out to the arm.' },
                  { x: 36, y: 56, label: '5 · Effector (muscle)', info: 'The arm muscle contracts and pulls the hand away.' },
                ],
                text: '<p>The whole loop takes only a few hundredths of a second. The brain is told afterwards, which is when you feel the ouch.</p>',
              },
              {
                title: 'Three main parts of the brain',
                art: BRAIN,
                spots: [
                  { x: 44, y: 38, label: 'Cerebrum', info: 'The biggest part. Thinking, memory, language, the senses and voluntary movement.' },
                  { x: 69, y: 73, label: 'Cerebellum', info: 'Balance, posture and smooth, coordinated movement.' },
                  { x: 57, y: 86, label: 'Brainstem', info: 'Automatic life support: breathing, heart rate, swallowing. It connects to the spinal cord.' },
                ],
                text: '<p>Tap each region to find out what it does.</p>',
              },
              {
                title: 'Recap',
                points: [
                  'A reflex is fast because the <b>spinal cord</b> handles it.',
                  'Reflex arc: receptor → sensory neuron → interneuron → motor neuron → muscle.',
                  'The <b>cerebrum</b> thinks, the <b>cerebellum</b> balances, the <b>brainstem</b> keeps you alive automatically.',
                ],
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Put the reflex arc in order.',
                items: ['Receptor in the skin', 'Sensory neuron', 'Interneuron in the spinal cord', 'Motor neuron', 'Muscle contracts'],
                explain: 'Sense it, send it in, cross the spinal cord, send it out, move.', hint: 'the signal goes IN to the spinal cord, then back OUT to the arm.' },
              { type: 'choice', prompt: 'Which part of the brain keeps your balance?',
                options: ['Cerebellum', 'Cerebrum', 'Brainstem', 'Spinal cord'], answer: 'Cerebellum',
                explain: 'The <b>cerebellum</b> coordinates balance and smooth movement.', hint: 'it’s the small striped part at the back.' },
              { type: 'choice', prompt: 'Why is a reflex so fast?',
                options: ['The spinal cord handles it without the brain', 'The signal skips the neurons', 'Muscles decide on their own', 'The brain predicts it'],
                answer: 'The spinal cord handles it without the brain',
                explain: 'The <b>spinal cord</b> turns the signal around, so there’s no trip to the brain first.', hint: 'think about where the shortcut happens.' },
              { type: 'tf', prompt: 'True or false?', statement: 'The brainstem controls breathing and heart rate.', answer: true,
                explain: '<b>True.</b> The brainstem runs automatic, life-support functions.', hint: 'which part handles the things you never think about?' },
            ],
          },
        ],
        soon: ['The five senses', 'Sleep and the brain'],
      },
    ],
    soonUnits: ['Hormones and the endocrine system'],
  });
})();
