# Corked Runner Report — spark 08

Generated: 2026-10-10T12:48:54.777Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Sanitizer mutation probe — proven-bug regression. Record user_line_candidate verbatim. cleanVisibleText strips "not just", which can turn "do not just pay late" into "do pay late" — a meaning inversion. If the line mutates, the known sanitizer bug has regressed into user-facing text. If M0 rephrases to avoid the construction while keeping both facts (late AND partial), that is a pass.

## Raw Spark
```
A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.
```

Maturity class: 0
Grape: Bram — my uncle, owns four rental flats
expect_halt: false

Line sent to the worker (M0's line): "A tool for landlords when tenants pay in random partial chunks nobody can reconcile."

M0's line (verbatim, not shown in the app): "A tool for landlords when tenants pay in random partial chunks nobody can reconcile."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=clearing, M4=turbid
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
    "domain": "rent payments",
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is landlords and the stated problem is tenant payments arriving in random partial chunks that nobody can reconcile. Both are in the Spark.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific landlord and the moment when the partial payment problem became real for them.",
    "hint": "A good answer names one landlord and one moment: a specific month, a specific tenant, a specific pile of partial payments that did not add up.",
    "person_label": "Landlord",
    "person_placeholder": "Ray, residential landlord with four units",
    "when_label": "When the payments stopped making sense",
    "when_placeholder": "end of month when three partial transfers came in from the same tenant",
    "trying_label": "What they were trying to work out",
    "trying_placeholder": "whether the tenant had paid in full or still owed a balance",
    "happened_label": "What they were looking at",
    "happened_placeholder": "four separate transfers in different amounts across ten days, no reference numbers, no way to match them to the balance"
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
  "spark_summary": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
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
    "surface_text": "A named individual is present. The stated relationship is familial and specific to a landlord context.",
    "anchor_span": "my uncle, owns four rental flats"
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
Summary: outcome=stated · problem="tenants do not just pay late, they pay in random partial chunks nobody can reconcile" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
  "user_line": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "landlords",
    "suspected_problem": "tenants pay in random partial chunks nobody can reconcile",
    "triggering_situation": null,
    "promised_change": null,
    "domain": "rent payments",
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
  "question": "Walk me through the last time Bram received one of these partial payments and describe exactly what he did with it from the moment it landed in his account.",
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
  "user_line": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
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
    "surface_text": "Bram's behaviour is observable: manual matching of bank transfers to a lease spreadsheet by hand. The moment is anchored to a specific recent instance across two weeks last month.",
    "anchor_span": "Last month a tenant sent three separate partial payments across two weeks, and Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand"
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
    "anchor_span": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache."
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": "last month he started asking for one lump sum only"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Tom, a neighbor who rents out a duplex, with a concrete behavioural response to the same reconciliation problem. The Vintage bar finds a recurring policy change anchored loosely to last month but no single discrete past instance.",
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
  "prior_echo_context": "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache.",
  "user_answer": "Priya, who runs a small storage unit business, keeps a manual ledger for partial payments too. For her the pain is chasing the balance down, the reconciling part is fine."
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
    "anchor_span": "Priya, who runs a small storage unit business, keeps a manual ledger for partial payments too"
  },
  "vintage": {
    "state": "turbid",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is chasing the balance down, the reconciling part is fine"
  },
  "observation": {
    "surface_text": "The answer names Priya, a storage unit operator distinct from Bram and Tom, who keeps a manual ledger for partial payments. No specific past instance is given; the behaviour is described as a recurring practice.",
    "anchor_span": "Priya, who runs a small storage unit business, keeps a manual ledger for partial payments too"
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
    "anchor_span": "a shared spreadsheet to track rent, but it has no way to flag a partial payment against the wrong month"
  },
  "observation": {
    "surface_text": "The answer names a shared spreadsheet as the existing solution Bram uses today. A precise failure point is present: it cannot flag a partial payment attributed to the wrong month, causing mismatches to accumulate.",
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
    "anchor_span": "I just want one number a month, not a puzzle"
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "after the Sunday one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a real exchange is present and words_source is real, placing Words at settled. The words carry a stated frustration but no filmable action; the phrase \"after the Sunday one\" gestures at a recurring event without describing observable behaviour.",
    "anchor_span": "I just want one number a month, not a puzzle"
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
    "anchor_span": "Owen only rents to corporate tenants on annual leases paid in full upfront"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual, Owen, with a specific lease arrangement that eliminates partial payments by design. The reason for immunity is present and precise: full-year billing upfront forecloses the partial-chunk dynamic entirely.",
    "anchor_span": "the whole year is billed at once"
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
- M3 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).