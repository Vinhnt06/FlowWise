'use client';

import React from 'react';
import { UploadCloud, Cpu, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 bg-[#0a0a0f] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4aa]/10 border border-[#00d4aa]/30 text-xs font-mono text-[#00d4aa] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Quy Trình Chuẩn Hóa</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Quy Trình 3 Bước <br />
            <span className="text-[#00d4aa]">Tự Động Hóa Dòng Tiền</span>
          </h2>
          <p className="text-base text-[#8e8ea8]">
            Đơn giản, minh bạch và có thể chuyển giao cho bất kỳ kế toán viên hoặc CFO doanh nghiệp nào.
          </p>
        </div>

        {/* 3 Step Cards Grid (Matching Design Image 07) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line behind cards on desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d4aa]/20 via-[#00d4aa]/40 to-[#00d4aa]/20 -translate-y-12 z-0" />

          {/* Step 1 Card */}
          <div className="rounded-2xl bg-[#111118] border border-[#232336] p-7 backdrop-blur-xl relative z-10 group hover:border-[#00d4aa]/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa] mb-6 font-mono font-bold text-lg">
              01
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Tải Dữ Liệu Bán Hàng</h3>
            <p className="text-xs text-[#8e8ea8] leading-relaxed mb-6">
              Kéo thả trực tiếp file CSV xuất từ Shopee Seller Centre, TikTok Shop Income hoặc sao kê tài khoản ngân hàng.
            </p>

            <div className="p-3.5 rounded-xl bg-[#161622] border border-[#232336] text-[11px] font-mono text-[#a1a1ba] space-y-1.5">
              <div className="text-[#00d4aa] font-semibold">Tự động nhận diện:</div>
              <div>• Bóc tách phí sàn 12%</div>
              <div>• Tạm giữ đơn hoàn COD 5%</div>
              <div>• Dự báo ngày sàn trả tiền ví</div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#232336]">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/30">
                STEP 01: NẠP DỮ LIỆU
              </span>
            </div>
          </div>

          {/* Step 2 Card */}
          <div className="rounded-2xl bg-[#111118] border border-[#232336] p-7 backdrop-blur-xl relative z-10 group hover:border-[#00d4aa]/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa] mb-6 font-mono font-bold text-lg">
              02
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Động Cơ Dự Báo 13 Tuần</h3>
            <p className="text-xs text-[#8e8ea8] leading-relaxed mb-6">
              Động cơ tính toán độc lập bảo toàn chuỗi thanh khoản và tự động so sánh số dư cuối tuần với ngưỡng đệm an toàn.
            </p>

            <div className="p-3.5 rounded-xl bg-[#161622] border border-[#232336] text-[11px] font-mono text-[#a1a1ba] space-y-1.5">
              <div className="text-[#ffaa00] font-semibold">Cảnh báo tức thì:</div>
              <div>• Quét lỗ hổng thanh khoản</div>
              <div>• Phát hiện thâm hụt trước 14 ngày</div>
              <div>• Độc lập tuyệt đối VND, CNY, USD</div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#232336]">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#ffaa00]/10 text-[#ffaa00] border border-[#ffaa00]/30">
                STEP 02: QUÉT THÂM HỤT
              </span>
            </div>
          </div>

          {/* Step 3 Card */}
          <div className="rounded-2xl bg-[#111118] border border-[#232336] p-7 backdrop-blur-xl relative z-10 group hover:border-[#00d4aa]/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-[#00d4aa]/10 border border-[#00d4aa]/30 flex items-center justify-center text-[#00d4aa] mb-6 font-mono font-bold text-lg">
              03
            </div>

            <h3 className="text-lg font-bold text-white mb-2">Điều Chỉnh & Ký Duyệt CFO</h3>
            <p className="text-xs text-[#8e8ea8] leading-relaxed mb-6">
              Kéo thanh trượt để thử nghiệm kịch bản giải cứu dòng tiền: Thu sớm công nợ, giãn nợ xưởng 1688, kích hoạt thấu chi.
            </p>

            <div className="p-3.5 rounded-xl bg-[#161622] border border-[#232336] text-[11px] font-mono text-[#a1a1ba] space-y-1.5">
              <div className="text-[#00d4aa] font-semibold">Hành động quyết sách:</div>
              <div>• Xem biểu đồ trước & sau điều phối</div>
              <div>• Tính chi phí vốn chiết khấu</div>
              <div>• Xuất gói báo cáo ký duyệt 1 trang</div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#232336]">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#00d4aa]/10 text-[#00d4aa] border border-[#00d4aa]/30">
                STEP 03: PHÊ DUYỆT CFO
              </span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to Action */}
        <div className="mt-14 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-black bg-[#00d4aa] hover:bg-[#05f3c4] transition-all shadow-xl shadow-[#00d4aa]/25 hover:scale-105"
          >
            <span>Thực Hành Quy Trình Trên Bản Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
