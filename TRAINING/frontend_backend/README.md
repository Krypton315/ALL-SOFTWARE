# 🔐 Auth UI — Panduan Integrasi Backend

Panduan lengkap untuk menghubungkan halaman autentikasi (Login & Register) ke REST API backend.

---

## Daftar Isi

- [Struktur Proyek](#struktur-proyek)
- [Konfigurasi Endpoint](#konfigurasi-endpoint)
- [Format Request & Response](#format-request--response)
  - [Login](#1-login)
  - [Register](#2-register)
- [Penanganan Token (JWT)](#penanganan-token-jwt)
- [Konfigurasi CORS di Backend](#konfigurasi-cors-di-backend)
- [Contoh Backend](#contoh-backend)
  - [Node.js / Express](#nodejs--express)
  - [Python / FastAPI](#python--fastapi)
  - [Laravel (PHP)](#laravel-php)
- [Menambah Header Authorization](#menambah-header-authorization)
- [Error Handling Reference](#error-handling-reference)
- [Checklist Integrasi](#checklist-integrasi)
- [FAQ](#faq)

---

## Struktur Proyek

```
project/
├── index.html      # Markup utama (tab Login & Register)
├── style.css       # Desain UI
└── script.js       # Logic validasi & API call
```

Semua konfigurasi API berada di bagian paling atas `script.js`:

```js
const API = {
  base:     'http://localhost:3000/api',  // ← ganti sesuai server kamu
  login:    '/login',
  register: '/register',
};
```

---

## Konfigurasi Endpoint

Ubah nilai `API.base` di `script.js` sesuai environment:

| Environment | Nilai `API.base` |
|---|---|
| Development (lokal) | `http://localhost:3000/api` |
| Staging | `https://api-staging.domain.com` |
| Production | `https://api.domain.com` |

> **Tips:** Untuk project yang lebih besar, pertimbangkan menyimpan base URL di environment variable menggunakan tool seperti Vite atau Webpack.

---

## Format Request & Response

Semua request menggunakan:
- Method: `POST`
- Header: `Content-Type: application/json`
- Body: JSON

---

### 1. Login

**Endpoint:** `POST /api/login`

**Request Body:**
```json
{
  "email": "budi@email.com",
  "password": "rahasia123"
}
```

**Response Sukses** `200 OK`:
```json
{
  "message": "Login berhasil.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "budi",
    "email": "budi@email.com"
  }
}
```

**Response Gagal** `401 Unauthorized`:
```json
{
  "message": "Email atau kata sandi salah."
}
```

---

### 2. Register

**Endpoint:** `POST /api/register`

**Request Body:**
```json
{
  "username": "budi",
  "email": "budi@email.com",
  "password": "rahasia123"
}
```

> ⚠️ Field `confirm` (konfirmasi password) **tidak dikirim** ke server — hanya divalidasi di sisi frontend.

**Response Sukses** `201 Created`:
```json
{
  "message": "Akun berhasil dibuat.",
  "user": {
    "id": 1,
    "username": "budi",
    "email": "budi@email.com"
  }
}
```

**Response Gagal** `409 Conflict`:
```json
{
  "message": "Email atau username sudah terdaftar."
}
```

---

## Penanganan Token (JWT)

Setelah login sukses, simpan token dan gunakan untuk request berikutnya.

Di dalam handler login di `script.js`, uncomment dan sesuaikan bagian ini:

```js
if (ok) {
  UI.showBanner(data.message || 'Login berhasil!', 'success');

  // 1. Simpan token
  localStorage.setItem('token', data.token);

  // 2. (Opsional) Simpan info user
  localStorage.setItem('user', JSON.stringify(data.user));

  // 3. Redirect ke halaman utama
  window.location.href = '/dashboard';
}
```

### Menggunakan Token di Request Selanjutnya

Setiap request ke endpoint yang memerlukan autentikasi, sertakan token di header:

```js
const token = localStorage.getItem('token');

const response = await fetch('/api/profile', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});
```

### Logout

```js
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/';
}
```

> ⚠️ **Keamanan:** `localStorage` rentan terhadap serangan XSS. Untuk aplikasi produksi dengan keamanan tinggi, pertimbangkan menyimpan token di `httpOnly cookie` yang dikelola server.

---

## Konfigurasi CORS di Backend

Karena frontend mengirim request dari browser, backend **wajib** mengizinkan CORS. Jika tidak, request akan diblokir.

Header yang dibutuhkan dari backend:

```
Access-Control-Allow-Origin: http://localhost:5500   (atau * untuk dev)
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

---

## Contoh Backend

### Node.js / Express

```bash
npm install express cors bcryptjs jsonwebtoken
```

```js
// server.js
const express = require('express');
const cors    = require('cors');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');

const app = express();
const SECRET = 'ganti_dengan_secret_aman';

app.use(cors({ origin: 'http://localhost:5500' }));
app.use(express.json());

// Simulasi database (gunakan DB sungguhan di produksi)
const users = [];

// Register
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  const exists = users.find(u => u.email === email || u.username === username);
  if (exists) {
    return res.status(409).json({ message: 'Email atau username sudah terdaftar.' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user   = { id: users.length + 1, username, email, password: hashed };
  users.push(user);

  res.status(201).json({ message: 'Akun berhasil dibuat.', user: { id: user.id, username, email } });
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  const user  = users.find(u => u.email === email);
  const valid = user && await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ message: 'Email atau kata sandi salah.' });
  }

  const token = jwt.sign({ id: user.id, email }, SECRET, { expiresIn: '1d' });
  res.json({ message: 'Login berhasil.', token, user: { id: user.id, username: user.username, email } });
});

app.listen(3000, () => console.log('Server berjalan di http://localhost:3000'));
```

---

### Python / FastAPI

```bash
pip install fastapi uvicorn python-jose[cryptography] passlib[bcrypt]
```

```python
# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta

app = FastAPI()
SECRET = "ganti_dengan_secret_aman"
pwd_ctx = CryptContext(schemes=["bcrypt"])
users_db = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegisterBody(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginBody(BaseModel):
    email: EmailStr
    password: str

@app.post("/api/register", status_code=201)
def register(body: RegisterBody):
    if any(u["email"] == body.email for u in users_db):
        raise HTTPException(409, "Email atau username sudah terdaftar.")
    users_db.append({
        "id": len(users_db) + 1,
        "username": body.username,
        "email": body.email,
        "password": pwd_ctx.hash(body.password),
    })
    return {"message": "Akun berhasil dibuat."}

@app.post("/api/login")
def login(body: LoginBody):
    user = next((u for u in users_db if u["email"] == body.email), None)
    if not user or not pwd_ctx.verify(body.password, user["password"]):
        raise HTTPException(401, "Email atau kata sandi salah.")
    token = jwt.encode(
        {"sub": user["email"], "exp": datetime.utcnow() + timedelta(days=1)},
        SECRET, algorithm="HS256"
    )
    return {"message": "Login berhasil.", "token": token}
```

```bash
uvicorn main:app --reload --port 3000
```

---

### Laravel (PHP)

```bash
composer require tymon/jwt-auth
```

```php
// routes/api.php
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);
```

```php
// app/Http/Controllers/AuthController.php
public function register(Request $request)
{
    $validated = $request->validate([
        'username' => 'required|unique:users',
        'email'    => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);

    $user = User::create([
        'username' => $validated['username'],
        'email'    => $validated['email'],
        'password' => Hash::make($validated['password']),
    ]);

    return response()->json(['message' => 'Akun berhasil dibuat.', 'user' => $user], 201);
}

public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    if (!$token = auth()->attempt($credentials)) {
        return response()->json(['message' => 'Email atau kata sandi salah.'], 401);
    }
    return response()->json(['message' => 'Login berhasil.', 'token' => $token]);
}
```

Tambahkan di `app/Http/Middleware/Cors.php` atau gunakan package `fruitcake/laravel-cors`.

---

## Menambah Header Authorization

Jika ingin menambah fungsi helper global untuk semua request yang perlu auth, tambahkan di `script.js`:

```js
/**
 * Wrapper fetch dengan Authorization header otomatis
 */
async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token');
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
}

// Penggunaan:
const res = await authFetch('/api/profile');
```

---

## Error Handling Reference

Tabel lengkap HTTP status code yang ditangani frontend:

| Status | Situasi | Pesan yang Ditampilkan |
|---|---|---|
| `200` | Login sukses | Dari `data.message` server |
| `201` | Register sukses | Dari `data.message` server |
| `401` | Email/password salah | `"Email atau kata sandi salah."` |
| `409` | Email/username duplikat | `"Email atau username sudah terdaftar."` |
| `422` | Validasi backend gagal | `"Data tidak valid, periksa kembali."` |
| Lainnya `4xx`/`5xx` | Error umum | `data.message` atau kode status |
| Network error | Server mati / CORS | `"Tidak dapat terhubung ke server."` |

Untuk menambah penanganan status baru, edit bagian ini di handler masing-masing form:

```js
const msg =
  status === 401 ? 'Email atau kata sandi salah.' :
  status === 429 ? 'Terlalu banyak percobaan. Coba lagi nanti.' :  // ← tambahkan di sini
  status === 422 ? 'Data tidak valid, periksa kembali.' :
  data.message   || `Gagal masuk (${status}).`;
```

---

## Checklist Integrasi

Gunakan daftar ini sebelum deploy ke production:

- [ ] `API.base` sudah diganti ke URL backend yang benar
- [ ] Backend mengembalikan `Content-Type: application/json`
- [ ] CORS sudah dikonfigurasi di backend
- [ ] Field `message` selalu ada di setiap response (sukses & gagal)
- [ ] Password di-hash di server (bcrypt / argon2) — **jangan simpan plaintext**
- [ ] Token JWT memiliki waktu kedaluwarsa (`expiresIn`)
- [ ] Redirect setelah login sudah diaktifkan (uncomment di `script.js`)
- [ ] Logout menghapus token dari `localStorage`
- [ ] HTTPS digunakan di production (bukan HTTP)
- [ ] Rate limiting diterapkan di endpoint login/register

---

## FAQ

**Q: Kenapa request saya diblokir browser?**  
A: Kemungkinan masalah CORS. Pastikan backend mengirim header `Access-Control-Allow-Origin` yang sesuai. Cek tab *Console* dan *Network* di DevTools browser.

**Q: Token disimpan di mana yang paling aman?**  
A: Untuk kemudahan, gunakan `localStorage`. Untuk keamanan lebih tinggi (mencegah XSS), gunakan `httpOnly cookie` yang dikelola server — tidak bisa diakses JavaScript sama sekali.

**Q: Bagaimana cara menjalankan frontend saja tanpa backend?**  
A: Gunakan Live Server (ekstensi VS Code) atau jalankan `npx serve .` di folder proyek. Request ke backend akan gagal dengan error network — itu normal jika server belum berjalan.

**Q: Bisakah field validasi di frontend berbeda dengan backend?**  
A: Bisa, tapi sebaiknya konsisten. Frontend melakukan validasi cepat untuk UX, backend harus selalu memvalidasi ulang karena request bisa datang dari mana saja (bukan hanya dari UI ini).

**Q: Bagaimana menambah field baru di form register?**  
A: Tambahkan `<input>` di `index.html`, tambahkan validasinya di fungsi `validateRegister()` di `script.js`, lalu sertakan field tersebut di objek `payload` sebelum dikirim ke `ApiService.register()`.

---

> Dibuat untuk digunakan bersama `index.html`, `style.css`, dan `script.js`. Versi Node.js minimum yang direkomendasikan: **v18+**.
