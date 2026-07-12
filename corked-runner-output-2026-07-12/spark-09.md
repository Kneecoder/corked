# Corked Runner Report — spark 09

Generated: 2026-07-12T15:44:46.563Z
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev

## Test under this spark
Cap-edge verbose problem. Expect: either M0 compresses suspected_problem under the 300-char field cap and the chain runs, or a downstream call 400s on "spark_parse.suspected_problem exceeds max length". The second outcome means legitimate verbose input kills the chain — a sturdiness finding to fix, not user error.

## Raw Spark
```
A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.
```

Maturity class: 0
Grape: Ilse — my physio, runs a two-person practice
expect_halt: false

User Line candidate (verbatim from M0): "A tool for physiotherapists in small practices to handle the multi-step rework every time an insurer rejects a claim over a mismatched treatment code."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M4)
  raw grades: M2=settled, M3=settled, M4=clearing
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
  "raw_spark": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.",
  "user_line_candidate": "A tool for physiotherapists in small practices to handle the multi-step rework every time an insurer rejects a claim over a mismatched treatment code.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "physiotherapists in small practices",
    "suspected_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
    "triggering_situation": "an insurer rejects a claim over a mismatched treatment code",
    "promised_change": null,
    "domain": "insurance claim rework for physiotherapists",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is physiotherapists in small practices and the problem is stated in full: a recurring multi-step manual rework triggered by insurer rejections over mismatched treatment codes, with no spare time in a two-person practice to absorb it each week.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific physiotherapist this starts from and the moment the insurer rejection landed.",
    "hint": "A good answer names a real physio, the practice size, and what they were doing when the rejection came in and the rework began.",
    "person_label": "Physiotherapist",
    "person_placeholder": "Diane, sole physio in a two-person practice",
    "when_label": "When the rejection arrived",
    "when_placeholder": "a Tuesday afternoon with three patients still booked",
    "trying_label": "What she was trying to do",
    "trying_placeholder": "get the rejected claim resubmitted before the insurer's resubmission window closed",
    "happened_label": "What the rework actually looked like",
    "happened_placeholder": "she opened three systems, rewrote the claim line by line in the portal, and set a calendar reminder to chase it in two weeks"
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
  "spark_summary": "A tool for physiotherapists in small practices to handle the multi-step rework every time an insurer rejects a claim over a mismatched treatment code.",
  "person_name": "Ilse",
  "relationship": "my physio, runs a two-person practice",
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
    "named_person": "Ilse",
    "person_kind": "named_individual",
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. A real operational tie is stated.",
    "anchor_span": "my physio, runs a two-person practice"
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
Summary: recovered_problem="every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week" · needs_confirmation=false · gap_in_play=false
Request:
```json
{
  "user_line": "A tool for physiotherapists in small practices to handle the multi-step rework every time an insurer rejects a claim over a mismatched treatment code.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "physiotherapists in small practices",
    "suspected_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
    "triggering_situation": "an insurer rejects a claim over a mismatched treatment code",
    "promised_change": null,
    "domain": "insurance claim rework for physiotherapists",
    "solution_is_software": "software"
  },
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0
}
```
Response:
```json
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
  "needs_confirmation": false,
  "gap_in_play": false,
  "observation": {
    "surface_text": "The spark carries a fully stated problem with observable steps and a named time cost. The grape is a known physiotherapist running the exact practice type the problem names.",
    "problem_source": "explicit"
  },
  "question": "Walk me through the last time Ilse got a rejection for a mismatched treatment code, what did she actually open, fill in, or send, and in what order?",
  "hint": "A good answer names the specific systems Ilse touched, the sequence of steps she moved through, and where the two-week follow-up landed in her week, not a general description of the process.",
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
  "user_line": "A tool for physiotherapists in small practices to handle the multi-step rework every time an insurer rejects a claim over a mismatched treatment code.",
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0,
  "confirmed_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
  "gap_in_play": false,
  "user_answer": "Last Tuesday an insurer rejected a claim over a mismatched code, and Ilse spent her lunch break digging out the referral letter and rewriting the claim line by line in the portal."
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
    "anchor_span": "spent her lunch break digging out the referral letter and rewriting the claim line by line in the portal"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday an insurer rejected a claim over a mismatched code"
  },
  "observation": {
    "surface_text": "The answer names a specific observable action: Ilse retrieved a referral letter and rewrote a claim line by line in the portal. The moment is anchored to a single past instance: last Tuesday, a rejection over a mismatched code.",
    "anchor_span": "Last Tuesday an insurer rejected a claim over a mismatched code, and Ilse spent her lunch break digging out the referral letter and rewriting the claim line by line in the portal"
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
  "confirmed_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0,
  "user_answer": "My friend Jordan, who runs a small dental practice, told me last month he started keeping a printed code cheat-sheet after a similar rejection."
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
    "anchor_span": "My friend Jordan, who runs a small dental practice, told me last month he started keeping a printed code cheat-sheet after a similar rejection."
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "last month he started keeping a printed code cheat-sheet after a similar rejection"
  },
  "observation": {
    "surface_text": "The Echo bar finds one identifiable person separate from the grape, Jordan, with a concrete workaround adopted in response to the same category of problem. The Vintage bar finds a specific anchored moment: last month, triggered by a similar rejection.",
    "anchor_span": "My friend Jordan, who runs a small dental practice, told me last month he started keeping a printed code cheat-sheet after a similar rejection."
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
  "confirmed_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0,
  "prior_echo_context": "My friend Jordan, who runs a small dental practice, told me last month he started keeping a printed code cheat-sheet after a similar rejection.",
  "user_answer": "Priya, a massage therapist I met at a conference, keeps a folder of past approved claims to copy from. For her the pain is the follow-up timing, the coding part is fine."
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
    "anchor_span": "Priya, a massage therapist I met at a conference, keeps a folder of past approved claims to copy from"
  },
  "vintage": {
    "state": "clearing",
    "anchor_span": null
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is the follow-up timing, the coding part is fine"
  },
  "observation": {
    "surface_text": "The Echo bar finds one named person, Priya, distinct from Ilse and from Jordan, with a concrete workaround: a folder of past approved claims used as a coding reference. The Vintage bar finds a recurring habit with no specific past instance anchored.",
    "anchor_span": "Priya, a massage therapist I met at a conference, keeps a folder of past approved claims to copy from"
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
  "confirmed_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0,
  "user_answer": "Ilse uses the insurer's own portal to resubmit claims, but it has no way to flag which codes were previously rejected, so the same mismatch can happen twice."
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
    "anchor_span": "uses the insurer's own portal to resubmit claims, but it has no way to flag which codes were previously rejected"
  },
  "observation": {
    "surface_text": "The answer names an existing solution: the insurer's own portal used for claim resubmission. A precise failure point is present: the portal cannot flag previously rejected codes, allowing the same mismatch to recur.",
    "anchor_span": "it has no way to flag which codes were previously rejected, so the same mismatch can happen twice"
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
  "confirmed_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0,
  "words_source": "real",
  "user_answer": "\"I don't have a spare afternoon for this every week,\" she said after the Tuesday one."
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
    "anchor_span": "I don't have a spare afternoon for this every week"
  },
  "tell": {
    "state": "settled",
    "anchor_span": "she said after the Tuesday one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "A direct quote from a real exchange is present, and words_source is real, meeting the settled bar. The words contain a filmable anchor in the referent event named as the Tuesday one.",
    "anchor_span": "she said after the Tuesday one"
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
  "confirmed_problem": "every insurer rejection over a mismatched treatment code forces a multi-step manual rework across multiple systems plus a follow-up two weeks later, and nobody in a two-person practice has time for that every week",
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0,
  "user_answer": "Owen works purely on a cash-pay basis with no insurance billing at all. Claim rejections never happen to him because there are no claims to submit."
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
    "anchor_span": "Owen works purely on a cash-pay basis with no insurance billing at all"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual and a specific structural arrangement that removes insurance billing entirely from his practice. The reason for exemption is present and precise: no claims are submitted, so no rejections occur.",
    "anchor_span": "Claim rejections never happen to him because there are no claims to submit"
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
- M4 offered clearing for Vintage, held at floor settled (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor settled (opportunistic grading correctly did not lower it).