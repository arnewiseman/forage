# PRD: Skills Bridge PDX

*A 2-hour scope for the Claude Impact Portland hackathon*

## One-liner

Type in your current or former job in plain English. Get back: what your skills actually transfer to, the specific gap to close for a target role, and real open positions in Portland right now.

## Track fit

**Displacement** — "help a Portlander laid off or at risk find the next thing." This hits the "skills-to-jobs mapper" opening directly.

## Target user

Dana, a Portland ad-ops account manager laid off six weeks ago. She doesn't know if her skills mean anything outside ad tech, doesn't know what's actually hiring, and every "AI will take your job" article makes it worse instead of better.

## MVP user flow (the whole app)

1. User types a free-text job description ("I managed ad campaigns and client relationships for 4 years")
2. App calls O*NET keyword search → matches to an O*NET occupation code
3. App pulls that occupation's top skills from O*NET
4. App shows 3–5 related/adjacent occupations (O*NET's related-occupations service) with overlap explained in plain language
5. User picks one target occupation
6. App shows the CareerOneStop skills-gap between their matched occupation and the target — "you have X, you're missing Y"
7. App cross-references against a hardcoded list of ~15–20 real, currently-open Portland-area roles, and surfaces any that match the target occupation
8. If no local match, app says so honestly and points to one hardcoded reskilling resource (WorkSource Oregon, PCC, etc.)

That's it. That's the whole app.

## Explicit non-goals (the cut list — read this before you touch Claude Code)

- ❌ No accounts, no login, no saved sessions
- ❌ No database — everything lives in memory or a static JSON file
- ❌ No live scraping of job boards during the demo — the job list is a hardcoded, disclosed dataset assembled once up front
- ❌ No resume upload/parsing — text box only
- ❌ No styling system beyond one clean CSS pass — do not spend time on a design system
- ❌ No mobile optimization
- ❌ No handling more than one occupation match at a time
- ❌ No fine-tuning, no training, no custom model — this is API calls and UI, full stop

If you find yourself building any of the above, you've drifted off the PRD.

## Data sources (verified free, no paid signups)

| Source | Used for | Notes |
|---|---|---|
| O*NET Web Services | occupation match, skills, related occupations | Register at services.onetcenter.org **first**, before anything else — confirm the account works before you scope further |
| CareerOneStop Skills Gap API | gap between current and target occupation | Free registration, DOL-sponsored |
| Hardcoded `portland-jobs.json` | 15–20 real open roles | Pull from 2–3 verified Greenhouse-hosted Portland-area company boards (`boards-api.greenhouse.io/v1/boards/{token}/jobs`), check tokens live in browser first, no scraping infra needed |
| Hardcoded `growth-sectors.json` | fallback when no direct job match | 5–10 rows pulled from QualityInfo.org Portland Metro data, by hand |

**Disclosure line for demo:** ~~"Occupation matching and skill gaps are live O*NET/CareerOneStop calls. The Portland job listings are a real dataset we pulled this morning from three local employers' public job boards — not a live feed."~~

> **AMENDED 2026-08-08 — say this instead.** Two things turned out better than this PRD assumed,
> and together they remove every credential from the project:
>
> 1. **Greenhouse and Lever board APIs are public and unauthenticated.** Job listings are a genuine
>    live feed. Verified: 6/6 boards reachable, 48 open Portland-metro roles.
> 2. **O\*NET publishes its whole database as a public-domain download, no account needed.** The
>    web service 401s without human-reviewed registration, but the bulk file doesn't. So occupation
>    match, skills, related occupations *and* the skills gap all run locally — which also means
>    nothing can die on a network call mid-demo. CareerOneStop became optional.
>
> This deletes the 0:00–0:30 block below entirely, and the "single point of failure" in the
> Timeline section no longer exists.
>
> New line: *"Occupations, skills and the gap come from the Department of Labor's O\*NET database —
> public domain, queried locally. The job listings are fetched live from six Portland employers'
> public job boards. We match jobs to occupations on title keywords, which is rough — these are
> leads, not a filtered shortlist."*
>
> Saying the last sentence out loud is worth more than hiding it. See `SPLIT.md`.

## Architecture (dead simple, on purpose)

```
/server.py or server.js   — thin backend, proxies O*NET + CareerOneStop
                             (both require Basic Auth, can't call from browser)
/data/portland-jobs.json  — hardcoded, real
/data/growth-sectors.json — hardcoded, real
/public/index.html        — single page, one input box
/public/app.js             — fetch calls to your own backend, render results
```

No frontend framework. No build step. One backend file, two data files, one HTML page. Claude Code can scaffold this whole thing in one shot.

## Timeline (mapped to the hackathon clock)

| Time | Task |
|---|---|
| 0:00–0:10 | Register O*NET + CareerOneStop credentials, confirm both work with a raw curl |
| 0:10–0:20 | Check 2–3 Greenhouse company tokens live, pull real listings, hand-write `portland-jobs.json` |
| 0:20–0:30 | Hand-write `growth-sectors.json` from QualityInfo |
| 0:30–1:20 | Claude Code builds backend proxy + occupation match + skills + related occupations + skills-gap flow |
| 1:20–1:45 | Wire in job-list matching + fallback path, get the full flow working end to end once |
| 1:45–2:00 | One CSS pass, write the disclosure line into the UI itself, prep the 90-second demo, submit link |

Buffer is intentionally thin — if O*NET registration is slow or approval-gated, that's your single point of failure, which is why it's step one, not step five.

## Demo script (90 seconds max)

1. "This is for Dana — laid off from ad ops, doesn't know what transfers." (10s)
2. Type her job in live. Show the O*NET match. (15s)
3. Show related occupations, pick one. (10s)
4. Show the skills gap — name one specific missing skill. (15s)
5. Show it surfacing a real, open Portland role that matches. (20s)
6. Say the disclosure line out loud. (10s)
7. "This is buildable as a real WorkSource Oregon tool next week — the hard part, the skills matching, is already live and free." (10s)

## Risks + fallback

- **O*NET/CareerOneStop is down or rate-limited during the live demo** → cache 3–4 known-good responses locally as a silent fallback, don't let the demo die on a network call
- **No Greenhouse token pans out for a real Portland company** → fine, hand-compile the job list from public postings instead and say so; the rules explicitly reward disclosed manual data over a fake live pull

## Definition of done

- [ ] One text box, one working end-to-end flow, no dead ends
- [ ] GitHub repo public, README states what's live vs. hardcoded
- [ ] Demo link works standalone, no localhost dependency
- [ ] Submitted before minute 100
