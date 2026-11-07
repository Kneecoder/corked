// The worker's own checks, driven by recorded model replies through the replay adapter. No key, no
// cost. This adds a check on the worker's code. It does not replace a scripted run a brief asks for.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import worker from '../worker.js';
import { createReplayAdapter, createAnthropicAdapter } from '../model-adapters.js';

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASELINE = path.join(REPO, 'runs', '2026-10-21-model-bakeoff', 'claude-sonnet-4-6');
const ENV = { ANTHROPIC_MODEL: 'replay', ALLOWED_ORIGINS: 'http://localhost:8080' };

function request(pathname, body) {
  return new Request('https://worker.test' + pathname, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:8080' },
    body: JSON.stringify(body)
  });
}

async function replay(pathname, body, replies) {
  const res = await worker.fetch(request(pathname, body), { ...ENV, modelAdapter: createReplayAdapter(replies) });
  return { status: res.status, body: await res.json() };
}

const reply = obj => JSON.stringify(obj);
const PROBLEM = { text: 'Invoices get paid late', source: 'user_stated', status: 'confirmed' };

function recordedEntries() {
  const out = [];
  for (const run of fs.readdirSync(BASELINE)) {
    const dir = path.join(BASELINE, run);
    if (!fs.statSync(dir).isDirectory()) continue;
    for (const f of fs.readdirSync(dir)) {
      if (!/^spark-\d+\.json$/.test(f)) continue;
      const rec = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      for (const entry of rec.run.log) {
        const calls = entry.calls?.calls;
        if (!entry.endpoint || !entry.request || !Array.isArray(calls) || !calls.length) continue;
        if (!calls.every(c => c.status === 200 && typeof c.text === 'string')) continue;
        out.push({ where: `${run}/${f} ${entry.endpoint}`, entry, replies: calls.map(c => c.text) });
      }
    }
  }
  return out;
}

const statesOf = body => Object.fromEntries(Object.entries(body)
  .filter(([, v]) => v && typeof v === 'object' && 'state' in v)
  .map(([k, v]) => [k, v.state]));

test('recorded replies grade as they were recorded', { concurrency: false }, async () => {
  const entries = recordedEntries();
  assert.ok(entries.length > 100, `expected recorded replies, found ${entries.length}`);
  const log = console.log;
  const warn = console.warn;
  console.log = console.warn = () => {};
  try {
    for (const { where, entry, replies } of entries) {
      const { status, body } = await replay(entry.endpoint.split(' ')[0], entry.request, replies);
      assert.equal(status, 200, where);
      assert.deepEqual(statesOf(body), statesOf(entry.response), where);
      assert.equal(body.state, entry.response.state, where);
    }
  } finally {
    console.log = log;
    console.warn = warn;
  }
});

test('an anchor that differs only in case stays on record, in the builder\'s text', async () => {
  const entry = recordedEntries().find(e => e.where.startsWith('run-3/spark-02.json /m4'));
  assert.ok(entry, 'the bake-off\'s logged case is in the recorded runs');
  const { body } = await replay('/m4', entry.entry.request, entry.replies);
  const held = 'For her the pain is matching payments to invoices, the reminder timing part is fine';
  assert.equal(body.echo.anchor_span, held);
  assert.equal(body.contrast.anchor_span, held);
  assert.ok(entry.entry.request.user_answer.includes(held));
});

test('M3, M4, M5 and M7 take their overall state from their primary bar', async () => {
  for (const [route, mech, bar] of [['/m3', 'M3', 'echo'], ['/m4', 'M4', 'echo'], ['/m5', 'M5', 'gap'], ['/m7', 'M7', 'limit']]) {
    const { status, body } = await replay(route, { problem: PROBLEM, user_answer: 'Sam calls the client on day two.' }, [
      reply({ mechanism: mech, state: 'turbid', [bar]: { state: 'clearing', anchor_span: 'SAM calls the client' }, observation: { surface_text: 'x', anchor_span: null } })
    ]);
    assert.equal(status, 200, route);
    assert.equal(body.state, 'clearing', route);
    assert.equal(body[bar].anchor_span, 'Sam calls the client', route);
    assert.equal(body.server_checks.overall_state_is_primary, true, route);
  }
});

test('a bar without a real state is a failed grade, never a default Turbid', async () => {
  for (const [route, mech, message] of [
    ['/m3', 'M3', 'Invalid M3 grade: echo state'],
    ['/m4', 'M4', 'Invalid M4 grade: echo state'],
    ['/m5', 'M5', 'Invalid M5 grade: gap state'],
    ['/m6', 'M6', 'Invalid M6 grade: words state'],
    ['/m7', 'M7', 'Invalid M7 grade: limit state']
  ]) {
    const { status, body } = await replay(route, { problem: PROBLEM, user_answer: 'An answer.' }, [reply({ mechanism: mech })]);
    assert.equal(status, 500, route);
    assert.equal(body.error, message, route);
  }
});

test('a reply from the wrong mechanism is refused', async () => {
  const { status, body } = await replay('/m5', { problem: PROBLEM, user_answer: 'An answer.' }, [reply({ mechanism: 'M3' })]);
  assert.equal(status, 500);
  assert.equal(body.error, 'Invalid M5 response');
});

test('M4: an unreadable contrast becomes unclear', async () => {
  const { body } = await replay('/m4', { problem: PROBLEM, user_answer: 'An answer.' }, [
    reply({ mechanism: 'M4', echo: { state: 'turbid', anchor_span: null }, contrast: { is_different_kind: 'maybe', same_or_different: 'same', anchor_span: 'gone' } })
  ]);
  assert.deepEqual(body.contrast, { is_different_kind: 'unclear', same_or_different: 'unclear', anchor_span: null });
});

test('M4: a boolean contrast is read as text', async () => {
  const { body } = await replay('/m4', { problem: PROBLEM, user_answer: 'An answer here.' }, [
    reply({ mechanism: 'M4', echo: { state: 'settled', anchor_span: 'answer here' }, contrast: { is_different_kind: true, same_or_different: 'different', anchor_span: 'an answer' } })
  ]);
  assert.equal(body.contrast.is_different_kind, 'true');
  assert.equal(body.contrast.anchor_span, 'An answer');
  assert.equal(body.state, 'settled');
});

test('M4: a prior echo context over the cap is refused before any model call', async () => {
  const { status } = await replay('/m4', { problem: PROBLEM, user_answer: 'An answer.', prior_echo_context: 'x'.repeat(100000) }, []);
  assert.equal(status, 400);
});

function m6Reply(words, tell, echo) {
  return reply({
    mechanism: 'M6',
    words: { state: words, anchor_span: 'said it' },
    tell: { state: tell, anchor_span: 'said it' },
    ...(echo ? { echo: { state: echo, anchor_span: 'said it' } } : {}),
    observation: { surface_text: 'x', anchor_span: null }
  });
}

test('M6: reconstructed words cap Words and Tell at clearing and turn the Echo turbid', async () => {
  const { body } = await replay('/m6', { problem: PROBLEM, user_answer: 'She said it.', words_source: 'reconstructed' }, [m6Reply('settled', 'settled', 'settled')]);
  assert.equal(body.words.state, 'clearing');
  assert.equal(body.tell.state, 'clearing');
  assert.deepEqual(body.echo, { state: 'turbid', anchor_span: null });
  assert.equal(body.state, 'clearing');
});

test('M6: real words keep their grades, and a clearing Echo folds to turbid', async () => {
  const settled = await replay('/m6', { problem: PROBLEM, user_answer: 'She said it.', words_source: 'real' }, [m6Reply('settled', 'settled', 'settled')]);
  assert.equal(settled.body.words.state, 'settled');
  assert.equal(settled.body.tell.state, 'settled');
  assert.equal(settled.body.echo.state, 'settled');

  const clearing = await replay('/m6', { problem: PROBLEM, user_answer: 'She said it.', words_source: 'real' }, [m6Reply('settled', 'settled', 'clearing')]);
  assert.deepEqual(clearing.body.echo, { state: 'turbid', anchor_span: null });
});

test('M6: self mode has no Echo, whatever the model sent', async () => {
  const { status, body } = await replay('/m6', { problem: PROBLEM, user_answer: 'She said it.', words_source: 'real', maturity_class: 2 }, [m6Reply('settled', 'settled', 'settled')]);
  assert.equal(status, 200);
  assert.equal('echo' in body, false);
  const noEcho = await replay('/m6', { problem: PROBLEM, user_answer: 'She said it.', words_source: 'real', maturity_class: 2 }, [m6Reply('settled', 'settled')]);
  assert.equal(noEcho.status, 200);
});

test('M6: outside self mode a missing Echo is a failed grade', async () => {
  const { status, body } = await replay('/m6', { problem: PROBLEM, user_answer: 'She said it.', words_source: 'real' }, [m6Reply('settled', 'settled')]);
  assert.equal(status, 500);
  assert.equal(body.error, 'Invalid M6 grade: echo state');
});

test('M2 Phase B: the overall state is the floor of the bars, and Gap only counts when in play', async () => {
  const body = { user_line: 'x', problem: PROBLEM, user_answer: 'Last Friday Sam called the client.' };
  const answer = {
    mechanism: 'M2', phase: 'friction', state: 'settled',
    tell: { state: 'settled', anchor_span: 'sam called the client' },
    vintage: { state: 'settled', anchor_span: 'Last Friday' },
    gap: { state: 'turbid', anchor_span: null },
    observation: { surface_text: 'x', anchor_span: null }
  };
  const notInPlay = await replay('/m2', { ...body, gap_in_play: false }, [reply(answer)]);
  assert.equal(notInPlay.body.state, 'settled');
  assert.equal('gap' in notInPlay.body, false);
  assert.equal(notInPlay.body.tell.anchor_span, 'Sam called the client');
  assert.equal(notInPlay.body.server_checks.tell_anchor_verified, true);

  const inPlay = await replay('/m2', { ...body, gap_in_play: true }, [reply(answer)]);
  assert.equal(inPlay.body.state, 'turbid');

  const noGap = await replay('/m2', { ...body, gap_in_play: true }, [reply({ ...answer, gap: undefined })]);
  assert.equal(noGap.status, 500);
  assert.equal(noGap.body.error, 'Invalid M2 grade: gap state');
});

test('the replay adapter refuses to invent a reply', async () => {
  const { status, body } = await replay('/m3', { problem: PROBLEM, user_answer: 'An answer.' }, []);
  assert.equal(status, 500);
  assert.match(body.error, /more replies than were recorded/);
});

// The Anthropic adapter, with fetch stubbed: what production sends and how it reads the reply.
test('the Anthropic adapter sends the pinned model and reads the first text block', async () => {
  const real = globalThis.fetch;
  const seen = [];
  globalThis.fetch = async (url, init) => {
    seen.push({ url, init });
    return new Response(JSON.stringify({ content: [{ type: 'text', text: ' {"ok":true} ' }] }), { status: 200 });
  };
  try {
    const adapter = createAnthropicAdapter();
    const text = await adapter({ env: { ANTHROPIC_API_KEY: 'k', ANTHROPIC_MODEL: 'pinned-model' }, system: 'sys', content: 'msg', maxTokens: 123 });
    assert.equal(text, ' {"ok":true} ');
    assert.equal(seen[0].url, 'https://api.anthropic.com/v1/messages');
    assert.equal(seen[0].init.headers['x-api-key'], 'k');
    assert.deepEqual(JSON.parse(seen[0].init.body), { model: 'pinned-model', max_tokens: 123, system: 'sys', messages: [{ role: 'user', content: 'msg' }] });
  } finally {
    globalThis.fetch = real;
  }
});

test('the worker uses the Anthropic adapter when nothing else is set', async () => {
  const real = globalThis.fetch;
  let called = 0;
  globalThis.fetch = async () => {
    called++;
    return new Response(reply({ content: [{ type: 'text', text: reply({ mechanism: 'M3', echo: { state: 'turbid', anchor_span: null } }) }] }), { status: 200 });
  };
  try {
    const res = await worker.fetch(request('/m3', { problem: PROBLEM, user_answer: 'An answer.' }), { ...ENV, ANTHROPIC_API_KEY: 'k' });
    assert.equal(res.status, 200);
    assert.equal(called, 1);
  } finally {
    globalThis.fetch = real;
  }
});

test('an API failure comes back as a 502 with the detail', async () => {
  const real = globalThis.fetch;
  const error = console.error;
  console.error = () => {};
  globalThis.fetch = async () => new Response('overloaded', { status: 529 });
  try {
    const res = await worker.fetch(request('/m3', { problem: PROBLEM, user_answer: 'An answer.' }), { ...ENV, ANTHROPIC_API_KEY: 'k' });
    assert.equal(res.status, 502);
    const { prompt_version, model, ai_fields, ...rest } = await res.json();
    assert.deepEqual(rest, { error: 'Claude API error', detail: 'overloaded' });
    assert.deepEqual(ai_fields, []);
    assert.equal(model, ENV.ANTHROPIC_MODEL);
    assert.match(prompt_version, /^\d{4}-\d{2}-\d{2}[a-z]?$/);
  } finally {
    globalThis.fetch = real;
    console.error = error;
  }
});

test('a failed API call prints the status and the error type, never the message text', async () => {
  const real = globalThis.fetch;
  const error = console.error;
  const printed = [];
  console.error = (...args) => printed.push(args.join(' '));
  const failure = (status, body) => async () => new Response(body, { status });
  try {
    globalThis.fetch = failure(400, JSON.stringify({ type: 'error', error: { type: 'invalid_request_error', message: 'It quoted zq-canary-0611' } }));
    await worker.fetch(request('/m3', { problem: PROBLEM, user_answer: 'An answer.' }), { ...ENV, ANTHROPIC_API_KEY: 'k' });
    globalThis.fetch = failure(529, 'zq-canary-0611 is not JSON');
    await worker.fetch(request('/m3', { problem: PROBLEM, user_answer: 'An answer.' }), { ...ENV, ANTHROPIC_API_KEY: 'k' });
    globalThis.fetch = failure(500, JSON.stringify({ error: { type: 'zq-canary-0611 in the type' } }));
    await worker.fetch(request('/m3', { problem: PROBLEM, user_answer: 'An answer.' }), { ...ENV, ANTHROPIC_API_KEY: 'k' });
  } finally {
    globalThis.fetch = real;
    console.error = error;
  }
  assert.deepEqual(printed, [
    'ANTHROPIC_ERROR: 400 invalid_request_error',
    'ANTHROPIC_ERROR: 529 unreadable',
    'ANTHROPIC_ERROR: 500 unreadable'
  ]);
});

test('adapter options: thinking goes out, and only text blocks come back', async () => {
  const real = globalThis.fetch;
  let sent;
  const onCalls = [];
  globalThis.fetch = async (url, init) => {
    sent = JSON.parse(init.body);
    return new Response(reply({ content: [{ type: 'thinking', thinking: '...' }, { type: 'text', text: 'hello' }] }), { status: 200 });
  };
  try {
    const adapter = createAnthropicAdapter({ thinking: { type: 'disabled' }, textBlocksOnly: true, onCall: c => onCalls.push(c) });
    const text = await adapter({ env: {}, system: 's', content: 'c', maxTokens: 1 });
    assert.equal(text, 'hello');
    assert.deepEqual(sent.thinking, { type: 'disabled' });
    assert.deepEqual(onCalls[0].originalBlocks, ['thinking', 'text']);
  } finally {
    globalThis.fetch = real;
  }
});

// ── THE WORKER'S LOGS ──
// The builder's words never reach the worker's logs. The replies below reach every downgrade.
const CANARY = 'zq-canary-0611';
const CANARY_SPARK = `${CANARY} invoices go unpaid for months`;

function captureConsole() {
  const lines = [];
  const methods = ['log', 'warn', 'error', 'info', 'debug'];
  const real = methods.map(m => console[m]);
  methods.forEach(m => { console[m] = (...args) => lines.push(args.map(String).join(' ')); });
  return { lines, restore: () => methods.forEach((m, i) => { console[m] = real[i]; }) };
}

test('no downgrade and no field warning prints the builder\'s words', async () => {
  const capture = captureConsole();
  try {
    const phaseA = { user_line: CANARY_SPARK, raw_spark: CANARY_SPARK, spark_parse: { domain: null } };
    // A stated span that isn't in the spark, which then fails the word check.
    await replay('/m2', phaseA, [reply({ mechanism: 'M2', phase: 'problem', outcome: 'stated', stated_span: `${CANARY} invoices go unpaid forever`, problem: null, question: null })]);
    // A guess with words the spark doesn't hold.
    await replay('/m2', phaseA, [reply({ mechanism: 'M2', phase: 'problem', outcome: 'guessed', stated_span: null, problem: `${CANARY} zqinvented clients ignore invoices`, question: 'q' })]);

    const answer = `${CANARY} last Friday I called the client twice about the late invoice`;
    const fromAnswer = {
      anchor_spans: [`${CANARY} last Friday I called the client`, `${CANARY} a fragment this answer does not hold`],
      problem: `${CANARY} zqinvented words outside the fragments`,
      gap_in_play: false,
      question: 'q'
    };
    // Self answer: a fragment that isn't in the answer, and a sentence that reaches outside the fragments.
    await replay('/m2', { ...phaseA, maturity_class: 2, self_answer: answer }, [
      reply({ mechanism: 'M2', phase: 'problem', outcome: 'insufficient', stated_span: null, problem: null, question: null }),
      reply({ mechanism: 'M2', phase: 'self_answer', problem_present: true, ...fromAnswer })
    ]);
    // Scene: the same two.
    await replay('/m2', { phase: 'scene', user_line: CANARY_SPARK, scene_answer: answer }, [
      reply({ mechanism: 'M2', phase: 'scene', scene_present: true, ...fromAnswer })
    ]);
    // /field with no problem and no domain, and /field through the model.
    await replay('/field', { mode: 'ask', user_line: CANARY_SPARK, spark_parse: { domain: null } }, []);
    await replay('/field', { mode: 'find', user_line: CANARY_SPARK, missing: 'grape' }, [
      reply({ brief: { kind: 'find', setup: `${CANARY} find someone`, question: `${CANARY} what happened with the invoices last time?`, target: CANARY } })
    ]);
  } finally {
    capture.restore();
  }

  const output = capture.lines.join('\n');
  for (const reached of ['stated_span_not_verbatim_in_spark', 'words_not_in_spark', 'fragment_not_verbatim_in_answer', 'words_not_in_fragments', 'field_no_problem_no_domain']) {
    assert.ok(output.includes(reached), `the run never reached ${reached}`);
  }
  assert.ok(!output.includes(CANARY), `the canary is in the worker's console output:\n${output}`);
  assert.ok(!output.includes('zqinvented'), `the model's words are in the worker's console output:\n${output}`);
});

test('the log line keeps the code\'s labels and counts the rest, whatever a caller passes', async () => {
  const capture = captureConsole();
  try {
    await replay('/m2', { user_line: CANARY_SPARK, raw_spark: CANARY_SPARK }, [
      reply({ mechanism: 'M2', phase: 'problem', outcome: 'guessed', problem: `${CANARY} zqinvented clients ignore invoices`, question: 'q' })
    ]);
  } finally {
    capture.restore();
  }
  const line = JSON.parse(capture.lines[0]);
  assert.deepEqual(Object.keys(line).sort(), ['char_count', 'event', 'from', 'phase', 'reason', 'to', 'word_count']);
  assert.equal(line.reason, 'words_not_in_spark');
  assert.ok(line.word_count > 0);
  assert.ok(line.char_count > 0);
});

// ── WHO WROTE WHAT ──
const fieldsOf = body => [...body.ai_fields].sort();

test('every JSON reply carries the prompts\' version, the model and ai_fields, errors included', async () => {
  const replies = [
    await replay('/m3', { problem: PROBLEM, user_answer: 'An answer.' }, [reply({ mechanism: 'M3', echo: { state: 'turbid', anchor_span: null } })]),
    await replay('/m3', { user_answer: 'An answer.' }, []),
    await replay('/nowhere', {}, []),
    await replay('/m5', { problem: PROBLEM, user_answer: 'An answer.' }, [reply({ mechanism: 'M3' })])
  ];
  const res = await worker.fetch(new Request('https://worker.test/m3', { method: 'GET' }), ENV);
  replies.push({ status: res.status, body: await res.json() });
  for (const { body } of replies) {
    assert.match(body.prompt_version, /^\d{4}-\d{2}-\d{2}[a-z]?$/);
    assert.equal(body.model, 'replay');
    assert.ok(Array.isArray(body.ai_fields));
  }
});

test('a reply the model could not shape lists its raw text', async () => {
  const { status, body } = await replay('/m3', { problem: PROBLEM, user_answer: 'An answer.' }, ['not json at all']);
  assert.equal(status, 502);
  assert.deepEqual(body.ai_fields, ['raw']);
});

test('M1 lists its reading, and an anchor stays off the list', async () => {
  const { body } = await replay('/m1', { spark_summary: 'x', person_name: 'Sam', relationship: 'my sister' }, [
    reply({ mechanism: 'M1', grape: { state: 'settled', named_person: 'Sam' }, observation: { surface_text: 'Sam — on record.', anchor_span: 'Sam' }, next_question: { should_advance: true, framing: null } })
  ]);
  assert.deepEqual(fieldsOf(body), ['grape.named_person', 'observation.surface_text']);
});

test('the graders list the reading and the follow-up, never an anchor', async () => {
  const { body } = await replay('/m3', { problem: PROBLEM, user_answer: 'Sam calls the client on day two.' }, [
    reply({ mechanism: 'M3', echo: { state: 'turbid', anchor_span: 'Sam calls the client' }, observation: { surface_text: 'A reading.', anchor_span: 'Sam calls' }, swirl: { kind: 'reality', question: 'What happened?' } })
  ]);
  assert.deepEqual(fieldsOf(body), ['observation.surface_text', 'swirl.question']);

  const noText = await replay('/m3', { problem: PROBLEM, user_answer: 'Sam calls.' }, [reply({ mechanism: 'M3', echo: { state: 'settled', anchor_span: 'Sam calls' } })]);
  assert.deepEqual(noText.body.ai_fields, []);
});

test('M2 friction lists the reading and the follow-up', async () => {
  const { body } = await replay('/m2', { user_line: 'x', problem: PROBLEM, gap_in_play: false, user_answer: 'Last Friday Sam called the client.' }, [
    reply({ mechanism: 'M2', phase: 'friction', state: 'turbid', tell: { state: 'turbid', anchor_span: null }, vintage: { state: 'turbid', anchor_span: null }, observation: { surface_text: 'A reading.', anchor_span: null }, swirl: { kind: 'reality', question: 'What happened?' } })
  ]);
  assert.deepEqual(fieldsOf(body), ['observation.surface_text', 'swirl.question']);
});

test('Phase A: the spark\'s own words are not the model\'s, a guess is, and a replaced question is not', async () => {
  const spark = 'An app for freelancers whose clients pay invoices late';
  const base = { user_line: spark, raw_spark: spark };

  const stated = await replay('/m2', base, [reply({ mechanism: 'M2', phase: 'problem', outcome: 'stated', stated_span: 'clients pay invoices late', question: 'When did it last happen?' })]);
  assert.equal(stated.body.outcome, 'stated');
  assert.deepEqual(fieldsOf(stated.body), ['question']);

  const guessed = await replay('/m2', base, [reply({ mechanism: 'M2', phase: 'problem', outcome: 'guessed', problem: 'Freelancers pay late clients', question: 'When did it last happen?' })]);
  assert.equal(guessed.body.outcome, 'guessed');
  assert.deepEqual(fieldsOf(guessed.body), ['problem.text', 'question', 'recovered_problem']);

  const repaired = await replay('/m2', { ...base, grape_name: 'Sam', maturity_class: 1 }, [reply({ mechanism: 'M2', phase: 'problem', outcome: 'stated', stated_span: 'clients pay invoices late', question: 'Think of the last time it happened.' })]);
  assert.equal(repaired.body.server_checks.m2_question_repaired, true);
  assert.deepEqual(repaired.body.ai_fields, []);

  const nothing = await replay('/m2', base, [reply({ mechanism: 'M2', phase: 'problem', outcome: 'insufficient', question: 'Dropped anyway?' })]);
  assert.equal(nothing.body.question, null);
  assert.deepEqual(nothing.body.ai_fields, []);
});

test('scene and self answer: the model\'s sentence is listed, the builder\'s fragments are not', async () => {
  const answer = 'Last Friday I called the client twice about the late invoice';
  const scene = fields => replay('/m2', { phase: 'scene', user_line: 'x', scene_answer: answer }, [reply({ mechanism: 'M2', phase: 'scene', question: 'What did you do next?', ...fields })]);

  const sentence = await scene({ scene_present: true, anchor_spans: ['called the client twice', 'the late invoice'], problem: 'called the client twice, the late invoice' });
  assert.equal(sentence.body.problem.text, 'called the client twice, the late invoice');
  assert.deepEqual(fieldsOf(sentence.body), ['problem.text', 'question']);

  const fragments = await scene({ scene_present: true, anchor_spans: ['called the client twice', 'the late invoice'], problem: 'an invented sentence entirely' });
  assert.equal(fragments.body.problem.text, 'called the client twice … the late invoice');
  assert.deepEqual(fieldsOf(fragments.body), ['question']);

  const noScene = await scene({ scene_present: false, swirl: { kind: 'scene', question: 'Which day?' } });
  assert.deepEqual(fieldsOf(noScene.body), ['swirl.question']);

  const self = await replay('/m2', { user_line: 'x', raw_spark: 'x', maturity_class: 2, self_answer: answer }, [
    reply({ mechanism: 'M2', phase: 'problem', outcome: 'insufficient' }),
    reply({ mechanism: 'M2', phase: 'self_answer', problem_present: true, anchor_spans: ['called the client twice'], problem: 'an invented sentence entirely', question: 'What did you do next?' })
  ]);
  assert.equal(self.body.outcome, 'self_answer');
  assert.deepEqual(fieldsOf(self.body), ['question']);
});

test('/field: the fixed question has no AI fields, a brief lists what it holds', async () => {
  const fixed = await replay('/field', { mode: 'ask', user_line: 'Invoices', spark_parse: { domain: 'invoices' } }, []);
  assert.match(fixed.body.brief.question, /most annoying part of invoices/);
  assert.deepEqual(fixed.body.ai_fields, []);

  const brief = await replay('/field', { mode: 'find', user_line: 'Invoices paid late', missing: 'grape' }, [
    reply({ brief: { kind: 'find', setup: 'Find a freelancer.', question: 'When were invoices last paid late?', target: 'a freelancer' } })
  ]);
  assert.deepEqual(fieldsOf(brief.body), ['brief.question', 'brief.setup', 'brief.target']);

  const bare = await replay('/field', { mode: 'ask', user_line: 'Invoices paid late', problem: PROBLEM }, [
    reply({ brief: { kind: 'ask', setup: null, question: 'When were invoices last paid late?', target: null } })
  ]);
  assert.deepEqual(fieldsOf(bare.body), ['brief.question']);
});

test('/resolve lists its question', async () => {
  const { body } = await replay('/resolve', { element: 'tell', source_mechanism: 'M2', prior_answer: 'An answer.' }, [reply({ question: 'What did she do?' })]);
  assert.deepEqual(body.ai_fields, ['question']);
});

const m0Reply = extra => reply({
  mechanism: 'M0',
  user_line_candidate: 'A way for freelancers — to get paid',
  spark_parse: { implied_person: 'freelancers', suspected_problem: 'late pay', domain: 'invoices', solution_form: null, solution_is_software: 'software' },
  digestibility: { state: 'cellar_ready', missing: [], reason: 'Cellar-ready.' },
  followup: { needed: false, question: null },
  m1_setup: null,
  ...extra
});

test('/m0: what the model wrote is listed, cleaned or not', async () => {
  const { body } = await replay('/m0', { raw_spark: 'A way for freelancers to get paid' }, [m0Reply()]);
  assert.equal(body.user_line_candidate, 'A way for freelancers, to get paid');
  assert.deepEqual(fieldsOf(body), ['digestibility.reason', 'spark_parse.domain', 'spark_parse.implied_person', 'spark_parse.suspected_problem', 'user_line_candidate']);
});

test('/m0: a fixed reason or follow-up the worker put in is not listed, a trimmed follow-up is', async () => {
  const cloudy = { state: 'bottleable_cloudy', missing: ['problem'], reason: "The model's reason." };

  // A person and a problem: the guard writes the reason and clears the follow-up.
  const guarded = await replay('/m0', { raw_spark: 'A way for freelancers to get paid' }, [m0Reply({ digestibility: cloudy, followup: { needed: true, question: 'Who is it for?' } })]);
  assert.equal(guarded.body.digestibility.reason, 'Cellar-ready. The role and the stated problem are visible.');
  assert.ok(!guarded.body.ai_fields.includes('digestibility.reason'));
  assert.ok(!guarded.body.ai_fields.includes('followup.question'));

  const noPerson = { implied_person: null, suspected_problem: null, domain: 'invoices', solution_is_software: 'software' };

  // The model wrote no follow-up: the fixed one goes in.
  const fallback = await replay('/m0', { raw_spark: 'Something with invoices here' }, [m0Reply({ spark_parse: noPerson, digestibility: cloudy, followup: { needed: true, question: null } })]);
  assert.match(fallback.body.followup.question, /Use only the words already in the Spark/);
  assert.ok(!fallback.body.ai_fields.includes('followup.question'));
  assert.ok(fallback.body.ai_fields.includes('digestibility.missing'));

  // A banned follow-up: the worker's template replaces it.
  const banned = await replay('/m0', { raw_spark: 'Something with invoices here' }, [m0Reply({ spark_parse: noPerson, digestibility: cloudy, followup: { needed: true, question: 'What made you think of this?' } })]);
  assert.match(banned.body.followup.question, /What is going wrong for the person or group/);
  assert.ok(!banned.body.ai_fields.includes('followup.question'));

  // Only the "around ..." ending goes: the rest is still the model's.
  const trimmed = await replay('/m0', { raw_spark: 'Something with invoices here' }, [m0Reply({ spark_parse: noPerson, digestibility: cloudy, followup: { needed: true, question: 'What problem are they having around invoices?' } })]);
  assert.equal(trimmed.body.followup.question, 'What problem are they having?');
  assert.ok(trimmed.body.ai_fields.includes('followup.question'));
});

test('/m0: the scope gate lists the model\'s line and parse, and a line that is the spark itself is not listed', async () => {
  const parse = { implied_person: null, suspected_problem: null, domain: 'bread', solution_is_software: 'non_software' };
  const gated = await replay('/m0', { raw_spark: 'A bakery on my street' }, [m0Reply({ spark_parse: parse })]);
  assert.equal(gated.body.scope.in_scope, false);
  assert.deepEqual(fieldsOf(gated.body), ['spark_parse.domain', 'user_line_candidate']);

  const noLine = await replay('/m0', { raw_spark: 'A bakery on my street' }, [reply({ mechanism: 'M0', spark_parse: parse })]);
  assert.equal(noLine.body.user_line_candidate, 'A bakery on my street');
  assert.deepEqual(fieldsOf(noLine.body), ['spark_parse.domain']);
});

// ── B1b: the short label ──
const M1_REPLY = reply({ mechanism: 'M1', grape: { state: 'settled', named_person: null, person_kind: 'described_unnamed' }, observation: { surface_text: 'A reading.', anchor_span: null }, next_question: { should_advance: true, framing: null } });
const labelOf = async (answer, said) => (await replay('/label', { answer, kind: 'people' }, [reply(said)])).body;

test('/label: the brief\'s four examples pass the check as written', async () => {
  for (const [answer, label] of [
    ['Myself of course, and some of my football friends', 'your football friends'],
    ['M., my sister', 'M.'],
    ['a colleague who manages bookings', 'your colleague'],
    ['freelancers I know', 'the freelancers you know']
  ]) {
    const body = await labelOf(answer, { label, is_self: false });
    assert.equal(body.label, label, answer);
    assert.equal(body.is_self, false);
    assert.deepEqual(body.ai_fields, ['label']);
    assert.equal(body.server_checks.label.check, 'ok');
  }
});

test('/label: a label that adds a word, runs past five words or says "my" never goes out as written', async () => {
  const added = await labelOf('freelancers I know', { label: 'your freelance designer friends', is_self: false });
  assert.equal(added.label, null);
  assert.equal(added.server_checks.label.check, 'added_words');
  assert.deepEqual(added.ai_fields, []);

  const name = await labelOf('a colleague who manages bookings', { label: 'Sarah', is_self: false });
  assert.equal(name.label, null);

  const long = await labelOf('Sam, Priya, Tom, Ali, Jo and Kim', { label: 'Sam, Priya, Tom, Ali, Jo and Kim', is_self: false });
  assert.equal(long.label, null);
  assert.equal(long.server_checks.label.check, 'too_long');

  const my = await labelOf('M., my sister', { label: 'my sister', is_self: false });
  assert.equal(my.label, 'your sister');

  const quoted = await labelOf('Tom, and two friends from my running club', { label: '"Tom and two friends."', is_self: false });
  assert.equal(quoted.label, 'Tom and two friends');

  const capital = await labelOf('a colleague who manages bookings', { label: 'Your colleague', is_self: false });
  assert.equal(capital.label, 'your colleague');
});

test('/label: the builder alone is "you", the worker\'s own word', async () => {
  const body = await labelOf('Jamie Kneebone, it\'s me', { label: 'Jamie Kneebone', is_self: true });
  assert.equal(body.label, 'you');
  assert.equal(body.is_self, true);
  assert.deepEqual(body.ai_fields, []);
  assert.equal(body.prompt_version, '2026-11-07b');
});

test('/label: no answer is a 400, and no person is a null label', async () => {
  const empty = await replay('/label', { answer: '  ' }, []);
  assert.equal(empty.status, 400);
  const none = await labelOf('nobody yet', { label: null, is_self: false });
  assert.equal(none.label, null);
  assert.equal(none.server_checks.label.check, 'no_label');
});

test('/m1 with_label: the grade comes back as it would alone, with the label and is_self beside it', async () => {
  const body = { spark_summary: 'x', person_name: '', relationship: 'Jamie Kneebone, it\'s me', maturity_class: 0 };
  const alone = await replay('/m1', body, [M1_REPLY]);
  const labelled = await replay('/m1', { ...body, with_label: true }, [M1_REPLY, reply({ label: 'Jamie Kneebone', is_self: true })]);
  assert.deepEqual(labelled.body.grape, alone.body.grape);
  assert.equal(labelled.body.state, alone.body.state);
  assert.equal(labelled.body.label, 'you');
  assert.equal(labelled.body.is_self, true);
  assert.equal(labelled.body.prompt_version, '2026-11-07b');
  assert.equal('label' in alone.body, false);
  assert.equal('is_self' in alone.body, false);
});

test('/m1 with_label: a label call that fails leaves the grade standing', async () => {
  const body = { spark_summary: 'x', person_name: '', relationship: 'M., my sister', maturity_class: 0, with_label: true };
  const res = await replay('/m1', body, [M1_REPLY, 'not json at all']);
  assert.equal(res.status, 200);
  assert.equal(res.body.grape.state, 'settled');
  assert.equal(res.body.label, null);
  assert.equal(res.body.server_checks.label.check, 'failed');
  assert.ok(!res.body.ai_fields.includes('label'));
});

test('/m1 with_label: the grading prompt is the one the old intake gets', async () => {
  const systems = [];
  const adapter = async ({ system }) => { systems.push(system); return systems.length === 1 ? M1_REPLY : reply({ label: 'M.', is_self: false }); };
  await worker.fetch(request('/m1', { spark_summary: 'x', relationship: 'M., my sister', with_label: true }), { ...ENV, modelAdapter: adapter });
  const oldAdapter = async ({ system }) => { systems.push(system); return M1_REPLY; };
  await worker.fetch(request('/m1', { spark_summary: 'x', relationship: 'M., my sister' }), { ...ENV, modelAdapter: oldAdapter });
  assert.equal(systems.length, 3);
  assert.equal(systems[0], systems[2]);
  assert.match(systems[1], /short label/);
});
