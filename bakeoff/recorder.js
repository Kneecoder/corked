// What every bake-off entry shares: worker.js running on an Anthropic adapter that records each
// call for its own request. Each request gets its own record, so requests can overlap.

import worker from '../worker.js';
import { createAnthropicAdapter } from '../model-adapters.js';

function recordCall({ response, reply, detail }) {
  const rec = { status: response.status };
  const limits = {};
  for (const [k, v] of response.headers) if (k.startsWith('anthropic-ratelimit-')) limits[k.slice(20)] = v;
  if (Object.keys(limits).length) rec.ratelimit = limits;
  let body = reply;
  if (!body) {
    try { body = JSON.parse(detail); } catch { rec.unreadable = true; return rec; }
  }
  rec.model = body.model || null;
  rec.stop_reason = body.stop_reason || null;
  rec.blocks = Array.isArray(body.content) ? body.content.map(b => b.type) : [];
  rec.text = Array.isArray(body.content)
    ? body.content.filter(b => b.type === 'text').map(b => b.text).join('\n')
    : null;
  rec.usage = body.usage || null;
  if (body.error) rec.error = body.error;
  return rec;
}

// adapterOptions: what createAnthropicAdapter() changes on the way to and from the API.
// With options set, _bakeoff.adapter keeps each reply as the API sent it: its block types, and
// any blocks taken out.
export function bakeoffEntry(adapterOptions = null) {
  return {
    async fetch(request, env, ctx) {
      const calls = [];
      const adapterLog = [];
      const modelAdapter = createAnthropicAdapter({
        ...(adapterOptions || {}),
        onCall(call) {
          calls.push(recordCall(call));
          if (!adapterOptions) return;
          const entry = { request_changes: adapterOptions.thinking ? [`thinking: ${adapterOptions.thinking.type}`] : [] };
          if (call.reply) {
            entry.original_blocks = call.originalBlocks;
            entry.removed_blocks = call.originalBlocks.filter(t => t !== 'text');
          }
          adapterLog.push(entry);
        }
      });

      const res = await worker.fetch(request, { ...env, modelAdapter }, ctx);

      const bakeoff = { configured_model: env.ANTHROPIC_MODEL || null, calls };
      if (adapterOptions) bakeoff.adapter = adapterLog;
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
}
