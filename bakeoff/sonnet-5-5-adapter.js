// Sonnet 5.5 adapter for the model bake-off. Never deployed. worker.js is unchanged.
//
// Same job as haiku-adapter.js. Only the thinking value differs: Claude Sonnet 5.5
// rejects thinking: { type: 'disabled' } with a 400 and names between_tools as the
// way to turn thinking off ("The model does not think before responding"). The
// worker sends no tools, so there are no between-tool notes either.
//   1. Request: thinking: { type: 'between_tools' }. Accepted at effort high
//      (Sonnet 5.5's default) or below. max_tokens stays as worker.js sets it.
//   2. Reply: only text blocks are passed on, so content[0] is the text.
// A real switch to Sonnet 5.5 would need both in callClaude() in worker.js.
//
// A separate file, not a setting on haiku-adapter.js, so that writing it did not
// reload the Haiku worker while its batteries were running.

const upstreamFetch = globalThis.fetch;
export const adapterLog = [];

globalThis.fetch = async (input, init) => {
  const url = typeof input === 'string' ? input : input.url;
  if (!url.startsWith('https://api.anthropic.com/') || !init || typeof init.body !== 'string') {
    return upstreamFetch(input, init);
  }

  const entry = { request_changes: ['thinking: between_tools'] };
  adapterLog.push(entry);
  const body = JSON.parse(init.body);
  body.thinking = { type: 'between_tools' };
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
