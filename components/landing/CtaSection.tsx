'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Lock, Sparkles } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative py-28 bg-bg-base border-b border-border-main transition-colors duration-200">
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bg-surface border border-border-main text-[11px] font-mono uppercase tracking-wider text-text-secondary mb-8 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>INTERACTIVE ENTERPRISE PROTOTYPE</span>
        </div>

        <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-text-primary mb-6 leading-[1.1]">
          Master Multi-Currency Cashflow. <br />
          <span className="text-primary">
            Before Settlement Traps Strike.
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-text-secondary leading-relaxed mb-10">
          Eliminate liquidity blindspots across Shopee, TikTok Shop, and 1688 supply chains.
          Experience the live ShopX case study directly in the interactive cockpit.
        </p>

        {/* Dual High-Contrast Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-hover transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group"
          >
            <span>Launch Live Interactive Cockpit</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href="#forecast"
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-medium text-text-primary bg-bg-surface hover:bg-bg-surface-elevated border border-border-main transition-colors duration-200 flex items-center justify-center gap-2 shadow-xs"
          >
            <span>Explore 13-Week Trajectory</span>
          </a>
        </div>

        {/* 3 High-End Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-text-muted pt-8 border-t border-border-subtle">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Deterministic Conservation Theorem</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" />
            <span>Strict Denomination Isolation (Zero FX Mix)</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Fintechathon 2026 Verified Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
