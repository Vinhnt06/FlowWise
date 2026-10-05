import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { SHOP_METADATA } from '@/data/shopx-dataset';

export default function DashboardPlaceholder() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f2f6] flex flex-col items-center justify-center p-6 text-center">
      {/* Top Banner */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffaa00]/10 border border-[#ffaa00]/30 text-xs font-mono text-[#ffaa00] mb-8">
        <ShieldCheck className="w-4 h-4" />
        <span>{SHOP_METADATA.simulatedDisclaimer}</span>
      </div>

      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00d4aa] to-[#009b7c] flex items-center justify-center text-black font-mono font-extrabold text-2xl shadow-xl shadow-[#00d4aa]/25 mb-6">
        FW
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
        FlowWise Cockpit Dashboard
      </h1>

      <p className="max-w-lg text-[#8e8ea8] text-sm sm:text-base leading-relaxed mb-8">
        Sẵn sàng triển khai 5 màn hình tương tác: Nạp dữ liệu đối soát sàn, Dự báo 13 tuần, Mô phỏng kịch bản cứu vãn thanh khoản và Ký duyệt CFO (Phase 4).
      </p>

      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-[#161622] hover:bg-[#1f1f2e] border border-[#232336] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại Landing Page</span>
        </Link>
      </div>
    </div>
  );
}
