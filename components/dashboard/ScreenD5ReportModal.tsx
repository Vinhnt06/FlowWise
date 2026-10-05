'use client';

import React, { useState } from 'react';
import {
  X,
  FileCheck,
  CheckCircle2,
  Download,
  AlertTriangle,
  Printer,
  Sparkles,
  ShieldCheck,
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
      colors: ['#00D4AA', '#FACC15', '#4D9FFF'],
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8E8EA8] hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#00D4AA]/15 border border-[#00D4AA]/30 flex items-center justify-center text-[#00D4AA]">
            <FileCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Executive Cashflow Audit & CFO Sign-Off Dossier
            </h3>
            <span className="text-[11px] font-mono text-[#8E8EA8]">
              {SHOP_METADATA.legalEntity} • Tax ID: {SHOP_METADATA.taxId}
            </span>
          </div>
        </div>

        {/* Section 1: Risk Identification */}
        <div className="p-4 rounded-xl bg-[#161622] border border-[#FF4757]/30 mb-4 font-mono text-xs">
          <div className="flex items-center justify-between font-bold text-white mb-2">
            <span className="flex items-center gap-1.5 text-[#FF4757]">
              <AlertTriangle className="w-3.5 h-3.5" />
              1. Baseline Risk Identification
            </span>
            <span className="text-[#FF4757]">-10,000,000 ₫ Deficit</span>
          </div>
          <p className="text-[#8E8EA8] text-[11px] leading-relaxed">
            Projected closing balance for Week 2 plunged to 150M VND, breaching the mandatory 160M VND buffer threshold due to 14-day marketplace escrow holdbacks and factory invoice deadlines.
          </p>
        </div>

        {/* Section 2: Approved Mitigation Directives */}
        <div className="p-4 rounded-xl bg-[#161622] border border-[#232336] mb-4 font-mono text-xs">
          <span className="font-bold text-white block mb-2">2. Approved Tactical Mitigation Directives</span>
          <div className="space-y-1.5 text-[#A1A1BA] text-[11px]">
            <div>• Negotiate 14-day vendor extension on 40M VND with 1688 OEM factory (shifted to Week 4).</div>
            <div>• Apply 2% early cash discount to accelerate 50M VND in wholesale distributor receivables.</div>
          </div>
        </div>

        {/* Section 3: Financial Impact Post-Mitigation */}
        <div className="p-4 rounded-xl bg-[#00D4AA]/5 border border-[#00D4AA]/30 mb-6 font-mono text-xs">
          <div className="flex items-center justify-between font-bold text-white mb-2">
            <span className="text-[#00D4AA]">3. Financial Impact Post-Mitigation</span>
            <span className="text-[#00D4AA]">+79M VND Above Buffer</span>
          </div>
          <div className="text-[#A1A1BA] text-[11px] space-y-1">
            <div>• Week 2 closing cash elevated to: <span className="text-white font-bold">239,000,000 VND</span></div>
            <div>• Total cost of capital: <span className="text-white">1,000,000 VND</span></div>
            <div>• Solvency determination: <span className="text-[#00D4AA] font-semibold">DEFICIT COMPLETELY NEUTRALIZED</span></div>
          </div>
        </div>

        {/* Section 4: Cryptographic Sign-Off & Verification */}
        <div className="pt-4 border-t border-[#232336] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`w-5 h-5 ${isSigned ? 'text-[#00D4AA]' : 'text-[#8E8EA8]'}`} />
            <div className="flex flex-col">
              <span className="text-xs font-mono font-semibold text-white">
                {isSigned ? 'Digitally Signed & Certified' : 'Ready For Executive Sign-Off'}
              </span>
              <span className="text-[10px] text-[#8E8EA8]">Chief Financial Officer (CFO)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-mono text-[#8E8EA8] hover:text-white bg-[#161622] hover:bg-[#1F1F2E] border border-[#232336] transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleSignAndExport}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold text-black bg-[#00D4AA] hover:bg-[#05F3C4] shadow-lg shadow-[#00D4AA]/25 transition-all flex items-center justify-center gap-1.5"
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
