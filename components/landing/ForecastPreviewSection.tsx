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
    <section id="forecast" className="relative py-28 bg-[#0A0A0F] overflow-hidden border-b border-[#232336]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#00D4AA]/5 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-xs font-mono text-[#00D4AA] mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Operational Nucleus</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            13-Week Liquidity Trajectory
          </h2>
          <p className="text-base text-[#A1A1BA] max-w-2xl mx-auto">
            Chained mathematical conservation: <code>Closing(t) === Opening(t+1)</code>. Pinpoint the exact day and dollar of liquidity shortfall before payroll or inventory defaults.
          </p>
        </div>

        {/* Interactive Dashboard Forecast Card */}
        <div className="rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232336]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-white tracking-tight">13-Week Cash Position (VND Ledger)</h3>
                <span className="w-2.5 h-2.5 rounded-full bg-[#00D4AA] animate-pulse" />
              </div>
              <span className="text-xs text-[#8E8EA8] font-mono">
                Initial Balance: 280,000,000 ₫ • Minimum Buffer: 160,000,000 ₫
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[#FFAA00] bg-[#FFAA00]/10 border border-[#FFAA00]/30 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Deficit Detected: Week 2
              </span>
              <Link
                href="/dashboard"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-black bg-[#00D4AA] hover:bg-[#05F3C4] transition-all flex items-center gap-1.5 shadow-md shadow-[#00D4AA]/20"
              >
                <span>Full Cockpit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Interactive SVG Area Chart */}
          <div className="relative py-8">
            <div className="h-64 sm:h-80 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 1000 320" fill="none">
                {/* Horizontal Grid lines */}
                <line x1="60" y1="60" x2="980" y2="60" stroke="#1F1F2E" strokeWidth="1" />
                <line x1="60" y1="120" x2="980" y2="120" stroke="#1F1F2E" strokeWidth="1" />
                <line x1="60" y1="180" x2="980" y2="180" stroke="#1F1F2E" strokeWidth="1" />
                <line x1="60" y1="240" x2="980" y2="240" stroke="#1F1F2E" strokeWidth="1" />

                {/* Y-axis Labels */}
                <text x="10" y="65" fill="#6E6E87" fontSize="12" fontFamily="monospace">600M</text>
                <text x="10" y="125" fill="#6E6E87" fontSize="12" fontFamily="monospace">350M</text>
                <text x="10" y="185" fill="#6E6E87" fontSize="12" fontFamily="monospace">160M</text>
                <text x="10" y="245" fill="#6E6E87" fontSize="12" fontFamily="monospace">50M</text>

                {/* Red Dotted Safe Buffer Line (160M VND at y=180) */}
                <line
                  x1="60"
                  y1="180"
                  x2="980"
                  y2="180"
                  stroke="#FF4757"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <text x="730" y="172" fill="#FF4757" fontSize="12" fontFamily="monospace" fontWeight="600">
                  Minimum Buffer Line: 160M VND
                </text>

                {/* Area Gradient Defs */}
                <defs>
                  <linearGradient id="forecast-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.3" />
                    <stop offset="60%" stopColor="#00D4AA" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
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
                  stroke="#00D4AA"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Points */}
                {points.map((pt) => {
                  const isSelected = activeWeek === pt.week;
                  return (
                    <g key={pt.week} onClick={() => setActiveWeek(pt.week)} className="cursor-pointer">
                      {pt.isBreach && (
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? 14 : 10}
                          fill="#FF4757"
                          fillOpacity="0.25"
                          className="animate-ping"
                        />
                      )}
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSelected ? 7 : 5}
                        fill={pt.isBreach ? '#FF4757' : '#00D4AA'}
                        stroke="#111118"
                        strokeWidth="2.5"
                      />
                      <text
                        x={pt.x}
                        y={pt.y - 12}
                        textAnchor="middle"
                        fill={pt.isBreach ? '#FF4757' : isSelected ? '#FFFFFF' : '#8E8EA8'}
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight={isSelected || pt.isBreach ? '700' : '500'}
                      >
                        {pt.val}
                      </text>
                      <text
                        x={pt.x}
                        y="280"
                        textAnchor="middle"
                        fill={isSelected ? '#00D4AA' : '#6E6E87'}
                        fontSize="11"
                        fontFamily="monospace"
                        fontWeight={isSelected ? '700' : '400'}
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
          <div className="pt-6 border-t border-[#232336] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-[#161622] border border-[#232336]">
              <span className="text-[11px] font-mono text-[#8E8EA8] block mb-1">SELECTED INTERVAL</span>
              <span className="text-base font-bold text-white font-mono flex items-center gap-2">
                Week {selectedWeekData.weekNumber}
                <span className="text-xs text-[#A1A1BA] font-normal">
                  ({TIMELINE_WEEKS[activeWeek - 1]?.startDate})
                </span>
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#161622] border border-[#232336]">
              <span className="text-[11px] font-mono text-[#00D4AA] flex items-center gap-1 mb-1">
                <ArrowUpRight className="w-3.5 h-3.5" />
                WEEK INFLOWS
              </span>
              <span className="text-base font-bold text-white font-mono">
                +{selectedWeekData.inflow.toLocaleString('en-US')} ₫
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#161622] border border-[#232336]">
              <span className="text-[11px] font-mono text-[#FF4757] flex items-center gap-1 mb-1">
                <ArrowDownRight className="w-3.5 h-3.5" />
                WEEK OUTFLOWS
              </span>
              <span className="text-base font-bold text-white font-mono">
                -{selectedWeekData.outflow.toLocaleString('en-US')} ₫
              </span>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${
              selectedWeekData.isBreached
                ? 'bg-[#FF4757]/10 border-[#FF4757]/40 text-[#FF4757]'
                : 'bg-[#00D4AA]/10 border-[#00D4AA]/30 text-[#00D4AA]'
            }`}>
              <span className="text-[11px] font-mono block mb-1">
                CLOSING POSITION
              </span>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold font-mono">
                  {selectedWeekData.closingBalance.toLocaleString('en-US')} ₫
                </span>
                {selectedWeekData.isBreached ? (
                  <span className="text-[10px] font-mono bg-[#FF4757] text-black font-bold px-1.5 py-0.5 rounded">
                    DEFICIT
                  </span>
                ) : (
                  <span className="text-[10px] font-mono bg-[#00D4AA] text-black font-bold px-1.5 py-0.5 rounded">
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
