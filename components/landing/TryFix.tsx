'use client';

import { useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
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
import { vnd, vndCompact } from '@/lib/format';
import BalanceChart from './BalanceChart';
import RangeControl from './RangeControl';
import { Ticker } from './useTweened';

/** Every slider extreme stays inside this range, so the chart scale never moves. */
const DOMAIN: [number, number] = [-150_000_000, 500_000_000];
const BUFFER_RANGE = { min: 100_000_000, max: 220_000_000, step: 10_000_000 };
const before = forecastWorkedExample(WORKED_EXAMPLE_EVENTS);

type BlockId = 'delay' | 'buffer' | 'payoutDelay' | 'opening';
type State = Record<BlockId, number>;
const START: State = { delay: 0, buffer: WORKED_EXAMPLE_BUFFER, payoutDelay: 0, opening: WORKED_EXAMPLE_OPENING };

function delayPayouts(events: CashEvent[], days: number): CashEvent[] {
  if (days === 0) return events;
  return events.reduce(
    (acc, e) => (e.type === 'settlement' ? shiftEventDate(acc, e.id, days) : acc),
    events
  );
}

const days = (n: number) => `${n} ${n === 1 ? 'day' : 'days'}`;

function Delta({ now, was }: { now: number; was: number }) {
  const copy = tryFix.output;
  const d = now - was;
  if (d === 0) return <span className="text-text-secondary">{copy.same}</span>;
  return (
    <span className={d > 0 ? 'text-positive' : 'text-crimson-ink'}>
      {d > 0 ? '+' : ''}
      {vndCompact(d)} {copy.vsBefore}
    </span>
  );
}

function Tile({ label, value, sub }: { label: string; value: React.ReactNode; sub: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col rounded-lg bg-bg-surface-elevated p-3">
      <dt className="text-[13px] text-text-secondary">{label}</dt>
      <dd className="num mt-1 whitespace-nowrap text-[15px] font-semibold tabular-nums sm:text-[17px]">{value}</dd>
      <dd className="mt-auto pt-1 text-[13px]">{sub}</dd>
    </div>
  );
}

/**
 * Try a fix — "Fixed output, live controls": the forecast stays pinned on the left while
 * each block on the right adds a control that changes it. The chart keeps the starting
 * forecast as a dashed mark, so every change shows how far a week moved.
 */
export default function TryFix() {
  const copy = tryFix;
  const [state, setState] = useState<State>(START);
  const set = (id: BlockId) => (value: number) => setState((s) => ({ ...s, [id]: value }));
  const { delay, buffer, payoutDelay, opening } = state;
  const changed = (Object.keys(START) as BlockId[]).some((k) => state[k] !== START[k]);

  const summary = useMemo(() => {
    const events = delayPayouts(shiftEventDate(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, delay), payoutDelay);
    return forecastWorkedExample(events, opening, buffer);
  }, [delay, buffer, payoutDelay, opening]);

  const firstBelow = summary.weeks.find((w) => w.isBreached);
  const firstBefore = before.weeks.find((w) => w.closingBalance < buffer);
  const shortWeeks = summary.weeks.filter((w) => w.closingBalance < 0).length;
  const belowOnly = summary.breachWeeksCount - shortWeeks;
  const lowestTone = summary.lowestBalance < 0 ? 'text-crimson-ink' : summary.lowestBalance < buffer ? 'text-amber-ink' : 'text-text-primary';

  const controls: Record<BlockId, React.ReactNode> = {
    delay: (
      <RangeControl id="fix-delay" label={copy.blocks[0].label} value={delay} min={0} max={28} step={1}
        display={days(delay)} ends={['0', '28 days']} displayWidth="8ch" onChange={set('delay')} />
    ),
    buffer: (
      <RangeControl id="fix-buffer" label={copy.blocks[1].label} value={buffer} min={BUFFER_RANGE.min} max={BUFFER_RANGE.max}
        step={BUFFER_RANGE.step} display={vnd(buffer)} ends={['100M', '220M']} onChange={set('buffer')} />
    ),
    payoutDelay: (
      <RangeControl id="fix-payout" label={copy.blocks[2].label} value={payoutDelay} min={0} max={7} step={1}
        display={days(payoutDelay)} ends={['0', '7 days']} displayWidth="8ch" onChange={set('payoutDelay')} />
    ),
    opening: (
      <RangeControl id="fix-opening" label={copy.blocks[3].label} value={opening} min={100_000_000} max={400_000_000}
        step={10_000_000} display={vnd(opening)} ends={['100M', '400M']} onChange={set('opening')} />
    ),
  };

  return (
    <section id="try" aria-label={copy.heading} className="relative block lg:grid lg:grid-cols-12">
      <h2 className="px-4 pb-8 pt-24 font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.1] tracking-[-0.025em] text-text-primary sm:px-10 lg:hidden">
        {copy.heading}
      </h2>
      <div className="col-span-12 flex items-center justify-center overflow-hidden bg-bg-surface-elevated px-4 py-10 lg:sticky lg:top-0 lg:z-10 lg:col-span-6 lg:h-[100svh] lg:py-0">
        <div data-ui className="w-full max-w-[540px] rounded-lg bg-bg-surface p-5 shadow-lg">
          <div className="flex items-center justify-between gap-3">
            <p className="whitespace-nowrap font-display text-[15px] font-semibold text-text-primary">{copy.output.title}</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setState(START)}
                disabled={!changed}
                className={`press flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-[13px] font-medium text-text-secondary hover:bg-bg-surface-elevated hover:text-text-primary ${
                  changed ? '' : 'invisible'
                }`}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                <span className="sr-only sm:not-sr-only">{copy.output.reset}</span>
              </button>
              <span className="whitespace-nowrap rounded-sm bg-amber-surface px-2 py-0.5 text-[13px] font-medium text-amber-ink">{copy.output.sample}</span>
            </div>
          </div>

          <p className="sr-only" aria-live="polite">
            {copy.output.lowest}: {vnd(summary.lowestBalance)}. {copy.output.firstBelow}:{' '}
            {firstBelow ? `Week ${firstBelow.weekNumber}` : copy.output.none}.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <Tile
              label={copy.output.lowest}
              value={<span className={lowestTone}><Ticker value={summary.lowestBalance} format={vnd} /></span>}
              sub={<Delta now={summary.lowestBalance} was={before.lowestBalance} />}
            />
            <Tile
              label={copy.output.firstBelow}
              value={
                <span className={firstBelow ? (summary.weeks[firstBelow.weekNumber - 1].closingBalance < 0 ? 'text-crimson-ink' : 'text-amber-ink') : 'text-positive'}>
                  {firstBelow ? `Week ${firstBelow.weekNumber}` : copy.output.none}
                </span>
              }
              sub={<span className="text-text-secondary">{copy.output.beforeWas} {firstBefore ? `Week ${firstBefore.weekNumber}` : copy.output.none}</span>}
            />
            <Tile
              label={copy.output.weeksBelow}
              value={<span className={belowOnly ? 'text-amber-ink' : 'text-text-primary'}>{belowOnly}</span>}
              sub={<span className={shortWeeks ? 'font-semibold text-crimson-ink' : 'text-text-secondary'}>{shortWeeks} {copy.output.shortSuffix}</span>}
            />
            <Tile
              label={copy.output.week13}
              value={<Ticker value={summary.weeks[12].closingBalance} format={vnd} />}
              sub={<Delta now={summary.weeks[12].closingBalance} was={before.weeks[12].closingBalance} />}
            />
          </dl>

          <div className="mt-5">
            <BalanceChart
              weeks={summary.weeks}
              before={before.weeks}
              buffer={buffer}
              domain={DOMAIN}
              ticks={[-100_000_000, 0, 200_000_000, 400_000_000]}
              height={200}
              label={copy.output.title}
              safety={{ ...BUFFER_RANGE, onChange: set('buffer') }}
            />
          </div>
        </div>
      </div>

      <div className="col-span-12 px-4 pb-24 pt-12 sm:px-10 lg:col-span-5 lg:col-start-8 lg:pt-[72px]">
        <h2 className="hidden font-display text-[clamp(32px,3.6vw,52px)] font-bold leading-[1.1] tracking-[-0.025em] text-text-primary lg:block" data-rise>
          {copy.heading}
        </h2>
        {copy.blocks.map((block, i) => {
          const id = block.id as BlockId;
          return (
            <div key={block.id} className={`max-w-[46ch] ${i === 0 ? 'lg:mt-12' : 'mt-16 lg:mt-[26vh]'}`} data-rise>
              <h3 className="font-display text-[24px] font-semibold leading-[1.2] text-text-primary">{block.sentence}</h3>
              <p className="mt-3 text-[18px] leading-[1.6] text-text-primary">{block.paragraph}</p>
              {controls[id]}
              <div className="mt-4 flex flex-wrap gap-2">
                {block.presets.map((p) => {
                  const on = state[id] === p.value;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => set(id)(p.value)}
                      className={`press rounded-lg border px-3 py-1.5 text-[14px] font-medium tabular-nums ${
                        on
                          ? 'border-navy bg-navy text-on-navy'
                          : 'border-border-main bg-bg-surface text-text-primary hover:border-border-strong'
                      }`}
                    >
                      {p.label}
                    </button>
                  );
                })}
              </div>
              {'hint' in block && <p className="mt-3 text-[15px] text-text-secondary">{block.hint}</p>}
              <p className="mt-3 text-[15px] text-text-secondary lg:hidden">
                {copy.output.lowest}:{' '}
                <span className={`font-semibold ${lowestTone}`}>{vnd(summary.lowestBalance)}</span>
                {' · '}
                {copy.output.firstBelow}:{' '}
                <span className="font-semibold text-text-primary">{firstBelow ? `Week ${firstBelow.weekNumber}` : copy.output.none}</span>
              </p>
            </div>
          );
        })}
        <div className="h-[20vh]" aria-hidden />
      </div>
    </section>
  );
}
