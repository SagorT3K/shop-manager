// i18n: English and Bengali translation dictionary
// Pages call t('key') with the current language (stored in localStorage).

const I18N = {
  en: {
    appName: 'Bikroy Hisab',
    appTagline: 'Shop Management System',
    login: 'Login',
    signup: 'Sign Up',
    signupTitle: 'Create a new account',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    logout: 'Logout',
    username: 'Username',
    password: 'Password',
    loginTitle: 'Sign in to Bikroy Hisab',
    loginSubtitle: 'Shop Management System',
    invalidCredentials: 'Invalid username or password',
    accountDisabled: 'Account is disabled. Contact the administrator.',
    required: 'Required field',
    dashboard: 'Dashboard',
    customers: 'Customers',
    sales: 'Sales',
    settings: 'Settings',
    admin: 'Admin Panel',
    users: 'User Management',
    customerCount: 'Customers',
    todaySales: "Today's Sales",
    totalDue: 'Total Due',
    recentTransactions: 'Recent Transactions',
    quickActions: 'Quick Actions',
    addCustomer: 'Add Customer',
    salesHistory: 'Sales History',
    newSale: 'New Sale',
    noTransactions: 'No transactions yet',
    noCustomers: 'No customers found',
    noSales: 'No sales records yet',
    noDues: 'No dues',
    noPayments: 'No payments',
    customerList: 'Customer List',
    searchCustomers: 'Search customers...',
    addNewCustomer: 'Add New Customer',
    editCustomer: 'Edit Customer',
    customerName: 'Customer Name',
    phone: 'Phone Number',
    email: 'Email',
    address: 'Address',
    save: 'Save',
    update: 'Update',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    nameRequired: 'Name is required',
    phoneRequired: 'Phone number is required',
    customerDetail: 'Customer Details',
    totalDueLabel: 'Total Due',
    totalPaidLabel: 'Total Paid',
    dueHistory: 'Due History',
    payments: 'Payments',
    recordPayment: 'Record Payment',
    paymentAmount: 'Payment Amount',
    paymentNote: 'Note (optional)',
    addDue: 'Add Due',
    newDue: 'New Due',
    productName: 'Product Name',
    amount: 'Amount',
    note: 'Note',
    saveDue: 'Save Due',
    dueStatusPaid: 'Paid',
    dueStatusPartial: 'Partial',
    dueStatusUnpaid: 'Unpaid',
    todaySalesSummary: "Today's Sales",
    transactionsCount: 'transactions',
    allSales: 'All Sales',
    deleteConfirm: 'Are you sure you want to delete',
    deleteSaleConfirm: 'Are you sure you want to delete this sale?',
    deleteCustomerConfirm: 'Are you sure you want to delete this customer? All dues and payments will be removed.',
    deleteUserConfirm: 'Are you sure you want to delete this user?',
    backup: 'Data Backup',
    backupDesc: 'Download the full database as a file',
    downloadBackup: 'Download Backup',
    about: 'About',
    version: 'Version',
    language: 'Language',
    currency: 'Currency',
    currencyDesc: 'Currency symbol used across the app',
    english: 'English',
    bengali: 'Bengali',
    success: 'Success',
    error: 'Error',
    confirm: 'Confirm',
    warning: 'Warning',
    deleteSuccess: 'Deleted successfully',
    saveSuccess: 'Saved successfully',
    paymentSuccess: 'Payment recorded successfully',
    dueSuccess: 'Due added successfully',
    userManagement: 'User Management',
    addUser: 'Add User',
    fullName: 'Full Name',
    role: 'Role',
    adminRole: 'Admin',
    shopkeeperRole: 'Shopkeeper',
    active: 'Active',
    disabled: 'Disabled',
    actions: 'Actions',
    createUser: 'Create User',
    usernameExists: 'Username already exists',
    passwordMin: 'Password must be at least 4 characters',
    changePassword: 'New Password (leave blank to keep)',
    created: 'Created',
    enable: 'Enable',
    disable: 'Disable',
    resetPassword: 'Reset Password',
    notifyVia: 'Notify customer',
    whatsapp: 'WhatsApp',
    emailBtn: 'Email',
    copySms: 'Copy SMS',
    smsCopied: 'Message copied to clipboard',
    sendAfterDue: 'Send notification after saving?',
    noPhone: 'No phone number for this customer',
    noEmail: 'No email for this customer',
    quantity: 'Quantity',
    price: 'Price',
    date: 'Date',
    totalAmount: 'Total',
    status: 'Status',
    customer: 'Customer',
    product: 'Product',
    dueType: 'Due',
    paymentType: 'Payment',
    notFound: 'Not found',
    pageNotFound: 'Page not found',
    unauthorized: 'Unauthorized. Please login.',
    backToLogin: 'Go to Login',
    yourAccount: 'Your account',
    adminOnly: 'Admin access required',
    backupSuccess: 'Backup downloaded',
    welcome: 'Welcome',
    footer: '© 2024 Bikroy Hisab',
    dashboardDesc: 'Overview of your shop',
    customerCountDesc: 'Total registered customers',
    todaySalesDesc: 'Sales recorded today',
    totalDueDesc: 'Outstanding dues from customers',
    duesAndPayments: 'Dues & Payments',
    recent: 'Recent',
    viewAll: 'View All',
    smsTemplate: 'SMS Template',
    generatedMessage: 'Generated message',
    sendViaWhatsApp: 'Send via WhatsApp',
    sendViaEmail: 'Send via Gmail',
    copyMessage: 'Copy Message',
    editDue: 'Edit Due',
    markPaid: 'Mark as Paid',
    deleteDue: 'Delete Due',
    deletePayment: 'Delete Payment',
    enterValidAmount: 'Please enter a valid amount',
    productNameRequired: 'Product name is required',
    quantityPriceRequired: 'Quantity and price are required',
    loggedInAs: 'Logged in as'
  },
  bn: {
    appName: 'বিক্রয় হিসাব',
    appTagline: 'দোকান ব্যবস্থাপনা সিস্টেম',
    login: 'লগইন',
    signup: 'নিবন্ধন',
    signupTitle: 'নতুন অ্যাকাউন্ট তৈরি করুন',
    noAccount: 'অ্যাকাউন্ট নেই?',
    haveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    logout: 'লগআউট',
    username: 'ব্যবহারকারীর নাম',
    password: 'পাসওয়ার্ড',
    loginTitle: 'বিক্রয় হিসাবে সাইন ইন করুন',
    loginSubtitle: 'দোকান ব্যবস্থাপনা সিস্টেম',
    invalidCredentials: 'ভুল ব্যবহারকারীর নাম বা পাসওয়ার্ড',
    accountDisabled: 'অ্যাকাউন্ট নিষ্ক্রিয়। প্রশাসকের সাথে যোগাযোগ করুন।',
    required: 'আবশ্যক ক্ষেত্র',
    dashboard: 'ড্যাশবোর্ড',
    customers: 'গ্রাহক',
    sales: 'বিক্রয়',
    settings: 'সেটিংস',
    admin: 'অ্যাডমিন প্যানেল',
    users: 'ব্যবহারকারী ব্যবস্থাপনা',
    customerCount: 'গ্রাহক',
    todaySales: 'আজকের বিক্রয়',
    totalDue: 'মোট বাকি',
    recentTransactions: 'সাম্প্রতিক লেনদেন',
    quickActions: 'দ্রুত কাজ',
    addCustomer: 'গ্রাহক যোগ',
    salesHistory: 'বিক্রয় ইতিহাস',
    newSale: 'নতুন বিক্রয়',
    noTransactions: 'কোনো লেনদেন নেই',
    noCustomers: 'কোনো গ্রাহক পাওয়া যায়নি',
    noSales: 'কোনো বিক্রয় রেকর্ড নেই',
    noDues: 'কোনো বাকি নেই',
    noPayments: 'কোনো পেমেন্ট নেই',
    customerList: 'গ্রাহক তালিকা',
    searchCustomers: 'গ্রাহক খুঁজুন...',
    addNewCustomer: 'নতুন গ্রাহক যোগ',
    editCustomer: 'গ্রাহক সম্পাদনা',
    customerName: 'গ্রাহকের নাম',
    phone: 'মোবাইল নম্বর',
    email: 'ইমেইল',
    address: 'ঠিকানা',
    save: 'সংরক্ষণ',
    update: 'আপডেট',
    cancel: 'বাতিল',
    delete: 'মুছুন',
    edit: 'সম্পাদনা',
    back: 'ফিরে যান',
    nameRequired: 'নাম আবশ্যক',
    phoneRequired: 'মোবাইল নম্বর আবশ্যক',
    customerDetail: 'গ্রাহক তথ্য',
    totalDueLabel: 'মোট বাকি',
    totalPaidLabel: 'মোট পরিশোধ',
    dueHistory: 'বাকির ইতিহাস',
    payments: 'পেমেন্ট',
    recordPayment: 'পেমেন্ট গ্রহণ',
    paymentAmount: 'পেমেন্টের পরিমাণ',
    paymentNote: 'নোট (ঐচ্ছিক)',
    addDue: 'বাকি যোগ',
    newDue: 'নতুন বাকি',
    productName: 'পণ্যের নাম',
    amount: 'পরিমাণ',
    note: 'নোট',
    saveDue: 'বাকি সংরক্ষণ',
    dueStatusPaid: 'পরিশোধিত',
    dueStatusPartial: 'আংশিক',
    dueStatusUnpaid: 'বাকি',
    todaySalesSummary: 'আজকের বিক্রয়',
    transactionsCount: 'টি লেনদেন',
    allSales: 'সকল বিক্রয়',
    deleteConfirm: 'আপনি কি নিশ্চিত মুছে ফেলতে চান',
    deleteSaleConfirm: 'আপনি কি নিশ্চিত এই বিক্রয়টি মুছে ফেলতে চান?',
    deleteCustomerConfirm: 'আপনি কি নিশ্চিত এই গ্রাহকটি মুছে ফেলতে চান? সকল বাকি ও পেমেন্ট মুছে যাবে।',
    deleteUserConfirm: 'আপনি কি নিশ্চিত এই ব্যবহারকারীটি মুছে ফেলতে চান?',
    backup: 'ডেটা ব্যাকআপ',
    backupDesc: 'সম্পূর্ণ ডেটাবেস একটি ফাইল হিসেবে ডাউনলোড করুন',
    downloadBackup: 'ব্যাকআপ ডাউনলোড',
    about: 'অ্যাপ সম্পর্কে',
    version: 'ভার্সন',
    language: 'ভাষা',
    currency: 'মুদ্রা',
    currencyDesc: 'অ্যাপ জুড়ে ব্যবহৃত মুদ্রার প্রতীক',
    english: 'ইংরেজি',
    bengali: 'বাংলা',
    success: 'সফল',
    error: 'ত্রুটি',
    confirm: 'নিশ্চিত করুন',
    warning: 'সতর্কতা',
    deleteSuccess: 'সফলভাবে মুছে ফেলা হয়েছে',
    saveSuccess: 'সফলভাবে সংরক্ষিত হয়েছে',
    paymentSuccess: 'পেমেন্ট সফলভাবে গ্রহণ করা হয়েছে',
    dueSuccess: 'বাকি সফলভাবে যোগ হয়েছে',
    userManagement: 'ব্যবহারকারী ব্যবস্থাপনা',
    addUser: 'ব্যবহারকারী যোগ',
    fullName: 'পুরো নাম',
    role: 'ভূমিকা',
    adminRole: 'অ্যাডমিন',
    shopkeeperRole: 'দোকানদার',
    active: 'সক্রিয়',
    disabled: 'নিষ্ক্রিয়',
    actions: 'অ্যাকশন',
    createUser: 'ব্যবহারকারী তৈরি',
    usernameExists: 'ব্যবহারকারীর নাম ইতিমধ্যে আছে',
    passwordMin: 'পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে',
    changePassword: 'নতুন পাসওয়ার্ড (খালি রাখলে অপরিবর্তিত থাকবে)',
    created: 'তৈরি',
    enable: 'সক্রিয় করুন',
    disable: 'নিষ্ক্রিয় করুন',
    resetPassword: 'পাসওয়ার্ড রিসেট',
    notifyVia: 'গ্রাহককে জানান',
    whatsapp: 'হোয়াটসঅ্যাপ',
    emailBtn: 'ইমেইল',
    copySms: 'এসএমএস কপি',
    smsCopied: 'মেসেজ ক্লিপবোর্ডে কপি হয়েছে',
    sendAfterDue: 'সংরক্ষণের পর বিজ্ঞপ্তি পাঠাবেন?',
    noPhone: 'এই গ্রাহকের মোবাইল নম্বর নেই',
    noEmail: 'এই গ্রাহকের ইমেইল নেই',
    quantity: 'পরিমাণ',
    price: 'মূল্য',
    date: 'তারিখ',
    totalAmount: 'মোট',
    status: 'স্ট্যাটাস',
    customer: 'গ্রাহক',
    product: 'পণ্য',
    dueType: 'বাকি',
    paymentType: 'পেমেন্ট',
    notFound: 'পাওয়া যায়নি',
    pageNotFound: 'পৃষ্ঠা পাওয়া যায়নি',
    unauthorized: 'অনুমোদিত নয়। অনুগ্রহ করে লগইন করুন।',
    backToLogin: 'লগইন পৃষ্ঠায় যান',
    yourAccount: 'আপনার অ্যাকাউন্ট',
    adminOnly: 'অ্যাডমিন অনুমোদন প্রয়োজন',
    backupSuccess: 'ব্যাকআপ ডাউনলোড হয়েছে',
    welcome: 'স্বাগতম',
    footer: '© ২০২৪ বিক্রয় হিসাব',
    dashboardDesc: 'আপনার দোকানের সারসংক্ষেপ',
    customerCountDesc: 'মোট নিবন্ধিত গ্রাহক',
    todaySalesDesc: 'আজকের রেকর্ডকৃত বিক্রয়',
    totalDueDesc: 'গ্রাহকদের কাছ থেকে বকেয়া বাকি',
    duesAndPayments: 'বাকি ও পেমেন্ট',
    recent: 'সাম্প্রতিক',
    viewAll: 'সব দেখুন',
    smsTemplate: 'এসএমএস টেমপ্লেট',
    generatedMessage: 'জেনারেট করা মেসেজ',
    sendViaWhatsApp: 'হোয়াটসঅ্যাপে পাঠান',
    sendViaEmail: 'জিমেইলে পাঠান',
    copyMessage: 'মেসেজ কপি করুন',
    editDue: 'বাকি সম্পাদনা',
    markPaid: 'পরিশোধিত করুন',
    deleteDue: 'বাকি মুছুন',
    deletePayment: 'পেমেন্ট মুছুন',
    enterValidAmount: 'সঠিক পরিমাণ লিখুন',
    productNameRequired: 'পণ্যের নাম আবশ্যক',
    quantityPriceRequired: 'পরিমাণ ও মূল্য আবশ্যক',
    loggedInAs: 'লগইন করেছেন'
  }
};

// ---- i18n engine ----

function getLang() {
  return localStorage.getItem('bikroy_lang') || 'bn';
}

function setLang(lang) {
  localStorage.setItem('bikroy_lang', lang === 'en' ? 'en' : 'bn');
}

function t(key) {
  const lang = getLang();
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

// ---- Currency support ----
// User-selectable currencies. Stored in localStorage (default: BDT).
const CURRENCIES = [
  { code: 'BDT', symbol: '৳', bnName: 'টাকা', enName: 'Taka', decimals: 2 },
  { code: 'USD', symbol: '$', bnName: 'ডলার', enName: 'US Dollar', decimals: 2 },
  { code: 'EUR', symbol: '€', bnName: 'ইউরো', enName: 'Euro', decimals: 2 },
  { code: 'GBP', symbol: '£', bnName: 'পাউন্ড', enName: 'British Pound', decimals: 2 },
  { code: 'INR', symbol: '₹', bnName: 'রুপি', enName: 'Indian Rupee', decimals: 2 },
  { code: 'PKR', symbol: '₨', bnName: 'রুপি', enName: 'Pakistani Rupee', decimals: 2 },
  { code: 'NPR', symbol: '₨', bnName: 'রুপি', enName: 'Nepalese Rupee', decimals: 2 },
  { code: 'JPY', symbol: '¥', bnName: 'ইয়েন', enName: 'Japanese Yen', decimals: 0 },
  { code: 'CNY', symbol: '¥', bnName: 'ইউয়ান', enName: 'Chinese Yuan', decimals: 2 },
  { code: 'SAR', symbol: '﷼', bnName: 'রিয়াল', enName: 'Saudi Riyal', decimals: 2 },
  { code: 'QAR', symbol: '﷼', bnName: 'রিয়াল', enName: 'Qatari Riyal', decimals: 2 },
  { code: 'AED', symbol: 'د.إ', bnName: 'দিরহাম', enName: 'UAE Dirham', decimals: 2 },
  { code: 'MYR', symbol: 'RM', bnName: 'রিংগিত', enName: 'Malaysian Ringgit', decimals: 2 },
  { code: 'IDR', symbol: 'Rp', bnName: 'রুপিয়াহ', enName: 'Indonesian Rupiah', decimals: 0 }
];

function getCurrency() {
  return localStorage.getItem('bikroy_currency') || 'BDT';
}

function setCurrency(code) {
  localStorage.setItem('bikroy_currency', CURRENCIES.some(c => c.code === code) ? code : 'BDT');
}

function getCurrencyInfo() {
  return CURRENCIES.find(c => c.code === getCurrency()) || CURRENCIES[0];
}

function formatCurrency(amount) {
  const info = getCurrencyInfo();
  const num = Number(amount) || 0;
  const formatted = num.toLocaleString('en-US', {
    minimumFractionDigits: info.decimals,
    maximumFractionDigits: info.decimals
  });
  const digits = getLang() === 'bn' ? toBengaliDigits(formatted) : formatted;
  return info.symbol + digits;
}

function toBengaliDigits(str) {
  const map = { '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪', '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯' };
  return String(str).replace(/[0-9]/g, d => map[d]);
}

const BN_MONTHS = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const day = d.getDate();
  const month = getLang() === 'bn' ? BN_MONTHS[d.getMonth()] : EN_MONTHS[d.getMonth()];
  const year = d.getFullYear();
  const dateStr = `${day} ${month} ${year}`;
  return getLang() === 'bn' ? toBengaliDigits(dateStr) : dateStr;
}

function formatDateTime(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  const ampm = h >= 12 ? (getLang() === 'bn' ? 'অপরাহ্ণ' : 'PM') : (getLang() === 'bn' ? 'পূর্বাহ্ণ' : 'AM');
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${formatDate(ts)} ${getLang() === 'bn' ? toBengaliDigits(`${hour12}:${m}`) : `${hour12}:${m}`} ${ampm}`;
}

// Apply translations to elements with data-i18n attributes
function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  root.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.getAttribute('data-i18n-title'));
  });
  document.documentElement.lang = getLang();
}

// Re-render dynamic text after language change
window.addEventListener('bikroy:langchange', () => {
  applyI18n();
  document.dispatchEvent(new CustomEvent('bikroy:rerender'));
});

function toggleLanguage() {
  setLang(getLang() === 'bn' ? 'en' : 'bn');
  window.dispatchEvent(new Event('bikroy:langchange'));
  const btn = document.getElementById('langToggle');
  if (btn) btn.textContent = getLang() === 'bn' ? 'EN' : 'বাং';
}

function initLangToggle() {
  const btn = document.getElementById('langToggle');
  if (btn) {
    btn.textContent = getLang() === 'bn' ? 'EN' : 'বাং';
    btn.addEventListener('click', toggleLanguage);
  }
}
