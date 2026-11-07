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
- A named person who says the confirmed problem doesn't apply to them (it's fine for them, they have it under control, their pain is something else) has not hit the same problem. Their Echo grades turbid, however concrete their behaviour, so a person without the problem can never move the Echo up. Such a person may be Limit material; that is M7's job, not the Echo's.

## 5 Nov
- Corked only takes ideas that fix a problem someone has, the builder's own included. One question right after the spark decides it. Ideas made for their own sake (games, creative work) are turned away for now; their own tests come later.
- The look: paper ground, ink text, one wine-red accent for the one next move. The builder's words in Newsreader, Corked's questions and buttons in Inter, Corked's spoken lines and small labels in IBM Plex Mono.
- The Winemaster figure goes. Corked's new lines type out instead.
- After an answer, the screen shows what fits the situation: something settled, a thin answer with its follow-up, an errand, or a failed send. The one-line observation stays in every situation.
- The bottle stays full and its layers go clear as elements settle. No fill level.

## 6 Nov
- The gate asks "Is this a fix or an experiment?" A: "A fix. I saw something go wrong, for someone or for me." B: "An experiment. I want to build it and see what people do with it." Both kinds get a path. Nothing is turned away. This replaces the 5 Nov turn-away.

## 7 Nov
1. Yes to putting the first minutes first; exact questions, sidebar contents and next steps remain open for B1/B3. This approves the direction, not every detail of the example session.
2. Yes: park the full End of Phase 1 machinery for the pilot and use one simple review and decision screen. Every bottle still ends on a decision; the screen's contents, the endings and any scheduling rules stay open for C4.
3. Yes: finish A2 and A3, including disclosure and checking the replacement model's behaviour, before Stage 0.
4. Yes: remove enforced waits between thinking questions. Leave the pace picker and calendar design to C2. Test whether spacing improves idea development; leave the test design and success criteria open.
5. Yes: keep the first tap and ask about the last relevant occasion on both paths, allowing "I don't know." The tap sets the initial path. Corked may explain and offer a different test; the user chooses whether to switch.
6. Yes: remove the sag and stall note. Show factual status and timing, and keep unfinished bottles visible. Leave decision-point options, extension limits and scheduling to C4.
7. Yes: Corked helps draft outreach; the user reviews and sends. Suggest a relevant known person first, and use a last-time question where appropriate. Record quotes, paraphrases and observed behaviour distinctly; assess what they demonstrate rather than treating someone else's words as confirmation by default. Leave drafting and follow-ups to C1.
8. Yes: show a fixed, plain-language sentence behind "Why is this open?" explaining what would resolve that part. Preserve answers even when the part remains open. Write the sentences and align them with grading in B2.
9. Yes: accept a name, initials or a clear description of a specific person equally, on both paths. Check that the grader never requires or rewards a full name.
10. Yes: recruit intended users through strangers and loose contacts, record their relationship to you, and have someone else run exit interviews, including with people who drop out. You may observe Stage 0 silently.
11. Yes to the principle: Corked's own line is set in advance. Before Stage 0, settle what counts as an unprompted return, what counts as a useful return, the threshold for a five-person second round, and the consequence.

Across all calls: Fix and experiment each get a test that fits them. A fix checks the problem with real people; an experiment lets people try a small version. No path requires an interview, and an experiment needs no problem and no repeat use by default. The builder picks, before running the test, which behaviour by other people would count, and sets the line for it. This is the rule for testing only; an outside test is never a prerequisite for a useful first shaping session.
