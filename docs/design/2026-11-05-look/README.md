# Corked look, 5 Nov 2026 (direction D)

The design Code builds to. `png/` shows each screen at laptop (1440×900) and phone (390×844) width. The cellar and landing pictures (`D5`, `D6`) show the whole scrolling page. `source/` holds the HTML each picture was rendered from: open it in a browser for exact colours and sizes, but don't copy its markup into the app.

Paper ground, ink text, one wine-red accent. Your words are in a serif, Corked's questions and buttons in a sans, and Corked's spoken lines and small labels in a typewriter mono.

## Colours

| Token | Hex | Used for |
|---|---|---|
| paper | `#F3EEE4` | page ground |
| paper-raised | `#FBF8F2` | fields, cards, rows that just changed |
| sidebar | `#ECE5D8` | desktop sidebar, phone header |
| rule | `#D9D0C2` | hairlines |
| ink | `#1E1A15` | text, field and card borders, hard shadows |
| ink-2 | `#5C5348` | secondary text, quiet links |
| ink-3 | `#6E6458` | small labels, placeholders (5:1 on paper) |
| not-asked | `#A39885` | outline of elements not asked yet |
| wine | `#7A2232` | the one main button, states that need attention, card tags |
| alert | `#F6E9E6` | failed-send message background |
| cork | `#C9A55A` | bottle cork only |
| murky / clearing / clear | `#2E1218` / `#6E2A3A` / `#B24A61` | bottle layers |

## Type

- **Newsreader** (serif): the builder's own words only. That means the spark, answers, the recorded excerpts and the grape's name. Desktop sizes are 21–25px, phone 16–18px. The one exception is the "Corked" wordmark on the landing and the cellar.
- **Inter**: Corked's questions, buttons and interface text. Questions are 28px/600 on desktop (40px on the spark screen) and 20–22px on phone. Buttons are 16px/500.
- **IBM Plex Mono**: Corked's spoken lines and small labels.
  - Spoken lines (the one-line observation after an answer) are 17px on desktop and 15px on phone.
  - Small labels are uppercase, 11–12px, with 0.04–0.06em letter spacing. They cover the mechanism name, "Your answer", "The label", the state words, "What changed", "One more thing", "Not Lena", "Copy question" and "View label".

## Parts

- **Main button**: wine with paper text, 2px corners, at least 52px tall. Only one per screen, for the one next move.
- **Second button**: paper-raised with a 1px ink border.
- **Quiet actions**: underlined ink-2 text, at least 44px tall.
- **Field, and any card with weight**: paper-raised, 1px ink border, hard shadow `4px 4px 0` ink (3px on phone).
- **"What changed" card**: the same frame with 6px inner padding and 3px double rules top and bottom. The title is centred mono. Each row has a mono wine tag ("The Tell · settled") with the excerpt in Newsreader under it.
- **Errand card**: the same frame.
  - A mono wine "Not Lena" line, then who to find as a plain ink-2 line.
  - The question to ask sits between hairlines, in quotes.
  - "Copy question" copies only that question.
- **Failed-send message**: 1px wine border, alert background, an icon, and "Not sent." in bold.
- **Label rows**: a 9px square, the name, and a mono state word.
  - Settled: filled ink square.
  - Clearing: half-filled square.
  - Turbid: ink outline.
  - Not asked: light outline and "—".
  - Clearing and turbid rows are buttons that open the reopen, with a wine chevron and a wine state word.
  - Rows that changed with the last answer get paper-raised behind them.
  - The Grape row shows the name: "Grape · Lena".
- **Bottle**: always full. Each element's layer is murky, then clearing, then clear when it settles. No measuring ticks and no fill level.
- **Layout**: on desktop the main column is at most 620px wide with 64px padding and 32px between sections. The sidebar is at most 320px wide with 36/32px padding.

## After an answer: the four situations

1. **Something settled** (`D1`): the observation line, then "What changed", then the next-question line with "Back to the cellar". The question and full answer fold under "The question and your full answer". No park buttons.
2. **A thin answer with its follow-up** (`D2`): the observation line, then "One more thing", the follow-up question, its field and "Continue →". "Back to the cellar" is a quiet link, and the first answer folds away.
3. **An errand** (`D3`): the observation line, then the errand card. "Come back to this" and "Asked, waiting on a reply" are the two big buttons. When nothing settled there is no "What changed" at all.
4. **A failed send** (`D4`): the question, the typed answer still in the field, the message, and "Try again" as the main button. The two park links stay quiet. Nothing in the label or bottle changes.

Substitution (the same question asked again) keeps its current behaviour in this look.

## The cellar (`D5`)

- **Header**: the "Corked" wordmark, the bottle count in mono under it, and "Add spark" as a second button. It is never the main button, because the next move in the cellar is a bottle with a question ready.
- **Cards**: two columns on laptop, one on phone. Each card has:
  - the small bottle with the same layers as in the bottle view, which replaces the dots and the coloured card background;
  - the status in mono capitals;
  - the spark in Newsreader;
  - the date in mono and a quiet "Archive".
- **Question ready**: the only status in wine, and the only card with the ink border and hard shadow. Every other card has a hairline border and no shadow, so the bottles that need you stand out.
- **Parked and in flight**: these cards look like any other card and don't fade. The status line says they're parked.
- **Behind pace (the sag)**: the card's bottle leans in three steps of 5°, 10° and 16°. This replaces the card fading and dropping, and the text never fades.
- **Archive on a card** asks once before it archives (the browser confirm, like removing a spark), because archiving can't be undone.
- **Archived bottles** sit in their own group under the rack, headed "Archived". Their cards are flat on paper with the spark in ink-2 and no Archive link. Today they're mixed into the rack, and archiving moves a bottle to the top of the list.
- **The export line** moves to the bottom of the page as one quiet line.
- **The × that removes a spark** stays as it works now.
- **Empty cellar**: "The cellar is empty. Cork an idea to begin." in mono, centred.

## The landing (`D6`)

- **First screen**: the "Corked" wordmark with the short wine rule, Corked's three opening lines in mono, and "Cork an idea" as the main button. On laptop the bottle stands to the right of the text. On phone it sits next to the wordmark.
- **The opening lines** type out once, on the first visit. The button is there from the start, and a click, tap or key shows the lines at once. Reserve the lines' full height so nothing below them moves while they type.
- **"The cellar knows what to ask."** and **"The cellar becomes a record."** sit below the first screen in Inter, side by side on laptop and stacked on phone. They don't rotate any more.
- **The bottle** is the same drawing as in the app, standing, and it's a picture, not the button. "Cork an idea" does what clicking the bottle does now.

## Typed lines

- Corked's new lines type out at about 60 characters a second, once, the first time they appear. These are the observation, a follow-up, a question the first time it's shown, and the prompts when adding a spark.
- A click, a tap or any key anywhere shows the whole line at once.
- With `prefers-reduced-motion` the text just appears.
- Nothing types out again on a return visit, and the builder's own words never type out.

## Phone

- A top bar with "Cellar" and the mechanism name.
- A compact header: the small bottle, the spark on one line, "View label", and a button for each unfinished element.
- The state's content after that. With the keyboard open (390×500) the question and the top of the answer field must be visible without scrolling.

## Gone

- The Winemaster circle and its "THE WINEMASTER" label.
- "Element 2 of 7", "Phase 1 element 2 of 7", and the progress bars on question screens.
- The spark-and-person box at the top of the question column.
- The curved line from the label to the question.
- The phase and next-question lines in the sidebar.
- "Archive this spark" in the sidebar. It moves to the bottle's card in the cellar.
- The dots and the coloured background on cellar cards.
- The landing's rotating sections and their dots.
- The landing bottle's glow, the ember on hover and the cork animation.

## Wording in the pictures

- **App wording, build it as shown**: the failed-send message, "View label", the state words, the disclosure labels, the errand card's split into who to find and the question to ask, and the Grape name line.
- **Cellar status**: "Still aging · N elements remain" becomes "Still aging", with no count. The other statuses keep their current wording.
- **Made-up examples**: the sparks in the cellar picture.
- **Worker output shown as an example of the tone**: the one-line observations, the follow-up question and the field question. Today the worker writes longer text. That belongs to a separate worker brief, so put whatever the worker returns in those places for now.
