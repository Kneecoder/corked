# Corked Runner Report — spark 01

Generated: 2026-10-21T16:38:37.990Z
Worker: http://127.0.0.1:8789

## Test under this spark
Control — everything settles. Expect: cellar_ready, problem_forced_verbatim true, needs_confirmation false, gap_in_play false (no gap bar in M2 response). All six elements settled by M7. M4 contrast: is_different_kind "true", same_or_different "different". Zero substitution flags, zero anomalies.

## Raw Spark
```
An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.
```

Maturity class: 0
Grape: Lena — my cousin, she shoots weddings
expect_halt: false

Line sent to the worker (the spark as typed): "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot."

M0's line (verbatim, not shown in the app): "A way for wedding photographers to not lose their deposit when couples cancel two days before the shoot."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → settled (last raised by M4)
  raw grades: M3=settled, M4=settled
- **Limit**: inert — history: inert

## Halt
⛔ M6 request failed.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.",
  "user_line_candidate": "A way for wedding photographers to not lose their deposit when couples cancel two days before the shoot.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "wedding photographers",
    "suspected_problem": "wedding photographers lose their deposit when couples cancel two days before the shoot",
    "triggering_situation": "couples cancel two days before the shoot",
    "promised_change": null,
    "domain": "wedding photography",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is wedding photographers and the stated problem is losing the deposit when couples cancel two days before the shoot. Both enter the cellar cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific wedding photographer and the moment a couple cancelled two days before the shoot.",
    "hint": "A good answer is one photographer you know of, and the one cancellation where the deposit was lost.",
    "person_label": "Photographer",
    "person_placeholder": "Dana, wedding photographer",
    "when_label": "When the couple cancelled",
    "when_placeholder": "two days before a Saturday wedding shoot",
    "trying_label": "What the photographer was trying to do",
    "trying_placeholder": "keep the deposit after the couple cancelled",
    "happened_label": "What happened with the deposit",
    "happened_placeholder": "The couple messaged on Thursday to cancel a Saturday shoot, and the photographer lost the deposit."
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
  "spark_summary": "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.",
  "person_name": "Lena",
  "relationship": "my cousin, she shoots weddings",
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
    "named_person": "Lena",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "Lena is a named individual with a stated tie as a cousin. She shoots weddings, which places her inside the spark's customer group.",
    "anchor_span": "my cousin, she shoots weddings"
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
Summary: outcome=stated · problem="wedding photographers who lose their deposit when couples cancel two days before the shoot" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.",
  "user_line": "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "wedding photographers",
    "suspected_problem": "wedding photographers lose their deposit when couples cancel two days before the shoot",
    "triggering_situation": "couples cancel two days before the shoot",
    "promised_change": null,
    "domain": "wedding photography",
    "solution_is_software": "software"
  },
  "grape_name": "Lena",
  "grape_relationship": "my cousin, she shoots weddings",
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
    "text": "wedding photographers who lose their deposit when couples cancel two days before the shoot",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "What did Lena actually do the specific time a couple cancelled two days before the shoot and she lost her deposit?",
  "recovered_problem": "wedding photographers who lose their deposit when couples cancel two days before the shoot",
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.",
  "grape_name": "Lena",
  "grape_relationship": "my cousin, she shoots weddings",
  "maturity_class": 0,
  "problem": {
    "text": "wedding photographers who lose their deposit when couples cancel two days before the shoot",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "user_answer": "Last Saturday a couple cancelled on Thursday night. Lena spent the morning re-reading her contract clause, then wrote off the deposit and blocked the date in her calendar anyway."
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "friction",
  "state": "settled",
  "tell": {
    "state": "settled",
    "anchor_span": "Lena spent the morning re-reading her contract clause, then wrote off the deposit and blocked the date in her calendar anyway."
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Saturday a couple cancelled on Thursday night."
  },
  "observation": {
    "surface_text": "Lena's actions are named as observable steps: re-reading the contract clause, writing off the deposit, blocking the date. The moment is anchored to one instance, a Thursday night cancellation reported last Saturday.",
    "anchor_span": "Lena spent the morning re-reading her contract clause, then wrote off the deposit and blocked the date in her calendar anyway."
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_floor": true,
    "swirl_included": false
  }
}
```

### 5. [main] M3 · /m3
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Echo]
Request:
```json
{
  "problem": {
    "text": "wedding photographers who lose their deposit when couples cancel two days before the shoot",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Lena",
  "grape_relationship": "my cousin, she shoots weddings",
  "maturity_class": 0,
  "user_answer": "My colleague Jordan, another wedding photographer, told me last month he now takes half the fee upfront through a payment link after a March cancellation burned him."
}
```
Response:
```json
{
  "schema_version": "m3.v1",
  "mechanism": "M3",
  "state": "settled",
  "echo": {
    "state": "settled",
    "anchor_span": "My colleague Jordan, another wedding photographer, told me last month he now takes half the fee upfront through a payment link after a March cancellation burned him."
  },
  "observation": {
    "surface_text": "The answer names Jordan, a separate wedding photographer who is neither Lena nor the founder, and states one concrete behaviour: taking half the fee upfront through a payment link after a March cancellation.",
    "anchor_span": "he now takes half the fee upfront through a payment link"
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": false
  }
}
```

### 6. [main] M4 · /m4
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "problem": {
    "text": "wedding photographers who lose their deposit when couples cancel two days before the shoot",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Lena",
  "grape_relationship": "my cousin, she shoots weddings",
  "maturity_class": 0,
  "prior_echo_context": "My colleague Jordan, another wedding photographer, told me last month he now takes half the fee upfront through a payment link after a March cancellation burned him.",
  "user_answer": "Priya, a wedding caterer I met at a market, keeps a paper deposit ledger per event. For her the pain is cancellations inside 48 hours, the payment part is fine."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "settled",
  "echo": {
    "state": "settled",
    "anchor_span": "Priya, a wedding caterer I met at a market, keeps a paper deposit ledger per event."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "same",
    "anchor_span": "For her the pain is cancellations inside 48 hours, the payment part is fine."
  },
  "observation": {
    "surface_text": "The answer names Priya, a wedding caterer distinct from Lena and Jordan, who keeps a paper deposit ledger per event and feels the pain at cancellations inside 48 hours.",
    "anchor_span": "keeps a paper deposit ledger per event"
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": false
  }
}
```

### 7. [main] M5 · /m5
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "problem": {
    "text": "wedding photographers who lose their deposit when couples cancel two days before the shoot",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Lena",
  "grape_relationship": "my cousin, she shoots weddings",
  "maturity_class": 0,
  "user_answer": "Lena uses a HoneyBook contract template, but it stores no card on file, so when the couple ghosted there was nothing to charge."
}
```
Response:
```json
{
  "schema_version": "m5.v1",
  "mechanism": "M5",
  "state": "settled",
  "gap": {
    "state": "settled",
    "anchor_span": "Lena uses a HoneyBook contract template, but it stores no card on file, so when the couple ghosted there was nothing to charge."
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a HoneyBook contract template. The failure point is precise, since the template stores no card on file and leaves nothing to charge when a couple cancels.",
    "anchor_span": "it stores no card on file, so when the couple ghosted there was nothing to charge"
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": false
  }
}
```

### 8. [main] M6 · /m6
Summary: ERROR 502
Request:
```json
{
  "problem": {
    "text": "wedding photographers who lose their deposit when couples cancel two days before the shoot",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Lena",
  "grape_relationship": "my cousin, she shoots weddings",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I am done being the bad guy about deposits,\" she said after the March one."
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