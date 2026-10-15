# Phase 0 — Foundation and landing

**Goal:** a repo the team can work in safely, a landing page that explains FlowWise with its
own calculation, and the spec's worked example locked under test.

**Status:** done on branch `feature/landing-redesign`, PR #1 into `Vinhnt06/FlowWise:main`
(waiting for a maintainer to approve CI and merge).

## Done

- [x] Project rules in `AGENTS.md` / `CLAUDE.md`: English-only UI (D10), shop-owner wording (D09), design gate, branch and commit rules.
- [x] Skills in `.claude/skills/`: design-taste-frontend, vercel-react-view-transitions, banner-design, supabase-postgres-best-practices, find-skills.
- [x] Design tokens from `DESIGN.md` in `app/globals.css` (light and dark), fonts Plus Jakarta Sans / DM Sans / Fira Code.
- [x] Worked example E01–E39 in `data/worked-example.ts`; `npm run test:spec` covers TC01–TC08 and runs in CI.
- [x] Landing rebuilt from `components/landing/*`, copy in `content/landing.ts`, every figure taken from the engine.
- [x] Landing round 2 (this branch): product fragments instead of city and banknote photos; new sections "Every number has a source" and "Three ways to close the gap"; two alert colours (amber below safety, crimson short of cash); all copy in English.
- [x] View transitions landing ↔ dashboard (`nav-forward` / `nav-back`).

## Known gaps carried forward

- Some landing panels show features that are not built yet: data check, payout check, answer check, approval and PDF. They are labelled as simulated; each is owned by a later phase.
- The HowItWorks "Check" state uses illustrative counts (1,284 / 1,276 / 8), to be replaced by real output from phase 2.
- `DESIGN.md` still contains template wording.

## Checks

`npm run build`, `npm run test:finance`, `npm run test:spec`, taste lint and inspector (see `AGENTS.md`).
