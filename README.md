# heva sprint scaffold

Blank-canvas prototyping environment for the Head of Product design sprint.

Not a finished product — a starting point so the actual sprint time goes into
the brief, not project setup.

## About heva

heva is an AI-native healthcare platform revolutionizing how patients and
healthcare providers connect globally, making quality care accessible to
everyone, everywhere. heva's AI-powered tools automate patient engagement,
scheduling, and payments, allowing providers to focus on providing
exceptional care while expanding globally.

## What's here

- Next.js (App Router) + TypeScript + Tailwind, configured with real design
  tokens pulled from app.heva.co (see `design/heva.md` for the full analysis,
  `STYLE_GUIDE.md` for the condensed directives).
- A nav shell (`components/nav-shell.tsx`) and a small component set
  (`components/ui/*`): Button, Card, Badge, Input, Pill.
- Three placeholder routes shaped like heva's own surfaces, so swapping in
  the real brief is editing, not building from zero:
  - `/list` — a searchable, card-based list (store pattern)
  - `/list/[id]` — a profile/detail page (practice pattern)
  - `/chat` — a chat surface with suggestion pills (heva chat pattern)

## Running locally

```bash
npm install
npm run dev
```

## Handoff

`STYLE_GUIDE.md` is written to be handed to Claude Code (or pasted into
`CLAUDE.md`) alongside tomorrow's PRD. It documents the tokens as directives
and anti-patterns, not just raw values.
