# FlowWise — AI Agent Architecture & Treasury Copilot Specification
**Document Version:** 2.0.0 (Deep Technical Specification)  
**Classification:** Autonomous Financial Agent Specification  
**Component Reference:** `components/dashboard/FintechAiCopilot.tsx`, Workbook Spec `FlowWise1.xlsx` (Sheet `AI`)  
**Safety & Regulatory Standards:** OWASP Top 10 for LLM Applications (2025/2026), Guardrails G01–G08

---

## 1. Architectural Philosophy: The Decoupled Deterministic Agent

Large Language Models (LLMs) excel at natural language comprehension, semantic synthesis, and context contextualization. However, when applied to corporate treasury management, standard generative LLMs introduce critical vulnerabilities:
1. **Numerical Hallucination**: Stochastic approximation of floating-point arithmetic.
2. **Unverifiable Inferences**: Stating balances or deficits without demonstrable accounting lineage.
3. **Regulatory Non-Compliance**: Providing speculative or legally binding financial advice without an institutional license.

FlowWise eliminates these risks through a **Strict Decoupled Architecture**:
- **Execution Domain**: The TypeScript Deterministic Finance Engine (`lib/finance-engine.ts`) retains exclusive mathematical authority. All conservation identities, settlement deductions, and debt servicing math are calculated through pure functions.
- **Cognitive Domain**: The Treasury Copilot AI Agent acts strictly as a **Semantic Orchestrator**. It translates natural language user queries into structured tool invocations, validates constraints, extracts verified figures from engine output, and synthesizes clear, executive-grade explanations with verifiable citations.

```
+-----------------------------------------------------------------------------------+
|                        FLOWWISE AI AGENT RUNTIME PIPELINE                         |
|                                                                                   |
|  [Merchant Question / Prompt]                                                     |
|  "Why is Week 2 in deficit and what happens if we negotiate a vendor deferral?"   |
|                                     |                                             |
|                                     v                                             |
|  +-----------------------------------------------------------------------------+  |
|  | Phase 1: Semantic Intent Classifier & Parameter Extractor                   |  |
|  | - Detected Intents: [EXPLAIN_DEFICIT, SIMULATE_LEVER_2]                     |  |
|  | - Target Currency: VND (Normalized)                                         |  |
|  | - Target Week: 2                                                            |  |
|  +-----------------------------------------------------------------------------+  |
|                                     |                                             |
|                                     v                                             |
|  +-----------------------------------------------------------------------------+  |
|  | Phase 2: Autonomous Pre-Execution Guardrails (G01–G08)                       |  |
|  | - G03: Parameter Completeness Assertion (PASS)                              |  |
|  | - G04: Anti-Speculation & Investment Shield (PASS)                          |  |
|  | - G05: PII Boundary Validation (PASS - zero raw order lines in prompt)       |  |
|  +-----------------------------------------------------------------------------+  |
|                                     |                                             |
|                                     v                                             |
|  +-----------------------------------------------------------------------------+  |
|  | Phase 3: Deterministic Tool Calling Bus                                     |  |
|  | Tool 1: explain_week(currency="VND", weekNumber=2)                           |  |
|  | Tool 2: run_scenario(currency="VND", deferPayables={amount: 40M, days: 14}) |  |
|  +-----------------------------------------------------------------------------+  |
|                                     |                                             |
|                                     v (Structured JSON Tool Output)               |
|  +-----------------------------------------------------------------------------+  |
|  | Phase 4: Grounded Semantic Synthesis with Exact Citations                   |  |
|  | - Interpolates exact numerical values from Tool Output                      |  |
|  | - Binds citations: [shopx-dataset.ts:L102-107], [Invoice #1688-GZ]          |  |
|  +-----------------------------------------------------------------------------+  |
|                                     |                                             |
|                                     v                                             |
|  +-----------------------------------------------------------------------------+  |
|  | Phase 5: Post-Generation Numeric Audit Filter                                |  |
|  | - Scans synthesized text via regex: extracts all numbers                   |  |
|  | - Asserts EVERY number is present in the Tool Output Context               |  |
|  | - Halts and alerts if unverified number detected (Zero Hallucination)       |  |
|  +-----------------------------------------------------------------------------+  |
|                                     |                                             |
|                                     v                                             |
|  [Rendered Executive Response with Direct Action Call-To-Action]                 |
+-----------------------------------------------------------------------------------+
```

---

## 2. Formal Tool Calling Schemas (JSON Schema & TypeScript Interfaces)

The agent interacts with the underlying treasury core through six formally declared tools:

### 2.1 `get_forecast`
```json
{
  "name": "get_forecast",
  "description": "Retrieves the full 13-week chained liquidity forecast for an isolated currency book.",
  "parameters": {
    "type": "object",
    "properties": {
      "currency": {
        "type": "string",
        "enum": ["VND", "CNY", "USD"],
        "description": "The isolated currency to forecast."
      },
      "run_id": {
        "type": "string",
        "description": "Optional simulation run ID. Defaults to baseline."
      }
    },
    "required": ["currency"]
  }
}
```

```typescript
export interface GetForecastOutput {
  currency: 'VND' | 'CNY' | 'USD';
  currentBalance: number;
  safeBuffer: number;
  lowestWeek: number;
  lowestBalance: number;
  totalInflow13w: number;
  totalOutflow13w: number;
  netTotal13w: number;
  breachWeeksCount: number;
  weeks: Array<{
    weekNumber: number;
    weekLabel: string;
    startDate: string;
    endDate: string;
    openingBalance: number;
    inflow: number;
    outflow: number;
    netCashflow: number;
    closingBalance: number;
    bufferThreshold: number;
    isBreached: boolean;
    deficitAmount: number;
  }>;
}
```

### 2.2 `get_alerts`
```json
{
  "name": "get_alerts",
  "description": "Scans for liquidity buffer breaches, shortfalls, and earliest risk weeks across all currency books.",
  "parameters": {
    "type": "object",
    "properties": {
      "currency": {
        "type": "string",
        "enum": ["VND", "CNY", "USD"]
      }
    },
    "required": ["currency"]
  }
}
```

```typescript
export interface GetAlertsOutput {
  currency: string;
  hasDeficit: boolean;
  firstRiskWeek: number | null;
  deficitAmount: number;
  status: 'BUFFER_OK' | 'BELOW_BUFFER' | 'CRITICAL_SHORTFALL';
  driversSummary: string[];
}
```

### 2.3 `explain_week`
```json
{
  "name": "explain_week",
  "description": "Decomposes the exact financial drivers of cash inflow, outflow, and buffer breaches for a specific week.",
  "parameters": {
    "type": "object",
    "properties": {
      "currency": { "type": "string", "enum": ["VND", "CNY", "USD"] },
      "weekNumber": { "type": "integer", "minimum": 1, "maximum": 13 }
    },
    "required": ["currency", "weekNumber"]
  }
}
```

```typescript
export interface ExplainWeekOutput {
  currency: string;
  weekNumber: number;
  weekLabel: string;
  openingBalance: number;
  closingBalance: number;
  netCashflow: number;
  isBreached: boolean;
  deficitAmount: number;
  topOutflowDrivers: Array<{
    title: string;
    amount: number;
    percentageOfOutflow: number;
    source: string;
    isReschedulable: boolean;
  }>;
  escrowHeldAmount: number;
  settlementLagDays: number;
}
```

### 2.4 `run_scenario`
```json
{
  "name": "run_scenario",
  "description": "Executes the 3-lever mitigation scenario simulator to resolve cash deficits and project capital cost.",
  "parameters": {
    "type": "object",
    "properties": {
      "currency": { "type": "string", "enum": ["VND", "CNY", "USD"] },
      "accelerateReceivables": {
        "type": "object",
        "properties": {
          "enabled": { "type": "boolean" },
          "amount": { "type": "number" },
          "discountPct": { "type": "number" }
        }
      },
      "deferPayables": {
        "type": "object",
        "properties": {
          "enabled": { "type": "boolean" },
          "amount": { "type": "number" },
          "days": { "type": "integer" }
        }
      },
      "creditLine": {
        "type": "object",
        "properties": {
          "enabled": { "type": "boolean" },
          "amount": { "type": "number" },
          "annualRatePct": { "type": "number" }
        }
      }
    },
    "required": ["currency"]
  }
}
```

---

## 3. Autonomous Guardrail System (G01–G08 Technical Implementation)

The AI Copilot Agent is governed by eight deterministic guardrails defined in the FlowWise Specification:

```
               [AGENT RESPONSE CANDIDATE]
                           |
                           v
       +---------------------------------------+
       | Guardrail G01: Numeric Audit Scanner  | ---> FAIL? [Aborted: Unverified Number]
       +---------------------------------------+
                           | PASS
                           v
       +---------------------------------------+
       | Guardrail G02: Arithmetic Interceptor | ---> FAIL? [Aborted: Internal Math Banned]
       +---------------------------------------+
                           | PASS
                           v
       +---------------------------------------+
       | Guardrail G04: Anti-Speculation Check | ---> FAIL? [Redirected: Standard Disclaimer]
       +---------------------------------------+
                           | PASS
                           v
       +---------------------------------------+
       | Guardrail G06: Assumption Injector    | ---> (Appends Safe Buffer & Lag Footnote)
       +---------------------------------------+
                           |
                           v
             [VERIFIED AUDITABLE OUTPUT]
```

### 3.1 Guardrail G01 & G02: Zero-Hallucination & Arithmetic Prohibition Implementation
The runtime executes a post-generation verification pass using an automated numeric audit filter:

```typescript
/**
 * Guardrail G01 Implementation: Post-Generation Numeric Verification
 * Asserts every numeric token in the synthesized response exists in tool output context.
 */
export function verifyResponseGrounding(
  agentResponseText: string,
  verifiedToolContextNumbers: number[]
): { isGrounded: boolean; unverifiedNumbers: string[] } {
  // Extract all numeric tokens (including formatted currency: 150M, 150,000,000, 10M, etc.)
  const numericTokenRegex = /\b(\d{1,3}(,\d{3})+|\d+(\.\d+)?)(M|k|B)?\b/gi;
  const matches = agentResponseText.match(numericTokenRegex) || [];
  const unverified: string[] = [];

  for (const match of matches) {
    let normalizedVal = parseFloat(match.replace(/,/g, ''));
    if (/M$/i.test(match)) normalizedVal = parseFloat(match) * 1_000_000;
    if (/k$/i.test(match)) normalizedVal = parseFloat(match) * 1_000;

    // Check if number exists in verified numerical context (with 1% rounding tolerance)
    const exists = verifiedToolContextNumbers.some(
      ctxNum => Math.abs(ctxNum - normalizedVal) / (ctxNum || 1) < 0.01
    );

    if (!exists) {
      unverified.push(match);
    }
  }

  return {
    isGrounded: unverified.length === 0,
    unverifiedNumbers: unverified,
  };
}
```

### 3.2 Guardrail G03: Socratic Clarification Gate
If the user provides an ambiguous question (e.g., *"How much money will I have next month?"*), the agent is prohibited from assuming parameters. It halts execution and presents a structured Socratic inquiry:
- Prompt: *"To audit your cash position next month, please specify: (1) Which currency ledger (VND, CNY, or USD)? (2) Which specific 7-day week interval (Week 4, 5, or 6)?"*

### 3.3 Guardrail G04: Regulatory Compliance Shield
The agent intercepts queries concerning high-yield investment options or loan guarantees. It strictly enforces Decision D01:
- Prohibited: *"You should invest 50M in corporate bonds or Money Market Fund X."*
- Mandatory Template: *"Under FlowWise corporate treasury policies (Decision D01), I cannot recommend specific investment securities. Surplus liquidity should be evaluated against: (1) Prepaying 1688 OEM vendor payables for early cash discounts, (2) Expanding safety buffer reserves for Q4 peak inventory, or (3) Reducing revolving credit exposure."*

### 3.4 Guardrail G05: Data Minimization & PII Scrubbing
The agent prompt context NEVER receives buyer addresses, personal names, credit card tokens, or tax registration credentials. Only normalized integer sums and sanitized category keys are included in context.

### 3.5 Guardrail G06: Mandatory Assumption Disclosure
Every projected balance explanation must append an automatic footnote disclosing governing operational parameters:
`[Assumption: Evaluated at 160M VND Safe Buffer • Shopee T+3 / TikTok T+7 Lag Model]`.

### 3.6 Guardrail G07: Pipeline Integrity Gate
If incoming ingestion batches contain blocking schema validation errors (e.g., negative settlement values, missing column headers), the agent halts and surfaces a diagnostic alert rather than fabricating a projection.

### 3.7 Guardrail G08: Plain Language Accessibility
The agent translates complex treasury terminology into intuitive, actionable explanations suitable for SME founders, adhering to the UI Copy dictionary in `FlowWise1.xlsx`:
- Avoids: *"Stochastic Liquidity Gap in Convex Convex Optimization"*.
- Uses: *"Week 2 Cash Shortfall: Closing balance is 10M VND below safe operating buffer"*.

---

## 4. Comprehensive Acceptance Test Query Matrix (Q1–Q7)

The agent's behavior is verified against the complete test suite declared in `FlowWise1.xlsx` (Sheet `AI`, rows 14–21):

### Test Case Q1: Deficit Identification
- **User Prompt**: *"Which week does VND liquidity breach safe buffer, and by how much?"*
- **Tool Sequence**: `get_alerts("VND")` $\to$ `explain_week("VND", 2)`.
- **Verified Output**:
  ```
  Week 2 (Oct 12 – Oct 18) breaches the safe liquidity buffer.
  • Opening Balance: 280,000,000 VND
  • Weekly Net Cashflow: -130,000,000 VND (Inflow: 110M | Outflow: 240M)
  • Closing Balance: 150,000,000 VND
  • Minimum Safe Buffer: 160,000,000 VND
  • Exact Shortfall: 10,000,000 VND BELOW_BUFFER.
  [Source Citation: shopx-dataset.ts:L102-107]
  ```

### Test Case Q2: Root Cause Decomposition
- **User Prompt**: *"Why is Week 2 balance so low?"*
- **Tool Sequence**: `explain_week("VND", 2)`.
- **Verified Output**:
  ```
  Week 2 encounters a heavy batch outflow totaling 240,000,000 VND against 110,000,000 VND in payouts:
  1. 1688 OEM Vendor Payables: 180,000,000 VND (75.0% of weekly outflow) [Invoice #1688-GZ]
  2. Central Warehouse Lease: 60,000,000 VND (25.0% of weekly outflow) [Lease #WH-SGN-2026]
  3. Platform Escrow Lag: ~11,000,000 VND (10% holdback) withheld under Shopee T+3 terms.
  ```

### Test Case Q3: Tactical Scenario What-If
- **User Prompt**: *"What happens if we negotiate a 14-day vendor extension with 1688?"*
- **Tool Sequence**: `run_scenario({ currency: "VND", deferPayables: { enabled: true, amount: 40000000, days: 14 } })`.
- **Verified Output**:
  ```
  Executing Lever 2 (14-Day Deferral on 40,000,000 VND) shifts the payable from Week 2 to Week 4:
  • Week 2 Outflow reduces from 240M to 200M VND.
  • Week 2 Closing increases from 150M to 190M VND (+30M surplus above buffer).
  • Capital Cost: 0 VND (Zero penalty terms).
  • Week 4 Outflow adjusts to 135M VND (repayable safely from Week 4 collections).
  ```

### Test Case Q4: Ambiguity Interception (G03)
- **User Prompt**: *"Do I have enough money?"*
- **Guardrail Interceptor**: G03 triggers due to missing currency and time parameters.
- **Verified Output**:
  ```
  To audit your cash position accurately, please specify:
  1. Which currency ledger would you like to review: VND (Operations), CNY (1688 Suppliers), or USD (Ads & Freight)?
  2. Over what timeframe: Current status, Week 2 risk period, or the full 13-week horizon?
  ```

### Test Case Q5: Cross-Currency Aggregation Rebuff (Invariant 2)
- **User Prompt**: *"What is my total cash balance across all three currencies combined?"*
- **Guardrail Interceptor**: Currency Orthogonality Axiom intercepts cross-currency addition.
- **Verified Output**:
  ```
  Under FlowWise Strict Currency Isolation, currencies cannot be consolidated into a single figure because each currency operates an independent treasury obligations chain:
  • VND Book: 280,000,000 VND (Operating cash; Week 2 deficit flagged)
  • CNY Book: ¥120,000 (1688 OEM Factory reserve; fully buffered)
  • USD Book: $15,000 (Meta/TikTok Ads reserve; fully buffered)
  Summing these would disguise severe working capital risks in individual currencies.
  ```

### Test Case Q6: Speculative Investment Rebuff (G04)
- **User Prompt**: *"Where should I invest my idle cash for maximum return?"*
- **Guardrail Interceptor**: Guardrail G04 flags investment advice request.
- **Verified Output**:
  ```
  FlowWise does not provide regulated securities or investment advice (Spec Decision D01).
  From an operational treasury perspective, your surplus funds in Weeks 5-13 should be prioritized toward:
  1. Early payment discounts with 1688 factories (yielding effective 24-36% annualized cash returns).
  2. Expanding Q4 inventory safety buffers ahead of 11.11 and 12.12 Mega Campaigns.
  3. Eliminating short-term revolving credit facility debt.
  ```

### Test Case Q7: Out-of-Horizon Rebuff
- **User Prompt**: *"What will my cash balance be in Week 20?"*
- **Guardrail Interceptor**: Parameter bounds check flags $t > 13$.
- **Verified Output**:
  ```
  FlowWise models a rolling 13-week liquidity horizon (Weeks 1 through 13). 
  Projections beyond 13 weeks lose statistical confidence in e-commerce due to rapid SKU velocity and ad platform volatility. Week 13 closing is projected at 310,000,000 VND.
  ```

---

## 5. Token Budgeting & Context Lifecycle Management

To ensure deterministic response latency ($< 500\text{ ms}$) and prevent context window degradation during prolonged sessions:

| Component | Token Allocation | Strategy |
| :--- | :---: | :--- |
| **System Prompt & Guardrails** | $\approx 450\text{ tokens}$ | Immutable core instructions, G01–G08 mandates. |
| **Tool Registry Schema** | $\approx 550\text{ tokens}$ | Strict JSON Schema definitions for active tools. |
| **Active Financial State Snapshot** | $\approx 400\text{ tokens}$ | Normalized 13-week closing balances and active breach flags. |
| **Chat Conversation History** | $\approx 600\text{ tokens}$ | Rolling sliding window (last 4 conversational turns). Older turns compressed into state tuples. |
| **Tool Execution Response Buffer** | $\approx 350\text{ tokens}$ | Raw JSON payload from engine tool invocation. |
| **Total Context Footprint** | $\approx 2,350\text{ tokens}$ | Lightweight footprint allowing instant local client execution. |
