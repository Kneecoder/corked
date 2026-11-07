# Corked

Corked is an idea-aging app for solo software builders. You cork a spark, it ages through honest questions, and you find out whether there is something real behind it. Jamie owns the product and isn't a developer. Claude in claude.ai writes the briefs. You build them.

## Source of truth
- docs/Corked_Concept_Document_v47.md is the doctrine. Where a brief and v47 disagree, stop and say so before building.
- docs/v48_calls.md overrides v47 where they disagree.
- docs/Corked_The_Object_v3.md holds the next big design requirement: the sidebar record.
- docs/design/2026-11-05-look/ is the design to build to: match its png/, and take exact colours, fonts and sizes from its README.md and source/.
- Never edit doctrine files unless a brief says to. New versions are written in claude.ai and replace the ones in docs/ only when a brief says so.

## How we work
- Do what the brief says. Everything under DO NOT TOUCH is off limits.
- If something outside the brief is broken, report it. Don't fix it.
- List anything you added that the brief didn't ask for.
- Commit before every deploy. Commit, push, give the hash.
- If a deploy needs a login or anything else from Jamie, stop and tell him.
- Never report a pass. Jamie checks screens in real use.
- Logic is checked by scripted runs, not click-throughs: grades, element states, routing and history log entries. The brief states the scenario and the expected results before any code changes. The script drives the real app in a headless browser against the live worker, exports the cellar, and saves the raw JSON in the repo. Report what happened against each expected result. If an expected result fails, report it and stop. Never change the app or the expectations to make a run pass.
- Outside a scripted run a brief asks for, don't open the app in a browser, Playwright or anything else to check your own work.
- Every new or changed sentence of user-facing copy goes in the report, in full.
- Reports in plain words and short sentences.

## Product rules that break most easily
- Corked records. It never invents. Every line on the label is the builder's own words, anchored to the answer it came from. A problem Corked built or guessed always shows where it came from.
- Not on record means not on record. It never means it doesn't exist.
- A confirm click records that the builder agrees with a wording. It never upgrades evidence, and provenance survives it.
- A system guess never settles an element.
- Element states only move up. A weaker answer never lowers one.
- Never explain what counts. No hints about what a good answer contains.
- Field questions follow The Mom Test: about the person's own life and what actually happened, never about the idea or what they would do. A field question that pitches is a bug.
- In self mode the builder is the person. Everything is in the second person, and every sentence has to read right as a whole. The builder can never be their own Echo.
- "Cork another spark" is never the main action.

## Copy register
- Flat, like a lab result. No praise, no reassurance, no coaching, no reacting.
- No dashes. No "not X but Y".
- Report findings, never the reasoning behind them.
- If a sentence sounds like a startup framework, rewrite it until it sounds like a place.

## Model and tests
- The worker's model is pinned in ANTHROPIC_MODEL. Don't change it.
- Any change to M0 needs the 17-spark suite, m0-bench.html, which is a browser page. Stop and tell Jamie before deploying one.
- Any change to M2 Phase A runs the 20-spark battery: node scripts/run-corked-batch.mjs.

## Don't build unless a brief asks
Scores, streaks or counts. Accounts, payments, push or email delivery, sharing. Phase 2 or Phase 3.

## Known gaps, scheduled, don't patch
- The label screen: "Cork another spark" as the main action, "Phase 1 Complete" and the settled count. The end of Phase 1 and the Object replace it.

## Repo map
The repo is `C:\Users\James\Desktop\ClaudeCodeTest`. GitHub: Kneecoder/corked, branch `main`.

### Files that matter
- `corked_v6.html`: the app (HTML, CSS, script). Intake (M0 spark, the setup question, the person step), Phase 1 (M1 to M7), the cellar, parking, the label screen. A new bottle has its own first session instead: the spark, the gate, four questions the AI writes for the idea, the end screen and the plan step (`s.flow` is `first_session_v2`, search for FIRST SESSION v2). Bottles from B1 and B1b (`first_session_v1`) keep their fixed burst of six questions. Old bottles keep the old flow. It loads the five files in `shared/`, so it has to be served from the repo folder.
- `shared/mechanisms.js`: the mechanism table. Each mechanism's route, bars, primary bar, the elements it may move, its anchors, its errand and its copy. The app, the worker and the test tools all read it. A doctrine call about what a mechanism grades is one row here.
- `shared/provenance.js`: the one rule for "is this the builder's own words". Anchors, quotes from the spark, and the never-invent word check. The worker, the app and the bake-off scoring ask it.
- `shared/cellar-clock.js`: pace, part of the day, the 05:00 rule, and every comeback, stall and wording answer. It takes `now` as an input.
- `shared/first-session-copy.js`: every fixed sentence of a new bottle's first session. The gate, the end screen, the cellar card, and the fallback for each question. Since B1c (v48, 7 Nov 2026) the AI writes a new bottle's first-session questions for each idea, around fixed purposes; the builder's answers are stored word for word with the exact question shown. Bottles from B1 and B1b keep their fixed questions. Wording changes go here.
- `shared/cellar-store.js`: the one writer of `corked-cellar-v1`. It takes its storage as an input. Cellar import is the one other way in: it restores a whole export.
- Bottles live in the browser's localStorage under `corked-cellar-v1`. The worker URL is typed in the spark step and saved as `corked_worker_url`.
- `worker.js`: the Cloudflare Worker. Every prompt (the `*_DOCTRINE` strings), every route, and every server-side check: length caps, dash and style cleaning. It reads `shared/mechanisms.js` and `shared/provenance.js`.
- `model-adapters.js`: the seam under `callClaude()`. Anthropic in production, the bake-off options, and a replay adapter for recorded replies. `ANTHROPIC_MODEL` stays pinned in `wrangler.toml`.
- `wrangler.toml`: worker name `orked-m1-proxy`, the account, `ANTHROPIC_MODEL`, `ALLOWED_ORIGINS`. The Anthropic key is a worker secret (`ANTHROPIC_API_KEY`). It is not in the repo.
- `fonts/`: the fonts as woff2, with their licences. Inter, Newsreader and IBM Plex Mono, in the weights the app uses. `corked_v6.html` loads them itself. The bench pages load them through `fonts/bench-fonts.css`.
- `docs/audit-2026-09-24.md`: code audit with numbered findings. Briefs cite them as "audit #5".
- `docs/Corked_Test_Run_2026-09-25.md`: notes from a test run.
- `docs/Corked_The_Object_v1.md`, `docs/Corked_The_Object_v2.md`: design notes for the record.

### Doctrine files
- `docs/Corked_Concept_Document_v47.md`: the doctrine. Copied from Downloads, where the newest copy was `Corked_Concept_Document_v47 (1).md`.
- `docs/Corked_The_Object_v3.md`: the sidebar record. It replaces Object v1 and v2. Those two are still in `docs/`.

### Worker routes
All POST, JSON in and out, at https://orked-m1-proxy.kneebonewebdesign.workers.dev
- `/m0`: spark bottling. User Line, spark parse, digestibility, follow-up, scope gate.
- `/m1`: grape grading, at intake and on a grape reopen. Not called in self mode. A new bottle's F1 sends `with_label: true` and also gets back the short label and `is_self`, from a second call beside the grade.
- `/question`: the first-session question writer (B1c). `{ path, slot, spark, answers }` in, one question out, checked before it leaves; a question that fails goes out as null and the app shows the fixed fallback.
- `/label`: the short label a new bottle's first session slots into its own questions and buttons. E4 sends `{ answer, kind: "people" }`. Never shown as a record line, never read by a grader.
- `/m2`: three calls on one route.
  - Phase A (no `user_answer`): outcome `stated`, `self_answer`, `guessed` or `insufficient`.
  - `phase: "scene"`: builds a problem from the builder's scene answer.
  - Phase B (with `user_answer`): grades Tell, Vintage, and Gap when `gap_in_play`. A new bottle's first session sends `flow: "first_session_v1"` with no problem, and is graded on the answer alone.
- `/m3` to `/m7`: grading for each mechanism.
- `/field`: field briefs. Modes `find`, `ask`, `echo`, `contrast`, `words`, `limit`.
- `/resolve`: the resolving question on the label screen.
- Later requests carry the problem as `problem: { text, source, status }`. The worker still accepts the old `confirmed_problem` string.

### Test runners and batteries
- `tests/`: offline tests, `npm test`. No browser, no key, no cost. The shared modules with plain inputs, and the worker's own checks driven by recorded replies from `runs/` through the replay adapter. They check code, not screens, and they add to the scripted runs a brief asks for. They replace nothing.
- `scripts/run-corked-batch.mjs`: the 20-spark Phase 1 battery. Runs in Node with no browser: `node scripts/run-corked-batch.mjs`. Calls the live worker for M0 to M7. Writes one report per spark to `corked-runner-output/`, which is tracked in git. Cases 21 to 23 are B1's person cases (M1 only). Cases 24 to 26 grade a new bottle's F2 on /m2 with no problem, and 27 and 28 run M0 alone on two experiment sparks; their baseline is `runs/2026-11-07-battery-24-28-baseline`. `CORKED_ONLY=24-28` runs only those cases.
- `scripts/run-corked-batch-2026-07-12.mjs`: the same runner. Writes to `corked-runner-output-2026-07-12/`.
- `corked-runner.html`: a browser runner that steps one spark through the chain.
- `m0-bench.html`: the 17-spark M0 regression bench. A browser page.
- `m0-test.html`, `m1-test.html`: single-call test pages for M0 and M1.
- `m3_test_bench.html`, `m4-bench.html`, `m5-m6-m7-bench.html`, `cross-mech-bench.html`, `park-rhythm-bench.html`: mechanism and flow benches. Browser pages.
- `corked-bench-logs/`: notes from a bench run.
- No Phase A only battery is committed. The 20-spark battery runs Phase A as one step of the chain.
- `scripts/run-scenario.mjs`: scripted runs. Plays a scenario against the real app at http://localhost:8080/corked_v6.html?rhythmtest=1 in headless Chromium, against the live worker, with a fresh browser profile per run. Example: `node scripts/run-scenario.mjs finding1 --runs 3 --out runs/2026-10-21-finding1`. Per run it saves `run-N-cellar.json` (the app's own Export cellar) and `run-N-observed.json` (screens, checkpoints, what happened against each expected result). Serves the repo on port 8080 itself when Start Corked.bat isn't running. Scenarios live in the script. `CORKED_WORKER=<url>` plays against a version uploaded with no traffic. Retired: the scenarios that played the intake from before B1 (trust-basics, look-and-states, first-minute, architecture-review, finding1), and the B1 and B1b ones that play a new bottle's first session as it was then. B1's s6 and B1b's t9, which open old bottles, still run. First time on a machine: `npm install`, then `npx playwright install chromium`.
- `scripts/run-question-sample.mjs`: the question writer three times per slot on five sparks, every question in one file.
- `scripts/run-label-cases.mjs`: the short label's person and label cases against a worker, grades with and without the label side by side.
- `runs/`: scripted run output, tracked in git. One folder per run date and scenario.

### Running the app
- `Start Corked.bat` on the Desktop, outside the repo, serves this folder on http://localhost:8080 with `npx http-server`. That origin is in `ALLOWED_ORIGINS`.
- The app is not hosted anywhere. Only the worker is deployed.

### Deploying the worker
- Commit and push first.
- From the repo root: `npx wrangler deploy`.
- Wrangler 4 is logged in with an OAuth token for the account in `wrangler.toml`. If it asks for a login, stop and tell Jamie.
