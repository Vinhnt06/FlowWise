# Phase 4 — AI engine

**Goal:** a chat assistant that answers questions about the forecast by calling engine tools.
The engine computes every number; the model only chooses tools and explains the result.
If a number in a draft answer is not in a tool output, the answer is not sent.

**Spec:** sheet AI (tools, questions Q1–Q7, guardrails G01–G08); feature F13; tests TC22–TC24; NF03, NF10.

## Architecture (proposal)

```
user question
   → assistant route (server only, API key never in the browser — NF06)
   → model with tool definitions
   → tool calls run against the latest forecast run (read only, never overwrite the baseline)
   → draft answer
   → number check: every figure in the draft must appear in this turn's tool outputs (G01, G02)
   → answer + list of sources shown under it
```

Tools, as named in the spec:

| Tool | Returns | Notes |
| --- | --- | --- |
| `get_forecast(currency, run_id?)` | 13 `week_result`s | Reads the latest run, never recomputes |
| `get_alerts(currency)` | level, first week, gap, drivers | |
| `explain_week(currency, week_no)` | opening, inflow, outflow, closing, top events with source | Q2 |
| `list_data_issues(severity?)` | `data_issue[]` | Data quality questions |
| `run_scenario(type, params)` | new scenario run + M1–M6 comparison | Creates a new run |
| `compare_scenarios(scenario_ids[])` | M1–M6 table | Never adds currencies |

## To do

- [ ] Choose the model provider and what data may leave the machine (D08). Proposal: send only aggregated figures and aliases, never account numbers or real names (G05, NF03).
- [ ] Tool layer on top of the phase 1 engine functions, with input validation (missing currency or week → ask back, G03, Q4).
- [ ] System prompt: plain words (G08), state key assumptions (G06), say when data is blocked (G07), 13 weeks only (Q7), no currency conversion (Q5).
- [ ] Refuse product recommendations and loan approval promises (G04, Q6, D01).
- [ ] Post-check that extracts every number from the draft and matches it against tool outputs; on a miss, regenerate once, then fall back to a plain table of the tool output.
- [ ] Acceptance set Q1–Q7 as automated tests; Q1 must answer week 2, 10,000,000 ₫ short on the worked example.
- [ ] The dashboard keeps working when the model is unreachable; only the chat shows an error (NF10).
- [ ] Log tool calls and the check result per answer for audit (NF07), without raw personal data.

## Acceptance

TC22 (numbers only from tools), TC23, TC24 (refuses investment advice) pass; Q1–Q7 behave
as the spec says.

## Decisions needed

- D01: scope of "where should I put my money" (proposal A).
- D03: what "AI" means in the pitch (proposal A, plus F21 statistics as P1).
- D08: provider and data policy.
- L01: answer language. G08 asks for Vietnamese, the UI is English only (D10). Pick one before writing prompts.
