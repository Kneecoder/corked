// Headless batch runner — mirrors the chain logic in corked-runner.html
// (same endpoints, same order) but drives N sparks with no browser and
// writes one report file per spark, plus a summary index.
//
// Each SPARKS entry may carry:
//   raw_spark, maturity, grapeName, grapeRel        (as before)
//   answers: { m2, m3, m4, m5, m6, m7 }              (override placeholder answers per mech)
//   m0FollowupAnswer: string                         (used if M0 asks a followup; falls back to
//                                                      the auto-placeholder if absent)
//   wordsSource: 'real' | 'reconstructed'             (M6 words_source; default 'real')
//   expectHalt: true | false | 'maybe'                (drives PASS/FAIL framing in the summary)
//   note: string                                      (freeform — the assertion under test, echoed
//                                                      verbatim into the report for the later read)

const WORKER_URL = 'https://orked-m1-proxy.kneebonewebdesign.workers.dev';
const OUT_DIR = new URL('../corked-runner-output-2026-07-12/', import.meta.url);

const EL_META = {
  grape:   { name: 'Grape' },
  tell:    { name: 'Tell' },
  vintage: { name: 'Vintage' },
  gap:     { name: 'Gap' },
  echo:    { name: 'Echo' },
  limit:   { name: 'Limit' }
};
const EL_KEYS = Object.keys(EL_META);
const RANK = { inert: 0, turbid: 1, clearing: 2, settled: 3 };
const RANK_NAME = ['inert', 'turbid', 'clearing', 'settled'];

// ── Block A + Block B — Corked Phase 1 Test Battery (20 sparks) ────────────
const SHARED_SPARK = "An app for one-man trade businesses who forget to chase unpaid invoices until the money is a problem.";
const NOOR = { grapeName: 'Noor', grapeRel: 'my friend, runs a one-woman landscaping business' };

const SPARKS = [
  // 1. Control — everything settles
  {
    raw_spark: "An app for wedding photographers who lose their deposit when couples cancel two days before the shoot.",
    maturity: 0, grapeName: 'Lena', grapeRel: 'my cousin, she shoots weddings',
    answers: {
      m2: "Last Saturday a couple cancelled on Thursday night. Lena spent the morning re-reading her contract clause, then wrote off the deposit and blocked the date in her calendar anyway.",
      m3: "My colleague Jordan, another wedding photographer, told me last month he now takes half the fee upfront through a payment link after a March cancellation burned him.",
      m4: "Priya, a wedding caterer I met at a market, keeps a paper deposit ledger per event. For her the pain is cancellations inside 48 hours, the payment part is fine.",
      m5: "Lena uses a HoneyBook contract template, but it stores no card on file, so when the couple ghosted there was nothing to charge.",
      m6: "\"I am done being the bad guy about deposits,\" she said after the March one.",
      m7: "Rob shoots corporate headshots on retainer for two agencies. Cancellations cost him nothing because the retainer bills monthly whether shoots happen or not."
    },
    expectHalt: false,
    note: "Control — everything settles. Expect: cellar_ready, problem_forced_verbatim true, needs_confirmation false, gap_in_play false (no gap bar in M2 response). All six elements settled by M7. M4 contrast: is_different_kind \"true\", same_or_different \"different\". Zero substitution flags, zero anomalies."
  },
  // 2. gap_in_play true
  {
    raw_spark: "A tool for freelance designers because Moneybird's payment reminders only go out after an invoice is already two weeks overdue.",
    maturity: 0, grapeName: 'Sanne', grapeRel: 'my old classmate, freelance designer',
    answers: {
      m2: "Two Fridays ago Sanne opened Moneybird, saw the reminder for the Bakker invoice had only just gone out on day 15, and called the client herself while it was still on screen.",
      m3: "My colleague Jordan, another freelance designer, told me last month he now sends his own manual reminder on day three because he can't wait two weeks for the system to catch it.",
      m4: "Priya, a bookkeeper I met at a workshop, keeps a spreadsheet that flags anything unpaid after a week. For her the pain is matching payments to invoices, the reminder timing part is fine.",
      m5: "Sanne uses Moneybird's built-in reminder schedule, but it only fires at the two-week mark, so by then the client has already forgotten the invoice existed.",
      m6: "\"I am done chasing money like it's my fault,\" she said after the Bakker one.",
      m7: "Owen does retainer illustration work for two agencies. Late payments cost him nothing because the retainer bills monthly whether projects ship or not."
    },
    expectHalt: false,
    note: "gap_in_play true. Expect: Phase A sets gap_in_play true (tool named plus failure). M2 grades three bars; gap settles from the answer, not the spark text. Floor rule holds."
  },
  // 3. Solution-language spark, class 1 direction door
  {
    raw_spark: "A better scheduling app for gym owners.",
    maturity: 1, grapeName: 'Marco', grapeRel: 'owns the boxing gym where I train',
    m0FollowupAnswer: "Marco double-books the 6pm slot and members show up to a class that is already full.",
    answers: {
      m2: "Marco walked me through last Tuesday: two members arrived for the 18:00 class he had already filled. He refunded one at the front desk and comped the other a personal training session.",
      m3: "My friend Priya, who runs a yoga studio, told me last month she started capping sign-ups in a shared spreadsheet after a similar double-booking during a holiday rush.",
      m4: "Owen, a barber who takes walk-ins, keeps a paper appointment book by the chair. For him the pain is no-shows, the overbooking part is fine.",
      m5: "Marco uses a shared Google Calendar for the class roster, but it doesn't stop two people from claiming the same slot if they both edit it around the same time.",
      m6: "\"I hate turning people away at the door,\" he said after the Tuesday one.",
      m7: "Jordan runs one-on-one training sessions only, no group classes. Double-booking never happens to him because every slot has exactly one client."
    },
    expectHalt: false,
    note: "Solution-language spark, class 1 direction door. Expect: first pass bottleable_cloudy (person visible, no problem), followup fires, re-bottle lands cellar_ready or cloudy-with-problem. M2 question uses the direction door: no \"think of the last time\" / \"describe the moment\" phrasing. The told-not-watched moment grades settled."
  },
  // 4. Scope gate, explicit non-software
  {
    raw_spark: "A sourdough bakery subscription for my street.",
    maturity: 1, grapeName: '', grapeRel: '',
    expectHalt: true,
    note: "Scope gate, explicit non-software. Expect: out_of_scope, scope_gated true, scope reason present, no followup, no downstream calls. Clean halt."
  },
  // 5. Scope asymmetry probe — doctrine tension, either outcome is a finding
  {
    raw_spark: "A bookstore for homeless people where you pay with cans.",
    maturity: 3, grapeName: '', grapeRel: '',
    expectHalt: 'maybe',
    note: "Scope asymmetry probe — doctrine tension, either outcome is a finding. Expect one of two outcomes, both worth recording verbatim: (a) Out of scope — \"bookstore\" read as physical store, meaning M0 doctrine's own canonical thin-spark example is unreachable behind the scope gate (a doctrine note for v46, not a code bug); or (b) passes as thin — then assert suspected_problem null, m1_placeholders_nulled true, followup uses only spark nouns (books, cans — never literacy, barter, recycling, currency)."
  },
  // 6. Unbottleable rescue guard
  {
    raw_spark: "Something that makes life easier.",
    maturity: 1, grapeName: '', grapeRel: '',
    m0FollowupAnswer: "It's for freelancers.",
    expectHalt: true,
    note: "Unbottleable rescue guard. Expect: unbottleable on first pass. Followup supplies a person only (no domain, no problem), so unbottleable_rescue_blocked true and state stays unbottleable. Chain halts. If it re-bottles, the rescue guard has a hole."
  },
  // 7. Compress-may-not-upgrade, register hold
  {
    raw_spark: "an app for my sister Marieke because customers are annoying with payments at her flower stall",
    maturity: 0, grapeName: 'Marieke', grapeRel: 'my sister',
    answers: {
      m2: "Last Saturday a regular customer paid with a card that declined twice at the stall, and Marieke just waved her off with the flowers anyway, saying she'd sort it out later.",
      m3: "My friend Owen, who runs a farm stand, told me last month he started keeping a paper IOU pad after a similar situation with a regular.",
      m4: "Priya, a food truck owner I met at the market, keeps a card reader as backup for exactly this. For her the pain is spotty signal, the payment method itself is fine.",
      m5: "Marieke uses a basic card reader clipped to her apron, but it has no offline mode, so a bad signal at the stall means she can't charge anything at all.",
      m6: "\"I just want people to pay and go,\" she said after the declined-card one.",
      m7: "Jordan sells only pre-paid subscription flower boxes online. Payment problems at the point of sale never happen to him because nothing is sold in person."
    },
    expectHalt: false,
    note: "Compress-may-not-upgrade, register hold. Expect: user_line_candidate keeps \"annoying with payments\" or very close; no operationalised synonyms (late, difficult, unreliable = fail), no introduced nouns. person_in_spark settled (name plus tie). M1 grape settled."
  },
  // 8. Sanitizer mutation probe — proven-bug regression
  {
    raw_spark: "A tool for landlords because tenants do not just pay late, they pay in random partial chunks nobody can reconcile.",
    maturity: 0, grapeName: 'Bram', grapeRel: 'my uncle, owns four rental flats',
    answers: {
      m2: "Last month a tenant sent three separate partial payments across two weeks, and Bram spent Sunday night matching bank transfers to the lease spreadsheet by hand.",
      m3: "My neighbor Tom, who rents out a duplex, told me last month he started asking for one lump sum only after a similar reconciling headache.",
      m4: "Priya, who runs a small storage unit business, keeps a manual ledger for partial payments too. For her the pain is chasing the balance down, the reconciling part is fine.",
      m5: "Bram uses a shared spreadsheet to track rent, but it has no way to flag a partial payment against the wrong month, so mismatches pile up.",
      m6: "\"I just want one number a month, not a puzzle,\" he said after the Sunday one.",
      m7: "Owen only rents to corporate tenants on annual leases paid in full upfront. Partial payments never happen to him because the whole year is billed at once."
    },
    expectHalt: false,
    note: "Sanitizer mutation probe — proven-bug regression. Record user_line_candidate verbatim. cleanVisibleText strips \"not just\", which can turn \"do not just pay late\" into \"do pay late\" — a meaning inversion. If the line mutates, the known sanitizer bug has regressed into user-facing text. If M0 rephrases to avoid the construction while keeping both facts (late AND partial), that is a pass."
  },
  // 9. Cap-edge verbose problem
  {
    raw_spark: "A tool for physiotherapists in small practices because every time an insurer rejects a claim over a mismatched treatment code the physio has to dig the original referral letter out of one system, cross-check the code list in a second system, rewrite the claim line by line in the insurer portal, and then remember to follow up two weeks later to see if it went through this time, and nobody in a two-person practice has a spare afternoon for that every single week.",
    maturity: 0, grapeName: 'Ilse', grapeRel: 'my physio, runs a two-person practice',
    answers: {
      m2: "Last Tuesday an insurer rejected a claim over a mismatched code, and Ilse spent her lunch break digging out the referral letter and rewriting the claim line by line in the portal.",
      m3: "My friend Jordan, who runs a small dental practice, told me last month he started keeping a printed code cheat-sheet after a similar rejection.",
      m4: "Priya, a massage therapist I met at a conference, keeps a folder of past approved claims to copy from. For her the pain is the follow-up timing, the coding part is fine.",
      m5: "Ilse uses the insurer's own portal to resubmit claims, but it has no way to flag which codes were previously rejected, so the same mismatch can happen twice.",
      m6: "\"I don't have a spare afternoon for this every week,\" she said after the Tuesday one.",
      m7: "Owen works purely on a cash-pay basis with no insurance billing at all. Claim rejections never happen to him because there are no claims to submit."
    },
    expectHalt: false,
    note: "Cap-edge verbose problem. Expect: either M0 compresses suspected_problem under the 300-char field cap and the chain runs, or a downstream call 400s on \"spark_parse.suspected_problem exceeds max length\". The second outcome means legitimate verbose input kills the chain — a sturdiness finding to fix, not user error."
  },
  // 10. M3 category rule, then M4 rank-up
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: 'Tomas', grapeRel: 'my neighbour, carpenter with a one-man business',
    answers: {
      m2: "Last month Tomas finished a kitchen cabinet job and didn't send the invoice until three weeks later, by which point the client had already spent the budget elsewhere and paid him in installments.",
      m3: "Lots of tradesmen I know just keep it in their heads or a notebook.",
      m4: "Priya, who runs a catering van, showed me the whiteboard in her kitchen last week where she crosses off paid jobs. For her it is deposits going missing, the chasing part she has under control.",
      m5: "Tomas uses a paper invoice pad from the hardware store, but it has no reminder system at all, so following up depends entirely on him remembering.",
      m6: "\"I just want the money to show up without me having to ask twice,\" he said after the cabinet job.",
      m7: "Priya works only through a property management company that pays a fixed monthly retainer. Chasing invoices never happens to her because the retainer is automatic."
    },
    expectHalt: false,
    note: "M3 category rule, then M4 rank-up. Expect: M3 echo clearing, never settled — the named workaround does not rescue the category; observation names a population, not a person. M4 echo settled, so element history shows clearing -> settled with no regression. M4 contrast fields are strings: is_different_kind \"true\", same_or_different \"different\" (the boolean-wipe bug check)."
  },
  // 11. M3 grape exclusion — plus one doctrine corner to record
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: 'Femke', grapeRel: 'my sister-in-law, photographer',
    answers: {
      m2: "Last month Femke finished a wedding shoot and didn't invoice until three weeks later, by which point the couple had already spent their budget on the honeymoon.",
      m3: "Femke started adding a 30 percent booking fee in January after two no-shows in one month.",
      m4: "Priya, who runs a catering van, showed me the whiteboard in her kitchen last week where she crosses off paid jobs. For her it is deposits going missing, the chasing part she has under control.",
      m5: "Femke uses a basic invoicing app, but it has no automatic reminders, so nothing chases the client but her own memory.",
      m6: "\"I hate having to be the one who asks for money,\" she said after the honeymoon one.",
      m7: "Owen works only through an agency that invoices clients on his behalf. Chasing payments never happens to him because the agency handles it."
    },
    expectHalt: false,
    note: "M3 grape exclusion — plus one doctrine corner to record. Expect: echo turbid despite the concrete behaviour and moment — every person in the answer is the grape. Corner to record: does Vintage rank up opportunistically off this grape-only moment while echo goes turbid? Doctrine says Vintage grades when the answer carries a moment; it does not say whose. Log the result either way; this is a doctrine call waiting to be made, not a bug."
  },
  // 12. Class 2 self battery
  {
    raw_spark: "An app to stop myself doomchecking my bank balance at the end of every month.",
    maturity: 2, grapeName: 'Jamie', grapeRel: "Last month I checked my balance eleven times on the 28th while one client invoice sat unpaid.",
    answers: {
      m2: "Last month on the 28th, right before rent was due, I opened my banking app for the eleventh time that day instead of finishing the invoice I still hadn't sent, and gave up and closed the app without doing either.",
      m3: "I built a spreadsheet that projects the month forward, I check that instead now.",
      m4: "My friend Daniel, who freelances in video, told me in April he moved every client to 50 percent upfront after one late payer wrecked his rent month.",
      m5: "I use a budgeting app, but it only shows last month's picture, nothing about the invoice that has not landed yet.",
      m6: "I caught myself saying out loud, \"I can't look at it again until the Bakker invoice lands.\"",
      m7: "My uncle does the same kind of work but only takes retainer clients, so his balance is flat and boring. He is paid whether the work moves or not."
    },
    expectHalt: false,
    note: "Class 2 self battery. Expect: M1 self-mode settled (concrete instance present). M3 echo turbid — the Echo can never be the speaker; observation pivots away from self. M4 settled (separate person satisfies self mode). M5 settled — self's own current tool is the one place self counts as Gap material, and the founder's own build exclusion does not fire on a budgeting app he did not build. M6 response omits the echo field entirely; record how the words bar grades a self-quote (mild corner, real exchange with oneself). M7 settled."
  },
  // 13. Substitution rule, M2 — with secondary M6 probe
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: 'Daan', grapeRel: 'my former colleague, wedding DJ',
    answers: {
      m2: "I would build a Supabase table of bookings with a webhook that flags cancellations and auto-generates the deposit invoice before the date frees up.",
      m3: "My friend Owen, another wedding DJ, told me last month he started requiring signed contracts after a similar cancellation dispute.",
      m4: "Priya, a wedding florist I met through a vendor group, keeps a deposit tracking spreadsheet too. For her the pain is last-minute order changes, the deposit part is fine.",
      m5: "Daan uses a plain email thread to track bookings and cancellations, but nothing flags when a cancellation actually happens, so he has to notice it himself.",
      m6: "What she basically means is that the admin side makes her feel unprofessional.",
      m7: "Jordan only DJs corporate events booked through an agency on annual contract. Cancellations never cost him anything because the agency guarantees the booking."
    },
    expectHalt: false,
    note: "Substitution rule, M2 — with secondary M6 probe. Expect: M2 substitution_detected true, tell turbid (no grape behaviour referenced at all), overall turbid. Observation names what was described and what was asked for, nothing more — no interpretation, no named avoidance. Secondary: M6 words turbid — the builder's framing presented as the grape's meaning is not language from the grape."
  },
  // 14. M4 prior-echo exclusion
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: NOOR.grapeName, grapeRel: NOOR.grapeRel,
    answers: {
      m2: "Last month Noor finished a hedge-trimming job and didn't send the invoice for two weeks, by which point she'd forgotten the exact hours and had to guess the total.",
      m3: "My colleague Jordan pays a VA every month to chase his invoices. He set it up in February after a client stiffed him for six weeks.",
      m4: "There's a guy at my office who just has an assistant handle all his invoice chasing every month.",
      m5: "Noor uses a paper receipt book for jobs, but it has no way to flag which jobs are still unpaid, so invoices slip through unnoticed.",
      m6: "\"I just want to send it and forget it,\" she said after the two-week one.",
      m7: "Priya only does fixed-price maintenance contracts billed automatically each month. Invoice chasing never happens to her because nothing is billed per job."
    },
    expectHalt: false,
    note: "M4 prior-echo exclusion. Expect: M3 settled. M4 echo clearing — same person rephrased is not a second person; contrast fields \"unclear\". Confirm prior_echo_context was populated from the M3 answer in the M4 request."
  },
  // 15. M2 tell clearing, vintage unanchored — the most common real answer shape
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: NOOR.grapeName, grapeRel: NOOR.grapeRel,
    answers: {
      m2: "She gets really stressed about it whenever a client goes quiet, and usually she just puts off looking at the numbers."
    },
    expectHalt: false,
    note: "M2 tell clearing, vintage unanchored — the most common real answer shape. Expect: tell clearing (emotion in place of behaviour), vintage clearing (\"whenever\" is recurring, unanchored), overall clearing. A swirl should plausibly fire; log its kind and question, do not answer it. (m3-m7 not specified by the brief — left on generic settled-quality placeholders since they are not under test here.)"
  },
  // 16. M5 one leg — with secondary M7 probe
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: NOOR.grapeName, grapeRel: NOOR.grapeRel,
    answers: {
      m5: "She uses Moneybird.",
      m7: "Agency photographers probably don't have this."
    },
    expectHalt: false,
    note: "M5 one leg — with secondary M7 probe. Expect: M5 gap clearing — named solution, no failure point. M7 limit clearing — a who without a why, and a loose category rather than a bounded group. (m2, m3, m4, m6 not specified by the brief — left on generic settled-quality placeholders.)"
  },
  // 17. M5 own-build substitution
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: NOOR.grapeName, grapeRel: NOOR.grapeRel,
    answers: {
      m5: "Right now there's my prototype. It catches maybe half the cases but the reminder logic is still flaky."
    },
    expectHalt: false,
    note: "M5 own-build substitution. Expect: gap turbid regardless of how precisely the shortcomings are described — the founder's own build is never a valid existing fix. substitution_detected true. (m2, m3, m4, m6, m7 not specified by the brief — left on generic settled-quality placeholders.)"
  },
  // 18. M6 reconstructed cap — hard rule
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: NOOR.grapeName, grapeRel: NOOR.grapeRel,
    wordsSource: 'reconstructed',
    answers: {
      m6: "\"I honestly cannot look at my bank app in week four, it makes me sick,\" is basically what she would say."
    },
    expectHalt: false,
    note: "M6 reconstructed cap — hard rule. Expect: words clearing, never settled, no matter how vivid the quote. Echo bar forced turbid (words_source is not real). Observation notes the reconstruction without coaching toward what a real exchange would earn. (m2-m5, m7 not specified by the brief — left on generic settled-quality placeholders.)"
  },
  // 19. M7 universality — with secondary M6 probe
  {
    raw_spark: SHARED_SPARK,
    maturity: 0, grapeName: NOOR.grapeName, grapeRel: NOOR.grapeRel,
    answers: {
      m7: "Honestly every freelancer has this. I can't think of a single one who doesn't.",
      m6: "We talked about it over coffee last Friday and she confirmed the month-end thing is her biggest headache."
    },
    expectHalt: false,
    note: "M7 universality — with secondary M6 probe. Expect: M7 limit turbid — asserting universality is a turbid answer, not a strong one. Secondary: M6 words clearing — a real exchange happened but the answer contains no actual language from it. (m2-m5 not specified by the brief — left on generic settled-quality placeholders.)"
  },
  // 20. Class 3 FIND path
  {
    raw_spark: "A mobile app for allotment gardeners to swap surplus vegetables.",
    maturity: 3, grapeName: '', grapeRel: '',
    m0FollowupAnswer: "Vegetables rot on the plot before anyone finds out who has surplus and who wants some, because there's no shared way to see it.",
    expectHalt: true,
    note: "Class 3 FIND path. Expect: chain stops after M0, one /field call in find mode. The brief must not assert a problem the spark never stated, target drawn from the spark's own nouns (gardeners, vegetables, allotment), question open and past-anchored, no pitch, no \"would you use\". A generic \"ask them about their workflow\" brief is a fail."
  }
];

async function callWorker(path, body) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 30000);
  try {
    const res = await fetch(WORKER_URL + path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch { data = { error: 'Non-JSON response from worker', raw: text }; }
    return { ok: res.ok && !data.error, status: res.status, data };
  } catch (err) {
    const msg = err.name === 'AbortError' ? 'Request timed out (30s).' : ('Network error: ' + err.message);
    return { ok: false, status: 0, data: { error: msg } };
  } finally {
    clearTimeout(timer);
  }
}

function buildPlaceholderAnswer(mech, grapeName) {
  const g = grapeName || 'they';
  switch (mech) {
    case 'M2': return 'Last Tuesday, right before a deadline, ' + g + ' tried the usual approach and it broke down at the same point it always does. ' + g + ' gave up partway through and fell back to a plain spreadsheet, because the thing they normally use for this does not catch it in time.';
    case 'M3': return 'Last month, my colleague Jordan mentioned he hits this same thing and just pays a freelancer to sort it out whenever it comes up.';
    case 'M4': return 'A friend named Priya, who works in a completely different setup, said she keeps a manual backup log for it, though for her it shows up a little differently.';
    case 'M5': return 'Right now ' + g + ' uses a plain spreadsheet template to track it, but it does not catch the problem until it is already too late.';
    case 'M6': return '"I just want this part to be boring," ' + g + ' said, when we talked about it last week.';
    case 'M7': return 'My uncle does the same kind of work but only ever takes retainer clients, so this never happens to him. He is paid whether the job happens or not.';
    default: return '';
  }
}
function buildM0FollowupPlaceholder(data) {
  const sp = data.spark_parse || {};
  const person = sp.implied_person || 'a specific person';
  const problem = sp.suspected_problem || 'something concrete keeps going wrong for them';
  return 'The person is ' + person + '. The problem: ' + problem + '.';
}
function mechEndpoint(mech) {
  return { M1: '/m1', M2: '/m2', M3: '/m3', M4: '/m4', M5: '/m5', M6: '/m6', M7: '/m7' }[mech];
}
function buildMechRequest(mech, answerText, R) {
  switch (mech) {
    case 'M1': return { spark_summary: R.userLine, person_name: R.grapeName, relationship: answerText, maturity_class: R.maturity };
    case 'M2': return { user_line: R.userLine, grape_name: R.grapeName, grape_relationship: R.grapeRel, maturity_class: R.maturity, confirmed_problem: R.confirmedProblem, gap_in_play: R.gapInPlay, user_answer: answerText };
    case 'M3': return { confirmed_problem: R.confirmedProblem, grape_name: R.grapeName, grape_relationship: R.grapeRel, maturity_class: R.maturity, user_answer: answerText };
    case 'M4': return { confirmed_problem: R.confirmedProblem, grape_name: R.grapeName, grape_relationship: R.grapeRel, maturity_class: R.maturity, prior_echo_context: (R.answers.M3 || '').slice(0, 300), user_answer: answerText };
    case 'M5': return { confirmed_problem: R.confirmedProblem, grape_name: R.grapeName, grape_relationship: R.grapeRel, maturity_class: R.maturity, user_answer: answerText };
    case 'M6': return { confirmed_problem: R.confirmedProblem, grape_name: R.grapeName, grape_relationship: R.grapeRel, maturity_class: R.maturity, words_source: R.wordsSource, user_answer: answerText };
    case 'M7': return { confirmed_problem: R.confirmedProblem, grape_name: R.grapeName, grape_relationship: R.grapeRel, maturity_class: R.maturity, user_answer: answerText };
  }
}

function rankName(rank) { return RANK_NAME[rank] != null ? RANK_NAME[rank] : 'inert'; }

// Mirrors corked_v6.html's rankUp(): the client, not the (stateless) worker,
// is the thing enforcing the floor rule. Each mechanism's bar grade is applied
// only if it outranks the element's current state (or the element was still
// inert). A lower-ranked grade is recorded for transparency but never lowers
// the tracked element — matching production, this makes a floor violation
// structurally impossible here; it would only fire if this function itself
// had a bug.
function setElementState(R, key, mech, offeredState) {
  const rec = R.elements[key];
  rec.rawGrades = rec.rawGrades || [];
  rec.rawGrades.push({ mech, offeredState });
  const prevRank = RANK[rec.state] != null ? RANK[rec.state] : 0;
  const newRank = RANK[offeredState] != null ? RANK[offeredState] : 0;
  let applied = rec.state;
  if (newRank > prevRank) applied = offeredState;
  else if (rec.state === 'inert') applied = 'turbid';
  if (newRank < prevRank) {
    R.floorNotes.push(mech + ' offered ' + offeredState + ' for ' + EL_META[key].name + ', held at floor ' + rec.state + ' (opportunistic grading correctly did not lower it).');
  }
  const before = rec.state;
  rec.state = applied;
  if (applied !== before) rec.history.push(applied);
  rec.mech = mech;
  return before !== applied;
}

function applyEvidenceBars(mech, data, barMap, R) {
  const changed = [];
  for (const bar in barMap) {
    const key = barMap[bar];
    if (key === null) continue;
    const barObj = data[bar];
    if (!barObj || !barObj.state) continue;
    if (setElementState(R, key, mech, barObj.state)) changed.push(EL_META[key].name);
  }
  return changed;
}
function applyMechResult(mech, data, R) {
  if (mech === 'M1') {
    const st = data && data.grape ? data.grape.state : null;
    if (st) { return setElementState(R, 'grape', 'M1', st) ? ['Grape'] : []; }
    return [];
  }
  if (mech === 'M2') return applyEvidenceBars('M2', data, { tell: 'tell', vintage: 'vintage', gap: R.gapInPlay ? 'gap' : null }, R);
  if (mech === 'M3') return applyEvidenceBars('M3', data, { echo: 'echo', vintage: 'vintage' }, R);
  if (mech === 'M4') return applyEvidenceBars('M4', data, { echo: 'echo', vintage: 'vintage' }, R);
  if (mech === 'M5') return applyEvidenceBars('M5', data, { gap: 'gap' }, R);
  if (mech === 'M6') return applyEvidenceBars('M6', data, { tell: 'tell', echo: R.maturity === 2 ? null : 'echo' }, R);
  if (mech === 'M7') return applyEvidenceBars('M7', data, { limit: 'limit' }, R);
}
function summarize(mech, data, changed) {
  const state = data.state || data.outcome || (data.grape && data.grape.state) || '-';
  const sub = ('substitution_detected' in data) ? data.substitution_detected : 'n/a';
  const swirl = data.swirl ? 'yes' : 'no';
  return 'state=' + state + ' · substitution_detected=' + sub + ' · swirl=' + swirl + ' · changed=[' + ((changed || []).join(', ') || 'none') + ']';
}

// ── Global assertion checks (mechanical / structural only — doctrine-level
// judgment calls about prose quality are left for the human read of the
// generated reports) ────────────────────────────────────────────────────────

const VOICE_DASH_RE = /[—–]/; // em dash, en dash
const VOICE_CONTRAST_RE = /\bnot\s+just\b|\bnot\b[^.?!\n]{0,80}\bbut\b/i;

function scanVoiceViolations(R, mech, data) {
  const stack = [{ path: mech, val: data }];
  while (stack.length) {
    const { path, val } = stack.pop();
    if (val == null) continue;
    if (typeof val === 'string') {
      if (VOICE_DASH_RE.test(val)) R.anomalies.push('VOICE: em/en dash found at ' + path + ': "' + val + '"');
      if (VOICE_CONTRAST_RE.test(val)) R.anomalies.push('VOICE: contrast-formula ("not X but Y" / "not just X") found at ' + path + ': "' + val + '"');
    } else if (Array.isArray(val)) {
      val.forEach((v, i) => stack.push({ path: path + '[' + i + ']', val: v }));
    } else if (typeof val === 'object') {
      for (const k in val) stack.push({ path: path + '.' + k, val: val[k] });
    }
  }
}

function checkSubstitutionFlag(R, mech, data) {
  if (!('substitution_detected' in data)) return;
  if (typeof data.substitution_detected !== 'boolean') {
    R.anomalies.push('ASSERTION FAIL: ' + mech + ' substitution_detected is not a boolean (' + JSON.stringify(data.substitution_detected) + ')');
  }
}

function checkGapBarConsistency(R, data) {
  const hasGap = 'gap' in data;
  if (hasGap !== R.gapInPlay) {
    R.anomalies.push('ASSERTION FAIL: M2 gap bar presence (' + hasGap + ') does not match gap_in_play (' + R.gapInPlay + ')');
  }
}

function checkM6EchoOmission(R, data) {
  const hasEcho = 'echo' in data;
  if (R.maturity === 2 && hasEcho) R.anomalies.push('ASSERTION FAIL: M6 echo bar present despite self mode (maturity_class 2)');
  if (R.maturity !== 2 && !hasEcho) R.anomalies.push('ASSERTION FAIL: M6 echo bar missing despite non-self mode (maturity_class ' + R.maturity + ')');
}

function checkOverallStatePrimary(R, mech, data) {
  if (typeof data.state !== 'string') return;
  let expected = null;
  if (mech === 'M2') {
    const bars = ['tell', 'vintage'].concat(R.gapInPlay ? ['gap'] : []);
    const ranks = bars.map(b => (data[b] && RANK[data[b].state] != null) ? RANK[data[b].state] : null).filter(r => r !== null);
    if (ranks.length) expected = rankName(Math.min(...ranks));
  } else if (mech === 'M3' || mech === 'M4') {
    expected = data.echo && data.echo.state;
  } else if (mech === 'M5') {
    expected = data.gap && data.gap.state;
  } else if (mech === 'M6') {
    expected = data.words && data.words.state;
  } else if (mech === 'M7') {
    expected = data.limit && data.limit.state;
  }
  if (expected && expected !== data.state) {
    R.anomalies.push('ASSERTION FAIL: ' + mech + ' overall state "' + data.state + '" does not equal primary bar state "' + expected + '"');
  }
}

function checkAnchorFabrication(R, mech, data) {
  const stack = [{ path: mech, val: data }];
  while (stack.length) {
    const { path, val } = stack.pop();
    if (val == null || typeof val !== 'object') continue;
    if (Array.isArray(val)) { val.forEach((v, i) => stack.push({ path: path + '[' + i + ']', val: v })); continue; }
    if (val._anchor_verification_failed) {
      R.anomalies.push('NOTE: ' + path + ' anchor_span failed verbatim verification and was server-corrected to null (model attempted fabrication).');
    }
    for (const k in val) stack.push({ path: path + '.' + k, val: val[k] });
  }
}

function runAssertions(R, mech, data) {
  scanVoiceViolations(R, mech, data);
  checkAnchorFabrication(R, mech, data);
  if (['M2', 'M3', 'M4', 'M5', 'M6', 'M7'].includes(mech)) checkSubstitutionFlag(R, mech, data);
  if (mech === 'M2') checkGapBarConsistency(R, data);
  if (mech === 'M6') checkM6EchoOmission(R, data);
  if (['M2', 'M3', 'M4', 'M5', 'M6', 'M7'].includes(mech)) checkOverallStatePrimary(R, mech, data);
}

function makeR(cfg) {
  const R = {
    workerUrl: WORKER_URL, raw_spark: cfg.raw_spark, maturity: cfg.maturity,
    grapeName: cfg.grapeName || '', grapeRel: cfg.grapeRel || '',
    wordsSource: cfg.wordsSource === 'reconstructed' ? 'reconstructed' : 'real',
    m0: null, userLine: '', sparkParse: null, domain: '',
    gapInPlay: false, confirmedProblem: '', answers: {}, log: [], anomalies: [], floorNotes: [], halted: false,
    elements: {}
  };
  EL_KEYS.forEach(k => R.elements[k] = { state: 'inert', history: ['inert'], mech: null });
  return R;
}
function logEntry(R, entry) {
  entry.ts = new Date().toISOString();
  R.log.push(entry);
}
function halt(R, msg) { R.halted = true; R.haltMsg = msg; }

async function runOne(cfg, idx) {
  const R = makeR(cfg);

  // M0
  let res = await callWorker('/m0', { raw_spark: R.raw_spark });
  if (!res.ok) {
    logEntry(R, { mech: 'M0', endpoint: '/m0', kind: 'main', request: { raw_spark: R.raw_spark }, response: res.data, summary: 'ERROR ' + res.status });
    halt(R, 'M0 request failed: ' + (res.data && res.data.error));
    return R;
  }
  let data = res.data;
  logEntry(R, { mech: 'M0', endpoint: '/m0', kind: 'main', request: { raw_spark: R.raw_spark }, response: data,
    summary: 'digestibility=' + (data.digestibility && data.digestibility.state) + ' · in_scope=' + (data.scope ? data.scope.in_scope !== false : true) + ' · followup_needed=' + !!(data.followup && data.followup.needed) });
  runAssertions(R, 'M0', data);

  if (data.scope && data.scope.in_scope === false) {
    R.anomalies.push('M0: flagged out_of_scope (non_software).');
    halt(R, 'Out of scope (non-software spark) — expected worker behaviour.');
    return R;
  }
  R.m0 = data;
  R.userLine = data.user_line_candidate || R.raw_spark;
  R.sparkParse = data.spark_parse || null;
  R.domain = (data.spark_parse && data.spark_parse.domain) || '';

  if (data.followup && data.followup.needed) {
    const followupAnswer = cfg.m0FollowupAnswer || buildM0FollowupPlaceholder(data);
    const req2 = { raw_spark: R.raw_spark, followup_question: data.followup.question || '', followup_answer: followupAnswer, prior_digestibility: data.digestibility.state };
    const res2 = await callWorker('/m0', req2);
    if (!res2.ok) {
      logEntry(R, { mech: 'M0', endpoint: '/m0 (followup)', kind: 'main', request: req2, response: res2.data, summary: 'ERROR ' + res2.status });
      halt(R, 'M0 followup request failed.');
      return R;
    }
    logEntry(R, { mech: 'M0', endpoint: '/m0 (followup)', kind: 'main', request: req2, response: res2.data, summary: '[re-bottled] digestibility=' + (res2.data.digestibility && res2.data.digestibility.state) });
    runAssertions(R, 'M0-followup', res2.data);
    if (res2.data.scope && res2.data.scope.in_scope === false) {
      halt(R, 'Out of scope after followup.');
      return R;
    }
    R.m0 = res2.data;
    R.userLine = res2.data.user_line_candidate || R.userLine;
    R.sparkParse = res2.data.spark_parse || R.sparkParse;
    if (res2.data.digestibility && res2.data.digestibility.state === 'unbottleable') {
      halt(R, 'M0 remained unbottleable after followup.');
      return R;
    }
  }

  if (R.maturity === 3) {
    const req = { mode: 'find', user_line: R.userLine, spark_parse: R.sparkParse, maturity_class: R.maturity, missing: 'grape', grape_name: '', grape_relationship: '', confirmed_problem: '', element: null };
    const fres = await callWorker('/field', req);
    logEntry(R, { mech: 'M1', endpoint: '/field', kind: 'park', request: req, response: fres.data,
      summary: fres.ok ? ('brief target="' + ((fres.data.brief && fres.data.brief.target) || '') + '"') : ('ERROR ' + fres.status) });
    halt(R, 'Maturity class 3: chain stops after M0 (routes to "find a person" park screen), matching real client behaviour.');
    return R;
  }

  // M1
  const m1req = { spark_summary: R.userLine, person_name: R.grapeName, relationship: R.grapeRel, maturity_class: R.maturity };
  res = await callWorker('/m1', m1req);
  if (!res.ok) {
    logEntry(R, { mech: 'M1', endpoint: '/m1', kind: 'main', request: m1req, response: res.data, summary: 'ERROR ' + res.status });
    halt(R, 'M1 request failed.');
    return R;
  }
  R.answers.M1 = R.grapeRel;
  let changed = applyMechResult('M1', res.data, R);
  logEntry(R, { mech: 'M1', endpoint: '/m1', kind: 'main', request: m1req, response: res.data, summary: summarize('M1', res.data, changed) });
  runAssertions(R, 'M1', res.data);

  // M2 Phase A
  const m2aReq = { user_line: R.userLine, spark_parse: R.sparkParse, grape_name: R.grapeName, grape_relationship: R.grapeRel, maturity_class: R.maturity };
  res = await callWorker('/m2', m2aReq);
  if (!res.ok) {
    logEntry(R, { mech: 'M2', endpoint: '/m2 (phase A)', kind: 'main', request: m2aReq, response: res.data, summary: 'ERROR ' + res.status });
    halt(R, 'M2 Phase A request failed.');
    return R;
  }
  data = res.data;
  logEntry(R, { mech: 'M2', endpoint: '/m2 (phase A)', kind: 'main', request: m2aReq, response: data,
    summary: 'recovered_problem="' + data.recovered_problem + '" · needs_confirmation=' + data.needs_confirmation + ' · gap_in_play=' + data.gap_in_play });
  runAssertions(R, 'M2-phaseA', data);
  R.gapInPlay = !!data.gap_in_play;
  R.confirmedProblem = data.recovered_problem; // auto-accept, mirrors "That's it, continue" — also covers the
                                                // "Phase A: auto-confirm needs_confirmation as returned" requirement

  // M2..M7 main steps
  for (const mech of ['M2', 'M3', 'M4', 'M5', 'M6', 'M7']) {
    const override = cfg.answers && cfg.answers[mech.toLowerCase()];
    const answer = override || buildPlaceholderAnswer(mech, R.grapeName);
    R.answers[mech] = answer;
    const req = buildMechRequest(mech, answer, R);
    res = await callWorker(mechEndpoint(mech), req);
    if (!res.ok) {
      logEntry(R, { mech, endpoint: mechEndpoint(mech), kind: 'main', request: req, response: res.data, summary: 'ERROR ' + res.status });
      halt(R, mech + ' request failed.');
      return R;
    }
    changed = applyMechResult(mech, res.data, R);
    logEntry(R, { mech, endpoint: mechEndpoint(mech), kind: 'main', request: req, response: res.data, summary: summarize(mech, res.data, changed) });
    runAssertions(R, mech, res.data);
    // swirl offered but auto-skipped, mirroring the "Skip swirl" default path — logged, not answered
  }

  return R;
}

function buildReport(R, cfg, idx) {
  const lines = [];
  lines.push('# Corked Runner Report — spark ' + String(idx).padStart(2, '0'));
  lines.push('');
  lines.push('Generated: ' + new Date().toISOString());
  lines.push('Worker: ' + WORKER_URL);
  lines.push('');
  if (cfg.note) {
    lines.push('## Test under this spark');
    lines.push(cfg.note);
    lines.push('');
  }
  lines.push('## Raw Spark');
  lines.push('```');
  lines.push(cfg.raw_spark);
  lines.push('```');
  lines.push('');
  lines.push('Maturity class: ' + cfg.maturity);
  lines.push('Grape: ' + (cfg.grapeName || '(none)') + ' — ' + (cfg.grapeRel || '(none)'));
  if (cfg.wordsSource) lines.push('words_source override: ' + cfg.wordsSource);
  if (cfg.expectHalt !== undefined) lines.push('expect_halt: ' + cfg.expectHalt);
  lines.push('');
  lines.push('User Line candidate (verbatim from M0): ' + (R.userLine ? JSON.stringify(R.userLine) : '(none — halted before M0 returned one)'));
  lines.push('');
  lines.push('## Element Tracker (final state, floor-enforced like corked_v6.html\'s rankUp — see ' +
    '"raw grades" for what each mechanism actually offered before the floor was applied)');
  EL_KEYS.forEach(k => {
    const rec = R.elements[k];
    lines.push('- **' + EL_META[k].name + '**: ' + rec.state + ' — history: ' + rec.history.join(' → ') + (rec.mech ? (' (last raised by ' + rec.mech + ')') : ''));
    if (rec.rawGrades && rec.rawGrades.length) {
      lines.push('  raw grades: ' + rec.rawGrades.map(g => g.mech + '=' + g.offeredState).join(', '));
    }
  });
  lines.push('');
  if (R.halted) {
    lines.push('## Halt');
    lines.push('⛔ ' + R.haltMsg);
    lines.push('');
  }
  lines.push('## Run Log');
  R.log.forEach((e, i) => {
    lines.push('');
    lines.push('### ' + (i + 1) + '. [' + e.kind + '] ' + e.mech + ' · ' + e.endpoint);
    lines.push('Summary: ' + e.summary);
    lines.push('Request:');
    lines.push('```json');
    lines.push(JSON.stringify(e.request, null, 2));
    lines.push('```');
    lines.push('Response:');
    lines.push('```json');
    lines.push(JSON.stringify(e.response, null, 2));
    lines.push('```');
  });
  lines.push('');
  lines.push('## Anomalies (automated mechanical checks — substitution_detected typing, gap-bar/echo-bar consistency, overall-state-equals-primary-bar, voice/em-dash/contrast-formula scan, anchor fabrication)');
  lines.push(R.anomalies.length ? R.anomalies.map(a => '- ⚠ ' + a).join('\n') : '- none detected');
  lines.push('');
  lines.push('## Floor notes (informational — a later mechanism offered a lower grade for an opportunistic bar; the floor correctly held, no action needed)');
  lines.push(R.floorNotes.length ? R.floorNotes.map(a => '- ' + a).join('\n') : '- none');
  return lines.join('\n');
}

function judgeOutcome(R, cfg) {
  const expectHalt = cfg.expectHalt;
  if (expectHalt === 'maybe') return R.halted ? 'RECORDED (halted: ' + R.haltMsg + ')' : 'RECORDED (completed full chain)';
  if (expectHalt === true) return R.halted ? 'PASS (halted as expected: ' + R.haltMsg + ')' : 'FAIL (expected a halt, chain completed instead)';
  if (expectHalt === false || expectHalt === undefined) return R.halted ? 'FAIL (unexpected halt: ' + R.haltMsg + ')' : 'PASS (completed full chain)';
  return R.halted ? ('halted: ' + R.haltMsg) : 'completed full chain (M0→M7)';
}

async function main() {
  await import('node:fs/promises').then(fs => fs.mkdir(OUT_DIR, { recursive: true }));
  const fs = await import('node:fs/promises');
  const summary = [];
  for (let i = 0; i < SPARKS.length; i++) {
    const cfg = SPARKS[i];
    const idx = i + 1;
    process.stdout.write('Running spark ' + idx + '/' + SPARKS.length + '... ');
    let R;
    try {
      R = await runOne(cfg, idx);
    } catch (err) {
      console.log('FAILED (' + err.message + ')');
      summary.push({ idx, raw_spark: cfg.raw_spark, result: 'script error: ' + err.message });
      continue;
    }
    const report = buildReport(R, cfg, idx);
    const fname = 'spark-' + String(idx).padStart(2, '0') + '.md';
    await fs.writeFile(new URL(fname, OUT_DIR), report, 'utf8');
    const outcome = judgeOutcome(R, cfg);
    console.log('done — ' + outcome);
    summary.push({ idx, raw_spark: cfg.raw_spark, maturity: cfg.maturity, outcome, anomalies: R.anomalies, note: cfg.note, file: fname });
  }
  const idxLines = ['# Batch run summary — Corked Phase 1 Test Battery', '', 'Generated: ' + new Date().toISOString(), 'Worker: ' + WORKER_URL, ''];
  summary.forEach(s => {
    idxLines.push('## ' + s.idx + '. ' + (s.file || '(no file)'));
    idxLines.push('Spark: ' + s.raw_spark);
    if (s.maturity !== undefined) idxLines.push('Maturity: ' + s.maturity);
    idxLines.push('Outcome: ' + s.outcome);
    if (s.anomalies && s.anomalies.length) {
      idxLines.push('Anomalies (' + s.anomalies.length + '):');
      s.anomalies.forEach(a => idxLines.push('  - ' + a));
    }
    idxLines.push('');
  });
  await fs.writeFile(new URL('_summary.md', OUT_DIR), idxLines.join('\n'), 'utf8');
  console.log('\nAll done. Summary written to corked-runner-output/_summary.md');
}

main().catch(err => { console.error('Fatal:', err); process.exit(1); });
