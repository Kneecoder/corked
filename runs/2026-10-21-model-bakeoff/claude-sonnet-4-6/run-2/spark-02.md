# Corked Runner Report — spark 02

Generated: 2026-10-21T16:46:52.990Z
Worker: http://127.0.0.1:8787

## Test under this spark
gap_in_play true. Expect: Phase A sets gap_in_play true (tool named plus failure). M2 grades three bars; gap settles from the answer, not the spark text. Floor rule holds.

## Raw Spark
```
A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.
```

Maturity class: 0
Grape: Sanne — my old classmate, freelance designer
expect_halt: false

Line sent to the worker (the spark as typed): "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue."

M0's line (verbatim, not shown in the app): "A tool for freelance designers who send invoices in Moneybird but whose payment reminders only go out after the invoice is already two weeks overdue."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
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
  "user_line_candidate": "A tool for freelance designers who send invoices in Moneybird but whose payment reminders only go out after the invoice is already two weeks overdue.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "freelance designers",
    "suspected_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "payment reminders, invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. Freelance designers are named and the problem is stated precisely: Moneybird's reminders trigger only after an invoice is two weeks overdue. Both are present and the idea enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific freelance designer this starts from and the moment they noticed the Moneybird reminder had gone out too late.",
    "hint": "A good answer names one designer, the invoice situation, and what they saw or felt when the reminder landed after the two-week mark.",
    "person_label": "Freelance designer",
    "person_placeholder": "Lena, freelance brand designer",
    "when_label": "When did it happen",
    "when_placeholder": "the day she saw a reminder go out on an invoice already 14 days past due",
    "trying_label": "What she was trying to do",
    "trying_placeholder": "get paid before the client went quiet",
    "happened_label": "What actually happened",
    "happened_placeholder": "Moneybird sent the reminder two weeks after the due date and the client had already moved on"
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
  "spark_summary": "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
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
    "surface_text": "Sanne is named and tied to a real relationship. The anchor holds.",
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
Summary: outcome=stated · problem="Moneybird's payment reminders only go out after an invoice is already two weeks overdue" (user_stated) · gap_in_play=true
Request:
```json
{
  "phase": "problem",
  "raw_spark": "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
  "user_line": "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "freelance designers",
    "suspected_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "payment reminders, invoices",
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
  "schema_version": "m2.v2",
  "mechanism": "M2",
  "phase": "problem",
  "outcome": "stated",
  "problem": {
    "text": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": true,
  "question": "Walk me through the last time Sanne's invoice hit that two-week mark without a reminder going out: what did she do when she realized the payment was late?",
  "recovered_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Tell, Vintage, Gap]
Request:
```json
{
  "user_line": "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
  "grape_name": "Sanne",
  "grape_relationship": "my old classmate, freelance designer",
  "maturity_class": 0,
  "problem": {
    "text": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "surface_text": "A specific action is named: Sanne called the client herself. The moment is anchored to a single instance two Fridays ago. Moneybird is named as the existing solution, but the answer states only that the reminder went out late, not the exact mechanism or rule that caused the delay.",
    "anchor_span": "reminder for the Bakker invoice had only just gone out on day 15"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Was Sanne present when this happened, or is this account reconstructed from what she told you afterward?"
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
  "problem": {
    "text": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "source": "user_stated",
    "status": "confirmed"
  },
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
  "observation": {
    "surface_text": "One identifiable third party, Jordan, distinct from both the grape and the founder, is named with a concrete workaround: sending a manual reminder on day three to bypass the system delay.",
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
  "problem": {
    "text": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "the reminder timing part is fine"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is matching payments to invoices, the reminder timing part is fine"
  },
  "observation": {
    "surface_text": "Priya is a named, identifiable person distinct from the grape and prior echo, and her spreadsheet behaviour is concrete, but her stated pain is payment matching rather than reminder timing, so she does not confirm the confirmed problem.",
    "anchor_span": "the reminder timing part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there someone in Priya's world, or anyone else from that workshop, for whom the two-week reminder delay itself is the specific friction they have built around?"
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
  "problem": {
    "text": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "surface_text": "The answer names Moneybird's built-in reminder schedule as the existing solution. A precise failure point is present: the reminder fires only at the two-week mark, by which point the client has already forgotten the invoice.",
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
  "problem": {
    "text": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "surface_text": "The answer contains a direct quote from a real exchange, attributed to Sanne by name. The phrase \"after the Bakker one\" anchors the words to a specific, identifiable incident, satisfying the filmable-moment bar.",
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
  "problem": {
    "text": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "surface_text": "The answer names a bounded individual (Owen) in a specific retainer arrangement with two agencies. The reason for immunity is present and specific: monthly billing cycles decouple payment from project delivery, eliminating overdue exposure.",
    "anchor_span": "the retainer bills monthly whether projects ship or not"
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
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).