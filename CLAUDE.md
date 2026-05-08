# Lasagna — Monorepo

Offline-first PWA for recipe costing and invoicing. Targeted at bakers, home chefs, and small food businesses.

## Project Structure

| Directory    | Description                                                          |
|--------------|----------------------------------------------------------------------|
| `lasagna/`   | Main Angular 21 PWA frontend (core product)                          |
| `worker/`    | Cloudflare Worker (Hono) — REST API for cloud sync, talks to Supabase|
| `supabase/`  | Supabase project: migrations, seed, config (cloud DB + auth)         |
| `bot/`       | Cloudflare Worker (Hono) — Telegram bot webhook for the Mini App     |
| `landing/`   | Landing page Angular components                                      |
| `docs/`      | Built documentation output (do not edit directly)                    |

## Key Facts

- Offline-first: data stored in IndexedDB via Dexie.js, no registration required
- Cloud sync (premium) is wired through Cloudflare Worker → Supabase (Postgres + Auth)
- Telegram Mini App integration via `bot/` (webhook → opens PWA); Stars payments WIP
- Monorepo root `package.json` only has a `build-timeweb` script for CI

## Running Services

```bash
# Supabase (Postgres + Auth + Studio) — runs via Supabase CLI, not docker-compose
supabase start

# Angular frontend (port 4200)
cd lasagna && npm start

# Cloudflare Worker API (port 3333, wrangler dev)
cd worker && npm run dev

# Telegram bot worker (port 8787, wrangler dev)
cd bot && npm run dev
```

Or use `./dev.sh` to start Supabase + bring up `angular-dev`, `worker`, `bot` via docker-compose.

## Docker

```bash
docker-compose up angular-dev    # Angular dev server (port 4200)
docker-compose up worker         # Worker API dev (port 3333)
docker-compose up bot            # Telegram bot dev (port 8787)
```

Worker and bot read secrets from `.dev.vars` (copy from `.dev.vars.example`).

## Deployment

- Frontend: Vercel SSR (`npm run build-ssr` in `lasagna/`)
- Worker API: Cloudflare Workers (`cd worker && npm run deploy`)
- Bot: Cloudflare Workers (`cd bot && npm run deploy`)
- Supabase: managed (cloud project); schema applied via `supabase/migrations/`
