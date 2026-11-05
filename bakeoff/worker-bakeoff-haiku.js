// Bake-off entry for claude-haiku-5-5: the recorder on the options in haiku-adapter.js.
// It is its own entry file so that adding it did not reload the Sonnet workers already
// running from worker-bakeoff.js.
//
//   npx wrangler dev bakeoff/worker-bakeoff-haiku.js --var ANTHROPIC_MODEL:claude-haiku-5-5 --port 8790
//
// The adapter's log for each request is added to the response as _bakeoff.adapter.

import { bakeoffEntry } from './recorder.js';
import { haikuOptions } from './haiku-adapter.js';

export default bakeoffEntry(haikuOptions);
