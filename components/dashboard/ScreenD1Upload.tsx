'use client';

import React, { useState } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Download,
  ArrowRight,
} from 'lucide-react';
import { formatCurrencyAmount } from '@/lib/finance-engine';

export default function ScreenD1Upload({ onProceed }: { onProceed?: () => void }) {
  const [selectedSource, setSelectedSource] = useState<'SHOPEE' | 'TIKTOK' | '1688' | 'BANK'>('SHOPEE');
  const [isProcessing, setIsProcessing] = useState(false);

  const sampleRows = [
    {
      date: '2026-10-06',
      orderSn: 'SP261006001',
      channel: 'Shopee',
      gross: 45_000_000,
      fee: 5_400_000,
      refund: 2_250_000,
      shipping: 1_350_000,
      hold: 4_500_000,
      net: 31_500_000,
      status: 'Reconciled',
    },
    {
      date: '2026-10-07',
      orderSn: 'SP261007002',
      channel: 'Shopee',
      gross: 62_000_000,
      fee: 7_440_000,
      refund: 3_100_000,
      shipping: 1_860_000,
      hold: 6_200_000,
      net: 43_400_000,
      status: 'Reconciled',
    },
    {
      date: '2026-10-08',
      orderSn: 'SP261008003',
      channel: 'Shopee',
      gross: 38_000_000,
      fee: 4_560_000,
      refund: 1_900_000,
      shipping: 1_140_000,
      hold: 3_800_000,
      net: 26_600_000,
      status: 'Reconciled',
    },
    {
      date: '2026-10-09',
      orderSn: 'TTS261008B',
      channel: 'TikTok Shop',
      gross: 48_000_000,
      fee: 6_240_000,
      refund: 2_400_000,
      shipping: 1_440_000,
      hold: 4_800_000,
      net: 33_120_000,
      status: 'Reconciled',
    },
    {
      date: '2026-10-10',
      orderSn: 'TTS261010C',
      channel: 'TikTok Shop',
      gross: 52_000_000,
      fee: 6_760_000,
      refund: 2_600_000,
      shipping: 1_560_000,
      hold: 5_200_000,
      net: 35_880_000,
      status: 'Reconciled',
    },
    {
      date: '2026-10-12',
      orderSn: 'SP261012006',
      channel: 'Shopee',
      gross: 90_000_000,
      fee: 10_800_000,
      refund: 4_500_000,
      shipping: 2_700_000,
      hold: 9_000_000,
      net: 63_000_000,
      status: 'Reconciled',
    },
  ];

  const handleSimulateUpload = (source: 'SHOPEE' | 'TIKTOK' | '1688' | 'BANK') => {
    setSelectedSource(source);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="space-y-6">
      {/* Header Statement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Multi-Platform Settlement Ingestion</h2>
          <span className="text-xs text-text-muted">
            Automated reconciliation and escrow holdback extraction for Shopee, TikTok Shop, and factory invoices
          </span>
        </div>

        {/* Formula reminder pill */}
        <div className="px-3.5 py-1.5 rounded-xl bg-bg-surface border border-border-main text-[11px] font-mono text-text-secondary flex items-center gap-2 shadow-xs">
          <span className="text-primary font-bold">Theorem:</span>
          <span>Net = Gross - Platform Fee - Refunds - Shipping/COD - Escrow Hold</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Multi-Source Selectors */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl bg-bg-surface border border-border-main p-5 shadow-xs transition-colors duration-200">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted block mb-4">
              Select Source or Drop Ledger File
            </span>

            {/* Drop Zone Box */}
            <div className="border-2 border-dashed border-primary/30 rounded-xl p-6 text-center bg-bg-surface-elevated hover:border-primary transition-colors cursor-pointer mb-4">
              <UploadCloud className="w-8 h-8 text-primary mx-auto mb-2" />
              <span className="text-xs font-semibold text-text-primary block mb-1">
                Drag & drop files or choose preset
              </span>
              <span className="text-[10px] text-text-muted block">Supports CSV and XLSX from e-commerce portals</span>
            </div>

            {/* Quick 1-Click Preset Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleSimulateUpload('SHOPEE')}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedSource === 'SHOPEE'
                    ? 'bg-bg-surface-elevated border-primary text-text-primary shadow-xs'
                    : 'bg-bg-surface-elevated/40 border-border-main text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-[#EE4D2D] flex items-center justify-center text-white text-[10px] font-bold">
                    S
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">Shopee Settlement CSV</span>
                    <span className="text-[10px] text-text-muted">Seller Centre payout batch</span>
                  </div>
                </div>
                {selectedSource === 'SHOPEE' && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </button>

              <button
                onClick={() => handleSimulateUpload('TIKTOK')}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedSource === 'TIKTOK'
                    ? 'bg-bg-surface-elevated border-primary text-text-primary shadow-xs'
                    : 'bg-bg-surface-elevated/40 border-border-main text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-neutral-900 flex items-center justify-center text-white text-[10px] font-bold border border-border-subtle">
                    TT
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">TikTok Shop Income CSV</span>
                    <span className="text-[10px] text-text-muted">Income Center & creator deductions</span>
                  </div>
                </div>
                {selectedSource === 'TIKTOK' && <CheckCircle2 className="w-4 h-4 text-primary" />}
              </button>

              <button
                onClick={() => handleSimulateUpload('1688')}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedSource === '1688'
                    ? 'bg-bg-surface-elevated border-cny text-text-primary shadow-xs'
                    : 'bg-bg-surface-elevated/40 border-border-main text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-cny flex items-center justify-center text-white text-[9px] font-mono font-bold">
                    1688
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">1688 Vendor Invoices</span>
                    <span className="text-[10px] text-text-muted">Guangzhou factory payables (CNY)</span>
                  </div>
                </div>
                {selectedSource === '1688' && <CheckCircle2 className="w-4 h-4 text-cny" />}
              </button>

              <button
                onClick={() => handleSimulateUpload('BANK')}
                className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                  selectedSource === 'BANK'
                    ? 'bg-bg-surface-elevated border-usd text-text-primary shadow-xs'
                    : 'bg-bg-surface-elevated/40 border-border-main text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded bg-usd/15 border border-usd/30 flex items-center justify-center text-usd text-[10px] font-bold">
                    MB
                  </div>
                  <div>
                    <span className="text-xs font-semibold block">Commercial Bank Statement</span>
                    <span className="text-[10px] text-text-muted">Actual rent & payroll outflows</span>
                  </div>
                </div>
                {selectedSource === 'BANK' && <CheckCircle2 className="w-4 h-4 text-usd" />}
              </button>
            </div>

            {/* Download Sample Files Link */}
            <div className="pt-4 mt-4 border-t border-border-subtle flex items-center justify-between text-[11px] font-mono">
              <span className="text-text-muted">Download sample CSV:</span>
              <a
                href="/sample-data/shopee_settlement_sample.csv"
                download
                className="text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <Download className="w-3 h-3" />
                Shopee.csv
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Parsed Data Table Preview */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl bg-bg-surface border border-border-main p-5 shadow-xs transition-colors duration-200">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold text-text-primary">Parsed Multi-Channel Ledger Preview</span>
              </div>
              <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3 h-3" />
                Normalized 100%
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-text-muted text-[11px]">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Channel</th>
                    <th className="pb-3 font-medium text-right">Gross GMV</th>
                    <th className="pb-3 font-medium text-right">Platform Fee</th>
                    <th className="pb-3 font-medium text-right">Escrow Hold</th>
                    <th className="pb-3 font-medium text-right text-emerald-600 dark:text-emerald-400">Net Payout</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {sampleRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-bg-surface-elevated/50 transition-colors">
                      <td className="py-3 text-text-primary">{row.date}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                          row.channel === 'Shopee'
                            ? 'bg-[#EE4D2D]/15 text-[#EE4D2D] border border-[#EE4D2D]/30'
                            : 'bg-neutral-800 text-neutral-100 border border-neutral-700'
                        }`}>
                          {row.channel}
                        </span>
                      </td>
                      <td className="py-3 text-right text-text-secondary tabular-nums">
                        {formatCurrencyAmount(row.gross, 'VND')}
                      </td>
                      <td className="py-3 text-right text-crimson tabular-nums">
                        -{formatCurrencyAmount(row.fee, 'VND')}
                      </td>
                      <td className="py-3 text-right text-amber tabular-nums">
                        -{formatCurrencyAmount(row.hold, 'VND')}
                      </td>
                      <td className="py-3 text-right font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                        +{formatCurrencyAmount(row.net, 'VND')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Progress Bar & Next Action Button */}
            <div className="pt-6 mt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/2">
                <div className="flex justify-between text-[11px] font-mono text-text-muted mb-1">
                  <span>Data Ingestion Pipeline:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Normalized</span>
                </div>
                <div className="w-full bg-border-main h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-full" />
                </div>
              </div>

              {onProceed && (
                <button
                  onClick={onProceed}
                  className="px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span>Proceed to 13-Week Trajectory</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
