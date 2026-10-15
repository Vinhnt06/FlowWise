import Link from 'next/link';
import { FileText } from 'lucide-react';
import { shiftEventDate } from '@/lib/finance-engine';
import {
  WORKED_EXAMPLE_AS_OF,
  WORKED_EXAMPLE_DEFER_DAYS,
  WORKED_EXAMPLE_DEFER_ID,
  WORKED_EXAMPLE_EVENTS,
  forecastWorkedExample,
} from '@/data/worked-example';
import { cta } from '@/content/landing';
import { vnd } from '@/lib/format';
import WeekBars from './WeekBarsStatic';

const plan = forecastWorkedExample(
  shiftEventDate(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, WORKED_EXAMPLE_DEFER_DAYS)
);
const asOf = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
  new Date(`${WORKED_EXAMPLE_AS_OF}T00:00:00Z`)
);

/**
 * The close — the invitation on the left, the page the visitor leaves with on the right:
 * the approved plan as it prints, made from the same calculation.
 */
export default function Cta() {
  const r = cta.report;
  const rows: [string, string][] = [
    [r.rows.asOf, asOf],
    [r.rows.plan, r.rows.planValue],
    [r.rows.lowest, vnd(plan.lowestBalance)],
    [r.rows.weeksBelow, String(plan.breachWeeksCount)],
    [r.rows.assumed, r.rows.assumedValue],
  ];

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

      <div className="bg-bg-surface-elevated p-4 sm:p-10 lg:col-span-6" data-rise="3">
        <div data-ui className="mx-auto max-w-[480px] rotate-[-1.2deg] rounded-lg bg-bg-surface p-6 text-[14px] text-text-primary shadow-lg">
          <div className="flex items-start justify-between gap-4">
            <p className="font-display text-[15px] font-semibold">{r.title}</p>
            <span className="flex items-center gap-1 rounded-sm bg-bg-surface-elevated px-2 py-0.5 text-[13px] text-text-secondary">
              <FileText className="h-3.5 w-3.5" aria-hidden /> {r.file}
            </span>
          </div>
          <div className="mt-4">
            <WeekBars weeks={plan.weeks} buffer={plan.safeBuffer} max={400_000_000} height={90} />
          </div>
          <dl className="rows mt-4">
            {rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="text-text-secondary">{k}</dt>
                <dd className="num text-right tabular-nums">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 inline-flex h-10 items-center rounded-lg bg-navy px-4 font-semibold text-on-navy">{r.approve}</p>
          <p className="mt-2 text-[13px] text-text-secondary">{r.note}</p>
        </div>
      </div>
    </section>
  );
}
