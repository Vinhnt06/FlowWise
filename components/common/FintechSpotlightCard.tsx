'use client';

import React, { useRef } from 'react';

interface FintechSpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

export default function FintechSpotlightCard({
  children,
  spotlightColor = 'rgba(16, 185, 129, 0.12)',
  className = '',
  ...props
}: FintechSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--spotlight-x', `${x}px`);
    cardRef.current.style.setProperty('--spotlight-y', `${y}px`);
    cardRef.current.style.setProperty('--spotlight-opacity', '1');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--spotlight-opacity', '0');
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        {
          '--spotlight-x': '-1000px',
          '--spotlight-y': '-1000px',
          '--spotlight-opacity': '0',
        } as React.CSSProperties
      }
      className={`relative overflow-hidden transition-all duration-200 ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Radial Glow - GPU rendered with CSS variables, 0 React re-renders */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: 'var(--spotlight-opacity)',
          background: `radial-gradient(480px circle at var(--spotlight-x) var(--spotlight-y), ${spotlightColor}, transparent 70%)`,
        }}
      />
      <div className="relative z-[1] h-full w-full">{children}</div>
    </div>
  );
}
