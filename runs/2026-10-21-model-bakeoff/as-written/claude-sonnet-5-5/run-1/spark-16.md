# Corked Runner Report — spark 16

Generated: 2026-10-21T16:37:35.591Z
Worker: http://127.0.0.1:8789

## Test under this spark
M5 one leg — with secondary M7 probe. Expect: M5 gap clearing — named solution, no failure point. M7 limit clearing — a who without a why, and a loose category rather than a bounded group. (m2, m3, m4, m6 not specified by the brief — left on generic settled-quality placeholders.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

Line sent to the worker (the spark as typed): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

M0's line (verbatim, not shown in the app): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

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
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is one-man trade businesses and the stated problem is forgetting to chase unpaid invoices until the money is a problem.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name one one-man trade business owner you have seen forget to chase an unpaid invoice, and the moment the money became a problem.",
    "hint": "A good answer is a specific tradesperson and a specific invoice that sat unpaid until it hurt.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, self-employed plumber",
    "when_label": "When the money became a problem",
    "when_placeholder": "the week his van insurance came due",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "pay a bill while an invoice was still unpaid",
    "happened_label": "What actually happened",
    "happened_placeholder": "Dave looked at his account, saw an invoice from six weeks ago still unpaid, and had not yet contacted the customer."
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
    "m1_placeholders_nulled": false
  }
}
```

### 2. [main] M1 · /m1
Summary: ERROR 502
Request:
```json
{
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Noor",
  "relationship": "my friend, runs a one-woman landscaping business",
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