# Corked Runner Report — spark 13

Generated: 2026-10-21T16:55:03.024Z
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
- **Echo**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M3=clearing, M4=clearing, M6=turbid
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
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "unpaid invoices",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. One-man trade businesses are the role, and forgetting to chase unpaid invoices until the money is a problem is the stated problem. It enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the one-man trade business owner you have in mind and the moment an unpaid invoice went unchased.",
    "hint": "A good answer is a real tradesperson and a real invoice, not a type of tradesperson.",
    "person_label": "Tradesperson",
    "person_placeholder": "Dave, self-employed plumber",
    "when_label": "When the invoice sat unchased",
    "when_placeholder": "three weeks after finishing a bathroom job",
    "trying_label": "What he was trying to do",
    "trying_placeholder": "cover the van payment at the end of the month",
    "happened_label": "What happened with the invoice",
    "happened_placeholder": "The invoice was still unpaid, he had not mentioned it to the customer, and he noticed only when the account ran short."
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
    "surface_text": "Daan is named and tied to a real relationship, a former colleague who works as a wedding DJ. The grape is settled.",
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
    "suspected_problem": "forget to chase unpaid invoices until the money is a problem",
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
  "question": "What was the specific moment Daan realised an unpaid invoice had gone too long without chasing, and what did he actually do next?",
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
    "anchor_span": "I would build a Supabase table of bookings with a webhook that flags cancellations"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes a planned build (Supabase table, webhook, auto-generated invoice) where the question asked for Daan's own filmable action. No action by Daan appears. No specific past instance or time is named in the answer.",
    "anchor_span": "I would build a Supabase table of bookings with a webhook that flags cancellations"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "Is Daan a specific person whose unpaid invoices you have watched go unchased, or a stand-in for the wedding DJ you imagine having this problem?"
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Echo]
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
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "started requiring signed contracts after a similar cancellation dispute"
  },
  "observation": {
    "surface_text": "A separate person, Owen, is present with a concrete behaviour, but the behaviour answers a cancellation dispute and not the forgotten chasing of unpaid invoices.",
    "anchor_span": "after a similar cancellation dispute"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Has Owen himself ever let an unpaid invoice sit until the money became a problem, or is his story standing in for that?"
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
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "keeps a deposit tracking spreadsheet too"
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is last-minute order changes, the deposit part is fine."
  },
  "observation": {
    "surface_text": "A new named person, Priya, is present, but her one concrete behaviour is a deposit spreadsheet and the answer states she does not have this problem, so no one is shown doing something about unpaid invoices.",
    "anchor_span": "the deposit part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a person you know, by name, who has actually let an unpaid invoice slide and had to do something about it, or is Priya the closest fit available?"
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
    "anchor_span": "Daan uses a plain email thread to track bookings and cancellations, but nothing flags when a cancellation actually happens"
  },
  "observation": {
    "surface_text": "The answer names an existing solution, a plain email thread used to track bookings and cancellations. The failure point described concerns cancellations going unflagged, not the unpaid invoices named in the confirmed problem.",
    "anchor_span": "nothing flags when a cancellation actually happens, so he has to notice it himself"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "When Daan last let an invoice slide, what did he actually do that day, and what did he open to find out?"
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
    "surface_text": "The answer offers the founder's own interpretation ('basically means') and no direct language from the grape, though words_source is flagged real. No words are present to carry filmable behaviour or a third-party echo.",
    "anchor_span": "What she basically means is that the admin side makes her feel unprofessional."
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "What did Daan actually say, in whatever words came out of his mouth, the last time this came up between you?"
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
    "surface_text": "The answer names a bounded who in Jordan, a corporate DJ working through an agency on annual contract. The stated reason concerns cancellations, which does not address why unpaid invoices would not reach him.",
    "anchor_span": "Cancellations never cost him anything because the agency guarantees the booking."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Who actually pays Jordan, and does that payer ever run late on an invoice?"
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
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).