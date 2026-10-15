/**
 * Landing page copy (English only — final team decision, spec D10).
 * Written for the shop owner or their accountant (spec D09): plain words, no treasury jargon.
 * Figures quoted here come from the spec's worked example (simulated data) — do not add
 * metrics, customers or partners that are not real.
 */

export const nav = {
  links: [
    { href: '#forecast', label: 'Forecast' },
    { href: '#how', label: 'How it works' },
    { href: '#fixes', label: 'Fixes' },
    { href: '#try', label: 'Try it' },
    { href: '#files', label: 'Files' },
  ],
  action: 'Open the demo',
};

export const hero = {
  lines: ['See the week', 'cash runs short'],
  sentence:
    'FlowWise turns your bank statement, invoices and bills into 13 weeks of balances, one currency at a time, and shows what would close the gap.',
  action: 'Open the demo',
  fragment: {
    title: 'Sample shop · VND',
    subtitle: 'Balance at the end of each week',
    sample: 'Simulated data',
    safety: 'Safety level',
    toggle: 'Pay the 130,000,000 ₫ supplier bill 14 days later',
    below: (week: number, gap: string) => `Week ${week} is ${gap} below the safety level`,
    clear: 'No week falls below the safety level',
    weekShort: 'W',
  },
};

export const trace = {
  heading: 'Every number has a source',
  statement: 'Week 2 of the sample shop closes at 150,000,000 ₫. Here is where each dong of it comes from.',
  totalLabel: 'Closing balance, week 2',
  openingLabel: 'Carried over from week 1',
  checked:
    'The sample was first worked out by hand in a spreadsheet. The calculation in the app is checked against it on every change.',
};

export const showcase = {
  intro: 'What the forecast shows you',
  panels: [
    {
      id: 'week',
      name: 'Why week 2 is low',
      lines:
        'Every warning names the three items that move that week the most, and the file each one came from.',
    },
    {
      id: 'options',
      name: 'Before and after a fix',
      lines:
        'A fix is a change to dated items, run through the same calculation, so the two plans compare like for like.',
    },
    {
      id: 'payout',
      name: 'A payout that does not add up',
      lines:
        'Each settlement line is recomputed. When the total is off, you see by how much and on which row.',
    },
    {
      id: 'check',
      name: 'Rows worth a second look',
      lines:
        'Duplicates, unreadable dates and foreign-currency bills are flagged. Nothing is deleted without you.',
    },
    {
      id: 'ask',
      name: 'Ask in plain words',
      lines:
        'The assistant reads the forecast and explains it. Every number it says comes from the calculation.',
    },
  ],
};

export const how = {
  heading: 'From files to a plan',
  stages: [
    { name: 'Files', clause: 'Add the files you already have' },
    { name: 'Check', clause: 'Check what was read' },
    { name: 'Forecast', clause: 'See the next 13 weeks' },
    { name: 'Approve', clause: 'Pick a fix and approve it' },
  ],
  sliderLabel: 'Stage',
};

export const fixes = {
  heading: 'Three ways to close the gap',
  sentence: 'Each fix is a change to dated items, run through the same calculation, and shown with what it costs.',
  items: [
    {
      id: 'delay',
      name: 'Pay a bill later',
      lines: 'Move a bill marked as flexible. The forecast runs again with the new date.',
      label: 'Pay the 130,000,000 ₫ supplier bill',
      unit: 'days later',
      cost: 'Late fee not known. Ask the supplier before you agree.',
    },
    {
      id: 'early',
      name: 'Collect an invoice early',
      lines: 'Offer a customer a discount to pay sooner. You receive less, earlier, and the discount is the cost.',
      none: 'The sample shop is paid only through platform payouts, so it has no customer invoice to collect early. Try the arithmetic with your own figures.',
      amountLabel: 'Invoice amount',
      discountLabel: 'Discount',
      receive: 'You receive',
      cost: 'Cost of the discount',
    },
    {
      id: 'loan',
      name: 'Borrow for a few weeks',
      lines: 'A short loan in the same currency as the gap. Every weekly repayment comes back out of the forecast.',
      amountLabel: 'Amount',
      weeksLabel: 'Repaid over',
      rateLabel: 'Yearly rate (assumed)',
      assumption: 'The rate is an assumption. Use the quote from your bank.',
    },
  ],
  result: {
    lowest: 'Lowest balance',
    weeksBelow: 'Weeks below safety',
    cost: 'Cost',
    owedAfter: 'Still owed after week 13',
    weeks: '13 weeks at a glance',
  },
  compare: {
    heading: 'Side by side',
    asIs: 'As is',
    needsInvoice: 'Needs an invoice',
    unknown: 'Not known',
  },
  levels: { OK: 'Above safety', BELOW_BUFFER: 'Below safety', SHORTFALL: 'Short of cash' },
};

export const tryFix = {
  heading: 'Try a fix yourself',
  output: {
    title: 'Sample shop · VND',
    lowest: 'Lowest balance',
    firstBelow: 'First week below safety',
    weeksBelow: 'Weeks below safety',
    week13: 'Balance after week 13',
    none: 'None',
    sample: 'Simulated data',
    shortfall: 'Short of cash',
  },
  blocks: [
    {
      id: 'delay',
      sentence: 'Move a supplier bill',
      paragraph:
        'Bills marked as flexible can be paid later. Drag to see where the 130,000,000 ₫ payment lands.',
      label: 'Days later',
    },
    {
      id: 'buffer',
      sentence: 'Set your safety level',
      paragraph:
        'The lowest balance you are comfortable with. Under it you get a warning; under zero, a shortfall.',
      label: 'Safety level',
    },
    {
      id: 'payoutDelay',
      sentence: 'Assume payouts come late',
      paragraph:
        'Add a few days to every platform payout and see whether the plan still holds.',
      label: 'Days late',
    },
    {
      id: 'opening',
      sentence: 'Start from another balance',
      paragraph: 'Change what is in the account on the cut-off date, 12 October 2026 in this sample.',
      label: 'Opening balance',
    },
  ],
};

export const currencies = {
  heading: 'Three balances, never added up',
  statement:
    'Dong for daily costs, yuan for suppliers on 1688, dollars for ads and freight. FlowWise never converts one into another, so a healthy yuan balance cannot hide a dong shortfall.',
  table: {
    title: 'Balances by currency',
    sample: 'Simulated data',
    columns: { currency: 'Currency', use: 'Used for', now: 'On the cut-off date', safety: 'Safety level', lowest: 'Lowest week', weeks: '13 weeks' },
    total: 'All currencies together',
    totalValue: 'Not added up',
    totalNote: 'No exchange rate is applied anywhere. Each balance is planned on its own.',
  },
  items: [
    { code: 'VND', role: 'Where you sell', detail: 'Platform payouts, salaries, rent, packaging' },
    { code: 'CNY', role: 'Where you buy', detail: 'Supplier bills from Yiwu, Guangzhou and 1688' },
    { code: 'USD', role: 'What you ship and advertise', detail: 'Freight and ad spend' },
  ],
};

export const files = {
  heading: 'Files it reads',
  groups: [
    {
      label: 'Needed',
      rows: [
        { name: 'Bank statement', value: 'date, amount or debit and credit' },
        { name: 'Money customers owe you', value: 'invoice no., due date, amount' },
        { name: 'Bills you have to pay', value: 'bill no., due date, amount' },
        { name: 'Regular costs', value: 'name, amount, weekly or monthly' },
      ],
    },
    {
      label: 'Optional',
      rows: [
        { name: 'Platform settlement report', value: 'gross, fees, refunds, shipping, hold' },
        { name: 'Existing loans', value: 'balance, rate, next payment' },
      ],
    },
    {
      label: 'You type in',
      rows: [
        { name: 'Cut-off date', value: 'week 1 starts here' },
        { name: 'Opening balance', value: 'one per currency' },
        { name: 'Safety level', value: 'one per currency' },
      ],
    },
    {
      label: 'Sample files',
      rows: [
        { name: 'Bank statement', value: 'CSV', href: '/sample-data/bank_statement_sample.csv' },
        { name: 'Shopee settlement', value: 'CSV', href: '/sample-data/shopee_settlement_sample.csv' },
        { name: 'TikTok Shop income', value: 'CSV', href: '/sample-data/tiktok_shop_income_sample.csv' },
        { name: 'Supplier invoices (1688)', value: 'CSV', href: '/sample-data/supplier_invoices_1688.csv' },
      ],
    },
  ],
  formats: 'CSV or XLSX, UTF-8, dates as DD/MM/YYYY or YYYY-MM-DD.',
};

export const promises = {
  heading: 'What it will not do',
  items: [
    'Add dong, yuan and dollars into one total.',
    'Make up a number. The assistant repeats only what the calculation returned.',
    'Move money or take a loan. It plans; you act.',
    'Delete a row it thinks is a duplicate. It asks you first.',
  ],
  check: {
    title: 'Answer check',
    sample: 'Simulated data',
    question: 'Which week does my VND balance drop below the safety level?',
    found: 'Found in the calculation',
    sources: { closing: 'Week 2 closing balance', gap: 'Gap to the safety level', buffer: 'Your safety level' },
    verdict: 'Every number in this answer was found in the calculation, so it can be sent.',
  },
};

export const cta = {
  lines: ['Try it on the', 'sample shop'],
  report: {
    title: 'Cash plan · Sample shop · VND',
    file: 'PDF',
    rows: {
      asOf: 'Cut-off date',
      plan: 'Plan',
      planValue: 'Pay bill E05 14 days later',
      lowest: 'Lowest balance',
      weeksBelow: 'Weeks below safety',
      assumed: 'Assumed',
      assumedValue: 'Platform payouts arrive on time',
    },
    approve: 'Approve this plan',
    note: 'Approving records the plan and its assumptions. No money moves.',
  },
  action: 'Open the demo',
  note: 'No sign-up. The demo runs on simulated data from a made-up shop.',
};

export const footer = {
  statement: 'FlowWise is a 13-week cash forecast for online shops in Vietnam, built for Fintechathon 2026.',
  legal: 'All figures on this page are simulated.',
  navHeading: 'On this page',
  invitation: 'Open the demo',
};
