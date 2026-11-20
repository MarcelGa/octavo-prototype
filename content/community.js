'use strict';

/* Community sample data: learners, star ratings, written reviews and the discussion
   for every course. Octavo.addCommunity(courseId, {...}):
     enrolled  learners enrolled so far
     ratings   star ratings without a written review, as counts [5★, 4★, 3★, 2★, 1★]
     reviews   written reviews { id, name, stars, days (days ago), text, helpful }
     comments  discussion { id, name, days, text, likes, replies: [{ id, name | lecturer: true, days, text, likes }] }
   A reply with lecturer: true is shown as the course's lecturer.
   Everything here is fictional demo data; what the learner adds is kept in the browser. */
(() => {
  const { addCommunity } = window.Octavo;

  addCommunity('nervous-system', {
    enrolled: 24816,
    ratings: [1412, 498, 96, 21, 12],
    reviews: [
      { id: 'ns-r1', name: 'Priya S.', stars: 5, days: 2, helpful: 41, text: 'I’m a first-year nursing student and the action potential finally makes sense. Watching the charge flip on the slide did more than three textbook chapters.' },
      { id: 'ns-r2', name: 'Tomás R.', stars: 5, days: 6, helpful: 27, text: 'The tap-to-explore neuron is brilliant. Dendrites, axon, myelin: I can label all of it now without looking.' },
      { id: 'ns-r3', name: 'Hannah W.', stars: 4, days: 11, helpful: 18, text: 'Really clear and quick. I wish the reflex lesson went a bit deeper into the spinal cord, but for ten minutes a day it’s great.' },
      { id: 'ns-r4', name: 'Daniel K.', stars: 5, days: 15, helpful: 12, text: '“All or nothing” is the line that stuck with me. Dr. Novak explains things like she’s talking to you, not at you.' },
      { id: 'ns-r5', name: 'Mei L.', stars: 3, days: 23, helpful: 9, text: 'Good content, but the quiz on the synapse tripped me up twice. Maybe one more slide on neurotransmitters before it?' },
      { id: 'ns-r6', name: 'Oliver B.', stars: 5, days: 34, helpful: 6, text: 'Did this with my 14-year-old for her biology test. We both learned something, and she got an A.' },
      { id: 'ns-r7', name: 'Fatima A.', stars: 4, days: 52, helpful: 4, text: 'Myelin as the “express lane” is such a good way to put it. Short, friendly and accurate.' },
    ],
    comments: [
      { id: 'ns-c1', name: 'Jonas P.', days: 1, likes: 14, text: 'Why does the signal only travel one way along the axon? Couldn’t it go backwards?',
        replies: [
          { id: 'ns-c1a', lecturer: true, days: 1, likes: 22, text: 'Great question! Right after a section fires it needs a moment to reset (the refractory period), so the signal can only move forward into the part that’s still ready.' },
          { id: 'ns-c1b', name: 'Priya S.', days: 0, likes: 3, text: 'That’s the bit that clicked for me too, like dominoes that can’t stand back up straight away.' },
        ] },
      { id: 'ns-c2', name: 'Aisha M.', days: 4, likes: 9, text: 'Tip: do the reflex lesson right after “Firing a signal”. The blink example makes way more sense with the action potential fresh in your head.', replies: [] },
      { id: 'ns-c3', name: 'Lukas H.', days: 9, likes: 6, text: 'Is there going to be a unit on the autonomic nervous system? Fight or flight would be amazing.',
        replies: [
          { id: 'ns-c3a', lecturer: true, days: 8, likes: 11, text: 'It’s on our list for the next unit. Thanks for asking, it helps us decide what comes first!' },
        ] },
      { id: 'ns-c4', name: 'Grace O.', days: 17, likes: 4, text: 'The cerebellum fact surprised me. Over half the brain’s neurons in something that small!', replies: [] },
    ],
  });

  addCommunity('electricity', {
    enrolled: 15302,
    ratings: [702, 341, 88, 19, 9],
    reviews: [
      { id: 'el-r1', name: 'Marco D.', stars: 5, days: 1, helpful: 33, text: 'Dragging the voltage slider and watching the current change is the best explanation of Ohm’s law I’ve ever seen. Instantly intuitive.' },
      { id: 'el-r2', name: 'Sophie T.', stars: 5, days: 5, helpful: 21, text: 'The water-in-a-pipe analogy plus the live circuit. I’m an apprentice electrician and I’ve recommended this to the whole group.' },
      { id: 'el-r3', name: 'Ben C.', stars: 4, days: 9, helpful: 14, text: 'Series vs parallel finally makes sense. Would love a lesson on power (watts) next.' },
      { id: 'el-r4', name: 'Nadia F.', stars: 4, days: 18, helpful: 8, text: 'Kai’s style is fast and fun. The quiz is tougher than it looks, which I liked.' },
      { id: 'el-r5', name: 'Ryan G.', stars: 3, days: 27, helpful: 5, text: 'Solid intro, but only two lessons for now. Looking forward to the rest of the course.' },
      { id: 'el-r6', name: 'Elif Y.', stars: 5, days: 41, helpful: 3, text: 'Helped me fix the fairy lights at home. Turns out one bulb going out in series kills the whole string!' },
    ],
    comments: [
      { id: 'el-c1', name: 'Sam W.', days: 2, likes: 12, text: 'Quick way to remember V = I × R: put V on top of a triangle, I and R underneath. Cover the one you want.',
        replies: [
          { id: 'el-c1a', lecturer: true, days: 2, likes: 9, text: 'The classic triangle! Works every time. Nice one, Sam.' },
        ] },
      { id: 'el-c2', name: 'Chloé M.', days: 6, likes: 7, text: 'Why do houses use parallel wiring and not series?',
        replies: [
          { id: 'el-c2a', name: 'Marco D.', days: 6, likes: 5, text: 'So every socket gets the full voltage, and one appliance switching off doesn’t turn the others off.' },
          { id: 'el-c2b', lecturer: true, days: 5, likes: 8, text: 'Exactly what Marco said. It’s the second lesson’s big takeaway.' },
        ] },
      { id: 'el-c3', name: 'Igor N.', days: 13, likes: 3, text: 'Got 3/3 on the first try. Going for a perfect run on series and parallel tomorrow.', replies: [] },
    ],
  });

  addCommunity('spanish', {
    enrolled: 38140,
    ratings: [2604, 712, 140, 31, 18],
    reviews: [
      { id: 'sp-r1', name: 'Laura M.', stars: 5, days: 1, helpful: 58, text: 'My 6-year-old asks to “do Otto Spanish” every evening. She says “¡Hola, me llamo Ella!” to everyone now.' },
      { id: 'sp-r2', name: 'James P.', stars: 5, days: 3, helpful: 37, text: 'The audio is the best part. My son can’t read yet, so being able to tap and hear every word means he can play on his own.' },
      { id: 'sp-r3', name: 'Ana G.', stars: 5, days: 8, helpful: 22, text: 'As a Spanish-speaking mum raising kids abroad, I’m picky. The pronunciation and the phrases are natural. Lucía clearly knows children.' },
      { id: 'sp-r4', name: 'Kevin O.', stars: 4, days: 14, helpful: 15, text: 'Bubble Pop after the lesson is a huge hit. Only wish there were more lessons already!' },
      { id: 'sp-r5', name: 'Sara B.', stars: 4, days: 22, helpful: 10, text: 'Lovely and calm, no timers stressing my daughter out. The voice depends on the phone, ours sounds a bit robotic.' },
      { id: 'sp-r6', name: 'Mohammed E.', stars: 5, days: 30, helpful: 7, text: 'We learn together at breakfast. “El pulpo” is now the family’s favourite word.' },
      { id: 'sp-r7', name: 'Julia K.', stars: 3, days: 45, helpful: 4, text: 'Cute and well made, but my 9-year-old found it a bit easy. Better for the younger ones.' },
    ],
    comments: [
      { id: 'sp-c1', name: 'Emma R.', days: 1, likes: 19, text: 'What age is this best for? My twins are 4.',
        replies: [
          { id: 'sp-c1a', lecturer: true, days: 1, likes: 24, text: '¡Hola Emma! It’s made for about 4 to 8. At 4, sit with them for the first lesson and let them tap the cards. They’ll love the sounds.' },
        ] },
      { id: 'sp-c2', name: 'Pedro A.', days: 5, likes: 11, text: 'Tip for parents: say the phrases back with your child after each card. Mine remembers much more that way.', replies: [] },
      { id: 'sp-c3', name: 'Lily H.', days: 10, likes: 6, text: 'Will there be songs? My daughter sings everything.',
        replies: [
          { id: 'sp-c3a', lecturer: true, days: 9, likes: 13, text: 'Songs are coming in the sea creatures unit. ¡Muy pronto!' },
          { id: 'sp-c3b', name: 'Laura M.', days: 9, likes: 2, text: 'Yes please!! 🎶' },
        ] },
      { id: 'sp-c4', name: 'Tom F.', days: 21, likes: 3, text: 'The Feed Otto game is adorable. My son cheers every time Otto eats the right word.', replies: [] },
    ],
  });

  addCommunity('python', {
    enrolled: 31277,
    ratings: [1580, 690, 160, 38, 22],
    reviews: [
      { id: 'py-r1', name: 'Arjun V.', stars: 5, days: 2, helpful: 46, text: 'The line-by-line stepper is genius. Seeing the variables change after every line is exactly what I was missing in other courses.' },
      { id: 'py-r2', name: 'Claire D.', stars: 5, days: 7, helpful: 25, text: 'I’m 52 and never coded before. I traced my first loop today and understood it. Thank you!' },
      { id: 'py-r3', name: 'Felix S.', stars: 4, days: 12, helpful: 17, text: 'Great start. One lesson is short though. Can’t wait for functions and lists.' },
      { id: 'py-r4', name: 'Yuki T.', stars: 4, days: 19, helpful: 11, text: '“Variables are labelled boxes” is simple but it’s the right picture. Good pace for beginners.' },
      { id: 'py-r5', name: 'Robert L.', stars: 3, days: 29, helpful: 6, text: 'Nice explanations, but as someone with a bit of experience I’d like a way to actually type and run code.' },
      { id: 'py-r6', name: 'Zara N.', stars: 5, days: 38, helpful: 5, text: 'Chain game after the lesson made me put the loop steps in order in my head. Sneaky learning, love it.' },
    ],
    comments: [
      { id: 'py-c1', name: 'Noah J.', days: 1, likes: 16, text: 'Why does range(3) give 0, 1, 2 and not 1, 2, 3?',
        replies: [
          { id: 'py-c1a', lecturer: true, days: 1, likes: 21, text: 'Python counts from 0! range(3) means “three numbers, starting at 0”. It feels odd at first and then becomes second nature.' },
          { id: 'py-c1b', name: 'Arjun V.', days: 0, likes: 4, text: 'range(1, 4) gives 1, 2, 3 if you need that.' },
        ] },
      { id: 'py-c2', name: 'Isabel C.', days: 4, likes: 8, text: 'Step through the program twice: once to follow the lines, then again only watching the Variables box. Helped me a lot.', replies: [] },
      { id: 'py-c3', name: 'Mateusz W.', days: 11, likes: 5, text: 'Is there a way to practise writing code from scratch?',
        replies: [
          { id: 'py-c3a', lecturer: true, days: 10, likes: 9, text: 'A code playground is planned for the full app. For now, try predicting the output before you press Run next line.' },
        ] },
    ],
  });

  addCommunity('motion', {
    enrolled: 12960,
    ratings: [618, 302, 71, 15, 8],
    reviews: [
      { id: 'mo-r1', name: 'Leo M.', stars: 5, days: 3, helpful: 29, text: 'The F = m × a cart simulator is so satisfying. Double the mass, half the acceleration. I get it now.' },
      { id: 'mo-r2', name: 'Amara U.', stars: 5, days: 8, helpful: 18, text: 'The jet-powered octopus for the third law made me laugh, and I’ll never forget it.' },
      { id: 'mo-r3', name: 'Chris E.', stars: 4, days: 16, helpful: 10, text: 'Clear and precise. Dr. Novak’s quizzes really check you understood, not just memorised.' },
      { id: 'mo-r4', name: 'Natalia P.', stars: 4, days: 25, helpful: 6, text: 'Good refresher before my physics exam. More practice questions would be welcome.' },
      { id: 'mo-r5', name: 'Gabriel T.', stars: 3, days: 40, helpful: 3, text: 'Well explained but short for now. Friction and gravity next, please.' },
      { id: 'mo-r6', name: 'Ines V.', stars: 5, days: 47, helpful: 2, text: 'Used the inertia slide to explain seatbelts to my kids. Perfect example.' },
    ],
    comments: [
      { id: 'mo-c1', name: 'Ethan B.', days: 3, likes: 10, text: 'If every action has an equal and opposite reaction, why does anything move at all?',
        replies: [
          { id: 'mo-c1a', lecturer: true, days: 2, likes: 17, text: 'Because the two forces act on different objects. The octopus pushes water back and the water pushes the octopus forward. Each one moves.' },
        ] },
      { id: 'mo-c2', name: 'Rosa K.', days: 7, likes: 5, text: 'Try the cart with the lightest mass and biggest force. Zoom! 🚀', replies: [] },
      { id: 'mo-c3', name: 'Viktor S.', days: 19, likes: 3, text: 'Does the first law also apply in space?',
        replies: [
          { id: 'mo-c3a', name: 'Leo M.', days: 18, likes: 4, text: 'Especially in space! No friction, so things keep going pretty much forever.' },
        ] },
    ],
  });

  addCommunity('communication', {
    enrolled: 47835,
    ratings: [3120, 1240, 260, 70, 41],
    reviews: [
      { id: 'co-r1', name: 'Rachel A.', stars: 5, days: 1, helpful: 64, text: 'I used the “say no and be likable” lesson on my manager this week. It worked, and nobody was upset. Life-changing.' },
      { id: 'co-r2', name: 'David N.', stars: 5, days: 4, helpful: 39, text: 'Thirteen bite-sized lessons I actually finished. Hearing the example phrases out loud is what makes it stick.' },
      { id: 'co-r3', name: 'Keiko M.', stars: 5, days: 7, helpful: 28, text: 'As an introvert, “Speak up in any room” was exactly what I needed. Mara’s tone is calm and never preachy.' },
      { id: 'co-r4', name: 'Patrick H.', stars: 4, days: 12, helpful: 19, text: 'Body language and listening lessons are excellent. Some tips are familiar if you’ve read the usual books, but the practice makes the difference.' },
      { id: 'co-r5', name: 'Lena F.', stars: 4, days: 20, helpful: 12, text: 'Calling nerves “excitement” sounds silly but I tried it before a presentation and it genuinely helped.' },
      { id: 'co-r6', name: 'Omar S.', stars: 5, days: 26, helpful: 9, text: 'Give tough feedback fast: I wish every team lead did this course. Sharing it with mine.' },
      { id: 'co-r7', name: 'Beth C.', stars: 3, days: 37, helpful: 6, text: 'Useful, but I’d like more role-play style practice rather than just quizzes.' },
      { id: 'co-r8', name: 'Andrés L.', stars: 5, days: 55, helpful: 4, text: 'The name trick from lesson one: I haven’t forgotten a single name at networking events since.' },
    ],
    comments: [
      { id: 'co-c1', name: 'Michelle T.', days: 0, likes: 21, text: 'Which lesson would you start with if you have a hard conversation coming up tomorrow?',
        replies: [
          { id: 'co-c1a', lecturer: true, days: 0, likes: 26, text: 'Go straight to “Defuse any conflict”, then “Listen like a leader”. Take a breath before you start, and lead with what you both want. You’ve got this.' },
          { id: 'co-c1b', name: 'Rachel A.', days: 0, likes: 5, text: 'Good luck! Listening first and repeating back what they said saved me last month.' },
        ] },
      { id: 'co-c2', name: 'Stefan G.', days: 3, likes: 13, text: 'Tip: replay the voice examples and copy the falling tone at the end. Recording yourself on your phone shows the difference instantly.', replies: [] },
      { id: 'co-c3', name: 'Yara B.', days: 8, likes: 9, text: 'Interrupt smoothly is my favourite lesson. I never knew there was a polite way to do it!', replies: [] },
      { id: 'co-c4', name: 'Hugo D.', days: 15, likes: 4, text: 'Are there more lessons on presenting to large groups planned?',
        replies: [
          { id: 'co-c4a', lecturer: true, days: 14, likes: 8, text: 'Yes: a public speaking unit is in the works. Storytelling secrets is a good warm-up meanwhile.' },
        ] },
      { id: 'co-c5', name: 'Nina R.', days: 30, likes: 2, text: 'Finished all 13! The certificate is going on my LinkedIn.', replies: [] },
    ],
  });

  addCommunity('fractions', {
    enrolled: 9874,
    ratings: [421, 192, 52, 14, 6],
    reviews: [
      { id: 'fr-r1', name: 'Michael R.', stars: 5, days: 2, helpful: 24, text: 'Pizza fractions! My daughter finally understands why 3/8 is less than 1/2. She cut real pizza at dinner to prove it.' },
      { id: 'fr-r2', name: 'Olga Z.', stars: 5, days: 9, helpful: 13, text: 'I teach adult numeracy and use this as a warm-up. Visual, friendly and no judgement.' },
      { id: 'fr-r3', name: 'Paul W.', stars: 4, days: 17, helpful: 8, text: 'Good fun. Speed Match is addictive, though I’d like decimals and percentages next.' },
      { id: 'fr-r4', name: 'Samira H.', stars: 4, days: 28, helpful: 5, text: 'Simple and clear. Kai makes it feel like a game instead of homework.' },
      { id: 'fr-r5', name: 'Jack T.', stars: 3, days: 44, helpful: 2, text: 'Nicely done but very basic. Fine as a refresher.' },
    ],
    comments: [
      { id: 'fr-c1', name: 'Carmen L.', days: 2, likes: 9, text: 'How do you compare 2/3 and 3/5 without pizza? 😅',
        replies: [
          { id: 'fr-c1a', lecturer: true, days: 2, likes: 12, text: 'Cross-multiply! 2 × 5 = 10 and 3 × 3 = 9. 10 is bigger, so 2/3 wins. Next unit covers it properly.' },
        ] },
      { id: 'fr-c2', name: 'Dmitri V.', days: 12, likes: 4, text: 'Beat my Speed Match best three times today. Who’s faster? 🏁',
        replies: [
          { id: 'fr-c2a', name: 'Paul W.', days: 11, likes: 2, text: 'Challenge accepted.' },
        ] },
      { id: 'fr-c3', name: 'Anouk B.', days: 26, likes: 3, text: 'Great for kids too, my 8-year-old did the whole lesson.', replies: [] },
    ],
  });

  addCommunity('atoms', {
    enrolled: 11408,
    ratings: [540, 260, 64, 16, 7],
    reviews: [
      { id: 'at-r1', name: 'Isaac F.', stars: 5, days: 4, helpful: 22, text: 'The atom builder is fantastic. Add a proton and watch the element change. Chemistry suddenly feels like Lego.' },
      { id: 'at-r2', name: 'Maya D.', stars: 5, days: 10, helpful: 14, text: '“Tiny, and mostly empty” blew my mind. A football stadium with a marble in the middle!' },
      { id: 'at-r3', name: 'Tobias K.', stars: 4, days: 19, helpful: 9, text: 'Accurate and well paced. One lesson so far, but it’s a very good one.' },
      { id: 'at-r4', name: 'Lucy P.', stars: 4, days: 31, helpful: 5, text: 'Great for revising for GCSE chemistry. The quiz caught me out on neutron charge, oops.' },
      { id: 'at-r5', name: 'Hiro A.', stars: 5, days: 48, helpful: 3, text: 'Did it twice for Fact or Fiction. Learned more the second time.' },
    ],
    comments: [
      { id: 'at-c1', name: 'Freya J.', days: 3, likes: 11, text: 'If atoms are mostly empty, why can’t I put my hand through the table?',
        replies: [
          { id: 'at-c1a', lecturer: true, days: 3, likes: 18, text: 'The electrons in your hand and in the table repel each other very strongly, so they never really touch. You feel that push as “solid”.' },
        ] },
      { id: 'at-c2', name: 'Kofi M.', days: 14, likes: 5, text: 'Tip: in the builder, the number of protons is the element. Neutrons only change the isotope.', replies: [] },
      { id: 'at-c3', name: 'Sofia R.', days: 22, likes: 3, text: 'Periodic table lesson next? 🙏', replies: [] },
    ],
  });

  addCommunity('notes', {
    enrolled: 14522,
    ratings: [690, 330, 92, 24, 11],
    reviews: [
      { id: 'no-r1', name: 'Charlotte V.', stars: 5, days: 2, helpful: 31, text: 'I’ve played piano by ear for years and never read music. Being able to tap the note and hear it on the staff is perfect.' },
      { id: 'no-r2', name: 'Diego S.', stars: 5, days: 6, helpful: 17, text: '“Every Good Boy Does Fine” and “FACE” plus the playable keys. I can read a simple melody now.' },
      { id: 'no-r3', name: 'Ella N.', stars: 4, days: 15, helpful: 11, text: 'Very calm and encouraging. The ear-training quiz is hard but in a good way.' },
      { id: 'no-r4', name: 'Marcus J.', stars: 4, days: 24, helpful: 6, text: 'Good start for beginners. Bass clef next, please!' },
      { id: 'no-r5', name: 'Wen L.', stars: 3, days: 39, helpful: 3, text: 'Sound didn’t work until I turned off silent mode on my iPhone. Fine after that.' },
    ],
    comments: [
      { id: 'no-c1', name: 'Rebecca A.', days: 2, likes: 12, text: 'Any tips for telling E and G apart quickly on the lines?',
        replies: [
          { id: 'no-c1a', lecturer: true, days: 2, likes: 15, text: 'Count up from the bottom line: E, G, B, D, F. Say the rhyme slowly while you point. After a week it becomes automatic. Take it easy on yourself.' },
        ] },
      { id: 'no-c2', name: 'Pavel C.', days: 9, likes: 6, text: 'If you hear nothing on iPhone, flip the silent switch off. Took me a while to figure that out!',
        replies: [
          { id: 'no-c2a', name: 'Wen L.', days: 9, likes: 3, text: 'Same here, thanks!' },
        ] },
      { id: 'no-c3', name: 'Alice G.', days: 20, likes: 4, text: 'I play the notes on my real keyboard alongside the lesson. Highly recommend.', replies: [] },
    ],
  });

  addCommunity('italian', {
    enrolled: 21690,
    ratings: [1180, 470, 98, 22, 10],
    reviews: [
      { id: 'it-r1', name: 'Giulia F.', stars: 5, days: 1, helpful: 35, text: 'Ordered “un cappuccino, per favore” in Rome last week thanks to the café lesson. The barista smiled!' },
      { id: 'it-r2', name: 'Henry W.', stars: 5, days: 5, helpful: 23, text: 'Buongiorno, buonasera, buonanotte with the sun moving across the sky. I’ll never mix them up again.' },
      { id: 'it-r3', name: 'Martina L.', stars: 4, days: 11, helpful: 14, text: 'Lovely, unhurried style. Tu vs Lei explained better than in my evening class.' },
      { id: 'it-r4', name: 'Raj P.', stars: 4, days: 18, helpful: 9, text: 'Three lessons, all good. The spoken audio is the highlight, I repeat every phrase.' },
      { id: 'it-r5', name: 'Emily S.', stars: 5, days: 33, helpful: 5, text: 'Planning our honeymoon in Tuscany and we do a lesson together every evening. Molto bene!' },
      { id: 'it-r6', name: 'Frank O.', stars: 3, days: 50, helpful: 2, text: 'Nice, but I’d like more grammar. Good for travel basics.' },
    ],
    comments: [
      { id: 'it-c1', name: 'Beatrice M.', days: 1, likes: 13, text: 'When exactly do you switch from buongiorno to buonasera?',
        replies: [
          { id: 'it-c1a', lecturer: true, days: 1, likes: 19, text: 'Usually after lunch, from mid-afternoon. It varies by region, so listen to what people say to you and copy them.' },
          { id: 'it-c1b', name: 'Giulia F.', days: 1, likes: 4, text: 'In Naples my nonna says buonasera from about 2pm 😄' },
        ] },
      { id: 'it-c2', name: 'Connor D.', days: 6, likes: 7, text: 'Tip: “un caffè” in Italy means an espresso. Don’t expect a big mug!', replies: [] },
      { id: 'it-c3', name: 'Anika S.', days: 16, likes: 5, text: 'Is there a lesson on numbers and prices coming?',
        replies: [
          { id: 'it-c3a', lecturer: true, days: 15, likes: 9, text: 'Yes, it’s the next one we’re writing. Perfect timing for paying at the café.' },
        ] },
    ],
  });
})();
