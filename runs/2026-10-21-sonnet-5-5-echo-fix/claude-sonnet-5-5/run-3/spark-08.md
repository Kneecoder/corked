# Corked Runner Report — spark 08

Generated: 2026-10-21T17:50:45.190Z
Worker: http://127.0.0.1:8791

## Test under this spark
Sanitizer mutation probe — proven-bug regression. Record user_line_candidate verbatim. cleanVisibleText strips "not just", which can turn "do not just pay late" into "do pay late" — a meaning inversion. If the line mutates, the known sanitizer bug has regressed into user-facing text. If M0 rephrases to avoid the construction while keeping both facts (late AND partial), that is a pass.

## Raw Spark
```
A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.
```

Maturity class: 0
Grape: Bram — my uncle, owns four rental flats
expect_halt: false

Line sent to the worker (the spark as typed): "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."

M0's line (verbatim, not shown in the app): "A tool for landlords when tenants pay in random partial chunks nobody can reconcile."

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
  raw grades: M3=settled, M4=turbid, M6=turbid
- **Limit**: settled — history: inert → settled (last raised by M7)
  raw grades: M7=settled

## Run Log

### 1. [main] M0 · /m0
Summary: digestibility=cellar_ready · in_scope=true · followup_needed=false
Request:
```json
{
  "raw_spark": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "user_line_candidate": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "landlords",
    "suspected_problem": "tenants pay in random partial chunks nobody can reconcile",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "tenants paying",
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is landlords and the problem is stated: tenants pay in random partial chunks nobody can reconcile. That enters the cellar cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific landlord and the moment you saw tenant payments arrive in partial chunks nobody could reconcile.",
    "hint": "A good answer is one landlord, one tenant, and one stretch of partial payments someone tried to add up.",
    "person_label": "Landlord",
    "person_placeholder": "Dana, landlord with a few rental units",
    "when_label": "When the chunks came in",
    "when_placeholder": "the week a tenant sent three separate payments for one month's rent",
    "trying_label": "Trying to do",
    "trying_placeholder": "work out what the tenant had paid and what was still owed",
    "happened_label": "What happened",
    "happened_placeholder": "Three payments of different amounts arrived over two weeks, and the landlord could not tell which month or charge each one covered."
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
  "spark_summary": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "person_name": "Bram",
  "relationship": "my uncle, owns four rental flats",
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
    "named_person": "Bram",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "Bram is a named individual with a stated tie, an uncle who owns four rental flats. The Grape is settled.",
    "anchor_span": "my uncle, owns four rental flats"
  },
  "next_question": {
    "should_advance": true,
    "framing": "Move to a specific instance of a tenant paying a partial amount in one of Bram's flats."
  },
  "server_checks": {
    "schema_valid": true,
    "anchor_verified": true,
    "visible_style_violations_cleaned": []
  }
}
```

### 3. [main] M2 · /m2 (phase A)
Summary: outcome=stated · problem="tenants do not just pay late, they pay in random partial chunks nobody can reconcile" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "user_line": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "landlords",
    "suspected_problem": "tenants pay in random partial chunks nobody can reconcile",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "tenants paying",
    "solution_is_software": "unstated"
  },
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
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
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "Tell me about the specific time Bram had tenants paying in random partial chunks that nobody could reconcile, and what did Bram actually do to sort it out?",
  "recovered_problem": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
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
  "user_line": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "problem": {
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "user_answer": "Last month a tenant sent three separate partial payments across two weeks, and Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand."
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
    "anchor_span": "Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last month a tenant sent three separate partial payments across two weeks"
  },
  "observation": {
    "surface_text": "Bram's action is observable: matching bank transfers to the lease spreadsheet by hand on Sunday night. The moment is anchored to one instance: three partial payments from one tenant across two weeks last month.",
    "anchor_span": "Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand"
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
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "user_answer": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache."
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
    "anchor_span": "he started asking for one lump sum only after a similar reconciling headache"
  },
  "observation": {
    "surface_text": "The answer names one separate landlord, Tom, who hit a similar reconciling headache and changed his collection to a single lump sum.",
    "anchor_span": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache."
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
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[none]
Request:
```json
{
  "problem": {
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "prior_echo_context": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache.",
  "user_answer": "Priya, who runs a small storage unit business, keeps a manual ledger for partial payments too. For her the pain is chasing the balance down, the reconciling part is fine."
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
    "anchor_span": "For her the pain is chasing the balance down, the reconciling part is fine."
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names a new person, Priya, but states the reconciling part is fine for her, so she has not hit the confirmed problem and her ledger does not count as echo.",
    "anchor_span": "the reconciling part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Priya a real person whose ledger you have seen or heard described firsthand, or a composite of what you imagine a storage unit owner would do?"
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
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "user_answer": "Bram uses a shared spreadsheet to track rent, but it has no way to flag a partial payment against the wrong month, so mismatches pile up."
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
    "anchor_span": "Bram uses a shared spreadsheet to track rent, but it has no way to flag a partial payment against the wrong month"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: a shared spreadsheet used to track rent. It also states a precise failure point: the spreadsheet cannot flag a partial payment applied to the wrong month, so mismatches accumulate.",
    "anchor_span": "it has no way to flag a partial payment against the wrong month, so mismatches pile up"
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
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I just want one number a month, not a puzzle,\" he said after the Sunday one."
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
    "anchor_span": "\"I just want one number a month, not a puzzle,\" he said after the Sunday one."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "\"I just want one number a month, not a puzzle,\""
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Direct quoted language from a real exchange is present, attributed to Bram. The words carry a stated want but no filmable action, and name no third party.",
    "anchor_span": "\"I just want one number a month, not a puzzle,\""
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
    "text": "tenants do not just pay late, they pay in random partial chunks nobody can reconcile",
    "source": "user_stated",
    "status": "confirmed"
  },
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "user_answer": "Owen only rents to corporate tenants on annual leases paid in full upfront. Partial payments never happen to him because the whole year is billed at once."
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
    "anchor_span": "Owen only rents to corporate tenants on annual leases paid in full upfront."
  },
  "observation": {
    "surface_text": "The answer names Owen, a landlord with a bounded arrangement: corporate tenants on annual leases only. The reason is specific and present-day: the full year is billed upfront, so partial payments have no occasion to occur.",
    "anchor_span": "Partial payments never happen to him because the whole year is billed at once."
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
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M0.raw_spark: "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M2-phaseA.recovered_problem: "tenants do not just pay late, they pay in random partial chunks nobody can reconcile"
- ⚠ VOICE: contrast-formula ("not X but Y" / "not just X") found at M2-phaseA.problem.text: "tenants do not just pay late, they pay in random partial chunks nobody can reconcile"

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).