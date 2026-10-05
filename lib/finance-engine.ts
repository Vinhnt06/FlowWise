/**
 * FlowWise — Core Deterministic Finance Engine
 * 
 * DESIGN PRINCIPLES:
 * 1. 100% Pure Functions: Zero side-effects, zero network calls, zero internal state.
 * 2. Absolute Currency Isolation: Never convert currencies. Each currency operates independently.
 * 3. Chained Conservation: closingBalance[t] === openingBalance[t+1] must strictly hold.
 * 4. Transparent Auditability: Every calculation returns intermediate steps and explanations.
 */

import {
  Currency,
  PlatformPayoutInput,
  PlatformPayoutCalculation,
  Transaction,
  WeeklyForecast,
  CurrencyForecastSummary,
  ScenarioParams,
  ScenarioResult,
} from '@/types/finance';

/**
 * Currency Isolation Guard
 * Throws an explicit error if two incompatible currencies are compared or combined.
 */
export function assertSameCurrency(
  currencyA: Currency,
  currencyB: Currency,
  operationDescription = 'Currency operation'
): void {
  if (currencyA !== currencyB) {
    throw new Error(
      `[FLOWWISE CURRENCY ISOLATION ERROR]: Cannot combine or compare ${currencyA} and ${currencyB} in "${operationDescription}". Currencies must remain strictly separate.`
    );
  }
}

/**
 * Core Marketplace Net Payout Formula
 * Net Payout = Gross Sales - Platform Fee - Refunds - Shipping/COD Fee - Reserve/Hold
 */
export function calculateNetPayout(input: PlatformPayoutInput): PlatformPayoutCalculation {
  const { grossSales, platformFee, refunds, shippingOrCODFee, reserveOrHold } = input;

  if (grossSales < 0 || platformFee < 0 || refunds < 0 || shippingOrCODFee < 0 || reserveOrHold < 0) {
    throw new Error('[FLOWWISE VALIDATION ERROR]: All payout components must be non-negative numbers.');
  }

  const totalDeductions = platformFee + refunds + shippingOrCODFee + reserveOrHold;
  const netPayout = grossSales - totalDeductions;
  const deductionPercentage = grossSales > 0 ? (totalDeductions / grossSales) * 100 : 0;

  return {
    ...input,
    netPayout,
    totalDeductions,
    deductionPercentage: Math.round(deductionPercentage * 100) / 100,
  };
}

export interface WeeklyBucketInput {
  weekNumber: number;
  weekLabel: string;
  startDate: string;
  endDate: string;
  inflow: number;
  outflow: number;
  transactions?: Transaction[];
}

/**
 * Calculate 13-Week Cashflow Forecast
 * Enforces:
 * - Week 1: opening = initialBalance
 * - Week t: opening = closing[t-1]
 * - closing = opening + inflow - outflow
 * - isBreached = closing < bufferThreshold
 */
export function calculateWeeklyForecast(
  initialBalance: number,
  bufferThreshold: number,
  currency: Currency,
  buckets: WeeklyBucketInput[]
): WeeklyForecast[] {
  if (buckets.length === 0) {
    return [];
  }

  const results: WeeklyForecast[] = [];
  let currentOpening = initialBalance;

  for (let i = 0; i < buckets.length; i++) {
    const bucket = buckets[i];
    const netCashflow = bucket.inflow - bucket.outflow;
    const closingBalance = currentOpening + netCashflow;
    const isBreached = closingBalance < bufferThreshold;
    const deficitAmount = isBreached ? bufferThreshold - closingBalance : 0;

    results.push({
      weekNumber: bucket.weekNumber,
      weekLabel: bucket.weekLabel,
      startDate: bucket.startDate,
      endDate: bucket.endDate,
      openingBalance: currentOpening,
      inflow: bucket.inflow,
      outflow: bucket.outflow,
      netCashflow,
      closingBalance,
      bufferThreshold,
      isBreached,
      deficitAmount,
      transactions: bucket.transactions || [],
    });

    // Conservation chaining: Next week's opening is this week's closing
    currentOpening = closingBalance;
  }

  return results;
}

/**
 * Build Full 13-Week Currency Summary
 */
export function summarizeCurrencyForecast(
  currency: Currency,
  initialBalance: number,
  safeBuffer: number,
  weeks: WeeklyForecast[]
): CurrencyForecastSummary {
  let lowestBalance = Infinity;
  let lowestWeek = 1;
  let breachWeeksCount = 0;
  let totalInflow13w = 0;
  let totalOutflow13w = 0;

  for (const week of weeks) {
    totalInflow13w += week.inflow;
    totalOutflow13w += week.outflow;

    if (week.closingBalance < lowestBalance) {
      lowestBalance = week.closingBalance;
      lowestWeek = week.weekNumber;
    }

    if (week.isBreached) {
      breachWeeksCount++;
    }
  }

  return {
    currency,
    currentBalance: initialBalance,
    safeBuffer,
    lowestWeek,
    lowestBalance: lowestBalance === Infinity ? initialBalance : lowestBalance,
    totalInflow13w,
    totalOutflow13w,
    netTotal13w: totalInflow13w - totalOutflow13w,
    breachWeeksCount,
    weeks,
  };
}

/**
 * 3-Lever Mitigation Scenario Simulator
 * Simulates tactical adjustments to resolve liquidity shortfalls in specific weeks (specifically Week 2)
 */
export function simulateMitigationScenario(
  baseline: CurrencyForecastSummary,
  params: ScenarioParams
): ScenarioResult {
  const { currency, safeBuffer, weeks: baselineWeeks } = baseline;

  // Clone buckets to prevent any side effects
  const simulatedBuckets: WeeklyBucketInput[] = baselineWeeks.map((w) => ({
    weekNumber: w.weekNumber,
    weekLabel: w.weekLabel,
    startDate: w.startDate,
    endDate: w.endDate,
    inflow: w.inflow,
    outflow: w.outflow,
    transactions: [...w.transactions],
  }));

  let totalCapitalCost = 0;
  const actionPlan: ScenarioResult['actionPlan'] = [];

  // Target index for Week 2 is 1 (0-indexed)
  const week2Index = 1;

  // LEVER 1: Accelerate Receivables (Thu sớm công nợ sỉ)
  if (params.accelerateReceivables && params.accelerateReceivablesAmount > 0) {
    const discountAmount =
      (params.accelerateReceivablesAmount * params.accelerateReceivablesDiscountPct) / 100;
    const netCashIn = params.accelerateReceivablesAmount - discountAmount;

    // Add to Week 2 inflow
    simulatedBuckets[week2Index].inflow += netCashIn;
    totalCapitalCost += discountAmount;

    // Deduct from Week 4 where wholesale payment would originally arrive
    if (simulatedBuckets.length > 3) {
      simulatedBuckets[3].inflow = Math.max(
        0,
        simulatedBuckets[3].inflow - params.accelerateReceivablesAmount
      );
    }

    actionPlan.push({
      title: 'Accelerate Wholesale Receivables',
      description: `Offer a ${params.accelerateReceivablesDiscountPct}% early payment discount to collect ${netCashIn.toLocaleString('en-US')} VND in Week 2 (Capital discount cost: ${discountAmount.toLocaleString('en-US')} VND).`,
      impactAmount: netCashIn,
      currency,
    });
  }

  // LEVER 2: Defer Payables (Negotiate 14-day vendor payment extension)
  if (params.deferPayables && params.deferPayablesAmount > 0) {
    const deferAmount = params.deferPayablesAmount;

    // Reduce outflow in Week 2
    simulatedBuckets[week2Index].outflow = Math.max(
      0,
      simulatedBuckets[week2Index].outflow - deferAmount
    );

    // Shift outflow to Week 4 (+14 days)
    if (simulatedBuckets.length > 3) {
      simulatedBuckets[3].outflow += deferAmount;
    }

    actionPlan.push({
      title: 'Negotiate 14-Day Supplier Deferral',
      description: `Extend payment terms on ${deferAmount.toLocaleString('en-US')} VND with 1688 OEM vendor into Week 4 with zero penalty interest.`,
      impactAmount: deferAmount,
      currency,
    });
  }

  // LEVER 3: Credit Line Draw (Draw revolving overdraft credit line)
  if (params.creditLineDrawn && params.creditLineAmount > 0) {
    const drawnAmount = params.creditLineAmount;
    // Monthly interest: (annualRate / 12) * drawnAmount
    const monthlyInterest = Math.round(
      (params.creditLineAnnualRatePct / 100 / 12) * drawnAmount
    );

    // Inflow in Week 2
    simulatedBuckets[week2Index].inflow += drawnAmount;
    totalCapitalCost += monthlyInterest;

    // Interest paid in Week 6
    if (simulatedBuckets.length > 5) {
      simulatedBuckets[5].outflow += monthlyInterest;
    }

    actionPlan.push({
      title: 'Draw Emergency Credit Facility',
      description: `Draw down ${drawnAmount.toLocaleString('en-US')} VND from short-term bank credit facility at ${params.creditLineAnnualRatePct}% APR (Estimated interest: ${monthlyInterest.toLocaleString('en-US')} VND/month).`,
      impactAmount: drawnAmount,
      currency,
    });
  }

  // Recalculate 13-week trajectory with chained conservation
  const simulatedWeeks = calculateWeeklyForecast(
    baseline.currentBalance,
    safeBuffer,
    currency,
    simulatedBuckets
  );

  const simulatedSummary = summarizeCurrencyForecast(
    currency,
    baseline.currentBalance,
    safeBuffer,
    simulatedWeeks
  );

  const week2BaselineClosing = baselineWeeks[week2Index]?.closingBalance ?? 0;
  const week2SimulatedClosing = simulatedWeeks[week2Index]?.closingBalance ?? 0;
  const isRescued = week2SimulatedClosing >= safeBuffer;
  const netSurplusAboveBuffer = week2SimulatedClosing - safeBuffer;

  return {
    currency,
    baseline,
    simulated: simulatedSummary,
    week2BaselineClosing,
    week2SimulatedClosing,
    week2SafeBuffer: safeBuffer,
    isRescued,
    totalCapitalCost,
    netSurplusAboveBuffer,
    actionPlan,
  };
}

/**
 * Format currency amounts in standard Vietnamese locale
 */
export function formatCurrencyAmount(amount: number, currency: Currency): string {
  switch (currency) {
    case 'VND':
      return `${Math.round(amount).toLocaleString('vi-VN')} ₫`;
    case 'CNY':
      return `¥${amount.toLocaleString('zh-CN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    case 'USD':
      return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  }
}
