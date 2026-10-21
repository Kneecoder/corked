# Corked Runner Report — spark 14

Generated: 2026-10-21T17:03:10.539Z
Worker: http://127.0.0.1:8791

## Test under this spark
M4 prior-echo exclusion. Expect: M3 settled. M4 echo clearing — same person rephrased is not a second person; contrast fields "unclear". Confirm prior_echo_context was populated from the M3 answer in the M4 request.

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

Line sent to the worker (the spark as typed): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

M0's line (verbatim, not shown in the app): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

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
    "suspected_problem": "they forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": "the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is one-man trade businesses and the stated problem is forgetting to chase unpaid invoices until the money is a problem. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name one specific one-man trade business owner and the moment an unpaid invoice went unchased until the money was a problem.",
    "hint": "A real tradesperson you know or have watched, with the job they did and the invoice they let slide.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, self-employed plumber",
    "when_label": "When the money became a problem",
    "when_placeholder": "the week his van insurance came due",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover a materials bill while an invoice sat unpaid",
    "happened_label": "What happened with the invoice",
    "happened_placeholder": "He sent the invoice, moved on to the next job, and only remembered it when the bank balance ran low."
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
    "surface_text": "Noor is named, and the tie is stated as a friend who runs a one-woman landscaping business. A specific individual with a real relationship is present.",
    "anchor_span": "my friend, runs a one-woman landscaping business"
  },
  "next_question": {
    "should_advance": true,
    "framing": "Move to a specific moment when Noor had an invoice go unchased."
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
    "suspected_problem": "they forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": "the money is a problem",
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
  "question": "What was the specific moment Noor realised an unpaid invoice had gone unchased until the money was a problem, and what did she actually do next?",
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
    "surface_text": "Noor delayed the invoice two weeks and then guessed the total from forgotten hours, an observable action a camera would capture. The moment is anchored to one job, the hedge-trimming finished last month.",
    "anchor_span": "had to guess the total"
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
    "anchor_span": "My colleague Jordan pays a VA every month to chase his invoices."
  },
  "observation": {
    "surface_text": "A separate identifiable person, Jordan, is present and his concrete behaviour is stated: a monthly paid VA chasing his invoices, set up after a client stiffed him for six weeks.",
    "anchor_span": "My colleague Jordan pays a VA every month to chase his invoices."
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
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "There's a guy at my office who just has an assistant handle all his invoice chasing every month."
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes an unnamed man at the office whose assistant chases invoices monthly, which matches the prior echo's Jordan and his monthly VA, so no second person is established.",
    "anchor_span": "a guy at my office who just has an assistant handle all his invoice chasing every month"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is this guy at your office a different person from Jordan, or is Jordan the one you are describing again?"
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
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "surface_text": "The answer names an existing solution: a paper receipt book used for jobs. It also states a precise failure point: the book has no way to flag which jobs are still unpaid.",
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
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "\"I just want to send it and forget it,\" she said after the two-week one."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I just want to send it and forget it,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer carries a direct quote attributed to Noor, and words_source is real, so the language is attributable. The quote states a wish but names no filmable action, and no third party appears in it.",
    "anchor_span": "\"I just want to send it and forget it,\""
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
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "Priya only does fixed-price maintenance contracts billed automatically each month. Invoice chasing never happens to her because nothing is billed per job."
  },
  "observation": {
    "surface_text": "The answer names Priya, an identifiable individual, as someone who does not have the problem. The reason is present and specific: fixed-price contracts billed automatically each month leave no per-job invoices to chase.",
    "anchor_span": "Invoice chasing never happens to her because nothing is billed per job."
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
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).