import Link from 'next/link';
import { hero } from '@/content/landing';
import ForecastFragment from './ForecastFragment';

/**
 * Hero — "Fragment on a shaped stage": the headline upper-left, and the working
 * forecast on a flat sage stage that bleeds off the right and bottom edges.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-0">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-6 px-4 pt-20 sm:px-10 lg:pt-28">
        <div className="col-span-12 lg:col-span-6">
          <h1 className="font-display text-[clamp(44px,5.2vw,80px)] font-bold leading-[1.02] tracking-[-0.035em] text-text-primary">
            {hero.lines.map((line) => (
              <span key={line} className="hero-line block">
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-line mt-6 max-w-[40ch] text-[18px] leading-[1.6] text-text-primary">{hero.sentence}</p>
          <div className="hero-line mt-8">
            <Link
              href="/dashboard"
              transitionTypes={['nav-forward']}
              className="press inline-flex h-12 items-center rounded-lg bg-navy px-7 text-[16px] font-semibold text-on-navy hover:bg-navy-hover"
            >
              {hero.action}
            </Link>
          </div>
        </div>
      </div>

      <div className="shutter relative mt-14 lg:-mt-24 lg:ml-[calc(33.333%+24px)]">
        <div
          className="origin-bottom-right bg-primary pl-4 pt-4 sm:pl-14 sm:pt-14"
          style={{ clipPath: 'polygon(72px 0, 100% 0, 100% 100%, 0 100%, 0 72px)' }}
        >
          <div className="max-h-[600px] overflow-hidden">
            <ForecastFragment />
          </div>
        </div>
      </div>
    </section>
  );
}
