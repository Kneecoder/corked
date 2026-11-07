// Every sentence of a new bottle's first session: the gate, the questions for each path, the end
// screen, the cellar card. Change wording here; the logic lives in corked_v6.html (search for
// FIRST SESSION).
//
// Questions are fixed shapes. A shape that names someone gets the builder's own words slotted in
// by code, never reworded by a model:
//   c.person  the person from the first fix question, as typed (the part before the first comma)
//   c.self    the builder said "It was me"
//   c.people  the first people from the experiment questions, as typed
// With no person on record (Don't know yet or Skip at the first fix question), the shapes that
// name one have their own wording.
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

  const COPY = {
    gate: {
      question: 'Is this a fix or an experiment?',
      fix: 'A fix. I saw something go wrong, for someone or for me.',
      experiment: 'An experiment. I want to build it and see what people do with it.'
    },

    buttons: {
      next: 'Continue →',
      dontKnow: "Don't know yet",
      skip: 'Skip',
      // On the two questions that set the line, in place of "Don't know yet".
      notSet: 'Not set yet'
    },

    // How an answer that isn't one shows on the end screen.
    values: {
      dont_know: "Don't know yet",
      skip: 'Skip',
      not_set: 'not set yet'
    },

    // taps: answers: true means the tap alone is an answer. link: true opens the optional link field.
    questions: {
      F1: {
        ask: () => 'Who last ran into this? A name, initials, or a few words about who they are, and how you know them.',
        taps: [{ id: 'me', label: 'It was me', answers: true }]
      },
      F2: {
        ask: c => c.self ? 'The last time you ran into it, what did you do right then?'
          : c.person ? `The last time ${c.person} ran into it, what did they do right then?`
          : 'What did you see go wrong, and when?',
        taps: [{ id: 'saw', label: 'I saw it' }, { id: 'told', label: 'I was told' }, { id: 'me', label: 'It was me' }]
      },
      F3: {
        ask: c => c.self ? 'If it could do only one thing for you, which one?'
          : c.person ? `If it could do only one thing for ${c.person}, which one?`
          : 'If it could do only one thing, which one?'
      },
      F4: {
        ask: () => "Say your idea again in one sentence, as you'd say it today."
      },
      F5: {
        ask: c => c.self ? 'When you ask someone else who runs into this, what do you expect to hear?'
          : c.person ? `When you ask ${c.person} about the last time, what do you expect to hear?`
          : 'When you find someone who runs into this, what do you expect to hear?'
      },
      F6: {
        ask: () => 'What answer would make you drop it?',
        line: true
      },

      E1: {
        ask: () => 'When did someone last do something like this, even by hand or in another app?',
        taps: [{ id: 'no_one', label: 'No one I know of', answers: true }]
      },
      E2: {
        ask: () => 'What should someone feel in the first minute?'
      },
      E3: {
        ask: () => "What's the smallest version that still gives them that?",
        taps: [{ id: 'built', label: 'I already built it', answers: true, link: true }],
        linkLabel: 'Link (optional)'
      },
      E4: {
        ask: () => "Who are the first one to three people you'd show it to? Names, initials, or a few words about who they are."
      },
      E5: {
        ask: () => "Say your idea again in one sentence, as you'd say it today."
      },
      E6: {
        ask: () => 'What would those people have to do with it for you to keep going?',
        line: true,
        counts: { label: 'How many, out of how many', outOf: 'out of', howManyName: 'How many', outOfName: 'Out of how many' }
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
        line: 'Your line'
      },
      ask: c => c.self ? 'Ask someone else who runs into this about the last time'
        : c.person ? `Ask ${c.person} about the last time`
        : 'Ask someone who runs into this about the last time',
      show: c => c.people ? `Show it to ${c.people}` : 'Show it to someone',
      build: 'Build the smallest version first',
      rethink: 'Rethink it first',
      cellar: 'Back to the cellar',

      toExperiment: 'Switch to the experiment questions',
      toFix: 'Switch to the fix questions',
      nobody: "Nobody's on record yet as running into this. If it's more something to build and see, you can switch.",

      when: 'When?',
      today: 'Today',
      thisWeek: 'This week',
      pickDay: 'Pick a day',
      save: 'Save',
      back: 'Back'
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

  root.CorkedFirstSessionCopy = COPY;
})(globalThis);
