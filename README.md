# Octavo prototype

**Live demo: https://marcelga.github.io/octavo-prototype/**

A clickable phone prototype of Octavo, a universal learning app. Every subject ("arm") has a course; every lesson is an **interactive slide presentation** followed by a **quiz on what the slides taught**.

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

**Quiz:** multiple choice (with pictures, code or audio), true/false and put-in-order questions, with sound effects, confetti, hearts and an "in a row" streak. On a computer, press 1–9 to answer and Enter to continue.

## Put it on your phone's home screen

Open the live demo on your phone, then:

- **iPhone (Safari):** Share › Add to Home Screen
- **Android (Chrome):** ⋮ menu › Add to Home screen

It opens full screen with the Otto icon, like an app.

## Notes

- Fonts (Fredoka, Nunito) load from Google Fonts. Without internet access the prototype falls back to the system font and still works.
- The subjects, levels and stats are sample data for the demo.
- This repository is published automatically from Octavo's private development repository. Please don't open pull requests here; changes made directly in this repository are overwritten.
