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
    assert.deepEqual(await res.json(), { error: 'Claude API error', detail: 'overloaded' });
  } finally {
    globalThis.fetch = real;
    console.error = error;
  }
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
