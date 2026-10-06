'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UploadCloud,
  LineChart,
  SlidersHorizontal,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  AlertOctagon,
  Percent,
  Cpu,
} from 'lucide-react';
import FintechSpotlightCard from '@/components/common/FintechSpotlightCard';

export default function FeaturesBento() {
  const [activeLever, setActiveLever] = useState<'lever1' | 'both'>('both');

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

        {/* Ramp/Linear Style Bento Grid (3-Tier Hierarchy) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1 (7 cols): Automated Multi-Channel Settlement Ingestion */}
          <FintechSpotlightCard spotlightColor="rgba(16, 185, 129, 0.14)" className="md:col-span-7 rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-7 group hover:border-primary/40 transition-all duration-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-surface border border-primary/20 flex items-center justify-center text-primary">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary tracking-tight">
                    1-Click Multi-Channel Ingestion
                  </h3>
                  <span className="text-xs text-text-muted">
                    Instant normalization for Shopee, TikTok Shop & Bank CSVs
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-primary bg-primary-surface px-2 py-0.5 rounded border border-primary/20 font-semibold">
                NORMALIZED
              </span>
            </div>

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
          </FintechSpotlightCard>

          {/* Card 2 (5 cols): Deterministic 13-Week Mathematical Engine with 3D Preview */}
          <FintechSpotlightCard spotlightColor="rgba(16, 185, 129, 0.14)" className="md:col-span-5 rounded-2xl bg-bg-surface border border-border-main p-6 sm:p-7 group hover:border-primary/40 transition-all duration-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-surface border border-primary/20 flex items-center justify-center text-primary">
                  <LineChart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary tracking-tight">13-Week Liquidity Engine</h3>
                  <span className="text-xs text-text-muted">Chained balance across consecutive weeks</span>
                </div>
              </div>

              {/* Formula & 3D Visual */}
              <div className="p-4 rounded-xl bg-bg-surface-elevated border border-border-main space-y-3">
                <div className="p-2.5 rounded-lg bg-bg-surface border border-border-main font-mono text-[11px] text-text-secondary">
                  <div className="text-primary font-bold mb-1">CONSERVATION THEOREM:</div>
                  <code>Closing[t] = Opening[t] + Inflows[t] - Outflows[t]</code>
                  <div className="text-[10px] text-text-muted mt-1">Opening[t+1] === Closing[t] (Strict Invariant)</div>
                </div>

                <div className="relative h-20 w-full rounded-lg overflow-hidden border border-border-main">
                  <Image
                    src="/images/fintech-treasury-glass.jpg"
                    alt="3D Liquidity Telemetry"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-1.5 left-2 right-2 text-[10px] font-mono text-text-primary flex items-center justify-between">
                    <span>13-Week Trajectory Matrix</span>
                    <span className="text-emerald-500 font-bold">Real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </FintechSpotlightCard>

          {/* Card 3 (4 cols): Smart Buffer Deficit Alerts */}
          <FintechSpotlightCard spotlightColor="rgba(245, 158, 11, 0.14)" className="md:col-span-4 rounded-2xl bg-bg-surface border border-border-main p-6 group hover:border-amber/40 transition-all duration-200 shadow-sm">
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
              <div className="text-[10px] text-text-muted mt-1">Threshold: 160M ₫ | Projected: 150M ₫</div>
            </div>
          </FintechSpotlightCard>

          {/* Card 4 (4 cols): Interactive 3-Lever Deficit Simulator */}
          <FintechSpotlightCard spotlightColor="rgba(16, 185, 129, 0.14)" className="md:col-span-4 rounded-2xl bg-bg-surface border border-border-main p-6 group hover:border-primary/40 transition-all duration-200 shadow-sm">
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
          </FintechSpotlightCard>

          {/* Card 5 (4 cols): CFO-Grade Boardroom Audit & Sign-off */}
          <FintechSpotlightCard spotlightColor="rgba(56, 189, 248, 0.14)" className="md:col-span-4 rounded-2xl bg-bg-surface border border-border-main p-6 group hover:border-primary/40 transition-all duration-200 shadow-sm flex flex-col justify-between">
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
          </FintechSpotlightCard>
        </div>
      </div>
    </section>
  );
}
