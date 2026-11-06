# Corked Runner Report — spark 17

Generated: 2026-11-06T19:05:32.080Z
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

Line sent to the worker (the spark as typed): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

M0's line (verbatim, not shown in the app): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → turbid → clearing (last raised by M6)
  raw grades: M2=turbid, M6=clearing
- **Vintage**: clearing — history: inert → clearing (last raised by M2)
  raw grades: M2=clearing
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
    "triggering_situation": "unpaid invoices left unchased until the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is specific: one-man trade businesses who let unpaid invoices sit until cash is already short.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific sole trader you have in mind and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names the trade (plumber, electrician, painter), the person if you know one, and the moment the cash shortfall hit.",
    "person_label": "Sole trader",
    "person_placeholder": "Dave, self-employed electrician",
    "when_label": "When the money became a problem",
    "when_placeholder": "end of the month when rent was due and three invoices were still unpaid",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his bills while finishing a job for a new client",
    "happened_label": "What actually happened",
    "happened_placeholder": "he noticed his account was short and had to scroll back through his emails to find which invoices he had never followed up"
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
  },
  "ai_fields": [
    "user_line_candidate",
    "digestibility.reason",
    "m1_setup.question",
    "m1_setup.hint",
    "m1_setup.person_label",
    "m1_setup.person_placeholder",
    "m1_setup.when_label",
    "m1_setup.when_placeholder",
    "m1_setup.trying_label",
    "m1_setup.trying_placeholder",
    "m1_setup.happened_label",
    "m1_setup.happened_placeholder",
    "spark_parse.solution_form",
    "spark_parse.implied_person",
    "spark_parse.suspected_problem",
    "spark_parse.triggering_situation",
    "spark_parse.domain"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "surface_text": "A named individual is present. The relationship is specific and real.",
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
  },
  "ai_fields": [
    "observation.surface_text",
    "grape.named_person"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "unpaid invoices left unchased until the money is a problem",
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
  "question": "Tell me about the last time Noor realised she had unpaid invoices sitting there uncollected, what had she actually done, or not done, in the days before she noticed?",
  "recovered_problem": "forget to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "ai_fields": [
    "question"
  ],
  "server_checks": {
    "schema_valid": true,
    "model_outcome": "stated",
    "outcome": "stated",
    "downgrades": [],
    "unsupported_words": [],
    "visible_style_violations_cleaned": [
      "question:dash"
    ],
    "m2_question_repaired": false
  },
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
  "state": "turbid",
  "tell": {
    "state": "turbid",
    "anchor_span": null
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a specific day and context. The Tell contains no observable action by Noor: phrases like 'tried the usual approach,' 'broke down,' and 'fell back to a plain spreadsheet' name outcomes and patterns without capturing a filmable behaviour Noor performed.",
    "anchor_span": "tried the usual approach and it broke down at the same point it always does"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Noor a person the answer-giver has watched work through this, or a composite built from several conversations about how she generally operates?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": false,
    "vintage_anchor_verified": true,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_floor": true,
    "swirl_included": true
  },
  "ai_fields": [
    "observation.surface_text",
    "swirl.question"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
  },
  "observation": {
    "surface_text": "The answer names one identifiable person distinct from the grape and the founder, attributes the same problem to them, and describes a concrete workaround they use.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": false
  },
  "ai_fields": [
    "observation.surface_text"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "different",
    "anchor_span": "for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names Priya and attributes a concrete behaviour (manual backup log), but the problem she is managing is described as showing up differently, leaving it unconfirmed that she has hit the same confirmed problem.",
    "anchor_span": "for her it shows up a little differently"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "What specifically does Priya's manual backup log track, and is the thing she forgets to chase the same unpaid invoices Noor forgets, or something else entirely?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  },
  "ai_fields": [
    "observation.surface_text",
    "swirl.question"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
}
```

### 7. [main] M5 · /m5
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[Gap]
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
    "surface_text": "The answer names only the founder's own prototype as the existing fix, which the substitution rule excludes. No solution that exists independently of the founder's build is named.",
    "anchor_span": "my prototype"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "What does Noor actually do today, before your prototype enters the picture, when an invoice sits unpaid past its due date?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  },
  "ai_fields": [
    "observation.surface_text",
    "swirl.question"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
}
```

### 8. [main] M6 · /m6
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell]
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
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a named real exchange is present, meeting the Words settled bar. The words carry a stated sentiment about the problem but no filmable action, and no third-party reference appears.",
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": false
  },
  "ai_fields": [
    "observation.surface_text"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "surface_text": "The answer names a bounded individual (the uncle) who operates exclusively on retainer and therefore has no unpaid invoices to chase. The reason for immunity is present and specific: retainer billing means payment is not contingent on job completion.",
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": false
  },
  "ai_fields": [
    "observation.surface_text"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).