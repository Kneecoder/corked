# Corked Runner Report — spark 08

Generated: 2026-07-12T15:43:59.436Z
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

User Line candidate (verbatim from M0): "A tool for landlords when tenants pay in random partial chunks nobody can reconcile."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=clearing
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=turbid
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
    "reason": "Cellar-ready. The role is landlords and the stated problem is tenants paying in random partial chunks nobody can reconcile. Both are present and the idea enters cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific landlord this starts from and the moment the partial payment problem became impossible to ignore.",
    "hint": "A good answer names one landlord and one concrete moment, such as when they received three partial payments in a week and could not tell which unit was still short.",
    "person_label": "Landlord",
    "person_placeholder": "Sandra, residential landlord with six units",
    "when_label": "When the reconciliation broke down",
    "when_placeholder": "end of the month when three tenants had each paid twice in partial amounts",
    "trying_label": "What the landlord was trying to do",
    "trying_placeholder": "work out which tenants had fully paid and which were still short",
    "happened_label": "What actually happened",
    "happened_placeholder": "partial payments from different tenants arrived on different days, some split across apps and cash, and she could not match any of them to a balance"
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
    "surface_text": "A named individual is present. A concrete ownership role is stated.",
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
Summary: recovered_problem="tenants pay in random partial chunks nobody can reconcile" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
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
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "tenants pay in random partial chunks nobody can reconcile",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "Bram owns four rental flats and encounters partial rent payments he cannot reconcile. The problem arrived in the spark as explicit user language.",
    "problem_source": "explicit"
  },
  "question": "Think of the last time Bram received a partial payment he could not reconcile, what did he actually do to try to figure out what was still owed?",
  "hint": "A good answer names a specific tenant, a specific payment or set of payments, and the exact action Bram took, a spreadsheet he opened, a message he sent, a number he guessed at.",
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
  "user_line": "A tool for landlords when tenants pay in random partial chunks nobody can reconcile.",
  "grape_name": "Bram",
  "grape_relationship": "my uncle, owns four rental flats",
  "maturity_class": 0,
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
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
    "surface_text": "A specific filmable action is present: Bram at a spreadsheet on Sunday night, reconciling by hand. The moment is anchored to last month, a single two-week window with a named tenant.",
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
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
    "state": "settled",
    "anchor_span": "last month he started asking for one lump sum only after a similar reconciling headache"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable separate person, Tom, a duplex landlord distinct from Bram and the founder, with a concrete workaround of switching to lump-sum payment demands. The Vintage bar finds a specific anchored instance: last month, triggered by a reconciling headache.",
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
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
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer names a specific person, Priya, distinct from Bram and from Tom, with a concrete behaviour: maintaining a manual ledger for partial payments. No specific past instance is anchored; the behaviour is described as an ongoing pattern only.",
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
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
    "anchor_span": "shared spreadsheet to track rent, but it has no way to flag a partial payment against the wrong month"
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
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
    "anchor_span": "I just want one number a month, not a puzzle"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a real exchange is present, attributing specific language to Bram. The words carry a stated frustration but no filmable action, and no third-party reference appears.",
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
  "confirmed_problem": "tenants pay in random partial chunks nobody can reconcile",
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
    "surface_text": "The answer names a bounded individual with a specific arrangement: corporate tenants, annual leases, full upfront payment. The reason for immunity is present and mechanically specific: the entire year is billed at once, eliminating the partial-payment scenario entirely.",
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

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered turbid for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered clearing for Tell, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).