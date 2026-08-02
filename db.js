// Database setup: SQLite schema mirroring the Android Room database,
// plus a users table for the web admin panel.
const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const bcrypt = require('bcryptjs');

const DB_PATH = path.join(__dirname, 'bikroy_web.db');

const db = new DatabaseSync(DB_PATH);

// Enable foreign keys (CASCADE deletes)
db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
  CREATE TABLE IF NOT EXISTS customers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    phone       TEXT NOT NULL DEFAULT '',
    email       TEXT NOT NULL DEFAULT '',
    address     TEXT NOT NULL DEFAULT '',
    createdDate INTEGER NOT NULL
  );

  CREATE TABLE IF NOT EXISTS dues (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId  INTEGER NOT NULL,
    amount      REAL NOT NULL,
    productName TEXT NOT NULL,
    date        INTEGER NOT NULL,
    note        TEXT NOT NULL DEFAULT '',
    status      TEXT NOT NULL DEFAULT 'unpaid', -- unpaid | paid | partial
    FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_dues_customer ON dues(customerId);

  CREATE TABLE IF NOT EXISTS payments (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    customerId INTEGER NOT NULL,
    amount     REAL NOT NULL,
    date       INTEGER NOT NULL,
    note       TEXT NOT NULL DEFAULT '',
    FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
  );
  CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customerId);

  CREATE TABLE IF NOT EXISTS sales_records (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    productName TEXT NOT NULL,
    quantity    INTEGER NOT NULL,
    price       REAL NOT NULL,
    totalAmount REAL NOT NULL,
    date        INTEGER NOT NULL,
    customerId  INTEGER,
    note        TEXT NOT NULL DEFAULT ''
  );
  CREATE INDEX IF NOT EXISTS idx_sales_customer ON sales_records(customerId);

  CREATE TABLE IF NOT EXISTS users (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    username     TEXT NOT NULL UNIQUE,
    passwordHash TEXT NOT NULL,
    fullName     TEXT NOT NULL DEFAULT '',
    role         TEXT NOT NULL DEFAULT 'shopkeeper', -- admin | shopkeeper
    active       INTEGER NOT NULL DEFAULT 1,
    createdAt    INTEGER NOT NULL
  );
`);

// Seed the default admin account on first run
const userCount = db.prepare('SELECT COUNT(*) AS c FROM users').get().c;
if (userCount === 0) {
  const passwordHash = bcrypt.hashSync('admin123', 10);
  db.prepare(
    'INSERT INTO users (username, passwordHash, fullName, role, active, createdAt) VALUES (?, ?, ?, ?, 1, ?)'
  ).run('admin', passwordHash, 'Administrator', 'admin', Date.now());
  console.log('==================================================');
  console.log('  Default admin account created:');
  console.log('    Username: admin');
  console.log('    Password: admin123');
  console.log('  Please change the password after first login.');
  console.log('==================================================');
}

module.exports = db;
