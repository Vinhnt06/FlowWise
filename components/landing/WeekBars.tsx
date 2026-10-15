'use client';

import { WeeklyForecast } from '@/types/finance';
import { alertLevel } from '@/lib/scenarios';
import { vnd, vndCompact, weekRange } from '@/lib/format';

const LEVEL_TEXT = { OK: 'Above safety', BELOW_BUFFER: 'Below safety', SHORTFALL: 'Short of cash' } as const;

interface WeekBarsProps {
  weeks: WeeklyForecast[];
  buffer: number;
  max: number;
  selected: number;
  onSelect: (index: number) => void;
  height?: number;
  label: string;
}

/**
 * Closing balance per week as bars, with the safety level as a reference line.
 * Single series: the title names it, so there is no legend. Two warning levels: below the
 * safety level is amber, under zero is crimson, and both are named in the detail row (never colour alone).
 * Bars grow in on first paint, one after another.
 */
export default function WeekBars({ weeks, buffer, max, selected, onSelect, height = 200, label }: WeekBarsProps) {
  const pct = (value: number) => `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  const barHeight = (value: number) => (value < 0 ? '3%' : pct(value));
  const week = weeks[selected];

  return (
    <div>
      <div className="relative" style={{ height }} role="list" aria-label={label}>
        <div
          aria-hidden
          className="safety-line draw-line absolute inset-x-0"
          style={{ bottom: pct(buffer) }}
        />
        <div className="absolute inset-0 flex items-end gap-[2px]">
          {weeks.map((w, i) => {
            const level = alertLevel(w.closingBalance, buffer);
            const active = i === selected;
            return (
              <button
                key={w.weekNumber}
                type="button"
                role="listitem"
                onMouseEnter={() => onSelect(i)}
                onFocus={() => onSelect(i)}
                onClick={() => onSelect(i)}
                aria-label={`Week ${w.weekNumber}: closes at ${vnd(w.closingBalance)}, ${LEVEL_TEXT[level].toLowerCase()}`}
                className="group relative flex h-full flex-1 items-end"
              >
                <span
                  className={`grow block w-full rounded-t-[4px] transition-[height,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    level === 'SHORTFALL'
                      ? 'bg-crimson'
                      : level === 'BELOW_BUFFER'
                        ? 'bg-amber'
                        : active
                          ? 'bg-primary'
                          : 'bg-navy group-hover:bg-primary'
                  }`}
                  style={{ height: barHeight(w.closingBalance), ['--i' as string]: i }}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="mt-2 flex gap-[2px] text-[13px] text-text-muted tabular-nums" aria-hidden>
        {weeks.map((w, i) => (
          <span key={w.weekNumber} className={`flex-1 text-center ${i === selected ? 'font-semibold text-text-primary' : ''}`}>
            {w.weekNumber}
          </span>
        ))}
      </div>
      {week && (
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 text-[13px] sm:grid-cols-4" aria-live="polite">
          <div className="col-span-2 sm:col-span-4 flex items-baseline justify-between">
            <dt className="font-semibold text-text-primary">
              Week {week.weekNumber} · {weekRange(week.startDate, week.endDate)}
            </dt>
            <dd
              className={
                week.closingBalance < 0
                  ? 'font-semibold text-crimson-ink'
                  : week.closingBalance < buffer
                    ? 'font-semibold text-amber-ink'
                    : 'text-text-secondary'
              }
            >
              {week.closingBalance < 0
                ? `Short of cash by ${vndCompact(-week.closingBalance)}`
                : week.closingBalance < buffer
                  ? `Below safety by ${vndCompact(buffer - week.closingBalance)}`
                  : 'Above safety'}
            </dd>
          </div>
          <div>
            <dt className="text-text-muted">Opening</dt>
            <dd className="num tabular-nums">{vndCompact(week.openingBalance)}</dd>
          </div>
          <div>
            <dt className="text-text-muted">In</dt>
            <dd className="num tabular-nums text-positive">+{vndCompact(week.inflow)}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Out</dt>
            <dd className="num tabular-nums">−{vndCompact(week.outflow)}</dd>
          </div>
          <div>
            <dt className="text-text-muted">Closing</dt>
            <dd className="num font-semibold tabular-nums">{vndCompact(week.closingBalance)}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
