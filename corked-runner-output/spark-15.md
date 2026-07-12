# Corked Runner Report — spark 15

Generated: 2026-07-11T18:28:09.554Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M2 tell clearing, vintage unanchored — the most common real answer shape. Expect: tell clearing (emotion in place of behaviour), vintage clearing ("whenever" is recurring, unanchored), overall clearing. A swirl should plausibly fire; log its kind and question, do not answer it. (m3-m7 not specified by the brief — left on generic settled-quality placeholders since they are not under test here.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: clearing — history: inert → turbid → clearing (last raised by M4)
  raw grades: M2=turbid, M3=clearing, M4=turbid
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
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
    "triggering_situation": "money becomes a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is present: one-man trade businesses who forget unpaid invoices until cash runs short.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific one-man trade business owner and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names the trade, the person, and the point when the forgotten invoice surfaced as a cash shortfall.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dean, sole-trader electrician",
    "when_label": "When the money became a problem",
    "when_placeholder": "end of the month when he checked his account before paying a supplier",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his supplier bill and realised the cash was short",
    "happened_label": "What actually happened",
    "happened_placeholder": "found three invoices from six weeks ago still unpaid, none of them chased"
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
    "surface_text": "A named individual is present. The relationship is concrete and specific.",
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "money becomes a problem",
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
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names the problem directly: Noor forgets to chase unpaid invoices until cash is already tight. The implied person matches the grape.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor realized a landscaping invoice had gone unpaid long enough to hurt her cash, what did she actually do when she noticed it?",
  "hint": "A strong answer names a specific job, how long the invoice sat, and what Noor did next, called, ignored it, sent a text, not how she felt about it.",
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
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "gap_in_play": false,
  "user_answer": "She gets really stressed about it whenever a client goes quiet, and usually she just puts off looking at the numbers."
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
    "state": "clearing",
    "anchor_span": "puts off looking at the numbers"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The Tell names a deferred action but frames it as a recurring pattern rather than a filmed moment. No specific instance is named in the answer, no date, event, or single occasion grounds the behaviour in time.",
    "anchor_span": "puts off looking at the numbers"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there one specific client going quiet that Noor is sitting with right now, or is this a pattern assembled from several different episodes?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": false,
    "obs_anchor_verified": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:dash"
    ],
    "overall_state_is_floor": true,
    "swirl_included": true
  }
}
```

### 5. [main] M3 · /m3
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Echo, Vintage]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
  "vintage": {
    "state": "clearing",
    "anchor_span": "whenever it comes up"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Jordan, with a concrete workaround: paying a freelancer to handle it. The Vintage bar finds a recurring pattern anchored to no single instance.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "different",
    "anchor_span": "for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names Priya and a concrete workaround but provides no detail on her role or context sufficient to establish her as an identifiable individual rather than a named stand-in. No specific past instance is present, only an ongoing behaviour.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya someone who could be reached and asked about this directly, and what field or kind of work does she actually do?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "anchor_span": "plain spreadsheet template to track it"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain spreadsheet template. The failure point given is that it does not catch the problem until too late, which states a timing shortfall but does not identify the precise mechanism that fails, such as no alerts, no due-date flags, or no automated reminder.",
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "When Noor last had an overdue invoice go unnoticed, was she checking that spreadsheet and still missed it, or had she stopped opening it entirely?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:not_x_but_y"
    ],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M6 · /m6
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "anchor_span": null
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer provides a direct quote from a named real exchange, satisfying the Words bar. The quoted words carry a stated sentiment about the problem but no filmable action, and no third-party reference is present.",
    "anchor_span": "\"I just want this part to be boring,\" Noor said, when we talked about it last week."
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "surface_text": "The answer names a bounded individual and a specific arrangement that removes invoice-chasing from the equation. The reason is present and concrete: retainer billing decouples payment from job occurrence, eliminating the lag that creates the problem.",
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
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
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M5.observation.surface_text: "The answer names an existing solution: a plain spreadsheet template. The failure point given is that it does not catch the problem until too late, which states a timing shortfall but does not identify the precise mechanism that fails, such as no alerts, no due-date flags, or no automated reminder."

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor clearing (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).