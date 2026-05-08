# bot — Telegram Bot Worker

Cloudflare Worker that handles the Telegram bot webhook for the Lasagna Mini App. The bot opens the PWA inside Telegram; Stars payments integration is planned (currently not implemented in this worker).

## Tech Stack

- Cloudflare Workers runtime (`wrangler`)
- TypeScript, ESM
- Plain `fetch` handler (Hono is a dependency but the current `src/index.ts` uses the bare Workers handler)
- `nodejs_compat` flag enabled

## Running

```bash
# Local dev (port 8787)
npm run dev

# Deploy to Cloudflare
npm run deploy
```

Secrets are not stored in `wrangler.toml`; set them via:

```bash
wrangler secret put BOT_TOKEN
wrangler secret put WEB_APP_URL    # if needed
```

For local dev, copy `.dev.vars.example` → `.dev.vars`.

## Environment Variables

| Variable      | Description                                  |
|---------------|----------------------------------------------|
| `BOT_TOKEN`   | Telegram bot token (set as Wrangler secret)  |
| `WEB_APP_URL` | URL of the Lasagna PWA                       |

## Endpoints

| Method | Path        | Description                                                           |
|--------|-------------|-----------------------------------------------------------------------|
| POST   | `/webhook`  | Telegram webhook. Replies to `/start` with a message pointing at the Mini App. |

All other paths return 404.

## Telegram Setup

The bot runs in **webhook mode** (not polling). Point Telegram at the deployed Worker URL:

```
https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<your-worker>.workers.dev/webhook
```

## Notes

- Stars payments (`createInvoiceLink`) are not implemented in the current worker — the previous Express-based prototype is gone.
- No persistence; the worker is stateless.
