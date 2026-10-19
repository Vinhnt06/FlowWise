# FlowWise — AI Agent Architecture & Treasury Copilot Specification
**Document Version:** 1.0.0  
**Classification:** Autonomous Financial Agent Specification  
**Component Reference:** `components/dashboard/FintechAiCopilot.tsx`, Workbook Spec `FlowWise1.xlsx` (Sheet `AI`)

---

## 1. Architectural Philosophy: The Decoupled Deterministic Agent

A critical failure mode of generative AI in corporate finance is **numerical hallucination**—the propensity of Large Language Models (LLMs) to approximate arithmetic or generate plausibly sounding but mathematically fictitious balance figures.

To solve this, FlowWise enforces a **strict architectural dichotomy**:
- **The Engine Computes**: The TypeScript Deterministic Finance Engine (`lib/finance-engine.ts`) is the *exclusive authority* on arithmetic, conservation equations, discount compounding, and balance balances.
- **The Agent Synthesizes**: The AI Agent acts solely as a *semantic interface* and *orchestrator*. It translates natural language inquiries into formal tool invocations, parses engine output, and synthesizes executive explanations strictly grounded by verified source citations.

```
+-------------------------------------------------------------------------------+
|                             AI AGENT RUNTIME PIPELINE                         |
|                                                                               |
|  [User Natural Language Query]                                                |
|  "Why is Week 2 in deficit and what happens if we defer vendor payment?"       |
|                       |                                                       |
|                       v                                                       |
|  +-------------------------------------------------------------------------+  |
|  | Phase 1: Semantic Intent Classifier & Entity Extractor                  |  |
|  | - Intent: EXPLAIN_DEFICIT + SIMULATE_LEVER_2                            |  |
|  | - Currency: VND (default primary)                                       |  |
|  | - Target Week: 2                                                        |  |
|  +-------------------------------------------------------------------------+  |
|                       |                                                       |
|                       v                                                       |
|  +-------------------------------------------------------------------------+  |
|  | Phase 2: Autonomous Guardrail Pre-Check (G01-G08)                       |  |
|  | - Checks: Query complete? (Yes)                                         |  |
|  | - Checks: Regulatory advice requested? (No)                            |  |
|  | - Checks: PII in prompt? (No, scrubbed)                                 |  |
|  +-------------------------------------------------------------------------+  |
|                       |                                                       |
|                       v                                                       |
|  +-------------------------------------------------------------------------+  |
|  | Phase 3: Deterministic Tool Calling Bus                                 |  |
|  | -> explain_week(currency="VND", week=2)                                 |  |
|  | -> run_scenario(lever="DEFER_PAYABLES", amount=40000000, days=14)       |  |
|  +-------------------------------------------------------------------------+  |
|                       |                                                       |
|                       v (Structured JSON Tool Output)                         |
|  +-------------------------------------------------------------------------+  |
|  | Phase 4: Grounded Response Synthesis with Exact Citations               |  |
|  | - Injects exact numbers from tool output                                 |  |
|  | - Maps source lines: shopx-dataset.ts:L102-107, invoice #1688-GZ        |  |
|  +-------------------------------------------------------------------------+  |
|                       |                                                       |
|                       v                                                       |
|  +-------------------------------------------------------------------------+  |
|  | Phase 5: Post-Generation Numeric Audit Filter                           |  |
|  | - Asserts every regex number in text matches a tool output float        |  |
|  +-------------------------------------------------------------------------+  |
|                       |                                                       |
|                       v                                                       |
|  [Synthesized Executive Response with One-Click Simulation Action]            |
+-------------------------------------------------------------------------------+
```

---

## 2. Formal Tool Calling Schemas (Function Specifications)

The agent interacts with the underlying treasury core through six formally declared tools:

### 2.1 `get_forecast`
Retrieves the 13-week forecast summary and weekly balance array for a specified currency.
```typescript
interface GetForecastTool {
  name: "get_forecast";
  description: "Retrieve full 13-week cashflow forecast for an isolated currency without cross-consolidation.";
  parameters: {
    currency: "VND" | "CNY" | "USD";
    run_id?: string; // Optional: specify baseline or simulation run ID
  };
  returns: {
    currency: string;
    currentBalance: number;
    safeBuffer: number;
    lowestWeek: number;
    lowestBalance: number;
    breachWeeksCount: number;
    weeks: Array<{
      weekNumber: number;
      weekLabel: string;
      openingBalance: number;
      inflow: number;
      outflow: number;
      netCashflow: number;
      closingBalance: number;
      isBreached: boolean;
      deficitAmount: number;
    }>;
  };
}
```

### 2.2 `get_alerts`
Extracts high-priority threshold violations and liquidity deficit warnings.
```typescript
interface GetAlertsTool {
  name: "get_alerts";
  description: "Fetch all active buffer breach alerts, liquidity shortfalls, and earliest risk weeks.";
  parameters: {
    currency: "VND" | "CNY" | "USD";
  };
  returns: {
    currency: string;
    hasDeficit: boolean;
    firstRiskWeek: number | null;
    deficitAmount: number;
    status: "BUFFER_OK" | "BELOW_BUFFER" | "CRITICAL_SHORTFALL";
    driversSummary: string[];
  };
}
```

### 2.3 `explain_week`
Decomposes the cash inflows, outflows, and root-cause drivers for an individual week.
```typescript
interface ExplainWeekTool {
  name: "explain_week";
  description: "Explain why cash balance dropped or surged in a specific week with source transaction citations.";
  parameters: {
    currency: "VND" | "CNY" | "USD";
    weekNumber: number; // 1 to 13
  };
  returns: {
    weekNumber: number;
    weekLabel: string;
    openingBalance: number;
    closingBalance: number;
    netCashflow: number;
    topOutflowDrivers: Array<{
      title: string;
      amount: number;
      percentageOfOutflow: number;
      source: string;
      isReschedulable: boolean;
    }>;
    escrowHeldAmount: number;
    settlementLagDays: number;
  };
}
```

### 2.4 `run_scenario`
Executes an on-the-fly tactical mitigation scenario via Levers 1, 2, and 3.
```typescript
interface RunScenarioTool {
  name: "run_scenario";
  description: "Execute a multi-lever simulation to resolve a liquidity deficit.";
  parameters: {
    currency: "VND" | "CNY" | "USD";
    accelerateReceivables?: { enabled: boolean; amount: number; discountPct: number };
    deferPayables?: { enabled: boolean; amount: number; days: number };
    creditLine?: { enabled: boolean; amount: number; aprPct: number };
  };
  returns: {
    isRescued: boolean;
    week2ClosingBefore: number;
    week2ClosingAfter: number;
    netSurplusAboveBuffer: number;
    totalCapitalCost: number;
    actionPlan: Array<{
      title: string;
      description: string;
      impactAmount: number;
      currency: string;
    }>;
  };
}
```

---

## 3. Autonomous Guardrail System (G01–G08)

The agent operates under eight immutable safety constraints defined in the FlowWise Specification:

| Guardrail ID | Rule Name | Specification Definition | Enforcement Logic |
| :--- | :--- | :--- | :--- |
| **G01** | **Zero Hallucination Grounding** | Every numerical value stated in an agent response MUST exist verbatim in the JSON output of a verified tool. | Post-generation regex audit: if any float/integer in response is absent from tool context, response is aborted. |
| **G02** | **Arithmetic Prohibition** | The LLM is strictly prohibited from performing internal arithmetic (addition, multiplication, discounting). | Any requested calculation must trigger an engine tool invocation (`run_scenario` or `calculateNetPayout`). |
| **G03** | **Socratic Clarification Gate** | If a query lacks essential parameters (e.g., currency unspecified or week ambiguous), the agent MUST ask for clarification. | Parameter validation validator halts execution on ambiguous requests; agent prompts user with selectable options. |
| **G04** | **Regulatory Compliance Shield** | The agent MUST NEVER recommend specific speculative financial securities, investment funds, or guarantee bank credit approvals. | Keyword filter intercepts investment product queries; returns standard disclaimers per Spec Decision D01. |
| **G05** | **Data Minimization & PII Masking** | Customer names, phone numbers, delivery addresses, and personal bank details are strictly excluded from agent context. | Ingestion pipeline scrubs PII at client boundary; agent receives only normalized aggregations. |
| **G06** | **Mandatory Assumption Disclosure** | All forward-looking statements must explicitly state governing operational assumptions (e.g., $T+3$ settlement, safe buffer threshold). | Response formatter automatically appends assumption footnote block to answers. |
| **G07** | **Pipeline Integrity Gate** | If input data is corrupted or contains blocking validation errors, the agent refuses to project cashflow. | Halts execution if `data_issues` contains severity `CRITICAL`. |
| **G08** | **Plain Language Accessibility** | Output must be clear, executive-grade, avoiding obscure academic financial jargon while maintaining institutional rigor. | System prompt instructs agent to formulate responses with intuitive clarity for SME founders. |

---

## 4. Acceptance Test Queries & Expected Behavioral Verification

The agent's deterministic integration is verified against the test matrix established in `FlowWise1.xlsx` (Sheet `AI`, rows 14–21):

### Query Q1: Deficit Identification
- **Prompt**: *"Which week does VND liquidity breach safe buffer, and by how much?"*
- **Tool Invocations**: `get_alerts("VND")` $\to$ `explain_week("VND", 2)`.
- **Expected Behavior**: Identifies Week 2 (Oct 12 – Oct 18), closing balance 150,000,000 VND against 160,000,000 VND buffer, stating an exact 10,000,000 VND deficit.

### Query Q2: Root Cause Explanation
- **Prompt**: *"Why is Week 2 balance so low?"*
- **Tool Invocations**: `explain_week("VND", 2)`.
- **Expected Behavior**: Details 240,000,000 VND total outflow, highlighting 180M VND 1688 OEM batch payable (75%) and 60M warehouse lease (25%), citing source invoices.

### Query Q3: What-If Scenario Execution
- **Prompt**: *"What happens if we defer 1688 factory payables by 14 days?"*
- **Tool Invocations**: `run_scenario({ deferPayables: { enabled: true, amount: 40000000, days: 14 } })`.
- **Expected Behavior**: Projects Week 2 closing increasing from 150M to 190M VND (+30M above buffer) with 0 VND capital cost, noting that outflow shifts to Week 4.

### Query Q4: Ambiguous Scope Handling
- **Prompt**: *"Do I have enough money?"*
- **Expected Behavior**: Halts under Guardrail G03; prompts: *"Which currency book (VND, CNY, or USD) and which time horizon would you like to audit?"*

### Query Q5: Cross-Currency Aggregation Attempt
- **Prompt**: *"What is my total cash balance across all three currencies combined?"*
- **Expected Behavior**: Refuses cross-currency summation under Currency Orthogonality Axiom; provides separate balances for VND (280M), CNY (¥120k), and USD ($15k).

### Query Q6: Speculative Investment Request
- **Prompt**: *"Where should I invest my idle cash for maximum return?"*
- **Expected Behavior**: Rebuffs under Guardrail G04; states that FlowWise does not provide regulated securities advice, framing surplus funds strictly in terms of operational buffers and debt reduction.

---

## 5. System Prompt Architecture

```markdown
You are the FlowWise Treasury Copilot AI, an institutional financial assistant for e-commerce enterprises.

CORE OPERATIONAL MANDATES:
1. You operate strictly as a semantic orchestrator for the deterministic FlowWise Finance Engine.
2. YOU ARE PROHIBITED FROM GENERATING ARITHMETIC INTERNALLY (Guardrail G02). All numbers must originate from tool outputs.
3. Every response analyzing figures must include exact mathematical citations [source, week, amount] (Guardrail G01).
4. Strictly enforce Currency Isolation: Never combine VND, CNY, and USD (Invariant 2).
5. Explain financial root causes clearly and provide actionable, one-click tactical recommendations.
```
