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
    { href: '#try', label: 'Try a fix' },
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
  items: [
    {
      code: 'VND',
      role: 'Where you sell',
      detail: 'Platform payouts, salaries, rent, packaging.',
      image: '/images/world/saigon-traffic-ovbn3helda0-poster.jpg',
      video: '/images/world/saigon-traffic-ovbn3helda0.webm',
      alt: 'Rush-hour motorbike traffic crossing a bridge in Saigon',
      width: 854,
      height: 480,
    },
    {
      code: 'CNY',
      role: 'Where you buy',
      detail: 'Supplier bills from Yiwu, Guangzhou and 1688 stay in yuan.',
      image: '/images/world/yiwu-international-trade-market-district-3-gate.jpg',
      alt: 'Gate 67 of the Yiwu International Trade Market with its floor directory sign',
      width: 1920,
      height: 1440,
    },
    {
      code: 'USD',
      role: 'What you ship and advertise',
      detail: 'Freight and ad spend paid in dollars.',
      image: '/images/world/navire-conteneur-seaspan-saigon-au-port.jpg',
      alt: 'The container ship Seaspan Saigon loaded with containers, with two tugboats alongside',
      width: 1920,
      height: 1440,
    },
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
  image: {
    src: '/images/world/several-500-000-dong-banknotes-fanned-out.jpg',
    alt: 'Fifteen 500,000-dong banknotes fanned out into a circle on a cloth',
    width: 1920,
    height: 2560,
  },
};

export const cta = {
  lines: ['Try it on the', 'sample shop'],
  image: {
    src: '/images/world/ben-thanh-market-saigon.jpg',
    alt: 'Ben Thanh Market clock tower in Saigon on an overcast day',
    width: 1920,
    height: 1440,
  },
  action: 'Open the demo',
  note: 'No sign-up. The demo runs on simulated data from a made-up shop.',
};

export const footer = {
  statement: 'FlowWise is a 13-week cash forecast for online shops in Vietnam, built for Fintechathon 2026.',
  legal: 'All figures on this page are simulated.',
  navHeading: 'On this page',
  invitation: 'Open the demo',
  creditsHeading: 'Pictures',
};
