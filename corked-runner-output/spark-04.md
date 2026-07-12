# Corked Runner Report — spark 04

Generated: 2026-07-11T18:21:50.246Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Scope gate, explicit non-software. Expect: out_of_scope, scope_gated true, scope reason present, no followup, no downstream calls. Clean halt.

## Raw Spark
```
A sourdough bakery subscription for my street.
```

Maturity class: 1
Grape: (none) — (none)
expect_halt: true

User Line candidate (verbatim from M0): (none — halted before M0 returned one)

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ Out of scope (non-software spark) — expected worker behaviour.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=out_of_scope · in_scope=false · followup_needed=false
Request:
```json
{
  "raw_spark": "A sourdough bakery subscription for my street."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A sourdough bakery subscription for my street.",
  "user_line_candidate": "A sourdough bakery subscription for people on the speaker's street.",
  "spark_parse": {
    "solution_form": "subscription",
    "implied_person": "people on the speaker's street",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "sourdough bakery",
    "solution_is_software": "non_software"
  },
  "digestibility": {
    "state": "out_of_scope",
    "missing": [],
    "reason": "",
    "can_seal": false,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": null,
  "scope": {
    "in_scope": false,
    "reason": "This spark describes something that belongs in a different cellar. Corked ages software products built by solo builders. A non-software idea is not less valid, it ages somewhere else."
  },
  "server_checks": {
    "schema_valid": true,
    "scope_gated": true
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- ⚠ M0: flagged out_of_scope (non_software).

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none