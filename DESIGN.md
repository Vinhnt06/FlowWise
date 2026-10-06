---
name: FlowWise Design System (Institutional Fintech Edition)
version: 2.0.0
description: High-trust, dual-mode (Light/Dark) institutional fintech design specification inspired by Stripe Treasury and Mercury Banking. Eliminates AI clichés (no fuzzy neon blobs), delivers crisp financial density, sharp 1px borders, and pure tabular typography.
themes:
  light:
    background: "#F8FAFC"
    surface: "#FFFFFF"
    surface-elevated: "#F1F5F9"
    surface-overlay: "#E2E8F0"
    border: "#E2E8F0"
    border-subtle: "#F1F5F9"
    border-strong: "#CBD5E1"
    text-primary: "#0F172A"
    text-secondary: "#475569"
    text-muted: "#94A3B8"
    primary: "#059669"
    primary-hover: "#047857"
    primary-surface: "#ECFDF5"
    crimson: "#DC2626"
    amber: "#D97706"
    vnd: "#059669"
    cny: "#EA580C"
    usd: "#2563EB"
  dark:
    background: "#0B0F17"
    surface: "#111827"
    surface-elevated: "#1A2234"
    surface-overlay: "#232D42"
    border: "#1E293B"
    border-subtle: "#162032"
    border-strong: "#334155"
    text-primary: "#F8FAFC"
    text-secondary: "#94A3B8"
    text-muted: "#64748B"
    primary: "#10B981"
    primary-hover: "#34D399"
    primary-surface: "rgba(16, 185, 129, 0.12)"
    crimson: "#EF4444"
    amber: "#F59E0B"
    vnd: "#10B981"
    cny: "#F97316"
    usd: "#38BDF8"
typography:
  display:
    fontFamily: Geist Sans
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.03em
  h1:
    fontFamily: Geist Sans
    fontSize: 42px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.025em
  h2:
    fontFamily: Geist Sans
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.02em
  h3:
    fontFamily: Geist Sans
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
  body-md:
    fontFamily: Geist Sans
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  mono-number:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: 600
    fontFeatureSettings: "'tnum' on, 'zero' on"
rounded:
  sm: 6px
  md: 10px
  lg: 14px
  xl: 20px
  full: 9999px
---

# FlowWise Design Specification: Institutional Fintech

## Rationale
Transitioning from generic AI tropes (neon glow blobs, dark-only murky backgrounds, flashy gaming borders) to a high-trust, tier-1 institutional fintech experience (Stripe Treasury / Mercury).

### Core Directives:
1. **Dual Theme (Light & Dark)**: Light mode is crisp, off-white, authoritative with surgical 1px borders and layered white cards. Dark mode is deep obsidian slate (not pitch black) with high-contrast data readouts.
2. **Zero Neon Blobs**: Absolutely no giant `blur-[150px]` colored blobs. Visual interest is established through technical hairline grids, precise metric cards, and tabular financial alignments.
3. **Tabular Numerics**: All financial figures use `font-mono tabular-nums` for precision alignment across ledgers.
4. **Currency Isolation**: VND, CNY, and USD retain strict semantic colors across both themes without arithmetic cross-blending.
