// The seam under callClaude() in worker.js. A model adapter is one async function:
//
//   adapter({ env, system, content, maxTokens }) -> the model's raw reply text
//
// It throws a Response on an API failure, which the worker's router sends back as it is.
// callClaude() does the JSON parsing, so every adapter's reply goes through the same checks.
//
// Production always uses anthropicAdapter. worker.js takes another adapter only from
// env.modelAdapter, a value only code can set: wrangler vars and secrets are strings or JSON.
// ANTHROPIC_MODEL stays pinned in wrangler.toml.

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';

// options.thinking: sent as the request's `thinking` setting.
// options.textBlocksOnly: drops every reply block that isn't text, so content[0] is the text.
// options.onCall: told about each call, for the bake-off's records.
export function createAnthropicAdapter({ thinking, textBlocksOnly = false, onCall } = {}) {
  return async function anthropic({ env, system, content, maxTokens }) {
    const response = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: env.ANTHROPIC_MODEL || 'claude-sonnet-4-6',
        max_tokens: maxTokens,
        ...(thinking ? { thinking } : {}),
        system,
        messages: [{ role: 'user', content }]
      })
    });

    if (!response.ok) {
      const detail = await response.text();
      if (onCall) onCall({ response, detail });
      console.error('ANTHROPIC_ERROR:', response.status, detail);
      throw new Response(JSON.stringify({ error: 'Claude API error', detail }), { status: 502 });
    }

    const reply = await response.json();
    const originalBlocks = Array.isArray(reply.content) ? reply.content.map(b => b.type) : [];
    if (textBlocksOnly && Array.isArray(reply.content)) {
      reply.content = reply.content.filter(b => b.type === 'text');
    }
    if (onCall) onCall({ response, reply, originalBlocks });
    return reply.content?.[0]?.text || '';
  };
}

export const anthropicAdapter = createAnthropicAdapter();

// Feeds recorded replies through the worker's own checks, with no key and no cost.
// `replies` is a list of raw reply texts, handed out in the order the worker asks for them.
export function createReplayAdapter(replies) {
  const queue = [...replies];
  const adapter = async () => {
    if (!queue.length) throw new Error('Replay adapter: the worker asked for more replies than were recorded.');
    return queue.shift();
  };
  adapter.remaining = () => queue.length;
  return adapter;
}
