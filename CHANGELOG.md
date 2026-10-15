# Changelog

## [Unreleased]

### Added
- `BalanceChart`: 13-week closing balance on a fixed scale with a dashed "before" mark on every week that moved, a hover/focus tooltip per week (opening, in, out, level) and a safety line that can be dragged or moved with the arrow keys. Used in "Try a fix" and in the S1 and S3 fix panels.
- "Try a fix": figures count to their new value, each shows the change against the starting forecast, quick-pick buttons on every control, and a Reset button.
- `RangeControl`: shared slider with fixed-width value and range ends; the thumb lifts on hover and drag and has a focus ring.
- `lib/scenarios.ts`: two alert levels (`alertLevel`), S1 pay a bill later, S2 collect early, S3 simulated loan, and `owedAfter` for obligations past week 13. `npm run test:spec` now runs 14 checks (TC01–TC08, TC25, invariant N4, S1-01, S2-01, S3-01, S3-02).
- Landing sections "Every number has a source" (week 2 taken apart into its dated items and source files) and "Three ways to close the gap" (live S1 and S3, S2 arithmetic, side-by-side table).
- Product fragments replace photos: currency ledger with 13-week ribbons and an empty total, answer check for the assistant, printed plan report in the closing section.
- `docs/`: phase index and one plan per phase (foundation, forecast engine, data input, dashboard, AI engine, infrastructure, launch).
- `bucketEventsByWeek` and `shiftEventDate` in `lib/finance-engine.ts`: dated cash events grouped into 13 weeks from the cut-off date, per currency, overdue items in week 1.
- `data/worked-example.ts`: the spec's worked example (E01–E39, simulated) and `npm run test:spec` with acceptance tests TC01–TC08 (8/8 passing); CI runs it.
- New landing page built with the `design-taste-frontend` skill ("The product performs" direction): live 13-week forecast in the hero with the "pay E05 14 days later" switch, product panel carousel, stage slider, "Try a fix" controls, currency ledger, file list with sample CSV downloads.
- Directional view transitions between the landing page and the dashboard.
- Agent skills in `.claude/skills/`: design-taste-frontend, vercel-react-view-transitions, banner-design, supabase-postgres-best-practices, find-skills.
- `content/landing.ts` holds all landing copy (English only, written for shop owners).

### Changed
- "From files to a plan" is a four-step stepper instead of a slider whose stops did not line up with their labels: numbered steps with a progress rail, a short explanation per step, Next / Start again on the fragment, arrow keys, and all four fragments stacked so the section keeps one height (it jumped between 699 and 877px on mobile).
- No more layout jumps: the three fix panels are stacked in one grid cell (same height on every tab, cross-fade instead of remount), the showcase captions are stacked the same way so the arrows never move. The fix charts fill their panel, and S2 shows the sample's forecast as it is today. The fix tabs support arrow keys; the selected fix is highlighted in the side-by-side table.
- S2 shows the invoice split into what you receive and the discount, with the same four result tiles as S1 and S3.
- Below the safety level is now amber and short of cash is crimson across the landing; "Try it" shows a 13-row week list and its opening balance goes down to 100,000,000 ₫ so a shortfall can be seen.
- Hero stage sits beside the headline; landing order is hero, source, how it works, showcase, fixes, try it, currencies, files, limits, close.
- Remaining Vietnamese text replaced with English: column mapping example and the sample bank statement.
- Design tokens and fonts follow `DESIGN.md`: Plus Jakarta Sans, DM Sans, Fira Code; navy primary buttons; 8px radius; DESIGN.md elevation scale; contrast-safe ink tokens.
- `AGENTS.md` / `CLAUDE.md` document the spec, language, design and skill rules.

### Removed
- City, landmark and banknote photos, the traffic video and the picture credits in the footer.
- Old landing sections and effects: background video, live ticker, border beams, spotlight and tilt cards, trust bar implying platform integrations, and unsourced figures.
