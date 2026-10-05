'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, AlertTriangle, Calendar, TrendingUp } from 'lucide-react';
import { VND_BASELINE_FORECAST } from '@/data/shopx-dataset';
import { formatCurrencyAmount } from '@/lib/finance-engine';

export default function ForecastPreviewSection() {
  const [activeWeek, setActiveWeek] = useState<number>(2); // Default to Week 2 breach

  const selectedWeekData = VND_BASELINE_FORECAST.find((w) => w.weekNumber === activeWeek) || VND_BASELINE_FORECAST[1];

  return (
    <section id="forecast-preview" className="relative py-28 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-mono text-[#00d4aa] mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>Trọng Tâm Điều Hành</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Dự Báo Dòng Tiền 13 Tuần Chuẩn Xác
          </h2>
          <p className="text-base text-[#8e8ea8]">
            Thuật toán pure functions bảo toàn số dư lũy kế: Closing(t) = Opening(t+1). Phát hiện lỗ hổng thanh khoản trước khi ảnh hưởng vận hành.
          </p>
        </div>

        {/* Dashboard Frame Preview (Direct from Image 05) */}
        <div className="rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative">
          {/* Top Bar of the Forecast Tool */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#232336]">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                Dự Báo Dòng Tiền 13 Tuần (VND)
                <span className="w-2 h-2 rounded-full bg-[#00d4aa]" />
              </h3>
              <span className="text-xs text-[#8e8ea8] font-mono">
                Số dư ban đầu: 280.000.000 ₫ • Ngưỡng an toàn tối thiểu: 160.000.000 ₫
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#ffaa00] bg-[#ffaa00]/10 border border-[#ffaa00]/30 px-3 py-1 rounded-full flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Cảnh báo vi phạm: Tuần 2
              </span>
              <Link
                href="/dashboard"
                className="px-4 py-1.5 rounded-full text-xs font-semibold text-black bg-[#00d4aa] hover:bg-[#05f3c4] transition-all flex items-center gap-1"
              >
                <span>Xem Chi Tiết</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* SVG Interactive Area Chart (Replicating Image 05) */}
          <div className="relative py-8">
            <div className="h-64 sm:h-80 w-full relative">
              <svg className="w-full h-full" viewBox="0 0 1000 320" fill="none">
                {/* Horizontal Grid lines */}
                <line x1="60" y1="60" x2="980" y2="60" stroke="#1f1f2e" strokeWidth="1" />
                <line x1="60" y1="120" x2="980" y2="120" stroke="#1f1f2e" strokeWidth="1" />
                <line x1="60" y1="180" x2="980" y2="180" stroke="#1f1f2e" strokeWidth="1" />
                <line x1="60" y1="240" x2="980" y2="240" stroke="#1f1f2e" strokeWidth="1" />

                {/* Y-axis Labels */}
                <text x="10" y="65" fill="#6e6e87" fontSize="12" fontFamily="monospace">280M</text>
                <text x="10" y="125" fill="#6e6e87" fontSize="12" fontFamily="monospace">220M</text>
                <text x="10" y="185" fill="#6e6e87" fontSize="12" fontFamily="monospace">160M</text>
                <text x="10" y="245" fill="#6e6e87" fontSize="12" fontFamily="monospace">100M</text>

                {/* Dotted Red Minimum Buffer Line (160M VND at y=180) */}
                <line
                  x1="60"
                  y1="180"
                  x2="980"
                  y2="180"
                  stroke="#ff4757"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
                <text x="750" y="172" fill="#ff4757" fontSize="12" fontFamily="monospace" fontWeight="600">
                  Ngưỡng An Toàn Tối Thiểu: 160M VND
                </text>

                {/* Cash Curve Gradient Fill */}
                <defs>
                  <linearGradient id="curve-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.3" />
                    <stop offset="60%" stopColor="#00d4aa" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Dynamic Area Fill */}
                <path
                  d="M 80 60 
                     C 120 70, 140 220, 160 220
                     C 190 220, 220 150, 250 150
                     C 300 150, 350 110, 420 120
                     C 500 130, 580 100, 680 90
                     C 760 80, 850 65, 960 50
                     L 960 280 L 80 280 Z"
                  fill="url(#curve-gradient)"
                />

                {/* Dynamic Curve Stroke */}
                <path
                  d="M 80 60 
                     C 120 70, 140 220, 160 220
                     C 190 220, 220 150, 250 150
                     C 300 150, 350 110, 420 120
                     C 500 130, 580 100, 680 90
                     C 760 80, 850 65, 960 50"
                  stroke="#00d4aa"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Breach Highlight at Week 2 (x=160, y=220 -> 150M) */}
                <circle cx="160" cy="220" r="7" fill="#ff4757" className="animate-pulse" />
                <circle cx="160" cy="220" r="14" stroke="#ff4757" strokeWidth="2" opacity="0.4" />
              </svg>

              {/* Floating Alert Card Callout over Week 2 (Direct from image 05) */}
              <div className="absolute top-[38%] left-[18%] sm:left-[22%] bg-[#1c1c2b] border border-[#ff4757] rounded-xl p-3.5 shadow-2xl shadow-[#ff4757]/20 backdrop-blur-xl max-w-xs z-20">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff4757] mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cảnh Báo Thiếu Hụt: Tuần 2</span>
                </div>
                <div className="text-[11px] font-mono text-[#f1f2f6] space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-[#8e8ea8]">Số dư đóng kỳ:</span>
                    <span className="font-bold text-[#ff4757]">150.0M VND</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8e8ea8]">Ngưỡng tối thiểu:</span>
                    <span>160.0M VND</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#232336] text-[#ff4757] font-semibold">
                    <span>Thâm hụt rủi ro:</span>
                    <span>-10.0M VND</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Week Selector Chips (W1 to W13) */}
            <div className="flex items-center justify-between gap-1 overflow-x-auto pt-4 mt-2 border-t border-[#232336]/60">
              {VND_BASELINE_FORECAST.map((w) => {
                const isSelected = activeWeek === w.weekNumber;
                return (
                  <button
                    key={w.weekNumber}
                    onClick={() => setActiveWeek(w.weekNumber)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                      isSelected
                        ? w.isBreached
                          ? 'bg-[#ff4757] text-white font-bold shadow-lg shadow-[#ff4757]/30'
                          : 'bg-[#00d4aa] text-black font-bold shadow-lg shadow-[#00d4aa]/30'
                        : w.isBreached
                        ? 'bg-[#ff4757]/15 text-[#ff4757] border border-[#ff4757]/40 hover:bg-[#ff4757]/25'
                        : 'bg-[#161622] text-[#8e8ea8] hover:text-white border border-[#232336]'
                    }`}
                  >
                    {w.weekLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Week Tooltip Details Bar */}
          <div className="mt-4 p-4 rounded-xl bg-[#161622] border border-[#232336] grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono text-xs">
            <div>
              <span className="text-[#8e8ea8] block text-[10px]">Kỳ Báo Cáo</span>
              <span className="text-white font-semibold">{selectedWeekData.weekLabel}</span>
            </div>
            <div>
              <span className="text-[#8e8ea8] block text-[10px]">Đầu Kỳ</span>
              <span className="text-white font-semibold">{formatCurrencyAmount(selectedWeekData.openingBalance, 'VND')}</span>
            </div>
            <div>
              <span className="text-[#8e8ea8] block text-[10px]">Dòng Thu Vào</span>
              <span className="text-[#00d4aa] font-semibold">+{formatCurrencyAmount(selectedWeekData.inflow, 'VND')}</span>
            </div>
            <div>
              <span className="text-[#8e8ea8] block text-[10px]">Dòng Chi Ra</span>
              <span className="text-[#ff4757] font-semibold">-{formatCurrencyAmount(selectedWeekData.outflow, 'VND')}</span>
            </div>
            <div>
              <span className="text-[#8e8ea8] block text-[10px]">Cuối Kỳ</span>
              <span className={`font-bold ${selectedWeekData.isBreached ? 'text-[#ff4757]' : 'text-[#00d4aa]'}`}>
                {formatCurrencyAmount(selectedWeekData.closingBalance, 'VND')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
