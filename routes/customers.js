// Customer routes: list/search, create, update, delete, detail (with dues/payments)
const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

// List customers, optionally search by name/phone (?q=)
router.get('/', (req, res) => {
  const q = (req.query.q || '').trim();
  let rows;
  if (q) {
    const like = `%${q}%`;
    rows = db.prepare(
      `SELECT * FROM customers
       WHERE name LIKE ? OR phone LIKE ?
       ORDER BY createdDate DESC`
    ).all(like, like);
  } else {
    rows = db.prepare('SELECT * FROM customers ORDER BY createdDate DESC').all();
  }
  res.json(rows);
});

// Customer detail with financial summary
router.get('/:id', (req, res) => {
  const customer = db.prepare('SELECT * FROM customers WHERE id = ?').get(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  const totalDue = db.prepare(
    "SELECT COALESCE(SUM(amount), 0) AS total FROM dues WHERE customerId = ? AND status != 'paid'"
  ).get(customer.id).total;
  const totalPaid = db.prepare(
    'SELECT COALESCE(SUM(amount), 0) AS total FROM payments WHERE customerId = ?'
  ).get(customer.id).total;
  const dues = db.prepare('SELECT * FROM dues WHERE customerId = ? ORDER BY date DESC').all(customer.id);
  const payments = db.prepare('SELECT * FROM payments WHERE customerId = ? ORDER BY date DESC').all(customer.id);

  res.json({ ...customer, totalDue, totalPaid, dues, payments });
});

// Create customer
router.post('/', (req, res) => {
  const { name, phone = '', email = '', address = '' } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Customer name is required' });
  }
  const result = db.prepare(
    'INSERT INTO customers (name, phone, email, address, createdDate) VALUES (?, ?, ?, ?, ?)'
  ).run(
    String(name).trim(),
    String(phone).trim(),
    String(email).trim(),
    String(address).trim(),
    Date.now()
  );
  res.status(201).json({ id: result.lastInsertRowid });
});

// Update customer
router.put('/:id', (req, res) => {
  const existing = db.prepare('SELECT id FROM customers WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'Customer not found' });

  const { name, phone = '', email = '', address = '' } = req.body || {};
  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Customer name is required' });
  }
  db.prepare(
    'UPDATE customers SET name = ?, phone = ?, email = ?, address = ? WHERE id = ?'
  ).run(
    String(name).trim(),
    String(phone).trim(),
    String(email).trim(),
    String(address).trim(),
    req.params.id
  );
  res.json({ ok: true });
});

// Delete customer (cascades dues + payments via FK)
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM customers WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Customer not found' });
  res.json({ ok: true });
});

module.exports = router;
