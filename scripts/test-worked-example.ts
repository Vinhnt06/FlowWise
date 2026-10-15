/**
 * FlowWise — Spec Acceptance Tests (TC01–TC08, TC25), invariant N4 and scenario checks S1–S3
 *
 * Expected values come from FlowWise1.xlsx, the worked-example, scenarios and test-case sheets.
 * The spec has no test ids for scenarios, so those checks are named S1-xx, S2-xx, S3-xx.
 * Data: data/worked-example.ts (simulated, VND only).
 */

import assert from 'node:assert/strict';
import { shiftEventDate } from '../lib/finance-engine';
import { alertLevel, collectEarly, delayBill, owedAfter, simulateLoan } from '../lib/scenarios';
import { CashEvent } from '../types/finance';
import {
  WORKED_EXAMPLE_EVENTS,
  WORKED_EXAMPLE_OPENING,
  WORKED_EXAMPLE_BUFFER,
  WORKED_EXAMPLE_DEFER_ID,
  WORKED_EXAMPLE_DEFER_DAYS,
  WORKED_EXAMPLE_AS_OF,
  forecastWorkedExample,
} from '../data/worked-example';

const baseline = forecastWorkedExample(WORKED_EXAMPLE_EVENTS);
const week = (n: number) => baseline.weeks[n - 1];

const cases: [id: string, name: string, run: () => void][] = [
  ['TC01', 'Week 1 closing balance', () => {
    assert.equal(week(1).closingBalance, 280_000_000);
  }],
  ['TC02', 'Week 2 closes below the safety level', () => {
    assert.equal(week(2).closingBalance, 150_000_000);
    assert.equal(week(2).isBreached, true);
  }],
  ['TC03', 'Week 2 gap to the safety level', () => {
    assert.equal(week(2).deficitAmount, 10_000_000);
  }],
  ['TC04', 'Week 4 closes exactly at the safety level: no warning', () => {
    assert.equal(week(4).closingBalance, WORKED_EXAMPLE_BUFFER);
    assert.equal(week(4).isBreached, false);
  }],
  ['TC05', 'closing[w] = opening[w+1] for every week', () => {
    for (let i = 0; i < baseline.weeks.length - 1; i++) {
      assert.equal(baseline.weeks[i].closingBalance, baseline.weeks[i + 1].openingBalance);
    }
  }],
  ['TC06', '13-week inflow − outflow = closing[13] − opening', () => {
    const net = baseline.weeks.reduce((sum, w) => sum + w.inflow - w.outflow, 0);
    assert.equal(net, week(13).closingBalance - WORKED_EXAMPLE_OPENING);
    assert.equal(week(13).closingBalance, 370_000_000);
  }],
  ['TC07', 'An empty scenario equals the baseline', () => {
    const empty = forecastWorkedExample(shiftEventDate(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, 0));
    assert.deepEqual(
      empty.weeks.map((w) => w.closingBalance),
      baseline.weeks.map((w) => w.closingBalance)
    );
  }],
  ['TC08', 'Paying E05 14 days later leaves no week below the safety level', () => {
    const deferred = forecastWorkedExample(
      shiftEventDate(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, WORKED_EXAMPLE_DEFER_DAYS)
    );
    assert.equal(deferred.lowestBalance, 160_000_000);
    assert.equal(deferred.breachWeeksCount, 0);
  }],
  ['TC25', 'A closing balance under zero is a shortfall, not just a warning', () => {
    const low = forecastWorkedExample(WORKED_EXAMPLE_EVENTS, 120_000_000);
    assert.equal(low.weeks[1].closingBalance, -30_000_000);
    assert.equal(alertLevel(low.weeks[1].closingBalance, WORKED_EXAMPLE_BUFFER), 'SHORTFALL');
    assert.equal(alertLevel(week(2).closingBalance, WORKED_EXAMPLE_BUFFER), 'BELOW_BUFFER');
    assert.equal(alertLevel(week(4).closingBalance, WORKED_EXAMPLE_BUFFER), 'OK');
  }],
  ['N4', 'Adding a CNY bill leaves the VND forecast unchanged (invariant N4)', () => {
    const cnyBill: CashEvent = {
      id: 'C01', date: '2026-10-20', amount: -500_000, currency: 'CNY', type: 'payable', description: 'Supplier, Yiwu',
    };
    const withCny = forecastWorkedExample([...WORKED_EXAMPLE_EVENTS, cnyBill]);
    assert.deepEqual(withCny.weeks.map((w) => w.closingBalance), baseline.weeks.map((w) => w.closingBalance));
  }],
  ['S1-01', 'Only bills marked flexible can be moved', () => {
    const moved = delayBill(WORKED_EXAMPLE_EVENTS, 'E02', 14, WORKED_EXAMPLE_AS_OF);
    assert.equal(moved.events, WORKED_EXAMPLE_EVENTS);
    const e05 = delayBill(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, 14, WORKED_EXAMPLE_AS_OF);
    assert.equal(e05.events.find((e) => e.id === 'E05')?.date, '2026-11-05');
    assert.equal(e05.cost, null);
  }],
  ['S2-01', 'Early collection: amount × (1 − d) on the new date, cost = amount × d', () => {
    const invoice: CashEvent = {
      id: 'R01', date: '2026-11-02', amount: 100_000_000, currency: 'VND', type: 'receivable', description: 'Invoice',
    };
    const early = collectEarly([invoice], 'R01', '2026-10-20', 0.02, WORKED_EXAMPLE_AS_OF);
    assert.deepEqual(early.events[0], { ...invoice, date: '2026-10-20', amount: 98_000_000 });
    assert.equal(early.cost, 2_000_000);
    const tooEarly = collectEarly([invoice], 'R01', '2026-10-01', 0.02, WORKED_EXAMPLE_AS_OF);
    assert.equal(tooEarly.cost, 0);
  }],
  ['S3-01', 'Loan: equal principal, interest on the balance owed × r/52', () => {
    const loan = simulateLoan({ amount: 20_000_000, annualRate: 0.12, weeks: 4, disburseDate: '2026-10-19', currency: 'VND' });
    assert.equal(loan.totalInterest, 46_154 + 34_615 + 23_077 + 11_538);
    const repaid = loan.events.filter((e) => e.amount < 0).reduce((s, e) => s - e.amount, 0);
    assert.equal(repaid, 20_000_000 + loan.totalInterest);
    const result = forecastWorkedExample([...WORKED_EXAMPLE_EVENTS, ...loan.events]);
    assert.equal(result.weeks[1].closingBalance, 170_000_000);
    assert.equal(result.breachWeeksCount, 0);
  }],
  ['S3-02', 'Loan repayments after week 13 are reported, not dropped', () => {
    const loan = simulateLoan({ amount: 30_000_000, annualRate: 0.12, weeks: 12, disburseDate: '2026-10-19', currency: 'VND' });
    const result = forecastWorkedExample([...WORKED_EXAMPLE_EVENTS, ...loan.events]);
    const after = owedAfter(loan.events, result.weeks[12].endDate);
    const inside = loan.events
      .filter((e) => e.amount < 0 && e.date <= result.weeks[12].endDate)
      .reduce((s, e) => s - e.amount, 0);
    assert.ok(after > 0);
    assert.equal(after + inside, 30_000_000 + loan.totalInterest);
  }],
];

let failed = 0;
console.log('FlowWise spec acceptance tests (worked example, simulated data)\n');
for (const [id, name, run] of cases) {
  try {
    run();
    console.log(`  PASS ${id}  ${name}`);
  } catch (err) {
    failed++;
    console.error(`  FAIL ${id}  ${name}\n       ${(err as Error).message}`);
  }
}
console.log(`\n${cases.length - failed}/${cases.length} passed`);
if (failed) process.exit(1);
