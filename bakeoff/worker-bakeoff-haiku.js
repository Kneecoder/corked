// Bake-off entry for claude-haiku-5-5: the recorder in worker-bakeoff.js with
// haiku-adapter.js under it. It is its own entry file so that adding it did not
// reload the Sonnet workers already running from worker-bakeoff.js.
//
//   npx wrangler dev bakeoff/worker-bakeoff-haiku.js --var ANTHROPIC_MODEL:claude-haiku-5-5 --port 8790
//
// The adapter's log for each request is added to the response as _bakeoff.adapter.

import { adapterLog } from './haiku-adapter.js';
import recorder from './worker-bakeoff.js';

export default {
  async fetch(request, env, ctx) {
    adapterLog.length = 0;
    const res = await recorder.fetch(request, env, ctx);
    const body = await res.json();
    body._bakeoff.adapter = adapterLog.splice(0);
    return new Response(JSON.stringify(body), { status: res.status, headers: res.headers });
  }
};
