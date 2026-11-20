'use strict';

/* Lecturers. Each course names one with `lecturer: '<id>'`.
   style  steers which bonus game Octavo picks: playful | competitive | calm | academic.
   games  optional { allow: [game ids] } to limit the choice, or { block: [game ids] } to rule games out.
   The people are fictional demo personas. */
(() => {
  const { addLecturer } = window.Octavo;

  addLecturer({ id: 'lucia', name: 'Lucía Romero', style: 'playful', bio: 'Teaches Spanish to children through songs and play.' });
  addLecturer({ id: 'novak', name: 'Dr. Eva Novak', style: 'academic', bio: 'Neuroscientist who likes to check that facts stick.' });
  addLecturer({ id: 'kai', name: 'Kai Tanaka', style: 'competitive', bio: 'Engineer who loves a leaderboard.' });
  // A calm teacher who doesn't want timed games in her courses.
  addLecturer({ id: 'mara', name: 'Mara Ellis', style: 'calm', bio: 'Coach for confident, unhurried learning.', games: { block: ['speed-match'] } });
})();
