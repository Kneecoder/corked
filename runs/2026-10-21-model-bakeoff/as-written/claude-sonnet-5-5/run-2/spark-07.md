# Corked Runner Report — spark 07

Generated: 2026-10-21T16:39:25.439Z
Worker: http://127.0.0.1:8789

## Test under this spark
Compress-may-not-upgrade, register hold. Expect: user_line_candidate keeps "annoying with payments" or very close; no operationalised synonyms (late, difficult, unreliable = fail), no introduced nouns. person_in_spark settled (name plus tie). M1 grape settled.

## Raw Spark
```
an app for my sister Marieke because customers are annoying with payments at her flower stall
```

Maturity class: 0
Grape: Marieke — my sister
expect_halt: false

Line sent to the worker (the spark as typed): "an app for my sister Marieke because customers are annoying with payments at her flower stall"

M0's line (verbatim, not shown in the app): "An app for flower stall owners because customers are annoying with payments."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ M2 Phase A request failed.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "an app for my sister Marieke because customers are annoying with payments at her flower stall"
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "user_line_candidate": "An app for flower stall owners because customers are annoying with payments.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "flower stall owners",
    "suspected_problem": "customers are annoying with payments",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "flower stall, payments",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is flower stall owners and the stated problem is customers being annoying with payments. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the flower stall owner and the moment a customer was annoying with payments.",
    "hint": "A good answer names Marieke or another stall owner and one payment that went wrong at the stall.",
    "person_label": "Stall owner",
    "person_placeholder": "Marieke, flower stall owner",
    "when_label": "When at the stall",
    "when_placeholder": "Saturday morning, a customer at the front of the queue",
    "trying_label": "Trying to do",
    "trying_placeholder": "take payment from a customer and hand over the bouquet",
    "happened_label": "What happened with the payment",
    "happened_placeholder": "The customer reached the front of the queue, then went through pockets and bags while others waited behind them"
  },
  "person_in_spark": {
    "grade": "settled",
    "named_person": "Marieke",
    "relationship_tie": "my sister"
  },
  "server_checks": {
    "schema_valid": true,
    "banned_words_found": [],
    "visible_style_violations_cleaned": [],
    "m1_setup_present": true,
    "followup_repaired": false,
    "unbottleable_rescue_blocked": false,
    "m0_moment_cloudiness_overridden": false,
    "m0_ready_downgraded": false,
    "seal_contract_normalized": true,
    "m1_placeholders_nulled": false
  }
}
```

### 2. [main] M1 · /m1
Summary: state=settled · substitution_detected=n/a · swirl=no · changed=[Grape]
Request:
```json
{
  "spark_summary": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "person_name": "Marieke",
  "relationship": "my sister",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m1.v1",
  "mechanism": "M1",
  "outcome": "settled",
  "grape": {
    "state": "settled",
    "named_person": "Marieke",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "Marieke is a named individual with a stated tie, my sister. The Grape is settled.",
    "anchor_span": "my sister"
  },
  "next_question": {
    "should_advance": true,
    "framing": null
  },
  "server_checks": {
    "schema_valid": true,
    "anchor_verified": true,
    "visible_style_violations_cleaned": []
  }
}
```

### 3. [main] M2 · /m2 (phase A)
Summary: ERROR 502
Request:
```json
{
  "phase": "problem",
  "raw_spark": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "user_line": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "flower stall owners",
    "suspected_problem": "customers are annoying with payments",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "flower stall, payments",
    "solution_is_software": "software"
  },
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0
}
```
Response:
```json
{
  "error": "Parse error",
  "raw": ""
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none