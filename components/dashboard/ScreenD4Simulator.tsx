'use client';

import React, { useState, useMemo } from 'react';
import {
  Percent,
  Calendar,
  CreditCard,
  FileCheck,
} from 'lucide-react';
import InteractiveForecastChart from '@/components/charts/InteractiveForecastChart';
import { VND_SUMMARY, DEFAULT_RESCUE_PRESETS } from '@/data/shopx-dataset';
import { simulateMitigationScenario, formatCurrencyAmount } from '@/lib/finance-engine';
import { ScenarioParams } from '@/types/finance';

interface ScreenD4SimulatorProps {
  onOpenReportModal: () => void;
}

export default function ScreenD4Simulator({ onOpenReportModal }: ScreenD4SimulatorProps) {
  // Lever 1 State
  const [lever1Enabled, setLever1Enabled] = useState(DEFAULT_RESCUE_PRESETS.lever1_accelerateReceivables.enabled);
  const [lever1Amount, setLever1Amount] = useState(DEFAULT_RESCUE_PRESETS.lever1_accelerateReceivables.amount);
  const [lever1Discount, setLever1Discount] = useState(DEFAULT_RESCUE_PRESETS.lever1_accelerateReceivables.discountPct);

  // Lever 2 State
  const [lever2Enabled, setLever2Enabled] = useState(DEFAULT_RESCUE_PRESETS.lever2_deferPayables.enabled);
  const [lever2Amount, setLever2Amount] = useState(DEFAULT_RESCUE_PRESETS.lever2_deferPayables.amount);
  const [lever2Days, setLever2Days] = useState(DEFAULT_RESCUE_PRESETS.lever2_deferPayables.days);

  // Lever 3 State
  const [lever3Enabled, setLever3Enabled] = useState(DEFAULT_RESCUE_PRESETS.lever3_creditLine.enabled);
  const [lever3Amount, setLever3Amount] = useState(DEFAULT_RESCUE_PRESETS.lever3_creditLine.amount);
  const [lever3Rate, setLever3Rate] = useState(DEFAULT_RESCUE_PRESETS.lever3_creditLine.annualRatePct);

  // Run pure simulation through finance engine
  const simulationResult = useMemo(() => {
    const params: ScenarioParams = {
      accelerateReceivables: lever1Enabled,
      accelerateReceivablesAmount: lever1Amount,
      accelerateReceivablesDiscountPct: lever1Discount,
      deferPayables: lever2Enabled,
      deferPayablesAmount: lever2Amount,
      deferPayablesDays: lever2Days,
      creditLineDrawn: lever3Enabled,
      creditLineAmount: lever3Amount,
      creditLineAnnualRatePct: lever3Rate,
    };

    return simulateMitigationScenario(VND_SUMMARY, params);
  }, [
    lever1Enabled,
    lever1Amount,
    lever1Discount,
    lever2Enabled,
    lever2Amount,
    lever2Days,
    lever3Enabled,
    lever3Amount,
    lever3Rate,
  ]);

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">
            Week 2 Deficit Mitigation Simulator
          </h2>
          <span className="text-xs text-text-muted">
            Coordinate 3 tactical levers to bridge the 10M VND deficit below the 160M VND safety buffer
          </span>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <FileCheck className="w-4 h-4" />
          <span>Sign-off on This Scenario</span>
        </button>
      </div>

      {/* Split-Screen: Left (Interactive Levers) | Right (Before & After Comparison) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 3 Interactive Control Levers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-bg-surface border border-border-main p-6 shadow-xs">
            <span className="text-xs font-mono uppercase tracking-wider text-text-muted block mb-5">
              3 Tactical Control Levers
            </span>

            {/* Lever 1: Accelerate Wholesale Receivables */}
            <div className={`p-4 rounded-xl border transition-all mb-4 ${
              lever1Enabled ? 'bg-bg-surface-elevated border-primary/40 shadow-xs' : 'bg-bg-surface border-border-main opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-text-primary">Lever 1: Accelerate Receivables</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lever1Enabled}
                    onChange={(e) => setLever1Enabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-border-main peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              {lever1Enabled && (
                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-text-muted mb-1">
                      <span>Accelerated Inflow:</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold tabular-nums">{formatCurrencyAmount(lever1Amount, 'VND')}</span>
                    </div>
                    <input
                      type="range"
                      min={10_000_000}
                      max={100_000_000}
                      step={5_000_000}
                      value={lever1Amount}
                      onChange={(e) => setLever1Amount(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-text-muted">
                    <span>Early Cash Discount ({lever1Discount}%):</span>
                    <span className="text-crimson font-medium tabular-nums">-{formatCurrencyAmount((lever1Amount * lever1Discount) / 100, 'VND')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Lever 2: Defer 1688 OEM Payables */}
            <div className={`p-4 rounded-xl border transition-all mb-4 ${
              lever2Enabled ? 'bg-bg-surface-elevated border-cny/40 shadow-xs' : 'bg-bg-surface border-border-main opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-cny" />
                  <span className="text-xs font-bold text-text-primary">Lever 2: Defer 1688 Vendor Payables</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lever2Enabled}
                    onChange={(e) => setLever2Enabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-border-main peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cny"></div>
                </label>
              </div>

              {lever2Enabled && (
                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-text-muted mb-1">
                      <span>Deferred Amount:</span>
                      <span className="text-cny font-bold tabular-nums">{formatCurrencyAmount(lever2Amount, 'VND')}</span>
                    </div>
                    <input
                      type="range"
                      min={10_000_000}
                      max={80_000_000}
                      step={5_000_000}
                      value={lever2Amount}
                      onChange={(e) => setLever2Amount(Number(e.target.value))}
                      className="w-full accent-cny"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-text-muted">
                    <span>Extension Term:</span>
                    <span className="text-text-primary font-medium">+{lever2Days} Days (Deferred to Week 4)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Lever 3: Draw Revolving Credit Facility */}
            <div className={`p-4 rounded-xl border transition-all ${
              lever3Enabled ? 'bg-bg-surface-elevated border-usd/40 shadow-xs' : 'bg-bg-surface border-border-main opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-usd" />
                  <span className="text-xs font-bold text-text-primary">Lever 3: Revolving Credit Facility</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lever3Enabled}
                    onChange={(e) => setLever3Enabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-border-main peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-usd"></div>
                </label>
              </div>

              {lever3Enabled && (
                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-text-muted mb-1">
                      <span>Drawdown Facility:</span>
                      <span className="text-usd font-bold tabular-nums">{formatCurrencyAmount(lever3Amount, 'VND')}</span>
                    </div>
                    <input
                      type="range"
                      min={10_000_000}
                      max={100_000_000}
                      step={5_000_000}
                      value={lever3Amount}
                      onChange={(e) => setLever3Amount(Number(e.target.value))}
                      className="w-full accent-usd"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-text-muted">
                    <span>Interest Rate:</span>
                    <span className="text-text-primary font-medium">{lever3Rate}% APR</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Comparison */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-bg-surface border border-border-main p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border-subtle">
              <span className="text-sm font-bold text-text-primary">Pre- vs Post-Mitigation Trajectory</span>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-crimson font-medium">
                  <span className="w-2.5 h-1 bg-crimson rounded" /> Baseline
                </span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-2.5 h-1 bg-emerald-500 rounded" /> Post-Mitigation
                </span>
              </div>
            </div>

            {/* Interactive Dynamic Comparison Spline Chart */}
            <div className="py-2">
              <InteractiveForecastChart
                weeks={simulationResult.baseline.weeks}
                comparisonWeeks={simulationResult.simulated.weeks}
                currency="VND"
                bufferThreshold={160_000_000}
                selectedWeek={2}
                heightClassName="h-60 sm:h-72"
                showScrubber={false}
              />
            </div>

            {/* KPI Status Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
              <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main">
                <span className="text-[11px] font-mono text-text-muted block mb-1">
                  Week 2 Balance Post-Mitigation:
                </span>
                <div className="font-mono text-xl font-bold flex items-center gap-2">
                  <span className={simulationResult.isRescued ? 'text-emerald-600 dark:text-emerald-400' : 'text-crimson'}>
                    {formatCurrencyAmount(simulationResult.week2SimulatedClosing, 'VND')}
                  </span>
                  {simulationResult.isRescued && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      Solvent
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 block mt-1">
                  +{formatCurrencyAmount(simulationResult.netSurplusAboveBuffer, 'VND')} surplus above buffer
                </span>
              </div>

              <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main">
                <span className="text-[11px] font-mono text-text-muted block mb-1">
                  Total Cost of Capital:
                </span>
                <div className="font-mono text-xl font-bold text-text-primary">
                  {formatCurrencyAmount(simulationResult.totalCapitalCost, 'VND')}
                </div>
                <span className="text-[11px] font-mono text-text-muted block mt-1">
                  Early cash discounts + interest expense
                </span>
              </div>
            </div>

            {/* Action Plan Details */}
            <div className="mt-4 pt-4 border-t border-border-subtle space-y-2">
              <span className="text-xs font-mono font-semibold text-text-primary block">
                Tactical Implementation Directives:
              </span>
              {simulationResult.actionPlan.map((action, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-bg-surface-elevated border border-border-main text-xs">
                  <span className="font-semibold text-text-primary block mb-0.5">{action.title}</span>
                  <span className="text-text-secondary leading-relaxed block">{action.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
