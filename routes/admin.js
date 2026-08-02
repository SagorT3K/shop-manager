// Admin routes: user management (admin role only)
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth, requireAdmin);

// List all users (without password hashes)
router.get('/', (req, res) => {
  const users = db.prepare(
    'SELECT id, username, fullName, role, active, createdAt FROM users ORDER BY createdAt ASC'
  ).all();
  res.json(users);
});

// Create a user
router.post('/', (req, res) => {
  const { username, password, fullName = '', role = 'shopkeeper' } = req.body || {};
  if (!username || !String(username).trim()) {
    return res.status(400).json({ error: 'Username is required' });
  }
  if (!password || String(password).length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }
  if (!['admin', 'shopkeeper'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(String(username).trim());
  if (existing) return res.status(409).json({ error: 'Username already exists' });

  const result = db.prepare(
    'INSERT INTO users (username, passwordHash, fullName, role, active, createdAt) VALUES (?, ?, ?, ?, 1, ?)'
  ).run(
    String(username).trim(),
    bcrypt.hashSync(String(password), 10),
    String(fullName).trim(),
    role,
    Date.now()
  );
  res.status(201).json({ id: result.lastInsertRowid });
});

// Update a user (fullName, role, active, optional password change)
router.put('/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { fullName, role, active, password } = req.body || {};

  // Never allow disabling or demoting your own account
  if (req.user.id === user.id && (active === 0 || (role && role !== 'admin'))) {
    return res.status(400).json({ error: 'You cannot disable or demote your own account' });
  }

  const newFullName = fullName !== undefined ? String(fullName).trim() : user.fullName;
  const newRole = role !== undefined ? role : user.role;
  const newActive = active !== undefined ? (active ? 1 : 0) : user.active;

  if (password !== undefined && password !== '') {
    if (String(password).length < 4) {
      return res.status(400).json({ error: 'Password must be at least 4 characters' });
    }
    db.prepare('UPDATE users SET fullName = ?, role = ?, active = ?, passwordHash = ? WHERE id = ?')
      .run(newFullName, newRole, newActive, bcrypt.hashSync(String(password), 10), user.id);
  } else {
    db.prepare('UPDATE users SET fullName = ?, role = ?, active = ? WHERE id = ?')
      .run(newFullName, newRole, newActive, user.id);
  }
  res.json({ ok: true });
});

// Delete a user
router.delete('/:id', (req, res) => {
  if (req.user.id === Number(req.params.id)) {
    return res.status(400).json({ error: 'You cannot delete your own account' });
  }
  const result = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  if (result.changes === 0) return res.status(404).json({ error: 'User not found' });
  res.json({ ok: true });
});

module.exports = router;
