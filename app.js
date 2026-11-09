'use strict';

/* Octavo clickable prototype: plain JavaScript, no build step, no dependencies.
   Screens: #home, #lesson, #progress (hash routing so the browser back button works). */

// ---------------------------------------------------------------- data

const SUBJECTS = [
  { name: 'Languages', topic: 'Spanish',   level: 7, pct: 62, color: '#E8613F', tint: '#FFE9E2', icon: 'M4 5h16v10H9l-5 4z' },
  { name: 'Medicine',  topic: 'Anatomy',   level: 3, pct: 30, color: '#E5484D', tint: '#FDE7E8', icon: 'M3 12h4l2-5 4 10 2-5h6' },
  { name: 'Math',      topic: 'Algebra',   level: 9, pct: 80, color: '#3E63DD', tint: '#E6ECFC', icon: 'M17 5H7l6 7-6 7h10' },
  { name: 'Physics',   topic: 'Mechanics', level: 4, pct: 45, color: '#8E4EC6', tint: '#F1E8FA', icon: 'M12 9a3 3 0 1 0 0.01 0M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8' },
  { name: 'Circuits',  topic: "Ohm's law", level: 5, pct: 55, color: '#D18A00', tint: '#FEF3DD', icon: 'M13 3L5 14h6l-1 7 8-11h-6z' },
  { name: 'Code',      topic: 'Python',    level: 6, pct: 70, color: '#12A594', tint: '#DDF5F1', icon: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14' },
  { name: 'Chemistry', topic: 'Atoms',     level: 2, pct: 15, color: '#30A46C', tint: '#E0F4E8', icon: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3' },
  { name: 'Music',     topic: 'Theory',    level: 1, pct: 8,  color: '#D6409F', tint: '#FBE6F3', icon: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0M20 16a3 3 0 1 1-6 0a3 3 0 1 1 6 0' },
];
const subject = (name) => SUBJECTS.find((s) => s.name === name);

const CIRCUIT_FIGURE = `
<svg width="300" height="140" viewBox="0 0 300 140" role="img" aria-label="Circuit: a 9 volt battery in a loop with a 3 ohm resistor; the current I is unknown">
  <g fill="none" stroke="#1E1A3C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M40 62 V30 H120"/>
    <path d="M120 30 l5 -10 l10 20 l10 -20 l10 20 l10 -20 l10 20 l5 -10"/>
    <path d="M180 30 H260 V110 H40 V78"/>
    <path d="M26 62 H54"/>
  </g>
  <path d="M32 78 H48" stroke="#1E1A3C" stroke-width="6" stroke-linecap="round"/>
  <g fill="none" stroke="#6C4CF1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M276 56 v30"/><path d="M270 78 l6 8 l6 -8"/>
  </g>
  <text x="64" y="76" font-family="Nunito, sans-serif" font-weight="800" font-size="16" fill="#1E1A3C">9 V</text>
  <text x="136" y="62" font-family="Nunito, sans-serif" font-weight="800" font-size="16" fill="#1E1A3C">3 Ω</text>
  <text x="200" y="76" font-family="Nunito, sans-serif" font-weight="800" font-size="16" fill="#6C4CF1">I = ?</text>
</svg>`;

// Today's mix: one question from three different "arms" to show the platform is universal.
const QUESTIONS = [
  {
    subject: 'Circuits', topic: "Ohm's law", text: '#7A5000',
    prompt: 'A 9 V battery is connected to a 3 Ω resistor. How much current flows?',
    figure: CIRCUIT_FIGURE,
    options: ['3 A', '27 A', '0.33 A', '6 A'], answer: '3 A',
    explain: "Ohm's law: I = V ÷ R = 9 V ÷ 3 Ω = <strong>3 A</strong>.",
    hint: 'current is voltage <em>divided</em> by resistance.',
  },
  {
    subject: 'Languages', topic: 'Spanish', text: '#9A3A1F',
    prompt: 'How do you say “the octopus” in Spanish?',
    options: ['el pulpo', 'la pulpa', 'el polvo', 'el pueblo'], answer: 'el pulpo',
    explain: '<strong>El pulpo</strong>. Careful: <em>la pulpa</em> is pulp, <em>el polvo</em> is dust and <em>el pueblo</em> is a village.',
    hint: 'it’s a masculine noun that starts with “pul…”.',
  },
  {
    subject: 'Medicine', topic: 'Anatomy', text: '#9B2226',
    prompt: 'How many chambers does the human heart have?',
    options: ['2', '3', '4', '6'], answer: '4',
    explain: '<strong>4</strong>: two atria on top and two ventricles below. (Otto has three whole hearts!)',
    hint: 'think two on top, two below.',
  },
];

const PRAISE = ['Brilliant!', 'Nailed it!', 'Spot on!', 'Tentacular!'];

// ---------------------------------------------------------------- art

const OTTO_ARMS = `
  <g fill="none" stroke="#6C4CF1" stroke-width="18" stroke-linecap="round">
    <path d="M72 140 C 46 156, 28 186, 46 204 C 56 213, 68 206, 62 196"/>
    <path d="M94 152 C 84 180, 82 206, 102 214"/>
    <path d="M120 156 C 114 184, 128 200, 118 220"/>
    <path d="M146 152 C 156 180, 158 206, 138 214"/>
    <path d="M168 140 C 194 156, 212 186, 194 204 C 184 213, 172 206, 178 196"/>
    <path d="M178 114 C 206 106, 220 86, 212 64 C 208 54, 196 56, 200 66"/>
  </g>`;
const OTTO_HEAD = `
  <ellipse cx="120" cy="142" rx="50" ry="22" fill="#6C4CF1"/>
  <ellipse cx="120" cy="100" rx="66" ry="64" fill="#6C4CF1"/>
  <circle cx="96" cy="104" r="20" fill="#fff"/><circle cx="144" cy="104" r="20" fill="#fff"/>
  <circle cx="100" cy="107" r="10" fill="#1E1A3C"/><circle cx="148" cy="107" r="10" fill="#1E1A3C"/>
  <circle cx="104" cy="102" r="3.5" fill="#fff"/><circle cx="152" cy="102" r="3.5" fill="#fff"/>
  <g fill="none" stroke="#1E1A3C" stroke-width="4"><circle cx="96" cy="104" r="24"/><circle cx="144" cy="104" r="24"/></g>
  <ellipse cx="76" cy="134" rx="9" ry="5" fill="#FF7A59" opacity="0.75"/><ellipse cx="164" cy="134" rx="9" ry="5" fill="#FF7A59" opacity="0.75"/>
  <path d="M108 136 Q120 146 132 136" fill="none" stroke="#1E1A3C" stroke-width="4" stroke-linecap="round"/>
  <path d="M92 44 v14 q28 12 56 0 v-14 z" fill="#1E1A3C"/>
  <polygon points="120,14 176,34 120,54 64,34" fill="#1E1A3C"/>
  <path d="M120 34 L168 40 L170 62" fill="none" stroke="#FF7A59" stroke-width="3" stroke-linecap="round"/>
  <circle cx="170" cy="66" r="5" fill="#FF7A59"/>`;

const ottoFull = (size) =>
  `<svg width="${size}" height="${size}" viewBox="20 10 200 220" aria-hidden="true">${OTTO_ARMS}${OTTO_HEAD}</svg>`;
const ottoFace = () =>
  `<svg viewBox="44 10 152 160" role="img" aria-label="Otto, the central brain">${OTTO_HEAD}</svg>`;

const ICON = {
  home: 'M3 11l9-7 9 7v9H3z',
  target: 'M12 3a9 9 0 1 0 0.01 0M12 8a4 4 0 1 0 0.01 0',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H4a3 3 0 0 0 4 4M16 6h4a3 3 0 0 1-4 4M12 13v4M8 20h8',
  user: 'M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8M4 20c1-4 4-6 8-6s7 2 8 6',
  close: 'M6 6l12 12M18 6L6 18',
  check: 'M5 12l5 5 9-10',
  cross: 'M7 7l10 10M17 7L7 17',
};
const stroke = (d, size = 24, color = 'currentColor', width = 2.2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
const FLAME = (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 4 0-3 0-5 0-7z" fill="#FF7A59"/></svg>`;
const DROP = (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" fill="#6C4CF1"/></svg>`;
const HEART = (s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="#FF7A59"/></svg>`;

// ---------------------------------------------------------------- state

const STORE_KEY = 'octavo-prototype-v1';
const DEFAULTS = { ink: 340, streak: 12, lessons: 38, doneToday: false };

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function save() {
  try {
    const { ink, streak, lessons, doneToday } = state;
    localStorage.setItem(STORE_KEY, JSON.stringify({ ink, streak, lessons, doneToday }));
  } catch { /* storage blocked: the demo still works, it just won't remember */ }
}

const newLesson = () => ({ i: 0, picked: null, checked: false, hearts: 5, earned: 0, lastEarned: 0, firstTry: true, praise: '', done: false });
const state = { screen: 'home', ...DEFAULTS, ...loadSaved(), lesson: newLesson() };

// ---------------------------------------------------------------- screens

function tabbar(active) {
  const tabs = [
    { id: 'home', label: 'Learn', href: '#home', icon: ICON.home },
    { id: 'lesson', label: 'Practice', href: '#lesson', icon: ICON.target },
    { id: 'leagues', label: 'Leagues', icon: ICON.trophy },
    { id: 'progress', label: 'Profile', href: '#progress', icon: ICON.user },
  ];
  return `<nav class="tabbar" aria-label="Main">${tabs.map((t) => t.href
    ? `<a class="tab${t.id === active ? ' active' : ''}" href="${t.href}"${t.id === active ? ' aria-current="page"' : ''}>${stroke(t.icon)}<span>${t.label}</span></a>`
    : `<button type="button" class="tab" data-action="toast" data-msg="${t.label} are coming soon">${stroke(t.icon)}<span>${t.label}</span></button>`
  ).join('')}</nav>`;
}

function homeScreen() {
  const done = state.doneToday;
  return `
<main class="screen home">
  <header class="topbar">
    <div class="wordmark" aria-label="Octavo">octav<span>o</span></div>
    <div class="pills">
      <span class="pill">${FLAME()}${state.streak}<span class="sr"> day streak</span></span>
      <span class="pill">${DROP()}${state.ink}<span class="sr"> ink drops</span></span>
    </div>
  </header>

  <div class="greet">
    ${ottoFull(76)}
    <p class="bubble">${done ? 'Great work today! Fancy another round?' : 'Nine brains, zero limits. Which arm are we training today?'}</p>
  </div>

  <section class="continue" aria-labelledby="mix-title">
    <span class="eyebrow">Today's mix · 3 arms</span>
    <h2 id="mix-title">Circuits, Spanish &amp; the heart</h2>
    <div class="bar-row">
      <div class="bar"><div style="width: ${done ? 100 : 0}%"></div></div>
      <span>${done ? 'Done' : '3 questions'}</span>
    </div>
    <a class="btn-light" href="#lesson">${done ? 'Practice again' : 'Start lesson'}</a>
  </section>

  <h3 class="section-title">Your eight arms</h3>
  <div class="arms">
    ${SUBJECTS.map((s) => `
    <button type="button" class="arm" data-action="toast" data-msg="${s.name} lessons are coming soon">
      <span class="arm-head">
        <span class="arm-icon" style="background: ${s.tint}">${stroke(s.icon, 18, s.color)}</span>
        <span class="arm-text">
          <span class="arm-name">${s.name}</span>
          <span class="arm-meta">${s.topic} · Lv ${s.level}</span>
        </span>
      </span>
      <span class="meter"><span style="width: ${s.pct}%; background: ${s.color}"></span></span>
    </button>`).join('')}
  </div>
</main>
${tabbar('home')}`;
}

function lessonScreen() {
  const L = state.lesson;
  if (L.done) return finishScreen();
  const q = QUESTIONS[L.i];
  const s = subject(q.subject);
  const solved = L.checked && L.picked === q.answer;
  const pct = Math.round(((L.i + (solved ? 1 : 0)) / QUESTIONS.length) * 100);

  const options = q.options.map((o) => {
    let cls = 'option';
    if (L.picked === o) cls += L.checked ? (o === q.answer ? ' right' : ' wrong') : ' selected';
    return `<button type="button" class="${cls}" data-action="pick" data-value="${o}" aria-pressed="${L.picked === o}"${L.checked ? ' disabled' : ''}>${o}</button>`;
  }).join('');

  return `
<main class="screen lesson">
  <header class="lesson-top">
    <a class="icon-btn" href="#home" aria-label="Close lesson">${stroke(ICON.close, 22, 'currentColor', 2.6)}</a>
    <div class="progress" role="progressbar" aria-label="Lesson progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div style="width: ${pct}%"></div></div>
    <span class="hearts">${HEART()}${L.hearts}<span class="sr"> hearts left</span></span>
  </header>
  <span class="tag" style="background: ${s.tint}; color: ${q.text}">${stroke(s.icon, 16, s.color, 2.4)} ${q.subject} · ${q.topic}</span>
  <h1 class="question">${q.prompt}</h1>
  ${q.figure ? `<figure class="figure">${q.figure}</figure>` : ''}
  <div class="options" role="group" aria-label="Answers">${options}</div>
</main>
${lessonFooter(q)}`;
}

function lessonFooter(q) {
  const L = state.lesson;
  if (!L.checked) {
    return `<footer class="sheet"><button type="button" class="btn-primary" data-action="check"${L.picked ? '' : ' disabled'}>Check</button></footer>`;
  }
  if (L.picked === q.answer) {
    const last = L.i === QUESTIONS.length - 1;
    return `
<footer class="sheet good" role="status">
  <div class="sheet-head"><span class="badge">${stroke(ICON.check, 22, '#fff', 3)}</span><strong>${L.praise} +${L.lastEarned} ink</strong></div>
  <p>${q.explain}</p>
  <button type="button" class="btn-primary green" data-action="next" data-autofocus>${last ? 'Finish lesson' : 'Continue'}</button>
</footer>`;
  }
  return `
<footer class="sheet bad" role="status">
  <div class="sheet-head"><span class="badge">${stroke(ICON.cross, 22, '#fff', 3)}</span><strong>Not quite</strong></div>
  <p>Otto’s hint: ${q.hint}</p>
  <button type="button" class="btn-primary red" data-action="retry" data-autofocus>Try again</button>
</footer>`;
}

function finishScreen() {
  const L = state.lesson;
  return `
<main class="screen finish">
  ${ottoFull(180)}
  <h1>Lesson complete!</h1>
  <p>You trained three arms today.</p>
  <div class="stats">
    <div class="stat"><b>+${L.earned}</b><span>ink drops</span></div>
    <div class="stat"><b>${state.streak}</b><span>day streak</span></div>
    <div class="stat"><b>${L.hearts}</b><span>hearts left</span></div>
  </div>
  <a class="btn-primary" href="#progress" data-autofocus>See my nine brains</a>
  <a class="btn-ghost" href="#home">Back to home</a>
</main>`;
}

// Node positions around the circle (top-left corner, % of the 342px square), clockwise from the top.
const RING = [[135, 5], [227, 43], [265, 135], [227, 227], [135, 265], [43, 227], [5, 135], [43, 43]]
  .map(([x, y]) => [(x / 342) * 100, (y / 342) * 100]);
const SPOKES = [[171, 41], [263, 79], [301, 171], [263, 263], [171, 301], [79, 263], [41, 171], [79, 79]];

function progressScreen() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const week = days.map((d, i) => {
    const done = i < 5 || (i === 5 && state.doneToday);
    const cls = done ? 'done' : i === 5 ? 'today' : '';
    return `<div class="day"><span class="dot ${cls}">${done ? stroke(ICON.check, 16, '#fff', 3.2) : ''}</span><span aria-hidden="true">${d}</span></div>`;
  }).join('');

  return `
<main class="screen progress-screen">
  <header class="page-head">
    <h1>Your nine brains</h1>
    <p>One central brain, eight learning arms.</p>
  </header>

  <div class="radial">
    <svg viewBox="0 0 342 342" aria-hidden="true">
      <circle cx="171" cy="171" r="130" fill="none" stroke="#E4DDFF" stroke-width="2"/>
      <g stroke="#C9BCFF" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round">
        ${SPOKES.map(([x, y]) => `<line x1="171" y1="171" x2="${x}" y2="${y}"/>`).join('')}
      </g>
    </svg>
    <div class="brain-center">${ottoFace()}</div>
    ${SUBJECTS.map((s, i) => `
    <button type="button" class="node" data-action="toast" data-msg="${s.name}: level ${s.level}, ${s.pct}% to level ${s.level + 1}"
      style="left: ${RING[i][0]}%; top: ${RING[i][1]}%; border-color: ${s.color}" aria-label="${s.name}, level ${s.level}">
      <b>${s.level}</b><span>${s.name}</span>
    </button>`).join('')}
  </div>

  <section class="card" aria-label="Streak">
    <div class="card-head">${FLAME(22)}${state.streak}-day streak</div>
    <div class="week">${week}</div>
  </section>

  <div class="stats">
    <div class="stat"><b>${(1240 + (state.doneToday ? 45 : 0)).toLocaleString('en-US')}</b><span>XP this week</span></div>
    <div class="stat"><b>${state.lessons}</b><span>Lessons done</span></div>
    <div class="stat"><b style="color: #C2412A">Coral</b><span>League</span></div>
  </div>

  <button type="button" class="reset" data-action="reset">Reset demo</button>
</main>
${tabbar('progress')}`;
}

// ---------------------------------------------------------------- behaviour

const app = document.getElementById('app');

function render() {
  const screens = { home: homeScreen, lesson: lessonScreen, progress: progressScreen };
  app.innerHTML = screens[state.screen]();
  const focusTarget = app.querySelector('[data-autofocus]');
  if (focusTarget) focusTarget.focus({ preventScroll: true });
}

function showToast(msg) {
  app.querySelector('.toast')?.remove();
  const t = document.createElement('div');
  t.className = 'toast';
  t.setAttribute('role', 'status');
  t.textContent = msg;
  app.appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function route() {
  const hash = location.hash.replace('#', '');
  const next = ['home', 'lesson', 'progress'].includes(hash) ? hash : 'home';
  if (next === 'lesson' && (state.screen !== 'lesson' || state.lesson.done)) state.lesson = newLesson();
  state.screen = next;
  render();
  app.querySelector('.screen')?.scrollTo(0, 0);
}

const actions = {
  pick(el) {
    const L = state.lesson;
    if (L.checked) return;
    L.picked = el.dataset.value;
    render();
  },
  check() {
    const L = state.lesson;
    const q = QUESTIONS[L.i];
    if (!L.picked) return;
    L.checked = true;
    if (L.picked === q.answer) {
      L.lastEarned = L.firstTry ? 15 : 5;
      L.earned += L.lastEarned;
      L.praise = PRAISE[Math.floor(Math.random() * PRAISE.length)];
    } else {
      L.hearts = Math.max(0, L.hearts - 1);
      L.firstTry = false;
    }
    render();
  },
  retry() {
    Object.assign(state.lesson, { picked: null, checked: false });
    render();
  },
  next() {
    const L = state.lesson;
    if (L.i < QUESTIONS.length - 1) {
      Object.assign(L, { i: L.i + 1, picked: null, checked: false, firstTry: true });
    } else {
      L.done = true;
      state.ink += L.earned;
      state.lessons += 1;
      if (!state.doneToday) { state.streak += 1; state.doneToday = true; }
      save();
    }
    render();
    app.querySelector('.screen')?.scrollTo(0, 0);
  },
  reset() {
    try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
    Object.assign(state, DEFAULTS, { lesson: newLesson() });
    render();
    showToast('Demo reset');
  },
  toast(el) { showToast(el.dataset.msg); },
};

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  actions[el.dataset.action]?.(el);
});

window.addEventListener('hashchange', route);
route();
