---
name: FlowWise Design System
version: 1.0.0
description: Anti-slop, high-precision dark fintech visual specification for FlowWise multi-currency cashflow intelligence platform.
colors:
  background: "#0A0A0F"
  surface: "#111118"
  surface-elevated: "#161622"
  surface-overlay: "#1C1C2B"
  border: "#232336"
  border-subtle: "#191928"
  primary: "#00D4AA"
  primary-glow: "rgba(0, 212, 170, 0.25)"
  crimson: "#FF4757"
  amber: "#FFAA00"
  vnd: "#00D4AA"
  cny: "#FF6B35"
  usd: "#4D9FFF"
  text-primary: "#F1F2F6"
  text-secondary: "#A1A1BA"
  text-muted: "#6E6E87"
typography:
  display:
    fontFamily: Geist
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -0.03em
  h1:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.025em
  h2:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.02em
  h3:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
  body-md:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
  body-sm:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.4
  mono-number:
    fontFamily: Geist Mono
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.2
rounded:
  xs: 3px
  sm: 6px
  md: 10px
  lg: 14px
  xl: 20px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
components:
  card-glass:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
  btn-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#0A0A0F"
    rounded: "{rounded.full}"
    fontWeight: 600
  badge-simulated:
    backgroundColor: "#FACC15"
    textColor: "#000000"
    rounded: "{rounded.full}"
    fontWeight: 700
---

# FlowWise Design Specification

## Overview
FlowWise is a high-precision, mission-critical multi-currency cashflow intelligence platform built specifically for Vietnamese cross-border e-commerce sellers. The design tone is **"Bloomberg-meets-Linear"** — deeply dark, hyper-crisp, Swiss grid structure, high typographic tension, and zero AI-slop purple gradients.

## Colors
- **Canvas (`#0A0A0F`):** Deep Obsidian void foundation. Prevents visual fatigue during dense tabular audits.
- **Surface (`#111118`):** High-density dark glass container level.
- **Electric Emerald (`#00D4AA`):** Primary action color, safe liquidity status, and VND operating cashflow.
- **Signal Coral (`#FF6B35`):** Chinese Yuan (CNY) supplier payable isolation.
- **Cobalt Electric (`#4D9FFF`):** US Dollar (USD) cross-border logistics & international ad reserve.
- **Crimson Alert (`#FF4757`):** Marketplace escrow deductions, refund penalties, and cashflow breach warnings.
- **Amber Warning (`#FFAA00`):** Buffer deficit threshold indicators.

## Typography
- **Headings & Display:** `Geist Sans` with aggressive negative letter-spacing (`-0.03em`) for authoritative editorial presence.
- **Tabular & Metrics:** `Geist Mono` for all currency numbers, percentages, dates, and order serial numbers ensuring strict column alignment.

## Layout
- Rigid 12-column Swiss grid with asymmetric tension.
- Section vertical rhythm: minimum 96px (`6rem`) between major narrative blocks.
- Container maximum width: 1240px for content; 1400px for data cockpits.

## Elevation & Depth
- Flat high-contrast borders (`1px solid #232336`) rather than blurry diffuse shadows.
- Ambient glow restricted to active currency focus cards and primary action buttons.
- Layering achieved through contrast differences (`#0A0A0F` canvas -> `#111118` card -> `#161622` inner panel).

## Shapes
- Buttons and status pills: full pill geometry (`rounded-full`).
- Dashboard cards and bento containers: structured sharp-rounded corners (`rounded-xl` / `16px`).
- Data table cells and inputs: crisp minimal radius (`rounded-md` / `8px`).

## Components
- **Top Navigation Bar:** Sticky frosted obsidian glass with live route indicator and quick demo launcher.
- **Currency Isolation Trio:** 3 distinct cards representing VND, CNY, and USD. No aggregate conversion card allowed.
- **13-Week Interactive Chart:** Luminous gradient stroke area chart with red dashed minimum buffer threshold.
- **Simulation Lever Sliders:** Tactile glowing sliders with real-time numeric delta pills.
- **Simulated Data Header:** Persistent high-contrast warning banner: `SIMULATED DATA — FOR DEMO PURPOSES`.

## Do's and Don'ts
- **DO** maintain strict currency isolation at all times.
- **DO** label all mock data clearly as simulated.
- **DO** use Geist Mono for all financial figures.
- **DON'T** use purple gradients or AI-style violet mesh blobs.
- **DON'T** create 50/50 generic text-on-left image-on-right split layouts.
- **DON'T** convert VND to CNY or USD in any UI component.
