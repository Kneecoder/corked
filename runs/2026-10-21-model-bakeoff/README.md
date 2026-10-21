# Model bake-off, 21 Oct 2026

Measurement only. The live worker, the prompts and the app were not changed.

## Question

Does claude-haiku-5-5 or claude-sonnet-5-5 grade the same as claude-sonnet-4-6, the model the live worker runs on?

## How it ran

- **Worker:** `worker.js` as committed, run locally with `wrangler dev`, one local worker per model. ANTHROPIC_MODEL was set on the command line.
  - claude-sonnet-4-6 (baseline): `npx wrangler dev bakeoff/worker-bakeoff.js --var ANTHROPIC_MODEL:claude-sonnet-4-6 --port 8787`
  - claude-haiku-5-5: `npx wrangler dev bakeoff/worker-bakeoff-haiku.js --var ANTHROPIC_MODEL:claude-haiku-5-5 --port 8790`
  - claude-sonnet-5-5: `npx wrangler dev bakeoff/worker-bakeoff-sonnet-5-5.js --var ANTHROPIC_MODEL:claude-sonnet-5-5 --port 8791`
- **Key:** an Anthropic key in `.dev.vars` (gitignored), from the same Anthropic workspace (Default) as the live worker's key.
- **Recording:** `bakeoff/worker-bakeoff.js` imports `worker.js` and doesn't change it. For every call the worker makes to Anthropic, it records the model, HTTP status, stop reason, content block types, token usage, rate-limit headers and the raw reply text.
- **Battery:** `scripts/run-corked-batch.mjs`, the 20-spark battery, three times per model. The models ran side by side; each model's three runs ran one after another.
  - Command: `CORKED_WORKER=http://127.0.0.1:<port> CORKED_OUT=runs/2026-10-21-model-bakeoff/<model>/run-N CORKED_JSON=1 node scripts/run-corked-batch.mjs`
  - Same answers, same 30 second timeout as the app.
- **Scoring:** `node bakeoff/score-bakeoff.mjs runs/2026-10-21-model-bakeoff` writes `REPORT.md`.

## What each model needed

### claude-sonnet-4-6 (baseline)

Nothing. It ran through the recorder only, exactly as the live worker calls it.

### Why the newer models needed anything

worker.js sends no `thinking` setting and reads only `content[0].text` as the reply. Both newer models think by default when `thinking` is unset. Then:
- The reply starts with a thinking block.
- The worker gets an empty string and returns "Parse error", even when a full JSON answer follows the thinking block.
- The thinking also counts against `max_tokens` (300 to 1600 per route), so some replies were cut off before the answer.

Both models first ran as written. Those runs measure the worker's plumbing, not grading, so they were stopped and kept in `as-written/`. The scorer leaves them out.

| As written | Requests | Failed | Failure causes |
|---|---|---|---|
| claude-haiku-5-5 (run 1, run 2 to spark 5) | 26 | 24 | 22 parse errors with a thinking block first and the reply cut off at max_tokens. 2 parse errors with a thinking block first and a complete reply after it. |
| claude-sonnet-5-5 (run 1, run 2 to spark 16) | 99 | 31 | 25 parse errors with a thinking block first and a complete reply after it. 5 parse errors with a thinking block first and the reply cut off at max_tokens. 1 request the worker rejected before any model call: on spark 4, M0 didn't gate the bakery as out of scope, so the battery sent M1 with no person. |

### The adapters

Each newer model's scored batteries ran through an adapter in the bake-off wrapper. worker.js stayed unchanged. On every Anthropic call, an adapter does two things:

1. **Request:** turns thinking off. Nothing else in the request changes; `max_tokens` stays as worker.js sets it.
2. **Reply:** passes only the text blocks to the worker, so `content[0]` is the text.

| Model | Adapter | Thinking off is sent as | Why that value |
|---|---|---|---|
| claude-haiku-5-5 | `bakeoff/haiku-adapter.js` | `thinking: { "type": "disabled" }` | Haiku 5.5 accepts `disabled` at its default effort (medium). |
| claude-sonnet-5-5 | `bakeoff/sonnet-5-5-adapter.js` | `thinking: { "type": "between_tools" }` | Sonnet 5.5 rejects `disabled`. The API's own error: "To turn thinking off on this model, send "thinking": {"type": "between_tools"} instead of {"type": "disabled"}. The model does not think before responding." The worker sends no tools, so there are no between-tool notes either. Both calls are saved in `smoke/claude-sonnet-5-5-thinking-*.json`. |

Why thinking off and not a higher `max_tokens`:
- It keeps every route's `max_tokens` as it is.
- It matches what the baseline gets: claude-sonnet-4-6 runs without thinking too.
- Raising the caps would mean guessing per route. Haiku's first smoke M0 reply spent all 1,600 tokens thinking and still had no answer, and thinking adds time against the app's 30 second timeout.
- What this doesn't measure: either newer model with thinking on.

A real switch to either model would need the same two changes in `callClaude()` in worker.js, with that model's thinking-off value. With thinking off, the second change is a safeguard. `REPORT.md` ("What each model ran with") counts how often a reply still carried a non-text block.

Smoke tests after the change, one M0 call each, both parsed on the first try:
- `smoke/claude-haiku-5-5-adapted-m0-1.json`: `cellar_ready`, one text block, 691 output tokens.
- `smoke/claude-sonnet-5-5-adapted-m0-1.json`: `cellar_ready`, one text block, 709 output tokens.

## Files

- `<model>/run-N/spark-NN.md`: the battery's usual report per spark.
- `<model>/run-N/spark-NN.json`: the whole run record. It holds:
  - every request and every worker response
  - under `calls`: what the model actually sent (raw text, stop reason, block types, tokens)
  - under `calls.adapter`: what the adapter changed, and the blocks as the API sent them
- `<model>/run-N/_summary.md`, `console.txt`: the battery's summary and console output.
- `<model>/wrangler-dev.log`: the local worker's log for that model, with the server's `m2_downgrade` warnings.
- `smoke/`: the M0 smoke calls per model, and the two Sonnet 5.5 thinking-setting calls.
- `as-written/<model>/`: the stopped runs without an adapter, with their worker logs.
- `REPORT.md`: one table per criterion, per model.

## Criteria (set before the runs)

- **A. Leniency:** every case where a model grades an element higher than the baseline does.
- **B. Fabrication:**
  - replies that fail schema or server checks
  - anchors that aren't verbatim
  - words the builder never wrote
- **C. Consistency:** how often each model disagrees with itself across its three runs. The baseline's rate is the noise floor.
- **D. Cost:** tokens and dollars per full chain, per model. Output tokens include any thinking tokens; they are billed as output.
