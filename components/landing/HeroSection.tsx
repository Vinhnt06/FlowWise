'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, AlertTriangle, Play, Sparkles, TrendingUp, DollarSign, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { VND_BASELINE_FORECAST, CNY_BASELINE_FORECAST, USD_BASELINE_FORECAST, TIMELINE_WEEKS } from '@/data/shopx-dataset';

export default function HeroSection() {
  const [selectedCurrency, setSelectedCurrency] = useState<'ALL' | 'VND' | 'CNY' | 'USD'>('ALL');
  const [activeWeek, setActiveWeek] = useState<number>(2); // Default to Week 2 (the critical breach week)

  // Current data for the active week
  const vndWeek = VND_BASELINE_FORECAST[activeWeek - 1];
  const cnyWeek = CNY_BASELINE_FORECAST[activeWeek - 1];
  const usdWeek = USD_BASELINE_FORECAST[activeWeek - 1];

  return (
    <section id="hero" className="relative min-h-[94vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-[#0A0A0F]">
      {/* Dynamic Ambient Mesh Glows — Zero purple, strictly calibrated Emerald, Coral & Cobalt */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00D4AA]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -left-32 w-[500px] h-[400px] bg-[#4D9FFF]/8 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 -right-32 w-[500px] h-[400px] bg-[#FF6B35]/8 blur-[140px] pointer-events-none rounded-full" />

      {/* Modern Hairline Grid Background with subtle radial fade */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Tag Pill with Live Radar Pulse */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111118]/90 border border-[#232336] text-[11px] font-mono uppercase tracking-wider text-[#A1A1BA] mb-8 shadow-xl backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D4AA] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D4AA]" />
          </span>
          <span className="text-white font-medium">Fintechathon 2026</span>
          <span className="text-[#6E6E87]">•</span>
          <span className="text-[#00D4AA]">Multi-Currency Liquidity Engine</span>
        </div>

        {/* Wide H1 Headline — 2 lines strictly, no awkward 6-line wrapping */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 max-w-5xl mx-auto">
          Know Your Cash.{' '}
          <span className="bg-gradient-to-r from-white via-[#F1F2F6] to-[#00D4AA] bg-clip-text text-transparent">
            Every Week. Every Currency.
          </span>
        </h1>

        {/* Crisp Financial Subhead */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#A1A1BA] leading-relaxed mb-10 font-normal">
          Deterministic 13-week cashflow forecasting with absolute currency isolation for cross-border e-commerce brands.
          Detect insolvency risks <span className="text-[#00D4AA] font-semibold">14 days before</span> platform settlement delays strike.
        </p>

        {/* High-Contrast Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-black bg-[#00D4AA] hover:bg-[#05F3C4] transition-all duration-300 shadow-[0_0_35px_rgba(0,212,170,0.35)] hover:shadow-[0_0_45px_rgba(0,212,170,0.55)] flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
          >
            <span>Launch Interactive Cockpit</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href="#forecast"
            className="w-full sm:w-auto px-7 py-4 rounded-full text-sm font-medium text-white bg-[#161622] hover:bg-[#1C1C2B] border border-[#232336] hover:border-[#33334D] transition-all duration-200 flex items-center justify-center gap-2 group backdrop-blur-xl"
          >
            <Play className="w-3.5 h-3.5 text-[#00D4AA] fill-[#00D4AA]" />
            <span>Explore 13-Week Forecast</span>
          </a>
        </div>

        {/* Dynamic Interactive Cockpit Teaser Card with Real-time Week Scrubber */}
        <div className="relative max-w-4xl mx-auto text-left">
          {/* Decorative Laser Border Gradient Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00D4AA]/40 via-[#FF6B35]/20 to-[#4D9FFF]/40 rounded-3xl blur-md opacity-40 group-hover:opacity-100 transition duration-1000 -z-10" />

          <div className="rounded-2xl bg-[#111118]/95 border border-[#232336] p-6 sm:p-8 backdrop-blur-2xl shadow-[0_30px_90px_-20px_rgba(0,0,0,0.9)]">
            {/* Top Bar: Ledger Status & Currency Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232336]">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#00D4AA] animate-pulse" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white tracking-tight">ShopX Live Liquidity Stream</span>
                    <span className="text-[10px] font-mono text-[#00D4AA] bg-[#00D4AA]/10 border border-[#00D4AA]/30 px-2 py-0.5 rounded-full">
                      REAL-TIME
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#6E6E87]">
                    Deterministic Conservation Engine • 3 Isolated Ledgers
                  </span>
                </div>
              </div>

              {/* Currency Selector Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-[#161622] rounded-xl border border-[#232336]">
                {(['ALL', 'VND', 'CNY', 'USD'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                      selectedCurrency === curr
                        ? 'bg-[#232336] text-white shadow-md'
                        : 'text-[#A1A1BA] hover:text-white'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Week Scrubber Slider */}
            <div className="py-6 border-b border-[#232336]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1BA]">
                    Timeline Scrubber:
                  </span>
                  <span className="text-xs font-mono font-bold text-[#00D4AA]">
                    {TIMELINE_WEEKS[activeWeek - 1].weekLabel} ({TIMELINE_WEEKS[activeWeek - 1].startDate} to {TIMELINE_WEEKS[activeWeek - 1].endDate})
                  </span>
                </div>
                {activeWeek === 2 ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#FF4757] bg-[#FF4757]/10 border border-[#FF4757]/30 px-2.5 py-0.5 rounded-full animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    Liquidity Breach (-10M VND)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#00D4AA] bg-[#00D4AA]/10 border border-[#00D4AA]/30 px-2.5 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" />
                    Buffer Maintained
                  </span>
                )}
              </div>

              {/* Range Slider for Week Selection */}
              <div className="relative pt-2">
                <input
                  type="range"
                  min="1"
                  max="13"
                  value={activeWeek}
                  onChange={(e) => setActiveWeek(Number(e.target.value))}
                  className="w-full h-2 bg-[#1C1C2B] rounded-lg appearance-none cursor-pointer accent-[#00D4AA]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#6E6E87] mt-2">
                  {TIMELINE_WEEKS.map((w) => (
                    <button
                      key={w.weekNumber}
                      onClick={() => setActiveWeek(w.weekNumber)}
                      className={`hover:text-white transition-colors ${
                        activeWeek === w.weekNumber ? 'text-[#00D4AA] font-bold' : ''
                      } ${w.weekNumber === 2 ? 'text-[#FF4757]' : ''}`}
                    >
                      W{w.weekNumber}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Metric Display Based on Selected Currency & Week */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {/* VND Card */}
              {(selectedCurrency === 'ALL' || selectedCurrency === 'VND') && (
                <div className={`p-4 rounded-xl border transition-all ${
                  activeWeek === 2 && vndWeek.isBreached
                    ? 'bg-[#FF4757]/5 border-[#FF4757]/40 shadow-lg shadow-[#FF4757]/5'
                    : 'bg-[#161622]/70 border-[#232336] hover:border-[#00D4AA]/30'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#00D4AA] font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#00D4AA]" />
                      VND Domestic Settlement
                    </span>
                    <span className="text-[10px] font-mono text-[#6E6E87]">Shopee & TikTok</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
                    {vndWeek.closingBalance.toLocaleString('en-US')} ₫
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#A1A1BA] pt-2 border-t border-[#232336]/60">
                    <span className="flex items-center gap-1 text-[#00D4AA]">
                      <ArrowUpRight className="w-3 h-3" />
                      +{vndWeek.inflow.toLocaleString('en-US')}
                    </span>
                    <span className="flex items-center gap-1 text-[#FF4757]">
                      <ArrowDownRight className="w-3 h-3" />
                      -{vndWeek.outflow.toLocaleString('en-US')}
                    </span>
                  </div>
                  {vndWeek.isBreached && (
                    <div className="mt-2 text-[10px] font-mono text-[#FF4757] bg-[#FF4757]/10 p-1.5 rounded border border-[#FF4757]/20 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      <span>Breaches 160M safety buffer</span>
                    </div>
                  )}
                </div>
              )}

              {/* CNY Card */}
              {(selectedCurrency === 'ALL' || selectedCurrency === 'CNY') && (
                <div className="p-4 rounded-xl bg-[#161622]/70 border border-[#232336] hover:border-[#FF6B35]/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#FF6B35] font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
                      CNY Factory Payables
                    </span>
                    <span className="text-[10px] font-mono text-[#6E6E87]">1688 Direct OEM</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
                    ¥{cnyWeek.closingBalance.toLocaleString('en-US')}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#A1A1BA] pt-2 border-t border-[#232336]/60">
                    <span className="flex items-center gap-1 text-[#00D4AA]">
                      <ArrowUpRight className="w-3 h-3" />
                      +¥{cnyWeek.inflow.toLocaleString('en-US')}
                    </span>
                    <span className="flex items-center gap-1 text-[#FF6B35]">
                      <ArrowDownRight className="w-3 h-3" />
                      -¥{cnyWeek.outflow.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              )}

              {/* USD Card */}
              {(selectedCurrency === 'ALL' || selectedCurrency === 'USD') && (
                <div className="p-4 rounded-xl bg-[#161622]/70 border border-[#232336] hover:border-[#4D9FFF]/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#4D9FFF] font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4D9FFF]" />
                      USD Ad Spend & Logistics
                    </span>
                    <span className="text-[10px] font-mono text-[#6E6E87]">Meta & Global Freight</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-white mb-1">
                    ${usdWeek.closingBalance.toLocaleString('en-US')}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-[#A1A1BA] pt-2 border-t border-[#232336]/60">
                    <span className="flex items-center gap-1 text-[#00D4AA]">
                      <ArrowUpRight className="w-3 h-3" />
                      +${usdWeek.inflow.toLocaleString('en-US')}
                    </span>
                    <span className="flex items-center gap-1 text-[#4D9FFF]">
                      <ArrowDownRight className="w-3 h-3" />
                      -${usdWeek.outflow.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Insight Footer */}
            <div className="mt-6 pt-4 border-t border-[#232336] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-[#6E6E87] gap-2">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#00D4AA]" />
                Zero currency blending: Each currency strictly audited in native denomination.
              </span>
              <Link href="/dashboard" className="text-[#00D4AA] hover:underline flex items-center gap-1 font-semibold">
                Open full 13-week scenario cockpit &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
