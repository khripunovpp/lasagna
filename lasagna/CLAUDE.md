# lasagna — Angular PWA Frontend

The main product: offline-first PWA for recipe costing and invoicing. Angular 21, SSR, Service Worker.

## Tech Stack

- Angular 21 + Angular Material + Angular SSR
- Dexie.js — IndexedDB ORM (all data stored locally)
- FlexSearch — offline full-text search
- jsPDF + jspdf-autotable — PDF export
- ngx-translate — i18n (EN, RU, PT)
- Sentry — error tracking
- Zod — runtime validation
- Chart.js via ng2-charts — analytics charts
- Playwright — e2e tests

## Development

```bash
npm start              # Dev server at http://localhost:4200 (local config)
npm run start-ssr      # Dev server with SSR
npm run build          # Production SSR build (runs prebuild scripts first)
npm run build-ssr   # Build for Vercel deployment
npm test               # Unit tests (Karma/Jasmine)
npx playwright test    # E2e tests
```

## Prebuild Scripts (run automatically before build)

1. `scripts/generate-ver.js` — writes version to `ver.json`
2. `scripts/inject-translations.js` — injects translations
3. `scripts/set-env.js` — sets environment config
4. `scripts/set-right-region-settings.js` — region settings

## i18n

```bash
npm run i18n           # Extract translation keys to public/i18n/{en,pt,ru}.json
npm run po:import      # Convert JSON → .po files
npm run po:export      # Convert .po → JSON files
```

Translation files: `public/i18n/en.json`, `ru.json`, `pt.json`

## Key Directories

| Path              | Description                                 |
|-------------------|---------------------------------------------|
| `src/app/`        | Angular modules, components, services       |
| `public/i18n/`    | Translation files (EN, RU, PT)              |
| `public/`         | Static assets, PWA manifests                |
| `documentation/`  | Docs source (built via `npm run build-docs`)|
| `tests/`          | Playwright e2e tests                        |
| `scripts/`        | Build-time utility scripts                  |

## Configurations

- `angular.json` — Angular build configs (`local`, `production`, etc.)
- `ngsw-config.json` — Service Worker config
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.spec.json`

## Feature Areas

- **Recipes** — nested recipes with ingredient costs, price modifiers, weight tracking
- **Products** — local product DB with categories, offline search
- **Invoices** — multi-status invoices (Draft → Issued → Paid/Canceled), PDF export
- **Analytics** — cost/weight pie charts, summary tables
- **Cloud Sync** — WIP premium feature via Strapi backend

## Deployment

- Vercel SSR: `sh build-ssr-ssr.sh`
- GitHub Pages (demo): `sh build-github-dev.sh`
- Timeweb: `npm run build-timeweb` from repo root
