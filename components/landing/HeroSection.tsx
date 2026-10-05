'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function HeroSection() {
  const [selectedCurrency, setSelectedCurrency] = useState<'ALL' | 'VND' | 'CNY' | 'USD'>('ALL');

  return (
    <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden bg-[#0a0a0f]">
      {/* Ambient background glow — Emerald/Teal strictly, ZERO purple */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#00d4aa]/12 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-1/3 -translate-x-1/2 w-[450px] h-[300px] bg-[#00d4aa]/6 blur-[120px] pointer-events-none rounded-full" />

      {/* Subtle background tech grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Tag Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111118] border border-[#232336] text-[11px] font-mono uppercase tracking-wider text-[#a1a1ba] mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#00d4aa] animate-ping" />
          <span>Fintechathon 2026 • MVP Độc Quyền Cho SMEs TMĐT</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.035em] text-white leading-[1.08] mb-6">
          Know Your Cash. <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-[#f1f2f6] to-[#00d4aa] bg-clip-text text-transparent">
            Every Week. Every Currency.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#8e8ea8] leading-relaxed mb-10 font-normal">
          Dự báo dòng tiền 13 tuần tách biệt hoàn toàn <span className="text-[#00d4aa] font-medium">VND</span>,{' '}
          <span className="text-[#ff6b35] font-medium">CNY</span> và{' '}
          <span className="text-[#4d9fff] font-medium">USD</span>. Phát hiện thâm hụt thanh khoản trước 14 ngày cho nhà bán hàng Shopee, TikTok Shop & Nhà nhập khẩu.
        </p>

        {/* Interactive Search & Currency Pill Bar */}
        <div className="max-w-xl mx-auto mb-14 bg-[#111118]/90 border border-[#232336] rounded-full p-1.5 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 w-full sm:w-auto flex-1">
            <Search className="w-4 h-4 text-[#8e8ea8]" />
            <span className="text-xs text-[#8e8ea8] font-mono">Dòng tiền ShopX:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSelectedCurrency('ALL')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all ${
                  selectedCurrency === 'ALL'
                    ? 'bg-[#232336] text-white shadow-sm'
                    : 'text-[#8e8ea8] hover:text-white'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setSelectedCurrency('VND')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all ${
                  selectedCurrency === 'VND'
                    ? 'bg-[#00d4aa]/20 text-[#00d4aa] border border-[#00d4aa]/40'
                    : 'text-[#8e8ea8] hover:text-[#00d4aa]'
                }`}
              >
                VND
              </button>
              <button
                onClick={() => setSelectedCurrency('CNY')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all ${
                  selectedCurrency === 'CNY'
                    ? 'bg-[#ff6b35]/20 text-[#ff6b35] border border-[#ff6b35]/40'
                    : 'text-[#8e8ea8] hover:text-[#ff6b35]'
                }`}
              >
                CNY
              </button>
              <button
                onClick={() => setSelectedCurrency('USD')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-medium transition-all ${
                  selectedCurrency === 'USD'
                    ? 'bg-[#4d9fff]/20 text-[#4d9fff] border border-[#4d9fff]/40'
                    : 'text-[#8e8ea8] hover:text-[#4d9fff]'
                }`}
              >
                USD
              </button>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold text-black bg-[#00d4aa] hover:bg-[#05f3c4] transition-all duration-200 shadow-md shadow-[#00d4aa]/30 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <span>Launch Interactive Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3D Floating Perspective Balance Card (From Design Spec 01) */}
        <div className="relative max-w-2xl mx-auto perspective-1000">
          <div className="relative rounded-2xl bg-[#111118]/80 border border-[#232336] p-6 backdrop-blur-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] text-left hover:border-[#00d4aa]/40 transition-all duration-300">
            {/* Card Header Status */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#232336]/60">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00d4aa]" />
                <span className="text-xs font-mono text-[#a1a1ba] uppercase tracking-wider">
                  Trạng Thái Thanh Khoản Tức Thì (ShopX)
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#ffaa00] bg-[#ffaa00]/10 border border-[#ffaa00]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Cảnh báo Tuần 2: Thâm hụt 10M
              </span>
            </div>

            {/* Currency Stream 1: VND */}
            {(selectedCurrency === 'ALL' || selectedCurrency === 'VND') && (
              <div className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors border-b border-[#232336]/40">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold font-mono text-[#00d4aa] tracking-tight">
                      280.000.000 ₫
                    </span>
                    <span className="text-[10px] font-mono bg-[#00d4aa]/15 text-[#00d4aa] px-1.5 py-0.5 rounded border border-[#00d4aa]/30">
                      VND
                    </span>
                  </div>
                  <span className="text-xs text-[#8e8ea8]">Tiền mặt hoạt động • Vừa nhận từ Shopee & TikTok</span>
                </div>
                {/* Visual SVG Sparkline */}
                <svg className="w-28 h-8 text-[#00d4aa]" viewBox="0 0 100 30" fill="none">
                  <path
                    d="M0 20 Q 25 5, 50 18 T 100 8"
                    stroke="#00d4aa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 20 Q 25 5, 50 18 T 100 8 L 100 30 L 0 30 Z"
                    fill="url(#teal-grad)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="teal-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00d4aa" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}

            {/* Currency Stream 2: CNY */}
            {(selectedCurrency === 'ALL' || selectedCurrency === 'CNY') && (
              <div className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors border-b border-[#232336]/40">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold font-mono text-[#ff6b35] tracking-tight">
                      ¥120.000
                    </span>
                    <span className="text-[10px] font-mono bg-[#ff6b35]/15 text-[#ff6b35] px-1.5 py-0.5 rounded border border-[#ff6b35]/30">
                      CNY
                    </span>
                  </div>
                  <span className="text-xs text-[#8e8ea8]">Công nợ xưởng 1688 • Đáo hạn trong 10 ngày</span>
                </div>
                <svg className="w-28 h-8 text-[#ff6b35]" viewBox="0 0 100 30" fill="none">
                  <path
                    d="M0 12 Q 30 25, 60 10 T 100 22"
                    stroke="#ff6b35"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 12 Q 30 25, 60 10 T 100 22 L 100 30 L 0 30 Z"
                    fill="url(#cny-grad)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="cny-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ff6b35" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}

            {/* Currency Stream 3: USD */}
            {(selectedCurrency === 'ALL' || selectedCurrency === 'USD') && (
              <div className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-white/[0.02] transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold font-mono text-[#4d9fff] tracking-tight">
                      $15.000
                    </span>
                    <span className="text-[10px] font-mono bg-[#4d9fff]/15 text-[#4d9fff] px-1.5 py-0.5 rounded border border-[#4d9fff]/30">
                      USD
                    </span>
                  </div>
                  <span className="text-xs text-[#8e8ea8]">Dự trữ quốc tế • Chi trả cước tàu biển & Meta Ads</span>
                </div>
                <svg className="w-28 h-8 text-[#4d9fff]" viewBox="0 0 100 30" fill="none">
                  <path
                    d="M0 18 Q 30 8, 65 20 T 100 12"
                    stroke="#4d9fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 18 Q 30 8, 65 20 T 100 12 L 100 30 L 0 30 Z"
                    fill="url(#usd-grad)"
                    opacity="0.2"
                  />
                  <defs>
                    <linearGradient id="usd-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4d9fff" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}

            {/* Bottom note */}
            <div className="pt-3 mt-2 border-t border-[#232336]/40 flex items-center justify-between text-[11px] font-mono text-[#6e6e87]">
              <span>Tách biệt 100% • Không quy đổi gộp</span>
              <span className="text-[#00d4aa] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Chuẩn toán học Pure Functions
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
