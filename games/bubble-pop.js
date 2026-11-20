'use strict';

/* Bubble Pop (kids, languages). Otto says a word; pop the bubble with its meaning.
   No timer and no fail state: a wrong bubble just wobbles. */
(() => {
const { t } = window.Octavo;
window.Octavo.addGame({
  id: 'bubble-pop',
  title: t('g.bubble.title'),
  blurb: t('g.bubble.blurb'),
  audiences: ['kids'],
  kinds: ['language'],
  styles: ['playful'],
  needs: { audioPairs: 4 },
  setup(root, ctx) {
    const { shuffle, sample, esc } = ctx.kit;
    const pool = ctx.items.audioPairs;
    const rounds = sample(pool, Math.min(6, pool.length));
    let r = 0;
    let firstTry = 0;
    let missed = false;

    const say = () => ctx.speak(rounds[r].say || rounds[r].a, rounds[r].lang);

    function draw() {
      const target = rounds[r];
      const others = sample(pool.filter((p) => p !== target), 2);
      const options = shuffle([target, ...others]);
      missed = false;
      ctx.hud(`<span class="g-dots" aria-label="${esc(t('g.bubble.round', { n: r + 1, total: rounds.length }))}">${rounds.map((_, i) => `<i class="${i < r ? 'on' : i === r ? 'now' : ''}"></i>`).join('')}</span>`);
      root.innerHTML = `
        <div class="g-prompt">
          <button type="button" class="g-listen" data-g="say" aria-label="${esc(t('g.bubble.listen'))}">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4zM16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg>
          </button>
          <p><b lang="${esc(target.lang.slice(0, 2))}">${esc(target.a)}</b><small>${t('g.bubble.which')}</small></p>
        </div>
        <div class="g-bubbles">${options.map((o, i) => `
          <button type="button" class="g-bubble" style="animation-delay: ${i * 0.4}s" data-g="pop" data-ok="${o === target}">${esc(o.b)}</button>`).join('')}
        </div>`;
      ctx.later(say, 300);
    }

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-g]');
      if (!el || el.disabled) return;
      if (el.dataset.g === 'say') { say(); return; }
      if (el.dataset.ok === 'true') {
        el.classList.add('popped');
        root.querySelectorAll('.g-bubble').forEach((b) => { b.disabled = true; });
        if (!missed) firstTry += 1;
        ctx.sfx('correct');
        ctx.later(() => {
          r += 1;
          if (r < rounds.length) draw();
          else ctx.finish({ score: firstTry, max: rounds.length });
        }, 650);
      } else {
        missed = true;
        el.classList.remove('wobble');
        void el.offsetWidth;
        el.classList.add('wobble');
        ctx.sfx('tap');
      }
    });

    draw();
  },
});
})();
