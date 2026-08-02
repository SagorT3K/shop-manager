// Shared app utilities: API client, auth init, navigation, toasts, modals
// Auth uses an httpOnly session cookie set by the server; browsers send it
// automatically on every request and page navigation.

// ---- API client ----
const API = {
  async request(method, url, body) {
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    });
    if (res.status === 401) {
      // Session expired / not logged in
      window.__user = null;
      if (!window.location.pathname.endsWith('login.html')) {
        window.location.href = '/login.html';
      }
      throw new Error(t('unauthorized'));
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data.error || 'Request failed');
      err.status = res.status;
      throw err;
    }
    return data;
  },
  get(url) { return this.request('GET', url); },
  post(url, body) { return this.request('POST', url, body); },
  put(url, body) { return this.request('PUT', url, body); },
  del(url) { return this.request('DELETE', url); }
};

function getCurrentUser() {
  return window.__user || null;
}

function isAdmin() {
  const u = getCurrentUser();
  return !!(u && u.role === 'admin');
}

// Initialization for every app page: verify session, load user, render nav.
// Redirects to login when unauthenticated. Returns the user object.
async function initApp(active) {
  try {
    const data = await API.get('/api/auth/me');
    window.__user = data.user;
  } catch (e) {
    // API.request already redirected to login on 401
    throw e;
  }
  renderNav(active);
  return window.__user;
}

async function logout() {
  try { await API.post('/api/auth/logout'); } catch (e) { /* ignore */ }
  window.location.href = '/login.html';
}

// ---- Toast notifications ----
function toast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast toast-${type}`;
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('toast-hide');
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

// ---- Modal helper ----
function openModal(modalId) {
  document.getElementById(modalId).classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove('open');
}

function confirmDialog(message, onConfirm) {
  const modal = document.getElementById('confirmModal');
  document.getElementById('confirmModalText').textContent = message;
  modal.classList.add('open');
  const okBtn = document.getElementById('confirmModalOk');
  const cancelBtn = document.getElementById('confirmModalCancel');
  const cleanup = () => {
    modal.classList.remove('open');
    okBtn.removeEventListener('click', onOk);
    cancelBtn.removeEventListener('click', onCancel);
  };
  const onOk = () => { cleanup(); onConfirm(); };
  const onCancel = () => cleanup();
  okBtn.addEventListener('click', onOk);
  cancelBtn.addEventListener('click', onCancel);
}

// ---- Navigation shell ----
function renderNav(active) {
  const user = getCurrentUser();
  const navItems = [
    { href: '/dashboard.html', key: 'dashboard', icon: '📊' },
    { href: '/customers.html', key: 'customers', icon: '👥' },
    { href: '/sales.html', key: 'sales', icon: '🛒' },
    { href: '/settings.html', key: 'settings', icon: '⚙️' }
  ];
  if (user && user.role === 'admin') {
    navItems.push({ href: '/admin/users.html', key: 'users', icon: '🔐' });
  }
  const sidebar = document.getElementById('sidebar');
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <span class="brand-icon">🧾</span>
      <div>
        <div class="brand-name">${t('appName')}</div>
        <div class="brand-tag">${t('appTagline')}</div>
      </div>
    </div>
    <nav class="sidebar-nav">
      ${navItems.map(item => `
        <a href="${item.href}" class="nav-item ${active === item.key ? 'active' : ''}">
          <span class="nav-icon">${item.icon}</span><span>${t(item.key)}</span>
        </a>`).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="user-chip">
        <div class="user-avatar">${user ? (user.fullName || user.username || '?').charAt(0).toUpperCase() : '?'}</div>
        <div class="user-info">
          <div class="user-name">${user ? (user.fullName || user.username) : ''}</div>
          <div class="user-role">${user && user.role === 'admin' ? t('adminRole') : t('shopkeeperRole')}</div>
        </div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="logout()">${t('logout')}</button>
    </div>
  `;

  const topbar = document.getElementById('topbar');
  const currencySelect = `
    <select id="currencySelect" class="currency-select" title="${t('currency')}" onchange="changeCurrency(this.value)">
      ${CURRENCIES.map(c => `
        <option value="${c.code}" ${c.code === getCurrency() ? 'selected' : ''}>
          ${c.symbol} ${c.code}
        </option>`).join('')}
    </select>`;
  topbar.innerHTML = `
    <button class="icon-btn sidebar-toggle" onclick="document.getElementById('sidebar').classList.toggle('open')">☰</button>
    <div class="topbar-title">${t(active)}</div>
    <div class="topbar-controls">${currencySelect}<button id="langToggle" class="lang-toggle" title="${t('language')}"></button></div>
  `;
  initLangToggle();
  applyI18n();
}

// Change currency from the topbar: save preference and reload so all amounts refresh
function changeCurrency(code) {
  setCurrency(code);
  location.reload();
}

// ---- Escaping ----
function esc(str) {
  return String(str == null ? '' : str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---- Message generation (Bengali SMS text, per the Android app) ----
// Uses the currently selected currency name (টাকা, ডলার, ইউরো, ...)
function buildDueMessage(customerName, amount, productName, dateTs) {
  const dateStr = formatDate(dateTs);
  const amountStr = toBengaliDigits(Number(amount) || 0);
  const curName = getCurrencyInfo().bnName;
  return `প্রিয় ${customerName}, আপনার দোকান থেকে ${amountStr} ${curName} বাকি নেওয়া হয়েছে। পণ্য: ${productName}, তারিখ: ${dateStr}. ধন্যবাদ।`;
}

function buildPaymentMessage(customerName, amount) {
  const amountStr = toBengaliDigits(Number(amount) || 0);
  const curName = getCurrencyInfo().bnName;
  return `প্রিয় ${customerName}, আপনার ${amountStr} ${curName} পরিশোধ গ্রহণ করা হয়েছে। ধন্যবাদ।`;
}

function openWhatsApp(phone, message) {
  const cleanPhone = String(phone || '').replace(/[^\d]/g, '');
  if (!cleanPhone) {
    toast(t('noPhone'), 'error');
    return;
  }
  window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
}

function openEmail(email, subject, message) {
  if (!email) {
    toast(t('noEmail'), 'error');
    return;
  }
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  toast(t('smsCopied'));
}
