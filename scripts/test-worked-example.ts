/**
 * FlowWise — Spec Acceptance Tests TC01–TC08
 *
 * Expected values come from FlowWise1.xlsx, sheets "Ví dụ tính tay" and "Test case".
 * Data: data/worked-example.ts (simulated, VND only).
 */

import assert from 'node:assert/strict';
import { shiftEventDate } from '../lib/finance-engine';
import {
  WORKED_EXAMPLE_EVENTS,
  WORKED_EXAMPLE_OPENING,
  WORKED_EXAMPLE_BUFFER,
  WORKED_EXAMPLE_DEFER_ID,
  WORKED_EXAMPLE_DEFER_DAYS,
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
