'use client';

import { WeeklyForecast } from '@/types/finance';
import { vnd, vndCompact, weekRange } from '@/lib/format';

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
 * Single series: the title names it, so there is no legend. Weeks below the safety
 * level use the status colour and are also named in the detail row (never colour alone).
 */
export default function WeekBars({ weeks, buffer, max, selected, onSelect, height = 200, label }: WeekBarsProps) {
  const pct = (value: number) => `${Math.max(0, Math.min(100, (value / max) * 100))}%`;
  const week = weeks[selected];

  return (
    <div>
      <div className="relative" style={{ height }} role="list" aria-label={label}>
        <div
          aria-hidden
          className="safety-line absolute inset-x-0"
          style={{ bottom: pct(buffer) }}
        />
        <div className="absolute inset-0 flex items-end gap-[2px]">
          {weeks.map((w, i) => {
            const below = w.closingBalance < buffer;
            const active = i === selected;
            return (
              <button
                key={w.weekNumber}
                type="button"
                role="listitem"
                onMouseEnter={() => onSelect(i)}
                onFocus={() => onSelect(i)}
                onClick={() => onSelect(i)}
                aria-label={`Week ${w.weekNumber}: closes at ${vnd(w.closingBalance)}${below ? ', below the safety level' : ''}`}
                className="group relative flex h-full flex-1 items-end"
              >
                <span
                  className={`block w-full rounded-t-[4px] transition-[height,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    below ? 'bg-crimson' : active ? 'bg-primary' : 'bg-navy group-hover:bg-primary'
                  }`}
                  style={{ height: pct(w.closingBalance) }}
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
            <dd className={week.closingBalance < buffer ? 'font-semibold text-crimson-ink' : 'text-text-secondary'}>
              {week.closingBalance < 0
                ? 'Shortfall'
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
