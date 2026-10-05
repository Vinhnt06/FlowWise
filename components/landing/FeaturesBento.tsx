'use client';

import React from 'react';
import { UploadCloud, LineChart, AlertOctagon, SlidersHorizontal, FileCheck, CheckCircle2 } from 'lucide-react';

export default function FeaturesBento() {
  return (
    <section id="features" className="relative py-28 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-mono text-[#00d4aa] mb-4">
            <LineChart className="w-3.5 h-3.5" />
            <span>Năng Lực Độc Quyền</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            5 Khả Năng Cốt Lõi <br />
            <span className="text-[#00d4aa]">Cho Dòng Tiền Thương Mại</span>
          </h2>
          <p className="text-base text-[#8e8ea8]">
            Hệ sinh thái công cụ số hóa toàn diện giúp doanh nghiệp kiểm soát và điều phối dòng tiền một cách chủ động.
          </p>
        </div>

        {/* Bento Grid Layout (Matching Design 04) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 (Wide): 1-Click Multi-Channel Upload */}
          <div className="md:col-span-7 rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden group hover:border-[#00d4aa]/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa]">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">1-Click Multi-Channel Upload</h3>
                <span className="text-xs text-[#8e8ea8]">Nạp file đối soát Shopee, TikTok Shop, Bank CSV</span>
              </div>
            </div>

            {/* Inner Mockup (Matching image 04) */}
            <div className="p-4 rounded-xl bg-[#161622] border border-[#232336] flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-[#00d4aa]/40 bg-[#0a0a0f] text-center w-full sm:w-44">
                <span className="text-[10px] font-mono text-[#00d4aa] bg-[#00d4aa]/15 px-2 py-0.5 rounded font-bold mb-1">
                  CSV
                </span>
                <span className="text-[11px] text-[#8e8ea8]">Drag-and-drop files</span>
              </div>

              <div className="space-y-1.5 w-full text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-[#232336]">
                  <span className="text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ee4d2d]" /> Shopee Settlement
                  </span>
                  <span className="text-[#00d4aa]">Đã bóc tách 100%</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-[#232336]">
                  <span className="text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white" /> TikTok Shop Income
                  </span>
                  <span className="text-[#00d4aa]">Đã bóc tách 100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: 13-Week Cashflow Forecast */}
          <div className="md:col-span-5 rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden group hover:border-[#00d4aa]/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa]">
                <LineChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">13-Week Cashflow Forecast</h3>
                <span className="text-xs text-[#8e8ea8]">Quỹ đạo dự báo chu kỳ 13 tuần</span>
              </div>
            </div>

            {/* Sparkline curve visual */}
            <div className="p-4 rounded-xl bg-[#161622] border border-[#232336] h-32 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 250 80" fill="none">
                <path
                  d="M0 60 Q 40 10, 80 40 T 160 20 T 250 10"
                  stroke="#00d4aa"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M0 70 Q 50 30, 90 65 T 180 35 T 250 25"
                  stroke="#ffaa00"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                />
              </svg>
            </div>
          </div>

          {/* Card 3: Smart Buffer Deficit Alerts */}
          <div className="md:col-span-4 rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl group hover:border-[#ffaa00]/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#ffaa00]/10 border border-[#ffaa00]/30 flex items-center justify-center text-[#ffaa00]">
                <AlertOctagon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Smart Buffer Alerts</h3>
            </div>
            <p className="text-xs text-[#8e8ea8] mb-4">
              Tự động quét ngưỡng an toàn và cảnh báo ngay khi số dư cuối tuần dưới hạn mức.
            </p>
            <div className="p-3 rounded-xl bg-[#ffaa00]/10 border border-[#ffaa00]/30 flex items-center gap-2 text-xs font-mono text-[#ffaa00]">
              <AlertOctagon className="w-4 h-4 shrink-0" />
              <span>Buffer Breach: W2 (-10M VND)</span>
            </div>
          </div>

          {/* Card 4: Interactive Scenario Simulator */}
          <div className="md:col-span-4 rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl group hover:border-[#00d4aa]/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa]">
                <SlidersHorizontal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Scenario Simulator</h3>
            </div>
            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[#8e8ea8] mb-1">
                  <span>Thu sớm công nợ sỉ</span>
                  <span className="text-[#00d4aa]">50M VND</span>
                </div>
                <div className="w-full bg-[#232336] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#00d4aa] h-full w-[65%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[#8e8ea8] mb-1">
                  <span>Giãn trả NCC 1688</span>
                  <span className="text-[#00d4aa]">14 Ngày</span>
                </div>
                <div className="w-full bg-[#232336] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#00d4aa] h-full w-[80%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 5: CFO Approval Pack */}
          <div className="md:col-span-4 rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl group hover:border-[#00d4aa]/50 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa]">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">CFO Approval Pack</h3>
            </div>
            <p className="text-xs text-[#8e8ea8] mb-4">
              Tóm lược quyết sách 1 trang, tính toán chi phí vốn và xuất báo cáo phê duyệt tức thì.
            </p>
            <div className="p-3 rounded-xl bg-[#161622] border border-[#232336] flex items-center justify-between text-xs font-mono">
              <span className="text-white">1-Click Sign-Off</span>
              <CheckCircle2 className="w-4 h-4 text-[#00d4aa]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
