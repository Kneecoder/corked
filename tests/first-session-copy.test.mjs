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
