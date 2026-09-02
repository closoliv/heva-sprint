# STYLE_GUIDE — heva design taste

*Generated from a live design-taste analysis of app.heva.co (detail, chat, store pages). Full measurements + Taste DNA in `design/heva.md` / `design/heva.json`. This file is the condensed, directive form meant to be hand it to Claude Code (or pasted into `CLAUDE.md`) alongside tomorrow's PRD.*

## Tokens

- **Color** — bg `#FFFFFF` (chat surfaces use `#F8FAFC` instead), text `#2F2F30` / muted `#8C8D91`, brand blue `#0056D6` (links, secondary actions, prices), accent lime `#C3FB11` (ONE primary CTA per screen, never more).
- **Type** — single family (`madeCarvingSoft`, real; `Quicksand` stands in here), weights 300/400/600 only. H1 32px/600, H3 18px/600, body 14-15px/400, UI chrome 12-16px/300.
- **Spacing** — 8px base unit; everything else a multiple of 4px (4/8/12/16/20/24/32).
- **Radius** — 8px controls, 12px secondary buttons, 16px cards, full pill for chips.
- **Shadow** — `rgba(16,24,40,0.06)`, single layer, used sparingly (see directives).
- **Layout** — mobile/portrait-first; max working width ~480-800px, single column, cards stacked vertically.

## Directives

- When choosing an accent for the primary action, always use `#C3FB11` exactly once per screen — because the point is one unambiguous next step, not a palette.
- When separating stacked cards, always use a 1px border + 16px radius by default — because borders read calmer than shadows for a healthcare context.
- When something needs elevation, use it only on the single active/expanded element on screen — because depth is a signal, not decoration.
- When spacing anything, always pick from 4/8/12/16/20/24/32px — because a consistent grid is what lets profile, store, and chat feel like one product.
- When setting type weight, stay within 300 (chrome)/400 (body)/600 (headings) — because a single typeface family carrying all hierarchy is the whole point.
- When laying out a screen, design mobile/portrait-first (max ~480-800px), single column — because that's the canvas this product actually lives on.

## Anti-patterns

- Never use the lime accent more than once per screen, or on anything but the single primary action.
- Never add drop shadows to every card by default — reserve shadow for the one expanded/active item.
- Never introduce a second typeface or a bold (700) weight for "more" hierarchy — push size/weight/color within the existing 3-weight system instead.
- Never design a wide desktop-first grid as the default — this product's real surfaces top out around 480-800px.
- Avoid the inconsistent Tailwind-default blue (`#3B82F6`) seen once on the chat page — it reads as an unstyled default, not a brand color. Use `#0056D6` for anything blue.

## Known placeholder

`madeCarvingSoft` is heva's proprietary font and isn't bundled in this scaffold. `Quicksand` (Google Fonts) stands in for it — similar soft/rounded letterforms, but not the real thing. Swap it in `app/layout.tsx` if you get the licensed font file during the sprint.
