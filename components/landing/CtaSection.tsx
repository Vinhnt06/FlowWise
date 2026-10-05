'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Volumetric ambient glow rising from bottom center (Matching Image 08) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#00d4aa]/12 blur-[160px] pointer-events-none rounded-t-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Kiểm Soát Dòng Tiền Đa Tệ <br />
          <span className="bg-gradient-to-r from-white via-[#f1f2f6] to-[#00d4aa] bg-clip-text text-transparent">
            Ngay Hôm Nay
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8e8ea8] leading-relaxed mb-10">
          Sẵn sàng bảo vệ thanh khoản cho các nhà bán hàng Shopee, TikTok Shop và Nhà nhập khẩu tiểu ngạch. Thử nghiệm trực quan với kịch bản thực tế của ShopX.
        </p>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-black bg-[#00d4aa] hover:bg-[#05f3c4] transition-all duration-200 shadow-xl shadow-[#00d4aa]/30 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
          >
            <span>Trải Nghiệm Bản Demo Tức Thì</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#forecast-preview"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-semibold text-white bg-[#161622] hover:bg-[#1f1f2e] border border-[#232336] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Khám Phá Kịch Bản 13 Tuần</span>
          </a>
        </div>

        {/* 3 Trust Badges (Matching Image 08) */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-[#a1a1ba] pt-6 border-t border-[#232336]/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00d4aa]" />
            <span>Chuẩn Tính Toán Deterministic</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00d4aa]" />
            <span>Không Trộn Lẫn Tỷ Giá Hối Đoái</span>
          </div>

          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#00d4aa]" />
            <span>Dữ Liệu Nội Địa Hóa TMĐT VN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
