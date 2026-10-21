# Corked Runner Report — spark 11

Generated: 2026-10-21T16:53:59.588Z
Worker: http://127.0.0.1:8791

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

M0's line (verbatim, not shown in the app): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: clearing — history: inert → clearing (last raised by M2)
  raw grades: M2=clearing
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → turbid → settled (last raised by M6)
  raw grades: M3=turbid, M4=settled, M6=turbid
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
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": "the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is visible in one-man trade businesses, and the problem is stated: they forget to chase unpaid invoices until the money is a problem. It enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the one-man trade business owner you have in mind and the moment an unpaid invoice was sitting there unchased.",
    "hint": "A good answer names a real tradesperson and a real invoice that went unchased until the money became a problem.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, self-employed electrician",
    "when_label": "When the invoice sat unchased",
    "when_placeholder": "six weeks after finishing a kitchen rewire",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "keep up with jobs while the invoice stayed unpaid",
    "happened_label": "What happened with the invoice",
    "happened_placeholder": "He finished the job, sent the invoice, moved on to the next one, and noticed the unpaid invoice only when the bank balance ran low."
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
    "temporal_grounding": "none"
  },
  "observation": {
    "surface_text": "Femke is a named individual with a stated tie, sister-in-law. The grape is identified.",
    "anchor_span": "my sister-in-law, photographer"
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
    "triggering_situation": "the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
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
  "question": "What was the specific moment Femke realised an unpaid invoice had gone unchased until the money was a problem, and what did she actually do next?",
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Tell, Vintage]
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
  "state": "clearing",
  "tell": {
    "state": "settled",
    "anchor_span": "didn't invoice until three weeks later"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "Last month"
  },
  "observation": {
    "surface_text": "The answer names an observable action: the invoice was sent three weeks after the shoot. The moment is anchored only to \"Last month\", with no specific day or surrounding context.",
    "anchor_span": "didn't invoice until three weeks later"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Femke the one who told you about this late invoice, or is this account pieced together from what you assumed happened?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_floor": true,
    "swirl_included": true
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
    "anchor_span": "Femke started adding a 30 percent booking fee in January"
  },
  "observation": {
    "surface_text": "The only person in the answer is Femke, the grape, so no separate third party and no outside confirmation of the unpaid-invoice problem is present.",
    "anchor_span": "Femke started adding a 30 percent booking fee in January after two no-shows in one month."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a second person, with a name or a job, who has sat on an unpaid invoice and done something about it, or does Femke stand alone in this account?"
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
  "state": "settled",
  "echo": {
    "state": "settled",
    "anchor_span": "Priya, who runs a catering van, showed me the whiteboard in her kitchen last week where she crosses off paid jobs."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "observation": {
    "surface_text": "The answer names Priya, a catering van operator distinct from Femke and the prior echo, who tracks paid jobs on a kitchen whiteboard.",
    "anchor_span": "showed me the whiteboard in her kitchen last week where she crosses off paid jobs"
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
    "anchor_span": "uses a basic invoicing app, but it has no automatic reminders, so nothing chases the client but her own memory"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a basic invoicing app already in use. It also states the precise failure: no automatic reminders, leaving only her memory to chase the client.",
    "anchor_span": "it has no automatic reminders, so nothing chases the client but her own memory"
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
    "surface_text": "The answer carries a direct quote attributed to Femke, and words_source is real, so the language is the grape's own. The quote states a feeling about asking for money, but no filmable action and no third-party reference appear in it.",
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
    "surface_text": "The answer names Owen, an identifiable individual who works only through an agency, as someone outside the problem. The reason is present and specific: the agency invoices clients on his behalf, so chasing payments never reaches him.",
    "anchor_span": "Owen works only through an agency that invoices clients on his behalf."
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