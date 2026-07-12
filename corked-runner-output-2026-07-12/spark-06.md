# Corked Runner Report — spark 06

Generated: 2026-07-12T15:42:30.491Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Unbottleable rescue guard. Expect: unbottleable on first pass. Followup supplies a person only (no domain, no problem), so unbottleable_rescue_blocked true and state stays unbottleable. Chain halts. If it re-bottles, the rescue guard has a hole.

## Raw Spark
```
Something that makes life easier.
```

Maturity class: 1
Grape: (none) — (none)
expect_halt: true

User Line candidate (verbatim from M0): "Something that makes life easier for freelancers."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ M0 remained unbottleable after followup.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=unbottleable · in_scope=true · followup_needed=true
Request:
```json
{
  "raw_spark": "Something that makes life easier."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "Something that makes life easier.",
  "user_line_candidate": "Something that makes life easier.",
  "spark_parse": {
    "solution_form": null,
    "implied_person": null,
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": null,
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "unbottleable",
    "missing": [
      "person or role",
      "domain",
      "problem"
    ],
    "reason": "Not bottleable yet. No person, no domain, and no problem are present. There is nothing to age.",
    "can_seal": false,
    "requires_followup_before_seal": true
  },
  "followup": {
    "needed": true,
    "question": "Who is this for, and what problem are they sitting with before they find it?"
  },
  "m1_setup": {
    "question": "Name the specific person and the moment this idea starts from.",
    "hint": "A good answer names a real person, what they were dealing with, and what went wrong.",
    "person_label": "Person",
    "person_placeholder": null,
    "when_label": "When",
    "when_placeholder": null,
    "trying_label": "Trying to",
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

### 2. [main] M0 · /m0 (followup)
Summary: [re-bottled] digestibility=unbottleable
Request:
```json
{
  "raw_spark": "Something that makes life easier.",
  "followup_question": "Who is this for, and what problem are they sitting with before they find it?",
  "followup_answer": "It's for freelancers.",
  "prior_digestibility": "unbottleable"
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "Something that makes life easier.",
  "user_line_candidate": "Something that makes life easier for freelancers.",
  "spark_parse": {
    "solution_form": null,
    "implied_person": "freelancers",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": null,
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "unbottleable",
    "missing": [
      "problem",
      "domain"
    ],
    "reason": "Not bottleable yet. A population is visible but no problem is stated, and there is no domain or situation to work with.",
    "can_seal": false,
    "requires_followup_before_seal": true
  },
  "followup": {
    "needed": true,
    "question": "What is going wrong for freelancers, and in what part of their work does it happen?"
  },
  "m1_setup": {
    "question": "Name a specific freelancer and the moment this problem shows up for them.",
    "hint": "A good answer names what the freelancer is trying to do and what goes wrong before they can do it.",
    "person_label": "Freelancer",
    "person_placeholder": "e.g. Dana, independent graphic designer",
    "when_label": "When it happens",
    "when_placeholder": null,
    "trying_label": "What they were trying to do",
    "trying_placeholder": null,
    "happened_label": "What actually happened",
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

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none