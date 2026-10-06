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
} from 'lucide-react';

interface ScreenD3ForecastProps {
  onNavigateToSimulator?: () => void;
}

export default function ScreenD3Forecast({
  onNavigateToSimulator,
}: ScreenD3ForecastProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('VND');

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
            onClick={() => setSelectedCurrency('VND')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCurrency === 'VND'
                ? 'bg-vnd text-white font-bold shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            VND (Operations)
          </button>
          <button
            onClick={() => setSelectedCurrency('CNY')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedCurrency === 'CNY'
                ? 'bg-cny text-white font-bold shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            CNY (Factory Payables)
          </button>
          <button
            onClick={() => setSelectedCurrency('USD')}
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

      {/* Main Full-Width Forecast Chart Panel */}
      <div className="rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-border-subtle">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-text-primary">
              Cash Trajectory ({selectedCurrency})
            </span>
            <span className="text-xs font-mono text-text-muted tabular-nums">
              Buffer Threshold: {formatCurrencyAmount(currentSummary.safeBuffer, selectedCurrency)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {selectedCurrency === 'VND' && onNavigateToSimulator && (
              <button
                onClick={onNavigateToSimulator}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black bg-amber hover:bg-amber/90 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
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

        {/* SVG Precision Chart View */}
        <div className="relative py-4">
          <div className="h-72 sm:h-96 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 1000 360" fill="none">
              {/* Horizontal Grid lines */}
              <line x1="60" y1="60" x2="980" y2="60" stroke="currentColor" className="text-border-subtle" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="60" y1="120" x2="980" y2="120" stroke="currentColor" className="text-border-subtle" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="60" y1="180" x2="980" y2="180" stroke="currentColor" className="text-border-subtle" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="60" y1="240" x2="980" y2="240" stroke="currentColor" className="text-border-subtle" strokeDasharray="3 3" strokeWidth="1" />
              <line x1="60" y1="300" x2="980" y2="300" stroke="currentColor" className="text-border-subtle" strokeDasharray="3 3" strokeWidth="1" />

              {/* Y-axis Text */}
              <text x="10" y="65" fill="currentColor" className="text-text-muted" fontSize="11" fontFamily="monospace">
                {selectedCurrency === 'VND' ? '280M' : selectedCurrency === 'CNY' ? '120k' : '$15k'}
              </text>
              <text x="10" y="185" fill="currentColor" className="text-text-muted" fontSize="11" fontFamily="monospace">
                {selectedCurrency === 'VND' ? '160M' : selectedCurrency === 'CNY' ? '40k' : '$5k'}
              </text>
              <text x="10" y="305" fill="currentColor" className="text-text-muted" fontSize="11" fontFamily="monospace">0</text>

              {/* Dotted Crimson Minimum Buffer Line at y=180 */}
              <line
                x1="60"
                y1="180"
                x2="980"
                y2="180"
                stroke="#EF4444"
                strokeWidth="1.5"
                strokeDasharray="6 4"
              />
              <text x="680" y="172" fill="#EF4444" fontSize="11" fontFamily="monospace" fontWeight="bold">
                Minimum Buffer Threshold: {formatCurrencyAmount(currentSummary.safeBuffer, selectedCurrency)}
              </text>

              {/* Area Gradient */}
              <defs>
                <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={
                      selectedCurrency === 'VND'
                        ? '#10B981'
                        : selectedCurrency === 'CNY'
                        ? '#F97316'
                        : '#2563EB'
                    }
                    stopOpacity="0.2"
                  />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Dynamic Path */}
              {selectedCurrency === 'VND' ? (
                <>
                  <path
                    d="M 80 60 
                       C 120 70, 135 220, 155 220 
                       C 185 220, 215 150, 245 150 
                       C 295 150, 350 110, 420 120 
                       C 500 130, 580 100, 680 90 
                       C 760 80, 850 65, 960 50
                       L 960 320 L 80 320 Z"
                    fill="url(#chart-area-grad)"
                  />
                  <path
                    d="M 80 60 
                       C 120 70, 135 220, 155 220 
                       C 185 220, 215 150, 245 150 
                       C 295 150, 350 110, 420 120 
                       C 500 130, 580 100, 680 90 
                       C 760 80, 850 65, 960 50"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Breach Marker */}
                  <circle cx="155" cy="220" r="6" fill="#EF4444" className="animate-pulse" />
                </>
              ) : (
                <>
                  <path
                    d="M 80 60 C 180 80, 300 110, 500 100 C 700 90, 850 80, 960 70 L 960 320 L 80 320 Z"
                    fill="url(#chart-area-grad)"
                  />
                  <path
                    d="M 80 60 C 180 80, 300 110, 500 100 C 700 90, 850 80, 960 70"
                    stroke={selectedCurrency === 'CNY' ? '#F97316' : '#2563EB'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>

            {/* Week 2 Breach Floating Box */}
            {selectedCurrency === 'VND' && (
              <div className="absolute top-[45%] left-[17%] sm:left-[22%] bg-bg-surface-elevated border border-crimson/50 rounded-xl p-3 shadow-md z-20">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-crimson mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cash Deficit Warning: Week 2</span>
                </div>
                <div className="text-[11px] font-mono text-text-secondary space-y-0.5">
                  <div>
                    150M &lt; 160M Buffer • <span className="text-crimson font-bold">Deficit: 10,000,000 VND</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 13-Week Detailed Breakdown Table */}
        <div className="pt-6 border-t border-border-subtle overflow-x-auto">
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
              {currentWeeks.map((w) => (
                <tr
                  key={w.weekNumber}
                  className={`hover:bg-bg-surface-elevated/50 transition-colors ${
                    w.isBreached ? 'bg-crimson/5' : ''
                  }`}
                >
                  <td className="py-3 font-bold text-text-primary">
                    {w.weekLabel}{' '}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
