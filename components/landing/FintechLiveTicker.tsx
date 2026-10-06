'use client';

import React from 'react';
import { ArrowUpRight, ArrowDownRight, ShieldCheck, Activity, Zap } from 'lucide-react';

export default function FintechLiveTicker() {
  const tickerItems = [
    { label: 'USD/VND FX', val: '25,415.00', change: '+0.08%', isUp: true, type: 'fx' },
    { label: 'CNY/VND FX', val: '3,584.20', change: '-0.02%', isUp: false, type: 'fx' },
    { label: 'USD/CNY FX', val: '7.0920', change: '+0.05%', isUp: true, type: 'fx' },
    { label: 'SHOPEE VN SETTLEMENT', val: 'T+3 Cycle', status: 'ON-TIME (99.98%)', isUp: true, type: 'platform' },
    { label: 'TIKTOK SHOP ESCROW', val: 'T+7 Settlement', status: 'VERIFIED (0% HOLD)', isUp: true, type: 'platform' },
    { label: '1688 OEM CROSS-BORDER', val: 'Guangzhou Rails', status: 'CUSTOMS CLEARED', isUp: true, type: 'platform' },
    { label: '13-WEEK INVARIANT', val: 'Closing(t) === Opening(t+1)', status: 'AUDITED & LOCKED', isUp: true, type: 'invariant' },
    { label: 'SHOPX LIQUIDITY BUFFER', val: '160,000,000 ₫', status: 'ENFORCED', isUp: true, type: 'invariant' },
  ];

  return (
    <div className="w-full bg-bg-surface border-y border-border-main overflow-hidden py-2.5 select-none relative z-20">
      {/* Edge Blur Vignettes */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-bg-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-bg-surface to-transparent z-10 pointer-events-none" />

      {/* Infinite Running Marquee Track */}
      <div className="flex animate-fintech-marquee whitespace-nowrap">
        {/* Render twice for seamless loop */}
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 mx-4 px-3 py-1 rounded-lg bg-bg-surface-elevated/70 border border-border-subtle hover:border-primary/40 transition-colors"
          >
            {item.type === 'fx' ? (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ) : item.type === 'invariant' ? (
              <ShieldCheck className="w-3 h-3 text-primary" />
            ) : (
              <Zap className="w-3 h-3 text-amber" />
            )}

            <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider font-semibold">
              {item.label}:
            </span>

            <span className="text-xs font-mono font-bold text-text-primary tabular-nums">
              {item.val}
            </span>

            {item.change && (
              <span
                className={`text-[10px] font-mono font-bold inline-flex items-center gap-0.5 px-1 rounded ${
                  item.isUp
                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                    : 'text-crimson bg-crimson/10'
                }`}
              >
                {item.isUp ? (
                  <ArrowUpRight className="w-2.5 h-2.5" />
                ) : (
                  <ArrowDownRight className="w-2.5 h-2.5" />
                )}
                {item.change}
              </span>
            )}

            {item.status && (
              <span className="text-[9px] font-mono font-semibold text-primary bg-primary/10 border border-primary/20 px-1.5 py-0.2 rounded">
                {item.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
