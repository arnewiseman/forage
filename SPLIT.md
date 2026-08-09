# Two people, two hours

**Arne — backend.** Owns `server.js`, `lib/*`, `scripts/*`, `data/*`.
**Second engineer — design system + UI.** Owns `public/*`.

File ownership is disjoint. Neither of you edits the other's files.

## Start here

```bash
npm start        # http://localhost:3000
```

No install, no credentials, no build step. The full flow works right now:
free-text input → occupation match → skills → adjacent occupations → skills gap
→ real open Portland jobs → honest fallback when there's no match.

**There is no blocker left.** That's the important part.

## Why there's no blocker

The PRD's single point of failure was O\*NET registration — `services.onetcenter.org`
returns `401` without a human-reviewed account. But O\*NET publishes the same data as a
**public-domain bulk download with no account at all**, so `data/onet.json` is built
from that (`npm run onet`). 879 occupations, 55,120 alternate titles, skills, knowledge,
hot technologies, related occupations.

Same story for jobs: Greenhouse's and Lever's board APIs are public and unauthenticated.
6/6 boards reachable, 48 open Portland-metro roles right now.

And the skills gap is an importance diff across O\*NET's Skills, Knowledge, and Hot
Technology tables — so CareerOneStop isn't needed either. Drop credentials in `.env`
and `/api/gap` upgrades to their API automatically, but nothing depends on it.

**Net effect: the 0:00–0:30 block of the PRD is already done, and the demo cannot die
on a network call.**

---

## Arne — backend

Everything here is quality work, not unblocking work. Pick in this order.

| Priority | Task |
|---|---|
| 1 | **Job matching quality.** `lib/jobs.js` matches occupation title tokens against job titles. It works, but "Customer Solutions Analyst" surfacing for a market-research target is loose. Try matching against the occupation's *alternate titles* too — `data/onet.json` has 55k of them and they're much closer to how postings are worded. Highest-leverage change in the repo. |
| 2 | **More employers.** One line each in `SOURCES` in `lib/boards.js`, then `npm run jobs`. A 404 token is skipped silently. More Portland employers = a better demo, and healthcare/trades boards would fix the fallback path being easy to trigger. |
| 3 | **Deploy.** `render.yaml` is a ready Blueprint and needs no secrets. **Render's free plan cold-starts in ~50 seconds after 15 min idle — load the URL right before you present.** |
| 4 | **Growth sectors.** `data/growth-sectors.json` still has `TODO` trend strings. Real QualityInfo.org Portland Metro figures, 10 minutes. |
| 5 | Optional: register CareerOneStop. Buys official gap figures over our local diff. Genuinely optional now. |

## Second engineer — design system + UI

| Clock | Task |
|---|---|
| 0:00–1:20 | Build the design system against `npm start`. Real data flows from minute zero — you're never blocked on Arne or on credentials. |
| 1:20–1:40 | Integrate. Ideally you replace `public/styles.css` wholesale and touch no markup — the hooks are listed in a comment at the top of that file. If you need new hooks, add classes to `index.html`; it's yours. |
| 1:40–1:50 | The three states that decide whether this feels real: **loading** (the live board fetch takes 1–2s), **no-match fallback**, and **error**. Click all three. |
| 1:50–2:00 | Confirm the footer disclosure and the jobs provenance line still render. Don't cut them — they're the integrity of the demo. |

**To see the fallback path:** submit `I was a registered nurse` and pick any adjacent
occupation. No healthcare employers are in `SOURCES` yet, so it lands on growth sectors.

---

## Demo notes

The flow that works today, verified end to end:

```
"I managed ad campaigns and client relationships for 4 years"
  → Advertising and Promotions Managers
  → adjacent: Advertising Sales Agents · Marketing Managers
             · Market Research Analysts · Search Marketing Strategists
  → gap to Market Research Analyst:
      missing  Mathematics (63 vs 81), Sociology and Anthropology,
               Amazon Redshift, Apache Hadoop, Apache Hive
      have     Sales and Marketing, Communications and Media, Active Listening…
  → 7 open Portland roles, fetched live
```

**Say this out loud:** *"Occupations, skills and the gap come from the Department of
Labor's O\*NET database — public domain, queried locally. The job listings are fetched
live from six Portland employers' public job boards. We match jobs to occupations on
title keywords, which is rough — these are leads, not a filtered shortlist."*

Naming that last limitation is worth more than hiding it.

## Agree out loud

- **`API.md` is frozen.** Field renames are the one thing that can cost 20 minutes at 1:30.
- **Commit small, push often, `main` only.** No branches, no PRs, two hours.

## Hard cut list (from the PRD)

No accounts. No database. No resume parsing. No mobile. No second occupation match.
If you're building one of these, stop.
