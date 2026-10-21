# Corked Runner Report — spark 08

Generated: 2026-10-21T16:35:35.811Z
Worker: http://127.0.0.1:8788

## Test under this spark
Sanitizer mutation probe — proven-bug regression. Record user_line_candidate verbatim. cleanVisibleText strips "not just", which can turn "do not just pay late" into "do pay late" — a meaning inversion. If the line mutates, the known sanitizer bug has regressed into user-facing text. If M0 rephrases to avoid the construction while keeping both facts (late AND partial), that is a pass.

## Raw Spark
```
A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.
```

Maturity class: 0
Grape: Bram — my uncle, owns four rental flats
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
  "raw_spark": "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile."
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