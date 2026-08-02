// Payment routes: record a payment, auto-apply to the customer's oldest unpaid dues.
// The customer's dues are consumed oldest-first; a due becomes "paid" when fully
// covered and "partial" when only partly covered.
const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

// List payments (all, or ?customerId=)
router.get('/', (req, res) => {
  const customerId = req.query.customerId;
  let rows;
  if (customerId) {
    rows = db.prepare('SELECT * FROM payments WHERE customerId = ? ORDER BY date DESC').all(customerId);
  } else {
    rows = db.prepare('SELECT * FROM payments ORDER BY date DESC').all();
  }
  res.json(rows);
});

// Record a payment and auto-update due statuses
router.post('/', (req, res) => {
  const { customerId, amount, date, note = '' } = req.body || {};
  if (!customerId) return res.status(400).json({ error: 'customerId is required' });
  const amt = Number(amount);
  if (!isFinite(amt) || amt <= 0) {
    return res.status(400).json({ error: 'Amount must be a positive number' });
  }
  const customer = db.prepare('SELECT id FROM customers WHERE id = ?').get(customerId);
  if (!customer) return res.status(404).json({ error: 'Customer not found' });

  const ts = date ? Number(date) : Date.now();
  db.prepare(
    'INSERT INTO payments (customerId, amount, date, note) VALUES (?, ?, ?, ?)'
  ).run(customerId, amt, ts, String(note).trim());

  // Apply payment to oldest unpaid/partial dues first
  let remaining = amt;
  const openDues = db.prepare(
    "SELECT * FROM dues WHERE customerId = ? AND status != 'paid' ORDER BY date ASC, id ASC"
  ).all(customerId);

  for (const due of openDues) {
    if (remaining <= 0) break;
    const stillOwed = due.amount - (due.status === 'partial' ? partialPaidFor(due.id) : 0);
    if (stillOwed <= 0) {
      db.prepare('UPDATE dues SET status = ? WHERE id = ?').run('paid', due.id);
      continue;
    }
    if (remaining >= stillOwed) {
      remaining -= stillOwed;
      db.prepare('UPDATE dues SET status = ? WHERE id = ?').run('paid', due.id);
    } else {
      db.prepare('UPDATE dues SET status = ? WHERE id = ?').run('partial', due.id);
      remaining = 0;
    }
  }

  res.status(201).json({ ok: true });
});

// How much has already been paid toward a due (sum of payments allocated).
// Since payments are applied oldest-first without tracking per-due allocation,
// this approximates coverage for partial dues by looking at payments after
// the due's date — a pragmatic approach for this small ledger.
function partialPaidFor(dueId) {
  const due = db.prepare('SELECT * FROM dues WHERE id = ?').get(dueId);
  if (!due) return 0;
  const totalPayments = db.prepare(
    'SELECT COALESCE(SUM(amount), 0) AS total FROM payments WHERE customerId = ?'
  ).get(due.customerId).total;
  const olderDues = db.prepare(
    "SELECT COALESCE(SUM(amount), 0) AS total FROM dues WHERE customerId = ? AND status = 'paid' AND (date < ? OR (date = ? AND id < ?))"
  ).get(due.customerId, due.date, due.date, due.id).total;
  const paidForThisDue = totalPayments - olderDues;
  return Math.max(0, Math.min(paidForThisDue, due.amount));
}

// Delete a payment
router.delete('/:id', (req, res) => {
  const result = db.prepare('DELETE FROM payments WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'Payment not found' });
  res.json({ ok: true });
});

module.exports = router;
