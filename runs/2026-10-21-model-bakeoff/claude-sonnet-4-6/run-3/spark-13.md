# Corked Runner Report — spark 13

Generated: 2026-10-21T17:03:17.586Z
Worker: http://127.0.0.1:8787

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

M0's line (verbatim, not shown in the app): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: turbid — history: inert → turbid (last raised by M6)
  raw grades: M2=turbid, M6=turbid
- **Vintage**: turbid — history: inert → turbid (last raised by M2)
  raw grades: M2=turbid
- **Gap**: clearing — history: inert → clearing (last raised by M5)
  raw grades: M5=clearing
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
    "reason": "Cellar-ready. The role is clear, one-man trade businesses, and the stated problem is forgetting to chase unpaid invoices until the money is a problem. Both are present and in the user's own words.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific sole trader you are thinking of and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names a trade, a person, and the point where the forgotten invoice surfaced, not when they sent it.",
    "person_label": "Sole trader",
    "person_placeholder": "e.g. Dave, self-employed electrician",
    "when_label": "When the money problem hit",
    "when_placeholder": "e.g. two weeks after a big job when rent was due",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "e.g. cover costs while waiting on three outstanding invoices",
    "happened_label": "What actually happened",
    "happened_placeholder": "e.g. he checked his account and realised a job from six weeks ago still had not been paid, and he had never followed it up"
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
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. A real stated relationship grounds him as a specific person.",
    "anchor_span": "my former colleague, wedding DJ"
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
    "triggering_situation": "when the money is a problem",
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
  "question": "Walk me through the last time Daan realised he had forgotten to chase an unpaid invoice: what did he actually do when he noticed it?",
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
    "anchor_span": "build a Supabase table of bookings with a webhook that flags cancellations and auto-generates the deposit invoice"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes the founder's own build stack in place of Daan's observed behaviour. No filmable action by Daan is present. No specific moment or instance involving Daan is named in the answer.",
    "anchor_span": "build a Supabase table of bookings with a webhook that flags cancellations and auto-generates the deposit invoice"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "Has Daan ever actually described or shown what he does when an invoice goes unpaid, or is the problem being inferred from what a wedding DJ probably experiences?"
  },
  "server_checks": {
    "schema_valid": true,
    "tell_anchor_verified": true,
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
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Owen's concrete behaviour addresses contract signing after cancellation disputes, not the confirmed problem of forgetting to chase unpaid invoices; no third party in the answer touches the confirmed problem.",
    "anchor_span": "he started requiring signed contracts after a similar cancellation dispute"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Owen or anyone else the answer can name actually let invoices go unchased until the money becomes a problem?"
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
    "anchor_span": "the deposit part is fine"
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Priya is named and distinct from the grape and prior echo, but the answer explicitly states the confirmed problem does not apply to her, removing her as a valid second confirmation of that problem.",
    "anchor_span": "the deposit part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there someone in that vendor group for whom chasing unpaid invoices is actually the problem, not a side note?"
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
  "state": "clearing",
  "gap": {
    "state": "clearing",
    "anchor_span": "plain email thread to track bookings and cancellations"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a plain email thread used to track bookings and cancellations. The failure described is about missing cancellation flags, not about unpaid invoices going unchased, which leaves the confirmed problem unaddressed.",
    "anchor_span": "nothing flags when a cancellation actually happens"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Daan a specific person whose unpaid invoice situation the founder has direct knowledge of, or is this account assembled from general impressions of how DJs tend to work?"
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
    "anchor_span": null
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
    "surface_text": "The answer presents the founder's own interpretive gloss rather than any language attributed to Daan; no quote or close recounting of Daan's words is present. No filmable behaviour and no third-party echo can be graded from founder framing alone.",
    "anchor_span": "What she basically means is that the admin side makes her feel unprofessional."
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "When Daan spoke about this problem, what words did she actually use?"
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
    "anchor_span": "Jordan only DJs corporate events booked through an agency on annual contract"
  },
  "observation": {
    "surface_text": "The answer names a bounded person and arrangement. The reason given addresses cancellation cost immunity, not immunity from forgetting to chase unpaid invoices, which is the confirmed problem.",
    "anchor_span": "the agency guarantees the booking"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Jordan's agency contract mean invoices are never issued at all, or does someone still have to track whether the agency has actually paid?"
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