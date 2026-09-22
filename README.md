# Bikroy Hisab — Web App (বিক্রয় হিসাব)

Web version of the Bikroy Hisab Android shop-management app: track customers,
credit sales (dues/বাকি), payments, sales history, and send due notifications
via WhatsApp, Gmail, or a copyable SMS template. Bilingual UI (English + Bengali),
with a login system and an admin panel for user management.

[![Node.js](https://img.shields.io/badge/Node.js-22.5%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com)
[![SQLite](https://img.shields.io/badge/SQLite-node%3Asqlite-003B57?style=flat-square&logo=sqlite&logoColor=white)](https://nodejs.org/api/sqlite.html)
[![UI](https://img.shields.io/badge/UI-English%20%2B%20%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE-2ea44f?style=flat-square)](.)

No front-end framework and no build step: Express serves the static pages in `public/`
plus a JSON API from the same origin.

## Requirements

- **Node.js 22.5+** (uses the built-in `node:sqlite` module — no native compilation needed)

## Run

```bash
npm install
npm start
```

Then open **http://localhost:3000** in a browser.

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `3000` | HTTP port |
| `JWT_SECRET` | `bikroy-hisab-web-secret-change-me` | Signs the session cookie — **change this in production** |

On first start the database file (`bikroy_web.db`) is created, the schema is applied and
the default admin account is seeded.

## Sign up / Login

- **Sign up** — open **http://localhost:3000/signup.html** (or the "নিবন্ধন / Sign Up" link on the login page) to create an account. The **first registered user automatically becomes the admin**; later signups are shopkeepers (an admin can change roles in the Admin Panel).
- **Login** — use the account you created, or the seeded default admin account:

| Username | Password |
|---|---|
| `admin` | `admin123` |

⚠️ **Change the default admin password after first login** (Admin Panel → User Management → Edit).
The admin account is seeded automatically when the database is created.

## Features

| Area | What it does |
|---|---|
| **Login** | Cookie-based session (7 days). Admin + shopkeeper roles. |
| **Dashboard** | Customer count, today's sales, total outstanding dues, recent transactions (dues + payments). |
| **Customers** | Add / edit / delete (cascades dues & payments), search by name or phone, email + address fields, customer detail page with due history and payments. |
| **Dues (বাকি)** | Record a credit sale per customer. After saving, notify the customer via **WhatsApp** (`wa.me` link), **Gmail** (`mailto:` with the customer's email), or **copy the Bengali SMS template** to clipboard. |
| **Payments** | Record a payment against a customer — auto-applied to the oldest unpaid dues (due becomes `paid` when fully covered, `partial` when partly covered). |
| **Sales** | Record sales (product, quantity, price), today's sales summary, full history with delete. |
| **Admin panel** | Create shopkeeper accounts, edit, enable/disable, delete users. Admin-only pages and API routes are enforced server-side. |
| **Settings** | Download the full database as a backup file (`.db`), language switcher, about. |
| **Language & Currency** | EN/BN toggle in the top bar (persisted). **Currency selector** (top bar and Settings) with 14 currencies: BDT ৳, USD \$, EUR €, GBP £, INR ₹, PKR ₨, NPR ₨, JPY ¥, CNY ¥, SAR ﷼, QAR ﷼, AED د.إ, MYR RM, IDR Rp. Currency symbols and Bengali numerals adapt automatically; due/payment messages use the currency name (টাকা, ডলার, ইউরো ...). |

## API overview (JSON, cookie-authenticated)

```
POST   /api/auth/login          login (sets httpOnly session cookie)
POST   /api/auth/logout         logout (clears cookie)
GET    /api/auth/me             current user

GET    /api/dashboard           stats + 5 recent transactions
GET    /api/customers           list (or ?q=search by name/phone)
POST   /api/customers           create customer (name, phone, email, address)
GET    /api/customers/:id       customer detail + dues + payments + totals
PUT    /api/customers/:id       update customer
DELETE /api/customers/:id       delete (cascades dues/payments)

GET    /api/dues                all dues (or ?customerId=)
POST   /api/dues                create due (customerId, amount, productName, note)
PUT    /api/dues/:id/status     set status: unpaid | paid | partial
DELETE /api/dues/:id            delete due

GET    /api/payments            all payments (or ?customerId=)
POST   /api/payments            record payment (auto-updates due statuses)
DELETE /api/payments/:id        delete payment

GET    /api/sales               all sales (or ?customerId=)
GET    /api/sales/today         today's sales + total
POST   /api/sales               create sale (productName, quantity, price, customerId?)
DELETE /api/sales/:id           delete sale

GET    /api/admin/users         list users        (admin only)
POST   /api/admin/users         create user       (admin only)
PUT    /api/admin/users/:id     update user       (admin only)
DELETE /api/admin/users/:id     delete user       (admin only)

GET    /api/backup              download the SQLite database file
```

## Project structure

```
bikroy-hisab-web/
├── server.js            Express server (static pages + API routes + page guards)
├── db.js                SQLite schema (node:sqlite) + admin seed
├── middleware/auth.js   JWT + cookie session handling, role guards
├── routes/              auth, dashboard, customers, dues, payments, sales, admin, backup
├── public/
│   ├── css/style.css    shared Material-style theme
│   ├── js/i18n.js       EN/BN translation dictionary + formatting
│   ├── js/app.js        API client, session init, nav shell, message builders
│   ├── login.html       public page
│   ├── dashboard.html   stats + recent transactions
│   ├── customers.html   list + search + add/edit modal
│   ├── customer-detail.html  dues, payments, payment modal, notify buttons
│   ├── add-due.html     new due form + WhatsApp/Gmail/Copy SMS panel
│   ├── sales.html       sales table + new sale modal
│   ├── settings.html    backup download, language, about
│   └── admin/users.html user management (admin only)
└── bikroy_web.db        SQLite database (created on first run)
```

## Notes

- The database (`bikroy_web.db`) is separate from the Android app — no migration is performed.
- "Total due" is the sum of unpaid/partial dues (matching the Android app's semantics);
  total paid is tracked separately on the customer detail page.
- Data is stored locally on the server machine. Back up regularly via Settings → Download Backup.
- Security: passwords hashed with bcrypt, sessions are httpOnly cookies, admin routes
  enforced server-side. For production use, set `JWT_SECRET` and serve behind HTTPS.
