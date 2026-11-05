// The cellar clock. Pace, part of the day, the 05:00 rule, and every answer about when a question
// comes back, how far behind a bottle is, and how that reads on screen. It takes `now` as an
// input, so a test or a scripted run can set the time.
//
// Plain script on purpose. The app loads it with a <script> tag, tests with
// `import './shared/cellar-clock.js'`. Either way the module is globalThis.CorkedCellarClock.
//
// A cellar day starts at 05:00 local time: an answer or park before that counts as the previous
// day (v48, 10 Oct). Comebacks and every wording use it. Whether a bottle is behind pace counts
// whole pace-lengths since its question opened instead, because the rack reads pace-relative,
// never calendar-absolute (v47, Input 4).
(function (root) {
  const DAY_MS = 86400000;
  const DAY_STARTS_HOUR = 5;
  // Rhythm-test mode: every question comes back after two minutes, any time of day.
  const TEST_RETURN_MS = 2 * 60000;

  // Index = bottle.pace. testMs is the pace-length in rhythm-test mode.
  const PACES = [
    { label: 'Daily',         note: 'The cellar keeps it close.',                cadence: 'daily',           days: 1,  testMs: 15000 },
    { label: 'Any other day', note: 'A steady rhythm without making it heavy.',  cadence: 'every other day', days: 2,  testMs: 30000 },
    { label: 'Weekly',        note: 'A slow burn. The spark stays alive.',       cadence: 'weekly',          days: 7,  testMs: 60000 },
    { label: 'Monthly',       note: 'Back-burner. Still aging, not urgent.',     cadence: 'monthly',         days: 30, testMs: 120000 }
  ];
  const DEFAULT_PACE = PACES[2];

  // Index = bottle.notifTiming. hour is the local hour that part of the day starts.
  const PARTS_OF_DAY = [
    { label: 'Morning', note: 'Before the day gets in the way.', hour: 9,  later: 'in the morning', today: 'this morning',    tomorrow: 'tomorrow morning' },
    { label: 'Midday',  note: 'During a break between things.',  hour: 13, later: 'at midday',      today: 'today at midday', tomorrow: 'tomorrow at midday' },
    { label: 'Evening', note: 'Once the day is done.',           hour: 18, later: 'in the evening', today: 'this evening',    tomorrow: 'tomorrow evening' },
    { label: 'Late',    note: 'After the house is quiet.',       hour: 22, later: 'late',           today: 'late today',      tomorrow: 'late tomorrow' }
  ];

  function plural(n, word) {
    return `${n} ${word}${n === 1 ? '' : 's'}`;
  }

  function createCellarClock({ now = () => Date.now(), testMode = false } = {}) {
    // The local midnight that starts the calendar date this moment's cellar day is named after.
    function cellarDay(ms) {
      const d = new Date(ms);
      if (d.getHours() < DAY_STARTS_HOUR) d.setDate(d.getDate() - 1);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    }

    // Whole cellar days from one moment to another. Rounded, so a clock change can't move it.
    function cellarDaysBetween(fromMs, toMs) {
      return Math.round((cellarDay(toMs) - cellarDay(fromMs)) / DAY_MS);
    }

    const clock = {
      paces: PACES,
      partsOfDay: PARTS_OF_DAY,
      testMode,

      nowIso: () => new Date(now()).toISOString(),

      // True while a stored time is still ahead.
      isAhead: iso => new Date(iso).getTime() > now(),

      // When a question comes back, for held questions and parked returns alike: the due day
      // (today plus the pace's days) at the start of the builder's part of the day. No pace yet
      // counts as weekly, no part of the day as morning.
      nextReturnAt(pace, timing) {
        if (testMode) return new Date(now() + TEST_RETURN_MS).toISOString();
        const days = (PACES[pace] || DEFAULT_PACE).days;
        const next = new Date(now());
        if (next.getHours() < DAY_STARTS_HOUR) next.setDate(next.getDate() - 1);
        next.setDate(next.getDate() + days);
        next.setHours((PARTS_OF_DAY[timing] || PARTS_OF_DAY[0]).hour, 0, 0, 0);
        return next.toISOString();
      },

      // How many whole pace-lengths have passed since a question opened.
      paceLengthsSince(pace, startIso) {
        const row = PACES[pace];
        if (!row || !startIso) return 0;
        const start = new Date(startIso).getTime();
        if (!start) return 0;
        const length = testMode ? row.testMs : row.days * DAY_MS;
        return Math.floor((now() - start) / length);
      },

      // "in 3 hours", for the note on a parked question.
      lockedWording(iso) {
        const date = new Date(iso);
        if (isNaN(date.getTime())) return 'soon';
        const diff = date.getTime() - now();
        if (diff <= 0) return 'now';
        const mins = Math.round(diff / 60000);
        if (mins < 1) return 'in under a minute';
        if (mins < 60) return `in ${plural(mins, 'minute')}`;
        const hours = Math.round(diff / 3600000);
        if (hours < 24) return `in ${plural(hours, 'hour')}`;
        return `in ${plural(Math.max(1, cellarDaysBetween(now(), date.getTime())), 'day')}`;
      },

      // When a held question opens: the day, counted from today, with the part of the day the
      // sidebar names. A time that is not the start of the builder's part of the day (a question
      // held before parts of the day were kept) gets the day alone. Rhythm-test mode counts the
      // last hour in minutes.
      nextQuestionWording(iso, timing) {
        const date = new Date(iso);
        const diff = date.getTime() - now();
        if (testMode && diff < 3600000) return `in ${plural(Math.max(1, Math.ceil(diff / 60000)), 'minute')}`;
        const days = cellarDaysBetween(now(), date.getTime());
        const part = PARTS_OF_DAY[timing];
        const onPart = !!part && date.getHours() === part.hour && date.getMinutes() === 0;
        if (days <= 0) return onPart ? part.today : 'today';
        if (days === 1) return onPart ? part.tomorrow : 'tomorrow';
        return `in ${days} days${onPart ? ', ' + part.later : ''}`;
      },

      // The cellar card's wording for when a question is due. The bottle uses the same words.
      dueWording(iso, timing) {
        const due = new Date(iso);
        if (isNaN(due.getTime()) || due.getTime() <= now()) return 'Question ready';
        return `Next question ${clock.nextQuestionWording(iso, timing)}`;
      },

      // The date on a cellar card.
      cardDate(iso) {
        if (!iso) return '';
        const d = new Date(iso);
        if (isNaN(d.getTime())) return '';
        const days = cellarDaysBetween(d.getTime(), now());
        if (days <= 0) return 'today';
        if (days === 1) return 'yesterday';
        if (days < 7) return `${days} days ago`;
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
      },

      // ── HOW THE RHYTHM READS ──
      paceLabel: pace => PACES[pace]?.label,

      // "every other day in the morning", for the sidebar.
      rhythmShort(pace, timing) {
        const cadence = PACES[pace]?.cadence || 'on rhythm';
        const when = PARTS_OF_DAY[timing]?.later || '';
        return `${cadence}${when ? ' ' + when : ''}`;
      },

      // The line under the rhythm picker.
      rhythmSummary(pace, timing) {
        const cadence = (PACES[pace] || DEFAULT_PACE).cadence;
        const part = (PARTS_OF_DAY[timing] || PARTS_OF_DAY[0]).later;
        const title = cadence[0].toUpperCase() + cadence.slice(1);
        return `${title}, ${part}. Corked will bring the next question back ${cadence} ${part}.`;
      }
    };
    return clock;
  }

  root.CorkedCellarClock = { createCellarClock, PACES, PARTS_OF_DAY };
})(globalThis);
