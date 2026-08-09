# UI contract — for the design system

Everything the app can render, and every hook it renders it into. Written so the
design system can be built (or dropped in) without reading `app.js`.

`public/styles.css` is a throwaway stub — structural rules plus a readability
floor. **Replace it wholesale.** Nothing outside `public/` depends on it.

If you restructure `index.html`, that's fine — it's yours. Just keep the `id`s
below, because `app.js` writes into them by `getElementById`, and keep the
`.hidden` rule, because the whole step machine is built on it.

## The one non-negotiable rule

```css
.hidden { display: none; }
```

`app.js` shows and hides every section by toggling that class. Drop the rule and
the entire app renders at once, permanently.

## Steps

The app reveals four sections in order. All but the first start hidden.

| id | When it appears | Contains |
|---|---|---|
| `#step-input` | always | the only text input in the app |
| `#step-match` | after submit | matched occupation, its skills, adjacent occupations |
| `#step-gap` | after picking an adjacent occupation | have / missing columns |
| `#step-jobs` | same moment as `#step-gap` | live job list **or** the fallback panel |

`#step-gap` and `#step-jobs` are populated by a single `Promise.all`, so they
appear together. `app.js` scrolls `#step-gap` into view at that moment.

## Hooks by step

**Step 1 — input**
`#job-form` · `#job-text` (textarea) · `#submit-btn` (disabled while loading)

**Step 2 — match**
`#occupation` — gets an `h3` (title) and a `p` (description) injected
`#skills` — `li` per skill: `<strong>name</strong><span> — description</span>`
  Note: `description` is empty in local mode, so **style for the name alone.**
`#related` — `li > button.related-btn`, each containing
  `span.related-title` and `span.related-overlap`. These are the click targets
  that advance the flow — they must read as buttons.

**Step 3 — gap**
`#gap-heading` — "From {your occupation} to {target}"
`#gap-have` / `#gap-missing` — `li` per item: `<strong>name</strong><span class="note">`
  `.note` is often empty. Must look right with and without it.
`.gap-cols` wraps both columns; `h3.have` and `h3.missing` label them.

**Step 4 — jobs**
`#jobs-provenance` — one line of live-fetch provenance. **Do not hide this**; it's
  the demo's integrity statement.
`#jobs` — `li` per role: `<a>title</a><span class="job-meta">company · location</span>`
  `.job-meta` may end in `· remote-eligible`.
`#jobs-fallback` — the no-match panel. Injected: a `p`, a `ul` of sectors
  (`<strong>name</strong><span> — trend</span>`), and a `p` with a resource link.

**Global**
`#loading` — "Working…", shown during every fetch
`#error` — `role="alert"`, shown on failure
`footer .disclosure` — two paragraphs. **Do not cut these.**

## Four states that are easy to miss

Style all of them. Three are invisible unless you go looking, and they're what
make the thing feel finished.

1. **Loading.** The live board fetch takes 1–2 seconds — long enough to look
   broken. `#loading` appears and `#submit-btn` goes `disabled`.
2. **No-match fallback.** `#jobs` is empty and `#jobs-fallback` shows instead.
   Reach it with: *"I was a registered nurse"* → pick any adjacent occupation.
   (No healthcare employers on our boards yet, so it reliably falls through.)
3. **Error.** `#error` with a message. Reach it by stopping the server mid-flow.
4. **No match at all.** Submitting gibberish returns 404 and surfaces in `#error`
   rather than a results panel.

## Content realities

Real data, so size for it:

- Occupation titles run long: *"Market Research Analysts and Marketing Specialists"*
- Overlap sentences are ~20 words and all four render at once.
- Gap items mix competencies (*Mathematics*) with tool names (*Amazon Redshift*).
- Job locations can be *"Vancouver, Washington, United States (+2 other locations)"*.
- The list is 4–8 jobs typically, occasionally zero.

## Run it

```bash
npm start        # http://localhost:3000 — no install, no credentials
```

Real data on every route from minute zero.
