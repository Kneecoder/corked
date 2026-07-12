# Corked Runner Report — spark 13

Generated: 2026-07-12T15:47:41.428Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Substitution rule, M2 — with secondary M6 probe. Expect: M2 substitution_detected true, tell turbid (no grape behaviour referenced at all), overall turbid. Observation names what was described and what was asked for, nothing more — no interpretation, no named avoidance. Secondary: M6 words turbid — the builder's framing presented as the grape's meaning is not language from the grape.

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Daan — my former colleague, wedding DJ
expect_halt: false

User Line candidate (verbatim from M0): "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: turbid — history: inert → turbid (last raised by M6)
  raw grades: M2=turbid, M6=turbid
- **Vintage**: clearing — history: inert → turbid → clearing (last raised by M4)
  raw grades: M2=turbid, M3=clearing, M4=turbid
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
    "reason": "Cellar-ready. The role is clear and the stated problem is forgetting to chase unpaid invoices until it becomes a money problem. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific one-man trade business owner and the moment they realised an unpaid invoice had become a money problem.",
    "hint": "A good answer names one person, their trade, and a concrete moment when the late invoice caught up with them.",
    "person_label": "Tradesperson",
    "person_placeholder": "Danny, self-employed plumber",
    "when_label": "When the invoice caught up with them",
    "when_placeholder": "three weeks after finishing the job, when rent was due",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "cover materials for the next job",
    "happened_label": "What actually happened",
    "happened_placeholder": "he checked his account and realised the invoice had never been followed up and the customer had gone quiet"
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
    "surface_text": "A named individual is present with a stated real relationship. The grape is settled.",
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
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
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
    "surface_text": "Daan runs his DJ work solo and lets unpaid invoices sit until a cash shortfall forces the issue. The problem is in the forgetting, not in the invoicing itself.",
    "problem_source": "explicit"
  },
  "question": "Walk me through the last time Daan realised a invoice had gone unpaid for too long, what was happening when he noticed, and what did he actually do next?",
  "hint": "A strong answer names the specific invoice or job, how overdue it was when Daan caught it, and the concrete action he took, chased the client, moved money, said nothing, not how he felt about it.",
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
Summary: state=turbid · substitution_detected=true · swirl=yes · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.",
  "grape_name": "Daan",
  "grape_relationship": "my former colleague, wedding DJ",
  "maturity_class": 0,
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "anchor_span": "I would build a Supabase table of bookings with a webhook that flags cancellations and auto-generates the deposit invoice before the date frees up."
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer describes a proposed technical build rather than any observable action by Daan. No specific instance of Daan forgetting to chase an invoice is named, and no moment in time is anchored anywhere in the answer.",
    "anchor_span": "I would build a Supabase table of bookings with a webhook"
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "Has Daan ever described or shown a specific moment when a payment slipped past him, or is the forgetting pattern inferred from knowing him as a DJ?"
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
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[Echo, Vintage]
Request:
```json
{
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
  "vintage": {
    "state": "clearing",
    "anchor_span": "last month"
  },
  "observation": {
    "surface_text": "The answer names Owen and describes a contract behaviour, but the confirmed problem is forgetting to chase unpaid invoices, and Owen's signed-contract practice addresses cancellation disputes, not invoice follow-up. No person in the answer is shown hitting the invoice-chasing problem.",
    "anchor_span": "requiring signed contracts after a similar cancellation dispute"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Who outside this answer is actually losing sleep over invoices going unpaid, and what did they do when the money became a problem?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names a second person but explicitly states the confirmed problem does not apply to her. No concrete behaviour addressing forgotten invoice follow-up is present for Priya or anyone else.",
    "anchor_span": "the deposit part is fine."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific person in that vendor group who has described forgetting to chase invoices and done something visible about it?"
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
    "surface_text": "The answer names a plain email thread as the existing solution. The failure described concerns cancellation detection, not the confirmed problem of chasing unpaid invoices, so no precise failure point is present for the stated problem.",
    "anchor_span": "nothing flags when a cancellation actually happens"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "ownership",
    "question": "When an invoice from Daan goes unpaid past its due date, what does he actually do today to notice or act on it?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "surface_text": "The answer supplies no language from Daan; the phrase 'basically means' marks what follows as the founder's interpretation, not words from the grape. No filmable behaviour or third-party echo is present.",
    "anchor_span": "What she basically means is that the admin side makes her feel unprofessional."
  },
  "substitution_detected": true,
  "swirl": {
    "kind": "reality",
    "question": "What exact words did Daan use when this came up, even a fragment of what she actually said in that conversation?"
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
  "confirmed_problem": "forgetting to chase unpaid invoices until the money is a problem",
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
    "surface_text": "The answer names a bounded person and a structural reason for immunity. The reason given addresses cancellation cost, not the confirmed problem of forgetting to chase unpaid invoices.",
    "anchor_span": "the agency guarantees the booking"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Jordan's agency contract mean invoices are issued and paid automatically with no chasing required, or does he still send invoices that could go unpaid and unnoticed?"
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
- M4 offered turbid for Vintage, held at floor clearing (opportunistic grading correctly did not lower it).