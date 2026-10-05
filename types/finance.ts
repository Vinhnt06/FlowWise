/**
 * FlowWise — Core Financial Domain Types & Data Contracts
 * 
 * STRICT ARCHITECTURAL PRINCIPLE:
 * Currencies (VND, CNY, USD) must NEVER be cross-converted using arbitrary exchange rates.
 * Each currency maintains an isolated balance, independent buffer thresholds,
 * and independent forecasting curves.
 */

export type Currency = 'VND' | 'CNY' | 'USD';

export type CashflowDirection = 'INFLOW' | 'OUTFLOW';

export type TransactionCategory =
  | 'PLATFORM_PAYOUT'     // E-commerce settlement net receipts (Shopee, TikTok Shop)
  | 'B2B_WHOLESALE'       // Wholesale client receivables
  | 'SUPPLIER_PAYABLE'    // Factory orders, raw material, 1688 invoices
  | 'OPERATING_EXPENSE'   // Warehouse rent, packaging, domestic freight, payroll
  | 'FINANCING'           // Short term credit, interest, owner injection
  | 'IMPORT_DUTY';        // Customs, cross-border clearance fees

export type SalesChannel =
  | 'SHOPEE'
  | 'TIKTOK_SHOP'
  | 'LAZADA'
  | 'B2B_DISTRIBUTOR'
  | 'SUPPLIER_1688'
  | 'BANK_ACCOUNT'
  | 'MANUAL';

/**
 * Deterministic breakdown of marketplace net payout
 * Net Payout = Gross Sales - Platform Fee - Refunds - Shipping/COD Fee - Reserve/Hold
 */
export interface PlatformPayoutInput {
  grossSales: number;
  platformFee: number;
  refunds: number;
  shippingOrCODFee: number;
  reserveOrHold: number;
}

export interface PlatformPayoutCalculation extends PlatformPayoutInput {
  netPayout: number;
  totalDeductions: number;
  deductionPercentage: number;
}

export interface Transaction {
  id: string;
  date: string; // ISO YYYY-MM-DD
  weekNumber: number; // 1 to 13
  currency: Currency;
  direction: CashflowDirection;
  amount: number;
  category: TransactionCategory;
  channel: SalesChannel;
  description: string;
  payoutDetails?: PlatformPayoutInput;
  isSimulated?: boolean;
}

/**
 * 13-Week Cashflow Forecast for a single week
 */
export interface WeeklyForecast {
  weekNumber: number;
  weekLabel: string; // e.g., "Tuần 1", "Tuần 2"
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  openingBalance: number;
  inflow: number;
  outflow: number;
  netCashflow: number; // inflow - outflow
  closingBalance: number; // openingBalance + netCashflow
  bufferThreshold: number; // Minimum required operating liquidity
  isBreached: boolean; // closingBalance < bufferThreshold
  deficitAmount: number; // bufferThreshold - closingBalance if breached, else 0
  transactions: Transaction[];
}

/**
 * Complete 13-week summary for a single isolated currency
 */
export interface CurrencyForecastSummary {
  currency: Currency;
  currentBalance: number;
  safeBuffer: number;
  lowestWeek: number;
  lowestBalance: number;
  totalInflow13w: number;
  totalOutflow13w: number;
  netTotal13w: number;
  breachWeeksCount: number;
  weeks: WeeklyForecast[];
}

/**
 * Parameters for the 3-lever Scenario Simulator
 */
export interface ScenarioParams {
  // Lever 1: Accelerate Receivables (Thu sớm công nợ khách sỉ)
  accelerateReceivables: boolean;
  accelerateReceivablesAmount: number; // Amount brought forward to Week 2
  accelerateReceivablesDiscountPct: number; // Discount given (e.g. 2%)

  // Lever 2: Defer Payables (Giãn hạn thanh toán nhà cung cấp)
  deferPayables: boolean;
  deferPayablesAmount: number; // Amount deferred from Week 2
  deferPayablesDays: number; // Shifted by 14 days (+2 weeks)

  // Lever 3: Credit Line Draw (Kích hoạt hạn mức tín dụng ngắn hạn)
  creditLineDrawn: boolean;
  creditLineAmount: number; // Inflow added to Week 2
  creditLineAnnualRatePct: number; // Annual interest rate (e.g. 8%)
}

/**
 * Comparison and rescue audit result
 */
export interface ScenarioResult {
  currency: Currency;
  baseline: CurrencyForecastSummary;
  simulated: CurrencyForecastSummary;
  week2BaselineClosing: number;
  week2SimulatedClosing: number;
  week2SafeBuffer: number;
  isRescued: boolean;
  totalCapitalCost: number; // Discounts + interest paid
  netSurplusAboveBuffer: number; // simulated closing - buffer
  actionPlan: {
    title: string;
    description: string;
    impactAmount: number;
    currency: Currency;
  }[];
}
