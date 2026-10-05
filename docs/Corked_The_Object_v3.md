# The Object
### The payoff Corked has been missing

*Parked design requirement. Not on today's build order. Written down so it stops living in chat windows.*

*v3, October 2026. Adds where the Object lives (the sidebar, direction B2), the rules for it, what the history log has to store for it, and the plan as it stands. Supersedes v2.*

---

## The problem it solves

Right now every run ends on six state pills and a count. Every answer goes into the conversation and never comes back out as anything, so Corked feels like a text back and forth. The moment Corked is built around, seeing what you first believed next to what your answers actually hold, does not exist on any screen yet.

---

## The idea

The label writes itself out of your own words.

- At the top, the spark as you first wrote it. What you walked in with.
- Under it, the label. Every line is a sentence you actually wrote, pulled verbatim from your answers: who has it, what they did, the moment, what they use now and where it fails, someone else who has it, who doesn't.
- Where nothing is on record yet, the line stays visibly empty, with the one errand that would fill it.
- One next move.

That is the whole thing. In one glance a vague sentence turns into a stack of specifics, all of them yours. The empty lines show exactly what you don't know yet. The value is visible without anyone saying it.

---

## Where it lives: the sidebar (new in v3)

The Object is not a separate screen at the end. It is the left sidebar: standing while you answer and on every return, readable without the conversation. The conversation is how you get there. The sidebar is what you leave with.

It lands in the first session, not the first return. You watch a vague sentence turn into specifics while you answer. v47: the first session has to prove Corked before it explains it.

On a phone there is no sidebar. It stacks above the question, so it has to read on its own anyway.

Direction picked from four prototypes on the canvas: https://claude.ai/artifact/3oYp7Q6CKtRo4RJabhrrSV. The pick is B2, the simplified ship log. The prototypes run on a made-up band bottle. They pick the direction, not the final design.

Top to bottom:

- **First.** The spark as you wrote it, dated.
- **Now.** How you would put the idea now, in your words, dated. Empty until you restate it.
- **On record.** Each line in your words, dated.
- **Still open.** What has no case behind it yet, with its state: parked, or asked and waiting.
- **The way here.** Collapsed by default. Logs what changed on the record, not that you answered.
- **Next.** One move. The only gold thing on the screen.

Why not the others:

- A, Logbook. Six fixed slots read as a form to finish. Reflection turns into filling boxes.
- B, Ship log. Right structure, too long. The history buried the record.
- C, Your words, marked. Most transparent, but as the main view it feels like someone marking your homework, and showing exactly which words counted teaches the rubric fastest. Its transparency survives in B2 as "where this came from," on demand.

---

## Rules for the sidebar (new in v3)

- **Summarise by arranging, never by writing.** Every line is your words or an honest blank. A Corked-written summary in the most prominent spot on the screen is the core defect at full volume.
- **Only you write Now.** Corked never writes "your thinking shifted from X to Y." The change shows because First and Now sit next to each other.
- **Every line opens to where it came from.** The question as it was asked, the date, your full answer with the part that went on record underlined. Tap, not hover: phones have no hover and keyboards cannot reach it. A line that cannot open to an answer does not belong on the record.
- **Your words in serif, Corked's in sans.** Origin is visible before anything is opened.
- **A belief with no case behind it is saved as an assumption,** with the exact absence: "Saved as an assumption. No example outside your band yet." Never "nothing went on record." The belief did reach the record, as a belief. One word for this state everywhere: assumption.
- **It changes when an answer lands, never while you type.** The question stays the focal point while you answer.
- **No counts, no percentages, no celebration.** One gold thing: Next.

---

## Why it pops

- Contrast. Before and after, on one surface.
- Ownership. Every line is the builder's own words, so it reads as a mirror, not as feedback. You cannot argue with your own sentence.
- Honesty. The blanks are the point. They are the task list (v47: the label is a task list, not a verdict).
- It is an object. Something to keep, look at, and show. Conversations are not.

---

## The rule that makes or breaks it

The wow comes from what you see, never from the screen cheering. v47's system voice does not react and does not celebrate: a lab result, not a pep talk. "Look how far your idea came" would cheapen it. The contrast does the work. The dent carries the implication.

---

## Doctrine it must obey

- Provenance Rule. Only what reached the bottle appears. An empty line means not on record yet, never "does not exist". The copy for blanks has to say that, not "missing".
- Verbatim only. No generated sentence stands on the label. The Evidence Line generator stays out of the pilot, and the object does not need it, because every line is the builder's own anchored span.
- Compress-may-not-upgrade does not arise, because nothing is compressed. That is a feature.
- No settled count, no percentage, no "Phase 1 complete". The six elements are the audit trail, not a score.
- One next move. Never "Cork another spark" as the primary action.
- Hard Thing Principle. One hard thing on the screen (the contrast), one focal point, one next move. Everything else goes.

---

## What already exists

- The verbatim span for every element that cleared is already stored, one per element, with the anchor verified against the answer. "Where this came from" shows data Corked already keeps, plus the full answers the history log will store.
- The return view in Pilot Plan v2 is this object shown on every visit: what you first said, what you say now, what the record holds and where each part came from, what is still open, the next question with its date. The object is that view's centrepiece, not a new artifact. It is also the Vintage Label, designed properly. v3 puts it in the sidebar, so the return view and the working view are the same surface.

---

## What it still needs before it can be designed

- The M2 Phase A fix (audit #5), so nothing on the label is an invented problem, and reopening an idea stops rewriting it.
- The history log (audit #8), so there is a dated "then" to put next to the "now". For the sidebar it has to store, per answer: the date, the question exactly as it was asked, the full answer, which lines it filled, and the exact words that went on record, uncut. Plus every restatement of the idea, with its date.
- Full spans. Stored label text is currently cut at 150 characters (test run finding 5). The object needs the whole sentence. The fix rides in the history log brief.
- Finding 1 decided before participant zero: whether only a moment that happened to the grape can settle a Vintage. Lean: yes, because v47's named pair test already lists "the recorded behaviour is not a response to the recorded occasion" as a collision. Participant zero writes the first real record, and what it writes stays written.
- A real bottle. Participant zero's own ideas, answered honestly at pace. The design is done on real content, never on the Sarah test bottle or the band bottle.

---

## The plan (as of October 2026)

1. Parking. Code built the three park leftovers. Click-through of those plus the three unchecked cases: M6 park, parking from the label's own window, text under "Not read yet" after a failed offline submit.
2. CLAUDE.md in the repo. Under 200 lines, points at v47 and the house rules.
3. M2 Phase A fix. Includes the problem block in three states: from your spark; guessed from your spark, wording confirmed; no problem on record yet, with the scene question under it.
4. History log, with the storage list above and the 150-character fix. Pacing fixes.
5. Finding 1 decided.
6. Participant zero runs two or three real ideas.
7. Object pass. Refine B2 on the real exported bottle in Claude Design, with the bubbles designed in the same pass. Every version is checked against the rules above and the Winemaster register before it goes further.
8. Hand off to Claude Code. The design goes into the repo as images at desktop and phone width, and CLAUDE.md points at it. Two rules in the brief: keep the design in the repo so later briefs follow it, and screenshot the build at both widths against the design before reporting.
9. Pilot.

This is the build order as it stands. The Object does not move earlier. Discovery earns the entry; the build order decides when it gets built.

---

## The door it opens

The competitive read left one question open: LivePlan's plan is a key that opens a lender's door, so what door does a Corked label open? Backlog, don't chase.

A candidate answer, untested: a person, not a lender. A pitch deck shows what a founder claims. The object shows what they know, how they found out, and what they haven't found out yet, in their own words. That is the thing people join on and can rarely put into words, whether they end up handling the money or the selling. It also fits the Witness file's one settled call: an outsider should see the work, not the trophy. This object shows the work by construction, because the blanks are on it.

Nothing to build for this now. When the pilot's exit conversations happen, ask one question: did anyone show their label to someone else, and what happened.

---

## Open questions

- Reveal or standing view. Settled in v3: standing, in the sidebar. Whether the cork needs a bigger moment of its own is still open.
- Where "how would you put the idea now?" gets asked. The prototype puts it at the end of a run, while waiting on a reply. It could be the return visit, or the Revise door at the end of Phase 1.
- The bottle and the record. The prototypes leave the bottle graphic out so the record has to stand on its own. One sidebar holding both, or the record replacing the bottle, is open.
- How blanks read. Information or guilt. "Saved as an assumption" is a first answer. The pilot's sag question still applies.
- Alignment on the object. Once the Evidence Line exists, the seam between belief and record (Aligned, Strained, Divergent) belongs on this surface. Not in the pilot.
- What an outsider sees. The full object, or a version with the errands stripped. Probably the full one; the blanks are the honest part.

---

## Companion idea: answers go into the bottle

*Added while testing parking, September 2026. The same problem as the Object, solved per answer instead of per visit.*

When you submit an answer, it doesn't just sit in a box under a reading. It visibly goes into the bottle in the sidebar: the words break into bubbles, drift across, and sink in. What they do there is the grade, shown instead of told. They settle into a clear layer, or they stay suspended as murk.

**Why.** The Object turns the whole record into something you can see. This does the same for one answer, at the moment you give it. It draws the link the screen currently leaves to the state pills: this answer did this to the bottle. It ends "text back and forth" at the smallest scale.

**What already exists.** The sidebar bottle already has six layers that clear as elements settle, and a thread already runs from the active element to the question. The animation joins what's there. It doesn't invent a new visual.

**Rules it must obey:**

- It shows, it doesn't cheer. No sparkle, sound or burst when something settles. A layer clearing is the whole event. The system does not celebrate and does not alarm.
- Nothing goes backward. Element state is floor-protected, so a weak answer never clouds a clear layer. It just doesn't clear anything: its bubbles hang in the murk.
- It follows the grade and never runs ahead of it. The bubbles leave when you submit and settle only when the reading comes back. On a failed grade they drift back into the box, the same as One Answer Path already keeps the text there.
- It is not a progression system. No score, streak or count, which v47 keeps on Do Not Build. It only shows the grade that already exists.
- It must not become the goal. If people start answering to make the bottle clear, the animation is teaching the rubric. That is the thing to watch.
- Short and skippable. A second or two, and it respects reduced-motion settings.

**v3 note.** With the sidebar as the record, the bubbles have a new place to land: the answer drops in and either becomes a line or stays as murk. Whether that replaces the bottle or plays inside it is the open question above.

**Open.** Does it make answering feel like it counts, or like a game? The pilot's exit conversations should ask.

**When.** Designed in the same pass as the Object, step 7 of the plan. Not before.

---

## Status

Parked, October 2026. A v48 requirement for the sidebar and the return view, with the bubbles as its companion. The history log brief takes its storage list from this file. Next time it comes up, start from this file, not from zero.
