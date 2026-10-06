import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FintechLiveTicker from '@/components/landing/FintechLiveTicker';
import TrustBar from '@/components/landing/TrustBar';
import ProblemSection from '@/components/landing/ProblemSection';
import FeaturesBento from '@/components/landing/FeaturesBento';
import ForecastPreviewSection from '@/components/landing/ForecastPreviewSection';
import CurrenciesSection from '@/components/landing/CurrenciesSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import CtaSection from '@/components/landing/CtaSection';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base text-text-primary transition-colors duration-200 selection:bg-emerald-500 selection:text-white">
      {/* Top Sticky Navigation with Integrated Theme Toggle */}
      <Navbar />

      {/* Main Narrative Structure (8 Canonical Sections) */}
      <main>
        {/* Section 1: Hero with Technical Grid & Scrubber Terminal */}
        <HeroSection />

        {/* Live Financial Telemetry & Cross-Border Exchange Ticker */}
        <FintechLiveTicker />

        {/* Section 2: Institutional Trust Rail & Platform APIs */}
        <TrustBar />

        {/* Section 3: Problem Statement (The Cash Gap Advisory) */}
        <ProblemSection />

        {/* Section 4: 5 Core Capabilities Bento Grid */}
        <FeaturesBento />

        {/* Section 5: 13-Week Forecast Interactive Precision Terminal */}
        <ForecastPreviewSection />

        {/* Section 6: 3-Currency Ledger Isolation (VND, CNY, USD) */}
        <CurrenciesSection />

        {/* Section 7: 3-Stage Deterministic Pipeline */}
        <HowItWorksSection />

        {/* Section 8: Final Enterprise Call To Action */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
