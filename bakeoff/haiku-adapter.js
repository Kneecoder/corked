// Haiku adapter for the model bake-off. Never deployed. worker.js is unchanged.
//
// worker.js sends no `thinking` setting and reads content[0].text as the reply.
// Claude Haiku 5.5 thinks by default when `thinking` is unset, so its reply can
// start with a thinking block, and the thinking uses up max_tokens. Two changes,
// on the way to and from the Anthropic API:
//   1. Request: thinking: { type: 'disabled' }. Haiku 5.5 accepts it at effort
//      low, medium (its default) or high. max_tokens stays as worker.js sets it.
//   2. Reply: only text blocks are passed on, so content[0] is the text.
// A real switch to Haiku would need both in callClaude() in worker.js.
//
// worker-bakeoff-haiku.js imports this before worker-bakeoff.js, so the recorder
// sits on top and records what the worker is handed. adapterLog keeps the reply
// as the API sent it: its block types, and any blocks taken out.

const upstreamFetch = globalThis.fetch;
export const adapterLog = [];

globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input.url;
  if (!url.startsWith('https://api.anthropic.com/') || !init || typeof init.body !== 'string') {
    return upstreamFetch(input, init);
  }

  const entry = { request_changes: ['thinking: disabled'] };
  adapterLog.push(entry);
  const body = JSON.parse(init.body);
  body.thinking = { type: 'disabled' };
  const res = await upstreamFetch(input, { ...init, body: JSON.stringify(body) });
  if (!res.ok) return res;

  const reply = await res.json();
  entry.original_blocks = Array.isArray(reply.content) ? reply.content.map(b => b.type) : [];
  entry.removed_blocks = entry.original_blocks.filter(t => t !== 'text');
  if (entry.removed_blocks.length) reply.content = reply.content.filter(b => b.type === 'text');

  const headers = new Headers(res.headers);
  headers.delete('content-length');
  headers.delete('content-encoding');
  return new Response(JSON.stringify(reply), { status: res.status, headers });
};
