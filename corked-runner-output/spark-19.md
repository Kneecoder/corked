# Corked Runner Report — spark 19

Generated: 2026-07-11T18:31:19.318Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M7 universality — with secondary M6 probe. Expect: M7 limit turbid — asserting universality is a turbid answer, not a strong one. Secondary: M6 words clearing — a real exchange happened but the answer contains no actual language from it. (m2-m5 not specified by the brief — left on generic settled-quality placeholders.)

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
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=clearing, M4=turbid
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
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "when the money becomes a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is forgetting to chase unpaid invoices until cash becomes a problem. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific one-man trade business owner this starts from and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names a real tradesperson and a concrete moment, such as checking their account before paying a supplier and finding it short because a customer still had not paid.",
    "person_label": "Tradesperson",
    "person_placeholder": "Gary, sole-trader electrician",
    "when_label": "When the invoice problem hit",
    "when_placeholder": "the week he needed to pay for materials and two invoices were still unpaid",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover costs for the next job without chasing customers himself",
    "happened_label": "What actually happened",
    "happened_placeholder": "he only noticed the overdue invoices when his account balance came up short before a supplier payment"
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
    "surface_text": "A named individual is present. The relationship is specific and real: a friend who runs a one-woman landscaping business.",
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
    "triggering_situation": "when the money becomes a problem",
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
    "surface_text": "The spark names the problem directly: a one-person trade operator loses track of unpaid invoices until a cash shortfall forces attention. Noor runs a solo landscaping business and has been observed firsthand.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor realised a landscaping invoice had gone unpaid too long, what did she actually do when she noticed?",
  "hint": "A good answer names a specific job, how many days or weeks late the invoice was, and what Noor did next, called the client, sent a message, nothing yet, not how she felt about it.",
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
  "grape_name": "Noor",
  "grape_relationship": "my friend, runs a one-woman landscaping business",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "anchor_span": "gave up partway through and fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a specific moment. The tell names a fallback action but the trigger behaviour remains a pattern description rather than a single observable act: what Noor was doing at the point of breakdown is not captured.",
    "anchor_span": "gave up partway through and fell back to a plain spreadsheet"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is the breakdown described something witnessed directly, or assembled from what Noor has said about how this usually goes?"
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
    "surface_text": "The Echo bar is settled: a named third party, Jordan, is identified as separate from the grape and the founder, with a concrete workaround of paying a freelancer to handle the problem. The Vintage bar is clearing: the behaviour is described as a recurring pattern with no specific past instance anchored.",
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
    "surface_text": "The answer names a person, Priya, with one described behaviour, but the role and context are not specified enough to confirm she is a real identifiable individual rather than a constructed stand-in. No specific past instance is present, only a recurring described practice.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person the founder can name a context for, or does she represent a type of person the founder expects to have this problem?"
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
    "surface_text": "The answer names an existing solution: a plain spreadsheet template. The failure point given is that it does not catch the problem until too late, which is a timing complaint without a precise mechanism of failure.",
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "When Noor last had an overdue invoice, what did she actually do on the spreadsheet that failed to flag it in time?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "state": "clearing",
    "anchor_span": "she confirmed the month-end thing is her biggest headache"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer recounts that a real exchange occurred and attributes a sentiment to Noor, but no direct language from her is present. No filmable behaviour appears in the attributed words, and no third-party reference is contained in them.",
    "anchor_span": "she confirmed the month-end thing is her biggest headache"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "What did Noor actually say about the month-end problem in her own words during that conversation?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "surface_text": "The answer names no bounded exclusion, asserting instead that the problem is universal. No reason for any individual or group's immunity is present because no exempt party is identified.",
    "anchor_span": "every freelancer has this. I can't think of a single one who doesn't."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a landscaper, contractor, or solo operator whose invoices are handled by someone else entirely, a bookkeeper, an agency, a spouse who runs the admin side, so the forgetting simply has no room to happen?"
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
- M3 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).