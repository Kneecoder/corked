# Corked Runner Report — spark 11

Generated: 2026-11-07T14:05:48.257Z
Worker: https://abdeab65-orked-m1-proxy.kneebonewebdesign.workers.dev

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
- **Tell**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M2=clearing, M6=clearing
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
  "user_line_candidate": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "forgetting to chase unpaid invoices until the money is a problem",
    "triggering_situation": "unpaid invoices left unchased until money becomes a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is specific: one-man trade businesses who let unpaid invoices slide until cash is already tight. Both are present in the user's own words.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific person this starts from and the moment they realised unpaid invoices had become a money problem.",
    "hint": "A good answer names a real trade worker and the specific moment, such as checking their account before paying a supplier and finding it short.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, self-employed electrician",
    "when_label": "When the money problem surfaced",
    "when_placeholder": "end of the month when his van insurance payment was due",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his monthly expenses without dipping into savings",
    "happened_label": "What he found when he looked",
    "happened_placeholder": "three invoices from six weeks ago still unpaid, one customer not responding"
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
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
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
    "surface_text": "Femke is identified by name. The relationship is specific and real: sister-in-law, photographer.",
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
  },
  "ai_fields": [
    "observation.surface_text",
    "grape.named_person"
  ],
  "prompt_version": "2026-11-07b",
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
    "triggering_situation": "unpaid invoices left unchased until money becomes a problem",
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
  "question": "Tell me about the last time Femke forgot to chase an invoice and the money had already become a problem by the time she noticed it was unpaid, what did she actually do when she realised?",
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
    "visible_style_violations_cleaned": [
      "question:dash"
    ],
    "m2_question_repaired": false
  },
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
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
    "state": "clearing",
    "anchor_span": "didn't invoice until three weeks later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month Femke finished a wedding shoot"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a specific shoot last month. The tell names a delayed action but not what Femke was observed doing instead of invoicing during those three weeks, leaving the behaviour inferential rather than filmable.",
    "anchor_span": "didn't invoice until three weeks later"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "Who noticed the three-week gap first, Femke or someone else in her life?"
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
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
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
    "anchor_span": "Femke started adding a 30 percent booking fee in January after two no-shows in one month"
  },
  "observation": {
    "surface_text": "The answer describes only the grape's behaviour; the Grape Exclusion Rule applies, and no separate third party appears in the answer.",
    "anchor_span": "Femke started adding a 30 percent booking fee in January after two no-shows in one month"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there another photographer or freelancer outside this family, someone with a name or a face, who has hit the same unpaid-invoice problem and done something concrete about it?"
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
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
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
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her it is deposits going missing, the chasing part she has under control."
  },
  "observation": {
    "surface_text": "Priya is a named, identifiable person distinct from the grape, but the answer reports her problem as deposits going missing rather than failing to chase invoices, and no concrete behaviour addressing the confirmed problem is described.",
    "anchor_span": "the chasing part she has under control"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Priya actually forget to chase invoices at any point, or is her day-to-day problem entirely about deposits disappearing before the job starts?"
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
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
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
    "anchor_span": "basic invoicing app, but it has no automatic reminders, so nothing chases the client but her own memory"
  },
  "observation": {
    "surface_text": "The answer names a basic invoicing app as the existing solution Femke currently uses. The precise failure point is stated: the app has no automatic reminders, leaving follow-up dependent on her memory alone.",
    "anchor_span": "basic invoicing app, but it has no automatic reminders, so nothing chases the client but her own memory"
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
  "prompt_version": "2026-11-07",
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
    "surface_text": "Words bar finds a direct quote from a real exchange, attributed to Femke in a named context. The words carry a stated feeling about the act of requesting payment but no filmable action, and no third-party reference is present.",
    "anchor_span": "\"I hate having to be the one who asks for money,\" she said after the honeymoon one."
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
  "prompt_version": "2026-11-07",
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
    "surface_text": "The answer names a bounded individual, Owen, working exclusively through an agency that takes over the invoicing function entirely. The reason for his exemption is specific and structural: the agency handles collection, removing the problem from his hands.",
    "anchor_span": "the agency handles it"
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
  "prompt_version": "2026-11-07",
  "model": "claude-sonnet-4-6"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).