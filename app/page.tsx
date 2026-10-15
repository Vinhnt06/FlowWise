import { ViewTransition } from 'react';
import SiteNav from '@/components/landing/SiteNav';
import Hero from '@/components/landing/Hero';
import Showcase from '@/components/landing/Showcase';
import HowItWorks from '@/components/landing/HowItWorks';
import TryFix from '@/components/landing/TryFix';
import Currencies from '@/components/landing/Currencies';
import FileList from '@/components/landing/FileList';
import Promises from '@/components/landing/Promises';
import Cta from '@/components/landing/Cta';
import SiteFooter from '@/components/landing/SiteFooter';

export default function Home() {
  return (
    <ViewTransition
      default="none"
      enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
    >
      <div className="min-h-[100dvh] bg-bg-base text-text-primary">
        <SiteNav />
        <main>
          <Hero />
          <Showcase />
          <HowItWorks />
          <TryFix />
          <Currencies />
          <FileList />
          <Promises />
          <Cta />
        </main>
        <SiteFooter />
      </div>
    </ViewTransition>
  );
}
