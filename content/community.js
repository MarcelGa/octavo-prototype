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

  // ---- 2. ročník ZŠ (Slovak primary school). Reviews mostly from parents, sometimes with the child.

  addCommunity('mat2-do20', {
    enrolled: 3412,
    ratings: [212, 74, 15, 3, 2],
    reviews: [
      { id: 'm2a-r1', name: 'Katarína M.', stars: 5, days: 2, helpful: 31, text: 'Dcéra mala s prechodom cez desiatku veľký problém. Krabičky s guličkami jej to konečne ukázali: najprv naplniť desiatku, potom zvyšok. Za týždeň počíta 8 + 5 spamäti.' },
      { id: 'm2a-r2', name: 'Tomáš B.', stars: 5, days: 5, helpful: 19, text: 'Kamaráti čísla 10 na kartičkách sú super. Syn si ich púšťa nahlas a opakuje po nich.' },
      { id: 'm2a-r3', name: 'Zuzana K.', stars: 4, days: 9, helpful: 12, text: 'Krátke lekcie, akurát na desať minút po škole. Odčítanie s prechodom by mohlo mať ešte jeden príklad navyše.' },
      { id: 'm2a-r4', name: 'Martin H.', stars: 5, days: 14, helpful: 8, text: 'Pán učiteľ vysvetľuje pokojne a rovnako, ako to robia v škole. Číselná os so skokmi pomohla viac než pracovný zošit.' },
      { id: 'm2a-r5', name: 'Lucia a Emka', stars: 5, days: 21, helpful: 6, text: 'Emka (7): Najviac ma bavila hra po lekcii, nakŕmila som Otta všetkými príkladmi!' },
      { id: 'm2a-r6', name: 'Peter D.', stars: 3, days: 37, helpful: 4, text: 'Dobré, ale slovné úlohy by som privítal ťažšie. Na zopakovanie základov však výborné.' },
    ],
    comments: [
      { id: 'm2a-c1', name: 'Jana S.', days: 1, likes: 11, text: 'Učia v škole aj iný spôsob, napríklad 8 + 5 = 5 + 5 + 3? Syn je z toho zmätený.',
        replies: [
          { id: 'm2a-c1a', lecturer: true, days: 1, likes: 17, text: 'Aj to je správne. V lekcii používame dopĺňanie do desiatky, lebo ho väčšina učebníc pre 2. ročník učí ako hlavný postup. Keď syn vie kamarátov čísla 10, zvládne oba spôsoby.' },
        ] },
      { id: 'm2a-c2', name: 'Michaela P.', days: 4, likes: 8, text: 'Tip: kreslíme si s dcérou krabičky na desať guličiek aj do zošita. Pri písomke ich už nepotrebovala.', replies: [] },
      { id: 'm2a-c3', name: 'Roman V.', days: 10, likes: 5, text: 'Bude aj násobenie?',
        replies: [
          { id: 'm2a-c3a', lecturer: true, days: 9, likes: 9, text: 'Násobilka patrí do 3. ročníka. V 2. ročníku sa pripravujeme rovnakými sčítancami, napríklad 2 + 2 + 2, a tie v kurze sú.' },
        ] },
    ],
  });

  addCommunity('mat2-cisla100', {
    enrolled: 2870,
    ratings: [176, 61, 12, 3, 1],
    reviews: [
      { id: 'm2b-r1', name: 'Andrea T.', stars: 5, days: 3, helpful: 22, text: 'Tyčky a kocky sú presne to, čo používajú v škole. Syn konečne chápe, prečo je v čísle 34 trojka „viac“ ako štvorka.' },
      { id: 'm2b-r2', name: 'Jozef R.', stars: 5, days: 8, helpful: 15, text: 'Hladný krokodíl zabral! Dcéra už nepomýli znaky väčší a menší.' },
      { id: 'm2b-r3', name: 'Monika L.', stars: 4, days: 12, helpful: 9, text: 'Pekné a krátke. Pri číselnej osi by som pridala ešte jedno cvičenie na doplnenie čísel.' },
      { id: 'm2b-r4', name: 'Viera a Samko', stars: 5, days: 19, helpful: 6, text: 'Samko (8): Kartičky s číslami som si púšťal stále dokola, aj „sto“.' },
      { id: 'm2b-r5', name: 'Pavol K.', stars: 3, days: 30, helpful: 3, text: 'Obsahovo v poriadku, ale pre nás to bolo trochu ľahké. Na zopakovanie dobré.' },
    ],
    comments: [
      { id: 'm2b-c1', name: 'Lenka M.', days: 2, likes: 9, text: 'Aký je rozdiel medzi číslom a číslicou? Syn to v škole stále mieša.',
        replies: [
          { id: 'm2b-c1a', lecturer: true, days: 2, likes: 14, text: 'Číslice sú znaky 0 až 9, ako písmená. Číslo je z nich zložené, ako slovo. Číslo 34 je napísané dvoma číslicami.' },
        ] },
      { id: 'm2b-c2', name: 'Erika D.', days: 6, likes: 7, text: 'Tip: skáčeme s dcérou po desiatich po schodoch v paneláku. Pri 100 sme hore.', replies: [] },
      { id: 'm2b-c3', name: 'Marek F.', days: 15, likes: 4, text: 'Pomohlo nám porovnávať najprv desiatky. Na písomke mal syn všetko správne.', replies: [] },
    ],
  });

  addCommunity('mat2-pocitanie100', {
    enrolled: 3955,
    ratings: [241, 88, 19, 4, 3],
    reviews: [
      { id: 'm2c-r1', name: 'Silvia P.', stars: 5, days: 1, helpful: 34, text: 'Písomné sčítanie s „1 si pamätám“ krok za krokom. Presne tak, ako to učí pani učiteľka. Konečne doma žiadne slzy.' },
      { id: 'm2c-r2', name: 'Róbert Š.', stars: 5, days: 4, helpful: 21, text: 'Odčítanie dopočítavaním („7 a koľko je 13“) som sám nevedel vysvetliť. Tu to je jasne aj s obrázkom.' },
      { id: 'm2c-r3', name: 'Ivana N.', stars: 4, days: 10, helpful: 13, text: 'Skúška správnosti je super nápad, syn si teraz overuje aj domáce úlohy. Slovné úlohy by mohli byť dlhšie.' },
      { id: 'm2c-r4', name: 'Daniela H.', stars: 5, days: 16, helpful: 8, text: 'Číselná os pri prechode cez desiatku pomohla viac než hocijaké vysvetľovanie.' },
      { id: 'm2c-r5', name: 'Ľubo a Kika', stars: 5, days: 22, helpful: 5, text: 'Kika (7): Najradšej mám okienka. Je to ako hádanka.' },
      { id: 'm2c-r6', name: 'Tibor G.', stars: 3, days: 41, helpful: 2, text: 'Dobré, len by som privítal viac príkladov na precvičenie v každej lekcii.' },
    ],
    comments: [
      { id: 'm2c-c1', name: 'Alena V.', days: 1, likes: 16, text: 'V škole odčítavajú písomne „požičiavaním“, tu dopočítavaním. Ktoré je správne?',
        replies: [
          { id: 'm2c-c1a', lecturer: true, days: 1, likes: 21, text: 'Obe vedú k rovnakému výsledku. Väčšina slovenských učebníc pre 2. ročník používa dopočítavanie, ale ak pani učiteľka učí inak, držte sa jej postupu, nech to dieťa nemätie.' },
          { id: 'm2c-c1b', name: 'Silvia P.', days: 0, likes: 3, text: 'U nás učia dopočítavanie, presne ako v lekcii.' },
        ] },
      { id: 'm2c-c2', name: 'Norbert K.', days: 7, likes: 8, text: 'Tip: pri písomnom počítaní nech si dieťa podfarbí stĺpec jednotiek. Menej chýb s podpisovaním pod seba.', replies: [] },
      { id: 'm2c-c3', name: 'Jarka B.', days: 13, likes: 5, text: 'Bude aj sčítanie troch čísel pod sebou?',
        replies: [
          { id: 'm2c-c3a', lecturer: true, days: 12, likes: 7, text: 'Zložené úlohy s tromi číslami sú v poslednej lekcii, počítame ich po krokoch. Pod sebou tri čísla pridáme v ďalšej verzii.' },
        ] },
    ],
  });

  addCommunity('mat2-geometria', {
    enrolled: 2214,
    ratings: [131, 52, 13, 2, 1],
    reviews: [
      { id: 'm2d-r1', name: 'Marcela J.', stars: 5, days: 2, helpful: 19, text: 'Priamka, polpriamka a úsečka na jednom obrázku s ťukaním na čísla. Dcéra to pochopila za päť minút.' },
      { id: 'm2d-r2', name: 'Stanislav O.', stars: 4, days: 9, helpful: 11, text: 'Meranie od nuly je dôležité, syn stále začínal od jednotky. Dobre, že je to aj v kvíze.' },
      { id: 'm2d-r3', name: 'Barbora C.', stars: 5, days: 14, helpful: 7, text: 'Palec, stopa a lakeť nás bavili, merali sme potom celý byt nohami.' },
      { id: 'm2d-r4', name: 'Hana a Matúš', stars: 5, days: 20, helpful: 5, text: 'Matúš (8): Schody z kociek som postavil z lega.' },
      { id: 'm2d-r5', name: 'Ondrej Z.', stars: 3, days: 36, helpful: 2, text: 'Fajn, ale chýba mi rysovanie, to sa na mobile asi ťažko robí.' },
    ],
    comments: [
      { id: 'm2d-c1', name: 'Gabriela S.', days: 3, likes: 10, text: 'Prečo sa vrcholy označujú proti smeru hodinových ručičiek?',
        replies: [
          { id: 'm2d-c1a', lecturer: true, days: 3, likes: 12, text: 'Je to dohoda, aby sme všetci písali rovnako a rozumeli si. Neskôr sa to v geometrii hodí, v 2. ročníku stačí vedieť, že vrcholy majú veľké písmená.' },
        ] },
      { id: 'm2d-c2', name: 'Patrik M.', days: 8, likes: 6, text: 'Tip: na štvorcovú sieť používame obyčajný zošit z matematiky. Vzor nakreslím ja, obraz syn.', replies: [] },
      { id: 'm2d-c3', name: 'Zdenka R.', days: 18, likes: 3, text: 'Hodila by sa aj lekcia o kruhu a guli.', replies: [] },
    ],
  });

  addCommunity('mat2-logika', {
    enrolled: 2541,
    ratings: [158, 57, 14, 3, 2],
    reviews: [
      { id: 'm2e-r1', name: 'Jana K.', stars: 5, days: 2, helpful: 27, text: 'Hodiny boli u nás najväčší problém. „Štvrť na osem“ a „pol ôsmej“ so štyrmi ciferníkmi vedľa seba to vyriešili.' },
      { id: 'm2e-r2', name: 'Michal Ď.', stars: 5, days: 6, helpful: 14, text: 'Hra na obchod z lekcie o eurách sa u nás ujala. Syn sám počíta vydávku.' },
      { id: 'm2e-r3', name: 'Natália F.', stars: 4, days: 13, helpful: 8, text: 'Šesť spôsobov ako uložiť kocky bolo pre dcéru prekvapenie. Sudoku by bolo fajn doplniť.' },
      { id: 'm2e-r4', name: 'Eva a Lucka', stars: 5, days: 21, helpful: 4, text: 'Lucka (7): Postupnosti s tvarmi sú ako hádanky, chcem ich viac!' },
      { id: 'm2e-r5', name: 'Karol P.', stars: 4, days: 34, helpful: 3, text: 'Pekne spracované, len tabuľka by mohla byť interaktívna.' },
    ],
    comments: [
      { id: 'm2e-c1', name: 'Dominika L.', days: 1, likes: 12, text: 'Prečo sa hovorí „pol ôsmej“, keď je 7:30? Dcéra to nechápe.',
        replies: [
          { id: 'm2e-c1a', lecturer: true, days: 1, likes: 18, text: 'Hovoríme, koľko z ôsmej hodiny už prešlo: polovica. Pomáha ukázať to na ciferníku, kde krátka ručička už ide k osmičke.' },
        ] },
      { id: 'm2e-c2', name: 'Branislav H.', days: 9, likes: 6, text: 'Tip: dajte dieťaťu na týždeň ručičkové hodinky. Za pár dní vie čas lepšie ako z ktorejkoľvek lekcie.', replies: [] },
      { id: 'm2e-c3', name: 'Simona T.', days: 17, likes: 4, text: 'Budú aj sudoku a magické štvorce?',
        replies: [
          { id: 'm2e-c3a', lecturer: true, days: 16, likes: 6, text: 'Áno, patria do osnovy 2. ročníka. Pripravujeme ich ako interaktívne cvičenie.' },
        ] },
    ],
  });

  addCommunity('sk2-hlasky', {
    enrolled: 3120,
    ratings: [198, 70, 14, 3, 2],
    reviews: [
      { id: 's2a-r1', name: 'Veronika S.', stars: 5, days: 2, helpful: 25, text: 'Konečne syn chápe, prečo má chata 4 hlásky a 5 písmen. Kartičky s uchom a ceruzkou sú geniálne jednoduché.' },
      { id: 's2a-r2', name: 'Igor P.', stars: 5, days: 7, helpful: 14, text: 'Abecedu s ch za h sme doma riešili týždeň. Tu to bolo jasné za päť minút.' },
      { id: 's2a-r3', name: 'Lucia M.', stars: 4, days: 12, helpful: 9, text: 'Koza a koža, rad a rád: dcéra sa smiala a pritom si to zapamätala. Hlas na kartičkách je trochu robotický.' },
      { id: 's2a-r4', name: 'Kristína a Timko', stars: 5, days: 19, helpful: 5, text: 'Timko (7): Najviac sa mi páčila abeceda, keď sa písmenká objavovali.' },
      { id: 's2a-r5', name: 'Rastislav B.', stars: 3, days: 33, helpful: 2, text: 'Fajn na zopakovanie, ale chcelo by to viac cvičení na abecedné poradie.' },
    ],
    comments: [
      { id: 's2a-c1', name: 'Martina H.', days: 2, likes: 10, text: 'Je ie v slove mlieko jedna hláska alebo dve?',
        replies: [
          { id: 's2a-c1a', lecturer: true, days: 2, likes: 15, text: 'Jedna! ie je dvojhláska, vyslovíme ju naraz. Podobne ako ch: dve písmená, jedna hláska. Viac o tom je v kurze Samohlásky a dvojhlásky.' },
        ] },
      { id: 's2a-c2', name: 'Peter Ž.', days: 8, likes: 6, text: 'Tip: zoraďujeme s dcérou podľa abecedy mená spolužiakov z triedy. Baví ju to.', replies: [] },
      { id: 's2a-c3', name: 'Zuzka V.', days: 15, likes: 4, text: 'Ďakujeme, pri diktáte už nezabúda na mäkčene!', replies: [] },
    ],
  });

  addCommunity('sk2-samohlasky', {
    enrolled: 2688,
    ratings: [162, 58, 12, 2, 1],
    reviews: [
      { id: 's2b-r1', name: 'Alžbeta K.', stars: 5, days: 3, helpful: 18, text: 'Vila a víla, pas a pás: syn si konečne všíma dĺžne. Výborné, že si slová môže vypočuť.' },
      { id: 's2b-r2', name: 'Miroslav T.', stars: 5, days: 9, helpful: 11, text: 'Pravidlo b, m, p, v pre ä je krátke a zapamätateľné. Presne toto sme potrebovali.' },
      { id: 's2b-r3', name: 'Soňa D.', stars: 4, days: 14, helpful: 7, text: 'Pri jahode a iahode si dcéra dlho nebola istá, kartička so začiatkom slova jej pomohla.' },
      { id: 's2b-r4', name: 'Juraj a Ela', stars: 5, days: 22, helpful: 4, text: 'Ela (8): Memory s bábätkom a mäsom bolo super!' },
      { id: 's2b-r5', name: 'Anna R.', stars: 4, days: 30, helpful: 3, text: 'Pekné a stručné. Privítala by som viac slov s dvojhláskou ô.' },
    ],
    comments: [
      { id: 's2b-c1', name: 'Oľga F.', days: 3, likes: 9, text: 'Má sa ä vyslovovať ako e? V škole to učia inak.',
        replies: [
          { id: 's2b-c1a', lecturer: true, days: 3, likes: 13, text: 'Obe výslovnosti sa používajú, väčšina ľudí hovorí e. Dôležité je vedieť, kde ä píšeme: po b, m, p, v.' },
        ] },
      { id: 's2b-c2', name: 'Branislav L.', days: 10, likes: 5, text: 'Tip: dĺžne vytlieskavame. Pri dlhej samohláske tlesknutie podržíme dlhšie.', replies: [] },
      { id: 's2b-c3', name: 'Tamara N.', days: 18, likes: 3, text: 'Ďakujeme za jasné vysvetlenie ja, je, ju na začiatku slova.', replies: [] },
    ],
  });

  addCommunity('sk2-spoluhlasky', {
    enrolled: 4210,
    ratings: [262, 91, 21, 5, 3],
    reviews: [
      { id: 's2c-r1', name: 'Gabriela M.', stars: 5, days: 1, helpful: 38, text: 'Tvrdé a mäkké spoluhlásky sme doma nevedeli vysvetliť. Farebné kartičky (zelené mäkké, oranžové tvrdé) syn pochopil hneď.' },
      { id: 's2c-r2', name: 'Ľubomír H.', stars: 5, days: 5, helpful: 22, text: 'De, te, ne, le s [ďeťi] na obrázku. Dcéra teraz pri diktáte nepíše mäkčene tam, kde nemajú byť.' },
      { id: 's2c-r3', name: 'Jana P.', stars: 4, days: 11, helpful: 13, text: 'Kino, kimono a lyžica: výnimky sú dobre vybraté. Chýbal mi len zoznam všetkých slov s ly.' },
      { id: 's2c-r4', name: 'Tomáš V.', stars: 5, days: 16, helpful: 8, text: 'Oceňujem, že obojaké spoluhlásky len predstavíte a vybrané slová necháte na tretiu triedu. Presne podľa osnov.' },
      { id: 's2c-r5', name: 'Mária a Adamko', stars: 5, days: 24, helpful: 5, text: 'Adamko (8): Kikirikí je výnimka! To si budem pamätať.' },
      { id: 's2c-r6', name: 'Peter O.', stars: 3, days: 39, helpful: 2, text: 'Dobré, ale pri každej lekcii by sa hodil krátky diktát.' },
    ],
    comments: [
      { id: 's2c-c1', name: 'Dana K.', days: 2, likes: 15, text: 'Prečo píšeme lipa s i, keď l je tvrdá?',
        replies: [
          { id: 's2c-c1a', lecturer: true, days: 2, likes: 22, text: 'Lebo l v slove lipa čítame mäkko [ľipa]. To je pravidlo de, te, ne, le, li: pred i ich čítame mäkko a píšeme i. S tvrdým l a y píšeme len pár slov ako lyko, mlyn, lyžica.' },
          { id: 's2c-c1b', name: 'Gabriela M.', days: 1, likes: 4, text: 'Aha, toto som ani ja nevedela takto pekne vysvetliť.' },
        ] },
      { id: 's2c-c2', name: 'Róbert S.', days: 9, likes: 7, text: 'Tip: mäkké spoluhlásky si synovi lepíme na chladničku, tvrdé na skriňu.', replies: [] },
      { id: 's2c-c3', name: 'Lenka B.', days: 17, likes: 5, text: 'Kedy pribudnú vybrané slová?',
        replies: [
          { id: 's2c-c3a', lecturer: true, days: 16, likes: 8, text: 'Vybrané slová sú v osnove 3. ročníka. Pripravujeme pre ne samostatnú sériu.' },
        ] },
    ],
  });

  addCommunity('sk2-slabiky', {
    enrolled: 2105,
    ratings: [128, 47, 10, 2, 1],
    reviews: [
      { id: 's2d-r1', name: 'Eva G.', stars: 5, days: 4, helpful: 16, text: 'Tlieskanie slabík je najlepší spôsob. Syn tlieska aj pri večeri.' },
      { id: 's2d-r2', name: 'Martin L.', stars: 5, days: 10, helpful: 9, text: 'Pravidlá delenia na konci riadka na kartičkách, aj s tým, čo je nesprávne. Veľmi praktické.' },
      { id: 's2d-r3', name: 'Simona K.', stars: 4, days: 15, helpful: 6, text: 'Mlie-ko a pia-tok som sama robila zle. Dobré aj pre rodičov.' },
      { id: 's2d-r4', name: 'Roman a Lea', stars: 5, days: 25, helpful: 3, text: 'Lea (7): Ko-lo-bež-ka má štyri tlesknutia!' },
      { id: 's2d-r5', name: 'Hana Š.', stars: 3, days: 40, helpful: 2, text: 'Krátky kurz, mohol by mať ešte jednu lekciu na precvičovanie.' },
    ],
    comments: [
      { id: 's2d-c1', name: 'Pavla R.', days: 3, likes: 8, text: 'Ako je to so slovom vlk, keď nemá samohlásku?',
        replies: [
          { id: 's2d-c1a', lecturer: true, days: 3, likes: 11, text: 'V slovách ako vlk, krk či prst tvorí slabiku r alebo l. Sú to jednoslabičné slová, takže ich na konci riadka nedelíme.' },
        ] },
      { id: 's2d-c2', name: 'Ján M.', days: 11, likes: 4, text: 'Tip: dlhé slová delíme s dcérou skákaním po kachličkách v kúpeľni.', replies: [] },
      { id: 's2d-c3', name: 'Ivana T.', days: 20, likes: 2, text: 'Super, presne ako v škole.', replies: [] },
    ],
  });

  addCommunity('sk2-vety', {
    enrolled: 2944,
    ratings: [170, 66, 15, 3, 2],
    reviews: [
      { id: 's2e-r1', name: 'Petra N.', stars: 5, days: 2, helpful: 21, text: 'Prší. Prší? Prší! Jeden obrázok a dcéra pochopila, prečo záleží na znamienku.' },
      { id: 's2e-r2', name: 'Michal B.', stars: 4, days: 8, helpful: 12, text: 'Päť druhov viet s ukážkou melódie. Želacia a zvolacia sú ťažké, ale tu sú dobre vysvetlené.' },
      { id: 's2e-r3', name: 'Zdenka P.', stars: 5, days: 13, helpful: 8, text: 'Skladanie viet zo slov baví syna najviac. Chceme viac!' },
      { id: 's2e-r4', name: 'Ondrej a Sofia', stars: 5, days: 20, helpful: 4, text: 'Sofia (8): Môj pes sa volá Rex a píše sa s veľkým R!' },
      { id: 's2e-r5', name: 'Katarína J.', stars: 4, days: 35, helpful: 3, text: 'Dobré. Pri veľkých písmenách by som pridala aj ulice.' },
    ],
    comments: [
      { id: 's2e-c1', name: 'Andrej K.', days: 2, likes: 9, text: 'Píše sa za rozkazovacou vetou výkričník alebo bodka?',
        replies: [
          { id: 's2e-c1a', lecturer: true, days: 2, likes: 14, text: 'Môže byť oboje. Výkričník, keď to hovoríme dôrazne (Zatvor okno!), bodka, keď pokojne (Podaj mi, prosím, pero.).' },
        ] },
      { id: 's2e-c2', name: 'Silvia Č.', days: 9, likes: 5, text: 'Tip: čítajte si vety nahlas s rôznou melódiou. Deti rýchlo počujú rozdiel.', replies: [] },
      { id: 's2e-c3', name: 'Viktor D.', days: 19, likes: 3, text: 'Neúplné vety sú super nápad na hru v aute.', replies: [] },
    ],
  });

  addCommunity('sk2-sloh', {
    enrolled: 1876,
    ratings: [104, 44, 11, 2, 1],
    reviews: [
      { id: 's2f-r1', name: 'Dagmar L.', stars: 5, days: 3, helpful: 14, text: 'Syn napísal babke blahoželanie presne podľa lekcie: oslovenie, želanie, podpis. Babka plakala od radosti.' },
      { id: 's2f-r2', name: 'Pavol Č.', stars: 4, days: 9, helpful: 9, text: 'Obálka s adresou je super. Poslali sme skutočný list kamarátovi.' },
      { id: 's2f-r3', name: 'Renáta H.', stars: 5, days: 16, helpful: 6, text: 'Tykanie a vykanie s kartičkami. Dcéra už pani susede nevraví „ahoj“.' },
      { id: 's2f-r4', name: 'Milan a Vierka', stars: 4, days: 28, helpful: 3, text: 'Vierka (8): Slnečnica bola krajšia ako moja v záhrade.' },
      { id: 's2f-r5', name: 'Adriana F.', stars: 3, days: 42, helpful: 1, text: 'Fajn, ale písanie sa ťažko precvičuje na mobile. Doplnili sme zošitom.' },
    ],
    comments: [
      { id: 's2f-c1', name: 'Erika S.', days: 4, likes: 7, text: 'Píše sa za oslovením v liste čiarka alebo výkričník?',
        replies: [
          { id: 's2f-c1a', lecturer: true, days: 4, likes: 10, text: 'V 2. ročníku sa učí čiarka (Milý Paľko,) a text pokračuje malým písmenom na ďalšom riadku.' },
        ] },
      { id: 's2f-c2', name: 'Tibor M.', days: 12, likes: 4, text: 'Tip: rozprávajte príbeh podľa vlastných fotiek z výletu. Úvod, jadro a záver príde samo.', replies: [] },
      { id: 's2f-c3', name: 'Natália V.', days: 21, likes: 2, text: 'Ďakujeme, adresu už syn vie napísať sám.', replies: [] },
    ],
  });

  addCommunity('sk2-citanie', {
    enrolled: 3390,
    ratings: [205, 73, 16, 3, 2],
    reviews: [
      { id: 's2g-r1', name: 'Ľubica R.', stars: 5, days: 1, helpful: 27, text: 'Báseň o zajkovi s farebnými rýmami. Dcéra ju vie naspamäť a recitovala ju v škole.' },
      { id: 's2g-r2', name: 'Vladimír K.', stars: 5, days: 6, helpful: 15, text: 'Čítanie s porozumením s otázkami kto, kde, kedy. Presne toto robia na písomkách.' },
      { id: 's2g-r3', name: 'Monika Z.', stars: 4, days: 12, helpful: 9, text: 'Rozprávka o lakomom mlynárovi je krátka a s pekným ponaučením. Viac takých!' },
      { id: 's2g-r4', name: 'Patrik a Nelka', stars: 5, days: 18, helpful: 5, text: 'Nelka (7): Uhádla som všetky hádanky!' },
      { id: 's2g-r5', name: 'Jozefína B.', stars: 4, days: 31, helpful: 3, text: 'Pekné. Zoznam kníh od slovenských autorov by sa hodil ako tip na čítanie.' },
      { id: 's2g-r6', name: 'Marek T.', stars: 3, days: 44, helpful: 1, text: 'Texty sú krátke, pre lepších čitateľov by mohli byť dlhšie.' },
    ],
    comments: [
      { id: 's2g-c1', name: 'Zuzana Ď.', days: 2, likes: 12, text: 'Čo by ste odporučili druhákovi na čítanie?',
        replies: [
          { id: 's2g-c1a', lecturer: true, days: 2, likes: 19, text: 'Krátke rozprávky od Dobšinského, Danku a Janku od Márie Ďuríčkovej alebo Osmijanka od Kristy Bendovej. A detský časopis, napríklad Včielku.' },
        ] },
      { id: 's2g-c2', name: 'Igor N.', days: 7, likes: 6, text: 'Tip: po prečítaní rozprávky nech dieťa nakreslí ilustráciu. Ukáže sa, čo pochopilo.', replies: [] },
      { id: 's2g-c3', name: 'Beáta L.', days: 15, likes: 4, text: 'Bábkové divadlo z lekcie sme si doma vyrobili z ponožky. Veľký úspech!', replies: [] },
    ],
  });

  addCommunity('prv2-rastliny', {
    enrolled: 2380,
    ratings: [148, 52, 11, 2, 1],
    reviews: [
      { id: 'p2a-r1', name: 'Klára V.', stars: 5, days: 2, helpful: 19, text: 'Po lekcii o klíčení sme si dali fazuľu na mokrú vatu. Syn každé ráno kontroluje korienok.' },
      { id: 'p2a-r2', name: 'Dušan M.', stars: 5, days: 7, helpful: 11, text: 'Ťukanie na slnko, vodu a pôdu na obrázku dcéru bavilo. Päť vecí na život vie naspamäť.' },
      { id: 'p2a-r3', name: 'Lenka Š.', stars: 4, days: 13, helpful: 7, text: 'Semená, ktoré cestujú vetrom a zvieratami, boli pre nás novinka. Fotky skutočných rastlín by boli ešte lepšie.' },
      { id: 'p2a-r4', name: 'Vlado a Mia', stars: 5, days: 20, helpful: 4, text: 'Mia (7): Fúkala som do púpavy, ako v lekcii!' },
      { id: 'p2a-r5', name: 'Iveta K.', stars: 3, days: 35, helpful: 2, text: 'Pekné, ale krátke. Na test z prvouky sme si pridali ešte pracovný zošit.' },
    ],
    comments: [
      { id: 'p2a-c1', name: 'Marta B.', days: 3, likes: 8, text: 'Potrebuje semeno na klíčenie aj svetlo?',
        replies: [
          { id: 'p2a-c1a', lecturer: true, days: 3, likes: 12, text: 'Na klíčenie nie, stačí voda, vzduch a teplo. Svetlo potrebuje až mladá rastlinka, keď jej narastú lístky. Môžete to vyskúšať: jedna fazuľa v skrinke, druhá na okne.' },
        ] },
      { id: 'p2a-c2', name: 'Roman F.', days: 9, likes: 5, text: 'Tip: na prechádzke zbierajte s deťmi semená a skúšajte, ktoré poletia.', replies: [] },
      { id: 'p2a-c3', name: 'Elena P.', days: 18, likes: 3, text: 'Ďakujem za upozornenie na jedovaté plody, dôležité.', replies: [] },
    ],
  });

  addCommunity('prv2-zivocichy', {
    enrolled: 2615,
    ratings: [166, 55, 12, 2, 1],
    reviews: [
      { id: 'p2b-r1', name: 'Natália G.', stars: 5, days: 1, helpful: 21, text: 'Kruh vývinu žaby sa dcére tak páčil, že ho nakreslila do zošita. Mláďatá zvierat vie všetky.' },
      { id: 'p2b-r2', name: 'Štefan R.', stars: 5, days: 6, helpful: 12, text: 'Včelia rodina s matkou, trúdmi a robotnicami vysvetlená jednoducho. Syn chce byť včelár.' },
      { id: 'p2b-r3', name: 'Adela T.', stars: 4, days: 12, helpful: 8, text: 'Bylinožravce, mäsožravce, všežravce: pekne s príkladmi. Kartičky s mláďatami sú super.' },
      { id: 'p2b-r4', name: 'Juraj a Bibi', stars: 5, days: 19, helpful: 3, text: 'Bibi (8): Žriebä! To som nevedela.' },
      { id: 'p2b-r5', name: 'Miroslava H.', stars: 4, days: 31, helpful: 2, text: 'Dobré. Privítali by sme aj lesné zvieratá.' },
    ],
    comments: [
      { id: 'p2b-c1', name: 'Ondrej L.', days: 2, likes: 9, text: 'Je človek naozaj všežravec?',
        replies: [
          { id: 'p2b-c1a', lecturer: true, days: 2, likes: 13, text: 'Áno, jeme rastlinnú aj živočíšnu potravu. Aj ľudia, ktorí nejedia mäso, môžu, takže z pohľadu prírody sme všežravce.' },
        ] },
      { id: 'p2b-c2', name: 'Ivona S.', days: 8, likes: 6, text: 'Tip: navštívte s deťmi včelára alebo včelí náučný chodník. Veľký zážitok.', replies: [] },
      { id: 'p2b-c3', name: 'Matej K.', days: 16, likes: 3, text: 'Mravenisko sme pozorovali v lese, deti boli nadšené.', replies: [] },
    ],
  });

  addCommunity('prv2-telo', {
    enrolled: 2290,
    ratings: [141, 49, 10, 2, 1],
    reviews: [
      { id: 'p2c-r1', name: 'Daniela R.', stars: 5, days: 3, helpful: 17, text: 'Kostra s ťukaním na lebku a rebrá. Syn teraz ukazuje stehennú kosť každému návštevníkovi.' },
      { id: 'p2c-r2', name: 'Pavol J.', stars: 5, days: 8, helpful: 10, text: 'Lekcia o zlomenine prišla vhod, kamarát mal sadru a dcéra už vedela, čo sa deje.' },
      { id: 'p2c-r3', name: 'Viera M.', stars: 4, days: 14, helpful: 6, text: 'Svaly sťahujú kosti: chytiť si sval na ruke je skvelý nápad. Mohla by byť aj lekcia o zuboch.' },
      { id: 'p2c-r4', name: 'Rudo a Tobiáš', stars: 5, days: 22, helpful: 3, text: 'Tobiáš (8): Srdce je sval a bije aj v noci!' },
      { id: 'p2c-r5', name: 'Hana L.', stars: 3, days: 38, helpful: 1, text: 'Obrázok kostry je dosť jednoduchý, ale na druhákov stačí.' },
    ],
    comments: [
      { id: 'p2c-c1', name: 'Tereza N.', days: 2, likes: 8, text: 'Koľko kostí majú deti? Počula som, že viac ako dospelí.',
        replies: [
          { id: 'p2c-c1a', lecturer: true, days: 2, likes: 14, text: 'Áno, bábätká majú viac kostí. Niektoré z nich počas rastu zrastú dohromady, a tak má dospelý asi 206.' },
        ] },
      { id: 'p2c-c2', name: 'Boris P.', days: 10, likes: 4, text: 'Tip: robíme s deťmi ranné rozcvičky, presne ako v lekcii o svaloch.', replies: [] },
      { id: 'p2c-c3', name: 'Jarmila D.', days: 20, likes: 2, text: 'Čísla 155 a 112 si deti zapamätali vďaka kartičkám. Ďakujeme.', replies: [] },
    ],
  });

  addCommunity('prv2-neziva', {
    enrolled: 1984,
    ratings: [119, 45, 10, 2, 1],
    reviews: [
      { id: 'p2d-r1', name: 'Simona B.', stars: 5, days: 2, helpful: 16, text: 'Pokusy s cukrom a pieskom sme hneď robili v kuchyni. Najlepšia lekcia prvouky.' },
      { id: 'p2d-r2', name: 'Marián K.', stars: 5, days: 9, helpful: 9, text: 'Odparovanie slanej vody na tanieri na parapete: po troch dňoch kryštáliky soli. Syn bol nadšený.' },
      { id: 'p2d-r3', name: 'Oľga V.', stars: 4, days: 15, helpful: 5, text: 'Vrstvy pôdy aj s dážďovkou. Dobre vysvetlený humus.' },
      { id: 'p2d-r4', name: 'Peter a Ninka', stars: 5, days: 23, helpful: 3, text: 'Ninka (7): Robila som filter z kávového papiera!' },
      { id: 'p2d-r5', name: 'Gejza T.', stars: 3, days: 40, helpful: 1, text: 'Fajn, ale chýba mi vzduch a počasie, je to v názve.' },
    ],
    comments: [
      { id: 'p2d-c1', name: 'Andrea Z.', days: 3, likes: 10, text: 'Prečo filter nezachytí soľ?',
        replies: [
          { id: 'p2d-c1a', lecturer: true, days: 3, likes: 13, text: 'Rozpustená soľ je rozdelená na také maličké čiastočky, že prejdú dierkami vo filtri spolu s vodou. Piesok má zrnká veľké, tie filter zachytí.' },
        ] },
      { id: 'p2d-c2', name: 'Kamil S.', days: 11, likes: 5, text: 'Tip: pohár so zeminou a vodou nechajte cez noc. Ráno uvidíte krásne vrstvy.', replies: [] },
      { id: 'p2d-c3', name: 'Lucia R.', days: 19, likes: 2, text: 'Konečne prvouka, ktorá deti baví!', replies: [] },
    ],
  });

  addCommunity('prv2-spolocnost', {
    enrolled: 2750,
    ratings: [170, 60, 13, 3, 1],
    reviews: [
      { id: 'p2e-r1', name: 'Mária H.', stars: 5, days: 1, helpful: 23, text: 'Vľavo, vpravo, vľavo si syn opakuje pri každom prechode. Lekcia o ceste do školy je výborná.' },
      { id: 'p2e-r2', name: 'Jozef Č.', stars: 5, days: 5, helpful: 14, text: 'Tiesňové čísla s nácvikom, čo povedať do telefónu. Toto by mali vedieť všetky deti.' },
      { id: 'p2e-r3', name: 'Kristína L.', stars: 4, days: 11, helpful: 8, text: 'Kalendár s ročnými obdobiami a sviatkami je prehľadný. Dcéra sa naučila mesiace za týždeň.' },
      { id: 'p2e-r4', name: 'Anton a Paťka', stars: 5, days: 18, helpful: 4, text: 'Paťka (8): Viem nakresliť štátny znak aj s dvojkrížom.' },
      { id: 'p2e-r5', name: 'Eva J.', stars: 4, days: 29, helpful: 3, text: 'Pekné. Krajina s bodmi na ťukanie je fajn, len by mohla byť väčšia.' },
      { id: 'p2e-r6', name: 'Igor B.', stars: 3, days: 44, helpful: 1, text: 'Obsahovo dobré, ale pre nás trochu ľahké.' },
    ],
    comments: [
      { id: 'p2e-c1', name: 'Zuzana M.', days: 2, likes: 11, text: 'Je správne vlajka alebo zástava?',
        replies: [
          { id: 'p2e-c1a', lecturer: true, days: 2, likes: 16, text: 'Ústava hovorí o štátnej vlajke. Zástava je vlajka pripevnená na žrdi, preto hovoríme aj o vztyčovaní zástavy. V škole sa stretnete s oboma slovami.' },
        ] },
      { id: 'p2e-c2', name: 'Radovan T.', days: 7, likes: 7, text: 'Tip: prejdite si s dieťaťom cestu do školy a nechajte ho, nech vás vedie. Uvidíte, čo si zapamätalo.', replies: [] },
      { id: 'p2e-c3', name: 'Silvia K.', days: 14, likes: 4, text: 'Vďaka za lekciu o tiesňových číslach. Syn už vie aj našu adresu.', replies: [] },
    ],
  });

  addCommunity('huv2-rytmus', {
    enrolled: 1760,
    ratings: [106, 40, 9, 2, 1],
    reviews: [
      { id: 'h2a-r1', name: 'Romana P.', stars: 5, days: 2, helpful: 15, text: 'Ta a ti-ti s tlačidlami, ktoré rytmus zahrajú. Dcéra tlieska celý večer.' },
      { id: 'h2a-r2', name: 'Branislav G.', stars: 5, days: 8, helpful: 9, text: 'Riekanka Dup, dup, dup je chytľavá. Hráme ju na tele aj v aute.' },
      { id: 'h2a-r3', name: 'Lívia N.', stars: 4, days: 14, helpful: 5, text: 'Takt na dve a na tri si syn konečne vypočul, nielen prečítal. Dobrý nápad s vysokým tónom na raz.' },
      { id: 'h2a-r4', name: 'Matúš a Ella', stars: 5, days: 21, helpful: 3, text: 'Ella (7): Najradšej mám ti-ti, je rýchle!' },
      { id: 'h2a-r5', name: 'Iveta R.', stars: 3, days: 37, helpful: 1, text: 'Pekné, ale skutočný nástroj by tón zahral krajšie.' },
    ],
    comments: [
      { id: 'h2a-c1', name: 'Jana B.', days: 3, likes: 7, text: 'Učia v škole aj „tai-ti“?',
        replies: [
          { id: 'h2a-c1a', lecturer: true, days: 3, likes: 10, text: 'Bodka za štvrťovou notou (tai-ti) je v osnove 2. ročníka tiež, ale až po upevnení ta a ti-ti. Pridáme ju ako ďalšiu lekciu.' },
        ] },
      { id: 'h2a-c2', name: 'Karol V.', days: 9, likes: 4, text: 'Tip: vyťukávajte rytmus mien členov rodiny. Ma-ma je ti-ti, Ján je ta.', replies: [] },
      { id: 'h2a-c3', name: 'Sabína D.', days: 17, likes: 2, text: 'Dcéra si pri pochode počíta raz-dva. Ďakujeme!', replies: [] },
    ],
  });

  addCommunity('huv2-zvuk', {
    enrolled: 1530,
    ratings: [92, 36, 8, 2, 1],
    reviews: [
      { id: 'h2b-r1', name: 'Miriam S.', stars: 5, days: 3, helpful: 13, text: 'Tá istá melódia pomaly, rýchlo, slabo a silno. Deti rozdiel počujú hneď.' },
      { id: 'h2b-r2', name: 'Patrik O.', stars: 5, days: 9, helpful: 8, text: 'So-mi ako kukučka a „ma-ma“. Syn spieva so-mi, keď ma volá z izby.' },
      { id: 'h2b-r3', name: 'Dana Č.', stars: 4, days: 16, helpful: 5, text: 'Dvojhlas z dvoch melódií naraz je super ukážka. Uvítala by som aj skutočné nahrávky zboru.' },
      { id: 'h2b-r4', name: 'Fero a Kubko', stars: 5, days: 24, helpful: 2, text: 'Kubko (8): Korytnačka je pomaly a zajac rýchlo!' },
      { id: 'h2b-r5', name: 'Alena H.', stars: 3, days: 41, helpful: 1, text: 'Zvuk je trochu umelý, ale na pochopenie postačí.' },
    ],
    comments: [
      { id: 'h2b-c1', name: 'Vanda K.', days: 4, likes: 6, text: 'Prečo sa forte a piano píšu po taliansky?',
        replies: [
          { id: 'h2b-c1a', lecturer: true, days: 4, likes: 9, text: 'Hudobné značky pochádzajú z Talianska a používajú sa na celom svete. Hudobník z Japonska aj zo Slovenska tak rozumie tým istým značkám.' },
        ] },
      { id: 'h2b-c2', name: 'Eduard M.', days: 12, likes: 3, text: 'Tip: pri počúvaní rádia sa s deťmi hrajte na „rýchlo alebo pomaly“.', replies: [] },
      { id: 'h2b-c3', name: 'Ľudmila Z.', days: 22, likes: 2, text: 'Pekne spracované, ďakujeme.', replies: [] },
    ],
  });

  addCommunity('huv2-nastroje', {
    enrolled: 1640,
    ratings: [99, 38, 9, 2, 1],
    reviews: [
      { id: 'h2c-r1', name: 'Petronela V.', stars: 5, days: 2, helpful: 14, text: 'Xylofón s tlačidlami do-re-mi. Dcéra si sama zahrala so-mi, so-mi a bola na seba hrdá.' },
      { id: 'h2c-r2', name: 'Michal R.', stars: 4, days: 10, helpful: 7, text: 'Predohra, medzihra a dohra: konečne viem synovi vysvetliť, prečo pri pesničke najprv nespievajú.' },
      { id: 'h2c-r3', name: 'Zdena K.', stars: 5, days: 15, helpful: 5, text: 'Pohyb s hudbou je presne pre živé deti. Behali sme po obývačke na ti-ti.' },
      { id: 'h2c-r4', name: 'Robo a Sára', stars: 5, days: 23, helpful: 2, text: 'Sára (7): Triangel zvoní najkrajšie.' },
      { id: 'h2c-r5', name: 'Gabriela F.', stars: 3, days: 39, helpful: 1, text: 'Bubon znie skôr ako bzučiak, ale deti to nevadí.' },
    ],
    comments: [
      { id: 'h2c-c1', name: 'Tatiana L.', days: 3, likes: 6, text: 'Prečo sa im hovorí Orffove nástroje?',
        replies: [
          { id: 'h2c-c1a', lecturer: true, days: 3, likes: 9, text: 'Podľa nemeckého skladateľa Carla Orffa, ktorý ich navrhol, aby na nich mohli hrať aj deti bez dlhého učenia.' },
        ] },
      { id: 'h2c-c2', name: 'Vojtech B.', days: 11, likes: 3, text: 'Tip: hrnce a varechy z kuchyne sú výborné rytmické nástroje.', replies: [] },
      { id: 'h2c-c3', name: 'Renáta S.', days: 20, likes: 2, text: 'Syn chce na Vianoce xylofón. Ďakujeme za inšpiráciu!', replies: [] },
    ],
  });
})();
