# Octavo prototype

**Live demo: https://marcelga.github.io/octavo-prototype/**

A clickable phone prototype of Octavo, a universal learning app, in English or Slovak. Every subject ("arm") has a course; every lesson is an **interactive slide presentation** followed by a **quiz on what the slides taught**.

It's plain HTML, CSS and JavaScript with no build step and no dependencies. Progress (completed lessons, ink drops, streak, your chosen arms, enrollments, and your ratings, reviews and comments) is remembered in the browser; use **Reset demo** at the bottom of the Profile screen to start over.

## What's in the demo

Every course below is available in English and Slovak, except the 2nd-grade courses (Matematika, Slovenčina, Prvouka, Hudobná výchova), which follow the Slovak school curriculum and are in Slovak only.

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
| Matematika | Sčítanie a odčítanie do 20 s prechodom (2. ročník ZŠ, in Slovak) | Prechod cez desiatku pri sčítaní · Prechod cez desiatku pri odčítaní · Rovnaké sčítance · Slovné úlohy do 20 |
| Matematika | Čísla do 100 | Desiatky a jednotky · Číselný rad a číselná os · Porovnávanie čísel |
| Matematika | Sčítanie a odčítanie do 100 | Počítame s celými desiatkami · Bez prechodu cez desiatku · S prechodom cez desiatku · Písomné sčítanie a odčítanie · Skúška, okienka a zložené úlohy |
| Matematika | Geometria a meranie | Bod, priamka, polpriamka, úsečka · Meriame dĺžku · Trojuholník a štvoruholník · Stavby z kociek a štvorcová sieť |
| Matematika | Logika, čas a peniaze | Pravda, nepravda a postupnosti · Koľko je možností? Tabuľky · Koľko je hodín? · Eurá a centy |
| Slovenčina | Hlásky a písmená (2. ročník ZŠ, in Slovak) | Hláska a písmeno · Abeceda · Dĺžeň, mäkčeň, vokáň, dve bodky |
| Slovenčina | Samohlásky a dvojhlásky | Krátke a dlhé samohlásky · Samohláska ä · Dvojhlásky ia, ie, iu, ô |
| Slovenčina | Tvrdé, mäkké a obojaké spoluhlásky | Mäkké spoluhlásky · Tvrdé spoluhlásky · Kino, kikirikí a lyžica · de, te, ne, le čítame mäkko · Obojaké spoluhlásky |
| Slovenčina | Slabiky a slová | Slabika a delenie slov · Rozdeľovanie slov na konci riadka |
| Slovenčina | Veta | Druhy viet · Veľké písmeno · Neúplná veta a poradie slov |
| Slovenčina | Píšeme a rozprávame | Blahoželanie, tykanie a vykanie · Adresa a list · Rozprávanie a opis |
| Slovenčina | Čítanie a literatúra | Báseň: verš, strofa, rým · Riekanky, vyčítanky, hádanky · Ľudová rozprávka · Kniha, knižnica a divadlo · Čítanie s porozumením |
| Prvouka | Rastliny (2. ročník ZŠ, in Slovak) | Čo rastliny potrebujú · Semená: ako sa šíria a klíčia · Pestované a divorastúce rastliny |
| Prvouka | Živočíchy | Rast a mláďatá · Chov zvierat a potrava · Včely a mravce |
| Prvouka | Kosti a svaly | Kostra ľudského tela · Rast kostí a zlomenina · Svaly a pohyb |
| Prvouka | Pôda, voda a vzduch | Pôda · Čo sa rozpúšťa vo vode · Filtrácia a odparovanie |
| Prvouka | Ja a svet okolo mňa | Bezpečne do školy · Kalendár a ročné obdobia · Rodina, obec a Slovensko · Krajina a doprava · Povolania a pomoc v núdzi |
| Hudobná výchova | Rytmus a takt (2. ročník ZŠ, in Slovak, with playable rhythms) | Ta a ti-ti · Polová nota, pomlčka a takt · Rytmizácia riekaniek |
| Hudobná výchova | Tempo, sila a výška tónu | Rýchlo, pomaly, silno, slabo · Vysoko a nízko: so-mi · Hlas a spev |
| Hudobná výchova | Nástroje a druhy skladieb | Orffove nástroje · Pieseň, pochod, tanec · Pohyb s hudbou |

Otto has eight arms but there are fourteen subjects, so six rest at a time (Math, Italian and the four 2nd-grade subjects, to begin with). Use **Swap arms** on the Home or Profile screen to train a resting subject in place of another; progress in every course is kept.

**Course series:** a subject can have several courses in a row. The Matematika, Slovenčina, Prvouka and Hudobná výchova courses follow the Slovak 2nd-grade curriculum (inovovaný ŠVP 2015) unit by unit, for children practising at home. The subject's arm opens the first course you haven't finished and counts lessons across the whole series; a course page lists the other courses of its series, and finishing one leads into the next.

Plus **Today's mix**, a quick 3-question quiz across subjects (Practice tab).

**English or Slovak:** the app opens in English. Switch to **Slovenčina** under **Language** on the Profile screen (it's remembered; `?lang=sk` in the address tries it once). Courses switch with it: every English course has a Slovak version, and in a language course only the language it's taught in changes, so in Slovak you learn Italian or Spanish from Slovak, with the same Italian and Spanish audio. The Communication course's example phrases become Slovak phrases. The 2nd-grade courses are written in Slovak and stay Slovak in the English app, marked with an **SK** chip. Reviews and comments from other learners stay in the language they were written in.

**Courses tab:** every course in one list. Search by title, topic or lecturer; filter by category, audience, lecturer, rating and your own status (enrolled, in progress, completed), combining as many as you like; sort by rating, number of ratings, learners, title, length, lessons, your progress or subject, then by a second field, each in either direction.

**Ratings, reviews and discussion:** every course shows its star rating, learner count and a **Reviews | Discussion** section. Enroll in a course (courses in your eight arms, or with a finished lesson, count as enrolled already) to rate it from 1 to 5 stars and write a review; edit or delete it any time. Filter reviews by stars or sort them, mark them helpful, and join the discussion: anyone can ask a question or share a tip, like comments and reply. Lecturers answer some of the questions.

**Slide features:** animated illustrations, tap-to-explore hotspots, replayable animations, sliders and simulators (threshold gauge, Ohm's law circuit, F = m × a cart, pizza fractions, atom builder), flip cards, text-to-speech phrases (Spanish, Italian, English and Slovak), a playable piano and a line-by-line Python stepper. Swipe or use the arrow keys to move between slides.

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
