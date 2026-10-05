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
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function ScreenD3Forecast({
  onNavigateToSimulator,
}: {
  onNavigateToSimulator?: () => void;
}) {
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
    csvContent += 'Tuan,Ngay Bat Dau,Ngay Ket Thuc,Dau Ky,Thu Vao,Chi Ra,Dong Tien Thuan,Cuoi Ky,Trang Thai Buffer\n';
    currentWeeks.forEach((w) => {
      csvContent += `${w.weekLabel},${w.startDate},${w.endDate},${w.openingBalance},${w.inflow},${w.outflow},${w.netCashflow},${w.closingBalance},${w.isBreached ? 'THIEU HUT' : 'AN TOAN'}\n`;
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
      {/* Top Controls: Currency Filter Selector Pills (Direct from Image D3) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Dự Báo Dòng Tiền 13 Tuần</h2>
          <span className="text-xs text-[#8e8ea8]">
            Động cơ thuần nhất bảo toàn chuỗi thanh khoản Closing(t) = Opening(t+1)
          </span>
        </div>

        {/* Currency Switcher Tabs */}
        <div className="flex items-center gap-2 bg-[#161622] p-1.5 rounded-xl border border-[#232336]">
          <button
            onClick={() => setSelectedCurrency('VND')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedCurrency === 'VND'
                ? 'bg-[#00d4aa] text-black font-bold shadow-md'
                : 'text-[#8e8ea8] hover:text-white'
            }`}
          >
            VND (Hoạt Động)
          </button>
          <button
            onClick={() => setSelectedCurrency('CNY')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedCurrency === 'CNY'
                ? 'bg-[#ff6b35] text-white font-bold shadow-md'
                : 'text-[#8e8ea8] hover:text-white'
            }`}
          >
            CNY (Công Nợ Xưởng)
          </button>
          <button
            onClick={() => setSelectedCurrency('USD')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
              selectedCurrency === 'USD'
                ? 'bg-[#4d9fff] text-white font-bold shadow-md'
                : 'text-[#8e8ea8] hover:text-white'
            }`}
          >
            USD (Quốc Tế)
          </button>
        </div>
      </div>

      {/* Main Full-Width Forecast Chart Panel (Matching Image D3) */}
      <div className="rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-8 backdrop-blur-xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-[#232336]">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm font-bold text-white">
              Đường Biến Thiên Tiền Mặt ({selectedCurrency})
            </span>
            <span className="text-xs font-mono text-[#8e8ea8]">
              Đệm an toàn: {formatCurrencyAmount(currentSummary.safeBuffer, selectedCurrency)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {selectedCurrency === 'VND' && onNavigateToSimulator && (
              <button
                onClick={onNavigateToSimulator}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-black bg-[#ffaa00] hover:bg-[#ffb726] transition-colors flex items-center gap-1.5"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Giải Cứu Tuần 2</span>
              </button>
            )}

            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-[#a1a1ba] bg-[#161622] hover:text-white hover:bg-[#1f1f2e] border border-[#232336] flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Xuất CSV</span>
            </button>
          </div>
        </div>

        {/* SVG Precision Chart View */}
        <div className="relative py-4">
          <div className="h-72 sm:h-96 w-full relative">
            <svg className="w-full h-full" viewBox="0 0 1000 360" fill="none">
              {/* Horizontal Grid lines */}
              <line x1="60" y1="60" x2="980" y2="60" stroke="#1f1f2e" strokeWidth="1" />
              <line x1="60" y1="120" x2="980" y2="120" stroke="#1f1f2e" strokeWidth="1" />
              <line x1="60" y1="180" x2="980" y2="180" stroke="#1f1f2e" strokeWidth="1" />
              <line x1="60" y1="240" x2="980" y2="240" stroke="#1f1f2e" strokeWidth="1" />
              <line x1="60" y1="300" x2="980" y2="300" stroke="#1f1f2e" strokeWidth="1" />

              {/* Y-axis Text */}
              <text x="10" y="65" fill="#6e6e87" fontSize="12" fontFamily="monospace">
                {selectedCurrency === 'VND' ? '280M' : selectedCurrency === 'CNY' ? '120k' : '$15k'}
              </text>
              <text x="10" y="185" fill="#6e6e87" fontSize="12" fontFamily="monospace">
                {selectedCurrency === 'VND' ? '160M' : selectedCurrency === 'CNY' ? '40k' : '$5k'}
              </text>
              <text x="10" y="305" fill="#6e6e87" fontSize="12" fontFamily="monospace">0</text>

              {/* Dotted Crimson Minimum Buffer Line at y=180 */}
              <line
                x1="60"
                y1="180"
                x2="980"
                y2="180"
                stroke="#ff4757"
                strokeWidth="2"
                strokeDasharray="6 4"
              />
              <text x="700" y="172" fill="#ff4757" fontSize="12" fontFamily="monospace" fontWeight="bold">
                Ngưỡng An Toàn Tối Thiểu: {formatCurrencyAmount(currentSummary.safeBuffer, selectedCurrency)}
              </text>

              {/* Area Gradient */}
              <defs>
                <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor={
                      selectedCurrency === 'VND'
                        ? '#00d4aa'
                        : selectedCurrency === 'CNY'
                        ? '#ff6b35'
                        : '#4d9fff'
                    }
                    stopOpacity="0.25"
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
                    stroke="#00d4aa"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  {/* Breach Marker */}
                  <circle cx="155" cy="220" r="7" fill="#ff4757" className="animate-pulse" />
                </>
              ) : (
                <>
                  <path
                    d="M 80 60 C 180 80, 300 110, 500 100 C 700 90, 850 80, 960 70 L 960 320 L 80 320 Z"
                    fill="url(#chart-area-grad)"
                  />
                  <path
                    d="M 80 60 C 180 80, 300 110, 500 100 C 700 90, 850 80, 960 70"
                    stroke={selectedCurrency === 'CNY' ? '#ff6b35' : '#4d9fff'}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>

            {/* Week 2 Breach Floating Box (Matching Image D3) */}
            {selectedCurrency === 'VND' && (
              <div className="absolute top-[45%] left-[17%] sm:left-[22%] bg-[#1c1c2b] border border-[#ff4757] rounded-xl p-3.5 shadow-2xl z-20 backdrop-blur-xl">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff4757] mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Cảnh Báo Thiếu Hụt Tiền Mặt: Tuần 2</span>
                </div>
                <div className="text-[11px] font-mono text-[#f1f2f6] space-y-0.5">
                  <div className="text-[#a1a1ba]">
                    150M &lt; 160M Buffer • <span className="text-[#ff4757] font-bold">Thiếu hụt 10.000.000 VND</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 13-Week Detailed Breakdown Table (Direct from Image D3) */}
        <div className="pt-6 border-t border-[#232336] overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-[#232336] text-[#8e8ea8] text-[11px]">
                <th className="pb-3 font-medium">Tuần</th>
                <th className="pb-3 font-medium text-right">Đầu Kỳ</th>
                <th className="pb-3 font-medium text-right text-[#00d4aa]">Dòng Thu</th>
                <th className="pb-3 font-medium text-right text-[#ff4757]">Dòng Chi</th>
                <th className="pb-3 font-medium text-right">Cuối Kỳ</th>
                <th className="pb-3 font-medium text-right">Trạng Thái Buffer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#232336]/40">
              {currentWeeks.map((w) => (
                <tr
                  key={w.weekNumber}
                  className={`hover:bg-white/[0.02] transition-colors ${
                    w.isBreached ? 'bg-[#ff4757]/5' : ''
                  }`}
                >
                  <td className="py-3 font-bold text-white">
                    {w.weekLabel}{' '}
                    <span className="text-[10px] text-[#6e6e87] font-normal">
                      ({w.startDate.slice(5)} → {w.endDate.slice(5)})
                    </span>
                  </td>
                  <td className="py-3 text-right text-[#a1a1ba]">
                    {formatCurrencyAmount(w.openingBalance, selectedCurrency)}
                  </td>
                  <td className="py-3 text-right font-medium text-[#00d4aa]">
                    +{formatCurrencyAmount(w.inflow, selectedCurrency)}
                  </td>
                  <td className="py-3 text-right font-medium text-[#ff4757]">
                    -{formatCurrencyAmount(w.outflow, selectedCurrency)}
                  </td>
                  <td className="py-3 text-right font-bold text-white">
                    {formatCurrencyAmount(w.closingBalance, selectedCurrency)}
                  </td>
                  <td className="py-3 text-right">
                    {w.isBreached ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ff4757]/15 text-[#ff4757] border border-[#ff4757]/30">
                        Thiếu Hụt ({formatCurrencyAmount(w.deficitAmount, selectedCurrency)})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#00d4aa]/10 text-[#00d4aa]">
                        An Toàn
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
