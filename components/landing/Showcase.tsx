'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, AlertTriangle, Info } from 'lucide-react';
import { shiftEventDate } from '@/lib/finance-engine';
import {
  WORKED_EXAMPLE_BUFFER,
  WORKED_EXAMPLE_DEFER_DAYS,
  WORKED_EXAMPLE_DEFER_ID,
  WORKED_EXAMPLE_EVENTS,
  forecastWorkedExample,
} from '@/data/worked-example';
import { showcase } from '@/content/landing';
import { vnd, vndSigned, weekRange } from '@/lib/format';

const baseline = forecastWorkedExample(WORKED_EXAMPLE_EVENTS);
const deferred = forecastWorkedExample(
  shiftEventDate(WORKED_EXAMPLE_EVENTS, WORKED_EXAMPLE_DEFER_ID, WORKED_EXAMPLE_DEFER_DAYS)
);
const week2 = baseline.weeks[1];
const week2Events = WORKED_EXAMPLE_EVENTS.filter((e) => e.date >= week2.startDate && e.date <= week2.endDate)
  .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
  .slice(0, 3);
const SOURCE: Record<string, string> = {
  payable: 'bills.csv',
  recurring: 'regular-costs.csv',
  settlement: 'shopee-settlement.xlsx',
};

const shortDay = (iso: string) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

function Row({ label, value, strong, tone }: { label: string; value: string; strong?: boolean; tone?: 'bad' | 'warn' | 'good' }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <span className="text-text-secondary">{label}</span>
      <span
        className={`num tabular-nums ${strong ? 'font-semibold text-text-primary' : 'text-text-primary'} ${
          tone === 'bad' ? 'text-crimson-ink' : tone === 'warn' ? 'text-amber-ink' : tone === 'good' ? 'text-positive' : ''
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function PanelShell({ title, children, badge }: { title: string; children: React.ReactNode; badge?: React.ReactNode }) {
  return (
    <div data-ui className="w-full rounded-lg bg-bg-surface p-5 text-[14px] text-text-primary shadow-lg">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-display text-[15px] font-semibold text-text-primary">{title}</p>
        {badge}
      </div>
      {children}
    </div>
  );
}

function WeekPanel() {
  return (
    <PanelShell
      title={`Week 2 · ${weekRange(week2.startDate, week2.endDate)}`}
      badge={<span className="rounded-sm bg-amber-surface px-2 py-0.5 text-[13px] font-medium text-amber-ink">Below safety level</span>}
    >
      <Row label="Opening" value={vnd(week2.openingBalance)} />
      <Row label="Money in" value={vndSigned(week2.inflow)} tone="good" />
      <Row label="Money out" value={vndSigned(-week2.outflow)} />
      <Row label="Closing" value={vnd(week2.closingBalance)} strong />
      <Row label="Short of safety level" value={vnd(week2.deficitAmount)} tone="warn" />
      <p className="mt-4 mb-1 text-[13px] font-semibold text-text-primary">Biggest items this week</p>
      <ul className="rows">
        {week2Events.map((e) => (
          <li key={e.id} className="flex items-start justify-between gap-3 py-2">
            <span>
              <span className="block text-text-primary">{e.description}</span>
              <span className="text-[13px] text-text-muted">
                {e.id} · {shortDay(e.date)} · {SOURCE[e.type]}
              </span>
            </span>
            <span className={`num tabular-nums ${e.amount > 0 ? 'text-positive' : 'text-text-primary'}`}>
              {vndSigned(e.amount)}
            </span>
          </li>
        ))}
      </ul>
    </PanelShell>
  );
}

function OptionsPanel() {
  const first = (s: typeof baseline) => s.weeks.find((w) => w.isBreached)?.weekNumber;
  const gap = (s: typeof baseline) => Math.max(...s.weeks.map((w) => w.deficitAmount));
  const rows: [string, string, string][] = [
    ['First week below safety', first(baseline) ? `Week ${first(baseline)}` : 'None', first(deferred) ? `Week ${first(deferred)}` : 'None'],
    ['Lowest balance', vnd(baseline.lowestBalance), vnd(deferred.lowestBalance)],
    ['Weeks below safety', String(baseline.breachWeeksCount), String(deferred.breachWeeksCount)],
    ['Largest gap', vnd(gap(baseline)), vnd(gap(deferred))],
    ['After week 13', vnd(baseline.weeks[12].closingBalance), vnd(deferred.weeks[12].closingBalance)],
    ['Cost', '—', 'Late fee not known'],
  ];
  return (
    <PanelShell title="Compare plans · VND">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[13px] text-text-muted">
            <th className="pb-2 font-medium" scope="col"><span className="sr-only">Measure</span></th>
            <th className="pb-2 font-medium" scope="col">As is</th>
            <th className="pb-2 font-medium text-positive" scope="col">E05 paid 14 days later</th>
          </tr>
        </thead>
        <tbody className="rows">
          {rows.map(([label, a, b]) => (
            <tr key={label}>
              <th scope="row" className="py-2 pr-3 font-normal text-text-secondary">{label}</th>
              <td className="py-2 pr-3 num tabular-nums">{a}</td>
              <td className="py-2 num font-semibold tabular-nums">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </PanelShell>
  );
}

function PayoutPanel() {
  return (
    <PanelShell
      title="Shopee settlement · 6 Oct 2026"
      badge={<span className="rounded-sm bg-amber-surface px-2 py-0.5 text-[13px] font-medium text-amber-ink">Does not add up</span>}
    >
      <Row label="Gross sales" value={vnd(45_000_000)} />
      <Row label="Platform fee" value={vnd(-5_400_000)} />
      <Row label="Refunds" value={vnd(0)} />
      <Row label="Shipping or COD" value="column missing" />
      <Row label="Held by platform" value={vnd(-4_500_000)} />
      <div className="rule-t mt-2 pt-2">
        <Row label="Recomputed payout" value={vnd(35_100_000)} />
        <Row label="Payout in the report" value={vnd(31_500_000)} strong />
        <Row label="Difference" value={vnd(-3_600_000)} tone="warn" />
      </div>
      <p className="mt-3 flex gap-2 rounded bg-amber-surface p-3 text-[13px] text-text-primary">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-ink" aria-hidden />
        Row 2 is off by 3,600,000 ₫. A shipping column may be missing from the export.
      </p>
    </PanelShell>
  );
}

function CheckPanel() {
  const items = [
    { level: 'Warning', text: '2 rows share invoice INV-2026-014', action: 'Choose one' },
    { level: 'Warning', text: 'Dates like 03/04/2026 can be read two ways', action: 'Pick format' },
    { level: 'Warning', text: '1 bill in USD inside a VND file, kept aside', action: 'Review' },
    { level: 'Info', text: '3 rows with an amount of 0 were skipped', action: 'See rows' },
  ];
  return (
    <PanelShell title="receivables.xlsx · data check">
      <ul className="rows">
        {items.map((item) => (
          <li key={item.text} className="flex items-start gap-3 py-2.5">
            {item.level === 'Warning' ? (
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-ink" aria-label="Warning" />
            ) : (
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-info" aria-label="Info" />
            )}
            <span className="flex-1 text-text-primary">{item.text}</span>
            <span className="shrink-0 rounded border border-border-main px-2 py-0.5 text-[13px] text-text-primary">{item.action}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[13px] text-text-secondary">Nothing was deleted. 3 rows wait for your decision.</p>
    </PanelShell>
  );
}

function AskPanel() {
  return (
    <PanelShell title="Ask about your forecast">
      <p className="ml-8 rounded-lg bg-bg-surface-elevated p-3 text-text-primary">
        Which week does my VND balance drop below the safety level?
      </p>
      <div className="mt-3 rounded-lg border border-border-main p-3 leading-[1.55] text-text-primary">
        Week 2 ({weekRange(week2.startDate, week2.endDate)}). It closes at {vnd(week2.closingBalance)}, which is{' '}
        {vnd(week2.deficitAmount)} under your safety level of {vnd(WORKED_EXAMPLE_BUFFER)}. The biggest item that week is
        the supplier payment of {vnd(130_000_000)} on 22 Oct.
        <p className="mt-2 text-[13px] text-text-muted">From: weekly alerts, week 2 detail · Assumed: payouts arrive on time</p>
      </div>
    </PanelShell>
  );
}

const PANELS: Record<string, () => React.ReactElement> = {
  week: WeekPanel,
  options: OptionsPanel,
  payout: PayoutPanel,
  check: CheckPanel,
  ask: AskPanel,
};

/**
 * Showcase — "Lit panel, dark row": a sideways row of product fragments on a dark field.
 * The centred panel is lit; its name and two lines sit beside it and change as it moves.
 */
export default function Showcase() {
  const rowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const update = () => {
      const center = row.scrollLeft + row.clientWidth / 2;
      let best = 0;
      let bestDistance = Infinity;
      Array.from(row.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    return () => row.removeEventListener('scroll', update);
  }, []);

  const go = (index: number) => {
    const row = rowRef.current;
    const target = row?.children[index] as HTMLElement | undefined;
    if (!row || !target) return;
    row.scrollTo({ left: target.offsetLeft + target.offsetWidth / 2 - row.clientWidth / 2, behavior: 'smooth' });
  };


  return (
    <section id="forecast" aria-label={showcase.intro} className="bg-[var(--field)] py-24 text-white lg:min-h-[96svh] lg:py-32">
      <div className="relative">
        <div
          ref={rowRef}
          className="snap-row flex items-center gap-[8vw] overflow-x-auto px-[calc(50vw-min(43vw,220px))] py-6 lg:gap-[26vw]"
        >
          {showcase.panels.map((p, i) => {
            const Panel = PANELS[p.id];
            return (
              <div
                key={p.id}
                inert={i !== active}
                className={`flex w-[min(86vw,440px)] shrink-0 transition-[opacity,transform] duration-300 ${
                  i === active ? 'opacity-100' : 'scale-[0.96] opacity-[0.22]'
                }`}
              >
                <Panel />
              </div>
            );
          })}
        </div>

        <div
          className="mt-8 px-4 sm:px-10 lg:pointer-events-none lg:absolute lg:left-[calc(50%+268px)] lg:top-6 lg:mt-0 lg:w-[min(300px,calc(26vw-80px))] lg:px-0"
          aria-live="polite"
        >
          <div className="grid">
            {showcase.panels.map((p, i) => (
              <div
                key={p.id}
                aria-hidden={i !== active}
                className={`[grid-area:1/1] transition-[opacity,translate,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  i === active ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0'
                }`}
              >
                <p className="text-[13px] font-semibold tabular-nums text-[#CBD5E1]">
                  {i + 1} / {showcase.panels.length}
                </p>
                <h2 className="mt-2 font-display text-[24px] font-semibold leading-[1.25] text-white">{p.name}</h2>
                <p className="mt-2 max-w-[34ch] text-[16px] leading-[1.6] text-[#CBD5E1]">{p.lines}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-2 lg:pointer-events-auto">
            <button
              type="button"
              onClick={() => go(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Previous panel"
              className="press grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-40"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(Math.min(showcase.panels.length - 1, active + 1))}
              disabled={active === showcase.panels.length - 1}
              aria-label="Next panel"
              className="press grid h-11 w-11 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20 disabled:opacity-40"
            >
              <ArrowRight className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
