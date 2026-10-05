'use client';

import React from 'react';
import { AlertCircle, Clock, Percent, ArrowDownRight, TrendingDown } from 'lucide-react';

export default function ProblemSection() {
  return (
    <section id="problem" className="relative py-28 bg-[#0a0a0f] overflow-hidden">
      {/* Subtle crimson ambient glow on left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[450px] bg-[#ff4757]/8 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Statement & Crimson Warning Card */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4757]/10 border border-[#ff4757]/30 text-xs font-mono text-[#ff4757]">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Nghịch Lý Dòng Tiền E-Commerce</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Doanh số trên sàn <br />
              <span className="text-[#ff4757] font-mono">≠ Tiền trong tài khoản</span>
            </h2>

            <p className="text-base sm:text-lg text-[#8e8ea8] leading-relaxed">
              Tại sao hàng nghìn shop bán chạy vẫn đứng trước nguy cơ vỡ nợ? Dòng tiền thực nhận bị sàn giam giữ tới 14 ngày, bị bào mòn bởi hàng loạt chi phí ngầm, trong khi các khoản nợ tiền hàng xưởng 1688 và chi phí vận hành vẫn đến hạn từng ngày.
            </p>

            {/* Crimson Warning Card (Direct from Image 03) */}
            <div className="rounded-2xl bg-[#161622]/90 border border-[#ff4757]/40 p-6 backdrop-blur-xl shadow-xl shadow-[#ff4757]/5">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#232336]">
                <div className="flex items-center gap-2 text-white font-semibold text-sm">
                  <TrendingDown className="w-4 h-4 text-[#ff4757]" />
                  <span>Các Khoản Thất Thoát & Giam Vốn</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#ff4757] animate-ping" />
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#ff4757]/20">
                  <span className="text-[#a1a1ba] flex items-center gap-2">
                    <Percent className="w-4 h-4 text-[#ff4757]" />
                    Phí sàn & phí thanh toán
                  </span>
                  <span className="text-[#ff4757] font-bold">-12% Gross</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#ff4757]/20">
                  <span className="text-[#a1a1ba] flex items-center gap-2">
                    <ArrowDownRight className="w-4 h-4 text-[#ff4757]" />
                    Tỷ lệ hoàn trả & COD đọng vốn
                  </span>
                  <span className="text-[#ff4757] font-bold">-5% Giá trị đơn</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#ff4757]/20">
                  <span className="text-[#a1a1ba] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#ffaa00]" />
                    Chu kỳ sàn giam tiền đối soát
                  </span>
                  <span className="text-[#ffaa00] font-bold">14 Ngày Trễ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cash Gap Timeline Comparison Card */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Hố Sâu Thanh Khoản (The Cash Gap)</h3>
                  <span className="text-xs text-[#8e8ea8]">Mô phỏng chu kỳ thanh toán thực tế của ShopX</span>
                </div>
                <span className="text-[11px] font-mono text-[#ffaa00] bg-[#ffaa00]/10 border border-[#ffaa00]/30 px-2 py-0.5 rounded">
                  Lệch pha chu kỳ
                </span>
              </div>

              {/* Graphic Timeline Visualization */}
              <div className="relative py-8 my-4 border-y border-[#232336]/60">
                <div className="relative h-44 flex items-center justify-center">
                  {/* Revenue Line (Trapped) */}
                  <svg className="w-full h-full" viewBox="0 0 400 160" fill="none">
                    {/* Background Grid Lines */}
                    <line x1="0" y1="40" x2="400" y2="40" stroke="#232336" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="#232336" strokeDasharray="3 3" />
                    <line x1="0" y1="120" x2="400" y2="120" stroke="#232336" strokeDasharray="3 3" />

                    {/* Revenue Curve */}
                    <path
                      d="M20 120 Q 100 20, 200 40 T 380 30"
                      stroke="#ffaa00"
                      strokeWidth="2.5"
                      strokeDasharray="4 4"
                    />

                    {/* Payable Outflow Curve (Spikes in Week 2) */}
                    <path
                      d="M20 110 Q 120 150, 180 145 T 380 80"
                      stroke="#ff4757"
                      strokeWidth="3"
                    />

                    {/* Warning Nodes on The Gap */}
                    <circle cx="180" cy="145" r="6" fill="#ff4757" className="animate-pulse" />
                    <circle cx="200" cy="40" r="5" fill="#ffaa00" />
                  </svg>

                  {/* Callout Tag: Cash Gap Trap */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff4757]/15 border border-[#ff4757]/40 px-3.5 py-1.5 rounded-lg text-center backdrop-blur-md">
                    <span className="text-xs font-mono font-bold text-[#ff4757] block">VỰC THẲM TIỀN MẶT</span>
                    <span className="text-[10px] text-[#f1f2f6]">Doanh thu bị kẹt • Nợ xưởng đến hạn</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#8e8ea8] mt-2">
                  <span>Ngày 01 (Bán hàng)</span>
                  <span className="text-[#ff4757] font-semibold">Ngày 14 (Hạn nợ xưởng 1688)</span>
                  <span>Ngày 21 (Sàn trả ví)</span>
                </div>
              </div>

              {/* Explanatory summary notes */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-3 rounded-xl bg-[#161622] border border-[#232336]">
                  <span className="text-xs font-semibold text-white block mb-1">Doanh thu sàn</span>
                  <span className="text-xs text-[#8e8ea8]">Ghi nhận ngay trên app nhưng 14-21 ngày sau mới được rút về tài khoản ngân hàng.</span>
                </div>
                <div className="p-3 rounded-xl bg-[#161622] border border-[#232336]">
                  <span className="text-xs font-semibold text-[#ff4757] block mb-1">Nợ nhà cung cấp</span>
                  <span className="text-xs text-[#8e8ea8]">Xưởng sản xuất yêu cầu chuyển khoản CNY đúng hẹn để giao container đợt mới.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
