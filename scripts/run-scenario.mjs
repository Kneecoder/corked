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
        return !!opts || (refused && refused.style.display === 'block') || status.startsWith('Error');
      });
      // Intake has moved on when the spark bottled, and this line has gone with it.
      const status = ((await page.locator('#v6-bottle-status').first().textContent({ timeout: 1000 }).catch(() => '')) || '').trim();
      if (status.startsWith('Error')) throw new Error(`Bottling failed: ${status}`);
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
    M3: "I don't know other wedding photographers well. I'd guess most of them just eat the loss."
  },
  B: {
    name: 'Sanne',
    rel: 'my friend, she shoots weddings',
    M2: 'It happens a few times a year. She gets annoyed and moves on.'
  },
  failed_line: "Not sent. Corked couldn't be reached, so nothing went on record. Your answer is still here."
};

// ── SCENARIOS ──
// Each scenario plays its steps into rec.screens and rec.checkpoints, then reports, for every
// expected result, what happened. A report states facts. It never says pass or fail.

const SCENARIOS = {
  'look-and-states': {
    title: 'Look and states',
    expected: [
      'No Winemaster circle or "THE WINEMASTER" anywhere. Question screens show the mechanism name, with no progress bar, "Element 2 of 7" or "Phase 1 element 2 of 7".',
      'After Bottle A\'s M2: if something settled, the screen shows the observation, "What changed" with excerpts that appear character for character in the answer, the next-question line and "Back to the cellar", and no park buttons. If nothing settled, report it as not tested.',
      'After the blocked M3 send: the answer is still in the field with the failure message and "Try again". After leaving and reopening the bottle, the answer is there again. After the retry, the history log holds that answer once.',
      'After Bottle A\'s M3: if the Echo is turbid or clearing, the errand card shows, "Copy question" puts only the question on the clipboard, both park buttons show, and there is no "What changed". If the Echo settled, report it as not tested.',
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

      // Copy question, when the errand card is up.
      if (await page.locator('#inline-errand .brief-copy-btn').count()) {
        await page.locator('#inline-errand .brief-copy-btn').click();
        a.after_retry.copied = await page.evaluate(() => navigator.clipboard.readText()).catch(err => `could not read the clipboard: ${err.message}`);
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
          a.after_retry ? `After the retry: log entries holding this answer ${a.after_retry.log_entries_for_this_answer}. All M3 entries: ${JSON.stringify(a.after_retry.log_entries_for_m3.map(e => ({ kind: e.kind, moved: e.moved.map(m => `${m.element} ${m.from}→${m.to}`) })))}. Draft left: ${say(a.after_retry.draft_left)}.` : 'Retry not reached.'
        ].join(' '));
      }

      // 4
      const r = a.after_retry;
      if (!r) out.push(notReached);
      else if (r.echo === 'settled') out.push(`The Echo settled at M3. Not tested. View: ${r.screen.view}.`);
      else {
        const e = r.screen.errand;
        const q = e?.question ?? null;
        out.push([
          `Echo: ${r.echo}. View: ${r.screen.view}.`,
          r.screen.follow_up ? `A follow-up opened instead of the errand: ${say(r.screen.follow_up.question)}.` : '',
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
