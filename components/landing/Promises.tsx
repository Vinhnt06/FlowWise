import Image from 'next/image';
import { promises } from '@/content/landing';

/**
 * What it will not do — the product's limits, stated plainly next to one picture of the money itself.
 */
export default function Promises() {
  return (
    <section aria-label={promises.heading} className="grid bg-[var(--field)] lg:grid-cols-12">
      <div className="relative aspect-[3/4] overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[100svh]">
        <Image
          src={promises.image.src}
          alt={promises.image.alt}
          fill
          sizes="(min-width: 1024px) 42vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-4 py-20 sm:px-10 lg:col-span-6 lg:col-start-7 lg:py-32">
        <h2 className="font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-white" data-rise>
          {promises.heading}
        </h2>
        <ul className="mt-12 space-y-8">
          {promises.items.map((item, i) => (
            <li
              key={item}
              className="max-w-[30ch] text-[24px] leading-[1.35] text-white"
              data-rise={String(Math.min(4, i + 1))}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
