'use client';

import React, { useState } from 'react';
import { UploadCloud, LineChart, AlertOctagon, SlidersHorizontal, FileCheck, CheckCircle2, Cpu, ShieldCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FeaturesBento() {
  const [activeLever, setActiveLever] = useState<'none' | 'lever1' | 'both'>('both');

  return (
    <section id="features" className="relative py-24 bg-bg-base overflow-hidden border-b border-border-main transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-surface border border-primary/20 text-xs font-mono text-primary mb-4 font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Deterministic Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
            5 Core Capabilities <br />
            <span className="text-primary">Engineered for Commercial Treasury</span>
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            Zero AI hallucination. Mathematical conservation across 13 weeks with strict multi-currency isolation.
          </p>
        </div>

        {/* Gapless Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 (Wide 7 cols): 1-Click Multi-Channel Ledger Ingestion */}
          <div className="md:col-span-7 rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-7 relative overflow-hidden group hover:border-primary/40 transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-surface border border-primary/20 flex items-center justify-center text-primary">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary tracking-tight">1-Click Multi-Channel Ingestion</h3>
                  <span className="text-xs text-text-muted">Instant normalization for Shopee, TikTok Shop & Bank CSVs</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-primary bg-primary-surface px-2 py-0.5 rounded border border-primary/20 font-semibold">
                NORMALIZED
              </span>
            </div>

            {/* Inner Ingestion Preview */}
            <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-dashed border-border-strong bg-bg-surface text-center w-full sm:w-44 shadow-xs">
                <span className="text-[10px] font-mono text-primary bg-primary-surface px-2 py-0.5 rounded font-bold mb-1 border border-primary/20">
                  CSV / XLSX
                </span>
                <span className="text-[11px] text-text-secondary">Drop raw settlement files</span>
                <span className="text-[9px] font-mono text-text-muted mt-1">9,842 rows audited</span>
              </div>

              <div className="space-y-2 w-full text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-bg-surface border border-border-main">
                  <span className="text-text-primary flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#EE4D2D]" />
                    Shopee Settlement Batch
                  </span>
                  <span className="text-primary font-bold">Deductions Parsed (30%)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-bg-surface border border-border-main">
                  <span className="text-text-primary flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    TikTok Shop Income Batch
                  </span>
                  <span className="text-primary font-bold">14-Day Escrow Mapped</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-bg-surface border border-border-main">
                  <span className="text-text-primary flex items-center gap-2 font-medium">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    Commercial Bank Statement
                  </span>
                  <span className="text-primary font-bold">Zero Discrepancy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 (5 cols): Deterministic 13-Week Mathematical Engine */}
          <div className="md:col-span-5 rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-7 relative overflow-hidden group hover:border-primary/40 transition-all duration-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-surface border border-primary/20 flex items-center justify-center text-primary">
                <LineChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-primary tracking-tight">13-Week Liquidity Engine</h3>
                <span className="text-xs text-text-muted">Chained balance across consecutive weeks</span>
              </div>
            </div>

            {/* Formula & Sparkline Visual */}
            <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main space-y-3">
              <div className="p-2.5 rounded-lg bg-bg-surface border border-border-main font-mono text-[11px] text-text-secondary">
                <div className="text-primary font-bold mb-1">CONSERVATION THEOREM:</div>
                <code>Closing[t] = Opening[t] + Inflows[t] - Outflows[t]</code>
                <div className="text-[10px] text-text-muted mt-1">Opening[t+1] === Closing[t] (Strict Invariant)</div>
              </div>

              {/* Sparkline curve */}
              <div className="h-16 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 250 50" fill="none">
                  <path
                    d="M0 35 Q 40 5, 80 45 T 160 15 T 250 10"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <line x1="0" y1="28" x2="250" y2="28" stroke="var(--amber)" strokeDasharray="3 3" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3 (4 cols): Smart Buffer Deficit Alerts */}
          <div className="md:col-span-4 rounded-2xl bg-bg-surface border border-border-main p-6 group hover:border-amber/40 transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-surface border border-amber/30 flex items-center justify-center text-amber">
                  <AlertOctagon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary tracking-tight">Smart Buffer Alarms</h3>
                  <span className="text-xs text-text-muted">14-Day Advance Warning</span>
                </div>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-crimson" />
            </div>

            <p className="text-xs text-text-secondary leading-relaxed mb-4">
              FlowWise alerts leadership <span className="text-amber font-semibold">14 days</span> before cash falls below safety thresholds, eliminating surprise overdrafts.
            </p>

            <div className="p-3 rounded-lg bg-amber-surface border border-amber/30 font-mono text-xs">
              <div className="flex justify-between text-amber font-bold">
                <span>Week 2 Predicted Deficit:</span>
                <span>-10,000,000 ₫</span>
              </div>
              <div className="text-[10px] text-text-muted mt-1">
                Threshold: 160M ₫ | Projected: 150M ₫
              </div>
            </div>
          </div>

          {/* Card 4 (4 cols): Interactive Scenario Simulator */}
          <div className="md:col-span-4 rounded-2xl bg-bg-surface border border-border-main p-6 group hover:border-primary/40 transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-surface border border-primary/20 flex items-center justify-center text-primary">
                  <SlidersHorizontal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-text-primary tracking-tight">3-Lever Simulator</h3>
                  <span className="text-xs text-text-muted">Neutralize Cash Deficits</span>
                </div>
              </div>
            </div>

            {/* Interactive Lever Toggle Buttons */}
            <div className="space-y-2 mb-4 font-mono text-xs">
              <button
                onClick={() => setActiveLever('lever1')}
                className={`w-full p-2 rounded-lg text-left border transition-all ${
                  activeLever === 'lever1'
                    ? 'bg-primary-surface border-primary text-primary font-bold'
                    : 'bg-bg-surface-elevated border-border-main text-text-secondary hover:text-text-primary'
                }`}
              >
                1. Accelerate Receivables (+49M)
              </button>
              <button
                onClick={() => setActiveLever('both')}
                className={`w-full p-2 rounded-lg text-left border transition-all ${
                  activeLever === 'both'
                    ? 'bg-primary-surface border-primary text-primary font-bold'
                    : 'bg-bg-surface-elevated border-border-main text-text-secondary hover:text-text-primary'
                }`}
              >
                2. Combined Rescue (+89M Net)
              </button>
            </div>

            <div className="p-2.5 rounded-lg bg-bg-surface-elevated border border-border-main font-mono text-xs flex justify-between items-center">
              <span className="text-text-muted">W2 Position:</span>
              <span className="text-primary font-bold tabular-nums">
                {activeLever === 'both' ? 'Surplus: +79,000,000 ₫' : 'Surplus: +39,000,000 ₫'}
              </span>
            </div>
          </div>

          {/* Card 5 (4 cols): CFO-Grade Boardroom Audit & Sign-off */}
          <div className="md:col-span-4 rounded-2xl bg-bg-surface border border-border-main p-6 group hover:border-primary/40 transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-surface border border-primary/20 flex items-center justify-center text-primary">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text-primary tracking-tight">CFO Audit Report</h3>
                    <span className="text-xs text-text-muted">Verified Sign-Off Package</span>
                  </div>
                </div>
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>

              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Automated executive sign-off package with full audit trail, mathematical proof, and formal action recommendations.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="w-full py-2 px-3 rounded-lg bg-bg-surface-elevated hover:bg-bg-surface border border-border-main hover:border-primary/40 text-xs font-mono text-text-primary flex items-center justify-between transition-colors shadow-xs group/btn"
            >
              <span>View Executive Report Dossier</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
