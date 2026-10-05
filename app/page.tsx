import React from 'react';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
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
    <div className="min-h-screen bg-[#0a0a0f] text-[#f1f2f6] selection:bg-[#00d4aa] selection:text-black">
      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Main Narrative Structure (8 Canonical Sections) */}
      <main>
        {/* Section 1: Hero with Live Balance Card & Sparklines */}
        <HeroSection />

        {/* Section 2: Trust Bar & Market Metrics */}
        <TrustBar />

        {/* Section 3: Problem Statement (Doanh số ≠ Tiền) & Cash Gap */}
        <ProblemSection />

        {/* Section 4: 5 Core Capabilities Bento Grid */}
        <FeaturesBento />

        {/* Section 5: 13-Week Forecast Interactive Preview */}
        <ForecastPreviewSection />

        {/* Section 6: 3-Currency Isolation (VND, CNY, USD) */}
        <CurrenciesSection />

        {/* Section 7: 3-Step Workflow Automation */}
        <HowItWorksSection />

        {/* Section 8: Final Call To Action */}
        <CtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
