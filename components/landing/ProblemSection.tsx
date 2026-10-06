'use client';

import React, { useState } from 'react';
import { AlertCircle, Clock, Percent, ArrowDownRight, TrendingDown, ShieldAlert, Sliders } from 'lucide-react';

export default function ProblemSection() {
  const [demoSales, setDemoSales] = useState<number>(500); // 500 Million VND

  // Calculated deductions based on real marketplace dynamics
  const platformFee = Math.round(demoSales * 0.12);
  const returnsReserve = Math.round(demoSales * 0.05);
  const escrowHold = Math.round(demoSales * 0.10);
  const immediateFactoryDue = Math.round(demoSales * 0.65);
  const immediateAvailableCash = demoSales - platformFee - returnsReserve - escrowHold;
  const cashGap = immediateAvailableCash - immediateFactoryDue; // Cash deficit

  return (
    <section id="problem" className="relative py-24 bg-bg-base overflow-hidden border-b border-border-main transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-crimson-surface border border-crimson/30 text-xs font-mono text-crimson mb-4 font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The E-Commerce Liquidity Paradox</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary leading-[1.15] mb-6">
            Gross Sales on Platform <br />
            <span className="text-crimson font-mono">&ne; Cash in Bank</span>
          </h2>

          <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
            Why do multi-million dollar e-commerce merchants suffer insolvency while breaking sales records?
            Platform settlement holds, hidden commission tranches, and cross-border currency mismatch create an invisible liquidity trap.
          </p>
        </div>

        {/* Interactive Cash Gap Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Settlement Hold & Deductions Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-7 shadow-sm transition-colors duration-200">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-border-main">
                <div className="flex items-center gap-2.5 text-text-primary font-semibold text-sm">
                  <TrendingDown className="w-4 h-4 text-crimson" />
                  <span>Settlement Deductions & Escrow Hold</span>
                </div>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-bg-surface-elevated border border-border-main">
                  <span className="text-text-secondary flex items-center gap-2">
                    <Percent className="w-4 h-4 text-crimson" />
                    Commission & Payment Fee
                  </span>
                  <span className="text-crimson font-bold">-12% Gross</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-bg-surface-elevated border border-border-main">
                  <span className="text-text-secondary flex items-center gap-2">
                    <ArrowDownRight className="w-4 h-4 text-crimson" />
                    COD Returns & Delivery Reserves
                  </span>
                  <span className="text-crimson font-bold">-5% Order GMV</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-bg-surface-elevated border border-border-main">
                  <span className="text-text-secondary flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber" />
                    Escrow Holding Lockup
                  </span>
                  <span className="text-amber font-bold">14-Day Delay</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-bg-surface-elevated border border-border-main">
                  <span className="text-text-secondary flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-usd" />
                    1688 OEM Factory Payables
                  </span>
                  <span className="text-usd font-bold">Due in 5 Days</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border-main text-[11px] font-mono text-text-muted flex items-center justify-between">
                <span>Total Escrow Deduction</span>
                <span className="text-crimson font-bold">~27% Gross Value Trapped</span>
              </div>
            </div>

            {/* Treasury Survey Callout */}
            <div className="p-4 rounded-xl bg-bg-surface border border-border-main text-xs text-text-secondary leading-relaxed shadow-xs">
              <span className="text-text-primary font-medium">
                &ldquo;You don&apos;t go broke from low margins. You go broke because your money is locked in marketplace escrow when your factory invoices come due.&rdquo;
              </span>
              <div className="mt-2 text-[10px] font-mono text-primary font-semibold">
                &mdash; Southeast Asian E-Commerce CFO Survey 2026
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Escrow Simulator & Cash Gap Visualizer */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-8 shadow-sm relative transition-colors duration-200">
              {/* Header with Interactive Slider */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border-main">
                <div>
                  <h3 className="text-lg font-bold text-text-primary tracking-tight flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-primary" />
                    Interactive Cash Gap Simulator
                  </h3>
                  <span className="text-xs text-text-muted">Adjust monthly gross sales to see the net cash timing mismatch</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-text-muted">Simulated GMV:</span>
                  <div className="text-lg font-mono font-bold text-primary tabular-nums">{demoSales}M ₫</div>
                </div>
              </div>

              {/* Slider Input */}
              <div className="mb-8">
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="50"
                  value={demoSales}
                  onChange={(e) => setDemoSales(Number(e.target.value))}
                  className="w-full h-2 bg-bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary border border-border-main"
                />
                <div className="flex justify-between text-[10px] font-mono text-text-muted mt-1.5">
                  <span>200M VND</span>
                  <span>500M VND</span>
                  <span>1,000M VND</span>
                </div>
              </div>

              {/* Graphic Flow Comparison: Gross vs Immediate vs Payables */}
              <div className="space-y-4 mb-8 font-mono">
                {/* 1. Gross Reported Sales */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-text-primary font-medium">1. Reported Gross Marketplace GMV</span>
                    <span className="text-text-primary font-bold tabular-nums">{demoSales}M VND (100%)</span>
                  </div>
                  <div className="w-full h-3 bg-bg-surface-elevated rounded-full overflow-hidden border border-border-main">
                    <div className="h-full bg-slate-400 dark:bg-slate-500 rounded-full w-full" />
                  </div>
                </div>

                {/* 2. Available Cash after Escrow & Deductions */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-primary font-medium">2. Actual Cash In Bank Today (Net Escrow)</span>
                    <span className="text-primary font-bold tabular-nums">{immediateAvailableCash}M VND ({Math.round((immediateAvailableCash / demoSales) * 100)}%)</span>
                  </div>
                  <div className="w-full h-3 bg-bg-surface-elevated rounded-full overflow-hidden border border-border-main">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${Math.round((immediateAvailableCash / demoSales) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-text-muted mt-1">
                    <span>Platform take-rate: -{platformFee}M</span>
                    <span>Returns reserve: -{returnsReserve}M</span>
                    <span>14-day hold: -{escrowHold}M</span>
                  </div>
                </div>

                {/* 3. Factory Payables Demanded */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-crimson font-medium">3. Factory Payables Due in 5 Days</span>
                    <span className="text-crimson font-bold tabular-nums">{immediateFactoryDue}M VND (65%)</span>
                  </div>
                  <div className="w-full h-3 bg-bg-surface-elevated rounded-full overflow-hidden border border-border-main">
                    <div 
                      className="h-full bg-crimson rounded-full transition-all duration-300"
                      style={{ width: '65%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Insolvency Cliff Alert Banner */}
              <div className="rounded-xl bg-crimson-surface border border-crimson/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-crimson/15 flex items-center justify-center text-crimson shrink-0">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-crimson">
                      Net Liquidity Cliff: {cashGap > 0 ? `+${cashGap}M VND` : `${cashGap}M VND`}
                    </div>
                    <div className="text-[11px] text-text-secondary">
                      Settlement arrives 9 days after factory invoice default deadline without proactive liquidity planning.
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-lg bg-crimson text-white font-mono font-bold text-[11px] whitespace-nowrap self-end sm:self-auto shadow-xs">
                  DEFICIT RISK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
