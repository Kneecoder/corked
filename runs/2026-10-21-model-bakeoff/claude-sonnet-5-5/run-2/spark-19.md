# Corked Runner Report — spark 19

Generated: 2026-10-21T16:57:49.489Z
Worker: http://127.0.0.1:8791

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

M0's line (verbatim, not shown in the app): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=turbid
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=clearing, M6=turbid
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
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. One-man trade businesses are the role, and forgetting to chase unpaid invoices until the money is a problem is the stated problem. It enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the one-man trade business owner you have in mind and the moment an unpaid invoice went unchased.",
    "hint": "A good answer is a real tradesperson and a real invoice, with roughly when it was sent and when the money became a problem.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, self-employed plumber",
    "when_label": "When the invoice went unchased",
    "when_placeholder": "three weeks after finishing a bathroom job, when the van insurance came due",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "get paid for a finished job while already working on the next one",
    "happened_label": "What happened with the invoice",
    "happened_placeholder": "The invoice sat unsent to chase for a month, then he noticed the account was short and started calling the customer."
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
    "surface_text": "Noor is named and tied to the spark by a real relationship. She runs a one-woman landscaping business, which matches the one-person trade profile.",
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
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
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
  "question": "What was the specific moment Noor realised an unpaid landscaping invoice had gone unchased until the money was a problem, and what did she actually do next?",
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
  "state": "clearing",
  "tell": {
    "state": "clearing",
    "anchor_span": "Noor gave up partway through and fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The moment is anchored to \"Last Tuesday, right before a deadline.\" The action is generic: \"gave up partway through\" and \"the usual approach\" name no step a camera would capture, and no invoice or chase appears.",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "The answer could describe almost any business owner, so is Noor the one whose Tuesday this was, or a stand-in?"
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
    "surface_text": "The answer names one identifiable third party, Jordan, who is neither the grape nor the founder, and reports one concrete behaviour: paying a freelancer to handle it when it arises.",
    "anchor_span": "just pays a freelancer to sort it out whenever it comes up"
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
    "anchor_span": "she keeps a manual backup log for it"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "who works in a completely different setup, said she keeps a manual backup log for it, though for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names Priya, a new person distinct from Noor and Jordan, with a manual backup log as her behaviour, but the log and how the problem differs for her stay unspecified.",
    "anchor_span": "keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person you could name the setup of, or a stand-in for someone who might plausibly exist?"
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
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain spreadsheet template Noor uses to track invoices. The stated failure, that it does not catch the problem until it is too late, is a general complaint with no specific point at which the spreadsheet falls short.",
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Noor a specific person with a specific unpaid invoice she let slide, or a stand-in assembled for this answer?"
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
  "words_source": "real",
  "user_answer": "We talked about it over coffee last Friday and she confirmed the month-end thing is her biggest headache."
}
```
Response:
```json
{
  "schema_version": "m6.v1",
  "mechanism": "M6",
  "state": "clearing",
  "words": {
    "state": "clearing",
    "anchor_span": "she confirmed the month-end thing is her biggest headache"
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
    "surface_text": "The exchange is flagged real, but the answer summarizes the conversation and quotes nothing Noor said. No filmable action and no third-party reference appear in the recounting.",
    "anchor_span": "she confirmed the month-end thing is her biggest headache"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "What did Noor say over that coffee, in her own phrasing, when she described the month-end thing?"
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
    "anchor_span": "every freelancer has this. I can't think of a single one who doesn't."
  },
  "observation": {
    "surface_text": "The answer names no bounded exclusion and asserts universality instead. No reason for immunity is present because no one is identified as immune.",
    "anchor_span": "I can't think of a single one who doesn't."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Think of the one freelancer you know whose money arrives on a schedule they never have to chase, and say who that actually is."
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
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Tell, held at floor clearing (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).