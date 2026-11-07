# Corked Runner Report — spark 27

Generated: 2026-11-07T14:15:00.379Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M0 on an experiment spark: digestibility and the scope gate. Baseline only: no expected grade given.

## Raw Spark
```
A trivia app for football fans to challenge each others ballknowledge.
```

Maturity class: 0
Grape: (none) — (none)
expect_halt: maybe

Line sent to the worker (the spark as typed): "A trivia app for football fans to challenge each others ballknowledge."

M0's line (verbatim, not shown in the app): "A trivia app for football fans to challenge each other's ball knowledge."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ Stops after M0: this case checks M0 and its scope gate only.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=bottleable_cloudy · in_scope=true · followup_needed=true
Request:
```json
{
  "raw_spark": "A trivia app for football fans to challenge each others ballknowledge."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A trivia app for football fans to challenge each others ballknowledge.",
  "user_line_candidate": "A trivia app for football fans to challenge each other's ball knowledge.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "football fans",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "football",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "suspected_problem"
    ],
    "reason": "Bottleable, cloudy. The app form, the population, and the football domain are visible, but no problem is stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "What problem are football fans having with testing or challenging each other's football knowledge right now?"
  },
  "m1_setup": {
    "question": "Name a specific football fan and the moment they wanted to challenge someone else's football knowledge but couldn't.",
    "hint": "A good answer names the person, what they were trying to do with another fan, and what got in the way.",
    "person_label": "Football fan",
    "person_placeholder": "Jake, weekend league player and football obsessive",
    "when_label": "When did it happen",
    "when_placeholder": "after a match when an argument broke out about player stats",
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
  },
  "ai_fields": [
    "user_line_candidate",
    "digestibility.reason",
    "followup.question",
    "m1_setup.question",
    "m1_setup.hint",
    "m1_setup.person_label",
    "m1_setup.person_placeholder",
    "m1_setup.when_label",
    "m1_setup.when_placeholder",
    "m1_setup.trying_label",
    "m1_setup.happened_label",
    "spark_parse.solution_form",
    "spark_parse.implied_person",
    "spark_parse.domain",
    "digestibility.missing"
  ],
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none