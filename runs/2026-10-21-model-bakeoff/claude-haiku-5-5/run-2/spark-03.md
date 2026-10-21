# Corked Runner Report — spark 03

Generated: 2026-10-21T16:44:27.453Z
Worker: http://127.0.0.1:8790

## Test under this spark
Solution-language spark, class 1 direction door. Expect: first pass bottleable_cloudy (person visible, no problem), followup fires, re-bottle lands cellar_ready or cloudy-with-problem. M2 question uses the direction door: no "think of the last time" / "describe the moment" phrasing. The told-not-watched moment grades settled.

## Raw Spark
```
A better scheduling app for gym owners.
```

Maturity class: 1
Grape: Marco — owns the boxing gym where I train
expect_halt: false

Line sent to the worker (the spark as typed): "A better scheduling app for gym owners."

M0's line (verbatim, not shown in the app): "A better scheduling app for gym owners."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ M2 Phase A outcome: insufficient, no problem on record. Stopped at M2.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=bottleable_cloudy · in_scope=true · followup_needed=true
Request:
```json
{
  "raw_spark": "A better scheduling app for gym owners."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A better scheduling app for gym owners.",
  "user_line_candidate": "A better scheduling app for gym owners.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "gym owners",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": "better scheduling",
    "domain": "gyms",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "suspected_problem"
    ],
    "reason": "Bottleable, cloudy. The form, the population, and the scheduling are visible, but no problem is stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "What is going wrong for gym owners with scheduling right now?"
  },
  "m1_setup": {
    "question": "Name the specific gym owner and the moment their scheduling broke down.",
    "hint": "A good answer names one owner and one concrete scheduling failure they ran into at their gym.",
    "person_label": "Gym owner",
    "person_placeholder": "Dana, owner of a two-location boxing gym",
    "when_label": "When it happened",
    "when_placeholder": "the Monday after a class was double-booked",
    "trying_label": "What they were trying to do",
    "trying_placeholder": null,
    "happened_label": "What actually happened",
    "happened_placeholder": null
  },
  "person_in_spark": {
    "grade": "turbid",
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
Summary: state=settled · substitution_detected=n/a · swirl=no · changed=[Grape]
Request:
```json
{
  "spark_summary": "A better scheduling app for gym owners.",
  "person_name": "Marco",
  "relationship": "owns the boxing gym where I train",
  "maturity_class": 1
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
    "named_person": "Marco",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present: Marco. The stated relationship is that he owns the boxing gym where the user trains.",
    "anchor_span": "owns the boxing gym where I train"
  },
  "next_question": {
    "should_advance": false,
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
Summary: outcome=insufficient · problem=none · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "A better scheduling app for gym owners.",
  "user_line": "A better scheduling app for gym owners.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "gym owners",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": "better scheduling",
    "domain": "gyms",
    "solution_is_software": "software"
  },
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1
}
```
Response:
```json
{
  "schema_version": "m2.v2",
  "mechanism": "M2",
  "phase": "problem",
  "outcome": "insufficient",
  "problem": null,
  "gap_in_play": false,
  "question": null,
  "recovered_problem": null,
  "needs_confirmation": false,
  "server_checks": {
    "schema_valid": true,
    "model_outcome": "guessed",
    "outcome": "insufficient",
    "downgrades": [
      {
        "from": "guessed",
        "to": "insufficient",
        "reason": "words_not_in_spark",
        "words": [
          "currently",
          "manage",
          "bookings"
        ],
        "text": "Gym owners cannot get better scheduling from the way they currently manage bookings."
      }
    ],
    "unsupported_words": [
      "currently",
      "manage",
      "bookings"
    ],
    "visible_style_violations_cleaned": [],
    "m2_question_repaired": false
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none