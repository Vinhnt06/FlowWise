'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ShieldCheck, Code2 } from 'lucide-react';
import { SHOP_METADATA } from '@/data/shopx-dataset';

export default function Footer() {
  return (
    <footer className="bg-[#0c0c12] border-t border-[#1f1f2e] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#232336]/60">
          {/* Col 1: Brand & Disclaimer */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00d4aa] flex items-center justify-center text-black font-mono font-extrabold text-sm">
                FW
              </div>
              <span className="text-xl font-bold tracking-tight text-white">FlowWise</span>
            </div>

            <p className="text-xs text-[#8e8ea8] max-w-md leading-relaxed">
              Trợ lý tài chính & dự báo dòng tiền đa tệ 13 tuần dành riêng cho các doanh nghiệp thương mại điện tử và nhà nhập khẩu tiểu ngạch tại Việt Nam.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#ffaa00]/10 border border-[#ffaa00]/30 text-[11px] font-mono text-[#ffaa00]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{SHOP_METADATA.simulatedDisclaimer}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-semibold block uppercase tracking-wider">Hệ Thống</span>
            <ul className="space-y-2 text-[#8e8ea8]">
              <li>
                <Link href="/dashboard" className="hover:text-[#00d4aa] transition-colors">
                  Dashboard Ứng Dụng
                </Link>
              </li>
              <li>
                <a href="#forecast-preview" className="hover:text-[#00d4aa] transition-colors">
                  Dự Báo 13 Tuần
                </a>
              </li>
              <li>
                <a href="#currencies" className="hover:text-[#00d4aa] transition-colors">
                  Phân Tách 3 Ngoại Tệ
                </a>
              </li>
              <li>
                <a href="#problem" className="hover:text-[#00d4aa] transition-colors">
                  Nghịch Lý Doanh Số ≠ Tiền
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Project Links & GitHub */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-semibold block uppercase tracking-wider">Tài Nguyên</span>
            <ul className="space-y-2 text-[#8e8ea8]">
              <li>
                <a
                  href="https://github.com/Vinhnt06/FlowWise"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3 text-[#6e6e87]" />
                </a>
              </li>
              <li>
                <span className="text-[#6e6e87]">Fintechathon 2026 Prototype</span>
              </li>
              <li>
                <span className="text-[#6e6e87]">Công nghệ: Next.js 16 + Tailwind v4</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#6e6e87]">
          <div>
            © 2026 FlowWise. Dự án mẫu phục vụ cuộc thi Fintechathon. Bản quyền thuật toán độc lập.
          </div>
          <div className="flex items-center gap-4">
            <span>Entity: {SHOP_METADATA.legalEntity}</span>
            <span>Tax ID: {SHOP_METADATA.taxId}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
