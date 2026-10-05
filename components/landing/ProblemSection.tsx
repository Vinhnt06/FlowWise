'use client';

import React, { useState } from 'react';
import { AlertCircle, Clock, Percent, ArrowDownRight, TrendingDown, ShieldAlert, Sparkles, Sliders } from 'lucide-react';

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
    <section id="problem" className="relative py-28 bg-[#0A0A0F] overflow-hidden border-b border-[#232336]">
      {/* Subtle crimson ambient glow on left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[500px] bg-[#FF4757]/8 blur-[170px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-0 w-[450px] h-[400px] bg-[#FFAA00]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4757]/10 border border-[#FF4757]/30 text-xs font-mono text-[#FF4757] mb-4">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>The E-Commerce Liquidity Paradox</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6">
            Gross Sales on Platform <br />
            <span className="text-[#FF4757] font-mono">≠ Cash in Bank</span>
          </h2>

          <p className="text-base sm:text-lg text-[#A1A1BA] leading-relaxed">
            Why do multi-million dollar e-commerce merchants go bankrupt while breaking revenue records?
            Platform settlement holds, hidden fees, and cross-border currency mismatch create an invisible liquidity trap.
          </p>
        </div>

        {/* Interactive Cash Gap Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Crimson Escrow Breakdown Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#161622]/90 border border-[#FF4757]/40 p-6 sm:p-7 backdrop-blur-xl shadow-2xl shadow-[#FF4757]/5">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#232336]">
                <div className="flex items-center gap-2.5 text-white font-semibold text-sm">
                  <TrendingDown className="w-4 h-4 text-[#FF4757]" />
                  <span>Settlement Deductions & Escrow Hold</span>
                </div>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4757] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4757]" />
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-[#232336] hover:border-[#FF4757]/30 transition-colors">
                  <span className="text-[#A1A1BA] flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#FF4757]" />
                    Commission & Payment Fee
                  </span>
                  <span className="text-[#FF4757] font-bold">-12% Gross</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-[#232336] hover:border-[#FF4757]/30 transition-colors">
                  <span className="text-[#A1A1BA] flex items-center gap-2">
                    <ArrowDownRight className="w-4 h-4 text-[#FF4757]" />
                    COD Returns & Delivery Reserves
                  </span>
                  <span className="text-[#FF4757] font-bold">-5% Order GMV</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-[#232336] hover:border-[#FFAA00]/30 transition-colors">
                  <span className="text-[#A1A1BA] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#FFAA00]" />
                    Escrow Holding Cycle
                  </span>
                  <span className="text-[#FFAA00] font-bold">14-Day Lockup</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-[#232336] hover:border-[#4D9FFF]/30 transition-colors">
                  <span className="text-[#A1A1BA] flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-[#4D9FFF]" />
                    1688 OEM Factory Payables
                  </span>
                  <span className="text-[#4D9FFF] font-bold">Due in 5 Days</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#232336] text-[11px] font-mono text-[#6E6E87] flex items-center justify-between">
                <span>Total Escrow Deduction</span>
                <span className="text-[#FF4757] font-bold">~27% Gross Value Trapped</span>
              </div>
            </div>

            {/* Quote Pill */}
            <div className="p-4 rounded-xl bg-[#111118] border border-[#232336] text-xs text-[#8E8EA8] leading-relaxed">
              <span className="text-white font-medium">&quot;You don&apos;t go broke from low margins. You go broke because your money is locked in marketplace escrow when your factory invoices come due.&quot;</span>
              <div className="mt-2 text-[10px] font-mono text-[#00D4AA]">— Southeast Asian E-Commerce CFO Survey 2026</div>
            </div>
          </div>

          {/* Right Column: Interactive Escrow Simulator & Cash Gap Visualizer */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative">
              {/* Header with Interactive Slider */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#232336]">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#00D4AA]" />
                    Interactive Cash Gap Simulator
                  </h3>
                  <span className="text-xs text-[#8E8EA8]">Adjust monthly gross sales to see the net cash timing mismatch</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-[#A1A1BA]">Simulated GMV:</span>
                  <div className="text-lg font-mono font-bold text-[#00D4AA]">{demoSales}M ₫</div>
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
                  className="w-full h-2 bg-[#1C1C2B] rounded-lg appearance-none cursor-pointer accent-[#00D4AA]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#6E6E87] mt-1.5">
                  <span>200M VND</span>
                  <span>500M VND</span>
                  <span>1,000M VND</span>
                </div>
              </div>

              {/* Graphic Flow Comparison: Gross vs Immediate vs Payables */}
              <div className="space-y-4 mb-8">
                {/* 1. Gross Reported Sales */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-white font-medium">1. Reported Gross Marketplace GMV</span>
                    <span className="text-white font-bold">{demoSales}M VND (100%)</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#1C1C2B] rounded-full overflow-hidden p-0.5">
                    <div className="h-full bg-white/70 rounded-full w-full" />
                  </div>
                </div>

                {/* 2. Available Cash after Escrow & Deductions */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#00D4AA] font-medium">2. Actual Cash In Bank Today (Net Escrow)</span>
                    <span className="text-[#00D4AA] font-bold">{immediateAvailableCash}M VND ({Math.round((immediateAvailableCash / demoSales) * 100)}%)</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#1C1C2B] rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-[#00D4AA] rounded-full transition-all duration-300"
                      style={{ width: `${Math.round((immediateAvailableCash / demoSales) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-[#8E8EA8] mt-1">
                    <span>Platform take-rate: -{platformFee}M</span>
                    <span>Returns reserve: -{returnsReserve}M</span>
                    <span>14-day hold: -{escrowHold}M</span>
                  </div>
                </div>

                {/* 3. Factory Payables Demanded */}
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#FF4757] font-medium">3. Factory Payables & Inventory Due Now</span>
                    <span className="text-[#FF4757] font-bold">{immediateFactoryDue}M VND (65%)</span>
                  </div>
                  <div className="w-full h-3.5 bg-[#1C1C2B] rounded-full overflow-hidden p-0.5">
                    <div 
                      className="h-full bg-[#FF4757] rounded-full transition-all duration-300"
                      style={{ width: '65%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Insolvency Cliff Alert Banner */}
              <div className="rounded-xl bg-[#FF4757]/10 border border-[#FF4757]/30 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FF4757]/20 border border-[#FF4757]/30 flex items-center justify-center text-[#FF4757] flex-shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-white">
                      Liquidity Gap Identified: {cashGap > 0 ? `+${cashGap}M VND` : `${cashGap}M VND`}
                    </div>
                    <div className="text-[11px] text-[#A1A1BA]">
                      Settlement arrives 9 days after factory default deadline without proactive treasury planning.
                    </div>
                  </div>
                </div>

                <div className="px-3 py-1.5 rounded-lg bg-[#FF4757] text-black font-mono font-bold text-xs whitespace-nowrap self-end sm:self-auto">
                  HIGH DEFICIT RISK
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
