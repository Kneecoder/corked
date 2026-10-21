# Corked Runner Report — spark 10

Generated: 2026-10-21T16:35:51.170Z
Worker: http://127.0.0.1:8788

## Test under this spark
M3 category rule, then M4 rank-up. Expect: M3 echo clearing, never settled — the named workaround does not rescue the category; observation names a population, not a person. M4 echo settled, so element history shows clearing -> settled with no regression. M4 contrast fields are strings: is_different_kind "true", same_or_different "different" (the boolean-wipe bug check).

## Raw Spark
```
An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.
```

Maturity class: 0
Grape: Tomas — my neighbour, carpenter with a one-man business
expect_halt: false

Line sent to the worker (the spark as typed): (none — halted before M0 returned one)

M0's line (verbatim, not shown in the app): (none)

## Element Tracker (final state, floor-enforced like corked_v6.html's rankUp — see "raw grades" for what each mechanism actually offered before the floor was applied)
- **Grape**: inert — history: inert
- **Tell**: inert — history: inert
- **Vintage**: inert — history: inert
- **Gap**: inert — history: inert
- **Echo**: inert — history: inert
- **Limit**: inert — history: inert

## Halt
⛔ M0 request failed: Parse error

## Run Log

### 1. [main] M0 · /m0
Summary: ERROR 502
Request:
```json
{
  "raw_spark": "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem."
}
```
Response:
```json
{
  "error": "Parse error",
  "raw": ""
}
```

## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)
- none detected

## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)
- none