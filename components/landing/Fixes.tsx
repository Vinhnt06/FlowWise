'use client';

import { useMemo, useState } from 'react';
import {
  WORKED_EXAMPLE_AS_OF,
  WORKED_EXAMPLE_BUFFER,
  WORKED_EXAMPLE_DEFER_ID,
  WORKED_EXAMPLE_EVENTS,
  forecastWorkedExample,
} from '@/data/worked-example';
import { delayBill, owedAfter, simulateLoan } from '@/lib/scenarios';
import { fixes } from '@/content/landing';
import { vnd } from '@/lib/format';
import WeekRibbon from './WeekRibbon';

const baseline = forecastWorkedExample(WORKED_EXAMPLE_EVENTS);
const LAST_DAY = baseline.weeks[12].endDate;
/** Loan money arrives on the first day of week 2, before the bill that causes the gap. */
const DISBURSE = baseline.weeks[1].startDate;

type FixId = 'delay' | 'early' | 'loan';

function Slider({
  id, label, value, min, max, step, display, onChange,
}: {
  id: string; label: string; value: number; min: number; max: number; step: number; display: string; onChange: (v: number) => void;
}) {
  return (
    <div className="mt-4">
      <div className="flex items-baseline justify-between gap-4 text-[15px]">
        <label htmlFor={id} className="text-text-secondary">{label}</label>
        <output htmlFor={id} className="num font-semibold tabular-nums text-text-primary">{display}</output>
      </div>
      <input
        id={id} type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="fw-range mt-1"
        style={{ ['--fill' as string]: `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
  );
}

function Result({ label, value, tone }: { label: string; value: string; tone?: 'warn' | 'good' }) {
  return (
    <div className="rounded-lg bg-bg-surface-elevated p-3">
      <dt className="text-[13px] text-text-secondary">{label}</dt>
      <dd className={`num mt-1 text-[15px] font-semibold tabular-nums ${tone === 'warn' ? 'text-amber-ink' : tone === 'good' ? 'text-positive' : 'text-text-primary'}`}>
        {value}
      </dd>
    </div>
  );
}

/**
 * Three ways to close the gap — "Pick one, compare all": the fix names sit large on a sage
 * field, the chosen fix opens its controls in one panel, and a table compares all three.
 */
export default function Fixes() {
  const copy = fixes;
  const [active, setActive] = useState<FixId>('delay');
  const [days, setDays] = useState(14);
  const [invoice, setInvoice] = useState(100_000_000);
  const [discount, setDiscount] = useState(2);
  const [loanAmount, setLoanAmount] = useState(20_000_000);
  const [loanWeeks, setLoanWeeks] = useState(8);
  const [rate, setRate] = useState(12);

  const delayed = useMemo(() => {
    const s = delayBill(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, days, WORKED_EXAMPLE_AS_OF);
    return { ...s, forecast: forecastWorkedExample(s.events) };
  }, [days]);

  const loan = useMemo(() => {
    const s = simulateLoan({
      amount: loanAmount, annualRate: rate / 100, weeks: loanWeeks, disburseDate: DISBURSE, currency: 'VND',
    });
    return { ...s, forecast: forecastWorkedExample([...WORKED_EXAMPLE_EVENTS, ...s.events]), after: owedAfter(s.events, LAST_DAY) };
  }, [loanAmount, loanWeeks, rate]);

  const early = { cost: Math.round(invoice * (discount / 100)), receive: invoice - Math.round(invoice * (discount / 100)) };

  const item = (id: FixId) => copy.items.find((x) => x.id === id) as unknown as Record<string, string>;
  const r = copy.result;

  const rows: [string, string, string, string, string][] = [
    [r.lowest, vnd(baseline.lowestBalance), vnd(delayed.forecast.lowestBalance), copy.compare.needsInvoice, vnd(loan.forecast.lowestBalance)],
    [r.weeksBelow, String(baseline.breachWeeksCount), String(delayed.forecast.breachWeeksCount), '—', String(loan.forecast.breachWeeksCount)],
    [r.cost, '—', copy.compare.unknown, `${discount}% of the invoice`, vnd(loan.totalCost)],
    [r.owedAfter, vnd(0), vnd(owedAfter(delayed.events, LAST_DAY)), '—', vnd(loan.after)],
  ];

  return (
    <section id="fixes" aria-label={copy.heading} className="bg-primary px-4 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1360px] gap-x-6 gap-y-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-5">
          <h2
            className="max-w-[14ch] font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-primary-text"
            data-rise
          >
            {copy.heading}
          </h2>
          <div role="tablist" aria-label={copy.heading} className="mt-10 flex flex-col items-start gap-2">
            {copy.items.map((x, i) => {
              const on = active === x.id;
              return (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  id={`fix-tab-${x.id}`}
                  aria-selected={on}
                  aria-controls="fix-panel"
                  onClick={() => setActive(x.id as FixId)}
                  data-rise={String(i + 2)}
                  className={`press rounded-lg px-4 py-2 text-left font-display text-[24px] font-semibold leading-[1.25] ${
                    on ? 'bg-bg-surface text-text-primary' : 'text-primary-text hover:bg-bg-surface/15'
                  }`}
                >
                  {x.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="min-w-0 lg:col-span-7">
          <div
            id="fix-panel"
            role="tabpanel"
            aria-labelledby={`fix-tab-${active}`}
            key={active}
            data-ui className="hero-line rounded-lg bg-bg-surface p-6 text-[14px] text-text-primary shadow-lg"
          >
            <p className="max-w-[56ch] text-[16px] leading-[1.55] text-text-primary">{item(active).lines}</p>

            {active === 'delay' && (
              <>
                <Slider id="fx-days" label={item('delay').label} value={days} min={0} max={28} step={1}
                  display={`${days} ${days === 1 ? 'day' : 'days'} later`} onChange={setDays} />
                <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Result label={r.lowest} value={vnd(delayed.forecast.lowestBalance)}
                    tone={delayed.forecast.lowestBalance < WORKED_EXAMPLE_BUFFER ? 'warn' : 'good'} />
                  <Result label={r.weeksBelow} value={String(delayed.forecast.breachWeeksCount)} />
                  <Result label={r.cost} value={copy.compare.unknown} />
                </dl>
                <p className="mt-3 text-[13px] text-text-secondary">{item('delay').cost}</p>
                <div className="mt-5">
                  <WeekRibbon weeks={delayed.forecast.weeks} buffer={WORKED_EXAMPLE_BUFFER} label={r.weeks} />
                </div>
              </>
            )}

            {active === 'early' && (
              <>
                <p className="mt-4 rounded-lg bg-amber-surface p-3 text-[14px] leading-[1.5] text-text-primary">{item('early').none}</p>
                <Slider id="fx-invoice" label={item('early').amountLabel} value={invoice} min={10_000_000} max={200_000_000}
                  step={10_000_000} display={vnd(invoice)} onChange={setInvoice} />
                <Slider id="fx-discount" label={item('early').discountLabel} value={discount} min={0} max={10} step={0.5}
                  display={`${discount}%`} onChange={setDiscount} />
                <dl className="mt-5 grid grid-cols-2 gap-3">
                  <Result label={item('early').receive} value={vnd(early.receive)} tone="good" />
                  <Result label={item('early').cost} value={vnd(early.cost)} />
                </dl>
              </>
            )}

            {active === 'loan' && (
              <>
                <div className="grid gap-x-6 sm:grid-cols-3">
                  <Slider id="fx-loan" label={item('loan').amountLabel} value={loanAmount} min={10_000_000} max={100_000_000}
                    step={10_000_000} display={vnd(loanAmount)} onChange={setLoanAmount} />
                  <Slider id="fx-weeks" label={item('loan').weeksLabel} value={loanWeeks} min={4} max={16} step={4}
                    display={`${loanWeeks} weeks`} onChange={setLoanWeeks} />
                  <Slider id="fx-rate" label={item('loan').rateLabel} value={rate} min={6} max={24} step={1}
                    display={`${rate}%`} onChange={setRate} />
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Result label={r.lowest} value={vnd(loan.forecast.lowestBalance)}
                    tone={loan.forecast.lowestBalance < WORKED_EXAMPLE_BUFFER ? 'warn' : 'good'} />
                  <Result label={r.weeksBelow} value={String(loan.forecast.breachWeeksCount)} />
                  <Result label={r.cost} value={vnd(loan.totalCost)} />
                  <Result label={r.owedAfter} value={vnd(loan.after)} />
                </dl>
                <p className="mt-3 text-[13px] text-text-secondary">{item('loan').assumption}</p>
                <div className="mt-5">
                  <WeekRibbon weeks={loan.forecast.weeks} buffer={WORKED_EXAMPLE_BUFFER} label={r.weeks} />
                </div>
              </>
            )}
          </div>

          <div data-ui className="mt-6 overflow-x-auto rounded-lg bg-bg-surface p-5 text-[14px] text-text-primary" data-rise>
            <p className="mb-2 font-display text-[15px] font-semibold">{copy.compare.heading}</p>
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="text-[13px] text-text-muted">
                  <th scope="col" className="pb-2 font-medium"><span className="sr-only">Measure</span></th>
                  <th scope="col" className="pb-2 font-medium">{copy.compare.asIs}</th>
                  {copy.items.map((x) => (
                    <th key={x.id} scope="col" className={`pb-2 font-medium ${x.id === active ? 'text-text-primary' : ''}`}>{x.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="rows">
                {rows.map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row" className="py-2 pr-3 font-normal text-text-secondary">{label}</th>
                    {cells.map((c, i) => (
                      <td key={i} className={`num py-2 pr-3 tabular-nums ${i > 0 && copy.items[i - 1].id === active ? 'font-semibold' : ''}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
