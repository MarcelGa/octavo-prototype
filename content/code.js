'use strict';

/* Code · Python first steps. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const M = 'font-family="ui-monospace, Consolas, monospace" font-weight="700"';

  const BOXES = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Two labelled boxes. The value 8 drops into the box labelled arms, and the text Otto drops into the box labelled name.">
    <g class="a-dropin"><rect x="62" y="40" width="36" height="30" rx="8" fill="#12A594"/><text x="80" y="61" text-anchor="middle" ${M} font-size="16" fill="#fff">8</text></g>
    <g class="a-dropin" style="animation-delay: 1.2s"><rect x="196" y="40" width="72" height="30" rx="8" fill="#FF7A59"/><text x="232" y="61" text-anchor="middle" ${M} font-size="14" fill="#fff">"Otto"</text></g>
    <path d="M30 100 H130 L120 170 H40 Z" fill="#DDF5F1" stroke="#12A594" stroke-width="3" stroke-linejoin="round"/>
    <path d="M182 100 H282 L272 170 H192 Z" fill="#FFE9E2" stroke="#E8613F" stroke-width="3" stroke-linejoin="round"/>
    <rect x="48" y="150" width="64" height="24" rx="6" fill="#FFFFFF" stroke="#12A594" stroke-width="2"/>
    <text x="80" y="167" text-anchor="middle" ${M} font-size="13" fill="#0B6B60">arms</text>
    <rect x="200" y="150" width="64" height="24" rx="6" fill="#FFFFFF" stroke="#E8613F" stroke-width="2"/>
    <text x="232" y="167" text-anchor="middle" ${M} font-size="13" fill="#9A3A1F">name</text>
  </svg>`;

  const LOOP = `
  <svg viewBox="0 0 320 200" role="img" aria-label="range(3) produces 0, 1 and 2. Each value lights up in turn while a loop arrow goes round.">
    <text x="160" y="36" text-anchor="middle" ${M} font-size="18" fill="#1E1A3C">range(3)</text>
    <g>
      <circle class="a-step" cx="100" cy="100" r="26" fill="#DDF5F1" stroke="#12A594" stroke-width="3"/>
      <circle class="a-step" style="animation-delay: 1s" cx="160" cy="100" r="26" fill="#DDF5F1" stroke="#12A594" stroke-width="3"/>
      <circle class="a-step" style="animation-delay: 2s" cx="220" cy="100" r="26" fill="#DDF5F1" stroke="#12A594" stroke-width="3"/>
    </g>
    <g ${M} font-size="22" fill="#0B6B60" text-anchor="middle"><text x="100" y="108">0</text><text x="160" y="108">1</text><text x="220" y="108">2</text></g>
    <path d="M86 140 C 110 176, 210 176, 234 140" fill="none" stroke="#12A594" stroke-width="3" stroke-dasharray="5 6" class="a-flow"/>
    <path d="M228 146 L234 138 L240 148" fill="none" stroke="#12A594" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="160" y="192" text-anchor="middle" ${T} font-size="12" fill="#4A4566">3 values, starting at 0 (3 itself is not included)</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'python',
    subject: 'Code',
    title: 'Python: first steps',
    blurb: 'Write and trace real Python: variables, loops and printing results.',
    artBg: '#F2FBF9',
    units: [
      {
        title: 'Thinking like a computer',
        lessons: [
          {
            id: 'py-loops',
            title: 'Variables and loops',
            minutes: 5,
            slides: [
              {
                title: 'Variables are labelled boxes',
                art: BOXES,
                text: '<p>A <b>variable</b> is a name that holds a value. In Python you create one with <code>=</code>:</p><pre class="code-block">arms = 8\nname = "Otto"</pre><p>Here <code>=</code> means “store”, not “equals”.</p>',
              },
              {
                title: 'Loops repeat things',
                art: LOOP,
                text: '<p>A <code>for</code> loop runs the indented lines once for each value. <code>range(3)</code> gives <b>0, 1, 2</b>, so the body runs <b>3 times</b>.</p>',
              },
              {
                title: 'Trace a program',
                code: {
                  lines: ['arms = 8', 'total = 0', 'for i in range(3):', '    total = total + arms', 'print(total)'],
                  steps: [
                    { line: 0, vars: { arms: 8 }, note: 'Create <b>arms</b> and store 8 in it.' },
                    { line: 1, vars: { arms: 8, total: 0 }, note: '<b>total</b> starts at 0.' },
                    { line: 2, vars: { arms: 8, total: 0, i: 0 }, note: 'The loop starts. <b>i</b> is 0.' },
                    { line: 3, vars: { arms: 8, total: 8, i: 0 }, note: 'total = 0 + 8 = <b>8</b>' },
                    { line: 2, vars: { arms: 8, total: 8, i: 1 }, note: 'Back to the top: <b>i</b> is now 1.' },
                    { line: 3, vars: { arms: 8, total: 16, i: 1 }, note: 'total = 8 + 8 = <b>16</b>' },
                    { line: 2, vars: { arms: 8, total: 16, i: 2 }, note: '<b>i</b> is 2: the last value from range(3).' },
                    { line: 3, vars: { arms: 8, total: 24, i: 2 }, note: 'total = 16 + 8 = <b>24</b>. range(3) is used up, so the loop ends.' },
                    { line: 4, vars: { arms: 8, total: 24, i: 2 }, out: '24', note: '<b>print</b> shows 24: three lots of eight arms.' },
                  ],
                },
                text: '<p>Run the program one line at a time and watch the variables change.</p>',
              },
              {
                title: 'Recap',
                points: [
                  '<code>name = value</code> stores a value in a variable.',
                  '<code>for i in range(n):</code> repeats the indented lines n times.',
                  '<code>range(3)</code> gives 0, 1, 2.',
                  'Indentation shows which lines are inside the loop.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'What does this program print?', code: 'x = 2\nfor i in range(3):\n    x = x * 2\nprint(x)',
                options: ['16', '8', '6', '12'], answer: '16',
                explain: '2 → 4 → 8 → <b>16</b>. The loop doubles x three times.', hint: 'trace it: x doubles once per loop, and the loop runs 3 times.' },
              { type: 'choice', prompt: 'Which values does <code>range(4)</code> produce?',
                options: ['0, 1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3, 4', '4'], answer: '0, 1, 2, 3',
                explain: '<b>0, 1, 2, 3</b>: four values, starting at 0.', hint: 'it starts at 0 and stops before the number.' },
              { type: 'tf', prompt: 'True or false?', statement: 'In Python, indentation shows which lines belong inside a loop.', answer: true,
                explain: '<b>True.</b> The indented lines are the loop’s body.', hint: 'look at how the loop body was written.' },
              { type: 'choice', prompt: 'Which line creates a variable?',
                options: ['score = 10', 'print(score)', 'for score in range(3):', '# score'], answer: 'score = 10',
                explain: '<code>score = 10</code> stores 10 in <b>score</b>.', hint: 'look for the “store” sign.' },
            ],
          },
        ],
        soon: ['If and else', 'Lists'],
      },
    ],
    soonUnits: ['Functions'],
  });
})();
