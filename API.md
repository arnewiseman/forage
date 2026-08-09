# API contract — FROZEN

Both engineers code against this. **Do not change a field name without telling the other person out loud.**

The whole point: `lib/onet.js` and `lib/careeronestop.js` **normalize at the boundary**. They return
*our* shape, never the raw upstream shape. When Engineer A discovers what O\*NET actually returns,
the fix lands in one normalize function and the frontend never notices.

Every response in `data/fixtures/` is a literal example of these shapes. With `MOCK=1` the server
serves exactly those files, so the frontend is fully buildable before any credential exists.

## Conventions

- All responses are JSON.
- Errors: HTTP 4xx/5xx with `{ "error": "human readable message", "code": "MACHINE_CODE" }`.
- `code` is always an O\*NET-SOC code string like `"41-3011.00"`.
- Empty results are `[]`, never `null`.

---

## `GET /api/health`

Sanity check. Also tells you whether you're on live data or fixtures.

```json
{ "ok": true, "mock": true, "onetConfigured": false, "cosConfigured": false }
```

---

## `POST /api/match`

Step 1–4 of the flow, in one round trip. Frontend sends the free-text job description; server does
the O\*NET keyword search, the skills pull, and the related-occupations pull.

**Request**

```json
{ "text": "I managed ad campaigns and client relationships for 4 years" }
```

**Response `200`**

```json
{
  "occupation": {
    "code": "41-3011.00",
    "title": "Advertising Sales Agents",
    "description": "Sell or solicit advertising space, time, or media in publications..."
  },
  "skills": [
    { "name": "Persuasion", "description": "Persuading others to change their minds or behavior.", "importance": 75 }
  ],
  "related": [
    {
      "code": "13-1161.00",
      "title": "Market Research Analysts and Marketing Specialists",
      "overlap": "Both roles live on client data and campaign performance — you already read the numbers, this role owns them."
    }
  ],
  "source": "onet"
}
```

- `skills` — top 5–8, sorted by `importance` descending. `importance` is 0–100.
- `related` — 3–5 items. `overlap` is a **plain-language sentence**, not a score. If a real O\*NET
  similarity score is all that's available, Engineer A writes the sentence template around it.
- `source` — `"onet"` on a live call, `"fixture"` when MOCK or when the live call failed and we fell
  back. The frontend does not need to show this, but it's how we debug on stage.

**Errors** — `400 EMPTY_INPUT`, `404 NO_MATCH` (nothing matched the keywords), `502 UPSTREAM_ERROR`.

---

## `GET /api/gap?from=41-3011.00&to=13-1161.00`

Step 6. CareerOneStop skills gap between the matched occupation and the chosen target.

**Response `200`**

```json
{
  "from": { "code": "41-3011.00", "title": "Advertising Sales Agents" },
  "to":   { "code": "13-1161.00", "title": "Market Research Analysts and Marketing Specialists" },
  "have": [
    { "name": "Persuasion", "note": "You already do this daily." }
  ],
  "missing": [
    { "name": "Statistical Analysis", "note": "The one real gap — this is what a 6-week course closes." }
  ],
  "source": "careeronestop"
}
```

- `note` is optional and may be `""`. The frontend must render fine without it.
- Order matters: put the **most demo-worthy missing skill first**. Engineer A owns that sort.

**Errors** — `400 MISSING_PARAM`, `502 UPSTREAM_ERROR`.

---

## `GET /api/jobs?code=13-1161.00`

Step 7–8. Pure local lookup against `data/portland-jobs.json`. No network, no credentials — this
route works on day one.

**Response `200` — matches found**

```json
{
  "matches": [
    {
      "id": "example-001",
      "title": "Marketing Analyst",
      "company": "EXAMPLE_DO_NOT_DEMO — replace with a verified listing",
      "location": "Portland, OR",
      "url": "https://example.com",
      "socCodes": ["13-1161.00"],
      "source": "Greenhouse public board",
      "pulledAt": "2026-08-08"
    }
  ],
  "fallback": null
}
```

**Response `200` — no local match** (the honest dead-end path; still a `200`)

```json
{
  "matches": [],
  "fallback": {
    "message": "No open Portland-area role in our dataset maps to this occupation right now.",
    "sectors": [
      { "name": "Health Care & Social Assistance", "trend": "Fastest-growing sector in the Portland metro", "source": "QualityInfo.org" }
    ],
    "resource": {
      "name": "WorkSource Oregon",
      "url": "https://worksourceoregon.org/",
      "description": "Free state-run career counseling and retraining referrals."
    }
  }
}
```

The frontend renders `fallback` whenever `matches` is empty. Never show a blank panel.

**Errors** — `400 MISSING_PARAM`.
