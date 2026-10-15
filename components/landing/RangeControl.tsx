'use client';

interface RangeControlProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  /** Labels printed under both ends of the track */
  ends: [string, string];
  /** Sets the width of the value so the row does not shift as it changes */
  displayWidth?: string;
  onChange: (value: number) => void;
}

/**
 * The landing's live control: a native range input with its value on the right and the
 * two ends of its range under the track.
 */
export default function RangeControl({
  id, label, value, min, max, step, display, ends, displayWidth = '16ch', onChange,
}: RangeControlProps) {
  return (
    <div className="mt-5">
      <div className="flex items-baseline justify-between gap-4 text-[15px]">
        <label htmlFor={id} className="text-text-secondary">{label}</label>
        <output
          htmlFor={id}
          className="num shrink-0 text-right font-semibold tabular-nums text-text-primary"
          style={{ minWidth: displayWidth }}
        >
          {display}
        </output>
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
        style={{ ['--fill' as string]: `${((value - min) / (max - min)) * 100}%` }}
      />
      <div className="flex justify-between text-[13px] text-text-muted tabular-nums" aria-hidden>
        <span>{ends[0]}</span>
        <span>{ends[1]}</span>
      </div>
    </div>
  );
}
