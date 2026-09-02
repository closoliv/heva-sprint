# heva — Design Map + Taste DNA

*Source: app.heva.co — practice detail (/en/practice/27), chat (/heva/27), store (/en/practice/27/store). Captured 2026-09-02 via live DOM inspection + screenshots (not the full taste-skill Playwright pipeline, but the same 4-step method, run across all 3 provided reference pages instead of one).*

## Design Map

### Spacing Scale
4px, 8px, 12px, 16px, 20px, 24px, 32px — base unit 8px, everything a multiple of 4px.

### Font Hierarchy
- H1 — 32px / 600 / 40px line-height
- H2 — 20-32px / 600 (varies with nesting)
- H3 — 18px / 600 / 24px line-height
- Body — 14-15px / 400 / 20-22.5px line-height
- UI chrome (buttons, nav labels) — 12-16px / **300** (deliberately light)
- Family: `madeCarvingSoft` (proprietary custom font) — 100% of sampled elements across all 3 pages. No second family anywhere.

### Color Palette
| Role | Value | Notes |
|---|---|---|
| Background | `#FFFFFF` | 66-79% of page area on non-chat surfaces |
| Background (chat) | `#F8FAFC` | 98% of the chat page — chat is visually its own "mode" |
| Text primary | `#2F2F30` | |
| Text secondary / muted | `#8C8D91` | strongest cross-page signal |
| Text navy | `#1A2433` | |
| Text slate | `#5B6473` | |
| Brand blue | `#0056D6` | links, secondary buttons, prices — reused constantly |
| Accent (lime) | `#C3FB11` | **one CTA per screen only** — see Taste DNA #1 |
| Chat blue (inconsistent) | `#3B82F6` | only on chat page; reads as an unstyled Tailwind default, not a system color |

### Image Ratios
- Profile photo: 0.87:1
- Procedure/service icon: 1:1

### Component Tokens
- Radius: 8px (inputs/small buttons), 12px (secondary buttons), 16px (cards), 9999px (pills/chips)
- Shadow: `rgba(16,24,40,0.06)` single-layer, reserved for the one expanded/primary card — everything else uses a border instead
- Grid: single-column, stacked cards everywhere except a 2-col procedures grid (16px gutter); working width tops out ~480-800px — this is a mobile/portrait-first product, not a wide desktop dashboard

---

# Taste DNA

### One loud color, everywhere else quiet — RESTRAINT
- **Trigger**: Deciding how to draw the eye to the single most important action per screen (book, chat, buy).
- **Decision**: Reserve lime `#C3FB11` for exactly one primary CTA per screen, over using the already-present brand blue more prominently, or introducing multiple accent colors for hierarchy.
- **Reason**: A patient arriving from a shared link needs one unambiguous next step, not a palette to interpret.
- **Evidence**: Lime appears only on the detail page's "Chat now" button (~17.5% of visible area) and nowhere else across the 3 pages analyzed. Blue `#0056D6` is reused for ~15 other roles (links, secondary buttons, prices) but never promoted to primary-CTA duty.
- **Trade-off**: Can't use color to signal more than one priority level — everything that isn't "the" action is flattened into blue/gray.

### Borders do the separating, shadows barely whisper — RESTRAINT
- **Trigger**: Separating 5+ stacked service cards on the store page without the page feeling heavy.
- **Decision**: 1px borders + 16px radius as the default card treatment, over drop shadows for depth.
- **Reason**: A healthcare-procedure store should read as a calm form, not a shopping app stacked with drop shadows.
- **Evidence**: 7 of 8 detected card elements on the store page carry `shadow: null`. Only the one expanded/primary card carries a shadow, and it's barely perceptible (`rgba(16,24,40,0.06)`).
- **Trade-off**: Less depth cueing — users rely on an expand/chevron affordance rather than elevation to know what's interactive.

### Everything lives on an 8px grid, no exceptions — SYSTEM
- **Trigger**: Three visually distinct surfaces (profile, store, chat), likely built as separate flows.
- **Decision**: Constrain every gap/margin/padding to multiples of 4px (dominant: 8/16/24), over letting each surface pick its own rhythm.
- **Reason**: Consistent tap targets and breathing room let a patient move between "look at my doctor," "buy a service," and "chat" without the layout resetting its rules.
- **Evidence**: spacingDistribution's top values are 8px/16px/24px on all 3 pages, captured independently of each other.
- **Trade-off**: Fine, content-driven spacing (e.g. extra room around a long paragraph) is sacrificed for grid consistency.

### One typeface, three weights, no exceptions — RESTRAINT
- **Trigger**: Needing to express hierarchy (headline vs. button label vs. body copy) across three different surfaces.
- **Decision**: A single custom rounded family (`madeCarvingSoft`) in only 300/400/600, over pairing a display font with a body font or adding a 700 bold weight.
- **Reason**: A single rounded typeface system reads as approachable rather than corporate — plausibly deliberate for patients who may already be anxious about a medical decision.
- **Evidence**: `uniqueFamilies` is 100% single-family across all 3 pages (129/59/101 sampled elements). `weightDistribution` caps at 600; only one incidental 700 appears.
- **Trade-off**: Hierarchy has to come entirely from size + weight + color — there's no second typeface to lean on for contrast.

---

## Caveats
- Captured via a live browser inspection + DOM-computed-styles script (same measurement method the `/taste` pipeline uses), not the literal Playwright MCP pipeline — no Playwright MCP server is installed in this environment.
- Viewport during capture was ~743-800px wide (narrower than the pipeline's usual 1440×900) — this actually turned out to be informative: it confirms the product is built mobile/portrait-first rather than for a wide desktop canvas.
- `madeCarvingSoft` is heva's own proprietary font — not bundled here. The scaffold substitutes Quicksand (open, similarly soft/rounded) as a placeholder; swap it for the real font file once you have it.
