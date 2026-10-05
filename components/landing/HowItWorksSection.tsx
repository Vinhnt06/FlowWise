'use client';

import React from 'react';
import { UploadCloud, Cpu, Award, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

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
      accent: '#00D4AA',
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
      accent: '#FFAA00',
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
      accent: '#00D4AA',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-28 bg-[#0A0A0F] overflow-hidden border-b border-[#232336]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D4AA]/10 border border-[#00D4AA]/30 text-xs font-mono text-[#00D4AA] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Execution Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            3-Stage Deterministic Pipeline
          </h2>
          <p className="text-base text-[#A1A1BA]">
            Transparent, repeatable, and audited for e-commerce controllers, financial analysts, and corporate CFOs.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle Glowing Desktop Connector Line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-[#00D4AA]/30 via-[#FFAA00]/40 to-[#00D4AA]/30 -z-0" />

          {steps.map((step) => (
            <div
              key={step.num}
              className="rounded-2xl bg-[#111118] border border-[#232336] p-7 backdrop-blur-xl relative z-10 group hover:border-[#00D4AA]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div 
                  className="w-12 h-12 rounded-xl bg-black/60 border flex items-center justify-center font-mono font-bold text-lg mb-6 shadow-inner"
                  style={{ borderColor: `${step.accent}40`, color: step.accent }}
                >
                  {step.num}
                </div>

                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-[#8E8EA8] leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="p-3.5 rounded-xl bg-[#161622] border border-[#232336] text-[11px] font-mono text-[#A1A1BA] space-y-2">
                  {step.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.accent }} />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#232336] flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider text-[#6E6E87] uppercase">
                  {step.tag}
                </span>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: step.accent }} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Cockpit Launch CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-black bg-[#00D4AA] hover:bg-[#05F3C4] transition-all shadow-lg shadow-[#00D4AA]/25 group"
          >
            <span>Experience The Live Pipeline In Cockpit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
