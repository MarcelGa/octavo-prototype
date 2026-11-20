'use strict';

/* Chain (adults). Rebuild a sequence from the lesson by moving links up and down.
   "Check" lights up the links already in the right place, so you can reason it out.
   Fewer checks score higher; there is no clock. */
(() => {
const { t, tn } = window.Octavo;
window.Octavo.addGame({
  id: 'chain',
  title: t('g.chain.title'),
  blurb: t('g.chain.blurb'),
  audiences: ['adult'],
  kinds: ['logic', 'science', 'skills'],
  styles: ['calm', 'academic'],
  needs: { sequences: 1 },
  setup(root, ctx) {
    const { shuffle, esc } = ctx.kit;
    const seqs = ctx.items.sequences.slice(0, 3);
    const MAX_PER = 3;
    let s = 0;
    let order = [];
    let checks = 0;
    let total = 0;
    let locked = new Set();

    const hud = () => ctx.hud(`<span class="g-count">${t('g.chain.n', { n: s + 1, total: seqs.length })}</span><span class="g-count">${tn('g.chain.checks', checks)}</span>`);

    function start() {
      const n = seqs[s].items.length;
      do { order = shuffle([...Array(n).keys()]); } while (order.every((v, k) => v === k));
      checks = 0;
      locked = new Set();
      draw();
    }

    function draw() {
      const seq = seqs[s];
      hud();
      root.innerHTML = `
        <p class="g-ask">${esc(seq.prompt)}</p>
        <ol class="g-chain">${order.map((v, k) => `
          <li class="g-link${locked.has(k) ? ' ok' : ''}">
            <span class="g-link-n">${k + 1}</span>
            <span class="g-link-t">${esc(seq.items[v])}</span>
            <span class="g-link-btns">
              <button type="button" data-g="up" data-k="${k}" aria-label="${esc(t('g.chain.up'))}"${k === 0 || locked.has(k) ? ' disabled' : ''}>▲</button>
              <button type="button" data-g="down" data-k="${k}" aria-label="${esc(t('g.chain.down'))}"${k === order.length - 1 || locked.has(k) ? ' disabled' : ''}>▼</button>
            </span>
          </li>`).join('')}
        </ol>
        <button type="button" class="btn-primary" data-g="check">${t('g.chain.check')}</button>`;
    }

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-g]');
      if (!el || el.disabled) return;
      const k = Number(el.dataset.k);
      if (el.dataset.g === 'up' || el.dataset.g === 'down') {
        // Skip over links already locked in place.
        const dir = el.dataset.g === 'up' ? -1 : 1;
        let to = k + dir;
        while (locked.has(to)) to += dir;
        if (to < 0 || to >= order.length) return;
        [order[k], order[to]] = [order[to], order[k]];
        ctx.sfx('tap');
        draw();
        return;
      }
      if (el.dataset.g === 'check') {
        checks += 1;
        order.forEach((v, idx) => { if (v === idx) locked.add(idx); });
        if (locked.size === order.length) {
          total += Math.max(1, MAX_PER + 1 - checks);
          ctx.sfx('combo');
          draw();
          root.querySelector('.g-chain').classList.add('done');
          root.querySelector('[data-g="check"]').disabled = true;
          ctx.later(() => {
            s += 1;
            if (s < seqs.length) start();
            else ctx.finish({ score: total, max: seqs.length * MAX_PER, label: tn('g.chain.rebuilt', seqs.length) });
          }, 1100);
        } else {
          ctx.sfx('wrong');
          draw();
        }
      }
    });

    start();
  },
});
})();
