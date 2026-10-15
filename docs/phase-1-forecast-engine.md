# Phase 1 — Forecast engine

**Goal:** every amount enters as a dated `cash_event`, the engine returns 13 weeks per
currency, raises two levels of alert with their drivers, and runs scenarios S1–S3 as
changes to the event list. Same input and same formula version give the same output (N7).

**Spec:** sheets Logic dự báo, Kịch bản, Đầu ra, Mô hình dữ liệu; features F04, F06–F12, F14.

## Done

- [x] `CashEvent` type (`types/finance.ts`) and `bucketEventsByWeek` — week 1 starts on the cut-off date (D04 A), overdue items go to week 1 (D05 A), events after week 13 are left out, currencies never mix.
- [x] `alertLevel` — `SHORTFALL` under zero, `BELOW_BUFFER` under the safety level, exactly at the level is OK (TC04, TC25).
- [x] Scenarios in `lib/scenarios.ts`: `delayBill` (S1, flexible bills only, late fee unknown unless entered), `collectEarly` (S2, amount × (1 − d), cost = amount × d), `simulateLoan` (S3, equal principal, interest = balance owed × r/52), `owedAfter` for obligations past week 13.
- [x] `npm run test:spec`: TC01–TC08, TC25, invariant N4, S1-01, S2-01, S3-01, S3-02 (14 checks).

## To do

- [ ] `status` (actual / expected), `source_file`, `source_row`, `assumption_note` on `CashEvent` (data model sheet).
- [ ] Alert object: first week, closing, buffer, gap, top 3 drivers with file and row (F08).
- [ ] Label overdue items moved into week 1 (D05).
- [ ] S1: note "moved out of the forecast" when the new date is past week 13; refuse dates before the cut-off (done) and non-flexible bills (done).
- [ ] Compare table M1–M6 for baseline and scenarios (F12), no cross-currency totals.
- [ ] Assumptions list (collection delay P06, safety level) stored with each run (F14).
- [ ] `forecast_run` record: data hash, formula version, created at (NF07, NF08).
- [ ] CNY and USD runs on the same engine (F07, depends on D02).
- [ ] Replace the bucket-based demo engine used by the dashboard; keep `npm run test:finance` green or retire it with the dashboard rewrite.

## Acceptance

TC01–TC09, TC25 pass; empty scenario equals baseline (TC07); changing VND data does not
change CNY or USD (N4 / TC09 in the spec numbering, to confirm).

## Decisions needed

D02 (currency depth), D04 and D05 sign-off, D12 (collection delay default).
