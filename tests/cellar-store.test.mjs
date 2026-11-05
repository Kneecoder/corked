// The cellar store on an in-memory stand-in for localStorage.
import test from 'node:test';
import assert from 'node:assert/strict';
import '../shared/cellar-store.js';

const { createCellarStore, CELLAR_KEY } = globalThis.CorkedCellarStore;

function memoryStorage() {
  const data = new Map();
  return {
    writes: 0,
    getItem: k => (data.has(k) ? data.get(k) : null),
    setItem(k, v) { this.writes++; data.set(k, String(v)); },
    raw: k => data.get(k)
  };
}

function storeAt(startTime = 1000) {
  let time = startTime;
  const storage = memoryStorage();
  const store = createCellarStore(storage, { now: () => new Date(time).toISOString() });
  return { store, storage, tick: () => { time += 1000; } };
}

const bottleState = (extra = {}) => ({ idea: 'a spark', qLifecycle: 'active', answers: {}, ...extra });

test('the store writes under the app\'s key, in the shape the app has always stored', () => {
  const { store, storage } = storeAt();
  store.save('b1', bottleState(), 2);
  const stored = JSON.parse(storage.raw(CELLAR_KEY));
  assert.equal(CELLAR_KEY, 'corked-cellar-v1');
  assert.equal(stored.length, 1);
  assert.deepEqual(Object.keys(stored[0]).sort(), ['created_at', 'id', 'mechIndex', 's', 'status', 'updated_at']);
  assert.equal(stored[0].mechIndex, 2);
  assert.equal(stored[0].status, 'active');
});

test('a broken or empty cellar reads as empty', () => {
  const storage = memoryStorage();
  const store = createCellarStore(storage);
  assert.deepEqual(store.all(), []);
  storage.setItem(CELLAR_KEY, 'not json');
  assert.deepEqual(store.all(), []);
  storage.setItem(CELLAR_KEY, '{"not":"a list"}');
  assert.deepEqual(store.all(), []);
  assert.equal(store.get('nope'), null);
});

test('the first save creates the bottle, even when nothing else has been stored', () => {
  const { store } = storeAt();
  store.save('b1', bottleState(), 0);
  assert.equal(store.get('b1').id, 'b1');
  assert.equal(store.get('b1').created_at, store.get('b1').updated_at);
});

test('a save that changes nothing keeps the card date and doesn\'t write', () => {
  const { store, storage, tick } = storeAt();
  const s = bottleState();
  store.save('b1', s, 1);
  const before = store.get('b1').updated_at;
  const writes = storage.writes;
  tick();
  store.save('b1', s, 1);
  assert.equal(store.get('b1').updated_at, before);
  assert.equal(storage.writes, writes);
});

test('a save that changes something moves the card date', () => {
  const { store, tick } = storeAt();
  const s = bottleState();
  store.save('b1', s, 1);
  const before = store.get('b1').updated_at;
  tick();
  s.answers.M2 = 'an answer';
  store.save('b1', s, 1);
  assert.notEqual(store.get('b1').updated_at, before);
  assert.equal(store.get('b1').s.answers.M2, 'an answer');
  const after = store.get('b1').updated_at;
  tick();
  store.save('b1', s, 2);
  assert.notEqual(store.get('b1').updated_at, after);
  assert.equal(store.get('b1').mechIndex, 2);
});

test('a dormant park keeps its brief and return time through a save, and clears them on leaving', () => {
  const { store } = storeAt();
  const s = bottleState();
  store.save('b1', s, 3);
  store.park('b1', { s, mechIndex: 3, status: 'dormant', brief: { question: 'q' }, nextQuestionAt: 'later', parkMech: 'M3' });
  let b = store.get('b1');
  assert.equal(b.status, 'dormant');
  assert.deepEqual(b.brief, { question: 'q' });
  assert.equal(b.nextQuestionAt, 'later');
  assert.equal(b.s.qLifecycle, 'parked');
  assert.equal(b.s.parkKind, 'dormant');
  assert.equal(b.s.parkMech, 'M3');

  store.save('b1', s, 3);
  assert.deepEqual(store.get('b1').brief, { question: 'q' });

  s.qLifecycle = 'answered';
  store.save('b1', s, 3);
  b = store.get('b1');
  assert.equal(b.status, 'active');
  assert.equal(b.brief, null);
  assert.equal(b.nextQuestionAt, null);
});

test('an in-flight park reads as in flight', () => {
  const { store } = storeAt();
  const s = bottleState();
  store.park('b1', { s, mechIndex: 2, status: 'in_flight', brief: { question: 'q' }, nextQuestionAt: null });
  assert.equal(store.get('b1').status, 'in_flight');
  store.save('b1', s, 2);
  assert.equal(store.get('b1').status, 'in_flight');
});

test('a park on a bottle that was never saved still records it', () => {
  const { store } = storeAt();
  const s = bottleState();
  store.park('new', { s, mechIndex: 0, status: 'dormant', brief: { pending: true }, nextQuestionAt: 'later' });
  assert.equal(store.get('new').mechIndex, 0);
  assert.equal(store.get('new').status, 'dormant');
});

test('waking stores the corrected state together with the outer fields', () => {
  const { store } = storeAt();
  const s = bottleState();
  store.park('b1', { s, mechIndex: 3, status: 'dormant', brief: { question: 'q' }, nextQuestionAt: 'later', parkMech: 'M3' });
  store.wake('b1', s);
  const b = store.get('b1');
  assert.equal(b.status, 'active');
  assert.equal(b.brief, null);
  assert.equal(b.nextQuestionAt, null);
  assert.equal(b.s.qLifecycle, 'active');
  assert.equal(b.s.parkKind, null);
  assert.equal(b.s.parkMech, null);
  assert.equal(s.qLifecycle, 'active');
});

test('an archived bottle stays archived through saves', () => {
  const { store } = storeAt();
  const s = bottleState();
  store.save('b1', s, 7);
  store.archive('b1');
  assert.equal(store.get('b1').status, 'rested');
  s.answers.M7 = 'late';
  store.save('b1', s, 7);
  assert.equal(store.get('b1').status, 'rested');
});

test('a stall ack keeps the clock it was taken against and doesn\'t move the card date', () => {
  const { store, tick } = storeAt();
  store.save('b1', bottleState(), 1);
  const before = store.get('b1').updated_at;
  tick();
  store.ackStall('b1', 'the clock');
  const b = store.get('b1');
  assert.equal(b.stallAckClock, 'the clock');
  assert.ok(b.stallAckAt);
  assert.equal(b.updated_at, before);
});

test('a new brief lands on its own bottle', () => {
  const { store } = storeAt();
  store.save('b1', bottleState(), 1);
  store.save('b2', bottleState(), 1);
  store.setBrief('b2', { question: 'q' });
  assert.equal(store.get('b1').brief, undefined);
  assert.deepEqual(store.get('b2').brief, { question: 'q' });
});

test('changes to a bottle that isn\'t there do nothing', () => {
  const { store, storage } = storeAt();
  store.setBrief('gone', {});
  store.archive('gone');
  store.ackStall('gone', 'x');
  store.wake('gone', bottleState());
  assert.equal(storage.writes, 0);
});

test('removing takes one bottle out and leaves the rest', () => {
  const { store } = storeAt();
  store.save('b1', bottleState(), 1);
  store.save('b2', bottleState(), 1);
  store.remove('b1');
  assert.equal(store.get('b1'), null);
  assert.ok(store.get('b2'));
});

test('a stored export keeps loading: extra fields are left alone', () => {
  const { store, storage } = storeAt();
  storage.setItem(CELLAR_KEY, JSON.stringify([{ id: 'old', status: 'active', s: bottleState(), mechIndex: 4, updated_at: 'then', created_at: 'then', stallAckUpdatedAt: 'kept' }]));
  store.save('old', bottleState({ answers: { M4: 'new' } }), 4);
  const b = store.get('old');
  assert.equal(b.stallAckUpdatedAt, 'kept');
  assert.equal(b.created_at, 'then');
  assert.equal(b.s.answers.M4, 'new');
});
