'use client';

import React from 'react';
import {
  LayoutDashboard,
  LineChart,
  SlidersHorizontal,
  UploadCloud,
  FileCheck,
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
    <aside className="w-full md:w-64 bg-bg-surface border-r border-border-main p-4 flex flex-col justify-between shrink-0 transition-colors duration-200">
      <div className="space-y-6">
        {/* Brand Mini Header */}
        <div className="flex items-center gap-2.5 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-mono font-bold text-sm shadow-xs">
            FW
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-text-primary tracking-tight">FlowWise Cockpit</span>
            <span className="text-[10px] font-mono text-text-muted">Deterministic Engine</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-xs'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface-elevated font-medium'
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
                        ? 'bg-white/20 text-white'
                        : item.highlight
                        ? 'bg-crimson/15 text-crimson border border-crimson/25'
                        : 'bg-bg-surface-elevated text-text-muted border border-border-main'
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
        <div className="p-3.5 rounded-xl bg-bg-surface-elevated border border-border-main space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-text-primary">
            <span className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-primary" />
              CFO Sign-Off
            </span>
            <span className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded font-medium">
              Ready
            </span>
          </div>
          <p className="text-[11px] text-text-secondary leading-relaxed">
            Review executive liquidity package and generate verified cryptographic sign-off.
          </p>
          <button
            onClick={onOpenReportModal}
            className="w-full py-1.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Open Audit Dossier</span>
          </button>
        </div>
      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-border-subtle space-y-2 font-mono text-[10px] text-text-muted">
        <div className="flex items-center justify-between">
          <span>Engine Status:</span>
          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Deterministic Active
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Isolation:</span>
          <span className="text-text-primary font-medium">VND / CNY / USD</span>
        </div>
      </div>
    </aside>
  );
}
