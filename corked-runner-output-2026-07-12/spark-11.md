# Corked Runner Report — spark 11

Generated: 2026-07-12T15:46:08.611Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M3 grape exclusion — plus one doctrine corner to record. Expect: echo turbid despite the concrete behaviour and moment — every person in the answer is the grape. Corner to record: does Vintage rank up opportunistically off this grape-only moment while echo goes turbid? Doctrine says Vintage grades when the answer carries a moment; it does not say whose. Log the result either way; this is a doctrine call waiting to be made, not a bug.

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Femke — my sister-in-law, photographer
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=clearing
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
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear, one-man trade businesses, and the stated problem is forgetting to chase unpaid invoices until the money is already a problem. Both are present and in the user's own words.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name one specific person who runs a one-man trade business and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names the trade, the person, and what was happening when they noticed the invoice had gone too long.",
    "person_label": "Tradesperson",
    "person_placeholder": "Danny, self-employed plumber",
    "when_label": "When the money got tight",
    "when_placeholder": "when he checked his account before paying a supplier",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his materials bill for the next job",
    "happened_label": "What he found",
    "happened_placeholder": "three invoices from the past month still unpaid, none of them chased"
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
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "Femke is identified by name and by a concrete relational tie. The grape is settled.",
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
Summary: recovered_problem="forgetting to chase unpaid invoices until the money is a problem" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money is a problem",
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
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "forgetting to chase unpaid invoices until the money is a problem",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "Femke is a one-person trade business who forgets to follow up on unpaid invoices until cash runs short. The problem is in the spark verbatim.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Femke realised money was tight and traced it back to an invoice she had not chased, what did she actually do when she noticed?",
  "hint": "A good answer names a specific invoice, how overdue it was when Femke noticed, and the first concrete thing she did in response, not how she felt about it.",
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Femke",
  "grape_relationship": "my sister-in-law, photographer",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "state": "clearing",
    "anchor_span": "didn't invoice until three weeks later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month Femke finished a wedding shoot"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a specific shoot last month. The tell names a delayed action but stops at an inferred consequence rather than a filmable behaviour Femke performed in response to the overdue payment.",
    "anchor_span": "didn't invoice until three weeks later"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "When the couple had spent their budget, what did Femke actually do next with that invoice?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "anchor_span": "Femke started adding a 30 percent booking fee in January after two no-shows in one month"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "in January after two no-shows in one month"
  },
  "observation": {
    "surface_text": "The answer describes only Femke's behaviour, who is the grape and therefore excluded from serving as the Echo. No separate third party appears anywhere in the answer.",
    "anchor_span": "Femke started adding a 30 percent booking fee in January after two no-shows in one month"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "Who else, outside this household, is sitting on a pile of unpaid invoices right now and doing something about it?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "showed me the whiteboard in her kitchen last week"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "observation": {
    "surface_text": "The answer names a real third party, Priya, with a concrete behaviour, but her problem is deposits going missing rather than forgetting to chase unpaid invoices, so the confirmed problem is not confirmed for her. The whiteboard detail anchors a recent visit but the chasing problem does not transfer to this person.",
    "anchor_span": "the chasing part she has under control."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Priya ever lose track of which jobs have been paid in full, or is the whiteboard system genuinely solving the follow-up problem for her?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "surface_text": "The answer names a basic invoicing app as the existing solution. The precise failure point is present: the app has no automatic reminders, leaving follow-up dependent on Femke's memory alone.",
    "anchor_span": "uses a basic invoicing app, but it has no automatic reminders, so nothing chases the client but her own memory"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "anchor_span": "\"I hate having to be the one who asks for money,\" she said after the honeymoon one."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I hate having to be the one who asks for money,\" she said after the honeymoon one."
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a flagged real exchange is present, placing Words at settled. The quoted language carries a stated aversion but no filmable action, and no third-party reference appears.",
    "anchor_span": "\"I hate having to be the one who asks for money,\" she said after the honeymoon one."
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
    "anchor_span": "Owen works only through an agency that invoices clients on his behalf"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual, Owen, in a specific arrangement where an agency handles invoicing on his behalf. The reason for exemption is concrete and present-day: the agency absorbs the chasing function, leaving Owen with no invoice-recovery task to forget.",
    "anchor_span": "the agency handles it"
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
- M4 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).