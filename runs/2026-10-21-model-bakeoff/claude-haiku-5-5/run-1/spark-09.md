# Corked Runner Report — spark 09

Generated: 2026-10-21T16:40:50.288Z
Worker: http://127.0.0.1:8790

## Test under this spark
Cap-edge verbose problem. Expect: either M0 compresses suspected_problem under the 300-char field cap and the chain runs, or a downstream call 400s on "spark_parse.suspected_problem exceeds max length". The second outcome means legitimate verbose input kills the chain — a sturdiness finding to fix, not user error.

## Raw Spark
```
A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.
```

Maturity class: 0
Grape: Ilse — my physio, runs a two-person practice
expect_halt: false

Line sent to the worker (the spark as typed): "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week."

M0's line (verbatim, not shown in the app): "A tool for physiotherapists in small practices to handle insurer claim rejections over mismatched treatment codes, when the referral letter, code list, and rewritten claim each have to be handled separately and followed up two weeks later."

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
  "raw_spark": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week."
}
```
Response:
```json
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.",
  "user_line_candidate": "A tool for physiotherapists in small practices to handle insurer claim rejections over mismatched treatment codes, when the referral letter, code list, and rewritten claim each have to be handled separately and followed up two weeks later.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "physiotherapists in small practices",
    "suspected_problem": "Insurer claims are rejected over mismatched treatment codes, and fixing them takes time that two-person practices do not have.",
    "triggering_situation": "An insurer rejects a claim over a mismatched treatment code.",
    "promised_change": null,
    "domain": "physiotherapy insurance claims",
    "solution_is_software": "unstated"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role, the small-practice population, and the stated problem of rejected claims and manual rework are all visible and enter cleanly.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name the specific physiotherapist and the moment an insurer rejection over a mismatched code landed on their desk.",
    "hint": "A good answer names one physio, one practice, and one rejected claim, with the afternoon it cost them.",
    "person_label": "Physiotherapist",
    "person_placeholder": "Priya, owner of a two-person physio practice",
    "when_label": "When the rejection came in",
    "when_placeholder": "the Monday after the insurer changed its code list",
    "trying_label": "What they were trying to do",
    "trying_placeholder": "get a patient's claim paid so the practice gets reimbursed",
    "happened_label": "What actually happened",
    "happened_placeholder": "the referral letter was in one system, the code list in another, and the claim had to be retyped line by line in the portal"
  },
  "person_in_spark": {
    "grade": "turbid",
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
  "spark_summary": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.",
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
    "temporal_grounding": "present_specific"
  },
  "observation": {
    "surface_text": "A named individual is identified: Ilse. The stated relationship is a physio who runs a two-person practice.",
    "anchor_span": "Ilse"
  },
  "next_question": {
    "should_advance": false,
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
Summary: outcome=stated · problem="every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week" (user_stated) · gap_in_play=false
Request:
```json
{
  "phase": "problem",
  "raw_spark": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.",
  "user_line": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "physiotherapists in small practices",
    "suspected_problem": "Insurer claims are rejected over mismatched treatment codes, and fixing them takes time that two-person practices do not have.",
    "triggering_situation": "An insurer rejects a claim over a mismatched treatment code.",
    "promised_change": null,
    "domain": "physiotherapy insurance claims",
    "solution_is_software": "unstated"
  },
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
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
    "text": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
    "source": "user_stated",
    "status": "confirmed"
  },
  "gap_in_play": false,
  "question": "Walk me through the last specific time Ilse had a claim rejected over a mismatched treatment code, step by step, from the rejection notice to the follow-up two weeks later.",
  "recovered_problem": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
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
  "user_line": "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.",
  "grape_name": "Ilse",
  "grape_relationship": "my physio, runs a two-person practice",
  "maturity_class": 0,
  "problem": {
    "text": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "Ilse spent her lunch break digging out the referral letter and rewriting the claim line by line in the portal."
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday an insurer rejected a claim over a mismatched code"
  },
  "observation": {
    "surface_text": "The named grape performs filmable actions: digging out the referral letter and rewriting the claim line by line in the portal. The moment is anchored to a single instance: last Tuesday, one rejected claim, one lunch break.",
    "anchor_span": "Ilse spent her lunch break digging out the referral letter and rewriting the claim line by line in the portal."
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
    "text": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
    "source": "user_stated",
    "status": "confirmed"
  },
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
  "observation": {
    "surface_text": "A named third party, Jordan, a separate dental practice owner distinct from the grape Ilse and the founder, reports one concrete workaround after a similar code rejection: a printed code cheat-sheet.",
    "anchor_span": "he started keeping a printed code cheat-sheet after a similar rejection"
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
    "text": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "Priya, a massage therapist I met at a conference, keeps a folder of past approved claims to copy from."
  },
  "contrast": {
    "is_different_kind": "true",
    "same_or_different": "different",
    "anchor_span": "For her the pain is the follow-up timing, the coding part is fine."
  },
  "observation": {
    "surface_text": "A massage therapist named Priya keeps a folder of past approved claims to copy from, and reports that for her the follow-up timing is the pain point while coding is not.",
    "anchor_span": "Priya, a massage therapist I met at a conference, keeps a folder of past approved claims to copy from."
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
    "text": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "Ilse uses the insurer's own portal to resubmit claims, but it has no way to flag which codes were previously rejected, so the same mismatch can happen twice."
  },
  "observation": {
    "surface_text": "The answer names an existing solution: the insurer's own portal used for claim resubmission. It states a precise failure point: the portal cannot flag previously rejected codes, so the same mismatch can recur.",
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
  "problem": {
    "text": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "\"I don't have a spare afternoon for this every week,\" she said after the Tuesday one."
  },
  "tell": {
    "state": "clearing",
    "anchor_span": "I don't have a spare afternoon for this every week"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer carries a direct quote from the grape, attributed to a real exchange on Tuesday, which meets the words bar. The quoted words state a complaint about lacking time but name no filmable action, so the tell reads clearing.",
    "anchor_span": "\"I don't have a spare afternoon for this every week,\" she said after the Tuesday one."
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
    "text": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
    "source": "user_stated",
    "status": "confirmed"
  },
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
    "anchor_span": "Owen works purely on a cash-pay basis with no insurance billing at all. Claim rejections never happen to him because there are no claims to submit."
  },
  "observation": {
    "surface_text": "The answer names a bounded exclusion: Owen, a physio who bills cash-pay only with no insurance claims. The reason is present and specific: no claims are submitted, so rejections cannot occur.",
    "anchor_span": "Claim rejections never happen to him because there are no claims to submit."
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