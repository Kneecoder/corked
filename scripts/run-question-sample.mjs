// The question writer's sample (B1c T6): /question three times per slot on five sparks, with the
// brief's answers where they exist and short stand-ins where they don't. Writes every question to one
// file, grouped by spark and slot, and marks any that broke a rule the script can read. It reports;
// it never judges.
//   node scripts/run-question-sample.mjs [--out runs/<folder>] [--runs 3]
//   CORKED_WORKER=<url> calls that worker instead of the live one.

import { mkdir, writeFile } from 'node:fs/promises';
import { join, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import '../shared/first-session-copy.js';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WORKER_URL = (process.env.CORKED_WORKER || 'https://orked-m1-proxy.kneebonewebdesign.workers.dev').replace(/\/$/, '');
const V2 = globalThis.CorkedFirstSessionCopy.v2;

// Each spark: its path, and the answers in order. "stand-in" marks answers that aren't the brief's.
const SPARKS = [
  {
    name: 'The garden', path: 'fix',
    spark: 'A tool to analyse gardens and it calculates how many times a year you need upkeep and what tools you need.',
    answers: {
      F1: 'My grandpa, 76.',
      F2: 'He called me to come fix it, he had no idea what to do.',
      F3: 'Gvie im an estiamte of the work to be done to keep it a nice looking garden',
      F4: 'An app that maps a garden and tells you how often it needs upkeep and which tools you need. (stand-in)'
    }
  },
  {
    name: 'The rental', path: 'fix',
    spark: 'An AI tool that helps you when you rent a place to document the current conditions, easily.',
    answers: {
      F1: 'Me, when I moved into my flat in March.',
      F2: 'I took a lot of pictures of the outlets and sinks, but I did not know what mattered. (stand-in)',
      F3: 'Tell me which rooms and fittings to photograph, and keep it all in one report. (stand-in)',
      F4: 'An app that walks you through recording the state of a rented flat on move in day. (stand-in)',
      F7: 'Sam, my neighbour, who moved into the flat upstairs last month (stand-in)'
    }
  },
  {
    name: 'The football quiz', path: 'experiment',
    spark: 'A trivia app for football fans to challenge each others ballknowledge.',
    answers: {
      E1: 'My friends quiz each other about old match results in our group chat. (stand-in)',
      E2: 'Like they want one more round straight away. (stand-in)'
    }
  },
  {
    name: 'The daily picture game', path: 'experiment',
    spark: 'A daily game where you describe one picture in a single sentence.',
    answers: {
      E1: 'My friends post their Wordle scores in our group chat every morning. (stand-in)',
      E2: 'Curious what the others wrote about the same picture. (stand-in)'
    }
  },
  {
    name: 'The Zendesk tool', path: 'fix',
    spark: "A tool that views your Zendesk instance and gives instructions on how to build custom applications in it based on how it's setup.",
    answers: {
      F1: 'A developer at my last job who had to build a Zendesk app for our support team. (stand-in)',
      F2: 'He spent two days reading the Zendesk docs and asked on the developer forum. (stand-in)',
      F3: 'Tell him which parts of our setup the app had to fit. (stand-in)',
      F4: 'A tool that reads your Zendesk setup and tells you how to build an app for it. (stand-in)'
    }
  }
];

const SLOTS = { fix: ['F1', 'F2', 'F3', 'F5'], experiment: ['E1', 'E2', 'E3'] };
// What comes before each slot. F5 comes after the four first questions, and "Who could you ask?"
// when the builder was the person.
const BEFORE = { F1: [], F2: ['F1'], F3: ['F1', 'F2'], F5: ['F1', 'F2', 'F3', 'F4', 'F7'], E1: [], E2: ['E1'], E3: ['E1', 'E2'] };
// The questions those answers are sent with: the fixed fallbacks, so every run gets the same inputs.
const FIXED_QUESTION = {
  F1: V2.fallback.F1(), F2: V2.fallback.F2({ person: 'x' }), F3: V2.fallback.F3({ person: 'x' }),
  F4: V2.sayAgain.question, F7: V2.plan.askWho, E1: V2.fallback.E1(), E2: V2.fallback.E2()
};
const strip = text => text.replace(/\s*\(stand-in\)$/, '');

// The rules a script can read. The worker's own check is reported next to them.
function rulesBroken(q, path) {
  const s = String(q || '').replace(/\s+/g, ' ').trim();
  const broke = [];
  if ((s.match(/\?/g) || []).length !== 1 || !s.endsWith('?')) broke.push('one question mark, at the end');
  if (s.split(' ').length > 25) broke.push('more than 25 words');
  if (/[—–]|\s-\s|--/.test(s)) broke.push('a dash');
  if (path === 'experiment' && /\b(problem|need|wrong|stopped)/i.test(s)) broke.push('a problem word on the experiment path');
  if (/\bthe last time\s*[,?]/i.test(s)) broke.push('"the last time" without saying of what');
  if (/\b(e\.g\.|for example|for instance|such as)\b/i.test(s)) broke.push('an example');
  return broke;
}

async function ask(body) {
  const res = await fetch(WORKER_URL + '/question', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:8080' },
    body: JSON.stringify(body)
  });
  return { status: res.status, body: await res.json().catch(() => null) };
}

async function main() {
  const args = process.argv.slice(2);
  const opt = name => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : null; };
  const runs = Math.max(1, parseInt(opt('runs') || '3', 10));
  const outDir = resolve(REPO, opt('out') || join('runs', `${new Date().toISOString().slice(0, 10)}-b1c-question-sample`));
  await mkdir(outDir, { recursive: true });

  const results = [];
  for (const s of SPARKS) {
    for (const slot of SLOTS[s.path]) {
      const answers = BEFORE[slot].filter(q => s.answers[q]).map(q => ({ slot: q, question: FIXED_QUESTION[q], answer: strip(s.answers[q]) }));
      const body = { path: s.path, slot, spark: s.spark, answers };
      const got = await Promise.all(Array.from({ length: runs }, () => ask(body)));
      for (const [i, r] of got.entries()) {
        const q = r.body?.question || null;
        const said = q || r.body?.server_checks?.question?.said || null;
        results.push({
          spark: s.name, path: s.path, slot, run: i + 1, status: r.status,
          question: q, worker_check: r.body?.server_checks?.question?.check || r.body?.error || null, said,
          rules_broken: rulesBroken(said, s.path), prompt_version: r.body?.prompt_version, model: r.body?.model, sent: body
        });
      }
      console.log(`${s.name} ${slot}: ${got.map(r => r.body?.question || `[${r.body?.server_checks?.question?.check || r.status}]`).join(' | ')}`);
    }
  }

  await writeFile(join(outDir, 'question-sample.json'), JSON.stringify({ worker: WORKER_URL, at: new Date().toISOString(), results }, null, 2) + '\n');
  const lines = ['# The question writer: a sample', '', `Worker: ${WORKER_URL}`, `Run: ${new Date().toISOString()}`, `Each slot ${runs} times. Answers marked (stand-in) are not the brief's.`, ''];
  for (const s of SPARKS) {
    lines.push(`## ${s.name} (${s.path})`, '', `Spark: "${s.spark}"`, '');
    for (const [slot, text] of Object.entries(s.answers)) lines.push(`- ${slot} answer: "${text}"`);
    lines.push('');
    for (const slot of SLOTS[s.path]) {
      lines.push(`### ${slot}`, '');
      for (const r of results.filter(x => x.spark === s.name && x.slot === slot)) {
        const flag = r.worker_check !== 'ok' ? ` **worker check: ${r.worker_check}**` : '';
        const broke = r.rules_broken.length ? ` **breaks: ${r.rules_broken.join(', ')}**` : '';
        lines.push(`${r.run}. ${r.said ? `"${r.said}"` : '(no question)'}${flag}${broke}`);
      }
      lines.push('');
    }
  }
  const broken = results.filter(r => r.worker_check !== 'ok' || r.rules_broken.length);
  lines.push('## Rule breaks the script found', '');
  lines.push(broken.length ? broken.map(r => `- ${r.spark} ${r.slot} run ${r.run}: "${r.said}" (${[r.worker_check !== 'ok' ? `worker: ${r.worker_check}` : '', ...r.rules_broken].filter(Boolean).join(', ')})`).join('\n') : '- none');
  lines.push('');
  await writeFile(join(outDir, 'question-sample.md'), lines.join('\n'));
  console.log(`${results.length} questions, ${broken.length} with a rule break the script can read. Saved to ${outDir}`);
}

main().catch(err => { console.error(err); process.exit(1); });
