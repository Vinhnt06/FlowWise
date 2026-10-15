# FlowWise — delivery phases

This folder tracks what each phase builds, how we know it is done, and what is still open.
The source of truth for business rules is `FlowWise1.xlsx` (feature IDs F01–F24, data rules
V01–V25, tests TC01–TC26, decisions D01–D13, AI tools and guardrails G01–G08). Platform
rules R01–R28 in `FlowWise_Shopee_TikTok_nghiep_vu.xlsx` are all unverified.

Last updated: 2026-10-15. Roadmap window from the spec: 12–20 October 2026 (the official
deadline comes from the competition rules, not verified here).

## Phases

| Phase | Doc | Goal | Spec features | Status |
| --- | --- | --- | --- | --- |
| 0 | [Foundation and landing](phase-0-foundation.md) | Repo rules, skills, landing page, worked example under test | F19 (partly) | Done on `feature/landing-redesign` (PR #1, not merged) |
| 1 | [Forecast engine](phase-1-forecast-engine.md) | `cash_event` in, 13 weeks out, two alert levels, scenarios S1–S3 | F04, F06–F12, F14 | In progress: core functions and 14 checks pass, dashboard not wired |
| 2 | [Data input](phase-2-data-input.md) | Upload, column mapping, data checks, platform presets | F01–F03, F05, F18, F19, manual form (D13) | Not started |
| 3 | [Dashboard and report](phase-3-dashboard.md) | Screens M01–M08 on the new engine, approval, PDF | F12, F15, F16, F20 | Not started (current dashboard uses the old bucket engine) |
| 4 | [AI engine](phase-4-ai-engine.md) | Assistant that calls engine tools and never invents numbers | F13, G01–G08, Q1–Q7 | Not started; needs D01, D03, D08 |
| 5 | [Infrastructure](phase-5-infrastructure.md) | Postgres schema, storage, auth, deploy, secrets, audit | NF01–NF11, data model sheet | Not started; needs I01 |
| 6 | [Launch](phase-6-launch.md) | End-to-end run on demo data, video, submission | Roadmap 19–20 Oct | Not started |

Order matters: 1 → 2 → 3 can overlap, 4 needs the engine tools from 1, 5 can start in
parallel with 2 but must land before 4 stores conversations or runs.

## Open decisions that block a phase

| ID | Question | Blocks | Spec proposal | Status |
| --- | --- | --- | --- | --- |
| D01 | How far the assistant goes on "where should I put my money" | 4 | A: only the safe surplus and its uses, no products | Open |
| D02 | How deep CNY and USD go in the MVP | 1, 3 | A: VND first, CNY/USD basic | Open |
| D03 | What "AI" means in the pitch | 4 | A: engine + LLM explains; simple statistics (F21) as P1 | Open |
| D04 | Week convention | 1 | A: week 1 starts on the cut-off date | Implemented as A, needs sign-off |
| D05 | Where overdue items go | 1 | A: week 1, labelled | Implemented as A (no label yet), needs sign-off |
| D06 | Default safety level | 2 | A: four weeks of average outflow, editable | Open |
| D07 | Demo data | 6 | B if a seller shares anonymised files, else A | Open |
| D08 | Which LLM, and what data leaves the machine | 4, 5 | Aggregates only (G05) | Open |
| D09 | Persona and wording | 3 | A: shop owner / accountant | Chosen (A) |
| D10 | UI language | all | — | Closed: English only, no i18n |
| D11 | PDF report or web only | 3 | A: PDF as P1 | Open |
| D12 | Default collection delay | 1 | 0 days, editable | Open |
| D13 | Manual entry instead of upload | 2 | Minimal form for balance, safety level, bills | Open |
| I01 | Backend platform: Supabase or Encore Cloud (8 Sync default) | 5 | Supabase was installed as the infra skill | Open |
| L01 | Assistant answer language: G08 says Vietnamese, D10 says English UI | 4 | — | Open |

## How to update

- Tick tasks in the phase doc in the same PR that ships them, and change the status column above.
- Every claim of "done" names the check that proves it (`npm run test:spec`, a TC id, a screenshot).
- Decisions: write the final choice and the date in the table, and copy it into the spec sheet "Quyết định mở".
