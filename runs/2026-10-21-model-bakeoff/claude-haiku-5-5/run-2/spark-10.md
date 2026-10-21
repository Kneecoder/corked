# Corked Runner Report — spark 10

Generated: 2026-10-21T16:45:47.586Z
Worker: http://127.0.0.1:8790

## Test under this spark
M3 category rule, then M4 rank-up. Expect: M3 echo clearing, never settled — the named workaround does not rescue the category; observation names a population, not a person. M4 echo settled, so element history shows clearing -> settled with no regression. M4 contrast fields are strings: is_different_kind "true", same_or_different "different" (the boolean-wipe bug check).

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Tomas — my neighbour, carpenter with a one-man business
expect_halt: false

Line sent to the worker (the spark as typed): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

M0's line (verbatim, not shown in the app): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: settled — history: inert → clearing → settled (last raised by M6)
  raw grades: M3=clearing, M4=settled, M6=turbid
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
    "suspected_problem": "they forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": "until the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The solution form, the population of one-man trade businesses, and the stated problem of forgotten invoice chasing are all visible and enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the one-man trade business owner and the moment they realised an unpaid invoice had become a problem.",
    "hint": "A good answer names a specific tradesperson, such as an electrician or plumber, and the invoice or cash gap that made the lapse visible.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dan, self-employed electrician",
    "when_label": "When the invoice became a problem",
    "when_placeholder": "three months after the job, when the rent was due",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "keep cash flowing between jobs without chasing clients every week",
    "happened_label": "What actually happened",
    "happened_placeholder": "an invoice from a job two months earlier was still unpaid, and the bills had already come out"
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
  "person_name": "Tomas",
  "relationship": "my neighbour, carpenter with a one-man business",
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
    "named_person": "Tomas",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present, Tomas, with a stated real tie as a neighbour who runs a one-man carpentry business. The relationship is specific enough to settle the grape.",
    "anchor_span": "Tomas"
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
Summary: outcome=guessed · problem="they forget to chase unpaid invoices until the money is a problem" (system_hypothesis) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "they forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": "until the money is a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v2",
  "mechanism": "M2",
  "phase": "problem",
  "outcome": "guessed",
  "problem": {
    "text": "they forget to chase unpaid invoices until the money is a problem",
    "source": "system_hypothesis",
    "status": "proposed"
  },
  "gap_in_play": false,
  "question": "Walk me through the specific moment Tomas last realised an unpaid invoice had become a money problem, and what he actually did when he noticed.",
  "recovered_problem": "they forget to chase unpaid invoices until the money is a problem",
  "needs_confirmation": true,
  "server_checks": {
    "schema_valid": true,
    "model_outcome": "stated",
    "outcome": "guessed",
    "downgrades": [
      {
        "from": "stated",
        "to": "guessed",
        "reason": "stated_span_not_verbatim_in_spark",
        "text": "they forget to chase unpaid invoices until the money is a problem"
      }
    ],
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
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "problem": {
    "text": "they forget to chase unpaid invoices until the money is a problem",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "user_answer": "Last month Tomas finished a kitchen cabinet job and didn't send the invoice until three weeks later, by which point the client had already spent the budget elsewhere and paid him in installments."
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
    "anchor_span": "didn't send the invoice until three weeks later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month Tomas finished a kitchen cabinet job"
  },
  "observation": {
    "surface_text": "The answer names a filmable action: the invoice was not sent until three weeks after the job finished. The moment is anchored to one job last month. No account of how the delay was felt or handled by Tomas appears, so the state is clearing.",
    "anchor_span": "didn't send the invoice until three weeks later"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Echo]
Request:
```json
{
  "problem": {
    "text": "they forget to chase unpaid invoices until the money is a problem",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "user_answer": "Lots of tradesmen I know just keep it in their heads or a notebook."
}
```
Response:
```json
{
  "schema_version": "m3.v1",
  "mechanism": "M3",
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "Lots of tradesmen I know just keep it in their heads or a notebook."
  },
  "observation": {
    "surface_text": "The answer names a category of tradesmen the speaker knows and a workaround of memory or a notebook, but no single identifiable person is named or described doing one concrete thing.",
    "anchor_span": "Lots of tradesmen I know just keep it in their heads or a notebook."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Name one specific tradesman you know who keeps track of unpaid invoices in a notebook, and say what he actually does when a payment is late."
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
    "text": "they forget to chase unpaid invoices until the money is a problem",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "prior_echo_context": "Lots of tradesmen I know just keep it in their heads or a notebook.",
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
    "surface_text": "A separate person, Priya, who runs a catering van, tracks paid jobs on a whiteboard and reports that for her the problem is missing deposits rather than chasing unpaid invoices.",
    "anchor_span": "Priya, who runs a catering van, showed me the whiteboard in her kitchen last week where she crosses off paid jobs."
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Gap]
Request:
```json
{
  "problem": {
    "text": "they forget to chase unpaid invoices until the money is a problem",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "user_answer": "Tomas uses a paper invoice pad from the hardware store, but it has no reminder system at all, so following up depends entirely on him remembering."
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
    "anchor_span": "Tomas uses a paper invoice pad from the hardware store"
  },
  "observation": {
    "surface_text": "The answer names an existing solution, a paper invoice pad from the hardware store. It states a failure in the form of having no reminder system, leaving follow-up to memory, which is specific enough to locate the gap.",
    "anchor_span": "it has no reminder system at all, so following up depends entirely on him remembering"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Tomas himself confirm that unpaid invoices have gone uncollected through forgotten follow-up, or is that failure described secondhand by the founder?"
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
  "problem": {
    "text": "they forget to chase unpaid invoices until the money is a problem",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want the money to show up without me having to ask twice,\" he said after the cabinet job."
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
    "anchor_span": "\"I just want the money to show up without me having to ask twice,\" he said after the cabinet job."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I just want the money to show up without me having to ask twice,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer carries direct language attributed to the grape, and words_source is real, so the Words bar is met. The words express a wish about payment without asking twice, a stated feeling with no filmable action, so Tell holds at clearing and Echo is not present.",
    "anchor_span": "\"I just want the money to show up without me having to ask twice,\" he said after the cabinet job."
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
    "text": "they forget to chase unpaid invoices until the money is a problem",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "user_answer": "Priya works only through a property management company that pays a fixed monthly retainer. Chasing invoices never happens to her because the retainer is automatic."
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
    "anchor_span": "Priya works only through a property management company that pays a fixed monthly retainer."
  },
  "observation": {
    "surface_text": "The answer names a bounded exclusion: Priya, who bills through a property management company on a fixed monthly retainer. The reason is present and specific: the automatic retainer means invoice chasing never arises for her.",
    "anchor_span": "Chasing invoices never happens to her because the retainer is automatic."
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