'use client';

import React from 'react';
import { ShieldCheck, Activity, Cpu, Layers } from 'lucide-react';

export default function TrustBar() {
  const integrations = [
    { name: 'Shopee Partner API', badge: 'v2.4', color: '#EE4D2D', icon: 'S' },
    { name: 'TikTok Shop Partner', badge: 'REST', color: '#0284C7', icon: 'TT' },
    { name: 'Lazada Open Platform', badge: 'OAuth', color: '#1E1B4B', icon: 'L' },
    { name: '1688 Cross-Border Gateway', badge: 'CNY', color: '#EA580C', icon: '1688' },
    { name: 'Meta Marketing API', badge: 'USD', color: '#2563EB', icon: 'M' },
    { name: 'Shopify Logistics', badge: 'Webhook', color: '#059669', icon: 'SP' },
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
      label: 'Reconciliation Precision',
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="relative py-10 bg-bg-surface border-y border-border-main transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* E-commerce & Logistics Channels Rail */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted mr-1 hidden xl:inline">
              Integrated Channels:
            </span>
            {integrations.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-surface-elevated border border-border-main hover:border-border-strong transition-colors cursor-default"
              >
                <div 
                  className="w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold text-white shadow-xs"
                  style={{ backgroundColor: item.color }}
                >
                  {item.icon}
                </div>
                <span className="text-xs font-semibold text-text-primary tracking-tight">
                  {item.name}
                </span>
                <span className="text-[9px] font-mono text-text-muted bg-bg-base px-1.5 py-0.5 rounded border border-border-main">
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
                  className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-bg-surface-elevated border border-border-main hover:border-primary/40 transition-all duration-200 shadow-xs"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary-surface border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-bold text-text-primary tracking-tight">
                      {metric.value}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">
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
