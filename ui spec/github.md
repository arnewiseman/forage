repo: arnewiseman/forage
branch: main

## Last sync

date: 2026-08-09T02:18:18Z

### Updated in this project

- Read `PRD.MD` in full — the repo's only file — and built the whole design system from it.
- No UI, tokens, logo, fonts or icon set exist upstream; everything visual here is new work.
- Product name used throughout: **Forage** (PRD working title "Skills Bridge PDX").

## Screen map

| Project screen | Built from |
|---|---|
| `ui_kits/forage-app/DescribeScreen.jsx` | `PRD.MD` — "MVP user flow" steps 1, "One-liner", disclosure line |
| `ui_kits/forage-app/MatchScreen.jsx` | `PRD.MD` — flow steps 2–5 (O*NET match, skills, related occupations) |
| `ui_kits/forage-app/GapScreen.jsx` | `PRD.MD` — flow step 6 (CareerOneStop skills gap) |
| `ui_kits/forage-app/RolesScreen.jsx` | `PRD.MD` — flow steps 7–8 (`portland-jobs.json`, `growth-sectors.json`, fallback resources) |
| `ui_kits/forage-app/AppShell.jsx` | `PRD.MD` — overall single-page architecture |
| `templates/forage-screen/ForageScreen.dc.html` | `PRD.MD` — screen frame derived from the above |
