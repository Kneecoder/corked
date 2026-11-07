// Every sentence of a new bottle's first session: the gate, the questions for each path, the end
// screen, the cellar card. Change wording here; the logic lives in corked_v6.html (search for
// FIRST SESSION).
//
// Questions are fixed shapes. A shape that names someone gets a short label slotted in by code.
// The record keeps the builder's answer verbatim; the label is only for slotting:
//   c.self           the builder: the "It was me" tap, or the worker read the first fix answer
//                    as the builder (is_self)
//   c.person         the short label for the person from the first fix question
//   c.personPending  a person is on record and their label hasn't arrived (or never will)
//   c.people         the short label for the first people from the experiment questions
//   c.peoplePending  first people are on record and their label hasn't arrived
// Until a label arrives, questions say "they" or "them" and buttons say "the person you named" or
// "the people you named". Nothing waits for a label. With no person on record (Don't know yet or
// Skip), the shapes that name one have their own wording.
//
// Each question but F4 and E5 has one fixed example under the box. Examples are fixed copy, never
// generated. No question may lean on an earlier answer with "it", "that", "still" or "those".
//
// No experiment question may mention a problem, a need or something going wrong.
//
// Plain script on purpose, like the other shared files. The app loads it with a <script> tag,
// tests with `import './shared/first-session-copy.js'`. Either way it is
// globalThis.CorkedFirstSessionCopy.
(function (root) {
  const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const DAY_MS = 86400000;

  // 'YYYY-MM-DD' as a local date.
  const localDate = key => {
    const [y, m, d] = String(key).split('-').map(Number);
    return new Date(y, m - 1, d);
  };
  const shortDate = d => `${d.getDate()} ${MONTHS[d.getMonth()]}`;

  // Who the person and the people are in a sentence: the label, else the fallback.
  const them = c => c.person || 'them';
  const they = c => c.person || 'they';

  const COPY = {
    gate: {
      question: 'Is this a fix or an experiment?',
      fix: 'A fix. I saw something go wrong, for someone or for me.',
      experiment: 'An experiment. I want to build it and see what people do with it.',
      // One example idea under each choice.
      fixExample: 'e.g. "Tenants lose their deposit because they can\'t prove what the place looked like."',
      experimentExample: 'e.g. "A daily game where you describe one picture in a single sentence."'
    },

    // Once, above the first question of each path.
    start: {
      fix: 'Six short questions to pin down who runs into this and what you expect to hear from them. Then you pick one next step.',
      experiment: "Six short questions to pin down what you'd build first and who you'd show it to. Then you pick one next step."
    },

    buttons: {
      next: 'Continue →',
      dontKnow: "Don't know yet",
      skip: 'Skip',
      // On the two questions that set the line, beside "Don't know yet".
      notSet: 'Not set yet'
    },

    // How an answer that isn't one shows on the end screen.
    values: {
      dont_know: "Don't know yet",
      skip: 'Skip',
      not_set: 'not set yet',
      // Between the two counts a bottle saved at E6 before B1b took the count field away.
      outOf: 'out of'
    },

    // taps: answers: true means the tap alone is an answer. link: true opens the optional link field.
    // presetSelf: the tap that starts picked when the builder is the person.
    // line: true for the two questions that set the line; they offer "Not set yet" too.
    questions: {
      F1: {
        ask: () => 'Who last ran into this? A name, initials, or a few words about who they are and how you know them.',
        taps: [{ id: 'me', label: 'It was me', answers: true }],
        example: 'e.g. "S., a colleague who plans our team trips"'
      },
      F2: {
        ask: c => c.self ? 'The last time you ran into it, what did you do right then?'
          : (c.person || c.personPending) ? `The last time ${they(c)} ran into it, what did they do right then?`
          : 'What did you see go wrong, and when?',
        taps: [{ id: 'saw', label: 'I saw it' }, { id: 'told', label: 'I was told' }, { id: 'me', label: 'It was me' }],
        presetSelf: 'me',
        example: 'e.g. "Spent an hour in three group chats trying to find a date."'
      },
      F3: {
        ask: c => c.self ? 'If your idea could do only one thing for you, what would it be?'
          : (c.person || c.personPending) ? `If your idea could do only one thing for ${them(c)}, what would it be?`
          : 'If your idea could do only one thing, what would it be?',
        example: 'e.g. "Show everyone\'s free evenings in one place."'
      },
      F4: {
        ask: () => "Say your idea again in one sentence, as you'd say it today. It's fine if it changed."
      },
      F5: {
        ask: c => c.self ? 'When you ask someone else who runs into this, what do you expect to hear?'
          : (c.person || c.personPending) ? `When you ask ${them(c)} about the last time, what do you expect to hear?`
          : 'When you find someone who runs into this, what do you expect to hear?',
        example: 'e.g. "That they gave up and picked a date themselves."'
      },
      F6: {
        ask: c => (c.person || c.personPending) && !c.self
          ? `Finish the sentence: I'd drop it if ${they(c)} told me...`
          : "Finish the sentence: I'd drop it if someone who runs into this told me...",
        line: true,
        example: 'e.g. "...it only takes five minutes, they don\'t mind."'
      },

      E1: {
        ask: () => 'When did someone last do something like this, even by hand or in another app? "No one I know of" is an answer.',
        taps: [{ id: 'no_one', label: 'No one I know of', answers: true }],
        example: 'e.g. "My friends make quizzes about each other in the group chat."'
      },
      E2: {
        ask: () => 'In the first minute of using it, what should someone feel?',
        example: 'e.g. "Smug when they get one right." or "Curious what comes next."'
      },
      E3: {
        ask: () => "What's the simplest version you could build quickly, so people can try it?",
        taps: [{ id: 'built', label: 'I already built it', answers: true, link: true }],
        linkLabel: 'Link (optional)',
        example: 'e.g. "Ten questions on one page and a score at the end."'
      },
      E4: {
        ask: () => "Who are the first one to three people you'd show it to? Names, initials, or a few words.",
        example: 'e.g. "Tom, and two friends from my running club"'
      },
      E5: {
        ask: () => "Say your idea again in one sentence, as you'd say it today. It's fine if it changed."
      },
      E6: {
        ask: c => `What would ${c.people || (c.peoplePending ? 'they' : 'people')} have to do for you to keep building it? A rough guess is fine.`,
        line: true,
        example: 'e.g. "Play it two days in a row without me asking."'
      }
    },

    end: {
      first: 'First',
      now: 'Now',
      fix: {
        person: 'The person',
        lastTime: 'The last time',
        oneThing: 'The one thing',
        expect: 'What you expect to hear',
        line: "You'd drop it if"
      },
      experiment: {
        lastTime: 'The last time something like it happened',
        feel: 'The feeling',
        smallest: 'The smallest version',
        people: 'The first people',
        line: "You'd keep going if"
      },

      // One line above the choices.
      next: {
        fix: c => (c.person || c.personPending) && !c.self
          ? `What's next: ask ${c.person || 'the person you named'} about the last time, put what you hear next to what you expected, then decide what to do with the idea.`
          : "What's next: ask someone who runs into this about the last time, put what you hear next to what you expected, then decide what to do with the idea.",
        experiment: c => `What's next: let ${c.people || (c.peoplePending ? 'the people you named' : 'someone')} try it, or build the simplest version first, see what happens, then decide what to do with the idea.`
      },

      ask: c => (c.person || c.personPending) && !c.self
        ? `Ask ${c.person || 'the person you named'} about the last time`
        : 'Ask someone who runs into this',
      show: c => `Show it to ${c.people || (c.peoplePending ? 'the people you named' : 'someone')}`,
      build: 'Build the simplest version first',
      rethink: 'Rethink it first',
      cellar: 'Back to the cellar',

      // A few words under each choice.
      notes: {
        ask: 'Saves the step and a day. Nothing is sent.',
        show: 'Saves the step and a day. Nothing is sent.',
        build: 'Saves the step and a day.',
        rethink: {
          fix: 'Go over your sentence and the one thing again.',
          experiment: 'Go over your sentence, the feeling and the simplest version again.'
        }
      },

      // Only on the fix path, when the first two questions were both Don't know yet.
      nobody: "Nobody's on record yet as running into this. If it's more something to build and see what people do with it, you can answer those questions instead.",
      toExperiment: 'Answer those questions',

      when: 'When?',
      today: 'Today',
      thisWeek: 'This week',
      pickDay: 'Pick a day',
      save: 'Save',
      back: 'Back',

      // After a day is picked. `planned` is the day in words, as on the cellar card.
      saved: planned => `${planned}. It's on this bottle in your cellar.`
    },

    card: {
      ready: 'Question ready',
      noStep: 'No step planned'
    },

    // "7 Nov 2026", for the dated lines on the end screen.
    dated(iso) {
      const d = new Date(iso);
      if (isNaN(d.getTime())) return '';
      return `${shortDate(d)} ${d.getFullYear()}`;
    },

    // The planned day in words, on the end screen and the cellar card. step.day is 'YYYY-MM-DD';
    // today is the same shape. It reads the same before and after the day: nothing leans or stalls.
    planned(step, today) {
      if (!step || !step.day) return '';
      const day = localDate(step.day);
      const now = localDate(today);
      if (step.when === 'this_week') {
        if (step.day >= today) return 'Planned for this week';
        const monday = new Date(day);
        monday.setDate(day.getDate() - ((day.getDay() + 6) % 7));
        return `Planned for the week of ${shortDate(monday)}`;
      }
      const diff = Math.round((day - now) / DAY_MS);
      if (diff === 0) return 'Planned for today';
      if (Math.abs(diff) <= 6) return `Planned for ${WEEKDAYS[day.getDay()]}`;
      return `Planned for ${WEEKDAYS[day.getDay()]} ${shortDate(day)}`;
    }
  };

  // ── B1c: first_session_v2 ──
  // A new bottle's first session since B1c (v48, 7 Nov 2026). The AI writes F1, F2, F3, F5, E1, E2
  // and E3 for each idea, around fixed purposes (worker route /question). Everything here is fixed
  // copy: the spark screen, the gate's lines, each written question's fallback, the say-it-again
  // screen, the plan step, the end screen and the confirmation. Bottles from B1 and B1b
  // (first_session_v1) keep the copy above.
  //
  // c, for the lines that name someone:
  //   c.self           the worker read F1 as the builder (is_self)
  //   c.person         the short label for F1's person; c.personPending: named, label not here yet
  //   c.plan           who the ask is for: { label, pending, none } (F1's person, or "Who could you ask?")
  //   c.people         the short label for E4's people; c.peoplePending: named, label not here yet
  // Before a label lands, questions say "they" or "them" and buttons say "the person you named" or
  // "the people you named", as B1b.
  const planWho = c => c.plan?.label || (c.plan?.pending ? 'the person you named' : null);

  COPY.v2 = {
    flow: 'first_session_v2',

    spark: {
      question: "What's the idea?",
      note: "An app, a game, a tool you wish existed. Get the rough thought down while it's fresh. It doesn't need to be worked out yet.",
      label: 'Your idea',
      next: 'Next →'
    },

    gate: {
      fixExample: 'Like Dropbox, whose founder kept forgetting his USB stick.',
      experimentExample: 'Like Wordle, a word game one guy made for his partner.'
    },

    start: 'A few questions to sharpen this idea. Then you pick a next step.',

    buttons: {
      next: 'Continue →',
      dontKnow: "Don't know yet"
    },

    // The slots the writer writes, and the rule each written question has to pass. The worker
    // checks it before a question leaves, and the app checks it again before one shows.
    written: ['F1', 'F2', 'F3', 'F5', 'E1', 'E2', 'E3'],
    maxWords: 25,
    check(question, path) {
      const q = String(question || '').replace(/\s+/g, ' ').trim();
      if (!q) return 'empty';
      if ((q.match(/\?/g) || []).length !== 1 || !q.endsWith('?')) return 'question_mark';
      if (q.split(' ').length > 25) return 'too_long';
      if (/[—–]|\s-\s|--/.test(q)) return 'dash';
      if (path === 'experiment' && /\b(problem|need|wrong|stopped)/i.test(q)) return 'experiment_word';
      return null;
    },

    // Used only when the writer fails, or hasn't answered 6 seconds after the question was needed.
    fallback: {
      F1: () => "Who's the last person you saw run into this? It can be you.",
      F2: c => c.self ? 'The last time you had this problem, what did you do?'
        : (c.person || c.personPending) ? 'The last time they had this problem, what did they do?'
        : 'What did you see go wrong, and when?',
      F3: c => c.self ? 'If your idea could do only one thing for you, what would it be?'
        : (c.person || c.personPending) ? 'If your idea could do only one thing for them, what would it be?'
        : 'If your idea could do only one thing, what would it be?',
      F5: c => c.plan?.none
        ? 'When you ask someone about the last time they had this problem, what do you expect them to say?'
        : 'When you ask them about the last time they had this problem, what do you expect them to say?',
      E1: () => 'When did you last see someone do something like your idea, even by hand or in another app?',
      E2: () => 'In the first minute of using it, what should someone feel?',
      E3: () => "What's the simplest version you could build quickly, so people can try it?"
    },

    // F4 and E5, fixed. No model.
    sayAgain: {
      firstWrote: spark => `You first wrote: ${spark}`,
      question: 'How would you say your idea now, in one sentence?'
    },

    // The plan step's fixed questions.
    plan: {
      askWho: 'Who could you ask? Someone who has this problem. A name, initials, or a few words.',
      F6: c => c.plan?.none
        ? "Finish the sentence: I'd drop it if someone who has this problem told me..."
        : `Finish the sentence: I'd drop it if ${c.plan?.label || 'they'} told me...`,
      E4: "Who are the first one to three people you'd show it to? Names, initials, or a few words.",
      E6: c => `What would ${c.people || (c.peoplePending ? 'they' : 'people')} have to do for you to keep building it? A rough guess is fine.`,
      when: 'When?',
      today: 'Today',
      thisWeek: 'This week',
      pickDay: 'Pick a day',
      save: 'Save',
      back: 'Back'
    },

    end: {
      first: 'First',
      now: 'Now',
      fix: { person: 'The person', lastTime: 'What happened last time', oneThing: 'The one thing' },
      experiment: { lastTime: 'Something like it', feel: 'The feeling', simplest: 'The simplest version' },

      next: {
        fix: c => (c.person || c.personPending) && !c.self
          ? `What's next: ask ${c.person || 'the person you named'} what happened, see if it matches what you expect, then decide what to do with the idea.`
          : "What's next: find someone who has this problem, ask them what happened, then decide what to do with the idea.",
        experiment: () => "What's next: build the simplest version or show it to a few people, see what they do with it, then decide what to do with the idea."
      },

      ask: c => (c.person || c.personPending) && !c.self ? `Ask ${c.person || 'the person you named'}` : 'Ask someone',
      show: 'Show it to a few people',
      build: 'Build the simplest version first',
      rethink: 'Rethink it first',
      cellar: 'Back to the cellar',
      notes: {
        askNamed: 'Two quick questions, then pick a day. Nothing is sent.',
        askSomeone: 'Three quick questions, then pick a day. Nothing is sent.',
        show: 'Two quick questions, then pick a day. Nothing is sent.',
        build: 'Pick a day.',
        rethink: {
          fix: 'Go over your sentence and the one thing again.',
          experiment: 'Go over your sentence, the feeling and the simplest version again.'
        }
      },

      // The switch line, as B1b.
      nobody: "Nobody's on record yet as running into this. If it's more something to build and see what people do with it, you can answer those questions instead.",
      toExperiment: 'Answer those questions'
    },

    // The step in words: the confirmation says "Planned for [day]: [words].", the card shows it
    // with a capital.
    stepWords(kind, c) {
      if (kind === 'ask') return `ask ${planWho(c) || 'someone'}`;
      if (kind === 'show') return `show it to ${c.people || (c.peoplePending ? 'the people you named' : 'a few people')}`;
      return 'build the simplest version';
    },

    confirm: {
      planned: (planned, words) => `${planned}: ${words}.`,
      expect: 'You expect',
      drop: "You'd drop it if",
      firstPeople: 'The first people',
      line: "You'd keep going if",
      onBottle: "It's on this bottle in your cellar."
    }
  };

  root.CorkedFirstSessionCopy = COPY;
})(globalThis);
