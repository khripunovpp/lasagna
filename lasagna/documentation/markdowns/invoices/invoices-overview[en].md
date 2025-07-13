# 🧾 What are invoices?

Invoices are a system for generating and tracking bills for your orders. You can use them for:

- 💰 Calculating the total cost of an order based on recipes and products  
- 📦 Tracking expenses and sales  
- 🧾 Storing information about clients, order dates, and due dates  
- 🧾 Generating final PDF documents to send to clients (in future versions)

Each invoice is a document that contains a list of items (recipes, products, or custom entries) with quantity, price, and total amount.

---

# 📄 Invoice List Page

This page displays all created invoices. Here you can:

- ✅ Create new invoices  
- 🗑️ Select and delete multiple invoices  
- 👁 View status, creation date, due date, and remaining days for each invoice

---

## 🔘 Main elements

- **Create invoice button** (`➕`) — opens the form to create a new invoice.
- **Select many** — activates multi-select mode for bulk actions (like deletion).
- **Invoice info includes**:
  - **Number** — the invoice ID, which includes a prefix, date, and random suffix (e.g., `#UK-FR/20250707-8c`)
  - **Status** — can be `Draft`, `Sent`, `Paid`, etc.
  - **Date due** — the invoice due date
  - **Days left** — calculated automatically from the due date
  - **Last edited date** — shown in the top-right corner

---

## 📂 Grouping by prefix

Invoices are grouped by **prefix**, which is part of the invoice ID and can be set manually or automatically during creation. The prefix appears before the date and is used for logical grouping.

---

## 🧠 Tips

- ✏️ Clicking the invoice name opens it for editing  
- ⏱ Days left are calculated automatically based on the due date  
- 🗑️ Deletion is only available in multi-select mode  
- 🕒 Sorting and filtering will be available in future versions
