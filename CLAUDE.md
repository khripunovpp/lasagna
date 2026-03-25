# Lasagna — Monorepo

Offline-first PWA for recipe costing and invoicing. Targeted at bakers, home chefs, and small food businesses.

## Project Structure

| Directory   | Description                                      |
|-------------|--------------------------------------------------|
| `lasagna/`  | Main Angular 21 PWA frontend (core product)      |
| `api-chef/` | Strapi 5 backend (cloud sync, optional/premium)  |
| `bot/`      | Telegram Bot + Express API (Mini App integration)|
| `landing/`  | Landing page Angular components                  |
| `data/`     | Strapi data directory (SQLite / PostgreSQL)      |
| `docs/`     | Built documentation output (do not edit directly)|

## Key Facts

- Offline-first: data stored in IndexedDB via Dexie.js, no registration required
- Cloud sync is a planned premium feature via Strapi backend
- Telegram Mini App integration is recent (bot + Stars payments WIP)
- Monorepo root `package.json` only has a `build-timeweb` script for CI

## Running Services

```bash
# Angular frontend (port 4200)
cd lasagna && npm start

# Strapi backend (port 1337)
cd api-chef && npm run dev

# Telegram bot + API (port 3000)
cd bot && npm start
```

## Docker

```bash
docker-compose up angular-dev    # Angular dev server
docker-compose up strapi-dev     # Strapi dev server
```

## Deployment

- Frontend: Vercel SSR (`npm run build-ssr` in `lasagna/`)
- Backend: Timeweb (autodeploy via git push to master)
