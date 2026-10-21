# Corked Runner Report — spark 02

Generated: 2026-10-21T16:43:33.094Z
Worker: http://127.0.0.1:8791

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

M0's line (verbatim, not shown in the app): "A tool for freelance designers when Moneybird's payment reminders only go out after an invoice is already two weeks overdue."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M2=settled, M5=settled
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
  "raw_spark": "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
  "user_line_candidate": "A tool for freelance designers when Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "freelance designers",
    "suspected_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "payment reminders",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is freelance designers and the problem is stated: Moneybird's reminders go out only after an invoice is two weeks overdue. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the one freelance designer, and the moment, when a Moneybird invoice sat unpaid before any reminder went out.",
    "hint": "A good answer is a designer you can name and a specific invoice, with the date it was due and what they were waiting on.",
    "person_label": "Designer",
    "person_placeholder": "Lotte, freelance designer",
    "when_label": "Invoice waiting",
    "when_placeholder": "the week after an invoice passed its due date",
    "trying_label": "Trying to do",
    "trying_placeholder": "get a client invoice paid",
    "happened_label": "What happened",
    "happened_placeholder": "The invoice passed its due date, no reminder went out, and she kept waiting."
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
    "temporal_grounding": "none"
  },
  "observation": {
    "surface_text": "Sanne is named and tied to the asker as an old classmate. The relationship is real and she is a freelance designer, the exact user the tool addresses.",
    "anchor_span": "my old classmate, freelance designer"
  },
  "next_question": {
    "should_advance": true,
    "framing": "Move to a specific moment when Sanne's invoice went unpaid or a reminder came too late."
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
  "question": "What did Sanne actually do the last time a Moneybird invoice sat unpaid and no payment reminder had gone out yet?",
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage, Gap]
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
  "state": "settled",
  "tell": {
    "state": "settled",
    "anchor_span": "called the client herself while it was still on screen"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Two Fridays ago"
  },
  "gap": {
    "state": "settled",
    "anchor_span": "saw the reminder for the Bakker invoice had only just gone out on day 15"
  },
  "observation": {
    "surface_text": "The answer names a filmable action: Sanne phoned the client herself with the reminder on screen. The moment is anchored to two Fridays ago and the Bakker invoice. Moneybird is named, and its failure is stated as a reminder sent only on day 15.",
    "anchor_span": "called the client herself while it was still on screen"
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
    "gap_anchor_verified": true,
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
    "anchor_span": "he now sends his own manual reminder on day three"
  },
  "observation": {
    "surface_text": "The answer names one separate person, Jordan, who is neither Sanne nor the founder, and records one concrete behaviour: a manual reminder sent on day three.",
    "anchor_span": "he now sends his own manual reminder on day three because he can't wait two weeks"
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
  "state": "settled",
  "echo": {
    "state": "settled",
    "anchor_span": "Priya, a bookkeeper I met at a workshop, keeps a spreadsheet that flags anything unpaid after a week."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is matching payments to invoices, the reminder timing part is fine."
  },
  "observation": {
    "surface_text": "The answer names Priya, a bookkeeper distinct from Sanne and Jordan, who flags unpaid invoices after a week in a spreadsheet.",
    "anchor_span": "keeps a spreadsheet that flags anything unpaid after a week"
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
    "anchor_span": "Sanne uses Moneybird's built-in reminder schedule, but it only fires at the two-week mark, so by then the client has already forgotten the invoice existed."
  },
  "observation": {
    "surface_text": "The answer names an existing solution: Moneybird's built-in reminder schedule. It also states a precise failure point: the reminder fires only at the two-week mark, after the client has forgotten the invoice.",
    "anchor_span": "it only fires at the two-week mark"
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
    "state": "clearing",
    "anchor_span": "\"I am done chasing money like it's my fault,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer carries a direct quote attributed to the grape from a real exchange, which clears the Words bar. The quote states a feeling about chasing payment but names no filmable action, and it references no third-party statement.",
    "anchor_span": "\"I am done chasing money like it's my fault,\""
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
  "state": "clearing",
  "limit": {
    "state": "clearing",
    "anchor_span": "Late payments cost him nothing because the retainer bills monthly whether projects ship or not."
  },
  "observation": {
    "surface_text": "The answer names a bounded who: Owen, retainer illustrator for two agencies. The stated reason concerns project billing cycles, not the two-week reminder delay, so it does not show why the late reminder is no problem for him.",
    "anchor_span": "Late payments cost him nothing because the retainer bills monthly whether projects ship or not."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Owen a real person whose invoices you have actually seen, or a shape you built to fit the exclusion?"
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
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).