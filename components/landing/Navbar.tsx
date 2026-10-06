'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ThemeToggle from '@/components/common/ThemeToggle';

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
          ? 'bg-bg-surface/90 backdrop-blur-xl border-b border-border-main py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Institutional Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-text font-mono font-bold text-sm shadow-sm transition-transform duration-200 group-hover:scale-105">
              FW
            </div>

            <div className="flex flex-col text-left">
              <span className="text-base font-bold tracking-tight text-text-primary flex items-center gap-1.5 leading-tight">
                FlowWise
              </span>
              <span className="text-[10px] font-mono tracking-wider uppercase text-text-muted">
                Treasury Intelligence
              </span>
            </div>
          </Link>

          {/* Floating Pill Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-bg-surface border border-border-main rounded-full px-4 py-1.5 shadow-sm">
            <a
              href="#problem"
              className="text-xs font-mono text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-full transition-colors hover:bg-bg-surface-elevated"
            >
              The Cash Gap
            </a>
            <a
              href="#forecast"
              className="text-xs font-mono text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-full transition-colors hover:bg-bg-surface-elevated flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              13-Week Engine
            </a>
            <a
              href="#currencies"
              className="text-xs font-mono text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-full transition-colors hover:bg-bg-surface-elevated"
            >
              Currencies
            </a>
            <a
              href="#features"
              className="text-xs font-mono text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-full transition-colors hover:bg-bg-surface-elevated"
            >
              Architecture
            </a>
            <a
              href="#how-it-works"
              className="text-xs font-mono text-text-secondary hover:text-text-primary px-3 py-1.5 rounded-full transition-colors hover:bg-bg-surface-elevated"
            >
              Pipeline
            </a>
          </nav>

          {/* Right Action Hub: Theme Toggle + Launch Cockpit */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-mono font-bold text-primary-text bg-primary hover:bg-primary-hover transition-all duration-200 shadow-sm active:scale-95"
            >
              <span>Launch Cockpit</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
