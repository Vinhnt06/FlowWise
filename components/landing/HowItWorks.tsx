'use client';

import { KeyboardEvent, useRef, useState } from 'react';
import { ArrowRight, Check, FileSpreadsheet, RotateCcw } from 'lucide-react';
import { shiftEventDate } from '@/lib/finance-engine';
import {
  WORKED_EXAMPLE_BUFFER,
  WORKED_EXAMPLE_DEFER_DAYS,
  WORKED_EXAMPLE_DEFER_ID,
  WORKED_EXAMPLE_EVENTS,
  forecastWorkedExample,
} from '@/data/worked-example';
import { how } from '@/content/landing';
import { vnd, vndCompact, weekRange } from '@/lib/format';

const baseline = forecastWorkedExample(WORKED_EXAMPLE_EVENTS);
const deferred = forecastWorkedExample(
  shiftEventDate(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, WORKED_EXAMPLE_DEFER_DAYS)
);

function FilesState() {
  const mapping = [
    ['trans_id', 'reference'],
    ['debit_outflow_vnd', 'money out (VND)'],
    ['credit_inflow_vnd', 'money in (VND)'],
    ['beneficiary_counterparty', 'paid to or from'],
  ];
  return (
    <div>
      <ul className="space-y-2">
        {['bank-statement.csv', 'receivables.xlsx', 'bills.csv', 'regular-costs.csv'].map((name, i) => (
          <li key={name} className="flex items-center gap-3 rounded-lg bg-bg-surface-elevated px-3 py-2">
            <FileSpreadsheet className="h-4 w-4 text-positive" aria-hidden />
            <span className="flex-1 truncate text-text-primary">{name}</span>
            {i === 0 ? (
              <span className="text-[13px] font-medium text-amber-ink">Check columns</span>
            ) : (
              <span className="flex items-center gap-1 text-[13px] text-positive">
                <Check className="h-3.5 w-3.5" aria-hidden /> Read
              </span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 mb-1 text-[13px] font-semibold text-text-primary">bank-statement.csv: columns found</p>
      <table className="w-full text-left text-[14px]">
        <tbody className="rows">
          {mapping.map(([from, to]) => (
            <tr key={from}>
              <td className="py-1.5 text-text-secondary">{from}</td>
              <td className="py-1.5 text-text-primary">→ {to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CheckState() {
  const counts = [
    ['Rows read', '1,284'],
    ['Used in the forecast', '1,276'],
    ['Left out, with a reason', '8'],
  ];
  return (
    <div>
      <dl className="rows">
        {counts.map(([k, v]) => (
          <div key={k} className="flex justify-between py-2">
            <dt className="text-text-secondary">{k}</dt>
            <dd className="num tabular-nums text-text-primary">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-bg-surface-elevated p-3">
          <p className="num text-[20px] font-semibold tabular-nums">0</p>
          <p className="text-[13px] text-text-secondary">blocking</p>
        </div>
        <div className="rounded-lg bg-amber-surface p-3">
          <p className="num text-[20px] font-semibold tabular-nums text-amber-ink">3</p>
          <p className="text-[13px] text-text-secondary">warnings</p>
        </div>
        <div className="rounded-lg bg-bg-surface-elevated p-3">
          <p className="num text-[20px] font-semibold tabular-nums">1</p>
          <p className="text-[13px] text-text-secondary">notes</p>
        </div>
      </div>
      <p className="mb-1 mt-4 text-[13px] font-semibold text-text-primary">Why 8 rows were left out</p>
      <ul className="rows">
        {[
          ['Dated before the cut-off date', '5'],
          ['Amount of 0', '3'],
        ].map(([why, n]) => (
          <li key={why} className="flex justify-between py-1.5">
            <span className="text-text-secondary">{why}</span>
            <span className="num tabular-nums text-text-primary">{n} rows</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ForecastState() {
  return (
    <table className="w-full text-left text-[14px]">
      <thead>
        <tr className="text-[13px] text-text-muted">
          <th className="pb-2 font-medium">Week</th>
          <th className="pb-2 text-right font-medium">In</th>
          <th className="pb-2 text-right font-medium">Out</th>
          <th className="pb-2 text-right font-medium">Closing</th>
        </tr>
      </thead>
      <tbody className="rows">
        {baseline.weeks.slice(0, 7).map((w) => (
          <tr key={w.weekNumber} className={w.isBreached ? 'bg-amber-surface' : ''}>
            <td className="py-2 pl-1">
              <span className="text-text-primary">{w.weekNumber}</span>{' '}
              <span className="text-[13px] text-text-muted">{weekRange(w.startDate, w.endDate)}</span>
            </td>
            <td className="py-2 text-right num tabular-nums text-positive">+{vndCompact(w.inflow)}</td>
            <td className="py-2 text-right num tabular-nums">−{vndCompact(w.outflow)}</td>
            <td className={`py-2 pr-1 text-right num font-semibold tabular-nums ${w.isBreached ? 'text-amber-ink' : ''}`}>
              {vndCompact(w.closingBalance)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ApproveState() {
  return (
    <div>
      <p className="font-display text-[16px] font-semibold text-text-primary">Plan: pay bill E05 14 days later</p>
      <dl className="mt-3 rows">
        <div className="flex justify-between py-2">
          <dt className="text-text-secondary">Lowest balance, as is</dt>
          <dd className="num tabular-nums text-amber-ink">{vnd(baseline.lowestBalance)}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-text-secondary">Lowest balance, with the plan</dt>
          <dd className="num tabular-nums text-positive">{vnd(deferred.lowestBalance)}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-text-secondary">Weeks below safety</dt>
          <dd className="num tabular-nums">{deferred.breachWeeksCount}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-text-secondary">Safety level</dt>
          <dd className="num tabular-nums">{vnd(WORKED_EXAMPLE_BUFFER)}</dd>
        </div>
        <div className="flex justify-between py-2">
          <dt className="text-text-secondary">Assumed</dt>
          <dd>payouts arrive on time</dd>
        </div>
      </dl>
      <p className="mt-4 flex items-center gap-2 rounded-lg bg-primary-surface px-3 py-2.5 text-positive">
        <Check className="h-4 w-4" aria-hidden /> Approved by the shop owner. No money moves.
      </p>
      <p className="mt-2 text-[13px] text-text-secondary">Saved with its assumptions, so the plan can be opened again later.</p>
    </div>
  );
}

const STATES = [FilesState, CheckState, ForecastState, ApproveState];
const TITLES = ['Your files', 'Data check', 'Sample shop · VND', 'Plan to approve'];

/**
 * How it works — "Four steps, one fragment": a stepper on the left drives the product
 * fragment on the right. All four fragments share one grid cell, so the section keeps its
 * height on every step and the fragment cross-fades instead of remounting.
 */
export default function HowItWorks() {
  const [stage, setStage] = useState(0);
  const count = how.stages.length;
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number, focus = false) => {
    const next = (i + count) % count;
    setStage(next);
    if (focus) tabs.current[next]?.focus();
  };
  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    go(stage + step, true);
  };

  return (
    <section id="how" aria-label={how.heading} className="grid lg:min-h-[88svh] lg:grid-cols-2">
      <div className="bg-bg-surface-elevated px-4 py-14 sm:px-10 lg:py-24">
        <h2
          className="max-w-[14ch] font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary"
          data-rise
        >
          {how.heading}
        </h2>

        <div
          role="tablist"
          aria-label={how.heading}
          onKeyDown={onKey}
          className="relative mt-10 grid grid-cols-4 gap-2 lg:mt-12 lg:flex lg:max-w-[520px] lg:flex-col lg:gap-1"
        >
          <span aria-hidden className="absolute bottom-7 left-[27px] top-7 hidden w-[2px] rounded-full bg-border-main lg:block" />
          <span
            aria-hidden
            className="absolute left-[27px] top-7 hidden w-[2px] rounded-full bg-primary transition-[height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:block"
            style={{ height: `calc((100% - 56px) * ${stage / (count - 1)})` }}
          />
          {how.stages.map((s, i) => {
            const on = i === stage;
            const done = i < stage;
            return (
              <button
                key={s.name}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`how-tab-${i}`}
                aria-selected={on}
                aria-controls={`how-panel-${i}`}
                tabIndex={on ? 0 : -1}
                onClick={() => go(i)}
                className={`press relative flex flex-col items-center gap-2 rounded-lg px-1 py-3 text-center lg:flex-row lg:items-start lg:gap-4 lg:px-3 lg:py-4 lg:text-left ${
                  on ? 'bg-bg-surface' : 'hover:bg-bg-surface/60'
                }`}
              >
                <span
                  className={`relative z-[1] grid h-8 w-8 shrink-0 place-items-center rounded-full text-[14px] font-semibold tabular-nums transition-colors duration-300 ${
                    on
                      ? 'bg-navy text-on-navy'
                      : done
                        ? 'bg-primary text-primary-text'
                        : 'border-2 border-border-strong bg-bg-surface-elevated text-text-secondary'
                  }`}
                >
                  {done ? <Check className="h-4 w-4" aria-hidden /> : i + 1}
                </span>
                <span className="min-w-0">
                  <span className={`block text-[14px] font-semibold lg:hidden ${on ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {s.name}
                  </span>
                  <span
                    className={`hidden font-display text-[24px] font-semibold leading-[1.25] lg:block ${on ? 'text-text-primary' : 'text-text-secondary'}`}
                  >
                    {s.clause}
                  </span>
                  <span className={`mt-1 hidden text-[16px] leading-[1.55] lg:block ${on ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {s.detail}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid lg:hidden">
          {how.stages.map((s, i) => (
            <div
              key={s.name}
              aria-hidden={i !== stage}
              className={`[grid-area:1/1] transition-opacity duration-300 motion-reduce:transition-none ${i === stage ? 'visible opacity-100' : 'invisible opacity-0'}`}
            >
              <p className="font-display text-[24px] font-semibold leading-[1.25] text-text-primary">{s.clause}</p>
              <p className="mt-2 text-[16px] leading-[1.55] text-text-primary">{s.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center bg-primary px-4 py-14 sm:px-10 lg:py-24">
        <div className="grid w-full max-w-[460px]">
          {STATES.map((State, i) => {
            const on = i === stage;
            return (
              <div
                key={i}
                id={`how-panel-${i}`}
                role="tabpanel"
                aria-labelledby={`how-tab-${i}`}
                inert={!on}
                data-ui
                className={`[grid-area:1/1] flex flex-col rounded-lg bg-bg-surface p-5 text-[14px] shadow-lg transition-[opacity,translate,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  on ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
                }`}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <p className="font-display text-[15px] font-semibold text-text-primary">{TITLES[i]}</p>
                  <span className="whitespace-nowrap rounded-sm bg-amber-surface px-2 py-0.5 text-[13px] font-medium text-amber-ink">
                    {how.sample}
                  </span>
                </div>
                <State />
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="text-[13px] text-text-secondary tabular-nums">
                    {how.step} {i + 1} {how.of} {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(i + 1)}
                    className="press flex items-center gap-1.5 rounded-lg bg-navy px-3 py-1.5 text-[14px] font-semibold text-on-navy hover:bg-navy-hover"
                  >
                    {i === count - 1 ? (
                      <>
                        <RotateCcw className="h-4 w-4" aria-hidden /> {how.again}
                      </>
                    ) : (
                      <>
                        {how.next}: {how.stages[i + 1].name} <ArrowRight className="h-4 w-4" aria-hidden />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
