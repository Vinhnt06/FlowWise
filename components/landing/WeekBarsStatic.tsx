import { WeeklyForecast } from '@/types/finance';
import { alertLevel } from '@/lib/scenarios';

/**
 * A small, non-interactive version of the week bars for printed fragments (the plan report).
 */
export default function WeekBarsStatic({
  weeks, buffer, max, height = 90,
}: { weeks: WeeklyForecast[]; buffer: number; max: number; height?: number }) {
  const pct = (v: number) => `${Math.max(3, Math.min(100, (v / max) * 100))}%`;
  return (
    <div className="relative" style={{ height }} aria-hidden>
      <div className="safety-line absolute inset-x-0" style={{ bottom: pct(buffer) }} />
      <div className="absolute inset-0 flex items-end gap-[2px]">
        {weeks.map((w, i) => {
          const level = alertLevel(w.closingBalance, buffer);
          return (
            <span
              key={w.weekNumber}
              className={`grow block flex-1 rounded-t-[3px] ${level === 'SHORTFALL' ? 'bg-crimson' : level === 'BELOW_BUFFER' ? 'bg-amber' : 'bg-navy'}`}
              style={{ height: pct(w.closingBalance), ['--i' as string]: i }}
            />
          );
        })}
      </div>
    </div>
  );
}
