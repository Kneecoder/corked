# Corked Runner Report — spark 03

Generated: 2026-07-11T18:21:43.046Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Solution-language spark, class 1 direction door. Expect: first pass bottleable_cloudy (person visible, no problem), followup fires, re-bottle lands cellar_ready or cloudy-with-problem. M2 question uses the direction door: no "think of the last time" / "describe the moment" phrasing. The told-not-watched moment grades settled.

## Raw Spark
```
A better scheduling app for gym owners.
```

Maturity class: 1
Grape: Marco — owns the boxing gym where I train
expect_halt: false

User Line candidate (verbatim from M0): "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=turbid
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: settled — history: inert → settled (last raised by M6)
  raw grades: M3=settled, M4=turbid, M6=turbid
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
  "user_line_candidate": "A way for gym owners to schedule better.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "gym owners",
    "suspected_problem": null,
    "triggering_situation": null,
    "promised_change": null,
    "domain": "gym scheduling",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "bottleable_cloudy",
    "missing": [
      "suspected_problem"
    ],
    "reason": "Bottleable, cloudy. The form, the population, and the domain are visible, but no problem with scheduling is stated. That is what the cellar will age.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": true,
    "question": "What is going wrong for gym owners with scheduling right now?"
  },
  "m1_setup": {
    "question": "Name the specific gym owner and the moment when scheduling broke down for them.",
    "hint": "A good answer names a real gym owner and a specific situation where their scheduling stopped working the way they needed.",
    "person_label": "Gym owner",
    "person_placeholder": "Derek, independent gym owner",
    "when_label": "When the scheduling problem hit",
    "when_placeholder": "the week he opened a second location",
    "trying_label": "What they were trying to schedule",
    "trying_placeholder": null,
    "happened_label": "What went wrong",
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

### 2. [main] M0 · /m0 (followup)
Summary: [re-bottled] digestibility=cellar_ready
Request:
```json
{
  "raw_spark": "A better scheduling app for gym owners.",
  "followup_question": "What is going wrong for gym owners with scheduling right now?",
  "followup_answer": "Marco double-books the 6pm slot and members show up to a class that is already full.",
  "prior_digestibility": "bottleable_cloudy"
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A better scheduling app for gym owners.",
  "user_line_candidate": "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "gym owners",
    "suspected_problem": "double-booking a slot causes members to show up to a class that is already full",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "gym scheduling",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is gym owners and the stated problem is double-booking a slot, producing a full class that members still show up to.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific gym owner and the moment the double-booking problem happened.",
    "hint": "A good answer names who was running the schedule, which slot got doubled, and what the members found when they arrived.",
    "person_label": "Gym owner",
    "person_placeholder": "Marco, gym owner",
    "when_label": "When it happened",
    "when_placeholder": "the evening the 6pm class filled twice",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "fill the 6pm slot and run the class as normal",
    "happened_label": "What actually happened",
    "happened_placeholder": "members showed up to a class that was already full because the slot had been booked twice"
  },
  "person_in_spark": {
    "grade": "clearing",
    "named_person": "Marco",
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

### 3. [main] M1 · /m1
Summary: state=settled · substitution_detected=n/a · swirl=no · changed=[Grape]
Request:
```json
{
  "spark_summary": "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class.",
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
    "surface_text": "A named individual is present. The relationship is concrete and site-specific.",
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

### 4. [main] M2 · /m2 (phase A)
Summary: recovered_problem="double-booking a slot causes members to show up to a class that is already full" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "gym owners",
    "suspected_problem": "double-booking a slot causes members to show up to a class that is already full",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "gym scheduling",
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
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "double-booking a slot causes members to show up to a class that is already full",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "Marco's gym has a scheduling problem where double-booked slots send members to classes with no room. The spark proposes an app to prevent this.",
    "problem_source": "explicit"
  },
  "question": "Ask Marco to walk you through the last specific time a slot got double-booked and members showed up to a full class, what happened, step by step, from booking to the moment people arrived.",
  "hint": "A good answer names the class, describes how the double-booking happened in the system Marco was using, and tells you what Marco did when members arrived and found no space.",
  "server_checks": {
    "schema_valid": true,
    "gap_in_play": false,
    "needs_confirmation": false,
    "visible_style_violations_cleaned": [
      "question:dash"
    ],
    "m2_question_repaired": false,
    "problem_forced_verbatim": true
  }
}
```

### 5. [main] M2 · /m2
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "A scheduling app for gym owners where double-booking a slot causes members to show up to a full class.",
  "grape_name": "Marco",
  "grape_relationship": "owns the boxing gym where I train",
  "maturity_class": 1,
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
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
    "anchor_span": "He refunded one at the front desk and comped the other a personal training session"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "last Tuesday: two members arrived for the 18:00 class"
  },
  "observation": {
    "surface_text": "Tell is settled: two specific filmable actions are named at the front desk. Vintage is settled: the moment is anchored to last Tuesday at the 18:00 class.",
    "anchor_span": "two members arrived for the 18:00 class he had already filled"
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

### 6. [main] M3 · /m3
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Echo]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
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
    "anchor_span": "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "a similar double-booking during a holiday rush"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Priya, distinct from Marco and the founder, who enacted a concrete workaround in response to a real double-booking event. The Vintage bar finds a specific anchoring instance, a double-booking during a holiday rush, with a named time reference of last month.",
    "anchor_span": "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush"
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

### 7. [main] M4 · /m4
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
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
  "state": "turbid",
  "echo": {
    "state": "turbid",
    "anchor_span": "the overbooking part is fine"
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
    "surface_text": "The answer names a person who explicitly does not share the confirmed problem, making Owen a non-instance rather than a second confirmation. No specific past moment of the confirmed problem is present.",
    "anchor_span": "the overbooking part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific person, outside Marco and Priya, who has actually experienced a member showing up to a full class because of a double-booking?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  }
}
```

### 8. [main] M5 · /m5
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Gap]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
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
    "surface_text": "The answer names a shared Google Calendar as the existing solution Marco uses for the class roster. The precise failure point is present: concurrent edits allow two people to claim the same slot without conflict detection.",
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

### 9. [main] M6 · /m6
Summary: state=settled · substitution_detected=false · swirl=no · changed=[none]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
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
    "state": "settled",
    "anchor_span": "after the Tuesday one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a flagged-real exchange is present, anchored to a specific class occasion. The words carry a filmable moment: members turned away at a door after a named session.",
    "anchor_span": "\"I hate turning people away at the door,\" he said after the Tuesday one."
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

### 10. [main] M7 · /m7
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "double-booking a slot causes members to show up to a class that is already full",
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
    "anchor_span": "Jordan runs one-on-one training sessions only, no group classes"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual whose arrangement excludes group classes entirely. The reason for immunity is specific: every slot holds exactly one client, so capacity overflow cannot occur.",
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
- M4 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).