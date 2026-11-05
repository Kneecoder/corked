// The cellar clock with the time set by the test. Dates are local time, as the app's are.
import test from 'node:test';
import assert from 'node:assert/strict';
import '../shared/cellar-clock.js';

const { createCellarClock } = globalThis.CorkedCellarClock;

const at = (...args) => new Date(2026, ...args);
const clockAt = (date, options = {}) => createCellarClock({ now: () => date.getTime(), ...options });
const local = iso => new Date(iso);

const DAILY = 0, EVERY_OTHER = 1, WEEKLY = 2, MONTHLY = 3;
const MORNING = 0, MIDDAY = 1, EVENING = 2, LATE = 3;

test('a question comes back on the due day at the start of the part of the day', () => {
  const clock = clockAt(at(10, 3, 14, 30));   // Tue 3 Nov, 14:30
  const next = local(clock.nextReturnAt(WEEKLY, EVENING));
  assert.deepEqual([next.getMonth(), next.getDate(), next.getHours(), next.getMinutes()], [10, 10, 18, 0]);
  assert.equal(local(clock.nextReturnAt(DAILY, MORNING)).getDate(), 4);
  assert.equal(local(clock.nextReturnAt(EVERY_OTHER, MIDDAY)).getDate(), 5);
  assert.equal(local(clock.nextReturnAt(MONTHLY, LATE)).getHours(), 22);
});

test('v48, 10 Oct: an answer before 05:00 counts as the previous day', () => {
  const before = local(clockAt(at(10, 4, 4, 59)).nextReturnAt(DAILY, MORNING));
  assert.equal(before.getDate(), 4);
  const after = local(clockAt(at(10, 4, 5, 0)).nextReturnAt(DAILY, MORNING));
  assert.equal(after.getDate(), 5);
});

test('no pace yet counts as weekly, no part of the day as morning', () => {
  const next = local(clockAt(at(10, 3, 12)).nextReturnAt(-1, -1));
  assert.deepEqual([next.getDate(), next.getHours()], [10, 9]);
});

test('rhythm-test mode brings every question back after two minutes', () => {
  const date = at(10, 3, 12);
  const next = local(clockAt(date, { testMode: true }).nextReturnAt(MONTHLY, LATE));
  assert.equal(next.getTime() - date.getTime(), 2 * 60000);
});

test('the wording for a held question counts cellar days', () => {
  const clock = clockAt(at(10, 3, 14));   // Tue 14:00
  assert.equal(clock.nextQuestionWording(at(10, 3, 18).toISOString(), EVENING), 'this evening');
  assert.equal(clock.nextQuestionWording(at(10, 4, 9).toISOString(), MORNING), 'tomorrow morning');
  assert.equal(clock.nextQuestionWording(at(10, 4, 13).toISOString(), MIDDAY), 'tomorrow at midday');
  assert.equal(clock.nextQuestionWording(at(10, 4, 22).toISOString(), LATE), 'late tomorrow');
  assert.equal(clock.nextQuestionWording(at(10, 10, 9).toISOString(), MORNING), 'in 7 days, in the morning');
});

test('one definition of a day: at 01:00 the morning ahead is tomorrow morning, same as the comeback rule', () => {
  const clock = clockAt(at(10, 4, 1));   // Wed 01:00 still counts as Tuesday
  const due = clock.nextReturnAt(DAILY, MORNING);
  assert.equal(local(due).getDate(), 4);
  assert.equal(clock.nextQuestionWording(due, MORNING), 'tomorrow morning');
  assert.equal(clock.nextQuestionWording(clock.nextReturnAt(EVERY_OTHER, MORNING), MORNING), 'in 2 days, in the morning');
});

test('a time off the part of the day gets the day alone', () => {
  const clock = clockAt(at(10, 3, 14));
  assert.equal(clock.nextQuestionWording(at(10, 3, 16).toISOString(), EVENING), 'today');
  assert.equal(clock.nextQuestionWording(at(10, 4, 16).toISOString(), EVENING), 'tomorrow');
  assert.equal(clock.nextQuestionWording(at(10, 8, 16).toISOString(), EVENING), 'in 5 days');
});

test('rhythm-test mode counts the last hour in minutes', () => {
  const clock = clockAt(at(10, 3, 14), { testMode: true });
  assert.equal(clock.nextQuestionWording(at(10, 3, 14, 2).toISOString(), MORNING), 'in 2 minutes');
  assert.equal(clock.nextQuestionWording(at(10, 3, 14, 0, 30).toISOString(), MORNING), 'in 1 minute');
});

test('the due wording says ready once the time has passed', () => {
  const clock = clockAt(at(10, 3, 14));
  assert.equal(clock.dueWording(at(10, 3, 13).toISOString(), MORNING), 'Question ready');
  assert.equal(clock.dueWording('not a date', MORNING), 'Question ready');
  assert.equal(clock.dueWording(at(10, 4, 9).toISOString(), MORNING), 'Next question tomorrow morning');
});

test('the parked note reads minutes, hours, then cellar days', () => {
  const clock = clockAt(at(10, 3, 23));   // Tue 23:00
  assert.equal(clock.lockedWording('not a date'), 'soon');
  assert.equal(clock.lockedWording(at(10, 3, 22).toISOString()), 'now');
  assert.equal(clock.lockedWording(at(10, 3, 23, 0, 20).toISOString()), 'in under a minute');
  assert.equal(clock.lockedWording(at(10, 3, 23, 1).toISOString()), 'in 1 minute');
  assert.equal(clock.lockedWording(at(10, 3, 23, 30).toISOString()), 'in 30 minutes');
  assert.equal(clock.lockedWording(at(10, 4, 1).toISOString()), 'in 2 hours');
  // 34 hours away, and two cellar days away: the same count the next-question wording gives.
  assert.equal(clock.lockedWording(at(10, 5, 9).toISOString()), 'in 2 days');
  assert.equal(clock.nextQuestionWording(at(10, 5, 9).toISOString(), MORNING), 'in 2 days, in the morning');
});

test('behind pace counts whole pace-lengths since the question opened', () => {
  const opened = at(10, 3, 23).toISOString();   // Tue 23:00
  assert.equal(clockAt(at(10, 4, 22, 59)).paceLengthsSince(DAILY, opened), 0);
  assert.equal(clockAt(at(10, 4, 23)).paceLengthsSince(DAILY, opened), 1);
  assert.equal(clockAt(at(10, 6, 23)).paceLengthsSince(DAILY, opened), 3);
  assert.equal(clockAt(at(10, 6, 23)).paceLengthsSince(EVERY_OTHER, opened), 1);
  assert.equal(clockAt(at(10, 10, 22)).paceLengthsSince(WEEKLY, opened), 0);
  assert.equal(clockAt(at(10, 10, 23)).paceLengthsSince(WEEKLY, opened), 1);
});

test('behind pace: no pace or no opening time counts for nothing', () => {
  const clock = clockAt(at(10, 3, 23));
  assert.equal(clock.paceLengthsSince(-1, at(10, 1, 9).toISOString()), 0);
  assert.equal(clock.paceLengthsSince(DAILY, null), 0);
  assert.equal(clock.paceLengthsSince(DAILY, 'not a date'), 0);
});

test('rhythm-test mode collapses the pace-lengths', () => {
  const date = at(10, 3, 12);
  const clock = clockAt(date, { testMode: true });
  assert.equal(clock.paceLengthsSince(DAILY, new Date(date.getTime() - 45000).toISOString()), 3);
  assert.equal(clock.paceLengthsSince(MONTHLY, new Date(date.getTime() - 119000).toISOString()), 0);
});

test('card dates count cellar days', () => {
  const clock = clockAt(at(10, 4, 8));   // Wed 08:00
  assert.equal(clock.cardDate(null), '');
  assert.equal(clock.cardDate('not a date'), '');
  assert.equal(clock.cardDate(at(10, 4, 7).toISOString()), 'today');
  assert.equal(clock.cardDate(at(10, 3, 23).toISOString()), 'yesterday');
  assert.equal(clock.cardDate(at(10, 4, 2).toISOString()), 'yesterday');
  assert.equal(clock.cardDate(at(10, 1, 9).toISOString()), '3 days ago');
  assert.notEqual(clock.cardDate(at(9, 1, 9).toISOString()), '');
});

test('one pace table: every label and cadence reads from it', () => {
  const clock = clockAt(at(10, 3, 12));
  assert.deepEqual(clock.paces.map(p => p.label), ['Daily', 'Any other day', 'Weekly', 'Monthly']);
  assert.equal(clock.paceLabel(EVERY_OTHER), 'Any other day');
  assert.equal(clock.paceLabel(9), undefined);
  assert.equal(clock.rhythmShort(EVERY_OTHER, MORNING), 'every other day in the morning');
  assert.equal(clock.rhythmShort(DAILY, LATE), 'daily late');
  assert.equal(clock.rhythmShort(9, 9), 'on rhythm');
  assert.equal(clock.rhythmSummary(EVERY_OTHER, MIDDAY), 'Every other day, at midday. Corked will bring the next question back every other day at midday.');
  assert.equal(clock.rhythmSummary(9, 9), 'Weekly, in the morning. Corked will bring the next question back weekly in the morning.');
});

test('the clock reads the time it is given, every time it is asked', () => {
  let time = at(10, 3, 12).getTime();
  const clock = createCellarClock({ now: () => time });
  const due = at(10, 3, 13).toISOString();
  assert.equal(clock.isAhead(due), true);
  time = at(10, 3, 13, 1).getTime();
  assert.equal(clock.isAhead(due), false);
  assert.equal(clock.nowIso(), new Date(time).toISOString());
});
