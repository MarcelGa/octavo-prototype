# Octavo prototype

**Live demo: https://marcelga.github.io/octavo-prototype/**

A clickable phone prototype of Octavo, a universal learning app. Every subject ("arm") has a course; every lesson is an **interactive slide presentation** followed by a **quiz on what the slides taught**.

It's plain HTML, CSS and JavaScript with no build step and no dependencies. Progress (completed lessons, ink drops, streak, your chosen arms, enrollments, and your ratings, reviews and comments) is remembered in the browser; use **Reset demo** at the bottom of the Profile screen to start over.

## What's in the demo

| Subject | Course | Lessons |
| --- | --- | --- |
| Medicine | The nervous system | Meet the neuron · Firing a signal · Reflexes and the brain |
| Circuits | Electricity basics | Ohm's law · Series and parallel |
| Languages | Spanish: first conversations | Saying hello (with spoken audio) |
| Code | Python: first steps | Variables and loops |
| Physics | Forces and motion | Newton's three laws |
| Communication | Communicate with confidence | 13 lessons: First impression hacks · Build trust with your voice · Confidence wins · Speak up in any room · Storytelling secrets · Body language · Read people like a pro · Give tough feedback fast · Handle difficult people smartly · Say “no” and be likable · Interrupt smoothly · Defuse any conflict · Listen like a leader (with spoken example phrases) |
| Chemistry | Atoms and elements | Inside the atom |
| Music | Reading music | Notes on the staff (with playable notes) |
| Math | Fractions | Fractions with pizza |
| Italian | Italian: first steps | Greetings and goodbyes · Introducing yourself · At the café (with spoken Italian) |

Otto has eight arms but there are ten subjects, so two rest at a time (Math and Italian, to begin with). Use **Swap arms** on the Home or Profile screen to train a resting subject in place of another; progress in every course is kept.

Plus **Today's mix**, a quick 3-question quiz across subjects (Practice tab).

**Courses tab:** every course in one list. Search by title, topic or lecturer; filter by category, audience, lecturer, rating and your own status (enrolled, in progress, completed), combining as many as you like; sort by rating, number of ratings, learners, title, length, lessons, your progress or subject, then by a second field, each in either direction.

**Ratings, reviews and discussion:** every course shows its star rating, learner count and a **Reviews | Discussion** section. Enroll in a course (courses in your eight arms, or with a finished lesson, count as enrolled already) to rate it from 1 to 5 stars and write a review; edit or delete it any time. Filter reviews by stars or sort them, mark them helpful, and join the discussion: anyone can ask a question or share a tip, like comments and reply. Lecturers answer some of the questions.

**Slide features:** animated illustrations, tap-to-explore hotspots, replayable animations, sliders and simulators (threshold gauge, Ohm's law circuit, F = m × a cart, pizza fractions, atom builder), flip cards, text-to-speech phrases (Spanish, Italian and English), a playable piano and a line-by-line Python stepper. Swipe or use the arrow keys to move between slides.

**Quiz:** multiple choice (with pictures, code or audio), true/false and put-in-order questions, with sound effects, confetti, hearts and an "in a row" streak. On a computer, press 1–9 to answer and Enter to continue.

**Bonus games:** finishing a lesson unlocks an optional game built from that lesson's words, facts and steps. Octavo chooses it from three things: who the course is for, the subject, and the lecturer's teaching style. The Spanish course is set up for children, so it gets audio-first games with no timers: Bubble Pop, Memory and Feed Otto. Adult courses get Speed Match, Fact or Fiction, Chain and Memory, with scores and personal bests.

## Put it on your phone's home screen

Open the live demo on your phone, then:

- **iPhone (Safari):** Share › Add to Home Screen
- **Android (Chrome):** ⋮ menu › Add to Home screen

It opens full screen with the Otto icon, like an app.

## Notes

- Fonts (Fredoka, Nunito) load from Google Fonts. Without internet access the prototype falls back to the system font and still works.
- The subjects, levels and stats are sample data for the demo, as are the learner counts, ratings, reviews and comments from other learners (the people are fictional).
- This repository is published automatically from Octavo's private development repository. Please don't open pull requests here; changes made directly in this repository are overwritten.
