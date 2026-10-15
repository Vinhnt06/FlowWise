# Changelog

## [Unreleased]

### Added
- `bucketEventsByWeek` and `shiftEventDate` in `lib/finance-engine.ts`: dated cash events grouped into 13 weeks from the cut-off date, per currency, overdue items in week 1.
- `data/worked-example.ts`: the spec's worked example (E01–E39, simulated) and `npm run test:spec` with acceptance tests TC01–TC08 (8/8 passing); CI runs it.
- New landing page built with the `design-taste-frontend` skill ("The product performs" direction): live 13-week forecast in the hero with the "pay E05 14 days later" switch, product panel carousel, stage slider, "Try a fix" controls, currency section with credited open-licence pictures and one video loop, file list with sample CSV downloads.
- Directional view transitions between the landing page and the dashboard.
- Agent skills in `.claude/skills/`: design-taste-frontend, vercel-react-view-transitions, banner-design, supabase-postgres-best-practices, find-skills.
- `content/landing.ts` holds all landing copy (English only, written for shop owners).

### Changed
- Design tokens and fonts follow `DESIGN.md`: Plus Jakarta Sans, DM Sans, Fira Code; navy primary buttons; 8px radius; DESIGN.md elevation scale; contrast-safe ink tokens.
- `AGENTS.md` / `CLAUDE.md` document the spec, language, design and skill rules.

### Removed
- Old landing sections and effects: background video, live ticker, border beams, spotlight and tilt cards, trust bar implying platform integrations, and unsourced figures.
