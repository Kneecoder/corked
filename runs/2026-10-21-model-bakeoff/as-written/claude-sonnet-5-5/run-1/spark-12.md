# Corked Runner Report — spark 12

Generated: 2026-10-21T16:36:55.709Z
Worker: http://127.0.0.1:8789

## Test under this spark
Class 2 self battery. Expect: M1 self-mode settled (concrete instance present). M3 echo turbid — the Echo can never be the speaker; observation pivots away from self. M4 settled (separate person satisfies self mode). M5 settled — self's own current tool is the one place self counts as Gap material, and the founder's own build exclusion does not fire on a budgeting app he did not build. M6 response omits the echo field entirely; record how the words bar grades a self-quote (mild corner, real exchange with oneself). M7 settled.

## Raw Spark
```
An app to stop myself doomchecking my bank balance at the end of every month.
```

Maturity class: 2
Grape: Jamie — Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.
expect_halt: false

Line sent to the worker (the spark as typed): "An app to stop myself doomchecking my bank balance at the end of every month."

M0's line (verbatim, not shown in the app): "An app for the speaker to stop doomchecking their bank balance at the end of every month."

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
  "raw_spark": "An app to stop myself doomchecking my bank balance at the end of every month."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app to stop myself doomchecking my bank balance at the end of every month.",
  "user_line_candidate": "An app for the speaker to stop doomchecking their bank balance at the end of every month.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "the speaker",
    "suspected_problem": "doomchecking their bank balance",
    "triggering_situation": "the end of every month",
    "promised_change": "stop doomchecking their bank balance",
    "domain": "bank balance",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The speaker is the role, and doomchecking the bank balance at the end of every month is the stated problem.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific person who doomchecks their bank balance and the moment it last happened.",
    "hint": "A good answer names one person and the last time they opened the balance at month end, with what they did next.",
    "person_label": "Account holder",
    "person_placeholder": "Priya, freelance designer",
    "when_label": "When it happened",
    "when_placeholder": "the last evening of last month, after rent went out",
    "trying_label": "What they were doing",
    "trying_placeholder": "checking the balance before deciding whether to spend",
    "happened_label": "What happened",
    "happened_placeholder": "She opened the banking app four times in one evening, closed it each time without doing anything, and felt worse after each look."
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

### 2. [main] M1 · none (self mode, not graded)
Summary: state=settled · substitution_detected=n/a · swirl=no · changed=[Grape]
Request:
```json
null
```
Response:
```json
{
  "schema_version": "m1.v1",
  "mechanism": "M1",
  "outcome": "settled",
  "grape": {
    "state": "settled",
    "named_person": "Jamie",
    "person_kind": "self"
  },
  "observation": {
    "surface_text": "",
    "anchor_span": null
  },
  "next_question": {
    "should_advance": true,
    "framing": null
  }
}
```

### 3. [main] M2 · /m2 (phase A)
Summary: ERROR 502
Request:
```json
{
  "phase": "problem",
  "raw_spark": "An app to stop myself doomchecking my bank balance at the end of every month.",
  "user_line": "An app to stop myself doomchecking my bank balance at the end of every month.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "the speaker",
    "suspected_problem": "doomchecking their bank balance",
    "triggering_situation": "the end of every month",
    "promised_change": "stop doomchecking their bank balance",
    "domain": "bank balance",
    "solution_is_software": "software"
  },
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2
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