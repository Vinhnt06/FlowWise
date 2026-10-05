'use client';

import React, { useState } from 'react';
import { UploadCloud, LineChart, AlertOctagon, SlidersHorizontal, FileCheck, CheckCircle2, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesBento() {
  const [activeLever, setActiveLever] = useState<'none' | 'lever1' | 'both'>('both');

  return (
    <section id="features" className="relative py-28 bg-[#0A0A0F] overflow-hidden border-b border-[#232336]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[500px] bg-[#00D4AA]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-xs font-mono text-[#00D4AA] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Deterministic Core Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            5 Deterministic Capabilities <br />
            <span className="text-[#00D4AA]">Built for Commercial Cashflow</span>
          </h2>
          <p className="text-base text-[#A1A1BA] max-w-2xl mx-auto">
            Zero AI hallucination. Mathematical conservation across 13 weeks with strict multi-currency isolation.
          </p>
        </div>

        {/* Gapless Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 (Wide 7 cols): 1-Click Multi-Channel Ledger Ingestion */}
          <div className="md:col-span-7 rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden group hover:border-[#00D4AA]/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/30 flex items-center justify-center text-[#00D4AA]">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">1-Click Multi-Channel Ingestion</h3>
                  <span className="text-xs text-[#8E8EA8]">Instant normalization for Shopee, TikTok Shop & Bank CSVs</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-[#00D4AA] bg-[#00D4AA]/10 px-2 py-0.5 rounded border border-[#00D4AA]/20">
                AUTO-PARSED
              </span>
            </div>

            {/* Inner Live Ingestion Widget */}
            <div className="p-4 rounded-xl bg-[#161622] border border-[#232336] flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-[#00D4AA]/40 bg-[#0A0A0F] text-center w-full sm:w-44">
                <span className="text-[10px] font-mono text-[#00D4AA] bg-[#00D4AA]/15 px-2 py-0.5 rounded font-bold mb-1">
                  CSV / XLSX
                </span>
                <span className="text-[11px] text-[#A1A1BA]">Drop raw settlement files</span>
                <span className="text-[9px] font-mono text-[#6E6E87] mt-1">9,842 rows normalized</span>
              </div>

              <div className="space-y-2 w-full text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#232336]">
                  <span className="text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#EE4D2D]" />
                    Shopee Settlement Batch
                  </span>
                  <span className="text-[#00D4AA] font-bold">Deductions Parsed (30%)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#232336]">
                  <span className="text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#00F2FE]" />
                    TikTok Shop Income Batch
                  </span>
                  <span className="text-[#00D4AA] font-bold">14-Day Escrow Mapped</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-black/40 border border-[#232336]">
                  <span className="text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4D9FFF]" />
                    Bank Account Statements
                  </span>
                  <span className="text-[#00D4AA] font-bold">Zero Discrepancy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 (5 cols): Deterministic 13-Week Mathematical Engine */}
          <div className="md:col-span-5 rounded-2xl bg-[#111118] border border-[#232336] p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden group hover:border-[#00D4AA]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/30 flex items-center justify-center text-[#00D4AA]">
                <LineChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">13-Week Liquidity Engine</h3>
                <span className="text-xs text-[#8E8EA8]">Chained conservation across consecutive weeks</span>
              </div>
            </div>

            {/* Formula & Sparkline Visual */}
            <div className="p-4 rounded-xl bg-[#161622] border border-[#232336] space-y-3">
              <div className="p-2.5 rounded-lg bg-black/50 border border-[#232336] font-mono text-[11px] text-[#A1A1BA]">
                <div className="text-[#00D4AA] font-bold mb-1">CONSERVATION THEOREM:</div>
                <code>Closing[t] = Opening[t] + Inflows[t] - Outflows[t]</code>
                <div className="text-[10px] text-[#6E6E87] mt-1">Opening[t+1] === Closing[t] (Strict Check)</div>
              </div>

              {/* Sparkline curve */}
              <div className="h-16 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 250 50" fill="none">
                  <path
                    d="M0 35 Q 40 5, 80 45 T 160 15 T 250 10"
                    stroke="#00D4AA"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line x1="0" y1="28" x2="250" y2="28" stroke="#FFAA00" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3 (4 cols): Smart Buffer Deficit Alerts */}
          <div className="md:col-span-4 rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl group hover:border-[#FFAA00]/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFAA00]/10 border border-[#FFAA00]/30 flex items-center justify-center text-[#FFAA00]">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">Smart Buffer Alarms</h3>
                  <span className="text-xs text-[#8E8EA8]">14-Day Advance Warning</span>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4757] animate-ping" />
            </div>

            <p className="text-xs text-[#A1A1BA] leading-relaxed mb-4">
              FlowWise alerts leadership <span className="text-[#FFAA00] font-semibold">14 days</span> before cash falls below safety thresholds, eliminating surprise overdrafts.
            </p>

            <div className="p-3 rounded-lg bg-[#FFAA00]/10 border border-[#FFAA00]/30 font-mono text-xs">
              <div className="flex justify-between text-[#FFAA00] font-bold">
                <span>Week 2 Predicted Deficit:</span>
                <span>-10,000,000 ₫</span>
              </div>
              <div className="text-[10px] text-[#A1A1BA] mt-1">
                Threshold: 160M ₫ | Projected: 150M ₫
              </div>
            </div>
          </div>

          {/* Card 4 (4 cols): Interactive Scenario Simulator */}
          <div className="md:col-span-4 rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl group hover:border-[#00D4AA]/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/30 flex items-center justify-center text-[#00D4AA]">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">3-Lever Simulator</h3>
                  <span className="text-xs text-[#8E8EA8]">Neutralize Cash Deficits</span>
                </div>
              </div>
            </div>

            {/* Interactive Lever Toggle Buttons */}
            <div className="space-y-2 mb-4 font-mono text-xs">
              <button
                onClick={() => setActiveLever('lever1')}
                className={`w-full p-2 rounded-lg text-left border transition-all ${
                  activeLever === 'lever1'
                    ? 'bg-[#00D4AA]/15 border-[#00D4AA]/50 text-white'
                    : 'bg-[#161622] border-[#232336] text-[#A1A1BA] hover:text-white'
                }`}
              >
                1. Accelerate Receivables (+49M)
              </button>
              <button
                onClick={() => setActiveLever('both')}
                className={`w-full p-2 rounded-lg text-left border transition-all ${
                  activeLever === 'both'
                    ? 'bg-[#00D4AA]/15 border-[#00D4AA]/50 text-white'
                    : 'bg-[#161622] border-[#232336] text-[#A1A1BA] hover:text-white'
                }`}
              >
                2. Combined Rescue (+89M Net)
              </button>
            </div>

            <div className="p-2.5 rounded-lg bg-black/40 border border-[#232336] font-mono text-xs flex justify-between items-center">
              <span className="text-[#8E8EA8]">W2 Status:</span>
              <span className="text-[#00D4AA] font-bold">
                {activeLever === 'both' ? 'Surplus: +79,000,000 ₫' : 'Surplus: +39,000,000 ₫'}
              </span>
            </div>
          </div>

          {/* Card 5 (4 cols): CFO-Grade Boardroom Audit & Sign-off */}
          <div className="md:col-span-4 rounded-2xl bg-[#111118] border border-[#232336] p-6 backdrop-blur-xl group hover:border-[#00D4AA]/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/30 flex items-center justify-center text-[#00D4AA]">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">CFO Audit Report</h3>
                  <span className="text-xs text-[#8E8EA8]">1-Click Verified Sign-off</span>
                </div>
              </div>
              <ShieldCheck className="w-4 h-4 text-[#00D4AA]" />
            </div>

            <p className="text-xs text-[#A1A1BA] leading-relaxed mb-4">
              Automated executive sign-off package with full audit trail, mathematical proof, and formal action recommendations.
            </p>

            <Link
              href="/dashboard"
              className="w-full py-2 px-3 rounded-lg bg-[#161622] hover:bg-[#1C1C2B] border border-[#232336] hover:border-[#00D4AA]/40 text-xs font-mono text-white flex items-center justify-between transition-colors group/btn"
            >
              <span>View Executive Report Modal</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#00D4AA] group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
