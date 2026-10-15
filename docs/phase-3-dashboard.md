# Phase 3 — Dashboard and report

**Goal:** the app screens run on the phase 1 engine and speak plainly to the shop owner;
the owner can compare fixes, approve one plan and download the report.

**Spec:** sheets Đầu ra, Thuật ngữ & UI copy; screens M01–M08; features F12, F15, F16, F20.

## To do

- [ ] Wire `app/dashboard` to `cash_event` runs instead of the ShopX bucket dataset.
- [ ] Replace treasury words ("Cockpit", "CFO sign-off", "deterministic engine") with the copy rules of D09.
- [ ] Two alert levels on every screen: amber below safety, crimson short of cash, always with a text label.
- [ ] Week detail with top 3 drivers linking to file and row (F08).
- [ ] Scenario screen for S1–S3 with the compare table (F12), costs shown, loan inputs labelled as assumptions.
- [ ] Approval: one plan, timestamp, assumptions snapshot, no money moves (F15).
- [ ] PDF report with sections B01–B08; numbers match the screen (F16, D11).
- [ ] Two roles, owner approves and accountant uploads, simulated switch is enough for the demo (F20, P2).
- [ ] Laptop first, dashboard readable on mobile (NF11).

## Acceptance

Screens M01–M08 work end to end on the demo data; report numbers equal screen numbers; no
cross-currency total anywhere.

## Decisions needed

D11 (PDF), D09 is chosen (A).
