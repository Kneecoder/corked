# Corked Runner Report — spark 13

Generated: 2026-10-21T17:45:21.943Z
Worker: http://127.0.0.1:8791

## Test under this spark
Substitution rule, M2 — with secondary M6 probe. Expect: M2 substitution_detected true, tell turbid (no grape behaviour referenced at all), overall turbid. Observation names what was described and what was asked for, nothing more — no interpretation, no named avoidance. Secondary: M6 words turbid — the builder's framing presented as the grape's meaning is not language from the grape.

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Daan — my former colleague, wedding DJ
expect_halt: false

Line sent to the worker (the spark as typed): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

M0's line (verbatim, not shown in the app): "A way for one-man trade businesses to chase unpaid invoices before the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: turbid — history: inert → turbid (last raised by M6)
  raw grades: M2=turbid, M6=turbid
- **Vintage**: turbid — history: inert → turbid (last raised by M2)
  raw grades: M2=turbid
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: turbid — history: inert → turbid (last raised by M6)
  raw grades: M3=turbid, M4=turbid, M6=turbid
- **Limit**: clearing — history: inert → clearing (last raised by M7)
  raw grades: M7=clearing

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
  "user_line_candidate": "A way for one-man trade businesses to chase unpaid invoices before the money is a problem.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "one-man trade businesses",
    "suspected_problem": "they forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is one-man trade businesses, and the stated problem is forgetting to chase unpaid invoices until the money is a problem. It enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the one-man trade business owner you have seen let an unpaid invoice sit, and the moment the money became a problem.",
    "hint": "A good answer names a real tradesperson and a real invoice, such as a plumber and a bill left unchased until the rent was due.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, plumber working alone",
    "when_label": "When the money became a problem",
    "when_placeholder": "the week the van insurance came due and the invoice was still unpaid",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover his own bills with money he was already owed",
    "happened_label": "What happened with the invoice",
    "happened_placeholder": "the invoice had gone unchased for weeks and he had not noticed until the bank balance was short"
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
  "person_name": "Daan",
  "relationship": "my former colleague, wedding DJ",
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
    "named_person": "Daan",
    "person_kind": "named_individual",
    "temporal_grounding": "none"
  },
  "observation": {
    "surface_text": "Daan is a named individual with a stated tie, a former colleague who works as a wedding DJ. The grape holds.",
    "anchor_span": "my former colleague, wedding DJ"
  },
  "next_question": {
    "should_advance": true,
    "framing": "Move to a specific moment when Daan had an invoice go unchased."
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
    "suspected_problem": "they forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
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
  "question": "When was the specific moment Daan realised an unpaid invoice had gone unchased until the money was a problem, and what did he actually do next?",
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
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "user_answer": "I would build a Supabase table of bookings with a webhook that flags cancellations and auto-generates the deposit invoice before the date frees up."
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
    "state": "turbid",
    "anchor_span": null
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes a planned build (a Supabase table, a webhook, auto-generated invoices) where the question asked for Daan's own filmable action, and Daan appears nowhere in it. No specific instance or time anchor is named in the answer.",
    "anchor_span": "I would build a Supabase table of bookings with a webhook that flags cancellations"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "Is Daan a specific person whose invoicing habits you have actually watched, or a stand-in for the wedding DJ you imagine has this problem?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": false,
    "vintage_anchor_verified": false,
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
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "user_answer": "My friend Owen, another wedding DJ, told me last month he started requiring signed contracts after a similar cancellation dispute."
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
    "anchor_span": "started requiring signed contracts after a similar cancellation dispute"
  },
  "observation": {
    "surface_text": "The answer names a real separate person with a concrete behaviour, but the behaviour addresses a cancellation dispute, not forgetting to chase unpaid invoices, so the confirmed problem has not been hit by this person.",
    "anchor_span": "started requiring signed contracts after a similar cancellation dispute"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there anyone, Owen or otherwise, who has actually let an invoice go unchased until the money became a problem, and what did that person do next?"
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
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "prior_echo_context": "My friend Owen, another wedding DJ, told me last month he started requiring signed contracts after a similar cancellation dispute.",
  "user_answer": "Priya, a wedding florist I met through a vendor group, keeps a deposit tracking spreadsheet too. For her the pain is last-minute order changes, the deposit part is fine."
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
    "anchor_span": "For her the pain is last-minute order changes, the deposit part is fine."
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names a new person, Priya, but states the invoice-chasing problem does not apply to her, so no one in it has hit the confirmed problem.",
    "anchor_span": "the deposit part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there anyone you actually know who has let an unpaid invoice slide until the cash shortfall forced the issue, and what did they do next?"
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
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "user_answer": "Daan uses a plain email thread to track bookings and cancellations, but nothing flags when a cancellation actually happens, so he has to notice it himself."
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
    "anchor_span": "uses a plain email thread to track bookings and cancellations, but nothing flags when a cancellation actually happens"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain email thread used to track bookings and cancellations. It also states a precise failure point: nothing flags a cancellation when it happens, so Daan must notice it himself.",
    "anchor_span": "nothing flags when a cancellation actually happens, so he has to notice it himself"
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
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[none]
Request:
```json
{
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "What she basically means is that the admin side makes her feel unprofessional."
}
```
Response:
```json
{
  "schema_version": "m6.v1",
  "mechanism": "M6",
  "state": "turbid",
  "words": {
    "state": "turbid",
    "anchor_span": "What she basically means is that the admin side makes her feel unprofessional."
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
    "surface_text": "The answer offers the founder's interpretation of what the grape means, not language the grape used, so no attributable words are present despite the real source flag. No filmable action and no third-party reference appear in it.",
    "anchor_span": "What she basically means is that"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "What did Daan actually say, in his own words, the last time unpaid invoices came up between you?"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Limit]
Request:
```json
{
  "problem": {
    "text": "forget to chase unpaid invoices until the money is a problem",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "user_answer": "Jordan only DJs corporate events booked through an agency on annual contract. Cancellations never cost him anything because the agency guarantees the booking."
}
```
Response:
```json
{
  "schema_version": "m7.v1",
  "mechanism": "M7",
  "state": "clearing",
  "limit": {
    "state": "clearing",
    "anchor_span": "Jordan only DJs corporate events booked through an agency on annual contract."
  },
  "observation": {
    "surface_text": "The answer names a bounded individual, Jordan, with a specific arrangement. The stated reason concerns cancellations, which does not address why he would not forget to chase unpaid invoices.",
    "anchor_span": "Cancellations never cost him anything because the agency guarantees the booking."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Jordan actually invoice no one directly, or is the agency arrangement standing in for a reason he never has money to chase?"
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
- none