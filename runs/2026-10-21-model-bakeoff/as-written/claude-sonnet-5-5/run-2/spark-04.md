# Corked Runner Report — spark 04

Generated: 2026-10-21T16:39:06.507Z
Worker: http://127.0.0.1:8789

## Test under this spark
Scope gate, explicit non-software. Expect: out_of_scope, scope_gated true, scope reason present, no followup, no downstream calls. Clean halt.

## Raw Spark
```
A sourdough bakery subscription for my street.
```

Maturity class: 1
Grape: (none) — (none)
expect_halt: true

Line sent to the worker (the spark as typed): "A sourdough bakery subscription for my street."

M0's line (verbatim, not shown in the app): "A sourdough bakery subscription for the people on my street."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ M1 request failed.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=bottleable_cloudy · in_scope=true · followup_needed=true
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
  "user_line_candidate": "A sourdough bakery subscription for the people on my street.",
  "spark_parse": {
    "solution_form": "subscription",
    "implied_person": "people on the speaker's street",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "sourdough bakery",
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "problem"
    ],
    "reason": "Bottleable, cloudy. The sourdough bakery, the subscription, and the population on the street are visible, but no problem is stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "What problem are the people on your street having with sourdough?"
  },
  "m1_setup": {
    "question": "Name the specific person on your street and the moment sourdough comes up for them.",
    "hint": "A good answer is one neighbour, by name or role, and one moment with sourdough that you saw or heard about.",
    "person_label": "Neighbour",
    "person_placeholder": "Dana, neighbour three doors down",
    "when_label": "When it came up",
    "when_placeholder": "a Saturday morning at her front gate",
    "trying_label": "What they were trying to do",
    "trying_placeholder": null,
    "happened_label": "What happened",
    "happened_placeholder": null
  },
  "person_in_spark": {
    "grade": "none",
    "named_person": null,
    "relationship_tie": null
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
    "m1_placeholders_nulled": true
  }
}
```

### 2. [main] M1 · /m1
Summary: ERROR 400
Request:
```json
{
  "spark_summary": "A sourdough bakery subscription for my street.",
  "person_name": "",
  "relationship": "",
  "maturity_class": 1
}
```
Response:
```json
{
  "error": "Missing required fields: spark_summary and person_name or relationship"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none