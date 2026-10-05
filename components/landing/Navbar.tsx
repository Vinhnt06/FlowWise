'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/85 backdrop-blur-2xl border-b border-[#232336]/80 py-3 shadow-2xl shadow-black/80'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo with Glowing Jewel */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4aa] via-[#00b894] to-[#0a3d31] p-[1px] shadow-lg shadow-[#00d4aa]/25 group-hover:shadow-[#00d4aa]/50 transition-all duration-300">
                <div className="w-full h-full bg-[#0d0d14] rounded-xl flex items-center justify-center">
                  <span className="font-mono text-[#00d4aa] font-black text-base tracking-tighter group-hover:scale-110 transition-transform">
                    FW
                  </span>
                </div>
              </div>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#00d4aa] ring-4 ring-[#0a0a0f] animate-pulse" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1.5 leading-tight">
                FlowWise
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#8e8ea8]">
                Liquidity OS
              </span>
            </div>
          </Link>

          {/* Floating Pill Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#12121a]/80 border border-[#232336] rounded-full px-5 py-1.5 backdrop-blur-xl shadow-inner shadow-black/40">
            <a
              href="#problem"
              className="text-xs font-mono text-[#8e8ea8] hover:text-white px-3 py-1.5 rounded-full transition-all hover:bg-white/5"
            >
              The Cash Gap
            </a>
            <a
              href="#forecast-preview"
              className="text-xs font-mono text-[#8e8ea8] hover:text-white px-3 py-1.5 rounded-full transition-all hover:bg-white/5 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
              13-Week Engine
            </a>
            <a
              href="#currencies"
              className="text-xs font-mono text-[#8e8ea8] hover:text-white px-3 py-1.5 rounded-full transition-all hover:bg-white/5"
            >
              Isolated FX
            </a>
            <a
              href="#features"
              className="text-xs font-mono text-[#8e8ea8] hover:text-white px-3 py-1.5 rounded-full transition-all hover:bg-white/5"
            >
              Core Bento
            </a>
            <a
              href="#how-it-works"
              className="text-xs font-mono text-[#8e8ea8] hover:text-white px-3 py-1.5 rounded-full transition-all hover:bg-white/5"
            >
              Workflow
            </a>
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold text-black bg-gradient-to-r from-[#00d4aa] to-[#05f3c4] hover:to-white transition-all duration-300 shadow-xl shadow-[#00d4aa]/30 hover:shadow-[#00d4aa]/50 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>Launch Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
