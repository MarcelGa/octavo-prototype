'use strict';

/* Octavo clickable prototype: plain JavaScript, no build step, no dependencies.
   Routes (hash based, so the back button works):
     #home              home screen
     #course/<id>       a subject's curriculum
     #lesson/<id>       interactive slides, then a quiz on them
     #practice          "Today's mix" quick quiz
     #progress          the "nine brains" profile screen */

const { courses, speak, tone, sfx, NOTE } = window.Octavo;

// ---------------------------------------------------------------- subjects

const SUBJECTS = [
  { name: 'Languages', topic: 'Spanish',   level: 7, color: '#E8613F', tint: '#FFE9E2', text: '#9A3A1F', icon: 'M4 5h16v10H9l-5 4z' },
  { name: 'Medicine',  topic: 'Nervous system', level: 3, color: '#E5484D', tint: '#FDE7E8', text: '#9B2226', icon: 'M3 12h4l2-5 4 10 2-5h6' },
  { name: 'Math',      topic: 'Fractions', level: 9, color: '#3E63DD', tint: '#E6ECFC', text: '#2A44A8', icon: 'M17 5H7l6 7-6 7h10' },
  { name: 'Physics',   topic: 'Motion',    level: 4, color: '#8E4EC6', tint: '#F1E8FA', text: '#6A2E9E', icon: 'M12 9a3 3 0 1 0 0.01 0M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8' },
  { name: 'Circuits',  topic: "Ohm's law", level: 5, color: '#D18A00', tint: '#FEF3DD', text: '#7A5000', icon: 'M13 3L5 14h6l-1 7 8-11h-6z' },
  { name: 'Code',      topic: 'Python',    level: 6, color: '#12A594', tint: '#DDF5F1', text: '#0B6B60', icon: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14' },
  { name: 'Chemistry', topic: 'Atoms',     level: 2, color: '#30A46C', tint: '#E0F4E8', text: '#1C6B45', icon: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3' },
  { name: 'Music',     topic: 'Notes',     level: 1, color: '#D6409F', tint: '#FBE6F3', text: '#962A6E', icon: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0M20 16a3 3 0 1 1-6 0a3 3 0 1 1 6 0' },
];
const subject = (name) => SUBJECTS.find((s) => s.name === name);

// Index every lesson and remember which course it belongs to.
const ALL_LESSONS = [];
for (const c of courses) {
  c.subjectInfo = subject(c.subject);
  for (const u of c.units) for (const l of u.lessons) { l.course = c; ALL_LESSONS.push(l); }
}
const lessonById = (id) => ALL_LESSONS.find((l) => l.id === id);
const courseById = (id) => courses.find((c) => c.id === id);
const courseFor = (name) => courses.find((c) => c.subject === name);
const courseLessons = (c) => c.units.flatMap((u) => u.lessons);
const nextLessonIn = (c) => courseLessons(c).find((l) => !state.completed[l.id]) || null;
const nextAfter = (l) => { const ls = courseLessons(l.course); return ls[ls.indexOf(l) + 1] || null; };
const courseDone = (c) => courseLessons(c).filter((l) => state.completed[l.id]).length;

// ---------------------------------------------------------------- practice quiz ("Today's mix")

const CIRCUIT_FIGURE = `
<svg viewBox="0 0 300 140" role="img" aria-label="Circuit: a 9 volt battery in a loop with a 3 ohm resistor; the current I is unknown">
  <g fill="none" stroke="#1E1A3C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
    <path d="M40 62 V30 H120"/><path d="M120 30 l5 -10 l10 20 l10 -20 l10 20 l10 -20 l10 20 l5 -10"/>
    <path d="M180 30 H260 V110 H40 V78"/><path d="M26 62 H54"/>
  </g>
  <path d="M32 78 H48" stroke="#1E1A3C" stroke-width="6" stroke-linecap="round"/>
  <g fill="none" stroke="#6C4CF1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M276 56 v30"/><path d="M270 78 l6 8 l6 -8"/></g>
  <text x="64" y="76" font-family="Nunito, sans-serif" font-weight="800" font-size="16" fill="#1E1A3C">9 V</text>
  <text x="136" y="62" font-family="Nunito, sans-serif" font-weight="800" font-size="16" fill="#1E1A3C">3 Ω</text>
  <text x="200" y="76" font-family="Nunito, sans-serif" font-weight="800" font-size="16" fill="#6C4CF1">I = ?</text>
</svg>`;

const PRACTICE = [
  { subject: 'Circuits', type: 'choice', prompt: 'A 9 V battery is connected to a 3 Ω resistor. How much current flows?', art: CIRCUIT_FIGURE,
    options: ['3 A', '27 A', '0.33 A', '6 A'], answer: '3 A',
    explain: "Ohm's law: I = V ÷ R = 9 V ÷ 3 Ω = <strong>3 A</strong>.", hint: 'current is voltage <em>divided</em> by resistance.' },
  { subject: 'Languages', type: 'choice', prompt: 'How do you say “the octopus” in Spanish?',
    options: ['el pulpo', 'la pulpa', 'el polvo', 'el pueblo'], answer: 'el pulpo',
    explain: '<strong>El pulpo</strong>. Careful: <em>la pulpa</em> is pulp, <em>el polvo</em> is dust and <em>el pueblo</em> is a village.', hint: 'it’s a masculine noun that starts with “pul…”.' },
  { subject: 'Medicine', type: 'choice', prompt: 'How many chambers does the human heart have?',
    options: ['2', '3', '4', '6'], answer: '4',
    explain: '<strong>4</strong>: two atria on top and two ventricles below. (Otto has three whole hearts!)', hint: 'think two on top, two below.' },
];

const PRAISE = ['Brilliant!', 'Nailed it!', 'Spot on!', 'Tentacular!', 'Big brain!'];

// ---------------------------------------------------------------- art and icons

const OTTO_ARMS = `
  <g fill="none" stroke="#6C4CF1" stroke-width="18" stroke-linecap="round">
    <path d="M72 140 C 46 156, 28 186, 46 204 C 56 213, 68 206, 62 196"/><path d="M94 152 C 84 180, 82 206, 102 214"/>
    <path d="M120 156 C 114 184, 128 200, 118 220"/><path d="M146 152 C 156 180, 158 206, 138 214"/>
    <path d="M168 140 C 194 156, 212 186, 194 204 C 184 213, 172 206, 178 196"/>
    <path d="M178 114 C 206 106, 220 86, 212 64 C 208 54, 196 56, 200 66"/>
  </g>`;
const OTTO_HEAD = `
  <ellipse cx="120" cy="142" rx="50" ry="22" fill="#6C4CF1"/><ellipse cx="120" cy="100" rx="66" ry="64" fill="#6C4CF1"/>
  <circle cx="96" cy="104" r="20" fill="#fff"/><circle cx="144" cy="104" r="20" fill="#fff"/>
  <circle cx="100" cy="107" r="10" fill="#1E1A3C"/><circle cx="148" cy="107" r="10" fill="#1E1A3C"/>
  <circle cx="104" cy="102" r="3.5" fill="#fff"/><circle cx="152" cy="102" r="3.5" fill="#fff"/>
  <g fill="none" stroke="#1E1A3C" stroke-width="4"><circle cx="96" cy="104" r="24"/><circle cx="144" cy="104" r="24"/></g>
  <ellipse cx="76" cy="134" rx="9" ry="5" fill="#FF7A59" opacity="0.75"/><ellipse cx="164" cy="134" rx="9" ry="5" fill="#FF7A59" opacity="0.75"/>
  <path d="M108 136 Q120 146 132 136" fill="none" stroke="#1E1A3C" stroke-width="4" stroke-linecap="round"/>
  <path d="M92 44 v14 q28 12 56 0 v-14 z" fill="#1E1A3C"/><polygon points="120,14 176,34 120,54 64,34" fill="#1E1A3C"/>
  <path d="M120 34 L168 40 L170 62" fill="none" stroke="#FF7A59" stroke-width="3" stroke-linecap="round"/><circle cx="170" cy="66" r="5" fill="#FF7A59"/>`;
const ottoFull = (size) => `<svg width="${size}" height="${size}" viewBox="20 10 200 220" aria-hidden="true">${OTTO_ARMS}${OTTO_HEAD}</svg>`;
const ottoFace = () => `<svg viewBox="44 10 152 160" role="img" aria-label="Otto, the central brain">${OTTO_HEAD}</svg>`;

const ICON = {
  home: 'M3 11l9-7 9 7v9H3z',
  target: 'M12 3a9 9 0 1 0 0.01 0M12 8a4 4 0 1 0 0.01 0',
  trophy: 'M8 4h8v5a4 4 0 0 1-8 0zM8 6H4a3 3 0 0 0 4 4M16 6h4a3 3 0 0 1-4 4M12 13v4M8 20h8',
  user: 'M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8M4 20c1-4 4-6 8-6s7 2 8 6',
  close: 'M6 6l12 12M18 6L6 18',
  back: 'M15 5l-7 7 7 7',
  check: 'M5 12l5 5 9-10',
  cross: 'M7 7l10 10M17 7L7 17',
  play: 'M7 4l13 8-13 8z',
  replay: 'M4 12a8 8 0 1 0 2.3-5.7M4 4v5h5',
  speaker: 'M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12',
  mute: 'M4 9h4l5-4v14l-5-4H4zM17 9l5 6M22 9l-5 6',
  lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3',
  slides: 'M4 5h16v11H4zM9 20h6M12 16v4',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0M20 16a3 3 0 1 1-6 0a3 3 0 1 1 6 0',
};
const stroke = (d, size = 24, color = 'currentColor', width = 2.2) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
const FLAME = (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 2 2 3 4 0-3 0-5 0-7z" fill="#FF7A59"/></svg>`;
const DROP = (s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" fill="#6C4CF1"/></svg>`;
const HEART = (s = 22) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="#FF7A59"/></svg>`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const plural = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

// ---------------------------------------------------------------- state

const STORE_KEY = 'octavo-prototype-v2';
const defaults = () => ({ ink: 340, streak: 12, lessons: 38, doneToday: false, completed: {}, lastCourse: 'nervous-system', sound: true });

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
}
function save() {
  try {
    const { ink, streak, lessons, doneToday, completed, lastCourse, sound } = state;
    localStorage.setItem(STORE_KEY, JSON.stringify({ ink, streak, lessons, doneToday, completed, lastCourse, sound }));
  } catch { /* storage blocked: the demo still works, it just won't remember */ }
}

const state = { route: { name: 'home' }, ...defaults(), ...loadSaved(), run: null };
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function shuffled(n) {
  const idx = [...Array(n).keys()];
  if (n < 2) return idx;
  do {
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  } while (idx.every((v, i) => v === i));
  return idx;
}

function newRun(kind, lesson) {
  const run = {
    kind, lesson, phase: kind === 'lesson' ? 'slides' : 'quiz', slide: 0, dir: '',
    questions: kind === 'lesson' ? lesson.quiz : PRACTICE,
    q: 0, hearts: 5, earned: 0, firstTryCount: 0, combo: 0, bestCombo: 0,
  };
  startQuestion(run);
  return run;
}
function startQuestion(run) {
  const q = run.questions[run.q];
  Object.assign(run, { picked: null, order: [], checked: false, firstTry: true, lastEarned: 0, praise: '', justLost: false });
  run.shuffle = q && q.type === 'order' ? shuffled(q.items.length) : null;
}

const answerLabel = (q) => (q.type === 'tf' ? (q.answer ? 'True' : 'False') : q.answer);
const optionsFor = (q) => (q.type === 'tf' ? ['True', 'False'] : q.options);
function isCorrect(q, run) {
  if (q.type === 'order') return run.order.length === q.items.length && run.order.every((v, i) => v === i);
  return run.picked === answerLabel(q);
}

// ---------------------------------------------------------------- shared pieces

function tabbar(active) {
  const tabs = [
    { id: 'home', label: 'Learn', href: '#home', icon: ICON.home },
    { id: 'practice', label: 'Practice', href: '#practice', icon: ICON.target },
    { id: 'leagues', label: 'Leagues', icon: ICON.trophy },
    { id: 'progress', label: 'Profile', href: '#progress', icon: ICON.user },
  ];
  return `<nav class="tabbar" aria-label="Main">${tabs.map((t) => t.href
    ? `<a class="tab${t.id === active ? ' active' : ''}" href="${t.href}"${t.id === active ? ' aria-current="page"' : ''}>${stroke(t.icon)}<span>${t.label}</span></a>`
    : `<button type="button" class="tab" data-action="toast" data-msg="${t.label} are coming soon">${stroke(t.icon)}<span>${t.label}</span></button>`
  ).join('')}</nav>`;
}

const lessonMeta = (l) => `${plural(l.slides.length, 'slide')} · ${plural(l.quiz.length, 'question')} · ~${l.minutes} min`;

// ---------------------------------------------------------------- home

function homeScreen() {
  const featured = courseById(state.lastCourse) || courses[0];
  let course = featured;
  let next = nextLessonIn(course);
  if (!next) {
    course = courses.find((c) => nextLessonIn(c)) || featured;
    next = nextLessonIn(course);
  }
  const s = course.subjectInfo;
  const pct = Math.round((courseDone(course) / courseLessons(course).length) * 100);

  const continueCard = next ? `
  <section class="continue" aria-labelledby="next-title">
    <span class="eyebrow">Continue · ${course.title}</span>
    <h2 id="next-title">${next.title}</h2>
    <span class="continue-meta">${stroke(ICON.slides, 16, '#E6E0FF')} ${lessonMeta(next)}</span>
    <div class="bar-row">
      <div class="bar"><div style="width: ${pct}%"></div></div>
      <span>${courseDone(course)}/${courseLessons(course).length} lessons</span>
    </div>
    <a class="btn-light" href="#lesson/${next.id}">Start lesson</a>
  </section>` : `
  <section class="continue">
    <span class="eyebrow">Every lesson done</span>
    <h2>All eight arms trained!</h2>
    <a class="btn-light" href="#progress">See my nine brains</a>
  </section>`;

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
    <p class="bubble">${state.doneToday ? 'Great work today! Fancy another round?' : 'Nine brains, zero limits. Which arm are we training today?'}</p>
  </div>

  ${continueCard}

  <a class="mix-card" href="#practice">
    <span class="mix-icon" style="background: ${s.tint}">${stroke(ICON.target, 22, '#6C4CF1')}</span>
    <span class="mix-text"><b>Today's mix</b><span>3 quick questions from 3 different arms</span></span>
    ${stroke('M9 6l6 6-6 6', 20, '#4A4566')}
  </a>

  <h3 class="section-title">Your eight arms</h3>
  <div class="arms">
    ${SUBJECTS.map((sub) => {
      const c = courseFor(sub.name);
      const total = courseLessons(c).length;
      const done = courseDone(c);
      return `
    <a class="arm" href="#course/${c.id}">
      <span class="arm-head">
        <span class="arm-icon" style="background: ${sub.tint}">${stroke(sub.icon, 18, sub.color)}</span>
        <span class="arm-text">
          <span class="arm-name">${sub.name}</span>
          <span class="arm-meta">${sub.topic} · ${done}/${total} lessons</span>
        </span>
      </span>
      <span class="meter"><span style="width: ${Math.max(4, (done / total) * 100)}%; background: ${sub.color}"></span></span>
    </a>`;
    }).join('')}
  </div>
</main>
${tabbar('home')}`;
}

// ---------------------------------------------------------------- course (curriculum)

function courseScreen(c) {
  const s = c.subjectInfo;
  const total = courseLessons(c).length;
  const done = courseDone(c);
  const upNext = nextLessonIn(c);
  let n = 0;
  return `
<main class="screen course">
  <header class="course-top">
    <a class="icon-btn" href="#home" aria-label="Back to home">${stroke(ICON.back, 24, 'currentColor', 2.6)}</a>
    <span class="course-subject" style="color: ${s.text}">${s.name}</span>
  </header>

  <section class="course-hero" style="background: ${s.tint}">
    <span class="course-icon">${stroke(s.icon, 28, s.color)}</span>
    <h1>${c.title}</h1>
    <p>${c.blurb}</p>
    <div class="hero-bar"><div class="meter"><span style="width: ${(done / total) * 100}%; background: ${s.color}"></span></div><span>${done}/${total} lessons</span></div>
  </section>

  ${c.units.map((u, ui) => `
  <section class="unit">
    <h2><span>Unit ${ui + 1}</span> ${u.title}</h2>
    <ol class="path">
      ${u.lessons.map((l) => {
        n += 1;
        const isDone = !!state.completed[l.id];
        const isNext = upNext === l;
        const result = state.completed[l.id];
        return `
      <li>
        <a class="lesson-row${isDone ? ' done' : ''}${isNext ? ' next' : ''}" href="#lesson/${l.id}">
          <span class="path-dot" style="${isNext ? `background: ${s.color}; border-color: ${s.color}` : isDone ? '' : `border-color: ${s.color}`}">${isDone ? stroke(ICON.check, 18, '#fff', 3) : isNext ? stroke(ICON.play, 16, '#fff', 2) : n}</span>
          <span class="lesson-text">
            <b>${l.title}</b>
            <small>${isDone ? `Quiz ${result.score}/${result.total} on first try · tap to review` : lessonMeta(l)}</small>
          </span>
          ${isNext ? '<span class="go">Start</span>' : ''}
        </a>
      </li>`;
      }).join('')}
      ${(u.soon || []).map((t) => `
      <li><div class="lesson-row soon"><span class="path-dot">${stroke(ICON.lock, 16, '#6E6990')}</span><span class="lesson-text"><b>${t}</b><small>Coming soon</small></span></div></li>`).join('')}
    </ol>
  </section>`).join('')}

  ${(c.soonUnits || []).map((t, i) => `
  <section class="unit soon-unit">
    <h2><span>Unit ${c.units.length + i + 1}</span> ${t}</h2>
    <p class="soon-note">${stroke(ICON.lock, 16, '#6E6990')} Unlocks in the full app</p>
  </section>`).join('')}
</main>
${tabbar('home')}`;
}

// ---------------------------------------------------------------- lesson: slides

function segments(run) {
  const nSlides = run.lesson.slides.length;
  const segs = [];
  for (let i = 0; i < nSlides; i++) {
    const cls = i < run.slide || run.phase !== 'slides' ? 'full' : i === run.slide ? 'current' : '';
    segs.push(`<span class="seg ${cls}"></span>`);
  }
  const quizCls = run.phase === 'quiz' || run.phase === 'intro' ? 'current quiz' : 'quiz';
  segs.push(`<span class="seg ${quizCls}"></span>`);
  return `<div class="segments" aria-hidden="true">${segs.join('')}</div>`;
}

function slideScreen(run) {
  const l = run.lesson;
  const c = l.course;
  const s = c.subjectInfo;
  const sl = l.slides[run.slide];
  const first = run.slide === 0;
  const last = run.slide === l.slides.length - 1;

  const spots = sl.spots ? sl.spots.map((p, i) => `
    <button type="button" class="spot" style="left: ${p.x}%; top: ${p.y}%" data-action="spot" data-i="${i}" aria-pressed="false" aria-label="${esc(p.label)}">${i + 1}</button>`).join('') : '';

  const art = sl.art ? `
  <div class="art" style="background: ${sl.bg || c.artBg}">
    ${sl.art}
    ${spots}
  </div>` : '';

  const spotInfo = sl.spots ? `<div class="spot-info" aria-live="polite"><b>Tap the numbered dots</b> to explore each part. <span class="spot-count">0/${sl.spots.length} explored</span></div>` : '';
  const replay = sl.replay ? `<button type="button" class="btn-chip" data-action="replay">${stroke(ICON.play, 16, 'currentColor', 2.2)} ${sl.replay}</button>` : '';

  const phrases = sl.phrases ? `<ul class="phrases">${sl.phrases.map((p) => `
    <li><button type="button" class="say-btn" data-action="say" data-text="${esc(p.say || p.es)}" data-lang="${p.lang || 'es-ES'}" aria-label="Listen: ${esc(p.es)}">${stroke(ICON.speaker, 20)}</button>
      <span><b lang="${(p.lang || 'es-ES').slice(0, 2)}">${p.es}</b><small>${p.en}</small></span></li>`).join('')}</ul>` : '';

  const cards = sl.cards ? `<div class="flip-grid">${sl.cards.map((cd) => `
    <button type="button" class="flip" data-action="flip" data-say="${esc(cd.front)}" aria-pressed="false" aria-label="${esc(cd.front)}: tap to reveal">
      <span class="flip-inner"><span class="flip-front" lang="es">${cd.front}</span><span class="flip-back">${cd.back}</span></span>
    </button>`).join('')}</div>` : '';

  const code = sl.code ? `
  <div class="code-runner" data-step="-1">
    <pre class="code" aria-label="Python code">${sl.code.lines.map((ln, i) => `<span class="ln" data-line="${i}">${esc(ln) || ' '}</span>`).join('')}</pre>
    <div class="runner-btns">
      <button type="button" class="btn-secondary" data-action="code-reset">Reset</button>
      <button type="button" class="btn-primary small" data-action="code-step">Run next line</button>
    </div>
    <p class="code-note" aria-live="polite">Press <b>Run next line</b> to step through the program.</p>
    <div class="code-side">
      <div><b>Variables</b><div class="vars">none yet</div></div>
      <div><b>Output</b><div class="out"></div></div>
    </div>
  </div>` : '';

  const points = sl.points ? `<ul class="points">${sl.points.map((p) => `<li>${stroke(ICON.check, 18, s.color, 3)}<span>${p}</span></li>`).join('')}</ul>` : '';

  return `
<main class="screen player">
  <header class="lesson-top">
    <a class="icon-btn" href="#course/${c.id}" aria-label="Close lesson">${stroke(ICON.close, 22, 'currentColor', 2.6)}</a>
    ${segments(run)}
    <span class="counter">${run.slide + 1}/${l.slides.length}</span>
  </header>
  <div class="slide-stage">
    <article class="slide ${run.dir}" aria-roledescription="slide" aria-label="${run.slide + 1} of ${l.slides.length}">
      <span class="tag" style="background: ${s.tint}; color: ${s.text}">${stroke(s.icon, 16, s.color, 2.4)} ${l.title}</span>
      <h1 class="slide-title">${sl.title}</h1>
      ${art}
      ${spotInfo}
      ${replay}
      ${sl.controls || ''}
      ${sl.text ? `<div class="slide-text">${sl.text}</div>` : ''}
      ${phrases}${cards}${code}${points}
    </article>
  </div>
</main>
<footer class="sheet nav-sheet">
  <button type="button" class="btn-secondary" data-action="prev"${first ? ' disabled' : ''}>Back</button>
  <button type="button" class="btn-primary" data-action="next-slide">${last ? 'Start quiz' : 'Next'}</button>
</footer>`;
}

function introScreen(run) {
  const l = run.lesson;
  return `
<main class="screen finish">
  ${ottoFull(150)}
  <h1>Quiz time!</h1>
  <p>${plural(l.quiz.length, 'question')} about <b>${l.title}</b>. Get it right on the first try for <b>+15 ink</b>.</p>
  <button type="button" class="btn-primary" data-action="start-quiz" data-autofocus>Start quiz</button>
  <button type="button" class="btn-ghost" data-action="review">Review the slides</button>
</main>`;
}

// ---------------------------------------------------------------- quiz

function quizScreen(run) {
  const q = run.questions[run.q];
  const s = subject(q.subject || run.lesson.course.subject);
  const solved = run.checked && isCorrect(q, run);
  const pct = Math.round(((run.q + (solved ? 1 : 0)) / run.questions.length) * 100);
  const closeHref = run.kind === 'lesson' ? `#course/${run.lesson.course.id}` : '#home';
  const tagText = run.kind === 'lesson' ? `Quiz · ${run.lesson.title}` : `${s.name} · ${s.topic}`;

  let media = '';
  if (q.art) media += `<figure class="figure">${q.art}</figure>`;
  if (q.code) media += `<pre class="code-block">${esc(q.code)}</pre>`;
  if (q.say) media += `<button type="button" class="listen-btn" data-action="say" data-text="${esc(q.say.text)}" data-lang="${q.say.lang || 'es-ES'}">${stroke(ICON.speaker, 26)} <span>Play audio</span></button>`;
  if (q.tones) media += `<button type="button" class="listen-btn" data-action="tones">${stroke(ICON.music, 24)} <span>Play the notes</span></button>`;

  let body;
  if (q.type === 'order') {
    const state2 = run.checked ? (solved ? ' right' : ' wrong') : '';
    body = `
  <div class="order-answer${state2}" aria-label="Your order">
    ${run.order.length ? run.order.map((i, k) => `<button type="button" class="chip placed" data-action="unplace" data-i="${i}"${run.checked ? ' disabled' : ''}><span class="chip-n">${k + 1}</span>${q.items[i]}</button>`).join('') : '<span class="order-hint">Tap the items below in the right order</span>'}
  </div>
  <div class="order-pool" aria-label="Items to place">
    ${run.shuffle.filter((i) => !run.order.includes(i)).map((i) => `<button type="button" class="chip" data-action="place" data-i="${i}"${run.checked ? ' disabled' : ''}>${q.items[i]}</button>`).join('')}
  </div>`;
  } else {
    const opts = optionsFor(q);
    const long = opts.some((o) => o.length > 14);
    body = `<div class="options${long ? ' long' : ''}" role="group" aria-label="Answers">${opts.map((o, idx) => {
      let cls = 'option';
      if (run.picked === o) cls += run.checked ? (o === answerLabel(q) ? ' right' : ' wrong') : ' selected';
      // After a right answer, fade the other options.
      if (run.checked && isCorrect(q, run) && run.picked !== o) cls += ' dim';
      return `<button type="button" class="${cls}" data-action="pick" data-value="${esc(o)}" aria-pressed="${run.picked === o}"${run.checked ? ' disabled' : ''}><span class="opt-key" aria-hidden="true">${idx + 1}</span>${o}</button>`;
    }).join('')}</div>`;
  }

  return `
<main class="screen lesson">
  <header class="lesson-top">
    <a class="icon-btn" href="${closeHref}" aria-label="Close quiz">${stroke(ICON.close, 22, 'currentColor', 2.6)}</a>
    <div class="progress" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}"><div style="width: ${pct}%"></div></div>
    <span class="hearts${run.justLost ? ' lost' : ''}">${HEART()}${run.hearts}<span class="sr"> hearts left</span></span>
    <button type="button" class="icon-btn sound-btn" data-action="toggle-sound" aria-pressed="${state.sound}" aria-label="Sound effects">${stroke(state.sound ? ICON.speaker : ICON.mute, 22)}</button>
  </header>
  <span class="tag" style="background: ${s.tint}; color: ${s.text}">${stroke(s.icon, 16, s.color, 2.4)} ${tagText}</span>
  <h1 class="question">${q.prompt}</h1>
  ${q.statement ? `<p class="statement">“${q.statement}”</p>` : ''}
  ${media}
  ${body}
</main>
${quizFooter(run, q)}`;
}

function quizFooter(run, q) {
  if (!run.checked) {
    const ready = q.type === 'order' ? run.order.length === q.items.length : !!run.picked;
    return `<footer class="sheet"><button type="button" class="btn-primary" data-action="check"${ready ? '' : ' disabled'}>Check</button></footer>`;
  }
  if (isCorrect(q, run)) {
    const last = run.q === run.questions.length - 1;
    return `
<footer class="sheet good" role="status">
  <div class="sheet-head"><span class="badge">${stroke(ICON.check, 22, '#fff', 3)}</span><strong>${run.praise} <span class="ink-pop">+${run.lastEarned} ink</span></strong></div>
  ${run.combo >= 2 && run.firstTry ? `<span class="combo">${FLAME(16)} ${run.combo} in a row!</span>` : ''}
  <p>${q.explain || ''}</p>
  <button type="button" class="btn-primary green" data-action="next-q" data-autofocus>${last ? 'Finish' : 'Continue'}</button>
</footer>`;
  }
  return `
<footer class="sheet bad" role="status">
  <div class="sheet-head"><span class="badge">${stroke(ICON.cross, 22, '#fff', 3)}</span><strong>Not quite</strong></div>
  <p>Otto’s hint: ${q.hint || 'look back at what the slides showed.'}</p>
  <button type="button" class="btn-primary red" data-action="retry" data-autofocus>Try again</button>
</footer>`;
}

function doneScreen(run) {
  const total = run.questions.length;
  if (run.kind === 'practice') {
    return `
<main class="screen finish">
  ${ottoFull(170)}
  <h1>Mix complete!</h1>
  <p>You trained three arms today.</p>
  <div class="stats">
    <div class="stat"><b>+${run.earned}</b><span>ink drops</span></div>
    <div class="stat"><b>${state.streak}</b><span>day streak</span></div>
    <div class="stat"><b>${run.hearts}</b><span>hearts left</span></div>
  </div>
  <a class="btn-primary" href="#progress" data-autofocus>See my nine brains</a>
  <a class="btn-ghost" href="#home">Back to home</a>
</main>`;
  }
  const l = run.lesson;
  const next = nextAfter(l);
  const perfect = run.firstTryCount === total;
  return `
<main class="screen finish">
  ${ottoFull(170)}
  <h1>${perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
  <p>You finished <b>${l.title}</b>.</p>
  <div class="stats">
    <div class="stat"><b>${run.firstTryCount}/${total}</b><span>first try</span></div>
    <div class="stat"><b>+${run.earned}</b><span>ink drops</span></div>
    <div class="stat"><b>${run.bestCombo}</b><span>best in a row</span></div>
  </div>
  ${next
    ? `<a class="btn-primary" href="#lesson/${next.id}" data-autofocus>Next: ${next.title}</a>`
    : `<a class="btn-primary" href="#course/${l.course.id}" data-autofocus>Back to the course</a>`}
  <a class="btn-ghost" href="${next ? `#course/${l.course.id}` : '#home'}">${next ? 'Back to the course' : 'Back to home'}</a>
</main>`;
}

// ---------------------------------------------------------------- progress (nine brains)

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
  const completedCount = Object.keys(state.completed).length;

  return `
<main class="screen progress-screen">
  <header class="page-head">
    <h1>Your nine brains</h1>
    <p>One central brain, eight learning arms. Tap an arm to open its course.</p>
  </header>

  <div class="radial">
    <svg viewBox="0 0 342 342" aria-hidden="true">
      <circle cx="171" cy="171" r="130" fill="none" stroke="#E4DDFF" stroke-width="2"/>
      <g stroke="#C9BCFF" stroke-width="3" stroke-dasharray="2 7" stroke-linecap="round">
        ${SPOKES.map(([x, y]) => `<line x1="171" y1="171" x2="${x}" y2="${y}"/>`).join('')}
      </g>
    </svg>
    <div class="brain-center">${ottoFace()}</div>
    ${SUBJECTS.map((s, i) => {
      const c = courseFor(s.name);
      return `
    <a class="node" href="#course/${c.id}" style="left: ${RING[i][0]}%; top: ${RING[i][1]}%; border-color: ${s.color}" aria-label="${s.name}, level ${s.level}, ${courseDone(c)} of ${courseLessons(c).length} lessons done">
      <b>${s.level}</b><span>${s.name}</span>
    </a>`;
    }).join('')}
  </div>

  <section class="card" aria-label="Streak">
    <div class="card-head">${FLAME(22)}${state.streak}-day streak</div>
    <div class="week">${week}</div>
  </section>

  <div class="stats">
    <div class="stat"><b>${(1240 + completedCount * 60 + (state.doneToday ? 45 : 0)).toLocaleString('en-US')}</b><span>XP this week</span></div>
    <div class="stat"><b>${state.lessons}</b><span>Lessons done</span></div>
    <div class="stat"><b style="color: #C2412A">Coral</b><span>League</span></div>
  </div>

  <button type="button" class="reset" data-action="reset">Reset demo</button>
</main>
${tabbar('progress')}`;
}

// ---------------------------------------------------------------- rendering & routing

const app = document.getElementById('app');

function render() {
  const r = state.route;
  let html;
  if (r.name === 'course') html = courseScreen(courseById(r.id));
  else if (r.name === 'lesson' || r.name === 'practice') {
    const run = state.run;
    html = run.phase === 'slides' ? slideScreen(run)
      : run.phase === 'intro' ? introScreen(run)
      : run.phase === 'quiz' ? quizScreen(run)
      : doneScreen(run);
  } else if (r.name === 'progress') html = progressScreen();
  else html = homeScreen();

  app.innerHTML = html;

  if (reduceMotion) app.querySelectorAll('svg').forEach((svg) => svg.pauseAnimations && svg.pauseAnimations());

  const run = state.run;
  if ((r.name === 'lesson') && run && run.phase === 'slides') {
    const sl = run.lesson.slides[run.slide];
    const root = app.querySelector('.slide');
    if (sl.setup) {
      try { sl.setup(root, { speak, tone, NOTE, toast: showToast }); } catch (err) { console.error(err); }
    }
    if (sl.autoplay) setTimeout(() => replay(root), 350);
  }

  const focusTarget = app.querySelector('[data-autofocus]');
  if (focusTarget) focusTarget.focus({ preventScroll: true });
}

function parseHash() {
  const [name, id] = location.hash.replace(/^#\/?/, '').split('/');
  if (name === 'course' && courseById(id)) return { name, id };
  if (name === 'lesson' && id && lessonById(id)) return { name, id };
  if (name === 'lesson' || name === 'practice') return { name: 'practice' };
  if (name === 'progress') return { name };
  return { name: 'home' };
}

function route() {
  const next = parseHash();
  if (next.name === 'lesson') {
    const lesson = lessonById(next.id);
    if (!state.run || state.run.lesson !== lesson || state.run.phase === 'done' || state.route.name !== 'lesson') {
      state.run = newRun('lesson', lesson);
    }
    state.lastCourse = lesson.course.id;
    save();
  } else if (next.name === 'practice') {
    if (!state.run || state.run.kind !== 'practice' || state.run.phase === 'done' || state.route.name !== 'practice') {
      state.run = newRun('practice');
    }
  } else if (next.name === 'course') {
    state.lastCourse = next.id;
    save();
  }
  state.route = next;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  render();
  app.querySelector('.screen')?.scrollTo(0, 0);
}

// ---------------------------------------------------------------- feedback effects

function play(name) {
  if (state.sound) sfx(name);
}

function vibrate(pattern) {
  if (!state.sound || !navigator.vibrate) return;
  try { navigator.vibrate(pattern); } catch { /* not allowed */ }
}

// A burst of confetti from the centre of `fromEl` (or the middle of the screen).
function celebrate(fromEl, count = 18) {
  if (reduceMotion) return;
  const box = app.getBoundingClientRect();
  const r = fromEl ? fromEl.getBoundingClientRect() : { left: box.left + box.width / 2, top: box.top + box.height / 3, width: 0, height: 0 };
  const x = r.left - box.left + r.width / 2;
  const y = r.top - box.top + r.height / 2;
  const colors = ['#6C4CF1', '#FF7A59', '#F5A524', '#12A594', '#3E63DD', '#D6409F'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'confetti';
    const angle = Math.random() * Math.PI * 2;
    const dist = 50 + Math.random() * 100;
    p.style.left = `${x}px`;
    p.style.top = `${y}px`;
    p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', `${(Math.cos(angle) * dist).toFixed(0)}px`);
    p.style.setProperty('--dy', `${(Math.sin(angle) * dist - 50).toFixed(0)}px`);
    p.style.setProperty('--rot', `${(Math.random() * 720 - 360).toFixed(0)}deg`);
    if (i % 3 === 0) p.style.borderRadius = '50%';
    app.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
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

function replay(root) {
  const art = root && root.querySelector('.art');
  if (!art) return;
  art.classList.remove('play');
  void art.offsetWidth; // restart CSS animations
  art.classList.add('play');
  art.querySelectorAll('animate, animateMotion, animateTransform').forEach((a) => {
    if (a.getAttribute('begin') === 'indefinite' && a.beginElement) { try { a.beginElement(); } catch { /* ignore */ } }
  });
}

function goSlide(delta) {
  const run = state.run;
  const n = run.lesson.slides.length;
  if (delta > 0 && run.slide === n - 1) { run.phase = 'intro'; render(); return; }
  const to = Math.min(n - 1, Math.max(0, run.slide + delta));
  if (to === run.slide) return;
  run.dir = delta > 0 ? 'in-next' : 'in-prev';
  run.slide = to;
  render();
  app.querySelector('.screen')?.scrollTo(0, 0);
}

function finishRun(run) {
  run.phase = 'done';
  state.ink += run.earned;
  state.lessons += 1;
  if (!state.doneToday) { state.streak += 1; state.doneToday = true; }
  if (run.kind === 'lesson') {
    const prev = state.completed[run.lesson.id];
    const score = Math.max(prev ? prev.score : 0, run.firstTryCount);
    state.completed[run.lesson.id] = { score, total: run.questions.length };
  }
  save();
}

const actions = {
  // slides
  'next-slide'() { goSlide(1); },
  prev() { goSlide(-1); },
  replay(el) { replay(el.closest('.slide')); },
  spot(el) {
    const run = state.run;
    const sl = run.lesson.slides[run.slide];
    const p = sl.spots[Number(el.dataset.i)];
    const root = el.closest('.slide');
    root.querySelectorAll('.spot').forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    el.classList.add('active', 'seen');
    el.setAttribute('aria-pressed', 'true');
    const seen = root.querySelectorAll('.spot.seen').length;
    root.querySelector('.spot-info').innerHTML = `<b>${p.label}.</b> ${p.info} <span class="spot-count">${seen}/${sl.spots.length} explored</span>`;
  },
  flip(el) {
    el.classList.toggle('flipped');
    const flipped = el.classList.contains('flipped');
    el.setAttribute('aria-pressed', String(flipped));
    el.setAttribute('aria-label', flipped ? `${el.dataset.say}: ${el.querySelector('.flip-back').textContent}` : `${el.dataset.say}: tap to reveal`);
    if (flipped && el.dataset.say) speak(el.dataset.say, 'es-ES');
  },
  say(el) {
    if (!speak(el.dataset.text, el.dataset.lang)) showToast('Audio isn’t available on this device');
  },
  tones() {
    const q = state.run.questions[state.run.q];
    if (!tone(q.tones)) showToast('Audio isn’t available on this device');
  },
  'code-step'(el) { codeStep(el.closest('.code-runner'), 1); },
  'code-reset'(el) { codeStep(el.closest('.code-runner'), 0); },
  'start-quiz'() { state.run.phase = 'quiz'; render(); },
  review() { Object.assign(state.run, { phase: 'slides', slide: 0, dir: '' }); render(); },

  // quiz
  pick(el) {
    const run = state.run;
    if (run.checked) return;
    run.picked = el.dataset.value;
    play('tap');
    render();
  },
  place(el) {
    const run = state.run;
    if (run.checked) return;
    run.order.push(Number(el.dataset.i));
    play('tap');
    render();
  },
  unplace(el) {
    const run = state.run;
    if (run.checked) return;
    run.order = run.order.filter((i) => i !== Number(el.dataset.i));
    play('tap');
    render();
  },
  check() {
    const run = state.run;
    const q = run.questions[run.q];
    run.checked = true;
    const correct = isCorrect(q, run);
    if (correct) {
      run.lastEarned = run.firstTry ? 15 : 5;
      run.earned += run.lastEarned;
      if (run.firstTry) {
        run.firstTryCount += 1;
        run.combo += 1;
        run.bestCombo = Math.max(run.bestCombo, run.combo);
      }
      run.praise = PRAISE[Math.floor(Math.random() * PRAISE.length)];
    } else {
      run.hearts = Math.max(0, run.hearts - 1);
      run.firstTry = false;
      run.combo = 0;
      run.justLost = true;
    }
    render();
    if (correct) {
      play(run.combo >= 3 ? 'combo' : 'correct');
      vibrate(25);
      celebrate(app.querySelector('.option.right, .order-answer.right'), run.combo >= 3 ? 30 : 18);
    } else {
      play('wrong');
      vibrate([70, 50, 70]);
    }
  },
  retry() {
    const run = state.run;
    Object.assign(run, { picked: null, order: [], checked: false, justLost: false });
    render();
  },
  'next-q'() {
    const run = state.run;
    if (run.q < run.questions.length - 1) {
      run.q += 1;
      startQuestion(run);
    } else {
      finishRun(run);
    }
    render();
    app.querySelector('.screen')?.scrollTo(0, 0);
    if (run.phase === 'done') {
      play('complete');
      vibrate([30, 40, 30, 40, 60]);
      setTimeout(() => celebrate(app.querySelector('.finish h1'), 46), 150);
    }
  },
  'toggle-sound'() {
    state.sound = !state.sound;
    save();
    render();
    if (state.sound) play('tap');
    showToast(state.sound ? 'Sound effects on' : 'Sound effects off');
  },

  // misc
  reset() {
    try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
    Object.assign(state, defaults(), { run: null });
    render();
    showToast('Demo reset');
  },
  toast(el) { showToast(el.dataset.msg); },
};

// Steps through a slide's Python program one line at a time.
function codeStep(runner, mode) {
  const run = state.run;
  const { lines, steps } = run.lesson.slides[run.slide].code;
  let i = mode === 0 ? -1 : Number(runner.dataset.step) + 1;
  if (i >= steps.length) i = steps.length - 1;
  runner.dataset.step = String(i);
  const step = steps[i];
  runner.querySelectorAll('.ln').forEach((ln) => ln.classList.toggle('active', !!step && Number(ln.dataset.line) === step.line));
  const vars = step ? Object.entries(step.vars || {}) : [];
  runner.querySelector('.vars').innerHTML = vars.length
    ? vars.map(([k, v]) => `<span class="var"><b>${esc(k)}</b> = ${esc(v)}</span>`).join('')
    : 'none yet';
  runner.querySelector('.out').textContent = step && step.out ? step.out : '';
  runner.querySelector('.code-note').innerHTML = step ? step.note : 'Press <b>Run next line</b> to step through the program.';
  const btn = runner.querySelector('[data-action="code-step"]');
  const finished = i === steps.length - 1;
  btn.disabled = finished;
  btn.textContent = finished ? 'Program finished' : 'Run next line';
  if (lines && step) runner.querySelector(`.ln[data-line="${step.line}"]`)?.scrollIntoView({ block: 'nearest' });
}

app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  actions[el.dataset.action]?.(el);
});

// Swipe between slides.
let swipeStart = null;
app.addEventListener('pointerdown', (e) => {
  if (!e.target.closest('.slide-stage') || e.target.closest('input, button, .code-runner')) { swipeStart = null; return; }
  swipeStart = { x: e.clientX, y: e.clientY };
});
app.addEventListener('pointerup', (e) => {
  if (!swipeStart || !state.run || state.run.phase !== 'slides') return;
  const dx = e.clientX - swipeStart.x;
  const dy = e.clientY - swipeStart.y;
  swipeStart = null;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goSlide(dx < 0 ? 1 : -1);
});

// Keyboard on a computer: arrows move between slides; in a quiz, 1–9 pick an
// answer (or place the next item) and Enter checks / continues.
document.addEventListener('keydown', (e) => {
  const run = state.run;
  if (!run || (state.route.name !== 'lesson' && state.route.name !== 'practice')) return;
  if (e.target.closest && e.target.closest('input, textarea, select')) return;
  if (e.altKey || e.ctrlKey || e.metaKey) return;
  if (run.phase === 'slides') {
    if (e.key === 'ArrowRight') goSlide(1);
    if (e.key === 'ArrowLeft') goSlide(-1);
    return;
  }
  if (run.phase !== 'quiz') return;
  if (/^[1-9]$/.test(e.key) && !run.checked) {
    const n = Number(e.key) - 1;
    const target = app.querySelectorAll('.options .option, .order-pool .chip')[n];
    if (target) { e.preventDefault(); target.click(); }
  } else if (e.key === 'Enter' && !(e.target.closest && e.target.closest('button, a'))) {
    const btn = app.querySelector('.sheet .btn-primary:not(:disabled)');
    if (btn) { e.preventDefault(); btn.click(); }
  }
});

window.addEventListener('hashchange', route);
route();

// ---------------------------------------------------------------- updates

// GitHub Pages lets browsers reuse files for up to 10 minutes, so a phone can keep
// running an old copy after a release. Compare with version.json (fetched fresh)
// and reload once when a newer release is out. Bump APP_VERSION with every release.
const APP_VERSION = '4';
function checkForUpdate() {
  fetch(`version.json?t=${Date.now()}`, { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((v) => {
      if (!v || v.version === APP_VERSION) return;
      let tried = null;
      try { tried = sessionStorage.getItem('octavo-reloaded-for'); } catch { /* ignore */ }
      if (tried === v.version) return; // already reloaded once for this release
      try { sessionStorage.setItem('octavo-reloaded-for', v.version); } catch { /* ignore */ }
      location.reload();
    })
    .catch(() => { /* offline or file:// — keep running */ });
}
checkForUpdate();
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') checkForUpdate(); });
