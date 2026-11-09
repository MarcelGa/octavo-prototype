# Octavo prototype

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

From the repository root:

```bash
node scripts/serve.mjs
```

It prints two addresses:

- `http://localhost:8080` for this computer
- `http://192.168.x.x:8080` for any phone or laptop on the same Wi-Fi

The first time, Windows Firewall may ask whether Node.js can accept connections. Allow it on **private networks**. Stop the server with `Ctrl+C`.

Use a different port with `node scripts/serve.mjs prototype 3000`.

## Put it on the phone's home screen

Open the address on your phone, then:

- **iPhone (Safari):** Share › Add to Home Screen
- **Android (Chrome):** ⋮ menu › Add to Home screen

It opens full screen with the Otto icon, like an app.

## Host it on GitHub Pages

1. Push the repository to GitHub.
2. In the repo, open **Settings › Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick your branch (`main`) and the **`/ (root)`** folder, then **Save**.
4. After a minute the prototype is at `https://<your-username>.github.io/<repo-name>/prototype/`.

GitHub Pages is free for public repositories; a private repository needs a paid plan (e.g. GitHub Pro). The published site is visible to anyone who has the link.

## Notes

- Fonts (Fredoka, Nunito) load from Google Fonts. Without internet access the prototype falls back to the system font and still works.
- The subjects, levels and stats are sample data for the demo.
