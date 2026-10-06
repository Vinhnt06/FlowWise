'use client';

import React from 'react';
import Image from 'next/image';
import { Wallet, Coins, DollarSign, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';

export default function CurrenciesSection() {
  return (
    <section id="currencies" className="relative py-28 bg-bg-base border-b border-border-main transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono font-medium text-primary mb-4">
            <Coins className="w-3.5 h-3.5" />
            <span>STRICT ARCHITECTURAL INVARIANT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
            Absolute Currency Isolation <br />
            <span className="text-primary">— Zero Artificial Conversion</span>
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Consolidating multi-currency balances creates dangerous solvency illusions. A business can be profitable on paper in VND while suffering factory shipment freezes from zero CNY in escrow.
          </p>
        </div>

        {/* 3-Currency Institutional Ledger Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1: VND Operating Cash (Emerald) */}
          <div className="rounded-2xl bg-bg-surface border border-vnd/30 hover:border-vnd/70 p-7 transition-all duration-300 shadow-sm flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-vnd/30 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 bg-bg-surface-elevated">
                    <Image
                      src="/images/coin-vnd.jpg"
                      alt="Vietnamese Dong Medallion"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-bg-surface flex items-center justify-center text-[9px] text-white font-bold">
                    ₫
                  </span>
                </div>
                <span className="text-[11px] font-mono text-vnd bg-vnd/10 border border-vnd/25 px-2.5 py-0.5 rounded-full font-bold">
                  Domestic Ledger
                </span>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-1">Operating Cashflow (VND)</h3>
              <span className="text-xs text-text-muted block mb-5">Settlement & Operations</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-vnd tracking-tight mb-8 tabular-nums">
                280,000,000 ₫
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-border-subtle pt-5">
                <div className="flex items-center justify-between text-text-muted">
                  <span>Primary Inflow:</span>
                  <span className="text-text-primary font-medium">Shopee & TikTok Payouts</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Safety Buffer:</span>
                  <span className="text-vnd font-semibold tabular-nums">160,000,000 ₫</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Week 2 Status:</span>
                  <span className="text-amber font-semibold">Tactical Action Required</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-vnd/10 border border-vnd/20 text-xs text-vnd flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Dedicated for domestic payroll, rent & daily fulfillment</span>
            </div>
          </div>

          {/* Card 2: CNY Supplier Payables (Warm Coral) */}
          <div className="rounded-2xl bg-bg-surface border border-cny/30 hover:border-cny/70 p-7 transition-all duration-300 shadow-sm flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-cny/30 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 bg-bg-surface-elevated">
                    <Image
                      src="/images/coin-cny.jpg"
                      alt="Chinese Yuan Medallion"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cny border-2 border-bg-surface flex items-center justify-center text-[9px] text-white font-bold">
                    ¥
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cny bg-cny/10 border border-cny/25 px-2.5 py-0.5 rounded-full font-bold">
                  Sourcing Ledger
                </span>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-1">Factory Payables (CNY)</h3>
              <span className="text-xs text-text-muted block mb-5">1688 OEM & Packaging</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-cny tracking-tight mb-8 tabular-nums">
                ¥120,000
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-border-subtle pt-5">
                <div className="flex items-center justify-between text-text-muted">
                  <span>Primary Outflow:</span>
                  <span className="text-text-primary font-medium">Guangzhou OEM Invoices</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Due Cycle:</span>
                  <span className="text-cny font-semibold">Net 14 Settlement</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Mitigation Lever:</span>
                  <span className="text-text-primary font-medium">Vendor Term Extension</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-cny/10 border border-cny/20 text-xs text-cny flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Protects production lines from cross-border payment stalls</span>
            </div>
          </div>

          {/* Card 3: USD Ads & Freight (Cobalt Blue) */}
          <div className="rounded-2xl bg-bg-surface border border-usd/30 hover:border-usd/70 p-7 transition-all duration-300 shadow-sm flex flex-col justify-between group hover:-translate-y-1">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-usd/30 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 bg-bg-surface-elevated">
                    <Image
                      src="/images/coin-usd.jpg"
                      alt="US Dollar Medallion"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-usd border-2 border-bg-surface flex items-center justify-center text-[9px] text-white font-bold">
                    $
                  </span>
                </div>
                <span className="text-[11px] font-mono text-usd bg-usd/10 border border-usd/25 px-2.5 py-0.5 rounded-full font-bold">
                  Growth & Logistics
                </span>
              </div>

              <h3 className="text-lg font-bold text-text-primary mb-1">Performance Ads (USD)</h3>
              <span className="text-xs text-text-muted block mb-5">Meta Ads & Ocean Freight</span>

              <div className="font-mono text-3xl sm:text-4xl font-extrabold text-usd tracking-tight mb-8 tabular-nums">
                $15,000
              </div>

              <div className="space-y-3 font-mono text-xs border-t border-border-subtle pt-5">
                <div className="flex items-center justify-between text-text-muted">
                  <span>Primary Inflow:</span>
                  <span className="text-text-primary font-medium">USD Merchant Balance</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Ad Spend Burn:</span>
                  <span className="text-usd font-semibold tabular-nums">$1,200 / Week</span>
                </div>
                <div className="flex items-center justify-between text-text-muted">
                  <span>Buffer Margin:</span>
                  <span className="text-vnd font-semibold tabular-nums">$5,000 (Safe)</span>
                </div>
              </div>
            </div>

            <div className="mt-8 p-3 rounded-xl bg-usd/10 border border-usd/20 text-xs text-usd flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Ensures uninterrupted ad ROAS & international freight clearance</span>
            </div>
          </div>
        </div>

        {/* Isolation Banner */}
        <div className="mt-12 rounded-xl bg-bg-surface border border-border-main p-4 text-center text-xs font-mono text-text-secondary flex items-center justify-center gap-2 shadow-sm">
          <Lock className="w-4 h-4 text-primary" />
          <span>Strict Anti-Blending Rule: FlowWise forbids arithmetic cross-currency merging to eliminate catastrophic FX translation illusions.</span>
        </div>
      </div>
    </section>
  );
}
