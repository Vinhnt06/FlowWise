'use client';

import React from 'react';
import { ShieldCheck, Activity, Cpu, Layers } from 'lucide-react';

export default function TrustBar() {
  const integrations = [
    { name: 'Shopee Partner API', badge: 'v2.4', color: '#EE4D2D', icon: 'S' },
    { name: 'TikTok Shop Partner', badge: 'REST', color: '#00F2FE', icon: 'TT' },
    { name: 'Lazada Open Platform', badge: 'OAuth', color: '#0F146D', icon: 'L' },
    { name: '1688 Cross-Border Gateway', badge: 'CNY', color: '#FF6B35', icon: '1688' },
    { name: 'Meta Marketing API', badge: 'USD', color: '#0081FB', icon: 'M' },
    { name: 'Shopify Logistics', badge: 'Webhook', color: '#95BF47', icon: 'SP' },
  ];

  const trustMetrics = [
    {
      value: '100% Deterministic',
      label: 'Zero AI Hallucination',
      icon: Cpu,
    },
    {
      value: '14-Day Headroom',
      label: 'Early Deficit Detection',
      icon: Activity,
    },
    {
      value: 'Zero FX Distortion',
      label: 'Strict Currency Isolation',
      icon: Layers,
    },
    {
      value: '99.98% Accuracy',
      label: 'Platform Reconciliation',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative py-12 bg-[#0C0C12] border-y border-[#232336] overflow-hidden">
      {/* Subtle ambient line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00D4AA]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* E-commerce & Logistics Channels */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#6E6E87] mr-1 hidden xl:inline">
              Integrated APIs:
            </span>
            {integrations.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161622] border border-[#232336] hover:border-[#33334D] transition-colors group cursor-default"
              >
                <div 
                  className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-semibold text-white tracking-tight group-hover:text-[#00D4AA] transition-colors">
                  {item.name}
                </span>
                <span className="text-[9px] font-mono text-[#6E6E87] bg-black/40 px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              </div>
            ))}
          </div>

          {/* Live Trust Metrics */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {trustMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div
                  key={metric.value}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161622] border border-[#232336] hover:border-[#00D4AA]/40 transition-all duration-300 shadow-md group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00D4AA]/10 border border-[#00D4AA]/20 flex items-center justify-center text-[#00D4AA] group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-white tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-[10px] font-mono text-[#8E8EA8]">
                      {metric.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
