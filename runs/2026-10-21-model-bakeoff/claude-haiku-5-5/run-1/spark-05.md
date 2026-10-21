# Corked Runner Report — spark 05

Generated: 2026-10-21T16:39:57.319Z
Worker: http://127.0.0.1:8790

## Test under this spark
Scope asymmetry probe — doctrine tension, either outcome is a finding. Expect one of two outcomes, both worth recording verbatim: (a) Out of scope — "bookstore" read as physical store, meaning M0 doctrine's own canonical thin-spark example is unreachable behind the scope gate (a doctrine note for v46, not a code bug); or (b) passes as thin — then assert suspected_problem null, m1_placeholders_nulled true, followup uses only spark nouns (books, cans — never literacy, barter, recycling, currency).

## Raw Spark
```
A bookstore for homeless people where you pay with cans.
```

Maturity class: 3
Grape: (none) — (none)
expect_halt: maybe

Line sent to the worker (the spark as typed): "A bookstore for homeless people where you pay with cans."

M0's line (verbatim, not shown in the app): "A bookstore for homeless people where cans are used as payment."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ Maturity class 3: chain stops after M0 (routes to "find a person" park screen), matching real client behaviour.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=bottleable_cloudy · in_scope=true · followup_needed=true
Request:
```json
{
  "raw_spark": "A bookstore for homeless people where you pay with cans."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A bookstore for homeless people where you pay with cans.",
  "user_line_candidate": "A bookstore for homeless people where cans are used as payment.",
  "spark_parse": {
    "solution_form": "bookstore",
    "implied_person": "homeless people",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "books",
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "suspected_problem"
    ],
    "reason": "Bottleable, cloudy. The form, the population, and the cans are visible, but no problem is stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "What problem are homeless people having with books?"
  },
  "m1_setup": {
    "question": "Name the specific homeless person this bookstore starts from, and the moment they tried to get a book with cans.",
    "hint": "A good answer names one person and a single occasion where they wanted a book and had cans but no way to use them.",
    "person_label": "Reader",
    "person_placeholder": "Dana, living in a shelter",
    "when_label": "When",
    "when_placeholder": "the week after she collected cans for a bus pass",
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

### 2. [park] M1 · /field
Summary: ERROR 422
Request:
```json
{
  "mode": "find",
  "user_line": "A bookstore for homeless people where you pay with cans.",
  "spark_parse": {
    "solution_form": "bookstore",
    "implied_person": "homeless people",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "books",
    "solution_is_software": "unstated"
  },
  "maturity_class": 3,
  "missing": "grape",
  "grape_name": "",
  "grape_relationship": "",
  "problem": null,
  "element": null
}
```
Response:
```json
{
  "error": "brief_impossible"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none