'use strict';

/* Otto's Memory (kids and adults, any subject). Cards face down; find each term and its meaning.
   No timer; the score just counts how few turns it took. */
window.Octavo.addGame({
  id: 'memory',
  title: 'Otto’s Memory',
  blurb: 'Flip the cards and find the pairs.',
  audiences: ['kids', 'adult'],
  kinds: ['any', 'language'],
  styles: ['calm', 'playful'],
  needs: { pairs: 3 },
  setup(root, ctx) {
    const { shuffle, sample, esc } = ctx.kit;
    const chosen = sample(ctx.items.pairs, Math.min(4, ctx.items.pairs.length));
    const cards = shuffle(chosen.flatMap((p, i) => [{ pair: i, side: 'a', text: p.a, p }, { pair: i, side: 'b', text: p.b, p }]));
    let open = [];
    let found = 0;
    let turns = 0;
    let busy = false;

    const hud = () => ctx.hud(`<span class="g-count">${found}/${chosen.length} pairs</span>`);
    hud();
    root.innerHTML = `<div class="g-memory">${cards.map((c, i) => `
      <button type="button" class="g-card" data-g="flip" data-i="${i}" aria-label="Card ${i + 1}, face down">
        <span class="g-card-inner"><span class="g-card-back" aria-hidden="true">?</span><span class="g-card-face"${c.side === 'a' && c.p.lang ? ` lang="${esc(c.p.lang.slice(0, 2))}"` : ''}>${esc(c.text)}</span></span>
      </button>`).join('')}</div>`;

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-g="flip"]');
      if (!el || busy || el.classList.contains('up')) return;
      const c = cards[Number(el.dataset.i)];
      el.classList.add('up');
      el.setAttribute('aria-label', c.text);
      if (c.side === 'a' && c.p.audio) ctx.speak(c.p.say || c.p.a, c.p.lang);
      else ctx.sfx('tap');
      open.push(el);
      if (open.length < 2) return;
      turns += 1;
      const pairEls = open;
      open = [];
      const [x, y] = pairEls.map((b) => cards[Number(b.dataset.i)]);
      if (x.pair === y.pair) {
        pairEls.forEach((b) => b.classList.add('matched'));
        found += 1;
        hud();
        ctx.sfx('correct');
        if (found === chosen.length) {
          // Perfect is one turn per pair; every extra turn costs a little, never below 1.
          const max = chosen.length;
          ctx.later(() => ctx.finish({ score: Math.max(1, max - Math.floor((turns - max) / 2)), max }), 800);
        }
      } else {
        busy = true;
        ctx.later(() => {
          pairEls.forEach((b) => { b.classList.remove('up'); b.setAttribute('aria-label', 'Card face down'); });
          busy = false;
        }, 1100);
      }
    });
  },
});
