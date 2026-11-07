import test from 'node:test';
import assert from 'node:assert/strict';
import '../shared/first-session-copy.js';

const COPY = globalThis.CorkedFirstSessionCopy;
// A label, the builder, nobody, and a person or people on record whose label hasn't arrived.
const CONTEXTS = [
  { self: false, person: 'M.', personPending: false, people: 'your football friends', peoplePending: false },
  { self: true, person: null, personPending: false, people: null, peoplePending: false },
  { self: false, person: null, personPending: false, people: null, peoplePending: false },
  { self: false, person: null, personPending: true, people: null, peoplePending: true }
];
const [LABEL, SELF, NONE, PENDING] = CONTEXTS;
const ALL_QUESTIONS = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6'];

test('no experiment question mentions a problem, a need or something going wrong', () => {
  for (const id of ['E1', 'E2', 'E3', 'E4', 'E5', 'E6']) {
    const q = COPY.questions[id];
    for (const c of CONTEXTS) {
      const words = [q.ask(c), q.example || '', ...(q.taps || []).map(t => t.label), q.linkLabel || ''].join(' ');
      assert.doesNotMatch(words, /\b(problem|need|wrong|stopped)/i, `${id}: ${words}`);
    }
  }
});

test('a question that names the person reads right as a whole in every case', () => {
  for (const id of ['F2', 'F3', 'F5', 'F6']) {
    const q = COPY.questions[id];
    assert.match(q.ask(LABEL), /M\./, id);
    assert.doesNotMatch(q.ask(SELF), /\bthey\b|\bnull\b|undefined|M\./, id);
    assert.doesNotMatch(q.ask(NONE), /\bnull\b|undefined/, id);
    assert.doesNotMatch(q.ask(PENDING), /\bnull\b|undefined|person you named/, id);
  }
  assert.match(COPY.questions.E6.ask(LABEL), /your football friends/);
  assert.match(COPY.questions.E6.ask(PENDING), /What would they have/);
});

test('every question but F4 and E5 has one fixed example starting "e.g."', () => {
  for (const id of ALL_QUESTIONS) {
    const q = COPY.questions[id];
    if (id === 'F4' || id === 'E5') assert.equal(q.example, undefined, id);
    else assert.match(q.example, /^e\.g\. "/, id);
  }
});

test('no question leans on an earlier answer with "that", "still" or "those"', () => {
  for (const id of ALL_QUESTIONS) {
    for (const c of CONTEXTS) assert.doesNotMatch(COPY.questions[id].ask(c), /\b(that|still|those)\b/i, `${id}: ${COPY.questions[id].ask(c)}`);
  }
});

test('E6 has no count field, and F6 and E6 set the line', () => {
  assert.equal(COPY.questions.E6.counts, undefined);
  assert.equal(COPY.questions.F6.line, true);
  assert.equal(COPY.questions.E6.line, true);
});

test('the end screen buttons and the next-step line use the label, the builder\'s wording or the fallback', () => {
  const E = COPY.end;
  assert.equal(E.ask(LABEL), 'Ask M. about the last time');
  assert.equal(E.ask(SELF), 'Ask someone who runs into this');
  assert.equal(E.ask(NONE), 'Ask someone who runs into this');
  assert.equal(E.ask(PENDING), 'Ask the person you named about the last time');
  assert.equal(E.show(LABEL), 'Show it to your football friends');
  assert.equal(E.show(PENDING), 'Show it to the people you named');
  assert.match(E.next.fix(LABEL), /^What's next: ask M\. about the last time/);
  assert.match(E.next.fix(SELF), /^What's next: ask someone who runs into this/);
  assert.match(E.next.fix(PENDING), /ask the person you named/);
  assert.match(E.next.experiment(LABEL), /let your football friends try it/);
  assert.match(E.next.experiment(PENDING), /let the people you named try it/);
  assert.equal(E.experiment.line, "You'd keep going if");
  assert.equal(E.fix.line, "You'd drop it if");
});

test('no new line carries a dash', () => {
  const all = JSON.stringify(COPY, (k, v) => typeof v === 'function' ? CONTEXTS.map(c => { try { return v(c); } catch { return ''; } }).join(' ') : v);
  assert.doesNotMatch(all, /[—–]| - /);
});

test('the planned day reads the same before and after it', () => {
  const step = { when: 'day', day: '2026-11-12' };
  assert.equal(COPY.planned(step, '2026-11-07'), 'Planned for Thursday');
  assert.equal(COPY.planned(step, '2026-11-12'), 'Planned for today');
  assert.equal(COPY.planned(step, '2026-11-13'), 'Planned for Thursday');
  assert.equal(COPY.planned(step, '2026-12-01'), 'Planned for Thursday 12 Nov');
  assert.equal(COPY.planned({ when: 'this_week', day: '2026-11-08' }, '2026-11-07'), 'Planned for this week');
  assert.equal(COPY.planned({ when: 'this_week', day: '2026-11-08' }, '2026-11-10'), 'Planned for the week of 2 Nov');
  assert.equal(COPY.end.saved('Planned for Thursday'), "Planned for Thursday. It's on this bottle in your cellar.");
});

// ── B1c: first_session_v2 ──
const V2 = COPY.v2;
const V2_CONTEXTS = [
  { self: false, person: 'your grandpa', personPending: false, plan: { label: 'your grandpa', pending: false, none: false }, people: 'your football friends', peoplePending: false },
  { self: true, person: null, personPending: false, plan: { label: null, pending: false, none: true }, people: null, peoplePending: false },
  { self: false, person: null, personPending: false, plan: { label: null, pending: false, none: true }, people: null, peoplePending: false },
  { self: false, person: null, personPending: true, plan: { label: null, pending: true, none: false }, people: null, peoplePending: true }
];

// Fallbacks are fixed copy and are never checked on the way to the screen. F1's, as the brief words
// it, is two sentences ("...run into this? It can be you."), so the question-mark rule doesn't fit it.
test('v2: every fallback but F1 passes the check a written question has to pass', () => {
  for (const [slot, f] of Object.entries(V2.fallback)) {
    for (const c of V2_CONTEXTS) {
      const failed = V2.check(f(c), slot[0] === 'F' ? 'fix' : 'experiment');
      assert.equal(failed, slot === 'F1' ? 'question_mark' : null, `${slot}: ${f(c)}`);
    }
  }
});

test('v2: the check refuses two questions, no question mark, more than 25 words, a dash, and experiment problem words', () => {
  assert.equal(V2.check('What did he do? When?', 'fix'), 'question_mark');
  assert.equal(V2.check('Tell me what he did.', 'fix'), 'question_mark');
  assert.equal(V2.check(Array(26).fill('word').join(' ') + '?', 'fix'), 'too_long');
  assert.equal(V2.check('The garden - what did he do?', 'fix'), 'dash');
  assert.equal(V2.check('What need does the quiz meet?', 'experiment'), 'experiment_word');
  assert.equal(V2.check('What need does it meet?', 'fix'), null);
  assert.equal(V2.check("The last time your grandpa's garden needed work, what did he do?", 'fix'), null);
});

test('v2: fallbacks for the builder say "you", and none names a person nobody named', () => {
  const [, self, none] = V2_CONTEXTS;
  assert.match(V2.fallback.F2(self), /\byou\b/);
  assert.doesNotMatch(V2.fallback.F2(self), /\bthey\b/);
  assert.equal(V2.fallback.F2(none), 'What did you see go wrong, and when?');
  assert.match(V2.fallback.F5(none), /someone/);
  assert.match(V2.plan.F6(none), /someone who has this problem/);
});

test('v2: the end screen, the plan step and the confirmation use the label, the builder\'s wording or the fallback', () => {
  const [label, self, none, pending] = V2_CONTEXTS;
  const E = V2.end;
  assert.equal(E.ask(label), 'Ask your grandpa');
  assert.equal(E.ask(pending), 'Ask the person you named');
  assert.equal(E.ask(self), 'Ask someone');
  assert.equal(E.ask(none), 'Ask someone');
  assert.match(E.next.fix(label), /^What's next: ask your grandpa what happened/);
  assert.match(E.next.fix(self), /^What's next: find someone who has this problem/);
  assert.equal(V2.plan.F6(label), "Finish the sentence: I'd drop it if your grandpa told me...");
  assert.equal(V2.plan.F6(pending), "Finish the sentence: I'd drop it if they told me...");
  assert.match(V2.plan.E6(label), /^What would your football friends have to do/);
  assert.match(V2.plan.E6(pending), /^What would they have to do/);
  assert.equal(V2.confirm.planned('Planned for Tuesday', V2.stepWords('ask', label)), 'Planned for Tuesday: ask your grandpa.');
  assert.equal(V2.stepWords('show', label), 'show it to your football friends');
  assert.equal(V2.stepWords('show', none), 'show it to a few people');
  assert.equal(V2.stepWords('build', label), 'build the simplest version');
});

test('v2: no fixed line carries a dash, and no experiment line mentions a problem', () => {
  const all = JSON.stringify(V2, (k, v) => typeof v === 'function' ? V2_CONTEXTS.map(c => { try { return v(c); } catch { return ''; } }).join(' ') : v);
  assert.doesNotMatch(all.replace(/\\s-\\s\|--/g, ''), /[—–]| - /);
  for (const slot of ['E1', 'E2', 'E3']) for (const c of V2_CONTEXTS) assert.doesNotMatch(V2.fallback[slot](c), /\b(problem|need|wrong|stopped)/i);
  assert.doesNotMatch(V2.plan.E4 + V2_CONTEXTS.map(c => V2.plan.E6(c)).join(' ') + V2.end.next.experiment(), /\b(problem|need|wrong|stopped)/i);
});
