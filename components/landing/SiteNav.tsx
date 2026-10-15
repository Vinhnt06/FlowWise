import Link from 'next/link';
import { nav } from '@/content/landing';
import ThemeToggle from '@/components/common/ThemeToggle';

/**
 * A plain bar: wordmark, four links, theme switch, one action.
 */
export default function SiteNav() {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-6 px-4 pt-7 sm:px-10">
      <Link href="/" className="font-display text-[24px] font-bold tracking-[-0.02em] text-text-primary">
        FlowWise
      </Link>
      <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
        {nav.links.map((link) => (
          <a key={link.href} href={link.href} className="link-under text-[16px] text-text-primary">
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Link
          href="/dashboard"
          transitionTypes={['nav-forward']}
          className="press inline-flex h-10 items-center rounded-lg bg-navy px-4 text-[16px] font-semibold text-on-navy hover:bg-navy-hover"
        >
          {nav.action}
        </Link>
      </div>
    </header>
  );
}
