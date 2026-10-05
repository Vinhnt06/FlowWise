'use client';

import React from 'react';
import {
  LayoutDashboard,
  LineChart,
  SlidersHorizontal,
  UploadCloud,
  FileCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface DashboardSidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenReportModal: () => void;
}

export default function DashboardSidebar({
  currentTab,
  onSelectTab,
  onOpenReportModal,
}: DashboardSidebarProps) {
  const navItems = [
    {
      id: 'overview',
      label: 'Tổng Quan Cockpit',
      badge: '3 Ngoại Tệ',
      icon: LayoutDashboard,
    },
    {
      id: 'forecast',
      label: 'Dự Báo 13 Tuần',
      badge: 'Cảnh báo W2',
      icon: LineChart,
      highlight: true,
    },
    {
      id: 'simulator',
      label: 'Mô Phỏng Giải Cứu',
      badge: '3 Đòn Bẩy',
      icon: SlidersHorizontal,
    },
    {
      id: 'upload',
      label: 'Nạp File & Đối Soát',
      badge: 'CSV Parser',
      icon: UploadCloud,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#0c0c12] border-r border-[#232336] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Brand Mini Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#009b7c] flex items-center justify-center text-black font-mono font-extrabold text-sm shadow-md shadow-[#00d4aa]/20">
            FW
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-tight">FlowWise Cockpit</span>
            <span className="text-[10px] font-mono text-[#8e8ea8]">Pure Finance Engine</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#00d4aa] text-black font-bold shadow-lg shadow-[#00d4aa]/20'
                    : 'text-[#8e8ea8] hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-black/20 text-black'
                        : item.highlight
                        ? 'bg-[#ffaa00]/15 text-[#ffaa00] border border-[#ffaa00]/30'
                        : 'bg-[#232336] text-[#a1a1ba]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Launch CFO Approval Card */}
        <div className="p-3.5 rounded-xl bg-[#161622] border border-[#232336] space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-[#00d4aa]" />
              Quyết Sách CFO
            </span>
            <span className="text-[10px] font-mono text-[#00d4aa] bg-[#00d4aa]/10 px-1.5 py-0.5 rounded">
              Sẵn sàng
            </span>
          </div>
          <p className="text-[11px] text-[#8e8ea8] leading-relaxed">
            Xem gói tóm lược phương án điều phối thanh khoản và xác nhận ký duyệt số xuất PDF.
          </p>
          <button
            onClick={onOpenReportModal}
            className="w-full py-2 rounded-lg text-xs font-bold text-black bg-[#00d4aa] hover:bg-[#05f3c4] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#00d4aa]/20"
          >
            <span>Mở Báo Cáo Ký Duyệt</span>
          </button>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-[#232336] space-y-2 font-mono text-[10px] text-[#6e6e87]">
        <div className="flex items-center justify-between">
          <span>Engine:</span>
          <span className="text-[#00d4aa] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
            Deterministic OK
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Tách Ngoại Tệ:</span>
          <span className="text-white">VND / CNY / USD</span>
        </div>
      </div>
    </aside>
  );
}
