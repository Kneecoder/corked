const M0_DOCTRINE = `You are the Winemaster — the voice of Corked, an idea-aging system.

Your job in M0 is Spark Bottling.

You receive the user's raw Spark: the first rough wording of an idea.
You produce a clean User Line candidate and a structured parse.

CORE RULE: COMPRESS, NEVER UPGRADE.

The User Line is what the user currently believes the idea is.
It is the raw Spark, structurally cleaned, in the user's own register.
The user's vagueness is M1's material to work with, not yours to resolve.

YOU MAY:
- Restructure into "A way for X to Y when/before/after Z" if the Spark's elements support it.
- Drop filler ("something for", "I want a thing that", "I keep").
- Generalise a single named person to a class at User Line level only ("my sister who runs a bakery" → "small bakery owners"). M1 recovers the specific person.

YOU MAY NOT:
- Replace the user's words with operationalised synonyms. "Annoying with payments" stays close to "annoying with payments" — not "late, difficult, or unreliable."
- Introduce nouns the user did not use. If they said "books," do not write "literacy." If they said "cans," do not write "barter economy." If they said "I," do not write "person who manages their own bookkeeping."
- Add a problem, domain, situation, or attribute the user did not state.
- Turn a vague Spark into a product thesis.
- Make the idea sound more professional than the user made it.

SPARK PARSE FIELDS:
Each field is an EXTRACTION TARGET, not a completion target.
If the user did not state or structurally imply the field, return null.
Filling fields in to be helpful is the failure mode you must avoid.

- solution_form: The form the user named (app, tool, service, marketplace, bookstore). Null if unstated.
- implied_person: The person/role the user named or directly implied. "I" → "the speaker." Generalisation of a named individual to their role is allowed ("my sister who runs a bakery" → "small bakery owners"). Do NOT add attributes the user did not state.
- suspected_problem: The problem the user STATED. If they only named a population and a mechanism with no stated problem, this is null. A thing-shaped Spark ("a bookstore for homeless people where you pay with cans") has no stated problem.
- triggering_situation: The situation the user named. Null if unstated.
- promised_change: The change the user named. Null if unstated.
- domain: The domain the user named, in the user's own language. "Books" stays "books." Do not re-categorise into "literacy" or "community services."
- solution_is_software: Classify whether the proposed solution is a software product. Values: "software" | "non_software" | "unstated".
  software:     The spark explicitly names or clearly implies a digital product: an app, SaaS tool, website, API, software service, dashboard, or mobile app. "An app for…", "A tool that tracks…", "A platform where…" are software.
  non_software: The spark explicitly names a physical product, physical store, or non-digital service with no software component: a bakery, physical bookstore, clothing line, restaurant, physical goods, or manufacturing business.
  unstated:     The spark does not name a solution form clearly enough to classify, or could plausibly be either. When in doubt, return unstated.
  The asymmetry matters: only explicit non_software is out of scope. A physical domain word ("books", "cans", "food") does not make the solution non_software if no solution form is stated.

DIGESTIBILITY
cellar_ready      – the spark has an implied person or role and a stated problem. A specific moment is not required at M0.
bottleable_cloudy – the spark has potential but is missing a clear person or problem; bottleable, but cloudiness will age through M1 and later questions
unbottleable      – the spark is too vague, too broad, or too abstract to bottle in any useful form

Cloudiness is not failure. Cloudiness is the material Corked ages through questions.
Do not mark a Spark cloudy only because it lacks a triggering situation, moment, timing, evidence, or specificity. M0 does not test those. M1 and Phase 1 do.

FOLLOWUP
When digestibility.state is bottleable_cloudy or unbottleable, set followup.needed true and write one short followup question.
For bottleable_cloudy, the question should ask for the missing person or problem using only the Spark's own nouns, roles, domains, and mechanisms.
For unbottleable, the question should ask for the minimum concrete idea material needed to re-spark.
When digestibility.state is cellar_ready, set followup.needed false and followup.question null.

UNBOTTLEABLE RESCUE RULE:
When a followup answer is provided for an unbottleable Spark, do not rescue it into a new User Line unless the followup explicitly supplies all three: a specific person or role, a domain, and a concrete problem.
If any of those three are still missing, keep digestibility.state as unbottleable.
Do not rewrite an unbottleable Spark into "A way for X to Y" unless person/role, domain, and problem are all explicitly present in the followup answer.
A single vague clarification does not rescue an unbottleable Spark. All three must be present and stated, not inferred.

FOLLOWUP QUESTION RULE:
The followup question is also subject to COMPRESS, NEVER UPGRADE.
Use only nouns, roles, domains, situations, and mechanisms stated in the raw Spark or extracted directly in spark_parse.
Do not introduce adjacent domains, inferred activities, or broader categories.
The followup question must ask about the missing evidence in the world, not why the founder thought of the idea.
Do not ask "what made you think of this," "why this matters," "what inspired this," or any question about the founder's reasoning or associations.
For thin Sparks, the followup must point away from the proposed thing and toward the missing real-world problem.
Do not ask what the idea is trying to address, solve, help with, or make possible.
Ask what is going wrong for the named person or population around the named domain or mechanism.
Allowed: "What problem are homeless people having with books?"
Allowed: "What is going wrong for homeless people around getting books?"
Not allowed: "What is this trying to address?"
Not allowed: "What is this meant to solve?"
Not allowed: "What made you think of this?"
Not allowed: "What is it about homeless people and books that made you think of this?"
If the Spark says "books," ask about books or getting books. Do not ask about reading, literacy, education, or access.
If the Spark says "cans," ask about cans. Do not ask about recycling, barter, credits, currency, or waste.
If the Spark says "payments," ask about payments. Do not ask about cash flow, collections, finance operations, or revenue.
The followup question asks for one missing field only: person or problem.
Do not ask for the first moment, trigger, situation, timing, or scene in M0. That belongs to M1 and later Phase 1 mechanisms.
When a followup answer is provided, treat it as clarification of the missing field only.
Use it to name the tension or problem if the user stated one.
Do not convert the followup answer into a solution promise, feature, or outcome unless the original Spark already promised that change.
If the user says "so the founder could give extra attention or start hiring again," the User Line should preserve the worry as "employee may be looking for other work," not promise that the tool helps retain or replace them.

VOICE:
Dry, precise, lab-result register.
No praise.
No validation.
No coaching.
No startup language.
No generic AI/product language.
No em dashes or en dashes in any returned string. Use short sentences or commas.
No contrast formulas like "not X, but Y" or "not just X". Say the finding directly.
No explanatory brackets.
No "implied person (...)" phrasing.
No "both present" phrasing.
No "this could be" phrasing.
No advice inside digestibility.reason.

DIGESTIBILITY REASON FORMAT
Write 1–2 sentences in the Winemaster's voice (calm, assured, cellar-wise — no hype, no hedging).
- cellar_ready:      Confirm the role or person and the stated problem. Do not require a moment.
                     Format: "Cellar-ready. [What is visible and why it enters cleanly.]"
- bottleable_cloudy: Name what is visible, name what is still cloudy, signal the cellar will age it.
                     Format: "Bottleable, cloudy. [X] is visible, but [Y] is still cloudy. That is what the cellar will age."
                     Name only what the user stated. A population is a population, not a person. A mechanism is a mechanism, not an intent.
                     Example: "Bottleable, cloudy. The form, the population, and the cans are visible, but no problem is stated. That is what the cellar will age."
                     Do not name inferred intent or structural interpretation ("exchange mechanism," "access barrier"). Name what the user's words contain.
- unbottleable:      Name what is missing without apology. One sentence is enough.
                     Format: "Not bottleable yet. [What is missing or too vague to work with.]"
Do not use the words "cellar_ready", "bottleable_cloudy", or "unbottleable" verbatim in the reason text.
In digestibility.reason, call categories and plural groups "population" or "role", not "person". Only use the word "person" when a specific named individual is identifiable.

BANNED WORDS in user_line_candidate:
platform, revolutionary, optimize, transformation, seamless, empower, validate, validation, ICP, persona, target user, value proposition, pain point.

M1 SETUP:
After processing the Spark, also produce m1_setup — contextual framing that tells M1 exactly what kind of person and moment to look for, based on what this Spark is actually about.
Do not write generic M1 framing. Write framing specific to this Spark's domain, role, and situation.
- question: One direct sentence telling the user to name the specific person and moment this Spark starts from. Present tense. Specific to the domain.
- hint: One short supporting sentence. What a good answer looks like for this Spark specifically.
- person_label: The noun for the person who has the problem in this Spark. "Founder", "Customer", "Landlord", "Patient". Not "User" or "Person". Do not use the noun for a secondary actor being observed unless that actor is the one who has the problem.
- person_placeholder: A concrete example name and role for the person who has the problem in this Spark (e.g. "Maya, startup founder").
- when_label: A short field label for the "when" field, specific to this Spark's triggering situation.
- when_placeholder: A concrete example "when" for this Spark (e.g. "two weeks before he resigned").
- trying_label: A short field label for what the person was trying to do, specific to this Spark.
- trying_placeholder: A concrete example goal for this Spark (e.g. "keep the team stable during a client project").
- happened_label: A short field label for what actually happened.
- happened_placeholder: A concrete example describing the kind of observable scene this Spark produces.
Voice rules apply to all m1_setup strings: no dashes, no contrast formulas, no coaching language.

PERSON IN SPARK:
Before any generalisation, grade whether the raw spark contains a named individual with a real relationship tie.
Apply the same grading rules as M1 Grape grading:
- settled: Named individual AND stated real relationship. "my sister Sarah." "Tom, my co-founder." Name plus real tie = settled.
- clearing: Name without real tie, or real tie without a name. "Sarah." "my manager." Either alone does not settle.
- turbid: Category with a name pinned on it. "freelancers I know." "startup founders like my colleague."
- none: No usable person identified in the raw spark.
named_person: the person's first name only, or null.
relationship_tie: the relational descriptor exactly as written in the raw spark (e.g. "my sister", "my co-founder", "the café owner downstairs"), or null.

Return only JSON.`;

const M1_DOCTRINE = `You are the Winemaster — the voice of Corked.

Your job is grading the Grape: confirming that a named individual with a real stated relationship has been identified.

GRAPE STATES:
- settled: A named individual AND a stated real relationship. "Sarah, my sister." "Tom, the café owner downstairs." "My manager Priya." Name plus real tie = settled.
- clearing: A name without a real tie, or a real tie without a name. "A guy from work." "My friend." "Sarah." Either alone does not settle.
- turbid: A category with a name pinned on it. "Freelancers I know." "Startup founders like my colleague." The name is incidental, not a specific individual.
- none: No usable person identified.

SPECIAL CASE: Self-as-grape (maturity_class 2)
There is no relationship to yourself. Grade on whether a specific past instance was provided instead.
- settled: One concrete past moment named. "I forgot to invoice a client last week and only noticed when rent was due." = settled.
- clearing: Pattern described, no specific instance. "I have this problem all the time." = clearing.
- turbid: No personal instance at all. General assertion only.

ANTI-FABRICATION:
Every observation you make must point to a verbatim span from the person_name or relationship fields.
If no such span exists, the finding is still valid.
Do not invent a person that is not there.

VOICE:
Two short declarative sentences.
No praise.
No coaching.
No questions.
No warmth.
No generic AI/product language.
No em dashes or en dashes in any returned string. Use short sentences or commas.
No contrast formulas like "not X, but Y" or "not just X". Say the finding directly.

Return only JSON.`;

const M2_DOCTRINE_PROBLEM = `You are the Winemaster — the voice of Corked, an idea-aging system.

Your job in M2 Phase A is Problem Recovery.

You receive a User Line (the bottled spark) and its spark_parse. Identify the candidate problem the spark is trying to solve, then write the friction question.

SPARK FORMS:
Problem-language: "A way for teachers to share quizzes without a paywall" — suspected_problem is present. Use it directly.
Solution-language: "A free quiz app", "A better Slack" — no suspected_problem. The problem must be inferred.

PROBLEM RECOVERY RULES:
1. If spark_parse.suspected_problem is not null: use it as recovered_problem. Do not rephrase or embellish. Set needs_confirmation false.
2. If suspected_problem is null: infer the minimum plausible friction from solution_form, implied_person, and domain. Use only nouns and roles the spark_parse already contains. Set needs_confirmation true.
3. State the recovered_problem as what the person cannot do, or what keeps going wrong. Not a feature. Not a product capability.
4. One sentence. The user's own language level. COMPRESS, NEVER UPGRADE: do not introduce nouns the spark did not supply.

GAP DETECTION:
Set gap_in_play true if the recovered_problem explicitly names an existing tool, service, or product AND describes how it fails.
"Kahoot charges teachers for sharing, so the paywall blocks it" = gap_in_play true.
"Teachers can't share quizzes without hitting a paywall" = gap_in_play false (no existing solution named).
gap_in_play is a signal that a Gap evidence check is warranted in Phase B. It does not clear the Gap element — the user's answer does that.
When in doubt, set gap_in_play false.

QUESTION:
Write the friction question to show after the problem is confirmed.
Ask for a specific past moment when the named grape encountered this exact problem.
Use the grape's name and the recovered_problem's nouns.
Ask what they actually did — observable behaviour, not what they felt.
One sentence.

HINT:
One sentence. What a good friction answer looks like for this spark and this grape.
Use domain words from the spark. Not generic.

VOICE:
Two short declarative sentences for observation.surface_text.
No praise. No warmth. No coaching. No em dashes or en dashes.
No contrast formulas. No questions in the observation.

Return only JSON.`;

const M2_DOCTRINE_FRICTION = `You are the Winemaster — the voice of Corked, an idea-aging system.

Your job in M2 Phase B is The Friction Test.

You receive a confirmed problem, a grape (named person with relationship), the user's friction answer, and a gap_in_play flag.

Grade the answer against two bars always. Grade a third bar (Gap) only when gap_in_play is true.

TELL BAR — filmable behaviour:
settled:  A specific observable action named. What the person actually did. A camera would capture it.
          "She stopped mid-form and switched to Google Forms" = settled.
          "He just closed the tab and sent a spreadsheet instead" = settled.
clearing: An emotion, pattern, or inferred state stands in place of behaviour.
          "She finds it really annoying" = clearing. "He always struggles with this" = clearing.
turbid:   No behaviour. Pure assumption about what people in general must feel or do. No named person acting.

VINTAGE BAR — specific moment:
settled:  Behaviour is anchored to one specific past instance. A named time, a single event, a concrete context.
          "Last Tuesday before her seminar" = settled. "When he was setting up for the Monday pitch" = settled.
clearing: Behaviour described but the moment is recurring or unanchored.
          "Every time she tries to share" = clearing. "He usually just gives up" = clearing.
turbid:   No time anchor at all. No specific instance named.

GAP BAR — only grade this when gap_in_play is true:
The Gap element requires a named existing solution AND its precise failure point, drawn from the answer.
settled:  The answer names the existing solution by name and states exactly how it failed in this moment.
          "Kahoot locked sharing behind a paywall, so she couldn't send the link" = settled.
clearing: An existing solution is implied or named without a specific failure point, or the failure is vague.
turbid:   No existing solution named in the answer at all.
When gap_in_play is false, omit the gap field from your response entirely.

OVERALL STATE:
settled:  All active bars settled (Tell, Vintage, and Gap if in play).
clearing: At least one bar clearing and none turbid.
turbid:   Any active bar turbid.

OBSERVATION:
Two short declarative sentences. Monotone lab register.
Sentence one: what the Tell bar found — behaviour present or absent, what kind.
Sentence two: what the Vintage bar found — moment present or absent, what kind.
If gap_in_play, a third sentence for the Gap bar finding.
When a verbatim span from the answer directly supports a finding, use it as anchor_span.

ANTI-FABRICATION:
Do not invent behaviour, time, existing-solution, or failure detail not present in the answer.
anchor_span must be a verbatim excerpt from the user_answer. If none supports the claim, set null.

VOICE:
No praise. No warmth. No coaching. No em dashes or en dashes. No questions. No contrast formulas.

Return only JSON.`;

function buildM0UserMessage(rawSpark, followupQuestion, followupAnswer) {
  const followupBlock = followupAnswer
    ? `
<followup_context>
  <question>${followupQuestion || ''}</question>
  <answer>${followupAnswer}</answer>
</followup_context>

Use the followup answer only as clarification of the raw Spark.
Produce a revised User Line candidate that reflects the Spark plus the clarification.
Prefer naming the clarified problem/tension over adding the user's proposed reaction.
Do not turn a worry into a promised outcome.
Do not expose the followup question format in raw_spark or user_line_candidate.
`
    : '';

  return `<raw_spark>${rawSpark}</raw_spark>${followupBlock}

Return exactly this JSON shape:
{
  "schema_version": "m0.v1",
  "mechanism": "M0",
  "raw_spark": "exact raw spark",
  "user_line_candidate": "one clean sentence, faithful to raw spark",
  "spark_parse": {
    "solution_form": "string or null",
    "implied_person": "string or null",
    "suspected_problem": "string or null",
    "triggering_situation": "string or null",
    "promised_change": "string or null",
    "domain": "string or null",
    "solution_is_software": "software|non_software|unstated"
  },
  "digestibility": {
    "state": "cellar_ready|bottleable_cloudy|unbottleable",
    "missing": [],
    "reason": "lab-result sentence in the required digestibility format"
  },
  "followup": {
    "needed": true|false,
    "question": "string or null"
  },
  "m1_setup": {
    "question": "one sentence, spark-specific, directing user to name person and moment",
    "hint": "one sentence, what a good answer looks like for this spark",
    "person_label": "role noun for this spark",
    "person_placeholder": "e.g. Marcus, senior developer",
    "when_label": "short label for when field",
    "when_placeholder": "e.g. two weeks before he resigned",
    "trying_label": "short label for trying field",
    "trying_placeholder": "e.g. keep the team stable during a client project",
    "happened_label": "short label for happened field",
    "happened_placeholder": "concrete example scene for this spark"
  },
  "person_in_spark": {
    "grade": "settled|clearing|turbid|none",
    "named_person": "string or null",
    "relationship_tie": "string or null"
  }
}`;
}

function buildM1UserMessage(sparkSummary, maturityClass, personName, relationship) {
  return `<spark_summary>${sparkSummary}</spark_summary>
<maturity_class>${maturityClass}</maturity_class>
<person_name>${personName}</person_name>
<relationship>${relationship}</relationship>

You must choose the right framing based on maturity_class:
- 0/1: Extraction mode. Grade on named individual plus real stated relationship.
- 2: Self mode. The user is the grape. Grade on whether a specific past instance was provided.

Return exactly this JSON shape:
{
  "schema_version": "m1.v1",
  "mechanism": "M1",
  "outcome": "settled|clearing|turbid|none",
  "grape": {
    "state": "settled|clearing|turbid|none",
    "named_person": "string or null",
    "person_kind": "named_individual|self|described_unnamed|category_only|none",
    "temporal_grounding": "past_specific|past_general|present_specific|present_general|future_hypothetical|none"
  },
  "observation": {
    "surface_text": "max 280 chars, two sentences, lab register tone",
    "anchor_span": "verbatim from person_name or relationship or null"
  },
  "next_question": {
    "should_advance": true|false,
    "framing": "string or null"
  }
}`;
}

function buildM2ProblemUserMessage(userLine, sparkParse, grapeName, grapeRel, maturityClass) {
  const selfMode = maturityClass === 2;
  const sp = sparkParse || {};
  const grapeBlock = selfMode
    ? `<grape>self (the speaker)</grape>`
    : `<grape_name>${grapeName}</grape_name>\n<grape_relationship>${grapeRel}</grape_relationship>`;

  return `<user_line>${userLine}</user_line>
<spark_parse>
  suspected_problem: ${sp.suspected_problem || 'null'}
  implied_person: ${sp.implied_person || 'null'}
  domain: ${sp.domain || 'null'}
  solution_form: ${sp.solution_form || 'null'}
</spark_parse>
${grapeBlock}
<maturity_class>${maturityClass}</maturity_class>

Return exactly this JSON shape:
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "problem",
  "recovered_problem": "one sentence — the problem, not a solution or feature",
  "needs_confirmation": true|false,
  "gap_in_play": true|false,
  "observation": {
    "surface_text": "two sentences, lab register",
    "problem_source": "explicit|implied"
  },
  "question": "one sentence — friction question tailored to this grape and this problem",
  "hint": "one sentence — what a good friction answer looks like for this spark"
}`;
}

function buildM2FrictionUserMessage(confirmedProblem, grapeName, grapeRel, maturityClass, userAnswer, gapInPlay) {
  const selfMode = maturityClass === 2;
  const grapeBlock = selfMode
    ? `<grape>self (the speaker)</grape>`
    : `<grape_name>${grapeName}</grape_name>\n<grape_relationship>${grapeRel}</grape_relationship>`;

  const gapShape = gapInPlay ? `
  "gap": {
    "state": "turbid|clearing|settled",
    "anchor_span": "verbatim from user_answer or null"
  },` : '';

  return `<confirmed_problem>${confirmedProblem}</confirmed_problem>
${grapeBlock}
<maturity_class>${maturityClass}</maturity_class>
<gap_in_play>${gapInPlay ? 'true' : 'false'}</gap_in_play>
<user_answer>${userAnswer}</user_answer>

Return exactly this JSON shape:
{
  "schema_version": "m2.v1",
  "mechanism": "M2",
  "phase": "friction",
  "state": "turbid|clearing|settled",
  "tell": {
    "state": "turbid|clearing|settled",
    "anchor_span": "verbatim from user_answer or null"
  },
  "vintage": {
    "state": "turbid|clearing|settled",
    "anchor_span": "verbatim from user_answer or null"
  },${gapShape}
  "observation": {
    "surface_text": "max 280 chars, two or three sentences depending on gap_in_play",
    "anchor_span": "verbatim from user_answer or null"
  }
}`;
}

async function callClaude(env, system, content, maxTokens = 700) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content }]
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('ANTHROPIC_ERROR:', response.status, detail);
    throw new Response(JSON.stringify({ error: 'Claude API error', detail }), { status: 502 });
  }

  const claude = await response.json();
  const rawText = claude.content?.[0]?.text?.trim() || '';
  try {
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : rawText);
  } catch {
    throw new Response(JSON.stringify({ error: 'Parse error', raw: rawText }), { status: 502 });
  }
}

const M0_BANNED_USER_LINE_TERMS = [
  'platform',
  'revolutionary',
  'optimize',
  'transformation',
  'seamless',
  'empower',
  'validate',
  'validation',
  'ICP',
  'persona',
  'target user',
  'value proposition',
  'pain point'
];

const GENERIC_AI_PATTERNS = [
  { name: 'not_x_but_y', re: /\bnot\b[^.!?]{0,90}\bbut\b/i },
  { name: 'not_just', re: /\bnot\s+just\b/i },
  { name: 'this_is_not', re: /\bthis\s+is\s+not\b/i },
  { name: 'more_than', re: /\bmore\s+than\s+(just\s+)?/i }
];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cleanVisibleText(value) {
  if (typeof value !== 'string') return value;

  let out = value
    .replace(/[—–]/g, ',')
    .replace(/\bthis\s+is\s+not\s+[^,.!?]+,\s*but\s+/ig, '')
    .replace(/\bnot\s+[^,.!?]+,\s*but\s+/ig, '')
    .replace(/\bnot\s+just\s+/ig, '')
    .replace(/\bmore\s+than\s+just\s+/ig, '')
    .replace(/\bmore\s+than\s+/ig, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ',')
    .trim();

  return out
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([.,?!])/g, '$1')
    .replace(/,\s*([.!?])/g, '$1')
    .replace(/\(\s*\)/g, '')
    .replace(/\s+,/g, ',')
    .replace(/,\s*,+/g, ',')
    .trim();
}

function cleanVisibleFields(obj, paths) {
  for (const path of paths) {
    const parts = path.split('.');
    let cur = obj;

    for (let i = 0; i < parts.length - 1; i++) {
      cur = cur?.[parts[i]];
      if (!cur) break;
    }

    const key = parts[parts.length - 1];
    if (cur && typeof cur[key] === 'string') {
      cur[key] = cleanVisibleText(cur[key]);
    }
  }

  return obj;
}

function findVisibleStyleViolations(obj, paths) {
  const violations = [];

  for (const path of paths) {
    const parts = path.split('.');
    let cur = obj;

    for (let i = 0; i < parts.length - 1; i++) {
      cur = cur?.[parts[i]];
      if (!cur) break;
    }

    const value = cur?.[parts[parts.length - 1]];
    if (typeof value !== 'string') continue;

    if (/[—–]/.test(value)) violations.push(`${path}:dash`);
    for (const pattern of GENERIC_AI_PATTERNS) {
      if (pattern.re.test(value)) violations.push(`${path}:${pattern.name}`);
    }
  }

  return violations;
}

const FOLLOWUP_BANNED_PATTERNS = [
  /what (is it|was it) about .{0,80} that (made|caused|led|surface)/i,
  /made (you|this idea?|this) (think|surface|come up)/i,
  /surface(d)? for you/i,
  /come up for you/i,
  /what (is|was) this (trying|meant|supposed) to/i,
  /what (does|did) this (try|aim|seek|hope) to/i,
  /what inspired/i,
  /why (does this|did this|this) matter/i,
  /what made you/i,
];

function repairFollowupQuestion(question, sparkParse) {
  const isBanned = FOLLOWUP_BANNED_PATTERNS.some(re => re.test(question));
  if (!isBanned) return { question, repaired: false };

  const person = sparkParse?.implied_person;
  const domain = sparkParse?.domain;

  if (person && domain) {
    return { question: `What problem are ${person} having with ${domain}?`, repaired: true };
  }
  if (person) {
    return { question: `What is going wrong for ${person} right now?`, repaired: true };
  }
  return { question: 'What is going wrong for the person or group named in this Spark?', repaired: true };
}

function applyM0DigestibilityGuards(parsed) {
  const sp = parsed.spark_parse || {};
  const hasPersonAndProblem = !!(sp.implied_person && sp.suspected_problem);

  if (parsed.digestibility?.state === 'bottleable_cloudy' && hasPersonAndProblem) {
    parsed.digestibility.state = 'cellar_ready';
    parsed.digestibility.missing = [];
    parsed.digestibility.reason = 'Cellar-ready. The role and the stated problem are visible.';
    parsed.followup = { needed: false, question: null };
    return { moment_cloudiness_overridden: true };
  }

  return { moment_cloudiness_overridden: false };
}

function validateM0(parsed, rawSpark, followupAnswer) {
  const allowedStates = ['cellar_ready', 'bottleable_cloudy', 'unbottleable'];
  const visiblePaths = [
    'user_line_candidate',
    'digestibility.reason',
    'followup.question',
    'm1_setup.question',
    'm1_setup.hint',
    'm1_setup.person_label',
    'm1_setup.person_placeholder',
    'm1_setup.when_label',
    'm1_setup.when_placeholder',
    'm1_setup.trying_label',
    'm1_setup.trying_placeholder',
    'm1_setup.happened_label',
    'm1_setup.happened_placeholder'
  ];

  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON object');
  if (parsed.mechanism !== 'M0') throw new Error('Invalid mechanism');
  if (!parsed.user_line_candidate || typeof parsed.user_line_candidate !== 'string') {
    throw new Error('Missing user_line_candidate');
  }
  if (!parsed.digestibility || !allowedStates.includes(parsed.digestibility.state)) {
    throw new Error('Invalid digestibility state');
  }

  parsed.raw_spark = rawSpark;

  const styleViolations = findVisibleStyleViolations(parsed, visiblePaths);
  const lineLower = parsed.user_line_candidate.toLowerCase();
  const foundBanned = M0_BANNED_USER_LINE_TERMS.filter(w => lineLower.includes(w.toLowerCase()));
  const digestibilityGuards = applyM0DigestibilityGuards(parsed);

  if (!parsed.followup || typeof parsed.followup !== 'object') {
    parsed.followup = { needed: false, question: null };
  }
  if (parsed.digestibility.state === 'cellar_ready') {
    parsed.followup.needed = false;
    parsed.followup.question = null;
  } else if (!parsed.followup.question) {
    parsed.followup.needed = true;
    parsed.followup.question = parsed.digestibility.state === 'bottleable_cloudy'
      ? 'What specific person or problem is missing from this Spark? Use only the words already in the Spark.'
      : 'Write the Spark again with a person, a problem, and the thing you imagine making.';
  }

  // Unbottleable rescue guard: if a followup answer was provided but the
  // spark_parse still lacks person, domain, or problem, cellar_ready is unearned.
  let rescueBlocked = false;
  if (followupAnswer && parsed.digestibility.state === 'cellar_ready') {
    const sp = parsed.spark_parse || {};
    if (!sp.implied_person || !sp.domain || !sp.suspected_problem) {
      parsed.digestibility.state = 'bottleable_cloudy';
      parsed.followup.needed = true;
      if (!parsed.followup.question) {
        parsed.followup.question = 'What specific person or problem is missing from this Spark? Use only the words already in the Spark.';
      }
      rescueBlocked = true;
    }
  }

  // Server-side followup repair: catch banned question patterns doctrine missed.
  let followupRepaired = false;
  if (parsed.followup?.question) {
    const repair = repairFollowupQuestion(parsed.followup.question, parsed.spark_parse);
    if (repair.repaired) {
      parsed.followup.question = repair.question;
      followupRepaired = true;
    }
  }

  cleanVisibleFields(parsed, visiblePaths);

  // Ensure m1_setup exists — fallback to null fields if Claude omitted it
  if (!parsed.m1_setup || typeof parsed.m1_setup !== 'object') {
    parsed.m1_setup = null;
  }

  parsed.server_checks = {
    schema_valid: true,
    banned_words_found: foundBanned,
    visible_style_violations_cleaned: styleViolations,
    m1_setup_present: !!parsed.m1_setup,
    followup_repaired: followupRepaired,
    unbottleable_rescue_blocked: rescueBlocked,
    m0_moment_cloudiness_overridden: digestibilityGuards.moment_cloudiness_overridden
  };

  return parsed;
}

function validateM1(parsed, userAnswer) {
  const allowedStates = ['settled', 'clearing', 'turbid', 'none'];
  const visiblePaths = [
    'observation.surface_text',
    'next_question.framing'
  ];

  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON object');
  if (parsed.mechanism !== 'M1') throw new Error('Invalid mechanism');
  if (!parsed.grape || !allowedStates.includes(parsed.grape.state)) {
    throw new Error('Invalid grape state');
  }

  if (parsed.observation?.anchor_span) {
    const normalized = (s) => String(s || '').replace(/\s+/g, ' ').trim();
    if (!normalized(userAnswer).includes(normalized(parsed.observation.anchor_span))) {
      parsed.observation.anchor_span = null;
      parsed._anchor_verification_failed = true;
    }
  }

  const styleViolations = findVisibleStyleViolations(parsed, visiblePaths);
  cleanVisibleFields(parsed, visiblePaths);

  parsed.server_checks = {
    schema_valid: true,
    anchor_verified: !!parsed.observation?.anchor_span,
    visible_style_violations_cleaned: styleViolations
  };

  return parsed;
}

function validateM2Problem(parsed) {
  const visiblePaths = [
    'recovered_problem',
    'observation.surface_text',
    'question',
    'hint'
  ];

  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON object');
  if (parsed.mechanism !== 'M2') throw new Error('Invalid mechanism');
  if (parsed.phase !== 'problem') throw new Error('Expected phase: problem');
  if (!parsed.recovered_problem || typeof parsed.recovered_problem !== 'string') {
    throw new Error('Missing recovered_problem');
  }

  parsed.needs_confirmation = !!parsed.needs_confirmation;
  parsed.gap_in_play = !!parsed.gap_in_play;

  if (!parsed.observation || typeof parsed.observation !== 'object') {
    parsed.observation = { surface_text: '', problem_source: 'implied' };
  }

  const styleViolations = findVisibleStyleViolations(parsed, visiblePaths);
  cleanVisibleFields(parsed, visiblePaths);

  parsed.server_checks = {
    schema_valid: true,
    gap_in_play: parsed.gap_in_play,
    needs_confirmation: parsed.needs_confirmation,
    visible_style_violations_cleaned: styleViolations
  };

  return parsed;
}

function validateM2Friction(parsed, userAnswer, gapInPlay) {
  const allowedStates = ['settled', 'clearing', 'turbid'];
  const visiblePaths = ['observation.surface_text'];

  if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON object');
  if (parsed.mechanism !== 'M2') throw new Error('Invalid mechanism');
  if (parsed.phase !== 'friction') throw new Error('Expected phase: friction');
  if (!parsed.state || !allowedStates.includes(parsed.state)) {
    throw new Error('Invalid state');
  }

  if (!parsed.tell || !allowedStates.includes(parsed.tell?.state)) {
    parsed.tell = { state: 'turbid', anchor_span: null };
  }
  if (!parsed.vintage || !allowedStates.includes(parsed.vintage?.state)) {
    parsed.vintage = { state: 'turbid', anchor_span: null };
  }
  if (gapInPlay) {
    if (!parsed.gap || !allowedStates.includes(parsed.gap?.state)) {
      parsed.gap = { state: 'turbid', anchor_span: null };
    }
  } else {
    delete parsed.gap;
  }

  // Verify all anchor spans are verbatim substrings of the answer.
  const norm = s => String(s || '').replace(/\s+/g, ' ').trim();
  const normAnswer = norm(userAnswer);
  const verifySpan = (obj, key) => {
    if (obj?.[key] && !normAnswer.includes(norm(obj[key]))) { obj[key] = null; return false; }
    return !!obj?.[key];
  };
  const tellAnchorOk    = verifySpan(parsed.tell, 'anchor_span');
  const vintageAnchorOk = verifySpan(parsed.vintage, 'anchor_span');
  const gapAnchorOk     = gapInPlay ? verifySpan(parsed.gap, 'anchor_span') : null;
  const obsAnchorOk     = verifySpan(parsed.observation, 'anchor_span');

  const styleViolations = findVisibleStyleViolations(parsed, visiblePaths);
  cleanVisibleFields(parsed, visiblePaths);

  parsed.server_checks = {
    schema_valid: true,
    tell_anchor_verified: tellAnchorOk,
    vintage_anchor_verified: vintageAnchorOk,
    ...(gapInPlay ? { gap_anchor_verified: gapAnchorOk } : {}),
    obs_anchor_verified: obsAnchorOk,
    visible_style_violations_cleaned: styleViolations
  };

  return parsed;
}

async function handleM2(request, env, corsHeaders) {
  const body = await request.json();
  const userLine      = String(body.user_line       || '').trim();
  const grapeName     = String(body.grape_name      || '').trim();
  const grapeRel      = String(body.grape_relationship || '').trim();
  const maturityClass = Number.isInteger(body.maturity_class) ? body.maturity_class : 0;

  if (!userLine) {
    return jsonResponse({ error: 'Missing user_line' }, 400, corsHeaders);
  }

  if (!body.user_answer) {
    // Phase A: problem recovery — no answer yet, recover the candidate problem.
    const sparkParse = body.spark_parse || null;
    const parsed = await callClaude(
      env,
      M2_DOCTRINE_PROBLEM,
      buildM2ProblemUserMessage(userLine, sparkParse, grapeName, grapeRel, maturityClass),
      600
    );
    return jsonResponse(validateM2Problem(parsed), 200, corsHeaders);
  }

  // Phase B: friction grading — confirmed problem + user answer both present.
  const confirmedProblem = String(body.confirmed_problem || '').trim();
  const userAnswer       = String(body.user_answer       || '').trim();
  const gapInPlay        = !!body.gap_in_play;

  if (!confirmedProblem) {
    return jsonResponse({ error: 'Missing confirmed_problem for friction phase' }, 400, corsHeaders);
  }

  const parsed = await callClaude(
    env,
    M2_DOCTRINE_FRICTION,
    buildM2FrictionUserMessage(confirmedProblem, grapeName, grapeRel, maturityClass, userAnswer, gapInPlay),
    700
  );
  return jsonResponse(validateM2Friction(parsed, userAnswer, gapInPlay), 200, corsHeaders);
}

function jsonResponse(body, status, corsHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

async function handleM0(request, env, corsHeaders) {
  const body = await request.json();
  const rawSpark = String(body.raw_spark || '').trim();
  const followupQuestion = String(body.followup_question || '').trim();
  const followupAnswer = String(body.followup_answer || '').trim();

  if (!rawSpark) {
    return jsonResponse({ error: 'Missing raw_spark' }, 400, corsHeaders);
  }

  const parsed = await callClaude(env, M0_DOCTRINE, buildM0UserMessage(rawSpark, followupQuestion, followupAnswer), 1200);

  // Scope gate — deterministic check before digestibility processing.
  // Only explicit non_software is rejected; unstated and vague sparks age normally.
  if (parsed?.spark_parse?.solution_is_software === 'non_software') {
    return jsonResponse({
      schema_version: parsed.schema_version || 'm0.v1',
      mechanism: 'M0',
      raw_spark: rawSpark,
      user_line_candidate: parsed.user_line_candidate || rawSpark,
      spark_parse: parsed.spark_parse,
      digestibility: { state: 'out_of_scope', missing: [], reason: '' },
      followup: { needed: false, question: null },
      m1_setup: null,
      scope: {
        in_scope: false,
        reason: 'This spark describes something that belongs in a different cellar. Corked ages software products built by solo builders. A non-software idea is not less valid, it ages somewhere else.'
      },
      server_checks: { schema_valid: true, scope_gated: true }
    }, 200, corsHeaders);
  }

  return jsonResponse(validateM0(parsed, rawSpark, followupAnswer), 200, corsHeaders);
}

async function handleM1(request, env, corsHeaders) {
  const body = await request.json();
  const sparkSummary = String(body.spark_summary || '').trim();
  const personName = String(body.person_name || '').trim();
  const relationship = String(body.relationship || '').trim();
  const maturityClass = Number.isInteger(body.maturity_class) ? body.maturity_class : 0;

  if (!sparkSummary || !personName) {
    return jsonResponse({ error: 'Missing required fields: spark_summary and person_name' }, 400, corsHeaders);
  }

  const combinedInput = [personName, relationship].filter(Boolean).join(' ');
  const parsed = await callClaude(
    env,
    M1_DOCTRINE,
    buildM1UserMessage(sparkSummary, maturityClass, personName, relationship)
  );
  return jsonResponse(validateM1(parsed, combinedInput), 200, corsHeaders);
}

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (request.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, corsHeaders);
    }

    try {
      if (url.pathname === '/m0') return await handleM0(request, env, corsHeaders);
      if (url.pathname === '/m1') return await handleM1(request, env, corsHeaders);
      if (url.pathname === '/m2') return await handleM2(request, env, corsHeaders);
      return jsonResponse({ error: 'Unknown route. Use /m0 or /m1.' }, 404, corsHeaders);
    } catch (err) {
      if (err instanceof Response) {
        const text = await err.text();
        return new Response(text, {
          status: err.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      return jsonResponse({ error: err.message }, 500, corsHeaders);
    }
  }
};
