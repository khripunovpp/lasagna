# api-chef — Strapi 5 Backend

CMS/backend for Lasagna app. Provides optional cloud sync (premium feature). Built on Strapi 5 with TypeScript.

## Tech Stack

- Strapi 5.x
- TypeScript
- SQLite (dev) / PostgreSQL (prod) via `pg` and `better-sqlite3`
- Docker support (`Dockerfile.dev`, `Dockerfile.build`)

## Development

```bash
npm run dev        # Start Strapi in development mode (port 1337)
npm run build      # Build Strapi admin panel
npm start          # Start in production mode
```

## Docker

```bash
# From repo root:
docker-compose up strapi-dev
```

Mounts `./data` for database persistence.

## Key Directories

| Path         | Description                    |
|--------------|--------------------------------|
| `src/`       | Strapi custom code, APIs       |
| `config/`    | Strapi configuration           |
| `database/`  | DB migrations and schema       |
| `scripts/`   | Seed and utility scripts       |
| `public/`    | Static files served by Strapi  |

## Notes

- Cloud sync is a premium/WIP feature — backend is not required for the core PWA
- Admin panel runs at `http://localhost:1337/admin`
