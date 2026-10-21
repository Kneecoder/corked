# Corked Runner Report — spark 02

Generated: 2026-10-21T16:49:01.954Z
Worker: http://127.0.0.1:8790

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

M0's line (verbatim, not shown in the app): "A tool for freelance designers to get payment reminders before invoices are two weeks overdue."

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
  "user_line_candidate": "A tool for freelance designers to get payment reminders before invoices are two weeks overdue.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "freelance designers",
    "suspected_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
    "triggering_situation": "Invoices going unpaid until they are two weeks overdue.",
    "promised_change": "Payment reminders sent earlier than Moneybird's.",
    "domain": "invoicing and payment reminders",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role, the stated problem with Moneybird's reminder timing, and the promised change are all visible and enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific freelance designer and the moment an invoice slipped past its reminder window.",
    "hint": "A good answer names one designer, the client and invoice involved, and the point where they noticed the reminder had come too late.",
    "person_label": "Freelancer",
    "person_placeholder": "Priya, freelance brand designer",
    "when_label": "When the invoice went overdue",
    "when_placeholder": "the week after a logo project was delivered",
    "trying_label": "What they were trying to get paid",
    "trying_placeholder": "a final invoice from a small client who was slow to pay",
    "happened_label": "What happened when the reminder arrived",
    "happened_placeholder": "the reminder came two weeks late, after the client had already forgotten the invoice"
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
    "surface_text": "A named individual is present, Sanne, with a stated real tie as an old classmate and freelance designer. The grape is settled on that name plus relationship.",
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
    "suspected_problem": "Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
    "triggering_situation": "Invoices going unpaid until they are two weeks overdue.",
    "promised_change": "Payment reminders sent earlier than Moneybird's.",
    "domain": "invoicing and payment reminders",
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
  "question": "Sanne, think of the specific invoice where Moneybird's reminder only went out after it was already two weeks overdue, and tell me exactly what you did next.",
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
    "anchor_span": "Two Fridays ago Sanne opened Moneybird, saw the reminder for the Bakker invoice had only just gone out on day 15"
  },
  "gap": {
    "state": "settled",
    "anchor_span": "saw the reminder for the Bakker invoice had only just gone out on day 15"
  },
  "observation": {
    "surface_text": "Sanne placed a phone call to the client while the Moneybird reminder remained on screen, a filmable action. The moment is anchored to the Bakker invoice on day 15 two Fridays ago. The existing solution, Moneybird's reminder, is named and its failure point is stated as firing only on day 15.",
    "anchor_span": "saw the reminder for the Bakker invoice had only just gone out on day 15"
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
    "anchor_span": "My colleague Jordan, another freelance designer, told me last month he now sends his own manual reminder on day three because he can't wait two weeks for the system to catch it."
  },
  "observation": {
    "surface_text": "A separate named person, Jordan, a freelance designer and not the grape or the founder, reports sending a manual payment reminder on day three because the system's two-week window is too slow.",
    "anchor_span": "he now sends his own manual reminder on day three because he can't wait two weeks for the system to catch it"
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
    "surface_text": "A second, identifiable person, Priya the bookkeeper, is named and maintains a spreadsheet that flags unpaid invoices after a week, and for her the pain sits in payment matching rather than reminder timing.",
    "anchor_span": "Priya, a bookkeeper I met at a workshop, keeps a spreadsheet that flags anything unpaid after a week."
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
    "anchor_span": "Sanne uses Moneybird's built-in reminder schedule, but it only fires at the two-week mark"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: Moneybird's built-in reminder schedule. It also states a precise failure point: reminders fire only at the two-week mark, after the client has already forgotten the invoice.",
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
    "state": "clearing",
    "anchor_span": "\"I am done chasing money like it's my fault,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer contains direct, attributed language from Sanne tied to a real exchange, and words_source is real. The words carry a stated feeling of blame about chasing money but describe no filmable action.",
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
    "surface_text": "The answer names a bounded exclusion: Owen, an illustrator on monthly retainers with two agencies. It states the reason for his immunity, that retainer billing proceeds regardless of project delivery, so late payments carry no cost to him.",
    "anchor_span": "Late payments cost him nothing because the retainer bills monthly whether projects ship or not."
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