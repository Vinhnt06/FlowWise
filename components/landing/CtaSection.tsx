'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Lock, Sparkles } from 'lucide-react';

export default function CtaSection() {
  return (
    <section className="relative py-32 bg-[#0A0A0F] overflow-hidden">
      {/* Volumetric ambient glow rising from bottom center */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px] bg-[#00D4AA]/12 blur-[170px] pointer-events-none rounded-t-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111118] border border-[#232336] text-[11px] font-mono uppercase tracking-wider text-[#A1A1BA] mb-8 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-[#00D4AA]" />
          <span>Interactive Enterprise Prototype</span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
          Master Multi-Currency Cashflow. <br />
          <span className="bg-gradient-to-r from-white via-[#F1F2F6] to-[#00D4AA] bg-clip-text text-transparent">
            Before Settlement Traps Strike.
          </span>
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#A1A1BA] leading-relaxed mb-10">
          Eliminate liquidity blindspots across Shopee, TikTok Shop, and 1688 supply chains.
          Experience the live ShopX case study directly in the interactive cockpit.
        </p>

        {/* Dual High-Contrast Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-9 py-4 rounded-full text-sm font-semibold text-black bg-[#00D4AA] hover:bg-[#05F3C4] transition-all duration-300 shadow-[0_0_35px_rgba(0,212,170,0.35)] hover:shadow-[0_0_50px_rgba(0,212,170,0.55)] flex items-center justify-center gap-2 group transform hover:-translate-y-0.5"
          >
            <span>Launch Live Interactive Cockpit</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href="#forecast"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-medium text-white bg-[#161622] hover:bg-[#1C1C2B] border border-[#232336] transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Explore 13-Week Trajectory</span>
          </a>
        </div>

        {/* 3 High-End Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-[#A1A1BA] pt-8 border-t border-[#232336]/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#00D4AA]" />
            <span>Deterministic Conservation Theorem</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#00D4AA]" />
            <span>Strict Denomination Isolation (Zero FX Mix)</span>
          </div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00D4AA]" />
            <span>Fintechathon 2026 Verified Architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
}
