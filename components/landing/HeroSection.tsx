'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, AlertTriangle, Play, Sparkles, TrendingUp, ArrowUpRight, ArrowDownRight, Layers } from 'lucide-react';
import { VND_BASELINE_FORECAST, CNY_BASELINE_FORECAST, USD_BASELINE_FORECAST, TIMELINE_WEEKS } from '@/data/shopx-dataset';
import { useTheme } from '@/components/providers/ThemeProvider';

export default function HeroSection() {
  const [selectedCurrency, setSelectedCurrency] = useState<'ALL' | 'VND' | 'CNY' | 'USD'>('ALL');
  const [activeWeek, setActiveWeek] = useState<number>(2); // Default to Week 2 breach
  const { theme } = useTheme();

  // Current data for the active week
  const vndWeek = VND_BASELINE_FORECAST[activeWeek - 1];
  const cnyWeek = CNY_BASELINE_FORECAST[activeWeek - 1];
  const usdWeek = USD_BASELINE_FORECAST[activeWeek - 1];

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden bg-bg-base transition-colors duration-200">
      {/* Precision Technical Grid Background (Replaces AI neon blobs) */}
      <div 
        className={`absolute inset-0 pointer-events-none opacity-60 ${
          theme === 'light' ? 'fintech-grid-light' : 'fintech-grid-dark'
        }`}
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 85%)'
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Tag Pill: Institutional Trust Badge */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-bg-surface border border-border-main text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-text-primary font-semibold">Institutional Grade</span>
          <span className="text-text-muted">•</span>
          <span className="text-primary font-medium">13-Week Deterministic Liquidity Engine</span>
        </div>

        {/* Wide H1 Headline: Crisp Financial Authority */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text-primary leading-[1.08] mb-6 max-w-5xl mx-auto">
          Know Your Cash.{' '}
          <span className="text-primary">
            Every Week. Every Currency.
          </span>
        </h1>

        {/* Financial Subhead */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary leading-relaxed mb-10 font-normal">
          Deterministic 13-week cashflow forecasting with absolute currency isolation for cross-border e-commerce brands.
          Detect insolvency risks <span className="text-text-primary font-semibold">14 days before</span> platform settlement holds strike.
        </p>

        {/* High-Contrast Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-mono font-bold text-primary-text bg-primary hover:bg-primary-hover transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group transform active:scale-95"
          >
            <span>Launch Live Interactive Cockpit</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href="#forecast"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-xs font-mono font-semibold text-text-primary bg-bg-surface hover:bg-bg-surface-elevated border border-border-main hover:border-border-strong transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>Explore 13-Week Trajectory</span>
          </a>
        </div>

        {/* Treasury Terminal Card with Real-time Week Scrubber */}
        <div className="relative max-w-4xl mx-auto text-left">
          <div className="rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-8 shadow-sm transition-colors duration-200">
            {/* Top Bar: Ledger Status & Currency Pills */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-main">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-text-primary tracking-tight">ShopX Treasury Ledger</span>
                    <span className="text-[10px] font-mono text-primary bg-primary-surface border border-primary/20 px-2 py-0.5 rounded-full font-semibold">
                      LIVE ENGINE
                    </span>
                  </div>
                  <span className="text-xs font-mono text-text-muted">
                    Deterministic Conservation • Zero Cross-Currency Distortion
                  </span>
                </div>
              </div>

              {/* Currency Selector Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-bg-surface-elevated rounded-xl border border-border-main">
                {(['ALL', 'VND', 'CNY', 'USD'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                      selectedCurrency === curr
                        ? 'bg-bg-surface text-text-primary shadow-sm border border-border-main font-bold'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Week Scrubber Slider */}
            <div className="py-6 border-b border-border-main">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
                    Timeline Scrubber:
                  </span>
                  <span className="text-xs font-mono font-bold text-primary">
                    {TIMELINE_WEEKS[activeWeek - 1].weekLabel} ({TIMELINE_WEEKS[activeWeek - 1].startDate} &rarr; {TIMELINE_WEEKS[activeWeek - 1].endDate})
                  </span>
                </div>
                {activeWeek === 2 ? (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-crimson bg-crimson-surface border border-crimson/30 px-2.5 py-0.5 rounded-full font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Liquidity Breach (-10M VND)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-primary bg-primary-surface border border-primary/30 px-2.5 py-0.5 rounded-full font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
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
                  className="w-full h-2 bg-bg-surface-elevated rounded-lg appearance-none cursor-pointer accent-primary border border-border-main"
                />
                <div className="flex justify-between text-[10px] font-mono text-text-muted mt-2">
                  {TIMELINE_WEEKS.map((w) => (
                    <button
                      key={w.weekNumber}
                      onClick={() => setActiveWeek(w.weekNumber)}
                      className={`hover:text-text-primary transition-colors ${
                        activeWeek === w.weekNumber ? 'text-primary font-bold' : ''
                      } ${w.weekNumber === 2 ? 'text-crimson font-bold' : ''}`}
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
                    ? 'bg-crimson-surface border-crimson/40 shadow-sm'
                    : 'bg-bg-surface-subtle border-border-main hover:border-primary/40'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-vnd font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-vnd" />
                      VND Operations Ledger
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">Shopee & TikTok</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary mb-1 tabular-nums">
                    {vndWeek.closingBalance.toLocaleString('en-US')} ₫
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-text-secondary pt-2 border-t border-border-main">
                    <span className="flex items-center gap-1 text-vnd">
                      <ArrowUpRight className="w-3 h-3" />
                      +{vndWeek.inflow.toLocaleString('en-US')}
                    </span>
                    <span className="flex items-center gap-1 text-crimson">
                      <ArrowDownRight className="w-3 h-3" />
                      -{vndWeek.outflow.toLocaleString('en-US')}
                    </span>
                  </div>
                  {vndWeek.isBreached && (
                    <div className="mt-2 text-[10px] font-mono text-crimson bg-crimson-surface p-1.5 rounded border border-crimson/30 flex items-center gap-1 font-semibold">
                      <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                      <span>Breaches 160M ₫ buffer by -10M ₫</span>
                    </div>
                  )}
                </div>
              )}

              {/* CNY Card */}
              {(selectedCurrency === 'ALL' || selectedCurrency === 'CNY') && (
                <div className="p-4 rounded-xl bg-bg-surface-subtle border border-border-main hover:border-cny/40 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-cny font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-cny" />
                      CNY Factory Payables
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">1688 Direct OEM</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary mb-1 tabular-nums">
                    ¥{cnyWeek.closingBalance.toLocaleString('en-US')}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-text-secondary pt-2 border-t border-border-main">
                    <span className="flex items-center gap-1 text-vnd">
                      <ArrowUpRight className="w-3 h-3" />
                      +¥{cnyWeek.inflow.toLocaleString('en-US')}
                    </span>
                    <span className="flex items-center gap-1 text-crimson">
                      <ArrowDownRight className="w-3 h-3" />
                      -¥{cnyWeek.outflow.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              )}

              {/* USD Card */}
              {(selectedCurrency === 'ALL' || selectedCurrency === 'USD') && (
                <div className="p-4 rounded-xl bg-bg-surface-subtle border border-border-main hover:border-usd/40 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-usd font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-usd" />
                      USD Ad Spend & Freight
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">Meta & Logistics</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary mb-1 tabular-nums">
                    ${usdWeek.closingBalance.toLocaleString('en-US')}
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-text-secondary pt-2 border-t border-border-main">
                    <span className="flex items-center gap-1 text-vnd">
                      <ArrowUpRight className="w-3 h-3" />
                      +${usdWeek.inflow.toLocaleString('en-US')}
                    </span>
                    <span className="flex items-center gap-1 text-usd">
                      <ArrowDownRight className="w-3 h-3" />
                      -${usdWeek.outflow.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Insight Footer */}
            <div className="mt-6 pt-4 border-t border-border-main flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-text-muted gap-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Zero currency cross-blending: Each ledger strictly audited in native denomination.
              </span>
              <Link href="/dashboard" className="text-primary hover:underline flex items-center gap-1 font-semibold">
                Open full 13-week scenario cockpit &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
