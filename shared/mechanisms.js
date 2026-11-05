// The mechanism table. One row per mechanism: its route, what it grades, what it may move, its
// errand and its copy. The app, the worker and the test tools all read this file, so a doctrine
// call is one row here and every reader follows it.
//
// Plain script on purpose. The app and the browser benches load it with a <script> tag, the
// worker and the Node tools with `import './shared/mechanisms.js'`. Either way the table is
// globalThis.CorkedMechanisms.
//
// A bar is what the model grades. An element is what the record keeps. M6's Words is a bar and
// not an element. A bar or element written { name, when } or { name, unless } depends on the
// bottle: gapInPlay is M2's gap flag, selfMode is maturity class 2.
(function (root) {
  const MECHANISMS = {
    M1: {
      route: '/m1',
      name: 'The Grape',
      bars: ['grape'],
      elements: ['grape'],
      anchors: ['observation'],
      activeElement: 'grape',
      prefilled: true,
      copy: {
        question: c => c.selfMode
          ? `You are the person this spark must answer to.`
          : `${c.grapeName} is the person this spark must answer to.`
      }
    },

    M2: {
      route: '/m2',
      name: 'The Friction Test',
      // The overall state is the floor of the bars, so M2 has no primary bar.
      bars: ['tell', 'vintage', { name: 'gap', when: 'gapInPlay' }],
      // The Gap only clears from the friction answer when Phase A flagged gap_in_play.
      elements: ['tell', 'vintage', { name: 'gap', when: 'gapInPlay' }],
      anchors: ['tell', 'vintage', { name: 'gap', when: 'gapInPlay' }, 'observation'],
      activeElement: 'tell',
      copy: {
        // The friction question Phase A or the scene route wrote. The rest are fallbacks only.
        question: c => c.m2Question || (c.selfMode
          ? `Stay inside the instance you just described.\n\nWhat did you actually do next? Write the observable steps. What could a camera capture?`
          : `Describe a specific moment when ${c.grape} encountered this. What did they actually do? Write the exact behaviour you could film if you were there.`),
        // In self mode there is no one to go and speak to.
        goFind: c => c.selfMode ? '' : `Haven't spoken to ${c.grapeName} about this yet? Go have that conversation. Come back and write what they actually said.`,
        rows: {
          tell: ['Observable action', 'Partial action'],
          vintage: ['Specific instance', 'Partial moment'],
          gap: ['Workaround failure', 'Partial failure point']
        }
      },
      errand: {
        label: 'a question to ask',
        mode: 'ask',
        selfErrand: true,
        element: c => (c.gapInPlay && c.gapState !== 'settled') ? 'gap' : 'tell',
        // What a park keeps when the worker can't write a brief: M2's own question.
        savedText: c => c.m2Question || null,
        fallback: c => (!c.problemOnRecord || c.selfErrand) ? c.openErrandText
          : c.m2Question || `Ask ${c.grapeName}: walk me through the last time this happened. What did you actually do?`
      }
    },

    M3: {
      route: '/m3',
      name: 'Third-Party Workarounds',
      bars: ['echo'],
      primaryBar: 'echo',
      // No Vintage here: a third party's moment counts for the Echo. The Vintage comes from M2 only.
      elements: ['echo'],
      anchors: ['echo', 'observation'],
      activeElement: 'echo',
      errandBar: 'echo',
      copy: {
        question: c => c.selfMode
          ? `Set your own experience aside. Who else hits this? Name one person and tell me what they have actually done about it.`
          : `Set ${c.grapeName} aside. Who else hits this? Name one person and tell me what they have actually done about it.`,
        goFind: () => `Haven't found someone yet? Go find them. Come back with their name and what they've actually done about it.`,
        rows: { echo: ['Third-party confirmation', 'Partial confirmation'] }
      },
      errand: {
        label: 'find another person',
        mode: 'echo',
        element: () => 'echo',
        fallback: c => `Find someone who hits this problem and is not ${c.grapeRef}. Ask them: walk me through how you handle it. What did you actually do the last time it came up?`
      }
    },

    M4: {
      route: '/m4',
      name: 'Second Person',
      bars: ['echo'],
      primaryBar: 'echo',
      // No Vintage here either. See M3.
      elements: ['echo'],
      anchors: ['echo', 'contrast', 'observation'],
      activeElement: 'echo',
      errandBar: 'echo',
      // Echo already confirmed by M3: the second-person question is unnecessary.
      skippedWhenSettled: 'echo',
      copy: {
        question: c => c.selfMode
          ? `You are one kind of person with this. Who is a different kind, and does it look the same for them?`
          : `${c.grapeName} is one kind of person with this. Who is a different kind, and does it look the same for them?`,
        goFind: () => `Haven't found a different kind of person yet? Go find one. Come back with their name, what they've actually done about it, and whether it looks the same for them.`,
        rows: { echo: ['Contrast', 'Partial contrast'] }
      },
      errand: {
        label: 'find a different kind of person',
        mode: 'contrast',
        element: () => 'echo',
        fallback: c => `Find a second person who hits this problem, someone other than ${c.grapeRef} and whoever you named before. Ask what they've actually done about it.`
      }
    },

    M5: {
      route: '/m5',
      name: 'The Existing Fix',
      bars: ['gap'],
      primaryBar: 'gap',
      elements: ['gap'],
      anchors: ['gap', 'observation'],
      activeElement: 'gap',
      errandBar: 'gap',
      copy: {
        question: c => c.selfMode
          ? `What do you use for this problem now, and exactly where does it fall short?`
          : `What do people use for this problem now, and exactly where does it fall short?`,
        goFind: () => `Haven't found what people use for this now? Go find out. Come back with what it is and exactly where it falls short.`,
        rows: { gap: ['Existing fix and failure point', 'Partial fix'] }
      },
      errand: {
        label: 'find what they use now',
        mode: 'ask',
        selfErrand: true,
        element: () => 'gap',
        fallback: c => c.selfErrand ? c.selfErrandText : `Find out what people currently use for this problem and exactly where it falls short.`
      }
    },

    M6: {
      route: '/m6',
      name: 'Their Words, Not Yours',
      // In self mode M6 can't touch the Echo.
      bars: ['words', 'tell', { name: 'echo', unless: 'selfMode' }],
      primaryBar: 'words',
      elements: ['tell', { name: 'echo', unless: 'selfMode' }],
      anchors: ['words', 'tell', { name: 'echo', unless: 'selfMode' }, 'observation'],
      activeElement: 'echo',
      copy: {
        question: c => c.selfMode
          ? `What have you actually said or written about this, before Corked asked?`
          : `How would ${c.grapeName} describe this in their own words?`,
        // In self mode there is no one to go and talk to.
        goFind: c => c.selfMode ? '' : `Haven't talked to ${c.grapeName} in these terms yet? Go have that conversation. Come back with their exact words.`,
        // Where the words came from, on the first answer, the parked card and a reopen.
        wordsSource: c => c.selfMode
          ? { real: 'My words, from something I said or wrote', reconstructed: 'Reconstructed, I have not said it in these terms' }
          : { real: 'Their words, from a real exchange', reconstructed: 'Reconstructed, we have not talked in these terms' },
        rows: {
          tell: ['Filmable behaviour', 'Partial behaviour'],
          echo: ['Third-party echo', 'Partial echo']
        }
      },
      errand: {
        label: 'their exact words',
        mode: 'words',
        selfErrand: true,
        element: () => 'words',
        fallback: c => c.selfErrand ? c.selfErrandText : `Talk to ${c.grapeName} and bring back their exact words about this problem.`
      }
    },

    M7: {
      route: '/m7',
      name: 'The Non-Case',
      bars: ['limit'],
      primaryBar: 'limit',
      elements: ['limit'],
      anchors: ['limit', 'observation'],
      activeElement: 'limit',
      errandBar: 'limit',
      copy: {
        question: () => `Who looks like they should have this problem but doesn't? Why not?`,
        goFind: () => `Haven't found your non-case yet? Go find them. Come back with who they are and why they don't have this.`,
        rows: { limit: ['Bounded exclusion and reason', 'Partial exclusion'] }
      },
      errand: {
        label: "find someone who doesn't have it",
        mode: 'limit',
        element: () => 'limit',
        fallback: () => `Find someone who looks like they should have this problem but doesn't, and find out why not.`
      }
    }
  };

  const ORDER = Object.keys(MECHANISMS);

  // Where each element starts: the mechanism it reopens through when nothing has graded it yet.
  const CANONICAL_SOURCE = { grape: 'M1', tell: 'M2', vintage: 'M2', gap: 'M5', echo: 'M3', limit: 'M7' };

  const SELF_ERRAND_TEXT = 'Next time it happens, write down what you did right then.';

  function applies(entry, bottle) {
    if (typeof entry === 'string') return true;
    if (entry.when) return !!bottle[entry.when];
    if (entry.unless) return !bottle[entry.unless];
    return true;
  }

  function resolve(list, bottle = {}) {
    return list.filter(e => applies(e, bottle)).map(e => typeof e === 'string' ? e : e.name);
  }

  function row(id) {
    const m = MECHANISMS[id];
    if (!m) throw new Error(`No mechanism ${id}`);
    return m;
  }

  root.CorkedMechanisms = {
    MECHANISMS,
    ORDER,
    SELF_ERRAND_TEXT,
    get: row,
    // The bars the model's reply must carry for this bottle.
    bars: (id, bottle) => resolve(row(id).bars, bottle),
    // The elements a reading can move on this bottle.
    elements: (id, bottle) => resolve(row(id).elements, bottle),
    // Every reply field whose anchor_span has to be the builder's own words.
    anchors: (id, bottle) => resolve(row(id).anchors, bottle),
    // Every mechanism that can move an element. Doesn't depend on the bottle.
    movers: element => ORDER.filter(id => resolve(row(id).elements, { gapInPlay: true }).includes(element)),
    // The mechanism an element reopens through: whichever last graded it, else where it starts.
    // An element only one mechanism moves always goes back there, also on an older bottle where
    // something else last moved it (M3 and M4 moved the Vintage until 21 Oct).
    reopenSource(element, lastSource) {
      const movers = this.movers(element);
      if (movers.length === 1) return movers[0];
      return (lastSource && lastSource[element]) || CANONICAL_SOURCE[element];
    }
  };
})(globalThis);
