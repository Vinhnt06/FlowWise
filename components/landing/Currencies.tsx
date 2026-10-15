import { CurrencyForecastSummary } from '@/types/finance';
import { WORKED_EXAMPLE_EVENTS, forecastWorkedExample } from '@/data/worked-example';
import { CNY_SUMMARY, USD_SUMMARY } from '@/data/shopx-dataset';
import { currencies } from '@/content/landing';
import { money } from '@/lib/format';
import WeekRibbon from './WeekRibbon';

/** VND is the page's worked example; CNY and USD come from the simulated ShopX dataset. */
const SUMMARIES: Record<string, CurrencyForecastSummary> = {
  VND: forecastWorkedExample(WORKED_EXAMPLE_EVENTS),
  CNY: CNY_SUMMARY,
  USD: USD_SUMMARY,
};

const SWATCH: Record<string, string> = { VND: 'bg-vnd', CNY: 'bg-cny', USD: 'bg-usd' };

/**
 * Three currencies — one ledger, one row per currency, and a total row that is
 * deliberately left empty: the product never converts or adds them.
 */
export default function Currencies() {
  const t = currencies.table;
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

      <div data-ui className="mt-16 rounded-lg bg-bg-surface p-5 text-[14px] text-text-primary shadow-lg sm:p-8" data-rise="3">
        <div className="flex items-start justify-between gap-4">
          <p className="font-display text-[15px] font-semibold">{t.title}</p>
          <span className="rounded-sm bg-amber-surface px-2 py-0.5 text-[13px] font-medium text-amber-ink">{t.sample}</span>
        </div>

        <ul className="rows mt-4">
          {currencies.items.map((item) => {
            const s = SUMMARIES[item.code];
            const code = item.code as 'VND' | 'CNY' | 'USD';
            return (
              <li key={code} className="grid items-center gap-x-6 gap-y-3 py-5 lg:grid-cols-[minmax(0,1.3fr)_repeat(3,minmax(0,1fr))_minmax(0,1.6fr)]">
                <div className="flex items-start gap-3">
                  <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${SWATCH[code]}`} aria-hidden />
                  <span>
                    <span className="block font-display text-[24px] font-semibold leading-[1.15]">
                      {code} · {item.role}
                    </span>
                    <span className="text-[13px] text-text-secondary">{item.detail}</span>
                  </span>
                </div>
                <dl className="contents">
                  <div className="flex justify-between gap-4 lg:block">
                    <dt className="text-[13px] text-text-muted">{t.columns.now}</dt>
                    <dd className="num font-semibold tabular-nums">{money(s.currentBalance, code)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 lg:block">
                    <dt className="text-[13px] text-text-muted">{t.columns.safety}</dt>
                    <dd className="num tabular-nums">{money(s.safeBuffer, code)}</dd>
                  </div>
                  <div className="flex justify-between gap-4 lg:block">
                    <dt className="text-[13px] text-text-muted">{t.columns.lowest}</dt>
                    <dd className={`num tabular-nums ${s.lowestBalance < s.safeBuffer ? 'font-semibold text-amber-ink' : ''}`}>
                      {money(s.lowestBalance, code)} · W{s.lowestWeek}
                    </dd>
                  </div>
                </dl>
                <WeekRibbon weeks={s.weeks} buffer={s.safeBuffer} label={`${code} ${t.columns.weeks}`} />
              </li>
            );
          })}
          <li className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5">
            <span className="font-display text-[24px] font-semibold text-text-secondary">{t.total}</span>
            <span className="text-[13px] text-text-secondary">{t.totalNote}</span>
            <span className="num text-[24px] font-semibold text-text-muted">{t.totalValue}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
