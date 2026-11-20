'use strict';

/* Code · Python first steps. */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const M = 'font-family="ui-monospace, Consolas, monospace" font-weight="700"';

  const boxes = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'Dve označené škatule. Hodnota 8 padne do škatule s menovkou arms a text Otto do škatule s menovkou name.' : 'Two labelled boxes. The value 8 drops into the box labelled arms, and the text Otto drops into the box labelled name.'}">
    <g class="a-dropin"><rect x="62" y="40" width="36" height="30" rx="8" fill="#12A594"/><text x="80" y="61" text-anchor="middle" ${M} font-size="16" fill="#fff">8</text></g>
    <g class="a-dropin" style="animation-delay: 1.2s"><rect x="196" y="40" width="72" height="30" rx="8" fill="#FF7A59"/><text x="232" y="61" text-anchor="middle" ${M} font-size="14" fill="#fff">"Otto"</text></g>
    <path d="M30 100 H130 L120 170 H40 Z" fill="#DDF5F1" stroke="#12A594" stroke-width="3" stroke-linejoin="round"/>
    <path d="M182 100 H282 L272 170 H192 Z" fill="#FFE9E2" stroke="#E8613F" stroke-width="3" stroke-linejoin="round"/>
    <rect x="48" y="150" width="64" height="24" rx="6" fill="#FFFFFF" stroke="#12A594" stroke-width="2"/>
    <text x="80" y="167" text-anchor="middle" ${M} font-size="13" fill="#0B6B60">arms</text>
    <rect x="200" y="150" width="64" height="24" rx="6" fill="#FFFFFF" stroke="#E8613F" stroke-width="2"/>
    <text x="232" y="167" text-anchor="middle" ${M} font-size="13" fill="#9A3A1F">name</text>
  </svg>`;

  const loop = (lang) => `
  <svg viewBox="0 0 320 200" role="img" aria-label="${lang === 'sk' ? 'range(3) vytvorí 0, 1 a 2. Hodnoty sa postupne rozsvietia, kým šípka cyklu obieha dookola.' : 'range(3) produces 0, 1 and 2. Each value lights up in turn while a loop arrow goes round.'}">
    <text x="160" y="36" text-anchor="middle" ${M} font-size="18" fill="#1E1A3C">range(3)</text>
    <g>
      <circle class="a-step" cx="100" cy="100" r="26" fill="#DDF5F1" stroke="#12A594" stroke-width="3"/>
      <circle class="a-step" style="animation-delay: 1s" cx="160" cy="100" r="26" fill="#DDF5F1" stroke="#12A594" stroke-width="3"/>
      <circle class="a-step" style="animation-delay: 2s" cx="220" cy="100" r="26" fill="#DDF5F1" stroke="#12A594" stroke-width="3"/>
    </g>
    <g ${M} font-size="22" fill="#0B6B60" text-anchor="middle"><text x="100" y="108">0</text><text x="160" y="108">1</text><text x="220" y="108">2</text></g>
    <path d="M86 140 C 110 176, 210 176, 234 140" fill="none" stroke="#12A594" stroke-width="3" stroke-dasharray="5 6" class="a-flow"/>
    <path d="M228 146 L234 138 L240 148" fill="none" stroke="#12A594" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="160" y="192" text-anchor="middle" ${T} font-size="12" fill="#4A4566">${lang === 'sk' ? '3 hodnoty od 0 (samotná 3 medzi nimi nie je)' : '3 values, starting at 0 (3 itself is not included)'}</text>
  </svg>`;

  window.Octavo.addCourse({
    id: 'python',
    subject: 'Code',
    audience: 'adult',
    lecturer: 'kai',
    title: { en: 'Python: first steps', sk: 'Python: prvé kroky' },
    blurb: { en: 'Write and trace real Python: variables, loops and printing results.', sk: 'Píš a krokuj skutočný Python: premenné, cykly a výpis výsledkov.' },
    artBg: '#F2FBF9',
    units: [
      {
        title: { en: 'Thinking like a computer', sk: 'Mysli ako počítač' },
        lessons: [
          {
            id: 'py-loops',
            title: { en: 'Variables and loops', sk: 'Premenné a cykly' },
            minutes: 5,
            slides: [
              {
                title: { en: 'Variables are labelled boxes', sk: 'Premenné sú označené škatule' },
                art: { en: boxes('en'), sk: boxes('sk') },
                text: {
                  en: '<p>A <b>variable</b> is a name that holds a value. In Python you create one with <code>=</code>:</p><pre class="code-block">arms = 8\nname = "Otto"</pre><p>Here <code>=</code> means “store”, not “equals”.</p>',
                  sk: '<p><b>Premenná</b> je meno, ktoré si pamätá hodnotu. V Pythone ju vytvoríš pomocou <code>=</code>:</p><pre class="code-block">arms = 8\nname = "Otto"</pre><p>Znak <code>=</code> tu znamená „ulož“, nie „rovná sa“.</p>',
                },
              },
              {
                title: { en: 'Loops repeat things', sk: 'Cykly opakujú veci' },
                art: { en: loop('en'), sk: loop('sk') },
                text: {
                  en: '<p>A <code>for</code> loop runs the indented lines once for each value. <code>range(3)</code> gives <b>0, 1, 2</b>, so the body runs <b>3 times</b>.</p>',
                  sk: '<p>Cyklus <code>for</code> spustí odsadené riadky raz pre každú hodnotu. <code>range(3)</code> dá <b>0, 1, 2</b>, takže telo cyklu prebehne <b>3-krát</b>.</p>',
                },
              },
              {
                title: { en: 'Trace a program', sk: 'Krokuj program' },
                code: {
                  lines: ['arms = 8', 'total = 0', 'for i in range(3):', '    total = total + arms', 'print(total)'],
                  steps: [
                    { line: 0, vars: { arms: 8 }, note: { en: 'Create <b>arms</b> and store 8 in it.', sk: 'Vytvor <b>arms</b> a ulož doň 8.' } },
                    { line: 1, vars: { arms: 8, total: 0 }, note: { en: '<b>total</b> starts at 0.', sk: '<b>total</b> začína na 0.' } },
                    { line: 2, vars: { arms: 8, total: 0, i: 0 }, note: { en: 'The loop starts. <b>i</b> is 0.', sk: 'Cyklus sa začína. <b>i</b> je 0.' } },
                    { line: 3, vars: { arms: 8, total: 8, i: 0 }, note: { en: 'total = 0 + 8 = <b>8</b>', sk: 'total = 0 + 8 = <b>8</b>' } },
                    { line: 2, vars: { arms: 8, total: 8, i: 1 }, note: { en: 'Back to the top: <b>i</b> is now 1.', sk: 'Späť hore: <b>i</b> je teraz 1.' } },
                    { line: 3, vars: { arms: 8, total: 16, i: 1 }, note: { en: 'total = 8 + 8 = <b>16</b>', sk: 'total = 8 + 8 = <b>16</b>' } },
                    { line: 2, vars: { arms: 8, total: 16, i: 2 }, note: { en: '<b>i</b> is 2: the last value from range(3).', sk: '<b>i</b> je 2: posledná hodnota z range(3).' } },
                    { line: 3, vars: { arms: 8, total: 24, i: 2 }, note: { en: 'total = 16 + 8 = <b>24</b>. range(3) is used up, so the loop ends.', sk: 'total = 16 + 8 = <b>24</b>. Hodnoty z range(3) sa minuli, takže cyklus končí.' } },
                    { line: 4, vars: { arms: 8, total: 24, i: 2 }, out: '24', note: { en: '<b>print</b> shows 24: three lots of eight arms.', sk: '<b>print</b> vypíše 24: trikrát osem ramien.' } },
                  ],
                },
                text: {
                  en: '<p>Run the program one line at a time and watch the variables change.</p>',
                  sk: '<p>Spúšťaj program po jednom riadku a sleduj, ako sa menia premenné.</p>',
                },
              },
              {
                title: { en: 'Recap', sk: 'Zhrnutie' },
                points: {
                  en: [
                    '<code>name = value</code> stores a value in a variable.',
                    '<code>for i in range(n):</code> repeats the indented lines n times.',
                    '<code>range(3)</code> gives 0, 1, 2.',
                    'Indentation shows which lines are inside the loop.',
                  ],
                  sk: [
                    '<code>meno = hodnota</code> uloží hodnotu do premennej.',
                    '<code>for i in range(n):</code> zopakuje odsadené riadky n-krát.',
                    '<code>range(3)</code> dá 0, 1, 2.',
                    'Odsadenie ukazuje, ktoré riadky patria do cyklu.',
                  ],
                },
              },
            ],
            quiz: [
              { type: 'choice', prompt: { en: 'What does this program print?', sk: 'Čo vypíše tento program?' }, code: 'x = 2\nfor i in range(3):\n    x = x * 2\nprint(x)',
                options: ['16', '8', '6', '12'], answer: '16',
                explain: { en: '2 → 4 → 8 → <b>16</b>. The loop doubles x three times.', sk: '2 → 4 → 8 → <b>16</b>. Cyklus trikrát zdvojnásobí x.' },
                hint: { en: 'trace it: x doubles once per loop, and the loop runs 3 times.', sk: 'krokuj to: x sa v každom prechode zdvojnásobí a cyklus prebehne 3-krát.' } },
              { type: 'choice', prompt: { en: 'Which values does <code>range(4)</code> produce?', sk: 'Aké hodnoty vytvorí <code>range(4)</code>?' },
                options: ['0, 1, 2, 3', '1, 2, 3, 4', '0, 1, 2, 3, 4', '4'], answer: '0, 1, 2, 3',
                explain: { en: '<b>0, 1, 2, 3</b>: four values, starting at 0.', sk: '<b>0, 1, 2, 3</b>: štyri hodnoty, začína sa od 0.' },
                hint: { en: 'it starts at 0 and stops before the number.', sk: 'začína na 0 a zastaví sa pred zadaným číslom.' } },
              { type: 'tf', prompt: { en: 'True or false?', sk: 'Pravda, alebo nepravda?' },
                statement: { en: 'In Python, indentation shows which lines belong inside a loop.', sk: 'V Pythone odsadenie ukazuje, ktoré riadky patria do cyklu.' }, answer: true,
                explain: { en: '<b>True.</b> The indented lines are the loop’s body.', sk: '<b>Pravda.</b> Odsadené riadky tvoria telo cyklu.' },
                hint: { en: 'look at how the loop body was written.', sk: 'pozri sa, ako bolo napísané telo cyklu.' } },
              { type: 'choice', prompt: { en: 'Which line creates a variable?', sk: 'Ktorý riadok vytvára premennú?' },
                options: ['score = 10', 'print(score)', 'for score in range(3):', '# score'], answer: 'score = 10',
                explain: { en: '<code>score = 10</code> stores 10 in <b>score</b>.', sk: '<code>score = 10</code> uloží 10 do <b>score</b>.' },
                hint: { en: 'look for the “store” sign.', sk: 'hľadaj znak „ulož“.' } },
            ],
          },
        ],
        soon: { en: ['If and else', 'Lists'], sk: ['If a else', 'Zoznamy'] },
      },
    ],
    soonUnits: { en: ['Functions'], sk: ['Funkcie'] },
  });
})();
