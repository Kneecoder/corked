import test from 'node:test';
import assert from 'node:assert/strict';
import '../shared/first-session-copy.js';

const COPY = globalThis.CorkedFirstSessionCopy;
const CONTEXTS = [
  { self: false, person: 'M.', people: 'Sam and Priya' },
  { self: true, person: null, people: null },
  { self: false, person: null, people: null }
];

test('no experiment question mentions a problem, a need or something going wrong', () => {
  for (const id of ['E1', 'E2', 'E3', 'E4', 'E5', 'E6']) {
    const q = COPY.questions[id];
    for (const c of CONTEXTS) {
      const words = [q.ask(c), ...(q.taps || []).map(t => t.label), q.linkLabel || '', q.counts?.label || ''].join(' ');
      assert.doesNotMatch(words, /\b(problem|need|wrong|stopped)/i, `${id}: ${words}`);
    }
  }
});

test('a question that names the person reads right as a whole in every case', () => {
  for (const id of ['F2', 'F3', 'F5']) {
    const [named, self, none] = CONTEXTS.map(c => COPY.questions[id].ask(c));
    assert.match(named, /M\./, id);
    assert.doesNotMatch(self, /\bthey\b|\bnull\b|undefined/, id);
    assert.doesNotMatch(none, /\bnull\b|undefined/, id);
  }
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
});
