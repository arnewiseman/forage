# UI kit — Forage (Skills Bridge PDX)

A high-fidelity click-through of the whole product described in `forage/PRD.MD`. Open `index.html`.

## Flow

`Describe → Match → Target → Gap → Roles`, tracked by the `Stepper` in the header.

| File | Surface |
|---|---|
| `AppShell.jsx` | `Wordmark`, `AppHeader` (+ stepper strip), `AppFooter`, `Page`, `SectionHead` |
| `DescribeScreen.jsx` | Landing hero, the one text box, example chips, the "how it works" trio, disclosure block |
| `MatchScreen.jsx` | Matched O*NET occupation (print card, skill importance meters) + selectable related occupations |
| `GapScreen.jsx` | Have / missing skill tags with pill tabs, gap meters, the "start here" inverse card, resources |
| `RolesScreen.jsx` | Filter bar, job rows, job detail dialog, growth-sectors tab, empty state |
| `App.jsx` | Step state, saved-role toast |
| `data.js` | Sample dataset shaped like the PRD's `portland-jobs.json` / `growth-sectors.json` |

## Notes

- Every primitive comes from the design system bundle (`window.ForageDesignSystem_98e604`) — nothing is re-implemented here.
- Job listings, sector figures and skill gaps are **illustrative sample data**. The PRD requires a visible disclosure of what is live vs. hand-assembled; the `Callout tone="disclosure"` block on every data screen is that pattern.
- Try: click an example chip → **Find what transfers** → pick a related occupation → **See the gap** → **See open Portland roles** → **View** a role, save one, switch to **Growth sectors**, filter until the empty state appears.
