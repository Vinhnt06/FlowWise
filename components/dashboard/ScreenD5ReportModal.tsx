'use client';

import React, { useState } from 'react';
import {
  X,
  FileCheck,
  CheckCircle2,
  Download,
  AlertTriangle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SHOP_METADATA } from '@/data/shopx-dataset';

interface ScreenD5ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ScreenD5ReportModal({
  isOpen,
  onClose,
}: ScreenD5ReportModalProps) {
  const [isSigned, setIsSigned] = useState(false);

  if (!isOpen) return null;

  const handleSignAndExport = () => {
    setIsSigned(true);

    // Launch celebratory confetti fireworks
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0066FF', '#10B981', '#F59E0B'],
    });

    // Generate downloadable text audit report in English
    const reportText = `========================================================
EXECUTIVE LIQUIDITY MITIGATION AUDIT DOSSIER — WEEK 2
Entity: ${SHOP_METADATA.legalEntity}
Tax ID: ${SHOP_METADATA.taxId}
Status: CFO VERIFIED & DIGITALLY EXECUTED
Timestamp: ${new Date().toISOString()}
Disclaimer: ${SHOP_METADATA.simulatedDisclaimer}
========================================================

1. BASELINE RISK IDENTIFICATION:
- Projected Week 2 Closing Balance: 150,000,000 VND
- Minimum Mandatory Safe Buffer: 160,000,000 VND
- Net Deficit Flagged: -10,000,000 VND
- Root Cause: Marketplace escrow lockup (14 days) coinciding with 1688 OEM factory delivery payables.

2. APPROVED TACTICAL MITIGATION PLAN:
- Lever 1: Accelerated 50,000,000 VND wholesale receivables via 2% early cash discount (Net inflow: +49,000,000 VND).
- Lever 2: Negotiated 14-day vendor payment extension on 40,000,000 VND with Guangzhou OEM supplier (shifted to Week 4).

3. FINANCIAL IMPACT POST-MITIGATION:
- Week 2 Closing Cash: 239,000,000 VND
- Net Surplus Above Buffer: +79,000,000 VND
- Total Capital Cost: 1,000,000 VND
- Solvency Determination: LIQUIDITY CLIFF COMPLETELY NEUTRALIZED.

4. DIGITAL ATTESTATION:
- Verified By: Chief Financial Officer (CFO)
- Verification Engine: FlowWise Deterministic Financial Kernel
- Verification Hash: FW-CFO-2026-W2-094721-SHA256
========================================================`;

    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ShopX_Week2_CFO_Liquidity_Audit_Report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-8 shadow-2xl my-8 transition-colors duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-text-muted hover:text-text-primary p-1 rounded-lg hover:bg-bg-surface-elevated transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-primary tracking-tight">
              Executive Cashflow Audit & CFO Sign-Off Dossier
            </h3>
            <span className="text-[11px] font-mono text-text-muted">
              {SHOP_METADATA.legalEntity} • Tax ID: {SHOP_METADATA.taxId}
            </span>
          </div>
        </div>

        {/* Section 1: Risk Identification */}
        <div className="p-4 rounded-xl bg-crimson/5 border border-crimson/25 mb-4 font-mono text-xs">
          <div className="flex items-center justify-between font-bold text-text-primary mb-2">
            <span className="flex items-center gap-1.5 text-crimson">
              <AlertTriangle className="w-3.5 h-3.5" />
              1. Baseline Risk Identification
            </span>
            <span className="text-crimson tabular-nums">-10,000,000 ₫ Deficit</span>
          </div>
          <p className="text-text-secondary text-[11px] leading-relaxed">
            Projected closing balance for Week 2 plunged to 150M VND, breaching the mandatory 160M VND buffer threshold due to 14-day marketplace escrow holdbacks and factory invoice deadlines.
          </p>
        </div>

        {/* Section 2: Approved Mitigation Directives */}
        <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main mb-4 font-mono text-xs">
          <span className="font-bold text-text-primary block mb-2">2. Approved Tactical Mitigation Directives</span>
          <div className="space-y-1.5 text-text-secondary text-[11px]">
            <div>• Negotiate 14-day vendor extension on 40M VND with 1688 OEM factory (shifted to Week 4).</div>
            <div>• Apply 2% early cash discount to accelerate 50M VND in wholesale distributor receivables.</div>
          </div>
        </div>

        {/* Section 3: Financial Impact Post-Mitigation */}
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/25 mb-6 font-mono text-xs">
          <div className="flex items-center justify-between font-bold text-text-primary mb-2">
            <span className="text-emerald-600 dark:text-emerald-400">3. Financial Impact Post-Mitigation</span>
            <span className="text-emerald-600 dark:text-emerald-400 tabular-nums">+79M VND Above Buffer</span>
          </div>
          <div className="text-text-secondary text-[11px] space-y-1">
            <div>• Week 2 closing cash elevated to: <span className="text-text-primary font-bold tabular-nums">239,000,000 VND</span></div>
            <div>• Total cost of capital: <span className="text-text-primary tabular-nums">1,000,000 VND</span></div>
            <div>• Solvency determination: <span className="text-emerald-600 dark:text-emerald-400 font-semibold">DEFICIT COMPLETELY NEUTRALIZED</span></div>
          </div>
        </div>

        {/* Section 4: Cryptographic Sign-Off & Verification */}
        <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-5 h-5 ${isSigned ? 'text-emerald-500' : 'text-text-muted'}`} />
            <div className="flex flex-col">
              <span className="text-xs font-mono font-semibold text-text-primary">
                {isSigned ? 'Digitally Signed & Certified' : 'Ready For Executive Sign-Off'}
              </span>
              <span className="text-[10px] text-text-muted">Chief Financial Officer (CFO)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 rounded-lg text-xs font-mono text-text-secondary hover:text-text-primary bg-bg-surface-elevated hover:bg-border-main border border-border-main transition-colors shadow-xs"
            >
              Close
            </button>
            <button
              onClick={handleSignAndExport}
              className="w-1/2 sm:w-auto px-5 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Confirm Sign-Off & Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
