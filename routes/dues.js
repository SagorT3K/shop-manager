// Due routes: create, list, update status, delete
const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

// List dues (all, or ?customerId=)
router.get('/', (req, res) => {
  const customerId = req.query.customerId;
  let rows;
  if (customerId) {
    rows = db.prepare('SELECT * FROM dues WHERE customerId = ? ORDER BY date DESC').all(customerId);
  } else {
    rows = db.prepare('SELECT * FROM dues ORDER BY date DESC').all();
  }
  res.json(rows);
});

// Create a due
router.post('/', (req, res) => {
  const { customerId, amount, productName, date, note = '', status = 'unpaid' } = req.body || {};
  if (!customerId) return res.status(400).json({ error: 'customerId is required' });
  if (!productName || !String(productName).trim()) {
    return res.status(400).json({ error: 'Product name is required' });
  }
  const amt = Number(amount);
  if (!isFinite(amt) || amt <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }
  const customer = db.prepare('SELECT id FROM customers WHERE id = ?').get(customerId);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  const result = db.prepare(
    'INSERT INTO dues (customerId, amount, productName, date, note, status) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(
    customerId,
    amt,
    String(productName).trim(),
    date ? Number(date) : Date.now(),
    String(note).trim(),
    ['unpaid', 'paid', 'partial'].includes(status) ? status : 'unpaid'
  );
  res.status(201).json({ id: result.lastInsertRowid });
});

// Update due status (mark paid/partial/unpaid)
router.put('/:id/status', (req, res) => {
  const { status } = req.body || {};
  if (!['unpaid', 'paid', 'partial'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }
  const result = db.prepare('UPDATE dues SET status = ? WHERE id = ?').run(status, req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Due not found' });
  res.json({ ok: true });
});

// Delete a due
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM dues WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Due not found' });
  res.json({ ok: true });
});

module.exports = router;
