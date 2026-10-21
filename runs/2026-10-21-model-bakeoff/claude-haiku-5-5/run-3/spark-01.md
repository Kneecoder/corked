# Corked Runner Report — spark 01

Generated: 2026-10-21T16:48:45.235Z
Worker: http://127.0.0.1:8790

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

M0's line (verbatim, not shown in the app): "A way for wedding photographers to keep their deposit when couples cancel two days before the shoot."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=settled, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

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
  "user_line_candidate": "A way for wedding photographers to keep their deposit when couples cancel two days before the shoot.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "wedding photographers",
    "suspected_problem": "losing their deposit when couples cancel two days before the shoot",
    "triggering_situation": "couples cancel two days before the shoot",
    "promised_change": null,
    "domain": "wedding photography",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role, the stated problem, and the cancellation timing are visible and enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific wedding photographer and the cancellation that cost them their deposit.",
    "hint": "A good answer names one photographer and one couple's cancellation, with the date it came in relative to the shoot.",
    "person_label": "Photographer",
    "person_placeholder": "Dana, wedding photographer",
    "when_label": "Cancellation",
    "when_placeholder": "the Saturday two days before a June shoot",
    "trying_label": "What they were trying to hold",
    "trying_placeholder": "keep the deposit and hold the date for the booking",
    "happened_label": "What actually happened",
    "happened_placeholder": "the couple cancelled by text, and the deposit was not returned"
  },
  "person_in_spark": {
    "grade": "turbid",
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
    "surface_text": "A named individual is present: Lena. The stated relationship is cousin, and she shoots weddings.",
    "anchor_span": "my cousin, she shoots weddings"
  },
  "next_question": {
    "should_advance": false,
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
Summary: outcome=guessed · problem="losing their deposit when couples cancel two days before the shoot" (system_hypothesis) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.",
  "user_line": "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "wedding photographers",
    "suspected_problem": "losing their deposit when couples cancel two days before the shoot",
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
  "outcome": "guessed",
  "problem": {
    "text": "losing their deposit when couples cancel two days before the shoot",
    "source": "system_hypothesis",
    "status": "proposed"
  },
  "gap_in_play": false,
  "question": "Walk me through the last time Lena lost a deposit when a couple cancelled two days before the shoot, and what she actually did next.",
  "recovered_problem": "losing their deposit when couples cancel two days before the shoot",
  "needs_confirmation": true,
  "server_checks": {
    "schema_valid": true,
    "model_outcome": "stated",
    "outcome": "guessed",
    "downgrades": [
      {
        "from": "stated",
        "to": "guessed",
        "reason": "stated_span_not_verbatim_in_spark",
        "text": "losing their deposit when couples cancel two days before the shoot"
      }
    ],
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
    "text": "losing their deposit when couples cancel two days before the shoot",
    "source": "system_hypothesis",
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
    "anchor_span": "spent the morning re-reading her contract clause, then wrote off the deposit and blocked the date in her calendar anyway"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Saturday a couple cancelled on Thursday night"
  },
  "observation": {
    "surface_text": "Lena re-read her contract clause for a morning, then wrote off the deposit and blocked the date in her calendar. The cancellation is anchored to one named Thursday night, last Saturday.",
    "anchor_span": "Last Saturday a couple cancelled on Thursday night"
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
    "text": "losing their deposit when couples cancel two days before the shoot",
    "source": "system_hypothesis",
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
    "surface_text": "A separate wedding photographer, Jordan, is named and has changed his practice to take half the fee upfront through a payment link after a March cancellation cost him money.",
    "anchor_span": "he now takes half the fee upfront through a payment link after a March cancellation burned him"
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
    "text": "losing their deposit when couples cancel two days before the shoot",
    "source": "system_hypothesis",
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
    "same_or_different": "different",
    "anchor_span": "For her the pain is cancellations inside 48 hours, the payment part is fine."
  },
  "observation": {
    "surface_text": "The answer names Priya, a wedding caterer distinct from the grape and from Jordan, who keeps a paper deposit ledger and locates her pain in cancellations inside 48 hours rather than in payment collection.",
    "anchor_span": "Priya, a wedding caterer I met at a market, keeps a paper deposit ledger per event."
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
    "text": "losing their deposit when couples cancel two days before the shoot",
    "source": "system_hypothesis",
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
    "surface_text": "The answer names an existing solution: a HoneyBook contract template. It states a precise failure point: the template stores no card on file, so no deposit could be charged when the couple ghosted.",
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "problem": {
    "text": "losing their deposit when couples cancel two days before the shoot",
    "source": "system_hypothesis",
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
  "schema_version": "m6.v1",
  "mechanism": "M6",
  "state": "settled",
  "words": {
    "state": "settled",
    "anchor_span": "\"I am done being the bad guy about deposits,\" she said after the March one."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I am done being the bad guy about deposits,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer carries a direct quotation attributed to the grape from a real exchange, which meets the words bar. The quoted line states a feeling about being cast as the enforcer but describes no filmable action.",
    "anchor_span": "\"I am done being the bad guy about deposits,\" she said after the March one."
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

### 9. [main] M7 · /m7
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Limit]
Request:
```json
{
  "problem": {
    "text": "losing their deposit when couples cancel two days before the shoot",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Lena",
  "grape_relationship": "my cousin, she shoots weddings",
  "maturity_class": 0,
  "user_answer": "Rob shoots corporate headshots on retainer for two agencies. Cancellations cost him nothing because the retainer bills monthly whether shoots happen or not."
}
```
Response:
```json
{
  "schema_version": "m7.v1",
  "mechanism": "M7",
  "state": "settled",
  "limit": {
    "state": "settled",
    "anchor_span": "Rob shoots corporate headshots on retainer for two agencies. Cancellations cost him nothing because the retainer bills monthly whether shoots happen or not."
  },
  "observation": {
    "surface_text": "The answer names an identifiable individual, Rob, who does not carry this problem. It states the reason: his retainer bills monthly regardless of whether shoots happen.",
    "anchor_span": "Cancellations cost him nothing because the retainer bills monthly whether shoots happen or not."
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

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).