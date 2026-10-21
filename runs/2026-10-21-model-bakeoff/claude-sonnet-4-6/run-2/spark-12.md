# Corked Runner Report — spark 12

Generated: 2026-10-21T16:51:31.427Z
Worker: http://127.0.0.1:8787

## Test under this spark
Class 2 self battery. Expect: M1 self-mode settled (concrete instance present). M3 echo turbid — the Echo can never be the speaker; observation pivots away from self. M4 settled (separate person satisfies self mode). M5 settled — self's own current tool is the one place self counts as Gap material, and the founder's own build exclusion does not fire on a budgeting app he did not build. M6 response omits the echo field entirely; record how the words bar grades a self-quote (mild corner, real exchange with oneself). M7 settled.

## Raw Spark
```
An app to stop myself doomchecking my bank balance at the end of every month.
```

Maturity class: 2
Grape: Jamie — Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.
expect_halt: false

Line sent to the worker (the spark as typed): "An app to stop myself doomchecking my bank balance at the end of every month."

M0's line (verbatim, not shown in the app): "An app for someone to stop doomchecking their bank balance at the end of every month."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: clearing — history: inert → turbid → clearing (last raised by M4)
  raw grades: M3=turbid, M4=clearing
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

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
  "user_line_candidate": "An app for someone to stop doomchecking their bank balance at the end of every month.",
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
    "question": "Name the specific person and the moment they found themselves doomchecking their bank balance.",
    "hint": "A good answer names who they are, when in the month it happened, what they were trying to do before they checked, and what they saw or felt when they did.",
    "person_label": "Doomchecker",
    "person_placeholder": "Jamie, freelance designer",
    "when_label": "When they checked",
    "when_placeholder": "the night before rent was due",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "get through the evening without thinking about money",
    "happened_label": "What happened when they checked",
    "happened_placeholder": "opened the banking app for the fourth time that day and felt worse each time"
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

### 2. [main] M1 · none (self mode, not graded)
Summary: state=settled · substitution_detected=n/a · swirl=no · changed=[Grape]
Request:
```json
null
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
    "person_kind": "self"
  },
  "observation": {
    "surface_text": "",
    "anchor_span": null
  },
  "next_question": {
    "should_advance": true,
    "framing": null
  }
}
```

### 3. [main] M2 · /m2 (phase A)
Summary: outcome=stated · problem="doomchecking my bank balance at the end of every month" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "An app to stop myself doomchecking my bank balance at the end of every month.",
  "user_line": "An app to stop myself doomchecking my bank balance at the end of every month.",
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
  "schema_version": "m2.v2",
  "mechanism": "M2",
  "phase": "problem",
  "outcome": "stated",
  "problem": {
    "text": "doomchecking my bank balance at the end of every month",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "Walk me through the last time you caught yourself doomchecking your bank balance at the end of the month: what did you actually do, step by step, from the moment you opened the app to when you stopped?",
  "recovered_problem": "doomchecking my bank balance at the end of every month",
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
  "user_line": "An app to stop myself doomchecking my bank balance at the end of every month.",
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2,
  "problem": {
    "text": "doomchecking my bank balance at the end of every month",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "surface_text": "The answer names a specific observable action: repeated app opens, an abandoned invoice, and a closed app with nothing completed. The moment is anchored to a single named date and a concrete financial deadline.",
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
  "problem": {
    "text": "doomchecking my bank balance at the end of every month",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "I built a spreadsheet that projects the month forward"
  },
  "observation": {
    "surface_text": "The answer describes the founder's own build and behaviour in place of a separate person's concrete response to the problem; under maturity_class 2 the grape is the founder, so no third party is present.",
    "anchor_span": "I built a spreadsheet that projects the month forward, I check that instead now."
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "Who else, someone you can name, has shown up at the end of a month dreading what the number says?"
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
  "problem": {
    "text": "doomchecking my bank balance at the end of every month",
    "source": "user_stated",
    "status": "confirmed"
  },
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
  "schema_version": "m4.v1",
  "mechanism": "M4",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "moved every client to 50 percent upfront after one late payer wrecked his rent month"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "My friend Daniel, who freelances in video"
  },
  "observation": {
    "surface_text": "Daniel is a named, specific person distinct from the grape and from any prior echo person, but his concrete behaviour addresses cash-flow timing through contract restructuring, not the act of doomchecking a balance, so the problem does not map directly onto the confirmed problem.",
    "anchor_span": "moved every client to 50 percent upfront after one late payer wrecked his rent month"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Daniel himself describe the end-of-month balance check as the thing he was trying to escape, or is the upfront payment his solution to a different pressure altogether?"
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
    "text": "doomchecking my bank balance at the end of every month",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2,
  "user_answer": "I use a budgeting app, but it only shows last month's picture, nothing about the invoice that has not landed yet."
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
    "anchor_span": "I use a budgeting app, but it only shows last month's picture, nothing about the invoice that has not landed yet."
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a budgeting app. The precise failure point is present: it reflects only historical data and cannot account for outstanding invoices not yet received.",
    "anchor_span": "it only shows last month's picture, nothing about the invoice that has not landed yet."
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
    "text": "doomchecking my bank balance at the end of every month",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2,
  "words_source": "real",
  "user_answer": "I caught myself saying out loud, \"I can't look at it again until the Bakker invoice lands.\""
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
    "anchor_span": "I can't look at it again until the Bakker invoice lands"
  },
  "tell": {
    "state": "settled",
    "anchor_span": "I caught myself saying out loud, \"I can't look at it again until the Bakker invoice lands.\""
  },
  "observation": {
    "surface_text": "The answer supplies a direct first-person quote from a real exchange, meeting the Words bar. The quoted words describe a filmable avoidance moment, catching the speaker saying the line aloud.",
    "anchor_span": "I caught myself saying out loud, \"I can't look at it again until the Bakker invoice lands.\""
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
    "text": "doomchecking my bank balance at the end of every month",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Jamie",
  "grape_relationship": "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
  "maturity_class": 2,
  "user_answer": "My uncle does the same kind of work but only takes retainer clients, so his balance is flat and boring. He is paid whether the work moves or not."
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
    "anchor_span": "only takes retainer clients, so his balance is flat and boring. He is paid whether the work moves or not."
  },
  "observation": {
    "surface_text": "The answer names a bounded individual (the uncle) whose income structure produces no month-end variability. The reason for immunity is specific: retainer billing pays regardless of whether work occurs, eliminating the unpredictable balance swings that drive doomchecking.",
    "anchor_span": "only takes retainer clients, so his balance is flat and boring. He is paid whether the work moves or not."
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
- none