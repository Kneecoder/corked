# Battery Diff — 2026-07-11 vs 2026-07-12

Baseline: `corked-runner-output/` (generated 2026-07-11T18:31:39Z)
Today:    `corked-runner-output-2026-07-12/` (generated 2026-07-12T15:52:54Z)
Worker: https://orked-m1-proxy.kneebonewebdesign.workers.dev
Live deploy confirmed current for this run: version `3a812c86` uploaded 2026-07-12T14:52:53Z, matching git HEAD `984db75` ("PROBLEM_LENGTH_CAP 500, JSON candidate parser, single-object doctrine line").

Result: **18/20 sparks match yesterday's outcome exactly. Sparks 09 and 12 flip from FAIL to PASS, as predicted.**

## Spark-by-spark

| # | Outcome match | Notes |
|---|---|---|
| 01 | ✅ same — PASS, full chain | no diff |
| 02 | ✅ same — PASS, full chain | no diff |
| 03 | ✅ same — PASS, full chain | no diff |
| 04 | ✅ same — PASS, scope halt | no diff |
| 05 | ✅ same — RECORDED, scope halt | doctrine-corner spark, both runs land on "out of scope," as before |
| 06 | ✅ same — PASS, unbottleable halt | no diff |
| 07 | ✅ same — PASS, full chain | no diff |
| 08 | ✅ same — PASS, full chain | same VOICE anomaly both runs (contrast-formula in the raw spark text itself, not model output — expected every run) |
| **09** | **🔧 FIXED — FAIL → PASS** | see below |
| 10 | ✅ same — PASS, full chain | no diff |
| 11 | ✅ same — PASS, full chain | no diff |
| **12** | **🔧 FIXED — FAIL → PASS** | see below |
| 13 | ✅ same — PASS, full chain | no diff |
| 14 | ✅ same — PASS, full chain | no diff |
| 15 | ✅ same — PASS, full chain | yesterday's VOICE anomaly (contrast-formula in M5 observation prose) did not recur here today |
| 16 | ✅ same — PASS, full chain | no diff |
| 17 | ✅ same — PASS, full chain | no diff |
| 18 | ✅ same — PASS, full chain | today picked up the VOICE anomaly that landed on 15 yesterday (see note below) |
| 19 | ✅ same — PASS, full chain | no diff |
| 20 | ✅ same — PASS, scope-3 halt | no diff |

## Spark 09 — Cap-edge verbose problem (now fixed)

**Yesterday:** halted at M2 Phase A with `400: spark_parse.suspected_problem exceeds max length of 300`. M0 passed a 300+ char `suspected_problem` straight through; the field cap rejected it downstream and killed the chain — the "legitimate verbose input kills the chain" failure mode the test note called out as a sturdiness bug, not user error.

**Today:** M0's compressed `suspected_problem` is 199 chars — well under even the old 300 cap, so this isn't just the cap raise papering over it. Chain completes end to end: Grape, Tell, Vintage, and Gap all reach `settled`. Consistent with the "JSON candidate parser" and cap-related fixes in the latest worker commit.

## Spark 12 — Class 2 self battery (now fixed)

**Yesterday:** halted at M4 with a `502 Parse error`. The raw model response contained a self-correction pattern — one JSON block, then a `*Self-correction: the state field must match echo.state*` aside, then a second corrected JSON block — and the old parser choked trying to parse the whole raw string instead of extracting the (valid, final) JSON object.

**Today:** completes the full chain. Grape/Tell/Vintage/Gap all reach `settled`, matching the doctrine-expected shape for this spark (self-mode, M3 echo turbid pivot, M4 settled via a separate person). Consistent with the "JSON candidate parser" fix — the worker now appears to extract a valid JSON candidate from the response rather than failing outright on non-JSON preamble/self-correction text.

## Floating anomaly note (sparks 15 / 18)

Both runs flag exactly one instance of the same mechanical VOICE check — a "not X but Y" contrast-formula pattern inside an M5 `observation.surface_text` — but it lands on a different spark between runs (spark 15 yesterday, spark 18 today). Sparks 10, 11, 13, 14, 15, 18, 19 all reuse the identical M5 placeholder answer ("...uses a plain spreadsheet template... does not catch the problem until it is already too late"), and which one of those the model happens to paraphrase with a "but" construction in its own prose varies run to run. This is LLM output non-determinism, not a functional regression — the underlying mechanism (M5) and placeholder answer are unchanged; only which spark's model-generated observation prose triggers the mechanical scan moved.

## Anomaly count

- Yesterday: 3 total (scope x2 expected, contrast-formula on raw spark text at spark 08, contrast-formula in M5 prose at spark 15)
- Today: 3 total (scope x2 expected, contrast-formula on raw spark text at spark 08, contrast-formula in M5 prose at spark 18)

No new anomaly types introduced. No regressions.
