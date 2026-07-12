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