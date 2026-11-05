// The Provenance Rule, tested with plain strings. No model, no worker.
import test from 'node:test';
import assert from 'node:assert/strict';
import '../shared/provenance.js';

const { anchorSpan, verifyAnchor, quotedSpan, unsupportedWords } = globalThis.CorkedProvenance;

test('an anchor differing only in case gets the answer\'s own text', () => {
  const answer = 'Marcus flags anything unpaid after a week. For her the pain is matching payments to invoices.';
  assert.equal(anchorSpan('for her the pain is matching payments to invoices', answer),
    'For her the pain is matching payments to invoices');
});

test('spacing and curly quotes do not split a verdict', () => {
  assert.equal(anchorSpan('she doesn’t  chase', "She doesn't chase them"), "She doesn't chase");
  assert.equal(anchorSpan('called the\nclient', 'he called the client'), 'called the client');
});

test('end punctuation stays when the answer has it, and never blocks a match', () => {
  assert.equal(anchorSpan('called the client.', 'He called the client. Then left.'), 'called the client.');
  assert.equal(anchorSpan('"called the client"', 'He called the client. Then left.'), 'called the client');
});

test('words that are not in the answer are not on record', () => {
  assert.equal(anchorSpan('called the customer', 'He called the client.'), null);
  assert.equal(anchorSpan('', 'He called the client.'), null);
  assert.equal(anchorSpan(null, 'He called the client.'), null);
  assert.equal(anchorSpan('He called', ''), null);
});

test('a match covers whole words', () => {
  assert.equal(anchorSpan('pay', 'He sent the payment.'), null);
  assert.equal(anchorSpan('the pay', 'He sent the payment.'), null);
  assert.equal(anchorSpan('payment', 'He sent the payment.'), 'payment');
});

test('an anchor under three characters anchors nothing', () => {
  assert.equal(anchorSpan('he', 'he called'), null);
  assert.equal(anchorSpan('she', 'she called'), 'she');
});

test('holding words has no minimum length, and still needs whole words', () => {
  const { holds } = globalThis.CorkedProvenance;
  assert.equal(holds('HR', 'An app for HR'), true);
  assert.equal(holds('hr.', 'An app for HR'), true);
  assert.equal(holds('scheduling', 'An app for rescheduling'), false);
  assert.equal(holds('', 'An app for HR'), false);
  assert.equal(holds('HR', ''), false);
});

test('verifyAnchor writes the verdict back', () => {
  const held = { anchor_span: 'for her' };
  assert.equal(verifyAnchor(held, 'anchor_span', 'For her it is fine'), true);
  assert.equal(held.anchor_span, 'For her');

  const dropped = { anchor_span: 'not there' };
  assert.equal(verifyAnchor(dropped, 'anchor_span', 'For her it is fine'), false);
  assert.equal(dropped.anchor_span, null);

  assert.equal(verifyAnchor({ anchor_span: null }, 'anchor_span', 'x'), false);
  assert.equal(verifyAnchor(undefined, 'anchor_span', 'x'), false);
});

test('a quote is at least three words, whole, and leaves its end punctuation out', () => {
  const spark = "Moneybird's payment reminders only go out late.";
  assert.equal(quotedSpan('payment reminders only', [spark]), 'payment reminders only');
  assert.equal(quotedSpan('PAYMENT reminders only go out late.', [spark]), 'payment reminders only go out late');
  assert.equal(quotedSpan('payment reminders', [spark]), null);
  assert.equal(quotedSpan('payment reminder only', [spark]), null);
  assert.equal(quotedSpan('reminders only go', ['nothing here', spark]), 'reminders only go');
});

test('never-invent: a guess may add framing words, nothing else', () => {
  const spark = 'Gym owners schedule classes with spreadsheets';
  assert.deepEqual(unsupportedWords('Gym owners have trouble scheduling classes', spark), []);
  assert.deepEqual(unsupportedWords('Gym owners have trouble scheduling with existing apps', spark), ['existing', 'apps']);
});

test('never-invent: a scene problem uses the scene\'s words and pronouns only', () => {
  const scene = 'I lost the invoice';
  assert.deepEqual(unsupportedWords('I lost the invoice', scene, { scene: true }), []);
  assert.deepEqual(unsupportedWords('She lost the invoice', scene, { scene: true }), ['she']);
  assert.deepEqual(unsupportedWords('I keep the invoice', scene, { scene: true }), ['keep']);
});

test('never-invent: stems of four letters or more match longer forms', () => {
  assert.deepEqual(unsupportedWords('cancels', 'cancel', { scene: true }), []);
  assert.deepEqual(unsupportedWords('cancellation', 'cancel', { scene: true }), []);
});
