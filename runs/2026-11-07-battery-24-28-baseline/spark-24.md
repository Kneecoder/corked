# Corked Runner Report — spark 24

Generated: 2026-11-07T14:14:44.143Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
First session /m2, Jamie's rental answer from 7 Nov (self, maturity 2). Baseline only: no expected grade given.

## Raw Spark
```
A tool to document a rented place.
```

Maturity class: 2
Grape: (none) — (none)
expect_halt: maybe

Line sent to the worker (the spark as typed): "A tool to document a rented place."

M0's line (verbatim, not shown in the app): (none)

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Vintage**: clearing — history: inert → clearing (last raised by M2)
  raw grades: M2=clearing
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ First session /m2: one call, graded with no problem.

## Run Log

### 1. [main] M2 · /m2 (first session)
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "flow": "first_session_v1",
  "user_line": "A tool to document a rented place.",
  "grape_name": "",
  "grape_relationship": "",
  "maturity_class": 2,
  "user_answer": "I took a lot of pictures of different outlets, sinks, basically the condition of the place. But I did not really know what mattered, and how to really bundle it in one profesional locatoin.",
  "gap_in_play": false
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "friction",
  "state": "clearing",
  "tell": {
    "state": "settled",
    "anchor_span": "I took a lot of pictures of different outlets, sinks, basically the condition of the place"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "I took a lot of pictures"
  },
  "observation": {
    "surface_text": "The answer names a specific filmable action: photographing outlets, sinks, and general condition. The moment is unanchored, no single instance, date, or context is named, only a recurring or general account of the behaviour.",
    "anchor_span": "I took a lot of pictures of different outlets, sinks, basically the condition of the place"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Was this one specific property visit on a specific day, or a pattern that happened across multiple visits or locations?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:dash"
    ],
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