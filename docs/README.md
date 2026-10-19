# FlowWise — Technical Documentation Master Index
**Classification:** Enterprise Fintech Technical Specifications  
**Project Repository:** [GitHub: Vinhnt06/FlowWise](https://github.com/Vinhnt06/FlowWise)  
**Live Production Deployment:** [https://flowwise-eta.vercel.app](https://flowwise-eta.vercel.app)

---

## 📖 Technical Documentation Overview

This directory contains the authoritative technical documentation, mathematical formulations, security standards, and autonomous AI agent specifications for **FlowWise: Predictive Multi-Currency Cashflow Intelligence & 13-Week Liquidity Engine**.

FlowWise was engineered specifically for Southeast Asian cross-border e-commerce merchants operating multi-channel storefronts across **Shopee Mall**, **TikTok Shop**, and international manufacturing sources on **1688 / Taobao**.

---

## 🗂️ Documentation Directory Structure

The technical documentation is organized into four exhaustive modular specifications:

| Document | File Name | Core Contents |
| :--- | :--- | :--- |
| **01. System Architecture** | [`01_SYSTEM_ARCHITECTURE.md`](./01_SYSTEM_ARCHITECTURE.md) | Clean/Hexagonal Architecture, Presentation/Application/Domain layers, Data ingestion pipelines, Technology stack matrix, Component interaction sequence diagram. |
| **02. Core Algorithmic Specification** | [`02_CORE_ALGORITHMIC_SPECIFICATION.md`](./02_CORE_ALGORITHMIC_SPECIFICATION.md) | Mathematical proof of 13-Week Chained Conservation ($Closing[t] \equiv Opening[t+1]$), Marketplace net settlement deduction models ($T+3$ vs. $T+7$), Strict Currency Isolation proofs, 3-Lever Mitigation Simulator equations, Catmull-Rom to Cubic Bézier spline algorithms, and computational complexity benchmarks. |
| **03. Security & Data Governance** | [`03_SECURITY_AND_DATA_GOVERNANCE.md`](./03_SECURITY_AND_DATA_GOVERNANCE.md) | STRIDE Threat Modeling, Client-side Zero-Knowledge parsing boundary, PII scrubbing rules, SHA-256 cryptographic state digest for CFO sign-off, OWASP 2026 API hardening, and SBV Circular 09/2020 / GDPR compliance posture. |
| **04. AI Agent Architecture** | [`04_AI_AGENT_ARCHITECTURE.md`](./04_AI_AGENT_ARCHITECTURE.md) | Treasury Copilot AI Agent specification, Decoupled Deterministic-LLM architecture, Tool Calling schemas (`get_forecast`, `get_alerts`, `explain_week`, `run_scenario`), Autonomous Guardrails G01–G08, Zero-Hallucination verification filter, and Acceptance Test Query suite (Q1–Q7). |

---

## ⚡ Core Principles & Architectural Highlights

### 1. Pure Mathematical Determinism
Unlike conventional SaaS applications that mix business math with database mutations or stochastic AI models, FlowWise isolates all treasury math into **pure, side-effect-free TypeScript functions** located in [`lib/finance-engine.ts`](../lib/finance-engine.ts). Every calculation is reproducible, immutable, and covered by a 7-point automated verification test suite.

### 2. Strict Currency Isolation (No False Consolidation)
E-commerce merchants frequently operate under tri-currency treasury structures:
- **VND (Operations)**: Local sales revenue, domestic logistics, central warehouse leases, and staff payroll.
- **CNY (Sourcing)**: Factory manufacturing batch settlements on 1688 / Taobao.
- **USD (Growth & Logistics)**: Meta/Google/TikTok ads programmatic billing and ocean freight forwarder invoices.

FlowWise strictly enforces **orthogonal currency state spaces**: balances are never converted or summed together using arbitrary exchange rates. Each currency maintains its own 13-week conservation chain, safe buffer threshold, and deficit alerts.

### 3. Decoupled AI Copilot (Guardrails G01–G08)
The AI Agent ([`components/dashboard/FintechAiCopilot.tsx`](../components/dashboard/FintechAiCopilot.tsx)) operates strictly as a semantic orchestrator. It is barred from performing internal arithmetic or speculating on financial returns. Every number stated in an AI explanation is bound to an exact JSON tool output with source citations.

---

## 📅 Delivery Phases & Roadmap Tracking

| Phase | Doc | Goal | Spec features | Status |
| :--- | :--- | :--- | :--- | :--- |
| **0** | [`phase-0-foundation.md`](./phase-0-foundation.md) | Repo rules, skills, landing page, worked example under test | F19 (partly) | Completed |
| **1** | [`phase-1-forecast-engine.md`](./phase-1-forecast-engine.md) | `cash_event` in, 13 weeks out, two alert levels, scenarios S1–S3 | F04, F06–F12, F14 | Completed (7/7 tests verified) |
| **2** | [`phase-2-data-input.md`](./phase-2-data-input.md) | Upload, column mapping, data checks, platform presets | F01–F03, F05, F18, F19, manual form (D13) | Completed |
| **3** | [`phase-3-dashboard.md`](./phase-3-dashboard.md) | Screens M01–M08 on engine, approval, PDF sign-off | F12, F15, F16, F20 | Completed |
| **4** | [`phase-4-ai-engine.md`](./phase-4-ai-engine.md) | Assistant calling engine tools and never inventing numbers | F13, G01–G08, Q1–Q7 | Completed (FintechAiCopilot M08) |
| **5** | [`phase-5-infrastructure.md`](./phase-5-infrastructure.md) | Postgres schema, storage, auth, deploy, secrets, audit | NF01–NF11, data model sheet | Deployed on Vercel Edge |
| **6** | [`phase-6-launch.md`](./phase-6-launch.md) | End-to-end run on demo data, video, submission | Roadmap 19–20 Oct | Ready for submission |

---

## 🧪 Verification & Local Execution

Verify the entire mathematical engine and build pipelines locally using the following commands:

```bash
# 1. Run the 7-Point Automated Finance Engine Test Suite
npm run test:finance

# 2. Start the Local Next.js 16 Development Server
npm run dev

# 3. Compile the Production Turbopack Build
npm run build
```

### Automated Finance Test Scorecard (`npm run test:finance`)
- ✅ **Test 1**: Marketplace Net Payout Formula (Gross $500\text{M} \to$ Deductions $150\text{M} \to$ Net Payout $350\text{M VND}$)
- ✅ **Test 2**: 13-Week Conservation of Balance ($\forall t \in [1, 12]: Closing[t] \equiv Opening[t+1]$)
- ✅ **Test 3**: Strict Currency Isolation Enforcement (Illegal cross-currency operations blocked)
- ✅ **Test 4**: Baseline Week 2 Deficit Detection ($150\text{M} < 160\text{M} \implies 10\text{M VND Deficit}$)
- ✅ **Test 5**: Lever 1 (Accelerate Receivables) Rescue ($+49\text{M VND Net Cash In}$)
- ✅ **Test 6**: Lever 2 (Defer Payables) Rescue ($40\text{M VND Outflow Shifted}$)
- ✅ **Test 7**: Combined Multi-Lever Rescue & Action Plan ($+79\text{M VND Buffer Surplus}$)
