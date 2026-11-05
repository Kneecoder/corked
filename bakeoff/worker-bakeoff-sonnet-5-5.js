// Bake-off entry for claude-sonnet-5-5: the recorder on the options in sonnet-5-5-adapter.js.
// Same shape as worker-bakeoff-haiku.js.
//
//   npx wrangler dev bakeoff/worker-bakeoff-sonnet-5-5.js --var ANTHROPIC_MODEL:claude-sonnet-5-5 --port 8791
//
// The adapter's log for each request is added to the response as _bakeoff.adapter.

import { bakeoffEntry } from './recorder.js';
import { sonnet55Options } from './sonnet-5-5-adapter.js';

export default bakeoffEntry(sonnet55Options);
