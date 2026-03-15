# bot — Telegram Bot + Mini App API

Telegram bot that opens the Lasagna PWA as a Telegram Mini App. Also serves an Express API for Telegram Stars payment integration.

## Tech Stack

- Node.js (ESM modules, `"type": "module"`)
- `node-telegram-bot-api` — bot in polling mode
- `express` 5.x — HTTP API
- `cors` — for cross-origin requests from the Mini App

## Running

```bash
# Requires .env file with BOT_TOKEN and WEB_APP_URL
npm start
# Runs on port 3000 (or PORT env var)
```

## Environment Variables

| Variable      | Description                          |
|---------------|--------------------------------------|
| `BOT_TOKEN`   | Telegram bot token                   |
| `WEB_APP_URL` | URL of the Lasagna PWA               |
| `PORT`        | HTTP server port (default: 3000)     |

## Bot Commands

- `/start` — sends inline keyboard button to open the Mini App

## API Endpoints

| Method | Path                       | Description                             |
|--------|----------------------------|-----------------------------------------|
| POST   | `/api/create-invoice-link` | Creates a Telegram Stars payment link   |

## Notes

- Stars payment (`createInvoiceLink`) is currently commented out and returns `'link-test'` — WIP
- `invoiceStore` (in-memory Map) holds pending invoices for 1 hour; no persistence
- Polling mode only — no webhook setup
