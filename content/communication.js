'use strict';

/* Communication · Communicate with confidence (13 lessons). */
(() => {
  const T = 'font-family="Nunito, sans-serif" font-weight="800"';
  const BLUE = '#0090C1';
  const INK = '#1E1A3C';

  // A simple standing person. pose: 'open' (arms out, palms visible) or 'closed' (arms crossed).
  function person(x, y, color, pose = 'open') {
    const head = `<circle cx="${x}" cy="${y}" r="15" fill="${color}"/>`;
    const body = `<path d="M${x - 20} ${y + 82} V${y + 38} a20 18 0 0 1 40 0 V${y + 82} Z" fill="${color}"/>`;
    const arms = pose === 'open'
      ? `<g fill="none" stroke="${color}" stroke-width="9" stroke-linecap="round"><path d="M${x - 18} ${y + 32} L${x - 44} ${y + 54}"/><path d="M${x + 18} ${y + 32} L${x + 44} ${y + 54}"/></g>
         <circle cx="${x - 46}" cy="${y + 57}" r="6" fill="#FFD9C9"/><circle cx="${x + 46}" cy="${y + 57}" r="6" fill="#FFD9C9"/>`
      : `<g fill="none" stroke="${INK}" stroke-opacity="0.35" stroke-width="9" stroke-linecap="round"><path d="M${x - 22} ${y + 44} L${x + 22} ${y + 56}"/><path d="M${x + 22} ${y + 44} L${x - 22} ${y + 56}"/></g>`;
    return head + body + arms;
  }

  const FIRST = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Two people meet. A stopwatch between them shows 0.1 seconds, and a thought bubble with a tick pops up above one of them.">
    ${person(70, 60, BLUE)}
    ${person(250, 60, '#FF7A59')}
    <circle cx="160" cy="110" r="34" fill="#FFFFFF" stroke="${INK}" stroke-width="4"/>
    <path d="M152 72 h16" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <path class="a-spin" style="transform-origin: 160px 110px" d="M160 110 V86" stroke="#FF7A59" stroke-width="4" stroke-linecap="round"/>
    <text x="160" y="168" text-anchor="middle" ${T} font-size="16" fill="${INK}">0.1 s</text>
    <g class="a-pop" style="animation-delay: 0.6s; transform-box: fill-box; transform-origin: center">
      <circle cx="250" cy="22" r="16" fill="#E0F4E8" stroke="#1F8A4C" stroke-width="2"/>
      <path d="M243 22 l5 5 l9 -10" fill="none" stroke="#1F8A4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>`;

  const VOICE = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Two pitch lines. A statement whose pitch falls at the end sounds sure. A statement whose pitch rises at the end sounds like a question.">
    <text x="16" y="34" ${T} font-size="13" fill="#1F8A4C">Falling: sounds sure</text>
    <path d="M16 70 C 60 50, 100 80, 150 62 S 240 70, 300 92" fill="none" stroke="#1F8A4C" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 6" class="a-flow"/>
    <path d="M292 82 L302 94 L288 98" fill="none" stroke="#1F8A4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="16" y="128" ${T} font-size="13" fill="#C2412A">Rising: sounds like a question?</text>
    <path d="M16 176 C 60 160, 100 184, 150 168 S 240 170, 300 138" fill="none" stroke="#C2412A" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 6" class="a-flow"/>
    <path d="M288 136 L302 136 L298 150" fill="none" stroke="#C2412A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

  const SPEAK = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A meeting timeline from 0 to 60 minutes. A speech bubble pops up in the first five minutes, marked as the easiest time to speak.">
    <path d="M30 150 H290" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <rect x="30" y="140" width="34" height="20" rx="4" fill="#1F8A4C" opacity="0.25"/>
    <g ${T} font-size="12" fill="#4A4566" text-anchor="middle"><text x="30" y="182">0</text><text x="64" y="182">5</text><text x="160" y="182">30</text><text x="290" y="182">60 min</text></g>
    <g class="a-say1">
      <path d="M30 60 h120 a12 12 0 0 1 12 12 v24 a12 12 0 0 1 -12 12 h-90 l-14 22 l-2 -22 h-14 a12 12 0 0 1 -12 -12 v-24 a12 12 0 0 1 12 -12 z" fill="${BLUE}"/>
      <text x="90" y="91" text-anchor="middle" ${T} font-size="14" fill="#FFFFFF">Can I add one thing?</text>
    </g>
    <text x="236" y="96" text-anchor="middle" ${T} font-size="12" fill="#C2412A">harder the longer you wait</text>
    <path d="M190 136 Q 240 132 280 112" fill="none" stroke="#C2412A" stroke-width="3" stroke-linecap="round"/>
  </svg>`;

  const STORY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="A story arc. It starts flat at the situation, climbs through the challenge to a peak, then comes down to the result.">
    <path class="ap-curve" pathLength="100" d="M20 160 C 70 160, 90 150, 120 120 S 180 40, 210 40 S 260 120, 300 140" fill="none" stroke="${BLUE}" stroke-width="5" stroke-linecap="round"/>
    <g ${T} font-size="12" text-anchor="middle">
      <g class="ap-note" style="--d: 0.3s"><circle cx="40" cy="160" r="7" fill="#FF7A59"/><text x="44" y="186" fill="${INK}">Situation</text></g>
      <g class="ap-note" style="--d: 1s"><circle cx="128" cy="112" r="7" fill="#FF7A59"/><text x="110" y="100" fill="${INK}">Challenge</text></g>
      <g class="ap-note" style="--d: 1.6s"><circle cx="210" cy="40" r="7" fill="#FF7A59"/><text x="210" y="26" fill="${INK}">Action</text></g>
      <g class="ap-note" style="--d: 2.2s"><circle cx="296" cy="139" r="7" fill="#FF7A59"/><text x="280" y="170" fill="${INK}">Result</text></g>
    </g>
  </svg>`;

  const BODY = `
  <svg viewBox="0 0 320 200" role="img" aria-label="Two people side by side. On the left, arms crossed: reads as closed. On the right, arms open with palms visible: reads as open.">
    ${person(90, 40, '#8C87A8', 'closed')}
    ${person(230, 40, BLUE, 'open')}
    <text x="90" y="160" text-anchor="middle" ${T} font-size="14" fill="#C2412A">Closed</text>
    <text x="230" y="160" text-anchor="middle" ${T} font-size="14" fill="#1F8A4C">Open</text>
    <text x="90" y="180" text-anchor="middle" ${T} font-size="11" fill="#4A4566">reads as defensive</text>
    <text x="230" y="180" text-anchor="middle" ${T} font-size="11" fill="#4A4566">reads as approachable</text>
  </svg>`;

  const LISTEN = `
  <svg viewBox="0 0 320 200" role="img" aria-label="One person talks while the other listens, then the listener replies with a summary: So the main issue is the deadline?">
    ${person(70, 76, '#FF7A59')}
    ${person(250, 76, BLUE)}
    <g class="a-say1">
      <rect x="20" y="12" width="140" height="40" rx="14" fill="#FFE9E2"/>
      <text x="90" y="37" text-anchor="middle" ${T} font-size="12" fill="#9A3A1F">…and then the deadline moved</text>
    </g>
    <g class="a-say2">
      <rect x="160" y="12" width="150" height="40" rx="14" fill="#E1F3FA"/>
      <text x="235" y="37" text-anchor="middle" ${T} font-size="12" fill="#00668A">So the main issue is time?</text>
    </g>
  </svg>`;

  const en = (text, note) => ({ es: text, en: note, lang: 'en-US' });

  window.Octavo.addCourse({
    id: 'communication',
    subject: 'Communication',
    audience: 'adult',
    lecturer: 'mara',
    title: 'Communicate with confidence',
    blurb: 'Make great first impressions, speak up, tell stories and handle tough conversations.',
    artBg: '#F1F9FC',
    units: [
      {
        title: 'Make a strong start',
        lessons: [
          {
            id: 'comm-first-impression',
            title: 'First impression hacks',
            minutes: 15,
            slides: [
              {
                title: 'A tenth of a second',
                art: FIRST,
                text: '<p>People start judging whether you seem trustworthy and capable within about <b>a tenth of a second</b> of seeing your face. More time mostly makes them more sure of that first guess.</p><p>You can’t skip the snap judgement, but you can shape it.</p>',
              },
              {
                title: 'Warmth first, then competence',
                text: '<p>When we meet someone, we quietly ask two questions: <b>Are they friendly?</b> and <b>Are they capable?</b></p><p>Warmth is judged first and counts for more. Lead with warmth (a smile, their name, real interest), then let your competence show.</p>',
              },
              {
                title: 'The first few seconds',
                points: [
                  'Arrive a little early, so you aren’t rushed and flustered.',
                  'Make eye contact and smile <b>as</b> you say hello, not after.',
                  'Say your name clearly, and use theirs.',
                  'Stand or sit tall with your hands visible.',
                ],
              },
              {
                title: 'The name trick',
                text: '<p>Forgetting a name is the fastest way to undo a good start. Try this:</p>',
                points: [
                  'Repeat it as you greet them: “Nice to meet you, <b>Ana</b>.”',
                  'Link it to something: Ana from Accounting.',
                  'Use it once more when you say goodbye.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Which quality do people judge first when they meet you?',
                options: ['Warmth', 'Competence', 'Status', 'Intelligence'], answer: 'Warmth',
                explain: '<b>Warmth</b> is judged first and weighs the most. Competence comes second.', hint: 'think “are they friendly?” before “are they capable?”.' },
              { type: 'tf', prompt: 'True or false?', statement: 'If people look at your face for longer, their first impression usually changes completely.', answer: false,
                explain: '<b>False.</b> Extra time mostly makes people more confident in the snap judgement they already made.', hint: 'remember what more time does to the first guess.' },
              { type: 'order', prompt: 'Put the name trick in order.',
                items: ['Hear their name', 'Repeat it as you greet them', 'Link it to something', 'Use it again when you say goodbye'],
                explain: 'Hear it, repeat it, link it, then use it again at the end.', hint: 'it starts with hearing the name and ends with goodbye.' },
              { type: 'choice', prompt: 'When should you smile and make eye contact?',
                options: ['As you say hello', 'After you’ve finished talking', 'Only if they smile first', 'When you leave'], answer: 'As you say hello',
                explain: 'Smile and make eye contact <b>as you say hello</b>, so the warmth lands in the first seconds.', hint: 'the first few seconds matter most.' },
            ],
          },
          {
            id: 'comm-voice',
            title: 'Build trust with your voice',
            minutes: 11,
            slides: [
              {
                title: 'How it ends matters',
                art: VOICE,
                text: '<p>Listeners judge how sure you are from <b>how</b> you sound. When pitch <b>rises</b> at the end of a statement, it sounds like a question. Let your statements <b>fall</b> at the end.</p>',
              },
              {
                title: 'Hear the difference',
                phrases: [
                  en('I think we could maybe launch on Friday?', 'Hedged and rising: sounds unsure'),
                  en('We can launch on Friday.', 'Direct and falling: sounds sure'),
                ],
                text: '<p>Tap the speaker to hear each line. The second one says the same thing with half the words and twice the trust.</p>',
              },
              {
                title: 'Pace and pause',
                text: '<p>Nerves speed us up. Slow down a little, and use a <b>one-second pause</b> before your key point: it grabs attention and makes you sound certain.</p><p>When you feel an “um” coming, pause instead. Silence sounds more confident than filler.</p>',
              },
              {
                title: 'Recap',
                points: [
                  'End statements with falling pitch.',
                  'Cut hedges like “maybe” and “I just think”.',
                  'Slow down and pause before key points.',
                  'Replace “um” with a short silence.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Which pitch at the end of a statement sounds most confident?',
                options: ['Falling', 'Rising', 'Whispering', 'Speeding up'], answer: 'Falling',
                explain: '<b>Falling</b> pitch marks a statement. Rising pitch makes it sound like a question.', hint: 'which line sounded sure?' },
              { type: 'tf', prompt: 'True or false?', statement: 'A short pause before a key point makes you sound less sure.', answer: false,
                explain: '<b>False.</b> A pause grabs attention and makes you sound certain.', hint: 'think about what silence does to a key point.' },
              { type: 'choice', prompt: 'Which version builds the most trust?',
                options: ['We can launch on Friday.', 'I mean, we could maybe launch Friday?', 'Um, so, like, Friday?', 'Friday, I guess, if that’s okay?'], answer: 'We can launch on Friday.',
                explain: '<b>“We can launch on Friday.”</b> is direct, with no hedges or filler.', hint: 'pick the one with no hedges at all.' },
              { type: 'choice', prompt: 'What should you use instead of filler words like “um”?',
                options: ['A short silence', 'A cough', 'The word “basically”', 'Talking faster'], answer: 'A short silence',
                explain: 'A <b>short silence</b> sounds calm and confident.', hint: 'the answer is saying nothing at all.' },
            ],
          },
          {
            id: 'comm-confidence',
            title: 'Confidence wins',
            minutes: 10,
            slides: [
              {
                title: 'Confidence is a skill',
                text: '<p>Confidence isn’t a personality type you’re born with. It grows each time you do something a little outside your comfort zone and find you can handle it.</p><p>Do the thing, survive it, repeat. Confidence follows.</p>',
              },
              {
                title: 'Call it excitement',
                text: '<p>A racing heart and butterflies feel the same whether you’re nervous or excited. Trying to “calm down” rarely works.</p><p>Telling yourself <b>“I’m excited”</b> instead has been shown to help people perform better in talks and tests.</p>',
              },
              {
                title: 'Drop the shrinking words',
                phrases: [
                  en('Quick question:', 'Instead of “Sorry, this might be a dumb question, but…”'),
                  en('I recommend we test it first.', 'Instead of “I just maybe think we could…”'),
                  en('What questions do you have?', 'Instead of “Does that make sense?”'),
                ],
              },
              {
                title: 'Prepare to feel ready',
                points: [
                  'Know your first sentence by heart.',
                  'Rehearse out loud, not just in your head.',
                  'Picture the first minute going well.',
                  'Focus on helping your audience, not on how you look.',
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Your heart is racing before a big talk. What helps most?',
                options: ['Tell yourself “I’m excited”', 'Tell yourself to calm down', 'Skip rehearsing', 'Apologise to the audience first'], answer: 'Tell yourself “I’m excited”',
                explain: 'Reframing nerves as <b>excitement</b> helps people perform better than trying to calm down.', hint: 'nerves and excitement feel the same in your body.' },
              { type: 'choice', prompt: 'Which opener sounds most confident?',
                options: ['I recommend we test it first.', 'Sorry, this is probably dumb, but…', 'I just maybe think…', 'I’m not an expert, but…'], answer: 'I recommend we test it first.',
                explain: '<b>“I recommend…”</b> states your view without shrinking it.', hint: 'avoid apologies and “just”.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Confidence is a fixed trait: you either have it or you don’t.', answer: false,
                explain: '<b>False.</b> Confidence is a skill that grows with practice.', hint: 'look at the first slide’s title.' },
              { type: 'order', prompt: 'Put the preparation steps in order.',
                items: ['Write your key message', 'Learn your first sentence by heart', 'Rehearse out loud', 'Deliver it'],
                explain: 'Decide the message, nail the opening, rehearse out loud, then deliver.', hint: 'you can’t learn the first sentence before you know the message.' },
            ],
          },
          {
            id: 'comm-speak-up',
            title: 'Speak up in any room',
            minutes: 10,
            slides: [
              {
                title: 'Speak early',
                art: SPEAK,
                text: '<p>The longer you stay quiet, the harder it gets to start. Aim to say something in the <b>first five minutes</b>: a question, or building on someone else’s point. After that, speaking again feels easy.</p>',
              },
              {
                title: 'Easy ways in',
                phrases: [
                  en('Building on what Sam said…', 'Connects your idea to the conversation'),
                  en('Can I add one thing?', 'A polite way to take the floor'),
                  en('One question before we move on:', 'Gets in before the topic closes'),
                ],
              },
              {
                title: 'Make your point land: PREP',
                points: [
                  '<b>Point:</b> say your idea in one sentence.',
                  '<b>Reason:</b> why it matters.',
                  '<b>Example:</b> one concrete case or number.',
                  '<b>Point:</b> repeat your idea to close.',
                ],
              },
              {
                title: 'If someone talks over you',
                text: '<p>Stay calm and keep your volume steady. Say <b>“I’d like to finish my thought”</b>, then finish it. Most people stop, and everyone notices you held your ground politely.</p>',
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'What does PREP stand for?',
                options: ['Point, Reason, Example, Point', 'Plan, Rehearse, Explain, Present', 'Pause, Reflect, Engage, Proceed', 'Prepare, Repeat, Explain, Pitch'], answer: 'Point, Reason, Example, Point',
                explain: '<b>Point, Reason, Example, Point.</b> Start and finish with your idea.', hint: 'it starts and ends with the same word.' },
              { type: 'order', prompt: 'Put a PREP answer in order.',
                items: ['Point', 'Reason', 'Example', 'Point again'],
                explain: 'Point, reason, example, then the point again.', hint: 'the reason comes before the example.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Waiting until the end of a meeting usually makes it easier to speak up.', answer: false,
                explain: '<b>False.</b> It gets harder the longer you wait. Speak in the first five minutes.', hint: 'look at the meeting timeline again.' },
              { type: 'choice', prompt: 'Someone talks over you mid-point. What’s the best response?',
                options: ['“I’d like to finish my thought.”', 'Stop and stay quiet', 'Talk louder over them', 'Leave the meeting'], answer: '“I’d like to finish my thought.”',
                explain: 'Calmly say <b>“I’d like to finish my thought”</b> and carry on.', hint: 'stay calm, polite and firm.' },
            ],
          },
        ],
      },
      {
        title: 'Connect and persuade',
        lessons: [
          {
            id: 'comm-storytelling',
            title: 'Storytelling secrets',
            minutes: 13,
            slides: [
              {
                title: 'Stories stick',
                art: STORY,
                replay: 'Replay',
                autoplay: true,
                text: '<p>People forget lists of facts but remember stories, because stories give facts a reason to matter. Most good stories follow the same shape.</p>',
              },
              {
                title: 'The story shape',
                points: [
                  '<b>Situation:</b> where, when and who.',
                  '<b>Challenge:</b> what went wrong or what was at stake.',
                  '<b>Action:</b> what you (or the hero) did.',
                  '<b>Result:</b> what changed, and what you learned.',
                ],
              },
              {
                title: 'Start in the action',
                phrases: [
                  en('Two hours before launch, our server died.', 'Strong: drops us straight into the challenge'),
                  en('So, I work at a company that makes software, and…', 'Weak: background nobody asked for'),
                ],
                text: '<p>Skip the long warm-up. Open close to the challenge and fill in background only if it’s needed.</p>',
              },
              {
                title: 'Make it vivid',
                points: [
                  'Add one specific detail people can see or hear.',
                  'Use a real line of dialogue.',
                  'Pause just before the twist.',
                  'Keep it under two minutes.',
                ],
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Put the story shape in order.',
                items: ['Situation', 'Challenge', 'Action', 'Result'],
                explain: 'Situation, challenge, action, result.', hint: 'the problem comes before what you did about it.' },
              { type: 'choice', prompt: 'Which is the strongest opening line?',
                options: ['Two hours before launch, our server died.', 'So, let me give you some background on our company…', 'This story isn’t very interesting, but…', 'Here are ten facts about servers.'], answer: 'Two hours before launch, our server died.',
                explain: 'It starts <b>in the action</b>, right at the challenge.', hint: 'start close to the problem.' },
              { type: 'tf', prompt: 'True or false?', statement: 'A good story usually needs a challenge or problem.', answer: true,
                explain: '<b>True.</b> The challenge is what makes people care how it ends.', hint: 'look at the peak of the story arc.' },
              { type: 'choice', prompt: 'Which detail makes a story most vivid?',
                options: ['The coffee was still steaming when the alarm went off.', 'It was a normal day.', 'Things happened.', 'Some stuff went wrong.'], answer: 'The coffee was still steaming when the alarm went off.',
                explain: 'A <b>specific detail</b> people can picture pulls them into the scene.', hint: 'pick the one you can actually picture.' },
            ],
          },
          {
            id: 'comm-body-language',
            title: 'Body language',
            minutes: 15,
            slides: [
              {
                title: 'Open or closed?',
                art: BODY,
                text: '<p>Crossed arms, a body turned away or a hidden face read as defensive, even if you’re only cold. An open posture with visible hands reads as approachable.</p>',
              },
              {
                title: 'The 7% myth',
                text: '<p>You may have heard that words are only 7% of a message. That number came from small lab studies of <b>single words</b> said in a mismatched tone, not everyday conversation.</p><p>Your words matter a lot. Body language matters most when it <b>contradicts</b> them.</p>',
              },
              {
                title: 'Signals that build trust',
                points: [
                  'Hold eye contact while listening; a little less while talking is fine.',
                  'Nod to show you’re following.',
                  'Keep gestures between waist and chest, hands visible.',
                  'Point your face and feet towards the person.',
                ],
              },
              {
                title: 'Match your message',
                text: '<p>When body and words disagree, like “I’m fine” said with a frown and crossed arms, people believe the body. Make them tell the same story.</p>',
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Which posture reads as most approachable?',
                options: ['Open arms with visible palms', 'Arms crossed', 'Hands in pockets, body turned away', 'Looking at your phone'], answer: 'Open arms with visible palms',
                explain: '<b>Open arms and visible palms</b> read as approachable.', hint: 'look at the person on the right of the picture.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Research shows only 7% of every message comes from your words.', answer: false,
                explain: '<b>False.</b> That figure came from studies of single words in a mismatched tone, not everyday conversation.', hint: 'it’s called the 7% myth for a reason.' },
              { type: 'choice', prompt: 'Someone says “I’m fine” with a frown and crossed arms. What do people tend to believe?',
                options: ['The body language', 'The words', 'Neither', 'Both equally'], answer: 'The body language',
                explain: 'When they disagree, people trust <b>the body</b> over the words.', hint: 'what wins when body and words don’t match?' },
              { type: 'choice', prompt: 'Where should your gestures mostly stay?',
                options: ['Between waist and chest', 'Above your head', 'Behind your back', 'In your pockets'], answer: 'Between waist and chest',
                explain: 'Gestures <b>between waist and chest</b> look natural and keep your hands visible.', hint: 'keep your hands where people can see them.' },
            ],
          },
          {
            id: 'comm-read-people',
            title: 'Read people like a pro',
            minutes: 15,
            slides: [
              {
                title: 'Look for clusters',
                text: '<p>One signal on its own means little: crossed arms might just mean the room is cold. Look for <b>three or more signals</b> pointing the same way before you read anything into them.</p>',
              },
              {
                title: 'Know their baseline',
                points: [
                  'Notice how someone acts when they’re relaxed: that’s their <b>baseline</b>.',
                  'Watch for <b>changes</b> from it when a topic comes up.',
                  'Read in context: the room, the moment, the culture.',
                  'Treat what you see as a question, not a verdict.',
                ],
              },
              {
                title: 'Common clusters',
                points: [
                  '<b>Engaged:</b> leaning in, nodding, eyes on you, feet towards you.',
                  '<b>Disengaged:</b> leaning back, glancing away or at the door, short answers.',
                  '<b>Stressed:</b> touching the neck or face, fidgeting, tight lips.',
                ],
              },
              {
                title: 'Check, don’t assume',
                phrases: [
                  en('You seem unsure. What’s on your mind?', 'Names what you see and invites them in'),
                  en('You went quiet there. Anything you’d like to add?', 'Gives a quiet person an easy opening'),
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'What is someone’s “baseline”?',
                options: ['How they normally act when relaxed', 'Their first impression of you', 'The lowest note of their voice', 'A rule of etiquette'], answer: 'How they normally act when relaxed',
                explain: 'Their <b>baseline</b> is how they act when relaxed, so you can spot changes.', hint: 'it’s what you compare changes against.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Crossed arms always mean someone is defensive.', answer: false,
                explain: '<b>False.</b> One signal means little. Look for clusters and changes from their baseline.', hint: 'they might just be cold.' },
              { type: 'choice', prompt: 'A colleague leans back, glances at the door and gives short answers. What’s most likely?',
                options: ['They’re disengaged', 'They’re very excited', 'They agree completely', 'They’re ready to sign'], answer: 'They’re disengaged',
                explain: 'That cluster usually means <b>disengaged</b>. Check by asking them.', hint: 'three signals all pointing away from you.' },
              { type: 'choice', prompt: 'You think someone is unsure. What’s the best next step?',
                options: ['Ask an open question', 'Tell them they look nervous', 'Ignore it', 'Talk faster'], answer: 'Ask an open question',
                explain: '<b>Ask</b>, for example “What’s on your mind?”, instead of assuming.', hint: 'check, don’t assume.' },
            ],
          },
        ],
      },
      {
        title: 'Handle tough conversations',
        lessons: [
          {
            id: 'comm-feedback',
            title: 'Give tough feedback fast',
            minutes: 17,
            slides: [
              {
                title: 'Use SBI',
                points: [
                  '<b>Situation:</b> when and where it happened.',
                  '<b>Behaviour:</b> what they did, as a camera would see it.',
                  '<b>Impact:</b> the effect it had on you, the team or the work.',
                ],
                text: '<p>SBI keeps feedback short, specific and fair.</p>',
              },
              {
                title: 'Behaviour, not character',
                phrases: [
                  en('You’re careless.', 'A label: they’ll defend themselves'),
                  en('In today’s report, three of the numbers were wrong.', 'Behaviour: specific and fixable'),
                ],
              },
              {
                title: 'Then ask, and agree',
                text: '<p>After SBI, stop talking and ask for their side: <b>“What happened from your point of view?”</b></p><p>Agree on one next step and when you’ll check in.</p>',
              },
              {
                title: 'Keep it fast',
                points: [
                  'Give it within a day or two, while it’s fresh.',
                  'Always in private.',
                  'One issue at a time.',
                  'Skip the “compliment sandwich”: it buries the message.',
                ],
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Put the feedback conversation in order.',
                items: ['Situation', 'Behaviour', 'Impact', 'Ask for their view'],
                explain: 'Situation, behaviour, impact, then ask for their side.', hint: 'SBI first, then listen.' },
              { type: 'choice', prompt: 'Which describes behaviour rather than a label?',
                options: ['You arrived 20 minutes late to today’s meeting.', 'You’re lazy.', 'You don’t care about the team.', 'You’re always late.'], answer: 'You arrived 20 minutes late to today’s meeting.',
                explain: 'It’s specific and observable, <b>as a camera would see it</b>.', hint: 'which one could a camera record?' },
              { type: 'tf', prompt: 'True or false?', statement: 'The compliment sandwich is the best way to make tough feedback clear.', answer: false,
                explain: '<b>False.</b> Wrapping it in praise buries the message.', hint: 'what happens to the filling?' },
              { type: 'choice', prompt: 'When and where should you give tough feedback?',
                options: ['Soon, in private', 'In front of the team', 'Months later, at the annual review', 'Only by email'], answer: 'Soon, in private',
                explain: '<b>Soon and in private</b>, while it’s fresh and without an audience.', hint: 'fast, and without an audience.' },
            ],
          },
          {
            id: 'comm-difficult-people',
            title: 'Handle difficult people smartly',
            minutes: 13,
            slides: [
              {
                title: 'Don’t take the bait',
                text: '<p>Difficult behaviour usually comes from <b>stress, fear or unmet needs</b>. Your goal isn’t to win the exchange; it’s to steer the conversation back to the problem.</p>',
              },
              {
                title: 'Pause, breathe, respond',
                points: [
                  'Notice your own reaction.',
                  'Take one slow breath before you answer.',
                  'Lower your voice and slow down.',
                  'Respond to the issue, not the tone.',
                ],
              },
              {
                title: 'Lines that calm things down',
                phrases: [
                  en('I want to sort this out. Can you walk me through what happened?', 'Shifts from blame to facts'),
                  en('I can hear you’re frustrated. Let’s look at what we can do.', 'Acknowledges the feeling, then moves on'),
                ],
              },
              {
                title: 'Set a boundary',
                text: '<p>If someone becomes abusive, you can stop. Name the behaviour, say what you’ll do, and follow through:</p><p><b>“If the shouting continues, I’ll end the call and we can pick this up tomorrow.”</b></p>',
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Someone snaps at you in a meeting. What’s your first move?',
                options: ['Pause and take a breath', 'Snap back', 'Walk out without a word', 'Complain to everyone afterwards'], answer: 'Pause and take a breath',
                explain: '<b>Pause and breathe</b> first, so you respond instead of react.', hint: 'the first step is about you, not them.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Difficult behaviour often comes from stress, fear or unmet needs.', answer: true,
                explain: '<b>True.</b> Knowing that makes it easier not to take it personally.', hint: 'look at the first slide.' },
              { type: 'choice', prompt: 'Which is the best boundary?',
                options: ['“If the shouting continues, I’ll end the call.”', '“You’re impossible!”', 'Say nothing and put up with it', '“Whatever.”'], answer: '“If the shouting continues, I’ll end the call.”',
                explain: 'It names the behaviour and says what <b>you</b> will do.', hint: 'name the behaviour and your action.' },
              { type: 'order', prompt: 'Put the steps for a tense moment in order.',
                items: ['Pause and breathe', 'Acknowledge their feeling', 'Focus on the problem', 'Agree a next step'],
                explain: 'Calm yourself, acknowledge them, focus on the problem, agree what’s next.', hint: 'start with yourself, end with a plan.' },
            ],
          },
          {
            id: 'comm-say-no',
            title: 'Say “no” and be likable',
            minutes: 10,
            slides: [
              {
                title: 'Every yes has a cost',
                text: '<p>Every yes spends time you can’t spend on something else. A kind, clear no protects your priorities, and people respect it more than a yes you can’t deliver.</p>',
              },
              {
                title: 'The positive no',
                points: [
                  '<b>Yes</b> to the person: show you care.',
                  '<b>No</b> to the request: say it clearly.',
                  '<b>Offer</b> an alternative, if you have one.',
                  'Skip the long list of excuses.',
                ],
              },
              {
                title: 'Ways to say it',
                phrases: [
                  en('I’d love to help, but I can’t take this on this week.', 'Warm and clear'),
                  en('I can’t do the full report, but I can review the summary.', 'No, plus an alternative'),
                  en('Let me check my priorities and get back to you by three.', 'Buys time without a soft yes'),
                ],
              },
              {
                title: 'Avoid the soft yes',
                text: '<p>“Maybe” and “I’ll try” usually turn into a late no, which hurts more than an early one. Being clear early is the kind option.</p>',
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Which is the clearest, kindest no?',
                options: ['I’d love to help, but I can’t take this on this week.', 'Maybe, I’ll try.', 'I’m way too busy for that.', 'Ignore the message'], answer: 'I’d love to help, but I can’t take this on this week.',
                explain: 'It’s warm <b>and</b> clear.', hint: 'it shows you care and still says no.' },
              { type: 'order', prompt: 'Put the positive no in order.',
                items: ['Show you care', 'Say no clearly', 'Offer an alternative'],
                explain: 'Yes to the person, no to the request, then an alternative.', hint: 'the relationship comes first.' },
              { type: 'tf', prompt: 'True or false?', statement: 'A long list of excuses makes a no more convincing.', answer: false,
                explain: '<b>False.</b> Long excuses invite debate. Keep it short.', hint: 'more reasons give more to argue with.' },
              { type: 'choice', prompt: 'Why avoid answering “I’ll try”?',
                options: ['It often turns into a late no', 'It sounds too confident', 'It’s rude', 'It’s too short'], answer: 'It often turns into a late no',
                explain: 'A soft yes usually becomes <b>a late no</b>, which hurts more.', hint: 'think about what happens a week later.' },
            ],
          },
          {
            id: 'comm-interrupt',
            title: 'Interrupt smoothly',
            minutes: 10,
            slides: [
              {
                title: 'Sometimes you have to',
                text: '<p>The meeting is running over, the discussion has drifted, or a wrong number is about to become a decision. A smooth interruption saves everyone’s time.</p>',
              },
              {
                title: 'The smooth interrupt',
                points: [
                  'Say their <b>name</b> to get attention.',
                  '<b>Acknowledge</b> their point.',
                  '<b>Bridge</b> to yours, briefly.',
                  '<b>Hand back</b> the floor.',
                ],
              },
              {
                title: 'Lines that work',
                phrases: [
                  en('Sorry to jump in, Tom: great point. Can I add one thing?', 'Name, acknowledge, bridge'),
                  en('Before we go on, a quick correction:', 'For facts that matter'),
                  en('I want to make sure we finish on time. Can we come back to this?', 'For meetings that drift'),
                ],
              },
              {
                title: 'Timing',
                text: '<p>Wait for a breath or the end of a sentence. Lean in or raise a hand first so they see you coming, and keep your voice calm.</p>',
              },
            ],
            quiz: [
              { type: 'order', prompt: 'Put the smooth interrupt in order.',
                items: ['Say their name', 'Acknowledge their point', 'Bridge to yours', 'Hand the floor back'],
                explain: 'Name, acknowledge, bridge, hand back.', hint: 'get their attention first.' },
              { type: 'choice', prompt: 'When is the best moment to interrupt?',
                options: ['At a natural pause', 'In the middle of a word', 'While they read out a number', 'Right as they reach the key point'], answer: 'At a natural pause',
                explain: 'Wait for <b>a breath or the end of a sentence</b>.', hint: 'wait for a gap.' },
              { type: 'choice', prompt: 'Which is the smoothest interruption?',
                options: ['Sorry to jump in, Tom: great point. Can I add one thing?', 'No, that’s wrong.', 'Stop talking.', 'Just start talking louder'], answer: 'Sorry to jump in, Tom: great point. Can I add one thing?',
                explain: 'It uses their name, acknowledges them and asks to add a point.', hint: 'look for the name and the acknowledgement.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Saying someone’s name is a polite way to get their attention before you interrupt.', answer: true,
                explain: '<b>True.</b> It’s the first step of the smooth interrupt.', hint: 'it’s step one.' },
            ],
          },
          {
            id: 'comm-conflict',
            title: 'Defuse any conflict',
            minutes: 15,
            slides: [
              {
                title: 'Calm first, then solve',
                text: '<p>In a conflict, people react before they think. Trying to solve the problem while emotions run high rarely works. <b>Lower the temperature first</b>, then work on the issue.</p>',
              },
              {
                title: 'Name the feeling',
                phrases: [
                  en('It sounds like you’re frustrated about the delay.', 'Labels the emotion without judging it'),
                ],
                text: '<p>Putting a feeling into words tends to make it less intense. People calm down when they feel understood.</p>',
              },
              {
                title: 'Interests, not positions',
                text: '<p>A <b>position</b> is what someone demands: “I need it on Monday.” An <b>interest</b> is why: “My client meeting is on Tuesday.”</p><p>Ask <b>“Why does that matter to you?”</b> Interests open up options that work for both sides.</p>',
              },
              {
                title: 'Use I-statements',
                phrases: [
                  en('You never tell me anything!', 'Blames: invites a counter-attack'),
                  en('I felt left out when I heard about the change last.', 'Describes your experience: invites a conversation'),
                ],
              },
            ],
            quiz: [
              { type: 'choice', prompt: '“I need it on Monday” is a position. Which is the interest behind it?',
                options: ['My client meeting is on Tuesday.', 'I need it on Monday.', 'Because I said so.', 'I don’t trust you.'], answer: 'My client meeting is on Tuesday.',
                explain: 'The interest is the <b>why</b>: the client meeting on Tuesday.', hint: 'ask “why does that matter?”.' },
              { type: 'choice', prompt: 'Which is an I-statement?',
                options: ['I felt left out when I heard about the change last.', 'You never tell me anything!', 'You’re so secretive.', 'Everyone thinks you’re rude.'], answer: 'I felt left out when I heard about the change last.',
                explain: 'It describes <b>your</b> experience instead of blaming them.', hint: 'it starts with how you felt.' },
              { type: 'tf', prompt: 'True or false?', statement: 'Naming someone’s emotion usually makes them angrier.', answer: false,
                explain: '<b>False.</b> Labelling a feeling tends to make it less intense.', hint: 'people calm down when they feel understood.' },
              { type: 'order', prompt: 'Put the steps to defuse a conflict in order.',
                items: ['Calm the emotion', 'Find the interests', 'Explore options', 'Agree a next step'],
                explain: 'Calm first, then find interests, explore options and agree what’s next.', hint: 'calm first, then solve.' },
            ],
          },
          {
            id: 'comm-listen',
            title: 'Listen like a leader',
            minutes: 11,
            slides: [
              {
                title: 'Listen to understand',
                art: LISTEN,
                text: '<p>Most people listen to reply: they’re planning their answer while the other person talks. Leaders listen to <b>understand</b>, then check they got it right.</p>',
              },
              {
                title: 'Active listening',
                points: [
                  'Put your phone away and face them.',
                  'Let them finish, then pause a beat.',
                  'Paraphrase: “So the main issue is…”',
                  'Ask open questions that start with what or how.',
                ],
              },
              {
                title: 'Questions that open people up',
                phrases: [
                  en('What’s the biggest challenge here?', 'Gets to the real issue'),
                  en('How did that affect you?', 'Invites feelings, not just facts'),
                  en('And what else?', 'Often surfaces the thing that matters most'),
                ],
              },
              {
                title: 'Close the loop',
                text: '<p>End by summarising what you heard and what happens next. People who feel heard are far more willing to follow your lead.</p>',
              },
            ],
            quiz: [
              { type: 'choice', prompt: 'Which is an open question?',
                options: ['What’s the biggest challenge here?', 'Did you finish it?', 'Is it bad?', 'Are you okay with that?'], answer: 'What’s the biggest challenge here?',
                explain: 'It can’t be answered with yes or no, so it <b>opens</b> the conversation.', hint: 'it can’t be answered with yes or no.' },
              { type: 'choice', prompt: 'What does paraphrasing mean?',
                options: ['Repeating their main point in your own words', 'Changing the topic', 'Finishing their sentences', 'Giving advice straight away'], answer: 'Repeating their main point in your own words',
                explain: 'Paraphrasing is saying their point <b>back in your own words</b> to check you understood.', hint: '“So the main issue is…”' },
              { type: 'tf', prompt: 'True or false?', statement: 'Planning your reply while they talk is part of active listening.', answer: false,
                explain: '<b>False.</b> That’s listening to reply. Listen to understand.', hint: 'leaders listen to understand, not to reply.' },
              { type: 'order', prompt: 'Put active listening in order.',
                items: ['Give full attention', 'Let them finish', 'Paraphrase', 'Ask an open question'],
                explain: 'Attention, let them finish, paraphrase, then ask.', hint: 'you can’t paraphrase before they finish.' },
            ],
          },
        ],
      },
    ],
  });
})();
