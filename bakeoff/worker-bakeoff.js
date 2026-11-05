// Model bake-off entry point for wrangler dev. Never deployed.
//
// Runs worker.js unchanged, through a model adapter that records every call it makes to the
// Anthropic API: the model, HTTP status, stop reason, content block types, token usage and the
// raw reply text. The record rides back on the worker's JSON response as `_bakeoff`;
// scripts/run-corked-batch.mjs lifts it out before it logs or checks the response, so the
// worker's own reply is what gets judged.
//
// Start one per model:
//   npx wrangler dev bakeoff/worker-bakeoff.js --var ANTHROPIC_MODEL:claude-haiku-5-5 --port 8787
// The key comes from .dev.vars (ANTHROPIC_API_KEY=...), which is gitignored.

import { bakeoffEntry } from './recorder.js';

export default bakeoffEntry();
