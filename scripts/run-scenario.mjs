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
import { execFileSync } from 'node:child_process';
import '../shared/provenance.js';

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8080;
const APP_URL = `http://localhost:${PORT}/corked_v6.html?rhythmtest=1`;
// CORKED_WORKER=<url> plays against that worker instead of the live one: a version uploaded with
// no traffic, before it is deployed. The report names the worker each run used.
const WORKER_URL = (process.env.CORKED_WORKER || 'https://orked-m1-proxy.kneebonewebdesign.workers.dev').replace(/\/$/, '');
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

    // The bottle the run is working on: the one holding app.spark, else the first in the cellar.
    async bottle() {
      return page.evaluate(({ key, spark }) => {
        const all = JSON.parse(localStorage.getItem(key) || '[]');
        return (spark ? all.find(b => b.s?.idea === spark) : all[0]) || null;
      }, { key: CELLAR_KEY, spark: app.spark || null });
    },

    card() {
      return app.spark ? page.locator('.bottle-card', { hasText: app.spark.slice(0, 40) }) : page.locator('.bottle-card').first();
    },

    // A scenario on the real calendar instead of the two-minute test rhythm:
    // app.open({ rhythmTest: false, at: '2026-11-05T01:00:00' }) sets the page's clock, and
    // page.clock.setFixedTime() moves it on later, so nothing waits real days.
    async open({ rhythmTest = true, at = null } = {}) {
      if (at) await page.clock.setFixedTime(new Date(at));
      await page.goto(rhythmTest ? APP_URL : APP_URL.replace('?rhythmtest=1', ''), { waitUntil: 'domcontentloaded' });
      await page.locator('#screen-landing.active').waitFor({ timeout: STEP_TIMEOUT });
      app.step('opened the app on an empty cellar');
    },

    // From the landing or the cellar: open the spark step, click the field once and type. Keys go
    // wherever the focus is, so the text only lands if that one click took. It waits for the
    // cycling placeholder first, because a field that hasn't got one isn't the field a person meets.
    async typeSpark(spark, { fromCellar = false } = {}) {
      if (fromCellar) await page.getByRole('button', { name: 'Add Spark' }).click();
      else await page.locator('#bottle-cta').click();
      await page.locator('#screen-intake.active .ph-overlay').waitFor({ state: 'attached', timeout: STEP_TIMEOUT });
      const field = page.locator('#f-inp');
      await field.click();
      const focus = await page.evaluate(() => document.activeElement?.id || document.activeElement?.tagName || null);
      await page.keyboard.type(spark);
      const value = await field.inputValue();
      app.step('clicked the spark field once and typed', { note: `focus on ${focus}` });
      return { clicks_on_field: 1, focus_after_click: focus, field_value: value };
    },

    // The button under the spark. Returns what the gate shows.
    async openGate() {
      await page.locator('#v6-bottle-btn').click();
      await page.locator('#spark-gate').waitFor({ state: 'visible', timeout: STEP_TIMEOUT });
      const gate = {
        question: await text('#spark-gate .step-q'),
        buttons: await page.locator('#spark-gate button').allTextContents()
      };
      app.step('the gate is showing', { note: gate.question });
      return gate;
    },

    // "A problem someone has", then the same road as before the gate: M0. The worker URL is typed
    // into the spark step's field when the app asks for it, as a person would.
    async passGate() {
      await page.locator('#spark-gate button', { hasText: 'A problem someone has' }).click();
      if (await visible('#m0-config')) {
        await page.locator('#v6-worker-url').fill(WORKER_URL);
        await page.locator('#v6-bottle-btn').click();
      }
      await waitFor(() => {
        const opts = document.querySelector('#intake-body .options');
        const refused = document.getElementById('m0-result');
        const status = document.getElementById('v6-bottle-status')?.textContent || '';
        return !!opts || (refused && refused.style.display === 'block') || status === SEND_FAILED_TEXT;
      });
      // Intake has moved on when the spark bottled, and this line has gone with it.
      const status = ((await page.locator('#v6-bottle-status').first().textContent({ timeout: 1000 }).catch(() => '')) || '').trim();
      if (status && status === await page.evaluate(() => SEND_FAILED_TEXT)) throw new Error(`Bottling failed: ${status}`);
      if (await visible('#m0-result')) throw new Error(`Spark refused: ${await text('#m0-entry-line')}`);
      const question = await text('#intake-body .step-q');
      app.step('bottled the spark', { note: `screen asks "${question}"` });
      return question;
    },

    async addSpark(spark, options) {
      const typed = await app.typeSpark(spark, options);
      if (typed.field_value !== spark) throw new Error('The spark did not reach the field.');
      await app.openGate();
      return app.passGate();
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

    async waitForPhase1() {
      await page.locator('#screen-phase1.active').waitFor({ timeout: STEP_TIMEOUT });
    },

    async setRhythm(pace, timing) {
      await page.locator('#p1-btn').click();
      await page.locator('#rhythm-panel.is-visible').waitFor({ timeout: STEP_TIMEOUT });
      await page.locator('#rhythm-panel .rhythm-choice', { hasText: new RegExp(`^${pace}$`) }).click();
      await page.locator('#rhythm-panel .rhythm-choice', { hasText: new RegExp(`^${timing}$`) }).click();
      app.rhythmShown = {
        choices: await page.locator('#rhythm-panel .rhythm-choice').allTextContents(),
        summary: await text('#rhythm-summary')
      };
      await page.locator('#p1-btn:not([disabled])').click();
      app.step('set the rhythm', { note: `${pace}, ${timing}` });
    },

    // M2 opens on Phase A. Returns the stage it settled on: friction, or scene. A wording that
    // waits for the builder is taken with "That's the problem", as a person reading it would.
    // onWording: runs while that wording is on screen, before it is taken.
    async waitForM2({ onWording } = {}) {
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
        if (onWording) await onWording(problemShown);
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
        const failed = document.getElementById('send-failed');
        return failed.style.display === 'flex' || (ans.hasAttribute('readonly') && !btn.disabled);
      });
      if (await visible('#send-failed')) throw new Error(await text('#send-failed'));
      const reading = await text('#obs-box');
      const followUp = await visible('#swirl-panel') ? await text('#swirl-q') : null;
      app.step('answered', { note: `${await text('#m-label')}` });
      return { question, reading, followUp };
    },

    async answerFollowUp(answerText) {
      await page.locator('#swirl-ans').fill(answerText);
      await page.locator('#swirl-btn').click();
      await waitFor(() => {
        const panel = document.getElementById('swirl-panel');
        const failed = document.getElementById('swirl-failed');
        return failed.style.display === 'flex' || panel.style.display === 'none';
      });
      if (await visible('#swirl-failed')) throw new Error(`Follow-up: ${await text('#swirl-failed')}`);
      const reading = await text('#obs-box');
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
      // An errand draws no main button while the question is held: the way back is the sidebar.
      if (await visible('#p1-btn')) await page.locator('#p1-btn').click();
      else await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      app.step('back in the cellar, waiting out the hold', { note: `question due ${due}` });
      await app.waitForHoldToEnd();
      await app.openFromCellar();
    },

    async waitForHoldToEnd() {
      await waitFor(spark => {
        const all = JSON.parse(localStorage.getItem('corked-cellar-v1') || '[]');
        const at = (spark ? all.find(b => b.s?.idea === spark) : all[0])?.s?.questionOpensAt;
        return !at || new Date(at).getTime() <= Date.now();
      }, app.spark || null, HOLD_TIMEOUT);
      await page.waitForTimeout(1000);
      app.step('the hold is over', { note: `card reads "${await app.card().locator('.bottle-card-status').textContent()}"` });
    },

    async openFromCellar() {
      await app.card().click();
      await page.locator('#screen-phase1.active').waitFor({ timeout: STEP_TIMEOUT });
      if (await visible('#stalled-panel')) {
        app.step('stalled note shown, opening the question');
        await page.getByRole('button', { name: 'Open the question →' }).click();
      }
      app.step('opened the bottle', { note: await text('#m-label') });
    },

    // A follow-up the scenario has no answer for: back to the cellar through the sidebar, wait out
    // any hold, and open the bottle again, so nothing is typed that the scenario doesn't give.
    async leaveFollowUpUnanswered() {
      await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      app.step('left the follow-up unanswered');
      await app.waitForHoldToEnd();
      await app.openFromCellar();
    },

    // "Come back to this", then wait for the return time and open the parked card.
    async parkAndComeBack() {
      await page.locator('#rw-park-btn').click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      const card = (await app.card().locator('.bottle-card-status').textContent()).trim();
      const due = (await app.bottle())?.nextQuestionAt;
      app.step('parked, waiting for it to come back', { note: `card reads "${card}", due ${due}` });
      await waitFor(spark => {
        const all = JSON.parse(localStorage.getItem('corked-cellar-v1') || '[]');
        const at = all.find(b => b.s?.idea === spark)?.nextQuestionAt;
        return !at || new Date(at).getTime() <= Date.now();
      }, app.spark, HOLD_TIMEOUT);
      await page.waitForTimeout(1000);
      await app.card().click();
      await page.locator('#dormant-panel').waitFor({ state: 'visible', timeout: STEP_TIMEOUT });
      app.step('the parked question came back');
      return { card, question: await text('#dormant-panel-body .mech-q') };
    },

    // Answers the parked card. wordsButton: the words-source button to pick first.
    async answerParked(answerText, wordsButton = null) {
      if (wordsButton) await page.locator(wordsButton).click();
      await page.locator('#dr-answer').fill(answerText);
      await page.locator('#dr-submit-btn').click();
      await waitFor(() => {
        const err = document.getElementById('dr-error');
        if (err && err.style.display === 'block') return true;
        const ans = document.getElementById('ans');
        const btn = document.getElementById('p1-btn');
        const panel = document.getElementById('dormant-panel');
        return panel.style.display === 'none' && ans.hasAttribute('readonly') && !btn.disabled;
      });
      if (await visible('#dr-error')) throw new Error(await text('#dr-error'));
      const followUp = await visible('#swirl-panel') ? await text('#swirl-q') : null;
      app.step('answered the parked question', { note: await text('#m-label') });
      return { reading: await text('#obs-box'), followUp };
    },

    // Every piece of copy on the question screen that is showing right now.
    async screenCopy() {
      return page.evaluate(() => {
        const out = {};
        const ids = ['m-label', 'm-q', 'm-hint', 'm6-interstitial', 'wm-brief', 'm6-ws-real', 'm6-ws-recon', 'obs-box', 'change-block',
          'inline-errand', 'pace-line', 'swirl-q', 'sb-rhythm', 'dormant-panel-body', 'p1-btn', 'rw-park-btn', 'rw-flight-btn'];
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.offsetParent !== null && el.textContent.trim()) out[id] = el.textContent.trim().replace(/\s+/g, ' ');
        }
        return out;
      });
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

    // Like continueToNext, for a question that may be passed over.
    async continueToEither(names) {
      await page.locator('#p1-btn').click();
      const arrived = list => {
        const warn = document.getElementById('errand-warn-overlay');
        const label = document.getElementById('m-label')?.textContent || '';
        return warn.classList.contains('show') || list.some(n => label.includes(n));
      };
      await waitFor(arrived, names);
      if (await visible('#errand-warn-overlay')) {
        app.step('errand warning shown, continuing anyway');
        await page.locator('#errand-warn-overlay .ew-go').click();
        await waitFor(arrived, names);
      }
      app.step('next question open', { note: await text('#m-label') });
      return text('#m-q');
    },

    // From the last question on to the label screen.
    async continueToLabel() {
      await page.locator('#p1-btn').click();
      await waitFor(() => document.getElementById('errand-warn-overlay').classList.contains('show')
        || !!document.querySelector('#screen-label.active'));
      if (await visible('#errand-warn-overlay')) {
        app.step('errand warning shown, continuing anyway');
        await page.locator('#errand-warn-overlay .ew-go').click();
        await page.locator('#screen-label.active').waitFor({ timeout: STEP_TIMEOUT });
      }
      app.step('label screen open');
    },

    async labelBackToCellar() {
      await page.locator('#screen-label button', { hasText: 'Back to the cellar' }).click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
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

// ── THE ARCHITECTURE REVIEW SCENARIO: ITS INPUTS AND STEPS ──

const REVIEW_BOTTLES = {
  A: {
    spark: 'An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.',
    name: 'Lotte', rel: 'my cousin, she shoots weddings', pace: 'Every other day', timing: 'Evening',
    answers: {
      M2: 'Last March a couple cancelled two days before their wedding. Lotte had already turned down another booking for that date. She emailed them twice asking for the fee, got no reply, and let it go.',
      M3: 'Marco, another wedding photographer in Utrecht, started charging a non-refundable booking fee upfront after a couple cancelled on him in 2024.',
      M4: 'Sanne shoots company events. When a company cancels late, her cancellation fee gets paid without any discussion.',
      M5: "Lotte uses a contract template she found online. It has a cancellation clause, but she has never used it because she's afraid of a bad review.",
      M6: "Lotte told me: I can't chase a couple for money the week their wedding falls apart.",
      M7: "Probably some photographers don't have this."
    }
  },
  B: {
    spark: 'An app that tells me which of my plants need water, because I keep forgetting until they die.',
    name: 'me', rel: 'me', pace: 'Weekly', timing: 'Morning',
    answers: {
      M2: "Last Sunday I found my basil dead on the windowsill. I'd watered it the Sunday before and didn't think about it again.",
      M3: "My neighbour Fatima keeps a note on her fridge with each plant's watering day.",
      M4: 'My colleague Joost travels for work and comes home to dried-out plants every few weeks.',
      M5: 'I set a weekly phone reminder, then turned it off because it went off while I was away.',
      M6: "I just forget they're there until they're dead.",
      M7: "My sister doesn't have this, because she's out in her garden every day."
    }
  }
};

// Notes what the screen shows, and any place the old pace label turns up in the page.
async function reviewSnapshot(app, rec, key, when) {
  const b = rec.screens[key];
  b.screens.push({ when, copy: await app.screenCopy() });
  const old = await app.page.evaluate(() => /any other day/i.test(document.documentElement.innerHTML));
  if (old) rec.screens.old_pace_label_seen.push(`${key}: ${when}`);
}

// Answers the question on screen, keeps what came back, and gets past any hold or follow-up.
async function reviewAnswer(app, rec, key, mech, wordsButton = null) {
  const b = rec.screens[key];
  await reviewSnapshot(app, rec, key, `${mech} question`);
  if (wordsButton) await app.page.locator(wordsButton).click();
  const got = await app.answer(REVIEW_BOTTLES[key].answers[mech]);
  b.readings[mech] = got;
  await reviewSnapshot(app, rec, key, `${mech} reading`);
  return got;
}

async function reviewParkThenAnswer(app, rec, key, mech, { wordsButton = null } = {}) {
  const b = rec.screens[key];
  await reviewSnapshot(app, rec, key, `${mech} question, before parking`);
  const asked = await app.text('#m-q');
  const back = await app.parkAndComeBack();
  await reviewSnapshot(app, rec, key, `${mech} parked card`);
  b.parked = { mech, asked_before_parking: asked, asked_when_back: back.question, card: back.card };
  const got = await app.answerParked(REVIEW_BOTTLES[key].answers[mech], wordsButton);
  b.readings[mech] = { question: back.question, ...got };
  await reviewSnapshot(app, rec, key, `${mech} reading`);
  return got;
}

async function reviewMoveOn(app, got) {
  if (got.followUp) await app.leaveFollowUpUnanswered();
  else await app.waitOutHold();
}

// M2 to M4, the same in both bottles.
async function reviewFirstQuestions(app, rec, key) {
  const m2 = await app.waitForM2();
  rec.screens[key].m2_stage = m2.stage;
  rec.screens[key].problem_shown = m2.problemShown;
  if (m2.stage === 'scene') throw new Error('M2 asked for the scene. The scenario has no scene answer.');
  await reviewMoveOn(app, await reviewAnswer(app, rec, key, 'M2'));
  await app.continueToNext('Third-Party Workarounds');
  await reviewMoveOn(app, await reviewAnswer(app, rec, key, 'M3'));
  await app.continueToEither(['Second Person', 'The Existing Fix']);
  if ((await app.text('#m-label')).includes('Second Person')) {
    await reviewMoveOn(app, await reviewAnswer(app, rec, key, 'M4'));
    await app.continueToNext('The Existing Fix');
  } else {
    rec.screens[key].m4_skipped = true;
  }
}

async function reviewPlayBottleA(app, rec) {
  const key = 'A';
  const b = REVIEW_BOTTLES.A;
  app.spark = b.spark;
  await app.addSpark(b.spark);
  await app.pickOption('Yes.');
  await app.pickOption('Yes, I can name them and I know the moment.');
  await app.intakeContinue();
  await app.enterGrape(b.name, b.rel);
  await app.waitForPhase1();
  await app.setRhythm(b.pace, b.timing);
  rec.screens.A.rhythm_picker = app.rhythmShown;
  await reviewFirstQuestions(app, rec, key);

  await reviewMoveOn(app, await reviewParkThenAnswer(app, rec, key, 'M5'));
  await app.continueToNext('Their Words, Not Yours');
  await reviewMoveOn(app, await reviewAnswer(app, rec, key, 'M6', '#m6-ws-real'));
  await app.continueToNext('The Non-Case');
  const m7 = await reviewAnswer(app, rec, key, 'M7');
  if (m7.followUp) await app.leaveFollowUpUnanswered();
  await app.continueToLabel();
  rec.screens.A.label_foot = await app.text('.vc-foot');

  // Reopen the Limit. The worker call is blocked on the first submit only.
  const page = app.page;
  const before = await app.bottle();
  const reopen = { limit_state: before.s.elements.limit };
  rec.screens.A.reopen = reopen;
  const field = page.locator('.vc-field.tappable', { hasText: 'The Limit' });
  reopen.amber = (await field.count()) > 0;
  if (reopen.amber) {
    await field.click();
    await page.locator('#label-reopen-overlay.show').waitFor({ timeout: STEP_TIMEOUT });
    await page.waitForFunction(() => {
      const t = document.getElementById('lr-question')?.textContent || '';
      return t && t !== 'Reading the cellar…';
    }, undefined, { timeout: STEP_TIMEOUT, polling: 250 });
    reopen.question_shown = await app.text('#lr-question');
    reopen.buttons_shown = await page.locator('#lr-ws-row').isVisible();
    let blocked = 0;
    const handler = route => {
      if (route.request().method() === 'POST' && !blocked) { blocked++; return route.abort('failed'); }
      return route.continue();
    };
    await page.route('**/m7', handler);
    const answerText = b.answers.M7;
    reopen.answer = answerText;
    await page.locator('#lr-ans').fill(answerText);
    await page.locator('#lr-submit-btn').click();
    await page.locator('#lr-error').waitFor({ state: 'visible', timeout: STEP_TIMEOUT });
    reopen.blocked_calls = blocked;
    reopen.error_on_screen = await app.text('#lr-error');
    reopen.question_after_block = await app.text('#lr-question');
    reopen.log_entries_after_block = (await app.bottle()).s.log.filter(x => x.type === 'answer' && x.mech === 'M7').length;
    app.step('blocked the reopen submit', { note: reopen.error_on_screen });
    await page.unroute('**/m7', handler);
    await page.locator('#lr-submit-btn').click();
    await page.locator('#label-reopen-overlay.show').waitFor({ state: 'hidden', timeout: STEP_TIMEOUT });
    await page.locator('#screen-label.active').waitFor({ timeout: STEP_TIMEOUT });
    app.step('the retry went through');
  } else {
    app.step('the Limit is not amber', { note: reopen.limit_state });
  }
  await app.labelBackToCellar();
}

async function reviewPlayBottleB(app, rec) {
  const key = 'B';
  const b = REVIEW_BOTTLES.B;
  app.spark = b.spark;
  await app.addSpark(b.spark, { fromCellar: true });
  await app.pickOption('No.');
  await app.pickOption('Yes. This comes from my own experience.');
  await app.intakeContinue();
  await app.enterGrape(b.name, b.rel);
  await app.waitForPhase1();
  await app.setRhythm(b.pace, b.timing);
  rec.screens.B.rhythm_picker = app.rhythmShown;
  await reviewFirstQuestions(app, rec, key);

  await reviewMoveOn(app, await reviewAnswer(app, rec, key, 'M5'));
  await app.continueToNext('Their Words, Not Yours');
  await reviewMoveOn(app, await reviewParkThenAnswer(app, rec, key, 'M6', { wordsButton: '#dr-ws-recon' }));
  await app.continueToNext('The Non-Case');
  const m7 = await reviewAnswer(app, rec, key, 'M7');
  if (m7.followUp) await app.leaveFollowUpUnanswered();
  await app.continueToLabel();
  rec.screens.B.label_foot = await app.text('.vc-foot');
  await app.labelBackToCellar();
}

async function reviewLookAtCellar(app) {
  return app.page.evaluate(() => {
    const stored = JSON.parse(localStorage.getItem('corked-cellar-v1') || '[]');
    return {
      cards: [...document.querySelectorAll('.bottle-card')].map(c => ({
        line: c.querySelector('.bottle-card-line')?.textContent.trim(),
        status: c.querySelector('.bottle-card-status')?.textContent.trim(),
        date: c.querySelector('.bottle-card-date')?.textContent.trim()
      })),
      stored: stored.map(x => ({ idea: x.s?.idea, updated_at: x.updated_at }))
    };
  });
}

// Everything the scenario typed for a bottle: the only places a line on its record may come from.
function reviewTyped(key) {
  const b = REVIEW_BOTTLES[key];
  return [b.spark, b.name, b.rel, ...Object.values(b.answers)];
}

function reviewBottleFromExport(cellar, key) {
  const raw = cellar?.keys?.[CELLAR_KEY];
  return raw ? JSON.parse(raw).find(x => x.s?.idea === REVIEW_BOTTLES[key].spark) : null;
}

function reviewRecordLines(bottle) {
  const s = bottle.s;
  const lines = [];
  for (const [element, text] of Object.entries(s.label || {})) if (text) lines.push({ where: `label ${element}`, text });
  if (s.problem?.text) lines.push({ where: `problem (${s.problem.source})`, text: s.problem.text });
  for (const entry of s.log || []) {
    for (const move of entry.moved || []) if (move.words) lines.push({ where: `log ${entry.mech} ${move.element}`, text: move.words });
  }
  return lines;
}

// ── THE FIRST MINUTE SCENARIO: ITS INPUTS ──

const FIRST_MINUTE = {
  bottle_1: {
    spark: 'An app that tells me which of my plants need water, because I keep forgetting until they die.',
    name: 'Sam',
    rel: 'My basil keeps dying.',
    pace: 'Weekly',
    timing: 'Morning'
  },
  bottle_2: {
    spark: 'A daily game where you describe a picture in one sentence and see how others described it.'
  },
  gone: ['Before the cellar', 'The cellar is making champagne', 'You are the grape']
};

// ── THE LOOK AND STATES SCENARIO: ITS INPUTS ──

const LOOK = {
  spark: 'An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.',
  pace: 'Every other day',
  timing: 'Evening',
  A: {
    name: 'Lotte',
    rel: 'my cousin, she shoots weddings',
    M2: 'Last March a couple cancelled two days before their wedding. Lotte had already turned down another booking for that date. She emailed them twice asking for the fee, got no reply, and let it go.',
    M3: "I don't know other wedding photographers well. I'd guess most of them just eat the loss.",
    M3_follow_up: "I haven't asked anyone else about it. I just assume others have it too."
  },
  B: {
    name: 'Sanne',
    rel: 'my friend, she shoots weddings',
    M2: 'It happens a few times a year. She gets annoyed and moves on.'
  },
  failed_line: "Not sent. Corked couldn't be reached, so nothing went on record. Your answer is still here."
};

// ── THE TRUST BASICS SCENARIO: ITS INPUTS ──

const TRUST = {
  canary: 'zq-canary-0611',
  ai_line: "An AI model writes some of Corked's questions and the line after an answer; the rest are fixed. Not a person. What you type goes through Corked's server to Anthropic's Claude. Anthropic doesn't train on it and deletes it within 30 days, or keeps it up to two years if its safety systems flag it. Your cellar is saved in this browser only.",
  caution: 'The AI can misread an answer. Check anything you act on.',
  failed_line: "Not sent. Corked couldn't be reached, so nothing went on record. Your answer is still here.",
  dead_worker: 'http://127.0.0.1:59999',
  pace: 'Every other day',
  timing: 'Evening',
  // A spark that states its problem: the model writes the question, the reading, the follow-up and the errand.
  A: {
    spark: 'An app for wedding photographers who lose their deposit when couples cancel two days before the shoot. zq-canary-0611',
    name: 'Lotte',
    rel: 'my cousin, she shoots weddings',
    M2: 'It happens a few times a year. She gets annoyed and moves on. zq-canary-0611',
    follow_up: 'I have not seen it myself, she only told me about it. zq-canary-0611',
    parked: 'I asked her again. She said it happens and she moves on. zq-canary-0611',
    M3: "I don't know other wedding photographers well. I'd guess most of them just eat the loss. zq-canary-0611",
    M3_follow_up: "I haven't asked anyone else about it. I just assume others have it too. zq-canary-0611"
  },
  // A spark that states none: M2 asks the scene question, which is the app's own copy.
  B: {
    spark: 'A better scheduling app for gym owners. zq-canary-0611',
    name: 'Marco',
    rel: 'owns the boxing gym where I train',
    scene: 'Last Tuesday Marco double booked the boxing ring because two trainers wrote their classes on different paper sheets, and he had to send six people home. zq-canary-0611'
  },
  // Self mode: the bottle's name is in the second person.
  C: {
    spark: 'A way to stop losing my receipts before tax season. zq-canary-0611',
    name: 'Jamie',
    rel: 'I lost a whole folder of receipts last March and paid more tax for it. zq-canary-0611'
  }
};

// The phone pass: the spark screen on an empty cellar, with the AI line showing, at 390x844. It has its
// own browser profile, because the line shows once per browser. It makes no worker call.
const PHONE_EXPECTED = 'At 390x844, on an empty cellar, the spark screen shows the AI line. Report where the Bottle button sits against the bottom of the screen, and save a screenshot.';
const LIMIT_EXPECTED = 'At 499 characters the spark field shows no limit line. At 500, typed or pasted, it shows "Sparks stop at 500 characters." under the field and takes no more. Emptied, the line is gone.';

async function phoneSparkPass(app, rec, watch = () => {}) {
  const context = await app.browser.newContext({ viewport: { width: 390, height: 844 } });
  try {
    const page = await context.newPage();
    page.on('pageerror', err => rec.page_errors.push(String(err && err.message || err)));
    watch(page);
    const phone = driver(page, rec);
    await phone.open();
    await page.locator('#bottle-cta').click();
    await page.locator('#screen-intake.active .ph-overlay').waitFor({ state: 'attached', timeout: STEP_TIMEOUT });
    await page.waitForFunction(() => !document.querySelector('.typed-rest'), undefined, { timeout: 30000, polling: 100 });
    rec.screens.phone = await page.evaluate(() => {
      const box = sel => {
        const el = document.querySelector(sel);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { top: Math.round(r.top), bottom: Math.round(r.bottom), visible: r.height > 0 && getComputedStyle(el).visibility !== 'hidden', text: (el.textContent || '').replace(/\s+/g, ' ').trim() };
      };
      return {
        viewport_width: window.innerWidth,
        viewport_height: window.innerHeight,
        scroll_y: window.scrollY,
        field: box('#f-inp'),
        ai_line: box('#spark-ai-line'),
        bottle_button: box('#v6-bottle-btn')
      };
    });
    await page.screenshot({ path: join(app.outDir, `run-${rec.run}-spark-screen-phone.png`) });
    const button = rec.screens.phone.bottle_button;
    app.step('the spark screen at 390x844', { note: `Bottle button bottom ${button?.bottom}, screen ends at ${rec.screens.phone.viewport_height}` });

    // The spark limit, typed and then pasted.
    await context.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: `http://localhost:${PORT}` });
    const readLimit = () => page.evaluate(() => {
      const line = document.getElementById('spark-limit');
      return {
        length: document.getElementById('f-inp').value.length,
        line: (line?.textContent || '').trim(),
        line_visible: (line?.getBoundingClientRect().height || 0) > 0,
        line_under_field: !!line && line.getBoundingClientRect().top >= document.getElementById('f-inp').getBoundingClientRect().bottom
      };
    });
    const long = 'spark '.repeat(120);
    const limit = rec.screens.spark_limit = {};
    await page.locator('#f-inp').click();
    await page.keyboard.type(long.slice(0, 499));
    limit.typed_499 = await readLimit();
    await page.keyboard.type('x');
    limit.typed_500 = await readLimit();
    await page.screenshot({ path: join(app.outDir, `run-${rec.run}-spark-limit-phone.png`) });
    await page.keyboard.type('y');
    limit.one_key_more = await readLimit();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Delete');
    limit.emptied = await readLimit();
    await page.evaluate(text => navigator.clipboard.writeText(text), long.slice(0, 600));
    await page.keyboard.press('Control+V');
    limit.pasted_600 = await readLimit();
    app.step('the spark limit, typed and pasted', { note: `pasted 600, the field holds ${limit.pasted_600.length}` });
  } finally {
    await context.close();
  }
}

function phoneSparkReport(rec) {
  const p = rec.screens?.phone;
  if (!p) return 'Not reached.';
  const b = p.bottle_button;
  return `Screen ${p.viewport_width}x${p.viewport_height}, scrolled ${p.scroll_y}px. AI line visible ${!!p.ai_line?.visible}, from ${p.ai_line?.top} to ${p.ai_line?.bottom}, text "${p.ai_line?.text}".`
    + ` Bottle button "${b?.text}" from ${b?.top} to ${b?.bottom}. Below the bottom of the screen: ${!!b && b.bottom > p.viewport_height}.`;
}

function sparkLimitReport(rec) {
  const l = rec.screens?.spark_limit;
  if (!l?.pasted_600) return 'Not reached.';
  const say = r => `field holds ${r.length}, line "${r.line}", visible ${r.line_visible}, under the field ${r.line_under_field}`;
  return `Typed 499: ${say(l.typed_499)}. Typed 500: ${say(l.typed_500)}. One key more: ${say(l.one_key_more)}. Emptied: ${say(l.emptied)}. Pasted 600: ${say(l.pasted_600)}.`;
}

// ── B1: A NEW BOTTLE'S FIRST SESSION ──
// The spark, the gate, one burst of questions, the end screen. Helpers shared by b1-s1 to b1-s9.

// The app before B1, for S6: the same repo with corked_v6.html as it was at this commit, served on
// port 5500, which is in the worker's ALLOWED_ORIGINS.
const B1_BEFORE = 'ce54d35';
const OLD_APP_PORT = 5500;

// Lines from the intake screens a new bottle no longer shows.
const B1_REMOVED_LINES = [
  'Have you spoken to a real person',
  'Can you name them, and have you witnessed',
  'Does this spark come from you?',
  'Name the person this spark comes from.',
  'How often should this spark return to you?',
  'When should it surface?',
  'Cellar rhythm',
  'Set rhythm first',
  'how far along'
];

// The variants as the brief words them.
const B1_BRIEF = {
  F2_no_person: 'What did you see go wrong, and when?',
  F5_no_person: 'When you find someone who runs into this, what do you expect to hear?'
};

const B1_EXPERIMENT_WORDS = /\b(problem|need|wrong|stopped)/i;

function b1NoteScreens(page) {
  return page.addInitScript(() => {
    window.__screens = [];
    const note = () => {
      const id = document.querySelector('.screen.active')?.id;
      if (id && window.__screens[window.__screens.length - 1] !== id) window.__screens.push(id);
    };
    const start = () => {
      note();
      new MutationObserver(note).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
  });
}

function b1WatchWorker(page, list, origin = WORKER_URL) {
  page.on('request', r => {
    if (!r.url().startsWith(origin) || r.method() !== 'POST') return;
    let body = null;
    try { body = JSON.parse(r.postData() || 'null'); } catch {}
    list.push({ at: new Date().toISOString(), ms: Date.now(), path: new URL(r.url()).pathname, body });
  });
}

// What a first-session screen shows.
function b1Snap(page) {
  return page.evaluate(() => {
    const q = document.getElementById('fs-q');
    const screen = document.querySelector('.screen.active');
    const t = id => document.getElementById(id)?.textContent.trim() || null;
    return {
      screen: screen?.id || null,
      qid: q?.dataset.q || null,
      question: q ? q.textContent.replace(/\s+/g, ' ').trim() : null,
      start: t('fs-start'),
      example: t('fs-example'),
      taps: [...document.querySelectorAll('#first-body .fs-tap')].map(b => b.textContent.trim()),
      tap_selected: document.querySelector('#first-body .fs-tap.is-selected')?.textContent.trim() || null,
      buttons: [...document.querySelectorAll('#first-body .fs-unsure button')].map(b => b.textContent.trim()),
      unsure: t('fs-unsure'),
      not_set: t('fs-notset'),
      skip: t('fs-skip'),
      next: t('fs-next'),
      number_fields: document.querySelectorAll('#first-body input[type="number"]').length,
      end: !!document.getElementById('fs-record'),
      // B1c: where the question came from, the say-it-again line, the AI tag, every button.
      source: q?.dataset.source || null,
      ready: q ? q.dataset.ready !== '0' : null,
      first_wrote: t('fs-first-wrote'),
      ai_tag: !!q?.querySelector('.ai-tag'),
      all_buttons: [...document.querySelectorAll('#first-body button')].map(b => b.textContent.trim()),
      visible_text: (screen?.innerText || '').trim()
    };
  });
}

function b1Driver(app, rec) {
  const page = app.page;
  const fs = {
    screens: [],

    // From the landing or the cellar: type the spark, "Bottle your spark →", and the gate shows.
    async newBottle(spark, { fromCellar = false } = {}) {
      app.spark = spark;
      const typed = await app.typeSpark(spark, { fromCellar });
      if (typed.field_value !== spark) throw new Error('The spark did not reach the field.');
      await page.locator('#v6-bottle-btn').click();
      fs.corkedAt = Date.now();
      if (await page.locator('#m0-config').isVisible()) {
        await page.locator('#v6-worker-url').fill(WORKER_URL);
        await page.locator('#v6-bottle-btn').click();
        fs.corkedAt = Date.now();
      }
      await page.locator('#spark-gate').waitFor({ state: 'visible', timeout: STEP_TIMEOUT });
      fs.gateAt = Date.now();
      const gate = {
        question: await app.text('#gate-q'),
        buttons: (await page.locator('#spark-gate button').allTextContents()).map(t => t.trim())
      };
      fs.screens.push({ screen: 'spark', spark });
      fs.screens.push({ screen: 'gate', ...gate, visible_text: (await page.locator('#screen-intake').innerText()).trim() });
      app.step('bottled the spark, the gate shows', { note: gate.question });
      return gate;
    },

    async pick(path) {
      const label = path === 'fix' ? 'A fix.' : 'An experiment.';
      await page.locator('#spark-gate button:visible, #fs-gate button:visible', { hasText: label }).first().click();
      fs.tappedAt = Date.now();
      await page.locator('#screen-first.active #fs-q').waitFor({ timeout: STEP_TIMEOUT });
      fs.firstQuestionAt = Date.now();
      const snap = await b1Snap(page);
      app.step(`picked ${path}`, { note: snap.question });
      return snap;
    },

    // B1c: a written question shows three dots until it comes back or falls back. Waits for it, and
    // notes how long the dots showed.
    async ready() {
      const from = Date.now();
      await page.waitForFunction(() => {
        const q = document.getElementById('fs-q');
        return !q || q.dataset.ready !== '0';
      }, undefined, { timeout: 15000, polling: 50 });
      return Date.now() - from;
    },

    // a: { text, tap, link }, or 'dont_know', 'not_set' or 'skip'. A tap already picked on screen
    // (F2 starts on "It was me" for the builder) is left as it is.
    async answer(a) {
      const dots_ms = await fs.ready();
      const before = { ...(await b1Snap(page)), dots_ms };
      if (!before.qid) throw new Error(`No question on screen (screen ${before.screen}).`);
      if (typeof a === 'string') {
        await page.locator({ skip: '#fs-skip', not_set: '#fs-notset', dont_know: '#fs-unsure' }[a]).click();
      } else {
        if (a.tap && before.tap_selected !== a.tap) await page.locator('#first-body .fs-tap').filter({ hasText: new RegExp(`^${a.tap}$`) }).click();
        if (a.link) await page.locator('#fs-link').fill(a.link);
        if (a.text) await page.locator('#fs-inp').fill(a.text);
        await page.locator('#fs-next').click();
      }
      const clickedAt = Date.now();
      await page.waitForFunction(prev => {
        const q = document.getElementById('fs-q');
        return (q && q.dataset.q !== prev) || !!document.getElementById('fs-record') || !!document.getElementById('fs-when') || !!document.getElementById('fs-plan');
      }, before.qid, { timeout: 10000, polling: 50 });
      fs.screens.push({ ...before, answered: a, next_screen_after_ms: Date.now() - clickedAt });
      app.step(`answered ${before.qid}`, { note: typeof a === 'string' ? a : (a.text || a.tap || '') });
      return before;
    },

    async readEnd() {
      await page.locator('#fs-record, #fs-plan').first().waitFor({ timeout: STEP_TIMEOUT });
      return page.evaluate(() => {
        const t = el => (el?.innerText || '').trim();
        const obs = document.getElementById('fs-obs');
        return {
          rows: [...document.querySelectorAll('#fs-record .fs-rec-row')].map(r => ({
            row: r.dataset.row, label: t(r.querySelector('.fs-rec-label')), value: t(r.querySelector('.fs-rec-value'))
          })),
          observation: obs && obs.style.display !== 'none' && obs.textContent.trim()
            ? { text: obs.textContent.trim(), ai_tag: !!obs.querySelector('.ai-tag'), ai_model: obs.dataset.aiModel || null }
            : null,
          ai_tagged: [...document.querySelectorAll('#screen-first [data-ai-generated]')].map(el => el.textContent.trim()),
          nobody: document.getElementById('fs-nobody')?.textContent.trim() || null,
          switch_link: document.getElementById('fs-switch')?.textContent.trim() || null,
          next_line: document.getElementById('fs-next-line')?.textContent.trim() || null,
          // B1c: the plan under the record, or the confirmation.
          plan: document.getElementById('fs-plan') ? {
            planned: document.getElementById('fs-planned-when')?.textContent.trim() || null,
            rows: [...document.querySelectorAll('#fs-plan-record .fs-rec-row')].map(r => ({ row: r.dataset.row, label: t(r.querySelector('.fs-rec-label')), value: t(r.querySelector('.fs-rec-value')) })),
            on_bottle: document.getElementById('fs-on-bottle')?.textContent.trim() || null,
            button: document.querySelector('#fs-plan #fs-cellar')?.textContent.trim() || null
          } : null,
          choices: [...document.querySelectorAll('#fs-choices button')].map(b => ({ id: b.id, text: b.textContent.trim(), cls: b.className, note: document.getElementById(`${b.id}-note`)?.textContent.trim() || null })),
          visible_text: t(document.getElementById('screen-first'))
        };
      });
    },

    async endScreen() {
      const end = await fs.readEnd();
      fs.screens.push({ screen: 'end', rows: end.rows.map(r => r.row) });
      return end;
    },

    // kind: ask, show or build. line: { text } when the line is asked for first.
    async planStep(kind, when, { day = null, line = null } = {}) {
      await page.locator(`#fs-choice-${kind}`).click();
      const asked = { line_asked: false };
      await page.waitForFunction(() => !!document.getElementById('fs-line-q') || !!document.getElementById('fs-when'), undefined, { timeout: 10000 });
      if (await page.locator('#fs-line-q').isVisible()) {
        asked.line_asked = true;
        asked.line_question = await app.text('#fs-line-q');
        asked.line_example = await page.locator('#fs-line-example').textContent().catch(() => null);
        asked.line_number_fields = await page.locator('#fs-choices input[type="number"]').count();
        asked.step_before_line = (await app.bottle())?.s?.first?.step || null;
        if (!line) throw new Error('The line was asked for and the scenario has none.');
        await page.locator('#fs-line-inp').fill(line.text);
        await page.locator('#fs-line-next').click();
        await page.locator('#fs-when').waitFor({ timeout: 10000 });
      }
      asked.planning = await app.text('#fs-planning');
      if (when === 'today') await page.locator('#fs-when-today').click();
      else if (when === 'this_week') await page.locator('#fs-when-week').click();
      else {
        await page.locator('#fs-when-day').click();
        await page.locator('#fs-day').fill(day);
        await page.locator('#fs-day-save').click();
      }
      await page.locator('#fs-planned').waitFor({ timeout: 10000 });
      asked.planned = { when: await app.text('#fs-planned-when'), step: await app.text('#fs-planned-step') };
      app.step('planned the step', { note: `${asked.planned.step}, ${asked.planned.when}` });
      return asked;
    },

    // Polls the stored bottle until a log entry matches, or the time runs out.
    async waitForLog(match, timeout = 90000) {
      const until = Date.now() + timeout;
      while (Date.now() < until) {
        const b = await app.bottle();
        const hit = (b?.s?.log || []).find(match);
        if (hit) return hit;
        await page.waitForTimeout(500);
      }
      return null;
    },

    async screensSeen() {
      return page.evaluate(() => window.__screens || []);
    },

    async backToCellar() {
      await page.locator('#fs-cellar').click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: 10000 });
    }
  };
  return fs;
}

// Which removed intake lines a screen's visible text holds.
function b1RemovedSeen(screens) {
  const seen = [];
  for (const s of screens) {
    const text = (s.visible_text || '').toLowerCase();
    for (const line of B1_REMOVED_LINES) if (text.includes(line.toLowerCase())) seen.push(`${s.qid || s.screen}: "${line}"`);
  }
  return seen;
}

function b1Order(screens) {
  return screens.map(s => s.qid || s.screen);
}

function b1Tail(rec) {
  return ` Page errors: ${rec.page_errors.length ? rec.page_errors.join('; ') : 'none'}.${rec.broke_off ? ` Broke off: ${rec.broke_off}` : ''}`;
}

// The day the app calls today, by the cellar's 05:00 rule, plus n days.
function b1DayKey(n = 0, from = new Date()) {
  const d = new Date(from);
  if (d.getHours() < 5) d.setDate(d.getDate() - 1);
  d.setDate(d.getDate() + n);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Serves the repo on the old-app port with corked_v6.html as it was at a commit: before B1 for S6.
// withShared also serves shared/ from that commit (B1b's T9, against the app before B1b).
async function b1ServeOldApp(commit = B1_BEFORE, { withShared = false } = {}) {
  const fromCommit = file => execFileSync('git', ['show', `${commit}:${file}`], { cwd: REPO, maxBuffer: 32 * 1024 * 1024 });
  const oldHtml = fromCommit('corked_v6.html');
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
    '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
  const server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (pathname === '/corked_v6.html') {
      res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' });
      res.end(oldHtml);
      return;
    }
    const path = normalize(join(REPO, pathname));
    if (!path.startsWith(REPO + sep)) { res.writeHead(403); res.end(); return; }
    try {
      const body = withShared && pathname.startsWith('/shared/') ? fromCommit(pathname.slice(1)) : await readFile(path);
      res.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(body);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise((ok, fail) => server.once('error', fail).listen(OLD_APP_PORT, 'localhost', ok));
  return server;
}

// What an opened old bottle shows: the screen, the panel, the question and the main button.
function b1OldBottleView(page) {
  return page.evaluate(() => {
    const vis = id => { const el = document.getElementById(id); return !!el && el.getClientRects().length > 0 && getComputedStyle(el).display !== 'none'; };
    const t = id => (document.getElementById(id)?.textContent || '').replace(/\s+/g, ' ').trim();
    return {
      screen: document.querySelector('.screen.active')?.id || null,
      panels: ['question-panel', 'review-panel', 'dormant-panel', 'stalled-panel'].filter(vis),
      mech_label: t('m-label'),
      question: t('m-q'),
      main_button: t('p1-btn'),
      rhythm_panel: vis('rhythm-panel'),
      first_session_screen: !!document.querySelector('#screen-first.active')
    };
  });
}

// The keys of two objects whose values differ.
function b1Diff(a, b) {
  const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
  return [...keys].filter(k => JSON.stringify(a?.[k]) !== JSON.stringify(b?.[k]));
}

const B1_S6_EXPORT = 'runs/2026-11-07-trust-basics/run-1-cellar.json';

// The answers each scenario types.
const B1_S1 = {
  spark: 'An app for dog walkers who lose track of which owners have paid for the week.',
  answers: [
    { text: 'Dana, my neighbour, she walks six dogs for people on our street' },
    { tap: 'I saw it', text: "Last Friday she stood at my gate scrolling her bank app for ten minutes, then wrote three owners' names on the back of a receipt to chase later." },
    { text: 'Show her who has paid this week without opening the bank app.' },
    { text: 'A list that tells a dog walker who has paid for the week.' },
    { text: 'That she checks her bank app every Friday and still misses one or two owners.' },
    { text: 'If she says she always knows who owes her and it never costs her anything.' }
  ],
  day: b1DayKey(3)
};

const B1_S2 = {
  spark: 'An app for small cleaning businesses that forget to send invoices after a job.',
  people: ['Maria Lopez, my sister', 'M., my sister', 'a colleague who manages bookings', 'freelancers I know']
};

const B1_S3 = {
  spark: 'An app for parents to swap school uniform their kids have outgrown.',
  fix: [
    'dont_know',
    'dont_know',
    { text: 'Find a jumper in the right size from another parent at the same school.' },
    { text: 'A swap board for outgrown school uniform between parents at one school.' },
    { text: 'That buying new every September costs more than they want to spend.' },
    'not_set'
  ],
  experiment: {
    E2: { text: 'Relief that the jumper is already waiting at the school gate.' },
    E3: { text: 'A shared list with sizes and a name to message.' },
    E4: { text: "Two parents from my son's class" },
    E6: { text: 'Both of them list one item without me asking.' }
  }
};

const B1_S4 = {
  spark: 'A daily game where everyone gets the same photo, writes one sentence describing it, then sees how everyone else described it.',
  answers: [
    { text: 'My friends post their Wordle scores in our group chat every morning.' },
    { text: 'Curious to see what the others wrote, and a little proud of their own sentence.' },
    { tap: 'I already built it', link: 'https://example.com/one-photo', text: 'One photo, one text box, then every sentence on one page.' },
    { text: 'Sam, Priya and my brother Tom' },
    { text: "A daily photo where you write one sentence and then read everyone else's." },
    { text: 'Two of the three come back on their own the next day and write another sentence.' }
  ]
};

const B1_S5 = {
  spark: 'An app that tells me which plants on my balcony to water today.',
  answers: [
    { tap: 'It was me' },
    { tap: 'It was me', text: 'On Sunday I found the basil wilted and watered everything at once, the cactus too.' },
    { text: 'Tell me which pot to water today.' },
    { text: 'A list of which balcony plants to water today.' },
    { text: 'That I forget the pots at the back.' },
    { text: 'If I never actually lose a plant.' }
  ],
  rethink: {
    now: 'A note on my phone each morning naming the pots that are dry.',
    F3: 'Name the one pot that is driest.'
  }
};

const B1_S8 = {
  spark: 'A page where a book club votes on next month\'s book in one tap.',
  day: '2026-11-12',
  later: ['2026-11-11T10:00:00', '2026-11-12T10:00:00', '2026-11-13T10:00:00', '2026-11-20T10:00:00', '2026-12-01T10:00:00']
};

const B1_S9 = {
  spark: 'A board where neighbours lend each other tools for a weekend.',
  answers: [
    { text: 'Last month my neighbour borrowed my drill after a WhatsApp message and brought it back a week later.' },
    { text: 'That it is easy to ask and easy to say no.' },
    { text: 'A shared list of five tools on one street.' },
    { text: 'Sam and Priya' },
    { text: 'A list of tools neighbours on one street can borrow for a weekend.' },
    'not_set'
  ],
  line: { text: 'One of them borrows a tool from the other within two weeks.' }
};

// ── B1b: FIRST-SESSION FIXES ──
// T1 to T9. The wording each one looks for is the brief's, typed here, not read from the copy file.

// The app as B1 left it, for T9.
const B1B_BEFORE = '9acbe9d';

const B1B_SELF = {
  F2: 'The last time you ran into it, what did you do right then?',
  F3: 'If your idea could do only one thing for you, what would it be?',
  F5: 'When you ask someone else who runs into this, what do you expect to hear?',
  F6: "Finish the sentence: I'd drop it if someone who runs into this told me...",
  next: "What's next: ask someone who runs into this about the last time, put what you hear next to what you expected, then decide what to do with the idea.",
  ask: 'Ask someone who runs into this'
};

const B1B_FALLBACK = {
  F2: 'The last time they ran into it, what did they do right then?',
  F3: 'If your idea could do only one thing for them, what would it be?',
  F5: 'When you ask them about the last time, what do you expect to hear?',
  F6: "Finish the sentence: I'd drop it if they told me...",
  E6: 'What would they have to do for you to keep building it? A rough guess is fine.',
  ask: 'Ask the person you named about the last time',
  show: 'Show it to the people you named',
  fixNext: 'the person you named',
  experimentNext: 'the people you named'
};

const B1B_EXAMPLES = {
  F1: 'e.g. "S., a colleague who plans our team trips"',
  F2: 'e.g. "Spent an hour in three group chats trying to find a date."',
  F3: 'e.g. "Show everyone\'s free evenings in one place."',
  F5: 'e.g. "That they gave up and picked a date themselves."',
  F6: 'e.g. "...it only takes five minutes, they don\'t mind."',
  E1: 'e.g. "My friends make quizzes about each other in the group chat."',
  E2: 'e.g. "Smug when they get one right." or "Curious what comes next."',
  E3: 'e.g. "Ten questions on one page and a score at the end."',
  E4: 'e.g. "Tom, and two friends from my running club"',
  E6: 'e.g. "Play it two days in a row without me asking."'
};

const B1B_START = {
  fix: 'Six short questions to pin down who runs into this and what you expect to hear from them. Then you pick one next step.',
  experiment: "Six short questions to pin down what you'd build first and who you'd show it to. Then you pick one next step."
};

const B1B_T1 = {
  spark: 'An app that tells me which plants on my balcony to water today.',
  answers: [
    { tap: 'It was me' },
    { tap: 'It was me', text: 'On Sunday I found the basil wilted and watered everything at once, the cactus too.' },
    { text: 'Tell me which pot to water today.' },
    { text: 'A list of which balcony plants to water today.' },
    { text: 'That I forget the pots at the back.' },
    { text: 'I never actually lose a plant.' }
  ]
};

const B1B_T2 = {
  spark: 'An app for five-a-side players to see who has paid for this week\'s pitch.',
  person: "Jamie Kneebone, it's me",
  answers: [
    { tap: 'It was me', text: 'On Tuesday I sent three reminders in the group chat and still paid two shares myself.' },
    { text: 'Show who has paid before we get to the pitch.' },
    { text: 'A list of who has paid for this week\'s pitch.' },
    { text: 'That they forget and pay me back weeks later.' },
    { text: 'Everyone pays on time without being asked.' }
  ]
};

// Jamie's experiment run on 7 Nov. The brief quotes three of his answers: the football trivia
// idea, E3 and E4. Those are typed as quoted. The rest are stand-ins, marked here and in the
// report. The label call reads E4 alone.
const B1B_T3 = {
  spark: 'A football trivia app to play with my friends.',                                    // stand-in wording for "football trivia"
  answers: [
    { text: 'My friends quiz each other about old match results in our group chat.' },        // E1 stand-in
    { text: 'A trivia app with one football question every day.' },                           // E2 stand-in, about the tool as his was
    { text: 'This makes no sense this question ... why do you use the word still?' },         // E3 as quoted in the brief
    { text: 'Myself of course, and some of my football friends' },                            // E4 as quoted in the brief
    { text: 'A football trivia app I play with my friends.' },                                // E5 stand-in
    { text: 'Play it every day for a week.' }                                                 // E6 stand-in
  ],
  standIns: ['spark', 'E1', 'E2', 'E5', 'E6']
};

const B1B_T4_EXPERIMENT = {
  spark: 'A daily game where everyone gets the same photo, writes one sentence describing it, then sees how everyone else described it.',
  answers: [
    { text: 'My friends post their Wordle scores in our group chat every morning.' },
    { text: 'Curious to see what the others wrote, and a little proud of their own sentence.' },
    { text: 'One photo, one text box, then every sentence on one page.' },
    { text: 'Sam, Priya and my brother Tom' },
    { text: "A daily photo where you write one sentence and then read everyone else's." },
    { text: 'Two of the three come back on their own the next day and write another sentence.' }
  ]
};

// The label's words that aren't in the answer, by the worker's own rule.
function b1bAddedWords(label, answer) {
  return globalThis.CorkedProvenance.unsupportedWords(label || '', `${answer} you your yours yourself they them their`, { scene: true });
}

// Waits for the worker's reply to log on the bottle: the label, or its failure.
function b1bLabelLogged(step) {
  return e => (e.type === 'label' && e.step === step) || (e.type === 'label_failed' && e.step === step) ||
    (step === 'F1' && e.type === 'grade_failed' && e.mech === 'M1');
}

// Holds every request to these routes for ms before letting it go.
async function b1bHold(page, routes, ms, notes) {
  for (const path of routes) {
    await page.route(`${WORKER_URL}${path}`, async route => {
      const note = { path, held_from: new Date().toISOString() };
      notes.push(note);
      await new Promise(r => setTimeout(r, ms));
      note.released_at = new Date().toISOString();
      await route.continue().catch(err => { note.continue_error = String(err?.message || err); });
    });
  }
}

function b1bSay(x) {
  return x == null ? 'none' : `"${x}"`;
}

// ── B1c: QUESTIONS WRITTEN FOR EACH IDEA ──
// T1 to T9. The rules each check reads are the brief's, typed here, not read from the copy file.

// The app as B1b left it: the live d4d011e, plus the docs-only step 0 commit.
const B1C_BEFORE = 'e129030';

// Jamie's answers from the brief, word for word. Anything marked stand-in is mine.
const B1C_GARDEN = {
  spark: 'A tool to analyse gardens and it calculates how many times a year you need upkeep and what tools you need.',
  answers: [
    { text: 'My grandpa, 76.' },
    { text: 'He called me to come fix it, he had no idea what to do.' },
    { text: 'Gvie im an estiamte of the work to be done to keep it a nice looking garden' },
    { text: 'An app that maps a garden and tells you how often it needs upkeep and which tools you need.' }   // F4 stand-in
  ],
  plan: [
    { text: 'That he just guesses when it looks messy' },   // F5 stand-in
    { text: "He doesn't see it as an issue" }               // F6 stand-in
  ],
  standIns: ['F4', 'F5', 'F6']
};

const B1C_RENTAL = {
  spark: 'An AI tool that helps you when you rent a place to document the current conditions, easily.',
  answers: [
    { text: 'Me, when I moved into my flat in March.' },
    { text: 'I took a lot of pictures of the outlets and sinks, but I did not know what mattered.' },      // F2 stand-in
    { text: 'Tell me which rooms and fittings to photograph, and keep it all in one report.' },            // F3 stand-in
    { text: 'An app that walks you through recording the state of a rented flat on move in day.' }       // F4 stand-in
  ],
  plan: [
    { text: 'Sam, my neighbour, who moved into the flat upstairs last month' },   // Who could you ask? stand-in
    { text: 'That he took a few photos on his phone and hopes for the best' },    // F5 stand-in
    { text: 'His landlord already gave him a full checklist' }                    // F6 stand-in
  ],
  standIns: ['F2', 'F3', 'F4', 'Who could you ask?', 'F5', 'F6']
};

const B1C_FOOTBALL = {
  spark: 'A trivia app for football fans to challenge each others ballknowledge.',
  answers: [
    { text: 'My friends quiz each other about old match results in our group chat.' },   // E1 stand-in
    { text: 'Like they want one more round straight away.' },                             // E2 stand-in
    { text: 'Ten football questions on one page and a score at the end.' },               // E3 stand-in
    { text: 'A trivia app where you challenge yourself and other people on ball (soccer) trivia information.' }
  ],
  plan: [
    { text: 'Myself of course, and some of my football friends.' },
    { text: 'They would visibly enjoy using it and are challenged by the questions' }
  ],
  standIns: ['E1', 'E2', 'E3']
};

const B1C_SPARK_COPY = {
  question: "What's the idea?",
  note: "An app, a game, a tool you wish existed. Get the rough thought down while it's fresh. It doesn't need to be worked out yet.",
  label: 'YOUR IDEA',
  button: 'Next →',
  fix: 'Like Dropbox, whose founder kept forgetting his USB stick.',
  experiment: 'Like Wordle, a word game one guy made for his partner.'
};

const B1C_HINT = /\b(e\.g\.|for example|for instance|such as)\b/i;

// The brief's rules a written question has to pass, as far as a script can read them.
function b1cRules(question, path) {
  const s = String(question || '').replace(/\s+/g, ' ').trim();
  const broke = [];
  if ((s.match(/\?/g) || []).length !== 1 || !s.endsWith('?')) broke.push('one question mark, at the end');
  if (s.split(' ').length > 25) broke.push('more than 25 words');
  if (/[—–]|\s-\s|--/.test(s)) broke.push('a dash');
  if (path === 'experiment' && /\b(problem|need|wrong|stopped)/i.test(s)) broke.push('a problem word on the experiment path');
  if (/\bthe last time\s*[,?]/i.test(s)) broke.push('"the last time" without saying of what');
  if (B1C_HINT.test(s)) broke.push('an example');
  return broke;
}

// What a question screen holds that the brief says it mustn't.
function b1cExtras(snap) {
  const extras = [];
  if (snap.example || /e\.g\./.test(snap.visible_text)) extras.push('an example');
  if (/\bWhy\b/.test(snap.visible_text)) extras.push('a why line');
  if (snap.all_buttons.some(b => /^Skip$/.test(b))) extras.push('Skip');
  if (snap.all_buttons.some(b => /^Not set yet$/.test(b))) extras.push('Not set yet');
  if (snap.taps.length) extras.push(`taps (${snap.taps.join(', ')})`);
  return extras;
}

// From the end screen: the step, its questions one per screen, When?, then the confirmation.
// waitLabel: { before: qid, step } waits on that question for a label to log, as typing would.
async function b1cPlan(fs, app, kind, answers, when, { day = null, waitLabel = null } = {}) {
  const page = app.page;
  await page.locator(`#fs-choice-${kind}`).click();
  const asked = [];
  const list = [...answers];
  for (let k = 0; k < 6; k++) {
    await fs.ready();
    if (await page.locator('#fs-when').count()) break;
    const snap = await b1Snap(page);
    if (!snap.qid) break;
    if (waitLabel && waitLabel.before === snap.qid) {
      const from = Date.now();
      waitLabel.logged = await fs.waitForLog(b1bLabelLogged(waitLabel.step), 60000);
      waitLabel.waited_ms = Date.now() - from;
    }
    const before = await fs.answer(list.shift() || 'dont_know');
    asked.push({ qid: before.qid, question: before.question, source: before.source, ai_tag: before.ai_tag, dots_ms: before.dots_ms, extras: b1cExtras(before), buttons: before.all_buttons });
  }
  await page.locator('#fs-when').waitFor({ timeout: 10000 });
  const whenScreen = { heading: await app.text('#fs-planning'), taps: (await page.locator('#fs-when button').allTextContents()).map(s => s.trim()) };
  if (when === 'today') await page.locator('#fs-when-today').click();
  else if (when === 'this_week') await page.locator('#fs-when-week').click();
  else {
    await page.locator('#fs-when-day').click();
    await page.locator('#fs-day').fill(day);
    await page.locator('#fs-day-save').click();
  }
  await page.locator('#fs-plan').waitFor({ timeout: 10000 });
  const confirmation = await fs.readEnd();
  app.step('planned the step', { note: confirmation.plan?.planned });
  return { asked, when: whenScreen, confirmation };
}

function b1cRoutes(rec) {
  const out = {};
  for (const r of rec.worker_requests || []) out[r.path] = (out[r.path] || 0) + 1;
  return out;
}

// Model calls behind those requests: /m1 with the label makes two (the grade and the label).
function b1cModelCalls(rec) {
  return (rec.worker_requests || []).reduce((n, r) => n + (r.path === '/m1' && r.body?.with_label ? 2 : 1), 0);
}

// What opening a bottle shows, old flow or first session.
function b1cBottleView(page) {
  return page.evaluate(() => {
    const vis = id => { const el = document.getElementById(id); return !!el && el.getClientRects().length > 0 && getComputedStyle(el).display !== 'none'; };
    const t = id => (document.getElementById(id)?.textContent || '').replace(/\s+/g, ' ').trim();
    return {
      screen: document.querySelector('.screen.active')?.id || null,
      panels: ['question-panel', 'review-panel', 'dormant-panel', 'stalled-panel'].filter(vis),
      mech_label: t('m-label'),
      question: t('m-q'),
      main_button: t('p1-btn'),
      first_session: (document.querySelector('#screen-first.active #first-body')?.innerText || '').replace(/\s+/g, ' ').trim() || null
    };
  });
}

// ── SCENARIOS ──
// Each scenario plays its steps into rec.screens and rec.checkpoints, then reports, for every
// expected result, what happened. A report states facts. It never says pass or fail.

const SCENARIOS = {
  // ── B1: a new bottle's first session ──
  'b1-s1': {
    title: 'B1 S1: fix, full answers, M0 held for 40 seconds',
    expected: [
      'The first burst question shows within 10 seconds of "Bottle your spark →", while M0 is held for 40 seconds.',
      'Screens in this order: spark, gate, F1, F2, F3, F4, F5, F6, end screen.',
      'None of the removed intake screens appear: the maturity questions, "have you spoken to a real person", "how far along", the pace picker, the time-of-day question.',
      'The end screen holds every answer verbatim.',
      'The chosen step and its day are saved.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await b1NoteScreens(page);
      const m0 = rec.screens.m0_hold = { held_ms: 40000 };
      await page.route(`${WORKER_URL}/m0`, async route => {
        m0.held_from = new Date().toISOString();
        await new Promise(r => setTimeout(r, 40000));
        m0.released_at = new Date().toISOString();
        await route.continue().catch(err => { m0.continue_error = String(err?.message || err); });
      });
      await app.open();
      rec.screens.gate = await fs.newBottle(B1_S1.spark);
      rec.screens.first_question = await fs.pick('fix');
      rec.screens.timing = {
        gate_after_cork_ms: fs.gateAt - fs.corkedAt,
        question_after_tap_ms: fs.firstQuestionAt - fs.tappedAt,
        question_after_cork_ms: fs.firstQuestionAt - fs.corkedAt,
        m0_still_held: !m0.released_at
      };
      for (const a of B1_S1.answers) await fs.answer(a);
      rec.screens.end = await fs.endScreen();
      rec.screens.step = await fs.planStep('ask', 'day', { day: B1_S1.day });
      rec.screens.order = b1Order(fs.screens);
      rec.screens.burst = fs.screens;
      rec.screens.screens_seen = await fs.screensSeen();
      rec.checkpoints.m0 = await fs.waitForLog(e => e.type === 'm0_result' || e.type === 'm0_failed', 60000);
      rec.checkpoints.m1 = await fs.waitForLog(e => e.mech === 'M1' && (e.type === 'grade' || e.type === 'grade_failed'));
      rec.checkpoints.m2 = await fs.waitForLog(e => e.mech === 'M2' && (e.type === 'grade' || e.type === 'grade_failed'));
      rec.screens.end_after_replies = await fs.readEnd();
      const b = await app.bottle();
      rec.checkpoints.bottle = { flow: b?.s?.flow, pace: b?.s?.pace, first: b?.s?.first, restatements: b?.s?.restatements, log: b?.s?.log };
    },
    report(rec) {
      const s = rec.screens, t = s.timing, b = rec.checkpoints.bottle;
      if (!t) return ['Not reached.' + b1Tail(rec), '', '', '', ''];
      const m0 = rec.checkpoints.m0;
      const sent = (rec.worker_requests || []).map(r => `${r.path} at +${((r.ms - (rec.worker_requests[0]?.ms || r.ms)) / 1000).toFixed(1)}s`).join(', ');
      const end = s.end_after_replies || s.end;
      const rowValue = key => end?.rows.find(r => r.row === key)?.value || '';
      const verbatim = B1_S1.answers.map((a, i) => {
        const key = ['person', 'last-time', 'one-thing', 'now', 'expect', 'line'][i];
        const has = rowValue(key).includes(a.text);
        const tap = a.tap ? `, tap "${a.tap}" shown: ${rowValue(key).includes(a.tap)}` : '';
        return `F${i + 1} verbatim under "${end?.rows.find(r => r.row === key)?.label}": ${has}${tap}`;
      }).join('. ');
      const step = b?.first?.step;
      const logged = (b?.log || []).find(e => e.type === 'next_step');
      return [
        `Gate showed ${t.gate_after_cork_ms} ms after "Bottle your spark →". First question (${s.first_question?.qid}) showed ${t.question_after_tap_ms} ms after the gate tap, ${t.question_after_cork_ms} ms after "Bottle your spark →". M0 still held then: ${t.m0_still_held}. M0 held from ${s.m0_hold?.held_from}, released ${s.m0_hold?.released_at || 'never'}${s.m0_hold?.continue_error ? ` (continue: ${s.m0_hold.continue_error})` : ''}. M0 in the log: ${m0 ? `${m0.type}${m0.state ? ' ' + m0.state : ''}${m0.error ? ' "' + m0.error + '"' : ''} at ${m0.at}` : 'nothing'}. Worker requests: ${sent || 'none'}.`,
        `Screens in order: ${(s.order || []).join(', ')}. Screens the page went through: ${(s.screens_seen || []).join(', ')}.`,
        `Removed intake lines on any screen: ${b1RemovedSeen(s.burst || []).join('; ') || 'none'}. Pace on the bottle: ${b?.pace}.`,
        `${verbatim}. First: "${rowValue('first')}". Now: "${rowValue('now')}". M2's line on the end screen: ${end?.observation ? `"${end.observation.text}", AI tag ${end.observation.ai_tag}, model ${end.observation.ai_model}` : 'none'}. M1 in the log: ${JSON.stringify(rec.checkpoints.m1 || null)}. M2 in the log: ${JSON.stringify(rec.checkpoints.m2 || null)}.`,
        `Saved step: ${JSON.stringify(step || null)}. Log entry: ${JSON.stringify(logged || null)}. The screen said "${s.step?.planned?.step}", "${s.step?.planned?.when}". Day picked: ${B1_S1.day}.` + b1Tail(rec)
      ];
    }
  },

  'b1-s2': {
    title: 'B1 S2: fix, the person as a name, initials, a description and a group',
    expected: [
      '"M., my sister" and "a colleague who manages bookings" get the same /m1 grade as a full name.',
      '"freelancers I know" is saved, marked not one person, and the burst carries on.',
      'No grade shows on any screen.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      const people = rec.screens.people = [];
      await app.open();
      for (let i = 0; i < B1_S2.people.length; i++) {
        const person = B1_S2.people[i];
        await fs.newBottle(B1_S2.spark, { fromCellar: i > 0 });
        const id = await page.evaluate(() => activeBottleId);
        await fs.pick('fix');
        const asked = await fs.answer({ text: person });
        const continuedAt = Date.now();
        const next = await b1Snap(page);
        const entry = { person, id, f1_question: asked.question, next_qid: next.qid, next_question: next.question, next_after_ms: Date.now() - continuedAt };
        for (let k = 0; k < 5; k++) await fs.answer('skip');
        const end = await fs.endScreen();
        entry.end_text = end.visible_text;
        people.push(entry);
        await fs.backToCellar();
      }
      // The grades land in the background.
      const until = Date.now() + 120000;
      while (Date.now() < until) {
        const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]'), CELLAR_KEY);
        for (const p of people) {
          const b = stored.find(x => x.id === p.id);
          p.slot = b?.s?.first?.slots?.who || null;
          p.grade = b?.s?.first?.grades?.person || null;
          p.log = (b?.s?.log || []).filter(e => e.mech === 'M1');
        }
        if (people.every(p => p.grade || p.log.some(e => e.type === 'grade_failed'))) break;
        await page.waitForTimeout(1000);
      }
      rec.screens.m1_requests = requests.filter(r => r.path === '/m1').map(r => r.body);
    },
    report(rec) {
      const people = rec.screens.people || [];
      if (people.length < 4) return [`Not reached: ${people.length} of 4 bottles.` + b1Tail(rec), '', ''];
      const say = p => `"${p.person}": ${p.grade ? `${p.grade.state}, ${p.grade.person_kind}, one person ${p.grade.one_person}` : `no grade (${p.log.map(e => e.type + (e.error ? ' ' + e.error : '')).join(', ') || 'nothing logged'})`}`;
      const [full, initials, description, group] = people;
      const same = p => !!p.grade && !!full.grade && p.grade.state === full.grade.state;
      const words = /\b(settled|clearing|turbid|grade)\b/i;
      return [
        `${say(full)}. ${say(initials)}. ${say(description)}. Same state as the full name: initials ${same(initials)}, description ${same(description)}. Sent to /m1: ${(rec.screens.m1_requests || []).map(b => JSON.stringify({ person_name: b.person_name, relationship: b.relationship, maturity_class: b.maturity_class })).join('; ')}.`,
        `${say(group)}. Stored as: ${JSON.stringify(group.slot)}. After F1, every bottle showed the next question straight away: ${people.map(p => `"${p.person}" → ${p.next_qid} "${p.next_question}" ${p.next_after_ms} ms`).join('; ')}.`,
        `Grade words on any end screen: ${people.filter(p => words.test(p.end_text)).map(p => `"${p.person}"`).join(', ') || 'none'}.` + b1Tail(rec)
      ];
    }
  },

  'b1-s3': {
    title: 'B1 S3: fix with Don\'t know yet at F1 and F2, then the switch',
    expected: [
      'F2 and F5 show their no-person variants.',
      'The end screen shows the switch line.',
      'Switching asks only E2, E3, E4 and E6.',
      'Switching keeps every earlier answer.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1_S3.spark);
      await fs.pick('fix');
      for (const a of B1_S3.fix) await fs.answer(a);
      rec.screens.fix_screens = [...fs.screens];
      rec.screens.end_fix = await fs.endScreen();
      const before = await app.bottle();
      rec.checkpoints.before_switch = { slots: before.s.first.slots, log: before.s.log, restatements: before.s.restatements };
      await page.locator('#fs-switch').click();
      const asked = rec.screens.asked_after_switch = [];
      for (let k = 0; k < 8; k++) {
        const snap = await b1Snap(page);
        if (snap.end) break;
        asked.push({ qid: snap.qid, question: snap.question });
        await fs.answer(B1_S3.experiment[snap.qid] || 'skip');
      }
      rec.screens.end_experiment = await fs.endScreen();
      const after = await app.bottle();
      rec.checkpoints.after_switch = { slots: after.s.first.slots, log: after.s.log, restatements: after.s.restatements, path: after.s.first.path };
      await page.waitForTimeout(3000);
    },
    report(rec) {
      const s = rec.screens, c = rec.checkpoints;
      const q = id => (s.fix_screens || []).find(x => x.qid === id)?.question || '(not shown)';
      if (!s.end_fix) return [`F2 asked "${q('F2')}". F5 asked "${q('F5')}".` + b1Tail(rec), 'Not reached.', 'Not reached.', 'Not reached.'];
      const lineRow = s.end_fix.rows.find(r => r.row === 'line');
      const before = c.before_switch, after = c.after_switch;
      const kept = before && after ? Object.keys(before.slots).filter(k => JSON.stringify(before.slots[k]) === JSON.stringify(after.slots[k])) : [];
      const changed = before && after ? Object.keys(before.slots).filter(k => !kept.includes(k)) : [];
      const logKept = before && after && JSON.stringify(after.log.slice(0, before.log.length)) === JSON.stringify(before.log);
      const models = (rec.worker_requests || []).filter(r => r.path !== '/m0').map(r => r.path);
      return [
        `F2 asked "${q('F2')}" (the brief's wording: ${q('F2') === B1_BRIEF.F2_no_person}). F5 asked "${q('F5')}" (the brief's wording: ${q('F5') === B1_BRIEF.F5_no_person}). F3 asked "${q('F3')}". F6 offered "${(s.fix_screens || []).find(x => x.qid === 'F6')?.unsure}".`,
        `Line on the end screen: ${s.end_fix.nobody ? `"${s.end_fix.nobody}"` : 'none'}. Switch link: "${s.end_fix.switch_link}". "${lineRow?.label}": "${lineRow?.value}".`,
        `After the switch the screens asked: ${(s.asked_after_switch || []).map(x => x.qid).join(', ') || 'none'}. Path now: ${after?.path}.`,
        `Answers kept unchanged across the switch: ${kept.length} of ${Object.keys(before?.slots || {}).length} (${kept.join(', ')})${changed.length ? `; changed: ${changed.join(', ')}` : ''}. Restatements before ${before?.restatements?.length}, after ${after?.restatements?.length}. Log entries from before the switch still first and unchanged: ${logKept}. Experiment end screen: ${(s.end_experiment?.rows || []).map(r => `${r.label} "${r.value.replace(/\n/g, ' / ')}"`).join('; ')}. Worker requests besides /m0: ${models.join(', ') || 'none'}.` + b1Tail(rec)
      ];
    }
  },

  'b1-s4': {
    title: 'B1 S4: experiment, full answers, a daily image-description game',
    expected: [
      'No question contains "problem", "need", "wrong" or "stopped".',
      'No model call after M0.',
      'The line is saved verbatim.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1_S4.spark);
      rec.screens.tapped_at = null;
      await fs.pick('experiment');
      rec.screens.tapped_at = new Date(fs.tappedAt).toISOString();
      for (const a of B1_S4.answers) await fs.answer(a);
      rec.screens.burst = fs.screens.filter(x => x.qid);
      rec.screens.end = await fs.endScreen();
      rec.screens.step = await fs.planStep('build', 'this_week');
      await page.waitForTimeout(8000);
      const b = await app.bottle();
      rec.checkpoints.bottle = { first: b?.s?.first, log: b?.s?.log, restatements: b?.s?.restatements };
    },
    report(rec) {
      const s = rec.screens, b = rec.checkpoints.bottle;
      if (!s.end) return ['Not reached.' + b1Tail(rec), '', ''];
      const questions = (s.burst || []).map(x => `${x.qid} "${x.question}"${B1_EXPERIMENT_WORDS.test(x.question) ? ` HAS "${x.question.match(B1_EXPERIMENT_WORDS)[1]}"` : ''}`);
      const elsewhere = (s.burst || []).filter(x => B1_EXPERIMENT_WORDS.test(x.visible_text)).map(x => `${x.qid}: "${x.visible_text.match(B1_EXPERIMENT_WORDS)[1]}"`);
      const endWords = B1_EXPERIMENT_WORDS.test(s.end.visible_text) ? s.end.visible_text.match(B1_EXPERIMENT_WORDS)[1] : null;
      const reqs = (rec.worker_requests || []).map(r => `${r.path} at ${r.at}`);
      const line = b?.first?.slots?.line;
      const typed = B1_S4.answers[5];
      const logged = (b?.log || []).find(e => e.step === 'E6');
      const row = s.end.rows.find(r => r.row === 'line');
      return [
        `Questions: ${questions.join('; ')}. The words anywhere else on those screens: ${elsewhere.join('; ') || 'none'}. On the end screen: ${endWords ? `"${endWords}"` : 'none'}.`,
        `Worker requests in the run: ${reqs.join(', ') || 'none'}. Gate tapped at ${s.tapped_at}. Requests other than /m0: ${(rec.worker_requests || []).filter(r => r.path !== '/m0').length}.`,
        `Line stored: "${line?.text}", how many ${line?.how_many}, out of ${line?.out_of}. Same as typed: ${line?.text === typed.text}. Log entry: answer "${logged?.answer}", how many ${logged?.how_many}, out of ${logged?.out_of}. End screen, "${row?.label}": "${row?.value.replace(/\n/g, ' / ')}". Step: ${JSON.stringify(b?.first?.step || null)}; line asked before it: ${s.step?.line_asked}.` + b1Tail(rec)
      ];
    }
  },

  'b1-s5': {
    title: 'B1 S5: Rethink it first',
    expected: [
      'A second Now is saved and dated.',
      'The first Now is still there.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1_S5.spark);
      await fs.pick('fix');
      for (const a of B1_S5.answers) await fs.answer(a);
      rec.screens.fix_screens = [...fs.screens];
      rec.screens.end_first = await fs.endScreen();
      rec.checkpoints.before = (await app.bottle())?.s?.restatements || [];
      await page.locator('#fs-rethink').click();
      const asked = rec.screens.rethink_asked = [];
      for (let k = 0; k < 5; k++) {
        const snap = await b1Snap(page);
        if (snap.end) break;
        asked.push({ qid: snap.qid, question: snap.question, visible_text: snap.visible_text });
        await fs.answer(snap.qid === 'F4' ? { text: B1_S5.rethink.now } : snap.qid === 'F3' ? { text: B1_S5.rethink.F3 } : 'skip');
      }
      rec.screens.end_after = await fs.endScreen();
      const b = await app.bottle();
      rec.checkpoints.after = b?.s?.restatements || [];
      rec.checkpoints.slots = b?.s?.first?.slots;
      rec.checkpoints.log = b?.s?.log;
    },
    report(rec) {
      const s = rec.screens, c = rec.checkpoints;
      if (!s.end_after) return ['Not reached.' + b1Tail(rec), ''];
      const [first, second] = c.after || [];
      const timer = (s.rethink_asked || []).filter(x => /next question|timer|wait/i.test(x.visible_text)).map(x => x.qid);
      const now = s.end_after.rows.find(r => r.row === 'now');
      const self = (s.fix_screens || []).filter(x => ['F2', 'F3', 'F5'].includes(x.qid)).map(x => `${x.qid} "${x.question}"`).join('; ');
      return [
        `Restatements after the rethink: ${(c.after || []).length}. Second: ${second ? `"${second.text}", at ${second.at}, from ${second.from}` : 'none'}. The rethink asked: ${(s.rethink_asked || []).map(x => `${x.qid} "${x.question}"`).join('; ')}. Timer or wait wording on those screens: ${timer.join(', ') || 'none'}. One thing now: "${c.slots?.one_thing?.text}".`,
        `First restatement before: ${JSON.stringify(c.before?.[0] || null)}; after: ${JSON.stringify(first || null)}; the same: ${JSON.stringify(c.before?.[0]) === JSON.stringify(first)}. Now on the end screen: "${now?.value.replace(/\n/g, ' / ')}". The self questions asked: ${self}.` + b1Tail(rec)
      ];
    }
  },

  'b1-s6': {
    title: 'B1 S6: old bottles from an exported cellar',
    expected: [
      'Each old bottle opens in its current flow, unchanged: the same screen, panel, question and button as the app before B1 shows for it, and no first-session screen.'
    ],
    async play(app, rec) {
      const exportFile = JSON.parse(await readFile(join(REPO, B1_S6_EXPORT), 'utf8'));
      const cellar = JSON.parse(exportFile.keys[CELLAR_KEY]);
      rec.screens.export_file = B1_S6_EXPORT;
      rec.screens.app_before = `${B1_BEFORE}:corked_v6.html on port ${OLD_APP_PORT}`;
      const server = await b1ServeOldApp();
      const bottles = rec.screens.bottles = [];
      const oldUrl = `http://localhost:${OLD_APP_PORT}/corked_v6.html?rhythmtest=1`;
      const oldCtx = await app.browser.newContext({ viewport: { width: 1400, height: 900 } });
      try {
        const oldPage = await oldCtx.newPage();
        oldPage.on('pageerror', err => rec.page_errors.push('app before B1: ' + String(err?.message || err)));
        // The import's own effect: every key from the file, then a reload.
        const load = async (page, url) => {
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.evaluate(keys => { localStorage.clear(); for (const [k, v] of Object.entries(keys)) localStorage.setItem(k, v); }, exportFile.keys);
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
        };
        const openIn = async (page, url, id) => {
          await load(page, url);
          const stored = () => page.evaluate(([key, id]) => JSON.parse(localStorage.getItem(key) || '[]').find(b => b.id === id) || null, [CELLAR_KEY, id]);
          const before = await stored();
          await page.locator(`.bottle-card[data-bottle-id="${id}"]`).click();
          await page.waitForTimeout(1500);
          await page.waitForFunction(() => !/Reading/.test(document.getElementById('p1-btn')?.textContent || ''), undefined, { timeout: STEP_TIMEOUT, polling: 250 }).catch(() => {});
          await page.evaluate(() => typeof finishAllLines === 'function' && finishAllLines());
          const view = await b1OldBottleView(page);
          const after = await stored();
          return { view, s_fields_changed: b1Diff(before?.s, after?.s), record_fields_changed: b1Diff({ ...before, s: null }, { ...after, s: null }) };
        };
        for (const b of cellar) {
          const now = await openIn(app.page, APP_URL, b.id);
          const old = await openIn(oldPage, oldUrl, b.id);
          bottles.push({
            id: b.id, idea: b.s?.idea, mechIndex: b.mechIndex, status: b.status, qLifecycle: b.s?.qLifecycle,
            app_now: now, app_before_b1: old,
            same_view: JSON.stringify(now.view) === JSON.stringify(old.view),
            same_changes: JSON.stringify(now.s_fields_changed) === JSON.stringify(old.s_fields_changed)
          });
          app.step('opened an old bottle in both apps', { note: `${b.id}: same view ${bottles[bottles.length - 1].same_view}` });
        }
      } finally {
        await oldCtx.close();
        server.close();
      }
    },
    report(rec) {
      const bottles = rec.screens.bottles || [];
      if (!bottles.length) return ['Not reached.' + b1Tail(rec)];
      const view = v => `${v.screen}, panels ${v.panels.join('/') || 'none'}, "${v.mech_label}", question "${v.question}", button "${v.main_button}", rhythm panel ${v.rhythm_panel}, first-session screen ${v.first_session_screen}`;
      return [bottles.map(b => `"${b.idea}" (mechIndex ${b.mechIndex}, ${b.status}, ${b.qLifecycle}). Now: ${view(b.app_now.view)}. Before B1: ${view(b.app_before_b1.view)}. Same: ${b.same_view}. Stored fields the open changed, now: [${b.app_now.s_fields_changed.join(', ')}], before B1: [${b.app_before_b1.s_fields_changed.join(', ')}].`).join(' ') + ` Export: ${rec.screens.export_file}. App before B1: ${rec.screens.app_before}.` + b1Tail(rec)];
    }
  },

  'b1-s7': {
    title: 'B1 S7: phone, 390x844',
    expected: [
      'On every burst screen and the end screen, at 390x844, the main button is on screen without scrolling.'
    ],
    async play(app, rec) {
      const context = await app.browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
      try {
        const page = await context.newPage();
        page.on('pageerror', err => rec.page_errors.push(String(err && err.message || err)));
        const phone = driver(page, rec);
        phone.outDir = app.outDir;
        const fs = b1Driver(phone, rec);
        const looks = rec.screens.phone = [];
        const measure = async (label, sel) => {
          await page.waitForTimeout(300);
          const m = await page.evaluate(sel => {
            const el = document.querySelector(sel);
            const r = el?.getBoundingClientRect();
            return {
              scroll_y: window.scrollY, viewport_w: window.innerWidth, viewport_h: window.innerHeight,
              page_h: document.documentElement.scrollHeight,
              button: el ? { text: el.textContent.trim(), top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) } : null
            };
          }, sel);
          m.label = label;
          m.on_screen = !!m.button && m.button.top >= 0 && m.button.bottom <= m.viewport_h && m.button.left >= 0 && m.button.right <= m.viewport_w;
          looks.push(m);
          await page.screenshot({ path: join(app.outDir, `run-${rec.run}-phone-${String(looks.length).padStart(2, '0')}-${label}.png`) });
        };
        await phone.open();
        await fs.newBottle(B1_S1.spark);
        await fs.pick('fix');
        for (const a of B1_S1.answers) {
          const snap = await b1Snap(page);
          await measure(`fix-${snap.qid}`, '#fs-next');
          await fs.answer(a);
        }
        await fs.readEnd();
        await measure('fix-end', '#fs-choice-ask');
        await fs.backToCellar();
        await fs.newBottle(B1_S4.spark, { fromCellar: true });
        await fs.pick('experiment');
        for (const a of B1_S4.answers) {
          const snap = await b1Snap(page);
          await measure(`experiment-${snap.qid}`, '#fs-next');
          await fs.answer(a);
        }
        await fs.readEnd();
        await measure('experiment-end', '#fs-choice-show');
        await phone.exportCellar(join(app.outDir, `run-${rec.run}-cellar.json`));
        rec.exported = true;
      } finally {
        await context.close();
      }
    },
    report(rec) {
      const looks = rec.screens.phone || [];
      if (!looks.length) return ['Not reached.' + b1Tail(rec)];
      return [looks.map(m => `${m.label}: "${m.button?.text}" ${m.button?.top} to ${m.button?.bottom} of ${m.viewport_h}, scrolled ${m.scroll_y}, on screen ${m.on_screen}`).join('; ') + `. Screen ${looks[0].viewport_w}x${looks[0].viewport_h}.` + b1Tail(rec)];
    }
  },

  'b1-s8': {
    title: 'B1 S8: a new bottle\'s card before and after its day',
    expected: [
      'The card says "Planned for [day]" before and after the day, with no lean, sag or stall note at any point.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      await app.open({ at: '2026-11-07T10:00:00' });
      await fs.newBottle(B1_S8.spark);
      await fs.pick('experiment');
      for (let k = 0; k < 6; k++) await fs.answer('skip');
      await fs.endScreen();
      rec.screens.step = await fs.planStep('build', 'day', { day: B1_S8.day });
      await fs.backToCellar();
      const cards = rec.screens.cards = [];
      const look = async (when, { open = true } = {}) => {
        const card = await app.card().evaluate(el => ({
          status: el.querySelector('.bottle-card-status')?.textContent.trim() || null,
          step: el.querySelector('.bottle-card-step')?.textContent.trim() || null,
          date: el.querySelector('.bottle-card-date')?.textContent.trim() || null,
          classes: el.className,
          text: el.innerText
        }));
        card.when = when;
        card.sag = /bottle-card--sag/.test(card.classes);
        card.stall_words = /stall|behind|overdue/i.test(card.text);
        if (open) {
          await app.card().click();
          await page.locator('#screen-first.active, #screen-phase1.active').first().waitFor({ timeout: 10000 });
          card.opened = await page.evaluate(() => ({
            screen: document.querySelector('.screen.active')?.id || null,
            stalled_panel: !!document.getElementById('stalled-panel') && getComputedStyle(document.getElementById('stalled-panel')).display !== 'none' && !!document.querySelector('#screen-phase1.active'),
            planned: document.getElementById('fs-planned-when')?.textContent.trim() || null,
            stall_words: /stall|behind|overdue/i.test(document.querySelector('.screen.active')?.innerText || '')
          }));
          await fs.backToCellar();
        }
        cards.push(card);
      };
      await look('2026-11-07 10:00, the day it was planned');
      for (const at of B1_S8.later) {
        await page.clock.setFixedTime(new Date(at));
        await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
        await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
        await look(at);
      }
    },
    report(rec) {
      const cards = rec.screens.cards || [];
      if (!cards.length) return ['Not reached.' + b1Tail(rec)];
      return [`Day planned: ${B1_S8.day} (a Thursday), "${rec.screens.step?.planned?.when}" on the end screen. ` + cards.map(c => `${c.when}: card "${c.status}", step "${c.step}", date "${c.date}", sag class ${c.sag}, stall words ${c.stall_words}; opened on ${c.opened?.screen}, planned "${c.opened?.planned}", stall panel ${c.opened?.stalled_panel}, stall words ${c.opened?.stall_words}`).join('. ') + '.' + b1Tail(rec)];
    }
  },

  'b1-s9': {
    title: 'B1 S9: the line not set at E6, then "Show it to them"',
    expected: [
      'E6 offers "Not set yet" and saves it; the end screen shows "Your line: not set yet".',
      '"Show it to [people]" asks for the line before any step is saved.',
      'Once the line is given, the step and its day are saved, and the line is on record before the step.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1_S9.spark);
      await fs.pick('experiment');
      for (const a of B1_S9.answers) await fs.answer(a);
      rec.screens.e6 = fs.screens.find(x => x.qid === 'E6') || null;
      rec.screens.end = await fs.endScreen();
      const before = await app.bottle();
      rec.checkpoints.before = { line: before?.s?.first?.slots?.line, step: before?.s?.first?.step || null };
      rec.screens.step = await fs.planStep('show', 'today', { line: B1_S9.line });
      rec.screens.end_after = await fs.readEnd();
      const after = await app.bottle();
      rec.checkpoints.after = { line: after?.s?.first?.slots?.line, step: after?.s?.first?.step || null, log: after?.s?.log };
    },
    report(rec) {
      const s = rec.screens, c = rec.checkpoints;
      if (!s.end) return ['Not reached.' + b1Tail(rec), '', ''];
      const row = s.end.rows.find(r => r.row === 'line');
      const log = c.after?.log || [];
      const lineAt = log.findIndex(e => e.step === 'E6' && e.value === 'answer');
      const stepAt = log.findIndex(e => e.type === 'next_step');
      return [
        `E6 offered "${s.e6?.unsure}" and "${s.e6?.skip}". Stored: ${JSON.stringify(c.before?.line || null)}. End screen: "${row?.label}: ${row?.value}".`,
        `"${s.step?.planning}" asked for the line first: ${s.step?.line_asked}. Question: "${s.step?.line_question}". Step stored while it was asked: ${JSON.stringify(s.step?.step_before_line || null)}. Step stored before the choice: ${JSON.stringify(c.before?.step)}.`,
        `Line stored: ${JSON.stringify(c.after?.line || null)}. Step: ${JSON.stringify(c.after?.step || null)}. In the log, the line is entry ${lineAt} and the step entry ${stepAt}. The screen said "${s.step?.planned?.step}", "${s.step?.planned?.when}". End screen line row now: "${s.end_after?.rows.find(r => r.row === 'line')?.value.replace(/\n/g, ' / ')}".` + b1Tail(rec)
      ];
    }
  },

  // ── B1b: first-session fixes ──
  'b1b-t1': {
    title: 'B1b T1: fix, F1 tapped "It was me"',
    expected: [
      'F2, F3, F5, F6, the end line and the ask button use the self wording; no screen shows F1\'s text slotted.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1B_T1.spark);
      await fs.pick('fix');
      for (const a of B1B_T1.answers) await fs.answer(a);
      rec.screens.burst = fs.screens.filter(x => x.qid);
      rec.screens.end = await fs.endScreen();
      rec.screens.step = await fs.planStep('ask', 'today', {});
      const b = await app.bottle();
      rec.checkpoints.bottle = { first: b?.s?.first, log: b?.s?.log };
    },
    report(rec) {
      const s = rec.screens;
      if (!s.end) return ['Not reached.' + b1Tail(rec)];
      const q = id => (s.burst || []).find(x => x.qid === id);
      const said = ['F2', 'F3', 'F5', 'F6'].map(id => `${id} "${q(id)?.question}" (the self wording: ${q(id)?.question === B1B_SELF[id]})`).join('. ');
      const ask = s.end.choices.find(c => c.id === 'fs-choice-ask');
      const who = rec.checkpoints.bottle?.first?.slots?.who;
      const m1 = (rec.worker_requests || []).filter(r => r.path === '/m1').length;
      const asName = [...(s.burst || []).map(x => x.question), s.end.next_line, ask?.text].filter(t => /It was me (ran|about|told)|Ask It was me|for It was me/.test(t || ''));
      return [
        `${said}. F2 started on the tap ${b1bSay(q('F2')?.tap_selected)}. End line "${s.end.next_line}" (the self wording: ${s.end.next_line === B1B_SELF.next}). Ask button "${ask?.text}" (the self wording: ${ask?.text === B1B_SELF.ask}). Step saved: "${s.step?.planned?.step}". F1 stored as ${JSON.stringify(who)}. Screens with F1's tap slotted as a name: ${asName.length ? asName.map(t => `"${t}"`).join('; ') : 'none'}. /m1 calls: ${m1}.` + b1Tail(rec)
      ];
    }
  },

  'b1b-t2': {
    title: 'B1b T2: fix, F1 typed "Jamie Kneebone, it\'s me"',
    expected: [
      '/m1 returns is_self true; from then on the self wording shows. The record shows the answer verbatim.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      const replies = rec.screens.m1_replies = [];
      b1WatchWorker(page, requests);
      page.on('response', async r => {
        if (!r.url().startsWith(`${WORKER_URL}/m1`)) return;
        try { replies.push({ at: new Date().toISOString(), body: await r.json() }); } catch {}
      });
      await app.open();
      await fs.newBottle(B1B_T2.spark);
      await fs.pick('fix');
      await fs.answer({ text: B1B_T2.person });
      const f2At = Date.now();
      // A person types F2 for a while. The run waits on F2 until /m1's reply has landed, up to a minute.
      rec.checkpoints.label = await fs.waitForLog(b1bLabelLogged('F1'), 60000);
      rec.screens.f2_waited_ms = Date.now() - f2At;
      for (const a of B1B_T2.answers) await fs.answer(a);
      rec.screens.burst = fs.screens.filter(x => x.qid);
      rec.screens.end = await fs.endScreen();
      const b = await app.bottle();
      rec.checkpoints.bottle = { first: b?.s?.first, log: b?.s?.log };
    },
    report(rec) {
      const s = rec.screens;
      if (!s.end) return ['Not reached.' + b1Tail(rec)];
      const reply = (s.m1_replies || [])[0]?.body;
      const q = id => (s.burst || []).find(x => x.qid === id);
      const later = ['F3', 'F5', 'F6'].map(id => `${id} "${q(id)?.question}" (the self wording: ${q(id)?.question === B1B_SELF[id]})`).join('. ');
      const ask = s.end.choices.find(c => c.id === 'fs-choice-ask');
      const person = s.end.rows.find(r => r.row === 'person');
      const slotted = [...(s.burst || []).filter(x => x.qid !== 'F1').map(x => x.question), s.end.next_line, ask?.text].filter(t => /Jamie|Kneebone/.test(t || ''));
      return [
        `/m1 replied: grape ${reply?.grape?.state}, person kind ${reply?.grape?.person_kind}, is_self ${reply?.is_self}, label ${b1bSay(reply?.label)}, prompt_version ${reply?.prompt_version}, label check ${JSON.stringify(reply?.server_checks?.label || null)}. Label log entry: ${JSON.stringify(rec.checkpoints.label || null)}. F2 was on screen before the reply and said "${q('F2')?.question}"; the run waited ${s.f2_waited_ms} ms on F2. After the reply: ${later}. End line "${s.end.next_line}" (the self wording: ${s.end.next_line === B1B_SELF.next}). Ask button "${ask?.text}" (the self wording: ${ask?.text === B1B_SELF.ask}). Questions or buttons with the typed name slotted: ${slotted.length ? slotted.map(t => `"${t}"`).join('; ') : 'none'}. "${person?.label}" on the end screen: "${person?.value}" (verbatim: ${person?.value === B1B_T2.person}). Stored: ${JSON.stringify(rec.checkpoints.bottle?.first?.slots?.who)}.` + b1Tail(rec)
      ];
    }
  },

  'b1b-t3': {
    title: 'B1b T3: experiment with Jamie\'s 7 Nov answers, football trivia',
    expected: [
      'The Show it button holds the label, not the full answer.',
      'The label is five words or fewer and adds nothing that isn\'t in the answer.',
      'The record shows E4 verbatim.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1B_T3.spark);
      await fs.pick('experiment');
      for (const a of B1B_T3.answers.slice(0, 4)) await fs.answer(a);
      // E5 takes a person a while to type. The run waits on E5 until the label has landed, up to a minute.
      const e5At = Date.now();
      rec.checkpoints.label = await fs.waitForLog(b1bLabelLogged('E4'), 60000);
      rec.screens.e5_waited_ms = Date.now() - e5At;
      for (const a of B1B_T3.answers.slice(4)) await fs.answer(a);
      rec.screens.burst = fs.screens.filter(x => x.qid);
      rec.screens.end = await fs.endScreen();
      rec.screens.step = await fs.planStep('show', 'today', {});
      await fs.backToCellar();
      rec.screens.card = await app.card().evaluate(el => ({ status: el.querySelector('.bottle-card-status')?.textContent.trim() || null, step: el.querySelector('.bottle-card-step')?.textContent.trim() || null }));
      const b = await app.bottle();
      rec.checkpoints.bottle = { first: b?.s?.first, log: b?.s?.log };
      rec.screens.label_request = (rec.worker_requests || []).find(r => r.path === '/label')?.body || null;
    },
    report(rec) {
      const s = rec.screens;
      if (!s.end) return ['Not reached.' + b1Tail(rec), '', ''];
      const e4 = B1B_T3.answers[3].text;
      const show = s.end.choices.find(c => c.id === 'fs-choice-show');
      const label = rec.checkpoints.bottle?.first?.labels?.people?.text ?? null;
      const row = s.end.rows.find(r => r.row === 'people');
      const e6 = (s.burst || []).find(x => x.qid === 'E6');
      return [
        `Show it button: "${show?.text}". Holds the label: ${!!label && show?.text === `Show it to ${label}`}. Holds the full answer: ${!!show?.text?.includes(e4)}. Note under it: "${show?.note}". Next line: "${s.end.next_line}". E6 asked "${e6?.question}" (the run waited ${s.e5_waited_ms} ms on E5 for the label). Step saved: "${s.step?.planned?.step}", "${s.step?.planned?.when}". Cellar card: ${JSON.stringify(s.card)}.`,
        `Label ${b1bSay(label)}: ${label ? label.split(/\s+/).length : 0} words; words not in the answer: ${label ? (b1bAddedWords(label, e4).join(', ') || 'none') : 'n/a'}. Log entry: ${JSON.stringify(rec.checkpoints.label || null)}. Sent to /label: ${JSON.stringify(s.label_request)}. Stand-ins: ${B1B_T3.standIns.join(', ')}.`,
        `"${row?.label}" on the end screen: "${row?.value}" (verbatim: ${row?.value === e4}). Stored: ${JSON.stringify(rec.checkpoints.bottle?.first?.slots?.first_people)}. E3 stored: ${JSON.stringify(rec.checkpoints.bottle?.first?.slots?.smallest?.text)}.` + b1Tail(rec)
      ];
    }
  },

  'b1b-t4': {
    title: 'B1b T4: the label calls held for 30 seconds',
    expected: [
      'Every slot shows its fallback.',
      'No screen waits.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      const held = rec.screens.held = [];
      b1WatchWorker(page, requests);
      await b1bHold(page, ['/m1', '/label'], 30000, held);
      await app.open();
      await fs.newBottle(B1_S1.spark);
      await fs.pick('fix');
      for (const a of B1_S1.answers) await fs.answer(a);
      rec.screens.fix = fs.screens.filter(x => x.qid);
      rec.screens.fix_end = await fs.endScreen();
      rec.screens.fix_step = await fs.planStep('ask', 'today', {});
      rec.screens.fix_done_at = new Date().toISOString();
      await fs.backToCellar();
      fs.screens.length = 0;
      await fs.newBottle(B1B_T4_EXPERIMENT.spark, { fromCellar: true });
      await fs.pick('experiment');
      for (const a of B1B_T4_EXPERIMENT.answers) await fs.answer(a);
      rec.screens.experiment = fs.screens.filter(x => x.qid);
      rec.screens.experiment_end = await fs.endScreen();
      rec.screens.experiment_step = await fs.planStep('show', 'today', {});
      rec.screens.experiment_done_at = new Date().toISOString();
      // What came back once the hold let go.
      await page.waitForTimeout(35000);
      const stored = await page.evaluate(key => JSON.parse(localStorage.getItem(key) || '[]'), CELLAR_KEY);
      rec.checkpoints.labels_after = stored.map(b => ({ idea: b.s?.idea, labels: b.s?.first?.labels || null, label_log: (b.s?.log || []).filter(e => /label/.test(e.type) || e.mech === 'M1') }));
    },
    report(rec) {
      const s = rec.screens;
      if (!s.experiment_end) return ['Not reached.' + b1Tail(rec), ''];
      const q = (list, id) => (list || []).find(x => x.qid === id);
      const fixSlots = ['F2', 'F3', 'F5', 'F6'].map(id => `${id} "${q(s.fix, id)?.question}" (fallback: ${q(s.fix, id)?.question === B1B_FALLBACK[id]})`).join('. ');
      const ask = s.fix_end.choices.find(c => c.id === 'fs-choice-ask');
      const show = s.experiment_end.choices.find(c => c.id === 'fs-choice-show');
      const e6 = q(s.experiment, 'E6');
      const all = [...(s.fix || []), ...(s.experiment || [])];
      const slowest = all.reduce((m, x) => Math.max(m, x.next_screen_after_ms || 0), 0);
      return [
        `${fixSlots}. Fix end line "${s.fix_end.next_line}" (fallback: ${!!s.fix_end.next_line?.includes(B1B_FALLBACK.fixNext)}). Ask button "${ask?.text}" (fallback: ${ask?.text === B1B_FALLBACK.ask}). Fix step saved: "${s.fix_step?.planned?.step}". E6 "${e6?.question}" (fallback: ${e6?.question === B1B_FALLBACK.E6}). Experiment end line "${s.experiment_end.next_line}" (fallback: ${!!s.experiment_end.next_line?.includes(B1B_FALLBACK.experimentNext)}). Show it button "${show?.text}" (fallback: ${show?.text === B1B_FALLBACK.show}). Experiment step saved: "${s.experiment_step?.planned?.step}". After the hold let go: ${JSON.stringify(rec.checkpoints.labels_after || [])}.`,
        `From Continue to the next screen, in ms: ${all.map(x => `${x.qid} ${x.next_screen_after_ms}`).join(', ')}. Slowest: ${slowest} ms. Held requests: ${(s.held || []).map(h => `${h.path} from ${h.held_from} to ${h.released_at || 'not let go'}${h.continue_error ? ` (${h.continue_error})` : ''}`).join('; ')}. Fix path finished at ${s.fix_done_at}, experiment at ${s.experiment_done_at}.` + b1Tail(rec)
      ];
    }
  },

  'b1b-t5': {
    title: 'B1b T5: the examples, the count field and Not set yet',
    expected: [
      'Every question screen has its example except F4 and E5.',
      'E6 has no count field.',
      'F6 and E6 offer "Not set yet".'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const lineStep = () => page.evaluate(() => ({ question: document.getElementById('fs-line-q')?.textContent.trim(), example: document.getElementById('fs-line-example')?.textContent.trim() || null, number_fields: document.querySelectorAll('#fs-choices input[type="number"]').length }));
      await app.open();
      await fs.newBottle(B1_S8.spark);
      rec.screens.gate_examples = await page.locator('#spark-gate .gate-example').allTextContents();
      await fs.pick('fix');
      for (let k = 0; k < 6; k++) await fs.answer('skip');
      rec.screens.fix = fs.screens.filter(x => x.qid);
      await fs.endScreen();
      await page.locator('#fs-choice-ask').click();
      await page.locator('#fs-line-q').waitFor({ timeout: 10000 });
      rec.screens.fix_line_step = await lineStep();
      await page.locator('#fs-line-back').click();
      await fs.backToCellar();
      fs.screens.length = 0;
      await fs.newBottle(B1_S9.spark, { fromCellar: true });
      await fs.pick('experiment');
      for (let k = 0; k < 6; k++) await fs.answer('skip');
      rec.screens.experiment = fs.screens.filter(x => x.qid);
      await fs.endScreen();
      await page.locator('#fs-choice-show').click();
      await page.locator('#fs-line-q').waitFor({ timeout: 10000 });
      rec.screens.experiment_line_step = await lineStep();
    },
    report(rec) {
      const s = rec.screens;
      const all = [...(s.fix || []), ...(s.experiment || [])];
      if (all.length < 12) return [`Not reached: ${all.length} of 12 screens.` + b1Tail(rec), '', ''];
      const ex = all.map(x => `${x.qid} ${x.example ? `"${x.example}"` : 'no example'}${B1B_EXAMPLES[x.qid] ? ` (the brief's: ${x.example === B1B_EXAMPLES[x.qid]})` : ''}`).join('; ');
      const start = all.filter(x => x.start).map(x => `${x.qid} "${x.start}" (the brief's: ${x.start === B1B_START[x.qid[0] === 'F' ? 'fix' : 'experiment']})`).join('; ');
      const e6 = all.find(x => x.qid === 'E6');
      return [
        `${ex}. Start line on: ${start || 'none'}. Gate examples: ${(s.gate_examples || []).map(t => `"${t.trim()}"`).join(', ')}. The line step's example: fix "${s.fix_line_step?.example}", experiment "${s.experiment_line_step?.example}".`,
        `E6: ${e6?.number_fields} number fields; "How many" on screen: ${/how many/i.test(e6?.visible_text || '')}. Line step after Show it: ${s.experiment_line_step?.number_fields} number fields.`,
        all.map(x => `${x.qid}: ${x.buttons.join(', ')}`).join('; ') + '.' + b1Tail(rec)
      ];
    }
  },

  'b1b-t6': {
    title: 'B1b T6: the end screens',
    expected: [
      'No /m2 line on screen; it is still in storage.',
      'The next-step line and the small lines under the buttons show.',
      '"Your line" and "Switch to the" appear nowhere.',
      'The switch line shows only in the fix case where F1 and F2 were both "Don\'t know yet".'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      await app.open();
      const ends = rec.screens.ends = {};
      const play = async (key, spark, path, answers, { fromCellar = true } = {}) => {
        fs.screens.length = 0;
        await fs.newBottle(spark, { fromCellar });
        await fs.pick(path);
        for (const a of answers) await fs.answer(a);
        ends[key] = { screens: fs.screens.filter(x => x.qid).map(x => ({ qid: x.qid, question: x.question, visible_text: x.visible_text })) };
        if (key === 'fix_full') ends[key].m2 = await fs.waitForLog(e => e.mech === 'M2' && (e.type === 'grade' || e.type === 'grade_failed'));
        ends[key].end = await fs.endScreen();
        const b = await app.bottle();
        ends[key].stored_observation = b?.s?.first?.m2?.observation?.surface_text ?? null;
      };
      await play('fix_full', B1_S1.spark, 'fix', B1_S1.answers, { fromCellar: false });
      await fs.backToCellar();
      await play('experiment_full', B1_S4.spark, 'experiment', B1_S4.answers);
      await fs.backToCellar();
      await play('fix_nobody', B1_S3.spark, 'fix', ['dont_know', 'dont_know', 'skip', 'skip', 'skip', 'skip']);
      if (await page.locator('#fs-switch').isVisible()) {
        await page.locator('#fs-switch').click();
        const asked = ends.fix_nobody.after_switch = [];
        for (let k = 0; k < 8; k++) {
          const snap = await b1Snap(page);
          if (snap.end) break;
          asked.push(snap.qid);
          await fs.answer('skip');
        }
        ends.fix_nobody.end_after_switch = await fs.endScreen();
      }
      await fs.backToCellar();
      await play('fix_one_dont_know', B1_S2.spark, 'fix', ['dont_know', { text: 'Last week a cleaner told me she forgot to invoice two jobs.' }, 'skip', 'skip', 'skip', 'skip']);
      rec.screens.everywhere = Object.values(ends).flatMap(e => [...(e.screens || []).map(x => x.visible_text), e.end?.visible_text, e.end_after_switch?.visible_text]).filter(Boolean);
    },
    report(rec) {
      const e = rec.screens.ends || {};
      if (!e.fix_one_dont_know?.end) return ['Not reached.' + b1Tail(rec), '', '', ''];
      const notes = Object.entries(e).map(([k, v]) => `${k}: next line "${v.end.next_line}"; ${v.end.choices.map(c => `"${c.text}"${c.note ? ` / "${c.note}"` : ' / no note'}`).join(', ')}`).join('. ');
      const words = re => (rec.screens.everywhere || []).filter(t => re.test(t)).length;
      const f = e.fix_full;
      return [
        `Fix with a last time: M2 in the log ${JSON.stringify(f.m2 ? { type: f.m2.type, state: f.m2.state, observation: f.m2.observation } : null)}. Stored observation: ${b1bSay(f.stored_observation)}. On the end screen: observation element ${f.end.observation ? `"${f.end.observation.text}"` : 'none'}; the stored line in the screen's text: ${!!f.stored_observation && f.end.visible_text.includes(f.stored_observation)}; AI-tagged elements: ${f.end.ai_tagged.length ? f.end.ai_tagged.map(t => `"${t}"`).join(', ') : 'none'}.`,
        notes + '.',
        `Screens with "Your line": ${words(/Your line/)}. With "Switch to the": ${words(/Switch to the/)}. Experiment end rows: ${e.experiment_full.end.rows.map(r => r.label).join(', ')}.`,
        `Fix with F1 and F2 Don't know yet: ${b1bSay(e.fix_nobody.end.nobody)}, button ${b1bSay(e.fix_nobody.end.switch_link)}; after it the screens asked ${(e.fix_nobody.after_switch || []).join(', ') || 'none'}, then the end screen with ${e.fix_nobody.end_after_switch ? e.fix_nobody.end_after_switch.rows.map(r => r.label).join(', ') : 'nothing'}. Fix full: ${b1bSay(f.end.nobody)} / ${b1bSay(f.end.switch_link)}. Fix with only F1 Don't know yet: ${b1bSay(e.fix_one_dont_know.end.nobody)} / ${b1bSay(e.fix_one_dont_know.end.switch_link)}. Experiment: ${b1bSay(e.experiment_full.end.nobody)} / ${b1bSay(e.experiment_full.end.switch_link)}.` + b1Tail(rec)
      ];
    }
  },

  'b1b-t7': {
    title: 'B1b T7: picking a day',
    expected: [
      'Picking a day shows the "Planned for" line, and the cellar card shows the same day.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      await app.open();
      await fs.newBottle(B1_S8.spark);
      await fs.pick('experiment');
      for (let k = 0; k < 6; k++) await fs.answer('skip');
      await fs.endScreen();
      rec.screens.day = b1DayKey(3);
      rec.screens.step = await fs.planStep('build', 'day', { day: rec.screens.day });
      rec.screens.cellar_button = await page.locator('#fs-cellar').textContent();
      await fs.backToCellar();
      rec.screens.card = await app.card().evaluate(el => ({ status: el.querySelector('.bottle-card-status')?.textContent.trim() || null, step: el.querySelector('.bottle-card-step')?.textContent.trim() || null }));
      await app.card().click();
      await page.locator('#fs-planned').waitFor({ timeout: 10000 });
      rec.screens.reopened = await page.locator('#fs-planned-when').textContent();
      const b = await app.bottle();
      rec.checkpoints.step = b?.s?.first?.step || null;
    },
    report(rec) {
      const s = rec.screens;
      if (!s.card) return ['Not reached.' + b1Tail(rec)];
      return [`Day picked ${s.day}. The screen said "${s.step?.planned?.step}" and "${s.step?.planned?.when}", then the button "${s.cellar_button?.trim()}". The line is the card's day plus "It's on this bottle in your cellar.": ${s.step?.planned?.when === `${s.card.status}. It's on this bottle in your cellar.`}. Cellar card: "${s.card.status}", step "${s.card.step}". Reopened: "${s.reopened?.trim()}". Stored step: ${JSON.stringify(rec.checkpoints.step)}.` + b1Tail(rec)];
    }
  },

  'b1b-t8': {
    title: 'B1b T8: phone, 390x844',
    expected: [
      'With the start line and examples added, the main button is on screen without scrolling on every burst screen and the end screen.'
    ],
    async play(app, rec) {
      const context = await app.browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
      try {
        const page = await context.newPage();
        page.on('pageerror', err => rec.page_errors.push(String(err && err.message || err)));
        const phone = driver(page, rec);
        phone.outDir = app.outDir;
        const fs = b1Driver(phone, rec);
        const looks = rec.screens.phone = [];
        const measure = async (label, sel) => {
          await page.waitForTimeout(300);
          const m = await page.evaluate(sel => {
            const el = document.querySelector(sel);
            const r = el?.getBoundingClientRect();
            return {
              scroll_y: window.scrollY, viewport_w: window.innerWidth, viewport_h: window.innerHeight,
              page_h: document.documentElement.scrollHeight,
              start: !!document.getElementById('fs-start'), example: !!document.getElementById('fs-example'),
              button: el ? { text: el.textContent.trim(), top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) } : null
            };
          }, sel);
          m.label = label;
          m.on_screen = !!m.button && m.button.top >= 0 && m.button.bottom <= m.viewport_h && m.button.left >= 0 && m.button.right <= m.viewport_w;
          looks.push(m);
          await page.screenshot({ path: join(app.outDir, `run-${rec.run}-phone-${String(looks.length).padStart(2, '0')}-${label}.png`) });
        };
        await phone.open();
        await fs.newBottle(B1_S1.spark);
        await fs.pick('fix');
        for (const a of B1_S1.answers) {
          const snap = await b1Snap(page);
          await measure(`fix-${snap.qid}`, '#fs-next');
          await fs.answer(a);
        }
        await fs.readEnd();
        await measure('fix-end', '#fs-choice-ask');
        await fs.backToCellar();
        await fs.newBottle(B1B_T3.spark, { fromCellar: true });
        await fs.pick('experiment');
        for (const a of B1B_T3.answers) {
          const snap = await b1Snap(page);
          await measure(`experiment-${snap.qid}`, '#fs-next');
          await fs.answer(a);
        }
        await fs.readEnd();
        await measure('experiment-end', '#fs-choice-show');
        await phone.exportCellar(join(app.outDir, `run-${rec.run}-cellar.json`));
        rec.exported = true;
      } finally {
        await context.close();
      }
    },
    report(rec) {
      const looks = rec.screens.phone || [];
      if (!looks.length) return ['Not reached.' + b1Tail(rec)];
      return [looks.map(m => `${m.label}: "${m.button?.text}" ${m.button?.top} to ${m.button?.bottom} of ${m.viewport_h}, scrolled ${m.scroll_y}, start line ${m.start}, example ${m.example}, on screen ${m.on_screen}`).join('; ') + `. Screen ${looks[0].viewport_w}x${looks[0].viewport_h}.` + b1Tail(rec)];
    }
  },

  'b1b-t9': {
    title: 'B1b T9: old bottles open as they did before B1b',
    expected: [
      'An old bottle opens in its current flow, unchanged: the same screen, panel, question and button as the app before B1b shows for it, and no first-session screen.'
    ],
    async play(app, rec) {
      const exportFile = JSON.parse(await readFile(join(REPO, B1_S6_EXPORT), 'utf8'));
      const cellar = JSON.parse(exportFile.keys[CELLAR_KEY]);
      rec.screens.export_file = B1_S6_EXPORT;
      rec.screens.app_before = `${B1B_BEFORE}:corked_v6.html and shared/ on port ${OLD_APP_PORT}`;
      const server = await b1ServeOldApp(B1B_BEFORE, { withShared: true });
      const bottles = rec.screens.bottles = [];
      const oldUrl = `http://localhost:${OLD_APP_PORT}/corked_v6.html?rhythmtest=1`;
      const oldCtx = await app.browser.newContext({ viewport: { width: 1400, height: 900 } });
      try {
        const oldPage = await oldCtx.newPage();
        oldPage.on('pageerror', err => rec.page_errors.push('app before B1b: ' + String(err?.message || err)));
        const load = async (page, url) => {
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.evaluate(keys => { localStorage.clear(); for (const [k, v] of Object.entries(keys)) localStorage.setItem(k, v); }, exportFile.keys);
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
        };
        const openIn = async (page, url, id) => {
          await load(page, url);
          const stored = () => page.evaluate(([key, id]) => JSON.parse(localStorage.getItem(key) || '[]').find(b => b.id === id) || null, [CELLAR_KEY, id]);
          const before = await stored();
          await page.locator(`.bottle-card[data-bottle-id="${id}"]`).click();
          await page.waitForTimeout(1500);
          await page.waitForFunction(() => !/Reading/.test(document.getElementById('p1-btn')?.textContent || ''), undefined, { timeout: STEP_TIMEOUT, polling: 250 }).catch(() => {});
          await page.evaluate(() => typeof finishAllLines === 'function' && finishAllLines());
          const view = await b1OldBottleView(page);
          const after = await stored();
          return { view, s_fields_changed: b1Diff(before?.s, after?.s), record_fields_changed: b1Diff({ ...before, s: null }, { ...after, s: null }) };
        };
        for (const b of cellar) {
          const now = await openIn(app.page, APP_URL, b.id);
          const old = await openIn(oldPage, oldUrl, b.id);
          bottles.push({
            id: b.id, idea: b.s?.idea, mechIndex: b.mechIndex, status: b.status, qLifecycle: b.s?.qLifecycle, flow: b.s?.flow || null,
            app_now: now, app_before_b1b: old,
            same_view: JSON.stringify(now.view) === JSON.stringify(old.view),
            same_changes: JSON.stringify(now.s_fields_changed) === JSON.stringify(old.s_fields_changed)
          });
          app.step('opened an old bottle in both apps', { note: `${b.id}: same view ${bottles[bottles.length - 1].same_view}` });
        }
      } finally {
        await oldCtx.close();
        server.close();
      }
    },
    report(rec) {
      const bottles = rec.screens.bottles || [];
      if (!bottles.length) return ['Not reached.' + b1Tail(rec)];
      const view = v => `${v.screen}, panels ${v.panels.join('/') || 'none'}, "${v.mech_label}", question "${v.question}", button "${v.main_button}", rhythm panel ${v.rhythm_panel}, first-session screen ${v.first_session_screen}`;
      return [bottles.map(b => `"${b.idea}" (flow ${b.flow || 'old'}, mechIndex ${b.mechIndex}, ${b.status}, ${b.qLifecycle}). Now: ${view(b.app_now.view)}. Before B1b: ${view(b.app_before_b1b.view)}. Same: ${b.same_view}. Stored fields the open changed, now: [${b.app_now.s_fields_changed.join(', ')}], before B1b: [${b.app_before_b1b.s_fields_changed.join(', ')}]. Same changes: ${b.same_changes}.`).join(' ') + ` Export: ${rec.screens.export_file}. App before B1b: ${rec.screens.app_before}.` + b1Tail(rec)];
    }
  },

  // ── B1c: questions written for each idea ──
  'b1c-t1': {
    title: "B1c T1: fix, Jamie's garden walk-through",
    expected: [
      'Every question passes the rules.',
      'F2 and F3 mention the garden or name him ("your grandpa", "him").',
      'No screen shows an example, a why line, Skip, Not set yet or a tap row.',
      'The restate screen shows the spark.',
      'Every answer is stored with its question.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1C_GARDEN.spark);
      await fs.pick('fix');
      for (const a of B1C_GARDEN.answers) await fs.answer(a);
      rec.screens.burst = fs.screens.filter(x => x.qid);
      rec.screens.order = b1Order(fs.screens);
      rec.screens.end = await fs.endScreen();
      await page.waitForTimeout(4000);
      const b = await app.bottle();
      rec.checkpoints.bottle = { flow: b?.s?.flow, first: b?.s?.first, log: b?.s?.log };
      rec.screens.routes = b1cRoutes(rec);
    },
    report(rec) {
      const s = rec.screens;
      if (!s.end) return ['Not reached.' + b1Tail(rec), '', '', '', ''];
      const burst = s.burst || [];
      const q = id => burst.find(x => x.qid === id);
      const rules = burst.map(x => `${x.qid} [${x.source}${x.ai_tag ? ', AI tag' : ''}, ${x.dots_ms} ms of dots] "${x.question}"${b1cRules(x.question, 'fix').length ? ` BREAKS ${b1cRules(x.question, 'fix').join(', ')}` : ''}`).join('; ');
      const names = id => /garden|grandpa|\bhim\b|\bhe\b|\bhis\b/i.test(q(id)?.question || '');
      const slots = rec.checkpoints.bottle?.first?.slots || {};
      const stored = burst.map(x => {
        const e = slots[{ F1: 'who', F2: 'last_time', F3: 'one_thing', F4: 'now' }[x.qid]];
        return `${x.qid}: question as shown ${e?.question === x.question}, answer word for word ${e?.text === x.answered?.text}, source ${e?.question_source}${e?.question_model ? ` (${e.question_model}, ${e.question_prompt_version})` : ''}${e?.question_fallback_reason ? ` (${e.question_fallback_reason})` : ''}`;
      }).join('; ');
      return [
        `Screens in order: ${(s.order || []).join(', ')}. ${rules}. Flow on the bottle: ${rec.checkpoints.bottle?.flow}.`,
        `F2 names the garden or him: ${names('F2')}. F3: ${names('F3')}.`,
        `Extras on any question screen: ${burst.map(x => b1cExtras(x).length ? `${x.qid}: ${b1cExtras(x).join(', ')}` : '').filter(Boolean).join('; ') || 'none'}. Buttons on each: ${burst.map(x => `${x.qid} ${x.all_buttons.join(' / ')}`).join('; ')}.`,
        `F4 screen: "${q('F4')?.first_wrote}", question "${q('F4')?.question}". Holds the spark verbatim: ${!!q('F4')?.first_wrote?.includes(B1C_GARDEN.spark)}.`,
        `${stored}. Requests: ${JSON.stringify(s.routes)}.` + b1Tail(rec)
      ];
    }
  },

  'b1c-t2': {
    title: 'B1c T2: the plan step, fix',
    expected: [
      '"Ask your grandpa" asks F5 (from the writer), F6, When.',
      'The confirmation and the reopened bottle show the plan.',
      'The card says "Planned for [day]".'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1C_GARDEN.spark);
      await fs.pick('fix');
      for (const a of B1C_GARDEN.answers) await fs.answer(a);
      // The person's label comes back with M1 in the background. A person reads the end screen for a
      // while; the run waits for the label, up to a minute.
      rec.checkpoints.label = await fs.waitForLog(b1bLabelLogged('F1'), 60000);
      rec.screens.end = await fs.endScreen();
      rec.screens.day = b1DayKey(2);
      rec.screens.plan = await b1cPlan(fs, app, 'ask', B1C_GARDEN.plan, 'day', { day: rec.screens.day });
      await fs.backToCellar();
      rec.screens.card = await app.card().evaluate(el => ({ status: el.querySelector('.bottle-card-status')?.textContent.trim() || null, step: el.querySelector('.bottle-card-step')?.textContent.trim() || null }));
      await app.card().click();
      rec.screens.reopened = await fs.readEnd();
      const b = await app.bottle();
      rec.checkpoints.bottle = { first: b?.s?.first, log: b?.s?.log };
      rec.screens.routes = b1cRoutes(rec);
      rec.screens.model_calls = b1cModelCalls(rec);
    },
    report(rec) {
      const s = rec.screens, p = s.plan;
      if (!p) return ['Not reached.' + b1Tail(rec), '', ''];
      const ask = s.end.choices.find(c => c.id === 'fs-choice-ask');
      const conf = p.confirmation.plan, re = s.reopened;
      return [
        `End screen button "${ask?.text}" / "${ask?.note}". Next-step line "${s.end.next_line}". The step asked: ${p.asked.map(x => `${x.qid} [${x.source}${x.ai_tag ? ', AI tag' : ''}, ${x.dots_ms} ms of dots] "${x.question}"${b1cRules(x.question, 'fix').length ? ` BREAKS ${b1cRules(x.question, 'fix').join(', ')}` : ''}${x.extras.length ? ` EXTRAS ${x.extras.join(', ')}` : ''}`).join('; ')}; then When? "${p.when.heading}" with ${p.when.taps.join(', ')}. Label: ${JSON.stringify(rec.checkpoints.label)}.`,
        `Confirmation: "${conf?.planned}"; ${conf?.rows.map(r => `${r.label} "${r.value}"`).join('; ')}; "${conf?.on_bottle}"; button "${conf?.button}". Typed: F5 "${B1C_GARDEN.plan[0].text}", F6 "${B1C_GARDEN.plan[1].text}". Reopened: record ${re?.rows.map(r => r.label).join(', ')}; plan "${re?.plan?.planned}"; ${re?.plan?.rows.map(r => `${r.label} "${r.value}"`).join('; ')}; "${re?.plan?.on_bottle}".`,
        `Day picked ${s.day}. Card: "${s.card?.status}", step "${s.card?.step}". Stored step: ${JSON.stringify(rec.checkpoints.bottle?.first?.step)}. Requests in the whole session: ${JSON.stringify(s.routes)}; model calls ${s.model_calls}.` + b1Tail(rec)
      ];
    }
  },

  'b1c-t3': {
    title: 'B1c T3: fix, the builder is the person (the rental)',
    expected: [
      '/m1 marks it as self.',
      'F2 asks "you".',
      'The button is "Ask someone".',
      'The plan step starts with "Who could you ask?".'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      const replies = rec.screens.m1_replies = [];
      b1WatchWorker(page, requests);
      page.on('response', async r => {
        if (!r.url().startsWith(`${WORKER_URL}/m1`)) return;
        try { replies.push({ at: new Date().toISOString(), body: await r.json() }); } catch {}
      });
      await app.open();
      await fs.newBottle(B1C_RENTAL.spark);
      await fs.pick('fix');
      for (const a of B1C_RENTAL.answers) await fs.answer(a);
      rec.screens.burst = fs.screens.filter(x => x.qid);
      rec.checkpoints.label = await fs.waitForLog(b1bLabelLogged('F1'), 60000);
      rec.screens.end = await fs.endScreen();
      const waitLabel = { before: 'F5', step: 'F7' };
      rec.screens.plan = await b1cPlan(fs, app, 'ask', B1C_RENTAL.plan, 'today', { waitLabel });
      rec.screens.wait_label = waitLabel;
      rec.checkpoints.m2 = await fs.waitForLog(e => e.mech === 'M2' && (e.type === 'grade' || e.type === 'grade_failed'));
      const b = await app.bottle();
      rec.checkpoints.bottle = { first: b?.s?.first, log: b?.s?.log };
      rec.screens.routes = b1cRoutes(rec);
      rec.screens.model_calls = b1cModelCalls(rec);
      rec.screens.m2_request = (rec.worker_requests || []).find(r => r.path === '/m2')?.body || null;
    },
    report(rec) {
      const s = rec.screens, p = s.plan;
      if (!p) return ['Not reached.' + b1Tail(rec), '', '', ''];
      const m1 = (s.m1_replies || [])[0]?.body;
      const f2 = (s.burst || []).find(x => x.qid === 'F2');
      const ask = s.end.choices.find(c => c.id === 'fs-choice-ask');
      return [
        `/m1: is_self ${m1?.is_self}, label "${m1?.label}", grape ${m1?.grape?.state} / ${m1?.grape?.person_kind}. Sent to /m2 for F2: maturity_class ${s.m2_request?.maturity_class}, grape_name "${s.m2_request?.grape_name}"; M2 in the log ${JSON.stringify(rec.checkpoints.m2 ? { type: rec.checkpoints.m2.type, state: rec.checkpoints.m2.state, tell: rec.checkpoints.m2.tell, vintage: rec.checkpoints.m2.vintage } : null)}.`,
        `F2 [${f2?.source}] "${f2?.question}": says "you" ${/\byou\b/i.test(f2?.question || '')}, says "they" ${/\bthey\b/i.test(f2?.question || '')}. Questions: ${(s.burst || []).map(x => `${x.qid} [${x.source}] "${x.question}"`).join('; ')}.`,
        `Button "${ask?.text}" / "${ask?.note}". Next-step line "${s.end.next_line}".`,
        `The step asked: ${p.asked.map(x => `${x.qid} [${x.source}] "${x.question}"`).join('; ')}; When? "${p.when.heading}". The run waited ${s.wait_label?.waited_ms} ms on F5 for the label: ${JSON.stringify(s.wait_label?.logged || null)}. Confirmation "${p.confirmation.plan?.planned}"; ${p.confirmation.plan?.rows.map(r => `${r.label} "${r.value}"`).join('; ')}. Requests in the whole session: ${JSON.stringify(s.routes)}; model calls ${s.model_calls}.` + b1Tail(rec)
      ];
    }
  },

  'b1c-t4': {
    title: 'B1c T4: experiment, the football quiz',
    expected: [
      'E1 to E3 are about football or the quiz, none with "problem", "need", "wrong" or "stopped".',
      '"Show it to a few people" asks E4, E6, When.',
      '"Build the simplest version first" asks only When.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      b1WatchWorker(page, requests);
      await app.open();
      await fs.newBottle(B1C_FOOTBALL.spark);
      await fs.pick('experiment');
      for (const a of B1C_FOOTBALL.answers) await fs.answer(a);
      rec.screens.burst = fs.screens.filter(x => x.qid);
      rec.screens.end = await fs.endScreen();
      rec.screens.requests_first_session = b1cRoutes(rec);
      rec.screens.model_calls_first_session = b1cModelCalls(rec);
      const waitLabel = { before: 'E6', step: 'E4' };
      rec.screens.show = await b1cPlan(fs, app, 'show', B1C_FOOTBALL.plan, 'today', { waitLabel });
      rec.screens.wait_label = waitLabel;
      rec.screens.requests_with_show = b1cRoutes(rec);
      rec.screens.model_calls_with_show = b1cModelCalls(rec);
      await fs.backToCellar();
      fs.screens.length = 0;
      const before = (rec.worker_requests || []).length;
      // A second bottle for Build: a different idea, Don't know yet at each question.
      await fs.newBottle('A daily game where you describe one picture in a single sentence.', { fromCellar: true });
      await fs.pick('experiment');
      for (let k = 0; k < 4; k++) await fs.answer('dont_know');
      rec.screens.build_end = await fs.endScreen();
      rec.screens.build = await b1cPlan(fs, app, 'build', [], 'this_week');
      rec.screens.build_requests = (rec.worker_requests || []).slice(before).map(r => r.path);
    },
    report(rec) {
      const s = rec.screens;
      if (!s.build) return ['Not reached.' + b1Tail(rec), '', ''];
      const about = x => /football|quiz|trivia|\bball|question|match|fans?\b/i.test(x.question || '');
      return [
        (s.burst || []).filter(x => ['E1', 'E2', 'E3'].includes(x.qid)).map(x => `${x.qid} [${x.source}${x.ai_tag ? ', AI tag' : ''}] "${x.question}": about football or the quiz ${about(x)}; problem words ${/\b(problem|need|wrong|stopped)/i.test(x.question || '') ? x.question.match(/\b(problem|need|wrong|stopped)\w*/i)[0] : 'none'}${b1cRules(x.question, 'experiment').length ? `; BREAKS ${b1cRules(x.question, 'experiment').join(', ')}` : ''}`).join('. ') + `. E5 screen: "${(s.burst || []).find(x => x.qid === 'E5')?.first_wrote}".`,
        `End screen: ${s.end.choices.map(c => `"${c.text}" / "${c.note || ''}"`).join(', ')}. Show it asked: ${s.show.asked.map(x => `${x.qid} [${x.source}] "${x.question}"`).join('; ')}; When? "${s.show.when.heading}". The run waited ${s.wait_label?.waited_ms} ms on E6 for the label: ${JSON.stringify(s.wait_label?.logged || null)}. Confirmation "${s.show.confirmation.plan?.planned}"; ${s.show.confirmation.plan?.rows.map(r => `${r.label} "${r.value}"`).join('; ')}. Requests, first session: ${JSON.stringify(s.requests_first_session)} (model calls ${s.model_calls_first_session}); with Show it: ${JSON.stringify(s.requests_with_show)} (model calls ${s.model_calls_with_show}).`,
        `Build asked: ${s.build.asked.length ? s.build.asked.map(x => x.qid).join(', ') : 'nothing before When?'}; When? "${s.build.when.heading}". Confirmation "${s.build.confirmation.plan?.planned}", rows ${s.build.confirmation.plan?.rows.length}. Requests for that bottle: ${s.build_requests.join(', ')}.` + b1Tail(rec)
      ];
    }
  },

  'b1c-t5': {
    title: 'B1c T5: the writer held for 10 seconds, and the writer returning a broken question',
    expected: [
      'Held 10 seconds: the fallback shows within 6 seconds.',
      'A broken question: the fallback shows within 6 seconds.',
      'No screen waits longer.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      const requests = rec.worker_requests = [];
      const held = rec.screens.held = [];
      b1WatchWorker(page, requests);
      await b1bHold(page, ['/question'], 10000, held);
      await app.open();
      await fs.newBottle(B1C_GARDEN.spark);
      await fs.pick('fix');
      for (const a of B1C_GARDEN.answers) await fs.answer(a);
      rec.screens.slow = fs.screens.filter(x => x.qid);
      await fs.endScreen();
      await fs.backToCellar();
      await page.unroute(`${WORKER_URL}/question`);
      const broken = rec.screens.broken_sent = [];
      await page.route(`${WORKER_URL}/question`, async route => {
        const body = JSON.parse(route.request().postData() || '{}');
        broken.push(body.slot);
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          headers: { 'access-control-allow-origin': APP_URL.split('/corked')[0] },
          body: JSON.stringify({ schema_version: 'question.v1', path: body.path, slot: body.slot, question: 'Tell me about the garden - and the tools', server_checks: { schema_valid: true, question: { check: 'ok' } }, ai_fields: ['question'], prompt_version: '2026-11-07c', model: 'stub' })
        });
      });
      fs.screens.length = 0;
      await fs.newBottle(B1C_FOOTBALL.spark, { fromCellar: true });
      await fs.pick('experiment');
      for (const a of B1C_FOOTBALL.answers) await fs.answer(a);
      rec.screens.broken = fs.screens.filter(x => x.qid);
      await fs.endScreen();
    },
    report(rec) {
      const s = rec.screens;
      if (!s.broken) return ['Not reached.' + b1Tail(rec), '', ''];
      const say = list => (list || []).map(x => `${x.qid} [${x.source}] ${x.dots_ms} ms of dots, "${x.question}"`).join('; ');
      const all = [...(s.slow || []), ...(s.broken || [])];
      return [
        `${say(s.slow)}. Held: ${(s.held || []).map(h => `${h.path} ${h.held_from} to ${h.released_at || 'not let go'}`).join('; ')}.`,
        `${say(s.broken)}. Stubbed slots: ${(s.broken_sent || []).join(', ')}.`,
        `Longest dots on any screen: ${all.reduce((m, x) => Math.max(m, x.dots_ms || 0), 0)} ms. From Continue to the next screen: ${all.map(x => `${x.qid} ${x.next_screen_after_ms} ms`).join(', ')}.` + b1Tail(rec)
      ];
    }
  },

  'b1c-t7': {
    title: 'B1c T7: the spark screen and the gate',
    expected: [
      'The spark screen shows the new copy, with no "Every bottle starts here." and no "1 / 3" bar.',
      'The gate shows the Dropbox and Wordle lines.'
    ],
    async play(app, rec) {
      const page = app.page;
      const fs = b1Driver(app, rec);
      await app.open();
      await page.locator('#bottle-cta').click();
      await page.locator('#screen-intake.active #f-inp').waitFor({ timeout: STEP_TIMEOUT });
      await page.evaluate(() => typeof finishAllLines === 'function' && finishAllLines());
      rec.screens.spark = await page.evaluate(() => {
        const t = sel => (document.querySelector(sel)?.textContent || '').replace(/\s+/g, ' ').trim();
        const screen = document.getElementById('screen-intake');
        return {
          question: t('#intake-q'), note: t('#intake-body .step-note'), label: (document.getElementById('spark-field-label')?.innerText || '').trim(),
          button: t('#v6-bottle-btn'), bar: !!document.querySelector('#intake-body .intake-prog'), opening: t('#intake-wm'),
          visible_text: (screen?.innerText || '').trim()
        };
      });
      await page.goto(APP_URL, { waitUntil: 'domcontentloaded' });
      rec.screens.gate = await fs.newBottle(B1C_FOOTBALL.spark);
      rec.screens.gate_lines = (await page.locator('#spark-gate .gate-example').allTextContents()).map(s => s.trim());
    },
    report(rec) {
      const s = rec.screens.spark, g = rec.screens.gate_lines || [];
      if (!s) return ['Not reached.' + b1Tail(rec), ''];
      const C = B1C_SPARK_COPY;
      return [
        `Question "${s.question}" (${s.question === C.question}). Line "${s.note}" (${s.note === C.note}). Label "${s.label}" (${s.label === C.label}). Button "${s.button}" (${s.button === C.button}). "Every bottle starts here." on screen: ${/Every bottle starts here/.test(s.visible_text)}. Bar: ${s.bar}; "1 / 3" on screen: ${/1 \/ 3/.test(s.visible_text)}.`,
        `Gate lines: ${g.map(x => `"${x}"`).join(', ')} (Dropbox ${g[0] === C.fix}, Wordle ${g[1] === C.experiment}).` + b1Tail(rec)
      ];
    }
  },

  'b1c-t8': {
    title: 'B1c T8: phone, 390x844',
    expected: [
      'The main button is on screen without scrolling on every screen of both paths, including the plan step.'
    ],
    async play(app, rec) {
      const context = await app.browser.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
      try {
        const page = await context.newPage();
        page.on('pageerror', err => rec.page_errors.push(String(err && err.message || err)));
        const phone = driver(page, rec);
        phone.outDir = app.outDir;
        phone.browser = app.browser;
        const fs = b1Driver(phone, rec);
        const looks = rec.screens.phone = [];
        const measure = async (label, sel) => {
          await page.waitForTimeout(300);
          const m = await page.evaluate(sel => {
            const el = document.querySelector(sel);
            const r = el?.getBoundingClientRect();
            return {
              scroll_y: window.scrollY, viewport_w: window.innerWidth, viewport_h: window.innerHeight,
              button: el ? { text: el.textContent.trim(), top: Math.round(r.top), bottom: Math.round(r.bottom), left: Math.round(r.left), right: Math.round(r.right) } : null
            };
          }, sel);
          m.label = label;
          m.on_screen = !!m.button && m.button.top >= 0 && m.button.bottom <= m.viewport_h && m.button.left >= 0 && m.button.right <= m.viewport_w;
          looks.push(m);
          await page.screenshot({ path: join(app.outDir, `run-${rec.run}-phone-${String(looks.length).padStart(2, '0')}-${label}.png`) });
        };
        const questions = async (path, answers) => {
          for (const a of answers) {
            await fs.ready();
            const snap = await b1Snap(page);
            await measure(`${path}-${snap.qid}`, '#fs-next');
            await fs.answer(a);
          }
        };
        const plan = async (path, kind, answers) => {
          await page.locator(`#fs-choice-${kind}`).click();
          const list = [...answers];
          for (let k = 0; k < 6; k++) {
            await fs.ready();
            if (await page.locator('#fs-when').count()) break;
            const snap = await b1Snap(page);
            await measure(`${path}-plan-${snap.qid}`, '#fs-next');
            await fs.answer(list.shift() || 'dont_know');
          }
          await page.locator('#fs-when').waitFor({ timeout: 10000 });
          await measure(`${path}-when`, '#fs-when-day');
          await page.locator('#fs-when-today').click();
          await page.locator('#fs-plan').waitFor({ timeout: 10000 });
          await measure(`${path}-confirmation`, '#fs-cellar');
        };

        await phone.open();
        phone.spark = B1C_GARDEN.spark;
        await phone.typeSpark(B1C_GARDEN.spark);
        await measure('spark', '#v6-bottle-btn');
        await page.locator('#v6-bottle-btn').click();
        if (await page.locator('#m0-config').isVisible()) {
          await page.locator('#v6-worker-url').fill(WORKER_URL);
          await page.locator('#v6-bottle-btn').click();
        }
        await page.locator('#spark-gate').waitFor({ state: 'visible', timeout: STEP_TIMEOUT });
        await measure('gate', '#spark-gate .gate-option:last-child .gate-choice');
        await fs.pick('fix');
        await questions('fix', B1C_GARDEN.answers);
        await fs.waitForLog(b1bLabelLogged('F1'), 60000);
        await fs.readEnd();
        await measure('fix-end', '#fs-choice-ask');
        await plan('fix', 'ask', B1C_GARDEN.plan);
        await fs.backToCellar();

        await fs.newBottle(B1C_FOOTBALL.spark, { fromCellar: true });
        await fs.pick('experiment');
        await questions('experiment', B1C_FOOTBALL.answers);
        await fs.readEnd();
        await measure('experiment-end', '#fs-choice-show');
        await plan('experiment', 'show', B1C_FOOTBALL.plan);
        await phone.exportCellar(join(app.outDir, `run-${rec.run}-cellar.json`));
        rec.exported = true;
      } finally {
        await context.close();
      }
    },
    report(rec) {
      const looks = rec.screens.phone || [];
      if (!looks.length) return ['Not reached.' + b1Tail(rec)];
      return [looks.map(m => `${m.label}: "${m.button?.text}" ${m.button?.top} to ${m.button?.bottom} of ${m.viewport_h}, scrolled ${m.scroll_y}, on screen ${m.on_screen}`).join('; ') + `. Screen ${looks[0].viewport_w}x${looks[0].viewport_h}.` + b1Tail(rec)];
    }
  },

  'b1c-t9': {
    title: 'B1c T9: a bottle from B1b and bottles from before B1 open as they do today',
    expected: [
      'A bottle from B1b and one from before B1 open as they do today: the same screen and text as the app before B1c shows for each.'
    ],
    async play(app, rec) {
      const exports = rec.screens.exports = ['runs/2026-11-07-b1b-t6/run-1-cellar.json', 'runs/2026-11-07-b1b-t7/run-1-cellar.json', B1_S6_EXPORT];
      rec.screens.app_before = `${B1C_BEFORE}:corked_v6.html and shared/ on port ${OLD_APP_PORT}`;
      const server = await b1ServeOldApp(B1C_BEFORE, { withShared: true });
      const bottles = rec.screens.bottles = [];
      const oldUrl = `http://localhost:${OLD_APP_PORT}/corked_v6.html?rhythmtest=1`;
      const oldCtx = await app.browser.newContext({ viewport: { width: 1400, height: 900 } });
      try {
        const oldPage = await oldCtx.newPage();
        oldPage.on('pageerror', err => rec.page_errors.push('app before B1c: ' + String(err?.message || err)));
        for (const file of exports) {
          const exportFile = JSON.parse(await readFile(join(REPO, file), 'utf8'));
          const cellar = JSON.parse(exportFile.keys[CELLAR_KEY]);
          const load = async (page, url) => {
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await page.evaluate(keys => { localStorage.clear(); for (const [k, v] of Object.entries(keys)) localStorage.setItem(k, v); }, exportFile.keys);
            await page.goto(url, { waitUntil: 'domcontentloaded' });
            await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
          };
          const openIn = async (page, url, id) => {
            await load(page, url);
            const card = await page.locator(`.bottle-card[data-bottle-id="${id}"]`).innerText();
            const stored = () => page.evaluate(([key, id]) => JSON.parse(localStorage.getItem(key) || '[]').find(b => b.id === id) || null, [CELLAR_KEY, id]);
            const before = await stored();
            await page.locator(`.bottle-card[data-bottle-id="${id}"]`).click();
            await page.waitForTimeout(1500);
            await page.waitForFunction(() => !/Reading/.test(document.getElementById('p1-btn')?.textContent || ''), undefined, { timeout: STEP_TIMEOUT, polling: 250 }).catch(() => {});
            await page.evaluate(() => typeof finishAllLines === 'function' && finishAllLines());
            const view = await b1cBottleView(page);
            const after = await stored();
            return { card, view, s_fields_changed: b1Diff(before?.s, after?.s) };
          };
          for (const b of cellar) {
            const now = await openIn(app.page, APP_URL, b.id);
            const old = await openIn(oldPage, oldUrl, b.id);
            bottles.push({
              export: file, id: b.id, idea: b.s?.idea, flow: b.s?.flow || null,
              app_now: now, app_before_b1c: old,
              same_card: now.card === old.card,
              same_view: JSON.stringify(now.view) === JSON.stringify(old.view),
              same_changes: JSON.stringify(now.s_fields_changed) === JSON.stringify(old.s_fields_changed)
            });
            app.step('opened a bottle in both apps', { note: `${b.id}: same view ${bottles[bottles.length - 1].same_view}` });
          }
        }
      } finally {
        await oldCtx.close();
        server.close();
      }
    },
    report(rec) {
      const bottles = rec.screens.bottles || [];
      if (!bottles.length) return ['Not reached.' + b1Tail(rec)];
      return [bottles.map(b => `"${String(b.idea).slice(0, 50)}" (${b.flow || 'before B1'}, ${b.export}): opens on ${b.app_now.view.screen}${b.app_now.view.first_session ? `, "${b.app_now.view.first_session.slice(0, 90)}…"` : `, "${b.app_now.view.mech_label}" "${b.app_now.view.main_button}"`}. Same card ${b.same_card}, same view ${b.same_view}, same stored changes ${b.same_changes}.`).join(' ') + ` App before B1c: ${rec.screens.app_before}.` + b1Tail(rec)];
    }
  },

  // The phone pass by itself. It costs nothing and needs no worker.
  'trust-basics-phone': {
    title: 'Trust basics, the phone pass',
    expected: [PHONE_EXPECTED, LIMIT_EXPECTED],
    async play(app, rec) {
      rec.exported = true;   // nothing to export: no bottle gets made
      await phoneSparkPass(app, rec);
    },
    report(rec) {
      return [
        phoneSparkReport(rec),
        sparkLimitReport(rec) + `${rec.broke_off ? ` Broke off: ${rec.broke_off}` : ''} Page errors: ${rec.page_errors.length ? rec.page_errors.join('; ') : 'none'}.`
      ];
    }
  },

  'trust-basics': {
    title: 'Trust basics',
    expected: [
      'On an empty cellar the spark screen shows the AI line. After a reload it doesn\'t. The cellar link opens the same text.',
      'During the whole run, no request goes to fonts.googleapis.com or fonts.gstatic.com.',
      'After the first bottle is saved, navigator.storage.persist was called. Record what navigator.storage.persisted() returns.',
      'Every element that shows a field the worker listed in ai_fields has data-ai-generated="true", data-ai-model and a visible AI tag. No other element has them: not the spark, the builder\'s answers, the mechanism table\'s questions or M2\'s scene question.',
      'The exported cellar\'s log entries from worker replies carry prompt_version, model and ai_fields.',
      'With the worker URL set to an address that doesn\'t answer, bottling a spark shows the failed-send message, never "Could not reach the worker", and the harness reports it as a failed bottling.',
      'The bottle drawings in the sidebar, the phone header and on cellar cards have an accessible name that starts with the spark\'s first words and holds no count (nothing like "3 of 6"). The two landing bottles are aria-hidden.',
      PHONE_EXPECTED,
      LIMIT_EXPECTED
    ],

    async play(app, rec) {
      const page = app.page;
      const s = rec.screens = {
        ai_line: {}, fonts: { blocked_requests: [], font_files: [], faces: [] }, persist: {}, sweeps: [],
        replies: [], copy_question: null, failed_bottling: {}, bottle_names: {}, landing_bottles: {},
        caution: { seen: [] }, backup_line: {}, reached: {}
      };

      // A server left on the port would serve another copy of the app.
      const served = await fetch(APP_URL.split('?')[0], { cache: 'no-store' }).then(r => r.text());
      if (served !== await readFile(join(REPO, 'corked_v6.html'), 'utf8')) {
        throw new Error('The page on port 8080 is not this checkout\'s app. Close Start Corked and run again.');
      }
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: `http://localhost:${PORT}` });

      const watchFonts = p => p.on('request', r => {
        const url = r.url();
        if (/fonts\.(googleapis|gstatic)\.com/.test(url)) s.fonts.blocked_requests.push(url);
        if (url.startsWith('http') && new URL(url).pathname.startsWith('/fonts/')) s.fonts.font_files.push(new URL(url).pathname);
      });
      watchFonts(page);

      // Every text the worker listed in ai_fields, read off the wire.
      const listed = [];
      page.on('response', async r => {
        if (!r.url().startsWith(WORKER_URL) || r.request().method() !== 'POST') return;
        const body = await r.json().catch(() => null);
        if (!body) return;
        const route = new URL(r.url()).pathname;
        s.replies.push({ route, status: r.status(), prompt_version: body.prompt_version ?? null, model: body.model ?? null, ai_fields: body.ai_fields ?? null });
        for (const field of body.ai_fields || []) {
          const value = field.split('.').reduce((o, k) => o?.[k], body);
          if (typeof value === 'string' && value.trim()) listed.push({ route, field, text: value, model: body.model });
        }
      });

      // Counts calls to navigator.storage.persist across reloads, outside the keys an export carries.
      await page.addInitScript(() => {
        const store = navigator.storage;
        if (!store || !store.persist) return;
        const real = store.persist.bind(store);
        store.persist = () => {
          localStorage.setItem('run_persist_calls', String(Number(localStorage.getItem('run_persist_calls') || 0) + 1));
          return real();
        };
      });
      const persistNow = () => page.evaluate(async () => ({
        calls: Number(localStorage.getItem('run_persist_calls') || 0),
        persisted: navigator.storage?.persisted ? await navigator.storage.persisted() : null
      }));

      // One look at everything on screen: what carries the AI marks, what shows a listed text, and
      // whether the builder's words or a fixed question carry them.
      const sweep = async when => {
        await page.waitForTimeout(400);   // a reply's fields are read off the wire a moment after it lands
        await page.waitForFunction(() => !document.querySelector('.typed-rest'), undefined, { timeout: 30000, polling: 100 });
        const seen = await page.evaluate(({ listed }) => {
          const norm = t => String(t || '').replace(/\s+/g, ' ').trim();
          const shown = new Map();
          for (const l of listed) {
            for (const t of [l.text, sanitizeVisibleCopy(l.text)]) {
              shown.set(norm(t), l);
              shown.set(`Looking for: ${norm(t)}`, l);
            }
          }
          const isVisible = el => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
          const textOf = el => norm(el.matches('textarea, input') ? el.value : el.textContent);
          const name = el => el.id ? `#${el.id}` : `.${[...el.classList].join('.')}`;
          const tagOf = el => el.matches('textarea') ? document.querySelector('#m2-problem-label .ai-tag') : el.querySelector(':scope > .ai-tag');
          const tagReads = tag => !!tag && isVisible(tag) && tag.getAttribute('aria-label') === 'Written by AI'
            && getComputedStyle(tag, '::before').content.includes('AI');

          const tagged = [...document.querySelectorAll('[data-ai-generated]')].filter(isVisible).map(el => ({
            where: name(el),
            text: textOf(el),
            generated: el.getAttribute('data-ai-generated'),
            model: el.getAttribute('data-ai-model'),
            tag_visible: tagReads(tagOf(el)),
            listed_field: shown.get(textOf(el))?.field ?? null
          }));

          const notAi = ['#sb-idea', '#ph-spark', '.bottle-card-line', '#f-inp', '#ans', '#swirl-ans', '#dr-answer', '#rv-reopen-ans',
            '#lr-ans', '#fold-a', '.review-a:not(.is-corked)', '#m1-record', '.change-words', '.el-name', '.vc-field-val', '#m-label'];

          // The deepest visible element showing a listed text, whether marked or not. The builder's own
          // fields are left to the check below: a line the model repeats word for word stays theirs.
          const untagged = [...document.querySelectorAll('body *')]
            .filter(el => !el.matches('script, style') && !el.matches(notAi.join(', ')) && isVisible(el) && shown.has(textOf(el)))
            .filter(el => ![...el.children].some(c => textOf(c) === textOf(el)))
            .filter(el => !el.closest('[data-ai-generated]'))
            .map(el => ({ where: name(el), text: textOf(el), listed_field: shown.get(textOf(el)).field }));

          const wrongly_marked = notAi.flatMap(sel => [...document.querySelectorAll(sel)]
            .filter(el => el.hasAttribute('data-ai-generated') || el.querySelector('[data-ai-generated], .ai-tag')).map(() => sel));

          const mech = typeof M !== 'undefined' ? M[mi] : null;
          const mq = document.getElementById('m-q');
          return {
            tagged, untagged, wrongly_marked,
            question: mq && isVisible(mq) && document.getElementById('screen-phase1').classList.contains('active') ? {
              mech: mech?.id ?? null,
              m2_stage: mech?.id === 'M2' ? m2Stage() : null,
              text: textOf(mq),
              marked: mq.hasAttribute('data-ai-generated')
            } : null,
            caution: [...document.querySelectorAll('.ai-caution')].filter(isVisible).map(el => ({ text: textOf(el), under: el.previousElementSibling ? name(el.previousElementSibling) : null }))
          };
        }, { listed });
        s.sweeps.push({ when, ...seen });
        if (seen.caution.length) s.caution.seen.push({ when, ...seen.caution[0] });
        app.step(`swept: ${when}`, { note: `${seen.tagged.length} marked, ${seen.untagged.length} unmarked, ${seen.wrongly_marked.length} wrongly marked` });
      };

      const shoot = async name => {
        await page.waitForFunction(() => !document.querySelector('.typed-rest') && !document.querySelector('.cellar-entering'), undefined, { timeout: 30000, polling: 100 });
        await page.screenshot({ path: join(app.outDir, `run-${rec.run}-${name}.png`) });
      };

      const aiLine = async () => ({
        visible: await page.locator('#spark-ai-line').isVisible().catch(() => false),
        text: await page.locator('#spark-ai-line').first().textContent({ timeout: 500 }).catch(() => null),
        comes_after_the_field: await page.evaluate(() => {
          const line = document.getElementById('spark-ai-line');
          const field = document.getElementById('f-inp');
          return !!line && !!field && !!(field.compareDocumentPosition(line) & Node.DOCUMENT_POSITION_FOLLOWING);
        })
      });
      const toSparkStep = async () => {
        await page.locator('#bottle-cta').click();
        await page.locator('#screen-intake.active .ph-overlay').waitFor({ state: 'attached', timeout: STEP_TIMEOUT });
      };
      const bottleNames = () => page.evaluate(() => {
        const read = sel => {
          const svg = document.querySelector(sel);
          return svg ? { role: svg.getAttribute('role'), name: svg.getAttribute('aria-label'), aria_hidden: svg.getAttribute('aria-hidden') } : null;
        };
        return { sidebar: read('#bottle-wrap svg'), phone_header: read('#ph-bottle svg') };
      });

      // Expected 1, the first half.
      await app.open();
      s.landing_bottles = await page.evaluate(() => ({
        ld_bottle: document.getElementById('ld-bottle')?.getAttribute('aria-hidden') ?? null,
        ld_bottle_phone: document.getElementById('ld-bottle-phone')?.getAttribute('aria-hidden') ?? null
      }));
      await toSparkStep();
      s.ai_line.first_time = await aiLine();
      await shoot('spark-screen-first-time');
      app.step('the spark screen, first time', { note: `AI line visible: ${s.ai_line.first_time.visible}` });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('#screen-landing.active').waitFor({ timeout: STEP_TIMEOUT });
      await toSparkStep();
      s.ai_line.after_reload = await aiLine();
      app.step('the spark screen, after a reload', { note: `AI line visible: ${s.ai_line.after_reload.visible}` });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('#screen-landing.active').waitFor({ timeout: STEP_TIMEOUT });

      // Bottle A: a spark that states its problem.
      const A = TRUST.A;
      app.spark = A.spark;
      const typedA = await app.typeSpark(A.spark);
      if (typedA.field_value !== A.spark) throw new Error('The spark did not reach the field.');
      await app.openGate();
      await app.passGate();
      s.persist.before_first_bottle = await persistNow();
      await app.pickOption('Yes.');
      await app.pickOption('Yes, I can name them and I know the moment.');
      await app.intakeContinue();
      await app.enterGrape(A.name, A.rel);
      await app.waitForPhase1();
      s.persist.after_first_bottle = await persistNow();
      s.bottle_names.a_at_grape = await bottleNames();
      await sweep('A: M1 reading');
      await shoot('m1-reading');
      await app.setRhythm(TRUST.pace, TRUST.timing);
      await app.waitForM2({ onWording: () => sweep('A: M2 wording waiting for the builder') });
      await sweep('A: M2 question');
      await shoot('m2-question');
      const m2 = await app.answer(A.M2);
      await sweep('A: M2 reading');
      if (await page.locator('#answer-fold').isVisible()) {
        await page.locator('#answer-fold summary').click();
        await sweep('A: M2 reading, the answer fold open');
        await page.locator('#answer-fold summary').click();
      }
      if (m2.followUp) {
        await sweep('A: M2 follow-up');
        await app.answerFollowUp(A.follow_up);
        await sweep('A: after the M2 follow-up');
      }
      const briefLanded = () => page.waitForFunction(() => {
        const card = document.querySelector('#inline-errand .errand-card');
        return !card || !card.textContent.includes('Finding your brief');
      }, undefined, { timeout: STEP_TIMEOUT, polling: 250 });
      await briefLanded();
      if (await page.locator('#inline-errand .errand-card').isVisible()) {
        await sweep('A: M2 errand');
        await shoot('m2-errand');
        await page.locator('#inline-errand .brief-copy-btn').click();
        await page.waitForTimeout(150);
        s.copy_question = {
          on_screen: await page.evaluate(() => document.querySelector('#inline-errand .brief-q-text')?.textContent.trim()),
          on_the_clipboard: await page.evaluate(() => navigator.clipboard.readText())
        };
      }
      s.bottle_names.a_after_m2 = await bottleNames();
      if (await page.locator('#elr-tell').count()) {
        await app.openElement('tell');
        if (await page.locator('#review-panel').isVisible()) {
          await sweep('A: the Tell in the sidebar, with its reopen');
          await page.locator('#review-panel .review-back').click();
        }
      }
      if (await page.locator('#rw-park-btn').isVisible()) {
        await app.parkAndComeBack();
        await sweep('A: the parked question came back');
        const parked = await app.answerParked(A.parked);
        await sweep('A: the parked answer read');
        if (parked.followUp) await app.leaveFollowUpUnanswered();
      }
      await app.waitOutHold();
      if (await page.locator('#swirl-panel').isVisible()) await app.leaveFollowUpUnanswered();
      if (await page.evaluate(() => M[mi]?.id) === 'M2') {
        await page.locator('#p1-btn').click();
        await page.waitForFunction(() => M[mi]?.id !== 'M2'
          || document.getElementById('errand-warn-overlay').classList.contains('show'), undefined, { timeout: STEP_TIMEOUT, polling: 250 });
        if (await page.locator('#errand-warn-overlay').isVisible()) {
          app.step('errand warning shown, continuing anyway');
          await page.locator('#errand-warn-overlay .ew-go').click();
          await page.waitForFunction(() => M[mi]?.id !== 'M2', undefined, { timeout: STEP_TIMEOUT, polling: 250 });
        }
      }
      s.reached.a_after_m2 = await page.evaluate(() => M[mi]?.id);
      if (s.reached.a_after_m2 === 'M3') {
        await sweep('A: M3 question, from the mechanism table');
        const m3 = await app.answer(A.M3);
        await sweep('A: M3 reading');
        if (m3.followUp) {
          await sweep('A: M3 follow-up');
          await app.answerFollowUp(A.M3_follow_up);
          await sweep('A: after the M3 follow-up');
        }
        await briefLanded();
        if (await page.locator('#inline-errand .errand-card').isVisible()) await sweep('A: M3 errand');
      }

      // /resolve only opens on the label screen with one element left, seven questions away, so this
      // one is opened directly. The real route answers it, and nothing here is saved to the bottle.
      await page.evaluate(() => {
        window.__elements = { ...S.elements };
        S.elements = { grape: 'settled', tell: 'turbid', vintage: 'settled', gap: 'settled', echo: 'settled', limit: 'settled' };
        return openLabelReopen('tell');
      });
      await sweep('A: the resolving question, opened directly');
      await shoot('resolving-question');
      await page.evaluate(() => {
        closeLabelReopen();
        S.elements = window.__elements;
      });

      // Expected 1, the second half.
      await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      await page.locator('#cellar-who summary').click();
      await shoot('cellar-link-open');
      s.ai_line.cellar_link = {
        link_text: (await page.locator('#cellar-who summary').textContent()).trim(),
        visible: await page.locator('#cellar-who-text').isVisible(),
        text: (await page.locator('#cellar-who-text').textContent()).trim()
      };
      await page.locator('#cellar-who summary').click();
      await sweep('the cellar with one bottle');

      // Bottle B: a spark that states no problem.
      const B = TRUST.B;
      app.spark = B.spark;
      const typedB = await app.typeSpark(B.spark, { fromCellar: true });
      if (typedB.field_value !== B.spark) throw new Error('The spark did not reach the field.');
      s.ai_line.second_spark = await aiLine();
      await app.openGate();
      await app.passGate();
      await app.pickOption('Yes.');
      await app.pickOption('I can name them, but I have only heard about it secondhand.');
      await app.intakeContinue();
      await app.enterGrape(B.name, B.rel);
      await app.waitForPhase1();
      await sweep('B: M1 reading');
      await app.setRhythm(TRUST.pace, TRUST.timing);
      const m2b = await app.waitForM2({ onWording: () => sweep('B: M2 wording waiting for the builder') });
      await sweep(`B: M2 opened on the ${m2b.stage} stage`);
      s.reached.b_m2_stage = m2b.stage;
      if (m2b.stage === 'scene') {
        await page.locator('#ans').fill(B.scene);
        await page.locator('#p1-btn').click();
        await page.waitForFunction(() => {
          const btn = document.getElementById('p1-btn');
          return (btn && !btn.disabled && btn.textContent.trim() === "That's the problem")
            || document.getElementById('swirl-panel').style.display === 'flex'
            || document.getElementById('send-failed').style.display === 'flex';
        }, undefined, { timeout: STEP_TIMEOUT, polling: 250 });
        if ((await app.text('#p1-btn')) === "That's the problem") {
          await sweep('B: the problem built from the scene, waiting for the builder');
          await shoot('problem-from-scene');
          await page.locator('#p1-btn').click();
          await page.waitForFunction(() => document.getElementById('p1-btn')?.textContent.trim() !== "That's the problem", undefined, { timeout: STEP_TIMEOUT });
          await sweep('B: M2 friction question after the scene');
        } else {
          await sweep('B: the scene follow-up');
        }
      }
      await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });

      // Bottle C: self mode.
      const C = TRUST.C;
      app.spark = C.spark;
      const typedC = await app.typeSpark(C.spark, { fromCellar: true });
      if (typedC.field_value !== C.spark) throw new Error('The spark did not reach the field.');
      await app.openGate();
      await app.passGate();
      await app.pickOption('No.');
      await app.pickOption('Yes. This comes from my own experience.');
      await app.intakeContinue();
      await app.enterGrape(C.name, C.rel);
      await app.waitForPhase1();
      s.bottle_names.c_self_mode = await bottleNames();
      await app.setRhythm(TRUST.pace, TRUST.timing);
      await app.waitForM2({ onWording: () => sweep('C: M2 wording waiting for the builder') });
      await sweep('C: M2 question, self mode');
      await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });

      s.bottle_names.cards = await page.evaluate(() => [...document.querySelectorAll('.bottle-card')].map(card => {
        const svg = card.querySelector('.bottle-card-bottle svg');
        return { role: svg?.getAttribute('role') ?? null, name: svg?.getAttribute('aria-label') ?? null, aria_hidden: svg?.getAttribute('aria-hidden') ?? null };
      }));
      await sweep('the cellar with three bottles');
      s.fonts.faces = await page.evaluate(async () => {
        await document.fonts.ready;
        return [...document.fonts].map(f => ({ family: f.family, weight: f.weight, style: f.style, status: f.status }));
      });

      // Export, then what the cellar says about backups.
      const before = await persistNow();
      const path = join(app.outDir, `run-${rec.run}-cellar.json`);
      await app.exportCellar(path);
      rec.exported = true;
      rec.cellars = { first: JSON.parse(await readFile(path, 'utf8')) };
      await page.waitForTimeout(300);
      s.persist.around_export = { before, after: await persistNow() };
      const backupLine = () => page.evaluate(() => {
        const el = document.getElementById('cellar-backup-line');
        return el && el.getClientRects().length ? el.textContent.trim() : null;
      });
      s.backup_line.after_export = await backupLine();
      s.backup_line.last_export_key = await page.evaluate(() => localStorage.getItem('corked_last_export_at'));
      s.backup_line.key_in_the_export = 'corked_last_export_at' in (rec.cellars.first.keys || {});
      await page.evaluate(() => {
        localStorage.setItem('corked_last_export_at', new Date(Date.now() - 8 * 86400000).toISOString());
        renderCellar();
      });
      s.backup_line.last_export_8_days_old = await backupLine();
      await shoot('cellar-backup-line');
      await page.evaluate(() => {
        localStorage.removeItem('corked_last_export_at');
        Cellar.replaceAll(Cellar.all().map(b => ({ ...b, created_at: new Date(Date.now() - 8 * 86400000).toISOString() })));
        renderCellar();
      });
      s.backup_line.never_exported_bottle_8_days_old = await backupLine();
      await page.evaluate(() => {
        Cellar.replaceAll(Cellar.all().map(b => ({ ...b, created_at: new Date().toISOString() })));
        renderCellar();
      });
      s.backup_line.never_exported_new_bottles = await backupLine();

      // Expected 6, in its own browser profile.
      const fail = s.failed_bottling;
      const context = await app.browser.newContext({ viewport: { width: 1400, height: 900 } });
      const deadPage = await context.newPage();
      watchFonts(deadPage);
      await deadPage.addInitScript(url => localStorage.setItem('corked_worker_url', url), TRUST.dead_worker);
      const dead = driver(deadPage, rec);
      await dead.open();
      const typedDead = await dead.typeSpark(A.spark);
      if (typedDead.field_value !== A.spark) throw new Error('The spark did not reach the field.');
      await dead.openGate();
      try {
        await dead.passGate();
        fail.harness_reported = null;
      } catch (err) {
        fail.harness_reported = String(err && err.message || err);
      }
      fail.status_line = await dead.text('#v6-bottle-status').catch(() => null);
      fail.says_could_not_reach = (await deadPage.locator('body').innerText()).includes('Could not reach the worker');
      fail.spark_still_in_field = await deadPage.locator('#f-inp').inputValue().catch(() => null);
      await context.close();

      // Expected 8 and 9, in their own browser profile.
      await phoneSparkPass(app, rec, watchFonts);
    },

    report(rec) {
      const s = rec.screens || {};
      const notReached = 'Not reached.';
      const out = [];

      const line = s.ai_line || {};
      out.push(line.first_time ? [
        `First time on the spark screen: AI line visible ${line.first_time.visible}, after the field ${line.first_time.comes_after_the_field}, text matches the brief ${line.first_time.text?.trim() === TRUST.ai_line}.`,
        `After a reload: visible ${line.after_reload?.visible}.`,
        `A second spark in the same browser: visible ${line.second_spark?.visible}.`,
        line.cellar_link ? `Cellar link "${line.cellar_link.link_text}": opened ${line.cellar_link.visible}, same text ${line.cellar_link.text === TRUST.ai_line}.` : 'Cellar link not reached.'
      ].join(' ') : notReached);

      const fonts = s.fonts || {};
      out.push(`Requests to fonts.googleapis.com or fonts.gstatic.com: ${(fonts.blocked_requests || []).length}. Font files fetched from fonts/: ${[...new Set(fonts.font_files || [])].join(', ') || 'none'}.`
        + ` Faces at the end: ${(fonts.faces || []).map(f => `${f.family} ${f.weight} ${f.status}`).join(', ') || 'not read'}.`);

      const p = s.persist || {};
      out.push(p.after_first_bottle ? `persist calls before the first bottle: ${p.before_first_bottle?.calls}. After it: ${p.after_first_bottle.calls}. persisted() returned ${p.after_first_bottle.persisted}.`
        + (p.around_export ? ` Around the export: ${p.around_export.before.calls} then ${p.around_export.after.calls} calls, persisted() ${p.around_export.after.persisted}.` : ' Export not reached.') : notReached);

      const sweeps = s.sweeps || [];
      const bad = [];
      for (const sw of sweeps) {
        for (const t of sw.tagged) {
          if (t.generated !== 'true' || !t.model || !t.tag_visible || !t.listed_field) bad.push(`${sw.when}: ${t.where} marked wrong (generated ${t.generated}, model ${t.model}, tag visible ${t.tag_visible}, listed ${t.listed_field}), text "${t.text}"`);
        }
        for (const u of sw.untagged) bad.push(`${sw.when}: ${u.where} shows ${u.listed_field} with no mark, text "${u.text}"`);
        for (const w of sw.wrongly_marked) bad.push(`${sw.when}: ${w} carries a mark`);
        if (sw.question?.marked && sw.question.mech !== 'M2') bad.push(`${sw.when}: ${sw.question.mech}'s table question carries a mark`);
        if (sw.question?.marked && sw.question.m2_stage === 'scene') bad.push(`${sw.when}: M2's scene question carries a mark`);
      }
      const places = [...new Set(sweeps.flatMap(sw => sw.tagged.map(t => `${t.where} (${t.listed_field})`)))];
      const scene = sweeps.find(sw => sw.question?.m2_stage === 'scene');
      const table = sweeps.find(sw => sw.question?.mech && !['M1', 'M2'].includes(sw.question.mech));
      out.push(`${sweeps.length} screens swept. Marked: ${places.join(', ') || 'none'}. Problems: ${bad.length ? bad.join('; ') : 'none'}.`
        + ` M2's scene question: ${scene ? `reached, marked ${scene.question.marked}` : 'not reached'}. A table question: ${table ? `${table.question.mech} reached, marked ${table.question.marked}` : 'not reached'}.`
        + ` Copy question: ${s.copy_question ? `clipboard equals the question on screen ${s.copy_question.on_the_clipboard === s.copy_question.on_screen}` : 'not reached'}.`
        + ` Caution line: ${(s.caution?.seen || []).map(c => `"${c.text}" under ${c.under} at "${c.when}"`).join('; ') || 'never seen'}.`);

      const cellar = rec.cellars?.first?.keys?.[CELLAR_KEY] ? JSON.parse(rec.cellars.first.keys[CELLAR_KEY]) : null;
      if (cellar) {
        const fromWorker = cellar.flatMap(b => (b.s?.log || []).map(e => ({ selfGrape: b.s.maturity === 2 && e.mech === 'M1', e })))
          .filter(({ selfGrape, e }) => !selfGrape && (e.type === 'answer' || e.type === 'problem_recorded'));
        const missing = fromWorker.filter(({ e }) => !e.prompt_version || !e.model || !Array.isArray(e.ai_fields));
        out.push(`Log entries from worker replies: ${fromWorker.length}. Carrying all three: ${fromWorker.length - missing.length}. Missing: ${missing.map(({ e }) => `${e.type} ${e.mech || ''}`.trim()).join(', ') || 'none'}.`);
      } else {
        out.push('No export to read.');
      }

      const f = s.failed_bottling || {};
      out.push(f.status_line !== undefined ? `Status line: "${f.status_line}". Is the failed-send message: ${f.status_line === TRUST.failed_line}. "Could not reach the worker" on screen: ${f.says_could_not_reach}. Harness reported: ${f.harness_reported || 'nothing'}.` : notReached);

      const names = s.bottle_names || {};
      const countLike = /\b\d+\s*(of|\/)\s*\d+\b/i;
      const checkName = (where, b, spark) => !b ? `${where}: not reached`
        : `${where}: "${b.name}" (starts with the spark ${!!b.name && b.name.startsWith(spark.slice(0, 30))}, count ${countLike.test(b.name || '')}, aria-hidden ${b.aria_hidden})`;
      out.push([
        checkName('sidebar', names.a_after_m2?.sidebar, TRUST.A.spark),
        checkName('phone header', names.a_after_m2?.phone_header, TRUST.A.spark),
        ...(names.cards || []).map((c, i) => checkName(`card ${i + 1}`, c, TRUST[['A', 'B', 'C'].find(k => (c.name || '').startsWith(TRUST[k].spark.slice(0, 30))) || 'A'].spark)),
        checkName('self mode sidebar', names.c_self_mode?.sidebar, TRUST.C.spark),
        `landing bottles aria-hidden: ${s.landing_bottles?.ld_bottle}, ${s.landing_bottles?.ld_bottle_phone}`
      ].join('; ') + '.');

      out.push(phoneSparkReport(rec));
      out.push(sparkLimitReport(rec));

      if (rec.broke_off) out[out.length - 1] += ` Broke off: ${rec.broke_off}`;
      out[out.length - 1] += ` Page errors: ${rec.page_errors.length ? rec.page_errors.join('; ') : 'none'}.`;
      return out;
    }
  },

  'look-and-states': {
    title: 'Look and states',
    expected: [
      'No Winemaster circle or "THE WINEMASTER" anywhere. Question screens show the mechanism name, with no progress bar, "Element 2 of 7" or "Phase 1 element 2 of 7".',
      'After Bottle A\'s M2: if something settled, the screen shows the observation, "What changed" with excerpts that appear character for character in the answer, the next-question line and "Back to the cellar", and no park buttons. If nothing settled, report it as not tested.',
      'After the blocked M3 send: the answer is still in the field with the failure message and "Try again". After leaving and reopening the bottle, the answer is there again. After the retry, the history log holds that answer once.',
      'After Bottle A\'s M3, and its follow-up if one appears: if the Echo is turbid or clearing, the errand card shows, "Copy question" puts only the question on the clipboard, both park buttons show, and there is no "What changed". If the Echo settled, report it as not tested.',
      'After Bottle B\'s M2: if a follow-up appears, it leads the screen with its field and "Continue →". If none appears, report it as not tested.',
      'The label spells out the states, clearing and turbid rows are buttons that open the reopen, the bottle has no ticks, and the Grape row shows the name.',
      'At 390×500, the question and the top of the answer field are visible without scrolling.'
    ],

    async play(app, rec) {
      const page = app.page;
      const dir = app.outDir;
      const s = rec.screens = { gone_checks: [], typing: {}, fit_390x500: {}, shots: [], A: {}, B: {}, extras: {} };
      const desktop = { width: 1440, height: 900 };
      await page.setViewportSize(desktop);
      await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin: `http://localhost:${PORT}` });

      // A server left on the port would serve another copy of the app.
      const served = await fetch(APP_URL.split('?')[0], { cache: 'no-store' }).then(r => r.text());
      if (served !== await readFile(join(REPO, 'corked_v6.html'), 'utf8')) {
        throw new Error('The page on port 8080 is not this checkout\'s app. Close Start Corked and run again.');
      }

      // Each screen at each size, once its typed lines are done, the first-entry animation is over
      // and the saved note has gone. A screen taller than the size also gets a full-page picture.
      const shoot = async (name, sizes = ['1440x900', '390x844']) => {
        await page.waitForFunction(() => !document.querySelector('.typed-rest') && !document.querySelector('.cellar-entering')
          && !document.querySelector('.sb-save.show'), undefined, { timeout: 30000, polling: 100 });
        await page.evaluate(() => document.fonts.ready.then(() => true));
        const files = [];
        for (const size of sizes) {
          const [width, height] = size.split('x').map(Number);
          await page.setViewportSize({ width, height });
          await page.waitForTimeout(200);
          const file = `${name}-${size}.png`;
          await page.screenshot({ path: join(dir, file) });
          files.push(file);
          const tall = await page.evaluate(() => document.documentElement.scrollHeight > window.innerHeight + 1);
          if (tall) {
            const fullFile = `${name}-${size}-full.png`;
            await page.screenshot({ path: join(dir, fullFile), fullPage: true });
            files.push(fullFile);
          }
        }
        await page.setViewportSize(desktop);
        await page.waitForTimeout(100);
        s.shots.push({ screen: name, files });
        app.step('screenshot', { note: name });
      };

      // What the question panel shows right now. Only what is on screen counts.
      const screenNow = () => page.evaluate(() => {
        const on = id => { const el = document.getElementById(id); return !!el && el.offsetParent !== null; };
        const read = id => (document.getElementById(id)?.textContent || '').trim().replace(/\s+/g, ' ');
        const within = (root, sel) => (root?.querySelector(sel)?.textContent || '').trim().replace(/\s+/g, ' ');
        const errand = document.getElementById('inline-errand');
        return {
          view: document.getElementById('question-panel')?.dataset.view || null,
          mechanism_label: on('m-label') ? read('m-label') : null,
          phone_mechanism_label: read('ph-mech'),
          question: on('m-q') ? read('m-q') : null,
          observation: on('obs-box') ? read('obs-box') : null,
          what_changed_shown: on('change-block'),
          what_changed: [...document.querySelectorAll('#change-block .change-row')].map(row => ({
            tag: row.querySelector('.change-tag').textContent.trim(),
            words: row.querySelector('.change-words').textContent
          })),
          next_question_line: on('pace-line') ? read('pace-line') : null,
          main_button: on('p1-btn') ? read('p1-btn') : null,
          come_back_shown: on('rw-park-btn'),
          asked_waiting_shown: on('rw-flight-btn'),
          answer_field_shown: on('ans'),
          answer_field_value: document.getElementById('ans')?.value ?? null,
          failed_message: on('send-failed') ? read('send-failed') : null,
          follow_up: on('swirl-panel') ? {
            question: read('swirl-q'),
            field_shown: on('swirl-ans'),
            continue_button: read('swirl-btn'),
            back_link: on('swirl-back') ? read('swirl-back') : null
          } : null,
          errand: on('inline-errand') ? {
            tag: within(errand, '.brief-addressing'),
            who: within(errand, '.brief-setup'),
            question: within(errand, '.brief-q-text'),
            copy_button: !!errand.querySelector('.brief-copy-btn')
          } : null,
          fold: on('answer-fold') ? read('fold-title') : null
        };
      });

      // Every part the brief says is gone. The whole page: hidden parts and the app's own script included.
      const goneCheck = async when => {
        const found = await page.evaluate(() => {
          const body = document.body.innerText;
          return {
            winemaster_anywhere_in_page: /winemaster/i.test(document.documentElement.outerHTML),
            circle_parts: document.querySelectorAll('.wm-circle, .wm-avatar, .wm-label, .m0-seal').length,
            progress_bars_on_question_screen: document.querySelectorAll('.prog-bar, .prog-fill, #prog, #m-count').length,
            element_count_on_screen: /element\s+\d+\s+of\s+\d+/i.test(body),
            spark_and_person_box: document.querySelectorAll('#spark-reminder').length,
            curved_line: document.querySelectorAll('#element-thread').length
          };
        });
        s.gone_checks.push({ when, ...found });
      };

      const labelNow = () => page.evaluate(() => ({
        rows: [...document.querySelectorAll('#el-list .el-row')].map(row => ({
          id: row.id.replace('elr-', ''),
          name: row.querySelector('.el-name').textContent.trim().replace(/\s+/g, ' '),
          state_word: row.querySelector('.el-state').textContent.trim(),
          marker: row.querySelector('.el-mark').className.replace('el-mark', '').trim(),
          is_button: row.tagName === 'BUTTON',
          chevron: !!row.querySelector('svg'),
          raised: row.classList.contains('is-raised')
        })),
        bottle: {
          line_elements: document.querySelectorAll('#bottle-wrap svg line').length,
          layers: [...document.querySelectorAll('#bottle-wrap svg rect[data-el]')].map(r => `${r.dataset.el} ${r.getAttribute('fill')}`)
        }
      }));

      // Whether the question and the top of its field are in view, with no scrolling, at this size.
      const fitAt390x500 = async (when, questionId, fieldId, shot) => {
        await page.setViewportSize({ width: 390, height: 500 });
        await page.waitForTimeout(200);
        s.fit_390x500[when] = await page.evaluate(({ questionId, fieldId }) => {
          const q = document.getElementById(questionId).getBoundingClientRect();
          const f = document.getElementById(fieldId).getBoundingClientRect();
          return {
            scroll_y: window.scrollY,
            viewport_height: window.innerHeight,
            question_top: Math.round(q.top),
            question_bottom: Math.round(q.bottom),
            field_top: Math.round(f.top),
            field_bottom: Math.round(f.bottom)
          };
        }, { questionId, fieldId });
        await page.setViewportSize(desktop);
        await shoot(shot, ['390x500']);
      };

      // The label on a phone: "View label" opens it, and the unfinished elements have their buttons.
      const phoneLabel = async name => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(200);
        const buttons = await page.locator('#ph-btns button').allTextContents();
        await page.locator('.ph-view').click();
        await page.waitForTimeout(200);
        await page.screenshot({ path: join(dir, `${name}-390x844.png`) });
        s.shots.push({ screen: name, files: [`${name}-390x844.png`] });
        await page.locator('#sb-close').click();
        await page.setViewportSize(desktop);
        return buttons;
      };

      // Each clearing and turbid row is clicked: what opens, then back.
      const openRows = async (rows, shotFirst) => {
        const out = {};
        let shot = false;
        for (const row of rows.filter(r => r.state_word === 'clearing' || r.state_word === 'turbid')) {
          await page.locator(`#elr-${row.id}`).click();
          out[row.id] = {
            state: row.state_word,
            was_button: row.is_button,
            review_shown: await page.locator('#review-panel').isVisible(),
            reopen_shown: await page.locator('#rv-reopen').isVisible(),
            reopen_label: await app.text('#rv-reopen-mech'),
            reopen_question: await app.text('#rv-reopen-q')
          };
          if (!shot && shotFirst) { await shoot(shotFirst); shot = true; }
          await page.locator('.review-back').click();
          await page.locator('#question-panel').waitFor({ state: 'visible', timeout: STEP_TIMEOUT });
        }
        return out;
      };

      const bottleOf = name => page.evaluate(({ key, name }) =>
        JSON.parse(localStorage.getItem(key) || '[]').find(b => b.s?.grape_name === name) || null, { key: CELLAR_KEY, name });
      const logCount = (bottle, mech, answer) => (bottle?.s?.log || [])
        .filter(e => e.type === 'answer' && e.mech === mech && e.answer === answer).length;
      const card = id => page.locator(`[data-bottle-id="${id}"]`);
      const openCard = async id => {
        await card(id).locator('.bottle-card-line').click();
        await page.waitForFunction(() => !document.querySelector('#screen-cellar.active'), undefined, { timeout: STEP_TIMEOUT });
      };
      const backToCellar = async () => {
        if (await app.visible('#swirl-panel')) await page.locator('#swirl-back').click();
        else if (await app.visible('#p1-btn') && (await app.text('#p1-btn')) === 'Back to the cellar') await page.locator('#p1-btn').click();
        else await page.locator('.sb-back').first().click();
        await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      };
      const waitForAnswerToLand = () => page.waitForFunction(() => {
        const failed = document.getElementById('send-failed');
        const ans = document.getElementById('ans');
        const btn = document.getElementById('p1-btn');
        return failed.style.display === 'flex' || (ans.hasAttribute('readonly') && !btn.disabled);
      }, undefined, { timeout: STEP_TIMEOUT, polling: 100 });

      // The steps a person takes to the first question. Same intake for both bottles.
      const intake = async (bottle, { fromCellar, shots }) => {
        const typed = await app.typeSpark(LOOK.spark, { fromCellar });
        if (typed.field_value !== LOOK.spark) throw new Error('The spark did not reach the field.');
        if (shots) await shoot('02-spark');
        await app.openGate();
        if (shots) await shoot('03-gate');
        await app.passGate();
        if (shots) await shoot('04-maturity-first');
        await app.pickOption('Yes.');
        if (shots) await shoot('05-maturity-second');
        await app.pickOption('Yes, I can name them and I know the moment.');
        await app.intakeContinue();
        if (shots) await shoot('06-person-step');
        await app.enterGrape(bottle.name, bottle.rel);
        await app.waitForPhase1();
        if (shots) { await goneCheck('grape recap'); await shoot('07-grape-recap'); }
        await page.locator('#p1-btn').click();
        await page.locator('#rhythm-panel.is-visible').waitFor({ timeout: STEP_TIMEOUT });
        await page.locator('#rhythm-panel .rhythm-choice', { hasText: new RegExp(`^${LOOK.pace}$`) }).click();
        await page.locator('#rhythm-panel .rhythm-choice', { hasText: new RegExp(`^${LOOK.timing}$`) }).click();
        if (shots) await shoot('08-rhythm-picker');
        await page.locator('#p1-btn:not([disabled])').click();
        app.step('set the rhythm', { note: `${LOOK.pace}, ${LOOK.timing}` });
      };

      await app.open();
      // The opening lines: typed on the first visit, the button there from the start, nothing moving under them.
      const landingNow = () => page.evaluate(() => {
        const button = document.getElementById('bottle-cta');
        return {
          typing: !!document.querySelector('#screen-landing .typed-rest'),
          button_shown: button.offsetParent !== null,
          button_top: Math.round(button.getBoundingClientRect().top)
        };
      });
      s.typing.landing_on_first_open = await landingNow();
      await goneCheck('landing');
      await shoot('01-landing');
      s.typing.landing_when_typed = await landingNow();
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.locator('#screen-landing.active').waitFor({ timeout: STEP_TIMEOUT });
      s.typing.landing_after_a_reload = await landingNow();
      app.step('reloaded the landing');

      // ── BOTTLE A ──
      const A = LOOK.A;
      const a = s.A;
      await intake(A, { fromCellar: false, shots: true });
      await goneCheck('after intake');
      const m2a = await app.waitForM2();
      a.m2_stage = m2a.stage;
      if (m2a.stage === 'scene') throw new Error('M2 asked for the scene. The scenario has no scene answer.');
      a.m2_question_screen = await screenNow();
      await goneCheck('Bottle A, M2 question');
      await shoot('09-a-m2-question');
      await fitAt390x500('Bottle A, M2 question', 'm-q', 'ans', '09-a-m2-question');

      await page.locator('#ans').fill(A.M2);
      await page.locator('#p1-btn').click();
      await waitForAnswerToLand();
      a.after_m2 = await screenNow();
      a.after_m2_bottle = checkpoint(await bottleOf(A.name));
      a.after_m2_label = await labelNow();
      await goneCheck('Bottle A, M2 reading');
      await shoot('10-a-m2-after-answer');

      await backToCellar();
      await shoot('11-cellar-one-bottle');
      const idA = (await bottleOf(A.name)).id;
      await page.waitForFunction(({ key, id }) => {
        const b = JSON.parse(localStorage.getItem(key) || '[]').find(x => x.id === id);
        return !b?.s?.questionOpensAt || new Date(b.s.questionOpensAt).getTime() <= Date.now();
      }, { key: CELLAR_KEY, id: idA }, { timeout: HOLD_TIMEOUT, polling: 1000 });
      await page.waitForTimeout(1000);
      app.step('the hold is over');
      await openCard(idA);
      await page.locator('#screen-phase1.active').waitFor({ timeout: STEP_TIMEOUT });
      a.m2_return_visit = {
        still_typing_on_arrival: await page.evaluate(() => !!document.querySelector('.typed-rest')),
        stalled_note: await app.visible('#stalled-panel')
      };
      if (a.m2_return_visit.stalled_note) await page.getByRole('button', { name: 'Open the question →' }).click();
      a.m2_return_visit.screen = await screenNow();
      await app.continueToNext('Third-Party Workarounds');

      // M3, first with the worker call blocked once.
      a.m3_question_screen = await screenNow();
      await goneCheck('Bottle A, M3 question');
      await shoot('12-a-m3-question');
      await fitAt390x500('Bottle A, M3 question', 'm-q', 'ans', '12-a-m3-question');
      const beforeBlock = await bottleOf(A.name);
      let blocked = 0;
      const blockOnce = route => {
        if (route.request().method() === 'POST' && !blocked) { blocked++; return route.abort('failed'); }
        return route.continue();
      };
      await page.route('**/m3', blockOnce);
      await page.locator('#ans').fill(A.M3);
      await page.locator('#p1-btn').click();
      await waitForAnswerToLand();
      const afterBlock = await bottleOf(A.name);
      a.blocked = {
        blocked_calls: blocked,
        screen: await screenNow(),
        log_entries_for_this_answer: logCount(afterBlock, 'M3', A.M3),
        elements_before: beforeBlock.s.elements,
        elements_after: afterBlock.s.elements,
        answers_m3_on_bottle: afterBlock.s.answers?.M3 ?? null,
        draft_on_bottle: afterBlock.s.drafts?.M3 ?? null,
        label: await labelNow()
      };
      await shoot('13-a-m3-failed-send');
      await page.unroute('**/m3', blockOnce);

      // Back to the cellar, open Bottle A again, and send the same answer.
      await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      await openCard(idA);
      await page.locator('#screen-phase1.active').waitFor({ timeout: STEP_TIMEOUT });
      const reopened = await bottleOf(A.name);
      a.reopened = {
        still_typing_on_arrival: await page.evaluate(() => !!document.querySelector('.typed-rest')),
        stalled_note: await app.visible('#stalled-panel')
      };
      if (a.reopened.stalled_note) await page.getByRole('button', { name: 'Open the question →' }).click();
      a.reopened.screen = await screenNow();
      a.reopened.log_entries_for_this_answer = logCount(reopened, 'M3', A.M3);
      await shoot('14-a-m3-reopened-with-draft');
      await page.locator('#p1-btn').click();
      await waitForAnswerToLand();
      const afterRetry = await bottleOf(A.name);
      a.after_retry = {
        screen: await screenNow(),
        log_entries_for_this_answer: logCount(afterRetry, 'M3', A.M3),
        log_entries_for_m3: (afterRetry.s.log || []).filter(e => e.type === 'answer' && e.mech === 'M3')
          .map(e => ({ kind: e.kind, answer: e.answer, moved: e.moved })),
        echo: afterRetry.s.elements.echo,
        stored_brief: afterRetry.s.m3_pending_brief ?? null,
        draft_left: afterRetry.s.drafts?.M3 ?? null,
        failed_flag_left: !!afterRetry.s.failedSends?.M3
      };
      await goneCheck('Bottle A, M3 reading');
      await shoot('15-a-m3-after-answer');

      // A follow-up, if one opened, gets an answer that still names nobody besides the grape.
      if (a.after_retry.screen.follow_up) {
        await fitAt390x500('Bottle A, M3 follow-up', 'swirl-q', 'swirl-ans', '15-a-m3-after-answer');
        await page.locator('#swirl-ans').fill(A.M3_follow_up);
        await page.locator('#swirl-btn').click();
        await page.waitForFunction(() => {
          const failed = document.getElementById('swirl-failed');
          const panel = document.getElementById('swirl-panel');
          const btn = document.getElementById('swirl-btn');
          return failed.style.display === 'flex' || (panel.style.display === 'none' && !btn.disabled);
        }, undefined, { timeout: STEP_TIMEOUT, polling: 100 });
        app.step('answered the follow-up at M3');
        await goneCheck('Bottle A, M3 after the follow-up');
        await shoot('15b-a-m3-after-follow-up');
      }
      const afterM3 = await bottleOf(A.name);
      a.after_m3 = {
        screen: await screenNow(),
        echo: afterM3.s.elements.echo,
        stored_brief: afterM3.s.m3_pending_brief ?? null,
        log_entries_for_the_first_answer: logCount(afterM3, 'M3', A.M3),
        log_entries_for_m3: (afterM3.s.log || []).filter(e => e.type === 'answer' && e.mech === 'M3')
          .map(e => ({ kind: e.kind, answer: e.answer, moved: e.moved }))
      };

      // Copy question, when the errand card is up.
      if (await page.locator('#inline-errand .brief-copy-btn').count()) {
        await page.locator('#inline-errand .brief-copy-btn').click();
        a.after_m3.copied = await page.evaluate(() => navigator.clipboard.readText()).catch(err => `could not read the clipboard: ${err.message}`);
        app.step('copied the question');
      }

      a.label_after_m3 = await labelNow();
      a.rows_opened = await openRows(a.label_after_m3.rows, '16-a-row-opens-reopen');
      a.phone_buttons = await phoneLabel('17-a-label-phone');
      a.after_rows_view = await screenNow();

      // ── BOTTLE B ──
      const B = LOOK.B;
      const b = s.B;
      await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      await intake(B, { fromCellar: true, shots: false });
      const m2b = await app.waitForM2();
      b.m2_stage = m2b.stage;
      if (m2b.stage === 'scene') throw new Error('M2 asked for the scene. The scenario has no scene answer.');
      b.m2_question_screen = await screenNow();
      await goneCheck('Bottle B, M2 question');
      await shoot('18-b-m2-question');
      await fitAt390x500('Bottle B, M2 question', 'm-q', 'ans', '18-b-m2-question');

      await page.locator('#ans').fill(B.M2);
      await page.locator('#p1-btn').click();
      await waitForAnswerToLand();

      // How the new line types out, while it does.
      const restOfLine = () => page.evaluate(() => {
        const rest = document.querySelector('.typed-rest');
        return rest ? { where: rest.closest('[id]')?.id || null, left: rest.textContent.length } : null;
      });
      const first = await restOfLine();
      await page.waitForTimeout(500);
      const second = await restOfLine();
      s.typing.after_bottle_b_answer = {
        line_still_typing: first,
        half_a_second_later: second,
        characters_per_second: first && second && first.where === second.where ? (first.left - second.left) * 2 : null
      };
      if (second) {
        await page.mouse.click(600, 880);
        await page.waitForTimeout(50);
        s.typing.after_a_click = { still_typing: await page.evaluate(() => !!document.querySelector('.typed-rest')) };
      }

      b.after_m2 = await screenNow();
      b.after_m2_bottle = checkpoint(await bottleOf(B.name));
      b.follow_up_position = await page.evaluate(() => {
        const top = id => { const el = document.getElementById(id); return el && el.offsetParent !== null ? Math.round(el.getBoundingClientRect().top) : null; };
        return { observation: top('obs-box'), follow_up: top('swirl-panel'), what_changed: top('change-block'), errand: top('inline-errand'), fold: top('answer-fold') };
      });
      await goneCheck('Bottle B, M2 reading');
      await shoot('19-b-m2-after-answer');
      if (b.after_m2.follow_up) await fitAt390x500('Bottle B, follow-up', 'swirl-q', 'swirl-ans', '19-b-m2-after-answer');

      b.label = await labelNow();
      b.rows_opened = await openRows(b.label.rows, '20-b-row-opens-reopen');
      b.phone_buttons = await phoneLabel('21-b-label-phone');
      b.after_rows_view = await screenNow();

      // The export the scenario asks for.
      const firstExport = join(dir, `run-${rec.run}-cellar.json`);
      await app.exportCellar(firstExport);
      rec.exported = true;
      rec.cellars = { first: JSON.parse(await readFile(firstExport, 'utf8')) };

      // What each cellar card shows, the way the page draws it.
      const cardsNow = () => page.evaluate(() => ({
        archived_heading: document.getElementById('cellar-archived').offsetParent !== null
          ? document.querySelector('.cellar-archived-title').textContent.trim() : null,
        export_line_is_last: document.querySelector('.cellar-page').lastElementChild.classList.contains('cellar-export-row'),
        cards: [...document.querySelectorAll('.bottle-card')].map(card => {
          const css = getComputedStyle(card);
          const status = card.querySelector('.bottle-card-status');
          return {
            group: card.closest('#cellar-archived') ? 'archived' : 'rack',
            status: status.textContent.trim(),
            status_colour: getComputedStyle(status).color,
            date: card.querySelector('.bottle-card-date').textContent.trim(),
            border: css.borderTopColor,
            shadow: css.boxShadow,
            background: css.backgroundColor,
            opacity: css.opacity,
            spark_colour: getComputedStyle(card.querySelector('.bottle-card-line')).color,
            bottle_transform: getComputedStyle(card.querySelector('.bottle-card-bottle svg')).transform,
            archive_links: card.querySelectorAll('.bottle-card-archive').length,
            dots: card.querySelectorAll('.bottle-card-dot').length
          };
        })
      }));
      s.extras.cellar_two_bottles = await cardsNow();
      await shoot('22-cellar-two-bottles');

      // ── SCREENS THE PACK DOESN'T DRAW, AFTER THE EXPORT ──
      // Reached by clicks, on the bottles the run made. What they do here isn't in the export above.
      const x = s.extras;
      const idB = (await bottleOf(B.name)).id;
      x.confirms = [];
      page.on('dialog', dialog => {
        x.confirms.push(dialog.message());
        dialog.accept();
      });

      await openCard(idA);
      await page.locator('#screen-phase1.active').waitFor({ timeout: STEP_TIMEOUT });
      if (await app.visible('#stalled-panel')) await page.getByRole('button', { name: 'Open the question →' }).click();
      if (await app.visible('#rw-park-btn')) {
        await page.locator('#rw-park-btn').click();
        await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
        x.parked_card = (await card(idA).locator('.bottle-card-status').textContent()).trim();
        x.cellar_parked = await cardsNow();
        await shoot('23-cellar-parked');
        await openCard(idA);
        await page.locator('#dormant-panel').waitFor({ state: 'visible', timeout: STEP_TIMEOUT });
        x.dormant_panel = (await page.locator('#dormant-panel-body').innerText()).trim();
        await shoot('24-dormant-parked');
        await page.locator('.sb-back').first().click();
        await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      } else {
        x.parked_card = 'Bottle A shows no "Come back to this", so this wasn\'t reached.';
      }

      // A bottle behind pace with a turbid element shows the stalled note.
      const bottleB = await bottleOf(B.name);
      if (Object.values(bottleB.s.elements).includes('turbid') && bottleB.s.questionOpensAt) {
        await page.waitForFunction(at => Date.now() >= at, new Date(bottleB.s.questionOpensAt).getTime() + 32000,
          { timeout: HOLD_TIMEOUT + 60000, polling: 1000 });
        await openCard(idB);
        await page.locator('#screen-phase1.active').waitFor({ timeout: STEP_TIMEOUT });
        x.stalled_shown = await app.visible('#stalled-panel');
        if (x.stalled_shown) {
          x.stalled_panel = (await page.locator('#stalled-panel-body').innerText()).trim();
          await shoot('25-stalled');
        }
        await page.locator('.sb-back').first().click();
        await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
        // Back in the cellar the card is redrawn: a question ready, and the bottle leaning if it's behind pace.
        x.cellar_question_ready = await cardsNow();
        await shoot('26-cellar-question-ready');
      } else {
        x.stalled_shown = 'Bottle B has no turbid element, so the stalled note wasn\'t reached.';
      }

      // "Archive" on the card asks once. An archived bottle sits in its own group and opens on the label screen.
      await card(idB).locator('.bottle-card-archive').click();
      await page.waitForTimeout(200);
      x.archived_card = (await card(idB).locator('.bottle-card-status').textContent()).trim();
      x.archive_button_left_on_that_card = await card(idB).locator('.bottle-card-archive').count();
      x.archive_button_in_sidebar = await page.locator('#sb-archive-btn').count();
      x.cellar_archived = await cardsNow();
      await shoot('27-cellar-archived');
      await openCard(idB);
      await page.locator('#screen-label.active').waitFor({ timeout: STEP_TIMEOUT });
      await shoot('28-label-screen');
      x.label_screen = await page.evaluate(() => [...document.querySelectorAll('#vc .vc-field')].map(f => ({
        name: f.querySelector('.vc-field-name').textContent.trim().replace(/\s+/g, ' '),
        state_word: f.querySelector('.el-state').textContent.trim(),
        is_button: f.tagName === 'BUTTON'
      })));
      await app.labelBackToCellar();
      await app.exportCellar(join(dir, `run-${rec.run}-cellar-after-extras.json`));

      // The × stays as it works now. With both bottles gone, the empty cellar.
      for (const id of [idA, idB]) {
        await card(id).hover();
        await card(id).locator('.bottle-card-del').click();
        await card(id).waitFor({ state: 'detached', timeout: STEP_TIMEOUT });
      }
      x.empty_cellar = (await page.locator('#cellar-list').innerText()).trim();
      await shoot('29-cellar-empty');
      app.step('done');
    },

    report(rec) {
      const s = rec.screens || {};
      const a = s.A || {};
      const b = s.B || {};
      const out = [];
      const notReached = 'Not reached.';
      const say = v => v === null || v === undefined ? 'none' : `"${v}"`;

      // 1
      const checks = s.gone_checks || [];
      const hits = checks.flatMap(c => Object.entries(c).filter(([k, v]) => k !== 'when' && v).map(([k, v]) => `${c.when}: ${k} = ${v}`));
      const labels = [
        ['Bottle A M2', a.m2_question_screen], ['Bottle A M3', a.m3_question_screen], ['Bottle B M2', b.m2_question_screen]
      ].filter(([, screen]) => screen).map(([where, screen]) => `${where}: label "${screen.mechanism_label}", phone top bar "${screen.phone_mechanism_label}"`);
      out.push(`Checked the whole page at ${checks.length} points (${checks.map(c => c.when).join(', ')}). Found: ${hits.length ? hits.join('; ') : 'nothing'}. ${labels.join('. ')}.`);

      // 2
      const m2Moves = (a.after_m2_bottle?.log || []).filter(e => e.type === 'answer' && e.mech === 'M2').flatMap(e => e.moved || []);
      if (!a.after_m2) out.push(notReached);
      else if (!m2Moves.some(m => m.to === 'settled')) {
        out.push(`Nothing settled at Bottle A's M2 (moves: ${m2Moves.map(m => `${m.element} ${m.from}→${m.to}`).join(', ') || 'none'}). Not tested. Screen view: ${a.after_m2.view}.`);
      } else {
        const typed = LOOK.A.M2;
        const rows = a.after_m2.what_changed.map(r => `${r.tag}: "${r.words}" (character for character in the answer: ${typed.includes(r.words) ? 'yes' : 'no'})`);
        out.push([
          `Moves: ${m2Moves.map(m => `${m.element} ${m.from}→${m.to}`).join(', ')}. View: ${a.after_m2.view}.`,
          `Observation: ${say(a.after_m2.observation)}.`,
          `"What changed" shown: ${a.after_m2.what_changed_shown ? 'yes' : 'no'}. Rows: ${rows.join('; ') || 'none'}.`,
          `Next-question line: ${say(a.after_m2.next_question_line)}. Main button: ${say(a.after_m2.main_button)}.`,
          `"Come back to this" shown: ${a.after_m2.come_back_shown ? 'yes' : 'no'}. "Asked, waiting on a reply" shown: ${a.after_m2.asked_waiting_shown ? 'yes' : 'no'}.`,
          a.after_m2.follow_up ? `A follow-up also opened: ${say(a.after_m2.follow_up.question)}.` : 'No follow-up.'
        ].join(' '));
      }

      // 3
      if (!a.blocked) out.push(notReached);
      else {
        const shown = a.blocked.screen;
        const back = a.reopened?.screen;
        out.push([
          `Calls blocked: ${a.blocked.blocked_calls}. Field shown: ${shown.answer_field_shown ? 'yes' : 'no'}. Field holds the answer: ${shown.answer_field_value === LOOK.A.M3 ? 'yes' : 'no'}.`,
          `Message: ${say(shown.failed_message)}. Same as the brief's line: ${shown.failed_message === LOOK.failed_line ? 'yes' : 'no'}. Main button: ${say(shown.main_button)}.`,
          `Park links shown: ${shown.come_back_shown && shown.asked_waiting_shown ? 'both' : 'not both'}.`,
          `On the bottle after the block: log entries for this answer ${a.blocked.log_entries_for_this_answer}, answers.M3 ${say(a.blocked.answers_m3_on_bottle)}, elements changed ${JSON.stringify(a.blocked.elements_before) === JSON.stringify(a.blocked.elements_after) ? 'no' : 'yes'}, draft is the answer ${a.blocked.draft_on_bottle === LOOK.A.M3 ? 'yes' : 'no'}.`,
          back ? `After leaving and reopening: field shown ${back.answer_field_shown ? 'yes' : 'no'}, holds the answer ${back.answer_field_value === LOOK.A.M3 ? 'yes' : 'no'}, message ${say(back.failed_message)}, main button ${say(back.main_button)}, a line typing on arrival ${a.reopened.still_typing_on_arrival ? 'yes' : 'no'}.` : 'Reopen not reached.',
          a.after_retry ? `After the retry: log entries holding this answer ${a.after_retry.log_entries_for_this_answer}. Draft left: ${say(a.after_retry.draft_left)}.` : 'Retry not reached.',
          a.after_m3 ? `At the end of M3: log entries holding this answer ${a.after_m3.log_entries_for_the_first_answer}. All M3 entries: ${JSON.stringify(a.after_m3.log_entries_for_m3.map(e => ({ kind: e.kind, answer: e.answer, moved: e.moved.map(m => `${m.element} ${m.from}→${m.to}`) })))}.` : ''
        ].filter(Boolean).join(' '));
      }

      // 4
      const r = a.after_m3;
      const asked = a.after_retry?.screen?.follow_up;
      if (!r) out.push(notReached);
      else if (r.echo === 'settled') out.push(`The Echo settled at M3. Not tested. Follow-up at M3: ${asked ? say(asked.question) : 'none'}. View: ${r.screen.view}.`);
      else {
        const e = r.screen.errand;
        const q = e?.question ?? null;
        out.push([
          `Follow-up at M3: ${asked ? `${say(asked.question)}, answered "${LOOK.A.M3_follow_up}"` : 'none'}.`,
          `Echo: ${r.echo}. View: ${r.screen.view}.`,
          r.screen.follow_up ? `A follow-up is still open: ${say(r.screen.follow_up.question)}.` : '',
          `Observation: ${say(r.screen.observation)}.`,
          e ? `Errand card shown. Tag: ${say(e.tag)}. Who: ${say(e.who)}. Question: ${say(q)}.` : 'No errand card shown.',
          `Clipboard after "Copy question": ${say(r.copied)}. Same as the question on the card: ${r.copied === q ? 'yes' : 'no'}. Holds the who line: ${r.copied && e?.who && r.copied.includes(e.who) ? 'yes' : 'no'}.`,
          `"Come back to this" shown: ${r.screen.come_back_shown ? 'yes' : 'no'}. "Asked, waiting on a reply" shown: ${r.screen.asked_waiting_shown ? 'yes' : 'no'}.`,
          `"What changed" shown: ${r.screen.what_changed_shown ? 'yes' : 'no'}.`,
          `The stored brief: ${JSON.stringify(r.stored_brief)}.`
        ].filter(Boolean).join(' '));
      }

      // 5
      if (!b.after_m2) out.push(notReached);
      else if (!b.after_m2.follow_up) {
        const moves = (b.after_m2_bottle?.log || []).filter(e => e.type === 'answer' && e.mech === 'M2').flatMap(e => e.moved || []);
        out.push(`No follow-up appeared. Not tested. View: ${b.after_m2.view}. Moves: ${moves.map(m => `${m.element} ${m.from}→${m.to}`).join(', ') || 'none'}.`);
      } else {
        const f = b.after_m2.follow_up;
        const p = b.follow_up_position;
        out.push([
          `View: ${b.after_m2.view}. Observation: ${say(b.after_m2.observation)}.`,
          `Follow-up: ${say(f.question)}. Field shown: ${f.field_shown ? 'yes' : 'no'}. Button: ${say(f.continue_button)}. Quiet link: ${say(f.back_link)}.`,
          `Top of each part on the page, in pixels: observation ${p.observation}, follow-up ${p.follow_up}, What changed ${p.what_changed ?? 'not shown'}, errand ${p.errand ?? 'not shown'}, fold ${p.fold ?? 'not shown'}.`,
          `Park buttons shown: ${b.after_m2.come_back_shown || b.after_m2.asked_waiting_shown ? 'yes' : 'no'}. Fold title: ${say(b.after_m2.fold)}.`
        ].join(' '));
      }

      // 6
      const labelLine = (name, label, opened) => !label ? `${name}: not reached.` : [
        `${name} rows: ${label.rows.map(x => `${x.name} [${x.state_word}, ${x.marker}${x.is_button ? ', button' : ''}${x.chevron ? ', chevron' : ''}${x.raised ? ', raised' : ''}]`).join('; ')}.`,
        `Rows clicked: ${Object.entries(opened || {}).map(([k, v]) => `${k} (${v.state}): reopen shown ${v.reopen_shown ? 'yes' : 'no'}, "${v.reopen_label}", question "${v.reopen_question}"`).join('; ') || 'no clearing or turbid row'}.`,
        `Bottle: ${label.bottle.line_elements} line elements. Layers: ${label.bottle.layers.join(', ')}.`
      ].join(' ');
      out.push([
        labelLine('Bottle A after M3', a.label_after_m3, a.rows_opened),
        labelLine('Bottle B after M2', b.label, b.rows_opened),
        `Phone buttons: Bottle A ${JSON.stringify(a.phone_buttons || [])}, Bottle B ${JSON.stringify(b.phone_buttons || [])}.`,
        a.after_m2_label ? `On Bottle A's M2 reading, rows raised: ${a.after_m2_label.rows.filter(x => x.raised).map(x => x.name).join(', ') || 'none'}.` : '',
        s.extras?.label_screen ? `Label screen: ${s.extras.label_screen.map(x => `${x.name} [${x.state_word}${x.is_button ? ', button' : ''}]`).join('; ')}.` : ''
      ].filter(Boolean).join(' '));

      // 7
      const fits = Object.entries(s.fit_390x500 || {});
      out.push(fits.length ? fits.map(([when, f]) =>
        `${when}: scrolled ${f.scroll_y}px; question ${f.question_top} to ${f.question_bottom}; field top ${f.field_top}; screen ends at ${f.viewport_height}. Question all in view: ${f.question_top >= 0 && f.question_bottom <= f.viewport_height ? 'yes' : 'no'}. Top of the field in view: ${f.field_top < f.viewport_height ? `yes, ${f.viewport_height - f.field_top}px of it` : 'no'}.`
      ).join(' ') : notReached);

      if (rec.broke_off) out[out.length - 1] += ` Broke off: ${rec.broke_off}`;
      out[out.length - 1] += ` Page errors: ${rec.page_errors.length ? rec.page_errors.join('; ') : 'none'}.`;
      return out;
    }
  },

  'first-minute': {
    title: 'First minute',
    expected: [
      '"Before the cellar" and "The cellar is making champagne" appear nowhere, and intake goes from its last step straight to Phase 1.',
      'One click on the spark field puts the typed text in it.',
      'The gate question shows right after the spark, before the maturity question.',
      'Bottle 1 reaches M2\'s first question as before, and its person step says "You\'re the person with this problem." "You are the grape" appears nowhere.',
      'Bottle 2 shows the turn-away line, makes no /m0 request, and leaves no new bottle in the cellar.'
    ],

    async play(app, rec) {
      const page = app.page;
      const s = rec.screens = { looks: [], screens_in_order: [], bottle_1: {}, bottle_2: {} };
      const requests = rec.worker_requests = [];
      page.on('request', r => {
        if (r.url().startsWith(WORKER_URL) && r.method() === 'POST') {
          requests.push({ at: new Date().toISOString(), path: new URL(r.url()).pathname });
        }
      });
      const m0Calls = list => list.filter(r => r.path === '/m0').length;

      // A server left on the port would serve another copy of the app.
      const served = await fetch(APP_URL.split('?')[0], { cache: 'no-store' }).then(r => r.text());
      if (served !== await readFile(join(REPO, 'corked_v6.html'), 'utf8')) {
        throw new Error('The page on port 8080 is not this checkout\'s app. Close Start Corked and run again.');
      }

      // Notes every screen the app lands on, in order, so a screen shown for a moment still counts.
      await page.addInitScript(() => {
        window.__screens = [];
        const note = () => {
          const id = document.querySelector('.screen.active')?.id;
          if (id && window.__screens[window.__screens.length - 1] !== id) window.__screens.push(id);
        };
        const start = () => {
          note();
          new MutationObserver(note).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
        };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
        else start();
      });

      // The whole page each time, hidden parts and the app's own script included.
      const look = async when => {
        const seen = await page.evaluate(words => {
          const page = document.documentElement.outerHTML.toLowerCase();
          return { words: words.filter(w => page.includes(w.toLowerCase())), screens: window.__screens };
        }, FIRST_MINUTE.gone);
        s.looks.push({ when, words_seen: seen.words });
        s.screens_in_order = seen.screens;
      };
      const cellarNow = () => page.evaluate(key => ({
        stored: JSON.parse(localStorage.getItem(key) || '[]').map(b => ({ id: b.id, idea: b.s?.idea ?? null })),
        cards: document.querySelectorAll('.bottle-card').length,
        count_line: document.getElementById('cellar-count')?.textContent || null
      }), CELLAR_KEY);
      const gateState = async () => ({
        maturity_options_on_screen: await page.locator('#intake-body .options').count(),
        m0_requests_so_far: m0Calls(requests)
      });

      await app.open();
      await look('landing');

      // Bottle 1.
      const b1 = FIRST_MINUTE.bottle_1;
      const one = s.bottle_1;
      app.spark = b1.spark;
      one.typed = await app.typeSpark(b1.spark);
      await look('bottle 1: spark typed');
      if (one.typed.field_value !== b1.spark) throw new Error('The spark did not reach the field.');
      one.gate = await app.openGate();
      Object.assign(one.gate, await gateState());
      await look('bottle 1: gate');
      one.after_gate = await app.passGate();
      await look('bottle 1: maturity question');
      await app.pickOption('No.');
      await app.pickOption('Yes. This comes from my own experience.');
      await app.intakeContinue();
      one.person_step = { question: await app.text('#intake-body .step-q'), note: await app.text('#intake-body .step-note') };
      await look('bottle 1: person step');
      await app.enterGrape(b1.name, b1.rel);
      await app.waitForPhase1();
      await look('bottle 1: Phase 1');
      await app.setRhythm(b1.pace, b1.timing);
      one.rhythm = app.rhythmShown;
      const m2 = await app.waitForM2();
      one.m2 = {
        stage: m2.stage,
        problem_shown: m2.problemShown,
        wording_taken: rec.steps.some(st => st.step === 'took the wording'),
        label: await app.text('#m-label'),
        question: await app.text('#m-q')
      };
      await look('bottle 1: M2 question');

      // Bottle 2.
      const b2 = FIRST_MINUTE.bottle_2;
      const two = s.bottle_2;
      await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      two.cellar_before = await cellarNow();
      const mark = requests.length;
      const m0Before = m0Calls(requests);
      app.spark = null;
      two.typed = await app.typeSpark(b2.spark, { fromCellar: true });
      await look('bottle 2: spark typed');
      if (two.typed.field_value !== b2.spark) throw new Error('The spark did not reach the field.');
      two.gate = await app.openGate();
      Object.assign(two.gate, await gateState(), { m0_requests_before_this_spark: m0Before });
      await look('bottle 2: gate');
      await page.locator('#spark-gate button', { hasText: 'Something to make for its own sake' }).click();
      await page.locator('#spark-turned-away').waitFor({ state: 'visible', timeout: STEP_TIMEOUT });
      await page.waitForTimeout(3000);   // room for a late worker call to show up
      two.turned_away = {
        line: await app.text('#spark-turned-away .m0-stamp-line'),
        buttons: await page.locator('#intake-body button:visible').allTextContents(),
        whole_screen: (await page.locator('#intake-body').innerText()).trim()
      };
      app.step('turned away', { note: two.turned_away.line });
      await look('bottle 2: turn-away');
      await page.locator('#intake-body button', { hasText: 'Back to the cellar' }).click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      app.step('back in the cellar');
      two.cellar_after = await cellarNow();
      await look('cellar after the turn-away');
      two.worker_requests = requests.slice(mark).map(r => r.path);
    },

    report(rec) {
      const s = rec.screens || {};
      const one = s.bottle_1 || {};
      const two = s.bottle_2 || {};
      const exported = rec.cellars?.first ? JSON.stringify(rec.cellars.first) : null;
      const wordsSeen = word => (s.looks || []).filter(l => l.words_seen.includes(word)).map(l => l.when);
      const inExport = word => exported === null ? 'no export to read' : (exported.toLowerCase().includes(word.toLowerCase()) ? 'yes' : 'no');
      const seenLine = word => `"${word}": page checked at ${(s.looks || []).length} points, found at ${wordsSeen(word).join(', ') || 'none'}; in the export: ${inExport(word)}.`;
      const typedLine = (name, t, spark) => !t ? `${name}: not reached.`
        : `${name}: ${t.clicks_on_field} click, focus on ${t.focus_after_click}, field holds "${t.field_value}". Same as typed: ${t.field_value === spark ? 'yes' : 'no'}.`;
      const gateLine = (name, g) => !g ? `${name}: not reached.`
        : `${name}: "${g.question}" Buttons: ${g.buttons.map(b => `"${b}"`).join(', ')}. Maturity question on screen at that point: ${g.maturity_options_on_screen ? 'yes' : 'no'}.`;
      const out = [];

      out.push([
        seenLine(FIRST_MINUTE.gone[0]),
        seenLine(FIRST_MINUTE.gone[1]),
        `Screens in order: ${(s.screens_in_order || []).join(' > ') || 'none noted'}.`
      ].join(' '));

      out.push([
        typedLine('Bottle 1', one.typed, FIRST_MINUTE.bottle_1.spark),
        typedLine('Bottle 2', two.typed, FIRST_MINUTE.bottle_2.spark)
      ].join(' '));

      out.push([
        gateLine('Bottle 1', one.gate),
        one.gate ? `/m0 requests before the answer: ${one.gate.m0_requests_so_far}. After "A problem someone has" the screen asked: "${one.after_gate ?? 'not reached'}".` : '',
        gateLine('Bottle 2', two.gate)
      ].filter(Boolean).join(' '));

      out.push([
        one.m2 ? `M2's first question showed. Label: "${one.m2.label}". Question: "${one.m2.question}". Stage: ${one.m2.stage}. Wording shown for the problem: "${one.m2.problem_shown}". "That's the problem" clicked on the way: ${one.m2.wording_taken ? 'yes' : 'no'}.` : "M2's first question not reached.",
        one.person_step ? `Person step: "${one.person_step.question}" Note under it: "${one.person_step.note}".` : 'Person step not reached.',
        seenLine(FIRST_MINUTE.gone[2]),
        `Page errors: ${rec.page_errors.length ? rec.page_errors.join('; ') : 'none'}.`,
        rec.broke_off ? `Broke off: ${rec.broke_off}` : 'Broke off: no.'
      ].join(' '));

      if (!two.turned_away) out.push('Turn-away not reached.');
      else {
        const before = two.cellar_before;
        const after = two.cellar_after;
        const m0 = (two.worker_requests || []).filter(p => p === '/m0').length;
        out.push([
          `Screen showed: "${two.turned_away.whole_screen}". Buttons: ${two.turned_away.buttons.map(b => `"${b}"`).join(', ')}.`,
          `/m0 requests for this spark: ${m0}. All worker requests for this spark: ${(two.worker_requests || []).join(', ') || 'none'}.`,
          `Bottles stored before: ${before?.stored.length}, after: ${after?.stored.length}. Cards before: ${before?.cards}, after: ${after?.cards}. Count line after: "${after?.count_line}".`,
          `The spark in the export: ${inExport(FIRST_MINUTE.bottle_2.spark)}.`
        ].join(' '));
      }
      return out;
    }
  },

  'architecture-review': {
    title: 'Architecture review',
    expected: [
      '"Every other day" shows wherever pace appears. "Any other day" appears nowhere.',
      'In both bottles, every mechanism shows its question, takes the answer and shows a reading through to the end of the chain, with no error on screen. M4 may be skipped.',
      'In the export, each answer is recorded once, in the order given, and every line on the record appears character for character in something I typed.',
      "Bottle A's M5 comes back with the question it was parked on.",
      "After the blocked submit, the reopen question stays on screen, and the retry's history log entry has that question word for word as shown. If the Limit isn't amber, report that this run couldn't test it.",
      "Bottle A's export stores M6's source as their words from a real exchange.",
      'In Bottle B, every question and reading talks to me as "you", and nothing calls me "they" or by a name, M6\'s buttons included, before and after parking.',
      "Opening Bottle A changes neither the cellar order nor any card's date.",
      'Both exports hold the same bottles, answers, states and dates.'
    ],

    async play(app, rec) {
      const page = app.page;
      const blank = () => ({ screens: [], readings: {} });
      rec.screens = { A: blank(), B: blank(), old_pace_label_seen: [] };

      await app.open();
      // This scenario is for this branch's app. A server left on the port would serve another copy.
      const isThisBranch = await page.evaluate(() => typeof CellarClock === 'object' && typeof Cellar === 'object');
      if (!isThisBranch) throw new Error('The page on port 8080 is not this branch\'s app. Close Start Corked and run again.');

      await reviewPlayBottleA(app, rec);
      await reviewPlayBottleB(app, rec);

      // The cellar, then Bottle A opened and left.
      app.spark = REVIEW_BOTTLES.A.spark;
      rec.screens.cellar_before = await reviewLookAtCellar(app);
      await app.card().click();
      await page.waitForFunction(() => !document.querySelector('#screen-cellar.active'), undefined, { timeout: STEP_TIMEOUT });
      rec.screens.opened_on = await page.evaluate(() => document.querySelector('.screen.active')?.id);
      if (rec.screens.opened_on === 'screen-label') await app.labelBackToCellar();
      else await page.locator('.sb-back').first().click();
      await page.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
      rec.screens.cellar_after = await reviewLookAtCellar(app);

      // Export, import in a fresh profile, export again.
      const first = join(app.outDir, `run-${rec.run}-cellar.json`);
      const second = join(app.outDir, `run-${rec.run}-cellar-reimported.json`);
      await app.exportCellar(first);
      rec.exported = true;

      const fresh = await app.browser.newContext({ acceptDownloads: true, viewport: { width: 1400, height: 900 } });
      try {
        const freshPage = await fresh.newPage();
        freshPage.on('pageerror', err => rec.page_errors.push(`fresh profile: ${err && err.message || err}`));
        freshPage.on('dialog', dialog => dialog.accept());
        await freshPage.goto(APP_URL, { waitUntil: 'domcontentloaded' });
        await freshPage.locator('#screen-landing.active').waitFor({ timeout: STEP_TIMEOUT });
        rec.screens.import_button_on_empty_landing = await freshPage.getByRole('button', { name: 'Import cellar' }).isVisible();
        await Promise.all([
          freshPage.waitForEvent('load', { timeout: STEP_TIMEOUT }),
          freshPage.locator('#cellar-import-file').setInputFiles(first)
        ]);
        await freshPage.locator('#screen-cellar.active').waitFor({ timeout: STEP_TIMEOUT });
        const [download] = await Promise.all([
          freshPage.waitForEvent('download', { timeout: STEP_TIMEOUT }),
          freshPage.getByRole('button', { name: 'Export cellar' }).click()
        ]);
        await download.saveAs(second);
        app.step('imported in a fresh profile and exported again', { note: second });
      } finally {
        await fresh.close();
      }
      rec.cellars = {
        first: JSON.parse(await readFile(first, 'utf8')),
        second: JSON.parse(await readFile(second, 'utf8'))
      };
    },

    report(rec) {
      const s = rec.screens;
      const notReached = 'Not reached.';
      const first = rec.cellars?.first;
      const second = rec.cellars?.second;
      const out = [];

      // 1. The pace label
      out.push(s.A?.rhythm_picker ? [
        `Picker choices: ${s.A.rhythm_picker.choices.join(' | ')}.`,
        `Summary: "${s.A.rhythm_picker.summary}".`,
        `Sidebar: "${s.A.screens.map(x => x.copy['sb-rhythm']).filter(Boolean)[0] || ''}".`,
        `Label foot: "${s.A.label_foot || 'not reached'}".`,
        `"Any other day" in the page: ${s.old_pace_label_seen.length ? s.old_pace_label_seen.join('; ') : 'never, at any snapshot'}.`
      ].join(' ') : notReached);

      // 2. Through the chain
      const chain = key => {
        const b = s[key];
        if (!b) return `${key}: not reached.`;
        const mechs = Object.keys(REVIEW_BOTTLES[key].answers).filter(m => !(m === 'M4' && b.m4_skipped));
        const rows = mechs.map(m => {
          const r = b.readings[m];
          if (!r) return `${m} not reached`;
          return `${m} question ${r.question ? 'shown' : 'NOT shown'}, reading ${r.reading ? 'shown' : 'NOT shown'}${r.followUp ? ', follow-up left unanswered' : ''}`;
        });
        return `${key}: ${rows.join('; ')}${b.m4_skipped ? '; M4 skipped' : ''}; label ${b.label_foot ? 'reached' : 'NOT reached'}.`;
      };
      out.push(`${chain('A')} ${chain('B')} Broke off: ${rec.broke_off || 'no'}. Page errors: ${rec.page_errors.length ? rec.page_errors.join('; ') : 'none'}.`);

      // 3. The record
      if (!first) out.push(notReached);
      else {
        out.push(['A', 'B'].map(key => {
          const bottle = reviewBottleFromExport(first, key);
          if (!bottle) return `${key}: not in the export.`;
          const given = REVIEW_BOTTLES[key].answers;
          const entries = (bottle.s.log || []).filter(x => x.type === 'answer');
          const order = entries.map(x => `${x.mech} ${x.kind}`).join(', ');
          const wrongText = entries.filter(x => x.mech !== 'M1' && x.answer !== given[x.mech]).map(x => x.mech);
          const typed = reviewTyped(key);
          const missing = reviewRecordLines(bottle).filter(l => !typed.some(t => t.includes(l.text)));
          return `${key}: log order ${order}. Entries whose text differs from what was typed: ${wrongText.join(', ') || 'none'}. Lines on the record not found character for character in what was typed: ${missing.length ? missing.map(l => `${l.where}: "${l.text}"`).join('; ') : 'none'}.`;
        }).join(' '));
      }

      // 4. The parked question
      const p = s.A?.parked;
      out.push(p ? `Before parking: "${p.asked_before_parking}". When it came back: "${p.asked_when_back}". Same text: ${p.asked_before_parking === p.asked_when_back ? 'yes' : 'no'}. Card while parked: "${p.card}".` : notReached);

      // 5. The blocked submit
      const r = s.A?.reopen;
      if (!r) out.push(notReached);
      else if (!r.amber) out.push(`The Limit is ${r.limit_state}, not amber. This run couldn't test it.`);
      else {
        const bottle = reviewBottleFromExport(first, 'A');
        const retries = (bottle?.s.log || []).filter(x => x.type === 'answer' && x.mech === 'M7' && x.kind === 'reopen');
        out.push([
          `Question shown: "${r.question_shown}".`,
          `After the block: "${r.question_after_block}", error line "${r.error_on_screen}".`,
          `Log entries for M7 right after the block: ${r.log_entries_after_block}.`,
          `Reopen entries in the export: ${retries.length}, question: "${retries[0]?.question ?? ''}".`,
          `Same as shown: ${retries[0]?.question === r.question_shown ? 'yes' : 'no'}.`,
          `Answer sent both times: "${r.answer}".`
        ].join(' '));
      }

      // 6. M6's source
      const a = reviewBottleFromExport(first, 'A');
      const b = reviewBottleFromExport(first, 'B');
      out.push(a ? `Bottle A stores m6_words_source "${a.s.m6_words_source}". Bottle B stores "${b?.s.m6_words_source}".` : notReached);

      // 7. Bottle B's voice. Hits are places to read, not a verdict: M3 and M4 talk about other people.
      if (!s.B?.screens?.length) out.push(notReached);
      else {
        const hits = [];
        const third = /\b(they|them|their|theirs|he|she|him|her|hers|the builder|the founder|the person)\b/i;
        for (const snap of s.B.screens) {
          for (const [id, text] of Object.entries(snap.copy)) {
            for (const sentence of text.split(/(?<=[.?!])\s+/)) {
              if (third.test(sentence) || /\bme\b/.test(sentence)) hits.push(`[${snap.when}, ${id}] ${sentence}`);
            }
          }
        }
        const buttons = when => s.B.screens.find(x => x.when === when)?.copy;
        const before = buttons('M6 question, before parking');
        const parked = buttons('M6 parked card');
        out.push([
          `M6 buttons before parking: "${before?.['m6-ws-real'] || ''}" | "${before?.['m6-ws-recon'] || ''}".`,
          `Parked card: "${parked?.['dormant-panel-body'] || ''}".`,
          `Sentences holding a third-person word or "me", to read: ${hits.length ? [...new Set(hits)].join(' || ') : 'none'}.`
        ].join(' '));
      }

      // 8. Opening Bottle A
      if (!s.cellar_before || !s.cellar_after) out.push(notReached);
      else {
        const order = c => c.cards.map(x => x.line).join(' > ');
        const dates = c => c.cards.map(x => x.date).join(', ');
        const stamps = c => JSON.stringify(c.stored);
        out.push(`Order before: ${order(s.cellar_before)}. After: ${order(s.cellar_after)}. Same: ${order(s.cellar_before) === order(s.cellar_after) ? 'yes' : 'no'}. Card dates before: ${dates(s.cellar_before)}. After: ${dates(s.cellar_after)}. Stored updated_at same: ${stamps(s.cellar_before) === stamps(s.cellar_after) ? 'yes' : 'no'}. Opened on: ${s.opened_on}.`);
      }

      // 9. The two exports
      if (!first || !second) out.push(notReached);
      else {
        const keys = c => Object.keys(c.keys || {}).sort();
        const differ = [...new Set([...keys(first), ...keys(second)])].filter(k => first.keys[k] !== second.keys[k]);
        const count = c => JSON.parse(c.keys?.[CELLAR_KEY] || '[]').length;
        out.push(`Bottles: ${count(first)} and ${count(second)}. Stored keys that differ between the exports: ${differ.join(', ') || 'none'}. Import button on the empty landing: ${s.import_button_on_empty_landing ? 'yes' : 'no, the file was set on the hidden import field'}.`);
      }
      return out;
    }
  },


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
      await app.waitForPhase1();
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

// Retired in B1b (7 Nov). These play the intake from before B1: the 5 Nov gate, the maturity
// questions and the person step. A new bottle has its own first session instead, so they can't
// reach the screens they test. Their code stays as a record, and their last runs stay in runs/.
const OLD_INTAKE = 'it plays the intake from before B1, which a new bottle no longer has';
const OLD_FIRST_SESSION = "it plays a new bottle's first session as B1 and B1b had it; new bottles are first_session_v2 since B1c";
const RETIRED = {
  'trust-basics': [OLD_INTAKE, 'runs/2026-11-07-trust-basics'],
  'look-and-states': [OLD_INTAKE, 'runs/2026-11-05-look-2'],
  'first-minute': [OLD_INTAKE, 'runs/2026-11-05-first-minute'],
  'architecture-review': [OLD_INTAKE, 'runs/2026-11-05-architecture-review'],
  finding1: [OLD_INTAKE, 'runs/2026-10-21-finding1'],
  // Retired in B1c (7 Nov).
  ...Object.fromEntries(['s1', 's2', 's3', 's4', 's5', 's7', 's8', 's9'].map(n => [`b1-${n}`, [OLD_FIRST_SESSION, n === 's9' ? 'runs/2026-11-07-b1-s9' : `runs/2026-11-07-b1b-rerun-${n}`]])),
  ...Object.fromEntries(['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8'].map(n => [`b1b-${n}`, [OLD_FIRST_SESSION, `runs/2026-11-07-b1b-${n}`]]))
};
for (const name of Object.keys(RETIRED)) delete SCENARIOS[name];

// ── RUNNING ──

async function serveRepoIfNeeded() {
  const up = await fetch(`http://localhost:${PORT}/corked_v6.html`, { method: 'HEAD' }).then(r => r.ok).catch(() => false);
  if (up) { console.log(`Using the server already on port ${PORT}.`); return null; }
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json',
    '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
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
  app.outDir = outDir;
  app.browser = browser;
  try {
    await scenario.play(app, rec);
  } catch (err) {
    rec.broke_off = String(err && err.message || err);
    app.step('broke off', { note: rec.broke_off });
  }
  try {
    if (!rec.exported) {
      const path = join(outDir, `run-${run}-cellar.json`);
      await app.exportCellar(path);
      rec.cellars = { first: JSON.parse(await readFile(path, 'utf8')) };
    }
  } catch (err) {
    rec.export_error = String(err && err.message || err);
    app.step('export failed', { note: rec.export_error });
  }
  await context.close();
  rec.finished_at = new Date().toISOString();
  const happened = scenario.report(rec);
  rec.expected = scenario.expected.map((expected, i) => ({ n: i + 1, expected, happened: happened[i] }));
  delete rec.cellars;   // already saved as their own files
  await writeFile(join(outDir, `run-${run}-observed.json`), JSON.stringify(rec, null, 2) + '\n');
  return rec;
}

async function main() {
  const args = process.argv.slice(2);
  const scenarioName = args.find(a => !a.startsWith('--'));
  const opt = name => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : null; };
  const scenario = SCENARIOS[scenarioName];
  if (RETIRED[scenarioName]) {
    console.error(`${scenarioName} is retired: ${RETIRED[scenarioName][0]}. Its last run is in ${RETIRED[scenarioName][1]}.`);
    process.exit(1);
  }
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
