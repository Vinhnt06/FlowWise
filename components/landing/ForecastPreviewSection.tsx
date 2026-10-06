'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, Calendar, TrendingUp, ShieldCheck, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { VND_BASELINE_FORECAST, TIMELINE_WEEKS } from '@/data/shopx-dataset';

export default function ForecastPreviewSection() {
  const [activeWeek, setActiveWeek] = useState<number>(2); // Default to Week 2 breach

  const selectedWeekData = VND_BASELINE_FORECAST.find((w) => w.weekNumber === activeWeek) || VND_BASELINE_FORECAST[1];

  // Coordinates for the 13 points on the 1000x320 SVG chart
  const points = [
    { x: 80, y: 60, week: 1, val: '280M' },
    { x: 155, y: 200, week: 2, val: '150M', isBreach: true },
    { x: 230, y: 150, week: 3, val: '190M' },
    { x: 305, y: 110, week: 4, val: '235M' },
    { x: 380, y: 80, week: 5, val: '285M' },
    { x: 455, y: 65, week: 6, val: '325M' },
    { x: 530, y: 55, week: 7, val: '365M' },
    { x: 605, y: 50, week: 8, val: '400M' },
    { x: 680, y: 40, week: 9, val: '465M' },
    { x: 755, y: 35, week: 10, val: '505M' },
    { x: 830, y: 30, week: 11, val: '575M' },
    { x: 905, y: 25, week: 12, val: '650M' },
    { x: 980, y: 20, week: 13, val: '710M' },
  ];

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
        <div className="rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-8 shadow-sm transition-colors duration-200">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border-subtle">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-text-primary tracking-tight">13-Week Cash Position (VND Ledger)</h3>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-xs text-text-muted font-mono tabular-nums">
                Initial Balance: 280,000,000 ₫ • Minimum Buffer: 160,000,000 ₫
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-medium text-amber bg-amber/10 border border-amber/25 px-3 py-1 rounded-full flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Deficit Detected: Week 2
              </span>
              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Full Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive SVG Area Chart */}
          <div className="relative py-6">
            <div className="h-64 sm:h-80 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 1000 320" fill="none">
                {/* Horizontal Grid lines */}
                <line x1="60" y1="60" x2="980" y2="60" stroke="currentColor" className="text-border-subtle" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="120" x2="980" y2="120" stroke="currentColor" className="text-border-subtle" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="180" x2="980" y2="180" stroke="currentColor" className="text-border-subtle" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="60" y1="240" x2="980" y2="240" stroke="currentColor" className="text-border-subtle" strokeWidth="1" strokeDasharray="3 3" />

                {/* Y-axis Labels */}
                <text x="10" y="65" fill="currentColor" className="text-text-muted" fontSize="11" fontFamily="monospace">600M</text>
                <text x="10" y="125" fill="currentColor" className="text-text-muted" fontSize="11" fontFamily="monospace">350M</text>
                <text x="10" y="185" fill="currentColor" className="text-text-muted" fontSize="11" fontFamily="monospace">160M</text>
                <text x="10" y="245" fill="currentColor" className="text-text-muted" fontSize="11" fontFamily="monospace">50M</text>

                {/* Red Dotted Safe Buffer Line (160M VND at y=180) */}
                <line
                  x1="60"
                  y1="180"
                  x2="980"
                  y2="180"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <text x="730" y="172" fill="#EF4444" fontSize="11" fontFamily="monospace" fontWeight="600">
                  Minimum Buffer Line: 160M VND
                </text>

                {/* Area Gradient Defs */}
                <defs>
                  <linearGradient id="forecast-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.22" />
                    <stop offset="60%" stopColor="#10B981" stopOpacity="0.04" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Shaded Area */}
                <path
                  d="M 80 60 L 155 200 L 230 150 L 305 110 L 380 80 L 455 65 L 530 55 L 605 50 L 680 40 L 755 35 L 830 30 L 905 25 L 980 20 L 980 300 L 80 300 Z"
                  fill="url(#forecast-gradient)"
                />

                {/* Main Cash Line */}
                <path
                  d="M 80 60 L 155 200 L 230 150 L 305 110 L 380 80 L 455 65 L 530 55 L 605 50 L 680 40 L 755 35 L 830 30 L 905 25 L 980 20"
                  stroke="#10B981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Points */}
                {points.map((pt) => {
                  const isSelected = activeWeek === pt.week;
                  return (
                    <g key={pt.week} onClick={() => setActiveWeek(pt.week)} className="cursor-pointer group">
                      {pt.isBreach && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? 12 : 9}
                          fill="#EF4444"
                          fillOpacity="0.2"
                          className="animate-ping"
                        />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 6 : 4.5}
                        fill={pt.isBreach ? '#EF4444' : '#10B981'}
                        stroke="currentColor"
                        className="text-bg-surface"
                        strokeWidth="2"
                      />
                      <text
                        x={pt.x}
                        y={pt.y - 10}
                        textAnchor="middle"
                        fill="currentColor"
                        className={pt.isBreach ? 'text-crimson font-bold' : isSelected ? 'text-text-primary font-bold' : 'text-text-muted font-normal'}
                        fontSize="11"
                        fontFamily="monospace"
                      >
                        {pt.val}
                      </text>
                      <text
                        x={pt.x}
                        y="280"
                        textAnchor="middle"
                        fill="currentColor"
                        className={isSelected ? 'text-primary font-bold' : 'text-text-muted font-normal'}
                        fontSize="11"
                        fontFamily="monospace"
                      >
                        W{pt.week}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
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
                +{selectedWeekData.inflow.toLocaleString('en-US')} ₫
              </span>
            </div>

            <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main">
              <span className="text-[11px] font-mono text-crimson flex items-center gap-1 mb-1 font-semibold">
                <ArrowDownRight className="w-3.5 h-3.5" />
                WEEK OUTFLOWS
              </span>
              <span className="text-base font-bold text-text-primary font-mono tabular-nums">
                -{selectedWeekData.outflow.toLocaleString('en-US')} ₫
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
                  {selectedWeekData.closingBalance.toLocaleString('en-US')} ₫
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
        </div>
      </div>
    </section>
  );
}
