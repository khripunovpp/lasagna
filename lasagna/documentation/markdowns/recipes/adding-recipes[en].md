---
title: "Creating and Editing a Recipe"
order: 1
---


# ✏️ Creating and Editing a Recipe

A recipe is a combination of ingredients (products or sub-recipes) with defined quantities and optional output weight.  
Each recipe can include a title, description, total yield, category, and tags for filtering and sorting.

## 🧾 Main Fields

### 📛 Recipe Name

- The top field is used to enter the **recipe name** (e.g., "Caramel Napoleon").

### 📝 Description

- Below that is a **free-text field** for describing the method, mold size, portioning details, notes, etc.

### ⚖️ Total Yield (optional but affects pricing)

- This field defines the **final yield** of the recipe (e.g., 1000 g or 12 pcs).
- If **left empty**, the total weight of all ingredients is used to calculate cost per gram or piece.
- If **filled**, the system treats this as the **actual yield**, and pricing is based on that number — useful when some mass is lost during preparation.

> Recommended for baked goods, reductions, or recipes where weight loss occurs in the process.

## 🧩 Ingredients

Each ingredient can be either:
- ✅ A **product** from your stock
- 🔁 A **sub-recipe**

For each ingredient, you define:
- Name (selected from list)
- Quantity
- Unit — automatically pre-filled when you select a product or sub-recipe (grams or pieces)

You can mix both products and sub-recipes in a single recipe.  
Click **“Add Ingredient”** to insert a new row.

### ➕ Math Expressions

All numeric fields support **math expressions**, such as:

- `100+20` → 120  
- `400*2` → 800  
- `200*0.75` → 150  
- `100 + 10%` → 110

This allows for fast scaling, portioning, or converting recipes directly in the input fields.

## 🏷️ Category and Tags

- **Category** — determines which group the recipe belongs to on the main list.  
  Categories are managed in the Settings section.

- **Tags** — custom keywords for filtering and organizing recipes.  
  Examples: `vegan`, `filling`, `seasonal`, `decoration`, `base`

## 💾 Saving

- Click **“Save Changes”** to store your recipe.
- If you leave the page without saving, your changes will be preserved as a **draft**.

---

This page gives you full control over the structure, content, and cost of your recipes — whether for planning, production, or invoicing.
