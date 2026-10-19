# FlowWise — System Architecture Specification
**Document Version:** 1.0.0  
**Classification:** Technical Whitepaper / Architecture Design Document (ADD)  
**System Name:** FlowWise Multi-Currency Cashflow Intelligence & 13-Week Liquidity Engine  
**Target Environment:** Cross-Border E-Commerce Treasury (Shopee, TikTok Shop, 1688 OEM, Multi-Bank)

---

## 1. Executive Technical Summary

FlowWise is an institutional-grade, predictive liquidity intelligence platform tailored for cross-border e-commerce enterprises operating in Southeast Asia. The architecture addresses the structural **timing mismatch** between consumer settlement lags ($T+3$ to $T+7$ marketplace escrow) and supplier obligations (international factory batch payments in CNY, logistics and advertising overhead in USD).

The architecture is built upon four foundational pillars:
1. **Deterministic Finance Engine**: Pure mathematical execution layer with zero stochastic behavior or internal state.
2. **Absolute Currency Isolation**: Orthogonal balance conservation across non-fungible currency state spaces ($\text{VND}, \text{CNY}, \text{USD}$).
3. **Decoupled AI Copilot Agent**: An LLM-driven semantic synthesis layer operating under strict tool-calling guardrails with zero unverified numerical generation.
4. **Zero-Knowledge Client-Side Data Ingestion**: Client-boundary parsing of raw settlement spreadsheets ensuring financial telemetry privacy.

---

## 2. High-Level System Architecture (Hexagonal / Clean Architecture)

The system is architected following Clean Architecture and Hexagonal (Ports & Adapters) principles. The core business rules and financial math are completely isolated from presentation frameworks, database engines, and third-party APIs.

```
+-----------------------------------------------------------------------------------+
|                            PRESENTATION TIER (UI / UX)                           |
|  - Next.js 16 App Router (Turbopack)             - React 19 Client Components     |
|  - Financial Cockpit (Overview, Forecast, Sim)    - Treasury Copilot Drawer (M08) |
|  - High-Density Tabular Design Token System      - SVG Bézier Vector Visualizers  |
+-----------------------------------------------------------------------------------+
                                        |  (User Actions / Reactive State)
                                        v
+-----------------------------------------------------------------------------------+
|                        APPLICATION ORCHESTRATION LAYER                            |
|  - Ingestion Orchestrator (ScreenD1Upload)       - Scenario Controller (D4Sim)    |
|  - CFO Report Generator (ScreenD5ReportModal)    - Copilot Runtime (M08 Agent)   |
|  - Theme & Context Providers                     - Client Storage State Manager   |
+-----------------------------------------------------------------------------------+
                  |                                           |
                  | (Financial Commands)                      | (Tool Invocations)
                  v                                           v
+-----------------------------------+       +---------------------------------------+
|   DETERMINISTIC FINANCE ENGINE    |       |      AI COPILOT AGENT RUNTIME         |
|  (Pure Functions / Zero State)    |       |  - Semantic Query Classifier          |
|  - calculateWeeklyForecast()      |<----->|  - Guardrail Enforcer (G01-G08)       |
|  - calculateNetPayout()           |       |  - Structured Tool Registry (Q1-Q7)   |
|  - simulateMitigationScenario()   |       |  - Numeric Audit Verification Filter  |
|  - summarizeCurrencyForecast()    |       +---------------------------------------+
|  - assertSameCurrency() Guard     |
+-----------------------------------+
                  ^
                  | (Normalized Ledgers)
+-----------------------------------------------------------------------------------+
|                       DATA ADAPTER & INGESTION LAYER                              |
|  - Shopee Mall Settlement Adapter (CSV/XLSX)     - TikTok Shop Income Adapter     |
|  - 1688 OEM Commercial Invoice Adapter           - Bank Statement Ingestion       |
|  - Synthetic ShopX Dataset Generator             - Client-Side FileReader Engine  |
+-----------------------------------------------------------------------------------+
```

---

## 3. Tier-by-Tier Architectural Breakdown

### 3.1 Presentation Tier (Cockpit & Visualizations)
- **Framework**: Next.js 16.3.8 using React 19.2.8.
- **Rendering Strategy**:
  - Landing pages and marketing shell pre-rendered statically (`○ Static`).
  - Interactive Cockpit (`/dashboard`) loaded dynamically with localized state preservation.
- **Design Token Engine**:
  - Strict compliance with `DESIGN.md` (Institutional Fintech Edition).
  - Dual-mode semantic CSS custom properties: light mode (`#F8FAFC` base, `#FFFFFF` surface) and dark terminal mode (`#0B0F17` base, `#111827` surface).
  - High-precision typography utilizing Google `Geist Sans` and `Geist Mono` with OpenType typographic features (`cv02`, `cv03`, `cv04`, `cv11`, `tnum`, `zero`) for tabular alignment of financial figures.
- **Vector Graphics Layer**:
  - Custom mathematical SVG spline visualizers (`InteractiveForecastChart.tsx`, `renderSparkline()`) computing Catmull-Rom to Cubic Bézier continuous splines.
  - Zero third-party canvas bloat; native hardware-accelerated SVG paths with responsive `ResizeObserver` geometry tracking.

### 3.2 Application Orchestration Tier
- **State Architecture**: Unidirectional Data Flow (UDF).
  - Ingestion triggers normalized transaction parsing $\to$ passes normalized buckets into `lib/finance-engine.ts` $\to$ outputs immutable 13-week projections $\to$ distributes to reactive cockpit views.
- **Scenario Simulation Pipeline**:
  - Independent simulation branches: the baseline dataset is cloned deeply before applying parameter perturbations, preventing destructive mutation of historical accounting ledgers.

### 3.3 Domain Tier: Deterministic Finance Engine (`lib/finance-engine.ts`)
- **Purity Guarantee**: All engine modules are 100% pure TypeScript functions without I/O dependencies, network calls, random seeds, or shared mutable variables.
- **Testability**: Decoupled domain contracts verifiable through standalone runtime executors (`scripts/test-finance-engine.ts` via `tsx`).

### 3.4 Data Ingestion & Transformation Tier
- **Schema Mapping Engine**:
  - Maps heterogeneous platform exports into a unified `CashEvent` and `PlatformPayoutInput` schema.
  - Handles variations in fee nomenclature (e.g., Shopee *Commission Fee* vs. TikTok *Marketplace Fee*).
  - Resolves multi-currency identifiers: Vietnamese Đồng (`VND`), Chinese Yuan Renminbi (`CNY`), United States Dollar (`USD`).

---

## 4. Component Interaction Sequence

The following sequence illustrates the flow from data intake through calculation, AI explanation, and CFO approval:

```
[User / Seller]      [Ingestion Adapter]      [Finance Engine]      [AI Copilot Agent]      [CFO Sign-off]
       |                       |                      |                     |                      |
       |--- 1. Upload CSV ---->|                      |                     |                      |
       |    or Select Preset   |--- 2. Parse Lines -->|                     |                      |
       |                       |    Normalize Columns |                     |                      |
       |                       |--- 3. Compute 13W -->|                     |                      |
       |                       |    Conservation Math |                     |                      |
       |                       |<-- 4. Weekly Result -|                     |                      |
       |<-- 5. Render Cockpit -|                      |                     |                      |
       |    (Highlight W2 Gap) |                      |                     |                      |
       |                                              |                     |                      |
       |--- 6. Query "Why is Week 2 in deficit?" ---->|                     |                      |
       |                                              |--- 7. Tool Call --->|                      |
       |                                              |    explain_week(2)  |                      |
       |                                              |<-- 8. Top Drivers --|                      |
       |<-- 9. Explain Root Cause with Citations -----|                     |                      |
       |                                                                    |                      |
       |--- 10. Engage Lever 1 & Lever 2 in Simulator --------------------->|                      |
       |        (Accelerate Receivables + Defer 1688 Payables)              |                      |
       |                                                                    |--- 11. Run Sim ----->|
       |                                                                    |<-- 12. Surplus +79M -|
       |<-- 13. Update Comparison Chart (Deficit Rescued) ------------------|                      |
       |                                                                                           |
       |--- 14. Request CFO Sign-Off ------------------------------------------------------------->|
       |                                                                                           |-- 15. Hash Plan (SHA-256)
       |<-- 16. Certified PDF & Digital Approval Banner -------------------------------------------|
```

---

## 5. Technology Stack Matrix

| Layer | Technology | Version | Architectural Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime** | Node.js | `>= 20.x` | Modern ECMAScript server runtime |
| **Framework** | Next.js (App Router) | `16.3.8` | React server/client rendering and Turbopack compiler |
| **UI Library** | React | `19.2.8` | Declarative reactive UI components |
| **Language** | TypeScript | `5.x` | Strict compile-time type safety across all financial interfaces |
| **Styling** | Tailwind CSS (v4) | `4.x` | Utility-first CSS engine with inline token configuration |
| **Icons** | Lucide React | `1.52.0` | Semantic, lightweight SVG iconography |
| **Visual Effects** | Canvas Confetti | `1.9.4` | Micro-interaction celebratory effect for CFO sign-off |
| **Testing** | TSX Runtime | `4.23.15` | Fast native TypeScript execution for finance unit tests |
| **Deployment** | Vercel Serverless Edge | Global CDN | High-availability global deployment and instant invalidation |

---

## 6. Directory and Module Organization

```
FlowWise/
├── app/                              # Next.js App Router root
│   ├── globals.css                   # Design tokens, typography & CSS variables
│   ├── layout.tsx                    # Root HTML layout with Geist font injection
│   ├── page.tsx                      # Landing page with interactive hero
│   └── dashboard/
│       └── page.tsx                  # Master Dashboard view & tab router
├── components/                       # Modular UI Component Library
│   ├── charts/
│   │   └── InteractiveForecastChart.tsx # SVG 13-week Catmull-Rom spline visualizer
│   ├── common/                       # Shared aesthetic primitives (Spotlight, Tilt, Theme)
│   ├── dashboard/                    # Cockpit screen controllers
│   │   ├── DashboardHeader.tsx       # Institutional header & simulated disclaimer
│   │   ├── DashboardSidebar.tsx      # Multi-tab navigation & status indicators
│   │   ├── ScreenD1Upload.tsx        # File ingestion & manual parameter tuning
│   │   ├── ScreenD2Overview.tsx      # Tri-currency balances & deficit root cause
│   │   ├── ScreenD3Forecast.tsx      # Comprehensive 13-week detailed ledgers
│   │   ├── ScreenD4Simulator.tsx     # 3-Lever cashflow rescue cockpit
│   │   ├── ScreenD5ReportModal.tsx   # CFO audit sign-off modal
│   │   └── FintechAiCopilot.tsx      # M08 Treasury AI Copilot drawer
│   └── landing/                      # Public marketing & technical trust sections
├── data/
│   └── shopx-dataset.ts              # ShopX cosmetics multi-channel baseline dataset
├── lib/
│   └── finance-engine.ts             # Deterministic pure mathematical finance engine
├── types/
│   └── finance.ts                    # Strict TypeScript interfaces & financial schemas
├── scripts/
│   └── test-finance-engine.ts        # 7-point automated finance test suite
├── docs/                             # Institutional Technical Documentation
└── DESIGN.md                         # Authoritative Design Specification & Tokens
```
