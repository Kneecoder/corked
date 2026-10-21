# Corked Runner Report — spark 12

Generated: 2026-10-21T16:41:38.691Z
Worker: http://127.0.0.1:8790

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

M0's line (verbatim, not shown in the app): "An app to stop the speaker checking their bank balance at the end of every month."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → turbid → settled (last raised by M4)
  raw grades: M3=turbid, M4=settled
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
  "user_line_candidate": "An app to stop the speaker checking their bank balance at the end of every month.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "the speaker",
    "suspected_problem": "the speaker checks their bank balance compulsively at the end of every month",
    "triggering_situation": "the end of every month",
    "promised_change": "the speaker stops checking their bank balance at the end of every month",
    "domain": "bank balance",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The app form, the speaker, the compulsive checking, and the end-of-month trigger are all stated, so it enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific moment at the end of a month when you reach for your bank balance.",
    "hint": "A good answer names the day, the time, and what you were doing just before you opened the app.",
    "person_label": "Checker",
    "person_placeholder": "Sam, account holder",
    "when_label": "When it happened",
    "when_placeholder": "the last Thursday of the month, after payday bills came out",
    "trying_label": "What you were trying to do",
    "trying_placeholder": "see whether the month had gone as planned",
    "happened_label": "What happened",
    "happened_placeholder": "you opened the banking app three times in ten minutes and closed it each time without deciding anything"
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
Summary: outcome=stated · problem="stop myself doomchecking my bank balance at the end of every month" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "An app to stop myself doomchecking my bank balance at the end of every month.",
  "user_line": "An app to stop myself doomchecking my bank balance at the end of every month.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "the speaker",
    "suspected_problem": "the speaker checks their bank balance compulsively at the end of every month",
    "triggering_situation": "the end of every month",
    "promised_change": "the speaker stops checking their bank balance at the end of every month",
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
    "text": "stop myself doomchecking my bank balance at the end of every month",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "Think of the last end of the month when you opened your bank app to check your balance, and describe exactly what you did from the moment you opened it until you closed it.",
  "recovered_problem": "stop myself doomchecking my bank balance at the end of every month",
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
    "text": "stop myself doomchecking my bank balance at the end of every month",
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
    "surface_text": "The answer names a filmable action: opening the banking app an eleventh time, then closing it without finishing the invoice. The moment is anchored to the 28th of last month, right before rent was due.",
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
    "text": "stop myself doomchecking my bank balance at the end of every month",
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
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes the founder's own spreadsheet build and personal workaround with no separate person present, and the grape is the founder, so the Echo cannot be satisfied.",
    "anchor_span": "I built a spreadsheet that projects the month forward, I check that instead now."
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "Is there any other person, apart from you, who has described checking their own month-end balance and what they did instead of doomchecking?"
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Echo]
Request:
```json
{
  "problem": {
    "text": "stop myself doomchecking my bank balance at the end of every month",
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
  "state": "settled",
  "echo": {
    "state": "settled",
    "anchor_span": "My friend Daniel, who freelances in video, told me in April he moved every client to 50 percent upfront after one late payer wrecked his rent month."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "same",
    "anchor_span": "who freelances in video"
  },
  "observation": {
    "surface_text": "A named third party, Daniel, a freelance video worker, moved all clients to 50 percent upfront after a late payment disrupted his rent, a concrete behaviour distinct from the grape and the prior echo.",
    "anchor_span": "he moved every client to 50 percent upfront after one late payer wrecked his rent month"
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
    "text": "stop myself doomchecking my bank balance at the end of every month",
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
    "surface_text": "The answer names an existing solution, a budgeting app. It states a precise failure point: the app shows only last month's picture and omits the invoice that has not yet landed.",
    "anchor_span": "it only shows last month's picture, nothing about the invoice that has not landed yet"
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
    "text": "stop myself doomchecking my bank balance at the end of every month",
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
    "anchor_span": "I can't look at it again until the Bakker invoice lands."
  },
  "tell": {
    "state": "settled",
    "anchor_span": "I can't look at it again until the Bakker invoice lands."
  },
  "observation": {
    "surface_text": "The answer quotes direct speech from the speaker, and words_source is real, so the Words bar is met. The quoted words describe a specific, filmable action, the decision to avoid looking at the balance until a named invoice arrives.",
    "anchor_span": "I can't look at it again until the Bakker invoice lands."
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
    "text": "stop myself doomchecking my bank balance at the end of every month",
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
    "anchor_span": "My uncle does the same kind of work but only takes retainer clients, so his balance is flat and boring. He is paid whether the work moves or not."
  },
  "observation": {
    "surface_text": "The answer names a bounded exclusion: the speaker's uncle, who works retainer clients only. The reason is present and specific: he is paid whether the work moves or not, so his balance does not swing with the work.",
    "anchor_span": "He is paid whether the work moves or not."
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