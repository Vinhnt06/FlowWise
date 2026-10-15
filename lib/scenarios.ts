/**
 * FlowWise — Scenarios S1–S3 on dated cash events (spec FlowWise1.xlsx, scenarios sheet).
 *
 * A scenario never edits a number in place: it returns a new event list that goes
 * through the same weekly calculation as the baseline, plus the cost of the fix.
 */

import { CashEvent, Currency } from '@/types/finance';
import { shiftEventDate } from '@/lib/finance-engine';

const DAY_MS = 24 * 60 * 60 * 1000;

function addDays(iso: string, days: number): string {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + days * DAY_MS).toISOString().slice(0, 10);
}

export type AlertLevel = 'OK' | 'BELOW_BUFFER' | 'SHORTFALL';

/**
 * Two warning levels: under zero is a shortfall, under the safety level is a warning.
 * Closing exactly at the safety level is OK (TC04).
 */
export function alertLevel(closingBalance: number, buffer: number): AlertLevel {
  if (closingBalance < 0) return 'SHORTFALL';
  if (closingBalance < buffer) return 'BELOW_BUFFER';
  return 'OK';
}

/**
 * S1 — pay a bill later. Only bills marked flexible can move, and never to a date
 * before the cut-off. The late fee stays unknown unless the user enters one.
 */
export function delayBill(
  events: CashEvent[],
  eventId: string,
  days: number,
  asOfDate: string,
  lateFee?: number
): { events: CashEvent[]; cost: number | null } {
  const bill = events.find((e) => e.id === eventId);
  if (!bill || !bill.flexible || bill.amount >= 0 || days <= 0) return { events, cost: 0 };
  if (addDays(bill.date, days) < asOfDate) return { events, cost: 0 };

  const shifted = shiftEventDate(events, eventId, days);
  if (lateFee === undefined) return { events: shifted, cost: null };
  const fee: CashEvent = {
    id: `${eventId}-fee`,
    date: addDays(bill.date, days),
    amount: -Math.abs(lateFee),
    currency: bill.currency,
    type: 'payable',
    description: `Late fee on ${eventId}`,
  };
  return { events: [...shifted, fee], cost: Math.abs(lateFee) };
}

/**
 * S2 — collect an unpaid customer invoice early for a discount d (0–1).
 * New amount = amount × (1 − d) on the new date; cost = amount × d.
 */
export function collectEarly(
  events: CashEvent[],
  eventId: string,
  newDate: string,
  discount: number,
  asOfDate: string
): { events: CashEvent[]; cost: number } {
  const invoice = events.find((e) => e.id === eventId);
  const d = Math.min(1, Math.max(0, discount));
  if (!invoice || invoice.type !== 'receivable' || invoice.amount <= 0) return { events, cost: 0 };
  if (newDate < asOfDate || newDate >= invoice.date) return { events, cost: 0 };

  const cost = Math.round(invoice.amount * d);
  return {
    events: events.map((e) => (e.id === eventId ? { ...e, date: newDate, amount: e.amount - cost } : e)),
    cost,
  };
}

export interface LoanTerms {
  amount: number;
  /** Annual interest rate, e.g. 0.12 for 12%. Always an assumption until a lender quotes it. */
  annualRate: number;
  /** Term in weeks; principal is repaid in equal weekly parts. */
  weeks: number;
  disburseDate: string;
  currency: Currency;
  fee?: number;
}

export interface LoanSchedule {
  events: CashEvent[];
  totalInterest: number;
  totalCost: number;
}

/**
 * S3 — a simulated loan. One +L event on the disbursement date, then one repayment a week:
 * principal L/T plus interest on the balance still owed × r/52. Same currency as the gap.
 */
export function simulateLoan(terms: LoanTerms): LoanSchedule {
  const { amount, annualRate, weeks, disburseDate, currency, fee = 0 } = terms;
  const events: CashEvent[] = [
    { id: 'L0', date: disburseDate, amount, currency, type: 'loan', description: 'Loan received' },
  ];
  if (fee > 0) {
    events.push({ id: 'L0-fee', date: disburseDate, amount: -fee, currency, type: 'loan', description: 'Loan fee' });
  }

  let owed = amount;
  let totalInterest = 0;
  const part = Math.round(amount / weeks);
  for (let k = 1; k <= weeks; k++) {
    const interest = Math.round((owed * annualRate) / 52);
    const principal = k === weeks ? owed : part;
    owed -= principal;
    totalInterest += interest;
    events.push({
      id: `L${k}`,
      date: addDays(disburseDate, 7 * k),
      amount: -(principal + interest),
      currency,
      type: 'loan',
      description: `Loan repayment ${k} of ${weeks}`,
    });
  }

  return { events, totalInterest, totalCost: totalInterest + fee };
}

/**
 * What the scenario still owes after the forecast window. These events are left out of
 * the 13 weeks, so they are summed here and shown next to the result.
 */
export function owedAfter(events: CashEvent[], lastDate: string): number {
  return events.filter((e) => e.date > lastDate && e.amount < 0).reduce((sum, e) => sum - e.amount, 0);
}
