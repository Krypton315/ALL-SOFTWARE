/* ═══════════════════════════════════════════
   script.js  —  Auth UI Logic
   Architecture: validator module + api module + ui controller
═══════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   1. CONSTANTS
───────────────────────────────────────── */
const API = {
  base:     'http://localhost:3000/api',
  login:    '/login',
  register: '/register',
};

/* ─────────────────────────────────────────
   2. VALIDATOR MODULE
   Pure functions — return null (ok) or error string
───────────────────────────────────────── */
const Validator = (() => {
  const isEmpty  = v => !v || !v.trim();
  const isEmail  = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  const minLen   = (v, n) => v.trim().length >= n;

  function validateLogin({ email, password }) {
    const errors = {};
    if (isEmpty(email))          errors.email    = 'Email wajib diisi.';
    else if (!isEmail(email))    errors.email    = 'Format email tidak valid.';
    if (isEmpty(password))       errors.password = 'Kata sandi wajib diisi.';
    else if (!minLen(password,6))errors.password = 'Kata sandi minimal 6 karakter.';
    return errors;
  }

  function validateRegister({ username, email, password, confirm }) {
    const errors = {};
    if (isEmpty(username))        errors.username = 'Username wajib diisi.';
    if (isEmpty(email))           errors.email    = 'Email wajib diisi.';
    else if (!isEmail(email))     errors.email    = 'Format email tidak valid.';
    if (isEmpty(password))        errors.password = 'Kata sandi wajib diisi.';
    else if (!minLen(password,6)) errors.password = 'Kata sandi minimal 6 karakter.';
    if (isEmpty(confirm))         errors.confirm  = 'Konfirmasi kata sandi wajib diisi.';
    else if (password !== confirm)errors.confirm  = 'Kata sandi tidak cocok.';
    return errors;
  }

  return { validateLogin, validateRegister };
})();

/* ─────────────────────────────────────────
   3. API MODULE
   Returns { ok: bool, data: {} }
   Throws only on network failure
───────────────────────────────────────── */
const ApiService = (() => {

  async function request(endpoint, body) {
    const res = await fetch(API.base + endpoint, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
    });

    let data;
    try   { data = await res.json(); }
    catch { data = { message: res.statusText || 'Respons tidak dikenal.' }; }

    return { ok: res.ok, status: res.status, data };
  }

  const login    = body => request(API.login,    body);
  const register = body => request(API.register, body);

  return { login, register };
})();

/* ─────────────────────────────────────────
   4. UI HELPERS
───────────────────────────────────────── */
const UI = (() => {

  /** Show or clear a field-level error */
  function setFieldError(inputEl, errEl, msg) {
    if (msg) {
      inputEl.classList.add('is-invalid');
      errEl.textContent = msg;
    } else {
      inputEl.classList.remove('is-invalid');
      errEl.textContent = '';
    }
  }

  /** Clear all field errors in a form */
  function clearErrors(formEl) {
    formEl.querySelectorAll('input').forEach(i => i.classList.remove('is-invalid'));
    formEl.querySelectorAll('.field-error').forEach(e => e.textContent = '');
  }

  /** Show the global banner */
  function showBanner(msg, type = 'error') {
    const el = document.getElementById('banner');
    el.className = `banner ${type}`;
    el.innerHTML = `<span>${type === 'success' ? '✓' : '✕'}</span> ${msg}`;
  }

  function hideBanner() {
    const el = document.getElementById('banner');
    el.className = 'banner hidden';
    el.textContent = '';
  }

  /** Toggle button loading state */
  function setLoading(btnEl, isLoading) {
    btnEl.disabled = isLoading;
    btnEl.classList.toggle('loading', isLoading);
  }

  return { setFieldError, clearErrors, showBanner, hideBanner, setLoading };
})();

/* ─────────────────────────────────────────
   5. TAB CONTROLLER
───────────────────────────────────────── */
(function initTabs() {
  const tabs    = document.querySelectorAll('.tab');
  const panels  = document.querySelectorAll('.panel');
  const tabBar  = document.querySelector('.tab-bar');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.target;

      tabs.forEach(t => {
        t.classList.toggle('active', t.dataset.target === target);
        t.setAttribute('aria-selected', t.dataset.target === target);
      });
      panels.forEach(p => p.classList.toggle('active', p.id === `panel-${target}`));
      tabBar.dataset.active = target;

      UI.hideBanner();
    });
  });
})();

/* ─────────────────────────────────────────
   6. PASSWORD TOGGLE
───────────────────────────────────────── */
document.querySelectorAll('.toggle-pw').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    const show  = input.type === 'password';
    input.type  = show ? 'text' : 'password';
    btn.setAttribute('aria-label', show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi');
    // Update icon opacity as visual cue
    btn.style.color = show ? 'var(--text-hi)' : '';
  });
});

/* ─────────────────────────────────────────
   7. LOGIN FORM HANDLER
───────────────────────────────────────── */
document.getElementById('form-login').addEventListener('submit', async function (e) {
  e.preventDefault();
  UI.hideBanner();

  const formData = {
    email:    this.email.value,
    password: this.password.value,
  };

  // Validate
  const errors = Validator.validateLogin(formData);

  UI.setFieldError(
    document.getElementById('login-email'),
    document.getElementById('login-email-err'),
    errors.email
  );
  UI.setFieldError(
    document.getElementById('login-password'),
    document.getElementById('login-password-err'),
    errors.password
  );

  if (Object.keys(errors).length) return;

  // Submit
  const btn = document.getElementById('btn-login');
  UI.setLoading(btn, true);

  try {
    const { ok, status, data } = await ApiService.login(formData);

    if (ok) {
      UI.showBanner(data.message || 'Login berhasil! Mengarahkan…', 'success');
      // TODO: simpan token, redirect, dll.
      // localStorage.setItem('token', data.token);
      // window.location.href = '/dashboard';
    } else {
      const msg =
        status === 401 ? 'Email atau kata sandi salah.' :
        status === 422 ? 'Data tidak valid, periksa kembali.' :
        data.message   || `Gagal masuk (${status}).`;
      UI.showBanner(msg, 'error');
    }
  } catch (err) {
    // Network / CORS / server down
    UI.showBanner('Tidak dapat terhubung ke server. Coba lagi.', 'error');
    console.error('[Login] Network error:', err);
  } finally {
    UI.setLoading(btn, false);
  }
});

/* ─────────────────────────────────────────
   8. REGISTER FORM HANDLER
───────────────────────────────────────── */
document.getElementById('form-register').addEventListener('submit', async function (e) {
  e.preventDefault();
  UI.hideBanner();

  const formData = {
    username: this.username.value,
    email:    this.email.value,
    password: this.password.value,
    confirm:  this.confirm.value,
  };

  // Validate
  const errors = Validator.validateRegister(formData);

  UI.setFieldError(
    document.getElementById('reg-username'),
    document.getElementById('reg-username-err'),
    errors.username
  );
  UI.setFieldError(
    document.getElementById('reg-email'),
    document.getElementById('reg-email-err'),
    errors.email
  );
  UI.setFieldError(
    document.getElementById('reg-password'),
    document.getElementById('reg-password-err'),
    errors.password
  );
  UI.setFieldError(
    document.getElementById('reg-confirm'),
    document.getElementById('reg-confirm-err'),
    errors.confirm
  );

  if (Object.keys(errors).length) return;

  // Strip confirm from payload before sending
  const { confirm, ...payload } = formData;

  // Submit
  const btn = document.getElementById('btn-register');
  UI.setLoading(btn, true);

  try {
    const { ok, status, data } = await ApiService.register(payload);

    if (ok) {
      UI.showBanner(data.message || 'Akun berhasil dibuat! Silakan masuk.', 'success');
      this.reset();
      // Optionally switch to login tab after delay
      setTimeout(() => {
        document.querySelector('[data-target="login"]').click();
      }, 2000);
    } else {
      const msg =
        status === 409 ? 'Email atau username sudah terdaftar.' :
        status === 422 ? 'Data tidak valid, periksa kembali.' :
        data.message   || `Pendaftaran gagal (${status}).`;
      UI.showBanner(msg, 'error');
    }
  } catch (err) {
    UI.showBanner('Tidak dapat terhubung ke server. Coba lagi.', 'error');
    console.error('[Register] Network error:', err);
  } finally {
    UI.setLoading(btn, false);
  }
});

/* ─────────────────────────────────────────
   9. LIVE FIELD VALIDATION (optional UX)
   Clear error when user types again
───────────────────────────────────────── */
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('input', function () {
    if (this.classList.contains('is-invalid')) {
      this.classList.remove('is-invalid');
      const errEl = document.getElementById(`${this.id}-err`);
      if (errEl) errEl.textContent = '';
    }
  });
});
