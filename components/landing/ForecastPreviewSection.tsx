'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  AlertTriangle,
  Calendar,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from 'lucide-react';
import {
  VND_BASELINE_FORECAST,
  CNY_BASELINE_FORECAST,
  USD_BASELINE_FORECAST,
  TIMELINE_WEEKS,
} from '@/data/shopx-dataset';
import { Currency, WeeklyForecast } from '@/types/finance';
import { formatCurrencyAmount } from '@/lib/finance-engine';
import InteractiveForecastChart from '@/components/charts/InteractiveForecastChart';
import FintechSpotlightCard from '@/components/common/FintechSpotlightCard';

export default function ForecastPreviewSection() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('VND');
  const [activeWeek, setActiveWeek] = useState<number>(2); // Default to Week 2 breach

  const currentWeeks: WeeklyForecast[] =
    selectedCurrency === 'VND'
      ? VND_BASELINE_FORECAST
      : selectedCurrency === 'CNY'
      ? CNY_BASELINE_FORECAST
      : USD_BASELINE_FORECAST;

  const bufferThreshold =
    selectedCurrency === 'VND'
      ? 160_000_000
      : selectedCurrency === 'CNY'
      ? 40_000
      : 5_000;

  const selectedWeekData =
    currentWeeks.find((w) => w.weekNumber === activeWeek) || currentWeeks[0];

  return (
    <section id="forecast" className="relative py-28 bg-bg-base border-b border-border-main transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono font-medium text-primary mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>OPERATIONAL NUCLEUS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
            13-Week Liquidity Trajectory
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Chained mathematical conservation: <code className="px-1.5 py-0.5 rounded bg-bg-surface border border-border-main font-mono text-xs text-text-primary">Closing(t) === Opening(t+1)</code>. Pinpoint the exact day and dollar of liquidity shortfall before payroll or inventory defaults.
          </p>
        </div>

        {/* Interactive Dashboard Forecast Card */}
        <FintechSpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.08)"
          className="rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-8 shadow-sm transition-colors duration-200"
        >
          {/* Top Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-text-primary tracking-tight">
                  13-Week Cash Position ({selectedCurrency} Ledger)
                </h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-xs text-text-muted font-mono tabular-nums">
                Initial: {formatCurrencyAmount(currentWeeks[0]?.openingBalance || 0, selectedCurrency)} • Minimum Safe Buffer: {formatCurrencyAmount(bufferThreshold, selectedCurrency)}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Currency Selector Pills */}
              <div className="flex items-center gap-1 bg-bg-surface-elevated p-1 rounded-lg border border-border-main">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCurrency('VND');
                    setActiveWeek(2);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                    selectedCurrency === 'VND'
                      ? 'bg-vnd text-white font-bold shadow-xs'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  VND (Operations)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCurrency('CNY');
                    setActiveWeek(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                    selectedCurrency === 'CNY'
                      ? 'bg-cny text-white font-bold shadow-xs'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  CNY (Factory)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCurrency('USD');
                    setActiveWeek(1);
                  }}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all ${
                    selectedCurrency === 'USD'
                      ? 'bg-usd text-white font-bold shadow-xs'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  USD (Ads/Freight)
                </button>
              </div>

              {selectedCurrency === 'VND' ? (
                <span className="text-xs font-mono font-medium text-crimson bg-crimson/10 border border-crimson/25 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Deficit: Week 2
                </span>
              ) : (
                <span className="text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Buffer Safe
                </span>
              )}

              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Full Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive Dynamic SVG Area Chart with Scrub & Crosshair */}
          <div className="relative py-4">
            <InteractiveForecastChart
              weeks={currentWeeks}
              currency={selectedCurrency}
              bufferThreshold={bufferThreshold}
              selectedWeek={activeWeek}
              onSelectWeek={(w) => setActiveWeek(w)}
              heightClassName="h-64 sm:h-80"
              showScrubber={true}
            />
          </div>

          {/* Interactive Selected Week Breakdown Pill Bar */}
          <div className="pt-6 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main">
              <span className="text-[11px] font-mono text-text-muted block mb-1">SELECTED INTERVAL</span>
              <span className="text-base font-bold text-text-primary font-mono flex items-center gap-2">
                Week {selectedWeekData.weekNumber}
                <span className="text-xs text-text-muted font-normal">
                  ({TIMELINE_WEEKS[activeWeek - 1]?.startDate})
                </span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mb-1 font-semibold">
                <ArrowUpRight className="w-3.5 h-3.5" />
                WEEK INFLOWS
              </span>
              <span className="text-base font-bold text-text-primary font-mono tabular-nums">
                +{formatCurrencyAmount(selectedWeekData.inflow, selectedCurrency)}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main">
              <span className="text-[11px] font-mono text-crimson flex items-center gap-1 mb-1 font-semibold">
                <ArrowDownRight className="w-3.5 h-3.5" />
                WEEK OUTFLOWS
              </span>
              <span className="text-base font-bold text-text-primary font-mono tabular-nums">
                -{formatCurrencyAmount(selectedWeekData.outflow, selectedCurrency)}
              </span>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${
              selectedWeekData.isBreached
                ? 'bg-crimson/10 border-crimson/30 text-crimson'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
            }`}>
              <span className="text-[11px] font-mono block mb-1">
                CLOSING POSITION
              </span>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-mono tabular-nums">
                  {formatCurrencyAmount(selectedWeekData.closingBalance, selectedCurrency)}
                </span>
                {selectedWeekData.isBreached ? (
                  <span className="text-[10px] font-mono bg-crimson text-white font-bold px-1.5 py-0.5 rounded">
                    DEFICIT
                  </span>
                ) : (
                  <span className="text-[10px] font-mono bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded">
                    SAFE
                  </span>
                )}
              </div>
            </div>
          </div>
        </FintechSpotlightCard>
      </div>
    </section>
  );
}
