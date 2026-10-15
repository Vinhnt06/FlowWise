'use client';

import { KeyboardEvent, PointerEvent, useRef, useState } from 'react';
import { WeeklyForecast } from '@/types/finance';
import { alertLevel, AlertLevel } from '@/lib/scenarios';
import { chart as copy } from '@/content/landing';
import { vnd, vndCompact, weekRange } from '@/lib/format';

const BAR: Record<AlertLevel, string> = { OK: 'bg-navy', BELOW_BUFFER: 'bg-amber', SHORTFALL: 'bg-crimson' };
const INK: Record<AlertLevel, string> = {
  OK: 'text-text-secondary',
  BELOW_BUFFER: 'font-semibold text-amber-ink',
  SHORTFALL: 'font-semibold text-crimson-ink',
};

interface SafetyHandle {
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}

interface BalanceChartProps {
  weeks: WeeklyForecast[];
  /** The same 13 weeks before any change; drawn as a dashed mark where a week moved */
  before?: WeeklyForecast[];
  buffer: number;
  /** Fixed value range, so bars move and the scale never does */
  domain: [number, number];
  ticks?: number[];
  /** Plot height in px, or 'fill' to take the space the parent gives (at least 150px) */
  height?: number | 'fill';
  label: string;
  /** Makes the safety line draggable (and keyboard adjustable) */
  safety?: SafetyHandle;
}

/**
 * Closing balance per week, one bar each, against a fixed scale. Bars below the safety level
 * are amber and bars under zero crimson; the tooltip and the bar's label name the level, so
 * colour is never the only signal. When `before` is given, a dashed mark shows where each
 * changed week stood before. The safety line can be dragged when `safety` is given.
 */
export default function BalanceChart({
  weeks, before, buffer, domain, ticks = [0, 200_000_000, 400_000_000], height = 220, label, safety,
}: BalanceChartProps) {
  const [lo, hi] = domain;
  const y = (v: number) => ((Math.max(lo, Math.min(hi, v)) - lo) / (hi - lo)) * 100;
  const zero = y(0);
  const plot = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const setFromPointer = (clientY: number) => {
    if (!safety || !plot.current) return;
    const box = plot.current.getBoundingClientRect();
    const raw = lo + (1 - (clientY - box.top) / box.height) * (hi - lo);
    const snapped = Math.round(raw / safety.step) * safety.step;
    safety.onChange(Math.max(safety.min, Math.min(safety.max, snapped)));
  };

  const drag = safety
    ? {
        onPointerDown: (e: PointerEvent<HTMLElement>) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          setFromPointer(e.clientY);
        },
        onPointerMove: (e: PointerEvent<HTMLElement>) => {
          if (dragging) setFromPointer(e.clientY);
        },
        onPointerUp: () => setDragging(false),
        onPointerCancel: () => setDragging(false),
      }
    : {};

  const onKey = (e: KeyboardEvent<HTMLElement>) => {
    if (!safety) return;
    const delta = e.key === 'ArrowUp' || e.key === 'ArrowRight' ? safety.step : e.key === 'ArrowDown' || e.key === 'ArrowLeft' ? -safety.step : 0;
    if (!delta) return;
    e.preventDefault();
    safety.onChange(Math.max(safety.min, Math.min(safety.max, buffer + delta)));
  };

  const shown = hover === null ? null : weeks[hover];
  const shownBefore = hover === null || !before ? null : before[hover];

  const fill = height === 'fill';
  const box = fill ? undefined : { height };

  return (
    <div className={`select-none ${fill ? 'flex h-full flex-col' : ''}`}>
      <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="h-2.5 w-2.5 rounded-[2px] bg-navy" />
          {before ? copy.plan : copy.balance}
        </span>
        {before && (
          <span className="flex items-center gap-1.5">
            <span aria-hidden className="w-4 border-t-2 border-dashed border-text-muted" />
            {copy.before}
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="w-4 border-t-2 border-dashed border-amber" />
          {copy.safety}
          {safety && <span className="text-text-muted">· {copy.drag}</span>}
        </span>
      </div>

      <div className={`flex gap-2 ${fill ? 'min-h-[150px] flex-1' : ''}`}>
        <div className="relative w-10 shrink-0 text-right text-[13px] text-text-muted tabular-nums" style={box} aria-hidden>
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 translate-y-1/2" style={{ bottom: `${y(t)}%` }}>
              {vndCompact(t)}
            </span>
          ))}
        </div>

        <div
          ref={plot}
          className="relative flex-1"
          style={box}
          onMouseLeave={() => setHover(null)}
        >
          {ticks.map((t) => (
            <span
              key={t}
              aria-hidden
              className={`absolute inset-x-0 border-t ${t === 0 ? 'border-border-strong' : 'border-border-subtle'}` /* taste-skill-ignore: chart gridlines */}
              style={{ bottom: `${y(t)}%` }}
            />
          ))}

          <ol className="absolute inset-0 flex gap-[3px]" aria-label={label}>
            {weeks.map((w, i) => {
              const level = alertLevel(w.closingBalance, buffer);
              const top = y(w.closingBalance);
              const prior = before?.[i];
              const moved = prior && prior.closingBalance !== w.closingBalance;
              return (
                <li key={w.weekNumber} className="relative h-full flex-1">
                  <button
                    type="button"
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    onBlur={() => setHover(null)}
                    aria-label={`Week ${w.weekNumber}: closes at ${vnd(w.closingBalance)}, ${copy.levels[level].toLowerCase()}`}
                    className={`absolute inset-0 rounded-[4px] transition-colors duration-150 ${hover === i ? 'bg-bg-surface-elevated' : ''}`}
                  >
                    <span
                      className={`absolute inset-x-0 transition-[bottom,height,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${BAR[level]} ${
                        w.closingBalance < 0 ? 'rounded-b-[4px]' : 'rounded-t-[4px]'
                      }`}
                      style={{ bottom: `${Math.min(zero, top)}%`, height: `${Math.max(Math.abs(top - zero), 0.8)}%` }}
                    />
                    {moved && (
                      <span
                        aria-hidden
                        className="absolute -inset-x-[2px] border-t-2 border-dashed border-text-muted transition-[bottom] duration-500"
                        style={{ bottom: `${y(prior.closingBalance)}%` }}
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            className={`absolute inset-x-0 z-10 ${dragging ? '' : 'transition-[bottom] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
            style={{ bottom: `${y(buffer)}%` }}
          >
            <div aria-hidden className="pointer-events-none border-t-2 border-dashed border-amber" />
            {safety && (
              <div aria-hidden className="absolute inset-x-0 -top-2 h-4 cursor-ns-resize touch-none" {...drag} />
            )}
            <div
              role={safety ? 'slider' : undefined}
              tabIndex={safety ? 0 : undefined}
              aria-label={safety ? copy.safety : undefined}
              aria-valuemin={safety?.min}
              aria-valuemax={safety?.max}
              aria-valuenow={safety ? buffer : undefined}
              aria-valuetext={safety ? vnd(buffer) : undefined}
              onKeyDown={onKey}
              {...drag}
              className={`absolute right-0 top-0 flex -translate-y-1/2 items-center gap-1 rounded-full border border-amber bg-bg-surface px-2.5 py-0.5 text-[13px] font-semibold text-amber-ink tabular-nums ${
                safety ? `cursor-ns-resize touch-none transition-transform duration-150 hover:scale-105 ${dragging ? 'scale-105 shadow-md' : ''}` : '' /* taste-skill-ignore: lifted while dragged */
              }`}
            >
              {safety && (
                <svg aria-hidden viewBox="0 0 10 14" className="h-3 w-2.5 fill-current">
                  <path d="M5 0 9.5 5h-9zM5 14 .5 9h9z" />
                </svg>
              )}
              {vndCompact(buffer)}
            </div>
          </div>

          {shown && hover !== null && (
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-full z-20 mb-2 w-[220px] rounded-lg border border-border-main bg-bg-surface p-3 text-[13px] shadow-lg" /* taste-skill-ignore: tooltip overlay */
              style={{
                left: `${((hover + 0.5) / weeks.length) * 100}%`,
                transform: `translateX(${hover < 3 ? '-12%' : hover > 9 ? '-88%' : '-50%'})`,
              }}
            >
              <p className="font-semibold text-text-primary">
                {copy.week} {shown.weekNumber} · {weekRange(shown.startDate, shown.endDate)}
              </p>
              <p className="mt-1 flex justify-between gap-3">
                <span className="text-text-secondary">{copy.closing}</span>
                <span className="num font-semibold tabular-nums text-text-primary">{vnd(shown.closingBalance)}</span>
              </p>
              {shownBefore && shownBefore.closingBalance !== shown.closingBalance && (
                <p className="flex justify-between gap-3">
                  <span className="text-text-secondary">{copy.before}</span>
                  <span className="num tabular-nums text-text-muted">{vnd(shownBefore.closingBalance)}</span>
                </p>
              )}
              <p className="flex justify-between gap-3">
                <span className="text-text-secondary">
                  {copy.in} / {copy.out}
                </span>
                <span className="num tabular-nums text-text-primary">
                  +{vndCompact(shown.inflow)} / −{vndCompact(shown.outflow)}
                </span>
              </p>
              <p className={`mt-1 ${INK[alertLevel(shown.closingBalance, buffer)]}`}>
                {copy.levels[alertLevel(shown.closingBalance, buffer)]}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 flex gap-[3px] pl-12 text-[13px] text-text-muted tabular-nums" aria-hidden>
        {weeks.map((w, i) => (
          <span key={w.weekNumber} className={`flex-1 text-center ${hover === i ? 'font-semibold text-text-primary' : ''}`}>
            {w.weekNumber}
          </span>
        ))}
      </div>
    </div>
  );
}
