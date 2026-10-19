# FlowWise — Security Architecture & Data Governance Specification
**Document Version:** 1.0.0  
**Classification:** Security Architecture & Compliance Standard  
**Framework Alignment:** OWASP Top 10 API Security (2026 Edition), SOC2 Type II, SBV Circular 09/2020/TT-NHNN

---

## 1. Security Philosophy & Threat Profile

E-commerce enterprise cashflow records contain sensitive corporate intelligence, including merchant margins, wholesale discount arrangements with foreign factories (1688), bank account settlement identifiers, and customer return rates. Compromise of this data exposes merchants to supplier renegotiation leverage, competitive espionage, or financial phishing.

FlowWise implements a **Defense-in-Depth, Zero-Trust, Zero-Knowledge Client Boundary** security architecture.

---

## 2. STRIDE Threat Modeling Matrix

| Threat Category | Potential Attack Vector | FlowWise Architectural Countermeasure | Verification Mechanism |
| :--- | :--- | :--- | :--- |
| **Spoofing (Identity)** | Unauthorized actor signs off on a CFO cashflow mitigation plan. | Nonce-backed SHA-256 digital plan fingerprinting with local cryptographic identity signing. | Immutable sign-off checksum verification. |
| **Tampering (Data)** | Modification of settlement deductions or weekly closing balances in transit. | Pure mathematical client-side engine with frozen execution trees; all objects immutable (`Object.freeze` semantics). | Unit test suite verification (`npm run test:finance`). |
| **Repudiation** | Merchant claims they did not authorize an early receivables discount or vendor deferral. | Audit trail logging every scenario parameter change with localized timestamp and hash fingerprint. | Exportable CFO Audit Plan (Spec M09 / Screen D5). |
| **Information Disclosure** | Leakage of customer names, order tracking numbers, or bank account balances to third parties. | **Zero-Knowledge Client Parsing**: raw CSV/XLSX parsed in-browser via `FileReader`; no raw rows sent to LLMs or remote loggers. | Network telemetry inspect: 0 telemetry egress requests. |
| **Denial of Service** | Malicious CSV containing circular references or billion-row CSV bomb. | Client-side chunked ingestion limiters; strict line-count caps (max 10,000 rows); streaming string splits. | Asynchronous web-worker parsing with timeout abort. |
| **Elevation of Privilege** | Unprivileged operator modifying corporate safe buffer thresholds. | Role separation between Ledger Intake Operator (read/upload) and Executive Signer (CFO approval). | State permission flags in application session context. |

---

## 3. Zero-Knowledge Client-Side Ingestion Architecture

A core architectural tenet of FlowWise is that **raw financial files never leave the merchant's local browser environment**.

```
+-------------------------------------------------------------------------------+
|                             CLIENT BROWSER SANDBOX                            |
|                                                                               |
|  [Raw Shopee/TikTok CSV]                                                      |
|           |                                                                   |
|           v (Local ArrayBuffer / DOM FileReader)                              |
|  +-------------------------------------------------------------------------+  |
|  | In-Memory Parsing & Sanitization Layer                                  |  |
|  | - Strips buyer PII (customer names, phone numbers, delivery addresses)  |  |
|  | - Normalizes amounts to numeric float representations                   |  |
|  | - Replaces sensitive order IDs with obfuscated surrogate keys (IMP-xxx) |  |
|  +-------------------------------------------------------------------------+  |
|           |                                                                   |
|           v                                                                   |
|  +-------------------------------------------------------------------------+  |
|  | Sanitized Cashflow Aggregate Vector (Inflow, Outflow, Net)              |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
       |                                                                 |
       | (Only anonymized aggregates)                                    | (Zero telemetry)
       v                                                                 v
[AI Copilot Query Engine]                                      [NO EXTERNAL SERVER EGRESS]
- Receives: "Week 2 Outflow: 240M"                             - Raw order lines: NEVER SENT
- NEVER receives: Buyer PII, Tax IDs                           - Account credentials: NONE
```

### 3.1 PII Scrubbing Rules
Prior to any in-memory ingestion, the data transformation pipeline executes algorithmic redaction:
1. **Order SN Obfuscation**: Retains only channel prefix and alphanumeric hash (`SP-***-001`).
2. **Customer Identity Redaction**: Strips buyer address lines, phone numbers, and recipient names.
3. **Internal Accounting Alias**: Sourcing vendors are identified by category and identifier rather than individual contact details (`Supplier Invoice #1688-GZ`).

---

## 4. Cryptographic Audit Trail & State Hashing

To ensure the integrity of the CFO Approval Workflow (Spec M09 / Screen D5), approved plans generate a verifiable **Cryptographic State Hash**.

### 4.1 State Digest Generation Algorithm
When a scenario is approved, the system generates a canonical SHA-256 digest over the composite state tuple:

$$\mathcal{H} = \text{SHA-256}\Big( \text{EntityTaxID} \parallel \text{Timestamp} \parallel B_0 \parallel T_{\text{safe}} \parallel \mathbf{P}_{\text{levers}} \parallel \mathbf{Closing}_{1..13} \Big)$$

Where:
- $\text{EntityTaxID}$: Legal tax identifier (e.g., `0318992114`).
- $\mathbf{P}_{\text{levers}}$: Exact JSON-serialized parameters for Levers 1, 2, and 3.
- $\mathbf{Closing}_{1..13}$: The full 13-week closing balance vector.

```typescript
export function generateAuditFingerprint(payload: {
  taxId: string;
  timestamp: string;
  initialBalance: number;
  safeBuffer: number;
  leverParams: ScenarioParams;
  closingBalances: number[];
}): string {
  const canonicalString = JSON.stringify(payload, Object.keys(payload).sort());
  // Browser Web Crypto API
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(canonicalString))
    .then(buf => Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, '0')).join('')
    );
}
```

This prevents undetected tampering: any retroactive modification of historical numbers or lever parameters invalidates the CFO certification signature.

---

## 5. Secret Management & OWASP 2026 API Hardening

1. **Zero Hardcoded Secrets**: All API endpoints, deployment keys, and environment flags use strict server-side environment variables (`process.env.VARIABLE_NAME`) validated at build time.
2. **Content Security Policy (CSP)**:
   - `default-src 'self'`
   - `script-src 'self' 'unsafe-inline'` (strictly scoped for Next.js hydration)
   - `style-src 'self' 'unsafe-inline'`
   - `connect-src 'self'` (zero unauthorized external webhook beacons)
   - `img-src 'self' data: blob:`
   - `frame-ancestors 'none'` (anti-clickjacking protection)
3. **HTTP Strict Transport Security (HSTS)**:
   - Enforced by Vercel Edge infrastructure: `max-age=63072000; includeSubDomains; preload`.
4. **Cross-Origin Resource Sharing (CORS)**: Restricted strictly to the origin domain `https://flowwise-eta.vercel.app`.

---

## 6. Regulatory & Industry Standard Compliance Posture

### 6.1 State Bank of Vietnam (SBV) Circular 09/2020/TT-NHNN
- **Safety and Confidentiality in Electronic Banking and Fintech Operations**:
  - Implements multi-level access controls and audit trails.
  - Ensures zero data storage on unaccredited intermediary cloud storage nodes.
  - Prohibits cross-border transmission of raw banking credentials or customer payment tokens.

### 6.2 European General Data Protection Regulation (GDPR) / Vietnam Decree 13/2023/ND-CP on Personal Data Protection
- **Data Minimization (Article 5(1)(c))**: System collects only aggregate figures strictly necessary for cashflow projection math.
- **Privacy by Design & by Default (Article 25)**: Client-side parsing architecture guarantees that personal identifiers do not enter persistent database caches.
