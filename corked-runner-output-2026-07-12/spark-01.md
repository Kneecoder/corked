# Corked Runner Report — spark 01

Generated: 2026-07-12T15:40:11.337Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Control — everything settles. Expect: cellar_ready, problem_forced_verbatim true, needs_confirmation false, gap_in_play false (no gap bar in M2 response). All six elements settled by M7. M4 contrast: is_different_kind "true", same_or_different "different". Zero substitution flags, zero anomalies.

## Raw Spark
```
An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.
```

Maturity class: 0
Grape: Lena — my cousin, she shoots weddings
expect_halt: false

User Line candidate (verbatim from M0): "A way for wedding photographers to avoid losing their deposit when couples cancel two days before the shoot."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=clearing
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
  "user_line_candidate": "A way for wedding photographers to avoid losing their deposit when couples cancel two days before the shoot.",
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
    "reason": "Cellar-ready. The role is wedding photographers and the stated problem is deposit loss on late cancellations. Both are present and the spark enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific wedding photographer and the moment they found out a couple had cancelled two days before the shoot.",
    "hint": "A good answer names the photographer, when the cancellation came in, what they were counting on from that deposit, and what actually happened to it.",
    "person_label": "Photographer",
    "person_placeholder": "Priya, freelance wedding photographer",
    "when_label": "When the cancellation came in",
    "when_placeholder": "two days before a Saturday shoot she had held for six months",
    "trying_label": "What she was counting on",
    "trying_placeholder": "cover her equipment rental booked for that weekend",
    "happened_label": "What happened to the deposit",
    "happened_placeholder": "the couple disputed the charge and she got nothing back"
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
  "spark_summary": "A way for wedding photographers to avoid losing their deposit when couples cancel two days before the shoot.",
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
    "surface_text": "A named individual is present. A real occupational tie is stated.",
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
Summary: recovered_problem="losing their deposit when couples cancel two days before the shoot" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "A way for wedding photographers to avoid losing their deposit when couples cancel two days before the shoot.",
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
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "losing their deposit when couples cancel two days before the shoot",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names a specific financial loss tied to a specific cancellation window. The implied person is Lena, a wedding photographer with a direct relationship to the speaker.",
    "problem_source": "explicit"
  },
  "question": "Walk me through the last time Lena lost a deposit to a late cancellation, what did the couple say, and what did she actually do next?",
  "hint": "A strong answer names the shoot date, the cancellation notice Lena received, and the concrete action she took after the deposit was gone, rebooking attempts, contract disputes, or absorbing the loss.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash",
      "hint:dash"
    ],
    "m2_question_repaired": false,
    "problem_forced_verbatim": true
  }
}
```

### 4. [main] M2 · /m2
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "A way for wedding photographers to avoid losing their deposit when couples cancel two days before the shoot.",
  "grape_name": "Lena",
  "grape_relationship": "my cousin, she shoots weddings",
  "maturity_class": 0,
  "confirmed_problem": "losing their deposit when couples cancel two days before the shoot",
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
  "state": "clearing",
  "tell": {
    "state": "clearing",
    "anchor_span": "wrote off the deposit and blocked the date in her calendar anyway"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Saturday a couple cancelled on Thursday night"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a single named instance. The tell names calendar blocking and writing off the deposit, but the confirmed problem is losing the deposit when couples cancel, and the behaviour described is Lena absorbing that loss rather than a filmable attempt to recover or contest it.",
    "anchor_span": "wrote off the deposit and blocked the date in her calendar anyway"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "When Lena wrote off the deposit, was that her own decision, or had the couple already refused to pay before she reached the contract clause?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_floor": true,
    "swirl_included": true
  }
}
```

### 5. [main] M3 · /m3
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Echo]
Request:
```json
{
  "confirmed_problem": "losing their deposit when couples cancel two days before the shoot",
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
    "anchor_span": "My colleague Jordan, another wedding photographer, told me last month he now takes half the fee upfront through a payment link after a March cancellation burned him"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "after a March cancellation burned him"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Jordan, a colleague, taking a concrete action: collecting half the fee upfront via a payment link. The Vintage bar finds a specific anchoring instance: a March cancellation that prompted the change.",
    "anchor_span": "after a March cancellation burned him"
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
  "confirmed_problem": "losing their deposit when couples cancel two days before the shoot",
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
    "anchor_span": "Priya, a wedding caterer I met at a market, keeps a paper deposit ledger per event"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "cancellations inside 48 hours"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "same",
    "anchor_span": "a wedding caterer I met at a market"
  },
  "observation": {
    "surface_text": "The Echo bar finds a named, identifiable second person distinct from Lena and Jordan, with a concrete behaviour: maintaining a paper deposit ledger per event to manage late cancellation exposure. The Vintage bar finds a recurring pattern rather than a specific anchored instance.",
    "anchor_span": "Priya, a wedding caterer I met at a market, keeps a paper deposit ledger per event"
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
  "confirmed_problem": "losing their deposit when couples cancel two days before the shoot",
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
    "anchor_span": "HoneyBook contract template, but it stores no card on file, so when the couple ghosted there was nothing to charge"
  },
  "observation": {
    "surface_text": "The answer names HoneyBook contract template as the existing solution in use. The precise failure point is present: it stores no card on file, leaving no payment instrument to charge when a couple cancels.",
    "anchor_span": "HoneyBook contract template, but it stores no card on file, so when the couple ghosted there was nothing to charge"
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
  "confirmed_problem": "losing their deposit when couples cancel two days before the shoot",
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
    "anchor_span": "I am done being the bad guy about deposits"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "I am done being the bad guy about deposits"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a flagged real exchange is present, meeting the Words settled bar. The words carry a stated feeling about deposit enforcement but no filmable action or third-party reference.",
    "anchor_span": "I am done being the bad guy about deposits"
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
  "confirmed_problem": "losing their deposit when couples cancel two days before the shoot",
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
    "surface_text": "The answer names a bounded individual with a specific work arrangement that excludes the problem. The reason for immunity is present and mechanistically precise: retainer billing renders per-shoot cancellations financially inert.",
    "anchor_span": "the retainer bills monthly whether shoots happen or not"
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
- M4 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).