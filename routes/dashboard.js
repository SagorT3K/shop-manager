// Dashboard routes: business stats and recent transactions
const express = require('express');
const db = require('../db');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth);

router.get('/', (req, res) => {
  const customerCount = db.prepare('SELECT COUNT(*) AS c FROM customers').get().c;

  const totalUnpaidDues = db.prepare(
    "SELECT COALESCE(SUM(amount), 0) AS total FROM dues WHERE status != 'paid'"
  ).get().total;

  const { start, end } = dayRange();
  const todayDueSales = db.prepare(
    'SELECT COALESCE(SUM(amount), 0) AS total FROM dues WHERE date >= ? AND date <= ?'
  ).get(start, end).total;
  const todayRecordSales = db.prepare(
    'SELECT COALESCE(SUM(totalAmount), 0) AS total FROM sales_records WHERE date >= ? AND date <= ?'
  ).get(start, end).total;

  // Recent transactions: merge dues and payments, newest first
  const recentDues = db.prepare(
    `SELECT d.id, d.customerId, c.name AS customerName, d.productName, d.amount, d.date, d.note, d.status, 'due' AS type
     FROM dues d LEFT JOIN customers c ON c.id = d.customerId
     ORDER BY d.date DESC LIMIT 10`
  ).all();
  const recentPayments = db.prepare(
    `SELECT p.id, p.customerId, c.name AS customerName, '' AS productName, p.amount, p.date, p.note, 'paid' AS status, 'payment' AS type
     FROM payments p LEFT JOIN customers c ON c.id = p.customerId
     ORDER BY p.date DESC LIMIT 10`
  ).all();

  const recentTransactions = [...recentDues, ...recentPayments]
    .sort((a, b) => b.date - a.date)
    .slice(0, 5);

  res.json({
    customerCount,
    totalUnpaidDues,
    todaySales: todayDueSales + todayRecordSales,
    recentTransactions
  });
});

function dayRange(offset = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime();
  const end = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime();
  return { start, end };
}

module.exports = router;
