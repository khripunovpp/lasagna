---
title: "Backup"
order: 5
---

# 🗄️ Backup

The **Backup** tab is where you create and restore backups of your data, clear the app cache, and — as a last resort — wipe all data.

> The app is **offline-first** — all your data is stored locally in your browser (IndexedDB).
> Because of this, regular backups are strongly recommended to avoid data loss in case of browser issues, device resets, or accidental clearing of storage.

## 🟢 Create backup

- Click **Create backup** to download a complete snapshot of your local data — products, recipes, invoices, settings, and so on.
- The backup file is saved to your device.
- Next to the button you'll see *"Last backup: <time ago>"* once you have at least one backup.

## ♻️ Clear app cache

A separate orange card with *"You can clear the application cache."* and a **Clear app cache** button.

Clearing the cache reloads the app from scratch — useful when you want to recover from minor display issues without touching your data. **It does not delete your data.** A confirmation dialog appears before clearing.

## 🔴 Restore from backup

A red card with the warning *"Heads up! This will replace all your data"* and a **Restore from backup** button.

- Pick a previously-saved backup `.json` file.
- A confirmation dialog asks you to confirm before applying it.
- ⚠️ Restoring **overwrites all current data** in the app — useful for moving data to another device or rolling back a session.

## ☠️ Delete all data

A second red card with the warning *"You are about to delete all your data and reset the application to defaults..."* and a **Delete all data** button.

- A confirmation dialog asks for explicit confirmation.
- ⚠️ This wipes everything — products, recipes, invoices, settings, drafts. **Make a backup first** if you might need the data again.
- Useful for resetting the app to a clean state, e.g., when handing the device to someone else.

---

Until cloud sync is enabled, you are the sole owner and guardian of your information — make backups regularly.
