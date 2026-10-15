import { WORKED_EXAMPLE_EVENTS, forecastWorkedExample } from '@/data/worked-example';
import { CashEvent } from '@/types/finance';
import { trace } from '@/content/landing';
import { vnd, vndSigned } from '@/lib/format';

const baseline = forecastWorkedExample(WORKED_EXAMPLE_EVENTS);
const week = baseline.weeks[1];
const inWeek = (e: CashEvent) => e.date >= week.startDate && e.date <= week.endDate;

const FILES: { name: string; type: CashEvent['type'] }[] = [
  { name: 'shopee-settlement.xlsx', type: 'settlement' },
  { name: 'bills.csv', type: 'payable' },
  { name: 'regular-costs.csv', type: 'recurring' },
];
const FILE_OF = Object.fromEntries(FILES.map((f) => [f.type, f.name]));

const weekItems = WORKED_EXAMPLE_EVENTS.filter(inWeek).sort((a, b) => a.date.localeCompare(b.date));

const day = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

/**
 * Every number has a source — week 2's closing balance taken apart into the dated items
 * that make it, and each item shown in the file it was read from.
 */
export default function Trace() {
  return (
    <section id="source" aria-label={trace.heading} className="mx-auto max-w-[1440px] px-4 py-28 sm:px-10 lg:pb-40 lg:pt-24">
      <div className="grid gap-x-6 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2
            className="font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary"
            data-rise
          >
            {trace.heading}
          </h2>
          <p className="mt-5 max-w-[48ch] text-[18px] leading-[1.6] text-text-primary" data-rise="2">
            {trace.statement}
          </p>

          <div data-ui className="mt-12 max-w-[640px]">
            <dl>
              <div className="flex items-baseline justify-between gap-6 py-3" data-rise>
                <dt className="text-[16px] text-text-secondary">{trace.openingLabel}</dt>
                <dd className="num whitespace-nowrap text-[17px] tabular-nums text-text-primary sm:text-[24px]">{vnd(week.openingBalance)}</dd>
              </div>
              {weekItems.map((e, i) => (
                <div key={e.id} className="flex items-baseline justify-between gap-6 py-3" data-rise={String(Math.min(4, i + 2))}>
                  <dt>
                    <span className="block text-[16px] text-text-primary">{e.description}</span>
                    <span className="text-[13px] text-text-muted">
                      {e.id} · {day(e.date)} · {FILE_OF[e.type]}
                    </span>
                  </dt>
                  <dd className={`num whitespace-nowrap text-[17px] tabular-nums sm:text-[24px] ${e.amount > 0 ? 'text-positive' : 'text-text-primary'}`}>
                    {vndSigned(e.amount)}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-2 h-[3px] bg-navy" data-draw aria-hidden />
            <div className="flex items-baseline justify-between gap-6 pt-4" data-rise="3">
              <p className="text-[16px] font-semibold text-text-primary">{trace.totalLabel}</p>
              <p className="num whitespace-nowrap text-[clamp(22px,3.2vw,44px)] font-semibold tabular-nums text-amber-ink">
                {vnd(week.closingBalance)}
              </p>
            </div>
          </div>

          <p className="mt-10 max-w-[52ch] text-[16px] leading-[1.6] text-text-secondary" data-rise="4">
            {trace.checked}
          </p>
        </div>

        <div className="flex flex-col gap-5 lg:col-span-5 lg:pt-6">
          {FILES.map((file, i) => {
            const rows = WORKED_EXAMPLE_EVENTS.filter((e) => e.type === file.type).slice(0, 4);
            return (
              <div
                key={file.name}
                data-rise={String(i + 2)}
                data-ui className={`rounded-lg bg-bg-surface p-4 text-[13px] shadow-md ${i === 1 ? 'lg:ml-10' : i === 2 ? 'lg:ml-20' : ''}`}
              >
                <p className="mb-2 text-[14px] font-semibold text-text-primary">{file.name}</p>
                <table className="w-full text-left">
                  <tbody className="rows">
                    {rows.map((e) => {
                      const hit = inWeek(e);
                      return (
                        <tr key={e.id} className={hit ? 'bg-primary-surface' : ''}>
                          <td className={`py-1.5 pl-2 ${hit ? 'font-semibold text-text-primary' : 'text-text-muted'}`}>{e.id}</td>
                          <td className={`py-1.5 ${hit ? 'text-text-primary' : 'text-text-muted'}`}>{day(e.date)}</td>
                          <td className={`num py-1.5 pr-2 text-right tabular-nums ${hit ? 'font-semibold text-text-primary' : 'text-text-muted'}`}>
                            {vndSigned(e.amount)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
