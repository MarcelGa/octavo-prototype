'use strict';

/* Feed Otto (kids, any subject). Otto holds up a word and a meaning. Do they go together?
   Tap "Yum!" for a match or "Yuck!" for a mix-up. A miss just shows the right pair. */
window.Octavo.addGame({
  id: 'feed-otto',
  title: 'Feed Otto',
  blurb: 'Does it match? Feed Otto the right snacks.',
  audiences: ['kids'],
  kinds: ['any', 'language'],
  styles: ['playful'],
  needs: { pairs: 3 },
  setup(root, ctx) {
    const { shuffle, sample, esc } = ctx.kit;
    const pairs = ctx.items.pairs;
    // Half real pairs, half mix-ups (a word with another word's meaning).
    const rounds = shuffle(sample(pairs, Math.min(6, pairs.length)).map((p, i) => {
      const real = i % 2 === 0;
      const other = sample(pairs.filter((q) => q !== p), 1)[0];
      return { p, shown: real ? p.b : other.b, real };
    }));
    let r = 0;
    let right = 0;

    const OTTO = `<svg viewBox="0 0 120 110" aria-hidden="true"><g class="g-otto-body"><ellipse cx="60" cy="52" rx="40" ry="38" fill="#6C4CF1"/>
      <circle cx="46" cy="48" r="11" fill="#fff"/><circle cx="74" cy="48" r="11" fill="#fff"/><circle cx="48" cy="50" r="5.5" fill="#1E1A3C"/><circle cx="76" cy="50" r="5.5" fill="#1E1A3C"/>
      <ellipse class="g-mouth" cx="60" cy="72" rx="10" ry="6" fill="#1E1A3C"/>
      <path d="M28 82 q-6 14 -14 18 M44 88 q0 12 -4 18 M76 88 q0 12 4 18 M92 82 q6 14 14 18" stroke="#6C4CF1" stroke-width="7" stroke-linecap="round" fill="none"/></g></svg>`;

    function draw() {
      const round = rounds[r];
      ctx.hud(`<span class="g-dots">${rounds.map((_, i) => `<i class="${i < r ? 'on' : i === r ? 'now' : ''}"></i>`).join('')}</span>`);
      root.innerHTML = `
        <div class="g-feed">
          <div class="g-otto">${OTTO}</div>
          <div class="g-snack">
            <b${round.p.lang ? ` lang="${esc(round.p.lang.slice(0, 2))}"` : ''}>${esc(round.p.a)}</b>
            <span aria-hidden="true">=</span>
            <span>${esc(round.shown)}</span>
          </div>
          <p class="g-ask">Do they go together?</p>
          <div class="g-yesno">
            <button type="button" class="g-yes" data-g="yes">Yum! 😋</button>
            <button type="button" class="g-no" data-g="no">Yuck! 🙅</button>
          </div>
          <p class="g-note" aria-live="polite"></p>
        </div>`;
      if (round.p.audio) ctx.later(() => ctx.speak(round.p.say || round.p.a, round.p.lang), 250);
    }

    root.addEventListener('click', (e) => {
      const el = e.target.closest('[data-g]');
      if (!el || el.disabled) return;
      const round = rounds[r];
      const saidYes = el.dataset.g === 'yes';
      root.querySelectorAll('.g-yesno button').forEach((b) => { b.disabled = true; });
      const otto = root.querySelector('.g-otto');
      if (saidYes === round.real) {
        right += 1;
        otto.classList.add('happy');
        ctx.sfx('correct');
        root.querySelector('.g-note').textContent = round.real ? 'Yum! That’s right!' : 'Good catch! That was a mix-up.';
      } else {
        otto.classList.add('think');
        ctx.sfx('tap');
        root.querySelector('.g-note').innerHTML = `Hmm… <b>${esc(round.p.a)}</b> means <b>${esc(round.p.b)}</b>.`;
      }
      ctx.later(() => {
        r += 1;
        if (r < rounds.length) draw();
        else ctx.finish({ score: right, max: rounds.length });
      }, saidYes === round.real ? 1000 : 2200);
    });

    draw();
  },
});
