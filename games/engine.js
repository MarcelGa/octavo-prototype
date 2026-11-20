'use strict';

/* Bonus-game engine. Games are independent of courses: they never read a course
   directly. The engine turns a lesson into a neutral list of items, and picks a
   game from the course's audience, its subject kind and its lecturer's style.

   A game registers itself with Octavo.addGame({
     id, title, blurb,
     audiences: ['kids' | 'adult'],
     kinds:     ['language' | 'science' | 'logic' | 'skills' | 'arts' | 'any'],
     styles:    ['playful' | 'competitive' | 'calm' | 'academic'],
     needs:     { pairs?, audioPairs?, facts?, sequences? }   // minimum item counts
     setup(root, ctx)  // builds the game inside root; returns an optional cleanup function
   })
   ctx: { items, kids, kit, speak, sfx, hud(html), finish({ score, max }), later(fn, ms) } */
(() => {
  const O = window.Octavo;

  // ------------------------------------------------------------ helpers shared by games

  const decode = (s) => s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  const plain = (html) => decode(String(html ?? '').replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const firstSentence = (s) => (s.match(/^.*?[.!?](?=\s|$)/) || [s])[0];
  function shuffle(list) {
    const a = [...list];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  const sample = (list, n) => shuffle(list).slice(0, n);
  function hash(str) {
    let h = 0;
    for (const ch of str) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    return h;
  }
  const kit = { plain, esc, shuffle, sample };

  // ------------------------------------------------------------ lesson -> items

  // pairs:     { a, b, lang?, audio }   a term and its meaning (phrases, flip cards, labelled spots, short Q&A)
  // facts:     { claim, answer?, truth, explain }   statements to judge (true/false questions, and Q&A with right or wrong answers)
  // sequences: { prompt, items }        things that go in a fixed order (order questions)
  function extractItems(lesson) {
    const pairs = [];
    const facts = [];
    const sequences = [];
    const seenA = new Set();
    const seenB = new Set();
    const addPair = (p) => {
      if (!p.a || !p.b || p.a.length > 60 || p.b.length > 80) return;
      const ka = p.a.toLowerCase();
      const kb = p.b.toLowerCase();
      if (seenA.has(ka) || seenB.has(kb)) return;
      seenA.add(ka);
      seenB.add(kb);
      pairs.push(p);
    };

    for (const s of lesson.slides || []) {
      for (const p of s.phrases || []) addPair({ a: plain(p.es), b: plain(p.en), lang: p.lang || 'es-ES', audio: true, say: p.say || p.es });
      for (const c of s.cards || []) addPair({ a: plain(c.front), b: plain(c.back), lang: c.lang || 'es-ES', audio: true, say: c.front });
      for (const sp of s.spots || []) addPair({ a: plain(sp.label).replace(/^\d+\s*·\s*/, ''), b: firstSentence(plain(sp.info)), audio: false });
    }

    for (const q of lesson.quiz || []) {
      const explain = plain(q.explain);
      if (q.type === 'tf') facts.push({ claim: plain(q.statement), truth: !!q.answer, explain });
      if (q.type === 'order' && q.items?.length >= 3) sequences.push({ prompt: plain(q.prompt), items: q.items.map(plain) });
      if (q.type === 'choice') {
        const answer = plain(q.answer);
        const prompt = plain(q.prompt);
        if (q.say) addPair({ a: plain(q.say.text), b: answer, lang: q.say.lang || 'es-ES', audio: true, say: q.say.text });
        else if (!q.art && !q.code) addPair({ a: prompt, b: answer, audio: false, qa: true });
        if (!q.say && !q.tones && !q.art && !q.code) { // statements that need a picture or code to make sense stay out
          facts.push({ claim: prompt, answer, truth: true, explain });
          for (const o of q.options || []) if (o !== q.answer) facts.push({ claim: prompt, answer: plain(o), truth: false, explain });
        }
      }
    }
    return { pairs, facts, sequences, audioPairs: pairs.filter((p) => p.audio) };
  }

  const counts = (items) => ({
    pairs: items.pairs.length, audioPairs: items.audioPairs.length,
    facts: items.facts.length, sequences: items.sequences.length,
  });

  // ------------------------------------------------------------ choosing a game

  // ctx: { audience, kind, lecturer, lastGame }
  // Returns every game that fits, best first. The first one is the pick.
  function rankGames(lesson, ctx) {
    const items = extractItems(lesson);
    const have = counts(items);
    const lec = ctx.lecturer || {};
    const allow = lec.games?.allow;
    const block = lec.games?.block || [];
    const fits = O.games.filter((g) => g.audiences.includes(ctx.audience)
      && (!allow || allow.includes(g.id))
      && !block.includes(g.id)
      && Object.entries(g.needs || {}).every(([k, n]) => (have[k] || 0) >= n));
    const score = (g) => (g.kinds.includes(ctx.kind) ? 2 : g.kinds.includes('any') ? 1 : 0)
      + (lec.style && g.styles.includes(lec.style) ? 2 : 0)
      + (ctx.lastGame && ctx.lastGame !== g.id ? 1 : 0);
    const seed = hash(lesson.id);
    return fits
      .map((g) => ({ g, s: score(g), t: hash(g.id + seed) }))
      .sort((x, y) => y.s - x.s || x.t - y.t)
      .map((x) => x.g);
  }

  // ------------------------------------------------------------ running a game

  let current = null;

  function stopGame() {
    if (!current) return;
    current.timers.forEach(clearTimeout);
    try { current.cleanup?.(); } catch (err) { console.error(err); }
    current = null;
  }

  // host: { speak, sfx, hud(html), onFinish(result) }
  function mountGame(game, lesson, root, host, audience) {
    stopGame();
    const run = { timers: [], cleanup: null, done: false };
    current = run;
    const ctx = {
      items: extractItems(lesson),
      kids: audience === 'kids',
      kit,
      speak: host.speak,
      sfx: host.sfx,
      hud: host.hud,
      later(fn, ms) { const t = setTimeout(() => { if (current === run) fn(); }, ms); run.timers.push(t); return t; },
      finish(result) {
        if (run.done || current !== run) return;
        run.done = true;
        stopGame();
        host.onFinish(result);
      },
    };
    try { run.cleanup = game.setup(root, ctx) || null; } catch (err) { console.error(err); }
  }

  const gameById = (id) => O.games.find((g) => g.id === id);

  Object.assign(O, { extractItems, rankGames, mountGame, stopGame, gameById, gameKit: kit });
})();
