'use client';

import { useState } from 'react';
import { Check, FileSpreadsheet } from 'lucide-react';
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
    ['Ngày giao dịch', 'date'],
    ['Ghi nợ', 'debit (money out)'],
    ['Ghi có', 'credit (money in)'],
    ['Nội dung', 'description'],
  ];
  return (
    <div>
      <ul className="space-y-2">
        {['bank-statement.csv', 'receivables.xlsx', 'bills.csv', 'regular-costs.csv'].map((name, i) => (
          <li key={name} className="flex items-center gap-3 rounded-lg bg-bg-surface-elevated px-3 py-2">
            <FileSpreadsheet className="h-4 w-4 text-positive" aria-hidden />
            <span className="flex-1 text-text-primary">{name}</span>
            {i === 0 && <span className="text-[13px] text-text-secondary">mapping columns</span>}
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
        {baseline.weeks.slice(0, 5).map((w) => (
          <tr key={w.weekNumber} className={w.isBreached ? 'bg-crimson-surface' : ''}>
            <td className="py-2 pl-1">
              <span className="text-text-primary">{w.weekNumber}</span>{' '}
              <span className="text-[13px] text-text-muted">{weekRange(w.startDate, w.endDate)}</span>
            </td>
            <td className="py-2 text-right num tabular-nums text-positive">+{vndCompact(w.inflow)}</td>
            <td className="py-2 text-right num tabular-nums">−{vndCompact(w.outflow)}</td>
            <td className={`py-2 pr-1 text-right num font-semibold tabular-nums ${w.isBreached ? 'text-crimson-ink' : ''}`}>
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
          <dt className="text-text-secondary">Lowest balance</dt>
          <dd className="num tabular-nums">{vnd(deferred.lowestBalance)}</dd>
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
    </div>
  );
}

const STATES = [FilesState, CheckState, ForecastState, ApproveState];

/**
 * How it works — "Drag through the stages": one slider drives the clause and the fragment.
 */
export default function HowItWorks() {
  const [stage, setStage] = useState(0);
  const State = STATES[stage];
  const fill = `${(stage / (how.stages.length - 1)) * 100}%`;

  return (
    <section id="how" aria-label={how.heading} className="grid lg:min-h-[88svh] lg:grid-cols-2">
      <div className="order-2 flex flex-col justify-between bg-bg-surface-elevated px-4 py-14 sm:px-10 lg:order-1 lg:py-24">
        <div>
          <p className="text-[16px] font-medium text-text-secondary" data-rise>{how.heading}</p>
          <h2
            key={stage}
            className="hero-line mt-4 max-w-[16ch] font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-text-primary"
          >
            {how.stages[stage].clause}
          </h2>
        </div>
      </div>

      <div className="order-1 flex items-center justify-center bg-primary px-4 py-14 sm:px-10 lg:order-2 lg:py-24">
        <div data-ui key={stage} className="hero-line w-full max-w-[440px] rounded-lg bg-bg-surface p-5 text-[14px] shadow-lg">
          <State />
        </div>
      </div>

      <div className="order-3 bg-bg-surface-elevated px-4 pb-14 sm:px-10 lg:col-span-2 lg:pb-12">
        <label htmlFor="how-stage" className="sr-only">{how.sliderLabel}</label>
        <input
          id="how-stage"
          type="range"
          min={0}
          max={how.stages.length - 1}
          step={1}
          value={stage}
          onChange={(e) => setStage(Number(e.target.value))}
          className="fw-range"
          style={{ ['--fill' as string]: fill }}
          aria-valuetext={how.stages[stage].name}
        />
        <ol className="mt-2 grid grid-cols-2 gap-2 text-[16px] sm:grid-cols-4">
          {how.stages.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                onClick={() => setStage(i)}
                className={`link-under text-left ${i === stage ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}
              >
                {s.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
