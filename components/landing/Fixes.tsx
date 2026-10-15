'use client';

import { KeyboardEvent, useMemo, useRef, useState } from 'react';
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
import BalanceChart from './BalanceChart';
import RangeControl from './RangeControl';
import { Ticker } from './useTweened';

const baseline = forecastWorkedExample(WORKED_EXAMPLE_EVENTS);
const LAST_DAY = baseline.weeks[12].endDate;
/** Loan money arrives on the first day of week 2, before the bill that causes the gap. */
const DISBURSE = baseline.weeks[1].startDate;

type FixId = 'delay' | 'early' | 'loan';
const IDS: FixId[] = ['delay', 'early', 'loan'];
/** S1 and S3 never lift a week above 400M on this sample, so the scale stays put. */
const DOMAIN: [number, number] = [0, 420_000_000];

function Result({ label, value, tone }: { label: string; value: React.ReactNode; tone?: 'warn' | 'good' }) {
  return (
    <div className="min-w-0 rounded-lg bg-bg-surface-elevated p-3">
      <dt className="truncate text-[13px] text-text-secondary">{label}</dt>
      <dd className={`num mt-1 truncate text-[15px] font-semibold tabular-nums ${tone === 'warn' ? 'text-amber-ink' : tone === 'good' ? 'text-positive' : 'text-text-primary'}`}>
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

  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = IDS[(IDS.indexOf(active) + step + IDS.length) % IDS.length];
    setActive(next);
    tabs.current[IDS.indexOf(next)]?.focus();
  };

  const lowTone = (v: number) => (v < WORKED_EXAMPLE_BUFFER ? 'warn' : 'good');

  const panels: Record<FixId, React.ReactNode> = {
    delay: (
      <>
        <RangeControl id="fx-days" label={item('delay').label} value={days} min={0} max={28} step={1}
          display={`${days} ${days === 1 ? 'day' : 'days'} later`} ends={['On time', '28 days']} displayWidth="13ch" onChange={setDays} />
        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Result label={r.lowest} value={<Ticker value={delayed.forecast.lowestBalance} format={vnd} />} tone={lowTone(delayed.forecast.lowestBalance)} />
          <Result label={r.weeksBelow} value={delayed.forecast.breachWeeksCount} />
          <Result label={r.cost} value={copy.compare.unknown} />
          <Result label={r.owedAfter} value={vnd(owedAfter(delayed.events, LAST_DAY))} />
        </dl>
        <p className="mt-3 text-[13px] text-text-secondary">{item('delay').cost}</p>
        <div className="mt-5 flex-1">
          <BalanceChart weeks={delayed.forecast.weeks} before={baseline.weeks} buffer={WORKED_EXAMPLE_BUFFER}
            domain={DOMAIN} height="fill" label={r.weeks} />
        </div>
      </>
    ),
    early: (
      <>
        <p className="mt-4 rounded-lg bg-amber-surface p-3 text-[14px] leading-[1.5] text-text-primary">{item('early').none}</p>
        <div className="grid gap-x-6 sm:grid-cols-2">
          <RangeControl id="fx-invoice" label={item('early').amountLabel} value={invoice} min={10_000_000} max={200_000_000}
            step={10_000_000} display={vnd(invoice)} ends={['10M', '200M']} onChange={setInvoice} />
          <RangeControl id="fx-discount" label={item('early').discountLabel} value={discount} min={0} max={10} step={0.5}
            display={`${discount}%`} ends={['0%', '10%']} displayWidth="5ch" onChange={setDiscount} />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Result label={item('early').receive} value={<Ticker value={early.receive} format={vnd} />} tone="good" />
          <Result label={item('early').cost} value={<Ticker value={early.cost} format={vnd} />} />
          <Result label={item('early').discountLabel} value={`${discount}%`} />
          <Result label={r.lowest} value={copy.compare.needsInvoice} />
        </dl>
        <div className="mt-5" aria-hidden>
          <div className="flex h-7 gap-[2px] overflow-hidden rounded-[4px]">
            <span className="bg-navy transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ flexGrow: early.receive }} />
            <span className="bg-border-strong transition-[flex-grow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" style={{ flexGrow: early.cost }} />
          </div>
          <div className="mt-2 flex justify-between text-[13px] text-text-secondary">
            <span>{item('early').receive}</span>
            <span>{item('early').cost}</span>
          </div>
        </div>
        <p className="mt-5 text-[13px] text-text-secondary">{item('early').asIs}</p>
        <div className="mt-3 flex-1">
          <BalanceChart weeks={baseline.weeks} buffer={WORKED_EXAMPLE_BUFFER} domain={DOMAIN} height="fill" label={r.weeks} />
        </div>
      </>
    ),
    loan: (
      <>
        <div className="grid gap-x-6 sm:grid-cols-3">
          <RangeControl id="fx-loan" label={item('loan').amountLabel} value={loanAmount} min={10_000_000} max={100_000_000}
            step={10_000_000} display={vnd(loanAmount)} ends={['10M', '100M']} displayWidth="0" onChange={setLoanAmount} />
          <RangeControl id="fx-weeks" label={item('loan').weeksLabel} value={loanWeeks} min={4} max={16} step={4}
            display={`${loanWeeks} weeks`} ends={['4', '16']} displayWidth="0" onChange={setLoanWeeks} />
          <RangeControl id="fx-rate" label={item('loan').rateLabel} value={rate} min={6} max={24} step={1}
            display={`${rate}%`} ends={['6%', '24%']} displayWidth="0" onChange={setRate} />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Result label={r.lowest} value={<Ticker value={loan.forecast.lowestBalance} format={vnd} />} tone={lowTone(loan.forecast.lowestBalance)} />
          <Result label={r.weeksBelow} value={loan.forecast.breachWeeksCount} />
          <Result label={r.cost} value={<Ticker value={loan.totalCost} format={vnd} />} />
          <Result label={r.owedAfter} value={<Ticker value={loan.after} format={vnd} />} />
        </dl>
        <p className="mt-3 text-[13px] text-text-secondary">{item('loan').assumption}</p>
        <div className="mt-5 flex-1">
          <BalanceChart weeks={loan.forecast.weeks} before={baseline.weeks} buffer={WORKED_EXAMPLE_BUFFER}
            domain={DOMAIN} height="fill" label={r.weeks} />
        </div>
      </>
    ),
  };

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
          <div role="tablist" aria-label={copy.heading} aria-orientation="vertical" onKeyDown={onTabKey} className="mt-10 flex flex-col items-start gap-2">
            {copy.items.map((x, i) => {
              const on = active === x.id;
              return (
                <button
                  key={x.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`fix-tab-${x.id}`}
                  aria-selected={on}
                  aria-controls={`fix-panel-${x.id}`}
                  tabIndex={on ? 0 : -1}
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
          <div className="grid">
            {IDS.map((id) => {
              const on = id === active;
              return (
                <div
                  key={id}
                  id={`fix-panel-${id}`}
                  role="tabpanel"
                  aria-labelledby={`fix-tab-${id}`}
                  inert={!on}
                  data-ui
                  className={`[grid-area:1/1] flex flex-col rounded-lg bg-bg-surface p-6 text-[14px] text-text-primary shadow-lg transition-[opacity,translate,visibility] duration-300 motion-reduce:transition-none ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    on ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                  }`}
                >
                  <p className="max-w-[56ch] text-[16px] leading-[1.55] text-text-primary">{item(id).lines}</p>
                  {panels[id]}
                </div>
              );
            })}
          </div>

          <div data-ui className="mt-6 overflow-x-auto rounded-lg bg-bg-surface p-5 text-[14px] text-text-primary" data-rise>
            <p className="mb-2 font-display text-[15px] font-semibold">{copy.compare.heading}</p>
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="text-[13px] text-text-muted">
                  <th scope="col" className="pb-2 font-medium"><span className="sr-only">Measure</span></th>
                  <th scope="col" className="px-2 pb-2 font-medium">{copy.compare.asIs}</th>
                  {copy.items.map((x) => (
                    <th
                      key={x.id}
                      scope="col"
                      className={`rounded-t-md px-2 pb-2 pt-1 font-medium transition-colors duration-300 ${x.id === active ? 'bg-primary-surface text-text-primary' : ''}`}
                    >
                      {x.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="rows">
                {rows.map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row" className="py-2 pr-3 font-normal text-text-secondary">{label}</th>
                    {cells.map((c, i) => {
                      const on = i > 0 && copy.items[i - 1].id === active;
                      return (
                        <td key={i} className={`num px-2 py-2 tabular-nums transition-colors duration-300 ${on ? 'bg-primary-surface font-semibold' : ''}`}>
                          {c}
                        </td>
                      );
                    })}
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
