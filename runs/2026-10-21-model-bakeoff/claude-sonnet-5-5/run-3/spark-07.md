# Corked Runner Report — spark 07

Generated: 2026-10-21T16:59:53.931Z
Worker: http://127.0.0.1:8791

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

M0's line (verbatim, not shown in the app): "An app for flower stall owners whose customers are annoying with payments."

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
  "user_line_candidate": "An app for flower stall owners whose customers are annoying with payments.",
  "spark_parse": {
    "solution_form": "app",
    "implied_person": "flower stall owners",
    "suspected_problem": "customers are annoying with payments",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "flower stall",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is a flower stall owner and the stated problem is customers being annoying with payments. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the flower stall owner and the moment a customer was annoying with payments.",
    "hint": "A good answer names Marieke or someone like her and a specific time at the stall when paying went wrong.",
    "person_label": "Stall owner",
    "person_placeholder": "Marieke, flower stall owner",
    "when_label": "When at the stall",
    "when_placeholder": "Saturday morning, a queue at the stall",
    "trying_label": "Trying to do",
    "trying_placeholder": "take payment from a customer and serve the next one",
    "happened_label": "What happened with the payment",
    "happened_placeholder": "a customer paid in a way that held up the stall, and Marieke had to sort it out"
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
    "surface_text": "Marieke is named and tied to the asker as a sister. The grape is settled.",
    "anchor_span": "my sister"
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
    "implied_person": "flower stall owners",
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
  "question": "What specific moment did you see Marieke deal with a customer being annoying about payments at her flower stall, and what did she actually do?",
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
    "anchor_span": "Marieke just waved her off with the flowers anyway, saying she'd sort it out later"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Saturday a regular customer paid with a card that declined twice at the stall"
  },
  "observation": {
    "surface_text": "The answer names a filmable action: Marieke let the customer leave with the flowers after the card declined twice. The answer anchors it to one instance: last Saturday, at the stall.",
    "anchor_span": "Marieke just waved her off with the flowers anyway"
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
    "anchor_span": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad"
  },
  "observation": {
    "surface_text": "The answer names one identifiable third party, Owen, distinct from Marieke and the founder, who took one concrete action: keeping a paper IOU pad after a payment situation with a regular.",
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
    "surface_text": "A new named person, Priya, is present and distinct from Marieke and Owen, and her concrete behaviour is keeping a backup card reader.",
    "anchor_span": "keeps a card reader as backup"
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
    "anchor_span": "a basic card reader clipped to her apron, but it has no offline mode, so a bad signal at the stall means she can't charge anything at all"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a basic card reader clipped to her apron. The failure point is precise: with no offline mode, a bad signal at the stall stops all charging.",
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
    "surface_text": "The answer carries a direct quote from Marieke, flagged as a real exchange, so the Words bar is met. The quote states a wish but holds no filmable action, and no third party is referenced.",
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
    "surface_text": "The answer names Jordan, an identifiable individual, as someone who does not have the problem. The reason is present and specific: his sales are pre-paid and online, so no in-person point of sale exists.",
    "anchor_span": "nothing is sold in person"
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