/**
 * FlowWise — ShopX Realistic Demo Dataset
 * 
 * Business Profile:
 * "ShopX" — Fast-growing Cosmetics & Beauty brand in Vietnam.
 * Channels: Shopee (45%), TikTok Shop (35%), Wholesale/B2B (20%).
 * Sourcing: Direct from Guangzhou factories via 1688 (in CNY).
 * Cross-border Ads & Freight: Meta/TikTok ads (in USD).
 * 
 * CRITICAL MVP DEMO SCENARIO:
 * Initial VND: 280,000,000 ₫ (Buffer: 160,000,000 ₫)
 * Week 2 Liquidity Deficit:
 * - Opening: 280,000,000 ₫
 * - Inflow: 110,000,000 ₫ (Shopee 65M + TikTok 45M)
 * - Outflow: 240,000,000 ₫ (Batch inventory settlement 180M + warehouse 60M)
 * - Closing: 150,000,000 ₫
 * - Buffer: 160,000,000 ₫
 * - Deficit: 10,000,000 ₫ (BREACH!)
 */

import {
  CurrencyForecastSummary,
  WeeklyForecast,
  Transaction,
  PlatformPayoutCalculation,
} from '@/types/finance';
import {
  calculateWeeklyForecast,
  summarizeCurrencyForecast,
  calculateNetPayout,
} from '@/lib/finance-engine';

export const SHOP_METADATA = {
  name: 'ShopX Cosmetics Vietnam',
  tagline: 'Multi-Channel E-Commerce & Direct Sourcing',
  legalEntity: 'SHOPX VIETNAM TRADING CO., LTD.',
  taxId: '0318992114',
  channels: ['Shopee Mall', 'TikTok Shop', 'B2B Wholesale Distribution'],
  currencies: ['VND', 'CNY', 'USD'] as const,
  simulatedDisclaimer: 'SIMULATED DATA — FOR DEMO PURPOSES',
};

// ==========================================
// 1. RAW PLATFORM SETTLEMENT DEMO TRANSACTIONS (FOR UPLOAD WIZARD)
// ==========================================
export const MOCK_MARKETPLACE_SETTLEMENTS: PlatformPayoutCalculation[] = [
  calculateNetPayout({
    grossSales: 500_000_000,
    platformFee: 60_000_000,      // 12% platform fee
    refunds: 25_000_000,          // 5% refunds
    shippingOrCODFee: 15_000_000, // 3% shipping & COD
    reserveOrHold: 50_000_000,    // 10% 14-day escrow holdback
  }),
  calculateNetPayout({
    grossSales: 380_000_000,
    platformFee: 49_400_000,      // 13% TikTok Shop fee
    refunds: 19_000_000,          // 5% refunds
    shippingOrCODFee: 11_400_000, // 3% shipping
    reserveOrHold: 38_000_000,    // 10% escrow reserve
  }),
  calculateNetPayout({
    grossSales: 240_000_000,
    platformFee: 28_800_000,
    refunds: 7_200_000,
    shippingOrCODFee: 9_600_000,
    reserveOrHold: 24_000_000,
  }),
];

// ==========================================
// 2. 13-WEEK TIMELINE DEFINITION
// ==========================================
export const TIMELINE_WEEKS = [
  { weekNumber: 1, weekLabel: 'Week 1', startDate: '2026-10-05', endDate: '2026-10-11' },
  { weekNumber: 2, weekLabel: 'Week 2', startDate: '2026-10-12', endDate: '2026-10-18' },
  { weekNumber: 3, weekLabel: 'Week 3', startDate: '2026-10-19', endDate: '2026-10-25' },
  { weekNumber: 4, weekLabel: 'Week 4', startDate: '2026-10-26', endDate: '2026-11-01' },
  { weekNumber: 5, weekLabel: 'Week 5', startDate: '2026-11-02', endDate: '2026-11-08' },
  { weekNumber: 6, weekLabel: 'Week 6', startDate: '2026-11-09', endDate: '2026-11-15' },
  { weekNumber: 7, weekLabel: 'Week 7', startDate: '2026-11-16', endDate: '2026-11-22' },
  { weekNumber: 8, weekLabel: 'Week 8', startDate: '2026-11-23', endDate: '2026-11-29' },
  { weekNumber: 9, weekLabel: 'Week 9', startDate: '2026-11-30', endDate: '2026-12-06' },
  { weekNumber: 10, weekLabel: 'Week 10', startDate: '2026-12-07', endDate: '2026-12-13' },
  { weekNumber: 11, weekLabel: 'Week 11', startDate: '2026-12-14', endDate: '2026-12-20' },
  { weekNumber: 12, weekLabel: 'Week 12', startDate: '2026-12-21', endDate: '2026-12-27' },
  { weekNumber: 13, weekLabel: 'Week 13', startDate: '2026-12-28', endDate: '2027-01-03' },
];

// ==========================================
// 3. VND CASHFLOW BASELINE (WITH WEEK 2 BREACH)
// ==========================================
const VND_INITIAL_BALANCE = 280_000_000;
const VND_SAFE_BUFFER = 160_000_000;

const VND_WEEKLY_BUCKETS = [
  // Week 1: Normal steady state
  {
    ...TIMELINE_WEEKS[0],
    inflow: 90_000_000, // Shopee payout 55M + TikTok 35M
    outflow: 90_000_000, // Ads 30M + Warehousing 20M + Staff 40M
  },
  // Week 2: CRITICAL LIQUIDITY GAP (Deficit 10M)
  {
    ...TIMELINE_WEEKS[1],
    inflow: 110_000_000, // Shopee payout 65M + TikTok 45M
    outflow: 240_000_000, // Supplier payment batch 180M + Warehouse rental 60M
  },
  // Week 3: Rebound begins
  {
    ...TIMELINE_WEEKS[2],
    inflow: 125_000_000,
    outflow: 85_000_000,
  },
  // Week 4: Wholesale collection
  {
    ...TIMELINE_WEEKS[3],
    inflow: 140_000_000,
    outflow: 95_000_000,
  },
  // Week 5: Mid-month mega campaign
  {
    ...TIMELINE_WEEKS[4],
    inflow: 160_000_000,
    outflow: 110_000_000,
  },
  // Week 6: Steady
  {
    ...TIMELINE_WEEKS[5],
    inflow: 130_000_000,
    outflow: 90_000_000,
  },
  // Week 7: Steady
  {
    ...TIMELINE_WEEKS[6],
    inflow: 135_000_000,
    outflow: 95_000_000,
  },
  // Week 8: Black Friday prep
  {
    ...TIMELINE_WEEKS[7],
    inflow: 155_000_000,
    outflow: 120_000_000,
  },
  // Week 9: Post campaign payout
  {
    ...TIMELINE_WEEKS[8],
    inflow: 180_000_000,
    outflow: 115_000_000,
  },
  // Week 10: 12.12 Mega Sale prep
  {
    ...TIMELINE_WEEKS[9],
    inflow: 170_000_000,
    outflow: 130_000_000,
  },
  // Week 11: Mega Sale payouts arrive
  {
    ...TIMELINE_WEEKS[10],
    inflow: 210_000_000,
    outflow: 140_000_000,
  },
  // Week 12: Year-end shopping
  {
    ...TIMELINE_WEEKS[11],
    inflow: 220_000_000,
    outflow: 145_000_000,
  },
  // Week 13: Closing year
  {
    ...TIMELINE_WEEKS[12],
    inflow: 190_000_000,
    outflow: 130_000_000,
  },
];

export const VND_BASELINE_FORECAST: WeeklyForecast[] = calculateWeeklyForecast(
  VND_INITIAL_BALANCE,
  VND_SAFE_BUFFER,
  'VND',
  VND_WEEKLY_BUCKETS
);

export const VND_SUMMARY: CurrencyForecastSummary = summarizeCurrencyForecast(
  'VND',
  VND_INITIAL_BALANCE,
  VND_SAFE_BUFFER,
  VND_BASELINE_FORECAST
);

// ==========================================
// 4. CNY CHINESE YUAN SCHEDULE (FACTORY PAYABLES ON 1688)
// ==========================================
const CNY_INITIAL_BALANCE = 120_000; // ¥120,000 on hand / escrow
const CNY_SAFE_BUFFER = 40_000;

const CNY_WEEKLY_BUCKETS = TIMELINE_WEEKS.map((w, idx) => {
  if (idx === 1) {
    // Week 2: Large batch release to Guangzhou OEM
    return { ...w, inflow: 15_000, outflow: 60_000 };
  }
  if (idx === 5) {
    // Week 6: Reorder for 11.11 / 12.12
    return { ...w, inflow: 30_000, outflow: 45_000 };
  }
  return { ...w, inflow: 10_000, outflow: 8_000 };
});

export const CNY_BASELINE_FORECAST: WeeklyForecast[] = calculateWeeklyForecast(
  CNY_INITIAL_BALANCE,
  CNY_SAFE_BUFFER,
  'CNY',
  CNY_WEEKLY_BUCKETS
);

export const CNY_SUMMARY: CurrencyForecastSummary = summarizeCurrencyForecast(
  'CNY',
  CNY_INITIAL_BALANCE,
  CNY_SAFE_BUFFER,
  CNY_BASELINE_FORECAST
);

// ==========================================
// 5. USD DOLLAR SCHEDULE (LOGISTICS & META/TIKTOK ADS)
// ==========================================
const USD_INITIAL_BALANCE = 15_000; // $15,000
const USD_SAFE_BUFFER = 5_000;

const USD_WEEKLY_BUCKETS = TIMELINE_WEEKS.map((w, idx) => {
  if (idx === 1) {
    // Week 2: International ocean freight bill
    return { ...w, inflow: 2_000, outflow: 4_500 };
  }
  if (idx === 7) {
    // Week 8: Mega ads budget draw
    return { ...w, inflow: 4_000, outflow: 5_000 };
  }
  return { ...w, inflow: 1_500, outflow: 1_200 };
});

export const USD_BASELINE_FORECAST: WeeklyForecast[] = calculateWeeklyForecast(
  USD_INITIAL_BALANCE,
  USD_SAFE_BUFFER,
  'USD',
  USD_WEEKLY_BUCKETS
);

export const USD_SUMMARY: CurrencyForecastSummary = summarizeCurrencyForecast(
  'USD',
  USD_INITIAL_BALANCE,
  USD_SAFE_BUFFER,
  USD_BASELINE_FORECAST
);

// ==========================================
// 6. DEFAULT RESCUE SCENARIO PRESETS (WEEK 2 MITIGATION)
// ==========================================
export const DEFAULT_RESCUE_PRESETS = {
  // Lever 1: Accelerate wholesale receivables 50M @ 2% early cash discount
  lever1_accelerateReceivables: {
    enabled: true,
    amount: 50_000_000,
    discountPct: 2.0,
  },
  // Lever 2: Defer 1688 OEM payables by 14 days (40M)
  lever2_deferPayables: {
    enabled: true,
    amount: 40_000_000,
    days: 14,
  },
  // Lever 3: Draw emergency revolving credit line 30M @ 8% APR
  lever3_creditLine: {
    enabled: false,
    amount: 30_000_000,
    annualRatePct: 8.0,
  },
};
