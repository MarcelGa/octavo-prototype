'use strict';

/* Lecturers. Each course names one with `lecturer: '<id>'`.
   style  steers which bonus game Octavo picks: playful | competitive | calm | academic.
   games  optional { allow: [game ids] } to limit the choice, or { block: [game ids] } to rule games out.
   The people are fictional demo personas. */
(() => {
  const { addLecturer } = window.Octavo;

  // bio may be { en, sk } (see i18n.js); a plain string is shown in every language.
  addLecturer({ id: 'lucia', name: 'Lucía Romero', style: 'playful', bio: { en: 'Teaches Spanish to children through songs and play.', sk: 'Učí deti španielčinu cez pesničky a hry.' } });
  addLecturer({ id: 'novak', name: 'Dr. Eva Novak', style: 'academic', bio: { en: 'Neuroscientist who likes to check that facts stick.', sk: 'Neurovedkyňa, ktorá rada overuje, že fakty naozaj zostanú v hlave.' } });
  addLecturer({ id: 'kai', name: 'Kai Tanaka', style: 'competitive', bio: { en: 'Engineer who loves a leaderboard.', sk: 'Inžinier, ktorý zbožňuje rebríčky.' } });
  // A calm teacher who doesn't want timed games in her courses.
  addLecturer({ id: 'mara', name: 'Mara Ellis', style: 'calm', bio: { en: 'Coach for confident, unhurried learning.', sk: 'Koučka sebavedomého učenia bez zhonu.' }, games: { block: ['speed-match'] } });
  // Primary-school teachers for the Slovak 2nd-grade courses (fictional).
  addLecturer({ id: 'zuzana', name: 'Zuzana Lipová', style: 'playful', bio: 'Učiteľka na prvom stupni. Slovenčinu a hudobnú učí cez hry, riekanky a pesničky.' });
  addLecturer({ id: 'peter', name: 'Peter Javor', style: 'calm', bio: 'Učiteľ na prvom stupni. Matematiku a prvouku vysvetľuje pomaly, krok za krokom, na veciach z bežného života.' });
})();
