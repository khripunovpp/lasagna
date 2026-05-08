---
title: "Storage (Products Page)"
order: 0
---

# 🧺 Storage (Products Page)

The **Storage** section (titled *"Storage"* in the app) is where you manage all ingredients and materials used in your recipes.
Each item on this page is a **product**: it has a price, unit, category, brand, source, and edit history.

## 🗃️ Page Structure

- The page title shows *"Storage"* and the total count next to it (e.g. *"found: 42"*).
- Products are grouped on the page (by default — by category), and you can change the grouping and the sort direction.
- Each product card shows:
  - The product name (click to open it for editing).
  - The **price per unit** on the right (e.g. `0.018 €/g`). For very small values you'll see *"less <0.01"* instead of a number.
  - The label *"edited <time ago>"* at the bottom.

## 📝 Drafts

If you started editing a product but didn't save it, a **drafts banner** appears at the top of the page indicating unsaved changes. Click it to review or finish those drafts.

## ✅ Selection Mode & Bulk Actions

Clicking on a product card activates **selection mode**:
- You can select multiple products at once.
- A toolbar appears with quick actions: select all, hide the selection, or clear it.
- After selecting, you can **delete** the selected products. The **Export** button at the top will export only the selected items if any are selected.

## 🔁 Import & Export

The controls bar at the top of the page contains:

- ➕ **Add product** — opens the new-product form.
- **Export** — downloads your products as a file (only the selected ones if you're in selection mode, otherwise all).
- **Import** — uploads a previously-exported file. Existing products are updated when their IDs match; new ones are added.

## 📭 Empty State

If you have no products yet, the page shows *"Products not found"* and an **Add first product** button.

---

This section is the foundation for cost calculations. Accurate product data = accurate recipe and invoice totals.
