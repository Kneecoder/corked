// The mechanism table: the doctrine calls it has to hold, and the shape its readers rely on.
import test from 'node:test';
import assert from 'node:assert/strict';
import '../shared/mechanisms.js';

const M = globalThis.CorkedMechanisms;

test('the mechanisms run M1 to M7, each on its own route', () => {
  assert.deepEqual(M.ORDER, ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7']);
  for (const id of M.ORDER) assert.equal(M.get(id).route, `/${id.toLowerCase()}`);
});

test('v48, 21 Oct: the Vintage comes from M2 only', () => {
  assert.deepEqual(M.movers('vintage'), ['M2']);
  for (const id of ['M3', 'M4', 'M5', 'M6', 'M7']) {
    assert.equal(M.elements(id).includes('vintage'), false, id);
    assert.equal(M.bars(id).includes('vintage'), false, id);
  }
});

test('v48, 21 Oct: the Vintage reopens through M2, even where an older bottle says M3 last moved it', () => {
  assert.equal(M.reopenSource('vintage', { vintage: 'M3' }), 'M2');
  assert.equal(M.reopenSource('vintage', undefined), 'M2');
});

test('v48, 5 Oct: in self mode M6 can\'t touch the Echo', () => {
  assert.deepEqual(M.elements('M6', { selfMode: true }), ['tell']);
  assert.deepEqual(M.elements('M6', { selfMode: false }), ['tell', 'echo']);
  assert.deepEqual(M.bars('M6', { selfMode: true }), ['words', 'tell']);
  assert.deepEqual(M.bars('M6', { selfMode: false }), ['words', 'tell', 'echo']);
});

test('the Gap counts at M2 only when in play', () => {
  assert.deepEqual(M.elements('M2', { gapInPlay: false }), ['tell', 'vintage']);
  assert.deepEqual(M.elements('M2', { gapInPlay: true }), ['tell', 'vintage', 'gap']);
  assert.deepEqual(M.bars('M2', { gapInPlay: true }), ['tell', 'vintage', 'gap']);
});

test('M6\'s Words is a bar and not an element', () => {
  assert.equal(M.bars('M6').includes('words'), true);
  assert.deepEqual(M.movers('words'), []);
});

test('an element reopens through whichever mechanism last graded it, else where it starts', () => {
  assert.equal(M.reopenSource('echo', {}), 'M3');
  assert.equal(M.reopenSource('echo', { echo: 'M6' }), 'M6');
  assert.equal(M.reopenSource('tell', undefined), 'M2');
  assert.equal(M.reopenSource('tell', { tell: 'M6' }), 'M6');
  assert.equal(M.reopenSource('gap', {}), 'M5');
  assert.equal(M.reopenSource('gap', { gap: 'M2' }), 'M2');
  assert.equal(M.reopenSource('limit', {}), 'M7');
  assert.equal(M.reopenSource('grape', {}), 'M1');
});

test('every bar with a primary bar lists it, and M2 alone has none besides M1', () => {
  for (const id of M.ORDER) {
    const { primaryBar } = M.get(id);
    if (primaryBar) assert.ok(M.bars(id).includes(primaryBar), id);
    else assert.ok(id === 'M1' || id === 'M2', id);
  }
});

test('every anchor path includes the observation, and M4 anchors its contrast', () => {
  for (const id of M.ORDER) assert.ok(M.anchors(id).includes('observation'), id);
  assert.deepEqual(M.anchors('M4'), ['echo', 'contrast', 'observation']);
});

test('every element a mechanism moves has a row of copy', () => {
  for (const id of M.ORDER.slice(1)) {
    for (const key of M.elements(id, { gapInPlay: true })) {
      const row = M.get(id).copy.rows[key];
      assert.ok(Array.isArray(row) && row.length === 2, `${id} ${key}`);
    }
  }
});

test('every errand has what a park needs', () => {
  for (const id of M.ORDER.slice(1)) {
    const { errand } = M.get(id);
    assert.equal(typeof errand.label, 'string', id);
    assert.equal(typeof errand.mode, 'string', id);
    assert.equal(typeof errand.element({}), 'string', id);
    assert.equal(typeof errand.fallback({ grapeName: 'Sam', grapeRef: 'Sam', problemOnRecord: true }), 'string', id);
  }
});

test('self errands go where the grape is the one to ask: M2, M5 and M6', () => {
  assert.deepEqual(M.ORDER.filter(id => M.get(id).errand?.selfErrand), ['M2', 'M5', 'M6']);
});

test('M2\'s errand asks about the Gap while it is in play and not settled', () => {
  const { element } = M.get('M2').errand;
  assert.equal(element({ gapInPlay: true, gapState: 'clearing' }), 'gap');
  assert.equal(element({ gapInPlay: true, gapState: 'settled' }), 'tell');
  assert.equal(element({ gapInPlay: false, gapState: 'clearing' }), 'tell');
});

test('M2\'s fallback: no problem on record gives the open errand', () => {
  const { fallback } = M.get('M2').errand;
  assert.equal(fallback({ problemOnRecord: false, openErrandText: 'open', m2Question: 'q' }), 'open');
  assert.equal(fallback({ problemOnRecord: true, selfErrand: true, openErrandText: 'open', m2Question: 'q' }), 'open');
  assert.equal(fallback({ problemOnRecord: true, openErrandText: 'open', m2Question: 'q' }), 'q');
  assert.match(fallback({ problemOnRecord: true, openErrandText: 'open', grapeName: 'Sam' }), /^Ask Sam: /);
});

test('copy: self mode is in the second person and names nobody', () => {
  for (const id of ['M3', 'M4', 'M6']) {
    const self = M.get(id).copy.question({ selfMode: true, grapeName: 'Sam' });
    assert.equal(self.includes('Sam'), false, id);
    assert.ok(M.get(id).copy.question({ grapeName: 'Sam' }).includes('Sam'), id);
  }
  assert.equal(M.get('M2').copy.goFind({ selfMode: true, grapeName: 'Sam' }), '');
  assert.equal(M.get('M6').copy.goFind({ selfMode: true, grapeName: 'Sam' }), '');
});

test('copy: no dashes in anything a builder reads', () => {
  const dash = /[—–]/;
  for (const id of M.ORDER) {
    const { copy, errand, name } = M.get(id);
    assert.equal(dash.test(name), false, `${id} name`);
    for (const selfMode of [true, false]) {
      assert.equal(dash.test(copy.question({ selfMode, grapeName: 'Sam', grape: 'Sam' })), false, `${id} question`);
      if (copy.goFind) assert.equal(dash.test(copy.goFind({ selfMode, grapeName: 'Sam' })), false, `${id} goFind`);
    }
    if (errand) assert.equal(dash.test(errand.fallback({ grapeName: 'Sam', grapeRef: 'Sam', problemOnRecord: true })), false, `${id} fallback`);
  }
  assert.equal(dash.test(M.SELF_ERRAND_TEXT), false);
});
