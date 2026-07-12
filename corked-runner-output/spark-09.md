# Corked Runner Report — spark 09

Generated: 2026-07-11T18:23:57.786Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Cap-edge verbose problem. Expect: either M0 compresses suspected_problem under the 300-char field cap and the chain runs, or a downstream call 400s on "spark_parse.suspected_problem exceeds max length". The second outcome means legitimate verbose input kills the chain — a sturdiness finding to fix, not user error.

## Raw Spark
```
A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.
```

Maturity class: 0
Grape: Ilse — my physio, runs a two-person practice
expect_halt: false

User Line candidate (verbatim from M0): "A tool for physiotherapists in small practices when an insurer rejects a claim over a mismatched treatment code, forcing them to dig referral letters across systems, rewrite the claim in the insurer portal, and chase follow-up two weeks later, every single week."

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
  "raw_spark": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.",
  "user_line_candidate": "A tool for physiotherapists in small practices when an insurer rejects a claim over a mismatched treatment code, forcing them to dig referral letters across systems, rewrite the claim in the insurer portal, and chase follow-up two weeks later, every single week.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "physiotherapists in small practices",
    "suspected_problem": "insurer rejects a claim over a mismatched treatment code, requiring the physio to dig referral letters out of one system, cross-check a code list in a second system, rewrite the claim line by line in the insurer portal, and follow up two weeks later, every week, with no spare time in a two-person practice",
    "triggering_situation": "insurer rejects a claim over a mismatched treatment code",
    "promised_change": null,
    "domain": "insurer claims and treatment codes",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is physiotherapists in small practices and the problem is stated in full: a rejected insurer claim triggers a multi-system, multi-step rework process that recurs weekly with no capacity to absorb it.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific physiotherapist and the moment a claim rejection landed and the rework began.",
    "hint": "A good answer names one physio, the practice size, and what they were doing when the rejected claim arrived or when the follow-up chase was due.",
    "person_label": "Physiotherapist",
    "person_placeholder": "Danielle, solo physiotherapist in a two-person practice",
    "when_label": "When the rejection arrived",
    "when_placeholder": "a Tuesday afternoon when she had back-to-back patients booked",
    "trying_label": "What she was trying to do",
    "trying_placeholder": "get the resubmitted claim through before the insurer deadline",
    "happened_label": "What actually happened",
    "happened_placeholder": "she spent forty minutes switching between the referral system, the code list, and the insurer portal before running out of time and leaving a sticky note to follow up in two weeks"
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
  "spark_summary": "A tool for physiotherapists in small practices when an insurer rejects a claim over a mismatched treatment code, forcing them to dig referral letters across systems, rewrite the claim in the insurer portal, and chase follow-up two weeks later, every single week.",
  "person_name": "Ilse",
  "relationship": "my physio, runs a two-person practice",
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
    "named_person": "Ilse",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. A real operational relationship is stated.",
    "anchor_span": "my physio, runs a two-person practice"
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
Summary: ERROR 400
Request:
```json
{
  "user_line": "A tool for physiotherapists in small practices when an insurer rejects a claim over a mismatched treatment code, forcing them to dig referral letters across systems, rewrite the claim in the insurer portal, and chase follow-up two weeks later, every single week.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "physiotherapists in small practices",
    "suspected_problem": "insurer rejects a claim over a mismatched treatment code, requiring the physio to dig referral letters out of one system, cross-check a code list in a second system, rewrite the claim line by line in the insurer portal, and follow up two weeks later, every week, with no spare time in a two-person practice",
    "triggering_situation": "insurer rejects a claim over a mismatched treatment code",
    "promised_change": null,
    "domain": "insurer claims and treatment codes",
    "solution_is_software": "software"
  },
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0
}
```
Response:
```json
{
  "error": "spark_parse.suspected_problem exceeds max length of 300"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none