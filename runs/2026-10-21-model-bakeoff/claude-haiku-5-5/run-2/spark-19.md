# Corked Runner Report — spark 19

Generated: 2026-10-21T16:48:23.728Z
Worker: http://127.0.0.1:8790

## Test under this spark
M7 universality — with secondary M6 probe. Expect: M7 limit turbid — asserting universality is a turbid answer, not a strong one. Secondary: M6 words clearing — a real exchange happened but the answer contains no actual language from it. (m2-m5 not specified by the brief — left on generic settled-quality placeholders.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

Line sent to the worker (the spark as typed): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

M0's line (verbatim, not shown in the app): "A way for one-man trade businesses to chase unpaid invoices before the money becomes a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=turbid
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=settled, M6=turbid
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
  "user_line_candidate": "A way for one-man trade businesses to chase unpaid invoices before the money becomes a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": "unpaid invoices left unchased",
    "promised_change": "chasing invoices before the money becomes a problem",
    "domain": "trade businesses, unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. A population, a stated problem of unchased invoices, and a form are all visible, and the Spark enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific tradesperson and the moment they realised an invoice had gone unchased for too long.",
    "hint": "A good answer names one person working alone, the invoice or client involved, and the point where the unpaid money started to hurt.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, sole plumber",
    "when_label": "When the invoice was overdue",
    "when_placeholder": "six weeks after the job, when he needed the cash for materials",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "pay for parts and keep his next job booked",
    "happened_label": "What actually happened",
    "happened_placeholder": "he found the invoice still unpaid only when the bank balance was already short"
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
    "surface_text": "A named individual is present: Noor. The stated relationship is a friend who runs a one-woman landscaping business.",
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
Summary: outcome=stated · problem="forget to chase unpaid invoices until the money is a problem" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": "unpaid invoices left unchased",
    "promised_change": "chasing invoices before the money becomes a problem",
    "domain": "trade businesses, unpaid invoices",
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
  "schema_version": "m2.v2",
  "mechanism": "M2",
  "phase": "problem",
  "outcome": "stated",
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "Walk me through the specific last time Noor forgot to chase an unpaid invoice and only noticed once the money had become a problem: what was she doing, and what happened next?",
  "recovered_problem": "forget to chase unpaid invoices until the money is a problem",
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
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
  "state": "settled",
  "tell": {
    "state": "settled",
    "anchor_span": "Noor gave up partway through and fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The answer names a filmable action: Noor abandoned the usual tool partway through and switched to a plain spreadsheet. The moment is anchored to last Tuesday before a deadline. The behaviour does not show Noor failing to chase an unpaid invoice, so the link to the confirmed problem is unestablished.",
    "anchor_span": "Noor gave up partway through and fell back to a plain spreadsheet"
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
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up."
  },
  "observation": {
    "surface_text": "The answer names one separate person, Jordan, who is neither Noor nor the founder, and describes a concrete recurring workaround of paying a freelancer to chase the unpaid invoices.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up."
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
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
  "state": "settled",
  "echo": {
    "state": "settled",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "though for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "Priya is a named third party outside Noor's landscaping context who keeps a manual backup log for the problem, and the answer states the problem presents differently for her.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Gap]
Request:
```json
{
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "Noor uses a plain spreadsheet template to track it"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain spreadsheet template used to track unpaid invoices. The answer gives a vague failure only, stating the template does not catch the problem until it is already too late, without specifying the mechanism of the miss.",
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Which specific step in the spreadsheet template fails to flag an overdue invoice in time, and at what point does the gap show up in practice?"
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
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "surface_text": "The answer contains no language attributed to Noor, only a summary that she confirmed a headache exists. Without words from the exchange there is nothing to assess for filmable behaviour or third-party echo.",
    "anchor_span": "she confirmed the month-end thing is her biggest headache"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "What did Noor actually say about the month-end invoicing, in her own words, as close as you can recall them?"
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
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer asserts universality and names no bounded exclusion. No person, group, or reason for immunity is stated.",
    "anchor_span": "every freelancer has this"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there one freelancer you actually know who chases invoices promptly, and what does that person do differently from Noor?"
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
- M6 offered turbid for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).