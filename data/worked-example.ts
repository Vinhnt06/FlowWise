/**
 * FlowWise — Worked Example (spec workbook FlowWise1.xlsx, sheet "Ví dụ tính tay")
 *
 * SIMULATED DATA: a made-up shop, VND only. This is the reference dataset for
 * acceptance tests TC01–TC08 and the live forecast on the landing page.
 *
 * Expected results:
 * - Week 2 closes at 150,000,000 ₫, 10,000,000 ₫ below the 160,000,000 ₫ safety level.
 * - Week 4 closes exactly at the safety level: no warning (boundary case).
 * - Paying E05 14 days later leaves no week below the safety level.
 */

import { CashEvent, CurrencyForecastSummary } from '@/types/finance';
import {
  bucketEventsByWeek,
  calculateWeeklyForecast,
  summarizeCurrencyForecast,
} from '@/lib/finance-engine';

export const WORKED_EXAMPLE_AS_OF = '2026-10-12';
export const WORKED_EXAMPLE_OPENING = 300_000_000;
export const WORKED_EXAMPLE_BUFFER = 160_000_000;
export const WORKED_EXAMPLE_DEFER_ID = 'E05';
export const WORKED_EXAMPLE_DEFER_DAYS = 14;

const PAYOUT = 'Platform payout';
const SUPPLIER = 'Supplier payment';
const OPERATING = 'Operating costs and salaries';

type Row = [id: string, date: string, amount: number, type: CashEvent['type'], description: string];

const ROWS: Row[] = [
  ['E01', '2026-10-15', 100_000_000, 'settlement', PAYOUT],
  ['E02', '2026-10-14', -80_000_000, 'payable', SUPPLIER],
  ['E03', '2026-10-16', -40_000_000, 'recurring', OPERATING],
  ['E04', '2026-10-22', 50_000_000, 'settlement', PAYOUT],
  ['E05', '2026-10-22', -130_000_000, 'payable', SUPPLIER],
  ['E06', '2026-10-24', -50_000_000, 'recurring', OPERATING],
  ['E07', '2026-10-29', 90_000_000, 'settlement', PAYOUT],
  ['E08', '2026-10-28', -30_000_000, 'payable', SUPPLIER],
  ['E09', '2026-10-30', -30_000_000, 'recurring', OPERATING],
  ['E10', '2026-11-05', 110_000_000, 'settlement', PAYOUT],
  ['E11', '2026-11-04', -60_000_000, 'payable', SUPPLIER],
  ['E12', '2026-11-06', -70_000_000, 'recurring', OPERATING],
  ['E13', '2026-11-12', 120_000_000, 'settlement', PAYOUT],
  ['E14', '2026-11-11', -50_000_000, 'payable', SUPPLIER],
  ['E15', '2026-11-13', -40_000_000, 'recurring', OPERATING],
  ['E16', '2026-11-19', 130_000_000, 'settlement', PAYOUT],
  ['E17', '2026-11-18', -60_000_000, 'payable', SUPPLIER],
  ['E18', '2026-11-20', -40_000_000, 'recurring', OPERATING],
  ['E19', '2026-11-26', 100_000_000, 'settlement', PAYOUT],
  ['E20', '2026-11-25', -70_000_000, 'payable', SUPPLIER],
  ['E21', '2026-11-27', -40_000_000, 'recurring', OPERATING],
  ['E22', '2026-12-03', 140_000_000, 'settlement', PAYOUT],
  ['E23', '2026-12-02', -50_000_000, 'payable', SUPPLIER],
  ['E24', '2026-12-04', -40_000_000, 'recurring', OPERATING],
  ['E25', '2026-12-10', 150_000_000, 'settlement', PAYOUT],
  ['E26', '2026-12-09', -80_000_000, 'payable', SUPPLIER],
  ['E27', '2026-12-11', -40_000_000, 'recurring', OPERATING],
  ['E28', '2026-12-17', 120_000_000, 'settlement', PAYOUT],
  ['E29', '2026-12-16', -60_000_000, 'payable', SUPPLIER],
  ['E30', '2026-12-18', -40_000_000, 'recurring', OPERATING],
  ['E31', '2026-12-24', 130_000_000, 'settlement', PAYOUT],
  ['E32', '2026-12-23', -100_000_000, 'payable', SUPPLIER],
  ['E33', '2026-12-25', -40_000_000, 'recurring', OPERATING],
  ['E34', '2026-12-31', 160_000_000, 'settlement', PAYOUT],
  ['E35', '2026-12-30', -70_000_000, 'payable', SUPPLIER],
  ['E36', '2027-01-01', -40_000_000, 'recurring', OPERATING],
  ['E37', '2027-01-07', 140_000_000, 'settlement', PAYOUT],
  ['E38', '2027-01-06', -80_000_000, 'payable', SUPPLIER],
  ['E39', '2027-01-08', -40_000_000, 'recurring', OPERATING],
];

export const WORKED_EXAMPLE_EVENTS: CashEvent[] = ROWS.map(([id, date, amount, type, description]) => ({
  id,
  date,
  amount,
  currency: 'VND',
  type,
  description,
  flexible: id === WORKED_EXAMPLE_DEFER_ID,
}));

/**
 * Run the 13-week VND forecast for a list of events.
 */
export function forecastWorkedExample(
  events: CashEvent[],
  opening = WORKED_EXAMPLE_OPENING,
  buffer = WORKED_EXAMPLE_BUFFER,
  asOfDate = WORKED_EXAMPLE_AS_OF
): CurrencyForecastSummary {
  const buckets = bucketEventsByWeek(events, asOfDate, 'VND');
  const weeks = calculateWeeklyForecast(opening, buffer, 'VND', buckets);
  return summarizeCurrencyForecast('VND', opening, buffer, weeks);
}
