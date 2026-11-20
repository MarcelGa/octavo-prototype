'use strict';

/* Languages. The UI is English by default; the learner can switch to Slovak on the
   Profile screen (saved in localStorage 'octavo-lang', or try ?lang=sk once).

   Course content is localised inline: any text field can be a locale object
   { en: '…', sk: '…' } (values are strings, or arrays for lists such as options).
   An object counts as a locale object only when ALL its keys are locale codes, so
   a phrase { es, en, lang } is never mistaken for one. app.js resolves every
   course once at startup with Octavo.localize(course); a missing language falls
   back to the course's own language (course.lang, default 'en').

   UI text lives in STRINGS below: Octavo.t('key', { name: value }) fills {name}
   placeholders; Octavo.tn('key', n) picks the plural form for n (Slovak has
   one / few / other: 1 lekcia, 2–4 lekcie, 5+ lekcií). */
(() => {
  const O = window.Octavo;
  const LOCALES = ['en', 'sk'];
  const LOCALE_NAMES = { en: 'English', sk: 'Slovenčina' };
  const INTL = { en: 'en-GB', sk: 'sk-SK' };
  const STORE = 'octavo-lang';

  function pickLang() {
    let fromUrl = null;
    try { fromUrl = new URLSearchParams(location.search).get('lang'); } catch { /* ignore */ }
    if (LOCALES.includes(fromUrl)) return fromUrl;
    let saved = null;
    try { saved = localStorage.getItem(STORE); } catch { /* storage blocked */ }
    return LOCALES.includes(saved) ? saved : 'en';
  }
  const lang = pickLang();

  function setLang(next) {
    if (!LOCALES.includes(next)) return;
    try { localStorage.setItem(STORE, next); } catch { /* storage blocked */ }
    // Courses are resolved once at startup, so a reload is the simple, consistent switch.
    const url = new URL(location.href);
    url.searchParams.delete('lang');
    location.replace(url.toString());
  }

  // ------------------------------------------------------------ content

  const isPlain = (v) => v !== null && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype;
  function isLocaleObj(v) {
    if (!isPlain(v)) return false;
    const keys = Object.keys(v);
    return keys.length > 0 && keys.every((k) => LOCALES.includes(k) && (typeof v[k] === 'string' || Array.isArray(v[k])));
  }
  function loc(v, fallback = 'en') {
    if (!isLocaleObj(v)) return v;
    return v[lang] ?? v[fallback] ?? v.en ?? v[Object.keys(v)[0]];
  }
  // Resolves every locale object inside obj, in place. Functions are left alone.
  function localize(obj, fallback = (obj && obj.lang) || 'en', seen = new WeakSet()) {
    if (obj === null || typeof obj !== 'object' || seen.has(obj)) return obj;
    seen.add(obj);
    const keys = Array.isArray(obj) ? obj.keys() : Object.keys(obj);
    for (const k of keys) {
      const v = obj[k];
      if (isLocaleObj(v)) obj[k] = localize(loc(v, fallback), fallback, seen);
      else if (Array.isArray(v) || isPlain(v)) localize(v, fallback, seen);
    }
    return obj;
  }

  // The languages a piece of content can be shown in: its own language plus every
  // language any of its locale objects has. Call before localize().
  function langsOf(obj, own = (obj && obj.lang) || 'en') {
    const found = new Set([own]);
    const seen = new WeakSet();
    (function walk(v) {
      if (v === null || typeof v !== 'object' || seen.has(v)) return;
      seen.add(v);
      if (isLocaleObj(v)) Object.keys(v).forEach((k) => found.add(k));
      for (const x of Array.isArray(v) ? v : Object.values(v)) walk(x);
    }(obj));
    return [...found];
  }

  // ------------------------------------------------------------ formatting

  const fmtNum = (n, opts) => new Intl.NumberFormat(INTL[lang], opts).format(n);
  const rtf = typeof Intl.RelativeTimeFormat === 'function' ? new Intl.RelativeTimeFormat(INTL[lang], { numeric: 'auto' }) : null;
  function fmtAgo(days) {
    if (!rtf) return `${days}d`;
    if (days < 7) return rtf.format(-Math.max(0, days), 'day');
    if (days < 30) return rtf.format(-Math.floor(days / 7), 'week');
    return rtf.format(-Math.floor(days / 30), 'month');
  }
  const fmtDate = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString(INTL[lang], { day: 'numeric', month: 'short', year: 'numeric' });

  // ------------------------------------------------------------ UI strings

  const fill = (s, params = {}) => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in params ? params[k] : m));
  const warned = new Set();
  function raw(key) {
    const v = STRINGS[lang][key] ?? STRINGS.en[key];
    if (v === undefined && !warned.has(key)) { warned.add(key); console.warn(`[i18n] missing string: ${key}`); }
    return v;
  }
  function t(key, params) {
    const v = raw(key);
    if (v === undefined) return key;
    return typeof v === 'string' ? fill(v, params) : v;
  }
  const plurals = new Intl.PluralRules(INTL[lang]);
  function tn(key, n, params = {}) {
    const v = raw(key);
    if (v === undefined) return key;
    const form = v[plurals.select(n)] ?? v.other;
    return fill(form, { n: fmtNum(n), ...params });
  }

  const STRINGS = {
    en: {
      // tab bar
      'tab.nav': 'Main',
      'tab.learn': 'Learn', 'tab.courses': 'Courses', 'tab.practice': 'Practice', 'tab.leagues': 'Leagues', 'tab.profile': 'Profile',
      'tab.soon': '{label} are coming soon',
      // shared counts
      'n.slide': { one: '{n} slide', other: '{n} slides' },
      'n.question': { one: '{n} question', other: '{n} questions' },
      'n.lesson': { one: '{n} lesson', other: '{n} lessons' },
      'n.course': { one: '{n} course', other: '{n} courses' },
      'n.day': { one: '{n} day', other: '{n} days' },
      'n.star': { one: '{n} star', other: '{n} stars' },
      'n.ratings': { one: 'rating', other: 'ratings' },
      'n.learners': { one: 'learner', other: 'learners' },
      'n.mistake': { one: '{n} mistake', other: '{n} mistakes' },
      'n.arm': { one: '{n} arm', other: '{n} arms' },
      'n.thread': { one: '{n} thread', other: '{n} threads' },
      'n.writtenReview': { one: '{n} written review', other: '{n} written reviews' },
      'n.savedSlide': { one: '{n} saved slide', other: '{n} saved slides' },
      'n.dayStreak': { one: '{n}-day streak', other: '{n}-day streak' },
      'lessonsFrac': '{done}/{total} lessons',
      'minutes': '{n} min',
      'aboutMin': '~{n} min',
      'ink': '+{n} ink',
      'pts': '{n} pts',
      'stars.aria': '{v} out of 5 stars',
      'otto.aria': 'Otto, the central brain',
      'lang.badge': 'Taught in {lang}',
      // home
      'home.mix': 'Today’s mix',
      'home.mixReview': 'Review my mistakes',
      'home.mixFix': { one: '{n} question to fix, mixed with ones from your arms', other: '{n} questions to fix, mixed with ones from your arms' },
      'home.mixDone': { one: '{n} quick question from lessons you’ve done', other: '{n} quick questions from lessons you’ve done' },
      'home.mixStart': '3 quick questions from 3 different arms',
      'home.continue': 'Continue · {title}',
      'home.startLesson': 'Start lesson',
      'home.allDone': 'Every lesson done',
      'home.allTrained': 'All eight arms trained!',
      'home.seeBrains': 'See my nine brains',
      'home.streakSr': ' day streak',
      'home.inkSr': ' ink drops',
      'home.bubbleDone': 'Great work today! Fancy another round?',
      'home.bubble': 'Nine brains, zero limits. Which arm are we training today?',
      'home.arms': 'Your eight arms',
      'home.swap': 'Swap arms',
      // course
      'style.playful': 'Playful', 'style.competitive': 'Loves a challenge', 'style.calm': 'Calm, unhurried', 'style.academic': 'Academic',
      'course.yourLecturer': 'Your lecturer',
      'course.backCourses': 'Back to all courses',
      'course.backHome': 'Back to home',
      'course.viewCert': 'View your certificate',
      'course.facts': 'Rating and learners',
      'course.forKids': 'For kids', 'course.forAdults': 'For adults',
      'course.unit': 'Unit {n}',
      'course.doneRow': 'Quiz {score}/{total} on first try · tap to review',
      'course.start': 'Start',
      'course.soon': 'Coming soon',
      'course.unlocks': 'Unlocks in the full app',
      'course.series': 'Series',
      'course.moreIn': 'More in {name}',
      // community
      'comm.join': { one: 'Join {n} learner', other: 'Join {n} learners' },
      'comm.enrollWhy': 'Enroll to track this course and rate it.',
      'comm.enroll': 'Enroll',
      'comm.enrolled': 'Enrolled',
      'comm.since': 'since {date}',
      'comm.asArm': 'as one of your eight arms',
      'comm.fromLessons': 'from your lessons',
      'comm.aria': 'Reviews and discussion',
      'comm.reviews': 'Reviews', 'comm.discussion': 'Discussion',
      'comm.you': 'You',
      'sort.helpful': 'Most helpful', 'sort.newest': 'Newest', 'sort.highest': 'Highest rated', 'sort.lowest': 'Lowest rated',
      'comm.distRow': '{st} stars: {n} ratings. Show only these reviews',
      'comm.filtered': { one: '{n} review with {st}★', other: '{n} reviews with {st}★' },
      'comm.showAll': 'show all',
      'comm.sortReviews': 'Sort reviews',
      'comm.noReviews': 'No written reviews with this rating yet.',
      'comm.helpful': 'Helpful · {n}',
      'comm.lockTitle': 'Only enrolled learners can rate',
      'comm.lockText': 'Enroll in {title} to leave your stars and a review.',
      'comm.yourReview': 'Your review',
      'comm.edit': 'Edit', 'comm.delete': 'Delete', 'comm.cancel': 'Cancel',
      'comm.starWords': ['Tap a star to rate', 'Not for me', 'It’s OK', 'Good', 'Really good', 'Loved it!'],
      'comm.editReview': 'Edit your review',
      'comm.rate': 'Rate this course',
      'comm.yourRating': 'Your rating',
      'comm.reviewPh': 'What did you like? What could be better? (optional)',
      'comm.saveReview': 'Save review', 'comm.postReview': 'Post review',
      'comm.commentPh': 'Ask a question or share a tip with other learners',
      'comm.anyone': 'Anyone can join the discussion',
      'comm.post': 'Post',
      'comm.sortComments': 'Sort comments',
      'comm.top': 'Top', 'comm.newest': 'Newest',
      'comm.lecturer': 'Lecturer',
      'comm.like': 'Like', 'comm.likes': 'Like, {n} likes',
      'comm.reply': 'Reply',
      'comm.replyTo': 'Reply to {name}',
      // catalog
      'kind.science': 'Science', 'kind.language': 'Languages', 'kind.skills': 'Soft skills', 'kind.logic': 'Coding', 'kind.arts': 'Arts',
      'status.enrolled': 'Enrolled', 'status.open': 'Not enrolled', 'status.started': 'In progress', 'status.completed': 'Completed',
      'csort.rating': 'Rating', 'csort.reviews': 'Number of ratings', 'csort.learners': 'Learners', 'csort.title': 'Title',
      'csort.minutes': 'Length', 'csort.lessons': 'Lessons', 'csort.progress': 'My progress', 'csort.subject': 'Subject',
      'dir.highFirst': 'Highest first', 'dir.lowFirst': 'Lowest first', 'dir.mostFirst': 'Most first', 'dir.fewestFirst': 'Fewest first',
      'dir.za': 'Z to A', 'dir.az': 'A to Z', 'dir.longFirst': 'Longest first', 'dir.shortFirst': 'Shortest first',
      'dir.mostDone': 'Most done first', 'dir.leastDone': 'Least done first',
      'cat.with': 'with {name}',
      'cat.kids': 'Kids', 'cat.adults': 'Adults',
      'cat.of': ' of {n}',
      'cat.none': 'No courses match. Try fewer filters.',
      'cat.clearBoth': 'Clear search and filters',
      'cat.sortBy': 'Sort by', 'cat.thenBy': 'Then by', 'cat.nothing': 'Nothing',
      'cat.dirAria': 'Order: {dir}. Tap to reverse',
      'cat.title': 'All courses',
      'cat.intro': '{courses} across every arm. Find your next one.',
      'cat.search': 'Search courses',
      'cat.searchPh': 'Search courses, topics, lecturers',
      'cat.filters': 'Filters', 'cat.clearAll': 'Clear all', 'cat.filtersAria': 'Filters and sorting',
      'cat.category': 'Category', 'cat.audience': 'Audience', 'cat.lecturer': 'Lecturer', 'cat.rating': 'Rating', 'cat.mine': 'My courses',
      'cat.sorting': 'Sorting', 'cat.sort': 'Sort',
      'cat.andUp': '{r}★ & up', 'cat.any': 'Any',
      'cat.sortedBy': 'Sorted by', 'cat.then': ', then',
      // slides
      'slide.dots': '<b>Tap the numbered dots</b> to explore each part.',
      'slide.explored': '{seen}/{n} explored',
      'slide.listen': 'Listen: {text}',
      'slide.reveal': '{text}: tap to reveal',
      'slide.code': 'Python code',
      'slide.reset': 'Reset', 'slide.runNext': 'Run next line', 'slide.finished': 'Program finished',
      'slide.codeNote': 'Press <b>Run next line</b> to step through the program.',
      'slide.vars': 'Variables', 'slide.noVars': 'none yet', 'slide.output': 'Output',
      'slide.close': 'Close lesson',
      'slide.save': 'Save slide to notebook',
      'slide.of': '{a} of {b}',
      'slide.back': 'Back', 'slide.startQuiz': 'Start quiz', 'slide.next': 'Next',
      'intro.title': 'Quiz time!',
      'intro.text': { one: '{n} question about <b>{title}</b>. Get it right on the first try for <b>+15 ink</b>.', other: '{n} questions about <b>{title}</b>. Get them right on the first try for <b>+15 ink</b> each.' },
      'intro.review': 'Review the slides',
      // quiz
      'quiz.tag': 'Quiz · {title}',
      'quiz.review': 'Review · ',
      'quiz.true': 'True', 'quiz.false': 'False',
      'quiz.playAudio': 'Play audio', 'quiz.playNotes': 'Play the notes',
      'quiz.yourOrder': 'Your order', 'quiz.orderHint': 'Tap the items below in the right order', 'quiz.pool': 'Items to place',
      'quiz.answers': 'Answers',
      'quiz.close': 'Close quiz', 'quiz.progress': 'Quiz progress', 'quiz.heartsSr': ' hearts left', 'quiz.sound': 'Sound effects',
      'quiz.check': 'Check',
      'quiz.combo': '{n} in a row!',
      'quiz.finish': 'Finish', 'quiz.continue': 'Continue',
      'quiz.notQuite': 'Not quite',
      'quiz.hint': 'Otto’s hint: {hint}',
      'quiz.hintDefault': 'look back at what the slides showed.',
      'quiz.retry': 'Try again',
      'quiz.praise': ['Brilliant!', 'Nailed it!', 'Spot on!', 'Tentacular!', 'Big brain!'],
      // done
      'done.fixed': 'You fixed {mistakes}{rest}.',
      'done.left': ', {n} still to review',
      'done.noneLeft': ' — nothing left to review',
      'done.shaky': 'Still shaky on some — they’ll come back next time.',
      'done.trained': 'You trained {arms} today.',
      'done.reviewComplete': 'Review complete!', 'done.mixComplete': 'Mix complete!',
      'done.inkDrops': 'ink drops', 'done.dayStreak': 'day streak', 'done.heartsLeft': 'hearts left',
      'done.backHome': 'Back to home',
      'done.perfect': 'Perfect lesson!', 'done.complete': 'Lesson complete!',
      'done.finished': 'You finished <b>{title}</b>.',
      'done.firstTry': 'first try', 'done.bestRow': 'best in a row',
      'done.courseComplete': 'Course complete!',
      'done.seeCert': 'See your certificate for {title}',
      'done.next': 'Next: {title}',
      'done.backCourse': 'Back to the course',
      'bonus.game': 'Bonus game', 'bonus.best': ' · best {a}/{b}', 'bonus.upTo': 'up to +20',
      // game screen
      'game.none': 'No game here yet',
      'game.noneText': 'This lesson doesn’t have enough content for a bonus game.',
      'game.close': 'Close game',
      'game.tag': 'Bonus · {title}',
      'game.stars': '{n} of 3 stars',
      'game.score': 'score', 'game.best': 'personal best',
      'game.didIt': 'You did it!', 'game.newBest': 'New best!', 'game.wellPlayed': 'Well played!',
      'game.again': 'Play again', 'game.try': 'Try {title} instead',
      // arms
      'arms.picked': 'Picked', 'arms.train': 'Train', 'arms.replace': 'Replace',
      'arms.back': 'Back to profile',
      'arms.title': 'Swap arms',
      'arms.intro': 'Otto trains eight subjects at a time. Swap one out whenever you like: your progress in every course is kept.',
      'arms.resting': 'Resting subjects',
      'arms.allTrained': 'Every subject is being trained.',
      'arms.nowTap': 'Now tap the arm that <b>{name}</b> should replace.',
      'arms.tapResting': 'Tap a resting subject to start training it.',
      'arms.yours': 'Your eight arms',
      // progress
      'week.letters': ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      'week.names': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'week.learned': 'learned', 'week.today': 'today, not yet', 'week.future': 'still to come', 'week.missed': 'missed',
      'prog.title': 'Your nine brains',
      'prog.intro': 'One central brain, eight learning arms. Tap an arm to open its course.',
      'prog.node': '{name}, level {level}, {done} of {total} lessons done',
      'prog.streak': 'Streak',
      'prog.thisWeek': 'This week',
      'prog.goalReached': '<b>{days}</b> this week · goal of {goal} reached!',
      'prog.goalLine': '<b>{active} of {goal}</b> days this week',
      'prog.goalAria': 'Weekly goal, days',
      'prog.xp': 'XP this week', 'prog.lessons': 'Lessons done', 'prog.coral': 'Coral', 'prog.league': 'League',
      'prog.shelf': 'Notebook and certificates',
      'prog.notebook': 'Notebook',
      'prog.notebookEmpty': 'Save slides with the bookmark button',
      'prog.cert': 'Certificate · {name}',
      'prog.certs': 'Certificates',
      'prog.certsEmpty': 'Finish every lesson in a course to earn one',
      'prog.language': 'Language',
      'prog.reset': 'Reset demo',
      // certificate
      'cert.locked': 'Certificate locked',
      'cert.lockedText': 'Finish all {lessons} of <b>{title}</b> to earn it. {done} done so far.',
      'cert.eyebrow': 'Certificate of completion',
      'cert.certifies': 'This certifies that an Octavo learner has completed',
      'cert.score': 'first-try score', 'cert.lessons': 'lessons done', 'cert.awarded': 'awarded',
      'cert.share': 'Share certificate',
      'cert.shareTitle': 'My Octavo certificate',
      'cert.shareText': 'I completed “{title}” on Octavo!',
      // notebook
      'note.title': 'Notebook',
      'note.intro': 'Slides you saved to come back to. Tap one to open it.',
      'note.slide': '{title} · slide {n}',
      'note.remove': 'Remove {title} from notebook',
      'note.empty': 'Nothing saved yet. Tap the {icon} bookmark on any lesson slide to keep it here.',
      'note.find': 'Find a lesson',
      // toasts
      'toast.noAudio': 'Audio isn’t available on this device',
      'toast.soundOn': 'Sound effects on', 'toast.soundOff': 'Sound effects off',
      'toast.pickFirst': 'First pick a subject to train',
      'toast.swapped': '{into} replaced {out}. Progress is kept.',
      'toast.saved': 'Saved to your notebook', 'toast.removed': 'Removed from your notebook',
      'toast.goal': 'Goal: learn on {n} days a week',
      'toast.copied': 'Link copied', 'toast.copyFail': 'Couldn’t copy the link', 'toast.noShare': 'Sharing isn’t available here',
      'toast.enrolled': 'Enrolled in {title}',
      'toast.reviewUpdated': 'Review updated', 'toast.reviewThanks': 'Thanks for your review!', 'toast.reviewDeleted': 'Review deleted',
      'toast.writeFirst': 'Write something first', 'toast.posted': 'Posted to the discussion',
      'toast.replyFirst': 'Write a reply first', 'toast.replied': 'Reply posted',
      'toast.deleted': 'Deleted', 'toast.cleared': 'Search and filters cleared', 'toast.reset': 'Demo reset',
      // bonus games
      'g.memory.title': 'Otto’s Memory', 'g.memory.blurb': 'Flip the cards and find the pairs.',
      'g.memory.pairs': '{found}/{total} pairs', 'g.memory.card': 'Card {n}, face down', 'g.memory.down': 'Card face down',
      'g.bubble.title': 'Bubble Pop', 'g.bubble.blurb': 'Listen to Otto and pop the bubble that matches.',
      'g.bubble.round': 'Round {n} of {total}', 'g.bubble.listen': 'Listen again', 'g.bubble.which': 'Which one is it?',
      'g.feed.title': 'Feed Otto', 'g.feed.blurb': 'Does it match? Feed Otto the right snacks.',
      'g.feed.ask': 'Do they go together?', 'g.feed.yes': 'Yum! 😋', 'g.feed.no': 'Yuck! 🙅',
      'g.feed.right': 'Yum! That’s right!', 'g.feed.caught': 'Good catch! That was a mix-up.',
      'g.feed.means': 'Hmm… <b>{a}</b> means <b>{b}</b>.',
      'g.speed.title': 'Speed Match', 'g.speed.blurb': 'Match every term to its meaning before the clock runs out.',
      'g.speed.ask': 'Tap a term, then its meaning.',
      'g.speed.matches': { one: '{n} match', other: '{n} matches' },
      'g.fact.title': 'Fact or Fiction', 'g.fact.blurb': 'True or made up? Build a streak to multiply your points.',
      'g.fact.fact': 'Fact', 'g.fact.fiction': 'Fiction',
      'g.fact.isFact': 'It’s a fact.', 'g.fact.isFiction': 'It’s fiction.',
      'g.fact.right': '{n}/{total} right', 'g.fact.continue': 'Continue',
      'g.chain.title': 'Chain', 'g.chain.blurb': 'Put the steps back in order. Fewer checks, more points.',
      'g.chain.n': 'Chain {n}/{total}', 'g.chain.checks': { one: '{n} check', other: '{n} checks' },
      'g.chain.up': 'Move up', 'g.chain.down': 'Move down', 'g.chain.check': 'Check the chain',
      'g.chain.rebuilt': { one: '{n} chain rebuilt', other: '{n} chains rebuilt' },
    },

    sk: {
      'tab.nav': 'Hlavná navigácia',
      'tab.learn': 'Učiť sa', 'tab.courses': 'Kurzy', 'tab.practice': 'Precvičovanie', 'tab.leagues': 'Ligy', 'tab.profile': 'Profil',
      'tab.soon': '{label} už čoskoro',
      'n.slide': { one: '{n} snímka', few: '{n} snímky', other: '{n} snímok' },
      'n.question': { one: '{n} otázka', few: '{n} otázky', other: '{n} otázok' },
      'n.lesson': { one: '{n} lekcia', few: '{n} lekcie', other: '{n} lekcií' },
      'n.course': { one: '{n} kurz', few: '{n} kurzy', other: '{n} kurzov' },
      'n.day': { one: '{n} deň', few: '{n} dni', other: '{n} dní' },
      'n.star': { one: '{n} hviezdička', few: '{n} hviezdičky', other: '{n} hviezdičiek' },
      'n.ratings': { one: 'hodnotenie', few: 'hodnotenia', other: 'hodnotení' },
      'n.learners': { one: 'študent', few: 'študenti', other: 'študentov' },
      'n.mistake': { one: '{n} chybu', few: '{n} chyby', other: '{n} chýb' },
      'n.arm': { one: '{n} chápadlo', few: '{n} chápadlá', other: '{n} chápadiel' },
      'n.thread': { one: '{n} vlákno', few: '{n} vlákna', other: '{n} vlákien' },
      'n.writtenReview': { one: '{n} písomná recenzia', few: '{n} písomné recenzie', other: '{n} písomných recenzií' },
      'n.savedSlide': { one: '{n} uložená snímka', few: '{n} uložené snímky', other: '{n} uložených snímok' },
      'n.dayStreak': { one: 'Séria {n} deň', few: 'Séria {n} dni', other: 'Séria {n} dní' },
      'lessonsFrac': '{done}/{total} lekcií',
      'minutes': '{n} min',
      'aboutMin': '~{n} min',
      'ink': '+{n} atramentu',
      'pts': '{n} b.',
      'stars.aria': '{v} z 5 hviezdičiek',
      'otto.aria': 'Otto, centrálny mozog',
      'lang.badge': 'Vyučuje sa v jazyku: {lang}',
      'home.mix': 'Dnešný mix',
      'home.mixReview': 'Zopakuj si chyby',
      'home.mixFix': { one: '{n} otázka na opravu, premiešaná s otázkami z tvojich chápadiel', few: '{n} otázky na opravu, premiešané s otázkami z tvojich chápadiel', other: '{n} otázok na opravu, premiešaných s otázkami z tvojich chápadiel' },
      'home.mixDone': { one: '{n} rýchla otázka z lekcií, ktoré máš za sebou', few: '{n} rýchle otázky z lekcií, ktoré máš za sebou', other: '{n} rýchlych otázok z lekcií, ktoré máš za sebou' },
      'home.mixStart': '3 rýchle otázky z 3 rôznych chápadiel',
      'home.continue': 'Pokračovať · {title}',
      'home.startLesson': 'Začať lekciu',
      'home.allDone': 'Všetky lekcie hotové',
      'home.allTrained': 'Všetkých osem chápadiel natrénovaných!',
      'home.seeBrains': 'Pozrieť mojich deväť mozgov',
      'home.streakSr': ' dní v sérii',
      'home.inkSr': ' kvapiek atramentu',
      'home.bubbleDone': 'Dnes skvelá práca! Dáš si ešte jedno kolo?',
      'home.bubble': 'Deväť mozgov, žiadne hranice. Ktoré chápadlo dnes trénujeme?',
      'home.arms': 'Tvojich osem chápadiel',
      'home.swap': 'Vymeniť chápadlá',
      'style.playful': 'Hravý štýl', 'style.competitive': 'Má rád výzvy', 'style.calm': 'Pokojne, bez zhonu', 'style.academic': 'Akademický štýl',
      'course.yourLecturer': 'Tvoj lektor',
      'course.backCourses': 'Späť na všetky kurzy',
      'course.backHome': 'Späť domov',
      'course.viewCert': 'Pozrieť certifikát',
      'course.facts': 'Hodnotenie a študenti',
      'course.forKids': 'Pre deti', 'course.forAdults': 'Pre dospelých',
      'course.unit': 'Celok {n}',
      'course.doneRow': 'Kvíz {score}/{total} na prvý pokus · ťukni a zopakuj si',
      'course.start': 'Začať',
      'course.soon': 'Už čoskoro',
      'course.unlocks': 'Odomkne sa v plnej aplikácii',
      'course.series': 'Séria',
      'course.moreIn': 'Ďalšie z predmetu {name}',
      'comm.join': { one: 'Pridaj sa k {n} študentovi', few: 'Pridaj sa k {n} študentom', other: 'Pridaj sa k {n} študentom' },
      'comm.enrollWhy': 'Zapíš sa, aby si sledoval kurz a mohol ho ohodnotiť.',
      'comm.enroll': 'Zapísať sa',
      'comm.enrolled': 'Zapísaný',
      'comm.since': 'od {date}',
      'comm.asArm': 'ako jedno z tvojich ôsmich chápadiel',
      'comm.fromLessons': 'vďaka tvojim lekciám',
      'comm.aria': 'Recenzie a diskusia',
      'comm.reviews': 'Recenzie', 'comm.discussion': 'Diskusia',
      'comm.you': 'Ty',
      'sort.helpful': 'Najužitočnejšie', 'sort.newest': 'Najnovšie', 'sort.highest': 'Najlepšie hodnotené', 'sort.lowest': 'Najhoršie hodnotené',
      'comm.distRow': '{st} hviezdičky: {n} hodnotení. Zobraziť len tieto recenzie',
      'comm.filtered': { one: '{n} recenzia s {st}★', few: '{n} recenzie s {st}★', other: '{n} recenzií s {st}★' },
      'comm.showAll': 'zobraziť všetky',
      'comm.sortReviews': 'Zoradiť recenzie',
      'comm.noReviews': 'S týmto hodnotením zatiaľ nie je žiadna písomná recenzia.',
      'comm.helpful': 'Užitočné · {n}',
      'comm.lockTitle': 'Hodnotiť môžu len zapísaní študenti',
      'comm.lockText': 'Zapíš sa do kurzu {title} a nechaj mu hviezdičky aj recenziu.',
      'comm.yourReview': 'Tvoja recenzia',
      'comm.edit': 'Upraviť', 'comm.delete': 'Vymazať', 'comm.cancel': 'Zrušiť',
      'comm.starWords': ['Ťukni na hviezdičku', 'Nie je to pre mňa', 'Ujde to', 'Dobré', 'Veľmi dobré', 'Super!'],
      'comm.editReview': 'Uprav svoju recenziu',
      'comm.rate': 'Ohodnoť tento kurz',
      'comm.yourRating': 'Tvoje hodnotenie',
      'comm.reviewPh': 'Čo sa ti páčilo? Čo by mohlo byť lepšie? (nepovinné)',
      'comm.saveReview': 'Uložiť recenziu', 'comm.postReview': 'Uverejniť recenziu',
      'comm.commentPh': 'Opýtaj sa niečo alebo poraď ostatným študentom',
      'comm.anyone': 'Do diskusie sa môže zapojiť každý',
      'comm.post': 'Uverejniť',
      'comm.sortComments': 'Zoradiť komentáre',
      'comm.top': 'Najlepšie', 'comm.newest': 'Najnovšie',
      'comm.lecturer': 'Lektor',
      'comm.like': 'Páči sa mi', 'comm.likes': 'Páči sa mi, {n} páči sa',
      'comm.reply': 'Odpovedať',
      'comm.replyTo': 'Odpoveď pre {name}',
      'kind.science': 'Veda', 'kind.language': 'Jazyky', 'kind.skills': 'Mäkké zručnosti', 'kind.logic': 'Programovanie', 'kind.arts': 'Umenie',
      'status.enrolled': 'Zapísané', 'status.open': 'Nezapísané', 'status.started': 'Rozpracované', 'status.completed': 'Dokončené',
      'csort.rating': 'Hodnotenie', 'csort.reviews': 'Počet hodnotení', 'csort.learners': 'Študenti', 'csort.title': 'Názov',
      'csort.minutes': 'Dĺžka', 'csort.lessons': 'Lekcie', 'csort.progress': 'Môj pokrok', 'csort.subject': 'Predmet',
      'dir.highFirst': 'Od najvyššieho', 'dir.lowFirst': 'Od najnižšieho', 'dir.mostFirst': 'Od najväčšieho', 'dir.fewestFirst': 'Od najmenšieho',
      'dir.za': 'Z až A', 'dir.az': 'A až Z', 'dir.longFirst': 'Od najdlhšieho', 'dir.shortFirst': 'Od najkratšieho',
      'dir.mostDone': 'Najviac hotové prvé', 'dir.leastDone': 'Najmenej hotové prvé',
      'cat.with': 's lektorom {name}',
      'cat.kids': 'Deti', 'cat.adults': 'Dospelí',
      'cat.of': ' z {n}',
      'cat.none': 'Nič nezodpovedá. Skús menej filtrov.',
      'cat.clearBoth': 'Vymazať hľadanie a filtre',
      'cat.sortBy': 'Zoradiť podľa', 'cat.thenBy': 'Potom podľa', 'cat.nothing': 'Nič',
      'cat.dirAria': 'Poradie: {dir}. Ťukni a obráť ho',
      'cat.title': 'Všetky kurzy',
      'cat.intro': '{courses} vo všetkých chápadlách. Nájdi si ďalší.',
      'cat.search': 'Hľadať kurzy',
      'cat.searchPh': 'Hľadaj kurzy, témy, lektorov',
      'cat.filters': 'Filtre', 'cat.clearAll': 'Vymazať všetko', 'cat.filtersAria': 'Filtre a zoradenie',
      'cat.category': 'Kategória', 'cat.audience': 'Pre koho', 'cat.lecturer': 'Lektor', 'cat.rating': 'Hodnotenie', 'cat.mine': 'Moje kurzy',
      'cat.sorting': 'Zoradenie', 'cat.sort': 'Zoradiť',
      'cat.andUp': '{r}★ a viac', 'cat.any': 'Všetky',
      'cat.sortedBy': 'Zoradené podľa', 'cat.then': ', potom',
      'slide.dots': '<b>Ťukni na očíslované bodky</b> a preskúmaj každú časť.',
      'slide.explored': 'preskúmané {seen}/{n}',
      'slide.listen': 'Vypočuť: {text}',
      'slide.reveal': '{text}: ťukni a odhaľ',
      'slide.code': 'Kód v Pythone',
      'slide.reset': 'Od začiatku', 'slide.runNext': 'Spustiť ďalší riadok', 'slide.finished': 'Program skončil',
      'slide.codeNote': 'Stláčaj <b>Spustiť ďalší riadok</b> a prejdi program krok za krokom.',
      'slide.vars': 'Premenné', 'slide.noVars': 'zatiaľ žiadne', 'slide.output': 'Výstup',
      'slide.close': 'Zavrieť lekciu',
      'slide.save': 'Uložiť snímku do zápisníka',
      'slide.of': '{a} z {b}',
      'slide.back': 'Späť', 'slide.startQuiz': 'Začať kvíz', 'slide.next': 'Ďalej',
      'intro.title': 'Čas na kvíz!',
      'intro.text': { one: '{n} otázka o lekcii <b>{title}</b>. Za správnu odpoveď na prvý pokus získaš <b>+15 atramentu</b>.', few: '{n} otázky o lekcii <b>{title}</b>. Za každú správnu odpoveď na prvý pokus získaš <b>+15 atramentu</b>.', other: '{n} otázok o lekcii <b>{title}</b>. Za každú správnu odpoveď na prvý pokus získaš <b>+15 atramentu</b>.' },
      'intro.review': 'Prejsť snímky znova',
      'quiz.tag': 'Kvíz · {title}',
      'quiz.review': 'Opakovanie · ',
      'quiz.true': 'Pravda', 'quiz.false': 'Nepravda',
      'quiz.playAudio': 'Prehrať zvuk', 'quiz.playNotes': 'Zahrať tóny',
      'quiz.yourOrder': 'Tvoje poradie', 'quiz.orderHint': 'Ťukaj na položky nižšie v správnom poradí', 'quiz.pool': 'Položky na zoradenie',
      'quiz.answers': 'Odpovede',
      'quiz.close': 'Zavrieť kvíz', 'quiz.progress': 'Postup v kvíze', 'quiz.heartsSr': ' zostávajúcich sŕdc', 'quiz.sound': 'Zvukové efekty',
      'quiz.check': 'Skontrolovať',
      'quiz.combo': '{n} za sebou!',
      'quiz.finish': 'Dokončiť', 'quiz.continue': 'Pokračovať',
      'quiz.notQuite': 'Nie celkom',
      'quiz.hint': 'Ottova rada: {hint}',
      'quiz.hintDefault': 'pozri sa znova, čo ukazovali snímky.',
      'quiz.retry': 'Skúsiť znova',
      'quiz.praise': ['Výborne!', 'Presne tak!', 'Trafil si to!', 'Chápadlovo!', 'Veľký mozog!'],
      'done.fixed': 'Opravil si {mistakes}{rest}.',
      'done.left': ', ešte {n} na zopakovanie',
      'done.noneLeft': ' — nič ti nezostáva',
      'done.shaky': 'Niektoré ešte nesedia — nabudúce sa vrátia.',
      'done.trained': 'Dnes si natrénoval {arms}.',
      'done.reviewComplete': 'Opakovanie hotové!', 'done.mixComplete': 'Mix hotový!',
      'done.inkDrops': 'kvapky atramentu', 'done.dayStreak': 'dní v sérii', 'done.heartsLeft': 'zostávajúce srdcia',
      'done.backHome': 'Späť domov',
      'done.perfect': 'Dokonalá lekcia!', 'done.complete': 'Lekcia hotová!',
      'done.finished': 'Dokončil si lekciu <b>{title}</b>.',
      'done.firstTry': 'na prvý pokus', 'done.bestRow': 'najviac za sebou',
      'done.courseComplete': 'Kurz dokončený!',
      'done.seeCert': 'Pozri si certifikát za kurz {title}',
      'done.next': 'Ďalej: {title}',
      'done.backCourse': 'Späť na kurz',
      'bonus.game': 'Bonusová hra', 'bonus.best': ' · najlepšie {a}/{b}', 'bonus.upTo': 'až +20',
      'game.none': 'Tu zatiaľ nie je hra',
      'game.noneText': 'Táto lekcia nemá dosť obsahu na bonusovú hru.',
      'game.close': 'Zavrieť hru',
      'game.tag': 'Bonus · {title}',
      'game.stars': '{n} z 3 hviezdičiek',
      'game.score': 'skóre', 'game.best': 'osobný rekord',
      'game.didIt': 'Dokázal si to!', 'game.newBest': 'Nový rekord!', 'game.wellPlayed': 'Dobrá hra!',
      'game.again': 'Hrať znova', 'game.try': 'Skús radšej {title}',
      'arms.picked': 'Vybrané', 'arms.train': 'Trénovať', 'arms.replace': 'Nahradiť',
      'arms.back': 'Späť na profil',
      'arms.title': 'Vymeniť chápadlá',
      'arms.intro': 'Otto trénuje naraz osem predmetov. Ktorýkoľvek môžeš kedykoľvek vymeniť: pokrok v každom kurze zostáva.',
      'arms.resting': 'Odpočívajúce predmety',
      'arms.allTrained': 'Trénuješ všetky predmety.',
      'arms.nowTap': 'Teraz ťukni na chápadlo, ktoré má <b>{name}</b> nahradiť.',
      'arms.tapResting': 'Ťukni na odpočívajúci predmet a začni ho trénovať.',
      'arms.yours': 'Tvojich osem chápadiel',
      'week.letters': ['P', 'U', 'S', 'Š', 'P', 'S', 'N'],
      'week.names': ['Pondelok', 'Utorok', 'Streda', 'Štvrtok', 'Piatok', 'Sobota', 'Nedeľa'],
      'week.learned': 'učil si sa', 'week.today': 'dnes, ešte nie', 'week.future': 'ešte len príde', 'week.missed': 'vynechané',
      'prog.title': 'Tvojich deväť mozgov',
      'prog.intro': 'Jeden centrálny mozog, osem učiacich sa chápadiel. Ťukni na chápadlo a otvor jeho kurz.',
      'prog.node': '{name}, úroveň {level}, hotové {done} z {total} lekcií',
      'prog.streak': 'Séria',
      'prog.thisWeek': 'Tento týždeň',
      'prog.goalReached': '<b>{days}</b> tento týždeň · cieľ {goal} splnený!',
      'prog.goalLine': '<b>{active} z {goal}</b> dní tento týždeň',
      'prog.goalAria': 'Týždenný cieľ, dni',
      'prog.xp': 'XP tento týždeň', 'prog.lessons': 'Hotové lekcie', 'prog.coral': 'Koralová', 'prog.league': 'Liga',
      'prog.shelf': 'Zápisník a certifikáty',
      'prog.notebook': 'Zápisník',
      'prog.notebookEmpty': 'Snímky si ulož tlačidlom so záložkou',
      'prog.cert': 'Certifikát · {name}',
      'prog.certs': 'Certifikáty',
      'prog.certsEmpty': 'Dokonči všetky lekcie kurzu a získaj ho',
      'prog.language': 'Jazyk',
      'prog.reset': 'Obnoviť demo',
      'cert.locked': 'Certifikát je zamknutý',
      'cert.lockedText': 'Dokonči všetky lekcie kurzu <b>{title}</b> ({lessons}) a získaš ho. Zatiaľ máš hotové: {done}.',
      'cert.eyebrow': 'Certifikát o absolvovaní',
      'cert.certifies': 'Potvrdzujeme, že študent Octavo absolvoval kurz',
      'cert.score': 'skóre na prvý pokus', 'cert.lessons': 'hotové lekcie', 'cert.awarded': 'udelené',
      'cert.share': 'Zdieľať certifikát',
      'cert.shareTitle': 'Môj certifikát z Octavo',
      'cert.shareText': 'Dokončil som kurz „{title}“ v Octavo!',
      'note.title': 'Zápisník',
      'note.intro': 'Snímky, ku ktorým sa chceš vrátiť. Ťukni a otvor ich.',
      'note.slide': '{title} · snímka {n}',
      'note.remove': 'Odstrániť {title} zo zápisníka',
      'note.empty': 'Zatiaľ nič. Ťukni na záložku {icon} na ktorejkoľvek snímke a uložíš si ju sem.',
      'note.find': 'Nájsť lekciu',
      'toast.noAudio': 'Zvuk na tomto zariadení nie je dostupný',
      'toast.soundOn': 'Zvukové efekty zapnuté', 'toast.soundOff': 'Zvukové efekty vypnuté',
      'toast.pickFirst': 'Najprv vyber predmet na trénovanie',
      'toast.swapped': '{into} nahradil predmet {out}. Pokrok zostáva.',
      'toast.saved': 'Uložené do zápisníka', 'toast.removed': 'Odstránené zo zápisníka',
      'toast.goal': 'Cieľ: učiť sa {n} dní v týždni',
      'toast.copied': 'Odkaz skopírovaný', 'toast.copyFail': 'Odkaz sa nepodarilo skopírovať', 'toast.noShare': 'Zdieľanie tu nie je dostupné',
      'toast.enrolled': 'Zapísaný do kurzu {title}',
      'toast.reviewUpdated': 'Recenzia upravená', 'toast.reviewThanks': 'Ďakujeme za recenziu!', 'toast.reviewDeleted': 'Recenzia vymazaná',
      'toast.writeFirst': 'Najprv niečo napíš', 'toast.posted': 'Uverejnené v diskusii',
      'toast.replyFirst': 'Najprv napíš odpoveď', 'toast.replied': 'Odpoveď uverejnená',
      'toast.deleted': 'Vymazané', 'toast.cleared': 'Hľadanie a filtre vymazané', 'toast.reset': 'Demo obnovené',
      'g.memory.title': 'Ottovo pexeso', 'g.memory.blurb': 'Otáčaj kartičky a hľadaj dvojice.',
      'g.memory.pairs': '{found}/{total} dvojíc', 'g.memory.card': 'Kartička {n}, otočená', 'g.memory.down': 'Kartička otočená',
      'g.bubble.title': 'Prask bublinky', 'g.bubble.blurb': 'Počúvaj Otta a prasni bublinku, ktorá sedí.',
      'g.bubble.round': 'Kolo {n} z {total}', 'g.bubble.listen': 'Vypočuť znova', 'g.bubble.which': 'Ktorá to je?',
      'g.feed.title': 'Nakŕm Otta', 'g.feed.blurb': 'Patrí to k sebe? Nakŕm Otta správnymi maškrtami.',
      'g.feed.ask': 'Patria k sebe?', 'g.feed.yes': 'Mňam! 😋', 'g.feed.no': 'Fuj! 🙅',
      'g.feed.right': 'Mňam! Správne!', 'g.feed.caught': 'Dobre si si všimol! Bolo to pomiešané.',
      'g.feed.means': 'Hmm… <b>{a}</b> znamená <b>{b}</b>.',
      'g.speed.title': 'Rýchle páry', 'g.speed.blurb': 'Spoj každý pojem s jeho významom skôr, než vyprší čas.',
      'g.speed.ask': 'Ťukni na pojem, potom na jeho význam.',
      'g.speed.matches': { one: '{n} pár', few: '{n} páry', other: '{n} párov' },
      'g.fact.title': 'Fakt alebo výmysel', 'g.fact.blurb': 'Pravda alebo vymyslené? Séria správnych odpovedí násobí body.',
      'g.fact.fact': 'Fakt', 'g.fact.fiction': 'Výmysel',
      'g.fact.isFact': 'Je to fakt.', 'g.fact.isFiction': 'Je to výmysel.',
      'g.fact.right': '{n}/{total} správne', 'g.fact.continue': 'Pokračovať',
      'g.chain.title': 'Reťaz', 'g.chain.blurb': 'Vráť kroky do správneho poradia. Menej kontrol, viac bodov.',
      'g.chain.n': 'Reťaz {n}/{total}', 'g.chain.checks': { one: '{n} kontrola', few: '{n} kontroly', other: '{n} kontrol' },
      'g.chain.up': 'Posunúť vyššie', 'g.chain.down': 'Posunúť nižšie', 'g.chain.check': 'Skontrolovať reťaz',
      'g.chain.rebuilt': { one: '{n} reťaz poskladaná', few: '{n} reťaze poskladané', other: '{n} reťazí poskladaných' },
    },
  };

  document.documentElement.lang = lang;

  Object.assign(O, { LOCALES, LOCALE_NAMES, lang, setLang, loc, localize, isLocaleObj, langsOf, t, tn, fmtNum, fmtAgo, fmtDate, STRINGS });
})();
