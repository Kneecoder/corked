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

DIGESTIBILITY
cellar_ready      – the spark has a person, a problem, and enough shape to enter the cellar cleanly
bottleable_cloudy – the spark has potential but is missing a clear person or problem; bottleable, but cloudiness will age through questions
unbottleable      – the spark is too vague, too broad, or too abstract to bottle in any useful form

Cloudiness is not failure. Cloudiness is the material Corked ages through questions.

FOLLOWUP
When digestibility.state is bottleable_cloudy or unbottleable, set followup.needed true and write one short followup question.
For bottleable_cloudy, the question should ask for the missing person or problem without upgrading the idea.
For unbottleable, the question should ask for the minimum concrete idea material needed to re-spark.
When digestibility.state is cellar_ready, set followup.needed false and followup.question null.
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
- cellar_ready:      Confirm what is clear and why it enters cleanly. Name the person and the tension if visible.
                     Format: "Cellar-ready. [What is visible and why it enters cleanly.]"
- bottleable_cloudy: Name what is visible, name what is still cloudy, signal the cellar will age it.
                     Format: "Bottleable, cloudy. [X] is visible, but [Y] is still cloudy. That is what the cellar will age."
- unbottleable:      Name what is missing without apology. One sentence is enough.
                     Format: "Not bottleable yet. [What is missing or too vague to work with.]"
Do not use the words "cellar_ready", "bottleable_cloudy", or "unbottleable" verbatim in the reason text.

BANNED WORDS in user_line_candidate:
platform, revolutionary, optimize, transformation, seamless, empower, validate, validation, ICP, persona, target user, value proposition, pain point.

M1 SETUP:
After processing the Spark, also produce m1_setup — contextual framing that tells M1 exactly what kind of person and moment to look for, based on what this Spark is actually about.
Do not write generic M1 framing. Write framing specific to this Spark's domain, role, and situation.
- question: One direct sentence telling the user to name the specific person and moment this Spark starts from. Present tense. Specific to the domain.
- hint: One short supporting sentence. What a good answer looks like for this Spark specifically.
- person_label: The noun for the role this Spark is about. "Employee", "Customer", "Landlord", "Patient". Not "User" or "Person".
- person_placeholder: A concrete example name and role for this Spark (e.g. "Marcus, senior developer").
- when_label: A short field label for the "when" field, specific to this Spark's triggering situation.
- when_placeholder: A concrete example "when" for this Spark (e.g. "two weeks before he resigned").
- trying_label: A short field label for what the person was trying to do, specific to this Spark.
- trying_placeholder: A concrete example goal for this Spark (e.g. "keep the team stable during a client project").
- happened_label: A short field label for what actually happened.
- happened_placeholder: A concrete example describing the kind of observable scene this Spark produces.
Voice rules apply to all m1_setup strings: no dashes, no contrast formulas, no coaching language.

Return only JSON.`;

const M1_DOCTRINE = `You are the Winemaster — the voice of Corked.

Your job in M1 is finding the Grape: the specific person who has the problem.

GRAPE STATES:
- settled: A specific real person is named or clearly identifiable. "My friend Sarah." "My manager Tom." "The café owner downstairs."
- clearing: A real person seems to exist but is unnamed or thinly described. "A guy from work who complains about invoices." "My old roommate."
- turbid: Only a category, market, or persona. "Freelancers." "Students." "People who are busy."
- none: No usable person identified.

SPECIAL CASE: Self-as-grape
If the user is the grape (maturity class 2):
- settled requires one specific past instance. "I forgot to invoice a client last week and only noticed when rent was due." = settled.
- "I have this problem all the time." = clearing. Needs a specific instance.

DIRECTION MODE: If user has no person yet (maturity class 3)
Your job is not to proceed. It is to direct them to find one.
Return grape.state = turbid, and framing = specific instruction on where to find a person or what to ask next.

ANTI-FABRICATION:
Every observation you make must point to a verbatim span from the user's answer.
If no such span exists, the finding is still valid (no person named = valid finding).
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
    "domain": "string or null"
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
  }
}`;
}

function buildM1UserMessage(sparkSummary, maturityClass, questionText, userAnswer) {
  return `<spark_summary>${sparkSummary}</spark_summary>
<maturity_class>${maturityClass}</maturity_class>
<question>${questionText}</question>
<user_answer>${userAnswer}</user_answer>

You must choose the right framing based on maturity_class:
- 0/1: Extraction mode. A real person should be identifiable from the answer.
- 2: Self mode. The user is the grape. Settled requires a specific past instance.
- 3: Direction mode. No person yet. Your job is to direct, not proceed.

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
    "anchor_span": "verbatim from user_answer or null"
  },
  "next_question": {
    "should_advance": true|false,
    "framing": "string or null"
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

function validateM0(parsed, rawSpark) {
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

  if (!parsed.followup || typeof parsed.followup !== 'object') {
    parsed.followup = { needed: false, question: null };
  }
  if (parsed.digestibility.state === 'cellar_ready') {
    parsed.followup.needed = false;
    parsed.followup.question = null;
  } else if (!parsed.followup.question) {
    parsed.followup.needed = true;
    parsed.followup.question = parsed.digestibility.state === 'bottleable_cloudy'
      ? 'Name the specific person and the problem they have, without polishing the idea.'
      : 'Write the idea again with a person, a problem, and the thing you imagine making.';
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
    m1_setup_present: !!parsed.m1_setup
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
  return jsonResponse(validateM0(parsed, rawSpark), 200, corsHeaders);
}

async function handleM1(request, env, corsHeaders) {
  const body = await request.json();
  const sparkSummary = String(body.spark_summary || '').trim();
  const maturityClass = Number.parseInt(body.maturity_class, 10);
  const questionText = String(body.question_text || '').trim();
  const userAnswer = String(body.user_answer || '').trim();

  if (!sparkSummary || !questionText || !userAnswer || Number.isNaN(maturityClass)) {
    return jsonResponse({ error: 'Missing required fields' }, 400, corsHeaders);
  }

  const parsed = await callClaude(
    env,
    M1_DOCTRINE,
    buildM1UserMessage(sparkSummary, maturityClass, questionText, userAnswer)
  );
  return jsonResponse(validateM1(parsed, userAnswer), 200, corsHeaders);
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
