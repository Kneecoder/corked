# Corked

Corked is an idea-aging app for solo software builders. You cork a spark, it ages through honest questions, and you find out whether there is something real behind it. Jamie owns the product and isn't a developer. Claude in claude.ai writes the briefs. You build them.

## Source of truth
- Corked_Concept_Document_v47.md is the doctrine. Where a brief and v47 disagree, stop and say so before building.
- Corked_The_Object_v3.md holds the next big design requirement: the sidebar record.
- Never edit doctrine files unless a brief says to.

## How we work
- Do what the brief says. Everything under DO NOT TOUCH is off limits.
- If something outside the brief is broken, report it. Don't fix it.
- List anything you added that the brief didn't ask for.
- Commit before every deploy. Commit, push, give the hash.
- If a deploy needs a login or anything else from Jamie, stop and tell him.
- Jamie's click-through in his own browser decides whether something works. Never report a pass. Don't open the app in a browser, Playwright or anything else to check your own work.
- Every new or changed sentence of user-facing copy goes in the report, in full.
- Reports in plain words and short sentences.

## Product rules that break most easily
- Corked records. It never invents. Every line on the record is the builder's own words, anchored to the answer it came from. No generated sentence stands on the record.
- Not on record means not on record. It never means it doesn't exist.
- A confirm click records that the builder agrees with a wording. It never upgrades evidence, and provenance survives it.
- A system guess never settles an element.
- Element states only move up. A weaker answer never lowers one.
- Never explain what counts. No hints about what a good answer contains.
- Field questions follow The Mom Test: about the person's own past, never about the idea. A field question that pitches is a bug.
- In self mode the builder is the person. Everything is in the second person, with every sentence written out, never a name swapped for "you". The builder can never be their own Echo.
- "Cork another spark" is never the main action.

## Copy register
- Flat, like a lab result. No praise, no reassurance, no coaching, no reacting.
- No dashes. No "not X but Y".
- Report findings, never the reasoning behind them.
- If a sentence sounds like a startup framework, rewrite it until it sounds like a place.

## Model and tests
- The worker's model is pinned in ANTHROPIC_MODEL. Don't change it.
- Any change to M0 runs the 17-spark regression suite before deploying.
- Any change to M2 Phase A runs the Phase A spark battery.

## Don't build unless a brief asks
Scores, streaks or counts. Accounts, payments, push or email delivery, sharing. Phase 2 or Phase 3.

## Repo map
The repo is `C:\Users\James\Desktop\ClaudeCodeTest`. GitHub: Kneecoder/corked, branch `main`.

### Files that matter
- `corked_v6.html`: the whole app in one file (HTML, CSS, script). Intake (M0 spark, the setup question, the person step), Phase 1 (M1 to M7), the cellar, parking, the label screen.
- Bottles live in the browser's localStorage under `corked-cellar-v1`. The worker URL is typed in the spark step and saved as `corked_worker_url`.
- `worker.js`: the Cloudflare Worker. Every prompt (the `*_DOCTRINE` strings), every model call, and every server-side check: anchors, the Phase A word check, length caps, dash and style cleaning.
- `wrangler.toml`: worker name `orked-m1-proxy`, the account, `ANTHROPIC_MODEL`, `ALLOWED_ORIGINS`. The Anthropic key is a worker secret (`ANTHROPIC_API_KEY`). It is not in the repo.
- `docs/audit-2026-09-24.md`: code audit with numbered findings. Briefs cite them as "audit #5".
- `docs/Corked_Test_Run_2026-09-25.md`: notes from a test run.
- `docs/Corked_The_Object_v1.md`, `docs/Corked_The_Object_v2.md`: design notes for the record.

### Doctrine files
- `Corked_Concept_Document_v47.md` is not in the repo. It lives in `C:\Users\James\Downloads\`. A second, identical copy there is `Corked_Concept_Document_v47 (1).md`.
- The Object notes v1 and v2 are in `docs/` and in Downloads. There is no v3 in either place yet.

### Worker routes
All POST, JSON in and out, at https://orked-m1-proxy.kneebonewebdesign.workers.dev
- `/m0`: spark bottling. User Line, spark parse, digestibility, follow-up, scope gate.
- `/m1`: grape grading, at intake and on a grape reopen. Not called in self mode.
- `/m2`: three calls on one route.
  - Phase A (no `user_answer`): outcome `stated`, `self_answer`, `guessed` or `insufficient`.
  - `phase: "scene"`: builds a problem from the builder's scene answer.
  - Phase B (with `user_answer`): grades Tell, Vintage, and Gap when `gap_in_play`.
- `/m3` to `/m7`: grading for each mechanism.
- `/field`: field briefs. Modes `find`, `ask`, `echo`, `contrast`, `words`, `limit`.
- `/resolve`: the resolving question on the label screen.
- Later requests carry the problem as `problem: { text, source, status }`. The worker still accepts the old `confirmed_problem` string.

### Test runners and batteries
- `scripts/run-corked-batch.mjs`: the 20-spark Phase 1 battery. Runs in Node with no browser: `node scripts/run-corked-batch.mjs`. Calls the live worker for M0 to M7. Writes one report per spark to `corked-runner-output/`, which is tracked in git.
- `scripts/run-corked-batch-2026-07-12.mjs`: the same runner. Writes to `corked-runner-output-2026-07-12/`.
- `corked-runner.html`: a browser runner that steps one spark through the chain.
- `m0-bench.html`: the 17-spark M0 regression bench. A browser page.
- `m0-test.html`, `m1-test.html`: single-call test pages for M0 and M1.
- `m3_test_bench.html`, `m4-bench.html`, `m5-m6-m7-bench.html`, `cross-mech-bench.html`, `park-rhythm-bench.html`: mechanism and flow benches. Browser pages.
- `corked-bench-logs/`: notes from a bench run.
- No Phase A only battery is committed. The 20-spark battery runs Phase A as one step of the chain.

### Running the app
- `Start Corked.bat` on the Desktop, outside the repo, serves this folder on http://localhost:8080 with `npx http-server`. That origin is in `ALLOWED_ORIGINS`.
- The app is not hosted anywhere. Only the worker is deployed.

### Deploying the worker
- Commit and push first.
- From the repo root: `npx wrangler deploy`.
- Wrangler 4 is logged in with an OAuth token for the account in `wrangler.toml`. If it asks for a login, stop and tell Jamie.
