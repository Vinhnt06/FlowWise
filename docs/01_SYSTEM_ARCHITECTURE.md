# FlowWise — System Architecture Specification
**Document Version:** 2.0.0  
**Classification:** Technical Whitepaper / Architecture Design Document (ADD)  
**System Name:** FlowWise Multi-Currency Cashflow Intelligence & 13-Week Liquidity Engine  
**Target Environment:** Cross-Border E-Commerce Treasury (Shopee, TikTok Shop, 1688 OEM, Multi-Bank)  
**Security Tier:** Zero-Knowledge Client-Side Core with Institutional RBAC Readiness

---

## 1. Executive Technical Summary

FlowWise is an enterprise-grade predictive liquidity intelligence platform purpose-built for cross-border e-commerce merchants operating in Southeast Asia. The architecture addresses the structural **timing mismatch** between consumer marketplace settlements ($T+3$ to $T+7$ escrow holdbacks on Shopee and TikTok Shop) and immediate supplier liabilities (international factory batch payments in Chinese Yuan [CNY], global logistics, and programmatic digital advertising in United States Dollars [USD]).

### 1.1 Core Architectural Principles
1. **Mathematical Determinism**: Pure functional core with zero stochastic behavior, zero floating-point rounding drift, and zero hidden mutable state.
2. **Strict Currency Orthogonality**: Disjoint state spaces for Vietnamese Đồng ($\text{VND}$), Chinese Yuan ($\text{CNY}$), and US Dollars ($\text{USD}$). Cross-currency arithmetic without explicit spot contracts is strictly banned at both compile-time and runtime.
3. **Decoupled AI Copilot (Dual-Core Architecture)**: An LLM-powered natural language reasoning layer operating strictly as a read-only consumer of deterministic engine tools, governed by automated numerical audit filters (zero ungrounded arithmetic).
4. **Zero-Knowledge Client-Side Data Ingestion**: Client-boundary parsing of raw settlement spreadsheets and bank exports, ensuring confidential commercial telemetry never leaves the merchant's browser session without explicit end-to-end cryptographic hashing.

---

## 2. High-Level Architectural Pattern: Hexagonal (Ports & Adapters)

FlowWise is structured following the **Hexagonal Architecture** (Alistair Cockburn) and **Domain-Driven Design (DDD)** paradigms. The business domain (13-week balance conservation, platform payout deduction rules, and 3-lever mitigation math) is strictly decoupled from presentation frameworks, persistence mechanisms, and external APIs.

```
+---------------------------------------------------------------------------------------------------+
|                                     INFRASTRUCTURE LAYER (OUTSIDE)                                |
|                                                                                                   |
|  [HTTP / CDN]                [File Storage / Ingestion]           [Browser Engine]                |
|  - Vercel Serverless Edge    - Shopee Settlement CSV/XLSX         - Web Workers (Multi-threaded)  |
|  - Cloudflare Anycast CDN    - TikTok Shop Income CSV             - IndexedDB / LocalStorage Enc  |
|  - CSP Level 3 / HSTS Guard  - 1688 Commercial Invoices (CNY)     - Web Crypto API (SHA-256)      |
+---------------------------------------------------------------------------------------------------+
                                         |                   ^
                                         | (Inbound Adapters)| (Outbound Ports)
                                         v                   |
+---------------------------------------------------------------------------------------------------+
|                                  APPLICATION ORCHESTRATION LAYER                                  |
|                                                                                                   |
|  [Use Cases / Coordinators]                                                                       |
|  - IngestionPipelineCoordinator: Decodes, scrubs, validates, and normalizes tabular streams.      |
|  - ScenarioSimulationCoordinator: Clones baseline ledgers and manages 3-lever mitigation trees.   |
|  - TreasuryCopilotAgentRuntime: Resolves semantic user queries via structured tool dispatch.     |
|  - CFOAuditSignOffCoordinator: Generates cryptographic state digests and verifiable PDF reports.   |
+---------------------------------------------------------------------------------------------------+
                                         |                   ^
                                         | (Commands)        | (Read Models)
                                         v                   |
+---------------------------------------------------------------------------------------------------+
|                                   HEXAGONAL CORE (DOMAIN LAYER)                                   |
|                                                                                                   |
|  [Domain Entities & Value Objects]           [Domain Services (Pure Functions)]                  |
|  - Currency (VND, CNY, USD)                  - calculateWeeklyForecast()                          |
|  - CashEvent (Dated Ledger Entry)             - calculateNetPayout()                               |
|  - WeeklyBucket (7-Day Aggregation)          - simulateMitigationScenario()                       |
|  - LiquidityThreshold (Safe Buffer)          - assertSameCurrency() Runtime Guard                 |
|  - MitigationLevers (L1, L2, L3)             - computeTopDeficitDrivers()                         |
|                                                                                                   |
|  [Domain Invariants]                                                                              |
|  - Invariant I-1: Chained Balance Conservation: Opening(t+1) == Closing(t)                       |
|  - Invariant I-2: Strict Currency Disjointness: S_VND ∩ S_CNY ∩ S_USD = ∅                         |
|  - Invariant I-3: Zero Unaccounted Capital Leakage in Lever Transformations                        |
+---------------------------------------------------------------------------------------------------+
```

---

## 3. Detailed Component Contracts & TypeScript Interfaces

The system enforces strict type boundaries across all hexagonal layers. Below are the formal interface definitions residing in `types/finance.ts` and `lib/finance-engine.ts`.

### 3.1 Domain Types and Invariants

```typescript
/** Supported Non-Fungible Treasury Currencies */
export type Currency = 'VND' | 'CNY' | 'USD';

/** Cash Flow Direction */
export type FlowType = 'INFLOW' | 'OUTFLOW';

/** Cash Event Category Taxonomy */
export type CashCategory =
  | 'PLATFORM_SETTLEMENT'  // Shopee, TikTok Shop, Lazada net payouts
  | 'FACTORY_ORDER_CNY'    // 1688 OEM manufacturing batch milestones
  | 'LOGISTICS_SHIPPING'   // Ocean freight, international forwarding, domestic 3PL
  | 'AD_SPEND_MARKETING'   // Meta Ads, TikTok Ads, Shopee Ads
  | 'PAYROLL_OVERHEAD'     // Salaries, social security, warehouse labor
  | 'COMMERCIAL_RENT'      // Fulfillment center and office leases
  | 'TAX_REGULATORY'       // VAT, cross-border withholding tax
  | 'FINANCING_CAPITAL'    // Credit lines, equity injections, debt service
  | 'OTHER_EXPENSE';

/** Atomic Financial Transaction Event */
export interface CashEvent {
  readonly id: string;
  readonly date: string; // ISO 8601 (YYYY-MM-DD)
  readonly description: string;
  readonly amount: number; // Positive float
  readonly currency: Currency;
  readonly type: FlowType;
  readonly category: CashCategory;
  readonly source: 'SHOPEE' | 'TIKTOK' | '1688' | 'BANK' | 'MANUAL';
  readonly isProjected: boolean;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

/** Normalized 7-Day Accounting Interval Bucket */
export interface WeeklyBucketInput {
  readonly weekNumber: number; // 1 to 13
  readonly weekLabel: string;  // e.g., "Week 1 (Oct 21 - Oct 27)"
  readonly startDate: string;  // YYYY-MM-DD
  readonly endDate: string;    // YYYY-MM-DD
  readonly inflow: number;     // Sum of all validated inflows in bucket
  readonly outflow: number;    // Sum of all validated outflows in bucket
  readonly transactions?: readonly CashEvent[];
}

/** Fully Computed Forecast Period Model */
export interface WeeklyForecast {
  readonly weekNumber: number;
  readonly weekLabel: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly openingBalance: number;
  readonly inflow: number;
  readonly outflow: number;
  readonly netCashflow: number;
  readonly closingBalance: number;
  readonly bufferThreshold: number;
  readonly isBreached: boolean;
  readonly deficitAmount: number;
  readonly transactions: readonly CashEvent[];
}
```

### 3.2 Port Interfaces (Ports & Adapters)

```typescript
/**
 * Inbound Port: Normalizes raw heterogeneous CSV/XLSX feeds into canonical CashEvents.
 */
export interface IMarketplaceAdapter {
  readonly platformId: 'SHOPEE' | 'TIKTOK' | '1688' | 'BANK_STATEMENT';
  canParse(headerRow: readonly string[]): boolean;
  parseAndNormalize(rawCsvData: string): Promise<readonly CashEvent[]>;
}

/**
 * Inbound Port: Executes pure financial calculations over 13-week vectors.
 */
export interface IFinanceEnginePort {
  calculateWeeklyForecast(
    initialBalance: number,
    bufferThreshold: number,
    currency: Currency,
    buckets: readonly WeeklyBucketInput[]
  ): readonly WeeklyForecast[];

  calculateNetPayout(input: PlatformPayoutInput): NetPayoutResult;

  simulateMitigationScenario(
    baselineForecast: readonly WeeklyForecast[],
    initialBalance: number,
    bufferThreshold: number,
    currency: Currency,
    levers: MitigationLevers
  ): MitigationScenarioResult;
}

/**
 * Outbound Port: Cryptographic audit logging and persistent storage bridge.
 */
export interface IAuditPersistencePort {
  computeStateDigest(state: AuditStateTuple): Promise<string>;
  saveBaselineSnapshot(snapshot: EncryptedTreasurySnapshot): Promise<void>;
  loadActiveSnapshot(): Promise<EncryptedTreasurySnapshot | null>;
}
```

---

## 4. End-to-End Ingestion Pipeline Architecture

```
[Raw File: CSV / XLSX]
         |
         v
+-----------------------------------------------------------------------------------+
| STEP 1: Client-Side Boundary Gate (Web FileReader API)                            |
| - Zero network transit: file bytes decoded strictly inside browser RAM            |
| - MIME & Magic Byte sniffing: rejects non-RFC 4180 / non-OpenXML streams          |
+-----------------------------------------------------------------------------------+
         |
         v
+-----------------------------------------------------------------------------------+
| STEP 2: PII Redaction & Column Fuzzy Matching Engine                              |
| - Scrub phone numbers, buyer delivery addresses, and personal bank accounts       |
| - Levenshtein distance header matcher (matches "Số tiền", "Gross Amount", etc.)   |
+-----------------------------------------------------------------------------------+
         |
         v
+-----------------------------------------------------------------------------------+
| STEP 3: Transaction Normalization & Calendar Discretization                       |
| - Order Date to Settlement Date conversion (+3d Shopee, +7d TikTok Shop)          |
| - Escrow holdback segregation (10% 14-day rolling buffer reserve)                 |
| - Currency tagging (VND, CNY, USD) & partition into 13 discrete 7-day buckets     |
+-----------------------------------------------------------------------------------+
         |
         v
+-----------------------------------------------------------------------------------+
| STEP 4: Deterministic Financial Engine Execution                                  |
| - Chained conservation math: Opening(t+1) = Closing(t)                            |
| - Deficit buffer evaluation (Breached if Closing < BufferThreshold)               |
+-----------------------------------------------------------------------------------+
         |
         v
+-----------------------------------------------------------------------------------+
| STEP 5: Reactive UI Dissemination & AI Tool Context Cache                         |
| - SVG Catmull-Rom spline curves update at 60 FPS                                  |
| - In-memory forecast cache populated for AI Copilot Tooling (G01 Guardrail)       |
+-----------------------------------------------------------------------------------+
```

---

## 5. WebWorker Multi-Threaded Execution Model

For multi-store enterprise operations handling $> 100,000$ order records across multiple marketplace channels, synchronous parsing on the browser main thread would induce UI frame drops (violating Core Web Vitals **INP** requirements). FlowWise incorporates a dedicated WebWorker pool:

```typescript
// worker/finance-calculator.worker.ts
import { calculateWeeklyForecast, simulateMitigationScenario } from '@/lib/finance-engine';

self.onmessage = (event: MessageEvent<WorkerPayload>) => {
  const { type, payload, taskId } = event.data;

  try {
    switch (type) {
      case 'CALCULATE_13W_FORECAST': {
        const result = calculateWeeklyForecast(
          payload.initialBalance,
          payload.bufferThreshold,
          payload.currency,
          payload.buckets
        );
        self.postMessage({ taskId, status: 'SUCCESS', result });
        break;
      }
      case 'SIMULATE_LEVERS': {
        const result = simulateMitigationScenario(
          payload.baselineForecast,
          payload.initialBalance,
          payload.bufferThreshold,
          payload.currency,
          payload.levers
        );
        self.postMessage({ taskId, status: 'SUCCESS', result });
        break;
      }
      default:
        throw new Error(`Unsupported worker task: ${type}`);
    }
  } catch (error: any) {
    self.postMessage({ taskId, status: 'ERROR', error: error.message });
  }
};
```

---

## 6. System Non-Functional Requirements (NFR) & Performance Benchmarks

### 6.1 Latency Budgets & Target SLA
All operations are subjected to strict telemetry monitoring:

| Action / Operation | Benchmark Target (P50) | Upper Bound (P99) | Architectural Strategy |
| :--- | :--- | :--- | :--- |
| **Initial Dashboard Cold Load** | $< 450\text{ ms}$ | $< 800\text{ ms}$ | Next.js 16 Turbopack, static shell pre-rendering, modern asset compression |
| **13-Week Recalculation (100k rows)**| $< 15\text{ ms}$ | $< 35\text{ ms}$ | Dedicated WebWorker execution, contiguous flat typed memory structures |
| **Simulator Slider Scrub** | $< 2\text{ ms}$ | $< 5\text{ ms}$ | In-memory pure function execution, direct SVG path DOM manipulation |
| **AI Copilot Query Latency** | $< 500\text{ ms}$ | $< 1200\text{ ms}$ | Pre-filtered context injection ($< 2,350$ tokens), edge streaming inference |
| **CFO SHA-256 Digest Generation** | $< 1\text{ ms}$ | $< 3\text{ ms}$ | Web Crypto API hardware-accelerated SHA-256 primitive |

### 6.2 Browser Resource Allocation
- **Peak Client Heap Memory**: $\le 35\text{ MB}$ during active parsing of 100,000 transactions.
- **Zero Memory Leaks**: All `FileReader` stream pointers and `ResizeObserver` subscriptions are cleanly garbage-collected on component unmount.
- **Frame Rate Target**: Steady $60.0\text{ FPS}$ during 13-week chart pan, tooltip hover, and scenario comparison cross-fades.

### 6.3 Core Web Vitals (CWV) Compliance
- **Largest Contentful Paint (LCP)**: $\le 0.72\text{ s}$ (Target $\le 2.5\text{ s}$).
- **Interaction to Next Paint (INP)**: $\le 28\text{ ms}$ (Target $\le 200\text{ ms}$).
- **Cumulative Layout Shift (CLS)**: $0.000$ (Target $\le 0.10$).

---

## 7. High-Availability Global Edge Deployment Architecture

FlowWise is deployed globally using Vercel Serverless Edge infrastructure integrated with modern edge security routing:

```
[Global User Requests]
          |
          v
+-----------------------------------------------------------------------------------+
| ANYCAST EDGE NETWORK (Vercel Edge Network / Cloudflare Global PoPs)               |
| - TLS 1.3 Termination & Automated HTTP/3 Negotiation                              |
| - DDoS Layer 7 Mitigation & Geo-Routing to nearest Edge PoP (Singapore / Tokyo)   |
+-----------------------------------------------------------------------------------+
          |
    +-----+-----+
    |           |
    v           v
[Edge Cache]  [Static Asset CDN]
- Immutable   - Next.js Turbopack JS/CSS Bundles
  Stale-While - Web Fonts (Geist Sans, Geist Mono)
  Revalidate  - Pre-rendered Marketing Pages
    |
    v
[Next.js App Server Runtime]
- Zero server state: all financial modeling executes on the client device
- AI Proxy Route: `/api/copilot` (Secure token authentication & rate limiting)
```

---

## 8. Failure Modes & Graceful Degradation Strategy

| Failure Scenario | Impact | System Reaction & Recovery Protocol |
| :--- | :--- | :--- |
| **Corrupt / Non-Standard CSV Upload** | Raw file cannot be mapped | System catches exception at Step 2; halts pipeline without state corruption; highlights invalid column row in red; falls back to last valid state. |
| **AI Gateway Timeout / Rate Limit** | AI Copilot drawer unresponsive | System falls back to local deterministic rule-based explainers (`lib/finance-engine.ts` top deficit driver generator); notifies user with non-blocking toast. |
| **Local Storage Quota Exceeded** | Browser storage denied | Transparent fallback to volatile in-memory state; warns merchant that browser refresh will reset uncommitted scenario sliders. |
| **Cross-Currency Arithmetic Attempt** | Developer or script bug | `assertSameCurrency` throws hard runtime exception; React Error Boundary intercepts crash; presents clean bug report without data corruption. |
