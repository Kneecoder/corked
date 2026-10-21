# Corked Runner Report — spark 07

Generated: 2026-10-21T16:49:33.769Z
Worker: http://127.0.0.1:8790

## Test under this spark
Compress-may-not-upgrade, register hold. Expect: user_line_candidate keeps "annoying with payments" or very close; no operationalised synonyms (late, difficult, unreliable = fail), no introduced nouns. person_in_spark settled (name plus tie). M1 grape settled.

## Raw Spark
```
an app for my sister Marieke because customers are annoying with payments at her flower stall
```

Maturity class: 0
Grape: Marieke — my sister
expect_halt: false

Line sent to the worker (the spark as typed): "an app for my sister Marieke because customers are annoying with payments at her flower stall"

M0's line (verbatim, not shown in the app): "An app for a flower stall owner because customers are annoying with payments."

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
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "an app for my sister Marieke because customers are annoying with payments at her flower stall"
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "user_line_candidate": "An app for a flower stall owner because customers are annoying with payments.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "flower stall owner",
    "suspected_problem": "customers are annoying with payments",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "flower stall",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The app form, the flower stall owner, and the payment friction are all stated and enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific person at the flower stall and the moment the payment friction showed up.",
    "hint": "A good answer names Marieke or the stall owner and describes one payment exchange that went wrong.",
    "person_label": "Stall owner",
    "person_placeholder": "Marieke, flower stall owner",
    "when_label": "When the payment friction happened",
    "when_placeholder": "on a busy Saturday morning",
    "trying_label": "What she was trying to do",
    "trying_placeholder": "take payment quickly and keep the queue moving",
    "happened_label": "What actually happened",
    "happened_placeholder": "a customer fumbled with a card reader while the line waited behind them"
  },
  "person_in_spark": {
    "grade": "settled",
    "named_person": "Marieke",
    "relationship_tie": "my sister"
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
  "spark_summary": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "person_name": "Marieke",
  "relationship": "my sister",
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
    "named_person": "Marieke",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present, Marieke, with a stated real relationship, my sister. The grape is settled.",
    "anchor_span": "Marieke"
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
Summary: outcome=stated · problem="customers are annoying with payments at her flower stall" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "user_line": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "flower stall owner",
    "suspected_problem": "customers are annoying with payments",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "flower stall",
    "solution_is_software": "software"
  },
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
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
    "text": "customers are annoying with payments at her flower stall",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "Tell me about the specific moment Marieke last had trouble with a customer's payment at her flower stall, and what she actually did next.",
  "recovered_problem": "customers are annoying with payments at her flower stall",
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "an app for my sister Marieke because customers are annoying with payments at her flower stall",
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "problem": {
    "text": "customers are annoying with payments at her flower stall",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "user_answer": "Last Saturday a regular customer paid with a card that declined twice at the stall, and Marieke just waved her off with the flowers anyway, saying she'd sort it out later."
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
    "anchor_span": "Marieke just waved her off with the flowers anyway, saying she'd sort it out later."
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Saturday a regular customer paid with a card that declined twice at the stall"
  },
  "observation": {
    "surface_text": "Marieke waved the customer off with the flowers and said she would sort the payment out later. The instance is anchored to last Saturday, when a card declined twice at the stall.",
    "anchor_span": "Marieke just waved her off with the flowers anyway, saying she'd sort it out later."
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
    "text": "customers are annoying with payments at her flower stall",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "user_answer": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular."
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
    "anchor_span": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular."
  },
  "observation": {
    "surface_text": "A separate named person, Owen, who runs a farm stand and is neither Marieke nor the founder, reports one concrete workaround: a paper IOU pad adopted after a similar payment situation with a regular.",
    "anchor_span": "he started keeping a paper IOU pad after a similar situation with a regular"
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
    "text": "customers are annoying with payments at her flower stall",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "prior_echo_context": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular.",
  "user_answer": "Priya, a food truck owner I met at the market, keeps a card reader as backup for exactly this. For her the pain is spotty signal, the payment method itself is fine."
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
    "anchor_span": "Priya, a food truck owner I met at the market, keeps a card reader as backup for exactly this."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is spotty signal, the payment method itself is fine."
  },
  "observation": {
    "surface_text": "A second, separate person, Priya the food truck owner, is named and keeps a backup card reader for this problem, and she describes the pain as spotty signal rather than the payment method.",
    "anchor_span": "Priya, a food truck owner I met at the market, keeps a card reader as backup for exactly this."
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
    "text": "customers are annoying with payments at her flower stall",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "user_answer": "Marieke uses a basic card reader clipped to her apron, but it has no offline mode, so a bad signal at the stall means she can't charge anything at all."
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
    "anchor_span": "Marieke uses a basic card reader clipped to her apron, but it has no offline mode, so a bad signal at the stall means she can't charge anything at all."
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a basic card reader clipped to her apron. It states a precise failure point: no offline mode, so a bad signal blocks all charges.",
    "anchor_span": "it has no offline mode, so a bad signal at the stall means she can't charge anything at all"
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
    "text": "customers are annoying with payments at her flower stall",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want people to pay and go,\" she said after the declined-card one."
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
    "anchor_span": "\"I just want people to pay and go,\" she said"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I just want people to pay and go,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer contains a direct quote attributed to the grape, and words_source is flagged real, so the Words bar is met. The quoted words state a wish and a complaint about customers but describe no specific filmable action.",
    "anchor_span": "\"I just want people to pay and go,\" she said"
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
    "text": "customers are annoying with payments at her flower stall",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "user_answer": "Jordan sells only pre-paid subscription flower boxes online. Payment problems at the point of sale never happen to him because nothing is sold in person."
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
    "anchor_span": "Jordan sells only pre-paid subscription flower boxes online. Payment problems at the point of sale never happen to him because nothing is sold in person."
  },
  "observation": {
    "surface_text": "The answer names a bounded exclusion: Jordan, who sells only pre-paid online subscription boxes. The reason is present and specific: no point-of-sale transactions occur, so payment friction at the counter cannot arise for him.",
    "anchor_span": "Jordan sells only pre-paid subscription flower boxes online."
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