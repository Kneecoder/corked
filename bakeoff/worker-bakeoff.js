// Model bake-off entry point for wrangler dev. Never deployed.
//
// Runs worker.js unchanged. Watches every call it makes to the Anthropic API
// and records the model, HTTP status, stop reason, content block types, token
// usage and the raw reply text. The record rides back on the worker's JSON
// response as `_bakeoff`; scripts/run-corked-batch.mjs lifts it out before it
// logs or checks the response, so the worker's own reply is what gets judged.
//
// Start one per model:
//   npx wrangler dev bakeoff/worker-bakeoff.js --var ANTHROPIC_MODEL:claude-haiku-5-5 --port 8787
// The key comes from .dev.vars (ANTHROPIC_API_KEY=...), which is gitignored.
//
// The batch sends one request at a time. Two requests in flight at once would
// mix their records, because the fetch wrapper is global.

import worker from '../worker.js';

const realFetch = globalThis.fetch;

async function recordAnthropicCall(res, calls) {
  const rec = { status: res.status };
  const limits = {};
  for (const [k, v] of res.headers) if (k.startsWith('anthropic-ratelimit-')) limits[k.slice(20)] = v;
  if (Object.keys(limits).length) rec.ratelimit = limits;
  try {
    const body = await res.clone().json();
    rec.model = body.model || null;
    rec.stop_reason = body.stop_reason || null;
    rec.blocks = Array.isArray(body.content) ? body.content.map(b => b.type) : [];
    rec.text = Array.isArray(body.content)
      ? body.content.filter(b => b.type === 'text').map(b => b.text).join('\n')
      : null;
    rec.usage = body.usage || null;
    if (body.error) rec.error = body.error;
  } catch {
    rec.unreadable = true;
  }
  calls.push(rec);
}

export default {
  async fetch(request, env, ctx) {
    const calls = [];
    globalThis.fetch = async (input, init) => {
      const res = await realFetch(input, init);
      const url = typeof input === 'string' ? input : input.url;
      if (url.startsWith('https://api.anthropic.com/')) await recordAnthropicCall(res, calls);
      return res;
    };

    let res;
    try {
      res = await worker.fetch(request, env, ctx);
    } finally {
      globalThis.fetch = realFetch;
    }

    const bakeoff = { configured_model: env.ANTHROPIC_MODEL || null, calls };
    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch { body = null; }
    const out = body && typeof body === 'object' && !Array.isArray(body)
      ? { ...body, _bakeoff: bakeoff }
      : { error: 'Non-JSON response from worker', raw: text, _bakeoff: bakeoff };
    const headers = new Headers(res.headers);
    headers.set('Content-Type', 'application/json');
    return new Response(JSON.stringify(out), { status: res.status, headers });
  }
};
