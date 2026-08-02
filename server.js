// Bikroy Hisab - Web server entry point
const express = require('express');
const path = require('path');
require('./db'); // initialize database + seed admin

const { pageAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/customers', require('./routes/customers'));
app.use('/api/dues', require('./routes/dues'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/admin/users', require('./routes/admin'));
app.use('/api/backup', require('./routes/backup'));

// Serve app pages (guarded; login page and assets are served by express.static below)
app.get('/', pageAuth(false), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
app.get('/dashboard.html', pageAuth(false), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});
app.get('/customers.html', pageAuth(false), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'customers.html'));
});
app.get('/customer-detail.html', pageAuth(false), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'customer-detail.html'));
});
app.get('/add-due.html', pageAuth(false), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'add-due.html'));
});
app.get('/sales.html', pageAuth(false), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'sales.html'));
});
app.get('/settings.html', pageAuth(false), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'settings.html'));
});
app.get('/admin/users.html', pageAuth(true), (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin', 'users.html'));
});

// Static frontend (login page and css/js assets are public)
app.use(express.static(path.join(__dirname, 'public')));

// JSON 404 for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`Bikroy Hisab web app running at http://localhost:${PORT}`);
});
