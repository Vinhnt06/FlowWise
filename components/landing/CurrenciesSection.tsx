'use client';

import React from 'react';
import { Wallet, Coins, DollarSign, ShieldAlert, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function CurrenciesSection() {
  return (
    <section id="currencies" className="relative py-28 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-mono text-[#00d4aa] mb-4">
            <Coins className="w-3.5 h-3.5" />
            <span>Nguyên Tắc Độc Quyền</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Bảo Vệ Thanh Khoản Theo Từng Đồng Tiền Tách Biệt <br />
            <span className="text-[#00d4aa]">— Không Quy Đổi Ảo</span>
          </h2>
          <p className="text-base text-[#8e8ea8]">
            Việc quy đổi gộp USD và CNY sang VND theo tỷ giá kế toán tạo ra ảo giác thanh khoản nguy hiểm. FlowWise cô lập tuyệt đối 3 dòng vốn.
          </p>
        </div>

        {/* 3-Currency Cards Grid (Matching Design Image 06) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: VND Operating Cash (Teal) */}
          <div className="rounded-2xl bg-[#111118] border-2 border-[#00d4aa]/50 p-7 backdrop-blur-xl relative group hover:border-[#00d4aa] transition-all duration-300 shadow-[0_10px_35px_-10px_rgba(0,212,170,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/15 border border-[#00d4aa]/40 flex items-center justify-center text-[#00d4aa]">
                  <Wallet className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-[#00d4aa] bg-[#00d4aa]/10 border border-[#00d4aa]/30 px-2.5 py-0.5 rounded-full font-bold">
                  Hoạt Động Nội Địa
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">Tiền Mặt Hoạt Động (VND)</h3>
              <span className="text-xs text-[#8e8ea8] block mb-5">Operating Cashflow</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#00d4aa] tracking-tight mb-8">
                280.000.000 ₫
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-[#232336] pt-5">
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Nguồn thu chính:</span>
                  <span className="text-white font-medium">Shopee & TikTok Payout</span>
                </div>
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Ngưỡng đệm an toàn:</span>
                  <span className="text-[#00d4aa] font-semibold">160.000.000 ₫</span>
                </div>
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Trạng thái W2:</span>
                  <span className="text-[#ffaa00] font-semibold">Cần đòn bẩy ứng phó</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs text-[#00d4aa] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Dùng trả lương, thuê kho & đóng gói hàng ngày</span>
            </div>
          </div>

          {/* Card 2: CNY Supplier Payables (Coral Orange) */}
          <div className="rounded-2xl bg-[#111118] border-2 border-[#ff6b35]/50 p-7 backdrop-blur-xl relative group hover:border-[#ff6b35] transition-all duration-300 shadow-[0_10px_35px_-10px_rgba(255,107,53,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#ff6b35]/15 border border-[#ff6b35]/40 flex items-center justify-center text-[#ff6b35]">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-[#ff6b35] bg-[#ff6b35]/10 border border-[#ff6b35]/30 px-2.5 py-0.5 rounded-full font-bold">
                  Nhập Khẩu Xưởng
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">Công Nợ Nhà Cung Cấp (CNY)</h3>
              <span className="text-xs text-[#8e8ea8] block mb-5">Supplier Payables (1688)</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#ff6b35] tracking-tight mb-8">
                ¥120.000
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-[#232336] pt-5">
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Hóa đơn xưởng:</span>
                  <span className="text-white font-medium">Quảng Châu OEM & Bao Bì</span>
                </div>
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Hạn thanh toán:</span>
                  <span className="text-[#ff6b35] font-semibold">10-14 ngày tới</span>
                </div>
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Cơ chế ứng phó:</span>
                  <span className="text-white font-medium">Đàm phán giãn nợ</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-xs text-[#ff6b35] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Chỉ thanh toán bằng Nhân dân tệ trực tiếp cho xưởng</span>
            </div>
          </div>

          {/* Card 3: USD Cross-Border Cash (Electric Blue) */}
          <div className="rounded-2xl bg-[#111118] border-2 border-[#4d9fff]/50 p-7 backdrop-blur-xl relative group hover:border-[#4d9fff] transition-all duration-300 shadow-[0_10px_35px_-10px_rgba(77,159,255,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#4d9fff]/15 border border-[#4d9fff]/40 flex items-center justify-center text-[#4d9fff]">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-[#4d9fff] bg-[#4d9fff]/10 border border-[#4d9fff]/30 px-2.5 py-0.5 rounded-full font-bold">
                  Quốc Tế & Vận Tải
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">Dự Trữ Quốc Tế (USD)</h3>
              <span className="text-xs text-[#8e8ea8] block mb-5">Cross-Border Reserves</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#4d9fff] tracking-tight mb-8">
                $15.000
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-[#232336] pt-5">
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Mục đích chi:</span>
                  <span className="text-white font-medium">Cước tàu & Meta Ads</span>
                </div>
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Hạn mức tối thiểu:</span>
                  <span className="text-[#4d9fff] font-semibold">$5.000</span>
                </div>
                <div className="flex items-center justify-between text-[#8e8ea8]">
                  <span>Biến động tỷ giá:</span>
                  <span className="text-white font-medium">Tự bảo toàn riêng</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-[#4d9fff]/10 border border-[#4d9fff]/30 text-xs text-[#4d9fff] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Duy trì thẻ Visa/Mastercard thanh toán quảng cáo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
