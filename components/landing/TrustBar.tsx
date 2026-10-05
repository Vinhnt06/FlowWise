'use client';

import React from 'react';
import { ShoppingBag, Video, Store, Boxes, CheckCircle2 } from 'lucide-react';

export default function TrustBar() {
  return (
    <section className="relative py-12 bg-[#0c0c12] border-y border-[#1f1f2e] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* E-commerce Channel Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#161622] border border-[#232336]">
              <div className="w-5 h-5 rounded-md bg-[#ee4d2d] flex items-center justify-center text-white text-[11px] font-bold">
                S
              </div>
              <span className="text-xs font-semibold text-white tracking-tight">Shopee Vietnam</span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#161622] border border-[#232336]">
              <div className="w-5 h-5 rounded-md bg-black flex items-center justify-center text-white text-[11px] font-bold border border-white/20">
                TT
              </div>
              <span className="text-xs font-semibold text-white tracking-tight">TikTok Shop</span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#161622] border border-[#232336]">
              <div className="w-5 h-5 rounded-md bg-[#0f146d] flex items-center justify-center text-[#ff1e56] text-[11px] font-bold">
                L
              </div>
              <span className="text-xs font-semibold text-white tracking-tight">Lazada Vietnam</span>
            </div>

            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#161622] border border-[#232336]">
              <div className="w-5 h-5 rounded-md bg-[#ff6b35] flex items-center justify-center text-white text-[10px] font-mono font-bold">
                1688
              </div>
              <span className="text-xs font-semibold text-white tracking-tight">1688 / Taobao</span>
            </div>
          </div>

          {/* 3 Live Metric Pills with Glowing Dots (Matching Design 02) */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#161622] border border-[#232336] shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] shadow-[0_0_8px_#00d4aa]" />
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold text-white tracking-tight">350M+ VND</span>
                <span className="text-[10px] text-[#8e8ea8]">Theo Dõi Định Kỳ</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#161622] border border-[#232336] shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] shadow-[0_0_8px_#00d4aa]" />
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold text-white tracking-tight">99.4%</span>
                <span className="text-[10px] text-[#8e8ea8]">Độ Chuẩn Xác Đối Soát</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#161622] border border-[#232336] shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#00d4aa] shadow-[0_0_8px_#00d4aa]" />
              <div className="flex flex-col">
                <span className="font-mono text-sm font-bold text-white tracking-tight">Zero FX</span>
                <span className="text-[10px] text-[#8e8ea8]">Tách Biệt Ngoại Tệ</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
