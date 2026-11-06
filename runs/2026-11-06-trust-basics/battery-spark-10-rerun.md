# Corked Runner Report — spark 10

Generated: 2026-11-06T19:08:42.193Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

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
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
- **Echo**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M3=clearing, M4=turbid, M6=turbid
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
    "reason": "Cellar-ready. The role and the stated problem are both present. One-man trade businesses forget to chase unpaid invoices until the money is a problem. It enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific sole trader you have in mind and the moment when an unpaid invoice had already become a money problem.",
    "hint": "A good answer names a trade (plumber, electrician, painter) and a concrete moment, such as when they checked their account and realised a job from six weeks ago was still unpaid.",
    "person_label": "Sole trader",
    "person_placeholder": "Dave, self-employed electrician",
    "when_label": "When the money became a problem",
    "when_placeholder": "end of month when rent was due and three invoices were still unpaid",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "cover costs while waiting for a client to pay up",
    "happened_label": "What actually happened",
    "happened_placeholder": "realised the invoice had been sitting unpaid for weeks and they had never followed it up"
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
    "surface_text": "A named individual is present. The relationship is specific and real.",
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
  "question": "Tell me about the last time Tomas forgot to chase an unpaid invoice and describe exactly what he did when he noticed the money was a problem.",
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
    "visible_style_violations_cleaned": [],
    "m2_question_repaired": false
  },
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "surface_text": "The vintage is anchored to a specific job last month. The tell names a delayed invoice but describes the outcome pattern rather than a filmable act: no moment of Tomas deciding to wait, sitting with the invoice unsent, or choosing another task instead is captured.",
    "anchor_span": "didn't send the invoice until three weeks later"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "When the invoice sat unsent for those three weeks, whose hands was it actually in: Tomas drafting and holding it, or waiting on something from the client first?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
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
    "surface_text": "The answer names a category of sufferers with a described behaviour but supplies no identifiable individual separate from the grape and the founder.",
    "anchor_span": "Lots of tradesmen I know just keep it in their heads or a notebook."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there one specific tradesman in that group whose invoice-chasing problem the founder has witnessed directly, with a name or at least a face attached to it?"
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

### 6. [main] M4 · /m4
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[none]
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
  "state": "turbid",
  "echo": {
    "state": "turbid",
    "anchor_span": "the chasing part she has under control"
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Priya is named and her whiteboard behaviour is concrete, but the answer explicitly states the confirmed problem does not apply to her, chasing is under control, so she has not hit the same problem and cannot move the Echo.",
    "anchor_span": "the chasing part she has under control"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific person, not Priya, not Tomas, who has actually missed chasing an invoice until the money became a problem, and what did they do when it happened?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:dash"
    ],
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Gap]
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
  "state": "clearing",
  "gap": {
    "state": "clearing",
    "anchor_span": "a paper invoice pad from the hardware store"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a paper invoice pad. The failure named is the absence of a reminder system, which is a structural description rather than a precise point at which the solution fails.",
    "anchor_span": "it has no reminder system at all, so following up depends entirely on him remembering"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Has Tomas described this problem in his own words, or is the account of how he tracks invoices reconstructed from observation?"
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
    "surface_text": "A direct attributed quote from a real exchange is present, meeting the Words settled bar. The words carry a stated sentiment about chasing payment but no filmable action, holding Tell at clearing.",
    "anchor_span": "I just want the money to show up without me having to ask twice"
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
    "surface_text": "The answer names a bounded individual, Priya, whose exclusive retainer arrangement with a property management company removes the invoicing act entirely. The reason for immunity is specific: the retainer is automatic, so no chase is possible or necessary.",
    "anchor_span": "the retainer is automatic"
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
- M4 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).