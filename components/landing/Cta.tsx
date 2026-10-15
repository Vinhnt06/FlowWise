import Image from 'next/image';
import Link from 'next/link';
import { cta } from '@/content/landing';

export default function Cta() {
  return (
    <section aria-label={cta.action} className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-32 sm:px-10 lg:grid-cols-12 lg:gap-6 lg:py-44">
      <div className="lg:col-span-6">
        <h2
          className="font-display text-[clamp(44px,5.2vw,80px)] font-bold leading-[1.02] tracking-[-0.035em] text-text-primary"
          data-rise
        >
          {cta.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8" data-rise="2">
          <Link
            href="/dashboard"
            transitionTypes={['nav-forward']}
            className="press inline-flex h-12 w-fit items-center rounded-lg bg-navy px-7 text-[16px] font-semibold text-on-navy hover:bg-navy-hover"
          >
            {cta.action}
          </Link>
          <p className="max-w-[36ch] text-[16px] text-text-secondary">{cta.note}</p>
        </div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden lg:col-span-6" data-rise="3">
        <Image src={cta.image.src} alt={cta.image.alt} fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover object-[50%_20%]" />
      </div>
    </section>
  );
}
