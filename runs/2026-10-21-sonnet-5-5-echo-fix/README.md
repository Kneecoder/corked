# Sonnet 5.5 with the Echo rule for non-sufferers, 21 Oct 2026

Measurement only. No model switch. The prompt change is committed and **not deployed**: the live worker still runs the old M3 and M4 prompts on claude-sonnet-4-6.

## The call

Recorded in `docs/v48_calls.md` (commit `65a08bb`):

> A named person who says the confirmed problem doesn't apply to them (it's fine for them, they have it under control, their pain is something else) has not hit the same problem. Their Echo grades turbid, however concrete their behaviour, so a person without the problem can never move the Echo up. Such a person may be Limit material; that is M7's job, not the Echo's.

## The prompt change

Commit `efefbc9`, `worker.js`. One rule on the Echo bar in each prompt, right after the existing turbid lines. Nothing else in the prompts changed.

M3_DOCTRINE, Echo bar:

```
          Also turbid: a named person who says the confirmed problem does not
          apply to them (it is fine for them, they have it under control, their
          pain is something else). They have not hit the same problem. Echo is
          turbid however concrete their behaviour. A person without the problem
          never moves the Echo up.
```

M4_DOCTRINE, Echo bar:

```
          Also turbid: a named person who says the confirmed problem does not apply to them (it is fine for
          them, they have it under control, their pain is something else). They have not hit the same problem.
          Echo is turbid however concrete their behaviour. A person without the problem never moves the Echo up.
```

The call's last sentence, about Limit and M7, is not in the prompts:
- It adds no Echo grading instruction.
- Naming another element in the Echo prompt invites the observation to tell the builder what would count elsewhere.

Unchanged, and worth knowing: M4's existing contrast rule says that when the Echo is turbid, `is_different_kind` and `same_or_different` are set to "unclear". So an M4 answer this rule turns turbid also loses its contrast capture.

## How it ran

- Same bake-off setup as `runs/2026-10-21-model-bakeoff/`:
  - `npx wrangler dev bakeoff/worker-bakeoff-sonnet-5-5.js --var ANTHROPIC_MODEL:claude-sonnet-5-5 --port 8791`
  - worker.js at `efefbc9`, through the Sonnet 5.5 adapter: thinking `between_tools`, text block only.
  - The running worker's build was checked for the new rule before the runs.
- `scripts/run-corked-batch.mjs`, three times, into `claude-sonnet-5-5/run-N/`.
- `smoke/spark-01-m4.json`: one M4 call on spark 1's answer, sent before the batteries.

## Labels in REPORT.md

| Label | Runs | Prompts | Where the runs are |
|---|---|---|---|
| claude-sonnet-4-6 | today's baseline, not re-run | old | `runs/2026-10-21-model-bakeoff/claude-sonnet-4-6/` |
| claude-sonnet-5-5 old prompts | today's bake-off, not re-run | old | `runs/2026-10-21-model-bakeoff/claude-sonnet-5-5/` |
| claude-sonnet-5-5 | this folder | new (`efefbc9`) | `claude-sonnet-5-5/` |

Scored with:

```
node bakeoff/score-bakeoff.mjs runs/2026-10-21-sonnet-5-5-echo-fix --baseline claude-sonnet-4-6 --add "claude-sonnet-4-6=runs/2026-10-21-model-bakeoff/claude-sonnet-4-6" --add "claude-sonnet-5-5 old prompts=runs/2026-10-21-model-bakeoff/claude-sonnet-5-5" --focus 1,2,7,10,11,13:M3,M4:echo
```

The baseline ran the old prompts. Its M3 and M4 grades are what the live worker gives today, not what claude-sonnet-4-6 would give under the new rule.

## Notes from the runs

These are facts from the runs. Nothing was changed because of them.

- **The battery's own notes:** the notes for spark 1 and spark 10 in `scripts/run-corked-batch.mjs` were written before this call.
  - Spark 1 expects all six elements settled and M4 contrast "true" / "different".
  - Spark 10 expects the M4 Echo to rank up to settled, with contrast "true" / "different".
  - Spark 10's M4 answer ("the chasing part she has under control") is one of the call's own examples. Under the new prompts it grades turbid in all three runs.
- **Spark 10 contrast:** M4 graded the Echo turbid in all three runs. Contrast stayed "true" / "different" in runs 1 and 2, and was "unclear" in run 3. The M4 prompt's existing rule says a turbid Echo sets contrast to "unclear". The server does not enforce that rule.
- **Spark 1, M4** ("For her the pain is cancellations inside 48 hours, the payment part is fine"): still settled in all three runs. The observation reads the 48-hour cancellations as the same problem. Contrast moved from "true" / "different" (old prompts) to "true" / "same".
- **Observations that say why:** some M3 and M4 observations say why a person does not count against the confirmed problem, for example: "she has not hit the confirmed problem and her spreadsheet behaviour does not count as an echo" (spark 2, M4). Counted with a text match across all three runs:

  | | M3 and M4 observations that do this |
  |---|---|
  | claude-sonnet-4-6 | 18 of 90 |
  | claude-sonnet-5-5, old prompts | 4 of 96 |
  | claude-sonnet-5-5, new prompts | 28 of 96 |
