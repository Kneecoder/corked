// The cellar store: the one writer of corked-cellar-v1. It takes its storage as an input, so tests
// can swap localStorage for memory.
//
// Plain script on purpose. The app loads it with a <script> tag, tests with
// `import './shared/cellar-store.js'`. Either way the module is globalThis.CorkedCellarStore.
//
// A stored bottle: { id, created_at, updated_at, status, s, mechIndex, brief, nextQuestionAt, ... }.
// The shape is unchanged from before this module, so exported cellars and scripts/run-scenario.mjs
// keep working. status is a cache derived from s.qLifecycle, recomputed on every save.
(function (root) {
  const CELLAR_KEY = 'corked-cellar-v1';

  // This is what keeps the cellar card from going stale (e.g. staying "Parked" after the parked
  // question has actually been answered): whichever code path changes qLifecycle, the very next
  // save fixes the cellar label, with no separate "wake up" bookkeeping to forget.
  function deriveStatus(priorStatus, s) {
    if (priorStatus === 'rested') return 'rested';
    if (s && s.qLifecycle === 'parked') return s.parkKind === 'in_flight' ? 'in_flight' : 'dormant';
    return 'active';
  }

  // What a save can change, for telling whether it changed anything.
  const contents = b => JSON.stringify({
    s: b.s, mechIndex: b.mechIndex, status: b.status,
    brief: b.brief ?? null, nextQuestionAt: b.nextQuestionAt ?? null
  });

  function createCellarStore(storage, { now = () => new Date().toISOString() } = {}) {
    function all() {
      try {
        const raw = storage.getItem(CELLAR_KEY);
        if (!raw) return [];
        const arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr : [];
      } catch (e) { return []; }
    }

    function replaceAll(bottles) {
      storage.setItem(CELLAR_KEY, JSON.stringify(bottles));
    }

    // Applies a change to one stored bottle. Does nothing when the bottle isn't there.
    function change(id, fields) {
      const bottles = all();
      const i = bottles.findIndex(b => b.id === id);
      if (i < 0) return;
      bottles[i] = { ...bottles[i], ...fields };
      replaceAll(bottles);
    }

    return {
      all,
      replaceAll,
      get: id => all().find(b => b.id === id) || null,

      // Keeps the bottle as it is when nothing changed, so its card date follows real changes and
      // not every time it is looked at. The first save creates it.
      save(id, s, mechIndex) {
        const bottles = all();
        const at = now();
        const i = bottles.findIndex(b => b.id === id);
        if (i < 0) {
          bottles.push({ id, created_at: at, updated_at: at, status: deriveStatus('active', s), s, mechIndex });
        } else {
          const b = bottles[i];
          const status = deriveStatus(b.status, s);
          const keepParkFields = status === 'dormant' || status === 'in_flight';
          const next = {
            ...b, s, mechIndex, status, updated_at: at,
            brief: keepParkFields ? b.brief : null,
            nextQuestionAt: keepParkFields ? b.nextQuestionAt : null
          };
          if (contents(next) === contents(b)) return;
          bottles[i] = next;
        }
        replaceAll(bottles);
      },

      // Records a park. status is dormant or in_flight. nextQuestionAt: when a dormant one returns.
      park(id, { s, mechIndex, status, brief, nextQuestionAt, parkMech = null }) {
        s.qLifecycle = 'parked';
        s.parkKind = status;
        s.parkMech = parkMech;
        const bottles = all();
        const at = now();
        const i = bottles.findIndex(b => b.id === id);
        if (i >= 0) {
          bottles[i] = { ...bottles[i], s, status, brief, nextQuestionAt, updated_at: at };
        } else {
          bottles.push({ id, created_at: at, updated_at: at, status, brief, nextQuestionAt, s, mechIndex });
        }
        replaceAll(bottles);
      },

      // Ends a park. Stores the corrected s atomically with the outer status/brief/nextQuestionAt.
      // Without this, storage could hold an inner s.qLifecycle still 'parked' next to an outer
      // status:'active', and if no save follows (e.g. mechIndex already at or past the end, so the
      // app goes straight to the label screen), the bottle reads as parked again forever.
      wake(id, s) {
        s.qLifecycle = 'active';
        s.parkKind = null;
        s.parkMech = null;
        change(id, { s, status: 'active', brief: null, nextQuestionAt: null, updated_at: now() });
      },

      setBrief: (id, brief) => change(id, { brief, updated_at: now() }),

      // "Once per stall, not once per visit": the ack is tied to the clock it was taken against.
      ackStall: (id, clockStart) => change(id, { stallAckAt: now(), stallAckClock: clockStart }),

      archive: id => change(id, { status: 'rested', updated_at: now() }),

      remove: id => replaceAll(all().filter(b => b.id !== id))
    };
  }

  root.CorkedCellarStore = { createCellarStore, CELLAR_KEY };
})(globalThis);
