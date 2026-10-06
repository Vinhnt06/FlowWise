'use client';

import React, { useState } from 'react';
import {
  Currency,
  WeeklyForecast,
  CurrencyForecastSummary,
} from '@/types/finance';
import {
  VND_BASELINE_FORECAST,
  VND_SUMMARY,
  CNY_BASELINE_FORECAST,
  CNY_SUMMARY,
  USD_BASELINE_FORECAST,
  USD_SUMMARY,
} from '@/data/shopx-dataset';
import { formatCurrencyAmount } from '@/lib/finance-engine';
import {
  AlertTriangle,
  Download,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
} from 'lucide-react';
import InteractiveForecastChart from '@/components/charts/InteractiveForecastChart';

interface ScreenD3ForecastProps {
  onNavigateToSimulator?: () => void;
}

export default function ScreenD3Forecast({
  onNavigateToSimulator,
}: ScreenD3ForecastProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('VND');
  const [selectedWeek, setSelectedWeek] = useState<number>(2); // Default to Week 2 breach

  const currentSummary: CurrencyForecastSummary =
    selectedCurrency === 'VND'
      ? VND_SUMMARY
      : selectedCurrency === 'CNY'
      ? CNY_SUMMARY
      : USD_SUMMARY;

  const currentWeeks: WeeklyForecast[] =
    selectedCurrency === 'VND'
      ? VND_BASELINE_FORECAST
      : selectedCurrency === 'CNY'
      ? CNY_BASELINE_FORECAST
      : USD_BASELINE_FORECAST;

  const activeWeekData = currentWeeks.find((w) => w.weekNumber === selectedWeek) || currentWeeks[0];

  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Week,Start Date,End Date,Opening,Inflow,Outflow,Net Cashflow,Closing,Buffer Status\n';
    currentWeeks.forEach((w) => {
      csvContent += `${w.weekLabel},${w.startDate},${w.endDate},${w.openingBalance},${w.inflow},${w.outflow},${w.netCashflow},${w.closingBalance},${w.isBreached ? 'DEFICIT' : 'BUFFER_OK'}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `flowwise_${selectedCurrency.toLowerCase()}_13week_forecast.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls: Currency Filter Selector Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">13-Week Liquidity Trajectory</h2>
          <span className="text-xs text-text-muted">
            Deterministic chained balance: Closing(t) === Opening(t+1) with absolute currency isolation
          </span>
        </div>

        {/* Currency Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-bg-surface p-1 rounded-xl border border-border-main shadow-xs">
          <button
            onClick={() => {
              setSelectedCurrency('VND');
              setSelectedWeek(2);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCurrency === 'VND'
                ? 'bg-vnd text-white font-bold shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            VND (Operations)
          </button>
          <button
            onClick={() => {
              setSelectedCurrency('CNY');
              setSelectedWeek(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCurrency === 'CNY'
                ? 'bg-cny text-white font-bold shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            CNY (Factory Payables)
          </button>
          <button
            onClick={() => {
              setSelectedCurrency('USD');
              setSelectedWeek(1);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCurrency === 'USD'
                ? 'bg-usd text-white font-bold shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            USD (Ads & Freight)
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-bg-surface border border-border-main">
          <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block mb-1">
            Current Liquidity
          </span>
          <span className="text-lg font-bold font-mono text-text-primary tabular-nums">
            {formatCurrencyAmount(currentSummary.currentBalance, selectedCurrency)}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-bg-surface border border-border-main">
          <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block mb-1">
            Safe Buffer Requirement
          </span>
          <span className="text-lg font-bold font-mono text-text-primary tabular-nums">
            {formatCurrencyAmount(currentSummary.safeBuffer, selectedCurrency)}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-bg-surface border border-border-main">
          <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block mb-1">
            Lowest Projected Point
          </span>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold font-mono tabular-nums ${
              currentSummary.lowestBalance < currentSummary.safeBuffer ? 'text-crimson' : 'text-text-primary'
            }`}>
              {formatCurrencyAmount(currentSummary.lowestBalance, selectedCurrency)}
            </span>
            <span className="text-xs font-mono text-text-muted">
              (Week {currentSummary.lowestWeek})
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-bg-surface border border-border-main">
          <span className="text-[11px] font-mono text-text-muted uppercase tracking-wider block mb-1">
            Buffer Health Status
          </span>
          {currentSummary.breachWeeksCount > 0 ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-crimson bg-crimson/10 px-2.5 py-1 rounded-md border border-crimson/25">
              <AlertTriangle className="w-3.5 h-3.5" />
              {currentSummary.breachWeeksCount} Week Deficit Flagged
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/25">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Buffer Compliance
            </span>
          )}
        </div>
      </div>

      {/* Main Full-Width Forecast Chart Panel */}
      <div className="rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-2 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-text-primary">
              Interactive 13-Week Spline ({selectedCurrency})
            </span>
            <span className="text-xs font-mono text-text-muted hidden sm:inline">
              Hover or scrub across canvas to inspect weekly balance & cashflows
            </span>
          </div>

          <div className="flex items-center gap-3">
            {selectedCurrency === 'VND' && onNavigateToSimulator && (
              <button
                onClick={onNavigateToSimulator}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black bg-amber hover:bg-amber/90 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Mitigate Week 2 Deficit</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-text-secondary bg-bg-surface-elevated hover:text-text-primary border border-border-main flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Dynamic & Interactive Spline Chart */}
        <InteractiveForecastChart
          weeks={currentWeeks}
          currency={selectedCurrency}
          bufferThreshold={currentSummary.safeBuffer}
          selectedWeek={selectedWeek}
          onSelectWeek={(w) => setSelectedWeek(w)}
          onNavigateToSimulator={onNavigateToSimulator}
          heightClassName="h-72 sm:h-96"
          showScrubber={true}
        />

        {/* Selected Week Inspection Card Strip */}
        <div className="mt-4 pt-4 border-t border-border-subtle grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl bg-bg-surface-elevated border border-border-main">
            <span className="text-[10px] font-mono text-text-muted uppercase block mb-0.5">
              Inspecting Timeline
            </span>
            <div className="font-mono text-sm font-bold text-text-primary flex items-center gap-2">
              <span>{activeWeekData.weekLabel}</span>
              <span className="text-xs text-text-muted font-normal">
                ({activeWeekData.startDate.slice(5)} &rarr; {activeWeekData.endDate.slice(5)})
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-bg-surface-elevated border border-border-main">
            <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mb-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> Projected Inflows
            </span>
            <span className="font-mono text-sm font-bold text-text-primary tabular-nums">
              +{formatCurrencyAmount(activeWeekData.inflow, selectedCurrency)}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-bg-surface-elevated border border-border-main">
            <span className="text-[10px] font-mono text-crimson font-semibold flex items-center gap-1 mb-0.5">
              <ArrowDownRight className="w-3.5 h-3.5" /> Projected Outflows
            </span>
            <span className="font-mono text-sm font-bold text-text-primary tabular-nums">
              -{formatCurrencyAmount(activeWeekData.outflow, selectedCurrency)}
            </span>
          </div>

          <div className={`p-3.5 rounded-xl border transition-all ${
            activeWeekData.isBreached
              ? 'bg-crimson/10 border-crimson/30 text-crimson'
              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400'
          }`}>
            <span className="text-[10px] font-mono uppercase block mb-0.5">
              Closing Position
            </span>
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold tabular-nums">
                {formatCurrencyAmount(activeWeekData.closingBalance, selectedCurrency)}
              </span>
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                activeWeekData.isBreached ? 'bg-crimson text-white' : 'bg-emerald-600 text-white'
              }`}>
                {activeWeekData.isBreached ? 'DEFICIT' : 'BUFFER OK'}
              </span>
            </div>
          </div>
        </div>

        {/* 13-Week Detailed Synchronized Breakdown Table */}
        <div className="pt-6 border-t border-border-subtle mt-6 overflow-x-auto">
          <div className="flex items-center justify-between pb-3">
            <span className="text-xs font-mono font-bold text-text-primary uppercase tracking-wider">
              13-Week Ledger Schedule (Click row to focus on chart)
            </span>
            <span className="text-[11px] font-mono text-text-muted">
              Conservation: Closing(t) === Opening(t+1)
            </span>
          </div>

          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-border-subtle text-text-muted text-[11px]">
                <th className="pb-3 font-medium">Timeline</th>
                <th className="pb-3 font-medium text-right">Opening Cash</th>
                <th className="pb-3 font-medium text-right text-emerald-600 dark:text-emerald-400">Inflows</th>
                <th className="pb-3 font-medium text-right text-crimson">Outflows</th>
                <th className="pb-3 font-medium text-right">Closing Cash</th>
                <th className="pb-3 font-medium text-right">Buffer Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {currentWeeks.map((w) => {
                const isSelected = selectedWeek === w.weekNumber;
                return (
                  <tr
                    key={w.weekNumber}
                    onClick={() => setSelectedWeek(w.weekNumber)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-primary/10 border-l-4 border-primary text-text-primary font-bold'
                        : w.isBreached
                        ? 'bg-crimson/5 hover:bg-crimson/10'
                        : 'hover:bg-bg-surface-elevated/70'
                    }`}
                  >
                    <td className="py-3 px-2 font-bold flex items-center gap-2">
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
                      <span>{w.weekLabel}</span>
                      <span className="text-[10px] text-text-muted font-normal">
                        ({w.startDate.slice(5)} &rarr; {w.endDate.slice(5)})
                      </span>
                    </td>
                    <td className="py-3 text-right text-text-secondary tabular-nums">
                      {formatCurrencyAmount(w.openingBalance, selectedCurrency)}
                    </td>
                    <td className="py-3 text-right font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">
                      +{formatCurrencyAmount(w.inflow, selectedCurrency)}
                    </td>
                    <td className="py-3 text-right font-medium text-crimson tabular-nums">
                      -{formatCurrencyAmount(w.outflow, selectedCurrency)}
                    </td>
                    <td className="py-3 text-right font-bold text-text-primary tabular-nums">
                      {formatCurrencyAmount(w.closingBalance, selectedCurrency)}
                    </td>
                    <td className="py-3 text-right">
                      {w.isBreached ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-crimson/15 text-crimson border border-crimson/25 tabular-nums">
                          Deficit ({formatCurrencyAmount(w.deficitAmount, selectedCurrency)})
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          Maintained
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
