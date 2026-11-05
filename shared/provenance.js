// The Provenance Rule, once. Every check that asks "is this the builder's own words?" asks here:
// the worker's anchor and problem-word checks, the app's Settled cap and the bake-off scoring.
//
// Plain script on purpose. The app loads it with a <script> tag, the worker and the Node tools
// with `import './shared/provenance.js'`. Either way the module is globalThis.CorkedProvenance.
//
// A match ignores case, spacing, curly quotes and the punctuation at its ends, and it covers whole
// words. Whatever matches, the answer is the builder's own text, as they typed it. The model's
// spelling of it is never what goes on record.
(function (root) {
  const END_PUNCTUATION = /^[\s"'.,;:!?]+|[\s"'.,;:!?]+$/g;

  function foldForMatch(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[‘’ʼ]/g, "'")
      .replace(/\s+/g, ' ');
  }

  // Where `want`, already folded, sits in `src`. Returns src's own text for it, or null.
  function locate(want, src) {
    // A folded copy of the source that remembers where each character came from.
    let norm = '';
    const at = [];
    let lastSpace = true;
    for (let i = 0; i < src.length; i++) {
      let ch = src[i];
      if (/\s/.test(ch)) {
        if (lastSpace) continue;
        ch = ' ';
        lastSpace = true;
      } else {
        const lower = ch.toLowerCase();
        ch = lower.length === 1 ? lower : ch;
        if (/[‘’ʼ]/.test(ch)) ch = "'";
        lastSpace = false;
      }
      norm += ch;
      at.push(i);
    }
    let idx = norm.indexOf(want);
    while (idx !== -1) {
      const before = norm[idx - 1];
      const after = norm[idx + want.length];
      const wholeWords = !(before && /[a-z0-9]/.test(before)) && !(after && /[a-z0-9]/.test(after));
      if (wholeWords) return src.slice(at[idx], at[idx + want.length - 1] + 1);
      idx = norm.indexOf(want, idx + 1);
    }
    return null;
  }

  // The source's own text for the candidate. Its end punctuation stays when the source has it there.
  function match(candidate, source) {
    const whole = foldForMatch(candidate).trim();
    const words = whole.replace(END_PUNCTUATION, '');
    if (!words) return null;
    const src = String(source || '');
    return locate(whole, src) || (whole !== words ? locate(words, src) : null);
  }

  // Whether the source holds these words, however few.
  function holds(candidate, source) {
    return match(candidate, source) !== null;
  }

  // ── ANCHORS ──
  // The builder's own text for an anchor the model offered, or null when the answer doesn't hold
  // it. An anchor under three characters anchors nothing.
  function anchorSpan(candidate, answer) {
    if (foldForMatch(candidate).replace(END_PUNCTUATION, '').length < 3) return null;
    return match(candidate, answer);
  }

  // Checks obj[key] against the answer and writes the verdict back: the builder's own text, or
  // null. Returns whether it held.
  function verifyAnchor(obj, key, answer) {
    if (!obj?.[key]) return !!obj?.[key];
    obj[key] = anchorSpan(obj[key], answer);
    return !!obj[key];
  }

  // ── QUOTES ──
  // The exact stretch of one of `sources` that `candidate` quotes, at least three words long, with
  // the punctuation at its ends left out. Null unless the candidate's words appear there, in order,
  // whole.
  function quotedSpan(candidate, sources) {
    const want = foldForMatch(candidate).replace(END_PUNCTUATION, '');
    if (tokens(want).length < 3) return null;
    for (const source of sources) {
      const span = locate(want, String(source || ''));
      if (span !== null) return span;
    }
    return null;
  }

  // ── NEVER INVENT ──
  // Function words. They carry no content, so they never count against a guess.
  const STOPWORDS = new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'nor', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'about',
    'from', 'into', 'onto', 'over', 'under', 'up', 'down', 'out', 'off', 'by', 'as', 'than', 'then',
    'so', 'if', 'when', 'whenever', 'while', 'where', 'who', 'whom', 'whose', 'which', 'what', 'why',
    'how', 'that', 'this', 'these', 'those', 'it', 'its', 'they', 'them', 'their', 'theirs', 'he',
    'him', 'his', 'she', 'her', 'hers', 'we', 'us', 'our', 'you', 'your', 'i', 'me', 'my', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'am', 'do', 'does', 'did', 'doing', 'done', 'have', 'has',
    'had', 'having', 'will', 'would', 'shall', 'should', 'may', 'might', 'must', 'can', 'could', 'not',
    'no', 'only', 'just', 'very', 'also', 'each', 'every', 'any', 'some', 'all', 'both', 'either',
    'neither', 'own', 'same', 'other', 'such', 'there', 'here', 'before', 'after', 'until', 'because',
    'since', 'through', 'during', 'within', 'without', 'again', 'even', 'yet', 's', 't'
  ]);

  // The small framing words a guess may add to say what goes wrong ("has trouble", "loses",
  // "can't", "hard"). Every other word in a guess must already be in the spark.
  const FRAMING_WORDS = new Set([
    'trouble', 'hard', 'harder', 'difficult', 'cannot', 'unable', 'stuck', 'way', 'still', 'too',
    'often', 'always', 'never', 'enough',
    'struggle', 'struggles', 'struggled', 'struggling',
    'lose', 'loses', 'losing', 'lost',
    'keep', 'keeps', 'keeping', 'kept',
    'forget', 'forgets', 'forgetting', 'forgot', 'forgotten',
    'miss', 'misses', 'missing', 'missed',
    'fail', 'fails', 'failing', 'failed',
    'find', 'finds', 'finding', 'found',
    'get', 'gets', 'getting', 'got'
  ]);

  // Personal pronouns say who did it. A problem built from a scene may only use the ones the
  // scene itself used.
  const PRONOUNS = new Set([
    'i', 'me', 'my', 'you', 'your', 'he', 'him', 'his', 'she', 'her', 'hers', 'we', 'us', 'our',
    'they', 'them', 'their', 'theirs', 'it', 'its'
  ]);

  function tokens(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[‘’ʼ]/g, "'")
      .replace(/\bcan't\b/g, 'can not')
      .replace(/\bwon't\b/g, 'will not')
      .replace(/n't\b/g, ' not')
      .replace(/'(s|re|ve|ll|d|m)\b/g, '')
      .split(/[^a-z0-9]+/)
      .filter(Boolean);
  }

  function stem(w) {
    if (w.length > 4 && w.endsWith('ies')) return w.slice(0, -3) + 'y';
    if (w.length > 4 && /(ches|shes|sses|xes|zes)$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us')) return w.slice(0, -1);
    if (w.length > 5 && w.endsWith('ing')) return w.slice(0, -3);
    if (w.length > 4 && w.endsWith('ed')) return w.slice(0, -2);
    return w;
  }

  // Two stems are the same word when they are equal, or when one of four letters or more starts
  // the other ("cancel" and "cancels"). This is never-invent's own rule. /field has its own
  // matcher for grounding, so tuning that one can't loosen this one.
  function stemsMatch(a, b) {
    if (a === b) return true;
    return a.length >= 4 && b.length >= 4 && (a.startsWith(b) || b.startsWith(a));
  }

  // The content words of `text` that `source` doesn't contain. A word counts as present when it,
  // or its plural/tense-folded stem, matches a source word. A guess from the spark may add the
  // framing words, and pronouns are grammar there. A problem built from a scene uses the scene's
  // words only: no framing words, and only the pronouns the scene used.
  function unsupportedWords(text, source, { scene = false } = {}) {
    const sourceStems = [...new Set(tokens(source).map(stem))];
    const missing = [];
    for (const word of tokens(text)) {
      const pronoun = PRONOUNS.has(word);
      if (pronoun && !scene) continue;
      if (!pronoun && STOPWORDS.has(word)) continue;
      if (!scene && FRAMING_WORDS.has(word)) continue;
      const stemmed = stem(word);
      if (!scene && FRAMING_WORDS.has(stemmed)) continue;
      if (sourceStems.some(s => stemsMatch(stemmed, s))) continue;
      if (!missing.includes(word)) missing.push(word);
    }
    return missing;
  }

  root.CorkedProvenance = { holds, anchorSpan, verifyAnchor, quotedSpan, unsupportedWords };
})(globalThis);
