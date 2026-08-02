// Authentication routes: login (sets cookie), logout, current user, signup
const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db');
const { signToken, setAuthCookie, clearAuthCookie, requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username.trim());
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
  if (!user.active) {
    return res.status(403).json({ error: 'Account is disabled. Contact the administrator.' });
  }
  const token = signToken(user);
  setAuthCookie(res, token);
  res.json({
    user: { id: user.id, username: user.username, fullName: user.fullName, role: user.role }
  });
});

// Public signup: the very first registered user becomes the admin;
// everyone else becomes a shopkeeper. Usernames must be unique.
router.post('/signup', (req, res) => {
  const { username, password, fullName = '' } = req.body || {};
  if (!username || !String(username).trim()) {
    return res.status(400).json({ error: 'Username is required' });
  }
  if (!password || String(password).length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(String(username).trim());
  if (existing) return res.status(409).json({ error: 'Username already exists' });

  const userCount = db.prepare('SELECT COUNT(*) AS c FROM users').get().c;
  // First real signup (only the seeded default admin exists) becomes admin;
  // everyone after that is a shopkeeper.
  const role = userCount <= 1 ? 'admin' : 'shopkeeper';

  const result = db.prepare(
    'INSERT INTO users (username, passwordHash, fullName, role, active, createdAt) VALUES (?, ?, ?, ?, 1, ?)'
  ).run(
    String(username).trim(),
    bcrypt.hashSync(String(password), 10),
    String(fullName).trim(),
    role,
    Date.now()
  );

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);
  const token = signToken(user);
  setAuthCookie(res, token);
  res.status(201).json({
    user: { id: user.id, username: user.username, fullName: user.fullName, role: user.role }
  });
});

router.post('/logout', (req, res) => {
  clearAuthCookie(res);
  res.json({ ok: true });
});

router.get('/me', requireAuth, (req, res) => {
  const user = db.prepare('SELECT id, username, fullName, role, active, createdAt FROM users WHERE id = ?')
    .get(req.user.id);
  if (!user || !user.active) {
    clearAuthCookie(res);
    return res.status(401).json({ error: 'User no longer exists' });
  }
  res.json({ user });
});

module.exports = router;
