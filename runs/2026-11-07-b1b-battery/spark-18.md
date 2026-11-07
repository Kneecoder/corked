# Corked Runner Report — spark 18

Generated: 2026-11-07T14:10:28.545Z
Worker: https://abdeab65-orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
M6 reconstructed cap — hard rule. Expect: words clearing, never settled, no matter how vivid the quote. Echo bar forced turbid (words_source is not real). Observation notes the reconstruction without coaching toward what a real exchange would earn. (m2-m5, m7 not specified by the brief — left on generic settled-quality placeholders.)

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Noor — my friend, runs a one-woman landscaping business
words_source override: reconstructed
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
    "triggering_situation": "unpaid invoices left unchased until money becomes a problem",
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is clear and the stated problem is specific: one-man trade businesses who let unpaid invoices sit until the money is already a problem.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific person and the moment this starts, the point where an unpaid invoice has been sitting too long and the money is becoming a problem.",
    "hint": "A good answer names a sole trader by name or trade, and places them at the moment they realise the invoice is overdue and cash is tightening.",
    "person_label": "Sole trader",
    "person_placeholder": "Dave, self-employed electrician",
    "when_label": "When the invoice slipped",
    "when_placeholder": "six weeks after finishing a job, when rent was due",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his next month's costs without chasing the client",
    "happened_label": "What actually happened",
    "happened_placeholder": "he found three unpaid invoices he had forgotten to follow up, totalling more than his bank balance"
  },
  "person_in_spark": {
    "grade": "none",
    "named_person": null,
    "relationship_tie": null
  },
  "server_checks": {
    "schema_valid": true,
    "banned_words_found": [],
    "visible_style_violations_cleaned": [
      "m1_setup.happened_placeholder:more_than"
    ],
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
    "surface_text": "Noor is identified by name with a stated real relationship: friend who runs a one-woman landscaping business. One specific person with a concrete tie is present.",
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
  "question": "Tell me about the last time Noor forgot to chase an unpaid invoice and describe exactly what she did when she finally noticed the money was short.",
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
    "anchor_span": "gave up partway through and fell back to a plain spreadsheet"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday, right before a deadline"
  },
  "observation": {
    "surface_text": "The vintage is anchored to a specific moment. The tell names a fallback action but the behaviour that broke down is described as a pattern collapse rather than a filmed step: what Noor actually did when the invoice was not caught goes unnamed.",
    "anchor_span": "tried the usual approach and it broke down at the same point it always does"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Noor a person who described this to you directly, or is this an inference about how her process tends to go?"
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
    "surface_text": "One identifiable third party, Jordan, is named as hitting the same problem and carrying a concrete workaround: paying a freelancer to handle it on an ad hoc basis.",
    "anchor_span": "my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up"
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
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "different",
    "anchor_span": "for her it shows up a little differently"
  },
  "observation": {
    "surface_text": "The answer names Priya and attributes one concrete behaviour to her, but the problem she is managing and the setup she works in are not described with enough specificity to confirm she is hitting the confirmed problem rather than an adjacent one.",
    "anchor_span": "A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "What does Priya actually do, and what is the log tracking that made the invoice-forgetting problem visible to her?"
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
    "anchor_span": "plain spreadsheet template to track it"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain spreadsheet template. The failure point states it does not catch the problem in time, but names no specific mechanism that fails, such as a missing alert, no due-date column, or no trigger.",
    "anchor_span": "it does not catch the problem until it is already too late"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Noor a specific person the founder has watched miss a payment chase, or a composite of what a landscaper in general might do?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [
      "observation.surface_text:not_x_but_y"
    ],
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
  "words_source": "reconstructed",
  "user_answer": "\"I honestly cannot look at my bank app in week four, it makes me sick,\" is basically what she would say."
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
    "anchor_span": "is basically what she would say"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "I honestly cannot look at my bank app in week four, it makes me sick"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "words_source is reconstructed, capping Words at clearing regardless of specificity; the answer presents a hypothetical construction, not language from a real exchange. The quoted words carry a stated feeling but no filmable action, and no third-party echo is present.",
    "anchor_span": "is basically what she would say"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Has Noor ever said something about her bank balance or unpaid invoices in an actual conversation, even approximately, or does the answer rest entirely on imagining what she would say?"
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
    "surface_text": "The answer names a bounded individual (the uncle) in a specific billing arrangement (retainer-only clients). The reason for immunity is present and specific: retainer billing means payment arrives regardless of whether work occurs, eliminating the chase.",
    "anchor_span": "only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not."
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
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M5.observation.surface_text: "The answer names an existing solution: a plain spreadsheet template. The failure point states it does not catch the problem in time, but names no specific mechanism that fails, such as a missing alert, no due-date column, or no trigger."

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).