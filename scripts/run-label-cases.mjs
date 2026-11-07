// The short label (B1b): B1's three person cases and the brief's three label cases, against a worker.
// For each answer it calls /m1 the way the old intake does (no label), /m1 the way a new bottle's F1
// does (with_label), and /label the way E4 does. It reports the grades side by side and every label.
// It reports; it never judges.
//   node scripts/run-label-cases.mjs [--out runs/<folder>]
//   CORKED_WORKER=<url> calls that worker instead of the live one.

import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import '../shared/provenance.js';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WORKER_URL = (process.env.CORKED_WORKER || 'https://orked-m1-proxy.kneebonewebdesign.workers.dev').replace(/\/$/, '');
const SPARK = 'An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.';

const CASES = [
  { kind: 'person case (B1)', answer: 'M., my sister, she runs a one-woman cleaning business' },
  { kind: 'person case (B1)', answer: 'a colleague who manages bookings for our plumbing crew' },
  { kind: 'person case (B1)', answer: 'freelancers I know' },
  { kind: 'label case (B1b)', answer: "Jamie Kneebone, it's me" },
  { kind: 'label case (B1b)', answer: 'Myself of course, and some of my football friends' },
  { kind: 'label case (B1b)', answer: 'freelancers I know' }
];

async function call(path, body) {
  const res = await fetch(WORKER_URL + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:8080' },
    body: JSON.stringify(body)
  });
  return { status: res.status, body: await res.json().catch(() => null) };
}

const added = (label, answer) => label ? globalThis.CorkedProvenance.unsupportedWords(label, `${answer} you your yours yourself they them their`, { scene: true }) : [];
const grade = r => r?.body?.grape ? `${r.body.grape.state} / ${r.body.grape.person_kind}` : `error ${r?.status} ${r?.body?.error || ''}`;

async function main() {
  const args = process.argv.slice(2);
  const i = args.indexOf('--out');
  const outDir = resolve(REPO, i >= 0 ? args[i + 1] : join('runs', `${new Date().toISOString().slice(0, 10)}-b1b-label-cases`));
  await mkdir(outDir, { recursive: true });
  const results = [];
  for (const c of CASES) {
    const m1Body = { spark_summary: SPARK, person_name: '', relationship: c.answer, maturity_class: 0 };
    const [alone, labelled, people] = await Promise.all([
      call('/m1', m1Body),
      call('/m1', { ...m1Body, with_label: true }),
      call('/label', { answer: c.answer, kind: 'people' })
    ]);
    results.push({ ...c, worker: WORKER_URL, at: new Date().toISOString(), m1_alone: alone, m1_with_label: labelled, label_people: people });
    console.log(`${c.answer}: grade alone ${grade(alone)}, with label ${grade(labelled)}; F1 label "${labelled.body?.label}" is_self ${labelled.body?.is_self}; E4 label "${people.body?.label}"`);
  }
  await writeFile(join(outDir, 'label-cases.json'), JSON.stringify(results, null, 2) + '\n');
  const lines = ['# The short label: person and label cases', '', `Worker: ${WORKER_URL}`, `Run: ${new Date().toISOString()}`, ''];
  for (const r of results) {
    const l = r.m1_with_label.body || {};
    const p = r.label_people.body || {};
    lines.push(`## "${r.answer}" (${r.kind})`);
    lines.push(`- /m1 as the old intake sends it: ${grade(r.m1_alone)}, prompt_version ${r.m1_alone.body?.prompt_version}`);
    lines.push(`- /m1 with_label (F1): ${grade(r.m1_with_label)}. Same grape as without: ${r.m1_alone.body?.grape?.state === l.grape?.state && r.m1_alone.body?.grape?.person_kind === l.grape?.person_kind}`);
    lines.push(`- F1 label: ${l.label == null ? 'null' : `"${l.label}"`}, is_self ${l.is_self}, ${l.label ? l.label.split(/\s+/).length : 0} words, words not in the answer: ${added(l.is_self ? '' : l.label, r.answer).join(', ') || 'none'}, check ${JSON.stringify(l.server_checks?.label || null)}`);
    lines.push(`- /label (E4): ${p.label == null ? 'null' : `"${p.label}"`}, is_self ${p.is_self}, ${p.label ? p.label.split(/\s+/).length : 0} words, words not in the answer: ${added(p.is_self ? '' : p.label, r.answer).join(', ') || 'none'}, check ${JSON.stringify(p.server_checks?.label || null)}, prompt_version ${p.prompt_version}`);
    lines.push('');
  }
  await writeFile(join(outDir, 'label-cases.md'), lines.join('\n'));
  console.log(`Saved to ${outDir}`);
}

main().catch(err => { console.error(err); process.exit(1); });
