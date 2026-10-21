// Bake-off entry for claude-sonnet-5-5: the recorder in worker-bakeoff.js with
// sonnet-5-5-adapter.js under it. Same shape as worker-bakeoff-haiku.js.
//
//   npx wrangler dev bakeoff/worker-bakeoff-sonnet-5-5.js --var ANTHROPIC_MODEL:claude-sonnet-5-5 --port 8791
//
// The adapter's log for each request is added to the response as _bakeoff.adapter.

import { adapterLog } from './sonnet-5-5-adapter.js';
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
