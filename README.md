# Skills Bridge PDX

Type in your current or former job in plain English. Get back what your skills
actually transfer to, the specific gap to close for a target role, and real open
positions in Portland right now.

Built for the **Displacement** track at the Claude Impact Portland hackathon.
Full scope in [PRD.MD](PRD.MD). Two-engineer plan in [SPLIT.md](SPLIT.md).
API contract in [API.md](API.md).

## Run it

No install step. No dependencies. Node 20+.

```bash
npm run dev      # MOCK=1 — fixtures only, no credentials needed
npm run smoke    # in a second terminal: hits every route
```

Then open http://localhost:3000.

For live API calls:

```bash
cp .env.example .env      # fill in O*NET + CareerOneStop credentials
./scripts/capture-fixture.sh   # confirm the credentials work with raw curl first
npm run live
```

## What's live vs. what's hardcoded

Stated plainly here and in the app's own footer.

| Part | Status |
|---|---|
| Occupation matching from free text | **Live** — O\*NET Web Services keyword search |
| Skills for the matched occupation | **Live** — O\*NET |
| Related / adjacent occupations | **Live** — O\*NET related-occupations service |
| Plain-language "why these overlap" text | **Written by us**, templated over O\*NET's related list |
| Skills gap between two occupations | **Live** — CareerOneStop Skills Gap API (DOL-sponsored) |
| Portland job listings | **Hardcoded** — `data/portland-jobs.json`, a real dataset assembled by hand from local employers' public job boards. Not a live feed. |
| Growth-sector fallback | **Hardcoded** — `data/growth-sectors.json`, from QualityInfo.org Portland Metro data |
| Cached API responses | `data/fixtures/` — served when `MOCK=1`, and as a silent fallback if a live call fails during the demo |

Both live APIs require auth headers a browser can't send, which is the only
reason there's a backend at all.

## Layout

```
server.js                  zero-dependency node:http — static files + 4 routes
lib/onet.js                O*NET client; normalizes to OUR shape (API.md)
lib/careeronestop.js       skills-gap client; same rule
lib/jobs.js                local SOC-code match against portland-jobs.json
lib/fixtures.js            canned responses: dev mode + demo safety net
data/portland-jobs.json    hand-assembled, disclosed
data/growth-sectors.json   hand-assembled, disclosed
data/fixtures/*.json       normalized example responses
public/index.html          one page, one input box
public/app.js              fetch + render, no framework
public/styles.css          barebones stub — design system lands separately
scripts/smoke.sh           hits every route
scripts/capture-fixture.sh raw curl against both APIs, run this first
```

## Deploy

`render.yaml` is a Render Blueprint — point Render at the repo, set the four
secrets in the dashboard, done. There's no build step.

## Honest limitations

- One occupation match at a time. No accounts, no database, no saved sessions.
- The job list is a snapshot, not a feed. It goes stale the day after we pull it.
- Occupation matching is O\*NET keyword search, so an unusual job description
  can match something off. There's no disambiguation UI.
