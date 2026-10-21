// Scores a model bake-off against the four criteria in the brief. Reports only:
// no thresholds, no verdict.
//
//   node bakeoff/score-bakeoff.mjs runs/2026-10-21-model-bakeoff [--baseline claude-sonnet-4-6]
//     [--add "<label>=<folder with run-N>"]... [--focus <sparks>:<mechanisms>:<element>]
//
// Reads <root>/<model>/run-N/spark-NN.json (written by run-corked-batch.mjs with
// CORKED_JSON=1 against bakeoff/worker-bakeoff.js) and writes <root>/REPORT.md.
// --add scores another folder's runs under a label, e.g. a baseline kept elsewhere.
// --focus adds a per-run table, e.g. 1,2,7:M3,M4:echo.
//
// A grade is one element state one mechanism offered in one run. A slot is
// (spark, mechanism, element). The bar-to-element map mirrors applyMechResult()
// in run-corked-batch.mjs, so a slot is exactly what moves an element in the app.

import fs from 'node:fs/promises';
import path from 'node:path';

const RANK = { inert: 0, turbid: 1, clearing: 2, settled: 3 };
const ELEMENT_NAME = { grape: 'Grape', tell: 'Tell', vintage: 'Vintage', gap: 'Gap', echo: 'Echo', limit: 'Limit' };

// USD per million tokens, Anthropic list prices (Claude API, cached 2026-10-06).
// Haiku 5.5 is the rate for prompts of 100K tokens or fewer; every prompt here is far below that.
const PRICES = {
  'claude-sonnet-4-6': { input: 3.0, output: 15.0 },
  'claude-sonnet-5-5': { input: 2.0, output: 10.0 },
  'claude-haiku-5-5': { input: 0.10, output: 0.50 }
};
const CACHE_WRITE_X = 1.25;
const CACHE_READ_X = 0.1;

let root = null, baseline = 'claude-sonnet-4-6', focus = null;
const adds = [];
{
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--baseline') baseline = args[++i];
    else if (args[i] === '--focus') focus = args[++i];
    else if (args[i] === '--add') { const a = args[++i]; const eq = a.indexOf('='); adds.push([a.slice(0, eq), a.slice(eq + 1)]); }
    else root = args[i];
  }
}
if (!root) { console.error('usage: node bakeoff/score-bakeoff.mjs <runs folder> [--baseline <model>] [--add <label>=<folder>]... [--focus <sparks>:<mechanisms>:<element>]'); process.exit(1); }

// ── Load ───────────────────────────────────────────────────────────────────

async function listDirs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter(e => e.isDirectory()).map(e => e.name).sort();
}

async function loadRuns(modelDir) {
  const runs = [];
  for (const runDir of (await listDirs(modelDir)).filter(d => /^run-\d+$/.test(d))) {
    const files = (await fs.readdir(path.join(modelDir, runDir))).filter(f => /^spark-\d+\.json$/.test(f)).sort();
    const sparks = {};
    for (const f of files) {
      const rec = JSON.parse(await fs.readFile(path.join(modelDir, runDir, f), 'utf8'));
      sparks[rec.idx] = rec;
    }
    runs.push({ name: runDir, sparks });
  }
  return runs;
}

// Baseline first, then --add folders in the order given, then the root's own models.
async function load() {
  const models = {};
  for (const [label, dir] of adds) models[label] = await loadRuns(dir);
  for (const model of await listDirs(root)) {
    if (model in models) continue;
    const runs = await loadRuns(path.join(root, model));
    if (runs.length) models[model] = runs; // smoke/, as-written/ and other folders without run-N are skipped
  }
  const order = [baseline].concat(Object.keys(models).filter(m => m !== baseline));
  return Object.fromEntries(order.filter(m => models[m]).map(m => [m, models[m]]));
}

// ── Grades ─────────────────────────────────────────────────────────────────

function mechOf(entry) {
  if (entry.kind !== 'main') return null;
  if (entry.endpoint === '/m1') return 'M1';
  if (entry.endpoint === '/m2') return 'M2';
  const m = /^\/m([3-7])$/.exec(entry.endpoint || '');
  return m ? 'M' + m[1] : null;
}

function barsFor(mech, data, run) {
  const s = k => (data && data[k] && typeof data[k] === 'object') ? data[k].state : undefined;
  switch (mech) {
    case 'M1': return [['grape', s('grape')]];
    case 'M2': return [['tell', s('tell')], ['vintage', s('vintage')]].concat(run.gapInPlay ? [['gap', s('gap')]] : []);
    case 'M3':
    case 'M4': return [['echo', s('echo')], ['vintage', s('vintage')]];
    case 'M5': return [['gap', s('gap')]];
    case 'M6': return [['tell', s('tell')]].concat(run.maturity === 2 ? [] : [['echo', s('echo')]]);
    case 'M7': return [['limit', s('limit')]];
  }
  return [];
}

// grades[model][slotKey] = [state per run, null when that run has no grade]
function collectGrades(models) {
  const grades = {};
  const finals = {};
  const slotInfo = {};
  for (const [model, runs] of Object.entries(models)) {
    grades[model] = {};
    finals[model] = {};
    runs.forEach((runRec, ri) => {
      for (const [idx, rec] of Object.entries(runRec.sparks)) {
        const run = rec.run;
        for (const entry of run.log) {
          const mech = mechOf(entry);
          if (!mech || !entry.response || entry.response.error) continue;
          for (const [el, state] of barsFor(mech, entry.response, run)) {
            if (typeof state !== 'string') continue;
            const key = idx + '|' + mech + '|' + el;
            slotInfo[key] = { spark: Number(idx), mech, element: el };
            (grades[model][key] = grades[model][key] || Array(runs.length).fill(null))[ri] = state;
          }
        }
        for (const [el, e] of Object.entries(run.elements || {})) {
          const key = idx + '|final|' + el;
          slotInfo[key] = { spark: Number(idx), mech: 'end of chain', element: el };
          (finals[model][key] = finals[model][key] || Array(runs.length).fill(null))[ri] = e.state;
        }
      }
    });
  }
  return { grades, finals, slotInfo };
}

const rank = s => (s in RANK ? RANK[s] : null);
const ranked = arr => arr.filter(s => s != null && rank(s) != null);

// ── A. Leniency ────────────────────────────────────────────────────────────
// Every model run against every baseline run on the same slot. A pair counts as
// higher when the model's state outranks the baseline's. The baseline against
// itself (each ordered pair of different runs) gives the noise floor.

function leniency(base, cand, slotInfo) {
  const cases = [];
  let pairs = 0, higher = 0, lower = 0, onlyCand = 0;
  for (const key of Object.keys(cand)) {
    const B = base[key] ? ranked(base[key]) : [], M = ranked(cand[key]);
    if (!M.length) continue;
    if (!B.length) { onlyCand++; continue; }
    let h = 0, n = 0;
    for (const m of M) for (const b of B) {
      n++;
      if (rank(m) > rank(b)) h++;
      else if (rank(m) < rank(b)) lower++;
    }
    pairs += n; higher += h;
    if (h) cases.push({ ...slotInfo[key], base: base[key], cand: cand[key], higher: h, pairs: n });
  }
  cases.sort((a, b) => a.spark - b.spark || a.mech.localeCompare(b.mech) || a.element.localeCompare(b.element));
  return { cases, pairs, higher, lower, onlyCand };
}

function selfLeniency(base) {
  let pairs = 0, higher = 0;
  for (const arr of Object.values(base)) {
    const R = arr.map(rank);
    for (let i = 0; i < R.length; i++) for (let j = 0; j < R.length; j++) {
      if (i === j || R[i] == null || R[j] == null) continue;
      pairs++;
      if (R[i] > R[j]) higher++;
    }
  }
  return { pairs, higher };
}

// ── C. Consistency ─────────────────────────────────────────────────────────

function consistency(grades) {
  let slots = 0, split = 0, pairs = 0, pairsDiffer = 0;
  const splits = [];
  for (const [key, arr] of Object.entries(grades)) {
    const present = arr.filter(s => s != null);
    if (present.length < 2) continue;
    if (present.length === arr.length) {
      slots++;
      if (new Set(present).size > 1) { split++; splits.push(key); }
    }
    for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == null || arr[j] == null) continue;
      pairs++;
      if (arr[i] !== arr[j]) pairsDiffer++;
    }
  }
  return { slots, split, pairs, pairsDiffer, splits };
}

function chainShape(runs) {
  // Per spark, how each run ended: Phase A outcome and where the chain stopped.
  const out = {};
  runs.forEach((runRec, ri) => {
    for (const [idx, rec] of Object.entries(runRec.sparks)) {
      const r = rec.run;
      const last = r.log.length ? r.log[r.log.length - 1] : null;
      const where = !last ? 'M0' : last.endpoint === '/field' ? 'the find brief (/field)' : last.mech;
      const shape = (r.phaseAOutcome || '-') + (r.halted ? ' / stopped at ' + where : ' / full chain');
      (out[idx] = out[idx] || Array(runs.length).fill(null))[ri] = shape;
    }
  });
  return out;
}

// ── D. Cost ────────────────────────────────────────────────────────────────

// When a model ran through an adapter (bakeoff/haiku-adapter.js), the recorder saw
// the reply after the adapter; the adapter's log holds the blocks as the API sent them.
function callsOf(rec) {
  const out = [];
  for (const entry of rec.run.log) {
    if (!entry.calls || !Array.isArray(entry.calls.calls)) continue;
    const adapter = Array.isArray(entry.calls.adapter) ? entry.calls.adapter : [];
    entry.calls.calls.forEach((c, i) => out.push({
      ...c, mech: entry.mech, endpoint: entry.endpoint,
      apiBlocks: adapter[i] && adapter[i].original_blocks ? adapter[i].original_blocks : c.blocks,
      adapter: adapter[i] || null
    }));
  }
  return out;
}

function adapterSummary(runs) {
  let calls = 0, adapted = 0, removed = 0;
  const changes = {};
  for (const runRec of runs) for (const rec of Object.values(runRec.sparks)) for (const c of callsOf(rec)) {
    calls++;
    if (!c.adapter) continue;
    adapted++;
    for (const ch of c.adapter.request_changes || []) changes[ch] = (changes[ch] || 0) + 1;
    if (c.adapter.removed_blocks && c.adapter.removed_blocks.length) removed++;
  }
  return { calls, adapted, removed, changes };
}

function dollars(model, u) {
  const p = PRICES[model];
  if (!p || !u) return null;
  const inTok = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) * CACHE_WRITE_X + (u.cache_read_input_tokens || 0) * CACHE_READ_X;
  return (inTok * p.input + (u.output_tokens || 0) * p.output) / 1e6;
}

function cost(model, runs) {
  const chains = [];
  const perRun = [];
  const servedBy = {};
  let calls = 0, thinkingCalls = 0;
  for (const runRec of runs) {
    let inTok = 0, outTok = 0, usd = 0;
    for (const rec of Object.values(runRec.sparks)) {
      let cin = 0, cout = 0, cusd = 0;
      for (const c of callsOf(rec)) {
        if (c.model) servedBy[c.model] = (servedBy[c.model] || 0) + 1;
        if (!c.usage) continue;
        calls++;
        if ((c.apiBlocks || []).includes('thinking')) thinkingCalls++;
        cin += (c.usage.input_tokens || 0) + (c.usage.cache_creation_input_tokens || 0) + (c.usage.cache_read_input_tokens || 0);
        cout += c.usage.output_tokens || 0;
        cusd += dollars(PRICES[c.model] ? c.model : model, c.usage) || 0;
      }
      inTok += cin; outTok += cout; usd += cusd;
      if (!rec.run.halted) chains.push({ in: cin, out: cout, usd: cusd });
    }
    perRun.push({ name: runRec.name, in: inTok, out: outTok, usd });
  }
  const mean = k => chains.length ? chains.reduce((s, c) => s + c[k], 0) / chains.length : null;
  return { chains: chains.length, meanIn: mean('in'), meanOut: mean('out'), meanUsd: mean('usd'),
    minUsd: chains.length ? Math.min(...chains.map(c => c.usd)) : null, maxUsd: chains.length ? Math.max(...chains.map(c => c.usd)) : null,
    perRun, servedBy, calls, thinkingCalls };
}

// ── B. Fabrication ─────────────────────────────────────────────────────────
// Read from two places: the worker's reply (errors, server_checks) and the raw
// model text the bake-off wrapper recorded. Most anchor checks in worker.js null
// a bad anchor and leave no trace, so anchors are re-checked here from the raw
// reply with the worker's own rule: whitespace collapsed, case-sensitive substring.

// Same extraction as callClaude() in worker.js: fenced json blocks if any, else
// balanced top-level objects; last candidate that parses wins.
function parseModelText(rawText) {
  const text = (rawText || '').trim();
  let candidates = [...text.matchAll(/```json\s*([\s\S]*?)```/g)].map(m => m[1].trim());
  if (!candidates.length) {
    let depth = 0, start = -1, inString = false, escape = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inString) {
        if (escape) escape = false;
        else if (ch === '\\') escape = true;
        else if (ch === '"') inString = false;
        continue;
      }
      if (ch === '"') { inString = true; continue; }
      if (ch === '{') { if (depth === 0) start = i; depth++; }
      else if (ch === '}' && depth > 0 && --depth === 0 && start !== -1) { candidates.push(text.slice(start, i + 1)); start = -1; }
    }
  }
  for (let i = candidates.length - 1; i >= 0; i--) {
    try { return JSON.parse(candidates[i]); } catch { /* next */ }
  }
  try { return JSON.parse(text); } catch { return null; }
}

const norm = s => String(s || '').replace(/\s+/g, ' ').trim();

// Anchor paths per route, and the text each must come from (worker.js rules).
const ANCHORS = {
  M1: { paths: ['observation'], source: req => (req.person_name || '') + ' ' + (req.relationship || '') },
  M2: { paths: ['tell', 'vintage', 'gap', 'observation'], source: req => req.user_answer },
  M3: { paths: ['echo', 'observation'], source: req => req.user_answer },
  M4: { paths: ['echo', 'contrast', 'observation'], source: req => req.user_answer },
  M5: { paths: ['gap', 'observation'], source: req => req.user_answer },
  M6: { paths: ['words', 'tell', 'echo', 'observation'], source: req => req.user_answer },
  M7: { paths: ['limit', 'observation'], source: req => req.user_answer }
};
const PRIMARY_BAR = { M3: 'echo', M4: 'echo', M5: 'gap', M6: 'words', M7: 'limit' };

function routeOf(entry) {
  if (entry.endpoint === '/m0') return 'M0';
  if (entry.endpoint === '/m2 (phase A)') return 'M2A';
  if (entry.endpoint === '/field') return 'FIELD';
  return mechOf(entry);
}

function failureKind(entry) {
  const err = entry.response && entry.response.error;
  if (!err) return null;
  const calls = (entry.calls && entry.calls.calls) || [];
  const last = calls[calls.length - 1];
  if (/timed out/i.test(err)) return 'timeout (no reply inside 30s)';
  if (entry.calls && !calls.length) return 'request rejected before any model call: ' + err;
  if (err === 'Claude API error') {
    const t = last && last.error && last.error.type;
    return 'API error' + (t ? ' (' + t + ')' : '');
  }
  if (err === 'Parse error') {
    if (!last) return 'parse error (cause not recorded)';
    if (last.stop_reason === 'refusal') return 'parse error: refusal';
    if (last.blocks && last.blocks.length && last.blocks[0] !== 'text') {
      return 'parse error: first block is ' + last.blocks[0] + (last.stop_reason === 'max_tokens' ? ', cut off at max_tokens' : '');
    }
    if (last.stop_reason === 'max_tokens') return 'parse error: text cut off at max_tokens';
    return 'parse error: text is not JSON';
  }
  if (/^Invalid|^Expected|^Missing/.test(err)) return 'schema: ' + err;
  if (err === 'brief_impossible' || err === 'resolve_impossible') return 'refused by server checks: ' + err;
  if (/Network error/.test(err)) return 'network error';
  return 'other: ' + err;
}

function fabrication(runs) {
  const t = {
    replies: 0, requests: 0, failures: {}, anchorsTried: 0, anchorsBad: 0,
    phaseA: {}, lowered: {}, style: 0, styleHits: 0, m0Guards: {}, fieldRetries: 0, contrastReplaced: 0, subNotBool: 0
  };
  const cases = [];
  const bump = (obj, k) => { obj[k] = (obj[k] || 0) + 1; };
  runs.forEach((runRec) => {
    for (const [idx, rec] of Object.entries(runRec.sparks)) {
      for (const entry of rec.run.log) {
        const route = routeOf(entry);
        if (!route || !entry.request) continue;
        t.requests++;
        const calls = (entry.calls && entry.calls.calls) || [];
        t.replies += calls.filter(c => c.status === 200).length;
        const fk = failureKind(entry);
        if (fk) {
          bump(t.failures, fk);
          cases.push({ run: runRec.name, spark: Number(idx), route, what: fk });
          continue;
        }
        const data = entry.response;
        const sc = data.server_checks || {};
        if (route === 'FIELD' && calls.length > 1) t.fieldRetries++;
        if (Array.isArray(sc.visible_style_violations_cleaned) && sc.visible_style_violations_cleaned.length) {
          t.style++;
          t.styleHits += sc.visible_style_violations_cleaned.length;
        }
        if (route === 'M0') {
          for (const k of ['m0_ready_downgraded', 'm0_moment_cloudiness_overridden', 'unbottleable_rescue_blocked', 'followup_repaired']) if (sc[k] === true) bump(t.m0Guards, k);
          if (Array.isArray(sc.banned_words_found) && sc.banned_words_found.length) bump(t.m0Guards, 'banned_words_found');
          continue;
        }
        if (route === 'M2A') {
          for (const d of (sc.downgrades || [])) {
            bump(t.phaseA, d.reason);
            if (d.reason === 'words_not_in_spark' || d.reason === 'stated_span_not_verbatim_in_spark') {
              cases.push({ run: runRec.name, spark: Number(idx), route: 'M2 phase A', what: d.reason + (d.words ? ' [' + d.words.join(', ') + ']' : '') + ': "' + (d.text || '') + '"' });
            }
          }
          continue;
        }
        const raw = parseModelText((calls[calls.length - 1] || {}).text);
        if (!raw || !ANCHORS[route]) continue;
        const source = norm(ANCHORS[route].source(entry.request));
        for (const p of ANCHORS[route].paths) {
          const a = raw[p] && raw[p].anchor_span;
          if (!a || typeof a !== 'string') continue;
          t.anchorsTried++;
          if (!source.includes(norm(a))) {
            t.anchorsBad++;
            cases.push({ run: runRec.name, spark: Number(idx), route, what: p + '.anchor_span not in the builder\'s words: "' + a + '"' });
          }
        }
        if ('substitution_detected' in raw && typeof raw.substitution_detected !== 'boolean') t.subNotBool++;
        // The worker replaces the model's overall state: on M2 with the lowest bar,
        // on M3 to M7 with the primary bar. Direction says which way it moved.
        const overall = route === 'M2' ? data.state : (PRIMARY_BAR[route] && raw[PRIMARY_BAR[route]] ? raw[PRIMARY_BAR[route]].state : null);
        if (raw.state && overall && raw.state !== overall) {
          const dir = rank(raw.state) > rank(overall) ? 'lowered' : 'raised';
          const ruleText = route === 'M2' ? 'to its lowest bar' : 'to its ' + PRIMARY_BAR[route] + ' bar';
          bump(t.lowered, route + ' overall state ' + dir + ' ' + ruleText);
          cases.push({ run: runRec.name, spark: Number(idx), route, what: 'overall state ' + dir + ' by the server: model ' + raw.state + ', returned ' + overall });
        }
        if (route === 'M6') {
          for (const b of ['words', 'tell']) {
            if (raw[b] && data[b] && raw[b].state !== data[b].state) {
              bump(t.lowered, 'M6 ' + b + ' capped (' + raw[b].state + ' to ' + data[b].state + ')');
              cases.push({ run: runRec.name, spark: Number(idx), route, what: b + ' capped by the server: model ' + raw[b].state + ', returned ' + data[b].state });
            }
          }
          if (raw.echo && data.echo && raw.echo.state !== data.echo.state) bump(t.lowered, 'M6 echo folded (' + raw.echo.state + ' to ' + data.echo.state + ')');
        }
        if (route === 'M4' && raw.contrast && data.contrast && data.contrast.is_different_kind === 'unclear' && String(raw.contrast.is_different_kind) !== 'unclear') t.contrastReplaced++;
      }
    }
  });
  return { t, cases };
}

// ── Report ─────────────────────────────────────────────────────────────────

const pct = (a, b) => b ? (100 * a / b).toFixed(1) + '%' : '-';
const fmt = arr => arr.map(s => s == null ? '-' : s).join(', ');
const usd = v => v == null ? '-' : '$' + v.toFixed(v < 0.01 ? 5 : 4);
const int = v => v == null ? '-' : Math.round(v).toLocaleString('en-US');

async function main() {
  const models = await load();
  if (!models[baseline]) { console.error('No baseline folder ' + baseline + ' under ' + root); process.exit(1); }
  const order = [baseline].concat(Object.keys(models).filter(m => m !== baseline));
  const { grades, finals, slotInfo } = collectGrades(models);
  const L = [];

  L.push('# Model bake-off: scored output');
  L.push('');
  L.push('Generated by bakeoff/score-bakeoff.mjs from the spark-NN.json files under this folder. Baseline: ' + baseline + '.');
  L.push('');
  L.push('Runs per model: ' + order.map(m => m + ' ' + models[m].length).join(', ') + '.');
  L.push('');
  L.push('## What each model ran with');
  L.push('');
  L.push('Which worker.js each model ran is in this folder\'s README. Where a model ran through an adapter in the bake-off wrapper, the changes it made to each Anthropic call are counted here.');
  L.push('');
  L.push('| Model | Anthropic calls | Calls through an adapter | Changes to the request | Replies where blocks were taken out before the worker saw them |');
  L.push('|---|---|---|---|---|');
  for (const m of order) {
    const a = adapterSummary(models[m]);
    const ch = Object.entries(a.changes).map(([k, v]) => k + ' (' + v + ')').join(', ') || 'none';
    L.push('| ' + m + ' | ' + a.calls + ' | ' + a.adapted + ' | ' + ch + ' | ' + a.removed + ' |');
  }
  L.push('');
  if (focus) L.push(...renderFocus(focus, order, models, grades));

  // A
  L.push('## A. Leniency');
  L.push('');
  L.push('Each model run is set against each baseline run on the same spark, mechanism and element: 3 by 3 gives 9 pairs per slot, fewer when a run stopped before that step. "Higher" means the model gave a stronger state than that baseline run did (inert < turbid < clearing < settled). The baseline row sets the baseline against itself, each run against each other run, as the noise floor.');
  L.push('');
  L.push('A slot the baseline never graded, because its chain stopped earlier on that spark, has nothing to compare against and is counted in the last column only. The end-of-chain table further down covers those sparks.');
  L.push('');
  L.push('| Model | Pairs compared | Model higher | Model lower | Slots with any higher pair | Slots only this model graded |');
  L.push('|---|---|---|---|---|---|');
  const self = selfLeniency(grades[baseline]);
  L.push('| ' + baseline + ' (against itself) | ' + self.pairs + ' | ' + self.higher + ' (' + pct(self.higher, self.pairs) + ') | ' + self.higher + ' (' + pct(self.higher, self.pairs) + ') | - | - |');
  const lenRes = {};
  for (const m of order.slice(1)) {
    const r = leniency(grades[baseline], grades[m], slotInfo);
    lenRes[m] = r;
    L.push('| ' + m + ' | ' + r.pairs + ' | ' + r.higher + ' (' + pct(r.higher, r.pairs) + ') | ' + r.lower + ' (' + pct(r.lower, r.pairs) + ') | ' + r.cases.length + ' | ' + r.onlyCand + ' |');
  }
  L.push('');
  for (const m of order.slice(1)) {
    const r = lenRes[m];
    L.push('### A. Every case: ' + m);
    L.push('');
    if (!r.cases.length) { L.push('None.'); L.push(''); continue; }
    L.push('| Spark | Mechanism | Element | Baseline (run 1, 2, 3) | ' + m + ' (run 1, 2, 3) | Pairs higher |');
    L.push('|---|---|---|---|---|---|');
    for (const c of r.cases) L.push('| ' + c.spark + ' | ' + c.mech + ' | ' + ELEMENT_NAME[c.element] + ' | ' + fmt(c.base) + ' | ' + fmt(c.cand) + ' | ' + c.higher + ' of ' + c.pairs + ' |');
    L.push('');
  }
  L.push('### A. End of chain');
  L.push('');
  L.push('The element states each spark finished with, after the floor rule. Same pairing.');
  L.push('');
  L.push('| Model | Pairs compared | Model higher | Model lower |');
  L.push('|---|---|---|---|');
  const selfF = selfLeniency(finals[baseline]);
  L.push('| ' + baseline + ' (against itself) | ' + selfF.pairs + ' | ' + selfF.higher + ' (' + pct(selfF.higher, selfF.pairs) + ') | ' + selfF.higher + ' (' + pct(selfF.higher, selfF.pairs) + ') |');
  const finRes = {};
  for (const m of order.slice(1)) {
    const r = leniency(finals[baseline], finals[m], slotInfo);
    finRes[m] = r;
    L.push('| ' + m + ' | ' + r.pairs + ' | ' + r.higher + ' (' + pct(r.higher, r.pairs) + ') | ' + r.lower + ' (' + pct(r.lower, r.pairs) + ') |');
  }
  L.push('');
  for (const m of order.slice(1)) {
    const r = finRes[m];
    L.push('### A. End of chain, every case: ' + m);
    L.push('');
    if (!r.cases.length) { L.push('None.'); L.push(''); continue; }
    L.push('| Spark | Element | Baseline end state (run 1, 2, 3) | ' + m + ' end state (run 1, 2, 3) | Pairs higher |');
    L.push('|---|---|---|---|---|');
    for (const c of r.cases) L.push('| ' + c.spark + ' | ' + ELEMENT_NAME[c.element] + ' | ' + fmt(c.base) + ' | ' + fmt(c.cand) + ' | ' + c.higher + ' of ' + c.pairs + ' |');
    L.push('');
  }

  // B
  L.push('## B. Fabrication');
  L.push('');
  const fabRes = {};
  for (const m of order) fabRes[m] = fabrication(models[m]);
  L.push(...renderFabrication(order, fabRes));

  // C
  L.push('## C. Consistency');
  L.push('');
  L.push('Each model against its own three runs. A slot counts when all three runs graded it. "Split" means the three runs did not all give the same state. Pairs counts every two runs that both graded a slot.');
  L.push('');
  L.push('| Model | Slots graded in all runs | Split slots | Run pairs compared | Pairs that differ |');
  L.push('|---|---|---|---|---|');
  const conRes = {};
  for (const m of order) {
    const c = consistency(grades[m]);
    conRes[m] = c;
    L.push('| ' + m + (m === baseline ? ' (noise floor)' : '') + ' | ' + c.slots + ' | ' + c.split + ' (' + pct(c.split, c.slots) + ') | ' + c.pairs + ' | ' + c.pairsDiffer + ' (' + pct(c.pairsDiffer, c.pairs) + ') |');
  }
  L.push('');
  L.push('End of chain element states, same count:');
  L.push('');
  L.push('| Model | Slots | Split slots | Pairs | Pairs that differ |');
  L.push('|---|---|---|---|---|');
  for (const m of order) {
    const c = consistency(finals[m]);
    L.push('| ' + m + ' | ' + c.slots + ' | ' + c.split + ' (' + pct(c.split, c.slots) + ') | ' + c.pairs + ' | ' + c.pairsDiffer + ' (' + pct(c.pairsDiffer, c.pairs) + ') |');
  }
  L.push('');
  for (const m of order) {
    const c = conRes[m];
    L.push('### C. Split slots: ' + m);
    L.push('');
    if (!c.splits.length) { L.push('None.'); L.push(''); continue; }
    L.push('| Spark | Mechanism | Element | Run 1, 2, 3 |');
    L.push('|---|---|---|---|');
    const sorted = c.splits.map(k => ({ ...slotInfo[k], arr: grades[m][k] }))
      .sort((a, b) => a.spark - b.spark || a.mech.localeCompare(b.mech) || a.element.localeCompare(b.element));
    for (const s of sorted) L.push('| ' + s.spark + ' | ' + s.mech + ' | ' + ELEMENT_NAME[s.element] + ' | ' + fmt(s.arr) + ' |');
    L.push('');
  }
  L.push('### C. How each chain ran');
  L.push('');
  L.push('Phase A outcome, then whether the chain ran to M7 or stopped. One column per model, runs 1, 2, 3 separated by semicolons.');
  L.push('');
  L.push('| Spark | ' + order.join(' | ') + ' |');
  L.push('|---|' + order.map(() => '---').join('|') + '|');
  const shapes = Object.fromEntries(order.map(m => [m, chainShape(models[m])]));
  const sparkIds = [...new Set(order.flatMap(m => Object.keys(shapes[m])))].map(Number).sort((a, b) => a - b);
  for (const idx of sparkIds) L.push('| ' + idx + ' | ' + order.map(m => (shapes[m][idx] || []).map(s => s || '-').join('; ')).join(' | ') + ' |');
  L.push('');

  // D
  L.push('## D. Cost');
  L.push('');
  L.push('Tokens and dollars from the usage block of every Anthropic reply, recorded by bakeoff/worker-bakeoff.js. Output tokens include thinking tokens, which are billed as output. A full chain is a spark that ran M0 to M7 without stopping. Prices per million tokens, by the model that served the call: ' + Object.entries(PRICES).map(([m, p]) => m + ' $' + p.input + ' in, $' + p.output + ' out').join('; ') + '.');
  L.push('');
  L.push('| Model | Full chains | Mean input tokens per chain | Mean output tokens per chain | Mean $ per chain | Cheapest chain | Dearest chain | Calls where the API sent a thinking block |');
  L.push('|---|---|---|---|---|---|---|---|');
  const costRes = {};
  for (const m of order) {
    const c = cost(m, models[m]);
    costRes[m] = c;
    L.push('| ' + m + ' | ' + c.chains + ' | ' + int(c.meanIn) + ' | ' + int(c.meanOut) + ' | ' + usd(c.meanUsd) + ' | ' + usd(c.minUsd) + ' | ' + usd(c.maxUsd) + ' | ' + c.thinkingCalls + ' of ' + c.calls + ' |');
  }
  L.push('');
  L.push('Whole battery, per run (all 20 sparks, halted ones included):');
  L.push('');
  L.push('| Model | Run | Input tokens | Output tokens | $ |');
  L.push('|---|---|---|---|---|');
  for (const m of order) for (const r of costRes[m].perRun) L.push('| ' + m + ' | ' + r.name + ' | ' + int(r.in) + ' | ' + int(r.out) + ' | ' + usd(r.usd) + ' |');
  L.push('');
  L.push('Model that actually served the calls, as the API reported it: ' + order.map(m => m + ': ' + Object.entries(costRes[m].servedBy).map(([k, v]) => k + ' (' + v + ')').join(', ')).join('; ') + '.');
  L.push('');

  await fs.writeFile(path.join(root, 'REPORT.md'), L.join('\n'), 'utf8');
  console.log('Wrote ' + path.join(root, 'REPORT.md'));
}

// --focus 1,2,7:M3,M4:echo → each listed slot, every run of every model, and the
// answer that was graded (the battery's answers are the same for every model).
function renderFocus(spec, order, models, grades) {
  const [sp, mc, el] = spec.split(':');
  const sparks = sp.split(',').map(Number);
  const mechs = mc.split(',');
  const answerFor = (idx, mech) => {
    for (const m of order) for (const runRec of models[m]) {
      const rec = runRec.sparks[idx];
      const entry = rec && rec.run.log.find(e => mechOf(e) === mech);
      if (entry && entry.request && entry.request.user_answer) return entry.request.user_answer;
    }
    return '(not reached)';
  };
  const L = [];
  L.push('## Focus: ' + ELEMENT_NAME[el] + ' on ' + mechs.join(' and ') + ', sparks ' + sparks.join(', '));
  L.push('');
  L.push('| Spark | Mechanism | ' + order.map(m => m + ' (run 1, 2, 3)').join(' | ') + ' |');
  L.push('|---|---|' + order.map(() => '---').join('|') + '|');
  for (const idx of sparks) for (const mech of mechs) {
    const key = idx + '|' + mech + '|' + el;
    L.push('| ' + idx + ' | ' + mech + ' | ' + order.map(m => fmt(grades[m][key] || models[m].map(() => null))).join(' | ') + ' |');
  }
  L.push('');
  L.push('The answers graded:');
  L.push('');
  L.push('| Spark | Mechanism | Answer |');
  L.push('|---|---|---|');
  for (const idx of sparks) for (const mech of mechs) L.push('| ' + idx + ' | ' + mech + ' | ' + answerFor(idx, mech).replace(/\|/g, '/') + ' |');
  L.push('');
  return L;
}

function renderFabrication(order, fabRes) {
  const L = [];
  L.push('Counted over all three runs. A request is one call from the battery to the worker. A reply is one answer from the model; /field can take two. Anchors are re-checked from the raw reply with the worker\'s own rule: whitespace collapsed, case-sensitive substring of the builder\'s answer (M1: of the name and relationship). "Server changed" rows are cases where the model sent something the worker replaced before the app would see it. A mechanism\'s overall state is not an element; elements move only on the bars, which the server does not change except M6 (words and tell capped at clearing when the words are reconstructed; echo folded to turbid).');
  L.push('');
  const kinds = [...new Set(order.flatMap(m => Object.keys(fabRes[m].t.failures)))].sort();
  const phaseA = [...new Set(order.flatMap(m => Object.keys(fabRes[m].t.phaseA)))].sort();
  const lowered = [...new Set(order.flatMap(m => Object.keys(fabRes[m].t.lowered)))].sort();
  const guards = [...new Set(order.flatMap(m => Object.keys(fabRes[m].t.m0Guards)))].sort();
  const row = (label, f) => L.push('| ' + label + ' | ' + order.map(m => f(fabRes[m].t)).join(' | ') + ' |');
  L.push('| | ' + order.join(' | ') + ' |');
  L.push('|---|' + order.map(() => '---').join('|') + '|');
  row('Requests to the worker', t => t.requests);
  row('Model replies with HTTP 200', t => t.replies);
  row('**Requests that failed**', t => Object.values(t.failures).reduce((a, b) => a + b, 0));
  for (const k of kinds) row('&nbsp;&nbsp;' + k, t => t.failures[k] || 0);
  row('**Anchors the model gave** (M1 to M7)', t => t.anchorsTried);
  row('&nbsp;&nbsp;not verbatim in the builder\'s words', t => t.anchorsBad + ' (' + pct(t.anchorsBad, t.anchorsTried) + ')');
  row('**Phase A server downgrades**', t => Object.values(t.phaseA).reduce((a, b) => a + b, 0));
  for (const k of phaseA) row('&nbsp;&nbsp;' + k, t => t.phaseA[k] || 0);
  row('**Server changed a grade or state the model sent**', t => Object.values(t.lowered).reduce((a, b) => a + b, 0));
  for (const k of lowered) row('&nbsp;&nbsp;' + k, t => t.lowered[k] || 0);
  row('M4 contrast replaced as invalid', t => t.contrastReplaced);
  row('substitution_detected not a boolean', t => t.subNotBool);
  row('/field briefs retried after failing checks', t => t.fieldRetries);
  row('Replies with a style check hit (dash or contrast formula)', t => t.style + ' (' + t.styleHits + ' hits)');
  for (const k of guards) row('M0 ' + k, t => t.m0Guards[k] || 0);
  L.push('');
  for (const m of order) {
    const cs = fabRes[m].cases;
    L.push('### B. Cases: ' + m);
    L.push('');
    if (!cs.length) { L.push('None.'); L.push(''); continue; }
    L.push('| Run | Spark | Step | What happened |');
    L.push('|---|---|---|---|');
    cs.sort((a, b) => a.spark - b.spark || a.run.localeCompare(b.run));
    for (const c of cs) L.push('| ' + c.run + ' | ' + c.spark + ' | ' + c.route + ' | ' + c.what.replace(/\|/g, '/') + ' |');
    L.push('');
  }
  return L;
}

main().catch(err => { console.error(err); process.exit(1); });
