# Corked Runner Report — spark 26

Generated: 2026-11-07T14:14:51.441Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
First session /m2, a vague answer, no person on record (maturity 0). Baseline only: no expected grade given.

## Raw Spark
```
An app that finds an evening when everyone in a group is free.
```

Maturity class: 0
Grape: (none) — (none)
expect_halt: maybe

Line sent to the worker (the spark as typed): "An app that finds an evening when everyone in a group is free."

M0's line (verbatim, not shown in the app): (none)

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: turbid — history: inert → turbid (last raised by M2)
  raw grades: M2=turbid
- **Vintage**: turbid — history: inert → turbid (last raised by M2)
  raw grades: M2=turbid
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ First session /m2: one call, graded with no problem.

## Run Log

### 1. [main] M2 · /m2 (first session)
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "flow": "first_session_v1",
  "user_line": "An app that finds an evening when everyone in a group is free.",
  "grape_name": "",
  "grape_relationship": "",
  "maturity_class": 0,
  "user_answer": "people struggle with this all the time",
  "gap_in_play": false
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "friction",
  "state": "turbid",
  "tell": {
    "state": "turbid",
    "anchor_span": "people struggle with this all the time"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names no specific person performing any observable action. No instance, time, or context is present to anchor the claim.",
    "anchor_span": "people struggle with this all the time"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Who is the specific person this answer is meant to be about, and when did you last watch them run into this?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": false,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_floor": true,
    "swirl_included": true
  },
  "ai_fields": [
    "observation.surface_text",
    "swirl.question"
  ],
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none