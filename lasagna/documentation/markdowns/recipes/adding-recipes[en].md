---
title: "Creating and Editing a Recipe"
order: 1
---

# ✏️ Creating and Editing a Recipe

A recipe is a combination of ingredients (products or sub-recipes) with their amounts, plus a name and an optional description.
The form is shared by *"Add new recipe"* and the recipe edit screen.

## 🧾 Main Fields

### 📛 Name

The top field is the **recipe name** (e.g., *"Caramel Napoleon"*).

### 📝 Description

A **rich-text** field for describing the method, mold size, portioning, notes, and any other details — *"Describe how to make this recipe, tips, and important notes"*.

### 🥧 Outcome amount (optional)

The field labelled *"How many portions will it make (can be left empty)"* — a single number that represents the **expected portions** of the recipe.

- If left **empty**, the cost per unit is calculated using the total ingredient weight as a base.
- If **filled in**, the per-unit cost is calculated against this number — useful when the cost should be expressed per portion rather than per gram.

## 🧩 Ingredients

The **Ingredients** section lists the components of the recipe. For each row you can pick one of:

- **From storage** — *"Storage product"*: select an existing product.
- **As recipe** — *"Find your recipe"*: pick another recipe as a sub-recipe.
- **New product** — *"Or enter the name of a new product not yet in storage"*: type a name and a new product will be created on the storage with the unit you chose for this row. The price is left empty — open it later in the Storage to fill it in so cost calculations become accurate.

For each ingredient you also set:
- **Amount** (in grams or pieces — *"In gram"* / *"In piece"*) with a unit toggle next to it.
- A red **×** button removes the row.

Click **Add ingredient** to append a new row.

### ➕ Math expressions

The Amount field accepts **math expressions**:

- `100+20` → 120
- `400*2` → 800
- `200*0.75` → 150
- `100 + 10%` → 110

Useful for fast scaling, portioning, or quick conversions.

## 🔁 Component / Master switch

Below the ingredients there's a switch with two positions:

- *"Is recipe component"* — mark the recipe as a building block intended to be used inside other recipes.
- *"Is main recipe"* — mark it as a standalone, finished recipe.

Use it to clarify how this recipe is meant to be used.

## 🏷️ Tags & Category

- **Tags** — custom keywords to help find and filter recipes (e.g., `vegan`, `seasonal`, `decoration`, `base`).
- **Category** — a multi-select; a recipe can belong to several categories at once. Below the field, frequently-used categories appear as quick-pick chips. Categories are managed in *Settings*.

## 💾 Saving

- **Create recipe** / **Save changes** — stores your recipe.
- After creating, a small banner *"New recipe added! See it?"* appears with a link to open the new recipe.
- If you leave the page without saving, your changes are kept as a **draft** (a *"saved as draft"* indicator appears next to the title).
- **Remove this recipe** / **Remove this draft** — deletes the recipe or its current draft.

## 🔗 Other actions on an existing recipe

When you open a previously-saved recipe, an extra row of actions appears next to the title:

- **Calculate** — opens the cost-analysis page for this recipe.
- **Copy** — duplicates the recipe into a new draft you can edit independently.
- **Share link** — generates a share URL for the recipe. After clicking, the button changes to **"Link is ready, copy"** — click again to copy the link to your clipboard. Anyone who opens that link sees the recipe pre-filled in the *"Add new recipe"* form with a **"Save received recipe"** button to add it to their own storage.
- **Export** — exports **just this one recipe** to a file (separate from the bulk export on the list page).

> 🔒 The recipe edit screen also shows the last-edited time below the action row.

---

This page gives you full control over the structure, contents, and cost of your recipes — whether for planning, production, or invoicing.
