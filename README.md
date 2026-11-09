# Octavo prototype

**Live demo: https://marcelga.github.io/octavo-prototype/**

A clickable phone prototype of Octavo. Every subject ("arm") has a course; every lesson is an **interactive slide presentation** followed by a **quiz on what the slides taught**.

It's plain HTML, CSS and JavaScript with no build step and no dependencies. Progress (completed lessons, ink drops, streak) is remembered in the browser; use **Reset demo** at the bottom of the Profile screen to start over.

## What's in the demo

| Subject | Course | Lessons |
| --- | --- | --- |
| Medicine | The nervous system | Meet the neuron · Firing a signal · Reflexes and the brain |
| Circuits | Electricity basics | Ohm's law · Series and parallel |
| Languages | Spanish: first conversations | Saying hello (with spoken audio) |
| Code | Python: first steps | Variables and loops |
| Physics | Forces and motion | Newton's three laws |
| Math | Fractions | Fractions with pizza |
| Chemistry | Atoms and elements | Inside the atom |
| Music | Reading music | Notes on the staff (with playable notes) |

Plus **Today's mix**, a quick 3-question quiz across subjects (Practice tab).

**Slide features:** animated illustrations, tap-to-explore hotspots, replayable animations, sliders and simulators (threshold gauge, Ohm's law circuit, F = m × a cart, pizza fractions, atom builder), flip cards, text-to-speech phrases, a playable piano and a line-by-line Python stepper. Swipe or use the arrow keys to move between slides.

**Quiz types:** multiple choice (with pictures, code or audio), true/false and put-in-order.

## Adding a lesson

Courses live in [`content/`](content/), one file per subject. Each file calls `Octavo.addCourse({...})` with units → lessons → `slides` and `quiz`. A slide can have `art` (inline SVG), `text`, `spots`, `points`, `phrases`, `cards`, `code`, `controls` with a `setup(root, api)` function, and `replay`/`autoplay` for animations. Add the new file to `index.html` before `app.js`.

## Run it on your computer and share it on your Wi-Fi

Serve this folder with any static web server. In the main Octavo repository, from its root:

```bash
node scripts/serve.mjs
```

It prints two addresses:

- `http://localhost:8080` for this computer
- `http://192.168.x.x:8080` for any phone or laptop on the same Wi-Fi

The first time, Windows Firewall may ask whether Node.js can accept connections. Allow it on **private networks**. Stop the server with `Ctrl+C`.

Use a different port with `node scripts/serve.mjs prototype 3000`. Outside that repository, `npx serve .` or `python -m http.server 8080` in this folder work too.

## Put it on the phone's home screen

Open the address on your phone, then:

- **iPhone (Safari):** Share › Add to Home Screen
- **Android (Chrome):** ⋮ menu › Add to Home screen

It opens full screen with the Otto icon, like an app.

## Where it's hosted

The prototype is developed in the private Octavo repository, in its `prototype/` folder. The public repository [MarcelGa/octavo-prototype](https://github.com/MarcelGa/octavo-prototype) contains only this folder and serves it with GitHub Pages (branch `main`, folder `/ (root)`).

To publish changes, run this from the root of the private repository after committing:

```bash
pwsh scripts/publish-prototype.ps1
```

It pushes the `prototype/` folder's history to the public repository; GitHub Pages rebuilds in about a minute. Don't edit the public repository directly, or the next publish will be rejected.

## Releasing a new version

GitHub Pages lets browsers reuse files for up to 10 minutes, so phones can keep showing an old copy. To make every device pick up a release, bump the version number in **three places** before you push:

1. `version.json`: `{ "version": "4" }`
2. `APP_VERSION` near the bottom of `app.js`
3. Every `?v=` in `index.html`

The app checks `version.json` when it opens or comes back to the foreground and reloads itself once if a newer version is out.

## Notes

- Fonts (Fredoka, Nunito) load from Google Fonts. Without internet access the prototype falls back to the system font and still works.
- The subjects, levels and stats are sample data for the demo.
