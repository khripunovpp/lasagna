---
title: "Recipe Cost Calculation"
order: 2
---

# 📊 Recipe Cost Analysis

This page (titled *"<recipe name> Cost Analysis"*) shows the total cost of a recipe, the cost per unit, and a breakdown by ingredient.

At the top right of the title there are two quick links:
- **Edit** — open this recipe for editing.
- **Generate PDF** — download a PDF of the cost analysis.

---

## ⚖️ Calculation for

The first card shows the recipe's yield:

- *"Calсulation for (excluding losses/shrinkage)"* — when no shrinkage is set: total ingredient weight in grams. If the recipe has portions, you'll see both, e.g. `12 piece / 1000 gram`.
- *"Calculation for"* — when shrinkage is set: shows the original ingredient weight, then the final dish weight after shrinkage (e.g. `1000 gram > 800 gram`).

Right under that card you'll find the **Shrinkage** controls — see below.

### 🔥 Shrinkage

Shrinkage accounts for the weight loss during cooking (evaporation, rendering, trimming).

- Enter shrinkage as a **percentage** of the total weight, or as the **final weight in grams** after losses.
- The yield card and the per-unit price update automatically.
- Without shrinkage, the dish weight is assumed to equal the total ingredient weight, which can inflate cost — especially for recipes with long cooking times.

> Example: ingredients weigh 1000 g, shrinkage is 20%, final dish weight is 800 g. Cost per gram becomes higher because the same total cost is divided by a smaller weight.

---

## 💶 Per <unit>

Cost details for a single unit of the recipe (a portion when portions are set, otherwise per gram):

- The base cost.
- An arrow `>` to the **new cost** when modifiers are applied.
- A coloured difference in parentheses (green for profit, red for loss).

---

## 💰 Total cost

The total cost of the recipe.

- Without modifiers: just the sum of all ingredient costs.
- With modifiers applied: shows `<old> > <new>` and the difference + percentage in parentheses (e.g., `+$29.95 / 539%`).

### 🔁 Recalculate for

Below the total cost there's an auxiliary field **"Recalculate for"**.

Type any number of portions/grams here to see what the total cost would be for that amount — without changing the actual recipe. Handy for quick "what if I make 5 portions instead of 10?" estimates.

### 🎛️ Markup

The **Markup** controls let you set a selling price without changing the ingredient data. You can:
- Apply the markup **per unit** or to the **total**.
- **Add** a fixed amount or percentage, or **round to** a target value.

To remove a markup, just clear the value field.

---

## 📈 Cost & Weight Distribution

Two pie charts:

- **Cost Distribution** — shows each ingredient's share of the total cost (without markups).
- **Weight Distribution** — shows each ingredient's share of the total weight (the original weight, before shrinkage).

The weight chart is hidden when the recipe has no weight (e.g., piece-based without a *Weight per piece* set on the products).

---

## 🧾 Ingredient Cost Summary

A table titled *"Ingredient Cost Summary (excluding markups)"* with columns:

| # | Name | Amount | Price per unit | Total Cost |
|---|------|--------|----------------|------------|

- Clicking an **ingredient name** opens the corresponding product or sub-recipe.
- For piece-based ingredients whose product has a *Weight per piece* set, the gram equivalent is shown in muted parentheses next to the amount, e.g. `3 piece (180 gram)`.
- Very small numbers are shown as *"less <0.01"* instead of zeros.
- The last row is a **Subtotal** with the total amount and total cost.

Below the table there's a discreet link **"Found an error in the calculations? Let us know"** for reporting issues with the calculation result.

---

## 📭 Empty / Error States

- If the recipe has no ingredients, the page suggests adding them: *"To calculate a recipe, you need to add ingredients first."* with an **Edit Recipe** button.
- If the recipe couldn't be loaded, an error message is shown instead.
