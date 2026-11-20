'use strict';

/* Fact or Fiction (adults). Judge statements from the lesson as fast as you like;
   a run of right answers multiplies the points. Every miss explains itself. */
(() => {
const { t } = window.Octavo;
window.Octavo.addGame({
  id: 'fact-or-fiction',
  title: t('g.fact.title'),
  blurb: t('g.fact.blurb'),
  audiences: ['adult'],
  kinds: ['science', 'skills', 'logic', 'arts', 'any'],
  styles: ['academic', 'competitive'],
  needs: { facts: 4 },
  setup(root, ctx) {
    const { shuffle, esc } = ctx.kit;
    const facts = ctx.items.facts;
    // A fair deck: about half facts, half fiction, at most 8 cards.
    const yes = shuffle(facts.filter((f) => f.truth));
    const no = shuffle(facts.filter((f) => !f.truth));
    const truths = yes.slice(0, 4);
    const f = no.slice(0, 8 - truths.length);
    const deck = shuffle([...truths, ...f, ...yes.slice(4, 4 + 8 - truths.length - f.length)]);
    let i = 0;
    let right = 0;
    let streak = 0;
    let points = 0;
    let waiting = false;

    const mult = () => Math.min(1 + Math.floor(streak / 2), 4);
    const hud = () => ctx.hud(`<span class="g-count">${i + 1}/${deck.length}</span><span class="g-mult">×${mult()}</span><span class="g-count">${t('pts', { n: points })}</span>`);

    function draw() {
      const f = deck[i];
      waiting = false;
      hud();
      root.innerHTML = `
        <div class="g-claim a-pop">
          <p>${esc(f.claim)}</p>
          ${f.answer ? `<p class="g-claim-answer">→ ${esc(f.answer)}</p>` : ''}
        </div>
        <div class="g-yesno">
          <button type="button" class="g-yes" data-g="true">${t('g.fact.fact')}</button>
          <button type="button" class="g-no" data-g="false">${t('g.fact.fiction')}</button>
        </div>
        <div class="g-explain" aria-live="polite"></div>`;
    }

    const next = () => {
      i += 1;
      if (i < deck.length) draw();
      else ctx.finish({ score: right, max: deck.length, points, label: t('g.fact.right', { n: right, total: deck.length }) });
    };

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-g]');
      if (!el || el.disabled) return;
      if (el.dataset.g === 'next') { next(); return; }
      if (waiting) return;
      waiting = true;
      const f = deck[i];
      const ok = (el.dataset.g === 'true') === f.truth;
      root.querySelectorAll('.g-yesno button').forEach((b) => { b.disabled = true; });
      el.classList.add(ok ? 'ok' : 'bad');
      if (ok) {
        right += 1;
        streak += 1;
        points += 10 * mult();
        ctx.sfx(streak >= 3 ? 'combo' : 'correct');
        hud();
        ctx.later(next, 700);
      } else {
        streak = 0;
        ctx.sfx('wrong');
        hud();
        root.querySelector('.g-explain').innerHTML = `
          <p><b>${f.truth ? t('g.fact.isFact') : t('g.fact.isFiction')}</b> ${esc(f.explain || '')}</p>
          <button type="button" class="btn-primary small" data-g="next">${t('g.fact.continue')}</button>`;
      }
    });

    draw();
  },
});
})();
