// Sonnet 5.5 adapter options for the model bake-off. Never deployed.
//
// Same job as haiku-adapter.js. Only the thinking value differs: Claude Sonnet 5.5
// rejects thinking: { type: 'disabled' } with a 400 and names between_tools as the
// way to turn thinking off ("The model does not think before responding"). The
// worker sends no tools, so there are no between-tool notes either.
//   1. Request: thinking: { type: 'between_tools' }. Accepted at effort high
//      (Sonnet 5.5's default) or below. max_tokens stays as worker.js sets it.
//   2. Reply: only text blocks are passed on, so content[0] is the text.

export const sonnet55Options = { thinking: { type: 'between_tools' }, textBlocksOnly: true };
