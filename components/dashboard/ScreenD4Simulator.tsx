'use client';

import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Percent,
  Calendar,
  CreditCard,
  FileCheck,
} from 'lucide-react';
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
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Week 2 Deficit Mitigation Simulator
          </h2>
          <span className="text-xs text-[#8E8EA8]">
            Coordinate 3 tactical levers to bridge the 10M VND deficit below the 160M VND safety buffer
          </span>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-[#00D4AA] hover:bg-[#05F3C4] shadow-lg shadow-[#00D4AA]/25 transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <FileCheck className="w-4 h-4" />
          <span>Sign-off on This Scenario</span>
        </button>
      </div>

      {/* Split-Screen: Left (Interactive Levers) | Right (Before & After Comparison) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 3 Interactive Control Levers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8E8EA8] block mb-5">
              3 Tactical Control Levers
            </span>

            {/* Lever 1: Accelerate Wholesale Receivables */}
            <div className={`p-4 rounded-xl border transition-all mb-4 ${
              lever1Enabled ? 'bg-[#161622] border-[#00D4AA]/50 shadow-md' : 'bg-[#0A0A0F] border-[#232336] opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-[#00D4AA]" />
                  <span className="text-xs font-bold text-white">Lever 1: Accelerate Receivables</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lever1Enabled}
                    onChange={(e) => setLever1Enabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#232336] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D4AA]"></div>
                </label>
              </div>

              {lever1Enabled && (
                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[#8E8EA8] mb-1">
                      <span>Accelerated Inflow:</span>
                      <span className="text-[#00D4AA] font-bold">{formatCurrencyAmount(lever1Amount, 'VND')}</span>
                    </div>
                    <input
                      type="range"
                      min={10_000_000}
                      max={100_000_000}
                      step={5_000_000}
                      value={lever1Amount}
                      onChange={(e) => setLever1Amount(Number(e.target.value))}
                      className="w-full accent-[#00D4AA]"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8E8EA8]">
                    <span>Early Cash Discount ({lever1Discount}%):</span>
                    <span className="text-[#FF4757]">-{formatCurrencyAmount((lever1Amount * lever1Discount) / 100, 'VND')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Lever 2: Defer 1688 OEM Payables */}
            <div className={`p-4 rounded-xl border transition-all mb-4 ${
              lever2Enabled ? 'bg-[#161622] border-[#00D4AA]/50 shadow-md' : 'bg-[#0A0A0F] border-[#232336] opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#FF6B35]" />
                  <span className="text-xs font-bold text-white">Lever 2: Defer 1688 Vendor Payables</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lever2Enabled}
                    onChange={(e) => setLever2Enabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#232336] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D4AA]"></div>
                </label>
              </div>

              {lever2Enabled && (
                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[#8E8EA8] mb-1">
                      <span>Deferred Amount:</span>
                      <span className="text-[#00D4AA] font-bold">{formatCurrencyAmount(lever2Amount, 'VND')}</span>
                    </div>
                    <input
                      type="range"
                      min={10_000_000}
                      max={80_000_000}
                      step={5_000_000}
                      value={lever2Amount}
                      onChange={(e) => setLever2Amount(Number(e.target.value))}
                      className="w-full accent-[#00D4AA]"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8E8EA8]">
                    <span>Extension Term:</span>
                    <span className="text-white">+{lever2Days} Days (Deferred to Week 4)</span>
                  </div>
                </div>
              )}
            </div>

            {/* Lever 3: Draw Revolving Credit Facility */}
            <div className={`p-4 rounded-xl border transition-all ${
              lever3Enabled ? 'bg-[#161622] border-[#00D4AA]/50 shadow-md' : 'bg-[#0A0A0F] border-[#232336] opacity-70'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#4D9FFF]" />
                  <span className="text-xs font-bold text-white">Lever 3: Revolving Credit Facility</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lever3Enabled}
                    onChange={(e) => setLever3Enabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#232336] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D4AA]"></div>
                </label>
              </div>

              {lever3Enabled && (
                <div className="space-y-3 pt-2 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[#8E8EA8] mb-1">
                      <span>Drawdown Facility:</span>
                      <span className="text-[#00D4AA] font-bold">{formatCurrencyAmount(lever3Amount, 'VND')}</span>
                    </div>
                    <input
                      type="range"
                      min={10_000_000}
                      max={100_000_000}
                      step={5_000_000}
                      value={lever3Amount}
                      onChange={(e) => setLever3Amount(Number(e.target.value))}
                      className="w-full accent-[#00D4AA]"
                    />
                  </div>
                  <div className="flex justify-between text-[11px] text-[#8E8EA8]">
                    <span>Interest Rate:</span>
                    <span className="text-white">{lever3Rate}% APR</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Real-Time Comparison */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#232336]">
              <span className="text-sm font-bold text-white">Pre- vs Post-Mitigation Trajectory</span>
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="flex items-center gap-1.5 text-[#FF4757]">
                  <span className="w-2.5 h-1 bg-[#FF4757] rounded" /> Baseline
                </span>
                <span className="flex items-center gap-1.5 text-[#00D4AA]">
                  <span className="w-2.5 h-1 bg-[#00D4AA] rounded" /> Post-Mitigation
                </span>
              </div>
            </div>

            {/* Comparison SVG Chart */}
            <div className="h-56 w-full relative py-2">
              <svg className="w-full h-full" viewBox="0 0 500 180" fill="none">
                {/* Horizontal Buffer Line at y=100 (160M) */}
                <line x1="20" y1="100" x2="480" y2="100" stroke="#6E6E87" strokeDasharray="3 3" />
                <text x="390" y="95" fill="#8E8EA8" fontSize="10" fontFamily="monospace">Buffer 160M ₫</text>

                {/* Baseline Red Dip (150M at Week 2 -> y=125) */}
                <path
                  d="M 30 50 C 50 55, 75 125, 95 125 C 115 125, 135 90, 155 90 C 200 90, 250 80, 320 85 C 380 90, 420 80, 470 70"
                  stroke="#FF4757"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Simulated Green Curve Rescued (Above buffer -> y=65) */}
                <path
                  d="M 30 50 C 50 50, 75 65, 95 65 C 115 65, 135 60, 155 60 C 200 60, 250 45, 320 40 C 380 35, 420 30, 470 25"
                  stroke="#00D4AA"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Rescued Point Pill at x=95, y=65 */}
                <circle cx="95" cy="65" r="5" fill="#00D4AA" />
              </svg>
            </div>

            {/* KPI Status Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#232336]">
              <div className="p-4 rounded-xl bg-[#161622] border border-[#232336]">
                <span className="text-[11px] font-mono text-[#8E8EA8] block mb-1">
                  Week 2 Balance Post-Mitigation:
                </span>
                <div className="font-mono text-xl font-bold flex items-center gap-2">
                  <span className={simulationResult.isRescued ? 'text-[#00D4AA]' : 'text-[#FF4757]'}>
                    {formatCurrencyAmount(simulationResult.week2SimulatedClosing, 'VND')}
                  </span>
                  {simulationResult.isRescued && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00D4AA]/15 text-[#00D4AA]">
                      Solvent
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-[#00D4AA] block mt-1">
                  +{formatCurrencyAmount(simulationResult.netSurplusAboveBuffer, 'VND')} surplus above buffer
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#161622] border border-[#232336]">
                <span className="text-[11px] font-mono text-[#8E8EA8] block mb-1">
                  Total Cost of Capital:
                </span>
                <div className="font-mono text-xl font-bold text-white">
                  {formatCurrencyAmount(simulationResult.totalCapitalCost, 'VND')}
                </div>
                <span className="text-[11px] font-mono text-[#8E8EA8] block mt-1">
                  Early cash discounts + interest expense
                </span>
              </div>
            </div>

            {/* Action Plan Details */}
            <div className="mt-4 pt-4 border-t border-[#232336] space-y-2">
              <span className="text-xs font-mono font-semibold text-white block">
                Tactical Implementation Directives:
              </span>
              {simulationResult.actionPlan.map((action, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-[#232336] text-xs">
                  <span className="font-semibold text-white block mb-0.5">{action.title}</span>
                  <span className="text-[#8E8EA8] leading-relaxed block">{action.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
