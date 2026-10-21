# Corked Runner Report — spark 11

Generated: 2026-10-21T16:41:24.342Z
Worker: http://127.0.0.1:8790

## Test under this spark
M3 grape exclusion — plus one doctrine corner to record. Expect: echo turbid despite the concrete behaviour and moment — every person in the answer is the grape. Corner to record: does Vintage rank up opportunistically off this grape-only moment while echo goes turbid? Doctrine says Vintage grades when the answer carries a moment; it does not say whose. Log the result either way; this is a doctrine call waiting to be made, not a bug.

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Femke — my sister-in-law, photographer
expect_halt: false

Line sent to the worker (the spark as typed): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

M0's line (verbatim, not shown in the app): "A way for one-man trade businesses to chase unpaid invoices before the money becomes a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
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
  "user_line_candidate": "A way for one-man trade businesses to chase unpaid invoices before the money becomes a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": "unpaid invoices left unchased",
    "promised_change": "chasing invoices before the money becomes a problem",
    "domain": "trade businesses, invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role, one-man trade businesses, and the stated problem, forgetting to chase unpaid invoices until the money is a problem, enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific one-man trade business owner and the moment they realised an invoice had gone unchased for too long.",
    "hint": "A good answer names a particular tradesperson and a concrete moment, such as a missed payment that caused a cash shortfall that week.",
    "person_label": "Business owner",
    "person_placeholder": "Dan, self-employed plumber",
    "when_label": "When it happened",
    "when_placeholder": "the week before he had to pay his van insurance",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "keep cash flowing between jobs",
    "happened_label": "What actually happened",
    "happened_placeholder": "an invoice from six weeks earlier was still unpaid and nobody had followed it up"
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
    "surface_text": "A named individual is present, Femke, with a stated relationship as sister-in-law and photographer. The name and the real tie both appear in the answer.",
    "anchor_span": null
  },
  "next_question": {
    "should_advance": true,
    "framing": null
  },
  "_anchor_verification_failed": true,
  "server_checks": {
    "schema_valid": true,
    "anchor_verified": false,
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
    "domain": "trade businesses, invoices",
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
  "question": "Tell me about the specific last time Femke forgot to chase an unpaid invoice and only noticed once the money had become a problem: what happened, and what did she actually do next?",
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
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0,
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
  "state": "settled",
  "tell": {
    "state": "settled",
    "anchor_span": "didn't invoice until three weeks later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month Femke finished a wedding shoot"
  },
  "observation": {
    "surface_text": "The answer names a specific action: Femke finished the wedding shoot and did not send the invoice for three weeks. The moment is anchored to one wedding shoot last month. The answer does not show Femke doing anything to chase the payment once the invoice was late, so the chasing behaviour remains unestablished.",
    "anchor_span": "didn't invoice until three weeks later"
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
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[Echo]
Request:
```json
{
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes only Femke's own response to two no-shows, which is the grape's behaviour, so no separate third party is present and the Echo remains turbid.",
    "anchor_span": "Femke started adding a 30 percent booking fee in January after two no-shows in one month."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific client, colleague, or other photographer outside Femke who has faced unpaid or late payments and done something concrete about it?"
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
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "Priya, who runs a catering van, showed me the whiteboard in her kitchen last week where she crosses off paid jobs."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "observation": {
    "surface_text": "The answer names Priya, a catering van owner distinct from the grape, but she is the same person as the prior echo context's workaround-free account and describes a different failure, deposits going missing, rather than chasing unpaid invoices.",
    "anchor_span": "Priya, who runs a catering van, showed me the whiteboard in her kitchen last week where she crosses off paid jobs."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific individual you have directly observed, or is her whiteboard a summary of what you have heard secondhand?"
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
    "anchor_span": "Femke uses a basic invoicing app, but it has no automatic reminders, so nothing chases the client but her own memory."
  },
  "observation": {
    "surface_text": "An existing solution is named: a basic invoicing app. The precise failure point is stated: the app sends no automatic reminders, so chasing depends entirely on her memory.",
    "anchor_span": "Femke uses a basic invoicing app, but it has no automatic reminders"
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
    "anchor_span": "\"I hate having to be the one who asks for money,\" she said"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I hate having to be the one who asks for money,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer carries a direct quote attributed to the grape from a real exchange, which meets the words bar. The quoted words state a feeling of resentment about asking for money but describe no filmable action.",
    "anchor_span": "\"I hate having to be the one who asks for money,\" she said"
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
    "anchor_span": "Owen works only through an agency that invoices clients on his behalf. Chasing payments never happens to him because the agency handles it."
  },
  "observation": {
    "surface_text": "The answer names a bounded exclusion: Owen, who works only through an agency that invoices on his behalf. The reason is present and specific: chasing payments never reaches him because the agency handles it.",
    "anchor_span": "Chasing payments never happens to him because the agency handles it."
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
- ⚠ NOTE: M1 anchor_span failed verbatim verification and was server-corrected to null (model attempted fabrication).

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).