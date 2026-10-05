'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ShieldCheck, Activity } from 'lucide-react';
import { SHOP_METADATA } from '@/data/shopx-dataset';

export default function Footer() {
  return (
    <footer className="bg-[#0C0C12] border-t border-[#232336] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#232336]">
          {/* Col 1: Brand & Disclaimer */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00D4AA] flex items-center justify-center text-black font-mono font-extrabold text-sm shadow-[0_0_15px_rgba(0,212,170,0.3)]">
                FW
              </div>
              <span className="text-xl font-bold tracking-tight text-white">FlowWise</span>
              <span className="text-[10px] font-mono text-[#00D4AA] bg-[#00D4AA]/10 border border-[#00D4AA]/30 px-2 py-0.5 rounded-full">
                v1.0.0
              </span>
            </div>

            <p className="text-xs text-[#8E8EA8] max-w-md leading-relaxed">
              Deterministic 13-week multi-currency cashflow intelligence for cross-border e-commerce brands, importers, and marketplace sellers across Southeast Asia.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FFAA00]/10 border border-[#FFAA00]/30 text-[11px] font-mono text-[#FFAA00]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{SHOP_METADATA.simulatedDisclaimer}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-semibold block uppercase tracking-wider">Cockpit System</span>
            <ul className="space-y-2.5 text-[#8E8EA8]">
              <li>
                <Link href="/dashboard" className="hover:text-[#00D4AA] transition-colors flex items-center gap-1.5">
                  <span>Interactive Cockpit</span>
                  <span className="text-[9px] bg-[#00D4AA]/15 text-[#00D4AA] px-1.5 py-0.5 rounded">LIVE</span>
                </Link>
              </li>
              <li>
                <a href="#forecast" className="hover:text-[#00D4AA] transition-colors">
                  13-Week Trajectory
                </a>
              </li>
              <li>
                <a href="#currencies" className="hover:text-[#00D4AA] transition-colors">
                  Multi-Currency Isolation
                </a>
              </li>
              <li>
                <a href="#problem" className="hover:text-[#00D4AA] transition-colors">
                  Marketplace Cash Trap
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Architecture */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-semibold block uppercase tracking-wider">Architecture & Code</span>
            <ul className="space-y-2.5 text-[#8E8EA8]">
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
                  <ExternalLink className="w-3 h-3 text-[#6E6E87]" />
                </a>
              </li>
              <li>
                <span className="text-[#6E6E87]">Fintechathon 2026 Submission</span>
              </li>
              <li className="flex items-center gap-1.5 text-[#00D4AA]">
                <Activity className="w-3 h-3" />
                <span>Deterministic Engine 100% Operational</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#6E6E87]">
          <div>
            &copy; 2026 FlowWise. Pure functional financial forecasting engine. All rights reserved.
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
