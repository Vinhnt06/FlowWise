<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FlowWise project rules

## Product and source of truth

- Business spec: `FlowWise1.xlsx` (scope, data rules V01–V25, forecast logic, worked example, test cases TC01–TC26, open decisions D01–D13). Platform rules to verify: `FlowWise_Shopee_TikTok_nghiep_vu.xlsx` (R01–R28, all unverified).
- Every amount goes through a dated `CashEvent` (`types/finance.ts`). Week 1 starts on the cut-off date; currencies (VND, CNY, USD) are never converted or added together.
- The spec's worked example lives in `data/worked-example.ts`; `npm run test:spec` must keep TC01–TC08 green. `npm run test:finance` covers the older bucket-based engine.
- Never invent metrics, customers, partners or platform fee/payout figures. Anything not sourced is labelled as simulated or as an assumption.

## Language

- UI copy is **English only** (final decision, resolves D10). No i18n routing, no locale dictionaries.
- Write for the shop owner or their accountant (D09): plain words, no treasury jargon ("Cockpit", "CFO sign-off", "deterministic engine").
- Landing copy lives in `content/landing.ts` — edit words there, not inside components.

## Design

- `DESIGN.md` is the design source of truth. Its body sets typography (Plus Jakarta Sans headings, DM Sans text, Fira Code for figures), navy primary buttons, sage (`--primary`) for links and positive states, 8px radius and the elevation scale. Its frontmatter supplies dark-mode values and the VND / CNY / USD colours.
- Tokens live in `app/globals.css` (`:root` + `.dark`, exposed to Tailwind via `@theme inline`). Use tokens, never raw hex in components. Text on tinted chips uses the `*-ink` tokens (`text-amber-ink`, `text-crimson-ink`, `text-positive`) to keep 4.5:1 contrast.
- Landing page (`app/page.tsx`, `components/landing/*`) follows the `design-taste-frontend` skill: no gradients, glass, glows, eyebrow pills, icon-card grids or decorative motion. Product fragments carry `data-ui`; fragment-only styles (`.num`, `.rows`, `.rule-t`, `.safety-line`) are scoped to `[data-ui]`.
- Gate for landing changes: `node .claude/skills/design-taste-frontend/scripts/lint.mjs components/landing app/page.tsx app/globals.css` and `node .claude/skills/design-taste-frontend/scripts/inspect.mjs http://localhost:3000/ --allow mono,font-count` (Fira Code and a third typeface are mandated by DESIGN.md). Found pictures live in `public/images/world/` with `credits.json`; the footer prints the credits.
- The dashboard (`app/dashboard`, `components/dashboard/*`) is an app screen: the taste skill's house rules do not apply there.

## Skills (`.claude/skills/`)

| Skill | Use it for |
| --- | --- |
| `design-taste-frontend` | Any landing / marketing page work: direction, copy, imagery, lint + inspector gate |
| `vercel-react-view-transitions` | Route and state animations. Landing → dashboard uses `transitionTypes={['nav-forward']}`, back uses `nav-back` |
| `banner-design` | Social / OG banners and campaign visuals |
| `supabase-postgres-best-practices` | Load before any Postgres schema, migration, RLS, index or query work (backend phase, after the UI) |
| `find-skills` | Looking for a skill that covers a new kind of task |

## Workflow

- Branch per major change (`feature/<slug>`, `fix/<slug>`); conventional commits; update `CHANGELOG.md`.
- Before calling work done: `npm run build`, `npm run test:finance`, `npm run test:spec`.
