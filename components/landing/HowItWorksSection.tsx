'use client';

import React from 'react';
import { Cpu } from 'lucide-react';

export default function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Ingest Raw Multi-Channel Exports',
      description: 'Drag and drop raw settlement exports from Shopee Seller Centre, TikTok Shop Income Center, or commercial bank statements.',
      bullets: [
        'Automatic 12% marketplace commission split',
        '5% COD return reserve holdback isolation',
        'Deterministic payment release date scheduling',
      ],
      tag: 'INGESTION ENGINE',
      accentColor: 'text-primary',
      borderColor: 'border-primary/30',
      bgColor: 'bg-primary/10',
    },
    {
      num: '02',
      title: 'Run 13-Week Conservation Engine',
      description: 'Mathematical chained balance calculation across 13 consecutive weeks with absolute currency isolation for VND, CNY, and USD.',
      bullets: [
        'Pure function: Closing(t) === Opening(t+1)',
        'Automatic 14-day advance deficit detection',
        'Zero artificial currency conversion errors',
      ],
      tag: 'CONSERVATION PIPELINE',
      accentColor: 'text-amber',
      borderColor: 'border-amber/30',
      bgColor: 'bg-amber/10',
    },
    {
      num: '03',
      title: 'Simulate Levers & CFO Sign-Off',
      description: 'Tune 3 tactical levers to neutralize shortfalls, calculate cost of capital, and generate boardroom-ready executive sign-offs.',
      bullets: [
        'Early wholesale receivables acceleration',
        '14-day vendor payment term extensions',
        'Cryptographic audit timestamp verification',
      ],
      tag: 'DECISION & AUDIT',
      accentColor: 'text-vnd',
      borderColor: 'border-vnd/30',
      bgColor: 'bg-vnd/10',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 bg-bg-base border-b border-border-main transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-mono font-medium text-primary mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>EXECUTION PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text-primary mb-4">
            3-Stage Deterministic Pipeline
          </h2>
          <p className="text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Transparent, repeatable, and audited for e-commerce controllers, financial analysts, and corporate CFOs.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Subtle Desktop Connector Line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-border-main -z-0" />

          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl bg-bg-surface border border-border-main p-7 relative z-10 transition-all duration-200 hover:border-primary/40 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div 
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono font-bold text-base mb-6 shadow-xs ${step.bgColor} ${step.borderColor} ${step.accentColor}`}
                >
                  {step.num}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-text-primary tracking-tight">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="p-3.5 rounded-xl bg-bg-surface-elevated border border-border-main text-[11px] font-mono text-text-muted space-y-2">
                  {step.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${step.accentColor.replace('text-', 'bg-')}`} />
                      <span className="text-text-secondary">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
