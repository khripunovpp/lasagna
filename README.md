DEMO https://khripunovpp.github.io/lasagna?demo=true

# 🧁 Lasagna — Offline-first PWA for Recipe Costing & Invoicing

> Calculate the cost of recipes, manage ingredients, and generate client invoices — all **offline**, fast, and without registration.

![Status](https://img.shields.io/badge/status-beta-green) ![Angular](https://img.shields.io/badge/built%20with-Angular-DD0031?logo=angular&logoColor=white) ![PWA](https://img.shields.io/badge/type-PWA-blueviolet) ![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## ✨ Features

- 🍰 **Recipe Cost Calculator**
  - Supports nested recipes & product ingredients
  - Auto-calculates weight, cost, and unit price
  - Price modifiers (add, round, percentage)

- 🛒 **Product Management**
  - Local product DB with categories
  - Fast search with offline indexing

- 🧾 **Invoices**
  - Create, group, and manage invoices for orders
  - Add recipes, products, or custom lines
  - Add taxes and surcharges
  - Multi-status logic: `Draft`, `Issued`, `Paid`, `Canceled`
  - Auto-calc price per unit or total

- 📦 **Offline-first**
  - Uses IndexedDB (Dexie.js)
  - No registration required
  - Works completely offline

- ☁️ **Cloud Sync** *(WIP / Premium)*
  - Supabase (Postgres + Auth) backend, accessed via a Cloudflare Worker REST API
  - Optional user accounts for cross-device syncing

- 🤖 **Telegram Mini App** *(WIP)*
  - Bot opens Lasagna as a Telegram Mini App
  - Stars payments integration in progress

- 📊 **Visual Analytics**
  - Weight and cost pie charts
  - Summary tables and exportable data

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/Lasagna.git
cd Lasagna
npm install
npm run start
```

Open in browser: `http://localhost:4200`

---

## 🧠 Tech Stack

- [Angular 21](https://angular.io/) + [Angular Material](https://material.angular.io/) (PWA, SSR via Vercel)
- [Dexie.js](https://dexie.org/) for IndexedDB
- [jsPDF](https://github.com/parallax/jsPDF) for future PDF exports
- [FlexSearch](https://github.com/nextapps-de/flexsearch) for local search
- [Supabase](https://supabase.com/) (Postgres + Auth) — cloud sync backend
- [Cloudflare Workers](https://workers.cloudflare.com/) + [Hono](https://hono.dev/) — REST API and Telegram bot
- [Sentry](https://sentry.io/) for error tracking
- [Google Analytics](https://analytics.google.com/) (optional, with consent)

---

## 🛡️ Privacy & Legal

- No data leaves your device by default
- Optional cloud sync stores your data in a secure backend
- GDPR-compliant cookie consent
- See full [Privacy Policy](./docs/privacy.md), [Terms of Service](./docs/terms.md), and [Cookies](./docs/cookies.md)

---

## 🗂 Documentation

See the [📚 Full Documentation](./docs/README.md) for:

- How to create recipes
- Cost modifiers explained
- Invoice generation
- Offline strategies
- Data sync logic
- Monetization plans

---

## 💸 Monetization Plans

- Free core functionality (offline, no login)
- Premium for:
  - Cloud sync
  - Multi-device access
  - Extended analytics
  - Branded invoice templates

---

## 📥 Feedback & Contributions

> I’m a solo indie dev building this for small bakers, home chefs, and passionate creators 🍳

- ⭐ Star the repo to support!
- 🐞 Found a bug? Open an [issue](https://github.com/your-username/Lasagna/issues)
- 📬 Have ideas? [Email me](mailto:you@example.com)

---

**Made with ❤️ in Portugal 🇵🇹**
