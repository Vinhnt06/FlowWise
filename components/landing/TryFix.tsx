'use client';

import { useMemo, useState } from 'react';
import { CashEvent } from '@/types/finance';
import { shiftEventDate } from '@/lib/finance-engine';
import {
  WORKED_EXAMPLE_BUFFER,
  WORKED_EXAMPLE_DEFER_ID,
  WORKED_EXAMPLE_EVENTS,
  WORKED_EXAMPLE_OPENING,
  forecastWorkedExample,
} from '@/data/worked-example';
import { tryFix } from '@/content/landing';
import { vnd } from '@/lib/format';
import WeekBars from './WeekBars';

const MAX = 450_000_000;

function delayPayouts(events: CashEvent[], days: number): CashEvent[] {
  if (days === 0) return events;
  return events.reduce(
    (acc, e) => (e.type === 'settlement' ? shiftEventDate(acc, e.id, days) : acc),
    events
  );
}

interface ControlProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (value: number) => void;
}

function Control({ id, label, value, min, max, step, display, onChange }: ControlProps) {
  const fill = `${((value - min) / (max - min)) * 100}%`;
  return (
    <div className="mt-5">
      <div className="flex items-baseline justify-between text-[15px]">
        <label htmlFor={id} className="text-text-secondary">{label}</label>
        <output htmlFor={id} className="num font-semibold tabular-nums text-text-primary">{display}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="fw-range mt-1"
        style={{ ['--fill' as string]: fill }}
      />
    </div>
  );
}

/**
 * Try a fix — "Fixed output, live controls": the output stays pinned on the left
 * while each block on the right adds a control that changes it.
 */
export default function TryFix() {
  const copy = tryFix;
  const [delay, setDelay] = useState(0);
  const [buffer, setBuffer] = useState(WORKED_EXAMPLE_BUFFER);
  const [payoutDelay, setPayoutDelay] = useState(0);
  const [opening, setOpening] = useState(WORKED_EXAMPLE_OPENING);
  const [selected, setSelected] = useState(1);

  const summary = useMemo(() => {
    const events = delayPayouts(shiftEventDate(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, delay), payoutDelay);
    return forecastWorkedExample(events, opening, buffer);
  }, [delay, buffer, payoutDelay, opening]);

  const firstBelow = summary.weeks.find((w) => w.isBreached);

  const controls: Record<string, React.ReactNode> = {
    delay: (
      <Control id="fix-delay" label={copy.blocks[0].label} value={delay} min={0} max={28} step={1}
        display={`${delay} ${delay === 1 ? 'day' : 'days'}`} onChange={setDelay} />
    ),
    buffer: (
      <Control id="fix-buffer" label={copy.blocks[1].label} value={buffer} min={100_000_000} max={220_000_000}
        step={10_000_000} display={vnd(buffer)} onChange={setBuffer} />
    ),
    payoutDelay: (
      <Control id="fix-payout" label={copy.blocks[2].label} value={payoutDelay} min={0} max={7} step={1}
        display={`${payoutDelay} ${payoutDelay === 1 ? 'day' : 'days'}`} onChange={setPayoutDelay} />
    ),
    opening: (
      <Control id="fix-opening" label={copy.blocks[3].label} value={opening} min={200_000_000} max={400_000_000}
        step={10_000_000} display={vnd(opening)} onChange={setOpening} />
    ),
  };

  return (
    <section id="try" aria-label={copy.heading} className="relative block lg:grid lg:grid-cols-12">
      <h2 className="px-4 pb-8 pt-24 font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.1] tracking-[-0.025em] text-text-primary sm:px-10 lg:hidden">
        {copy.heading}
      </h2>
      <div className="col-span-12 flex py-10 lg:sticky lg:top-0 lg:z-10 lg:py-0 items-center justify-center overflow-hidden bg-bg-surface-elevated px-4 lg:col-span-6 lg:h-[100svh]">
        <div data-ui className="w-full max-w-[460px] rounded-lg bg-bg-surface p-5 shadow-lg">
          <div className="flex items-start justify-between gap-3">
            <p className="font-display text-[15px] font-semibold text-text-primary">{copy.output.title}</p>
            <span className="rounded-sm bg-amber-surface px-2 py-0.5 text-[13px] font-medium text-amber-ink">{copy.output.sample}</span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
            <div className="rounded-lg bg-bg-surface-elevated p-3">
              <dt className="text-text-secondary">{copy.output.lowest}</dt>
              <dd className={`mt-1 num text-[15px] font-semibold tabular-nums ${summary.lowestBalance < buffer ? 'text-crimson-ink' : 'text-text-primary'}`}>
                {vnd(summary.lowestBalance)}
              </dd>
            </div>
            <div className="rounded-lg bg-bg-surface-elevated p-3">
              <dt className="text-text-secondary">{copy.output.firstBelow}</dt>
              <dd className={`mt-1 text-[15px] font-semibold ${firstBelow ? 'text-crimson-ink' : 'text-positive'}`}>
                {firstBelow ? `Week ${firstBelow.weekNumber}` : copy.output.none}
              </dd>
            </div>
            <div className="rounded-lg bg-bg-surface-elevated p-3">
              <dt className="text-text-secondary">{copy.output.weeksBelow}</dt>
              <dd className="mt-1 num text-[15px] font-semibold tabular-nums">{summary.breachWeeksCount}</dd>
            </div>
            <div className="rounded-lg bg-bg-surface-elevated p-3">
              <dt className="text-text-secondary">{copy.output.week13}</dt>
              <dd className="mt-1 num text-[15px] font-semibold tabular-nums">{vnd(summary.weeks[12].closingBalance)}</dd>
            </div>
          </dl>
          <div className="mt-4 hidden sm:block">
            <WeekBars
              weeks={summary.weeks}
              buffer={buffer}
              max={MAX}
              selected={selected}
              onSelect={setSelected}
              height={120}
              label={copy.output.title}
            />
          </div>
        </div>
      </div>

      <div className="col-span-12 px-4 pb-24 pt-12 sm:px-10 lg:col-span-5 lg:col-start-8 lg:pt-[72px]">
        <h2 className="hidden font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.1] tracking-[-0.025em] text-text-primary lg:block" data-rise>
          {copy.heading}
        </h2>
        {copy.blocks.map((block, i) => (
          <div key={block.id} className={`max-w-[44ch] ${i === 0 ? 'lg:mt-12' : 'mt-16 lg:mt-[40vh]'}`} data-rise>
            <h3 className="font-display text-[24px] font-semibold leading-[1.2] text-text-primary">
              {block.sentence}
            </h3>
            <p className="mt-3 text-[18px] leading-[1.6] text-text-primary">{block.paragraph}</p>
            {controls[block.id]}
            <p className="mt-3 text-[15px] text-text-secondary lg:hidden" aria-live="polite">
              {copy.output.lowest}:{' '}
              <span className={`font-semibold ${summary.lowestBalance < buffer ? 'text-crimson-ink' : 'text-text-primary'}`}>{vnd(summary.lowestBalance)}</span>
              {' · '}{copy.output.firstBelow}:{' '}
              <span className="font-semibold text-text-primary">{firstBelow ? `Week ${firstBelow.weekNumber}` : copy.output.none}</span>
            </p>
          </div>
        ))}
        <div className="h-[20vh]" aria-hidden />
      </div>
    </section>
  );
}
