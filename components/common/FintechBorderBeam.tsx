'use client';

import React from 'react';

interface FintechBorderBeamProps {
  size?: number;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  borderWidth?: number;
  className?: string;
}

export default function FintechBorderBeam({
  size = 180,
  duration = 8,
  colorFrom = '#10B981',
  colorTo = '#38BDF8',
  borderWidth = 1.5,
  className = '',
}: FintechBorderBeamProps) {
  return (
    <div
      style={
        {
          '--duration': `${duration}s`,
          '--color-from': colorFrom,
          '--color-to': colorTo,
          padding: `${borderWidth}px`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        } as React.CSSProperties
      }
      className={`pointer-events-none absolute -inset-[1px] rounded-[inherit] overflow-hidden z-20 ${className}`}
    >
      <div
        className="absolute -inset-[150%] animate-spin-beam [background:conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_260deg,var(--color-from)_310deg,var(--color-to)_355deg,transparent_360deg)]"
        style={{
          animationDuration: 'var(--duration)',
        }}
      />
    </div>
  );
}
