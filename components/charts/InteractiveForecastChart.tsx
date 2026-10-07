'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Currency, WeeklyForecast } from '@/types/finance';
import { formatCurrencyAmount } from '@/lib/finance-engine';
import { AlertTriangle, ArrowUpRight, ArrowDownRight, ShieldCheck, Zap } from 'lucide-react';

interface InteractiveForecastChartProps {
  weeks: WeeklyForecast[];
  currency: Currency;
  bufferThreshold: number;
  selectedWeek?: number;
  onSelectWeek?: (weekNumber: number) => void;
  onNavigateToSimulator?: () => void;
  comparisonWeeks?: WeeklyForecast[];
  heightClassName?: string;
  showScrubber?: boolean;
}

export default function InteractiveForecastChart({
  weeks,
  currency,
  bufferThreshold,
  selectedWeek = 2,
  onSelectWeek,
  onNavigateToSimulator,
  comparisonWeeks,
  heightClassName = 'h-72 sm:h-96',
  showScrubber = true,
}: InteractiveForecastChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(1000);
  const [hoveredWeekIndex, setHoveredWeekIndex] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(Math.max(600, containerRef.current.clientWidth));
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Active week index (0-indexed): prioritize hover, fallback to selectedWeek
  const activeIndex = hoveredWeekIndex !== null 
    ? hoveredWeekIndex 
    : Math.max(0, Math.min(weeks.length - 1, selectedWeek - 1));

  const activeWeekData = weeks[activeIndex] || weeks[0];
  const activeComparisonData = comparisonWeeks ? comparisonWeeks[activeIndex] : null;

  // Chart coordinate space configuration
  const chartWidth = containerWidth;
  const chartHeight = 340;
  const paddingLeft = 70;
  const paddingRight = 35;
  const paddingTop = 45;
  const paddingBottom = 45;
  const plotWidth = chartWidth - paddingLeft - paddingRight;
  const plotHeight = chartHeight - paddingTop - paddingBottom;
  const baselineY = chartHeight - paddingBottom;

  // Calculate Value Domain
  const allValues = weeks.map((w) => w.closingBalance).concat(bufferThreshold);
  if (comparisonWeeks) {
    comparisonWeeks.forEach((w) => allValues.push(w.closingBalance));
  }
  const minVal = Math.min(0, ...allValues);
  const rawMaxVal = Math.max(...allValues);
  // Add 12% headroom so the curve doesn't clip top edge
  const maxVal = rawMaxVal > 0 ? rawMaxVal * 1.12 : 100;
  const valueRange = maxVal - minVal || 1;

  // Scaling helpers
  const getX = (index: number) => {
    const step = plotWidth / (weeks.length - 1);
    return paddingLeft + index * step;
  };

  const getY = (val: number) => {
    const ratio = (val - minVal) / valueRange;
    return baselineY - ratio * plotHeight;
  };

  const bufferY = getY(bufferThreshold);

  // Currency Accent Colors
  const getCurrencyTheme = (c: Currency) => {
    switch (c) {
      case 'VND':
        return {
          stroke: '#10B981',
          gradientStart: 'rgba(16, 185, 129, 0.28)',
          gradientEnd: 'rgba(16, 185, 129, 0.0)',
          badgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
          dot: '#10B981',
        };
      case 'CNY':
        return {
          stroke: '#F97316',
          gradientStart: 'rgba(249, 115, 22, 0.28)',
          gradientEnd: 'rgba(249, 115, 22, 0.0)',
          badgeBg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
          dot: '#F97316',
        };
      case 'USD':
        return {
          stroke: '#38BDF8',
          gradientStart: 'rgba(56, 189, 248, 0.28)',
          gradientEnd: 'rgba(56, 189, 248, 0.0)',
          badgeBg: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
          dot: '#38BDF8',
        };
    }
  };

  const theme = getCurrencyTheme(currency);

  // Compute points for baseline
  const baselinePoints = weeks.map((w, i) => ({
    x: getX(i),
    y: getY(w.closingBalance),
    week: w,
  }));

  // Helper: Smooth Catmull-Rom to Cubic Bezier Spline
  const generateSpline = (pts: { x: number; y: number }[]) => {
    if (pts.length === 0) return { path: '', area: '' };
    if (pts.length === 1) return { path: `M ${pts[0].x} ${pts[0].y}`, area: '' };

    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    const tension = 0.2;

    for (let i = 0; i < pts.length - 1; i++) {
      const pPrev = pts[Math.max(i - 1, 0)];
      const pCurr = pts[i];
      const pNext = pts[i + 1];
      const pNextNext = pts[Math.min(i + 2, pts.length - 1)];

      const cp1x = pCurr.x + (pNext.x - pPrev.x) * tension;
      const cp1y = Math.max(paddingTop - 12, Math.min(baselineY + 8, pCurr.y + (pNext.y - pPrev.y) * tension));
      const cp2x = pNext.x - (pNextNext.x - pCurr.x) * tension;
      const cp2y = Math.max(paddingTop - 12, Math.min(baselineY + 8, pNext.y - (pNextNext.y - pCurr.y) * tension));

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${pNext.x.toFixed(1)} ${pNext.y.toFixed(1)}`;
    }

    const first = pts[0];
    const last = pts[pts.length - 1];
    const area = `${d} L ${last.x.toFixed(1)} ${baselineY} L ${first.x.toFixed(1)} ${baselineY} Z`;

    return { path: d, area };
  };

  const { path: baselinePath, area: baselineArea } = generateSpline(baselinePoints);

  // Comparison points and spline if provided
  let comparisonSpline: { path: string; area: string } | null = null;
  if (comparisonWeeks && comparisonWeeks.length > 0) {
    const compPoints = comparisonWeeks.map((w, i) => ({
      x: getX(i),
      y: getY(w.closingBalance),
    }));
    comparisonSpline = generateSpline(compPoints);
  }

  // Generate 4 clean horizontal grid ticks
  const gridTicks = [1.0, 0.66, 0.33, 0].map((ratio) => {
    const val = minVal + ratio * valueRange;
    const y = getY(val);
    let label = '';
    if (currency === 'VND') {
      label = val >= 1_000_000 ? `${Math.round(val / 1_000_000)}M` : `${Math.round(val)}`;
    } else if (currency === 'CNY') {
      label = val >= 1_000 ? `¥${Math.round(val / 1_000)}k` : `¥${Math.round(val)}`;
    } else {
      label = val >= 1_000 ? `$${Math.round(val / 1_000)}k` : `$${Math.round(val)}`;
    }
    return { val, y, label };
  });

  // Mouse / Touch scrub handler
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - rect.left) / rect.width;
      const svgX = relativeX * chartWidth;

      // Find nearest week index
      const exactIndex = ((svgX - paddingLeft) / plotWidth) * (weeks.length - 1);
      const clampedIndex = Math.max(0, Math.min(weeks.length - 1, Math.round(exactIndex)));

      setHoveredWeekIndex(clampedIndex);
      setIsHovering(true);
    },
    [weeks.length, plotWidth, paddingLeft]
  );

  const handlePointerLeave = () => {
    setIsHovering(false);
    setHoveredWeekIndex(null);
  };

  const handlePointClick = (weekIndex: number) => {
    if (onSelectWeek) {
      onSelectWeek(weekIndex + 1);
    }
  };

  // Active point coordinates
  const activeX = getX(activeIndex);
  const activeY = baselinePoints[activeIndex]?.y ?? baselineY;

  // Tooltip positioning logic (auto-flip on right side)
  const isRightSide = activeIndex > 8;
  const isLeftSide = activeIndex < 3;

  return (
    <div className="space-y-4 select-none">
      {/* Chart Canvas Container */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`relative ${heightClassName} w-full rounded-xl overflow-hidden cursor-crosshair touch-none`}
      >
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          fill="none"
        >
          <defs>
            {/* Area Gradient */}
            <linearGradient id={`chart-grad-${currency}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.gradientStart} />
              <stop offset="85%" stopColor={theme.gradientEnd} />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>

            {/* Comparison Gradient */}
            <linearGradient id="chart-comp-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.35)" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines & Y-Axis Labels */}
          {gridTicks.map((tick, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={tick.y}
                x2={chartWidth - paddingRight}
                y2={tick.y}
                stroke="currentColor"
                className="text-border-subtle"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={paddingLeft - 12}
                y={tick.y + 4}
                textAnchor="end"
                fill="currentColor"
                className="text-text-muted"
                fontSize="11"
                fontFamily="monospace"
              >
                {tick.label}
              </text>
            </g>
          ))}

          {/* Minimum Safe Buffer Line */}
          <line
            x1={paddingLeft}
            y1={bufferY}
            x2={chartWidth - paddingRight}
            y2={bufferY}
            stroke="#EF4444"
            strokeWidth="1.5"
            strokeDasharray="6 4"
          />
          <text
            x={chartWidth - paddingRight}
            y={bufferY - 7}
            textAnchor="end"
            fill="#EF4444"
            fontSize="11"
            fontFamily="monospace"
            fontWeight="bold"
          >
            Safe Buffer: {formatCurrencyAmount(bufferThreshold, currency)}
          </text>

          {/* Comparison Area & Line (if available, e.g. in Simulator) */}
          {comparisonSpline && (
            <>
              <path d={comparisonSpline.area} fill="url(#chart-comp-grad)" />
              <path
                d={comparisonSpline.path}
                stroke="#10B981"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}

          {/* Primary Spline Area Fill */}
          <path d={baselineArea} fill={`url(#chart-grad-${currency})`} />

          {/* Primary Spline Curve */}
          <path
            d={baselinePath}
            stroke={comparisonSpline ? '#EF4444' : theme.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={comparisonSpline ? '4 3' : 'none'}
          />

          {/* Interactive Scrubbing Crosshair (Vertical Line) */}
          {(isHovering || hoveredWeekIndex !== null) && (
            <g>
              <line
                x1={activeX}
                y1={paddingTop - 10}
                x2={activeX}
                y2={baselineY}
                stroke="currentColor"
                className="text-primary"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              {/* Highlight bar behind the vertical track */}
              <line
                x1={activeX}
                y1={paddingTop - 10}
                x2={activeX}
                y2={baselineY}
                stroke="currentColor"
                className="text-primary/10"
                strokeWidth="12"
              />
            </g>
          )}

          {/* Interactive Data Points */}
          {baselinePoints.map((pt, i) => {
            const isSelected = activeIndex === i;
            const isBreach = pt.week.isBreached;

            return (
              <g
                key={i}
                onClick={() => handlePointClick(i)}
                className="cursor-pointer group"
              >
                {/* Deficit Pulsing Aura */}
                {isBreach && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 13 : 9}
                    fill="#EF4444"
                    fillOpacity="0.35"
                    className="animate-pulse"
                  />
                )}

                {/* Point Active Focus Halo */}
                {isSelected && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={10}
                    fill={isBreach ? '#EF4444' : theme.dot}
                    fillOpacity="0.2"
                  />
                )}

                {/* Main Data Point Circle */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelected ? 6 : isBreach ? 5.5 : 4}
                  fill={isBreach ? '#EF4444' : theme.dot}
                  stroke="currentColor"
                  className="text-bg-surface transition-all duration-150"
                  strokeWidth="2"
                />

                {/* Week Label on Bottom Axis */}
                <text
                  x={pt.x}
                  y={baselineY + 22}
                  textAnchor="middle"
                  fill="currentColor"
                  className={
                    isSelected
                      ? 'text-primary font-bold'
                      : isBreach
                      ? 'text-crimson font-bold'
                      : 'text-text-muted font-normal'
                  }
                  fontSize="11"
                  fontFamily="monospace"
                >
                  W{pt.week.weekNumber}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Interactive Tooltip Popover */}
        <div
          className={`absolute pointer-events-none transition-all duration-75 z-30 ${
            isRightSide ? '-translate-x-full pr-4' : isLeftSide ? 'translate-x-4' : '-translate-x-1/2'
          }`}
          style={{
            left: `${Math.min(Math.max((activeX / chartWidth) * 100, 16), 84)}%`,
            top: '12px',
          }}
        >
          <div className="bg-bg-surface/95 backdrop-blur-md border border-border-strong rounded-xl p-3 shadow-xl min-w-[220px] max-w-[280px] pointer-events-auto transition-colors">
            {/* Header: Week number & Dates */}
            <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-border-subtle">
              <span className="font-mono text-xs font-bold text-text-primary flex items-center gap-1.5">
                <span>{activeWeekData.weekLabel}</span>
                <span className="text-[10px] text-text-muted font-normal">
                  ({activeWeekData.startDate.slice(5)} &rarr; {activeWeekData.endDate.slice(5)})
                </span>
              </span>

              {activeWeekData.isBreached ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-crimson/15 text-crimson px-1.5 py-0.5 rounded border border-crimson/30">
                  <AlertTriangle className="w-2.5 h-2.5" />
                  DEFICIT
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  SAFE
                </span>
              )}
            </div>

            {/* Closing Balance Display */}
            <div className="mb-2">
              <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block">
                Closing Liquidity
              </span>
              <div className="flex items-baseline justify-between gap-2">
                <span className={`text-base font-mono font-bold tabular-nums ${
                  activeWeekData.isBreached ? 'text-crimson' : 'text-text-primary'
                }`}>
                  {formatCurrencyAmount(activeWeekData.closingBalance, currency)}
                </span>
                {activeComparisonData && (
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    &rarr; {formatCurrencyAmount(activeComparisonData.closingBalance, currency)}
                  </span>
                )}
              </div>
            </div>

            {/* Inflow vs Outflow Mini-Stats */}
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-1 border-t border-border-subtle">
              <div>
                <span className="text-text-muted text-[10px] flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3 text-emerald-500" /> Inflows
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold tabular-nums">
                  +{formatCurrencyAmount(activeWeekData.inflow, currency)}
                </span>
              </div>
              <div>
                <span className="text-text-muted text-[10px] flex items-center gap-0.5">
                  <ArrowDownRight className="w-3 h-3 text-crimson" /> Outflows
                </span>
                <span className="text-crimson font-semibold tabular-nums">
                  -{formatCurrencyAmount(activeWeekData.outflow, currency)}
                </span>
              </div>
            </div>

            {/* Deficit Alert & Fast-Action Link */}
            {activeWeekData.isBreached && onNavigateToSimulator && (
              <div className="mt-2.5 pt-2 border-t border-border-subtle">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigateToSimulator();
                  }}
                  className="w-full py-1.5 px-2 rounded-lg bg-amber text-black hover:bg-amber/90 text-[11px] font-bold font-mono flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Zap className="w-3 h-3 fill-current" />
                  <span>Mitigate Deficit in Simulator &rarr;</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Week Selector Scrubber Bar */}
      {showScrubber && (
        <div className="pt-2 flex items-center justify-between gap-1 overflow-x-auto pb-1 scrollbar-none">
          <div className="text-[11px] font-mono text-text-muted pr-2 hidden sm:block">
            SCRUB TIMELINE:
          </div>
          <div className="flex items-center gap-1 flex-1 justify-between sm:justify-start">
            {weeks.map((w, idx) => {
              const isSelected = activeIndex === idx;
              const isBreach = w.isBreached;

              return (
                <button
                  key={w.weekNumber}
                  type="button"
                  onClick={() => handlePointClick(idx)}
                  className={`px-2 py-1 rounded-md text-[11px] font-mono transition-all flex items-center gap-1 border ${
                    isSelected
                      ? 'bg-primary text-white border-primary font-bold shadow-xs'
                      : isBreach
                      ? 'bg-crimson/10 text-crimson border-crimson/30 hover:bg-crimson/20 font-semibold'
                      : 'bg-bg-surface-elevated text-text-muted hover:text-text-primary border-border-main'
                  }`}
                  title={`${w.weekLabel} (${w.startDate})`}
                >
                  <span>W{w.weekNumber}</span>
                  {isBreach && <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
