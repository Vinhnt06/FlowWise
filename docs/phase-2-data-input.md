# Phase 2 — Data input

**Goal:** a shop owner or accountant uploads the files they already have, confirms how the
columns were read, sees every problem with its file and row, and nothing is deleted
without them. Valid rows become `cash_event`s that trace back to their source.

**Spec:** sheets Đầu vào, Ánh xạ cột, Quy tắc dữ liệu, Preset sàn; features F01–F03, F05, F18, F19; D13.

## To do

- [ ] Upload one or more CSV / XLSX files with size and row limits (F01, NF01: 50,000 rows proposed, V22).
- [ ] Column mapping: suggest date / amount / currency, let the user fix it, remember it per file layout (F02). Support one signed amount column and separate debit / credit columns (TC14).
- [ ] Data checks V01–V25 with severity Block / Warning / Info, row number and file name (F03). One test per rule.
- [ ] Never delete suspected duplicates; flag them and keep both until the user decides (V12, TC11).
- [ ] Opening setup form: cut-off date, opening balance and safety level per currency; no forecast without them (F05).
- [ ] Manual entry form for shops with no files (D13, if chosen).
- [ ] Platform presets for Shopee and TikTok Shop settlement exports: payout event plus hold-release event (F18, TC21). Platform rules R01–R28 stay labelled unverified until checked with a seller.
- [ ] Demo dataset and downloadable templates, labelled simulated (F19). Sample CSVs in `public/sample-data/` are English.

## Acceptance

V01–V10 tested by 18 October (roadmap); TC10–TC21, TC26 pass; every event links to its file and row.

## Decisions needed

D06 (default safety level), D13 (manual entry).
