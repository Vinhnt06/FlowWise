import Link from 'next/link';
import { footer, nav } from '@/content/landing';
import credits from '@/public/images/world/credits.json';

/**
 * Footer — "A footer of tiles": filled tiles, every cell used, the name returning at full width.
 */
export default function SiteFooter() {
  return (
    <footer className="grid grid-cols-2 gap-1.5 p-2 lg:grid-cols-12 lg:gap-2 lg:p-3">
      <div className="col-span-2 flex flex-col justify-between gap-8 rounded-lg bg-bg-surface-elevated p-5 lg:col-span-4 lg:min-h-[220px]">
        <p className="text-[18px] leading-[1.5] text-text-primary">{footer.statement}</p>
        <p className="text-[13px] text-text-secondary">{footer.legal}</p>
      </div>

      <nav aria-label={footer.navHeading} className="rounded-lg bg-bg-surface-elevated p-5 lg:col-span-3">
        <p className="text-[13px] text-text-secondary">{footer.navHeading}</p>
        <ul className="mt-3 space-y-2">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="link-under text-[16px] text-text-primary">{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="rounded-lg bg-bg-surface-elevated p-5 lg:col-span-5">
        <p className="text-[13px] text-text-secondary">{footer.creditsHeading}</p>
        <ul className="mt-3 space-y-2 text-[13px] leading-[1.5] text-text-primary">
          {credits.map((c) => (
            <li key={c.file}>
              <a href={c.page} className="link-under underline-offset-2">“{c.title}”</a> by {c.creator},{' '}
              <a href={c.licenseUrl} className="link-under">{c.license}</a>, via {c.via}
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2 flex min-h-[160px] items-center justify-center overflow-hidden rounded-lg bg-[var(--field)] lg:col-span-8 lg:min-h-[320px]">
        <span className="font-display text-[clamp(64px,9vw,148px)] font-bold leading-[1.1] tracking-[-0.04em] text-white">
          FlowWise
        </span>
      </div>

      <Link
        href="/dashboard"
        transitionTypes={['nav-forward']}
        className="press group col-span-2 flex min-h-[160px] flex-col justify-between rounded-lg bg-primary p-5 text-primary-text hover:bg-primary-hover lg:col-span-4 lg:min-h-[320px]"
      >
        <span className="font-display text-[24px] font-semibold leading-[1.2]">{footer.invitation}</span>
        <svg
          aria-hidden
          viewBox="0 0 48 48"
          className="ml-auto h-12 w-12 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path d="M6 24h34M28 12l12 12-12 12" />
        </svg>
      </Link>
    </footer>
  );
}
