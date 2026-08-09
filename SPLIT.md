# Two engineers, two hours

The scaffold is already runnable: `npm run dev` boots the server and the whole
flow renders end to end on fixtures. Nothing below is blocked on anything else.

## Why this split works

**File ownership is disjoint.** Neither engineer edits a file the other owns.
No merge conflicts, no "hold on, I'm in that file."

**`API.md` is frozen before either of you starts.** `lib/onet.js` and
`lib/careeronestop.js` normalize upstream responses into *our* shape. When A
finds out what O\*NET really returns, the fix lands in one normalize function
and B's code never notices.

**`MOCK=1` means B is productive at minute zero.** B does not wait on
credentials, ever.

---

## Engineer A — backend and the live APIs

Owns: `server.js`, `lib/*`, `scripts/*`

| Clock | Task |
|---|---|
| 0:00–0:10 | **Do this before anything else.** Register at services.onetcenter.org and careeronestop.org. `cp .env.example .env`, fill it, run `./scripts/capture-fixture.sh`. If O\*NET registration is approval-gated, you find out now, not at 1:00. |
| 0:10–0:30 | Read the raw JSON from that script. Fix every field path marked `VERIFY:` in `lib/onet.js` and `lib/careeronestop.js`. This is the actual work — the fetch plumbing is already written. |
| 0:30–1:00 | `MOCK=0 npm start` → `npm run smoke`. Get `/api/match` returning live O\*NET data. |
| 1:00–1:20 | Same for `/api/gap`. CareerOneStop's have/missing flag is the one genuinely uncertain field — resolve it in `normalizeGap`, not in the frontend. |
| 1:20–1:30 | Overwrite `data/fixtures/*.json` with **real** captured responses in our normalized shape. This is the demo safety net; a fabricated fixture is worse than none. |
| 1:30–2:00 | Deploy (`render.yaml` is ready — Blueprint, set the four secrets, push). Get the public URL to B. |

**Do not touch** `public/*` or `data/portland-jobs.json`.

---

## Engineer B — data and frontend

Owns: `public/*`, `data/portland-jobs.json`, `data/growth-sectors.json`, `README.md`

| Clock | Task |
|---|---|
| 0:00–0:20 | **Real data, by hand.** Open `boards-api.greenhouse.io/v1/boards/{token}/jobs` in a browser for 2–3 Portland employers, confirm the tokens are live, and replace every `EXAMPLE_DO_NOT_DEMO` row in `data/portland-jobs.json` with a real open listing. Tag each with O\*NET-SOC codes by hand. Target 15–20. If no token pans out, hand-compile from public postings and set `source` honestly — the rules reward disclosed manual data over a fake live pull. |
| 0:20–0:30 | Replace the `TODO` trend strings in `data/growth-sectors.json` with real QualityInfo.org Portland Metro figures. Verify the WorkSource Oregon URL loads. |
| 0:30–1:20 | `npm run dev` and build against fixtures. The skeleton renders all four steps already. Focus on behavior, not looks — the empty state, the loading state, and the no-match fallback each need to render something deliberate. |
| 1:20–1:45 | Full flow, top to bottom, with A's live backend. Click every path including the no-match one. |
| 1:45–2:00 | Drop in the design system (see below). Confirm the disclosure line is visible in the UI (it's already in `index.html` — keep it). Finish the README. |

**On styling:** `public/styles.css` is a deliberate stub — structural rules plus a
readability floor, nothing else. A design system is being built separately and
replaces this file wholesale. The markup already carries the hooks it needs
(they're listed at the top of `styles.css`). Don't invest in CSS before it lands.

**Do not touch** `server.js` or `lib/*`.

---

## Shared, agree out loud

- **`API.md` changes require both of you.** Field renames are the one thing that
  can cost you 20 minutes at 1:30.
- **Pick the demo occupation early.** Whatever A's O\*NET match returns for
  Dana's text, B needs at least one job in `portland-jobs.json` tagged to one of
  its *related* occupations — otherwise the demo lands on the fallback path.
  Confirm this by 1:00, not at 1:50.
- **Commit small, push often, `main` only.** No branches, no PRs, two hours.

## Hard cut list (from the PRD)

No accounts. No database. No live scraping. No resume parsing. No design system.
No mobile. No second occupation match. If you're building one of these, stop.
