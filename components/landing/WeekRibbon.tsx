import { WeeklyForecast } from '@/types/finance';
import { alertLevel, AlertLevel } from '@/lib/scenarios';

const CELL: Record<AlertLevel, string> = {
  OK: 'bg-primary',
  BELOW_BUFFER: 'bg-amber',
  SHORTFALL: 'bg-crimson',
};

const LEVEL_TEXT: Record<AlertLevel, string> = {
  OK: 'above safety',
  BELOW_BUFFER: 'below safety',
  SHORTFALL: 'short of cash',
};

/**
 * Thirteen weeks as thirteen cells, coloured by warning level. The count of each level is
 * written next to it, so the state never depends on colour alone. Cells recolour in a wave.
 */
export default function WeekRibbon({ weeks, buffer, label }: { weeks: WeeklyForecast[]; buffer: number; label: string }) {
  const levels = weeks.map((w) => alertLevel(w.closingBalance, buffer));
  const below = levels.filter((l) => l === 'BELOW_BUFFER').length;
  const short = levels.filter((l) => l === 'SHORTFALL').length;

  return (
    <div>
      <ol className="wave grid grid-cols-13 gap-[2px]" aria-label={label}>
        {weeks.map((w, i) => (
          <li
            key={w.weekNumber}
            className={`h-7 rounded-[4px] ${CELL[levels[i]]}`}
            style={{ ['--i' as string]: i }}
            title={`Week ${w.weekNumber}: ${LEVEL_TEXT[levels[i]]}`}
          >
            <span className="sr-only">
              Week {w.weekNumber}: {LEVEL_TEXT[levels[i]]}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-text-secondary" aria-live="polite">
        <span>Week 1 → 13</span>
        <span className={below ? 'font-semibold text-amber-ink' : ''}>
          {below} below safety
        </span>
        <span className={short ? 'font-semibold text-crimson-ink' : ''}>
          {short} short of cash
        </span>
      </p>
    </div>
  );
}
