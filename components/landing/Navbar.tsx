'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, ShieldCheck } from 'lucide-react';

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
          ? 'bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-[#232336]/80 py-3.5 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#00d4aa] to-[#009b7c] flex items-center justify-center shadow-lg shadow-[#00d4aa]/25 group-hover:scale-105 transition-transform duration-200">
              <span className="font-mono text-black font-extrabold text-lg tracking-tighter">FW</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                FlowWise
                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa] animate-pulse"></span>
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#8e8ea8]">
                Multi-Currency Cashflow
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#111118]/80 border border-[#232336] rounded-full px-4 py-1.5 backdrop-blur-md">
            <a
              href="#problem"
              className="text-xs font-medium text-[#a1a1ba] hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
            >
              Vấn Đề
            </a>
            <a
              href="#features"
              className="text-xs font-medium text-[#a1a1ba] hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
            >
              Năng Lực Cốt Lõi
            </a>
            <a
              href="#forecast-preview"
              className="text-xs font-medium text-[#a1a1ba] hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
            >
              Dự Báo 13 Tuần
            </a>
            <a
              href="#currencies"
              className="text-xs font-medium text-[#a1a1ba] hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
            >
              3 Ngoại Tệ
            </a>
            <a
              href="#how-it-works"
              className="text-xs font-medium text-[#a1a1ba] hover:text-white px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
            >
              Quy Trình
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-black bg-[#00d4aa] hover:bg-[#05f3c4] transition-all duration-200 shadow-lg shadow-[#00d4aa]/25 hover:shadow-[#00d4aa]/40 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Vào Dashboard Demo</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
