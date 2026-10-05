'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, ArrowLeft } from 'lucide-react';
import { SHOP_METADATA } from '@/data/shopx-dataset';

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
        return 'Multi-Platform Settlement Ingestion';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="border-b border-[#232336] bg-[#0C0C12]/90 backdrop-blur-xl sticky top-0 z-40">
      {/* Mandatory Simulated Data Disclaimer Bar (Direct from Design D1-D5) */}
      <div className="bg-[#FACC15] text-black py-1 px-4 text-center font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-sm">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{SHOP_METADATA.simulatedDisclaimer}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Entity & Breadcrumb */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-mono text-[#8E8EA8] hover:text-white px-2.5 py-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Landing Page</span>
          </Link>

          <div className="h-4 w-[1px] bg-[#232336]" />

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">{getTabTitle()}</span>
              <span className="text-[10px] font-mono bg-[#00D4AA]/15 text-[#00D4AA] border border-[#00D4AA]/30 px-2 py-0.5 rounded-full">
                ShopX
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8E8EA8] hidden sm:block">
              {SHOP_METADATA.legalEntity} • Tax ID: {SHOP_METADATA.taxId}
            </span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenReportModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black bg-[#00D4AA] hover:bg-[#05F3C4] shadow-lg shadow-[#00D4AA]/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>CFO Audit Sign-Off</span>
          </button>
        </div>
      </div>
    </header>
  );
}
