# Corked Runner Report — spark 03

Generated: 2026-10-21T16:51:33.241Z
Worker: http://127.0.0.1:8791

## Test under this spark
Solution-language spark, class 1 direction door. Expect: first pass bottleable_cloudy (person visible, no problem), followup fires, re-bottle lands cellar_ready or cloudy-with-problem. M2 question uses the direction door: no "think of the last time" / "describe the moment" phrasing. The told-not-watched moment grades settled.

## Raw Spark
```
A better scheduling app for gym owners.
```

Maturity class: 1
Grape: Marco — owns the boxing gym where I train
expect_halt: false

Line sent to the worker (the spark as typed): "A better scheduling app for gym owners."

M0's line (verbatim, not shown in the app): "A better scheduling app for gym owners."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=settled, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=bottleable_cloudy · in_scope=true · followup_needed=true
Request:
```json
{
  "raw_spark": "A better scheduling app for gym owners."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A better scheduling app for gym owners.",
  "user_line_candidate": "A better scheduling app for gym owners.",
  "spark_parse": {
    "solution_form": "scheduling app",
    "implied_person": "gym owners",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "scheduling",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "problem"
    ],
    "reason": "Bottleable, cloudy. The form and the role are visible, but no problem is stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "What is going wrong with scheduling for gym owners right now?"
  },
  "m1_setup": {
    "question": "Name the specific gym owner and the moment scheduling went wrong for them.",
    "hint": "A real gym owner you know or watched, and one occasion when scheduling got in their way.",
    "person_label": "Gym owner",
    "person_placeholder": "Dana, owner of a small gym",
    "when_label": "When scheduling came up",
    "when_placeholder": "the week before a new class timetable started",
    "trying_label": "What they were trying to do",
    "trying_placeholder": null,
    "happened_label": "What happened with the schedule",
    "happened_placeholder": null
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
    "m1_placeholders_nulled": true
  }
}
```

### 2. [main] M1 · /m1
Summary: state=settled · substitution_detected=n/a · swirl=no · changed=[Grape]
Request:
```json
{
  "spark_summary": "A better scheduling app for gym owners.",
  "person_name": "Marco",
  "relationship": "owns the boxing gym where I train",
  "maturity_class": 1
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
    "named_person": "Marco",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "Marco is a named individual with a stated tie. He owns the boxing gym where the speaker trains.",
    "anchor_span": "owns the boxing gym where I train"
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
Summary: outcome=guessed · problem="Gym owners have trouble with scheduling." (system_hypothesis) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "A better scheduling app for gym owners.",
  "user_line": "A better scheduling app for gym owners.",
  "spark_parse": {
    "solution_form": "scheduling app",
    "implied_person": "gym owners",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "scheduling",
    "solution_is_software": "software"
  },
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1
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
    "text": "Gym owners have trouble with scheduling.",
    "source": "system_hypothesis",
    "status": "proposed"
  },
  "gap_in_play": false,
  "question": "Ask Marco to walk you through the last specific time scheduling went wrong at his gym, or watch for the next time it does.",
  "recovered_problem": "Gym owners have trouble with scheduling.",
  "needs_confirmation": true,
  "server_checks": {
    "schema_valid": true,
    "model_outcome": "guessed",
    "outcome": "guessed",
    "downgrades": [],
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
  "user_line": "A better scheduling app for gym owners.",
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "problem": {
    "text": "Gym owners have trouble with scheduling.",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "user_answer": "Marco walked me through last Tuesday: two members arrived for the 18:00 class he had already filled. He refunded one at the front desk and comped the other a personal training session."
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
    "anchor_span": "He refunded one at the front desk and comped the other a personal training session."
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "last Tuesday: two members arrived for the 18:00 class he had already filled"
  },
  "observation": {
    "surface_text": "The answer names two observable actions: a refund at the front desk and a comped personal training session. The moment is anchored to one instance, last Tuesday's 18:00 class.",
    "anchor_span": "He refunded one at the front desk and comped the other a personal training session."
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Echo]
Request:
```json
{
  "problem": {
    "text": "Gym owners have trouble with scheduling.",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "user_answer": "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush."
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
    "anchor_span": "she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush"
  },
  "observation": {
    "surface_text": "The answer names one identifiable third party, Priya, who is neither the grape nor the founder, and describes a concrete workaround of capping sign-ups in a shared spreadsheet after a double-booking.",
    "anchor_span": "she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush"
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "problem": {
    "text": "Gym owners have trouble with scheduling.",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "prior_echo_context": "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush.",
  "user_answer": "Owen, a barber who takes walk-ins, keeps a paper appointment book by the chair. For him the pain is no-shows, the overbooking part is fine."
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
    "anchor_span": "Owen, a barber who takes walk-ins, keeps a paper appointment book by the chair."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For him the pain is no-shows, the overbooking part is fine."
  },
  "observation": {
    "surface_text": "The answer names Owen, a new third party distinct from Marco and Priya, with a concrete behaviour: a paper appointment book by the chair.",
    "anchor_span": "keeps a paper appointment book by the chair"
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "problem": {
    "text": "Gym owners have trouble with scheduling.",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "user_answer": "Marco uses a shared Google Calendar for the class roster, but it doesn't stop two people from claiming the same slot if they both edit it around the same time."
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
    "anchor_span": "Marco uses a shared Google Calendar for the class roster, but it doesn't stop two people from claiming the same slot if they both edit it around the same time."
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a shared Google Calendar used for the class roster. It also states a precise failure point: the calendar does not prevent two people from claiming the same slot during simultaneous edits.",
    "anchor_span": "it doesn't stop two people from claiming the same slot if they both edit it around the same time"
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
    "text": "Gym owners have trouble with scheduling.",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "words_source": "real",
  "user_answer": "\"I hate turning people away at the door,\" he said after the Tuesday one."
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
    "anchor_span": "\"I hate turning people away at the door,\" he said after the Tuesday one."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I hate turning people away at the door,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer carries a direct quote from a real exchange, attributed to Marco and flagged real. The words state a feeling about turning people away but describe no filmable action, and no third party appears.",
    "anchor_span": "\"I hate turning people away at the door,\""
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
    "text": "Gym owners have trouble with scheduling.",
    "source": "system_hypothesis",
    "status": "confirmed"
  },
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "user_answer": "Jordan runs one-on-one training sessions only, no group classes. Double-booking never happens to him because every slot has exactly one client."
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
    "anchor_span": "Jordan runs one-on-one training sessions only, no group classes. Double-booking never happens to him because every slot has exactly one client."
  },
  "observation": {
    "surface_text": "The answer names Jordan, an identifiable individual with a bounded arrangement of one-on-one sessions and no group classes. The reason is specific and tied to that arrangement: every slot holds exactly one client, so double-booking cannot occur.",
    "anchor_span": "every slot has exactly one client"
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