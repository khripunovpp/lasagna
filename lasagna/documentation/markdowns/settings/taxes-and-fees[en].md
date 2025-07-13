---
title: "Taxes and Fees"
order: 4
---
## 💰 Taxes and Fees

The **Taxes** section allows you to create, edit, and remove tax rates and additional fees that can be applied to recipes and invoices.

This flexible system is designed to support both VAT/IVA and extra charges (like delivery or rush fees).

### 🧾 Row fields

Each row includes:

1. **Name** – a descriptive label (e.g. `Base IVA`, `Delivery anywhere`, `Urgent order`)
2. **Description** – (optional) for internal notes, such as region or conditions
3. **Type**:
   - `%` – percentage-based (used for taxes)
   - 💶 (no icon, just a number) – fixed amount (used for surcharges/fees)
4. **Value**:
   - If `%` is selected, the value is calculated as a percentage (e.g. 23%)
   - If percentage is **not selected**, it's treated as a fixed amount (e.g. 12.99)

> ⚠️ Currently, surcharges (fees) are always fixed. Percentage-based fees will be supported in the future.

### ➕ Actions

- **Add tax** – add a new row for tax or fee  
- ❌ Red cross – delete the selected entry  
- **No changes** – indicates that no unsaved edits are present

---

These values are used in recipe cost calculations and invoice generation. They help reflect actual pricing and ensure compliance with tax regulations.
