# Corked Runner Report — spark 20

Generated: 2026-07-11T18:31:39.191Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Class 3 FIND path. Expect: chain stops after M0, one /field call in find mode. The brief must not assert a problem the spark never stated, target drawn from the spark's own nouns (gardeners, vegetables, allotment), question open and past-anchored, no pitch, no "would you use". A generic "ask them about their workflow" brief is a fail.

## Raw Spark
```
A mobile app for allotment gardeners to swap surplus vegetables.
```

Maturity class: 3
Grape: (none) — (none)
expect_halt: true

User Line candidate (verbatim from M0): "A mobile app for allotment gardeners to swap surplus vegetables, when vegetables rot on the plot because there is no shared way to see who has surplus and who wants some."

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
  "raw_spark": "A mobile app for allotment gardeners to swap surplus vegetables."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A mobile app for allotment gardeners to swap surplus vegetables.",
  "user_line_candidate": "A mobile app for allotment gardeners to swap surplus vegetables.",
  "spark_parse": {
    "solution_form": "mobile app",
    "implied_person": "allotment gardeners",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "surplus vegetables",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "suspected_problem"
    ],
    "reason": "Bottleable, cloudy. The form, the population, and the surplus vegetables are visible, but no problem is stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "What problem are allotment gardeners having with surplus vegetables?"
  },
  "m1_setup": {
    "question": "Name a specific allotment gardener and the moment they were sitting with more vegetables than they knew what to do with.",
    "hint": "A good answer names one person and describes a specific moment at the allotment, not a general habit.",
    "person_label": "Allotment gardener",
    "person_placeholder": "Janet, allotment plot holder",
    "when_label": "When it happened",
    "when_placeholder": "end of a courgette glut in late August",
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

### 2. [main] M0 · /m0 (followup)
Summary: [re-bottled] digestibility=cellar_ready
Request:
```json
{
  "raw_spark": "A mobile app for allotment gardeners to swap surplus vegetables.",
  "followup_question": "What problem are allotment gardeners having with surplus vegetables?",
  "followup_answer": "Vegetables rot on the plot before anyone finds out who has surplus and who wants some, because there's no shared way to see it.",
  "prior_digestibility": "bottleable_cloudy"
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A mobile app for allotment gardeners to swap surplus vegetables.",
  "user_line_candidate": "A mobile app for allotment gardeners to swap surplus vegetables, when vegetables rot on the plot because there is no shared way to see who has surplus and who wants some.",
  "spark_parse": {
    "solution_form": "mobile app",
    "implied_person": "allotment gardeners",
    "suspected_problem": "vegetables rot on the plot before anyone finds out who has surplus and who wants some",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "surplus vegetables",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear, the problem is stated, and the domain is tight. The followup confirmed the rot and the visibility gap.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific allotment gardener this starts from and the moment they were sitting with surplus vegetables and no way to move them.",
    "hint": "A good answer names one gardener, what they had going spare, and what happened to it before anyone knew.",
    "person_label": "Allotment gardener",
    "person_placeholder": "e.g. Donna, allotment plot holder",
    "when_label": "When the surplus appeared",
    "when_placeholder": "e.g. end of a courgette glut in late August",
    "trying_label": "What they were trying to do with the surplus",
    "trying_placeholder": "e.g. find someone on the site who wanted courgettes before they went soft",
    "happened_label": "What actually happened",
    "happened_placeholder": "e.g. the courgettes rotted on the plot because she had no way to tell the other forty plot holders she had them"
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

### 3. [park] M1 · /field
Summary: brief target="allotment gardener with surplus"
Request:
```json
{
  "mode": "find",
  "user_line": "A mobile app for allotment gardeners to swap surplus vegetables, when vegetables rot on the plot because there is no shared way to see who has surplus and who wants some.",
  "spark_parse": {
    "solution_form": "mobile app",
    "implied_person": "allotment gardeners",
    "suspected_problem": "vegetables rot on the plot before anyone finds out who has surplus and who wants some",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "surplus vegetables",
    "solution_is_software": "software"
  },
  "maturity_class": 3,
  "missing": "grape",
  "grape_name": "",
  "grape_relationship": "",
  "confirmed_problem": "",
  "element": null
}
```
Response:
```json
{
  "brief": {
    "kind": "find",
    "setup": "Find an allotment gardener, someone with a plot who grows more than they use.",
    "question": "Walk me through what happens to your surplus vegetables, and tell me about the last time something rotted before you could move it on.",
    "target": "allotment gardener with surplus"
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none