# Corked Runner Report — spark 07

Generated: 2026-07-11T18:23:00.735Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Compress-may-not-upgrade, register hold. Expect: user_line_candidate keeps "annoying with payments" or very close; no operationalised synonyms (late, difficult, unreliable = fail), no introduced nouns. person_in_spark settled (name plus tie). M1 grape settled.

## Raw Spark
```
an app for my sister Marieke because customers are annoying with payments at her flower stall
```

Maturity class: 0
Grape: Marieke — my sister
expect_halt: false

User Line candidate (verbatim from M0): "An app for flower stall owners because customers are annoying with payments"

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
  raw grades: M3=settled, M4=clearing, M6=turbid
- **Limit**: clearing — history: inert → clearing (last raised by M7)
  raw grades: M7=clearing

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
  "user_line_candidate": "An app for flower stall owners because customers are annoying with payments",
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
    "reason": "Cellar-ready. The role is visible as flower stall owners and the stated problem is customers being annoying with payments. Both enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific flower stall owner and the moment when a customer was annoying with payments.",
    "hint": "A good answer names what the stall owner was doing and what the customer did with the payment that made it annoying.",
    "person_label": "Flower stall owner",
    "person_placeholder": "Marieke, flower stall owner",
    "when_label": "When it happened",
    "when_placeholder": "during a busy Saturday market while serving a queue of customers",
    "trying_label": "What she was trying to do",
    "trying_placeholder": "finish the sale quickly and move to the next customer",
    "happened_label": "What the customer did with the payment",
    "happened_placeholder": "customer argued about change, paid in mixed coins, or asked to pay later"
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
  "spark_summary": "An app for flower stall owners because customers are annoying with payments",
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
    "surface_text": "A named individual is present. A real stated relationship ties that individual to the source.",
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
Summary: recovered_problem="customers are annoying with payments" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "An app for flower stall owners because customers are annoying with payments",
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
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "customers are annoying with payments",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark names a grape and a domain but the problem is thin. Payment friction at a flower stall could mean many things: slow payers, wrong change, card refusals, disputes, or something else.",
    "problem_source": "implied"
  },
  "question": "Think of the last time a customer gave Marieke trouble with a payment at the stall, what exactly happened, step by step, from the moment the customer went to pay?",
  "hint": "A good answer names a specific transaction: what the customer did, what Marieke had to do in response, and where it broke down or slowed down, not a general pattern.",
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
Summary: state=settled · substitution_detected=false · swirl=no · changed=[Tell, Vintage]
Request:
```json
{
  "user_line": "An app for flower stall owners because customers are annoying with payments",
  "grape_name": "Marieke",
  "grape_relationship": "my sister",
  "maturity_class": 0,
  "confirmed_problem": "customers are annoying with payments",
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
    "surface_text": "The Tell is settled: a specific observable action is named. The Vintage is settled: the behaviour is anchored to a single instance with a named time and place.",
    "anchor_span": "Last Saturday a regular customer paid with a card that declined twice at the stall, and Marieke just waved her off with the flowers anyway"
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
  "confirmed_problem": "customers are annoying with payments",
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
  "vintage": {
    "state": "settled",
    "anchor_span": "last month he started keeping a paper IOU pad after a similar situation with a regular"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable person, Owen, distinct from the grape and founder, with a concrete workaround behaviour reported directly. The Vintage bar finds a specific anchored instance: a past situation with a regular customer that prompted the paper IOU pad last month.",
    "anchor_span": "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular."
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "confirmed_problem": "customers are annoying with payments",
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
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "Priya, a food truck owner I met at the market, keeps a card reader as backup for exactly this"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is spotty signal, the payment method itself is fine"
  },
  "observation": {
    "surface_text": "The answer names Priya with a concrete workaround, but her described problem is spotty signal rather than annoying payment behaviour, which means she has not confirmed the same problem. No specific past instance is present, only a standing habit.",
    "anchor_span": "For her the pain is spotty signal, the payment method itself is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a specific person who described this pain directly, or a composite of food truck owners encountered at the market?"
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
  "confirmed_problem": "customers are annoying with payments",
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
    "surface_text": "The answer names a specific existing solution: a basic card reader used at the stall. The precise failure point is also present: no offline mode causes a complete inability to charge customers when signal is poor.",
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
  "confirmed_problem": "customers are annoying with payments",
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
    "anchor_span": "\"I just want people to pay and go,\" she said after the declined-card one."
  },
  "tell": {
    "state": "settled",
    "anchor_span": "she said after the declined-card one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Words bar finds a direct quote from a real exchange attributed to Marieke, meeting the settled bar. The words are anchored to a specific incident, the declined-card event, which constitutes a filmable moment and settles Tell.",
    "anchor_span": "\"I just want people to pay and go,\" she said after the declined-card one."
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
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Limit]
Request:
```json
{
  "confirmed_problem": "customers are annoying with payments",
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
  "state": "clearing",
  "limit": {
    "state": "clearing",
    "anchor_span": "Jordan sells only pre-paid subscription flower boxes online"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual and attaches a reason for immunity. The reason conflates point-of-sale friction with the confirmed problem, which concerns customer payment annoyances broadly, leaving the exclusion only partially matched to the stated need.",
    "anchor_span": "Payment problems at the point of sale never happen to him because nothing is sold in person."
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Does Jordan actually face no payment friction at all, or does pre-paid subscription still expose him to chargebacks, failed renewals, and late card updates that fit what Marieke called annoying?"
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
- M4 offered clearing for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).