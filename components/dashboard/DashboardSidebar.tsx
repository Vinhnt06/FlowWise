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
      label: 'Cockpit Overview',
      badge: '3 Currencies',
      icon: LayoutDashboard,
    },
    {
      id: 'forecast',
      label: '13-Week Trajectory',
      badge: 'W2 Breach',
      icon: LineChart,
      highlight: true,
    },
    {
      id: 'simulator',
      label: 'Scenario Simulator',
      badge: '3 Levers',
      icon: SlidersHorizontal,
    },
    {
      id: 'upload',
      label: 'Ledger Ingestion',
      badge: 'CSV Parser',
      icon: UploadCloud,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#0C0C12] border-r border-[#232336] p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Brand Mini Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D4AA] to-[#009B7C] flex items-center justify-center text-black font-mono font-extrabold text-sm shadow-md shadow-[#00D4AA]/20">
            FW
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white tracking-tight">FlowWise Cockpit</span>
            <span className="text-[10px] font-mono text-[#8E8EA8]">Deterministic Engine</span>
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
                    ? 'bg-[#00D4AA] text-black font-bold shadow-lg shadow-[#00D4AA]/20'
                    : 'text-[#8E8EA8] hover:text-white hover:bg-white/5'
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
                        ? 'bg-[#FF4757]/15 text-[#FF4757] border border-[#FF4757]/30'
                        : 'bg-[#232336] text-[#A1A1BA]'
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
              <FileCheck className="w-3.5 h-3.5 text-[#00D4AA]" />
              CFO Sign-Off
            </span>
            <span className="text-[10px] font-mono text-[#00D4AA] bg-[#00D4AA]/10 px-1.5 py-0.5 rounded">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-[#8E8EA8] leading-relaxed">
            Review executive liquidity package and generate verified cryptographic sign-off.
          </p>
          <button
            onClick={onOpenReportModal}
            className="w-full py-2 rounded-lg text-xs font-bold text-black bg-[#00D4AA] hover:bg-[#05F3C4] transition-all flex items-center justify-center gap-1.5 shadow-md shadow-[#00D4AA]/20"
          >
            <span>Open Audit Dossier</span>
          </button>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-[#232336] space-y-2 font-mono text-[10px] text-[#6E6E87]">
        <div className="flex items-center justify-between">
          <span>Engine Status:</span>
          <span className="text-[#00D4AA] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
            Deterministic Active
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Isolation:</span>
          <span className="text-white">VND / CNY / USD</span>
        </div>
      </div>
    </aside>
  );
}
