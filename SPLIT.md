# Two people, two hours

**Arne — backend.** O\*NET + CareerOneStop. Owns `server.js`, `lib/*`, `scripts/*`.
**Second engineer — design system + UI.** Owns `public/*`.

The scaffold is already runnable: `npm run dev` boots and the whole flow renders end to end.
File ownership is disjoint — neither of you edits the other's files.

## What's already done (don't rebuild it)

**Jobs are live and need no credentials.** Greenhouse and Lever both expose public,
unauthenticated board APIs. Verified working: 6/6 boards reachable, 48 open Portland-metro roles
right now across New Relic, ZoomInfo, Smarsh, Jama, Airship, and Vacasa. `lib/boards.js` fetches
them, `lib/jobs.js` matches them to an occupation, and `scripts/snapshot-jobs.mjs` writes the
offline fallback.

This deletes the PRD's 0:10–0:30 block entirely. Nobody hand-assembles a job file, and the data is
*more* honest than the original plan — it's a real feed, not a morning snapshot.

**Add a board** by appending one line to `SOURCES` in `lib/boards.js`. A token that 404s is skipped
silently. The token is the slug in a company's public board URL. More Portland employers = a better
demo, and it costs one line each.

## The one thing that still needs credentials

**O\*NET returns 401 without registration.** There is no way around it, and it's the backbone of
the whole app — occupation match, skills, and related occupations all come from it. Register before
the clock starts if you possibly can, not at 0:00.

CareerOneStop (the skills-gap step) is the same story. See the contingency below.

---

## Arne — backend

| Clock | Task |
|---|---|
| **before 0:00** | Register at services.onetcenter.org and careeronestop.org. `cp .env.example .env`, fill it, run `./scripts/capture-fixture.sh`. If registration is approval-gated you need to know now, not at 0:10. |
| 0:00–0:40 | Read the raw JSON from that script. Fix every field path marked `VERIFY:` in `lib/onet.js`. The fetch plumbing is written; this is just reconciling field names. Then `npm start && npm run smoke`. |
| 0:40–1:10 | Same for `lib/careeronestop.js`. The have-vs-missing flag in `normalizeGap` is the one genuinely uncertain field — resolve it there, never in the frontend. |
| 1:10–1:25 | Overwrite `data/fixtures/*.json` with **real** captured responses in our normalized shape. That's the demo safety net; a hand-written fixture is a lie waiting to be caught. |
| 1:25–1:40 | Add 3–5 more Portland employers to `SOURCES`, re-run `node scripts/snapshot-jobs.mjs`. |
| 1:40–2:00 | Deploy. `render.yaml` is a ready Blueprint — set the four secrets, push. **Render's free plan cold-starts in ~50 seconds after 15 min idle; load the URL right before you present.** |

## Second engineer — design system + UI

| Clock | Task |
|---|---|
| 0:00–1:20 | Build the design system against `npm run dev`. It serves fixtures, so you never wait on Arne or on credentials. All four steps already render with real job data. |
| 1:20–1:40 | Integrate. Ideally you replace `public/styles.css` wholesale and touch no markup — the hooks are listed in a comment at the top of that file. If you need new hooks, add classes to `index.html`; it's yours. |
| 1:40–1:50 | The three states that decide whether this feels real: **loading** (the live board fetch takes 1–2s), **no-match fallback**, and **error**. Click all three. |
| 1:50–2:00 | Confirm the disclosure line is still visible in the footer, and that the jobs provenance line renders. Don't cut them — they're the integrity of the demo. |

**Test the fallback path:** submit anything, then pick an occupation with no matching roles. From
Dana's flow, the 2nd adjacent occupation currently has matches; try a healthcare-flavored input to
land on the fallback.

---

## Agree out loud

- **`API.md` is frozen.** Field renames are the one thing that can cost 20 minutes at 1:30.
- The clients normalize upstream into *our* shape. When Arne learns what O\*NET really returns, the
  fix lands in one function and the UI never notices. Keep it that way.
- **Commit small, push often, `main` only.** No branches, no PRs, two hours.

## Contingency: CareerOneStop doesn't come through

It's step 6 of 8 and the emotional center of the demo, so decide this now rather than at 1:15.
Compute the gap by diffing the two occupations' O\*NET skill lists instead — same screen, one API
instead of two, and honest as long as the README says so. It's a ~20-line change to
`lib/careeronestop.js` behind the same function signature, so nothing else moves.

## Hard cut list (from the PRD)

No accounts. No database. No resume parsing. No mobile. No second occupation match.
If you're building one of these, stop.
