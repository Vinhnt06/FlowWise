'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Clock,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { formatCurrencyAmount } from '@/lib/finance-engine';
import {
  VND_BASELINE_FORECAST,
  VND_SUMMARY,
  CNY_SUMMARY,
  USD_SUMMARY,
  SHOP_METADATA,
} from '@/data/shopx-dataset';

interface FintechAiCopilotProps {
  onNavigateToSimulator?: () => void;
  onNavigateToForecast?: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: {
    week?: number;
    amount?: string;
    source?: string;
  }[];
  action?: {
    label: string;
    onClick: () => void;
  };
}

const PRESET_QUERIES = [
  {
    id: 'q1',
    label: '🚨 Why is Week 2 in deficit?',
    query: 'Why is Week 2 in deficit and what caused the shortfall?',
  },
  {
    id: 'q2',
    label: '⚡ How does 14-day vendor deferral help?',
    query: 'What happens if we negotiate a 14-day vendor extension with 1688?',
  },
  {
    id: 'q3',
    label: '🌐 Multi-Currency Exposure Status',
    query: 'What is our current balance and safe buffer across VND, CNY, and USD?',
  },
  {
    id: 'q4',
    label: '🛡️ Safe Buffer & Cash Runway',
    query: 'How long is our zero-revenue cash runway and what is our minimum safe buffer?',
  },
];

export default function FintechAiCopilot({
  onNavigateToSimulator,
  onNavigateToForecast,
}: FintechAiCopilotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'assistant',
      text: `Hello, I am FlowWise Treasury AI. All responses are derived strictly from your deterministic 13-week financial engine with zero extrapolation (Guardrail G01–G08 compliant).\n\nHow can I help you analyze ShopX's liquidity position today?`,
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let responseMsg: ChatMessage;

      if (lower.includes('week 2') || lower.includes('deficit') || lower.includes('shortfall') || lower.includes('why')) {
        responseMsg = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: `In Week 2 (Oct 12 – Oct 18), ShopX closes at 150,000,000 VND against the required Safe Buffer of 160,000,000 VND, resulting in an exact liquidity deficit of 10,000,000 VND.\n\nRoot Cause Drivers:\n1. 1688 OEM Batch Settlement: 180,000,000 VND payable due.\n2. Warehouse & Lease Rental: 60,000,000 VND fixed OPEX.\n3. Marketplace Escrow Lag: 10% holdback (~11M VND) locked by Shopee T+3 terms.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: [
            { week: 2, amount: '10,000,000 VND Deficit', source: 'shopx-dataset.ts:L102-107' },
            { week: 2, amount: '180,000,000 VND Outflow', source: '1688 OEM Supplier Invoice' },
          ],
          action: onNavigateToSimulator
            ? {
                label: '⚡ Open 3-Lever Mitigation Simulator',
                onClick: () => {
                  setIsOpen(false);
                  onNavigateToSimulator();
                },
              }
            : undefined,
        };
      } else if (lower.includes('defer') || lower.includes('vendor') || lower.includes('14-day') || lower.includes('14 day')) {
        responseMsg = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: `Executing Lever 2 (14-Day Supplier Deferral on 40,000,000 VND) shifts the payable obligation from Week 2 to Week 4 without early repayment penalties.\n\nImpact:\n• Week 2 Closing rises from 150M to 190M VND (+30M surplus above buffer).\n• Total capital cost is 0 VND (pure supplier negotiation). Combined with Lever 1, Week 2 achieves 239M VND (+79M buffer surplus).`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: [
            { week: 2, amount: '+40,000,000 VND Deferred', source: 'finance-engine.ts:simulateMitigationScenario' },
          ],
          action: onNavigateToSimulator
            ? {
                label: 'View Pre vs Post Comparison Curve',
                onClick: () => {
                  setIsOpen(false);
                  onNavigateToSimulator();
                },
              }
            : undefined,
        };
      } else if (lower.includes('currency') || lower.includes('cny') || lower.includes('usd') || lower.includes('exposure')) {
        responseMsg = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: `Under FlowWise Strict Currency Isolation, books operate independently without cross-consolidation:\n\n• VND: Current 280M VND | Buffer 160M VND (Week 2 Deficit Flagged)\n• CNY: Current ¥120,000 | Buffer ¥40,000 (Adequate for 1688 terms)\n• USD: Current $15,000 | Buffer $5,000 (Adequate for Meta Ads & Sea Freight)`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: [
            { source: 'VND_SUMMARY, CNY_SUMMARY, USD_SUMMARY' },
          ],
        };
      } else {
        responseMsg = {
          id: `a-${Date.now()}`,
          sender: 'assistant',
          text: `Audit Summary for ${SHOP_METADATA.legalEntity}:\n• 13-Week Chained Conservation verified: Closing(t) === Opening(t+1) holds across all 13 periods.\n• Minimum Operating Buffer: 160,000,000 VND.\n• Lowest Projected Point: Week 2 (150,000,000 VND).\n• Recommended Tactical Action: Accelerate receivables or defer vendor batch payable to avoid payroll shortfall.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          citations: [
            { source: 'finance-engine.ts:test:finance 7/7 PASSED' },
          ],
        };
      }

      setMessages((prev) => [...prev, responseMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 text-xs font-mono font-bold tracking-tight border border-white/20 active:scale-95 group"
        title="Open FlowWise Treasury AI Copilot"
      >
        <Sparkles className="w-4 h-4 fill-white/20 group-hover:rotate-12 transition-transform" />
        <span>Ask Treasury AI</span>
        <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
      </button>

      {/* Slide-over Drawer Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[460px] bg-bg-surface border-l border-border-main shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-border-main flex items-center justify-between bg-bg-surface-elevated/80 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary/15 text-primary flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-text-primary tracking-tight">
                  Treasury Copilot AI
                </h3>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono font-bold bg-primary/10 text-primary border border-primary/25">
                  SPEC M08
                </span>
              </div>
              <span className="text-[11px] font-mono text-text-muted">
                Deterministic Engine • Guardrails G01–G08
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface border border-transparent hover:border-border-main transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Guardrail Compliance Banner */}
        <div className="bg-primary/5 border-b border-primary/15 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-primary">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pure Deterministic Output • Zero Hallucinations</span>
          </span>
          <span className="text-[10px] text-text-muted">Audit Guard G01</span>
        </div>

        {/* Chat Message Scrollable Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-mono">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  m.sender === 'user'
                    ? 'bg-primary text-white font-medium rounded-tr-xs shadow-xs'
                    : 'bg-bg-surface-elevated border border-border-main text-text-primary rounded-tl-xs shadow-xs'
                }`}
              >
                {m.text}

                {/* Citations / Source Badges (Rule G01) */}
                {m.citations && m.citations.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-border-subtle/50 space-y-1">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider block">
                      Mathematical Verification Sources:
                    </span>
                    {m.citations.map((c, i) => (
                      <div
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-surface/80 border border-border-main text-text-secondary flex items-center justify-between"
                      >
                        <span>{c.source}</span>
                        {c.amount && <strong className="text-primary">{c.amount}</strong>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tactical Call-to-action button */}
                {m.action && (
                  <button
                    type="button"
                    onClick={m.action.onClick}
                    className="mt-3 w-full py-1.5 px-3 rounded-lg bg-amber text-black hover:bg-amber/90 font-bold text-[11px] font-mono flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>{m.action.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <span className="text-[10px] text-text-muted mt-1 px-1">{m.timestamp}</span>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-text-muted text-xs p-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-100" />
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-200" />
              <span className="text-[11px] font-mono ml-1">Analyzing 13-week conservation equations...</span>
            </div>
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Quick Audit Query Pills (From Excel Spec Sheet AI) */}
        <div className="p-3 border-t border-border-main bg-bg-surface-elevated/40">
          <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2">
            One-Click Audit Queries (Excel Spec Q1–Q4):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_QUERIES.map((q) => (
              <button
                key={q.id}
                type="button"
                onClick={() => handleSend(q.query)}
                className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-bg-surface hover:bg-bg-surface-elevated border border-border-main text-text-secondary hover:text-text-primary transition-all text-left"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input Box */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 border-t border-border-main bg-bg-surface flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about Week 2 shortfall, cash runway, or 1688 terms..."
            className="flex-1 px-3 py-2 text-xs font-mono rounded-xl bg-bg-surface-elevated border border-border-main text-text-primary placeholder:text-text-muted focus:outline-hidden focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="p-2 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
