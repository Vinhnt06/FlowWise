'use client';

import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { shiftEventDate } from '@/lib/finance-engine';
import {
  WORKED_EXAMPLE_BUFFER,
  WORKED_EXAMPLE_DEFER_DAYS,
  WORKED_EXAMPLE_DEFER_ID,
  WORKED_EXAMPLE_EVENTS,
  forecastWorkedExample,
} from '@/data/worked-example';
import { hero } from '@/content/landing';
import { vnd } from '@/lib/format';
import WeekBars from './WeekBars';

const MAX = 400_000_000;

/**
 * The hero's working fragment: the spec's worked example run through the engine,
 * with one switch that delays bill E05 by 14 days (scenario S1).
 */
export default function ForecastFragment() {
  const copy = hero.fragment;
  const [deferred, setDeferred] = useState(false);
  const [selected, setSelected] = useState(1);

  const summary = useMemo(
    () =>
      forecastWorkedExample(
        deferred
          ? shiftEventDate(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, WORKED_EXAMPLE_DEFER_DAYS)
          : WORKED_EXAMPLE_EVENTS
      ),
    [deferred]
  );

  const firstBelow = summary.weeks.find((w) => w.isBreached);

  return (
    <div data-ui className="w-[620px] max-w-[calc(100vw-48px)] rounded-lg bg-bg-surface p-6 shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-[15px] font-semibold text-text-primary">{copy.title}</p>
          <p className="text-[13px] text-text-secondary">{copy.subtitle}</p>
        </div>
        <span className="rounded-sm bg-amber-surface px-2 py-1 text-[13px] font-medium text-amber-ink">{copy.sample}</span>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={deferred}
        onClick={() => setDeferred((d) => !d)}
        className="press mt-5 flex w-full items-center gap-3 rounded-lg border border-border-main bg-bg-surface-subtle px-3 py-2.5 text-left text-[14px] hover:border-border-strong"
      >
        <span
          className={`relative h-5 w-9 shrink-0 rounded-full transition-colors duration-200 ${deferred ? 'bg-primary' : 'bg-border-strong'}`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${deferred ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
          />
        </span>
        <span className="font-medium text-text-primary">{copy.toggle}</span>
      </button>

      <p
        className={`mt-4 flex items-center gap-2 text-[14px] font-medium ${firstBelow ? 'text-crimson-ink' : 'text-positive'}`}
        aria-live="polite"
      >
        {firstBelow ? <AlertTriangle className="h-4 w-4" aria-hidden /> : <CheckCircle2 className="h-4 w-4" aria-hidden />}
        {firstBelow ? copy.below(firstBelow.weekNumber, vnd(firstBelow.deficitAmount)) : copy.clear}
      </p>

      <div className="mt-4 flex items-center justify-between text-[13px] text-text-secondary">
        <span>
          {copy.safety}: <span className="num tabular-nums">{vnd(WORKED_EXAMPLE_BUFFER)}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden className="safety-line inline-block w-4" />
          {copy.safety}
        </span>
      </div>

      <div className="mt-3">
        <WeekBars
          weeks={summary.weeks}
          buffer={WORKED_EXAMPLE_BUFFER}
          max={MAX}
          selected={selected}
          onSelect={setSelected}
          height={180}
          label={copy.subtitle}
        />
      </div>
    </div>
  );
}
