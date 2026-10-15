# Phase 5 — Infrastructure

**Goal:** store files, events, runs, alerts, scenarios and approvals so that every number is
traceable and every run can be reproduced; deploy the app with secrets kept out of code.

**Spec:** sheets Mô hình dữ liệu, Phi chức năng (NF01–NF11). Load the
`supabase-postgres-best-practices` skill before any schema, migration, RLS, index or query work.

## Platform (open, I01)

| | Option A: Supabase | Option B: Encore Cloud |
| --- | --- | --- |
| Why | Installed as the infra skill for this project; Postgres, storage, auth and RLS in one place | 8 Sync's default backend platform |
| Frontend | Vercel (current) | Vercel (current) |
| Database | Supabase Postgres | Encore-managed Postgres |
| File storage | Supabase Storage (private bucket) | Object storage via Encore |

Decide before the first migration. The tables below hold for either option.

## Tables (from the data model sheet)

| Table | Key fields | Notes |
| --- | --- | --- |
| `source_file` | file_id, filename, uploaded_at, row_count, mapping_json | Owner can delete it and its runs (NF04) |
| `cash_event` | event_id, date, amount (signed), currency, type, status, description, source_file, source_row, flexible, assumption_note | Index on (shop, currency, date) |
| `data_issue` | issue_id, rule_id, severity, file_id, row, message | One row per finding |
| `forecast_run` | run_id, as_of_date, currency, data_hash, formula_version, created_at | Reproducible (NF07, NF08) |
| `week_result` | run_id, week_no, start, end, opening, inflow, outflow, closing, status, gap | 13 rows per run and currency |
| `alert` | run_id, currency, level, first_week, closing, buffer, gap, drivers[] | drivers carry file and row |
| `scenario` / `scenario_change` | scenario_id, type, params_json, base_run_id / event_id, field, old, new | A scenario is a list of event changes |
| `approval` | run_id, scenario_id, approved_by, approved_at, assumptions_snapshot | No money movement anywhere |

Money columns use `numeric` (or `bigint` minor units), never floating point; currency is a
column on every amount and no query sums across currencies.

## To do

- [ ] Decide I01 and create the project (staging first).
- [ ] Migrations for the tables above, with row-level security per shop and the two roles of F20.
- [ ] Private storage for uploads; signed URLs only; delete cascades to events and runs (NF04).
- [ ] Environment variables for database and model keys in the hosting dashboard only (NF06); nothing in the repo.
- [ ] Seed script for the simulated demo shop (NF05), clearly labelled.
- [ ] Measure forecast time for three currencies on demo data and record it (NF02).
- [ ] CI: build, `test:finance`, `test:spec`, migration check on pull requests.
- [ ] Vercel: ask the repo owner to authorise deploys from contributors (PR #1 shows "Authorization required to deploy").

## Acceptance

A run stored today can be reloaded and gives the same 13 weeks (N7); deleting a file
removes its events and runs; no secret in git history.
