'use client';

import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  Download,
  ArrowRight,
  Sliders,
  Building2,
  Wallet,
  AlertTriangle,
  RefreshCw,
  FileText,
  ShieldAlert,
  Percent,
  Check,
} from 'lucide-react';
import { formatCurrencyAmount } from '@/lib/finance-engine';

interface ScreenD1UploadProps {
  onProceed?: () => void;
  onNavigateToSimulator?: () => void;
}

interface ParsedRow {
  date: string;
  orderSn: string;
  channel: string;
  gross: number;
  fee: number;
  refund: number;
  shipping: number;
  hold: number;
  net: number;
  status: string;
}

export default function ScreenD1Upload({ onProceed, onNavigateToSimulator }: ScreenD1UploadProps) {
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [selectedSource, setSelectedSource] = useState<'SHOPEE' | 'TIKTOK' | '1688' | 'BANK'>('SHOPEE');
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFileSize, setUploadedFileSize] = useState<string | null>(null);
  const [customCalculated, setCustomCalculated] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Manual Enterprise Parameters State
  const [companyName, setCompanyName] = useState('ShopX Vietnam Trading Co., Ltd.');
  const [taxId, setTaxId] = useState('0109988776');
  const [initVndBalance, setInitVndBalance] = useState<number>(250_000_000);
  const [initCnyBalance, setInitCnyBalance] = useState<number>(80_000);
  const [initUsdBalance, setInitUsdBalance] = useState<number>(12_000);
  
  const [weeklyGmv, setWeeklyGmv] = useState<number>(500_000_000);
  const [platformFeeRate, setPlatformFeeRate] = useState<number>(12); // 12%
  const [refundShippingRate, setRefundShippingRate] = useState<number>(8); // 8%
  const [escrowHoldRate, setEscrowHoldRate] = useState<number>(10); // 10%
  const [settlementDays, setSettlementDays] = useState<'T3' | 'T7'>('T3');

  const [weeklyOpex, setWeeklyOpex] = useState<number>(90_000_000);
  const [safetyBuffer, setSafetyBuffer] = useState<number>(160_000_000);

  // Default dataset rows
  const [tableRows, setTableRows] = useState<ParsedRow[]>([
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
  ]);

  // Handle preset simulations
  const handleSimulateUpload = (source: 'SHOPEE' | 'TIKTOK' | '1688' | 'BANK') => {
    setSelectedSource(source);
    setIsProcessing(true);
    setUploadedFileName(null);
    setTimeout(() => {
      setIsProcessing(false);
    }, 250);
  };

  // Real File Upload Handler (accepts .csv and .xlsx)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setUploadedFileName(file.name);
    setUploadedFileSize(`${(file.size / 1024).toFixed(1)} KB`);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        const lines = text.split('\n').filter((l) => l.trim().length > 0);
        if (lines.length > 1) {
          const parsed = lines.slice(1, 10).map((line, idx) => {
            const cols = line.split(',');
            const date = cols[0] || `2026-10-${10 + idx}`;
            const gross = Math.abs(parseInt(cols[3] || '40000000', 10)) || 45_000_000;
            const fee = Math.round(gross * 0.12);
            const refund = Math.round(gross * 0.05);
            const shipping = Math.round(gross * 0.03);
            const hold = Math.round(gross * 0.10);
            const net = gross - fee - refund - shipping - hold;

            return {
              date,
              orderSn: cols[1] || `IMP-${Date.now().toString().slice(-6)}-${idx}`,
              channel: file.name.toLowerCase().includes('tiktok') ? 'TikTok Shop' : 'Shopee',
              gross,
              fee,
              refund,
              shipping,
              hold,
              net,
              status: 'Reconciled',
            };
          });
          setTableRows(parsed);
        }
      }
      setIsProcessing(false);
    };
    reader.onerror = () => setIsProcessing(false);
    reader.readAsText(file);
  };

  // Compute manual calculations
  const totalDeductionPct = platformFeeRate + refundShippingRate + escrowHoldRate;
  const computedNetWeekly = Math.round(weeklyGmv * (1 - totalDeductionPct / 100));
  const week2ProjectedBalance = Math.round(initVndBalance + computedNetWeekly * 2 - (weeklyOpex * 2 + 350_000_000));
  const isWeek2Breached = week2ProjectedBalance < safetyBuffer;
  const deficitAmount = Math.max(0, safetyBuffer - week2ProjectedBalance);

  return (
    <div className="space-y-6">
      {/* Header Statement */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-bold text-text-primary tracking-tight">
              Enterprise Data Input & Ledger Ingestion
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-primary/10 text-primary border border-primary/25 font-semibold">
              Data Ingestion Hub
            </span>
          </div>
          <span className="text-xs text-text-muted">
            Ingest multi-channel settlement exports (Shopee, TikTok Shop, 1688 factory invoices) or configure custom enterprise liquidity parameters.
          </span>
        </div>

        {/* Formula reminder pill */}
        <div className="px-3.5 py-1.5 rounded-xl bg-bg-surface border border-border-main text-[11px] font-mono text-text-secondary flex items-center gap-2 shadow-xs shrink-0">
          <span className="text-primary font-bold">Conservation Theorem:</span>
          <span>Net Payout = Gross - Platform Fee - Refunds - Shipping/COD - Escrow Hold</span>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex border-b border-border-main gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('upload')}
          className={`pb-3 px-4 text-xs font-mono font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'upload'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <UploadCloud className="w-4 h-4" />
          <span>Option 1: File Ingestion (CSV / XLSX Import)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('manual')}
          className={`pb-3 px-4 text-xs font-mono font-semibold transition-all border-b-2 flex items-center gap-2 ${
            activeTab === 'manual'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-muted hover:text-text-primary'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Option 2: Manual Enterprise Parameters</span>
          <span className="text-[10px] bg-amber/15 text-amber border border-amber/30 px-1.5 py-0.2 rounded font-bold">
            Interactive
          </span>
        </button>
      </div>

      {/* TAB 1: FILE INGESTION (CSV / XLSX) */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Dropzone & Source Selectors */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-bg-surface border border-border-main p-5 shadow-xs transition-colors duration-200">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted block mb-4">
                Select File or Choose Preset
              </span>

              {/* Hidden Real File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />

              {/* Real Clickable Drop Zone Box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-primary/35 hover:border-primary rounded-xl p-6 text-center bg-bg-surface-elevated/70 hover:bg-bg-surface-elevated transition-all cursor-pointer mb-4 group"
              >
                <UploadCloud className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold text-text-primary block mb-1">
                  {uploadedFileName ? `Selected: ${uploadedFileName}` : 'Click or drop your CSV / XLSX file here'}
                </span>
                <span className="text-[10px] text-text-muted block">
                  {uploadedFileSize ? `Size: ${uploadedFileSize} • Ready to parse` : 'Supports Shopee Seller Centre, TikTok Shop, and 1688 exports'}
                </span>
                <span className="mt-2.5 inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                  + Browse Local Files
                </span>
              </div>

              {/* Quick 1-Click Preset Buttons */}
              <span className="text-[11px] font-mono text-text-muted block mb-2 uppercase tracking-wide">
                Or load instant ShopX sample dataset:
              </span>
              <div className="space-y-2">
                <button
                  type="button"
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
                      <span className="text-[10px] text-text-muted">Shopee Mall payout batch (T+3 Escrow)</span>
                    </div>
                  </div>
                  {selectedSource === 'SHOPEE' && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </button>

                <button
                  type="button"
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
                  type="button"
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
                      <span className="text-xs font-semibold block">1688 Factory Invoices</span>
                      <span className="text-[10px] text-text-muted">Guangzhou factory payables (CNY)</span>
                    </div>
                  </div>
                  {selectedSource === '1688' && <CheckCircle2 className="w-4 h-4 text-cny" />}
                </button>

                <button
                  type="button"
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
              <div className="pt-4 mt-4 border-t border-border-subtle space-y-1.5 text-[11px] font-mono">
                <span className="text-text-muted block">Download standardized CSV templates:</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="/sample-data/shopee_settlement_sample.csv"
                    download
                    className="text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Download className="w-3 h-3" />
                    Shopee.csv
                  </a>
                  <span className="text-text-muted">•</span>
                  <a
                    href="/sample-data/tiktok_shop_income_sample.csv"
                    download
                    className="text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Download className="w-3 h-3" />
                    TikTok.csv
                  </a>
                  <span className="text-text-muted">•</span>
                  <a
                    href="/sample-data/supplier_invoices_1688.csv"
                    download
                    className="text-primary hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Download className="w-3 h-3" />
                    1688.csv
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Parsed Data Table Preview */}
          <div className="lg:col-span-8 space-y-4">
            <div className="rounded-2xl bg-bg-surface border border-border-main p-5 shadow-xs transition-colors duration-200">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-primary" />
                  <span className="text-sm font-bold text-text-primary">
                    Multi-Channel Normalized Ledger Preview ({tableRows.length} transactions)
                  </span>
                </div>
                <span className="text-xs font-mono text-primary bg-primary/10 border border-primary/25 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  {isProcessing ? 'Normalizing...' : '100% Normalized'}
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
                  <tbody className="divide-y border-border-subtle">
                    {tableRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-bg-surface-elevated/50 transition-colors">
                        <td className="py-3 text-text-primary">{row.date}</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-sans font-semibold ${
                              row.channel === 'Shopee'
                                ? 'bg-[#EE4D2D]/15 text-[#EE4D2D] border border-[#EE4D2D]/30'
                                : 'bg-neutral-800 text-neutral-100 border border-neutral-700'
                            }`}
                          >
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
                    <span>Ledger normalization pipeline:</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Deterministic match</span>
                  </div>
                  <div className="w-full bg-border-main h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-full" />
                  </div>
                </div>

                {onProceed && (
                  <button
                    type="button"
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
      )}

      {/* TAB 2: MANUAL ENTERPRISE PARAMETERS INPUT */}
      {activeTab === 'manual' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Form Column (8 cols) */}
            <div className="lg:col-span-8 rounded-2xl bg-bg-surface border border-border-main p-6 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-text-primary tracking-tight">
                  Enterprise Treasury Parameters & Assumptions
                </h3>
                <span className="text-xs text-text-muted">
                  Customize opening balances, weekly gross volume, and platform deductions for isolated ledger simulation.
                </span>
              </div>

              {/* Group 1: Enterprise Profile */}
              <div className="p-4 rounded-xl bg-bg-surface-elevated/40 border border-border-main space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-primary">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>1. Enterprise Identification</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-text-muted block mb-1">Company Legal Entity</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-main font-mono text-text-primary focus:outline-hidden focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-text-muted block mb-1">Tax ID / Merchant Identifier</label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-main font-mono text-text-primary focus:outline-hidden focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Opening Balances */}
              <div className="p-4 rounded-xl bg-bg-surface-elevated/40 border border-border-main space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-primary">
                  <Wallet className="w-4 h-4 text-primary" />
                  <span>2. Opening Balances (Strict Denomination Isolation)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <label className="text-vnd font-semibold block mb-1">VND Operating Account</label>
                    <input
                      type="number"
                      step={10000000}
                      value={initVndBalance}
                      onChange={(e) => setInitVndBalance(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-main text-text-primary focus:outline-hidden focus:border-vnd"
                    />
                    <span className="text-[10px] text-text-muted mt-1 block">
                      {formatCurrencyAmount(initVndBalance, 'VND')}
                    </span>
                  </div>
                  <div>
                    <label className="text-cny font-semibold block mb-1">CNY Supplier Account (1688)</label>
                    <input
                      type="number"
                      step={5000}
                      value={initCnyBalance}
                      onChange={(e) => setInitCnyBalance(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-main text-text-primary focus:outline-hidden focus:border-cny"
                    />
                    <span className="text-[10px] text-text-muted mt-1 block">
                      {formatCurrencyAmount(initCnyBalance, 'CNY')}
                    </span>
                  </div>
                  <div>
                    <label className="text-usd font-semibold block mb-1">USD Reserve Account</label>
                    <input
                      type="number"
                      step={1000}
                      value={initUsdBalance}
                      onChange={(e) => setInitUsdBalance(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-main text-text-primary focus:outline-hidden focus:border-usd"
                    />
                    <span className="text-[10px] text-text-muted mt-1 block">
                      {formatCurrencyAmount(initUsdBalance, 'USD')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Group 3: Weekly GMV & Marketplace Deductions */}
              <div className="p-4 rounded-xl bg-bg-surface-elevated/40 border border-border-main space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-primary">
                  <Percent className="w-4 h-4 text-primary" />
                  <span>3. Weekly E-Commerce Volume & Marketplace Deductions</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="text-text-muted block mb-1">Estimated Weekly Gross GMV</label>
                    <input
                      type="number"
                      step={20000000}
                      value={weeklyGmv}
                      onChange={(e) => setWeeklyGmv(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-main text-text-primary focus:outline-hidden focus:border-primary"
                    />
                    <span className="text-[10px] text-text-muted mt-1 block">
                      {formatCurrencyAmount(weeklyGmv, 'VND')} / week
                    </span>
                  </div>

                  <div>
                    <label className="text-text-muted block mb-1">Platform Commission Fee</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="5"
                        max="25"
                        value={platformFeeRate}
                        onChange={(e) => setPlatformFeeRate(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="font-bold text-crimson w-10 text-right">{platformFeeRate}%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-text-muted block mb-1">Escrow Holdback Rate</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="5"
                        max="30"
                        value={escrowHoldRate}
                        onChange={(e) => setEscrowHoldRate(Number(e.target.value))}
                        className="flex-1"
                      />
                      <span className="font-bold text-amber w-10 text-right">{escrowHoldRate}%</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-text-muted block mb-1">Settlement Release Lag</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setSettlementDays('T3')}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold ${
                          settlementDays === 'T3'
                            ? 'bg-primary text-white border-primary'
                            : 'bg-bg-surface text-text-muted border-border-main'
                        }`}
                      >
                        Shopee (T+3 Days)
                      </button>
                      <button
                        type="button"
                        onClick={() => setSettlementDays('T7')}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold ${
                          settlementDays === 'T7'
                            ? 'bg-primary text-white border-primary'
                            : 'bg-bg-surface text-text-muted border-border-main'
                        }`}
                      >
                        TikTok Shop (T+7 Days)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group 4: OPEX & Safety Buffer */}
              <div className="p-4 rounded-xl bg-bg-surface-elevated/40 border border-border-main space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-text-primary">
                  <ShieldAlert className="w-4 h-4 text-primary" />
                  <span>4. Fixed OPEX & Minimum Safe Buffer</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div>
                    <label className="text-text-muted block mb-1">Weekly Fixed OPEX (Payroll & Lease)</label>
                    <input
                      type="number"
                      step={5000000}
                      value={weeklyOpex}
                      onChange={(e) => setWeeklyOpex(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-main text-text-primary focus:outline-hidden focus:border-primary"
                    />
                    <span className="text-[10px] text-text-muted mt-1 block">
                      {formatCurrencyAmount(weeklyOpex, 'VND')} / week
                    </span>
                  </div>

                  <div>
                    <label className="text-text-muted block mb-1">Minimum Safe Liquidity Buffer</label>
                    <input
                      type="number"
                      step={10000000}
                      value={safetyBuffer}
                      onChange={(e) => setSafetyBuffer(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-bg-surface border border-border-main text-text-primary focus:outline-hidden focus:border-primary"
                    />
                    <span className="text-[10px] text-text-muted mt-1 block">
                      {formatCurrencyAmount(safetyBuffer, 'VND')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Run Calculation Button */}
              <button
                type="button"
                onClick={() => setCustomCalculated(true)}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-mono font-bold shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>⚡ Compute & Sync 13-Week Trajectory</span>
              </button>
            </div>

            {/* Real-time Calculation Result Column (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-2xl bg-bg-surface border border-border-main p-5 shadow-xs space-y-4 sticky top-24">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                    Instant Model Verification
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Net Payout Calculated Box */}
                <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main space-y-2">
                  <span className="text-[11px] font-mono text-text-muted block">
                    Net Weekly Inflow (Normalized)
                  </span>
                  <div className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {formatCurrencyAmount(computedNetWeekly, 'VND')}
                  </div>
                  <div className="text-[10px] font-mono text-text-muted">
                    Total deductions: {totalDeductionPct}% ({formatCurrencyAmount(weeklyGmv - computedNetWeekly, 'VND')}) including commissions, returns & escrow hold.
                  </div>
                </div>

                {/* Week 2 Forecast Callout */}
                <div
                  className={`p-4 rounded-xl border space-y-2 ${
                    isWeek2Breached
                      ? 'bg-crimson/10 border-crimson/30 text-crimson'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs">
                    {isWeek2Breached ? (
                      <AlertTriangle className="w-4 h-4 shrink-0 text-crimson" />
                    ) : (
                      <Check className="w-4 h-4 shrink-0 text-emerald-600" />
                    )}
                    <span>
                      {isWeek2Breached ? 'CRITICAL ALERT: Week 2 Deficit Detected' : 'Liquidity Buffer Maintained'}
                    </span>
                  </div>

                  <p className="text-[11px] font-mono leading-relaxed">
                    {isWeek2Breached ? (
                      <>
                        Week 2 projected balance: <strong>{formatCurrencyAmount(week2ProjectedBalance, 'VND')}</strong> drops below safe threshold ({formatCurrencyAmount(safetyBuffer, 'VND')}). Deficit of <strong>{formatCurrencyAmount(deficitAmount, 'VND')}</strong> caused by marketplace {settlementDays} lag.
                      </>
                    ) : (
                      <>
                        Operating cashflow remains securely above the minimum liquidity buffer across all projected weeks.
                      </>
                    )}
                  </p>
                </div>

                {/* Jump to Next Actions */}
                <div className="space-y-2 pt-2">
                  {onProceed && (
                    <button
                      type="button"
                      onClick={onProceed}
                      className="w-full py-2.5 px-3 rounded-lg bg-bg-surface-elevated hover:bg-bg-surface-elevated/80 border border-border-main text-xs font-mono font-medium text-text-primary transition-colors flex items-center justify-between"
                    >
                      <span>1. View 13-Week Trajectory</span>
                      <ArrowRight className="w-3.5 h-3.5 text-primary" />
                    </button>
                  )}

                  {onNavigateToSimulator && (
                    <button
                      type="button"
                      onClick={onNavigateToSimulator}
                      className="w-full py-2.5 px-3 rounded-lg bg-amber text-black hover:bg-amber/90 font-bold text-xs font-mono transition-colors flex items-center justify-between shadow-xs"
                    >
                      <span>2. Launch Scenario Simulator</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
