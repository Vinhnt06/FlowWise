import { CheckCircle2 } from 'lucide-react';
import { WORKED_EXAMPLE_BUFFER, WORKED_EXAMPLE_EVENTS, forecastWorkedExample } from '@/data/worked-example';
import { promises } from '@/content/landing';
import { vnd, weekRange } from '@/lib/format';

const week2 = forecastWorkedExample(WORKED_EXAMPLE_EVENTS).weeks[1];

/**
 * What it will not do — the product's limits stated plainly, next to the check that holds the
 * assistant to them: every number in a draft answer is looked up in the calculation first.
 */
export default function Promises() {
  const c = promises.check;
  const found = [
    { value: vnd(week2.closingBalance), source: c.sources.closing },
    { value: vnd(week2.deficitAmount), source: c.sources.gap },
    { value: vnd(WORKED_EXAMPLE_BUFFER), source: c.sources.buffer },
  ];

  return (
    <section aria-label={promises.heading} className="grid bg-[var(--field)] lg:grid-cols-12">
      <div className="flex items-center px-4 pt-20 sm:px-10 lg:col-span-6 lg:py-32">
        <div data-ui className="w-full max-w-[520px] rounded-lg bg-bg-surface p-6 text-[14px] text-text-primary shadow-lg" data-rise>
          <div className="flex items-start justify-between gap-4">
            <p className="font-display text-[15px] font-semibold">{c.title}</p>
            <span className="rounded-sm bg-amber-surface px-2 py-0.5 text-[13px] font-medium text-amber-ink">{c.sample}</span>
          </div>
          <p className="ml-8 mt-4 rounded-lg bg-bg-surface-elevated p-3">{c.question}</p>
          <p className="mt-3 rounded-lg border border-border-main p-3 leading-[1.55]">
            Week 2 ({weekRange(week2.startDate, week2.endDate)}) closes at{' '}
            <mark className="rounded-sm bg-primary-surface px-1 text-text-primary">{vnd(week2.closingBalance)}</mark>, which is{' '}
            <mark className="rounded-sm bg-primary-surface px-1 text-text-primary">{vnd(week2.deficitAmount)}</mark> under your safety level of{' '}
            <mark className="rounded-sm bg-primary-surface px-1 text-text-primary">{vnd(WORKED_EXAMPLE_BUFFER)}</mark>.
          </p>
          <p className="mb-1 mt-5 text-[13px] font-semibold">{c.found}</p>
          <ul className="rows">
            {found.map((f) => (
              <li key={f.source} className="flex items-center justify-between gap-4 py-2">
                <span className="flex items-center gap-2 text-text-secondary">
                  <CheckCircle2 className="h-4 w-4 text-positive" aria-hidden />
                  {f.source}
                </span>
                <span className="num tabular-nums">{f.value}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 rounded-lg bg-primary-surface px-3 py-2.5 text-positive">{c.verdict}</p>
        </div>
      </div>
      <div className="flex flex-col justify-center px-4 py-20 sm:px-10 lg:col-span-6 lg:py-32">
        <h2 className="font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-white" data-rise>
          {promises.heading}
        </h2>
        <ul className="mt-12 space-y-8">
          {promises.items.map((item, i) => (
            <li key={item} className="max-w-[30ch] text-[24px] leading-[1.35] text-white" data-rise={String(Math.min(4, i + 1))}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
