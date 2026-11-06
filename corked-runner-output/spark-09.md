# Corked Runner Report — spark 09

Generated: 2026-11-06T19:00:44.404Z
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

Line sent to the worker (the spark as typed): "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week."

M0's line (verbatim, not shown in the app): "A tool for physiotherapists in small practices to handle insurer claim rejections over mismatched treatment codes, without spending an afternoon each week digging referral letters, cross-checking code lists, rewriting claim lines, and chasing follow-ups across multiple systems."

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: settled — history: inert → settled (last raised by M1)
  raw grades: M1=settled
- **Tell**: settled — history: inert → settled (last raised by M6)
  raw grades: M2=settled, M6=settled
- **Vintage**: settled — history: inert → settled (last raised by M2)
  raw grades: M2=settled
- **Gap**: settled — history: inert → settled (last raised by M5)
  raw grades: M5=settled
- **Echo**: clearing — history: inert → clearing (last raised by M6)
  raw grades: M3=clearing, M4=turbid, M6=turbid
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
  "user_line_candidate": "A tool for physiotherapists in small practices to handle insurer claim rejections over mismatched treatment codes, without spending an afternoon each week digging referral letters, cross-checking code lists, rewriting claim lines, and chasing follow-ups across multiple systems.",
  "spark_parse": {
    "solution_form": "tool",
    "implied_person": "physiotherapists in small practices",
    "suspected_problem": "every time an insurer rejects a claim over a mismatched treatment code, the physio has to dig the referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and follow up two weeks later, and nobody in a two-person practice has a spare afternoon for that every single week",
    "triggering_situation": "an insurer rejects a claim over a mismatched treatment code",
    "promised_change": null,
    "domain": "insurer claim rejections, treatment codes",
    "solution_is_software": "software"
  },
  "digestibility": {
    "state": "cellar_ready",
    "missing": [],
    "reason": "Cellar-ready. The role is physiotherapists in small practices and the problem is a recurring multi-step manual process triggered each time an insurer rejects a claim over a mismatched treatment code. Both are stated clearly and the tool form is named.",
    "can_seal": true,
    "requires_followup_before_seal": false
  },
  "followup": {
    "needed": false,
    "question": null
  },
  "m1_setup": {
    "question": "Name a specific physiotherapist and the moment a claim rejection landed and set off the whole process.",
    "hint": "A good answer names the person, the insurer or claim type, and what they were doing when the rejection came in.",
    "person_label": "Physiotherapist",
    "person_placeholder": "Priya, solo physiotherapist in a two-person practice",
    "when_label": "When the rejection arrived",
    "when_placeholder": "a Friday afternoon when she had patients booked back to back",
    "trying_label": "What she was trying to do",
    "trying_placeholder": "clear the week's rejected claims before the weekend",
    "happened_label": "What actually happened",
    "happened_placeholder": "she spent two hours switching between the referral system, the code list, and the insurer portal to rewrite one claim, and flagged a follow-up reminder for two weeks out"
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
  },
  "ai_fields": [
    "user_line_candidate",
    "digestibility.reason",
    "m1_setup.question",
    "m1_setup.hint",
    "m1_setup.person_label",
    "m1_setup.person_placeholder",
    "m1_setup.when_label",
    "m1_setup.when_placeholder",
    "m1_setup.trying_label",
    "m1_setup.trying_placeholder",
    "m1_setup.happened_label",
    "m1_setup.happened_placeholder",
    "spark_parse.solution_form",
    "spark_parse.implied_person",
    "spark_parse.suspected_problem",
    "spark_parse.triggering_situation",
    "spark_parse.domain"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "temporal_grounding": "present_general"
  },
  "observation": {
    "surface_text": "A named individual is present. A real operational relationship is stated.",
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
  },
  "ai_fields": [
    "observation.surface_text",
    "grape.named_person"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "suspected_problem": "every time an insurer rejects a claim over a mismatched treatment code, the physio has to dig the referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and follow up two weeks later, and nobody in a two-person practice has a spare afternoon for that every single week",
    "triggering_situation": "an insurer rejects a claim over a mismatched treatment code",
    "promised_change": null,
    "domain": "insurer claim rejections, treatment codes",
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
  "question": "Walk me through the last time Ilse got a rejection over a mismatched treatment code: which system did she open first to dig out the referral letter, and what did she do next?",
  "recovered_problem": "every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week",
  "needs_confirmation": false,
  "ai_fields": [
    "question"
  ],
  "server_checks": {
    "schema_valid": true,
    "model_outcome": "stated",
    "outcome": "stated",
    "downgrades": [],
    "unsupported_words": [],
    "visible_style_violations_cleaned": [],
    "m2_question_repaired": false
  },
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "anchor_span": "spent her lunch break digging out the referral letter and rewriting the claim line by line in the portal"
  },
  "vintage": {
    "state": "settled",
    "anchor_span": "Last Tuesday an insurer rejected a claim over a mismatched code"
  },
  "observation": {
    "surface_text": "The answer names a specific filmable sequence: Ilse digging out the referral letter and rewriting the claim line by line in the portal. The moment is anchored to a single instance: last Tuesday, triggered by a mismatched code rejection.",
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
  },
  "ai_fields": [
    "observation.surface_text"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
}
```

### 5. [main] M3 · /m3
Summary: state=clearing · substitution_detected=false · swirl=yes · changed=[Echo]
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
  "state": "clearing",
  "echo": {
    "state": "clearing",
    "anchor_span": "My friend Jordan, who runs a small dental practice, told me last month he started keeping a printed code cheat-sheet after a similar rejection"
  },
  "observation": {
    "surface_text": "The answer names one identifiable person with a concrete workaround, but the problem is described as 'a similar rejection' rather than the full confirmed problem of multi-system retrieval, line-by-line rewriting, and two-week follow-up cycles that consume a small practice's time.",
    "anchor_span": "a similar rejection"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is Jordan a specific person who described this problem in their own words, or is the account a loose paraphrase of something the answer-giver inferred from a brief conversation?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  },
  "ai_fields": [
    "observation.surface_text",
    "swirl.question"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
}
```

### 6. [main] M4 · /m4
Summary: state=turbid · substitution_detected=false · swirl=yes · changed=[none]
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
  "state": "turbid",
  "echo": {
    "state": "turbid",
    "anchor_span": "the coding part is fine"
  },
  "contrast": {
    "is_different_kind": "unclear",
    "same_or_different": "unclear",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "Priya is named and her folder behaviour is concrete, but the answer explicitly states the confirmed problem does not apply to her: coding is fine and only follow-up timing is her pain, so she has not hit the same problem.",
    "anchor_span": "the coding part is fine"
  },
  "substitution_detected": false,
  "swirl": {
    "kind": "reality",
    "question": "Is there a specific person Priya knows, or someone else from that conference, for whom the code-mismatch rejection and the full resubmission burden both land at once?"
  },
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": true
  },
  "ai_fields": [
    "observation.surface_text",
    "swirl.question"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "anchor_span": "Ilse uses the insurer's own portal to resubmit claims, but it has no way to flag which codes were previously rejected"
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
  },
  "ai_fields": [
    "observation.surface_text"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "state": "settled",
    "anchor_span": "she said after the Tuesday one"
  },
  "echo": {
    "state": "turbid",
    "anchor_span": null
  },
  "observation": {
    "surface_text": "The answer supplies a direct quote attributed to Ilse from a flagged real exchange, satisfying the Words bar at settled. The phrase \"after the Tuesday one\" anchors the quote to a specific filmable moment, lifting Tell to settled.",
    "anchor_span": "\"I don't have a spare afternoon for this every week,\" she said after the Tuesday one."
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": false
  },
  "ai_fields": [
    "observation.surface_text"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
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
    "anchor_span": "Owen works purely on a cash-pay basis with no insurance billing at all"
  },
  "observation": {
    "surface_text": "The answer names a bounded individual, Owen, with a specific structural circumstance that removes him from the problem domain entirely. The reason is present and specific: no insurance billing means no claims exist to be rejected.",
    "anchor_span": "Claim rejections never happen to him because there are no claims to submit"
  },
  "substitution_detected": false,
  "server_checks": {
    "schema_valid": true,
    "visible_style_violations_cleaned": [],
    "overall_state_is_primary": true,
    "swirl_included": false
  },
  "ai_fields": [
    "observation.surface_text"
  ],
  "prompt_version": "2026-11-06",
  "model": "claude-sonnet-4-6"
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- M4 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).
- M6 offered turbid for Echo, held at floor clearing (opportunistic grading correctly did not lower it).