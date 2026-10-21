# v48 calls

## 5 Oct
- Self mode: the Grape settles on a name plus "This is me". The self answer is read like a scene answer, before any guess; its test is whether it says what goes wrong for the builder, not one real occasion. The self errand only goes where the grape is the one to ask (M2, M5, M6), with no in-flight state. In self mode M6 can't touch the Echo.
- Paced returns: only the next new question waits. Follow-ups, reopens, replies and parked errands stay open. Demurrage counts from when a question opens.
- History log: append only. Per answer: date, question as shown, full answer, elements moved, words on record, uncut. Problem entries. A restatements list. No backfill.
- Doctrine lives in docs/. CLAUDE.md holds the house rules.

## 10 Oct
- Held questions and parked returns come back on the due day at the start of the builder's picked part of the day. An answer or park before 05:00 counts as the previous day.
- The door: the spark as typed is the User Line v1, recorded permanently. M0 parses for routing and decides only two things: is it software, and is there anything to bottle. Nothing M0 writes is shown: no line, no grade, no question at the door. The first session proves Corked at the grape step and M2's first question, not with a compressed line. This replaces the v47 M0 sentences that say it produces the User Line and that the first session shows the compressed Line.
- The maturity questions ask about the person the spark comes from, never "this problem".

## 21 Oct
- Only a moment that happened to the grape settles the Vintage. A moment that arrives through M3 or M4 belongs to that third party: it counts for the Echo and never moves the Vintage. The Vintage comes from M2 only: its answer, its follow-up and its reopen. A record where one person's moment settles another person's Vintage is the named pair collision v47 already calls Conflicted: the recorded behaviour is not a response to the recorded occasion. This replaces the v47 lines that source the Vintage "from M2, and opportunistically from M3" and that make the Vintage opportunistic in M3.
- Logic is checked by scripted runs, not click-throughs: grades, element states, routing and history log entries. Each brief states the scenario and the expected results before any code changes. A script drives the real app in a headless browser against the live worker, exports the cellar, and saves the raw JSON in the repo. Code reports what happened against each expected result and never calls anything a pass. If an expected result fails, it is reported and the work stops: the app and the expectations are never changed to make a run pass. Jamie checks screens in real use. This replaces "Playwright/Puppeteer out of scope" for these runs.
