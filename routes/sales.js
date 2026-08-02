// Sales routes: list, today's summary, create, delete
const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

// All sales (optionally ?customerId=)
router.get('/', (req, res) => {
  const customerId = req.query.customerId;
  let rows;
  if (customerId) {
    rows = db.prepare('SELECT * FROM sales_records WHERE customerId = ? ORDER BY date DESC').all(customerId);
  } else {
    rows = db.prepare('SELECT * FROM sales_records ORDER BY date DESC').all();
  }
  res.json(rows);
});

// Today's sales summary
router.get('/today', (req, res) => {
  const { start, end } = dayRange();
  const sales = db.prepare(
    'SELECT * FROM sales_records WHERE date >= ? AND date <= ? ORDER BY date DESC'
  ).all(start, end);
  const total = db.prepare(
    'SELECT COALESCE(SUM(totalAmount), 0) AS total FROM sales_records WHERE date >= ? AND date <= ?'
  ).get(start, end).total;
  res.json({ sales, total, count: sales.length });
});

// Create a sale
router.post('/', (req, res) => {
  const { productName, quantity, price, date, customerId = null, note = '' } = req.body || {};
  if (!productName || !String(productName).trim()) {
    return res.status(400).json({ error: 'Product name is required' });
  }
  const qty = Number(quantity);
  const prc = Number(price);
  if (!isFinite(qty) || qty <= 0 || !isFinite(prc) || prc <= 0) {
    return res.status(400).json({ error: 'Quantity and price must be positive numbers' });
  }
  const result = db.prepare(
    'INSERT INTO sales_records (productName, quantity, price, totalAmount, date, customerId, note) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(
    String(productName).trim(),
    qty,
    prc,
    qty * prc,
    date ? Number(date) : Date.now(),
    customerId,
    String(note).trim()
  );
  res.status(201).json({ id: result.lastInsertRowid });
});

// Delete a sale
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM sales_records WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Sale not found' });
  res.json({ ok: true });
});

function dayRange(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime();
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime();
  return { start, end };
}

module.exports = router;
