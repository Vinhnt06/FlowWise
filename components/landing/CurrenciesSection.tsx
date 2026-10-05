'use client';

import React from 'react';
import { Wallet, Coins, DollarSign, ShieldAlert, ArrowUpRight, CheckCircle2, Lock } from 'lucide-react';

export default function CurrenciesSection() {
  return (
    <section id="currencies" className="relative py-28 bg-[#0A0A0F] overflow-hidden border-b border-[#232336]">
      {/* Dynamic multi-tint ambient glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-[400px] h-[400px] bg-[#00D4AA]/8 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#FF6B35]/8 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[400px] h-[400px] bg-[#4D9FFF]/8 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-xs font-mono text-[#00D4AA] mb-4">
            <Coins className="w-3.5 h-3.5" />
            <span>Strict Architectural Invariant</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Absolute Currency Isolation <br />
            <span className="text-[#00D4AA]">— Zero Artificial Conversion</span>
          </h2>
          <p className="text-base text-[#A1A1BA] max-w-2xl mx-auto">
            Consolidating multi-currency balances creates dangerous solvency illusions. A business can be profitable on paper in VND while suffering factory shipment freezes from zero CNY in escrow.
          </p>
        </div>

        {/* 3-Currency Holographic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card 1: VND Operating Cash (Teal) */}
          <div className="rounded-2xl bg-[#111118] border-2 border-[#00D4AA]/40 p-7 backdrop-blur-xl relative group hover:border-[#00D4AA] transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(0,212,170,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#00D4AA]/15 border border-[#00D4AA]/40 flex items-center justify-center text-[#00D4AA]">
                  <Wallet className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-[#00D4AA] bg-[#00D4AA]/10 border border-[#00D4AA]/30 px-2.5 py-0.5 rounded-full font-bold">
                  Domestic Ledger
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">Operating Cashflow (VND)</h3>
              <span className="text-xs text-[#8E8EA8] block mb-5">Settlement & Operations</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#00D4AA] tracking-tight mb-8">
                280,000,000 ₫
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-[#232336] pt-5">
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Primary Inflow:</span>
                  <span className="text-white font-medium">Shopee & TikTok Payouts</span>
                </div>
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Safety Buffer:</span>
                  <span className="text-[#00D4AA] font-semibold">160,000,000 ₫</span>
                </div>
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Week 2 Status:</span>
                  <span className="text-[#FFAA00] font-semibold">Tactical Action Required</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-xs text-[#00D4AA] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Dedicated for domestic payroll, rent & daily fulfillment</span>
            </div>
          </div>

          {/* Card 2: CNY Supplier Payables (Coral Orange) */}
          <div className="rounded-2xl bg-[#111118] border-2 border-[#FF6B35]/40 p-7 backdrop-blur-xl relative group hover:border-[#FF6B35] transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(255,107,53,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#FF6B35]/15 border border-[#FF6B35]/40 flex items-center justify-center text-[#FF6B35]">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-[#FF6B35] bg-[#FF6B35]/10 border border-[#FF6B35]/30 px-2.5 py-0.5 rounded-full font-bold">
                  Sourcing Ledger
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">Factory Payables (CNY)</h3>
              <span className="text-xs text-[#8E8EA8] block mb-5">1688 OEM & Packaging</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#FF6B35] tracking-tight mb-8">
                ¥120,000
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-[#232336] pt-5">
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Primary Outflow:</span>
                  <span className="text-white font-medium">Guangzhou OEM Invoices</span>
                </div>
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Due Cycle:</span>
                  <span className="text-[#FF6B35] font-semibold">Net 14 Settlement</span>
                </div>
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Mitigation Lever:</span>
                  <span className="text-white font-medium">Vendor Term Extension</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-xs text-[#FF6B35] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Protects production lines from cross-border payment stalls</span>
            </div>
          </div>

          {/* Card 3: USD Ads & Freight (Cobalt Blue) */}
          <div className="rounded-2xl bg-[#111118] border-2 border-[#4D9FFF]/40 p-7 backdrop-blur-xl relative group hover:border-[#4D9FFF] transition-all duration-300 shadow-[0_15px_40px_-15px_rgba(77,159,255,0.15)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#4D9FFF]/15 border border-[#4D9FFF]/40 flex items-center justify-center text-[#4D9FFF]">
                  <DollarSign className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-[#4D9FFF] bg-[#4D9FFF]/10 border border-[#4D9FFF]/30 px-2.5 py-0.5 rounded-full font-bold">
                  Growth & Logistics
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1">Performance Ads (USD)</h3>
              <span className="text-xs text-[#8E8EA8] block mb-5">Meta Ads & Ocean Freight</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-[#4D9FFF] tracking-tight mb-8">
                $15,000
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-[#232336] pt-5">
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Primary Inflow:</span>
                  <span className="text-white font-medium">USD Merchant Balance</span>
                </div>
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Ad Spend Burn:</span>
                  <span className="text-[#4D9FFF] font-semibold">$1,200 / Week</span>
                </div>
                <div className="flex items-center justify-between text-[#8E8EA8]">
                  <span>Buffer Margin:</span>
                  <span className="text-[#00D4AA] font-semibold">$5,000 (Safe)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-[#4D9FFF]/10 border border-[#4D9FFF]/30 text-xs text-[#4D9FFF] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Ensures uninterrupted ad ROAS & international freight clearance</span>
            </div>
          </div>
        </div>

        {/* Isolation Banner */}
        <div className="mt-12 rounded-xl bg-[#161622] border border-[#232336] p-4 text-center text-xs font-mono text-[#8E8EA8] flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-[#00D4AA]" />
          <span>Strict Anti-Blending Rule: FlowWise forbids arithmetic cross-currency merging to eliminate catastrophic FX translation illusions.</span>
        </div>
      </div>
    </section>
  );
}
