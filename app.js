'use strict';

/* Octavo clickable prototype: plain JavaScript, no build step, no dependencies.
   Routes (hash based, so the back button works):
     #home              home screen
     #courses           every course, with search, filters and sorting
     #course/<id>[/<t>] a subject's curriculum, ratings, reviews and discussion (t: reviews | discussion)
     #lesson/<id>[/<n>] interactive slides (optionally from slide n), then a quiz on them
     #practice          "Today's mix" / "Review my mistakes" quick quiz
     #progress          the "nine brains" profile screen
     #notebook          slides the learner saved
     #certificate/<id>  a finished course's certificate
     #game/<id>[/<g>]   the bonus game for a lesson (games/*.js), optionally a specific one */

const { courses, lecturers, community, speak, tone, sfx, NOTE, rankGames, mountGame, stopGame } = window.Octavo;

// ---------------------------------------------------------------- subjects

const SUBJECTS = [
  { name: 'Languages', topic: 'Spanish',   level: 7, kind: 'language', color: '#E8613F', tint: '#FFE9E2', text: '#9A3A1F', icon: 'M4 5h16v10H9l-5 4z' },
  { name: 'Medicine',  topic: 'Nervous system', level: 3, kind: 'science', color: '#E5484D', tint: '#FDE7E8', text: '#9B2226', icon: 'M3 12h4l2-5 4 10 2-5h6' },
  { name: 'Communication', topic: 'Soft skills', level: 1, kind: 'skills', color: '#0090C1', tint: '#E1F3FA', text: '#00668A', icon: 'M9 11a3 3 0 1 0 0-6a3 3 0 0 0 0 6M3 20c.7-3.5 3-5 6-5s5.3 1.5 6 5M16 8a4 4 0 0 1 0 6M19 5a8 8 0 0 1 0 12' },
  { name: 'Physics',   topic: 'Motion',    level: 4, kind: 'science', color: '#8E4EC6', tint: '#F1E8FA', text: '#6A2E9E', icon: 'M12 9a3 3 0 1 0 0.01 0M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8' },
  { name: 'Circuits',  topic: "Ohm's law", level: 5, kind: 'science', color: '#D18A00', tint: '#FEF3DD', text: '#7A5000', icon: 'M13 3L5 14h6l-1 7 8-11h-6z' },
  { name: 'Code',      topic: 'Python',    level: 6, kind: 'logic', color: '#12A594', tint: '#DDF5F1', text: '#0B6B60', icon: 'M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14' },
  { name: 'Chemistry', topic: 'Atoms',     level: 2, kind: 'science', color: '#30A46C', tint: '#E0F4E8', text: '#1C6B45', icon: 'M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3' },
  { name: 'Music',     topic: 'Notes',     level: 1, kind: 'arts', color: '#D6409F', tint: '#FBE6F3', text: '#962A6E', icon: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0M20 16a3 3 0 1 1-6 0a3 3 0 1 1 6 0' },
  { name: 'Math',      topic: 'Fractions', level: 9, kind: 'science', color: '#3E63DD', tint: '#E6ECFC', text: '#2A44A8', icon: 'M17 5H7l6 7-6 7h10' },
  { name: 'Italian',   topic: 'First words', level: 1, kind: 'language', color: '#6E8B1E', tint: '#EEF4DC', text: '#4A5E12', icon: 'M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5zM16 10h1.5a2.5 2.5 0 0 1 0 5H16M8 3v3M12 3v3' },
];
const subject = (name) => SUBJECTS.find((s) => s.name === name);

// Otto has eight arms but there are more subjects: the learner picks which eight
// they're training (state.arms) and can swap any of them for a resting subject.
const ARM_COUNT = 8;
const DEFAULT_ARMS = SUBJECTS.slice(0, ARM_COUNT).map((s) => s.name);
function validArms(list) {
  const names = (Array.isArray(list) ? list : []).filter((n, i, a) => subject(n) && a.indexOf(n) === i).slice(0, ARM_COUNT);
  for (const n of DEFAULT_ARMS) if (names.length < ARM_COUNT && !names.includes(n)) names.push(n);
  return names;
}
const armSubjects = () => state.arms.map(subject);
const restingSubjects = () => SUBJECTS.filter((s) => !state.arms.includes(s.name));

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

// ---------------------------------------------------------------- bonus games
// The engine (games/engine.js) picks from the course's audience, the subject's kind
// and the lecturer's style. Games only ever see items extracted from the lesson.

const lecturerById = (id) => lecturers.find((x) => x.id === id) || null;
const gamesFor = (l) => rankGames(l, {
  audience: l.course.audience || 'adult',
  kind: l.course.subjectInfo.kind,
  lecturer: lecturerById(l.course.lecturer),
  lastGame: state.lastGame,
});
const isKids = (l) => l.course.audience === 'kids';
const inkFor = (l, result) => (isKids(l) ? 10 : Math.round(5 + 15 * Math.min(1, result.score / Math.max(1, result.max))));

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
  swap: 'M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7',
  music: 'M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0a3 3 0 1 1 6 0M20 16a3 3 0 1 1-6 0a3 3 0 1 1 6 0',
  medal: 'M8 3l2 6M16 3l-2 6M12 21a6 6 0 1 0 0-12a6 6 0 0 0 0 12M12 13v4M10.5 14l1.5-1',
  bookmark: 'M6 4h12v16l-6-4-6 4z',
  note: 'M5 4h11l3 3v13H5zM8 10h8M8 14h8M8 18h5',
  game: 'M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.4 1.8L15 14H9l-1.6 1.8A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4zM8 11v3M6.5 12.5h3M15.5 12h.01M18 13.5h.01',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
  search: 'M11 4a7 7 0 1 0 0.01 0M16 16l4 4',
  filter: 'M4 6h16M7 12h10M10 18h4',
  people: 'M9 11a3 3 0 1 0 0-6a3 3 0 0 0 0 6M3 20c.7-3.5 3-5 6-5s5.3 1.5 6 5M16 11a3 3 0 1 0 0-6M18 15c1.8.6 3 2.2 3.4 5',
  thumb: 'M7 11v9H4v-9zM7 11l4-7a2 2 0 0 1 2.5 2.6L12.5 10H19a2 2 0 0 1 2 2.3l-1.2 6A2 2 0 0 1 17.8 20H7',
  reply: 'M10 8L5 12l5 4M5 12h9a5 5 0 0 1 5 5v1',
  chat: 'M4 5h16v11H9l-5 4z',
  clock: 'M12 3a9 9 0 1 0 0.01 0M12 7v5l3 2',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
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
// Dates are local calendar days as 'YYYY-MM-DD'.
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return ymd(d); };
const today = () => daysAgo(0);
// A made-up history of the last n days (not today), so a fresh demo starts mid-streak.
const seedDays = (n) => Array.from({ length: n }, (_, i) => daysAgo(n - i));
// Monday to Sunday of the current week.
const weekDays = () => { const offset = (new Date().getDay() + 6) % 7; return [...Array(7).keys()].map((i) => daysAgo(offset - i)); };

// misses: { 'lessonId#questionIndex': times missed } feeds "Review my mistakes".
// days: the days something was learned, for the streak and the weekly goal.
// notes: slides saved to the notebook, [{ lessonId, slide, at }].
// enrolled: { courseId: 'YYYY-MM-DD' } courses joined with the Enroll button.
// myReviews: { courseId: { stars, text, at } }; myComments: { courseId: [{ id, text, at }] };
// myReplies: { commentId: [{ id, text, at }] }; liked: { reviewOrCommentId: true }.
// catalog: the Courses tab's search, filters and sort.
const SAVED_FIELDS = ['ink', 'lessons', 'completed', 'lastCourse', 'sound', 'arms', 'games', 'lastGame', 'misses', 'days', 'weeklyGoal', 'notes',
  'enrolled', 'myReviews', 'myComments', 'myReplies', 'liked', 'catalog'];
const defaultCatalog = () => ({ q: '', kind: [], audience: [], lecturer: [], status: [], rating: 0, open: false, sort: [{ id: 'rating', dir: 'desc' }, { id: 'learners', dir: 'desc' }] });
const defaults = () => ({
  ink: 340, lessons: 38, completed: {}, lastCourse: 'nervous-system', sound: true, arms: [...DEFAULT_ARMS], games: {}, lastGame: null, misses: {}, days: seedDays(12), weeklyGoal: 5, notes: [],
  enrolled: {}, myReviews: {}, myComments: {}, myReplies: {}, liked: {}, catalog: defaultCatalog(),
});
// What the course page is showing; not saved.
const defaultCourseView = () => ({ tab: 'reviews', filter: 0, stars: 0, reviewSort: 'helpful', commentSort: 'top', editing: false, replyTo: null });

function loadSaved() {
  let saved;
  try { saved = JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
  // Saves from before real dates only had a streak number: rebuild a matching history.
  if (!Array.isArray(saved.days) && 'streak' in saved) saved.days = seedDays(Number(saved.streak) || 0);
  delete saved.streak;
  delete saved.doneToday;
  return saved;
}
function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(Object.fromEntries(SAVED_FIELDS.map((k) => [k, state[k]]))));
  } catch { /* storage blocked: the demo still works, it just won't remember */ }
}

const doneToday = () => state.days.includes(today());
function streakNow() {
  const days = new Set(state.days);
  let i = days.has(today()) ? 0 : 1; // the streak survives until today ends
  let n = 0;
  while (days.has(daysAgo(i))) { n += 1; i += 1; }
  return n;
}
const qKey = (lessonId, i) => `${lessonId}#${i}`;

const state = { route: { name: 'home' }, ...defaults(), ...loadSaved(), run: null, game: null, swapIn: null, view: defaultCourseView(), drafts: {}, courseFrom: 'home' };
state.arms = validArms(state.arms);
state.catalog = { ...defaultCatalog(), ...(state.catalog && typeof state.catalog === 'object' ? state.catalog : {}) };
for (const k of ['kind', 'audience', 'lecturer', 'status']) if (!Array.isArray(state.catalog[k])) state.catalog[k] = [];
if (!Array.isArray(state.catalog.sort) || !state.catalog.sort.length) state.catalog.sort = defaultCatalog().sort;
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function shuffled(n) {
  const idx = [...Array(n).keys()];
  if (n < 2) return idx;
  do {
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  } while (idx.every((v, i) => v === i));
  return idx;
}

// ---------------------------------------------------------------- practice ("Review my mistakes")
// Questions come from lessons in the current arms: the ones missed most come first,
// then a mix from different subjects. Before any lesson is done, the starter set is used.

const PRACTICE_SIZE = 5;
const inArms = (l) => state.arms.includes(l.course.subject);
const missedKeys = () => Object.keys(state.misses).filter((k) => {
  const l = lessonById(k.split('#')[0]);
  return l && inArms(l) && l.quiz[Number(k.split('#')[1])];
});

function buildPractice() {
  const pool = ALL_LESSONS
    .filter((l) => inArms(l) && state.completed[l.id])
    .flatMap((l) => l.quiz.map((q, i) => ({ q, lesson: l, i, key: qKey(l.id, i) })));
  for (const k of missedKeys()) {
    if (pool.some((p) => p.key === k)) continue;
    const l = lessonById(k.split('#')[0]);
    const i = Number(k.split('#')[1]);
    pool.push({ q: l.quiz[i], lesson: l, i, key: k });
  }
  if (!pool.length) return { questions: PRACTICE, refs: null, reviewing: 0 };

  const missed = pool.filter((p) => state.misses[p.key]).sort((a, b) => state.misses[b.key] - state.misses[a.key]);
  const picked = missed.slice(0, PRACTICE_SIZE);
  const rest = pool.filter((p) => !state.misses[p.key]);
  const order = shuffled(rest.length).map((i) => rest[i]);
  // Prefer subjects not in the set yet, so the mix spans several arms.
  const used = new Set(picked.map((p) => p.lesson.course.subject));
  for (const fresh of [true, false]) {
    for (const p of order) {
      if (picked.length >= PRACTICE_SIZE) break;
      if (picked.includes(p) || (fresh && used.has(p.lesson.course.subject))) continue;
      picked.push(p);
      used.add(p.lesson.course.subject);
    }
  }
  return {
    questions: picked.map((p) => ({ ...p.q, subject: p.lesson.course.subject, from: p.lesson.title, review: !!state.misses[p.key] })),
    refs: picked.map((p) => ({ lessonId: p.lesson.id, i: p.i })),
    reviewing: Math.min(missed.length, PRACTICE_SIZE),
  };
}

function newRun(kind, lesson) {
  const practice = kind === 'lesson' ? null : buildPractice();
  const run = {
    kind, lesson, phase: kind === 'lesson' ? 'slides' : 'quiz', slide: 0, dir: '',
    questions: practice ? practice.questions : lesson.quiz,
    refs: practice ? practice.refs : lesson.quiz.map((_, i) => ({ lessonId: lesson.id, i })),
    reviewing: practice ? practice.reviewing : 0, fixed: 0,
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
    { id: 'courses', label: 'Courses', href: '#courses', icon: ICON.grid },
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

function mixText() {
  const n = missedKeys().length;
  if (n) return `<b>Review my mistakes</b><span>${plural(n, 'question')} to fix, mixed with ones from your arms</span>`;
  const pool = ALL_LESSONS.filter((l) => inArms(l) && state.completed[l.id]).reduce((a, l) => a + l.quiz.length, 0);
  if (pool) return `<b>Today's mix</b><span>${plural(Math.min(pool, PRACTICE_SIZE), 'quick question')} from lessons you've done</span>`;
  return "<b>Today's mix</b><span>3 quick questions from 3 different arms</span>";
}

function homeScreen() {
  const trained = armSubjects().map((sub) => courseFor(sub.name));
  const last = courseById(state.lastCourse);
  const featured = trained.includes(last) ? last : trained[0];
  let course = featured;
  let next = nextLessonIn(course);
  if (!next) {
    course = trained.find((c) => nextLessonIn(c)) || featured;
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
      <span class="pill">${FLAME()}${streakNow()}<span class="sr"> day streak</span></span>
      <span class="pill">${DROP()}${state.ink}<span class="sr"> ink drops</span></span>
    </div>
  </header>

  <div class="greet">
    ${ottoFull(76)}
    <p class="bubble">${doneToday() ?'Great work today! Fancy another round?' : 'Nine brains, zero limits. Which arm are we training today?'}</p>
  </div>

  ${continueCard}

  <a class="mix-card" href="#practice">
    <span class="mix-icon" style="background: ${s.tint}">${stroke(ICON.target, 22, '#6C4CF1')}</span>
    <span class="mix-text">${mixText()}</span>
    ${stroke('M9 6l6 6-6 6', 20, '#4A4566')}
  </a>

  <div class="section-row">
    <h3 class="section-title">Your eight arms</h3>
    <a class="link-btn" href="#arms">${stroke(ICON.swap, 16)} Swap arms</a>
  </div>
  <div class="arms">
    ${armSubjects().map((sub) => {
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

const STYLE_LABEL = { playful: 'Playful', competitive: 'Loves a challenge', calm: 'Calm, unhurried', academic: 'Academic' };
const initials = (name) => name.replace(/^Dr\.?\s+/, '').split(/\s+/).map((w) => w[0]).join('').slice(0, 2);

function lecturerCard(lec, s) {
  if (!lec) return '';
  return `
  <section class="lecturer-card" aria-label="Your lecturer">
    <span class="avatar" style="background: ${s.color}" aria-hidden="true">${esc(initials(lec.name))}</span>
    <span class="lecturer-text">
      <small>Your lecturer</small>
      <b>${esc(lec.name)}</b>
      <span>${esc(lec.bio)}</span>
      ${STYLE_LABEL[lec.style] ? `<span class="style-tag" style="background: ${s.tint}; color: ${s.text}">${STYLE_LABEL[lec.style]}</span>` : ''}
    </span>
  </section>`;
}

function courseScreen(c) {
  const s = c.subjectInfo;
  const total = courseLessons(c).length;
  const done = courseDone(c);
  const upNext = nextLessonIn(c);
  let n = 0;
  const fromCatalog = state.courseFrom === 'courses';
  const rt = ratingFor(c);
  return `
<main class="screen course">
  <header class="course-top">
    <a class="icon-btn" href="${fromCatalog ? '#courses' : '#home'}" aria-label="${fromCatalog ? 'Back to all courses' : 'Back to home'}">${stroke(ICON.back, 24, 'currentColor', 2.6)}</a>
    <span class="course-subject" style="color: ${s.text}">${s.name}</span>
  </header>

  <section class="course-hero" style="background: ${s.tint}">
    <span class="course-icon">${stroke(s.icon, 28, s.color)}</span>
    <h1>${c.title}</h1>
    <p>${c.blurb}</p>
    <div class="hero-bar"><div class="meter"><span style="width: ${(done / total) * 100}%; background: ${s.color}"></span></div><span>${done}/${total} lessons</span></div>
    ${courseComplete(c) ? `<a class="cert-link" href="#certificate/${c.id}" style="color: ${s.text}">${stroke(ICON.medal, 18, s.color)} View your certificate</a>` : ''}
  </section>

  <section class="course-facts" aria-label="Rating and learners">
    <button type="button" class="fact" data-action="course-tab" data-tab="reviews" data-jump="1">
      <b>${rt.avg.toFixed(1)} ${starsHtml(rt.avg, 14)}</b><span>${compact(rt.count)} ratings</span>
    </button>
    <div class="fact"><b>${compact(learnersFor(c))}</b><span>learners</span></div>
    <div class="fact"><b>${courseMinutes(c)} min</b><span>${audienceLabel(c)}</span></div>
  </section>
  ${enrollBlock(c)}

  ${lecturerCard(lecturerById(c.lecturer), s)}

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

  ${communitySection(c)}
</main>
${tabbar(fromCatalog ? 'courses' : 'home')}`;
}

// ---------------------------------------------------------------- community: enrollment, ratings, reviews, discussion
// Sample learners, ratings, reviews and comments come from content/community.js; what
// the learner adds (state.myReviews, myComments, myReplies, liked) is merged in here.

const EMPTY_COMMUNITY = { enrolled: 0, ratings: [0, 0, 0, 0, 0], reviews: [], comments: [] };
const comm = (c) => community[c.id] || EMPTY_COMMUNITY;
// Enrolled: joined with the button, trained as one of the eight arms, or a lesson finished.
const isEnrolled = (c) => !!state.enrolled[c.id] || state.arms.includes(c.subject) || courseDone(c) > 0;
const learnersFor = (c) => comm(c).enrolled + (isEnrolled(c) ? 1 : 0);
const courseMinutes = (c) => courseLessons(c).reduce((a, l) => a + (l.minutes || 0), 0);
const audienceLabel = (c) => (c.audience === 'kids' ? 'For kids' : 'For adults');
const compact = (n) => (n >= 10000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k` : n.toLocaleString('en-US'));

// dist[0] is 5 stars … dist[4] is 1 star.
function ratingFor(c) {
  const m = comm(c);
  const mine = state.myReviews[c.id];
  const dist = [5, 4, 3, 2, 1].map((st, i) => (m.ratings[i] || 0) + m.reviews.filter((r) => r.stars === st).length + (mine && mine.stars === st ? 1 : 0));
  const count = dist.reduce((a, b) => a + b, 0);
  const avg = count ? dist.reduce((a, n, i) => a + n * (5 - i), 0) / count : 0;
  return { avg, count, dist };
}

// Five stars, filled to `value` (partial stars allowed).
const starsHtml = (value, size = 14) =>
  `<span class="stars-rating" style="font-size: ${size}px" role="img" aria-label="${value.toFixed(1)} out of 5 stars"><span class="stars-on" style="width: ${Math.max(0, Math.min(100, (value / 5) * 100))}%">★★★★★</span>★★★★★</span>`;

const daysSince = (iso) => Math.max(0, Math.round((new Date(`${today()}T12:00:00`) - new Date(`${ymd(new Date(iso))}T12:00:00`)) / 864e5));
function agoText(days) {
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${plural(Math.floor(days / 7), 'week')} ago`;
  return `${plural(Math.floor(days / 30), 'month')} ago`;
}

const AVATAR_COLORS = ['#E8613F', '#0090C1', '#8E4EC6', '#D18A00', '#12A594', '#30A46C', '#D6409F', '#3E63DD', '#6E8B1E', '#E5484D'];
const avatarColor = (name) => AVATAR_COLORS[[...name].reduce((a, ch) => a + ch.charCodeAt(0), 0) % AVATAR_COLORS.length];
const avatar = (name, color, small) => `<span class="avatar${small ? ' small' : ''}" style="background: ${color || avatarColor(name)}" aria-hidden="true">${esc(initials(name))}</span>`;
const newId = () => `me-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const draft = (key) => esc(state.drafts[key] || '');

function enrollBlock(c) {
  const s = c.subjectInfo;
  if (!isEnrolled(c)) {
    return `
  <section class="enroll-card">
    <span><b>Join ${compact(learnersFor(c))} learners</b><small>Enroll to track this course and rate it.</small></span>
    <button type="button" class="btn-primary small" data-action="enroll" style="background: ${s.color}">Enroll</button>
  </section>`;
  }
  const why = state.enrolled[c.id] ? `since ${longDate(state.enrolled[c.id])}` : state.arms.includes(c.subject) ? 'as one of your eight arms' : 'from your lessons';
  return `<p class="enrolled-note">${stroke(ICON.check, 16, '#1F8A4C', 3)} <b>Enrolled</b> ${why}</p>`;
}

function communitySection(c) {
  const v = state.view;
  const nComments = allComments(c).reduce((a, cm) => a + 1 + cm.replies.length, 0);
  const nReviews = allReviews(c).length;
  const tab = (id, label, n) => `<button type="button" role="tab" class="seg-tab${v.tab === id ? ' on' : ''}" data-action="course-tab" data-tab="${id}" aria-selected="${v.tab === id}">${label} <span>${n}</span></button>`;
  return `
  <section class="community" id="community" aria-label="Reviews and discussion">
    <div class="seg-tabs" role="tablist">${tab('reviews', 'Reviews', nReviews)}${tab('discussion', 'Discussion', nComments)}</div>
    ${v.tab === 'discussion' ? discussionPanel(c) : reviewsPanel(c)}
  </section>`;
}

// ---- reviews

function allReviews(c) {
  const mine = state.myReviews[c.id];
  const list = comm(c).reviews.map((r) => ({ ...r, helpful: r.helpful + (state.liked[r.id] ? 1 : 0) }));
  return mine ? [{ id: `mine-${c.id}`, mine: true, name: 'You', stars: mine.stars, text: mine.text, days: daysSince(mine.at), helpful: 0 }, ...list] : list;
}

const REVIEW_SORTS = [
  { id: 'helpful', label: 'Most helpful', cmp: (a, b) => b.helpful - a.helpful || a.days - b.days },
  { id: 'newest', label: 'Newest', cmp: (a, b) => a.days - b.days || b.helpful - a.helpful },
  { id: 'highest', label: 'Highest rated', cmp: (a, b) => b.stars - a.stars || b.helpful - a.helpful },
  { id: 'lowest', label: 'Lowest rated', cmp: (a, b) => a.stars - b.stars || b.helpful - a.helpful },
];

function reviewsPanel(c) {
  const v = state.view;
  const rt = ratingFor(c);
  const sort = REVIEW_SORTS.find((x) => x.id === v.reviewSort) || REVIEW_SORTS[0];
  const all = allReviews(c);
  const mine = all.find((r) => r.mine);
  const shown = all.filter((r) => !r.mine && (!v.filter || r.stars === v.filter)).sort(sort.cmp);
  const max = Math.max(1, ...rt.dist);
  return `
    <div class="card rating-summary">
      <div class="rating-big"><b>${rt.avg.toFixed(1)}</b>${starsHtml(rt.avg, 18)}<span>${rt.count.toLocaleString('en-US')} ratings</span></div>
      <div class="dist">${rt.dist.map((n, i) => {
        const st = 5 - i;
        return `<button type="button" class="dist-row${v.filter === st ? ' on' : ''}" data-action="review-filter" data-n="${st}" aria-pressed="${v.filter === st}" aria-label="${st} stars: ${n} ratings. Show only these reviews">
          <span>${st}★</span><span class="dist-bar"><span style="width: ${(n / max) * 100}%"></span></span><span>${Math.round((n / Math.max(1, rt.count)) * 100)}%</span>
        </button>`;
      }).join('')}</div>
    </div>
    ${myReviewBlock(c, mine)}
    <div class="list-toolbar">
      <span class="muted-small">${v.filter ? `${plural(shown.length, 'review')} with ${v.filter}★ · <button type="button" class="link-inline" data-action="review-filter" data-n="0">show all</button>` : plural(shown.length, 'written review')}</span>
      <label class="mini-select"><span class="sr">Sort reviews</span>
        <select data-select="reviewSort">${REVIEW_SORTS.map((x) => `<option value="${x.id}"${x.id === sort.id ? ' selected' : ''}>${x.label}</option>`).join('')}</select>
      </label>
    </div>
    <ul class="post-list">
      ${shown.map((r) => reviewItem(r)).join('') || '<li class="muted-small empty-line">No written reviews with this rating yet.</li>'}
    </ul>`;
}

function reviewItem(r) {
  const liked = !!state.liked[r.id];
  return `
      <li class="post${r.mine ? ' mine' : ''}">
        ${avatar(r.name, r.mine ? '#6C4CF1' : null)}
        <div class="post-body">
          <div class="post-head"><b>${esc(r.name)}</b><span>${agoText(r.days)}</span></div>
          ${starsHtml(r.stars, 13)}
          ${r.text ? `<p>${esc(r.text)}</p>` : ''}
          ${r.mine ? '' : `<div class="post-actions"><button type="button" class="post-btn${liked ? ' on' : ''}" data-action="like" data-id="${r.id}" aria-pressed="${liked}">${stroke(ICON.thumb, 15)} Helpful · ${r.helpful}</button></div>`}
        </div>
      </li>`;
}

function myReviewBlock(c, mine) {
  const v = state.view;
  if (!isEnrolled(c)) {
    return `
    <div class="card review-lock">
      ${stroke(ICON.lock, 20, '#6E6990')}
      <span><b>Only enrolled learners can rate</b><small>Enroll in ${esc(c.title)} to leave your stars and a review.</small></span>
      <button type="button" class="btn-secondary small" data-action="enroll">Enroll</button>
    </div>`;
  }
  if (mine && !v.editing) {
    return `
    <div class="card my-review">
      <span class="eyebrow-dark">Your review</span>
      <ul class="post-list">${reviewItem(mine)}</ul>
      <div class="row-btns">
        <button type="button" class="btn-secondary small" data-action="edit-review">Edit</button>
        <button type="button" class="btn-ghost small" data-action="delete-review">Delete</button>
      </div>
    </div>`;
  }
  const stars = v.stars || (mine ? mine.stars : 0);
  const words = ['Tap a star to rate', 'Not for me', 'It’s OK', 'Good', 'Really good', 'Loved it!'];
  return `
    <form class="card review-form" data-form="review" onsubmit="return false">
      <span class="eyebrow-dark">${mine ? 'Edit your review' : 'Rate this course'}</span>
      <div class="star-pick" role="radiogroup" aria-label="Your rating">
        ${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="star-btn${n <= stars ? ' on' : ''}" role="radio" aria-checked="${n === stars}" aria-label="${plural(n, 'star')}" data-action="rate-star" data-n="${n}">★</button>`).join('')}
        <span class="star-word">${words[stars]}</span>
      </div>
      <textarea data-draft="review-${c.id}" rows="3" maxlength="600" placeholder="What did you like? What could be better? (optional)">${state.drafts[`review-${c.id}`] != null ? draft(`review-${c.id}`) : mine ? esc(mine.text) : ''}</textarea>
      <div class="row-btns">
        ${mine ? '<button type="button" class="btn-ghost small" data-action="cancel-review">Cancel</button>' : ''}
        <button type="button" class="btn-primary small" data-action="submit-review"${stars ? '' : ' disabled'}>${mine ? 'Save review' : 'Post review'}</button>
      </div>
    </form>`;
}

// ---- discussion

function allComments(c) {
  const lec = lecturerById(c.lecturer);
  const withMine = (cm) => [
    ...(cm.replies || []).map((r) => ({ ...r, name: r.lecturer && lec ? lec.name : r.name, likes: r.likes + (state.liked[r.id] ? 1 : 0) })),
    ...(state.myReplies[cm.id] || []).map((r) => ({ id: r.id, mine: true, name: 'You', text: r.text, days: daysSince(r.at), likes: state.liked[r.id] ? 1 : 0, at: r.at })),
  ];
  const mine = (state.myComments[c.id] || []).map((cm) => ({ id: cm.id, mine: true, name: 'You', text: cm.text, days: daysSince(cm.at), likes: state.liked[cm.id] ? 1 : 0, at: cm.at }));
  return [...mine, ...comm(c).comments].map((cm) => ({ ...cm, likes: cm.mine ? cm.likes : cm.likes + (state.liked[cm.id] ? 1 : 0), replies: withMine(cm) }));
}

function discussionPanel(c) {
  const v = state.view;
  const list = allComments(c);
  // Your own new posts stay on top so you can see them; the rest follow the chosen order.
  const mineFirst = (a, b) => (a.mine === b.mine ? 0 : a.mine ? -1 : 1);
  const order = v.commentSort === 'newest'
    ? (a, b) => a.days - b.days || mineFirst(a, b) || (a.at && b.at ? (a.at < b.at ? 1 : -1) : 0)
    : (a, b) => mineFirst(a, b) || b.likes - a.likes || a.days - b.days;
  list.sort(order);
  return `
    <form class="card comment-form" onsubmit="return false">
      <textarea data-draft="comment-${c.id}" rows="2" maxlength="600" placeholder="Ask a question or share a tip with other learners">${draft(`comment-${c.id}`)}</textarea>
      <div class="row-btns"><span class="muted-small">Anyone can join the discussion</span><button type="button" class="btn-primary small" data-action="post-comment">Post</button></div>
    </form>
    <div class="list-toolbar">
      <span class="muted-small">${plural(list.length, 'thread')}</span>
      <label class="mini-select"><span class="sr">Sort comments</span>
        <select data-select="commentSort">
          <option value="top"${v.commentSort === 'top' ? ' selected' : ''}>Top</option>
          <option value="newest"${v.commentSort === 'newest' ? ' selected' : ''}>Newest</option>
        </select>
      </label>
    </div>
    <ul class="post-list">${list.map((cm) => commentItem(c, cm)).join('')}</ul>`;
}

function commentItem(c, cm, isReply = false) {
  const s = c.subjectInfo;
  const liked = !!state.liked[cm.id];
  const replying = !isReply && state.view.replyTo === cm.id;
  return `
      <li class="post${cm.mine ? ' mine' : ''}${isReply ? ' reply' : ''}">
        ${avatar(cm.name, cm.mine ? '#6C4CF1' : cm.lecturer ? s.color : null, isReply)}
        <div class="post-body">
          <div class="post-head"><b>${esc(cm.name)}</b>${cm.lecturer ? `<span class="lec-badge" style="background: ${s.tint}; color: ${s.text}">Lecturer</span>` : ''}<span>${agoText(cm.days)}</span></div>
          <p>${esc(cm.text)}</p>
          <div class="post-actions">
            <button type="button" class="post-btn${liked ? ' on' : ''}" data-action="like" data-id="${cm.id}" aria-pressed="${liked}" aria-label="Like${cm.likes ? `, ${cm.likes} likes` : ''}">${stroke(ICON.heart, 15)} ${cm.likes || ''}</button>
            ${isReply ? '' : `<button type="button" class="post-btn" data-action="reply-open" data-id="${cm.id}" aria-expanded="${replying}">${stroke(ICON.reply, 15)} Reply</button>`}
            ${cm.mine ? `<button type="button" class="post-btn" data-action="delete-comment" data-id="${cm.id}">Delete</button>` : ''}
          </div>
          ${!isReply && (cm.replies.length || replying) ? `<ul class="post-list replies">
            ${cm.replies.map((r) => commentItem(c, r, true)).join('')}
            ${replying ? `<li class="reply-form">
              <textarea data-draft="reply-${cm.id}" rows="2" maxlength="600" placeholder="Reply to ${esc(cm.name)}" data-autofocus>${draft(`reply-${cm.id}`)}</textarea>
              <div class="row-btns"><button type="button" class="btn-ghost small" data-action="reply-open" data-id="${cm.id}">Cancel</button><button type="button" class="btn-primary small" data-action="post-reply" data-id="${cm.id}">Reply</button></div>
            </li>` : ''}
          </ul>` : ''}
        </div>
      </li>`;
}

// ---------------------------------------------------------------- courses (catalog)

const KIND_LABEL = { science: 'Science', language: 'Languages', skills: 'Soft skills', logic: 'Coding', arts: 'Arts' };
const STATUS_LABEL = { enrolled: 'Enrolled', open: 'Not enrolled', started: 'In progress', completed: 'Completed' };
const courseStatus = (c) => {
  const st = [];
  st.push(isEnrolled(c) ? 'enrolled' : 'open');
  if (courseComplete(c)) st.push('completed');
  else if (courseDone(c) > 0) st.push('started');
  return st;
};

// Each sort has a default direction; `asc`/`desc` labels say what the toggle means for it.
const CATALOG_SORTS = [
  { id: 'rating', label: 'Rating', key: (c) => ratingFor(c).avg, dir: 'desc', desc: 'Highest first', asc: 'Lowest first' },
  { id: 'reviews', label: 'Number of ratings', key: (c) => ratingFor(c).count, dir: 'desc', desc: 'Most first', asc: 'Fewest first' },
  { id: 'learners', label: 'Learners', key: learnersFor, dir: 'desc', desc: 'Most first', asc: 'Fewest first' },
  { id: 'title', label: 'Title', key: (c) => c.title.toLowerCase(), dir: 'asc', desc: 'Z to A', asc: 'A to Z' },
  { id: 'minutes', label: 'Length', key: courseMinutes, dir: 'asc', desc: 'Longest first', asc: 'Shortest first' },
  { id: 'lessons', label: 'Lessons', key: (c) => courseLessons(c).length, dir: 'desc', desc: 'Most first', asc: 'Fewest first' },
  { id: 'progress', label: 'My progress', key: (c) => courseDone(c) / Math.max(1, courseLessons(c).length), dir: 'desc', desc: 'Most done first', asc: 'Least done first' },
  { id: 'subject', label: 'Subject', key: (c) => c.subject.toLowerCase(), dir: 'asc', desc: 'Z to A', asc: 'A to Z' },
];
const sortDef = (id) => CATALOG_SORTS.find((x) => x.id === id);
const RATING_STEPS = [0, 4.5, 4.6];
// Filters use the rating as shown (one decimal), so a course showing 4.5 passes "4.5 & up".
const shownRating = (c) => Math.round(ratingFor(c).avg * 10) / 10;

function catalogFiltered(skip) {
  const f = state.catalog;
  const q = f.q.trim().toLowerCase();
  return courses.filter((c) => {
    const lec = lecturerById(c.lecturer);
    if (q && ![c.title, c.blurb, c.subject, c.subjectInfo.topic, lec ? lec.name : ''].some((t) => t.toLowerCase().includes(q))) return false;
    if (skip !== 'kind' && f.kind.length && !f.kind.includes(c.subjectInfo.kind)) return false;
    if (skip !== 'audience' && f.audience.length && !f.audience.includes(c.audience || 'adult')) return false;
    if (skip !== 'lecturer' && f.lecturer.length && !f.lecturer.includes(c.lecturer)) return false;
    if (skip !== 'status' && f.status.length && !f.status.some((st) => courseStatus(c).includes(st))) return false;
    if (skip !== 'rating' && f.rating && shownRating(c) < f.rating) return false;
    return true;
  });
}

function catalogSorted(list) {
  const keys = [...state.catalog.sort.filter((x) => sortDef(x.id)), { id: 'title', dir: 'asc' }];
  return list.slice().sort((a, b) => {
    for (const { id, dir } of keys) {
      const k = sortDef(id).key;
      const x = k(a);
      const y = k(b);
      if (x === y) continue;
      const r = typeof x === 'string' ? x.localeCompare(y) : x - y;
      return dir === 'desc' ? -r : r;
    }
    return 0;
  });
}

const activeFilters = () => {
  const f = state.catalog;
  return f.kind.length + f.audience.length + f.lecturer.length + f.status.length + (f.rating ? 1 : 0);
};

function filterGroup(label, key, options) {
  const f = state.catalog;
  // Counts show how many courses you'd see with that option, given the other filters.
  const base = catalogFiltered(key);
  return `
    <div class="filter-group" role="group" aria-label="${label}">
      <span class="filter-label">${label}</span>
      <div class="chips">${options.map((o) => {
        const on = key === 'rating' ? f.rating === o.id : f[key].includes(o.id);
        const n = key === 'rating' ? base.filter((c) => !o.id || shownRating(c) >= o.id).length : base.filter(o.test).length;
        return `<button type="button" class="chip-btn${on ? ' on' : ''}" data-action="catalog-filter" data-key="${key}" data-value="${o.id}" aria-pressed="${on}">${o.label}<span class="chip-n">${n}</span></button>`;
      }).join('')}</div>
    </div>`;
}

function catalogCard(c) {
  const s = c.subjectInfo;
  const rt = ratingFor(c);
  const lec = lecturerById(c.lecturer);
  const total = courseLessons(c).length;
  const done = courseDone(c);
  const st = courseStatus(c);
  const badge = st.includes('completed') ? ['Completed', 'done'] : st.includes('started') ? ['In progress', 'started'] : st.includes('enrolled') ? ['Enrolled', 'enrolled'] : null;
  return `
    <li><a class="course-card" href="#course/${c.id}">
      <span class="cc-icon" style="background: ${s.tint}">${stroke(s.icon, 22, s.color)}</span>
      <span class="cc-body">
        <span class="cc-top"><small style="color: ${s.text}">${s.name}${KIND_LABEL[s.kind] && KIND_LABEL[s.kind] !== s.name ? ` · ${KIND_LABEL[s.kind]}` : ''}</small>${badge ? `<span class="cc-badge ${badge[1]}">${badge[0]}</span>` : ''}</span>
        <b>${c.title}</b>
        ${lec ? `<span class="cc-lec">with ${esc(lec.name)}</span>` : ''}
        <span class="cc-rating"><b>${rt.avg.toFixed(1)}</b>${starsHtml(rt.avg, 13)}<span>(${rt.count.toLocaleString('en-US')})</span></span>
        <span class="cc-meta">${stroke(ICON.people, 14)} ${compact(learnersFor(c))} · ${stroke(ICON.slides, 14)} ${plural(total, 'lesson')} · ${stroke(ICON.clock, 14)} ${courseMinutes(c)} min · ${c.audience === 'kids' ? 'Kids' : 'Adults'}</span>
        ${done ? `<span class="meter"><span style="width: ${(done / total) * 100}%; background: ${s.color}"></span></span>` : ''}
      </span>
    </a></li>`;
}

function catalogResults() {
  const list = catalogSorted(catalogFiltered());
  return `
    <p class="result-count">${plural(list.length, 'course')}${activeFilters() || state.catalog.q ? ` of ${courses.length}` : ''}</p>
    ${list.length ? `<ul class="course-list">${list.map(catalogCard).join('')}</ul>` : `
    <div class="card empty-results">
      ${ottoFull(90)}
      <p>No courses match. Try fewer filters.</p>
      <button type="button" class="btn-secondary small" data-action="catalog-clear">Clear search and filters</button>
    </div>`}`;
}

function sortRow(i) {
  const cur = state.catalog.sort[i];
  const def = cur && sortDef(cur.id);
  const used = state.catalog.sort.filter((_, j) => j !== i).map((x) => x.id);
  const opts = CATALOG_SORTS.filter((x) => !used.includes(x.id));
  return `
    <div class="sort-row">
      <label class="sort-field"><span>${i === 0 ? 'Sort by' : 'Then by'}</span>
        <select data-sort="${i}">
          ${i > 0 ? `<option value=""${def ? '' : ' selected'}>Nothing</option>` : ''}
          ${opts.map((x) => `<option value="${x.id}"${def && def.id === x.id ? ' selected' : ''}>${x.label}</option>`).join('')}
        </select>
      </label>
      ${def ? `<button type="button" class="dir-btn" data-action="catalog-dir" data-i="${i}" aria-label="Order: ${def[cur.dir]}. Tap to reverse">${stroke(cur.dir === 'desc' ? 'M12 5v14M6 13l6 6 6-6' : 'M12 19V5M6 11l6-6 6 6', 16)} ${def[cur.dir]}</button>` : ''}
    </div>`;
}

function coursesScreen() {
  const f = state.catalog;
  const kinds = [...new Set(courses.map((c) => c.subjectInfo.kind))];
  const lecIds = [...new Set(courses.map((c) => c.lecturer).filter(Boolean))];
  const nActive = activeFilters();
  return `
<main class="screen catalog">
  <header class="page-head">
    <h1>All courses</h1>
    <p>${plural(courses.length, 'course')} across every arm. Find your next one.</p>
  </header>

  <label class="search">
    ${stroke(ICON.search, 20)}
    <span class="sr">Search courses</span>
    <input type="search" data-search value="${esc(f.q)}" placeholder="Search courses, topics, lecturers" autocomplete="off">
  </label>

  <div class="catalog-tools">
    <button type="button" class="btn-chip${f.open ? ' open' : ''}" data-action="catalog-toggle" aria-expanded="${f.open}">${stroke(ICON.filter, 18)} Filters${nActive ? ` <span class="chip-n on">${nActive}</span>` : ''}</button>
    ${nActive || f.q ? '<button type="button" class="link-btn" data-action="catalog-clear">Clear all</button>' : ''}
  </div>

  ${f.open ? `
  <section class="card filters" aria-label="Filters and sorting">
    ${filterGroup('Category', 'kind', kinds.map((k) => ({ id: k, label: KIND_LABEL[k] || k, test: (c) => c.subjectInfo.kind === k })))}
    ${filterGroup('Audience', 'audience', [
      { id: 'kids', label: 'Kids', test: (c) => c.audience === 'kids' },
      { id: 'adult', label: 'Adults', test: (c) => (c.audience || 'adult') === 'adult' },
    ])}
    ${filterGroup('Lecturer', 'lecturer', lecIds.map((id) => ({ id, label: esc(lecturerById(id)?.name || id), test: (c) => c.lecturer === id })))}
    ${filterGroup('Rating', 'rating', RATING_STEPS.map((r) => ({ id: r, label: r ? `${r}★ & up` : 'Any' })))}
    ${filterGroup('My courses', 'status', Object.keys(STATUS_LABEL).map((id) => ({ id, label: STATUS_LABEL[id], test: (c) => courseStatus(c).includes(id) })))}
    <div class="filter-group sorts" role="group" aria-label="Sorting">
      <span class="filter-label">Sort</span>
      ${sortRow(0)}${sortRow(1)}
    </div>
  </section>` : `
  <p class="sort-summary">Sorted by <b>${state.catalog.sort.map((x) => `${sortDef(x.id).label.toLowerCase()} (${sortDef(x.id)[x.dir].toLowerCase()})`).join('</b>, then <b>')}</b></p>`}

  <div class="catalog-results" aria-live="polite">${catalogResults()}</div>
</main>
${tabbar('courses')}`;
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
    <button type="button" class="flip" data-action="flip" data-say="${esc(cd.front)}" data-lang="${cd.lang || 'es-ES'}" aria-pressed="false" aria-label="${esc(cd.front)}: tap to reveal">
      <span class="flip-inner"><span class="flip-front" lang="${(cd.lang || 'es-ES').slice(0, 2)}">${cd.front}</span><span class="flip-back">${cd.back}</span></span>
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
    <button type="button" class="icon-btn note-btn" data-action="note" aria-pressed="${isNoted(l.id, run.slide)}" aria-label="Save slide to notebook">${bookmarkIcon(isNoted(l.id, run.slide))}</button>
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
  const tagText = run.kind === 'lesson' ? `Quiz · ${run.lesson.title}` : `${q.review ? 'Review · ' : ''}${s.name} · ${q.from || s.topic}`;

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
    const arms = new Set(run.questions.map((q) => q.subject)).size;
    const left = missedKeys().length;
    const line = run.fixed
      ? `You fixed ${plural(run.fixed, 'mistake')}${left ? `, ${left} still to review` : ' — nothing left to review'}.`
      : run.reviewing ? `Still shaky on some — they'll come back next time.` : `You trained ${plural(arms, 'arm')} today.`;
    return `
<main class="screen finish">
  ${ottoFull(170)}
  <h1>${run.reviewing ? 'Review complete!' : 'Mix complete!'}</h1>
  <p>${line}</p>
  <div class="stats">
    <div class="stat"><b>+${run.earned}</b><span>ink drops</span></div>
    <div class="stat"><b>${streakNow()}</b><span>day streak</span></div>
    <div class="stat"><b>${run.hearts}</b><span>hearts left</span></div>
  </div>
  <a class="btn-primary" href="#progress" data-autofocus>See my nine brains</a>
  <a class="btn-ghost" href="#home">Back to home</a>
</main>`;
  }
  const l = run.lesson;
  const next = nextAfter(l);
  const perfect = run.firstTryCount === total;
  const bonus = gamesFor(l)[0];
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
  ${courseComplete(l.course) ? `
  <a class="cert-card" href="#certificate/${l.course.id}">
    <span class="shelf-icon" style="background: ${l.course.subjectInfo.tint}">${stroke(ICON.medal, 22, l.course.subjectInfo.color)}</span>
    <span class="shelf-text"><b>Course complete!</b><span>See your certificate for ${l.course.title}</span></span>
    ${stroke('M9 6l6 6-6 6', 20, '#4A4566')}
  </a>` : ''}
  ${bonus ? bonusCard(l, bonus) : ''}
  ${next
    ? `<a class="btn-primary" href="#lesson/${next.id}" data-autofocus>Next: ${next.title}</a>`
    : `<a class="btn-primary" href="#course/${l.course.id}" data-autofocus>Back to the course</a>`}
  <a class="btn-ghost" href="${next ? `#course/${l.course.id}` : '#home'}">${next ? 'Back to the course' : 'Back to home'}</a>
</main>`;
}

// state.games[lessonId][gameId] = { best, max, plays }: scores only compare within one game.
const gameRecord = (l, g) => (state.games[l.id] || {})[g.id] || null;

function bonusCard(l, g) {
  const s = l.course.subjectInfo;
  const rec = gameRecord(l, g);
  return `
  <a class="bonus-card${isKids(l) ? ' kids' : ''}" href="#game/${l.id}/${g.id}" style="--game-color: ${s.color}; --game-tint: ${s.tint}">
    <span class="bonus-icon" aria-hidden="true">${stroke(ICON.game, 26, s.color)}</span>
    <span class="bonus-text">
      <small>Bonus game${rec ? ` · best ${rec.best}/${rec.max}` : ''}</small>
      <b>${g.title}</b>
      <span>${g.blurb}</span>
    </span>
    <span class="bonus-ink">${DROP(14)} ${isKids(l) ? '+10' : 'up to +20'}</span>
  </a>`;
}

// ---------------------------------------------------------------- bonus game

function newGame(lesson, gameId) {
  const ranked = gamesFor(lesson);
  const game = (gameId && ranked.find((g) => g.id === gameId)) || ranked[0] || null;
  return { lesson, game, ranked, phase: 'play', result: null, ink: 0, best: false };
}

function gameScreen(g) {
  const l = g.lesson;
  const c = l.course;
  const s = c.subjectInfo;
  const kids = isKids(l);
  if (!g.game) {
    return `
<main class="screen finish">
  ${ottoFull(150)}
  <h1>No game here yet</h1>
  <p>This lesson doesn’t have enough content for a bonus game.</p>
  <a class="btn-primary" href="#course/${c.id}" data-autofocus>Back to the course</a>
</main>`;
  }
  if (g.phase === 'play') {
    return `
<main class="screen game${kids ? ' kids' : ''}" style="--game-color: ${s.color}; --game-tint: ${s.tint}">
  <header class="lesson-top">
    <a class="icon-btn" href="#course/${c.id}" aria-label="Close game">${stroke(ICON.close, 22, 'currentColor', 2.6)}</a>
    <span class="game-name">${g.game.title}</span>
    <span class="game-hud" aria-live="polite"></span>
  </header>
  <span class="tag" style="background: ${s.tint}; color: ${s.text}">${stroke(ICON.game, 16, s.color, 2.4)} Bonus · ${l.title}</span>
  <div class="game-root"></div>
</main>`;
  }
  const r = g.result;
  const next = nextAfter(l);
  const other = g.ranked.find((x) => x !== g.game);
  const stars = Math.max(1, Math.round((3 * r.score) / Math.max(1, r.max)));
  const rec = gameRecord(l, g.game);
  const stats = kids
    ? `<div class="stars" role="img" aria-label="${stars} of 3 stars">${[0, 1, 2].map((i) => `<span class="${i < stars ? 'on' : ''}">★</span>`).join('')}</div>
  <div class="stats two"><div class="stat"><b>+${g.ink}</b><span>ink drops</span></div><div class="stat"><b>${r.score}/${r.max}</b><span>score</span></div></div>`
    : `<div class="stats">
    <div class="stat"><b>${r.label || `${r.score}/${r.max}`}</b><span>${r.points != null ? `${r.points} pts` : 'score'}</span></div>
    <div class="stat"><b>+${g.ink}</b><span>ink drops</span></div>
    <div class="stat"><b>${rec ? rec.best : r.score}</b><span>personal best</span></div>
  </div>`;
  return `
<main class="screen finish${kids ? ' kids-finish' : ''}">
  ${ottoFull(150)}
  <h1>${kids ? 'You did it!' : g.best ? 'New best!' : 'Well played!'}</h1>
  <p>${g.game.title} · <b>${l.title}</b></p>
  ${stats}
  ${next
    ? `<a class="btn-primary" href="#lesson/${next.id}" data-autofocus>Next: ${next.title}</a>`
    : `<a class="btn-primary" href="#course/${c.id}" data-autofocus>Back to the course</a>`}
  <button type="button" class="btn-ghost" data-action="replay-game">Play again</button>
  ${other ? `<a class="btn-ghost" href="#game/${l.id}/${other.id}">Try ${other.title} instead</a>` : ''}
</main>`;
}

function startGame() {
  const g = state.game;
  const root = app.querySelector('.game-root');
  const hudEl = app.querySelector('.game-hud');
  if (!root || !g.game) return;
  mountGame(g.game, g.lesson, root, {
    speak: (text, lang) => speak(text, lang),
    sfx: (name) => play(name),
    hud: (html) => { if (hudEl) hudEl.innerHTML = html; },
    onFinish: (result) => finishGame(result),
  }, g.lesson.course.audience || 'adult');
}

function finishGame(result) {
  const g = state.game;
  if (!g || g.phase !== 'play') return;
  const prev = gameRecord(g.lesson, g.game);
  g.result = result;
  g.ink = inkFor(g.lesson, result);
  g.best = !!prev && result.score > prev.best;
  state.ink += g.ink;
  state.games[g.lesson.id] = {
    ...state.games[g.lesson.id],
    [g.game.id]: { best: Math.max(prev ? prev.best : 0, result.score), max: result.max, plays: (prev ? prev.plays : 0) + 1 },
  };
  state.lastGame = g.game.id;
  g.phase = 'done';
  save();
  render();
  play('complete');
  vibrate([30, 40, 30, 40, 60]);
  setTimeout(() => celebrate(app.querySelector('.finish h1'), 40), 150);
}

// ---------------------------------------------------------------- arms (pick the eight trained subjects)

function armsScreen() {
  const picking = state.swapIn ? subject(state.swapIn) : null;
  const row = (sub, action) => {
    const c = courseFor(sub.name);
    const picked = state.swapIn === sub.name;
    return `
    <li><button type="button" class="arm arm-row${picked ? ' picked' : ''}${action === 'swap-arm' && picking ? ' target' : ''}" data-action="${action}" data-name="${sub.name}"${action === 'pick-resting' ? ` aria-pressed="${picked}"` : ''}>
      <span class="arm-head">
        <span class="arm-icon" style="background: ${sub.tint}">${stroke(sub.icon, 18, sub.color)}</span>
        <span class="arm-text">
          <span class="arm-name">${sub.name}</span>
          <span class="arm-meta">${c.title} · ${courseDone(c)}/${courseLessons(c).length} lessons</span>
        </span>
        <span class="arm-action">${action === 'pick-resting' ? (picked ? 'Picked' : 'Train') : picking ? 'Replace' : ''}</span>
      </span>
    </button></li>`;
  };
  const resting = restingSubjects();
  return `
<main class="screen arms-screen">
  <header class="course-top">
    <a class="icon-btn" href="#progress" aria-label="Back to profile">${stroke(ICON.back, 24, 'currentColor', 2.6)}</a>
  </header>
  <header class="page-head">
    <h1>Swap arms</h1>
    <p>Otto trains eight subjects at a time. Swap one out whenever you like: your progress in every course is kept.</p>
  </header>

  <h3 class="section-title">Resting subjects</h3>
  ${resting.length ? `<ul class="arm-list">${resting.map((sub) => row(sub, 'pick-resting')).join('')}</ul>` : '<p class="muted">Every subject is being trained.</p>'}

  <p class="swap-hint" aria-live="polite">${picking
    ? `Now tap the arm that <b>${picking.name}</b> should replace.`
    : 'Tap a resting subject to start training it.'}</p>

  <h3 class="section-title">Your eight arms</h3>
  <ul class="arm-list">${armSubjects().map((sub) => row(sub, 'swap-arm')).join('')}</ul>
</main>
${tabbar('progress')}`;
}

// ---------------------------------------------------------------- progress (nine brains)

const RING = [[135, 5], [227, 43], [265, 135], [227, 227], [135, 265], [43, 227], [5, 135], [43, 43]]
  .map(([x, y]) => [(x / 342) * 100, (y / 342) * 100]);
const SPOKES = [[171, 41], [263, 79], [301, 171], [263, 263], [171, 301], [79, 263], [41, 171], [79, 79]];

function progressScreen() {
  const letters = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const now = today();
  const dates = weekDays();
  const week = dates.map((date, i) => {
    const done = state.days.includes(date);
    const cls = done ? 'done' : date === now ? 'today' : date > now ? 'future' : 'missed';
    const label = `${names[i]}: ${done ? 'learned' : date === now ? 'today, not yet' : date > now ? 'still to come' : 'missed'}`;
    return `<div class="day" role="listitem" aria-label="${label}"><span class="dot ${cls}">${done ? stroke(ICON.check, 16, '#fff', 3.2) : ''}</span><span aria-hidden="true">${letters[i]}</span></div>`;
  }).join('');
  const active = dates.filter((d) => state.days.includes(d)).length;
  const goal = state.weeklyGoal;
  const completedCount = Object.keys(state.completed).length;
  const certs = courses.filter(courseComplete);
  const notes = validNotes();

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
    ${armSubjects().map((s, i) => {
      const c = courseFor(s.name);
      return `
    <a class="node" href="#course/${c.id}" style="left: ${RING[i][0]}%; top: ${RING[i][1]}%; border-color: ${s.color}" aria-label="${s.name}, level ${s.level}, ${courseDone(c)} of ${courseLessons(c).length} lessons done">
      <b>${s.level}</b><span>${s.name}</span>
    </a>`;
    }).join('')}
  </div>
  <a class="btn-secondary manage-arms" href="#arms">${stroke(ICON.swap, 18)} Swap arms</a>

  <section class="card" aria-label="Streak">
    <div class="card-head">${FLAME(22)}${streakNow()}-day streak</div>
    <div class="week" role="list" aria-label="This week">${week}</div>
    <div class="goal-row">
      <p class="goal-line">${active >= goal ? `<b>${plural(active, 'day')}</b> this week · goal of ${goal} reached!` : `<b>${active} of ${goal}</b> days this week`}</p>
      <div class="goal-pick" role="group" aria-label="Weekly goal, days">
        ${[3, 5, 7].map((n) => `<button type="button" class="goal-btn${n === goal ? ' on' : ''}" data-action="goal" data-n="${n}" aria-pressed="${n === goal}">${n}</button>`).join('')}
      </div>
    </div>
    <div class="goal-bar" aria-hidden="true"><span style="width: ${Math.min(100, (active / goal) * 100)}%"></span></div>
  </section>

  <div class="stats">
    <div class="stat"><b>${(1240 + completedCount * 60 + (doneToday() ? 45 : 0)).toLocaleString('en-US')}</b><span>XP this week</span></div>
    <div class="stat"><b>${state.lessons}</b><span>Lessons done</span></div>
    <div class="stat"><b style="color: #C2412A">Coral</b><span>League</span></div>
  </div>

  <section class="card shelf" aria-label="Notebook and certificates">
    <a class="shelf-row" href="#notebook">
      <span class="shelf-icon">${stroke(ICON.note, 20, '#6C4CF1')}</span>
      <span class="shelf-text"><b>Notebook</b><span>${notes.length ? plural(notes.length, 'saved slide') : 'Save slides with the bookmark button'}</span></span>
      ${stroke('M9 6l6 6-6 6', 20, '#4A4566')}
    </a>
    ${certs.length ? certs.map((c) => `
    <a class="shelf-row" href="#certificate/${c.id}">
      <span class="shelf-icon" style="background: ${c.subjectInfo.tint}">${stroke(ICON.medal, 20, c.subjectInfo.color)}</span>
      <span class="shelf-text"><b>${c.title}</b><span>Certificate · ${c.subjectInfo.name}</span></span>
      ${stroke('M9 6l6 6-6 6', 20, '#4A4566')}
    </a>`).join('') : `
    <div class="shelf-row muted">
      <span class="shelf-icon">${stroke(ICON.medal, 20, '#6E6990')}</span>
      <span class="shelf-text"><b>Certificates</b><span>Finish every lesson in a course to earn one</span></span>
    </div>`}
  </section>

  <button type="button" class="reset" data-action="reset">Reset demo</button>
</main>
${tabbar('progress')}`;
}

// ---------------------------------------------------------------- certificate

const courseComplete = (c) => courseLessons(c).length > 0 && courseDone(c) === courseLessons(c).length;
const longDate = (d) => new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

function certificateScreen(c) {
  const s = c.subjectInfo;
  const ls = courseLessons(c);
  const back = `
  <header class="course-top">
    <a class="icon-btn" href="#course/${c.id}" aria-label="Back to the course">${stroke(ICON.back, 24, 'currentColor', 2.6)}</a>
    <span class="course-subject" style="color: ${s.text}">${s.name}</span>
  </header>`;
  if (!courseComplete(c)) {
    return `
<main class="screen cert-screen">
  ${back}
  <section class="card cert-locked">
    ${stroke(ICON.lock, 28, '#6E6990')}
    <h1>Certificate locked</h1>
    <p>Finish all ${plural(ls.length, 'lesson')} of <b>${c.title}</b> to earn it. ${courseDone(c)} done so far.</p>
    <a class="btn-primary" href="#course/${c.id}">Back to the course</a>
  </section>
</main>
${tabbar('progress')}`;
  }
  const results = ls.map((l) => state.completed[l.id]);
  const at = results.map((r) => r.at || today()).sort().pop();
  const score = results.reduce((a, r) => a + r.score, 0);
  const total = results.reduce((a, r) => a + r.total, 0);
  const lec = lecturerById(c.lecturer);
  return `
<main class="screen cert-screen">
  ${back}
  <article class="certificate" style="--c: ${s.color}; --t: ${s.tint}">
    <span class="cert-eyebrow">Certificate of completion</span>
    <div class="cert-seal">${ottoFace()}</div>
    <p class="cert-small">This certifies that an Octavo learner has completed</p>
    <h1>${c.title}</h1>
    <p class="cert-subject">${s.name} · ${plural(ls.length, 'lesson')}</p>
    <div class="stats">
      <div class="stat"><b>${total ? Math.round((score / total) * 100) : 100}%</b><span>first-try score</span></div>
      <div class="stat"><b>${ls.length}/${ls.length}</b><span>lessons done</span></div>
      <div class="stat"><b>${longDate(at)}</b><span>awarded</span></div>
    </div>
    ${lec ? `<div class="cert-sign"><b>${esc(lec.name)}</b><span>Lecturer</span></div>` : ''}
  </article>
  <button type="button" class="btn-primary" data-action="share-cert" data-title="${esc(c.title)}">Share certificate</button>
  <a class="btn-ghost" href="#course/${c.id}">Back to the course</a>
</main>
${tabbar('progress')}`;
}

// ---------------------------------------------------------------- notebook

const noteKey = (lessonId, slide) => `${lessonId}/${slide}`;
const validNotes = () => state.notes.filter((n) => { const l = lessonById(n.lessonId); return l && l.slides[n.slide]; });
const isNoted = (lessonId, slide) => state.notes.some((n) => n.lessonId === lessonId && n.slide === slide);
const bookmarkIcon = (on) => `<svg width="22" height="22" viewBox="0 0 24 24" fill="${on ? '#6C4CF1' : 'none'}" stroke="${on ? '#6C4CF1' : 'currentColor'}" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="${ICON.bookmark}"/></svg>`;
const plainText = (html, max = 120) => {
  const t = String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max - 1).trimEnd()}…` : t;
};

function notebookScreen() {
  const notes = validNotes().slice().sort((a, b) => (a.at < b.at ? 1 : -1));
  const groups = courses.map((c) => ({ c, items: notes.filter((n) => lessonById(n.lessonId).course === c) })).filter((g) => g.items.length);
  return `
<main class="screen notebook">
  <header class="page-head">
    <h1>Notebook</h1>
    <p>Slides you saved to come back to. Tap one to open it.</p>
  </header>
  ${groups.length ? groups.map(({ c, items }) => `
  <section class="note-group">
    <h2 style="color: ${c.subjectInfo.text}">${stroke(c.subjectInfo.icon, 16, c.subjectInfo.color, 2.4)} ${c.title}</h2>
    <ul class="note-list">
      ${items.map((n) => {
        const l = lessonById(n.lessonId);
        const sl = l.slides[n.slide];
        const snippet = plainText(sl.text) || (sl.points ? plainText(sl.points.join(' · ')) : '');
        return `
      <li class="note-item">
        <a href="#lesson/${l.id}/${n.slide}">
          <small>${l.title} · slide ${n.slide + 1}</small>
          <b>${sl.title}</b>
          ${snippet ? `<span>${snippet}</span>` : ''}
        </a>
        <button type="button" class="icon-btn" data-action="unnote" data-key="${noteKey(l.id, n.slide)}" aria-label="Remove ${esc(plainText(sl.title))} from notebook">${stroke(ICON.close, 18)}</button>
      </li>`;
      }).join('')}
    </ul>
  </section>`).join('') : `
  <section class="card note-empty">
    ${ottoFull(110)}
    <p>Nothing saved yet. Tap the ${bookmarkIcon(false)} bookmark on any lesson slide to keep it here.</p>
    <a class="btn-primary" href="#home">Find a lesson</a>
  </section>`}
  <a class="btn-ghost" href="#progress">Back to profile</a>
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
  } else if (r.name === 'game') html = gameScreen(state.game);
  else if (r.name === 'progress') html = progressScreen();
  else if (r.name === 'certificate') html = certificateScreen(courseById(r.id));
  else if (r.name === 'notebook') html = notebookScreen();
  else if (r.name === 'arms') html = armsScreen();
  else if (r.name === 'courses') html = coursesScreen();
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

  if (r.name === 'game' && state.game.phase === 'play') startGame();

  const focusTarget = app.querySelector('[data-autofocus]');
  if (focusTarget) focusTarget.focus({ preventScroll: true });
}

function parseHash() {
  const [name, id, extra] = location.hash.replace(/^#\/?/, '').split('/');
  if (name === 'course' && courseById(id)) return extra === 'reviews' || extra === 'discussion' ? { name, id, tab: extra } : { name, id };
  if (name === 'courses') return { name };
  if (name === 'game' && id && lessonById(id)) return { name, id, game: extra || null };
  if (name === 'lesson' && id && lessonById(id)) {
    const slide = /^\d+$/.test(extra || '') ? Math.min(Number(extra), lessonById(id).slides.length - 1) : null;
    return slide === null ? { name, id } : { name, id, slide };
  }
  if (name === 'lesson' || name === 'practice') return { name: 'practice' };
  if (name === 'certificate' && courseById(id)) return { name, id };
  if (name === 'progress' || name === 'arms' || name === 'notebook') return { name };
  return { name: 'home' };
}

function route() {
  const next = parseHash();
  stopGame();
  if (next.name === 'game') {
    state.game = newGame(lessonById(next.id), next.game);
    state.lastCourse = state.game.lesson.course.id;
  } else state.game = null;
  if (next.name === 'lesson') {
    const lesson = lessonById(next.id);
    if (next.slide != null || !state.run || state.run.lesson !== lesson || state.run.phase === 'done' || state.route.name !== 'lesson') {
      state.run = newRun('lesson', lesson);
      if (next.slide != null) state.run.slide = next.slide;
    }
    state.lastCourse = lesson.course.id;
    save();
  } else if (next.name === 'practice') {
    if (!state.run || state.run.kind !== 'practice' || state.run.phase === 'done' || state.route.name !== 'practice') {
      state.run = newRun('practice');
    }
  } else if (next.name === 'course') {
    const prev = state.route;
    if (prev.name === 'courses') state.courseFrom = 'courses';
    else if (['home', 'progress', 'arms'].includes(prev.name)) state.courseFrom = 'home';
    if (prev.name !== 'course' || prev.id !== next.id) state.view = defaultCourseView();
    if (next.tab) state.view.tab = next.tab;
    state.lastCourse = next.id;
    save();
  }
  if (next.name !== 'arms') state.swapIn = null;
  state.route = next;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  render();
  app.querySelector('.screen')?.scrollTo(0, 0);
  if (next.name === 'course' && next.tab) app.querySelector('#community')?.scrollIntoView({ block: 'start' });
}

// Re-render without jumping back to the top (for actions deep in a long screen).
function renderKeep() {
  const y = app.querySelector('.screen')?.scrollTop || 0;
  render();
  const scr = app.querySelector('.screen');
  if (scr) scr.scrollTop = y;
}
const currentCourse = () => (state.route.name === 'course' ? courseById(state.route.id) : null);

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
  if (!doneToday()) state.days = [...state.days, today()].slice(-400);
  if (run.kind === 'lesson') {
    const prev = state.completed[run.lesson.id];
    const score = Math.max(prev ? prev.score : 0, run.firstTryCount);
    state.completed[run.lesson.id] = { score, total: run.questions.length, at: today() };
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
    if (flipped && el.dataset.say) speak(el.dataset.say, el.dataset.lang || 'es-ES');
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
    const ref = run.refs && run.refs[run.q];
    if (ref && run.firstTry) {
      const key = qKey(ref.lessonId, ref.i);
      if (!correct) state.misses[key] = (state.misses[key] || 0) + 1;
      else if (run.kind === 'practice' && state.misses[key]) {
        state.misses[key] -= 1;
        if (!state.misses[key]) { delete state.misses[key]; run.fixed += 1; }
      }
      save();
    }
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

  // arms
  'pick-resting'(el) {
    state.swapIn = state.swapIn === el.dataset.name ? null : el.dataset.name;
    play('tap');
    render();
  },
  'swap-arm'(el) {
    if (!state.swapIn) { showToast('First pick a subject to train'); return; }
    const out = el.dataset.name;
    const into = state.swapIn;
    state.arms = state.arms.map((n) => (n === out ? into : n));
    state.swapIn = null;
    save();
    play('correct');
    render();
    showToast(`${into} replaced ${out}. Progress is kept.`);
  },

  // bonus game
  'replay-game'() {
    const g = state.game;
    state.game = newGame(g.lesson, g.game.id);
    render();
  },

  // notebook
  note(el) {
    const run = state.run;
    const id = run.lesson.id;
    const on = !isNoted(id, run.slide);
    state.notes = on
      ? [...state.notes, { lessonId: id, slide: run.slide, at: new Date().toISOString() }]
      : state.notes.filter((n) => !(n.lessonId === id && n.slide === run.slide));
    save();
    // Update in place: re-rendering would restart the slide's interactive parts.
    el.setAttribute('aria-pressed', String(on));
    el.innerHTML = bookmarkIcon(on);
    play('tap');
    showToast(on ? 'Saved to your notebook' : 'Removed from your notebook');
  },
  unnote(el) {
    state.notes = state.notes.filter((n) => noteKey(n.lessonId, n.slide) !== el.dataset.key);
    save();
    render();
    showToast('Removed from your notebook');
  },

  // weekly goal and certificates
  goal(el) {
    state.weeklyGoal = Number(el.dataset.n);
    save();
    play('tap');
    render();
    showToast(`Goal: learn on ${state.weeklyGoal} days a week`);
  },
  'share-cert'(el) {
    const data = { title: 'My Octavo certificate', text: `I completed “${el.dataset.title}” on Octavo!`, url: location.href };
    if (navigator.share) { navigator.share(data).catch(() => { /* cancelled */ }); return; }
    if (navigator.clipboard) navigator.clipboard.writeText(`${data.text} ${data.url}`).then(() => showToast('Link copied'), () => showToast('Couldn’t copy the link'));
    else showToast('Sharing isn’t available here');
  },

  // community: enrollment, ratings, reviews, discussion
  enroll() {
    const c = currentCourse();
    if (!c || isEnrolled(c)) return;
    state.enrolled = { ...state.enrolled, [c.id]: today() };
    save();
    play('correct');
    renderKeep();
    showToast(`Enrolled in ${c.title}`);
  },
  'course-tab'(el) {
    state.view.tab = el.dataset.tab;
    state.view.replyTo = null;
    renderKeep();
    if (el.dataset.jump) app.querySelector('#community')?.scrollIntoView({ block: 'start', behavior: reduceMotion ? 'auto' : 'smooth' });
  },
  'review-filter'(el) {
    const n = Number(el.dataset.n);
    state.view.filter = state.view.filter === n ? 0 : n;
    renderKeep();
  },
  'rate-star'(el) {
    state.view.stars = Number(el.dataset.n);
    play('tap');
    renderKeep();
  },
  'submit-review'() {
    const c = currentCourse();
    if (!c || !isEnrolled(c)) return;
    const prev = state.myReviews[c.id];
    const stars = state.view.stars || (prev ? prev.stars : 0);
    if (!stars) return;
    const key = `review-${c.id}`;
    const text = (state.drafts[key] != null ? state.drafts[key] : prev ? prev.text : '').trim();
    state.myReviews = { ...state.myReviews, [c.id]: { stars, text, at: new Date().toISOString() } };
    delete state.drafts[key];
    Object.assign(state.view, { stars: 0, editing: false, filter: 0 });
    save();
    play('correct');
    renderKeep();
    showToast(prev ? 'Review updated' : 'Thanks for your review!');
  },
  'edit-review'() {
    const c = currentCourse();
    Object.assign(state.view, { editing: true, stars: state.myReviews[c.id].stars });
    delete state.drafts[`review-${c.id}`];
    renderKeep();
  },
  'cancel-review'() {
    const c = currentCourse();
    Object.assign(state.view, { editing: false, stars: 0 });
    delete state.drafts[`review-${c.id}`];
    renderKeep();
  },
  'delete-review'() {
    const c = currentCourse();
    const rest = { ...state.myReviews };
    delete rest[c.id];
    state.myReviews = rest;
    Object.assign(state.view, { editing: false, stars: 0 });
    save();
    renderKeep();
    showToast('Review deleted');
  },
  like(el) {
    const id = el.dataset.id;
    const liked = { ...state.liked };
    if (liked[id]) delete liked[id];
    else { liked[id] = true; play('tap'); }
    state.liked = liked;
    save();
    renderKeep();
  },
  'post-comment'() {
    const c = currentCourse();
    const key = `comment-${c.id}`;
    const text = (state.drafts[key] || '').trim();
    if (!text) { showToast('Write something first'); app.querySelector(`[data-draft="${key}"]`)?.focus(); return; }
    state.myComments = { ...state.myComments, [c.id]: [{ id: newId(), text, at: new Date().toISOString() }, ...(state.myComments[c.id] || [])] };
    delete state.drafts[key];
    save();
    play('correct');
    renderKeep();
    showToast('Posted to the discussion');
  },
  'reply-open'(el) {
    state.view.replyTo = state.view.replyTo === el.dataset.id ? null : el.dataset.id;
    renderKeep();
  },
  'post-reply'(el) {
    const id = el.dataset.id;
    const key = `reply-${id}`;
    const text = (state.drafts[key] || '').trim();
    if (!text) { showToast('Write a reply first'); return; }
    state.myReplies = { ...state.myReplies, [id]: [...(state.myReplies[id] || []), { id: newId(), text, at: new Date().toISOString() }] };
    delete state.drafts[key];
    state.view.replyTo = null;
    save();
    play('correct');
    renderKeep();
    showToast('Reply posted');
  },
  'delete-comment'(el) {
    const id = el.dataset.id;
    const c = currentCourse();
    state.myComments = { ...state.myComments, [c.id]: (state.myComments[c.id] || []).filter((x) => x.id !== id) };
    // Your reply, or your comment together with the replies you wrote under it.
    state.myReplies = Object.fromEntries(Object.entries(state.myReplies)
      .filter(([parent]) => parent !== id)
      .map(([parent, list]) => [parent, list.filter((x) => x.id !== id)])
      .filter(([, list]) => list.length));
    save();
    renderKeep();
    showToast('Deleted');
  },

  // courses catalog
  'catalog-toggle'() {
    state.catalog.open = !state.catalog.open;
    save();
    renderKeep();
  },
  'catalog-filter'(el) {
    const f = state.catalog;
    const { key, value } = el.dataset;
    if (key === 'rating') f.rating = f.rating === Number(value) ? 0 : Number(value);
    else f[key] = f[key].includes(value) ? f[key].filter((x) => x !== value) : [...f[key], value];
    save();
    play('tap');
    renderKeep();
  },
  'catalog-dir'(el) {
    const s = state.catalog.sort[Number(el.dataset.i)];
    s.dir = s.dir === 'desc' ? 'asc' : 'desc';
    save();
    renderKeep();
  },
  'catalog-clear'() {
    const { open, sort } = state.catalog;
    state.catalog = { ...defaultCatalog(), open, sort };
    save();
    renderKeep();
    showToast('Search and filters cleared');
  },

  // misc
  reset() {
    try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
    stopGame();
    Object.assign(state, defaults(), { run: null, game: null, view: defaultCourseView(), drafts: {} });
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

// Typing: the catalog search filters as you type (only the results re-render, so the
// field keeps focus); review and comment boxes keep a draft so re-renders don't lose it.
let searchSave = null;
app.addEventListener('input', (e) => {
  const el = e.target;
  if (el.matches('[data-search]')) {
    state.catalog.q = el.value;
    const box = app.querySelector('.catalog-results');
    if (box) box.innerHTML = catalogResults();
    clearTimeout(searchSave);
    searchSave = setTimeout(save, 400);
  } else if (el.dataset.draft) state.drafts[el.dataset.draft] = el.value;
});

// Dropdowns: catalog sort fields, review and comment order.
app.addEventListener('change', (e) => {
  const el = e.target;
  if (el.dataset.sort != null) {
    const i = Number(el.dataset.sort);
    const sort = state.catalog.sort.slice(0, 2);
    if (!el.value) sort.splice(i);
    else sort[i] = { id: el.value, dir: sortDef(el.value).dir };
    state.catalog.sort = sort.filter(Boolean);
    save();
    renderKeep();
  } else if (el.dataset.select) {
    state.view[el.dataset.select] = el.value;
    renderKeep();
  }
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
const APP_VERSION = '9';
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
