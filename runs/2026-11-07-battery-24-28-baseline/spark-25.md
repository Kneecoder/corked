# Corked Runner Report — spark 25

Generated: 2026-11-07T14:14:47.410Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
First session /m2, one answer naming a single dated moment (maturity 0). Baseline only: no expected grade given.

## Raw Spark
```
An app that finds an evening when everyone in a group is free.
```

Maturity class: 0
Grape: my sister — my sister
expect_halt: maybe

Line sent to the worker (the spark as typed): "An app that finds an evening when everyone in a group is free."

M0's line (verbatim, not shown in the app): (none)

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ First session /m2: one call, graded with no problem.

## Run Log

### 1. [main] M2 · /m2 (first session)
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "flow": "first_session_v1",
  "user_line": "An app that finds an evening when everyone in a group is free.",
  "grape_name": "my sister",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "user_answer": "Last Tuesday my sister spent an hour in three group chats trying to find a date for her birthday dinner",
  "gap_in_play": false
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "friction",
  "state": "settled",
  "tell": {
    "state": "settled",
    "anchor_span": "spent an hour in three group chats trying to find a date for her birthday dinner"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday"
  },
  "observation": {
    "surface_text": "The answer names a specific observable action: coordinating across three group chats for an hour. The moment is anchored to a single named day.",
    "anchor_span": "Last Tuesday my sister spent an hour in three group chats trying to find a date for her birthday dinner"
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_floor": true,
    "swirl_included": false
  },
  "ai_fields": [
    "observation.surface_text"
  ],
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none