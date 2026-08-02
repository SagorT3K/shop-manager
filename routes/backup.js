// Backup route: download the SQLite database file
const express = require('express');
const fs = require('fs');
const path = require('path');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const dbPath = path.join(__dirname, '..', 'bikroy_web.db');
  if (!fs.existsSync(dbPath)) {
    return res.status(404).json({ error: 'Database file not found' });
  }
  const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
  res.download(dbPath, `bikroy_hisab_backup_${stamp}.db`);
});

module.exports = router;
