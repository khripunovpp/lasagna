---
title: "Creating and Editing a Product"
order: 1
---

# ✏️ Creating and Editing a Product

This page lets you create a new product or edit an existing one.
Products are used in recipes and invoices, so it's important to set the correct price, weight, and category.

## 🧾 Fields

### 🧠 Name

The top field is the **product name** (e.g., *"Sugar"*, *"Vanilla"*, *"Flour T65"*).

### ⚖️ Amount + Unit

- The **Amount** field (placeholder: *"Amount in g"* / *"Amount in piece"*) — how many grams or pieces this entry refers to.
- A **unit switcher** next to the field toggles between **g** (grams) and **piece**. Default is grams.

### 🥚 Weight per piece *(only for piece units)*

When the unit is set to **piece**, an extra field **"Weight per piece"** appears (suffixed with *"gram"*).
This tells the app how many grams a single piece weighs, so when this product is used as an ingredient in a recipe by piece, the recipe can still calculate ingredient weight and price-per-gram correctly.

### 💶 Price

- **Price** (placeholder: *"Total price for this product"*) — the total cost for the amount you entered, in your selected currency. The currency symbol is shown on the right of the field.
- **Price per unit** is calculated automatically and shown as a read-only field (e.g. `0.018 /g`). For very small values it shows *"less <0.01"*.
- 📊 When editing a saved product, a small **bar-chart button** opens a **price-history** view so you can track how the product's price has changed over time.

### 🧮 Math Expressions

The Amount, Weight per piece, and Price fields all accept **math expressions**:

- `100+20` → 120
- `400*2` → 800
- `200*0.75` → 150
- `100 + 10%` → 110

Useful for fast scaling or quick conversions.

### 📝 Notes

A **rich-text** field for any extra information about the product (storage tips, preparation notes, etc.).

### 🛒 Source

- The **Source** field (e.g. *"Where did you buy it? For example: Target, Walmart"*) — supermarket, website, or supplier.
- Below it appears a row of **chips** with your most recently used sources. Tap a chip to fill the field.

### 🏷️ Brand

- The **Brand** field (placeholder *"Brand"*) — manufacturer or brand name.
- Same chip behaviour as Source: recent brands are offered as quick-pick chips.

### 📂 Category

- **Category** is a **multi-select** — a single product can belong to several categories at once.
- Below the field, **chips** with your most-used categories are offered for quick assignment.
- Categories are managed in the Settings section.

## 💾 Saving

- **Save changes** — stores your product. Creates a new entry if you're adding, or updates the existing one when editing.
- **Revert changes** — discards the current edits.
- **Remove this product / Remove this draft** — deletes the product or its draft.
- If you leave the page without saving, your changes are kept as a **draft** — but it's better to save explicitly.

---

This screen gives you flexible control over your ingredients, ensuring every product has an accurate price, source, and classification for recipe cost calculation.
