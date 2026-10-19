# 🌊 FlowWise — Predictive Multi-Currency Cashflow Intelligence & 13-Week Liquidity Engine

[![FlowWise CI](https://github.com/Vinhnt06/FlowWise/actions/workflows/ci.yml/badge.svg)](https://github.com/Vinhnt06/FlowWise/actions)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live%20Production-00D4AA?logo=vercel&logoColor=black)](https://flowwise-eta.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3.8-white?logo=nextdotjs&logoColor=black)](https://nextjs.org)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> **Fintechathon 2026 Submission Dossier — Section 4: Source Code & Implementation Guide**  
> An institutional-grade, predictive 13-week liquidity forecasting engine and autonomous treasury copilot tailored for cross-border Southeast Asian e-commerce enterprises (Shopee Mall, TikTok Shop, and 1688 OEM manufacturing).

---

## 📑 Table of Contents
1. [Project Overview & Key Differentiators](#-project-overview--key-differentiators)
2. [Live Links & Repository Access](#-live-links--repository-access)
3. [System Architecture & Core Components](#-system-architecture--core-components)
4. [Deployment Guide](#-deployment-guide)
   - [Prerequisites](#prerequisites)
   - [Local Development Setup](#local-development-setup)
   - [Production Build & Verification](#production-build--verification)
   - [Docker Containerized Deployment](#docker-containerized-deployment)
   - [Vercel Edge Global Deployment](#vercel-edge-global-deployment)
5. [Automated Test Suite & Verification Matrix](#-automated-test-suite--verification-matrix)
   - [Automated Finance Engine Tests (7/7 Passed)](#1-automated-finance-engine-tests-77-passed)
   - [Specification Acceptance Tests (14/14 Passed)](#2-specification-acceptance-tests-1414-passed)
6. [Design System & UI Tokens](#-design-system--ui-tokens)
7. [Comprehensive Documentation Index](#-comprehensive-documentation-index)

---

## 💡 Project Overview & Key Differentiators

Cross-border e-commerce sellers in Southeast Asia frequently face **technical insolvency despite operating profitably on paper**. This phenomenon is driven by three structural market realities:
1. **Marketplace Settlement Delay ($T+3$ to $T+7$ Escrow Lag)**: Shopee and TikTok Shop hold settlement funds in rolling escrow buffers, delaying cash availability while suppliers demand immediate payment.
2. **Hidden Deductions Erosion**: Platform commission fees, service fees, payment processing fees, and high Cash-on-Delivery (COD) return rates can erode $15\% \sim 25\%$ of gross revenue before funds clear.
3. **Cross-Border Currency Mismatch**: Operating inflows arrive in Vietnamese Đồng ($\text{VND}$), factory manufacturing bills on 1688/Taobao require Chinese Yuan ($\text{CNY}$), and advertising/freight services bill in US Dollars ($\text{USD}$). Converting these into a single synthetic balance creates dangerous illusions of solvency.

### The FlowWise Solution
- **Strict Currency Orthogonality**: Currencies are mathematically isolated in disjoint ledgers. Zero unauthorized cross-currency consolidation.
- **Deterministic 13-Week Chained Forecast**: Pure TypeScript functional engine enforcing $\text{Closing}(t) \equiv \text{Opening}(t+1)$ with zero floating-point drift.
- **3-Lever Mitigation Simulator**: Real-time evaluation of receivables acceleration (early cash discount), vendor payables rescheduling, and revolving credit facilities to rescue cash deficits.
- **Dual-Core AI Treasury Copilot**: Read-only semantic explanation agent governed by mathematical tool calling and regex grounding verification (zero hallucinated arithmetic).
- **Zero-Knowledge Privacy Boundary**: Client-side CSV/XLSX decoding and PII scrubbing (phone numbers, buyer addresses) inside browser RAM before analysis.

---

## 🔗 Live Links & Repository Access

| Resource | URL / Access Path | Description |
| :--- | :--- | :--- |
| **GitHub Source Code Repository** | [https://github.com/Vinhnt06/FlowWise](https://github.com/Vinhnt06/FlowWise) | Authoritative public git repository containing full source code and commit history. |
| **Live Production Deployment** | [https://flowwise-eta.vercel.app](https://flowwise-eta.vercel.app) | Production environment deployed globally on Vercel Serverless Edge network. |
| **Interactive Treasury Cockpit** | [https://flowwise-eta.vercel.app/dashboard](https://flowwise-eta.vercel.app/dashboard) | Multi-currency cashflow simulator, 13-week forecast, and CFO sign-off modal. |
| **CI/CD Build Pipeline** | [GitHub Actions Workflow](https://github.com/Vinhnt06/FlowWise/actions) | Automated linting, TypeScript type checking, and unit test execution on push. |

*Disclaimer: All financial figures shown on the demo dashboard represent simulated business scenarios (`SIMULATED DATA — FOR DEMO PURPOSES`) specifically curated for competition evaluation.*

---

## 🏛️ System Architecture & Core Components

FlowWise is constructed following **Hexagonal (Ports & Adapters)** and **Domain-Driven Design (DDD)** principles:

```
FlowWise/
├── app/
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
│   ├── shopx-dataset.ts              # ShopX cosmetics multi-channel baseline dataset
│   └── worked-example.ts             # Specification worked example baseline
├── lib/
│   ├── finance-engine.ts             # Deterministic pure mathematical finance engine
│   └── scenarios.ts                  # Scenario permutation generator
├── types/
│   └── finance.ts                    # Strict TypeScript interfaces & financial schemas
├── scripts/
│   ├── test-finance-engine.ts        # 7-point automated finance test suite
│   └── test-worked-example.ts        # 14-point worked example spec test suite
└── docs/                             # Institutional Technical Documentation
```

---

## 🚀 Deployment Guide

### Prerequisites
- **Node.js**: Version `20.x` or later (LTS recommended)
- **Package Manager**: `npm` version `10.x` or later
- **Git**: Installed and authenticated

### Local Development Setup

1. **Clone the GitHub Repository:**
   ```bash
   git clone https://github.com/Vinhnt06/FlowWise.git
   cd FlowWise
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run Automated Test Suites:**
   Verify mathematical determinism prior to launching the server:
   ```bash
   # Run the 7-Point Finance Engine Test Suite
   npm run test:finance

   # Run the 14-Point Worked Example Specification Test Suite
   npm run test:spec
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

---

### Production Build & Verification

To compile and validate the optimized production build using Next.js 16 Turbopack:

```bash
# 1. Typecheck and compile the production bundle
npm run build

# 2. Launch the local production server
npm run start
```

---

### Docker Containerized Deployment

A production-grade, multi-stage Dockerfile is provided for self-hosted or cloud container environments:

```dockerfile
# Dockerfile
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run test:finance && npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

To build and run the container:
```bash
docker build -t flowwise:latest .
docker run -p 3000:3000 flowwise:latest
```

---

### Vercel Edge Global Deployment

FlowWise is pre-configured for zero-configuration, continuous deployment on the Vercel Edge Network:

1. Link the repository to your Vercel account:
   ```bash
   npx vercel link
   ```
2. Deploy to production with automated checks:
   ```bash
   npx vercel --prod --yes
   ```
The live production deployment is accessible at: **[https://flowwise-eta.vercel.app](https://flowwise-eta.vercel.app)**.

---

## 🧪 Automated Test Suite & Verification Matrix

FlowWise incorporates a **21-Point Automated Verification Suite** spanning financial mathematics, invariant preservation, edge cases, and worked example validation.

### 1. Automated Finance Engine Tests (`npm run test:finance` — 7/7 Passed)

```bash
npm run test:finance
```

| Test ID | Objective | Input Conditions | Expected Output | Status |
| :--- | :--- | :--- | :--- | :--- |
| **TEST-01** | Marketplace Net Payout Formula | Gross GMV: 500M VND, Total Deductions: 150M VND (30%) | Net Payout: 350M VND | ✅ PASSED |
| **TEST-02** | 13-Week Conservation of Balance | 13 consecutive weekly periods | $\forall t \in [1, 12]: \text{Closing}[t] \equiv \text{Opening}[t+1]$ | ✅ PASSED |
| **TEST-03** | Strict Currency Isolation Guard | Attempt cross-currency arithmetic (`VND` + `CNY`) | Throws uncatchable `FLOWWISE CURRENCY ISOLATION ERROR` | ✅ PASSED |
| **TEST-04** | Baseline Week 2 Deficit Detection | Opening: 280M, Net: -130M, Buffer: 160M VND | Closing: 150M VND < 160M Buffer $\implies$ 10M VND Deficit | ✅ PASSED |
| **TEST-05** | Lever 1 (Accelerate Receivables) | Accelerate 50M VND from W4 to W2 @ 2% discount | W2 Closing: 199M VND (Safe Surplus: +39M VND) | ✅ PASSED |
| **TEST-06** | Lever 2 (Defer Payables) | Defer 40M VND 1688 OEM payable from W2 to W4 | W2 Closing: 190M VND (Safe Surplus: +30M VND) | ✅ PASSED |
| **TEST-07** | Combined Multi-Lever Rescue | Apply Lever 1 (50M) + Lever 2 (40M) concurrently | W2 Closing: 239M VND (Safe Surplus: +79M VND) | ✅ PASSED |

---

### 2. Specification Acceptance Tests (`npm run test:spec` — 14/14 Passed)

```bash
npm run test:spec
```

| Spec Code | Test Description | Verification Condition | Status |
| :--- | :--- | :--- | :--- |
| **TC01** | Week 1 Closing Balance | Exact match with workbook worked example | ✅ PASSED |
| **TC02** | Week 2 Safety Level Breach | Flagged when closing balance falls below threshold | ✅ PASSED |
| **TC03** | Week 2 Deficit Gap Precision | Mathematical difference strictly equals buffer minus closing | ✅ PASSED |
| **TC04** | Week 4 Threshold Boundary Check | Zero alert triggered when closing balance equals safety level | ✅ PASSED |
| **TC05** | 13-Week Conservation Identity | Unbroken inter-period linkage across all reporting intervals | ✅ PASSED |
| **TC06** | Cumulative Net Flow Equation | Cumulative net cashflows equal final closing minus initial balance | ✅ PASSED |
| **TC07** | Identity Scenario Invariant | Zero-lever scenario strictly mirrors baseline | ✅ PASSED |
| **TC08** | Vendor Deferral Rescue Check | 14-day shift of bill E05 completely resolves deficit | ✅ PASSED |
| **TC25** | Hard Shortfall Classification | Negative balance triggers critical shortfall status | ✅ PASSED |
| **N4** | Currency Orthogonality Invariant | Injecting CNY bill leaves VND cashflow 100% unaltered | ✅ PASSED |
| **S1-01** | Vendor Flexibility Constraint | Only bills explicitly flagged flexible can be shifted | ✅ PASSED |
| **S2-01** | Early Receivables Discount Math | Net cash = $A \times (1-d)$, Capital cost = $A \times d$ | ✅ PASSED |
| **S3-01** | Credit Facility Amortization | Equal principal installments + weekly interest formulation | ✅ PASSED |
| **S3-02** | Horizon Overflow Accounting | Loan obligations maturing beyond Week 13 are reported | ✅ PASSED |

---

## 🎨 Design System & UI Tokens

FlowWise adheres strictly to [`DESIGN.md`](./DESIGN.md) (Institutional Swiss Grid × Ethereal Glass):
- **Typography**: Google `Geist Sans` for structural hierarchy; `Geist Mono` with tabular OpenType features (`tnum`, `zero`) for numerical alignment.
- **Color Palette**:
  - `VND (Operating Cash)`: Electric Emerald (`#00D4AA`)
  - `CNY (1688 OEM Factory)`: Signal Coral (`#FF6B35`)
  - `USD (Global Ads & Freight)`: Cobalt Electric (`#4D9FFF`)
  - `Alert (Below Buffer Threshold)`: Amber Warning (`#F59E0B`)
  - `Deficit (Hard Liquidity Breach)`: Crimson Critical (`#FF4757`)
- **No Generics**: Avoided AI generic styling (no rainbow cards, no heavy neon drop-shadows). Clean 1px borders with dark/light mode toggle.

---

## 📚 Comprehensive Documentation Index

All technical whitepapers and competition submission reports are located in the [`docs/`](./docs/) directory:

1. [`docs/01_SYSTEM_ARCHITECTURE.md`](./docs/01_SYSTEM_ARCHITECTURE.md): Hexagonal architecture, TypeScript interfaces, WebWorker data pipelines, NFRs, and edge topology.
2. [`docs/02_CORE_ALGORITHMIC_SPECIFICATION.md`](./docs/02_CORE_ALGORITHMIC_SPECIFICATION.md): Mathematical induction proofs, zero-sum reallocation theorems, FX exposure equations, and Catmull-Rom Bézier spline derivations.
3. [`docs/03_SECURITY_AND_DATA_GOVERNANCE.md`](./docs/03_SECURITY_AND_DATA_GOVERNANCE.md): STRIDE threat modeling, client-side zero-knowledge boundary, PII scrubbing, Web Crypto SHA-256 state digests, and regulatory compliance.
4. [`docs/04_AI_AGENT_ARCHITECTURE.md`](./docs/04_AI_AGENT_ARCHITECTURE.md): Decoupled dual-core architecture, tool JSON schemas, G01–G08 guardrails, regex grounding scanner, and acceptance query scenarios.
5. [`docs/05_SECURITY_SELF_ASSESSMENT_REPORT.md`](./docs/05_SECURITY_SELF_ASSESSMENT_REPORT.md): Role-based access control (RBAC Levels 1–4), known risks register (R-01 to R-10), CVSS scoring, and remediation timelines.
6. [`docs/06_EXECUTION_EVIDENCE.md`](./docs/06_EXECUTION_EVIDENCE.md): Sandbox activity logs, automated test execution transcripts, end-to-end user journey evidence, and video demo script.

---

## 👥 Authors & Acknowledgments

- **Team FlowWise**: Built with dedication for the **Fintechathon 2026** competition.
- **Repository**: [https://github.com/Vinhnt06/FlowWise](https://github.com/Vinhnt06/FlowWise)
- **Live System**: [https://flowwise-eta.vercel.app](https://flowwise-eta.vercel.app)
