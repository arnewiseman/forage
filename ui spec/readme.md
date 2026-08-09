# Forage — design system

**Forage** is the product name we use throughout this system for the app specified in `forage/PRD.MD`, working title **Skills Bridge PDX**: a single-page tool that takes a plain-English description of someone's job and returns the occupations it transfers to, the specific skills gap to close, and real open roles in the Portland metro.

The audience is one person: *Dana, a Portland ad-ops account manager laid off six weeks ago.* Every decision in this system — the plain speech, the honest empty states, the refusal to hype — is made for her. She does not need a product that sounds excited. She needs one that tells her the truth quickly.

---

## 1. Sources this system was built from

| Source | What it gave us | Access |
|---|---|---|
| `forage/PRD.MD` (attached local codebase) | The entire product definition: user flow, non-goals, data sources, demo script | Read in full |
| GitHub — [github.com/arnewiseman/forage](https://github.com/arnewiseman/forage) (`main`) | The same PRD, and nothing else — the repo contains exactly one file | Read in full |
| Brief note from the user | "Portland Oregon inspired UI" | — |

**There was no existing UI, no code, no Figma file, no logo, no brand palette, and no font files in any source.** The PRD explicitly says *"No styling system beyond one clean CSS pass — do not spend time on a design system."* That was a hackathon-scoping decision; this project is the design system that instruction deferred.

So: everything visual here is **new work**, invented for this brand, not recovered from a source. Read it as a proposal, not a recreation. Anywhere the source was silent, this readme says so.

> Explore [github.com/arnewiseman/forage](https://github.com/arnewiseman/forage) yourself before extending this system — if the repo has grown past the PRD since this was written, the real code should overrule anything here.

---

## 2. Products in this system

There is **one** product surface: the Forage web app, a single-page, no-login, no-database flow. See `ui_kits/forage-app/`.

`Describe → Match → Target → Gap → Roles`

There is no marketing site, no dashboard, no admin, no mobile app in the source, so none are built here.

---

## 3. Content fundamentals

### Voice in one line
**Say the true thing, in the fewest plain words, with the number attached.**

Forage is talking to someone who has been told for six weeks that they are "pivoting," "reskilling," and "future-proofing." Those words are now noise to her. The product's advantage is that it does not use them.

### Rules

- **Second person, active voice.** "Four of the seven skills for this role are already yours." Never "the candidate possesses."
- **We, not the app.** Forage says "we pulled these this morning" — it takes responsibility for its own data.
- **Sentence case everywhere** except two places: the uppercase micro-labels above form fields (`TARGET OCCUPATION`) and the rose eyebrow labels above section headings (`STEP 2 — YOUR MATCH`). Never title-case a sentence.
- **Numbers, always.** "68% overlap," "3 of 7 skills," "18 roles from three local employers." A claim without a number is a claim Forage does not make.
- **Name the source in the sentence.** "Matched to Advertising and Promotions Managers (11-2011.00)." "Transcribed by hand from QualityInfo.org." The provenance is part of the copy, not a footnote.
- **Honest negatives.** When there is no match, say there is no match and why: *"Our dataset has 18 roles from three local employers, pulled this morning. None of them line up with Marketing Manager today."* Then give exactly one real next step. Never pad an empty state with an upsell.
- **No hype vocabulary.** Banned: *unlock, empower, journey, supercharge, AI-powered, seamless, revolutionary, hidden potential, elevate.* If a sentence would survive being pasted into any other product's homepage, rewrite it.
- **No exclamation marks.** Not one, anywhere, including toasts.
- **Contractions are fine** ("you'll", "we're") — but "we will" reads steadier in headlines, and Forage prefers steady.
- **Em dashes and en dashes** are used freely; Forage's prose is conversational and clause-heavy, closer to a knowledgeable person talking than to marketing copy.

### Emoji
**Never.** No emoji in UI copy, empty states, toasts, or documentation. The subject matter is somebody's livelihood; a 🎉 on a job match would be an insult. Iconography is Lucide only (§6).

### Casing and punctuation specifics

| Thing | Style | Example |
|---|---|---|
| Buttons | Sentence case, verb-first, no period | `Find what transfers` · `See open Portland roles` |
| Field labels | ALL CAPS, 12px, 0.08em tracking | `WHAT DID YOU DO?` |
| Eyebrows | ALL CAPS, 0.14em tracking, rose | `STEP 4 — THE GAP` |
| Occupation codes | Monospace, verbatim from O*NET | `11-2011.00` |
| Place | Always "Portland" or "Portland metro", never "PDX" in body copy — `PDX` appears only in the product's own subtitle | `Portland, OR` |
| Dates | `8 Aug 2026` in disclosures; relative ("3 days ago") on listings | |

### Worked examples

> **Headline (landing):** Your job already transfers. Here is where.
> **Sub:** Type what you did in plain English. We will name the occupations it maps to, the one gap to close, and the roles open in Portland right now.

> **Disclosure (every data screen):** Occupation matching and skill gaps are live O*NET / CareerOneStop calls. The Portland job listings are a dataset assembled by hand from local employers' public job boards — not a live feed.

> **Toast:** Saved Marketing Manager, Retail — Columbia Sportswear. *(Not "Saved! 🎉")*

> **Caution:** O*NET is slow right now. Showing a cached response from 8:02am.

---

## 4. Visual foundations

### The idea
**Pacific Northwest field guide, screen-printed.** Warm newsprint paper, deep evergreen ink, one loud rose accent, and a hard offset shadow borrowed from two-colour screen printing. It should feel like a well-made public-service publication produced in Portland — closer to a Parks department trail guide or an independent risograph zine than to a SaaS dashboard. Practical, warm, a bit handmade, completely unhyped.

### Colour
Full ramps live in `tokens/colors.css`; every card in the **Colors** group shows them.

- **Fir** (`#1E3A2F` at 700) — Cascade evergreen. The primary. Buttons, headings, brand surfaces, the inverse feature block.
- **Rose** (`#B23A48` at 600) — Portland is the Rose City. The *only* loud colour, and it is rationed: the full stop in the wordmark, eyebrow labels, the active tab underline, destructive actions, missing-skill tags. If rose is on screen more than three times, something is wrong.
- **Hood** (`#3E6076` at 700) — glacier slate. Links and informational states.
- **Amber** (`#D98E32` at 500) — Willamette autumn. Caution, gaps, "in progress".
- **Moss** (`#5C8F4E` at 500) — understory green. Growth, positive, "you already have this".
- **Paper / ink** — `#FFFDF8` → `#16211C`. **Never `#fff`, never `#000`.** Every neutral is warm; a cool grey anywhere in a Forage screen reads as a bug.

Semantic aliases (`--surface-card`, `--text-muted`, `--action-primary-bg`, …) exist for everything. Reach for those first; drop to a raw ramp step only for a one-off.

Skill-gap colour convention, used consistently across the product: **moss = you have it, rose = you don't, amber = the size of the gap.**

### Typography
- **Display — Bricolage Grotesque**, weights 600/700/800, tracking −0.024em at display sizes. Slightly irregular, contemporary, a little bit indie-press. Headlines, card titles, tabs, stepper labels.
- **Body — Public Sans**, 400/500/700, 1.62 leading. A civic typeface (it is the US federal design system's face) — the right register for a tool built on Department of Labor data.
- **Mono — JetBrains Mono**, 400/500. Occupation codes, percentages, counts, dates, and the disclosure block.

**Font substitution flag:** no font binaries were supplied with the source. All three faces are loaded from Google Fonts in `tokens/fonts.css`. If Forage has real licensed faces, swap the `@font-face`/import there and the whole system follows — nothing else references a family name directly.

Eleven-step size ramp, 11px → 64px (`guidelines/type-ramp.html`). Do not invent intermediate sizes.

### Spacing and layout
- 4px-based scale, 2 → 96px. Component padding lives in 8–24; page rhythm in 32–96.
- **Fixed measures:** `--width-content: 1080px` for the app shell, `--width-narrow: 680px` for the landing column, `--measure-prose: 64ch` for anything read as sentences.
- Control heights are exactly 32 / 40 / 48px. Nothing else.
- The header is `position: sticky` at the top with a hairline bottom border; the stepper strip sits under it on a `--paper-050` band. Nothing else in the product is fixed or floating except dialogs and toasts.
- Layouts are asymmetric two-column (`380px 1fr`, `1fr 320px`) rather than even splits — the field-guide feel comes partly from a narrow reference column beside a wide reading column.

### Backgrounds and imagery
Flat, warm, and empty. **No photography, no gradients, no illustration, no texture overlays.** The page is `--paper-100`, cards are `--paper-000`, sunken areas are `--paper-200`. The single decorative device in the whole system is a 1px repeating vertical rule at 10% white over the fir inverse surface (`guidelines/brand-texture.html`) — a nod to printed rule lines. Use it at most once per screen.

There is no brand imagery in the sources, so there is none here. If photography is ever added, it should be warm-cast, overcast-daylight, documentary, grain-tolerant, and never people-in-a-bright-office stock.

### Borders, corners, elevation
- Radii: 3 / 5 / 8 / 12 / 18px and pill. **Cards are 8px. Controls are 5px. Pills only for tags and switches.**
- Borders: 1px hairline (`--paper-300`) for calm surfaces, 1.5px for controls and secondary buttons, 2px ink for emphasis, 1px dashed rain for disclosure and empty states.
- **Cards** = `--paper-000` background, 1px hairline border, 8px radius, **no shadow by default.** Elevation is not how Forage separates things; the warm border does it.
- Three soft shadows exist (`--shadow-1/2/3`) and are used sparingly — raised panels, dialogs, toasts.
- **The print offset** (`--shadow-print: 3px 3px 0 var(--ink-900)`) is the signature. A hard, un-blurred offset in ink. It appears on: the one hero card per screen (`Card variant="print"`), secondary buttons on hover, and outline icon buttons on hover. Never more than one print-shadowed *static* element per screen.

### Transparency and blur
Almost none. The only translucent surface in the system is the dialog scrim (`--surface-overlay`, `rgba(22,33,28,.44)`). **No frosted glass, no backdrop-filter, no translucent headers.** Paper is opaque.

### Motion
Fast, short, entirely functional. 80ms for hover tints, 130ms for controls, 190ms for dialogs and panels, 280ms only for a meter bar filling (the one animation that carries meaning — you should see the number arrive). Everything eases out: `cubic-bezier(.2,.7,.2,1)`. Dialogs enter with an 8px rise and a 0.985 scale. **Nothing bounces, nothing springs, nothing loops, nothing parallaxes.** All durations collapse to 0 under `prefers-reduced-motion`.

### Interaction states

| State | Treatment |
|---|---|
| **Hover — primary button** | Darkens one step (`fir-700 → fir-800`). Never lightens, never lifts. |
| **Hover — secondary button / outline icon button** | Gains the 3px print shadow and translates −1px/−1px. The element appears to lift off the page like a printed sticker. |
| **Hover — ghost** | Fills with `--fir-050`. |
| **Hover — card (interactive)** | Border goes `--fir-500`, gains `--shadow-2`. A print card instead deepens its offset to 5px and shifts −1px. |
| **Hover — tag** | Border and text go fir, background `--fir-050`. |
| **Press** | Everything translates **down and right** (`translate(1px,1px)`) and loses its shadow — the print sticker being pushed flat. Primary buttons additionally darken to `fir-900`. Nothing scales down. |
| **Focus** | 2px solid `--fir-500` outline at 2px offset on every focusable element; form controls also get a 3px `--fir-200` halo. Focus is never removed. |
| **Selected** | Fir fill with paper text (tags), fir border + `--fir-050` background (cards), rose 3px underline (tabs). |
| **Disabled** | `--paper-200` background, `--rain-400` text, no border, no shadow, `not-allowed` cursor. Never below 3:1 against paper. |

### Anti-patterns for this brand
Purple or blue-violet gradients · pure white cards · cool grey text · frosted glass · emoji · drop-shadow-heavy "floating" layouts · rounded 16px+ "friendly" cards · centre-aligned body paragraphs · icon-in-a-coloured-circle rows · confetti or celebration states · progress rings · dark mode (not designed; see caveats).

---

## 5. Tokens

`styles.css` at the root is an `@import` list only. It reaches:

| File | Contents |
|---|---|
| `tokens/fonts.css` | Google Fonts import for Bricolage Grotesque, Public Sans, JetBrains Mono |
| `tokens/colors.css` | Five ramps, warm neutrals, ~40 semantic aliases |
| `tokens/typography.css` | Families, weights, 11-step size ramp, leading, tracking, composite `--type-*` roles |
| `tokens/spacing.css` | 4px scale, control heights, layout widths |
| `tokens/shape.css` | Radii, border widths, three soft shadows + the print offsets |
| `tokens/motion.css` | Durations, easings, `--transition-control`, reduced-motion override |
| `tokens/base.css` | Element resets, link colours, focus ring, selection colour |

---

## 6. Iconography

**Lucide** ([lucide.dev](https://lucide.dev)), 2px stroke, rounded caps, at `lucide-static@0.454.0` via jsDelivr.

**Substitution flag:** the source defined no icon set — no icon font, no SVG sprite, no PNG icons, nothing. Lucide is our choice: its 2px rounded-stroke geometry matches the system's 1.5px borders and modest radii, it is open-licensed, and it is CDN-available with no build step (which matters for a project whose PRD says "no build step"). **If Forage adopts a different set, replace `BASE` in `components/core/Icon.jsx` — that is the only place the URL appears.**

How it works: `Icon` renders a `<span>` whose CSS `mask-image` is the Lucide SVG and whose `background-color` is `currentColor`. Icons therefore always inherit text colour and need no per-colour asset. No SVG is hand-drawn anywhere in this system, and none should be.

- **Sizes:** 12px inside badges, 14px in tags, 16–17px inline with body text, 18–20px in buttons and callouts, 22–24px as a standalone mark.
- **Colour:** inherit by default. Only override for a semantic mark (moss for growth, rose for a location pin).
- **No emoji, ever.** No Unicode symbols used as icons either — the one exception is `*` inside `O*NET`, which is part of the name, and `→` in flow labels.
- **Icons used across the kit:** `compass`, `sprout`, `map-pin`, `map-pinned`, `search`, `arrow-right`, `arrow-left`, `arrow-up-right`, `rotate-ccw`, `check`, `plus`, `x`, `minus`, `info`, `circle-check`, `triangle-alert`, `octagon-alert`, `scroll-text`, `bookmark`, `bookmark-check`, `share-2`, `chevron-down`, `git-compare-arrows`, `life-buoy`.

### Logo
**There is no Forage logo.** No mark, wordmark file, or brand asset exists in the PRD or the repo, and none has been invented. Everywhere a logo would go, the name is set in type: **Bricolage Grotesque 800, −0.03em, with a rose full stop** — `Forage.` — see `guidelines/brand-wordmark.html` and `Wordmark` in the UI kit. `assets/` is therefore empty by design. **If a real mark exists, drop the SVG into `assets/logo.svg` and replace the `Wordmark` component.**

---

## 7. Components

React, no dependencies beyond React itself, styled entirely through the CSS custom properties above. Each directory has a `@dsCard` HTML showing its variants and states. No source defined a component inventory, so this is a standard set sized to what the product actually needs.

**`components/core/`** — `Button`, `IconButton`, `Icon`, `Badge`, `Tag`, `Card`, `Callout`
**`components/forms/`** — `Input`, `Textarea`, `Select`, `Checkbox`, `Radio` (+ `RadioGroup`), `Switch`
**`components/navigation/`** — `Tabs`, `Stepper`
**`components/feedback/`** — `Dialog`, `Toast` (+ `ToastStack`), `Tooltip`, `EmptyState`
**`components/data/`** — `SkillMeter`

Each has a sibling `.d.ts` (props contract) and `.prompt.md` (one-line "what & when", a usage example, notable variants).

### Intentional additions
Beyond a conventional primitive set, five components exist because the product's specific job demands them:

| Component | Why |
|---|---|
| `Icon` | A wrapper is needed to make an external glyph set colour-inheriting and swappable in one place. |
| `Callout` — `disclosure` tone | The PRD requires a visible statement of what data is live vs. hand-assembled. That is a recurring, styled pattern, so it is a component variant, not ad-hoc markup. |
| `Stepper` | The whole product is one five-step linear flow; orientation is a first-class need. |
| `SkillMeter` | Every screen quantifies overlap, importance or gap. It is the system's only chart primitive. |
| `EmptyState` | "We honestly have nothing for you here" is a *designed, expected* outcome in this product, not an error path. |

---

## 8. UI kit

`ui_kits/forage-app/` — a click-through recreation of the full product. Open `index.html`.

`AppShell.jsx` (header, stepper strip, footer, page frame) · `DescribeScreen.jsx` · `MatchScreen.jsx` · `GapScreen.jsx` · `RolesScreen.jsx` · `App.jsx` (flow state) · `data.js` (sample dataset shaped like the PRD's `portland-jobs.json` and `growth-sectors.json`).

All job listings, sector figures and skill gaps in the kit are **illustrative sample data**, not a real pull. See `ui_kits/forage-app/README.md`.

---

## 9. Templates

`templates/forage-screen/` — a blank Forage app screen (header, stepper, page frame, disclosure block) for consuming projects to start from.

---

## 10. Index

```
readme.md                  ← you are here
SKILL.md                   Agent Skills entry point
github.md                  Source-repo association and sync record
thumbnail.html             Homepage tile
styles.css                 @import list — the one file consumers link
tokens/                    fonts · colors · typography · spacing · shape · motion · base
guidelines/                21 specimen cards: Colors (5) · Type (5) · Spacing (3) · Shape (3) · Motion (1) · Brand (4)
components/                core · forms · navigation · feedback · data
ui_kits/forage-app/        Full product click-through
templates/forage-screen/   Blank screen starting point
assets/                    Empty — no brand assets exist in the sources (see §6)
```

---

## 11. Caveats

- **Everything visual here is invented.** There was no prior UI, palette, logo, or font to recover. Treat this as a first proposal to react to.
- **Fonts are Google Fonts substitutes.** No binaries were provided.
- **Icons are Lucide by our choice.** No icon set was specified.
- **No logo exists.** The typographic wordmark is a placeholder for a real mark.
- **No dark mode.** Not designed. The warm-paper base would need a separate, deliberate treatment rather than an inversion.
- **No mobile breakpoints.** The PRD lists mobile optimisation as an explicit non-goal, so the kit is desktop-width (1080px content column) only.
- **Sample data is illustrative.** Employer names are real Portland-area companies; the listings attached to them are not real postings.
