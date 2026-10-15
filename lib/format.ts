/**
 * Display formatting for the landing page (English UI, VND figures).
 */

const fullVnd = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const compact = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 });
const shortDate = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' });

/** 150000000 → "150,000,000 ₫" */
export function vnd(amount: number): string {
  const sign = amount < 0 ? '−' : '';
  return `${sign}${fullVnd.format(Math.abs(Math.round(amount)))} ₫`;
}

/** 150000000 → "150M" */
export function vndCompact(amount: number): string {
  const sign = amount < 0 ? '−' : '';
  return `${sign}${compact.format(Math.abs(amount))}`;
}

/** Signed amount with an explicit plus: "+50,000,000 ₫" */
export function vndSigned(amount: number): string {
  return amount > 0 ? `+${vnd(amount)}` : vnd(amount);
}

/** "2026-10-19", "2026-10-25" → "19 Oct – 25 Oct" */
export function weekRange(start: string, end: string): string {
  const a = shortDate.format(new Date(`${start}T00:00:00Z`));
  const b = shortDate.format(new Date(`${end}T00:00:00Z`));
  return `${a} – ${b}`;
}

/** Amount in its own currency, never converted: "150,000,000 ₫", "¥68,000", "$12,800" */
export function money(amount: number, currency: 'VND' | 'CNY' | 'USD'): string {
  if (currency === 'VND') return vnd(amount);
  const sign = amount < 0 ? '−' : '';
  return `${sign}${currency === 'CNY' ? '¥' : '$'}${fullVnd.format(Math.abs(Math.round(amount)))}`;
}
