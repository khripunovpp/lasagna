# 📊 Recipe Cost Calculation Page

This page displays the total cost of a recipe, suggested selling price, and breakdown by ingredient.

---

## ⚙️ Calculation For

Specifies the number of units the recipe is calculated for:
- Examples: `14 piece`, `200 gram`
- Used to compute **price per unit** and **total cost**.

---

## 💶 Price Per Unit

Shows cost details for a single unit of the recipe:

- **Base cost** — calculated from ingredients.
- **Selling price** — adjusted with price modifiers.
- **Profit** — displayed in green.
- **Weight per unit** — if total output is set.
- ➡️ **Arrow** shows that the price has changed due to modifiers.

---

## 💰 Total Cost

Displays the **base total cost** of the entire recipe (excluding modifiers).

---

## 🎛️ Price Modifiers

Allow you to define a selling price without changing the ingredient data:

- `Per unit` or `Total` — whether the modifier applies per unit or to the total.
- `Add` or `Round to` — add a fixed/percent value or round the price.
- `$` or `%` — define the value format.

🧮 If `Total` is selected, the unit price is recalculated:

unit price = total price / output quantity

🗑️ To remove a modifier, simply clear the amount field.

---

## 📈 Price and Weight Breakdown

Two pie charts:

- **By price** — shows each ingredient’s share of the total cost.
- **By weight** — shows each ingredient’s contribution to the total weight.

---

## 🧾 Ingredient Table

| #  | Name                          | Quantity | Unit  | Price per unit | Total cost |
|----|-------------------------------|----------|-------|----------------|-------------|
| 1  | Dark chocolate 55% MAKRO      | 360      | gram  | €0.01795       | €6.46       |
| 2  | Cream Makro                   | 525      | gram  | €0.00423       | €2.22       |
| ...| ...                           | ...      | ...   | ...            | ...         |

🔗 Clicking the name opens the ingredient or recipe details page.

---

## 🧮 Table Footer Summary

- **Total weight** — always shown in grams (without modifiers).
- **Average price per gram** — based on all ingredients.
- **Total cost** — the sum of all ingredient costs.

---
