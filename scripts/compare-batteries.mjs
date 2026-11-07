// Compares two battery runs written with CORKED_JSON=1 and lists every grade that differs.
//   node scripts/compare-batteries.mjs <before-folder> <after-folder> [out.md]
// A grade is a mechanism's overall state, each bar's state, M1's person kind and M2 Phase A's
// outcome. A spark that stopped at a different place is listed too. It reports; it never judges.

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const [beforeDir, afterDir, outFile] = process.argv.slice(2);
if (!beforeDir || !afterDir) {
  console.error('Usage: node scripts/compare-batteries.mjs <before-folder> <after-folder> [out.md]');
  process.exit(1);
}

const BARS = ['grape', 'tell', 'vintage', 'gap', 'echo', 'limit', 'words'];

function gradesOf(run) {
  const g = {};
  for (const e of run.log || []) {
    if (e.kind !== 'main' || !e.response) continue;
    const r = e.response;
    const key = e.endpoint === '/m2 (phase A)' ? 'M2 Phase A' : e.mech;
    if (key === 'M0') { g['M0 digestibility'] = r.digestibility?.state ?? null; g['M0 in scope'] = r.scope ? r.scope.in_scope !== false : true; continue; }
    if (key === 'M2 Phase A') { g['M2 Phase A outcome'] = r.outcome ?? null; continue; }
    if (key === 'M1') {
      g['M1 grape'] = r.grape?.state ?? null;
      g['M1 person kind'] = r.grape?.person_kind ?? null;
      continue;
    }
    if (r.state) g[`${key} overall`] = r.state;
    for (const bar of BARS) if (r[bar]?.state) g[`${key} ${bar}`] = r[bar].state;
  }
  g['stopped'] = run.halted ? run.haltMsg : 'completed';
  return g;
}

async function load(dir) {
  const files = (await readdir(dir)).filter(f => /^spark-\d+\.json$/.test(f)).sort();
  const out = {};
  for (const f of files) out[f] = JSON.parse(await readFile(join(dir, f), 'utf8'));
  return out;
}

const before = await load(resolve(beforeDir));
const after = await load(resolve(afterDir));
const lines = [`# Grades that differ`, '', `Before: ${beforeDir}`, `After: ${afterDir}`, ''];
let total = 0;
for (const f of Object.keys(before)) {
  const a = after[f];
  if (!a) { lines.push(`## ${f}`, 'Missing from the after run.', ''); continue; }
  const gb = gradesOf(before[f].run), ga = gradesOf(a.run);
  const keys = [...new Set([...Object.keys(gb), ...Object.keys(ga)])];
  const diffs = keys.filter(k => JSON.stringify(gb[k]) !== JSON.stringify(ga[k]));
  if (!diffs.length) continue;
  total += diffs.length;
  lines.push(`## ${f}: ${before[f].cfg.raw_spark}`);
  if (before[f].cfg.grapeName || before[f].cfg.grapeRel) lines.push(`Person: "${before[f].cfg.grapeName}" / "${before[f].cfg.grapeRel}"`);
  for (const k of diffs) lines.push(`- ${k}: ${gb[k] ?? 'none'} → ${ga[k] ?? 'none'}`);
  lines.push('');
}
lines.push(`${total} grade${total === 1 ? '' : 's'} differ across ${Object.keys(before).length} sparks.`);
const text = lines.join('\n') + '\n';
if (outFile) await writeFile(resolve(outFile), text);
console.log(text);
