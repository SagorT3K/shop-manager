// JWT authentication: httpOnly cookie-based sessions (page navigations
// carry cookies automatically, unlike localStorage/header tokens)
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'bikroy-hisab-web-secret-change-me';
const TOKEN_EXPIRY = '7d';
const COOKIE_NAME = 'bikroy_token';

function signToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY }
  );
}

function getToken(req) {
  // Prefer cookie (browser navigation), fall back to Authorization header (API clients)
  const cookie = req.headers.cookie || '';
  for (const part of cookie.split(';')) {
    const [name, ...rest] = part.trim().split('=');
    if (name === COOKIE_NAME) return decodeURIComponent(rest.join('='));
  }
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7);
  return null;
}

function setAuthCookie(res, token) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${60 * 60 * 24 * 7}`);
}

function clearAuthCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
}

function requireAuth(req, res, next) {
  const token = getToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// Page-level guard: verify cookie, redirect to login when invalid
function pageAuth(requireAdminRole = false) {
  return (req, res, next) => {
    const token = getToken(req);
    if (!token) {
      return res.redirect('/login.html');
    }
    try {
      const user = jwt.verify(token, JWT_SECRET);
      if (requireAdminRole && user.role !== 'admin') {
        return res.redirect('/dashboard.html');
      }
      next();
    } catch (e) {
      return res.redirect('/login.html');
    }
  };
}

module.exports = { signToken, getToken, setAuthCookie, clearAuthCookie, requireAuth, requireAdmin, pageAuth };
