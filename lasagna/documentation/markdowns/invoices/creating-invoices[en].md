---
title: "Invoice Editing Page"
order: 1
---

# 🧾 Invoice Editing Page

This page allows you to create and edit an invoice with detailed order information — including recipes, products, taxes, notes, and metadata. It’s used to generate a final invoice for your client.

---

## ⚙️ General Principles

- ✏️ All fields are editable only in the `Draft` status.
- 🔐 Once the invoice is set to `Issued`, `Paid`, or `Canceled`, editing is disabled.
- 💡 If you manually edit the **price per unit** or the **total**, the value becomes “locked” — it won’t update even if the linked recipe or product changes.
- 🔁 If not edited manually, prices automatically follow updates in recipes/products.
- 📄 PDF generation is available in all statuses except `Draft`.

---

## 📌 Invoice Statuses

| Status     | Description                                                           | Editable |
|------------|------------------------------------------------------------------------|----------|
| `Draft`    | Initial state. Everything is editable.                                | ✅       |
| `Issued`   | Finalized invoice. All prices are locked and cannot be edited.        | ❌       |
| `Paid`     | Marked as paid. Can only be changed to `Canceled`.                    | ❌       |
| `Canceled` | Canceled invoice. No changes allowed.                                 | ❌       |

### 🔁 Status Transitions

- `Draft` → `Issued` / `Paid` / `Canceled`
- `Issued` → `Paid` / `Canceled`
- `Paid` → `Canceled`
- `Canceled` → ❌ (locked)

---

## 🧾 Main Fields

- **Private name** — internal invoice name.
- **Prefix** — invoice group prefix.
- **Invoice number** — auto-generated ID.
- **Date issued / Due date** — issue and due dates for the invoice.

---

## 🏢 Company and Client Info

- **Your company details** — free-text field. You can either write manually or insert pre-saved company info from settings.
- **Customer details** — same logic; enter manually or insert from saved client list.

---

## 📋 Line Items Table

You can add:

- 🥣 **Recipes** — price is pulled from the recipe calculation settings.
- 📦 **Products** — price is taken from the product card.

🔁 Prices include **modifiers** (if any).  
📝 You can manually edit **price per unit** or **total** — the other value will recalculate automatically based on quantity.

---

## 🧾 Taxes and Fees

- Add with **Add tax or fee** button.
- Choose from predefined options in your settings.
- Both **percentage** and **fixed** amounts are supported.
- Order matters: taxes/fees are applied sequentially.

---

## 🗒️ Notes and Terms

- **Notes** — additional comments or message for the client.
- **Terms** — legal or business conditions (e.g., payment policy, delivery terms).

---

## 🧮 Invoice Footer

Displays:

- **Subtotal** — line item total before taxes/fees.
- **Tax** — total taxes applied.
- **Fees** — extra charges (like delivery).
- **Total** — final invoice amount.

---

## 📤 Actions

- **Issue and download invoice** — locks the invoice (`Issued`) and generates a PDF.
- **Generate PDF** — available in all statuses except `Draft`.
- **Copy / Delete Invoice** — clone or remove invoice.
- **Mark as paid / canceled** — change invoice status manually.
