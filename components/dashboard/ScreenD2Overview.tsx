'use client';

import React from 'react';
import Image from 'next/image';
import {
  Wallet,
  Coins,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import {
  VND_SUMMARY,
  CNY_SUMMARY,
  USD_SUMMARY,
} from '@/data/shopx-dataset';
import { formatCurrencyAmount } from '@/lib/finance-engine';

interface ScreenD2OverviewProps {
  onNavigateToForecast: () => void;
  onNavigateToSimulator: () => void;
}

export default function ScreenD2Overview({
  onNavigateToForecast,
  onNavigateToSimulator,
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

  return (
    <div className="space-y-8">
      {/* 3 Large Currency Balance Cards with 3D Coin Medallions */}
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

          <div className="font-mono text-3xl font-extrabold text-vnd tracking-tight mb-4 tabular-nums">
            {formatCurrencyAmount(VND_SUMMARY.currentBalance, 'VND')}
          </div>

          {/* Mini Sparkline */}
          <div className="h-10 w-full mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 25" fill="none">
              <path
                d="M 0 15 Q 20 5, 40 18 T 80 8 T 100 12"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">Safe Buffer: 160M ₫</span>
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

          <div className="font-mono text-3xl font-extrabold text-cny tracking-tight mb-4 tabular-nums">
            {formatCurrencyAmount(CNY_SUMMARY.currentBalance, 'CNY')}
          </div>

          {/* Mini Sparkline */}
          <div className="h-10 w-full mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 25" fill="none">
              <path
                d="M 0 10 Q 30 20, 60 8 T 100 18"
                stroke="#F97316"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

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

          <div className="font-mono text-3xl font-extrabold text-usd tracking-tight mb-4 tabular-nums">
            {formatCurrencyAmount(USD_SUMMARY.currentBalance, 'USD')}
          </div>

          {/* Mini Sparkline */}
          <div className="h-10 w-full mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 25" fill="none">
              <path
                d="M 0 18 Q 30 5, 60 15 T 100 10"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-xs font-mono">
            <span className="text-text-muted">Ad Spend & Logistics:</span>
            <span className="text-usd bg-usd/10 px-2 py-0.5 rounded font-semibold">
              Adequate Buffer
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Left (Mini 13-Week Chart) | Right (Recent Transactions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mini 13-Week Forecast Cockpit */}
        <div className="lg:col-span-7 rounded-2xl bg-bg-surface border border-border-main p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
            <div>
              <h3 className="text-base font-bold text-text-primary tracking-tight">
                13-Week Liquidity Trajectory (VND)
              </h3>
              <span className="text-xs text-text-muted">
                Deterministic baseline model for ShopX
              </span>
            </div>
            <button
              onClick={onNavigateToForecast}
              className="text-xs font-mono text-primary hover:underline font-semibold"
            >
              Open Fullscreen Trajectory &rarr;
            </button>
          </div>

          {/* Mini Curve with Highlighted Week 2 */}
          <div className="relative py-4">
            <div className="h-44 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 500 150" fill="none">
                {/* Horizontal Buffer Line at y=90 */}
                <line x1="20" y1="90" x2="480" y2="90" stroke="#EF4444" strokeDasharray="4 4" strokeWidth="1.5" />
                <text x="340" y="85" fill="#EF4444" fontSize="10" fontFamily="monospace">
                  Minimum Buffer: 160M ₫
                </text>

                {/* Trajectory */}
                <path
                  d="M 30 30 C 50 35, 70 120, 85 120 C 100 120, 120 70, 140 70 C 180 70, 220 50, 260 55 C 320 60, 380 40, 470 20"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Week 2 Red Zone Pill */}
                <circle cx="85" cy="120" r="5" fill="#EF4444" className="animate-pulse" />
              </svg>

              {/* Week 2 Tag Callout */}
              <div className="absolute top-[52%] left-[16%] bg-crimson/15 border border-crimson px-2.5 py-1 rounded-lg text-center backdrop-blur-md">
                <span className="text-[10px] font-mono font-bold text-crimson block">Week 2: 150M</span>
                <span className="text-[9px] text-amber">Deficit -10M</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-text-muted mt-2">
              <span>Week 1</span>
              <span className="text-crimson font-bold">Week 2 (Risk)</span>
              <span>Week 6</span>
              <span>Week 10</span>
              <span>Week 13</span>
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-amber/10 border border-amber/25 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-amber font-medium">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Liquidity shortfall of 10M VND detected in Week 2 below safety buffer.</span>
            </div>
            <button
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
    </div>
  );
}
