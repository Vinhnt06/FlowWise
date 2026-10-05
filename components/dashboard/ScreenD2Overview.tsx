'use client';

import React from 'react';
import {
  Wallet,
  Coins,
  DollarSign,
  TrendingDown,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import {
  VND_BASELINE_FORECAST,
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
      {/* 3 Large Currency Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: VND Operating Cash */}
        <div className="rounded-2xl bg-[#111118] border border-[#00D4AA]/40 p-6 backdrop-blur-xl relative shadow-lg shadow-[#00D4AA]/5 hover:border-[#00D4AA] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1BA]">
              Operating Cashflow (VND)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#00D4AA] animate-pulse" />
          </div>

          <div className="font-mono text-3xl font-extrabold text-[#00D4AA] tracking-tight mb-4">
            {formatCurrencyAmount(VND_SUMMARY.currentBalance, 'VND')}
          </div>

          {/* Mini Sparkline */}
          <div className="h-10 w-full mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 25" fill="none">
              <path
                d="M 0 15 Q 20 5, 40 18 T 80 8 T 100 12"
                stroke="#00D4AA"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="pt-3 border-t border-[#232336] flex items-center justify-between text-xs font-mono">
            <span className="text-[#8E8EA8]">Safe Buffer: 160M ₫</span>
            <span className="text-[#00D4AA] bg-[#00D4AA]/10 px-2 py-0.5 rounded font-semibold">
              Currently Maintained
            </span>
          </div>
        </div>

        {/* Card 2: CNY Supplier Payables */}
        <div className="rounded-2xl bg-[#111118] border border-[#FF6B35]/40 p-6 backdrop-blur-xl relative shadow-lg shadow-[#FF6B35]/5 hover:border-[#FF6B35] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1BA]">
              Supplier Payables (CNY)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B35]" />
          </div>

          <div className="font-mono text-3xl font-extrabold text-[#FF6B35] tracking-tight mb-4">
            {formatCurrencyAmount(CNY_SUMMARY.currentBalance, 'CNY')}
          </div>

          {/* Mini Sparkline */}
          <div className="h-10 w-full mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 25" fill="none">
              <path
                d="M 0 10 Q 30 20, 60 8 T 100 18"
                stroke="#FF6B35"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="pt-3 border-t border-[#232336] flex items-center justify-between text-xs font-mono">
            <span className="text-[#8E8EA8]">1688 Vendor Terms:</span>
            <span className="text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Due in 10 Days
            </span>
          </div>
        </div>

        {/* Card 3: USD Cross-Border Reserves */}
        <div className="rounded-2xl bg-[#111118] border border-[#4D9FFF]/40 p-6 backdrop-blur-xl relative shadow-lg shadow-[#4D9FFF]/5 hover:border-[#4D9FFF] transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1BA]">
              Global Ad & Freight Reserves (USD)
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4D9FFF]" />
          </div>

          <div className="font-mono text-3xl font-extrabold text-[#4D9FFF] tracking-tight mb-4">
            {formatCurrencyAmount(USD_SUMMARY.currentBalance, 'USD')}
          </div>

          {/* Mini Sparkline */}
          <div className="h-10 w-full mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 25" fill="none">
              <path
                d="M 0 18 Q 30 5, 60 15 T 100 10"
                stroke="#4D9FFF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="pt-3 border-t border-[#232336] flex items-center justify-between text-xs font-mono">
            <span className="text-[#8E8EA8]">Ad Spend & Logistics:</span>
            <span className="text-[#4D9FFF] bg-[#4D9FFF]/10 px-2 py-0.5 rounded font-semibold">
              Adequate Buffer
            </span>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Left (Mini 13-Week Chart) | Right (Recent Transactions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Mini 13-Week Forecast Cockpit */}
        <div className="lg:col-span-7 rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#232336]">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                13-Week Liquidity Trajectory (VND)
              </h3>
              <span className="text-xs text-[#8E8EA8]">
                Deterministic baseline model for ShopX
              </span>
            </div>
            <button
              onClick={onNavigateToForecast}
              className="text-xs font-mono text-[#00D4AA] hover:underline"
            >
              Open Fullscreen Trajectory &rarr;
            </button>
          </div>

          {/* Mini Curve with Highlighted Week 2 */}
          <div className="relative py-4">
            <div className="h-44 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 500 150" fill="none">
                {/* Horizontal Buffer Line at y=90 */}
                <line x1="20" y1="90" x2="480" y2="90" stroke="#FF4757" strokeDasharray="4 4" strokeWidth="1.5" />
                <text x="340" y="85" fill="#FF4757" fontSize="10" fontFamily="monospace">
                  Minimum Buffer: 160M ₫
                </text>

                {/* Trajectory */}
                <path
                  d="M 30 30 C 50 35, 70 120, 85 120 C 100 120, 120 70, 140 70 C 180 70, 220 50, 260 55 C 320 60, 380 40, 470 20"
                  stroke="#00D4AA"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Week 2 Red Zone Pill */}
                <circle cx="85" cy="120" r="5" fill="#FF4757" className="animate-pulse" />
              </svg>

              {/* Week 2 Tag Callout */}
              <div className="absolute top-[52%] left-[16%] bg-[#FF4757]/15 border border-[#FF4757] px-2.5 py-1 rounded-lg text-center backdrop-blur-md">
                <span className="text-[10px] font-mono font-bold text-[#FF4757] block">Week 2: 150M</span>
                <span className="text-[9px] text-[#FFAA00]">Deficit -10M</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8EA8] mt-2">
              <span>Week 1</span>
              <span className="text-[#FF4757] font-bold">Week 2 (Risk)</span>
              <span>Week 6</span>
              <span>Week 10</span>
              <span>Week 13</span>
            </div>
          </div>

          <div className="mt-4 p-3.5 rounded-xl bg-[#FFAA00]/10 border border-[#FFAA00]/30 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#FFAA00]">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Liquidity shortfall of 10M VND detected in Week 2 below safety buffer.</span>
            </div>
            <button
              onClick={onNavigateToSimulator}
              className="px-3 py-1 rounded-lg text-xs font-bold text-black bg-[#FFAA00] hover:bg-[#FFB726] transition-colors shrink-0"
            >
              Simulate Rescue
            </button>
          </div>
        </div>

        {/* Right Column: Recent Transactions Feed */}
        <div className="lg:col-span-5 rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#232336]">
            <h3 className="text-base font-bold text-white tracking-tight">Recent Ledger Activity</h3>
            <span className="text-xs font-mono text-[#8E8EA8]">Latest Sync</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {recentTransactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#161622] border border-[#232336] hover:border-[#363654] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{tx.title}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-[#8E8EA8] border border-[#232336]">
                      {tx.badge}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8E8EA8]">{tx.date}</span>
                </div>

                <div
                  className={`font-bold flex items-center gap-1 ${
                    tx.type === 'IN' ? 'text-[#00D4AA]' : 'text-[#FF4757]'
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
