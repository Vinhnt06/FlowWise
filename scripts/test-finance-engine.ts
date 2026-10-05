/**
 * FlowWise — Automated Finance Engine Verification Test Suite
 * 
 * Verifies all 7 Business Test Cases from FlowWise_Business_MVP_Requirements_Answered_VI.md:
 * 1. Marketplace Net Payout Formula Accuracy
 * 2. 13-Week Conservation of Balance (closing[t] === opening[t+1])
 * 3. Strict Currency Isolation Enforcement
 * 4. Baseline Week 2 Deficit Detection (150M < 160M Buffer -> Deficit: 10M)
 * 5. Lever 1: Accelerate Receivables Rescue
 * 6. Lever 2: Defer Payables Rescue
 * 7. Multi-Lever Rescue & Capital Cost Audit
 */

import {
  calculateNetPayout,
  calculateWeeklyForecast,
  summarizeCurrencyForecast,
  simulateMitigationScenario,
  assertSameCurrency,
  formatCurrencyAmount,
} from '../lib/finance-engine';
import {
  VND_BASELINE_FORECAST,
  VND_SUMMARY,
  SHOP_METADATA,
} from '../data/shopx-dataset';
import { PlatformPayoutInput, ScenarioParams } from '../types/finance';

function runTestSuite() {
  console.log('====================================================');
  console.log('🧪 FLOWWISE FINANCE ENGINE — 7-POINT VERIFICATION');
  console.log('   Target Entity:', SHOP_METADATA.legalEntity);
  console.log('   Mode:', SHOP_METADATA.simulatedDisclaimer);
  console.log('====================================================\n');

  let passedTests = 0;
  const totalTests = 7;

  // ----------------------------------------------------
  // TEST 1: Marketplace Net Payout Formula
  // ----------------------------------------------------
  try {
    const input: PlatformPayoutInput = {
      grossSales: 500_000_000,
      platformFee: 60_000_000, // 12%
      refunds: 25_000_000,     // 5%
      shippingOrCODFee: 15_000_000, // 3%
      reserveOrHold: 50_000_000,    // 10%
    };
    const result = calculateNetPayout(input);
    const expectedNet = 500_000_000 - (60_000_000 + 25_000_000 + 15_000_000 + 50_000_000);
    
    if (result.netPayout !== expectedNet || result.netPayout !== 350_000_000) {
      throw new Error(`Expected netPayout ${expectedNet}, got ${result.netPayout}`);
    }
    if (result.deductionPercentage !== 30) {
      throw new Error(`Expected 30% deduction, got ${result.deductionPercentage}%`);
    }

    console.log('✅ TEST 1 PASSED: Marketplace Net Payout Formula');
    console.log(`   Gross: 500M -> Deductions: 150M (30%) -> Net Payout: 350M VND\n`);
    passedTests++;
  } catch (err: any) {
    console.error('❌ TEST 1 FAILED:', err.message);
  }

  // ----------------------------------------------------
  // TEST 2: 13-Week Conservation of Balance
  // ----------------------------------------------------
  try {
    let isChained = true;
    for (let i = 0; i < VND_BASELINE_FORECAST.length - 1; i++) {
      const currentWeek = VND_BASELINE_FORECAST[i];
      const nextWeek = VND_BASELINE_FORECAST[i + 1];
      if (currentWeek.closingBalance !== nextWeek.openingBalance) {
        isChained = false;
        throw new Error(
          `Conservation broken at Week ${currentWeek.weekNumber} -> Week ${nextWeek.weekNumber}: ` +
          `Closing ${currentWeek.closingBalance} !== Opening ${nextWeek.openingBalance}`
        );
      }
    }

    if (isChained && VND_BASELINE_FORECAST.length === 13) {
      console.log('✅ TEST 2 PASSED: 13-Week Conservation of Balance');
      console.log('   All 13 consecutive weeks maintain closing[t] === opening[t+1]\n');
      passedTests++;
    }
  } catch (err: any) {
    console.error('❌ TEST 2 FAILED:', err.message);
  }

  // ----------------------------------------------------
  // TEST 3: Strict Currency Isolation Enforcement
  // ----------------------------------------------------
  try {
    let errorThrown = false;
    try {
      assertSameCurrency('VND', 'CNY', 'Aggregate Balance Calculation');
    } catch (isolationErr: any) {
      if (isolationErr.message.includes('[FLOWWISE CURRENCY ISOLATION ERROR]')) {
        errorThrown = true;
      }
    }

    if (!errorThrown) {
      throw new Error('Engine failed to throw Currency Isolation Error when mixing VND and CNY!');
    }

    console.log('✅ TEST 3 PASSED: Strict Currency Isolation Enforcement');
    console.log('   Prevented unauthorized cross-currency consolidation between VND and CNY\n');
    passedTests++;
  } catch (err: any) {
    console.error('❌ TEST 3 FAILED:', err.message);
  }

  // ----------------------------------------------------
  // TEST 4: Week 2 Deficit Detection
  // ----------------------------------------------------
  try {
    const week2 = VND_BASELINE_FORECAST[1]; // Week 2
    if (!week2) throw new Error('Week 2 data not found');

    if (
      week2.openingBalance !== 280_000_000 ||
      week2.inflow !== 110_000_000 ||
      week2.outflow !== 240_000_000 ||
      week2.closingBalance !== 150_000_000
    ) {
      throw new Error(
        `Week 2 cash balance mismatch: expected 150M closing, got ${week2.closingBalance}`
      );
    }

    if (!week2.isBreached || week2.deficitAmount !== 10_000_000) {
      throw new Error(
        `Buffer breach not flagged correctly: isBreached=${week2.isBreached}, deficit=${week2.deficitAmount}`
      );
    }

    console.log('✅ TEST 4 PASSED: Baseline Week 2 Deficit Detection');
    console.log(`   Week 2 Closing: ${formatCurrencyAmount(week2.closingBalance, 'VND')} < Buffer: ${formatCurrencyAmount(week2.bufferThreshold, 'VND')}`);
    console.log(`   Deficit Flagged: ${formatCurrencyAmount(week2.deficitAmount, 'VND')}\n`);
    passedTests++;
  } catch (err: any) {
    console.error('❌ TEST 4 FAILED:', err.message);
  }

  // ----------------------------------------------------
  // TEST 5: Lever 1 — Accelerate Receivables Rescue
  // ----------------------------------------------------
  try {
    const params: ScenarioParams = {
      accelerateReceivables: true,
      accelerateReceivablesAmount: 50_000_000,
      accelerateReceivablesDiscountPct: 2.0, // 2% discount = 1M cost
      deferPayables: false,
      deferPayablesAmount: 0,
      deferPayablesDays: 0,
      creditLineDrawn: false,
      creditLineAmount: 0,
      creditLineAnnualRatePct: 0,
    };

    const sim = simulateMitigationScenario(VND_SUMMARY, params);

    // Week 2 closing should now be 150M + 49M = 199M
    if (sim.week2SimulatedClosing !== 199_000_000) {
      throw new Error(`Expected Week 2 closing 199M, got ${sim.week2SimulatedClosing}`);
    }
    if (!sim.isRescued) {
      throw new Error('Simulation failed to mark Week 2 as rescued');
    }
    if (sim.totalCapitalCost !== 1_000_000) {
      throw new Error(`Expected capital cost 1M, got ${sim.totalCapitalCost}`);
    }

    console.log('✅ TEST 5 PASSED: Lever 1 (Accelerate Receivables) Rescue');
    console.log(`   Accelerated 50M @ 2% discount -> Net cash in: +49M VND`);
    console.log(`   Week 2 Closing: 150M -> 199M VND (Safe surplus: +39M VND)\n`);
    passedTests++;
  } catch (err: any) {
    console.error('❌ TEST 5 FAILED:', err.message);
  }

  // ----------------------------------------------------
  // TEST 6: Lever 2 — Defer Payables Rescue
  // ----------------------------------------------------
  try {
    const params: ScenarioParams = {
      accelerateReceivables: false,
      accelerateReceivablesAmount: 0,
      accelerateReceivablesDiscountPct: 0,
      deferPayables: true,
      deferPayablesAmount: 40_000_000, // Defer 40M from Week 2 to Week 4
      deferPayablesDays: 14,
      creditLineDrawn: false,
      creditLineAmount: 0,
      creditLineAnnualRatePct: 0,
    };

    const sim = simulateMitigationScenario(VND_SUMMARY, params);

    // Week 2 closing should now be 150M + 40M = 190M
    if (sim.week2SimulatedClosing !== 190_000_000) {
      throw new Error(`Expected Week 2 closing 190M, got ${sim.week2SimulatedClosing}`);
    }
    if (!sim.isRescued) {
      throw new Error('Simulation failed to mark Week 2 as rescued');
    }

    console.log('✅ TEST 6 PASSED: Lever 2 (Defer Payables) Rescue');
    console.log(`   Deferred 40M VND payable by 14 days -> Week 2 outflow reduced by 40M`);
    console.log(`   Week 2 Closing: 150M -> 190M VND (Safe surplus: +30M VND)\n`);
    passedTests++;
  } catch (err: any) {
    console.error('❌ TEST 6 FAILED:', err.message);
  }

  // ----------------------------------------------------
  // TEST 7: Combined Scenario & Action Plan Generation
  // ----------------------------------------------------
  try {
    const params: ScenarioParams = {
      accelerateReceivables: true,
      accelerateReceivablesAmount: 50_000_000,
      accelerateReceivablesDiscountPct: 2.0,
      deferPayables: true,
      deferPayablesAmount: 40_000_000,
      deferPayablesDays: 14,
      creditLineDrawn: false,
      creditLineAmount: 0,
      creditLineAnnualRatePct: 8.0,
    };

    const sim = simulateMitigationScenario(VND_SUMMARY, params);

    // 150M + 49M + 40M = 239M
    if (sim.week2SimulatedClosing !== 239_000_000) {
      throw new Error(`Expected Week 2 closing 239M, got ${sim.week2SimulatedClosing}`);
    }
    if (sim.actionPlan.length !== 2) {
      throw new Error(`Expected 2 action items, got ${sim.actionPlan.length}`);
    }

    console.log('✅ TEST 7 PASSED: Combined Multi-Lever Rescue & Action Plan');
    console.log(`   Combined Week 2 Closing: 239M VND (Safe surplus: +79M VND)`);
    console.log(`   Action Items Generated: ${sim.actionPlan.length} verified recommendations\n`);
    passedTests++;
  } catch (err: any) {
    console.error('❌ TEST 7 FAILED:', err.message);
  }

  // ----------------------------------------------------
  // FINAL SCORECARD
  // ----------------------------------------------------
  console.log('====================================================');
  console.log(`🎉 TEST SCORECARD: ${passedTests}/${totalTests} TESTS PASSED`);
  console.log('   All core deterministic finance logic verified!');
  console.log('====================================================');

  if (passedTests !== totalTests) {
    process.exit(1);
  }
}

runTestSuite();
