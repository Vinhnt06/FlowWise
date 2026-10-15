import Image from 'next/image';
import { currencies } from '@/content/landing';
import LoopVideo from './LoopVideo';

const SWATCH: Record<string, string> = { VND: 'bg-vnd', CNY: 'bg-cny', USD: 'bg-usd' };

/**
 * Three currencies — one large picture and two stacked, each naming where that money lives.
 */
export default function Currencies() {
  const [main, ...rest] = currencies.items;

  return (
    <section aria-label={currencies.heading} className="mx-auto max-w-[1440px] px-4 py-28 sm:px-10 lg:py-40">
      <div className="grid gap-x-6 lg:grid-cols-12">
        <h2
          className="font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary lg:col-span-7"
          data-rise
        >
          {currencies.heading}
        </h2>
        <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.6] text-text-primary lg:col-span-5 lg:mt-3" data-rise="2">
          {currencies.statement}
        </p>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-12">
        <figure className="lg:col-span-7" data-rise>
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-[720px]">
            {'video' in main && main.video ? (
              <>
                <LoopVideo src={main.video} poster={main.image} className="drift absolute inset-0 h-full w-full object-cover" />
                <span className="sr-only">{main.alt}</span>
              </>
            ) : (
              <Image src={main.image} alt={main.alt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="drift object-cover" />
            )}
          </div>
          <Caption {...main} />
        </figure>
        <div className="grid gap-6 lg:col-span-5">
          {rest.map((item, i) => (
            <figure key={item.code} data-rise={String(i + 2)}>
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-[300px]">
                <Image src={item.image} alt={item.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <Caption {...item} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Caption({ code, role, detail }: { code: string; role: string; detail: string }) {
  return (
    <figcaption className="mt-4 flex items-start gap-3">
      <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${SWATCH[code]}`} aria-hidden />
      <span>
        <span className="font-display text-[24px] font-semibold text-text-primary">
          {code} · {role}
        </span>
        <span className="block text-[16px] leading-[1.5] text-text-secondary">{detail}</span>
      </span>
    </figcaption>
  );
}
