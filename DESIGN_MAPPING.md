# DESIGN_MAPPING.md

How to make `public/index.html` + `public/app.js` (vanilla, no build step) look like
`ui spec/ui_kits/forage-app/` (React) by applying the design system's `fg-*` classes.

**No framework is added. No build step is added. `ui spec/` is read-only — we copy out of it.**

Kit screen → our step:

| Kit screen | Our section | Note |
|---|---|---|
| `DescribeScreen.jsx` | `#step-input` | 1:1 |
| `MatchScreen.jsx` | `#step-match` | kit's "Match" **and** "Target" steps collapse into ours — picking a related occupation *is* choosing the target |
| `GapScreen.jsx` | `#step-gap` | 1:1 |
| `RolesScreen.jsx` | `#step-jobs` | 1:1, minus the filter bar / dialog / sectors tab (see §4) |
| `AppShell.jsx` | `index.html` chrome | header + stepper strip + footer, all static |

One structural difference that never goes away: **the kit swaps one screen at a time; we
progressively reveal four stacked sections on one page.** Keep our model. The stepper in the
header becomes a *position indicator* driven by the same show/hide state machine, not a router.

---

## 0. PREREQUISITE — the CSS layer

### 0.0 STATUS: most of this is already done — read before you type anything

A teammate has already landed two of the three pieces. Check the working tree before redoing them:

| Piece | State | File |
|---|---|---|
| Tokens + all `fg-*` component rules, extracted into one vanilla stylesheet | **DONE** | `public/forage-ds.css` (475 lines, 219 `fg-*` rules, generated — do not hand-edit) |
| App-layout helper classes, prefix `fga-` (header, page, section head, eyebrow, lists, job rows, footer, disclosure) | **MOSTLY DONE** | `public/styles.css` (rewritten; `.hidden{display:none !important}` preserved) |
| `.fg-icon` — the masked Lucide glyph | **MISSING**, and it is the one thing nothing else can substitute for | see §0.3 |

`public/forage-ds.css` says so itself at the foot of the file:

> `components/core/Icon.jsx` defines no CSS. The `.fg-icon` class carries no rules; the React
> `Icon` applies `mask-image` inline from a lucide CDN URL. Writing `class="fg-icon"` in plain
> HTML therefore renders nothing on its own.

`public/index.html` and `public/app.js` are still **untouched**. Everything in §1 and §3 below is
outstanding work.

Three facts that explain why this layer exists at all:

1. **`server.js` serves only `PUBLIC_DIR`.** `ui spec/` is unreachable from the browser; every
   asset must be copied into `public/`. (`.css` *is* in the `MIME` map at `server.js:26` — verified.
   `.woff2` is **not** — relevant only if you self-host fonts, see §5.7.)
2. **The `fg-*` rules exist in no stylesheet inside `ui spec/`.** They live in
   `` const CSS = ` … ` `` template literals in each `components/**/*.jsx`, injected at runtime by
   `ensureStyles()` on first React render. That is what `forage-ds.css` extracted.
3. **`Icon.jsx` has no CSS block at all.** Almost every component takes an icon
   (`Badge icon`, `Tag icon`, `Callout`, `Stepper` done-state, `EmptyState`, `Button iconStart/End`),
   so without §0.3 roughly half the snippets below render a blank gap.

### 0.1–0.2 Regenerating `public/forage-ds.css` (only if `ui spec/` changes)

Already generated. Keep this recipe for the case where the design system is updated:

```bash
cd /Users/arnewiseman/Desktop/PDX_Hackathon/forage
node -e '
const fs = require("fs");
const files = ["core/Card.jsx","core/Button.jsx","core/Badge.jsx","core/Tag.jsx",
  "core/Callout.jsx","core/IconButton.jsx","data/SkillMeter.jsx",
  "navigation/Stepper.jsx","navigation/Tabs.jsx","forms/Textarea.jsx","forms/Input.jsx",
  "forms/Select.jsx","forms/Switch.jsx","forms/Checkbox.jsx","forms/Radio.jsx",
  "feedback/EmptyState.jsx","feedback/Dialog.jsx","feedback/Toast.jsx","feedback/Tooltip.jsx"];
let out = "";
for (const t of ["fonts","colors","typography","spacing","shape","motion","base"])
  out += fs.readFileSync("ui spec/tokens/" + t + ".css", "utf8") + "\n";
for (const f of files) {
  const src = fs.readFileSync("ui spec/components/" + f, "utf8");
  const m = src.match(/const CSS = `([\s\S]*?)`;/);
  if (!m) { console.error("no CSS block in " + f); continue; }
  out += `\n/* --- ${f} --- */` + m[1];
}
fs.writeFileSync("public/forage-ds.css", out);
console.log("wrote public/forage-ds.css", out.length, "bytes");
'
```

**Verified** against the current `ui spec/`: run to a scratch path, it emits 32,757 bytes and
**exactly the same 149 `fg-*` selectors** the committed `public/forage-ds.css` defines. (That file
greps as 150 — the extra, `.fg-icon`, appears only inside its footer comment, not as a rule. Which
is the whole point of §0.3.)

Two notes if you ever run it for real:

- It **inlines** the token files rather than `@import`ing them, matching the committed file, and
  sidestepping the trap that a CSS `@import` following any rule is silently dropped.
- It does **not** reproduce the committed file's header banner or its "what was NOT extracted"
  footer. Those are hand-written and worth preserving — regenerate to a scratch path first and
  splice, rather than clobbering `public/forage-ds.css` outright.

### 0.3 Author `.fg-icon` — THE outstanding CSS task. Append to `public/styles.css`

```css
/* fg-icon — reproduces components/core/Icon.jsx, which ships no CSS block.
   Lives here, not in forage-ds.css, because forage-ds.css is generated. */
.fg-icon{
  display:inline-block;flex:0 0 auto;
  width:var(--icon-size,17px);height:var(--icon-size,17px);
  background-color:currentColor;
  -webkit-mask-image:var(--icon);mask-image:var(--icon);
  -webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;
  -webkit-mask-size:contain;mask-size:contain;
  -webkit-mask-position:center;mask-position:center;
}
```

Usage, everywhere in this document:

```html
<span class="fg-icon" aria-hidden="true"
  style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/check.svg');--icon-size:14px"></span>
```

Sizes the kit uses: **12px** in badges · **14px** in tags · **15px** in `sm` buttons and the
stepper check · **17px** inline / `md` buttons · **18px** in callouts · **20px** in `lg` buttons ·
**24px** in EmptyState.

CDN caveat: if jsDelivr is unreachable the icons render as **empty transparent spans**, not broken
images. Layout survives.

### 0.4 A `::before` icon variant for nodes `app.js` writes with `textContent`

`app.js` does `node.textContent = "…"`, which wipes a child `<span class="fg-icon">`.
For `#error`, `#loading` and `#jobs-provenance` the icon must live in a pseudo-element.
Append to `public/styles.css`:

```css
/* Callout whose body is written by textContent — icon comes from ::before. */
.fg-callout--icon-before::before{
  content:"";display:inline-block;flex:0 0 auto;width:16px;height:16px;margin-top:2px;
  background-color:currentColor;
  -webkit-mask:var(--icon) no-repeat center/contain;mask:var(--icon) no-repeat center/contain;
}
```

`.fg-callout` is `display:flex`, so the pseudo-element becomes a flex item and the text becomes an
anonymous flex item beside it. Zero JS change.

### 0.5 Layout helpers — `fga-*`

**Gotcha worth its own heading: the kit puts every grid, stack, gap, eyebrow and heading in an
inline `style` attribute, not a class.** `fg-*` covers components only; there is no `fg-page` or
`fg-grid`. `public/styles.css` already translates the common ones to `fga-` classes
(*forage app*, deliberately distinct from the design system's `fg-`).

**Already in `public/styles.css` — use these, do not redefine:**

`fga-header` `fga-header__bar` `fga-wordmark` `fga-wordmark--sm` `fga-wordmark__dot` `fga-rule`
`fga-subtitle` `fga-spacer` `fga-stepper-strip` `fga-page` `fga-step` `fga-section-head`
(+ `.fga-section-head h2`) `fga-eyebrow` `fga-lede` `fga-subhead` `fga-occupation__title`
`fga-code` `fga-occupation__desc` `fga-list` `fga-grid` `fga-cols-2` `fga-related__title`
`fga-related__overlap` `fga-related__cue` `fga-gap__note` `fga-job` `fga-job__title`
`fga-job__meta` `fga-provenance` `fga-footer` `fga-footer__bar` `fga-footer__note`
`fga-disclosure` `fga-loading` + a `max-width:40rem` media query.

**Additions the snippets below need — append to `public/styles.css`:**

```css
/* Additions for the design-system port. Same fga- prefix, same file. */
.fga-shell{min-height:100vh;display:flex;flex-direction:column}
.fga-page--narrow{max-width:880px}

.fga-row{display:flex;gap:var(--space-xl);align-items:flex-start}
.fga-row--center{align-items:center}
.fga-row--baseline{align-items:baseline;gap:var(--space-md)}
.fga-grow{flex:1 1 auto;min-width:0}
.fga-side{flex:0 0 168px}
.fga-wrap{display:flex;flex-wrap:wrap;gap:var(--space-sm);list-style:none;margin:0;padding:0}
.fga-list--lg{gap:var(--space-lg)}
.fga-cols-side{display:grid;grid-template-columns:380px 1fr;gap:var(--space-2xl);align-items:start}
.fga-actions{display:flex;gap:var(--space-md);margin-top:28px;flex-wrap:wrap;align-items:center}

.fga-h1{font:var(--weight-bold) 56px/1.02 var(--font-display);letter-spacing:-.028em;max-width:17ch}
.fga-title-sm{font:var(--type-subtitle);color:var(--text-strong)}
.fga-body-sm{font-size:14px;color:var(--text-body);line-height:1.5}
.fga-muted{font-size:var(--size-body-sm);color:var(--text-muted)}
.fga-caps{font-family:var(--font-body);font-weight:var(--weight-bold);
  font-size:var(--size-label);letter-spacing:var(--tracking-label);
  text-transform:uppercase;color:var(--text-muted)}

/* Selected adjacent-occupation card — mirrors MatchScreen.jsx's inline style. */
.fga-card-selected{border-color:var(--fir-600);background:var(--fir-050);box-shadow:var(--shadow-2)}

/* Stepper done-state: swap the number for a check with no JS. */
.fga-num{display:inline}
.fg-stepper__step--done .fga-num{display:none}
.fga-check{display:none}
.fg-stepper__step--done .fga-check{display:inline-block}

/* Keep the new grids from overflowing on a phone (PRD: mobile is a non-goal). */
@media (max-width:900px){ .fga-cols-side{grid-template-columns:1fr} }
```

### 0.6 `public/styles.css` — already gutted and rebuilt

`UI_CONTRACT.md` said replace it wholesale; that has happened. The old
`body{margin:0 auto;padding:2rem 1.25rem;max-width:46rem}` — which fought
`tokens/base.css`'s `body{margin:0;background:var(--surface-page);font:var(--type-body)}` — is
gone. `.hidden{display:none !important}` survives at line 13, which is the one non-negotiable rule:
the entire step machine is `classList.toggle('hidden')`.

**Do not reintroduce a `body` rule.** Everything now hangs off `.fga-page` / `.fga-shell`.

### 0.7 `<head>` of `public/index.html`

Currently only `<link rel="stylesheet" href="/styles.css">`. Change to:

```html
<link rel="stylesheet" href="/forage-ds.css">
<link rel="stylesheet" href="/styles.css">
```

Design system first, app layer second, so `fga-*` and `.hidden` always win.

---

## 1. Screen-by-screen mapping

**Rule for every snippet below: keep our `id`s exactly.** `app.js` reaches them with
`getElementById` — `#job-form #job-text #submit-btn #occupation #skills #related #gap-heading
#gap-have #gap-missing #jobs-provenance #jobs #jobs-fallback #error #loading` and the four
`#step-*` sections. Rename one and the app goes dark.

### 1.0 Shell — `AppShell.jsx` → static `index.html`

Replaces `<header class="masthead">` and `<footer>`.

```html
<body>
<div class="fga-shell">

  <!-- AppHeader — sticky, hairline bottom, 64px bar. .fga-header already styled. -->
  <header class="fga-header" id="app-header">
    <div class="fga-header__bar">
      <span class="fga-wordmark">Forage<span class="fga-wordmark__dot">.</span></span>
      <span class="fga-rule"></span>
      <span class="fga-subtitle">Skills Bridge PDX</span>
      <span class="fga-spacer"></span>
      <span class="fg-badge fg-badge--brand">
        <span class="fg-icon" aria-hidden="true"
          style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/map-pin.svg');--icon-size:12px"></span>
        Portland metro
      </span>
      <a class="fg-btn fg-btn--link" href="#disclosure">About the data</a>
    </div>

    <!-- stepper strip: paper-050 band under the bar. .fga-stepper-strip > div is styled. -->
    <div class="fga-stepper-strip">
      <div>
        <div class="fg-stepper" id="stepper">
          <div class="fg-stepper__step fg-stepper__step--current" data-step="0" aria-current="step">
            <span class="fg-stepper__mark">
              <span class="fga-num">1</span>
              <span class="fg-icon fga-check" aria-hidden="true"
                style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/check.svg');--icon-size:15px"></span>
            </span>
            <span class="fg-stepper__text"><span class="fg-stepper__label">Describe</span></span>
          </div>
          <span class="fg-stepper__line"></span>
          <div class="fg-stepper__step" data-step="1">
            <span class="fg-stepper__mark"><span class="fga-num">2</span>
              <span class="fg-icon fga-check" aria-hidden="true"
                style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/check.svg');--icon-size:15px"></span></span>
            <span class="fg-stepper__text"><span class="fg-stepper__label">Match</span></span>
          </div>
          <span class="fg-stepper__line"></span>
          <div class="fg-stepper__step" data-step="2">
            <span class="fg-stepper__mark"><span class="fga-num">3</span>
              <span class="fg-icon fga-check" aria-hidden="true"
                style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/check.svg');--icon-size:15px"></span></span>
            <span class="fg-stepper__text"><span class="fg-stepper__label">Gap</span></span>
          </div>
          <span class="fg-stepper__line"></span>
          <div class="fg-stepper__step" data-step="3">
            <span class="fg-stepper__mark"><span class="fga-num">4</span>
              <span class="fg-icon fga-check" aria-hidden="true"
                style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/check.svg');--icon-size:15px"></span></span>
            <span class="fg-stepper__text"><span class="fg-stepper__label">Roles</span></span>
          </div>
        </div>
      </div>
    </div>
  </header>

  <main class="fga-page" style="flex:1 0 auto">
    …the four sections…
    <p class="fg-callout fg-callout--critical fg-callout--icon-before hidden" id="error" role="alert"
       style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/octagon-alert.svg');margin-top:24px"></p>
    <p class="fg-callout fg-callout--icon-before hidden" id="loading"
       style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/info.svg');margin-top:24px">Working…</p>
  </main>

  <footer class="fga-footer" id="disclosure">
    <div class="fga-footer__bar">
      <span class="fga-wordmark fga-wordmark--sm">Forage<span class="fga-wordmark__dot">.</span></span>
      <span class="fga-footer__note">Built for Portlanders between jobs. Free, no account, nothing saved.</span>
    </div>
    <div class="fga-disclosure">
      <!-- Both disclosure paragraphs from the current footer. DO NOT CUT (UI_CONTRACT). -->
      <div class="fg-callout fg-callout--disclosure">
        <span class="fg-icon" aria-hidden="true"
          style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/scroll-text.svg');--icon-size:15px"></span>
        <div class="fg-callout__body">
          <div class="disclosure">Occupations, skills and the gap come from the U.S. Department of Labor's
            <a href="https://www.onetcenter.org/database.html">O*NET database</a> (public domain,
            release 29.1), queried locally. Job listings are fetched live from Portland employers'
            public <a href="https://developers.greenhouse.io/job-board.html">Greenhouse</a> and Lever
            job boards. We match jobs to occupations on title keywords, which is rough —
            treat these as leads, not a filtered shortlist.</div>
          <div class="disclosure">Built in two hours at the Claude Impact Portland hackathon.
            <a href="https://github.com/arnewiseman/forage">Source</a>.</div>
        </div>
      </div>
    </div>
  </footer>
</div>
</body>
```

Every `fga-*` class in that block already exists in `public/styles.css` — `fga-header`,
`fga-header__bar`, `fga-wordmark(--sm/__dot)`, `fga-rule`, `fga-subtitle`, `fga-spacer`,
`fga-stepper-strip`, `fga-page`, `fga-footer(__bar/__note)`, `fga-disclosure`. The only new ones
are `fga-shell` (§0.5) and the `fga-num`/`fga-check` stepper pair.

**Stepper count:** the kit has five steps (`Describe Match Target Gap Roles`); we have four
sections and no separate Target step. Use four. If you want to mirror the kit exactly, keep five
and advance Target and Gap together — but four is honest and less code.

---

### 1.1 `#step-input` ← `DescribeScreen.jsx`

Kit: centred hero, `Card variant="print" padding="lg"` holding a `Textarea`, a primary `lg` button
with `arrow-right`, example `Tag` chips, a three-up "how it works" grid, a disclosure `Callout`.

```html
<section class="fga-step" id="step-input">
  <!-- hero -->
  <div style="text-align:center;display:flex;flex-direction:column;gap:14px;
              align-items:center;margin-bottom:32px">
    <div class="fga-eyebrow">Portland, Oregon</div>
    <h1 class="fga-h1">Your job already transfers. Here is where.</h1>
    <p class="fga-lede" style="max-width:52ch;font-size:19px">
      Type what you did in plain English. We will name the occupations it maps to,
      the one gap to close, and the roles open in Portland right now.
    </p>
  </div>

  <!-- the one print card on this screen -->
  <div class="fg-card fg-card--print fg-card--pad-lg">
    <form id="job-form">
      <div class="fg-field">
        <label class="fg-field__label" for="job-text">What did you do?</label>
        <textarea class="fg-textarea" id="job-text" name="text" rows="4" maxlength="600"
          placeholder="I managed ad campaigns and client relationships for 4 years"></textarea>
        <div class="fg-textarea__foot">
          <div class="fg-field__hint">Plain English. No resume, no jargon. A couple of sentences is plenty.</div>
          <div class="fg-textarea__count" id="job-text-count">0/600</div>
        </div>
      </div>
      <div class="fga-actions" style="margin-top:18px">
        <button type="submit" id="submit-btn" class="fg-btn fg-btn--primary fg-btn--lg">
          Find what transfers
          <span class="fg-icon" aria-hidden="true"
            style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/arrow-right.svg');--icon-size:20px"></span>
        </button>
        <span class="fga-muted">No account. Nothing is saved.</span>
      </div>
    </form>
  </div>

  <!-- example chips (static; 4 lines of JS to wire) -->
  <div class="fga-row fga-row--center" style="gap:10px;flex-wrap:wrap;margin:20px 0 28px">
    <span class="fga-caps">Try one</span>
    <button type="button" class="fg-tag fg-tag--clickable js-example">I managed ad campaigns and client relationships for 4 years</button>
    <button type="button" class="fg-tag fg-tag--clickable js-example">Line cook, 6 years, ran prep and ordering</button>
    <button type="button" class="fg-tag fg-tag--clickable js-example">Warehouse lead — scheduling, safety, inventory</button>
    <button type="button" class="fg-tag fg-tag--clickable js-example">Bank teller, then small-business loan support</button>
  </div>

  <!-- how it works, three-up -->
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:28px">
    <div class="fg-card fg-card--pad-md">
      <span class="fg-icon" aria-hidden="true" style="color:var(--fir-600);
        --icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/search.svg');--icon-size:22px"></span>
      <div class="fga-title-sm" style="margin-top:10px">Match</div>
      <div class="fga-muted" style="margin-top:4px;line-height:1.5">Your words become an O*NET occupation code.</div>
    </div>
    <div class="fg-card fg-card--pad-md">
      <span class="fg-icon" aria-hidden="true" style="color:var(--fir-600);
        --icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/git-compare-arrows.svg');--icon-size:22px"></span>
      <div class="fga-title-sm" style="margin-top:10px">Compare</div>
      <div class="fga-muted" style="margin-top:4px;line-height:1.5">Adjacent occupations, with the overlap explained.</div>
    </div>
    <div class="fg-card fg-card--pad-md">
      <span class="fg-icon" aria-hidden="true" style="color:var(--fir-600);
        --icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/map-pinned.svg');--icon-size:22px"></span>
      <div class="fga-title-sm" style="margin-top:10px">Apply</div>
      <div class="fga-muted" style="margin-top:4px;line-height:1.5">Open Portland-area roles that fit the target.</div>
    </div>
  </div>
</section>
```

Deltas from the kit, deliberate:
- Kit disables the button below 8 chars. Ours validates on submit (`showError`). Keep ours; optionally
  add `el.text.addEventListener('input', …)` to toggle `submit-btn.disabled`.
- The char counter is cosmetic. Drop `#job-text-count` if you don't wire it — an empty
  `fg-textarea__foot` right cell is fine.
- The kit's page-bottom disclosure `Callout` is already our footer disclosure. Don't duplicate it.

---

### 1.2 `#step-match` ← `MatchScreen.jsx`

Kit: `SectionHead` (rose eyebrow + 36px title + lede), then a `380px 1fr` grid. Left = one
`Card variant="print"` holding badge / title / mono code / summary / `SkillMeter` stack /
"from your words" footer. Right = a stack of `Card interactive` rows, each with title + code +
why + an overlap meter, then a neutral `Callout`.

Static frame in `index.html`:

```html
<section class="fga-step hidden" id="step-match" aria-live="polite">
  <div class="fga-section-head">
    <div class="fga-eyebrow">Step 2 — your match</div>
    <h2>Closest match to what you described</h2>
    <p class="fga-lede">We matched your description to one O*NET occupation, then pulled the
      occupations closest to it.</p>
  </div>

  <div class="fga-cols-side">
    <!-- LEFT: the one print card on this screen. app.js fills #occupation and #skills. -->
    <div class="fg-card fg-card--print fg-card--pad-md">
      <span class="fg-badge fg-badge--brand">Closest match</span>
      <div id="occupation"></div>
      <div class="fga-caps" style="margin-bottom:10px">Top skills O*NET lists</div>
      <ul class="fga-list" id="skills"></ul>
      <div id="match-echo" style="margin-top:18px;padding-top:14px;
        border-top:1px solid var(--border-hairline);font-size:13px;color:var(--text-muted)"></div>
    </div>

    <!-- RIGHT: the click targets that advance the flow. -->
    <div class="fga-list">
      <div class="fga-row fga-row--baseline">
        <div class="fga-title-sm">Where it transfers</div>
        <div class="fga-muted">Pick one to see the gap.</div>
      </div>
      <ul class="fga-list" id="related"></ul>
      <div class="fg-callout">
        <span class="fg-icon" aria-hidden="true"
          style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/info.svg');--icon-size:18px"></span>
        <div class="fg-callout__body"><div>Overlap is described from the O*NET skills the two
          occupations actually share. It is a starting point for a conversation, not a score of you.</div></div>
      </div>
    </div>
  </div>
</section>
```

What `app.js` injects into `#occupation` (see §3):

```html
<h3 class="fga-occupation__title" style="margin:10px 0 6px">Advertising and Promotions Managers</h3>
<div class="fga-code" title="O*NET Standard Occupational Classification code"
  style="border-bottom:1px dashed var(--rain-500);display:inline-block">11-2011.00</div>
<p class="fga-occupation__desc" style="margin:12px 0 18px">Plan, direct, or coordinate advertising…</p>
```

Into `#skills`, one `<li>` per skill — this is the **one meter in the whole app backed by real
data** (`skills[].importance`, 0–100, from `/api/match`):

```html
<li class="fg-meter fg-meter--brand fg-meter--sm">
  <div class="fg-meter__top">
    <span class="fg-meter__label">Active Listening</span>
    <span class="fg-meter__value">82%</span>
  </div>
  <div class="fg-meter__track" role="meter" aria-valuenow="82" aria-valuemin="0"
       aria-valuemax="100" aria-label="Active Listening">
    <div class="fg-meter__fill" style="width:82%"></div>
  </div>
</li>
```

(`skill.description` is `""` in local mode — if present, add
`<div class="fg-meter__note">…</div>` as the last child.)

Into `#related`, one `<li>` per adjacent occupation. **`Card interactive` renders as
`<button type="button" class="fg-card fg-card--interactive">`, so the existing
`button.addEventListener('click', …)` attaches unchanged.** `.related-btn`, `.related-title`,
`.related-overlap` stay on the nodes so `UI_CONTRACT.md` still describes reality.

```html
<li>
  <button type="button" class="fg-card fg-card--pad-md fg-card--interactive related-btn">
    <span class="fga-row">
      <span class="fga-grow">
        <span class="fga-row fga-row--center" style="gap:10px">
          <span class="fga-related__title related-title">Market Research Analysts and Marketing Specialists</span>
        </span>
        <span class="fga-code" style="display:block;margin:3px 0 8px">13-1161.00</span>
        <span class="fga-related__overlap related-overlap" style="display:block">Leans on the same reading
          comprehension, writing and critical thinking you already use — this is a step across,
          not a restart.</span>
      </span>
      <span class="fga-side">
        <span class="fg-badge fg-badge--neutral">Pick this</span>
      </span>
    </span>
  </button>
</li>
```

> **This is where the kit and our API diverge worst.** The kit renders
> `<SkillMeter label="Overlap" value={r.overlap} />` in that right-hand slot. Our
> `related[].overlap` is a **20-word English sentence**, not a 0–100 number. There is no number to
> put in a meter. The slot holds a `Pick this` badge instead — swap to
> `fg-badge fg-badge--positive` + a `check` icon and the text `Target` on the selected card.
> See §5.

Selected state (kit uses `borderColor fir-600 / bg fir-050 / shadow-2`): add `fga-card-selected`
to the chosen button and remove it from its siblings.

---

### 1.3 `#step-gap` ← `GapScreen.jsx`

Kit: `SectionHead`, then `1fr 320px`. Left `Card` = pill `Tabs` + count + a wrap of
`Tag tone="have"|"missing"` + two summary `SkillMeter`s. Right = an inverse "Start here" card +
two small resource cards.

Our data is richer than the kit's here: our `have`/`missing` items are `{name, note}`, the kit's
are bare strings. **A pill can't hold a 14-word note**, so we keep our two labelled columns and put
the tag and its note on one row.

```html
<section class="fga-step hidden" id="step-gap" aria-live="polite">
  <div class="fga-section-head">
    <div class="fga-eyebrow">Step 3 — the gap</div>
    <h2 id="gap-heading">Your gap</h2>
    <p class="fga-lede">An O*NET importance diff across Skills, Knowledge and Hot Technologies
      between the two occupations.</p>
  </div>

  <div class="fga-cols-side" style="grid-template-columns:1fr 320px">
    <div class="fg-card fg-card--pad-md">
      <div class="gap-cols" style="display:grid;grid-template-columns:1fr 1fr;gap:24px">
        <div>
          <h3 class="fga-caps have" style="color:var(--moss-700);margin-bottom:12px">You already have</h3>
          <ul class="fga-list" id="gap-have"></ul>
        </div>
        <div>
          <h3 class="fga-caps missing" style="color:var(--rose-700);margin-bottom:12px">You'd need to add</h3>
          <ul class="fga-list" id="gap-missing"></ul>
        </div>
      </div>
      <!-- summary meters: real, derived from the two array lengths -->
      <div class="fga-list fga-list--lg" id="gap-summary"
           style="margin-top:26px;padding-top:20px;border-top:1px solid var(--border-hairline)"></div>
    </div>

    <div class="fga-list fga-list--lg">
      <div class="fg-card fg-card--inverse fg-card--pad-md">
        <div style="font-family:var(--font-display);font-weight:800;font-size:12px;
             letter-spacing:.14em;text-transform:uppercase;color:var(--fir-300)">Start here</div>
        <div class="fga-occupation__title" id="gap-first" style="color:var(--paper-000);margin:8px 0"></div>
        <p style="font-size:14px;line-height:1.55;color:var(--fir-200)">
          The biggest single gap between the two occupations. `lib/gap.js` sorts it first.</p>
        <div style="margin-top:16px">
          <a class="fg-btn fg-btn--secondary" href="https://www.pcc.edu" target="_blank" rel="noopener">
            PCC Career Pathways
            <span class="fg-icon" aria-hidden="true"
              style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/arrow-up-right.svg');--icon-size:17px"></span>
          </a>
        </div>
      </div>
      <div class="fg-card fg-card--pad-sm">
        <div class="fga-row" style="gap:10px">
          <span class="fg-icon" aria-hidden="true" style="color:var(--hood-700);margin-top:2px;
            --icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/life-buoy.svg');--icon-size:18px"></span>
          <div>
            <div style="font-weight:700;font-size:14px;color:var(--text-strong)">WorkSource Oregon</div>
            <div class="fga-muted" style="line-height:1.45;margin-top:2px">Free career counseling,
              iMatchSkills, and training funds</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Injected `<li>` for `#gap-have` (moss) and `#gap-missing` (rose):

```html
<li class="fga-row" style="gap:8px;align-items:baseline;flex-wrap:wrap">
  <span class="fg-tag fg-tag--have">
    <span class="fg-icon" aria-hidden="true"
      style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/check.svg');--icon-size:14px"></span>
    Sales and Marketing
  </span>
  <span class="note fga-gap__note"></span>   <!-- often empty; must look right blank -->
</li>
```

`#gap-missing` is identical with `fg-tag--missing` and the `plus.svg` icon.

Injected into `#gap-summary` (two meters, from `have.length` / `missing.length` / total):

```html
<div class="fg-meter fg-meter--positive fg-meter--lg">
  <div class="fg-meter__top"><span class="fg-meter__label">Skills you already have</span>
    <span class="fg-meter__value">4 of 7</span></div>
  <div class="fg-meter__track" role="meter" aria-valuenow="4" aria-valuemin="0" aria-valuemax="7">
    <div class="fg-meter__fill" style="width:57.1%"></div></div>
</div>
<div class="fg-meter fg-meter--caution fg-meter--md">
  <div class="fg-meter__top"><span class="fg-meter__label">Gap to close</span>
    <span class="fg-meter__value">3 of 7</span></div>
  <div class="fg-meter__track" role="meter" aria-valuenow="3" aria-valuemin="0" aria-valuemax="7">
    <div class="fg-meter__fill" style="width:42.9%"></div></div>
</div>
```

Kit features dropped here: the pill `Tabs` (needs React state — §4) and the hard-coded
"SQL and data querying" copy in the inverse card (we substitute `gap.missing[0].name`).

---

### 1.4 `#step-jobs` ← `RolesScreen.jsx`

Kit: underline `Tabs` (Open roles / Growth sectors), a filter bar (Input + Select + Switch),
`JobRow` cards with a `Fit` meter and View/Save controls, an `EmptyState`, a job `Dialog`, a
disclosure `Callout`. Most of that has no data on our side — see §4 and §5.

```html
<section class="fga-step hidden" id="step-jobs" aria-live="polite">
  <div class="fga-section-head">
    <div class="fga-eyebrow">Step 4 — open roles</div>
    <h2>Open in Portland right now</h2>
  </div>

  <!-- provenance. app.js sets textContent; the icon is a ::before so it survives. -->
  <p class="fg-callout fg-callout--disclosure fg-callout--icon-before" id="jobs-provenance"
     style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/scroll-text.svg');margin-bottom:18px"></p>

  <ul class="fga-list" id="jobs"></ul>
  <div class="hidden" id="jobs-fallback" style="margin-top:8px"></div>
</section>
```

Injected `<li>` per job — `JobRow` minus the fit meter and the badges we have no data for:

```html
<li class="fg-card fg-card--pad-md">
  <div class="fga-row">
    <div class="fga-grow">
      <div class="fga-row fga-row--center" style="gap:10px;flex-wrap:wrap">
        <a class="fga-job__title" href="https://job-boards.greenhouse.io/newrelic/jobs/5368778008"
           target="_blank" rel="noopener">Director, Field Marketing - Americas</a>
        <!-- only when job.remote === true -->
        <span class="fg-badge fg-badge--info">Remote-eligible</span>
      </div>
      <div class="fga-job__meta job-meta" style="margin-top:4px">New Relic · Atlanta, Georgia, USA; Portland, Oregon, USA</div>
      <div class="fga-row" style="gap:16px;margin-top:10px;font:var(--type-mono);color:var(--text-muted)">
        <span>2026-08-03</span><span>Greenhouse public job board API</span>
      </div>
    </div>
    <div class="fga-side" style="flex:0 0 120px">
      <a class="fg-btn fg-btn--secondary fg-btn--sm" href="…" target="_blank" rel="noopener">
        View
        <span class="fg-icon" aria-hidden="true"
          style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/arrow-up-right.svg');--icon-size:15px"></span>
      </a>
    </div>
  </div>
</li>
```

`#jobs-fallback` becomes an `EmptyState` (the kit component maps onto a panel we already build and
already reach — see `UI_CONTRACT.md` state 2):

```html
<div class="fg-empty">
  <span class="fg-empty__mark">
    <span class="fg-icon" aria-hidden="true"
      style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/map-pinned.svg');--icon-size:24px"></span>
  </span>
  <div class="fg-empty__title">Nothing on the boards lines up with this target</div>
  <div class="fg-empty__body">None of the 48 open Portland-area roles we can see right now line up
    with Registered Nurses…</div>            <!-- fallback.message -->

  <!-- fallback.sectors -->
  <ul class="fga-wrap" style="justify-content:center;margin-top:4px">
    <li><span class="fg-tag" title="Fastest-growing sector in the Portland metro">Health Care &amp; Social Assistance</span></li>
  </ul>

  <!-- fallback.resource -->
  <div class="fg-empty__actions">
    <a class="fg-btn fg-btn--secondary" href="https://worksourceoregon.org/" target="_blank" rel="noopener">
      WorkSource Oregon
      <span class="fg-icon" aria-hidden="true"
        style="--icon:url('https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/arrow-up-right.svg');--icon-size:17px"></span>
    </a>
  </div>
  <div class="fga-muted">Free state-run career counseling and retraining referrals.</div>
</div>
```

---

## 2. Class-name crosswalk

| Ours now | Apply | Defined in |
|---|---|---|
| `.card` | `fg-card fg-card--pad-md` (+`--print` on the *one* hero card per screen, `--inverse` on "Start here") | `ui spec/components/core/Card.jsx` |
| `.masthead` / `h1` / `.tagline` | header markup in §1.0 + `.fga-wordmark` / `.fga-h1` / `.fga-lede` | `ui_kits/forage-app/AppShell.jsx` (inline styles) |
| `#job-form` label | `fg-field__label` inside `fg-field` | `components/forms/Textarea.jsx` |
| `textarea#job-text` | `fg-textarea` | `components/forms/Textarea.jsx` |
| `.hint` (in the form) | `fg-field__hint` inside `fg-textarea__foot` | `components/forms/Textarea.jsx` |
| `.hint` (elsewhere) | `fga-muted` | ours, §0.5 (new) |
| `#submit-btn` | `fg-btn fg-btn--primary fg-btn--lg` | `components/core/Button.jsx` |
| `h2` section titles | plain `<h2>` inside `.fga-section-head`, preceded by `.fga-eyebrow` (both already in `public/styles.css`) | `AppShell.jsx` `SectionHead` |
| `h3` in `#occupation` | `fga-occupation__title` | `AppShell.jsx` / `MatchScreen.jsx` |
| occupation code | `fga-code` (`font: var(--type-mono)`) | `tokens/typography.css` |
| `ul.skills > li` | `fg-meter fg-meter--brand fg-meter--sm` + `__top/__label/__value/__track/__fill` | `components/data/SkillMeter.jsx` |
| `ul.related > li > button.related-btn` | `fg-card fg-card--pad-md fg-card--interactive` (already a `<button>`) | `components/core/Card.jsx` |
| `.related-title` | `+ fga-related__title` (already in `public/styles.css`) | mirrors `--type-subtitle` |
| `.related-overlap` | `+ fga-related__overlap` (already in `public/styles.css`) | ours |
| selected related card | `+ fga-card-selected` (fir-600 border, fir-050 bg, shadow-2) | mirrors `MatchScreen.jsx` inline style |
| `.gap-cols` | keep, `display:grid;grid-template-columns:1fr 1fr` | `GapScreen.jsx` (inline) |
| `h3.have` | `fga-caps` + `color:var(--moss-700)` | `readme.md` §4 colour convention |
| `h3.missing` | `fga-caps` + `color:var(--rose-700)` | same |
| `#gap-have > li strong` | `fg-tag fg-tag--have` + `check` icon | `components/core/Tag.jsx` |
| `#gap-missing > li strong` | `fg-tag fg-tag--missing` + `plus` icon | `components/core/Tag.jsx` |
| `.note` | `+ fga-gap__note` (already in `public/styles.css`) | ours |
| `#jobs-provenance` | `fg-callout fg-callout--disclosure fg-callout--icon-before` | `components/core/Callout.jsx` |
| `ul.jobs > li` | `fg-card fg-card--pad-md` | `components/core/Card.jsx` |
| job title `<a>` | `fga-job__title` (already in `public/styles.css`) | ours |
| `.job-meta` | `+ fga-job__meta` (already in `public/styles.css`); remote flag becomes `fg-badge fg-badge--info` | `components/core/Badge.jsx` |
| `#jobs-fallback` | `fg-empty` + `__mark/__title/__body/__actions` | `components/feedback/EmptyState.jsx` |
| `#error` | `fg-callout fg-callout--critical fg-callout--icon-before` (`octagon-alert`) | `components/core/Callout.jsx` |
| `#loading` | `fg-callout fg-callout--icon-before` (`info`) | `components/core/Callout.jsx` |
| `footer .disclosure` | wrap in `fg-callout fg-callout--disclosure` | `components/core/Callout.jsx` |
| — (new) | `fg-stepper` + `__step/--current/--done/__mark/__text/__label/__line` | `components/navigation/Stepper.jsx` |
| — (new) | `fg-badge fg-badge--brand` "Portland metro" | `components/core/Badge.jsx` |
| — (new) | `fg-tag fg-tag--clickable` example chips | `components/core/Tag.jsx` |
| `.hidden` | **unchanged — keep** (`display:none !important`, `public/styles.css:13`) | `public/styles.css` |

Full `fg-*` inventory — all of it already in `public/forage-ds.css`, listed here by source file:

- `core/Card.jsx` — `fg-card`, `--pad-none|sm|md|lg`, `--raised|print|sunken|accent|inverse|interactive`
- `core/Button.jsx` — `fg-btn`, `--sm|md|lg`, `--primary|secondary|ghost|danger|link`, `--block`
- `core/Badge.jsx` — `fg-badge`, `--neutral|brand|positive|caution|critical|info|solid`
- `core/Tag.jsx` — `fg-tag`, `--clickable|selected|missing|have`, `fg-tag__x`
- `core/Callout.jsx` — `fg-callout`, `__body`, `__title`, `--info|positive|caution|critical|disclosure`
- `core/IconButton.jsx` — `fg-iconbtn`, `--sm|md|lg`, `--ghost|outline|solid`, `--round`
- `data/SkillMeter.jsx` — `fg-meter`, `--positive|caution|critical`, `--sm|lg`, `__top __label __value __track __fill __note`
- `navigation/Stepper.jsx` — `fg-stepper`, `--compact`, `__step`, `--current|--done`, `__mark __text __label __line`
- `navigation/Tabs.jsx` — `fg-tabs`, `--pill`, `__tab` (`aria-selected`), `__count`
- `forms/Textarea.jsx` / `Input.jsx` / `Select.jsx` — `fg-field`, `__label __hint __error __req`; `fg-textarea`, `--invalid`, `__foot __count`; `fg-input`, `__wrap __icon --has-start --has-end`; `fg-select`, `__wrap __chev`
- `forms/Switch.jsx` — `fg-switch`, `__input __track __knob`, `--disabled`
- `feedback/EmptyState.jsx` — `fg-empty`, `__mark __title __body __actions`
- `feedback/Dialog.jsx` — `fg-scrim`, `fg-dialog`, `--sm|md|lg`, `__head __title __desc __body __foot`
- `feedback/Toast.jsx` — `fg-toast`, `--positive|caution|critical`, `__title __body __mark __action`, `fg-toast-stack`
- `feedback/Tooltip.jsx` — `fg-tip`, `__bubble`, `--visible --top|bottom|left|right`

---

## 3. What `app.js` must change

Nothing about the **flow** changes: same data calls, same `Promise.all`, same `.hidden` toggling,
same `scrollIntoView`, same `textContent`-only rule (never `innerHTML` with API strings).
Only the node structure each renderer emits changes.

State of `public/app.js` as of writing (it is being edited concurrently — re-check before you
start): the HTTP `api()` helper is gone; data now comes from `public/api.js`
(`import { match, gap, findJobs } from './api.js'`), which calls `lib/*` in the browser and returns
**the same shapes `API.md` documents**. Every function named below still exists —
`show` `hide` `busy` `showError` `li` `clear` `onSubmit` `renderMatch` `onPickTarget`
`renderGap` `renderJobs` — and `matched` is still the module-level held match. One naming trap:
`renderGap`'s first parameter is **`result`, not `gap`**, because `gap` is now the imported
function.

Add one shared helper at the top, next to `li()`:

```js
const ICON = 'https://cdn.jsdelivr.net/npm/lucide-static@0.454.0/icons/';

// <span class="fg-icon"> with the lucide mask. Never carries API text.
function icon(name, size = 17, extra = '') {
  const s = document.createElement('span');
  s.className = 'fg-icon' + (extra ? ' ' + extra : '');
  s.setAttribute('aria-hidden', 'true');
  s.style.setProperty('--icon', `url('${ICON}${name}.svg')`);
  s.style.setProperty('--icon-size', size + 'px');
  return s;
}

// <div class="a b c"> with optional text
function node(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text != null) n.textContent = text;
  return n;
}

// One SkillMeter. pct is 0-100.
function meter({ label, valueLabel, value, max = 100, tone = 'brand', size = 'md', tag = 'div' }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const root = node(tag, `fg-meter fg-meter--${tone} fg-meter--${size}`);
  const top = node('div', 'fg-meter__top');
  top.append(node('span', 'fg-meter__label', label),
             node('span', 'fg-meter__value', valueLabel ?? Math.round(pct) + '%'));
  const track = node('div', 'fg-meter__track');
  track.setAttribute('role', 'meter');
  track.setAttribute('aria-valuenow', String(value));
  track.setAttribute('aria-valuemin', '0');
  track.setAttribute('aria-valuemax', String(max));
  track.setAttribute('aria-label', label);
  const fill = node('div', 'fg-meter__fill');
  fill.style.width = pct + '%';
  track.append(fill);
  root.append(top, track);
  return root;
}
```

### 3.1 New: `setStep(n)` — drives the header stepper

Not currently in `app.js`. Add it and call it from the existing state transitions.

```js
function setStep(n) {
  for (const el of document.querySelectorAll('#stepper .fg-stepper__step')) {
    const i = Number(el.dataset.step);
    el.classList.toggle('fg-stepper__step--done', i < n);
    el.classList.toggle('fg-stepper__step--current', i === n);
    if (i === n) el.setAttribute('aria-current', 'step');
    else el.removeAttribute('aria-current');
  }
}
```

Call sites: `setStep(0)` at the top of `onSubmit`; `setStep(1)` at the end of `renderMatch`;
`setStep(3)` at the end of `renderJobs` (2 = Gap, 3 = Roles — both land together, so go to 3).
The done-state check glyph is handled by the `.fga-num` / `.fga-check` CSS in §0.5 — no JS.

### 3.2 `busy(on)` and `showError(message)` — no structural change needed

`#loading` and `#error` are single elements whose whole body is `textContent`, and their icon now
comes from `::before` (§0.4). **These two functions stay exactly as they are.** Optional polish:
in `busy(true)`, also set `el.submit.textContent = 'Working…'`, and clear it in `busy(false)`.

One thing to add: `showError` should keep the error visible near the top of the flow.
`$('error').scrollIntoView({ behavior:'smooth', block:'center' })` after `show('error')`.

### 3.3 `renderMatch({ occupation, skills, related })`

**`#occupation`** — was `h3` + `p`. Now:

```js
const occ = clear('occupation');
const title = node('h3', 'fga-occupation__title', occupation.title);
title.style.margin = '10px 0 6px';
const code = node('div', 'fga-code', occupation.code);
code.style.cssText = 'border-bottom:1px dashed var(--rain-500);display:inline-block';
code.title = 'O*NET Standard Occupational Classification code';
const desc = node('p', 'fga-occupation__desc', occupation.description);
desc.style.margin = '12px 0 18px';
occ.append(title, code, desc);
```

Note the code line is **new content** — `occupation.code` is already in the response and the kit
displays it prominently. Free win.

Also fill the "from your words" footer:

```js
const words = el.text.value.trim();
$('match-echo').textContent = 'From your words: “' +
  (words.length > 84 ? words.slice(0, 84) + '…' : words) + '”';
```

**`#skills`** — was `<li><strong>name</strong><span> — desc</span></li>`. Now one `fg-meter` per
skill, using the real `importance`:

```js
const skillList = clear('skills');
for (const skill of skills) {
  const m = meter({ label: skill.name, value: skill.importance ?? 0,
                    tone: 'brand', size: 'sm', tag: 'li' });
  if (skill.description) m.append(node('div', 'fg-meter__note', skill.description));
  skillList.append(m);
}
```

Guard: `importance` is documented 0–100, but if a future source omits it, `?? 0` renders an empty
track rather than `NaN%`.

**`#related`** — same `<li> > <button>` shape and the same click listener; only classes and inner
nodes change:

```js
const relatedList = clear('related');
for (const rel of related) {
  li(relatedList, (n) => {
    const button = node('button', 'fg-card fg-card--pad-md fg-card--interactive related-btn');
    button.type = 'button';
    button.addEventListener('click', () => { markSelected(button); onPickTarget(rel); });

    const row  = node('span', 'fga-row');
    const main = node('span', 'fga-grow');

    const name = node('span', 'fga-related__title related-title', rel.title);
    name.style.display = 'block';
    const code = node('span', 'fga-code', rel.code);
    code.style.cssText = 'display:block;margin:3px 0 8px';
    // NOTE: rel.overlap is a SENTENCE on our API, not a number. Prose, not a meter.
    const why = node('span', 'fga-related__overlap related-overlap', rel.overlap);
    why.style.display = 'block';
    main.append(name, code, why);

    const side = node('span', 'fga-side');
    side.append(node('span', 'fg-badge fg-badge--neutral', 'Pick this'));

    row.append(main, side);
    button.append(row);
    n.append(button);
  });
}
```

Plus a two-line selection helper (the kit's `target && target.code === r.code` branch):

```js
function markSelected(button) {
  for (const b of document.querySelectorAll('#related .related-btn'))
    b.classList.remove('fga-card-selected');
  button.classList.add('fga-card-selected');
  const badge = button.querySelector('.fg-badge');
  badge.className = 'fg-badge fg-badge--positive';
  badge.replaceChildren(icon('check', 12), document.createTextNode('Target'));
}
```

### 3.4 `renderGap(result, target)`

`#gap-heading` unchanged (`From X to Y`). The two loops now emit a tag + a note:

```js
const TONE = { 'gap-have': ['have', 'check'], 'gap-missing': ['missing', 'plus'] };
for (const [id, items] of [['gap-have', result.have], ['gap-missing', result.missing]]) {
  const [tone, glyph] = TONE[id];
  const list = clear(id);
  for (const item of items) {
    li(list, (n) => {
      n.className = 'fga-row';
      n.style.cssText = 'gap:8px;align-items:baseline;flex-wrap:wrap';
      const tag = node('span', `fg-tag fg-tag--${tone}`);
      tag.append(icon(glyph, 14), document.createTextNode(item.name));
      n.append(tag);
      if (item.note) n.append(node('span', 'note fga-gap__note', item.note));
    });
  }
}
```

New: the two summary meters and the inverse card's headline.

```js
const total = result.have.length + result.missing.length;
const summary = clear('gap-summary');
summary.append(
  meter({ label: 'Skills you already have', value: result.have.length, max: total || 1,
          valueLabel: `${result.have.length} of ${total}`, tone: 'positive', size: 'lg' }),
  meter({ label: 'Gap to close', value: result.missing.length, max: total || 1,
          valueLabel: `${result.missing.length} of ${total}`, tone: 'caution' }),
);
$('gap-first').textContent = result.missing.length
  ? result.missing[0].name                      // lib/gap.js sorts biggest gap first
  : 'Nothing structural is missing';
```

### 3.5 `renderJobs({ matches, fallback, live, boards })`

The provenance block is unchanged — `provenance.textContent = …` still works because the icon is
`::before`. Only the `<li>` builder and the fallback panel change.

> **Do not touch the data call while restructuring the render.** `onPickTarget` must keep passing
> **both** arguments: `findJobs(target.code, target.title)`. Per the current `API.md`, `code` drives
> matching against O*NET's ~60 *alternate* titles for that occupation (worded the way postings
> actually are); drop it and matching silently falls back to the canonical title alone and "gets
> noticeably looser." No response shape changes — it degrades results without erroring.

```js
for (const job of matches) {
  li(list, (n) => {
    n.className = 'fg-card fg-card--pad-md';

    const row  = node('div', 'fga-row');
    const main = node('div', 'fga-grow');

    const head = node('div', 'fga-row fga-row--center');
    head.style.cssText = 'gap:10px;flex-wrap:wrap';
    const link = node('a', 'fga-job__title', job.title);
    link.href = job.url; link.target = '_blank'; link.rel = 'noopener';
    head.append(link);
    if (job.remote) head.append(node('span', 'fg-badge fg-badge--info', 'Remote-eligible'));

    const meta = node('div', 'fga-job__meta job-meta', `${job.company} · ${job.location}`);
    meta.style.marginTop = '4px';

    const mono = node('div', 'fga-row');
    mono.style.cssText = 'gap:16px;margin-top:10px;font:var(--type-mono);color:var(--text-muted)';
    if (job.postedAt) mono.append(node('span', null, job.postedAt));
    if (job.source)   mono.append(node('span', null, job.source));

    main.append(head, meta, mono);

    const side = node('div', 'fga-side');
    side.style.flex = '0 0 120px';
    const view = node('a', 'fg-btn fg-btn--secondary fg-btn--sm', 'View');
    view.href = job.url; view.target = '_blank'; view.rel = 'noopener';
    view.append(icon('arrow-up-right', 15));
    side.append(view);

    row.append(main, side);
    n.append(row);
  });
}
```

Fallback panel — same three pieces (`message`, `sectors`, `resource`), wrapped in `fg-empty`:

```js
const empty = node('div', 'fg-empty');
const mark = node('span', 'fg-empty__mark');
mark.append(icon('map-pinned', 24));
empty.append(mark);
empty.append(node('div', 'fg-empty__title',
  'Nothing on the boards lines up with this target'));
empty.append(node('div', 'fg-empty__body', fallback.message));

const sectors = node('ul', 'fga-wrap');
sectors.style.justifyContent = 'center';
for (const sector of fallback.sectors) {
  li(sectors, (n) => {
    const tag = node('span', 'fg-tag', sector.name);
    if (sector.trend) tag.title = sector.trend;   // trend is a sentence, too long for a pill
    n.append(tag);
  });
}
empty.append(sectors);

const actions = node('div', 'fg-empty__actions');
const res = node('a', 'fg-btn fg-btn--secondary', fallback.resource.name);
res.href = fallback.resource.url; res.target = '_blank'; res.rel = 'noopener';
res.append(icon('arrow-up-right', 17));
actions.append(res);
empty.append(actions, node('div', 'fga-muted', fallback.resource.description));

fallbackBox.append(empty);
show('jobs-fallback');
```

### 3.6 New, optional: example chips

```js
for (const chip of document.querySelectorAll('.js-example')) {
  chip.addEventListener('click', () => { el.text.value = chip.textContent.trim(); el.text.focus(); });
}
```

---

## 4. Design-system features our vanilla UI does not have

| Feature | What it adds | Vanilla cost | 90-second demo | Verdict |
|---|---|---|---|---|
| **Stepper** (`navigation/Stepper.jsx`) | Header strip showing Describe / Match / Gap / Roles with done-checks | Low — 4 static nodes + the 8-line `setStep()` in §3.1; the check swap is pure CSS | Very high. It is the clearest single signal that this is one designed flow | **INCLUDE** — biggest perceived polish per line of code, and our existing show/hide machine already knows the state |
| **SkillMeter on `skills[].importance`** (`data/SkillMeter.jsx`) | Importance bars in the match card | Low — one helper function, real 0–100 data from `/api/match` | Very high. The only quantified visual in the app, and it is genuinely true | **INCLUDE** — the highest-ROI item in this document |
| **SkillMeter summary on the gap** | "4 of 7" have / gap bars | Low — derived from two array lengths | High. Turns two lists into a number, which is the brand's whole voice | **INCLUDE** — free, and it is real arithmetic on real data |
| **`Tag tone="have"/"missing"`** (`core/Tag.jsx`) | Moss/rose pills for gap items | Low — class swap in an existing loop | High. Encodes the readme's moss=have / rose=missing convention at a glance | **INCLUDE** |
| **`Callout tone="disclosure"`** (`core/Callout.jsx`) | Dashed mono block for the footer disclosure and `#jobs-provenance` | Low — classes plus the `::before` icon rule | High. The PRD's integrity statement, styled as a deliberate component | **INCLUDE** |
| **`EmptyState`** (`feedback/EmptyState.jsx`) | Designed no-match panel | Low — re-class `#jobs-fallback`, which already exists and is reliably reachable ("I was a registered nurse") | High. The honest dead end is a *scripted* demo beat, not an edge case | **INCLUDE** |
| **`Card variant="print"`** (`core/Card.jsx`) | The 3px hard ink offset — the brand signature | Trivial — one class on two elements | High. Instantly reads as this design system | **INCLUDE** (exactly one per screen: the Describe card and the match card) |
| **Overlap meter on related cards** | `SkillMeter` per adjacent occupation | Impossible with current data — `related[].overlap` is a sentence, not a number | — | **SKIP** — no number exists. Would need a new API field (§5) |
| **`Tooltip`** (`feedback/Tooltip.jsx`) | Hover bubble on the SOC code | Medium — needs hover/focus JS and a visible-class toggle | Nobody hovers during a demo | **SKIP** — use the native `title=` attribute; same information, zero code |
| **`Tabs`** on the gap screen (`navigation/Tabs.jsx`) | Pill tabs: The gap / What transfers / All | Medium — state, `aria-selected`, re-render on click | Costs a click and hides half the content behind it | **SKIP** — our two-column have/missing shows everything at once, which is better on stage |
| **Filter bar** (`Input` + `Select` + `Switch`) | Search, sort, remote-only over the job list | Medium-high — three controls plus a client-side filter/sort and re-render | We show 4–8 jobs. Filtering 6 rows is theatre | **SKIP** — no user need at this list size |
| **Job detail `Dialog`** (`feedback/Dialog.jsx`) | Modal with description, pay, fit meter, apply button | Impossible-ish — needs `desc`, `pay`, `mode`, `type`, `match`; our `/api/jobs` returns **none** of them. Plus scrim, Escape, focus handling | — | **SKIP** — the real employer posting is one click away via the existing link, and it is the honest destination |
| **`Toast` + `ToastStack`** (`feedback/Toast.jsx`) | "Saved <role>" confirmation | Medium — the save feature itself does not exist; we have no persistence and the footer promises "nothing saved" | Would contradict our own copy | **SKIP** — building save-state to justify a toast is backwards |
| **Growth-sectors tab** (`RolesScreen.jsx`) | Numeric sector table (+14%, 4,100 openings) | Impossible — kit has `growth`/`openings` numbers; our `fallback.sectors` has `{name, trend, source}` prose and only appears on the no-match path | — | **SKIP** — the sectors we do have are already inside the EmptyState where they belong |
| **`IconButton`** (`core/IconButton.jsx`) | Ghost/outline icon buttons | Low, but nothing in our flow needs one once Save and Dialog-close are skipped | — | **SKIP** — no call site |
| **Char counter on the textarea** | `12/600` in `fg-textarea__foot` | Trivial (one `input` listener) | Marginal | **INCLUDE if time** — one line; otherwise leave the right cell empty |
| **Example chips** (`DescribeScreen.jsx`) | Four `fg-tag--clickable` presets | Trivial — §3.6 | High. Removes typing from the demo and derisks the live run | **INCLUDE** |

**Net:** eight INCLUDEs, all low-cost, all backed by data we already return. Everything skipped is
skipped either because it needs React state we would have to hand-roll, or because our API returns
no data to put in it.

---

## 5. Gotchas

### 5.1 The kit is not a stylesheet

**There is no `.css` file anywhere in `ui spec/` that contains a single `fg-*` rule.** They are JS
strings injected by `ensureStyles()` on first React render. `public/forage-ds.css` is the extraction
of them; if it were missing, class names would produce a completely unstyled page and no console
error. It exists — but nothing links to it yet (§0.7).

Corollary: **`public/forage-ds.css` is generated. Never hand-edit it.** Additions
(`.fg-icon`, `.fg-callout--icon-before`, every `fga-*`) go in `public/styles.css`, which loads
after it.

### 5.2 All layout in the kit is inline `style`, not classes

`fg-*` covers components only. Every `display:grid`, `gridTemplateColumns:"380px 1fr"`, `gap`,
eyebrow, and heading in `AppShell.jsx` / `*Screen.jsx` is an inline React style object, with **no
class name at all**. Don't go looking for `fg-page` or `fg-grid` — they don't exist, and no
extraction can produce them. That is why `public/styles.css` exists and why it uses a separate
`fga-` prefix: those class names are inventions of ours, not the design system's, and the
distinction should stay visible in the markup.

### 5.3 Components that need JS we would have to write

| Component | React state it depends on |
|---|---|
| `Tabs` | `value` + `onChange`, `aria-selected` toggling, conditional render of each panel |
| `Dialog` | `open` boolean, `Escape` keydown listener, scrim mousedown-to-close, focus management |
| `Toast` | mount + a 3200 ms `setTimeout` auto-dismiss in `App.jsx` |
| `Tooltip` | `open` on mouseenter/focus, `fg-tip__bubble--visible` toggle |
| `Switch` / `Select` / `Input` in the filter bar | controlled values feeding a filter + re-render |
| `Card interactive` selected state | `target.code === r.code` comparison — replicated in `markSelected()` (§3.3) |
| `Stepper current` | derived from `App.jsx` step state — replicated in `setStep()` (§3.1) |

All of these are SKIP in §4 except the last two, which are 8 and 6 lines respectively.

### 5.4 Nodes written with `textContent` cannot contain icon children

`#error`, `#loading` and `#jobs-provenance` are all written with `node.textContent = …`, which
destroys children. Use the `fg-callout--icon-before` variant (§0.4) or you will spend ten minutes
wondering why the icon vanishes on the second render.

### 5.5 `Card interactive` renders a `<button>` — this is good news

`components/core/Card.jsx`: `const Tag = as || (interactive ? "button" : "div")`, and it sets
`type="button"`. Our `.related-btn` is already a `<button type="button">` with a click listener, so
`fg-card fg-card--interactive` is a pure class addition. **`fg-card--interactive` already sets
`width:100%; text-align:left; font:inherit; display:block`** — exactly what the old stub CSS was
hand-rolling for `.related-btn`. Don't reintroduce those rules.

### 5.6 Never put a `body` rule back in `public/styles.css`

`tokens/base.css` (inlined at the top of `forage-ds.css`) sets
`body{margin:0;background:var(--surface-page);font:var(--type-body)}` and zeroes `h1..h4`/`p`
margins. The old stub's `body{margin:0 auto;padding:2rem 1.25rem;max-width:46rem}` fought it, and
because `styles.css` loads *second* it won — the whole design system would render inside a 46 rem
column in the wrong font. That rule is already gone; keep it gone. Page width now comes from
`.fga-page` (`--width-content: 1080px`).

### 5.7 Network dependencies

Two, both CDN, both in `ui spec/`'s design as shipped:
- `tokens/fonts.css` `@import`s Google Fonts (Bricolage Grotesque, Public Sans, JetBrains Mono).
  Offline, everything falls back to `system-ui` and the brand disappears while the layout survives.
- Lucide SVGs from jsDelivr. Offline, icons are invisible empty spans.

If the demo network is a risk, download the three font `woff2` files and the ~12 icon SVGs into
`public/` — but `.woff2` is **not** in `server.js`'s `MIME` map (line 26), so you would have to add
it. `.svg` is already there.

### 5.8 Data-shape mismatches — `data.js` vs `API.md`

This table is the reason not to port kit JSX literally. **Same-named fields with different types are
the dangerous rows.**

| Kit (`ui_kits/forage-app/data.js`) | Our API (`API.md`) | Consequence |
|---|---|---|
| `related[].overlap` — **number 0–100** (`68`), fed to `SkillMeter value` | `related[].overlap` — **a ~20-word sentence** | **The worst one.** Identical field name, incompatible type. `SkillMeter` renders `NaN%`. The kit's per-related-card overlap meter cannot be built. Ours is prose — render it as prose (§1.2) |
| `related[].why` — the prose explanation | no such field; the prose lives in `overlap` | Names are crossed over. Porting JSX renders `undefined` |
| `match.summary` | `occupation.description` | Rename only |
| `match.title` / `match.code` | `occupation.title` / `occupation.code` | Rename only |
| `match.skills[].importance` 0–100 | `skills[].importance` 0–100 | **Match.** The one meter that is real data end to end |
| — | `skills[].description` (`""` in local mode) | Must render fine when blank — the kit has no equivalent |
| `gap.have` / `gap.missing` — `["string"]` | `[{ name, note }]` | Tag text is `.name`. `note` (a full sentence: *"You use this, but the target leans harder on it (63 vs 81)."*) has **no home in a pill** — render it beside the tag |
| kit gap has no from/to | `gap.from` / `gap.to` `{code,title}` | We can render the "From X to Y" heading with real titles; the kit hard-codes `"Ad ops → " + target.title` |
| `jobs[].match` — fit % | **absent** | Every `SkillMeter label="Fit"` in `JobRow` and the dialog has no source. Do not invent one — the brand rule is "a claim without a number is a claim Forage does not make," and a fabricated fit score is worse than none |
| `jobs[].mode` (`Remote`/`Hybrid`/`On-site`) | `remote` — **boolean only** | Only two states. One `fg-badge--info "Remote-eligible"` when true, nothing when false |
| `jobs[].type`, `.pay`, `.desc` | absent | The caution badge, the pay badge and the dialog body have no data |
| `jobs[].posted` (`"3 days ago"`) | `postedAt` (`"2026-08-03"`) | Absolute date, not relative. Either render the ISO date or write a small relative formatter |
| `jobs[].board` (`"Greenhouse"`) | `source` (`"Greenhouse public job board API"`) | Longer string. Render it whole in the mono row, or `source.split(' ')[0]` |
| `jobs[].role` / `.org` / `.place` | `title` / `company` / `location` | Rename |
| — | `job.url`, `job.id` | Kit has no real URL (`href="#"`); we do, and it is the only honest CTA |
| `sectors[].growth` (14), `.openings` ("4,100") | `fallback.sectors[].trend` — a **sentence** | The kit's numeric sector table is unbuildable. Also: kit shows sectors as a *tab*, always available; ours only exist inside the no-match `fallback` |
| `resources[]` — always present, 3 items | `fallback.resource` — **one object**, only on the no-match path | The gap screen's two resource cards must be hard-coded copy, not data |
| — | `live` (bool), `boards` (`"6/6"`), `matchedOn` | Our provenance line has no kit equivalent. It goes in the disclosure `Callout` above the job list — and per `UI_CONTRACT.md` it must never be hidden |
| — | `source: "onet-local"` on match and gap | Not surfaced by the kit; optional mono footnote |

### 5.9 Copy the kit does not have data for

The kit's `SectionHead` ledes contain hard numbers (*"Four of seven core skills are already yours,"*
*"Six roles in our dataset line up"*). Those are literals in the JSX. Either compute them from the
real arrays (`gap.have.length`, `matches.length`) or write a lede with no number. **Do not paste the
kit's numbers** — the readme's own rule is that a number in Forage copy must be true.

### 5.10 The kit is desktop-only, on purpose

`readme.md` §11: no mobile breakpoints, 1080 px content column, `380px 1fr` fixed grids. Mobile is
an explicit PRD non-goal. If the demo runs on a projector this is fine. If anyone opens it on a
phone, the two-column grids will overflow. `public/styles.css` already has a `max-width:40rem`
query collapsing `.fga-cols-2`; the `.fga-cols-side` equivalent is included in the §0.5 additions.
Nothing more is needed.

### 5.11 Do not touch `ui spec/`

Everything above copies *out* of it. `_ds_bundle.js` is a React UMD bundle and is not usable here —
it needs `window.React`, and loading React would defeat the point.
