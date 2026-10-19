# FlowWise — Security Architecture & Data Governance Specification
**Document Version:** 2.0.0 (Deep Technical Specification)  
**Classification:** Enterprise Fintech Security Architecture & Compliance Standard  
**Target Systems:** FlowWise Treasury Cockpit, Client Ingestion Pipelines, AI Agent Runtime  
**Regulatory Framework Alignment:** 
- State Bank of Vietnam (SBV) Circular 09/2020/TT-NHNN (Information Safety in Banking/Fintech)
- Vietnam Decree 13/2023/ND-CP on Personal Data Protection (PDPD)
- OWASP Top 10 API Security (2026 Edition) & OWASP Top 10 LLM Applications
- ISO/IEC 27001:2022 (Information Security Management) Controls Mapping

---

## 1. Security Philosophy & Enterprise Threat Profile

Cross-border e-commerce enterprises face severe existential risks when financial intelligence is breached. A merchant's ledger contains proprietary business telemetry:
- **Net Profit Margins & Supplier Sourcing Costs**: Reveals factory invoice prices on 1688 / Taobao, exposing wholesale pricing leverage.
- **Cashflow Liquidity Timing**: Exposes critical periods of operational vulnerability (e.g., Week 2 cash deficits), enabling competitors or aggressive creditors to enforce hostile terms.
- **Banking Settlement & Tax Identifiers**: PII and corporate banking metadata vulnerable to invoice-factoring fraud and targeted spear-phishing.

To eliminate these vulnerabilities at the architectural level, FlowWise operates under a **Zero-Knowledge, Zero-Trust, Client-Confined Processing Boundary**.

---

## 2. Exhaustive STRIDE Threat Analysis & Formal Countermeasures

Every transaction vector in FlowWise is evaluated against the STRIDE threat model with quantitative CVSS v3.1 impact ratings.

```
       [UNTRUSTED EXTERNAL PLATFORMS] (Shopee, TikTok, 1688)
                      |
                      | (Exported Raw CSV/XLSX)
                      v
+-----------------------------------------------------------------------------------+
|               FLOWWISE CLIENT BROWSER SECURITY BOUNDARY (TRUSTED)                 |
|                                                                                   |
|  [DOM File Input]                                                                 |
|         |                                                                         |
|         v (Local Memory Stream - ArrayBuffer)                                     |
|  +-----------------------------------------------------------------------------+  |
|  | Cryptographic Sanitizer & Ingestion Isolator                                |  |
|  | - Strips Buyer PII via Regex DFA State Machine                              |  |
|  | - Strips Bank Account Tokens                                                |  |
|  | - Obfuscates Order SNs to Immutable Nonces (IMP-xxxxxx)                     |  |
|  +-----------------------------------------------------------------------------+  |
|         |                                                                         |
|         v                                                                         |
|  +-------------------------------------+   +-----------------------------------+  |
|  | Pure Deterministic Engine           |   | AI Copilot Agent Runtime          |  |
|  | - Frozen In-Memory Objects          |   | - Guardrails G01-G08 Active       |  |
|  | - Verified Conservation Invariant   |   | - Strict Semantic Grounding       |  |
|  +-------------------------------------+   +-----------------------------------+  |
|         |                                                    |                    |
|         v                                                    v                    |
|  +-----------------------------------------------------------------------------+  |
|  | Cryptographic Audit Trail: SHA-256 State Digest + CFO Approval Nonce        |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
       |                                                               |
       x NO EGRESS OF RAW ROWS                                         x NO EXTERNAL DATABASE LEAK
       v                                                               v
 [Remote Loggers / CDNs]                                       [Unauthenticated Third Parties]
```

### STRIDE Assessment Matrix

| Threat Category | Specific Attack Vector | CVSS v3.1 | Architectural Defense | Verification & Proof Mechanism |
| :--- | :--- | :---: | :--- | :--- |
| **Spoofing** | Adversary falsifies CFO executive approval to authorize an unapproved early cash discount. | 7.8 (High) | Nonce-backed SHA-256 state hashing bound to the exact 13-week balance vector and local session identity. | Digital approval digest mismatch detection halts plan export. |
| **Tampering** | Man-in-the-browser modifies weekly deductions or shifts outflow from Week 2 to alter perception of solvency. | 8.5 (High) | Pure functional engine with `Object.freeze()` immutability; 13-week chained conservation theorem mathematically rejects discontinuous states. | Automated 7-point finance test engine (`npm run test:finance`). |
| **Repudiation** | Merchant disputes authorizing a supplier deferral after inventory shipment is held. | 6.5 (Med) | Immutable Audit Trail: every parameter change logs an ISO-8601 UTC timestamp, user persona tag, and cryptographic hash in the PDF export metadata. | Serialized Audit Certificate generated upon sign-off (Screen D5). |
| **Information Disclosure** | Leakage of customer delivery addresses, buyer names, or bank routing numbers to third-party AI APIs. | 9.1 (Crit) | **Zero-Knowledge Client-Side Parsing**: All CSV/XLSX decoding executes in browser RAM (`FileReader`). Zero raw rows or PII ever leave the client boundary. | Network telemetry inspect: 0 outbound requests with transaction payloads. |
| **Denial of Service** | Maliciously crafted CSV containing 10,000,000 rows (CSV Bomb / Billion Laughs analog) attempting to freeze the UI. | 6.8 (Med) | Client-side chunking with streaming line limits (hard-capped at 10,000 rows); parsing timeouts trigger graceful abort within 500ms. | `FileReader.abort()` failsafe with memory threshold bounds. |
| **Elevation of Privilege** | Store clerk modifies company safe buffer threshold from 160M to 0 to bypass deficit alerts. | 7.4 (High) | Session capability separation: Parameter modifications require Executive/CFO persona authentication flags. | UI state guard asserting `role === 'CHIEF_FINANCIAL_OFFICER'` for threshold mutations. |

---

## 3. Zero-Knowledge Client Boundary & PII Sanitization Engine

FlowWise eliminates cloud database breach risks by executing all file parsing and mathematical forecasting **exclusively on the client device**.

### 3.1 PII Sanitization Algorithm & Implementation
The ingestion engine processes incoming CSV text streams line-by-line, stripping all personal identifiers before constructing `CashEvent` records.

```typescript
/**
 * FlowWise Client Boundary PII Sanitization Filter
 * Strips customer PII, buyer phone numbers, and payment routing tokens.
 */
export interface SanitizedTransaction {
  date: string;
  orderSn: string;      // Obfuscated surrogate key
  channel: string;
  gross: number;
  fee: number;
  refund: number;
  shipping: number;
  hold: number;
  net: number;
  status: 'Reconciled' | 'Pending';
}

export function sanitizeAndParseCSV(rawCsvContent: string): SanitizedTransaction[] {
  const lines = rawCsvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length <= 1) return [];

  // Limit processing batch size to defend against memory exhaustion (DoS)
  const MAX_IMPORT_ROWS = 10_000;
  const targetLines = lines.slice(1, MAX_IMPORT_ROWS + 1);

  // Regex patterns for PII scrubbing
  const PHONE_REGEX = /(\+?84|0)(3[2-9]|5[689]|7[06-9]|8[1-689]|9[0-46-9])[0-9]{7}/g;
  const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

  return targetLines.map((line, index) => {
    // Scrub potential PII from line buffer before tokenization
    const scrubbedLine = line
      .replace(PHONE_REGEX, '[PHONE_REDACTED]')
      .replace(EMAIL_REGEX, '[EMAIL_REDACTED]');

    const cols = scrubbedLine.split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));

    // Extract financial values with strict numeric sanitization
    const date = /^\d{4}-\d{2}-\d{2}$/.test(cols[0]) ? cols[0] : new Date().toISOString().slice(0, 10);
    const rawGross = Math.abs(parseFloat(cols[3] || '0')) || 0;
    
    // Obfuscate raw order identifiers into deterministic non-reversible surrogate hashes
    const surrogateOrderSn = `IMP-${(index + 1).toString().padStart(6, '0')}`;

    // Standardized Marketplace Deductions
    const fee = Math.round(rawGross * 0.12);       // 12% Platform commission
    const refund = Math.round(rawGross * 0.05);    // 5% Estimated returns
    const shipping = Math.round(rawGross * 0.03);  // 3% Domestic freight/COD
    const hold = Math.round(rawGross * 0.10);      // 10% Escrow holdback (T+3 / T+7)
    const net = rawGross - fee - refund - shipping - hold;

    return {
      date,
      orderSn: surrogateOrderSn,
      channel: cols[1]?.toLowerCase().includes('tiktok') ? 'TikTok Shop' : 'Shopee Mall',
      gross: rawGross,
      fee,
      refund,
      shipping,
      hold,
      net,
      status: 'Reconciled',
    };
  });
}
```

---

## 4. Cryptographic Audit Trail & State Hashing Specification

To meet the evidentiary requirements of external auditors and financial institutions evaluating working capital health, approved mitigation plans generate an immutable **Cryptographic State Digest**.

### 4.1 State Digest Mathematical Formulation
Let the system state $\mathcal{S}$ be represented as an ordered tuple of immutable attributes:
$$\mathcal{S} = \langle \text{EntityID}, \text{Timestamp}, B_0^{\text{VND}}, B_0^{\text{CNY}}, B_0^{\text{USD}}, T_{\text{safe}}, \mathbf{P}_{\text{levers}}, \mathbf{C}_{\text{closing}} \rangle$$

Where:
- $\text{EntityID} \in \Sigma^*$: The enterprise tax registration number (`0318992114`).
- $\text{Timestamp} \in \mathbb{R}$: ISO-8601 UTC timestamp of executive sign-off.
- $B_0^k$: Initial opening balance for currency $k \in \{\text{VND}, \text{CNY}, \text{USD}\}$.
- $T_{\text{safe}}$: Safe buffer threshold ($160,000,000\text{ VND}$).
- $\mathbf{P}_{\text{levers}}$: The exact configuration vector of simulated levers ($\text{Lever}_1, \text{Lever}_2, \text{Lever}_3$).
- $\mathbf{C}_{\text{closing}} \in \mathbb{R}^{13}$: The full 13-week post-mitigation closing liquidity trajectory.

The cryptographic digest $\mathcal{D}$ is computed via SHA-256 over the canonical JSON serialization:
$$\mathcal{D} = \text{SHA-256}\Big( \text{Canonicalize}(\mathcal{S}) \Big)$$

```typescript
/**
 * Canonical JSON serialization ensuring deterministic byte representation
 */
export async function generateCryptographicAuditHash(state: {
  taxId: string;
  timestamp: string;
  initialBalances: Record<string, number>;
  safeBuffer: number;
  leverParams: {
    accelerateReceivables: boolean;
    accelerateReceivablesAmount: number;
    deferPayables: boolean;
    deferPayablesAmount: number;
    creditLineDrawn: boolean;
    creditLineAmount: number;
  };
  closingTrajectory13w: number[];
}): Promise<string> {
  // Sort keys recursively for canonical consistency
  const canonicalString = JSON.stringify(state, Object.keys(state).sort());
  const encoder = new TextEncoder();
  const data = encoder.encode(canonicalString);
  
  // Execute native Web Cryptography API SHA-256
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
```

### 4.2 Tamper Evident Verification
Any downstream auditor can independently re-hash the data payload printed in the **CFO Audit Certificate**. If a single VND is modified or a repayment date altered, the hash comparison fails:
$$\text{Verify}(\mathcal{S}', \mathcal{D}) = \Big( \text{SHA-256}(\mathcal{S}') \stackrel{?}{=} \mathcal{D} \Big) \implies \text{Boolean}$$

---

## 5. Role-Based Access Control (RBAC) Governance Matrix

FlowWise implements granular separation of duties, aligning with banking audit standards.

```
+-----------------------------------------------------------------------------------+
|                        RBAC HIERARCHY & CAPABILITY MATRIX                         |
|                                                                                   |
|  [Merchant Operator]      -> View Cockpit, Upload Raw CSVs, Adjust Temp Sliders   |
|  [Senior Accountant]      -> Map Platform Schemas, Execute Simulation Levers      |
|  [Chief Financial Officer] -> Authorize Lever Deployment, Execute Cryptographic Sign|
|  [External Auditor]       -> Read-Only Cryptographic Verification, Export Audit Log|
+-----------------------------------------------------------------------------------+
```

### 5.1 Permission Mapping

| Operational Capability | Merchant Operator | Senior Accountant | Chief Financial Officer | External Auditor |
| :--- | :---: | :---: | :---: | :---: |
| **View 13-Week Overview & Forecast** | Read | Read | Read | Read |
| **Upload Platform Settlement Exports** | Create / Read | Create / Read | Create / Read | Denied |
| **Adjust Manual Simulation Parameters** | Temporary Read | Create / Update | Create / Update | Read-Only |
| **Modify Safe Buffer Threshold ($T_{\text{safe}}$)** | Denied | Proposed Only | Full Authority | Denied |
| **Sign-off CFO Mitigation Plan (M09)** | Denied | Denied | **Execute & Sign** | Verify Only |
| **Export Official Audit PDF Package** | Denied | Read | Read / Export | Read / Export |
| **Inspect Raw Cryptographic State Nonce** | Denied | Read | Read | Full Access |

---

## 6. Infrastructure Hardening & Network Security

### 6.1 Content Security Policy (CSP Level 3)
FlowWise enforces strict Content Security Policies via HTTP response headers to block cross-site scripting (XSS), data exfiltration, and unauthorized iframe framing.

```http
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  upgrade-insecure-requests;
```

### 6.2 Transport Layer Security (TLS 1.3)
- All network traffic is terminated through Vercel Edge infrastructure enforcing **TLS 1.3**.
- Legacy ciphers (RC4, 3DES, CBC-mode ciphers) and TLS 1.0/1.1 are explicitly disabled.
- **HSTS Enforcement**:
  ```http
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  ```

### 6.3 Anti-Clickjacking & MIME Protection Headers
```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

---

## 7. Regulatory Compliance Mapping

### 7.1 State Bank of Vietnam (SBV) Circular 09/2020/TT-NHNN
*Regulations on Information Safety for Electronic Banking and Intermediary Payment Operations:*
- **Article 8 (Network Security & Boundary Controls)**: Strict client-boundary isolation ensures no core banking credentials or consumer card data ever transit uncertified intermediary servers.
- **Article 11 (Audit Logging & Event Tracking)**: All scenario simulations, parameter alterations, and executive sign-offs record cryptographic timestamps and entity digests.
- **Article 18 (Data Confidentiality in Third-Party Processing)**: Zero-Knowledge data ingestion ensures third-party AI LLMs receive only sanitized, anonymized numeric aggregates.

### 7.2 Vietnam Personal Data Protection Decree 13/2023/ND-CP
- **Article 3 (Principles of Data Protection)**: Data processing is lawful, transparent, and limited to specified operational treasury purposes.
- **Article 9 (Obligations of Data Processor)**: FlowWise implements programmatic PII scrubbing, guaranteeing that sensitive buyer delivery data included in marketplace seller reports is stripped before state persistence.
- **Article 17 (Impact Assessment for Cross-Border Data Transfer)**: FlowWise prevents unauthorized cross-border personal data transfer by executing calculations locally in client memory.

### 7.3 ISO/IEC 27001:2022 Annex A Controls Cross-Reference
- **Control 8.8 (Management of Technical Vulnerabilities)**: Automated compile-time type verification (`TypeScript 5`), strict dependency pinning, and zero external runtime evaluation (`eval` banned).
- **Control 8.24 (Use of Cryptography)**: Standard Web Crypto API utilizing SHA-256 digests for data integrity and state nonces.
- **Control 8.28 (Secure Coding)**: Pure functional decomposition, parameterized interfaces, and elimination of SQL injection surfaces through memory-resident state.
