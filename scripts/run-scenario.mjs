// Scripted runs: plays one scenario against the real app in headless Chromium, against the live
// worker, and saves what happened as JSON. Every run gets a fresh browser profile, so it starts
// from an empty cellar and never touches anyone's real browser or cellar.
//
//   node scripts/run-scenario.mjs <scenario> [--runs N] [--out dir]
//   node scripts/run-scenario.mjs finding1 --runs 3 --out runs/2026-10-21-finding1
//
// Per run it writes run-N-cellar.json, the file the app's own "Export cellar" button downloads,
// and run-N-observed.json: what the screen showed at each step, the bottle at each checkpoint,
// and what happened against each expected result. It reports. It never judges a run.
//
// The app is played at http://localhost:8080/corked_v6.html?rhythmtest=1, so a held question
// comes back after two minutes and the script waits that out. If nothing answers on port 8080
// (Start Corked.bat not running), the script serves the repo folder there itself for the run.

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8080;
const APP_URL = `http://localhost:${PORT}/corked_v6.html?rhythmtest=1`;
const WORKER_URL = 'https://orked-m1-proxy.kneebonewebdesign.workers.dev';
const CELLAR_KEY = 'corked-cellar-v1';
const STEP_TIMEOUT = 120000;   // one worker call, with room to spare
const HOLD_TIMEOUT = 300000;   // a held question in rhythm-test mode comes back after two minutes

// ── THE APP, DRIVEN THROUGH ITS SCREENS ──
// Every action is a click or typing on the page. Reads come from the screen or from the
// bottle the app saved in localStorage.

function driver(page, rec) {
  const visible = sel => page.locator(sel).first().isVisible();
  const text = async sel => ((await page.locator(sel).first().textContent()) || '').trim();
  const waitFor = (fn, arg, timeout = STEP_TIMEOUT) => page.waitForFunction(fn, arg, { timeout, polling: 250 });

  const app = {
    page,
    text,
    visible,

    step(name, detail = {}) {
      rec.steps.push({ at: new Date().toISOString(), step: name, ...detail });
      console.log(`[run ${rec.run}] ${name}${detail.note ? ': ' + detail.note : ''}`);
    },

    async bottle() {
      return page.evaluate(key => {
        const all = JSON.parse(localStorage.getItem(key) || '[]');
        return all[0] || null;
      }, CELLAR_KEY);
    },

    async open() {
      await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
      await page.locator('#screen-landing.active').waitFor({ timeout: STEP_TIMEOUT });
      app.step('opened the app on an empty cellar');
    },

    // From the empty cellar's landing: cork an idea, type the spark, bottle it. The worker URL is
    // typed into the spark step's field when the app asks for it, as a person would.
    async addSpark(spark) {
      await page.locator('#bottle-cta-svg').click();
      await page.locator('#screen-intake.active #f-inp').waitFor({ timeout: STEP_TIMEOUT });
      await page.locator('#f-inp').fill(spark);
      await page.locator('#v6-bottle-btn').click();
      if (await visible('#m0-config')) {
        await page.locator('#v6-worker-url').fill(WORKER_URL);
        await page.locator('#v6-bottle-btn').click();
      }
      await waitFor(() => {
        const opts = document.querySelector('#intake-body .options');
        const refused = document.getElementById('m0-result');
        const status = document.getElementById('v6-bottle-status')?.textContent || '';
        return !!opts || (refused && refused.style.display === 'block') || status.startsWith('Error');
      });
      const status = await text('#v6-bottle-status').catch(() => '');
      if (status.startsWith('Error')) throw new Error(`Bottling failed: ${status}`);
      if (await visible('#m0-result')) throw new Error(`Spark refused: ${await text('#m0-entry-line')}`);
      const question = await text('#intake-body .step-q');
      app.step('bottled the spark', { note: `screen asks "${question}"` });
      return question;
    },

    async pickOption(optionText) {
      const opt = page.locator('#intake-body .opt').filter({ has: page.getByText(optionText, { exact: true }) });
      await opt.click();
      app.step('picked', { note: optionText });
    },

    async intakeContinue() {
      await page.locator('#grape-continue-btn').click();
    },

    // The person step. Returns once the app has left intake, or throws with the app's own note
    // when the grape was refused.
    async enterGrape(name, relationship) {
      await page.locator('#grape-name-inp').fill(name);
      await page.locator('#grape-rel-inp').fill(relationship);
      await page.locator('#grape-continue-btn').click();
      await waitFor(() => {
        if (!document.querySelector('#screen-intake.active')) return true;
        const btn = document.getElementById('grape-continue-btn');
        return btn && !btn.disabled && typeof intakeSel !== 'undefined' && !!intakeSel.grape_error;
      });
      if (await visible('#screen-intake.active')) {
        throw new Error(`Grape not taken: ${await page.evaluate(() => intakeSel.grape_error)}`);
      }
      app.step('entered the grape', { note: `${name}, "${relationship}"` });
    },

    async skipPhase1IntroIfShown() {
      if (await visible('#screen-phase1-intro.active')) {
        await page.locator('.p1i-skip').click();
        app.step('skipped the Phase 1 intro');
      }
      await page.locator('#screen-phase1.active').waitFor({ timeout: STEP_TIMEOUT });
    },

    async setRhythm(pace, timing) {
      await page.locator('#p1-btn').click();
      await page.locator('#rhythm-panel.is-visible').waitFor({ timeout: STEP_TIMEOUT });
      await page.locator('#rhythm-panel .rhythm-choice', { hasText: new RegExp(`^${pace}$`) }).click();
      await page.locator('#rhythm-panel .rhythm-choice', { hasText: new RegExp(`^${timing}$`) }).click();
      await page.locator('#p1-btn:not([disabled])').click();
      app.step('set the rhythm', { note: `${pace}, ${timing}` });
    },

    // M2 opens on Phase A. Returns the stage it settled on: friction, or scene. A wording that
    // waits for the builder is taken with "That's the problem", as a person reading it would.
    async waitForM2() {
      await waitFor(() => {
        const btn = document.getElementById('p1-btn');
        const err = document.getElementById('park-error');
        return (btn && !btn.disabled && btn.textContent.trim() !== 'Reading moment...')
          || (err && err.style.display === 'block');
      });
      if (await visible('#park-error')) throw new Error(`M2 Phase A: ${await text('#park-error')}`);
      const problemShown = await visible('#m2-problem') ? await page.evaluate(() => {
        const inp = document.getElementById('m2-problem-inp');
        const t = document.getElementById('m2-problem-text');
        return (inp && inp.style.display !== 'none') ? inp.value : (t?.textContent || '');
      }) : '';
      if ((await text('#p1-btn')) === "That's the problem") {
        app.step('M2 shows a wording for the problem', { note: problemShown });
        await page.locator('#p1-btn').click();
        await waitFor(() => document.getElementById('p1-btn')?.textContent.trim() !== "That's the problem");
        app.step('took the wording');
      }
      const empty = await page.locator('#m2-problem-text.is-empty').isVisible();
      const stage = empty ? 'scene' : 'friction';
      app.step('M2 opened', { note: `${stage} stage` });
      return { stage, problemShown };
    },

    // Types an answer to the current question and submits it. Resolves once the reading is on
    // screen (or a follow-up has opened), with what the screen shows.
    async answer(answerText) {
      const question = await text('#m-q');
      await page.locator('#ans').fill(answerText);
      await page.locator('#p1-btn').click();
      await waitFor(() => {
        const ans = document.getElementById('ans');
        const btn = document.getElementById('p1-btn');
        const obs = document.getElementById('obs-box')?.textContent || '';
        return obs.startsWith('Worker error') || (ans.hasAttribute('readonly') && !btn.disabled);
      });
      const reading = await text('#obs-box');
      if (reading.startsWith('Worker error')) throw new Error(reading);
      const followUp = await visible('#swirl-panel') ? await text('#swirl-q') : null;
      app.step('answered', { note: `${await text('#m-label')}` });
      return { question, reading, followUp };
    },

    async answerFollowUp(answerText) {
      await page.locator('#swirl-ans').fill(answerText);
      await page.locator('#swirl-btn').click();
      await waitFor(() => {
        const panel = document.getElementById('swirl-panel');
        const obs = document.getElementById('obs-box')?.textContent || '';
        return obs.startsWith('Worker error') || panel.style.display === 'none';
      });
      const reading = await text('#obs-box');
      if (reading.startsWith('Worker error')) throw new Error(`Follow-up: ${reading}`);
      app.step('answered the follow-up');
      return { reading };
    },

    // The next question is held: back to the cellar, wait until it comes back, open the bottle.
    // A stalled note on the way in is opened through, as a person would.
    async waitOutHold() {
      const label = await text('#p1-btn');
      if (label !== 'Back to the cellar') {
        app.step('no hold on screen', { note: `main button reads "${label}"` });
        return;
      }
      const due = (await app.bottle())?.s?.questionOpensAt;
      await page.locator('#p1-btn').click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      app.step('back in the cellar, waiting out the hold', { note: `question due ${due}` });
      await waitFor(() => {
        const all = JSON.parse(localStorage.getItem('corked-cellar-v1') || '[]');
        const at = all[0]?.s?.questionOpensAt;
        return !at || new Date(at).getTime() <= Date.now();
      }, undefined, HOLD_TIMEOUT);
      await page.waitForTimeout(1000);
      app.step('the hold is over', { note: `card reads "${await text('.bottle-card-status')}"` });
      await page.locator('.bottle-card').first().click();
      await page.locator('#screen-phase1.active').waitFor({ timeout: STEP_TIMEOUT });
      if (await visible('#stalled-panel')) {
        app.step('stalled note shown, opening the question');
        await page.getByRole('button', { name: 'Open the question →' }).click();
      }
      app.step('opened the bottle', { note: await text('#m-label') });
    },

    // Continue to the next question. The errand warning, if it comes up, is passed with
    // "Continue anyway".
    async continueToNext(expectedName) {
      await page.locator('#p1-btn').click();
      await waitFor(name => {
        const warn = document.getElementById('errand-warn-overlay');
        return warn.classList.contains('show') || (document.getElementById('m-label')?.textContent || '').includes(name);
      }, expectedName);
      if (await visible('#errand-warn-overlay')) {
        app.step('errand warning shown, continuing anyway');
        await page.locator('#errand-warn-overlay .ew-go').click();
        await waitFor(name => (document.getElementById('m-label')?.textContent || '').includes(name), expectedName);
      }
      app.step('next question open', { note: await text('#m-label') });
      return text('#m-q');
    },

    // Click an element in the sidebar label and read the review panel and its reopen.
    async openElement(key) {
      await page.locator(`#elr-${key}`).click();
      const shown = await page.locator('#review-panel').isVisible();
      const reopenShown = shown && await page.locator('#rv-reopen').isVisible();
      const result = {
        review_shown: shown,
        reopen_shown: reopenShown,
        reopen_label: reopenShown ? await text('#rv-reopen-mech') : null,
        reopen_question: reopenShown ? await text('#rv-reopen-q') : null
      };
      app.step(`opened ${key}`, { note: reopenShown ? result.reopen_label : 'no reopen shown' });
      return result;
    },

    // Back to the cellar and the app's own Export cellar. If the run broke off somewhere the
    // cellar can't be reached from, a reload lands there.
    async exportCellar(path) {
      if (await visible('#screen-phase1.active')) await page.locator('.sb-back').first().click();
      if (!(await visible('#screen-cellar.active'))) {
        await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
        await page.locator('#screen-cellar.active').waitFor({ timeout: 15000 });
      }
      const [download] = await Promise.all([
        page.waitForEvent('download', { timeout: STEP_TIMEOUT }),
        page.getByRole('button', { name: 'Export cellar' }).click()
      ]);
      await download.saveAs(path);
      app.step('exported the cellar', { note: path });
    }
  };
  return app;
}

// What a checkpoint keeps of the bottle: element states, the log so far, the readings.
function checkpoint(bottle) {
  const s = bottle?.s || {};
  return {
    mechIndex: bottle?.mechIndex ?? null,
    elements: { ...(s.elements || {}) },
    problem: s.problem || null,
    m2_question: s.m2_problem?.question ?? null,
    m2: s.m2 || null,
    m3: s.m3 || null,
    log: s.log || []
  };
}

// ── SCENARIOS ──
// Each scenario plays its steps into rec.screens and rec.checkpoints, then reports, for every
// expected result, what happened. A report states facts. It never says pass or fail.

const SCENARIOS = {
  finding1: {
    title: "Finding 1: only a moment that happened to the grape settles the Vintage",
    expected: [
      'After bottling, the screen asks "Have you spoken to a real person this spark comes from?"',
      'After M2, the Vintage is not Settled. If it is, the run can\'t test the call.',
      'After M3: the Echo is Settled, the Vintage is unchanged, the M3 reading doesn\'t contain "vintage" in any capitalisation, and the M3 history log entry lists no Vintage move.',
      "The Vintage reopen shows M2's question."
    ],

    async play(app, rec) {
      await app.open();
      rec.screens.after_bottling = await app.addSpark(
        'An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.');

      // Spoken to them and seen it.
      await app.pickOption('Yes.');
      await app.pickOption('Yes, I can name them and I know the moment.');
      await app.intakeContinue();
      await app.enterGrape('Lotte', 'my cousin, she shoots weddings');
      await app.skipPhase1IntroIfShown();
      // Daily, any part of the day: in rhythm-test mode every part of the day returns alike.
      await app.setRhythm('Daily', 'Morning');

      const m2 = await app.waitForM2();
      rec.screens.m2_stage = m2.stage;
      rec.screens.m2_problem_shown = m2.problemShown;
      if (m2.stage === 'scene') throw new Error('M2 asked for the scene. The scenario has no scene answer.');

      const m2Answer = await app.answer(
        'Whenever a couple cancels late, Lotte emails them twice asking for the fee, then gives up.');
      rec.screens.m2_question = m2Answer.question;
      rec.screens.m2_reading = m2Answer.reading;
      rec.screens.m2_follow_up = m2Answer.followUp;
      if (m2Answer.followUp) {
        const f = await app.answerFollowUp("It happens a few times a year. I don't remember one in particular.");
        rec.screens.m2_reading_after_follow_up = f.reading;
      }
      rec.checkpoints.after_m2 = checkpoint(await app.bottle());

      await app.waitOutHold();
      rec.screens.m3_question = await app.continueToNext('Third-Party Workarounds');
      const m3Answer = await app.answer(
        'Marco, another wedding photographer in Utrecht, started charging a non-refundable booking fee upfront after a couple cancelled on him a week before their wedding in 2024. He now sends every couple a payment link the same day they sign.');
      rec.screens.m3_reading = m3Answer.reading;
      rec.screens.m3_follow_up = m3Answer.followUp;
      rec.checkpoints.after_m3 = checkpoint(await app.bottle());

      rec.screens.vintage_review = await app.openElement('vintage');
    },

    report(rec) {
      const out = [];
      const s = rec.screens;
      const a2 = rec.checkpoints.after_m2;
      const a3 = rec.checkpoints.after_m3;

      out.push(s.after_bottling !== undefined
        ? `Screen asked: "${s.after_bottling}"`
        : 'Not reached.');

      if (!a2) out.push('Not reached.');
      else {
        const v = a2.elements.vintage;
        out.push(`Vintage after M2: ${v}. Follow-up shown: ${s.m2_follow_up ? `yes, "${s.m2_follow_up}"` : 'no'}.`
          + (v === 'settled' ? " The Vintage settled at M2, so this run can't test the call." : ''));
      }

      if (!a3) out.push('Not reached.');
      else {
        const reading = a3.m3?.observation?.surface_text || '';
        const m3Entries = a3.log.filter(e => e.type === 'answer' && e.mech === 'M3');
        const moves = m3Entries.flatMap(e => e.moved || []);
        const vintageMoves = moves.filter(m => m.element === 'vintage');
        out.push([
          `Echo after M3: ${a3.elements.echo}.`,
          `Vintage before M3: ${a2.elements.vintage}, after M3: ${a3.elements.vintage}.`,
          `"vintage" in the M3 reading: ${/vintage/i.test(reading) ? 'yes' : 'no'} (stored reading: "${reading}"; on screen: "${s.m3_reading}").`,
          `"vintage" anywhere in the stored M3 reply: ${/vintage/i.test(JSON.stringify(a3.m3 || {})) ? 'yes' : 'no'}.`,
          `M3 log entries: ${m3Entries.length}. Moves listed: ${moves.map(m => `${m.element} ${m.from}→${m.to}`).join(', ') || 'none'}. Vintage moves: ${vintageMoves.length}.`,
          s.m3_follow_up ? `A follow-up opened at M3: "${s.m3_follow_up}". Not answered.` : 'No follow-up at M3.'
        ].join(' '));
      }

      const r = s.vintage_review;
      if (!r) out.push('Not reached.');
      else {
        const m2Shown = s.m2_question || '';
        out.push(r.reopen_shown
          ? `Reopen shown: "${r.reopen_label}". Question: "${r.reopen_question}". M2's question as shown at M2: "${m2Shown}". Same text: ${r.reopen_question === m2Shown ? 'yes' : 'no'}.`
          : `No reopen shown (review panel shown: ${r.review_shown ? 'yes' : 'no'}).`);
      }
      return out;
    }
  }
};

// ── RUNNING ──

async function serveRepoIfNeeded() {
  const up = await fetch(`http://localhost:${PORT}/corked_v6.html`, { method: 'HEAD' }).then(r => r.ok).catch(() => false);
  if (up) { console.log(`Using the server already on port ${PORT}.`); return null; }
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
    '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
  const server = createServer(async (req, res) => {
    const path = normalize(join(REPO, decodeURIComponent(new URL(req.url, 'http://x').pathname)));
    if (!path.startsWith(REPO + sep)) { res.writeHead(403); res.end(); return; }
    try {
      const body = await readFile(path);
      res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise((ok, fail) => server.once('error', fail).listen(PORT, 'localhost', ok));
  console.log(`Serving the repo on port ${PORT} for this run.`);
  return server;
}

async function playOnce(browser, scenarioName, scenario, run, outDir) {
  const rec = {
    scenario: scenarioName, title: scenario.title, run,
    app_url: APP_URL, worker_url: WORKER_URL,
    started_at: new Date().toISOString(), finished_at: null,
    broke_off: null, page_errors: [],
    steps: [], screens: {}, checkpoints: {}, expected: []
  };
  const context = await browser.newContext({ acceptDownloads: true, viewport: { width: 1400, height: 900 } });
  const page = await context.newPage();
  page.on('pageerror', err => rec.page_errors.push(String(err && err.message || err)));
  const app = driver(page, rec);
  try {
    await scenario.play(app, rec);
  } catch (err) {
    rec.broke_off = String(err && err.message || err);
    app.step('broke off', { note: rec.broke_off });
  }
  try {
    await app.exportCellar(join(outDir, `run-${run}-cellar.json`));
  } catch (err) {
    rec.export_error = String(err && err.message || err);
    app.step('export failed', { note: rec.export_error });
  }
  await context.close();
  rec.finished_at = new Date().toISOString();
  const happened = scenario.report(rec);
  rec.expected = scenario.expected.map((expected, i) => ({ n: i + 1, expected, happened: happened[i] }));
  await writeFile(join(outDir, `run-${run}-observed.json`), JSON.stringify(rec, null, 2) + '\n');
  return rec;
}

async function main() {
  const args = process.argv.slice(2);
  const scenarioName = args.find(a => !a.startsWith('--'));
  const opt = name => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : null; };
  const scenario = SCENARIOS[scenarioName];
  if (!scenario) {
    console.error(`Usage: node scripts/run-scenario.mjs <${Object.keys(SCENARIOS).join('|')}> [--runs N] [--out dir]`);
    process.exit(1);
  }
  const runs = Math.max(1, parseInt(opt('runs') || '1', 10));
  const outDir = resolve(REPO, opt('out') || join('runs', `${new Date().toISOString().slice(0, 10)}-${scenarioName}`));
  await mkdir(outDir, { recursive: true });

  const server = await serveRepoIfNeeded();
  const browser = await chromium.launch();
  let recs;
  try {
    recs = await Promise.all(Array.from({ length: runs }, (_, i) => playOnce(browser, scenarioName, scenario, i + 1, outDir)));
  } finally {
    await browser.close();
    if (server) server.close();
  }

  console.log(`\n${scenario.title}`);
  for (const rec of recs) {
    console.log(`\nRun ${rec.run}${rec.broke_off ? ` (broke off: ${rec.broke_off})` : ''}`);
    for (const e of rec.expected) console.log(`  ${e.n}. ${e.happened}`);
  }
  console.log(`\nSaved to ${outDir}`);
}

main().catch(err => { console.error(err); process.exit(1); });
