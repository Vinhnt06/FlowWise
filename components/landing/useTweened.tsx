'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Eases a number towards its new value over `ms`, so a figure counts to its new value
 * instead of jumping. With reduced motion the new value lands on the next frame.
 */
export function useTweened(target: number, ms = 420): number {
  const [value, setValue] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = reduce ? 0 : ms;
    const from = current.current;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const k = duration === 0 ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - k, 3);
      current.current = from + (target - from) * eased;
      setValue(current.current);
      if (k < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, ms]);

  return value;
}

/** A figure that counts to its new value. `format` receives a rounded number. */
export function Ticker({ value, format }: { value: number; format: (n: number) => string }) {
  const shown = useTweened(value);
  return <>{format(Math.round(shown))}</>;
}
