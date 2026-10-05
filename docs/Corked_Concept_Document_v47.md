**Corked**

*Full Product Concept Document — Canonical*

*Updated: August 2026 — v47*

*This document is the single source of truth. It supersedes v46, v45, v44, the Full Concept Document v42, the Lean Concept Document v43, and the v42 Doctrine Additions file. Where any earlier document disagrees with this one, this one governs. The changelog has been removed; this is a current-state specification. Every previously open ambiguity that could be resolved by a design call has been resolved here, and the calls are listed in the Resolved In This Version section so they can be audited or reversed deliberately.*

# What Corked Is

Accumulation is how people hide from honest reckoning. Every new idea delays the last one. The pile is the graveyard. The cellar is the answer to the pile.

Corked is an idea-aging system for the solo software builder. A raw Spark enters the cellar. Corked asks honest questions at the right pace until the idea earns a clearer Label, reveals that it should be archived, or becomes strong enough to deserve serious investment. It is not an idea generator, not a productivity app, and not a coach. It is a triage environment for ideas that feel important but have not yet earned trust.

The one-sentence promise: you cork an idea, it ages, you find out whether there is something real behind it.

Corked measures resolution, not launches. A resolved idea may be built, refined, held, split, or archived. An archived idea is not a failure if it had an honest hearing. The cellar is preservation and tending, not elimination or judgment.

The core finding from live sessions, and the reframe the whole product now rests on: the Label is not a verdict. It is a task list. Every Turbid or Clearing element is a specific instruction about what to do next in the real world. The cellar is not where ideas wait. It is where builders find out what they haven't done yet.

# The Hard Thing Principle

This principle sits above UX, copy, onboarding, mechanism design, and visual hierarchy.

The only hard thing is the truth. Corked makes the right thing hard: facing whether the problem is real. It removes every other difficulty.

Operational friction is not a usability cost. It is the avoider's alibi. A user confused about what the system wants has a reason to quit that has nothing to do with their idea, and the Hider will always take it. The reaction to aim for is “that question exposed my idea,” never “what is this and why am I stuck.” Unfamiliar is allowed. Confusing is not. A legible block pinned to the idea is the product working. Bewilderment is the bug.

- Hard: naming the real person behind the idea.

- Hard: describing what that person visibly does when the problem hits.

- Hard: accepting that evidence may not support the original Line.

- Easy: knowing what the next action is.

- Easy: understanding what kind of answer the system needs.

- Easy: saving, returning, parking, and seeing what changed.

The UX standard: emotionally uncompromising, operationally simple. The interface may feel unfamiliar, but it must never make the user decode the product before receiving value.

# The Provenance Rule

This principle sits beside the Hard Thing Principle and governs what every mechanism is permitted to assert.

Corked does not determine whether grounding exists. It records what grounding has reached the bottle, preserves where it came from, and names what is still needed.

The distinction is load-bearing. “No evidence exists in the world” and “no evidence arrived in this answer” are different claims, and only the second is something Corked can observe. A builder may have watched their sister do the thing for three years and written two bad sentences about it. A system that reads those two sentences and concludes the problem is not real is making a diagnosis it has no standing to make. So the system never makes it.

- Unrecorded means not present in Corked's record. It never means does not exist.

- A system hypothesis can never settle an element, however well bounded it is.

- Every claim carries where it came from. The evidence state describes what the record holds. Two axes, never one field.

- Corked records; it does not certify.

The failure this rule exists to close, named from the live sessions: Corked cannot say nothing here. Every mechanism is built to emit something — a problem sentence, an observation, a settled count, a next action — so when the evidence is absent the system produces a well-formed substitute instead of declaring the absence. Because the substitute is fluent, the builder confirms it, and everything downstream tests against a phantom. This is the autofill failure Corked is defined against, arriving with better grammar. A product that cannot return empty cannot kill an idea; it can only pass everything forward in a plausible shape.

## The two axes

Provenance describes origin. Evidence state describes sufficiency. They are stored separately and they never collapse into one another. Field names are illustrative, not binding, but the separation is.

- provenance: user_stated (the builder said it), scene_derived (compressed from a scene the builder described), system_hypothesis (Corked inferred it from bounded parse material).

- evidence_state: Resolved, Unresolved, Insufficient, Conflicted. Defined once, in The End of Phase 1, and used identically wherever they appear.

- anchors: the verbatim spans supporting the claim, verified server-side, per the existing anchoring rule.

- user_status: proposed or confirmed. A separate axis again, because a builder agreeing with a wording is not the same event as evidence supporting it.

## The Confirm Rule

Confirm may update the User Line, because that records belief. Confirm may never upgrade the Evidence Line, because that records evidence.

Clicking confirm establishes exactly one thing: the builder agrees with this wording. It does not establish that anything in the world supports it. Any mechanism that converts a confirmation into evidence has laundered a system hypothesis into a finding and destroyed the record of where it came from. Provenance survives the click; the evidence state does not move on it.

This rule is the same rule the Evidence Line already needed, arriving one mechanism earlier. It applies at M2 Phase A, at every reconciliation door, and at every future surface where the builder is asked to accept something Corked wrote.

# ICP and Scope

Corked's ICP is locked to the solo software builder. This is DNA, not positioning. Corked ages one kind of idea: a software product a solo builder could build themselves. Non-software ideas are out of scope by design and are turned away at the Scope Gate in M0 (see Intake). This document says “builder” throughout; wherever an older document says “founder,” read “solo software builder.”

The Hider is the ICP and the product's primary attack surface. The documented evasion repertoire: retreating to upstream doctrine, shiny new ideas, research, technical fluency in place of human evidence, and operational confusion as an exit. Every mechanism in this document is designed against one or more of these.

# Core Objects

- Spark — the raw input. A builder-held hunch before it has earned evidence, shape, or external coherence. Permanent, never overwritten.

- User Line — what the builder currently believes the idea is. Authored by the builder, updated only when the builder actively revises it. M0 produces v1; v1 is recorded on the Vintage Label permanently.

- Evidence Line — the system's one-sentence paraphrase of what the evidence literally describes. Authored by the system, constrained by compress-may-not-upgrade: it may describe the evidence, it may not prescribe the idea. Produced only in the Resolved state; the other three states produce a refusal, not a sentence.

- Claim — any statement Corked holds about the idea that it did not receive verbatim: the recovered problem, the Evidence Line, an element's label text. A claim is never a bare string. It carries its text, its provenance, its anchors, and the builder's status on it. See The Provenance Rule.

- Label — the bottle's visible record. Begins at intake, fills progressively. Observation adds evidence (the Vintage Label). Definition adds shape (the Tasting Notes). Judgment adds outcome.

- Settled Label — the earned final record. Same format whether the idea lived, changed, stalled, or died.

The transformation: Spark → Label → Settled Label. Not every Spark gets there. The Label still records the honest state the idea reached at the point it left the rack.

# The Cellar

The cellar is the product memory. It makes idea state visible without requiring the user to read doctrine. Three sections.

- The Active Rack — ideas currently aging. Questions are arriving. Bottles show pace, movement, unresolved sediment, and Line alignment.

- The Trophy Shelf — ideas that became something and are finished. The bottle is empty, the record remains, the three-sentence Idea Timeline is readable.

- The Archive — ideas that had a hearing and no longer deserve active space. The label remains permanent and readable. Archive is resolution, not shame. User-initiated, always.

The three-section structure removes the need for a kill mechanic. The system never announces that an idea failed. The builder decides where it belongs.

## Visual demurrage — the three-clock rule (resolved)

Demurrage measures builder inaction only. A bottle is never punished for world latency. Three clocks, one per bottle state:

- Active — the bottle is waiting on an answer the builder could give now. The demurrage clock runs against the declared pace. A weekly bottle untouched for four weeks visibly sags.

- Dormant — the bottle is waiting on the builder to go make real-world contact. It carries a standing brief (a field question). The bottle does not sag; it reads as parked, brief visible. The rhythm returns it with the brief at the declared cadence. Dormant means waiting on you — distinct from stalled and distinct from aging.

- In flight — the builder has taken the field question out and asked it. The question is live in the world; the reply has not come back. The demurrage clock is paused entirely. The bottle reads “asked, waiting on a person.” A builder who did exactly what the mechanism wanted must never look stalled for it.

When an Active bottle has been visibly stalled — behind pace with unresolved Turbid elements — the Winemaster surfaces one observation: this bottle has not moved. Two options: do the work, or archive. No third option. Dormant and in-flight bottles never receive this observation.

## Alignment on the bottle

Independent of fill state, every bottle carries a second visual signal: how well the User Line matches the evidence. Aligned reads as one piece. Strained shows a visible seam between label and bottle. Divergent shows the label unseated. The system says nothing. The bottle carries the contradiction. Aligned, strained, and divergent must be readable before the record is opened.

## The Idea Timeline

Every completed idea has three sentences, one per phase, written in the past tense once each phase closes: what the problem turned out to be, what the idea became, what happened. Same format and tone whether the idea made it or not. This is the most shareable artifact Corked produces.

# The System Voice

The system does not react. It notes and moves. A lab result, not a pep talk. When a question produces a significant answer the system does not celebrate; when an answer reveals a problem it does not alarm. It observes, records, adjusts.

After each answer, one factual observation about where the idea now stands. Observations must be anchored to the answer's content — if the observation cannot point to a specific word or phrase the user actually wrote, it is fabricated. Findings carry the supporting span verbatim, verified server-side; if no span supports a claim, the anchor is null and the finding still stands. The observation reports the finding. It never narrates its own inference or explains its reasoning. The dent carries the implication.

A mechanism that cannot produce a devastating answer is not triage — it is therapy. The monotone voice keeps that honest.

## The Substitution Rule

The solo builder's most fluent evasion is technical. Asked about the person, the moment, or their words, the builder answers with the stack, the architecture, the feature list — a complete answer to a question that was not asked.

When it happens, the observation names the substitution and nothing more: what the builder described (the build) and what the question asked for (the named person, the filmed moment, the words someone other than the builder actually said). The element does not move. A bottle does not clear on technical fluency. The Winemaster may report the swap; it may not interpret it. No named avoidance, fear, or habit. This rule guards every human-evidence element, the Echo and the Vintage most of all. The codebase is never evidence the problem is real.

Standing design rule: if a sentence sounds like a startup framework, rewrite it until it sounds like a place. Applies to questions, labels, briefs, onboarding copy, and observations equally.

## The Winemaster

The system voice made physical. An illustrated sommelier presence — a glyph more than a character. Does not smile, does not react. Warmth comes from precision, pacing, and clarity, never expression. Current state: placeholder circle; first appearance at intake step 1 only (“Every bottle starts here. Tell me what you brought.”). Additional appearances are defined where this document names them — the stalled-bottle observation, the transition signal, the Connection Check, the market existence check — and nowhere else without a doctrine entry.

# The Grape

The grape is the real person named at the cork. It settles at intake on two things: a name and a stated real relationship to the builder. Not a persona — a persona is a composite built after research; the grape is the raw material research draws from. One specific person who actually has the problem, who can be talked to, who will say something unexpected.

M1 is the cork-side recap that puts the settled grape on record before Phase 1 opens. M1 does not extract behaviour; the observed scene belongs to M2. The relationship gate is the composite-grape defense: a stated tie that names a group rather than a person (“freelancers I know”) reads as Turbid. A sour grape is a finding, not a failure. The Vintage Label records the grape permanently.

# The Line, the Evidence Line, and Reconciliation

Corked does not rewrite the builder's idea. It surfaces when the User Line and the evidence no longer describe the same thing, then asks the builder to reconcile the difference. A kept Line is allowed, but it leaves a visible trace.

## Compress-may-not-upgrade

The Evidence Line may describe the evidence. It may not prescribe the idea. Allowed: “the evidence describes repeated bank-checking near month-end after delayed retainers.” Not allowed: “the opportunity is an early-warning payment-risk tool,” or any product-shaped claim, scope judgment, or strategic synthesis. A candidate Evidence Line that slips registers is rewritten or marked as a failure state.

Four Evidence Line states: Resolved, Unresolved, Insufficient, Conflicted. They are defined once, in The End of Phase 1, and mean the same thing everywhere they appear, including at M2 Phase A. A failed Evidence Line is a finding about the evidence, carried visibly on the bottle like a Turbid element. Three of the four states are refusals, and that is the point: the refusal states are the place where the system's inability to write a sentence becomes visible instead of being papered over with one.

## The five reconciliation outcomes

The doors are the response to a Resolved Evidence Line. You cannot reconcile a belief against a sentence that does not exist, so the reconciliation surface only opens once the record supports one. Insufficient, Unresolved, and Conflicted route elsewhere (see The End of Phase 1).

Every door is subject to the Confirm Rule. Revise and Keep move the User Line and nothing else. No door moves the evidence state.

- Revise — the User Line changes, optionally starting from the Evidence Line as a draft.

- Keep — the Line stays despite evidence pointing elsewhere. Allowed; creates alignment tension.

- Split — the Spark contained two ideas. A second User Line and bottle are created.

- Hold — no Line decision yet; the evidence is marked not yet sufficient to force one.

- Archive — the discrepancy is the moment the idea retires, carrying the unreconciled state in its record.

## The Hold ceiling (resolved)

Hold once per element while evidence is thin: neutral. A second Hold on the same element: that element is marked unresolved sediment, visible on the bottle. Any Hold issued after new evidence has arrived on that element: the bottle moves to Strained. Three or more elements simultaneously carrying a Hold: the bottle reads stalled on the rack. Deferral is legitimate; invisible deferral is not.

## Alignment thresholds

Aligned: the User Line and Evidence Line describe the same problem at roughly the same scope. Strained: one unresolved mismatch, or the Line Kept once against evidence pointing elsewhere. Divergent: the same mismatch Kept twice, or the User Line directly contradicting a Settled element. A Settled element is evidence the system has already accepted as load-bearing; contradicting it is the moment Strained becomes Divergent.

## Phase 2 entry under unreconciled state (resolved)

The cork locks the Vintage Label permanently. A label corked while contradicting the Line would bake a lie into a permanent record. The rule: a bottle may cork while Aligned or Strained. A bottle may not cork while Divergent, or while a reconciliation prompt is pending unanswered. Because one Keep produces Strained and the second produces Divergent, the builder may carry exactly one standing disagreement through the cork — it travels visibly as tension on the bottle. Two is a contradiction the cellar refuses to seal. A Divergent bottle reaches the cork only through Revise, Split, or Archive. User authority is preserved; permanent dishonesty is not.

# The Vintage Label — Six Elements

The Vintage Label is the Observation layer of the Label — the structured evidence behind the Evidence Line. It records the User Line v1 permanently; the contrast between v1 and what settled is part of the idea's biography. Six elements, mechanically sourced. The label is not a form to fill in — it is what the aging process leaves behind.

- Grape — the person who has it. Named at the cork on a name plus a stated relationship; permanent.

- The Tell — what they visibly do because of it. Observable behaviour, not inferred feeling. Sourced from M2 and M6.

- Vintage — the exact moment it happens. The precise scene, not a general context. Sourced from M2, and opportunistically from M3.

- The Gap — what the existing solution fails to do. Sourced from M5, and from M2 when gap_in_play fired in Phase A.

- The Echo — confirmation from outside. The problem repeating through someone with no stake in the idea. Cannot be manufactured. Sourced from M3 (primary), M4 when fired, M6, and the grape nudge.

- The Limit — where the problem stops. Who should have it but doesn't, and why. Sourced from M7.

Seven mechanisms, six elements, because the Tell and the Echo are each built from two sides. Corroboration, not redundancy.

## Element clearing bars

Each element has three states. Turbid: absent or too vague to read. Clearing: exists but contains inference rather than evidence — the most dangerous state, because it can feel done. Settled: meets its specific bar.

- Grape — Settled: named individual AND stated real relationship (“my sister Sarah,” “Tom the café owner downstairs”). Clearing: a name without a tie, or a tie without a name. Turbid: a category with a name pinned on it (“freelancers I know”).

- The Tell — must be filmable. “Gets frustrated” is Clearing. “Refreshes the page three times and closes the tab” is Settled.

- Vintage — must be one specific past moment. “Whenever she needs to…” is Clearing. “The Tuesday the invoice bounced” is Settled.

- The Gap — must name an existing solution AND its precise failure point. One without the other is Clearing.

- The Echo — must come from a source that is not the builder's interpretation. Settled requires one identifiable separate person doing or saying one concrete thing. The category rule: a category of known sufferers, with or without a named workaround (“lots of freelancers I know,” “freelancers I know use spreadsheets”), is Clearing, never Settled. The builder's inference is Turbid.

- The Limit — must name who this does not affect and why. Vague exclusion is Clearing; a named, specific boundary is Settled.

## The unearnable elements, and the doctrine of the uncorked bottle

Four elements can settle through honest answering alone. Two cannot. The Vintage requires a witnessed or recounted real moment. The Echo requires a source outside the builder's head. When these stay open, the system is not failing — it is issuing an errand. This is Corked's actual job: not scoring answers, but directing action.

Consequence, stated as doctrine because the live sessions proved it: the expected median state of a real bottle is uncorked, holding at four or five elements with the Echo as an open errand. That is the product working, not a funnel leak. A bottle answered entirely from memory gets a record of what is missing — never a verdict. Verdicts are unearnable without the unforgeable Echo. Absence of closure, not penalty, is what dissolves the Hider's hiding place.

## The element confirmation mechanic

If any element is Clearing or Turbid when the rest of the picture has settled, the cork does not go in. The label appears with the flagged elements shown in amber. Tapping a flagged element surfaces exactly one thing: the single question that resolves it — answerable now if the builder has the evidence, or carried out as a field brief if they don't. The label is the gate, not the mechanism. When the cork doesn't go in, the system doesn't explain or lecture. It waits. Corked never says the idea is bad; it says the work hasn't been done yet.

## Reopening an element

The element confirmation mechanic above is the cork-gate form: it fires when the rest of the picture has settled and one element is still amber, and it surfaces the single sharper question that resolves that element. A simpler form is available throughout Phase 1, not only at the cork. Any element that is Turbid or Clearing can be reopened from the label and answered again. The reopen reuses the source mechanism's own question and its own grading; it does not generate a new one. Element state is floor-protected — a state can only rank up, never down — so a weaker second answer cannot ratchet an element backward. The only outcomes are rank-up or no change. The reopen carries no coaching: the question stays the same question, the rubric is never shown, and a builder with a better real instance can give it while a builder without one is left exactly where they were. The resolving question — the sharper one that names what this specific element is still missing — belongs to the cork-gate form, not the reopen.

# The Three Exits and the Question Layer

Every Phase 1 mechanism that needs real-world contact — M2, M3, M5, M6, M7 — offers the builder three exits, not two.

- Answer now — the builder has the evidence in hand: witnessed it, was told it, or lived it. The mechanism grades the answer.

- Park it (Dormant) — the builder does not have the evidence and has not gone to get it. The bottle parks with a standing brief: the field question. It returns on the rhythm carrying the question to go ask.

- In flight — the builder has taken the field question out and asked it. The reply has not come back. The bottle holds “asked, waiting on a person” and re-enters the loop when the reply arrives.

The three states exist so the cellar never punishes the builder for doing the right thing. A parked or in-flight element is an element waiting for real-world substance, not a verdict against the idea.

## In flight is a label, not a tracking system (resolved)

When an in-flight question is answered in the world, the reply comes back as a fresh answer the builder enters in their own words or the person's. The mechanism grades it exactly as it grades any answer. Corked does not store the sent question as an object with a pending reply, does not match replies to questions, and does not grade the reply against the question text. In flight changes the bottle's visual state and pauses demurrage; it changes nothing about grading. This stays true until real usage produces evidence that builders lose track of what they asked — only that evidence reopens the fork.

## The two questions

Corked produces two different questions. The in-app question is what the Winemaster asks the builder inside the cellar — generated per mechanism, framed by maturity, assembled per maturity_class without a model call. The field question is what the builder carries out of the cellar to ask a real person — the question Corked generates because it understood the Spark. It is never generic; it is built from the confirmed problem, the relevant person, and the domain, with a model call made at park time only. A generic field question (“ask them about their workflow”) is a failure: it exposes that Corked did not grasp the Spark.

The field question is shaped by The Mom Test. Three rules: it asks about the person's own life and what they have already done, never about the idea. It asks for specific things that already happened, never opinions or what someone would do. It stays open enough that the person, not the builder, supplies the words. A field question that names the solution, asks whether someone would use a thing, or asks whether an idea is good is poisoned — it manufactures a false yes. The generator must never produce one.

Problem-source rule: the field question's problem is always the problem confirmed at M2, never M0's nullable suspected_problem. Because the earliest field question any mechanism can emit is M2's own, and M2 Phase A recovers the problem before that point, the confirmed problem is always present at generation time. M0 is sufficient as it stands; no new intake field is required.

## The two brief types

- FIND — no grape exists yet. Built from the Spark alone; fires at intake. On re-entry, maturity resets to 1 (talked, not observed) before the mechanism re-runs, because finding a person is not the same as having observed them.

- ASK — a grape exists but the evidence is missing. Built from the confirmed M2 problem; fires at M2 or any later mechanism's park.

## The rhythm gate

The pace declared at intake is a real gate, not decoration. A dormant or rested bottle returns its question at the declared cadence (nextQuestionAt is computed and enforced). The wait duration is a configuration constant, defaulted near zero during testing. Push and email delivery are deferred; the gate logic is not.

## Why the park path is load-bearing

Single-session Corked without the park path is a relief machine for avoidance — it lets the Hider feel reckoned-with from memory. The park path closes this by making real-world evidence the only path to a verdict. The park button is the behavioural education: it teaches through consequence (absence of closure), not instruction. The rubric is never taught explicitly — an explained rubric lets answers be manufactured from memory, which undermines the verification mechanism itself. Verification anticipation does the work.

## The inline errand

A correct finding that dead-ends is a Hard Thing Principle failure. When an element grades Turbid or Clearing and reads as a verdict with no visible next step, the builder gets “what now,” not “that exposed my idea.” The fix is doctrine, not decoration: when an element grades Turbid or Clearing for a real-world reason — the Echo with no third party, the Vintage with no moment, the Gap with no named tool — the field brief for that element is surfaced inline, directly beneath the observation, before the builder acts. The finding and the errand render as one unit: what is missing, then what to go get. The park exit stops being the only door to the errand. The errand is already on the screen, and the park action becomes the builder confirming they are going, not the reveal.

Three constraints, or the inline errand erases the line between Corked and the autofill tools it is defined against.

- It fires only when the turbidity is real-world-shaped. Not when the answer was a substitution (stack or architecture in place of a person) and not when the answer was empty. Those need re-answering, not an errand, and the grade already distinguishes them.

- It is the field brief, not a rubric hint. “Go find someone who is not the grape and ask what they have done about it,” never “Settled requires one identifiable person doing one concrete thing.” The field generator already obeys the no-pitch Mom Test rule and points at the world, not the bar. Surface that output verbatim; never write a helper that explains what would settle the element.

- It is singular. One element, one brief. A list of open errands is not a Phase 1 state: park is a bottle-level state carrying one brief, so a bottle inside the chain is never showing several errands at once. The simultaneous-amber case is the cork gate (the element confirmation mechanic), which is a separate surface.

The swirl, the reopen, and the inline errand are three distinct things and must not be fused. The swirl presses a thin first answer for more in the same sitting, when there may still be material in the builder's head. The reopen lets a builder return to an amber element later and answer it again through the same mechanism. The inline errand surfaces the field brief at the moment the honest next step is real-world contact the builder does not have. Same instinct — a weak element should be improvable — but three different moments and three different responses. Fusing them either sends the swirl out the door (it is a same-sitting beat) or lets the field question be answered from memory (the manufactured-answer hole the whole park path exists to close).

# The End of Phase 1

The ending is not a scorecard. It is a handoff, and it answers four questions in order: what did the builder believe, what can Corked honestly write from the record, do those two agree, and what happens to this bottle now.

The surface being replaced fails independently of any one session. It announces “Phase 1 Complete,” reports “3 of 6 elements settled,” calls the bottle unfinished, and makes “Cork another spark” the primary action. Three of six with the Echo open is the documented expected median bottle — the product working — and the screen reports it as a shortfall. Then, at the exact moment the builder learns their Echo is empty, the primary action invites them to start a different idea. Accumulation is the thing Corked exists to interrupt. The count and the button are both anti-doctrine.

## The five surfaces

- User Line — what the builder currently believes the idea is.

- Evidence Line — what the recorded material supports, or a refusal.

- Evidence state — Resolved, Unresolved, Insufficient, or Conflicted.

- Alignment — whether a Resolved Evidence Line agrees with the User Line.

- Next move — one action for this bottle.

The six elements remain underneath as the audit trail. The settled count leaves the verdict position entirely: six independently graded elements are not meaningfully a percentage, and presenting them as one invites the builder to read a working bottle as a failing one.

## The four evidence states

These are the canonical definitions. They describe the record, never the builder's life, per The Provenance Rule.

- Resolved — enough compatible material exists to write one stable Evidence Line.

- Unresolved — relevant material exists, but something specific remains open.

- Insufficient — the record does not yet contain enough material to write a line honestly.

- Conflicted — recorded material supports incompatible readings.

Only Resolved produces a declarative Evidence Line. The other three produce a refusal, the precise reason for it, and the outstanding errand. “No problem is recorded yet” belongs here as an Insufficient result; it is not itself an Evidence Line.

## The refusal thresholds

The four states above are definitions. This is the test for which one a record is in. It was v46's blocking open question; it is closed here.

### The provenance filter

Runs before any state test. It is The Confirm Rule executed at the ending, not a new rule: a system hypothesis may never enter the Evidence Line as evidence, however many mechanisms tested against it downstream.

The filter reads the chain, not the per-claim tag. Tag-reading fails: when M2 recovers a problem by inference, every answer after it was typed by the builder in response to a question framed on that guess, so those answers carry user_stated on their face. Stripping the parent and grading the children passes exactly the laundered record the filter exists to catch, because the children restate the parent.

- If the problem's provenance is system_hypothesis, the record is Insufficient unless the spine has been re-grounded.

- Re-grounding: the Tell and the Vintage both reach Settled on content the hypothesis could not have contained.

No taint propagation and no new storage are required, because the element bars already discriminate. A bounded hypothesis is built only from nouns the parse held — a solution form, an implied person, a domain. It carries no occasion and no observable action, so it cannot produce a Settled Vintage, which requires one specific past moment, or a Settled Tell, which requires filmable behaviour. A builder restating the hypothesis in fresh words grades Clearing at best on both; that is what restatement grades as. A builder who names what someone did on a particular day has supplied information the hypothesis never held, and a badly framed question does not unmake that.

This also spares the builder with real material and poor language — the residue logged under Open Questions. Their scene settles the spine and the record stands, however clumsily the problem was recovered.

### The spine

Three elements decide the state: the Grape, the Tell, and the Vintage. A descriptive sentence needs a person, an observable action, and an occasion. This is deliberately the smaller claim — it is a claim about what makes a sentence writable, never a claim that these three facts matter most.

The Gap, the Echo, and the Limit cannot raise the state and can lower it, because non-spine content can produce a named pair collision. Veto is a form of deciding, and the doctrine should not claim otherwise.

The asymmetry between the two unearnable elements is deliberate and is argued rather than assumed. The Vintage is unearnable from nothing but earnable from the builder's own memory of something real — a moment the grape recounts counts as much as one the builder watched. The Echo is unearnable from the builder at all: it requires a person not yet in the record, who cannot be produced by better recall. Only the second is structurally unobtainable in a sitting, and only the second would make Resolved unreachable for the median bottle if it gated the sentence.

Consequence, recorded because it settles a previously open question: the Echo does not gate the sentence, it holds the cork, and it owns the errand.

One honest limit. The Grape settles at intake, so the spine gate is carried in practice by the Tell and the Vintage. The Grape gate is low-frequency rather than decorative — a category with a name pinned on it grades Turbid and the record genuinely holds no person — but it rarely fires.

### The procedure

Run in order. First match wins.

- Insufficient — any spine element Turbid, or no surviving spine material, or a system_hypothesis problem that was not re-grounded.

- Conflicted — a named pair collision.

- Unresolved — all three spine elements at least Clearing, at least one Clearing rather than Settled.

- Resolved — all three spine elements Settled, no collision.

### The named pair test

Conflicted fires only when two specific recorded items can both be cited and the collision stated in one clause. If both sides cannot be named, it is not Conflicted. The constraint exists because Conflicted is the state most likely to rot into a bin for anything that reads as incoherent, and a vague sense of incoherence is not a finding.

Both sides must be real material; a collision between a guess and real material is not a conflict, because the guess did not survive the filter. The collisions Phase 1 actually produces: the recorded behaviour is not a response to the recorded occasion; the Limit names a non-sufferer whose description fits the Grape; the Echo describes a different problem from the spine; two recorded occasions describe incompatible behaviour by the same person.

Conflicted outranks Resolved and Unresolved and loses to Insufficient. Two things that say nothing cannot contradict each other.

### Substitution

A spine element weak because the builder described a stack, an architecture, or a feature list contains no content about the person, so it grades Turbid, and Turbid on a spine element is Insufficient. The next move is the same question again — not the scene request and not a field brief. Sending a builder to interview a stranger because they described their database compounds the evasion rather than naming it.

## The four routes, and how they meet the five doors

Evidence state and reconciliation answer different questions and run in sequence, not in competition. Evidence state answers is the record sufficient. Reconciliation answers does your belief match it. A belief cannot be reconciled against a sentence that does not exist.

The routes must differ by action, not only by wording. Two refusal states that produce the same next move are one state with two names, and the register that distinguishes them is not a mechanism.

- Insufficient → the scene request, in-app. There is no story yet, so the next move is not a stranger; it is describe what happened — what the person was trying to do, and where it stopped working. Answerable tonight if the builder has material, and it is the same scene elicitation M2 Phase A uses. It becomes a field trip only when the builder discovers they cannot answer it. Or let the bottle rest.

- Unresolved → the field brief, out of the app. There is a story and one nameable piece is missing. The brief is surfaced verbatim and points at the world. Or let it rest.

- Conflicted → the contradiction, in-app. Both items are cited and the builder resolves which is true. No field trip. Or let it rest.

- Resolved → the Evidence Line, then the outstanding errand, then the alignment question and the five reconciliation doors (Revise, Keep, Split, Hold, Archive) under the existing alignment rules.

Resolved is not the end of the screen. Evidence state answers whether a sentence can be written; it does not answer whether anything is still open. A settled spine with a Turbid Echo produces a true sentence and a bottle that has not met one real person, and sending that bottle straight to the doors hands the documented median outcome a sentence and nothing to do — the surface built for that bottle failing it at the moment it arrives.

Resolved therefore carries one errand whenever any element is Turbid or Clearing for a real-world reason. Singular, per the inline errand rule. Priority order: the Echo, then the Vintage, then the Gap, then the Limit. When every element is Settled, the next move is the cork. This is not new machinery — the ending's five surfaces already include one next move; this is the Resolved route wired into it.

This is also where the Connection Check lands, without a second screen.

“Let it rest” is the existing park path — dormant or in flight, with its standing brief and its clock. No new state. “Cork another spark” returns to the cellar as a secondary action; it is never the ending's primary move.

## Phase 2 requires a Resolved Evidence Line

Phase 1 may legitimately end in any of the four states. Completing Phase 1 does not mean progressing to Phase 2. Only Resolved opens the crossing.

This preserves failure and waiting as real outcomes without turning “six settled” into an arbitrary gate, and it is the same principle as the cork rule one level up: an honest ending is always available, but coasting cannot buy passage out of Phase 1.

## What the ending exposes

Two of the three kinds of coasting are caught here, and the third was already conceded.

- Thin coasting is caught by the refusal states. Corked cannot write a sentence, says so plainly, and names what is missing. There is no count to misread as partial credit.

- Hollow coasting is caught by the Evidence Line itself, which is a mirror rather than a judgment. It is a paraphrase of the builder's own material under compress-may-not-upgrade, sitting directly beneath the User Line, which is the confident version. A hollow answer reads back as hollow. Nobody has to say the answers were thin. The dent carries the implication.

- Confident fabrication is not caught. A builder who invents a person with a filmable tell and a quoted sentence earns a Resolved Evidence Line. Corked records, it does not certify. This is tolerable because inventing detailed evidence about a fake person is reckoning-shaped effort, and the Hider's documented repertoire is avoidance, not fabrication.

## The provenance line (proposed, not yet resolved)

Every element is graded alone, so a bottle whose six answers all came out of the builder's own head currently looks identical to one built from three real conversations. The proposal is one factual line at the ending reporting the shape of the record, rolled up from the provenance already travelling with each claim. Flat register, no scolding, no advice: for example, “Every line on this label came from you. Nothing here came from outside your head.” A builder who did the work never sees it. Held pending the audit of whether provenance is actually stored per element today.

# Phase Transition — When Phase 1 Ends

Premature closure is the dominant failure mode: people move too early, not too late, and those who have gathered the least are the most confident they have enough. The transition is therefore not user-initiated alone. Phase 2 becomes available when the system detects three conditions; the system surfaces availability; the builder decides when to cross.

- Structural completeness — all six elements have been addressed by their source mechanisms.

- Representational stability — two consecutive answers produce no movement in any of the six elements. Two, not “two or three.” If an element moves, the count resets for that picture.

- Sufficient specificity — every element meets its per-element clearing bar. All six Settled. One Clearing element holds the bottle (see the element confirmation mechanic).

## The Connection Check (new, from the Bas session)

Phase 1 can validate a problem the intake idea does not touch. When the transition signal fires, the Winemaster surfaces the User Line beside the Evidence Line and asks one question: does your idea still describe a response to the problem the evidence settled on? This is a check, not a verdict. The answer routes into the existing reconciliation outcomes — Revise, Keep, Split, Hold, Archive — under the existing alignment rules. No new machinery; the existing five doors are the response surface. The check fires exactly once, at the transition signal.

## The market existence check

Corked does not search for existing solutions; external signal aggregation is not its job. M5 surfaces incumbents through the builder's own answers. At exactly two checkpoints — end of Phase 1 before the cork goes in, and end of Phase 2 before The Pour — the Winemaster asks one question: does anything already do exactly this, for exactly this person, at exactly this moment? Not a gate, not a search. If the answer changes the Gap or The Pour, the cork or The Pour waits. If not, it confirms the finding is real.

## The cork

When all six elements are Settled, stability holds, the Connection Check is answered, and the bottle is not Divergent, the cork can go in. The builder seals it; the Vintage Label locks permanently; nothing more can be added. The cork is the only door into Phase 2. Phase 1 fills the bottle (murky, accumulating). Phase 2 settles it (sediment drops, the label becomes readable through the wine).

## Wrong-stable foundations

Some pictures will pass all three conditions and still be wrong. M7 is the primary protection — designed to crack a picture settled on a problem nobody actually experiences. Cross-element consistency is the secondary signal: the system notes when fields do not hold together, without delivering a verdict. What still slips through is caught by Phase 2 itself — if Phase 1 settled falsely, M8 cannot narrow operationally, and that failure is visible immediately. The cascade catching it one phase late is the system working.

# The Three Phases

- Phase 1 — Observation. Is there a real problem outside the builder's head? Output: the Vintage Label. The deeper job is alignment — producing an Evidence Line and forcing reconciliation against the User Line. Corrects false consensus.

- Phase 2 — Definition. What should this idea actually become? Output: the Tasting Notes and The Pour. Phase 1 extracts observations from the world; Phase 2 forces the builder to commit to one version of what Phase 1 surfaced. Compression, felt by design. Corrects premature solution design.

- Phase 3 — Judgment. Is this worth serious investment? Output: the Settled Label and one of four outcomes — build, refine, hold, archive. Corrects the IKEA effect and false readiness. An idea that re-corks at Phase 3 is a successful outcome.

# Intake — Corking an Idea

Designed to take 60 seconds or less. The first session must prove Corked before it explains Corked: bottle a Spark, see the compressed Line, name the grape, hit one exposing question. Vocabulary after experience — the user can feel murky, clearing, settled before being asked to learn the words. What is never asked upfront: business model, market size, competitive analysis, monetisation. Graveyard energy.

## Input 1 — the idea

One sentence — what it is, not why it is good. Vague is fine. M0 fires on submission.

## Input 2 — maturity classification

Determines how Phase 1 speaks — not which mechanisms fire, but the door into each. Branching, not a flat list: Have you spoken to a real person who has this problem? If yes: can you name them, and have you witnessed or heard them experience it firsthand? If no: are you the person with this problem yourself? The resulting maturity_class: 0 observed firsthand, 1 talked but not observed, 2 self as grape, 3 nobody yet. Extraction framing for those with material; direction framing for those without. The flat four-option self-report in the current prototype is a known divergence from this spec and is scheduled work, not doctrine.

## Input 3 — how far along

Four options (just crossed my mind / keeps coming back / thinking seriously / already started). Not a stage selector. Changes the first question's wording and records one honest line on the label about where the idea was when it arrived.

## Input 4 — pace

Daily, every couple of days, weekly, monthly — each described as a concrete scenario. Sets the demurrage stall threshold and the rhythm gate cadence. The rack reads pace-relative, never calendar-absolute.

## Input 5 — notification timing

Which part of the day the builder thinks most clearly about this kind of thing. Questions are delivered then.

## The cork-side grape step

After M0, the builder names the grape: a name and a stated real relationship, graded by the worker (the relationship gate). “Freelancers I know” goes Turbid. The framing M0 produces for this step obeys compress-may-not-upgrade: when the Spark stated no problem, the example prompts for what the grape was trying to do and what happened are left blank — server-enforced nulls — so the builder is never handed a hypothesis to confirm.

# M0 — Spark Bottling

M0 receives the raw Spark and produces the User Line v1 and a digestibility verdict. It runs once per Spark, before Phase 1.

Compress-without-upgrade, the load-bearing rule: M0 may restructure and may generalise a single named person to a class (M1 recovers the specific person). It may not replace colloquial language with operationalised synonyms (“annoying with payments” stays exactly that), may not introduce nouns the user did not use (“books” never becomes “literacy”), and may not add a problem, domain, situation, or attribute the user did not state. If the user was vague, the User Line is vague. The vagueness is downstream material, not M0's to resolve.

The spark parse (solution_form, implied_person, suspected_problem, triggering_situation, promised_change, domain) is internal scaffolding. Any field not stated or structurally implied is null. Filling fields to be helpful is the failure mode. When suspected_problem is null, the happened and trying placeholders for the grape step are nulled server-side.

## The Scope Gate

Runs at M0 before the digestibility verdict, reading solution_form. Explicitly non-software Sparks (a bakery, a clothing line, a physical product, a service business) are turned away plainly — no verdict, no re-spark loop, fit not quality. Software, ambiguous, or solution-absent Sparks pass; problem-first Sparks explicitly pass. The gate is asymmetric on purpose, the only place an idea is turned away rather than aged, and the last place technical form is ever weighed.

## Digestibility

- Digestible — implied person and stated problem both present. Enters the cellar; grape step takes extraction framing.

- Thin — scaffolding with missing pieces; thing-shaped Sparks (population plus mechanism, no stated problem) are thin. The builder may re-spark or bottle as is; if bottled, direction framing.

- Unusable — no person, problem, domain, or situation. Does not enter the cellar. Re-spark is a deliberate user action; no retry counter, no pressure.

M0 is held against a 17-spark regression suite. Any doctrine change to M0 runs the full suite before deployment.

# The Mechanism Bank

A mechanism defines what a question should do — what bias it corrects, what it extracts, what gap it closes. The system applies the mechanism to the specific idea and generates the question from the bottle's material. There are no generic question banks. The mechanism is the question. Phase 1 mechanisms are fixed for everyone; maturity changes only the door.

- One question per delivery. Never two.

- Questions must produce long, unexpected answers. A yes/no question is a bad question.

- Vagueness must feel visibly incomplete to the person answering — structurally, not flagged. “Name one specific person” cannot be answered vaguely.

- Every phase includes at least one mechanism designed to kill the idea.

- Each mechanism asks one main question; a thin answer gets one follow-up before moving on. The label catches what stays weak. Two swirl types: ownership (who actually owns the problem) and reality (is this person real or constructed).

- Skipping a question changes nothing. The idea keeps aging.

The Grape Nudge: between M3 and M6, the system surfaces the grape by name — “Your grape is [name]. M6 will ask for their exact words. A conversation before then makes that question real rather than reconstructed.” Not a gate. M6 fires on real language or flagged reconstruction.

# Phase 1 Mechanisms

## M1 — The Grape (cork-side recap)

Not an aging question. Settles the grape at the cork from name plus relationship and carries that person into Phase 1 on record. Extracts no behaviour.

## M2 — The Friction Test

The first aging question. Two phases.

Phase A — problem recovery. M2 reads the User Line and the spark parse and produces one of three outcomes. It is not required to produce a problem sentence; it is required to report accurately what the record holds.

- Stated. The Spark stated a problem. It is used directly, unrewritten. Provenance is user_stated. The friction question shows immediately.

- Bounded inference. The Spark was solution-language, but the parse holds enough bounded material — a solution form, an implied person, a domain — to form a working hypothesis using only nouns the parse contains. The recovered problem is shown for confirmation or edit. Provenance is system_hypothesis and stays system_hypothesis after the click. The builder owns the wording the rest of M2 tests against; the builder does not thereby own evidence for it.

- Insufficient. The parse is too thin to form a hypothesis without inventing material. M2 does not write a sentence. It reports that no problem is recorded and asks for the scene instead: what happened, what the grape was trying to do, and where it stopped working. Provenance on anything recovered from that answer is scene_derived.

The scene route is the answer to the builder who has real material and poor language. Someone who has watched the thing happen can usually supply fragments of a scene even when they cannot state a problem; Corked compresses those fragments into a candidate anchored to their actual words. Someone with nothing stays general, the answer grades thin, and the existing sequence handles it: scene, one swirl, then the field errand. Corked never has to diagnose which kind of builder it is talking to, and that is precisely why the route is a change of question rather than a menu of self-reported options. A menu is the Hider's exit before the attempt.

Two hard constraints, both inherited from The Provenance Rule.

- A system hypothesis never settles an element. It may frame a question. It may not appear on the label as a finding, and it may not enter the Evidence Line as evidence.

- Confirmation is not evidence. The confirm click may update the wording the builder owns. It may not raise the evidence state on the recovered problem, and it may not strip provenance. Every mechanism downstream — M3 through M7, the field generator, the Evidence Line — receives the problem with its provenance attached, never as a bare string.

The Phase A observation reports what the problem is, where it came from, and whether the record is sufficient. Findings only, no narrated inference.

Known divergence, scheduled work: the current worker infers whenever suspected_problem is null with no thin-parse floor, and the client stores only a bare confirmed-problem string, so provenance is destroyed at the click and the Insufficient route does not exist. The Phase A response already carries a problem_source field; it is dropped rather than carried.

The maturity door. Class 0 (observed) and class 2 (self): extraction — recall the specific moment and what the grape actually did; for class 2 the question and grading stay in the second person. Class 1 (talked, not observed): direction — go get one real instance; phrasings that assume a moment in hand (“think of the last time,” “describe the moment”) are forbidden. A moment the grape describes counts as much as one the builder watched.

Phase B — grading. The Tell (filmable behaviour) and the Vintage (one anchored past instance) are graded always; the Gap is graded only when gap_in_play is true. gap_in_play is set in Phase A when the recovered problem itself names an existing tool and how it fails; it routes a Gap check into Phase B, never clears the Gap itself. The Gap clears from the builder's answer, never from Spark text. M2's overall state is the floor of its active bars: any Turbid bar makes the answer Turbid; otherwise any Clearing bar makes it Clearing; all active bars Settled makes it Settled.

Field question (ASK, to the grape): “Walk me through the last time [problem] happened. What did you do right then?”

## M3 — Third-Party Workarounds

M3 asks what people other than the grape do about the same problem. It does not ask about the grape's own attempts — any prior phrasing to that effect is superseded. Evidence target: a separate person, not the grape and not the builder, doing a concrete workaround — a tool they pay for, someone they hand it to, a hack they built, a manual ritual, or nothing at all. Past or present, never hypothetical.

The Echo is M3's primary bar and the only bar that sets M3's overall state. M3's overall state equals the Echo state — full stop. The Vintage is opportunistic in M3: graded only when the answer already carries a moment, rank-up only, never blocks, never gates the overall state. The floor-of-active-bars rule belongs to M2 and must not be applied to M3.

Echo bar in M3, hardened: Settled requires one identifiable separate person doing one concrete thing. A category of known sufferers, with or without a named workaround (“lots of freelancers I know,” “freelancers I know use spreadsheets”), is Clearing. The builder's inference is Turbid. When the grape is the builder (class 2), M3 pivots away from self; the Echo can never be the speaker. The Substitution Rule applies: a stack or architecture answer is named as a substitution and caps the Echo at Clearing.

Structure: two phases like M2, minus problem recovery (the confirmed problem already exists). Plumbing is an M2 clone with M3's grading.

In-app: set [grape] aside — who else hits [problem], and what have they done about it. Field question (to a third party): “What have you tried for [problem]? How are you handling it now?”

## M4 — The Second Person (conditional)

Confirms the pattern beyond one person and surfaces the structural split Phase 2 must resolve. Conditional: if a natural split between user types appears in M1 or M2 answers, M4 is skipped — the finding is already made. Otherwise it fires after M2. In-app: [grape] is one kind of person with this; who is a different kind, and does it look the same for them. Field question (to a contrasting segment): “Talk me through how [problem] shows up for you.” Forces contrast; never leads toward sameness.

## M5 — The Existing Fix

Maps what currently exists and where it precisely fails. Sources the Gap. In-app: what do people use for [problem] now, and exactly where does it fall short. Field question: “What are you using for [problem] now? What do you love and hate about it? When did it last let you down?” Names the incumbent, pins the failure to a moment, no pitch.

## M6 — Their Words, Not Yours

Extracts the problem in the sufferer's own language, unprimed. The second side of the corroboration. In-app: how would [grape] describe this in their own words. Field question: “What's the most annoying part of [domain] for you right now?” Maximally open; the builder's framing absent; listen, do not correct. Fires on real language or flagged reconstruction.

## M7 — The Non-Case

Extracts disconfirming evidence: who should have the problem but doesn't, and why. Sources the Limit. Consistently the sharpest structural finding in Phase 1 and the primary protection against wrong-stable foundations. In-app: who looks like they should have [problem] but doesn't — why not. Field question (to a non-sufferer): “You're in [domain] — is [problem] actually a thing for you?” and if not, “why not?” Deliberately seeks the negative; never leads.

The field-question generator, stated once: pick the mechanism's Mom Test archetype, slot in the bottle's grape, problem, and domain, enforce the no-pitch rule. The model call happens at park time only.

# Phase 2 — Mechanisms and the Tasting Notes

Seven mechanisms. Six force decisions from Phase 1 material; the seventh produces commitment. Compression is not new information — it is the builder committing to one version of what they already know. Cascade order: M8, M9, M12, M10, M11, M13, then M14.

- M8 — The Exact User. An operational definition narrow enough that two people reading it would identify the same person in a room. Resolves M4's split when it fired.

- M9 — The Triggering Moment. Of all the moments Phase 1 surfaced, the one the product is designed to exist at.

- M12 — The Existing Hire. The specific current behaviour the product bets it can replace, and why that behaviour has survived despite being inadequate.

- M10 — The Success Condition. What solved looks like across functional, emotional, and social dimensions. All three required.

- M11 — The Non-Negotiables. Hard constraints whose violation makes adoption impossible, each testable by describing a violating solution. Harder-but-possible is a preference, not a non-negotiable.

- M13 — The Resistance Pattern. The four demand-reducing forces for this idea: anxiety-in-choice, anxiety-in-use, habit-in-choice, habit-in-use. The Echo is the primary input.

- M14 — The Pour. The first solution-facing commitment: the solution thesis fused with its first falsifiable test (a named person, a deadline, a commitment signal that counts as a win). One sentence.

The Tasting Notes: six fields in concrete, low-level language — The Drinker (M8), The Moment (M9), The Current Glass (M12), Empty (M10), The Rules (M11), The Hesitation (M13). If a field reads like a vision statement, the sediment has not settled. Beneath the six, one line: The Pour.

# Phase 3 — Judgment

Six mechanisms: M15 Plan Specificity (concrete if-then intentions), M16 Obstacle Honesty (internal obstacles, not external), M17 The Pre-Mortem (one year out, it failed completely — write why), M18 Kill Criteria (the specific result by the specific date that triggers abandonment), M19 Investment Bias (the outside view; merit separated from sunk effort), M20 Identity Alignment (expression of who the person is, or aspiration disconnected from it). Phase 3 must make it psychologically easier to be honest than to perform readiness.

## Uncorking and re-corking

Uncorking delivers the Settled Label and one door: a specific commitment of time, money, or attention that tests whether the idea is worth what it will cost — matched to what the idea became, not what it started as. Re-corking is not failure: one honest sentence about why, recorded as an ingredient; a re-cork after the full hearing can be a final verdict. The uncork readiness criteria remain the hardest open design problem (see Open Questions). The label remembers every attempt.

# MVP Build Priorities — Current State, August 2026

Built, wired end to end, and verified by click-through: M0 with the scope gate and regression suite, the branching maturity tree, the cork-side grape step with the relationship gate, all seven Phase 1 mechanisms M1 through M7 with their own grading doctrine, the swirl, the inline errand, the reopen path from both the sidebar and the label, the park path with dormant and in-flight states and all six brief kinds, the rhythm gate with pace durations and a rhythm-test mode, three-clock demurrage, the stalled panel, archive, and cellar export and import. The v45 build order items 1 through 6 are complete.

What is not built: the Evidence Line, the reconciliation doors, alignment states, the Connection Check, the market existence check, the cork itself, the Idea Timeline, and all of Phase 2 and Phase 3.

The chain terminates in a dead end. The label screen renders six state pills, a settled count, and a pace line. There is no cork action, no User Line, no Evidence Line, and nothing Phase 2 could consume. That surface, and the M2 Phase A defect it shares a root with, are the whole of the current work.

Build order from here, and this is a deliberate reordering of the v45 order, argued as a doctrine change rather than drifted into:

- 1. Design the End of Phase 1: the state model, the surface, and the legal transitions between them. No code. **Done (v47).** The refusal thresholds, the corrected provenance filter, the spine, and the four routes are body text above. The design survived one adversarial review, which found four real defects; all four are fixed in the text as written.

- 2. Write the result into this document. **Done (v47).**

- 3. Apply the same statuses backwards to M2 Phase A: stop the laundering, add the Insufficient route and scene elicitation, carry provenance with the claim. This is the first output of the design work, not its prerequisite, and it is the live head of the queue. The brief cites The refusal thresholds.

- 4. Build the ending surface. The riskiest code is the Evidence Line generator, because it is a model call under compress-may-not-upgrade, which is exactly the condition that required M0's regression suite. It gets the same treatment, and the same treatment means asserting wording and not only labels: M0 has a suite because the failure lives in the phrasing, so a suite that checks the state and ignores the sentence is a different and weaker instrument. Every Resolved case asserts three things — the state, the sentence's content, and its register. Two register assertions run on every generated line: no product noun, solution form, or scope claim; and every substantive noun and verb traceable to a verbatim span. A compression that adds specificity the record never held — “closes the tab” where the answer said “got annoyed” — must fail even though its provenance is legitimately scene_derived. Surviving the provenance filter and being faithful to the record are separate tests, and only the second catches this.

- 5. Bench the complete chain. Explicit cases: an explicitly stated problem, a witnessed but poorly expressed one, a hollow one, and a completely ungrounded one.

Benching before step 1 was considered and rejected. A bench run validates a designed contract, and the missing contract is what produced the findings in the first place, so another run would only produce cleaner examples of a known failure.

Do not build yet: any progression or momentum system (see Open Questions), Trophy Shelf polish, sharing flows, accounts, teams, payments, push or email delivery, additional Winemaster appearances, explanation-heavy onboarding, any Phase 3 outcome system before Phase 1 feels sharp. Building async delivery infrastructure before the mechanism chain is complete is a named Hider move.

The copy load is the largest non-architectural risk on the project, and the ending concentrates it: four evidence states, their refusal reasons, four routes, and the provenance line all have to land in the Winemaster register. It is budgeted as sustained creative work, not brief-writing.

# Resolved In This Version

Calls made in v44 through v47 to remove ambiguity. Each is reversible, but reversal is a doctrine change, not a drift. The v47 calls are listed first because they are the current live change; earlier calls are grouped after.

## v47 calls (August 2026)

- The refusal thresholds are written and the blocking open question is closed. Four states, one ordered procedure, first match wins.

- The spine: the Grape, the Tell, and the Vintage decide the state. The Gap, the Echo, and the Limit cannot raise it and can lower it through a named pair collision. The earlier phrasing that non-spine elements do not decide the outcome was overstated — veto is deciding.

- The Echo's structural weight is settled, closing a question logged as watched: the Echo does not gate the sentence, it holds the cork, and it owns the errand. The asymmetry with the Vintage is argued from the two unearnable elements, not assumed — the Vintage is earnable from real memory in a sitting, the Echo is not earnable from the builder at all.

- The provenance filter reads the chain, not the per-claim tag. A system_hypothesis problem makes the record Insufficient unless the Tell and the Vintage both settle on content the hypothesis could not have held. Tag-reading was the defect: it stripped the guess and graded the restatements underneath it, passing the laundered record it existed to catch.

- Insufficient and Unresolved must differ by action, not register. Insufficient routes to the in-app scene request; Unresolved routes to the field brief. Two refusal states with the same next move are one state with two names.

- Resolved is not the end of the screen. A settled spine with an open Echo carries one errand, priority Echo then Vintage then Gap then Limit. Every element Settled makes the cork the next move.

- Substitution on a spine element grades Turbid and is therefore Insufficient, with the same question repeated as the next move. An off-topic non-answer must not grade more kindly than an honest vague one.

- The Evidence Line regression suite asserts wording, not only state labels. A faithful-looking compression that adds specificity is the one failure a provenance filter structurally cannot see.

## v46 calls (August 2026)

- The core defect named: Corked cannot say nothing here. Absent evidence produces a fluent substitute rather than a declared absence. One failure, four surfaces — the invented problem at M2 Phase A, the silent errand, the settled count read as a shortfall, and the missing Evidence Line.

- The Provenance Rule: Corked does not determine whether grounding exists. It records what reached the bottle, preserves where it came from, and names what is still needed. Unrecorded means not in the record, never does not exist.

- Provenance and evidence state are two axes, never one field. Origin is not sufficiency.

- The Confirm Rule: confirm may update the User Line, because that records belief; confirm may never upgrade the Evidence Line, because that records evidence. A system hypothesis can never settle an element.

- M2 Phase A gets three outcomes, not one: stated, bounded inference, insufficient. The insufficient route asks for the scene rather than presenting a hypothesis for confirmation.

- The scene route replaces a self-reported routing menu. A menu of options including an exit is the Hider's escape before the attempt. Ask for the scene, grade what comes back, swirl once, then the errand.

- The End of Phase 1 is a handoff, not a scorecard: five surfaces, four evidence states, four routes. The settled count leaves the verdict position; the six elements become the audit trail.

- Evidence state and reconciliation run in sequence on different axes. Insufficient, Unresolved, and Conflicted route to their errands. Only Resolved opens the alignment question and the five doors.

- Phase 2 requires a Resolved Evidence Line. Phase 1 may honestly end in any of the four states; completing Phase 1 is not the same event as progressing.

- “Cork another spark” is demoted to a secondary return to the cellar. It is never the ending's primary action.

- The build order is reordered deliberately: design the ending, write the doctrine, apply it backwards to M2, build, then bench. Benching first would only produce cleaner examples of a known failure.

- F19 (the chain has no felt progression) is downgraded to unconfirmed. The run that produced it was fast, disinterested answers to a phantom problem, so the observation is contaminated. No progression system is designed until a real run says one is missing. The evasive persona itself remains correct testing, because the Hider is the ICP.

## v44 and v45 calls

- Single source of truth: this document supersedes v42, v43, and the doctrine additions file. One doc governs.

- Relabel pass executed: founder → solo software builder throughout; incubator and prospectus residue stripped.

- Doctrine additions merged: the question layer, the three exits, the Phase 1 question blueprint, and the M0 sufficiency verdict are now body text.

- In flight is a label, not a tracking system. Replies re-enter as fresh answers.

- Representational stability is two consecutive answers with no element movement. Not “two or three.”

- The three-clock demurrage rule: Active runs against pace, Dormant runs on the rhythm with the brief visible, In flight pauses the clock. World latency is never punished.

- The uncorked bottle is the expected median state, stated as doctrine. Verdicts are unearnable without the Echo.

- The element confirmation mechanic (amber flagged elements, one resolving question per tap) is doctrine.

- The Connection Check closes the problem-solution mismatch hole, firing once at the transition signal, routing into the existing five reconciliation outcomes.

- The market existence check fires at exactly two checkpoints, as one Winemaster question, never a gate or a search.

- Phase 2 entry: cork allowed while Aligned or Strained, blocked while Divergent or with reconciliation pending. One standing Keep travels through the cork; two does not.

- Hold ceiling operationalised: one neutral, second on same element marks sediment, Hold after new evidence is Strained, three simultaneous Holds reads stalled.

- M3 corrected: third-party workarounds, Echo-primary, overall state equals Echo state, Vintage opportunistic and never gating, category-of-sufferers capped at Clearing, self-as-grape pivots away from self.

- The Echo category rule added to the element clearing bar itself, matching the grape's relationship-gate hardening.

- The swirl rule written: one main question, one follow-up on a thin answer, the label catches the rest.

- The rhythm gate is a real gate; wait durations are config constants.

- The rubric is never taught explicitly. The park button is the education; consequence, not instruction.

- M3 wired and tested (v45): third-party workarounds, Echo-primary overall state, the category rule, the grape-exclusion rule, and the self-as-grape pivot all confirmed green in live testing, including the grape-exclusion and category-of-sufferers cases that the hardened bar exists to catch.

- The inline errand (v45): an element that grades Turbid or Clearing for a real-world reason surfaces its field brief inline beneath the observation, before the builder acts. Singular (one element, one brief), brief-not-rubric, real-world-shaped turbidity only. A correct finding that dead-ends is a Hard Thing Principle failure.

- The reopen path (v45): any Turbid or Clearing element can be reopened and re-answered through the existing mechanism and grading, rank-up only, no coaching. The cork-gate resolving question (the element confirmation mechanic, étapes two and three) is held until the Phase 1 chain is complete.

- The swirl, the reopen, and the inline errand are three distinct mechanisms at three different moments and are not to be fused (v45).

# Open Questions — August 2026

Two of the five blocking questions closed in v47. One remains genuinely blocking for the ending brief: product naming, because the ending is copy-heavy.

- When the ending fires. **Accepted (v47):** at chain end, after M7, regardless of how many elements settled. The ending is not the cork; the cork still requires six Settled. A three-of-six bottle gets a full honest ending and no cork. This is the call that makes the median bottle a first-class outcome instead of a failure screen. Accepted rather than argued at length, and reversible on the usual terms.

- Refusal thresholds. **Closed (v47).** See The refusal thresholds. The procedure, the corrected provenance filter, the spine and its argument, and the named pair test are body text.

- Does provenance data exist today. **No longer blocking (v47).** The corrected filter reads the problem's provenance and the element bars, not a per-element provenance field, so the thresholds stand whatever the audit finds. The audit now blocks only the provenance line. If per-element provenance is not stored, that is a small worker change, not a redesign.

- The residue the rule cannot remove. A builder with real material and poor language is treated the same as one with nothing, because Corked cannot tell them apart from text and must not pretend to. Narrowed again in v47: the re-grounding rule means a clumsily recovered problem no longer condemns the record, because a settled Tell and Vintage stand on their own content. The scene route and M6 narrow it further. Logged as a live risk, watched in real sessions, not solved by design.

- Product naming. “Corked” has a confirmed wine-defect association problem: corked means a ruined bottle. Rack and Proof are the live alternatives. No decision. The ending is copy-heavy, so write its copy product-name-free where possible so a rename does not reopen it.

- Uncork readiness: what signals distinguish genuine investment-readiness from restating with confidence. The hardest remaining design problem.

- Element naming: Grape, Tell, Vintage, Gap, Echo, Limit are insider language. The label must read like a document someone wants to keep. Riff after the current build cycle; never rename mid-cycle.

- Verdict register: does the settled label land as honest reckoning or attack (the Sohrab question). Watched, not yet answered.

- The Echo's structural weight. **Closed (v47).** The Echo does not gate the Evidence Line, it holds the cork, and it owns the errand at a Resolved ending. What remains watched is narrower and empirical: whether the bar itself needs to move again under stranger sessions.

- Are users willing to pay; app vs web vs email-first; multi-sided ideas (marketplaces) and whether Phase 1 needs a dedicated mechanism for them.

- Re-corking: how the single captured sentence influences subsequent question selection.

- What door the Settled Label opens. Theirs is a key to a lender; ours may be a private reckoning, and that may be fine. Backlog, don't chase.


- M4 conditional skip: M4 is currently skipped when the Echo is already Settled at the point M4 would render, on the logic that M3 has confirmed a third party. But M4's doctrinal job is the contrast split, a second and different kind of sufferer, which Phase 2's M8 (The Exact User) expects to resolve. Keying the skip on Echo state conflates Echo-confirmation with split-detection, and a picture can reach M8 with no split to work with. Defensible for the Phase 1 MVP; revisit when M8 is built and the split is what it needs. The skip is also a one-way gate: an Echo later reopened to Clearing does not re-insert M4.