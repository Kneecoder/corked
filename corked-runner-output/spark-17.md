# Corked Runner Report — spark 17

Generated: 2026-07-11T18:29:43.886Z
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

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=clearing, M4=turbid
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
    "triggering_situation": "when the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is specific: one-man trade businesses forget to chase unpaid invoices until the money is already a problem.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific tradesperson this starts from and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names one person, their trade, and the point at which they noticed the invoice was overdue and the cash was already short.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dean, one-man plumbing business",
    "when_label": "When the money became a problem",
    "when_placeholder": "the week he couldn't cover a supply order and found three invoices still unpaid",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover a supply order and keep jobs running",
    "happened_label": "What actually happened",
    "happened_placeholder": "he checked his account, found the cash was short, then opened his invoices and realised three had been sitting unpaid for weeks"
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
    "triggering_situation": "when the money is a problem",
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
    "surface_text": "The spark names forgetting to chase unpaid invoices until cash becomes a problem. Noor runs a one-woman landscaping business and is a firsthand witness to this problem.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Noor noticed an unpaid invoice had gone too long, what had she actually done about it by that point, if anything?",
  "hint": "A good answer names a specific job, how many days or weeks the invoice had been sitting, and what Noor did or did not do when she finally noticed the money was short.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash"
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
    "anchor_span": "fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The moment is anchored to a specific instance last Tuesday. The behaviour named is a fallback to a spreadsheet, but the action that broke down before that fallback is described only as 'the usual approach' and 'gave up partway through,' without naming what Noor visibly did or stopped doing.",
    "anchor_span": "fell back to a plain spreadsheet"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Noor the one who noticed the breakdown last Tuesday, or is this account assembled from what she told you afterward?"
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
    "anchor_span": "Last month, my colleague Jordan mentioned"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable person separate from both the grape and the founder, named and doing a concrete thing. The Vintage bar finds a time anchor for when the mention occurred but the workaround itself is described as a recurring pattern rather than a single instance.",
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
    "surface_text": "The answer names Priya and attributes one behaviour to her, but the description lacks enough specificity to confirm she is a real, identifiable individual rather than a constructed stand-in. No specific past instance is present, only a recurring pattern.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person who could be named and located, or is she a representative type drawn from a general sense of who else might have this problem?"
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
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "surface_text": "The answer names no existing solution separate from the founder's own build. The substitution rule caps the gap at turbid because the only thing described is the founder's own prototype, not a tool, service, person, or habit Noor currently uses.",
    "anchor_span": "my prototype"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "When Noor's invoices go unpaid today, before any prototype is involved, what does she actually do to chase them?"
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
    "anchor_span": "\"I just want this part to be boring,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a real exchange is present, attributed to Noor by name with a stated occasion. The words carry a felt sentiment about the problem but no filmable action, and no third-party reference appears.",
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
    "surface_text": "The answer names a specific individual (the uncle) in a precisely bounded arrangement (retainer-only clients). The reason for immunity is stated: payment is contractually scheduled and does not depend on job completion, removing the chase mechanic entirely.",
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
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M3 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).