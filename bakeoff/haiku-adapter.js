// Haiku adapter options for the model bake-off. Never deployed.
//
// worker.js sends no `thinking` setting and reads content[0].text as the reply.
// Claude Haiku 5.5 thinks by default when `thinking` is unset, so its reply can
// start with a thinking block, and the thinking uses up max_tokens. Two changes,
// on the way to and from the Anthropic API:
//   1. Request: thinking: { type: 'disabled' }. Haiku 5.5 accepts it at effort
//      low, medium (its default) or high. max_tokens stays as worker.js sets it.
//   2. Reply: only text blocks are passed on, so content[0] is the text.

export const haikuOptions = { thinking: { type: 'disabled' }, textBlocksOnly: true };
