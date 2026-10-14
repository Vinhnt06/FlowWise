'use client';

import React from 'react';
import Image from 'next/image';
import {
  Wallet,
  Coins,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  UploadCloud,
  ArrowRight,
  Sparkles,
  TrendingDown,
  Layers,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import {
  VND_SUMMARY,
  CNY_SUMMARY,
  USD_SUMMARY,
  VND_BASELINE_FORECAST,
  CNY_BASELINE_FORECAST,
  USD_BASELINE_FORECAST,
} from '@/data/shopx-dataset';
import { formatCurrencyAmount } from '@/lib/finance-engine';
import InteractiveForecastChart from '@/components/charts/InteractiveForecastChart';

interface ScreenD2OverviewProps {
  onNavigateToForecast: () => void;
  onNavigateToSimulator: () => void;
  onNavigateToUpload?: () => void;
}

export default function ScreenD2Overview({
  onNavigateToForecast,
  onNavigateToSimulator,
  onNavigateToUpload,
}: ScreenD2OverviewProps) {
  const recentTransactions = [
    {
      id: 'tx-1',
      title: 'Shopee Payout (Week 40 Batch)',
      date: 'Today, 10:30 AM',
      amount: 45_000_000,
      type: 'IN',
      currency: 'VND',
      badge: 'Shopee Mall',
    },
    {
      id: 'tx-2',
      title: '1688 OEM Factory Batch Payment',
      date: 'Yesterday, 03:45 PM',
      amount: 120_000_000,
      type: 'OUT',
      currency: 'VND',
      badge: '1688 OEM',
    },
    {
      id: 'tx-3',
      title: 'Warehouse & Fulfillment Lease',
      date: 'Oct 02, 2026',
      amount: 30_000_000,
      type: 'OUT',
      currency: 'VND',
      badge: 'Operations',
    },
    {
      id: 'tx-4',
      title: 'TikTok Shop Net Settlement',
      date: 'Oct 01, 2026',
      amount: 35_000_000,
      type: 'IN',
      currency: 'VND',
      badge: 'TikTok Shop',
    },
  ];

  // Precision 13-Week Mathematical Area Sparkline
  const renderSparkline = (
    values: number[],
    strokeColor: string,
    gradientId: string
  ) => {
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const width = 220;
    const height = 44;
    const paddingX = 5;
    const paddingY = 7;
    const availableW = width - paddingX * 2;
    const availableH = height - paddingY * 2;

    const points = values.map((v, i) => {
      const x = paddingX + (i / (values.length - 1)) * availableW;
      const y = height - paddingY - ((v - min) / range) * availableH;
      return { x, y };
    });

    // Smooth continuous cubic bezier curve
    let pathD = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
    const clampY = (val: number) => Math.max(paddingY / 2, Math.min(height - paddingY / 2, val));

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) * 0.16;
      const cp1y = clampY(p1.y + (p2.y - p0.y) * 0.16);
      const cp2x = p2.x - (p3.x - p1.x) * 0.16;
      const cp2y = clampY(p2.y - (p3.y - p1.y) * 0.16);

      pathD += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const lastPoint = points[points.length - 1];
    const firstPoint = points[0];
    const areaD = `${pathD} L ${lastPoint.x.toFixed(1)} ${height} L ${firstPoint.x.toFixed(1)} ${height} Z`;

    return (
      <div className="h-11 w-full mb-3">
        <svg
          className="w-full h-full overflow-visible"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill={`url(#${gradientId})`} />
          <path
            d={pathD}
            stroke={strokeColor}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Endpoint Pulse & Dot */}
          <circle cx={lastPoint.x} cy={lastPoint.y} r="3" fill={strokeColor} />
          <circle cx={lastPoint.x} cy={lastPoint.y} r="6" fill={strokeColor} fillOpacity="0.2" />
        </svg>
      </div>
    );
  };

  const vndValues = VND_BASELINE_FORECAST.map((w) => w.closingBalance);
  const cnyValues = CNY_BASELINE_FORECAST.map((w) => w.closingBalance);
  const usdValues = USD_BASELINE_FORECAST.map((w) => w.closingBalance);

  return (
    <div className="space-y-8">
      {/* Enterprise Data Ingestion Quick-Action Callout */}
      {onNavigateToUpload && (
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-bg-surface to-bg-surface border border-primary/30 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-bold shrink-0">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-text-primary">
                  Enterprise Data Ingestion & Ledger Intake
                </h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-primary text-white font-semibold">
                  STEP 1: INGESTION
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-0.5">
                Upload Shopee, TikTok Shop, or 1688 factory exports, or manually tune enterprise opening balances and platform deductions for 13-week liquidity modeling.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onNavigateToUpload}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-xs transition-all flex items-center gap-2 shrink-0 active:scale-95"
          >
            <span>Ingest Enterprise Data</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* SPEC M04: 5-Second Executive Health Pulse */}
      <div className="rounded-2xl bg-bg-surface border border-border-main p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber/15 text-amber flex items-center justify-center font-bold shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                EXECUTIVE LIQUIDITY PULSE (SPEC M04)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber/15 text-amber border border-amber/30">
                1 Deficit Week Flagged
              </span>
            </div>
            <p className="text-xs text-text-primary font-medium mt-0.5">
              Operating treasury is fully solvent overall, but faces an isolated <strong>10,000,000 VND shortfall in Week 2</strong> due to 1688 OEM payables and platform escrow lag.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between md:justify-end">
          <div className="px-3 py-1.5 rounded-xl bg-bg-surface-elevated border border-border-main text-right">
            <span className="text-[10px] font-mono text-text-muted block">Runway</span>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">13+ Weeks</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-bg-surface-elevated border border-border-main text-right">
            <span className="text-[10px] font-mono text-text-muted block">Buffer Ratio</span>
            <span className="text-xs font-mono font-bold text-amber">87.5% (W2)</span>
          </div>
          <button
            type="button"
            onClick={onNavigateToSimulator}
            className="px-3.5 py-2 rounded-xl text-xs font-mono font-bold text-black bg-amber hover:bg-amber/90 transition-all shadow-xs flex items-center gap-1.5 active:scale-95"
          >
            <span>Resolve Gap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3 Large Currency Balance Cards with 3D Coin Medallions & Accurate Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: VND Operating Cash */}
        <div className="rounded-2xl bg-bg-surface border border-vnd/30 p-6 shadow-xs hover:border-vnd/60 transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/coin-vnd.jpg"
                alt="VND Medallion"
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover shadow-xs border border-vnd/40 group-hover:scale-105 transition-transform"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Operating Cashflow (VND)
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="font-mono text-3xl font-extrabold text-vnd tracking-tight mb-2 tabular-nums">
            {formatCurrencyAmount(VND_SUMMARY.currentBalance, 'VND')}
          </div>

          {/* Precision 13-Week Area Sparkline */}
          {renderSparkline(vndValues, '#059669', 'sparkline-vnd-grad')}

          <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">Safe Buffer: 160M VND</span>
            <span className="text-vnd bg-vnd/10 px-2 py-0.5 rounded font-semibold">
              Currently Maintained
            </span>
          </div>
        </div>

        {/* Card 2: CNY Supplier Payables */}
        <div className="rounded-2xl bg-bg-surface border border-cny/30 p-6 shadow-xs hover:border-cny/60 transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/coin-cny.jpg"
                alt="CNY Medallion"
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover shadow-xs border border-cny/40 group-hover:scale-105 transition-transform"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Supplier Payables (CNY)
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-cny" />
          </div>

          <div className="font-mono text-3xl font-extrabold text-cny tracking-tight mb-2 tabular-nums">
            {formatCurrencyAmount(CNY_SUMMARY.currentBalance, 'CNY')}
          </div>

          {/* Precision 13-Week Area Sparkline */}
          {renderSparkline(cnyValues, '#EA580C', 'sparkline-cny-grad')}

          <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">1688 Vendor Terms:</span>
            <span className="text-cny bg-cny/10 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Due in 10 Days
            </span>
          </div>
        </div>

        {/* Card 3: USD Cross-Border Reserves */}
        <div className="rounded-2xl bg-bg-surface border border-usd/30 p-6 shadow-xs hover:border-usd/60 transition-all duration-200 group">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/coin-usd.jpg"
                alt="USD Medallion"
                width={28}
                height={28}
                className="w-7 h-7 rounded-full object-cover shadow-xs border border-usd/40 group-hover:scale-105 transition-transform"
              />
              <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                Global Ad & Freight Reserves (USD)
              </span>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-usd" />
          </div>

          <div className="font-mono text-3xl font-extrabold text-usd tracking-tight mb-2 tabular-nums">
            {formatCurrencyAmount(USD_SUMMARY.currentBalance, 'USD')}
          </div>

          {/* Precision 13-Week Area Sparkline */}
          {renderSparkline(usdValues, '#2563EB', 'sparkline-usd-grad')}

          <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">Ad Spend & Logistics:</span>
            <span className="text-usd bg-usd/10 px-2 py-0.5 rounded font-semibold">
              Adequate Buffer
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Left (Interactive 13-Week Chart) | Right (Recent Transactions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive 13-Week Forecast Cockpit */}
        <div className="lg:col-span-7 rounded-2xl bg-bg-surface border border-border-main p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <div>
                <h3 className="text-base font-bold text-text-primary tracking-tight">
                  13-Week Liquidity Trajectory (VND Ledger)
                </h3>
                <span className="text-xs text-text-muted">
                  Interactive mathematical baseline model for ShopX
                </span>
              </div>
              <button
                type="button"
                onClick={onNavigateToForecast}
                className="text-xs font-mono text-primary hover:underline font-semibold"
              >
                Open Fullscreen Trajectory &rarr;
              </button>
            </div>

            {/* Real Interactive Forecast Chart */}
            <InteractiveForecastChart
              weeks={VND_BASELINE_FORECAST}
              currency="VND"
              bufferThreshold={160_000_000}
              selectedWeek={2}
              onSelectWeek={onNavigateToForecast}
              onNavigateToSimulator={onNavigateToSimulator}
              heightClassName="h-64 sm:h-72"
              showScrubber={true}
            />
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-amber/10 border border-amber/25 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-amber font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Liquidity shortfall of 10M VND detected in Week 2 below safety buffer.</span>
            </div>
            <button
              type="button"
              onClick={onNavigateToSimulator}
              className="px-3 py-1 rounded-lg text-xs font-bold text-black bg-amber hover:bg-amber/90 transition-colors shrink-0"
            >
              Simulate Rescue
            </button>
          </div>
        </div>

        {/* Right Column: Recent Transactions Feed */}
        <div className="lg:col-span-5 rounded-2xl bg-bg-surface border border-border-main p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
            <h3 className="text-base font-bold text-text-primary tracking-tight">Recent Ledger Activity</h3>
            <span className="text-xs font-mono text-text-muted">Latest Sync</span>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-bg-surface-elevated border border-border-main hover:border-border-subtle transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-text-primary">{tx.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-surface text-text-muted border border-border-main font-sans">
                      {tx.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-text-muted">{tx.date}</span>
                </div>

                <div
                  className={`font-bold flex items-center gap-1 tabular-nums ${
                    tx.type === 'IN' ? 'text-emerald-600 dark:text-emerald-400' : 'text-crimson'
                  }`}
                >
                  {tx.type === 'IN' ? '+' : '-'}
                  {formatCurrencyAmount(tx.amount, 'VND')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SPEC M06: Deficit Root Cause Drivers Breakdown */}
      <div className="rounded-2xl bg-bg-surface border border-border-main p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-border-subtle">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-text-primary tracking-tight">
                Deficit Root Cause Drivers (Spec M06 — Week 2 Breakdown)
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-crimson/15 text-crimson border border-crimson/30">
                10M VND GAP
              </span>
            </div>
            <p className="text-xs text-text-muted mt-0.5">
              Exact mathematical decomposition of the 240,000,000 VND total weekly outflow pulling Week 2 closing balance below the 160M VND safe threshold.
            </p>
          </div>

          <button
            type="button"
            onClick={onNavigateToSimulator}
            className="text-xs font-mono font-bold text-primary hover:underline flex items-center gap-1.5 shrink-0"
          >
            <span>Simulate Mitigation Levers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Driver 1 */}
          <div className="p-4 rounded-xl bg-bg-surface-elevated/70 border border-border-main hover:border-cny/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cny/10 text-cny border border-cny/25">
                DRIVER 1 • 75.0% OF OUTFLOW
              </span>
              <span className="text-xs font-mono font-bold text-crimson tabular-nums">180,000,000 ₫</span>
            </div>
            <h4 className="text-xs font-bold text-text-primary mb-1">
              1688 OEM Factory Batch Settlement
            </h4>
            <p className="text-[11px] font-mono text-text-muted leading-relaxed">
              Wholesale cosmetic inventory batch due on 14-day terms. Mitigable by negotiating a 14-day deferral (Lever 2).
            </p>
            <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[10px] font-mono text-text-secondary">
              <span>Source: Supplier Invoice #1688-GZ</span>
              <span className="text-cny font-bold">Reschedulable</span>
            </div>
          </div>

          {/* Driver 2 */}
          <div className="p-4 rounded-xl bg-bg-surface-elevated/70 border border-border-main hover:border-border-strong transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-bg-surface text-text-muted border border-border-main">
                DRIVER 2 • 25.0% OF OUTFLOW
              </span>
              <span className="text-xs font-mono font-bold text-crimson tabular-nums">60,000,000 ₫</span>
            </div>
            <h4 className="text-xs font-bold text-text-primary mb-1">
              Central Warehouse Lease & Distribution
            </h4>
            <p className="text-[11px] font-mono text-text-muted leading-relaxed">
              Fixed commercial hub rental and logistics fulfillment retainer. Rigid contractual obligation without penalty waiver.
            </p>
            <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[10px] font-mono text-text-secondary">
              <span>Source: Contract #WH-SGN-2026</span>
              <span className="text-text-muted">Fixed OPEX</span>
            </div>
          </div>

          {/* Driver 3 */}
          <div className="p-4 rounded-xl bg-bg-surface-elevated/70 border border-border-main hover:border-primary/40 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/25">
                DRIVER 3 • ESCROW LAG
              </span>
              <span className="text-xs font-mono font-bold text-amber tabular-nums">~11,000,000 ₫</span>
            </div>
            <h4 className="text-xs font-bold text-text-primary mb-1">
              Shopee & TikTok Escrow Holdback
            </h4>
            <p className="text-[11px] font-mono text-text-muted leading-relaxed">
              Standard 10% marketplace buyer confirmation reserve held under T+3/T+7 lag; scheduled for automatic release in Week 3.
            </p>
            <div className="mt-3 pt-2 border-t border-border-subtle flex items-center justify-between text-[10px] font-mono text-text-secondary">
              <span>Source: Settlement Reserve Ledger</span>
              <span className="text-primary font-bold">Unlocks W3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
