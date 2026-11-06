@AGENTS.md

# Project

Next.js (App Router) app with TypeScript and Tailwind CSS, backed by MongoDB.

## Commands

- `npm run dev` — start the dev server at http://localhost:3000
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run typecheck` — TypeScript with no emit
- `npm run test` — Vitest unit tests (`npm run test:watch` to watch)
- `npm run test:e2e` — Playwright tests in `e2e/` (starts its own dev server on port 3100)
- `npm run check` — lint + typecheck + unit tests; run this before considering a change done

## Testing

- Unit tests sit next to the code as `*.test.ts(x)` under `src/`, using Vitest and React Testing Library.
- Vitest can't render `async` Server Components; cover those with Playwright instead.
- Manual API requests are in `requests.http`.

## Structure

- `src/app/` — routes, layouts and pages (App Router)
- `src/app/api/**/route.ts` — API route handlers
- `src/components/` — shared React components
- `src/lib/mongodb.ts` — the single MongoDB client/connection helper
- `src/models/` — data types or schemas for collections

Import from `src/` using the `@/` alias (e.g. `import { getDb } from "@/lib/mongodb"`).

## MongoDB

- Connection string comes from `MONGODB_URI` (and `MONGODB_DB` for the database name) in `.env.local`. Never hard-code or commit credentials.
- Reuse one cached client across hot reloads and requests via `src/lib/mongodb.ts`; never open a new connection per request.
- Only touch the database from server code: Server Components, Server Actions, or route handlers. Never import the DB helper into a `"use client"` file.
- Validate and sanitise request input before it reaches a query.
- Convert `ObjectId` and `Date` values to strings before passing data to Client Components.

## Conventions

- Default to Server Components; add `"use client"` only when a component needs state, effects or browser APIs.
- Use TypeScript types for all data shapes; avoid `any`.
- Style with Tailwind utility classes.
- Keep route handlers thin: put query logic in `src/lib/` or `src/models/`.
- Return proper HTTP status codes and JSON error messages from API routes.
