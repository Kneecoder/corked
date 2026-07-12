# Corked Phase 1 Test Battery — full raw output (20 sparks)

Consolidated from _summary.md + spark-01.md..spark-20.md for easy pasting into a fresh Claude conversation.

---

# Batch run summary — Corked Phase 1 Test Battery

Generated: 2026-07-11T18:31:39.192Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## 1. spark-01.md
Spark: An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.
Maturity: 0
Outcome: PASS (completed full chain)

## 2. spark-02.md
Spark: A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.
Maturity: 0
Outcome: PASS (completed full chain)

## 3. spark-03.md
Spark: A better scheduling app for gym owners.
Maturity: 1
Outcome: PASS (completed full chain)

## 4. spark-04.md
Spark: A sourdough bakery subscription for my street.
Maturity: 1
Outcome: PASS (halted as expected: Out of scope (non-software spark) — expected worker behaviour.)
Anomalies (1):
  - M0: flagged out_of_scope (non_software).

## 5. spark-05.md
Spark: A bookstore for homeless people where you pay with cans.
Maturity: 3
Outcome: RECORDED (halted: Out of scope (non-software spark) — expected worker behaviour.)
Anomalies (1):
  - M0: flagged out_of_scope (non_software).

## 6. spark-06.md
Spark: Something that makes life easier.
Maturity: 1
Outcome: PASS (halted as expected: M0 remained unbottleable after followup.)

## 7. spark-07.md
Spark: an app for my sister Marieke because customers are annoying with payments at her flower stall
Maturity: 0
Outcome: PASS (completed full chain)

## 8. spark-08.md
Spark: A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.
Maturity: 0
Outcome: PASS (completed full chain)
Anomalies (1):
  - VOICE: contrast-formula ("not X but Y" / "not just X") found at M0.raw_spark: "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."

## 9. spark-09.md
Spark: A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.
Maturity: 0
Outcome: FAIL (unexpected halt: M2 Phase A request failed.)

## 10. spark-10.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)

## 11. spark-11.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)

## 12. spark-12.md
Spark: An app to stop myself doomchecking my bank balance at the end of every month.
Maturity: 2
Outcome: FAIL (unexpected halt: M4 request failed.)

## 13. spark-13.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)

## 14. spark-14.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)

## 15. spark-15.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)
Anomalies (1):
  - VOICE: contrast-formula ("not X but Y" / "not just X") found at M5.observation.surface_text: "The answer names an existing solution: a plain spreadsheet template. The failure point given is that it does not catch the problem until too late, which states a timing shortfall but does not identify the precise mechanism that fails, such as no alerts, no due-date flags, or no automated reminder."

## 16. spark-16.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)

## 17. spark-17.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)

## 18. spark-18.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)

## 19. spark-19.md
Spark: An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
Maturity: 0
Outcome: PASS (completed full chain)

## 20. spark-20.md
Spark: A mobile app for allotment gardeners to swap surplus vegetables.
Maturity: 3
Outcome: PASS (halted as expected: Maturity class 3: chain stops after M0 (routes to "find a person" park screen), matching real client behaviour.)

---


==================== spark-01.md ====================

# Corked Runner Report — spark 01

Generated: 2026-07-11T18:20:10.895Z
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

User Line candidate (verbatim from M0): "A way for wedding photographers to avoid losing their deposit when a couple cancels two days before the shoot."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=turbid
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
  "user_line_candidate": "A way for wedding photographers to avoid losing their deposit when a couple cancels two days before the shoot.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "wedding photographers",
    "suspected_problem": "losing their deposit when couples cancel two days before the shoot",
    "triggering_situation": "couple cancels two days before the shoot",
    "promised_change": null,
    "domain": "wedding photography",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is wedding photographers and the stated problem is losing the deposit on a late cancellation. Both are present and the spark enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific wedding photographer and the moment a couple cancelled on them close to the shoot date.",
    "hint": "A good answer names one photographer, when the cancellation came in, what they were expecting to receive, and what they actually walked away with.",
    "person_label": "Photographer",
    "person_placeholder": "Donna, wedding photographer",
    "when_label": "When the cancellation came in",
    "when_placeholder": "two days before a Saturday shoot",
    "trying_label": "What she was counting on",
    "trying_placeholder": "collect the deposit she had been holding for six months",
    "happened_label": "What actually happened",
    "happened_placeholder": "The couple cancelled by text and she had no contract clause to enforce, so she lost the deposit entirely."
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
  "spark_summary": "A way for wedding photographers to avoid losing their deposit when a couple cancels two days before the shoot.",
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
  "user_line": "A way for wedding photographers to avoid losing their deposit when a couple cancels two days before the shoot.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "wedding photographers",
    "suspected_problem": "losing their deposit when couples cancel two days before the shoot",
    "triggering_situation": "couple cancels two days before the shoot",
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
    "surface_text": "The spark names a specific financial loss tied to a specific cancellation window. The implied person is Lena, a working wedding photographer.",
    "problem_source": "explicit"
  },
  "question": "Walk me through the last time a couple cancelled on Lena close to the shoot date, what did she do from the moment she found out to the moment it was resolved?",
  "hint": "A strong answer names the specific booking, how far out the cancel came, what Lena actually did to recover or absorb the deposit loss, and what she could not do that she wished she could.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash"
    ],
    "m2_question_repaired": false,
    "problem_forced_verbatim": true
  }
}
```

### 4. [main] M2 · /m2
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "A way for wedding photographers to avoid losing their deposit when a couple cancels two days before the shoot.",
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
  "state": "settled",
  "tell": {
    "state": "settled",
    "anchor_span": "re-reading her contract clause, then wrote off the deposit and blocked the date in her calendar anyway"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Saturday a couple cancelled on Thursday night"
  },
  "observation": {
    "surface_text": "The Tell is settled: Lena's actions on the morning of the cancellation are specific and filmable. The Vintage is settled: the cancellation event is anchored to a named week with a precise night.",
    "anchor_span": "Last Saturday a couple cancelled on Thursday night. Lena spent the morning re-reading her contract clause, then wrote off the deposit and blocked the date in her calendar anyway."
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
    "anchor_span": "My colleague Jordan, another wedding photographer, told me last month he now takes half the fee upfront through a payment link after a March cancellation burned him."
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "after a March cancellation burned him"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Jordan, a colleague and wedding photographer, taking a concrete action of collecting half the fee upfront via a payment link. The Vintage bar finds a specific past trigger anchored to a March cancellation.",
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
    "anchor_span": "Priya, a wedding caterer I met at a market, keeps a paper deposit ledger per event. For her the pain is cancellations inside 48 hours"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "same",
    "anchor_span": "a wedding caterer I met at a market"
  },
  "observation": {
    "surface_text": "The Echo bar finds a named, identifiable person distinct from Lena and from Jordan, with a concrete behaviour tied to the same problem of late cancellations. The Vintage bar finds no specific past instance, only a recurring practice with no time anchor.",
    "anchor_span": "Priya, a wedding caterer I met at a market, keeps a paper deposit ledger per event. For her the pain is cancellations inside 48 hours"
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
    "surface_text": "The answer names HoneyBook as the existing solution Lena uses today. The precise failure point is present: the template holds no card on file, leaving no payment method to charge when the couple disappeared.",
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
    "surface_text": "Words carries a direct quote from a real exchange, anchored to a specific event. The quote expresses a felt complaint but no filmable action, and no third-party reference appears.",
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
    "surface_text": "The answer names a bounded individual with a specific billing arrangement that removes deposit exposure entirely. The reason is precise: monthly retainer billing decouples revenue from whether any individual shoot occurs.",
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
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-02.md ====================

# Corked Runner Report — spark 02

Generated: 2026-07-11T18:20:56.314Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
gap_in_play true. Expect: Phase A sets gap_in_play true (tool named plus failure). M2 grades three bars; gap settles from the answer, not the spark text. Floor rule holds.

## Raw Spark
```
A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.
```

Maturity class: 0
Grape: Sanne — my old classmate, freelance designer
expect_halt: false

User Line candidate (verbatim from M0): "A tool for freelance designers who use Moneybird but whose payment reminders only go out after an invoice is already two weeks overdue."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=turbid
- **Gap**: settled — history: inert → clearing → settled (last raised by M5)
  raw grades: M2=clearing, M5=settled
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
  "user_line_candidate": "A tool for freelance designers who use Moneybird but whose payment reminders only go out after an invoice is already two weeks overdue.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "freelance designers",
    "suspected_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "triggering_situation": "invoice is already two weeks overdue before a reminder goes out",
    "promised_change": null,
    "domain": "payment reminders",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is freelance designers and the stated problem is that Moneybird's payment reminders only fire after an invoice is two weeks overdue. Both are present and clean.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific freelance designer and the moment they noticed the reminder had gone out too late.",
    "hint": "A good answer names a real designer and says exactly when they realised the invoice had already sat overdue before Moneybird sent anything.",
    "person_label": "Freelance designer",
    "person_placeholder": "Nina, freelance brand designer",
    "when_label": "When they noticed",
    "when_placeholder": "the day a client's invoice hit four weeks with no payment and no reminder had gone out",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "chase the invoice before it got any later",
    "happened_label": "What they found",
    "happened_placeholder": "Moneybird had not sent a reminder yet because the two-week overdue threshold had not triggered"
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
  "spark_summary": "A tool for freelance designers who use Moneybird but whose payment reminders only go out after an invoice is already two weeks overdue.",
  "person_name": "Sanne",
  "relationship": "my old classmate, freelance designer",
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
    "named_person": "Sanne",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. The relationship is concrete and personal.",
    "anchor_span": "my old classmate, freelance designer"
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
Summary: recovered_problem="Moneybird's payment reminders only go out after an invoice is already two weeks overdue" · needs_confirmation=false · gap_in_play=true
Request:
```json
{
  "user_line": "A tool for freelance designers who use Moneybird but whose payment reminders only go out after an invoice is already two weeks overdue.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "freelance designers",
    "suspected_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "triggering_situation": "invoice is already two weeks overdue before a reminder goes out",
    "promised_change": null,
    "domain": "payment reminders",
    "solution_is_software": "software"
  },
  "grape_name": "Sanne",
  "grape_relationship": "my old classmate, freelance designer",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
  "needs_confirmation": false,
  "gap_in_play": true,
  "observation": {
    "surface_text": "The spark names Moneybird as the existing tool and identifies its reminder timing as the failure point. The implied person is a freelance designer using that tool.",
    "problem_source": "explicit"
  },
  "question": "Walk me through the last time Sanne had an invoice sit past its due date before Moneybird sent any reminder, what did she do while she was waiting?",
  "hint": "A good answer names a specific invoice, how many days overdue it ran before the reminder fired, and what Sanne actually did in the gap, emailed the client herself, checked the invoice status manually, or let it sit.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": true,
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Tell, Vintage, Gap]
Request:
```json
{
  "user_line": "A tool for freelance designers who use Moneybird but whose payment reminders only go out after an invoice is already two weeks overdue.",
  "grape_name": "Sanne",
  "grape_relationship": "my old classmate, freelance designer",
  "maturity_class": 0,
  "confirmed_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
  "gap_in_play": true,
  "user_answer": "Two Fridays ago Sanne opened Moneybird, saw the reminder for the Bakker invoice had only just gone out on day 15, and called the client herself while it was still on screen."
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
    "state": "settled",
    "anchor_span": "called the client herself while it was still on screen"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Two Fridays ago"
  },
  "gap": {
    "state": "clearing",
    "anchor_span": "reminder for the Bakker invoice had only just gone out on day 15"
  },
  "observation": {
    "surface_text": "Sanne called the client herself on a specific Friday, a filmable action anchored to one instance. The gap answer names Moneybird and a lateness detail but states no specific failure point, only that the reminder went out on day 15 without naming what Moneybird should have done or where its logic broke.",
    "anchor_span": "reminder for the Bakker invoice had only just gone out on day 15"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "The Bakker invoice is named but its failure point inside Moneybird reads as the confirmed problem restated rather than something Sanne observed the system do or not do in that moment."
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
    "gap_anchor_verified": true,
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
  "confirmed_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
  "grape_name": "Sanne",
  "grape_relationship": "my old classmate, freelance designer",
  "maturity_class": 0,
  "user_answer": "My colleague Jordan, another freelance designer, told me last month he now sends his own manual reminder on day three because he can't wait two weeks for the system to catch it."
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
    "anchor_span": "My colleague Jordan, another freelance designer, told me last month he now sends his own manual reminder on day three because he can't wait two weeks for the system to catch it."
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "told me last month"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable person, Jordan, separate from both the grape and the founder, with a concrete workaround: manual reminders sent on day three. The Vintage bar finds a specific anchored instance in the phrase 'told me last month.'",
    "anchor_span": "My colleague Jordan, another freelance designer, told me last month he now sends his own manual reminder on day three because he can't wait two weeks for the system to catch it."
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
  "grape_name": "Sanne",
  "grape_relationship": "my old classmate, freelance designer",
  "maturity_class": 0,
  "prior_echo_context": "My colleague Jordan, another freelance designer, told me last month he now sends his own manual reminder on day three because he can't wait two weeks for the system to catch it.",
  "user_answer": "Priya, a bookkeeper I met at a workshop, keeps a spreadsheet that flags anything unpaid after a week. For her the pain is matching payments to invoices, the reminder timing part is fine."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "For her the pain is matching payments to invoices, the reminder timing part is fine."
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is matching payments to invoices, the reminder timing part is fine."
  },
  "observation": {
    "surface_text": "The answer names a specific person, Priya, with a concrete workaround, but her stated pain is payment matching rather than reminder timing, which means she does not confirm the confirmed problem. No specific past instance is anchored; the spreadsheet behaviour is described as a standing practice.",
    "anchor_span": "keeps a spreadsheet that flags anything unpaid after a week"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Priya actually experience the two-week reminder delay as a problem she works around, or does her spreadsheet serve a different purpose entirely?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
  "grape_name": "Sanne",
  "grape_relationship": "my old classmate, freelance designer",
  "maturity_class": 0,
  "user_answer": "Sanne uses Moneybird's built-in reminder schedule, but it only fires at the two-week mark, so by then the client has already forgotten the invoice existed."
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
    "anchor_span": "Sanne uses Moneybird's built-in reminder schedule, but it only fires at the two-week mark"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: Moneybird's built-in reminder schedule. The precise failure point is present: it fires only at the two-week mark, by which time the client has already forgotten the invoice.",
    "anchor_span": "it only fires at the two-week mark, so by then the client has already forgotten the invoice existed"
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
  "confirmed_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
  "grape_name": "Sanne",
  "grape_relationship": "my old classmate, freelance designer",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I am done chasing money like it's my fault,\" she said after the Bakker one."
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
    "anchor_span": "\"I am done chasing money like it's my fault,\" she said after the Bakker one."
  },
  "tell": {
    "state": "settled",
    "anchor_span": "she said after the Bakker one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Words carries a direct quote from a real exchange, attributed to Sanne with specific situational grounding. The phrase \"after the Bakker one\" anchors the words to a filmable, discrete moment rather than a general sentiment.",
    "anchor_span": "\"I am done chasing money like it's my fault,\" she said after the Bakker one."
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
  "confirmed_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
  "grape_name": "Sanne",
  "grape_relationship": "my old classmate, freelance designer",
  "maturity_class": 0,
  "user_answer": "Owen does retainer illustration work for two agencies. Late payments cost him nothing because the retainer bills monthly whether projects ship or not."
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
    "anchor_span": "Owen does retainer illustration work for two agencies. Late payments cost him nothing because the retainer bills monthly whether projects ship or not."
  },
  "observation": {
    "surface_text": "The answer names a bounded individual in a specific arrangement, retainer billing to two agencies, that removes invoice-overdue exposure entirely. The reason for immunity is present and mechanically specific: monthly billing cycles regardless of project delivery.",
    "anchor_span": "the retainer bills monthly whether projects ship or not"
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:dash"
    ],
    "overall_state_is_primary": true,
    "swirl_included": false
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-03.md ====================

# Corked Runner Report — spark 03

Generated: 2026-07-11T18:21:43.046Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Solution-language spark, class 1 direction door. Expect: first pass bottleable_cloudy (person visible, no problem), followup fires, re-bottle lands cellar_ready or cloudy-with-problem. M2 question uses the direction door: no "think of the last time" / "describe the moment" phrasing. The told-not-watched moment grades settled.

## Raw Spark
```
A better scheduling app for gym owners.
```

Maturity class: 1
Grape: Marco — owns the boxing gym where I train
expect_halt: false

User Line candidate (verbatim from M0): "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=turbid
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=turbid, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=bottleable_cloudy · in_scope=true · followup_needed=true
Request:
```json
{
  "raw_spark": "A better scheduling app for gym owners."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A better scheduling app for gym owners.",
  "user_line_candidate": "A way for gym owners to schedule better.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "gym owners",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "gym scheduling",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "suspected_problem"
    ],
    "reason": "Bottleable, cloudy. The form, the population, and the domain are visible, but no problem with scheduling is stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "What is going wrong for gym owners with scheduling right now?"
  },
  "m1_setup": {
    "question": "Name the specific gym owner and the moment when scheduling broke down for them.",
    "hint": "A good answer names a real gym owner and a specific situation where their scheduling stopped working the way they needed.",
    "person_label": "Gym owner",
    "person_placeholder": "Derek, independent gym owner",
    "when_label": "When the scheduling problem hit",
    "when_placeholder": "the week he opened a second location",
    "trying_label": "What they were trying to schedule",
    "trying_placeholder": null,
    "happened_label": "What went wrong",
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
  "raw_spark": "A better scheduling app for gym owners.",
  "followup_question": "What is going wrong for gym owners with scheduling right now?",
  "followup_answer": "Marco double-books the 6pm slot and members show up to a class that is already full.",
  "prior_digestibility": "bottleable_cloudy"
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A better scheduling app for gym owners.",
  "user_line_candidate": "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "gym owners",
    "suspected_problem": "double-booking a slot causes members to show up to a class that is already full",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "gym scheduling",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is gym owners and the stated problem is double-booking a slot, producing a full class that members still show up to.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific gym owner and the moment the double-booking problem happened.",
    "hint": "A good answer names who was running the schedule, which slot got doubled, and what the members found when they arrived.",
    "person_label": "Gym owner",
    "person_placeholder": "Marco, gym owner",
    "when_label": "When it happened",
    "when_placeholder": "the evening the 6pm class filled twice",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "fill the 6pm slot and run the class as normal",
    "happened_label": "What actually happened",
    "happened_placeholder": "members showed up to a class that was already full because the slot had been booked twice"
  },
  "person_in_spark": {
    "grade": "clearing",
    "named_person": "Marco",
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

### 3. [main] M1 · /m1
Summary: state=settled · substitution_detected=n/a · swirl=no · changed=[Grape]
Request:
```json
{
  "spark_summary": "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class.",
  "person_name": "Marco",
  "relationship": "owns the boxing gym where I train",
  "maturity_class": 1
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
    "named_person": "Marco",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. The relationship is concrete and site-specific.",
    "anchor_span": "owns the boxing gym where I train"
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

### 4. [main] M2 · /m2 (phase A)
Summary: recovered_problem="double-booking a slot causes members to show up to a class that is already full" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "gym owners",
    "suspected_problem": "double-booking a slot causes members to show up to a class that is already full",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "gym scheduling",
    "solution_is_software": "software"
  },
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "double-booking a slot causes members to show up to a class that is already full",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "Marco's gym has a scheduling problem where double-booked slots send members to classes with no room. The spark proposes an app to prevent this.",
    "problem_source": "explicit"
  },
  "question": "Ask Marco to walk you through the last specific time a slot got double-booked and members showed up to a full class, what happened, step by step, from booking to the moment people arrived.",
  "hint": "A good answer names the class, describes how the double-booking happened in the system Marco was using, and tells you what Marco did when members arrived and found no space.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash"
    ],
    "m2_question_repaired": false,
    "problem_forced_verbatim": true
  }
}
```

### 5. [main] M2 · /m2
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class.",
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
  "gap_in_play": false,
  "user_answer": "Marco walked me through last Tuesday: two members arrived for the 18:00 class he had already filled. He refunded one at the front desk and comped the other a personal training session."
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
    "anchor_span": "He refunded one at the front desk and comped the other a personal training session"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "last Tuesday: two members arrived for the 18:00 class"
  },
  "observation": {
    "surface_text": "Tell is settled: two specific filmable actions are named at the front desk. Vintage is settled: the moment is anchored to last Tuesday at the 18:00 class.",
    "anchor_span": "two members arrived for the 18:00 class he had already filled"
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

### 6. [main] M3 · /m3
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Echo]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "user_answer": "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush."
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
    "anchor_span": "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "a similar double-booking during a holiday rush"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Priya, distinct from Marco and the founder, who enacted a concrete workaround in response to a real double-booking event. The Vintage bar finds a specific anchoring instance, a double-booking during a holiday rush, with a named time reference of last month.",
    "anchor_span": "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush"
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

### 7. [main] M4 · /m4
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "prior_echo_context": "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush.",
  "user_answer": "Owen, a barber who takes walk-ins, keeps a paper appointment book by the chair. For him the pain is no-shows, the overbooking part is fine."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "turbid",
  "echo": {
    "state": "turbid",
    "anchor_span": "the overbooking part is fine"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names a person who explicitly does not share the confirmed problem, making Owen a non-instance rather than a second confirmation. No specific past moment of the confirmed problem is present.",
    "anchor_span": "the overbooking part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific person, outside Marco and Priya, who has actually experienced a member showing up to a full class because of a double-booking?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M5 · /m5
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "user_answer": "Marco uses a shared Google Calendar for the class roster, but it doesn't stop two people from claiming the same slot if they both edit it around the same time."
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
    "anchor_span": "Marco uses a shared Google Calendar for the class roster, but it doesn't stop two people from claiming the same slot if they both edit it around the same time."
  },
  "observation": {
    "surface_text": "The answer names a shared Google Calendar as the existing solution Marco uses for the class roster. The precise failure point is present: concurrent edits allow two people to claim the same slot without conflict detection.",
    "anchor_span": "it doesn't stop two people from claiming the same slot if they both edit it around the same time"
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

### 9. [main] M6 · /m6
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "words_source": "real",
  "user_answer": "\"I hate turning people away at the door,\" he said after the Tuesday one."
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
    "anchor_span": "\"I hate turning people away at the door,\" he said after the Tuesday one."
  },
  "tell": {
    "state": "settled",
    "anchor_span": "after the Tuesday one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a flagged-real exchange is present, anchored to a specific class occasion. The words carry a filmable moment: members turned away at a door after a named session.",
    "anchor_span": "\"I hate turning people away at the door,\" he said after the Tuesday one."
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

### 10. [main] M7 · /m7
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "user_answer": "Jordan runs one-on-one training sessions only, no group classes. Double-booking never happens to him because every slot has exactly one client."
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
    "anchor_span": "Jordan runs one-on-one training sessions only, no group classes"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual whose arrangement excludes group classes entirely. The reason for immunity is specific: every slot holds exactly one client, so capacity overflow cannot occur.",
    "anchor_span": "every slot has exactly one client"
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
- M4 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-04.md ====================

# Corked Runner Report — spark 04

Generated: 2026-07-11T18:21:50.246Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Scope gate, explicit non-software. Expect: out_of_scope, scope_gated true, scope reason present, no followup, no downstream calls. Clean halt.

## Raw Spark
```
A sourdough bakery subscription for my street.
```

Maturity class: 1
Grape: (none) — (none)
expect_halt: true

User Line candidate (verbatim from M0): (none — halted before M0 returned one)

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ Out of scope (non-software spark) — expected worker behaviour.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=out_of_scope · in_scope=false · followup_needed=false
Request:
```json
{
  "raw_spark": "A sourdough bakery subscription for my street."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A sourdough bakery subscription for my street.",
  "user_line_candidate": "A sourdough bakery subscription for people on the speaker's street.",
  "spark_parse": {
    "solution_form": "subscription",
    "implied_person": "people on the speaker's street",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "sourdough bakery",
    "solution_is_software": "non_software"
  },
  "digestibility": {
    "state": "out_of_scope",
    "missing": [],
    "reason": "",
    "can_seal": false,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": null,
  "scope": {
    "in_scope": false,
    "reason": "This spark describes something that belongs in a different cellar. Corked ages software products built by solo builders. A non-software idea is not less valid, it ages somewhere else."
  },
  "server_checks": {
    "schema_valid": true,
    "scope_gated": true
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- ⚠ M0: flagged out_of_scope (non_software).

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none

==================== spark-05.md ====================

# Corked Runner Report — spark 05

Generated: 2026-07-11T18:21:56.632Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Scope asymmetry probe — doctrine tension, either outcome is a finding. Expect one of two outcomes, both worth recording verbatim: (a) Out of scope — "bookstore" read as physical store, meaning M0 doctrine's own canonical thin-spark example is unreachable behind the scope gate (a doctrine note for v46, not a code bug); or (b) passes as thin — then assert suspected_problem null, m1_placeholders_nulled true, followup uses only spark nouns (books, cans — never literacy, barter, recycling, currency).

## Raw Spark
```
A bookstore for homeless people where you pay with cans.
```

Maturity class: 3
Grape: (none) — (none)
expect_halt: maybe

User Line candidate (verbatim from M0): (none — halted before M0 returned one)

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ Out of scope (non-software spark) — expected worker behaviour.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=out_of_scope · in_scope=false · followup_needed=false
Request:
```json
{
  "raw_spark": "A bookstore for homeless people where you pay with cans."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A bookstore for homeless people where you pay with cans.",
  "user_line_candidate": "A bookstore for homeless people where you pay with cans.",
  "spark_parse": {
    "solution_form": "bookstore",
    "implied_person": "homeless people",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "books",
    "solution_is_software": "non_software"
  },
  "digestibility": {
    "state": "out_of_scope",
    "missing": [],
    "reason": "",
    "can_seal": false,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": null,
  "scope": {
    "in_scope": false,
    "reason": "This spark describes something that belongs in a different cellar. Corked ages software products built by solo builders. A non-software idea is not less valid, it ages somewhere else."
  },
  "server_checks": {
    "schema_valid": true,
    "scope_gated": true
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- ⚠ M0: flagged out_of_scope (non_software).

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none

==================== spark-06.md ====================

# Corked Runner Report — spark 06

Generated: 2026-07-11T18:22:10.632Z
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
    "reason": "Not bottleable yet. No person, no domain, and no problem are present. There is nothing to work with.",
    "can_seal": false,
    "requires_followup_before_seal": true
  },
  "followup": {
    "needed": true,
    "question": "Who is this for, and what problem are they sitting with before they find it?"
  },
  "m1_setup": {
    "question": "Name the specific person this starts from and the moment their life gets harder.",
    "hint": "A good answer names a role and a concrete situation where something is going wrong for them.",
    "person_label": "Person",
    "person_placeholder": null,
    "when_label": "When",
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
    "reason": "Not bottleable yet. A population is named but no problem, domain, or concrete situation is stated. The Spark remains too thin to bottle.",
    "can_seal": false,
    "requires_followup_before_seal": true
  },
  "followup": {
    "needed": true,
    "question": "What is going wrong for freelancers that this is for?"
  },
  "m1_setup": {
    "question": "Name a specific freelancer and the moment this Spark starts from.",
    "hint": "A good answer names what the freelancer was dealing with and what went wrong, not what a tool might fix.",
    "person_label": "Freelancer",
    "person_placeholder": "e.g. Priya, freelance graphic designer",
    "when_label": "When it happened",
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

==================== spark-07.md ====================

# Corked Runner Report — spark 07

Generated: 2026-07-11T18:23:00.735Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Compress-may-not-upgrade, register hold. Expect: user_line_candidate keeps "annoying with payments" or very close; no operationalised synonyms (late, difficult, unreliable = fail), no introduced nouns. person_in_spark settled (name plus tie). M1 grape settled.

## Raw Spark
```
an app for my sister Marieke because customers are annoying with payments at her flower stall
```

Maturity class: 0
Grape: Marieke — my sister
expect_halt: false

User Line candidate (verbatim from M0): "An app for flower stall owners because customers are annoying with payments"

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=turbid
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: clearing — history: inert → clearing (last raised by M7)
  raw grades: M7=clearing

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "an app for my sister Marieke because customers are annoying with payments at her flower stall"
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "user_line_candidate": "An app for flower stall owners because customers are annoying with payments",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "flower stall owners",
    "suspected_problem": "customers are annoying with payments",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "flower stall",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is visible as flower stall owners and the stated problem is customers being annoying with payments. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific flower stall owner and the moment when a customer was annoying with payments.",
    "hint": "A good answer names what the stall owner was doing and what the customer did with the payment that made it annoying.",
    "person_label": "Flower stall owner",
    "person_placeholder": "Marieke, flower stall owner",
    "when_label": "When it happened",
    "when_placeholder": "during a busy Saturday market while serving a queue of customers",
    "trying_label": "What she was trying to do",
    "trying_placeholder": "finish the sale quickly and move to the next customer",
    "happened_label": "What the customer did with the payment",
    "happened_placeholder": "customer argued about change, paid in mixed coins, or asked to pay later"
  },
  "person_in_spark": {
    "grade": "settled",
    "named_person": "Marieke",
    "relationship_tie": "my sister"
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
  "spark_summary": "An app for flower stall owners because customers are annoying with payments",
  "person_name": "Marieke",
  "relationship": "my sister",
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
    "named_person": "Marieke",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. A real stated relationship ties that individual to the source.",
    "anchor_span": "my sister"
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
Summary: recovered_problem="customers are annoying with payments" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for flower stall owners because customers are annoying with payments",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "flower stall owners",
    "suspected_problem": "customers are annoying with payments",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "flower stall",
    "solution_is_software": "software"
  },
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "customers are annoying with payments",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names a grape and a domain but the problem is thin. Payment friction at a flower stall could mean many things: slow payers, wrong change, card refusals, disputes, or something else.",
    "problem_source": "implied"
  },
  "question": "Think of the last time a customer gave Marieke trouble with a payment at the stall, what exactly happened, step by step, from the moment the customer went to pay?",
  "hint": "A good answer names a specific transaction: what the customer did, what Marieke had to do in response, and where it broke down or slowed down, not a general pattern.",
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for flower stall owners because customers are annoying with payments",
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "confirmed_problem": "customers are annoying with payments",
  "gap_in_play": false,
  "user_answer": "Last Saturday a regular customer paid with a card that declined twice at the stall, and Marieke just waved her off with the flowers anyway, saying she'd sort it out later."
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
    "anchor_span": "Marieke just waved her off with the flowers anyway, saying she'd sort it out later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Saturday a regular customer paid with a card that declined twice at the stall"
  },
  "observation": {
    "surface_text": "The Tell is settled: a specific observable action is named. The Vintage is settled: the behaviour is anchored to a single instance with a named time and place.",
    "anchor_span": "Last Saturday a regular customer paid with a card that declined twice at the stall, and Marieke just waved her off with the flowers anyway"
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
  "confirmed_problem": "customers are annoying with payments",
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "user_answer": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular."
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
    "anchor_span": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular."
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "last month he started keeping a paper IOU pad after a similar situation with a regular"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable person, Owen, distinct from the grape and founder, with a concrete workaround behaviour reported directly. The Vintage bar finds a specific anchored instance: a past situation with a regular customer that prompted the paper IOU pad last month.",
    "anchor_span": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular."
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "customers are annoying with payments",
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "prior_echo_context": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular.",
  "user_answer": "Priya, a food truck owner I met at the market, keeps a card reader as backup for exactly this. For her the pain is spotty signal, the payment method itself is fine."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "Priya, a food truck owner I met at the market, keeps a card reader as backup for exactly this"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is spotty signal, the payment method itself is fine"
  },
  "observation": {
    "surface_text": "The answer names Priya with a concrete workaround, but her described problem is spotty signal rather than annoying payment behaviour, which means she has not confirmed the same problem. No specific past instance is present, only a standing habit.",
    "anchor_span": "For her the pain is spotty signal, the payment method itself is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person who described this pain directly, or a composite of food truck owners encountered at the market?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "customers are annoying with payments",
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "user_answer": "Marieke uses a basic card reader clipped to her apron, but it has no offline mode, so a bad signal at the stall means she can't charge anything at all."
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
    "anchor_span": "a basic card reader clipped to her apron, but it has no offline mode, so a bad signal at the stall means she can't charge anything at all"
  },
  "observation": {
    "surface_text": "The answer names a specific existing solution: a basic card reader used at the stall. The precise failure point is also present: no offline mode causes a complete inability to charge customers when signal is poor.",
    "anchor_span": "it has no offline mode, so a bad signal at the stall means she can't charge anything at all"
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
  "confirmed_problem": "customers are annoying with payments",
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want people to pay and go,\" she said after the declined-card one."
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
    "anchor_span": "\"I just want people to pay and go,\" she said after the declined-card one."
  },
  "tell": {
    "state": "settled",
    "anchor_span": "she said after the declined-card one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Words bar finds a direct quote from a real exchange attributed to Marieke, meeting the settled bar. The words are anchored to a specific incident, the declined-card event, which constitutes a filmable moment and settles Tell.",
    "anchor_span": "\"I just want people to pay and go,\" she said after the declined-card one."
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "customers are annoying with payments",
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "user_answer": "Jordan sells only pre-paid subscription flower boxes online. Payment problems at the point of sale never happen to him because nothing is sold in person."
}
```
Response:
```json
{
  "schema_version": "m7.v1",
  "mechanism": "M7",
  "state": "clearing",
  "limit": {
    "state": "clearing",
    "anchor_span": "Jordan sells only pre-paid subscription flower boxes online"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual and attaches a reason for immunity. The reason conflates point-of-sale friction with the confirmed problem, which concerns customer payment annoyances broadly, leaving the exclusion only partially matched to the stated need.",
    "anchor_span": "Payment problems at the point of sale never happen to him because nothing is sold in person."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Jordan actually face no payment friction at all, or does pre-paid subscription still expose him to chargebacks, failed renewals, and late card updates that fit what Marieke called annoying?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-08.md ====================

# Corked Runner Report — spark 08

Generated: 2026-07-11T18:23:42.769Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Sanitizer mutation probe — proven-bug regression. Record user_line_candidate verbatim. cleanVisibleText strips "not just", which can turn "do not just pay late" into "do pay late" — a meaning inversion. If the line mutates, the known sanitizer bug has regressed into user-facing text. If M0 rephrases to avoid the construction while keeping both facts (late AND partial), that is a pass.

## Raw Spark
```
A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.
```

Maturity class: 0
Grape: Bram — my uncle, owns four rental flats
expect_halt: false

User Line candidate (verbatim from M0): "A tool for landlords when tenants pay in random partial chunks nobody can reconcile."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=turbid
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=settled, M6=turbid
- **Limit**: clearing — history: inert → clearing (last raised by M7)
  raw grades: M7=clearing

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
    "domain": "rent payments",
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is landlords and the stated problem is tenant payments arriving in random partial chunks that cannot be reconciled. Both are present and clear.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific landlord and the moment they were sitting with a pile of partial payments they could not reconcile.",
    "hint": "A good answer names the landlord, how many units or tenants they manage, and what they were looking at or trying to do when the partial payment problem surfaced.",
    "person_label": "Landlord",
    "person_placeholder": "e.g. Diane, owns six rental units",
    "when_label": "When the partial payments hit",
    "when_placeholder": "e.g. end of month, three tenants had each split rent across two or three transfers",
    "trying_label": "What the landlord was trying to do",
    "trying_placeholder": "e.g. confirm which tenants had paid in full before chasing the ones who had not",
    "happened_label": "What actually happened",
    "happened_placeholder": "e.g. she had a spreadsheet, six partial transfers, and no clear way to tell which tenant the payments belonged to"
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
  "spark_summary": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
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
    "surface_text": "A named individual is present. A real property relationship is stated.",
    "anchor_span": "my uncle, owns four rental flats"
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
Summary: recovered_problem="tenants pay in random partial chunks nobody can reconcile" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "landlords",
    "suspected_problem": "tenants pay in random partial chunks nobody can reconcile",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "rent payments",
    "solution_is_software": "unstated"
  },
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "tenants pay in random partial chunks nobody can reconcile",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "Bram's spark names the problem directly: partial, irregular payments that cannot be reconciled. The implied person is Bram himself, a landlord managing four rental flats.",
    "problem_source": "explicit"
  },
  "question": "Walk me through the last time a tenant of Bram's sent a partial payment, what did Bram actually do to figure out what was still owed?",
  "hint": "A strong answer names a specific tenant payment, shows the steps Bram took to track the balance, and lands on the exact point where reconciliation broke down.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash"
    ],
    "m2_question_repaired": false,
    "problem_forced_verbatim": true
  }
}
```

### 4. [main] M2 · /m2
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
  "gap_in_play": false,
  "user_answer": "Last month a tenant sent three separate partial payments across two weeks, and Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand."
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
    "anchor_span": "Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month a tenant sent three separate partial payments across two weeks"
  },
  "observation": {
    "surface_text": "The answer names a specific observable action: manual matching of bank transfers to a spreadsheet. The moment is anchored to a single instance last month across a defined two-week span.",
    "anchor_span": "Last month a tenant sent three separate partial payments across two weeks, and Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand"
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "user_answer": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache."
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
    "anchor_span": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "last month he started asking for one lump sum only after a similar reconciling headache"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Tom, a duplex landlord distinct from the grape, taking a concrete action in response to the same reconciliation problem. The Vintage bar finds a specific anchored moment: last month, when Tom changed his payment policy after encountering the headache.",
    "anchor_span": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache"
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "prior_echo_context": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache.",
  "user_answer": "Priya, who runs a small storage unit business, keeps a manual ledger for partial payments too. For her the pain is chasing the balance down, the reconciling part is fine."
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
    "anchor_span": "Priya, who runs a small storage unit business, keeps a manual ledger for partial payments too"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "the pain is chasing the balance down, the reconciling part is fine"
  },
  "observation": {
    "surface_text": "The answer names a specific identifiable person, Priya, distinct from the grape and from Tom, with a concrete behaviour: maintaining a manual ledger for partial payments. No specific past instance is anchored; the behaviour is described as ongoing practice only.",
    "anchor_span": "Priya, who runs a small storage unit business, keeps a manual ledger for partial payments too"
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "user_answer": "Bram uses a shared spreadsheet to track rent, but it has no way to flag a partial payment against the wrong month, so mismatches pile up."
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
    "anchor_span": "Bram uses a shared spreadsheet to track rent, but it has no way to flag a partial payment against the wrong month, so mismatches pile up."
  },
  "observation": {
    "surface_text": "The answer names a shared spreadsheet as the existing solution Bram currently uses. A precise failure point is present: the spreadsheet cannot flag a partial payment attributed to the wrong month, causing mismatches to accumulate.",
    "anchor_span": "it has no way to flag a partial payment against the wrong month, so mismatches pile up"
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want one number a month, not a puzzle,\" he said after the Sunday one."
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
    "anchor_span": "I just want one number a month, not a puzzle"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "he said after the Sunday one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a flagged-real exchange is present, attributing Bram's own language to the reconciliation problem. The words carry a stated complaint with an incidental situational marker but no concrete third-party reference.",
    "anchor_span": "I just want one number a month, not a puzzle"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "user_answer": "Owen only rents to corporate tenants on annual leases paid in full upfront. Partial payments never happen to him because the whole year is billed at once."
}
```
Response:
```json
{
  "schema_version": "m7.v1",
  "mechanism": "M7",
  "state": "clearing",
  "limit": {
    "state": "clearing",
    "anchor_span": "Owen only rents to corporate tenants on annual leases paid in full upfront"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual and a specific arrangement that removes the problem. The reason given, annual full-upfront billing, is present but attached to a loosely described tenant class rather than a precisely bounded group with a verifiable circumstance.",
    "anchor_span": "Owen only rents to corporate tenants on annual leases paid in full upfront"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Owen a real landlord the founder knows, or a constructed figure built to illustrate the mechanism?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:dash"
    ],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M0.raw_spark: "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-09.md ====================

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

==================== spark-10.md ====================

# Corked Runner Report — spark 10

Generated: 2026-07-11T18:24:42.703Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M3 category rule, then M4 rank-up. Expect: M3 echo clearing, never settled — the named workaround does not rescue the category; observation names a population, not a person. M4 echo settled, so element history shows clearing -> settled with no regression. M4 contrast fields are strings: is_different_kind "true", same_or_different "different" (the boolean-wipe bug check).

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Tomas — my neighbour, carpenter with a one-man business
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=turbid, M4=clearing
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M3=clearing, M4=clearing, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is present: one-man trade businesses who let unpaid invoices sit until cash is already short.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific one-man trade operator and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names the trade (electrician, plumber, tiler) and the specific moment the missing payment surfaced as a cash shortage.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dean, self-employed electrician",
    "when_label": "When the invoice problem surfaced",
    "when_placeholder": "six weeks after finishing the job, when rent was due",
    "trying_label": "What he was trying to do at that moment",
    "trying_placeholder": "cover his supplier bill at the end of the month",
    "happened_label": "What actually happened",
    "happened_placeholder": "He found three unpaid invoices he had never followed up on, all more than a month old."
  },
  "person_in_spark": {
    "grade": "none",
    "named_person": null,
    "relationship_tie": null
  },
  "server_checks": {
    "schema_valid": true,
    "banned_words_found": [],
    "visible_style_violations_cleaned": [
      "m1_setup.happened_placeholder:more_than"
    ],
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Tomas",
  "relationship": "my neighbour, carpenter with a one-man business",
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
    "named_person": "Tomas",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present with a concrete real-world tie. The grape is settled.",
    "anchor_span": "my neighbour, carpenter with a one-man business"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "Tomas supplied the problem directly in his own words. No inference was needed.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Tomas realised money was tight and traced it back to an invoice he had forgotten to chase, what did he actually do when he noticed it?",
  "hint": "A good answer names a specific job, how late the invoice was, and what Tomas did next, called the client, ignored it, wrote it off, or something else concrete.",
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
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "Last month Tomas finished a kitchen cabinet job and didn't send the invoice until three weeks later, by which point the client had already spent the budget elsewhere and paid him in installments."
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
    "anchor_span": "didn't send the invoice until three weeks later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month Tomas finished a kitchen cabinet job"
  },
  "observation": {
    "surface_text": "The moment is anchored to a specific past job last month. The answer names a delay but frames it as a duration rather than a filmable action, no observable step Tomas took or skipped is captured.",
    "anchor_span": "didn't send the invoice until three weeks later"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "When Tomas noticed the client had paid in installments, what did he actually do with the outstanding amount, is that something you witnessed or something he described to you afterward?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:dash"
    ],
    "overall_state_is_floor": true,
    "swirl_included": true
  }
}
```

### 5. [main] M3 · /m3
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Echo]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "user_answer": "Lots of tradesmen I know just keep it in their heads or a notebook."
}
```
Response:
```json
{
  "schema_version": "m3.v1",
  "mechanism": "M3",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "Lots of tradesmen I know just keep it in their heads or a notebook."
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names a category of sufferers with a described workaround but no identifiable separate person. No specific instance or moment is referenced, only a general habit.",
    "anchor_span": "Lots of tradesmen I know just keep it in their heads or a notebook."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there one specific tradesman in that group whose notebook or head-tracking you have actually seen or heard about firsthand?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 6. [main] M4 · /m4
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "prior_echo_context": "Lots of tradesmen I know just keep it in their heads or a notebook.",
  "user_answer": "Priya, who runs a catering van, showed me the whiteboard in her kitchen last week where she crosses off paid jobs. For her it is deposits going missing, the chasing part she has under control."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "showed me the whiteboard in her kitchen last week"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "observation": {
    "surface_text": "The answer names a real identifiable person, Priya, with a concrete workaround, but her stated problem is deposits going missing rather than forgetting to chase unpaid invoices, so the confirmed problem does not land the same way for her. The whiteboard observation is anchored to last week but describes a tracking method, not a specific instance of the confirmed problem occurring.",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "Does Priya ever forget to chase what she is owed, or does the whiteboard mean the chasing problem genuinely does not exist for her the way it does for Tomas?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "user_answer": "Tomas uses a paper invoice pad from the hardware store, but it has no reminder system at all, so following up depends entirely on him remembering."
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
    "anchor_span": "paper invoice pad from the hardware store, but it has no reminder system at all"
  },
  "observation": {
    "surface_text": "The answer names a paper invoice pad as the existing solution Tomas uses today. The precise failure point is stated: it has no reminder system, making follow-up entirely dependent on unaided memory.",
    "anchor_span": "it has no reminder system at all, so following up depends entirely on him remembering"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want the money to show up without me having to ask twice,\" he said after the cabinet job."
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
    "anchor_span": "I just want the money to show up without me having to ask twice"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "I just want the money to show up without me having to ask twice"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer supplies a direct quote from a real exchange, attributable to Tomas, that names the problem in his own language. The words carry a stated feeling about repeated asking but no filmable action or third-party reference.",
    "anchor_span": "I just want the money to show up without me having to ask twice"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "user_answer": "Priya works only through a property management company that pays a fixed monthly retainer. Chasing invoices never happens to her because the retainer is automatic."
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
    "anchor_span": "Priya works only through a property management company that pays a fixed monthly retainer"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual, Priya, in a specific arrangement that removes invoice chasing from her workflow. The reason is present and specific: the retainer is automatic and no invoice is ever sent or pursued.",
    "anchor_span": "the retainer is automatic"
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
- M3 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).

==================== spark-11.md ====================

# Corked Runner Report — spark 11

Generated: 2026-07-11T18:25:25.507Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M3 grape exclusion — plus one doctrine corner to record. Expect: echo turbid despite the concrete behaviour and moment — every person in the answer is the grape. Corner to record: does Vintage rank up opportunistically off this grape-only moment while echo goes turbid? Doctrine says Vintage grades when the answer carries a moment; it does not say whose. Log the result either way; this is a doctrine call waiting to be made, not a bug.

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Femke — my sister-in-law, photographer
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=clearing
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: clearing — history: inert → turbid → clearing (last raised by M6)
  raw grades: M3=turbid, M4=clearing, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the problem is stated: one-man trade businesses forget to chase unpaid invoices until the money is already a problem.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific one-man trade business owner and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names the trade (plumber, electrician, painter), the person, and the point at which the overdue invoice surfaced as a cash problem.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, self-employed electrician",
    "when_label": "When did the money become a problem",
    "when_placeholder": "three weeks after finishing the job, when rent was due",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his materials bill for the next job",
    "happened_label": "What actually happened",
    "happened_placeholder": "He checked his bank, saw the invoice still unpaid, and realised he had not followed up once since sending it"
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Femke",
  "relationship": "my sister-in-law, photographer",
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
    "named_person": "Femke",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "Femke is named and the relationship is stated as sister-in-law and photographer. The grape is settled.",
    "anchor_span": "my sister-in-law, photographer"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names a problem directly: one-man trade businesses forget to chase unpaid invoices until cash runs short. Femke is a photographer who operates alone, which places her inside this grape.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Femke had an invoice go unpaid long enough to cause a cash problem, what did she do when she finally noticed it was overdue?",
  "hint": "A good answer names a specific invoice moment: how long it had been sitting, what triggered her to notice, and what she actually did next, not how she generally handles late payments.",
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
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "Last month Femke finished a wedding shoot and didn't invoice until three weeks later, by which point the couple had already spent their budget on the honeymoon."
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
    "anchor_span": "didn't invoice until three weeks later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month Femke finished a wedding shoot"
  },
  "observation": {
    "surface_text": "The moment is anchored to a specific past instance. The answer names an absence of action rather than an observable behaviour: delayed invoicing is inferred from the outcome, and no filmable act by Femke is described.",
    "anchor_span": "didn't invoice until three weeks later"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "Who in this situation was the one tracking that the invoice had not gone out, and when did that person notice?"
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
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[Echo]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0,
  "user_answer": "Femke started adding a 30 percent booking fee in January after two no-shows in one month."
}
```
Response:
```json
{
  "schema_version": "m3.v1",
  "mechanism": "M3",
  "state": "turbid",
  "echo": {
    "state": "turbid",
    "anchor_span": "Femke started adding a 30 percent booking fee in January after two no-shows in one month"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "in January after two no-shows in one month"
  },
  "observation": {
    "surface_text": "The answer describes only the grape's own behaviour in response to no-shows, with no separate person present. The Vintage bar finds a specific anchored moment, but it belongs entirely to the grape.",
    "anchor_span": "Femke started adding a 30 percent booking fee in January after two no-shows in one month"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "Who else, outside Femke, actually carries the problem of forgotten invoice chasing day to day?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 6. [main] M4 · /m4
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Echo]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0,
  "prior_echo_context": "Femke started adding a 30 percent booking fee in January after two no-shows in one month.",
  "user_answer": "Priya, who runs a catering van, showed me the whiteboard in her kitchen last week where she crosses off paid jobs. For her it is deposits going missing, the chasing part she has under control."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "showed me the whiteboard in her kitchen last week"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "observation": {
    "surface_text": "Priya is a named, distinct person with a concrete behaviour, but her problem is deposits going missing rather than forgetting to chase unpaid invoices, which is the confirmed problem. The whiteboard observation is anchored to last week but describes a tracking method, not a workaround for the confirmed problem.",
    "anchor_span": "the chasing part she has under control."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "Does Priya ever lose track of which jobs have been fully paid out, or is her entire friction sitting at the deposit stage before the work begins?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0,
  "user_answer": "Femke uses a basic invoicing app, but it has no automatic reminders, so nothing chases the client but her own memory."
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
    "anchor_span": "uses a basic invoicing app, but it has no automatic reminders, so nothing chases the client but her own memory"
  },
  "observation": {
    "surface_text": "The answer names a basic invoicing app as the existing solution. The precise failure point is identified: the app has no automatic reminders, leaving follow-up dependent on Femke's memory alone.",
    "anchor_span": "it has no automatic reminders, so nothing chases the client but her own memory"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I hate having to be the one who asks for money,\" she said after the honeymoon one."
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
    "anchor_span": "I hate having to be the one who asks for money"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "she said after the honeymoon one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a flagged-real exchange is present, meeting the settled bar for Words. The words carry a stated aversion but no filmable action, and no third-party reference appears.",
    "anchor_span": "I hate having to be the one who asks for money"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0,
  "user_answer": "Owen works only through an agency that invoices clients on his behalf. Chasing payments never happens to him because the agency handles it."
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
    "anchor_span": "Owen works only through an agency that invoices clients on his behalf"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual, Owen, who does not have the problem. The reason is specific: an agency handles all client invoicing and payment chasing on his behalf, removing the task from him entirely.",
    "anchor_span": "the agency handles it"
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
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).

==================== spark-12.md ====================

# Corked Runner Report — spark 12

Generated: 2026-07-11T18:25:56.503Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Class 2 self battery. Expect: M1 self-mode settled (concrete instance present). M3 echo turbid — the Echo can never be the speaker; observation pivots away from self. M4 settled (separate person satisfies self mode). M5 settled — self's own current tool is the one place self counts as Gap material, and the founder's own build exclusion does not fire on a budgeting app he did not build. M6 response omits the echo field entirely; record how the words bar grades a self-quote (mild corner, real exchange with oneself). M7 settled.

## Raw Spark
```
An app to stop myself doomchecking my bank balance at the end of every month.
```

Maturity class: 2
Grape: Jamie — Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.
expect_halt: false

User Line candidate (verbatim from M0): "An app for the speaker to stop doomchecking their bank balance at the end of every month."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Vintage**: settled — history: inert → settled (last raised by M3)
  raw grades: M2=settled, M3=turbid
- **Gap**: inert — history: inert
- **Echo**: turbid — history: inert → turbid (last raised by M3)
  raw grades: M3=turbid
- **Limit**: inert — history: inert

## Halt
⛔ M4 request failed.

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app to stop myself doomchecking my bank balance at the end of every month."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app to stop myself doomchecking my bank balance at the end of every month.",
  "user_line_candidate": "An app for the speaker to stop doomchecking their bank balance at the end of every month.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "the speaker",
    "suspected_problem": "doomchecking bank balance at the end of every month",
    "triggering_situation": "end of every month",
    "promised_change": "stop doomchecking bank balance",
    "domain": "bank balance",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The speaker is present, the problem is stated, and the moment is named. It enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific person and the moment when the doomchecking actually happens.",
    "hint": "A good answer names who is sitting with the bank balance, and what is going on in their life at the end of that month.",
    "person_label": "Account holder",
    "person_placeholder": "Jamie, mid-career professional",
    "when_label": "When the doomcheck happens",
    "when_placeholder": "the night before rent goes out",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "get through the evening without opening the banking app",
    "happened_label": "What actually happened",
    "happened_placeholder": "opened the app three times in an hour, each time feeling worse"
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
  "spark_summary": "An app for the speaker to stop doomchecking their bank balance at the end of every month.",
  "person_name": "Jamie",
  "relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2
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
    "named_person": "Jamie",
    "person_kind": "self",
    "temporal_grounding": "past_specific"
  },
  "observation": {
    "surface_text": "A specific past instance is present. The answer names a concrete date, a count of eleven checks, and an unpaid invoice on the 28th of last month.",
    "anchor_span": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid."
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
Summary: recovered_problem="doomchecking bank balance at the end of every month" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for the speaker to stop doomchecking their bank balance at the end of every month.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "the speaker",
    "suspected_problem": "doomchecking bank balance at the end of every month",
    "triggering_situation": "end of every month",
    "promised_change": "stop doomchecking bank balance",
    "domain": "bank balance",
    "solution_is_software": "software"
  },
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "doomchecking bank balance at the end of every month",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names the speaker as the grape. The problem is stated in the speaker's own words.",
    "problem_source": "explicit"
  },
  "question": "Walk me through the last time you doomchecked your bank balance, what did you actually do, step by step, from the moment you opened the app?",
  "hint": "A good answer names the specific day or context, describes the exact sequence of taps or actions, and ends at the moment the dread landed, not a general habit summary.",
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for the speaker to stop doomchecking their bank balance at the end of every month.",
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2,
  "confirmed_problem": "doomchecking bank balance at the end of every month",
  "gap_in_play": false,
  "user_answer": "Last month on the 28th, right before rent was due, I opened my banking app for the eleventh time that day instead of finishing the invoice I still hadn't sent, and gave up and closed the app without doing either."
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
    "anchor_span": "opened my banking app for the eleventh time that day instead of finishing the invoice I still hadn't sent, and gave up and closed the app without doing either"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month on the 28th, right before rent was due"
  },
  "observation": {
    "surface_text": "The answer names a specific observable action: opening the banking app a counted number of times and closing it without completing the invoice. The moment is anchored to a single date and a concrete deadline pressure.",
    "anchor_span": "Last month on the 28th, right before rent was due"
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
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[Echo]
Request:
```json
{
  "confirmed_problem": "doomchecking bank balance at the end of every month",
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2,
  "user_answer": "I built a spreadsheet that projects the month forward, I check that instead now."
}
```
Response:
```json
{
  "schema_version": "m3.v1",
  "mechanism": "M3",
  "state": "turbid",
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes the founder's own build and current behaviour, with no separate person present anywhere in it. The Vintage bar finds no specific past instance, only an ongoing personal habit.",
    "anchor_span": "I built a spreadsheet that projects the month forward, I check that instead now."
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific person, not the speaker, who has described feeling this same dread and doing something concrete about it?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 6. [main] M4 · /m4
Summary: ERROR 502
Request:
```json
{
  "confirmed_problem": "doomchecking bank balance at the end of every month",
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2,
  "prior_echo_context": "I built a spreadsheet that projects the month forward, I check that instead now.",
  "user_answer": "My friend Daniel, who freelances in video, told me in April he moved every client to 50 percent upfront after one late payer wrecked his rent month."
}
```
Response:
```json
{
  "error": "Parse error",
  "raw": "```json\n{\n  \"schema_version\": \"m4.v1\",\n  \"mechanism\": \"M4\",\n  \"state\": \"settling\",\n  \"echo\": {\n    \"state\": \"settled\",\n    \"anchor_span\": \"My friend Daniel, who freelances in video, told me in April he moved every client to 50 percent upfront after one late payer wrecked his rent month.\"\n  },\n  \"vintage\": {\n    \"state\": \"settled\",\n    \"anchor_span\": \"told me in April\"\n  },\n  \"contrast\": {\n    \"is_different_kind\": \"false\",\n    \"same_or_different\": \"different\",\n    \"anchor_span\": \"freelances in video\"\n  },\n  \"observation\": {\n    \"surface_text\": \"The Echo bar finds one named person, Daniel, distinct from the grape and from the prior echo, with a concrete behavioral response to cash-flow anxiety. The Vintage bar finds a specific past instance anchored to April.\",\n    \"anchor_span\": \"told me in April he moved every client to 50 percent upfront after one late payer wrecked his rent month\"\n  },\n  \"substitution_detected\": false\n}\n```\n\n*Self-correction: the state field must match echo.state. Correcting now.*\n\n```json\n{\n  \"schema_version\": \"m4.v1\",\n  \"mechanism\": \"M4\",\n  \"state\": \"settled\",\n  \"echo\": {\n    \"state\": \"settled\",\n    \"anchor_span\": \"My friend Daniel, who freelances in video, told me in April he moved every client to 50 percent upfront after one late payer wrecked his rent month.\"\n  },\n  \"vintage\": {\n    \"state\": \"settled\",\n    \"anchor_span\": \"told me in April\"\n  },\n  \"contrast\": {\n    \"is_different_kind\": \"false\",\n    \"same_or_different\": \"different\",\n    \"anchor_span\": \"freelances in video\"\n  },\n  \"observation\": {\n    \"surface_text\": \"The Echo bar finds one named person, Daniel, distinct from the grape and from the prior echo, with a concrete behavioral response to cash-flow anxiety. The Vintage bar finds a specific past instance anchored to April.\",\n    \"anchor_span\": \"told me in April he moved every client to 50 percent upfront after one late payer wrecked his rent month\"\n  },\n  \"substitution_detected\": false\n}\n```"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M3 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-13.md ====================

# Corked Runner Report — spark 13

Generated: 2026-07-11T18:26:42.242Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Substitution rule, M2 — with secondary M6 probe. Expect: M2 substitution_detected true, tell turbid (no grape behaviour referenced at all), overall turbid. Observation names what was described and what was asked for, nothing more — no interpretation, no named avoidance. Secondary: M6 words turbid — the builder's framing presented as the grape's meaning is not language from the grape.

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Daan — my former colleague, wedding DJ
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: turbid — history: inert → turbid (last raised by M6)
  raw grades: M2=turbid, M6=turbid
- **Vintage**: turbid — history: inert → turbid (last raised by M4)
  raw grades: M2=turbid, M3=turbid, M4=turbid
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: turbid — history: inert → turbid (last raised by M6)
  raw grades: M3=turbid, M4=turbid, M6=turbid
- **Limit**: clearing — history: inert → clearing (last raised by M7)
  raw grades: M7=clearing

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the problem is stated: one-man trade businesses who forget to chase unpaid invoices until it becomes a money problem.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific tradesperson and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names the trade, says how long the invoice had been sitting, and what the money pressure looked like when it surfaced.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dale, one-man electrician",
    "when_label": "When the invoice became a problem",
    "when_placeholder": "six weeks after finishing the job, when rent was due",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his supplier bill at the end of the month",
    "happened_label": "What he found when he looked",
    "happened_placeholder": "three invoices sitting unpaid, none of them chased, the oldest two months old"
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Daan",
  "relationship": "my former colleague, wedding DJ",
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
    "named_person": "Daan",
    "person_kind": "named_individual",
    "temporal_grounding": "none"
  },
  "observation": {
    "surface_text": "A named individual is present. A real stated relationship ties him to the interviewer.",
    "anchor_span": "my former colleague, wedding DJ"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names the problem directly: Daan forgets to follow up on unpaid invoices until the cash shortfall forces the issue. The implied person is a one-man trade operation, which matches a wedding DJ running without admin support.",
    "problem_source": "explicit"
  },
  "question": "Walk me through the last time Daan realised a gig payment was still unpaid, what had just happened, and what did he actually do next?",
  "hint": "A strong answer names the specific job, how long the invoice had been sitting, what triggered Daan to notice, and the first concrete step he took, for example, he spotted a low bank balance three weeks after a wedding and then sent a WhatsApp to the couple.",
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
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "I would build a Supabase table of bookings with a webhook that flags cancellations and auto-generates the deposit invoice before the date frees up."
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "friction",
  "state": "turbid",
  "tell": {
    "state": "turbid",
    "anchor_span": "I would build a Supabase table of bookings with a webhook that flags cancellations and auto-generates the deposit invoice"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes the founder's intended build rather than any observable action by Daan. No specific instance of Daan forgetting to chase an invoice is named in the answer.",
    "anchor_span": "I would build a Supabase table of bookings with a webhook that flags cancellations and auto-generates the deposit invoice"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "Has Daan ever described or shown the moment a specific unpaid invoice slipped past him, or is the problem inferred from the general shape of how wedding DJs work?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": false,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_floor": true,
    "swirl_included": true
  }
}
```

### 5. [main] M3 · /m3
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[Echo]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "user_answer": "My friend Owen, another wedding DJ, told me last month he started requiring signed contracts after a similar cancellation dispute."
}
```
Response:
```json
{
  "schema_version": "m3.v1",
  "mechanism": "M3",
  "state": "turbid",
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names a real third party, Owen, but his behaviour addresses cancellation disputes and contract signing, not forgetting to chase unpaid invoices. No element of the confirmed problem appears in what Owen did.",
    "anchor_span": "started requiring signed contracts after a similar cancellation dispute"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Has anyone outside Daan's situation ever mentioned the unpaid invoice chase specifically, or is Owen the closest stand-in available?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 6. [main] M4 · /m4
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "prior_echo_context": "My friend Owen, another wedding DJ, told me last month he started requiring signed contracts after a similar cancellation dispute.",
  "user_answer": "Priya, a wedding florist I met through a vendor group, keeps a deposit tracking spreadsheet too. For her the pain is last-minute order changes, the deposit part is fine."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "turbid",
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer introduces Priya but immediately disqualifies her: the deposit tracking is fine for her and the confirmed problem is forgetting to chase unpaid invoices, which the answer states is not her pain. No concrete behaviour around the confirmed problem is present.",
    "anchor_span": "the deposit part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific person in that vendor group for whom a late or forgotten invoice chase has actually caused a cash problem, and what did they do about it?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "user_answer": "Daan uses a plain email thread to track bookings and cancellations, but nothing flags when a cancellation actually happens, so he has to notice it himself."
}
```
Response:
```json
{
  "schema_version": "m5.v1",
  "mechanism": "M5",
  "state": "clearing",
  "gap": {
    "state": "clearing",
    "anchor_span": "Daan uses a plain email thread to track bookings and cancellations"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain email thread used to track bookings and cancellations. The failure described concerns cancellation detection, not the confirmed problem of chasing unpaid invoices.",
    "anchor_span": "nothing flags when a cancellation actually happens"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "When Daan last had an overdue invoice sitting unpaid long enough to become a cash problem, what did he actually do to notice it and decide to follow up?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M6 · /m6
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "What she basically means is that the admin side makes her feel unprofessional."
}
```
Response:
```json
{
  "schema_version": "m6.v1",
  "mechanism": "M6",
  "state": "turbid",
  "words": {
    "state": "turbid",
    "anchor_span": null
  },
  "tell": {
    "state": "turbid",
    "anchor_span": null
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer supplies the founder's own interpretive gloss rather than any language attributed to Daan; no quote or close recounting of Daan's words is present. No filmable behaviour or third-party echo can be assessed without source language.",
    "anchor_span": "What she basically means is that the admin side makes her feel unprofessional."
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "When Daan last talked about this problem, what were the words she actually used before the interpretation was formed?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 9. [main] M7 · /m7
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "user_answer": "Jordan only DJs corporate events booked through an agency on annual contract. Cancellations never cost him anything because the agency guarantees the booking."
}
```
Response:
```json
{
  "schema_version": "m7.v1",
  "mechanism": "M7",
  "state": "clearing",
  "limit": {
    "state": "clearing",
    "anchor_span": "Jordan only DJs corporate events booked through an agency on annual contract"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual and a specific arrangement. The reason given addresses cancellation cost, not the confirmed problem of forgetting to chase unpaid invoices until money becomes critical.",
    "anchor_span": "the agency guarantees the booking"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Jordan's agency arrangement actually eliminate the need to track whether invoices have been paid, or does it only remove the risk of a cancelled date?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none

==================== spark-14.md ====================

# Corked Runner Report — spark 14

Generated: 2026-07-11T18:27:25.487Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M4 prior-echo exclusion. Expect: M3 settled. M4 echo clearing — same person rephrased is not a second person; contrast fields "unclear". Confirm prior_echo_context was populated from the M3 answer in the M4 request.

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=turbid
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem, forgetting to chase unpaid invoices until it becomes a money problem, is present and specific enough to enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific one-man trade business owner and the moment they realised an unpaid invoice had been sitting too long.",
    "hint": "A good answer names the trade, the person, and what they noticed when the money got tight.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dean, self-employed electrician",
    "when_label": "When did the invoice go quiet",
    "when_placeholder": "six weeks after the job, when his account ran low",
    "trying_label": "What was he trying to do",
    "trying_placeholder": "cover materials for the next job without touching savings",
    "happened_label": "What did he find when he looked",
    "happened_placeholder": "three invoices still unpaid, the oldest two months old, none of them chased"
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Noor",
  "relationship": "my friend, runs a one-woman landscaping business",
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
    "named_person": "Noor",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. The relationship is concrete and specific.",
    "anchor_span": "my friend, runs a one-woman landscaping business"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names a specific failure mode: invoices go unchased until cash pressure forces the issue. The grape is Noor, a one-woman landscaping business and a firsthand contact.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor realised she had unpaid invoices sitting there, what had she just done, or what had just happened, that made it land on her?",
  "hint": "A strong answer names the specific moment: a bill arrived, a job stalled, she opened her account, something concrete that forced the invoices into view, not a general pattern.",
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "Last month Noor finished a hedge-trimming job and didn't send the invoice for two weeks, by which point she'd forgotten the exact hours and had to guess the total."
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
    "anchor_span": "didn't send the invoice for two weeks, by which point she'd forgotten the exact hours and had to guess the total"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month Noor finished a hedge-trimming job"
  },
  "observation": {
    "surface_text": "The answer names a specific observable action: delayed invoicing followed by guessing the total after forgetting the hours. The moment is anchored to a single past instance: a hedge-trimming job completed last month.",
    "anchor_span": "Last month Noor finished a hedge-trimming job and didn't send the invoice for two weeks, by which point she'd forgotten the exact hours and had to guess the total"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "My colleague Jordan pays a VA every month to chase his invoices. He set it up in February after a client stiffed him for six weeks."
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
    "anchor_span": "My colleague Jordan pays a VA every month to chase his invoices"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "He set it up in February after a client stiffed him for six weeks"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable person separate from the grape, with a concrete behaviour: a colleague named Jordan who pays a VA monthly to chase invoices. The Vintage bar finds a specific anchoring instance: the arrangement was initiated in February following a six-week non-payment by a client.",
    "anchor_span": "He set it up in February after a client stiffed him for six weeks"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "prior_echo_context": "My colleague Jordan pays a VA every month to chase his invoices. He set it up in February after a client stiffed him for six weeks.",
  "user_answer": "There's a guy at my office who just has an assistant handle all his invoice chasing every month."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "a guy at my office who just has an assistant handle all his invoice chasing every month"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names an unnamed office contact with a behaviour that matches the prior echo person Jordan almost exactly: delegating invoice chasing to an assistant on a recurring monthly basis. The answer carries no specific past instance, only an ongoing pattern.",
    "anchor_span": "a guy at my office who just has an assistant handle all his invoice chasing every month"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is this a specific person who can be named, or is it a stand-in for the same arrangement already described with Jordan?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Noor uses a paper receipt book for jobs, but it has no way to flag which jobs are still unpaid, so invoices slip through unnoticed."
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
    "anchor_span": "Noor uses a paper receipt book for jobs, but it has no way to flag which jobs are still unpaid"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a paper receipt book used to track jobs. The precise failure point is present: it cannot flag unpaid jobs, allowing invoices to go unnoticed.",
    "anchor_span": "it has no way to flag which jobs are still unpaid, so invoices slip through unnoticed"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want to send it and forget it,\" she said after the two-week one."
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
    "anchor_span": "I just want to send it and forget it"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "I just want to send it and forget it"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a real exchange is present, placing Words at settled. The quoted words carry a stated feeling about the invoicing burden but no filmable action or third-party reference.",
    "anchor_span": "I just want to send it and forget it"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Priya only does fixed-price maintenance contracts billed automatically each month. Invoice chasing never happens to her because nothing is billed per job."
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
    "anchor_span": "Priya only does fixed-price maintenance contracts billed automatically each month"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual and a specific billing arrangement that removes per-job invoicing entirely. The reason for immunity is present and mechanistically precise: automatic monthly billing leaves no invoice to chase.",
    "anchor_span": "nothing is billed per job"
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
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-15.md ====================

# Corked Runner Report — spark 15

Generated: 2026-07-11T18:28:09.554Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M2 tell clearing, vintage unanchored — the most common real answer shape. Expect: tell clearing (emotion in place of behaviour), vintage clearing ("whenever" is recurring, unanchored), overall clearing. A swirl should plausibly fire; log its kind and question, do not answer it. (m3-m7 not specified by the brief — left on generic settled-quality placeholders since they are not under test here.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: clearing — history: inert → turbid → clearing (last raised by M4)
  raw grades: M2=turbid, M3=clearing, M4=turbid
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "money becomes a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is present: one-man trade businesses who forget unpaid invoices until cash runs short.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific one-man trade business owner and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names the trade, the person, and the point when the forgotten invoice surfaced as a cash shortfall.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dean, sole-trader electrician",
    "when_label": "When the money became a problem",
    "when_placeholder": "end of the month when he checked his account before paying a supplier",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his supplier bill and realised the cash was short",
    "happened_label": "What actually happened",
    "happened_placeholder": "found three invoices from six weeks ago still unpaid, none of them chased"
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Noor",
  "relationship": "my friend, runs a one-woman landscaping business",
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
    "named_person": "Noor",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. The relationship is concrete and specific.",
    "anchor_span": "my friend, runs a one-woman landscaping business"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "money becomes a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names the problem directly: Noor forgets to chase unpaid invoices until cash is already tight. The implied person matches the grape.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor realized a landscaping invoice had gone unpaid long enough to hurt her cash, what did she actually do when she noticed it?",
  "hint": "A strong answer names a specific job, how long the invoice sat, and what Noor did next, called, ignored it, sent a text, not how she felt about it.",
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
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "She gets really stressed about it whenever a client goes quiet, and usually she just puts off looking at the numbers."
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "friction",
  "state": "turbid",
  "tell": {
    "state": "clearing",
    "anchor_span": "puts off looking at the numbers"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The Tell names a deferred action but frames it as a recurring pattern rather than a filmed moment. No specific instance is named in the answer, no date, event, or single occasion grounds the behaviour in time.",
    "anchor_span": "puts off looking at the numbers"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there one specific client going quiet that Noor is sitting with right now, or is this a pattern assembled from several different episodes?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": false,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:dash"
    ],
    "overall_state_is_floor": true,
    "swirl_included": true
  }
}
```

### 5. [main] M3 · /m3
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Echo, Vintage]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up."
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
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "whenever it comes up"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Jordan, with a concrete workaround: paying a freelancer to handle it. The Vintage bar finds a recurring pattern anchored to no single instance.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "prior_echo_context": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up.",
  "user_answer": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it, though for her it shows up a little differently."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "different",
    "anchor_span": "for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names Priya and a concrete workaround but provides no detail on her role or context sufficient to establish her as an identifiable individual rather than a named stand-in. No specific past instance is present, only an ongoing behaviour.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya someone who could be reached and asked about this directly, and what field or kind of work does she actually do?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Right now Noor uses a plain spreadsheet template to track it, but it does not catch the problem until it is already too late."
}
```
Response:
```json
{
  "schema_version": "m5.v1",
  "mechanism": "M5",
  "state": "clearing",
  "gap": {
    "state": "clearing",
    "anchor_span": "plain spreadsheet template to track it"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain spreadsheet template. The failure point given is that it does not catch the problem until too late, which states a timing shortfall but does not identify the precise mechanism that fails, such as no alerts, no due-date flags, or no automated reminder.",
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "When Noor last had an overdue invoice go unnoticed, was she checking that spreadsheet and still missed it, or had she stopped opening it entirely?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:not_x_but_y"
    ],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M6 · /m6
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
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
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": null
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer provides a direct quote from a named real exchange, satisfying the Words bar. The quoted words carry a stated sentiment about the problem but no filmable action, and no third-party reference is present.",
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "My uncle does the same kind of work but only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
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
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
  },
  "observation": {
    "surface_text": "The answer names a bounded individual and a specific arrangement that removes invoice-chasing from the equation. The reason is present and concrete: retainer billing decouples payment from job occurrence, eliminating the lag that creates the problem.",
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
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
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M5.observation.surface_text: "The answer names an existing solution: a plain spreadsheet template. The failure point given is that it does not catch the problem until too late, which states a timing shortfall but does not identify the precise mechanism that fails, such as no alerts, no due-date flags, or no automated reminder."

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor clearing (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-16.md ====================

# Corked Runner Report — spark 16

Generated: 2026-07-11T18:28:58.288Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M5 one leg — with secondary M7 probe. Expect: M5 gap clearing — named solution, no failure point. M7 limit clearing — a who without a why, and a loose category rather than a bounded group. (m2, m3, m4, m6 not specified by the brief — left on generic settled-quality placeholders.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=clearing, M4=turbid
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: clearing — history: inert → clearing (last raised by M7)
  raw grades: M7=clearing

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is forgetting to chase unpaid invoices until it becomes a money problem. Both are present and the Spark enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific one-man trade business owner and the moment they realised unpaid invoices had become a money problem.",
    "hint": "A good answer names a real person, the trade they work in, and the specific point when the unpaid invoices caught up with them.",
    "person_label": "Tradesperson",
    "person_placeholder": "e.g. Dale, self-employed electrician",
    "when_label": "When the money became a problem",
    "when_placeholder": "e.g. end of the month when rent was due and three invoices were still unpaid",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "e.g. cover upcoming costs without chasing clients he had already invoiced",
    "happened_label": "What actually happened",
    "happened_placeholder": "e.g. he found invoices from six weeks ago he had never followed up, and did not have enough to cover his van payment"
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Noor",
  "relationship": "my friend, runs a one-woman landscaping business",
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
    "named_person": "Noor",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. The relationship is real and stated: a friend who runs a one-woman landscaping business.",
    "anchor_span": "my friend, runs a one-woman landscaping business"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names a problem directly: solo trade operators forget to follow up on unpaid invoices until a cash shortfall forces the issue. Noor runs a one-woman landscaping business and has been observed firsthand.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor realised a invoice had gone unpaid too long, what was she doing when it hit her, and what did she actually do next?",
  "hint": "A good answer names a specific invoice moment: Noor notices cash is tight, checks her records, sees an overdue job from weeks back, and describes exactly what she did or did not do to follow it up.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash"
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
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "Last Tuesday, right before a deadline, Noor tried the usual approach and it broke down at the same point it always does. Noor gave up partway through and fell back to a plain spreadsheet, because the thing they normally use for this does not catch it in time."
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
    "anchor_span": "fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a specific moment. The tell names a fallback action but frames it through a pattern rather than a single filmable step: what Noor did with the spreadsheet in that moment is not stated.",
    "anchor_span": "fell back to a plain spreadsheet"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Noor someone who would recognize this Tuesday moment if asked about it directly, or is the account assembled from several separate times she has mentioned the problem?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up."
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
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "whenever it comes up"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Jordan, distinct from both the grape and the founder, with a concrete workaround: paying a freelancer to handle the problem. The Vintage bar finds a recurring pattern rather than a specific anchored instance.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "prior_echo_context": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up.",
  "user_answer": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it, though for her it shows up a little differently."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "different",
    "anchor_span": "for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names Priya and describes a manual backup log, but the relationship and role context are thin enough that Priya reads as a vague social reference rather than a clearly identifiable separate person. No specific past instance is anchored; the behaviour is described as a standing practice.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person who described this log to you directly, or a composite of people you have in mind who handle it this way?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "She uses Moneybird."
}
```
Response:
```json
{
  "schema_version": "m5.v1",
  "mechanism": "M5",
  "state": "clearing",
  "gap": {
    "state": "clearing",
    "anchor_span": "She uses Moneybird."
  },
  "observation": {
    "surface_text": "The answer names an existing solution, Moneybird. No failure point is stated, what Moneybird fails to do for Noor in the context of chasing unpaid invoices is absent.",
    "anchor_span": "She uses Moneybird."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "When Noor last had an invoice go unpaid too long, what did she say she wished Moneybird had done that it did not?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:dash"
    ],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M6 · /m6
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
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
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I just want this part to be boring,\" Noor said"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer supplies a direct quote from a named individual in a real, dated exchange, meeting the Words bar at settled. The quoted language carries a stated sentiment about the problem but no filmable action, and no third-party reference is present.",
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Agency photographers probably don't have this."
}
```
Response:
```json
{
  "schema_version": "m7.v1",
  "mechanism": "M7",
  "state": "clearing",
  "limit": {
    "state": "clearing",
    "anchor_span": "Agency photographers probably don't have this."
  },
  "observation": {
    "surface_text": "The answer names a loose category without a bounded individual or precise situational constraint. No reason is given for why agency photographers would be exempt from forgetting to chase unpaid invoices.",
    "anchor_span": "Agency photographers probably don't have this."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific agency photographer whose billing arrangement actually removes the problem, or is this a guess about a category?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M3 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-17.md ====================

# Corked Runner Report — spark 17

Generated: 2026-07-11T18:29:43.886Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M5 own-build substitution. Expect: gap turbid regardless of how precisely the shortcomings are described — the founder's own build is never a valid existing fix. substitution_detected true. (m2, m3, m4, m6, m7 not specified by the brief — left on generic settled-quality placeholders.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=clearing, M4=turbid
- **Gap**: turbid — history: inert → turbid (last raised by M5)
  raw grades: M5=turbid
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is specific: one-man trade businesses forget to chase unpaid invoices until the money is already a problem.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific tradesperson this starts from and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names one person, their trade, and the point at which they noticed the invoice was overdue and the cash was already short.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dean, one-man plumbing business",
    "when_label": "When the money became a problem",
    "when_placeholder": "the week he couldn't cover a supply order and found three invoices still unpaid",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover a supply order and keep jobs running",
    "happened_label": "What actually happened",
    "happened_placeholder": "he checked his account, found the cash was short, then opened his invoices and realised three had been sitting unpaid for weeks"
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Noor",
  "relationship": "my friend, runs a one-woman landscaping business",
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
    "named_person": "Noor",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. The relationship is concrete and specific.",
    "anchor_span": "my friend, runs a one-woman landscaping business"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names forgetting to chase unpaid invoices until cash becomes a problem. Noor runs a one-woman landscaping business and is a firsthand witness to this problem.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor noticed an unpaid invoice had gone too long, what had she actually done about it by that point, if anything?",
  "hint": "A good answer names a specific job, how many days or weeks the invoice had been sitting, and what Noor did or did not do when she finally noticed the money was short.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash"
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
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "Last Tuesday, right before a deadline, Noor tried the usual approach and it broke down at the same point it always does. Noor gave up partway through and fell back to a plain spreadsheet, because the thing they normally use for this does not catch it in time."
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
    "anchor_span": "fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The moment is anchored to a specific instance last Tuesday. The behaviour named is a fallback to a spreadsheet, but the action that broke down before that fallback is described only as 'the usual approach' and 'gave up partway through,' without naming what Noor visibly did or stopped doing.",
    "anchor_span": "fell back to a plain spreadsheet"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Noor the one who noticed the breakdown last Tuesday, or is this account assembled from what she told you afterward?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up."
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
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "Last month, my colleague Jordan mentioned"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable person separate from both the grape and the founder, named and doing a concrete thing. The Vintage bar finds a time anchor for when the mention occurred but the workaround itself is described as a recurring pattern rather than a single instance.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "prior_echo_context": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up.",
  "user_answer": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it, though for her it shows up a little differently."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "different",
    "anchor_span": "for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names Priya and attributes one behaviour to her, but the description lacks enough specificity to confirm she is a real, identifiable individual rather than a constructed stand-in. No specific past instance is present, only a recurring pattern.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person who could be named and located, or is she a representative type drawn from a general sense of who else might have this problem?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Right now there's my prototype. It catches maybe half the cases but the reminder logic is still flaky."
}
```
Response:
```json
{
  "schema_version": "m5.v1",
  "mechanism": "M5",
  "state": "turbid",
  "gap": {
    "state": "turbid",
    "anchor_span": "my prototype"
  },
  "observation": {
    "surface_text": "The answer names no existing solution separate from the founder's own build. The substitution rule caps the gap at turbid because the only thing described is the founder's own prototype, not a tool, service, person, or habit Noor currently uses.",
    "anchor_span": "my prototype"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "When Noor's invoices go unpaid today, before any prototype is involved, what does she actually do to chase them?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M6 · /m6
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
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
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I just want this part to be boring,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a real exchange is present, attributed to Noor by name with a stated occasion. The words carry a felt sentiment about the problem but no filmable action, and no third-party reference appears.",
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "My uncle does the same kind of work but only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
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
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
  },
  "observation": {
    "surface_text": "The answer names a specific individual (the uncle) in a precisely bounded arrangement (retainer-only clients). The reason for immunity is stated: payment is contractually scheduled and does not depend on job completion, removing the chase mechanic entirely.",
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
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
- M3 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-18.md ====================

# Corked Runner Report — spark 18

Generated: 2026-07-11T18:30:31.566Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M6 reconstructed cap — hard rule. Expect: words clearing, never settled, no matter how vivid the quote. Echo bar forced turbid (words_source is not real). Observation notes the reconstruction without coaching toward what a real exchange would earn. (m2-m5, m7 not specified by the brief — left on generic settled-quality placeholders.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
words_source override: reconstructed
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=clearing, M4=turbid
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is forgetting to chase unpaid invoices until it becomes a money problem. Both are present and the Spark enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific sole trader you are thinking of and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names the trade (plumber, electrician, painter) and a concrete moment: the bill was overdue by weeks and the account was short.",
    "person_label": "Sole trader",
    "person_placeholder": "Dean, self-employed electrician",
    "when_label": "When the money became a problem",
    "when_placeholder": "three weeks after a job finished, with rent due and the invoice still unpaid",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "get paid for a completed job without having to stop other work to chase it",
    "happened_label": "What actually happened",
    "happened_placeholder": "He noticed the invoice was overdue only when his account ran low, then had to spend an afternoon chasing the client by phone"
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Noor",
  "relationship": "my friend, runs a one-woman landscaping business",
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
    "named_person": "Noor",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. A real operational tie is stated.",
    "anchor_span": "my friend, runs a one-woman landscaping business"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "Noor runs a one-woman landscaping business and has been observed forgetting to chase unpaid invoices until cash becomes a problem. The suspected problem is explicit in the spark.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor realized a landscaping invoice had gone unpaid long enough to cause a money problem, what did she actually do when she noticed?",
  "hint": "A good answer names a specific invoice moment: which job, how overdue it was, and what Noor did or did not do when the gap in cash showed up.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash"
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
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "Last Tuesday, right before a deadline, Noor tried the usual approach and it broke down at the same point it always does. Noor gave up partway through and fell back to a plain spreadsheet, because the thing they normally use for this does not catch it in time."
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
    "anchor_span": "fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The moment is anchored to a specific instance. The behaviour named is a pattern description and an inferred breakdown rather than a filmable action: what Noor physically did with the invoice that Tuesday is not stated.",
    "anchor_span": "tried the usual approach and it broke down at the same point it always does"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "What did Noor's screen or hands actually show at the moment she switched to the spreadsheet that Tuesday?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up."
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
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "whenever it comes up"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Jordan, described as hitting the same problem and paying a freelancer to handle it. The Vintage bar finds a recurring pattern rather than a single anchored instance.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "prior_echo_context": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up.",
  "user_answer": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it, though for her it shows up a little differently."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "different",
    "anchor_span": "for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names Priya and attributes one concrete behaviour to her, but the description stays at the level of a workaround label rather than a specific identifiable instance of the problem. No time anchor is present; the behaviour reads as a standing practice with no moment named.",
    "anchor_span": "said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person whose name and situation you know directly, or a composite of several people you have in mind?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Right now Noor uses a plain spreadsheet template to track it, but it does not catch the problem until it is already too late."
}
```
Response:
```json
{
  "schema_version": "m5.v1",
  "mechanism": "M5",
  "state": "clearing",
  "gap": {
    "state": "clearing",
    "anchor_span": "plain spreadsheet template to track it"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain spreadsheet template. The failure point given is that it does not catch the problem until too late, which is a timing complaint without a precise mechanism of failure.",
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Has Noor said this to you in her own words, or is the spreadsheet detail your inference about how she probably handles it?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M6 · /m6
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "words_source": "reconstructed",
  "user_answer": "\"I honestly cannot look at my bank app in week four, it makes me sick,\" is basically what she would say."
}
```
Response:
```json
{
  "schema_version": "m6.v1",
  "mechanism": "M6",
  "state": "turbid",
  "words": {
    "state": "turbid",
    "anchor_span": "is basically what she would say"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "I honestly cannot look at my bank app in week four"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer offers a constructed hypothetical rather than language from a real exchange, and words_source is reconstructed, placing Words at turbid. The quoted sentiment contains a filmable avoidance behaviour but no third-party echo.",
    "anchor_span": "is basically what she would say"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Has Noor said anything about the bank account or the invoice gap in a real conversation, even once, or does the answer rest entirely on what the founder imagines she would say?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 9. [main] M7 · /m7
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "My uncle does the same kind of work but only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
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
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
  },
  "observation": {
    "surface_text": "The answer names a bounded individual (the uncle) who does not have the problem. The reason is specific and present: a retainer structure bills continuously, removing the invoice-chasing trigger entirely.",
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
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
- M3 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-19.md ====================

# Corked Runner Report — spark 19

Generated: 2026-07-11T18:31:19.318Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M7 universality — with secondary M6 probe. Expect: M7 limit turbid — asserting universality is a turbid answer, not a strong one. Secondary: M6 words clearing — a real exchange happened but the answer contains no actual language from it. (m2-m5 not specified by the brief — left on generic settled-quality placeholders.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=clearing, M4=turbid
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: turbid — history: inert → turbid (last raised by M7)
  raw grades: M7=turbid

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money becomes a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is forgetting to chase unpaid invoices until cash becomes a problem. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific one-man trade business owner this starts from and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names a real tradesperson and a concrete moment, such as checking their account before paying a supplier and finding it short because a customer still had not paid.",
    "person_label": "Tradesperson",
    "person_placeholder": "Gary, sole-trader electrician",
    "when_label": "When the invoice problem hit",
    "when_placeholder": "the week he needed to pay for materials and two invoices were still unpaid",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover costs for the next job without chasing customers himself",
    "happened_label": "What actually happened",
    "happened_placeholder": "he only noticed the overdue invoices when his account balance came up short before a supplier payment"
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
  "spark_summary": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "person_name": "Noor",
  "relationship": "my friend, runs a one-woman landscaping business",
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
    "named_person": "Noor",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. The relationship is specific and real: a friend who runs a one-woman landscaping business.",
    "anchor_span": "my friend, runs a one-woman landscaping business"
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money becomes a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names the problem directly: a one-person trade operator loses track of unpaid invoices until a cash shortfall forces attention. Noor runs a solo landscaping business and has been observed firsthand.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor realised a landscaping invoice had gone unpaid too long, what did she actually do when she noticed?",
  "hint": "A good answer names a specific job, how many days or weeks late the invoice was, and what Noor did next, called the client, sent a message, nothing yet, not how she felt about it.",
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
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "Last Tuesday, right before a deadline, Noor tried the usual approach and it broke down at the same point it always does. Noor gave up partway through and fell back to a plain spreadsheet, because the thing they normally use for this does not catch it in time."
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
    "anchor_span": "gave up partway through and fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a specific moment. The tell names a fallback action but the trigger behaviour remains a pattern description rather than a single observable act: what Noor was doing at the point of breakdown is not captured.",
    "anchor_span": "gave up partway through and fell back to a plain spreadsheet"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is the breakdown described something witnessed directly, or assembled from what Noor has said about how this usually goes?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up."
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
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "whenever it comes up"
  },
  "observation": {
    "surface_text": "The Echo bar is settled: a named third party, Jordan, is identified as separate from the grape and the founder, with a concrete workaround of paying a freelancer to handle the problem. The Vintage bar is clearing: the behaviour is described as a recurring pattern with no specific past instance anchored.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "prior_echo_context": "Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up.",
  "user_answer": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it, though for her it shows up a little differently."
}
```
Response:
```json
{
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "different",
    "anchor_span": "for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names a person, Priya, with one described behaviour, but the role and context are not specified enough to confirm she is a real identifiable individual rather than a constructed stand-in. No specific past instance is present, only a recurring described practice.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person the founder can name a context for, or does she represent a type of person the founder expects to have this problem?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 7. [main] M5 · /m5
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Right now Noor uses a plain spreadsheet template to track it, but it does not catch the problem until it is already too late."
}
```
Response:
```json
{
  "schema_version": "m5.v1",
  "mechanism": "M5",
  "state": "clearing",
  "gap": {
    "state": "clearing",
    "anchor_span": "plain spreadsheet template to track it"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain spreadsheet template. The failure point given is that it does not catch the problem until too late, which is a timing complaint without a precise mechanism of failure.",
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "When Noor last had an overdue invoice, what did she actually do on the spreadsheet that failed to flag it in time?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M6 · /m6
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "We talked about it over coffee last Friday and she confirmed the month-end thing is her biggest headache."
}
```
Response:
```json
{
  "schema_version": "m6.v1",
  "mechanism": "M6",
  "state": "clearing",
  "words": {
    "state": "clearing",
    "anchor_span": "she confirmed the month-end thing is her biggest headache"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "she confirmed the month-end thing is her biggest headache"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer recounts that a real exchange occurred and attributes a sentiment to Noor, but no direct language from her is present. No filmable behaviour appears in the attributed words, and no third-party reference is contained in them.",
    "anchor_span": "she confirmed the month-end thing is her biggest headache"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "What did Noor actually say about the month-end problem in her own words during that conversation?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 9. [main] M7 · /m7
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "user_answer": "Honestly every freelancer has this. I can't think of a single one who doesn't."
}
```
Response:
```json
{
  "schema_version": "m7.v1",
  "mechanism": "M7",
  "state": "turbid",
  "limit": {
    "state": "turbid",
    "anchor_span": "every freelancer has this. I can't think of a single one who doesn't."
  },
  "observation": {
    "surface_text": "The answer names no bounded exclusion, asserting instead that the problem is universal. No reason for any individual or group's immunity is present because no exempt party is identified.",
    "anchor_span": "every freelancer has this. I can't think of a single one who doesn't."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a landscaper, contractor, or solo operator whose invoices are handled by someone else entirely, a bookkeeper, an agency, a spouse who runs the admin side, so the forgetting simply has no room to happen?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M3 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).

==================== spark-20.md ====================

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
