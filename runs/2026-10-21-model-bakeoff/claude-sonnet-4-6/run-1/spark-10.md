# Corked Runner Report — spark 10

Generated: 2026-10-21T16:39:12.320Z
Worker: http://127.0.0.1:8787

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
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M3=clearing, M4=clearing, M6=turbid
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
    "reason": "Cellar-ready. The role is clear and the problem is stated: one-man trade businesses who let unpaid invoices sit until the money becomes a problem. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific one-man trade business owner and the moment they realised an unpaid invoice had been sitting too long.",
    "hint": "A good answer names the trade, the person, and what they noticed or felt when the money problem became visible.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, self-employed electrician",
    "when_label": "When did the invoice problem surface?",
    "when_placeholder": "when his van insurance came out and he checked his balance",
    "trying_label": "What was he trying to do at that moment?",
    "trying_placeholder": "cover his bills for the month without chasing anyone",
    "happened_label": "What did he actually find?",
    "happened_placeholder": "three invoices from the past six weeks still unpaid and he had not followed up on any of them"
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
    "surface_text": "A named individual is present. A concrete real-world relationship ties that individual to the answerer.",
    "anchor_span": "my neighbour, carpenter with a one-man business"
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
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "unpaid invoices left unchased until the money is a problem",
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
  "outcome": "stated",
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "Tell me about the last time Tomas let an unpaid invoice slide: which job was it, how far past due was the invoice when he finally noticed, and what did he actually do when he realised?",
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
  "grape_name": "Tomas",
  "grape_relationship": "my neighbour, carpenter with a one-man business",
  "maturity_class": 0,
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
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
  "state": "clearing",
  "tell": {
    "state": "clearing",
    "anchor_span": "didn't send the invoice until three weeks later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month Tomas finished a kitchen cabinet job"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a specific job last month. The tell names a delay but the observable action is an absence rather than a filmable behaviour, no moment of Tomas noticing, deciding, or doing anything is captured.",
    "anchor_span": "didn't send the invoice until three weeks later"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "When those three weeks passed without an invoice, who in that exchange was tracking the debt, Tomas, the client, or no one?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
    "vintage_anchor_verified": true,
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Echo]
Request:
```json
{
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
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
    "anchor_span": "Lots of tradesmen I know"
  },
  "observation": {
    "surface_text": "The answer names a category of sufferers with a described behaviour but produces no identifiable individual separate from Tomas or the founder.",
    "anchor_span": "Lots of tradesmen I know just keep it in their heads or a notebook."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there one specific tradesman in that group whose name or face comes to mind, and what have they actually said or done about a missed invoice?"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
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
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "observation": {
    "surface_text": "Priya is a named, identifiable person with a concrete behaviour (whiteboard crossoff), but the answer explicitly states the chasing problem does not apply to her, making her a case where the confirmed problem is absent rather than shared.",
    "anchor_span": "the chasing part she has under control"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific person Priya knows, or that you know separately, who has the same chasing problem Tomas has and does something concrete about it?"
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
  "state": "settled",
  "gap": {
    "state": "settled",
    "anchor_span": "a paper invoice pad from the hardware store, but it has no reminder system at all"
  },
  "observation": {
    "surface_text": "The answer names a paper invoice pad as the existing solution Tomas currently uses. The precise failure point is stated: it has no reminder system, making follow-up dependent on unaided memory.",
    "anchor_span": "it has no reminder system at all, so following up depends entirely on him remembering"
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
    "anchor_span": "I just want the money to show up without me having to ask twice"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "I just want the money to show up without me having to ask twice"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Words is settled: a direct quote attributed to Tomas from a real exchange is present, tied to a specific job. The quote carries a stated frustration but no filmable action, and no third-party reference appears in the words.",
    "anchor_span": "I just want the money to show up without me having to ask twice"
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
    "anchor_span": "Priya works only through a property management company that pays a fixed monthly retainer"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual, Priya, in a specific arrangement: exclusive work through a property management company on a fixed monthly retainer. The reason for immunity is present and specific: the retainer is automatic, so no invoice chasing occurs.",
    "anchor_span": "the retainer is automatic"
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
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).