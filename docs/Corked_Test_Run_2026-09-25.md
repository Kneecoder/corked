# Corked Test Run: One Answer Path

*25 to 26 September 2026*
- *Tested build: commit 35898fc, worker version db2136d7.*
- *Background: docs/audit-2026-09-24.md.*
- *Plan: Corked_Pilot_Plan_v2.md.*

## What was tested

The One Answer Path brief, covering audit findings 3, 4, 10, 12 and 13.

**Frontend.** Every M2 to M7 answer now goes through one function. It grades first, stores second, and only touches the bottle that asked.

**Worker.** A missing or unknown element state is a failed grade, never a default Turbid. The one exception: a "clearing" on the M6 echo bar still folds down to Turbid.

**Test bottle.**
- Spark: "Freelance designers keep getting paid late by agencies and have to chase every invoice by email."
- Grape: Sarah, sister.

It was taken from intake to the label with scripted answers.

## Results

| Check | What it tests | Result |
|---|---|---|
| 1. Normal run | M2 to M7, a swirl, reopens | **Pass.** M4 was skipped as designed once the Echo settled at M3. The label reopen worked. The sidebar reopen was not tested (see below). |
| 2. Offline submit, at M3 | A failed grade changes nothing | **Pass.** The error showed, the text stayed in the box, the button read "Try again →", and the sidebar didn't change. It graded once back online. |
| 3. Offline swirl, at M2 | A failed follow-up can be retried | **Pass.** The panel stayed open with the text. It graded and closed once back online. |
| 4. Leave mid-grade, at M7 | A late reply never lands in the wrong bottle | **Pass.** The Lisa bottle stayed untouched. The M7 answer waited as an ungraded draft and graded on resubmit. This needed DevTools 3G throttling, because normal grading finished too fast to leave in time (the M5 and M6 attempts). |

**Untested: sidebar reopen.** By the time it was possible, nothing was amber. Next run: give one thin early answer, then reopen it from the sidebar at a later question.

**Verdict.** The brief does what it says. Your click-through closes it, apart from the sidebar reopen.

## Findings

### Needs your call

**1. Tom's moment settled Sarah's Vintage.**

At M3, the answer about Tom carried a moment: "an agency paid him three months late last year". M3's opportunistic Vintage ranked the spine's Vintage up to Settled with it. The label now shows Tom's moment under Sarah's Grape and Sarah's Tell, and reads "All six elements settled. The bottle is ready to cork." Sarah's own moment was still Clearing: "last month an agency paid her six weeks late".

v47 contradicts itself here. It sources the Vintage "opportunistically from M3", yet its own named pair test would call the result Conflicted, because the recorded behaviour is not a response to the recorded occasion.

Proposal: a moment that arrives through M3 or M4 belongs to the third party. It is recorded with the Echo and never settles the spine's Vintage. That is a doctrine change to v47's M3 rule, so it's yours to decide. It needs deciding before the return view is built, or the label will show a Resolved record assembled from two people.

In code, `applyM3Result` and `applyM4Result` both call `applyAnchoredResult('vintage', …)`.

**2. The sharper question asked the wrong thing.**

With only the Limit left amber, tapping it on the label produced: "What is the longest you have gone without payment from an agency before giving up chasing that invoice?" That question has two problems:
- It is addressed to you, not to a third party.
- It asks about the problem, not about someone who doesn't have it.

The answer was still graded as a Limit.

The likely cause is the fallback in the `/resolve` prompt. When the prior answer is thin, it asks for "the plainest version of what real-world evidence is still missing" and loses the element's job. Fixing it changes prompt wording, so it needs a bench case before it ships.

### Bugs

**3. The grape card runs two voices together.**
- `sanitizeVisibleCopy` collapses every line break into a space. Your words ("my sister, she's a freelance graphic designer") run straight into Corked's reading: "…graphic designer Sarah is named and…". You can't tell which words are yours and which are Corked's.
- Fix: keep line breaks in observations, or show the two parts as separate blocks. Small fix.

**4. Errors look like observations.**
- A failed grade shows its error in the observation box, styled exactly like Corked's reading, away from the button. It also replaces the reading that was there.
- Goes to: the error wording pass in the hosting step.

**5. Label text is cut mid-word.**
- Label values stop at 150 characters, so you get "…and had to reop" and "…revision requests as c" (seen on the Lisa bottle).
- Goes to: the return view.

**6. The label date is the viewing date.**
- The Lisa bottle is from July, but its label reads "September 2026". A vintage should be the date the bottle was corked.
- Goes to: the history log.

**7. Pages not opened from localhost:8080 can't reach the worker, and the message blames the connection.**
- This is audit finding 9, seen live.
- Goes to: the hosting step.

### Copy and voice

**8. "Both are present"** appeared in the M0 reading. The M0 doctrine bans that phrasing.

**9. Rubric words leak into observations.** For example: "The Echo bar finds…" and "The Vintage bar finds…". The doctrine says the rubric is never shown. The M3 prompt itself uses "Echo bar", and the model repeated it.

**10. An observation upgraded the answer.** The M3 reading says Tom changed his terms "in direct response to" a late payment. The answer only said "after". Compress-may-not-upgrade should cover observations too. Add it as a regression case.

**11. Swirl questions invite a yes or no.** It happened twice:
- M2: "Is Sarah a specific person … or is she the nearest example of someone who might have this problem?"
- M7: "Is there a specific designer or role you know of … where late payment and invoice chasing simply never arise?"

The doctrine says a yes/no question is a bad question.

**12. Sarah appears four times on the grape card screen**: in the person box, the heading, the hint and the reading.

**13. The M2 hint uses a contrast formula**: "…not how the situation made her feel."

**14. The label footer doesn't adapt.**
- "The rest tells you what to go find" still shows with all six elements settled.
- "Cork another spark" is still the primary action, a known v47 issue.

All of these go to the copy pass, which happens with the return view. Items 9 to 11 change prompt wording, so they need bench cases.

### Pacing

**15. One sitting took the bottle from spark to "ready to cork".**
- The cellar card said "Question in 7 days" the whole time. The gate doesn't hold, and the card promises a wait that doesn't exist.
- This confirms audit finding 6. Goes to: paced returns.

### Look and feel

**16. Every question stacks six to eight boxes**: spark, eyebrow, question, hint, brief, answer, reading, errand, what changed, and three buttons. Your verdict was "textbox textbox textbox": hard to follow, even when the content is good.
- Goes to: the visual pass with the return view.

## Notes for the next run

- **Serve the app on localhost:8080.** Run `npx http-server -p 8080 -c-1` and open `http://localhost:8080/corked_v6.html`. The cellar is stored per address, and the worker only answers localhost:8080.
- **Slow the network first** when testing a mid-grade exit: DevTools, then Network, then 3G. Keep DevTools open while you test.
- **Deploy from your own terminal** with `npx wrangler deploy`. Claude Code's `!` can't sign in to wrangler.

## What's next

The build order holds. The next brief is parking: audit finding 2, plus the three gaps from the One Answer Path report:
- the hidden draft after a failed park re-entry
- the silent second park click
- the dormant FIND path

Finding 1 needs your decision before the return view. Findings 3 to 16 go where marked above.
