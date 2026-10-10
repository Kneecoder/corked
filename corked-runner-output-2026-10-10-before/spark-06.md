# Corked Runner Report — spark 06

Generated: 2026-10-10T12:47:39.265Z
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

Line sent to the worker (M0's line): "Something that makes life easier."

M0's line (verbatim, not shown in the app): "Something that makes life easier."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ M0: unbottleable, nothing to bottle.

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
    "reason": "Not bottleable yet. No person, domain, or problem is present. There is nothing to bottle.",
    "can_seal": false,
    "requires_followup_before_seal": true
  },
  "followup": {
    "needed": true,
    "question": "Who is sitting with a problem here, and what is going wrong for them?"
  },
  "m1_setup": {
    "question": "Name the specific person this starts from and the moment when life was not easy for them.",
    "hint": "A good answer names a real person, what they were trying to do, and what actually happened.",
    "person_label": "Person",
    "person_placeholder": "e.g. Dana, a nurse working double shifts",
    "when_label": "When it happened",
    "when_placeholder": "e.g. after her third consecutive overnight",
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