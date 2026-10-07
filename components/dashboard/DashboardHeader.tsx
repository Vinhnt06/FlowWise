'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, ArrowLeft } from 'lucide-react';
import { SHOP_METADATA } from '@/data/shopx-dataset';
import ThemeToggle from '@/components/common/ThemeToggle';

interface DashboardHeaderProps {
  currentTab: string;
  onOpenReportModal: () => void;
}

export default function DashboardHeader({ currentTab, onOpenReportModal }: DashboardHeaderProps) {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'overview':
        return 'Cashflow Intelligence Overview';
      case 'forecast':
        return '13-Week Liquidity Trajectory';
      case 'simulator':
        return 'Week 2 Deficit Mitigation Simulator';
      case 'upload':
        return 'Enterprise Data Input & Ledger Ingestion';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="border-b border-border-main bg-bg-surface/95 backdrop-blur-md sticky top-0 z-40 transition-colors duration-200">
      {/* Mandatory Simulated Data Disclaimer Bar */}
      <div className="bg-amber text-black py-1 px-4 text-center font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xs">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{SHOP_METADATA.simulatedDisclaimer}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Entity & Breadcrumb */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-text-primary px-2.5 py-1.5 rounded-lg border border-transparent hover:border-border-main hover:bg-bg-surface-elevated transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>

          <div className="h-4 w-[1px] bg-border-main" />

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-text-primary tracking-tight">{getTabTitle()}</span>
              <span className="text-[10px] font-mono bg-primary/10 text-primary border border-primary/25 px-2 py-0.5 rounded-full font-medium">
                ShopX
              </span>
            </div>
            <span className="text-[11px] font-mono text-text-muted hidden sm:block">
              {SHOP_METADATA.legalEntity} • Tax ID: {SHOP_METADATA.taxId}
            </span>
          </div>
        </div>

        {/* Right: Actions & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-primary hover:bg-primary-hover shadow-xs transition-colors"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>CFO Audit Sign-Off</span>
          </button>
        </div>
      </div>
    </header>
  );
}
