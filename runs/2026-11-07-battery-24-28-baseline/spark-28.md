# Corked Runner Report — spark 28

Generated: 2026-11-07T14:15:09.495Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M0 on an experiment spark: digestibility and the scope gate. Baseline only: no expected grade given.

## Raw Spark
```
A daily game where you describe one picture in a single sentence.
```

Maturity class: 0
Grape: (none) — (none)
expect_halt: maybe

Line sent to the worker (the spark as typed): "A daily game where you describe one picture in a single sentence."

M0's line (verbatim, not shown in the app): "A daily game where you describe one picture in a single sentence."

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
  "raw_spark": "A daily game where you describe one picture in a single sentence."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A daily game where you describe one picture in a single sentence.",
  "user_line_candidate": "A daily game where you describe one picture in a single sentence.",
  "spark_parse": {
    "solution_form": "daily game",
    "implied_person": null,
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "pictures, sentences",
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "implied_person",
      "suspected_problem"
    ],
    "reason": "Bottleable, cloudy. The game form and the daily picture-and-sentence mechanic are visible, but no population and no problem are stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "Who is this game for, and what are they struggling with when it comes to describing pictures in a sentence?"
  },
  "m1_setup": {
    "question": "Name the specific person and the moment this game starts from: who are they, and when did you first see them stuck describing a picture?",
    "hint": "A good answer names a real person and a specific moment, such as a teacher watching a student stare at a picture and write nothing.",
    "person_label": "Player",
    "person_placeholder": "e.g. Yuki, a language learner",
    "when_label": "When the picture went undescribed",
    "when_placeholder": null,
    "trying_label": "What they were trying to do with the picture",
    "trying_placeholder": null,
    "happened_label": "What you saw happen instead",
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
    "m1_setup.trying_label",
    "m1_setup.happened_label",
    "spark_parse.solution_form",
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