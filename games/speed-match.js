'use strict';

/* Speed Match (adults). Match terms to meanings against a 60-second clock.
   Each cleared board deals a new one; a streak of matches adds bonus points. */
(() => {
const { t, tn } = window.Octavo;
window.Octavo.addGame({
  id: 'speed-match',
  title: t('g.speed.title'),
  blurb: t('g.speed.blurb'),
  audiences: ['adult'],
  kinds: ['language', 'science', 'logic'],
  styles: ['competitive'],
  needs: { pairs: 4 },
  setup(root, ctx) {
    const { shuffle, sample, esc } = ctx.kit;
    const pairs = ctx.items.pairs;
    const SECONDS = 60;
    const perBoard = Math.min(4, pairs.length);
    let left = SECONDS;
    let points = 0;
    let matches = 0;
    let streak = 0;
    let picked = null;
    let board = [];
    let solved = 0;

    const hud = () => ctx.hud(`<span class="g-timer${left <= 10 ? ' low' : ''}">${left}s</span><span class="g-count">${t('pts', { n: points })}</span>`);

    function deal() {
      board = sample(pairs, perBoard);
      solved = 0;
      picked = null;
      const lefts = shuffle(board.map((p, i) => ({ i, t: p.a, lang: p.lang })));
      const rights = shuffle(board.map((p, i) => ({ i, t: p.b })));
      root.innerHTML = `
        <p class="g-ask">${t('g.speed.ask')}</p>
        <div class="g-columns">
          <div class="g-col">${lefts.map((x) => `<button type="button" class="g-tile term" data-g="term" data-i="${x.i}"${x.lang ? ` lang="${esc(x.lang.slice(0, 2))}"` : ''}>${esc(x.t)}</button>`).join('')}</div>
          <div class="g-col">${rights.map((x) => `<button type="button" class="g-tile" data-g="meaning" data-i="${x.i}">${esc(x.t)}</button>`).join('')}</div>
        </div>`;
    }

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-g]');
      if (!el || el.disabled || left <= 0) return;
      if (el.dataset.g === 'term') {
        root.querySelectorAll('.g-tile.term').forEach((b) => b.classList.remove('sel'));
        el.classList.add('sel');
        picked = el;
        ctx.sfx('tap');
        return;
      }
      if (!picked) { ctx.sfx('tap'); return; }
      const term = picked;
      if (term.dataset.i === el.dataset.i) {
        [term, el].forEach((b) => { b.classList.remove('sel'); b.classList.add('ok'); b.disabled = true; });
        streak += 1;
        matches += 1;
        points += 10 + Math.min(streak - 1, 4) * 2;
        ctx.sfx(streak >= 3 ? 'combo' : 'correct');
        solved += 1;
        if (solved === board.length) ctx.later(deal, 350);
      } else {
        streak = 0;
        [term, el].forEach((b) => { b.classList.remove('bad'); void b.offsetWidth; b.classList.add('bad'); });
        ctx.sfx('wrong');
      }
      picked = null;
      root.querySelectorAll('.g-tile.term').forEach((b) => b.classList.remove('sel'));
      hud();
    });

    const tick = setInterval(() => {
      left -= 1;
      hud();
      if (left <= 0) {
        clearInterval(tick);
        root.querySelectorAll('.g-tile').forEach((b) => { b.disabled = true; });
        ctx.later(() => ctx.finish({ score: matches, max: 12, points, label: tn('g.speed.matches', matches) }), 500);
      }
    }, 1000);

    hud();
    deal();
    return () => clearInterval(tick);
  },
});
})();
