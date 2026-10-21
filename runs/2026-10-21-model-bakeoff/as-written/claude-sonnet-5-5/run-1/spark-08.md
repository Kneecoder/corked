# Corked Runner Report — spark 08

Generated: 2026-10-21T16:36:10.868Z
Worker: http://127.0.0.1:8789

## Test under this spark
Sanitizer mutation probe — proven-bug regression. Record user_line_candidate verbatim. cleanVisibleText strips "not just", which can turn "do not just pay late" into "do pay late" — a meaning inversion. If the line mutates, the known sanitizer bug has regressed into user-facing text. If M0 rephrases to avoid the construction while keeping both facts (late AND partial), that is a pass.

## Raw Spark
```
A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.
```

Maturity class: 0
Grape: Bram — my uncle, owns four rental flats
expect_halt: false

Line sent to the worker (the spark as typed): "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."

M0's line (verbatim, not shown in the app): "A tool for landlords when tenants pay in random partial chunks nobody can reconcile."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ M2 request failed.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "user_line_candidate": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "landlords",
    "suspected_problem": "tenants pay in random partial chunks nobody can reconcile",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "landlords and tenant payments",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is landlords and the stated problem is tenants paying in random partial chunks nobody can reconcile. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific landlord and the moment a tenant's partial payment arrived that nobody could reconcile.",
    "hint": "A good answer names one landlord and one tenant payment that did not add up.",
    "person_label": "Landlord",
    "person_placeholder": "Dana, landlord with a few rental units",
    "when_label": "When the partial payments arrived",
    "when_placeholder": "the third partial payment in one month",
    "trying_label": "What the landlord was trying to do",
    "trying_placeholder": "match the payments to the rent owed",
    "happened_label": "What happened with the payments",
    "happened_placeholder": "Three transfers of different amounts came in over two weeks and the landlord could not tell which month they covered."
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
Summary: state=settled · substitution_detected=n/a · swirl=no · changed=[Grape]
Request:
```json
{
  "spark_summary": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "person_name": "Bram",
  "relationship": "my uncle, owns four rental flats",
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
    "named_person": "Bram",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "Bram is named and tied to the idea as an uncle who owns four rental flats. The name and the relationship together identify a specific individual.",
    "anchor_span": "my uncle, owns four rental flats"
  },
  "next_question": {
    "should_advance": true,
    "framing": "Move to a specific moment when Bram dealt with a tenant paying in partial chunks."
  },
  "server_checks": {
    "schema_valid": true,
    "anchor_verified": true,
    "visible_style_violations_cleaned": []
  }
}
```

### 3. [main] M2 · /m2 (phase A)
Summary: outcome=stated · problem="tenants do not just pay late, they pay in random partial chunks nobody can reconcile" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "user_line": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "landlords",
    "suspected_problem": "tenants pay in random partial chunks nobody can reconcile",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "landlords and tenant payments",
    "solution_is_software": "software"
  },
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v2",
  "mechanism": "M2",
  "phase": "problem",
  "outcome": "stated",
  "problem": {
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "Bram has watched tenants pay in random partial chunks, so what did he actually do the last time he tried to reconcile one of those payments?",
  "recovered_problem": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
  "needs_confirmation": false,
  "server_checks": {
    "schema_valid": true,
    "model_outcome": "stated",
    "outcome": "stated",
    "downgrades": [],
    "unsupported_words": [],
    "visible_style_violations_cleaned": [],
    "m2_question_repaired": false
  }
}
```

### 4. [main] M2 · /m2
Summary: ERROR 502
Request:
```json
{
  "user_line": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "problem": {
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "user_answer": "Last month a tenant sent three separate partial payments across two weeks, and Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand."
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
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M0.raw_spark: "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M2-phaseA.recovered_problem: "tenants do not just pay late, they pay in random partial chunks nobody can reconcile"
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M2-phaseA.problem.text: "tenants do not just pay late, they pay in random partial chunks nobody can reconcile"

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none